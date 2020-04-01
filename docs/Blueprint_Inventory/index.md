Blueprint Inventory - Epic Wiki                    

Blueprint Inventory
===================

**Rate this Page:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (2 votes)

Approved for Versions:4.10.0

Contents
--------

*   [1 Blueprint Inventory](#Blueprint_Inventory)
    *   [1.1 BaseItem](#BaseItem)
    *   [1.2 InventorySlot](#InventorySlot)
    *   [1.3 BaseInventory](#BaseInventory)
    *   [1.4 Macros](#Macros)
    *   [1.5 Functions](#Functions)
*   [2 Pick-up Functionality](#Pick-up_Functionality)
    *   [2.1 BaseItem](#BaseItem_2)
    *   [2.2 Your Character](#Your_Character)
    *   [2.3 Testing](#Testing)

Blueprint Inventory
-------------------

This wiki page will teach you how to make a simple inventory system. I based my initial work off the forum post found [here](https://forums.unrealengine.com/showthread.php?4011-Basic-Item-System-with-stacking-functionality-Please-Critique!). The core features of this system are:

*   Extendible BaseInventory class
    *   Inventory weight and max slot size
*   Extendible BaseItem class
    *   Item weight
    *   Stackable (optional)
*   Structures for inventory slots

### BaseItem

Create an Actor Blueprint and give it a name of BaseItem (or something else if you want).

Add a sphere collision component and rename it to PickUpRadius:

[![](https://d3ar1piqh1oeli.cloudfront.net/4/48/BluePrintInventory_ItemSphere.png/275px-BluePrintInventory_ItemSphere.png)](/File:BluePrintInventory_ItemSphere.png)

[![](/skins/common/images/magnify-clip.png)](/File:BluePrintInventory_ItemSphere.png "Enlarge")

SphereCollision settings

Add a static mesh component and rename it to ItemMesh:

[![](https://d3ar1piqh1oeli.cloudfront.net/9/95/BlueprintInventory_ItemMesh.png/275px-BlueprintInventory_ItemMesh.png)](/File:BlueprintInventory_ItemMesh.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_ItemMesh.png "Enlarge")

StaticMesh settings

Create the following variables:

[![](https://d3ar1piqh1oeli.cloudfront.net/9/9b/BlueprintInventory_ItemVariables.png/466px-BlueprintInventory_ItemVariables.png)](/File:BlueprintInventory_ItemVariables.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_ItemVariables.png "Enlarge")

BaseItem variables

### InventorySlot

Create a Structure Blueprint, name it InventorySlot and add the following two variables:

[![](https://d3ar1piqh1oeli.cloudfront.net/2/2c/BlueprintInventory_Slot.png/643px-BlueprintInventory_Slot.png)](/File:BlueprintInventory_Slot.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_Slot.png "Enlarge")

InventorySlot structure

### BaseInventory

Create an Actor Blueprint and give it a name. We will use BaseInventory. Add a StaticMesh component and make it the root component.

Add the following variables:

[![](https://d3ar1piqh1oeli.cloudfront.net/4/48/BlueprintInventory_InventoryVariables.png/732px-BlueprintInventory_InventoryVariables.png)](/File:BlueprintInventory_InventoryVariables.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_InventoryVariables.png "Enlarge")

BaseInventory variables

### Macros

[![](https://d3ar1piqh1oeli.cloudfront.net/2/2b/BlueprintInventory_CanItStack.png/799px-BlueprintInventory_CanItStack.png)](/File:BlueprintInventory_CanItStack.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_CanItStack.png "Enlarge")

CanItStack

[![](https://d3ar1piqh1oeli.cloudfront.net/9/9c/BlueprintInventory_CurrentWeight.png/799px-BlueprintInventory_CurrentWeight.png)](/File:BlueprintInventory_CurrentWeight.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_CurrentWeight.png "Enlarge")

CurrentWeight

[![](https://d3ar1piqh1oeli.cloudfront.net/c/c3/BlueprintInventory_HasInventorySpace.png/800px-BlueprintInventory_HasInventorySpace.png)](/File:BlueprintInventory_HasInventorySpace.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_HasInventorySpace.png "Enlarge")

HasInventorySpace

[![](https://d3ar1piqh1oeli.cloudfront.net/2/20/BlueprintInventory_HasPartialStack.png/800px-BlueprintInventory_HasPartialStack.png)](/File:BlueprintInventory_HasPartialStack.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_HasPartialStack.png "Enlarge")

HasPartialStack

### Functions

[![](https://d3ar1piqh1oeli.cloudfront.net/9/92/BlueprintInventory_AddItemToInventory.png/800px-BlueprintInventory_AddItemToInventory.png)](/File:BlueprintInventory_AddItemToInventory.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_AddItemToInventory.png "Enlarge")

AddItemToInventory

Pick-up Functionality
---------------------

### BaseItem

[![](https://d3ar1piqh1oeli.cloudfront.net/9/9c/BlueprintInventory_SphereCollisionEvent.png/800px-BlueprintInventory_SphereCollisionEvent.png)](/File:BlueprintInventory_SphereCollisionEvent.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_SphereCollisionEvent.png "Enlarge")

SphereCollisionEvent

### Your Character

On your character blueprint, add the following variable so that the character has an inventory we can reference.

[![](https://d26ilriwvtzlb.cloudfront.net/0/03/BlueprintInventory_CharacterInventory.png)](/File:BlueprintInventory_CharacterInventory.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_CharacterInventory.png "Enlarge")

CharacterInventory

Then, spawn an instance of BaseInventory (preferably on BeginPlay) and assign it to the variable we created above.

[![](https://d26ilriwvtzlb.cloudfront.net/5/54/BlueprintInventory_InventorySpawn.png)](/File:BlueprintInventory_InventorySpawn.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_InventorySpawn.png "Enlarge")

InventorySpawn

### Testing

Place a BaseItem inside your level, and press play. When you walk over the item, you should see a printed message:

[![](https://d3ar1piqh1oeli.cloudfront.net/8/8e/BlueprintInventory_ItemAdded.png/800px-BlueprintInventory_ItemAdded.png)](/File:BlueprintInventory_ItemAdded.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInventory_ItemAdded.png "Enlarge")

ItemAdded

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Inventory&oldid=16789](https://wiki.unrealengine.com/index.php?title=Blueprint_Inventory&oldid=16789)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)