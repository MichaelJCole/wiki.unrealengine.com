Trace Functions - Epic Wiki                     

Trace Functions
===============

(Redirected from [Trace Functions For You](/index.php?title=Trace_Functions_For_You&redirect=no "Trace Functions For You"))

Contents
--------

*   [1 Overview](#Overview)
*   [2 Static](#Static)
*   [3 Overloads](#Overloads)
*   [4 Trace](#Trace)
    *   [4.1 Example Usage](#Example_Usage)
*   [5 FHitResult Now Returns Exact Distance](#FHitResult_Now_Returns_Exact_Distance)
    *   [5.1 Example Code](#Example_Code)
*   [6 Trace With Ignore Actors Array](#Trace_With_Ignore_Actors_Array)
    *   [6.1 Example Usage](#Example_Usage_2)
*   [7 Trace Component](#Trace_Component)
    *   [7.1 Example Usage](#Example_Usage_3)
*   [8 Why Use Trace Component?](#Why_Use_Trace_Component.3F)
*   [9](#)
*   [10 Video of Component Level Tracing](#Video_of_Component_Level_Tracing)
*   [11](#_2)
*   [12 Summary](#Summary)

Overview
--------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

I wrote these functions for myself to simplify the process of doing Traces in UE4 C++.

I hope you enjoy them!

I also demonstrate the use of the Distance propery of FHitResult, which I submitted as a pull request that Epic accepted as of 4.9.0

Static
------

If you are just starting out and want to test these functions you can remove the word static,

and put these in the .h file of your choosing.

I recommend that you make a Static Function Library for yourself though and put these functions there.

**[Static Function Library Tutorial](/Static_Function_Libraries,_Your_Own_Version_of_UE4_C%2B%2B,_No_Engine_Compile_Times "Static Function Libraries, Your Own Version of UE4 C++, No Engine Compile Times")**

Overloads
---------

Two of the functions below have the same name because one is an overload of the other.

This means that the two functions differ only by parameters, and the compiler will choose which one you mean based on the parameters that you supply.

Trace
-----

static FORCEINLINE bool Trace(
	UWorld\* World,
	AActor\* ActorToIgnore,	
	const FVector& Start, 
	const FVector& End, 
	FHitResult& HitOut,
	ECollisionChannel CollisionChannel \= ECC\_Pawn,
        bool ReturnPhysMat \= false
) {
	if(!World) 
	{
		return false;
	}
 
	FCollisionQueryParams TraceParams(FName(TEXT("VictoreCore Trace")), true, ActorToIgnore);
	TraceParams.bTraceComplex \= true;
	//TraceParams.bTraceAsyncScene = true;
	TraceParams.bReturnPhysicalMaterial \= ReturnPhysMat;
 
	//Ignore Actors
	TraceParams.AddIgnoredActor(ActorToIgnore);
 
	//Re-initialize hit info
	HitOut \= FHitResult(ForceInit);
 
	//Trace!
	World\-\>LineTraceSingle(
		HitOut,		//result
		Start,	//start
		End , //end
		CollisionChannel, //collision channel
		TraceParams
	);
 
	//Hit any Actor?
	return (HitOut.GetActor() !\= NULL) ;
}

### Example Usage

//In player controller class
 
//location the PC is focused on
const FVector Start \= GetFocalLocation(); 
 
//256 units in facing direction of PC (256 units in front of the camera)
const FVector End \= Start + GetControlRotation().Vector() \* 256; 
 
//The trace data is stored here
FHitResult HitData(ForceInit);
 
//If Trace Hits anything
if(  UMyStaticFunctionLibrary::Trace(GetWorld(),GetPawn(),Start,End,HitData)  )
{
	//Print out the name of the traced actor
	if(HitData.GetActor())
	{
		ClientMessage(HitData.GetActor()\-\>GetName());
 
	        //Print out distance from start of trace to impact point
	        ClientMessage("Trace Distance: " + FString::SanitizeFloat(HitData.Distance));
	}
}

FHitResult Now Returns Exact Distance
-------------------------------------

I made a pull request that Epic has accepted as of 4.9.0 to add a Distance parameter to FHitResult that lets you know the distance from the start of the trace to the ImpactPoint!

PhysX was always returning this information, I did not cause any extra performance impact by implementing this change to the Engine code.

### Example Code

//In player controller class
 
//location the PC is focused on
const FVector Start \= GetFocalLocation(); 
 
//2000 units in facing direction of PC (in front of the camera)
const FVector End \= Start + GetControlRotation().Vector() \* 2000; 
 
//The trace data is stored here
FHitResult HitData(ForceInit);
 
//If Trace Hits anything (ignore the controlled pawn)
if(  UMyStaticFunctionLibrary::Trace(GetWorld(),GetPawn(),Start,End,HitData) && HitData.GetActor()  )
{
  ClientMessage(HitData.GetActor()\-\>GetName());
 
  //Print out the distance from the trace start to the impact point!
  ClientMessage("Distance from Trace Start to Impact: " + FString::SanitizeFloat(HitData.Distance));
}

Trace With Ignore Actors Array
------------------------------

//Trace with an Array of Actors to Ignore
//   Ignore as many actors as you want!
static FORCEINLINE bool Trace(
	UWorld\* World,
	TArray<AActor\*\>& ActorsToIgnore, 
	const FVector& Start, 
	const FVector& End, 
	FHitResult& HitOut,
	ECollisionChannel CollisionChannel \= ECC\_Pawn,
        bool ReturnPhysMat \= false
) {
	if(!World)
	{
		return false;
	}
 
	FCollisionQueryParams TraceParams(FName(TEXT("VictoryCore Trace")), true, ActorsToIgnore\[0\]);
	TraceParams.bTraceComplex \= true;
 
	//TraceParams.bTraceAsyncScene = true;
	TraceParams.bReturnPhysicalMaterial \= ReturnPhysMat;
 
	//Ignore Actors
	TraceParams.AddIgnoredActors(ActorsToIgnore);
 
	//Re-initialize hit info
	HitOut \= FHitResult(ForceInit);
 
	World\-\>LineTraceSingle(
		HitOut,		//result
		Start,	//start
		End , //end
		CollisionChannel, //collision channel
		TraceParams
	);
 
	return (HitOut.GetActor() !\= NULL) ;
}

### Example Usage

//In player controller class
 
//location the PC is focused on
const FVector Start \= GetFocalLocation(); 
 
//256 units in facing direction of PC (256 units in front of the camera)
const FVector End \= Start + GetControlRotation().Vector() \* 256; 
 
//The trace data is stored here
FHitResult HitData(ForceInit);
 
//Actors to Ignore
//  Ignore all AFlowers
TArray<AActor\*\> ActorsToIgnore;
for(TObjectIterator<AFlower\> It; It; ++It)
{
	ActorsToIgnore.Add(\*It);
}
 
//Ignore the player character too!
ActorsToIgnore.Add(GetPawn());
 
//If Trace Hits anything
if(  UMyStaticFunctionLibrary::Trace(GetWorld(),GetPawn(),Start,End,ActorsToIgnore)  )
{
	//Print out the name of the traced actor
	if(HitData.GetActor())
	{
		ClientMessage(HitData.GetActor()\-\>GetName());
 
	        //Print out distance from start of trace to impact point
	        ClientMessage("Trace Distance: " + FString::SanitizeFloat(HitData.Distance));
	}
}

Trace Component
---------------

//Component-level trace, do a trace against just 1 component
static FORCEINLINE bool TraceComponent(
	UPrimitiveComponent\* TheComp, 
	const FVector& Start, 
	const FVector& End, 
	FHitResult& HitOut
) {
	if(!TheComp) return false;
        if(!TheComp\-\>IsValidLowLevel()) return false;
	//~~~~~~~~~~~~~~~~~~~~~
 
	FCollisionQueryParams TraceParams(FName(TEXT("VictoreCore Comp Trace")), true, NULL);
	TraceParams.bTraceComplex \= true;
	//TraceParams.bTraceAsyncScene = true;
	TraceParams.bReturnPhysicalMaterial \= false;
 
	//Ignore Actors
	//TraceParams.AddIgnoredActors(ActorsToIgnore);
 
	//Re-initialize hit info
	HitOut \= FHitResult(ForceInit);
 
	return TheComp\-\>LineTraceComponent( 
		HitOut, 
		Start, 
		End, 
		TraceParams
	);
}

### Example Usage

//In player controller class
 
ACharacter\* CharacterToTrace \= //set to some character
 
if(!CharacterToTrace) return;
if(!CharacterToTrace\-\>IsValidLowLevel()) return;
//~~~~~~~~~~~~~~~~~~~~~~~~~~
 
//location the PC is focused on
const FVector Start \= GetFocalLocation(); 
 
//256 units in facing direction of PC (256 units in front of the camera)
const FVector End \= Start + GetControlRotation().Vector() \* 256; 
 
//The trace data is stored here
FHitResult HitData(ForceInit);
 
//If Trace Hits any part of the Mesh of the Character To Trace
if(  UMyStaticFunctionLibrary::Trace(CharacterToTrace\-\>GetMesh(),Start,End,HitData)  )
{
	//Print out the location of the impact on the Character's Mesh
	ClientMessage(HitData.ImpactPoint.ToString());
 
	//Print out distance from start of trace to impact point
	ClientMessage("Trace Distance: " + FString::SanitizeFloat(HitData.Distance));
}

Why Use Trace Component?
------------------------

Regular traces, like the first two, will hit collision capsules, which is not very precise if you are doing sword collision or per-bone accurate hits of any kind.

 Once you've identified the actor that has been hit with a regular trace, 
 you can use a TraceComponent on the hit Character's Mesh to get bone-level accurate traces!

Video of Component Level Tracing
--------------------------------

I used component traces in my **[Per-Bone Accurate Sword Collision System!](/Victory_Game#Per-Bone_Sword_Collision "Victory Game")**

Summary
-------

I hope you enjoy using my Trace functions, and have enjoyed my examples!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Trace\_Functions&oldid=15320](https://wiki.unrealengine.com/index.php?title=Trace_Functions&oldid=15320)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)