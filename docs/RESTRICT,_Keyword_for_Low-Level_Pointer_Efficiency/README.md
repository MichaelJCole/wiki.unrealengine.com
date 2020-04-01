RESTRICT, Keyword for Low-Level Pointer Efficiency - Epic Wiki                    

RESTRICT, Keyword for Low-Level Pointer Efficiency
==================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Pointer Aliasing](#Pointer_Aliasing)
*   [3 Unique Memory Strips](#Unique_Memory_Strips)
*   [4 Pointer Restriction](#Pointer_Restriction)
*   [5 UE4 RESTRICT Macro](#UE4_RESTRICT_Macro)
*   [6 My Own UObject Pointer RESTRICT Example](#My_Own_UObject_Pointer_RESTRICT_Example)
*   [7 Avoid Aliasing in the First Place](#Avoid_Aliasing_in_the_First_Place)
*   [8 Network Code](#Network_Code)
*   [9 Link: Extensive Information on \_restrict in C++](#Link:_Extensive_Information_on_restrict_in_C.2B.2B)
*   [10 Conclusion](#Conclusion)

Overview
--------

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

In this wiki tutorial, I discuss a pointer-only optimization technique that can improve low level code involving multiple pointers that have the same data type.

The special keyword involved ( **\_restrict** ) helps the compiler produce more efficient code whenever multiple pointers of the same data type are used within the same context.

If you search the UE4 code base you will see examples of this optimization (**RESTRICT and \_restrict**) in use!

Pointer Aliasing
----------------

Pointer Aliasing means 2+ pointers are pointing to the same memory address, in the same context.

The compiler cannot ever assume aliasing is **not** occurring if multiple pointers in the same context have the same data type:

SomeContext
{
  float\* Ptr1;
  float\* Ptr2;
  float\* Ptr3;
}

When the compiler sees 3 pointers of the same data type in the same context, it cannot assume that these pointes are not aliases of each other.

for example:

SomeContext
{
  float TheData
  float\* Ptr1 \= &TheData;
  float\* Ptr2 \= &TheData;
  float\* Ptr3 \= &TheData;
 
  //All 3 pointers are aliases of each other! They all point to the same data
}

Unique Memory Strips
--------------------

When 3 pointers are pointing to unique memory strips, and are not aliasing each other, the compiler could perform some optimization if it knew this was the case:

SomeContext
{
  float Time;
  float Space;
  float Stars;
 
  float\* Ptr1 \= &Time;
  float\* Ptr2 \= &Space;
  float\* Ptr3 \= &Stars;
 
  //All 3 pointers point to unique memory strips, but the compiler cannot assume this
}

Pointer Restriction
-------------------

The c++ keyword **\_restrict** enables you to tell the compiler that you are quite positive that each of the pointers have unique access to their respective memory strips.

**This keyword should only be used if you are absolutely sure that the pointers do actually have unique access to their memory location, within their context!**

Use of \_restrict example:

SomeContext
{
  float Time;
  float Space;
  float Stars;
 
  float\* \_\_restrict Ptr1 \= &Time;
  float\* \_\_restrict Ptr2 \= &Space;
  float\* \_\_restrict Ptr3 \= &Stars;
 
  //All 3 pointers point to unique memory strips,
  //	AND THE COMPILER KNOWS IT!
  //		Optimization can now occur.
}

UE4 RESTRICT Macro
------------------

If you search the code base you will find

 #define RESTRICT \_restrict

in a couple of places :)

SomeContext
{
  float Time;
  float Space;
  float Stars;
 
  //The UE4 Way
  float\* RESTRICT Ptr1 \= &Time;
  float\* RESTRICT Ptr2 \= &Space;
  float\* RESTRICT Ptr3 \= &Stars;
 
  //All 3 pointers point to unique memory strips,
  //	AND THE COMPILER KNOWS IT!
  //		Optimization can now occur.
}

My Own UObject Pointer RESTRICT Example
---------------------------------------

In this code sample, I have two pointers of the same data type, passed into the same function context.

In my code below, the compiler knows that **OldCharacter** and _NewCharacter_ are distinct entities with distinct memory strips, and can optimize actions performed to these memory addresses.

void AMyPC::SwitchCharacters(
	AMyCharacter\* RESTRICT OldCharacter,
	AMyCharacter\* RESTRICT NewCharacter
){
        if(!OldCharacter || !NewCharacter)
        {
          return;
        }
 
	//Hide Old Character
	OldCharacter\-\>SetActorHiddenInGame(true);
 
	//Remove Collision Old Char
	OldCharacter\-\>SetActorEnableCollision(false);
 
	//Show New Character
	NewCharacter\-\>SetActorHiddenInGame(false);
 
	NewCharacter\-\>SetActorEnableCollision(true);
 
	NewCharacter\-\>CharacterMovement\-\>GravityScale \= NewCharacter\-\>VictoryGravityScale;
 
}

Avoid Aliasing in the First Place
---------------------------------

You can avoid needing to use the RESTRICT keyword in many places if you simply only define your pointers at the narrowest possible scope

//Global
float TheData;
//float\* DataPtr; // not good!
//float\* DataPtr2;
//float\* DataPtr3;
 
 
//function context
Some Function
{
  //do other stuff
 
  for loop
  {
	float\* LocalPtr \= &TheData; //pointer only exists in smallest context, no aliasing
        \*LocalPtr +\= 5; 
  }
}
 
//function context
Some Function2
{
  //do other stuff
 
  for loop
  {
	float\* LocalPtr2 \= &TheData; //pointer only exists in smallest context, no aliasing
        \*LocalPtr +\= 12; 
  }
}
 
//function context
Some Function3
{
  //do other stuff
 
  for loop
  {
	float\* LocalPtr3 \= &TheData; //pointer only exists in smallest context, no aliasing 
        \*LocalPtr +\= 9000;
  }
}

In the above case, you can avoid a lot of aliasing concerns by not having global pointers to the same data type.

Instead, in each function where you need the pointer, declare it locally and only for as long as it is needed.

This avoids ever needing the RESTRICT keyword :)

Network Code
------------

RESTRICT does not currently work with Server/Client function parameters.

Link: Extensive Information on \_restrict in C++
------------------------------------------------

**[Demystifying \_restrict keyword](http://cellperformance.beyond3d.com/articles/2006/05/demystifying-the-restrict-keyword.html)**

Conclusion
----------

Use the UE4 macro RESTRICT any time you are absolutely sure that multiple pointers of the same data type, in the same context, are always pointing to unique memory strips.

Doing this improves performance, especially for low level code that is writing/reading to long memory strips, like saving and loading binary arrays, image data processing, etc.

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=RESTRICT,\_Keyword\_for\_Low-Level\_Pointer\_Efficiency&oldid=7970](https://wiki.unrealengine.com/index.php?title=RESTRICT,_Keyword_for_Low-Level_Pointer_Efficiency&oldid=7970)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)