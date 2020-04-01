Slate Introduction ‒ Basic Menu Part 1 - Epic Wiki                    

Slate Introduction ‒ Basic Menu Part 1
======================================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (4 votes)

Approved for Versions:(4.7),(4.9)

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png)

**Some or all of the information on this page is inconsistent, irrelevant or confusing.**

Please help clean it up if you are able.

Contents
--------

*   [1 Creating Menus with Slate/C++, Part 1](#Creating_Menus_with_Slate.2FC.2B.2B.2C_Part_1)
    *   [1.1 Overview](#Overview)
    *   [1.2 Step 1: Preparing for Slate!](#Step_1:_Preparing_for_Slate.21)
    *   [1.3 Step 2: Getting AHUD!](#Step_2:_Getting_AHUD.21)
    *   [1.4 Step 3: Creating our Main Menu widget.](#Step_3:_Creating_our_Main_Menu_widget.)
    *   [1.5 Main Menu Widget: Continued](#Main_Menu_Widget:_Continued)
    *   [1.6 Revisiting our HUD](#Revisiting_our_HUD)
    *   [1.7 Set Up Game Mode](#Set_Up_Game_Mode)
    *   [1.8 Summary](#Summary)

Creating Menus with Slate/C++, Part 1
=====================================

Overview
--------

_Original Author_ [Minalien](https://forums.unrealengine.com/member.php?1034-Minalien)

Hello, and welcome to the first of a multi-part tutorial series on creating game menus with Slate in Unreal Engine. I've recently spent a lot of time working with Slate to replace some... rather ugly setups and difficult-to-maintain Canvas-based Blueprints that made up all of the menus in a game that I am currently working on with other students at my university. A lot of accounts that I have heard from the Unreal community, unfortunately, have been that Slate is poorly-documented and somewhat unwieldy - and while I'll partially agree to the first part (in the sense that there are few beginner-friendly tutorials for getting up and running with everything you can do in Slate), I personally have to say that I found the sample projects, particularly the Strategy Game sample, to be quite revealing when it comes to working with Slate. In fact, the Strategy Game sample is where I learned most of what I know.

Before we get started, I feel it's only fair to warn you that I'm operating with an understanding that I've gleaned from sample code and poring over various portions of [the Unreal Engine 4 API Documentation](https://docs.unrealengine.com/latest/INT/). The practices I use in this tutorial may not be the best practices, and they certainly aren't guaranteed to be the most efficient way to handle things. However, if you're looking to create a game menu that feels good in your game world, this set of tutorials will take you there. If you're up for it, and tire of waiting for my tutorial series to be completed, I can't recommend strongly enough reading through the UI portions of the Strategy Game sample!

For this first tutorial, I'm going to keep things quite basic. We're going to create a very basic, unstyled game menu that simply shows a game title and provides two buttons: Play Game and Quit, which will in turn call Blueprints on the HUD associated with the UI in order to handle the actual functionality of the buttons. In the next tutorial, I'm going to get into implementing Slate UI Styles that can be edited within the Unreal Editor, allowing you to adjust the look and feel of your Menus from within the editor itself. After that, we will start to get into Data Binding, which can be great for updating portions of your UI - for example, if you were to set up pages within a shop interface, you might want a text block to display how many items the player currently has in her shopping cart. Finally, I'll end with methods that can be used to create more dynamic, interactive menus such as what you see in the Strategy Game sample.

*   [Part 1: Introduction & Basic Menu](https://wiki.unrealengine.com/Slate_Introduction_%E2%80%92_Basic_Menu_Part_1)
*   [Part 2: Style Sets](https://wiki.unrealengine.com/Slate_Style_Sets_Part_2)
*   [Part 3: Data Binding](https://wiki.unrealengine.com/Slate_Data_Binding_Part_3)

Step 1: Preparing for Slate!
----------------------------

Because this tutorial is focused on C++ and Slate, I am assuming a basic level of understanding with Unreal Engine. I expect you to be able to create a project, add a specific class to your project, and so on - if you don't already know this, you should follow other tutorials (or [the Unreal Engine YouTube page](https://www.youtube.com/user/UnrealDevelopmentKit/playlists)) before you touch this one.

For the sample in this project, I'm going to assume that you have created a Blank project. With or without starter content really does not matter, as I won't be using any of it in this tutorial. Once you've created your project, make sure you have generated code & Visual Studio or Xcode projects for the project. For the remainder of the tutorial series, I am going to operate under the assumption that SlateTutorials is your project name - remember to replace this with your own project name where appropriate. In your project's source folder, open your _SlateTutorials.Build.cs_ file and uncomment the following line or add it:

// Uncomment if you are using Slate UI
PrivateDependencyModuleNames.AddRange(new string\[\] { "Slate", "SlateCore" });

This will add the necessary Slate libraries and headers to your project path when you attempt to build. You're now ready to write your first Slate UI!

Step 2: Getting AHUD!
---------------------

The first thing that we want to add to the project is a new HUD class, which we'll call _MainMenuHUD_:

MainMenuHUD.h

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
// MainMenuHUD.h – Provides an implementation of the HUD that will embed the Main Menu Slate UI.
 
#pragma once
 
#include "GameFramework/HUD.h"
#include "MainMenuHUD.generated.h"
 
/\*\*
  \* Provides an implementation of the game’s Main Menu HUD, which will embed and respond to events triggered
  \* within SMainMenuUI.
  \*/
UCLASS()
class SLATETUTORIALS\_API AMainMenuHUD : public AHUD
{
	GENERATED\_BODY()
        // Initializes the Slate UI and adds it as widget content to the game viewport.
	virtual void PostInitializeComponents() override;
 
        // Reference to the Main Menu Slate UI.
	TSharedPtr<class SMainMenuUI\> MainMenuUI;
 
public:
        // Called by SMainMenu whenever the Play Game! button has been clicked.
	UFUNCTION(BlueprintImplementableEvent, Category \= "Menus|Main Menu")
	void PlayGameClicked();
 
        // Called by SMainMenu whenever the Quit Game button has been clicked.
	UFUNCTION(BlueprintImplementableEvent, Category \= "Menus|Main Menu")
	void QuitGameClicked();
};

MainMenuHUD.cpp

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
#include "SlateTutorials.h"
#include "MainMenuHUD.h"
 
void AMainMenuHUD::PostInitializeComponents()
{
	Super::PostInitializeComponents();
}

I feel the comments here do a pretty good job of explaining everything, and if you're working with Slate & C++ then most of this should already be familiar to you. If you don't already know what purpose PlayGameClicked() and QuitGameClicked() serve, the UFUNCTION macros should give them away - they're events that will be available to any Blueprint inheriting the MainMenuHUD class, which we can then use to specify what, exactly, happens when these vents are called by our SMainMenuUI. I've seen plenty of tutorials (including [the Slate, Hello!](https://wiki.unrealengine.com/Slate,_Hello) tutorial on the UE4 Wiki, which was a great introduction to Slate for me) initialize the UIs in BeginPlay, but I noticed that the Strategy Game sample does so inPostInitializeComponents, so I'm choosing to do the latter. We will revisit the implementation of the PostInitializeComponents() method in a minute.

Step 3: Creating our Main Menu widget.
--------------------------------------

Now, go ahead and add another class to your project: SMainMenuUI, which inherits from SCompoundWidget. This class is a little bit more involved than the HUD class, so I'm going to first show you the code, then explain each part individually.

MainMenuUI.h

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
/\*\*
  \* MainMenuUI.h – Provides an implementation of the Slate UI representing the main menu.
  \*/
 
#pragma once
 
#include "SlateBasics.h"
#include "MainMenuHUD.h"
 
// Lays out and controls the Main Menu UI for our tutorial.
class SLATETUTORIALS\_API SMainMenuUI : public SCompoundWidget
{
 
public:
	SLATE\_BEGIN\_ARGS(SMainMenuUI)
	{}
	SLATE\_ARGUMENT(TWeakObjectPtr<class AMainMenuHUD\>, MainMenuHUD)
	SLATE\_END\_ARGS()
 
        // Constructs and lays out the Main Menu UI Widget.
        // args Arguments structure that contains widget-specific setup information.
	void Construct(const FArguments& args);
 
	// Click handler for the Play Game! button – Calls MenuHUD’s PlayGameClicked() event.
	FReply PlayGameClicked();
 
	// Click handler for the Quit Game button – Calls MenuHUD’s QuitGameClicked() event.
	FReply QuitGameClicked();
 
        // Stores a weak reference to the HUD controlling this class.
	TWeakObjectPtr<class AMainMenuHUD\> MainMenuHUD;
};

Most of this should be fairly straightforward. First, notice that we do not specify UCLASS() - this isn't a class that is exported for Blueprints, and in fact it should not be. First, we inherit from SCompoundWidget - a CompoundWidget is a Slate widget that is composed of other widgets - there are many examples of this in the Slate API - SVerticalBox, SHorizontalBox, SOverlay, and several others. The opposite of this is an SLeafWidget, which does not contain other widgets.

	SLATE\_BEGIN\_ARGS(SMainMenuUI)
	{}
	SLATE\_ARGUMENT(TWeakObjectPtr<class AMainMenuHUD\>, MainMenuHUD)
	SLATE\_END\_ARGS()

This portion may seem odd if you haven't gotten used to the sheer amount of Macro-magic used by Unreal Engine. All these lines ultimately do is generate a struct that contains a list of arguments that can be passed during setup to this widget. You may have noticed FArguments in the Construct() method - this is defining that structure. In our case, we have a single argument: a weak pointer to the AMainMenuHUD that owns this class. If you're not familiar with smart pointers, this essentially means that we can reference the parent HUD, but avoid creating a strong circular reference (remember, our HUD references this object as well) that could cause both objects to remain in memory even when no longer used.

        void Construct(const FArguments& args);

The Construct() method takes a single argument, the FArguments struct our SLATE\_\* macros defined a little bit ago that contains all of the arguments used by the widget. This method is called whenever we actually create the widget, and as you'll see in a minute is responsible for laying out the Widget.

	// Click handler for the Play Game! button – Calls MenuHUD’s PlayGameClicked() event.
	FReply PlayGameClicked();
 
	// Click handler for the Quit Game button – Calls MenuHUD’s QuitGameClicked() event.
	FReply QuitGameClicked();

These methods will serve as event handlers for the Play Game! and Quit Game buttons that we are going to be adding. They conform to the FOnClicked event, which simply returns an FReply (which tells the engine whether the event was handled or not), and accept no parameters. We could, if we'd wanted, have specified a parameter on these methods - I'll show how that can be done & used when we get into data binding in a future tutorial.

Main Menu Widget: Continued
---------------------------

Now, we are able to implement our Main Menu widget. This will be a rather easy task, as we only have three methods to implement - but it's going to look very, very strange at first (I recommend, when working with Slate, that you pick up good practices with indentation. Ensuring that things are indented well is absolutely necessary to understanding your layout.

MainMenuUI.cpp

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
#include "SlateTutorials.h"
#include "MainMenuUI.h"
#include "Engine.h"
 
BEGIN\_SLATE\_FUNCTION\_BUILD\_OPTIMIZATION
void SMainMenuUI::Construct(const FArguments& args)
{
	MainMenuHUD \= args.\_MainMenuHUD;
 
	ChildSlot
		\[
			SNew(SOverlay)
			+ SOverlay::Slot()
			.HAlign(HAlign\_Center)
			.VAlign(VAlign\_Top)
			\[
				SNew(STextBlock)
				.ColorAndOpacity(FLinearColor::White)
				.ShadowColorAndOpacity(FLinearColor::Black)
				.ShadowOffset(FIntPoint(\-1, 1))
				.Font(FSlateFontInfo("Arial", 26))
				.Text(FText::FromString("Main Menu"))
			\]
			+ SOverlay::Slot()
				.HAlign(HAlign\_Right)
				.VAlign(VAlign\_Bottom)
				\[
					SNew(SVerticalBox)
					+ SVerticalBox::Slot()
					\[
						SNew(SButton)
						.Text(FText::FromString("Play Game!"))
						.OnClicked(this, &SMainMenuUI::PlayGameClicked)
					\]
					+ SVerticalBox::Slot()
						\[
							SNew(SButton)
							.Text(FText::FromString("Quit Game"))
							.OnClicked(this, &SMainMenuUI::QuitGameClicked)
						\]
				\]
		\];
 
}
END\_SLATE\_FUNCTION\_BUILD\_OPTIMIZATION
 
FReply SMainMenuUI::PlayGameClicked()
{
	if (GEngine)
	{
		GEngine\-\>AddOnScreenDebugMessage(\-1, 3.f, FColor::Yellow, TEXT("PlayGameClicked"));
	}
 
	// actually the BlueprintImplementable function of the HUD is not called; uncomment if you want to handle the OnClick via Blueprint
	//MainMenuHUD->PlayGameClicked();
	return FReply::Handled();
}
 
FReply SMainMenuUI::QuitGameClicked()
{
	if (GEngine)
	{
		GEngine\-\>AddOnScreenDebugMessage(\-1, 3.f, FColor::Yellow, TEXT("QuitGameClicked"));
	}
 
	// actually the BlueprintImplementable function of the HUD is not called; uncomment if you want to handle the OnClick via Blueprint
	//MainMenuHUD->QuitGameClicked();
	return FReply::Handled();
}

You see what I mean about indentation and the potentially awkward structure for defining Slate UI layouts? We'll start with our two event handlers: As expected, they first call the corresponding Blueprint event on the HUD, so that our Blueprint responses to these button clicks can be handled. Then, they return FReply::Handled() - this simply lets the engine know that we've handled the click events - so it doesn't need to do any other processing for the player's mouse input.

Now, the Construct() method. As mentioned before, FArguments is a structure defined by our SLATE\* macros - in our case, it adds a method we will later use to specify the HUD that owns this widget. Our first order of business is capturing that value - we simply set our local value to the one contained by args. Note that the actual name of the variable here is \_\_MainMenuHUD, not MainMenuHUD - MainMenuHUD is the mutator method for actually setting the variable: all arguments passed through SLATE\_ARGUMENT will follow this convention.

The entirety of the layout definition is a very pretty magic trick written by Epic to take advantage of operator overloads and other cool functionality for defining our UI layout. To put it simply, we are using the \[\] operator to define widgets that are children of our custom (compound) widget. For compound widgets, we first start by calling SNew(WidgetClass), and then add widgets using + WidgetClass::Slot(). We may then, within that slot's \[\] operator, specify children for that slot.

In our case, we start with an Overlay widget. You can think of the SOverlay widget as a group of layers - the first ones defined will be under subsequently-declared slots. In our case, we're not going to have any overlap, as we've specified that the first slot should dock to the upper-center of the screen, while the second should dock to the bottom-right. However, you could (and in the next tutorial, will) specify an image that fills the entire viewport as the first slot, then have the buttons appear on subsequent slots to be placed on top of the image.

The first child of the SOverlay is an STextBlock, which is fairly similar to TextBlock or Label instances in other GUI APIs. For this, we specify a color, a shadow color, a shadow offset, a font, and some text. All of this is fairly self-explanatory, but notice that we don't have any ::Slot() calls after SNew - this is because a TextBlock is a Leaf widget - it cannot contain children, so we don't have any slots to take up, and therefore we specify the properties on the item itself.

Our second child is yet another compound widget - this time, SVerticalBox. The Vertical Box (and its sister-element, the Horizontal Box) will stack elements on top of each other (for the HorizontalBox, they will go left-to-right), taking up an equal amount of space. Inside the Vertical Box's slots (remember, SVerticalBox is a compound widget), we specify SButton instances with two arguments. The first argument is the Text that will be displayed on the button. The second is a binding to the event handler (PlayGameClicked/QuitGameClicked) that will be called whenever the button is clicked. Finally, we end it all with that most beloved of programming keys: the semicolon.

Revisiting our HUD
------------------

Now that we've finished setting up our Main Menu UI layout, it's time to go back and tie it into our HUD! Go back and adjust your PostInitializeComponents method:

MainMenuHUD.cpp

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
#include "SlateTutorials.h"
#include "MainMenuHUD.h"
#include "MainMenuUI.h"
#include "Engine.h"
 
void AMainMenuHUD::PostInitializeComponents()
{
	Super::PostInitializeComponents();
 
	SAssignNew(MainMenuUI, SMainMenuUI).MainMenuHUD(this);
 
	if (GEngine\-\>IsValidLowLevel())
	{
		GEngine\-\>GameViewport\-\>AddViewportWidgetContent(SNew(SWeakWidget).PossiblyNullContent(MainMenuUI.ToSharedRef()));
	}
}

The setup here is simple - after making sure the Engine and Viewport are valid, we create a new instance of the MainMenuUI, then we add the widget as content to our game's viewport! Notice the .MenuHUD added to SAssignNew - this is once again the result of our SLATE\_ macros - remember the MenuHUD portion of our SLATE\_ARGUMENT macro? Not only did it set the name of our variable (\_MainMenuHUD), but it also generated the mutator method we're using here!

Set Up Game Mode
----------------

The first and easiest way to make a game mode is written here [Creating a new Game Mode and Setting It's Defaults](https://wiki.unrealengine.com/Slate,_Hello#Creating_a_new_Game_Mode_and_Setting_It.27s_Defaults), I will not duplicate here and just give a link.

The second way to create a game mode from code, like this:

WidgetGameMode.h

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
#pragma once
 
#include "GameFramework/GameMode.h"
#include "WidgetGameMode.generated.h"
 
UCLASS()
class SLATETUTORIALS\_API AWidgetGameMode : public AGameMode
{
	GENERATED\_UCLASS\_BODY()
 
public:
	AWidgetGameMode();
 
};

WidgetGameMode.cpp

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
#include "SlateTutorials.h"
#include "WidgetGameMode.h"
#include "MainMenuHUD.h"
 
AWidgetGameMode::AWidgetGameMode()
{
	HUDClass \= AMainMenuHUD::StaticClass();
}

Then select from Project Settings, "Maps & Modes"

[![Скриншот 2015-03-18 13.21.16.png](https://d26ilriwvtzlb.cloudfront.net/8/85/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_2015-03-18_13.21.16.png)](/File:%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_2015-03-18_13.21.16.png)

Summary
-------

Set the appropriate classes on your Game Mode, set your level to use your new game mode, and run! If everything worked out, you should have the following, working (but somewhat ugly) game menu! Don't worry, in the next tutorial, we'll start to get into setting up Styles, which will allow us to massively improve the appearance of our menu items!

[![Скриншот 2015-03-18 13.28.24.png](https://d26ilriwvtzlb.cloudfront.net/1/16/%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_2015-03-18_13.28.24.png)](/File:%D0%A1%D0%BA%D1%80%D0%B8%D0%BD%D1%88%D0%BE%D1%82_2015-03-18_13.28.24.png)

Source code: [File:SlateTutorials-1.zip](/File:SlateTutorials-1.zip "File:SlateTutorials-1.zip") (~244KB)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Slate\_Introduction\_‒\_Basic\_Menu\_Part\_1&oldid=23413](https://wiki.unrealengine.com/index.php?title=Slate_Introduction_‒_Basic_Menu_Part_1&oldid=23413)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)