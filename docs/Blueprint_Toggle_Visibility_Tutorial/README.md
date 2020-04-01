Blueprint Toggle Visibility Tutorial - Epic Wiki                    

Blueprint Toggle Visibility Tutorial
====================================

1\. Begin with the **Blank With Starter Content** project.

2\. Click on the **Blueprints** button in the toolbar, and select **Class Blueprint: Create...** from the dropdown menu.

3\. Select **Actor** as the parent class in the window that appears.

4\. Name your Blueprint, then click **OK**. In this example, the Blueprint is named **CeilingLampBlueprint**. By default, the Blueprint's save location will be Game/Blueprints.

Your Class Blueprint will open in **Components Mode**.

1\. Add a **Static Mesh Component** in the Components tab.

2\. Set the **Static Mesh** to **SM\_Lamp\_Ceiling**.

3\. Add a **PointLightComponent** in the Components tab.

4\. Set the **PointLightComponent's** location to \[0, 0, -240\].

5\. In the **Details** panel, uncheck **Visible** under **Rendering** to turn the light off.

6\. Add a BoxComponent in the Components tab.

7\. Set the BoxComponent's location to \[0, 0, -200\] and scale to \[5, 5, 7\].

8\. In the Details panel for Box1, find the **Add Event** dropdown menu and select **Add OnComponentBeginOverlap**.

9\. Find the **My Blueprint** panel.

10\. Click and drag from **PointLight1** in the **My Blueprint** panel into the graph.

11\. Select **Get** to get a reference to **PointLight1**.

12\. Click and drag from the blue pin on the **PointLight1** reference node into an empty area of the graph to summon the context menu.

13\. Search for Visibility in the context menu, and select Toggle Visibility.

14\. Now we need to connect the **OnComponentBeginOverlap** node to the **Toggle Visibility** node, so that the event execution will cause the **Toggle Visibility** node to execute. Click on the output pin of **OnComponentBeginOverlap** and drag a wire to the input execution pin of **Toggle Visibility**.

15\. Select **Box1** in the **My Blueprint** tab.

16\. Right-click in the graph, and expand **Add Event** for **Box1 > Collision** in the context menu.

17\. Select **Add On Component End Overlap**.

18\. Click on the output pin of **OnComponentEndOverlap** and drag a wire to the input execution pin of **Toggle Visibility**. You may want to click on the **On Actor End Overlap** and drag it within the graph so it is in a better location.

19\. Return to the **Level Editor**, and open the **Blueprints** folder in the **Content Browser**.

20\. Drag and drop **CeilingLampBlueprint** from the **Content Browser** into the level to place an instance of your ceiling light.

21\. **Play In Editor** to test your new Blueprint logic!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Toggle\_Visibility\_Tutorial&oldid=2875](https://wiki.unrealengine.com/index.php?title=Blueprint_Toggle_Visibility_Tutorial&oldid=2875)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

  ![](https://tracking.unrealengine.com/track.png)