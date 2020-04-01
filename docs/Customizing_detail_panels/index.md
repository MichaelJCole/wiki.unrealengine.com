 Customizing detail panels - Epic Wiki             

 

Customizing detail panels
=========================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Types of specializations](#Types_of_specializations)
    *   [2.1 Default detail layout](#Default_detail_layout)
    *   [2.2 Property type customizations](#Property_type_customizations)
    *   [2.3 Object customizations (Details overrides)](#Object_customizations_.28Details_overrides.29)
*   [3 Registering your specializations](#Registering_your_specializations)
*   [4 Official resources on the subject](#Official_resources_on_the_subject)
*   [5 Points to improve](#Points_to_improve)
*   [6 Summary](#Summary)

Overview
--------

Dear Community,

This tutorial will discuss customizing both display categories as well as property entries for UE4 types in all editor detail panes. For more informations on detail panes and what they are, please refer to this link: [https://docs.unrealengine.com/latest/INT/Engine/UI/LevelEditor/Details/index.html](https://docs.unrealengine.com/latest/INT/Engine/UI/LevelEditor/Details/index.html)

If you have questions for me, please ask them in the Discussion Tab. I and hopefully others can then answer those questions in this main page.

Types of specializations
------------------------

### Default detail layout

As long as your UPROPERTY types are value types, the editor system will create a default layout for you. If you're happy with this layout, this tutorial is not for you :)

### Property type customizations

This type of specialization is useful when you have created a custom struct that you want to change the layout for. This only works for USTRUCT's as far as I know, as the Interface used; IPropertyTypeCustomization's implemented functions all work exclusively with structs.

You can basically do anything on the layout callback, the only limitations are the limitations imposed by slate, as all of the layout code is done in this ingenious extension to UE4. But the most common usage of these specializations are either to create a better layout than the default display, or to create more intuitive widgets for setting your data. An example of this could be to let the user select a color with a color wheel, instead of directly setting the R, G and B parameters of a color struct.

The first step is to create your customization subclass. The important part here is to derive from IPropertyTypeCustomization. Here is an example header file:

<syntaxhighlight lang="cpp">

1.  include "Editor/DetailCustomizations/Private/DetailCustomizationsPrivatePCH.h"

1.  pragma once

class FMyStructCustomization : public IPropertyTypeCustomization { public: static TSharedRef<IPropertyTypeCustomization> MakeInstance();

/\*\* IPropertyTypeCustomization interface \*/ virtual void CustomizeHeader(TSharedRef<class IPropertyHandle> StructPropertyHandle, class FDetailWidgetRow& HeaderRow, IPropertyTypeCustomizationUtils& StructCustomizationUtils) override; virtual void CustomizeChildren(TSharedRef<class IPropertyHandle> StructPropertyHandle, class IDetailChildrenBuilder& StructBuilder, IPropertyTypeCustomizationUtils& StructCustomizationUtils) override;

private: TSharedPtr<IPropertyHandle> SomeUPropertyHandle; }; </syntaxhighlight>

Most of this is simply boilerplate. To create your own file, make sure the classname matches the type you want to customize with the addition of "Customization" at the end. Also, creating handles for any property you want to modify can be made, so for those types you create TSharedPtr<IPropertyHandle> typed fields.

And here is an example implementation file. <syntaxhighlight lang="cpp">

1.  include "MyProjectPCH.h"

1.  include "DetailCustomizations/MyStructCustomization.h"

1.  define LOCTEXT\_NAMESPACE "MyStructCustomization"

TSharedRef<IPropertyTypeCustomization> FMyStructCustomization::MakeInstance() { return MakeShareable(new FMyStructCustomization()); }

void FMyStructCustomization::CustomizeHeader(TSharedRef<class IPropertyHandle> StructPropertyHandle, class FDetailWidgetRow& HeaderRow, IPropertyTypeCustomizationUtils& StructCustomizationUtils) { uint32 NumChildren; StructPropertyHandle->GetNumChildren(NumChildren);

for (uint32 ChildIndex = 0; ChildIndex < NumChildren; ++ChildIndex) { const TSharedRef< IPropertyHandle > ChildHandle = StructPropertyHandle->GetChildHandle(ChildIndex).ToSharedRef();

if (ChildHandle->GetProperty()->GetName() == TEXT("SomeUProperty")) { SomeUPropertyHandle = ChildHandle; } }

check(SomeUPropertyHandle.IsValid());

  
HeaderRow.NameContent() \[ StructPropertyHandle->CreatePropertyNameWidget(TEXT("New property header name"), false) \] .ValueContent() .MinDesiredWidth(500) \[ SNew(STextBlock) .Text(LOCTEXT("Extra info", "Some new representation")) .Font(IDetailLayoutBuilder::GetDetailFont()) \]; }

void FMyStructCustomization::CustomizeChildren(TSharedRef<class IPropertyHandle> StructPropertyHandle, class IDetailChildrenBuilder& StructBuilder, IPropertyTypeCustomizationUtils& StructCustomizationUtils) {

   //Create further customization here

}

1.  undef LOCTEXT\_NAMESPACE

</syntaxhighlight>

In this example, both of these files are under a project folder called "DetailCustomizations". The first part of CustomizeHeader extracts the the UPROPERTY called "SomeUProperty" from the MyStruct struct into the field we declared in our header file (SomeUPropertyHandle). The second part is just normal Slate code to override the display row in the details pane. For more information on how to code Slate, please have a look at one of the Slate tutorials on another part of the wiki.

Another thing worth mentioning is how to use the cached property in the code. TODO! :D

Finally, don't forget to register your customization(see below).

### Object customizations (Details overrides)

If you would not only like to override struct display, but want full control over the rendering of all parts of the pane (customizing the category box, creating new categories, do whatever you like in the categories etc.) the more powerful object customization system is the way to go.

For this type of specialization, there is no restriction on the type you want to specialize, except that it should not be a POCO (plain old c++ object) type since it still has to have UPROPERTY's etc for you to access and bind to. I am not sure if it is possible to actually create customizations for POCO's, but in any case I would not recommend it.

The first step is to create your detail subclass. The important part here is to derive from IDetailCustomization. Here is an example header file:

<syntaxhighlight lang="cpp">

1.  include "Editor/DetailCustomizations/Private/DetailCustomizationsPrivatePCH.h"

1.  pragma once

class FMyClassDetails : public IDetailCustomization { public: /\*\* Makes a new instance of this detail layout class for a specific detail view requesting it \*/ static TSharedRef<IDetailCustomization> MakeInstance();

/\*\* IDetailCustomization interface \*/ virtual void CustomizeDetails( IDetailLayoutBuilder& DetailBuilder ) override; }; </syntaxhighlight>

  
<syntaxhighlight lang="cpp">

1.  include "MyProjectPCH.h"

1.  include "DetailCustomizations/MyClassDetails.h"

1.  define LOCTEXT\_NAMESPACE "MyClassDetails"

TSharedRef<IDetailCustomization> FMyClassDetails::MakeInstance() { return MakeShareable(new FMyClassDetails); }

void FMyClassDetails::CustomizeDetails(IDetailLayoutBuilder& DetailBuilder) { // Create a category so this is displayed early in the properties IDetailCategoryBuilder& MyCategory = DetailBuilder.EditCategory("CategoryName", TEXT("Extra info"), ECategoryPriority::Important);

       //You can get properties using the detailbuilder

//MyProperty= DetailBuilder.GetProperty(GET\_MEMBER\_NAME\_CHECKED(MyClass, MyClassPropertyName));

MyCategory.AddCustomRow(LOCTEXT("Extra info", "Row header name").ToString()) .NameContent() \[ SNew(STextBlock) .Text(LOCTEXT("Extra info", "Custom row header name")) .Font(IDetailLayoutBuilder::GetDetailFont()) \] .ValueContent().MinDesiredWidth(500) \[ SNew(STextBlock) .Text(LOCTEXT("Extra info", "Custom row content")) .Font(IDetailLayoutBuilder::GetDetailFont()) \]; }

1.  undef LOCTEXT\_NAMESPACE

</syntaxhighlight>

In this example, both of these files are under a project folder called "DetailCustomizations". The first part of the CustomizeDetails function here creates a new category called "CategoryName". We then proceed to create a new row in that category called "Custom row header name" with the content "Custom row content". The second part that creates the row is just normal Slate code to override the display row in the details pane. For more information on how to code Slate, please have a look at one of the Slate tutorials on another part of the wiki.

Registering your specializations
--------------------------------

Just creating a specialization is not enough. For the editor to know that your specialization exists, you have to register it with the correct module. This can be done in any part of your solution, but to avoid unexpected behavior, I would recommend choosing some piece of code that is only run once, on construction.

An ideal spot is your main game module, or your game mode class (I usually use the game mode class since it has a constructor already in place).

Note that for both property and object specializations, you will need to include "PropertyEditor" as a private dependency module in your Build.cs file.

Depending on the specialization type, you need to use different registration methods. For property type customizations "RegisterCustomPropertyTypeLayout" is used, like so:

<syntaxhighlight lang="cpp"> FPropertyEditorModule& PropertyModule = FModuleManager::LoadModuleChecked<FPropertyEditorModule>("PropertyEditor");

//Custom properties PropertyModule.RegisterCustomPropertyTypeLayout("MyStruct", FOnGetPropertyTypeCustomizationInstance::CreateStatic(&FMyStructCustomization::MakeInstance)); </syntaxhighlight>

For object customizations "RegisterCustomClassLayout" is used instead, like so: <syntaxhighlight lang="cpp"> FPropertyEditorModule& PropertyModule = FModuleManager::LoadModuleChecked<FPropertyEditorModule>("PropertyEditor");

//Custom detail views PropertyModule.RegisterCustomClassLayout("MyClass", FOnGetDetailCustomizationInstance::CreateStatic(&FMyClassDetails::MakeInstance)); </syntaxhighlight>

The important point to remember here is that the string should refer to the object you want to specialize, without the class type identifying letter at the start (MyClass instead of UMyClass for example) and the function you want to send to the CreateStatic call is complete class name for the specialization you want to create.

Official resources on the subject
---------------------------------

As far as I know, there is no current official documentation for this by Epic. For more information, I recommend referring to the source code. The best places to look are: Source/Editor/DetailCustomizations/Private/DetailCustomizations.cpp for a good starting point.

For customizing a category (object details), I recommend: Source/Editor/DetailCustomizations/Private/StaticMeshComponentDetails.h Source/Editor/DetailCustomizations/Private/StaticMeshComponentDetails.cpp

For customizing properties (structs), I found this class to be the best simple reference: Source/Editor/DetailCustomizations/Private/SlateColorCustomization.h Source/Editor/DetailCustomizations/Private/SlateColorCustomization.cpp

Points to improve
-----------------

This tutorial is by no means complete yet. As I discover new things I will keep improving it, and if you know something I don't, feel free to help out by editing this article!

Here are some things that still needs to be done:

*   More tutorial content on how to use bound properties taken from the context objects
*   Find other wiki links for Slate and other useful articles to link to
*   Provide more in depth help to create certain types of specializations, such as:

\* Customizing the category box
\* Creating nested categories
\* Creating a custom editing widget

Summary
-------

There are two different types of specializations you can do. The first type is called "Customizations" and pertains to customizing the display of any struct UPROPERTY in any editor details pane. The second type is called "Details" and pertains to completely creating and customizing detail pane categories and subinformation.

There are two steps to performing specializations:

*   Create the appropriate subclass for the type of specialization you want to do, for the class you want to display.
*   Register the specialization somewhere in your project.

Feel free to post new questions in the Discussion tab!

Hopefully this tutorial will save someone else some time when trying to figure this out :)

[Temaran](/index.php?title=User:Temaran&action=edit&redlink=1 "User:Temaran (page does not exist)") ([talk](/index.php?title=User_talk:Temaran&action=edit&redlink=1 "User talk:Temaran (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Customizing\_detail\_panels&oldid=303](https://wiki.unrealengine.com/index.php?title=Customizing_detail_panels&oldid=303)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")