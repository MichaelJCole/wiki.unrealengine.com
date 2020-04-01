 Exec Functions - Epic Wiki             

 

Exec Functions
==============

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 What Are They?](#What_Are_They.3F)
*   [3 What Classes Can Have Exec Functions?](#What_Classes_Can_Have_Exec_Functions.3F)
*   [4 How Do I Declare Them?](#How_Do_I_Declare_Them.3F)
*   [5 How Do I Get Other Classes to Support Exec Functions?](#How_Do_I_Get_Other_Classes_to_Support_Exec_Functions.3F)
*   [6 References](#References)

Overview
--------

Exec functions are pretty cool and super useful, especially in development. They let you call functions from the command line. The crappy part is they are poorly documented and have a lot of caveats and hidden functionality, so I wanted to make this page as a catching point until the exec documentation gets better.

What Are They?
--------------

So what are exec functions. Pretty much exec functions are a simple way to declare console accessible functions through the UFUNCTION macro system easily by just adding the "Exec" command. The console commands kind of cascade their way down through either the player controllers or viewport until they are handled at some point in the chain.

They're called simply from the console by pressing the ~ key on most keyboards and typing the name of your function with any arguments entered after.

What Classes Can Have Exec Functions?
-------------------------------------

Only some classes support Exec functions out of the box. Possessed Pawns, Player Controllers, Player Input, Cheat Managers, Game Modes, Game Instances, overriden Game Engine classes, and Huds should all work by just adding the standard UFUNCTION markup. Exec functions tend to cascade down to these classes through the player controller (Pawn/Player Controllers/Cheat Manager/etc.) or the game viewport (game instance/game mode/etc). If there is something amiss with either of those, you will probably run into issues with your exec functions running at all.

There are some other classes that are supported out of the box, but they're mostly other ways of getting to the above classes and are probably better to avoid if you don't know what you're doing.

As far as how to support classes that aren't supported out of the box, see the section below on how to support exec functions in classes that don't natively support them.

How Do I Declare Them?
----------------------

Declaring an exec function is super simple.

 `UFUNCTION(Exec)
   void YourExecFunction();` 

Called just by entering it in the command line like so:

[![ExecFuncNoArg.PNG](https://d26ilriwvtzlb.cloudfront.net/e/ed/ExecFuncNoArg.PNG)](/index.php?title=File:ExecFuncNoArg.PNG)

Adding arguments is also simple.

 `UFUNCTION(Exec)
   void YourExecFunction(int32 arg1, FString arg2);` 

With your arguments separated by spaces.

[![ExecFuncWithArgs.PNG](https://d26ilriwvtzlb.cloudfront.net/4/4a/ExecFuncWithArgs.PNG)](/index.php?title=File:ExecFuncWithArgs.PNG)

  

How Do I Get Other Classes to Support Exec Functions?
-----------------------------------------------------

So the main reason I wanted to write this up was because of this cool feature. It's possible to get Exec functions working on any UObject class you want. The only caveat is that you need to make sure an instance of that object is somehow accessible from one of the classes above. Preferably you'll want only one instance of that class to be accessible from above. I use this mostly just to keep classes from becoming overcrowded with exec functions that just pipe the call to a member anyway. It's really easy to fall into the trap of having one class be an exec function dumping ground for your whole game.

Anyway, how do you do it? This is actually also really simple. The unreal header tool does most of the footwork generating the Exec function's metadata already, so all you really need to do is forward the ProcessConsoleExec function from an Exec capable class to an instance of the class you want to call Exec functions on under it.

In the header:

 `virtual bool ProcessConsoleExec(const TCHAR* Cmd, FOutputDevice& Ar, UObject* Executor) override;` 

In the cpp:

 `bool YourExecCapableClass::ProcessConsoleExec(const TCHAR* Cmd, FOutputDevice& Ar, UObject* Executor)
   {
       bool handled = Super::ProcessConsoleExec(Cmd, Ar, Executor);
       if (!handled)
       {
               handled &= _yourNewExecInstance->ProcessConsoleExec(Cmd, Ar, Executor);
       }
       return handled;
   }` 

You shouldn't even have to override anything on your new class because the processing is handled by the UObject interface. All you have to do is call it.

References
----------

[Answerhub - UFUNCTION Exec from UActorComponent](https://answers.unrealengine.com/questions/45499/ufunctionexec-from-uactorcomponent.html)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Exec\_Functions&oldid=409](https://wiki.unrealengine.com/index.php?title=Exec_Functions&oldid=409)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")