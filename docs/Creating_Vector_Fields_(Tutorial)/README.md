Creating Vector Fields (Tutorial) - Epic Wiki                    

Creating Vector Fields (Tutorial)
=================================

  

Contents
--------

*   [1 Overview](#Overview)
*   [2 Authoring Vector fields](#Authoring_Vector_fields)
*   [3 Installing the 'UE4\_FX' Maya shelf and FGA Export Script](#Installing_the_.27UE4_FX.27_Maya_shelf_and_FGA_Export_Script)
*   [4 Setting up the Maya Fluid Container](#Setting_up_the_Maya_Fluid_Container)
*   [5 Emitting Attributes into the Container and Simulating](#Emitting_Attributes_into_the_Container_and_Simulating)
*   [6 Exporting Velocity Values From Maya Fluid Containers](#Exporting_Velocity_Values_From_Maya_Fluid_Containers)
*   [7 Importing an .FGA File into UE4](#Importing_an_.FGA_File_into_UE4)
*   [8 Setting up a particle system with a Local Vector Field](#Setting_up_a_particle_system_with_a_Local_Vector_Field)
*   [9 Local Vector Field Module Parameters](#Local_Vector_Field_Module_Parameters)

Overview
--------

In UE4, a vector grid is a 3 dimensional grid sub-divided into individual volume pixels, or 'voxels,' with each voxel storing a velocity vector (in x, y and z). This grid is useful because Cascade can treat it as a field which can influence the motion of particles inside of it. It may help to think of a vector field as a volume in space which contains 'wind' that can affect particles which move through it.

Two types of vector fields exist: Local Vector fields, which live inside a particle system, and global vector fields which live in the world and may affect any particle systems located within its bounding box, if those particle system have the Global Vector Field module's Field Scale parameter set higher than 1.

The focus of this document is authoring a local vector field.

Authoring Vector fields
-----------------------

You may author vector fields any way you like but we have found Maya fluids to be a straightforward way to generate the 3 dimensional velocity data needed. To ease this process, we have written a MEL script which only exports velocity data from Maya's fluid containers and stores them as an .FGA file (Fluid Grid ASCII). This file is a text table which you can easily edit by hand if need be.

Installing the 'UE4\_FX' Maya shelf and FGA Export Script
---------------------------------------------------------

> **Note:** The Fluid Grid export script contained within this Maya shelf has been tested with Maya 2012 x64.

1\. In the shelf pane, click the left hand drop down arrow and select **Load Shelf..**:

[![LoadShelf VF.jpg](https://d26ilriwvtzlb.cloudfront.net/0/01/LoadShelf_VF.jpg)](/File:LoadShelf_VF.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:LoadShelf_VF.jpg "Enlarge")

  

2\. Inside the file browser, navigate to: `[UE4Root]\Engine\Extras\MayaVelocityGridExporter\`

[![LoadShelfWindow VF.jpg](https://d26ilriwvtzlb.cloudfront.net/8/8c/LoadShelfWindow_VF.jpg)](/File:LoadShelfWindow_VF.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:LoadShelfWindow_VF.jpg "Enlarge")

  

3\. Once you click open, you will find a new shelf tab entitled **UE4\_FX** which contains a single button. Clicking on this icon will bring up a dialog box along with various FGA export options.

By default the shelf contains a single button using a placeholder icon. A custom icon is located at `../UE4/Engine/Extras/FX_tools/Maya2012_x64/UE4_FX_Tools/Prefs/Icons/fgaClean.png` if you wish to use it. To install the custom icon, simply copy it to your Maya user preferences directory (e.g., \`C:/Users/\[User\]/Documents/maya/2012-x64/prefs/icon\`).

[![InstalledFGAShelf VF.jpg](https://d26ilriwvtzlb.cloudfront.net/8/80/InstalledFGAShelf_VF.jpg)](/File:InstalledFGAShelf_VF.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:InstalledFGAShelf_VF.jpg "Enlarge")

  

4\. The tools to export Maya fluid containers to UE4's fluid grid format are now installed and ready to use.

Setting up the Maya Fluid Container
-----------------------------------

Creating vector fields in Maya requires the use of a Fluid container.

1\. Switch to the dynamics major mode and then from the FluidEffects menu, select 'Create 3D Container.' This will drop a Maya fluid container in your perspective viewport. The first thing to do is to select it and then in the Attribute editor, select the 'Keep Voxels Square' checkbox.

[![ContainerProperties VF.png](https://d26ilriwvtzlb.cloudfront.net/1/1a/ContainerProperties_VF.png)](/File:ContainerProperties_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:ContainerProperties_VF.png "Enlarge")

  

> **Note:** Because UE4's velocity grid cascade module operates on the GPU, Maya fluid containers need to have power-of-2 Resolution values (voxel count), with the maximum voxel count in any one axis being 128.

2\. Adjust the scale of the fluid container by going in its properties and changing the size setting:

[![SizeProperty VF.jpg](https://d26ilriwvtzlb.cloudfront.net/f/f3/SizeProperty_VF.jpg)](/File:SizeProperty_VF.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:SizeProperty_VF.jpg "Enlarge")

  

The base resolution now indicates the longest side's resolution, with the other sides resolution being scale proportionally to their relative sizes. Here is an example of a rectangular 16x32x16 grid which adheres to the power of two requirements.

[![Grid VF.png](https://d26ilriwvtzlb.cloudfront.net/9/92/Grid_VF.png)](/File:Grid_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:Grid_VF.png "Enlarge")

  

3\. Set all the boundary conditions of the grid to \*\*\_None\_\*\*; allowing fluid simulation to 'exit' the fluid container.

4\. Finally we need to enable the display of velocity vectors so we can see the data we want to export to UE4. In the \*\*Display\*\* section of the fluid container, check the \*\*Velocity Draw\*\* checkbox.

Emitting Attributes into the Container and Simulating
-----------------------------------------------------

An emitter must be added to the fluid container in order to emit a variety of attributes which can disturb the grid values.

1\. Select the fluid container and from the Fluid Effects menu, select **add/edit contents > Emitter**.

[![AddEmitter VF.png](https://d26ilriwvtzlb.cloudfront.net/b/be/AddEmitter_VF.png)](/File:AddEmitter_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:AddEmitter_VF.png "Enlarge")

  

2\. In the **Emiter Fluid Attributes**, set **Heat/Voxel/Sec** to \`250\`. This means the emitter will be emitting heat into the container. Heat will cause the density to rise.

3\. Now select the emitter and scale it wider and move it down towards the base of the container.

[![ScaleEmitter VF.png](https://d26ilriwvtzlb.cloudfront.net/e/e0/ScaleEmitter_VF.png)](/File:ScaleEmitter_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:ScaleEmitter_VF.png "Enlarge")

  

4\. In order for the container grid to react to dynamic heat contributions, the Maya fluid container **Temperature** method must be set to **Dynamic Grid**. This setting is located on the container grid shape.

[![TemperatureProperty VF.png](https://d26ilriwvtzlb.cloudfront.net/8/8d/TemperatureProperty_VF.png)](/File:TemperatureProperty_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:TemperatureProperty_VF.png "Enlarge")

  

5\. Now play back the timeline to view the simulation. You should get something similar to this. I have also added some noise to the container attributes. You can do this by changing the velocity swirl, noise and turbulence strength and frequency parameters in the 'Contents Details' section of the fluid container.

6\. The result should look similar to this:

[![Result VF.png](https://d26ilriwvtzlb.cloudfront.net/0/09/Result_VF.png)](/File:Result_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:Result_VF.png "Enlarge")

  

Exporting Velocity Values From Maya Fluid Containers
----------------------------------------------------

In this example, a single frame of the simulation is exported to use as a static velocity field in UE4.

1\. Select your fluid container and click on the FGA icon in the \*\*UE4\_FX\*\* shelf. The \*\*UE4 Velocity Grid Exporter\*\* dialog box will appear.

[![ExportDialog VF.png](https://d26ilriwvtzlb.cloudfront.net/1/10/ExportDialog_VF.png)](/File:ExportDialog_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:ExportDialog_VF.png "Enlarge")

  

2\. Set the start frame that you like, along with the destination folder.

3\. Hit export and you will see a file on disk. This is the file you will import into UE4.

[![FgaFile VF.png](https://d26ilriwvtzlb.cloudfront.net/6/64/FgaFile_VF.png)](/File:FgaFile_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:FgaFile_VF.png "Enlarge")

  

Importing an .FGA File into UE4
-------------------------------

1\. Launch UE4, open the Content Browser. Either click the New button and choose \_Import\_, or right-click and select \_import\_ from the contextual menu.

[![ImportOption VF.png](https://d26ilriwvtzlb.cloudfront.net/2/23/ImportOption_VF.png)](/File:ImportOption_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:ImportOption_VF.png "Enlarge")

  

2\. In the file browser navigate to the FGA that was saved out earlier.

[![ImportDialog VF.png](https://d26ilriwvtzlb.cloudfront.net/d/d5/ImportDialog_VF.png)](/File:ImportDialog_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:ImportDialog_VF.png "Enlarge")

  

> **Note:** If you have a lot of files in the same directory, you can set the file browser's filter to \_Fluid Grid Ascii\_.

3\. In the Content Browser you should now see a \_VectorField Static\_ asset.

[![VectorFieldAsset VF.png](https://d26ilriwvtzlb.cloudfront.net/4/43/VectorFieldAsset_VF.png)](/File:VectorFieldAsset_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:VectorFieldAsset_VF.png "Enlarge")

  

Setting up a particle system with a Local Vector Field
------------------------------------------------------

1\. Create a new particle system in the content browser. Once it is created, the Cascade window will appear.

2\. Right-click on the black space above the emitter's module and convert the particle system dataType to **GPU Sprites**.

3\. Next, add a **Cylinder** location module with its Height axis set to Y. Increase the Spawn module Rate property to around 50. Then delete the Initial Velocity as the particle motion will come from the local vector field. You should have something similar to this:

[![CylinderExample VF.png](https://d26ilriwvtzlb.cloudfront.net/2/21/CylinderExample_VF.png)](/File:CylinderExample_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:CylinderExample_VF.png "Enlarge")

  

4\. Right-click below the existing modules and add a local vector field module to the emitter.

[![LocalVectorFieldModule VF.png](https://d26ilriwvtzlb.cloudfront.net/e/e2/LocalVectorFieldModule_VF.png)](/File:LocalVectorFieldModule_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:LocalVectorFieldModule_VF.png "Enlarge")

  

The local vector field module will influence the motion of your particles when they are physically inside the Local vector field module's bounding box.

5\. Assign the vector field asset to the Vector field slot in the Local vector field cascade module. You may want to visualize the vector field velocities in the viewport by selecting the \*\*View > Vector Fields\*\* inside Cascade's main menu.

[![VisualizeVectorFields VF.png](https://d26ilriwvtzlb.cloudfront.net/2/25/VisualizeVectorFields_VF.png)](/File:VisualizeVectorFields_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:VisualizeVectorFields_VF.png "Enlarge")

  

6\. In its parameters, scale the Vector Fields's relative scale to 2 2 2 and translate the grid using the vector fields gizmo which appears in the Cascade preview window when the Local vector Field module is selected.

7\. You should now see the particles moving in the preview window, driven by the Vector field velocities.

[![Movement VF.png](https://d26ilriwvtzlb.cloudfront.net/e/ef/Movement_VF.png)](/File:Movement_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:Movement_VF.png "Enlarge")

  

Local Vector Field Module Parameters
------------------------------------

The **Local Vector Field** cascade module has 2 main parameters:

[![ModuleProperties VF.png](https://d26ilriwvtzlb.cloudfront.net/d/d9/ModuleProperties_VF.png)](/File:ModuleProperties_VF.png)

[![](/skins/common/images/magnify-clip.png)](/File:ModuleProperties_VF.png "Enlarge")

  

**Intensity**: This is the strength of the Local vector field contribution to the particle's motion **Tightness**: How closely the particles will follow the velocities stored in the fluid grid. When set to 0, the vector field behaves as a force which adds it velocities to the particles' current velocities. When set to 1, the vector field velocities replace the particle velocities altogether.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_Vector\_Fields\_(Tutorial)&oldid=9214](https://wiki.unrealengine.com/index.php?title=Creating_Vector_Fields_(Tutorial)&oldid=9214)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)