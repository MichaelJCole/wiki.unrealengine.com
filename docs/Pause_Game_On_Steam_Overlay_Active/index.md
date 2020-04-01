 Pause Game On Steam Overlay Active - Epic Wiki             

 

Pause Game On Steam Overlay Active
==================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 Overall Picture.](#Overall_Picture.)
*   [3 Setting up your Project for Steam.](#Setting_up_your_Project_for_Steam.)
*   [4 Creating C++ Classes](#Creating_C.2B.2B_Classes)
    *   [4.1 Custom Game Instance](#Custom_Game_Instance)
    *   [4.2 Creating Steam Manager](#Creating_Steam_Manager)
    *   [4.3 Creating Game Instance Blueprint](#Creating_Game_Instance_Blueprint)
*   [5 Coding Game Instance](#Coding_Game_Instance)
    *   [5.1 YourGameInstance.h](#YourGameInstance.h)
    *   [5.2 YourGameInstance.cpp](#YourGameInstance.cpp)
*   [6 Coding SteamManager](#Coding_SteamManager)
    *   [6.1 SteamManager.h](#SteamManager.h)
    *   [6.2 SteamManager.cpp](#SteamManager.cpp)
*   [7 Blueprint Setup](#Blueprint_Setup)
*   [8 Extra Reading](#Extra_Reading)

### Introduction

Original Author: [Motanum](/index.php?title=User:Motanum&action=edit&redlink=1 "User:Motanum (page does not exist)") ([Talk](/index.php?title=User_talk:Motanum&action=edit&redlink=1 "User talk:Motanum (page does not exist)"))

This guide will help you to trigger a Blueprint Function that can pause your game when the Steam Overlay becomes active. Keep in mind that this guide requires creating cpp classes. A basic understanding of programming is suggested, though the guide is made to be able to follow it step by step. I will provide the full necessary code, and will explain how it works. We do NOT need to modify the engine code to achieve our goals.

**IMPORTANT!** The guide assumes that you already have a STEAM APP ID for your game and a build of it on Steamworks, which you can launch via Steam as if you were a normal Steam user.

The purpose of this guide is also to serve as an introduction to Steam Callbacks, so you can get started doing other functions with the help of Steamworks.

This Guide assumes that you already have a game, and the functionality to pause that game via Blueprints. If you are using CPP, then you are likely more knowledgeable than me, and should be able to achieve your goals after reading this guide.

Overall Picture.
----------------

The game which this guide is based on is Musical Range VR. So you may see multiple references to it on the guide. In the case of my game, I want the game to pause a song if the Steam Overlay becomes active. I already have a function in blueprints to pause the song in my game from a menu, so all I need is the game to automatically trigger it.

[![](https://d26ilriwvtzlb.cloudfront.net/c/c3/Image1.png)](/index.php?title=File:Image1.png)

Pause Song Script

Your game will need a [Game Instance class](/index.php?title=Game_Instance,_Custom_Game_Instance_For_Inter-Level_Persistent_Data_Storage "Game Instance, Custom Game Instance For Inter-Level Persistent Data Storage"). This class can handle a bunch of variables regardless of the map you are in or if you are transitioning to another map. The Game Instance will contain a variable to a SteamManager class. The Steam Manager will have a Steam Callback, which just means that Steam will trigger a function inside of SteamManager when an event happens. Then, SteamManager will trigger a blueprint event from Game Instance. We will then create a Blueprint Class based from our Custom Game Instance, and there we can code the functionality for the pause in blueprints.

It’s very simple in theory, but the code to get it to work with Steam can be a bit tricky if you are new to the SteamAPI or are just starting to include more code in your project. I spent a lot of time fighting countless of compilation errors and crashes. I hope this will help you to get this simple functionality quickly.

Setting up your Project for Steam.
----------------------------------

For the Steam Callbacks to work, be sure to set up the Steam SDK for your project. Rama made a great tutorial on how to achieve that. So just follow his [guide](/index.php?title=Steam,_Using_the_Steam_SDK_During_Development "Steam, Using the Steam SDK During Development").

Also, stop by this guide and take a look at the [Requirements](/index.php?title=Steam_workshop#Requirements "Steam workshop") step.

Creating C++ Classes
--------------------

### Custom Game Instance

Once you’ve finished setting up Steam SDK. It’s time to create a new Game Instance class if your game doesn’t have one. On the UE4 editor select Edit > New C++ Class. On the window tick Show All Class. Search for GameInstance as select it as our base class.

[![](https://d26ilriwvtzlb.cloudfront.net/a/ab/MotanumTutorial1-Image2.png)](/index.php?title=File:MotanumTutorial1-Image2.png)

CPP CLass Creation

Give your class a name. A good idea would be to call it YourGameNameInstance. Mine is Called MusicalRangeInstance. It doesn’t need to be placed on the Public or Private locations. Create the class and wait for the game to compile the new class.

### Creating Steam Manager

Next, we will create our new class SteamManager. Again go to select Edit > New C++ Class on the UE4 editor. This time search for Object, and select it as our Parent class. You will know it’s the correct base class if it says it will include "UObject/NoExportTypes.h". Name it SteamManager and create the class. Wait for the game to compile the newly created class. Once done, it’s time to go to Visual Studio.

### Creating Game Instance Blueprint

Before we can start coding the game instance, it’s a good idea to create a blueprint out from our newly created (but empty) Game Instance class, and set it up in your project. So that as we add more functionality and compile the C++ code, it will be reflected in the game. Else, you might think your game instance doesn’t work. If you already have a working Game Instance Blueprint based from YourGameInstance class, you may skip this step.

Right Click YourGameInstance c++ class on the content browser and select Create Blueprint class based from YourGameInstance. I recommend the name BP\_YourGameInstance, to differentiate between the c++ and blueprint version. Place the newly created blueprint in your place of preference.

[![Creating Blueprint Class from CPP Class](https://d26ilriwvtzlb.cloudfront.net/e/e0/MotanumTutorial1-Image3.jpg)](/index.php?title=File:MotanumTutorial1-Image3.jpg "Creating Blueprint Class from CPP Class")

Next, go to project settings. Under Projects select Maps and Modes. Then, on the Game Instance option, select your BP\_YourGameInstance. Because BP\_YourGameInstance is based on YourGameInstance, any changes we do in code to YourGameInstance, will be reflected in the blueprint version.

Coding Game Instance
--------------------

We’ll start by working with YourGameInstance.h. Start by adding #include “SteamManager.h” to the include list. Then we’ll go to the body of YourGameInstance class and add the following inside.

### YourGameInstance.h

<syntaxhighlight lang="cpp">

1.  pragma once

1.  include "Engine/GameInstance.h"
2.  include "SteamManager.h"
3.  include "YourGameInstance.generated.h"

/\*\*

\* 
\*/

UCLASS() class MUSICALRANGE\_API UYourGameInstance : public UGameInstance { GENERATED\_BODY()

private:

protected:

public: UYourGameInstance(); ~UYourGameInstance();

UPROPERTY(BlueprintReadOnly, Category = "Steamworks") USteamManager\* SteamManager;

UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Steamworks") bool IsSteamOverlayActive;

const bool EnableUSteamManagerFeatures = true;

/\* \* Fire this from Blueprints to tell the actor when to initialize CPP elements \*/ UFUNCTION(BlueprintCallable, Category = "Steamworks") bool InitializeCPPElements();

/\*A function pair that can be called externally executes OnSteamOverlayIsActive()\*/ void PublicOnSteamOverlayIsON(); void PublicOnSteamOverlayIsOFF();

UFUNCTION(BlueprintImplementableEvent, Category = "Steamworks") void OnSteamOverlayIsActive(bool isOverlayActive); }; </syntaxhighlight>

First we have some constructor and deconstructors, which you may or may not need. Depends on your game needs. Next we are creating a USteamManager variable inside of YourGameInstance class, which will contain the class that receives the information from Steam.

Following that we have a bool variable. This can be read from blueprint at any time from the game instance if you want to know if the overlay is active. Notice it is BlueprintReadOnly, as it will only be modified by one function to make sure the value is always correct.

Then, we also have a constant bool value, in case you want to disable the SteamManager features globally for testing purposes. Below that we have a function that we are going to call on blueprints to initialize the CPP elements of the Game Instance. We do this, because there may be some maps, that you don’t want the Game Instance to start enabling SteamManager. For example, if you have an introduction or credit’s level at the beginning of the game launch.

Next we have a pair of functions PublicOnSteamOverlayIsON() and PublicOnSteamOverlayIsOFF(). This are 2 functions that can be called by outside actors to trigger the OnSteamOverlayIsActive blueprint event. The reason we have two functions instead of one while passing a value will be explained later on.

Finally, the function void OnSteamOverlayIsActive(bool isOverlayActive); is an event that will trigger on blueprint. Think of it like a Custom Event, or a Begin Play. The UFUNCTION is what gives it this functionality, and makes it special. As we won’t have to define that function in the cpp file. It must be fired internally by the owner class, thus we needed the other two public functions.

Next, it’s time to modify the CPP file. Add in the following to the body of YourGameInstance.cpp below the include list.

### YourGameInstance.cpp

The full CPP file is the following.

<syntaxhighlight lang="cpp">

1.  include "YourGame.h"
2.  include "YourGameInstance.h"

//Musical Range Game Instance Elements UYourGameInstance::UYourGameInstance() { }

UYourGameInstance::~UYourGameInstance() { }

bool UYourGameInstance::InitializeCPPElements() { if (EnableUSteamManagerFeatures) { if (SteamUser() != nullptr) //Is the Steam API initialized? { UE\_LOG(LogSteamworks, Log, TEXT("CPP InitializeCPPElements() through USteamManager")); SteamManager = NewObject<USteamManager>(this); //Use NewObject if outside of the Constructor UE\_LOG(LogSteamworks, Log, TEXT("New Object USteamManager created!")); SteamManager->InitializeSteamManager(); UE\_LOG(LogSteamworks, Log, TEXT("SteamManager Initialization Finished")); SteamManager->AssignGameInstance(this); UE\_LOG(LogSteamworks, Log, TEXT("CPP InitializeCPPElements() SUCCESS!")); return true; } else { UE\_LOG(LogSteamworks, Warning, TEXT("CPP InitializeCPPElements() FAILED! NO STEAM LOGON")); return false; } } else { UE\_LOG(LogSteamworks, Log, TEXT("Custom Steamworks Features NOT Initialized.")); UE\_LOG(LogSteamworks, Log, TEXT("Change EnableUSteamManagerFeatures to True.")); } return false; }

void UYourGameInstance::PublicOnSteamOverlayIsON() { UE\_LOG(LogSteamworks, Log, TEXT("PublicOnSteamOverlayIsON Called. Setting isSteamOverlayActive")); IsSteamOverlayActive = true; this->OnSteamOverlayIsActive(true); UE\_LOG(LogSteamworks, Log, TEXT("OnSteamOverlayIsActive Has been triggered")); }

void UYourGameInstance::PublicOnSteamOverlayIsOFF() { UE\_LOG(LogSteamworks, Log, TEXT("PublicOnSteamOverlayIsON Called. Setting isSteamOverlayActive")); IsSteamOverlayActive = false; this->OnSteamOverlayIsActive(false); UE\_LOG(LogSteamworks, Log, TEXT("OnSteamOverlayIsActive Has been triggered")); } </syntaxhighlight>

Notice the UE\_LOG in the code. This serve as debug functions, to know what the game is doing. You will need to define the keyword “LogSteamworks” in YourGame.h and YourGame.cpp. To learn more about UE\_LOG you can read this [guide](/index.php?title=Logs,_Printing_Messages_To_Yourself_During_Runtime "Logs, Printing Messages To Yourself During Runtime").

First, we have our consturctors and deconstructors. We don’t need them, but if you do, then you may use them here. Next we have InitializeCPPElements(). We have an If statement, to execute the code only if we decided to enable it previously with the variable EnableUSteamManagerFeatures.

Next we do another if statement to check that Steamworks was properly Setup. I use (SteamUser() != nullptr) to check for this. If False, I return an error that there is no Steam Log on. This has to be used, as if it’s false while being on the editor or other game dev environments, the game may crash or create bugs.

Then, we initialize the variable of SteamManager by creating a new object and storing it in the SteamManager variable.

<syntaxhighlight lang="cpp"> SteamManager = NewObject<USteamManager>(this); </syntaxhighlight>

The next function is going to initialize SteamManager with the elements it needs in order to function properly. We haven’t written this function yet in the SteamManager yet, so we will get a Visual Studio telling us about it. Just ignore it for now.

<syntaxhighlight lang="cpp"> SteamManager->InitializeSteamManager(); </syntaxhighlight>

Afterwards, we have to store a reference of YourGameInstance inside of SteamManager, so that the SteamManager knows which class has to fire the events for when Steam tells SteamManager it’s time to do so.

<syntaxhighlight lang="cpp"> SteamManager->AssignGameInstance(this); </syntaxhighlight>

Again, we haven’t actually created the function for AssignGameInstance() yet in SteamManager, so VS will throw an error. For now we’ll ignore it.

Next we have the function PublicOnSteamOverlayIsON(). This function will be called by SteamManager when we get a Steam callback saying that the Steam Overlay was activated with a true value. In the function, we first write a UE\_LOG(), to know that the function was called properly by SteamManager.

Then, we set the bool variable of YourGameInstance to true. Remember, we are in the ON version of the function. Then, we launch the blueprint event node OnSteamOverlayIsActive() with a true value. We could have the variable IsSteamOverlayActive, feel free to use that if you want.

<syntaxhighlight lang="cpp"> this->OnSteamOverlayIsActive(true); </syntaxhighlight>

We use the this-> keyword as explained by Rama in his [guide](/index.php?title=Blueprints,_Empower_Your_Entire_Team_With_BlueprintImplementableEvent "Blueprints, Empower Your Entire Team With BlueprintImplementableEvent") to know ourselfs that we are not calling a C++ function, but a blueprint script function.

Finally, another UE\_LOG() to know that the function has finished. By the time this log is print, the game should be pause if you followed the rest of the guide properly.

For the OFF version of the function, we copy the contents of the ON version and just change the bool keyword from true to false.

And that is all we need for now for YourGameInstance.

Coding SteamManager
-------------------

Before we start coding SteamManager. I recommend you read the Getting Started page from Steamworks, to get familiar with how Steamworks works and how to use it in general.

[https://partner.steamgames.com/documentation/getting\_started](https://partner.steamgames.com/documentation/getting_started)

Once you read that link, and are more comfortable with what a Callback is, it’s time to fill in the class for SteamManager.

### SteamManager.h

The full SteamManager header is the following.

<syntaxhighlight lang="cpp">

1.  pragma once

1.  include "ThirdParty/Steamworks/Steamv132/sdk/public/steam/steam\_api.h"
2.  include "UObject/NoExportTypes.h"
3.  include "SteamManager.generated.h"

/\*~~~ Forward Declarations ~~~\*/ class UYourGameInstance;

/\*\*

\* 
\*/

UCLASS() class MUSICALRANGE\_API USteamManager : public UObject { GENERATED\_BODY()

private: //Steam Callback Setups //Using STEAM\_CALLBACK\_MANUAL() STEAM\_CALLBACK\_MANUAL(USteamManager, OnSteamOverlayActive, GameOverlayActivated\_t, OnSteamOverlayActiveCallback);

public: USteamManager(); ~USteamManager();

void InitializeSteamManager(); void AssignGameInstance(UYourGameInstance \*NewYourGameInstance);

UPROPERTY(BlueprintReadOnly, Category = "Musical Range") UYourGameInstance \*YourGameInstance; }; </syntaxhighlight>

Make sure to include the steam\_api.h functions! They will be our way into accessing the steamworks information. Remember to keep the .generated.h file at the end of the include list! Else your compilation will fail.

Next, we need to do a Forward Declaration. Again, you may learn more about them from another [guide](/index.php?title=Forward_Declarations "Forward Declarations") written by Rama. The basics of it is that YourGameInstance has a variable of class SteamManager, but SteamManager also has a class of YourGameInstance. You can see how we have this full circle reference going on. So, a forward declaration will “weakly” define UYourGameInstance, so that the compilation doesn’t fail.

Next, we set up our Steam Callback using STEAM\_CALLBACK\_MANUAL(). Using STEAM\_CALLBACK will fail to compile with UCLASS, so do NOT use those for a UCLASS. The only difference, as I can tell, is that by using STEAM\_CALLBACK\_MANUAL() we need to register the callbacks in the CPP file before they can work, which is no hassle at all.

We are using:

<syntaxhighlight lang="cpp"> STEAM\_CALLBACK\_MANUAL(USteamManager, OnSteamOverlayActive, GameOverlayActivated\_t, OnSteamOverlayActiveCallback); </syntaxhighlight>

USteamManager is the class where the Steam callback is handled.

Next we have the function that will be triggered inside SteamManager.cpp when the Steam callback is fired. Don’t confuse it with the function OnSteamOverlayIsActive() over at YourGameInstance. I bet you can come up with better names than me. You can think of GameOverlayActivated\_t as a variable/structure type that is responsible for the GameOverlay. Its name is set by steam. You can read the Steam Api for more callbacks that suit your needs.

OnSteamOverlayActiveCallback is an element we will use to register the callback on the cpp file.

On the public segment, we have our constructor and deconstructor. Then we create those 2 functions that we called in YourGameInstance.cpp, InitializeSteamManager() and AssignGameInstance().

Finally we have a variable to store YourGameInstance ioth it’s UPROPERTY() macro.

### SteamManager.cpp

The full cpp file for SteamManager is the following.

<syntaxhighlight lang="cpp">

1.  include "YourGame.h"
2.  include "SteamManager.h"
3.  include "YourGameInstance.h"
4.  include "Async.h"

USteamManager::USteamManager() { UE\_LOG(LogSteamworks, Log, TEXT("USteamManager Constructor Called")); }

USteamManager::~USteamManager() { }

void USteamManager::InitializeSteamManager() { UE\_LOG(LogSteamworks, Log, TEXT("Initializing USteamManager")); OnSteamOverlayActiveCallback.Register(this, &USteamManager::OnSteamOverlayActive); UE\_LOG(LogSteamworks, Log, TEXT("OnSteamOverlayActiveCallback.Register called")); }

void USteamManager::AssignGameInstance(UMusicalRangeInstance \*NewYourGameInstance) { YourGameInstance = NewYourGameInstance; UE\_LOG(LogSteamworks, Log, TEXT("New Game Instance Assigned to USteamManager")); }

void USteamManager::OnSteamOverlayActive(GameOverlayActivated\_t \*pCallbackData) { UE\_LOG(LogSteamworks, Log, TEXT("Intercepted the Steam Overlay callback")); const bool isCurrentOverlayActive = ((pCallbackData->m\_bActive) != (0));; UE\_LOG(LogSteamworks, Log, TEXT("isCurrentOverlayActive = %d"), isCurrentOverlayActive); YourGameInstance; //So that the call list reference on the Lambda works

if (isCurrentOverlayActive) { AsyncTask(ENamedThreads::GameThread, \[&\]() { UE\_LOG(LogSteamworks, Log, TEXT("Running inside AsyncTask() TRUE")); YourGameInstance->PublicOnSteamOverlayIsON(); UE\_LOG(LogSteamworks, Log, TEXT("Exiting AsyncTask()")); }); } else { AsyncTask(ENamedThreads::GameThread, \[&\]() { UE\_LOG(LogSteamworks, Log, TEXT("Running inside AsyncTask() FALSE")); YourGameInstance->PublicOnSteamOverlayIsOFF(); UE\_LOG(LogSteamworks, Log, TEXT("Exiting AsyncTask()")); }); } UE\_LOG(LogSteamworks, Log, TEXT("OnSteamOverlayActive() at SteamManager Finished")); } </syntaxhighlight>

Notice the extensive use of UE\_LOG(). You may remove them or keep them to your liking.

Be sure to include YourGameInstance. We need access to the function PublicOnSteamOverlayIsActive() later on. Because the Header file get compiled first, by the time the compiler gets to the cpp file, it will already know that PublicOnSteamOverlayIsActive() exist and will work. This is thanks to the Forward Declaration we did in the header file. Also don’t forget to include Async.h! This is the key to avoiding crashesto desktop.

First we have our constructor and deconstructor.

Then we have the function to initialize the SteamManager elements. Because we are using STEAM\_CALLBACK\_MANUAL(), we need to register the callback at some time, before the callback will work. I decided to place OnSteamOverlayActiveCallback.Register(this, &USteamManager::OnSteamOverlayActive); inside of the function InitializeSteamManager(), to have better control of when the callbacks are registered. You may put that line in the constructor of SteamManager. Be careful of having it multiple times, as it may produce multiple callback calls. Next, we have the AssignGameInstance() function. In there, we simply copy the new Game Instance into our variable. This will ensure that when we call the function YourGameInstance->PublicOnSteamOverlayIsActive() it will not be a null pointer and cause errors or a crash.

Finally, we have OnSteamOverlayActive(). I recommend you leave the UE\_LOG() that are in the code, as they can help you a lot when you debug why something may not work. It’s better to add many at first and then remove some when it all works, rather than put a few, and have to recompile everything because you need more information.

Notice that we did not define that function OnSteamOverlayActive() as we regularly would in the header file. The macro STEAM\_CALLBACK\_MANUAL did that for us already at compile time. Note that all functions made with the macro must be void. The parameter for the function is “GameOverlayActivated\_t \*pCallbackData”. The pointer name can be defined by you. Some documentation name it as pResult.

Inside the function, we create a constant bool variable where we copy the callback result. Is the Overlay active or not? Something weird is that pCallbackData->m\_bActive actually returns a uint8, so it can’t be just placed in a Boolean variable with the equal operator. Instead I make a not equal comparison to 0, which yields an equivalent result. If bActive is true, then it’s not equal to zero, so a true is stored for isCurrentOverlayActive. If bActive is false, then it is equal to zero, so a false is stored for isCurrentOverlayActive. A weird extra step that is no problem.

For debugging purposes I decided to have a UE\_LOG output the state of the steam overlay. I recommend you keep these logs for callbacks results, as they can be helpful when debugging. Following that we write in the name of the variable holding YourGameInstance.

Next we have an If statement to split the function we are going to call based on the value of isCurrentOverlayActive. If it is true, then we are going to execute PublicOnSteamOverlayIsON(). Inside it is a function called AsyncTask(). AsyncTask() is the key to avoiding your game crash when you try to run something from the SteamCallback. Basically, when we get the Steam Callback, it is not in the Game Thread, so if we tried to do YourGameInstance->PublicOnSteamOverlayON() the game will crash. AsyncTask() takes 2 parameters. The first, what thread we want the code to run in, and the second a lambda, which is the code you want to run.

For the thread we do ENamedThreads::GameThread. The lambda is a bit more complicated if you haven’t worked with them. You can read more about them [here](http://en.cppreference.com/w/cpp/language/lambda). The basics of it so we can get our code to work is the following

<syntaxhighlight lang="cpp"> \[&\]( ) { //Your Code here. } </syntaxhighlight>

The square brackets ask us what variables we want the Lambda to capture to be used. The & symbol tells it that we want to make use of references of the variables used on the function. Thus, we wrote before YourGameInstance; before, so that the lambda would get access to your game instance. Then, the parenthesis asks for any intput parameters. We don’t need any of them.

Then the lines of code

<syntaxhighlight lang="cpp"> UE\_LOG(LogSteamworks, Log, TEXT("Running inside AsyncTask() TRUE")); YourGameInstance->PublicOnSteamOverlayIsON(); UE\_LOG(LogSteamworks, Log, TEXT("Exiting AsyncTask()")); </syntaxhighlight>

Will tell us when the callback has entered the AsyncTask() function and when it is about to leave the function. And inside the AsyncTask() function we call PublicOnSteamOverlayIsON(); This will trigger in turn OnSteamOverlayIsActive(), which will trigger our blueprint node to pause the game.

We do a similar code for the else part of the if statement. Be sure to change the called function to the OFF version. And that is all we need for the SteamManager.cpp.

Blueprint Setup
---------------

Now, it’s up to you how to code your new blueprint node so that it will pause your game. For example, I will show the blueprint code I used to pause the song if it is playing in Musical Range VR. My set up is that the game is running a blueprint based from MusicalRangeInstance (My YourGameInstance). I have a floor monitor actor, which has a reference to pretty much every other actor in the scene and handles starting a song, setting options, etc.

So, my BP\_MusicalRangeInstance fires the OnSteamIsActive() blueprint event, which in turns tells the FloorMonitorUI to pause the song if possible. The Floor Monitor then tells the actual Actor playing to wav to pause the song.

[![](https://d26ilriwvtzlb.cloudfront.net/0/07/MotanumTutorial1-Image4.png)](/index.php?title=File:MotanumTutorial1-Image4.png)

On Begin Play at the FloorMonitor.

[![](https://d26ilriwvtzlb.cloudfront.net/f/fc/MotanumTutorial1-Image5.png)](/index.php?title=File:MotanumTutorial1-Image5.png)

BP\_MusicalRangeInstance – Event On Steam Overlay Is Active

[![](https://d26ilriwvtzlb.cloudfront.net/c/c3/Image1.png)](/index.php?title=File:Image1.png)

BP\_FloorMonitorUI – Pause Song

Extra Reading
-------------

Other resources which might be of your interest about Steamworks are listed below.

*   Link [Workshop Creation](/index.php?title=Steam_workshop "Steam workshop") asset guide

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Pause\_Game\_On\_Steam\_Overlay\_Active&oldid=621](https://wiki.unrealengine.com/index.php?title=Pause_Game_On_Steam_Overlay_Active&oldid=621)"