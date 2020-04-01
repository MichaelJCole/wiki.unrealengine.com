Basic Blueprint Networking (Unreal Tournament) - Epic Wiki                    

Basic Blueprint Networking (Unreal Tournament)
==============================================

Contents
--------

*   [1 Introduction](#Introduction)
    *   [1.1 What we want to do.](#What_we_want_to_do.)
    *   [1.2 Initial Set-up](#Initial_Set-up)
    *   [1.3 Authoritative Server](#Authoritative_Server)
    *   [1.4 Variable Replication vs Function Replication](#Variable_Replication_vs_Function_Replication)
    *   [1.5 Blueprint settings](#Blueprint_settings)
    *   [1.6 Network testing via the editor](#Network_testing_via_the_editor)

Introduction
============

This tutorial will guide you though the basics of networking with blueprint, this is aimed at Level Designers working on Unreal Tournament.

Firstly check out [these videos.](https://www.unrealengine.com/blog/blueprint-networking-tutorials) They outline more or less everything you need to know about networking with blueprint. This example is meant to rephrase a lot of that information to make it more pertinent. For this I'm assuming you have a rudimentary understanding of blueprint and know how to put together some simple systems.

What we want to do.
-------------------

In this example we're going to put together the following;

> **A door that can only be opened by the RED TEAM, and only closed by the BLUE TEAM. The door is triggered by entering a region in front of the door.**

Initial Set-up
--------------

We need a door mesh, an open location, and something to trigger it along with a timeline node to open and close the door. None of this requires a different approach than standard single player BP. However how you trigger the door opening is very different. For one we need to check the actor triggering the overlap is a UTcharacter, then get it's team. For this I used an OnComponentBeginOverlap event from a BoxComponent. This not only triggers when an actor overlaps with the BoxComponent, but also provides a reference to the actor that did.

[![](https://d26ilriwvtzlb.cloudfront.net/4/49/UT_BP_NetworkingTut1.jpg)](/File:UT_BP_NetworkingTut1.jpg)

Acting on trigger.

From this I call the custom function GetTeamNumber, a simple function casts the actor to UTcharacter and returns the team number if it finds one. I only really do this in a separate function for tidiness. Something to note here is the return value of the GetTeamNum function call. It returns a Byte which relates to the gametype Teams entry, by convention 0 is red, 1 is blue, and 255 is no team.

[![](https://d26ilriwvtzlb.cloudfront.net/f/f9/UT_BP_NetworkingTut2.jpg)](/File:UT_BP_NetworkingTut2.jpg)

Get Team Number Method.

The next step is to branch on if the team received equals 0 (so if team received is red) if True then open the door, if False then close the door.

[![](https://d26ilriwvtzlb.cloudfront.net/7/7a/UT_BP_NetworkingTut3.jpg)](/File:UT_BP_NetworkingTut3.jpg)

Branching on team number.

[![](https://d26ilriwvtzlb.cloudfront.net/5/52/UT_BP_NetworkingTut4.jpg)](/File:UT_BP_NetworkingTut4.jpg)

Opening or closing the door via timeline and vector LERP.

Authoritative Server
--------------------

The above works in single player. What we're missing is any form of replication; the sharing of information from the server to the clients so that they're all in sync with each other, and the sever.

What's important to know here is that, in essence, you are always connected to a server, even if you don't think you are. There are two kinds of servers, listen, and dedicated. Listen servers run alongside a game client, while dedicated servers don't have an associated client. When you host a multiplayer game locally, or test your map in the editor you are in effect running a listen server; your game process is busily running the server along with your client copy.

The server can and should be used as the authority on gameplay states and events, like our door. It controls when the door opens and closes and make sure all the clients know about it. This makes sense not only because the server is directly connected to all the other clients in the game, but also because no client can overrule the server, avoiding any attempts to cheat the system.

The Switch Has Authority node allows you to define different behaviour on the device that has authority (almost \[i\]almost\[/i\] always the server) than those who are remote (clients). You want to prefix anything you want to run only on the server with one of these nodes. This includes any function that might be called during the process chain. It's a good idea to gate these functions with an authority check encase they get called from somewhere else, or by someone else.

Also note that the server will run all blueprint not specifically prefixed by remote. Here the Switch Has Authority node doesn't specify "run the following on the server", it means "if you are the authority, run this; if not, go away".

[![](https://d26ilriwvtzlb.cloudfront.net/9/96/UT_BP_NetworkingTut5.jpg)](/File:UT_BP_NetworkingTut5.jpg)

Adding Switch Has Authority.

Variable Replication vs Function Replication
--------------------------------------------

Blueprint comes with two types of replication; variable, and function. Which you use depends on what you are replicating. More or less anything that has a state (open or closed for example) should be handled by a replicated variable. Anything that is independent of state can be handled by a replicated function. Why does this matter? For us it's all about when players join the game. With our door example when a new player enters the game the client needs to be able to check the state of the door with the server, and replicate it. If we were to use a function we would only receive updates while we were connected to the server; if you joined the server when the door was open you would see it as closed until it closes and opens again.

There's an awful lot more the in videos about this on the subject of network relevancy especially how to properly do Function Replication; however the most important part to remember is that the state of an object needs to be replicated, and the easiest way to do this is a variable. This can be counter intuitive since it's not necessary when dealing with single player environments.

For our example I created the bool variable DoorOpen and set it's replication setting to RepNotify. This will automatically create a function inside this blueprint called On Rep Door Open. This function is called every time the blueprint receives an update on that variable's state. So if we set it to True, all clients will receive that update AND run that function. This is especially useful as we don't need to keep checking the variable to see if it's updated.

[![](https://d26ilriwvtzlb.cloudfront.net/c/cb/UT_BP_NetworkingTut6.jpg)](/File:UT_BP_NetworkingTut6.jpg)

Variable options.

Here instead of telling the door to open and close, we simply set our door state on the server. As stated above since this variable is set to RepNotify it will call On Rep Door Open on every client, as well as the server. This function looks at the current state and opens / closes the door depending. Because we use a timeline to move the door we have to use the custom events Open Door and Close Door.

[![](https://d26ilriwvtzlb.cloudfront.net/8/8f/UT_BP_NetworkingTut7.jpg)](/File:UT_BP_NetworkingTut7.jpg)

Setting Door open when the server allows it.

[![](https://d26ilriwvtzlb.cloudfront.net/b/b9/UT_BP_NetworkingTut8.jpg)](/File:UT_BP_NetworkingTut8.jpg)

Responding to the state change of Door Open.

[![](https://d26ilriwvtzlb.cloudfront.net/f/fe/UT_BP_NetworkingTut10.jpg)](/File:UT_BP_NetworkingTut10.jpg)

Custom events updating due to change in state, authorised by server.

This bit can be a little tricky to get your head around if you've never done it before. The important thing to remember here is that it's the server that decides what state the door is in, then tells the clients, and itself what to do.

Blueprint settings
------------------

This has it's own section because it's very easy to overlook, and if you don't do it nothing will work. Make sure, on any blueprint that you want to replicate in any way shape or form, that the Replicates tickbox under Replication in the blueprint defaults is ticked. Without this the engine won't even attempt to replicate anything.

[![](https://d26ilriwvtzlb.cloudfront.net/8/8c/UT_BP_NetworkingTut11.jpg)](/File:UT_BP_NetworkingTut11.jpg)

The very important blueprint setting that you will forget at least once and kick yourself.

Network testing via the editor
------------------------------

The editor is capable of creating both temporary listen and dedicated servers for testing. Under the Play dropdown menu simply increase the number of clients under Network settings. You can also tick Dedicated server. I would advise using standalone windows rather than the main viewport. It makes it easier to tell which window is which.

[![](https://d26ilriwvtzlb.cloudfront.net/c/c6/UT_BP_NetworkingTut12.jpg)](/File:UT_BP_NetworkingTut12.jpg)

Play menu options.

[![](https://d26ilriwvtzlb.cloudfront.net/6/68/UT_BP_NetworkingTut13.jpg)](/File:UT_BP_NetworkingTut13.jpg)

Server and client windows.

I hope that this is useful to people, I also hope that I didn't get too much wrong. If you see something missing or obviously wrong please let me know and I'll update it.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Basic\_Blueprint\_Networking\_(Unreal\_Tournament)&oldid=11587](https://wiki.unrealengine.com/index.php?title=Basic_Blueprint_Networking_(Unreal_Tournament)&oldid=11587)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)