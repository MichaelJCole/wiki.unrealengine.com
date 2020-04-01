 Custom Character Movement Component - Epic Wiki             

 

Custom Character Movement Component
===================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Character Constructor (UE >4.6)](#Character_Constructor_.28UE_.3E4.6.29)
*   [3 Character Constructor (UE <4.6)](#Character_Constructor_.28UE_.3C4.6.29)
*   [4 Header File](#Header_File)
*   [5 C++ Source Code File](#C.2B.2B_Source_Code_File)
*   [6 Accessing Custom Character Movement Component](#Accessing_Custom_Character_Movement_Component)
*   [7 Conclusion](#Conclusion)

Overview
--------

**Author:** [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Dear Community,

If you look at CharacterMovementComponent.h the vast majority of the functions are virtual!

This is great news!

You can easily create custom character movement behaviors.... if you can get your characters to use your custom CharacterMovementComponent class!

Here's how you can do it!

Character Constructor (UE >4.6)
-------------------------------

First, replace

<syntaxhighlight lang="cpp">AVictoryPlayerCharacterBase::AVictoryPlayerCharacterBase(const class FObjectInitializer& ObjectInitializer) : Super(ObjectInitializer) {

       //this is your regular constructor code

} </syntaxhighlight>

with (where ACharacter::CharacterMovementComponentName is a string of type FName):

<syntaxhighlight lang="cpp"> AVictoryPlayerCharacterBase::AVictoryPlayerCharacterBase(const FObjectInitializer& ObjectInitializer) : Super(ObjectInitializer.SetDefaultSubobjectClass<UVictoryCharMoveComp>(ACharacter::CharacterMovementComponentName)) { </syntaxhighlight>

Character Constructor (UE <4.6)
-------------------------------

Replace

<syntaxhighlight lang="cpp">AVictoryPlayerCharacterBase::AVictoryPlayerCharacterBase(const class FPostConstructInitializeProperties& PCIP) : Super(PCIP) {

       //this is your regular constructor code

} </syntaxhighlight>

with

<syntaxhighlight lang="cpp"> AVictoryPlayerCharacterBase::AVictoryPlayerCharacterBase(const class FPostConstructInitializeProperties& PCIP) : Super(PCIP.SetDefaultSubobjectClass<UVictoryCharMoveComp>(ACharacter::CharacterMovementComponentName)) {

       // this is your regular constructor code

} </syntaxhighlight>

Header File
-----------

Following is an example for the class definition.

<syntaxhighlight lang="cpp"> // Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.

1.  pragma once

1.  include "VictoryCharMoveComp.generated.h"

UCLASS() class UVictoryCharMoveComp : public UCharacterMovementComponent { GENERATED\_UCLASS\_BODY()

  
protected:

//Init virtual void InitializeComponent() override;

//Tick virtual void TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction \*ThisTickFunction) override; };</syntaxhighlight>

  

C++ Source Code File
--------------------

<syntaxhighlight lang="cpp">// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.

1.  include "VictoryGame.h"

////////////////////////////////////////////////////////////////////////// // UVictoryCharMoveComp

UVictoryCharMoveComp::UVictoryCharMoveComp(const class FPostConstructInitializeProperties& PCIP) : Super(PCIP) {

}

void UVictoryCharMoveComp::InitializeComponent() { Super::InitializeComponent(); //~~~~~~~~~~~~~~~~~

//UE\_LOG //comp Init! }

//Tick Comp void UVictoryCharMoveComp::TickComponent( float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction \*ThisTickFunction ){ Super::TickComponent(DeltaTime, TickType, ThisTickFunction); //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//UE\_LOG //custom comp is ticking!!!

}</syntaxhighlight>

  

Accessing Custom Character Movement Component
---------------------------------------------

<syntaxhighlight lang="cpp"> //Inside Character Class

UVictoryCharMoveComp\* CustomCharMovementComp = Cast<UVictoryCharMoveComp>(CharacterMovement);

if(CustomCharMovementComp) {

 CustomCharMovementComp->CallFunction();

} </syntaxhighlight>

Conclusion
----------

Now you know how to create entirely custom movement systems for your UE4 Characters!

Enjoy!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Custom\_Character\_Movement\_Component&oldid=225](https://wiki.unrealengine.com/index.php?title=Custom_Character_Movement_Component&oldid=225)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")