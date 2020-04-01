AI Dodge, Rotate Vector Along Axis By Angle - Epic Wiki                    

AI Dodge, Rotate Vector Along Axis By Angle
===========================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Rotate Vector On Axis By Angle](#Rotate_Vector_On_Axis_By_Angle)
*   [3 AI Dodge](#AI_Dodge)
*   [4 Get Safe Normal](#Get_Safe_Normal)
*   [5 Picking Dodge Direction](#Picking_Dodge_Direction)
*   [6 Working With UE4 Nav Mesh System](#Working_With_UE4_Nav_Mesh_System)
    *   [6.1 UE4 Nav Mesh Projection](#UE4_Nav_Mesh_Projection)
*   [7 Conclusion](#Conclusion)

Overview
--------

**Author** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

In this wiki I show you a simple way to create an AI dodge mechanic where the unit moves along the peridicular of the direction to its target.

The direction from the AI unit to its target is a what I call a "direction vector" because it is an FVector that is storing normalized direction data.

"Normalized" means the length of the vector is 1, which makes it easy to multiply with a float to create a total distance you want to move along a direction vector.

Rotate Vector On Axis By Angle
------------------------------

If you want to rotate a direction vector around an axis quickly and easily you can use this handy function found in Vector.h

/\*\*
 \* Rotates around Axis (assumes Axis.Size() == 1).
 \*
 \* @param Angle Angle to rotate (in degrees).
 \* @param Axis Axis to rotate around.
 \* @return Rotated Vector.
 \*/
FVector RotateAngleAxis( const float AngleDeg, const FVector& Axis ) const;

AI Dodge
--------

void AIDodge(bool DodgeRight\=true, float Distance\=256); //.h
 
void AYourAIClass::AIDodge(bool DodgeRight, float Distance) 
{
	//Location of unit who wants to dodge sideways, presumed to be facing target already
	FVector UnitLocation \= GetActorLocation();
	FVector DirectionToActor \= (OtherActor\-\>GetActorLocation() \- UnitLocation ).GetSafeNormal();
 
	//Optional, remove Z value for ground-based play, ensure UE4 Nav mesh point will be found.
	DirectionToActor.Z \= 0;
 
	//Rotate the direction by 90 to get perpendicular of direction to actor
	FVector Perpendicular \= DirectionToActor.RotateAngleAxis(90,FVector(0,0,1));
 
	//Dodging to relative Left or Right?
	Perpendicular \*\= (DodgeRight) ? 1 : \-1;
 
	//Tell Unit to move 256 units along this perpendicular
	FVector GoalLocation \= UnitLocation + Perpendicular \* Distance;
 
	//Tell unit to move to this location
	AAIController\* AIControl \= Cast<AAIController\>(GetController());
	if(AIControl)
	{
	  AIControl\-\>MoveToLocation(GoalLocation,0); //Optional Acceptance Radius
	}
}

Note that by using FVector::RotateAngleAxis you can implement an AI dodge function in just a few lines of code!

//Rotate the direction by 90 to get perpendicular of direction to actor
FVector Perpendicular \= DirectionToActor.RotateAngleAxis(90,FVector(0,0,1));

The reason the axis is FVector(0,0,1) is because that's the vertical axis, so you can imagine a vertical pole that the direction vector is rotating around.

You could just as easily use any axis of your own choosing, for your own game's needs :)

Get Safe Normal
---------------

Notice I am using GetSafeNormal() to remove all length/distance information from the vector between the AI unit and its target. This ensures that I can the multiply by the Distance parameter later and get a vector of exactly the desired length.

//Location of unit who wants to dodge sideways, presumed to be facing target already
FVector UnitLocation \= GetActorLocation();
FVector DirectionToActor \= (OtherActor\-\>GetActorLocation() \- UnitLocation ).GetSafeNormal();

Picking Dodge Direction
-----------------------

Notice I am using the ternary operator ? : to switch dodge directions based on input parameter:

//Dodging to relative Left or Right?
Perpendicular \*\= (DodgeRight) ? 1 : \-1;

Working With UE4 Nav Mesh System
--------------------------------

To ensure that the final dodge point will be easy for the UE4 Navigation system to find, I remove all Z information of the direction of AI unit to its target:

//Optional, remove Z value for ground-based play, ensure UE4 Nav mesh point will be found.
DirectionToActor.Z \= 0;

Imagine the AI unit wants to dodge a target that 45 degrees above the AI unit on a ledge. If you rotate that vector with z value intact, the final goal may be beneath the ground, or in the case of AI unit being above target, then the goal will be in the air somewhere.

By removing Z information I ensure that the AI unit is querying the UE4 navigation system for a point that is on its own level.

### UE4 Nav Mesh Projection

Alternatively, if you dont want to remove the Z information, you can use UE4 function ProjectPointToNav with an appropriate extent if you want to make absolutely sure the dodge point is going to be found on the nav mesh.

The "Extent" defines the shape of the trace that is performed, so an Extent with a Z of 512 will find destinations on the nav mesh above and below the queried location by 512.

Keep in mind Extent is the half-size of the final trace, because it goes in both directions along the axis.

//NavigationSystem.h
bool ProjectPointToNavigation(const FVector& Point, FNavLocation& OutLocation, const FVector& Extent \= INVALID\_NAVEXTENT, const FNavAgentProperties\* AgentProperties \= NULL, TSharedPtr<const FNavigationQueryFilter\> QueryFilter \= NULL)
{
	return ProjectPointToNavigation(Point, OutLocation, Extent, AgentProperties !\= NULL ? GetNavDataForProps(\*AgentProperties) : GetMainNavData(FNavigationSystem::DontCreate), QueryFilter);
}
 
bool ProjectPointToNavigation(const FVector& Point, FNavLocation& OutLocation, const FVector& Extent \= INVALID\_NAVEXTENT, const ANavigationData\* NavData \= NULL, TSharedPtr<const FNavigationQueryFilter\> QueryFilter \= NULL) const;

This projection functionality is also built into the AIController MoveTo function, if you set that parameter to true!

/\*\* Makes AI go toward specified Dest location
 \*  @param AcceptanceRadius - finish move if pawn gets close enough
 \*  @param bStopOnOverlap - add pawn's radius to AcceptanceRadius
 \*  @param bUsePathfinding - use navigation data to calculate path (otherwise it will go in straight line)
 \*  @param bProjectDestinationToNavigation - project location on navigation data before using it
 \*  @param bCanStrafe - set focus related flag: bAllowStrafe
 \*  @param FilterClass - navigation filter for pathfinding adjustments
 \*  @param bAllowPartialPath - use incomplete path when goal can't be reached
 \*	@note AcceptanceRadius has default value or -1 due to Header Parser not being able to recognize UPathFollowingComponent::DefaultAcceptanceRadius
 \*/
UFUNCTION(BlueprintCallable, Category \= "AI|Navigation", Meta \= (AdvancedDisplay \= "bStopOnOverlap,bCanStrafe,bAllowPartialPath"))
EPathFollowingRequestResult::Type MoveToLocation(const FVector& Dest, float AcceptanceRadius \= \-1, bool bStopOnOverlap \= true,
	bool bUsePathfinding \= true, bool bProjectDestinationToNavigation \= false, bool bCanStrafe \= true,
	TSubclassOf<UNavigationQueryFilter\> FilterClass \= NULL, bool bAllowPartialPath \= true);

Conclusion
----------

In just a few lines of code I've shown you a way to tell your AI unit to move perpendicular to the direction to its target, thus implementing a dodge mechanic that you can use no matter how the AI unit and its target are positioned in world space.

Enjoy!

Rama

Retrieved from "[https://wiki.unrealengine.com/index.php?title=AI\_Dodge,\_Rotate\_Vector\_Along\_Axis\_By\_Angle&oldid=15144](https://wiki.unrealengine.com/index.php?title=AI_Dodge,_Rotate_Vector_Along_Axis_By_Angle&oldid=15144)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)