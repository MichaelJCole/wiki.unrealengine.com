Video Scanline Post Process Effects (Tutorial) - Epic Wiki                    

Video Scanline Post Process Effects (Tutorial)
==============================================

  

Contents
--------

*   [1 Creating a Material for Post Process Effects](#Creating_a_Material_for_Post_Process_Effects)
*   [2 Material Setup](#Material_Setup)
*   [3 Assembly Overview](#Assembly_Overview)
*   [4 Assigning to a Post Process Volume](#Assigning_to_a_Post_Process_Volume)

Creating a Material for Post Process Effects
--------------------------------------------

Below are some basic instructions on how to set up a simple Post Process Material:

1\. Create a new Level by choosing **File > New Level** from the main menubar.

2\. Create a new Material by clicking the **New Asset** button in the Content Browser and choosing **Material**. Provide a name for the Material.

[![CreateNewMaterial SLT.png](https://d26ilriwvtzlb.cloudfront.net/1/19/CreateNewMaterial_SLT.png)](/File:CreateNewMaterial_SLT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CreateNewMaterial_SLT.png "Enlarge")

  
Below are some basic instructions on how to set up a simple Post Process Material:

3\. Double-click this new Material to open it up in the Material Editor.

4\. In the Material Properties panel, look under the Material category and set the Material Domain property to _Post Process_. This will require you to also set the Lighting Model property to _Unlit_.

[![PostMaterialProperties.png](https://d26ilriwvtzlb.cloudfront.net/1/16/PostMaterialProperties.png)](/File:PostMaterialProperties.png)

[![](/skins/common/images/magnify-clip.png)](/File:PostMaterialProperties.png "Enlarge")

  
5\. In the **Post Process Material** category, be sure to set the **Blendable Location** property to _Before Tonemapping_. This makes for more of a performance hit, but prevents ghosting of the scanlines while the view is in motion.

[![PostProcessMaterialsCategory.png](https://d26ilriwvtzlb.cloudfront.net/d/d1/PostProcessMaterialsCategory.png)](/File:PostProcessMaterialsCategory.png)

[![](/skins/common/images/magnify-clip.png)](/File:PostProcessMaterialsCategory.png "Enlarge")

  
6\. At this point, you would create some Material expression network that defined the look of your post process. As a test for this example, we will create a video scanline overlay effect. You can really make just about anything you like, however.

[![VideoScanlineEffectNetwork.png](https://d3ar1piqh1oeli.cloudfront.net/8/84/VideoScanlineEffectNetwork.png/940px-VideoScanlineEffectNetwork.png)](/File:VideoScanlineEffectNetwork.png)

[![](/skins/common/images/magnify-clip.png)](/File:VideoScanlineEffectNetwork.png "Enlarge")

  

Material Setup
--------------

This document is an overview and breakdown of simple video scanline Post Process Material.

[![VideoScanlineEffect.png](https://d3ar1piqh1oeli.cloudfront.net/1/18/VideoScanlineEffect.png/940px-VideoScanlineEffect.png)](/File:VideoScanlineEffect.png)

[![](/skins/common/images/magnify-clip.png)](/File:VideoScanlineEffect.png "Enlarge")

  
First, here are the textures used in the effect. You can right-click and save each one if you like or create variations of you're own. They're all pretty simple.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/c/cf/ScanDistort.png/1px-ScanDistort.png)](/File:ScanDistort.png)
    
    Scan Distort
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/6/67/Noise.png/120px-Noise.png)](/File:Noise.png)
    
    Noise
    
*   [![](https://d26ilriwvtzlb.cloudfront.net/3/37/Scanlines.png)](/File:Scanlines.png)
    
    Scanlines
    

It should be noted that the images seen here in this document are slightly misleading in that they've been scaled for visual clarity. When you download them **(right-click > Save As)** they will come through at their original sizes, which are noted in the table.

Assembly Overview
-----------------

To facilitate putting this Material together, we've broken the key elements into separate numbered Comment boxes. You can go through each one and simply recreate each node network and connect them together and shown in the network image. Please be aware that the image of the network is rather large; it would be best to save it separately and view it on your computer.

[![VideoScanlineEffectNetwork.png](https://d3ar1piqh1oeli.cloudfront.net/8/84/VideoScanlineEffectNetwork.png/940px-VideoScanlineEffectNetwork.png)](/File:VideoScanlineEffectNetwork.png)

[![](/skins/common/images/magnify-clip.png)](/File:VideoScanlineEffectNetwork.png "Enlarge")

  
**The numbered steps below overview what's going on in the numbered Comment Boxes in the image. By using the two in tandem, you should be able to recreate this effect if you desire.**

  

1.We start with the Scene Texture expression, which is set to bring in the Scene Color. This is how we will manipulate the scene via post process.

2.We perturb the UVs of the Scene Color using a simple panning texture (ScanDistort.png). This is done by multiplying the result of the texture by 0.03 and then combining it only with the red channel of  :the texture coordinates, effectively sliding the pixels across the screen. This creates a distortion effect.

3.We bring in our 4x4 pixel scanline texture and tile it very heavily in the vertical direction (v:128). We also pan it downward very slowly.

4.We reuse the same scanline texture, this time tiling it only by 1.28 and panning it upward, but a little more quickly. We also clamp it between 0.1 and 0.5. This will be used to create some variation  :in the scanlines.

5.Create a time-driven sine wave that runs between 0.6 and 1.0, at a frequency of 10 Hz. This will be used to flicker the scanlines.

6.Take the noise texture and tile and pan it at 2 different amounts and speeds for variation.

7.Make an average of the two noises, then multiply it by the ScanDistort texture. Multiply that by 40 and add it into the result to create white static.

8.We take the panning ScanDistort texture, raise it to a power of 4 (this boosts contrast), multiply it by 40 to make it very bright, but then subtract that from the final result to push it to full black. :This creates the black bar effect often seen when tracking an old-school VCR.

Assigning to a Post Process Volume
----------------------------------

1\. We now need to associate the Material with a post process volume. In our case, we'll use the Global Post Process. In the Scene Outliner, click _Global PostProcess_.

[![SceneOutlinerGlobalPost.png](https://d26ilriwvtzlb.cloudfront.net/8/86/SceneOutlinerGlobalPost.png)](/File:SceneOutlinerGlobalPost.png)

[![](/skins/common/images/magnify-clip.png)](/File:SceneOutlinerGlobalPost.png "Enlarge")

  

2.In the Details panel, locate the **Blendables** property, found under the **Misc** category. Click the **Plus** button next to the property to add a new element.

[![BlendablesProperty.png](https://d26ilriwvtzlb.cloudfront.net/3/35/BlendablesProperty.png)](/File:BlendablesProperty.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlendablesProperty.png "Enlarge")

  

3.Select your new Material in the Content Browser and click the Arrow button to apply the Material into the element. Your effect is now applied.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/d/d0/BeforePost.png/120px-BeforePost.png)](/File:BeforePost.png)
    
    Before Post Process Effect
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/3/3f/AfterPost.png/120px-AfterPost.png)](/File:AfterPost.png)
    
    After Post Process Effect
    

  

Now you can add in some of the property-based post process settings that are a part of the Post Process Volume. In this case, we did the following:

•Pull **Saturation** to very near zero.

•Use **Tint** to put a pale green cast over the result.

•Boost '_Contrast_ to about 0.65.

•Tweak **Crush Shadows** and **Crush Highlights** to increase contrast even further.

•Set **Vignette Intensity** to about 0.9 for a really strong vignette.

•Kick **Bloom** intensity up to about 3.0.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Video\_Scanline\_Post\_Process\_Effects\_(Tutorial)&oldid=6494](https://wiki.unrealengine.com/index.php?title=Video_Scanline_Post_Process_Effects_(Tutorial)&oldid=6494)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)