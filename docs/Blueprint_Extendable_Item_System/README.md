Blueprint Extendable Item System - Epic Wiki                    

Blueprint Extendable Item System
================================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

Contents
--------

*   [1 **Extendable Item System in Blueprints**](#Extendable_Item_System_in_Blueprints)
    *   [1.1 Forward](#Forward)
        *   [1.1.1 Author's Note:](#Author.27s_Note:)
*   [2 Overview](#Overview)
*   [3 Starting out](#Starting_out)

**Extendable Item System in Blueprints**
----------------------------------------

![Note](https://d26ilriwvtzlb.cloudfront.net/b/b3/Icon_template_warning1.png) This tutorial is still under construction. Please check back later

### Forward

I would like to thank [Tom Looman](http://www.tomlooman.com/) and [alvarofer0020](https://forums.unrealengine.com/member.php?2225-alvarofer0020) for their wonderful item systems. You can find alvarofer0020's system [here](https://forums.unrealengine.com/showthread.php?3289-Tutorial-Basic-Inventory-Item-System), and Tom's [here](http://www.tomlooman.com/tutorial-usableactor-system-in-c/) and [here](http://www.tomlooman.com/tutorial-basic-inventory-system-in-blueprint/). They were a great help in developing my own.

  

However, one of the biggest challenges with either of their systems was that both of them relied upon C++ as an integral part. Another challenge was that alvarofer's system had no definition on what should happen when the item was dropped. For that matter, when it was picked up, it would destroy the mesh component which would cause issues when dropping it back into the world. And Tom's system relied upon creating two classes for each and every item. Not very easy to extend, right?

These issues are what this tutorial hopes to solve, by creating a system **entirely in blueprints** that is both **cohesive** and **extendable**.

#### Author's Note:

I am writing this in the style of a survival game. It may be a little confusing at times, but to alleviate that, I will format all **necessary instructions** in bold.

Example: "Done! Your chest is built. Now to add stuff to it. Create a new **Function** called **AddItem**.

\- [Axtel Sturnclaw](/index.php?title=User:Axtel_Sturnclaw&action=edit&redlink=1 "User:Axtel Sturnclaw (page does not exist)") ([talk](/index.php?title=User_talk:Axtel_Sturnclaw&action=edit&redlink=1 "User talk:Axtel Sturnclaw (page does not exist)"))

Overview
--------

In most big games today, there is some form of an item system at it's core. In a FPS? How do you think they manage per-weapon ammo? In a RPG? Should be self-explanatory. If you seriously don't know how RPGs use item systems, I fear for the safety of your gaming soul. Puzzle games? Depends on the game. The list goes on and on.

But we are not here to talk about the prominence of certain systems in game genres. If for some reason you are, please use the talk page or at least read the page title.

  

What we _are_ here for is to learn how to create an extensible item system, with your choice of two inventory systems. I will attempt to break down the necessary steps to create these systems into instructions understandable by all.

If I fail, feel free to rail on me and/or offer constructive criticism in the talk page.

  

But enough of that. Let's get started.

Starting out
------------

It's a new game. You just got dropped off in the wilderness with nothing but the clothes on your back and the knowledge in your head.

(If you have completed this step already, feel free to **Load a Saved Game** and skip to the next section.)

Let's lay the foundations. Create a **New Project** based on the **Blueprint First Person** template with **Starter Content** unchecked. Call it whatever you please. I chose to call mine **ItemSystem**.

[![New Project](https://d26ilriwvtzlb.cloudfront.net/b/b3/StartingOut_1.png)](/File:StartingOut_1.png "New Project")

  

Once that is complete, open **My Character** in the **Blueprints** folder of the **Content Browser**. We are going to create a interaction framework, which will be the basis for the item system's pick-up behavior.

[![Content Browser](https://d26ilriwvtzlb.cloudfront.net/7/74/StartingOut_2.png)](/File:StartingOut_2.png "Content Browser")

  

We create a **Single Line Trace by Channel** node from a input of your choice. We get the camera's **World Location** and **Forward Vector**, multiplying the **forward vector** by the **distance** (in this case 300 units or 3 meters) we want the trace to go. This limits how far away we can grab objects. We plug the camera's **world location** into the start position of the **line trace** node, and the **forward vector \* distance + world location** into the end node. You can optionally set the debug visibility to duration if you want.

[![Trace Graph](https://d26ilriwvtzlb.cloudfront.net/e/e0/StartingOut_3.png)](/File:StartingOut_3.png "Trace Graph")

  

[![Trace Test](https://d26ilriwvtzlb.cloudfront.net/f/fa/StartingOut_3_2.png)](/File:StartingOut_3_2.png "Trace Test")

  

Next, we will need to create a **Blueprint Interface**.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Extendable\_Item\_System&oldid=8228](https://wiki.unrealengine.com/index.php?title=Blueprint_Extendable_Item_System&oldid=8228)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)