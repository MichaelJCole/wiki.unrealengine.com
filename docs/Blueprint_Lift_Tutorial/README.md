Blueprint Lift Tutorial - Epic Wiki                    

Blueprint Lift Tutorial
=======================

  

Contents
--------

*   [1 Overview](#Overview)
*   [2 Setting up the Level](#Setting_up_the_Level)
*   [3 Matinee](#Matinee)
*   [4 Blueprint](#Blueprint)
    *   [4.1 Commenting](#Commenting)

  

Overview
--------

Lifts and moving platforms can be an integral part of moving your character through a level, and by combining Matinee and Blueprints, it is simple to construct them. Like the _Spotlight Off Switch_ and _Spotlight Toggle Switch_ Level Blueprint examples, this example begins with the template **Blueprint Third Person**. This template contains a camera, a character, and some basic gameplay setup, all in Blueprint format. You can open the existing Blueprints in the game to see how those work.

[![Scene no lift LT.png](https://d26ilriwvtzlb.cloudfront.net/b/b0/Scene_no_lift_LT.png)](/File:Scene_no_lift_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Scene_no_lift_LT.png "Enlarge")

  

Setting up the Level
--------------------

Just to provide a visible objective for the character to reach, a StaticMesh platform has been added above the character's head, with an additional StaticMesh sphere to represent some object the character wants to pick up. **Class Blueprints** would be ideal for adding in-game functionality to objects like this sphere. The platform and sphere do not need to be present for this example to work - they just help to provide context for the lift platform's placement.

We are beginning with the Level Blueprint for this game. Anything currently in a level can be referenced by a Level Blueprint. Therefore, our first step is to put some objects into our level.

1\. From either the **Content Browser** or the **Tools** pane, select the _StaticMesh_ **Shape\_Cube**. Drag this StaticMesh into the level, and place it on the ground somewhere next to the platform your character needs to reach. You can resize the platform to make it a good size to stand on.

[![Scene liftmesh perspective LT.png](https://d26ilriwvtzlb.cloudfront.net/7/7c/Scene_liftmesh_perspective_LT.png)](/File:Scene_liftmesh_perspective_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Scene_liftmesh_perspective_LT.png "Enlarge")

[![Scene liftmesh top LT.png](https://d26ilriwvtzlb.cloudfront.net/c/ca/Scene_liftmesh_top_LT.png)](/File:Scene_liftmesh_top_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Scene_liftmesh_top_LT.png "Enlarge")

  

2\. In the **Details** pane for your _StaticMesh_, rename it to **"LiftPlatform"**.

[![Details liftmesh rename LT.png](https://d26ilriwvtzlb.cloudfront.net/9/9a/Details_liftmesh_rename_LT.png)](/File:Details_liftmesh_rename_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Details_liftmesh_rename_LT.png "Enlarge")

  

3\. Also in the **Details** pane, change the **Mobility** of the _StaticMesh_ to **Moveable**. This will allow your _MatineeActor_ to move the platform.

[![Details liftmesh mobility LT.png](https://d26ilriwvtzlb.cloudfront.net/1/1d/Details_liftmesh_mobility_LT.png)](/File:Details_liftmesh_mobility_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Details_liftmesh_mobility_LT.png "Enlarge")

  

4\. Right-click in the level, and then select **Add Actor > Trigger > Trigger (Box)** to place a **Trigger (Box)** in your level. Align it over your **LiftPlatform**, and resize it so that it is the same size as the platform in the X and Y directions.

An Actor is an object that can be placed or spawned in the level. _Lights, TriggerVolumes, StaticMeshes,_ and _Cameras_ are all examples of Actors.

[![Scene trigger perspective LT.png](https://d26ilriwvtzlb.cloudfront.net/3/31/Scene_trigger_perspective_LT.png)](/File:Scene_trigger_perspective_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Scene_trigger_perspective_LT.png "Enlarge")

  

5\. In the **Scene Outliner** pane, drag and drop the **TriggerBox** entry onto the **LiftPlatform** entry, so that it becomes nested below it. This will attach the **TriggerBox** to the **LiftPlatform**, so that when the _Level Blueprint_ moves the **LiftPlatform**, the **TriggerBox** will move as well.

[![Attach trigger LT.png](https://d26ilriwvtzlb.cloudfront.net/5/5d/Attach_trigger_LT.png)](/File:Attach_trigger_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Attach_trigger_LT.png "Enlarge")

  

6\. Using the **Window** menu in the **Level Editor**, open the **Class Viewer**.

7\. Type _Matinee_ into the **Class Viewer**.

[![Class viewer matinee LT.png](https://d26ilriwvtzlb.cloudfront.net/7/75/Class_viewer_matinee_LT.png)](/File:Class_viewer_matinee_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Class_viewer_matinee_LT.png "Enlarge")

  

8\. Drag and drop a _MatineeActor_ into the level.

[![Matinee dragdrop LT.png](https://d26ilriwvtzlb.cloudfront.net/9/96/Matinee_dragdrop_LT.png)](/File:Matinee_dragdrop_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_dragdrop_LT.png "Enlarge")

  

9\. In the **Details** pane for your new _MatineeActor_, rename it to **"LiftMatinee"**.

[![Details matinee rename LT.png](https://d26ilriwvtzlb.cloudfront.net/5/5e/Details_matinee_rename_LT.png)](/File:Details_matinee_rename_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Details_matinee_rename_LT.png "Enlarge")

  

Matinee
-------

You are going to use this _MatineeActor_ to move the lift platform to its final position.

1\. Click on the **Matinee** button in the **Level Editor** Toolbar and select **LiftMatinee** in the menu that appears.

[![Open matinee LT.png](https://d26ilriwvtzlb.cloudfront.net/4/4c/Open_matinee_LT.png)](/File:Open_matinee_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Open_matinee_LT.png "Enlarge")

  

2\. Click **Continue** on the **Matinee Undo Warning** that appears.

[![Matinee undo warning LT.png](https://d26ilriwvtzlb.cloudfront.net/c/c6/Matinee_undo_warning_LT.png)](/File:Matinee_undo_warning_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_undo_warning_LT.png "Enlarge")

  
The **Matinee Editor** window will open.

[![Matinee editor LT.png](https://d3ar1piqh1oeli.cloudfront.net/8/80/Matinee_editor_LT.png/940px-Matinee_editor_LT.png)](/File:Matinee_editor_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_editor_LT.png "Enlarge")

  

3\. Right-click in the **Group/Track List** of the **Timeline Pane**.

[![Right click area LT.png](https://d26ilriwvtzlb.cloudfront.net/e/ec/Right_click_area_LT.png)](/File:Right_click_area_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Right_click_area_LT.png "Enlarge")

  

4\. Select **Add New Empty Group** in the right-click menu.

[![Add new empty group LT.png](https://d26ilriwvtzlb.cloudfront.net/5/56/Add_new_empty_group_LT.png)](/File:Add_new_empty_group_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Add_new_empty_group_LT.png "Enlarge")

  

5\. Type _LiftGroup_ in the **New Group Name** dialog.

[![New group name LT.png](https://d26ilriwvtzlb.cloudfront.net/d/de/New_group_name_LT.png)](/File:New_group_name_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:New_group_name_LT.png "Enlarge")

  

6\. Switch to the **Level Editor**, and select your **LiftPlatform**.

7\. Return to the **Matinee Editor**. Right-click on **LiftGroup**, then select **Actors > Add Selected Actors** in the right-click menu.

[![Matinee add selected actor LT.png](https://d26ilriwvtzlb.cloudfront.net/9/97/Matinee_add_selected_actor_LT.png)](/File:Matinee_add_selected_actor_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_add_selected_actor_LT.png "Enlarge")

  

8\. Right-click on **LiftGroup** and select **Add New Movement Track**. A **Movement** track will appear below your **LiftGroup** group.

[![Add new movement track LT.png](https://d26ilriwvtzlb.cloudfront.net/3/38/Add_new_movement_track_LT.png)](/File:Add_new_movement_track_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Add_new_movement_track_LT.png "Enlarge")

  

9\. Click on the Timeline and drag left to move the timeline to the left of the green timeline block.

[![Matinee shifted track LT.png](https://d26ilriwvtzlb.cloudfront.net/4/40/Matinee_shifted_track_LT.png)](/File:Matinee_shifted_track_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_shifted_track_LT.png "Enlarge")

  
There is already a red triangle to indicate the first keyframe. Your platform is already in its starting location, so you do not have to edit this first keyframe.

[![Matinee first keyframe LT.png](https://d26ilriwvtzlb.cloudfront.net/5/58/Matinee_first_keyframe_LT.png)](/File:Matinee_first_keyframe_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_first_keyframe_LT.png "Enlarge")

  

10\. Click on the vertical black bar below your first keyframe and drag it to the right, to a time of approximately 1.

[![Drag timeline track LT.png](https://d26ilriwvtzlb.cloudfront.net/b/be/Drag_timeline_track_LT.png)](/File:Drag_timeline_track_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Drag_timeline_track_LT.png "Enlarge")

  

11\. Press **Enter** to create your ending keyframe.

12\. Switch to the Level Editor.

13\. Translate your platform vertically to its final position. A yellow line will appear showing the path the platform will follow.

[![Matinee drag up LT.png](https://d3ar1piqh1oeli.cloudfront.net/a/a8/Matinee_drag_up_LT.png/940px-Matinee_drag_up_LT.png)](/File:Matinee_drag_up_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_drag_up_LT.png "Enlarge")

  
If you disconnect the Matinee Editor tab, and arrange the tabs so that you can see both the Level Editor and the Matinee Window, you can preview the motion of your platform.

[![Matinee preview LT.png](https://d3ar1piqh1oeli.cloudfront.net/c/cc/Matinee_preview_LT.png/940px-Matinee_preview_LT.png)](/File:Matinee_preview_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_preview_LT.png "Enlarge")

  

• Hit **Stop** twice to move playback to the start of your Matinee.

• Use the Play and Reverse controls to play back and reverse your Matinee.

  

Blueprint
---------

At this point, you have completed your Matinee and can close the Matinee Editor. You are now ready to begin assembling your Blueprint.

1\. Select your TriggerBox in the Level Editor.

2\. Click on Level Blueprint in the Level Editor Toolbar.

3\. Right-click in the graph pane. A context menu will pop up, with a search bar to help refine your options.

[![Trigger overlap 1 LT.png](https://d26ilriwvtzlb.cloudfront.net/3/3e/Trigger_overlap_1_LT.png)](/File:Trigger_overlap_1_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Trigger_overlap_1_LT.png "Enlarge")

  
We want something to happen when our character overlaps the Trigger Volume. An overlap is defined as an Actor crossing into the volume of the Trigger.

4\. In the search bar, type _Overlap_.

[![Trigger overlap 2 LT.png](https://d26ilriwvtzlb.cloudfront.net/0/0c/Trigger_overlap_2_LT.png)](/File:Trigger_overlap_2_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Trigger_overlap_2_LT.png "Enlarge")

  

5\. Select Set **OnActorBeginOverlap**.

[![Trigger overlap node LT.png](https://d26ilriwvtzlb.cloudfront.net/4/48/Trigger_overlap_node_LT.png)](/File:Trigger_overlap_node_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Trigger_overlap_node_LT.png "Enlarge")

  
Note here that the _Node_ that pops up has a red title bar. This identifies it as a Event _Node_.

6\. Select your **MatineeActor** in the Level Editor.

7\. Return to the **Level Blueprint**, right-click on the Graph, and select **Add Reference to LiftMatinee**.

[![Add matinee reference LT.png](https://d26ilriwvtzlb.cloudfront.net/b/bb/Add_matinee_reference_LT.png)](/File:Add_matinee_reference_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Add_matinee_reference_LT.png "Enlarge")

  

[![Overlap and matinee LT.png](https://d26ilriwvtzlb.cloudfront.net/f/f6/Overlap_and_matinee_LT.png)](/File:Overlap_and_matinee_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Overlap_and_matinee_LT.png "Enlarge")

  

8\. Drag and drop off of the blue output pin on the **LiftMatinee** reference, and then type _Play_ in the context menu.

[![Graph added play LT.png](https://d26ilriwvtzlb.cloudfront.net/f/fe/Graph_added_play_LT.png)](/File:Graph_added_play_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Graph_added_play_LT.png "Enlarge")

  

9\. Select **Play** under **Call Function > Matinee**.

[![Graph add play LT.png](https://d26ilriwvtzlb.cloudfront.net/0/0c/Graph_add_play_LT.png)](/File:Graph_add_play_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Graph_add_play_LT.png "Enlarge")

  

10\. Connect the output execution pin of the **OnActorBeginOverlap** Node to the input execution pin of the **Play** node.

[![Graph added play LT.png](https://d26ilriwvtzlb.cloudfront.net/f/fe/Graph_added_play_LT.png)](/File:Graph_added_play_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Graph_added_play_LT.png "Enlarge")

  
You have created a lift that will go up when you stand on it and overlap the _TriggerVolume_. For a fully functional, reusable lift, you can set the MatineeActor to reverse whenever you leave the TriggerVolume.

1\. Select your **TriggerBox** in the Level Editor.

2\. Click on **Level Blueprint** in the Level Editor Toolbar.

3\. Right-click in the graph pane. A context menu will pop up, with a search bar to help refine your options.

[![Trigger overlap 1 LT.png](https://d26ilriwvtzlb.cloudfront.net/3/3e/Trigger_overlap_1_LT.png)](/File:Trigger_overlap_1_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Trigger_overlap_1_LT.png "Enlarge")

  
We now want something to happen when our character leaves the Trigger Volume. This is also known as the overlap ending.

4\. In the search bar, type _Overlap_.

[![Trigger overlap 2 LT.png](https://d26ilriwvtzlb.cloudfront.net/0/0c/Trigger_overlap_2_LT.png)](/File:Trigger_overlap_2_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Trigger_overlap_2_LT.png "Enlarge")

  

5\. Select **Set OnActorEndOverlap**.

[![Added end overlap LT.png](https://d26ilriwvtzlb.cloudfront.net/d/d3/Added_end_overlap_LT.png)](/File:Added_end_overlap_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Added_end_overlap_LT.png "Enlarge")

  

6\. Now, drag and drop again off of the blue output pin on the **LiftMatinee** reference. Type Reverse in the context menu.

[![Add reverse LT.png](https://d26ilriwvtzlb.cloudfront.net/8/85/Add_reverse_LT.png)](/File:Add_reverse_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Add_reverse_LT.png "Enlarge")

  

7\. Select Reverse under Call Function > Matinee.

While the output execution pin of a Node cannot be connected to the input execution pin of two different Nodes, Variables and Actor references can be connected to as many Nodes as needed. You may still want duplicate Variable or Actor reference nodes for clarity in large graphs, but there is not a linear execution system enforced for Variable and Actor references.

8\. Connect the output execution pin of the **OnActorEndOverlap** Node to the input execution pin of the **Reverse node**.

[![Lift graph uncommented LT.png](https://d26ilriwvtzlb.cloudfront.net/b/bc/Lift_graph_uncommented_LT.png)](/File:Lift_graph_uncommented_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Lift_graph_uncommented_LT.png "Enlarge")

  
At this point, the Blueprint will work. If you **Compile** the _Level Blueprint_ and then play the game in the Level Editor, running onto the platform will cause the platform to move upwards to its final location, and leaving the platform will make it reverse to its starting position.

  

### Commenting

You can also comment your Blueprint graph so that going forward, it will be easy to know what each part of your graph does, and to keep your Blueprints organized.

1\. Click and drag to select the five nodes you have added to the _Level Blueprint_.

[![Platform selected LT.png](https://d26ilriwvtzlb.cloudfront.net/e/e9/Platform_selected_LT.png)](/File:Platform_selected_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Platform_selected_LT.png "Enlarge")

  

2\. Right-click in the graph pane and select **Create Comment from Selection**.

[![Comment 2 LT.png](https://d26ilriwvtzlb.cloudfront.net/d/d1/Comment_2_LT.png)](/File:Comment_2_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Comment_2_LT.png "Enlarge")

  

3\. Type _Lift Mechanism_ in the comment box that appears.

[![Platform name comment LT.png](https://d26ilriwvtzlb.cloudfront.net/4/47/Platform_name_comment_LT.png)](/File:Platform_name_comment_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Platform_name_comment_LT.png "Enlarge")

  
You have now successfully commented your Blueprint nodes.

[![Final lift bp LT.png](https://d26ilriwvtzlb.cloudfront.net/2/2a/Final_lift_bp_LT.png)](/File:Final_lift_bp_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Final_lift_bp_LT.png "Enlarge")

  
By clicking on the comment box and dragging, you can drag all related nodes around in the **Graph** tab. The comment box title also scales as you zoom, so that even at a distance, you can locate your Lift Mechanism if you need to edit it.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Lift\_Tutorial&oldid=6541](https://wiki.unrealengine.com/index.php?title=Blueprint_Lift_Tutorial&oldid=6541)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Cinematic](/Category:Cinematic "Category:Cinematic")
*   [Matinee](/Category:Matinee "Category:Matinee")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)