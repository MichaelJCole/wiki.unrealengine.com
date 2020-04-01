Creating Layered Materials (Tutorial) - Epic Wiki                    

Creating Layered Materials (Tutorial)
=====================================

  

Contents
--------

*   [1 Overview](#Overview)
*   [2 Simple Chrome](#Simple_Chrome)
    *   [2.1 Chrome Layer Network](#Chrome_Layer_Network)
*   [3 Simple Snow](#Simple_Snow)
    *   [3.1 Snow Layer Network](#Snow_Layer_Network)
*   [4 Layered Material](#Layered_Material)
    *   [4.1 Layered Material Network](#Layered_Material_Network)
    *   [4.2 Instancing a Layered Material](#Instancing_a_Layered_Material)

Overview
--------

In this brief tutorial we will overview the process of creating a simple Layered Material with two Material Layers: chrome and snow. Our final Layered Material will automatically place snow on the top surfaces of the object, effectively switching between the two materials. The blend between the materials will always check for the top surface, meaning that even as you rotate the objects, the snow will remain on top.

Generally, when creating Material Layers, it is common to create the layers as Materials and copy/paste your node network into a new Function. To save time, however, we're going to build our layers within Functions to begin with.

Simple Chrome
-------------

**Chrome Textures**

*   [![](https://d3ar1piqh1oeli.cloudfront.net/4/4f/T_ExampleLayers_Metal01_BC.png/120px-T_ExampleLayers_Metal01_BC.png)](/File:T_ExampleLayers_Metal01_BC.png)
    
    T\_ExampleLayers\_Metal\_1\_BC.png
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/e/e5/T_ExampleLayers_Metal01_N.png/120px-T_ExampleLayers_Metal01_N.png)](/File:T_ExampleLayers_Metal01_N.png)
    
    T\_ExampleLayers\_Metal01\_N.png
    

For our first Material Layer, we will create a fairly simply chrome with a little bit of corrosion or imperfections in the surface. To help show some editability, we will also create some inputs to control the overall look.

1\. In the Content Browser, click the **New Asset** button and choose **Materials & Textures > Material Function**.

[![MakeMaterialFunction MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/2/2b/MakeMaterialFunction_MatLayTut.png)](/File:MakeMaterialFunction_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:MakeMaterialFunction_MatLayTut.png "Enlarge")

  

2\. Name your new Function **Layer\_Chrome**.

[![Layer Chrome.jpg](https://d26ilriwvtzlb.cloudfront.net/8/82/Layer_Chrome.jpg)](/File:Layer_Chrome.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Layer_Chrome.jpg "Enlarge")

  

3\. Double-click your Function to open it within the Material Editor.

[![EditLayerChrome MatLayTut.png](https://d3ar1piqh1oeli.cloudfront.net/7/74/EditLayerChrome_MatLayTut.png/940px-EditLayerChrome_MatLayTut.png)](/File:EditLayerChrome_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:EditLayerChrome_MatLayTut.png "Enlarge")

  

4\. 4.Right-click and choose **Material Attributes > Make Material Attributes**.

[![MakeMaterialAttributesContext MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/b/b3/MakeMaterialAttributesContext_MatLayTut.png)](/File:MakeMaterialAttributesContext_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:MakeMaterialAttributesContext_MatLayTut.png "Enlarge")

  

5.Connect your new Make Material Attributes node to the Output Result.

[![ConnectedMMA MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/4/44/ConnectedMMA_MatLayTut.png)](/File:ConnectedMMA_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:ConnectedMMA_MatLayTut.png "Enlarge")

  

### Chrome Layer Network

The network for this Material Layer is pretty straightforward. It has been broken down for fast construction. The two textures used are **T\_ExampleLayers\_Metal\_1\_BC.png** for the Base Color and Roughness, and **T\_ExampleLayers\_Metal01\_N.png** for the normal map, both downloadable at the top of this page.

**Click for full size or right-click and Save As**

[![ChromGraph MatLayTut.png](https://d3ar1piqh1oeli.cloudfront.net/4/4e/ChromGraph_MatLayTut.png/940px-ChromGraph_MatLayTut.png)](/File:ChromGraph_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:ChromGraph_MatLayTut.png "Enlarge")

  

The Material Layer is broken down into comment blocks, which are explained below:

1\. **Base Color** - This portion of the network is very simple. We've set up a Linear Interpolate that blends between our base chrome color and a very dark gray. The base color is actually a Function Input named _Tint_. This input is set to a Vector3, allowing us to input color into the function and change the color of the chrome. We use the red channel of the _T\_ExampleLayers\_Metal\_1\_BC_ texture to drive an interpolation between the two.

2\. **Metallic** - Since we're creating a metal, we set Metallic to 1.

3\. **Roughness** - We are creating chrome, so roughness will be generally pretty low. However, in the darker areas we're going to boost roughness a little, just to give some depth to the overall look of the material. In effect, this is the same network as the one we used for Base Color, except that we're simply Lerping between 0.2 and 0.4.

4\. **Customizable Normal** - This network simply takes in a tangent space normal map and separates the green and red channels, which control the bulk of the map's detail. We multiply each channel by a value supplied from another Function Input. This input is set to a Scalar type and named _Normal Multiplier_, with a default of 1.0. The results are appended (AppendVector node) together and then appended to the blue channel of the normal map. The result is that the user has the power to adjust the height of the normal by changing the Normal Multiplier value.

Be sure to save your Material Layer Function when done.

Simple Snow
-----------

*   [![](https://d3ar1piqh1oeli.cloudfront.net/b/bf/T_Cave_Ice_Tiling_D.png/120px-T_Cave_Ice_Tiling_D.png)](/File:T_Cave_Ice_Tiling_D.png)
    
    T Cave Ice Tiling Diffuse
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/5/54/T_Cave_Ice_Noise_N.png/120px-T_Cave_Ice_Noise_N.png)](/File:T_Cave_Ice_Noise_N.png)
    
    T Cave Ice Noise Normal
    

We will now create the Material Layer for our snow effect:

1\. In the Content Browser, click the New Asset button and choose Materials & Textures > Material Function.

[![MakeMaterialFunction MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/2/2b/MakeMaterialFunction_MatLayTut.png)](/File:MakeMaterialFunction_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:MakeMaterialFunction_MatLayTut.png "Enlarge")

  

2.Name your new Function Layer\_Snow.

[![Layer Snow MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/2/24/Layer_Snow_MatLayTut.png)](/File:Layer_Snow_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:Layer_Snow_MatLayTut.png "Enlarge")

  

3\. Double-click your Function to open it within the Material Editor.

[![Layer Snow Expression matlaytut.jpg](https://d26ilriwvtzlb.cloudfront.net/5/59/Layer_Snow_Expression_matlaytut.jpg)](/File:Layer_Snow_Expression_matlaytut.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Layer_Snow_Expression_matlaytut.jpg "Enlarge")

  

4\. Right-click and choose Material Attributes > Make Material Attributes.

[![MakeMaterialAttributesContext MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/b/b3/MakeMaterialAttributesContext_MatLayTut.png)](/File:MakeMaterialAttributesContext_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:MakeMaterialAttributesContext_MatLayTut.png "Enlarge")

  

5\. Connect your new Make Material Attributes node to the Output Result.

[![ConnectedMMA MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/4/44/ConnectedMMA_MatLayTut.png)](/File:ConnectedMMA_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:ConnectedMMA_MatLayTut.png "Enlarge")

  

### Snow Layer Network

Below is a simple breakdown of the snow Material Layer. This Layer uses the **T\_Cave\_Ice\_Tiling\_D.png** and **T\_Cave\_Ice\_Noise\_N.png**, both are downloadable on this page.

[![SnowNetwork MatLayTut.png](https://d3ar1piqh1oeli.cloudfront.net/0/06/SnowNetwork_MatLayTut.png/940px-SnowNetwork_MatLayTut.png)](/File:SnowNetwork_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:SnowNetwork_MatLayTut.png "Enlarge")

  

1\. **Base Color** - This is probably the only relatively sophisticated part of the network, and only because it uses the FuzzyShading Material Function. This function simply keeps the texture from getting too dark when the Material is receiving light. It's a bit like how light passes through fibrous surfaces. This makes it perfect for velvet, moss, or in this case, snow. So we start by taking our Base Color texture (T\_Cave\_Ice\_Tiling\_D.png) and removing some contrast by raising it to the power of 0.3.

Next, we plug the result into a FuzzyShading Material Function, pulled from the Functions tab of the Material Editor. We set _Core Darkness_ to 0, _Power_ to 1, and _EdgeBrightness_ to 0.5. Finally, we multiply the whole thing by a very pale blue color (R=0.8, G=0.9, B=0.95) to give it that cold, icy color cast.

2\. **Metallic** - This is a non-metallic surface, so we set Metallic to 0.

3\. **Roughness** - We want our snow to shine a little bit when the light hits it just right, so we use the red channel of the T\_Cave\_Ice\_Tiling\_D.png texture to drive a Lerp between 0.6 and 0.3.

4\. **Normal** - This is also fairly basic. We want to lower the effect of the tangent space normal map, which is done by doubling the strength of the blue channel. The increase of blue lowers the overall look of the normal map's height.

Save your result when finished!

Layered Material
----------------

We can now create our Layered Material using the layers we've generated so far. We will set this up with a little bit of room for instance customization and so that the snow always appears on the top of the surface.

1\. In the Content Browser, click the **New Asset** button and choose Material from the context menu.

[![NewMaterialContextMenu MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/4/49/NewMaterialContextMenu_MatLayTut.png)](/File:NewMaterialContextMenu_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewMaterialContextMenu_MatLayTut.png "Enlarge")

  

2\. Name your new Material **Mat\_SnowyChrome**.

[![Mat SnowyChrome MayLayTut.png](https://d26ilriwvtzlb.cloudfront.net/5/5e/Mat_SnowyChrome_MayLayTut.png)](/File:Mat_SnowyChrome_MayLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:Mat_SnowyChrome_MayLayTut.png "Enlarge")

  

3\. Double-click your Material to open it within the Material Editor.

[![SnowyChromeMatEd MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/4/45/SnowyChromeMatEd_MatLayTut.png)](/File:SnowyChromeMatEd_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:SnowyChromeMatEd_MatLayTut.png "Enlarge")

  

4\. From the Content Browser, drag and drop in your **Layer\_Chrome** and **Layer\_Snow** Material Layers created in the steps above.

5\. From the MaterialLayerBlend panel, drag in a MatLayerBlend\_Simple Function, as well as a World\_Aligned\_Blend Function. We will use the MatLayerBlend\_Simple to handle the transition from chrome to snow, and the World\_Aligned\_Blend to power the Layer Blend based on the direction the surface is pointed.

6\. Click on the main Material Attributes, and in detail properties, under Materials, check Use Material Attributes.

### Layered Material Network

Below is a breakdown of the Mat\_SnowyChrome network, along with descriptions for each of the commented areas.

[![SnowCoveredChromeNetwork MatLayTut.png](https://d3ar1piqh1oeli.cloudfront.net/6/61/SnowCoveredChromeNetwork_MatLayTut.png/940px-SnowCoveredChromeNetwork_MatLayTut.png)](/File:SnowCoveredChromeNetwork_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:SnowCoveredChromeNetwork_MatLayTut.png "Enlarge")

  

1\. **Chrome Setup** - Here we have brought in the Chrome Material Layer and connected 2 Material Parameters to it. The first is a Scalar Parameter named Chrome Normal that is driving the _Normal Multiplier_ input. The second is a Vector Parameter named _Chrome Tint_ that is driving the _Tint_ input. These will allow us to alter the strength of the normal map, as well as the chrome color when we instance later.

2\. **Snow Setup** - Can't get much simpler than this: we just have our snow Material Layer.

3\. **World Aligned Blend Setup** - In this portion of the network we start off by setting the _Blend Sharpness_ to 10. We then connect a Scalar Parameter named _Snow Bias_ to the _Blend Bias_ input. This will allow the snow coverage to be edited when the Material is instanced.

4\. **MatLayerBlend** - This simply contains the node used to drive the blend. Our Base Material is Chrome. Our Top Material is Snow. The _World\_Aligned\_Blend_ handles the transition.

Save your Material when done!

### Instancing a Layered Material

Since we have already set up our Material with parameters, which in turn drive aspects of our Material Layers, we are ready to instance it and make edits. This process is very easy in UE4.

1\. Make a new level by clicking **File > New Level** from the main menubar. Choose the Default template.

[![NewMap MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/f/f8/NewMap_MatLayTut.png)](/File:NewMap_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewMap_MatLayTut.png "Enlarge")

  

2\. Right-click on the Mat\_SnowyChrome Material and choose **Create Material Instance**. The default name should be fine.

[![CreateMaterialInstance ContextMenu MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/b/b9/CreateMaterialInstance_ContextMenu_MatLayTut.png)](/File:CreateMaterialInstance_ContextMenu_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:CreateMaterialInstance_ContextMenu_MatLayTut.png "Enlarge")

  

3\. Drag and drop the new instance from the Content Browser onto one of the objects in the scene.

[![DragDropMaterialSnowy MatLayTut.png](https://d3ar1piqh1oeli.cloudfront.net/1/11/DragDropMaterialSnowy_MatLayTut.png/940px-DragDropMaterialSnowy_MatLayTut.png)](/File:DragDropMaterialSnowy_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:DragDropMaterialSnowy_MatLayTut.png "Enlarge")

  

4\. Double-click the instance and make any changes you like to its properties. You can change the color of the chrome, the depth of the chrome's normal map, and how much snow has fallen on top of it.

[![ChromeInstance MayLayTut.png](https://d3ar1piqh1oeli.cloudfront.net/4/47/ChromeInstance_MayLayTut.png/940px-ChromeInstance_MayLayTut.png)](/File:ChromeInstance_MayLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:ChromeInstance_MayLayTut.png "Enlarge")

  

Notice as you rotate the object that the snow stays on the topmost surfaces.

[![SnowyChrome MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/d/dc/SnowyChrome_MatLayTut.png)](/File:SnowyChrome_MatLayTut.png)

[![](/skins/common/images/magnify-clip.png)](/File:SnowyChrome_MatLayTut.png "Enlarge")

  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_Layered\_Materials\_(Tutorial)&oldid=6406](https://wiki.unrealengine.com/index.php?title=Creating_Layered_Materials_(Tutorial)&oldid=6406)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Material](/Category:Material "Category:Material")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)