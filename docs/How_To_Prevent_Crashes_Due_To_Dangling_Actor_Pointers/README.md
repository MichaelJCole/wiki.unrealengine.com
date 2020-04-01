How To Prevent Crashes Due To Dangling Actor Pointers - Epic Wiki                    

How To Prevent Crashes Due To Dangling Actor Pointers
=====================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 UPROPERTY() UObjects Clear References Properly](#UPROPERTY.28.29_UObjects_Clear_References_Properly)
*   [3 TWeakObjectPtr](#TWeakObjectPtr)
*   [4 Conclusion](#Conclusion)

Overview
--------

**Author** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

While working on [Abatron](http://www.abatrongame.com/), an RTS/FPS hybrid game with tons of character units to keep track of, I created a lot of arrays of Actors:

TArray<AActor\*\> UnitArray;

During multiplayer testing especially, stale / dangling AActor pointers were causing a lot of crashes!

The problem with stale pointers is that just checking ActorPtr != nullptr is not enough, a stale pointer will return true but wont actually still be pointing to a valid AActor, which is what causes the crash.

UPROPERTY() UObjects Clear References Properly
----------------------------------------------

A less-advertised feature of UObject pointers that are made UPROPERTY() is that they are properly updated to NULL when the object is destroyed, unlike raw pointers like I was using above.

Automatic Updating of UObject References [https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Objects/Optimizations/index.html#automaticupdatingofreferences](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Objects/Optimizations/index.html#automaticupdatingofreferences)

So the **simple solution** if you are having issues with dangling / stale actor pointers is to make sure all AActor pointers are marked with UPROPERTY().

UPROPERTY() //<~~~ That's it! This now makes the pointers much more stable! -Rama
TArray<AActor\*\> UnitArray;

TWeakObjectPtr
--------------

For UObjects especially, having lots of UPROPERTY() references to them can prevent them from getting [garbage collected](https://wiki.unrealengine.com/Garbage_Collection_%26_Dynamic_Memory_Allocation) properly. For this situation you can use TWeakObjectPtr which will still give you additional validity option using IsValid() but will not prevent GC from running.

Conclusion
----------

If you are encountering AActor\* pointers that are going stale and crashing your game, make sure they are marked with UPROPERTY() and you will be taking advantage of a rather essential feature of UObjects in UE4, which is that all UPROPERTY() references get updated to NULL when a UObject is destroyed.

Have fun today!

Rama

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_To\_Prevent\_Crashes\_Due\_To\_Dangling\_Actor\_Pointers&oldid=22575](https://wiki.unrealengine.com/index.php?title=How_To_Prevent_Crashes_Due_To_Dangling_Actor_Pointers&oldid=22575)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)