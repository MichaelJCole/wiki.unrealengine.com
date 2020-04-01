AI Navigation in C++, Customize Path Following Every Tick - Epic Wiki                    

AI Navigation in C++, Customize Path Following Every Tick
=========================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Rama C++ AI Jumping Video](#Rama_C.2B.2B_AI_Jumping_Video)
*   [3 Rama Video ~ Training PhysX Simulating Balls to Navigate Narrow Ledges!](#Rama_Video_.7E_Training_PhysX_Simulating_Balls_to_Navigate_Narrow_Ledges.21)
*   [4 Steps](#Steps)
    *   [4.1 Have your own Custom ai controller (extends AAIController)](#Have_your_own_Custom_ai_controller_.28extends_AAIController.29)
    *   [4.2 Tell ai controller to use custom path following component, which extends the base UE4 class](#Tell_ai_controller_to_use_custom_path_following_component.2C_which_extends_the_base_UE4_class)
    *   [4.3 Make sure your build.cs is including AIModule as part of your dependencies](#Make_sure_your_build.cs_is_including_AIModule_as_part_of_your_dependencies)
    *   [4.4 Override these functions in your custom PathFollowingComponent!](#Override_these_functions_in_your_custom_PathFollowingComponent.21)
*   [5 Video Result](#Video_Result)
*   [6 More of Ny Customized C++ AI Pathing Videos](#More_of_Ny_Customized_C.2B.2B_AI_Pathing_Videos)
*   [7 How to Get All UE4 Navigation Polys](#How_to_Get_All_UE4_Navigation_Polys)
*   [8 Conclusion](#Conclusion)

Overview
--------

[![RamaAIJump.gif](https://d26ilriwvtzlb.cloudfront.net/7/7a/RamaAIJump.gif)](/File:RamaAIJump.gif)

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community, As gif above shows there is a way to modify standard UE4 pathing via C++ to introduce customized path following behavior without rewriting the whole system!

In gif above I am telling the unit how to jump from one nav mesh piece to another using only C++ (nothing was placed in the editor other than basic nav mesh, and I can add new level geometry any time)

I am also drawing each UE4 Nav Area that the unit is passing through, and I use Nav Mesh Traces + the area info to identify how the unit should jump, and at what angle, to path over terrain that requires jumping.

The point of this wiki is that my method involves only C++ code and a custom Path Following Component.

I am adding to the stock UE4 code, keeping its benefits, while introducing my own custom path following mechanics.

Rama C++ AI Jumping Video
-------------------------

I used the code structure I am describing in this wiki to train my AI to do jump pathing calculations using just UE4 C++!

More Rama AI Jumping Videos

[https://forums.unrealengine.com/showthread.php?25410-Rama-s-Multi-Threaded-Dynamic-Pathing-System-Full-Physics-Support&p=251216&viewfull=1#post251216](https://forums.unrealengine.com/showthread.php?25410-Rama-s-Multi-Threaded-Dynamic-Pathing-System-Full-Physics-Support&p=251216&viewfull=1#post251216)

Rama Video ~ Training PhysX Simulating Balls to Navigate Narrow Ledges!
-----------------------------------------------------------------------

In this video you can see that I use a custom path following component ( as explained in this wiki ) to enable PhysX simulating characters to navigate narrow ledges!

Steps
-----

You need to do several things

### Have your own Custom ai controller (extends AAIController)

Here's the required header info

#pragma once
 
//Super
#include "AIController.h"
 
#include "JoyController.generated.h"
 
 
UCLASS() 
class AJoyController : public AAIController
{ 
    GENERATED\_BODY()
public:
    AJoyController(const FObjectInitializer& ObjectInitializer);

### Tell ai controller to use custom path following component, which extends the base UE4 class

Here's the code for that, you just modify the constructor

//		UJoyPathFollowComp is used here!
AJoyController::AJoyController(const FObjectInitializer& ObjectInitializer)
   : Super(ObjectInitializer.SetDefaultSubobjectClass<UJoyPathFollowComp\>(TEXT("PathFollowingComponent")))
{

### Make sure your build.cs is including AIModule as part of your dependencies

PublicDependencyModuleNames.AddRange(new string\[\] { 
	"Core", 
	"CoreUObject", 
	"Engine", 
	"InputCore" ,
        "Landscape",
       "UMG",
 
        "PhysX",  "APEX",
 
	"AIModule"      //<~~~~~~
});

### Override these functions in your custom PathFollowingComponent!

Especially FollowPathSegment !

This is where you can take control of exact pathing methods!

  

//~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~
//	  Per Tick Modification of Path Following
//			this is how you really customize 
//				how units follow the path! 
 
/\*\* follow current path segment \*/
virtual void FollowPathSegment(float DeltaTime) override;
 
/\*\* sets variables related to current move segment \*/
virtual void SetMoveSegment(int32 SegmentStartIndex) override;
 
/\*\* check state of path following, update move segment if needed \*/
virtual void UpdatePathSegment() override;

Video Result
------------

Using the above method is how I made custom C++ Jump pathing calculations that dont need any in-editor additions to the level, just the basic nav mesh volume.

More of Ny Customized C++ AI Pathing Videos
-------------------------------------------

[Rama's C++ Jump Pathing Videos](https://forums.unrealengine.com/showthread.php?25410-Rama-s-Multi-Threaded-Dynamic-Pathing-System-Full-Physics-Support&p=129896&viewfull=1#post129896)

How to Get All UE4 Navigation Polys
-----------------------------------

In the video above you will see I get all the UE4 Nav Polys in order to do all my C++ AI Jump calculations!

Here's the function I wrote to do this, just for you!

//Nav Data Main
	FORCEINLINE const ANavigationData\* GetMainNavData(FNavigationSystem::ECreateIfEmpty CreateNewIfNoneFound)
	{
		UNavigationSystem\* NavSys \= GetWorld()\-\>GetNavigationSystem();
		if(!NavSys) return NULL; 
		return NavSys\-\>GetMainNavData(CreateNewIfNoneFound);
	}
 
	//Choose Which Nav Data To Use
	FORCEINLINE const ANavigationData\* JoyGetNavData() const
	{
		const FNavAgentProperties& AgentProperties \= MovementComp\-\>GetNavAgentPropertiesRef() ;
		const ANavigationData\* NavData \= GetNavDataForProps(AgentProperties) ;
		if (NavData \== NULL)
		{
			VSCREENMSG("ERROR USING MAIN NAV DATA"); 
			NavData \= GetMainNavData();
		}
 
		return NavData;
	}
 
//VERY IMPORTANT FOR CRASH PROTECTION !!!!!
FORCEINLINE bool TileIsValid(const ARecastNavMesh\* NavMesh,int32 TileIndex) const
{
	if(!NavMesh) return false;
	//~~~~~~~~~~~~~~
	const FBox TileBounds \= NavMesh\-\>GetNavMeshTileBounds(TileIndex);
 
	return TileBounds.IsValid !\= 0;
}
 
//add this to your custom path follow component!
bool NavPoly\_GetAllPolys(TArray<NavNodeRef\>& Polys);

//Rama's UE4 Nav code to get all the nav polys!
bool UJoyPathFollowComp::NavPoly\_GetAllPolys(TArray<NavNodeRef\>& Polys)
{
	if(!MovementComp) return false;
	//~~~~~~~~~~~~~~~~~~
 
	//Get Nav Data
	const ANavigationData\* NavData \= JoyGetNavData();
 
	const ARecastNavMesh\* NavMesh \= Cast<ARecastNavMesh\>(NavData);
	if(!NavMesh)
	{
		return false;
	}
 
	TArray<FNavPoly\> EachPolys;
	for(int32 v \= 0; v < NavMesh\-\>GetNavMeshTilesCount(); v++)
	{
 
                //CHECK IS VALID FIRST OR WILL CRASH!!! 
               //     256 entries but only few are valid!
                // use continue in case the valid polys are not stored sequentially
		if(!TileIsValid(NavMesh,v)) 
                {
                    continue;
		}	
 
		NavMesh\-\>GetPolysInTile(v,EachPolys);
	}	
 
 
	//Add them all!
	for(int32 v \= 0; v < EachPolys.Num(); v++)
	{
		Polys.Add(EachPolys\[v\].Ref);
	}
}

Conclusion
----------

Have fun writing your own custom Path Following code that integrates with the UE4 standard Path Following code!

Now you can extend the wonderful foundation that the AI engineers at Epic built for you!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=AI\_Navigation\_in\_C%2B%2B,\_Customize\_Path\_Following\_Every\_Tick&oldid=13958](https://wiki.unrealengine.com/index.php?title=AI_Navigation_in_C%2B%2B,_Customize_Path_Following_Every_Tick&oldid=13958)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)