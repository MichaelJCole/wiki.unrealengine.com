Blueprint Behavior Tree Tutorial - Epic Wiki                    

Blueprint Behavior Tree Tutorial
================================

**Rate this Page:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (5 votes)

Approved for Versions:4.5.0

Contents
--------

*   [1 Overview](#Overview)
*   [2 Scene Setup](#Scene_Setup)
*   [3 Creating the AIController](#Creating_the_AIController)
*   [4 Creating the AICharacter](#Creating_the_AICharacter)
*   [5 Creating the BlackBoard Data Asset](#Creating_the_BlackBoard_Data_Asset)
*   [6 Creating the Behavior Tree](#Creating_the_Behavior_Tree)
*   [7 Creating a Task](#Creating_a_Task)
*   [8 Setting Up the Behavior](#Setting_Up_the_Behavior)
*   [9 Spawning the AI](#Spawning_the_AI)
*   [10 Extras](#Extras)
*   [11 Useful Links](#Useful_Links)

Overview
========

This tutorial serves as a basic introduction for how to create a working AI character that uses a Behavior Tree to execute Blueprint Tasks.

Scene Setup
===========

1\. Launch Latest version of Unreal Engine

2\. Create a new Project. Select “Top Down”

3\. Name project something like “MyBehaviorTree” and press “Create Project” Button.

4\. Next add a NavMeshBoundsVolume to the scene and scale it to encompass the playspace. This volume is responsible to building navmesh that the AI will use to navigate.

[![Tut Rev 01.png](https://d3ar1piqh1oeli.cloudfront.net/9/9a/Tut_Rev_01.png/400px-Tut_Rev_01.png)](/File:Tut_Rev_01.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Rev_01.png "Enlarge")

Note: **P** toggles path visibility

[![Tut Rev 02.png](https://d3ar1piqh1oeli.cloudfront.net/c/cb/Tut_Rev_02.png/400px-Tut_Rev_02.png)](/File:Tut_Rev_02.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Rev_02.png "Enlarge")

Creating the AIController
=========================

Create a new _Blueprint_ that uses the _AIController_ class as its parent and name it _BasicAIController_

[![Tut 01.png](https://d26ilriwvtzlb.cloudfront.net/d/d7/Tut_01.png)](/File:Tut_01.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_01.png "Enlarge")

Creating the AICharacter
========================

Create a new _Blueprint_ that uses the _Character_ class as its parent and name it _BasicAICharacter_

[![BBT CreateAICharacter.JPG](https://d3ar1piqh1oeli.cloudfront.net/7/7f/BBT_CreateAICharacter.JPG/400px-BBT_CreateAICharacter.JPG)](/File:BBT_CreateAICharacter.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:BBT_CreateAICharacter.JPG "Enlarge")

Open the newly created Character Blueprint and set its default AIController Class to the one your created in the previous step, _(BasicAIController)_

[![BBT SettingAIController.jpg](https://d3ar1piqh1oeli.cloudfront.net/3/35/BBT_SettingAIController.jpg/400px-BBT_SettingAIController.jpg)](/File:BBT_SettingAIController.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:BBT_SettingAIController.jpg "Enlarge")

Finally add a _mesh_ component to the Character Blueprint so we can see the character (\*Note: Creating the AI Character automatically adds skeletal mesh under components, however, you can still add a static mesh component and ignore the skeletal mesh icon -but you cannot remove the skeletal mesh from the component list.)

[![Tut Rev 03.png](https://d3ar1piqh1oeli.cloudfront.net/7/77/Tut_Rev_03.png/400px-Tut_Rev_03.png)](/File:Tut_Rev_03.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Rev_03.png "Enlarge")

Creating the BlackBoard Data Asset
==================================

Create a new _BlackBoard_ Data Asset. This is done by right clicking inside the content browser then selecting Miscellaneous and then -> _BlackBoardD_ (Name this asset _BasicAIBlackboard_ )

[![Tut 03.png](https://d3ar1piqh1oeli.cloudfront.net/0/0b/Tut_03.png/400px-Tut_03.png)](/File:Tut_03.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_03.png "Enlarge")

  
The BlackBoard asset allows you to store information in keys that can then be used by the Behavior Tree. Create a key named _TargetPoint_ and set its Key Type to _Vector._

[![Tut Rev 04.png](https://d3ar1piqh1oeli.cloudfront.net/a/a6/Tut_Rev_04.png/400px-Tut_Rev_04.png)](/File:Tut_Rev_04.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Rev_04.png "Enlarge")

Creating the Behavior Tree
==========================

*   In versions of UE4 before 4.5 you must first enable it in _Edit_ --> _Editor Preferences_ --> _Experimental_

[![BBT CreateBehaviorTree 02.jpg](https://d3ar1piqh1oeli.cloudfront.net/e/ed/BBT_CreateBehaviorTree_02.jpg/400px-BBT_CreateBehaviorTree_02.jpg)](/File:BBT_CreateBehaviorTree_02.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:BBT_CreateBehaviorTree_02.jpg "Enlarge")

In UE4.5, however, you no longer need to perform the previous step and can easily create a new Behavior Tree from the Content Browser as shown:

[![Tut 05.png](https://d3ar1piqh1oeli.cloudfront.net/9/96/Tut_05.png/400px-Tut_05.png)](/File:Tut_05.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_05.png "Enlarge")

*   Name this asset _BasicBehaviorTree._

At this stage you should have the following 4 assets created.

_BasicAiBlackBoard,_ _BasicAICharacter,_ _BasicAIController,_ and _BasicBehaviorTree_

[![Tut Rev 06.png](https://d3ar1piqh1oeli.cloudfront.net/8/88/Tut_Rev_06.png/200px-Tut_Rev_06.png)](/File:Tut_Rev_06.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Rev_06.png "Enlarge")

Creating a Task
===============

We are going to create a simple Task for the Behavior Tree to execute. Create a new Blueprint using _BTTask\_BlueprintBase_ as its parent. Name this _BasicTask_

[![BBT CreateTask 01.JPG](https://d3ar1piqh1oeli.cloudfront.net/4/4f/BBT_CreateTask_01.JPG/400px-BBT_CreateTask_01.JPG)](/File:BBT_CreateTask_01.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:BBT_CreateTask_01.JPG "Enlarge")

Next open up the created Task blueprint and go to its _EventGraph_. We need a _Receive Execute_ event for when the task is called by the behavior tree and a _Finish Execute_ event that returns success or failure upon task completion. Everything in between is task logic.

[![BBT TaskCreation 02.JPG](https://d3ar1piqh1oeli.cloudfront.net/c/cc/BBT_TaskCreation_02.JPG/400px-BBT_TaskCreation_02.JPG)](/File:BBT_TaskCreation_02.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:BBT_TaskCreation_02.JPG "Enlarge")

Before we fill in the logic for this task we need to create a public variable of type BlackboardKeySelector to store the random location that we find. **Note**: To create a public variable, make sure that the eye icon beside the variable is highlighted yellow and open. Do so by left clicking the icon. Name this Variable _Destination_

[![Behavior 11.png](https://d26ilriwvtzlb.cloudfront.net/0/0b/Behavior_11.png)](/File:Behavior_11.png)

[![](/skins/common/images/magnify-clip.png)](/File:Behavior_11.png "Enlarge")

  
We want this task to take the AI Characters current worldspace location and find a random point within a set radius. So we get the Actors current location, find a random point within a specified radius, and then set the BlackBoard value to that location. Make sure to set the Radius of the Get Random Point in Radius to something large, like 2000, or else the AI may just be told to move an inch and therefore ignore the instruction. \*Note: Make sure _Success_ is checked under "Task Completion."

[![Behavior 12.png](https://d3ar1piqh1oeli.cloudfront.net/1/12/Behavior_12.png/500px-Behavior_12.png)](/File:Behavior_12.png)

[![](/skins/common/images/magnify-clip.png)](/File:Behavior_12.png "Enlarge")

Setting Up the Behavior
=======================

Open up the Behavior Tree and set it to use your created BlackBoard Asset

[![BBT CreateBehaviorTree 01.jpg](https://d3ar1piqh1oeli.cloudfront.net/6/68/BBT_CreateBehaviorTree_01.jpg/500px-BBT_CreateBehaviorTree_01.jpg)](/File:BBT_CreateBehaviorTree_01.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:BBT_CreateBehaviorTree_01.jpg "Enlarge")

When the Behavior Tree is run it begins at the root and proceeds down the hierarchy executing tasks and returning successes or failures. For our simple wander example we are going to drag out from the bottom of the Root node and create a Sequence. From the bottom of the Sequence we are going to drag out and expand the tasks dropdown. Select the Blueprint Task _Destination_ we created in the previous step. Then from the same sequence node drag out again and select the Move To _TargetPoint._ Your behavior tree should now look like this.

[![Behavior 13.png](https://d3ar1piqh1oeli.cloudfront.net/a/a7/Behavior_13.png/500px-Behavior_13.png)](/File:Behavior_13.png)

[![](/skins/common/images/magnify-clip.png)](/File:Behavior_13.png "Enlarge")

*   IMPORTANT: Note that the acceptable radius here needs to be set to much lower, like 10 to 20, than the value we set up earlier for the AI Character’s current world space when we set the Radius of the Get Random Point in Radius to around 2000. Setting the value too high here will result in the AI Character not moving at all.

  
Now, to run the Behavior Tree we have to call it from the AI Controller so in the Graph of your Blueprint AI Controller create the following:

[![BBT Behavior 02.JPG](https://d3ar1piqh1oeli.cloudfront.net/4/48/BBT_Behavior_02.JPG/600px-BBT_Behavior_02.JPG)](/File:BBT_Behavior_02.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:BBT_Behavior_02.JPG "Enlarge")

Please note to select the Behaviour Tree asset from the drop-down box.

This will begin the Behavior Tree Simulation as soon as the Begin Play event is called.

Spawning the AI
===============

The 2 easiest ways to preview the AI are to either place the AI Character blueprint in the level or use spawn actor in the level blueprint to create an instance of it.

  

[![Tut Rev 07.png](https://d3ar1piqh1oeli.cloudfront.net/b/ba/Tut_Rev_07.png/400px-Tut_Rev_07.png)](/File:Tut_Rev_07.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Rev_07.png "Enlarge")

Extras
======

To get your AI character to rotate based on movement enter the **BasicAICharacter>Defaults** tab. Find Use _Controller Rotation Yaw_ and set this to false. Open the **Components** tab and find the Character Movement. Find _Orient Rotation to Movement_ and set it to true.

Useful Links
============

[In Depth Behavior Tree Thread](https://forums.unrealengine.com/showthread.php?130-Behavior-Tree-Tutorial)

[Video Tutorial for setting up a similar behavior tree system](http://www.twitch.tv/ueschool/c/4038638)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Behavior\_Tree\_Tutorial&oldid=9988](https://wiki.unrealengine.com/index.php?title=Blueprint_Behavior_Tree_Tutorial&oldid=9988)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)