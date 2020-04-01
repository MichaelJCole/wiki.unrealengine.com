Collision Events in Code - Epic Wiki                    

Collision Events in Code
========================

**This is a stub - please add things that are missing!**

Here are some of the functions that get called on Collision in code:

Function name

Description

Parameters

Base Class

Tips

ReceiveHit

Event when this actor bumps into a blocking object, or blocks another actor that bumps into it.

class UPrimitiveComponent\* MyComp, class AActor\* Other, class UPrimitiveComponent\* OtherComp, bool bSelfMoved, FVector HitLocation, FVector HitNormal, FVector NormalImpulse, const FHitResult& Hit

Actor

Both Actors must have their collision response set to Block for this to occur. Of the two actors, only those that also have Simulation Generates Hit Events = True will receive the event.

ReceiveActorBeginOverlap

Event when this actor overlaps another actor.

class AActor\* OtherActor

Actor

ReceiveActorEndOverlap

Event when an actor no longer overlaps another actor, and they have separated.

class AActor\* OtherActor

Actor

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Collision\_Events\_in\_Code&oldid=7871](https://wiki.unrealengine.com/index.php?title=Collision_Events_in_Code&oldid=7871)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)