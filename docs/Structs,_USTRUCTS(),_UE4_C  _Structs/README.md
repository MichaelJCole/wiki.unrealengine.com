Structs, USTRUCTS(), They're Awesome - Epic Wiki               

Structs, USTRUCTS(), They're Awesome
====================================

From Epic Wiki

(Redirected from [Structs, USTRUCTS(), UE4 C++ Structs](/index.php?title=Structs,_USTRUCTS(),_UE4_C%2B%2B_Structs&redirect=no "Structs, USTRUCTS(), UE4 C++ Structs"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Core Syntax](#Core_Syntax)
*   [3 Examples](#Examples)
    *   [3.1 Example 1](#Example_1)
    *   [3.2 Example 2](#Example_2)
        *   [3.2.1 C++](#C.2B.2B)
        *   [3.2.2 Particle Data Tracker](#Particle_Data_Tracker)
        *   [3.2.3 Garbage Collection](#Garbage_Collection)
*   [4 Structs With Struct Member Variables](#Structs_With_Struct_Member_Variables)
*   [5 Struct Assignment](#Struct_Assignment)
    *   [5.1 .H](#.H)
    *   [5.2 .CPP](#.CPP)
*   [6 Deep Copy, Epic is Awesome](#Deep_Copy.2C_Epic_is_Awesome)
    *   [6.1 .H](#.H_2)
    *   [6.2 .CPP](#.CPP_2)
*   [7 Automatic Make/Break in BP](#Automatic_Make.2FBreak_in_BP)
*   [8 Replication](#Replication)
    *   [8.1 .H](#.H_3)
    *   [8.2 .CPP](#.CPP_3)
*   [9 Thank You Epic for USTRUCTS()](#Thank_You_Epic_for_USTRUCTS.28.29)

Overview
--------

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Structs enable you to create custom variable types to organize your data, by relating other c++ or UE4 C++ data types to each other.

The power of structs is **extreme organization**,

as well as ability to have functions for **internal data type operations!**

 Structs should be used for simple data type combining and data management purposes.

 For complex interactions with the game world, 
 you should make a UObject or AActor subclass instead :)

Core Syntax
-----------

USTRUCT()
struct FJoyStruct
{
	GENERATED\_USTRUCT\_BODY()
 
	//Always make USTRUCT variables into UPROPERTY()
	//    any non-UPROPERTY() struct vars are not replicated
 
	// So to simplify your life for later debugging, always use UPROPERTY()
	UPROPERTY()
	int32 SampleInt32;
 
	UPROPERTY()
	AActor\* TargetActor;
 
	//Set
	void SetInt(const int32 NewValue)
	{
		SampleInt32 \= NewValue;
	}
 
	//Get
	AActor\* GetActor()
	{
		return TargetActor;
	}
 
	//Check
	bool ActorIsValid() const
	{
		if(!TargetActor) return false;
		return TargetActor\-\>IsValidLowLevel();
	}
 
	//Constructor
	FJoyStruct()
	{
		//Always initialize your USTRUCT variables!
		//   exception is if you know the variable type has its own default constructor
		SampleInt32 	\= 5;
		TargetActor \= NULL;
	}
};  //Always remember this ;  at the end! You will get odd compile errors otherwise

Examples
--------

### Example 1

You want to relate a float brightness value with a world space location FVector, both of which are interpolated using an Alpha value.

*   And you want to do this for 100 different game locations simultaneously.

*   And you want to do this process repeatedly over time!

*   You need to store the incremental interpolation values between game events.

*   AActors/UObjects are not involved (You could just subclass AActor/UObject and store the data per instance)

  

USTRUCT()
struct FMyInterpStruct
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY()
	float Brightness;
 
	UPROPERTY()
	float BrightnessGoal; //interping to
 
	UPROPERTY()
	FVector Location;
 
	UPROPERTY()
	FVector LocationGoal;
 
	UPROPERTY()
	float Alpha;
 
	void InterpInternal()
	{
		Location \= FMath::Lerp<FVector\>(Location,LocationGoal,Alpha);
		Brightness \= FMath::Lerp<float\>(Brightness,BrightnessGoal,Alpha);
	}
 
	//Brightness out is returned, FVector is returned by reference
	float Interp(const float& NewAlpha, FVector& Out)
	{
		//value received from rest of your game engine
		Alpha \= NewAlpha;
 
		//Internal data structure management
		InterpInternal();
 
		//Return Values
		Out \= Location;
		return Brightness;
	}
	FMyInterpStruct()
	{
		Brightness \= 2; 
		BrightnessGoal \= 100;
 
		Alpha \= 0; 
 
		Location \= FVector::ZeroVector;
		LocationGoal \= FVector(0,0,200000);
	}
};

### Example 2

You want to track information about particle system components that you have spawned into the world

 UGameplayStatics::SpawnEmitterAtLocation()

which returns a UParticleSystemComponent,

and you want to track the lifetime of the particle and apply parameter changes from the C++.

You could write your own class,

but if your needs are simple,

or you do not have project-permissions to make a subclass of UParticleSystemComponent,

you can just make a USTRUCT to relate the various data types!

#### C++

USTRUCT()
struct FParticleStruct
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY()
	UParticleSystemComponent\* PSCPtr;
 
	UPROPERTY()
	float LifeTime;
 
	void SetColor()
	{
		//
	}
	FLinearColor GetCurrentColor() const
	{
		//
	}
 
	//For GC
	void Destroy()
	{
		PSCPtr \= nullptr;
	}
 
	//Constructor
	FParticleStruct()
	{
		PSCPtr \= NULL;
		LifeTime \= \-1;
	}
};

#### Particle Data Tracker

Now you can have an array of these USTRUCTS for each particle that you spawn!

//Particle Data Tracking Array
TArray<FParticleStruct\> PSCArray;

#### Garbage Collection

Because all of your USTRUCT variables are UPROPERTY(), you must be careful to null them out when you are ready to destroy the particle system component.

void Destroy()
{
	PSCPtr \= nullptr;
}

Structs With Struct Member Variables
------------------------------------

The struct that wants to use another struct must be defined below the struct it wants to include.

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
 
USTRUCT()
struct FIslandStruct
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY()
	int32 Type;
 
	UPROPERTY()
	TArray<FVector\> StarLocations;
 
	UPROPERTY()
	float RainAlpha;
 
	//Dynamic Array of Flower Custom USTRUCT()
	UPROPERTY()
	TArray<FFlowerStruct\> FlowersOnThisIsland;
 
	void SetRainAlpha(const float& NewAlpha) 
	{
		RainAlpha \= NewAlpha;
	}
 
	int32 GetStarCount() const
	{
		return StarLocations.Num();
	}
	FIslandStruct()
	{
		Type \= 0;
		Percent \= 1;
	}
};

Struct Assignment
-----------------

My personal favorite thing about structs is that unlike UObject or AActor classes, which must be utilized via pointers (AActor\*)

 You can directly copy the entire contents of a USTRUCT 
 to another USTRUCT of the same type with a single line of assignment!

### .H

FFlowerStruct ExistingFlower;

### .CPP

FFlowerStruct NewFlower;
NewFlower \= ExistingFlower; 
 
//now NewFlower contains exactly the same data as ExistingFlower!

Deep Copy, Epic is Awesome
--------------------------

My next favorite thing about USTRUCTS is that if you do use struct assignment,

deep copying of all dynamic arrays and static arrays is done for you!

### .H

USTRUCT()
struct FDeepCopyStruct
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY()
	TArray<FVector\> Locations;
 
	UPROPERTY()
	FLinearColor Colors\[1024\];
 
	FDeepCopyStruct()
	{
	}
};
 
 
FDeepCopyStruct MyExistingDeepCopyStruct;

### .CPP

FDeepCopyStruct NewStruct;
NewStruct \= MyExistingDeepCopyStruct;
 
//now all of the dynamic array and static array data has also been copied
//   Thank You Epic!

Automatic Make/Break in BP
--------------------------

If you add

 EditAnywhere,BlueprintReadWrite,Category("your category")

to your USTRUCT variables then then an automatic Make and Break functions will be added in Blueprints, allowing you to construct or extract data from your custom USTRUCT!

Special thanks to Community member Iniside for pointing this out :)

USTRUCT()
struct FFlowerStruct
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Flower Struct")
	int32 NumPetals;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Flower Struct")
	FLinearColor Color;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Flower Struct")
	FVector Scale3D;
};

[![CustomUStructMakeBreak.jpg](https://d3ar1piqh1oeli.cloudfront.net/0/0d/CustomUStructMakeBreak.jpg/1000px-CustomUStructMakeBreak.jpg)](/File:CustomUStructMakeBreak.jpg)

Replication
-----------

* * *

* * *

* * *

 Remember that only UPROPERTY() variables of USTRUCTS() are considered for replication!

* * *

* * *

* * *

  

### .H

Use RepRetry to guarantee all contents of the struct are replicated, if you need to

//in your AYourSimulatedProxy class .h
 
UPROPERTY(Replicated,RepRetry)
FFlowerStruct MyReppedFlower;

### .CPP

DOREPLIFETIME(AYourSimulatedProxy, MyReppedFlower);

Thank You Epic for USTRUCTS()
-----------------------------

I love USTRUCTS(), thank you Epic!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Structs,\_USTRUCTS(),\_They%27re\_Awesome&oldid=5771](https://wiki.unrealengine.com/index.php?title=Structs,_USTRUCTS(),_They%27re_Awesome&oldid=5771)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")