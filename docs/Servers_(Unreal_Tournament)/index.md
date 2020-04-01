Servers (Unreal Tournament) - Epic Wiki                    

Servers (Unreal Tournament)
===========================

  

Contents
--------

*   [1 UT Servers](#UT_Servers)
    *   [1.1 Initial Windows Server Setup](#Initial_Windows_Server_Setup)
        *   [1.1.1 Prerequisites](#Prerequisites)
        *   [1.1.2 Step 1 Download the Server](#Step_1_Download_the_Server)
        *   [1.1.3 Step 2 Extract the Server](#Step_2_Extract_the_Server)
        *   [1.1.4 Step 3 Initial Run](#Step_3_Initial_Run)
    *   [1.2 Initial Linux Server Setup](#Initial_Linux_Server_Setup)
        *   [1.2.1 Step 1 Download the Server](#Step_1_Download_the_Server_2)
        *   [1.2.2 Step 2 Extract the Server](#Step_2_Extract_the_Server_2)
        *   [1.2.3 Step 3 Initial Run](#Step_3_Initial_Run_2)
    *   [1.3 Unreal Engine Configuration Files](#Unreal_Engine_Configuration_Files)
    *   [1.4 Required Ports](#Required_Ports)
        *   [1.4.1 Require Ports for UT Alpha](#Require_Ports_for_UT_Alpha)
    *   [1.5 Setting up automatic restart scripts](#Setting_up_automatic_restart_scripts)
        *   [1.5.1 Windows](#Windows)
        *   [1.5.2 Linux](#Linux)
    *   [1.6 Hubs vs. Old School Servers](#Hubs_vs._Old_School_Servers)
    *   [1.7 Custom Settings](#Custom_Settings)
        *   [1.7.1 Command Server Settings](#Command_Server_Settings)
        *   [1.7.2 Individual Game Settings](#Individual_Game_Settings)
        *   [1.7.3 Old School Server Map Rotations](#Old_School_Server_Map_Rotations)
        *   [1.7.4 Setting up a Hub](#Setting_up_a_Hub)
            *   [1.7.4.1 Ports and Instances](#Ports_and_Instances)
            *   [1.7.4.2 Joining dedicated servers to a HUB](#Joining_dedicated_servers_to_a_HUB)
            *   [1.7.4.3 Game Rulesets: Overview](#Game_Rulesets:_Overview)
            *   [1.7.4.4 Game Rulesets: Configuring which rules appear](#Game_Rulesets:_Configuring_which_rules_appear)
            *   [1.7.4.5 Game Rulesets: Adding a new Rule](#Game_Rulesets:_Adding_a_new_Rule)
            *   [1.7.4.6 Game Rulesets: Adding new Categories](#Game_Rulesets:_Adding_new_Categories)
        *   [1.7.5 Custom Content on Servers](#Custom_Content_on_Servers)
            *   [1.7.5.1 Game Rulesets: Custom Content](#Game_Rulesets:_Custom_Content)
            *   [1.7.5.2 Find out the exact MapName](#Find_out_the_exact_MapName)
    *   [1.8 Remote Control](#Remote_Control)
    *   [1.9 Additional sources](#Additional_sources)

UT Servers
==========

The Unreal Tournament Alpha Servers are currently only available for Windows & Linux, and in this guide you will learn how to configure a custom map rotation, set custom player & spectator limits, add custom maps, set passwords, and configure automatic-restart scripts for either Windows or Linux, including handling multiple servers on the same machine.

You will need to create a [forum account](https://forums.unrealtournament.com) to get the download links. You can find those links in the pinned Update thread in [this forum section](https://www.epicgames.com/unrealtournament/forums/unreal-tournament-discussion/announcements) once you have registered and logged in.

_**Please note there is another official guide under additional resources maintained by RZE. It contains some additional information if you have trouble. This forum thread may also have new useful information that may not be updated here yet.**_

Initial Windows Server Setup
----------------------------

##### Prerequisites

Windows servers require both DirectX and Visual C++ Redistributable for Visual Studio 2015. Both packages are available for download on the Microsoft site.

##### Step 1 Download the Server

You can download the latest Server package from this [thread:](https://forums.unrealtournament.com/showthread.php?12011-Unreal-Tournament-Pre-Alpha-Playable-Build)

##### Step 2 Extract the Server

Extract the zip file downloaded in step 1 into a folder somewhere on the computer that is running the server. For the rest of this tutorial we will consider that folder to be <HOME>. So if you install it in to **C:\\MyServer** then when you see **<HOME>\\UnrealTournament** this really means **C:\\MyServer\\UnrealTournament**.

##### Step 3 Initial Run

Before you begin to configure your server, you'll want to run it once so that it can create all of the needed config files for you to edit. It also allows you to respond to the EULA prompt and get it out of the way. Open a command prompt in your **<HOME>** directory and execute the following command:

_WindowsServer\\Engine\\Binaries\\Win64\\UE4Server-Win64-Shipping.exe UnrealTournament UT-Entry?Game=Lobby -log_

This will cause the server to create the following set of directories.

   **<HOME>\\UnrealTournament\\Saved**
   **<HOME>\\UnrealTournament\\Saved\\Config**
   **<HOME>\\UnrealTournament\\Saved\\Config\\WindowsServer**

From here out, anytime you see **<CONFIG>** we are referring to the third item on the list. It's in this directory where all of your config changes go.

Initial Linux Server Setup
--------------------------

The UT Servers should support every conceivable variation of Linux to some degree, with the exception of x86 Linux, which may never be supported, anything in **Bold** under this heading is a shell command.

##### Step 1 Download the Server

You can download the latest Server package from this [thread:](https://forums.unrealtournament.com/showthread.php?12011-Unreal-Tournament-Pre-Alpha-Playable-Build)

##### Step 2 Extract the Server

Extract the zip file downloaded in step 1 (**unzip UnrealTournament-Server-XXXX-Linux.zip**) into a folder somewhere on the computer that is running the server. For the rest of this tutorial we will consider that folder to be <HOME>. So if you install it in to **/MyServer** then when you see **<HOME>/UnrealTournament** this really means **/MyServer/UnrealTournament**.

##### Step 3 Initial Run

Before you begin to configure your server, you'll want to run it once so that it can create all of the needed config files for you to edit. First, we need to set the UE4Server binary to be executable. Find it in **<HOME>/Engine/Binaries/Linux** So do this with: **chmod u+x UE4Server-Linux-Shipping**, and then execute a server to generate the config files with the command below. This first run of the server will crash, and this is okay. Press **Ctrl-C** to close the process.

_/Engine/Binaries/Linux/UE4Server-Linux-Shipping UnrealTournament UT-Entry?Game=Lobby -log_

This will cause the server to create the following set of directories.

   **<HOME>/UnrealTournament/Saved**
   **<HOME>/UnrealTournament/Saved/Config**
   **<HOME>/UnrealTournament/Saved/Config/LinuxServer**

From here out, anytime you see **<CONFIG>** we are referring to the third item on the list. It's in this directory where all of your config changes go.

Now that this is done, we need to make some required config changes with nano (or vi, if that's your thing), to do that type: **nano ../../../UnrealTournament/Saved/Config/LinuxServer/Engine.ini** and add these two lines:

> `[/Script/UnrealTournament.UTGameEngine]  
> bFirstRun = False  
> `

the bFirstRun parmeters determines if the game should show the EULA which was the cause of the crash in the above step. Your server is now ready to configure.

Community Memeber DDRRE has created a good tool/suite for running traditional Linux servers. [Click here to go to the forums and read it.](https://forums.unrealtournament.com/showthread.php?18077-Linux-Server-Administration-amp-Deployment-Suite)

Unreal Engine Configuration Files
---------------------------------

When the Unreal Engine starts, it beings by loading a clean set of default config values. These values are cooked in to the pak and can not be directly modified. Instead, they can be overridden via the live configuration files. These files will be located in the **<CONFIG>** directory above and the engine will auto-generate them at first run.

By default, the engine will create a handful of empty inis but you will only be concerned with 3 of them. They are:

Config File

Description

**Game.ini**

This file holds configuration information that directly impacts gameplay. Most of your changes will happen here.

**Rules.ini**

This configuration file can be used to override the default set of game rules available to servers.

**Engine.ini**

This is the main engine's configuration file. Only advanced users should be changing anything in here.

We will cover how to configure your server in a little bit.

Required Ports
--------------

UT Alpha uses the UDP Protocol for all of it's network connections. So in order for your server to be visible to other players, you will have to make sure the following ports are open and directing to the computer running your server. [Click here](http://lmgtfy.com/?q=how+do+I+forward+a+port+on+my+router) to learn how to open ports on your router.

##### Require Ports for UT Alpha

Port Range

Description

**7777**

This is the port that the game will communicate with clients on. It can be overridden using the **"-port=xxxx"** command line switch.

**7787**

This is the sever query port. When clients are looking to connect to your server, they will use this port to communicate with it. You can change this port in the Engine.ini file.

**14000**

**Hubs Only** -- This is the instance communication port. Instances will talk back to their hub using this port.

**8000-8xxx**

**Hubs Only** -- Each instance will utilize one of these ports starting with 8000 to communicate on. You can strictly control which of these ports needs to be opened via configuration options. See **"Setting up a Hub"** further down on this page.

Setting up automatic restart scripts
------------------------------------

### Windows

This is a very basic script that will simply re-launch the process if it crashes, nothing more. In your <HOME> directory, create an empty text file called "**RunServer.bat**" Edit this file and add the following text:

   @echo off
   :Start
   UnrealTournamentServer.exe UnrealTournament UT-Entry?Game=Lobby -log
   goto Start

Double clicking on this .bat file will start your server up and the batch file will restart the server if it happens to go down.

### Linux

These are scripts that I have used in the past, they are relatively simple, but I will explain what each thing does and how it interacts.

Debian

   #!/bin/bash
   ps -eaf | grep UE4Server-Linux-Shipping | grep 7777
   # if not found - equals to 1, start it
   if \[ $? -eq 1 \]
   then
     /home/ut4/LinuxServer/Engine/Binaries/Linux/UE4Server-Linux-Shipping UnrealTournament UT-Entry?Game=Lobby -log
   else
     | echo "The Server is already running"
   fi

CentOS 6.6

    #!/bin/sh
    ps auxw | grep UE4Server-Linux-Shipping | grep -v grep > /dev/null
    # if not found - equals to 1, start it
    if \[ $? != 0 \]
    then
      echo "Server is not running"
      echo "Attempting to start .. .. "
      /home/ut4/LinuxServer/Engine/Binaries/Linux/UE4Server-Linux-Shipping UnrealTournament UT-Entry?Game=Lobby -log
    else
      echo "The Server is already running"
    fi

  

  
The one above is for you to copy/paste, the one below describes the lines which you may need to edit yourself to get desired results.

#!/bin/bash

ps -eaf | grep UE4Server-Linux-Shipping | grep 7777

This is what the script uses to discover the correct server to make sure it's running, it first looks for the UE4Server-Linux-Shipping instance, and then it looks for port 8000, which is a duel server in this example.

\# if not found - equals to 1, start it

if \[ $? -eq 1 \]e

then

/home/ut4/LinuxServer/Engine/Binaries/Linux/UE4Server-Linux-Shipping UnrealTournamentServer.exe UnrealTournament UT-Entry?Game=Lobby -log

This is the complete start path for the server, including mutators, ports, start map, and gametype

else

echo "The Server is already running"

This will be echoed out to the console if you run this script manually.

fi

Once you've setup your script how you want it with the correct details, save it as a .sh script (ut4duel.sh) and then type **crontab -e**, and add this to the bottom of the file:

**\*/1 \* \* \* \* bash /home/ut4/ut4duel.sh > /dev/null**

This will now automatically restart the server if it has crashed, once every minute. This will also restart the server in the event of a power failure, reboot, or even if you just kill the process yourself.

Hubs vs. Old School Servers
---------------------------

There are two types of servers supported in UT Alpha: Hubs which is the better new and improved way and Old School Servers for those that can't leave the 90's behind. Old School Servers run a single game mode (that can be modified with mutators) and have a list of maps that it cycles though. These are easier to admin and slightly easier on system resources. But they aren't nearly as flexible.

Hubs are our new way of running servers. Think of a Hub as your own little mini gaming network. The biggest benefit of a hub is it allows your servers to join, chat and then create matches in a wide variety of game modes to fit their current desire. Feel like playing CTF today, you can just start a CTF match and people can join. Want to Duel or Showdown? Leave your current match and go at it.

There are two portions to a hub. The Hub itself which is a chat room for setting up matches and the instances that it creates. That's right, the Hub will launch new servers on demand. This is a great way to maximize system resources as the Hub itself is fairly light weight.

While we still support old school servers, most of our new features (map vote is here, Hub leaderboards are coming) will be focused on Hubs.

Further down on this page, I'll cover how to configure a hub, but for now, let's look at settings common to all servers.

Custom Settings
---------------

The best way to setup your custom settings are to edit various values in the configuration files above. These settings will then be used whenever your server runs. Some of these settings can also be overridden using command line switches.

##### Command Server Settings

Let's start by setting up some information about your server that is used regardless to what game types are playing on them. These settings will go in your **<CONFIG>\\Game.ini** file.

> `[/Script/UnrealTournament.UTGameState]  
> ServerName=Flak's Custom Sniper Server  
> ServerMOTD=<UT.Font.NormalText.Huge>WELCOME</>\n\n<UT.Font.NormalText.Medium>Headshots for everyone.</>  
> ServerDescription=This is my server, have fun  
> `

Parameter

Description

**ServerName**

This is the name of your server. It will be displayed in the server browser and at various points in the UI.

**ServerMOTD**

This is your server's Message of the Day. It will be displayed in the browser as well as in game. It supports the following rich text tags: **<UT.Font.NormalText.Tiny>**, **<UT.Font.NormalText.Small>**, **<UT.Font.NormalText.Medium>**, **<UT.Font.NormalText.Large>** and **<UT.Font.NormalText.Huge>**.All 4 have a .Bold (**<UT.Font.NormalText.Small.Bold>**) version and currently all 5 are white.

**ServerDescription**

This description will appear at the bottom of the scoreboard.

You will also want to setup an RCON password for your server. These settings will go in your **<CONFIG>\\Engine.ini** file.

> `[/Script/UnrealTournament.UTGameEngine]  
> RconPassword=<enter_password_here>  
> `

Parameter

Description

**RconPassword**

This is the password that will be used to admin your server. Please note that this password is stored in plain-text.

##### Individual Game Settings

Most of the game types themselves also have configuration values that you can set. If you are running a Hub then these values are controlled by game rules that we will explain later. If you are running a stand alone server, then you will want to set the various values in the **<CONFIG>\\Game.ini** file.

TODO: Create a page with all of the known game options

### Old School Server Map Rotations

If you are running an old school style of server (not a Hub) then you will want to setup map rotations for the game type you are running. You do this by changing the MapRotation values in the **<CONFIG>\\Game.ini**. Here is an example of setting up the map rotation for a DM server.

> `[/Script/UnrealTournament.UTDMGameMode]  
> MapRotation=/Game/RestrictedAssets/Maps/WIP/DM-ASDF  
> MapRotation=/Game/RestrictedAssets/Maps/WIP/DM-DeckTest  
> MapRotation=/Game/RestrictedAssets/Maps/WIP/DM-Focus  
> MapRotation=/Game/RestrictedAssets/Maps/WIP/DM-NickTest1  
> MapRotation=/Game/RestrictedAssets/Maps/WIP/DM-Circuit  
> MapRotation=/Game/RestrictedAssets/Maps/WIP/DM-SidCastle  
> MapRotation=/Game/RestrictedAssets/Maps/WIP/DM-Spacer  
> MapRotation=/Game/RestrictedAssets/Maps/WIP/DM-Overlord  
> MapRotation=/Game/RestrictedAssets/Maps/WIP/DM-Deadfall  
> `

If possible, it's always better to use the full name of the map otherwise, the engine will have to look it up which can cause a slight performance hitch.

### Setting up a Hub

As I said earlier, Hubs are the shiny new hot server type that everyone's using. But they do require a little more setup and a little more work.

##### Ports and Instances

To start, let's setup some information that is needed for launching new instances. These settings will go in your **<CONFIG>\\Game.ini** file.

> `[/Script/UnrealTournament.UTLobbyGameMode]  
> StartingInstancePort=8001  
> InstancePortStep=1  
> MaxInstances=16  
> `

These options are important to the running of a Hub. Let's look at what they do:

Option

Description

**StartingInstancePort**

Each instance needs it's own game port to talk on. By default we start at 8000.

**InstancePortStep**

Each time an instance is spawn (after the first) this value will be added to StartingInstancePort to generate the port for the instance.

**MaxInstances**

This holds the maximum # of active instances that can be running at any one time.

How does this work together? Each time the Hub creates an instance, it will generate a new port number for it. It uses the following formula:

Port # = StartingInstancePort + ( (InstanceNumber-1) \* InstancePortStep)

##### Joining dedicated servers to a HUB

To join a dedicated server to a HUB you need to create access keys to authenticate a dedicated server with the HUB. Each dedicated server requires it's own key. Accesskeys are configured in the HUBs Game.ini as following:

> `[/Script/UnrealTournament.UTLobbyGameState]  
> AccessKeys=G7zQNjpy4JOze1Ao  
> AccessKeys=HF90G9l4n3zTQZ9Q  
> AccessKeys=zktFYb6JEyWQzPwR  
> `

When launching the dedicated server add the following:

?HUB=IP.Address.Of.Hub?HUBKey=G7zQNjpy4JOze1Ao

##### Game Rulesets: Overview

Hubs determine what type of game modes are available to play using a list of Game Rulesets. Currently, Epic has 12 different available rulesets for play. While you can change which rulesets are available on your Hub, if you allow an Epic ruleset, it will be forced to use the settings determined by Epic.

##### Game Rulesets: Configuring which rules appear

The list of rulesets that will appear in the game is determined by a config option in **<CONFIG>\\Rules.ini**. It's important to note that if you make any changes here you have to include ALL of the rules you want to allow. Let's look at an example:

> `[/Script/UnrealTournament.UTEpicDefaultRulesets]  
> AllowedRulesets=Deathmatch  
> AllowedRulesets=BigDM  
> AllowedRulesets=TDM  
> AllowedRulesets=DUEL  
> AllowedRulesets=SHOWDOWN  
> AllowedRulesets=CTF  
> AllowedRulesets=BIGCTF  
> AllowedRulesets=iDM  
> AllowedRulesets=iTDM  
> AllowedRulesets=iCTF  
> AllowedRulesets=iCTF+t  
> AllowedRulesets=LGiCTF  
> AllowedRulesets=MyCustomRuleTag  
> `

This will allow all of the normal Epic rules and one custom ruleset (**MyCustomRuleTag**). If you omit any of the original rules, they won't appear in the list. It's that simple.

##### Game Rulesets: Adding a new Rule

Since we added a new rule above, we need to create the rule definition for it. To do this, we add an entry to **<CONFIG>\\Rules.ini** that defines the rule. Here is an example:

> `[MyCustomRuleTag UTGameRuleset]  
> UnqiueTag=MyCustomRuleTag  
> Title=My Custom Rule's Title  
> Tooltip=Play this custom rules  
> Description=Custom Rules are really cool.\n\n<UT.Hub.RulesText_Small>TimeLimit : 2x 7 minutes</>\n<UT.Hub.RulesText_Small>Mercy Rule : On</>\n\nMaximum of 12 players allowed!  
> MaxPlayers=12  
> MinPlayersToStart=2;  
> DisplayTexture=Texture2D'/Game/RestrictedAssets/UI/GameModeBadges/GB_Custom.GB_Custom'  
> GameMode=CTF  
> GameOptions=?TimeLimit=14?GoalScore=0?  
> Categories=TeamPlay  
> bTeamGame=true  
> DefaultMap=/Game/RestrictedAssets/Maps/WIP/CTF-Outside  
> MapPrefixes=CTF  
> CustomMapList=/Game/RestrictedAssets/Maps/WIP/CTF-Outside  
> CustomMapList=/Game/RestrictedAssets/Maps/WIP/CTF-Blank  
> CustomMapList=/Game/RestrictedAssets/Maps/WIP/CTF-BigRock  
> CustomMapList=/Game/RestrictedAssets/Maps/WIP/CTF-Dam  
> CustomMapList=/Game/RestrictedAssets/Maps/WIP/CTF-FaceTest  
> CustomMapList=/Game/RestrictedAssets/Maps/WIP/CTF-Volcano  
> CustomMapList=/Game/RestrictedAssets/Maps/WIP/CTF-Lance  
> CustomMapList=/Game/RestrictedAssets/Maps/WIP/CTF-Mine  
> `

Let's Look at the various options defined here.

Option

Description

**UniqueTag**

This is a unique tag that will be used to identify this ruleset. NOTE: if you attempt to use one of the Epic rule tags, your settings will be blown out. But you can use it with CustomMapList to add maps to an Epic rule.

**Title**

This is the title of rule that will appear in the UI.

**Tooltip**

This should be a short description of the rule that will popup when hovering over it in the UI.

**Description**

This is a long description for this rule.

**MaxPlayers**

This is the Maximum # of players allowed in this game type.

**MinPlayersToStart**

This value locks the game from starting until it has this many players in it. I strongly suggest you leave it at 2 but it's your server.

**DisplayTexture**

This is a string reference to the texture to display when looking at the rule.

**GameMode**

This is the game mode that will be used when launching the game (?game=xxxx) You can use the shortcut name if it's available or the long name.

**GameOptions**

This is a string options that will be passed to the instance. Here is where you setup the various game rules.

**Categories**

Rules get sorted in to various category tabs and you define those categories here. Each one should be added on a separate line:

Categories=Deathmatch

Categories=InstaGib

This would cause the rule to appear on the two tabs.

**bTeamGame**

If you are creating a rule for a team game you will want to set this to true. It will allow the match setup menu to have options for setting up the team, etc.

**CustomMapList**

This is the section where you put all of your maps that are allowed with this ruleset. Each map should appear on it's own line (like Categories). You can use either the short name or long name for the map, HOWEVER if you use the short name, it will cause your server to hitch on start up while resolving the name.

One big important point to remember. The UniqueTag has to match in 3 places. It has to start the configuration section:

\[**MyCustomRuleTag** UTGameRuleset\] UnqiueTag=**MyCustomRuleTag**

It also has to match the value in the "AllowedRulesets"

AllowedRulesets=**MyCustomRuleTag**

These three values have to match for your rule to appear.

##### Game Rulesets: Adding new Categories

It's very easy to add new categories to your hub. Here is an example in **<CONFIG>\\Rules.ini**:

> `[/Script/UnrealTournament.UTEpicDefaultRulesets]  
> RuleCategories=(CategoryName=DeathMatch,CategoryButtonText="Deathmatch")  
> RuleCategories=(CategoryName=TeamPlay,CategoryButtonText="Team Play")  
> RuleCategories=(CategoryName=InstaGib,CategoryButtonText="InstaGib")  
> RuleCategories=(CategoryName=SpeedRun,CategoryButtonText="Speed Rule")  
> RuleCategories=(CategoryName=Custom,CategoryButtonText="Custom")  
> `

This would add a custom SpeedRun category. Once added you can add custom rules that will appear under this tab. Like AllowedRulesets, you will need to include all of the default categories above if you add some. Just copy the above text as your starting point.

### Custom Content on Servers

Custom content is supported using the redirectors. This is a way of using HTTP to download a pak that is needed to play. Currently, the following type of custom content is support:

Maps are supported on Old School Servers and Hubs Blueprint GameModes/Mutators and supported on Hubs (via rules only) but join in progress will not be supported. We are working hard at eliminating these limitations.

All custom content support starts with the RedirectReferences array. These settings will go in your **<CONFIG>\\Game.ini** file. Here is an example:

> `[/Script/UnrealTournament.UTBaseGameMode]  
> RedirectReferences=(PackageName="DM-NickTest2-WindowsNoEditor",  
> PackageURLProtocol="https",  
> PackageURL="s3.amazonaws.com/unrealtournament/DM-NickTest2-WindowsNoEditor.pak",  
> PackageChecksum="890ff2951d04f8e0ae30abd8909151ea")  
> `

All redirects go in this section. Let's look at the various sub values of each reference:

Parameter

Description

**PackageName**

This is the name of the package to be downloaded minus the .PAK extension. When the game needs a redirector, it will use this value to look it up in the reference table. It's important that this contains the full path to the package itself. Shortnames are not yet supported.

**PackageURLProtocol**

Typically this should be "http" or "https".

**PackageURL**

This is the actual URL needed to download the package without the protocol tag.

**PackageChecksum**

Holds the MD5 checksum for this package.

The UTGenerateRedirects commandlet is available to generate RedirectReferences entries. The commandlet generates the MD5 checksum so that you don't have to use a tool like WinMD5.exe or md5sum to calculate it.

Here's an example commandline to generate an entry for DM-NickTest2:

   UE4Server-Win64-Test.exe UnrealTournament -run=UTGenerateRedirects -Package=DM-NickTest2-WindowsNoEditor -WebAddress=[https://s3.amazonaws.com/unrealtournament/DM-NickTest2-WindowsNoEditor.pak](https://s3.amazonaws.com/unrealtournament/DM-NickTest2-WindowsNoEditor.pak) 

When you connect an old school server that is running a custom map, the server will use this table to send the needed redirect information to the client. On hubs, you can use a custom ruleset to for a client to download gamemodes/mutator packages using this system. Let's look at an example:

##### Game Rulesets: Custom Content

Remember our custom ruleset we added above. There is another config property we didn't cover. These settings will go in your **<CONFIG>\\Rules.ini** file. Let's look:

Option

Description

**RequiredPackages**

Holds a list of packages that are required to play this ruleset. NOTE.. if you are including custom maps in this ruleset, you will need to include the packed name here. Here is an example of what I mean:

> `CustomMapList=DM-MyCustomMap  
> RequiredPackages=DM-MyCustomMap-WindowsNoEditor  
> `

In future versions of UT this double definition won't be needed (though it won't hurt).

##### Find out the exact MapName

To find out the exact MapName, you have to start your Map once on your server or in a local game. After you've started the map, you can find the MapName in your UnrealTournament.log or in your Console output.

Remote Control
--------------

We have a page dedicated to [Server Administration](/Server_Administration "Server Administration"). For information on how to admin your server, go there.

  

Additional sources
------------------

Please use the [Server Documentation Mega Thread](https://forums.unrealtournament.com/showthread.php?19467-UT-Server-Documentation-Mega-Thread!) on the forums

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Servers\_(Unreal\_Tournament)&oldid=25091](https://wiki.unrealengine.com/index.php?title=Servers_(Unreal_Tournament)&oldid=25091)"

[Category](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")

  ![](https://tracking.unrealengine.com/track.png)