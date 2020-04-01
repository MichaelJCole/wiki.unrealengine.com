 Enums For Both C++ and BP - Epic Wiki             

 

Enums For Both C++ and BP
=========================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 BP Graphs: Switch on Enum](#BP_Graphs:_Switch_on_Enum)
*   [3 C++ .h File](#C.2B.2B_.h_File)
*   [4 Testing the Value in the C++](#Testing_the_Value_in_the_C.2B.2B)
*   [5 Get Name of Enum as String](#Get_Name_of_Enum_as_String)
    *   [5.1 Templatized Version](#Templatized_Version)
*   [6 GetEnumFromString](#GetEnumFromString)
*   [7 Summary](#Summary)

Overview
--------

Dear Community,

Here's how you can create your own Enums that can be used with C++ and BP graphs!

Enums basically give you ability to define a series of related types with long human-readible names, using a low-cost data type.

These could be AI states, object types, ammo types, weapon types, tree types, or anything really :)

[![Enumgraph.jpg](https://d3ar1piqh1oeli.cloudfront.net/e/e3/Enumgraph.jpg/800px-Enumgraph.jpg)](/index.php?title=File:Enumgraph.jpg)

BP Graphs: Switch on Enum
-------------------------

For BP Graphs, one of the most wonderful things about ENUMS is the ability to use Switch on Enum() instead of having to do a series of branches and testing one value many times

C++ .h File
-----------

You need to add the UENUM definition above your class and then actually create a member variable in your class that you want to have be an instance of this enum.

If you want an enum to be used in many different classes (instances of this enum in many classes) you can define the enum in some class that holds all your other important definitions like USTRUCTS().

<syntaxhighlight lang="cpp"> UENUM(BlueprintType) //"BlueprintType" is essential to include enum class EVictoryEnum : uint8 {

       VE\_Dance 	UMETA(DisplayName="Dance"),
       VE\_Rain 	UMETA(DisplayName="Rain"),

VE\_Song UMETA(DisplayName="Song") };

UCLASS() class YourClass : public YourSuperClass { GENERATED\_UCLASS\_BODY()

UPROPERTY(EditAnywhere, BlueprintReadWrite, Category=Enum) EVictoryEnum VictoryEnum;

//Rest of Class Code }; </syntaxhighlight>

Testing the Value in the C++
----------------------------

<syntaxhighlight lang="cpp"> //YourClass.CPP if(VictoryEnum == EVictoryEnum::VE\_Dance) { VictoryEnum = EVictoryEnum::VE\_Song; } else { VictoryEnum = EVictoryEnum::VE\_Rain; } </syntaxhighlight>

Get Name of Enum as String
--------------------------

<syntaxhighlight lang="cpp">

FString GetVictoryEnumAsString(EVictoryEnum::Type EnumValue) {

 const UEnum\* EnumPtr = FindObject<UEnum>(ANY\_PACKAGE, TEXT("EVictoryEnum"), true);
 if(!EnumPtr) return FString("Invalid");

 return EnumPtr->GetNameByValue((int64)EnumValue); // for EnumValue == VE\_Dance returns "VE\_Dance"

} </syntaxhighlight>

### Templatized Version

<syntaxhighlight lang="cpp"> template<typename TEnum> static FORCEINLINE FString GetEnumValueAsString(const FString& Name, TEnum Value) {

 const UEnum\* enumPtr = FindObject<UEnum>(ANY\_PACKAGE, \*Name, true);
   if (!enumPtr)

{ return FString("Invalid"); }

   return enumPtr->GetNameByValue((int64)Value).ToString();

}

// Example usage GetEnumValueAsString<EVictoryEnum>("EVictoryEnum", VictoryEnum))); </syntaxhighlight>

Also, if you want to avoid retyping the enum class name as a string on every call to GetEnumValueAsString, you can also define a c++ macro in the .h file where the function is defined.

For example, if you have defined GetEnumValueAsString in a class UTextUtil in TextUtil.h, you would have this macro

<syntaxhighlight lang="cpp">

1.  define EnumToString(EnumClassName, ValueOfEnum) UTextUtil::GetEnumValueAsString<EnumClassName>(FString(TEXT(#EnumClassName)), (ValueOfEnum))

</syntaxhighlight>

This way in any other file where you want a FString from an enum value, you would do : <syntaxhighlight lang="cpp"> FString EnumString = EnumToString(EVictoryEnum, EVictoryEnum::VE\_Dance); </syntaxhighlight>

GetEnumFromString
-----------------

If you want to retrieve an Enum value after storing the Enum as a string, here is how! ♥ Rama

<syntaxhighlight lang="cpp"> template <typename EnumType> static FORCEINLINE EnumType GetEnumValueFromString(const FString& EnumName, const FString& String) { UEnum\* Enum = FindObject<UEnum>(ANY\_PACKAGE, \*EnumName, true); if(!Enum)

       { 
         return EnumType(0);
       }		

return (EnumType)Enum->FindEnumIndex(FName(\*String)); }

//Sample Usage FString ParseLine = GetEnumValueAsString<EChallenge>("EChallenge", VictoryEnumValue))); //To String EChallenge Challenge = GetEnumValueFromString<EChallenge>("EChallenge", ParseLine); //Back From String! </syntaxhighlight>

Summary
-------

Now you know how to make enums that are project specific, that can be used in both C++ and Blueprints!

Enjoy!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Enums\_For\_Both\_C%2B%2B\_and\_BP&oldid=35](https://wiki.unrealengine.com/index.php?title=Enums_For_Both_C%2B%2B_and_BP&oldid=35)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")