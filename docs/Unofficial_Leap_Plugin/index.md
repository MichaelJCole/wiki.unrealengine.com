Unofficial Leap Plugin - Epic Wiki                    

Unofficial Leap Plugin
======================

  

Name

Unofficial Leap Motion Plugin

Category

Input

Author

Getnamo

Overview
========

An event-driven Leap Motion plugin for the Unreal Engine 4.

Main method of use is by subscribing to events within your blueprint, but it also supports polling through functions called on the LeapController for up to the 60 past frames. You can extend functionality to any blueprint through adding the LeapInterfaceEvent interface then adding the LeapController component to that blueprint. This same architecture is available to C++ if you prefer, which also supports both event-driven and polling style use.

See the [main plugin thread](https://forums.unrealengine.com/showthread.php?49107-Plugin-Leap-Motion-Event-Driven) for version downloads and development updates.

Quick Setup
-----------

1.  Download latest from [Github](https://github.com/getnamo/leap-ue4)
2.  Create new or choose project.
3.  Browse to your project folder (typically found at _Documents/Unreal Project/{Your Project Root}_)
4.  Copy _Plugins_ and _Binaries_ folder into your Project root.
5.  (Optional) Copy _Content_ folder into your Project root if you want to use the convenience rigged or debug content.
6.  Restart the Editor and open your project again.
7.  When your project has reloaded, the plugin should be enabled and ready to use.

How to use
----------

For all other detailed use case please see the up-to-date [Github Readme](https://github.com/getnamo/leap-ue4/blob/master/README.md).

Contact
-------

Post your questions and suggestions at the [main plugin thread](https://forums.unrealengine.com/showthread.php?49107-Plugin-Leap-Motion-Event-Driven).

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Unofficial\_Leap\_Plugin&oldid=10499](https://wiki.unrealengine.com/index.php?title=Unofficial_Leap_Plugin&oldid=10499)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)