 Interfaces in C++ - Epic Wiki             

 

Interfaces in C++
=================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Creating The Interface](#Creating_The_Interface)
    *   [2.1 ReactsToTimeOfDay.h](#ReactsToTimeOfDay.h)
    *   [2.2 ReactsToTimeOfDay.cpp](#ReactsToTimeOfDay.cpp)
*   [3 Using An Interface With C++ Classes](#Using_An_Interface_With_C.2B.2B_Classes)
    *   [3.1 Flower.h](#Flower.h)
    *   [3.2 Flower.cpp](#Flower.cpp)
    *   [3.3 Frog.h](#Frog.h)
    *   [3.4 Frog.cpp](#Frog.cpp)
    *   [3.5 Determining If a Given Actor Has The Interface](#Determining_If_a_Given_Actor_Has_The_Interface)
    *   [3.6 The Magic Interfaces](#The_Magic_Interfaces)
*   [4 Overriding Behaviour In Blueprints](#Overriding_Behaviour_In_Blueprints)
*   [5 Summary](#Summary)

Overview
--------

_Original Author_ [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

_Updated & Expanded for 4.11_ [HuntaKiller](/index.php?title=User:HuntaKiller&action=edit&redlink=1 "User:HuntaKiller (page does not exist)") Thank you for all that you contribute to the community Rama!

[Rama](/index.php?title=User:Rama "User:Rama") : You're welcome and thank you for this lovely addition!

Dear Community,

Here's a tutorial on using **UE4 C++ Interfaces in 4.11+**

Interfaces allow different objects to share common functions, but allow objects to handle that function differently if it needs to. Any classes that use an interface must implement the functions that are associated with that interface.

This gives you a lot of power over your game actors, allowing you to trigger events both in C++ and in blueprints that your game actors can handle differently.

For example, the interface implemented in this tutorial enables you to have an interface like TimeBasedBehaviour, which has a function ReactToHighNoon, and have a bunch of actors respond to this event differently, each with their own behaviour.

Flower actors that implement this interface could override the ReactToHighNoon method to open blossoms completely Frog actors implementing it could override ReactToHighNoon to hide under rocks, for example

You can then have an event, SunReachedHighNoon that is triggered anywhere (such as the level blueprint, in an actor, or a static blueprint library) which can take any actor, check if it implements the interface, and if it does it can call any of the functions of that interface and the actor will act according to how that specific actor has the behaviours defined.

This means you can trigger events _anywhere_ and as long as you have a pointer to your actor, you can ask it to do specific things without needing to know its types because you can **easily determine whether any given actor has an interface or not by casting an actor to that interface**. If the cast succeeds then the actor _does_ implement the given interface, and you can call functions using that interface.

We will implement two interface functions: one which forces you to implement default C++ behaviour on any class which uses the interface, a **BlueprintNativeEvent** called ReactToHighNoon(), and one **BlueprintImplementableEvent** which does _not_ force you to define default C++ behaviour, called ReactToMidnight().

Creating The Interface
----------------------

The following is an example implementation of a ReactsToTimeOfDay interface.

When following this tutorial and creating your interface, you'd replace ReactToHighNoon() with your function you want to force default behaviour, and ReactToMidnight() with your function that has no default behaviour.

(If you wish the function to be treated as an event, then it must return void. If you wish the function to be able to be overridden in the BP editor, then it must have a non-void return type. Replace the return type of the function with a string or void if you want to perform a simplistic test. The reasoning is discussed further below in the Critical To Note section)

### ReactsToTimeOfDay.h

<syntaxhighlight lang="cpp">// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.

1.  pragma once

1.  include "ReactsToTimeOfDay.generated.h"

/\* must have BlueprintType as a specifier to have this interface exposed to blueprints

  with this line you can easily add this interface to any blueprint class \*/

UINTERFACE(BlueprintType) class MYPROJECT\_API UReactsToTimeOfDay : public UInterface { GENERATED\_UINTERFACE\_BODY() };

class MYPROJECT\_API IReactsToTimeOfDay { GENERATED\_IINTERFACE\_BODY()

public: //classes using this interface must implement ReactToHighNoon UFUNCTION(BlueprintNativeEvent, BlueprintCallable, Category = "MyCategory") bool ReactToHighNoon();

//classes using this interface may implement ReactToMidnight UFUNCTION(BlueprintImplementableEvent, BlueprintCallable, Category = "MyCategory") bool ReactToMidnight();

};</syntaxhighlight>

_Note checked for 4.18: GENERATED\_UINTERFACE\_BODY() and GENERATED\_IINTERFACE\_BODY(), can be now changed to GENERATED\_BODY(), which is an updated version of those two that works for structs, etc, but errors could be a little confusing if you get compile errors since there's no way to differentiate. You could create an automatic interface to see how it looks now using Create C++ Class context menu on the content editor and choosing Interface type._

### ReactsToTimeOfDay.cpp

<syntaxhighlight lang="cpp">// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.

1.  include "MyProject.h"
2.  include "ReactsToTimeOfDay.h"

UReactsToTimeOfDay::UReactsToTimeOfDay(const class FObjectInitializer& ObjectInitializer) : Super(ObjectInitializer) {

} </syntaxhighlight>

Using An Interface With C++ Classes
-----------------------------------

You have to use **multiple inheritance**, and inherit from the IReactsToTimeOfDay class we created.

The first inherited class will be the base class of your actor, anything you want, a ASkeletalMeshActor is used here as an example.

### Flower.h

<syntaxhighlight lang="cpp"> //..other includes may appear here depending on your class

1.  include "ReactsToTimeOfDay.h"
2.  include "ASkeletalMeshActor.generated.h"

UCLASS() class AFlower : public ASkeletalMeshActor, public IReactsToTimeOfDay { GENERATED\_BODY()

public: /\* ... other AFlower properties and functions declared ... \*/

UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "MyCategory") bool ReactToHighNoon(); virtual bool ReactToHighNoon\_Implementation() override;

  
};</syntaxhighlight>

_virtual bool ReactToHighNoon\_Implementation() override;_ This line tells your class that it has a function of this name and signature to inherit from the interface, which is how calls to the interface functions are able to interact with this class.

_UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "MyCategory")_ _bool ReactToHighNoon();_ This tells your class that you can both call and override this function in blueprints. You need this part as well if you want to be able to override C++ functionality within BP, as BlueprintNativeEvents are intended to be used.

Notice that ReactToMidnight(), the BlueprintImplementableEvent, is not defined here. A BlueprintImplementableEvent is _declared_ (its existance) in our interface, but _defined_ (its behaviour) in blueprints only.

### Flower.cpp

<syntaxhighlight lang="cpp"> //other flower.cpp code

bool AFlower::ReactToHighNoon\_Implementation() { //Default behaviour for how flower would react at noon //OpenPetals(); //AcceptBugs(); //...

return true;

} </syntaxhighlight>

Any number of classes and subclasses can implement this interface using this format

### Frog.h

<syntaxhighlight lang="cpp"> //..other includes may appear here depending on your class

1.  include "ReactsToTimeOfDay.h"
2.  include "AFrog.generated.h"

UCLASS() class AFrog : public ACharacter, public IReactsToTimeOfDay { GENERATED\_BODY() /\* ... other AFrog properties and functions declared ... \*/

UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "MyCategory") bool ReactToHighNoon(); virtual bool ReactToHighNoon\_Implementation() override;

};</syntaxhighlight>

### Frog.cpp

<syntaxhighlight lang="cpp"> //other Frog code

bool AFrog::ReactToHighNoon\_Implementation() { //Default behaviour for how a frog would react at noon //GoSwim(); //...

return true; }

</syntaxhighlight>

### Determining If a Given Actor Has The Interface

To determine if an actor implements an interface in C++, simply cast your class to the interface, if it returns NULL then the object is not using it. If it is successful, you can use that pointer cast to the interface to call your function, which will execute from the proper class.

<syntaxhighlight lang="cpp"> //Example: somewhere else in code we are trying to see if our object reacts to time of day

//Some pointer is defined to any class inheriting from UObject UObject\* pointerToAnyUObject;

//....

  
IReactsToTimeOfDay\* TheInterface = Cast<IReactsToTimeOfDay>(pointerToAnyUObject); if (TheInterface) { //Don't call your functions directly, use the 'Execute\_' prefix //the Execute\_ReactToHighNoon and Execute\_ReactToMidnight are generated on compile //you may need to compile before these functions will appear TheInterface->Execute\_ReactToHighNoon (pointerToAnyUObject); TheInterface->Execute\_ReactToMidnight (pointerToAnyUObject); }

  
//end of code segment</syntaxhighlight>

  
**Critical To Note**

*   Whenever calling your interface functions in C++, never call the direct functions, always use the one with the Execute\_ prefix
*   Although it might seem, that you function must return a value to be properly implemented, this is not true. If your interface doesn't return a value UE4 treats it as an event. At first glance this might seem as an error, but this is not the case. You just have to create the implementation details in the event graph instead of overriding. You still can call the function normally via function, or interface call. --[Ruhrpottpatiot](/index.php?title=User:Ruhrpottpatiot&action=edit&redlink=1 "User:Ruhrpottpatiot (page does not exist)") ([talk](/index.php?title=User_talk:Ruhrpottpatiot&action=edit&redlink=1 "User talk:Ruhrpottpatiot (page does not exist)")) 21:00, 27 December 2017 (UTC)
*   To determine if an actor implements an interface in both C++ and Blueprints use

<syntaxhighlight lang="cpp"> if (pointerToAnyUObject->GetClass()->ImplementsInterface(UReactsToTimeOfDay::StaticClass()))

   IReactsToTimeOfDay::Execute\_ReactToHighNoon(pointerToAnyUObject);

</syntaxhighlight>

### The Magic Interfaces

_TheInterface->Execute\_ReactToHighNoon()_

From the above code you can see that the function is being called off of the interface, you never even need to know what type of object you're dealing with, just whether it supports the interface you need.

It produces different results depending on the actual class it is, calling the overridden function. This is called polymorphism.

  

Overriding Behaviour In Blueprints
----------------------------------

Once this is all implemented, the classes that you have set up with the interface in C++ will have its interface functions appear with the blueprint's variables and other functions.

[![InterfaceBP1.png](https://d26ilriwvtzlb.cloudfront.net/7/7b/InterfaceBP1.png)](/index.php?title=File:InterfaceBP1.png)

[![InterfaceBP2.png](https://d26ilriwvtzlb.cloudfront.net/6/6a/InterfaceBP2.png)](/index.php?title=File:InterfaceBP2.png)

  
Again, your function **must** have a return value for it to appear in this list, otherwise it is considered an event and cannot be overridden as a function. You can however use the event from the interface in blueprint's event graph and override it that way.

Summary
-------

You can trigger global events that only certain actors will respond to  

Each actor can respond to an event in their own unique way.

While it's a little bit more complicated of a setup it helps keeping the code _very_ simple and is much more performance friendly than casting to multiple different types of classes!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))  
[HuntaKiller](/index.php?title=User:HuntaKiller&action=edit&redlink=1 "User:HuntaKiller (page does not exist)")  
[Darkgaze](/index.php?title=User:Darkgaze&action=edit&redlink=1 "User:Darkgaze (page does not exist)")  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Interfaces\_in\_C%2B%2B&oldid=51](https://wiki.unrealengine.com/index.php?title=Interfaces_in_C%2B%2B&oldid=51)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")