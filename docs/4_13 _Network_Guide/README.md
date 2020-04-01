 4 13+ Network Guide - Epic Wiki             

 

4 13+ Network Guide
===================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 Game Framework Replication](#Game_Framework_Replication)
*   [3 Replicated Functions](#Replicated_Functions)
*   [4 Current Documentation](#Current_Documentation)
    *   [4.1 C++](#C.2B.2B)
    *   [4.2 Blueprint](#Blueprint)
    *   [4.3 Testing Multiplayer](#Testing_Multiplayer)
*   [5 Host vs Dedicated Server](#Host_vs_Dedicated_Server)
*   [6 Bare-bones Project, ready for multiplayer, with Steam](#Bare-bones_Project.2C_ready_for_multiplayer.2C_with_Steam)
*   [7 Common Project Issues](#Common_Project_Issues)
    *   [7.1 Dedicated Server](#Dedicated_Server)
    *   [7.2 Steam](#Steam)
    *   [7.3 Non-Steam](#Non-Steam)
    *   [7.4 Creating/Finding/Joining Sessions](#Creating.2FFinding.2FJoining_Sessions)
*   [8 Common Networking Issues](#Common_Networking_Issues)
    *   [8.1 When replicated functions aren't working](#When_replicated_functions_aren.27t_working)
    *   [8.2 Variables aren't replicating](#Variables_aren.27t_replicating)

Introduction
------------

Unreal Engine 4 includes a RPC system suited for many different types of multiplayer game development. UE4 networking is built around a server to client model. This model relies on the server to be the authority. The authority is what holds all of the “correct” data, updating the client(s) when needed, resulting in the clients holding an approximation of what is happening on the server.

Actors are the core of the networking system. During the network update, the server will gather Actors and then decide which is relevant for replication before sending the updated information to the client(s). Once the client(s) get the updated data from the server, they can then update their copy of the Actor, resulting in a client side representation of what is happening on the server. The continues regularly as the game is played, providing a multiplayer experience for the client(s) connected to the host.

In order for you game to use the RPC system in Unreal Engine 4, it has to include UnrealNetwork.h. You can include this anywhere you want to use it but I recommend that if you are making a multiplayer game, include it in the project header file. This file will share the same name as your project. As an example, if you project is named, "ShooterGame", the project header will be "ShooterGame.h".

In that file, make sure you have the following:

<syntaxhighlight lang="cpp">

1.  include "Engine.h"
2.  include "UnrealNetwork.h"

</syntaxhighlight>

_If this file has "EngineMinimal.h", change it to "Engine.h"_

Every Actor holds variables that can be replicated. In order to replicate, the variables need to start with the macro, UPROPERTY( ). Such as:

<syntaxhighlight lang="cpp"> UPROPERTY( Replicated ) MyWeaponClass \*Weapon; </syntaxhighlight>

By default, UPROPERTY will not replicate. You must set it to in the Actor .cpp file, in the following function:

<syntaxhighlight lang="cpp"> void AMyWeaponInventory::GetLifetimeReplicatedPropers( TArray<FLifetimeProperty> &OutLifetimeProps ) const { DOREPLIFETIME( AMyWeaponInventory, Weapon ); } </syntaxhighlight>

Here is an example of a class with a single replicated value:

**\[MyActor.h\]**

<syntaxhighlight lang="cpp">

1.  pragma once
2.  include "GameFramework/Actor.h"
3.  include "MyActor.generated.h"

UCLASS( ) class MYGAME\_API AMyActor : public AActor { GENERATED\_BODY( )

public: AMyActor(); virtual void BeginPlay( ) override; virtual void Tick( float DeltaTime ) override;

UPROPERTY( replicated ) float Health; }; </syntaxhighlight>

**\[MyActor.cpp\]**

<syntaxhighlight lang="cpp">

1.  include "MyGame.h"
2.  include "MyActor.h"

AMyActor::AMyActor( ) {

   bReplicates = true;

}

void AMyActor::BeginPlay( ) { Super::BeginPlay( ); }

void AMyActor::Tick( float DeltaTime ) { Super::Tick( DeltaTime ); }

void AMyActor::GetLifetimeReplicatedProps( TArray< FLifetimeProperty > & OutLifetimeProps ) const {

   DOREPLIFETIME( AMyActor, Health );

} </syntaxhighlight>

"MyActor" will now replicate to all clients as well as when the Authority (server) changes the "Health" value, that value will be updated for all clients.

This is the basic premise of all replication in UE4. Classes that you want to have behavior in a multiplayer world are updated by the server and then the server, or authority, will update all the clients whenever a UPROPERTY( ) variable marked as Replicated has been changed.

Game Framework Replication
--------------------------

Classes that affect multiplayer:

**GameMode**

The GameMode object only exists on the server. This means that if a GameMode has a reference to a Actor that is replicated, and changes any replicated variables, the only change will be on the server because the references and Game Mode itself are only accessible by server side classes.

**GameState**

The GameState exists on the server and the clients, so the server can use replicated variables on the GameState to keep all clients up-to-date on data about the game.

**Pawn/Character**

Pawns/Characters will also exist on the server and on all clients, and can also contain replicated variables and events. The decision of whether to use the PlayerState or the Pawn for a certain variable or event will depend on the situation, but the main thing to keep in mind is that the PlayerState will persist for the entire time the player is connected, but a Pawn may not. For example, if a player character dies during gameplay, the Pawn he was controlling may be destroyed and a new one created when the player respawns.

**PlayerController**

A PlayerController exists on the server for every player connected to the game. On clients, only the PlayerControllers for players owned by that client exist. This means that PlayerControllers are not the best place to store replicated properties that all connected clients are interested in. Instead, use the PlayerState.

**PlayerState**

A PlayerState will exist for every player connected to the game on both the server and the clients. This class can be used for replicated properties that all clients, not just the owning client, are interested in, such as the individual player's current score.

Replicated Functions
--------------------

Unreal 4 has two types of replicated functions. These are client side, used for when the server needs to update a client, and a server side, used for when a client needs to update the server.

A client side function is written as such:

**\[.h\]** <syntaxhighlight lang="cpp"> UFUNCTION( Client, Reliable ) void ClientTestFunction( );

UFUNCTION( Client, Unreliable ) void ClientSecondTestFunction( ); </syntaxhighlight>

**\[.cpp\]**

<syntaxhighlight lang="cpp"> void AMyClass::ClientTestFunction\_Implementation( ) {

  // Reliable will always be called over the network

}

void AMyClass::ClientSecondTestFunction\_Implementation( ) {

   // Unreliable will not be called if the network is overly saturated

} </syntaxhighlight>

A server function example:

**\[.h\]**

<syntaxhighlight lang="cpp"> UFUNCTION( Server, Reliable, WithValidation ) void ServerTestFunction( );

UFUNCTION( Server, Unreliable, WithValidation ) void ServerSecondTestFunction( ); </syntaxhighlight>

**\[.cpp\]**

<syntaxhighlight lang="cpp"> bool MyActor::ServerTestFunction\_Validate( ) {

   return true;

}

void MyActor::ServerTestFunction\_Implementation( ) {

   // Reliable will always be called over the network

}

bool MyActor::ServerSecondTestFunction\_Validate( ) {

   return true;

}

void MyActor::ServerSecondTestFunction\_Implementation( ) {

   // Unreliable will not be called if the network is overly saturated

} </syntaxhighlight>

If any \_Validate( ) function returns false, the client who called that server function will be disconnected. This is how UE4 handles bad data. This can also be used as a layer in an anti-cheat system.

_Server side functions always need to be validated. There is no setting or alternative. If you use a server function, reliable or unreliable, it must also include the validate function. Client functions can choose to use WithValidation or not to use it._

Current Documentation
---------------------

##### C++

[https://docs.unrealengine.com/latest/INT/Gameplay/Networking/index.html](https://docs.unrealengine.com/latest/INT/Gameplay/Networking/index.html) [https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Actors/RPCs/](https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Actors/RPCs/) [https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Actors/index.html](https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Actors/index.html) [https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Actors/Properties/index.html](https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Actors/Properties/index.html)

##### Blueprint

[https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Blueprints/](https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Blueprints/) [https://docs.unrealengine.com/latest/INT/Gameplay/HowTo/Networking/ReplicateActor/Blueprints/index.html](https://docs.unrealengine.com/latest/INT/Gameplay/HowTo/Networking/ReplicateActor/Blueprints/index.html) [https://docs.unrealengine.com/latest/INT/Gameplay/HowTo/Networking/ReplicateFunction/Blueprints/index.html](https://docs.unrealengine.com/latest/INT/Gameplay/HowTo/Networking/ReplicateFunction/Blueprints/index.html) [https://docs.unrealengine.com/latest/INT/Gameplay/HowTo/Networking/ReplicateVariable/Blueprints/index.html](https://docs.unrealengine.com/latest/INT/Gameplay/HowTo/Networking/ReplicateVariable/Blueprints/index.html)

##### Testing Multiplayer

[https://docs.unrealengine.com/latest/INT/Gameplay/HowTo/Networking/TestMultiplayer/index.html](https://docs.unrealengine.com/latest/INT/Gameplay/HowTo/Networking/TestMultiplayer/index.html)

Host vs Dedicated Server
------------------------

If you game supports both other players hosting games as well as running a Dedicated Server, you have to solve a interesting problem because the Dedicated Server will not render anything. This means that you have to have a authoritative route in your code / Blueprint that allows a host to visually see things like FX and hear sounds from something like PlaySoundAtLocation while making sure that the Dedicated Server doesn't try to do the same. This is because the Dedicated Server will throw a warning and can cause issues if it is trying to play FX or sounds.

Here is an example how to do this:

**\[C++\]**

\[Character.cpp\] <syntaxhighlight lang="cpp"> void ATCharacter::Shoot( ) {

   if( Role < ROLE\_Authority )
   {
       ServerShoot( );
   }
       
   if( Weapon )
   {
       if( Weapon->bCanFire )
       {
           Weapon->Fire( );       
       }
   }

}

bool ATCharacter::ServerShoot\_Validate( ) {

   return true;

}

void ATCharacter::ServerShoot\_Implementation( ) {

   Shoot( );

} </syntaxhighlight>

\[Weapon.cpp\] <syntaxhighlight lang="cpp"> void ATWeapon::Fire( ) {

   // Non dedicated servers do muzzle flash
   if( GetNetMode( ) != NM\_DedicatedServer )
   {
       MuzzleFX( );   
   }

   // Authority fire Projectile
   if( Role == ROLE\_Authority )
   {
       // Handle spawning projectile
   }

}

void ATWeapon::MuzzleFX( ) {

   FVector FireLoc = ( FirePoint ) ? FirePoint->GetComponentLocation( ) : GetActorLocation( );
   FRotator FireRot = ( FirePoint ) ? FirePoint->GetComponentRotation( ) : GetActorRotation( );
   if( MuzzleFXTemplate )
   {
       UGameplayStatics::SpawnEmitterAtLocation( GetWorld( ), MuzzleFXTemplate, FireLoc, FireRot );
   }
   
   if( MuzzleSound )
   {
       UGameplayStatics::PlaySoundAtLocation( GetWorld( ), MuzzleSound, FireLoc );
   }    

}

</syntaxhighlight>

**\[Blueprint\]**

[![HostFire.png](https://d26ilriwvtzlb.cloudfront.net/0/07/HostFire.png)](/index.php?title=File:HostFire.png)

This sort of logic can be a bit much to understand at first but once you practice a bit, it shouldn't be much of an issue. Just remember to ask yourself the critical questions when it comes to replication, Here are a few as an example:

*   If I am the server, am I dedicated or a host?
*   If I am a dedicated server, how do I want to handle this function, compared to if I am the host?
*   If I am the host, how do I want to handle this function, compared to a dedicated server?
*   At this point in code, am I calling from the server or client?
*   Do I want the client to do this or the server?
*   Do I want this code to replicate to all clients or only to one?
*   Do I want this variable to be replicated? If so, why?
*   Should this replicated variable be RepNotify, so clients have an event when it's replicated? If so, how do I want to use this event that is different than just having the variable replicated?

Bare-bones Project, ready for multiplayer, with Steam
-----------------------------------------------------

I have created this project using the Editor, New Project window, chose C++ and then chose "Blank".

In this example, my project is named "SteamExampleCPP". You do not have to use this name, just make sure that when you see it in the code below, to replace it with the name you are using.

**\[SteamExampleCPP.Build.cs\]**

<syntaxhighlight lang="cpp"> using UnrealBuildTool;

public class SteamExampleCPP : ModuleRules {

    public SteamExampleCPP(TargetInfo Target)
    {

PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "OnlineSubsystemUtils" });

PrivateDependencyModuleNames.Add("OnlineSubsystem");

    }

} </syntaxhighlight>

**\[SteamExampleCPP.h\]** <syntaxhighlight lang="cpp">

1.  pragma once

1.  include "Engine.h"
2.  include "UnrealNetwork.h"

</syntaxhighlight>

With these changes in place, you can compile using the "Compile" button in UE4. Or, if UE4 is not running, you can right click on the project .sln in Visual Studio and build from there.

If after the compile you still don't have UE4 running, run it. You can do this through debugging from Visual Studio or by double-clicking the .uproject for the UE4 project.

Once UE4 is open, create a new C++ Class that inherits from Character. You can create a new class by opening the Content Browser, finding the "C++ Classes" folder and then opening it. If you right-click inside of it, you can then choose "Create new C++ Class". Alternatively, you can choose, File -> Create new C++ Class, and then choose the class you want to create.

**\[SteamCharacter.h\]** <syntaxhighlight lang="cpp">

1.  pragma once

1.  include "GameFramework/Character.h"
2.  include "SteamCharacter.generated.h"

UCLASS() class STEAMEXAMPLECPP\_API ASteamCharacter : public ACharacter {

   GENERATED\_BODY()

public:

   ASteamCharacter();
   
   // Component for camera movement and distance
   UPROPERTY( BlueprintReadOnly, VisibleAnywhere, Category = "Steam Character" )
   USpringArmComponent \*SpringArm;
   
   // Camera component - players view point in world
   UPROPERTY( BlueprintReadOnly, VisibleAnywhere, Category = "Steam Character" )
   UCameraComponent \*Camera;
   
   // On loaded in game
   virtual void BeginPlay() override;
   
   // On every frame
   virtual void Tick( float DeltaSeconds ) override;
   
   // Gives this Character a chance to setup its InputComponent
   virtual void SetupPlayerInputComponent(class UInputComponent\* InputComponent) override;

   // Moves the Character forward, based on the input value, A
   void Forward( float A );
   
   // Moves the Character right, based on the input value, A
   void Right( float A );	

}; </syntaxhighlight>

**\[SteamCharacter.cpp\]** <syntaxhighlight lang="cpp">

1.  include "SteamExampleCPP.h"
2.  include "SteamCharacter.h"

ASteamCharacter::ASteamCharacter() {

   PrimaryActorTick.bCanEverTick = true;
   
   SpringArm = CreateDefaultSubobject<USpringArmComponent>( TEXT("SpringArm") );
   SpringArm->bUsePawnControlRotation = true;
   SpringArm->SetupAttachment( RootComponent );
   
   Camera = CreateDefaultSubobject<UCameraComponent>( TEXT("Camera") );
   Camera->bUsePawnControlRotation = true;
   Camera->SetupAttachment( SpringArm );

}

void ASteamCharacter::BeginPlay() {

   Super::BeginPlay();

}

void ASteamCharacter::Tick( float DeltaTime ) {

   Super::Tick( DeltaTime );

}

void ASteamCharacter::SetupPlayerInputComponent(class UInputComponent\* IC) {

   // Renamed to "IC" to fix compile issue with InputComponent already being used elsewere in class
   Super::SetupPlayerInputComponent(IC);

   IC->BindAxis( "Forward", this, &ASteamCharacter::Forward );
   IC->BindAxis( "Right", this, &ASteamCharacter::Right );
   
   // Use already existing functionality for turning / looking
   IC->BindAxis( "Look", this, &ACharacter::AddControllerYawInput );
   IC->BindAxis( "Up", this, &ACharacter::AddControllerPitchInput );
   
   // Existing jump from Character
   IC->BindAction( "Jump", IE\_Pressed, this, &ACharacter::Jump );

}

void ASteamCharacter::Forward( float A ) {

   if( A != 0.f )
   {
       AddMovementInput( GetActorForwardVector( ), A );
   }

}

void ASteamCharacter::Right( float A ) {

   if( A != 0.f )
   {
       AddMovementInput( GetActorRightVector( ), A );
   }

} </syntaxhighlight>

Next, we want to add the input settings we just declared in the Character class, so we can move the Character and look around with the camera.

Left-click the Settings button and then choose Project Settings. On the left side of the window that opens, choose "Input". Add Action and Axis mappings and change them to match these:

[![SteamSetupInput.png](https://d26ilriwvtzlb.cloudfront.net/5/55/SteamSetupInput.png)](/index.php?title=File:SteamSetupInput.png)

Next, we want to create a Blueprint class from the SteamCharacter class. This way we have a asset in the editor we can add to/adjust that has all the base functionality we setup in code.

To create a Blueprint class from a custom C++ Class, in the Content Browser, find the "C++ Classes" folder and click it. Inside of it you should see the classes for the project. Right click on the class you want to make a Blueprint from - in this case, from the SteamCharacter class - and then choose, "Create Blueprint class based on <ClassName>".

[![BlueprintCreation.png](https://d26ilriwvtzlb.cloudfront.net/2/29/BlueprintCreation.png)](/index.php?title=File:BlueprintCreation.png)

In the popup window, name the class something that hasn't been used. I generally use the class name followed with \_BP, such as, "SteamCharacter\_BP". Then click, "Create Blueprint class".

You can now open the Blueprint class by double clicking on it.

We want to setup the Character with SkeletalMesh, as well as setup the SpringArm and Camera we created in the C++ class. Because I do not have any art assets in this project, I will be using a existing SkeletalMesh from the Engine content folders. You however, can use whatever Character model you have.

If you select "Mesh" from the Components List, at the top left of the Blueprint "Viewport" window, you can set the SkeletalMesh on the right side. If you do not see any SkeletalMesh options from the Mesh selection, left click the small eye icon on the bottom right and choose, "Show Engine content". You make need to adjust the SkeletalMesh.

By default, forward is down the X axis. You can tell by the small gizmo in the viewport. You can also move the SkeletalMesh so it is within the collision capsule in the Character. Finally, the camera can be adjusted by selecting the SpringArm Component and by moving it where you want to. You can move the camera closer and farther by setting the SpringArm "TargetLength" setting to whatever value you want.

My Character looks like:

[![SteamCharacterBP.png](https://d26ilriwvtzlb.cloudfront.net/8/88/SteamCharacterBP.png)](/index.php?title=File:SteamCharacterBP.png)

Next, we want to make sure that our Character Blueprint is what is used as our DefaultPawnClass in our GameMode.

**\[SteamExampleCPPGameMode.h\]** <syntaxhighlight lang="cpp">

1.  pragma once

1.  include "GameFramework/GameMode.h"
2.  include "SteamExampleCPPGameMode.generated.h"

UCLASS() class STEAMEXAMPLECPP\_API ASteamExampleCPPGameMode : public AGameMode { GENERATED\_BODY()

public:

   ASteamExampleCPPGameMode( );	

}; </syntaxhighlight>

**\[SteamExampleCPPGameMode.cpp\]** <syntaxhighlight lang="cpp">

1.  include "SteamExampleCPP.h"
2.  include "SteamExampleCPPGameMode.h"
3.  include "SteamCharacter.h"

ASteamExampleCPPGameMode::ASteamExampleCPPGameMode( ) {

   static ConstructorHelpers::FClassFinder<APawn> PawnAsset( TEXT("/Game/SteamCharacter\_BP") );
   if( PawnAsset.Succeeded( ) )
   {
       DefaultPawnClass = PawnAsset.Class;
   }

} </syntaxhighlight>

If you are having issues, make sure that the path to your Blueprint is correct, inside of the following:

<syntaxhighlight lang="cpp"> PawnAsset( TEXT("") ); </syntaxhighlight>

As a note, the asset path always starts with /Game/. As an example, let's say you have a character named, MyCharacter\_BP that is inside of a folder called Characters, which is inside a folder called Blueprint. The path would be:

<syntaxhighlight lang="cpp"> /Game/Blueprints/Character/MyCharacter\_BP </syntaxhighlight>

Back in UE4, press the Compile button to compile what was just added to the GameMode. When that is done, open the "Maps & Modes" settings by clicking on "Settings" and going to "Project Settings". Then, on the left of that window, click on "Maps & Modes".

Change it to look like (or as close as you can):

[![SteamExample Mapsandmodes.png](https://d26ilriwvtzlb.cloudfront.net/e/e7/SteamExample_Mapsandmodes.png)](/index.php?title=File:SteamExample_Mapsandmodes.png)

The "default" map is a very simple map I made. Make one yourself and name it anything you want. Make sure to have a map set for all of the map fields and that game mode is set for Default Game Mode and Server Game Mode.

If you press the Play button, you should not be able to run around as your Character, using WASD and the mouse.

Make sure to save everything you have created, we now want to enable OnlineSubsystemSteam.

Press the Edit option in the top menu bar and then go to, Plugins. In the Plugins window, under Online Platform, scroll down and use the checkbox to turn on, Online Subystem Steam. A bar will show up asking you to restart the editor. Once this is set, go ahead and simply close UE4, saving anything that needs to be saved.

We can now add the required config settings. In the project folder, in the Config folder, open DefaultEngine.ini. You can also open this file in Visual Studio.

Add the following to DefaultEngine: <syntaxhighlight lang="cpp"> \[/Script/Engine.GameEngine\] !NetDriverDefinitions=ClearArray +NetDriverDefinitions=(DefName="GameNetDriver",DriverClassName="/Script/OnlineSubsystemSteam.SteamNetDriver",DriverClassNameFallback="/Script/OnlineSubsystemUtils.IpNetDriver")

\[OnlineSubsystem\] DefaultPlatformService=Steam PollingIntervalInMs=20

\[OnlineSubsystemSteam\] bEnabled=true SteamDevAppId=480 GameServerQueryPort=27015 bRelaunchInSteam=false GameVersion=1.0.0.0 bVACEnabled=1 bAllowP2PPacketRelay=true P2PConnectionTimeout=90

\[/Script/OnlineSubsystemSteam.SteamNetDriver\] NetConnectionClassName="/Script/OnlineSubsystemSteam.SteamNetConnection" </syntaxhighlight>

Save the DefaultEngine.ini file and restart the UE4 Editor. You can do so through either the .uproject or by launching through Visual Studio.

The last step we need to do is have the ability to create / join a game. Open the SteamCharacter\_BP (or your equivalent) and add the following to the Event Graph:

[![Steam createjoingame.png](https://d26ilriwvtzlb.cloudfront.net/7/79/Steam_createjoingame.png)](/index.php?title=File:Steam_createjoingame.png)

Make sure to compile your Blueprint and save.

You can now package the project and use Steam to create and join games. "J" creates the game. "K" will join an existing game; this takes a few seconds and if you spam the "K" key, it could fail, so press it once and as long as you don't see a debug text tell you that joining failed, just wait.

Attached here is the sample project: [Steam Example Project C++ \[4.13\]](https://drive.google.com/open?id=0B_7mVza1uzD5S3plTGNJcldEQ3M)

_If you download this, you must right click the SteamExampleCPP.uproject and choose, "Generate Visual Studio files"._

Common Project Issues
---------------------

##### Dedicated Server

UE4 gives you the ability to create a Dedicated Server for your game. Here is a break down on how to do it:

*   Be running source. If you do not have source, you will need to get it. You can start here: [https://wiki.unrealengine.com/GitHub\_Setup](https://wiki.unrealengine.com/GitHub_Setup)
*   After building UE4, create a new C++ Project. (Remember that Template Projects aren't setup for multiplayer and if you use one, you will not see the same functionality as in a standalone game) - This is where you'd normally start working on your game / have your game made.
*   Close Visual Studio and find the project folder where you created your project.
*   Open the Source folder and right-click -> Text Document.
*   Name the Text document <MyGame>Server.Target.cs. As an example, if your game is "RTS", your file name will be, RTSServer.Target.cs.

_As a note, if you do not have the ability to change the extension on your file(s) in Windows, you will need to go to your folder options and enable that. You can do this by pressing the Start Button or clicking the Windows icon and search, "Control Panel". Open Control Panel and then search for "Folder Options". Open the "View" Tab and un-check "Hide extensions for known files types, then press "Apply" then "OK"._

*   Open your <MyGame>.Target.cs file and add the following, replacing every "Game" with your game name. Again, as an example, if your game name is "RTS", you would change "GameServerTarget" to RTSServerTarget and OutExtraModuleNames.Add("Game") to OutExtraModuleNames.Add("RTS").

*   If you are working in 4.14+, the last two functions will need to be removed.

<syntaxhighlight lang="cpp"> // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool; using System.Collections.Generic;

public class GameServerTarget : TargetRules {

   public GameServerTarget(TargetInfo Target)
   {
       Type = TargetType.Server;
   }

   //
   // TargetRules interface.
   //
   public override void SetupBinaries(
       TargetInfo Target,
       ref List<UEBuildBinaryConfiguration> OutBuildBinaryConfigurations,
       ref List<string> OutExtraModuleNames
       )
   {
       base.SetupBinaries(Target, ref OutBuildBinaryConfigurations, ref OutExtraModuleNames);
       OutExtraModuleNames.Add("Game");
   }

   public override bool GetSupportedPlatforms(ref List<UnrealTargetPlatform> OutPlatforms)
   {
       // It is valid for only server platforms
       return UnrealBuildTool.UnrealBuildTool.GetAllServerPlatforms(ref OutPlatforms, false);
   }

  

   //Remove below this comment if you are using 4.14. You'll need to make sure you don't delete the end bracket as well.
   public override List<UnrealTargetPlatform> GUBP\_GetPlatforms\_MonolithicOnly(UnrealTargetPlatform HostPlatform)
   {
       if (HostPlatform == UnrealTargetPlatform.Mac)
       {
           return new List<UnrealTargetPlatform>();
       }
       return new List<UnrealTargetPlatform> { HostPlatform, UnrealTargetPlatform.Win32, UnrealTargetPlatform.Linux };
   }

   public override List<UnrealTargetConfiguration> GUBP\_GetConfigs\_MonolithicOnly(UnrealTargetPlatform HostPlatform, UnrealTargetPlatform Platform)
   {
       return new List<UnrealTargetConfiguration> { UnrealTargetConfiguration.Development };
   }

} </syntaxhighlight>

*   Save this file and then close it.\*
*   In your project folder (without UE4 or Visual Studio running; if they are close them) right-click on the .uproject and select "Generate Visual Studio project files". This will take a second.\*
*   Then, open the .sln by double-clicking on it, which will open Visual Studio.\*
*   In your Solution Explorer on the right side of Visual Studio, in the Games -> MyGameName -> Source folder, you should now have the <MyGame>Server.Target.cs file.\*
*   Open the .uproject for your game and package your project by choosing File-> Package Project -> Windows -> Win64. [https://docs.unrealengine.com/latest...cts/Packaging/\*](https://docs.unrealengine.com/latest...cts/Packaging/*)
*   When the project is done packaging, again open the .sln for your project and change the build configuration from "Development Editor" to "Development Server".\*
*   Right click on your game under "Games" and choose "Build". This will take a while, it is building your <MyGame>Server.exe
*   When Visual Studio is done, go to your project folder -> Binaries -> Win64 and copy the <MyGame>Server.exe
*   Go to the folder where you packaged your game and open WindowsNoEditor->Binaries->Win64 and paste <MyGame>Server.exe in this folder
*   Right click on <MyGame>Server.exe and copy. Then right-click somewhere else and choose "Paste Shortcut"
*   Right click on the shortcut and go to, "Properties".
*   At the end of the "Target" line add, -log

You can now launch the dedicated server for your project with this short cut.

Here is more documentation:

\[Networking\]

*   [https://docs.unrealengine.com/latest...ay/Networking/](https://docs.unrealengine.com/latest...ay/Networking/)
*   [https://docs.unrealengine.com/latest...ng/Blueprints/](https://docs.unrealengine.com/latest...ng/Blueprints/)
*   [https://docs.unrealengine.com/latest...es/Networking/](https://docs.unrealengine.com/latest...es/Networking/)
*   [https://www.unrealengine.com/blog/bl...king-tutorials](https://www.unrealengine.com/blog/bl...king-tutorials)

\[Dedicated server\]

*   [https://wiki.unrealengine.com/Dedica...ows\_%26\_Linux](https://wiki.unrealengine.com/Dedica...ows_%26_Linux))

##### Steam

You need to do a few things in 4.13.

First, add this to your DefaultEngine.ini file: <syntaxhighlight lang="cpp"> \[/Script/Engine.GameEngine\] !NetDriverDefinitions=ClearArray +NetDriverDefinitions=(DefName="GameNetDriver",DriverClassName="/Script/OnlineSubsystemSteam.SteamNetDriver",DriverClassNameFallback="/Script/OnlineSubsystemUtils.IpNetDriver")

\[OnlineSubsystem\] DefaultPlatformService=Steam PollingIntervalInMs=20

\[OnlineSubsystemSteam\] bEnabled=true SteamDevAppId=480 GameServerQueryPort=27015 bRelaunchInSteam=false GameVersion=1.0.0.0 bVACEnabled=1 bAllowP2PPacketRelay=true P2PConnectionTimeout=90

\[/Script/OnlineSubsystemSteam.SteamNetDriver\] NetConnectionClassName="/Script/OnlineSubsystemSteam.SteamNetConnection" </syntaxhighlight>

Secondly:

*   In UE4, go to Edit->Plugins
*   Select, Online Platform
*   Enable, Online Subsystem Steam
*   Restart Editor

Lastly, if you are using a C++ project, add the following to your <GameName>.Build.cs file: <syntaxhighlight lang="cpp"> PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "OnlineSubsystemUtils" });

PrivateDependencyModuleNames.Add("OnlineSubsystem"); </syntaxhighlight> Steam should work.

##### Non-Steam

There is a default Online Subsystem with UE4 called, OnlineSubsystemNull. This is used when you do not want to use any other Online Subsystem; such as Steam, Amazon, Oculus, ect...

In your projects DefaultEngine.ini, add the following: <syntaxhighlight lang="cpp"> \[OnlineSubsystem\] DefaultPlatformService=Null </syntaxhighlight>

If you have a C++ Project, add the following to your <GameName>.build.cs file: <syntaxhighlight lang="cpp"> PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "OnlineSubsystemUtils" }); PrivateDependencyModuleNames.Add("OnlineSubsystem"); </syntaxhighlight>

##### Creating/Finding/Joining Sessions

Once you have a Online Subsystem set, you should be able to create and join sessions.

_If you do not have a project setup with a Online Subsystem, look above for instruction._

**\[Blueprint - Character\]**

[![Steam createjoingame.png](https://d26ilriwvtzlb.cloudfront.net/7/79/Steam_createjoingame.png)](/index.php?title=File:Steam_createjoingame.png)

**\[Blueprint - Player Controller\]**

[![Controller sessions.png](https://d26ilriwvtzlb.cloudfront.net/6/6a/Controller_sessions.png)](/index.php?title=File:Controller_sessions.png)

**\[C++\]**

There is already an example of how to create sessions via code. You can view that here:

[UE4 Wiki - Sessions with C++](https://wiki.unrealengine.com/How_To_Use_Sessions_In_C%2B%2B)

Common Networking Issues
------------------------

##### When replicated functions aren't working

To start, with a C++ project, make sure that you include this in your project: <syntaxhighlight lang="cpp">

1.  include "UnrealNetwork.h"

</syntaxhighlight>

When only the server/host or client is working, this is generally a sign that you are not replicating anything out to your client(s). This is where you need to ask yourself where in your code / Blueprints are you trying to create your functionality.

As an example, if you are having an issue where when your player presses a button to spawn an actor and that actor is only replicated when the host does it, this is because the host side is the authority so it spawns, whereas when the client (non authority) tries it, it wont replicate because the server in the game (or host) doesn't know to spawn it so it get replicated out.

Make sure that when doing anything game related that if it is the client who is initiating it, to call the server (dedicated or host) so they can do it. This way whatever you are doing will be replicated to the other client(s).

Here is an example of how to handle input in an environment where it could be a host or a client:

[![Clienthostshoot.png](https://d26ilriwvtzlb.cloudfront.net/1/13/Clienthostshoot.png)](/index.php?title=File:Clienthostshoot.png)

Another possibility is that the Actor that is not working is also not set to replicates. In Blueprint, in the "Replication" settings, make sure that "replicates" is on.

[![Blueprint replicates.png](https://d26ilriwvtzlb.cloudfront.net/2/27/Blueprint_replicates.png)](/index.php?title=File:Blueprint_replicates.png)

_This is an example, you may not always need anything more than "Replicates" to be checked. Only use what you need, otherwise you may have unnecessary bandwidth uses or have behavior you don't want/need._

In code, you can set replicates in the Constructor with: <syntaxhighlight lang="cpp"> bReplicates = true; </syntaxhighlight> You may also need to add: <syntaxhighlight lang="cpp"> bAlwaysRelevant= true; </syntaxhighlight>

Looking something like: <syntaxhighlight lang="cpp"> AMyActor::AMyActor( ) {

   PrimaryActorTick.bCanEverTick = true;
   bReplicates = true;
   bAlwaysRelevant= true;

} </syntaxhighlight>

If you want your Actor to replicate its movement, you would add: <syntaxhighlight lang="cpp"> bReplicateMovement = true; </syntaxhighlight>

<syntaxhighlight lang="cpp"> AMyActor::AMyActor( ) {

   PrimaryActorTick.bCanEverTick = true;
   bReplicates = true;
   bAlwaysRelevant= true;
   bReplicateMovement = true;

} </syntaxhighlight>

##### Variables aren't replicating

The first thing to remember is that variables will never replicate unless the authority (server) is what is changing them. If you are a client and want to replicate a variable, make sure you are calling a server side function to do so. UE4 relies on the authority for all replication changes, there is no way for a client to replicate anything unless it asks the authority (server) to do it.

Secondly, should check is to make sure the variable is set to be replicated and that the Actor it belongs to is set so it replicates.

In Blueprint, when you create a variable, on the detail panel on the right side of the Blueprint "Editor Graph", with the variable selected, select the drop down labeled "Replication". You can then change the type of variable replication you want to use.

[![Blueprint variable replicated.png](https://d26ilriwvtzlb.cloudfront.net/5/5b/Blueprint_variable_replicated.png)](/index.php?title=File:Blueprint_variable_replicated.png)

If you choose that the variable is RepNotify, you will also get a function called, OnRep\_<variablename>. As an example, if your variable name is "Health", your RepNotify function will be "OnRep\_Health".

[![Onrep health.png](https://d26ilriwvtzlb.cloudfront.net/b/bf/Onrep_health.png)](/index.php?title=File:Onrep_health.png)

In C++, make sure that your project / class has included UnrealNetwork.h (look above for instruction) and that your variable was declared correctly. Such as:

**\[.h\]** <syntaxhighlight lang="cpp"> UPROPERTY( Replicated ) float Health; </syntaxhighlight>

**\[.cpp\]** <syntaxhighlight lang="cpp"> void MyCharacter::GetLifetimeReplicatedProps( TArray< FLifetimeProperty > & OutLifetimeProps ) const {

   Super::GetLifetimeReplicatedProps( OutLifetimeProps );
   DOREPLIFETIME( MyCharacter, Health);

} </syntaxhighlight>

Or, for a RepNotify:

**\[.h\]** <syntaxhighlight lang="cpp"> UPROPERTY( ReplicatedUsing=OnRep\_Health ) float Health;

UFUNCTION( ) void OnRep\_Health( ); </syntaxhighlight>

**\[.cpp\]** <syntaxhighlight lang="cpp"> void MyCharacter::GetLifetimeReplicatedProps( TArray< FLifetimeProperty > & OutLifetimeProps ) const {

   Super::GetLifetimeReplicatedProps( OutLifetimeProps );
   DOREPLIFETIME( MyCharacter, Health);

}

void MyCharacter::OnRep\_Health( ) {

   // Handle health changed

} </syntaxhighlight>

RepNotify variables will call their functions on all clients the Actor has been replicated to; this is generally all of them. The client(s) can then use that event to change something, such as a health bar, ammo count, or spawn FX/Sounds.

If you have done this and your variable still isn't replicating, UE4 will only replicate the variable if it has changed. If you continually try to replicate a variable with the same value, it will never be replicated. This is because if the value never changes and all the clients have that value, there is no reason to send any more bandwidth through the network for a value everybody already has.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=4\_13%2B\_Network\_Guide&oldid=387](https://wiki.unrealengine.com/index.php?title=4_13%2B_Network_Guide&oldid=387)"