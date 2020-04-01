Media Player Asset Tutorial - Epic Wiki                    

Media Player Asset Tutorial
===========================

Contents
--------

*   [1 Controlling the Media Player through Blueprints](#Controlling_the_Media_Player_through_Blueprints)
    *   [1.1 Import](#Import)
    *   [1.2 Material](#Material)
    *   [1.3 Blueprint](#Blueprint)

Controlling the Media Player through Blueprints
-----------------------------------------------

In this tutorial we will be going over how to create a Media Player asset, create a material using a Media Texture, and control it’s playback through blueprints. This tutorial assumes the user has basic knowledge of the material editor and blueprints.

The Media Player asset is still considered experimental and is not quite production ready. We do suggest not using this on a major project or implemented as a major feature in your projects, as there could be unexpected results.

**It should also be noted that certain encoded media file types have compatibility issues and may not produce expected results specifically H.264 and .MP4 encoded videos.**

With that in mind let’s begin…

### Import

1\. Click the ‘Import’ button in the Content Browser and import your media file.

2\. Open the Media Player asset created from your imported media file, and set it’s playback rate to 1.0 (to make sure the video plays as expected).

[![](https://d3ar1piqh1oeli.cloudfront.net/f/fc/UnrealTestVidImage.PNG/800px-UnrealTestVidImage.PNG)](/File:UnrealTestVidImage.PNG)

Media Player asset details

  

  

### Material

3\. Right-click your Media Player in the Content Browser and choose the ‘Create Media Texture’ option.

4\. Now that we have created a Media Texture, we can either create a material and apply it to a surface, or we can use it as an image widget in UMG.

5\. Right-click the media texture and choose the 'Create Material' option. Use the image below as a reference on how to set up your material.

6\. Apply this newly created material to your meshes surface. (Be sure the model is unwrapped correctly if using to avoid stretching and skewing of the material).

[![](https://d3ar1piqh1oeli.cloudfront.net/0/06/TestVideoMat.PNG/801px-TestVideoMat.PNG)](/File:TestVideoMat.PNG)

Media Player material

### Blueprint

7\. Now we need to create a new blueprint using a Box Collision component and a Static Mesh component.

8\. In the Content Browser click the, ‘Add New’ and choose the ‘Blueprint Class’ option.

9\. Select the ‘Actor’ option as the blueprint Parent Class.

10\. Open the newly created blueprint and add a new Static Mesh and Box Collision Component.

11\. Place the Box Collision Component in the Viewport tab so it is offset and in front of the Static Mesh (television).

12\. Be sure to have the material applied to your Static Mesh and facing in the correct direction.

13\. Now that our blueprint is arrange we need to add some logic to the Event Graph.

14\. Create a new variable and set it’s type to Media Player reference.

**Be sure you have selected your Media Player from the content browser to be set as your Media Player variable reference.**

[![](https://d3ar1piqh1oeli.cloudfront.net/5/5a/OnMediaOpened.PNG/801px-OnMediaOpened.PNG)](/File:OnMediaOpened.PNG)

OnMediaOpened Event

**Notice how I had to create a Bind Event to OnMediaOpened which is associated with a Custom Event (Media Opened). This makes sure the video is loaded properly first before allowing it to play. This avoids known issues where the Media Player Asset will not function correctly in Packaged and/or Standalone projects.**

16\. For this example I went with a simple Begin and End overlap event which control the play rate of the Media Player variable. This variable references our Media Player file we imported into the Content Browser.

17\. Now, whenever my character enters the Box Collision component, the Media Player will play my media file. Oppositely, when my character exits the collision component, the video pauses its playback by setting the rate to 0.0.

18\. Save your Blueprint, Compile, and Play!

[![](https://d3ar1piqh1oeli.cloudfront.net/4/40/MediaTelevisionBlueprint.PNG/773px-MediaTelevisionBlueprint.PNG)](/File:MediaTelevisionBlueprint.PNG)

[![](/skins/common/images/magnify-clip.png)](/File:MediaTelevisionBlueprint.PNG "Enlarge")

Movie Time!

  

Thanks for following along! I have written some more tutorials you can check out by following the links within my Wiki Profile page found below.

[Andrew Hurley Wiki Profile Page](/User:AndrewHurley "User:AndrewHurley")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Media\_Player\_Asset\_Tutorial&oldid=22675](https://wiki.unrealengine.com/index.php?title=Media_Player_Asset_Tutorial&oldid=22675)"

[Categories](/Special:Categories "Special:Categories"):

*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)