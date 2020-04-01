Online-Multiplayer - Epic Wiki                    

Online-Multiplayer
==================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.9

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png)

**Some or all of the information on this page is inconsistent, irrelevant or confusing.**

Please help clean it up if you are able.

Contents
--------

*   [1 Unreal Engine and Online Multiplayer with the OnlineSubSystem](#Unreal_Engine_and_Online_Multiplayer_with_the_OnlineSubSystem)
    *   [1.1 Intro](#Intro)
    *   [1.2 Part 1 – Life Cycle of a Game Session](#Part_1_.E2.80.93_Life_Cycle_of_a_Game_Session)
        *   [1.2.1 Creating a Session](#Creating_a_Session)
        *   [1.2.2 Starting a Session](#Starting_a_Session)
        *   [1.2.3 Updating a Session, Find and Join a Session](#Updating_a_Session.2C_Find_and_Join_a_Session)
        *   [1.2.4 End a Session](#End_a_Session)
        *   [1.2.5 Destroy a Session](#Destroy_a_Session)
    *   [1.3 Part 2 – Class and interface overview.](#Part_2_.E2.80.93_Class_and_interface_overview.)
    *   [1.4 Part 3 – An Implementation](#Part_3_.E2.80.93_An_Implementation)
    *   [1.5 Part 4 – I want the easy way out](#Part_4_.E2.80.93_I_want_the_easy_way_out)
    *   [1.6 Related Topics](#Related_Topics)

Unreal Engine and Online Multiplayer with the OnlineSubSystem
=============================================================

Intro
-----

Author [Kristoffer “mbk” Olsson](https://madebykrol.wordpress.com/about/), [link to original article](https://madebykrol.wordpress.com/2015/05/21/unreal-engine-and-online-multiplayer/).

I have been working on getting Possession up and running for multiplayer testing, so I thought I should cover what I learned while doing that. Basic actor replication and game mechanics is one thing, getting your game to actually run online is by itself a great challenge, and maybe this post will help any one else understanding how Unreal Engine 4 works with online gameplay.

This article is written as a brain dump to recall my research on the online subsystem so it might be flawed. Leave a comment and I will try to edit this article if I’ve made errors to keep it relevant.

Unreal engine provides all the basics needed to host and join a game out of the box but you will eventually need to get your hands dirty with the Online Sub System. During development you can try out replication and see how your game will run in a multiplayer environment from the editor, just add another player when you run a preview of your game and you can start testing your game with multiplayer features. However, once you are out of the editor the simple action of joining a server is no longer as trivial. Inside the editor unreal engine provides you with a **Online Sub System**, this system is no longer present once you are in a standalone game instance. What you need to do is implement this on your own, or use one of the provided ones, for development purposes the **OnlineSubSystemNull** is suggested which only work for LAN gameplay.

he first step from here would be to take a look at how ShooterGame works, especially how it is creating an online session, how to finding and joining a session and once you are finished playing, destroying a session. The second step from that would be to start ripping ShooterGame apart, applying some basic session operations to your game, and testing them with the Null system. When you are ready to ship your game, or want to test out internet gameplay, you can create your own subsystem that enables online multiplayer, which is quite a grand task. Or you have the option to opt in to publish your game on Steam. Then there is not much to it, from the Engines Point of view, you enable the **OnlineSubSystemSteam**, download and reference the Steamworks SDK. But if your game is not designed to run on a PC or you don’t want to use steam there are other options! UE4 supports Subsystems for; XboxLive, PSN, Google Play, Game Center and more!

Let’s begin by taking a look at how to use the OnlineSubSystem in your game to provide online / LAN multiplayer. The first thing that you need to do is enable the OnlineSubSystem module in your project. Open your **.Build.cs** and uncomment the line for the OnlineSubsystemNull module. Mine looks like this: **DynamicallyLoadedModuleNames.Add(“OnlineSubsystemNull”);** There are two ways to approach getting your game to handle game sessions in the next step. One is more involved and complicated, the other very straight forward and easy. One in c++ and one in blueprint (As of **UE 4.9**)! Let’s go with the hard, complicated and fun option first!

Again, here is a good time to start brushing over the ShooterGame example. This complete process is covered with elegance in its source code.

Before we dig any deeper in an implementation we need to cover some concepts of how Sessions are handled by the subsystem, this will make it easier to understand how to build it in c++ and the complex code of ShooterGame will seem much more clear and easy to follow.

Part 1 – Life Cycle of a Game Session
-------------------------------------

There are two major Interfaces involved **IOnlineSubsystem** and **IOnlineSession** each handles crucial parts of integrating your game with the subsystem. Everything is basically driven by sessions, you notify a service about your servers presence, the service is then queried by clients who wish to find active game sessions. A client then requests to join a given session, and then if all is well, the client is allowed to travel to that server.

### Creating a Session

When hosting a game you first need to create a session for the online sub system.

IOnlineSubSystem\* OnlineSub \= IOnlineSubsystem::Get();
if (OnlineSub) 
{
   IOnlineSessionPtr Session 
       \= OnlineSub\-\>GetSessionInterface(); 
   if (Session.IsValid()) {
      Session\-\>CreateSession(\*UserId, SessionName, \*HostSettings);
   }
}

This bit of code is the basic foundation for creating a new session in the subsystem. When a session has been created a delegate is fired which you can opt in to handle. This is done by assigning a delegate like so.

OnCreateSessionDelegateHandle 
    \= Session\-\>AddOnCreateSessionCompleteDelegate\_Handle(FOnCreateSessionCompleteDelegate)

**\_Handle** and no **\_Handle** It’s worth mentioning why there are two different methods here, one that returns a FDelegateHandle and one that does not. The one without the \_handle suffix is deprecated and should not be used. When you assign a Delegate you should always keep a reference to the handle so you can operate on your delegates in a proper way through out the session life cycle.

ClearOnCreateSessionCompleteDelegate\_Handle(OnCreateSessionDelegateHandle)

_§ Pay attention, this is subject to change as the \_Handle suffix is added for backwards compatibility while the option to do it without is deprecating._

### Starting a Session

You are able to and in general you should signal the subsystem that a match has started, in case you don’t want to list games in progress or maybe only list games in progress.

This can be done in the following way.

Session\-\>StartSession(SessionName);

This will tell the subsystem that this session and gameplay has started. Take a look at how ShooterGame does this.

And as with all other calls to the subsystem you are able to assign delegates and retrieve the handle for them by methods named by convention e.g:

OnStartSessionCompleteDelegateHandle
   \= Session\-\>AddOnstartSessionCompleteDelegate\_Handle(OnStartSessionDelegate);

This is normally done in a overridden void HandleMatchHasStarted() method in your GameSession Class as this is called when the match has started by the currently active game mode.

When the authority has started the session, it should RPC call to a method on all the connected clients so that they also start a online session. In this example the server is doing a RPC to a method called ClientStartOnlineGame

// tell non-local players to start online game
for (FConstPlayerControllerIterator It 
   \= GetWorld()\-\>GetPlayerControllerIterator(); It; ++It)
{
   AClientPlayerController\* PC \= Cast<AClientPlayerController\>(\*It);
   if (PC && !PC\-\>IsLocalPlayerController())
   {
      PC\-\>ClientStartOnlineGame();
   }
}

### Updating a Session, Find and Join a Session

The online subsystem provides a way to find ongoing game sessions. This is a pretty powerful feature that allows to you query the subsystem to retrieve a set of hosts that is currently running a session of your game. The Online sub system interfaces declares methods to do this, however its up to the subsystem itself to allow querying.

Once you have a set of sessions you can either create a UI widget that allows players to pick a session and join it. Or you can choose for them by creating a matchmaking system where you put players against each other based on a set of parameters for instance, skill-level

When you wish to query the subsystem for sessions to join to need first to create an instance of FOnlineSessionSearch

Search \= MakeShareable(new FOnlineSessionSearch());
 
OnFindSessionsCompleteDelegateHandle 
    \= Session\-\>AddOnFindSessionCompleteDelegate\_Handle(OnFindSessionsCompleteDelegate);
TSharedRef<FOnlineSessionSearch\> SearchRef \= Search.ToSharedRef();
Session\-\>FindSessions(\*UserId, SearchRef);

In case we wish to query our subsystem for servers with different options or keywords we can do this by adding queries to our SessionSearch Instance.

Search\-\>QuerySettings.Set(SEARCH\_KEYWORD, "SOME\_KEYWORD", EOnlineComparisonOp::Equals);

The last bit of the query is a **Enum** with a collection of comparison operators for instance you have Greater Than, Lesser Than, Near, Not Equals and a few others.

I will try to cover querying and matchmaking in deeper detail later on, untill then please look at ShooterGame and how it is using querying.

Once you have your results you are able to pick one and join the session.

if (SessionToJoin \>= 0 && SessionToJoin < Search.SearchResults.Num())
{
   return Session\-\>JoinSession(\*UserId, SessionName, Search.SearchResults\[SessionToJoin\]);
}
return false;

When the OnJoinSessionCompleteDelegate is fired it passes a EOnJoinSessionCompleteResult::Type Enum as parameter to the delegate, this will either tell you that you have successfully joined the session, or that something went wrong and you should handle it accordingly, the delegate also passes a FName with the SessionName in it. If everything went well, we can then proceed to travel to the server. When we want to travel we need to resolve the URL to the server, this is done by passing a FString to contain the resolved URL along with the SessionName as a FName to GetResolvedConnectString

FString URL;
IOnlineSessionPtr Session \= OnlineSub\-\>GetSessionInterface();
 
if ( Session\-\>GetResolvedConnectString(SessionName, URL))
{
   PlayerController\-\>ClientTravel(URL, TRAVEL\_Absolute);
}

This might seem as a bit of magic, but the trick to this resolve is that your Session keeps a state once you have Joined a session, so when you resolve anything with the same session name that you joined with you will resolve the URL to that session.

This means that unless you explicitly decides to leave a session, you are not able to Join and travel to another. This also allows you to easily reconnect to a session if you lose the connection temporarily or your game crashed.

Be mind full of how you keep your references to the session.

### End a Session

Endning a session is the the operation of notifing the subsystem that the match has ended. Its the opposite of Starting a session in this regard. When the Match has ended, GameMode calls GameSession->HandleMatchHasEnded(); This means that in your gamesession subclass you should override void HandleMatchHasEnded().

IOnlineSessionPtr Session \= OnlineSub\-\>GetSessionInterface();
if (Session.IsValid()) 
{
   Session\-\>EndSession(GameSessionName);
}

This only shows the subsystem call to EndSession, in reality this is very incomplete. You need to tell the connected clients that your gamesession has ended so that they can gracefully handle that your match is ending so they can end their sessions aswell. Again ShooterGame does this with elegance. When the match is ending the server calls the ClientEndOnlineGame() on connected controllers, this is a replicated RPC which in turn will call this methods implementation on each connected clients controller.

// tell the clients to end
for (FConstPlayerControllerIterator It 
   \= GetWorld()\-\>GetPlayerControllerIterator(); It; ++It)
{
   AClientPlayerController\* PC \= Cast<AClientPlayerController\>(\*It);
   if (PC && !PC\-\>IsLocalPlayerController())
   {
      PC\-\>ClientEndOnlineGame();
   }
}

Each client then calls EndSession to end its session!

IOnlineSessionPtr Session \= OnlineSub\-\>GetSessionInterface();
if(Session.IsValid())
{
   Session\-\>EndSession(PlayerState\-\>SessionName);
}

### Destroy a Session

IOnlineSessionPtr Session \= OnlineSub\-\>GetSessionInterface();
if (Session.InValid())
{
   Session\-\>DestroySession(SessionName);
}

And as with all other other operations a delegate will be fired, where you can clean up after the session has been destroyed.

Part 2 – Class and interface overview.
--------------------------------------

**GameInstance**

**GameSession**

**IOnlineSession**

**IOnlineSessionSettings**

**IOnlineSubSystem**

**EOnlineAsyncTaskState**

The OnlineSubSystem performs some asynchronous task for example searching and each task can be polled for a state. These are the states in which a async task can be in.

**Done**

**Failed**

**InProgress**

**NotStarted**

  
**FDelegateHandle**

**FOnlineSessionSearch**

This class contains your search results, your search query and properties to set Timeout of your search, and the current search state if you need to poll for it.

To query the subsystem for specific fields use the QuerySettings.Set(Field, Value, EOnlineComparisonOp);

**FOnlineSessionSearchResult**

Searching for servers is a asynchronous task which starts to run when you call FindSessions. When this task has finished you and if it was successfull in finding any sessions they will be stored as a TArray of **FOnlineSessionSearchResult** on your **FOnlineSessionSearch** reference.

Here is an example of a method that polls for the async task state for the search. And while we are at it we take a snapshot of the current search progress.

EOnlineAsyncTaskState::Type APossessionGameSession::GetSearchResultStatus(
    int32& SearchResultIdx, 
    int32& NumSearchResults)
{
    SearchResultIdx \= 0;
    NumSearchResults \= 0;
    if (Search.IsValid())
    {
        if (Search\-\>SearchState \== EOnlineAsyncTaskState::Done)
        {
           NumSearchResults \= Search\-\>SearchResults.Num();
        }
        return Search\-\>SearchState;
    }
    return EOnlineAsyncTaskState::NotStarted;
}

Part 3 – An Implementation
--------------------------

With this knowledge it will be easier to follow and understand the code for the online part of ShooterGame. Its quite complex but now you have some basic knowledge of the online subsystem to fall back on when doing further research.

When studying the ShooterGame example code you find that working with the subsystem is not a straight procedural line of operations, most things are handled by delegates that has fired when certain events has happened in the subsystem.

Things has to work this way by the nature of networks, they are unreliable and, this means that our program cannot halt the frame and wait for the subsystem to respond over the network. The game have to ask to find sessions, and when the subsystem has some sessions to give to us, react then, do some other operations in the meantime.

In short, when implementing multiplayer in your game you need to think event-driven-programming where you tell the system to do one thing, and eventually the system will tell you when it has finished performing its task so you can react to the outcome.

Part 4 – I want the easy way out
--------------------------------

As promised, we will take a look at a “easier” way to integrate the online subsystem into your game. In UE >= 4.6 you have access to a set of new Blueprint nodes. CreateSession, FindSession, JoinSession and DestroySession. Take a look at this example on how to integration sessions to your game with blueprints.. It does only provide the basics of the subsystem functionality but you will get up and running in a second with this approach.

Related Topics
--------------

[https://wiki.unrealengine.com/How\_To\_Use\_Sessions\_In\_C%2B%2B](https://wiki.unrealengine.com/How_To_Use_Sessions_In_C%2B%2B)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Online-Multiplayer&oldid=16051](https://wiki.unrealengine.com/index.php?title=Online-Multiplayer&oldid=16051)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)