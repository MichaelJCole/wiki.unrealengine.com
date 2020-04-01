 Delegates In UE4, Raw Cpp and BP Exposed - Epic Wiki             

 

Delegates In UE4, Raw Cpp and BP Exposed
========================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Steps](#Steps)
    *   [2.1 Signature](#Signature)
    *   [2.2 Calling the Delegate](#Calling_the_Delegate)
        *   [2.2.1 .h](#.h)
        *   [2.2.2 .cpp](#.cpp)
    *   [2.3 Responding to the Delegate](#Responding_to_the_Delegate)
*   [3 UFUNCTION()  !](#UFUNCTION.28.29_.21)
*   [4 Binding To The Delegate](#Binding_To_The_Delegate)
    *   [4.1 Dynamic Delegates](#Dynamic_Delegates)
    *   [4.2 Multicast Delegates](#Multicast_Delegates)
    *   [4.3 Non Multicast](#Non_Multicast)
*   [5 Raw C++ Class Instances](#Raw_C.2B.2B_Class_Instances)
*   [6 Slate Class Instances](#Slate_Class_Instances)
*   [7 Binding is Per-Instance](#Binding_is_Per-Instance)
*   [8 BP-Friendly Delegates](#BP-Friendly_Delegates)
*   [9 Level Blueprint Friendly Delegates](#Level_Blueprint_Friendly_Delegates)
*   [10 Video Example](#Video_Example)
*   [11 Further Reading](#Further_Reading)
*   [12 DYNAMIC\_MULTICAST And Other Types](#DYNAMIC_MULTICAST_And_Other_Types)
*   [13 Conclusion](#Conclusion)

Overview
--------

Original Author: [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

In this wiki I share with you the core code that you need to implement for a variety of delegates in UE4!

A delegate is basically an event that you can define and call and respond to.

Every time the event is fired off, anyone who is listening for this event will receive it and be able to take appropriate action.

In the case of **multicast** delegates, any number of entities within your code base can respond to the same event and receive the inputs and use them.

In the case of **dynamic** delegates, the delegate can be saved/loaded within a Blueprint graph (they're called Events/Event Dispatcher in BP).

For my example I will be using exclusively DYNAMIC\_MULTICAST which is the type that is most useful in Blueprints :)

  

Steps
-----

#### Signature

You create the signature of the delegate, which declares what inputs any receiving functions should specify.

//RamaMeleeWeapon class .h

DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_SixParams( FRamaMeleeHitSignature, class AActor\*, HitActor, class UPrimitiveComponent\*, HitComponent, const FVector&, ImpactPoint, const FVector&, ImpactNormal, FName, HitBoneName, const struct FHitResult&, HitResult );

Notice the macro declares that I will be adding 6 parameters, there are similar macros for other quantities of parameters :)

 DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_SixParams

#### Calling the Delegate

You call the delegate within the class structure where it was defined, making sure to only execute it if it is currently bound, meaning at least 1 entity is listening for this delegate / event.

##### .h

//.h
//RamaMeleeWeapon class .h

//This should be in the class which calls the delegate, and where the signature was defined
//This is an instance of the signature that was defined above!
FRamaMeleeHitSignature RamaMeleeWeapon\_OnHit;

##### .cpp

//.cpp
//Only the code that is supposed to initiate the event calls Broadcast()
if(RamaMeleeWeapon\_OnHit.IsBound()) //<~~~~
{
	RamaMeleeWeapon\_OnHit.Broadcast(Hit.GetActor(), Hit.GetComponent(), Hit.ImpactPoint, Hit.ImpactNormal, Hit.BoneName, Hit);
}

Comment from [Darkgaze](/index.php?title=User:Darkgaze&action=edit&redlink=1 "User:Darkgaze (page does not exist)"): As the official [Multicast docs](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Delegates/Multicast/index.html) say:

_(...)It is always safe to call Broadcast() on a multi-cast delegate, even if nothing is bound. The only time you need to be careful is if you are using a delegate to initialize output variables, which is generally very bad to do.(...)_

So calling InBound() is not necessary. Only in Single-cast delegates.

#### Responding to the Delegate

Anywhere you want, you can declare functions which receive the parameters by type and name specified in the delegate signature.

//Any class can add a function that uses the delegate signature and responds to the Broadcast() event 
UFUNCTION()
void RespondToMeleeDamageTaken(AActor\* HitActor, UPrimitiveComponent\* HitComponent, const FVector& ImpactPoint, const FVector& ImpactNormal, FName HitBoneName, const FHitResult& HitResult)

See below to learn how to bind the delegate instance to this function or any number of functions that are present in class instances anywhere in your code base!

UFUNCTION()  !
--------------

Please note that functions that are responding to delegate broadcasts should be UFUNCTION()!

If your delegate Broadcast stalls the game for a bit and then doesnt work, it's because you did not make one of your receiving functions a UFUNCTION()

<3 Rama

Binding To The Delegate
-----------------------

### Dynamic Delegates

RamaMeleeWeaponComp\->RamaMeleeWeapon\_OnHit.AddDynamic(this, &USomeClass::RespondToMeleeDamageTaken); //see above in wiki

### Multicast Delegates

Binding to non-dynamic requires this syntax:

RamaMeleeWeaponComp\->RamaMeleeWeapon\_OnHit.AddUObject(this, &USomeClass::RespondToMeleeDamageTaken); //see above in wiki

[https://docs.unrealengine.com/en-us/Programming/UnrealArchitecture/Delegates/Multicast](https://docs.unrealengine.com/en-us/Programming/UnrealArchitecture/Delegates/Multicast)

### Non Multicast

Binding a UObject to a non-dynamic, non-multicast delegate requires you to use the following syntax.

//in some class cpp file

RamaMeleeWeaponComp\->RamaMeleeWeapon\_OnHit.BindUObject(this, &USomeClass::RespondToMeleeDamageTaken); //see above in wiki

You need to access the delegate where it is stored, in my case this is the RamaMeleeWeaponComponent

The idea is you are telling the delegate instance that it is getting a new binding, to this SomeClass insance, which is why you include the _this_ pointer.

So this code appears where you want to add the binding to the event/delegate, but it must refer to the one signature instance present in the original class instance.

So basically this delegate binding is **an agreement between two instances**, where one instance is of the class that declares and implements the delegate, and the other instance is any ole' class that has declared the function signature to match the delegate signature.

There's nothing abstract here, everything is instances, so you must bind your object instance to the delegate signature instance that is part of the instance of the class that is going to fire off the broadcasting.

This is why I have a pointer to RamaMeleeWeaponComp->RamaMeleeWeapon\_OnHit, and I am **also** including the _this_ pointer so that the signature knows about the calling object instance.

The reason it is a _this_ pointer is because the code above is run in the object that wants to bind to the delegate, so _this_ is a self-referencing pointer to the UObject we are binding to the delegate.

Raw C++ Class Instances
-----------------------

Raw delegates are used with non UObject classes, like plugin modules.

RamaMeleeWeaponComp\->RamaMeleeWeapon\_OnHit.BindRaw(this, &FSomeRawCPPClass::RespondToMeleeDamageTaken);

Slate Class Instances
---------------------

Slate delegates use this syntax:

RamaMeleeWeaponComp\->RamaMeleeWeapon\_OnHit.CreateSP(this, &SSomeSlateClass::RespondToMeleeDamageTaken);

Binding is Per-Instance
-----------------------

Please note that when you bind to the delegate this is a per-instance process! That is why you need to include the _this_ pointer, because whichever instance you are calling the code in, it is that particular instance whose function will get called when the delegate is broadcasted.

This means you can choose to have only certain instances of a uobject respond to a delegate, or choose to bind or unbind at any time!

BP-Friendly Delegates
---------------------

A BP friendly delegate requires this additional .h code to expose the delegate to Blueprints.

//RamaMeleeWeapon.h

UPROPERTY(BlueprintAssignable, Category\="Rama Melee Weapon")
FRamaMeleeHitSignature RamaMeleeWeapon\_OnHit;

BP-friendly Delegates should be DYNAMIC\_MULTICAST so they can be serialized (saved/loaded) with the BP graph.

Level Blueprint Friendly Delegates
----------------------------------

When you've made BP-friendly delegates on objects that you can place in the level, you can simply right click on the object instance in your level -> Add Event and see your new delegate! So nice!

This is an additional benefit of using DYNAMIC\_MULTICAST delegates! Multi-cast implies binding multiple of various object instances to the delegate and then firing off the event to everyone from a single .Broadcast, which can include your Level Blueprint as a recipient/listener!

Video Example
-------------

Here is a video on how a C++ delegate created in an actor component in C++ looks and is called in Blueprints!

The code in this wiki and this video are from my [Melee Weapon Plugin](http://ue4code.com/melee_weapon_system_plugin_per_bone_collision_accuracy)

<youtube>[http://www.youtube.com/watch?v=aufEB4TCf30&t=5m24s](http://www.youtube.com/watch?v=aufEB4TCf30&t=5m24s)</youtube>

[Skip to 5:24](http://www.youtube.com/watch?v=aufEB4TCf30&t=5m24s)

Further Reading
---------------

Epic Documentation: [https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Delegates/](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Delegates/)

DYNAMIC\_MULTICAST And Other Types
----------------------------------

There are other delegate types besides DYNAMIC\_MULTICAST that are not quite as versatile when it comes to Blueprints.

Check out the source code of Delegate.h

 Runtime/Core/Public/Delegates/Delegate.h

For a detailed explanation!

Sample from this file:

\*\*
 \*  C++ DELEGATES
 \*  \-----------------------------------------------------------------------------------------------
 \*
 \*	This system allows you to call member functions on C++ objects in a generic, yet type\-safe way.
 \*  Using delegates, you can dynamically bind to a member function of an arbitrary object,
 \*	then call functions on the object, even if the caller doesn't know the object's type.
 \*
 \*	The system predefines various combinations of generic function signatures with which you can
 \*	declare a delegate type from, filling in the type names for return value and parameters with
 \*	whichever types you need.
 \*
 \*	Both single\-cast and multi\-cast delegates are supported, as well as "dynamic" delegates which
 \*	can be safely serialized to disk.  Additionally, delegates may define "payload" data which
 \*	will stored and passed directly to bound functions.

Conclusion
----------

Enjoy using delegates in UE4 so that any part of your code base can respond to an event triggered by one section of your code!

Also enjoy exposing delegates via C++ for the rest of your team to use in Blueprints!

Enjoooy!

♥

Rama

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Delegates\_In\_UE4,\_Raw\_Cpp\_and\_BP\_Exposed&oldid=181](https://wiki.unrealengine.com/index.php?title=Delegates_In_UE4,_Raw_Cpp_and_BP_Exposed&oldid=181)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")