Blueprint Manual Level Streaming - Epic Wiki                    

Blueprint Manual Level Streaming
================================

  

Contents
--------

*   [1 Overview](#Overview)
*   [2 Setting up the Level](#Setting_up_the_Level)
*   [3 Blueprint Level Streaming](#Blueprint_Level_Streaming)
*   [4 Summary](#Summary)

  

Overview
--------

Level Streaming is a necessary part of any game that contain many varied levels which need to be seamlessly connected. This tutorial explains how to setup a Level Streaming solution that is entirely **Blueprint** based. This tutorial is also showing the transition between two levels using a hallway separated by two doors. Most of what is shown here is covered in the **Content Example - Level Streaming Level**.

Setting up the Level
--------------------

1\. The very first thing that you need to do is open the **Levels Window**, this is located in the menu under **Window/Levels**

[![](https://d26ilriwvtzlb.cloudfront.net/5/53/Menu_WindowLevels.png)](/File:Menu_WindowLevels.png)

Levels Window menu location.

[![](https://d26ilriwvtzlb.cloudfront.net/f/f3/WindowLevels_Empty.png)](/File:WindowLevels_Empty.png)

Empty Levels Window.

2\. _Right-click_ in the **Levels Window** and select Add Level to add as many levels as needed. You might want to distribute your sublevels into subfolders that logically divides your world.

[![](https://d26ilriwvtzlb.cloudfront.net/0/09/WindowLevels_Create.png)](/File:WindowLevels_Create.png)

Create New Levels.

3\. Notice which level is the **Current Level** in the **Levels Window**, as you add actors to your scene they will be added to the **Current Level**. Now build your world as you normally would and take care of placing actors in the right levels. If you accidentally place an actor in the wrong level you can easily reassign it by selecting the actor and right-clicking on the level in the level window and selecting **Move Selected Actors to Level**/

Blueprint Level Streaming
-------------------------

By now your level should be ready so it is time to add **Level Streaming**.

1\. Since we are using a connecting hallway between the two levels we first need to add the actors representing that hallway. In this tutorial I am using two floor tiles rotated vertically that will slide down into the floor when approached. These doors were made their own blueprints and they contain an editable **Level** name variable. This was done to have the trigger volume animated door and level streaming in a single blueprint. Each door belongs to a different level, the door on the left is part of the silver floor tile level and the door on the right is part of the red floor tile level.

[![](https://d26ilriwvtzlb.cloudfront.net/a/a9/SlidingDoors.png)](/File:SlidingDoors.png)

Back to back sliding doors separating two levels.

[![](https://d26ilriwvtzlb.cloudfront.net/d/d0/SlidingDoors_Blueprint.png)](/File:SlidingDoors_Blueprint.png)

Blueprint part used to make the door slide. Play and Reverse are connected to Begin and End overlap of a trigger volume.

2\. To Load a level set up a door containing a trigger volume that triggers on begin and end overlap. The volume extends in-front and behind the door. When the player enters the volume an **Open Door Event** is triggered. This event calls **Load Stream Level** passing in the _Name_ of the level to stream in. When a player leaves the volume the **Close Door Event** is called and this event is only connected to the Reverse connection of the timeline. Level unloading is done outside of the sliding door.

[![](https://d26ilriwvtzlb.cloudfront.net/e/ee/SlidingDoors_Blueprint_Streaming.png)](/File:SlidingDoors_Blueprint_Streaming.png)

Level Streaming Blueprint.

3\. To unload the previous level, place another trigger volume outside the door. When the player leaves the hallway he will trigger the unloading of the previous section.

[![](https://d26ilriwvtzlb.cloudfront.net/8/82/Unload_Trigger_Volume.png)](/File:Unload_Trigger_Volume.png)

Unload Trigger Volume.

[![](https://d26ilriwvtzlb.cloudfront.net/7/7b/Unload_Trigger_Volume_Blueprint.png)](/File:Unload_Trigger_Volume_Blueprint.png)

Unload Trigger Volume Blueprint.

Summary
-------

That is all there is to it. For a blueprint only solution to level streaming using a set of two doors you only need four separate triggers. Two to load and open the doors and to outside to unload the other level.

[Blueprint Level Streaming - VIDEO](https://www.youtube.com/watch?v=W93LqDGDHwY)  
  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Manual\_Level\_Streaming&oldid=4138](https://wiki.unrealengine.com/index.php?title=Blueprint_Manual_Level_Streaming&oldid=4138)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [LevelStreaming](/index.php?title=Category:LevelStreaming&action=edit&redlink=1 "Category:LevelStreaming (page does not exist)")

  ![](https://tracking.unrealengine.com/track.png)