Slate, Simple C++ Chat System - Epic Wiki                    

Slate, Simple C++ Chat System
=============================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.10

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png)

**Some or all of the information on this page is inconsistent, irrelevant or confusing.**

Please help clean it up if you are able.

Contents
--------

*   [1 Overview](#Overview)
*   [2 Getting Started](#Getting_Started)
*   [3 Adding Classes](#Adding_Classes)
    *   [3.1 MyGameMode.h](#MyGameMode.h)
    *   [3.2 MyGameMode.cpp](#MyGameMode.cpp)
    *   [3.3 MyHUD.h](#MyHUD.h)
    *   [3.4 MyHUD.cpp](#MyHUD.cpp)
    *   [3.5 MyPlayerState.h](#MyPlayerState.h)
    *   [3.6 MyPlayerState.cpp](#MyPlayerState.cpp)
    *   [3.7 MyChatWidget.h](#MyChatWidget.h)
    *   [3.8 MyChatWidget.cpp](#MyChatWidget.cpp)

Overview
--------

_Author:_ [WhooKid](//forums.unrealengine.com/member.php?43891-WhooKid) ([talk](//forums.unrealengine.com/showthread.php?94453-Simple-C-Chat-System&p=438276))

[![](https://d3ar1piqh1oeli.cloudfront.net/8/8f/Ue4chat7.jpg/400px-Ue4chat7.jpg)](/File:Ue4chat7.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Ue4chat7.jpg "Enlarge")

Simple C++ Chat System with Slate

I made a lightweight simple chat system with Slate widgets and server RPCs.

The way it works is a widget is created then attached in the Hud class. The user presses enter to focus the inputbox and when he submits the message is passed to the player state then is replicated on the server and then to all players with a multicast server call.

You will have to enable slate and extend 4 classes.

*   _MyGameMode_ extends _AGameMode_
*   _MyHUD_ extends _AHUD_
*   _MyPlayerState_ extends _APlayerState_
*   _MyChatWidget_ extends _SCompoundWidget_

Getting Started
---------------

[![](https://d3ar1piqh1oeli.cloudfront.net/d/d5/Ue4chat8.jpg/400px-Ue4chat8.jpg)](/File:Ue4chat8.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Ue4chat8.jpg "Enlarge")

Enable Slate in your PROJECT.Build.cs file

First thing you have to do is enable the Slate module.  
It can be done with this tutorial [Slate,\_Hello](/Slate,_Hello "Slate, Hello").  
To enable slate you need to open your PROJECT.Build.cs in your source/PROJECT folder and uncomment the line:  
PrivateDependencyModuleNames.AddRange(new string\[\] { "Slate", "SlateCore" });  

Adding Classes
--------------

Now you need to extend the 4 classes and add the code. You may already have these classes extended so you may have to add this code to your existing classes.  
To extend a class go to File > New C++ Class...  
The first 3 classes are extending main classes so you can find them in the main search area.  

The Last class MyChatWidget extends SCompoundWidget add you will have to click the Show All Classes button and type in SCompoundWidget.

Once you have all the classes extended you need to add the code. You will have to rename the include files to your project name and possible some other class names if you chose different ones.

Note you will also have to change the Project name in each .h file to your project name. (ex CHATTUTORIAL\_API to MYGAME\_API)

*   [![](https://d3ar1piqh1oeli.cloudfront.net/4/46/Ue4chat3.jpg/120px-Ue4chat3.jpg)](/File:Ue4chat3.jpg)
    
    Extending the AGameMode class in Editor.
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/5/57/Ue4chat9.jpg/120px-Ue4chat9.jpg)](/File:Ue4chat9.jpg)
    
    Extending the SCompoundWidget class with Show All Classes enabled.
    

### MyGameMode.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/GameMode.h"
#include "MyGameMode.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class CHATTUTORIAL\_API AMyGameMode : public AGameMode
{
	GENERATED\_BODY()
 
public:
	AMyGameMode();
 
};

### MyGameMode.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "ChatTutorial.h"
#include "MyGameMode.h"
 
#include "MyHUD.h"
#include "MyPlayerState.h"
 
AMyGameMode::AMyGameMode()
{
	// assign our custom classes above their parents
	HUDClass \= AMyHUD::StaticClass();
	PlayerStateClass \= AMyPlayerState::StaticClass();
 
	/\* use this is you wish to extend the c++ into a bp and assign the bp to the class
	static ConstructorHelpers::FClassFinder<AMyHUD> hudclassobj(TEXT("Blueprint'/MyHUD.MyHUD\_C'"));
	if (hudclassobj.Class != NULL)
		HUDClass = hudclassobj.Class;
 
	static ConstructorHelpers::FClassFinder<AMyPlayerState> psclassobj(TEXT("Blueprint'/MyPlayerState.MyPlayerState\_C'"));
	if (psclassobj.Class != NULL)
		PlayerStateClass = psclassobj.Class;
	\*/
}

### MyHUD.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/HUD.h"
#include "MyHUD.generated.h"
 
USTRUCT()
struct FSChatMsg // Struct to hold the message data to be passed between classes
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY() // UProperty means this variable will be replicated
	int32 Type;
 
	UPROPERTY()
	FText Username;
 
	UPROPERTY()
	FText Text;
 
	FText Timestamp; // Dont replicate time because we can set it locally once we receive the struct
 
	double Created;
 
	void Init(int32 NewType, FText NewUsername, FText NewText) // Assign only the vars we wish to replicate
	{
		Type \= NewType;
		Username \= NewUsername;
		Text \= NewText;
	}
	void SetTime(FText NewTimestamp, double NewCreated)
	{
		Timestamp \= NewTimestamp;
		Created \= NewCreated;
	}
	void Destroy()
	{
		Type \= NULL;
		Username.GetEmpty();
		Text.GetEmpty();
		Timestamp.GetEmpty();
		Created \= NULL;
	}
};
 
/\*\*
 \* 
 \*/
UCLASS()
class CHATTUTORIAL\_API AMyHUD : public AHUD
{
	GENERATED\_BODY()
 
public:
 
	AMyHUD();
 
	TSharedPtr<class SMyChatWidget\> MyUIWidget; // Reference to the main chat widget
 
	APlayerController\* MyPC;
 
	UFUNCTION(BlueprintCallable, Category \= "User")
	void AddMessageBP(const int32 Type, const FString& Username, const FString& Text, const bool Replicate); // A Blueprint function you can use to place messages in the chat box during runtime
 
protected:
 
	virtual void PostInitializeComponents() override; // All game elements are created, add our chat box
 
	virtual void DrawHUD() override; // The HUD is drawn on our screen
};

### MyHUD.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "ChatTutorial.h"
#include "MyHUD.h"
 
#include "MyChatWidget.h"
#include "MyPlayerState.h"
 
AMyHUD::AMyHUD()
{
 
}
 
void AMyHUD::PostInitializeComponents()
{
	Super::PostInitializeComponents();
 
	if (GEngine && GEngine\-\>GameViewport) // make sure our screen is ready for the widget
	{
		SAssignNew(MyUIWidget, SMyChatWidget).OwnerHUD(this); // add the widget and assign it to the var
		GEngine\-\>GameViewport\-\>AddViewportWidgetContent(SNew(SWeakWidget).PossiblyNullContent(MyUIWidget.ToSharedRef()));
	}
}
 
void AMyHUD::DrawHUD()
{
	Super::DrawHUD();
 
	if (!MyPC)
	{
		MyPC \= GetOwningPlayerController();
		AddMessageBP(2, TEXT(""), TEXT("Welcome. Press Enter to chat."), false); // random Welcome message shown to the local player. To be deleted. note type 2 is system message and username is blank
		return;
	}
 
	if (MyPC\-\>WasInputKeyJustPressed(EKeys::Enter))
		if (MyUIWidget.IsValid() && MyUIWidget\-\>ChatInput.IsValid())
			FSlateApplication::Get().SetKeyboardFocus(MyUIWidget\-\>ChatInput); // When the user presses Enter he will focus his keypresses on the chat input bar
}
 
void AMyHUD::AddMessageBP(const int32 Type, const FString& Username, const FString& Text, const bool Replicate)
{
	if (!MyPC || !MyUIWidget.IsValid())
		return;
 
	FSChatMsg newmessage;
	newmessage.Init(Type, FText::FromString(Username), FText::FromString(Text)); // initialize our struct and prep the message
	if (newmessage.Type \> 0)
		if (Replicate)
		{
			AMyPlayerState\* MyPS \= Cast<AMyPlayerState\>(MyPC\-\>PlayerState);
			if (MyPS)
				MyPS\-\>UserChatRPC(newmessage); // Send the complete chat message to the PlayerState so it can be replicated then displayed
		}
		else
			MyUIWidget\-\>AddMessage(newmessage); // Send a local message to this client only, no one else receives it
}

### MyPlayerState.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/PlayerState.h"
 
#include "MyHUD.h"
 
#include "MyPlayerState.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class CHATTUTORIAL\_API AMyPlayerState : public APlayerState
{
	GENERATED\_BODY()
 
public:
 
	AMyPlayerState();
 
	UFUNCTION(Server, Reliable, WithValidation) // for player to player rpc you need to first call the message on the server
	virtual void UserChatRPC(const FSChatMsg& newmessage); // first rpc for the server
	UFUNCTION(NetMulticast, Reliable, WithValidation) // then the server calls the function with a multicast that executes on all clients and the server
	virtual void UserChat(const FSChatMsg& newmessage); // second rpc for all the clients
};

### MyPlayerState.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "ChatTutorial.h"
#include "MyPlayerState.h"
 
#include "MyHUD.h"
#include "MyChatWidget.h"
 
AMyPlayerState::AMyPlayerState()
{
 
}
 
bool AMyPlayerState::UserChatRPC\_Validate(const FSChatMsg& newmessage)
{
	return true;
}
void AMyPlayerState::UserChatRPC\_Implementation(const FSChatMsg& newmessage)
{
	UserChat(newmessage);
}
bool AMyPlayerState::UserChat\_Validate(const FSChatMsg& newmessage)
{
	return true;
}
void AMyPlayerState::UserChat\_Implementation(const FSChatMsg& newmessage)
{
	APlayerController\* MyCon;
	AMyHUD\* MyHud;
 
	for (FConstPlayerControllerIterator Iterator \= GetWorld()\-\>GetPlayerControllerIterator(); Iterator; ++Iterator) // find all controllers
	{
		MyCon \= Cast<APlayerController\>(\*Iterator);
		if (MyCon)
		{
			MyHud \= Cast<AMyHUD\>(MyCon\-\>GetHUD());
			if (MyHud && MyHud\-\>MyUIWidget.IsValid())
				MyHud\-\>MyUIWidget\-\>AddMessage(newmessage); // place the chat message on this player controller
		}
	}
}

### MyChatWidget.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "MyHUD.h"
#include "SlateBasics.h"
 
/\*\*
 \* 
 \*/
class CHATTUTORIAL\_API SMyChatWidget : public SCompoundWidget
{
	SLATE\_BEGIN\_ARGS(SMyChatWidget) : \_OwnerHUD(){} // the OwnerHUD var is passed to the widget so the owner can be set.
 
	SLATE\_ARGUMENT(TWeakObjectPtr<class AMyHUD\>, OwnerHUD)
 
	SLATE\_END\_ARGS()
 
public:
 
	void Construct(const FArguments& InArgs);
 
	TSharedRef<ITableRow\> OnGenerateRowForList(TSharedPtr<FSChatMsg\> Item, const TSharedRef<STableViewBase\>& OwnerTable); // the function that is called for each chat element to be displayed in the chatbox
	TArray<TSharedPtr<FSChatMsg\>> Items; // array of all the current items in this players chat box
	TSharedPtr< SListView< TSharedPtr<FSChatMsg\> \> \> ListViewWidget; // the acutall widgets for each chat element
 
	const FSlateFontInfo fontinfo \= FSlateFontInfo(FPaths::EngineContentDir() / TEXT("UI/Fonts/Comfortaa-Regular.ttf"), 15); // Font, Font Size  for the chatbox
 
	TWeakObjectPtr<class AMyHUD\> OwnerHUD;
 
	TSharedPtr< SVerticalBox \> ChatBox;
	TSharedPtr< SEditableText \> ChatInput;
 
	void OnChatTextChanged(const FText& InText);
	void OnChatTextCommitted(const FText& InText, ETextCommit::Type CommitMethod);
 
	void AddMessage(const FSChatMsg& newmessage); // the final stage, this function takes the input and does the final placement in the chatbox
 
	void Tick(const FGeometry& AllottedGeometry, const double InCurrentTime, const float InDeltaTime); // The full widget ticks and deletes messages
};

### MyChatWidget.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "ChatTutorial.h"
#include "MyChatWidget.h"
 
#include "MyHUD.h"
#include "MyPlayerState.h"
 
#define LOCTEXT\_NAMESPACE "SMyChatWidget"
 
void SMyChatWidget::Construct(const FArguments& InArgs)
{
	OwnerHUD \= InArgs.\_OwnerHUD;
 
	ChildSlot // Build the base for the chatbox
		.VAlign(VAlign\_Bottom)
		.HAlign(HAlign\_Left)
		.Padding(15) // move the chat box out from the corner 
		\[
			SNew(SVerticalBox) // outter container
			+ SVerticalBox::Slot()
			.AutoHeight()
			.MaxHeight(408.f)
			.VAlign(VAlign\_Bottom)
			\[
				SAssignNew(ListViewWidget, SListView< TSharedPtr< FSChatMsg \> \>) // a ListView widget that takes the array of messages and draws them on the hud
				.ListItemsSource(&Items) //The Items array is the source of this listview
				.OnGenerateRow(this, &SMyChatWidget::OnGenerateRowForList) // The widget is trying to draw, give the elements
				.ScrollbarVisibility(EVisibility::Hidden)
			\]
			+ SVerticalBox::Slot()
			.AutoHeight()
			.FillHeight(30.f)
			\[
				SNew(SHorizontalBox)
				+ SHorizontalBox::Slot()
				.AutoWidth()
				.MaxWidth(600.f)
				\[
					SAssignNew(ChatInput, SEditableText) // the widget for player input
					.OnTextCommitted(this, &SMyChatWidget::OnChatTextCommitted) // function to call when text is entered
					.OnTextChanged(this, &SMyChatWidget::OnChatTextChanged) // function to call when text is changed
					.ClearKeyboardFocusOnCommit(true)
					.Text(FText::FromString(""))
					.Font(FSlateFontInfo(fontinfo.FontMaterial, fontinfo.Size + 2)) // set the font for the input and add 2 font size
					.ColorAndOpacity(FLinearColor(1.f, 1.f, 1.f, 0.9f)) // send color and alpha R G B A
					.HintText(FText::FromString("Send a message to everyone.")) // hint message (optional)
				\]
			\]
		\];
}
 
TSharedRef<ITableRow\> SMyChatWidget::OnGenerateRowForList(TSharedPtr< FSChatMsg \> Item, const TSharedRef<STableViewBase\>& OwnerTable)
{
	if (!Items.IsValidIndex(0) || !Item.IsValid() || !Item.Get()) // Error catcher
		return
			SNew(STableRow< TSharedPtr< FSChatMsg \> \>, OwnerTable)
			\[
				SNew(SBox)
			\];
 
	if (Item.Get()\-\>Type \=== 1) // Type 1 is for player chat messages
	return
		SNew(STableRow< TSharedPtr< FSChatMsg \> \>, OwnerTable)
		\[
			SNew(SWrapBox)
			.PreferredWidth(600.f)
			+ SWrapBox::Slot()
			\[
				SNew(STextBlock) // places the timestamp
				.Text(Item.Get()\-\>Timestamp)
				.ColorAndOpacity(FLinearColor(0.25f, 0.25f, 0.25f, 1.f))
				.Font(fontinfo)
				.ShadowColorAndOpacity(FLinearColor::Black)
				.ShadowOffset(FIntPoint(1, 1))
			\]
			+ SWrapBox::Slot()
			\[
				SNew(STextBlock) // places the username
				.Text(Item.Get()\-\>Username)
				.ColorAndOpacity(FLinearColor::White)
				.Font(fontinfo)
				.ShadowColorAndOpacity(FLinearColor::Black)
				.ShadowOffset(FIntPoint(1, 1))
			\]
			+ SWrapBox::Slot()
			\[
				SNew(STextBlock) // adds the : between the username and chat text
				.Text(FText::FromString(" :  "))
				.ColorAndOpacity(FLinearColor(0.5f, 0.5f, 0.5f, 1.f))
				.Font(fontinfo)
				.ShadowColorAndOpacity(FLinearColor::Black)
				.ShadowOffset(FIntPoint(1, 1))
			\]
			+ SWrapBox::Slot()
			\[
				SNew(STextBlock) // places the user text
				.Text(Item.Get()\-\>Text)
				.ColorAndOpacity(FLinearColor(0.5f, 0.5f, 0.5f, 1.f))
				.Font(fontinfo)
				.ShadowColorAndOpacity(FLinearColor::Black)
				.ShadowOffset(FIntPoint(1, 1))
			\]
		\];
	else // 2 is for server messages, add more types for whispers friendslists etc
	return
		SNew(STableRow< TSharedPtr< FSChatMsg \> \>, OwnerTable)
		\[
			SNew(SWrapBox)
			.PreferredWidth(600.f)
			+ SWrapBox::Slot()
			\[
				SNew(STextBlock)
				.Text(Item.Get()\-\>Timestamp)
				.ColorAndOpacity(FLinearColor(0.25f, 0.25f, 0.25f, 1.f))
				.Font(fontinfo)
				.ShadowColorAndOpacity(FLinearColor::Black)
				.ShadowOffset(FIntPoint(1, 1))
			\]
			+ SWrapBox::Slot()
			\[
				SNew(STextBlock)
				.Text(Item.Get()\-\>Text)
				.ColorAndOpacity(FLinearColor(0.75f, 0.75f, 0.75f, 1.f))
				.Font(fontinfo)
				.ShadowColorAndOpacity(FLinearColor::Black)
				.ShadowOffset(FIntPoint(1, 1))
			\]
		\];
}
 
void SMyChatWidget::OnChatTextChanged(const FText& InText) // Called everytime the user presses a key on the input bar
{
	FString SText \= InText.ToString();
	if (SText.Len() \> 120) // if there are more that 120 characters in the char box, remove the rest
	{
		SText \= SText.Left(120);
		if (ChatInput.IsValid())
			ChatInput\-\>SetText(FText::FromString(SText));
	}
}
 
void SMyChatWidget::OnChatTextCommitted(const FText& InText, ETextCommit::Type CommitMethod) // The chat box is submitted
{
	if (CommitMethod !\= ETextCommit::OnEnter) // only complete if the textbox was comitted with enter
		return;
 
	if (ChatInput.IsValid())
	{
		FText NFText \= FText::TrimPrecedingAndTrailing(InText); // remove whitespace
		if (!NFText.IsEmpty())
		{
			AMyPlayerState\* MyPS \= Cast<AMyPlayerState\>(OwnerHUD\-\>MyPC\-\>PlayerState); // cast to our player state that contains the rpc functions
			if (MyPS)
			{
				// Insert code here if you wish to have / commands
				FSChatMsg newmessage; // make a new struct to send for replication
				newmessage.Init(1, FText::FromString(MyPS\-\>PlayerName), NFText); // initialize the message struct for replication
				if (newmessage.Type \> 0)
					MyPS\-\>UserChatRPC(newmessage); // Send the complete chat message to the PlayerState so it can be replicated then displayed
			}
		}
		ChatInput\-\>SetText(FText()); // clear the chat box now were done with it
	}
 
	FSlateApplication::Get().SetUserFocusToGameViewport(0, EFocusCause::SetDirectly); // set the players focus back to the gameport
}
 
void SMyChatWidget::AddMessage(const FSChatMsg& newmessage) // this function is the last in line and does the actual placing of the message
{
	int32 index \= Items.Add(MakeShareable(new FSChatMsg())); // add a new message to the chatbox array
	if (Items\[index\].IsValid())
	{
		Items\[index\]\-\>Init(newmessage.Type, newmessage.Username, newmessage.Text); // intiate our new message with the passed message
 
		int32 Year, Month, Day, DayOfWeek, Hour, Minute, Second, Millisecond; // set the timestamp and decay timer
		FPlatformTime::SystemTime(Year, Month, DayOfWeek, Day, Hour, Minute, Second, Millisecond);
		Items\[index\]\-\>SetTime(FText::FromString(FString::Printf(TEXT("\[ %02d:%02d:%02d \] "), Hour, Minute, Second)), FPlatformTime::Seconds()); // Comment this line to remove timestamps or replace FPlatformTime::Seconds() with 0 to slow decay the messages
 
		ListViewWidget\-\>RequestListRefresh(); // update the chatbox widget with our new array element
		ListViewWidget\-\>ScrollToBottom(); // scroll the chatbox to the bottom so our new message pops up
	}
}
 
void SMyChatWidget::Tick(const FGeometry& AllottedGeometry, const double InCurrentTime, const float InDeltaTime) // called everyframe and used for our gamelogic
{
	SCompoundWidget::Tick(AllottedGeometry, InCurrentTime, InDeltaTime);
 
	if (Items.Num()) // make sure there is atleast one element in the chatbox array
	{
		if (!Items\[0\]\-\>Created) // this element doesnt have a creation time and will last forever so lets set the creation time now and it was start decaying
			Items\[0\]\-\>Created \= InCurrentTime;
		if (InCurrentTime \- Items\[0\]\-\>Created \> 20) // the first message in the array is older that 20 seconds
		{
			Items\[0\]\-\>Destroy(); // clear the vars and pointers
			Items.RemoveAt(0); // remove the item from the array
			Items.Shrink();
		}
	}
}

Once you compile all the classes. Make sure your game is using your new GameMode in the Project Settings Maps&Modes setting.

thanks to [Rama](/User:Rama "User:Rama")!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Slate,\_Simple\_C%2B%2B\_Chat\_System&oldid=18817](https://wiki.unrealengine.com/index.php?title=Slate,_Simple_C%2B%2B_Chat_System&oldid=18817)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)