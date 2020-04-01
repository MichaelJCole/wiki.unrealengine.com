Creating a Skeletal Mesh in Blender - Epic Wiki                    

Creating a Skeletal Mesh in Blender
===================================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) **This tutorial is still a rough draft.**  
While I have checked the steps of the tutorial they are still written in a terse style that may make them hard to follow.  
Still I am posting this draft in the hope that even in its rough form it can prove helpful to other UE4 users.  
I plan to plan to edit the prose for clarity and add diagrams in the near future.

Contents
--------

*   [1 Overview](#Overview)
*   [2 Caveats](#Caveats)
*   [3 Versions](#Versions)
*   [4 Assets](#Assets)
*   [5 TL;DR. Just Give me Some Pointers](#TL.3BDR._Just_Give_me_Some_Pointers)
*   [6 Creating a Skeletal Mesh, Step-by-Step](#Creating_a_Skeletal_Mesh.2C_Step-by-Step)
    *   [6.1 Creating a New Scene](#Creating_a_New_Scene)
        *   [6.1.1 Create a new Project](#Create_a_new_Project)
        *   [6.1.2 Move Default Light & Camera to own Layer](#Move_Default_Light_.26_Camera_to_own_Layer)
        *   [6.1.3 Set Scene Scale to match Unreal Units](#Set_Scene_Scale_to_match_Unreal_Units)
        *   [6.1.4 Rename & Scale Cube](#Rename_.26_Scale_Cube)
    *   [6.2 Creating your Model](#Creating_your_Model)
        *   [6.2.1 Preparing to Model](#Preparing_to_Model)
        *   [6.2.2 Model Arm](#Model_Arm)
        *   [6.2.3 Model Leg](#Model_Leg)
        *   [6.2.4 Mirror to Create Body](#Mirror_to_Create_Body)
        *   [6.2.5 Model Head](#Model_Head)
        *   [6.2.6 Subdivision and Smoothing](#Subdivision_and_Smoothing)
        *   [6.2.7 Thin-out Model](#Thin-out_Model)
        *   [6.2.8 Preparing to Make Face](#Preparing_to_Make_Face)
        *   [6.2.9 Make the Left Eye](#Make_the_Left_Eye)
        *   [6.2.10 Mirror the Right Eye](#Mirror_the_Right_Eye)
        *   [6.2.11 Make a Mouth](#Make_a_Mouth)
        *   [6.2.12 Make Buttons](#Make_Buttons)
    *   [6.3 Texturing your Model](#Texturing_your_Model)
        *   [6.3.1 Getting ready to Texture Map](#Getting_ready_to_Texture_Map)
        *   [6.3.2 Apply the Cookie Texture](#Apply_the_Cookie_Texture)
        *   [6.3.3 Apply the Candy Texture](#Apply_the_Candy_Texture)
        *   [6.3.4 Getting Ready to Create Lightmap UVs](#Getting_Ready_to_Create_Lightmap_UVs)
        *   [6.3.5 Add Lightmap UVs](#Add_Lightmap_UVs)
    *   [6.4 Exporting a Static Mesh (Optional)](#Exporting_a_Static_Mesh_.28Optional.29)
        *   [6.4.1 Export Mesh FBX](#Export_Mesh_FBX)
        *   [6.4.2 Importing into UE4](#Importing_into_UE4)
        *   [6.4.3 Creating Materials and Assigning Them](#Creating_Materials_and_Assigning_Them)
    *   [6.5 Rigging your Model](#Rigging_your_Model)
        *   [6.5.1 Preparing to Rig](#Preparing_to_Rig)
        *   [6.5.2 Creating the Rig](#Creating_the_Rig)
        *   [6.5.3 Skinning the Mesh with the Rig](#Skinning_the_Mesh_with_the_Rig)
    *   [6.6 Animating your Model](#Animating_your_Model)
        *   [6.6.1 Preparing to Animate](#Preparing_to_Animate)
        *   [6.6.2 Your First Animation](#Your_First_Animation)
        *   [6.6.3 Your Second Animation](#Your_Second_Animation)
    *   [6.7 Exporting a Skeletal Mesh](#Exporting_a_Skeletal_Mesh)
        *   [6.7.1 Export Skeletal Mesh](#Export_Skeletal_Mesh)
        *   [6.7.2 Import Skeletal Mesh](#Import_Skeletal_Mesh)
        *   [6.7.3 Creating Materials and Assigning Them](#Creating_Materials_and_Assigning_Them_2)
        *   [6.7.4 Import Animations](#Import_Animations)
*   [7 Troubleshooting](#Troubleshooting)
    *   [7.1 Help! Skeletal Mesh Import Never Ends!](#Help.21_Skeletal_Mesh_Import_Never_Ends.21)
    *   [7.2 Help! My Skeletal Mesh is All Spikey!](#Help.21_My_Skeletal_Mesh_is_All_Spikey.21)
*   [8 Who Wrote this?](#Who_Wrote_this.3F)

Overview
--------

This tutorial is geared toward users who are new to Blender. It is a step-by-step guide that will walk you through the steps needed to create a simple model and armature that can be imported into UE4 as an animated skeletal mesh. I’m assuming some basic knowledge of UE4’s content browser and material setup.

This tutorial is based on the Gus the Gingebread man animation tutorial ([\[1\]](http://wiki.blender.org/index.php/Doc:2.6/Manual/Your_First_Animation)) from the Blender Wiki. I’ve modified various parts of the tutorial to make the resulting model more UE4-friendly.

There is also a Video tutorial created by EPIC employee Kevin Vassey [https://www.youtube.com/watch?v=Ayp1lof0RJU](https://www.youtube.com/watch?v=Ayp1lof0RJU)

Caveats
-------

I’m not a Blender expert, nor a 3D modeler/animator. I’m a Programmer/Game Designer by trade, so don’t expect great art or an ideal workflow. The best I can offer is making something that works. Making it beautiful will have to be up to you!

Versions
--------

I last tested this tutorial with Blender 2.70a and Unreal Engine 4.2.1.

Assets
------

You can download the Blender project file as well as the textures used in this tutorial here: [Media:UE4SkeletalMeshFromBlender.zip](https://d26ilriwvtzlb.cloudfront.net/c/ce/UE4SkeletalMeshFromBlender.zip "UE4SkeletalMeshFromBlender.zip")

TL;DR. Just Give me Some Pointers
=================================

Already know how to use Blender and just want some tips to have your model behave better in UE4? Well here you go:

*   Use the Scene Property tab, set your Units to Metric and Scale to 0.01. This will better match Blender Units to Unreal Units.
*   Add a 2nd UV map to your model to serve as lightmap UVs in Unreal. Make sure UVs don’t overlap in the 2nd UV map. (They can overlap in your 1st UV map just fine.)
*   You should have a single armature in your FBX that parents your mesh
*   The armature should have one root bone from which all other bones are hierarchically connected
*   You can use the Action Editor to organize multiple animations in one project
*   You can use the F button to Force a reference to exist on an action in the Action Editor so it doesn’t disappear when closing your Blender project
*   When exporting your FBX, select Armature & Mesh and deselect the “Include Default Take” option
*   When importing the FBX, you import into Unreal twice. First, you import the skeleton. Next, you import the animations and apply them to the skeleton you created.

Creating a Skeletal Mesh, Step-by-Step
======================================

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) Abbreviations  
LMB mean Left Mouse Button  
RMB means Right Mouse Button

Creating a New Scene
--------------------

### Create a new Project

*   With Blender open, press Ctrl+N then Enter to create a new project
*   You should have a new scene with a light, a camera, and a cube

### Move Default Light & Camera to own Layer

*   Select the Camera using RMB
*   Use SHIFT + RMB to add the LIght to the selection
*   Press M to bring up the Layer menu
*   LMB on a layer on the right side of the pop-up menu
*   Press enter to close the Layer menu

### Set Scene Scale to match Unreal Units

*   Select the Scene Property tab with LMB
*   Set Units to Metric
*   Set Scale to 0.01

### Rename & Scale Cube

*   Select Cube with RMB
*   Select Object Info Tab with LMB
*   Rename "Cube" to "CookieMan"
*   Select View -> Front (or Numpad 1) to set camera to Front Ortho
*   Use Mousewheel to zoom camera way out (until text below Front Ortho reads Meters)
*   Press S to enter scaling mode
*   Hold CTRL while moving mouse to scale cube by 100
*   Once scale is 100, LMB to apply change
*   Press CTRL + A to bring up Apply menu and select Scale

Creating your Model
-------------------

### Preparing to Model

*   Press TAB while mousing over 3D Window to switch to edit mode
*   Select 'Subdivide' from Mesh Tools
*   Press A to Unselect all vertices
*   Toggle off "Limit selection to visible"
*   Select all vertices on left with border select (B -> drag-box -> LMB)
*   Delete vertices by pressing DEL then selecting Vertices from pop-up menu

### Model Arm

*   B to border select, select upper 2 vertices on right side
*   Press E to extrude
*   Drag left 1 meter, hold CTRL to snap to grid borders, click LMB to apply
*   Zoom in to 10 Centimeters distance
*   E to extrude
*   Drag left 50 cm, hold CTRL to snap, LMB to apply
*   Press A to deselect

### Model Leg

*   B to border select, select bottom 2 vertices
*   E to extrude, click MMB to disable axis-lock
*   Drag 1 meter down, 40 cm to right, hold CTRL to snap, LMB to apply
*   E to extrude, click MMB to disable axis-lock
*   Drag 80 cm down, 40 cm to right, hold CTRL to snap, LMB to apply
*   E to extrude, click MMB to disable axis-lock
*   Drag 20 cm down, 10 cm to right, hold CTRL to snap, LMB to apply

### Mirror to Create Body

*   Tab in 3D window to return to Object Mode
*   Select Modifier Tab
*   Select Mirror modifier from Generate column
*   Body should be mirrored nicely

### Model Head

*   Tab in 3D window to go to Edit Mode
*   Press SHIFT + A to bring up add menu. Select Cube from the pop-up menu
*   Press G to 'grab' cube, press Z to lock to z-axis
*   Move the cube up 180 cm, LMB to lock into position

### Subdivision and Smoothing

*   Tab in 3D window to go back to Object mode
*   Select Modifier Tab
*   Select Subdivision Surface modifier from Generate column
*   Set View & Render to 2
*   Tab into Edit Mode
*   Press A to de-select, then Press A to select all
*   Press CTRL-F the Faces menu. Select Shade Smooth
*   Tab back to Object Mode

### Thin-out Model

*   Hold MMB to rotate view and see model from various angles, notice that he's too fat depth-wise
*   Press 'S' to scale, 'Y' to lock to y-axis
*   Hold CTRL and move mouse to scale down to 0.4 on the Y axis
*   Press CTRL + A to bring up Apply menu and select Scale

### Preparing to Make Face

*   Create 2nd 3D Window by dragging from handle on corner of 3D Window
*   View -> Front to set one 3D Window to Front Ortho view
*   Set Viewport shading to wireframe
*   View -> Right to set other 3D Window to Right Ortho view
*   Set Viewport shading to wireframe
*   Use SHIFT+RMB and Mousewheel to zoom & center face in each of the views
*   Probably useful to have one more view, so drag off the handle of a 3D window for a third window
*   Use hold MMB and drag to rotate the perspective camera
*   Set Viewport shading to Solid

### Make the Left Eye

*   LMB to place cursor in-between where the eyes will go on the head
*   Press SHIFT + S to open the Snap menu. Select Cursor to Grid to align cursor
*   Press SHIFT + A to open Add menu, select Mesh -> UV Sphere
*   Press F6 and set segments to 16, Press ESC to close the pop-up menu
*   Tab in a 3D Window to go to Edit mode
*   Press A to unselect all vertices
*   Press B to and drag a box to boundary select the rear vertices of the sphere
*   Tab back to Object Mode
*   Press S then hold CTRL while moving the mouse to scale the sphere down to 0.2, left-click to apply
*   In the Front viewport, press G to enter 'grab' mode, then X to lock to the X-axis
*   Move the eye to the left of the face. Left-click to apply
*   In the Right viewport, press G to enter 'grab' mode, then Y to lock to the Y-axis
*   Move the eye to until it's properly embedded in the head. Left-click to apply

### Mirror the Right Eye

*   Tab to enter Edit mode
*   Set the pivot point to 3D Cursor
*   Press A to select all verts
*   Press SHIFT+D to duplicate these verts. You will automatically be in 'grab' mode, so press ESC to leave 'grab' mode
*   Press CTRL+M to start mirroring the duplicated verts,
*   Press X to apply the mirror along the X-axis. Press Enter to apply the mirror operation
*   Press A to unselect verts, press A again to select both the original and duplicated verts
*   Press CTRL+F then select Smooth Shading
*   Press CTRL+N to make normals consistent

### Make a Mouth

*   Tab back to Object Mode
*   Left-click then SHIFT+S to place the 3D Cursor on the center of the face
*   SHIFT+A, Mesh->UV Sphere
*   Tab in a 3D Window to go to Edit mode
*   Press S then hold CTRL while moving the mouse to scale the sphere down to 0.1, left-click to apply
*   Press G to enter 'grab' mode and position the sphere to form the corner of the mouth
*   Do the same in the Right viewport to make sure the depth of the sphere is correct
*   Tab to Edit mode
*   Press A to make sure all verts of the mouth sphere are selected
*   Press ALT+R to apply the Spin tool
*   In the Spin tool window, change Steps to 3
*   Press A to unselect all vertices
*   Press B to and drag a box to boundary select the rear vertices of the sphere
*   Delete the rear vertices
*   Press A to select all remaining vertices
*   Press CTRL+F then select Smooth Shading
*   CTRL+N to make normals consistent

### Make Buttons

*   SHIFT+A, Mesh->UV Sphere to create the first button
*   Press S then hold CTRL while moving the mouse to scale the sphere down to 0.2, left-click to apply
*   From the Front view, Press G, then Z to move the sphere down to the CookieMan's chest
*   From the Right view, Press G, then Y to move the sphere into the CookieMan's chest
*   Press A to unselect all vertices
*   Press B to and drag a box to boundary select the rear vertices of the sphere
*   Delete the rear vertices
*   Press A to select all remaining vertices
*   SHIFT+D to duplicate the verts, then Z to lock to the Z-axis
*   Move the button down the CookieMan's body
*   Do the same for one more button
*   Press A then A again to select all remaining vertices
*   Press CTRL+F then select Smooth Shading
*   CTRL+N to make normals consistent

Texturing your Model
--------------------

### Getting ready to Texture Map

*   Tab back to Object Mode
*   Drag the handle of one of the 3D Windows up to the 3D Window above it, an arror should appear. The two windows will merge leaving only one.
*   Set one 3D Window to Viewport Shading to Texture
*   Set the other window to UV/Image Editor
*   RMB to select CookieMan's body
*   Select the Modifier Info tab
*   Click the Apply button for the Subdivision and Mirror modifiers

### Apply the Cookie Texture

*   Select the Texture Info Tab
*   There should be a default texture entry, set the type to Image or Movie
*   Open Cookie512.tga from the Image section of the Texture Info tab
*   Under Mapping, set Coordinate to UV
*   With the mouse over the 3D Window, press Tab to enter Edit mode
*   RMB to select CookieMan's body
*   Tab to Enter Edit Mode
*   Press A to select all vertices
*   Press U to open the Unwrap menu
*   Select Smart UV Project then click OK to accept the default values
*   In the UV/Image Editor, set the Image pulldown to Cookie512.tga
*   Tab in the 3D Window to return to Object Mode

### Apply the Candy Texture

*   RMB to select the Eyes
*   Go to the texture panel and create a texture entry if one doesn't already exist by clicking on the +New button
*   Set the texture type to Image or Movie, then open Candy512.tga
*   With the mouse over the 3D Window, press Tab to enter Edit mode
*   Press A to select all vertices
*   Press U to open the Unwrap menu
*   Select Smart UV Project then click OK to accept the default values
*   In the UV/Image Editor, set the Image pulldown to Candy512.tga
*   In the image editor, select all the vertices by pressing A
*   Press S then use the mouse to scale the faces and G to position them so they fit within the black square of the texture
*   With the mouse over the 3D Window, press Tab to leave Edit Mode
*   Select the Mouth mesh, tab to enter Edit mode, then repeat the above mapping process only using a white square this time
*   Once the Mouth is mapped, it is time to do the same for the buttons
*   This time, enter Edit mode first, press B and use boundary select to choose just the vertices of the top button
*   Press U then Smart UV Project to set UV coordinates for just that button
*   In the UV/Image editor, set Candy512.tga as before then scale/translate the coords to the red part of the texture
*   Do the same for the middle and bottom buttons, placing them on the blue and green parts of the texture respectively

### Getting Ready to Create Lightmap UVs

*   In the 3D Window, Tab to Object Mode
*   RMB to select the Eyes, then SHIFT + RMB to add the CookieMan's body to the selection
*   Press CTRL+J to merge the Eyes into the CookieMan mesh. They are now the same object
*   Press A to clear the selection
*   RMB to select the Mouth, then SHIFT + RMB to add the CookieMan's body to the selection
*   Press CTRL+J to merge the Mouth into the CookieMan mesh.
*   Press A to clear the selection
*   RMB to select the Buttons, then SHIFT + RMB to add the CookieMan's body to the selection
*   Press CTRL+J to merge the Buttons into the CookieMan mesh.
*   CookieMan should now consist of one mesh

### Add Lightmap UVs

*   With CookieMan selected, click on the Object Data panel (little mesh triangle icon)
*   Under the UV Maps tab, press the plus icon on the right to add a new UV map
*   Name the new UV map "Lightmap"
*   Make sure the new "Lightmap" UV Map is selected
*   In the 3D Window, tab to Edit mode
*   Press A to select all the vertices of Cookie map
*   Press U, then select Smart UV Project
*   In the UV/Image editor press CTRL+A, then CTRL+P to minimize overlap
*   You should now have non-overlapping UV coordinates, you can change which UVs are displayed by selecting them in the Object Data panel's UV Maps section

Exporting a Static Mesh (Optional)
----------------------------------

### Export Mesh FBX

*   Select File->Export->Autodesk FBX
*   In the Export FBX section, select Mesh only
*   Click "Export FBX"

### Importing into UE4

*   Drag FBX into Content Browser
*   Select Static Mesh

### Creating Materials and Assigning Them

*   Create Material
*   Assign Textures

Rigging your Model
------------------

### Preparing to Rig

*   Set one window to 3D View with Right Ortho View
*   Set another window to 3D View with Front Orth View
*   Shift + C to center 3D Cursor
*   In Object mode with Gus selected, press G to go into Grab mode
*   Press Z to lock to the Z-axis
*   Hold Ctrl while moving mouse up to position feet at 0 on the Z-axis

### Creating the Rig

*   In Object Mode, Shift+A to open Add menu. Select Armature->Single Bone
*   (With armature selected) Tab into Edit Mode, press G to enter Grab mode. End of newly-added bone is selected
*   Hold Shift to lock axis while moving the bone end up to Gus's hip. LMB to apply
*   With bone end still selected, CTRL+LMB to create Gus's left hip bone
*   CTRL+LMB again to create his knee bone
*   CTRL+LMB again to creat his foot bone (See picture)
*   RMB on the end of the first bone again
*   With bone end still selected, CTRL+LMB to create Gus's right hip bone
*   CTRL+LMB again to create his knee bone
*   CTRL+LMB again to creat his foot bone
*   RMB on the end of the first bone again
*   CTRL+LMB to create a spine bone up to the middle button
*   CTRL+LMB to create a spine bone up to just above the top button (See picture)
*   CTRL+LMB to create right shoulder bone
*   CTRL+LMB to create right arm bone
*   RMB on top spine bone
*   CTRL+LMB to create left shoulder bone
*   CTRL+LMB to create left arm bone
*   RMB on top spine bone
*   CTRL+LMB to create head bone
*   In the Object Data tab, check Names in the Display selection
*   Click the Bone tab and rename the selected bone to "Head"
*   Using RMB to select and the Bone tab, rename the bones as seen in the picture

### Skinning the Mesh with the Rig

*   Tab to Object Mode
*   Press A until nothing is selected
*   Select Gus's mesh with RMB
*   Then SHIFT+RMB to select the Armature
*   CTRL+P to parent mesh to the Armature. Select Armature Deform -> With Automatic Weights
*   If missing some verts from bones, you can select and assign them from Vertex Groups area

Animating your Model
--------------------

### Preparing to Animate

*   Left-click drag handle of left window to create new window
*   Set lower window to Dope Sheet
*   Set mode to Action Editor, this window will help you organize multiple animations in one Blender project
*   Left-click drag handle of right window down to create a new window
*   Drag this window around to get a decent perspective view of Gus
*   In the Object Data tab, check Names in the Display selection to hide bone names

### Your First Animation

*   Click + button to create new action
*   Rename 'Action' to 'Idle'
*   Click F button to Force a reference
*   Select Armature in Object Mode
*   Tab into Edit Mode
*   Set mode to Pose Mode
*   Press A to select all bones
*   Press I to bring up Insert Keyframe menu. Select Rotation.
*   Scrub to Frame 30. Press I and keyframe Rotations
*   Scrub to 10
*   Select bones with RMB, press R to rotate, LMB to apply rotations. Pose like so.
*   Press A until all bones are selected. Press I then select Rotations.
*   Scrub to 20
*   ALT+R to clear rotations
*   Select bones with RMB, press R to rotate, LMB to apply rotations. Pose like so.

### Your Second Animation

*   Repeat the above to create as many animations as you need

Exporting a Skeletal Mesh
-------------------------

### Export Skeletal Mesh

*   Select File->Export->Autodesk FBX
*   In the Export FBX section, select Mesh and Armature
*   Deselect "Include Default Take"
*   Click "Export FBX"

Video example (Blender 2.75, UE 4.8.1): [https://www.youtube.com/watch?v=kiJHNjRpwrY](https://www.youtube.com/watch?v=kiJHNjRpwrY)

### Import Skeletal Mesh

*   Drag into UE4
*   Select Skeletal Mesh and click Import

### Creating Materials and Assigning Them

*   Create Material
*   Assign Textures

### Import Animations

*   Drag into UE4
*   Select Animation
*   Select the Skeletal Mesh you imported from the dropdown list
*   Click Import

Troubleshooting
===============

Help! Skeletal Mesh Import Never Ends!
--------------------------------------

Check your armature in your Blender project. Make sure you only have one armature. Also, make sure that all the bones in the armature are hierarchically linked to a single root bone.

Help! My Skeletal Mesh is All Spikey!
-------------------------------------

You probably have some vertices that aren’t assigned to a bone. Look at the Vertex Groups of your mesh in Edit mode and make sure the spiking vertices are assigned to a vertex group.

Who Wrote this?
===============

Original Version by [NobunagaOta](/User:NobunagaOta "User:NobunagaOta")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_a\_Skeletal\_Mesh\_in\_Blender&oldid=14652](https://wiki.unrealengine.com/index.php?title=Creating_a_Skeletal_Mesh_in_Blender&oldid=14652)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)