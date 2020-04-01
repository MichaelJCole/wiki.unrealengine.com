Blueprint Troubleshooting Guide - Epic Wiki                    

Blueprint Troubleshooting Guide
===============================

Contents
--------

*   [1 About This Guide](#About_This_Guide)
*   [2 **Blueprints**](#Blueprints)
    *   [2.1 **TRASHCLASS**](#TRASHCLASS)
    *   [2.2 **Accessed None**](#Accessed_None)
    *   [2.3 **Casting**](#Casting)
    *   [2.4 **Level Streaming**](#Level_Streaming)
        *   [2.4.1 Sublevel Blueprints](#Sublevel_Blueprints)
        *   [2.4.2 **Splines**](#Splines)
            *   [2.4.2.1 Editing at Runtime](#Editing_at_Runtime)
        *   [2.4.3 **Instanced Meshes**](#Instanced_Meshes)
            *   [2.4.3.1 Updating Instances at Runtime](#Updating_Instances_at_Runtime)
*   [3 **Additional Resources**](#Additional_Resources)
*   [4 **Notes & Tips**](#Notes_.26_Tips)
    *   [4.1 **Acronyms**](#Acronyms)

_This page is currently under construction, more errors and solutions will be added over time._

About This Guide
================

Blueprints are an incredibly powerful tool, especially for artists and other visually driven individuals. However, there are times when it can be difficult to know what to do or where to go next. This troubleshooting guide is aimed at assisting with some of the more common blueprint related errors and pitfalls. After reading through it, hopefully you will have a better understanding of what limitations are present in blueprints and what may be occurring if you are experiencing an error and do not know why. This guide is not meant to be completely comprehensive, but a live document that will undergo changes over time.

**Blueprints**
==============

#### **TRASHCLASS**

**TRASHCLASS** errors typically occur in blueprints when a circular dependency is present. Circular dependencies are when information is requested between two or more blueprints that relies on information from the calling blueprint to complete, this creates a loop that can lead to many errors. **TRASHCLASS** errors are the most common, and are typically fairly simple to fix. All that is required is the circular dependency breaks. If information is needed from the original blueprint, pass that information along with the request so that blueprints down the node chain do not have to loop back to the original blueprint to retrieve. Additionally, use proper interface calls, casting, etc. to communicate between blueprints and alleviate some of the information passing. A sample project explaining blueprint communication can be found here:

[Blueprint Communication](https://docs.unrealengine.com/latest/INT/Engine/Blueprints/HowTo/index.html)

If breaking the circular dependency does not fix the error, then you may have discovered a bug. Please report this information to the [Bug Reports](https://answers.unrealengine.com/spaces/11/bugs-and-crashes.html) section of the Answerhub for additional further investigation. If you do not believe this to be a bug, try reaching out to other community members on the [Answerhub](https://answers.unrealengine.com/index.html) or [Forums](https://forums.unrealengine.com/) for assistance.

#### **Accessed None**

[![AccessedNoneError.png](https://d26ilriwvtzlb.cloudfront.net/f/f1/AccessedNoneError.png)](/File:AccessedNoneError.png)

Typically a **NULL** value, often occurs when attempting to use a variable that was referencing an asset that has been destroyed (for instance, calling a function on a projectile after the projectile has been destroyed in play) or attempting to destroy an actor that isn't present.

To fix this, insert an **IsValid** check in front of the nodes referenced by the accessed 'None' error. If the variable isn't populated, it isn't valid and will not run the functionality on the "Is Valid" execution pin.

[![IsValid.png](https://d26ilriwvtzlb.cloudfront.net/7/75/IsValid.png)](/File:IsValid.png)

#### **Casting**

If you are receiving an error while casting, check to ensure your value being passed is valid. If it is and you are still receiving an error, ensure that the information you are trying to access is public.

*   [Casting](https://docs.unrealengine.com/latest/INT/Engine/Blueprints/UserGuide/CastNodes/index.html)

### **Level Streaming**

*   [Blueprint Manual Level Streaming](/Blueprint_Manual_Level_Streaming "Blueprint Manual Level Streaming")
*   [World Browser](http://docs.unrealengine.com/latest/INT/Engine/LevelStreaming/WorldBrowser/index.html)

##### Sublevel Blueprints

While some functions will work out of a sublevel's level blueprint, it is not recommended to rely on this. Any functionality that you need through the level blueprint would be best set in the persistent level. This is especially true for events such as EndPlay, which only run through the persistent level level blueprint.

#### **Splines**

##### Editing at Runtime

Currently, it is not possible to editor splines at runtime. All editing should take place manually in editor or via the construction script. Spline mesh components, however, can be moved and edited by ensuring the associated mesh is set to movable. You can find more information on this here:

[Spline Mesh Component at Runtime](https://answers.unrealengine.com/questions/261136/add-spline-mesh-component-doesnt-work-at-runtime.html)

#### **Instanced Meshes**

##### Updating Instances at Runtime

Instanced meshes are meant to be a method to create many copies of an asset without increasing performance costs significantly. As such, they are primarily designed for stationary actors. It is not advised that you update an instanced mesh during runtime due to this.

**Additional Resources**
========================

*   [Blueprint Visual Scripting](https://docs.unrealengine.com/latest/INT/Engine/Blueprints/index.html%7C)
*   [Blueprint Quickstart Guide](https://docs.unrealengine.com/latest/INT/Engine/Blueprints/QuickStart/index.html%7C)

  

**Notes & Tips**
================

#### **Acronyms**

**IWCE** - 'In World Component Editing' (Editing a component through the Details panel of a blueprint and not in the blueprint editor itself)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Troubleshooting\_Guide&oldid=23524](https://wiki.unrealengine.com/index.php?title=Blueprint_Troubleshooting_Guide&oldid=23524)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprints](/index.php?title=Category:Blueprints&action=edit&redlink=1 "Category:Blueprints (page does not exist)")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")
*   [Troubleshooting](/Category:Troubleshooting "Category:Troubleshooting")

  ![](https://tracking.unrealengine.com/track.png)