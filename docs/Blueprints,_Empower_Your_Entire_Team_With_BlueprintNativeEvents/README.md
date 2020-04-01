 Blueprints, Empower Your Entire Team With BlueprintNativeEvents - Epic Wiki             

 

Blueprints, Empower Your Entire Team With BlueprintNativeEvents
===============================================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 .h](#.h)
    *   [1.2 .cpp](#.cpp)
*   [2 \_Implementation](#Implementation)
*   [3 In The Editor](#In_The_Editor)
*   [4 Adding Call To Parent Function](#Adding_Call_To_Parent_Function)
*   [5 Complete Override](#Complete_Override)
*   [6 Overloaded Function not found...](#Overloaded_Function_not_found...)
*   [7 Conclusion](#Conclusion)

Overview
--------

_Original Author:_ [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Dear Community,

BlueprintNativeEvents are distinct from [BlueprintImplementableEvents](/index.php?title=Blueprints,_Empower_Your_Entire_Team_With_BlueprintImplementableEvent "Blueprints, Empower Your Entire Team With BlueprintImplementableEvent") because a BlueprintNativeEvent can have a C++ implementation!

A primary example is the GameMode class, which has many important BlueprintNativeEvents like

 UFUNCTION(BlueprintNativeEvent, BlueprintCallable, Category="Game")
 APawn\* SpawnDefaultPawnFor(AController\* NewPlayer, class AActor\* StartSpot);

and

 UFUNCTION(BlueprintNativeEvent, BlueprintCallable, Category="Game")
 class AActor\* FindPlayerStart( AController\* Player, const FString& IncomingName = TEXT("") );

These core functions that define how a UE4 game can even get started obviously need a C++ implementation, but what if a Blueprint-Only project wants to override this functionality?

Or what if you have BP-only teammates who want to override the functionality of your C++ functions?

This is where BlueprintNativeEvents shine!

### .h

//Override in BP to extend the base C++ functionality!
UFUNCTION(BlueprintNativeEvent, BlueprintCallable, Category\="JoyBall")
float GetArmorRating() const;

### .cpp

float AJoyBall::GetArmorRating\_Implementation() const
{
	//remember to call super / parent function in BP!
	V\_LOG("C++ Happens First");
	return 100;
}

\_Implementation
----------------

Please duly note that you do not have to declare the function signature GetArmorRating\_Implementation() in the .h file!

UE4 generates the declaration for you and you can simply write your cpp function body!

In The Editor
-------------

[![NativeEventImplinBP.jpg](https://d26ilriwvtzlb.cloudfront.net/7/71/NativeEventImplinBP.jpg)](/index.php?title=File:NativeEventImplinBP.jpg)

Click on Override to see a list of all overrideable BP Native events and add yours to your blueprint graph for your c++ class!

[![BPNative2.jpg](https://d3ar1piqh1oeli.cloudfront.net/5/55/BPNative2.jpg/900px-BPNative2.jpg)](/index.php?title=File:BPNative2.jpg)

Adding Call To Parent Function
------------------------------

You must ensure that your teammates understand they have to right click on the function node and choose "Add Call To Parent Function" to cause your C++ implementation to run properly :) This is also essential if they are adding to output values that you calculate in C++

**In my example above, what I see in the log is the correct value of 150!**

100 comes from C++, and 50 gets added to that via call to parent function in BP !

Complete Override
-----------------

Of course if you want to completely override behavior of C++ versions of BP Native Events, you would not call super in BP for that function :)

Overloaded Function not found...
--------------------------------

If you are getting a strange compile error involving overloaded functions and you know the signatures match between .h and your \_Implementation, then it means UE4 generated a function parameter list for the \_Implementation that does not match what you supplied in the .h

For example:

 void SetMenu(FString Title)

will be generated as

 void SetMenu(const FString& Title)

and thus you will get a compile error until you change your .h to be:

 void SetMenu(const FString& Title)

♥ Rama

Conclusion
----------

Using BP Native Events you can offer your teammates powerful C++ tools that can be directly extended in blueprints!

Enjoy!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprints,\_Empower\_Your\_Entire\_Team\_With\_BlueprintNativeEvents&oldid=363](https://wiki.unrealengine.com/index.php?title=Blueprints,_Empower_Your_Entire_Team_With_BlueprintNativeEvents&oldid=363)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")