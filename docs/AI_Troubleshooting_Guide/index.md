AI Troubleshooting Guide - Epic Wiki                    

AI Troubleshooting Guide
========================

Contents
--------

*   [1 About This Guide](#About_This_Guide)
    *   [1.1](#)
*   [2 **AI**](#AI)
    *   [2.1 _Behavior Tree_](#Behavior_Tree)
        *   [2.1.1 Linking Blackboard to Behavior Tree](#Linking_Blackboard_to_Behavior_Tree)
        *   [2.1.2 Behavior Tree Not Running](#Behavior_Tree_Not_Running)
    *   [2.2 _Perception_](#Perception)
        *   [2.2.1 Detection By Affiliation](#Detection_By_Affiliation)
        *   [2.2.2 Register As Source](#Register_As_Source)
    *   [2.3 _EQS_](#EQS)
    *   [2.4 _NavMesh_](#NavMesh)

_This page is currently under construction, more errors and solutions will be added over time._

About This Guide
================

**AI**
======

#### _Behavior Tree_

###### Linking Blackboard to Behavior Tree

In order to link your Blackboard to your Behavior Tree, open up your Behavior Tree and select the Blackboard you would like to link it to from the Blackboard Asset dropdown in the Details panel.

  

###### Behavior Tree Not Running

Ensure that you have set your behavior tree to run using the Run Behavior Tree node, and that you have selected the correct behavior tree from the drop down on the node. This is typically done inside of the AI Controller blueprint.

#### _Perception_

###### Detection By Affiliation

Detection By Affiliation currently requires that you have all three settings enabled in order for your Perception to function correctly. If you believe you have your Perception set up correctly, but it is not working, check to make sure that you have all three enabled as shown in the image below.

[![DetectionByAffiliation.png](https://d26ilriwvtzlb.cloudfront.net/6/61/DetectionByAffiliation.png)](/File:DetectionByAffiliation.png)

###### Register As Source

In order for something to be detected by Perception Senses, it must be registered as a source for each sense that you'd like it to be detected by. If you find that your AI character is not detecting anything, ensure that the blueprint of what you'd like to detect contains an AI Perception Stimuli Source component.

Once you have added the component to the blueprint, you'll need to go to the component's Details panel and enable the Auto Register as Source option as well as add senses to the Register as Source for Senses by clicking the + as shown in the image below.

[![RegisterAsSource.png](https://d26ilriwvtzlb.cloudfront.net/d/d4/RegisterAsSource.png)](/File:RegisterAsSource.png)

#### _EQS_

EQS is currently an experimental feature, which means that issues with it can be expected. In order to use EQS in your project, you must go to Edit->Editor Preferences->Experimental and enable the Environment Querying System option. Once you have done this, you will see EQS Queries show up under the Artificial Intelligence section when you add a new asset to the Content Browser.

#### _NavMesh_

Having a Nav Mesh is vital to most AI setups. If you are experiencing issues with your setup not functioning as you expect, always double-check to ensure that your level contains a Nav Mesh Bounds Volume, and that is extends to the areas that you need it to cover. You can always check to see which areas your Nav Mesh is covering by selecting an object in the viewport and pressing the 'P' key. This will display your Nav Mesh, with green areas being navigable, and red being areas that are not.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=AI\_Troubleshooting\_Guide&oldid=22074](https://wiki.unrealengine.com/index.php?title=AI_Troubleshooting_Guide&oldid=22074)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [AI](/index.php?title=Category:AI&action=edit&redlink=1 "Category:AI (page does not exist)")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")
*   [Troubleshooting](/Category:Troubleshooting "Category:Troubleshooting")

  ![](https://tracking.unrealengine.com/track.png)