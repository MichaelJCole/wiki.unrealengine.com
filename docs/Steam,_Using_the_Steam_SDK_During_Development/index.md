 Steam, Using the Steam SDK During Development - Epic Wiki             

 

Steam, Using the Steam SDK During Development
=============================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Steamworks SDK](#Steamworks_SDK)
*   [3 Github Engine Builds vs Retail UE4 Builds](#Github_Engine_Builds_vs_Retail_UE4_Builds)
    *   [3.1 Retail Builds Skip to This Step](#Retail_Builds_Skip_to_This_Step)
*   [4 Engine/Source/ThirdParty/Steamworks](#Engine.2FSource.2FThirdParty.2FSteamworks)
*   [5 Steam Build CS](#Steam_Build_CS)
*   [6 Engine/Binaries/ThirdParty/Steamworks](#Engine.2FBinaries.2FThirdParty.2FSteamworks)
*   [7 Dll Files](#Dll_Files)
    *   [7.1 Win64](#Win64)
    *   [7.2 Win32](#Win32)
*   [8 Build.CS](#Build.CS)
*   [9 Target.cs](#Target.cs)
*   [10 Config/DefaultEngine.ini](#Config.2FDefaultEngine.ini)
*   [11 WinPlatform.Automation.cs](#WinPlatform.Automation.cs)
*   [12 OnlineSubsystemPlugin](#OnlineSubsystemPlugin)
*   [13 Some Tips](#Some_Tips)
*   [14 Epic Tutorial](#Epic_Tutorial)
*   [15 Packaging](#Packaging)
*   [16 Packaging w/ Steam for Shipping Builds](#Packaging_w.2F_Steam_for_Shipping_Builds)
*   [17 Running Steam on Mac](#Running_Steam_on_Mac)
*   [18 Conclusion](#Conclusion)

Overview
--------

_Original Author:_ Rama

Dear Community,

This is my guide to getting Steamworks running with your game!

You do not need to have been Greenlit to start using the Steam SDK during your game's development process.

Steamworks SDK
--------------

(in 4.7 and beyond you dont need to do this step, you will find the Steam binaries in Engine/Binaries/ThirdParty/Steamworks)

Download the steamworks SDK:

[Steamworks SDK](https://partner.steamgames.com/%7C)

Identify what the latest version is that you are downloading, such as "v129a"

Github Engine Builds vs Retail UE4 Builds
-----------------------------------------

Please note that recompiling the engine and modifying the Steamworks build cs is not required.

If you are not using your own locally built verison of the engine you should be able to simply download the Steam SDK and skip to this step:

### Retail Builds Skip to This Step

**[Binaries, DLL copying](#Engine.2FBinaries.2FThirdParty.2FSteamworks)**

Engine/Source/ThirdParty/Steamworks
-----------------------------------

Copy the entire contents of the downloaded SDK to

 Engine/Source/ThirdParty/Steamworks/Steamv129a
 
or whatever your current version is!

So you will end up with folder structure like this

 Engine/Source/ThirdParty/Steamworks/Steamv129a/sdk/

Steam Build CS
--------------

Open the Steam Build CS contained in the directory structure

 Engine/Source/ThirdParty/Steamworks/

Make sure the version number there matches the version you downloaded as the Steam SDK!

  

Engine/Binaries/ThirdParty/Steamworks
-------------------------------------

Now in your UE4 engine's **Binaries** folder you must create this directory structure

 Engine/Binaries/ThirdParty/Steamworks/Steamv129a/Win64
 Engine/Binaries/ThirdParty/Steamworks/Steamv129a/Win32

Remember to use your current steam version as shown in the SDK you downloaded!

Dll Files
---------

Dlls marked with (_Steam Client Install Dir_) are found in your **program files x86 / Steam** directory (regular steam client)

The other 2 dlls are found in the SDK you downloaded in this directory structure

 sdk/redistributable\_bin

### Win64

 steam\_api64.dll	(Downloaded SDK)
 steamclient64.dll 	(Steam Client Install Dir)
 tier0\_s64.dll		(Steam Client Install Dir)
 vstdlib\_s64.dll 	(Steam Client Install Dir)

### Win32

 steam\_api.dll		(Downloaded SDK)
 steamclient.dll 	(Steam Client Install Dir)
 tier0\_s.dll  		(Steam Client Install Dir)
 vstdlib\_s.dll  	(Steam Client Install Dir)

Build.CS
--------

In your game's build.cs you need to include this:

  

 PublicDependencyModuleNames.AddRange(new string\[\] { 
 	"OnlineSubsystem",
 	"OnlineSubsystemUtils"
 });

 DynamicallyLoadedModuleNames.Add("OnlineSubsystemSteam");

Target.cs
---------

In your game's Target.cs, add **bUsesSteam=true** in the constructor. Here's an example:

<syntaxhighlight lang="cpp"> public class ShooterGameTarget : TargetRules {

   public ShooterGameTarget(TargetInfo Target)
   {
       Type = TargetType.Game;
       bUsesSteam = true;
   }
   .....

</syntaxhighlight>

Config/DefaultEngine.ini
------------------------

<syntaxhighlight lang="cpp"> \[/Script/Engine.GameEngine\] !NetDriverDefinitions=ClearArray +NetDriverDefinitions=(DefName="GameNetDriver",DriverClassName="/Script/OnlineSubsystemSteam.SteamNetDriver",DriverClassNameFallback="/Script/OnlineSubsystemUtils.IpNetDriver")

\[OnlineSubsystem\] DefaultPlatformService=Steam PollingIntervalInMs=20

\[OnlineSubsystemSteam\] bEnabled=true SteamDevAppId=480 GameServerQueryPort=27015 bRelaunchInSteam=false GameVersion=1.0.0.0 bVACEnabled=1 bAllowP2PPacketRelay=true P2PConnectionTimeout=90

\[/Script/OnlineSubsystemSteam.SteamNetDriver\] NetConnectionClassName="/Script/OnlineSubsystemSteam.SteamNetConnection" </syntaxhighlight>

WinPlatform.Automation.cs
-------------------------

In Visual Studio, this file is in the folder **Programs/Automation/Win.Automation/WinPlatform.Automation.cs**. Open it, and check that this string has your Steam API version:

 string SteamVersion = "Steamv131";

OnlineSubsystemPlugin
---------------------

\>Edit from Rumbleball 29.03.2018

This Wiki entry seems to be pretty old and there seems to be some changes to the engine. UE4.16+ (at least) you will need to enable the OnlinesubSystemSteam Plugin for your game. If you don't do that, you will get the following warnings in the output window of the editor: <syntaxhighlight lang="cpp">

LogModuleManager:Warning: No filename provided for module OnlineSubsystemSteam
LogModuleManager:Warning: ModuleManager: Unable to load module 'OnlineSubsystemSteam' because the file 'D:/Programs/Epic Games/4.13/Engine/Binaries/Win64/' was not found.

</syntaxhighlight> To enable the plugin: Open the editor and go to Edit->Plugins->Online Platform and enable 'Online Subsystem Steam'

Some Tips
---------

1\. There is an awesome program written by a community member named Garner. Check it out here:

[Steam Setup Utility by Garner](https://forums.unrealengine.com/showthread.php?67565-Steam-Setup-Utility)

2\. Trying to run your game in PIE mode may give you a "Steam API disabled!" Error. Run your game in standalone mode to see if things get better.

Epic Tutorial
-------------

Epic's tutorial on this subject is here:

[Online Subsystem Steam](https://docs.unrealengine.com/latest/INT/Programming/Online/Steam/index.html)

Packaging
---------

(This is not required in more recent engine builds, just check the ThirdParty folder to make sure Steam is there)

When packaging your game you must copy the Steam binaries from the engine ThirdParty to your packaged game Engine/ThirdParty

Engine/Binaries/ThirdParty/Steamworks

Packaging w/ Steam for Shipping Builds
--------------------------------------

For shipping builds you must manually create a file called:

steam\_appid.txt

and in that file put just your app id with no extra whitespaces (spaces or returns or anything like that)

to test you could create such a file and put just 480 in it.

♥ Rama

Running Steam on Mac
--------------------

Quoting Epic tutorial:

Contrary to Windows, Steam Overlay on Mac requires game to be launched using Steam client. For this you first need to add the game to your library using "Add a Non-Steam Game to My Library" option from Steam's Games menu.[\[1\]](https://docs.unrealengine.com/latest/INT/Programming/Online/Steam/index.html#steamoverlayonmac)

Conclusion
----------

If everything works you will see the steam pop up appear in the lower right and you can press SHIFT+TAB to see the Steam overlay!

If you see in your log that the .dlls can't be found, check two things

1\. You put them in **Binaries** not Source

2\. and you named the folder appropriately for your version number, ex:

 Binaries/ThirdParty/Steamworks/Steamv129

Enjoy!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Steam,\_Using\_the\_Steam\_SDK\_During\_Development&oldid=59](https://wiki.unrealengine.com/index.php?title=Steam,_Using_the_Steam_SDK_During_Development&oldid=59)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")