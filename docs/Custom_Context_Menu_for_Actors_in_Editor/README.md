Custom Context Menu for Actors in Editor - Epic Wiki                    

Custom Context Menu for Actors in Editor
========================================

Description
===========

This Wiki page will show you how to add a custom context menu for your Actors in the Unreal Editor. Here an example of a menu with a custom entry and tooltip when clicking on a custom Actor in the "Scene Outliner".

[![](https://d26ilriwvtzlb.cloudfront.net/9/9c/Custom_ContextMenu_01.png)](/File:Custom_ContextMenu_01.png)

[![](/skins/common/images/magnify-clip.png)](/File:Custom_ContextMenu_01.png "Enlarge")

An example image

Engine Code changes
-------------------

Some Engine code changes are required. I will probably submit a code pull request to Epic so they can add this code to the Engine, but for now you should be able to simply add this code by yourself. Its not too complicated.

First of all we need to add some code that allows us to insert menus into the existing context menu being filled in at engine level. For this purpose in "LevelEditorContextMenu.cpp" you need to add the following struct.

struct FLevelActorSpecificContextMenu
{
	/\*\*
	\* Fills in menu options for custom menu entries that can be associated with that actor
	\*
	\* @param MenuBuilder	The menu to add items to
        \* @param InCommandList	The container for all commands
        \* @param InCommandList	The container for all selected actors
	\*/
    static void AddActorSpecificMenu(class FMenuBuilder& MenuBuilder, const TSharedPtr< FUICommandList \>& InCommandList, const TArray<AActor\*\>& SelectedActors);
};

the function is implemented as follows

void FLevelActorSpecificContextMenu::AddActorSpecificMenu(class FMenuBuilder& MenuBuilder, const TSharedPtr< FUICommandList \>& InCommandList, const TArray<AActor\*\>& SelectedActors)
{
    for (AActor\* Actor : SelectedActors)
    {
        if (Actor)
	{
	    Actor\-\>AddCustomMenuEntries(MenuBuilder, InCommandList);
	}
    }
}

and we need to add the function call inside

void FLevelEditorContextMenu::FillMenu( FMenuBuilder& MenuBuilder, TWeakPtr<SLevelEditor\> LevelEditor, LevelEditorMenuContext ContextType, TSharedPtr<FExtender\> Extender )

at the end of the method you should now see something like this

	FLevelScriptEventMenuHelper::FillLevelBlueprintEventsMenu(MenuBuilder, SelectedActors);
 
        FLevelActorSpecificContextMenu::AddActorSpecificMenu(MenuBuilder, LevelEditorActions, SelectedActors);
 
	MenuBuilder.PopCommandList();
	MenuBuilder.PopExtender();

Last but not least in Actor.h we need to add the virtual method for "AddCustomMenuEntries", like this

#if WITH\_EDITOR
class FUICommandList;  // Forward declaration - editor only
#endif

and add the method in one of the public places within the AActor class

 
#if WITH\_EDITOR
    //Used to add a custom menu for custom actors
    virtual void AddCustomMenuEntries(class FMenuBuilder& MenuBuilder, const TSharedPtr< FUICommandList \>& InCommandList) { }
#endif

one more ting that needs to be done is add a method to remove existing commands from the list of commands. In UICommandList.h you need to add this method declaration in the public scope of the "FUICommandList" class.

    bool RemoveCommandAndAction(TSharedPtr<const FUICommandInfo\> Command);

and in the FUICommandInfo.cpp add the method implementation.

bool FUICommandList::RemoveCommandAndAction(TSharedPtr<const FUICommandInfo\> Command)
{
    const FUIAction\* Action \= UICommandBindingMap.Find(Command);
    if (Action)
    {
        UICommandBindingMap.Remove(Command);
        return true;
    }
    return false;
}

we are now done modifying the Unreal Engine - lets move on to our own Game code.

Game code changes
-----------------

First of all we need to define a new command class - something like this Create a new Header File called "MyEditorCommands.h"

#pragma once
 
#if WITH\_EDITOR
#include "UnrealEd.h"
#include "Commands.h"
#include "UICommandList.h"
#include "UICommandInfo.h"
 
class FMyEditorCommands : public TCommands < FMyEditorCommands \>
{
public:
	FMyEditorCommands();
 
	virtual void RegisterCommands() override;
        static void MapActions(AActor\* InActor, const TSharedPtr< FUICommandList \>& InCommandList);
	static void AddToMenu(class FMenuBuilder& MenuBuilder);
 
	TSharedPtr< FUICommandInfo \> SomeCommandData;   //you need one of these for each command you want to execute
};
#endif

create a cpp file called "MyEditorCommands.cpp"

#include "MyGameProject.h"
#include "MyEditorCommands.h"
#include "MyCustomActorObject.h"
 
#if WITH\_EDITOR
 
FMyEditorCommands::FMyEditorCommands() : 
TCommands<FMyEditorCommands\>(TEXT("MyEditorCommands"), NSLOCTEXT("MyEditor", "MyEditorCommands", "My-Editor"), NAME\_None, FEditorStyle::GetStyleSetName())
{
 
}
 
void FMyEditorCommands::RegisterCommands()
{
	UI\_COMMAND(SomeCommandData, "Do Some stuff", "Description of what my stuff is doing.", EUserInterfaceActionType::Button, FInputGesture());
}
 
void FMyEditorCommands::MapActions(AActor\* InActor, const TSharedPtr< FUICommandList \>& InCommandList)
{
	Register();
 
	AMyCustomActorObject\* pMyObject \= Cast<AMyCustomActorObject\>(InActor);
 
	if (pMyObject)
	{
 
        InCommandList\-\>RemoveCommandAndAction(Get().SomeCommandData);
 
        InCommandList\-\>MapAction(
		Get().SomeCommandData,
		FExecuteAction::CreateUObject(pMyObject , &AMyCustomActorObject::MyNonStaticMethod));
	}
}
 
void FMyEditorCommands::AddToMenu(class FMenuBuilder& MenuBuilder)
{
	MenuBuilder.BeginSection("MyCustomStuff", FText::FromString("MyCustomActor"));
	{
		MenuBuilder.AddMenuEntry(Get().SomeCommandData);
	}
	MenuBuilder.EndSection();
}
 
#endif

all that is left to do is implement and override the method in your custom actor class like this

//add these headers to your cpp file
#if WITH\_EDITOR
#include "UnrealEd.h"
#include "MultiBox.h"
#include "Commands.h"
#include "GlobalEditorCommonCommands.h"
#include "UICommandList.h"
#include "Private/Helpers/Tool/AWEditorCommands.h"
#endif
 
//and then add the implementation here
 
#if WITH\_EDITOR
void AMyCustomActorObject::AddCustomMenuEntries(class FMenuBuilder& MenuBuilder, const TSharedPtr< FUICommandList \>& InCommandList)
{
    FMyEditorCommands::MapActions(this, InCommandList);
    FMyEditorCommands::AddToMenu(MenuBuilder);
}
#endif

That's it now you can implement as many context menu entries as you want for your custom objects. If we can get Epic to add the necessary code for the engine side then adding custom context menus is a piece of cake.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Custom\_Context\_Menu\_for\_Actors\_in\_Editor&oldid=10058](https://wiki.unrealengine.com/index.php?title=Custom_Context_Menu_for_Actors_in_Editor&oldid=10058)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)