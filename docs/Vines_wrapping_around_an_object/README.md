Vines wrapping around an object - Epic Wiki                    

Vines wrapping around an object
===============================

**Rate this Page:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.8

Contents
--------

*   [1 Overview](#Overview)
*   [2 Creating vines around the object in 3ds Max](#Creating_vines_around_the_object_in_3ds_Max)
*   [3 Creating a vines material effect](#Creating_a_vines_material_effect)
*   [4 Animating in a blueprint](#Animating_in_a_blueprint)
*   [5 Additional tricks](#Additional_tricks)

Overview
--------

In this tutorial, I show how to quickly create an animation of vines wrapping around an object animation without the use of morphs/vertex animation. The tutorial is split into two parts: first we prepare the meshes and UVs in 3ds Max (or any other program), followed by the magic done in Unreal Engine 4. We do a lot of "cheating" to produce animation, namely we will use masks, panned textures and pixel displacement to accomplish the effect. In the end, we wrap the effect with an appropriate blueprint. Here is in-game result

[![](https://d3ar1piqh1oeli.cloudfront.net/c/cd/VineInGameShowcase.png/940px-VineInGameShowcase.png)](/File:VineInGameShowcase.png)

[![](/skins/common/images/magnify-clip.png)](/File:VineInGameShowcase.png "Enlarge")

In game showcase of vine growing

Creating vines around the object in 3ds Max
-------------------------------------------

Import the object that we want to wrap with vines for visual reference. In our case, this is a character in "stuck in vines" pose. You can later animate this pose a bit to add variety on character. You can use something simple as well, like a wall if you want to simulate vines that grow up the wall effect.

[![](https://d3ar1piqh1oeli.cloudfront.net/9/9e/Vine3dsmax.png/940px-Vine3dsmax.png)](/File:Vine3dsmax.png)

[![](/skins/common/images/magnify-clip.png)](/File:Vine3dsmax.png "Enlarge")

3ds Max setup for vines

We now create vines wrapping the object:

*   create a few splines that wrap the object nicely. Use bezier points (right click on vertex, convert to bezier) for smoother results.
*   for each vine, create a cylinder and add modifier Wrap To Path (use move to spline). Adjust the cylinder's height, segments and radius. 10 segments around the cylinder usually suffices, and as many height segments as needed for the result to use smooth enough. Iterate back to curves if needed. You can hide the cylinders to adjust paths and unhide them when you are done. Make a separate copy at this stage because you may need it for further tweaking. The process after that is destructive.
*   when everything looks nice, set the radius of each cylinder to really small value. I use 0.001 (1 mm). This makes them very thin indeed. In UE4, we will use displacement along normal to make them thick again where needed but we need to export them like this.
*   convert all cylinders to Poly meshes and attach them together (Add Object when in Poly Mesh). Rename combined object appropriately.
*   add Unwrap UVW modifier, select all faces and rescale the maps to object size in unwrap editor. This will make the texture distribution uniform along all elements. Place unwraps of each element (previously each cylinder) to appropriate location according to the time they appear in the animation: placing them higher in Y makes the appear later (and smaller). I usually put smaller vine parts at the top. Make sure the unwraps are also correctly oriented (the top part of unwrap should correspond to the end of the vine). The end result should be tightly overlapped unwraps.
*   export Vine object to FBX

Creating a vines material effect
--------------------------------

Import the vines mesh to UE4 and create an empty material M\_Vines. The complete material is given in the picture. Here are tricks I use:

[![](https://d3ar1piqh1oeli.cloudfront.net/1/14/VineMaterial1.png/940px-VineMaterial1.png)](/File:VineMaterial1.png)

[![](/skins/common/images/magnify-clip.png)](/File:VineMaterial1.png "Enlarge")

Vines material 1

[![](https://d3ar1piqh1oeli.cloudfront.net/3/3f/VineMaterial2.png/940px-VineMaterial2.png)](/File:VineMaterial2.png)

[![](/skins/common/images/magnify-clip.png)](/File:VineMaterial2.png "Enlarge")

Vines material 2

[![](https://d3ar1piqh1oeli.cloudfront.net/f/f2/VineMaterial3.png/940px-VineMaterial3.png)](/File:VineMaterial3.png)

[![](/skins/common/images/magnify-clip.png)](/File:VineMaterial3.png "Enlarge")

Vines material 3

[![](https://d3ar1piqh1oeli.cloudfront.net/7/70/VineMaterial4.png/940px-VineMaterial4.png)](/File:VineMaterial4.png)

[![](/skins/common/images/magnify-clip.png)](/File:VineMaterial4.png "Enlarge")

Vines material 4

*   Use material setup: masked, enable adaptive displacement, use triangles and without holes.
*   I use seamlessly tiled texture for the the diffuse and normal map. I scale the texture coordinates in Y direction (I use value around 10, change it until it looks good) because the unwrap is very uniform.
*   The scalar parameter Growth is used to specify how big the vine is. I subtract the texture coordinate Y (green) from Growth and clamp it to range (0,1; this creates a mask for the animation effect. Where the mask is 0, the object should not be shown, so I put this pin to Opacity Mask material input and set clipping value in material properties to a small value, like 0.05.
*   The Growth mask is also used to displace the vertices outward; I use power before applying displacement to get a non-linear displacement along the vine. Simply use normal multiplied by the mask and the maximum displacement at that position to achieve that effect. Additionally, the maximum displacement at the current position is calculated by lerping two values by noise: this creates some definition on the vine.
*   We want the vines to appear to be moving up, therefore we use the same Growth to displace the diffuse and normal textures in Y direction.

I recommend creating a material instance and specifying custom preview mesh (the vines). There, you can play with parameters to see the effect and the animation.

[![](https://d3ar1piqh1oeli.cloudfront.net/0/04/VineMaterialInstance.png/940px-VineMaterialInstance.png)](/File:VineMaterialInstance.png)

[![](/skins/common/images/magnify-clip.png)](/File:VineMaterialInstance.png "Enlarge")

Playing around with material instance

Animating in a blueprint
------------------------

Simply place the vines mesh and apply the material. On BeginPlay, create dynamic material instance, and start a timeline. I have a curve named Growth that grows linearly in 1 second from 0 to 1, and I apply this value to dynamic material's parameter Growth on each update. The advantage of using timelines is that you can pause or reverse it at any time (on destroy event, for example when only half of the growth animation is done).

  

Additional tricks
-----------------

Additional tricks you could use:

*   Use color channel or another texture to paint maximum displacement (instead of noise map)
*   You can add animation to vines. I have done so by adding "random" movement based on second UV coordinate and time: combination of sine multiplies with different periods looks chaotic enough.
*   You can animate the size at each position: scaling the noise texture that controls the displacement along normals over time works nicely.

Enjoy!

Ziga

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Vines\_wrapping\_around\_an\_object&oldid=14872](https://wiki.unrealengine.com/index.php?title=Vines_wrapping_around_an_object&oldid=14872)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)