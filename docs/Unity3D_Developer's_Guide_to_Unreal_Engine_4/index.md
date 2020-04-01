 Unity3D Developer's Guide to Unreal Engine 4 - Epic Wiki             

 

Unity3D Developer's Guide to Unreal Engine 4
============================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Unity Developers New to Unreal Engine 4

Check out the official [Unreal Engine 4 for Unity Developers](https://docs.unrealengine.com/latest/INT/GettingStarted/FromUnity/index.html) guide in the documentation!

Contents
--------

*   [1 Overview](#Overview)
*   [2 Key concepts](#Key_concepts)
    *   [2.1 Game logic](#Game_logic)
        *   [2.1.1 Unity](#Unity)
        *   [2.1.2 Unreal Engine 4](#Unreal_Engine_4)
    *   [2.2 Game Start](#Game_Start)
        *   [2.2.1 Unity](#Unity_2)
        *   [2.2.2 Unreal Engine 4](#Unreal_Engine_4_2)
        *   [2.2.3 Life Cycle](#Life_Cycle)
    *   [2.3 Scene](#Scene)
        *   [2.3.1 Unity3D](#Unity3D)
        *   [2.3.2 Unreal Engine4](#Unreal_Engine4)
    *   [2.4 Scene objects](#Scene_objects)
        *   [2.4.1 Unity](#Unity_3)
        *   [2.4.2 Unreal Engine 4](#Unreal_Engine_4_3)
    *   [2.5 Input events](#Input_events)
        *   [2.5.1 Unity](#Unity_4)
        *   [2.5.2 Unreal Engine 4](#Unreal_Engine_4_4)
    *   [2.6 Print to console (log)](#Print_to_console_.28log.29)
        *   [2.6.1 Unity](#Unity_5)
        *   [2.6.2 Unreal Engine 4](#Unreal_Engine_4_5)
*   [3 Main classes and function](#Main_classes_and_function)
    *   [3.1 Basic Data Types](#Basic_Data_Types)
    *   [3.2 Member Functions and Variables](#Member_Functions_and_Variables)
    *   [3.3 Components](#Components)
    *   [3.4 Statics](#Statics)
    *   [3.5 Spawning](#Spawning)
        *   [3.5.1 Unity3D](#Unity3D_2)
        *   [3.5.2 Unreal Engine4](#Unreal_Engine4_2)
*   [4 #includes](#.23includes)
    *   [4.1 Particles/ParticleSystemComponent.h](#Particles.2FParticleSystemComponent.h)
*   [5 Related Links](#Related_Links)

Overview
--------

This guide should be Used and Maintained with the idea that it's purpose is to illustrate comparable elements and features between Unity3D and Unreal4.  
Any topic that is not relatable back to Unity3D in some direct way should have it's own wiki page for user experience and searches.

  

Key concepts
============

Game logic
----------

##### Unity

Game logic is written using the Mono environment. Scripts manipulate GameObjects. GameObjects can have numerous scripts or none at all.

##### Unreal Engine 4

Game logic is written using C++ and/or Blueprint Editor. C++ classes and blueprints manipulate scene Actors. Blueprints are similar to Unity Prefabs. A Blueprint is a single parent class, interfaces, any components you wish to add via the blueprint editor, and one system of blueprint logic. A typical game sees major systems and functionality created with C++, but since C++ classes can be exposed to Blueprint systems, tertiary functionality can be added via the blueprint system.

  

Game Start
----------

##### Unity

By default the level with index 0 is loaded. Once loaded, all scripts (depending on execution order) have numerous methods fired, such as, Awake, Start, OnEnable, etc....

  

##### Unreal Engine 4

The level set by default in (Edit > Project Settings > Maps & Modes) is loaded. Every level has a WorldSettings class of which the properties can be edited in the editor. Using this class, UWorld classes are created at runtime. UWorld creates an object of class GameMode in scene. GameMode objects are used to spawn PlayerController objects, managers, and other objects used during gameplay.

Note: (Edit > Project Settings > Maps & Modes) Default Modes section will allow you to set a default GameMode that all levels by default use.

The Game's entry point is the constructor of the class inherited from GameMode.

### Life Cycle

**Stub:** This should be expanded to include the general life cycle of Unreal Script Execution Order similar to \[[Unity Docs](http://docs.unity3d.com/Manual/ExecutionOrder.html)\]  
Consider making a new page and linking to it from here.

  

Scene
-----

The concept of the Scene in both engines is the same. However, Unity3D and UE4 have different axes definitions.

##### Unity3D

Unity uses a left handed coordinate system -- where the vertical direction is usually represented by the +Y axis.

*   X - left, right
*   Y - up, down
*   Z - forwards, backwards

File format: \*.scene

Use GameObject static methods for scene objects operations ( find, spawn, destroy)

Level loading: Application.LoadLevel(string name);

##### Unreal Engine4

UE4 uses a left handed coordinate system -- where the vertical direction is usually represented by the +Z axis. Z axis up.

*   X - forwards, backwards
*   Y - left, right
*   Z - up, down

UE4 also referrers to the pivots of a rotation as: Roll, Pitch, and Yaw.

File format: \*.umap

Use UWorld for scene object operations ( find, spawn, destroy). You can get UWorld using GetWorld() from any UObject.

**Level loading:**  

// OpenLevel in Blueprints. Both work the same and allow you to pass additional parameters. Example: "<key\_1>=<value\_1>?<key\_2>=<value\_2>"
// @param bAbsolute if true options are reset, if false options are carried over from current level
UGameplayStatics::OpenLevel(UObject\* WorldContextObject, FName LevelName, bool bAbsolute, FString Options);

// or

// where the URL = path to the level and can include additional parameters. Example: "/Game/Maps/<map\_name>?<key\_1>=<value\_1>?<key\_2>=<value\_2>"
GetWorld()\->ServerTravel(string URL)

**Reading Parameters:**  
To use the parameters in code you must be in the **GameMode** class  

// Searches the GameMode's current OptionsString (a default gamemode variable) for the <key> and if the 'key' is not found returns the 'default\_value'
// Keys and Values are formatted similar to ini files.
GetIntOption(OptionsString, key, default\_value);

Scene objects
-------------

##### Unity

Base scene object – GameObject.

GameObjects are containers for all other Components. It has a Transform component by default. Components are then added to give the GameObject functionality.

GameObjects support a hierarchy (parent-child relation).

##### Unreal Engine 4

Base scene object - Actor.

An Actor is the base object that can be placed or spawned into the world. An Actor by itself does not contain a USceneComponent (More on these later). The Actor is simply the base object which can have a presence in the level. Components add functionality to an Actor.

Actors support a hierarchy (parent-child relation).

Programmers can inherit from the default UActorComponent to create their own component.

Component spawning example:

**.h**

// Remember to add a UPROPERTY() to your component definition in the .h with proper tags to expose the variables of the component for editing in the details panel of UE4 Editor.
// If you do not, you will be able to see the component but the details panel will show up blank!
// Add BlueprintReadWrite or other Blueprint tags to use in Blueprints.
UPROPERTY(EditAnywhere)
USceneComponent\* SceneComponent;

**.cpp**

USceneComponent\* SceneComponent \= FObjectInitializer.CreateDefaultSubobject<USceneComponent\>(this, TEXT("SceneComp"));
RootComponent \= SceneComponent;

  

Input events
------------

##### Unity

Class Input

Input.GetAxis("MoveForward");
Input.GetTouch(0);

##### Unreal Engine 4

Component UInputComponent of Actor class

InputComponent\->BindAxis("MoveForward", this, &AFirstPersonBaseCodeCharacter::MoveForward);
InputComponent\->BindTouch(EInputEvent::IE\_Pressed, this, &AStrategyPlayerController::OnTapPressedMy);
...
void AStrategyPlayerController::OnTapPressedMy(ETouchIndex::Type index, FVector ScreenPosition)
{
}

  

Print to console (log)
----------------------

##### Unity

Debug.Log("Log text " + (0.1f).ToString());
Debug.LogWarning("Log warning");
Debug.LogError("Log error");

##### Unreal Engine 4

GEngine\->AddOnScreenDebugMessage(\-1, 5.f, FColor::Red, TEXT("This is an on screen message!"));
UE\_LOG(LogTemp, Log, TEXT("Log text %f"), 0.1f);
UE\_LOG(LogTemp, Warning, TEXT("Log warning"));
UE\_LOG(LogTemp, Error, TEXT("Log error"));
FError::Throwf(TEXT("Log error"));
FMessageDialog::Open(EAppMsgType::Ok, FText::FromString(TEXT("Dialog message")));

Further Reading: [Wiki Entry on logging](/index.php?title=Logs,_Printing_Messages_To_Yourself_During_Runtime "Logs, Printing Messages To Yourself During Runtime")  
  

Main classes and function
=========================

Basic Data Types
----------------

Unity3D

Unreal Engine4

int

int32, int24, int8

string

FString

Transform

FTransform

Quaternion

FQuat

Rotation

FRotator

Gameobject

Actor

Array

TArray

  

Member Functions and Variables
------------------------------

Here is a list of commonly used functions and variables every Unity C# programmer should know and use. Listed along side are the identical/similar functions and variables used to gather the same information

Unity3D

Unreal Engine4

Update()

Tick(), TickComponent()

transform

GetTransform() (returns new instance), SetActorTransform(FTransform) (to apply the Transform)

transform.position

GetActorLocation()

transform.rotation

GetActorRotation()

transform.localScale

GetActorScale()

GetComponent<T>()

FindComponentByClass<T>()

Destroy()

Destroy()

Find()

TObjectIterator<T>(), FActorIterator<T>, ActorItr(GetWorld()),ConstructorHelpers::FObjectFinder<your\_class> object(name)

MathF

FMath

RayCast

Trace

SphereCast

Sweep

  

Components
----------

Unity3D

Unreal Engine4

Transform

USceneComponent

Camera

UCameraComponent

BoxCollider

UBoxComponent

MeshFilter

UStaticMeshComponent

ParticleSystem

UParticleSystemComponent

AudioSource

UAudioComponent

  

Statics
-------

Unreal Engine 4

Use

UGameplayStatics

Used to get access to things like players pawn, game mode, singleton, controller, spawn decal, spawn emitter

Spawning
--------

To create something at runtime.

##### Unity3D

**Instantiate()**

This function makes a copy of an object in a similar way to the Duplicate command in the editor. If you are cloning a GameObject then you can also optionally specify its position and rotation (these will default to Vector3.zero and Quaternion.identity respectively). If you are cloning a Component then the GameObject it is attached to will also be cloned, again with an optional position and rotation.

##### Unreal Engine4

**UWorld->SpawnActor()**

The process of creating a new instance of an Actor is known as spawning. Spawning of Actors is performed using the UWorld::SpawnActor() function. This function creates a new instance of a specified class and returns a pointer to the newly created Actor. UWorld::SpawnActor() may only be used for creating instances of classes which inherit from the Actor class in their hierarchy.

  

#includes
=========

It should be noted that #includes can also be added to your "Project.h" and will thus be included in all classes. This however can be a draw on your compiler and it's advised to add includes individually.

#### Particles/ParticleSystemComponent.h

When trying to add a particle system via C++ you will receive an error unless you include the "Particles/ParticleSystemComponent.h" to your "class.h". Below is an example class that provides an exposed Particle System slot on an Actor via C++.

It is important to note that includes now require that the complete short path be defined. For example "ParticleSystemComponent.h" will not work without "Particles/" short path defined along with it as "Particles/ParticleSystemComponent.h".

**.h**

// Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.

#pragma once

#include "GameFramework/Actor.h"
#include "Particles/ParticleSystemComponent.h"
#include "ParticleTest.generated.h"

UCLASS()
class AParticleTest : public AActor
{
	GENERATED\_UCLASS\_BODY()

	UPROPERTY(VisibleAnywhere, Category \= Particle System)
	TSubobjectPtr<UParticleSystemComponent\> ParticleSystem;
};

**.cpp**

// Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.

#include "MyProject.h"
#include "ParticleTest.h"

AParticleTest::AParticleTest(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
	ParticleSystem \= PCIP.CreateDefaultSubobject<UParticleSystemComponent\>(this, FName(TEXT("Particle System")));
	RootComponent \= ParticleSystem;

}

Related Links
=============

[Storing References To World Objects, Forum Link by Rama](https://forums.unrealengine.com/showthread.php?60720-Unity-to-Unreal-Losing-world-references&p=234977&viewfull=1#post234977)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Unity3D\_Developer%27s\_Guide\_to\_Unreal\_Engine\_4&oldid=407](https://wiki.unrealengine.com/index.php?title=Unity3D_Developer%27s_Guide_to_Unreal_Engine_4&oldid=407)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")