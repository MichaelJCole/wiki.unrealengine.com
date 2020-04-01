Game Mode, Linking to Player Controller Blueprint - Epic Wiki                    

Game Mode, Linking to Player Controller Blueprint
=================================================

**Original Author:** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

If anyone is doing any fancy experiments, or cannot figure out how to get their custom player controller class to be used, here is the basic setup!

If you start a new UE4 code-based project,

the player controller and Game Mode classes should be set up for you,

but **here are the inner workings just in case you need to re-link something manually.**

  
What I am explaining here could also be applied to the Character and HUD classes, which are also set in GameMode class.

Contents
--------

*   [1 Blueprinted Base C++ Class](#Blueprinted_Base_C.2B.2B_Class)
*   [2 YourPlayerController](#YourPlayerController)
    *   [2.1 YourPlayerController.h](#YourPlayerController.h)
    *   [2.2 YourPlayerController.cpp](#YourPlayerController.cpp)
*   [3 Blueprinted Player Controller](#Blueprinted_Player_Controller)
*   [4 GameMode](#GameMode)
*   [5 Copy Reference](#Copy_Reference)
*   [6 Summary](#Summary)

Blueprinted Base C++ Class
--------------------------

Also this code sample is showing you how to use the Blueprinted version of your base C++ player controller class

YourPlayerController
--------------------

Here is the essential skeleton you need to create your own player controller class :)

### YourPlayerController.h

#pragma once
 
//Input
#include "InputCoreTypes.h"
 
#include "YourPlayerController.generated.h"
 
UCLASS(config\=Game)
class AYourPlayerController : public APlayerController
{
	GENERATED\_BODY()
public:
	AYourPlayerController(const FObjectInitializer& ObjectInitializer);
};

### YourPlayerController.cpp

#include "YourGame.h"
AYourPlayerController::AYourPlayerController(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
 
}

Blueprinted Player Controller
-----------------------------

If your project did not start with one, make sure to make a blueprint of your game's player controller class!

Then you can add properties to your C++ controller class, but make updates easily in the Editor using blueprints :)

GameMode
--------

You need to tell your GameMode class to use your custom player controller.

GameMode itself should be properly setup for you if you start a new Code-based UE4 project!

// Failsafe
PlayerControllerClass \= AYourPlayerController::StaticClass();
 
// Blueprinted Version, relies on the asset path obtained from the editor
static ConstructorHelpers::FClassFinder<AYourPlayerController\> VictoryPCOb(TEXT("AYourPlayerController'/Game/VictoryEditor/VictoryPlayerControllerBP.VictoryPlayerControllerBP\_C'"));
if (VictoryPCOb.Class !\= NULL)
{
	PlayerControllerClass \= VictoryPCOb.Class;
}

Copy Reference
--------------

You can obtain the path of your blueprinted controller by right clicking on its blueprint in the editor and choosing "Copy Reference". You should then edit the path obtained by adding the "\_C" suffix, which distinguishes the actual class used by the game from the Blueprint asset, which is an editor-only concept.

static ConstructorHelpers::FClassFinder<AYourPlayerController\> VictoryPCOb(TEXT("AYourPlayerController'/Game/VictoryEditor/VictoryPlayerControllerBP.VictoryPlayerControllerBP\_C'"));

Summary
-------

In case your project's core blueprints ever get miswired with your c++ Game Mode,

here is all the info you needed to know!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Game\_Mode,\_Linking\_to\_Player\_Controller\_Blueprint&oldid=23253](https://wiki.unrealengine.com/index.php?title=Game_Mode,_Linking_to_Player_Controller_Blueprint&oldid=23253)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)