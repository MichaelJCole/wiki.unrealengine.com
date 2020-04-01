Animation Node, Entire Source for a Turn In Place Node - Epic Wiki                    

Animation Node, Entire Source for a Turn In Place Node
======================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Animation USTRUCT](#Animation_USTRUCT)
    *   [2.1 .h](#.h)
    *   [2.2 .CPP](#.CPP)
*   [3 World Is Game](#World_Is_Game)
*   [4 Animation Graph Node](#Animation_Graph_Node)
    *   [4.1 .H](#.H_2)
    *   [4.2 .CPP](#.CPP_2)

Overview
--------

_Original Author_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here is my entire code for a Turn In Place animation node!

This node detects when there is little to no velocity, but the character is changing directions constantly.

This code shows you my method of accessing the player character from within the animation node code.

[![TurnInPlacenode.jpg](https://d3ar1piqh1oeli.cloudfront.net/1/19/TurnInPlacenode.jpg/800px-TurnInPlacenode.jpg)](/File:TurnInPlacenode.jpg)

Animation USTRUCT
-----------------

### .h

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#pragma once
#include "AnimNode\_VictoryTurnInPlace.generated.h"
 
USTRUCT()
struct FAnimNode\_VictoryTurnInPlace : public FAnimNode\_Base
{
	GENERATED\_USTRUCT\_BODY()
 
	/\*\* Base Pose\*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Links)
	FPoseLink BasePose;
 
	/\*\* Turning In Place! \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Links)
	FPoseLink TurnPose;
 
	/\*\* How Quickly to Blend In/Out of Turn Pose \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Links, meta\=(PinShownByDefault))
	float TurnBlendDuration;
 
	/\*\* What Amount of Turn Per Tick Qualifies for Maximum Turn Blending? Anything less per tick will result in slower Turn Blending. Result: If player turns slowly, the turn blend blends in slowly, and ramps up smoothly to max turn blend as player turns faster. \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Links, meta\=(PinShownByDefault))
	float TurnSpeedModifierMAX;
 
	/\*\* The Lower This Number The Faster The Turn In Place Anim Will Activate \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Links, meta\=(PinShownByDefault))
	float TurnSensitivity;
 
	/\*\* The Lower This Number The Faster The Turn In Place Anim Will Activate \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Links, meta\=(PinShownByDefault) )
	float MoveSensitivity;
 
	/\*\* Seeing this in the log can help you decided what TurnSpeedModifierMAX to use  \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Logs)
	float ShowTurnRotationChangePerTick;
 
// FAnimNode\_Base interface
public:
 
	// FAnimNode\_Base interface
	virtual void Initialize(const FAnimationInitializeContext& Context) 	OVERRIDE;
	virtual void Update(const FAnimationUpdateContext & Context) 		OVERRIDE;
	virtual void Evaluate(FPoseContext& Output) 							OVERRIDE;
	// End of FAnimNode\_Base interface
 
//~~~ Constructor ~~~
public:
 
	FAnimNode\_VictoryTurnInPlace();
 
//Functions
protected:
	void DetermineUseTurnPose();
	void UpdateBlendAlpha();
 
protected:	
 
	//Our very own Blend node, yay! (makes this all super clear)
	FAnimationNode\_TwoWayBlend OurVeryOwnBlend;
 
	AActor \* OwningActor;
	FVector PrevLoc;
	FVector CurLoc;
	float PrevYaw;
	float CurYaw;
	float TurnAmountThisTick;
	bool WorldIsGame;
 
	//~~~ Blending ~~~
	float BlendDurationMult; //blend slower if moving slower
	float InternalBlendDuration; //divided the input by 100 just cause it looks better that way
	float BlendAlpha;
	bool BlendingIntoTurnPose; //false = blending out of
 
	FVector2D RangeIn;
	FVector2D RangeOut;
};

### .CPP

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#include "VictoryGame.h"
 
//#include "AnimationRuntime.h"
 
FAnimNode\_VictoryTurnInPlace::FAnimNode\_VictoryTurnInPlace()
	: FAnimNode\_Base()
	, TurnBlendDuration(4.f)
	, TurnSpeedModifierMAX(4.333)
	, TurnSensitivity(0.777f)
	, MoveSensitivity(25.f)
{
	WorldIsGame \= false;
	BlendDurationMult \= 1;
	InternalBlendDuration \= TurnBlendDuration / 100;
 
	RangeIn \= FVector2D(0, TurnSpeedModifierMAX);
	RangeOut \= FVector2D(0, 1);
 
	ShowTurnRotationChangePerTick \= false;
}
 
void FAnimNode\_VictoryTurnInPlace::Initialize(const FAnimationInitializeContext & Context) 
{
	//Init the Inputs
	BasePose.Initialize(Context);
	TurnPose.Initialize(Context);
 
	//Get the Actor Owner
	OwningActor \= Context.AnimInstance\-\> GetSkelMeshComponent()\-\>GetOwner(); 
 
	//Editor or Game?
	UWorld \* TheWorld \= Context.AnimInstance\-\>GetWorld();
	if (!TheWorld) return;
	//~~~~~~~~~~~~~~~~
 
	WorldIsGame \= (TheWorld\-\>WorldType \== EWorldType::Game);
 
	//~~~
 
	//~~~ Init the Blend ~~~
	OurVeryOwnBlend.A \= BasePose;
	OurVeryOwnBlend.B \= TurnPose;
	OurVeryOwnBlend.Initialize(Context);
}
 
void FAnimNode\_VictoryTurnInPlace::DetermineUseTurnPose()
{
	//Delta time
	//Context.GetDeltaTime();
 
	//Get Current
	CurYaw \= OwningActor\-\>GetActorRotation().Yaw;
	CurLoc \=  OwningActor\-\>GetActorLocation();
 
	//~~~ Choose Turn Pose or Base Pose ~~~
		//Yaw Delta Amount
	TurnAmountThisTick \= FMath::Abs(CurYaw \- PrevYaw);
	if (TurnAmountThisTick < TurnSensitivity)
	{
		BlendingIntoTurnPose \= false;
	}
 
	//Turning Amount is Sufficient and Movement is slow enough
	else if(FVector::DistSquared(CurLoc, PrevLoc) < MoveSensitivity)
	{
		BlendingIntoTurnPose \= true;
	}
 
	//~~~ Save Previous ~~~
	PrevYaw \= CurYaw;
	PrevLoc \= CurLoc;
 
	//Log the Change in Rotation Per Tick
	if(ShowTurnRotationChangePerTick) UE\_LOG(LogAnimation, Warning, TEXT("turn difference per tick,  %f"), TurnAmountThisTick);
 
	//~~~ Calc Blend Mult ~~~
 
	//In case this gets modified during game time
	RangeIn.Y \= TurnSpeedModifierMAX;
 
	//Mapped Range
	BlendDurationMult \= FMath::GetMappedRangeValue(RangeIn, RangeOut, TurnAmountThisTick);
}
void FAnimNode\_VictoryTurnInPlace::UpdateBlendAlpha()
{
	if (BlendingIntoTurnPose)
	{
		if (BlendAlpha \>= 1) BlendAlpha \= 1;
		else BlendAlpha +\= InternalBlendDuration \* BlendDurationMult; //modify blend-in by speed of turning
	}
 
	//Blending out
	else 
	{
		if (BlendAlpha <= 0) BlendAlpha \= 0;
		else BlendAlpha \-\= InternalBlendDuration;
	}
}
void FAnimNode\_VictoryTurnInPlace::Update(const FAnimationUpdateContext & Context)
{
	//EDITOR
	//Editor mode? just use the base pose
	if (!WorldIsGame)
	{
		BlendAlpha \= 0;
	}
 
	//GAME
	//Actually in Game so the Owner Instance Should Exist
	else
	{
		//Try Again if not found
		if (!OwningActor) OwningActor \= Context.AnimInstance\-\>GetSkelMeshComponent()\-\>GetOwner(); 
 
		//Not found
		if (!OwningActor) 
		{
			UE\_LOG(LogAnimation, Warning, TEXT("FAnimNode\_VictoryTurnInPlace::Update() Owning Actor was not found"));
			return;
			//~~~~~~~~~~~~~~~~~~~
		}
 
		//~~~ Determine Use Turn Pose ~~~
		DetermineUseTurnPose();
 
		//~~~ Calc Blend Alpha ~~~
		UpdateBlendAlpha();
	}
 
	//~~~ Do Updates ~~~
 
	//At end of Blend, only evaluate 1, save resources
	//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
	// FPoseLinkBase::Update Active Pose - this is what makes the glowing line thing happen and animations loop
	//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
	if (BlendAlpha \>= 1) TurnPose.Update(Context);
	else if (BlendAlpha <= 0) BasePose.Update(Context);
 
	//Currently Blending
	else
	{		
		//Blend node below handles this now
		//BasePose.Update(Context);
		//TurnPose.Update(Context);
 
		//~~~ Update the Blend ~~~
		OurVeryOwnBlend.Alpha \= BlendAlpha;
		OurVeryOwnBlend.Update(Context);
	}
 
	//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
	// Evaluate Graph, see AnimNode\_Base, AnimNodeBase.h
	EvaluateGraphExposedInputs.Execute(Context);
	//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
}
 
void FAnimNode\_VictoryTurnInPlace::Evaluate(FPoseContext & Output)
{
	//~~~ Fully In Base Pose ~~~
	if(BlendAlpha <= 0) BasePose.Evaluate(Output);
 
	//~~~ Fully In Turn Pose ~~~
	else if (BlendAlpha \>= 1) TurnPose.Evaluate(Output);
 
	//~~~ Currently Blending ~~~
	else
	{
		OurVeryOwnBlend.Evaluate(Output);
	}	
}

World Is Game
-------------

Please note the use of WorldIsGame.

In the editor, there is no instanced version of the Character, so I do not run that part of the code.

Here is how you can determine if your node is running in the Editor preview or in the actual game!

WorldIsGame \= (TheWorld\-\>WorldType \== EWorldType::Game);

Animation Graph Node
--------------------

### .H

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#pragma once
 
#include "AnimGraphDefinitions.h"
#include "Kismet2/BlueprintEditorUtils.h"
 
#include "AnimGraphNode\_VictoryTurnInPlace.generated.h"
 
//Whole point of this is to be wrapper for node struct
//		so it depends on it, and that node must compile first
//		for type to be recognized
 
UCLASS(MinimalAPI, dependson\=FAnimNode\_VictoryTurnInPlace)
class UAnimGraphNode\_VictoryTurnInPlace : public UAnimGraphNode\_Base
{
	GENERATED\_UCLASS\_BODY()
 
	UPROPERTY(EditAnywhere, Category\=Settings)
	FAnimNode\_VictoryTurnInPlace Node;
 
public:
	// UEdGraphNode interface
	virtual FString GetNodeTitle(ENodeTitleType::Type TitleType) const OVERRIDE;
	virtual FLinearColor GetNodeTitleColor() const OVERRIDE;
	virtual FString GetNodeCategory() const OVERRIDE;
	// End of UEdGraphNode interface
 
protected:
	// UAnimGraphNode\_SkeletalControlBase interface
	virtual FString GetControllerDescription() const;
	// End of UAnimGraphNode\_SkeletalControlBase interface
};

### .CPP

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#include "VictoryGame.h"
 
/////////////////////////////////////////////////////
// UAnimGraphNode\_VictoryTurnInPlace
 
UAnimGraphNode\_VictoryTurnInPlace::UAnimGraphNode\_VictoryTurnInPlace(const FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
}
 
//Title Color!
FLinearColor UAnimGraphNode\_VictoryTurnInPlace::GetNodeTitleColor() const 
{ 
	return FLinearColor(0,12,12,1);
}
 
//Node Category
FString UAnimGraphNode\_VictoryTurnInPlace::GetNodeCategory() const
{
	return FString("Victory Anim Nodes");
}
FString UAnimGraphNode\_VictoryTurnInPlace::GetControllerDescription() const
{
	return TEXT("~~~ Victory Turn In Place ~~~");
}
 
FString UAnimGraphNode\_VictoryTurnInPlace::GetNodeTitle(ENodeTitleType::Type TitleType) const
{
	FString Result \= \*GetControllerDescription();
	Result +\= (TitleType \== ENodeTitleType::ListView) ? TEXT("") : TEXT("\\n");
	return Result;
}

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

In UE 4.7 you need adequate include headers for FAnim\* classes :

1.  include "Runtime/Engine/Classes/Animation/AnimNodeBase.h"
2.  include "Runtime/Engine/Classes/Animation/InputScaleBias.h"
3.  include "Runtime/Engine/Classes/Animation/AnimNode\_TwoWayBlend.h"

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Animation\_Node,\_Entire\_Source\_for\_a\_Turn\_In\_Place\_Node&oldid=12295](https://wiki.unrealengine.com/index.php?title=Animation_Node,_Entire_Source_for_a_Turn_In_Place_Node&oldid=12295)"

[Categories](/Special:Categories "Special:Categories"):

*   [Notes](/index.php?title=Category:Notes&action=edit&redlink=1 "Category:Notes (page does not exist)")
*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)