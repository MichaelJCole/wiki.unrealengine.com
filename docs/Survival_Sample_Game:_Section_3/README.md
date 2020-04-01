 Survival Sample Game: Section 3 - Epic Wiki             

 

Survival Sample Game: Section 3
===============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

**This section is part of the Survival Game project. You may first want to visit the [project main page](https://wiki.unrealengine.com/Survival_sample_game) for a section overview and recommended documentation.**

**The latest [source is available for download](https://github.com/tomlooman/EpicSurvivalGameSeries) through GitHub!**

**If you have any questions, you can ask them in the [official forum thread official forum thread](https://forums.unrealengine.com/showthread.php?63678-Upcoming-C-Gameplay-Example-Series-Making-a-Survival-Game).**

Contents
--------

*   [1 Introduction](#Introduction)
    *   [1.1 What is a Blackboard?](#What_is_a_Blackboard.3F)
    *   [1.2 What is a Behavior Tree?](#What_is_a_Behavior_Tree.3F)
    *   [1.3 PawnSensing](#PawnSensing)
        *   [1.3.1 Seeing](#Seeing)
        *   [1.3.2 Hearing](#Hearing)
*   [2 The Structural Layout of the Zombie AI](#The_Structural_Layout_of_the_Zombie_AI)
    *   [2.1 SZombieAIController](#SZombieAIController)
    *   [2.2 SZombieCharacter](#SZombieCharacter)
    *   [2.3 Behavior Tree](#Behavior_Tree)
    *   [2.4 Blackboard](#Blackboard)
*   [3 Setting up the senses in C++](#Setting_up_the_senses_in_C.2B.2B)
*   [4 Setting up the AI Controller](#Setting_up_the_AI_Controller)
    *   [4.1 Initializing Blackboard & Behavior Tree](#Initializing_Blackboard_.26_Behavior_Tree)
    *   [4.2 Updating Blackboard data](#Updating_Blackboard_data)
*   [5 Breaking down the Behavior Tree](#Breaking_down_the_Behavior_Tree)
    *   [5.1 Chasing the player](#Chasing_the_player)
    *   [5.2 Wandering the map](#Wandering_the_map)
*   [6 Notes](#Notes)
*   [7 Closing](#Closing)

Introduction
============

In section three we introduce the first features for our enemy AI. It can sense a player with both vision (using line of sight checks) and by sensing noise made through footsteps and gun shots. The AI is set up using C++ and a Behavior Tree including a custom Behavior Tree task in C++ to find an appropriate waypoint to wander around the level.

<youtube>[https://www.youtube.com/watch?v=27XFykjd8Ns](https://www.youtube.com/watch?v=27XFykjd8Ns)</youtube>

For a step-by-step tutorial on setting up Behavior Trees to follow a sensed player (using Blueprint) see [Behavior Tree Quick Start Guide](https://docs.unrealengine.com/latest/INT/Engine/AI/BehaviorTrees/QuickStart/index.html)

This section will go into the C++ concepts of dealing with PawnSensing, Blackboards and Behavior Trees in Unreal Engine 4.

[![Survival section3 overview01.jpg](https://d26ilriwvtzlb.cloudfront.net/c/cf/Survival_section3_overview01.jpg)](/index.php?title=File:Survival_section3_overview01.jpg)

What is a Blackboard?
---------------------

A blackboard is a data container for the Behavior Tree to use for decision making. A few examples of Blackboard data are TargetLocation, NextWaypoint, TargetPlayer and NeedAmmo.

What is a Behavior Tree?
------------------------

A Behavior Tree holds the logical tree to drive motion and decisions for a bot. It can be used to search for ammo, follow a player or hide from the player in case hitpoints are low or the bot has no ammo available. It requires a Blackboard to retrieve and store data.

PawnSensing
-----------

[![Survival section3 pawnsensing01.jpg](https://d26ilriwvtzlb.cloudfront.net/9/99/Survival_section3_pawnsensing01.jpg)](/index.php?title=File:Survival_section3_pawnsensing01.jpg)

UPawnSensingComponent will give eyes and ears to AI bots. For noise sensing an additional UPawnNoiseEmitterComponent is required on our AI character.

### Seeing

PawnSensing supports line of sight checks to sense other pawns. There are a couple of variables to tweak including peripheral-vision angle and sight radius. By default only players are sensed, so we don't need to filter out AI controlled enemies when updating our target to follow.

### Hearing

PawnSensing supports hearing of other pawns. This has nothing to do with the actual audio playback in the game, but is a separate system that uses UPawnNoiseEmitterComponent and calls to MakeNoise(...) to trigger events related to noise (eg. footsteps or loud gun noises)

For the AI of this project we implemented footsteps and gun sounds that both call MakeNoise(...). To trigger footstep noise at the appropriate moments of the animation we need a custom [AnimNotify](https://docs.unrealengine.com/latest/INT/Engine/Animation/Sequences/Notifies/index.html) as seen below.

The top (yellow) notifies are custom notifies that we bind to our C++ code in the Animation Blueprint to add calls for MakeNoise and to keep track of the last moment a noise was made (to visualize noise in the HUD)

[![Survival section3 animbp animnotify.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3b/Survival_section3_animbp_animnotify.jpg)](/index.php?title=File:Survival_section3_animbp_animnotify.jpg)

[![Survival section3 animbp noiseevents.jpg](https://d26ilriwvtzlb.cloudfront.net/d/d8/Survival_section3_animbp_noiseevents.jpg)](/index.php?title=File:Survival_section3_animbp_noiseevents.jpg)

The Structural Layout of the Zombie AI
======================================

There are many ways of setting up your AI class structure, I will briefly go over the one used in this project to make it easier to dig into the code and follow along with this guide.

SZombieAIController
-------------------

The AI Controller possesses an AI Character and holds the components for the Blackboard and Behavior Tree. It's the access point to update and retrieve Blackboard data in C++.

SZombieCharacter
----------------

Has the components for pawn and noise sensing. Updates Blackboard data through its AI Controller. Contains a Behavior Tree asset that is initialized by the AI Controller on spawn/initialization.

Behavior Tree
-------------

Referenced by the AI Character class. Initialized by the AI Controller.

Blackboard
----------

The blackboard is referenced by the Behavior Tree asset.

Setting up the senses in C++
============================

To set up our senses in C++ we need a **UPawnSensingComponent** in the AI character class.

To react to sense events from this component we bind our delegates (functions that can be hooked to other classes to trigger events, much like you do with binding of mouse and key input to functions in C++) during BeginPlay.

void ASZombieCharacter::BeginPlay()
{
	Super::BeginPlay();

	/\* This is the earliest moment we can bind our delegates to the component \*/
	if (PawnSensingComp)
	{
		PawnSensingComp\->OnSeePawn.AddDynamic(this, &ASZombieCharacter::OnSeePlayer);
		PawnSensingComp\->OnHearNoise.AddDynamic(this, &ASZombieCharacter::OnHearNoise);
	}
}

When either of these functions are called, they will update the Blackboard with a new move-to target (the sensed player character) through the AI Controller of the AI Character instance.

Do note that to support hearing the AI requires a **UPawnNoiseEmitterComponent** to receive data from any MakeNoise(...) calls other Pawns may produce. (We add this component in SBaseCharacter.h class)

Setting up the AI Controller
============================

The AI Controller contains the components for Blackboard and Behavior Trees (Although note that the behavior tree itself resides in the AI Character so we may re-use the same AIController class with different bot behaviors) It is the gateway to update data to the Blackboard and runs any available Behavior Tree that was provided by the AI Character it possesses.

Initializing Blackboard & Behavior Tree
---------------------------------------

Whenever a bot is initialized or respawned it will be possessed by an AI Controller. This is the moment to initialize the Blackboard and run the Behavior Tree to start the bot decision making.

void ASZombieAIController::Possess(class APawn\* InPawn)
{
	Super::Possess(InPawn);

	ASZombieCharacter\* ZombieBot \= Cast<ASZombieCharacter\>(InPawn);
	if (ZombieBot)
	{
		if (ZombieBot\->BehaviorTree\->BlackboardAsset)
		{
			BlackboardComp\->InitializeBlackboard(\*ZombieBot\->BehaviorTree\->BlackboardAsset);

			/\* Make sure the Blackboard has the type of bot we possessed \*/
			BlackboardComp\->SetValueAsEnum(BotTypeKeyName, (uint8)ZombieBot\->BotType);
		}

		BehaviorComp\->StartTree(\*ZombieBot\->BehaviorTree);
	}
}

Updating Blackboard data
------------------------

When new sense data is available it must be updated in the Blackboard for the Behavior Tree to use. For this we need the KeyName (eg. "TargetLocation" as specified in the Blackboard asset) and the Blackboard Component. Below is one example of how we can push this data into the Blackboard.

void ASZombieAIController::SetTargetEnemy(APawn\* NewTarget)
{
	if (BlackboardComp)
	{
		BlackboardComp\->SetValueAsObject(TargetEnemyKeyName, NewTarget);
	}
}

Breaking down the Behavior Tree
===============================

[![Survival section3 bt03.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3f/Survival_section3_bt03.jpg)](/index.php?title=File:Survival_section3_bt03.jpg)

The Behavior Tree steers the decisions and motion of our AI bot. These decisions are based on the available data in the Blackboard asset.

Chasing the player
------------------

[![Survival section3 chasingplayer.jpg](https://d26ilriwvtzlb.cloudfront.net/0/0e/Survival_section3_chasingplayer.jpg)](/index.php?title=File:Survival_section3_chasingplayer.jpg)

Whenever a player is sensed and the TargetEnemy is updated by the bot class in C++ we will successfully pass "Has Sensed Enemy" and move to "Has Target Location" which is set by the same AI Character C++ class. That should succeed and move into "Move to Sensed Player" to finally move to the TargetLocation.

"Has Sensed Player" has "Aborts Lower Priority" set up so we can immediately cancel our any other running behaviors when this value changes. This is used in this particular tree to cancel the patrol/wandering behavior on the right side of the tree.

Wandering the map
-----------------

[![Survival section3 waypoints01.jpg](https://d26ilriwvtzlb.cloudfront.net/9/9c/Survival_section3_waypoints01.jpg)](/index.php?title=File:Survival_section3_waypoints01.jpg)

By default the bot is set to Passive (this is a custom Enum we created in STypes.h), this completely disables the wander/patrol part of this blackboard through the conditional "Should Wander" check in the tree.

When enabled it will try to locate a Waypoint object in the level through the "Find Bot Waypoint" task. This is a custom task we created in C++ to search for objects on the map of the SBotWaypoint type. When the "Has a Waypoint" succeeds we will continue with another custom task that finds a position on the navigation mesh nearby the Waypoint object we found previously. And finally we "Move to Waypoint".

Both "Find X" tasks in the tree update the blackboard with new data for the other nodes to use (in this case CurrentWaypoint and PatrolLocation are updated by these tasks)

This flow will be cancelled as soon as "Has Sensed Enemy" is successful so sensing an enemy takes priority over wandering around the map.

Notes
=====

*   To work with the AI features of the engine we must include the **"AIModule" in SurvivalGame.Build.cs**, please don't forget this module if you're re-creating any of these features for your own project.
*   We have several physically simulated barriers in our level, this requires a dynamic Navigation Mesh. To set this up in your own project go to **Edit > Project Settings > Navigation Mesh** and enable "Rebuild at runtime".
*   When using bots any level must include an encapsulating **Nav Mesh Bounds Volume** (under Modes > Volumes, see image)

[![Navmeshcreation.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a9/Navmeshcreation.jpg)](/index.php?title=File:Navmeshcreation.jpg)

Closing
=======

In this section we've added the basic follow and patrol features for our zombie AI. In upcoming sections we will continue to expand the enemy by attacking an attack ability etc. If you are confused on a particular feature or piece of code, feel free to ask about it in the [official section 3 thread](https://forums.unrealengine.com/showthread.php?67859-Announcing-Section-3-for-Survival-Game) for this project.

**[Previous Section (Weapons, Death & Inventory)](/index.php?title=Survival_Sample_Game:_Section_2 "Survival Sample Game: Section 2") - [Main Project Page](/index.php?title=Survival_sample_game "Survival sample game") - [Next Section (Dynamic Time of Day & Game loop)](/index.php?title=Survival_Sample_Game:_Section_4 "Survival Sample Game: Section 4")**

*   [Main Forum Thread](https://forums.unrealengine.com/showthread.php?63678-Upcoming-C-Gameplay-Example-Series-Making-a-Survival-Game)
*   [Source on GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Survival\_Sample\_Game:\_Section\_3&oldid=297](https://wiki.unrealengine.com/index.php?title=Survival_Sample_Game:_Section_3&oldid=297)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")