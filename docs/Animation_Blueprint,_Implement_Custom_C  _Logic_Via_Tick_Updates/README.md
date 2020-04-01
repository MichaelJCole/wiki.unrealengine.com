Animation Blueprint, Implement Custom C++ Logic Via Tick Updates - Epic Wiki              

Animation Blueprint, Implement Custom C++ Logic Via Tick Updates
================================================================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Example: An Anim-BP-Accessible Variable: IsMoving](#Example:_An_Anim-BP-Accessible_Variable:_IsMoving)
    *   [2.1 .h](#.h)
    *   [2.2 .cpp](#.cpp)
*   [3 Final Step: Reparenting your Character's Anim Blueprint](#Final_Step:_Reparenting_your_Character.27s_Anim_Blueprint)
*   [4 Conclusion](#Conclusion)

Overview
--------

Dear Community,

Extending AnimInstance is a wonderful way to create all sorts of custom animation systems and also efficiently utilize the existing UE4 anim blueprint functions.

It's very useful to know how you can do certain actions when the Anim Instance for a Character is first created, and how to do actions every tick while the anim instance exists!

Below are the two Anim Instance functions that are similar to PostInitializeComponents and Tick(DeltaTime) for Actors

virtual void NativeInitializeAnimation() OVERRIDE; 
 
virtual void NativeUpdateAnimation(float DeltaTimeX) OVERRIDE;

Example: An Anim-BP-Accessible Variable: IsMoving
-------------------------------------------------

Here is a complete example that obtains the Owning Pawn in the Init function (to avoid reobtaining the reference every tick).

Then, every tick / moment of the anim instance's existance, the boolean variable IsMoving is updated to reflect the velocity of the Owning pawn.

IsMoving can now be obtained from within the Anim Blueprint because of its UPROPERTY settings, and used in your animation blueprint logic.

Enjoy!

  

### .h

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#pragma once
 
#include "VictoryAnimInstance.generated.h"
 
UCLASS(transient, Blueprintable, hideCategories\=AnimInstance, BlueprintType)
class UVictoryAnimInstance : public UAnimInstance
{
	GENERATED\_UCLASS\_BODY()
 
        /\*\* Is Moving \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Movement)
	bool IsMoving;
 
//socket names
public:
 
	//example of property that can be set in constructor
        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=SocketNames)
	FName HeadSocket;
 
//init and tick
public:
 
	APawn \* OwningPawn;
 
	virtual void NativeInitializeAnimation() OVERRIDE;
 
	virtual void NativeUpdateAnimation(float DeltaTimeX) OVERRIDE;
 
};

### .cpp

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
#include "VictoryGame.h"
 
//////////////////////////////////////////////////////////////////////////
// UVictoryAnimInstance
 
UVictoryAnimInstance::UVictoryAnimInstance(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
 
	//can set this here because it does not depend on other objects
	HeadSocket \= FName(TEXT("Head"));
}
 
//Init
void UVictoryAnimInstance::NativeInitializeAnimation()
{
	//Very Important Line
	Super::NativeInitializeAnimation();
 
	//Has to be set in KismetInit because it depends on the Owning Actor 
	//to have already been constructed
 
	//So this function is like PostInitAnimtree in UE3
 
	OwningPawn \= TryGetPawnOwner();
}
 
//Tick
void UVictoryAnimInstance::NativeUpdateAnimation(float DeltaTimeX)
{
	//Very Important Line
	Super::NativeUpdateAnimation(DeltaTimeX);
 
	//Always Check Pointers
	if (!OwningPawn) return;
	//~~
 
	if (OwningPawn\-\>GetVelocity().SizeSquared() \> 25) IsMoving \= true;
	else IsMoving \= false;
}

Final Step: Reparenting your Character's Anim Blueprint
-------------------------------------------------------

You need to make sure your Character is using your extended version of AnimInstance :)

For more information on reparenting Anim BPs, and making custom Animation Blueprint classes, see this code sample:

**[Animation Blueprints, Custom C++ Variables](/Animation_Blueprint,_Set_Custom_Variables_Via_C%2B%2B "Animation Blueprint, Set Custom Variables Via C++")**

[![Reparentbp.jpg](https://d3ar1piqh1oeli.cloudfront.net/e/e2/Reparentbp.jpg/637px-Reparentbp.jpg)](/File:Reparentbp.jpg)

Conclusion
----------

Now you know what functions to override to create complicated Anim Blueprint logic with assistance from the C++ code,

or run your anim instance mostly from the C++ code (especially the event graph part)!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Animation\_Blueprint,\_Implement\_Custom\_C%2B%2B\_Logic\_Via\_Tick\_Updates&oldid=3395](https://wiki.unrealengine.com/index.php?title=Animation_Blueprint,_Implement_Custom_C%2B%2B_Logic_Via_Tick_Updates&oldid=3395)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")