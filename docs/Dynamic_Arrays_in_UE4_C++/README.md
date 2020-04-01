Dynamic Arrays - Epic Wiki                     

Dynamic Arrays
==============

(Redirected from [Dynamic Arrays in UE4 C++](/index.php?title=Dynamic_Arrays_in_UE4_C%2B%2B&redirect=no "Dynamic Arrays in UE4 C++"))

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Example 1](#Example_1)
    *   [1.2 Example 2](#Example_2)
    *   [1.3 Summary](#Summary)
*   [2 Available Types](#Available_Types)
    *   [2.1 C++ Type](#C.2B.2B_Type)
    *   [2.2 UE4 C++ Type](#UE4_C.2B.2B_Type)
    *   [2.3 Pointer to UObject Class](#Pointer_to_UObject_Class)
    *   [2.4 Pointer to AActor Class](#Pointer_to_AActor_Class)
    *   [2.5 Pointer to Blueprint Class](#Pointer_to_Blueprint_Class)
    *   [2.6 UE4 C++ Enums](#UE4_C.2B.2B_Enums)
*   [3 Arrays of USTRUCTS() or Pointers to UStructs](#Arrays_of_USTRUCTS.28.29_or_Pointers_to_UStructs)
    *   [3.1 Sample USTRUCT()](#Sample_USTRUCT.28.29)
    *   [3.2 Array of USTRUCTS()](#Array_of_USTRUCTS.28.29)
    *   [3.3 The Pointer Version](#The_Pointer_Version)
*   [4 Blueprint-Accessible Dynamic Arrays](#Blueprint-Accessible_Dynamic_Arrays)
*   [5 Core Functions](#Core_Functions)
    *   [5.1 .Add()](#.Add.28.29)
    *   [5.2 .Remove()](#.Remove.28.29)
    *   [5.3 .RemoveAt()](#.RemoveAt.28.29)
    *   [5.4 .Num()](#.Num.28.29)
*   [6 For Loops](#For_Loops)
    *   [6.1 Basic](#Basic)
    *   [6.2 For AActor\*](#For_AActor.2A)
    *   [6.3 Using Iterator](#Using_Iterator)
    *   [6.4 Iterator AActor\* Example](#Iterator_AActor.2A_Example)
    *   [6.5 Abbreviated C++11 Syntax](#Abbreviated_C.2B.2B11_Syntax)
*   [7 Index Safety Check To Prevent Crashes](#Index_Safety_Check_To_Prevent_Crashes)
    *   [7.1 .IsValidIndex()](#.IsValidIndex.28.29)
*   [8 Awesome Functions](#Awesome_Functions)
    *   [8.1 .Empty()](#.Empty.28.29)
    *   [8.2 .Append()](#.Append.28.29)
*   [9 Min/Max of Array (4.3 and higher)](#Min.2FMax_of_Array_.284.3_and_higher.29)
*   [10 Multi Dimensional Arrays](#Multi_Dimensional_Arrays)
    *   [10.1 .H](#.H)
    *   [10.2 .CPP](#.CPP)
    *   [10.3 Full 2D Array Code Sample](#Full_2D_Array_Code_Sample)
*   [11 \[Epic Docs\] TArray Optimization Techniques](#.5BEpic_Docs.5D_TArray_Optimization_Techniques)
*   [12 Summary](#Summary_2)

Overview
--------

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here is my introduction to UE4 C++ Dynamic Arrays!

They're awesome!

### Example 1

You can use dynamic arrays to store references to every ACharacter that crosses a certain point in your level, and then, after at least 5 ACharacters have crossed the point, you can iterate over all the actors and perform an action.

So in this way, you could make it a game-ending condition that if 5 bunny-rabbits reach their home, then the game ends in success.

During runtime you never know how long it will take for the bunny-rabbits to reach home, but via code you can track how many have reached home, whenever they do, and the iterate over all of them to make them perform some kind of victory dance as the level ends.

But you also never know which bunny-rabbits will be doing the dancing!

thus the word "dynamic"

**Dynamic arrays enable you to track dynamically changing game conditions from the UE4 C++**

### Example 2

You could make a dynamic array that is accessible to blueprints so your team members working in blueprints can add information to the dynamic array, which you as the programmer will then use in c++ during runtime.

But you as the programmer do not know how much data they will add!

So you could give the level designers a dynamic array to edit in blueprints, and they will fill it with 3 or 10 or 100 level names.

Then you can, in the C++, iterate over all of the level names and display them, **without ever knowing in advance how many levels the designers added!**

And the level designers can add more any time!

### Summary

**Dynamic arrays are one of the most essential tools** for any game-logic that you want to do,

where the actions of the player, the in-game AI, and the rest of your team cannot be known in advance,

but need to be tracked, organized, and facilitated via UE4 C++ code systems.

Available Types
---------------

*   Any C++ type
*   Any UE4 C++ type, such as FLinearColor
*   Pointer to a UObject or an AActor extending class
*   Pointer to Blueprint Classes
*   UE4++ Enums
*   USTRUCTS() or USTRUCT() pointers

### C++ Type

TArray<uint8\> BinaryArray;

### UE4 C++ Type

TArray<FRotator\> StarLocations;

### Pointer to UObject Class

TArray<USkeletalMeshComponent\*\> Weapons;

### Pointer to AActor Class

TArray<ACharacter\*\> FrogsThatAreHopping;

### Pointer to Blueprint Class

TArray<UClass\*\> FlowerBlueprints;

### UE4 C++ Enums

TArray<EKeys::Type\> GameControlKeys;

Arrays of USTRUCTS() or Pointers to UStructs
--------------------------------------------

Let's say you have defined this USTRUCT()

### Sample USTRUCT()

USTRUCT()
struct FFlowerStruct
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY()
	int32 NumPetals;
 
	UPROPERTY()
	FLinearColor Color;
 
	UPROPERTY()
	FVector Scale3D;
 
	void SetFlowerColor(const FLinearColor& NewColor)
	{
		Color \= NewColor;
	}
 
	FFlowerStruct()
	{
		NumPetals 	\= 5;
		Scale3D 		\= FVector(1,1,1);
		Color 			\= FLinearColor(1,0,0,1);
	}
};

### Array of USTRUCTS()

You can make an array of FFlowerStructs as follows!

TArray<FFlowerStruct\> Flowers;

### The Pointer Version

TArray<FFlowerStruct\*\> FlowerPtrs;

Blueprint-Accessible Dynamic Arrays
-----------------------------------

/\*\* Add entries in BP Defaults, or during Runtime! Iterate over them using the For Each Loop BP Node \*/
UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Flowers")
TArray<FName\> FlowerNames;

Core Functions
--------------

### .Add()

TArray<FVector\> StarLocations;
StarLocations.Add(FVector(0,0,2000000));

### .Remove()

//Defined in the .h file: 
//  TArray<ACharacter\*> FrogsThatAreHopping;
//  ACharacter\* FrogThatIsTired;
 
FrogsThatAreHopping.Remove(FrogThatIsTired);

### .RemoveAt()

//Remove first frog from the array
if(FrogsThatAreHopping.Num() \> 0)
{
  FrogsThatAreHopping.RemoveAt(0);
}

### .Num()

Returns number of elements in the array (can be used when you need the length of the array).

ClientMessage("Total Flower Count");
ClientMessage(FString::FromInt(Flowers.Num()));

For Loops
---------

### Basic

// defined in .h TArray<FVector> StarLocations;
 
//Print Star Locations
for(int32 b \= 0; b < StarLocations.Num(); b++)
{
   ClientMessage(StarLocations\[b\].ToString());
}

### For AActor\*

I am including very rigorous **pointer safety** and **AActor validity** checks,

because you dont want your whole game to crash to desktop, ever :)

//defined in the .h : TArray<AFlower\*> Flowers;
 
//Print out each flower's UE4 Name
 
AFlower\* CurFlower \= NULL;
for(int32 b \= 0; b < Flowers.Num(); b++)
{
	CurFlower \= Flowers\[b\];
	if(!CurFlower) continue;
	if(!CurFlower\-\>IsValidLowLevel()) continue;
	//~~~~~~~~~~~~~~~~~~~~~~
 
	ClientMessage(CurFlower\-\>GetName());
}

### Using Iterator

Posted originally by Solid Snake, thanks Solid Snake!

for (auto Iter(TArray.CreateIterator()); Iter; Iter++)
{
  // \*Iter to access what this iterator is pointing to.
}

### Iterator AActor\* Example

//defined in the .h : TArray<AFlower\*> Flowers;
 
//Print out each flower's UE4 Name
for (auto Itr(Flowers.CreateIterator()); Itr; Itr++)
{
	if(!(\*Itr)\-\>IsValidLowLevel()) continue;
	//~~~~~~~~~~~~~~~~~~~~~~
 
	ClientMessage((\*Itr)\-\>GetName());
}

### Abbreviated C++11 Syntax

This one is great when you don't need to know the index as you are iterating! [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

this:

for(int32 b; b < StarLocations.Num(); b++)
{
   ClientMessage(StarLocations\[b\].ToString());
}

becomes this:

for(const FVector& EachLocation : StarLocations)
{
   ClientMessage(EachLocation.ToString());
}

If you want to change the value in the loop, and not just read it, then remove the const :)

Index Safety Check To Prevent Crashes
-------------------------------------

### .IsValidIndex()

//defined in .h
//TArray<float> RandomPercentValues;
 
//Pick a random Percent Value!
float AMyPlayerController::GetRandomPercenttValue() const
{
	//Negative array indicies are always invalid 
	//		and will always cause a crash if you try to use one.
 
	//Use IsValidIndex to verify the index is in range 
	//		\*\*\*before\*\*\* you try to access the array!
 
	const int32 RandomIndex \= FMath::RandRange(\-50,10000); 
 
	//Safety Check
	if( ! RandomPercentValues.IsValidIndex(RandomIndex)) return \-1;
	//~~~~~~~~~~~~~~~~~~~~~~~
 
	return RandomPercentValues\[RandomIndex\];
}

Awesome Functions
-----------------

### .Empty()

Empty array of all current contents

//It's nighttime, no more hopping;
FrogsThatAreHopping.Empty();

### .Append()

Add the entire contents of one array to the end of another!

TArray<FVector\> StarLocations;
TArray<FVector\> CloudLocations;
TArray<FVector\> StarAndCloudLocations;
 
StarLocations.Add(0,0,200000);
CloudLocations.Add(50,25,11000);
CloudLocations.Add(50,25,22200);
 
StarAndCloudLocations.Append(StarLocations);
StarAndCloudLocations.Append(CloudLocations);
 
//Print out all Locations
for(int32 b; b < StarAndCloudLocations.Num(); b++)
{
	ClientMessage(StarAndCloudLocations\[b\].ToString());
}

Min/Max of Array (4.3 and higher)
---------------------------------

I offered two Math Library functions to Epic which are now part of the Engine in 4.3, allowing you to get the Min/Max of a Dynamic Array of any datatype for which the operator< is defined!

Full details here:

**[Min Max of Array](/Min/Max_of_An_Array_of_Any_DataType,_Including_Ones_That_You_Create "Min/Max of An Array of Any DataType, Including Ones That You Create")**

Multi Dimensional Arrays
------------------------

To make a 2 or higher dimensional array,

wrap the array in a UStruct, and then make an Array of the UStructs

### .H

USTRUCT()
struct FFlowerField
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY()
	TArray<FFlowerStruct\> Flowers;
 
	FFlowerField()
	{
	}
};
 
//All Flower Fields on The Island
TArray<FFlowerField\> FlowerFields;

### .CPP

Then to Access a single Flower

//Is there at least 1 Flower Field?
if(FlowerFields.Num() \> 0)
{
  //Does the first field have at least 3 flowers? (could use .Num() too)
  if(FlowerFields\[0\].Flowers.IsValidIndex(2))
  {
     //Number of petals on the 3rd flower in 1st field
     ClientMessage(FString::FromInt(FlowerFields\[0\].Flowers\[2\].NumPetals));
  }
}

### Full 2D Array Code Sample

I have two extensive code samples for how to make 2D arrays that are BP-friendly and can be replicated!

[My Fully Coded 2D Array Example](https://forums.unrealengine.com/showthread.php?47-SaxonRahs-Tutorial-Thread-Random-Maze-Generation-amp-Solving&p=27139&viewfull=1#post27139)

[Replicating BP-Friendly 2D Array](https://forums.unrealengine.com/showthread.php?60398-Replicating-a-2D-dynamic-array&p=232520&viewfull=1#post232520)

\[Epic Docs\] TArray Optimization Techniques
--------------------------------------------

Epic has posted an awesome article on ways you can optimize your use of TArray!

[**TArray Optimizations for Performance**](https://www.unrealengine.com/blog/optimizing-tarray-usage-for-performance)

Summary
-------

I hope you have enjoyed my description of UE4 C++ Dynamic Arrays!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Dynamic\_Arrays&oldid=14756](https://wiki.unrealengine.com/index.php?title=Dynamic_Arrays&oldid=14756)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)