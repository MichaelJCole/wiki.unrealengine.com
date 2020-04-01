Iterators: Object & Actor Iterators, Optional Class Scope For Faster Search - Epic Wiki                    

Iterators: Object & Actor Iterators, Optional Class Scope For Faster Search
===========================================================================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Include](#Include)
        *   [1.1.1 Controller Class](#Controller_Class)
*   [2 Object Iterator](#Object_Iterator)
*   [3 Actor Iterator](#Actor_Iterator)
*   [4 Object Iterator & Actor Iterator Comparison](#Object_Iterator_.26_Actor_Iterator_Comparison)
    *   [4.1 Disadvantage of Object Iterator](#Disadvantage_of_Object_Iterator)
    *   [4.2 Critical Advantage of Object Iterator](#Critical_Advantage_of_Object_Iterator)
    *   [4.3 Object Iterator Can Search for AActors](#Object_Iterator_Can_Search_for_AActors)
*   [5 Specifying Classes & Subclasses To Search For](#Specifying_Classes_.26_Subclasses_To_Search_For)
    *   [5.1 Object Iterator, Specific Base Class](#Object_Iterator.2C_Specific_Base_Class)
    *   [5.2 Actor Iterator, Specific Base Class](#Actor_Iterator.2C_Specific_Base_Class)
*   [6](#)
*   [7 Using a World-Filter with ObjectIterator](#Using_a_World-Filter_with_ObjectIterator)
    *   [7.1 In-Engine Example ~ Get All Widgets Of Class](#In-Engine_Example_.7E_Get_All_Widgets_Of_Class)
*   [8 Summary](#Summary)

Overview
--------

Dear Community,

In the UE4 engine two of the most powerful tools I use constantly are the Object and the Actor Iterators.

You can use these functions to search for all Run-Time instances of actors and objects, or only specific classes!

  
**The advantage of using the UE4 iterators is that they are always accurate!**

  
You dont have to maintain dynamic arrays of actors, and then remember to remove actors when they are destroyed!

The Actor and Object Iterators always give you the real and accurate list of all actors / objects currently still active in your game world

Yay!

### Include

**#include "EngineUtils.h"**

#### Controller Class

You dont have to use these functions in the Controller Class,

I was just doing this for the sake of ClientMessage and easy testing on your part :)

Object Iterator
---------------

void AYourControllerClass::PrintAllObjectsNamesAndClasses()
{
	for ( TObjectIterator<UObject\> Itr; Itr; ++Itr )
	{
		ClientMessage(Itr\-\>GetName());
		ClientMessage(Itr\-\>GetClass()\-\>GetDesc());
	}
}

Actor Iterator
--------------

void AYourControllerClass::PrintAllActorsLocations()
{
	//EngineUtils.h
	for (TActorIterator<AActor\> ActorItr(GetWorld()); ActorItr; ++ActorItr )
	{
		ClientMessage(ActorItr\-\>GetName());
		ClientMessage(ActorItr\-\>GetActorLocation().ToString());
	}
}

Object Iterator & Actor Iterator Comparison
-------------------------------------------

### Disadvantage of Object Iterator

Unlike the Actor Iterator, the Object iterator is going to iterate over objects in the Pre-PIE world / the Editor World.

This can lead to unexpected results.

This is not an issue if you are running your game as an independent Game Instance / the editor is closed :)

### Critical Advantage of Object Iterator

A critically important advantage of the Object Iterator is that it does not require a UWorld\* Context!

Notice how all the uses of Actor Iterator involve GetWorld()

TActorIterator ActorItr<AStaticMeshActor\>(GetWorld());

If you need to find an object in the game world from a static context, where you cannot obtain the UWorld via some other means,

then the Object Iterator is the way to get the proper context and access the entire living game world!

### Object Iterator Can Search for AActors

Because AActor extends UObject, the Object Iterator can search for AActors!

But the AActor Iterator cannot search for instances of UObjects that do not extend AActor at some point.

So the Object Iterator can do a search for all UStaticMeshComponents, as well as all ACharacters!

TObjectIterator<UStaticMeshComponent\> Itr;

TObjectIterator<ACharacter\> Itr;

Specifying Classes & Subclasses To Search For
---------------------------------------------

Perhaps the most powerful feature of the Actor and Object Iterators is the ability to limit the scope of the search to a chosen base class and its subclasses!

This makes the iterator run faster and helps you gather only the data you really want from the game world!

### Object Iterator, Specific Base Class

void AYourControllerClass::PrintAllSkeletalMeshComponentsNames()
{
	for ( TObjectIterator<USkeletalMeshComponent\> Itr; Itr; ++Itr )
	{
		ClientMessage(Itr\-\>GetName());
	}
}

### Actor Iterator, Specific Base Class

void AYourControllerClass::PrintAllStaticMeshActorsLocations()
{
	//EngineUtils.h
	for (TActorIterator<AStaticMeshActor\> ActorItr(GetWorld()); ActorItr; ++ActorItr)
	{
		ClientMessage(ActorItr\-\>GetName());
		ClientMessage(ActorItr\-\>GetActorLocation().ToString());
	}
}

Using a World-Filter with ObjectIterator
----------------------------------------

ObjectIterator can and will return editor-instance / default object objects that simply should not be edited at runtime!

To filter out objects that you should not be editing at runtime, you can do a world check with an object that you know is part of the correct world (not the editor world)!

UWorld\* YourGameWorld \= //set this somehow, from another UObject or pass it in as parameter
 
for(TObjectIterator<UYourObject\> Itr; Itr; ++Itr)
{
   //World Check
   if(Itr\-\>GetWorld() !\= YourGameWorld)
   {
      continue;
   }
   //now do stuff
}

### In-Engine Example ~ Get All Widgets Of Class

The above is the code structure that I used for my Get All Widgets of Class node, pull request that Epic accepted that is now live in 4.7 !

**Github Link**

[https://github.com/EpicGames/UnrealEngine/pull/569](https://github.com/EpicGames/UnrealEngine/pull/569)

I avoid getting the UMG widget default objects /editor objects by passing in the world using the Blueprint method of setting a WorldContextObject!

Enjoy!

Rama

Summary
-------

I have now shared with you two of my absolute favorite tools in the UE4 Engine!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Iterators:\_Object\_%26\_Actor\_Iterators,\_Optional\_Class\_Scope\_For\_Faster\_Search&oldid=15167](https://wiki.unrealengine.com/index.php?title=Iterators:_Object_%26_Actor_Iterators,_Optional_Class_Scope_For_Faster_Search&oldid=15167)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)