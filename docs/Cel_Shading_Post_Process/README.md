Cel Shading Post Process - Epic Wiki                    

Cel Shading Post Process
========================

**Rate this Page:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.10

[![](https://d3ar1piqh1oeli.cloudfront.net/a/ab/CellShade.png/900px-CellShade.png)](/File:CellShade.png)

[![](/skins/common/images/magnify-clip.png)](/File:CellShade.png "Enlarge")

Final Output

Cel shading is an effect where light is broken down into a band or series of bands to create a stylised lighting model. What makes cel shading tricky in UE4 is the limited access to the light vector or light only information. This tutorial will take you through the process of creating a cel shade effect in UE4!

Contents
--------

*   [1 Advantages](#Advantages)
*   [2 Disadvantages](#Disadvantages)
*   [3 Prerequisites](#Prerequisites)
    *   [3.1 Materials](#Materials)
    *   [3.2 Post process volume](#Post_process_volume)
*   [4 Tutorial](#Tutorial)
*   [5 Author](#Author)
    *   [5.1 Arran Langmead](#Arran_Langmead)

Advantages
----------

*   Casts shadows
*   Receives shadows
*   Uses standard UE4 lights
*   Supports normal maps

[![](https://d26ilriwvtzlb.cloudfront.net/5/53/DirectLight.gif)](/File:DirectLight.gif)

Directional Lighting

[![](https://d26ilriwvtzlb.cloudfront.net/4/4a/PointLight.gif)](/File:PointLight.gif)

Point Lighting

[![](https://d26ilriwvtzlb.cloudfront.net/1/1b/PointLightDup.gif)](/File:PointLightDup.gif)

Duplicate lighting

Disadvantages
-------------

*   Cel shades the entire scene
*   Diffuse and normal only
*   Inefficient
*   Reflections/bloom/Emmisive will break the Post Process

Prerequisites
-------------

Any reflections will interfere with the post process. An understanding of UV distortion and Post process materials is recommended.

### Materials

Any materials that go into this scene must have

*   a roughness value of 1
*   a Metal value of 0
*   a Emmisive value of 0.

### Post process volume

*   set it to Unbound
*   Under Bloom set intensity to 0
*   Under Auto Exposure, set min and max brightness to 2

Tutorial
--------

Create a new material and open it. In the details tab, change the Material Domain to Post Process and under the Post Process Material tab change Blendable Location to Before Translucency.

[![](https://d26ilriwvtzlb.cloudfront.net/f/fd/PPM_Settings.png)](/File:PPM_Settings.png)

[![](/skins/common/images/magnify-clip.png)](/File:PPM_Settings.png "Enlarge")

Final Output

Add your newly created material to the post process under Blendables. Unreal Engine 4's post process Material doesn't have an accessible lighting channel so we need to hack one together!

Right click in the material editor and add two scene texture nodes. Set the first to PostProcessInput0 and the other to Diffuse Colour.

[![](https://d26ilriwvtzlb.cloudfront.net/b/ba/PPM_BP1.png)](/File:PPM_BP1.png)

[![](/skins/common/images/magnify-clip.png)](/File:PPM_BP1.png "Enlarge")

Extract Lighting Map

[![](https://d26ilriwvtzlb.cloudfront.net/4/43/PPMSettings2.png)](/File:PPMSettings2.png)

[![](/skins/common/images/magnify-clip.png)](/File:PPMSettings2.png "Enlarge")

Change Scene Texture

Divide PostProcessInput0 by the DiffuseColour to extract the lighting from the scene. Lighting must be grey-scale for this to be accurate so keep light colour white for best results. Finally mask the output by R.

[![](https://d26ilriwvtzlb.cloudfront.net/0/03/LightingOnly.png)](/File:LightingOnly.png)

[![](/skins/common/images/magnify-clip.png)](/File:LightingOnly.png "Enlarge")

Change Scene Texture

To band the lighting we will run the output through a textures UV's. The gradient of the lighting will act as a mapping coordinate for the texture, where black is the top pixel and white is the bottom pixel.

In photoshop create a texture that is 1(px) x 128(px). Paint the number of bands you want and in the colour you want it.

[![](https://d26ilriwvtzlb.cloudfront.net/6/62/CLUTSetup.png)](/File:CLUTSetup.png)

[![](/skins/common/images/magnify-clip.png)](/File:CLUTSetup.png "Enlarge")

Change Scene Texture

Bellow are a few examples with the texture strip used on the left. This technique can be used to create a wide range of effects.

[![](https://d3ar1piqh1oeli.cloudfront.net/1/15/BandingDefault.png/250px-BandingDefault.png)](/File:BandingDefault.png)

[![](/skins/common/images/magnify-clip.png)](/File:BandingDefault.png "Enlarge")

PP with inverted CLUT

[![](https://d3ar1piqh1oeli.cloudfront.net/6/67/BandingInvert.png/250px-BandingInvert.png)](/File:BandingInvert.png)

[![](/skins/common/images/magnify-clip.png)](/File:BandingInvert.png "Enlarge")

PP with inverted CLUT

[![](https://d3ar1piqh1oeli.cloudfront.net/f/f5/Colourised.png/250px-Colourised.png)](/File:Colourised.png)

[![](/skins/common/images/magnify-clip.png)](/File:Colourised.png "Enlarge")

PP with coloured CLUT

Import the texture into Unreal and open the settings panel for it. Under texture, untick SRGB, change the tiling method to Clamp and change the filter method to Nearest.

[![](https://d26ilriwvtzlb.cloudfront.net/e/ed/TextureImportSetup.png)](/File:TextureImportSetup.png)

[![](/skins/common/images/magnify-clip.png)](/File:TextureImportSetup.png "Enlarge")

Adjust texture settings

Bring the texture into your post process material and input your Mask (R) into its UV's.

[![](https://d3ar1piqh1oeli.cloudfront.net/9/96/BandedLighting.png/900px-BandedLighting.png)](/File:BandedLighting.png)

[![](/skins/common/images/magnify-clip.png)](/File:BandedLighting.png "Enlarge")

PP with banded lighting

Now we have the lighting banding in, all that's left is to reintroduce the diffuse. Mask out the Alpha of the diffuse colour and multiply the banded lighting by the diffuse.

[![](https://d3ar1piqh1oeli.cloudfront.net/9/99/FinalPost.png/900px-FinalPost.png)](/File:FinalPost.png)

[![](/skins/common/images/magnify-clip.png)](/File:FinalPost.png "Enlarge")

PP setup plugged into emmisive

That's all there is to it, I hope you found this quick guide to cel shading in Unreal Engine 4 useful and look forward to seeing what you do with it.

Author
------

### Arran Langmead

[AzzaMat User Page](/index.php?title=User:AzzaMat&action=edit&redlink=1 "User:AzzaMat (page does not exist)")

[Website](http://www.strangelynamed.com/#bcd-01)

[Twitter](https://twitter.com/arranlangmead)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Cel\_Shading\_Post\_Process&oldid=22051](https://wiki.unrealengine.com/index.php?title=Cel_Shading_Post_Process&oldid=22051)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Post Process](/index.php?title=Category:Post_Process&action=edit&redlink=1 "Category:Post Process (page does not exist)")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)