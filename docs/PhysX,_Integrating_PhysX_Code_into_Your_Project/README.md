 PhysX, Integrating PhysX Code into Your Project - Epic Wiki             

 

PhysX, Integrating PhysX Code into Your Project
===============================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 PhysX 3.3 Source Code For UE4 Developers](#PhysX_3.3_Source_Code_For_UE4_Developers)
*   [3 Compiling the PhysX Source Code](#Compiling_the_PhysX_Source_Code)
*   [4 Video of a PhysX Vortex Spiral in UE4](#Video_of_a_PhysX_Vortex_Spiral_in_UE4)
*   [5 Pics](#Pics)
*   [6 Custom Destructible Mesh Class](#Custom_Destructible_Mesh_Class)
    *   [6.1 HappyDestructible.h](#HappyDestructible.h)
    *   [6.2 HappyDestructible.cpp](#HappyDestructible.cpp)
*   [7 Packaging](#Packaging)
*   [8 PhysX ~ Basic](#PhysX_.7E_Basic)
    *   [8.1 Build.CS](#Build.CS)
    *   [8.2 The Essential Include](#The_Essential_Include)
*   [9 PhysX ~ Advanced](#PhysX_.7E_Advanced)
    *   [9.1 PhysicsPublic.h](#PhysicsPublic.h)
    *   [9.2 PhysXSupport.h for Scene Read/Write Locking](#PhysXSupport.h_for_Scene_Read.2FWrite_Locking)
*   [10 PhysX ~ How to Get the PhysX Scene & WRITE/READ LOCK](#PhysX_.7E_How_to_Get_the_PhysX_Scene_.26_WRITE.2FREAD_LOCK)
*   [11 UE4 4.15+ Entry PhysX Points Into UE4 Engine](#UE4_4.15.2B_Entry_PhysX_Points_Into_UE4_Engine)
*   [12 Conclusion](#Conclusion)

Overview
--------

_Author:_ [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

In this tutorial I am showing you how you can work with Nvidia PhysX directly in your UE4 code base!

I provide sample code that iterates over all the destructible chunks of a DestructibleComponent and draws their current world space positions to the screen!

PhysX 3.3 Source Code For UE4 Developers
----------------------------------------

Nvidia has made PhysX3.3 Open Source for all Unreal Engine 4 Developers!

Here's the link to the PhysX 3.3 Source Code

[PhysX3.3 Source Code](https://github.com/EpicGames/UnrealEngine/tree/master/Engine/Source/ThirdParty/PhysX/PhysX-3.3/Source)

**edit:** the link is broken but PhysX source code is in the UnrealEngine repo under .../Source/ThirdParty/PhysX/

You must be signed in to a **UE4-Linked Github account** to view the above link!

Simply sign up for Unreal Engine 4 and then follow the steps to link your github account to UE4.

[UE4 Gitub Setup](https://www.unrealengine.com/ue4-on-github)

Compiling the PhysX Source Code
-------------------------------

Here's how to compile PhysX source code for UE4 as of 4.8!

[Compiling PhysX Source Code for UE4](https://wiki.unrealengine.com/PhysX_Source_Guide)

Video of a PhysX Vortex Spiral in UE4
-------------------------------------

In this video I am programmatically arranging apex pieces after the mesh is destroyed and the pieces bounce around normally.

I am arranging the pieces into a spiral/vortex formation!

Please notice that the apex pieces continue to have collision with the world and even each other, after I begin spinning them myself via C++!

This is all done via PhysX coding!

There is **no measurable performance** hit with my current method, my frame rate stays solid at max :)

In other words, I literally cannot detect any drop in performance even after I start the PhysX coding that you see in video below!

<youtube>[https://www.youtube.com/watch?v=7KpkQPhvBKA](https://www.youtube.com/watch?v=7KpkQPhvBKA)</youtube>

This video is from my Abatron work in progress thread, [UE4 Forum Link: Abatron](https://forums.unrealengine.com/showthread.php?45059-Abatron-the-making-of-a-UE4-Hybrid-game-)&p=176126#post176126)

Pics
----

Below you can see I am drawing to screen the world space positions of each chunk of a Destructible Mesh using the PhysX code!

Some of the points can't be seen cause they are hidden inside the little pieces :)

But you can also see I am displaying the locations to the screen! Yay!

[![NvdiaUE4CPP1.jpg](https://d3ar1piqh1oeli.cloudfront.net/5/56/NvdiaUE4CPP1.jpg/900px-NvdiaUE4CPP1.jpg)](/index.php?title=File:NvdiaUE4CPP1.jpg)

  

Below I added a vertical offset to make the points visible for all chunks!

[![PhysXUE4CPP2.jpg](https://d3ar1piqh1oeli.cloudfront.net/0/09/PhysXUE4CPP2.jpg/900px-PhysXUE4CPP2.jpg)](/index.php?title=File:PhysXUE4CPP2.jpg)

Enjoy!

Custom Destructible Mesh Class
------------------------------

Here's a custom destructible mesh class you can use to test whether you got the PhysX code setup properly!

This is the code I used for the picture above!

### HappyDestructible.h

<syntaxhighlight lang="cpp">

1.  pragma once

1.  include "HappyDestructible.generated.h"

UCLASS() class AHappyDestructible : public ADestructibleActor { GENERATED\_UCLASS\_BODY()

protected: virtual void Tick(float DeltaTime) override;

//Drawing! public: FORCEINLINE void DrawPoint ( const FVector& Loc, const float& Size = 7, const FColor& Color = FColor::Red, const float Duration=-1.f ) const { DrawDebugPoint( GetWorld(), Loc, Size, //thickness Color, false, Duration ); }

FORCEINLINE void ScreenMsg(const FString& Msg) { GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, \*Msg); }

FORCEINLINE void ScreenMsg(const FString& Msg, const FString& Msg2) { GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, FString::Printf(TEXT("%s %s"), \*Msg, \*Msg2)); }

}; </syntaxhighlight>

### HappyDestructible.cpp

<syntaxhighlight lang="cpp">

1.  include "YourGame.h"
2.  include "HappyDestructible.h"

//~~~~~~~~~~~~~~~~~~~~~~~~ // PhysX

1.  include "PhysXIncludes.h"

//~~~~~~~~~~~~~~~~~~~~~~~~

AHappyDestructible::AHappyDestructible(const class FPostConstructInitializeProperties& PCIP) : Super(PCIP) {

}

//Tick void AHappyDestructible::Tick(float DeltaTime) { Super::Tick(DeltaTime); //~~~~~~~~~~~~

  
//Draw All Centers to the screen! #if WITH\_PHYSX ScreenMsg("Got into PhysX!!!");

       //4.8 Version

uint32 ChunkCount = DestructibleComponent->ApexDestructibleActor->getNumVisibleChunks(); const uint16\* ChunkIndices = DestructibleComponent->ApexDestructibleActor->getVisibleChunks(); for(uint32 c = 0; c < ChunkCount; c++) { PxRigidDynamic\* PActor = DestructibleComponent->ApexDestructibleActor->getChunkPhysXActor(ChunkIndices\[c\]); check(PActor); PxTransform Trans = PActor->getGlobalPose(); PxVec3& PxLoc = Trans.p;

FVector Location(PxLoc.x,PxLoc.y,PxLoc.z);

DrawPoint(Location);

ScreenMsg("physx loc", Location.ToString()); }

       /\* PRE 4.8 Version

for(FDestructibleChunkInfo& Each : DestructibleComponent->ChunkInfos) { physx::PxRigidDynamic\* Actor = Each.Actor;

if(Actor) { PxTransform Trans = Actor->getGlobalPose(); PxVec3& PxLoc = Trans.p;

FVector Location(PxLoc.x,PxLoc.y,PxLoc.z);

DrawPoint(Location);

ScreenMsg("physx loc", Location.ToString()); } }

       \*/
    #endif // WITH\_PHYSX 

} </syntaxhighlight>

Packaging
---------

I can verify that the code I've shared packages just fine into a full release game!

PhysX ~ Basic
-------------

### Build.CS

You will need the following to work with Nvidia Apex:

<syntaxhighlight lang="cpp"> PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore",

  "PhysX", "APEX" //PhysX

}); </syntaxhighlight>

### The Essential Include

You can include this in your .cpp or .h if you define any Px vars in your .h files.

<syntaxhighlight lang="cpp"> //PhysX

1.  include "PhysXIncludes.h"

</syntaxhighlight>

PhysX ~ Advanced
----------------

### PhysicsPublic.h

<syntaxhighlight lang="cpp">

1.  include "PhysicsPublic.h" //FPhysScene
2.  include "PhysXPublic.h" //PtoU conversions

</syntaxhighlight>

These include give you access to the conversion functions from PhysX to Unreal and back for various essential types like FVector / PxVec3

### PhysXSupport.h for Scene Read/Write Locking

<syntaxhighlight lang="cpp"> //For Scene Locking using Epic's awesome helper macros like SCOPED\_SCENE\_READ\_LOCK

1.  include "Runtime/Engine/Private/PhysicsEngine/PhysXSupport.h"

</syntaxhighlight>

This include is absolutely essential if you want to do any **low-level multi-threaded PhysX coding**!

Epic has created some wonderful macros to make it fast to create scoped read/write locks of the PhysX scene, for example see below!

PhysX ~ How to Get the PhysX Scene & WRITE/READ LOCK
----------------------------------------------------

Here's some sample code I'v written for how you can get the PhysX scene if you have the UE4 UWorld\* !

<syntaxhighlight lang="cpp"> void SomeClass::SomeFunction(UWorld\* World) {

 check(World); 
 //if crash here world was not valid, needs to be investigated, did it come from a UObject?

 FPhysScene\* PhysScene = World->GetPhysicsScene();
 if(!PhysScene) return;

 // Scene Lock for Multi-Threading
 PxScene\* SyncScene = PhysScene->GetPhysXScene(PST\_Sync);
 SCOPED\_SCENE\_WRITE\_LOCK(SyncScene); //or SCOPED\_SCENE\_READ\_LOCK if you only need to read

 //now you can use the PhysX scene in multi-threaded fashion within this function context!
 //  -Rama

} </syntaxhighlight>

Yay!

UE4 4.15+ Entry PhysX Points Into UE4 Engine
--------------------------------------------

As of 4.15 there are new entry points you can use to write a physX-related plugin or game project and interact with UE4's integration of PhysX!

"We have now refactored our PhysX Vehicle support as an optional plugin! This makes it easy for games that are not using vehicles to exclude this feature and save disk space and memory. This work also adds several useful physics extension points to Engine (e.g. **OnPhysSceneInit**/Term, **OnPhysSceneStep**) to make it easier for other developers to write their own similar systems."

[https://www.unrealengine.com/blog/unreal-engine-4-15-released](https://www.unrealengine.com/blog/unreal-engine-4-15-released)

Conclusion
----------

Using the same UE4 class code, the build cs additions, and #includes I've shown above, you can now write any PhysX code you want!

Using the PhysX Scene access code I've shown above, you can do lowest level multi-threaded PhysX coding!

Have fun!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=PhysX,\_Integrating\_PhysX\_Code\_into\_Your\_Project&oldid=337](https://wiki.unrealengine.com/index.php?title=PhysX,_Integrating_PhysX_Code_into_Your_Project&oldid=337)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")