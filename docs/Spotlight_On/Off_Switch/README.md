Blueprint Spotlight On/Off Switch Tutorial - Epic Wiki              

Blueprint Spotlight On/Off Switch Tutorial
==========================================

From Epic Wiki

(Redirected from [Spotlight On/Off Switch](/index.php?title=Spotlight_On/Off_Switch&redirect=no "Spotlight On/Off Switch"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Flow Control and Level Blueprints
---------------------------------

### Adding Flow Control to a Simple Level Blueprint

This example follows from the [Blueprint Light Switch Tutorial](/Blueprint_Light_Switch_Tutorial "Blueprint Light Switch Tutorial") Level Blueprint tutorial, so you may need to start there to add Actors to your level or set up the initial Trigger and Spotlight graph, if you are doing this as a full tutorial.

1\. Select the comment box, then press the Delete key or right-click and select Delete.

> **Note**: While you can move a comment and its contents by dragging the comment box alone, pressing the Delete key with just the comment box selected will only delete the comment.

2\. Right-click on the output execution pin of the OnActorBeginOverlap Node and select Break link to Set Brightness (). This will disconnect the OnActorBeginOverlap and SetBrightness Nodes.

[![Spotlight toggle 2.png](https://d26ilriwvtzlb.cloudfront.net/b/bf/Spotlight_toggle_2.png)](/File:Spotlight_toggle_2.png)

[![](/skins/common/images/magnify-clip.png)](/File:Spotlight_toggle_2.png "Enlarge")

  

3\. Select both **Set Brightness** and **Spotlight**, either by holding Shift and clicking on them or by dragging a selection box around them. Drag both _Nodes_ to the far right of your graph, so that you have room to construct more \_Nodes\_ in the center of the graph. Because execution flows from left to right in a Blueprint, it helps to lay out your nodes from left to right in a linear fashion, and **Set Brightness** will still be the last _Node_ we execute.

[![Drag nodes right SOF.png](https://d3ar1piqh1oeli.cloudfront.net/5/5a/Drag_nodes_right_SOF.png/940px-Drag_nodes_right_SOF.png)](/File:Drag_nodes_right_SOF.png)

[![](/skins/common/images/magnify-clip.png)](/File:Drag_nodes_right_SOF.png "Enlarge")

  

4\. Click on the execution pin on the right of your **OnActorBeginOverlap** _Node_, drag a wire out into space, and then release it. The context menu will appear.

[![Toggle actor overlap menu.png](https://d3ar1piqh1oeli.cloudfront.net/d/dc/Toggle_actor_overlap_menu.png/940px-Toggle_actor_overlap_menu.png)](/File:Toggle_actor_overlap_menu.png)

[![](/skins/common/images/magnify-clip.png)](/File:Toggle_actor_overlap_menu.png "Enlarge")

  

5\. Expand **Flow Control** to get a list of _Flow Control Nodes_, then select **FlipFlop**.

[![Context menu flipflop.png](https://d3ar1piqh1oeli.cloudfront.net/2/25/Context_menu_flipflop.png/940px-Context_menu_flipflop.png)](/File:Context_menu_flipflop.png)

[![](/skins/common/images/magnify-clip.png)](/File:Context_menu_flipflop.png "Enlarge")

  

**FlipFlop** switches between state **A** and state **B**, and also outputs a _Boolean_ that is true, or 1, when state **A** is selected.

6\. Connect both the **A** pin and the **B** pin to the **Set Brightness** execution pin.

[![Toggle AB connect.png](https://d3ar1piqh1oeli.cloudfront.net/f/ff/Toggle_AB_connect.png/940px-Toggle_AB_connect.png)](/File:Toggle_AB_connect.png)

[![](/skins/common/images/magnify-clip.png)](/File:Toggle_AB_connect.png "Enlarge")

  

> **Note**: It is possible for there to be two (or more) output execution pins that are connected to one input execution pin. However, the flow of execution through a \_Blueprint\_ is linear. You cannot have one output execution pin connected to two (or more) input execution pins to trigger those \_Nodes\_ simultaneously. To have two nodes triggered by one event, the nodes must be connected in sequence.

  
At this point, the trigger will toggle the light off, and then off again. This is not the most useful light. We will now make the **NewBrightness** input on the **Set Brightness** node dependent on the **IsA** _Boolean_.

  
**FlipFlop** selects state **A** first, and we want the trigger to turn off the light first.

  

FlipFlop Selected State

IsA

Light State

NewBrightness

A

True (1)

Off

0

B

False (0)

On

1

From this table, we can see that our **NewBrightness** variable needs to be equal to _1 - IsA_. Therefore, the next _Node_ we need to add is a subtraction _Node_.

1\. In the search bar of the **Palette** tab, type _\-_. Because the **NewBrightness** pin on our **Set Brightness** node is green, showing it is a float variable, we want to select **\- (float)**.

[![Subtract float palette.png](https://d26ilriwvtzlb.cloudfront.net/b/bc/Subtract_float_palette.png)](/File:Subtract_float_palette.png)

[![](/skins/common/images/magnify-clip.png)](/File:Subtract_float_palette.png "Enlarge")

  

> In this case, using the context menu for the **IsA** pin will not give us the \_Node\_ we are looking for. Just to test this: 1. Click on the **IsA** pin, drag into space, and then release. The context menu for this pin will appear. 2. Typing _\-_ or _subtract_ into the context menu yields no results. Here we can see that sometimes the context menu will not provide the \_Node\_ we are looking for. This is especially true when the type of a variable or pin needs to be converted before it is an appropriate input for our _Node_.

2\. Click on **\- (Float)** and drag it into the **Graph** pane to the right of the **IsA** pin.

[![Subtract float drag.png](https://d3ar1piqh1oeli.cloudfront.net/e/e4/Subtract_float_drag.png/940px-Subtract_float_drag.png)](/File:Subtract_float_drag.png)

[![](/skins/common/images/magnify-clip.png)](/File:Subtract_float_drag.png "Enlarge")

  

3\. Type **1** in the top input text box on the **\- (Float)** _Node_.

[![Float 1 SOF.png](https://d26ilriwvtzlb.cloudfront.net/2/26/Float_1_SOF.png)](/File:Float_1_SOF.png)

[![](/skins/common/images/magnify-clip.png)](/File:Float_1_SOF.png "Enlarge")

  

4\. Connect **IsA** to the bottom input pin.

A _Boolean-to-Float_ _Conversion Node_ will automatically appear.

[![Boolean-to-float.png](https://d26ilriwvtzlb.cloudfront.net/0/00/Boolean-to-float.png)](/File:Boolean-to-float.png)

[![](/skins/common/images/magnify-clip.png)](/File:Boolean-to-float.png "Enlarge")

  

_Conversion Nodes_ can also be found in the **Palette** pane or context menu under **Conversions**.

[![Conversion palette.png](https://d26ilriwvtzlb.cloudfront.net/5/5f/Conversion_palette.png)](/File:Conversion_palette.png)

[![](/skins/common/images/magnify-clip.png)](/File:Conversion_palette.png "Enlarge")

  

You may need to rearrange the _Conversion Node'_ and the **\- (Float)** _Node_ so that the wires are visible.

[![Toggle subtract converted.png](https://d3ar1piqh1oeli.cloudfront.net/d/d3/Toggle_subtract_converted.png/940px-Toggle_subtract_converted.png)](/File:Toggle_subtract_converted.png)

[![](/skins/common/images/magnify-clip.png)](/File:Toggle_subtract_converted.png "Enlarge")

  

At this point, you could connect the output pin of the **\- (Float)** _Node_ to **NewBrightness** and your light would toggle on and off. However, a brightness of 1 will not create a very strong light.

FlipFlop Selected State

IsA

Light State

NewBrightness

A

True (1)

Off

0

B

False (0)

On

500

This is the revised table for our desired **NewBrightness** values. If we multiply the output of the **\- (Float)** _Node_ by 500, we will boost the brightness of the light when it is on.

5\. In this case, you can use the context menu for the **\- (Float)** _Node's_ output pin. Type \_\*\_ in the search bar of the menu, then select **(Float)**.

[![Multiply context menu.png](https://d3ar1piqh1oeli.cloudfront.net/1/14/Multiply_context_menu.png/940px-Multiply_context_menu.png)](/File:Multiply_context_menu.png)

[![](/skins/common/images/magnify-clip.png)](/File:Multiply_context_menu.png "Enlarge")

  

6\. Type _500_ in the bottom input field of the **(Float** _Node_ that appears.

[![Multiply 500.png](https://d26ilriwvtzlb.cloudfront.net/e/eb/Multiply_500.png)](/File:Multiply_500.png)

[![](/skins/common/images/magnify-clip.png)](/File:Multiply_500.png "Enlarge")

  

7\. Connect the output pin to **NewBrightness**.

[![Toggle complete uncommented.png](https://d3ar1piqh1oeli.cloudfront.net/a/a9/Toggle_complete_uncommented.png/940px-Toggle_complete_uncommented.png)](/File:Toggle_complete_uncommented.png)

[![](/skins/common/images/magnify-clip.png)](/File:Toggle_complete_uncommented.png "Enlarge")

  

The Blueprint is now complete. If you **Compile** the _Level Blueprint_ and then play the game in the Level Editor, running through the trigger on top of the square _StaticMesh_ will turn off the light, and overlapping the _TriggerVolume_ a second time will turn the light back on.

However, we will also comment our Blueprint graph so that going forward, it will be easy to know what each part of our graph does, and to keep our Blueprints organized.

Using the same comment process as when we made a Spotlight Off Switch, we can comment the entire graph.

[![Toggle block comment.png](https://d3ar1piqh1oeli.cloudfront.net/e/ee/Toggle_block_comment.png/940px-Toggle_block_comment.png)](/File:Toggle_block_comment.png)

[![](/skins/common/images/magnify-clip.png)](/File:Toggle_block_comment.png "Enlarge")

  

However, it can be very helpful to comment directly on specific \_Nodes\_ as well. Our **FlipFlop** \_Node\_ is a good candidate for a comment, since it would be helpful to be able to tell at a glance what state **A** and state **B** mean.

1\. Right-click on the **FlipFlop** _Node_.

2\. In the **Node Comment** box at the bottom of the right-click menu, type _A = Off, B = On_ and then press Enter.

[![Node comment SOF.png](https://d26ilriwvtzlb.cloudfront.net/f/f2/Node_comment_SOF.png)](/File:Node_comment_SOF.png)

[![](/skins/common/images/magnify-clip.png)](/File:Node_comment_SOF.png "Enlarge")

  

Unlike the **Comment Box**, _Node_ comments won't resize as you zoom. However, they are very useful for at-a-glance reference as you follow the path of a graph.

[![Completed level toggle.png](https://d3ar1piqh1oeli.cloudfront.net/1/1d/Completed_level_toggle.png/940px-Completed_level_toggle.png)](/File:Completed_level_toggle.png)

[![](/skins/common/images/magnify-clip.png)](/File:Completed_level_toggle.png "Enlarge")

[![Spotlight toggle switch.png](https://d26ilriwvtzlb.cloudfront.net/5/54/Spotlight_toggle_switch.png)](/File:Spotlight_toggle_switch.png)

[![](/skins/common/images/magnify-clip.png)](/File:Spotlight_toggle_switch.png "Enlarge")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Spotlight\_On/Off\_Switch\_Tutorial&oldid=2871](https://wiki.unrealengine.com/index.php?title=Blueprint_Spotlight_On/Off_Switch_Tutorial&oldid=2871)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")