 Pick Up Physics Object Tutorial - Epic Wiki             

 

Pick Up Physics Object Tutorial
===============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

  

Contents
--------

*   [1 Overview](#Overview)
*   [2 Setting up the blueprint](#Setting_up_the_blueprint)

Overview
--------

<youtube>[https://www.youtube.com/watch?v=xtUw6Jt7VEs](https://www.youtube.com/watch?v=xtUw6Jt7VEs)</youtube>

This tutorial will show you how to create a blueprint that will allow a player to pick up physics objects, move, and throw them by using Physics Handles.

  
To do this you will need to follow this logic:

1\. On key press, trace a line from the player to the object

2\. Determine if that object is a physics object that is under a set weight

3\. If it is, place a Physics Handle at the hit location

4\. Then grab the Physics Handle

5\. On key release, drop or throw the physics object

  

List of Variables

Variable

Type

Default Value

Physics Handle Active

Boolean

False

Is Held?

Boolean

False

Other Item Location

Float

0.0

Pick Up Distance

Float

500

Handle Location

Vector

0.0 : 0.0 : 0.0

Other Item Rotation

Rotator

0.0 : 0.0 : 0.0

Physics Handle

Physics Handle Component

None

Physics Object

Object

None

Physics Object Types

EObjectTypeQuery

Physics Body

  
Here is the setup that I am currently using. It allows for objects to be picked up and moved around freely (Skyrim). Only objects under a certain weight can be lifted, middle-mouse-wheel can be used to adjust the distance of the pickup, and holding Q while releasing the object will shoot it (gravity gun).

[![PhysicsHandle00.JPG](https://d3ar1piqh1oeli.cloudfront.net/3/35/PhysicsHandle00.JPG/940px-PhysicsHandle00.JPG)](/index.php?title=File:PhysicsHandle00.JPG)

Setting up the blueprint
------------------------

1\. Pickup or release an object depending if the Right-mouse Button is clicked.

    a. When the button is pressed, set the Physics Handle Active variable to true.
    b. When the button is released, set the Physics Handle Active variable to false and Release the Component.  The target is the Physics Handle variable which is set in section #6.

[![PhysicsHandle01.JPG](https://d26ilriwvtzlb.cloudfront.net/1/10/PhysicsHandle01.JPG)](/index.php?title=File:PhysicsHandle01.JPG)

2\. This section sets the location of exactly where to pick up the object and keep it located directly in front of the player.

    a. The Physics Handle Active variable is set depending on right-mouse press.  (Covered in section #1)
    b. Once the Branch is true, it will set the Physics Handle location based on the center of the players view.
    c. The Other Item Location variable (which is set in section #5) is combined with where the player is looking.
    d. I generally avoid using Event Tick and instead like to use Delta Time or Timelines, but in this case it is appropriate to use.  We want the object that is picked up to stay in front of the player as they move around.

[![PhysicsHandle02.JPG](https://d3ar1piqh1oeli.cloudfront.net/5/50/PhysicsHandle02.JPG/940px-PhysicsHandle02.JPG)](/index.php?title=File:PhysicsHandle02.JPG)

3\. I added this in to adjust the pickup distance. It basically just increases the Line Trace distance on middle mouse scroll wheel by increasing/decreasing the float value for the Pickup Distance variable. With some additional math and modifications this could be done in real-time while holding an object by adjusting the ‘Sets pickup object location’ section.

[![PhysicsHandle03.JPG](https://d26ilriwvtzlb.cloudfront.net/8/81/PhysicsHandle03.JPG)](/index.php?title=File:PhysicsHandle03.JPG)

4\. The Line Trace is done from the player camera to a set distance.

    a. I am using the float variable Pickup Distance for this and it is set to a default value of 500.
    b. The Draw Debug Type is set to Duration for testing purposes; this allows the line trace to be visible in game for a short period. 
    c. The PhysicsObjectType variable is an EObjectTypeQuery which default value is set to Physics Body.  This makes sure that the line trace will only recognize hits with physics objects.

[![PhysicsHandle04.JPG](https://d3ar1piqh1oeli.cloudfront.net/6/68/PhysicsHandle04.JPG/940px-PhysicsHandle04.JPG)](/index.php?title=File:PhysicsHandle04.JPG)

5\. We now get the other objects location and set a couple of variables.

    a. We use the Break Hit Result node from the next section and get the difference to the player’s location.  Then set the Other Item Location variable with that Vector Length.
    b. This is also where we set the Other Item Rotation; we base it off of the player’s rotation at the time of the Line Trace’s impact.

[![PhysicsHandle05.JPG](https://d3ar1piqh1oeli.cloudfront.net/8/8c/PhysicsHandle05.JPG/940px-PhysicsHandle05.JPG)](/index.php?title=File:PhysicsHandle05.JPG)

6\. Now we take the Break Hit Result and determine if the object is valid to pick up.

    a. Branch based off of if the Line Trace hit a valid target.
    b. Then get the Mass of the Hit Component and see if it is less than 500 kgs.  If it is, then Branch again based off of that info.  (This is optional depending if you want to be able to pick up any weight object.)
    c. The Collision Response Channel pictured here is set after the impulse that is applied in section #9.

**ABOUT COLLISION RESPONSE CHANNELS:** _Basically what is happening here is when the physics object is picked up; we set the Collision Response Channel for the Pawn to ignore (covered in section #7). This allows the object to not collide with the player capsule when picked up. Then, when the object is dropped or thrown, we then set the Collision Response Channel back to Block the Pawn so the player can collide with the object._

[![PhysicsHandle06.JPG](https://d3ar1piqh1oeli.cloudfront.net/5/5a/PhysicsHandle06.JPG/940px-PhysicsHandle06.JPG)](/index.php?title=File:PhysicsHandle06.JPG)

7\. Add and grab the Physics Handle then set the Collision Response Channel.

    a. Add the Physics Handle based off of the players transform.
    b. Set the Physics Handle variable.
    c. This is also where we set the Physics Object variable based off of the Hit Component.
    d. Use a Grab Component to grab the Physics Handle.  All values here are based off of the Physics Handle variable and the Break Hit Result of the line trace.
    e. Set the Collision Response Channel to Ignore the Pawn.  This will make sure that the object doesn't collide with the player’s capsule.
    f. If you would like the physics object to not move freely but to maintain it's rotation even after pick up, enable the Constrain Rotation check-box on the Grab Component node.

[![PhysicsHandle07.JPG](https://d3ar1piqh1oeli.cloudfront.net/9/9b/PhysicsHandle07.JPG/940px-PhysicsHandle07.JPG)](/index.php?title=File:PhysicsHandle07.JPG)

8\. Allow the player to ‘shoot’ the physics object if a button is held when the when the object is dropped.

    a. Set the boolen variable IsHeld? on key Press and Release.
    b. Branch based off of this boolen, then apply a Impulse if it is true.
    c. Get the players forward vector and apply an impulse of 5000 to the object.  (Change this value based on how far you would like to throw the object.)

[![PhysicsHandle08.JPG](https://d3ar1piqh1oeli.cloudfront.net/4/4b/PhysicsHandle08.JPG/940px-PhysicsHandle08.JPG)](/index.php?title=File:PhysicsHandle08.JPG)

**UPDATE #1:** When an object is held and comes to a complete rest, then released; it will stay in the air due to the physics object being put into 'Sleep Mode'. If touched it will then wake and fall correctly. This is done with all physics object to improve performance, but in this case we don't want our physics object to enter sleep mode until it comes to rest on the ground.

In order to fix this, add a 'Wake Rigid body' node just after the 'Release Component' node in step #1. Make sure to connect it to the 'Branch' node from step #8 and connect the Target to the Hit Component in step #6.

_Thanks to ShenmaKid for finding and helping troubleshoot this error!_

[![PhysicsHandle09 UPDATE01.JPG](https://d3ar1piqh1oeli.cloudfront.net/2/2b/PhysicsHandle09_UPDATE01.JPG/940px-PhysicsHandle09_UPDATE01.JPG)](/index.php?title=File:PhysicsHandle09_UPDATE01.JPG)

And that is about it. Many of the values and variable can be adjusted to your liking but for the most part this is the basic setup for Skyrim'ish style object pick ups.

**NOTE:** _This tutorial has been tested and works correctly with versions 4.5.1, 4.6.1, & 4.7.0 of the editor._

Cheers,

TJ Ballard

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Pick\_Up\_Physics\_Object\_Tutorial&oldid=61](https://wiki.unrealengine.com/index.php?title=Pick_Up_Physics_Object_Tutorial&oldid=61)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Blueprint](/index.php?title=Category:Blueprint "Category:Blueprint")
*   [Epic Created Content](/index.php?title=Category:Epic_Created_Content "Category:Epic Created Content")