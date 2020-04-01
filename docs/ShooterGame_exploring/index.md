ShooterGame exploring - Epic Wiki                    

ShooterGame exploring
=====================

**Rate this Article:**

3.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:(please verify)

Contents
--------

*   [1 Exploring the functionality of the ShooterGame example](#Exploring_the_functionality_of_the_ShooterGame_example)
    *   [1.1 Background](#Background)
    *   [1.2 Code](#Code)
    *   [1.3 Configuration of Game Variables](#Configuration_of_Game_Variables)
    *   [1.4 Key Bindings](#Key_Bindings)
    *   [1.5 Animation Code](#Animation_Code)
    *   [1.6 Starting the Level once menu selections are made](#Starting_the_Level_once_menu_selections_are_made)

Exploring the functionality of the ShooterGame example
------------------------------------------------------

The purpose of this page is to collect and present information about the ShooterGame example that comes with the Unreal Engine (see the Marketplace to download it).

### Background

ShooterGame is a C++ based example.

Additonal background can be found in the Official Documentation: [https://docs.unrealengine.com/latest/INT/Resources/SampleGames/ShooterGame/index.html](https://docs.unrealengine.com/latest/INT/Resources/SampleGames/ShooterGame/index.html)

  

### Code

To generate the MS Visual Studio 2013 project file do the following:

1) Open windows explorer

2) Navigate to your ..\\Unreal Projects\\ShooterGame directory

3) Right-hand click on the ShooterGame.uproject to bring a context menu

4) Select "Generate Visual Studio Files"

  
You should now see a ShooterGame.sln in the same directory

\[thanks goes to Robbie from the UE4 Skype chate for pointing this out\]

[![](https://d26ilriwvtzlb.cloudfront.net/3/36/Vs2013_shootergame.png)](/File:Vs2013_shootergame.png)

VS2013 ShooterGame Screenshot

  

  

### Configuration of Game Variables

The file "/Config/DefaultGame.ini" is referred to by the game for data such as: WarmupTime=15 RoundTime=300 TimeBetweenMatches=15 KillScore=2 DeathScore=-1 DamageSelfScale=0.3 MaxBots=1

  

### Key Bindings

Key bindings are found in the file /Config/DefaultInput.ini

### Animation Code

The Player's animation code is found mostly in ShooterCharacter.cpp

The Player mesh is set in "ShooterGameMode.cpp" at line 7 where "/Game/Blueprints/Pawms/PlayerPawn" is passed to PlayerPawnOb. This is a Blueprint with additional information from the Editor.

### Starting the Level once menu selections are made

The function to be called is "serverTravel()"

Retrieved from "[https://wiki.unrealengine.com/index.php?title=ShooterGame\_exploring&oldid=8303](https://wiki.unrealengine.com/index.php?title=ShooterGame_exploring&oldid=8303)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)