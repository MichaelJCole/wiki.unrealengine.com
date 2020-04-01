EnumToString Macro - Epic Wiki                    

EnumToString Macro
==================

Contents
--------

*   [1 Overview](#Overview)
*   [2 YourProject.h](#YourProject.h)
*   [3 Usage](#Usage)
    *   [3.1 YourClass.h](#YourClass.h)
    *   [3.2 YourClass.cpp](#YourClass.cpp)
*   [4 Credits](#Credits)

Overview
--------

Macro that lets you quickly get an enum value as a FString for use in logging etc.  
Caveat - only works with enumerators defined using UENUM() macro.

YourProject.h
-------------

#define GETENUMSTRING(etype, evalue) ( (FindObject<UEnum>(ANY\_PACKAGE, TEXT(etype), true) != nullptr) ? FindObject<UEnum>(ANY\_PACKAGE, TEXT(etype), true)->GetEnumName((int32)evalue) : FString("Invalid - are you sure enum uses UENUM() macro?") )

Usage
-----

### YourClass.h

UENUM()
enum class EUsesEnum : uint8
{
    UseEnum\_Bad,
    UseEnum\_Good,
    UseEnum\_Nice,
    UseEnum\_Naughty
};

### YourClass.cpp

void AYourClass::SomeFunction()
{
    EUsesEnum UseEnumValue \= EUsesEnum::UseEnum\_Good;
    UE\_LOG(LogSomething, Log, TEXT("UseEnumValue as string : %s"), \*GETENUMSTRING("EUsesEnum", UseEnumValue));
}

Output:  
LogYourCategory: UseEnumValue as string : UseEnum\_Good

Credits
-------

[Kris](/User:Kris "User:Kris")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=EnumToString\_Macro&oldid=14099](https://wiki.unrealengine.com/index.php?title=EnumToString_Macro&oldid=14099)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)