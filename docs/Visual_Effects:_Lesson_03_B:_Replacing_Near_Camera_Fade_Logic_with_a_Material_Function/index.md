Visual Effects: Lesson 03 B: Replacing Near Camera Fade Logic with a Material Function - Epic Wiki                    

Visual Effects: Lesson 03 B: Replacing Near Camera Fade Logic with a Material Function
======================================================================================

  
For this lesson we are going to take a frequently used technique, the near camera fade technique from the last lesson, and create a material function which will replace the logic in our material.

Material Functions:

For more in depth information regarding Material Functions you can view [THIS PAGE.](https://docs.unrealengine.com/latest/INT/Engine/Rendering/Materials/Functions/index.html)

Let’s start by creating a new material function in the same location as your previous materials. Right click in the content browser and choose Materials&Textures>Material Function from the list.

[![CreateNewMatFunc.png](https://d26ilriwvtzlb.cloudfront.net/2/22/CreateNewMatFunc.png)](/File:CreateNewMatFunc.png)

[![](/skins/common/images/magnify-clip.png)](/File:CreateNewMatFunc.png "Enlarge")

  

Name your function: MF\_NearCameraFade

Open the function by double clicking the asset in the content browser.

The first thing you will notice is a material function does not have the normal material inputs you might be expecting.

[![FuncOutputResult.png](https://d26ilriwvtzlb.cloudfront.net/8/84/FuncOutputResult.png)](/File:FuncOutputResult.png)

[![](/skins/common/images/magnify-clip.png)](/File:FuncOutputResult.png "Enlarge")

  

It is important to note the distinction of a material function. A function serves the purpose of creating a capsule of sorts for material logic. This can be very helpful in two ways. One, if you edit the function, it updates every material which uses this logic in your project. You are not required to go through each and every material and update logic. Two, you can clean up your material networks by encapsulating frequently used logic in a function; where you might have had to string up 5 or more nodes before, you may only need 3 with a function. Functions can also make it easy to enable less technical members of your team to still work with, and edit, your materials. Because you are essentially diluting the logic down to the core essential inputs and outputs others can quickly see what your logic needs to work properly.

So let’s get started.

Open your material from the Near Camera Depth Fade lesson, and marquee select all of the nodes which make up your camera fading logic. Copy the nodes with Ctrl+C and return to your material function.

Paste the logic into your Function using Ctrl+V. UE4 will let you copy and paste material expressions from one material to another. This can be a big time saver if you are creating materials from scratch, and you just want grab logic from existing resources.

String up the output of your one minus node to the Output Result node.

[![FadeDistance75.png](https://d26ilriwvtzlb.cloudfront.net/9/9e/FadeDistance75.png)](/File:FadeDistance75.png)

[![](/skins/common/images/magnify-clip.png)](/File:FadeDistance75.png "Enlarge")

  

Compile your Function by pressing the green Apply check box.   Now open your Camera Depth Fade Material from the content browser, and drag your material Function from the content browser, into the Camera Depth Fade Material.

[![NearCamFadeOpacity.png](https://d3ar1piqh1oeli.cloudfront.net/b/b7/NearCamFadeOpacity.png/960px-NearCamFadeOpacity.png)](/File:NearCamFadeOpacity.png)

[![](/skins/common/images/magnify-clip.png)](/File:NearCamFadeOpacity.png "Enlarge")

  

String up your new MF\_NearCameraFade function result to the Opacity input of your Multiply expression.

Now move your camera back and forth, and note that your material behaves in exactly the same fashion as before, fading out as you get closer to the preview plane. If you are not seeing a preview plane, press the plane button. You may also need to rotate your view depending on the orientation of the preview plane to your camera.

So now, we have all of the same logic bundled up into one clean node, but there is one problem. This node only allows for a single global Camera Fade distance, and it’s not quite robust enough to support multiple size sprites. We could create several different functions for different distances, or we can expose the input of the Radius parameter of the Sphere Mask expression to the material, via the function. If that didn’t make sense, don’t worry, it will very soon.

Let’s return to the material function by double clicking on the expression, in your material graph. This is a very quick way to find the logic driving your function!

Drag off of the Radius input pin, let go, and start typing input. Choose Function Input from the list.

[![RadiusFunctionInput.png](https://d26ilriwvtzlb.cloudfront.net/4/43/RadiusFunctionInput.png)](/File:RadiusFunctionInput.png)

[![](/skins/common/images/magnify-clip.png)](/File:RadiusFunctionInput.png "Enlarge")

  

The Radius only accepts a Constant value, and the input we currently have is a Vector. We will need to change this to a Scalar.

[![ScalarInputV3.png](https://d26ilriwvtzlb.cloudfront.net/b/b5/ScalarInputV3.png)](/File:ScalarInputV3.png)

[![](/skins/common/images/magnify-clip.png)](/File:ScalarInputV3.png "Enlarge")

  
  Click the Input expression and change the Input Type dropdown in the Details Panel to Scalar. Give your Input a name, and description so that other artists know what to plug into the input.

[![NearDistanceFadeCostant.png](https://d26ilriwvtzlb.cloudfront.net/6/6d/NearDistanceFadeCostant.png)](/File:NearDistanceFadeCostant.png)

[![](/skins/common/images/magnify-clip.png)](/File:NearDistanceFadeCostant.png "Enlarge")

  

Compile the function and return to your Camera Depth Fade Material.

When you return to the material, you will see error messages. This is because your function now requires an input Value. Keep this in mind if you edit functions after adding them to multiple materials.

[![MF NearCameraFade.png](https://d3ar1piqh1oeli.cloudfront.net/1/13/MF_NearCameraFade.png/960px-MF_NearCameraFade.png)](/File:MF_NearCameraFade.png)

[![](/skins/common/images/magnify-clip.png)](/File:MF_NearCameraFade.png "Enlarge")

  

Drag off of the MF\_NearCameraFade Function and type Constant, choose the constant from the list and set your constant to a value of 75. Compile your material and note that your preview plane fades out as you get closer to it, just as it did before.

[![NearCamFadeOpacityNew.png](https://d3ar1piqh1oeli.cloudfront.net/d/dc/NearCamFadeOpacityNew.png/960px-NearCamFadeOpacityNew.png)](/File:NearCamFadeOpacityNew.png)

[![](/skins/common/images/magnify-clip.png)](/File:NearCamFadeOpacityNew.png "Enlarge")

  

Adding the ability to define an input makes your function far more versatile, thereby making it more valuable. This allows for a myriad of usage cases, where the same function can be used with multiple settings across many materials.

Now save all of your work, and press the Clean Up icon in the material editor.

[![CleanUpButton.png](https://d26ilriwvtzlb.cloudfront.net/8/88/CleanUpButton.png)](/File:CleanUpButton.png)

[![](/skins/common/images/magnify-clip.png)](/File:CleanUpButton.png "Enlarge")

  

This is a quick way of removing logic you no longer wish to use, which is not connected to your shader network. Note that it does not remove comment boxes.

Now arrange the nodes so your graph is neat. It is important to keep materials clean so that it’s easy for others to interpret your work easily.

[![CleanedUpMaterial.png](https://d3ar1piqh1oeli.cloudfront.net/3/38/CleanedUpMaterial.png/960px-CleanedUpMaterial.png)](/File:CleanedUpMaterial.png)

[![](/skins/common/images/magnify-clip.png)](/File:CleanedUpMaterial.png "Enlarge")

  

Now that you have a working material function, you may wish to expose the function to the rest of your team. You can do this by going back to your material function and de-selecting any expressions so the Details panel shows the properties of your function.

In the Details Panel give your function a description. This is what others will see when they mouse over the function, and check the Expose to Library box.

[![ExposeFunctionToLibrary.png](https://d26ilriwvtzlb.cloudfront.net/7/78/ExposeFunctionToLibrary.png)](/File:ExposeFunctionToLibrary.png)

[![](/skins/common/images/magnify-clip.png)](/File:ExposeFunctionToLibrary.png "Enlarge")

  
  Save all of your content, and return to your Camera Depth Fade Material. Click in the graph and type Near, and note your function shows up in the Misc category, with a mouse-over description.

[![NewFunctionLib.png](https://d26ilriwvtzlb.cloudfront.net/c/cc/NewFunctionLib.png)](/File:NewFunctionLib.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewFunctionLib.png "Enlarge")

  

*   [Go back to Lesson 3: Part A](/Visual_Effects:_Lesson_03_A:_Near_Camera_Fading "Visual Effects: Lesson 03 A: Near Camera Fading")
*   [Continue to Lesson 04](/Visual_Effects:_Lesson_04:_Driving_the_Fade_Distance_and_Depth_Fade_Settings_with_a_Dynamic_Parameter "Visual Effects: Lesson 04: Driving the Fade Distance and Depth Fade Settings with a Dynamic Parameter")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Visual\_Effects:\_Lesson\_03\_B:\_Replacing\_Near\_Camera\_Fade\_Logic\_with\_a\_Material\_Function&oldid=10319](https://wiki.unrealengine.com/index.php?title=Visual_Effects:_Lesson_03_B:_Replacing_Near_Camera_Fade_Logic_with_a_Material_Function&oldid=10319)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Particle](/Category:Particle "Category:Particle")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)