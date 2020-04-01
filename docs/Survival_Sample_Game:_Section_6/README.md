Survival Sample Game: Section 6 - Epic Wiki                    

Survival Sample Game: Section 6
===============================

**Rate this Tutorial:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (2 votes)

Approved for Versions:4.8

C++ Sample project covering common gameplay concepts packed in a small coop survival game.

Contents
--------

*   [1 Introduction](#Introduction)
    *   [1.1 Links](#Links)
    *   [1.2 Feature Highlights](#Feature_Highlights)
        *   [1.2.1 Weapons & Equipment](#Weapons_.26_Equipment)
        *   [1.2.2 Advanced Animation Blueprint](#Advanced_Animation_Blueprint)
        *   [1.2.3 Zombie AI](#Zombie_AI)
        *   [1.2.4 Dynamic Time of Day](#Dynamic_Time_of_Day)
        *   [1.2.5 Object interaction](#Object_interaction)
        *   [1.2.6 Moving Objects](#Moving_Objects)
    *   [1.3 Available Maps](#Available_Maps)
        *   [1.3.1 Coop Landscape](#Coop_Landscape)
        *   [1.3.2 ContainerCity](#ContainerCity)
    *   [1.4 Coop and Open World](#Coop_and_Open_World)
        *   [1.4.1 2-Player Coop Survival](#2-Player_Coop_Survival)
        *   [1.4.2 Open World](#Open_World)
    *   [1.5 Taking this project beyond](#Taking_this_project_beyond)
        *   [1.5.1 Upgrade your game world](#Upgrade_your_game_world)
    *   [1.6 Special Thanks](#Special_Thanks)
    *   [1.7 Closing](#Closing)
    *   [1.8 Links](#Links_2)

Introduction
------------

Section 6 is the conclusion to the C++ Survival game series. The final series is upgraded to support the latest 4.8 version of Unreal Engine. It introduces a new coop landscape map along with many tweaks and bug fixes. In this final section I will go over some of the available features in the project and give you some tips on building your own game using this series.

[![Section6 coopoverview.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c8/Section6_coopoverview.jpg)](/File:Section6_coopoverview.jpg)

### Links

*   [Forum Thread](https://forums.unrealengine.com/showthread.php?63678-Ongoing-C-Gameplay-Example-Series-Making-a-Survival-Game)
*   [Project Overview](https://wiki.unrealengine.com/Survival_sample_game)
*   [Previous Section (Gameplay networking)](https://wiki.unrealengine.com/Survival_Sample_Game:_Section_5)
*   [Source at GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries)

### Feature Highlights

During the course of the 6 sections I covered a variety of C++ gameplay concepts for you to explore and learn from. Not all available features in the project were covered in the section documentation. I invite you to play the game and explore the source to discover everything that was included! To help you get an overview of what is available, I'm highlighting some of the project features below.

#### Weapons & Equipment

[![Section6 equipment03.jpg](https://d26ilriwvtzlb.cloudfront.net/2/28/Section6_equipment03.jpg)](/File:Section6_equipment03.jpg)

Players spawn with an assault rifle and a flashlight. These weapons can be carried on the character's back (rifle) and pelvis (flashlight) using [Sockets](https://docs.unrealengine.com/latest/INT/Engine/Content/Types/SkeletalMeshes/Sockets/index.html). One of the more advanced features included is the custom [AnimNotify](https://docs.unrealengine.com/latest/INT/Engine/Animation/Sequences/Notifies/index.html) that calls for the exact moment during the animation we must switch the mesh from being in the character's hands to his back or pelvis. Any time you specify an AnimNotify in your animations you can implement this event in the EventGraph of the AnimationBlueprint for that character.

#### Advanced Animation Blueprint

[![Section6 advancedanimbp03.jpg](https://d26ilriwvtzlb.cloudfront.net/5/54/Section6_advancedanimbp03.jpg)](/File:Section6_advancedanimbp03.jpg)

The project includes an advanced animation blueprint setup for the player character. It includes sprinting, crouching, aiming down sights, weapon fire recoil, etc. along with a special "Idle Break" animation that is played whenever a player idle for a small period of time. On top of that [AnimMontages](https://docs.unrealengine.com/latest/INT/Engine/Animation/AnimMontage/index.html) are used to blend weapon reloading and equipping.

The animations are from the [Animation Starter Pack](https://www.unrealengine.com/content/88f875a30cfe4d5e906aef04138fbbfc), freely available on the Unreal Engine marketplace.

#### Zombie AI

[![Section6 zombieattacking01.jpg](https://d26ilriwvtzlb.cloudfront.net/7/7d/Section6_zombieattacking01.jpg)](/File:Section6_zombieattacking01.jpg)

Enemy AI wanders around the area during the night and moves towards noises made by the player. The AI is able to sense gun shots and footsteps and will attack the player on sight in a furious sprint.

The zombie has audio responses for many of the events including when sensing a player, idling, wandering, chasing, getting hit, dying, attacking etc. These audio files were kindly provided by [@YorickCoster](https://twitter.com/YorickCoster) and can be used in your own projects too!

#### Dynamic Time of Day

[![Section6 timeofday combined.jpg](https://d26ilriwvtzlb.cloudfront.net/6/66/Section6_timeofday_combined.jpg)](/File:Section6_timeofday_combined.jpg)

The game features a dynamic time of day that is tied to the game mode. As during night time the zombies start spawning into the level and any existing zombies become more active and start wandering around the map. It supports networking with smooth interpolation on clients.

**Known issue:** The Skylight component does not support efficient runtime re-capture of the environment. To prevent a huge performance loss the lighting is not updated per frame, as a result the day/night isn't completely smooth the moment the sun sets.

#### Object interaction

[![Section6 bombfuze02.jpg](https://d26ilriwvtzlb.cloudfront.net/7/7a/Section6_bombfuze02.jpg)](/File:Section6_bombfuze02.jpg)

Some of the objects in the world can be interacted with (Hotkey "E") These include the assault rifle, flashlight, cupcake and the bomb.

Consuming food restores hitpoints and energy while interacting with the bomb sets the fuze. Weapons can be added to the inventory.

#### Moving Objects

[![Section6 barrier01.jpg](https://d26ilriwvtzlb.cloudfront.net/5/5e/Section6_barrier01.jpg)](/File:Section6_barrier01.jpg)

Using the middle-mouse button, any physically simulated object can be picked up and moved around. Examples include the red barrier and the bomb actor. you can rotate the carried objects using the scroll-wheel and the 1 & 2 numeric keys. Left-clicking while carrying an object will throw it in the view direction. This is a neat trick to throw fuzed bombs are your enemy, or to throw food/equipment to your coop buddy.

### Available Maps

For this series I've built a few maps to test out specific features. "DefaultMap" is used as the test bed for most newly introduced features.

#### Coop Landscape

[![Section openworldscenery01.jpg](https://d26ilriwvtzlb.cloudfront.net/6/6c/Section_openworldscenery01.jpg)](/File:Section_openworldscenery01.jpg)

A recently introduced map for the cooperative gamemode with a slight nudge to an open world.

#### ContainerCity

[![Section6 containercity01.jpg](https://d26ilriwvtzlb.cloudfront.net/1/1b/Section6_containercity01.jpg)](/File:Section6_containercity01.jpg)

Some may recognize it as "Shipment" from a well known shooter. It was used as a testing grounds for the AI sensing and the coop-gamemode.

### Coop and Open World

The game was designed as a small 2-player coop survival game where players must survive as many nights as possible while using objects they find in the environment such as bombs, barriers and weapons. Additionally I've included a second gamemode stub you can use to build a more open ruleset for a DayZ/Rust like survival game.

#### 2-Player Coop Survival

[![Section6 coop02.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e8/Section6_coop02.jpg)](/File:Section6_coop02.jpg)

The gamemode features an accelerated day/night cycle, during the day players can collect items, equipment and setup defenses for the night to come. For the duration of the night zombies appear, any existing zombies become active and start moving around the map. Keep an eye out on your energy levels as low energy will hurt your health. If a player dies during the night, he will respawn at sunset as long as there is at least one other player still alive.

Players score points as they survive the night and by killing zombies. The game continues for as long as there is at least one player alive.

#### Open World

[![Section6 timeofday03.jpg](https://d26ilriwvtzlb.cloudfront.net/5/5d/Section6_timeofday03.jpg)](/File:Section6_timeofday03.jpg)

The open world gamemode is a stub that can be used to build your own open world ruleset. Unlike the coop mode, this mode is free-for-all (friendlyfire enabled) The mode lacks the scoring system, but supports the time of day and enemy spawns to get you started. Keep in mind that it's a basic setup and will require additional work depending on the design of your own game.

### Taking this project beyond

This series is built primarily as a C++ learning resource. I hope you've learned a lot from the previous sections in this series and put that knowledge to use for your own project! If you wish to use this project as a base for your own game, you can!

#### Upgrade your game world

Don't forget to check out the amazing "A boy and his kite" demo, it's available on the Learn Tab in your Unreal Engine Launcher.

Have a look at the [Open World Tools](https://docs.unrealengine.com/latest/INT/Engine/OpenWorldTools/index.html) with many great open world rendering improvements introduced in 4.8!

### Special Thanks

I'd like to give a special thanks to everyone who helped out during the series. And especially Yorick Coster for providing free to use game audio! The audio files included with the project can be used in your own projects.

*   Yorick Coster ([@YorickCoster](https://twitter.com/YorickCoster)) for contributing many of the audio files
*   Osman Tsjardiwal ([@ozmant](https://twitter.com/ozmant)) for providing me with ContainerCity base map
*   Everyone on the forums to helped with reporting bugs and feedback
*   The contributors on GitHub

### Closing

This section concludes the series, I hope you've learned many new C++ gameplay concepts and use this for your own game projects moving forward!

Follow me on [Twitter](https://twitter.com/t_looman) and let me know what you think of this series! Or check out some of the other things I'm working on [right here](http://www.tomlooman.com/)!

### Links

*   [Forum Thread](https://forums.unrealengine.com/showthread.php?63678-Ongoing-C-Gameplay-Example-Series-Making-a-Survival-Game)
*   [Project Overview](https://wiki.unrealengine.com/Survival_sample_game)
*   [Previous Section (Gameplay networking)](https://wiki.unrealengine.com/Survival_Sample_Game:_Section_5)
*   [Source at GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries)

**Project & Wiki by [Tom Looman](http://www.tomlooman.com/)**

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Survival\_Sample\_Game:\_Section\_6&oldid=26256](https://wiki.unrealengine.com/index.php?title=Survival_Sample_Game:_Section_6&oldid=26256)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [SurvivalGameSeries](/index.php?title=Category:SurvivalGameSeries&action=edit&redlink=1 "Category:SurvivalGameSeries (page does not exist)")
*   [Code](/Category:Code "Category:Code")
*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)