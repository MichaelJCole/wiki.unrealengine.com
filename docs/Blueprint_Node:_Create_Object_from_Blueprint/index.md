Blueprint Node: Create Object from Blueprint - Epic Wiki                    

Blueprint Node: Create Object from Blueprint
============================================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.8

Contents
--------

*   [1 Overview](#Overview)
*   [2 Note: Using 4.9+](#Note:_Using_4.9.2B)
*   [3 The Code](#The_Code)
*   [4 Result in editor](#Result_in_editor)

Overview
========

This snippet shows you how to make a custom blueprint node that instantiates an object from a blueprint (that extends Object). It was created with assistance from MonsOlympus.

Being able to instantiate an object class from Blueprints like this is useful as objects provide a nice way to store data without any having any of the overhead that actor classes create.

This snippet won't go into major detail, as you should [read this tutorial](/Custom_Blueprint_Node_Creation "Custom Blueprint Node Creation") first - It explains how to create your own custom nodes, and the features available (and what they do). - [G-Rath](/User:G-Rath "User:G-Rath") ([talk](/User_talk:G-Rath "User talk:G-Rath"))

I have updated this tutorial to work for 4.8, as well as added a note about using 4.9. - [joshcamas](/index.php?title=User:Joshcamas&action=edit&redlink=1 "User:Joshcamas (page does not exist)") ([talk](/index.php?title=User_talk:Joshcamas&action=edit&redlink=1 "User talk:Joshcamas (page does not exist)"))

Note: Using 4.9+
================

In 4.9, Epic has added a blueprint node to do just this. It's called "Construct Object from class", and it's pretty useful. If your wanting to know how to create objects within c++, or interact c++ and blueprints, this tutorial is still useful: however if you want to create an object from blueprint, I advise you use the new built in blueprint function. Good luck!

The Code
========

[![CustBluePNode CreateObject.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c3/CustBluePNode_CreateObject.jpg)](/File:CustBluePNode_CreateObject.jpg)  

  
(Note that the "HyperPro.h" should be replaced with your project name) CPP file:

//Copyleft under the creative commons license
//For details see http://creativecommons.org/licenses/by-sa/4.0/
 
#include "HyperPro.h"
#include "CreateNewObject.h"
 
 
UObject\* UCreateNewObject::NewObjectFromBlueprint(UObject\* WorldContextObject, UClass\* UC)
{
	UWorld\* World \= GEngine\-\>GetWorldFromContextObject(WorldContextObject);
	UObject\* tempObject \= NewObject<UObject\>(UC);
 
	return tempObject;
}

Header file (.h):

//Copyleft under the creative commons license
//For details see http://creativecommons.org/licenses/by-sa/4.0/
 
#pragma once
 
#include "Kismet/BlueprintFunctionLibrary.h"
#include "CreateNewObject.generated.h"
 
UCLASS()
class UCreateNewObject : public UBlueprintFunctionLibrary
{
	GENERATED\_BODY()
 
	UFUNCTION(BlueprintPure, meta \= (HidePin \= "WorldContextObject", DefaultToSelf \= "WorldContextObject", DisplayName \= "Create Object From Blueprint", CompactNodeTitle \= "Create", Keywords \= "new create blueprint"), Category \= Game)
	static UObject\* NewObjectFromBlueprint(UObject\* WorldContextObject, UClass\* UC);
};

Result in editor
================

Using a Blueprint extending object named "TestObject":

[![CustBluePNode CreateObject Layout.jpg](https://d26ilriwvtzlb.cloudfront.net/0/0d/CustBluePNode_CreateObject_Layout.jpg)](/File:CustBluePNode_CreateObject_Layout.jpg)  

[![CustBluePNode CreateObject Testing.jpg](https://d26ilriwvtzlb.cloudfront.net/9/91/CustBluePNode_CreateObject_Testing.jpg)](/File:CustBluePNode_CreateObject_Testing.jpg)  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Node:\_Create\_Object\_from\_Blueprint&oldid=15394](https://wiki.unrealengine.com/index.php?title=Blueprint_Node:_Create_Object_from_Blueprint&oldid=15394)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)