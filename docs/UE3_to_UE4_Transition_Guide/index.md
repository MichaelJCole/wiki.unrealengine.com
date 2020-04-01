 UE3 to UE4 Transition Guide - Epic Wiki             

 

UE3 to UE4 Transition Guide
===========================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 General Editor & Terminology](#General_Editor_.26_Terminology)
*   [3 Editor](#Editor)
*   [4 Kismet > Blueprints(Matinee included)](#Kismet_.3E_Blueprints.28Matinee_included.29)
*   [5 Lighting](#Lighting)
*   [6 Materials](#Materials)
*   [7 Coding](#Coding)

Overview
--------

Here you can find a list of procedure and terminology differences between UDK and Unreal Engine 4 gathered by the community. Keep in mind that some of those may be subject to change in time with newer UE4 releases.

  

General Editor & Terminology
----------------------------

**Scene Scale(Units)**

**UE3:** 1uu == 2cm

**UE4:** 1uu == 1cm

**UE3:** World size = 10.48km x 10.48km

**UE4:** World size = 20km x 20km

  
**Assets and Packages**

**UE3:** Packages are used to store a collection of assets. Package format _.upk_ - Map format _.udk_

**UE4:** Each asset is stored in its own file. Maps are still packages as they need to store a collection of assets. Asset format _.uasset_ - Map format _.umap_

  
**Mesh/Skeletal Mesh & Animation Import Formats**

**UE3:** .psk & .psa / .FBX  
Collision naming : MyMesh, UCX\_MyCollision

**UE4:** .FBX(same Export procedure - Mesh and Skeleton split into 2 separate asset after import)  
Collision naming : MyMesh, UCX\_MyMesh\_## (\_## is a number in case you have several UCX in there)

  
**Disabling Decal Render on Skeletal/Static Meshes:**

**UE3:** Go to decal properties (F4) and disable bProjectOn.

**UE4:** Select your Mesh in Viewport.

1.  In details panel search for Decal
2.  Uncheck Receives Decals.

  
**Spline Loft Actor**

**UE3:** Created by dragging and dropping from Actor Classes tab. Continue drawing a path by holding Alt and dragging the icon.

**UE4:** It appears in the landscape editor as Spline Tools when you create a landscape. Click Manage > Edit Splines > Ctrl+click to place one then continue drawing by placing control points with Ctrl+click, finally hit Apply Settings button in the landscape editor.

  
**Collision Terminology**

**UE3:** Touch and Block

**UE4:** Overlap and Block

Editor
------

**Navigation, Maya Style**

_considering UDK <=> UE3_

**UE3:** L + left or right mouse button

**UE4:** Alt + left or right mouse button

  

Kismet > Blueprints(Matinee included)
-------------------------------------

**Creating a Matinee**

**UE3:** Open Kismet, right-click the canvas and select New Matinee.

**UE4:** Search for MatineeActor in Modes tab > All Classes, and drag it into your level.

  
**Attaching Actors to Specific Groups inside Matinee**

**UE3:** Create a variable for the object inside Kismet and attach it to Matinee.

**UE4:** Select the object in the map, open up Matinee, right click on the group you want to attach > Actors > Add(or replace) selected actors.

  
**Sequential or random activation of multiple outputs**

**UDK:** Switch node in Kismet.

**UE4:** MultiGate node in Blueprints.

  

Lighting
--------

**Adding a SkyLight**

**UE3=** Actor Classes - Lights - Sky Lights

**UE4=** Modes Tab > Lights > Sky Light

  
**Adding a dynamic light**

**UE3=** Actor Classes > Lights > AnyLightMoveable.

**UE4=** Add a normal light into your level - in the settings you can find Transform > Mobility > Moveable.

  
**Lightmaps and photons**

**UE3=** Emissive material enabled in object in the level, photons will fire from any shape: material based.  

**UE4=** For dynamic emissive lighting, needs to be enabled in advanced material properties(for LPV.) For static emissive lighting, enable _Use Emissive for Static Lighting_ in the object's details panel.

Materials
---------

**Subsurface Scattering**

**UE3:** Achieved with transmission mask

**UE4:** Achieved with SubsurfaceColor - choose MLM\_Subsurface in the Lighting Mode

  
**Adjusting a Particle's Color in Cascade**

**UE3:** By multiplying the texture with a _Vertex Color_ node in the material.

**UE4:** By multiplying the texture with a _Particle Color_ node in the material.

  
**Soft Edge for Particles and Translucent Materials**

**UE3:** Attach the opacity mask to Alpha input of _DepthBiasedAlpha_ and set Bias scale for fade distance.

**UE4:** Attach the opacity mask to Opacity input of _DepthFade_ and set Fade Distance.

  
**Colored Speculars**

**UE3:** By pluging the colored specular texture to Specular input.

**UE4:** By giving metallic value(Constant - 1) to the material

  

Coding
------

**Spawning Actors**

**UE3:**

var Actor MyActor;

MyActor = Spawn(class'ActorToSpawn',Location,Rotation);

**UE4:**

FActorSpawnParameters SpawnInfo;
SpawnInfo.bNoCollisionFail = true;

ASoulHunterWeapon\* NewWeapon = GetWorld()->SpawnActor<ASoulHunterWeapon>(Weapon, SpawnInfo);

There are several versions of Spawn one with and without templates.

If you want to use location and rotation make sure you make variables that are const.

const FVector\* SLocation;
const FRotator\* SRotation;

GetWorld()->SpawnActor<ASoulHunterWeapon>(Weapon, SLocation, SRotation, SpawnInfo);

  
**Spawning Objects**

This can be used to create instances (or more accurately, pointers to instances of) classes derived from Object.

**UE3:**

var MyObject MyObjectRef;

MyObject = new class'MyObject';

**UE4:**

In YourClass.h:

UPROPERTY()
MyObject \*MyObjectRef;

In YourClass.cpp:

MyObjectRef = NewObject<UMyObject>(this, UMyObject::StaticClass());

Also see [Documentation - Objects](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Objects/index.html#objectcreation) for a detailed description.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UE3\_to\_UE4\_Transition\_Guide&oldid=683](https://wiki.unrealengine.com/index.php?title=UE3_to_UE4_Transition_Guide&oldid=683)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Epic Created Content](/index.php?title=Category:Epic_Created_Content "Category:Epic Created Content")
*   [Getting Started](/index.php?title=Category:Getting_Started "Category:Getting Started")