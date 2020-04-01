Using Weightmaps to texture a Landscape - Epic Wiki                    

Using Weightmaps to texture a Landscape
=======================================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:(please verify)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Importing the Heightmap](#Importing_the_Heightmap)
*   [3 Creating a Landscape Material](#Creating_a_Landscape_Material)
*   [4 Importing the heightmaps](#Importing_the_heightmaps)

Overview
--------

So, here is a little tutorial on how to use weightmaps to texture your landscape. It assumes that you have read and understood the documentation about landscapes.

This tutorial requires you to have a heightmap and the associated weightmaps. If don't have a finished terrain, have a look at TerreSculptor or World Machine to create them. While this document is using a non tiled terrain component, it should be noted that given the current version of Terresculptor is Alpha ( I've had no problems with it myself ) that it currently does not support exporting tiled terrains , which UE4 supports.

For this tutorial I am going to use a 16-Bit RAW format for the heightmap and 8-Bit PNG files for the weightmaps.

Importing the Heightmap
-----------------------

First you need to create a new landscape and choose "Import from file":

[![LandscapeWeightmapTut01.jpeg](https://d26ilriwvtzlb.cloudfront.net/6/64/LandscapeWeightmapTut01.jpeg)](/File:LandscapeWeightmapTut01.jpeg)

Select your heightmap file click import.

Creating a Landscape Material
-----------------------------

In the next step we have to create a material for the landscape. We need a seperate layer for each weightmap we have. The image below is showing a simple Landscape texture with three layers (snow, rock, grass).

[![02 .jpg](https://d26ilriwvtzlb.cloudfront.net/f/fd/02_.jpg)](/File:02_.jpg)

Save the material and apply it to the Landscape.

Importing the heightmaps
------------------------

Navigate to the Landscape Options, choose Paint and scroll down until you see the "Target Layers" options:

[![03.jpg](https://d26ilriwvtzlb.cloudfront.net/f/f9/03.jpg)](/File:03.jpg)

Create a new Layer Info by clicking on the little "plus"-sign. Choose "Weight-Blended Layer". After that right-click on the Layer Info and choose "Import from file":

[![LandscapeWeightmapTut04.jpeg](https://d26ilriwvtzlb.cloudfront.net/f/fb/LandscapeWeightmapTut04.jpeg)](/File:LandscapeWeightmapTut04.jpeg)

Choose your heightmap and repeat this step for all your layers.

And that's it. Your layers should now be imported and the terrain should be textured accordingly.

\- Cheers  
[order66](/User:Order66 "User:Order66")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Using\_Weightmaps\_to\_texture\_a\_Landscape&oldid=9354](https://wiki.unrealengine.com/index.php?title=Using_Weightmaps_to_texture_a_Landscape&oldid=9354)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Landscape](/Category:Landscape "Category:Landscape")
*   [Material](/Category:Material "Category:Material")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)