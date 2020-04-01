 Mesh Collision, Obtain Closest Point on Mesh Surface To Other Point - Epic Wiki             

 

Mesh Collision, Obtain Closest Point on Mesh Surface To Other Point
===================================================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Using With Base Static Mesh Actor Class](#Using_With_Base_Static_Mesh_Actor_Class)
*   [3 Using With Custom SMA Class](#Using_With_Custom_SMA_Class)
*   [4 Two Function Return Values](#Two_Function_Return_Values)
*   [5 Simple Collision](#Simple_Collision)
*   [6 Summary](#Summary)

Overview
--------

Dear Community,

Use this function to determine what point on a static mesh component is closest to a given point, in this case I use the location of an Actor.

This exact function tells you the closest point on an SMA to an Actor, returning the distance between the two.

  
**The power of this function is that it is returning the point on the actual Mesh Collision Surface!**

  
This is very precise and can lead to some great game effects!

  

Using With Base Static Mesh Actor Class
---------------------------------------

You could test a Static Mesh Actor base class by using

<syntaxhighlight lang="cpp"> TheSMA->StaticMeshComponent->GetDistanceToCollision(PointToTest, OutFVector); //see below for more info </syntaxhighlight>

Using With Custom SMA Class
---------------------------

<syntaxhighlight lang="cpp"> float AYourSMAClass::DistanceOfActorToThisMeshSurface(AActor\* TestActor, FVector& ClosestSurfacePoint) const { if (!TestActor) return;

       if (!TestActor->IsValidLowLevel()) return;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Dist of Actor to Surface, retrieve closest Surface Point to Actor return StaticMeshComponent->GetDistanceToCollision(

              TestActor->GetActorLocation(), ClosestSurfacePoint
       );

}</syntaxhighlight>

Two Function Return Values
--------------------------

The **float returned** is the distance from your chosen test point to the closest point on the Mesh Collision Surface.

The **FVector returned by reference** is the actual point on the Mesh Collision Surface!

Simple Collision
----------------

If you are having issues getting this function to work properly, make sure the static mesh for the SMA you are testing with has actual simple collision primitives! (not using complex as simple)

Summary
-------

Enjoy!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Mesh\_Collision,\_Obtain\_Closest\_Point\_on\_Mesh\_Surface\_To\_Other\_Point&oldid=863](https://wiki.unrealengine.com/index.php?title=Mesh_Collision,_Obtain_Closest_Point_on_Mesh_Surface_To_Other_Point&oldid=863)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")