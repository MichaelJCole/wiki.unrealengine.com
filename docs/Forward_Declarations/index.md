 Forward Declarations - Epic Wiki             

 

Forward Declarations
====================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Forward Declarations To The Rescue!](#Forward_Declarations_To_The_Rescue.21)
*   [3 YourController.h](#YourController.h)
*   [4 Compile Error if Used in .h](#Compile_Error_if_Used_in_.h)
*   [5 You can #include anything in .cpp files](#You_can_.23include_anything_in_.cpp_files)
*   [6 Shorthand Forward Declaration](#Shorthand_Forward_Declaration)
*   [7 FORCEINLINE Usage](#FORCEINLINE_Usage)
*   [8 Summary](#Summary)

Overview
--------

_Author:_ [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Dear Community,

In UE4 C++ you will often find that your code won't compile if you refer to other custom classes you've created.

For example, if you have a custom pawn and a custom hud class, and in your controller class you have in your header file (.h) :

<syntaxhighlight lang="cpp"> UPROPERTY() ACustomPawn\* myPawn;

UPROPERTY() ACustomHUD\* myHUD; </syntaxhighlight>

The compiler will report that there are errors on the above lines because it has not yet compiled CustomPawn and CustomHUD, so these identifiers are not found yet.

The logical thing to do is then #include these classes above your controller .generated #include:

<syntaxhighlight lang="cpp">#include "CustomPawn.h"

1.  include "CustomHUD.h"

</syntaxhighlight>

_Circular Dependency!_

But if your HUD and Pawn classes also #include your custom player controller you now have a circular dependency!

Forward Declarations To The Rescue!
-----------------------------------

The solution is to just declare all the classes that are not being recognized at the top of your .h file, this is called Forward Declaration

YourController.h
----------------

<syntaxhighlight lang="cpp">

1.  include "YourController.generated.h"

//~~~~~ Forward Declarations~~~~~

class ACustomPawn; class ACustomHUD;

UCLASS() class AYourController : public APlayerController {

 ACutomPawn\* myPawn;
 ACustomHUD\* myHUD;

 //etc

} </syntaxhighlight>

Compile Error if Used in .h
---------------------------

It is important to note that you cannot access the members of solely forward-declared class, you must only try to access members in the .cpp file.

Forward declaration will get everything to compile, but all the logic must be done in the .cpp file.

You can #include anything in .cpp files
---------------------------------------

It is very important to note that you can add the required #include's in any .cpp file, it is only the .h files that have to compile without circular dependencies

These can be added in the .cpp file where you forward declared the types in the .h

<syntaxhighlight lang="cpp">

1.  include "CustomPawn.h"
2.  include "CustomHUD.h"

</syntaxhighlight>

Now in the .cpp file you have fully defined the types that you forward declared in the .h file, and can actually access their custom member variables that are specific to your game code!

When you want to use #include for various headers in CPP files you don't have to worry about the compile order, and can just include all the classes you need without ever thinking about forward declaration issues!

Forward Declaration only has to be considered for .h files :)

So you should try to #include as many .h files as you can in the .cpp rather than the .h, and reserve .h #includes for the ones you really need.

And whenever you have circular dependencies, you can use Forward Declaration instead!

Shorthand Forward Declaration
-----------------------------

If you only need to forward declare a type in one place you can just put **class** right before it!

<syntaxhighlight lang="cpp"> UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Joy Mech BPs") TSubclassOf<class AJoySkelMeshOutline> JoyMechOutline; </syntaxhighlight>

In the above example, I dont have to #include JoySkelMeshOutline.h, but I am still creating a pointer to a Blueprint of this class that I can then set in the Editor, without ever having told C++ the actual definition of AJoySkelMeshOutline!

The advantage here is that I can minimize header dependencies, and in this case I dont have to ever define the type at all since it is a UPROPERTY value that I set in the Editor!

This

<syntaxhighlight lang="cpp"> TSubclassOf<class AJoySkelMeshOutline> JoyMechOutline; </syntaxhighlight>

is the equivalent of this

<syntaxhighlight lang="cpp">

1.  pragma once

//Normal Forward Declaration class AJoySkelMeshOutline;

//This Class .generated

1.  include "CurrentClass.generated.h"

UCLASS() //current class definition

//AJoySkelMeshOutline has been forward declared so this will compile TSubclassOf<AJoySkelMeshOutline> JoyMechOutline; </syntaxhighlight>

Notice it is just easier and more organized in this case to add **class** by using forward declaration shorthand.

FORCEINLINE Usage
-----------------

If you want to write functions in .h files using FORCEINLINE you must then make sure to order your classes correctly so that you can #include the .h file you need so you have the full definition of the class/struct you want to use!

Summary
-------

Using Forward Declarations you can have as many inter-relating classes as you want in your c++ code without having circular dependencies :)

Enjoy!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Forward\_Declarations&oldid=403](https://wiki.unrealengine.com/index.php?title=Forward_Declarations&oldid=403)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")