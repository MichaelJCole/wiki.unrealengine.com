Matinee Basics: Skeletal Meshes - Epic Wiki                    

Matinee Basics: Skeletal Meshes
===============================

Contents
--------

*   [1 Part One: So What Exactly Is A Skeletal Mesh?](#Part_One:_So_What_Exactly_Is_A_Skeletal_Mesh.3F)
*   [2 Part Two: How to Find A Skeletal Mesh In The Browser](#Part_Two:_How_to_Find_A_Skeletal_Mesh_In_The_Browser)
*   [3 Part Three: How To Create A New Skeletal Mesh Group In Matinee](#Part_Three:_How_To_Create_A_New_Skeletal_Mesh_Group_In_Matinee)
*   [4 Part Four: How To Clear Or Assign A Skeletal Mesh To An Existing Skeletal Mesh Group.](#Part_Four:_How_To_Clear_Or_Assign_A_Skeletal_Mesh_To_An_Existing_Skeletal_Mesh_Group.)
*   [5 Part Five: Positioning A Skeletal Mesh](#Part_Five:_Positioning_A_Skeletal_Mesh)
*   [6 Part Six: Animating A Skeletal Mesh](#Part_Six:_Animating_A_Skeletal_Mesh)
*   [7 Conclusion](#Conclusion)

The goal in this tutorial is to teach you the basics of using skeletal meshes in Matinee. You’ll learn how to connect and manipulate skeletal meshes & make skeletal meshes animate.

Part One: So What Exactly Is A Skeletal Mesh?
---------------------------------------------

In every day terms, a skeletal mesh is simply a class of mesh that can be animated. The characters and weapons you see in cinematics are skeletal meshes. Here is a slightly more technical definition:

_Skeletal meshes are built up of two parts, a set of polygons composed to make up the surface of the skeletal mesh and a hierarchical set of interconnected bones which can be used to animate the polygons._

Skeletal meshes are often used in Unreal Engine 4 to represent characters or other animating objects. The 3D models, rigging and animations are created in an external modeling and animation application (3DSMax, Maya, Softimage, etc), and are then imported into Unreal Engine 4 and saved into packages by using Unreal Editor's Content Browser.

Part Two: How to Find A Skeletal Mesh In The Browser
----------------------------------------------------

Create and open a Blank Project in UE4. Use _**Blueprint Third Person**_ for this tutorial.

[![NewBPThirdPerson.png](https://d26ilriwvtzlb.cloudfront.net/5/51/NewBPThirdPerson.png)](/File:NewBPThirdPerson.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewBPThirdPerson.png "Enlarge")

  

Go to the content browser Search Toolbar and type in '_**SkeletalMesh'**_.

[![SearchSkeletalMesh.png](https://d26ilriwvtzlb.cloudfront.net/c/cb/SearchSkeletalMesh.png)](/File:SearchSkeletalMesh.png)

[![](/skins/common/images/magnify-clip.png)](/File:SearchSkeletalMesh.png "Enlarge")

  

You should now see the _**HeroTPP**_ skeletal mesh appear in the content browser.

[![FindHeroTPP.png](https://d26ilriwvtzlb.cloudfront.net/c/ca/FindHeroTPP.png)](/File:FindHeroTPP.png)

[![](/skins/common/images/magnify-clip.png)](/File:FindHeroTPP.png "Enlarge")

  

Part Three: How To Create A New Skeletal Mesh Group In Matinee
--------------------------------------------------------------

Creating a skeletal mesh group in Matinee is easy. However, hooking the skeletal mesh up to the skeletal mesh group can be handled two different ways. Let’s look at the most basic method first.

Start by creating a new matinee sequence. _If you need assistance creating a new sequence, take a look at the UE4 tutorial: [Matinee Basics: Creating Your First Matinee Sequence](/Matinee_Basics:_Creating_Your_First_Matinee_Sequence "Matinee Basics: Creating Your First Matinee Sequence")._

Next, drag or add skeletal Mesh HeroTPP into an editor viewport, preferably so that the character is near a ground plane.

[![InLevelHeroTPP.png](https://d26ilriwvtzlb.cloudfront.net/3/32/InLevelHeroTPP.png)](/File:InLevelHeroTPP.png)

[![](/skins/common/images/magnify-clip.png)](/File:InLevelHeroTPP.png "Enlarge")

  

Open the matinee sequence. Make sure the skeletal mesh is still selected and highlighted when you created the new skeletal mesh group. If it is still selected then go to the Matinee and right click in the dark area just under the Track View tab.

A drop down menu should pop up. You have a selection of Groups to choose from. Select “_**Add New Skeletal Group**_”.

[![AddNewSkeletalGroupTrack.png](https://d26ilriwvtzlb.cloudfront.net/1/19/AddNewSkeletalGroupTrack.png)](/File:AddNewSkeletalGroupTrack.png)

[![](/skins/common/images/magnify-clip.png)](/File:AddNewSkeletalGroupTrack.png "Enlarge")

  

You can also name your new Group here if you like – I left the group name _**(NewSkeletalMeshGroup)**_ as is for now.

[![NameTheAddedGroup.png](https://d26ilriwvtzlb.cloudfront.net/8/81/NameTheAddedGroup.png)](/File:NameTheAddedGroup.png)

[![](/skins/common/images/magnify-clip.png)](/File:NameTheAddedGroup.png "Enlarge")

  

When finished adding the new skeletal mesh group it should look like this:

[![TrackWithAddedGroup.png](https://d3ar1piqh1oeli.cloudfront.net/5/55/TrackWithAddedGroup.png/960px-TrackWithAddedGroup.png)](/File:TrackWithAddedGroup.png)

[![](/skins/common/images/magnify-clip.png)](/File:TrackWithAddedGroup.png "Enlarge")

  

Part Four: How To Clear Or Assign A Skeletal Mesh To An Existing Skeletal Mesh Group.
-------------------------------------------------------------------------------------

You just learned how to add a new skeletal mesh group in Matinee. The skeletal mesh you had selected was automatically assigned to the newly created group because you had the mesh selected on creation. Now you will learn how to remove the skeletal mesh from the group. Right click on the skeletal mesh group _**(NewSkeletalMeshGroup)**_ in the timeline and a drop down menu will appear with many track types listed. Select _**“Actors”**_ from the list and you’ll see more options appear. _**Select: HeroTPP(HeroTPP\_3)**_ Then: _**Remove Actor**_.

[![RemoveSkeletalMeshActor.png](https://d3ar1piqh1oeli.cloudfront.net/c/ce/RemoveSkeletalMeshActor.png/960px-RemoveSkeletalMeshActor.png)](/File:RemoveSkeletalMeshActor.png)

[![](/skins/common/images/magnify-clip.png)](/File:RemoveSkeletalMeshActor.png "Enlarge")

  

Once completed the skeletal mesh actor _**HeroTPP**_ should no longer be associated with the skeletal mesh group. To add the skeletal mesh actor back to the group first select the skeletal mesh actor in the level so it becomes highlighted. Next, right click on the skeletal mesh group in the timeline and a drop down menu will appear with many track types listed. Select **“Actors”** from the list and you’ll see more options appear. Select: _**Add Selected Actors**_.

[![SelectedSkeletalMesh.png](https://d3ar1piqh1oeli.cloudfront.net/4/47/SelectedSkeletalMesh.png/960px-SelectedSkeletalMesh.png)](/File:SelectedSkeletalMesh.png)

[![](/skins/common/images/magnify-clip.png)](/File:SelectedSkeletalMesh.png "Enlarge")

  

When completed correctly you should be able to click on the skeletal mesh group and see the actor become highlighted in the level. You can now **add** and **remove** skeletal mesh actors as needed to a matinee.

This knowledge becomes especially useful down the road when dealing with multiple skeletal meshes or updating the mesh you want Matinee referencing.

Part Five: Positioning A Skeletal Mesh
--------------------------------------

To manipulate the skeletal mesh in the level, you will need to manipulate its movement key frame. You can always add more key frames if more than one position is needed.

This key frame contains the positional data of the skeletal mesh (translation and rotation) where it currently sits in the level.

[![EnterKeyframe.png](https://d3ar1piqh1oeli.cloudfront.net/4/4d/EnterKeyframe.png/960px-EnterKeyframe.png)](/File:EnterKeyframe.png)

[![](/skins/common/images/magnify-clip.png)](/File:EnterKeyframe.png "Enlarge")

  

Let’s start by manipulating the data of the first key frame in the movement track. Click on the first key frame in that track at **0.00**. Change the values of that key by manipulating the associated object in the world (HeroTPP). With the key frame selected go to the viewport and simply rotate the skeletal mesh so that it faces forward.

[![RotateHeroMatinee.png](https://d26ilriwvtzlb.cloudfront.net/e/e9/RotateHeroMatinee.png)](/File:RotateHeroMatinee.png)

[![](/skins/common/images/magnify-clip.png)](/File:RotateHeroMatinee.png "Enlarge")

  

**Tip**: I suggest making each key frame you create have an interpolation mode of _**constant**_ so that the character doesn’t slide (interpolate position) over time. The _**constant**_ setting just means the character or object will not interpolate from its position until the matinee reaches a new key frame in the timeline.

You might actually want the character to interpolate between positions on some occasions, but at least now you understand the role of the _**constant**_ key. The shortcut for setting a movement key frame to constant is simply the **5** key

[![InterpConstant.png](https://d3ar1piqh1oeli.cloudfront.net/f/f3/InterpConstant.png/960px-InterpConstant.png)](/File:InterpConstant.png)

[![](/skins/common/images/magnify-clip.png)](/File:InterpConstant.png "Enlarge")

  

Part Six: Animating A Skeletal Mesh
-----------------------------------

To get your skeletal mesh **HeroTPP** character animating all you have to do is select the anim track under the new skeletal mesh group and hit the _**Add Key**_ button. You can also just use the Enter key to add a key.

[![AddKeyButton.png](https://d26ilriwvtzlb.cloudfront.net/a/a5/AddKeyButton.png)](/File:AddKeyButton.png)

[![](/skins/common/images/magnify-clip.png)](/File:AddKeyButton.png "Enlarge")

  

A list of available animations will then appear. Note that the animation is added wherever the time bar is located. In our Example the time bar is at **0.00**.

[![AnimSequenceTrack.png](https://d3ar1piqh1oeli.cloudfront.net/e/ef/AnimSequenceTrack.png/960px-AnimSequenceTrack.png)](/File:AnimSequenceTrack.png)

[![](/skins/common/images/magnify-clip.png)](/File:AnimSequenceTrack.png "Enlarge")

  

Choose the first animation in the list called _**Idle**_ and left click.

[![SelectIdle.png](https://d26ilriwvtzlb.cloudfront.net/6/6e/SelectIdle.png)](/File:SelectIdle.png)

[![](/skins/common/images/magnify-clip.png)](/File:SelectIdle.png "Enlarge")

  

The animation will then be added to your timeline.

[![IdleAnimationTrack.png](https://d3ar1piqh1oeli.cloudfront.net/b/b3/IdleAnimationTrack.png/960px-IdleAnimationTrack.png)](/File:IdleAnimationTrack.png)

[![](/skins/common/images/magnify-clip.png)](/File:IdleAnimationTrack.png "Enlarge")

  

The blue bar represents the length of the animation from start to finish. The time bar is scrubbed to _**1.00**_ seconds into the animation.

[![AnimationLength.png](https://d3ar1piqh1oeli.cloudfront.net/1/1c/AnimationLength.png/960px-AnimationLength.png)](/File:AnimationLength.png)

[![](/skins/common/images/magnify-clip.png)](/File:AnimationLength.png "Enlarge")

  

When you scrub forward in time you will see the current time change from 1.00 seconds to _**1.27**_ Seconds.

[![ScrubbedToTime.png](https://d3ar1piqh1oeli.cloudfront.net/1/1e/ScrubbedToTime.png/960px-ScrubbedToTime.png)](/File:ScrubbedToTime.png)

[![](/skins/common/images/magnify-clip.png)](/File:ScrubbedToTime.png "Enlarge")

  

If you scrub the timeline back and forth you should now see the skeletal mesh _**HeroTPP**_ animate in the world and he should no longer be in a T-pose.

[![FinalMatineeImage.png](https://d3ar1piqh1oeli.cloudfront.net/f/f7/FinalMatineeImage.png/960px-FinalMatineeImage.png)](/File:FinalMatineeImage.png)

[![](/skins/common/images/magnify-clip.png)](/File:FinalMatineeImage.png "Enlarge")

  

Conclusion
----------

You should now have a better understanding of how we add, move and animate skeletal meshes through Matinee. I strongly suggest playing with the different character animations and moving the skeletal mesh around the level just to learn more about Matinee. I also suggest adding a camera to your matinee and actually filming the animated skeletal mesh to see what you can come up with. Good luck!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Matinee\_Basics:\_Skeletal\_Meshes&oldid=6538](https://wiki.unrealengine.com/index.php?title=Matinee_Basics:_Skeletal_Meshes&oldid=6538)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Cinematic](/Category:Cinematic "Category:Cinematic")
*   [Matinee](/Category:Matinee "Category:Matinee")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)