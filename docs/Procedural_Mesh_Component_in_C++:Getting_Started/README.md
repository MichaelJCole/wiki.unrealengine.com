Procedural Mesh Component in C++:Getting Started - Epic Wiki                    

Procedural Mesh Component in C++:Getting Started
================================================

**Rate this Article:**

4.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:4.10

The following is a brief guide to getting the experimental plugin "ProceduralMeshComponent" for procedural generation of meshes purely in C++. There doesn't seem to be any information anywhere, so I decided to put what I've done here in hopes others will extend it.

Tested with UE4.10

  
[![UProceduralMeshComponentGeneratedTriangle.png](https://d26ilriwvtzlb.cloudfront.net/b/bc/UProceduralMeshComponentGeneratedTriangle.png)](/File:UProceduralMeshComponentGeneratedTriangle.png)

I create a simple triangle using the UProceduralMeshComponent API, from there extending it should be easy. Once the class is compiled you can just drag it into your scene.

To use include the paths in the build I have the following in my build file.

MyProject.Build.cs:

PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "ProceduralMeshComponent" });

To fix errors with Visual Studio IntelliSense you need to right-click MyProject.uproject and re-generate Visual Studio project files.

  
I've created an Actor class. In my cpp file I have added the following to the constructor:

MyActor.cpp

#include "ProceduralMeshComponent.h"
 
// Creating a standard root object.
AMyActor::AMyActor()
{
USphereComponent\* SphereComponent \= CreateDefaultSubobject<USphereComponent\>(TEXT("RootComponent"));
RootComponent \= SphereComponent;
 
UProceduralMeshComponent\* mesh \= CreateDefaultSubobject<UProceduralMeshComponent\>(TEXT("GeneratedMesh"));
/\*\*
	\*	Create/replace a section for this procedural mesh component.
	\*	@param	SectionIndex		Index of the section to create or replace.
	\*	@param	Vertices			Vertex buffer of all vertex positions to use for this mesh section.
	\*	@param	Triangles			Index buffer indicating which vertices make up each triangle. Length must be a multiple of 3.
	\*	@param	Normals				Optional array of normal vectors for each vertex. If supplied, must be same length as Vertices array.
	\*	@param	UV0					Optional array of texture co-ordinates for each vertex. If supplied, must be same length as Vertices array.
	\*	@param	VertexColors		Optional array of colors for each vertex. If supplied, must be same length as Vertices array.
	\*	@param	Tangents			Optional array of tangent vector for each vertex. If supplied, must be same length as Vertices array.
	\*	@param	bCreateCollision	Indicates whether collision should be created for this section. This adds significant cost.
	\*/
	//UFUNCTION(BlueprintCallable, Category = "Components|ProceduralMesh", meta = (AutoCreateRefTerm = "Normals,UV0,VertexColors,Tangents"))
	//	void CreateMeshSection(int32 SectionIndex, const TArray<FVector>& Vertices, const TArray<int32>& Triangles, const TArray<FVector>& Normals,
	// const TArray<FVector2D>& UV0, const TArray<FColor>& VertexColors, const TArray<FProcMeshTangent>& Tangents, bool bCreateCollision);
 
	TArray<FVector\> vertices;
 
	vertices.Add(FVector(0, 0, 0));
	vertices.Add(FVector(0, 100, 0));
	vertices.Add(FVector(0, 0, 100));
 
	TArray<int32\> Triangles;
	Triangles.Add(0);
	Triangles.Add(1);
	Triangles.Add(2);
 
	TArray<FVector\> normals;
	normals.Add(FVector(1, 0, 0));
	normals.Add(FVector(1, 0, 0));
	normals.Add(FVector(1, 0, 0));
 
	TArray<FVector2D\> UV0;
	UV0.Add(FVector2D(0, 0));
	UV0.Add(FVector2D(0, 10));
	UV0.Add(FVector2D(10 ,10));
 
	TArray<FColor\> vertexColors;
	vertexColors.Add(FColor(100,100,100,100));
	vertexColors.Add(FColor(100, 100, 100, 100));
	vertexColors.Add(FColor(100, 100, 100, 100));
 
 
	TArray<FProcMeshTangent\> tangents;
	tangents.Add(FProcMeshTangent(1, 1, 1));
	tangents.Add(FProcMeshTangent(1, 1, 1));
	tangents.Add(FProcMeshTangent(1, 1, 1));
 
 
	mesh\-\>CreateMeshSection(1, vertices, Triangles, normals, UV0, vertexColors, tangents, false);
 
        // With default options
	//mesh->CreateMeshSection(1, vertices, Triangles, TArray<FVector>(), TArray<FVector2D>(), TArray<FColor>(), TArray<FProcMeshTangent>(), false);
 
 
	mesh\-\>AttachTo(RootComponent);
}

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Procedural\_Mesh\_Component\_in\_C%2B%2B:Getting\_Started&oldid=17875](https://wiki.unrealengine.com/index.php?title=Procedural_Mesh_Component_in_C%2B%2B:Getting_Started&oldid=17875)"

[Category](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)