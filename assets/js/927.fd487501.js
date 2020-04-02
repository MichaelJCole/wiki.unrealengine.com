(window.webpackJsonp=window.webpackJsonp||[]).push([[927],{1450:function(e,t,r){"use strict";r.r(t);var n=r(28),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("p",[e._v("Procedural Mesh Component in C++:Getting Started - Epic Wiki")]),e._v(" "),r("h1",{attrs:{id:"procedural-mesh-component-in-c-getting-started"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#procedural-mesh-component-in-c-getting-started"}},[e._v("#")]),e._v(" Procedural Mesh Component in C++:Getting Started")]),e._v(" "),r("p",[r("strong",[e._v("Rate this Article:")])]),e._v(" "),r("p",[e._v("4.00")]),e._v(" "),r("p",[r("img",{attrs:{src:"/extensions/VoteNY/images/star_on.gif",alt:""}}),r("img",{attrs:{src:"/extensions/VoteNY/images/star_on.gif",alt:""}}),r("img",{attrs:{src:"/extensions/VoteNY/images/star_on.gif",alt:""}}),r("img",{attrs:{src:"/extensions/VoteNY/images/star_on.gif",alt:""}}),r("img",{attrs:{src:"/extensions/VoteNY/images/star_off.gif",alt:""}}),e._v(" (one vote)")]),e._v(" "),r("p",[e._v("Approved for Versions:4.10")]),e._v(" "),r("p",[e._v("The following is a brief guide to getting the experimental plugin \"ProceduralMeshComponent\" for procedural generation of meshes purely in C++. There doesn't seem to be any information anywhere, so I decided to put what I've done here in hopes others will extend it.")]),e._v(" "),r("p",[e._v("Tested with UE4.10")]),e._v(" "),r("p",[r("a",{attrs:{href:"/File:UProceduralMeshComponentGeneratedTriangle.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/b/bc/UProceduralMeshComponentGeneratedTriangle.png",alt:"UProceduralMeshComponentGeneratedTriangle.png"}})])]),e._v(" "),r("p",[e._v("I create a simple triangle using the UProceduralMeshComponent API, from there extending it should be easy. Once the class is compiled you can just drag it into your scene.")]),e._v(" "),r("p",[e._v("To use include the paths in the build I have the following in my build file.")]),e._v(" "),r("p",[e._v("MyProject.Build.cs:")]),e._v(" "),r("p",[e._v('PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "ProceduralMeshComponent" });')]),e._v(" "),r("p",[e._v("To fix errors with Visual Studio IntelliSense you need to right-click MyProject.uproject and re-generate Visual Studio project files.")]),e._v(" "),r("p",[e._v("I've created an Actor class. In my cpp file I have added the following to the constructor:")]),e._v(" "),r("p",[e._v("MyActor.cpp")]),e._v(" "),r("p",[e._v('#include "ProceduralMeshComponent.h"\n \n// Creating a standard root object.\nAMyActor::AMyActor()\n{\nUSphereComponent* SphereComponent = CreateDefaultSubobject<USphereComponent>(TEXT("RootComponent"));\nRootComponent = SphereComponent;\n \nUProceduralMeshComponent* mesh = CreateDefaultSubobject<UProceduralMeshComponent>(TEXT("GeneratedMesh"));\n/**\n*\tCreate/replace a section for this procedural mesh component.\n*\t@param\tSectionIndex\t\tIndex of the section to create or replace.\n*\t@param\tVertices\t\t\tVertex buffer of all vertex positions to use for this mesh section.\n*\t@param\tTriangles\t\t\tIndex buffer indicating which vertices make up each triangle. Length must be a multiple of 3.\n*\t@param\tNormals\t\t\t\tOptional array of normal vectors for each vertex. If supplied, must be same length as Vertices array.\n*\t@param\tUV0\t\t\t\t\tOptional array of texture co-ordinates for each vertex. If supplied, must be same length as Vertices array.\n*\t@param\tVertexColors\t\tOptional array of colors for each vertex. If supplied, must be same length as Vertices array.\n*\t@param\tTangents\t\t\tOptional array of tangent vector for each vertex. If supplied, must be same length as Vertices array.\n*\t@param\tbCreateCollision\tIndicates whether collision should be created for this section. This adds significant cost.\n*/\n//UFUNCTION(BlueprintCallable, Category = "Components|ProceduralMesh", meta = (AutoCreateRefTerm = "Normals,UV0,VertexColors,Tangents"))\n//\tvoid CreateMeshSection(int32 SectionIndex, const TArray'),r("FVector",[e._v("& Vertices, const TArray"),r("int32",[e._v("& Triangles, const TArray"),r("FVector",[e._v("& Normals,\n// const TArray"),r("FVector2D",[e._v("& UV0, const TArray"),r("FColor",[e._v("& VertexColors, const TArray"),r("FProcMeshTangent",[e._v("& Tangents, bool bCreateCollision);\n \nTArray<FVector> vertices;\n \nvertices.Add(FVector(0, 0, 0));\nvertices.Add(FVector(0, 100, 0));\nvertices.Add(FVector(0, 0, 100));\n \nTArray<int32> Triangles;\nTriangles.Add(0);\nTriangles.Add(1);\nTriangles.Add(2);\n \nTArray<FVector> normals;\nnormals.Add(FVector(1, 0, 0));\nnormals.Add(FVector(1, 0, 0));\nnormals.Add(FVector(1, 0, 0));\n \nTArray<FVector2D> UV0;\nUV0.Add(FVector2D(0, 0));\nUV0.Add(FVector2D(0, 10));\nUV0.Add(FVector2D(10 ,10));\n \nTArray<FColor> vertexColors;\nvertexColors.Add(FColor(100,100,100,100));\nvertexColors.Add(FColor(100, 100, 100, 100));\nvertexColors.Add(FColor(100, 100, 100, 100));\n \n \nTArray<FProcMeshTangent> tangents;\ntangents.Add(FProcMeshTangent(1, 1, 1));\ntangents.Add(FProcMeshTangent(1, 1, 1));\ntangents.Add(FProcMeshTangent(1, 1, 1));\n \n \nmesh->CreateMeshSection(1, vertices, Triangles, normals, UV0, vertexColors, tangents, false);\n \n// With default options\n//mesh->CreateMeshSection(1, vertices, Triangles, TArray"),r("FVector",[e._v("(), TArray"),r("FVector2D",[e._v("(), TArray"),r("FColor",[e._v("(), TArray"),r("FProcMeshTangent",[e._v("(), false);\n \n \nmesh->AttachTo(RootComponent);\n}")])],1)],1)],1)],1)],1)],1)],1)],1)],1)],1),e._v(" "),r("p",[e._v('Retrieved from "'),r("a",{attrs:{href:"https://wiki.unrealengine.com/index.php?title=Procedural_Mesh_Component_in_C%2B%2B:Getting_Started&oldid=17875",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://wiki.unrealengine.com/index.php?title=Procedural_Mesh_Component_in_C%2B%2B:Getting_Started&oldid=17875"),r("OutboundLink")],1),e._v('"')]),e._v(" "),r("p",[r("a",{attrs:{href:"/Special:Categories",title:"Special:Categories"}},[e._v("Category")]),e._v(":")]),e._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"/Category:Templates",title:"Category:Templates"}},[e._v("Templates")])])]),e._v(" "),r("p",[r("img",{attrs:{src:"https://tracking.unrealengine.com/track.png",alt:""}})])])}),[],!1,null,null,null);t.default=o.exports}}]);