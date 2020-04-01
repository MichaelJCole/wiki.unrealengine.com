 Network Replication, Using ReplicatedUsing / RepNotify vars - Epic Wiki             

 

Network Replication, Using ReplicatedUsing / RepNotify vars
===========================================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Using Repnotify/ReplicatedUsing](#Using_Repnotify.2FReplicatedUsing)
*   [3 Two Approaches](#Two_Approaches)
*   [4 Notation](#Notation)
*   [5 Server Rep](#Server_Rep)
*   [6 Virtual OnRep](#Virtual_OnRep)
*   [7 .H](#.H)
*   [8 CPP](#CPP)
*   [9 Conditional Replication](#Conditional_Replication)
*   [10 Summary](#Summary)
*   [11 Recommending Reading](#Recommending_Reading)

Overview
--------

_Author:_ [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Dear Community,

Someone asked for some tips on doing network replication in UE4, so I wrote up this tutorial really quick!

The net code structure I am showing here has worked great for me in real multiplayer games with up to 3 people involved who are all simultaneously using my multiplayer in-game editor to co-create the world together! In a packaged game!

Using Repnotify/ReplicatedUsing
-------------------------------

Here are two examples from my own code base of how I replicate things that dont have built in replication support like CharacterMovement->Velocity does.

These are things you have to use repnotify for so that every client will do the action that has to be performed locally.

These two examples involve gravity, which you have to set locally.

This is all occurring a class that extends ACharacter

Two Approaches
--------------

I use two different approaches in the code below.

In one case I rely on the value itself to always be dirtied and updated properly, a bit risky sometimes, depending on your situation.

In the other case I am flipping a bool that serves to guarantee replication will occur, and sending along the actual relevant data at the same time.

I'd recommend you try this latter approach first!

Notation
--------

Of the various notations that I use in function definitions, the only required ones are \_Validate and \_Implementation in the CPP file.

I use R\_ to tell myself that a variable is being replicated so I can clearly see why it appears in certain places in my .cpp files.

Server Rep
----------

The server has to call the OnRep function manually because it does not participate in replication updates since it is the one sending them.

To simplify my code base I just have the Server run the same code the clients are running as it's vars have already been updated.

You'd want to avoid running certain code on a dedicated server that is purely graphical in nature.

You can avoid running code on dedicated server by wrapping it with

<syntaxhighlight lang="cpp"> if(GEngine->GetNetMode(GetWorld()) != NM\_DedicatedServer) {

  //code to run on non-dedicated servers

} </syntaxhighlight>

Virtual OnRep
-------------

I always make OnRep functions virtual so that I can override just the OnRep part in subclasses, gaining full use of the replication structure I set up in the base class without having to re-write any of it in subclasses

.H
--

<syntaxhighlight lang="cpp"> //~~~ Physics Gravity ~~~ UFUNCTION(reliable, server, WithValidation) void SERVER\_SetPhysicsGravityActive(bool MakeActive);

UPROPERTY(ReplicatedUsing=OnRep\_SetPhysicsGravity) bool R\_PhysicsGravityActive;

UFUNCTION() virtual void OnRep\_SetPhysicsGravity();

  
//~~~ Gravity Scale ~~~

UFUNCTION(reliable, server, WithValidation) void SERVER\_SetGravityScale(float TheGravityScale);

UPROPERTY(ReplicatedUsing=OnRep\_SetGravityScale) bool DoRep\_GravityScale;

UPROPERTY(Replicated) float R\_GravityScale;

UFUNCTION() virtual void OnRep\_SetGravityScale(); </syntaxhighlight>

  

CPP
---

<syntaxhighlight lang="cpp"> //~~~ Physics Gravity ~~~ bool AJoyCharacterBase::SERVER\_SetPhysicsGravityActive\_Validate(bool MakeActive) { return true; } void AJoyCharacterBase::SERVER\_SetPhysicsGravityActive\_Implementation(bool MakeActive) { //Rep R\_PhysicsGravityActive = MakeActive; OnRep\_SetPhysicsGravity(); }

void AJoyCharacterBase::OnRep\_SetPhysicsGravity() { if(Mesh) { Mesh->SetEnableGravity(R\_PhysicsGravityActive); } }

  
//~~~ Gravity Scale ~~~ bool AJoyCharacterBase::SERVER\_SetGravityScale\_Validate(float TheGravityScale) { return true; } void AJoyCharacterBase::SERVER\_SetGravityScale\_Implementation(float TheGravityScale) { //Rep DoRep\_GravityScale = !DoRep\_GravityScale; R\_GravityScale = TheGravityScale;

//Server OnRep\_SetGravityScale(); }

void AJoyCharacterBase::OnRep\_SetGravityScale() { if(!UVictoryCore::VIsValid(CharacterMovement)) return; //~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CharacterMovement->GravityScale = R\_GravityScale; CharacterMovement->Velocity = FVector::ZeroVector; }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // Replication List void AJoyCharacterBase::GetLifetimeReplicatedProps( TArray< FLifetimeProperty > & OutLifetimeProps ) const { Super::GetLifetimeReplicatedProps( OutLifetimeProps );

//Physics Gravity DOREPLIFETIME(AJoyCharacterBase, R\_PhysicsGravityActive);

//Gravity Scale, Adjustments in In-Game Editor DOREPLIFETIME(AJoyCharacterBase, R\_GravityScale); DOREPLIFETIME(AJoyCharacterBase, DoRep\_GravityScale); } </syntaxhighlight>

Conditional Replication
-----------------------

There are several optional conditions you can place on whether a repnotify will occur!

See **CoreNet.h** for more info :)

<syntaxhighlight lang="cpp"> DOREPLIFETIME\_CONDITION( AShooterWeapon\_Instant, HitNotify, COND\_SkipOwner ); </syntaxhighlight>

Use the above macro instead of the standard DOREPLIFETIME if you wish to use the conditions below!

<syntaxhighlight lang="cpp"> /\*\* Secondary condition to check before considering the replication of a lifetime property. \*/ enum ELifetimeCondition { COND\_None = 0, // This property has no condition, and will send anytime it changes COND\_InitialOnly = 1, // This property will only attempt to send on the initial bunch COND\_OwnerOnly = 2, // This property will only send to the actor's owner COND\_SkipOwner = 3, // This property send to every connection EXCEPT the owner COND\_SimulatedOnly = 4, // This property will only send to simulated actors COND\_AutonomousOnly = 5, // This property will only send to autonomous actors COND\_SimulatedOrPhysics = 6, // This property will send to simulated OR bRepPhysics actors COND\_InitialOrOwner = 7, // This property will send on the initial packet, or to the actors owner COND\_Custom = 8, // This property has no particular condition, but wants the ability to toggle on/off via SetCustomIsActiveOverride COND\_Max = 9, }; </syntaxhighlight>

Summary
-------

Here I've demonstrated two ways to use ReplicatedUsing / Repnotify variables, and how you can use them to replicate effects and changes to the game state that are not already replicated for you by UE4!

Enjoy!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Recommending Reading
--------------------

**Epic Networking Tips and Tricks**

[https://www.unrealengine.com/blog/network-tips-and-tricks](https://www.unrealengine.com/blog/network-tips-and-tricks)

  
I recommend checking out Zoid's wiki on replication!

He goes over all the basics and terminology for you!

[https://wiki.unrealengine.com/Replication](https://wiki.unrealengine.com/Replication)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Network\_Replication,\_Using\_ReplicatedUsing\_/\_RepNotify\_vars&oldid=207](https://wiki.unrealengine.com/index.php?title=Network_Replication,_Using_ReplicatedUsing_/_RepNotify_vars&oldid=207)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")