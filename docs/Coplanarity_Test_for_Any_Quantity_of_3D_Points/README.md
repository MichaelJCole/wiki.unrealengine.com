Coplanarity Test for Any Quantity of 3D Points - Epic Wiki                    

Coplanarity Test for Any Quantity of 3D Points
==============================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Code](#Code)
*   [3 Explanation](#Explanation)
    *   [3.1 PointPlaneDist](#PointPlaneDist)
    *   [3.2 Abs](#Abs)
*   [4 Conclusion](#Conclusion)

Overview
--------

Dear Community,

It took me a long time to create and test a fully accurate function for determining if an arbitrary number of FVectors / 3D points are coplanar!

Here is the function I came up with for your entertainment!

Code
----

static FORCEINLINE bool CoPlanar(const TArray<FVector\>& Points, const float Tolerance \= 0.1)
{
  //less than 4 points = coplanar
  if(Points.Num() < 4) return true;
 
  //Get the Normal for plane determined by first 3 points
  const FVector Normal \= FVector::CrossProduct(Points\[2\] \- Points\[0\], Points\[1\] \- Points\[0\]);
 
  const int32 Total \= Points.Num();
  for(int32 v \= 3; v < Total; v++)
  {
	//Abs of PointPlaneDist, dist should be 0
	if(FMath::Abs( FVector::PointPlaneDist(Points\[v\], Points\[0\], Normal)) \> Tolerance) return false;
  }
 
  return true;
}

Explanation
-----------

Any 3 points determine a plane, so I obtain the normal of the plane determined by the first 3 points!

const FVector Normal \= FVector::CrossProduct(Points\[2\] \- Points\[0\], Points\[1\] \- Points\[0\]);

Now that I've established the plane I want to test against, I compare all the other points using UE4's PointPlaneDist function.

if(FMath::Abs( FVector::PointPlaneDist(Points\[v\], Points\[0\], Normal)) \> Tolerance)

I am allowing an error tolerance rather than demanding exactly 0.

### PointPlaneDist

Vector.h
/\*\*
	 \* Calculate the signed distance (in the direction of the normal) between
	 \* a point and a plane.
	 \*
	 \* @param Point The Point we are checking.
	 \* @param PlaneBase The Base Point in the plane.
	 \* @param PlaneNormal The Normal of the plane.
	 \*
	 \* @return Signed distance  between point and plane.
	 \*/
	static float PointPlaneDist( const FVector &Point, const FVector &PlaneBase, const FVector &PlaneNormal );

### Abs

The absolute value is essential!

if(FMath::Abs( FVector::PointPlaneDist(...

Conclusion
----------

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Coplanarity\_Test\_for\_Any\_Quantity\_of\_3D\_Points&oldid=3269](https://wiki.unrealengine.com/index.php?title=Coplanarity_Test_for_Any_Quantity_of_3D_Points&oldid=3269)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)