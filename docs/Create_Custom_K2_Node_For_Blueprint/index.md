Create Custom K2 Node For Blueprint - Epic Wiki                    

Create Custom K2 Node For Blueprint
===================================

Contents:
---------

I will show you how to create real Blueprint Node using C++. Normally all you need is expose function from C++, back to blueprints, but creating custom node have big benefits. One the biggest is dynamic allocation of pins!

  

Preparations
------------

You will need to make some preprations before you can make custom node. First you need to add custom Editor Module your plugin, game or engine module. As it requires quite a bit of editor specific modules dependencies. For now assume you are working on plugin. open .uplugin file and add this code:

"Modules" :
\[
    {
        "Name": "GameInventorySystem",
        "Type": "Runtime",
        "LoadingPhase" : "PreDefault"
    },
    {
        "Name" : "GameInventorySystemEditor",
        "Type" : "Editor"
    }
\],

The first module is your runtime module. Second one is editor module, which will have dependencies on runtime module. Name your modules however you want, although it's good practice to postfix editor modules with Editor.

Also please note I will be using code from my own plugin.

Now in runtime module we need to add, BlueprintFunctionLibrary, and in it at least one function.

class GAMEINVENTORYSYSTEM\_API UGISBlueprintFunctionLibrary : public UBlueprintFunctionLibrary
{
    GENERATED\_UCLASS\_BODY()
public:
    UFUNCTION(BlueprintCallable, meta \= (WorldContext \= "WorldContextObject", FriendlyName \= "Create Item Data", BlueprintInternalUseOnly \= "true"), Category \= "Game Inventory System")
    static class UGISItemData\* Create(UObject\* WorldContextObject, TSubclassOf<class UGISItemData\> ItemType, APlayerController\* OwningPlayer);
};

Important part about UFUNCTION is BlueprintInternalUseOnly, which hides node from blueprint. That is fully intentional, we don't want this node to show in BP. Also don't forget to add implementation. Which will return pointer to created item. You can do it just by using ConstructObject<> or you can create template function like this:

template< class T \>
T\* CreateDataItem(APlayerController\* OwningPlayer, UClass\* UserWidgetClass)
{
    if (!UserWidgetClass\-\>IsChildOf(UGISItemData::StaticClass()))
    {
        return nullptr;
    }
 
// Assign the outer to the game instance if it exists, otherwise use the player controller's world
    UWorld\* World \= OwningPlayer\-\>GetWorld();
    StaticCast<UObject\*\>(World);
    UGISItemData\* NewWidget \= ConstructObject<UGISItemData\>(UserWidgetClass, OwningPlayer);
    return Cast<T\>(NewWidget);
}

You can also add additional post construction initialization steps in this function, to accomodate for your specific needs.

  
Now move to editor module and open YourModuleName.Build.cs

Add this:

 `PublicIncludePaths.AddRange(
       new string[] {
           "YourRunTimeModule",
           "YourRunTimeModule/Public"
          // ... add public include paths required here ...
       }
   );
   PrivateIncludePaths.AddRange(
       new string[] {
           "YourRunTimeModuleEditor/Private",
           // ... add other private include paths required here ...
       }
   );
   PublicDependencyModuleNames.AddRange(
       new string[]
       {
           "Core",
           "YourRunTimeModule"
           // ... add other public dependencies that you statically link with here ...
       }
   );
   PrivateDependencyModuleNames.AddRange(
       new string[]
       {
           // ... add private dependencies that you statically link with here ...
           "Core",
           "CoreUObject",
           "InputCore",
           "Slate",
           "Engine",
           "AssetTools",
           "UnrealEd", // for FAssetEditorManager
           "KismetWidgets",
           "KismetCompiler",
           "BlueprintGraph",
           "GraphEditor",
           "Kismet",  // for FWorkflowCentricApplication
           "PropertyEditor",
           "EditorStyle",
           "Slate",
           "SlateCore",
           "MovieSceneCore",
           "Sequencer",
           "DetailCustomizations",
           "Settings",
           "RenderCore",
       }
   );` 

Implementing Node:
------------------

