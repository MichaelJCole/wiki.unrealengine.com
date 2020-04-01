Basic BLUEPRINT inventory - Epic Wiki                    

Basic BLUEPRINT inventory
=========================

Author's Note
=============

_**Disclaimer: This tutorial assumes some basic to intermediate knowledge about Blueprints. If you have problems following along, I recommend watching Epic's videos on the subject.**_

  
This tutorial is an adaptation from [G-Rath's](/User:G-Rath "User:G-Rath") and [alvarofer0020's](https://forums.unrealengine.com/member.php?2225-alvarofer0020) Inventory system for C++. I only looked at their works and made my own in pure blueprint, for those that don't know or don't want to use C++.

  

Introduction
============

In this tutorial I'll be going over the following:

*   Making the item class
*   Picking up and dropping items
*   Storing and retrieving the items in an inventory
*   Expansions and tips

The Item Class
==============

[![The Item class](https://d26ilriwvtzlb.cloudfront.net/1/14/Screenshot_2014-05-04_12.57.16.png)](/File:Screenshot_2014-05-04_12.57.16.png "The Item class") Create a class with Actor as a parent and name it Item.

  
The Item class will be the cornerstone in our system, as it is the class which will store all the information regarding our items. [![Adding Events](https://d26ilriwvtzlb.cloudfront.net/3/3f/BlueprintCreate.png)](/File:BlueprintCreate.png "Adding Events") Create the events Dropped and Picked Up

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Basic\_BLUEPRINT\_inventory&oldid=14317](https://wiki.unrealengine.com/index.php?title=Basic_BLUEPRINT_inventory&oldid=14317)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

  ![](https://tracking.unrealengine.com/track.png)