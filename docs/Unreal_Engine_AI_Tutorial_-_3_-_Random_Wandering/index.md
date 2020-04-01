 Unreal Engine AI Tutorial - 3 - Random Wandering - Epic Wiki             

 

Unreal Engine AI Tutorial - 3 - Random Wandering
================================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Authored by: Mieszko Zielinski

  
This tutorial is done purely in data and can easily be pulled of in vanilla UE4 4.3.

  

Behavior Trees!
---------------

It's high time I've started talking about behavior trees :D I'll try to keep it as simple as I can this time, but there's a fair amount of things to cover regardless.

Behavior Trees, as an AI technique, have been around for many years already. Just google "behavior trees" and you'll see how much have been said about them. So I won't waste time repeating all that :D

One of the things that distinguish UE4 implementation is that it has built-in support for being fully event driven, which means you can create a BT that will not require any ticking and will only change it's state in response to external events, like an AI reaching the end of a path or changes to an AI's world knowledge (via blackboard). More on event-driven BTs in future tutorials, now let's focus on a basic case.

  

Blackboard
----------

UE4 AI uses Blackboards (BBs for short) to store AI's world knowledge. Among many benefits of blackboards, like having every AI its own view of the world, this gives us an opportunity to easily observe AI's world knowledge changes. It's also very easy to get data from a BB in a generic fashion.

Lets start by creating a new Blackboard asset. You can create one by right clicking in the content browser, it's under Miscellaneous category.

A new BB is empty and we need to define key-value pairs we want this BB type to store. Every entry in a BB consists of a string "key" and a value of a specified type. Play around with BB editor to to see all the supported types.

For the purposes of this tutorial we need to create just one entry, to store the actor we'll want AI to go to. Once done it should look like this in the editor:

[![T03 BBKey.png](https://d26ilriwvtzlb.cloudfront.net/c/c6/T03_BBKey.png)](/index.php?title=File:T03_BBKey.png)

  

Finding where to go with a custom BT task
-----------------------------------------

To have AI move somewhere we need to find that "somewhere" first. One of the ways of doing that is having a behavior tree task that will search for "somewhere" and store it in the BB for later use by other BT tasks. We're going to do just that. And we're going to do that in blueprint! Because why not? And it's fun! :D

In content browser create a Blueprint derived from `BTTask_BlueprintBase`. This is a special class that hosts BP API for BT tasks. Let's name it BTTask\_FindWanderPoint.

We just need a task that will look through all interesting actors in the world (I used Note actors for this purpose), pick one and store it somewhere. Let's make the task store data in AI's blackboard.

Getting all actors of selected class in BP is super easy. Just do something like this:

[![T03 GetAllNotes.png](https://d26ilriwvtzlb.cloudfront.net/2/21/T03_GetAllNotes.png)](/index.php?title=File:T03_GetAllNotes.png)

TempActor is a variable declared in the BP itself and after executing this bit of BP TempActor contains a random Note actor from the world.

  

Implementing actual task
------------------------

What we want here is an "instant" task, which means it executes and finishes in "one go", without spreading actions or calculations over multiple frames.

A blueprint-implemented instant task has to do two things:

*   implement `EventReceiveExecute` - this will get called when a task gets picked for execution.
    *   `OwnerActor` parameter is the actor BT is running for. In our case it will always be an `AIController`
*   make sure all possible code paths finish with `FinishExecute` call - calling this function lets the BT know given task has finished its work. If you don't call it the BT will assume it's a latent task and will continue running it in future frames, until a FinishExecute call is made.
    *   `Success` parameter let's BT know if give task's execution was successful or not

One more thing we want the BTTask\_FindWanderPoint to do is to store its findings in the AI's blackboard. To do that we need to add a public variable that will indicate a BB key being the destination of calculated information. You do that by adding a variable of type `BlackboardKeySelector` to BTTask\_FindWanderPoint's blueprint (I've called it `Put Result To`) and using it to set a value in an AI's blackboard, like so:

[![T03 SetBBValue.png](https://d26ilriwvtzlb.cloudfront.net/9/9b/T03_SetBBValue.png)](/index.php?title=File:T03_SetBBValue.png)

  

Perform the actual move
-----------------------

We've created a BB to store information and a task to supply a BB with data so all that's left to be done is to use that information. Let's create a Behavior Tree that will pick an interesting note actor and send AI there. It's as simple as this:

[![T03 BT.png](https://d26ilriwvtzlb.cloudfront.net/a/a3/T03_BT.png)](/index.php?title=File:T03_BT.png)

The meat of the tree is the node labeled "Sequence" and its goal is to do just that: execute tasks in a sequence. The first task to execute is our freshly implemented BTTask\_FindWanderPoint. It's supposed to pick a random Note actor and assign it as "GoalActor" blackboard key's value. The second task in the sequence is the engine-supplied `BTTask_MoveTo` that picks an `AActor` of an `FVector` from an indicated BB key and sends AI that way.

  

Run it!
-------

The [content](http://unreal-ai-tutorial.info/repo/AITutorial03_Wandering.zip) I've prepared for this tutorial contains a little map with four Note actors and an AI that is running between the note actors. Re-do it yourself or just grab the content package. Just remember, you need [the code](https://github.com/MieszkoZ/AITutorialCPP) from the previous tutorials, but only for the "jumping" part of the demo map. Everything else is doable in vanilla UE4!

Enjoy!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Unreal\_Engine\_AI\_Tutorial\_-\_3\_-\_Random\_Wandering&oldid=687](https://wiki.unrealengine.com/index.php?title=Unreal_Engine_AI_Tutorial_-_3_-_Random_Wandering&oldid=687)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")