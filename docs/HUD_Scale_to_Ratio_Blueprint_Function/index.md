HUD Scale to Ratio Blueprint Function - Epic Wiki                    

HUD Scale to Ratio Blueprint Function
=====================================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:(please verify)

**HUD Scale to Ratio Blueprint Function.**

Create a function that automatically outputs a scale and position for any canvas object no matter the screen resolution.

Contents
--------

*   [1 Overview](#Overview)
*   [2 Create a function inside of your HUD Blueprint EventGraph](#Create_a_function_inside_of_your_HUD_Blueprint_EventGraph)
*   [3 Editing Function](#Editing_Function)
*   [4 Whats Happening?](#Whats_Happening.3F)

Overview
--------

_Blueprint Author:_ [TheAgent](/index.php?title=User:TheAgent&action=edit&redlink=1 "User:TheAgent (page does not exist)") ([talk](/index.php?title=User_talk:TheAgent&action=edit&redlink=1 "User talk:TheAgent (page does not exist)"))

Hello,

In this tutorial I will show you how to set up a function that will scale and reposition any canvas object to the screen resolution.

**Features include:**

*   Offset for X Position
*   Offset for Y Position
*   Desired Scale

**Have a HUD ready that is already blueprinted**

If you do not have a HUD created, or do not know how to make one; please refer to this [tutorial](/HUD,_Canvas,_Code_Sample_of_800%2B_Lines,_Create_Buttons_%26_Draw_Materials "HUD, Canvas, Code Sample of 800+ Lines, Create Buttons & Draw Materials").

Create a function inside of your HUD Blueprint EventGraph
---------------------------------------------------------

On the top left of your Blueprint graph click on the **Add Function** button and name it **ScaleToRatio**

Add 3 float inputs for the function and name them:

*   OffSetX
*   OffSetY
*   Scale

Then add 3 Outputs and name them:

*   PositionX
*   PositionY
*   OutScale

The resulting function should look like this

[![](https://d3ar1piqh1oeli.cloudfront.net/a/a8/FinishedFunction.jpg/180px-FinishedFunction.jpg)](/File:FinishedFunction.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:FinishedFunction.jpg "Enlarge")

function

  
  
  
  
  
  
  

  
  

  

Editing Function
----------------

Double click on the function to open it. You should have a **ScaleToRatio** and **Return** node connected to each other.  

  
**Create Variables**  

On the top left create two floats and name them:

*   RatioX
*   RatioY

Then create a struct vector2D called:

*   ScreenDimensions  
    

  
**Now set up the net work like in the image below**  
  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/1/1b/Completedfunction.jpg/180px-Completedfunction.jpg)](/File:Completedfunction.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Completedfunction.jpg "Enlarge")

completed

  

  
  
  
  
  
  
  

  

Whats Happening?
----------------

*   Getting the viewport size and converting it into a vector2D (**ScreenDimensions**) helps us get the width and height of the viewport or monitor.

*   We then break the vector2D and divide the current height and width of the viewport by a static resolution. By default I used 1280x720 as it gives the best results, it is also common.

*   We then use the resulted ratio to multiply against the X and Y position of the desired Offsets. The same is done with scale.

*   This multiplication will adjust the position so it always appears in the correct location and size no matter the size of the viewport.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=HUD\_Scale\_to\_Ratio\_Blueprint\_Function&oldid=8281](https://wiki.unrealengine.com/index.php?title=HUD_Scale_to_Ratio_Blueprint_Function&oldid=8281)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)