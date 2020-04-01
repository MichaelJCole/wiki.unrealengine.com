Animation Blueprint, Set Custom Variables Via C++ - Epic Wiki                    

Animation Blueprint, Set Custom Variables Via C++
=================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Extending AnimInstance](#Extending_AnimInstance)
    *   [2.1 YourAnimInstance .h](#YourAnimInstance_.h)
    *   [2.2 YourAnimInstance .cpp](#YourAnimInstance_.cpp)
*   [3 Reparent Your AnimBluePrint](#Reparent_Your_AnimBluePrint)
*   [4 Connect your custom variables to your anim node chain](#Connect_your_custom_variables_to_your_anim_node_chain)
*   [5 Accessing Anim Instance in C++](#Accessing_Anim_Instance_in_C.2B.2B)
*   [6 In-Depth Code Sample](#In-Depth_Code_Sample)
*   [7 Conclusion](#Conclusion)

Overview
--------

Dear Community,

Here's the basic code you need to control the variables of your AnimBluePrint via c++ code. This is very useful if you just want to use the animblueprint for the actual skeletal controllers or other nodes of interest to you, but you want to do all the calculations of what their values should be each tick via code. My example is a foot placement system!

It's much easier for me to do traces and get normals and account for various foot size offsets and max limb stretching etc via C++, so **I wanted to set the Anim BP vars from code**.

Extending AnimInstance
----------------------

During Game Time an AnimInstance is created based on your AnimBlueprint, and it is this class that you want to extend to include your variables so you can easily edit them in C++ and get their values in the AnimBluePrint in the Editor.

Here's my code that I am using for my footplacement system:

### YourAnimInstance .h

Here's an example of the kind of header you'd use for your extended AnimInstance class. Make sure to change the #include to your exact name! Also make sure to include some extra spaces at the end of the .h and .cpp file so Visual Studio compiler is happy.

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#pragma once
 
#include "YourAnimInstance.generated.h"
 
UCLASS(transient, Blueprintable, hideCategories\=AnimInstance, BlueprintType)
class UYourAnimInstance : public UAnimInstance
{
	GENERATED\_UCLASS\_BODY()
 
	/\*\* Left Lower Leg Offset From Ground, Set in Character.cpp Tick \*/
	UPROPERTY(EditAnywhere,BlueprintReadWrite,Category\=FootPlacement)
	FVector SkelControl\_LeftLowerLegPos;
 
	/\*\* Left Foot Rotation, Set in Character.cpp Tick \*/
	UPROPERTY(EditAnywhere,BlueprintReadWrite,Category\=FootPlacement)
	FRotator SkelControl\_LeftFootRotation;
 
	/\*\* Left Upper Leg Offset, Set in Character.cpp Tick \*/
	UPROPERTY(EditAnywhere,BlueprintReadWrite,Category\=FootPlacement)
	FVector SkelControl\_LeftUpperLegPos;
};

### YourAnimInstance .cpp

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#include "YourGame.h"
 
//////////////////////////////////////////////////////////////////////////
// UYourAnimInstance
 
UYourAnimInstance::UYourAnimInstance(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
	//set any default values for your variables here
	SkelControl\_LeftUpperLegPos \= FVector(0, 0, 0);
}

Reparent Your AnimBluePrint
---------------------------

Now that you've added new variables you need to compile your C++ code to create your extended AnimInstance, and then load the editor and reparent your current AnimBluePrint to your subclass:

  
Once you do this, you can now access your variables from your .h file, and their tooltip in the context menu will be your comment that you set in code!

[![Reparentbp.jpg](https://d3ar1piqh1oeli.cloudfront.net/e/e2/Reparentbp.jpg/637px-Reparentbp.jpg)](/File:Reparentbp.jpg)

Connect your custom variables to your anim node chain
-----------------------------------------------------

The variables can be accessed via the right click menu now!

[![AnimBPCPPVars.jpg](https://d3ar1piqh1oeli.cloudfront.net/7/71/AnimBPCPPVars.jpg/800px-AnimBPCPPVars.jpg)](/File:AnimBPCPPVars.jpg)

Accessing Anim Instance in C++
------------------------------

 Animation Blueprints are still blueprints, 
 you must access the instance of the blueprint per-Character. 
 This is the Animation Instance!

  

if(!Mesh) return;
//~~~~~~~~~~~~~~~
 
UYourAnimInstance \* Animation \= 
  Cast<UYourAnimInstance\>( Mesh\-\>GetAnimInstance() );
if(!Animation) return;
 
Animation\-\>YourInt32Var \= 1200;

In-Depth Code Sample
--------------------

Here's an example of accessing the Anim Instance from the Character class, which is where I am doing it for my foot placement system to easily access socket locations and rotations etc.

Example Uses In C++ Code Character.cpp

//Never assume the mesh or anim instance was acquired, always check, 
//or you can crash your game to desktop
 
void AYourGameCharacter::ResetFootPlacement()
{
	//No Mesh?
	if (!Mesh) return;
 
	UYourAnimInstance \* Animation \= 
		Cast<UYourAnimInstance\>( Mesh\-\>GetAnimInstance() );
 
	//No Anim Instance Acquired?
	if(!Animation) return;
 
	//~~
 
	Animation\-\>SkelControl\_LeftLowerLegPos 	\= FVector(0,0,0);
	Animation\-\>SkelControl\_LeftUpperLegPos 	\= FVector(0,0,0);
	Animation\-\>SkelControl\_LeftFootRotation       \= FRotator(0,0,0);
}
 
void AYourGameCharacter::DoLeftFootAngleAdjustment(FRotator& FootRot)
{
	//No Mesh?
	if (!Mesh) return;
 
	UYourAnimInstance \* Animation \= 
		Cast<UYourAnimInstance\>( Mesh\-\>GetAnimInstance() );
 
	//No Anim Instance Acquired?
	if (!Animation) return;
 
	//
 
	//Set Animblueprint node rot
	Animation\-\>SkelControl\_LeftFootRotation \= FootRot;	
}

Conclusion
----------

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Animation\_Blueprint,\_Set\_Custom\_Variables\_Via\_C%2B%2B&oldid=14398](https://wiki.unrealengine.com/index.php?title=Animation_Blueprint,_Set_Custom_Variables_Via_C%2B%2B&oldid=14398)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)