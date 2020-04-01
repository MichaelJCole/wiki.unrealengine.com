Spawn Different Pawns For Players in Multiplayer - Epic Wiki                    

Spawn Different Pawns For Players in Multiplayer
================================================

**Rate this Article:**

4.50

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_half.gif) (2 votes)

Approved for Versions:4.7

Contents
--------

*   [1 Overview](#Overview)
*   [2 Step 1: Custom Game Mode](#Step_1:_Custom_Game_Mode)
*   [3 Step 2: Custom Player Controller](#Step_2:_Custom_Player_Controller)
*   [4 Client/Server Functions](#Client.2FServer_Functions)
*   [5 Text File Implementation](#Text_File_Implementation)
*   [6 Assertion](#Assertion)
*   [7 Final Word](#Final_Word)

Overview
--------

In this tutorial, I'll show you how I use C++ to allow a player to spawn into a Multiplayer game with a Pawn of their choice. By default, Unreal Engine allows you to choose a Pawn class that every player will use. We will change this functionality so that the Clients (and Server) can choose their Pawn way before they are spawned into the world.

Step 1: Custom Game Mode
------------------------

To start with, we need to override the 'GetDefaultPawnClassForController' function in AGameMode. Normally this function simply returns the GameModes 'DefaultPawnClass', but we want to change this so that it can hook into our custom Player Controller, and read the value from there.

**This is a much more flexible approach than creating lots of Pawn Variables in the GameMode, since we can specify any pawn class we want from our PlayerController this way!**

**MyGameMode.h**

UCLASS()
class MYGAME\_API AMyGameMode : public AGameMode
{
	GENERATED\_UCLASS\_BODY()
 
	/\* Override To Read In Pawn From Custom Controller \*/
	UClass\* GetDefaultPawnClassForController(AController\* InController) override;
};

**MyGameMode.cpp**

AMyGameMode::AMyGameMode(const FObjectInitializer& ObjectInitializer) : Super(ObjectInitializer)
{
	/\* Use our custom Player-Controller Class \*/
	PlayerControllerClass \= AMyPlayerController::StaticClass();
}
 
UClass\* AMyGameMode::GetDefaultPawnClassForController(AController\* InController)
{
	/\* Override Functionality to get Pawn from PlayerController \*/
	AMyPlayerController\* MyController \= Cast<AMyPlayerController\>(InController);
	if (MyController)
	{
		return MyController\-\>GetPlayerPawnClass();
	}
 
	/\* If we don't get the right Controller, use the Default Pawn \*/
	return DefaultPawnClass;
}

Intellisense/Visual Assist will warn you that 'GetPlayerPawnClass()' doesnt' exist yet. Fear not, we'll create that in the next section!

Step 2: Custom Player Controller
--------------------------------

We must now invoke some custom functionality in our PlayerController, in order to tell the Gamemode which Pawn to use. On this rare occasion, we actually want the Client to have authority over the Server to ensure the Client chooses the Pawn locally, and tell the server to do the rest.

My method sets a Replicated Variable on the Server, the value of which is determined on the Client beforehand. This way, we take advantage of UE4s authoritative server system, keeping the two players in-sync and ensuring that no client-side cheating can ever occur. The server still handles the spawning of the Pawn, and the developer can choose to further validate the Clients choice if they want to.

**NOTE:** The method posted below determines which Pawn to use based on an external .txt file. This is purely because it suited our implementation, but I do NOT recommend following this method for almost any other game, since the file can be easily modified by an end user. It would be much safer and more flexible, to use a SaveGame class generated inside the game itself, and have the server verify that the Pawn is a valid option server-side.

Saving the correct Pawn to use as a SaveGame is outside the scope of this tutorial, but you can study ShooterGame's **ShooterPersistentUser** class to learn more about how to use them. Simply replace the body of 'DeterminePawnClass' with code that loads the Pawn class from your custom SaveGame.

**MyPlayerController.h**

UCLASS()
class MYGAME\_API AMyPlayerController : public APlayerController
{
	GENERATED\_BODY()
 
public:
	/\* Constructor \*/
	AMyPlayerController(const FObjectInitializer& ObjectInitializer);
 
	FORCEINLINE UClass\* GetPlayerPawnClass() { return MyPawnClass; }
 
protected:
	/\* Return The Correct Pawn Class Client-Side \*/
	UFUNCTION(Reliable, Client)
	void DeterminePawnClass();
	virtual void DeterminePawnClass\_Implementation();
 
	/\* Use BeginPlay to start the functionality \*/
	virtual void BeginPlay() override;
 
	/\* Set Pawn Class On Server For This Controller \*/
	UFUNCTION(Reliable, Server, WithValidation)
	virtual void ServerSetPawn(TSubclassOf<APawn\> InPawnClass);
	virtual void ServerSetPawn\_Implementation(TSubclassOf<APawn\> InPawnClass);
	virtual bool ServerSetPawn\_Validate(TSubclassOf<APawn\> InPawnClass);
 
	/\* Actual Pawn class we want to use \*/
	UPROPERTY(Replicated)
	TSubclassOf<APawn\> MyPawnClass;
 
	/\* First Pawn Type To Use \*/
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category \= "My Controller")
	TSubclassOf<AGESGame\_ServerPawn\> PawnToUseA;
 
	/\* Second Pawn Type To Use \*/
	UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category \= "My Controller")
	TSubclassOf<AGESGame\_Pawn\> PawnToUseB;
};

**MyPlayerController.cpp**

AMyPlayerController::AMyPlayerController(const FObjectInitializer& ObjectInitializer) : Super(ObjectInitializer)
{
	/\* Initialize The Values \*/
	PawnToUseA\= NULL;
	PawnToUseB\= NULL;
 
	/\* Make sure the PawnClass is Replicated \*/
	bReplicates \= true;
}
 
void AMyPlayerController::BeginPlay()
{
	Super::BeginPlay();
 
	DeterminePawnClass();
}
 
// Pawn Class
void AMyPlayerController::DeterminePawnClass\_Implementation()
{
	if (IsLocalController()) //Only Do This Locally (NOT Client-Only, since Server wants this too!)
	{
		/\* Load Text File Into String Array \*/
		TArray<FString\> TextStrings;
		const FString FilePath \= FPaths::GameDir() + "Textfiles/PlayerSettings.txt";
 
	        /\* Use PawnA if the Text File tells us to \*/
		if (TextStrings\[0\]\== "PawnA")
		{
			ServerSetPawn(PawnToUseA);
			return;
		}
 
	        /\* Otherwise, Use PawnB :) \*/
		ServerSetPawn(PawnToUseB);
		return;
	}
}
 
bool AMyPlayerController::ServerSetPawn\_Validate(TSubclassOf<APawn\> InPawnClass)
{
	return true;
}
 
void AMyPlayerController::ServerSetPawn\_Implementation(TSubclassOf<APawn\> InPawnClass)
{
	MyPawnClass \= InPawnClass;
 
	/\* Just in case we didn't get the PawnClass on the Server in time... \*/
	GetWorld()\-\>GetAuthGameMode()\-\>RestartPlayer(this);
}
 
// Replication
void AMyPlayerController::GetLifetimeReplicatedProps(TArray<FLifetimeProperty\>& OutLifetimeProps) const
{
	DOREPLIFETIME(AMyPlayerController, MyPawnClass);
}

Client/Server Functions
-----------------------

The **most important functionality** in the Player Controller is NOT necessarily how you determine which pawn to use, but is actually the use of Client/Server functions and the Replicated 'MyPawnClass' variable. Without this, the Server will never know which Pawn the Client wants to spawn.

Also note the use of 'IsLocalPlayerController()' during the 'DeterminePawnClass' function. This is a check to ensure that the Server doesn't try to load it's own TextFile for the player, and ensures that the Client tells the Server which Pawn it wants to use, not the other way around. Without it, all of the players will actually end up using the Servers' chosen Pawn, regardless of what they really want to do! Don't replace this with an Authority check, since the Server could also be a player!

Text File Implementation
------------------------

If you want to use this functionality exactly as it's posted above, you need to create a folder in your projects' Root Directory called 'TextFiles', and in there create a new .txt file called 'PlayerSettings.txt'

The Player Controller will search for the file on BeginPlay and attempt to load the text inside it into an array of strings. Each line in the text file forms another element in the array. If the first line in the text file is 'PawnA', the controller will tell the GameMode to use 'PawnToUseA' for this player. If any other value is entered or no value is found, it will instead use 'PawnToUseB'.

Assertion
---------

I **Strongly Recommend** you add additional checks and/or asserts to the above code. The final code that I actually use does have this in place, but I used an alternative Assert Library that I do not have permission to share, and so cut them out. Remember, you should always check if something valid and never allow your code to de-reference a NULL pointer!

If a .txt file isn't found for the example posted above, it will crash the engine. If you want to build a packaged version of your game, you **must** copy the TextFiles folder into the games' folder when packaging has finished!

Final Word
----------

I do NOT encourage the use of TextFiles to determine which pawn to use for a real project. The code above is only meant to show the order of operations, and the use of Client/Server functionality to ensure reliability. It was suitable only for a very unique implementation. I highly recommend modifying the 'DeterminePawnClass' function to return a Pawn class from a SaveGame, or similar. This method is much more secure and less prone to errors.

In due time, I will update this tutorial to do exactly that, as I believe it is much more suited to most projects. More advanced C++ users will be able to integrate this on their own from this point on however, so enjoy!

Hope this helps!

[TheJamsh](/User:TheJamsh "User:TheJamsh") ([talk](/User_talk:TheJamsh "User talk:TheJamsh"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Spawn\_Different\_Pawns\_For\_Players\_in\_Multiplayer&oldid=13391](https://wiki.unrealengine.com/index.php?title=Spawn_Different_Pawns_For_Players_in_Multiplayer&oldid=13391)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)