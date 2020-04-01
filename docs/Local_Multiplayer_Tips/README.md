Local Multiplayer Tips - Epic Wiki                    

Local Multiplayer Tips
======================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Spawning Additional Players](#Spawning_Additional_Players)
*   [3 Using a Shared Camera](#Using_a_Shared_Camera)
*   [4 Player 0 = Keyboard, Player 1 = Gamepad (C++)](#Player_0_.3D_Keyboard.2C_Player_1_.3D_Gamepad_.28C.2B.2B.29)
*   [5 Multiple Players on the Keyboard (C++)](#Multiple_Players_on_the_Keyboard_.28C.2B.2B.29)

Overview
--------

There are several common issues to solve when creating a local multiplayer game in Unreal. This page is intended to catalog these common issues and the methods you can use to solve them. Tips that involve some C++ are marked with (C++).

Spawning Additional Players
---------------------------

First, make sure that your level has multiple player starts placed in it. This is because the default behavior avoids spawning a player at a node where it would collide with another player. So you should place enough player starts for the maximal number of players you plan on supporting.

Next, in your Game Mode's Begin Play, use either the Create Player node (if in Blueprint) or [UGameplayStatics::CreatePlayer](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Kismet/UGameplayStatics/CreatePlayer/index.html) (if in C++) to spawn however many additional players you want. This will spawn the default player controller and (optionally) the default pawn for the player. You can configure these default classes in your Game Mode.

Using a Shared Camera
---------------------

By default, when you spawn additional local players, Unreal will use splitscreen. To disable this, in your Project Settings go to **Project>Maps & Modes>Local Multiplayer** and uncheck **Use Splitscreen**.

Once you've disabled splitscreen, you will only see the first player's view. If you want to create a more general shared camera, place a CameraActor instance in your level, and position/orient it however you'd like to. In the properties of your CameraActor instance, set **Auto Player Activation** to **Player 0**. This forces the first player to use the CameraActor, and since splitscreen is disabled, it will be the only view that's visible.

For many games, you will want to have custom behavior beyond just a stationary camera. You can make a subclass of CameraActor (either in Blueprint or C++), and add whatever custom behavior you want. For some ideas on what you could do, see [Creating a shared camera for multiplayer games](/Creating_a_shared_camera_for_multiplayer_games "Creating a shared camera for multiplayer games").

Player 0 = Keyboard, Player 1 = Gamepad (C++)
---------------------------------------------

By default, the first controller always maps to player 0. The keyboard also always maps to player 0. Thus, in order to control two local players you are required to have two gamepads. A common request is to allow for player 0 to use the keyboard and player 1 to use the gamepad. Unfortunately, it appears the only way this can be done at this time is via C++ code, and the simplest solution is a bit hacky.

The following will set it up so that the controller is always mapped to the next player index. So player 0 will always be keyboard only, player 1 will use the 1st gamepad, player 2 will use the 2nd gamepad, etc. (Ideally, a better solution would only do this remapping if there are more players than gamepads. Unfortunately, this can't be done without some nontrivial engine-level changes).

Here's how you can implement this:

1.  Change your project's main header file to #include **"Engine.h"** instead of "EngineMinimal.h". Otherwise you will get compile errors later on.
2.  Use **File>New C++ Class**, select "Show All Classes" and make a subclass of **GameViewportClient**. I called it LocalMPViewportClient.
3.  In your custom viewport client's class declaration, declare overrides of InputKey and InputAxis:

virtual bool InputKey(FViewport\* Viewport, int32 ControllerId, FKey Key, EInputEvent EventType, float AmountDepressed \= 1.f, bool bGamepad \= false) override;
virtual bool InputAxis(FViewport\* Viewport, int32 ControllerId, FKey Key, float Delta, float DeltaTime, int32 NumSamples \= 1, bool bGamepad \= false) override;

4.  Implement these functions as follows in your .cpp:

bool ULocalMPViewportClient::InputKey(FViewport\* Viewport, int32 ControllerId, FKey Key, EInputEvent EventType, float AmountDepressed, bool bGamepad)
{
	if (bGamepad)
	{
		// Map the gamepad to the next player index (so 1st controller is player index 1, etc.)
		return Super::InputKey(Viewport, ControllerId + 1, Key, EventType, AmountDepressed, bGamepad);
	}
	else
	{
		return Super::InputKey(Viewport, ControllerId, Key, EventType, AmountDepressed, bGamepad);
	}
}
 
bool ULocalMPViewportClient::InputAxis(FViewport\* Viewport, int32 ControllerId, FKey Key, float Delta, float DeltaTime, int32 NumSamples /\*= 1\*/, bool bGamepad /\*= false\*/)
{
	if (bGamepad)
	{
		// Map the gamepad to the next player index (so 1st controller is player index 1, etc.)
		return Super::InputAxis(Viewport, ControllerId + 1, Key, Delta, DeltaTime, NumSamples, bGamepad);
	}
	else
	{
		return Super::InputAxis(Viewport, ControllerId, Key, Delta, DeltaTime, NumSamples, bGamepad);
	}
}

5.  In your project settings, go to **Engine>General Settings>Default Classes** and set **Game Viewport Client Class** to your custom class.
6.  Restart the editor/rebuild your code. It seems like without the restart, the engine won't use your new game viewport client.

Multiple Players on the Keyboard (C++)
--------------------------------------

As with the prior item, in order to get this to work properly, you need to override the Game Viewport Client. However, it also requires a bit of trickery with your input mappings.

If you want both multiple players on the keyboard and support for keyboard = 0, gamepad = 1, you can combine this approach with the prior item.

1.  Change your project's main header file to #include **"Engine.h"** instead of "EngineMinimal.h". Otherwise you will get compile errors later on.
2.  Use **File>New C++ Class**, select "Show All Classes" and make a subclass of **GameViewportClient**. I called it LocalMPViewportClient.
3.  In your custom viewport client's class declaration, declare an override of InputKey:

virtual bool InputKey(FViewport\* Viewport, int32 ControllerId, FKey Key, EInputEvent EventType, float AmountDepressed \= 1.f, bool bGamepad \= false) override;

4.  Implement InputKey as follows in your .cpp:

bool ULocalMPViewportClient::InputKey(FViewport\* Viewport, int32 ControllerId, FKey Key, EInputEvent EventType, float AmountDepressed, bool bGamepad)
{
	if (IgnoreInput() || bGamepad || Key.IsMouseButton())
	{
		return Super::InputKey(Viewport, ControllerId, Key, EventType, AmountDepressed, bGamepad);
	}
	else
	{
		// Propagate keyboard events to all players
		UEngine\* const Engine \= GetOuterUEngine();
		int32 const NumPlayers \= Engine ? Engine\-\>GetNumGamePlayers(this) : 0;
		bool bRetVal \= false;
		for (int32 i \= 0; i < NumPlayers; i++)
		{
			bRetVal \= Super::InputKey(Viewport, i, Key, EventType, AmountDepressed, bGamepad) || bRetVal;
		}
 
		return bRetVal;
	}
}

5.  In your project settings, go to **Engine>General Settings>Default Classes** and set **Game Viewport Client Class** to your custom class.
6.  Restart the editor/rebuild your code. It seems like without the restart, the engine won't use your new game viewport client.
7.  Go to **Engine>Input>Bindings** in your project settings. You will need to configure different bindings for each player you want to support, like this:  
    [![LocalMPTipsBindings.png](https://d26ilriwvtzlb.cloudfront.net/2/27/LocalMPTipsBindings.png)](/File:LocalMPTipsBindings.png)
8.  Finally, in your SetupInputComponent function in your player controller, you need to configure it to use the different mappings based on the player index. For example, if you have MoveForward and MoveRight functions, you would do the following:

int32 id \= GetLocalPlayer()\-\>GetControllerId();
if (id \== 0)
{
	InputComponent\-\>BindAxis("MoveForward\_P1", this, &ALocalMPPlayerController::MoveForward);
	InputComponent\-\>BindAxis("MoveRight\_P1", this, &ALocalMPPlayerController::MoveRight);
}
else if (id \== 1)
{
	InputComponent\-\>BindAxis("MoveForward\_P2", this, &ALocalMPPlayerController::MoveForward);
	InputComponent\-\>BindAxis("MoveRight\_P2", this, &ALocalMPPlayerController::MoveRight);
}

[User:Chalonverse](/User:Chalonverse "User:Chalonverse")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Local\_Multiplayer\_Tips&oldid=16750](https://wiki.unrealengine.com/index.php?title=Local_Multiplayer_Tips&oldid=16750)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)