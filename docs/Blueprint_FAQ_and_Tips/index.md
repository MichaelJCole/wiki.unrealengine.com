Blueprint FAQ and Tips - Epic Wiki                    

Blueprint FAQ and Tips
======================

Blueprints vs C++
-----------------

**Q: Why is it that a game created almost entirely with blueprints has worse performance than a game programmed primarily in C++? What is causing that?**

A: The difference between Blueprints and C++ is mainly that Blueprints run in what's called a virtual machine, which is actually an abstraction that means that instead of compiling down to machine code (assembly) directly, it compiles down to an intermediate form, which is then translated to whichever machine it's running on. For instance, we use the same generated blueprint code under the hood whether you're on PC, Mac, Linux, PS4, or whatever. That then gets translated down to the native machine code that runs on each device.

This has a few advantages:

\- You don't have to have a C++ compiler at everyone's desk

\- You don't have to quit out and reload every time you make a change, like you would with C++

\- You can make the script more forgiving. Things like 'Access None's, 'Array Out-of-Bounds' errors, runaway loops, etc can be caught and handled as a pop up instead of a crash.

As for speed, it's no slower than UnrealScript was. In practice, BP code is about 10 - 15x slower than C++. Those above advantages aren't free :) In most cases, this is totally fine, because BPs usually handle events (e.g. something happened, and now I need to do something in reaction to that), rather than batch processing large amounts of data. Blueprints call native C++ functions, so the overhead is almost entirely in what we call VM overhead. It's not the nodes that are expensive, per se, it's the calling of the nodes that is slow. That's why if you have something that has to operate on 1000 things in a loop, we would probably make that loop internal to a C++ function instead of doing the operation in Blueprints. The operation isn't expensive, it's the calling it 1000 times that's expensive.

  
**Q: What are some good examples of game mechanics that should be coded instead of blueprinted?**

A: I would argue that any game mechanic could be done either way! It depends entirely on the makeup of the team, and if they're more programmer heavy or designer heavy. We like to think of Blueprints as democratizing game development.

In general, there's no gameplay system that couldn't be made in Blueprints. Our general recommendations are:

\- If you're programmer heavy, then have your gameplay programmers focus on making good base systems for your gameplay features. For instance, they could make a native C++ base weapon class, that handles things like Firing, replication, etc, and then exposes hooks for designers to extend and modify (e.g. editing damage curves, firing timings, etc). This way, the programmers are making a "gameplay api" that's exposed to designers.

\- If you're designer heavy, then let the designers prototype everything, and then things that are complicated (e.g. lots of nodes) that could be done in a few lines of code can be moved to native, and turned into a single node. This approach makes the programmers more optimizers. As I said, there's really not anything that you can't do in blueprints, and if there is, it can likely be exposed by a programmer in a few lines of code. Any C++ UFunction can be exposed as a blueprint node with a single keyword.

  

General Blueprint Questions
---------------------------

**Q: Due to casting, are there any tangible benefits to interfaces or is it better to rely on casting for inter-blueprint interaction?**

A: Yes, interfaces are good for when you want to have many different kinds of things react to the same function call, but you don't want them to all inherit from the same class.

A good example is a "use" system, where whatever the player is looking at could potentially be used by pressing a key. The interface could have two members, CanBeUsed and OnUse. The Player could then do a trace, and then if there was an object in range, it could use the CanBeUsed interface message to see if whatever he's pointing at can be used. If that returns true, then you'd call OnUse.

That way, any blueprint can then implement that interface, and automatically be part of that Use system. Enemies, teapots, dogs, whatever. If you were to use casts, you'd have to make cast cases for every new item you added in the Player, and that'd get messy real quick.

  
**Q: Can you explain the general use of Game Mode vs Game State? What should each be responsible for, especially in Multiplayer games? Same with Player Controller vs Player State. The common answer is that 'Controller should handle input', but that causes problems in Multiplayer.**

A: Game Mode defines the _rules_ and _logic_ for the game, and Game State acts like the scoreboard. So, if you took football as an example, GameMode would have functions for ScoredTouchdown, which would handle kicking off a victory dance, figuring out how many points to award, set up the choice for going for the extra point, and then it would write 6 points to the _GameState_. The GameState is replicated to all clients, so they can see any data that's hanging on it. But, all clients don't need to understand the rules; which is why the GameMode is only the server.

PlayerController is similar, in that it defines the rules for the player, and Player State records things that all players need to know about the player (score, name, etc). The setting of those variables, and what happens when, and the routing of the input is done in the player controller, and then the results are passed to the PlayerState.

The reason for this is that replication is expensive and complicated to think about, so the \*State actors were intended to be lightweight places that stored information that is available to all clients on the server, where as the rules for how that's set up and calculated on the server side live on the PlayerController and GameMode.

  
**Q: What are some "best practices" for programmers to use when creating code classes that will be used to create Blueprints?**

A: - Only expose the functions that Blueprint users need. If you expose too much, you bloat the menu, and it makes it harder to find what you want. - Don't assume that blueprint users are programmers! Simplify the events and functions that you expose to minimize parameters, so only the essential information is passed around - Use proper documentation on your function and parameters, because those will be turned into tool tips - Make an API for your Blueprint users. Handle the complexities of logic, flow, state mutation, and prerequisite calls under the hood, and then expose hooks to Blueprints. The user shouldn't have to worry about things like calling Parent functions in order to ensure proper functionality. - Keep it simple! Let the Blueprint users try to do everything they need, and only add more functionality if it a) adds efficiency, or b) gives them access to something new.

  
**Q: What is the best way to communicate data between Blueprints and pure code classes (no Blueprints derived from the class)?**

Usually, we do this through UBlueprintFunctionLibraries. See UHeadMountedDisplayFunctionLibrary for an example. That handles communicating to VR devices, which don't really have any blueprints associated with them.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_FAQ\_and\_Tips&oldid=10266](https://wiki.unrealengine.com/index.php?title=Blueprint_FAQ_and_Tips&oldid=10266)"

[Category](/Special:Categories "Special:Categories"):

*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)