Camera Switching in Blueprints - Epic Wiki                    

Camera Switching in Blueprints
==============================

Contents
--------

*   [1 Toggling between Cameras](#Toggling_between_Cameras)
    *   [1.1 Overview](#Overview)
    *   [1.2 Setup](#Setup)
    *   [1.3 Result](#Result)

Toggling between Cameras
------------------------

### Overview

    This tutorial assumes the user has a basic knowledge of blueprints.

This tutorial will show you switch from a camera placed in your scene/level, and then back to the current player camera using the 'Set View Target with Blend' node in blueprints.

### Setup

Below is an example of how you can switch between your current active player camera, to another camera within the level/scene. Simply get a reference to the player camera and the camera placed within the scene and add the below logic to your Level Blueprint.

[![](https://d3ar1piqh1oeli.cloudfront.net/2/2c/LevelBP_SetViewTarget.png/722px-LevelBP_SetViewTarget.png)](/File:LevelBP_SetViewTarget.png)

Level Blueprint

You can see that I am controlling the switching using a FlipFlop node which alternates between cameras with each press of the 'C' key. This can be substituted for an event like OnBeginOverlap with triggers or even a custom event.

### Result

When I begin playing my level, it automatically adopts the player camera as the current active camera.

[![](https://d3ar1piqh1oeli.cloudfront.net/4/4d/OutsideRoom_Cam.png/801px-OutsideRoom_Cam.png)](/File:OutsideRoom_Cam.png)

Default Third Person Camera

Now whenever I press the 'C' key it will set the referenced camera placed in the level as the active camera, and will use the blend settings within the 'Set View Target with Blend' node to interpolate between the previous and current camera.

[![InsideRoom Cam.png](https://d3ar1piqh1oeli.cloudfront.net/7/71/InsideRoom_Cam.png/800px-InsideRoom_Cam.png)](/File:InsideRoom_Cam.png)

Now the current camera is the one placed inside the room, and in order to switch back I need to press the 'C' key.

Thanks for following along! I have written some more tutorials you can check out by following the links within my Wiki Profile page found below.

[Andrew Hurley Wiki Profile Page](/User:AndrewHurley "User:AndrewHurley")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Camera\_Switching\_in\_Blueprints&oldid=23640](https://wiki.unrealengine.com/index.php?title=Camera_Switching_in_Blueprints&oldid=23640)"

[Categories](/Special:Categories "Special:Categories"):

*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)