Animation Retargeting Tips For You - Epic Wiki                    

Animation Retargeting Tips For You
==================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Step 1](#Step_1)
*   [3 Set Rig for Both Skeletons](#Set_Rig_for_Both_Skeletons)
*   [4 Set the Pose](#Set_the_Pose)
*   [5 Match all the Bones You Can](#Match_all_the_Bones_You_Can)
*   [6 Creating the Anims](#Creating_the_Anims)
*   [7 Epic Tutorial](#Epic_Tutorial)
*   [8 Summary](#Summary)

Overview
--------

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here are my tips for using Epic's awesome new Animation Retargeting system, created by Lina Halper!

Step 1
------

Step one is to have the Epic Skeleton, you can create a new Third Person template project to obtain it!

Set Rig for Both Skeletons
--------------------------

1\. Create the Rig based on the Epic skeleton.

2\. and then make sure that set your Rig asset on both the Epic Skeleton and your own custom skeleton.

You set the rig by going into the Retargeting Manager for both Epic Skeleton and your own custom skeleton :)

Set the Pose
------------

1\. In your custom skeleton open the retarget animation manager,

2\. and go to the bottom of the panel and click on "View Pose"

3\. Now click on Show->Bones and adjust your skeleton to take on the T Pose with legs together.

4\. Make sure your character's arms are exactly in T Pose from top view and front view!, not coming forward or backward even a little.

5\. Make sure to then click "Save Pose" to register your adjustments to match Epic Skeleton's T pose.

 If you have any animation retargeting errors it will most likely be because your pose is not set correctly!

Match all the Bones You Can
---------------------------

In your character's anim retargeting manager, match up all the bone names that you can, making sure to include the special skeletal controller ones at the end.

Creating the Anims
------------------

1\. Select as many of the animations as you want that use the Epic Skeleton, and right click and click on retarget.

2\. Select your custom character's skeleton

3\. After the retageting has finished go find where your character's skeleton is in your content folder and that's where the new anims will be!

Epic Tutorial
-------------

[Epic Tutorial: Retargeting Different Skeletons](https://docs.unrealengine.com/latest/INT/Engine/Animation/RetargetingDifferentSkeletons/index.html)

Summary
-------

That's all there is to it!

Again the polish and refinement of this process is mostly in making sure you setup the T pose properly and exactly within your custom skeleton's retargeting manager.

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Animation\_Retargeting\_Tips\_For\_You&oldid=9875](https://wiki.unrealengine.com/index.php?title=Animation_Retargeting_Tips_For_You&oldid=9875)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)