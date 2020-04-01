Const Functions, like virtual void Function() const; - Epic Wiki                    

Const Functions, like virtual void Function() const;
====================================================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Overriding Const Functions](#Overriding_Const_Functions)
        *   [1.1.1 .H](#.H)
        *   [1.1.2 .CPP](#.CPP)
*   [2 So What Are Const Functions For?](#So_What_Are_Const_Functions_For.3F)
    *   [2.1 Clarity](#Clarity)
    *   [2.2 Protection](#Protection)
*   [3 FORCEINLINE Const Functions](#FORCEINLINE_Const_Functions)
*   [4 Summary](#Summary)

Overview
--------

Const functions can be used to declare intent when writing a function and are also better for performance.

Research C++ const functions for more information on how this can lead to more efficient code.

  
**Const functions are functions that are not allowed to modify any member variables of the class that they are part of.**

  

### Overriding Const Functions

As you are overriding Epic's viritual functions you might encounter function syntax like this!

virtual int32 GetFlowerPetalCount() const;

Okay, maybe you're overriding a virtual function in one of my Flower Island plugins :)

But anyway!

The point is that when you override const functions like this one, you have to do it like this

#### .H

virtual int32 GetFlowerPetalCount() const OVERRIDE;

#### .CPP

int32 AMyClass::GetFlowerPetalCount() const
{
	return 7;
}

So What Are Const Functions For?
--------------------------------

### Clarity

Use a const function any time you are accessing read-only data, or are doing complex analysis of that data, but not modifying the class's member variables.

### Protection

You can use const functions **to protect member variables** that you want users of your code to access, but not modify.

FORCEINLINE Const Functions
---------------------------

FORCEINLINE allows you to declare a function entirely in the .h file and is great for code efficiency, as it means that a function is not added to the stack but is executed in Line.

**FORCEINLINE + const** is super amazing function efficiency and you will see it often in the UE4 C++ source!

  

//Member variable
TArray<AStar\*\> Stars;
 
//inline function that is const
FORCEINLINE int32 GetStarCount() const
{
	return Stars.Num();
}
 
//inline function that is const
FORCEINLINE FVector GetFirstStarPosition() const
{
   if (Stars.Num() < 1 ) return FVector::ZeroVector;
   if (!Stars\[0\]) return FVector::ZeroVector;
   if (!Stars\[0\].IsValidLowLevel()) return FVector::ZeroVector;
   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
   return Stars\[0\]\-\>GetActorLocation();
}
 
//inline function that cannot be const
FORCEINLINE void RemoveLastStar() 
{ 
        if (Stars.Num() < 1 ) return;
 
	//this is a modification to the class member variable
	//		so it cannot be const
	Stars.RemoveAt(Stars.Num() \- 1);
}

Summary
-------

Use const functions to:

 declare that a function should never modify it's class member variables, 
 for anyone who will be extending your viritual function,

 and also as method of improving code performance!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Const\_Functions,\_like\_virtual\_void\_Function()\_const;&oldid=1589](https://wiki.unrealengine.com/index.php?title=Const_Functions,_like_virtual_void_Function()_const;&oldid=1589)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)