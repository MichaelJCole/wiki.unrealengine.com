Clear Widgets When Switching Levels - Epic Wiki                    

Clear Widgets When Switching Levels
===================================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.7

Contents
--------

*   [1 Overview](#Overview)
*   [2 The Code](#The_Code)
    *   [2.1 Player Controller](#Player_Controller)
    *   [2.2 GameMode](#GameMode)
*   [3 Get All Widgets of Class](#Get_All_Widgets_of_Class)
*   [4 Final Word](#Final_Word)

Overview
--------

This tutorial is a quick and easy workaround for removing UMG widgets when travelling between levels in Multiplayer. Currently, Widgets are not destroyed automatically when opening or closing levels, so trying to Server Travel a group of players will put them the game, but their screen will still display the old widget(s), with no [easy way to remove them!](https://wiki.unrealengine.com/Clear_Widgets_When_Switching_Levels#GetAllWidgetsofClass)

![Note](https://d26ilriwvtzlb.cloudfront.net/b/b3/Icon_template_warning1.png) Widgets being left behind during level transitions is likely an Engine bug, and is therefore likely to be fixed or changed in a future engine version. This serves as a workaround for the meantime.

The Code
--------

The code for this is extremely simple, all you need is a custom Gamemode and a custom PlayerController.

### Player Controller

In our Custom Player Controller, we need to declare a new Client function (call it something useful!) that will be called when our Player is travelling to a new level. It's a simple Object Iterator that checks for any widgets in the Players World, and removes them.

Note that because we're using the new GENERATED\_BODY() Macro, we must declare the previously auto-generated Server/Client virtual functions now.

**MyPlayerController.h**

UCLASS()
class GESGAME\_API AMyPlayerController : public APlayerController
{
	GENERATED\_BODY()
 
public:
	UFUNCTION(Client, Reliable, Category \= "Things")
	void ClearHUDWidgets();
	virtual void ClearHUDWidgets\_Implementation();
};

**MyPlayerController.cpp**

void AMyPlayerController::ClearHUDWidgets\_Implementation()
{
	/\* Object Iterator for All User Widgets! \*/
	for (TObjectIterator<UUserWidget\> Itr; Itr; ++Itr)
	{
		UUserWidget\* LiveWidget \= \*Itr;
 
		/\* If the Widget has no World, Ignore it (It's probably in the Content Browser!) \*/
		if (!LiveWidget\-\>GetWorld())
		{
			continue;
		}
		else
		{
			LiveWidget\-\>RemoveFromParent();
		}
	}
}

### GameMode

The GameMode change is very minimal. If you haven't already, create a declaration for 'ProcessClientTravel'. It's an existing function within the GameMode, so you'll want to override it like so:

**MyGameMode.h**

UCLASS()
class GESGAME\_API AMyGameMode : public AGameMode
{
	GENERATED\_BODY()
 
public:
	virtual APlayerController\* ProcessClientTravel(FString& FURL, FGuid NextMapGuid, bool bSeamless, bool bAbsolute) override;
};

Now we're going to add some additional functionality into this GameMode. Unfortunately, we can't just call Super on it, because we need to inject some functionality right in the middle of the existing code. We'll have to copy-paste the code from the function in to start with, then add our modifications. The final code should look like this:

**MyGameMode.cpp**

APlayerController\* AMyGameMode::ProcessClientTravel(FString& FURL, FGuid NextMapGuid, bool bSeamless, bool bAbsolute)
{
	// We call PreClientTravel directly on any local PlayerPawns (ie listen server)
	APlayerController\* LocalPlayerController \= NULL;
	for (FConstPlayerControllerIterator Iterator \= GetWorld()\-\>GetPlayerControllerIterator(); Iterator; ++Iterator)
	{
		APlayerController\* PlayerController \= \*Iterator;
		if (Cast<UNetConnection\>(PlayerController\-\>Player) !\= NULL)
		{
			/\* Check if we're using our Custom Controller \*/
			AMyPlayerController\* MyController \= Cast<AMyPlayerController\>(PlayerController);
			if (MyController )
			{
				MyController \-\>ClearHUDWidgets();
			}
 
			// REMOTE PLAYER
			PlayerController\-\>ClientTravel(FURL, TRAVEL\_Relative, bSeamless, NextMapGuid);
		}
		else
		{
			// LOCAL PLAYER
			/\* Check if we're using a GES Controller \*/
			AMyPlayerController\* MyController \= Cast<AMyPlayerController\>(PlayerController);
			if (MyController )
			{
				MyController \-\>ClearHUDWidgets();
			}
 
			LocalPlayerController \= PlayerController;
			PlayerController\-\>PreClientTravel(FURL, bAbsolute ? TRAVEL\_Absolute : TRAVEL\_Relative, bSeamless);
		}
	}
	return LocalPlayerController;
}

All we're doing is casting the Controller to our custom one, and calling ClearHUDWidgets() on it **BEFORE** it starts to transition to the next level.

You'll also be able to see from the comments that this works for both Local & Remote players, so should also work in Singleplayer!

Get All Widgets of Class
------------------------

**Author** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

I submitted a pull request that Epic accepted precisely to make this process easier!

You can simply run the blueprint node **"Get All Widgets of Class"** and then use a for each and remove all the widgets from the viewport.

The advantage of this is that it can be done client side very easily (game mode is server only) and does not require any C++.

[![RemoveAllWidgetsFromViewport.jpg](https://d3ar1piqh1oeli.cloudfront.net/d/d9/RemoveAllWidgetsFromViewport.jpg/900px-RemoveAllWidgetsFromViewport.jpg)](/File:RemoveAllWidgetsFromViewport.jpg)

**Get All Widgets of Class** is a static BP node, so you can use this in any blueprint you want!

Top-Level Only allows you to specify whether my node should only return widgets that are directly connected to the viewport, or whether to return alllll widgets even if they are subwidgets of a viewport widget!

I hope this makes this whole process of removing UMG widgets between levels even easier!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

PS: Special thanks to TheJamsh for creating this wiki to address this issue for all time to come!

Final Word
----------

Hope this helps!

[TheJamsh](/User:TheJamsh "User:TheJamsh") ([talk](/User_talk:TheJamsh "User talk:TheJamsh"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Clear\_Widgets\_When\_Switching\_Levels&oldid=13597](https://wiki.unrealengine.com/index.php?title=Clear_Widgets_When_Switching_Levels&oldid=13597)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)