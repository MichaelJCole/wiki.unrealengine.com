C++ Mutator Tutorial - Epic Wiki              

C++ Mutator Tutorial
====================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

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

*   We need to create SampleMutator.uplugin to let UE4 know we have a plugin it should load
*   It should live at the same level that the Source directory does

**SampleMutator.uplugin** - Plugin defintion

1.  {
    
2.  	"FileVersion" : 3,
    

4.  	"FriendlyName" : "Sample Mutator",
    
5.  	"Version" : 1,
    
6.  	"VersionName" : "1.0",
    
7.  	"CreatedBy" : "Epic Games, Inc.",
    
8.  	"CreatedByURL" : "http://epicgames.com",
    
9.  	"EngineVersion" : "4.3.0",
    
10.  	"Description" : "Sample Mutator",
    
11.  	"Category" : "UnrealTournament.Mutator",
    
12.  	"EnabledByDefault" : false,
    

14.  	"Modules" :
    
15.  	\[
    
16.  		{
    
17.  			"Name" : "SampleMutator",
    
18.  			"Type" : "Runtime",
    
19.  			"WhitelistPlatforms" : \[ "Win32", "Win64" \]
    
20.  		}
    
21.  	\]
    
22.  }
    

Build.cs File
-------------

*   We need to create SampleMutator.Build.cs so that Unreal Build tool knows how to generate our dll file
*   It should live at the same level that the Public and Private directories do
*   We'll use the PrivateIncludesPaths array to make #include cleaner throughout our source files

**SampleMutator.Build.cs** - Unreal Build Tool definitions

1.  namespace UnrealBuildTool.Rules
    
2.  {
    
3.  	public class SampleMutator : ModuleRules
    
4.  	{
    
5.  		public SampleMutator(TargetInfo Target)
    
6.          	{
    
7.              		PrivateIncludePaths.Add("SampleMutator/Private");
    

9.  			PublicDependencyModuleNames.AddRange(
    
10.  				new string\[\]
    
11.  				{
    
12.  					"Core",
    
13.  					"CoreUObject",
    
14.                      			"Engine",
    
15.                      			"UnrealTournament",
    
16.  				}
    
17.  				);
    
18.  		}
    
19.  	}
    
20.  }
    

Header File
-----------

*   Unreal Build Tool requires that we have a shared header file as the first include in every cpp source file in the plugin.
*   We'll put the SampleMutator.h header file inside of the Private directory
*   We need to #include Core.h, Engine.h and UTMutator.h to have enough defintions to make a child class from AUTMutator
    1.  include "SampleMutator.generated.h" is required by Unreal Header Tool
*   We're only overriding CheckRelevance\_Implemenation in this example, but more powerful mutators will overload more of the functions exposed by AUTMutator

**SampleMutator.h** - Sample Mutator class definition

1.  #pragma once
    

3.  #include "Core.h"
    
4.  #include "Engine.h"
    
5.  #include "UTMutator.h"
    

7.  #include "SampleMutator.generated.h"
    

9.  UCLASS(Blueprintable, Meta \= (ChildCanTick))
    
10.  class ASampleMutator : public AUTMutator
    
11.  {
    
12.  	GENERATED\_UCLASS\_BODY()
    

14.  	bool CheckRelevance\_Implementation(AActor\* Other) OVERRIDE;
    
15.  };
    

Plugin Module Interface
-----------------------

*   Create SampleMutatorPlugin.cpp inside of the Public directory
*   There's not much interesting in this file, it just provides UE4 a way to load this mutator as a plugin so I'm going to gloss over this file
*   Note that SampleMutator.h must be the first #include and the IMPLEMENT\_MODULE macro does all the heavy lifting

**SampleMutatorPlugin.cpp** - Plugin Module Interface

1.  #include "SampleMutator.h"
    

3.  #include "Core.h"
    
4.  #include "Engine.h"
    
5.  #include "ModuleManager.h"
    
6.  #include "ModuleInterface.h"
    

8.  class FSampleMutatorPlugin : public IModuleInterface
    
9.  {
    
10.  	/\*\* IModuleInterface implementation \*/
    
11.  	virtual void StartupModule() override;
    
12.  	virtual void ShutdownModule() override;
    
13.  };
    

15.  IMPLEMENT\_MODULE( FSampleMutatorPlugin, SampleMutator )
    

17.  void FSampleMutatorPlugin::StartupModule()
    
18.  {
    

20.  }
    

23.  void FSampleMutatorPlugin::ShutdownModule()
    
24.  {
    

26.  }
    

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

1.  #include "SampleMutator.h"
    

3.  #include "UTPickupWeapon.h"
    

5.  ASampleMutator::ASampleMutator(const FPostConstructInitializeProperties& PCIP)
    
6.  	: Super(PCIP)
    
7.  {
    
8.  }
    

10.  bool ASampleMutator::CheckRelevance\_Implementation(AActor\* Other)
    
11.  {
    
12.  	// Find the rocket launcher blueprint
    
13.  	static UClass\* RocketLauncher \= StaticLoadClass(AUTWeapon::StaticClass(), nullptr, TEXT("Blueprint'/Game/RestrictedAssets/Weapons/RocketLauncher/BP\_RocketLauncher.BP\_RocketLauncher\_C'"));
    

15.  	// If a weapon pickup has a current weapon type, replace it with the rocket launcher
    
16.  	AUTPickupWeapon \*PickupWeapon \= Cast<AUTPickupWeapon\>(Other);
    
17.  	if (PickupWeapon)
    
18.  	{
    
19.  		if (PickupWeapon\-\>WeaponType !\= nullptr)
    
20.  		{
    
21.  			PickupWeapon\-\>WeaponType \= RocketLauncher;
    
22.  		}
    
23.  	}
    

25.  	return Super::CheckRelevance\_Implementation(Other);
    
26.  }
    

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

Retrieved from "[https://wiki.unrealengine.com/index.php?title=C%2B%2B\_Mutator\_Tutorial&oldid=8553](https://wiki.unrealengine.com/index.php?title=C%2B%2B_Mutator_Tutorial&oldid=8553)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [Unreal Tournament Tutorials](/Category:Unreal_Tournament_Tutorials "Category:Unreal Tournament Tutorials")