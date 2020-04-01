Update sun position using mousewheel - Epic Wiki                    

Update sun position using mousewheel
====================================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

Overview
--------

In this tutorial we will create a Blueprint setup (Level Blueprint) in which you can update the sun position (both pitch and yaw) using mouse scroll up and down. To update the pitch you'll use Mouse Scroll Up/Down and with CTRL pressed you can update the Yaw. When ALT is pressed you can speed up this movement.

First add Movable Directional Light in your viewport

Level Blueprint
---------------

Open your Level Blueprint and create a new Rotator variable and name it _SunRotation_. When you begin play, the directional light rotation from your level is saved to this variable so you can freely move the sun inside your viewport and still update it at runtime.

[![StepI.jpg](https://d3ar1piqh1oeli.cloudfront.net/9/9b/StepI.jpg/180px-StepI.jpg)](/File:StepI.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:StepI.jpg "Enlarge")

  

Now create a new float variable with name _RotationValue_. We will later use this variable to update suns rotation.

[![RJ2040 SunBP StepRotationValue.jpg](https://d3ar1piqh1oeli.cloudfront.net/3/3f/RJ2040_SunBP_StepRotationValue.jpg/180px-RJ2040_SunBP_StepRotationValue.jpg)](/File:RJ2040_SunBP_StepRotationValue.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:RJ2040_SunBP_StepRotationValue.jpg "Enlarge")

  

Then create a new _Event BeginPlay_ node and connect like this. NOTE: I am using a Blueprinted DirectionalLight. You may not want to do this. Instead you can simply add a reference to your Sun by selecting it in viewport and right click in Level Blueprint and select Add Reference to Sun.

[![RJ2040 SunBP EventBeginPlay.jpg](https://d3ar1piqh1oeli.cloudfront.net/8/8e/RJ2040_SunBP_EventBeginPlay.jpg/180px-RJ2040_SunBP_EventBeginPlay.jpg)](/File:RJ2040_SunBP_EventBeginPlay.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:RJ2040_SunBP_EventBeginPlay.jpg "Enlarge")

  

Now create series of nodes as shown below. Once i created the nodes i collapsed them all. NOTE: You may not want to add Print Node. I added it just for debugging only.

*   [![RJ2040 SunBP RotationADD NotCollapsed.jpg](https://d3ar1piqh1oeli.cloudfront.net/7/7b/RJ2040_SunBP_RotationADD_NotCollapsed.jpg/120px-RJ2040_SunBP_RotationADD_NotCollapsed.jpg)](/File:RJ2040_SunBP_RotationADD_NotCollapsed.jpg)
    
*   [![RJ2040 SunBP RotationADD NotCollapsed2.jpg](https://d3ar1piqh1oeli.cloudfront.net/8/85/RJ2040_SunBP_RotationADD_NotCollapsed2.jpg/120px-RJ2040_SunBP_RotationADD_NotCollapsed2.jpg)](/File:RJ2040_SunBP_RotationADD_NotCollapsed2.jpg)
    

Now you need to create two events for MouseScrollUP and for one of them make sure to enable Control modifier. Do the same for MouseScrollDown. Then connect the output rotation to Set Rotation node (make sure the target is connected to your sun).

[![RJ2040 SunBP Connections.jpg](https://d3ar1piqh1oeli.cloudfront.net/c/ca/RJ2040_SunBP_Connections.jpg/180px-RJ2040_SunBP_Connections.jpg)](/File:RJ2040_SunBP_Connections.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:RJ2040_SunBP_Connections.jpg "Enlarge")

  

Thats it! Jump into game and use your mouse wheel to dynamically update Sun position.

Make the sun go faster
----------------------

We use the _bAltPressed_ boolean variable to see if the user has pressed the Alt Key. We will use this variable inside those collapsed nodes to check if we want the sun to move faster or not. Setup like this somewhere inside Level Blueprint.

[![TJ2040 SunBP bAltPressed.jpg](https://d3ar1piqh1oeli.cloudfront.net/9/90/TJ2040_SunBP_bAltPressed.jpg/180px-TJ2040_SunBP_bAltPressed.jpg)](/File:TJ2040_SunBP_bAltPressed.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:TJ2040_SunBP_bAltPressed.jpg "Enlarge")

  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Update\_sun\_position\_using\_mousewheel&oldid=8323](https://wiki.unrealengine.com/index.php?title=Update_sun_position_using_mousewheel&oldid=8323)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)