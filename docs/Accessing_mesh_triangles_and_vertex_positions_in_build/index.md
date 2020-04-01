Accessing mesh triangles and vertex positions in build - Epic Wiki                    

Accessing mesh triangles and vertex positions in build
======================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Mesh specific vertices and triangles](#Mesh_specific_vertices_and_triangles)
*   [3 Getting Transformed Vertex Positions](#Getting_Transformed_Vertex_Positions)
*   [4 Summary](#Summary)

Overview
========

Author: [vebski](http://www.dawidniemiec.com)

If you are wondering how to access triangles and vertex positions in packaged project. Here is the solution I found. Accessing this data from Unreal's variables (ex. StaticMesh->GetPhysicsTriMeshData()) will not work since all vertex data of a mesh is serialized when packaging the project.

To do this we will have to use PhysX library inside UE4 (on how to include PhysX module [check out Rama's tutorial](/PhysX,_Integrating_PhysX_Code_into_Your_Project "PhysX, Integrating PhysX Code into Your Project")).

Also remember to include these in your .cpp

#include "PhysicsPublic.h"
#include "PhysXIncludes.h"
#include "ThirdParty/PhysX/PhysX-3.3/include/geometry/PxTriangleMesh.h"
#include "ThirdParty/PhysX/PhysX-3.3/include/foundation/PxSimpleTypes.h"

Mesh specific vertices and triangles
====================================

This method will access data only for specific UMeshComponent.

// MyStaticMesh is a UStaticMeshComponent
PxTriangleMesh\* TempTriMesh \= MyStaticMesh\-\>BodyInstance.BodySetup.Get()\-\>TriMesh;
 
check(TempTriMesh);
int32 TriNumber \= TempTriMesh\-\>getNbTriangles();
 
const PxVec3\* PVertices \= TempTriMesh\-\>getVertices();
const void\* Triangles \= TempTriMesh\-\>getTriangles();
 
// Grab triangle indices
int32 I0, I1, I2;
 
for (int32 TriIndex \= 0; TriIndex < TriNumber; ++TriIndex)
{
	if (TempTriMesh\-\>getTriangleMeshFlags() & PxTriangleMeshFlag::eHAS\_16BIT\_TRIANGLE\_INDICES)
	{
		PxU16\* P16BitIndices \= (PxU16\*)Triangles;
		I0 \= P16BitIndices\[(TriIndex \* 3) + 0\];
		I1 \= P16BitIndices\[(TriIndex \* 3) + 1\];
		I2 \= P16BitIndices\[(TriIndex \* 3) + 2\];
	}
	else
	{
		PxU32\* P32BitIndices \= (PxU32\*)Triangles;
		I0 \= P32BitIndices\[(TriIndex \* 3) + 0\];
		I1 \= P32BitIndices\[(TriIndex \* 3) + 1\];
		I2 \= P32BitIndices\[(TriIndex \* 3) + 2\];
	}
 
        // Local position
	const FVector V0 \= P2UVector(PVertices\[I0\]);
	const FVector V1 \= P2UVector(PVertices\[I1\]);
	const FVector V2 \= P2UVector(PVertices\[I2\]);
}

There is also way of accessing all meshes (welded) of an actor. It can be done by calling GetAllShapes() in BodyInstance.

Getting Transformed Vertex Positions
====================================

**Author** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Many thanks to vebski for making this wiki and providing this info!

I've written this code to get the transformed positions of all vertices of any static mesh component.

This will account for actor rotation, translation, and scaling.

//Get Transformed Vertex positions of any static mesh! -Rama
bool UVictoryBPFunctionLibrary::GetStaticMeshVertexLocations(UStaticMeshComponent\* Comp, TArray<FVector\>& VertexPositions)
{
 
	if(!Comp) 						
	{
		return false;
	}
 
	if(!Comp\-\>IsValidLowLevel()) 
	{
		return false;
	}
	//~~~~~~~~~~~~~~~~~~~~~~~
 
	//Component Transform
	FTransform RV\_Transform \= Comp\-\>GetComponentTransform(); 
 
	//Body Setup valid?
	UBodySetup\* BodySetup \= Comp\-\>GetBodySetup();
 
	if(!BodySetup || !BodySetup\-\>IsValidLowLevel())
	{
		return false;
	}  
 
        //array as of 4.9
	for(PxTriangleMesh\* EachTriMesh : BodySetup\-\>TriMeshes)
	{
		if (!EachTriMesh)
		{
			return false;
		}
		//~~~~~~~~~~~~~~~~
 
		//Number of vertices
		PxU32 VertexCount \= EachTriMesh\-\>getNbVertices();
 
		//Vertex array
		const PxVec3\* Vertices \= EachTriMesh\-\>getVertices();
 
		//For each vertex, transform the position to match the component Transform 
		for (PxU32 v \= 0; v < VertexCount; v++)
		{
			VertexPositions.Add(RV\_Transform.TransformPosition(P2UVector(Vertices\[v\])));
		}
	}
 
	return true;
}

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Summary
=======

I hope it will save you some time, it took me a while of reading source code to figure this out.

vebski

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Accessing\_mesh\_triangles\_and\_vertex\_positions\_in\_build&oldid=15282](https://wiki.unrealengine.com/index.php?title=Accessing_mesh_triangles_and_vertex_positions_in_build&oldid=15282)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)