Creating a shared camera for multiplayer games - Epic Wiki                    

Creating a shared camera for multiplayer games
==============================================

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 Tutorial](#Tutorial)
    *   [2.1 Editing the Character Blueprint](#Editing_the_Character_Blueprint)
    *   [2.2 Creating the CameraFocusActor Blueprint](#Creating_the_CameraFocusActor_Blueprint)
*   [3 Testing the setup](#Testing_the_setup)
*   [4 Potential Issues](#Potential_Issues)
*   [5 Outlook](#Outlook)

Introduction
============

This tutorial will show you how to create a shared camera for multiplayer games. Examples for popular games using a similar system are the Lego games or the Smash Bros. games where all players are on the screen simultaneously and the camera reacts to the player positions by moving and zooming. The tutorial will focus on a two character system but the blueprints can be easily adapted to support as many players as desired.

The core concept of this camera system is an additional actor who manages the camera properties and makes sure that the characters stay within a certain distance from each other. The following figure should illustrate the concept:

[![](https://d3ar1piqh1oeli.cloudfront.net/6/62/SharedCameraConcept.png/940px-SharedCameraConcept.png)](/File:SharedCameraConcept.png)

[![](/skins/common/images/magnify-clip.png)](/File:SharedCameraConcept.png "Enlarge")

'C1' and 'C2' are the two characters. 'd' is the distance vector between them. 'r' is simply 'd' divided by two. 'CA' is the Actor responsible for managing the camera. 'l' is the distance vector between the camera and 'CA'.

The CameraFocusActor (CA) will be updated on every Tick. Its position will be set to the center point between both characters. This will make sure that both characters have the same distance from the camera's focus point all the time. If the characters move further apart from each other the camera needs to zoom out to keep both character within its field of view. This is achieved by adjusting the lengths of the camera arm ('l' in the figure) on every Tick. In practice, this is done by simply setting the camera arm length to the same length the distance vector between both characters has ('d' in the figure).

Tutorial
========

To implement this system I started with the 3rd person template. I did not actually create a second playable character. Instead I placed a second character in the level without any controller attached.

Editing the Character Blueprint
-------------------------------

First, I edited the character blueprint. I duplicated the default 'MyCharacter' Blueprint just in case I would mess something up. All that needs to be done at this point is to remove the camera component and the camera arm component from the blueprint. Both character instances will share one camera that is attached to another blueprint so there is no need for a camera here.

[![](https://d3ar1piqh1oeli.cloudfront.net/b/bd/Edit_Character.png/180px-Edit_Character.png)](/File:Edit_Character.png)

[![](/skins/common/images/magnify-clip.png)](/File:Edit_Character.png "Enlarge")

Changes in the 'MyCharacter' Blueprint

Creating the CameraFocusActor Blueprint
---------------------------------------

The CameraFocusActor is the object that is handling the camera and keeps the characters within certain bounds. The appropriate base class for this Blueprint is the 'Actor' because I only need the ability to modify the actors location and ability to add components.

The following image shows the components I added:

[![](https://d3ar1piqh1oeli.cloudfront.net/5/56/CameraFocusActor_Components.png/180px-CameraFocusActor_Components.png)](/File:CameraFocusActor_Components.png)

[![](/skins/common/images/magnify-clip.png)](/File:CameraFocusActor_Components.png "Enlarge")

Components necessary for the CameraFocusActor. The static mesh component is only there to visualize the actor's position for testing purposes.

The critical parts are the 'spring arm component' that is used to control the camera's 'zoom level' ('l' in the first figure) and the 'camera component'. The 'scene component' is used as the root component because otherwise I would not be able to modify the 'spring arm component's' transform. Using the dummy 'scene component' nicely solves that problem. The locations of the 'spring arm component' and the 'camera component' should be set to (0,0,0). The 'spring arm component's' rotation should be set to something like (0,-45,0) to get some kind of top-down look. If another perspective is desired, here is the place to change that. I added an additional mesh component to make the actor visible while playing the game. When you are actually using the blueprint the component should be removed.

Now to the CameraFocusActor's event graph. I use the 'Event Begin Play' to take care of any initialization. Two things must be done: First, the 'player controllers' need to know that they should use the 'camera component' of this blueprint. Second, the CameraFocusActor must find the characters in the level. The next image shows the corresponding blueprint graph:

[![](https://d3ar1piqh1oeli.cloudfront.net/3/36/CameraFocusActor_BeginPlay.png/180px-CameraFocusActor_BeginPlay.png)](/File:CameraFocusActor_BeginPlay.png)

[![](/skins/common/images/magnify-clip.png)](/File:CameraFocusActor_BeginPlay.png "Enlarge")

Event Begin Play event handling.

The 'Player Controller' of the player with index 1 is not really needed in my case since I only spawn one character controller but this shows how can tell other players to use the same camera. The second part where I get references to the characters is most certainly not the most robust solution but I hope doing it this way makes it obvious what is happening.

The last part is the 'Tick Event'. In the 'Tick Event' I take care of the positioning of the CameraFocusActor, control the length of the 'spring arm component' and make sure that that both characters stay within a certain distance from each other. This is the corresponding graph:

[![](https://d3ar1piqh1oeli.cloudfront.net/6/69/CameraFocusActor_Tick.png/180px-CameraFocusActor_Tick.png)](/File:CameraFocusActor_Tick.png)

[![](/skins/common/images/magnify-clip.png)](/File:CameraFocusActor_Tick.png "Enlarge")

Graph of the 'Event Tick'.

First I compute the distance vector between both characters ('d' in the first figure). The value is only needed in this event but to keep the graph clean I assigned it to a variable. In a second step I compute the center point between both characters by dividing the distance vector by two and adding the second character's location vector. I also compute the lengths of the distance value and use that value as the length of the 'spring arm component'. This makes sure that the camera zooms in and out when the character distance changes. In a last step I keep the characters within bounds. To achieve that I clamp the length of the difference vector. The 'MaximumDistance' of 500 I use here makes sure that the length of the distance vector is set to 500 if it is longer than that. If it is shorter, nothing happens here. Next I compute the vector 'r' from the first figure by diving the clamped vector by two. The new positions of character one is now the sum of the vector 'r' and the position vector of the CameraFocusActor. The new position of character two is the difference between both vectors. When the length of the distance vector was smaller than the 'MaximumDistance' this part of the script has no effect and the locations of the characters are set to the locations they were already in. However, if the vector was shortened by the clamp node the characters are 'held back' by this script.

Testing the setup
=================

To see the system in action you simply must place a character instance and an instance of the CameraFocusActor somewhere in the level. A second character instance with the playercontroller attached should be spawned as soon as 'Play' is hit.

Potential Issues
================

When playing around with this system a few issues will become obvious. For example when one characters tries to move out of bounds, the other one will get 'dragged along'. Depending on your design choices that might actually be a desired behavior. However, if you don't want that, you can change the order of the sequence node in the 'Tick Event' graph. When you do that you must compute the value of the 'Distance' variable a second time right before the top left part is executed. This is necessary because the distance vector might change due to the clamp node.

Another issue are objects that might be in between the characters that are messing with the camera. The best way to avoid that greatly depends on what you actually want to do so I will not address that here.

Outlook
=======

There are several things that can be done to adapt the script to your project. For example you could make sure that the camera shows the level from the same side. This might be necessary if your rooms have no front because they are never supposed to be visible. The script can be modified to account for that by using only the 'x' and 'z' components of the character locations when computing the location of the CameraFocusActor. If you keep the 'y' value fixed, your camera will always see the same side of the level. You could use the clamp angle node to give the camera a little 'room' for rotating by clamping the angle between the world's 'y' axis and the CameraFocusActor's 'y' axis. Implementing this would be a bit more tricky, though. You could also use the system for more than two characters by making sure the characters used for computing the distance vector are the characters with the greatest distance from each other. However this would only work when the view is limited to a specific angle as described above. There are also ways to get it working with arbitrary camera angles by projecting the characters onto the the plane perpendicular to the camera's forward vector but I won't go into detail there either.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_a\_shared\_camera\_for\_multiplayer\_games&oldid=11842](https://wiki.unrealengine.com/index.php?title=Creating_a_shared_camera_for_multiplayer_games&oldid=11842)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)