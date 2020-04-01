Config Files, Read & Write to Config Files - Epic Wiki               

Config Files, Read & Write to Config Files
==========================================

From Epic Wiki

(Redirected from [Config Files, Read & Write to Config Files in UE4 C++](/index.php?title=Config_Files,_Read_%26_Write_to_Config_Files_in_UE4_C%2B%2B&redirect=no "Config Files, Read & Write to Config Files in UE4 C++"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

**Rate this Article:**

3.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:(please verify)

Contents
--------

*   [1 Overview](#Overview)
*   [2 ConfigCacheIni.h](#ConfigCacheIni.h)
*   [3 Code Samples](#Code_Samples)
    *   [3.1 Reading From Config File](#Reading_From_Config_File)
    *   [3.2 Writing to Config File](#Writing_to_Config_File)
*   [4 Of Great Importance](#Of_Great_Importance)
*   [5 Conclusion](#Conclusion)

Overview
--------

Dear Community,

In this tutorial I am showing you working code samples you can plug into your player controller class (or any class if you remove the ClientMessage() parts).

In these samples I retrieve various bits of information, including the Near Clip Pane value, from the Game and Engine inis, and I also write a new section into the Game.ini called Victory.Core and store some data there.

  
**The main advantage of config files is that the user can go in and edit the data in a human-readible format any time they want!**

  
Please note that when you write out info to config files, the data is not stored in YourGame\\Config where the defaultconfig files are.

Your data will be written to

YourGame\\Saved\\Config\\Windows

Here's were you can edit the data outside your game and then launch your game and read that changed data into your game system :)

Enjoy!

ConfigCacheIni.h
----------------

Check out this header for all the function definitions and options available to you, for writing out arrays or reading in entire file as a FString, many, many useful functions

Code Samples
------------

Quoting Solid Snake:

" There is a bunch of globals that you can use here to quickly grab the core configuration files:

*   GEngineIni
*   GInputIni
*   GGameIni
*   GGameUserSettingsIni

"

This is very useful info!

You will see in the functions below I rely on these global FStrings to more quickly write out the filename function parameter

### Reading From Config File

//in your player controller class
void AVictoryController::VictoryConfigGetTests()
{
	//Basic Syntax
	/\*
	bool GetString( 
		const TCHAR\* Section, 
		const TCHAR\* Key, 
		FString& Value, 
		const FString& Filename 
	);
	\*/
 
	if(!GConfig) return;
	//~~
 
	//Retrieve Default Game Type
	FString ValueReceived;
	GConfig\-\>GetString(
		TEXT("/Script/Engine.WorldInfo"),
		TEXT("GlobalDefaultGameType"),
		ValueReceived,
		GGameIni
	);
 
	ClientMessage("GlobalDefaultGameType");
	ClientMessage(ValueReceived);
 
        //Retrieve Max Objects not considered by GC
	int32 IntValueReceived \= 0;
	GConfig\-\>GetInt(
		TEXT("Core.System"),
		TEXT("MaxObjectsNotConsideredByGC"),
		IntValueReceived,
		GEngineIni
	);
 
	ClientMessage("MaxObjectsNotConsideredByGC");
	ClientMessage(FString::FromInt(IntValueReceived));
 
         //Retrieve Near Clip Plane (how close things can get to camera)
	float floatValueReceived \= 0;
	GConfig\-\>GetFloat(
		TEXT("/Script/Engine.Engine"),
		TEXT("NearClipPlane"),
		floatValueReceived,
		GEngineIni
	);
 
	ClientMessage("NearClipPlane");
	ClientMessage(FString::SanitizeFloat(floatValueReceived));
}

### Writing to Config File

//write to existing Game.ini
//the results get stored in YourGameDir\\Saved\\Config\\Windows
void AVictoryController::VictoryConfigSetTests()
{
	if(!GConfig) return;
	//~~
 
	//New Section to Add
	FString VictorySection \= "Victory.Core";
 
	//String
	GConfig\-\>SetString (
		\*VictorySection,
		TEXT("RootDir"),
		TEXT("E:\\UE4\\IsAwesome"),
		GGameIni
	);
 
	//FColor
	GConfig\-\>SetColor (
		\*VictorySection,
		TEXT("Red"),
		FColor(255,0,0,255),
		GGameIni
	);
 
	//FVector
	GConfig\-\>SetVector (
		\*VictorySection,
		TEXT("PlayerStartLocation"),
		FVector(0,0,512),
		GGameIni
	);
 
	//FRotator
	GConfig\-\>SetRotator (
		\*VictorySection,
		TEXT("SunRotation"),
		FRotator(\-90,0,0),
		GGameIni
	);
 
	//ConfigCacheIni.h
	//void Flush( bool Read, const FString& Filename=TEXT("") );
	GConfig\-\>Flush(false,GGameIni);
}

Of Great Importance
-------------------

This line is very important

GConfig\-\>Flush(false,GGameIni);

Sometimes the config file wont save changes if you don't call this function after you've set all your config keys.

Many thanks to Solid Snake for telling me about this, I might have spent an hour or two trying to figure out why my config file was only saving sometimes!

Conclusion
----------

Now you know how to retrieve or edit any config file you want!

**And you can even add new sections to existing config files!**

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Config\_Files,\_Read\_%26\_Write\_to\_Config\_Files&oldid=8249](https://wiki.unrealengine.com/index.php?title=Config_Files,_Read_%26_Write_to_Config_Files&oldid=8249)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")