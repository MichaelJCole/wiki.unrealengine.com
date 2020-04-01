Animated Vertex Positions of Character Mesh, How To Obtain Them - Epic Wiki                     

Animated Vertex Positions of Character Mesh, How To Obtain Them
===============================================================

(Redirected from [Animated Vertex Positions How To Obtain Them](/index.php?title=Animated_Vertex_Positions_How_To_Obtain_Them&redirect=no "Animated Vertex Positions How To Obtain Them"))

[![AnimatedVertexLocations3.jpg](https://d3ar1piqh1oeli.cloudfront.net/0/04/AnimatedVertexLocations3.jpg/900px-AnimatedVertexLocations3.jpg)](/File:AnimatedVertexLocations3.jpg)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Transforming Vertices To World Space](#Transforming_Vertices_To_World_Space)
*   [3 Velocity Correction](#Velocity_Correction)
*   [4 Conclusion](#Conclusion)

Overview
--------

**Author:** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here is the C++ code that you can use to obtain animated vertex positions!

This is the code from my free [Victory BP Library plugin BP node](https://forums.unrealengine.com/showthread.php?3851-(39)-Rama-s-Extra-Blueprint-Nodes-for-You-as-a-Plugin-No-C-Required!&p=341965&viewfull=1#post341965) that obtains velocity-corrected animated vertex positions for Pawns and Characters!

bool UVictoryBPFunctionLibrary::AnimatedVertex\_\_GetAnimatedVertexLocations(
	USkeletalMeshComponent\* Mesh, 
	TArray<FVector\>& Locations,
	bool PerformPawnVelocityCorrection
){
	if(!Mesh || !Mesh\-\>SkeletalMesh)  
	{
		return false;
	}
 
	//~~~~~~~~~~~~~
	Locations.Empty(); 
	//~~~~~~~~~~~~~
 
	Mesh\-\>ComputeSkinnedPositions(Locations);
 
	FTransform ToWorld \= Mesh\-\>GetComponentTransform();
	FVector WorldLocation \= ToWorld.GetLocation();
 
	//Pawn Velocity Correction
	UPawnMovementComponent\* MovementComp \= nullptr;
	if(PerformPawnVelocityCorrection)
	{
		APawn\* Pawn \= Cast<APawn\>(Mesh\-\>GetOwner());
		MovementComp \= (Pawn) ? Pawn\-\>GetMovementComponent() : NULL;
	}
	bool DoVelocityCorrection \= PerformPawnVelocityCorrection && MovementComp;
	//Pawn Velocity Correction
 
	for(FVector& EachVertex : Locations)
	{
		EachVertex \= WorldLocation + ToWorld.TransformVector(EachVertex);
		if(DoVelocityCorrection)
		{
			EachVertex +\= MovementComp\-\>Velocity \* FApp::GetDeltaTime();
		} 
	} 
 
	return true;
}

Transforming Vertices To World Space
------------------------------------

If you read the API notes on USkinnedMeshComponent::ComputeSkinnedPositions you will see that the vertex positions are obtained in component space.

In order to provide world space postions I have to transform each vertex by the world transform of the skeletal mesh component:

FTransform ToWorld \= Mesh\-\>GetComponentTransform();
FVector WorldLocation \= ToWorld.GetLocation();
 
EachVertex \= WorldLocation + ToWorld.TransformVector(Each);

Velocity Correction
-------------------

The animated vertex positions obtained by the skeletal mesh are obtained on the CPU thread before the character movement update has occurred for characters, and thus vertices always lag behind if you just use USkinnedMeshComponent::ComputeSkinnedPositions.

I use this code below to add in the tick update from the pawn or character movement component so that animated vertex positions are accurate for moving characters!

if(DoVelocityCorrection)
{
	EachVertex +\= MovementComp\-\>Velocity \* FApp::GetDeltaTime();
}

Conclusion
----------

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Animated\_Vertex\_Positions\_of\_Character\_Mesh,\_How\_To\_Obtain\_Them&oldid=23387](https://wiki.unrealengine.com/index.php?title=Animated_Vertex_Positions_of_Character_Mesh,_How_To_Obtain_Them&oldid=23387)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)