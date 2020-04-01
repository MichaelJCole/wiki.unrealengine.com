 World Machine to UE4 using World Composition - Epic Wiki             

 

World Machine to UE4 using World Composition
============================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Terrain Creation in WM](#Terrain_Creation_in_WM)
    *   [2.1 Generators](#Generators)
    *   [2.2 Natural Processes](#Natural_Processes)
*   [3 Terrain Export in WM](#Terrain_Export_in_WM)
    *   [3.1 Tiled Build Setup](#Tiled_Build_Setup)
    *   [3.2 General Setup](#General_Setup)
    *   [3.3 Height Output Setup](#Height_Output_Setup)
    *   [3.4 Weightmaps Setup](#Weightmaps_Setup)
    *   [3.5 Build](#Build)
*   [4 Terrain Material Setup in UE4](#Terrain_Material_Setup_in_UE4)
*   [5 World Composition in UE4](#World_Composition_in_UE4)
    *   [5.1 Persistent Level Setup](#Persistent_Level_Setup)
    *   [5.2 Tiled Landscape Import](#Tiled_Landscape_Import)
*   [6 Terrain in UE4](#Terrain_in_UE4)

Overview
--------

_Author:_ [Lyons Den](/index.php?title=User:Lyons_Den&action=edit&redlink=1 "User:Lyons Den (page does not exist)") ([talk](/index.php?title=User_talk:Lyons_Den&action=edit&redlink=1 "User talk:Lyons Den (page does not exist)"))

     Creating worlds can be a long and detailed process. The time it takes to create worlds can be lessened with the proper steps. The process covered below creates tiled terrains in World Machine, exports them in the correct format with weightmaps, and imports them into UE4 using the world composition tool. Feel free to edit any information that is inacurate or add new information that may be relevant.

Terrain Creation in WM
----------------------

     Terrains can be created in many different programs and can even be created in UE4 itself. For this tutorial we will be using World Machine to create every part of the terrain. Below is the process of creating a quick terrain with an 8km by 8km size when imported into UE4.

### Generators

     In world Machine there are multiple ways to create terrains. One way is a procedural way using perlin or any other kind of noise generators. Another way is to import a heightmap created in another program as a basis. For the purposes of this tutorial we will be using the noise generators. Follow the steps below to create a terrain using a generator.

1.  Clear the world area to start fresh.
2.  Drag an advanced perlin noise device into the world.
3.  Double click on the device and change the parameters around to get the terrain you want.

### Natural Processes

     One of the major features of World Machine is the natural processors. These include erosion, thermal weathering and more. These give your terrains that real world look. Follow the steps below to add erosion to the terrain.

1.  Drag an erosion device into the world.
2.  Connect the ouput of the advanced perlin noise device to the erosion input.
3.  Double click on the erosion device and edit the settings to get the look you want.

Terrain Export in WM
--------------------

    To export the terrain from World Machine follow below. The export process is ran once exporting multiple files used for weightmaps for textures as well as the main heightmaps.

### Tiled Build Setup

    Under "World Extents and Resolution" you will see a "Tiled Build Options" tab (This option is only available in World Machine Professional). Set the following options.

1.  Tile Resolution - Custom 2017 x 2017
2.  Tiles per Side - 4 x 4
3.  Blending Percentage - 100%
4.  Share edge vertices - tick
5.  Flip Y-axis orientation - tick

[![Tile Build Options.png](https://d3ar1piqh1oeli.cloudfront.net/8/84/Tile_Build_Options.png/400px-Tile_Build_Options.png)](/index.php?title=File:Tile_Build_Options.png)

### General Setup

Under the "General Setup" tab make note of the maximum elevation used. You can change this to your needs but remember that number, it will be used when importing into UE4.

[![World Machine General Settings.png](https://d3ar1piqh1oeli.cloudfront.net/4/44/World_Machine_General_Settings.png/400px-World_Machine_General_Settings.png)](/index.php?title=File:World_Machine_General_Settings.png)

### Height Output Setup

     Ensure the final height output is attached to a Height Output node. Ensure the settings follow the settings below:

1.  Filename - Filepath/Planet\_Name
2.  Participate in tiled builds - tick
3.  High Precision - RAW16

[![Height Output Settings.png](https://d26ilriwvtzlb.cloudfront.net/c/c1/Height_Output_Settings.png)](/index.php?title=File:Height_Output_Settings.png)

### Weightmaps Setup

     Setup whatever weightmap selections you wish to use. Follow the steps below to setup weightmaps based off terrain angle.

1.  Create 3 Select Slope Nodes
2.  Attach the Primary Output node to each select slope input node.
3.  Set the angle selections for each select angle nodes.
4.  Attach the outputs from the select angle nodes to a height output node.
5.  Set a distinct name for each output and make sure it is tileable. Below are some screen shots for each step.

[![World Machine Node Setup.png](https://d3ar1piqh1oeli.cloudfront.net/3/3c/World_Machine_Node_Setup.png/400px-World_Machine_Node_Setup.png)](/index.php?title=File:World_Machine_Node_Setup.png) [![Select Angle Node.png](https://d26ilriwvtzlb.cloudfront.net/e/e7/Select_Angle_Node.png)](/index.php?title=File:Select_Angle_Node.png) [![Weightmap Output Settings.png](https://d26ilriwvtzlb.cloudfront.net/0/09/Weightmap_Output_Settings.png)](/index.php?title=File:Weightmap_Output_Settings.png)

### Build

    Now just click the tiled build option and let it run.

Terrain Material Setup in UE4
-----------------------------

     The material for the terrain should be setup first. Follow the steps below to setup a terrain ready to accept the weightmaps exported earlier.

1.  Create a new material in UE4.
2.  Create a Landscape Layer Weight node for each weightmap you exported from World Machine. In the example in the previous section we exported 3 weightmaps based of High, Mid, and low angles.
3.  Name the Layer Weights something you will remember and can associate with the weightmaps exported from World Machine.
4.  Connect the output of the layer you want on the bottom to the "Base" input of the layer you want in the middle.
5.  Connect the output of the layer you want in the middle to the "Base" input of the layer you want on top.
6.  Connect the output of the layer you want on top to the "Base Color" input on the material node.
7.  Drag the textures you want to use for each layer into the material editor.
8.  Connect the outputs of the textures to the associated "Layer" input on the landscape layer weight nodes.
9.  Add a Landscape Layer Coords and attach the output to the "UVs" input of each texture node.
10.  In the Landscape Layer Coords set the tiling to whatever you want. Start with 25 and go from there.
11.  If you wish to use Normal Maps for the textures duplicate the process above. Instead of connecting the output of the last layer weight node to the "Base Color" input, connect it to the "Normal" input on the material node.
12.  Below is an example node structure.

[![Landscape Material.png](https://d3ar1piqh1oeli.cloudfront.net/9/91/Landscape_Material.png/400px-Landscape_Material.png)](/index.php?title=File:Landscape_Material.png)

World Composition in UE4
------------------------

     World composition allows smaller chunks of the planet be loaded at runtime when the player is close enough to that chunk. Below are the steps to get the terrain into the world.

### Persistent Level Setup

    To setup the persistent level follow the steps below:

1.  Create a new level with a sky-box pre-built or not.
2.  Save the file with the Planet or location name.
3.  Open the world settings and check the box labeled "Enable World Composition"

[![UE4 World Settings.png](https://d26ilriwvtzlb.cloudfront.net/f/fd/UE4_World_Settings.png)](/index.php?title=File:UE4_World_Settings.png)

### Tiled Landscape Import

    To import a tiled landscape follow the steps below

1.  Open the levels window.
2.  Click the Levels drop down menu in the upper-left of the levels window.
3.  Select "Import Tiled Landscape..."
4.  Click the "Select heightmap Tiles..." button.
5.  Navigate to the folder where you saved the raw heightmap images from World Machine
6.  Select all the tiled files. (e.g. Planet\_Name\_x0\_y0)
7.  Change the Z scale. Times the world height used from World Machine by 0.1953125 and enter that number in Z scale.
8.  Select the Material created earlier. Once selected it should give you the weightmaps option.
9.  Now click the "Select Weightmap Tiles..." button.
10.  Navigate to the folder where you saved the raw weightmap images from World Machine
11.  Select all the tiled files for each weightmap. (e.g. Planet\_Name\_HighAngle-x0\_y0)
12.  Then click "Import"
13.  Select all the Planet\_Name\_x#\_y# levels in the Levels window
14.  Right click and select load to see if the imported properly.
15.  Below are some images of the process.

[![UE4 Levels Window.png](https://d26ilriwvtzlb.cloudfront.net/3/38/UE4_Levels_Window.png)](/index.php?title=File:UE4_Levels_Window.png) [![UE4 Tiled Landscape Import.png](https://d26ilriwvtzlb.cloudfront.net/c/c4/UE4_Tiled_Landscape_Import.png)](/index.php?title=File:UE4_Tiled_Landscape_Import.png) [![UE4 Tiled Landscape Import Final.png](https://d26ilriwvtzlb.cloudfront.net/e/e5/UE4_Tiled_Landscape_Import_Final.png)](/index.php?title=File:UE4_Tiled_Landscape_Import_Final.png) [![UE4 Levels Window Level Load.png](https://d26ilriwvtzlb.cloudfront.net/c/ce/UE4_Levels_Window_Level_Load.png)](/index.php?title=File:UE4_Levels_Window_Level_Load.png)

Terrain in UE4
--------------

    Below are the images of the terrain fully loaded into UE4 using the process above.

[![UE4 Terrain in Engine 2.jpg](https://d3ar1piqh1oeli.cloudfront.net/2/2e/UE4_Terrain_in_Engine_2.jpg/400px-UE4_Terrain_in_Engine_2.jpg)](/index.php?title=File:UE4_Terrain_in_Engine_2.jpg) [![UE4 Terrain in Engine.jpg](https://d3ar1piqh1oeli.cloudfront.net/4/47/UE4_Terrain_in_Engine.jpg/400px-UE4_Terrain_in_Engine.jpg)](/index.php?title=File:UE4_Terrain_in_Engine.jpg)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=World\_Machine\_to\_UE4\_using\_World\_Composition&oldid=91](https://wiki.unrealengine.com/index.php?title=World_Machine_to_UE4_using_World_Composition&oldid=91)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Landscape](/index.php?title=Category:Landscape "Category:Landscape")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")