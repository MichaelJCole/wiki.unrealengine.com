 Unreal Engine AI Tutorial - 1 - Making AI Jump as a Part of Path Following - Epic Wiki             

 

Unreal Engine AI Tutorial - 1 - Making AI Jump as a Part of Path Following
==========================================================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Authored by: Mieszko Zielinski

  
The very first thing I want to cover in this tutorial series is how to make AI know when to jump when following a navigation path. This tutorial is using C++ approach.

  

There's also an alternative way of achieving jump behavior, and that's by placing SmartNavigationLinks on the level, doable purely in Blueprint, but this will get covered in one of the upcoming tutorials.

  

There are three steps required to achieve this tutorial's goal.

  

### 1\. Implement a special "jump" navigation area

One of the ways of annotating navmesh in UE4 is by applying navigation area types to it. There'll be a in-depth tutorial on navigation areas so I'll just say areas can apply a specific set of flags and costs to the navigation mesh.

  

Creating a navigation area is very straightforward. Just create a class deriving from UNavArea, like so:

 `UCLASS()
   class UNavArea_Jump : public UNavArea
   {
       GENERATED_UCLASS_BODY()
   };` 

We'll also need to name our "jump" flag so that we can consistently use it throughout our code. Like so:

 `UENUM()
  namespace ENavAreaFlag
  {
      // up to 15 values
      enum Type
      {
          Default,
          Jump,
          Crouch,
          // and what not
      };
  }` 

Note that we're not using the first bit, since it has a special meaning in our navmesh internals. If first bit in a area is set it means it's walkable, and it's treated as not walkable otherwise. Let's also implement some helper functions for operating on area flags:

 `namespace FNavAreaHelper
   {
       FORCEINLINE bool IsSet(uint16 Flags, ENavAreaFlag::Type Bit) { return (Flags & (1 << Bit)) != 0; }
       FORCEINLINE void Set(uint16& Flags, ENavAreaFlag::Type Bit) { Flags |= (1 << Bit); }

       FORCEINLINE bool IsNavLink(const FNavPathPoint& PathVert) { return (FNavMeshNodeFlags(PathVert.Flags).PathFlags & RECAST_STRAIGHTPATH_OFFMESH_CONNECTION) != 0; }
       FORCEINLINE bool HasJumpFlag(const FNavPathPoint& PathVert) { return     IsSet(FNavMeshNodeFlags(PathVert.Flags).AreaFlags, ENavAreaFlag::Jump); }
       FORCEINLINE bool HasCrouchFlag(const FNavPathPoint& PathVert) { return IsSet(FNavMeshNodeFlags(PathVert.Flags).AreaFlags, ENavAreaFlag::Crouch); }
   }` 

Next we need to configure our newly created area class by setting its AreaFlags. We do it in UNavArea\_Jump's constructor.

 `UNavArea_Jump::UNavArea_Jump(const class FPostConstructInitializeProperties& PCIP)
   : Super(PCIP)
   {
       FNavAreaHelper::Set(AreaFlags, ENavAreaFlag::Jump);
   }` 

Compile, run, and that's it, jumping area is ready.

  

### 2\. Implement a special path following component for detecting jump links.

This is the most fun part. We need to create a custom path following component to handle jumping. We will reuse this new path following component in future tutorials, by the way.

  

We need our new path following component to derive from **UPathFollowingComponent**. Let's make a class like that and name it **UTutorialPathFollowingComponent**. The function we need to override to be able to detect jumping is **SetMoveSegment** so let's declare that as well. Class declaration should look like this:

 `UCLASS()
   class UTutorialPathFollowingComponent : public UPathFollowingComponent
   {
       GENERATED_UCLASS_BODY()

   protected:
       /** cached UCharacterMovementComponent */
       UPROPERTY(transient)
       UCharacterMovementComponent* CharacterMoveComp;

   public:
       // used to detect properties of a path's segment a character is about to follow
       virtual void SetMoveSegment(int32 SegmentStartIndex) override;

       // used to cache UCharacterMovementComponent we're using in SetMoveSegment implementation
       virtual void SetMovementComponent(UNavMovementComponent* MoveComp) override;
   };` 

Implementation of **SetMoveSegment** is the heart of making AI jump in this tutorial. It should look like this:

 `void UTutorialPathFollowingComponent::SetMoveSegment(int32 SegmentStartIndex)
   {
       Super::SetMoveSegment(SegmentStartIndex);

       if (CharacterMoveComp != NULL)
       {
           const FNavPathPoint& SegmentStart = Path->PathPoints[MoveSegmentStartIndex];

           if (FNavAreaHelper::HasJumpFlag(SegmentStart))
           {
               // jump! well... fly-in-straight-line!
               CharacterMoveComp->SetMovementMode(MOVE_Flying);
           }
           else
           {
               // regular move
               CharacterMoveComp->SetMovementMode(MOVE_Walking);
           }
       }
   }` 

Remember you can find missing code details at tutorial's [Github repository](https://github.com/MieszkoZ/AITutorialCPP/commit/99450d6cc742f8cfe164c585f8b9c59b41208b03).

  

### 3\. Make AI use the new component

This one's easy, but not obvious. To make AI use **UTutorialPathFollowingComponent** we need to implement a new AI controller class and configure it to use the new component. Create a class deriving from **AAIController** (let's call it **ATutorialAIController**) and implement its constructor like so:

 `ATutorialAIController::ATutorialAIController(const FPostConstructInitializeProperties& PCIP)
   : Super(PCIP.SetDefaultSubobjectClass<UTutorialPathFollowingComponent>(TEXT("PathFollowingComponent")))
   {
   }` 

This has to be done this way since PathFollowingComponent is the AIController's "sub-object pointer" which means we expect it to be set to an actual object instance all the time.

  

### Level setup

One last thing that needs to be done to observe our AI enjoy its newly acquired jumping skill is to have some actual level with jump links.

  

The easiest way to create navigation links on a map is by placing **NavLinkProxy** actors on it (just drag&drop them from the ClassView in the editor). To make these links jump-able you need to modify selected link's properties to use our newly created navigation:

[![AreaClass Jump.png](https://d26ilriwvtzlb.cloudfront.net/7/78/AreaClass_Jump.png)](/index.php?title=File:AreaClass_Jump.png)

Check out **T01\_Jump** in [this tutorial's content package](http://miechu.nazwa.pl/aitutorial_joomla/repo/AITutorial01_Jump.zip)  

### Summary

  
We've created a way to annotate navmesh with additional information and a way to have AI use that knowledge. Feel free to implement a more sophisticated move in place of my "flying jump" ;)

  

Feel free to suggest new thing I should tackle in this tutorial series. I have a little list to cover, but if your request is on the list then it will get covered even sooner. If it's not I'll handle it once the list is empty. If a feature is widely requested it will make it to the list! :))

  

And keep the feedback coming!

  
Cheers!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Unreal\_Engine\_AI\_Tutorial\_-\_1\_-\_Making\_AI\_Jump\_as\_a\_Part\_of\_Path\_Following&oldid=505](https://wiki.unrealengine.com/index.php?title=Unreal_Engine_AI_Tutorial_-_1_-_Making_AI_Jump_as_a_Part_of_Path_Following&oldid=505)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")