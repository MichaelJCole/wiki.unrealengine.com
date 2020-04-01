Blueprint Power Up Tutorial - Epic Wiki                    

Blueprint Power Up Tutorial
===========================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Components and Setup](#Components_and_Setup)
*   [3 Contruction Script](#Contruction_Script)
*   [4 Event Graph](#Event_Graph)
    *   [4.1 Player Enters the PowerUp](#Player_Enters_the_PowerUp)
    *   [4.2 Is the Actor Already Powered Up?](#Is_the_Actor_Already_Powered_Up.3F)
    *   [4.3 Timeline](#Timeline)
    *   [4.4 Interpolate and Set the Brightness and Size](#Interpolate_and_Set_the_Brightness_and_Size)
    *   [4.5 Update the Pawn Size and PowerUp Brightness](#Update_the_Pawn_Size_and_PowerUp_Brightness)
    *   [4.6 Toggle the Value of PoweredUp](#Toggle_the_Value_of_PoweredUp)
    *   [4.7 Power Down After a Delay](#Power_Down_After_a_Delay)

Overview
--------

[![PowerUp LevelScreenshot.jpg](https://d3ar1piqh1oeli.cloudfront.net/f/f5/PowerUp_LevelScreenshot.jpg/940px-PowerUp_LevelScreenshot.jpg)](/File:PowerUp_LevelScreenshot.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PowerUp_LevelScreenshot.jpg "Enlarge")

  

A power up is a fundamental gameplay mechanic, and placing the art and functionality of a power up area inside a Class Blueprint makes it easy to replicate multiple instances of the area within a level, as well as throughout a game as a whole. Using a Blueprint to create a new class makes it easy to tweak the behavior and appearance of the class and have the altered properties propogate to all instances. Although this example simply changes the scale of a pawn to represent a "power up", this example can serve as a starting point for adding any kind of buff or debuff functionality to your game.

  

[![PowerUp AfterPoweredUp.jpg](https://d3ar1piqh1oeli.cloudfront.net/2/23/PowerUp_AfterPoweredUp.jpg/940px-PowerUp_AfterPoweredUp.jpg)](/File:PowerUp_AfterPoweredUp.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PowerUp_AfterPoweredUp.jpg "Enlarge")

  

The gameplay behavior of the **PowerUp** _Blueprint_ illustrated here is that if a player enters the glowing dome, the dome flashes to signal that it has been activated, while the character grows to twice its original size. After a delay, the character will be scaled back to its original size. This example will show the logic for triggering a **Timeline** to play after some event fires, and then reverse that **Timeline** after a delay.

Components and Setup
--------------------

The **PowerUp** _Blueprint_ contains two components: a _Scene Component_ and a _Static Mesh_. The _Static Mesh_ is displayed in the level when the _Blueprint_ is added to the level. The _Scene Component_ is used as a parent for the _Static Mesh_, so that the _Static Mesh_ can have relative transformations. Without the _Scene Component_, each time the _Blueprint_ is added to the level, the scale and position would have to be adjusted so that only the top half of the sphere shows above the ground.

Execution in the _Blueprint's_ **EventGraph** needs to be triggered when the pawn overlaps the _Static Mesh_, so the **Collision Profile** of the _Static Mesh_ has been set to **OverlapOnlyPawn**.

[![StaticMesh Overlap.jpg](https://d26ilriwvtzlb.cloudfront.net/5/54/StaticMesh_Overlap.jpg)](/File:StaticMesh_Overlap.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:StaticMesh_Overlap.jpg "Enlarge")

  

No _Material_ has been applied to the _Static Mesh_ in the **Details** tab. However, a _Material_ is set in the **ConstructionScript** for the _Blueprint_. The **Preview Viewport** shows how the _Blueprint_ will look after the **ConstructionScript** has executed.

[![PowerUp ComponentView.jpg](https://d3ar1piqh1oeli.cloudfront.net/c/ce/PowerUp_ComponentView.jpg/940px-PowerUp_ComponentView.jpg)](/File:PowerUp_ComponentView.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PowerUp_ComponentView.jpg "Enlarge")

  

Contruction Script
------------------

[![PowerUp ConstructionScript.jpg](https://d3ar1piqh1oeli.cloudfront.net/4/4f/PowerUp_ConstructionScript.jpg/940px-PowerUp_ConstructionScript.jpg)](/File:PowerUp_ConstructionScript.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PowerUp_ConstructionScript.jpg "Enlarge")

  

The **ConstructionScript** executes when an instance of the Blueprint is placed in the level and:

*   Creates a Material Instance Dynamic, or MID and saves it to a _Material_ variable

*   Applies this _Material_ to the **PowerVolume** _Static Mesh_ component.

The _Material Instance_ that is set for the **Parent** pin of the **Create MID** node has a scalar parameter called **BeamBrightness** that will be manipulated in the **EventGraph** of this _Blueprint_.

Event Graph
-----------

There are six areas of the **EventGraph** that have been commented to give a general overview of how execution and data flows through the graph.

*   Execution begins when a player overlaps the **PowerVolume** _Static Mesh_, in the **Player Enters the PowerUp** block

*   The pawn's size is checked in the Is the Actor Already Powered Up? block to prevent errors from a player running through multiple power up instances.

*   If the player is not currently powered up, execution proceeds to the Timeline block.

*   As the Timeline plays and updates:

*   The Interpolate and Set the Brightness and Size block executes.

*   After that, the Update the Pawn Size (Always) and the PowerUp Brightness (if Powering Up) block executes.

*   Once the Timeline finishes playing:

*   Execution moves to the Toggle the Value of PoweredUp block.

*   This may send execution to the Power Down After a Delay block depending on flow control nodes.

The networks within each block are explained in detail below.

  

[![PowerUp Overview.jpg](https://d3ar1piqh1oeli.cloudfront.net/5/52/PowerUp_Overview.jpg/940px-PowerUp_Overview.jpg)](/File:PowerUp_Overview.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PowerUp_Overview.jpg "Enlarge")

  

### Player Enters the PowerUp

[![Block EnterPowerUp.jpg](https://d3ar1piqh1oeli.cloudfront.net/a/af/Block_EnterPowerUp.jpg/940px-Block_EnterPowerUp.jpg)](/File:Block_EnterPowerUp.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Block_EnterPowerUp.jpg "Enlarge")

  

The collision channel for the **PowerVolume** _Static Mesh_ is set to **OverlapOnlyPawn**, so an **OnComponentBeginOverlap** event node can be used to start execution of the _Blueprint's_ graph network. This node is a delegate or bound event, which means that it waits for the _Component_ it is bound to to report that an _Actor_ or _Component_ is overlapping it, and then fires.

*   Execution begins after the pawn overlaps PowerVolume, and the Actor that overlaps the Static Mesh is saved to a variable.

*   Execution moves to the Is the Actor Already Powered Up? block to set the value of PoweredUp.

*   The Branch node checks the value of the PoweredUp Boolean variable, which should be true if the pawn is scaled up, and false otherwise.

*   If true, no other nodes are executed. This prevents the player from triggering the power up many times in rapid succession by running into and out of the PowerVolume; a new power up cannot be triggered until the old one has worn off.

*   If false, execution proceeds to the Play input execution pin of the Timeline node.

### Is the Actor Already Powered Up?

[![Block SizeCheck.jpg](https://d3ar1piqh1oeli.cloudfront.net/7/7d/Block_SizeCheck.jpg/940px-Block_SizeCheck.jpg)](/File:Block_SizeCheck.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Block_SizeCheck.jpg "Enlarge")

  

The **Set PoweredUp** node executes soon after a pawn overlaps the **PowerVolume**.

This network checks the scale of the **OverlappingActor**.

*   If the scale is not equal to (1,1,1), the pawn's scale has already been increased, so **PoweredUp** should be set to true.

*   Otherwise, **PoweredUp** should be set to false.

### Timeline

[![Block Timeline.jpg](https://d26ilriwvtzlb.cloudfront.net/5/5c/Block_Timeline.jpg)](/File:Block_Timeline.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Block_Timeline.jpg "Enlarge")

  

The **Timeline** node contains the tracks for changing the brightness of the **PowerUpMaterial** and for increasing the scale of the pawn after it overlaps the _Static Mesh_. **Timelines** are similar to **Matinee** in that they both allow you to change values over time. **Timelines** have the benefit of being accessible in _Class Blueprints_, and the time-dependent values generated by **Timelines** can be used in more applications than those from **Matinee**.

  

[![PowerUp TimelineTracks.jpg](https://d26ilriwvtzlb.cloudfront.net/2/2d/PowerUp_TimelineTracks.jpg)](/File:PowerUp_TimelineTracks.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:PowerUp_TimelineTracks.jpg "Enlarge")

  

Both tracks in this Timeline are float tracks, and the data output pins from the **Timeline** node are connected to Lerp nodes elsewehere in the Blueprint.

*   The shape of the **BrightnessTrack** curve was set to spike the brightness of the **PowerUpMaterial** three times in quick succession after the Timeline begins playing.

*   The shape of the **SizeTrack** curve was set to slowly increase the scale of the pawn when the Timeline plays forward (and decrease the scale when reversed).

Each tick during gameplay causes execution to flow from the Update execution pin, and when the **Timeline** is finished playing, execution flows from the **Finished** execution pin.

### Interpolate and Set the Brightness and Size

[![Block InterpSetVars.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3b/Block_InterpSetVars.jpg)](/File:Block_InterpSetVars.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Block_InterpSetVars.jpg "Enlarge")

  

A **Lerp** node takes in data inputs for **A**, **B**, and **Alpha**. A is the starting value and B is the end value; the node linearly interpolates between A and B such that the value is 100% A when Alpha = 0 and 100% B when Alpha = 1.

*   The **Alpha** data for the float **Lerp** node comes from the **BrightnessTrack** output data pin of the **Timeline** node, and the result of the linear interpolation is saved to the variable **Brightness**.

*   The **Alpha** data for the **Lerp (Vector)** node comes from the **SizeTrack** output data pin of the **Timeline** node, and the result of the linear interpolation is saved to the variable **Size**.

Execution enters this block whenever the **Timeline** node updates, so the **Brightness** and **Size** variables are updated on every tick. After the **Size** variable is set, execution proceeds to the block which scales the pawn and causes the **PowerVolume** to flash.

### Update the Pawn Size and PowerUp Brightness

[![Block UpdateSizeBrightness.jpg](https://d3ar1piqh1oeli.cloudfront.net/b/ba/Block_UpdateSizeBrightness.jpg/940px-Block_UpdateSizeBrightness.jpg)](/File:Block_UpdateSizeBrightness.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Block_UpdateSizeBrightness.jpg "Enlarge")

  

After the execution flow from the **Update** output of the **Timeline** node proceeds through the **Blueprint** and sets the **Brightness** and **Size** variables, execution enters this region of the _Blueprint_ graph. This region of the _Blueprint_ graph will execute whether the **Timeline** is playing forward or backward, since both directions will cause the **Update** execution pin to fire.

*   The **Set Actor Relative Scale 3D** changes the scale of the **OverlappingActor** to the current linearly interpolated value of **Size**.

*   The **Timeline** playing forward will increase the character's size (to represent powering up).

*   Playing backward will decrease the character's size back to 1:1 scale (to represent powering down).

*   If the character is not powered up yet, the **BeamBrightness** of the **MID** created in the **ConstructionScript** will be changed using **Set Scalar Parameter Value** which takes the **Brightness** variable as input.

### Toggle the Value of PoweredUp

[![Block TogglePoweredUp.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e4/Block_TogglePoweredUp.jpg)](/File:Block_TogglePoweredUp.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Block_TogglePoweredUp.jpg "Enlarge")

  

This block of the _Blueprint_ again uses a **Branch** _Flow Control_ node which checks the value of the **PoweredUp** _Boolean_ variable. This **Branch** node executes whenever the **Timeline** node is **Finished**, so it is executed twice for each power up event.

*   The first time is after the **Timeline** plays forward, so **PoweredUp** is still _false_ and needs to be set to _true_ so the _Blueprint_ knows the character is currently powered up.

*   The second time is after the **Timeline** plays in reverse, so **PoweredUp** is _true_ and needs to be reset to _false_ since the effect has been removed.

### Power Down After a Delay

[![Block PowerDown.jpg](https://d26ilriwvtzlb.cloudfront.net/7/77/Block_PowerDown.jpg)](/File:Block_PowerDown.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Block_PowerDown.jpg "Enlarge")

  

This section of the _Blueprint_ graph executes after the **Timeline** finishes playing forwards, so **PoweredUp** is _false_.

*   The **Delay** node keeps the execution output from firing until the time set on the **Delay** pin has elapsed.

*   After the delay has elapsed, the **Reverse** node plays **PowerUpTimeline** in reverse. This node is functionally the same as having an execution wire connected to the **Reverse** input execution pin of the **PowerUpTimeline** timeline node. That is, execution returns to the **PowerUpTimeline** timeline node, and execution proceeds from that node's **Update** and **Finished** pins.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Power\_Up\_Tutorial&oldid=2870](https://wiki.unrealengine.com/index.php?title=Blueprint_Power_Up_Tutorial&oldid=2870)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

  ![](https://tracking.unrealengine.com/track.png)