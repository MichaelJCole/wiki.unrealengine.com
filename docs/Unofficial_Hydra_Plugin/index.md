Unofficial Hydra Plugin - Epic Wiki                    

Unofficial Hydra Plugin
=======================

  

Name

Unofficial Razer Hydra Plugin

Category

Input

Author

Getnamo

Overview
========

An Unofficial Razer Hydra Plugin for Unreal Engine 4

The plugin is designed with an event driven architecture through a delegate interface. You can access device events through Blueprintable classes provided or through C++. Main C++ support is from inheriting the HydraDelegate, through it you can extend your own custom class to support Hydra events. Additional functions in the delegate support polling for latest data.

The plugin also handles hot plugging and emits HydraPluggedIn (HydraUnplugged for the reverse), allowing you to initialize if needed when the device is ready.

Main [discussion thread](https://forums.unrealengine.com/showthread.php?3505-Razer-Hydra-Plugin)

**See [Github Readme](https://github.com/getnamo/hydra-ue4/blob/master/README.md) for up-to-date instructions**

Quick Setup
-----------

1.  Download latest from [Github](https://github.com/getnamo/hydra-ue4)
2.  Create new or choose project.
3.  Browse to your project folder (typically found at _Documents/Unreal Project/{Your Project Root}_)
4.  Copy _Plugins_ folder into your Project root.
5.  Restart the Editor and open your project again.
6.  When your project has reloaded, the plugin should be enabled and ready to use.

Input Mapping
-------------

1.  For a good example start with a template project.
2.  Add a HydraComponent and HydraInterface to a blueprint of your choice or just place a HydraPluginActor in your scene.
3.  Select Edit->Project Settings.
4.  Select Engine->Input
5.  Under Action Mappings and Axis Mappings expand the category you wish to add controller movement to. For example if you want to add Forward motion in the standard 3rd person template, click the + sign in MoveForward.
6.  Change None to the binding you want and adjust the scale to fit. If for example you wanted this to happen when you pitch your left hydra down you would select Hydra Left Rotation Pitch with a scale of say -2.0 to have snappier controls.
7.  Play and test your scaling, adjust as needed.

How to use
----------

For all other detailed use case please see the up-to-date [Github Readme](https://github.com/getnamo/hydra-ue4/blob/master/README.md).

Contact
-------

Post your questions and suggestions at the [main forum thread](https://forums.unrealengine.com/showthread.php?3505-Razer-Hydra-Plugin).

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Unofficial\_Hydra\_Plugin&oldid=17237](https://wiki.unrealengine.com/index.php?title=Unofficial_Hydra_Plugin&oldid=17237)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)