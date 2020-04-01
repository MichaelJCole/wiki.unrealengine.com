Custom Blueprint Class Picker Dialog Settings - Epic Wiki                    

Custom Blueprint Class Picker Dialog Settings
=============================================

**Rate this Page:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.0

Contents
--------

*   [1 Overview](#Overview)
*   [2 Purpose](#Purpose)
*   [3 Some Theory (waah)](#Some_Theory_.28waah.29)
    *   [3.1 Parameters](#Parameters)
*   [4 The Tutorial](#The_Tutorial)
*   [5 Closing](#Closing)

Overview
--------

If you are like me, being lazy and all, but still doing everything to support this laziness, than you have come to the right place to be able to right-click onto your Content Browser, click on Blueprint and seeing your most used, beloved, always compiling, and functioning custom C++ classes right away, ready to be clicked on, than rather searching through the Class Browser.

[![](https://d26ilriwvtzlb.cloudfront.net/c/c5/UE4Wiki_BlueprintCustomCommonClasses_01.PNG)](/File:UE4Wiki_BlueprintCustomCommonClasses_01.PNG)

[![](/skins/common/images/magnify-clip.png)](/File:UE4Wiki_BlueprintCustomCommonClasses_01.PNG "Enlarge")

Window To Laziness

Purpose
-------

Even though my Project "Nina" is a one man show, I work on other projects with several people, consisting of Designers, Programmers, and coffee addicts called Producers (me). Now having important classes exposed right in the Blueprint Wizard, makes it easy for Designers to know what to pick, especially when it comes down to Actors, Pawns etc. It happens very fast that you need to parent a wrong class again, and if it has already a very extensive Graph, it might not work right away. Also all that greatness a Coder has put into that custom class, is just not available for the Designers.

So in the end it is about convenience and ensuring that the correct, most used classes are exposed to have a more efficient and secure workflow and makes everyone happy, especially Producers.

This tutorial is for everyone who likes to make their experience a bit more convenient for themselves or their team. In general this tutorial is for everyone who likes to include their C++ Custom Classes into the Picker (Common Classes).

For now I will not create a custom Editor Module but basically explain some of the Parameters and where the code is, but than basically just moving ahead adding to the Project ini File. In a later stage I might update this Tutorial to go a bit further, so this is perfectly viable also for people just extending Gameplay Classes, without the need of Editor Localization and Editor Extension. For those who don't want to know where things are coming from and don't want to go along with extending the Editor on their own, can go ahead with the Tutorial part.

**4.6.1** - Only extending works, doesn't remove standard list, even if so declared, so only use + not -

**4.7 Preview 5** - works fully

**Promoted Branch Changelist 2432918** - works fully

Some Theory (waah)
------------------

Basically, the declaration or in other words setting of the standard list, is part of the BaseEditor.ini of the Engine found in "Engine/Config/". What we are searching for is +NewAssetDefaultClasses.

; Class picker dialog settings
; LocText refers to the localization id for the descriptive text to show next to the icon in the picker
+NewAssetDefaultClasses=(ClassName="/Script/Engine.Actor", LocTextNameID="ActorName", LocTextDescriptionID="ActorDesc", AssetClass="/Script/Engine.Blueprint")
+NewAssetDefaultClasses=(ClassName="/Script/Engine.Pawn", LocTextNameID="PawnName", LocTextDescriptionID="PawnDesc", AssetClass="/Script/Engine.Blueprint")
+NewAssetDefaultClasses=(ClassName="/Script/Engine.Character", LocTextNameID="CharacterName", LocTextDescriptionID="CharacterDesc", AssetClass="/Script/Engine.Blueprint")
+NewAssetDefaultClasses=(ClassName="/Script/Engine.PlayerController", LocTextNameID="PlayerControllerName", LocTextDescriptionID="PlayerControllerDesc", AssetClass="/Script/Engine.Blueprint")
+NewAssetDefaultClasses=(ClassName="/Script/Engine.GameMode", LocTextNameID="GameModeName", LocTextDescriptionID="GameModeDesc", AssetClass="/Script/Engine.Blueprint")

These settings are part of

\[/Script/UnrealEd.UnrealEdOptions\]

**Attention**: We are not going to change those in the BaseEditor.ini, but will use our DefaultEditor.ini from our Project instead.

Those Parameters are part of the USTRUCT [FClassPickerDefaults](https://docs.unrealengine.com/latest/INT/API/Editor/UnrealEd/Preferences/FClassPickerDefaults/index.html)

**UnrealEdOptions.h**

/\*\* Default Classes for the Class Picker Dialog\*/
USTRUCT()
struct FClassPickerDefaults
{
	GENERATED\_USTRUCT\_BODY()
 
	/\*\* The name of the class to select \*/
	UPROPERTY()
	FString ClassName;
 
	/\*\* The loc text name for the class \*/
	UPROPERTY()
	FString LocTextNameID;
 
	/\*\* The loc text description for the class \*/
	UPROPERTY()
	FString LocTextDescriptionID;
 
	/\*\* The name of the asset type being created \*/
	UPROPERTY()
	FString AssetClass;
 
	/\*\* Gets the localized name text for the class \*/
	FText GetName() const;
 
	/\*\* Gets the localized descriptive text for the class \*/
	FText GetDescription() const;
};

### Parameters

**ClassName** - "/Script/\[Module\].\[ClassName\]" - Basically the Class which you want to be called when the Designer is pushing THE BUTTON.

**LocTextNameID** - Name (Button) - Either referencing directly the definition in the Code, or if its not present, it will use directly the Text set in the ini.

**UnrealEdOptions.cpp**

FText FClassPickerDefaults::GetName() const
{
	static TMap< FString, FText \> LocNames;
 
	if (LocNames.Num() \== 0)
	{
		LocNames.Add( TEXT("ActorName"), LOCTEXT("ActorName", "Actor") );
		LocNames.Add( TEXT("PawnName"), LOCTEXT("PawnName", "Pawn") );
		LocNames.Add( TEXT("CharacterName"), LOCTEXT("CharacterName", "Character") );
		LocNames.Add( TEXT("PlayerControllerName"), LOCTEXT("PlayerControllerName", "PlayerController") );
		LocNames.Add( TEXT("GameModeName"), LOCTEXT("GameModeName", "Game Mode") );
	}
 
	if ( LocTextNameID.IsEmpty() )
	{
		UClass\* ItemClass \= LoadClass<UObject\>(NULL, \*ClassName, NULL, LOAD\_None, NULL);
		check( ItemClass );
		return FText::FromString(FName::NameToDisplayString(ItemClass\-\>GetName(), false));
	}
 
	const FText\* PreExistingName \= LocNames.Find( LocTextNameID );
	if ( PreExistingName )
	{
		return \*PreExistingName;
	}
 
	FText OutName;
	if ( FText::FindText(TEXT("UnrealEd"), LocTextNameID, OutName) )
	{
		return OutName;
	}
 
	return FText::FromString(LocTextNameID);
}

**LocTextDescriptionID** - Description, next to the Button - Either referencing directly the definition in the Code of the ID, or if its not present, it will use directly the Text set in the ini.

**UnrealEdOptions.cpp**

FText FClassPickerDefaults::GetDescription() const
{
	static TMap< FString, FText \> LocDescs;
 
	if (LocDescs.Num() \== 0)
	{
		LocDescs.Add( TEXT("ActorDesc"), LOCTEXT("ActorDesc", "An Actor is an object that can be placed or spawned in the world.") );
		LocDescs.Add( TEXT("PawnDesc"), LOCTEXT("PawnDesc", "A Pawn is an actor that can be 'possessed' and receieve input from a controller.") );
		LocDescs.Add( TEXT("CharacterDesc"), LOCTEXT("CharacterDesc", "A character is a type of Pawn that includes the ability to walk around.") );
		LocDescs.Add( TEXT("PlayerControllerDesc"), LOCTEXT("PlayerControllerDesc", "A Player Controller is an actor responsible for controlling a Pawn used by the player.") );
		LocDescs.Add( TEXT("GameModeDesc"), LOCTEXT("GameModeDesc", "Game Mode defines the game being played, its rules, scoring, and other facets of the game type.") );
	}
 
	if ( LocTextDescriptionID.IsEmpty() )
	{
		return LOCTEXT("NoClassPickerDesc", "No Description.");
	}
 
	const FText\* PreExistingDesc \= LocDescs.Find( LocTextDescriptionID );
	if ( PreExistingDesc )
	{
		return \*PreExistingDesc;
	}
 
	FText OutDesc;
	if ( FText::FindText(TEXT("UnrealEd"), LocTextDescriptionID, OutDesc) )
	{
		return OutDesc;
	}
 
	return FText::FromString(LocTextDescriptionID);
}

**AssetClass** - Asset type being created - Basically in this case it would be normally be as is, except of course you are extending the Blueprint Engine (What the hell are you doing here!)

To have control over the Buttons Tooltip, you need to have a comment in your Header File.

/\*\*
 \* Custon Nina Actor - Actor is the base class for an Object that can be placed or spawned in a level.
 \* Actors may contain a collection of ActorComponents, which can be used to control how actors move, how they are rendered, etc.
 \* The other main function of an Actor is the replication of properties and function calls across the network during play.
 \* 
 \* @see https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/
 \* @see UActorComponent
 \*/
UCLASS()
class NINA\_API ANinaActor : public AActor

The Tutorial
------------

This is basically only editing the DefaultEditor.ini without considering for localization, which would require a bit more work, extending the Editor. So if you stick with English or the Standard Language you are using, your are good to go.

  
1\. Close the Editor (Really? Yes!)

2\. First copy all the existing entries of the BaseEngine.ini in "Engine/Config/" (where your Engine is installed not Project) with +NewAssetDefaultClasses under \[/Script/UnrealEd.UnrealEdOptions\]

\[/Script/UnrealEd.UnrealEdOptions\]
...
; Class picker dialog settings
; LocText refers to the localization id for the descriptive text to show next to the icon in the picker
+NewAssetDefaultClasses\=(ClassName\="/Script/Engine.Actor", LocTextNameID\="ActorName", LocTextDescriptionID\="ActorDesc", AssetClass\="/Script/Engine.Blueprint")
+NewAssetDefaultClasses\=(ClassName\="/Script/Engine.Pawn", LocTextNameID\="PawnName", LocTextDescriptionID\="PawnDesc", AssetClass\="/Script/Engine.Blueprint")
+NewAssetDefaultClasses\=(ClassName\="/Script/Engine.Character", LocTextNameID\="CharacterName", LocTextDescriptionID\="CharacterDesc", AssetClass\="/Script/Engine.Blueprint")
+NewAssetDefaultClasses\=(ClassName\="/Script/Engine.PlayerController", LocTextNameID\="PlayerControllerName", LocTextDescriptionID\="PlayerControllerDesc", AssetClass\="/Script/Engine.Blueprint")
+NewAssetDefaultClasses\=(ClassName\="/Script/Engine.GameMode", LocTextNameID\="GameModeName", LocTextDescriptionID\="GameModeDesc", AssetClass\="/Script/Engine.Blueprint")

3\. Paste into your DefaultEditor.ini in your Projects Config Folder \[ProjectName\]\\Config

4\. Replace the + with a - if you don't want those Standard Classes to appear, otherwise leave it.

5\. Include your own Classes by following this Standard

+NewAssetDefaultClasses=(ClassName="/Script/\[YourGameModuleName\].\[YourClassName\]", LocTextNameID="\[NameOfClass\]", LocTextDescriptionID="\[DescriptionOfClass\]", AssetClass="/Script/Engine.Blueprint")

Characters are limited for Name and Description, and might get cut when viewing in the Editor.

6\. Save it, Test it, no compiling required (hurray)

My Final Result looks like this:

\[/Script/UnrealEd.UnrealEdOptions\]
; Old Class picker dialog settings
; LocText refers to the localization id for the descriptive text to show next to the icon in the picker
\-NewAssetDefaultClasses\=(ClassName\="/Script/Engine.Actor", LocTextNameID\="ActorName", LocTextDescriptionID\="ActorDesc", AssetClass\="/Script/Engine.Blueprint")
\-NewAssetDefaultClasses\=(ClassName\="/Script/Engine.Pawn", LocTextNameID\="PawnName", LocTextDescriptionID\="PawnDesc", AssetClass\="/Script/Engine.Blueprint")
\-NewAssetDefaultClasses\=(ClassName\="/Script/Engine.Character", LocTextNameID\="CharacterName", LocTextDescriptionID\="CharacterDesc", AssetClass\="/Script/Engine.Blueprint")
\-NewAssetDefaultClasses\=(ClassName\="/Script/Engine.PlayerController", LocTextNameID\="PlayerControllerName", LocTextDescriptionID\="PlayerControllerDesc", AssetClass\="/Script/Engine.Blueprint")
\-NewAssetDefaultClasses\=(ClassName\="/Script/Engine.GameMode", LocTextNameID\="GameModeName", LocTextDescriptionID\="GameModeDesc", AssetClass\="/Script/Engine.Blueprint")
; New Class picker dialog settings
; LocText refers to the localization id for the descriptive text to show next to the icon in the picker
+NewAssetDefaultClasses\=(ClassName\="/Script/Nina.NinaActor", LocTextNameID\="NinaActor", LocTextDescriptionID\="Custom AActor 
- An Actor is an object that can be placed or spawned in the world.", AssetClass\="/Script/Engine.Blueprint")
+NewAssetDefaultClasses\=(ClassName\="/Script/Nina.NinaCharacter", LocTextNameID\="NinaCharacter", LocTextDescriptionID\="Custom ACharacter 
- A character is a type of Pawn that includes the ability to walk around", AssetClass\="/Script/Engine.Blueprint")
+NewAssetDefaultClasses\=(ClassName\="/Script/Nina.NinaPlayerController", LocTextNameID\="NinaPlayerController", LocTextDescriptionID\="
Custom APlayerControler - A Player Controller is an actor responsible for controlling a Pawn used by the player.", AssetClass\="/Script/Engine.Blueprint")

Closing
-------

Hope you enjoyed my Tutorial and being helpful of being lazy! To us! :)

Original Author: [Martin\_Egger](/User:Martin_Egger "User:Martin Egger") ([talk](/User_talk:Martin_Egger "User talk:Martin Egger"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Custom\_Blueprint\_Class\_Picker\_Dialog\_Settings&oldid=11547](https://wiki.unrealengine.com/index.php?title=Custom_Blueprint_Class_Picker_Dialog_Settings&oldid=11547)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)