C++ Mutator Tutorial - Epic Wiki                    

C++ Mutator Tutorial
====================

Contents
--------

*   [1 C++ Mutator Tutorial](#C.2B.2B_Mutator_Tutorial)
    *   [1.1 Requirements](#Requirements)
    *   [1.2 Directory Structure](#Directory_Structure)
    *   [1.3 UPlugin File](#UPlugin_File)
    *   [1.4 Build.cs File](#Build.cs_File)
    *   [1.5 Header File](#Header_File)
    *   [1.6 Plugin Module Interface](#Plugin_Module_Interface)
    *   [1.7 The Mutator](#The_Mutator)
    *   [1.8 Building your Mutator](#Building_your_Mutator)
    *   [1.9 Testing your Mutator](#Testing_your_Mutator)

C++ Mutator Tutorial
====================

This tutorial will teach you how to make a simple mutator for UT using C++. We'll be making a UE4 plugin that defines a child class of AUTMutator.

Requirements
------------

*   Engine version: 4.3
*   Skill level: intermediate C++ knowledge

Directory Structure
-------------------

*   If UnrealTournament\\Plugins does not already exist, create it
*   Create a directory inside of UnrealTournament\\Plugins to hold our mutator, in this case it would be "SampleMutator"
*   Create a "Source" directory inside of the SampleMutator directory
*   Create a "SampleMutator" directory inside of the "Source" directory
*   Finally create a "Public" directory and a "Private" directory inside of the last "SampleMutator" directory that we made

UPlugin File
------------

*   We need to create SampleMutator.uplugin to let UE4 know we have a plugin it should load.
*   On Windows, one way to do this is to create a new text file and rename the file extension to .uplugin. Copying an existing .uplugin file and editing it may not work!
*   It should live at the same level that the Source directory does

**SampleMutator.uplugin** - Plugin defintion

{
	"FileVersion" : 3,
 
	"FriendlyName" : "Sample Mutator",
	"Version" : 1,
	"VersionName" : "1.0",
	"CreatedBy" : "Epic Games, Inc.",
	"CreatedByURL" : "http://epicgames.com",
	"EngineVersion" : "4.3.0",
	"Description" : "Sample Mutator",
	"Category" : "UnrealTournament.Mutator",
	"EnabledByDefault" : false,
 
	"Modules" :
	\[
		{
			"Name" : "SampleMutator",
			"Type" : "Runtime",
			"WhitelistPlatforms" : \[ "Win32", "Win64" \]
		}
	\]
}

Build.cs File
-------------

*   We need to create SampleMutator.Build.cs so that Unreal Build tool knows how to generate our dll file
*   It should live at the same level that the Public and Private directories do
*   We'll use the PrivateIncludesPaths array to make #include cleaner throughout our source files

**SampleMutator.Build.cs** - Unreal Build Tool definitions

namespace UnrealBuildTool.Rules
{
	public class SampleMutator : ModuleRules
	{
		public SampleMutator(TargetInfo Target)
        	{
            		PrivateIncludePaths.Add("SampleMutator/Private");
 
			PublicDependencyModuleNames.AddRange(
				new string\[\]
				{
					"Core",
					"CoreUObject",
                    			"Engine",
                    			"UnrealTournament",
				}
				);
		}
	}
}

Header File
-----------

*   Unreal Build Tool requires that we have a shared header file as the first include in every cpp source file in the plugin.
*   We'll put the SampleMutator.h header file inside of the Private directory
*   We need to #include Core.h, Engine.h and UTMutator.h to have enough defintions to make a child class from AUTMutator
    1.  include "SampleMutator.generated.h" is required by Unreal Header Tool
*   We're only overriding CheckRelevance\_Implemenation in this example, but more powerful mutators will overload more of the functions exposed by AUTMutator

**SampleMutator.h** - Sample Mutator class definition

#pragma once
 
#include "Core.h"
#include "Engine.h"
#include "UTMutator.h"
#include "UTWeapon.h"
 
#include "SampleMutator.generated.h"
 
UCLASS(Blueprintable, Meta \= (ChildCanTick))
class ASampleMutator : public AUTMutator
{
	GENERATED\_UCLASS\_BODY()
 
	bool CheckRelevance\_Implementation(AActor\* Other) OVERRIDE;
 
 
	UPROPERTY()
	TSubclassOf<AUTWeapon\> RocketLauncherClass;
};

Plugin Module Interface
-----------------------

*   Create SampleMutatorPlugin.cpp inside of the Public directory
*   There's not much interesting in this file, it just provides UE4 a way to load this mutator as a plugin so I'm going to gloss over this file
*   Note that SampleMutator.h must be the first #include and the IMPLEMENT\_MODULE macro does all the heavy lifting

**SampleMutatorPlugin.cpp** - Plugin Module Interface

#include "SampleMutator.h"
 
#include "Core.h"
#include "Engine.h"
#include "ModuleManager.h"
#include "ModuleInterface.h"
 
class FSampleMutatorPlugin : public IModuleInterface
{
	/\*\* IModuleInterface implementation \*/
	virtual void StartupModule() override;
	virtual void ShutdownModule() override;
};
 
IMPLEMENT\_MODULE( FSampleMutatorPlugin, SampleMutator )
 
void FSampleMutatorPlugin::StartupModule()
{
 
}
 
 
void FSampleMutatorPlugin::ShutdownModule()
{
 
}

The Mutator
-----------

*   This sample is going to replace all weapon pickups with Rocket Launcher pickups
    *   We'll accomplish that by overriding the CheckRelevance\_Implementation function and watching for AUTPickupWeapon
    *   When we find a AUTPickupWeapon, we'll replace its WeaponType reference with a reference to BP\_RocketLauncher\_C
*   Our mutator is going to live in SampleMutator.cpp inside the Public directory
*   Note that once again SampleMutator.h has to be the first #include
*   Our constructor is blank, but feel free to put initialization code in there in a future plugin
*   StaticLoadClass is used to get the reference to Blueprint'/Game/RestrictedAssets/Weapons/RocketLauncher/BP\_RocketLauncher.BP\_RocketLauncher\_C'
    *   The use of a hardcoded reference here is very brittle and not considered good design, a mutator that requires direct blueprint references might be more easily implemented in blueprints
*   Calling Super::CheckRelevance\_Implementation(Other) is highly recommended as failing to do so won't call other mutators in the mutator list

**SampleMutator.cpp** - Replace all weapon pickups with rocket launcher pickups

#include "SampleMutator.h"
 
#include "UTPickupWeapon.h"
 
ASampleMutator::ASampleMutator(const FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
}
 
bool ASampleMutator::CheckRelevance\_Implementation(AActor\* Other)
{
	// Find the rocket launcher blueprint
	if (RocketLauncherClass \== nullptr)
	{
		RocketLauncherClass \= StaticLoadClass(AUTWeapon::StaticClass(), nullptr, TEXT("Blueprint'/Game/RestrictedAssets/Weapons/RocketLauncher/BP\_RocketLauncher.BP\_RocketLauncher\_C'"));
	}
 
	// If a weapon pickup has a current weapon type, replace it with the rocket launcher
	AUTPickupWeapon \*PickupWeapon \= Cast<AUTPickupWeapon\>(Other);
	if (PickupWeapon)
	{
		if (PickupWeapon\-\>WeaponType !\= nullptr)
		{
			PickupWeapon\-\>WeaponType \= RocketLauncherClass;
		}
	}
 
	return Super::CheckRelevance\_Implementation(Other);
}

Building your Mutator
---------------------

*   Right click your UnrealTournament.uproject in Window Explorer and select "Generate Visual Studio project files"
*   Open up the Unreal Tournament solution file in Visual Studio
*   Build the Unreal Tournament project in Development Editor configuration
*   You will notice that in addition to UE4Editor-UnrealTournament.dll, UnrealTournament\\Plugins\\SampleMutator\\Binaries\\Win64\\UE4Editor-SampleMutator.dll was generated

Testing your Mutator
--------------------

*   Run from a commandline "UE4Editor.exe UnrealTournament -game Example\_Map?mutator=SampleMutator.SampleMutator"
*   You should notice that the weapon pickups in the map have been replaced by Rocket Launchers

Retrieved from "[https://wiki.unrealengine.com/index.php?title=C%2B%2B\_Mutator\_Tutorial&oldid=15713](https://wiki.unrealengine.com/index.php?title=C%2B%2B_Mutator_Tutorial&oldid=15713)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")

  ![](https://tracking.unrealengine.com/track.png)