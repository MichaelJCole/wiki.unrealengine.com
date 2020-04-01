Animation Nodes, Code for How to Create Your Own - Epic Wiki                    

Animation Nodes, Code for How to Create Your Own
================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Complete Custom Animation Code Example](#Complete_Custom_Animation_Code_Example)
*   [3 Class to Extend AnimNode\_Base](#Class_to_Extend_AnimNode_Base)
    *   [3.1 .h](#.h)
    *   [3.2 .cpp](#.cpp)
*   [4 Key Concepts of Animation Nodes](#Key_Concepts_of_Animation_Nodes)
*   [5 Animation Update](#Animation_Update)
*   [6 Animation Evaluate](#Animation_Evaluate)
*   [7 AnimGraph Node](#AnimGraph_Node)
    *   [7.1 .h](#.h_2)
    *   [7.2 .cpp](#.cpp_2)
*   [8 Summary](#Summary)
*   [9 UE4 Source References](#UE4_Source_References)

Overview
--------

Dear Community,

In this tutorial I explain the very basics of making your own custom animation node.

My main goal is to help you establish the basic structure to then pursue your individual animation node goals on your own :)

This is not a tutorial for creating skeletal controllers, but rather animation blends of one kind or another :)

Complete Custom Animation Code Example
--------------------------------------

I have my entire source code for a custom animation node, Editor Graph Node included, here!

**[Custom Turn in Place Animation Node](/Animation_Node,_Entire_Source_for_a_Turn_In_Place_Node "Animation Node, Entire Source for a Turn In Place Node")**

Class to Extend AnimNode\_Base
------------------------------

Here is the basic setup you need, .h and .cpp, for the node itself

This node is a struct that is wrapped in the editor animgraph node that is what you are used to seeing :)

### .h

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#pragma once
#include "AnimNode\_NameOfYourNode.generated.h"
 
USTRUCT()
struct FAnimNode\_NameOfYourNode : public FAnimNode\_Base
{
	GENERATED\_USTRUCT\_BODY()
 
	//FPoseLink - this can be any combination 
        //of other nodes, not just animation sequences
	//	so you could have an blend space leading into 
        //a layer blend per bone to just use the arm
	//	and then pass that into the PoseLink
 
	/\*\* Base Pose - This Can Be Entire Anim Graph Up To This Point, or Any Combination of Other Nodes\*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Links)
	FPoseLink BasePose;
 
	/\*\* Other Pose! - This Can Be Entire Anim Graph Up To This Point, or Any Combination of Other Nodes \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Links)
	FPoseLink OtherPose;
 
	/\*\* Sample Property That Will Show Up as a Pin \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Links, meta\=(PinShownByDefault))
	float SampleFloat;
 
// FAnimNode\_Base interface
public:
 
	// FAnimNode\_Base interface
 virtual void Initialize(const FAnimationInitializeContext& Context) OVERRIDE;
 virtual void CacheBones(const FAnimationCacheBonesContext & Context) OVERRIDE;
 virtual void Update(const FAnimationUpdateContext & Context) OVERRIDE;
 virtual void Evaluate(FPoseContext& Output) OVERRIDE;
	// End of FAnimNode\_Base interface
 
// Constructor 
public:
 
	FAnimNode\_NameOfYourNode();
 
protected:
	bool WorldIsGame;
        AActor\* OwningActor;
};

### .cpp

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#include "YourGame.h"
 
//#include "AnimationRuntime.h"
 
FAnimNode\_NameOfYourNode::FAnimNode\_NameOfYourNode()
	: FAnimNode\_Base()
	, SampleFloat(128.333)
{
	WorldIsGame \= false;
}
 
void FAnimNode\_NameOfYourNode::Initialize(const FAnimationInitializeContext & Context) 
{
	//Init the Inputs
	BasePose.Initialize(Context);
	OtherPose.Initialize(Context);
 
	//Get the Actor Owner
	OwningActor \= Context.AnimInstance\-\> GetSkelMeshComponent()\-\>GetOwner(); 
 
	//Editor or Game?
	UWorld \* TheWorld \= Context.AnimInstance\-\>GetWorld();
	if (!TheWorld) return;
	//~
 
	WorldIsGame \= (TheWorld\-\>WorldType \== EWorldType::Game);
}
 
void FAnimNode\_NameOfYourNode::CacheBones(const FAnimationCacheBonesContext & Context) 
{
	BasePose.CacheBones(Context);
	OtherPose.CacheBones(Context);
}
void FAnimNode\_NameOfYourNode::Update(const FAnimationUpdateContext & Context)
{
        //\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
	// Evaluate Graph, see AnimNode\_Base, AnimNodeBase.h
	EvaluateGraphExposedInputs.Execute(Context);
	//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
 
	//EDITOR
	//Editor mode? just use the base pose
	if (!WorldIsGame)
	{
		//if your node depends on 
                //actual actor instance, can't do anything in editor
	}
 
	//GAME
	//Actually in Game so the Owner Instance Should Exist
	else
	{
		//Try Again if not found
		if (!OwningActor) OwningActor \= 
                    Context.AnimInstance\-\>GetSkelMeshComponent()\-\>GetOwner(); 
 
		//Not found
		if (!OwningActor) 
		{
			UE\_LOG(LogAnimation, Warning,
           TEXT("FAnimNode\_NameOfYourNode::Update() Owning Actor was not found"));
			return;
			//~
		}
 
		//Do Stuff Based On Actor Owner
	}
	//~~
 
	// Do Updates 
 
	//Try To Update As Few of the Inputs As You Can
 
	//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
	// FPoseLinkBase::Update Active Pose - this is what makes 
        //the glowing line thing happen and animations loop
	//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
	BasePose.Update(Context);
 
 
 
}
 
void FAnimNode\_NameOfYourNode::Evaluate(FPoseContext & Output)
{
	// Return Base Pose, Un Modified 
	BasePose.Evaluate(Output);
 
	//Evaluate is returning the Output to this function,
	//which is returning the Output to the rest of the Anim Graph
 
	//In this case, we are passing the Output out variable into the BasePose
 
	//Basically saying, give us back the unmodified Base Pose
 
	//i.e, the bulk of your anim tree.
}

Key Concepts of Animation Nodes
-------------------------------

There is an initialize, an update, and an evaluate

Initialize = make sure to initialize the inputs!

BasePose.Initialize(Context);
OtherPose.Initialize(Context);

  

Animation Update
----------------

Make sure to actually "tick" the inputs of your choice!

BasePose.Update(Context);

Try to update as few of the inputs as you can, based on the logic of your anim node.

For example if you were blending between A and B and you were fully blended to B, you would not need to update A at all

But if you were at 0.5 in between you'd have to update both.

If you don't update any poses then the graph lines will not glow.

  

Animation Evaluate
------------------

Pass out the results of all your calculations and updates as the output to the rest of the Anim Graph

The Output variable is the entire output of all your anim nodes activities

BasePose.Evaluate(Output);

You can do much more complicated things than just evaluate the base or the other poses

The key data of Output is Output.Pose, which is an FA2Pose data, which is animation data that could be calculated any number of ways.

As long as you update Output.Pose you can do all sorts of things

)

  

AnimGraph Node
--------------

Here is the basic .h and .cpp you need for making the in-editor anim graph visual representation of your node

### .h

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#pragma once
 
#include "AnimGraphDefinitions.h"
#include "Kismet2/BlueprintEditorUtils.h"
 
#include "AnimGraphNode\_NameOfYourNode.generated.h"
 
//Whole point of this is to be wrapper for node struct
//	so it depends on it, and that node must compile first
//	for type to be recognized
 
UCLASS(MinimalAPI, dependson\=FAnimNode\_NameOfYourNode)
class UAnimGraphNode\_NameOfYourNode : public UAnimGraphNode\_Base
{
	GENERATED\_UCLASS\_BODY()
 
	UPROPERTY(EditAnywhere, Category\=Settings)
	FAnimNode\_NameOfYourNode Node;
 
public:
	// UEdGraphNode interface
	virtual FString GetNodeTitle(ENodeTitleType::Type TitleType) const OVERRIDE;
	virtual FLinearColor GetNodeTitleColor() const OVERRIDE;
	virtual FString GetNodeCategory() const OVERRIDE;
	// End of UEdGraphNode interface
 
protected:
	virtual FString GetControllerDescription() const;
 
};

### .cpp

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#include "YourGame.h"
 
/////////////////////////////////////////////////////
// UAnimGraphNode\_NameOfYourNode
 
UAnimGraphNode\_NameOfYourNode::UAnimGraphNode\_NameOfYourNode(const FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
}
 
//Title Color!
FLinearColor UAnimGraphNode\_NameOfYourNode::GetNodeTitleColor() const 
{ 
	return FLinearColor(0,12,12,1);
}
 
//Node Category
FString UAnimGraphNode\_NameOfYourNode::GetNodeCategory() const
{
	return FString("Anim Node Category");
}
FString UAnimGraphNode\_NameOfYourNode::GetControllerDescription() const
{
	return TEXT(" Your Anim node Title ");
}
 
FString UAnimGraphNode\_NameOfYourNode::GetNodeTitle(ENodeTitleType::Type TitleType) const
{
	FString Result \= \*GetControllerDescription();
	Result +\= (TitleType \== ENodeTitleType::ListView) ? TEXT("") : TEXT("\\n");
	return Result;
}

  

Summary
-------

With these basics and reviewing the different animation data types you are well on your way to making your own animatoion node!

  

UE4 Source References
---------------------

See these .h files for lots of important info

AnimNodeBase.h
AnimationAssets.h
AnimInstance.h

  
Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Animation\_Nodes,\_Code\_for\_How\_to\_Create\_Your\_Own&oldid=4485](https://wiki.unrealengine.com/index.php?title=Animation_Nodes,_Code_for_How_to_Create_Your_Own&oldid=4485)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)