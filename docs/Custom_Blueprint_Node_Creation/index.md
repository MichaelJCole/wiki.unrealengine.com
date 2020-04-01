 Custom Blueprint Node Creation - Epic Wiki             

 

Custom Blueprint Node Creation
==============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Extending Classes](#Extending_Classes)
*   [3 Exposing functions to Blueprint](#Exposing_functions_to_Blueprint)
*   [4 Function code](#Function_code)
    *   [4.1 CompactNodeTitle](#CompactNodeTitle)
*   [5 Things to look into](#Things_to_look_into)

Overview
========

This tutorial will cover how to make a custom blueprint node that you can use to introduce cool C++ powers into your blueprints. This tutorial is rather basic for now, since I've not done much with the code, so there could be steps I'm missing here for handling special programming concepts such as iterators or delegates.

Extending Classes
=================

You can choose which class to extend by using the "Add code to project" option from the File menu and then choosing the class to extend from. This creates a new class with the functionality of the class you extended from (the parent) as well as any functionality you give it in code.

Exposing functions to Blueprint
===============================

To do this you must use Function Specifiers, of which there are a couple:

*   BlueprintAuthorityOnly
*   BlueprintCallable
*   BlueprintCosmetic
*   BlueprintImplementableEvent
*   BlueprintNativeEvent
*   BlueprintPure

Of these I've only used BlueprintPure and BlueprintCallable. The former (BlueprintPure) means the function does not affect the owning object in any way and thus creates a node without Exec pins. The latter (BlueprintCallable) makes a function which can be executed in Blueprints - Thus it has Exec pins.

You can also have metadata about the node, like so:

<syntaxhighlight lang="Cpp"> UFUNCTION(BlueprintPure, meta = (DisplayName = "Create Object From Class", CompactNodeTitle = "New", Keywords = "new create blueprint"), Category = Game) </syntaxhighlight>

*   DisplayName is the full name of the node, shown when you mouse over the node and in the blueprint drop down menu. Its lets you name the node using characters not allowed in C++ function names.
*   CompactNodeTitle is the word(s) that appear on the node, such as "New" in the image above. Note that the use of a CompactNodeTitle will cause the parameters to show in the BP node without names. Omit the CompactNodeTitle if having the param names next to the wire connections is important for your node.
*   Keywords is the list of keywords that helps you to find node when you search for it using Blueprint drop-down menu. Good example is "Print String" node which you can find also by using keyword "log".
*   Category is the category your node will be under in the Blueprint drop-down menu.

If you leave out the "Static" prefix you'll likely get an error which reads "Pin Target must have a connection" error:

[![BlueprintNode-Custom-TargetPin-Error.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a7/BlueprintNode-Custom-TargetPin-Error.jpg)](/index.php?title=File:BlueprintNode-Custom-TargetPin-Error.jpg)  

Just as a note, if you have the static prefix and still get this issue, try adding "HidePin = "WorldContextObject", DefaultToSelf = "WorldContextObject"," inside your meta=( in UFUNCTION like so:

<syntaxhighlight lang="Cpp"> UFUNCTION(BlueprintPure, meta = (HidePin = "WorldContextObject", DefaultToSelf = "WorldContextObject", DisplayName = "Create Object From Class",

CompactNodeTitle = "New", Keywords = "new create blueprint"), Category = Game)

</syntaxhighlight>

The error seems to (it comes and goes from what I've seen of it) relate to Self being the actual Blueprint graph, and so it returns the class of the blueprint. However the function is declared in a class that's under a static object - hence it doesn't match its own type. This line hides the target pin and sets the nodes Self to WorldContextObject. For clarity see the above image.

Function code
=============

Nothing special - just code as normal:

<syntaxhighlight lang="Cpp"> (.h File) UFUNCTION(BlueprintPure, meta = (DisplayName = "Hello World", CompactNodeTitle = "HelloWorld", Keywords = "String Hello World"), Category = Game) static FText HelloWorld();

(.cpp file) FText UCreateNewObject::HelloWorld() { return FText::FromString("Hello World"); } </syntaxhighlight>

[![HelloWorld CustomNode.png](https://d26ilriwvtzlb.cloudfront.net/f/f3/HelloWorld_CustomNode.png)](/index.php?title=File:HelloWorld_CustomNode.png)  

Having parameters are the same as well: <syntaxhighlight lang="Cpp"> (.h File) UFUNCTION(BlueprintPure, meta = (DisplayName = "Adds floats", CompactNodeTitle = "Add Floats", Keywords = "Float Add"), Category = Game) static float AddFloats(float fA, float fB);

(.cpp File) float UCreateNewObject::AddFloats(float fA, float fB) { return fA + fB; } </syntaxhighlight>

[![AddFloats CustomNode.png](https://d26ilriwvtzlb.cloudfront.net/2/2c/AddFloats_CustomNode.png)](/index.php?title=File:AddFloats_CustomNode.png)  

Note that you might not find your node with "Context Sensitive" ticked.

CompactNodeTitle
----------------

If you give a compact node title in the UFUNCTION then the node will not have a header, while if you do give it a CompactNodeTitle it will. You can see the visual difference in the image below. The top node has CompactNodeTitle while the bottom node does not:

[![CompactvsNonCompactNodeTitle 1.jpg](https://d26ilriwvtzlb.cloudfront.net/8/83/CompactvsNonCompactNodeTitle_1.jpg)](/index.php?title=File:CompactvsNonCompactNodeTitle_1.jpg)  

Things to look into
===================

These are just somethings I don't know, and think would be good to know - A bit like "things to try by playing around with this tutorial":

*   What sets Context Sensitive?
*   Check out the enums in ...\\Engine\\Source\\Runtime\\CoreUObject\\Public\\UObject\\ObjectBase.h to see more about the various UE macro options

\- [G-Rath](/index.php?title=User:G-Rath&action=edit&redlink=1 "User:G-Rath (page does not exist)") ([talk](/index.php?title=User_talk:G-Rath&action=edit&redlink=1 "User talk:G-Rath (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Custom\_Blueprint\_Node\_Creation&oldid=209](https://wiki.unrealengine.com/index.php?title=Custom_Blueprint_Node_Creation&oldid=209)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Blueprint](/index.php?title=Category:Blueprint "Category:Blueprint")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")