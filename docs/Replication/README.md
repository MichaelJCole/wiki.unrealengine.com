 Replication - Epic Wiki             

 

Replication
===========

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Networking is one of the many areas where Unreal Engine 4 shines. For those of you who have switched from Unity to Unreal Engine 4, or for those of you who are considering it: you are in for a pleasant surprise. UE4's network replication system is a master class in how to be awesome.

This article will explain the details of object replication and make you a UE4 networking pro!

Contents
--------

*   [1 Overview](#Overview)
*   [2 Terminology](#Terminology)
*   [3 Concepts](#Concepts)
*   [4 A Guide To Network Roles](#A_Guide_To_Network_Roles)
    *   [4.1 Spawning Rule](#Spawning_Rule)
    *   [4.2 UPROPERTY Replication Rule](#UPROPERTY_Replication_Rule)
    *   [4.3 Rules For Calling Functions](#Rules_For_Calling_Functions)
*   [5 Basic Actor Replication](#Basic_Actor_Replication)
*   [6 When Is An Actor Replicated?](#When_Is_An_Actor_Replicated.3F)
*   [7 Actor Property Replication](#Actor_Property_Replication)
    *   [7.1 Getting An Event When Your Property Is Replicated](#Getting_An_Event_When_Your_Property_Is_Replicated)
*   [8 Function Call Replication](#Function_Call_Replication)
    *   [8.1 Types of remote function calls](#Types_of_remote_function_calls)
    *   [8.2 Quick Review Of Roles](#Quick_Review_Of_Roles)
    *   [8.3 Reliable vs Unreliable Function Call Replication](#Reliable_vs_Unreliable_Function_Call_Replication)
    *   [8.4 Remote Function Call Examples](#Remote_Function_Call_Examples)
    *   [8.5 Tips For Bandwidth and Robustness](#Tips_For_Bandwidth_and_Robustness)
*   [9 Replication of Actor Components and Subobjects](#Replication_of_Actor_Components_and_Subobjects)
*   [10 Advanced: Generic replication of Actor Subobjects](#Advanced:_Generic_replication_of_Actor_Subobjects)
    *   [10.1 ReplicatedSubobject Class](#ReplicatedSubobject_Class)
    *   [10.2 Actor Code For Subobject Support](#Actor_Code_For_Subobject_Support)
    *   [10.3 Notes](#Notes)
    *   [10.4 Detailed Explanation](#Detailed_Explanation)
    *   [10.5 Unreal's Type System](#Unreal.27s_Type_System)
*   [11 Related Wiki Tutorials](#Related_Wiki_Tutorials)
*   [12 Epic Tutorials](#Epic_Tutorials)

Overview
--------

*   Unreal's network replication is extremely fast and bandwidth efficient.
*   The networking model is authoritative server/client.
*   Character and Vehicle based motion, physics, and prediction "just work" out of the box.
*   Unreal will replicate properties, structs, and references to other objects automatically over the network.
*   You can call functions on objects "across the network" (Remote Procedure Calls).

Terminology
-----------

1.  Objects, Game Objects, Actors, Pawns, Characters - These are all UObject derived classes.
2.  Server - The computer process with an instance of a UWorld that contains Actors that are replicated to clients. The state of the world contained here is considered to be the "real" or "correct" one.
3.  Client - The computer process with an instance of a UWorld that contains Actors that were received from a Server over a network connection. The state of a client is an approximation of the state of the Server. It is not considered to be accurate or correct.

Concepts
--------

At a high level Unreal's networking is designed to efficiently transmit (replicate) all relevant AActors contained in a UWorld from the authoritative state contained in a server to all of its connected clients. Unreal's networking is considered to be what's called "Authoritative Server/Client" because the state of the world contained in the server process is considered to be the true state of the world, while at any given time the state of the world on a client will, at best, approximate that to some degree of precision.

Although not without their downsides authoritative networking models, in theory, are immune to cheating. If done correctly, the entire state of the world is simulated on the server with clients restricted to issuing "input" to the server (conceptually: move forward, backwards, left, right, switch weapons) making it impossible for clients to "spoof" game state like their velocity because client calculations about their motion and velocity are entirely meaningless and never leave the clients computer. Instead clients receive the results of their "input" to the server at some later time.

A Guide To Network Roles
------------------------

A key concept to understand Unreal's networking is the concept of a network role. Although not totally obvious at first, networking roles are really the rules that control how information flows between Server and Client. For the most part Unreal's networking is automatic and hidden out of sight: simply changing the value of a member on a field on the Server may cause that new value to be replicated to clients. Why and how that happens is because of the rules governing network roles.

### Spawning Rule

The first rule of networking in Unreal is that only servers can spawn Actors that will replicate to clients. If a client spawns an Actor that actor will only ever exist on the client that created it.

### UPROPERTY Replication Rule

Only the changes made to replicated properties in the server will be replicated to clients. If a client changes the value of a replicated variable locally then it will stay that way until the next time the server changes it (after which it will be replicated and overwritten on the client). In this sense you should consider a UPROPERTY that is tagged with Replicated to be owned/controlled by the server.

### Rules For Calling Functions

One of the most powerful features of Unreal networking is the ability to call functions on objects on the server version or client version of objects. Consider an example of a game with a server and two clients and a single actor in the world. In this example there are 3 copies of the actor, one on the server, and one on each client. Let's call them Actor\_Server, Actor\_Client1, Actor\_Client2.

At this point we must now start talking about network roles. There are four roles _**(\* see technical note below)**_:

*   **ROLE\_None**

The object has no networking role and isn't replicated.

*   **ROLE\_SimulatedProxy**

The object locally simulates the state of the object on the server (i.e. it tries to look and act like the server version). It has no authority to change the state of the object or call a function on the object that executes remotely.

*   **ROLE\_AutonomousProxy**

Identical to ROLE\_SimulatedProxy in that this object also locally simulates the state of the object on the server, but with the ability to execute function calls on this object that execute on the server. In this sense an object with ROLE\_AutomousProxy is allowed to make authoritative decisions over what the Actor does, by executing functions on the object that run on the server and therefore change its state.

The choice of what functions can be replicated on the server are critical in preventing cheating. For example, a replicated function that runs on the server which takes the position of an object and moves it to that location is potentially a vector for cheating, since a player could modify their code to call that function with any values they desired. A more secure design would be to have server replicated functions transmit high level commands like ServerMoveForward(), ServerMoveBackwards(), ServerFireWeapon() etc.

*   **ROLE\_Authority**

An object with ROLE\_Authority is the authoritative version of the object and its state represents what is considered to be the only "real" state of the object. Versions of this object on clients with ROLE\_AutonomousProxy can call functions on this version of the object.

An object with ROLE\_Authority can execute function calls on any object on the server. Those functions can be marked to replicate to clients and they will be executed on the ROLE\_SimulatedProxy and ROLE\_AutonomousProxy instances of those objects on the specified clients.

Finally an object with ROLE\_Authority will also replicate any changes to UPROPERTY fields to any client versions of the object.

In the example above with Actor\_Server, Actor\_Client1, and Actor\_Client2, the likely networking role allocation would be:

*   Actor\_Server - ROLE\_Authority
*   Actor\_Client1 - ROLE\_AutonomousProxy (if the actor is a PlayerController and Client1 controls that player) or ROLE\_SimulatedProxy
*   Actor\_Client2 - ROLE\_AutonomousProxy (if the actor is a PlayerController and Client2 controls that player) or ROLE\_SimulatedProxy

Actor\_Server:

Will have role ROLE\_Authority and changes to any UPROPERTY on the Actor\_Server instance will get replicated to both Actor\_Client1 and Actor\_Client2 automatically, and any UFUNCTION() methods that are replicated as Client or NetMulticast that are called on Actor\_Server by the server will execute on Client1 (in the case of Client) or both Client1 and Client2 in the case of NetMulticast.

Actor\_Client1:

For the sake of argument assuming Client1 owns the Actor then Client1 will have network role ROLE\_AutonomousProxy, and any calls to UFUNCTION() methods marked as Server will execute on Actor\_Server.

Actor\_Client2 (and any other clients):

Will have role ROLE\_SimulatedProxy (assuming as said before that Client1 owns the actor) and any calls to replicated functions will be ignore. This object can only receive replicated information in the form of property updates and function calls.

_**\*TECHNICAL NOTE: You should be aware that Unreal does not necessarily enforce "rules" regarding networking roles, and roles don't really have privileges or authority over objects. Rather, roles serve as a way for you to know how an object should behave with respect to the network, and roles are assigned in a way that reflects the architecture of UE4 networking. For example technically a ROLE\_SimulatedProxy object can invoke a Server RPC if it is owned by a PlayerController (or if it is a child of a PlayerController through a hierarchy of objects). In unmodified Unreal an Actor can invoke a Server RPC if there is a UNetConnection (i.e. a Player) in its owner hierarchy, therefore ONLY a Player or an object owned by a Player or its children (PlayerController, etc) can invoke a Server RPC.**_

Basic Actor Replication
-----------------------

Any object derived from AActor can be a candidate for network replication by setting bReplicates to true inside your constructor:

ReplicatedActor.h: <syntaxhighlight lang="cpp">

1.  pragma once
2.  include "Core.h"
3.  include "AReplicatedActor.generated.h"

UCLASS() class AReplicatedActor : public AActor {

   GENERATED\_BODY()

   AReplicatedActor(const FObjectInitializer& ObjectInitializer);

}; </syntaxhighlight>

ReplicatedActor.cpp: <syntaxhighlight lang="cpp"> AReplicatedActor::AReplicatedActor(const FObjectInitializer& ObjectInitializer)

Super(ObjectInitializer)

{

   bReplicates = true;

} </syntaxhighlight>

When Is An Actor Replicated?
----------------------------

An Actor is replicated to a client when it is considered to be "network relevant". There are a number of ways to control this. By default Unreal replicates an Actor when it is within range of a client (AActor::NetCullDistanceSquared controls the culling distance). Here are a list of the base AActor flags you can set in your constructor to control some basic relevancy semantics:

*   **bReplicates** : Must be true for an Actor to replicate anything. An actor that is spawned dynamically on a server will be replicated (and spawn) on Client ONLY if this flag is set.
*   **bAlwaysRelevant** : Actor is always relevant to all clients and will always be replicated.
*   **bOnlyRelevantToOwner** : Actor is only relevant to its owner. Unreal's concept of ownership for network relevancy purposes is limited to a player's APlayerController or a player's APawn. An actor's owner must be either a PlayerController or Pawn controlled by a PlayerController in order for bOnlyRelevantToOwner to function. When set it means that the actor will only replicate to the player represented by the owning Pawn or PlayerController.
*   **bNetLoadOnClient** : If true the Actor will load from a level file on a network client. This should be set to true for Actors you place in a map that you want to exist on a client (typically most Actors want this).
*   **bTearOff** : If the Server sets this to true all clients will take authoritative control of their locally replicated versions of the actor and changes and function calls on the actor will no longer be replicated over the network. It will be as though it was a locally spawned actor.
*   **bReplicateMovement** : Set to true if you want to be able to move the Actor and have its position be updated on clients automatically. Pawns have this on by default.

If the default network relevancy by distance isn't adequate you can customize relevancy per-player by implementing an override for AActor::IsNetRelevantFor(): <syntaxhighlight lang="cpp"> bool AActor::IsNetRelevantFor(const AActor\* RealViewer, const AActor\* ViewTarget, const FVector& SrcLocation) </syntaxhighlight>

Actor Property Replication
--------------------------

Unreal will automatically replicate any UPROPERTY declared properties by declaring that they are Replicated and implementing UObject::GetLifetimeReplicatedProps(). Warning: It is vitally important that you do not conditionally replicate values inside GetLifetimeReplicatedProps (i.e. do not use any of your objects instance state to conditionally wrap DOREPLIFETIME). Doing this will not do what you think (internally Unreal only ever calls GetLifetimeReplicatedProps() on the first instance of an object of a given class and _it expects to be given the replication layout for that class, not for an instance of that class_. That replication layout is shared by all instances of that class for the lifetime of the UNetDriver).

Look here for more on GetReplicatedLifetimeProps(): [https://www.unrealengine.com/blog/network-tips-and-tricks](https://www.unrealengine.com/blog/network-tips-and-tricks)

ReplicatedActor.h: <syntaxhighlight lang="cpp">

1.  pragma once
2.  include "Core.h"
3.  include "AReplicatedActor.generated.h"

UCLASS() class AReplicatedActor : public AActor {

   GENERATED\_UCLASS\_BODY()

public:

   /\*\* A Replicated Boolean Flag \*/
   UPROPERTY(Replicated)
   uint32 bFlag:1;

   /\*\* A Replicated Array Of Integers \*/
   UPROPERTY(Replicated)
   TArray<uint32> IntegerArray;

}; </syntaxhighlight>

ReplicatedActor.cpp: <syntaxhighlight lang="cpp">

1.  include "ReplicatedActor.h"
2.  include "UnrealNetwork.h"

AReplicatedActor::AReplicatedActor(const class FPostConstructInitializeProperties& PCIP)

Super(PCIP)

{

   bReplicates = true;

}

void AReplicatedActor::GetLifetimeReplicatedProps(TArray< FLifetimeProperty > & OutLifetimeProps) const {

   Super::GetLifetimeReplicatedProps(OutLifetimeProps);

   DOREPLIFETIME(AReplicatedActor, bFlag);
   DOREPLIFETIME(AReplicatedActor, IntegerArray);

} </syntaxhighlight>

### Getting An Event When Your Property Is Replicated

If you need to know when you get an update to the value of a property from the server you can use ReplicatedUsing. NOTE: The event is not triggered on the server. The example code handles this case:

ReplicatedActor.h <syntaxhighlight lang="cpp">

1.  pragma once
2.  include "Core.h"
3.  include "ReplicatedActor.generated.h"

UCLASS() class AReplicatedActor : public AActor {

   GENERATED\_UCLASS\_BODY()

public:

   void ServerSetFlag();

   /\*\* A Replicated Boolean Flag \*/
   UPROPERTY(ReplicatedUsing=OnRep\_Flag)
   uint32 bFlag:1;

   /\*\* A Replicated Array Of Integers \*/
   UPROPERTY(Replicated)
   TArray<uint32> IntegerArray;

private:

   UFUNCTION()
   void OnRep\_Flag();

}; </syntaxhighlight>

ReplicatedActor.cpp: <syntaxhighlight lang="cpp">

1.  include "ReplicatedActor.h"
2.  include "UnrealNetwork.h"

AReplicatedActor::AReplicatedActor(const class FPostConstructInitializeProperties& PCIP)

Super(PCIP)

{

   bReplicates = true;

}

void AReplicatedActor::ServerSetFlag() {

   if (HasAuthority() && !bFlag) // Ensure Role == ROLE\_Authority
   {
       bFlag = true;
       OnRep\_Flag(); // Run locally since we are the server this won't be called automatically.
   }

}

void AReplicatedActor::OnRep\_Flag() {

   // When this is called, bFlag already contains the new value. This
   // just notifies you when it changes.

}

void AReplicatedActor::GetLifetimeReplicatedProps(TArray< FLifetimeProperty > & OutLifetimeProps) const {

   Super::GetLifetimeReplicatedProps(OutLifetimeProps);

   DOREPLIFETIME(AReplicatedActor, bFlag);
   DOREPLIFETIME(AReplicatedActor, IntegerArray);

} </syntaxhighlight>

Function Call Replication
-------------------------

One of the most powerful features of Unreal networking is the ability to call functions remotely. Any UFUNCTION() decorated method can be set to replicate and execute on client or server instances of the object. It is important to understand networking roles because they define the semantics by which remote function calls work.

### Types of remote function calls

*   Server - The function will execute on the server version of the object ONLY. An object must have ROLE\_Authority or ROLE\_AutonomousProxy to execute this method. An object with any other networking role won't do anything. NOTE: Functions marked as Server must also be marked as WithValidation and implement a validate function. This lets you do cheat prevention if desired, otherwise an empty method that just returns true is typical.
*   Client - The function will execute on the client that has a version of the object with ROLE\_AutonomousProxy (which is another way of saying whatever Client has a version of this object is allowed to call Server methods on the object, and is typically known as the client that "Owns" this object). The only ROLE\_AutonomousProxy objects that exist in Unreal are client instances of PlayerControllers.
*   NetMulticast - The function will execute on all clients that have an instance of the object. Only an object with ROLE\_Authority can execute this function, any other networking role won't do anything.

### Quick Review Of Roles

*   ROLE\_Authority - An object with ROLE\_Authority (HasAuthority() will return true) is considered the authoritative state of an object. When it calls UFUNCTION() decorated methods that are marked to execute as Server, Client, or Multicast those functions will be replicated accordinly.
*   ROLE\_AutonomousProxy - An object with this role can call UFUNCTION() decorated methods that are marked as Server.

An object with a role other than ROLE\_Authority or ROLE\_AutonomousProxy cannot call replicated methods (if they do they will be ignored).

### Reliable vs Unreliable Function Call Replication

A replicated UFUNCTION() can replicate reliably or unreliably. This simply means that an unreliable method call may not be executed under severe network stress. Don't mark things as unreliable that have to happen, but this is a good idea to do for non-critical effects since it theoretically might make the game play better under network stress.

### Remote Function Call Examples

ReplicatedActor.h <syntaxhighlight lang="cpp">

1.  pragma once
2.  include "Core.h"
3.  include "ReplicatedActor.generated.h"

UCLASS() class AReplicatedActor : public AActor {

   GENERATED\_UCLASS\_BODY()

public:

// NOTE: all functions can have arguments, they will be replicated automatically over the network. // NOTE: UObject based classes (or derivatives) should be passed by pointer (\*) and will correctly // address the version of that object on the receiving client or server (unless that object is not // replicated, in which case the pointer will be NULL).

   UFUNCTION(Server, Reliable, WithValidation)
   void Server\_ReliableFunctionCallThatRunsOnServer();

   UFUNCTION(Client, Reliable)
   void Client\_ReliableFunctionCallThatRunsOnOwningClientOnly();

   UFUNCTION(NetMulticast, Unreliable)
   void Client\_UnreliableFunctionCallThatRunsOnAllClients();

}; </syntaxhighlight>

ReplicatedActor.cpp: <syntaxhighlight lang="cpp">

1.  include "ReplicatedActor.h"
2.  include "UnrealNetwork.h"

AReplicatedActor::AReplicatedActor(const class FPostConstructInitializeProperties& PCIP)

Super(PCIP)

{

   bReplicates = true;

}

void AReplicatedActor::Server\_ReliableFunctionCallThatRunsOnServer\_Implementation() {

   // Do something here that modifies game state.

}

bool AReplicatedActor::Server\_ReliableFunctionCallThatRunsOnServer\_Validate() {

  // Optionally validate the request and return false if the function should not be run.
  return true;

}

void AReplicatedActor::Client\_ReliableFunctionCallThatRunsOnOwningClientOnly() {

  // Do something here to affect the client. This method was called by the server ONLY.

}

void AReplicatedActor::Client\_UnreliableFunctionCallThatRunsOnAllClients\_Implementation() {

  // Do something here to affect the client. This method was called by the server ONLY.

}

</syntaxhighlight>

### Tips For Bandwidth and Robustness

There is a lot of flexibility when it comes to what you replicate and how you replicate it.

*   When possible use an event concept to replicate lots of state to clients with a single replicated method call. For example, instead of setting replicated properties and calling multiple functions to tell a client to set the position of an effect, spawn an explosion, and then play a sound (conceptually three different things) you can encapsulate all of this as one method call: Client\_ProcessExplosion(const FVector& Location) that can be written to spawn explosion actors locally.
*   Going along with the previous tip, don't replicate objects that don't need to be. Explosions, sounds, ragdolls, and particle effects don't need to be marked as replicated, instead have a single replicated method that tells clients to Spawn() those Actors locally since they don't modify game state when an event happens.
*   Use Unreal's concepts of network roles to your advantage. This usually means only your player's PlayerController can call Server functions. Be careful about what you send. Instead of letting a player tell the server their position explicitly, consider having the PlayerController send player commands (like move left, up, down) and simulate that state on both client and server and let the server update the player's position as a replicated property. This avoids an entire class of cheats (like speed hacks etc).
*   Remember all replicated properties are sent reliably.

Replication of Actor Components and Subobjects
----------------------------------------------

The Actor class provides built-in support for replicating components (classes derived from UActorComponent). If you want a component on your actor to replicate you should call SetReplicates(true) on the specific component in your class constructor after calling PCIP.CreateDefaultSubobject() to create the component.

Advanced: Generic replication of Actor Subobjects
-------------------------------------------------

Unreal can also replicate arbitrary UObject's that you have in your actor and it's surprisingly easy to do so:

First create the object class that you want to replicate over the network. It should override UObject::IsSupportedForNetworking(). Just like any normal object it should also contain some replicated properties or functions, and implement GetLifetimeReplicatedProps():

### ReplicatedSubobject Class

ReplicatedSubobject.h <syntaxhighlight lang="cpp">

1.  pragma once
2.  include "Core.h"
3.  include "ReplicatedSubobject.generated.h"

UCLASS() class UReplicatedSubobject : public UObject {

   GENERATED\_UCLASS\_BODY()

public:

   UPROPERTY(Replicated)
   uint32 bReplicatedFlag:1;

   virtual bool IsSupportedForNetworking() const override
   {
       return true;
   }

}; </syntaxhighlight>

ReplicatedSubobject.cpp: <syntaxhighlight lang="cpp">

1.  include "UnrealNetwork.h"

UReplicatedSubobject::UReplicatedSubobject(const class FPostConstructInitializeProperties& PCIP)

Super(PCIP)

{ }

void UReplicatedSubobject::GetLifetimeReplicatedProps(TArray< FLifetimeProperty > & OutLifetimeProps) const {

   Super::GetLifetimeReplicatedProps(OutLifetimeProps);

   DOREPLIFETIME(UReplicatedSubobject, bReplicatedFlag);

} </syntaxhighlight>

### Actor Code For Subobject Support

On the Actor side we need to implement AActor::ReplicateSubobjects() and if we want to, we can store our custom object in a UPROPERTY just like any other object! The only "gotcha" here is that the object must be contained within the Actor (i.e. when it is constructed the new objects Outer must be the Actor).

<syntaxhighlight lang="cpp">

1.  pragma once
2.  include "Core.h"
3.  include "ReplicatedSubobject.h"
4.  include "AReplicatedActor.generated.h"

UCLASS() class AReplicatedActor : public AActor {

   GENERATED\_UCLASS\_BODY()

public:

   virtual void PostInitializeComponents() override;
   virtual bool ReplicateSubobjects(class UActorChannel \*Channel, class FOutBunch \*Bunch, FReplicationFlags \*RepFlags) override;

   /\*\* A Replicated Subobject \*/
   UPROPERTY(Replicated)
   UReplicatedSubobject\* Subobject;

private: }; </syntaxhighlight>

AReplicatedActor.cpp: <syntaxhighlight lang="cpp">

1.  include "ReplicatedActor.h"
2.  include "UnrealNetwork.h"
3.  include "Engine/ActorChannel.h"

AReplicatedActor::AReplicatedActor(const class FPostConstructInitializeProperties& PCIP)

Super(PCIP)

{

   bReplicates = true;

}

void AReplicatedActor::PostInitializeComponents() {

   Super::PostInitializeComponents();

   if (HasAuthority())
   {
       // Objects only replicate from server to client. If we didn't guard this
       // the client would create the object just fine but it would get replaced
       // by the server version (more accurately the property would be replaced to
       // point to the version from the server. The one the client allocated would
       // eventually be garbage collected.
       Subobject = NewObject<UReplicatedObject>(this); // NOTE: Very important, objects Outer must be our Actor!
   }

}

bool AReplicatedActor::ReplicateSubobjects(class UActorChannel \*Channel, class FOutBunch \*Bunch, FReplicationFlags \*RepFlags) {

   bool WroteSomething = Super::ReplicateSubobjects(Channel, Bunch, RepFlags);
   
   if (Subobject != nullptr)
   {
       WroteSomething |= Channel->ReplicateSubobject(Subobject, \*Bunch, \*RepFlags);
   }

   return WroteSomething;

}

void AReplicatedActor::GetLifetimeReplicatedProps(TArray< FLifetimeProperty > & OutLifetimeProps) const {

   Super::GetLifetimeReplicatedProps(OutLifetimeProps);

   DOREPLIFETIME(AReplicatedActor, Subobject);

} </syntaxhighlight>

### Notes

As if by magic, on clients their Subobject UPROPERTY will contain a valid pointer to the newly replicated object after it is received from the server. The UObject derived class can contain replicated functions and properties just like any other object (and can implement GetLifetimeReplicatedProps)

### Detailed Explanation

There is some awesomeness that is going on here that is worth peeking into to get an idea of the wizardry at work here.

Unreal networking is built around a few key classes and concepts. The first is an ActorChannel which is the connection to the server or client for transmitting data about the replication of an actor. The next piece is an FRepLayout contained inside the NetDriver. When Unreal calls your GetLifetimeReplicatedProps it does so only on the first replicated object of an instance of a specific UClass! The call to GetLifetimeReplicatedProps populates an FRepLayout object with the specific member fields that must be replicated for a particular UClass. This is why it's important not to have any conditionals in your GetLifetimeReplicatedProps that are based on object state.

Another part of the puzzle here is network GUIDs. Unreal generates a GUID for an instance of an object and stores objects in a replication map based on GUID. Objects are sent with a GUID identifier over the network. When Unreal replicates the value of a UPROPERTY that is a UObject\* it is really replicating the GUID of that object, not the pointer address.

So what's happening here is that Unreal replicates your actor and then your subobject over the wire. On the client side they are received and your subobject is constructed with the replicated data. Then your actor property is received with the GUID of your newly constructed subobject and the property is filled in with the address of your subobject. Neat!

### Unreal's Type System

The real magic that happens with Unreal's network replication is enabled because it is able to generate reflection meta-data for all of your objects which allows them to get the types and sizes of the fields you want replicated as if by "magic".

Unreal's type system is built from a custom C++ pre-processor (the UnrealHeaderTool) which scans your C++ codebase and generates reflection meta-data. For those uninitiated in the concept of language reflection (a feature common in C# and Java) it is the ability for code written in a language to perform "introspection" on itself and other types. This means that you can write code that programmatically discovers types, functions, function-parameters, variables, properties and other meta-data. This is not the same as polymorphism. Polymorphism depends on the compiler knowing what the base-type is at compile time (i.e. statically). With reflection your code never has to know anything about the types it is working with at compile time.

Related Wiki Tutorials
----------------------

[Network Replication, Using RepNotify Vars](/index.php?title=Network_Replication,_Using_ReplicatedUsing_/_RepNotify_vars "Network Replication, Using ReplicatedUsing / RepNotify vars")

[Networking/Replication](/index.php?title=Networking/Replication "Networking/Replication")

Epic Tutorials
--------------

[Replication](https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Replication/index.html)

[Component Replication](https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Replication/Components/index.html)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Replication&oldid=39](https://wiki.unrealengine.com/index.php?title=Replication&oldid=39)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")