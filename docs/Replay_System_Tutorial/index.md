 Replay System Tutorial - Epic Wiki             

 

Replay System Tutorial
======================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Initial Setup](#Initial_Setup)
*   [3 Replication](#Replication)
*   [4 Adding our C++ code](#Adding_our_C.2B.2B_code)
    *   [4.1 ReplayTutorial.Build.cs](#ReplayTutorial.Build.cs)
    *   [4.2 MyGameInstance.h](#MyGameInstance.h)
    *   [4.3 MyGameInstance.cpp](#MyGameInstance.cpp)
*   [5 Blueprint (UI) Implementation](#Blueprint_.28UI.29_Implementation)
    *   [5.1 Additional Setup](#Additional_Setup)
    *   [5.2 FirstPersonCharacter Input](#FirstPersonCharacter_Input)
*   [6 MainMenuUI](#MainMenuUI)
    *   [6.1 WID\_ReplaySlot](#WID_ReplaySlot)
    *   [6.2 WID\_MainMenu](#WID_MainMenu)
*   [7 Testing it](#Testing_it)
*   [8 Adding the ReplaySpectator Controller](#Adding_the_ReplaySpectator_Controller)
    *   [8.1 PC\_ReplaySpectator.h](#PC_ReplaySpectator.h)
    *   [8.2 PC\_ReplaySpectator.cpp](#PC_ReplaySpectator.cpp)
    *   [8.3 WID\_ReplaySpectator](#WID_ReplaySpectator)
    *   [8.4 BP\_PC\_ReplaySpectator](#BP_PC_ReplaySpectator)
*   [9 Conclusion, Bugs](#Conclusion.2C_Bugs)

Overview
--------

This tutorial is intended to show you how to easily create a basic replay system, enabling you to record game data to a hard drive and play it back at a later time. I spent quite some time reading through the engine code to be able to implement this in my own projects and was surprised that no one covered it in a tutorial yet, so here goes... My method might not be the optimal one, but it works and I'd like to share it with those who want to work with replays as well. While the tutorial does include some c++ code, I will show you how to expose the necessary methods, so that they can be called from blueprints.

(NOTE: Replays can't be recorded or played back in PIE mode. Use Standalone instead!)

1.  In the Initial Setup I'll show you how a new project is initially configured to be able to deal with Replays.
2.  The section "Replication" sets up the First Person Example to replicate its Projectiles, Cube Meshes and to let Clients call Server\_Fire
3.  In "Adding our C++ code" I introduce some functions to a new GameInstance class that will start/stop recording and Find, Rename, Watch and Delete Replays from Hard Disk
4.  In "Blueprint (UI) Implementation you will find a minimalistic Set-Up to start/stop Recording from Blueprints
5.  In "MainMenuUI" I show you how to make a simple Replay Browser to manipulate previous records
6.  The section "Testing it" is a good spot to make a break from this tutorial and an invitation to play around.
7.  The last section "Adding the ReplaySpectator Controller" introduces a PlayerController to handle a Replay Playback and a Widget to interface between User and PlayBack.
8.  Finally, there is still bug that needs to be fixed, this is described in "Conclusion, Bugs"

Initial Setup
-------------

To begin with, create a project of your liking. I chose the "First Person Example" as a base, however any Example should do. You can also include this tutorial in your own project, but for the sake of simplicity I will display it for a clean one. After the project is created, open the project folder on your hard drive and navigate to ReplayTutorial/Config/DefaultEngine.ini, open it, and add the following statement at the end of this file:

\[/Script/Engine.GameEngine\]

+NetDriverDefinitions=(DefName="DemoNetDriver",DriverClassName="/Script/Engine.DemoNetDriver",DriverClassNameFallback="/Script/Engine.DemoNetDriver")

This step will enable and load the DemoNetDriver for you, which is the actual recorder.

Replication
-----------

In order to let the engine record gameplay, you need to make sure that our actors are properly replicated. The engine treats the replay recorder like a networked client, even in a single player game, so that replicated data is automatically recorded. You can safely skip to the next section if your project is already set up for multiplayer games.

In the level's "World Outliner", select all of the EditorCubeXX-actors and set their property "Static Mesh Replicate Movement" to true. The movement of these cubes will be recorded this way.

[![](https://d26ilriwvtzlb.cloudfront.net/7/72/ReplayTutorial_ReplicateMeshes.png)](/index.php?title=File:ReplayTutorial_ReplicateMeshes.png)

Setting the Cubes in the Level to Replicate

After that, open the Blueprint "FirstPersonProjectile" and set the properties of "Replicates" and "Replicate Movement" to true. This will make sure that the projectile balls will be seen on clients and in the records. Now, when the server shoots, others will see it. Additionally, clients might shoot, but they can't replicate data to the other clients OR the recorder. To ammend that, open the Blueprint "FirstPersonCharacter" and verify that "Replicate Movement" and "Replicates" is set. Then, locate the event called "InputAction Fire" and add a custom event called "Server\_Fire" near it. Set this event to "Run on Server" and "Reliable", since this is important gameplay input. We need to restructure (see Images) the "InputAction Fire" event in order to make it network-enabled. Put the nodes "Montage Play" and "Play Sound At Location" directly after the "InputAction Fire" event. Then drag a node called "Switch Has Authority" out of the sound node. From the "Remote" Execute-Pin, call the previously created method "Server\_Fire" and from the "Authority" Pin, spawn the projectile. This concludes our preparations.

[![](https://d3ar1piqh1oeli.cloudfront.net/1/13/ReplayTutorial_ReplicateCharacter1.png/940px-ReplayTutorial_ReplicateCharacter1.png)](/index.php?title=File:ReplayTutorial_ReplicateCharacter1.png)

Server\_Fire Function Part 1

[![](https://d3ar1piqh1oeli.cloudfront.net/3/37/ReplayTutorial_ReplicateCharacter2.png/940px-ReplayTutorial_ReplicateCharacter2.png)](/index.php?title=File:ReplayTutorial_ReplicateCharacter2.png)

Server\_Fire Function Part 2

Adding our C++ code
-------------------

All of the recording and playback methods can be found within the engine. What we have to do in order to use them is to correctly expose these methods to blueprint. To achieve this, right click in the "Content Browser" and add a new c++ class. Click on "Show All Classes" in the upper right corner and search for GameInstance. Since this will be our parent class, select it. You can choose a name when you select Next, then create the new class.

This will open Visual Studio (if you installed it – I will skip this step here ;)), where you will see the newly created <name>.h (definition) and <name>.cpp (code) files. In my case, they are named MyGameInstance.x

### ReplayTutorial.Build.cs

Before creating any code, make sure that you include "Json" in the PublicDependencyModules, a definition that can be found in the Solution Explorer under Solution/Games/ReplayTutorial/Source/ReplayTutorial.Build.cs. Open it and add "Json", like so:

PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "Json" });

### MyGameInstance.h

The .h (definition file) will contain our definitions of the necessary methods and properties. You will need to add an include at the beginning of this file, so that these three are available:

#include "Engine/GameInstance.h"
#include "NetworkReplayStreaming.h"
#include "MyGameInstance.generated.h"

Afterwards, in the class body, add the following function definitions. Their names will already tell you what the functions are intended for:

public:
	/\*\* Start recording a replay from blueprint. ReplayName = Name of file on disk, FriendlyName = Name of replay in UI \*/
	UFUNCTION(BlueprintCallable, Category = "Replays")
		void StartRecordingReplayFromBP(FString ReplayName, FString FriendlyName);

	/\*\* Start recording a running replay and save it, from blueprint. \*/
	UFUNCTION(BlueprintCallable, Category = "Replays")
		void StopRecordingReplayFromBP();

	/\*\* Start playback for a previously recorded Replay, from blueprint \*/
	UFUNCTION(BlueprintCallable, Category = "Replays")
		void PlayReplayFromBP(FString ReplayName);

	/\*\* Start looking for/finding replays on the hard drive \*/
	UFUNCTION(BlueprintCallable, Category = "Replays")
		void FindReplays();

	/\*\* Apply a new custom name to the replay (for UI only) \*/
	UFUNCTION(BlueprintCallable, Category = "Replays")
		void RenameReplay(const FString &ReplayName, const FString &NewFriendlyReplayName);

	/\*\* Delete a previously recorded replay \*/
	UFUNCTION(BlueprintCallable, Category = "Replays")
		void DeleteReplay(const FString &ReplayName);

We also need additional functions for our FindReplays() and DeleteReplay(..) methods, since they rely on async callbacks. To support these, add the following:

	virtual void Init() override;

private:

	// for FindReplays() 
	TSharedPtr<INetworkReplayStreamer> EnumerateStreamsPtr;
	FOnEnumerateStreamsComplete OnEnumerateStreamsCompleteDelegate;

	void OnEnumerateStreamsComplete(const TArray<FNetworkReplayStreamInfo>& StreamInfos);

	// for DeleteReplays(..)
	FOnDeleteFinishedStreamComplete OnDeleteFinishedStreamCompleteDelegate;

	void OnDeleteFinishedStreamComplete(const bool bDeleteSucceeded);

Further, it will be necessary to display Information about replays to the user interface. Since this is in blueprint, let us create a struct to hold these data. Add the following definition at the beginning of the file (or before our UMyGameInstance class definition):

USTRUCT(BlueprintType)
struct FS\_ReplayInfo
{
	GENERATED\_USTRUCT\_BODY()

	UPROPERTY(BlueprintReadOnly)
		FString ReplayName;

	UPROPERTY(BlueprintReadOnly)
		FString FriendlyName;

	UPROPERTY(BlueprintReadOnly)
		FDateTime Timestamp;

	UPROPERTY(BlueprintReadOnly)
		int32 LengthInMS;

	UPROPERTY(BlueprintReadOnly)
		bool bIsValid;

	FS\_ReplayInfo(FString NewName, FString NewFriendlyName, FDateTime NewTimestamp, int32 NewLengthInMS)
	{
		ReplayName = NewName;
		FriendlyName = NewFriendlyName;
		Timestamp = NewTimestamp;
		LengthInMS = NewLengthInMS;
		bIsValid = true;
	}

	FS\_ReplayInfo()
	{
		ReplayName = "Replay";
		FriendlyName = "Replay";
		Timestamp = FDateTime::MinValue();
		LengthInMS = 0;
		bIsValid = false;
	}
};

And lastly, add another function to our UMyGameInstance class, that we call when finding replays has completed:

protected:
	UFUNCTION(BlueprintImplementableEvent, Category = "Replays")
		void BP\_OnFindReplaysComplete(const TArray<FS\_ReplayInfo> &AllReplays);

### MyGameInstance.cpp

This file will contain our actual code which carries out the previously defined methods. To begin with, lets include the following two definitions:

#include "ReplayTutorial.h"
#include "Runtime/NetworkReplayStreaming/NullNetworkReplayStreaming/Public/NullNetworkReplayStreaming.h"
#include "NetworkVersion.h"
#include "MyGameInstance.h"

Then, lets create our Init() function first, since this is the place were we can safely link the OnDelete...- and OnEnumerate...-Delegates before a user will call any of our functions:

void UMyGameInstance::Init()
{
	Super::Init();
	
	// create a ReplayStreamer for FindReplays() and DeleteReplay(..)
	EnumerateStreamsPtr = FNetworkReplayStreaming::Get().GetFactory().CreateReplayStreamer();
	// Link FindReplays() delegate to function
	OnEnumerateStreamsCompleteDelegate = FOnEnumerateStreamsComplete::CreateUObject(this, &UMyGameInstance::OnEnumerateStreamsComplete);
	// Link DeleteReplay() delegate to function
	OnDeleteFinishedStreamCompleteDelegate = FOnDeleteFinishedStreamComplete::CreateUObject(this, &UMyGameInstance::OnDeleteFinishedStreamComplete);
}

Some of our functions are actually only calling functions that are already present in the GameInstance, like the following:

void UMyGameInstance::StartRecordingReplayFromBP(FString ReplayName, FString FriendlyName)
{
	StartRecordingReplay(ReplayName, FriendlyName);
}

void UMyGameInstance::StopRecordingReplayFromBP()
{
	StopRecordingReplay();
}

void UMyGameInstance::PlayReplayFromBP(FString ReplayName)
{
	PlayReplay(ReplayName);
}

FindReplays() on the other hand needs an additional (our previously created) ReplayStreamer, called "EnumerateStreamsPtr". It starts looking for replays on your hard disc and asynchronously calls " OnEnumerateStreamsComplete" when ready:

void UMyGameInstance::FindReplays()
{
	if (EnumerateStreamsPtr.Get())
	{
		EnumerateStreamsPtr.Get()->EnumerateStreams(FNetworkReplayVersion(), FString(), FString(), OnEnumerateStreamsCompleteDelegate);
	}
}

void UMyGameInstance::OnEnumerateStreamsComplete(const TArray<FNetworkReplayStreamInfo>& StreamInfos)
{
	TArray<FS\_ReplayInfo> AllReplays;

	for (FNetworkReplayStreamInfo StreamInfo : StreamInfos)
	{
		if (!StreamInfo.bIsLive)
		{
			AllReplays.Add(FS\_ReplayInfo(StreamInfo.Name, StreamInfo.FriendlyName, StreamInfo.Timestamp, StreamInfo.LengthInMS));
		}
	}

	BP\_OnFindReplaysComplete(AllReplays);
}

In order to rename replays I have stumbled upon the Engine-functions that create, write and read data to the actual files on our hard disk. I've put together a solution to setting a "Friendly-Name" (for UI) in a previously recorded replay, so that users can put their own nametags on their replays. However, I think this is a bit of a hack because the filestrings are merely put together like in the engine. If the methods in the engine ever change then this will obviously not work anymore:

void UMyGameInstance::RenameReplay(const FString &ReplayName, const FString &NewFriendlyReplayName)
{	
	// Get File Info
	FNullReplayInfo Info;

	const FString DemoPath = FPaths::Combine(\*FPaths::GameSavedDir(), TEXT("Demos/"));
	const FString StreamDirectory = FPaths::Combine(\*DemoPath, \*ReplayName);
	const FString StreamFullBaseFilename = FPaths::Combine(\*StreamDirectory, \*ReplayName);
	const FString InfoFilename = StreamFullBaseFilename + TEXT(".replayinfo");

	TUniquePtr<FArchive> InfoFileArchive(IFileManager::Get().CreateFileReader(\*InfoFilename));

	if (InfoFileArchive.IsValid() && InfoFileArchive->TotalSize() != 0)
	{
		FString JsonString;
		\*InfoFileArchive << JsonString;

		Info.FromJson(JsonString);
		Info.bIsValid = true;

		InfoFileArchive->Close();
	}

	// Set FriendlyName
	Info.FriendlyName = NewFriendlyReplayName;

	// Write File Info
	TUniquePtr<FArchive> ReplayInfoFileAr(IFileManager::Get().CreateFileWriter(\*InfoFilename));

	if (ReplayInfoFileAr.IsValid())
	{
		FString JsonString = Info.ToJson();
		\*ReplayInfoFileAr << JsonString;

		ReplayInfoFileAr->Close();
	}
}

Last but not least, add the code for our DeleteReplay(..) call, pray to the Compiler Gods (at your own discretion, do not anger real gods and blame me for it!) and hit compile afterwards:

void UMyGameInstance::DeleteReplay(const FString &ReplayName)
{
	if (EnumerateStreamsPtr.Get())
	{
		EnumerateStreamsPtr.Get()->DeleteFinishedStream(ReplayName, OnDeleteFinishedStreamCompleteDelegate);
	}
}

void UMyGameInstance::OnDeleteFinishedStreamComplete(const bool bDeleteSucceeded)
{
	FindReplays();
}

Blueprint (UI) Implementation
-----------------------------

Now that all of that code is compiled and out of the way, let's finally turn to the Unreal Editor again. I will try to show you a very minimalistic implementation of these Replay System calls, you can get creative and do it in a different way, but a few things must be done first.

### Additional Setup

1.  n our content browser, right click and add a new blueprint class. Click on "Display All Classes" and select the c++ GameInstance we created, then call it something senseful to distinguish it from its parent, like "BP\_MyGameInstance". Open the new blueprint and override the BP\_OnFindReplaysComplete(..) function. We will use this function to display a list of Replays in our UI later.
2.  Create a new map and call it something like "MainMenuMap"
3.  Open the Project Settings and under "Project – Maps & Modes" set DefaultGameMode to "GameModeBase". Then, set the Editor StartUp Map, Game Default Map and Server Default Map to "MainMenuMap". Afterwards set GameInstance to BP\_MyGameInstance
4.  Open the FirstPersonExampleMap and verify that it overrides the GameMode with the "FirstPersonGameMode".

[![](https://d26ilriwvtzlb.cloudfront.net/b/bb/ReplayTutorial_OverrideFindReplays.png)](/index.php?title=File:ReplayTutorial_OverrideFindReplays.png)

Where to find Override Function

After these steps, open the "FirstPersonCharacter" blueprint.

### FirstPersonCharacter Input

For the sake of the simplicity of this tutorial, I will call the Replay functions here. You might want to do that from the GameMode or GameState instead, for example when the game begins or ends. If you want to follow the tutorial, just add two Input Events "Page Up" and "Page Down". Drag a "Switch Has Authority" node out from each of them and add Game Instance Casts like in the image to the two events. From Page Up, call Start Recording Replay and from Page Down call Stop Recording. For the ReplayName I tend to use strings like "Replay\_2017-04-29\_01-54-03" and the Friendly-Name usually stays empty for automatic recording. For the purpose of this tutorial I have put test in. Now we already should be able to record Replays (found in ProjectFolder/Saved/Demos), by pressing our PageUp or PageDown Keys.

NOTE: Replays can't be recorded or played back in PIE mode. Use Standalone!

[![](https://d26ilriwvtzlb.cloudfront.net/a/a8/ReplayTutorial_SetupInput.png)](/index.php?title=File:ReplayTutorial_SetupInput.png)

Set up Input to Start and Stop Recording

MainMenuUI
----------

For the sake of completeness I also want to show you how to browse, rename and delete Replays that were previously recorded. To do that, we need two Widget Blueprints. In the content Browser, create two Widgets called "WID\_MainMenu" and "WID\_ReplaySlot".

### WID\_ReplaySlot

Set up the ReplaySlot Widget to look like this:

[![](https://d26ilriwvtzlb.cloudfront.net/e/e7/ReplayTutorial_ReplaySlotWID.png)](/index.php?title=File:ReplayTutorial_ReplaySlotWID.png)

Widget Designer

Then, switch over to the Event Graph and add two String variables "ReplayName" and "ReplayFriendlyName" to the Widget, both set to be "Editable" and "Exposed On Spawn". From the "Event Construct", initialize the TextBox text like in the Image. Then, create Events for the two Buttons (OnClicked) and the TextBox (OnTextCommited) and call the GameInstance Functions we created all the way in the beginning of this tutorial. By comparing to NotEqual (OnCleared) - again, see image - we allow users to hit ESC and keep the old name.

[![](https://d3ar1piqh1oeli.cloudfront.net/e/e3/ReplayTutorial_ReplaySlotWIDGraph1.png/940px-ReplayTutorial_ReplaySlotWIDGraph1.png)](/index.php?title=File:ReplayTutorial_ReplaySlotWIDGraph1.png)

Widget Event Construct

[![](https://d3ar1piqh1oeli.cloudfront.net/5/5c/ReplayTutorial_ReplaySlotWIDGraph2.png/940px-ReplayTutorial_ReplaySlotWIDGraph2.png)](/index.php?title=File:ReplayTutorial_ReplaySlotWIDGraph2.png)

Widget Additional Behavior (Buttons)

### WID\_MainMenu

In the WID\_MainMenu, create a UI similar to that in the images. Make sure that the AllReplaysScrollBox is set to be a variable for the EventGraph:

[![](https://d3ar1piqh1oeli.cloudfront.net/3/3b/ReplayTutorial_MainMenuWID.png/940px-ReplayTutorial_MainMenuWID.png)](/index.php?title=File:ReplayTutorial_MainMenuWID.png)

Main Menu Widget Part 1

[![](https://d3ar1piqh1oeli.cloudfront.net/7/70/ReplayTutorial_MainMenuWID2.png/940px-ReplayTutorial_MainMenuWID2.png)](/index.php?title=File:ReplayTutorial_MainMenuWID2.png)

Main Menu Widget Part 2 - WidgetSwitcher Alternate View

Now switch to the event graph and create a custom event "OnFindReplays" with an input of type "Array of S\_ReplayInfo". Clear the children of the AllReplaysScrollBox, then create a new ReplaySlot for each of the Replays, feed the two strings in it and add the new widget as a child of the Scrollbox, like so:

[![](https://d3ar1piqh1oeli.cloudfront.net/8/84/ReplayTutorial_MainMenuGraph1.png/940px-ReplayTutorial_MainMenuGraph1.png)](/index.php?title=File:ReplayTutorial_MainMenuGraph1.png)

Main Menu Widget OnFindReplays Event

Also add functionality to the other buttons:

[![](https://d3ar1piqh1oeli.cloudfront.net/4/43/ReplayTutorial_MainMenuGraph2.png/940px-ReplayTutorial_MainMenuGraph2.png)](/index.php?title=File:ReplayTutorial_MainMenuGraph2.png)

Main Menu Widget Other Buttons

Now we need to display the main menu when our main menu map loads. To do that, open the level blueprint of the mainmenumap and insert the following event:

[![](https://d3ar1piqh1oeli.cloudfront.net/2/2c/ReplayTutorial_LevelBlueprint.png/940px-ReplayTutorial_LevelBlueprint.png)](/index.php?title=File:ReplayTutorial_LevelBlueprint.png)

Main Menu Level Blueprint

Now, if you launch the game and press Browse Replays you will not see any entries. This is because we still have not connected our GameInstance to our UI. To do this, go to BP\_MyGameInstance and fill in the code of our prepared event like so:

[![](https://d3ar1piqh1oeli.cloudfront.net/4/4c/ReplayTutorial_GameInstanceBP.png/940px-ReplayTutorial_GameInstanceBP.png)](/index.php?title=File:ReplayTutorial_GameInstanceBP.png)

GameInstance to UI forward Replay Info

Testing it
----------

This is the easy part. In order to test the system, all you need to do is open a standalone game and press page up, upon which the game will start recording. If you press page down it will put a Replay under Saved/Demos. Because I did not build a function to go back to the main menu just close and open the game (in standalone again!). From the MainMenu you should be able to see an entry in your Replay Browser. If you press Playback on an entry, the game will immediately start playing the replay back for you. Delete will delete it. If you start to rename it and switch to another widget or press Enter, the name will be saved.

Adding the ReplaySpectator Controller
-------------------------------------

In order to manipulate our Replay during Playback, we will need to add a new PlayerController specifically for this task. Right click in the Content Browser and select "New C++ class", scroll down to "Player Controller" and select it. Click on Next and give the new Player Controller a descriptive name like "PC\_ReplaySpectator". This will open up Visual Studio again.

### PC\_ReplaySpectator.h

In our definitions file we need to set some default values in the constructor. We also need to provide two integers to store console variables, because the game will be a blurry mess when pausing it, due to how Motion Blur and Temporal Anti-Aliasing work. To prevent artifacts, we will switch off Motion Blur and change Anti-Aliasing during a Pause, only to switch it back afterwards. Additionally we will need some methods to interface between User-Input and the Replay Payback. To this end, add the following code to your definition file:

public:
	/\*\* we must set some Pause-Behavior values in the ctor \*/
	APC\_ReplaySpectator(const FObjectInitializer& ObjectInitializer);

protected:

	/\*\* for saving Anti-Aliasing and Motion-Blur settings during Pause State \*/
	int32 PreviousAASetting;
	int32 PreviousMBSetting;

public:

	/\*\* Set the Paused State of the Running Replay to bDoPause. Return new Pause State \*/
	UFUNCTION(BlueprintCallable, Category = "CurrentReplay")
		bool SetCurrentReplayPausedState(bool bDoPause);

	/\*\* Gets the Max Number of Seconds that were recorded in the current Replay \*/
	UFUNCTION(BlueprintCallable, Category = "CurrentReplay")
		int32 GetCurrentReplayTotalTimeInSeconds() const;

	/\*\* Gets the Second we are currently watching in the Replay \*/
	UFUNCTION(BlueprintCallable, Category = "CurrentReplay")
		int32 GetCurrentReplayCurrentTimeInSeconds() const;

	/\*\* Jumps to the specified Second in the Replay we are watching \*/
	UFUNCTION(BlueprintCallable, Category = "CurrentReplay")
		void SetCurrentReplayTimeToSeconds(int32 Seconds);

	/\*\* Changes the PlayRate of the Replay we are watching, enabling FastForward or SlowMotion \*/
	UFUNCTION(BlueprintCallable, Category = "CurrentReplay")
		void SetCurrentReplayPlayRate(float PlayRate = 1.f);

### PC\_ReplaySpectator.cpp

Now, lets focus on the code file, beginning with the following include statement. The only thing that was added is the include to the DemoNetDriver (which is the "Interface" to our Playback)

#include "TP\_StrategyWithSteam.h"
#include "Engine/DemoNetDriver.h"
#include "PC\_ReplaySpectator.h"

In the constructor, we must make sure that the Player Controller keeps Tick-ing during a Game Pause. To do that, add the following Ctor:

APC\_ReplaySpectator::APC\_ReplaySpectator(const FObjectInitializer& ObjectInitializer) : Super(ObjectInitializer)
{
	bShowMouseCursor = true;
	PrimaryActorTick.bTickEvenWhenPaused = true;
	bShouldPerformFullTickWhenPaused = true;
} 

Now we will implement switching into and out of the Pause State. All you have to do to enable Pause is set the WorldSettings->Pauser PlayerState to our current one. In order to quit the Pause State we will then Nullify this Setting. Additionally you can see that we will store our AntiAliasing and MotionBlur Console Variables

bool APC\_ReplaySpectator::SetCurrentReplayPausedState(bool bDoPause)
{
	AWorldSettings\* WorldSettings = GetWorldSettings();

	// Set MotionBlur off and Anti Aliasing to FXAA in order to bypass the pause-bug of both
	static const auto CVarAA = IConsoleManager::Get().FindConsoleVariable(TEXT("r.DefaultFeature.AntiAliasing"));

	static const auto CVarMB = IConsoleManager::Get().FindConsoleVariable(TEXT("r.DefaultFeature.MotionBlur"));

	if (bDoPause)
	{
		PreviousAASetting = CVarAA->GetInt();
		PreviousMBSetting = CVarMB->GetInt();

		// Set MotionBlur to OFF, Anti-Aliasing to FXAA
		CVarAA->Set(1);
		CVarMB->Set(0);

		WorldSettings->Pauser = PlayerState;
		return true;
	}
	// Rest MotionBlur and AA
	CVarAA->Set(PreviousAASetting);
	CVarMB->Set(PreviousMBSetting);

	WorldSettings->Pauser = NULL;
	return false;
}

Lastly, we will implement the "Interface" between User and DemoNetDriver. These functions simply forward requests that will be called from our UI to the DemoNetDriver. The actual work was already done In-Engine. After copying the following, hit compile and switch to the Unreal Editor:

int32 APC\_ReplaySpectator::GetCurrentReplayTotalTimeInSeconds() const
{
	if (GetWorld())
	{
		if (GetWorld()->DemoNetDriver)
		{
			return GetWorld()->DemoNetDriver->DemoTotalTime;
		}
	}

	return 0.f;
}

int32 APC\_ReplaySpectator::GetCurrentReplayCurrentTimeInSeconds() const
{
	if (GetWorld())
	{
		if (GetWorld()->DemoNetDriver)
		{
			return GetWorld()->DemoNetDriver->DemoCurrentTime;
		}
	}

	return 0.f;
}

void APC\_ReplaySpectator::SetCurrentReplayTimeToSeconds(int32 Seconds)
{
	if (GetWorld())
	{
		if (GetWorld()->DemoNetDriver)
		{
			GetWorld()->DemoNetDriver->GotoTimeInSeconds(Seconds);
		}
	}
}


void APC\_ReplaySpectator::SetCurrentReplayPlayRate(float PlayRate)
{
	if (GetWorld())
	{
		if (GetWorld()->DemoNetDriver)
		{
			GetWorld()->GetWorldSettings()->DemoPlayTimeDilation = PlayRate;
		}
	}
}

### WID\_ReplaySpectator

Now we need to call the previously created functions from somewhere in the UI. To do that, simply create another widget called WID\_ReplaySpectator or similar. To correctly use the functions you'll need two Text Fields to display Current and Max Game Time, a Slider to Change it (and display the Current Progress as a Fraction), a Pause-Button and a ComboBox to select the PlayRate. I've certainly set this up to be minimalistic but you will likely design it your own way anyways:

[![](https://d3ar1piqh1oeli.cloudfront.net/b/bc/ReplayTutorial_ReplaySpectatorWID.png/940px-ReplayTutorial_ReplaySpectatorWID.png)](/index.php?title=File:ReplayTutorial_ReplaySpectatorWID.png)

Replay Spectator Widget Designer

Now switch to the Event Graph and build the following Events/Functions. Starting from the Event Construct, you'll save a Reference to the Replay PC and obtain the total Game Time In Seconds as a new Integer Variable. Then, from Event Tick, obtain the Current Game Time In Seconds. To display them, switch to the Designer and click on the CurrentTime Text. In its properties press the DropDown labelled as "Bind" and create a new Binding. Rename it so that the functions called "CurrentGameTimeToText" and fill in the functionality like in the picture. Then, do the same for the TotalGameTime-Text field.

[![](https://d3ar1piqh1oeli.cloudfront.net/e/e9/ReplayTutorial_ReplaySpectatorGameTimes.png/940px-ReplayTutorial_ReplaySpectatorGameTimes.png)](/index.php?title=File:ReplayTutorial_ReplaySpectatorGameTimes.png)

Replay Spectator Widget, Game Time Related Functions

You might also want to display the current Progress as a fraction. To this end open the designer, select the Slider and under Value, create a new Binding. This will need two more variables that are created now, a Released At value as a float (we will change this later) and a Boolean to decide whether the user has picked up the Slider. Make sure that this bool is set to False as a Standard Value:

[![](https://d3ar1piqh1oeli.cloudfront.net/4/47/ReplayTutorial_ReplaySpectatorSlider.png/940px-ReplayTutorial_ReplaySpectatorSlider.png)](/index.php?title=File:ReplayTutorial_ReplaySpectatorSlider.png)

Replay Spectator Widget, Slider Value Binding

To enable and disable Pause, implement the Button Clicked Function and Bind the Text on this Button according to the following:

[![](https://d3ar1piqh1oeli.cloudfront.net/1/13/ReplayTutorial_ReplaySpectatorPause.png/940px-ReplayTutorial_ReplaySpectatorPause.png)](/index.php?title=File:ReplayTutorial_ReplaySpectatorPause.png)

Replay Spectator Widget, Pause Manipulation Functions

To manipulate the current Playback Rate, simply do the following:

[![](https://d26ilriwvtzlb.cloudfront.net/6/6b/ReplayTutorial_ReplaySpectatorPlayRate.png)](/index.php?title=File:ReplayTutorial_ReplaySpectatorPlayRate.png)

Replay Spectator Widget, PlayRate Manipulation Event

The last thing to do for this widget is to let the users directly manipulate the Slider we provided. We need three events that are linked to the Slider to do this, CaptureBegin, ValueChanged and CaptureEnd. When the Capture Begins, we'll set the PickedUp Boolean to true. On Value Changed, we will store the ReleaseAt Value and on CaptureEnd we will tell the PlayerController->DemoNetDriver and reset the Boolean.

[![](https://d3ar1piqh1oeli.cloudfront.net/4/4a/ReplayTutorial_ReplaySpectatorSlider2.png/940px-ReplayTutorial_ReplaySpectatorSlider2.png)](/index.php?title=File:ReplayTutorial_ReplaySpectatorSlider2.png)

Replay Spectator Widget, Slider Manipulation

### BP\_PC\_ReplaySpectator

We are slowly coming to an end of this tutorial. What is still left missing has to do with our ReplaySpectator-Player Controller. You will need to create a child Blueprint of the C++ class that we created. Right click in the Content Browser and create a Blueprint Class. From here, search for PC\_ReplaySpectator and select it as a parent. Call the new Blueprint "BP\_PC\_ReplaySpectator" or similar, then open it.

From Event BeginPlay, drag out the Execution Pin and create a "Create Widget" node, with Class set to WID\_ReplaySpectator and Owner to Self. Then drag out the Return Value and create a "Add to Viewport" node. Close the Blueprint.

Navigate to the "FirstPersonGameMode" Blueprint from the First Person Example and open it. In here, set the Replay Spectator Player Controller class to the new BP\_PC\_ReplaySpectator.

  

Conclusion, Bugs
----------------

I hope that this tutorial can be of any help to someone, especially since nothing comparable was in the wiki at this point. Of course the UI is very minimalistic, but this was a design choice for the tutorial, since the actual UI you'd use would depend on your own projects.

You will notice that when you switch to a different time, the Cube Meshes and the Player are not initially in the correct position. This is especially apparent if you have your replay set to paused. I'm not quite sure why this happens, yet, but I will update the tutorial when I find it out.

[MrBurgerAt](/index.php?title=User:MrBurgerAt&action=edit&redlink=1 "User:MrBurgerAt (page does not exist)")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Replay\_System\_Tutorial&oldid=143](https://wiki.unrealengine.com/index.php?title=Replay_System_Tutorial&oldid=143)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")