Tank with Turret and Cannon - Epic Wiki             

Tank with Turret and Cannon
===========================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

  

![Note](https://d26ilriwvtzlb.cloudfront.net/b/b3/Icon_template_warning1.png) This tutorial is a work in progress. There is a lot of content still being worked on.

Contents
--------

*   [1 Overview](#Overview)
*   [2 Initial Setup](#Initial_Setup)
*   [3 Hull](#Hull)
    *   [3.1 Component](#Component)
    *   [3.2 EventGraph](#EventGraph)
        *   [3.2.1 Hull Rotation](#Hull_Rotation)
        *   [3.2.2 Hull Movement](#Hull_Movement)
*   [4 Turret](#Turret)
    *   [4.1 Component](#Component_2)
    *   [4.2 EventGraph](#EventGraph_2)
        *   [4.2.1 Turret Rotation](#Turret_Rotation)
*   [5 Cannon](#Cannon)
    *   [5.1 Component](#Component_3)
    *   [5.2 EventGraph](#EventGraph_3)

Overview
--------

A generic tank is built with treads, a hull, a turret and a cannon. In this tutorial we will be explaining how to create a complete simple tank that uses the mouse to swivel the turret and pitch the camera independent from the body's movement.

This tutorial is a pet project of the Unreal Engine Support team. We intend to give all of the basics of creating a tank, but as we go on we plan on adding additional functions that a tank would have.

Initial Setup
-------------

1\. First you will want to make sure that you have a couple of _Input Axis_ created to make things simpler. You will need to make 4 in total:

[![InputAxis Tank.jpg](https://d3ar1piqh1oeli.cloudfront.net/c/cd/InputAxis_Tank.jpg/970px-InputAxis_Tank.jpg)](/File:InputAxis_Tank.jpg)

  

*   **Move Forward** - Used to move the Hull forward/backward.
*   **Rotate Right** - Used for the Hull's _Yaw_ rotation. Right(D) returns positive Float values, Left(A) returns negative.
*   **MouseRotateRight** - Used for the Turret's _Yaw_ rotation.
*   **MouseLookUp** - Used for the Cannon's _Pitch_ rotation. Note that this is actually set to -1 instead of 1. This will actually make sure that the _Pitch_ rotation is inverted, but if you like standard rotation (Moving the mouse forward tilts the cannon up), leave this positive.

2\. Create a new Blueprint based on the Character Class, name it "MyTank" and open it up.

Hull
----

This will be the body that is driven by the WASD controls. 'A' and 'D' will rotate the body in place, while 'W' and 'S' will move the tank back and forth based on the body's rotation.

### Component

First things first, you will need a few meshes to work with. For this part, all you need is a Hull (I am using a box mesh, but anything works). Since we are using a Character, the Hull will need to be a Skeletal Mesh, but it will have no bones, so import it as a _Skeletal Mesh_ with _Rigid Body_ checked on.

In the MyTank Blueprint, assign the Hull to the _Mesh_ component's _Skeletal Mesh_. Adjust it into a position that you like.

[![Left](https://d3ar1piqh1oeli.cloudfront.net/9/98/HullComp_Tank.jpg/970px-HullComp_Tank.jpg)](/File:HullComp_Tank.jpg "Left")  

### EventGraph

#### Hull Rotation

1.  Open the EventGraph
2.  Right-click and search for "InputAxis"
3.  To make this easier, click the small stars next to the different _InputAxis_ Events to favorite them
4.  Add an _InputAxis RotateRight_ node
5.  Drag off of the _Axis Value_ and create a _Make Rot_
6.  Plug the _Axis Value_ into the _Yaw_
7.  Add a _Get_ for the Mesh component
8.  Drag off the _Mesh_ node and create an _Add Relative Rotation_ node
9.  Plug the _RotateRight_ execution into the _Add Relative Rotation_
10.  Plug the _Make Rot_ into the _Delta Rotation_

#### Hull Movement

1.  Add an _InputAxis MoveForward_ node
2.  Drag off execution pin and create a _Add Movement Input_ node
3.  Plug the _Axis Value_ pin into the _Scale Value_ Input
4.  Drag off of the _Mesh_ node and create a _Get World Rotation_ node
5.  Drag off of _Return Value_ on the _Get World Rotation_ node and create a _Break Rot_ node
6.  Drag off of _Yaw_ output and create a _Make Rot_ node
7.  Drag off of _Return Value_ output and create a _Get Forward Vector_ node
8.  Plug _Return Value_ output into world direction of the _Add Movement Input_ node

[![HullMovement Tank.jpg](https://d3ar1piqh1oeli.cloudfront.net/4/40/HullMovement_Tank.jpg/970px-HullMovement_Tank.jpg)](/File:HullMovement_Tank.jpg)

  

Turret
------

The turret rests on top of the Hull mesh, swiveling with the movement of the mouse. The camera will follow this movement to make sure the player can see where they are firing. It will also allow for the Hull to move in one direction while the Cannon fires in another.

### Component

The turret only rotates on the Yaw axis, that is its only function. Since this will be the best way of looking around, the camera should follow its movement.

1.  Add a _Static Mesh Component_ parented under the _Mesh_ component that holds the Hull
2.  Name this "Turret"
3.  Move the Turret to fit onto the Hull
4.  Add a _Camera Component_ parented under the Turret
5.  In the _Camera Component_ uncheck "Use Controller View Rotation"
6.  Move the _Camera Component_ so that it is up and behind the entire tank

[![TurretAndCamComp Tank.jpg](https://d3ar1piqh1oeli.cloudfront.net/c/c9/TurretAndCamComp_Tank.jpg/970px-TurretAndCamComp_Tank.jpg)](/File:TurretAndCamComp_Tank.jpg)

  

### EventGraph

#### Turret Rotation

1.  Add a **InputAxis MouseRotateRight** event node
2.  Add a **Get** for the Turret component
3.  Drag off the **Get** and add a **Add Relative Roation** node
4.  Connect the Execution from the **MouseRotateRight** into the **Add Relative Rotation**
5.  Drag off the **MouseRotateRight** node's _Axis Value_ and create a **Float \* Float** node
6.  Set the value to multiply by to 1.5(This merely increases the rate of rotation, as the unaltered delta value is quite small)
7.  Drag off the Float output of the multiplying node and create a **Make Rot** node
8.  Connect the output of the multiply into the _Yaw_ of the **Make Rot**
9.  Connect the _Return Value_ of the **Make Rot** into the _Delta Rotation_ or the **Add Relative Roation**

[![TurretRotation Tank.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e1/TurretRotation_Tank.jpg)](/File:TurretRotation_Tank.jpg)

  

Cannon
------

The Cannon will _Pitch_ up and down while rotating with the Turret's _Yaw_. It will use the mouse's movement, like the Turret, but only the Y-Axis movement. Unlike the Hull and Turret, the Cannon will only rotate between certain degrees so that it will not spin into the Hull and Turret.

### Component

This will be the simplest of the components:

1.  Add a _Static Mesh Component_ parented under the _Turret_
2.  Name it "Cannon"
3.  Move it into position, so that it looks good with the Turret

[![CannonComp Tank.jpg](https://d3ar1piqh1oeli.cloudfront.net/1/15/CannonComp_Tank.jpg/970px-CannonComp_Tank.jpg)](/File:CannonComp_Tank.jpg)

  

### EventGraph

1.  Create a _Float Variable_ for holding the Cannons's _Pitch_ rotation
2.  Name it "Cannon Rot Pitch"
3.  Add an **InputAxis MouseLookUp** event
4.  Drag from the _Axis Value_ and create an **Float + Float** node
5.  Make a **Get** for the _Cannon Rot Pitch_
6.  Connect the _Canon Rot Pitch_ into the _Float + Float_
7.  Drag from the adding node and create a **Clamp (Float)**
8.  Set the **Clamp's** _Min_ to 0 and _Max_ to 45
9.  Create a **Set Cannon Rot Pitch**
10.  Connect it to the **MouseLoopUp's** _Execution_
11.  Connect the **Clamp's** output to the **Set Cannon Rot Pitch**
12.  Create a **Get** for the _Cannon_ Component
13.  Drag from the **Get Cannon** and create a **Set Relative Rotation**
14.  Connect the **Set Cannon Rot Pitch** to the **Set Relative Rotation**
15.  Drag from the **Get Cannon** and create a **Get Relative Rotation**
16.  Drag off **Get Relative Rotation** and create a **Break Rot**
17.  Drag off of the **Break Rot** and create a **Make Rot**
18.  Connect the _Yaw_ and _Roll_ values directly
19.  For the _Pitch_ value, connect the **Get Rot Pitch** output
20.  Take the _Return Value_ of the **Make Rot** and connect it with the **Set Relative Rotation** node's _New Rotation_ input

[![CannonRotation Tank.jpg](https://d3ar1piqh1oeli.cloudfront.net/c/c7/CannonRotation_Tank.jpg/970px-CannonRotation_Tank.jpg)](/File:CannonRotation_Tank.jpg)

  

_**MORE TO COME! STAY TUNED!**_

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Tank\_with\_Turret\_and\_Cannon&oldid=6471](https://wiki.unrealengine.com/index.php?title=Tank_with_Turret_and_Cannon&oldid=6471)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")