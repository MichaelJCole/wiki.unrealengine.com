Static Const, Make Const Versions of UE4 Types - Epic Wiki                    

Static Const, Make Const Versions of UE4 Types
==============================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 .h](#.h)
*   [3 .cpp](#.cpp)
*   [4 Keep Global Namespace Clean](#Keep_Global_Namespace_Clean)
*   [5 Summary](#Summary)

Overview
--------

Dear Community,

Using Constant versions of complex variable types can be useful,

**especially if these variables are used every tick but their values never change**.

To make a Constant version of something like an FLinearColor or an FName you can do this:

.h
--

public:
 
static const FLinearColor Red;
static const FName HeadSocket;

.cpp
----

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#include "YourGameGame.h"
 
//////////////////////////////////////////////////////////////////////////
// AYourClass
 
//you declare the static const outside of any function, but make sure to include the YourClass:: part :)
 
const FName        AYourClass::HeadSocket \= FName("Head");
const FLinearColor AYourClass::Red \= FLinearColor(1,0,0,1);
 
AYourClass::AYourClass(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
 
}

Keep Global Namespace Clean
---------------------------

Make sure to specify your class context when you declare your static const variables!

Myclass::

Summary
-------

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Static\_Const,\_Make\_Const\_Versions\_of\_UE4\_Types&oldid=1248](https://wiki.unrealengine.com/index.php?title=Static_Const,_Make_Const_Versions_of_UE4_Types&oldid=1248)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)