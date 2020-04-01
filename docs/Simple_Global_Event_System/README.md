Simple Global Event System - Epic Wiki                    

Simple Global Event System
==========================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.7

Contents
--------

*   [1 Overview](#Overview)
*   [2 The Event Handler Component](#The_Event_Handler_Component)
    *   [2.1 GlobalEventHandler.h](#GlobalEventHandler.h)
*   [3 Broadcasting Events](#Broadcasting_Events)
*   [4 Listening To Events From Code](#Listening_To_Events_From_Code)
*   [5 Listening To Events From Blueprints](#Listening_To_Events_From_Blueprints)

Overview
--------

Often times it is required to have your various gameplay elements be able to communicate without hard-linking between each other. For this purpose, a globally accessible event handler where objects can listen to and fire various events is perfectly suited.

The Event Handler Component
---------------------------

We're going to start off by creating the Event Handler component, like this:

### GlobalEventHandler.h

#pragma once
 
#include "GlobalEventHandler.generated.h"
 
DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_OneParam(FLevelEventDelegate\_OnLevelComplete , uint8, LevelIndex);
 
DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_TwoParams(FCurrencyEventDelegate\_OnGoldAmountChanged, int32, OldAmount, int32, NewAmount);
 
UCLASS(meta \= (BlueprintSpawnableComponent), Category \= "Global Events")
class UGlobalEventHandler : public UActorComponent
{
	GENERATED\_UCLASS\_BODY()
 
public:
	void InitializeComponent() override;
 
 
	UPROPERTY(BlueprintAssignable, BlueprintCallable, Category \= "Level Events")
	FLevelEventDelegate\_OnLevelComplete OnLevelComplete;
 
	UPROPERTY(BlueprintAssignable, BlueprintCallable, Category \= "Currency Events")
	FCurrencyEventDelegate\_OnGoldAmountChanged OnGoldAmountChanged;
 
};

A couple of things to note in the code above. Most importantly, the DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE macro. This is used to define your custom events. There are various versions of it (OneParam, TwoParams, ThreeParams etc.) but they all follow the same pattern. An important thing to note is that when defining your parameters, unlike with normal functions, there is a semicolon between the type and the parameter name.

Defining the delegate is not enough though, your event handler needs to have a property of the delegate's type, with the BlueprintAssignable and BlueprintCallable specifiers if you want to assign and broadcast the events from blueprints respectively.

This event handler can now be placed on any actor that needs to listen and dispatch events. The best thing to place this to make sure your game objects have access to it is the GameSingleton object. If you are not familiar with the Unreal Engine singleton you can read up on them [here](/Global_Data_Access,_Data_Storage_Class_Accessible_From_Any_CPP_or_BP_Class_During_Runtime "Global Data Access, Data Storage Class Accessible From Any CPP or BP Class During Runtime").

Broadcasting Events
-------------------

Broadcasting events can be done via code or blueprint, although the latter requires the delegate to have the BlueprintCallable specifier. Both of them involve getting the Event Handler component from wherever you've ended up putting it and calling Broadcast on the delegate you want, as such:

EventHandlerComponent\-\>OnLevelComplete.Broadcast(LevelIndex);

Listening To Events From Code
-----------------------------

Listening to events from code is equally easy. Once again you have to access the component and the delegate you want and add your event handler, as such:

EventHandlerComponent\-\>OnLevelComplete.AddDynamic(this, &MyListenerClass::OnLevelCompleteHandler);

Note that the function that handles the event has to have the same signature as the delegate itself.

Listening To Events From Blueprints
-----------------------------------

As mentioned above, your event properties in your listener component need to have the BlueprintAssignable specifier for this to be possible. Once you have that, you will be able to call the "Assign to EventName" command in your graph, like this:

[![Assign event blueprint.jpg](https://d26ilriwvtzlb.cloudfront.net/6/6d/Assign_event_blueprint.jpg)](/File:Assign_event_blueprint.jpg)

[![Assign event blueprint2.jpg](https://d26ilriwvtzlb.cloudfront.net/b/b5/Assign_event_blueprint2.jpg)](/File:Assign_event_blueprint2.jpg)

It is important to note that after assigning an event (or function from code) to a delegate you need to remove it on the object's EndPlay even (or again, function if you're doing it from code). You do this by calling RemoveDynamic() or Unbind on the delegate.

Hopefully this is enough to get you going on creating your own global event system, enjoy!

[DamirH](/index.php?title=User:DamirH&action=edit&redlink=1 "User:DamirH (page does not exist)") ([talk](/index.php?title=User_talk:DamirH&action=edit&redlink=1 "User talk:DamirH (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Simple\_Global\_Event\_System&oldid=23277](https://wiki.unrealengine.com/index.php?title=Simple_Global_Event_System&oldid=23277)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Code](/Category:Code "Category:Code")
*   [Community](/index.php?title=Category:Community&action=edit&redlink=1 "Category:Community (page does not exist)")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)