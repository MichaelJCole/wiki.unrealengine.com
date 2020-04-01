Blueprint Mutator Tutorial - Low Grav - Epic Wiki                    

Blueprint Mutator Tutorial - Low Grav
=====================================

Contents
--------

*   [1 Blueprint Mutator Tutorial - Low Grav](#Blueprint_Mutator_Tutorial_-_Low_Grav)
    *   [1.1 Requirements](#Requirements)
    *   [1.2 Create the Blueprint](#Create_the_Blueprint)
    *   [1.3 Edit the Blueprint](#Edit_the_Blueprint)
    *   [1.4 Testing the Blueprint](#Testing_the_Blueprint)

Blueprint Mutator Tutorial - Low Grav
=====================================

This tutorial will teach you how to make a Low Grav mutator for UT using only Blueprints. I over explained some blueprint mechanics to help those who are just starting out.

Requirements
------------

*   Engine version: 4.3
*   Skill level: beginner

Create the Blueprint
--------------------

*   In the Content Browser, hit the new button.
*   Select Blueprint from the dropdown menu.

[![Lowgravtutorial newblueprint.png](https://d26ilriwvtzlb.cloudfront.net/8/80/Lowgravtutorial_newblueprint.png)](/File:Lowgravtutorial_newblueprint.png)

*   Enter UTMutator in the Search box of the Custom Classes box.
*   Select UTMutator and then hit the Select button.

[![Lowgravtutorial pickutmutator.png](https://d26ilriwvtzlb.cloudfront.net/c/c8/Lowgravtutorial_pickutmutator.png)](/File:Lowgravtutorial_pickutmutator.png)

*   Name the Blueprint "Mutator\_LowGrav".

Edit the Blueprint
------------------

*   Double click your new "Mutator\_LowGrav" Blueprint to open it in the Blueprint Editor.
*   Click the Graph button in the upper right
*   Click the +V (Add Variable) button
*   Change the variable name to "NewGravity", check the Editable checkbox

[![Lowgravtutorial newvariable.png](https://d26ilriwvtzlb.cloudfront.net/d/db/Lowgravtutorial_newvariable.png)](/File:Lowgravtutorial_newvariable.png)

*   Click the Compile button in the upper left of the window
*   Click the Defaults button, then set the value of NewGravity to -250
*   Return to the Graph view by clicking the Graph button again in the upper right of the window
*   If you're not in the "Event Graph" tab, double click the EventGraph text in the My Blueprint panel
*   Right click the empty graph and select "Add Event", then select "Begin Play" to place the "Begin Play" event
*   Right click the empty graph again and search for "Get Game Mode", select "Get Game Mode" to place the "Get Game Mode" node
*   Drag off of the "Get Game Mode" Return Value to bring up the node search box again, select "Cast To UTGameMode" to place our cast node
*   Connect the "Begin Play" event to the "Cast To UTGameMode" node
*   Drag off of the "As UTGame Mode" Return Value to bring up the node search box, select "Set World Gravity" to place the node
*   Drag the NewGravity variable from the My Blueprint panel over to the NewGravity input on the Event Graph
*   Compile and Save the Blueprint

[![Lowgravtutorial eventgraph.png](https://d26ilriwvtzlb.cloudfront.net/1/15/Lowgravtutorial_eventgraph.png)](/File:Lowgravtutorial_eventgraph.png)

Testing the Blueprint
---------------------

*   Hit the drop down arrow on the Play button and select "Advanced Settings"
*   In the "Server Game Options" edit box of the "Multiplayer Options" section, enter  
    `?mutator=/Game/RestrictedAssets/Blueprints/Mutator_LowGrav.Mutator_LowGrav_C`
    *   The path needs to match the folder that you placed the blueprint in, I've used the place where the shipped example blueprint lives
*   Hit the play button and you should now have reduced gravity
    *   If you do not, examine the output logs to verify that the mutator loaded successfully. You may see a warning like "LogUObjectGlobals:Warning: Failed to find object 'Class /Game/WrongPath/Mutator\_LowGrav\_C'", in that case double check the path that you entered in the "Server Game Options"

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Mutator\_Tutorial\_-\_Low\_Grav&oldid=12176](https://wiki.unrealengine.com/index.php?title=Blueprint_Mutator_Tutorial_-_Low_Grav&oldid=12176)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")

  ![](https://tracking.unrealengine.com/track.png)