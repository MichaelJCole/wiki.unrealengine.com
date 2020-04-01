Blueprint Six-DOF Flying Pawn Tutorial - Epic Wiki                    

Blueprint Six-DOF Flying Pawn Tutorial
======================================

**Rate this Page:**

4.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif) (2 votes)

Approved for Versions:4.0.1

**Skill Level**: Beginner

**Engine Version**: 4.0.1

  
Getting a 6-DOF flying pawn like in [Descent](http://en.wikipedia.org/wiki/Descent_(video_game)) is fiarly simple in UE4 using only Blueprints.

_Note:_ If you're starting in a blank project, be sure to set up your [Axis Mappings for WASD control as listed here.](/First_Person_Shooter_(Tutorial)#WASD_Movement "First Person Shooter (Tutorial)") I'll be using the Content Examples project as it provides me with a place to fly around in and some simple assets to start with as well as the standard WASD axis bindings.

Contents
--------

*   [1 Setting up the Game Mode and Pawn](#Setting_up_the_Game_Mode_and_Pawn)
*   [2 Building the Pawn](#Building_the_Pawn)
*   [3 Input Part 1: WASD Movement](#Input_Part_1:_WASD_Movement)
*   [4 Input Part 2: Steering](#Input_Part_2:_Steering)
*   [5 Input Part 3: Adding Roll](#Input_Part_3:_Adding_Roll)
*   [6 Extra Credit: Physics Rotations](#Extra_Credit:_Physics_Rotations)

##### Setting up the Game Mode and Pawn

1.  Create a new **Pawn Blueprint** by selecting _**New**_ in the Content Browser. Select **Pawn** from the _Pick Parent Class_ window. Name this **BP\_6DOF\_Pawn**.
    
    [![PawnTut 010 NewBP.jpg](https://d3ar1piqh1oeli.cloudfront.net/6/63/PawnTut_010_NewBP.jpg/450px-PawnTut_010_NewBP.jpg)](/File:PawnTut_010_NewBP.jpg)
    
    [![](/skins/common/images/magnify-clip.png)](/File:PawnTut_010_NewBP.jpg "Enlarge")
    
2.  Next, create a **Game Mode Blueprint** in the same manner, this time selecting **Game Mode** from the _Pick Parent Class_ window. Name this **BP\_6DOF\_Game**.
3.  Now, you'll want to assign **BP\_6DOF\_Game** to the map so that you are in possession of your new Pawn when the game starts. Click on the **World Settings** button in the editor toolbar. This will open a tab with the map's properties. You will find a drop-down menu under **Game Mode** that will display your newly created Game Mode (**BP\_6DOF\_Game**).
    
    [![PawnTut 020 WorldProps.jpg](https://d3ar1piqh1oeli.cloudfront.net/5/58/PawnTut_020_WorldProps.jpg/450px-PawnTut_020_WorldProps.jpg)](/File:PawnTut_020_WorldProps.jpg)
    
    [![](/skins/common/images/magnify-clip.png)](/File:PawnTut_020_WorldProps.jpg "Enlarge")
    
4.  Assign **BP\_6DOF\_Pawn** to the **Game Mode Blueprint** by opening **BP\_6DOF\_Game** and clicking on the _Defaults_ tab and assigning your new **BP\_6DOF\_Pawn** class with the _Default Pawn Class_ dropdown.
    
    [![PawnTut 030 GameMode.jpg](https://d3ar1piqh1oeli.cloudfront.net/9/94/PawnTut_030_GameMode.jpg/450px-PawnTut_030_GameMode.jpg)](/File:PawnTut_030_GameMode.jpg)
    
    [![](/skins/common/images/magnify-clip.png)](/File:PawnTut_030_GameMode.jpg "Enlarge")
    

Close the Game Mode Blueprint Editor and save your work (_File > Save All_ or Ctrl+S)

##### Building the Pawn

1.  Open **BP\_6DOF\_Pawn** and click on the _Components_ tab
2.  Add a **Static Mesh Component** by using the _Add Component_ dropdown.
3.  Name it **BodyMesh**
4.  Assign your desired Static Mesh asset to the component. I've chosen the provided UFO as it fits this example very well. _An important thing to note is that the Static Mesh Component will require valid [collision](https://docs.unrealengine.com/latest/INT/Engine/Physics/Collision/Reference/index.html) to work properly!_
5.  In the Details panel, scroll down to the _Physics_ section and do the following:
    1.  Enable _Simulate Physics_
    2.  Disable _Enable Gravity_
    3.  Set _Angular Damping_ to 1.0
    4.  Set _Linear Damping_ to 1.0
        
        [![PawnTut 040 StaticMeshDetails.jpg](https://d3ar1piqh1oeli.cloudfront.net/a/a6/PawnTut_040_StaticMeshDetails.jpg/450px-PawnTut_040_StaticMeshDetails.jpg)](/File:PawnTut_040_StaticMeshDetails.jpg)
        
        [![](/skins/common/images/magnify-clip.png)](/File:PawnTut_040_StaticMeshDetails.jpg "Enlarge")
        
6.  In the _Components_ panel, add a new **Camera Component** from the dropdown. This will parent it to the **BodyMesh**, inheriting the movement and rotation.
7.  In the _Details_ panel, or using the transform gizmo in the Blueprint Editor viewport, set the position of the Camera behind the **MeshBody**.
8.  Also, disable _Use Controller Rotation_ as we want to follow the rotation of our Pawn, not the controller (Which tends to keep a horizontal view).
    
    [![PawnTut 050 CameraDetails.jpg](https://d3ar1piqh1oeli.cloudfront.net/6/6a/PawnTut_050_CameraDetails.jpg/450px-PawnTut_050_CameraDetails.jpg)](/File:PawnTut_050_CameraDetails.jpg)
    
    [![](/skins/common/images/magnify-clip.png)](/File:PawnTut_050_CameraDetails.jpg "Enlarge")
    

At this point, you should save your work! If you play the level (Alt-P), you should see your Pawn in front of you, but won't be able to move at all. Next, we'll get some input events and get the Pawn moving around!

##### Input Part 1: WASD Movement

1.  Open the **BP\_6DOF\_Pawn** editor from the _Content Browser_ by double-clicking the icon.
2.  Go to the _Graph_ tab and ensure you are in the _Event Graph_ (not the _Construction Script_).
3.  Right-Click in the graph area and find the **Move Forward Axis _Event_** (not the Axis Value function).
    
    [![PawnTut 060 MoveForward.jpg](https://d3ar1piqh1oeli.cloudfront.net/0/04/PawnTut_060_MoveForward.jpg/450px-PawnTut_060_MoveForward.jpg)](/File:PawnTut_060_MoveForward.jpg)
    
    [![](/skins/common/images/magnify-clip.png)](/File:PawnTut_060_MoveForward.jpg "Enlarge")
    
4.  Add a reference to the **BodyMesh** by dragging it from the variables list on the left into the graph and selecting **Get** from the menu.
5.  Drag a wire from the right side of the reference of BodyMesh, releasing the mouse in the Event Graph and find **Set Physics Linear Velocity** function.
    
    [![PawnTut 070 SetPhysicsLinearVel.jpg](https://d3ar1piqh1oeli.cloudfront.net/6/6f/PawnTut_070_SetPhysicsLinearVel.jpg/450px-PawnTut_070_SetPhysicsLinearVel.jpg)](/File:PawnTut_070_SetPhysicsLinearVel.jpg)
    
    [![](/skins/common/images/magnify-clip.png)](/File:PawnTut_070_SetPhysicsLinearVel.jpg "Enlarge")
    
6.  Connect the **Move Forward Axis Event** to the Set **Physics Linear Velocity** function.
7.  Drag a wire from the _Axis Value_ node on **Move Forward Axis Event**, releasing on the Event Graph and select **Float \* Float**
8.  Set the second number of the **Float \* Float** to 30.0 to give our ship some thrust.
9.  Now, we need to add that thrust to the local X or Forward vector of our Pawn. UE4 offers a simple method for this via the **Get Forward Vector** function.
    1.  Right-click on the Event Graph and create a **Get Actor Rotation** function. This returns the world rotation of the Pawn.
    2.  Drag a wire from this and create a **Get Forward Vector** function.
10.  Multiply the **Get Forward Vector** return value by the multiplied Axis Value using a **Vector \* Float** function.
11.  Send this into the _New Vel_ node of the **Set Physics Linear Velocity** function.
12.  Be sure to set the _Add to Current_ bool flag on the Set Physics Linear Velocity function to TRUE.

Your Graph should look like this:

[![PawnTut 080 ForwardDone.jpg](https://d3ar1piqh1oeli.cloudfront.net/b/b3/PawnTut_080_ForwardDone.jpg/450px-PawnTut_080_ForwardDone.jpg)](/File:PawnTut_080_ForwardDone.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PawnTut_080_ForwardDone.jpg "Enlarge")

Do the same for the for the **MoveRight Axis Event**, using the **Get Right Vector** function. Your graph should look like this:

[![PawnTut 090 RightDone.jpg](https://d3ar1piqh1oeli.cloudfront.net/9/97/PawnTut_090_RightDone.jpg/450px-PawnTut_090_RightDone.jpg)](/File:PawnTut_090_RightDone.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PawnTut_090_RightDone.jpg "Enlarge")

Save your work and give it a test! You should be able to move forwards and back using the W and S keys and left and right using the A and D keys (Or, even controller input using the analog sticks!). Crashing into a wall should send you spinning! you'll need to add some steering to be able to get around without crashing.

##### Input Part 2: Steering

1.  Right-Click on the _Event Graph_ and find the **LookUp Axis Event**.
2.  Drag a wire from the **LookUp Axis Event** exec node and create an **Add Actor Local Rotation** function
3.  Right-Click on the _Event Graph_ and create a **Make Rot** function.
4.  Wire the _Axis Value_ from the **LookUp Axis Event** to the _Pitch_ node of the **Make Rot** function.
5.  Wire the Return node of the **Make Rot** function to the _Delta Rotation_ input on the **Add Actor Local Rotation** function.
6.  Repeat for the **Turn Axis Event**
    1.  Rather than the _Pitch_, wire the **Turn Axis Event** _Axis Value_ to the _Yaw_.

Your Event Graph should look like this:

[![PawnTut 100 TurnDone.jpg](https://d3ar1piqh1oeli.cloudfront.net/c/ce/PawnTut_100_TurnDone.jpg/450px-PawnTut_100_TurnDone.jpg)](/File:PawnTut_100_TurnDone.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PawnTut_100_TurnDone.jpg "Enlarge")

  
**Update**: one additional step that you need to do since UE4 Pawn changed and is now based of "scenerootcomponent", is to mark the mesh as root. To do so, in the components list, drag the _BodyMesh_ onto the _Scene root component_ to reparent it as root. Steering should now work as expected.

Save your work, close the Blueprint Editor and give it a try by playing (Alt-P).

You should get something like this: [YouTube: http://youtu.be/WM5BajSfWzI](http://youtu.be/WM5BajSfWzI)

##### Input Part 3: Adding Roll

1.  Open the Project Settings dialog from the Edit menu.
2.  Go to Input
3.  Expand Axis Mappings then click the **+** symbol next to the words _Axis Mappings_. This will add a new Axis event and value to your blueprints.
4.  Name the newly created mapping **Roll**.
5.  Expand the **Roll** rollout and add another input by clicking the **+** next to the mapping name.
6.  Select **Q** for the first dropdown and set the value to -1.0.
7.  Select **E** for the second dropdown and set the value to 1.0.
    
    [![PawnTut 110 InputMapping.jpg](https://d3ar1piqh1oeli.cloudfront.net/5/54/PawnTut_110_InputMapping.jpg/450px-PawnTut_110_InputMapping.jpg)](/File:PawnTut_110_InputMapping.jpg)
    
    [![](/skins/common/images/magnify-clip.png)](/File:PawnTut_110_InputMapping.jpg "Enlarge")
    
8.  Close the _Project Settings_ dialog and open the **BP\_6DOF\_Pawn** editor.
9.  Go to the _Event Graph_ and add the **Roll Axis Event**, connecting it to the _Roll_ input of a **Make Rot** function.

Your Graph should look like this:

[![PawnTut 120 FinalGraph.jpg](https://d3ar1piqh1oeli.cloudfront.net/f/f3/PawnTut_120_FinalGraph.jpg/450px-PawnTut_120_FinalGraph.jpg)](/File:PawnTut_120_FinalGraph.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PawnTut_120_FinalGraph.jpg "Enlarge")

Save your progress and hit Play (Alt-P). Now the Q and E keys should roll your ship!

Good luck! --Tom

##### Extra Credit: Physics Rotations

I figured this out, but I find that it makes the controls pretty tough to handle, however you might find it instructional on how to apply Angular momentum to the pawn. I won't go into step-by-step detail, but you can follow the attached screenshot:

[![PawnTut EC1 AngularVelocity.jpg](https://d3ar1piqh1oeli.cloudfront.net/8/84/PawnTut_EC1_AngularVelocity.jpg/650px-PawnTut_EC1_AngularVelocity.jpg)](/File:PawnTut_EC1_AngularVelocity.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PawnTut_EC1_AngularVelocity.jpg "Enlarge")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Six-DOF\_Flying\_Pawn\_Tutorial&oldid=24610](https://wiki.unrealengine.com/index.php?title=Blueprint_Six-DOF_Flying_Pawn_Tutorial&oldid=24610)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)