Now add new class, to your editor module. Name it something Like BPNode\_MyNode (mine is named BPNode\_CreateItemData). Epic convention is K2, but it was from before Blueprint name has been invented (;.

Header:

#pragma once
#include "K2Node.h"
#include "K2Node\_ConstructObjectFromClass.h"
#include "BPNode\_CreateItemData.generated.h"
 
UCLASS(BlueprintType, Blueprintable)
class GAMEINVENTORYSYSTEMEDITOR\_API UBPNode\_CreateItemData : public UK2Node\_ConstructObjectFromClass
{
    GENERATED\_UCLASS\_BODY()
 
    // Begin UEdGraphNode interface.
    virtual void AllocateDefaultPins() override;
    virtual FLinearColor GetNodeTitleColor() const override;
    //this is where node will be expanded with additional pins!
    virtual void ExpandNode(class FKismetCompilerContext& CompilerContext, UEdGraph\* SourceGraph) override;
    // End UEdGraphNode interface.
 
    // Begin UK2Node interface
    void GetMenuEntries(FGraphContextMenuBuilder& ContextMenuBuilder) const;
    virtual FText GetMenuCategory() const override;
    // End UK2Node interface.
 
    /\*\* Get the owning player pin \*/
    UEdGraphPin\* GetOwningPlayerPin() const;
 
protected:
    /\*\* Gets the default node title when no class is selected \*/
    virtual FText GetBaseNodeTitle() const;
    /\*\* Gets the node title when a class has been selected. \*/
    virtual FText GetNodeTitleFormat() const;
    /\*\* Gets base class to use for the 'class' pin.  UObject by default. \*/
    virtual UClass\* GetClassPinBaseClass() const;
    \*\*  \*/
    virtual bool IsSpawnVarPin(UEdGraphPin\* Pin) override;
};

Implementation:

// Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
 
#include "GameInventorySystemEditor.h"
 
#include "GISBlueprintFunctionLibrary.h"
#include "GISItemData.h"
 
#include "KismetCompiler.h"
#include "BlueprintNodeSpawner.h"
#include "EditorCategoryUtils.h"
#include "K2ActionMenuBuilder.h"
 
#include "BPNode\_CreateItemData.h"
 
#define LOCTEXT\_NAMESPACE "GameInventorySystem"
 
//Helper which will store one of the function inputs we excpect BP callable function will have.
struct FBPNode\_CreateItemDataHelper
{
	static FString OwningPlayerPinName;
};
 
FString FBPNode\_CreateItemDataHelper::OwningPlayerPinName(TEXT("OwningPlayer"));
 
UBPNode\_CreateItemData::UBPNode\_CreateItemData(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
	NodeTooltip \= LOCTEXT("NodeTooltip", "Creates a new Item Data");
}
 
//Adds default pins to node. These Pins (inputs ?) are always displayed.
void UBPNode\_CreateItemData::AllocateDefaultPins()
{
	Super::AllocateDefaultPins();
 
	const UEdGraphSchema\_K2\* K2Schema \= GetDefault<UEdGraphSchema\_K2\>();
 
	// OwningPlayer pin
	UEdGraphPin\* OwningPlayerPin \= CreatePin(EGPD\_Input, K2Schema\-\>PC\_Object, TEXT(""), APlayerController::StaticClass(), false, false, FBPNode\_CreateItemDataHelper::OwningPlayerPinName);
	SetPinToolTip(\*OwningPlayerPin, LOCTEXT("OwningPlayerPinDescription", "The player that 'owns' the this item."));
}
 
FLinearColor UBPNode\_CreateItemData::GetNodeTitleColor() const
{
	return Super::GetNodeTitleColor();
}
 
FText UBPNode\_CreateItemData::GetBaseNodeTitle() const
{
	return LOCTEXT("CreateItemData\_BaseTitle", "Create Item Data");
}
 
FText UBPNode\_CreateItemData::GetNodeTitleFormat() const
{
	return LOCTEXT("CreateItemData", "Create {ClassName} Item Data");
}
 
//which class can be used with this node to create objects. All childs of class can be used.
UClass\* UBPNode\_CreateItemData::GetClassPinBaseClass() const
{
	return UGISItemData::StaticClass();
}
 
//Set context menu category in which our node will be present.
FText UBPNode\_CreateItemData::GetMenuCategory() const
{
	return FText::FromString("Game Inventory System");
}
 
void UBPNode\_CreateItemData::GetMenuEntries(FGraphContextMenuBuilder& ContextMenuBuilder) const
{
	UBPNode\_CreateItemData\* TemplateNode \= NewObject<UBPNode\_CreateItemData\>(GetTransientPackage(), GetClass());
 
	const FString Category \= TEXT("UGame Inventory System");
	const FText   MenuDesc \= LOCTEXT("CreateItemDataMenuOption", "Create Item Data...");
	const FString Tooltip \= TEXT("Create a new Item Data container");
 
	TSharedPtr<FEdGraphSchemaAction\_K2NewNode\> NodeAction \= FK2ActionMenuBuilder::AddNewNodeAction(ContextMenuBuilder, Category, MenuDesc, Tooltip);
	NodeAction\-\>NodeTemplate \= TemplateNode;
}
 
//gets out predefined pin
UEdGraphPin\* UBPNode\_CreateItemData::GetOwningPlayerPin() const
{
	UEdGraphPin\* Pin \= FindPin(FBPNode\_CreateItemDataHelper::OwningPlayerPinName);
	check(Pin \== NULL || Pin\-\>Direction \== EGPD\_Input);
	return Pin;
}
 
bool UBPNode\_CreateItemData::IsSpawnVarPin(UEdGraphPin\* Pin)
{
	return(Super::IsSpawnVarPin(Pin) &&
		Pin\-\>PinName !\= FBPNode\_CreateItemDataHelper::OwningPlayerPinName);
}
 
//and this is where magic really happens. This will expand node for our custom object, with properties
//which are set as EditAwnywhere and meta=(ExposeOnSpawn), or equivalent in blueprint.
void UBPNode\_CreateItemData::ExpandNode(class FKismetCompilerContext& CompilerContext, UEdGraph\* SourceGraph)
{
	Super::ExpandNode(CompilerContext, SourceGraph);
 
	//look for static function in BlueprintFunctionLibrary
	//In this class and of this name
	static FName Create\_FunctionName \= GET\_FUNCTION\_NAME\_CHECKED(UGISBlueprintFunctionLibrary, Create);
	//with these inputs (as a Side note, these should be probabaly FName not FString)
	static FString WorldContextObject\_ParamName \= FString(TEXT("WorldContextObject"));
	static FString WidgetType\_ParamName \= FString(TEXT("ItemType"));
	static FString OwningPlayer\_ParamName \= FString(TEXT("OwningPlayer"));
 
	//get pointer to self;
	UBPNode\_CreateItemData\* CreateItemDataNode \= this;
 
	//get pointers to default pins.
	//Exec pins are those big arrows, connected with thick white lines.
	UEdGraphPin\* SpawnNodeExec \= CreateItemDataNode\-\>GetExecPin();
	//gets world context pin from our static function
	UEdGraphPin\* SpawnWorldContextPin \= CreateItemDataNode\-\>GetWorldContextPin();
	//the same as above
	UEdGraphPin\* SpawnOwningPlayerPin \= CreateItemDataNode\-\>GetOwningPlayerPin();
	//get class pin which is used to determine which class to spawn.
	UEdGraphPin\* SpawnClassPin \= CreateItemDataNode\-\>GetClassPin();
	//then pin is the same as exec pin, just on the other side (the out arrow).
	UEdGraphPin\* SpawnNodeThen \= CreateItemDataNode\-\>GetThenPin();
	//result pin, which will output our spawned object.
	UEdGraphPin\* SpawnNodeResult \= CreateItemDataNode\-\>GetResultPin();
 
	UClass\* SpawnClass \= (SpawnClassPin !\= NULL) ? Cast<UClass\>(SpawnClassPin\-\>DefaultObject) : NULL;
	if ((0 \== SpawnClassPin\-\>LinkedTo.Num()) && (NULL \== SpawnClass))
	{
		CompilerContext.MessageLog.Error(\*LOCTEXT("CreateItemDAtaNodeMissingClass\_Error", "Spawn node @@ must have a class specified.").ToString(), CreateItemDataNode);
		// we break exec links so this is the only error we get, don't want the CreateItemData node being considered and giving 'unexpected node' type warnings
		CreateItemDataNode\-\>BreakAllNodeLinks();
		return;
	}
 
	//////////////////////////////////////////////////////////////////////////
	// create 'UWidgetBlueprintLibrary::Create' call node
	UK2Node\_CallFunction\* CallCreateNode \= CompilerContext.SpawnIntermediateNode<UK2Node\_CallFunction\>(CreateItemDataNode, SourceGraph);
	CallCreateNode\-\>FunctionReference.SetExternalMember(Create\_FunctionName, UBPNode\_CreateItemData::StaticClass());
	CallCreateNode\-\>AllocateDefaultPins();
 
	//allocate nodes for created widget.
	UEdGraphPin\* CallCreateExec \= CallCreateNode\-\>GetExecPin();
	UEdGraphPin\* CallCreateWorldContextPin \= CallCreateNode\-\>FindPinChecked(WorldContextObject\_ParamName);
	UEdGraphPin\* CallCreateWidgetTypePin \= CallCreateNode\-\>FindPinChecked(WidgetType\_ParamName);
	UEdGraphPin\* CallCreateOwningPlayerPin \= CallCreateNode\-\>FindPinChecked(OwningPlayer\_ParamName);
	UEdGraphPin\* CallCreateResult \= CallCreateNode\-\>GetReturnValuePin();
 
	// Move 'exec' connection from create widget node to 'UWidgetBlueprintLibrary::Create'
	CompilerContext.MovePinLinksToIntermediate(\*SpawnNodeExec, \*CallCreateExec);
 
	if (SpawnClassPin\-\>LinkedTo.Num() \> 0)
	{
		// Copy the 'blueprint' connection from the spawn node to 'UWidgetBlueprintLibrary::Create'
		CompilerContext.MovePinLinksToIntermediate(\*SpawnClassPin, \*CallCreateWidgetTypePin);
	}
	else
	{
		// Copy blueprint literal onto 'UWidgetBlueprintLibrary::Create' call 
		CallCreateWidgetTypePin\-\>DefaultObject \= SpawnClass;
	}
 
	// Copy the world context connection from the spawn node to 'UWidgetBlueprintLibrary::Create' if necessary
	if (SpawnWorldContextPin)
	{
		CompilerContext.MovePinLinksToIntermediate(\*SpawnWorldContextPin, \*CallCreateWorldContextPin);
	}
 
	// Copy the 'Owning Player' connection from the spawn node to 'UWidgetBlueprintLibrary::Create'
	CompilerContext.MovePinLinksToIntermediate(\*SpawnOwningPlayerPin, \*CallCreateOwningPlayerPin);
 
	// Move result connection from spawn node to 'UWidgetBlueprintLibrary::Create'
	CallCreateResult\-\>PinType \= SpawnNodeResult\-\>PinType; // Copy type so it uses the right actor subclass
	CompilerContext.MovePinLinksToIntermediate(\*SpawnNodeResult, \*CallCreateResult);
 
	//////////////////////////////////////////////////////////////////////////
	// create 'set var' nodes
 
	// Get 'result' pin from 'begin spawn', this is the actual actor we want to set properties on
	UEdGraphPin\* LastThen \= FKismetCompilerUtilities::GenerateAssignmentNodes(CompilerContext, SourceGraph, CallCreateNode, CreateItemDataNode, CallCreateResult, GetClassToSpawn());
 
	// Move 'then' connection from create widget node to the last 'then'
	CompilerContext.MovePinLinksToIntermediate(\*SpawnNodeThen, \*LastThen);
 
	// Break any links to the expanded node
	CreateItemDataNode\-\>BreakAllNodeLinks();
}
 
#undef LOCTEXT\_NAMESPACE

Hopefully comments should explain what this code does. The short version is, it create node with dynamically allocated pins, which construct custom objects.

  
[iniside](/index.php?title=User:Iniside&action=edit&redlink=1 "User:Iniside (page does not exist)") ([talk](/index.php?title=User_talk:Iniside&action=edit&redlink=1 "User talk:Iniside (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Create\_Custom\_K2\_Node\_For\_Blueprint&oldid=10481](https://wiki.unrealengine.com/index.php?title=Create_Custom_K2_Node_For_Blueprint&oldid=10481)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)