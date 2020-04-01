 Blueprint Automated Door Tutorial - Epic Wiki             

 

Blueprint Automated Door Tutorial
=================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

  

Contents
--------

*   [1 Overview](#Overview)
*   [2 Initial Setup](#Initial_Setup)
    *   [2.1 New Blueprint](#New_Blueprint)
    *   [2.2 Mesh Components](#Mesh_Components)
    *   [2.3 Box Component](#Box_Component)
    *   [2.4 Level Testing](#Level_Testing)
    *   [2.5 Initial Event](#Initial_Event)
    *   [2.6 Timeline Setup](#Timeline_Setup)
    *   [2.7 Testing and Debugging](#Testing_and_Debugging)
    *   [2.8 Closing the Door](#Closing_the_Door)
    *   [2.9 Adjusting Motion](#Adjusting_Motion)
    *   [2.10 Chapter 1: Troubleshooting](#Chapter_1:_Troubleshooting)
*   [3 Scale Controls](#Scale_Controls)
    *   [3.1 Adding a Scale Control](#Adding_a_Scale_Control)
    *   [3.2 Finalizing Scale Control](#Finalizing_Scale_Control)
    *   [3.3 Chapter 2: Troubleshooting](#Chapter_2:_Troubleshooting)
*   [4 Overrides](#Overrides)
    *   [4.1 Mesh Overrides](#Mesh_Overrides)
    *   [4.2 Material Override](#Material_Override)
    *   [4.3 Chapter 3: Troubleshooting](#Chapter_3:_Troubleshooting)
*   [5 Organizing and Commenting](#Organizing_and_Commenting)
    *   [5.1 Custom Events and Organization](#Custom_Events_and_Organization)
    *   [5.2 Commenting](#Commenting)
    *   [5.3 Collapsing Nodes](#Collapsing_Nodes)
    *   [5.4 Chapter 4: Troubleshooting](#Chapter_4:_Troubleshooting)
*   [6 Making a Useable Door](#Making_a_Useable_Door)
    *   [6.1 Enabling Input](#Enabling_Input)
    *   [6.2 Key Events](#Key_Events)
    *   [6.3 Finalizing Use Controls](#Finalizing_Use_Controls)
    *   [6.4 Chapter 5: Troubleshooting](#Chapter_5:_Troubleshooting)
*   [7 Creating a Door Counter](#Creating_a_Door_Counter)
    *   [7.1 Custom Interface](#Custom_Interface)
    *   [7.2 Making the Counter Blueprint](#Making_the_Counter_Blueprint)
    *   [7.3 Blueprint Actor Setup](#Blueprint_Actor_Setup)
    *   [7.4 Chapter 6: Troubleshooting](#Chapter_6:_Troubleshooting)

Overview
--------

In this first series of Blueprint tutorials, we take a look at how to modularly tackle a basic level designer function - an automated door.

[![DoorFinal DT.png](https://d26ilriwvtzlb.cloudfront.net/d/db/DoorFinal_DT.png)](/index.php?title=File:DoorFinal_DT.png)

  
All chapters of this tutorial are designed to build upon one another. In order to complete Chapter 4, for example, you need to have completed Chapters 1, 2, and 3.

_**Assets**_

For the purposes of this tutorial, we will be using the **Blueprint Third Person** project.

This tutorial also makes use of a few static meshes, materials, and textures. These are all available within this zip file:

[Automated Door uAssets](https://d26ilriwvtzlb.cloudfront.net/c/c6/Door.zip "Door.zip")

UPDATE: The Door.zip file linked above has a few material assets missing. You may download the following zip file ([https://www.dropbox.com/s/194bbfyp4x87es8/Door\_FulllAssets.zip?dl=0](https://www.dropbox.com/s/194bbfyp4x87es8/Door_FulllAssets.zip?dl=0)) which contains the missing materials as well as the completed blueprints. This has been tested on the latest UE4 release i.e. UE v 4.12.5.

Once you've downloaded the zip file, open up the Project Folder of the Blueprint Third Person project you've created and extract the contents into the folder.

_**Target Audience**_

As this is a base-level introduction, very little is assumed of the user's experience. Ideally, you should already be familiar with the basic controls of UE4 and comfortable navigating through the Content Browser. It will also help if you are familiar with the concept of Blueprints. More information can be found within the following documents:

*   Engine/Blueprints/GettingStarted
*   Engine/Blueprints/Editor
*   Engine/Blueprints/UserGuide

_**Target Blueprint Features**_

As with all Blueprints, it will be important to know in advance what it is you want to achieve as your final effect. In our case, we want an level designer to be able to drop this door Blueprint into a level, and it should just work. Players should be able to approach it and it should automatically open. Later, we would like to implement various features to enhance the overall usefulness of our Blueprint asset. Some of these will be for direct and obvious functionality enhancements, while others are purely academic - designed to show off features and workflow aspects to the Blueprint system.

**These features include:**

*   **Initial Setup**: Ability to drag & drop as many doors into a level as we need, and for them to provide basic functionality with no further required setup.
*   **Scale Controls**: Ability to adjust uniform scale as a global variable.
*   **Overrides**: Ability to swap out the meshes and materials for the door, but starting with a default for rapid setup.
*   **Organizing and Commenting**: Clear node organization and commenting.
*   **Making a Usable Door**: Ability to establish if the door opens when approached or needs to be "used" with player input.
*   **Creating a Door Counter**: Ability to establish an optional "transaction counter" Blueprint that tracks total times any door opens. This will be a separate Blueprint that must have the ability to communicate with any and all door Blueprints placed in the level.

Initial Setup
-------------

This first series of tutorials offers an introductory view to the world of working with Blueprints. Throughout this example, you will be creating a modular automated door in the most basic sense, including the following features:

*   A pair of static meshes (a "door frame" and a "doorway", the latter being the part that moves).
*   A Box Component which will serve as a trigger volume for proximity calculation. The trigger volume is nothing more than a 3d space that is "triggered" when the player enters it. We can hook up actions to these triggers -- like opening a door!
*   A Blueprint node network which will drive animation of the door.

In later tutorials, we will augment this system so that users can swap out the meshes used for the door and the door frame, override materials, and much more.

  

### New Blueprint

1\. Within the Content Browser, create a new folder with the name of your choice. Select this folder so that your new Blueprints will be placed within it.

[![NewFolder DT.png](https://d26ilriwvtzlb.cloudfront.net/d/df/NewFolder_DT.png)](/index.php?title=File:NewFolder_DT.png)

  
2\. Right-click in the Content Browser and choose Blueprint Class.

[![NewBlueprint DT.png](https://d26ilriwvtzlb.cloudfront.net/1/1e/NewBlueprint_DT.png)](/index.php?title=File:NewBlueprint_DT.png)

  
3\. The Pick Parent Class window will appear. Expand _Object_ and select _Actor_. This means you are creating a placeable Blueprint Actor. Click the **Ok** Button.

[![PickParentClass DT.png](https://d26ilriwvtzlb.cloudfront.net/2/22/PickParentClass_DT.png)](/index.php?title=File:PickParentClass_DT.png)

  
4\. For the Blueprint's name, choose _Tutorial Door_. Press Enter. This creates a new blank Blueprint ready for construction.

[![TutorialDoor Blueprint DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b0/TutorialDoor_Blueprint_DT.png)](/index.php?title=File:TutorialDoor_Blueprint_DT.png)

  
5\. One of the most critical steps when working with Blueprints is to save your work often. There are a few ways to do this. For our purposes, we will use the **Save** Button in the Content Browser. Click this now.

  
You can always verify when a Blueprint requires saving by looking at its icon in the Content Browser. In the lower left corner of the icon, you will see a small silver asterisk for any asset you should save. This asterisk can be seen in the image above, and will disappear once the most recent changes to a Blueprint have been saved.

  

### Mesh Components

1\. Right-click **Tutorial Door** and choose _Edit_ . This will open the Blueprint Editor.

[![FullEditor DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c0/FullEditor_DT.png)](/index.php?title=File:FullEditor_DT.png)

  
2\. Notice the Components tab on the left side of the editor. If this tab is not visible or is closed, it can be recovered by selecting the Window drop down menu and selecting Components.

  
3\. In the Content Browser, locate the **S\_LT\_Doors\_SM\_Door05** static mesh. (a copy of this asset is contained within the [assets for these tutorials](https://d26ilriwvtzlb.cloudfront.net/c/c6/Door.zip "Door.zip") for convenience)

[![Doorway DT.png](https://d26ilriwvtzlb.cloudfront.net/1/1e/Doorway_DT.png)](/index.php?title=File:Doorway_DT.png)

4\. Click Add Component.

[![AddComponentButton2 DT.png](https://d26ilriwvtzlb.cloudfront.net/7/7d/AddComponentButton2_DT.png)](/index.php?title=File:AddComponentButton2_DT.png)

  
5\. Select the new _Unnamed StaticMeshComponent_. In the Details panel, set the Variable name to **DoorFrame**.

[![NameDoorFrame DT.png](https://d26ilriwvtzlb.cloudfront.net/6/6c/NameDoorFrame_DT.png)](/index.php?title=File:NameDoorFrame_DT.png)

  
6\. In the Content Browser, locate the _S\_LT\_Doors\_SM\_DoorWay05_ static mesh. (a copy of this asset is contained within the [assets for these tutorials](https://d26ilriwvtzlb.cloudfront.net/c/c6/Door.zip "Door.zip") for convenience).

[![DoorMesh DT.png](https://d26ilriwvtzlb.cloudfront.net/3/39/DoorMesh_DT.png)](/index.php?title=File:DoorMesh_DT.png)

  
7\. Click the Component list again and choose Selected Asset at the top. Click Add Component, then set the variable name for the new static mesh component to **Door**.

[![DoorFramePlaced DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c2/DoorFramePlaced_DT.png)](/index.php?title=File:DoorFramePlaced_DT.png)

  
8\. In the Component Viewport, you should now see the door and the doorway mesh.

[![Door-Assembled-Updated.png](https://d3ar1piqh1oeli.cloudfront.net/f/fc/Door-Assembled-Updated.png/940px-Door-Assembled-Updated.png)](/index.php?title=File:Door-Assembled-Updated.png)

  
8\. Save your Blueprint by choosing File > Save in the Blueprint Editor. Ctrl + S can also be used to save all files in the project.

[![SaveBlueprint2 DT.png](https://d26ilriwvtzlb.cloudfront.net/4/49/SaveBlueprint2_DT.png)](/index.php?title=File:SaveBlueprint2_DT.png)

### Box Component

1\. Make sure you're looking at the ComponentList.

2\. From the Add Component dropdown, choose **Box Collision**. Set the Variable name to _TriggerVolume_.

[![TriggerVolumeAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/6/60/TriggerVolumeAdded_DT.png)](/index.php?title=File:TriggerVolumeAdded_DT.png)

  
3\. With the _TriggerVolume_ Box Collision Component selected, look at the Details panel. In the Shape category, set **Box Extent** to <192, 192, 128>.

[![ShapeBoxExtent DT.png](https://d26ilriwvtzlb.cloudfront.net/5/55/ShapeBoxExtent_DT.png)](/index.php?title=File:ShapeBoxExtent_DT.png)

  
4\. Scroll up to the Transform section of the Details panel and set **Location** to <0, 0, 128>.

[![RelativeLocation DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b6/RelativeLocation_DT.png)](/index.php?title=File:RelativeLocation_DT.png)

5\. Scroll down to the Collision group, and change the _Collision Presets_ to **Custom**. When you do this, the rest of the Collision group items will change, giving you the ability to check the box immediately under _Ignore_. You'll also see an item called **Pawn**. Recall that a Pawn is anything that can be controlled by the player. Since we want the collision to be triggered when the player's collision boundary overlaps this, we'll check the **Overlap** checkbox for Pawn.

This means that when the pawn touches this component, it will register an overlap contact, rather than being blocked altogether.

[![CollisionSettingsCheckboxes DT.png](https://d26ilriwvtzlb.cloudfront.net/f/f6/CollisionSettingsCheckboxes_DT.png)](/index.php?title=File:CollisionSettingsCheckboxes_DT.png)

  
6\. Compile by clicking "Compile" or hitting **F7**, then save your Blueprint.

Great! You just created a collision boundary and are ready to test out your new door.

  

### Level Testing

1\. Open the Content Browser and locate _Tutorial\_Door_.

2\. Drag and drop _Tutorial\_Door_ into your level.

[![DragDropBlueprint DT.png](https://d3ar1piqh1oeli.cloudfront.net/e/e1/DragDropBlueprint_DT.png/940px-DragDropBlueprint_DT.png)](/index.php?title=File:DragDropBlueprint_DT.png)

  
3\. Save your level and your Blueprint.

  

### Initial Event

We will now begin setting up the system by which the door will move. In previous versions of the engine, this would be handled via a Matinee sequence. However, such a setup required that one modify keyframes to change door behavior. Here, we will set up start and end points for the door and linearly interpolate between them.

  
1\. Open the _Tutorial\_Door_ Blueprint in the Blueprint Editor.

2\. Click the **Script** button and select the **Event Graph** tab to show the Event Graph.

[![EventGraphScriptWindow DT.png](https://d3ar1piqh1oeli.cloudfront.net/c/c5/EventGraphScriptWindow_DT.png/940px-EventGraphScriptWindow_DT.png)](/index.php?title=File:EventGraphScriptWindow_DT.png)

  
3\. In the _My Blueprint_ tab, select the Trigger Volume variable.

[![TriggerVolumeSelected DT.png](https://d26ilriwvtzlb.cloudfront.net/e/e4/TriggerVolumeSelected_DT.png)](/index.php?title=File:TriggerVolumeSelected_DT.png)

  
4\. Right-click in the Blueprint Event Graph. Start typing "ComponentBeginOverlap." You will see **OnComponentBeginOverlap** appear in the list. Click it to create a new ReceiveComponentTouch event.

[![ComponentBeginOverlapList DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0c/ComponentBeginOverlapList_DT.png)](/index.php?title=File:ComponentBeginOverlapList_DT.png)

  

[![OnComponentBeginOverlapNode DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0f/OnComponentBeginOverlapNode_DT.png)](/index.php?title=File:OnComponentBeginOverlapNode_DT.png)

  
This event is fired whenever another actor touches the Blueprint actor. Since the box component only calculates touches from the pawn, this means that the event will be fired as a pawn (the player in this case) passes into the box component. This causes the box component to behave like a trigger volume.

5\. We will now set up the linear interpolation (lerp) system. However, note that until we create some sort of driving force, our lerp will not actually produce any motion. Right-click and type "lerp" in the search line. From the filtered selections, choose **Lerp (vector)**.

[![LerpVectorList DT.png](https://d26ilriwvtzlb.cloudfront.net/b/bd/LerpVectorList_DT.png)](/index.php?title=File:LerpVectorList_DT.png)

  

[![LerpVectorNodeAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/8/81/LerpVectorNodeAdded_DT.png)](/index.php?title=File:LerpVectorNodeAdded_DT.png)

  
6\. On the **Lerp (Vector)** node, right-click on the **A** input vector plug and choose **Promote to Variable**. Name the variable _DoorStart_.

[![PromoteToVariableMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b8/PromoteToVariableMenu_DT.png)](/index.php?title=File:PromoteToVariableMenu_DT.png)

  

[![NameVariableDoorStart DT.png](https://d3ar1piqh1oeli.cloudfront.net/d/dd/NameVariableDoorStart_DT.png/940px-NameVariableDoorStart_DT.png)](/index.php?title=File:NameVariableDoorStart_DT.png)

  

[![DoorStartVariableInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/d/d8/DoorStartVariableInPlace_DT.png)](/index.php?title=File:DoorStartVariableInPlace_DT.png)

  
7\. Right-click on the **B** input vector plug and choose **Promote to Variable.** Name this variable _DoorEnd_.

[![DoorEndVariableInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/6/64/DoorEndVariableInPlace_DT.png)](/index.php?title=File:DoorEndVariableInPlace_DT.png)

  
8\. In the My Blueprint tab on the upper right side of the Blueprint Editor, select the Door End variable and click the Public Variable button. It will turn to an open eye and appear yellow, indicating that the variable is public, but requires a tooltip.

[![DoorEndPublicMyBlueprint DT.png](https://d26ilriwvtzlb.cloudfront.net/6/64/DoorEndPublicMyBlueprint_DT.png)](/index.php?title=File:DoorEndPublicMyBlueprint_DT.png)

  
9\. Select the _Door End_ variable in the _My Blueprint_ panel. In the _Details_ panel, check the **Show 3D Widget** option. In the **Category** field, enter "Door Setup." Also, add a tooltip. Something like, "Sets the end location for the motion of the door."

[![DoorEndVariableSetup DT.png](https://d26ilriwvtzlb.cloudfront.net/7/78/DoorEndVariableSetup_DT.png)](/index.php?title=File:DoorEndVariableSetup_DT.png)

  
10\. Select the _DoorStart_ variable and enter "Door Setup" for the **Category** in the _Details_ panel. This will cause DoorStart and DoorEnd to be placed under the DoorSetup category. Compile.

[![DoorStartSetup DT.png](https://d26ilriwvtzlb.cloudfront.net/e/e0/DoorStartSetup_DT.png)](/index.php?title=File:DoorStartSetup_DT.png)

  
11\. At the top of the Blueprint Editor, click the Defaults button. Set the Z value of **Door End** to _288_.

[![DoorEndSetupDefault DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0a/DoorEndSetupDefault_DT.png)](/index.php?title=File:DoorEndSetupDefault_DT.png)

  
12\. Compile and save your Blueprint.

  

### Timeline Setup

We have everything in place to have a working door. We just need to set the driving system that will cause the door to animate. Think of this like adding a motor to the door. In this case, we will use a Timeline, which allows for the creation of simple interpolation calculations between keyframes.

See Timelines documentation for more details.

1\. Open the _Tutorial\_Door_ Blueprint in the Blueprint Editor.

2\. Within the Blueprint Editor Event Graph, right-click and choose Add Timeline...

[![TimelineContextMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/6/62/TimelineContextMenu_DT.png)](/index.php?title=File:TimelineContextMenu_DT.png)

  

[![TimelineNodeAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/4/44/TimelineNodeAdded_DT.png)](/index.php?title=File:TimelineNodeAdded_DT.png)

  
3\. Set the name to "Timeline - Door Driver". Press Enter.

[![RenameTimeline 1 DT.png](https://d26ilriwvtzlb.cloudfront.net/4/45/RenameTimeline_1_DT.png)](/index.php?title=File:RenameTimeline_1_DT.png)

  

[![DoorDriverTimelineNode DT.png](https://d26ilriwvtzlb.cloudfront.net/e/ed/DoorDriverTimelineNode_DT.png)](/index.php?title=File:DoorDriverTimelineNode_DT.png)

  
Timelines are serialized when created, meaning the name will generally be "Timeline\_X" with X representing some number. By renaming your Timelines, it will be much clearer what each one is intended to do.

When you first rename the Timeline, you may see an Error on it. Simply recompile and it should disappear.

4\. Double-click the Timeline node to open a Timeline Editor tab.

[![TimelineEditorWindow DT.png](https://d26ilriwvtzlb.cloudfront.net/e/e3/TimelineEditorWindow_DT.png)](/index.php?title=File:TimelineEditorWindow_DT.png)

  
5\. Click the **Add Float Track** Button. Set the Track Name to "Driver."

[![DriverTrackAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b1/DriverTrackAdded_DT.png)](/index.php?title=File:DriverTrackAdded_DT.png)

  
6\. Within the Timeline curve window to the right, **Shift-click** on the default curve somewhere near the (0,0) coordinate. It does not have to be precisely at that location. This will create a keyframe along the timeline.

[![AddedNewKeyframe DT.png](https://d26ilriwvtzlb.cloudfront.net/0/07/AddedNewKeyframe_DT.png)](/index.php?title=File:AddedNewKeyframe_DT.png)

  
7\. Select the new keyframe by clicking it. You will see two numeric input fields at the top of the window. The one on the left sets the time index of the keyframe, the one on the right sets the value. Set both of these inputs to 0.0, defining a relative translation of 0.0 at the beginning of the timeline.

[![SetValuesToZeroInTimeline DT.png](https://d26ilriwvtzlb.cloudfront.net/1/1e/SetValuesToZeroInTimeline_DT.png)](/index.php?title=File:SetValuesToZeroInTimeline_DT.png)

  
8\. Use Shift-click to create a second keyframe. Select the new keyframe and set the time field to 1.5 seconds and the value field to 1.0.

[![SecondKeyAdded DT.PNG](https://d26ilriwvtzlb.cloudfront.net/f/f2/SecondKeyAdded_DT.PNG)](/index.php?title=File:SecondKeyAdded_DT.PNG)

  
In order to see the curve in its entirety, you may need to click the _Zoom to Fit_ buttons, located in the upper left of the Timeline graph!

9\. Before leaving the Timeline Editor, make sure to check the **Use Last Keyframe?** checkbox. This will keep the Timeline from calculating beyond the end of the final keyframe, which would give you several seconds of dead animation after the door had opened.

[![UseLastKeyframecheckbox DT.PNG](https://d26ilriwvtzlb.cloudfront.net/c/cd/UseLastKeyframecheckbox_DT.PNG)](/index.php?title=File:UseLastKeyframecheckbox_DT.PNG)

  
10\. Return to the Event Graph and connect the **Driver** output of the Timeline to the Alpha input of the Lerp (vector) node.

[![TimelineToLerp DT.png](https://d26ilriwvtzlb.cloudfront.net/1/1a/TimelineToLerp_DT.png)](/index.php?title=File:TimelineToLerp_DT.png)

  
11\. We now need to set up the node that will move the door. Select the Door component variable in the My Blueprint panel. Then right click in the graph and type "set Relative Location." This will create the node with the Door variable attached.

[![SetRelativeLocation DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2d/SetRelativeLocation_DT.png)](/index.php?title=File:SetRelativeLocation_DT.png)

  
12\. Finally, it's time to hook up our event, which should initiate Timeline playback and thereby open our door. Connect the output pin of the **OnComponentBeginOverlap** event to the Play input on the **Timeline - Door Driver**. Then connect the Timeline's **Update** pin to the execution input of the Set Relative Location. Finally, connect the **Return Value** of the Lerp (Vector) node to the **New Location** input on the Set Relative Location node.

[![OverlapEventAdded DT.png](https://d3ar1piqh1oeli.cloudfront.net/d/d5/OverlapEventAdded_DT.png/940px-OverlapEventAdded_DT.png)](/index.php?title=File:OverlapEventAdded_DT.png)

  
13\. Compile and Save your Blueprint.

### Testing and Debugging

In this tutorial we take a moment to drop our Blueprint into a level and give it a test. At this point, your doorway should be opening when the player approaches it. One of the great benefits of Blueprints of this sort is that we can easily test them out at any time by simply dropping the Blueprint actor into a level and then using Play In Editor to see how they're working.

Blueprints are error-checked every time they are compiled. If there are any errors within the node network, a window will appear in which all such errors are listed, along with links to jump you directly to the problem.

1\. Open the _Tutorial\_Door_ Blueprint in the Blueprint Editor.

2\. Be sure that the Blueprint has been fully compiled (press F7) in the Blueprint Editor. Should there be any errors that appear, click on the hyperlink within the error entry. The error itself should spell out the nature of the problem. Your network should look something like this:

[![OverlapEventAdded DT.png](https://d3ar1piqh1oeli.cloudfront.net/d/d5/OverlapEventAdded_DT.png/940px-OverlapEventAdded_DT.png)](/index.php?title=File:OverlapEventAdded_DT.png)

  
3\. The Blueprint should be functional at this point. With the Blueprint placed in the level, press the Play in Editor button. When the player walks into the volume of the Box Component, the door should open.

[![DoorOpening DT.png](https://d26ilriwvtzlb.cloudfront.net/6/60/DoorOpening_DT.png)](/index.php?title=File:DoorOpening_DT.png)

  
4\. Save your level.

### Closing the Door

When testing the level, you might have noticed that the door opens but does not close. In this tutorial, we will set up a counter event that causes the door to close when the player exits the volume of the BoxComponent.

1\. Open the _Tutorial\_Door_ Blueprint in the Blueprint Editor.

2\. Select the Trigger Volume component variable. Right click near the Timeline and type "OnComponentEnd," which will bring up the _OnComponentEndOverlap_ event. This event is fired whenever an object exits the BoxComponent.

[![OnComponentEndOverlapNode DT.png](https://d26ilriwvtzlb.cloudfront.net/7/79/OnComponentEndOverlapNode_DT.png)](/index.php?title=File:OnComponentEndOverlapNode_DT.png)

  

[![OnComponentEndOverlapNodeAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/e/ec/OnComponentEndOverlapNodeAdded_DT.png)](/index.php?title=File:OnComponentEndOverlapNodeAdded_DT.png)

  
3\. Connect the output execution plug of the OnComponentEndOverlap event to the Reverse input of the Timeline. This will cause the Timeline to play backwards when the BoxComponent volume is exited, thereby closing the door.

[![DoorNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/6/6f/DoorNetwork_DT.png/940px-DoorNetwork_DT.png)](/index.php?title=File:DoorNetwork_DT.png)

  

[![DoorClosingArrows DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2b/DoorClosingArrows_DT.png)](/index.php?title=File:DoorClosingArrows_DT.png)

  
4\. Compile your Blueprint by pressing the Compile button and test the level. Your door should now open and close.

### Adjusting Motion

In this tutorial, we will adjust the animation curve of the door's motion, causing it to start by moving quickly upward, but slowing to a stop. Because we are playing the same motion back to close the door, we the door will accelerate as it comes back down.

1\. Open the _Tutorial\_Door_ Blueprint in the Blueprint Editor.

2\. Within the Blueprint Editor, double-click the Timeline node to open it in the Timeline Editor.

[![SecondKeyAdded DT.PNG](https://d26ilriwvtzlb.cloudfront.net/f/f2/SecondKeyAdded_DT.PNG)](/index.php?title=File:SecondKeyAdded_DT.PNG)

  
3\. Select the first keyframe by clicking it. Right-click on the keyframe and choose User. This will add user-controlled tangent handles to the keyframe so that you can adjust its shape.

[![User-Keyframes-Type.png](https://d3ar1piqh1oeli.cloudfront.net/f/fb/User-Keyframes-Type.png/940px-User-Keyframes-Type.png)](/index.php?title=File:User-Keyframes-Type.png)

  
4\. Repeat this process with the second keyframe, so that they are both set to User.

5\. Move the inner tangent handles (the right for the first keyframe, left for the second) up slightly to shape the curve into an upward ramp that planes off at the end.

[![CurveAdjusted DT.png](https://d26ilriwvtzlb.cloudfront.net/0/03/CurveAdjusted_DT.png)](/index.php?title=File:CurveAdjusted_DT.png)

  
6\. Compile and test. The door should start opening very quickly, slowing as it ascends. When closing, it starts slow and accelerates as it descends.

[![DoorSlowingAsAscending DT.png](https://d26ilriwvtzlb.cloudfront.net/5/5f/DoorSlowingAsAscending_DT.png)](/index.php?title=File:DoorSlowingAsAscending_DT.png)

  
7\. Save your Blueprint.

### Chapter 1: Troubleshooting

Problem

Solution

Cannot enter the BoxComponent volume. It seems to be solid.

Select the BoxComponent within the Components tab.

In the Details panel, make sure that under _Collision_ that **PawnMovement** is set to _Overlap_ and everything else is set to _Ignore_.

The OnComponentBeginOverlap event seems to be working, but the door is not moving.

Verify the keyframes within the Timeline run between values of 0 to 1 over 1.5 seconds.

You can press the Zoom to Fit Horizontal and Zoom to Fit Vertical buttons to make sure that the curve is shaped properly.

The Timeline looks great. Door still isn't moving!

Make sure the DoorEnd variable is set up properly.

If you didn't set its Default Value (we used 288), then you're probably trying to interpolate between 0 and 0 for start and end, respectively.

The door seems to vanish or fly away when I enter the BoxComponent.

Make sure you're using a SetRelativeTranslation node instead of an AddRelativeTranslation node.

The two nodes look very much alike! Using an additive node will constantly add the translation value to the location of the door each time the Timeline updates.

This causes the door to accelerate away, fast enough that it will seem to disappear.

  

Scale Controls
--------------

Now that the door itself is set up, it is time for us to start adding some convenience features to turn it into a useful and practical asset. The first of these will be a slider-based scale control system, which will allow a level designer to quickly increase or decrease the scale of the door. This slider will be accessible from the Details panel on any instance of the Blueprint that gets placed in the level.

### Adding a Scale Control

In this tutorial we will implement a 3D scale adjustment system for our automated door. As you may have noticed, scaling the Blueprint itself does not have any effect. Instead, we will create a single slider control that can be used to quickly size the door up and down, starting from a base default value.

[![DoorFinal DT.png](https://d26ilriwvtzlb.cloudfront.net/d/db/DoorFinal_DT.png)](/index.php?title=File:DoorFinal_DT.png)

  
1\. First, we need a new variable to hold the scale for the door. In the My Blueprint panel on the left, click the **New Variable** button. Set the type to Float, set the name to _3D Scale_, and set the remaining properties as shown below:

[![3DScaleVariableSettings DT.png](https://d26ilriwvtzlb.cloudfront.net/4/44/3DScaleVariableSettings_DT.png)](/index.php?title=File:3DScaleVariableSettings_DT.png)

  
2\. Click the **Defaults** button and set the default value of the **3D Scale** variable to 1.0.

[![3DScaleDefault DT.png](https://d26ilriwvtzlb.cloudfront.net/0/02/3DScaleDefault_DT.png)](/index.php?title=File:3DScaleDefault_DT.png)

  
3\. Compile and save your Blueprint. At this time, there is nothing we can test just yet.

### Finalizing Scale Control

Now that we have our 3D Scale variable established, we will now implement it via the Blueprint's Construction Script. The Construction Script is executed when the Blueprint is first created in the world, and updated whenever any part of the Blueprint is updated during level construction.

1\. Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

2\. Within the Blueprint Editor, click the ConstructionScript tab at the top of the screen. This shows the Construction Script for this Blueprint, which currently just shows the Construction Script node. Think of this like an event that is called when the Blueprint is first created, or whenever it becomes edited during level design.

[![ConstructionScript DT.png](https://d3ar1piqh1oeli.cloudfront.net/8/8d/ConstructionScript_DT.png/940px-ConstructionScript_DT.png)](/index.php?title=File:ConstructionScript_DT.png)

  
3\. Select the My Blueprint tab on the left, then Ctrl-drag a copy of the **Door Frame** component variable into the Construction Script.

[![DoorFrameVariableInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/f/fd/DoorFrameVariableInPlace_DT.png)](/index.php?title=File:DoorFrameVariableInPlace_DT.png)

  
4\. Drag a wire off the Door Frame node and release the mouse in open space. Type Set Relative Scale 3D and create a Set Relative Scale 3D node.

[![RelativeScaleContentMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/0/02/RelativeScaleContentMenu_DT.png)](/index.php?title=File:RelativeScaleContentMenu_DT.png)

  

[![SetRelativeScale3DNode DT.png](https://d26ilriwvtzlb.cloudfront.net/3/3b/SetRelativeScale3DNode_DT.png)](/index.php?title=File:SetRelativeScale3DNode_DT.png)

  
5\. Ctrl-drag in a copy of the 3D Scale variable.

[![3DScaleVarAddedInGraph DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0a/3DScaleVarAddedInGraph_DT.png)](/index.php?title=File:3DScaleVarAddedInGraph_DT.png)

  
6\. Right-click and create a Make Vector node.

[![MakeVectorNodeInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/5/58/MakeVectorNodeInPlace_DT.png)](/index.php?title=File:MakeVectorNodeInPlace_DT.png)

  
7\. Connect the output of the 3D Scale node to all three inputs of the Make Vector node, then connect the output to the New 3D Scale input of the Set Relative Scale 3D node.

[![3DScaleConnectedToMakeVector DT.png](https://d26ilriwvtzlb.cloudfront.net/9/96/3DScaleConnectedToMakeVector_DT.png)](/index.php?title=File:3DScaleConnectedToMakeVector_DT.png)

  
8\. Finally, connect the output of the ConstructionScript node to the execution input of the Set Relative Scale 3D node.

[![ConstructionScriptComplete DT.png](https://d26ilriwvtzlb.cloudfront.net/7/75/ConstructionScriptComplete_DT.png)](/index.php?title=File:ConstructionScriptComplete_DT.png)

  
9\. Compile and save your Blueprint.

10\. In the main editor, watch your Blueprint in the viewport as you adjust the **3D Scale** variable's slider from within the Details panel.

[![Set3DScale DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2c/Set3DScale_DT.png)](/index.php?title=File:Set3DScale_DT.png)

  

[![ScalingDoor DT.png](https://d3ar1piqh1oeli.cloudfront.net/5/52/ScalingDoor_DT.png/940px-ScalingDoor_DT.png)](/index.php?title=File:ScalingDoor_DT.png)

  

### Chapter 2: Troubleshooting

Problem

Solution

I cannot see the scaling slider in the Details panel.

Make sure that the DoorScale variable is set to _Editable_ (click the small eye icon).

After implementing the scale controls, the door seems to have vanished!

Double-check the default setting for the DoorScale variable within the Blueprint Editor's _Blueprint Defaults_ panel.

It is likely that this was left at 0.0, which would size your door down to nothingness.

Overrides
---------

In this chapter we take a look at making our door Blueprint asset even more useful by adding the ability to override the static meshes and materials in use. Basically, we want the level designer to have the power to use any kind of vertically-opening door, starting with this Blueprint as a template. To do this, we will have to make use of the User Construction Script, which is run in advance of gameplay. Through this method, we can expose the ability for the LD to choose other meshes and materials from the Content Browser and use them to replace the assets set up by default.

This example is designed to make use of standard Materials, not Material Instance Constants. However, the text does include some guides to help make the minor modifications required to utilize Material Instances in your assets.

### Mesh Overrides

In this tutorial we will adjust our automated door so that a level designer could quickly swap out the meshes for the door and the door frame. Since the Blueprint already has meshes in place for those parts, those existing meshes will be considered defaults. This is useful because an level designer can quickly lay out the doors wherever they are needed, but then quickly swap out meshes later down the road. It also opens the door for collaborative efforts, since a level layout artist can just drop the doors into place while a finishing artist comes in later and changes out the doors for something more appropriate.

[![StartTutorial3 DT.png](https://d3ar1piqh1oeli.cloudfront.net/8/8b/StartTutorial3_DT.png/940px-StartTutorial3_DT.png)](/index.php?title=File:StartTutorial3_DT.png)

  
1\. Open the Blueprint's Construction Script.

[![UserConstructionScript 3 DT.png](https://d3ar1piqh1oeli.cloudfront.net/7/74/UserConstructionScript_3_DT.png/940px-UserConstructionScript_3_DT.png)](/index.php?title=File:UserConstructionScript_3_DT.png)

  
2\. In the _My Blueprint_ panel, click the **Add Variable** button to create a new variable. Select the new variable and in the _Details_ panel set its type to **Static Mesh** and its name to _Door Mesh Override_. Set its remaining properties as shown below:

[![DoorMeshOverrideVariable DT.png](https://d26ilriwvtzlb.cloudfront.net/c/ca/DoorMeshOverrideVariable_DT.png)](/index.php?title=File:DoorMeshOverrideVariable_DT.png)

  
3\. Create a second **Static Mesh** variable named Door Frame Mesh Override. Set its remaining properties as shown below:

[![OverrideDoorFrameMeshVar DT.png](https://d26ilriwvtzlb.cloudfront.net/6/65/OverrideDoorFrameMeshVar_DT.png)](/index.php?title=File:OverrideDoorFrameMeshVar_DT.png)

4\. To the right of the Set Relative Scale 3D node, add a Sequence node. This will fire off a series of operations, one after another. Go ahead and connect it to the Set Relative Scale 3D node.

[![AddedSequence2 DT.png](https://d26ilriwvtzlb.cloudfront.net/4/45/AddedSequence2_DT.png)](/index.php?title=File:AddedSequence2_DT.png)

  
You may, for now, right-click on the **Then 2** and **Then 3** options and choose "Remove execution pin," since we will not be using those pins in this tutorial.

5\. Ctrl-drag in a copy of the **Door Mesh Override** variable, and also a copy of the **Door Frame Mesh Override** variable.

[![OverrideVariables DT.png](https://d26ilriwvtzlb.cloudfront.net/4/44/OverrideVariables_DT.png)](/index.php?title=File:OverrideVariables_DT.png)

6\. The first thing we will need to do is make sure that these variables are not empty. If either of them are, then we need not swap out that mesh. Create **2 Branch nodes** and connect them to the **Then 0** and **Then 1** output pins of the Sequence node.

[![TwoBranches DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b1/TwoBranches_DT.png)](/index.php?title=File:TwoBranches_DT.png)

  
7\. Drag a wire from the DoorMeshOverride variable and type "Not equal" to create a **Not Equal (Object)** node. Connect the output pin to the Condition pin on the Branch node. Repeat for the **Door Frame Mesh Override** variable.

[![NotEqualObjects DT.png](https://d26ilriwvtzlb.cloudfront.net/7/76/NotEqualObjects_DT.png)](/index.php?title=File:NotEqualObjects_DT.png)

  
8\. Ctrl-drag a copy of the **Door** component variable into the Event Graph. Drag a wire from the variable and create a **Set Static Mesh** node. Make a duplicate of the _Door Mesh Override_ variable and plug it into the **New Mesh** input.

[![SetStaticMesh Door DT.png](https://d3ar1piqh1oeli.cloudfront.net/f/f8/SetStaticMesh_Door_DT.png/940px-SetStaticMesh_Door_DT.png)](/index.php?title=File:SetStaticMesh_Door_DT.png)

  
9\. Repeat the process above to make a Set Static Mesh node that swaps out the mesh for the Door Frame component variable.

[![BothMeshesOverriding DT.png](https://d3ar1piqh1oeli.cloudfront.net/b/b2/BothMeshesOverriding_DT.png/940px-BothMeshesOverriding_DT.png)](/index.php?title=File:BothMeshesOverriding_DT.png)

  
Your network should look like this when finished.

**(Click for full size!)**

[![OverrideMeshNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/1/1e/OverrideMeshNetwork_DT.png/940px-OverrideMeshNetwork_DT.png)](/index.php?title=File:OverrideMeshNetwork_DT.png)

  

[![OverrideMeshNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/1/1e/OverrideMeshNetwork_DT.png/940px-OverrideMeshNetwork_DT.png)](/index.php?title=File:OverrideMeshNetwork_DT.png)

  
11\. Compile your Blueprint and save. If you have a copy in the viewport, look at the Details panel and find the new **Mesh & Materials Override** group. You can place other static meshes from the Content Browser into these variables, and the door will update accordingly.

### Material Override

Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

1\. Create a new variable of type **MaterialInterface** named _Door Material Override_. Provide the following variable settings:

*   Set the variable to be _Editable_.
*   Set the tooltip to something describing that this variable will hold an override material for the door.
*   Set the Custom Group Name to **Mesh & Material Overrides**.

[![DoorMaterialOverride DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c7/DoorMaterialOverride_DT.png)](/index.php?title=File:DoorMaterialOverride_DT.png)

  
2\. Repeat the above step to create a new variable named **Door Frame Material Override** with an appropriate tooltip.

[![DoorFrameMaterialOverride DT.png](https://d26ilriwvtzlb.cloudfront.net/5/50/DoorFrameMaterialOverride_DT.png)](/index.php?title=File:DoorFrameMaterialOverride_DT.png)

  
3\. Take a look at the **Sequence** node. If it has only 2 output pins, click the **Add pin** button twice to give it a total of 4.

[![AddPinsToSequence DT.png](https://d26ilriwvtzlb.cloudfront.net/4/47/AddPinsToSequence_DT.png)](/index.php?title=File:AddPinsToSequence_DT.png)

  
4\. As with the meshes, we need to make sure that these variable contain some asset before we commence any execution. Create a Branch node for each variable, connecting them to each of the 2 open pins on the Sequence.

[![2NewBranches DT.png](https://d26ilriwvtzlb.cloudfront.net/8/80/2NewBranches_DT.png)](/index.php?title=File:2NewBranches_DT.png)

  
You may need to move around the other nodes to make room!

5\. Ctrl-drag in the 2 new material override variables created above, then create a "Not Equal (object)" node for each variable, connected like so. These will drive the new Branches.

[![MaterialOverrideBranches DT.png](https://d26ilriwvtzlb.cloudfront.net/9/93/MaterialOverrideBranches_DT.png)](/index.php?title=File:MaterialOverrideBranches_DT.png)

  
6\. At this stage, we really only need to create the same type of network we produced for the mesh overrides. The only difference is that we use a **Set Material** node instead of a _Set Static Mesh_ node to make the swap. Below you can see the final network, most of which can be created by simply duplicating the previous networks for overriding the meshes.

[![OverrideMat FullNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/a/a2/OverrideMat_FullNetwork_DT.png/940px-OverrideMat_FullNetwork_DT.png)](/index.php?title=File:OverrideMat_FullNetwork_DT.png)

  

[![OverrideMat FullNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/a/a2/OverrideMat_FullNetwork_DT.png/940px-OverrideMat_FullNetwork_DT.png)](/index.php?title=File:OverrideMat_FullNetwork_DT.png)

  
Leave the _Element Index_ for both of the **Set Material** nodes set to _0_.

7\. Compile and save your Blueprint. You may now specify material overrides for the meshes in the Blueprint. If left blank, there will be no change.

### Chapter 3: Troubleshooting

The following is a list of common pitfalls one may run into when setting up mesh and material overrides for the door.

  

Problem

Solution

The Mesh and/or Material Override is not working.

I can place assets within the variables, but see no updates in the viewport.

The problem is likely going to exist within your User Construction Script.

Remember that the Door/Material Override variables _must_ be of the appropriate type. You must then make sure you're setting the right type of proprerty.

If you're getting nothing at all, your best bet may be to carefully go back through the steps of the tutorial to see what you missed.

Material Instance Constants aren't working to override my materials.

Make sure the variable type for your override materials is **Material Interface**.

You may have accidentally created a variable of type **Material**. That's going to be a problem, since you cannot place Material Instance Constant assets into that type of variable.

Conversely, if you set the variable type to **Material Instance Constant**, you won't be able to use regular Materials.

This is why in the tutorial we used the **Material Interface** type, which can take in both a regular Material and a Material Instance Constant.

Organizing and Commenting
-------------------------

In this chapter we will look at how to go about separating your Blueprint network into easily identifiable sections. This serves a dual purpose:

*   Making the network easier to "read" by chopping apart functionality into logical regions.
*   Making it much easier to identify and fix problems when something doesn't work.

Generally speaking, the more modular your networks are - or, put another way, the more one applies the concept of "separation of concerns" - the easier it is to tell quickly where a problem lies and where exactly one must go to make changes.

We will also examine the process of applying comments to your Blueprint networks. Comments serve as an invaluable organizational tool, allowing you to explain an entire group of nodes wihtin a network, or even to put comments on individual nodes to explain their purpose. Just as when programming using actual code, using comments can make it much faster and easier for your work to be used and edited when in a team environment, or when having to walk away from a specific system for extended periods of time.

### Custom Events and Organization

As a Blueprint network becomes more and more complex, it is a good idea to separate key parts of functionality into easily identifiable groups. Not only does this help by making it easier to see what each section of the network does, but it also makes it a much simpler task to insert additional functionality as you move forward.

In this case, we will separate out this behavior by using Custom Events.

1\. Double-click the Blueprint to open it within the Blueprint Editor.

2\. In the Event Graph, right-click somewhere near the **OnComponentBeginOverlap (TriggerVolume)** event in the Blueprint sequence and choose **Add Custom Event**. A new Custom Event will appear, prompting you to supply a name. Name this event **DoorOpen**.

[![AddCustomEvent DT.png](https://d26ilriwvtzlb.cloudfront.net/8/8a/AddCustomEvent_DT.png)](/index.php?title=File:AddCustomEvent_DT.png)

  

[![DoorOpenEvent DT.png](https://d26ilriwvtzlb.cloudfront.net/e/e7/DoorOpenEvent_DT.png)](/index.php?title=File:DoorOpenEvent_DT.png)

  
3\. Next to the **OnComponentEndOverlap** event, create another Custom Event named **DoorClose**.

[![DoorCloseEvent DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2e/DoorCloseEvent_DT.png)](/index.php?title=File:DoorCloseEvent_DT.png)

  
4\. Disconnect the **OnComponentBeginOverlap** event and replace it with the **DoorOpen** Custom Event. Replace the **OnComponentEndOverlap** event with the **DoorClose** event.

[![CustomEventsInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/4/4e/CustomEventsInPlace_DT.png)](/index.php?title=File:CustomEventsInPlace_DT.png)

  
5\. Move the **OnComponentBeginOverlap (TriggerVolume)** and **OnComponentEndOverlap (TriggerVolume)** events away from the main network.

[![TouchEventsSeparated DT.png](https://d26ilriwvtzlb.cloudfront.net/d/dc/TouchEventsSeparated_DT.png)](/index.php?title=File:TouchEventsSeparated_DT.png)

  
6\. Drag a wire off the execution pin for **OnComponentBeginOverlap (TriggerVolume)** and release in empty space. Type "DoorOpen" and you will see a _DoorOpen_ function appear. Create it. Repeat this process for **OnComponentEndOverlap (TriggerVolume)** and create a _DoorClose_ function.

[![AddingDoorOpen DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0f/AddingDoorOpen_DT.png)](/index.php?title=File:AddingDoorOpen_DT.png)

  

[![CustomEventsAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/5/58/CustomEventsAdded_DT.png)](/index.php?title=File:CustomEventsAdded_DT.png)

  
7\. Compile, save, and test your door. By separating out your behavior like this, it will be much easier to see exactly what happens when a player touches the BoxComponent, as well as much easier to insert additional behavior later on.

### Commenting

Commenting can be a lifesaver when it comes to more complex Blueprint networks. Should you be working on a team with multiple people, or ever have to walk away from a Blueprint only to have to come back and edit it later, having comments in place can make it much easier to follow along with what was already done. Comments can also make it clearer where additions should be made when trying to produce specific functionality.

1\. Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

2\. Drag a selection box around the section of the network that handles door motion.

[![SelectionBox3 DT.png](https://d3ar1piqh1oeli.cloudfront.net/5/53/SelectionBox3_DT.png/940px-SelectionBox3_DT.png)](/index.php?title=File:SelectionBox3_DT.png)

  
3\. Press the _C_ key to create a comment box. Alternatively, you may also right-click and choose **Create Comment from Selection**.

[![NewCommentBox DT.png](https://d3ar1piqh1oeli.cloudfront.net/d/d6/NewCommentBox_DT.png/940px-NewCommentBox_DT.png)](/index.php?title=File:NewCommentBox_DT.png)

  
4\. You can name a Comment as soon as it is created. However, this can also be done after the fact . Simply double-click on the comment and set it to something descriptive, such as, "Handles door motion for opening and closing."

[![CommentText DT.png](https://d26ilriwvtzlb.cloudfront.net/2/25/CommentText_DT.png)](/index.php?title=File:CommentText_DT.png)

  
5\. Move the Comment box to a new location. Notice that all the nodes within it move as well.

[![CommentMoving DT.png](https://d3ar1piqh1oeli.cloudfront.net/0/0b/CommentMoving_DT.png/940px-CommentMoving_DT.png)](/index.php?title=File:CommentMoving_DT.png)

  
6\. Compile and save your Blueprint.

Remember that unlike programming code, the visual nature of Blueprints - particularly how nodes can branch in many directions at once - means that it will often not be an easy task to glance at a network and see what it's supposed to be doing. Liberal use of comments can help make it a quick and easy task for you or anyone on your team to see what any part of a network is doing and where any edits or adjustments should take place.

### Collapsing Nodes

Sometimes, for sake of organization, it can be a good idea to take a network of nodes and collapse them down into a single custom-named node. This creates a sub-graph of the nodes that were collapsed, leaving the main Graph much cleaner and in many cases, easier to read. In this example, we will apply this to the Construction Script to condense our mesh and material override networks down into singular nodes.

1\. Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

2\. In the _ConstructionScript_ tab, carefully select only those nodes that override the Door mesh. These should be connected to the **Then 0** output pin of the _Sequence_ node.

[![DoorMeshOverrideNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/6/6a/DoorMeshOverrideNetwork_DT.png/940px-DoorMeshOverrideNetwork_DT.png)](/index.php?title=File:DoorMeshOverrideNetwork_DT.png)

  
3\. With those nodes selected, right-click on one of the selected nodes and choose _Collapse Nodes_ from the context menu. A name entry box will appear; enter the name **Override Mesh - Door**. Press enter, and a new node will appear to replace the selections.

[![CollapseNodes DT.png](https://d26ilriwvtzlb.cloudfront.net/8/86/CollapseNodes_DT.png)](/index.php?title=File:CollapseNodes_DT.png)

  

[![OverrideMesh Door DT.png](https://d26ilriwvtzlb.cloudfront.net/b/bf/OverrideMesh_Door_DT.png)](/index.php?title=File:OverrideMesh_Door_DT.png)

  

[![MeshOverride DoorNode DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0e/MeshOverride_DoorNode_DT.png)](/index.php?title=File:MeshOverride_DoorNode_DT.png)

  
4\. Repeat this process with the remaining networks that branch out of the _Sequence_ node. When finished, your network should look something like this:

[![Collapsed Network DT.png](https://d3ar1piqh1oeli.cloudfront.net/1/18/Collapsed_Network_DT.png/940px-Collapsed_Network_DT.png)](/index.php?title=File:Collapsed_Network_DT.png)

  
5\. Mouse-over any of the collapsed nodes and notice the preview thumbnail that appears. This can give you a quick idea of the network within the collapsed node.

[![ThumbnailPreview DT.png](https://d26ilriwvtzlb.cloudfront.net/0/00/ThumbnailPreview_DT.png)](/index.php?title=File:ThumbnailPreview_DT.png)

  
6\. Double-click on any of the collapsed networks. This will allow you to "step inside" the node and see the network within.

[![CollapsedNetwork Inside DT.png](https://d3ar1piqh1oeli.cloudfront.net/7/74/CollapsedNetwork_Inside_DT.png/940px-CollapsedNetwork_Inside_DT.png)](/index.php?title=File:CollapsedNetwork_Inside_DT.png)

  
7\. Notice the **Inputs** and **Outputs** nodes. These define the inputs and outputs that can be found on the collapsed node. By selecting either of these, you can go to the details panel and add further inputs and outputs.

[![TunnelEntranceDetails DT.png](https://d26ilriwvtzlb.cloudfront.net/5/5c/TunnelEntranceDetails_DT.png)](/index.php?title=File:TunnelEntranceDetails_DT.png)

  
New _Input_ and _Output_ pins can be created by clicking the **New** button, and then adding a type and a name.

Unwanted _Input_ and _Output_ pins can be removed by clicking the **X Remove** button.

Notice that the _Output_ node currently has no output in. This is because the final node in our selected network did not have an outgoing connection. Had we selected a series of nodes that were already connected to something else, then we would see an output connection of the appropriate type had been created automatically.

To add an execution pin rather than a variable data type, set the _Type_ dropdown to **exec**. When doing so, you can set the name to a space if you want a single unnamed execution pin.

8\. Compile and save your Blueprint.

### Chapter 4: Troubleshooting

Problem

Solution

I can't create a function _before_ a Custom Event. Why is that?

This is simply the nature of the workflow.

While you can create Custom Events with any name you like, there is no mechanism for creating the functions first.

This prevents accidentally creating arbitrary functions which call non-existent events.

I can't seem to change the title of my Comment blocks.

Make sure you're not looking for a "Comment" property, as one does not exist.

Simply double-click the comment title in the Graph.

My collapsed network does not have an output pin!

This is to be expected, as long as you selected a series of nodes in which the final node was not outputting anything.

If you select a node that is outputting into another node, an output pin will be created and connected automatically.

You can double-click any collapsed network and use the _Details_ panel to modify the **Tunnel Entrance** and **Tunnel Exit** nodes to create your own inputs and outputs.

Making a Useable Door
---------------------

Chapter 5 takes a look at how we can modify our door so that a level designer has the option of making it a "useable" door. This means that instead of the door opening when a player enters the Box Component, the player will instead have to walk up to the door and press a "use" key on the keyboard.

Since this will be optional behavior, set up will require that we create a global Boolean variable that an LD can check in the Details panel, and the value of that variable will be used to branch behavior within our network. In short, the door will behave like so:

*   Exposed global variable "Door Is Usable".
*   If checked, the door must be used to open.
*   If not checked, the door will open due to player proximity.

In order to make this system work, however, we will have to set up our Blueprint such that it can accept and process inputs from the user. This will require the implementation of a special Blueprint Interface.

### Enabling Input

In order to make our door "usable" rather than merely proximity based, we have to set our Blueprint up in a special way so that it can receive inputs from the user.

This process in itself is very simple. However, from a useability standpoint, we have some changes to make in our network to make sure it works properly.

*   First, we will set up an editible variable (visible within the editor) that allows us to set the door as "usable."
    *   If this is checked, players will need to press a key to open and close the door.
    *   If not, the door will operate if the player enters or exits the box component. In this way, we set the stage for functionality options.

*   If the door is set to be usable, then instead of opening the door when the player enters the BoxComponent, we will enable and disable the ability for inputs to be read. Those inputs will, in turn, open and close the door.

*   We will create a special variable that will be used to monitor when the door is open and closed. This will keep the state of the door from falling out of sync, which could require the player to press their input an additional time, causing confusion and/or frustration.

In this tutorial, we will set up the system by which we enable inputs from the player.

1\. Be sure to drag a copy of the Blueprint into the level for testing within PIE. Double-click the Blueprint to open it within the Blueprint Editor.

2\. Create a new Boolean variable called "Door Is Usable." Give it the following properties:

[![DoorIsUsable DT.png](https://d26ilriwvtzlb.cloudfront.net/a/a8/DoorIsUsable_DT.png)](/index.php?title=File:DoorIsUsable_DT.png)

  
3\. Disconnect the **Door Open** and **Door Close** functions from the **OnComponentBeginOverlap** and **OnComponentEndOverlap** nodes. Move the function nodes away for the time being.

[![OverlapNodes DT.png](https://d26ilriwvtzlb.cloudfront.net/1/10/OverlapNodes_DT.png)](/index.php?title=File:OverlapNodes_DT.png)

  
4\. Drag a wire off the **OnComponentBeginOverlap** node, using the execution output pin, and create a new **Branch** node.

[![CreateBranch DT.png](https://d26ilriwvtzlb.cloudfront.net/1/1f/CreateBranch_DT.png)](/index.php?title=File:CreateBranch_DT.png)

  

[![BranchNodeCreated DT.png](https://d26ilriwvtzlb.cloudfront.net/5/53/BranchNodeCreated_DT.png)](/index.php?title=File:BranchNodeCreated_DT.png)

  
5\. Ctrl-drag a copy of the **Door Is Usable** variable to the _Condition_ input of the new **Branch** node.

[![DoorIsUsableCondition DT.png](https://d26ilriwvtzlb.cloudfront.net/f/f8/DoorIsUsableCondition_DT.png)](/index.php?title=File:DoorIsUsableCondition_DT.png)

  
6\. Drag a wire off the _True_ output of the **Branch** node and create an **Enable Input** node. It will be easiest to start typing "Enable Input" in the search line.

[![EnableInput DT.png](https://d26ilriwvtzlb.cloudfront.net/2/29/EnableInput_DT.png)](/index.php?title=File:EnableInput_DT.png)

  
7\. Drag a wire backwards form the _Player Controller_ input pin of the **Enable Input** node. Use the search line to create a **Get Player Controller** node.

[![GetPlayerController DT.png](https://d26ilriwvtzlb.cloudfront.net/7/74/GetPlayerController_DT.png)](/index.php?title=File:GetPlayerController_DT.png)

_For sake of simplicity in this introductory tutorial, we are simply enabling and disabling input for Player 0, which is the player of a single player game. Things would get slightly more intricate if you needed multiplayer support, and is beyond the scope of this tutorial set._

  
8\. Drag a wire from the _False_ output of the **Branch** node and create a **Door Open** function. This means that the door will open on proximity if the _Door Is Usable_ variable is currently set to false.

[![DoorOpenFromFalse DT.png](https://d26ilriwvtzlb.cloudfront.net/1/18/DoorOpenFromFalse_DT.png)](/index.php?title=File:DoorOpenFromFalse_DT.png)

  
9\. Repeat the above steps for the **OnComponentEndOverlap** node, but swap the nodes connected to the **Branch** for a **Disable Input** node and a **Door Close** function, as shown.

[![DisableInput DT.png](https://d26ilriwvtzlb.cloudfront.net/3/3a/DisableInput_DT.png)](/index.php?title=File:DisableInput_DT.png)

  
10\. Compile and save your Blueprint. At this time, there is no direct way to test our progress.

### Key Events

In the previous tutorial, we set up our door to have the _ability_ to accept inputs from the user. However, we now need to set up an event for the desired key press and tell the Blueprint script to do something with that input. To make sure things stay in sync with the current state of the door, we will start by creating a Boolean to track whether the door is open or closed.

  
1\. Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

2\. Create a new Boolean variable named _Door Is Open_. It requires no special settings. Ctrl-drag a Get variable node for _Door Is Open_ into the Graph.

[![DoorIsOpenVariable DT.png](https://d26ilriwvtzlb.cloudfront.net/6/6e/DoorIsOpenVariable_DT.png)](/index.php?title=File:DoorIsOpenVariable_DT.png)

  

[![DoorIsOpenCreated DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c3/DoorIsOpenCreated_DT.png)](/index.php?title=File:DoorIsOpenCreated_DT.png)

  
3\. Right-click and create a new Input Event for the F key. These are found under _Input > Key Events_.

[![InputKeyF DT.png](https://d26ilriwvtzlb.cloudfront.net/8/85/InputKeyF_DT.png)](/index.php?title=File:InputKeyF_DT.png)

  
4\. Drag a wire from the _Pressed_ output of the **InputKey F** event and create a new **Branch** node. Connect the **Door Is Open** node to the _Condition_ input.

[![InputBranch DT.png](https://d26ilriwvtzlb.cloudfront.net/6/69/InputBranch_DT.png)](/index.php?title=File:InputBranch_DT.png)

  
5\. The next part is pretty straightforward from a logical standpoint. Create **Door Open** and **Door Closed** function and connect them to the **Branch** such that if the door is closed, we open it; and vice versa.

[![InputBranchingInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/1/11/InputBranchingInPlace_DT.png)](/index.php?title=File:InputBranchingInPlace_DT.png)

  
6\. Our final step is to make sure that the _Door Is Open_ variable gets updated appropriately. **Alt-drag** a copy of the variable into the graph and connect it in between the **Custom Event DoorOpen** and the **Timeline - Door Driver** nodes. Make sure to check its default value so that sets the variable properly. Repeat for the **Custom Event DoorClose** node as shown.

[![SetDoorIsOpen DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b1/SetDoorIsOpen_DT.png)](/index.php?title=File:SetDoorIsOpen_DT.png)

  
7\. Compile and save your Blueprint. Notice the _Door Is Usable_ checkbox in the Details panel when the door is selected in the viewport. When checked, you should have to press _F_ to open the door. If unchcekd, the door should open when the player enters the BoxComponent.

[![DoorIsUsable Property DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c7/DoorIsUsable_Property_DT.png)](/index.php?title=File:DoorIsUsable_Property_DT.png)

  

### Finalizing Use Controls

We need to set up a system such when we press the Use key (F in our case) the door will open and close. Although we could employ a FlipFlop node to handle this type of behavior, this may introduce the occasional bug if the state of the door and the use of the key ever get out of sync. In short, we could wind up telling a closed door to close again. Instead, we will create a new Boolean variable that stores the current state of the door, and use that to branch behavior of what happens when we press the F key. If the door is open, we'll close it. If it's closed, we'll open it.

1\. Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

2\. Create a Custom Event named **UseKeyPressed**.

[![CustomEventUseKeyPressed DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2a/CustomEventUseKeyPressed_DT.png)](/index.php?title=File:CustomEventUseKeyPressed_DT.png)

  
The name UseKeyPressed was defined in an earlier tutorial in which we set up an InputComponent. If you have used another name to define the custom event for your use key, please use that instead. If necessary, go into the Components tab and double check the Action bindings on the InputController to make sure you're using the right name. Remember, if all else fails, just copy/paste it!

3\. Create a new Branch node and connect it to the **UseKeyPressed** event. Right-click on its Condition input and choose _Promote to Variable_. Set the name of the new Boolean variable to **DoorIsOpen**.

[![DoorIsOpenVariableGraph DT.png](https://d26ilriwvtzlb.cloudfront.net/d/d7/DoorIsOpenVariableGraph_DT.png)](/index.php?title=File:DoorIsOpenVariableGraph_DT.png)

  
4\. From the _True_ output pin, create a new **DoorClose** function (or duplicate one from elsewhere in the graph). From the _False_ output pin, create or duplicate a new DoorOpen function.

[![DoorUseMechanism DT.png](https://d26ilriwvtzlb.cloudfront.net/3/30/DoorUseMechanism_DT.png)](/index.php?title=File:DoorUseMechanism_DT.png)

  
5\. Alt-drag a copy of the DoorIsClosed Boolean variable (to create a set node) and connect one to each of the DoorOpen and DoorClosed functions. The DoorOpen version should set the variable to _True_ (checked), while the DoorClosed version should set it to _False_ (unchecked).

[![DoorVariableSet DT.png](https://d3ar1piqh1oeli.cloudfront.net/b/b3/DoorVariableSet_DT.png/940px-DoorVariableSet_DT.png)](/index.php?title=File:DoorVariableSet_DT.png)

  
6\. Compile and save your Blueprint. Test within the level.

*   If the door's DoorIsUsable setting is checked (look in the Details panel), then the door will not open when approached.
*   While within the BoxComponent, you should be able to press the Use key (F in our case) and thereby open and close the door.
*   If you step away from the door's BoxComponent, you should no longer be able to open and close door.
*   If the door's DoorIsUsable setting is UNchecked, then the door will simply work as a basic proximity door.

### Chapter 5: Troubleshooting

Problem

Solution

I press the F key and nothing happens!

There are a few possible causes for this problem:

Possible Issue

Solution

You're not enabling inputs for the Blueprint properly.

Keep in mind that when setting up the Use system, our Box Component's job changes from opening the door to firing an **Enable Inputs** function.

This means that the player controller is now able to pass inputs directly to the door Blueprint.

Make sure your network is set up so that if the _Door Is Usable_ variable is _True_, then the **OnComponentBeginOverlap** event branches to a **Begin Control** node, with a **Get Player Controller** node attached to the _New Controller_ input, and the Player index of the **Get Player Controller** set at 0.

The _Door Is Usable_ variable is not properly utilized.

You set a different key than F as your Key Event.

The _Door Is Usable_ variable must be set to Editable and must have its value checked in order for the inputs to work.

Double-check the tutorial steps before continuing. Although unlikely, we've actually seen this error pop up. Make sure that your Key Event is for the F key.

If it isn't either create the proper Key Event or try testing again while pressing whatever button you happened to use.

I can press Use and open and close the door, no matter where I am in the level.

The likeliest problem is that you're never firing an **Disable Input** node.

This means you're enabling inputs for the Blueprint door, but never relinquishing that ability.

Make sure that your **OnComponentEndOverlap** event uses a Branch to check the _Door Is Usable_ variable, and if it's set to _True_ you should be executing an **Disable Inputs** node.

Creating a Door Counter
-----------------------

Chapter 6 concludes this series of tutorials by demonstrating the creation of a special Blueprint whose sole job is to keep track of the number of times your door (or _doors_) open. While not directly practical in and of itself, this does demonstrate how you can send data from one Blueprint to another.

To make this happen, we are going to need to create and implement a custom Blueprint Interface. This interface will include a customized function, allowing us to send the name of the new Counter Blueprint to our door, so that it can send info back, reporting each time it opens. The Counter will simply hold an integer that increments each time it receives a function call.

Of particular importance in this case is that the Counter will increment its stored value whenever it receives this call, no matter where it's coming from. This means we can have any number of doors in our level, and as long as each door is associated with the same Counter Blueprint Actor, the value will always represent the total number of times that any door has opened.

### Custom Interface

As an exercise to help us see how Blueprints can talk to one another via Blueprint Interfaces, we are going to create a simple Blueprint that counts the number of times any of our level's doors open. This could potentially be used later for stat tracking, or even to cause some sort of event should enough doors be opened.

The system will work as follows:

*   We will create an interface that serves to pass data between all parts of our door system.
*   Our door will implement (or utilize) this interface.
*   We will create a new custom transaction counter Blueprint that also implements this interface.
*   Each time a door opens, it will call a custom increment function that is part of our interface.
*   Because the counter also implements our interface, this same function will be called on the counter Blueprint, which will increment the transaction count and print the total to the screen.

This process is purely academic; generally, you will not create Blueprints designed specifically to log data to the screen. The purpose here is to show how, by way of an interface, we can call functions on other Blueprints.

Please be aware that this Tutorial assumes that you have now been working with with Blueprints at least a bit. As such, there will not be as much handholding throughout the steps.

1\. Be sure to drag a copy of the Blueprint into the level for testing within PIE. Double-click the Blueprint to open it within the Blueprint Editor.

2\. In the Content Browser, within the folder of your choice, create a new Blueprint Interface. Name it _Interface\_Tutorial\_Door_. Double-click it to open this interface in the Interface Editor.

[![NewBPInterfaceMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0f/NewBPInterfaceMenu_DT.png)](/index.php?title=File:NewBPInterfaceMenu_DT.png)

  

[![NewBlueprintInterface DT.png](https://d26ilriwvtzlb.cloudfront.net/7/77/NewBlueprintInterface_DT.png)](/index.php?title=File:NewBlueprintInterface_DT.png)

  
3\. In the _My Blueprint_ panel, click the **New Function** button and create a function named **"IncrementDoorTransactions."** This new function will appear in the _My Blueprint_ list, and its graph will appear in the main editor view.

[![IncrementDoorTransactionsFunction DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2e/IncrementDoorTransactionsFunction_DT.png)](/index.php?title=File:IncrementDoorTransactionsFunction_DT.png)

  
Notice that you cannot add nodes as you would in the Blueprint Editor. An interface only contains functions that have no functionality in and of themselves. Within any Blueprint that implements that interface, you may then use that function as a template, defining custom functionality from there.

4\. Compile and save your Interface. We cannot yet test anything.

### Making the Counter Blueprint

With the interface complete, we now have a means by which to make function calls from one Blueprint to another. In this tutorial, we will create a new non-rendering Blueprint whose only job is to keep track of the number of times any associated door has opened and print that to the screen.

1\. In the Content Browser, create a new Blueprint. Set the Parent Class to Actor. Name this Blueprint **Tutorial\_Counter** and open it in the Blueprint Editor.

[![NewTutorialCounterBP DT.png](https://d26ilriwvtzlb.cloudfront.net/5/50/NewTutorialCounterBP_DT.png)](/index.php?title=File:NewTutorialCounterBP_DT.png)

  
2\. In the Components list **Components** Button in the Blueprint Editor toolbar), add a new **SpriteComponent** named _Marker_. This is only there to give us something to look at when the counter is placed in the level. We won't be using it for anything else. For newer UE4 v 4.12.5, the **SpriteComponent** is now called **BillboardComponent**.

[![NewMarkerSpriteComponent DT.png](https://d3ar1piqh1oeli.cloudfront.net/6/6e/NewMarkerSpriteComponent_DT.png/940px-NewMarkerSpriteComponent_DT.png)](/index.php?title=File:NewMarkerSpriteComponent_DT.png)

  
3\. At the top of the Blueprint Editor, click the **Blueprint Props** Button which for newer UE4 version is called **Class Settings**. In the _Details_ panel, look within the _Interfaces_ category and click the **Add Interface** Button. Choose _Interface\_Tutorial\_Door_ created in the previous tutorial. This will implement the interface, giving you access to all functions within that interface.

[![DoorInterfaceImplemented DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b0/DoorInterfaceImplemented_DT.png)](/index.php?title=File:DoorInterfaceImplemented_DT.png)

  
If you do not see your interface listed, make sure you saved the the interface!

4\. In the Event Graph, right-click and type "increment." You should see the IncrementDoorTransactions event appear within the list. Click it to create the event.

[![NewIncrementEvent DT.png](https://d26ilriwvtzlb.cloudfront.net/3/31/NewIncrementEvent_DT.png)](/index.php?title=File:NewIncrementEvent_DT.png)

  
5\. In the _My Blueprints_ panel click the **Add Variable** Button to create a new variable of type Int (integer) named DoorTransactions. This will hold the total door transactions for all doors associated with this Blueprint.

[![DoorTransactionsVariableCreated DT.png](https://d26ilriwvtzlb.cloudfront.net/2/27/DoorTransactionsVariableCreated_DT.png)](/index.php?title=File:DoorTransactionsVariableCreated_DT.png)

  
6\. Ctrl-drag a copy of the **Door Transactions** variable into the Event Graph.

[![GetDoorTransactions DT.png](https://d26ilriwvtzlb.cloudfront.net/f/fe/GetDoorTransactions_DT.png)](/index.php?title=File:GetDoorTransactions_DT.png)

  
7\. Drag a wire off the **Door Transactions** variable and type a **+** sign. You should see **\+ (Integer)** appear in the list. Click to create one, and set the second input field to 1. This will add 1 to the current value of the **Door Transactions** variable.

[![AddIntegerMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2a/AddIntegerMenu_DT.png)](/index.php?title=File:AddIntegerMenu_DT.png)

  

[![IntegerAddNode DT.png](https://d26ilriwvtzlb.cloudfront.net/3/3d/IntegerAddNode_DT.png)](/index.php?title=File:IntegerAddNode_DT.png)

  
8\. Alt-drag a copy of the **Door Transactions** variable into the Event Graph. This will create a **Set** node. Connect it to the event and then connect the result of the addition node to the Value input of the Set node.

[![SetDoorTransactions DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2d/SetDoorTransactions_DT.png)](/index.php?title=File:SetDoorTransactions_DT.png)

  
9\. Finally, create a **Print String** node. Wire it to take place after the Set variable node and connect the **Door Transactions** variable into the string input. Notice that a conversion node is automatically created.

[![LoggingDoorTransactions DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c9/LoggingDoorTransactions_DT.png)](/index.php?title=File:LoggingDoorTransactions_DT.png)

  
10\. Compile and save. At this point, the functionality for the complete. However, there is no way to test this until our door can be associated with the Blueprint.

### Blueprint Actor Setup

We will now finish up the final steps in creating our Door Counter Blueprint, allowing us to track door transactions.

1\. Open the _Tutorial\_Door_ Blueprint.

2\. At the top of the Blueprint Editor, click the **Blueprint Props** Button which in newer UE4 v 4.12.5 is **Class Settings** button. In the _Details_ panel, look within the **Interfaces** category, click the **New** Button and choose _Interface\_Tutorial\_Door_.

[![DoorInterfaceImplemented DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b0/DoorInterfaceImplemented_DT.png)](/index.php?title=File:DoorInterfaceImplemented_DT.png)

  
If you do not see your interface listed, make sure you saved the the interface!

3\. Create a new variable of type Actor, named **DoorCounter**. Set this variable to global and give it a tooltip of, "This holds an associated transaction counter Blueprint." Set the Custom Group Name to _Door Setup_.

[![DoorCounterVariableSettings DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b1/DoorCounterVariableSettings_DT.png)](/index.php?title=File:DoorCounterVariableSettings_DT.png)

  
It is important to create an Actor variable, which can reference an actor that is placed within the level, as opposed to an Object variable, which cannot.

4\. Locate the **DoorOpen** custom event, which should currently be connected to a **Set Door Is Open** node. Move the event away from the setter node and disconnect it.

[![DoorOpenSeparated DT.png](https://d26ilriwvtzlb.cloudfront.net/9/9b/DoorOpenSeparated_DT.png)](/index.php?title=File:DoorOpenSeparated_DT.png)

5\. Right-click in empty space (outside the Comment block!) and expand **Interface Messages**. You should see the name of your interface underneath. Expand this and you should see the **IncrementDoorTransactions** function. Click it to create the function.

[![IncrementDoorTransactionsMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/7/73/IncrementDoorTransactionsMenu_DT.png)](/index.php?title=File:IncrementDoorTransactionsMenu_DT.png)

  

[![IncrementDoorTransactionsNode DT.png](https://d26ilriwvtzlb.cloudfront.net/2/29/IncrementDoorTransactionsNode_DT.png)](/index.php?title=File:IncrementDoorTransactionsNode_DT.png)

  
It is absolutely vital that you choose the version of the function listed under Interface Messages. There is also a version that lies under Functions, but it will only work locally. Visually, the only difference is that the Interface Message version has a light blue banner across the top.

6\. Wire the new IncrementDoorTransactions node between the DoorOpen event and the Timeline.

[![IncrementDoorTransactionsWired DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0d/IncrementDoorTransactionsWired_DT.png)](/index.php?title=File:IncrementDoorTransactionsWired_DT.png)

  
7\. Ctrl-drag a copy of the DoorCounter variable into the Event Graph and connect it to the Target of the IncrementDoorTransactions function.

[![DoorCounterAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/a/ae/DoorCounterAdded_DT.png)](/index.php?title=File:DoorCounterAdded_DT.png)

  
8\. Compile and save.

9\. To test, do the following:

*   Drag a copy of the Counter Blueprint into the level.
*   Select the door, which should already be placed within the level.
*   Lock the Details panel, using the lock icon in the upper right of the panel.
*   Select the Counter Blueprint from the Scene Outliner list.
*   In the door's details, click the arrow next to the Door Counter setting. This will place a copy of that actor into the slot, associating the counter with that door.
*   Optionally, create additional doors and associate them with this counter blueprint. No matter which door opens, the transactions should continue to increment.

### Chapter 6: Troubleshooting

Problem

Solution

I don't see my Blueprint Interface in the Interface list.

Make sure you saved the Interface asset in the Content Browser.

Though rarely an issue, you should also try closing and re-opening your Blueprint in the Blueprint Editor.

I cannot connect my DoorCounter variable to the Target input on the IncrementDoorTransactions function.

The likeliest problem is that you're using the wrong _version_ of your function.

Each function has a local and non-local version. You want to make sure you're using the one listed under **Interface Messages** in the context menu.

That's the only one that actually transmits by way of the interface to other Blueprints.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Automated\_Door\_Tutorial&oldid=117](https://wiki.unrealengine.com/index.php?title=Blueprint_Automated_Door_Tutorial&oldid=117)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Blueprint](/index.php?title=Category:Blueprint "Category:Blueprint")