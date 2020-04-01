Applying Service Locator Pattern to UE4 - Epic Wiki                    

Applying Service Locator Pattern to UE4
=======================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 What Is a Service Locator](#What_Is_a_Service_Locator)
*   [3 Where is it useful in UE4](#Where_is_it_useful_in_UE4)
*   [4 Implementation](#Implementation)
    *   [4.1 Creating the Service Locator class](#Creating_the_Service_Locator_class)
        *   [4.1.1 ServiceLocator.h](#ServiceLocator.h)
        *   [4.1.2 ServiceLocator.cpp](#ServiceLocator.cpp)
    *   [4.2 Instantiation](#Instantiation)
        *   [4.2.1 .h](#.h)
        *   [4.2.2 .cpp](#.cpp)
    *   [4.3 Supporting a Service](#Supporting_a_Service)
        *   [4.3.1 ServiceLocator.h](#ServiceLocator.h_2)
        *   [4.3.2 ServiceLocator.cpp](#ServiceLocator.cpp_2)
    *   [4.4 Usage](#Usage)
        *   [4.4.1 Setting](#Setting)
        *   [4.4.2 Getting](#Getting)
*   [5 Summary](#Summary)

Overview
--------

This article draws heavily from Bob Nystrom's website and book [Game Programming Patterns](http://gameprogrammingpatterns.com) and more specifically the chapter on [Service Locators](http://gameprogrammingpatterns.com/service-locator.html). I simply describe how to implement the simplest form of this pattern with a few UE4 considerations.

What Is a Service Locator
-------------------------

The [Service Locator](http://gameprogrammingpatterns.com/service-locator.html) pattern is a substitution and extension on a traditional Singleton Pattern. It contains static references to single instances of a several classes. Unlike a Singleton, the static reference resides outside of its class, existing in a kind of "middle man" class. This allows the reference to change at runtime while still allowing global access. It collects all static references into one place so that they're more easily managed by the programmer.

Where is it useful in UE4
-------------------------

Just like Singletons, this pattern should be used sparingly. I found Singletons in UE4 had their own dangers when implemented incorrectly. Static class instances don't support UPROPERTY and therefor it can't be guaranteed that the object wouldn't be garbage collected and disappear. This can be worked around by adding a non-static reference within the the instance to "hold" onto the object. However, I found it easier to consolidate this workaround into a single Service Locator instead of littering potentially unused variables around different classes.

Implementation
--------------

### Creating the Service Locator class

Create an empty class like the one described below. Personally I keep it within its own "servicelocator" namespace. Notice how there is a static "Instance" variable, this is used by the static methods within the Service Locator later on to keep provided services in memory via UPROPERTY.

The Service Locator must extend UObject if the instances it stores are going to be properly managed by UE4.

Replace <YourProject> with the header of your game.

#### ServiceLocator.h

#pragma once
#include "ServiceLocator.generated.h"
 
UCLASS()
class UServiceLocator : public UObject
{
	GENERATED\_BODY()
 
public:
	UServiceLocator(const FObjectInitializer& ObjectInitializer);
private:
	static UServiceLocator\* Instance;
};

#### ServiceLocator.cpp

#include "<YourProject>.h"
#include "ServiceLocator.h"
 
UServiceLocator\* UServiceLocator::Instance;
 
UServiceLocator::UServiceLocator(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
	UServiceLocator::Instance \= this;
}

### Instantiation

The Service Locator must be created before any services are provided. I use a custom UGameInstance class and the overrided function Init(). This can be placed anywhere, as long as it's before any usage of the Service Locator and must be kept in memory for as long as you want to be able to access the services.

#### .h

private:
	//Holds the ServiceLocator in memory for the duration of the game using UPROPERTY
	UPROPERTY()
	UServiceLocator\* ServiceLocator;

#### .cpp

//Create an instance of the ServiceLocator and hold it in memory
ServiceLocator \= ConstructObject<UServiceLocator\>(UServiceLocator::StaticClass());

### Supporting a Service

Following Bob Nystrom's example lets say we have a fictional Audio service that needs to be called from multiple different points across the game. Add static methods and reference for any services you wish to provide.

Note that there is a static and non-static copy of the service. The non-static copy is used by UE4's reflection system and UPROPERTY, this is what keeps the object's memory managed.

#### ServiceLocator.h

#pragma once
#include "ServiceLocator.generated.h"
 
UCLASS()
class UServiceLocator : public UObject
{
	GENERATED\_BODY()
 
public:
	UServiceLocator(const FObjectInitializer& ObjectInitializer);
 
	static UAudio\* GetAudio() { return AudioService\_; }
 
	static void ProvideAudio(UAudio\* service)
	{
		AudioService\_ \= service;
		Instance\-\>AudioService \= service;
	}
private:
	static UServiceLocator\* Instance;
 
	// Static References
	static UAudio\* AudioService\_;
 
	// UE4 UProperty references in the instance, used to maintain memory management and are otherwise unused.
	UPROPERTY()
	UAudio\* AudioService;
};

#### ServiceLocator.cpp

#include "<YourProject>.h"
#include "ServiceLocator.h"
 
UServiceLocator\* UServiceLocator::Instance;
 
UAudio\* UServiceLocator::AudioService\_;
 
UServiceLocator::UServiceLocator(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
	UServiceLocator::Instance \= this;
}

There must be an implementation of AudioService\_ in the .cpp file to avoid compiler errors.

### Usage

#### Setting

To set the service to be retrieved later create the UObject with UE4's ConstructObject functionality and pass it to the Service Locator.

UAudio\* AudioService \= ConstructObject<UAudio\>(UAudio::StaticClass());
UServiceLocator::ProvideAudio(AudioService);

#### Getting

To retrieve the service simply call the UServiceLocator from anywhere!

UServiceLocator::GetAudio()

Summary
-------

Sometimes it's appropriate to use static references to different parts of your game. This application allows for flexibility and contains all of the static references for your module in one location. Used lightly it can empower and simplify your code, but if your Service Locator is managing an increasing list of services that may be a warning sign to rethink a few things.

Enjoy and good luck!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Applying\_Service\_Locator\_Pattern\_to\_UE4&oldid=12826](https://wiki.unrealengine.com/index.php?title=Applying_Service_Locator_Pattern_to_UE4&oldid=12826)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)