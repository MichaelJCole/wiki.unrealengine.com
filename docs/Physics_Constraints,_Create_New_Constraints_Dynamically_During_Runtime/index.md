Physics Constraints, Create New Constraints Dynamically During Runtime - Epic Wiki                    

Physics Constraints, Create New Constraints Dynamically During Runtime
======================================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Video of Dynamic Physics Constraints](#Video_of_Dynamic_Physics_Constraints)
*   [3 Video of Destructible Dynamic Physics Constraints](#Video_of_Destructible_Dynamic_Physics_Constraints)
*   [4 C++ for Making a Dynamic Physics Constraint](#C.2B.2B_for_Making_a_Dynamic_Physics_Constraint)
*   [5 My C++ Physics Constraint Library Functions](#My_C.2B.2B_Physics_Constraint_Library_Functions)
    *   [5.1 Free,Limited,Locked](#Free.2CLimited.2CLocked)
    *   [5.2 Example Usage](#Example_Usage)
    *   [5.3 My C++ Functions For You](#My_C.2B.2B_Functions_For_You)
*   [6 Conclusion](#Conclusion)

Overview
--------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

This is a tutorial on how to dynamically create Physics constraints during runtime!

See my videos below for examples of what you can do with dynamic physics constraints!

The focus of my videos is enabling a user of my In-game editor to make their own physics objects....**and then destroy them into dynamic physics pieces!**

Video of Dynamic Physics Constraints
------------------------------------

In this video I am showing how you can make composite physics shapes that will act as a coordinated larger physics constraint, and you can make this combinations dynamically during runtime from user input!

Video of Destructible Dynamic Physics Constraints
-------------------------------------------------

In this video I demonstrate dynamic setting and detaching of physics constraints to make a composite destructible shape that can be destroyed into partial subsections that act like physics sub objects of the original whole.

C++ for Making a Dynamic Physics Constraint
-------------------------------------------

void ASomeClass::CreateNewPhysicsConstraintBetween(AStaticMeshActor\* RootSMA, AStaticMeshActor\* TargetSMA)
{
	//set up the constraint instance with all the desired values
	FConstraintInstance ConstraintInstance;
 
	//set values here, see functions I am sharing with you below
	//UYourStaticLibrary::SetLinearLimits(ConstraintInstance, ...); //or make the functions below non static
	//UYourStaticLibrary::SetAngularLimits(ConstraintInstance, ...);
 
        //New Object
	UPhysicsConstraintComponent\* ConstraintComp \= NewObject<UPhysicsConstraintComponent\>(RootSMA);
	if(!ConstraintComp) 
        {
          //UE\_LOG constraint UObject could not be created!
          return;
        }
 
	//~~~~~~~~~~~~~~~~~~~~~~~~
	//Set Constraint Instance!
	ConstraintComp\-\>ConstraintInstance \= ConstraintInstance;
	//~~~~~~~~~~~~~~~~~~~~~~~~
 
	//Set World Location
	ConstraintComp\-\>SetWorldLocation(RootSMA\-\>GetActorLocation());
 
	//Attach to Root!
	ConstraintComp\-\>AttachTo(RootSMA\-\>GetRootComponent(), NAME\_None, EAttachLocation::KeepWorldPosition);
 
	//~~~ Init Constraint ~~~
	ConstraintComp\-\>SetConstrainedComponents(RootSMA\-\>StaticMeshComponent, NAME\_None, TargetSMA\-\>StaticMeshComponent,NAME\_None);
}

My C++ Physics Constraint Library Functions
-------------------------------------------

I've tested these and used them in the videos above!

### Free,Limited,Locked

For ease of use I just pass in bytes for the free, limited or locked enums.

 0 = Free
 1 = Limited
 2 = Locked

### Example Usage

//A new constraint instance!
FConstraintInstance ConstraintInstance;
 
//Set Angular Limits of Constraint that was just created
UYourStaticLibrary::SetAngularLimits( //or make functions below non static, put in .h
  ConstraintInstance,
  1, //swing 1 limited
  1, //swing 2 limited
  0, //twist is free
  60, //swing 1 angle limit
  30 //swing 2 angle limit 
  10 //twist limit (not used cause its free)
);

### My C++ Functions For You

static FORCEINLINE void SetLinearLimits(
	FConstraintInstance& Constraint,
	bool bDisableCollision,
	const uint8 XLim, const uint8 YLim, const uint8 ZLim,
	const float Size,
	bool SoftLimit\=true,
	const float SoftStiffness\=0,
	const float SoftDampening\=0
)
{
	//Collision
	Constraint.bDisableCollision \= bDisableCollision;
 
	switch (XLim)
	{
		case 0 : Constraint.LinearXMotion \= ELinearConstraintMotion::LCM\_Free; break;
		case 1 : Constraint.LinearXMotion \= ELinearConstraintMotion::LCM\_Limited; break;
		case 2 : Constraint.LinearXMotion \= ELinearConstraintMotion::LCM\_Locked; break;
	}
	switch (YLim)
	{
		case 0 : Constraint.LinearYMotion \= ELinearConstraintMotion::LCM\_Free; break;
		case 1 : Constraint.LinearYMotion \= ELinearConstraintMotion::LCM\_Limited; break;
		case 2 : Constraint.LinearYMotion \= ELinearConstraintMotion::LCM\_Locked; break;
	}
	switch (ZLim)
	{
		case 0 : Constraint.LinearZMotion \= ELinearConstraintMotion::LCM\_Free; break;
		case 1 : Constraint.LinearZMotion \= ELinearConstraintMotion::LCM\_Limited; break;
		case 2 : Constraint.LinearZMotion \= ELinearConstraintMotion::LCM\_Locked; break;
	}
	//~~~~~~~~~~
 
	Constraint.LinearLimitSize \= Size;
 
	if(SoftLimit) Constraint.bLinearLimitSoft \= 1;
	else Constraint.bLinearLimitSoft \= 0;
 
	Constraint.LinearLimitStiffness 	\= SoftStiffness;
	Constraint.LinearLimitDamping 	\= SoftDampening;
}
 
static FORCEINLINE void SetAngularLimits(
	FConstraintInstance& Constraint,
	const uint8 S1Lim, const uint8 S2Lim, const uint8 TLim,
	const float Swing1LimitAngle,
	const float Swing2LimitAngle,
	const float TwistLimitAngle,
 
	bool SoftSwingLimit\=true, bool SoftTwistLimit\=true,
	const float SwingStiff\=0, const float SwingDamp\=0,
	const float TwistStiff\=0, const float TwistDamp\=0
)
{
	switch (S1Lim)
	{
		case 0 : Constraint.AngularSwing1Motion \= EAngularConstraintMotion::ACM\_Free; break;
		case 1 : Constraint.AngularSwing1Motion \= EAngularConstraintMotion::ACM\_Limited; break;
		case 2 : Constraint.AngularSwing1Motion \= EAngularConstraintMotion::ACM\_Locked; break;
	}
	switch (S2Lim)
	{
		case 0 : Constraint.AngularSwing2Motion \= EAngularConstraintMotion::ACM\_Free; break;
		case 1 : Constraint.AngularSwing2Motion \= EAngularConstraintMotion::ACM\_Limited; break;
		case 2 : Constraint.AngularSwing2Motion \= EAngularConstraintMotion::ACM\_Locked; break;
	}
	switch (TLim)
	{
		case 0 : Constraint.AngularTwistMotion \= EAngularConstraintMotion::ACM\_Free; break;
		case 1 : Constraint.AngularTwistMotion \= EAngularConstraintMotion::ACM\_Limited; break;
		case 2 : Constraint.AngularTwistMotion \= EAngularConstraintMotion::ACM\_Locked; break;
	}
	//~~~~~~~~~~
 
	//Soft Lmit?
	if(SoftSwingLimit) Constraint.bSwingLimitSoft \= 1;
	else Constraint.bSwingLimitSoft \= 0;
 
	if(SoftTwistLimit) Constraint.bTwistLimitSoft \= 1;
	else Constraint.bTwistLimitSoft \= 0;
 
	//Limit Angles
	Constraint.Swing1LimitAngle 	\= Swing1LimitAngle;
	Constraint.Swing2LimitAngle 	\= Swing2LimitAngle;
	Constraint.TwistLimitAngle 	\= TwistLimitAngle;
 
	Constraint.SwingLimitStiffness 	\= SwingStiff;
	Constraint.SwingLimitDamping	\= SwingDamp;
	Constraint.TwistLimitStiffness 	\= TwistStiff;
	Constraint.TwistLimitDamping 	\= TwistDamp;
}

Conclusion
----------

Now you have the basic code to do all sorts of fancy things with Dynamic Physics Constraints that you set up at runtime from c++ !

Play with the values of the two functions I am sharing with you to get all sorts of different effects!

**Basics:**

**Linear Constraints** limit physical motion of the target SMA through space

**Angular Constraints** control the rotation of the target SMA.

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Physics\_Constraints,\_Create\_New\_Constraints\_Dynamically\_During\_Runtime&oldid=5509](https://wiki.unrealengine.com/index.php?title=Physics_Constraints,_Create_New_Constraints_Dynamically_During_Runtime&oldid=5509)"

[Categories](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")
*   [Community Videos](/Category:Community_Videos "Category:Community Videos")

  ![](https://tracking.unrealengine.com/track.png)