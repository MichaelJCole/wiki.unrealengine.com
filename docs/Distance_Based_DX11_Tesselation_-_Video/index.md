 Distance Based DX11 Tesselation - Video - Epic Wiki             

 

Distance Based DX11 Tesselation - Video
=======================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Setup](#Setup)
*   [3 Tutorial](#Tutorial)
*   [4 Material Composition](#Material_Composition)
*   [5 Project Source](#Project_Source)
*   [6 Additional Tutorials](#Additional_Tutorials)
*   [7 Credits](#Credits)

Overview
--------

This tutorial covers how to create a distance based tessellation material being driven by 6 changeable parameters.

Setup
-----

Before you start you should have a basic knowledge of the Material Editor being used within the Unreal Engine 4. Also recommended but not mandatory is an understanding [what Tessellation is](http://www.nvidia.com/object/tessellation.html) especially and what it does and how it's being used. If you're not sure check out other tutorials before going ahead or simply check the [Additional Tutorials](/index.php?title=Distance_Based_DX11_Tesselation_-_Video#Additional_Tutorials "Distance Based DX11 Tesselation - Video") chapter.

Tutorial
--------

Due to the fact that it's a complicated material function I created two video tutorials that offer step by step explanations. Please use any material of your choice ( that has a _Base Color_ texture, a _Normal_ texture and a _Displacement_ texture ) as a base for the video tutorials below. First you'll add a basic and then dynamic tesselation to this material. Check out the [Project Source](/index.php?title=Distance_Based_DX11_Tesselation_-_Video#Project_Source "Distance Based DX11 Tesselation - Video") chapter to download the whole UE4 project if you don't have a proper material and / or textures.  
  
Basic DX11 Tessellation ( 2 / 3 )  
<youtube>[https://www.youtube.com/watch?v=o3L-GlYWmpc](https://www.youtube.com/watch?v=o3L-GlYWmpc)</youtube>  
Distance Based DX11 Tessellation ( 3 / 3 )  
<youtube>[https://www.youtube.com/watch?v=D6zyUI33FqA](https://www.youtube.com/watch?v=D6zyUI33FqA)</youtube>  

Material Composition
--------------------

Even though I'd still suggest watching the tutorial, here is an image of the final material.  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/5/5d/DaveTheFreak-DistanceBasedTesselation.jpeg/800px-DaveTheFreak-DistanceBasedTesselation.jpeg)](/index.php?title=File:DaveTheFreak-DistanceBasedTesselation.jpeg)

Distance Based Tessellation Material

  
To understand what the Param Values mean here is a screen illustrating the situation.  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/c/ca/DaveTheFreak-DistanceBasedTessellationExplanation.jpg/800px-DaveTheFreak-DistanceBasedTessellationExplanation.jpg)](/index.php?title=File:DaveTheFreak-DistanceBasedTessellationExplanation.jpg)

Distance Based Tessellation Explanation

  
Minimal Distance = Distance from OBJECT to A, "Max Height" and "Iterations" with the predefined value  
Maximal Distance ( Fade Distance ) = Distance from A to B, at B "Max Height" and "Iterations" value is 0, transitioning/fading from A to B  
  

Project Source
--------------

You can download the materials of **this and other** tesselation tutorials listed below in an UE4 [project from GitHub](https://github.com/XenoEgger/DynamicTesselation).

Additional Tutorials
--------------------

*   [Advanced Materials (Instancing) Video ( 1 / 3 of **this** tutorial )](https://www.youtube.com/watch?v=NX-NNyGV3oQ)
*   [Basic Tessellation Videos ( english and german )](/index.php?title=Tessellation_-_Video&action=edit&redlink=1 "Tessellation - Video (page does not exist)")
*   [Texture Packed Material Setup Video ( 1 / 2 with basic tesselation )](https://www.youtube.com/watch?v=oMKHfiFD9Js)
*   [Advanced Tessellated Displaced Material Setup Video ( 2 / 2 with advanced tesselation )](https://www.youtube.com/watch?v=_Xmxt1wv1SE)

Credits
-------

_Material created by DaveTheFreak aka David Scholze_

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Distance\_Based\_DX11\_Tesselation\_-\_Video&oldid=515](https://wiki.unrealengine.com/index.php?title=Distance_Based_DX11_Tesselation_-_Video&oldid=515)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Material](/index.php?title=Category:Material "Category:Material")
*   [Community Videos](/index.php?title=Category:Community_Videos "Category:Community Videos")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")