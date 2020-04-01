UPROPERTY - Epic Wiki                    

UPROPERTY
=========

Contents
--------

*   [1 Description](#Description)
*   [2 Valid Specifiers](#Valid_Specifiers)
    *   [2.1 Const](#Const)
    *   [2.2 Config](#Config)
    *   [2.3 GlobalConfig](#GlobalConfig)
    *   [2.4 Localized](#Localized)
    *   [2.5 Transient](#Transient)
    *   [2.6 DuplicateTransient](#DuplicateTransient)
    *   [2.7 NonPIETransient](#NonPIETransient)
    *   [2.8 Ref](#Ref)
    *   [2.9 Export](#Export)
    *   [2.10 EditInline](#EditInline)
    *   [2.11 NoClear](#NoClear)
    *   [2.12 EditFixedSize](#EditFixedSize)
    *   [2.13 Replicated](#Replicated)
    *   [2.14 ReplicatedUsing](#ReplicatedUsing)
    *   [2.15 RepRetry](#RepRetry)
    *   [2.16 NotReplicated](#NotReplicated)
    *   [2.17 Interp](#Interp)
    *   [2.18 NonTransactional](#NonTransactional)
    *   [2.19 Instanced](#Instanced)
    *   [2.20 BlueprintAssignable](#BlueprintAssignable)
    *   [2.21 Category](#Category)
    *   [2.22 SimpleDisplay](#SimpleDisplay)
    *   [2.23 AdvancedDisplay](#AdvancedDisplay)
    *   [2.24 EditAnywhere](#EditAnywhere)
    *   [2.25 EditInstanceOnly](#EditInstanceOnly)
    *   [2.26 EditDefaultsOnly](#EditDefaultsOnly)
    *   [2.27 VisibleAnywhere](#VisibleAnywhere)
    *   [2.28 VisibleInstanceOnly](#VisibleInstanceOnly)
    *   [2.29 VisibleDefaultsOnly](#VisibleDefaultsOnly)
    *   [2.30 BlueprintReadOnly](#BlueprintReadOnly)
    *   [2.31 BlueprintReadWrite](#BlueprintReadWrite)
    *   [2.32 AssetRegistrySearchable](#AssetRegistrySearchable)
    *   [2.33 SaveGame](#SaveGame)
    *   [2.34 BlueprintCallable](#BlueprintCallable)
    *   [2.35 BlueprintAuthorityOnly](#BlueprintAuthorityOnly)
    *   [2.36 TextExportTransient](#TextExportTransient)
*   [3 Valid Meta Properties](#Valid_Meta_Properties)
    *   [3.1 DisplayName](#DisplayName)
    *   [3.2 AllowAbstract](#AllowAbstract)
    *   [3.3 AllowedClasses](#AllowedClasses)
    *   [3.4 AllowPreserveRatio](#AllowPreserveRatio)
    *   [3.5 ArrayClamp](#ArrayClamp)
    *   [3.6 ClampMin](#ClampMin)
    *   [3.7 ClampMax](#ClampMax)
    *   [3.8 DisplayThumbnail](#DisplayThumbnail)
    *   [3.9 EditCondition](#EditCondition)
    *   [3.10 ExactClass](#ExactClass)
    *   [3.11 ExposeFunctionCategories](#ExposeFunctionCategories)
    *   [3.12 ExposeOnSpawn](#ExposeOnSpawn)
    *   [3.13 FixedIncrement](#FixedIncrement)
    *   [3.14 HideAlphaChannel](#HideAlphaChannel)
    *   [3.15 IsBlueprintBaseOnly](#IsBlueprintBaseOnly)
    *   [3.16 OnlyPlaceable](#OnlyPlaceable)
    *   [3.17 MakeEditWidget](#MakeEditWidget)
    *   [3.18 MakeStructureDefaultValue](#MakeStructureDefaultValue)
    *   [3.19 MetaClass](#MetaClass)
    *   [3.20 Multiple](#Multiple)
    *   [3.21 MultiLine](#MultiLine)
    *   [3.22 NoElementDuplicate](#NoElementDuplicate)
    *   [3.23 NoSpinbox](#NoSpinbox)
    *   [3.24 FilePathFilter](#FilePathFilter)
    *   [3.25 RelativePath](#RelativePath)
    *   [3.26 RelativeToGameContentDir](#RelativeToGameContentDir)
    *   [3.27 ShowOnlyInnerProperties](#ShowOnlyInnerProperties)
    *   [3.28 SliderExponent](#SliderExponent)
    *   [3.29 UIMin](#UIMin)
    *   [3.30 UIMax](#UIMax)
*   [4 Related](#Related)

Description
===========

UProperty variables are declared using standard C++ syntax with additional descriptors, such as variable specifiers and metadata placed above the declaration.

 UPROPERTY(\[specifier, specifier, ...\], \[meta=(key=value, key=value, ...)\])
 Type VariableName;

Valid Specifiers
================

_Pro Tip: You can use \`using namespace UP;\` to have these keywords as enums thus potentially have them auto-complete._

_Pro Tip 2: All valid UPROPERTY specifiers are listed as enum values in "ObjectBase.h", Line 728_

##### Const

This property is const and should be exported as const.

##### Config

Property should be loaded/saved to ini file as permanent profile.

##### GlobalConfig

Same as above but load config from base class, not subclass.

##### Localized

Property should be loaded as localizable text. Implies ReadOnly.

##### Transient

Property is transient: shouldn't be saved, zero-filled at load time.

##### DuplicateTransient

Property should always be reset to the default value during any type of duplication (copy/paste, binary duplication, etc.)

##### NonPIETransient

Property should always be reset to the default value during any type of duplication (copy/paste, binary duplication, etc.)

##### Ref

Value is copied out after function call. Only valid on function param declaration.

##### Export

Object property can be exported with it's owner.

##### EditInline

Edit this object reference inline in the editor.

##### NoClear

Hide clear (and browse) button in the editor.

##### EditFixedSize

Indicates that elements of an array can be modified, but its size cannot be changed.

##### Replicated

Property is relevant to network replication.

##### ReplicatedUsing

Property is relevant to network replication. Notify actors when a property is replicated (usage: ReplicatedUsing=FunctionName).

##### RepRetry

Retry replication of this property if it fails to be fully sent (e.g. object references not yet available to serialize over the network)

##### NotReplicated

Skip replication (only for struct members and parameters in service request functions).

##### Interp

Interpolatable property for use with matinee. Always user-settable in the editor.

##### NonTransactional

Property isn't transacted.

##### Instanced

Property is a component reference. Implies EditInline and Export.

##### BlueprintAssignable

MC Delegates only. Property should be exposed for assigning in blueprints.

##### Category

Specifies the category of the property. Usage: Category=CategoryName.

##### SimpleDisplay

Properties appear visible by default in a details panel

##### AdvancedDisplay

Properties are in the advanced dropdown in a details panel

##### EditAnywhere

Indicates that this property can be edited by property windows in the editor

##### EditInstanceOnly

Indicates that this property can be edited by property windows, but only on instances, not on archetypes

##### EditDefaultsOnly

Indicates that this property can be edited by property windows, but only on archetypes

##### VisibleAnywhere

Indicates that this property is visible in property windows, but cannot be edited at all

##### VisibleInstanceOnly

Indicates that this property is only visible in property windows for instances, not for archetypes, and cannot be edited

##### VisibleDefaultsOnly

Indicates that this property is only visible in property windows for archetypes, and cannot be edited

##### BlueprintReadOnly

This property can be read by blueprints, but not modified.

##### BlueprintReadWrite

This property can be read or written from a blueprint.

##### AssetRegistrySearchable

The AssetRegistrySearchable keyword indicates that this property and it's value will be automatically added to the asset registry for any asset class instances containing this as a member variable. It is not legal to use on struct properties or parameters.

##### SaveGame

Property should be serialized for save game.

##### BlueprintCallable

MC Delegates only. Property should be exposed for calling in blueprint code

##### BlueprintAuthorityOnly

MC Delegates only. This delegate accepts (only in blueprint) only events with BlueprintAuthorityOnly.

##### TextExportTransient

Property shouldn't be exported to text format (e.g. copy/paste)

Valid Meta Properties
=====================

##### DisplayName

Sets the display name for the property in the editor. The default value is the variable name with a space before each capital. For example 'MyVariableName' would show up as 'My Variable Name'

Usage DisplayName = "My Display Name"

  

##### AllowAbstract

Used for FStringClassReference properties. Indicates whether abstract class types should be shown in the class picker.

##### AllowedClasses

Used for FStringAssetReference properties. Comma delimited list that indicates the class type(s) of assets to be displayed in the asset picker.

##### AllowPreserveRatio

Used for FVector properties. It causes a ratio lock to be added when displaying this property in details panels.

##### ArrayClamp

Used for integer properties. Clamps the valid values that can be entered in the UI to be between 0 and the length of the array specified.

##### ClampMin

Used for float and integer properties. Specifies the minimum value that may be entered for the property.

##### ClampMax

Used for float and integer properties. Specifies the maximum value that may be entered for the property.

##### DisplayThumbnail

Indicates that the property is an asset type and it should display the thumbnail of the selected asset.

##### EditCondition

Species a boolean property that is used to indicate whether editing of this property is disabled.

##### ExactClass

Used for FStringAssetReference properties in conjunction with AllowedClasses. Indicates whether only the exact classes specified in AllowedClasses can be used or whether subclasses are valid.

##### ExposeFunctionCategories

\[Undocumented\]

##### ExposeOnSpawn

Specifies whether the property should be exposed on a Spawn Actor for the class type.

##### FixedIncrement

\[Undocumented\]

##### HideAlphaChannel

Used for FColor and FLinearColor properties. Indicates that the Alpha property should be hidden when displaying the property widget in the details.

##### IsBlueprintBaseOnly

Used for FStringClassReference properties. Indicates whether only blueprint classes should be shown in the class picker.

##### OnlyPlaceable

Used for Subclass properties. Indicates whether only placeable classes should be shown in the class picker.

##### MakeEditWidget

When used with certain objects such as an FVector, you get to use an "edit widget" within the editor to transform the object in space.

##### MakeStructureDefaultValue

For properties in a structure indicates the default value of the property in a blueprint make structure node.

##### MetaClass

Used FStringClassReference properties. Indicates the parent class that the class picker will use when filtering which classes to display.

##### Multiple

\[Undocumented\]

##### MultiLine

Used for FString and FText properties. Indicates that the edit field should be multi-line, allowing entry of newlines.

##### NoElementDuplicate

Used for array properties. Indicates that the duplicate icon should not be shown for entries of this array in the property panel.

##### NoSpinbox

Used for integer and float properties. Indicates that the spin box element of the number editing widget should not be displayed.

##### FilePathFilter

Used by FFilePath properties. Indicates the path filter to display in the file picker.

##### RelativePath

Used by FDirectoryPath properties.

##### RelativeToGameContentDir

Used by FDirectoryPath properties.

##### ShowOnlyInnerProperties

\[Undocumented\]

##### SliderExponent

\[Undocumented\]

##### UIMin

Used for float and integer properties. Specifies the lowest that the value slider should represent.

##### UIMax

Used for float and integer properties. Specifies the highest that the value slider should represent.

Related
=======

[UCLASS](/index.php?title=UCLASS&action=edit&redlink=1 "UCLASS (page does not exist)"), [UFUNCTION](/UFUNCTION "UFUNCTION"), [USTRUCT](/index.php?title=USTRUCT&action=edit&redlink=1 "USTRUCT (page does not exist)"), [UMETA](/index.php?title=UMETA&action=edit&redlink=1 "UMETA (page does not exist)"), [UPARAM](/UPARAM "UPARAM"), [UENUM](/index.php?title=UENUM&action=edit&redlink=1 "UENUM (page does not exist)"), [UDELEGATE](/index.php?title=UDELEGATE&action=edit&redlink=1 "UDELEGATE (page does not exist)")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UPROPERTY&oldid=14757](https://wiki.unrealengine.com/index.php?title=UPROPERTY&oldid=14757)"

  ![](https://tracking.unrealengine.com/track.png)