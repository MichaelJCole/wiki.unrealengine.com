Garbage Collection & Dynamic Memory Allocation - Epic Wiki                    

Garbage Collection & Dynamic Memory Allocation
==============================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Dynamic Load Object From Asset Path](#Dynamic_Load_Object_From_Asset_Path)
*   [3 Disclaimer](#Disclaimer)
*   [4 Dynamic UObject Allocation](#Dynamic_UObject_Allocation)
*   [5 Preventing Garbage Collection](#Preventing_Garbage_Collection)
    *   [5.1 .H](#.H)
    *   [5.2 .CPP](#.CPP)
    *   [5.3 Implications of Not Using UPROPERTY()](#Implications_of_Not_Using_UPROPERTY.28.29)
*   [6 Using UObject Flag to Prevent Garbage Collection](#Using_UObject_Flag_to_Prevent_Garbage_Collection)
*   [7 Counting UPROPERTY() References To Any Object](#Counting_UPROPERTY.28.29_References_To_Any_Object)
*   [8 Destroying / Deallocating](#Destroying_.2F_Deallocating)
    *   [8.1 Destroying Objects](#Destroying_Objects)
    *   [8.2 Destroying Actors](#Destroying_Actors)
*   [9 IsValidLowLevel()](#IsValidLowLevel.28.29)
*   [10 Weak Pointers](#Weak_Pointers)
*   [11](#)
*   [12 Dynamic Memory Management](#Dynamic_Memory_Management)
    *   [12.1 C++ operator new and delete](#C.2B.2B_operator_new_and_delete)
    *   [12.2 Every New Must Have a Delete](#Every_New_Must_Have_a_Delete)
    *   [12.3 Memory.h / FMemory::](#Memory.h_.2F_FMemory::)
    *   [12.4 Templated UE4 C++ Malloc Function](#Templated_UE4_C.2B.2B_Malloc_Function)
        *   [12.4.1 Example Usage](#Example_Usage)
    *   [12.5 UE4 C++ Free](#UE4_C.2B.2B_Free)
*   [13 If You Use Malloc You Must Use Free](#If_You_Use_Malloc_You_Must_Use_Free)
    *   [13.1 UE4 new operator and running out of memory](#UE4_new_operator_and_running_out_of_memory)
*   [14 How to Disable GC Verify To Avoid Hitches](#How_to_Disable_GC_Verify_To_Avoid_Hitches)
*   [15 Summary](#Summary)

Overview
--------

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Please note this tutorial in its present state reflects only my understanding and is not an Epic tutorial, you should examine the UE4 Source to get a more complete understanding of Dynamic Memory Management and the Garbage Collection System.

**What I post here are the basics to get you started :)**

Dynamic Load Object From Asset Path
-----------------------------------

See my Dynamic Load Object Tutorial!

**[Dynamic Load Object](/Dynamic_Load_Object "Dynamic Load Object")**

This is how you load objects from an Asset Path, after creating those assets via the Editor!

You can use Dynamic Load Object to load a UStaticMesh into your game and then assign it to a Static Mesh Actor that you spawn, for example.

 If you are new to C++ / UE4 C++ I recommend you start with my Dynamic Load Object tutorial.

Disclaimer
----------

 Please note that the rest of this tutorial is an advanced tutorial, 
 and you should not attempt any of this until you are comfortable with C++ and UE4 C++.

Dynamic UObject Allocation
--------------------------

//in any class
UMyObjectClass\* DynamicObj \= NewObject<UMyObjectClass\>(this);

this = Outer, if you are looking through the UE4 Source.

Preventing Garbage Collection
-----------------------------

**UE4 Garbage Collection only counts references to UObjects that are UPROPERTY()**

To ensure that your spawned UObjects or objects created with NewObject are not Garbage Collected prematurely, you must have at least 1 reference to the UObject that is UPROPERTY()

### .H

UPROPERTY()
UMyObjectClass\* MyGCProtectedObj;

### .CPP

MyGCProtectedObj \= NewObject<UMyObjectClass\>(this);

### Implications of Not Using UPROPERTY()

If you do not use UPROPERTY() you can **never rely on your dynamic UObject staying in existence!**  
**Make sure you pay close attention to this if you are spawning UObjects or using NewObject())!**

Using UObject Flag to Prevent Garbage Collection
------------------------------------------------

You can also prevent an object from being garbage collected by setting the RF\_RootSet flag.

YourObjectInstance\-\>AddToRoot();

Counting UPROPERTY() References To Any Object
---------------------------------------------

I have created a wiki that shows you how you can find out exactly who is referring to your UObject/AActor at any time!

[Garbage Collection ~ Count References To Any Object](https://wiki.unrealengine.com/Garbage_Collection_~_Count_References_To_Any_Object#Code)

Destroying / Deallocating
-------------------------

### Destroying Objects

You can destroy objects created during runtime using:

if(!MyObject) return;
if(!MyObject\-\>IsValidLowLevel()) return;
 
MyObject\-\>ConditionalBeginDestroy(); //instantly clears UObject out of memory
MyObject \= nullptr;

### Destroying Actors

You can destroy AActor extending classes using

if(!TheCharacter) return;
if(!TheCharacter\-\>IsValidLowLevel()) return;
TheCharacter\-\>Destroy();
TheCharacter\-\>ConditionalBeginDestroy(); //essential extra step, in all my testing

IsValidLowLevel()
-----------------

You must always check if a UObject or AActor is valid before deferencing the pointer to it!

 If you are wanting to use Dynamic Allocation of UObjects, 
 you really should also use IsValidLowLevel()

//Get the Name of my Dynamic Object
 
if(!MyGCProtectedObj) return;
if(!MyGCProtectedObj\-\>IsValidLowLevel()) return;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
//It is safe to dereference now :)
ClientMessage(MyGCProtectedObj\-\>GetName());

IsValidLowLevel() checks the actual validity of the created UObject and can prevent crashes where a simple pointer check wouldn't, because the pointer is valid but is pointing to an incomplete / partially deconstructed UObject.

Weak Pointers
-------------

Quoting Epic Dev Matt

 If you know that the lifetime of an object is managed elsewhere 
 and you just want to observe it and not contribute any references to it, 
 you can hold onto a TWeakObjectPtr to that object 
 which will safely be nulled out when the object is destroyed.

TWeakObjectPtr<UStaticMesh\> MeshThatCouldBeNull;

Dynamic Memory Management
-------------------------

### C++ operator new and delete

Although you can use Malloc and free as I explain below, I personally recommend that you use c++ operator **new** and **delete**!

This is because C++ operator new **properly initializes the vtable** (virtual function table) for any virtual functions in your data type, and also **calls the constructor** for your data type!

  FYourDataType\* NewDataPtr \= new FYourDataType();

### Every New Must Have a Delete

Please note you absolutely must **pair every use of new with a delete** to avoid memory leaks, as you are now doing your own memory management!

  delete NewDataPtr;

### Memory.h / FMemory::

Use the Memory.h functions!

Do not use c++ level memory functions!

 Memory.h contains UE4 C++ versions of C++ memory management functions 
 that are maintained by Epic as the engine evolves.

### Templated UE4 C++ Malloc Function

Here is my very own Templated Malloc function which I used to make my **[In-game Editor Undo system!](/Victory_Game#Undo_Feature "Victory Game")**

**[Video of my In-game Editor Undo system!](/Victory_Game#Undo_Feature "Victory Game")**

  

//The purpose of this template is to ensure no typos when malloc-ing
//  types that are related and will pass static cast, but if there's a typo could be allocating
//  insufficient amount of space
 
//the name is VStruct because I was mallocing USTRUCTS
 
template <typename DataType\>
FORCEINLINE DataType\* VStructMalloc()
{
	return	static\_cast<DataType\*\>(FMemory::Malloc(sizeof(DataType)));
}

#### Example Usage

FVictoryUndoDataCreateWall\* NewUndo \= VStructMalloc<FVictoryUndoDataCreateWall\>();
if(!NewUndo) return;

### UE4 C++ Free

FMemory::Free(NewUndo);

If You Use Malloc You Must Use Free
-----------------------------------

Every Malloc must be paired with a Free when you are doing your own Dynamic Memory management, or you will have a Memory Leak.

FMemory::Malloc
FMemory::Free

### UE4 new operator and running out of memory

From AnswerHub answer by Jamie Dale:

> UObject and UStruct types overload operator new via one of the nested macros within GENERATED\_UCLASS\_BODY and GENERATED\_USTRUCT\_BODY. Slate widgets also override this operator, as do modules via REPLACEMENT\_OPERATOR\_NEW\_AND\_DELETE.
> 
> The module level replacement seems to catch all the allocations made within a module, even if you're not allocating a UObject, UStruct, or Slate widget.
> 
> Ultimately they call through to FMemory::Malloc, which will forward it onto whichever allocator is active (eg, FMallocTBB). If one of these allocators fails to perform an allocation, they will call an implementation specific OutOfMemory function to log a fatal error.
> 
> I tried allocating 0x7fffffffffffffff bytes. With a debugger attached, it broke into the debugger on the failed allocation; without a debugger attached, the application just quit.

How to Disable GC Verify To Avoid Hitches
-----------------------------------------

If you want to disable GC in release builds to avoid hitches (if you are experiencing them)

In the commandline when you run the game:

 -NoVerifyGC

[Epic Documentation](https://docs.unrealengine.com/latest/INT/Engine/Performance/Options/index.html)

[AnswerHub Explanation by Epic Dev Robert](https://answers.unrealengine.com/questions/177892/game-hitches-gc-mark-time.html)

Summary
-------

Now you know how to dynamically spawn / create UObjects and also prevent them from getting Garbage Collected!

You also know how to prevent your game from crashing constantly.

 It's called IsValidLowLevel() !!!

You also have a very brief intro into Dynamic Memory Management which I plan to let you explore further by studying Memory.h directly.

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Garbage\_Collection\_%26\_Dynamic\_Memory\_Allocation&oldid=23255](https://wiki.unrealengine.com/index.php?title=Garbage_Collection_%26_Dynamic_Memory_Allocation&oldid=23255)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)