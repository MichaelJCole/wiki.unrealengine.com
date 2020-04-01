Blueprint Light Switch Tutorial - Epic Wiki                    

Blueprint Light Switch Tutorial
===============================

Scene Setup
===========

1\. Begin with the **Blank With Starter Content** project.

2\. Select PointLight1, the light attached to the light fixture hanging from the ceiling.

[![Selected pointlight.Jpeg](https://d3ar1piqh1oeli.cloudfront.net/a/ac/Selected_pointlight.Jpeg/400px-Selected_pointlight.Jpeg)](/File:Selected_pointlight.Jpeg)

[![](/skins/common/images/magnify-clip.png)](/File:Selected_pointlight.Jpeg "Enlarge")

  
3\. In the **Details** panel, uncheck **Visible** under **Rendering** to turn the light off.

4\. In the Modes tab, select **Place** and then **Volumes**.

5\. Scroll down to **Trigger Volume**, and then drag and drop a **Trigger Volume** into the world.

6\. Scale the TriggerVolume until it fills the inside of the room.

[![Placedtriggervolume.Jpeg](https://d3ar1piqh1oeli.cloudfront.net/f/f3/Placedtriggervolume.Jpeg/400px-Placedtriggervolume.Jpeg)](/File:Placedtriggervolume.Jpeg)

[![](/skins/common/images/magnify-clip.png)](/File:Placedtriggervolume.Jpeg "Enlarge")

  

Blueprint
=========

Time to create logic in your Level Blueprint, so that you can have the light turn on when you enter the room, and turn off when you leave the room.

  
1\. In the **Details** tab for the TriggerVolume, scroll down to the **Blueprint** heading.

2\. In the **Add Level Events for TriggerVolume** dropdown, select **Add On Actor Begin Overlap**.

The **Level Blueprint** will open, and an **Event** node for your TriggerVolume will be added automatically.

3\. We want to toggle visibility of the light when you enter the room. We need a reference to the light, so go back to the Level Editor and select PointLight1 again.

4\. Return to the Level Blueprint.

5\. Right-click in an empty area of the graph, and select **Add Reference to PointLight1** (Create a Reference to) in the context menu.

6\. Click and drag from the blue pin on the **PointLight1** reference node into an empty area of the graph to summon the context menu.

7\. Search for **Visibility** in the context menu, and select **Toggle Visibility**.

8\. Now we need to connect the **On Actor Begin Overlap** node to the **Toggle Visibility** node, so that the event execution will cause the **Toggle Visibility** node to execute. Click on the output pin of On Actor Begin Overlap and drag a wire to the input execution pin of **Toggle Visibility**.

9\. Finally, we want the light to turn off when we leave the room. Right-click on the **On Actor Begin Overlap** node and select **Find Actor in Level**. This will select the TriggerVolume in the SceneOutliner.

10\. Right-click on **TriggerVolume3** in the **Scene Outliner**.

11\. Under **Level Blueprint Events**, hover over Add Event to expand the menu, then select **On Actor End Overlap**. The **Level Blueprint** will open, and an **Event** node for your TriggerVolume will be added automatically.

12\. Click on the output pin of **On Actor End Overlap** and drag a wire to the input execution pin of **Toggle Visibility**. You may want to click on the **On Actor End Overlap** and drag it within the graph so it is in a better location.

13\. Play In Editor to test your new Blueprint logic!

[![](https://d3ar1piqh1oeli.cloudfront.net/6/66/Lightswitch_tut_blueprint1.jpg/600px-Lightswitch_tut_blueprint1.jpg)](/File:Lightswitch_tut_blueprint1.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Lightswitch_tut_blueprint1.jpg "Enlarge")

Final Blueprint layout

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Light\_Switch\_Tutorial&oldid=15395](https://wiki.unrealengine.com/index.php?title=Blueprint_Light_Switch_Tutorial&oldid=15395)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)