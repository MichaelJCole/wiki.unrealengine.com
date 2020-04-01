 How To Use Sessions In C++ - Epic Wiki             

 

How To Use Sessions In C++
==========================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Known Issues and workarounds](#Known_Issues_and_workarounds)
*   [2 Features for the future](#Features_for_the_future)
*   [3 What is this Tutorial about?](#What_is_this_Tutorial_about.3F)
*   [4 Getting Started](#Getting_Started)
    *   [4.1 Prepare your Project to use Sessions and OnlineSubsystems](#Prepare_your_Project_to_use_Sessions_and_OnlineSubsystems)
        *   [4.1.1 Changing the "DefaultEngine.ini"](#Changing_the_.22DefaultEngine.ini.22)
        *   [4.1.2 Changing the "YourProjectName.Build.cs"](#Changing_the_.22YourProjectName.Build.cs.22)
        *   [4.1.3 Changing the "YourProjectName.h"](#Changing_the_.22YourProjectName.h.22)
    *   [4.2 My TestProject Setup](#My_TestProject_Setup)
*   [5 Code to Create, Find, Join and Destroy Sessions](#Code_to_Create.2C_Find.2C_Join_and_Destroy_Sessions)
    *   [5.1 Terms you will read a lot about](#Terms_you_will_read_a_lot_about)
    *   [5.2 Creating a Session](#Creating_a_Session)
        *   [5.2.1 Creating a Session | Header File](#Creating_a_Session_.7C_Header_File)
        *   [5.2.2 Creating a Session | CPP file](#Creating_a_Session_.7C_CPP_file)
    *   [5.3 Searching and Finding a Session](#Searching_and_Finding_a_Session)
        *   [5.3.1 Searching and Finding a Session | Header File](#Searching_and_Finding_a_Session_.7C_Header_File)
        *   [5.3.2 Searching and Finding a Session | CPP File](#Searching_and_Finding_a_Session_.7C_CPP_File)
    *   [5.4 Joining a Session](#Joining_a_Session)
        *   [5.4.1 Joining a Session | Header file](#Joining_a_Session_.7C_Header_file)
        *   [5.4.2 Joining a Session | CPP file](#Joining_a_Session_.7C_CPP_file)
    *   [5.5 Destroying a Session](#Destroying_a_Session)
        *   [5.5.1 Destroying a Session | Header file](#Destroying_a_Session_.7C_Header_file)
        *   [5.5.2 Destroying a Session | CPP file](#Destroying_a_Session_.7C_CPP_file)
*   [6 BlueprintCallable Functions to test this Setup](#BlueprintCallable_Functions_to_test_this_Setup)
    *   [6.1 Creating a Session](#Creating_a_Session_2)
    *   [6.2 Searching and Finding a Session](#Searching_and_Finding_a_Session_2)
    *   [6.3 Joining a Session](#Joining_a_Session_2)
    *   [6.4 Destroying a Session](#Destroying_a_Session_2)
*   [7 Author Link](#Author_Link)

Known Issues and workarounds
============================

[Template:Warning](/index.php?title=Template:Warning&action=edit&redlink=1 "Template:Warning (page does not exist)") [Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)") [Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

Features for the future
=======================

*   Example of network error handling. Like getting disconnected due to a server shutdown.
*   Example of getting information into UMG. Like the Serverlist.
*   Example of extending the GameSession class. Adding more information to your GameSession.
*   Example of extending several other classes that you can make your Session System unique and you will directly understand the ShooterGame after learning all of this.

What is this Tutorial about?
============================

In this Tutorial, i'm going to show you a very basic Code to Create, Find, Join and Destroy Session in C++. So basically we are going to create the Blueprint Session Nodes.

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)") [Template:Warning](/index.php?title=Template:Warning&action=edit&redlink=1 "Template:Warning (page does not exist)")

  

Getting Started
===============

Prepare your Project to use Sessions and OnlineSubsystems
---------------------------------------------------------

So first of all, we need to get your Project ready to use all of this. I recommend you to start with an empty project, so you can first get an idea how this works, before trying to implement this into your already started project!

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

### Changing the "DefaultEngine.ini"

You can find the "DefaultEngine.ini" file in the Config folder in your top most project folder. You will want to add the following line to it:

`[OnlineSubsystem]
DefaultPlatformService=Null` 

### Changing the "YourProjectName.Build.cs"

You can find this file in your Project when you opened it with Visual Studio. You need to add "OnlineSubsystem", "OnlineSubsystemUtils" (for later usage) and the OnlineSubsystem NULL. It should look similar to this:

using UnrealBuildTool;

public class NetworkSessionTest : ModuleRules
{
    public NetworkSessionTest(TargetInfo Target)
    {
         PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "OnlineSubsystem", "OnlineSubsystemUtils" });

         DynamicallyLoadedModuleNames.Add("OnlineSubsystemNull");
    }
}

### Changing the "YourProjectName.h"

This file can also be found in the Project when you open it with Visual Studio. You want to change

    #include "EngineMinimal.h"

to

    #include "Engine.h"

As well as add these two #includes under the "Engine.h" one.

#include "UnrealNetwork.h"
#include "Online.h"

So your file looks something like this:

#ifndef \_\_NETWORKSESSIONTEST\_H\_\_
#define \_\_NETWORKSESSIONTEST\_H\_\_

#include "Engine.h"
#include "UnrealNetwork.h"
#include "Online.h"
#endif

And that's it for setting up the Project!

My TestProject Setup
--------------------

So, i want to let you know how my test project is setup and what i am using. I create a new fresh C++ Thirst Person Project and added **ONE** Class.

I made a child class of "UGameInstance" and called it "UNWGameInstance". (NW = Network). This is what i am referring to from now on and what you will read when seeing my function. Because every function for Creating, Finding,.. Sessions will be placed here.

  

Code to Create, Find, Join and Destroy Sessions
===============================================

We are using a lot of Unreal Engine 4's functions here. All these functions are placed in an "SessionInterface" that is designed to handle sessions for different OnlineSubsystems. So although we are using "NULL" here, this should also work with Steam and other Subsystems. At least for the basics that all Subsystems share.

These functions all call a so called "delegate" once they are finished doing what they should do. All Session actions can take some time, so these functions are important. We will create 1-2 delegates, handles and functions for every one of these 4 Sessions operations. They will give us information like if the action was successful or not.

### Terms you will read a lot about

Word/Term

Explanation

OnlineSubsystem

OnlineSubsystems are for example "Steam". But you can also use "NULL", which is simply the basic UE4 Subsystem. They all use so called "Wrapper"-Functions. They give us Friend Lists, Unique IDs or Master Server that allow us to find Servers over the Internet and not only on LAN!

Wrapper Functions

Wrapper Functions are something really cool that makes it easy for us to setup the Sessions for all different OnlineSubsystems. While we only need to call "CreateSession", this wrapper function will do the necessary steps to Create a Session in the active Subsystem. So we can create our logic without thinking about Steam or other Subsystems.

Session

A Session is not the Map or the Server itself. A Session is an invisible thing that a Server can Create and a Client can join. They will still need to join the specific Map after joining the Session. A Session is more like an entry in a Database that helps you keeping track of all running Servers.

Session Interface

That is nearly the same as the Session explained above. We will use the Interface instead of the Session itself, because it uses the Wrapper functions we need. We can always get this Internet if we have a valid OnlineSubsystem!

  

Creating a Session
------------------

Yes, let's start with creating a simple Session. I will always post the things we put into the Header file first and after that the logic will fill in with the .cpp File! This will all be placed in the UGameInstance Child class i have created. We don't need other classes.

**So what do we need?**

#### Creating a Session | Header File

First we need a function we can use to gather all the settings we want to use for our Session. Let's call this function "HostSession".

In our UNWGameInstance.h:

/\*\*
\*	Function to host a game!
\*
\*	@Param		UserID			User that started the request
\*	@Param		SessionName		Name of the Session
\*	@Param		bIsLAN			Is this is LAN Game?
\*	@Param		bIsPresence		"Is the Session to create a presence Session"
\*	@Param		MaxNumPlayers	        Number of Maximum allowed players on this "Session" (Server)
\*/
bool HostSession(TSharedPtr<const FUniqueNetId> UserId, FName SessionName, bool bIsLAN, bool bIsPresence, int32 MaxNumPlayers);

The comments explain a lot already, so i will step back from explaining the parameters in the function declarations.

Now we also need the _Delegates_ i talked about earlier. They are used by the "CreateSession" function of the SessionInterface to tell use when the process is done.

In our UNWGameInstance.h:

/\* Delegate called when session created \*/
FOnCreateSessionCompleteDelegate OnCreateSessionCompleteDelegate;
/\* Delegate called when session started \*/
FOnStartSessionCompleteDelegate OnStartSessionCompleteDelegate;

/\*\* Handles to registered delegates for creating/starting a session \*/
FDelegateHandle OnCreateSessionCompleteDelegateHandle;
FDelegateHandle OnStartSessionCompleteDelegateHandle;

So we have a Delegate and a Handle for Creating and Starting a Session. Now we also need a variable we use for the Settings that our Session will have (like LAN or Number of allowed Players):

In our UNWGameInstance.h:

TSharedPtr<class FOnlineSessionSettings> SessionSettings;

And we will also add a Constructor to our GameInstance class, which is called when the Object is created. We need this to bind the functions to the delegates!

In our UNWGameInstance.h

UNWGameInstance(const FObjectInitializer& ObjectInitializer);

And finally, we need a function that we bind to the Delegate, so we can perform some actions once we know that the Creation process is complete:

In our UNWGameInstance.h:

/\*\*
\*	Function fired when a session create request has completed
\*
\*	@param SessionName the name of the session this callback is for
\*	@param bWasSuccessful true if the async action completed without error, false if there was an error
\*/
virtual void OnCreateSessionComplete(FName SessionName, bool bWasSuccessful);

/\*\*
\*	Function fired when a session start request has completed
\*
\*	@param SessionName the name of the session this callback is for
\*	@param bWasSuccessful true if the async action completed without error, false if there was an error
\*/
void OnStartOnlineGameComplete(FName SessionName, bool bWasSuccessful);

Again, the Comments explain the parameters. These function will have different values for their parameters depending on if the process was successful or not!

#### Creating a Session | CPP file

Now we fill these functions with logic.

First of all, we will bind the functions to the delegates in our Constructor:

In our UNWGameIntance.cpp:

UNWGameInstance::UNWGameInstance(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
	/\*\* Bind function for CREATING a Session \*/
	OnCreateSessionCompleteDelegate = FOnCreateSessionCompleteDelegate::CreateUObject(this, &UNWGameInstance::OnCreateSessionComplete);
	OnStartSessionCompleteDelegate = FOnStartSessionCompleteDelegate::CreateUObject(this, &UNWGameInstance::OnStartOnlineGameComplete);
}

All upcoming bindings for the other operations will be placed in this Constructor, under these two binds.

Now let's have a look at the "HostSession" function we created:

In our UNWGameIntance.cpp:

bool UNWGameInstance::HostSession(TSharedPtr<const FUniqueNetId> UserId, FName SessionName, bool bIsLAN, bool bIsPresence, int32 MaxNumPlayers)
{
	// Get the Online Subsystem to work with
	IOnlineSubsystem\* const OnlineSub = IOnlineSubsystem::Get();

	if (OnlineSub)
	{
		// Get the Session Interface, so we can call the "CreateSession" function on it
		IOnlineSessionPtr Sessions = OnlineSub->GetSessionInterface();

		if (Sessions.IsValid() && UserId.IsValid())
		{
			/\* 
				Fill in all the Session Settings that we want to use.
				
				There are more with SessionSettings.Set(...);
				For example the Map or the GameMode/Type.
			\*/
			SessionSettings = MakeShareable(new FOnlineSessionSettings());

			SessionSettings->bIsLANMatch = bIsLAN;
			SessionSettings->bUsesPresence = bIsPresence;
			SessionSettings->NumPublicConnections = MaxNumPlayers;
			SessionSettings->NumPrivateConnections = 0;
			SessionSettings->bAllowInvites = true;
			SessionSettings->bAllowJoinInProgress = true;
			SessionSettings->bShouldAdvertise = true;
			SessionSettings->bAllowJoinViaPresence = true;
			SessionSettings->bAllowJoinViaPresenceFriendsOnly = false;

			SessionSettings->Set(SETTING\_MAPNAME, FString("NewMap"), EOnlineDataAdvertisementType::ViaOnlineService);

			// Set the delegate to the Handle of the SessionInterface
			OnCreateSessionCompleteDelegateHandle = Sessions->AddOnCreateSessionCompleteDelegate\_Handle(OnCreateSessionCompleteDelegate);

			// Our delegate should get called when this is complete (doesn't need to be successful!)
			return Sessions->CreateSession(\*UserId, SessionName, \*SessionSettings);
		}
	}
	else
	{
		GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Red, TEXT("No OnlineSubsytem found!"));
	}

	return false;
}

Since i commented everything and this is VERY similar to the upcoming functions, i will only explain this once:

The first thing we do is getting our OnlineSubsystem, because we need the SessionInterface from it. Once we made sure that it is valid, we get the SessionInterface and make sure this and the UsedId are valid.

Then we set a lot of different SessionSettings, like Number of Players etc. After we did this, we going to setting the delegate of the "CreateSessionsComplete" handle to the one we create and that we bound a functions to. So we make sure, that this is the one getting used and called once the "CreateSession" process is finished. We will do this for every Session operation from now on, so i won't explain this again.

Once we did this, we are going to call the "CreateSession" function of the Session Interface and we are done. Now it could take some seconds until it is finished and the Engine calls our Delegate Functions, which we will fill with logic now:

In our UNWGameIntance.cpp:

void UNWGameInstance::OnCreateSessionComplete(FName SessionName, bool bWasSuccessful)
{
	GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Red, FString::Printf(TEXT("OnCreateSessionComplete %s, %d"), \*SessionName.ToString(), bWasSuccessful));

	// Get the OnlineSubsystem so we can get the Session Interface
	IOnlineSubsystem\* OnlineSub = IOnlineSubsystem::Get();
	if (OnlineSub)
	{
		// Get the Session Interface to call the StartSession function
		IOnlineSessionPtr Sessions = OnlineSub->GetSessionInterface();

		if (Sessions.IsValid())
		{
			// Clear the SessionComplete delegate handle, since we finished this call
			Sessions->ClearOnCreateSessionCompleteDelegate\_Handle(OnCreateSessionCompleteDelegateHandle);
			if (bWasSuccessful)
			{
				// Set the StartSession delegate handle
				OnStartSessionCompleteDelegateHandle = Sessions->AddOnStartSessionCompleteDelegate\_Handle(OnStartSessionCompleteDelegate);

				// Our StartSessionComplete delegate should get called after this
				Sessions->StartSession(SessionName);
			}
		}
		
	}
}

Here again, we will get the OnlineSubsystem and the SessionInterface. This will, again, repeat a lot of times now. Once we made sure that the SessionInterface is valid, we clear the Delegate from the handle, because the call is finished and we want to bind it next time we call "CreateSession". That's why we need to clear it.

After that, we can check if the process was "Successful". If yes, we set the Delegate of the "StartSessionComplete" handle and call the "StartSession" function with the "SessionName" we got. This is already the new Session we created!

This will also take an amount of time but once it is finished, the Engine calls the second Delegate function we created:

In our UNWGameIntance.cpp:

void UNWGameInstance::OnStartOnlineGameComplete(FName SessionName, bool bWasSuccessful)
{
	GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Red, FString::Printf(TEXT("OnStartSessionComplete %s, %d"), \*SessionName.ToString(), bWasSuccessful));

	// Get the Online Subsystem so we can get the Session Interface
	IOnlineSubsystem\* OnlineSub = IOnlineSubsystem::Get();
	if (OnlineSub)
	{
		// Get the Session Interface to clear the Delegate
		IOnlineSessionPtr Sessions = OnlineSub->GetSessionInterface();
		if (Sessions.IsValid())
		{
			// Clear the delegate, since we are done with this call
			Sessions->ClearOnStartSessionCompleteDelegate\_Handle(OnStartSessionCompleteDelegateHandle);
		}
	}

	// If the start was successful, we can open a NewMap if we want. Make sure to use "listen" as a parameter!
	if (bWasSuccessful)
	{
		UGameplayStatics::OpenLevel(GetWorld(), "NewMap", true, "listen");
	}
}

Similar to the first one, we get, check and clear things. Then, if everything is done and the process was again successful, we open a new Level with "listen" as a parameter. This is important!

And that's it. Now we created a Session and started it, so we are ready to get Clients on our Server/Session. But for that we need them to find our Session. So next up is "Finding Sessions".

Searching and Finding a Session
-------------------------------

So, once we are sure that somewhere we have a Session we can find, we can proceed with the following code.

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

#### Searching and Finding a Session | Header File

Function to setup our search and start the searching:

In our UNWGameInstance.h:

/\*\*
\*	Find an online session
\*
\*	@param UserId user that initiated the request
\*	@param bIsLAN are we searching LAN matches
\*	@param bIsPresence are we searching presence sessions
\*/
void FindSessions(TSharedPtr<const FUniqueNetId> UserId, bool bIsLAN, bool bIsPresence);

A delegate and a handle for it:

In our UNWGameInstance.h:

/\*\* Delegate for searching for sessions \*/
FOnFindSessionsCompleteDelegate OnFindSessionsCompleteDelegate;

/\*\* Handle to registered delegate for searching a session \*/
FDelegateHandle OnFindSessionsCompleteDelegateHandle;

A variable for our SearchSettings which will also contain our SearchResults, once this search is complete and successful:

In our UNWGameInstance.h:

TSharedPtr<class FOnlineSessionSearch> SessionSearch;

And finally the function we want to bind to the delegate:

In our UNWGameInstance.h:

/\*\*
\*	Delegate fired when a session search query has completed
\*
\*	@param bWasSuccessful true if the async action completed without error, false if there was an error
\*/
void OnFindSessionsComplete(bool bWasSuccessful);

#### Searching and Finding a Session | CPP File

Now filling this with logic similar to the creation process:

In our UNWGameInstance.cpp:

void UNWGameInstance::FindSessions(TSharedPtr<const FUniqueNetId> UserId, bool bIsLAN, bool bIsPresence)
{
	// Get the OnlineSubsystem we want to work with
	IOnlineSubsystem\* OnlineSub = IOnlineSubsystem::Get();

	if (OnlineSub)
	{
		// Get the SessionInterface from our OnlineSubsystem
		IOnlineSessionPtr Sessions = OnlineSub->GetSessionInterface();

		if (Sessions.IsValid() && UserId.IsValid())
		{
			/\*
				Fill in all the SearchSettings, like if we are searching for a LAN game and how many results we want to have!
			\*/
			SessionSearch = MakeShareable(new FOnlineSessionSearch());

			SessionSearch->bIsLanQuery = bIsLAN;
			SessionSearch->MaxSearchResults = 20;
			SessionSearch->PingBucketSize = 50;
			
			// We only want to set this Query Setting if "bIsPresence" is true
			if (bIsPresence)
			{
				SessionSearch->QuerySettings.Set(SEARCH\_PRESENCE, bIsPresence, EOnlineComparisonOp::Equals);
			}

			TSharedRef<FOnlineSessionSearch> SearchSettingsRef = SessionSearch.ToSharedRef();

			// Set the Delegate to the Delegate Handle of the FindSession function
			OnFindSessionsCompleteDelegateHandle = Sessions->AddOnFindSessionsCompleteDelegate\_Handle(OnFindSessionsCompleteDelegate);
			
			// Finally call the SessionInterface function. The Delegate gets called once this is finished
			Sessions->FindSessions(\*UserId, SearchSettingsRef);
		}
	}
	else
	{
		// If something goes wrong, just call the Delegate Function directly with "false".
		OnFindSessionsComplete(false);
	}
}

Getting OnlineSubsystem etc and filling the SearchSettings variable. Then setting the Delegate to the handle and tell the SessionInterface to "FindSessions". That's all (:

Once this is finished, the Delegate functions is called. We still need to connect these in the Constructor:

In our UNWGameInstance.cpp:

/\*\* Bind function for FINDING a Session \*/
OnFindSessionsCompleteDelegate = FOnFindSessionsCompleteDelegate::CreateUObject(this, &UNWGameInstance::OnFindSessionsComplete);

And the function logic:

In our UNWGameInstance.cpp:

void UNWGameInstance::OnFindSessionsComplete(bool bWasSuccessful)
{
	GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Red, FString::Printf(TEXT("OFindSessionsComplete bSuccess: %d"), bWasSuccessful));

	// Get OnlineSubsystem we want to work with
	IOnlineSubsystem\* const OnlineSub = IOnlineSubsystem::Get();
	if (OnlineSub)
	{
		// Get SessionInterface of the OnlineSubsystem
		IOnlineSessionPtr Sessions = OnlineSub->GetSessionInterface();
		if (Sessions.IsValid())
		{
			// Clear the Delegate handle, since we finished this call
			Sessions->ClearOnFindSessionsCompleteDelegate\_Handle(OnFindSessionsCompleteDelegateHandle);

			// Just debugging the Number of Search results. Can be displayed in UMG or something later on
			GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Red, FString::Printf(TEXT("Num Search Results: %d"), SessionSearch->SearchResults.Num()));
		
			// If we have found at least 1 session, we just going to debug them. You could add them to a list of UMG Widgets, like it is done in the BP version!
			if (SessionSearch->SearchResults.Num() > 0)
			{
				// "SessionSearch->SearchResults" is an Array that contains all the information. You can access the Session in this and get a lot of information.
				// This can be customized later on with your own classes to add more information that can be set and displayed
				for (int32 SearchIdx = 0; SearchIdx < SessionSearch->SearchResults.Num(); SearchIdx++)
				{
					// OwningUserName is just the SessionName for now. I guess you can create your own Host Settings class and GameSession Class and add a proper GameServer Name here.
					// This is something you can't do in Blueprint for example!
					GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Red, FString::Printf(TEXT("Session Number: %d | Sessionname: %s "), SearchIdx+1, \*(SessionSearch->SearchResults\[SearchIdx\].Session.OwningUserName)));
				}
			}
		}
	}
}

After getting the OnlineSubsystem and the SessionInterface, we clear the DelegateHandle again and now we can work with the SearchResults. They are stored in the "SessionSearch" variable we created. "SessionSearch->SearchResults" is an array with all found Sessions. You can get several information from this and later on maybe create your own child class of this to add more information! I'm just printing them to the Screen.

That's all for finding Sessions. Now we can go on and try to join one.

Joining a Session
-----------------

There are different ways you can Join a session, but we will just use a Session result which we can get from the SearchResult array and joined it with help of the SessionInterface. As easy as possible (:

#### Joining a Session | Header file

So the function we are going to use:

In our UNWGameInstance.h:

/\*\*
\*	Joins a session via a search result
\*
\*	@param SessionName name of session
\*	@param SearchResult Session to join
\*
\*	@return bool true if successful, false otherwise
\*/
bool JoinSession(TSharedPtr<const FUniqueNetId> UserId, FName SessionName, const FOnlineSessionSearchResult& SearchResult);

The delegates and the function that we bind to it:

In our UNWGameInstance.h:

/\*\* Delegate for joining a session \*/
FOnJoinSessionCompleteDelegate OnJoinSessionCompleteDelegate;

/\*\* Handle to registered delegate for joining a session \*/
FDelegateHandle OnJoinSessionCompleteDelegateHandle;

In our UNWGameInstance.h:

/\*\*
\*	Delegate fired when a session join request has completed
\*
\*	@param SessionName the name of the session this callback is for
\*	@param bWasSuccessful true if the async action completed without error, false if there was an error
\*/
void OnJoinSessionComplete(FName SessionName, EOnJoinSessionCompleteResult::Type Result);

Nothing fancy as Settings here. Just the functions and the delegates.

#### Joining a Session | CPP file

In our UNWGameInstance.cpp:

bool UNWGameInstance::JoinSession(TSharedPtr<const FUniqueNetId> UserId, FName SessionName, const FOnlineSessionSearchResult& SearchResult)
{
	// Return bool
	bool bSuccessful = false;

	// Get OnlineSubsystem we want to work with
	IOnlineSubsystem\* OnlineSub = IOnlineSubsystem::Get();

	if (OnlineSub)
	{
		// Get SessionInterface from the OnlineSubsystem
		IOnlineSessionPtr Sessions = OnlineSub->GetSessionInterface();

		if (Sessions.IsValid() && UserId.IsValid())
		{
			// Set the Handle again
			OnJoinSessionCompleteDelegateHandle = Sessions->AddOnJoinSessionCompleteDelegate\_Handle(OnJoinSessionCompleteDelegate);
			
			// Call the "JoinSession" Function with the passed "SearchResult". The "SessionSearch->SearchResults" can be used to get such a
			// "FOnlineSessionSearchResult" and pass it. Pretty straight forward!
			bSuccessful = Sessions->JoinSession(\*UserId, SessionName, SearchResult);
		}
	}
		
	return bSuccessful;
}

We are doing nothing new here. Since we have no settings, we are not filling any. We are just taking the SearchResult that was passed and call "JoinSession" once we set the delegate to the handle.

And once this is finished, our function gets called again. Again, don't forget to bind it in the constructor:

In our UNWGameInstance.cpp:

/\*\* Bind function for JOINING a Session \*/
OnJoinSessionCompleteDelegate = FOnJoinSessionCompleteDelegate::CreateUObject(this, &UNWGameInstance::OnJoinSessionComplete);

  

In our UNWGameInstance.cpp:

void UNWGameInstance::OnJoinSessionComplete(FName SessionName, EOnJoinSessionCompleteResult::Type Result)
{
	GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Red, FString::Printf(TEXT("OnJoinSessionComplete %s, %d"), \*SessionName.ToString(), static\_cast<int32>(Result)));

	// Get the OnlineSubsystem we want to work with
	IOnlineSubsystem\* OnlineSub = IOnlineSubsystem::Get();
	if (OnlineSub)
	{
		// Get SessionInterface from the OnlineSubsystem
		IOnlineSessionPtr Sessions = OnlineSub->GetSessionInterface();

		if (Sessions.IsValid())
		{
			// Clear the Delegate again
			Sessions->ClearOnJoinSessionCompleteDelegate\_Handle(OnJoinSessionCompleteDelegateHandle);

			// Get the first local PlayerController, so we can call "ClientTravel" to get to the Server Map
			// This is something the Blueprint Node "Join Session" does automatically!
			APlayerController \* const PlayerController = GetFirstLocalPlayerController();

			// We need a FString to use ClientTravel and we can let the SessionInterface contruct such a
			// String for us by giving him the SessionName and an empty String. We want to do this, because
			// Every OnlineSubsystem uses different TravelURLs
			FString TravelURL;

			if (PlayerController && Sessions->GetResolvedConnectString(SessionName, TravelURL))
			{
				// Finally call the ClienTravel. If you want, you could print the TravelURL to see
				// how it really looks like
				PlayerController->ClientTravel(TravelURL, ETravelType::TRAVEL\_Absolute);
			}
		}
	}
}

Here we are doing something new. After getting the OnlineSubsystem and the SessionInterface, we clear the handle. Then we get the PlayerController of the joining Player. Since we are still on this Player, we can just get the FirstLocal one.

The we create an FString that will hold the TravelURL, which we need for a ClientTravel to the Map of the Server. How do we get the TravelURL? Easy: We tell the SessionInterface to create us one. Just pass the SessionName (which at this point is already the one of the Session we joined!) and the FString. Then we can call the ClientTravel function of the PlayerController and we are on the ServerMap, ready to play!

But now we need to also be able to destroy a Session. This is important, because Sessions take Slots on Servers and prevent us from creating new ones or join others as long as they exist.

Destroying a Session
--------------------

Destroying a Session doesn't need an extra function from us, since we don't need settings or something like that. So we only need the delegate, handle and delegate function:

#### Destroying a Session | Header file

In our UNWGameInstance.h:

/\*\* Delegate for destroying a session \*/
FOnDestroySessionCompleteDelegate OnDestroySessionCompleteDelegate;

/\*\* Handle to registered delegate for destroying a session \*/
FDelegateHandle OnDestroySessionCompleteDelegateHandle;

In our UNWGameInstance.h:

/\*\*
\*	Delegate fired when a destroying an online session has completed
\*
\*	@param SessionName the name of the session this callback is for
\*	@param bWasSuccessful true if the async action completed without error, false if there was an error
\*/
virtual void OnDestroySessionComplete(FName SessionName, bool bWasSuccessful);

#### Destroying a Session | CPP file

Binding the function in the Constructor!

In our UNWGameInstance.cpp:

/\*\* Bind function for DESTROYING a Session \*/
OnDestroySessionCompleteDelegate = FOnDestroySessionCompleteDelegate::CreateUObject(this, &UNWGameInstance::OnDestroySessionComplete);

And filling the function with logic:

In our UNWGameInstance.cpp:

void UNWGameInstance::OnDestroySessionComplete(FName SessionName, bool bWasSuccessful)
{
	GEngine->AddOnScreenDebugMessage(-1, 10.f, FColor::Red, FString::Printf(TEXT("OnDestroySessionComplete %s, %d"), \*SessionName.ToString(), bWasSuccessful));

	// Get the OnlineSubsystem we want to work with
	IOnlineSubsystem\* OnlineSub = IOnlineSubsystem::Get();
	if (OnlineSub)
	{
		// Get the SessionInterface from the OnlineSubsystem
		IOnlineSessionPtr Sessions = OnlineSub->GetSessionInterface();

		if (Sessions.IsValid())
		{
			// Clear the Delegate
			Sessions->ClearOnDestroySessionCompleteDelegate\_Handle(OnDestroySessionCompleteDelegateHandle);

			// If it was successful, we just load another level (could be a MainMenu!)
			if (bWasSuccessful)
			{
				UGameplayStatics::OpenLevel(GetWorld(), "ThirdPersonExampleMap", true);
			}
		}
	}
}

Doing the same with the OnlineSubsystem and the SessionInterface again and once the destruction was successful, we Open the start level again, which could be the MainMenu for example.

And that's it, this is all you need for a basic setup. You can now create Widgets or so that can use these functions, **BUT** you can't make these functions BlueprintCallable. You need a second function for each process that is BlueprintCallable.

BlueprintCallable Functions to test this Setup
==============================================

Creating a Session
------------------

In our UNWGameInstance.h:

UFUNCTION(BlueprintCallable, Category = "Network|Test")
void StartOnlineGame();

In our UNWGameInstance.cpp:

void UNWGameInstance::StartOnlineGame()
{
	// Creating a local player where we can get the UserID from
	ULocalPlayer\* const Player = GetFirstGamePlayer();
	
	// Call our custom HostSession function. GameSessionName is a GameInstance variable
	HostSession(Player->GetPreferredUniqueNetId(), GameSessionName, true, true, 4);
}

  

Searching and Finding a Session
-------------------------------

In our UNWGameInstance.h:

UFUNCTION(BlueprintCallable, Category = "Network|Test")
void FindOnlineGames();

In our UNWGameInstance.cpp:

void UNWGameInstance::FindOnlineGames()
{
	ULocalPlayer\* const Player = GetFirstGamePlayer();

	FindSessions(Player->GetPreferredUniqueNetId(), true, true);
}

Joining a Session
-----------------

In our UNWGameInstance.h:

UFUNCTION(BlueprintCallable, Category = "Network|Test")
void JoinOnlineGame();

In our UNWGameInstance.cpp:

void UNWGameInstance::JoinOnlineGame()
{
	ULocalPlayer\* const Player = GetFirstGamePlayer();

	// Just a SearchResult where we can save the one we want to use, for the case we find more than one!
	FOnlineSessionSearchResult SearchResult;

	// If the Array is not empty, we can go through it
	if (SessionSearch->SearchResults.Num() > 0)
	{
		for (int32 i = 0; i < SessionSearch->SearchResults.Num(); i++)
		{
			// To avoid something crazy, we filter sessions from ourself
			if (SessionSearch->SearchResults\[i\].Session.OwningUserId != Player->GetPreferredUniqueNetId())
			{
				SearchResult = SessionSearch->SearchResults\[i\];

				// Once we found sounce a Session that is not ours, just join it. Instead of using a for loop, you could
				// use a widget where you click on and have a reference for the GameSession it represents which you can use
				// here
				JoinSession(Player->GetPreferredUniqueNetId(), GameSessionName, SearchResult);
				break;
			}
		}
	}	
}

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

  

Destroying a Session
--------------------

In our UNWGameInstance.h:

UFUNCTION(BlueprintCallable, Category = "Network|Test")
		void DestroySessionAndLeaveGame();

In our UNWGameInstance.cpp:

void UNWGameInstance::DestroySessionAndLeaveGame()
{
	IOnlineSubsystem\* OnlineSub = IOnlineSubsystem::Get();
	if (OnlineSub)
	{
		IOnlineSessionPtr Sessions = OnlineSub->GetSessionInterface();

		if (Sessions.IsValid())
		{
			Sessions->AddOnDestroySessionCompleteDelegate\_Handle(OnDestroySessionCompleteDelegate);

			Sessions->DestroySession(GameSessionName);
		}
	}
}

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

Author Link
===========

[eXi](/index.php?title=User:EXi&action=edit&redlink=1 "User:EXi (page does not exist)") ([talk](/index.php?title=User_talk:EXi&action=edit&redlink=1 "User talk:EXi (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_To\_Use\_Sessions\_In\_C%2B%2B&oldid=131](https://wiki.unrealengine.com/index.php?title=How_To_Use_Sessions_In_C%2B%2B&oldid=131)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")