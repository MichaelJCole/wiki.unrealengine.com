Behavior Tree Utility Plugin - Epic Wiki                    

Behavior Tree Utility Plugin
============================

  

Name

Behavior Tree Utility Plugin

Category

AI

Author

Cameron Angus (kamrann)

Version

1.0

UE4 Build

4.9+

Overview
--------

This plugin extends the UE4 behavior tree with a new node, the 'Utility Selector'. Essentially, this works like the existing 'Selector' node but instead of prioritizing children left to right, it allows prioritization based on a utility value. By attaching special decorators to the child nodes, their utility value can be set as a constant, retrieved from the blackboard, or calculated dynamically in a blueprint. The selector can then be configured to either always choose the child with the highest utility value at the time, or to weight selection proportionally.

This gives more control over when an AI should execute which behavior, and makes it very easy to incorporate variety and randomness into behaviors.

A forum thread for the plugin is [here](https://forums.unrealengine.com/showthread.php?91074-Behavior-Tree-Extension-Select-behaviors-based-on-dynamic-priority-weighting).

Downloads
---------

Get the plugin [here](https://www.dropbox.com/sh/xenxhd77qtlzfnn/AADhcR2GydJZGOHLrmWWujRKa?dl=0). Just unzip into YourProject/Plugins, load up your project, and the new nodes should be available in the behavior tree editor automatically.

Source code is [here](https://github.com/kamrann/BTUtilityPlugin). A simple example project using the plugin is also available [here](https://github.com/kamrann/BTUtilityPluginExample) (4.10+ only).

Example BT
----------

[![BTUtilityExampleImage.png](https://d26ilriwvtzlb.cloudfront.net/a/af/BTUtilityExampleImage.png)](/File:BTUtilityExampleImage.png)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Behavior\_Tree\_Utility\_Plugin&oldid=16611](https://wiki.unrealengine.com/index.php?title=Behavior_Tree_Utility_Plugin&oldid=16611)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)