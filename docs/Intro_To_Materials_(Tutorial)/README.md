Intro To Materials (Tutorial) - Epic Wiki                    

Intro To Materials (Tutorial)
=============================

Overview
--------

The Material Editor is very powerful tool in the Unreal Editor suite that allows you to create a multitude of effects. Here you will see how to create a few basic material effects.

This tutorial assumes that you understand importing Textures.

Creating a New Material
-----------------------

Once you have your textures in the content browser you can create your material. Right click in the black space in the center of the content browser and select New Material.

[![NewMaterial.png](https://d3ar1piqh1oeli.cloudfront.net/2/27/NewMaterial.png/940px-NewMaterial.png)](/File:NewMaterial.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewMaterial.png "Enlarge")

  

This creates a new Material asset. Double-click on it to open it in the Material Editor.

[![Mat TutStone.png](https://d26ilriwvtzlb.cloudfront.net/3/37/Mat_TutStone.png)](/File:Mat_TutStone.png)

[![](/skins/common/images/magnify-clip.png)](/File:Mat_TutStone.png "Enlarge")

  

Material Editor
---------------

In the material editor you can hold "T" and click in the black space to place a Texture Sample node using the texture currently selected in the content browser. You should add the Diffuse Texture and the Normal Texture and connect them to the Diffuse and Normal inputs. This will give you a basic surface that has bumpy details that react to light.

[![BasicMaterial 1.png](https://d3ar1piqh1oeli.cloudfront.net/2/2c/BasicMaterial_1.png/940px-BasicMaterial_1.png)](/File:BasicMaterial_1.png)

[![](/skins/common/images/magnify-clip.png)](/File:BasicMaterial_1.png "Enlarge")

  

You can also add a basic mask/heightmap texture to get a bump offset/parallax effect. Right click and select Utility, BumpOffset then connect the red channel of your mask texture to the height input of the bump offset then connect it's output to the Base Color and Normal textures' UV inputs.

[![BasicMaterial 2.png](https://d3ar1piqh1oeli.cloudfront.net/e/e1/BasicMaterial_2.png/940px-BasicMaterial_2.png)](/File:BasicMaterial_2.png)

[![](/skins/common/images/magnify-clip.png)](/File:BasicMaterial_2.png "Enlarge")

  

To get a basic specular response on the Material you can hold 1 and click to create a Constant. Select this and set its R value to 0.5, then plug it into both the Roughness and the Specular inputs. This defines a Material that reflects some light and is partially smooth, giving you a reflected specular highlight.

[![BasicMaterial 3.png](https://d3ar1piqh1oeli.cloudfront.net/1/16/BasicMaterial_3.png/940px-BasicMaterial_3.png)](/File:BasicMaterial_3.png)

[![](/skins/common/images/magnify-clip.png)](/File:BasicMaterial_3.png "Enlarge")

  

A good way to add contrast to the mask texture is to create a lerp node by right clicking in the blank area and selecting **Math > LinearInterpolate**. Connect the red channel of the mask texture to the Alpha input of the Lerp node. Create 2 scalar constant nodes by holding the "1" key and clicking twice. Give one of them values of 0.1 and 0.5 and connect them to the Lerp's A and B inputs, respectively. Connect the output of the Lerp node to the Specular input of the Material. Experiment with the values and see what sorts of Specular results you can make!

[![BasicMaterial 4.png](https://d3ar1piqh1oeli.cloudfront.net/d/dd/BasicMaterial_4.png/940px-BasicMaterial_4.png)](/File:BasicMaterial_4.png)

[![](/skins/common/images/magnify-clip.png)](/File:BasicMaterial_4.png "Enlarge")

  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Intro\_To\_Materials\_(Tutorial)&oldid=6405](https://wiki.unrealengine.com/index.php?title=Intro_To_Materials_(Tutorial)&oldid=6405)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Material](/Category:Material "Category:Material")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")
*   [Getting Started](/Category:Getting_Started "Category:Getting Started")

  ![](https://tracking.unrealengine.com/track.png)