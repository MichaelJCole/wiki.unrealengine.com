Blueprint Function Library, Create Your Own to Share With Others - Epic Wiki               

Blueprint Function Library, Create Your Own to Share With Others
================================================================

From Epic Wiki

(Redirected from [Blueprint Function Library, Create Your Own to Share With Others!](/index.php?title=Blueprint_Function_Library,_Create_Your_Own_to_Share_With_Others!&redirect=no "Blueprint Function Library, Create Your Own to Share With Others!"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Blueprint Function Libraries](#Blueprint_Function_Libraries)
*   [3 My Blueprint Node for Saving Text To Any File in Any Directory](#My_Blueprint_Node_for_Saving_Text_To_Any_File_in_Any_Directory)
*   [4 Entire C++ Code](#Entire_C.2B.2B_Code)
    *   [4.1 .h](#.h)
    *   [4.2 .cpp](#.cpp)

Overview
--------

Dear Community,

In this code sample:

1\. How to create new blueprint nodes that you can access from ANY blueprint in your project without any interfaces

2\. How to **create a set of blueprint functions that you can share with the whole Community** and have it be easy for others to integrate your BP library with their project

3\. My code for a BP function to save any text you want to any file in any directory on your computer. My code creates the directory for you if it does not exist at time of saving :)

[![SaveTextToHardDisk.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e0/SaveTextToHardDisk.jpg)](/File:SaveTextToHardDisk.jpg)

Blueprint Function Libraries
----------------------------

Creating your own Blueprint library of static functions that you can call from **any blueprint you want** in any project you want is amazingly easy!

You just put all your static functions into a single class!

Below is my entire working code for what you see in the pictures below, of my very own first two functions in my own Blueprint library.

The power of what I am showing you is that you can take my code, copy it into your own project, and then access these same functions from any blueprint you want!

So in this way we can create a whole additional library of functions for UE4 Blueprint users!

My Blueprint Node for Saving Text To Any File in Any Directory
--------------------------------------------------------------

The function you might actually want to use from my code below is the Blueprint node to save any text you want to any file you want anywhere on your harddrive.

Entire C++ Code
---------------

### .h

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#pragma once
 
#include "VictoryBPFunctionLibrary.generated.h"
 
//above name must match the name on your hard disk for this .h file
 
//note about UBlueprintFunctionLibrary
// This class is a base class for any function libraries exposed to blueprints.
// Methods in subclasses are expected to be static
 
UCLASS()
class UVictoryBPFunctionLibrary : public UBlueprintFunctionLibrary
{
	GENERATED\_UCLASS\_BODY()
 
	UFUNCTION(BlueprintCallable, Category\="VictoryBPLibrary")
	static FString GetHappyMessage();
 
	/\*\* Saves text to filename of your choosing, make sure include whichever file extension you want in the filename, ex: SelfNotes.txt . Make sure to include the entire file path in the save directory, ex: C:\\MyGameDir\\BPSavedTextFiles \*/
	UFUNCTION(BlueprintCallable, Category\="VictoryBPLibrary")
	static bool SaveStringTextToFile(FString SaveDirectory, FString FileName, FString SaveText, bool AllowOverWriting \= false);
};

### .cpp

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#include "VictoryGame.h"
 
//Change the above to YourGameName.h, 
//the same line you see in all your .cpp files
 
//////////////////////////////////////////////////////////////////////////
// UVictoryBPFunctionLibrary
 
UVictoryBPFunctionLibrary::UVictoryBPFunctionLibrary(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
 
}
 
//Happy Message
FString UVictoryBPFunctionLibrary::GetHappyMessage()
{
	return FString("Victory! Victory BP Library Works!");
}
 
bool UVictoryBPFunctionLibrary::SaveStringTextToFile(
	FString SaveDirectory, 
	FString FileName, 
	FString SaveText,
	bool AllowOverWriting
){
	//GFileManager?
	if (!GFileManager) return false;
 
	//Dir Exists?
	if ( !GFileManager\-\>DirectoryExists( \*SaveDirectory))
	{
		//create directory if it not exist
		GFileManager\-\>MakeDirectory( \*SaveDirectory);
 
		//still could not make directory?
		if (!GFileManager\-\>DirectoryExists( \*SaveDirectory))
		{
			//Could not make the specified directory
			return false;
			//~~~~~~~~~~~~~~~~~~~~~~
		}
	}
 
	//get complete file path
	SaveDirectory +\= "\\\\";
	SaveDirectory +\= FileName;
 
	//No over-writing?
	if (!AllowOverWriting)
	{
		//Check if file exists already
		if (GFileManager\-\>GetFileAgeSeconds( \* SaveDirectory) \> 0) 
		{
			//no overwriting
			return false;
		}
	}
 
	return FFileHelper::SaveStringToFile(SaveText, \* SaveDirectory);
}

  

**Enjoy!**

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Function\_Library,\_Create\_Your\_Own\_to\_Share\_With\_Others&oldid=2313](https://wiki.unrealengine.com/index.php?title=Blueprint_Function_Library,_Create_Your_Own_to_Share_With_Others&oldid=2313)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")