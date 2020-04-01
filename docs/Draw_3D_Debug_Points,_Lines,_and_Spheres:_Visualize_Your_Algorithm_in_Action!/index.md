Draw 3D Debug Points, Lines, and Spheres: Visualize Your Algorithm in Action - Epic Wiki               

Draw 3D Debug Points, Lines, and Spheres: Visualize Your Algorithm in Action
============================================================================

From Epic Wiki

(Redirected from [Draw 3D Debug Points, Lines, and Spheres: Visualize Your Algorithm in Action!](/index.php?title=Draw_3D_Debug_Points,_Lines,_and_Spheres:_Visualize_Your_Algorithm_in_Action!&redirect=no "Draw 3D Debug Points, Lines, and Spheres: Visualize Your Algorithm in Action!"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Draw Point](#Draw_Point)
    *   [2.1 Definition](#Definition)
    *   [2.2 Code Sample](#Code_Sample)
*   [3 Draw Line](#Draw_Line)
    *   [3.1 Definition](#Definition_2)
    *   [3.2 Code Sample](#Code_Sample_2)
*   [4 Draw 3D Sphere](#Draw_3D_Sphere)
    *   [4.1 Definition](#Definition_3)
    *   [4.2 Code Sample](#Code_Sample_3)
*   [5 LifeTime](#LifeTime)
*   [6 Video](#Video)
*   [7 All Draw Debug Functions](#All_Draw_Debug_Functions)
*   [8 Summary](#Summary)

Overview
--------

Dear Community,

UE4 comes with awesome 3D Drawing features for drawing anywhere in the world!

I consider these tools essential for debugging any algorithm or custom game feature that you are creating.

Draw Debug tools are how you can easily visualize what your code is doing.

Draw Debug helps you see the transition from 2d words to 3D shapes and movement through 3D space

Enjoy!

  

Draw Point
----------

### Definition

ENGINE\_API void DrawDebugPoint(
	const UWorld\* InWorld, 
	FVector const& Position, 
	float Size, 
	FColor const& PointColor, 
	bool bPersistentLines \= false, 
	float LifeTime\=\-1.f, 
	uint8 DepthPriority \= 0
);

### Code Sample

DrawDebugPoint(
	GetWorld(), 
	Location,
	20,  					//size
	FColor(255,0,255),  //pink
	false,  				//persistent (never goes away)
	0.03 					//point leaves a trail on moving object
);

Draw Line
---------

You can choose how thick the line should be, Thank You Epic!

### Definition

ENGINE\_API void DrawDebugLine(
	const UWorld\* InWorld, 
	FVector const& LineStart, 
	FVector const& LineEnd, 
	FColor const& Color, 
	bool bPersistentLines \= false, 
	float LifeTime\=\-1.f, 
	uint8 DepthPriority \= 0, 
	float Thickness \= 0.f
);

### Code Sample

//in a non-Static class
//Draw the Line!
DrawDebugLine(
	GetWorld(), 
	LinkStart, 
	LinkEnd, 
	FColor(255,0,0), 
	false, \-1, 0, 
	12.333
);

Draw 3D Sphere
--------------

You can choose how detailed the sphere is!

### Definition

ENGINE\_API void DrawDebugSphere(
	const UWorld\* InWorld, 
	FVector const& Center, 
	float Radius, 
	int32 Segments, 
	FColor const& Color, 
	bool bPersistentLines \= false, 
	float LifeTime\=\-1.f, 
	uint8 DepthPriority \= 0
);

### Code Sample

//in a non-Static class
 
//Start Point
DrawDebugSphere(
	GetWorld(),
	SphereCenter, 
	24, 
	32, 
	FColor(255,0,0)
);

LifeTime
--------

You can set the lifetime in seconds,

 float LifeTime=-1.f,

but if you are **drawing every tick** make sure you do NOT do this,

or you are creating way more lines than you need to be :)

Video
-----

In this video, toward the middle ([3:05](http://youtu.be/IJXcuOA8POo?t=3m5s)), I show my in-game 3D Kismet system,

and I am using draw debug sphere and draw debug line for the links between the 3D objects :)

All Draw Debug Functions
------------------------

See **DrawDebugHelpers.h** for all the available 3D Debug drawing helpers!

Summary
-------

Enjoy these Draw tools, some of my favorite functions!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Draw\_3D\_Debug\_Points,\_Lines,\_and\_Spheres:\_Visualize\_Your\_Algorithm\_in\_Action&oldid=5755](https://wiki.unrealengine.com/index.php?title=Draw_3D_Debug_Points,_Lines,_and_Spheres:_Visualize_Your_Algorithm_in_Action&oldid=5755)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")