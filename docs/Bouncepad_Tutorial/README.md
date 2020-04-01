Bouncepad Tutorial - Epic Wiki                    

Bouncepad Tutorial
==================

Author: Adam Davis

1\. Create a new Actor blueprint. This is a blueprint that derives from the parent class 'Actor', which means it will get all of the attributes of the Actor parent.  
[![ClassActor.png](https://d26ilriwvtzlb.cloudfront.net/a/ab/ClassActor.png)](/File:ClassActor.png)  
2\. Name the blueprint "Bouncepad" and open it by double clicking on the icon in your content browser.  
[![Renamed.png](https://d26ilriwvtzlb.cloudfront.net/e/ee/Renamed.png)](/File:Renamed.png)  
3\. Add a Static Mesh component by going to "Add Component" in the Components window and selecting "Static Mesh component" from the list.  
[![Staticmesh.png](https://d26ilriwvtzlb.cloudfront.net/0/07/Staticmesh.png)](/File:Staticmesh.png)  
4\. In the Details pane, select a suitable static mesh to form the base of your bounce pad.  
[![SelectMesh.png](https://d26ilriwvtzlb.cloudfront.net/f/fa/SelectMesh.png)](/File:SelectMesh.png)  
5\. Create a Box Collision component. This will be what we use to determine whether or not to activate.  
[![Collision.png](https://d26ilriwvtzlb.cloudfront.net/a/aa/Collision.png)](/File:Collision.png)  
6\. Move the collision box to just above the static mesh. Make sure to size it so that the box is not too large or else you will launch well before it looks like you have touched the bounce pad.  
7\. Add an arrow component. Move and rotate the arrow component to face straight upwards from the static mesh and have it sit slight above the mesh on the Z axis. While this won't show up while playing, it will give you an idea of which direction your bounce pad will be launching when you are setting them up.  
[![SetArrow.png](https://d26ilriwvtzlb.cloudfront.net/a/a3/SetArrow.png)](/File:SetArrow.png)  
8\. Compile the blueprint, now open your event graph.  
9\. Find the node "Event Overlap". Your blueprint should have one already set in the event graph.  
[![Overlap.png](https://d26ilriwvtzlb.cloudfront.net/e/ed/Overlap.png)](/File:Overlap.png)  
10\. Drag off of the "Other Actor" pin and create a "cast to" node. The way to do this is to type in "Cast to" and, in this case, use the name of your player character blueprint. For my example it was MyCharacter, so I would type in "Cast to MyCharacter". A Cast to node is a way for blueprints to check who/what they are interacting with and respond accordingly. In many cases, you only want certain blueprints to do specific functions under specific circumstances. This is the case with the bounce pad. We only want it to trigger when the player overlaps the bouncepad, so we use a cast to the character to check what object is overlapping and see if that is or is not the character. If it is, you can continue, if not, do something else or do nothing.  
[![Casttocharacter.png](https://d26ilriwvtzlb.cloudfront.net/4/4b/Casttocharacter.png)](/File:Casttocharacter.png)  
11\. Drag off of the "as <blueprintname>\_C" node and type in "is falling", then select the node on the list. This will get the players state as to whether or not they are in the air. The "Is Falling" state automatically sets when jumping with most of the template pawns provided in the editor.  
[![Isfalling.png](https://d26ilriwvtzlb.cloudfront.net/9/9c/Isfalling.png)](/File:Isfalling.png)  
12\. From the return value, drag off and create a branch node. Plug the execution pin that is unlabeled from the cast to node into the execution of the branch. This setup will check to see if the object that overlaps your bouncepad is the character, then check to see if the character is set to state "falling" or if the player is on the ground.  
[![Branch - Copy.png](https://d26ilriwvtzlb.cloudfront.net/7/70/Branch_-_Copy.png)](/File:Branch_-_Copy.png)  
13\. From the "as <blueprintname>\_C" pin, drag off and type in "launch character" into the context menu. Connect this nodes execution pin to the "True" execution from your branch node. So now, if the overlap detects a player and the player is set to state "is falling", launch the character.  
[![LaunchCharacter.png](https://d26ilriwvtzlb.cloudfront.net/5/55/LaunchCharacter.png)](/File:LaunchCharacter.png)  
14\. As you may have noticed, while we've told the bouncepad to launch the player, we haven't really given it any other information to go off of! The first thing you will want to do is press the checkboxes next to "XYOverride" and "ZOverride". This will eliminate the players movement once they are launched, forcing the pawn to accept the launch velocity as the only input until they are no longer falling or you tell it to do something else.  
[![CheckBools.png](https://d26ilriwvtzlb.cloudfront.net/c/c6/CheckBools.png)](/File:CheckBools.png)  
15\. Next, create a new variable in the "My Blueprint" section. Call this "Bounce Height" and set it to type "Vector" in the Details Pane.  
[![NewVar.png](https://d26ilriwvtzlb.cloudfront.net/f/fe/NewVar.png)](/File:NewVar.png)  
[![ChangeVar.png](https://d26ilriwvtzlb.cloudfront.net/5/5f/ChangeVar.png)](/File:ChangeVar.png)  
16\. In the "My Blueprint" section, click the closed eye next to BounceHeight. This makes the variable editable so that it can be interacted with by other blueprints or outside of the event graph.  
[![EditableVar.png](https://d26ilriwvtzlb.cloudfront.net/9/9c/EditableVar.png)](/File:EditableVar.png)  
17\. In "My Blueprint", select the "Box" component, Left Mouse Button and hold to drag this into the event graph. When you let go, press "Get".  
[![GetNode Component.png](https://d26ilriwvtzlb.cloudfront.net/e/ee/GetNode_Component.png)](/File:GetNode_Component.png)  
18\. Drag off of this and type in "Get Up Vector", drag off of the box again to create a "Get World Rotation". This gets the Z axis of your bouncepad and the rotation you have set the pad in the world.  
[![UpVector Rotation.png](https://d26ilriwvtzlb.cloudfront.net/5/5e/UpVector_Rotation.png)](/File:UpVector_Rotation.png)  
19\. Drag off of your Get Up Vector and type "+ vector", select "vector + vector".  
[![Vectorplus.png](https://d26ilriwvtzlb.cloudfront.net/0/0c/Vectorplus.png)](/File:Vectorplus.png)  
20.Left mouse button and drag your bounce height variable from the "My Blueprint" pane to the empty pin on your add node. What you are doing is taking your up vector information and adding the bounce height variable to it. so if the up vector was 1,0,1 and your bounce height was set to 0,1,0, your total would end up as 1,1,1.  
[![DragPin.png](https://d26ilriwvtzlb.cloudfront.net/b/b0/DragPin.png)](/File:DragPin.png)  
21\. Drag from the output of your add node and type "rotate vector". Create the rotate vector node and plug in your world rotation. This will rotate your up vector + BounceHeight to the direction your bouncepad is set to. This is what makes those arrows so handy!  
[![Rotatevector.png](https://d26ilriwvtzlb.cloudfront.net/f/f1/Rotatevector.png)](/File:Rotatevector.png)  
22\. Plug the return value from your rotate vector into your "launch velocity" for your launch character node.  
[![Launchvelocity.png](https://d26ilriwvtzlb.cloudfront.net/4/42/Launchvelocity.png)](/File:Launchvelocity.png)  
23\. Your blueprint should look something like this when you are done:  
[![FullGraph.png](https://d26ilriwvtzlb.cloudfront.net/4/44/FullGraph.png)](/File:FullGraph.png)  
24\. Compile, save, and close your blueprint.  
25\. Place a copy of your blueprint into the level and rotate it so that the arrow points in the direct you want your player to bounce.  
[![ContentbrowserDrag.png](https://d26ilriwvtzlb.cloudfront.net/0/04/ContentbrowserDrag.png)](/File:ContentbrowserDrag.png)  
26\. In the details pane when you have the bounce pad selected, set your bounceheight to the desired velocity. A good test number is (0,0,1500). Remember that you are affecting your Up vector, so you will want to make your adjustments to the Z axis, not the X or Y.  
[![ChangeBounce.png](https://d26ilriwvtzlb.cloudfront.net/8/83/ChangeBounce.png)](/File:ChangeBounce.png)  
27\. Press Play in editor and jump on the bouncepad

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Bouncepad\_Tutorial&oldid=13538](https://wiki.unrealengine.com/index.php?title=Bouncepad_Tutorial&oldid=13538)"

[Categories](/Special:Categories "Special:Categories"):

*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)