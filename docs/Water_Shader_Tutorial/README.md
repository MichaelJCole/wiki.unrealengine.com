Water Shader Tutorial - Epic Wiki                   

Water Shader Tutorial
=====================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Material Properties](#Material_Properties)
        *   [1.1.1 Base Color](#Base_Color)
        *   [1.1.2 Opacity](#Opacity)
        *   [1.1.3 Normals](#Normals)
        *   [1.1.4 Wave Surge Height and Frequency](#Wave_Surge_Height_and_Frequency)
        *   [1.1.5 Refraction](#Refraction)
        *   [1.1.6 Constants](#Constants)
        *   [1.1.7 Material Instance Example](#Material_Instance_Example)

Overview
--------

This tutorial will give you an overview and example on how to create a translucent water shader and has been updated to be compatible for engine version 4.13.1

Before you get started you can download the test project using the water shader in case you would like to quickly add it to your project or would like to reverse engineer the material.

[Water Shader Example Project](https://drive.google.com/file/d/0BwoNkgItH8CWNGVRczBJZmRCblk/view?usp=sharing)

### Material Properties

Below are the settings used for defining the materials properties to render correctly with the instructions provided.

[![](https://d26ilriwvtzlb.cloudfront.net/6/6e/Material_Properties.png)](/File:Material_Properties.png)

Material Details

  

#### Base Color

What we are doing here is defining a dark water color and a light water color by using two Vector3 nodes. Then creating a falloff between the dark and light color using a fresnel which can be controlled by the exponent parameter. To increase the contribution of the color you can use the 'Diffuse Multiply' parameter.

[![](https://d3ar1piqh1oeli.cloudfront.net/5/5f/BaseColor_Graph.png/801px-BaseColor_Graph.png)](/File:BaseColor_Graph.png)

Base Color

  

#### Opacity

For Opacity we are using a single Depth Fade node to drive the overall Opacity and the distance at which it fades based on scenes depth. You can use this to create a shallow water fade effect.

[![](https://d26ilriwvtzlb.cloudfront.net/b/b8/Opacity_Graph.png)](/File:Opacity_Graph.png)

Opacity and Refraction

  

#### Normals

The normals are important as this is what defines the waves size and speed. For the small wave panner the Speed X is set to 0.03 and the Speed Y is set to -0.02. For the large wave panner the Speed X is set to -0.1 and the Speed Y is set to 0.1. These values are chosen so the normals pan against each other creating a ripple like effect.

[![](https://d3ar1piqh1oeli.cloudfront.net/e/e4/Normals_Graph.png/799px-Normals_Graph.png)](/File:Normals_Graph.png)

Normals: Click to Enlarge Photo

  

#### Wave Surge Height and Frequency

This section is optional functionality as it drives the waves up and down using World Position Offset. This effect can be used to add a more dynamic feel to your water so it rises and falls like wave washing against the shore.

[![](https://d3ar1piqh1oeli.cloudfront.net/e/ed/WPO_Graph.png/802px-WPO_Graph.png)](/File:WPO_Graph.png)

Wave Amplitude and Frequency

  

#### Refraction

Here we are defining refraction using the Index of Refraction technique by combining a physically based value and lerping between a constant.

[![Refraction Graph.png](https://d26ilriwvtzlb.cloudfront.net/0/01/Refraction_Graph.png)](/File:Refraction_Graph.png)

#### Constants

Below are the remaining connections needed to complete the material. They are simple constants that need to be converted to parameters for editing your material instance.

[![](https://d26ilriwvtzlb.cloudfront.net/6/61/SingleConstants_Graph.png)](/File:SingleConstants_Graph.png)

Single Constants

  

  

#### Material Instance Example

Below is an example taken from the project provided in the link at the beginning of the tutorial. The master material has been instanced and applied to a plane, and then suited to fit the scene using scalar parameters.

[![WaterExample.png](https://d3ar1piqh1oeli.cloudfront.net/9/9c/WaterExample.png/771px-WaterExample.png)](/File:WaterExample.png)

  

If you enjoyed this tutorial head to my Wiki Profile Page for more!

[Andrew Hurley Wiki Profile Page](/User:AndrewHurley "User:AndrewHurley")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Water\_Shader\_Tutorial&oldid=23632](https://wiki.unrealengine.com/index.php?title=Water_Shader_Tutorial&oldid=23632)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Material](/Category:Material "Category:Material")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)