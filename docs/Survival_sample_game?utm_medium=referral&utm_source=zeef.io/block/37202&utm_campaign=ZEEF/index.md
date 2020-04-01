Survival sample game - Epic Wiki                    

Survival sample game
====================

_C++ Sample project covering common gameplay concepts packed in a small survival game._

**Rate this Tutorial:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (11 votes)

Approved for Versions:4.7

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 Game Premise](#Game_Premise)
*   [3 Before you get started](#Before_you_get_started)
*   [4 Sections Overview](#Sections_Overview)
    *   [4.1 Section 1 - Character Setup](#Section_1_-_Character_Setup)
    *   [4.2 Section 2 - Weapons, Death & Inventory](#Section_2_-_Weapons.2C_Death_.26_Inventory)
    *   [4.3 Section 3 - Zombie AI](#Section_3_-_Zombie_AI)
    *   [4.4 Section 4 - Dynamic Time of Day & Game loop](#Section_4_-_Dynamic_Time_of_Day_.26_Game_loop)
    *   [4.5 Section 5 - Networking](#Section_5_-_Networking)
    *   [4.6 Section 6 - Polish & Review](#Section_6_-_Polish_.26_Review)

Introduction
============

This series focuses on the C++ aspect of Unreal Engine 4. The goal is to introduce a variety of gameplay concepts written in C++, with some Blueprint interaction to get you more comfortable using C++ for your projects by using practical examples instead of relying on theory.

It’s important to note that this series is not a step-by-step tutorial. Instead each two weeks a new section is published, with all source and assets and associated documentation to explain concepts and the “why” behind some of the code. You can leave questions & feedback on the [official forum thread](https://forums.unrealengine.com/showthread.php?63678-Upcoming-C-Gameplay-Example-Series-Making-a-Survival-Game) and I will try to integrate user questions back into the source and documentation for future reference.

[![Section6 coopoverview.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c8/Section6_coopoverview.jpg)](/File:Section6_coopoverview.jpg)

Game Premise
============

_The game is a third person survival game focusing on familiar mechanics from games in this genre._

_You'll have to find a weapon to defend yourself. Food and ammunition are spread throughout the level and so you are constantly on the search for resources. Enemies may be anywhere, making too much noise while scavenging to survive will attract attention. The environment will have interactive objects to help your defence. The game will support coop play with a buddy. Survive as many days/nights as possible._

_You will end up with a basic third person game, fully networked and a small environment with interactive objects that you may use as a base for your own survival game._

Before you get started
======================

It’s not recommended to immediately dive into this sample game if you have no prior C++ experience. There are a few good places to get comfortable with the basics of C++ before moving into more complex concepts such as replication (networking) that are covered in this project.

*   [Entry level guide to UE4 C++](https://wiki.unrealengine.com/Entry_Level_Guide_to_UE4_C%2B%2B)
*   [Unreal Engine 4 Programming API Fundamentals](http://www.gamasutra.com/blogs/DanielAdamitskiy/20150112/233926/Unreal_Engine_4_Programming_API_Fundamentals.php)

If you are completely new to Unreal Engine 4 I recommend you first get yourself comfortable with the editor instead. Have a look at the official [Getting Started page](https://docs.unrealengine.com/latest/INT/GettingStarted/index.html) to get you up to speed or use this [collection of links at ZEEF.com](http://www.tomlooman.com/unreal-engine-4-resource-collection/) for a variety of tutorials and places to learn. And finally, to understand what Actors, PlayerControllers and Pawns represent I recommend reading up on them in the [Gameplay Framework](https://docs.unrealengine.com/latest/INT/Gameplay/Framework/index.html) section of the docs.

While not required before following this series, I do recommend have a good look at [Epic’s Coding Standards for C++](https://docs.unrealengine.com/latest/INT/Programming/Development/CodingStandard/index.html). I try to keep to this standard throughout the series and it’s good to maintain this standard in your own projects to more easily work with the Engine’s source and public samples which most of the time hold to this standard.

That is a lot to read up on, but again - I highly recommend doing so before dropping yourself into the survival game project.

If you feel you are ready to get started then go ahead and [download the project source at GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries). There is a release branch available for each Section that is complete, or simply get the latest through the master-branch. You can play the game, look through the code and change/add features, if you’re looking for additional information look for the associated Section. If there is no additional info to be found, be sure to grab me on the forums of each individual Section and I’ll be happy to answer your questions!

Sections Overview
=================

The project is split into 6 sections. Each covering one or more gameplay features or other C++ oriented concepts. You can skip to whatever section you find most interesting as the documentation pages have no dependencies between them.

[Project Forum Thread](https://forums.unrealengine.com/showthread.php?63678-Upcoming-C-Gameplay-Example-Series-Making-a-Survival-Game)

Section 1 - Character Setup
---------------------------

[![Section6 advancedanimbp03.jpg](https://d26ilriwvtzlb.cloudfront.net/5/54/Section6_advancedanimbp03.jpg)](/File:Section6_advancedanimbp03.jpg)

Sets up the third-person character movement with animation, object interaction, simple hunger system, all with networking support.

*   [Documentation Page](/Survival_Sample_Game:_Section_1 "Survival Sample Game: Section 1")
*   [Section forum thread](https://forums.unrealengine.com/showthread.php?64833-Announcing-Section-1-for-Survival-Game)
*   [View this branch on GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries/tree/Section-1)

Section 2 - Weapons, Death & Inventory
--------------------------------------

[![Section6 equipment03.jpg](https://d26ilriwvtzlb.cloudfront.net/2/28/Section6_equipment03.jpg)](/File:Section6_equipment03.jpg)

Adds weapon support for the character, a flashlight, UT-style inventory with on-character visual representation of the carried items and deals with damage, death and respawns for players.

*   [Documentation Page](https://wiki.unrealengine.com/Survival_Sample_Game:_Section_2)
*   [Section forum thread](https://forums.unrealengine.com/showthread.php?66263-Announcing-Section-2-for-Survival-Game)
*   [View this branch on GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries/tree/Section-2)

Section 3 - Zombie AI
---------------------

[![Section6 zombieattacking01.jpg](https://d26ilriwvtzlb.cloudfront.net/7/7d/Section6_zombieattacking01.jpg)](/File:Section6_zombieattacking01.jpg)

Introduces AI "Zombie" enemy to our game using PawnSensing and Behavior Tree.

*   [Documentation Page](https://wiki.unrealengine.com/Survival_Sample_Game:_Section_3)
*   [Section forum thread](https://forums.unrealengine.com/showthread.php?67859-Announcing-Section-3-for-Survival-Game)
*   [View this branch on GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries/tree/Section-3)

Section 4 - Dynamic Time of Day & Game loop
-------------------------------------------

[![Section6 timeofday combined.jpg](https://d26ilriwvtzlb.cloudfront.net/6/66/Section6_timeofday_combined.jpg)](/File:Section6_timeofday_combined.jpg)

Introduces a dynamic time of day, advanced player spawning and a basic game loop.

*   [Documentation Page](https://wiki.unrealengine.com/Survival_Sample_Game:_Section_4)
*   [Section forum thread](https://forums.unrealengine.com/showthread.php?69308-Announcing-Section-4-for-Survival-Game-Setting-up-the-survival-game-loop)
*   [View this branch on GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries/tree/Section-4)

Section 5 - Networking
----------------------

[![Section6 coop02.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e8/Section6_coop02.jpg)](/File:Section6_coop02.jpg)

Introduces game networking and the ability to carry around objects like barriers and bombs.

*   [Documentation Page](https://wiki.unrealengine.com/Survival_Sample_Game:_Section_5)
*   [Section forum thread](https://forums.unrealengine.com/showthread.php?71057-Announcing-Section-5-of-Survival-Game-Networking-your-game)
*   [View this branch on GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries/tree/Section-5)

Section 6 - Polish & Review
---------------------------

[![Section openworldscenery01.jpg](https://d26ilriwvtzlb.cloudfront.net/6/6c/Section_openworldscenery01.jpg)](/File:Section_openworldscenery01.jpg)

The final section in the series focuses on bug fixing and a bit of polish to the existing features. This section is compatible with the 4.8 release.

*   [Documentation Page](https://wiki.unrealengine.com/Survival_Sample_Game:_Section_6)
*   [Section forum thread](https://forums.unrealengine.com/showthread.php?72313-Announcing-Section-6-of-Survival-Game-Adding-some-polish)
*   [View this branch on GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries/tree/Section-6)

**Project & Wiki by [Tom Looman](http://www.tomlooman.com/)**

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Survival\_sample\_game&oldid=14629](https://wiki.unrealengine.com/index.php?title=Survival_sample_game&oldid=14629)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorial](/Category:Tutorial "Category:Tutorial")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)