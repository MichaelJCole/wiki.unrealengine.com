Custom Character Actions Using Montages - Epic Wiki                    

Custom Character Actions Using Montages
=======================================

**Rate this Tutorial:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.11

Contents
--------

*   [1 Overview](#Overview)
*   [2 C++ Code Portion](#C.2B.2B_Code_Portion)
    *   [2.1 First Steps](#First_Steps)
    *   [2.2 Custom ACharacter Subclass .h](#Custom_ACharacter_Subclass_.h)
    *   [2.3 Getting the FName of an Enum Value](#Getting_the_FName_of_an_Enum_Value)
    *   [2.4 Custom ACharacter .cpp](#Custom_ACharacter_.cpp)
    *   [2.5 Calling the Event from C++](#Calling_the_Event_from_C.2B.2B)
*   [3 Animation Montage Portion](#Animation_Montage_Portion)
*   [4 Anim Instance Portion](#Anim_Instance_Portion)
    *   [4.1 Event Graph](#Event_Graph)
    *   [4.2 Binding the Event](#Binding_the_Event)
*   [5 That's it!](#That.27s_it.21)

Overview
--------

This tutorial shows a method of using animation montages to run custom actions for your characters. Typical usages for this would be as follows:

*   Part of a combat system - making your character do a jump-attack where root motion is necessary
*   Character interacting with something - such as pulling a lever
*   Custom animation event trigger, for cinematic-like breaks in your game

This tutorial is aimed at intermediate users who have an understanding of animation montages and animation instances. Currently this tutorial is setup to be used from C++ code, however it is possible to do a similar setup in Blueprint, however that is not currently covered.

Root Motion and Animation Montages are not covered here, but you can find them in the UnrealEngine documentation:

Root motion is covered [here](https://docs.unrealengine.com/latest/INT/Engine/Animation/RootMotion/index.html)

Animation Montages are covered [here](https://docs.unrealengine.com/latest/INT/Engine/Animation/AnimMontage/index.html)

C++ Code Portion
----------------

### First Steps

Outside of your character class, but included or in the same file, you will want to make an enum that contains your custom actions:

UENUM(BlueprintType)
enum class EActions : uint8
{
	AC\_Climb			UMETA(DisplayName \= "Climb"),
	AC\_WallJump			UMETA(DisplayName \= "Wall Jump")
};

Then you will want a delegate that takes an EActions value:

DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_OneParam(FActionAnim, EActions, ActionUsed);

  

### Custom ACharacter Subclass .h

You will want to setup your custom ACharacter to contain the BlueprintAssignable UPROPERTY and BlueprintCallable UFUNCTION.

UCLASS()
class MYGAME\_API APlayer\_Character : public ACharacter
{
	GENERATED\_BODY()
 
 
public:
	UPROPERTY(BlueprintAssignable)
	FActionAnim UseAction;
 
	UFUNCTION(BlueprintCallable, meta \= (DisplayName \= "Use Action"), Category \= "Character|Animation")
	FName UseAction\_Implementation(EActions ActionUsed);
};

### Getting the FName of an Enum Value

Our AnimInstance will want to know which animation to play, so we need to give it the value as an FName.

This function is taken from Epic's Kismet Libraries. It can go anywhere as long as you #include it.

static FName GetEnumValueAsName(const UEnum\* Enum, uint8 EnumValue)
{
	if (Enum !\= NULL)
	{
		int32 EnumIndex \= Enum\-\>GetIndexByValue(EnumValue);
		return FName(\*Enum\-\>GetEnumText(EnumIndex).ToString());
	}
 
	return FName();
}

### Custom ACharacter .cpp

Place this in your custom character .cpp:

FName APlayer\_Character::UseAction\_Implementation(EActions ActionUsed)
{
	const UEnum\* EnumPtr \= FindObject<UEnum\>(ANY\_PACKAGE, TEXT("EActions"), true);
	return GetEnumValueAsName(EnumPtr, (uint8)ActionUsed);
}

### Calling the Event from C++

When you want to use an action, simply call:

UseAction.Broadcast(EActions::AC\_Climb);

  

Animation Montage Portion
-------------------------

Because we are using the FName of the Enum Value to call a Montage Section, we will want to setup our Animation Montage using Section names identical to the DisplayName set for the EActions Enum.

(Note: The method will return "Climb" rather than "AC\_Climb")

[![AnimMontage.png](https://d26ilriwvtzlb.cloudfront.net/e/ec/AnimMontage.png)](/File:AnimMontage.png)

Anim Instance Portion
---------------------

### Event Graph

Setup your event graph as follows, however we'll cover the "Custom Action Event" in the next section.

[![EventGraph.png](https://d26ilriwvtzlb.cloudfront.net/1/16/EventGraph.png)](/File:EventGraph.png)

### Binding the Event

This is where we bind the event and tell it what we want it to do when it's broadcast. You can get the correct context for "Bind Event to UseAction" and "Use Action" by dragging off the Character pin.

[![Action BindEvent.png](https://d26ilriwvtzlb.cloudfront.net/b/b6/Action_BindEvent.png)](/File:Action_BindEvent.png)

  

That's it!
----------

Remember earlier when we called UseAction.BroadCast(EActions::AC\_Climb) ? That's all you should have to do for it to play your custom animation.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Custom\_Character\_Actions\_Using\_Montages&oldid=21165](https://wiki.unrealengine.com/index.php?title=Custom_Character_Actions_Using_Montages&oldid=21165)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)