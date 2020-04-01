Plugins, How To Package Custom Plugins With Your Game - Epic Wiki                    

Plugins, How To Package Custom Plugins With Your Game
=====================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 1\. Must Be Engine Plugin](#1._Must_Be_Engine_Plugin)
*   [3 2\. Must Pre-Compile For All Destination Platforms](#2._Must_Pre-Compile_For_All_Destination_Platforms)
*   [4 3\. Must Be Listed as Installed in .uplugin](#3._Must_Be_Listed_as_Installed_in_.uplugin)
*   [5 Troubleshooting for Buyers of Plugins](#Troubleshooting_for_Buyers_of_Plugins)
*   [6 Conclusion](#Conclusion)

Overview
--------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Hi there!

After upgrading my [Victory Plugin](https://forums.unrealengine.com/showthread.php?3851-(39)-Rama-s-Extra-Blueprint-Nodes-for-You-as-a-Plugin-No-C-Required!) to 4.11 I realized the rules have changed regarding how to package a custom plugin with any project.

Here are the rules as I now understand them!

1\. Must Be Engine Plugin
-------------------------

You can develop your plugin at the project level, but for people without C++ access to be able to package it, you must move it to the Engine/Plugins directory for the appropriate engine version.

Make sure you put runtime plugins in **Engine/Plugins/Runtime**

2\. Must Pre-Compile For All Destination Platforms
--------------------------------------------------

Via the .sln file in Visual Studio you must do a full rebuild for all destination platforms that you want to support, generating the appropriate files under Binaries for your plugin.

So if you want to package for Development (Game) x64 you must compile in Visual Studio, prior to packaging in the Editor.

3\. Must Be Listed as Installed in .uplugin
-------------------------------------------

Open your .uplugin in a text editor and make sure that Installed is set to be true!

 "Installed": true,	

**Your plugin will not package unless this is set to true! -Rama**

Troubleshooting for Buyers of Plugins
-------------------------------------

If you bought a plugin that is not packaging, you can do Step 1 and Step 3 yourself!

Make sure your plugin is moved to the engine folder as mentioned above, and make sure that Installed is set to true in the .uplugin.

If the plugin provider did not precompile the .lib files you should ask them to do so.

Conclusion
----------

I hope you found this wiki very helpful for your plugin development and packaging process!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Plugins,\_How\_To\_Package\_Custom\_Plugins\_With\_Your\_Game&oldid=17818](https://wiki.unrealengine.com/index.php?title=Plugins,_How_To_Package_Custom_Plugins_With_Your_Game&oldid=17818)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)