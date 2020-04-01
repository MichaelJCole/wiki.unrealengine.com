Slate, Loading Styles & Resources - Epic Wiki                     

Slate, Loading Styles & Resources
=================================

(Redirected from [Loading Slate Styles & Resources](/index.php?title=Loading_Slate_Styles_%26_Resources&redirect=no "Loading Slate Styles & Resources"))

**Rate this Article:**

1.67

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_half.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (3 votes)

Approved for Versions:(please verify)

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png)

**Some or all of the information on this page is inconsistent, irrelevant or confusing.**

Please help clean it up if you are able.

[![](https://d3ar1piqh1oeli.cloudfront.net/2/29/Slate_Styles%26Resources.png/500px-Slate_Styles%26Resources.png)](/File:Slate_Styles%26Resources.png)

[![](/skins/common/images/magnify-clip.png)](/File:Slate_Styles%26Resources.png "Enlarge")

Spell icons are property of Electronic Arts, I claim no ownership of these images. Long live UO!

Before reading these sources, be sure to take a look at the Hello Slate tutorial, it will bring you up to speed on the necessary reading to process the information below. There are some differences to be sure, we have also added a subclassed Game Module (FDefaultGameModuleImpl) class to the mix, in addition to the AHUD and SCompoundWidget. As of 4.0.2 these classes are working on an otherwise unmodified (except for the in-editor mods in Hello Slate) build, other than that my engine/environment is completely unmodified. The Hello Slate tutorial can be found here...  
[https://wiki.unrealengine.com/Slate,\_Hello](https://wiki.unrealengine.com/Slate,_Hello)  
  
So, what's going on here. I'll just give a quick run-down of execution when you launch a PIE or stand-alone game. The first thing that happens is the Game Module is instanced/loaded, in this case that happens to be an FMyProject type. Our FMyProject object then instances FMyUIResources as an object named MyUIResources. MyUIResources then loads and registers all of our resources with Slate, it stores a handle to these resources internally which we will be using later. The next thing that happens related to this code happens in AMyHUD.  
  
AMyHUD is instanced and loaded by the system on every execution of the PIE, or whenever else the HUD is loaded. It should be set as the designated HUD for our game-type in the editor before running the game, see Hello Slate under the coding tutorials if you have no idea what I'm talking about. The first of our AMyHUD functions to be executed is AMyHUD::BeginPlay(). BeginPlay() creates our widget then gives the Viewport a handle on that widget so that it can be drawn to the screen. It then asks the widget to SetVisibility() to EVisibility::Visible and that's the end of it. Before we move on lets take a step back and talk about SMyUIWidget.  
  
SMyUIWidget only has one (required) function, SMyUIWidget::Construct(). Construct first asks our Game Module, FMyGameModule, to give us a handle on the Slate Resources we Initialized() earlier. Then it uses that handle to get a brush, and last it creates the child widgets, using a pointer to the brush we just got a second ago. Destruction should be handled by UE4 and Slate, the only deviation from SCompoundWidget is the addition of a FSlateGameResources TSharedPtr (TSharedPtr<FSlateGameResources>) which should also be destructed when the refcount to it becomes zero.  
  
We get TSharedPtrs from the Game Module because we want to be sure that the resources will be for no reason inaccessible to anything that would use them, by having the Game Module hand out TSharedPtrs to the resources, the refcount of these resources will never be zero while something is still using them. When the game shuts down the Game Module's ShutdownModule() is called. ShutdownModule() calls the default ShutdownModule() of it's parent class, then it calls MyUIResources.Shutdown() which Unregisters itself with Slate, dereferences the shared pointer, and frees the memory if the refcount is zero. Take a look at FMyUIResources Shutdown() method to see how this is done.  
  
That's all there is to it.

////////////////////////////////////////////////////////////////////////////////////////////////////
/////Date: April 2, 2014
/////Author: Bleakwise
/////File: MyGameResources.h
 
#pragma once
 
#include "MyHUD.h"
#include "Slate.h"
#include "SlateGameResources.h"
 
////////////////////////////////////////////////////////////////////////////////////////////////////
/////Data Structure and Interface for maintaining SlateGameResources on Game to Game basis
class FMyUIResources
{
public:
	FMyUIResources() : m\_Path("/Game/UI"), MyUIResources(NULL) { } ;
 
	/\*Loads resources and registers them with Slate\*/
	/\*Do this before trying to use resources\*/
	void Initialize();
 
	/\*cleanup\*/
	/\*Do this when shutting down game module\*/
	void Shutdown();
 
	/\*reloads textures used by slate renderer\*/
	/\*Does nothing at the moment\*/
	void ReloadTextures();
 
	/\*Give caller a pointer to our FSlateGameResources\*/
	TSharedPtr<FSlateGameResources\> GetSlateGameResources();
 
protected:
	/\*Creates resources\*/
	TSharedRef<class FSlateGameResources\> Create();
 
	/\*Defined in Cpp file, change as needed\*/
	const FString m\_Path;
 
	/\*Poitner to game resources, Initialize() before using\*/
	TSharedPtr<FSlateGameResources\> MyUIResources;
};
 
class SMyUIWidget : public SCompoundWidget
{
public:
	SLATE\_BEGIN\_ARGS(SMyUIWidget)
	{}
 
	SLATE\_ARGUMENT(TWeakObjectPtr<AMyHUD\>, OwnerHUD)
 
		SLATE\_END\_ARGS()
 
	//needed for every widget, constructs widget and children.
	void Construct(const FArguments& InArgs);
 
protected:
	//Pointer to our parent HUD
	/////Consdier making OwnerHUD a more base type for polymorphic HUDs
	TWeakObjectPtr<class AMyHUD\> OwnerHUD;
 
	/\*Pointer to resources in GameModule\*/
	TSharedPtr<FSlateGameResources\> MyUIResources;
};

  

////////////////////////////////////////////////////////////////////////////////////////////////////
/////Date: April 2, 2014
/////Author: Bleakwise
/////File: MyGameResources.cpp
 
#include "MyProject.h"
#include "SlateGameResources.h"
#include "MyGameResources.h"
 
////////////////////////////////////////////////////////////////////////////////////////////////////
     /\*SMyUIWidget\*//\*SMyUIWidget\*//\*SMyUIWidget\*//\*SMyUIWidget\*//\*SMyUIWidget\*//\*SMyUIWidget\*/
////////////////////////////////////////////////////////////////////////////////////////////////////
 
void SMyUIWidget::Construct(const FArguments& InArgs)
{
 
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Get handle on game resources from GameModule
	MyUIResources \= FModuleManager::GetModuleChecked<FMyProject\>(FName("MyProject")).GetSlateGameResources();
 
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Get handle on spell\_heal Slate Brush
	/////name: member\_icon
	const FSlateBrush \*m\_icon \= MyUIResources\-\>GetBrush(FName("/spells/spell\_heal"));
 
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Set owner HUD to whatever HUD called system to create this widget
	/////Consider type if using multiple HUDs/types, see declaration in header
	OwnerHUD \= InArgs.\_OwnerHUD;
 
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Create the child widgets
 
	//No need to add a new slot, ChildSlot is one, 
	ChildSlot.VAlign(VAlign\_Bottom).HAlign(HAlign\_Center)
	\[//start adding contents
		SNew(SOverlay)
		/\* + operator adds a new slot \*/
		+ SOverlay::Slot().HAlign(HAlign\_Fill).VAlign(VAlign\_Fill)
		\[/\* \[ operator begins adding things to our new slot's contents \*/
			SNew(SHorizontalBox).Visibility(EVisibility::Visible)
			//Add slots to HorizontalBox, these will hold images
			+ SHorizontalBox::Slot().HAlign(HAlign\_Left).VAlign(VAlign\_Bottom)
			\[   //
				SNew(SImage).Image(m\_icon)
			\]
			+ SHorizontalBox::Slot().HAlign(HAlign\_Left).VAlign(VAlign\_Bottom)
			\[
				SNew(SImage).Image(m\_icon)
			\]
			+ SHorizontalBox::Slot().HAlign(HAlign\_Left).VAlign(VAlign\_Bottom)
			\[
				SNew(SImage).Image(m\_icon)
			\]
			+ SHorizontalBox::Slot().HAlign(HAlign\_Left).VAlign(VAlign\_Bottom)
			\[
				SNew(SImage).Image(m\_icon)
			\]
		\]//End slotting of SOverlay
	\];//End slotting ChildSlot
}
 
////////////////////////////////////////////////////////////////////////////////////////////////////
     /\*FMyUIResources\*//\*FMyUIResources\*//\*FMyUIResources\*//\*FMyUIResources\*//\*FMyUIResources\*/
////////////////////////////////////////////////////////////////////////////////////////////////////
 
void FMyUIResources::Initialize()
{
	if (!MyUIResources.IsValid())
	{
		MyUIResources \= Create();
		FSlateStyleRegistry::RegisterSlateStyle(\*MyUIResources);
	}
}
 
TSharedPtr<FSlateGameResources\> FMyUIResources::GetSlateGameResources()
{
	return MyUIResources;
}
 
TSharedRef<class FSlateGameResources\> FMyUIResources::Create()
{
	return FSlateGameResources::New(FName("MyUIResources"), m\_Path, m\_Path);
}
 
/\*Unregister resources/styles with Slate, cleanup, free memory\*/
void FMyUIResources::Shutdown()
{
	//Unregister \*MyUIResources with Slate
	FSlateStyleRegistry::UnRegisterSlateStyle(\*MyUIResources);
 
	//Debugging
	ensure(MyUIResources.IsUnique());
 
	//Removes reference to resources, decrements refcount, destroys resources if refcount=0
	//Do this to all SharedPtrs on Shutdown() or SomethingSimilar() to avoid memory leak
	MyUIResources.Reset();
}

  

////////////////////////////////////////////////////////////////////////////////////////////////////
/////Date: April 2, 2014
/////Author: Bleakwise
/////File: MyHUD.h
 
#pragma once
 
#include "GameFramework/HUD.h"
#include "MyHUD.generated.h"
 
/\*\*
\*
\*/
UCLASS()
class AMyHUD : public AHUD
{
public:
	GENERATED\_UCLASS\_BODY()
 
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Called as soon as game starts, create SCompoundWidget and give Viewport access
	void BeginPlay();
 
protected:
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Reference to SCompoundWidget
	TSharedPtr<class SMyUIWidget\> MyUIWidget;
};

  

////////////////////////////////////////////////////////////////////////////////////////////////////
/////Date: April 2, 2014
/////Author: Bleakwise
/////File: MyHUD.cpp
 
#include "MyProject.h"
#include "MyGameResources.h"
#include "MyHUD.h"
 
 
AMyHUD::AMyHUD(const class FPostConstructInitializeProperties& PCIP)
: Super(PCIP)
{
 
}
 
void AMyHUD::BeginPlay()
{
 
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Create a SMyUIWidget on heap referenced by MyUIWidget pointer member
	SAssignNew(MyUIWidget, SMyUIWidget).OwnerHUD(this);
 
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Pass our viewport a weak reference to our widget, will not increment refcount
	if (GEngine\-\>IsValidLowLevel())
		GEngine\-\>GameViewport\-\>
		AddViewportWidgetContent(SNew(SWeakWidget).PossiblyNullContent(MyUIWidget.ToSharedRef()));
 
	if (MyUIWidget.IsValid())
	{
		////////////////////////////////////////////////////////////////////////////////////////////////////
		/////Set widget's properties as visibile (sets child widget's properties recurisvely)
		MyUIWidget\-\>SetVisibility(EVisibility::Visible);
	}
}

  

////////////////////////////////////////////////////////////////////////////////////////////////////
/////Date: April 4, 2014
/////Author: Bleakwise
/////File: MyProject.h
 
#pragma once
 
#include "Engine.h"
 
#include "MyGameResources.h"
 
class FMyProject : public FDefaultGameModuleImpl
{
public:
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Called when GameModule is loaded, load any resources game may need here
	void StartupModule();
 
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Called when GameModule is unloaded, before shutdown, unload resources/cleanup here
	void ShutdownModule();
 
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Give a handle to MyUIResources to anyone who asks
	TSharedPtr<FSlateGameResources\> GetSlateGameResources();
 
protected:
 
	////////////////////////////////////////////////////////////////////////////////////////////////////
	/////Data Structure and Interface for maintaining SlateGameResources on Game to Game basis
	FMyUIResources MyUIResources;
 
};

  

////////////////////////////////////////////////////////////////////////////////////////////////////
/////Date: April 2, 2014
/////Author: Bleakwise
/////File: MyProject.cpp
 
#include "MyProject.h"
 
#include "MyProject.generated.inl"
 
IMPLEMENT\_PRIMARY\_GAME\_MODULE( FMyProject, MyProject, "MyProject" );
 
void FMyProject::StartupModule()
{
	FDefaultGameModuleImpl::StartupModule();
 
	/\*Loads resources and registers them with Slate\*/
	/\*Do this before trying to use resources\*/
	MyUIResources.Initialize();
 
	/\*TODO: Anything else game module might need to do on load\*/
}
 
void FMyProject::ShutdownModule()
{
	FDefaultGameModuleImpl::ShutdownModule();
 
	/\*Unregister resources/styles with Slate, cleanup, free memory\*/
	MyUIResources.Shutdown();
 
	/\*Cleanup/free any resources here\*/
}
 
/\*First defined here, no need to call parent\*/
/\*Give caller a pointer to our FSlateGameResources\*/
TSharedPtr<FSlateGameResources\> FMyProject::GetSlateGameResources()
{
	/\*Give caller a pointer to our FSlateGameResources\*/
	/\*Giving strong pointer, helps gurantee access to resources\*/
	return MyUIResources.GetSlateGameResources();
}

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Slate,\_Loading\_Styles\_%26\_Resources&oldid=8305](https://wiki.unrealengine.com/index.php?title=Slate,_Loading_Styles_%26_Resources&oldid=8305)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)