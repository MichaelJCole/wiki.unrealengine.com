Modding: Adding mod-support to your Unreal Engine 4 project - Epic Wiki                    

Modding: Adding mod-support to your Unreal Engine 4 project
===========================================================

**Rate this Tutorial:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (2 votes)

Approved for Versions:4.9

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 The Project](#The_Project)
*   [3 Creating the mod](#Creating_the_mod)
    *   [3.1 Plugin Descriptor](#Plugin_Descriptor)
    *   [3.2 Plugin Content](#Plugin_Content)
*   [4 Setup Launcher Profiles](#Setup_Launcher.C2.A0Profiles)
    *   [4.1 Full Game Profile](#Full_Game_Profile)
    *   [4.2 MyFirstMod Profile](#MyFirstMod_Profile)
*   [5 Cooking your first mod](#Cooking_your_first.C2.A0mod)
*   [6 Loading a mod](#Loading_a_mod)
*   [7 Done!](#Done.21)
*   [8 References](#References)

Introduction
------------

I will be running you through the process of setting up a mod (or "User Generated Content") for your Unreal Engine 4 game. I've created a sample FPS project with a simple mod included, it's available for download on [GitHub](https://github.com/tomlooman/ModSampleGame). As a base I used the Blueprint FPS Template. The mod changes the weapon behavior by shooting three balls in an arc instead of one. The [Mod source](https://github.com/tomlooman/ModSampleGame/tree/master/ModSampleGame/Plugins/MyFirstMod) contains a gamemode, map and custom player character.

Mods are handled as [Plugins](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html) by the engine, so I recommend reading up on how plugins are handled by the editor before moving on.

This guide and the mod sample on Github were built using **UE 4.9 Preview 4**. There are some issues with cooking & packaging in earlier releases.

**Warning: This procedure is intended for early adopters only!** The pipeline may change and will receive improvements as it's still work-in-progress.

The Project
-----------

The full example project is available for download on [GitHub](https://github.com/tomlooman/ModSampleGame). It's based on the FPS Blueprint Template with a ./Plugins/MyFirstMod folder containing our custom content.

[![Mods header narrow.jpg](https://d26ilriwvtzlb.cloudfront.net/5/5a/Mods_header_narrow.jpg)](/File:Mods_header_narrow.jpg)

Creating the mod
----------------

To create a mod, you must create a Plugin. As mods (or UGC - "User Generated Content") are handled as Plugins by the engine. Below is the folder layout for ModSampleGame. The ./Plugins/MyFirstMod/ contains a /Content/ folder and a [.uplugin descriptor](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html#plugindescriptorfiles) file. The descriptor is loaded by the editor and can be hand-edited using any text editor. The /Saved/ folder is created by the cooking process.

[![Mods pluginsfolder.png](https://d26ilriwvtzlb.cloudfront.net/b/b4/Mods_pluginsfolder.png)](/File:Mods_pluginsfolder.png)

### Plugin Descriptor

The contents of the descriptor can be edited manually, here is an example of its contents:

{
	"FileVersion" : 3,
	
	"FriendlyName" : "MyFirstMod",
	"Version" : 1,
	"VersionName" : "1.0",
	"CreatedBy" : "Tom Looman",
	"CreatedByURL" : "http://www.tomlooman.com",
	"EngineVersion" : "4.9.0",
	"Description" : "My First Mod",
	"Category" : "User Mod",
	"EnabledByDefault" : true,

	"Modules" :
	\[
	\],

	"CanContainContent" : true
}

You can use this example and paste it into a new .uplugin file for creating your own mods.

### Plugin Content

To view and edit UGC or mod content, make sure you enable "Show Plugin Content" in your Content Browser under "View Options" in the bottom right corner. In the sample project from GitHub you should see MyFirstMod as one of the listed Plugins.

[![Mods contentbrowsersettings.jpg](https://d26ilriwvtzlb.cloudfront.net/b/bd/Mods_contentbrowsersettings.jpg)](/File:Mods_contentbrowsersettings.jpg)

Setup Launcher Profiles
-----------------------

[![Mods projectlauncheroverview.png](https://d26ilriwvtzlb.cloudfront.net/e/e2/Mods_projectlauncheroverview.png)](/File:Mods_projectlauncheroverview.png)

To open the launcher (for packaging of the game and mod) go to **Window -> Project Launcher.** At the bottom of the Project Launcher window click the "+" symbol to create your new custom profile. We will need two profiles, one for the base game build, and another for our user mod.

**Important note:** As of right now the profiles don't ship with the project files, but are stored in AppData/Local/UnrealEngine/4.9/Saved/Launcher/. Please use the guide below to setup the profiles.

### Full Game Profile

First we must create a base game build. Mod creators would not need this profile, this is only intended for the developer of the game.

The project is set to "ModSampleGame", using the default AnyProject works just fine too. The "Do you wish to build?" is checked and build configuration for this example is set to "Development" for testing purposes. Normally you'd want to set this to Shipping, however we need to have console commands available to try out our mod. Please keep this in mind for your own project profiles.

[![Mods fullgamecook 01.png](https://d26ilriwvtzlb.cloudfront.net/0/0d/Mods_fullgamecook_01.png)](/File:Mods_fullgamecook_01.png)

First set the cooking dropdown to "By the book" to enable the other options for the Cooking category. For this example we only cook for WindowsNoEditor, using the "en"-culture. We're making a game release so we check "Create a release version of the game for distribution" with the release name of "1.0". Please make sure the other checkboxes match from the image below.

[![Mods fullgamecook 02.png](https://d26ilriwvtzlb.cloudfront.net/f/fe/Mods_fullgamecook_02.png)](/File:Mods_fullgamecook_02.png)

We don't need to deploy and/or remotely store our package:

[![Mods fullgamecook 03.png](https://d26ilriwvtzlb.cloudfront.net/b/b5/Mods_fullgamecook_03.png)](/File:Mods_fullgamecook_03.png)

Now you have setup your full game profile, make sure to add an appropriate name such as "FullGame Release v1.0" with an accurate description. We won't be running the profile just yet as we will first setup our MyFirstMod profile.

### MyFirstMod Profile

This profile is only slightly different from the full game profile. With "build dlc" enabled instead of a new game release. Each mod would have a different profile to package its contents.

The first part is equal to the FullGame:

[![Mods firstmod 01.png](https://d26ilriwvtzlb.cloudfront.net/4/4a/Mods_firstmod_01.png)](/File:Mods_firstmod_01.png)

As you can see, there are some changes to the Cook options below. The "build dlc" is a little confusingly labeled as it's looking for content in the /Plugins/ folder. Make sure you enter the name for the mod to build, this must be the same as the folder name of your /Plugins/**<ModName>**, in the case in our example MyFirstMod. The option "Include engine content" must be disabled. We only want to include whatever is inside our mod folder, if you need engine content you should copy over the content to the Plugins/ModName/ folder instead.

[![Mods firstmod 02.png](https://d26ilriwvtzlb.cloudfront.net/b/bf/Mods_firstmod_02.png)](/File:Mods_firstmod_02.png)

The third section is the same as the full game, we do not copy to any repository and don't deploy to a device.

[![Mods firstmod 03.png](https://d26ilriwvtzlb.cloudfront.net/7/73/Mods_firstmod_03.png)](/File:Mods_firstmod_03.png)

Cooking your first mod
----------------------

First cook our FullGame profile, and repeat the process for the MyFirstMod profile by pressing the Launch key for both, pressing "Done" after the run completes, and repeating for the second profile.

[![Mods cookprofiles.png](https://d26ilriwvtzlb.cloudfront.net/a/a0/Mods_cookprofiles.png)](/File:Mods_cookprofiles.png)

FullGame cook is located at: **ModSampleGame/Saved/StagedBuilds/** You can move this anywhere on your disk.

MyFirstMod is located at: **ModSampleGame/Plugins/MyFirstMod/Saved/StagedBuilds/WindowsNoEditor/ModSampleGame/Content/Paks/**

You can rename the .pak file of the mod so we can move it to our full game ModSampleGame/Content/Paks/ folder. For an example see the included packaged project source from GitHub: **PackagedSampleGame/ModSampleGame/Content/Pak**s/

Loading a mod
-------------

By default additional .pak files are automatically loaded by the game when placed in the /Content/Paks/ folder of your cooked game. You can use a sub-folders (for example "./Content/Paks/Mods/") to organize your custom content. They will still be loaded automatically. In the example below I manually renamed the generated .pak file from the MyFirstMod profile to "MyFirstMod.pak".

[![Mods cookedpakfolder.png](https://d26ilriwvtzlb.cloudfront.net/c/c2/Mods_cookedpakfolder.png)](/File:Mods_cookedpakfolder.png)

To test if our mod was loaded successfully, open the console window using Tilde (~) and type **"open modexamplemap"** you should now be respawned into our custom level, with our custom player that fires three projectiles instead of one when firing the weapon using the left-mouse button.

[![Mods modexample.gif](https://d26ilriwvtzlb.cloudfront.net/3/38/Mods_modexample.gif)](/File:Mods_modexample.gif)

Done!
-----

Now you've seen the process of setting up your first mod for an Unreal Engine 4 game! The pipeline is still a work in progress and will be smoothed out in upcoming engine releases. Now you have a basic pipeline to get you started for UGC support in your own project.

**Please leave your feedback!** We're in the process of improving the pipeline and adding more features to make modding with Unreal Engine 4 as awesome as it can be, leave your comments.

References
----------

*   [GitHub Project Source](https://github.com/tomlooman/ModSampleGame)
*   [Plugins Documentation](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html)
*   [Unreal engine Modding sub-forums](https://forums.unrealengine.com/forumdisplay.php?68-Modding)

**Project & Wiki by [Tom Looman](http://www.tomlooman.com/)**

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Modding:\_Adding\_mod-support\_to\_your\_Unreal\_Engine\_4\_project&oldid=26249](https://wiki.unrealengine.com/index.php?title=Modding:_Adding_mod-support_to_your_Unreal_Engine_4_project&oldid=26249)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Modding Resources](/Category:Modding_Resources "Category:Modding Resources")
*   [Deployment](/index.php?title=Category:Deployment&action=edit&redlink=1 "Category:Deployment (page does not exist)")
*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)