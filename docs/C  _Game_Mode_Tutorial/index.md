C++ Game Mode Tutorial - Epic Wiki              

C++ Game Mode Tutorial
======================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 C++ Game Mode Tutorial](#C.2B.2B_Game_Mode_Tutorial)
    *   [1.1 Requirements](#Requirements)
    *   [1.2 Directory Structure](#Directory_Structure)
    *   [1.3 UPlugin File](#UPlugin_File)
    *   [1.4 Build.cs File](#Build.cs_File)
    *   [1.5 Header File](#Header_File)
    *   [1.6 Plugin Module Interface](#Plugin_Module_Interface)
    *   [1.7 The Game Mode (C++)](#The_Game_Mode_.28C.2B.2B.29)
    *   [1.8 Editor Setup](#Editor_Setup)
    *   [1.9 Mutator Blueprint](#Mutator_Blueprint)
    *   [1.10 Game Mode Blueprint](#Game_Mode_Blueprint)
    *   [1.11 Testing](#Testing)

C++ Game Mode Tutorial
======================

This tutorial will teach you how to make a simple Gun Game mode for UT using C++. We'll be making a UE4 plugin that defines a child class of AUTGameMode. I recommend reading the [C++ Mutator Tutorial](/C%2B%2B_Mutator_Tutorial "C++ Mutator Tutorial"), [Blueprint\_Mutator\_Tutorial\_-\_Instagib](/Blueprint_Mutator_Tutorial_-_Instagib "Blueprint Mutator Tutorial - Instagib") and [Blueprint\_Mutator\_Tutorial\_-\_Low\_Grav](/Blueprint_Mutator_Tutorial_-_Low_Grav "Blueprint Mutator Tutorial - Low Grav") first. I will be glossing over things covered in depth in other tutorials.

Requirements
------------

*   Engine version: 4.3
*   Skill level: intermediate C++ and blueprint knowledge

Directory Structure
-------------------

*   If UnrealTournament\\Plugins does not already exist, create it
*   Create a directory inside of UnrealTournament\\Plugins to hold our game mode, in this case it would be "SampleGameMode"
*   Create "Source" and "Content" directories inside of the SampleGameMode directory
*   Create a "Public" directory and a "Private" directory inside of the last "SampleGameMode" directory that we made

UPlugin File
------------

*   We need to create SampleGameMode.uplugin to let UE4 know we have a plugin it should load
*   It should live at the same level that the Source directory does
*   The key difference between this .uplugin and the one in the mutator sample is that EnabledByDefault and CanContainContent are set

**SampleGameMode.uplugin** - Plugin defintion

1.  {
    
2.  	"FileVersion" : 3,
    

4.  	"FriendlyName" : "Sample Game Mode",
    
5.  	"Version" : 1,
    
6.  	"VersionName" : "1.0",
    
7.  	"CreatedBy" : "Epic Games, Inc.",
    
8.  	"CreatedByURL" : "http://epicgames.com",
    
9.  	"EngineVersion" : "4.3.0",
    
10.  	"Description" : "Sample Game Mode",
    
11.  	"Category" : "UnrealTournament.GameMode",
    
12.  	"EnabledByDefault" : true,
    
13.  	"CanContainContent" : true,
    

15.  	"Modules" :
    
16.  	\[
    
17.  		{
    
18.  			"Name" : "SampleGameMode",
    
19.  			"Type" : "Runtime",
    
20.  			"WhitelistPlatforms" : \[ "Win32", "Win64" \]
    
21.  		}
    
22.  	\]
    
23.  }
    

Build.cs File
-------------

*   We need to create SampleGameMode.Build.cs so that Unreal Build tool knows how to generate our dll file
*   It should live at the same level that the Public and Private directories do
*   We'll use the PrivateIncludesPaths array to make #include cleaner throughout our source files

**SampleGameMode.Build.cs** - Unreal Build Tool definitions

1.  namespace UnrealBuildTool.Rules
    
2.  {
    
3.  	public class SampleGameMode : ModuleRules
    
4.  	{
    
5.  		public SampleGameMode(TargetInfo Target)
    
6.  		{
    
7.  			PrivateIncludePaths.Add("SampleGameMode/Private");
    

9.  			PublicDependencyModuleNames.AddRange(
    
10.  				new string\[\]
    
11.  				{
    
12.  					"Core",
    
13.  					"CoreUObject",
    
14.  					"Engine",
    
15.  					"UnrealTournament",
    
16.  				}
    
17.  				);
    
18.  		}
    
19.  	}
    
20.  }
    

Header File
-----------

*   Unreal Build Tool requires that we have a shared header file as the first include in every cpp source file in the plugin.
*   We'll put the SampleGameMode.h header file inside of the Public directory
    1.  include "SampleGameMode.generated.h" is required by Unreal Header Tool
*   Our header is a bit more complex than the mutator one. We've defined two custom structs that we've made BlueprintType so they'll be visible when we're in the editor.
*   You'll notice that each of the structs is just a TArray and their usage in the ASampleGameMode is just a TArray. UE4 does not currently support TArrays of TArrays so we work around that by housing the inner array inside of a structure.
*   We've exposed the StartingInventories and ScoringDamageTypes TArrays to blueprints so they can be filled with content references later. In order for the editor to see them, we made them UPROPERTYs with BlueprintReadWrite markup

**SampleGameMode.h** - Sample Mutator class definition

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    
2.  #pragma once
    

4.  #include "Core.h"
    
5.  #include "Engine.h"
    
6.  #include "UTWeapon.h"
    
7.  #include "UTGameMode.h"
    

9.  #include "SampleGameMode.generated.h"
    

11.  USTRUCT(BlueprintType)
    
12.  struct FStartingInventory
    
13.  {
    
14.  	GENERATED\_USTRUCT\_BODY()
    

16.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="GameMode")
    
17.  	TArray<TSubclassOf<AUTInventory\>> Inventory;
    
18.  };
    

20.  USTRUCT(BlueprintType)
    
21.  struct FDamageTypeToProgess
    
22.  {
    
23.  	GENERATED\_USTRUCT\_BODY()
    

25.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "GameMode")
    
26.  	TArray<TSubclassOf<UDamageType\>> DamageType;
    
27.  };
    

29.  UCLASS(Blueprintable, Meta \= (ChildCanTick))
    
30.  class ASampleGameMode : public AUTGameMode
    
31.  {
    
32.  	GENERATED\_UCLASS\_BODY()
    

34.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="GameMode")
    
35.  	TArray<FStartingInventory\> StartingInventories;
    

37.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "GameMode")
    
38.  	TArray<FDamageTypeToProgess\> ScoringDamageTypes;
    

40.  	virtual void GiveDefaultInventory(APawn\* PlayerPawn) override;
    
41.  	virtual void ScoreKill(AController\* Killer, AController\* Other, TSubclassOf<UDamageType\> DamageType) override;
    
42.  	virtual void GiveNewGun(AUTCharacter \*UTCharacter);
    
43.  };
    

Plugin Module Interface
-----------------------

*   Very similar to the mutator sample here, just some name changes

**SampleGameModePlugin.cpp** - Plugin Module Interface

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    

3.  #include "SampleGameMode.h"
    

5.  #include "Core.h"
    
6.  #include "Engine.h"
    
7.  #include "ModuleManager.h"
    
8.  #include "ModuleInterface.h"
    

10.  class FSampleGameModePlugin : public IModuleInterface
    
11.  {
    
12.  	/\*\* IModuleInterface implementation \*/
    
13.  	virtual void StartupModule() override;
    
14.  	virtual void ShutdownModule() override;
    
15.  };
    

17.  IMPLEMENT\_MODULE( FSampleGameModePlugin, SampleGameMode )
    

19.  void FSampleGameModePlugin::StartupModule()
    
20.  {
    

22.  }
    

25.  void FSampleGameModePlugin::ShutdownModule()
    
26.  {
    

28.  }
    

The Game Mode (C++)
-------------------

*   Our aim with this tutorial is to make a game mode that functions like "Gun Game", you start with a weapon according to your score and going up in score gives you the next gun in the sequence. Pickups are disabled and so are weapon drops.
*   We'll use C++ to handle giving players the right guns on spawn and giving them the right guns after scoring.
*   We'll use Blueprints to handle disabling weapon drops and pickups.
*   Blueprints will also be used to get content references to weapons and damagetypes as hard coding them in C++ can be brittle.
*   ASampleGameMode::GiveDefaultInventory reads the content reference from StartingInventories that we'll set later in blueprints and spawns that inventory for the spawning player
*   ASampleGameMode::ScoreKill verifies that the killing damage type is equal to the content reference from ScoringDamageTypes and then calls GiveNewGun on the killer
*   ASampleGameMode::GiveNewGun will discard the character's current inventory and give them the proper gun by reading a content reference from StartingInventories

**SampleGameModePlugin.cpp** - Plugin Module Interface

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    

3.  #include "SampleGameMode.h"
    

5.  ASampleGameMode::ASampleGameMode(const FPostConstructInitializeProperties& PCIP)
    
6.  	: Super(PCIP)
    
7.  {
    
8.  }
    

10.  void ASampleGameMode::GiveDefaultInventory(APawn\* PlayerPawn)
    
11.  {
    
12.  	// Don't call Super
    

14.  	AUTCharacter\* UTCharacter \= Cast<AUTCharacter\>(PlayerPawn);
    
15.  	if (UTCharacter !\= nullptr && UTCharacter\-\>GetInventory() \== nullptr)
    
16.  	{
    
17.  		int32 InventoryIndex \= PlayerPawn\-\>PlayerState\-\>Score;
    
18.  		if (InventoryIndex \>= StartingInventories.Num())
    
19.  		{
    
20.  			InventoryIndex \= StartingInventories.Num() \- 1;
    
21.  		}
    

23.  		if (StartingInventories.IsValidIndex(InventoryIndex))
    
24.  		{
    
25.  			for (int32 i \= 0; i < StartingInventories\[InventoryIndex\].Inventory.Num(); i++)
    
26.  			{
    
27.  				if (StartingInventories\[InventoryIndex\].Inventory\[i\] !\= nullptr)
    
28.  				{
    
29.  					UTCharacter\-\>AddInventory(GetWorld()\-\>SpawnActor<AUTInventory\>(StartingInventories\[InventoryIndex\].Inventory\[i\], FVector(0.0f), FRotator(0, 0, 0)), true);
    
30.  				}
    
31.  			}
    
32.  		}
    
33.  	}
    
34.  }
    

36.  void ASampleGameMode::ScoreKill(AController\* Killer, AController\* Other, TSubclassOf<UDamageType\> DamageType)
    
37.  {
    
38.  	// Just a suicide, pass it through
    
39.  	if (Killer \== Other || Killer \== nullptr)
    
40.  	{
    
41.  		Super::ScoreKill(Killer, Other, DamageType);
    
42.  		return;
    
43.  	}
    

45.  	APlayerState\* KillerPlayerState \= Killer\-\>PlayerState;
    
46.  	if (KillerPlayerState)
    
47.  	{
    
48.  		int32 DamageIndex \= KillerPlayerState\-\>Score;
    
49.  		if (DamageIndex \>= ScoringDamageTypes.Num())
    
50.  		{
    
51.  			DamageIndex \= ScoringDamageTypes.Num() \- 1;
    
52.  		}
    

54.  		for (int32 i \= 0; i < ScoringDamageTypes\[DamageIndex\].DamageType.Num(); i++)
    
55.  		{
    
56.  			if (DamageType \== ScoringDamageTypes\[DamageIndex\].DamageType\[i\])
    
57.  			{
    
58.  				Super::ScoreKill(Killer, Other, DamageType);
    

60.  				// If we changed score, give player a new gun
    
61.  				if (DamageIndex !\= KillerPlayerState\-\>Score)
    
62.  				{
    
63.  					AUTCharacter\* UTCharacter \= Cast<AUTCharacter\>(Killer\-\>GetPawn());
    
64.  					if (UTCharacter !\= nullptr)
    
65.  					{
    
66.  						GiveNewGun(UTCharacter);
    
67.  					}
    
68.  				}
    

70.  				break;
    
71.  			}
    
72.  		}
    
73.  	}
    
74.  }
    

76.  void ASampleGameMode::GiveNewGun(AUTCharacter \*UTCharacter)
    
77.  {
    
78.  	UTCharacter\-\>DiscardAllInventory();
    

80.  	int32 InventoryIndex \= UTCharacter\-\>PlayerState\-\>Score;
    
81.  	if (InventoryIndex \>= StartingInventories.Num())
    
82.  	{
    
83.  		InventoryIndex \= StartingInventories.Num() \- 1;
    
84.  	}
    

86.  	if (StartingInventories.IsValidIndex(InventoryIndex))
    
87.  	{
    
88.  		for (int32 i \= 0; i < StartingInventories\[InventoryIndex\].Inventory.Num(); i++)
    
89.  		{
    
90.  			if (StartingInventories\[InventoryIndex\].Inventory\[i\] !\= nullptr)
    
91.  			{
    
92.  				UTCharacter\-\>AddInventory(GetWorld()\-\>SpawnActor<AUTInventory\>(StartingInventories\[InventoryIndex\].Inventory\[i\], FVector(0.0f), FRotator(0, 0, 0)), true);
    
93.  			}
    
94.  		}
    
95.  	}
    
96.  }
    

Editor Setup
------------

*   You'll need to enable "Show Plugin Content" in the Content Browser's "View Options" menu

[![Gamemodetutorial viewplugincontent.png](https://d26ilriwvtzlb.cloudfront.net/b/b6/Gamemodetutorial_viewplugincontent.png)](/File:Gamemodetutorial_viewplugincontent.png)

*   Inside the SampleGameMode folder, make two new blueprints: BP\_SampleGameBuiltinMutator with parent UTMutator and BP\_SampleGameMode with parent SampleGameMode. Make sure to check out [Blueprint\_Mutator\_Tutorial\_-\_Instagib](/Blueprint_Mutator_Tutorial_-_Instagib "Blueprint Mutator Tutorial - Instagib") and [Blueprint\_Mutator\_Tutorial\_-\_Low\_Grav](/Blueprint_Mutator_Tutorial_-_Low_Grav "Blueprint Mutator Tutorial - Low Grav") for more information on blueprints.

Mutator Blueprint
-----------------

*   We want to use a mutator to destroy all map pickups and all dropped pickups similar to [Blueprint\_Mutator\_Tutorial\_-\_Instagib](/Blueprint_Mutator_Tutorial_-_Instagib "Blueprint Mutator Tutorial - Instagib")
*   We'll override the Check Relevance function as seen below

[![Gamemodetutorial mutator.png](https://d26ilriwvtzlb.cloudfront.net/c/ce/Gamemodetutorial_mutator.png)](/File:Gamemodetutorial_mutator.png)

Game Mode Blueprint
-------------------

*   Open up BP\_SampleGameMode and go to the default properties tab
*   First, we'll set the Built in Mutators array to reference BP\_SampleGameBuiltinMutator

[![Gamemodetutorial builtin.png](https://d26ilriwvtzlb.cloudfront.net/0/09/Gamemodetutorial_builtin.png)](/File:Gamemodetutorial_builtin.png)

*   Next, we'll set the HUD Class to UTHUD\_DM

[![Gamemodetutorial hudclass.png](https://d26ilriwvtzlb.cloudfront.net/3/3c/Gamemodetutorial_hudclass.png)](/File:Gamemodetutorial_hudclass.png)

*   Third, we'll set up the content references to our guns in the StartingInventories array

[![Gamemodetutorial startinginventory.png](https://d26ilriwvtzlb.cloudfront.net/7/71/Gamemodetutorial_startinginventory.png)](/File:Gamemodetutorial_startinginventory.png)

*   Finally, we'll set up the content references to our damage types in the ScoringDamageTypes array

[![Gamemodetutorial damagetypes.png](https://d26ilriwvtzlb.cloudfront.net/a/aa/Gamemodetutorial_damagetypes.png)](/File:Gamemodetutorial_damagetypes.png)

Testing
-------

*   To make typing our command line easier, you should add a game mode alias to DefaultGame.ini
*   Under \[/Script/Engine.GameMode\] put +GameModeClassAliases=(ShortName="Sample",GameClassName="/SampleGameMode/BP\_SampleGameMode.BP\_SampleGameMode\_C")
*   The game type can now be tested by using ?game=sample instead of ?game=/SampleGameMode/BP\_SampleGameMode.BP\_SampleGameMode\_C
*   Make sure to restart the editor after putting that in the ini
*   I prefer to test in PIE by setting the number of clients to 2, but you can also test via commandline by running a server with "ue4editor unrealtournament -game example\_map?game=sample?listen" and a client with "ue4editor unrealtournament -game 127.0.0.1"

Retrieved from "[https://wiki.unrealengine.com/index.php?title=C%2B%2B\_Game\_Mode\_Tutorial&oldid=8473](https://wiki.unrealengine.com/index.php?title=C%2B%2B_Game_Mode_Tutorial&oldid=8473)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [Unreal Tournament Tutorials](/Category:Unreal_Tournament_Tutorials "Category:Unreal Tournament Tutorials")