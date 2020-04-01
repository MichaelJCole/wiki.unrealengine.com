 Blueprint Multiplayer Respawn - Epic Wiki             

 

Blueprint Multiplayer Respawn
=============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

**Prerequisites** : Go through Epic's [Blueprint Networking](/index.php?title=Blueprint_Networking "Blueprint Networking") tutorial and have a properly [working Multiplayer ready Pawn](https://forums.unrealengine.com/showthread.php?2107-Come-Learn-Blueprint-Multiplayer-with-me!-(aka-Tom-s-a-Glutton-for-Punishment)&p=20372&viewfull=1#post20372).

**Skill Level**: Intermediate

**Engine Version**: 4.1.0

  
Before you start, make sure your pawn can fully function under dedicated server and client situation. Having a gamepad is highly recommended. Also, you will have to bind a action called "respawn" to any key/button you preferred.

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 Background Knowledge](#Background_Knowledge)
*   [3 Blueprint implementation](#Blueprint_implementation)
    *   [3.1 First, the custom GameMode to handle respawn:](#First.2C_the_custom_GameMode_to_handle_respawn:)
    *   [3.2 Second, the PlayerController:](#Second.2C_the_PlayerController:)
    *   [3.3 Third](#Third)

Introduction
------------

It took me to dig through source code to come up with this respawn method, which mimics how a proper client side requested respawn should work. The core idea of how it works requires that you understand how replication works, so PLEASE make sure you go through Epic's [Blueprint Networking](/index.php?title=Blueprint_Networking "Blueprint Networking") tutorial before you continue, otherwise you will be blindly follow my example and don't know how to change to fit your needs.

I also assume you already got a working Pawn that replicated and control properly, if you have any key/button inside your Pawn's blueprint, please make sure that it was replaced with a action/axis mapping in **Menu->Edit->Project Settings->Engine section->Input**.

This tutorial will not modify your Pawn blueprint, the only required blueprint to modify is a GameMode and a PlayerController blueprint. Also, I will not be covering how to select player start, you can refer to the thread linked in the Prerequisites and Tom provided a method as a starting point. For this tutorial, we will only need one PlayerStart and let the engine handle initial spawning.

Background Knowledge
--------------------

The PlayerController is default to not getting replicated, which is good as the only thing server requires to update all clients' Pawn is parameters(ie Force/Velocity/etc). But a client's PlayerController is indeed connected to server, and there is a server side counterpart that work as a remote control receiver, they are just not replicated to the rest of clients.

When a Pawn gets destroyed under GameMode condition, say health below zero, it is GameMode that destroys your Pawn on server, and then server replicate that event and request your client to also destroys your Pawn. When this happens, your server side controller gets detached from the Pawn pending destroy, so you lose possession of your Pawn BEFORE it gets destroyed and you see it disappear on client end. If you try to do the respawn from server side(which handled by GameMode) before client properly lose possession, some of the core class code might actually detach your controller again.

So the proper way to initiate respawn, is to

1.  make sure you check client side PlayerController already controls no Pawn
2.  then issue a event that calls server side PlayerController to make a request event to GameMode that handles respawn
3.  GameMode(only on server) will spawn the Pawn you want and possess it with your server side PlayerController.

You can certainly add more requirement like minimum spawn delay, or how many lives, etc to determine if a client can respawn or not. But here we just cover the bare minimum of the respawn process.

Blueprint implementation
------------------------

### First, the custom GameMode to handle respawn:

[![BP Respawn GameMode.png](https://d26ilriwvtzlb.cloudfront.net/2/2c/BP_Respawn_GameMode.png)](/index.php?title=File:BP_Respawn_GameMode.png)

1.  add a custom event by right click in empty space, then Add Event->Custom Events, I named it **respawn**
2.  make sure in detail tab, change replication settings to **Run On Server** and check **Reliable**
3.  add a new input and set the input type to **PlayerController**, do NOT use your custom player controller type( that ends with \_C )
4.  check if the controller is valid
5.  add a switch has authority to make sure it's server side\[Authority\]
6.  create a **Spawn Actor From Class** node.
7.  **IMPORTANT**, I know there is a function to get default pawn class, but it will cause compiler error the next time you open editor, I think it's a bug that should be fixed. But in the mean time, select it manually from the drop down menu and select your custom Pawn class.
8.  plug in a transform as you see fit
9.  check spawned Pawn is valid
10.  call Possess by dragging pin from the our event's input parameter(a PlayerController), and then plug spawned object to the InPawn pin.
11.  now your GameMode setup is complete.

  

### Second, the PlayerController:

[![BP Respawn PlayerController.png](https://d26ilriwvtzlb.cloudfront.net/f/fb/BP_Respawn_PlayerController.png)](/index.php?title=File:BP_Respawn_PlayerController.png)

1.  add the respawn input event you bind in your project settings
2.  add a custom event by right click in empty space, then Add Event->Custom Events
3.  name your custom event, in my case **requestGMRespawn**
4.  make sure you also in the detail tab, change replication settngs to **Run On Server** and check **Reliable**
5.  back to our input event, add a switch has authority to make sure this is a client side\[Remote\] event
6.  add a isValid from getControlledPawn to make sure your controller already controls nothing.
7.  and if we controls nothing, call the custom event we just made by right click empty space and at the bottom of **Call Functions** should see your event.
8.  Now client side is done. Back to our **requestGMRespawn** event node( the Red one )
9.  add switch has authority to make sure it's server side\[Authority\]
10.  get GameMode and use isValid to check
11.  cast the GameMode to your custom one.
12.  and use self and cast to base PlayerController object
13.  drag on GameMode pin on your CastTo node(should say As \[your\_game\_mode\_name\]\_C), and in context menu you should be able to see server side respawn event you created in your GameMode blueprint.
14.  link the PlayerController object you just casted to your GameMode's respawn event input.
15.  now your PlayerController setup is also done.

  

### Third

1.  launch your game
2.  make your pawn die
3.  hit the action button you assigned to request respawn
4.  and dancing like a little kid because you just got your respawn setup completed. :D

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Multiplayer\_Respawn&oldid=381](https://wiki.unrealengine.com/index.php?title=Blueprint_Multiplayer_Respawn&oldid=381)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Blueprint](/index.php?title=Category:Blueprint "Category:Blueprint")