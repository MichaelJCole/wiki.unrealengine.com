Templates in C++ - Epic Wiki                    

Templates in C++
================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Spawn Actor From Blueprint](#Spawn_Actor_From_Blueprint)
    *   [2.1 Static](#Static)
    *   [2.2 .H](#.H)
    *   [2.3 Template Return Type](#Template_Return_Type)
*   [3 Calling SpawnBP Function](#Calling_SpawnBP_Function)
*   [4 Base Class for the Template, not the BP](#Base_Class_for_the_Template.2C_not_the_BP)
*   [5 In-Engine Example: Min/Max of Array](#In-Engine_Example:_Min.2FMax_of_Array)
*   [6 Summary](#Summary)

Overview
--------

Dear Community,

Here's how you make template classes!

Basic format:

You put templates in your .h file, not the .cpp

If your template function is only a few lines, then FORCEINLINE can be a great optimization! Look up "c++ inline functions"

So using the method I am showing, these are the core parts of the declaration and definition:

template <typename YourTemplateType\>
FORCEINLINE void YourFunction()
{
	//function body
}

Spawn Actor From Blueprint
--------------------------

I wrote a templated SpawnBP function to simplify and streamline the process of spawning actors from a blueprint!

I put this function in the .h of a static library of functions I created.

template <typename VictoryObjType\>
static FORCEINLINE VictoryObjType\* SpawnBP(
	UWorld\* TheWorld, 
	UClass\* TheBP,
	const FVector& Loc,
	const FRotator& Rot,
	const bool bNoCollisionFail \= true,
	AActor\* Owner \= NULL,
	APawn\* Instigator \= NULL
){
	if(!TheWorld) return NULL;
	if(!TheBP) return NULL;
	//~~
 
	FActorSpawnParameters SpawnInfo;
	SpawnInfo.bNoCollisionFail 		\= bNoCollisionFail;
	SpawnInfo.Owner 				\= Owner;
	SpawnInfo.Instigator				\= Instigator;
	SpawnInfo.bDeferConstruction 	\= false;
 
	return TheWorld\-\>SpawnActor<VictoryObjType\>(TheBP, Loc ,Rot, SpawnInfo );
}

  

### Static

You could remove the static keyword and put this function in any .h file of your choosing, if that class is actually instanced, such as HUD, PlayerController, or Character (perhaps just for testing).

  

### .H

Again keep in mind this is all occurring in a .h file somewhere, no .cpp involved.

  

### Template Return Type

Notice I am returning the templated type as a pointer

Calling SpawnBP Function
------------------------

From a Static Library, in an actor class (for use of GetWorld())

"SpawnLoc" and "SpawnRot" are calculated by you based on your needs

AActorBaseClass\* NewActor \= UFunctionLibrary::SpawnBP<AActorBaseClass\>(GetWorld(), TheActorBluePrint, SpawnLoc, SpawnRot);

From an instanced Actor class

AActorBaseClass\* NewActor \= SpawnBP<AActorBaseClass\>(GetWorld(), TheActorBluePrint, SpawnLoc, SpawnRot);

Specific UE4 example:

AStaticMeshActor\* NewActor \= SpawnBP<AStaticMeshActor\>(GetWorld(), TheSMABluePrint, SpawnLoc, SpawnRot);

  

Base Class for the Template, not the BP
---------------------------------------

Note that I am using the Base Class from which the BP was made as the templated type!

TheActorBluePrint was made in the Editor, from the Base Class.

In order to use the spawn function in a templated way I have to use the base class which is known at compile time as the templated type.

  

In-Engine Example: Min/Max of Array
-----------------------------------

My Min/Max of Array functions that were added to the Engine in 4.3 make extensive use of C++ Templates!

**Full code samples on my UE4 forum page!**

[For You From Me in 4.3, Two New Math Functions, Template Min/Max of Array](https://forums.unrealengine.com/showthread.php?20212-Two-new-Math-functions-for-you-from-me-in-4-3-Template-Min-Max-of-Array&p=98583&viewfull=1#post98583)

Summary
-------

Now you know how to make C++ templates!

And you also have a convenient helper function for spawning actors from a BP !

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Templates\_in\_C%2B%2B&oldid=11086](https://wiki.unrealengine.com/index.php?title=Templates_in_C%2B%2B&oldid=11086)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)