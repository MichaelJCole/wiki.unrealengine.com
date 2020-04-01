Function Pointers - Epic Wiki               

Function Pointers
=================

From Epic Wiki

(Redirected from [Function Pointers in UE4 C++](/index.php?title=Function_Pointers_in_UE4_C%2B%2B&redirect=no "Function Pointers in UE4 C++"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 My Example: 30 Behavior Functions](#My_Example:_30_Behavior_Functions)
*   [3 Special Thanks and C++ Note](#Special_Thanks_and_C.2B.2B_Note)
*   [4 C++ Code for UCLASS() Function Pointers](#C.2B.2B_Code_for_UCLASS.28.29_Function_Pointers)
    *   [4.1 .h](#.h)
    *   [4.2 .cpp](#.cpp)
*   [5 Syntax Complexity Comparison](#Syntax_Complexity_Comparison)
*   [6 Summary](#Summary)

Overview
--------

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

When you have a whole bunch of functions that you want to call, that are all related in some way,

you can make a function pointer array to quickly access and call a specific function by index!

My Example: 30 Behavior Functions
---------------------------------

In my example, I have 30 behaviors that are all virtual functions as part of an AI system.

Each creature needs to implement the behavior in its own way, so the functions are virtual.

But in the AI class, I need to be able to say "run this behavior function" quickly and easily.

That's what function pointers enable you to do!

  

Special Thanks and C++ Note
---------------------------

You can easily find info on function pointers on the internet, but in UE4 classes you need to also specify the namespace, and I was having trouble with that part

Special thanks go to Steve Allison and other Epic Devs for offering the correct syntax!

  

C++ Code for UCLASS() Function Pointers
---------------------------------------

### .h

#include "YourClass.generated.h"
 
#define BEHAVIORS\_MAX 30
 
UCLASS()
class AYourClass : AActor //or any other class setup
{
	GENERATED\_UCLASS\_BODY()
 
public:
 
	//The Function Pointer Variable Type
	//Functions take in 0 parameters and return void
	typedef void (AYourClass::\*FunctionPtrType)(void);
 
	//A static array of 30 Function Pointers
	FunctionPtrType BehaviorFunctions\[BEHAVIORS\_MAX\];
 
	//Play a Behavior from the Function Pointer Array
	//	implementation does not vary in subclasses, so not virtual
	void PlayBehavior(int32 BehaviorIndex );
 
	//Initialize the array
	void InitBehaviors();
 
	//The actual functions which are implemented in subclasses
	//or this class itself
	virtual void PlayBehavior\_Idle\_LookLeftToRight();
	virtual void PlayBehavior\_Idle\_LookFullCircle();
	virtual void PlayBehavior\_Idle\_ScanUpDown();
	//...more functions

### .cpp

#define LOOK\_FULL\_CIRCLE 0
 
#define SCAN\_LEFT\_TO\_RIGHT 1
 
#define SCAN\_UP\_DOWN	  2
//... more function index defines to 29
 
void AYourClass::InitBehaviors()
{
	BehaviorFunctions\[LOOK\_FULL\_CIRCLE\] \= &AYourClass::PlayBehavior\_Idle\_LookFullCircle;
	BehaviorFunctions\[SCAN\_LEFT\_TO\_RIGHT\] \= &AYourClass::PlayBehavior\_Idle\_LookLeftToRight;
	BehaviorFunctions\[SCAN\_UP\_DOWN\] \= &AYourClass::PlayBehavior\_Idle\_ScanUpDown;
	//...more functions
}
 
void AYourClass::PlayBehavior\_Idle\_LookLeftToRight(){}
void AYourClass::PlayBehavior\_Idle\_LookFullCircle(){}
void AYourClass::PlayBehavior\_Idle\_ScanUpDown(){}
//...rest of functions
 
 
void AYourClass::PlayBehavior(int32 BehaviorIndex )
{
	//valid range check
	if (BehaviorIndex \>= BEHAVIORS\_MAX || BehaviorIndex < 0) return;
	//~~
 
	//Special Thanks to Epic for this Syntax
	(this\-\>\* (BehaviorFunctions\[BehaviorIndex\]))();
 
	//the above line plays the appropriate function based on the passed in index!
}

  

Syntax Complexity Comparison
----------------------------

this same sort of setup, without function pointers, would either have been a switch statement, or a series of if elses.

Supposing there were actually 30 entries you can see why a function pointer array simplifies all this!

this

//Without function pointers
if(BehaviorIndex \== SCAN\_LEFT\_TO\_RIGHT)
	PlayBehavior\_Idle\_LookLeftToRight();
 
else if (BehaviorIndex \== LOOK\_FULL\_CIRCLE)
	PlayBehavior\_Idle\_LookFullCircle();
 
else if (BehaviorIndex \== SCAN\_UP\_DOWN)
	PlayBehavior\_Idle\_ScanUpDown();
//...
//...
//and much much more ...

becomes this!

//With Function Pointers
//Special Thanks to Epic for this Syntax
(this\-\>\* (BehaviorFunctions\[BehaviorIndex\]))();
 
//that's it! nothing else!!!!

Summary
-------

Thanks to Epic I can now present to you the correct C++ syntax for using UCLASS-specific function pointers!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Function\_Pointers&oldid=2325](https://wiki.unrealengine.com/index.php?title=Function_Pointers&oldid=2325)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")