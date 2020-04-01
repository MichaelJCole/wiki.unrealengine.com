 Procedural Mesh Component in C++:Getting Started - Epic Wiki             

 

Procedural Mesh Component in C++:Getting Started
================================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

The following is a brief guide to getting the experimental plugin "ProceduralMeshComponent" for procedural generation of meshes purely in C++. There doesn't seem to be any information anywhere, so I decided to put what I've done here in hopes others will extend it.

  
[![UProceduralMeshComponentGeneratedTriangle.png](https://d26ilriwvtzlb.cloudfront.net/b/bc/UProceduralMeshComponentGeneratedTriangle.png)](/index.php?title=File:UProceduralMeshComponentGeneratedTriangle.png)

I create a simple triangle using the UProceduralMeshComponent API, from there extending it should be easy. Once the class is compiled you can just drag it into your scene.

To use this component, include the paths in the build.cs file of your project:

MyProject.Build.cs:

<syntaxhighlight lang="cpp"> PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "ProceduralMeshComponent" }); </syntaxhighlight>

and in your .uproject file (MyProject.uproject) in case you work on a project:

<syntaxhighlight lang="cpp">

   "AdditionalDependencies": \[..., ..., "ProceduralMeshComponent"\]

</syntaxhighlight>

After 4.17, plugins can now depend on other plugins, so in case you are working on a **plugin** instead of a project, you will have to add this to your .uplugin file:

<syntaxhighlight lang="cpp">

 "Modules": \[
     {
       ....
     }
   \],
   "Plugins": \[                       // <--
     {                                // <--
       "Name": "ProceduralMeshComponent",    // <--
       "Enabled": true                // <--
     }                                // <--
   \]   

</syntaxhighlight>

To fix errors with Visual Studio IntelliSense you need to right-click MyProject.uproject and re-generate Visual Studio project files. In Visual Studio 2017, open "Solution Explorer" and open the "Game" folder, right-click on the first line, which should be the root of your solution, select: "Rescan Solution".

  
I've created an Actor class.

Add the header to your MyActor.h file above the "MyActor.generated.h" include which has to be the last include.

<syntaxhighlight lang="cpp">

1.  include "ProceduralMeshComponent.h"
2.  include "MyActor.generated.h"

</syntaxhighlight>

In the header file, the following is added to support assigning a material.

<syntaxhighlight lang="cpp">

private: UPROPERTY(VisibleAnywhere) UProceduralMeshComponent \* mesh; </syntaxhighlight>

In my cpp file I have added the following to the constructor:

MyActor.cpp <syntaxhighlight lang="cpp"> // Creating a standard root object. AMyActor::AMyActor() { mesh = CreateDefaultSubobject<UProceduralMeshComponent>(TEXT("GeneratedMesh")); RootComponent = mesh;

       // New in UE 4.17, multi-threaded PhysX cooking.
       mesh->bUseAsyncCooking = true;

}

  
// This is called when actor is spawned (at runtime or when you drop it into the world in editor) void AMyActor::PostActorCreated() { Super::PostActorCreated(); CreateTriangle(); }

// This is called when actor is already in level and map is opened void AMyActor::PostLoad() { Super::PostLoad(); CreateTriangle(); }

void AMyActor::CreateTriangle() { TArray<FVector> vertices; vertices.Add(FVector(0, 0, 0)); vertices.Add(FVector(0, 100, 0)); vertices.Add(FVector(0, 0, 100));

TArray<int32> Triangles; Triangles.Add(0); Triangles.Add(1); Triangles.Add(2);

TArray<FVector> normals; normals.Add(FVector(1, 0, 0)); normals.Add(FVector(1, 0, 0)); normals.Add(FVector(1, 0, 0));

TArray<FVector2D> UV0; UV0.Add(FVector2D(0, 0)); UV0.Add(FVector2D(10, 0)); UV0.Add(FVector2D(0, 10));

  
TArray<FProcMeshTangent> tangents; tangents.Add(FProcMeshTangent(0, 1, 0)); tangents.Add(FProcMeshTangent(0, 1, 0)); tangents.Add(FProcMeshTangent(0, 1, 0));

TArray<FLinearColor> vertexColors; vertexColors.Add(FLinearColor(0.75, 0.75, 0.75, 1.0)); vertexColors.Add(FLinearColor(0.75, 0.75, 0.75, 1.0)); vertexColors.Add(FLinearColor(0.75, 0.75, 0.75, 1.0));

mesh->CreateMeshSection\_LinearColor(0, vertices, Triangles, normals, UV0, vertexColors, tangents, true);

       // Enable collision data

mesh->ContainsPhysicsTriMeshData(true); } </syntaxhighlight>

The documentation for CreateMeshSection and CreateMeshSection\_LinearColor functions is this:

<syntaxhighlight lang="cpp"> /\*\* \* Create/replace a section for this procedural mesh component. \* @param SectionIndex Index of the section to create or replace. \* @param Vertices Vertex buffer of all vertex positions to use for this mesh section. \* @param Triangles Index buffer indicating which vertices make up each triangle. Length must be a multiple of 3. \* @param Normals Optional array of normal vectors for each vertex. If supplied, must be same length as Vertices array. \* @param UV0 Optional array of texture co-ordinates for each vertex. If supplied, must be same length as Vertices array. \* @param VertexColors Optional array of colors for each vertex. If supplied, must be same length as Vertices array. \* @param Tangents Optional array of tangent vector for each vertex. If supplied, must be same length as Vertices array. \* @param bCreateCollision Indicates whether collision should be created for this section. This adds significant cost. \*/

// **Don't use this function**. It is deprecated. Use LinearColor version. void CreateMeshSection(int32 SectionIndex, const TArray<FVector>& Vertices, const TArray<int32>& Triangles, const TArray<FVector>& Normals, const TArray<FVector2D>& UV0, const TArray<FColor>& VertexColors, const TArray<FProcMeshTangent>& Tangents, bool bCreateCollision);

// In this one you can send FLinearColor instead of FColor for the Vertex Colors. void CreateMeshSection\_LinearColor(int32 SectionIndex, const TArray<FVector>& Vertices, const TArray<int32>& Triangles, const TArray<FVector>& Normals, const TArray<FVector2D>& UV0, const TArray<FLinearColor>& VertexColors, const TArray<FProcMeshTangent>& Tangents, bool bCreateCollision)

// Updates a section of this procedural mesh component. This is faster than CreateMeshSection, but does not let you change topology. Collision info is also updated. void UpdateMeshSection\_LinearColor(int32 SectionIndex, const TArray<FVector>& Vertices, const TArray<FVector>& Normals, const TArray<FVector2D>& UV0, const TArray<FLinearColor>& VertexColors, const TArray<FProcMeshTangent>& Tangents);

</syntaxhighlight>

If you have a <YourGameName>GameModeBase.cpp, make sure to add a reference to the header of the class where you added the above code, that way you will see it in your Editor in "C++ Classes" Content Browser and will be able to drag it to your scene.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Procedural\_Mesh\_Component\_in\_C%2B%2B:Getting\_Started&oldid=119](https://wiki.unrealengine.com/index.php?title=Procedural_Mesh_Component_in_C%2B%2B:Getting_Started&oldid=119)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")