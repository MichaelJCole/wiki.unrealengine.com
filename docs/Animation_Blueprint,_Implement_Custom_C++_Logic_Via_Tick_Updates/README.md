Animation Blueprint, Implement Custom C++ Logic Via Tick Updates - Epic Wiki                    

Animation Blueprint, Implement Custom C++ Logic Via Tick Updates
================================================================

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

/\*
  By Rama
\*/
 
#pragma once
 
#include "VictoryAnimInstance.generated.h"
 
UCLASS(transient, Blueprintable, hideCategories\=AnimInstance, BlueprintType)
class UVictoryAnimInstance : public UAnimInstance
{
	GENERATED\_BODY()
public:
        /\*\* Is Moving \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Movement)
	bool IsMoving;
 
//init and tick
public:
 
	APawn \* OwningPawn;
 
	virtual void NativeInitializeAnimation() override;
 
	virtual void NativeUpdateAnimation(float DeltaTimeX) override;
 
};

### .cpp

#include "VictoryGame.h"
#include "VictoryAnimInstance.h"
 
//////////////////////////////////////////////////////////////////////////
// UVictoryAnimInstance
 
//This function is like PostInitAnimtree in UE3
void UVictoryAnimInstance::NativeInitializeAnimation()
{
	//Very Important Line
	Super::NativeInitializeAnimation();
 
	//Cache the owning pawn for use in Tick
	OwningPawn \= TryGetPawnOwner();
}
 
//Tick
void UVictoryAnimInstance::NativeUpdateAnimation(float DeltaTimeX)
{
	//Very Important Line
	Super::NativeUpdateAnimation(DeltaTimeX);
 
	//Always Check Pointers
	if (!OwningPawn) 
        {
          return;
        }
 
	//Set whether moving or not
	IsMoving \= (OwningPawn\-\>GetVelocity().SizeSquared() \> 25);
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

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Animation\_Blueprint,\_Implement\_Custom\_C%2B%2B\_Logic\_Via\_Tick\_Updates&oldid=14417](https://wiki.unrealengine.com/index.php?title=Animation_Blueprint,_Implement_Custom_C%2B%2B_Logic_Via_Tick_Updates&oldid=14417)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)