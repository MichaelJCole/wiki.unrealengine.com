Loading Screen - Epic Wiki                    

Loading Screen
==============

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (8 votes)

Approved for Versions:4.10, 4.11

Contents
--------

*   [1 Overview](#Overview)
*   [2 Setup](#Setup)
*   [3 Movie Player Module](#Movie_Player_Module)
*   [4 The Code](#The_Code)
*   [5 Explanation](#Explanation)
*   [6 Bonuses - Playing Movies & Custom Widgets](#Bonuses_-_Playing_Movies_.26_Custom_Widgets)
*   [7 Plugin Version](#Plugin_Version)

Overview
--------

In this tutorial I'll show you how to **properly** setup a self-contained Loading Screen System for your game - which will allow you to safely play movie files, audio clips or load a widget to the screen during any type of map loading. This system supports all platforms from Android -> Windows -> PS4.

As a bonus, the system requires no additional calls or setup from the user and is entirely self-contained. Loading a map via any means (other than PIE) will trigger the load visualization seamlessly.

This tutorial relies on C++ and there is NO blueprint alternative. However, non-C++ orientated programmers should be able to easily modify their project and copy-paste the code relatively easily.

Setup
-----

To begin with, we'll need a custom Game Instance. The GameInstance is one of the first objects initialized for a game by the engine, and is persistent for the entire play session. If you don't already have one, you need to create your own overridden version of the 'UGameInstance' class.

Next, you'll need to setup your project configuration to use this GameInstance for your game. Open DefaultEngine.ini, and add (or edit) the following entry. This is how it looks in my game:

\[/Script/EngineSettings.GameMapsSettings\]
GameInstanceClass\=/Script/MyGame.MyGameInstance

Now when you open the editor or play the game, this GameInstance class will be used in place of the default one.

Movie Player Module
-------------------

The Movie Player module is what we use to setup the loading screen. This is the same module that plays the startup movies for your game, and is therefore instantiated before almost anything else. Not only that, but the Movie Player can talk to the game engine and tell it when it's finished it's task, allowing the engine to continue.

The MoviePlayer runs in its own thread, meaning it can run while the engine is stopped waiting for files to load. Also because it is in a background thread, you have to use Slate widgets, not the newer UMG widgets.

In order to use the Movie Player module, we must include it in our project. Open your games' Build.CS file and add the MoviePlayer module, like so:

PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "MoviePlayer" });

The Movie Player Module also has the required code and setup for a default loading screen. We will use this in this tutorial, but you can also tell the movie player to play movies and audio files if you want something more advanced.

The Code
--------

With only a small bit of code and some delegate bindings, we can now tell the movie player to display a loading screen when we need it to:

**Header**

public:
	virtual void Init() override;
 
	UFUNCTION()
	virtual void BeginLoadingScreen();
	UFUNCTION()
	virtual void EndLoadingScreen();

**CPP**

void UMyGameInstance::Init()
{
	UGameInstance::Init();
 
	FCoreUObjectDelegates::PreLoadMap.AddUObject(this, &UMyGameInstance::BeginLoadingScreen);
	FCoreUObjectDelegates::PostLoadMap.AddUObject(this, &UMyGameInstance::EndLoadingScreen);
}
 
void UMyGameInstance::BeginLoadingScreen()
{
 	FLoadingScreenAttributes LoadingScreen;
 	LoadingScreen.bAutoCompleteWhenLoadingCompletes \= false;
 	LoadingScreen.WidgetLoadingScreen \= FLoadingScreenAttributes::NewTestLoadingScreenWidget();
 
 	GetMoviePlayer()\-\>SetupLoadingScreen(LoadingScreen);
}
 
void UMyGameInstance::EndLoadingScreen()
{
 
}

And it really is as easy as that. The Movie Player will handle destroying the loading screen when map load has completed, but we can add our own functionality to EndLoadingScreen if we want.

In my case for example, I have added a full-screen fade from black when loading completes, via a custom Viewport. User Moss posted a tutorial on how to do this fade here:

[https://wiki.unrealengine.com/Global\_Fade\_In\_out](https://wiki.unrealengine.com/Global_Fade_In_out)

Explanation
-----------

FCoreUObjectDelegates is an engine class which contains a series of Delegate bindings that are fired on various events in engine. PreLoadMap and PostLoadMap are the first items called whenever a map load begins and ends, regardless of where the load is called from.

We have essentially tied in our loading screen in the most seamless way possible. As the loading screen is created inside of FSlateApplication, it also ticks on it's own thread and therefore can run animation/movies independently of whatever the main game thread is doing.

Bonuses - Playing Movies & Custom Widgets
-----------------------------------------

FLoadingScreenAttributes contains a variety of options to allow you to customize the behaviour of the loading screen, all of which are self-explanatory. Knock yourselves out ;)

/\*\* Struct of all the attributes a loading screen will have. \*/
struct MOVIEPLAYER\_API FLoadingScreenAttributes
{
	FLoadingScreenAttributes()
		: MinimumLoadingScreenDisplayTime(\-1.0f)
		, bAutoCompleteWhenLoadingCompletes(true)
		, bMoviesAreSkippable(true)
		, bWaitForManualStop(false) {}
 
	/\*\* The widget to be displayed on top of the movie or simply standalone if there is no movie. \*/
	TSharedPtr<class SWidget\> WidgetLoadingScreen;
 
	/\*\* The movie paths local to the game's Content/Movies/ directory we will play. \*/
	TArray<FString\> MoviePaths;
 
	/\*\* The minimum time that a loading screen should be opened for. \*/
	float MinimumLoadingScreenDisplayTime;
 
	/\*\* If true, the loading screen will disappear as soon as all movies are played and loading is done. \*/
	bool bAutoCompleteWhenLoadingCompletes;
 
	/\*\* If true, movies can be skipped by clicking the loading screen as long as loading is done. \*/
	bool bMoviesAreSkippable;
 
	/\*\* If true, movie playback continues until Stop is called. \*/
	bool bWaitForManualStop;
 
	/\*\* True if there is either a standalone widget or any movie paths or both. \*/
	bool IsValid() const;
 
	/\*\* Creates a simple test loading screen widget. \*/
	static TSharedRef<class SWidget\> NewTestLoadingScreenWidget();
};

Plugin Version
--------------

Nick Darnell (aka Slatelord) from Epic made a Plugin of this system that allows you do to all of this from within the editor with no C++ required.

Download the plugin on GitHub here: [https://github.com/ue4plugins/LoadingScreen](https://github.com/ue4plugins/LoadingScreen)

Hope this helps!

[TheJamsh](/User:TheJamsh "User:TheJamsh") ([talk](/User_talk:TheJamsh "User talk:TheJamsh"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Loading\_Screen&oldid=21055](https://wiki.unrealengine.com/index.php?title=Loading_Screen&oldid=21055)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)