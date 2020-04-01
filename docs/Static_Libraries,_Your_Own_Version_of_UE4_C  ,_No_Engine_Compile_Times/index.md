Static Function Libraries, Your Own Version of UE4 C++, No Engine Compile Times - Epic Wiki               

Static Function Libraries, Your Own Version of UE4 C++, No Engine Compile Times
===============================================================================

From Epic Wiki

(Redirected from [Static Libraries, Your Own Version of UE4 C++, No Engine Compile Times](/index.php?title=Static_Libraries,_Your_Own_Version_of_UE4_C%2B%2B,_No_Engine_Compile_Times&redirect=no "Static Libraries, Your Own Version of UE4 C++, No Engine Compile Times"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 .H](#.H)
*   [3 .CPP](#.CPP)
*   [4 Example Usage](#Example_Usage)
*   [5 Dependson](#Dependson)
*   [6 Why UObject?](#Why_UObject.3F)
    *   [6.1 USTRUCT() Library](#USTRUCT.28.29_Library)
*   [7 Related Tutorials](#Related_Tutorials)
*   [8 Summary](#Summary)

Overview
--------

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Building up your own static library of functions enables you to create your own version of UE4 C++ without having to modify the engine code and recompile it constantly.

A static library can have FORCEINLINE functions as well as .cpp functions that utilize your entire Game's compiled header structure!

 Whenever you have a core function that you want to use in many classes, 
 you can make it into a Static Library function 
 so it can be used any time anywhere!

.H
--

#pragma once
 
#include "MyStaticLibrary.generated.h"
 
UCLASS() 
class UMyStaticLibrary : public UObject
{
	GENERATED\_UCLASS\_BODY()
 
	//FORCEINLNE function
	static FORCEINLINE bool IsValid(AActor\* TheActor)
	{
		if(!TheActor) return false;
		if(!TheActor\-\>IsValidLowLevel()) return false;
		return true;
	}
 
	//cpp function
	static int32 ComplicatedGameDataAnalysis();
};

.CPP
----

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#include "VictoryGame.h"
 
//////////////////////////////////////////////////////////////////////////
// MyStaticLibrary
 
UMyStaticLibrary::UMyStaticLibrary(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
 
}
 
int32 UMyStaticLibrary::ComplicatedGameDataAnalysis()
{
	//Do lots of stuff that requires the entire Game's compiled header source,
	//  involving lots of your custom project-specific classes,
	//    classes that have not been compiled in the .h of this library 
	//    since they depend on it.
        return 9000;
}

Example Usage
-------------

In any class, in the .h, or the .cpp, anywhere really (if the class depends on your static library

//Anywhere, in .h or .cpp, in any class! 
if(UMyStaticLibrary::IsValid(MyCharacter))
{
  //Celebrate
  ClientMessage( FString::FromInt(UMyStaticLibrary::ComplicatedGameDataAnalysis()) );
}

Dependson
---------

All of the classes that want to use your Static Library must depend on it

UCLASS(dependson\=UMyStaticLibrary)

Why UObject?
------------

Because then you can also define USTRUCTS() in your static library, the very best place for them, if many classes want to use them!

### USTRUCT() Library

//My 2D Rectangle data type
//  because this is defined in your static library that all your classes depend on,
//  you can use this USTRUCT() data type in any class, even in  .h FORCEINLINE functions!
 
USTRUCT()
struct FVRect
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY()
	FVector2D Min;
 
	UPROPERTY()
	FVector2D Max;
 
	//overloaded constructor
	FVRect(const FVector2D& VPoint1, const FVector2D& VPoint2)
	{
		//drag topleft to bottom right
		if(VPoint1.X < VPoint2.X &&
			VPoint1.Y < VPoint2.Y
		){
			Min 	\= VPoint1;
			Max 	\= VPoint2;
		}
 
		//drag from bottom right to top left
		else if(VPoint1.X \> VPoint2.X &&
			VPoint1.Y \> VPoint2.Y
		){
			Min 	\= VPoint2;
			Max 	\= VPoint1;
		}
 
		//drag from bottom left to top right
		else if(VPoint1.X < VPoint2.X &&
			VPoint1.Y \> VPoint2.Y
		){
			Min 	\= FVector2D(VPoint1.X, VPoint2.Y);
			Max 	\= FVector2D(VPoint2.X, VPoint1.Y);
		}
 
		//etc...
	}
 
	//base constructor
	FVRect()
	{
		Min \= FVector2D(0,0);
		Max \= FVector2D(500,500);
	}
};
 
USTRUCT()
struct FQuadVRect
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY()
	FVRect Rects\[4\];
 
        //base constructor
	FQuadVRect()
	{
	}
};
 
//And many
//many
//many
//many more USTRUCTS() !
 
UCLASS() 
class UMyStaticLibrary : public UObject
{
	GENERATED\_UCLASS\_BODY()
 
};

Related Tutorials
-----------------

[Linking Static Libraries Using The Build System](/Linking_Static_Libraries_Using_The_Build_System "Linking Static Libraries Using The Build System")

Great tutorial by [Bob Gneu](/User:Bob_Gneu "User:Bob Gneu")!

Summary
-------

Now you have an easy way to write your own version of UE4 C++ to include essential project-specific function tools,

 without having to recompile the entire engine code constantly!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Static\_Function\_Libraries,\_Your\_Own\_Version\_of\_UE4\_C%2B%2B,\_No\_Engine\_Compile\_Times&oldid=1836](https://wiki.unrealengine.com/index.php?title=Static_Function_Libraries,_Your_Own_Version_of_UE4_C%2B%2B,_No_Engine_Compile_Times&oldid=1836)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")