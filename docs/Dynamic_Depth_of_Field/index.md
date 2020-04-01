Dynamic Depth of Field - Epic Wiki                    

Dynamic Depth of Field
======================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.0 to 4.7.5

Contents
--------

*   [1 Overview](#Overview)
*   [2 Blueprint Setup](#Blueprint_Setup)
    *   [2.1 Events](#Events)
    *   [2.2 Trace Hit Result and Focus Distance](#Trace_Hit_Result_and_Focus_Distance)
    *   [2.3 Post Process Settings](#Post_Process_Settings)
*   [3 Final Result and Notes](#Final_Result_and_Notes)

Overview
--------

[![DoF 5.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e9/DoF_5.jpg)](/File:DoF_5.jpg)

Dynamic depth of field is an effect that can be used in FPS games to blur the background while reloading a weapon or focusing on the target as the player aims through iron sights of their weapon while blurring the rest of the screen. It can also be used to create a camera that you can use for taking screenshots for portfolio or any other reason you would want DoF effect without bothering with all the post process adjustments every time.

Here I'll give you the bare bones of how to implement this effect to a player camera using **TP\_FirstPersonBP** template project, which later on you can implement on any camera and change the settings depending on your needs.

  

Blueprint Setup
---------------

[![DoF 6.JPG](https://d3ar1piqh1oeli.cloudfront.net/6/6e/DoF_6.JPG/360px-DoF_6.JPG)](/File:DoF_6.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:DoF_6.JPG "Enlarge")

  

Here you can see the overall network inside the character blueprint's Event graph, if you have experience with Blueprints and just want to get the network and recreate it right away. Now more details.

  

### Events

[![DoF 7.JPG](https://d26ilriwvtzlb.cloudfront.net/2/21/DoF_7.JPG)](/File:DoF_7.JPG)

  

We are going to be using two events, **Event Tick** and an **Input** event. We don't want to have this effect all the time in this case, so we use **Right Mouse Button** to enable Tick to fire a _line trace_ from the camera which will tell us if/where/which object is the center of focus. And when we release the input, it will reverse the Timeline and stop the effect. Event Tick will also update the camera's post process settings as we will see in the following sections.

Trace Distance node is a collapsed graph to reduce the crowd in the network. You can see the expanded view down below:

[![Collapsed TraceDistance.JPG](https://d3ar1piqh1oeli.cloudfront.net/0/0f/Collapsed_TraceDistance.JPG/720px-Collapsed_TraceDistance.JPG)](/File:Collapsed_TraceDistance.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:Collapsed_TraceDistance.JPG "Enlarge")

  

Return Value 1 is the camera's location and 5000 is the distance we are going to be tracing.

  

### Trace Hit Result and Focus Distance

[![DoF 8.JPG](https://d26ilriwvtzlb.cloudfront.net/2/2a/DoF_8.JPG)](/File:DoF_8.JPG)

  

We are going to use a 1 second long **Timeline** track going from 0.0 to 0.5 to set the intensity of depth of field effect(which basically activates/deactivates the effect) After a trace happens every tick we check the return value(boolean).If it is true then it continues the rest of the calculations. If not, it reverses the Timeline to stop the effect.

Considering the trace hit an object, we break that result so that we can get the **Hit Location**. And to get the distance between the camera and the hit location we will use a macro like this:

[![FocusDistance Macro.JPG](https://d26ilriwvtzlb.cloudfront.net/8/83/FocusDistance_Macro.JPG)](/File:FocusDistance_Macro.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:FocusDistance_Macro.JPG "Enlarge")

  

Or, you can use Vector Length node instead if you prefer. Subtract location of the camera from focus location and get the length of that output, and you will get the distance.

  
Now that we have the information we need we can use it to manipulate our camera's depth of field settings.

### Post Process Settings

[![DoF 9.JPG](https://d26ilriwvtzlb.cloudfront.net/9/9e/DoF_9.JPG)](/File:DoF_9.JPG)

  

First we get the post process settings of the camera, which will give us the last focal distance so that we can use it for a soft blend when the trace hits points too far from each other.

To get the Break/Make post process nodes;

1.  **Get First Person Camera**
2.  Drag from first person camera and **Get Post Process Settings**
3.  Drag from post process settings and you'll see **Break and Make PostProcessSettings** nodes

Now in the details panel of Break Postprocesssettings node enable only Depth of Field Focal Distance setting. Currently(version 4.1.1) post process setting nodes are a little messy so you'll have to turn all of the rest of the settings manually for easier control. When we drag from Depth of Field Focal Distance and **Set** the variable(named _Last Focus_) it gets stored as the last focal distance. And finally in order to get a smooth blend between the last focus distance and the current hit location we use **FInterp To** node.

  

Final Result and Notes
----------------------

When it's all done, this is what you will get every time you press and hold the right mouse button:

[Final Result](https://www.youtube.com/watch?v=rEargI8dNFk)

  
You can download a sample project icluding a character BP with this function [**here**](https://drive.google.com/file/d/0B0LlbsIm3HuuTzNQZUJSQmkzR0k/view?usp=sharing).

  
**Notes:**

*   Setting the interp speed depending on the distance is optional, but highly suggested.
*   You can adjust Near and Far Transition depending on how you want it to look like. Add distance for softer transition / Subtract distance for sharper transition.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Dynamic\_Depth\_of\_Field&oldid=14724](https://wiki.unrealengine.com/index.php?title=Dynamic_Depth_of_Field&oldid=14724)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)