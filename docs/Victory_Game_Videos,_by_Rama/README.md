Victory Game Videos, by Rama - Epic Wiki                    

Victory Game Videos, by Rama
============================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Rama's C++ AI Jumping Videos](#Rama.27s_C.2B.2B_AI_Jumping_Videos)
*   [3 Multiple Selection](#Multiple_Selection)
    *   [3.1 Video](#Video)
*   [4 Undo Feature](#Undo_Feature)
    *   [4.1 Video](#Video_2)
*   [5 Moveable Destroyable Meshes](#Moveable_Destroyable_Meshes)
    *   [5.1 Video](#Video_3)
*   [6 Per-Bone Sword Collision](#Per-Bone_Sword_Collision)
    *   [6.1 Video](#Video_4)
*   [7 Summary](#Summary)

Overview
--------

_Sole Developer of This Project and All Code:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

  
Dear Community,

Victory game has been my own personal coding project in UE4 for many months!

I have been steadily building an in-game editor that is specific to my project, enabling users to make their own game world.

The focal points of my Victory Game are:

*   Action
*   Puzzle Solving
*   Platforming
*   Endless Replay Value Via In-Game Editor

  
While I ultimately plan to make levels for release with my game, I am mainly focused on building the editor so that users can make their own worlds with my editor and share them with each other!

The typical file size for one of my levels is less than 1 kb, so users will be able to share files via email, or even an iphone! Hee hee!

Rama's C++ AI Jumping Videos
----------------------------

I've been training the UE4 pathing system to dynamically calculate jumping decisions using just C++! No helpers in the editor!

In this video I prove to you that I am using just C++ to do all the calculations!

More Rama AI Jumping Videos [https://forums.unrealengine.com/showthread.php?25410-Rama-s-Multi-Threaded-Dynamic-Pathing-System-Full-Physics-Support&p=251216&viewfull=1#post251216](https://forums.unrealengine.com/showthread.php?25410-Rama-s-Multi-Threaded-Dynamic-Pathing-System-Full-Physics-Support&p=251216&viewfull=1#post251216)

Multiple Selection
------------------

The most recent feature I've added to my editor is multiple selection!

The first selected actor becomes the pivot point for all rotations, scaling, and transforms :)

### Video

Undo Feature
------------

I have a fully function undo feature for my game!

It handles both individual undo events, as well as group undo when using multiple selection.

My undo system can also handle any editor action you can do with my in-game editor!

Here's a video demoing undo feature for

*   translation
*   creation of meshes
*   changing material of meshes

### Video

Moveable Destroyable Meshes
---------------------------

I wrote my own custom code for a physics actor that can be destroyed into Apex physics pieces!

Notice in the video how the **player character can stand on the physics object** while it is simulating physics, before it is destroyed!

### Video

Per-Bone Sword Collision
------------------------

In my project I have developed an CPU-efficient sword collision system!

This sword collision system can do **per-bone collision checks**!

**Make sure to see the very end of the video** where I clearly demonstrate that the sword collision is occurring per-bone!

The big skeletal's collision capsule is being penetrated but the skeleton only takes damage when the big skeletons **idle animation** brings its hand bone into range.

### Video

  

Summary
-------

I hope you've enjoyed checking out my videos!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Victory\_Game\_Videos,\_by\_Rama&oldid=12608](https://wiki.unrealengine.com/index.php?title=Victory_Game_Videos,_by_Rama&oldid=12608)"

[Categories](/Special:Categories "Special:Categories"):

*   [Showcases](/Category:Showcases "Category:Showcases")
*   [Community Videos](/Category:Community_Videos "Category:Community Videos")

  ![](https://tracking.unrealengine.com/track.png)