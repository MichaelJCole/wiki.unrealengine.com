How To Create Custom Blueprint Pin - Epic Wiki                    

How To Create Custom Blueprint Pin
==================================

About
-----

In this tutorial I will show you how to create custom Pins, which can be displayed in blueprint functions or nodes. If you ever used GameplayTags, I'm sure you noticed that some nodes have drop down tag list, you can select, instead of typing tags manually, and in this tutorial I will show you how to do it.

  

Setting up
----------

First you will need Editor module in your plugin/game project. You can find information how to add it here:

[https://answers.unrealengine.com/questions/41509/extending-editor-engine.html](https://answers.unrealengine.com/questions/41509/extending-editor-engine.html)

Once you have you module working, loading and compiling, you will need edit, editor module \*.Build.cs file. So you public or private dependency modules will look like this:

			PublicDependencyModuleNames.AddRange(
				new string\[\]
				{
					"Core",
                    "Engine",
                    "CoreUObject",
                    "GameAttributes",
                    "UnrealEd",
                    "BlueprintGraph",
                    "GraphEditor",
                    "PropertyEditor",
                    "SlateCore",
                    "Slate",
                    "EditorStyle",
                    "Kismet",
                    "KismetCompiler"
					// ... add other public dependencies that you statically link with here ...
				}
				);

GameAttributes is my custom module, you should add here you custom modules, to which you want have dependencies.

  
You will also need struct to customize your pin. I'm pretty sure you can do it against any type (including default Unreal Types), but I strongly advise to not do it. Since you end up with customizing everything, in every node, which might not need it ;).

Create new header file in your runtime module (or add to any existing file) new USTRUCT()

USTRUCT(BlueprintType)
struct FGAAttribute
{
	GENERATED\_USTRUCT\_BODY()
public:
        //It's important to mark property as UPROPERTY(), it doesn't need to have any specifiers though.
	UPROPERTY(BlueprintReadOnly)
		FName AttributeName;
};

Implementation
--------------

Now we need to add several new files to project. First let's add actual pin customization class. Call it however you want, but good practice is to end it with Pin. Header:

#pragma once
#include "SlateBasics.h"
#include "SGraphPin.h"
 
 
class SGAAttributePin : public SGraphPin
{
public:
	SLATE\_BEGIN\_ARGS(SGAAttributePin) {}
	SLATE\_END\_ARGS()
 
public:
	void Construct(const FArguments& InArgs, UEdGraphPin\* InGraphPinObj);
        //this override is used to display slate widget used forcustomization.
	virtual TSharedRef<SWidget\>	GetDefaultValueWidget() override;
	void OnAttributeSelected(TSharedPtr<FString\> ItemSelected, ESelectInfo::Type SelectInfo);
private:
	TArray<TSharedPtr<FString\>> AttributesList;
};

  
Implementation:

#include "GameAttributesEditor.h"
 
#include "KismetEditorUtilities.h"
 
#include "STextComboBox.h"
#include "EdGraph/EdGraphPin.h"
#include "EdGraph/EdGraphSchema.h"
#include "GAGlobalTypes.h"
#include "GAAttributesBase.h"
#include "GAAttributePin.h"
 
void SGAAttributePin::Construct(const FArguments& InArgs, UEdGraphPin\* InGraphPinObj)
{
	AttributesList.Empty();
 
	SGraphPin::Construct(SGraphPin::FArguments(), InGraphPinObj);
}
TSharedRef<SWidget\>	SGAAttributePin::GetDefaultValueWidget()
{
	//AttributesList.Empty();
	return	SNew(STextComboBox) //note you can display any widget here
		.OptionsSource(&AttributesList) 
		.OnSelectionChanged(this, &SGAAttributePin::OnAttributeSelected);
 
}
void SGAAttributePin::OnAttributeSelected(TSharedPtr<FString\> ItemSelected, ESelectInfo::Type SelectInfo)
{
	//FString CurrentValue = GraphPinObj->GetDefaultAsString();
	FString CurrentDefaultValue \= GraphPinObj\-\>GetDefaultAsString();
	FString attribute \= \*ItemSelected;
	if (CurrentDefaultValue.IsEmpty())
	{
		CurrentDefaultValue \= FString(TEXT("()"));
	}
        //here we construct, setter for value in struct.
        //open it with (
	FString AttributeString \= TEXT("(");
	if (!attribute.IsEmpty())
	{       
                //now set here proerty name from USTRUCT(), \\" - will add opening "
                // so it will look like AttributeName="
		AttributeString +\= TEXT("AttributeName=\\"");
                //add value you want to set to your property"
		AttributeString +\= attribute;
                //close with "
		AttributeString +\= TEXT("\\"");
	}
        //and at last add ) so it will look like (AttributeName="Value");
	AttributeString +\= TEXT(")");
        //and here we set our value to parameter if it different than last one.
	if (!CurrentDefaultValue.Equals(AttributeString))
	{
		GraphPinObj\-\>GetSchema()\-\>TrySetDefaultValue(\*GraphPinObj, AttributeString);
	}
 
	//if ()
}

Voila! We have our simple custom widget done.

Now we need Pin factory for our custom pin. Create new class and name it, in the way you will know it's pin factor ;).

#pragma once
#include "SlateBasics.h"
#include "GAGlobalTypes.h"
#include "EdGraph/EdGraphPin.h"
#include "EdGraph/EdGraphSchema.h"
#include "EdGraphSchema\_K2.h"
#include "GAAttributePanelGraphPinFactory.h"
#include "GAAttributePin.h"
#include "EdGraphUtilities.h"
 
class FGAAttributePanelGraphPinFactory : public FGraphPanelPinFactory
{
	virtual TSharedPtr<class SGraphPin\> CreatePin(class UEdGraphPin\* InPin) const override
	{
		const UEdGraphSchema\_K2\* K2Schema \= GetDefault<UEdGraphSchema\_K2\>();
		/\*
                Check if pin is struct, and then check if that pin is of struct type we want customize
                \*/
                if (InPin\-\>PinType.PinCategory \== K2Schema\-\>PC\_Struct 
			&& InPin\-\>PinType.PinSubCategoryObject \== FGAAttribute::StaticStruct()) 
		{
			return SNew(SGAAttributePin, InPin); //and return our customized pin widget ;).
		}
		return nullptr;
	}
};

That's all! For factory.

Last step is to register our pin factory, so it will know, when to replace pins.

To your module implementation (YouModuleName.cpp), you will need this code, so it might end up looking like that:

#pragma once
#include "../Public/GameAttributesEditor.h"
#include "GAAttributePin.h"
#include "GAGlobalTypes.h"
#include "GAAttributePanelGraphPinFactory.h"
 
 
#include "GameAttributesEditorPrivatePCH.h"
 
 
class FGameAttributesEditor : public IGameAttributesEditor
{
	/\*\* IModuleInterface implementation \*/
	virtual void StartupModule() override
	{
                //create your factory and shared pointer to it.
		TSharedPtr<FGAAttributePanelGraphPinFactory\> GAAttributePanelGraphPinFactory \= MakeShareable(new FGAAttributePanelGraphPinFactory());
                //and now register it.
		FEdGraphUtilities::RegisterVisualPinFactory(GAAttributePanelGraphPinFactory);
	}
	virtual void ShutdownModule() override
	{
 
	}
};
 
IMPLEMENT\_MODULE(FGameAttributesEditor, GameAttributesEditor)

And that's it! You now should have working pin customization. Assuming your pin widget is working ;).

[iniside](/index.php?title=User:Iniside&action=edit&redlink=1 "User:Iniside (page does not exist)") ([talk](/index.php?title=User_talk:Iniside&action=edit&redlink=1 "User talk:Iniside (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_To\_Create\_Custom\_Blueprint\_Pin&oldid=10747](https://wiki.unrealengine.com/index.php?title=How_To_Create_Custom_Blueprint_Pin&oldid=10747)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)