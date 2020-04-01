Blueprint Mutator Tutorial - Instagib - Epic Wiki                    

Blueprint Mutator Tutorial - Instagib
=====================================

Contents
--------

*   [1 Blueprint Mutator Tutorial - Instagib](#Blueprint_Mutator_Tutorial_-_Instagib)
    *   [1.1 Requirements](#Requirements)
    *   [1.2 Create the Instagib Rifle Blueprint](#Create_the_Instagib_Rifle_Blueprint)
    *   [1.3 Create the Instagib Mutator Blueprint](#Create_the_Instagib_Mutator_Blueprint)
    *   [1.4 Testing the Blueprint](#Testing_the_Blueprint)

Blueprint Mutator Tutorial - Instagib
=====================================

This tutorial will teach you how to make an Instagib mutator for UT using only Blueprints. I recommend starting with [Blueprint\_Mutator\_Tutorial\_-\_Low\_Grav](/Blueprint_Mutator_Tutorial_-_Low_Grav "Blueprint Mutator Tutorial - Low Grav") before jumping into this tutorial.

Requirements
------------

*   Engine version: 4.3
*   Skill level: intermediate blueprint knowledge

Create the Instagib Rifle Blueprint
-----------------------------------

*   A sample blueprint is currently at Blueprint'/Game/RestrictedAssets/Weapons/ShockRifle/BP\_InstagibRifle.BP\_InstagibRifle', but I will go over how to make your own
*   Right click Blueprint'/Game/RestrictedAssets/Weapons/ShockRifle/ShockRifle.ShockRifle' and select "Create Blueprint based on this"
*   The ShockRifle\_Child blueprint will be created and then opened in the blueprint editor, I personally chose to rename it to InstagibRifle.
*   In the blueprint editor, select the defaults tab and make the following adjustments:
    *   Delete ProjClass\[1\] by selecting delete from the drop down chevron on the far right (highlighted in the following image)
    *   [![Instagibtutorial rifledefault.png](https://d26ilriwvtzlb.cloudfront.net/1/18/Instagibtutorial_rifledefault.png)](/File:Instagibtutorial_rifledefault.png)
    *   Set InstantHit\[0\].Damage to 1000
    *   Duplicate InstantHit\[0\] (using the drop down chevron like the one indicated above) so that alt fire does trace damage as well
    *   Duplicate FireEffect\[0\]
    *   [![Instagibtutorial riflealtered.png](https://d26ilriwvtzlb.cloudfront.net/0/04/Instagibtutorial_riflealtered.png)](/File:Instagibtutorial_riflealtered.png)
    *   Clear Dropped Pickup Class in the Pickup Section
    *   [![Instagibtutorial riflealtered2.png](https://d26ilriwvtzlb.cloudfront.net/9/9b/Instagibtutorial_riflealtered2.png)](/File:Instagibtutorial_riflealtered2.png)
*   Compile and Save the Blueprint

Create the Instagib Mutator Blueprint
-------------------------------------

*   Create a new blueprint with parent class UTMutator just like in [Blueprint\_Mutator\_Tutorial\_-\_Low\_Grav](/Blueprint_Mutator_Tutorial_-_Low_Grav "Blueprint Mutator Tutorial - Low Grav")
*   I chose to name mine Mutator\_Instagib
*   Double click your blueprint to open it in the Blueprint Editor and hit the Graph button
*   Switch to the Event Graph and right click the empty graph, select "Add Event" and then select "Init"
*   Right click the graph again and search for "Get Game Mode", then add that node to the graph
*   Cast the game mode object to "UTGameMode"
*   Drag off the "UTGameMode" object and select "Set Default Inventory"
*   Drag off the "Default Inventory" pin and search for "Make Array"
*   From the drop down of the "Make Array" node, select InstagibRifle

[![Instagibtutorial eventgraph.png](https://d26ilriwvtzlb.cloudfront.net/b/b1/Instagibtutorial_eventgraph.png)](/File:Instagibtutorial_eventgraph.png)

*   We've now set the default weapon set for the game mode, but we need to make sure that no weapon pickups spawn in.
    *   We're going to handle that by overriding the CheckRelevance function to delete all pickups and weapons.
    *   We'll also override the AlwaysKeep function to make sure that InstagibRifle never gets deleted.
*   Right click CheckRelevance in the My Blueprint panel and select "Implement Function" from the menu
*   We should now be editing the CheckRelevance function
*   Hit the Plus symbol next to "Local Variables" in the My Blueprint panel and make a local boolean variable called "Result"
*   Drag "Result" from the My Blueprint panel over to the bool return value on the graph
*   Drag off the Other pin on the graph and drop a "Cast to UTWeapon" node, then repeat with "Cast To UTPickup" and "Cast To UTDroppedPickup"
*   Arrange the graph so that successful casts will set "Result" local variable to false and then return
*   Failing a cast should attempt to call one of the remaining casts and then finally the Parent's CheckRevelance function
    *   In order to get the "Parent: Check Relevance" node, you must right click on the purple "Check Relevance" node and select "Add call to parent function"

[![Instagibtutorial checkrelevance.png](https://d26ilriwvtzlb.cloudfront.net/f/ff/Instagibtutorial_checkrelevance.png)](/File:Instagibtutorial_checkrelevance.png)

*   Right click AlwaysKeep in the My Blueprint panel and select "Implement Function" from the menu
*   This time, add two local boolean variables "Prevent Modify" and "Force Keep"
*   Hook up the local variable "Prevent Modify" to the output pin "Prevent Modify"
*   Hook up the local variable "Force Keep" to the output pin "Return Value"
*   Cast Other to "Instagib Rifle"
    *   If successful, set "Force Keep" to true and "Prevent Modify" to false
    *   If unsuccesful, call the parent function by right clicking on the purple "Always Keep" node and selecting "Add call to parent function"

[![Instagibtutorial alwayskeep.png](https://d26ilriwvtzlb.cloudfront.net/0/04/Instagibtutorial_alwayskeep.png)](/File:Instagibtutorial_alwayskeep.png)

Testing the Blueprint
---------------------

*   Hit the drop down arrow on the Play button and select "Advanced Settings"
*   In the "Server Game Options" edit box of the "Multiplayer Options" section, enter "?mutator=/Game/RestrictedAssets/Blueprints/Mutator\_Instagib.Mutator\_Instagib\_C"
    *   The path needs to match the folder that you placed the blueprint in, I've used the place where the shipped example blueprint lives
*   Change "Number of Clients" to 2
*   Hit the play button and you should now be starting with the shock rifle and doing 1000 damage per hit
    *   If you do not, examine the output logs to verify that the mutator loaded successfully. You may see a warning like "LogUObjectGlobals:Warning: Failed to find object 'Class /Game/WrongPath/Mutator\_Instagib\_C'", in that case double check the path that you entered in the "Server Game Options"

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Mutator\_Tutorial\_-\_Instagib&oldid=10619](https://wiki.unrealengine.com/index.php?title=Blueprint_Mutator_Tutorial_-_Instagib&oldid=10619)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")

  ![](https://tracking.unrealengine.com/track.png)