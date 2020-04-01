Interfaces in C++ - Epic Wiki               

Interfaces in C++
=================

From Epic Wiki

(Redirected from [Interfaces in UE4 C++](/index.php?title=Interfaces_in_UE4_C%2B%2B&redirect=no "Interfaces in UE4 C++"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

**Rate this Article:**

3.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:(please verify)

Contents
--------

*   [1 Overview](#Overview)
*   [2 The Interface](#The_Interface)
    *   [2.1 IToStringInterface::](#IToStringInterface::)
*   [3 Multiple Class Inheritance](#Multiple_Class_Inheritance)
*   [4 InterfaceCast](#InterfaceCast)
    *   [4.1 Determining If a Given Actor Has The Interface](#Determining_If_a_Given_Actor_Has_The_Interface)
    *   [4.2 The Magic of InterfaceCast and UE4 C++ Interfaces](#The_Magic_of_InterfaceCast_and_UE4_C.2B.2B_Interfaces)
*   [5 Creating Global Events](#Creating_Global_Events)
    *   [5.1 Object Iterator Vs Actor Iterator](#Object_Iterator_Vs_Actor_Iterator)
    *   [5.2 Object Iterator to Trigger Global Event](#Object_Iterator_to_Trigger_Global_Event)
    *   [5.3 Actor Iterator to Trigger Global Event](#Actor_Iterator_to_Trigger_Global_Event)
    *   [5.4 Minimizing Iterator Time](#Minimizing_Iterator_Time)
*   [6 Narrowed Actor Iterator Search](#Narrowed_Actor_Iterator_Search)
*   [7 Narrowed Object Iterator Search](#Narrowed_Object_Iterator_Search)
*   [8 Summary](#Summary)

Overview
--------

_Original Author_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here's a tutorial on using **UE4 C++ Interfaces** to trigger global custom game events directly in C++ or via the level blueprint (or anywhere really).

This tutorial enables you to have a custom event like TheSunReachedHighNoon, and have a bunch of actors respond to this event differently, each with their own implementation of the event.

So flowers could override TheSunReachedHighNoon to open blossoms completely,

frogs could use override TheSunReachedHighNoon to hide under rocks

etc etc

And you can trigger the event via a blueprintcallable function used in a static blueprint library if you want!

This means you can trigger global actor events from your level blueprint and ask actors to do specific things,

without having to iterate over the actors in the level blueprint itself.

I also show you how you can **easily determine whether any given actor has the interface or not.**

  

The Interface
-------------

As a really simple example, I wrote a ToString() interface.

I will discuss how to turn this into a global event below.

In the overall theme of making a global event you'd replace ToString() with TheSunReachedHighNoon()

but to make sure you can actually test the code I am using ToString() instead.

.h

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#pragma once
 
#include "ToStringInterface.generated.h"
 
/\*\* Class needed to support InterfaceCast<IToStringInterface>(Object) \*/
UINTERFACE(MinimalAPI)
class UToStringInterface : public UInterface
{
	GENERATED\_UINTERFACE\_BODY()
};
 
class IToStringInterface
{
	GENERATED\_IINTERFACE\_BODY()
 
	virtual FString ToString();
};

.cpp

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#include "VictoryGame.h"
 
//////////////////////////////////////////////////////////////////////////
// ToStringInterface
 
UToStringInterface::UToStringInterface(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
 
}
 
//This is required for compiling, would also let you know if somehow you called
//the base event/function rather than the over-rided version
FString IToStringInterface::ToString()
{
	return "IToStringInterface::ToString()";
}

### IToStringInterface::

note that it is IToStringInterface::ToString(), not UToStringInterface::ToString()

Multiple Class Inheritance
--------------------------

You have to use **multiple inheritance**, and only the IToStringInterface part.

The first inherited class will be anything you want, relative to your project, I just used ASkeletalMeshActor as an example.

.h

UCLASS(placeable)
class AFlower : public ASkeletalMeshActor,  public IToStringInterface
{
	GENERATED\_UCLASS\_BODY()
 
	FLinearColor FlowerColor;
 
	FVector FlowerScale3D;
 
	void OpenBlossom();
	void CloseUpForTheNight();
 
//IToStringInterface
public:
 
	virtual FString ToString() OVERRIDE;
 
};

.cpp

//other flower code
 
//IToStringInterface
FString AFlower::ToString()
{
	return "Flower!";
}

  

Any number of classes can implement this Event now, using similar format

.h

UCLASS(placeable)
class AFrog : public ACharacter,  public IToStringInterface
{
	GENERATED\_UCLASS\_BODY()
 
	FLinearColor FrogBaseColor;
 
	FVector FrogScale3D;
 
	void HopAround();
	void HideUnderRockCauseSunIsTooHot();
 
//IToStringInterface
public:
 
	virtual FString ToString() OVERRIDE;
 
};

.cpp

//other Frog code
 
//IToStringInterface
FString AFrog::ToString()
{
	return "Frog!!!!";
}

  

InterfaceCast
-------------

### Determining If a Given Actor Has The Interface

**NOTE: Using C++ interfaces in Blueprint objects requires a different approach. [https://wiki.unrealengine.com/Interfaces\_And\_Blueprints](https://wiki.unrealengine.com/Interfaces_And_Blueprints)**

You use InterfaceCast to determine if a object is using your interface, if it returns NULL then the object is not using it.

If the InterfaceCast returns your Interface type, then calling it's function will use the subclassed version specific to the object you called it on.

See below for what I mean, it's really really cool actually :)

//Example: somewhere in your Player Controller class code you have instances of a frog and a flower and a tree
 
//spawned and set somewhere in player controller code (for use of ClientMessage)
//can really do this anywhere you want, this is just a test you can easily do
AFrog\* MyFrog;
AFlower\* MyFlower;
ATree\* HappyTree;
 
//....
 
//Check Frog
IToStringInterface\* TheInterface \= InterfaceCast<IToStringInterface\>(MyFrog);
 
if(TheInterface)
{
	ClientMessage("Frog Uses Interface");
	ClientMessage(TheInterface\-\>ToString());
}
 
//Check Flower
TheInterface \= InterfaceCast<IToStringInterface\>(MyFlower);
 
if(TheInterface)
{
	ClientMessage("Flower Uses Interface");
	ClientMessage(TheInterface\-\>ToString());
}
 
//Check HappyTree
TheInterface \= InterfaceCast<IToStringInterface\>(HappyTree);
 
if(TheInterface)
{
	ClientMessage("Flower Uses Interface");
	ClientMessage(TheInterface\-\>ToString());
}
else ClientMessage("HappyTree Does Not Use Interface");
 
//end of code segment

  

### The Magic of InterfaceCast and UE4 C++ Interfaces

From the above code you can see that I am always calling

TheInterface\-\>ToString()

and the type of TheInterface never changes, it is always IToStringInterface\* and I only create it once at the very top.

So why would calling

TheInterface\-\>ToString()

produce different results for each use of TheInterface with different Objects?

Because C++ fundamentals include a feature called "polymorphism", that's why :)

InterfaceCasting each type of object returns the subclassed version of the ToString() function!

Creating Global Events
----------------------

Now you have all the tools you need to create a global event!

Whenever you want to create a global event, simply

1\. iterate over all actors in the world

2\. check if that actor implements your custom event interface

3\. run the custom event for that actor.

  

### Object Iterator Vs Actor Iterator

If you are wanting to use a blueprintcallable function in a custom blueprint library,

you must use the Object Iterator, not the Actor Iterator, since static classes can't use GetWorld() (as far as I know)

  

### Object Iterator to Trigger Global Event

You can use this anywhere, but in PIE it will detect objects in the pre-PIE world as well as the game world, in an unspecified order.

IToStringInterface\* TheInterface \= NULL;
for ( TObjectIterator<AActor\> It; It; ++It )
{
	//Try InterFaceCasting
	TheInterface \= InterfaceCast<IToStringInterface\>(\*It);
 
	//Run the Event specific to the actor, if the actor has the interface
	if(TheInterface) ClientMessage(TheInterface\-\>ToString());
}

Again in this simple case, the "Event" is just the ToString() function, but I wanted something you could try out before doing fancier things and get fast feedback via ClientMessage in as non-project-specific a way as possible

### Actor Iterator to Trigger Global Event

If you dont need to trigger the event from a static function in a blueprint library,

and can call the function with a blueprintcallable or regular function somewhere else in an Actor class.

Then you can use the actor iterator (My personal favorite!)

IToStringInterface\* TheInterface \= NULL;
TActorIterator< AActor \> ActorItr(GetWorld());
while (ActorItr)
{
	//Try InterFaceCasting
	TheInterface \= InterfaceCast<IToStringInterface\>(\*ActorItr);
 
	//Run the Event specific to the actor, if the actor has the interface
	if(TheInterface) ClientMessage(TheInterface\-\>ToString());
 
	//
	++ActorItr;  //dont forget this or game will hang due to while loop
                           //could use a for loop instead
}

### Minimizing Iterator Time

If you know only certain subclasses of Actor have any chance of using your event

like only StaticMeshActors or only Characters, than you can specify a different class for the Actor or Object Iterator

  

Narrowed Actor Iterator Search
------------------------------

IToStringInterface\* TheInterface \= NULL;
TActorIterator< AStaticMeshActor \> ActorItr(GetWorld());
while (ActorItr)
{
	//Try InterFaceCasting
	TheInterface \= InterfaceCast<IToStringInterface\>(\*ActorItr);
 
	//Run the Event specific to the actor, if the actor has the interface
	if(TheInterface) ClientMessage(TheInterface\-\>ToString());
 
	//
	++ActorItr;  //dont forget this or game will hang due to while loop
					//could use a for loop instead
}

  

Narrowed Object Iterator Search
-------------------------------

(You can use this anywhere, but in PIE it will detect all sorts of things)

IToStringInterface\* TheInterface \= NULL;
for ( TObjectIterator<ACharacter\> It; It; ++It )
{
	//Try InterFaceCasting
	TheInterface \= InterfaceCast<IToStringInterface\>(\*It);
 
	//Run the Event specific to the actor, if the actor has the interface
	if(TheInterface) ClientMessage(TheInterface\-\>ToString());
}

Summary
-------

Now you can trigger global events that only certain actors will respond to, and you can have each actor respond in their own unique way, while keeping the code very simple!

Yay!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Interfaces\_in\_C%2B%2B&oldid=8283](https://wiki.unrealengine.com/index.php?title=Interfaces_in_C%2B%2B&oldid=8283)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")