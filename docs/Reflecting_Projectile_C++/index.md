Reflecting Projectile C++ - Epic Wiki                    

Reflecting Projectile C++
=========================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:(please verify)

Contents
--------

*   [1 Background](#Background)
*   [2 Assumptions](#Assumptions)
*   [3 The Goal](#The_Goal)
*   [4 Setting Up the Project](#Setting_Up_the_Project)
*   [5 Remove Existing Projectile Code](#Remove_Existing_Projectile_Code)
    *   [5.1 Before - WPPost2Projectile.h](#Before_-_WPPost2Projectile.h)
    *   [5.2 Before - WPPost2Projectile.cpp](#Before_-_WPPost2Projectile.cpp)
    *   [5.3 After - WPPost2Projectile.h](#After_-_WPPost2Projectile.h)
    *   [5.4 After - WPPost2Projectile.cpp](#After_-_WPPost2Projectile.cpp)
*   [6 Setting Up the Collision Profiles](#Setting_Up_the_Collision_Profiles)
    *   [6.1 Understanding Collisions](#Understanding_Collisions)
*   [7 Adding Our Projectile Code](#Adding_Our_Projectile_Code)
    *   [7.1 Changes to WPPost2Projectile.h](#Changes_to_WPPost2Projectile.h)
    *   [7.2 Changes to WPPost2Projectile.cpp](#Changes_to_WPPost2Projectile.cpp)
*   [8 Breaking Down the Changes](#Breaking_Down_the_Changes)
    *   [8.1 Constructor](#Constructor)
    *   [8.2 OnConstruction](#OnConstruction)
    *   [8.3 OnOverlap](#OnOverlap)
    *   [8.4 ReceiveHit](#ReceiveHit)
    *   [8.5 Tick](#Tick)
*   [9 Videos](#Videos)
*   [10 Conclusion / Final Notes](#Conclusion_.2F_Final_Notes)

Background
----------

At the [suggestion](http://forums.unrealengine.com/showthread.php?14834-Tutorial-Reflecting-Projectile-%28C-%29) of Adam Davis, I have reproduced my website's reflecting projectile [tutorial](http://theokrin.com/?p=126) here. This tutorial will cover setting up the project and detailing in depth what changes I made to produce the end result. So read on to see how to make a reflecting projectile in Unreal Engine 4.

Assumptions
-----------

First off, this tutorial is aimed at beginners, but you should be familiar with navigating the Editor and compiling Visual Studio projects. Also, this project was created using version 4.2.1 of UE4, and it was compiled using Visual Studio 2013.

The Goal
--------

I'll start by showing off a quick video that demonstrates the end goal of this tutorial. The green lines are the initial path the projectile took, and when it is reflected the line changes to red.

Setting Up the Project
----------------------

First we want to launch the Editor via the Unreal Engine Launcher and create a new project.

[![](https://d3ar1piqh1oeli.cloudfront.net/c/cb/Theokrin_TRP1_LaunchEditor.png/450px-Theokrin_TRP1_LaunchEditor.png)](/File:Theokrin_TRP1_LaunchEditor.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP1_LaunchEditor.png "Enlarge")

Launch UE4 4.2.1

Once the Editor's Project Browser is open. Click the New Project tab at the top. Choose Code First Person from the list as the project to create. For reference, I named mine WPPost2. Thus in screenshots/code samples my projectile class will be WPPost2Projectile.

[![](https://d3ar1piqh1oeli.cloudfront.net/e/e7/Theokrin_TRP2_ProjectBrowser.png/450px-Theokrin_TRP2_ProjectBrowser.png)](/File:Theokrin_TRP2_ProjectBrowser.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP2_ProjectBrowser.png "Enlarge")

Create project

Remove Existing Projectile Code
-------------------------------

After you click Create Project, Visual Studio should open the project's solution automatically. By default the project will come with a projectile class called <ProjectName>Projectile.h and <ProjectName>Projectile.cpp, and these files are found in the <ProjectName> folder under the Source folder in the project hierarchy.

[![](https://d26ilriwvtzlb.cloudfront.net/c/c7/Theokrin_TRP3_ProjectHiearchy.png)](/File:Theokrin_TRP3_ProjectHiearchy.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP3_ProjectHiearchy.png "Enlarge")

Project hiearchy in Visual Studio

This class comes predefined with a UProjectileMovementComponent as a member component. We want to remove this component and its associated code. Because we will be adding our own logic in later. I've highlighted the lines we'll be removing from the header and source files.

### Before - WPPost2Projectile.h

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    
2.  #pragma once
    

4.  #include "WPPost2Projectile.generated.h"
    

6.  UCLASS(config\=Game)
    
7.  class AWPPost2Projectile : public AActor
    
8.  {
    
9.      GENERATED\_UCLASS\_BODY()
    

11.      /\*\* Sphere collision component \*/
    
12.      UPROPERTY(VisibleDefaultsOnly, Category\=Projectile)
    
13.      TSubobjectPtr<USphereComponent\> CollisionComp;
    

15.      /\*\* Projectile movement component \*/
    
16.      UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category\=Movement)
    
17.      TSubobjectPtr<class UProjectileMovementComponent\> ProjectileMovement;
    

19.      /\*\* called when projectile hits something \*/
    
20.      UFUNCTION()
    
21.      void OnHit(AActor\* OtherActor, UPrimitiveComponent\* OtherComp, FVector NormalImpulse, const FHitResult& Hit);
    
22.  };
    

### Before - WPPost2Projectile.cpp

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    

3.  #include "WPPost2.h"
    
4.  #include "WPPost2Projectile.h"
    

7.  AWPPost2Projectile::AWPPost2Projectile(const class FPostConstructInitializeProperties& PCIP) 
    
8.  	: Super(PCIP)
    
9.  {
    
10.      // Use a sphere as a simple collision representation
    
11.      CollisionComp \= PCIP.CreateDefaultSubobject<USphereComponent\>(this, TEXT("SphereComp"));
    
12.      CollisionComp\-\>InitSphereRadius(5.0f);
    
13.      CollisionComp\-\>BodyInstance.SetCollisionProfileName("Projectile");			// Collision profiles are defined in DefaultEngine.ini
    
14.      CollisionComp\-\>OnComponentHit.AddDynamic(this, &AWPPost2Projectile::OnHit);		// set up a notification for when this component overlaps something
    
15.      RootComponent \= CollisionComp;
    

17.      // Use a ProjectileMovementComponent to govern this projectile's movement
    
18.      ProjectileMovement \= PCIP.CreateDefaultSubobject<UProjectileMovementComponent\>(this, TEXT("ProjectileComp"));
    
19.      ProjectileMovement\-\>UpdatedComponent \= CollisionComp;
    
20.      ProjectileMovement\-\>InitialSpeed \= 3000.f;
    
21.      ProjectileMovement\-\>MaxSpeed \= 3000.f;
    
22.      ProjectileMovement\-\>bRotationFollowsVelocity \= true;
    
23.      ProjectileMovement\-\>bShouldBounce \= true;
    

25.      // Die after 3 seconds by default
    
26.      InitialLifeSpan \= 3.0f;
    
27.  }
    

29.  void AWPPost2Projectile::OnHit(AActor\* OtherActor, UPrimitiveComponent\* OtherComp, FVector NormalImpulse, const FHitResult& Hit)
    
30.  {
    
31.      // Only add impulse and destroy projectile if we hit a physics
    
32.      if ((OtherActor !\= NULL) && (OtherActor !\= this) && (OtherComp !\= NULL) && OtherComp\-\>IsSimulatingPhysics())
    
33.      {
    
34.          OtherComp\-\>AddImpulseAtLocation(GetVelocity() \* 100.0f, GetActorLocation());
    

36.          Destroy();
    
37.      }
    
38.  }
    

### After - WPPost2Projectile.h

After you've removed the code, the header and source files should look like this:

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    
2.  #pragma once
    

4.  #include "WPPost2Projectile.generated.h"
    

6.  UCLASS(config\=Game)
    
7.  class AWPPost2Projectile : public AActor
    
8.  {
    
9.      GENERATED\_UCLASS\_BODY()
    

11.      /\*\* Sphere collision component \*/
    
12.      UPROPERTY(VisibleDefaultsOnly, Category\=Projectile)
    
13.      TSubobjectPtr<USphereComponent\> CollisionComp;
    
14.  };
    

### After - WPPost2Projectile.cpp

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    

3.  #include "WPPost2.h"
    
4.  #include "WPPost2Projectile.h"
    

7.  AWPPost2Projectile::AWPPost2Projectile(const class FPostConstructInitializeProperties& PCIP) 
    
8.  	: Super(PCIP)
    
9.  {
    
10.      // Use a sphere as a simple collision representation
    
11.      CollisionComp \= PCIP.CreateDefaultSubobject<USphereComponent\>(this, TEXT("SphereComp"));
    
12.      CollisionComp\-\>InitSphereRadius(5.0f);
    
13.      RootComponent \= CollisionComp;
    

15.      // Die after 3 seconds by default
    
16.      InitialLifeSpan \= 3.0f;
    
17.  }
    

Now we want to compile and run the project. Once the editor is open, we want to find the Projectile Class Blueprint and **recompile** it because we removed a component in the code. Otherwise you _will_ see runtime errors when you try to play the level because the blueprint still has the UProjectileMovementComponent. For recompiling, you need to open the blueprint, click compile, and click save. You will notice the component disappear when you compile it.

[![](https://d3ar1piqh1oeli.cloudfront.net/1/18/Theokrin_TRP4_ProjectileBP.png/700px-Theokrin_TRP4_ProjectileBP.png)](/File:Theokrin_TRP4_ProjectileBP.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP4_ProjectileBP.png "Enlarge")

Open Projectile class blueprint

[![](https://d3ar1piqh1oeli.cloudfront.net/c/cc/Theokrin_TRP5_ProjectileBP_BeforeCompile.png/700px-Theokrin_TRP5_ProjectileBP_BeforeCompile.png)](/File:Theokrin_TRP5_ProjectileBP_BeforeCompile.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP5_ProjectileBP_BeforeCompile.png "Enlarge")

Projectile blueprint before compile

[![](https://d3ar1piqh1oeli.cloudfront.net/c/cb/Theokrin_TRP6_ProjectileBP_AfterCompile.png/700px-Theokrin_TRP6_ProjectileBP_AfterCompile.png)](/File:Theokrin_TRP6_ProjectileBP_AfterCompile.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP6_ProjectileBP_AfterCompile.png "Enlarge")

Projectile blueprint after compile

  

Setting Up the Collision Profiles
---------------------------------

While we have the editor open lets go ahead and cover how to setup the Collision Profile for our projectile. The profile is responsible for defining what events will trigger based on what objects our projectile interacts with in the world. This can be found on the Defaults tab of the blueprint under the Collision section. Click the arrow next to Collision Presets to expand the view. You can look at the different presets, but I decided to go with a Custom profile because I didn't see a preset that would produce the events I wanted.

[![](https://d3ar1piqh1oeli.cloudfront.net/d/da/Theokrin_TRP7_ProjectileBP_DefaultsExpand.png/700px-Theokrin_TRP7_ProjectileBP_DefaultsExpand.png)](/File:Theokrin_TRP7_ProjectileBP_DefaultsExpand.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP7_ProjectileBP_DefaultsExpand.png "Enlarge")

Projectile blueprint's Defaults tab showing Collision section

First, we want to make sure the checkboxes Simulation Generates Hit Events and Generate Overlap Event are ticked. Second, we need to choose Collision Enabled from the Collision Enabled dropdown. Finally, we setup the responses by ticking the corresponding checkboxes. Since the white boxes in the level are of type PhysicsBody, we want that collision to generate an Overlap event. Otherwise we want the collision to generate a Block or Hit event. Be sure to compile and save the blueprint after making the changes.

[![](https://d3ar1piqh1oeli.cloudfront.net/5/52/Theokrin_TRP8_ProjectileBP_CollisionProfile.png/700px-Theokrin_TRP8_ProjectileBP_CollisionProfile.png)](/File:Theokrin_TRP8_ProjectileBP_CollisionProfile.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP8_ProjectileBP_CollisionProfile.png "Enlarge")

Projectile blueprint's collision profile

We told the projectile to generate an Overlap event when colliding with a PhysicsBody. Now we need to do the same for the physics objects in the level. Thus we will want to tick the Generate Overlap Events checkbox for each physics object.

[![](https://d3ar1piqh1oeli.cloudfront.net/9/93/Theokrin_TRP9_PhysicsObjectsGenOverlap.png/700px-Theokrin_TRP9_PhysicsObjectsGenOverlap.png)](/File:Theokrin_TRP9_PhysicsObjectsGenOverlap.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP9_PhysicsObjectsGenOverlap.png "Enlarge")

Set physics object to Generate Overlap Events

You can do this quickly by holding Ctrl when you click each physics object in the level. Then ticking the checkbox after you've selected all them. This is similar to how you can Ctrl+Click files in Windows to select multiple specific files.

[![](https://d3ar1piqh1oeli.cloudfront.net/f/fc/Theokrin_TRP10_MultiPhysObjGenOverlap1.png/700px-Theokrin_TRP10_MultiPhysObjGenOverlap1.png)](/File:Theokrin_TRP10_MultiPhysObjGenOverlap1.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP10_MultiPhysObjGenOverlap1.png "Enlarge")

Set multiple objects to Generate Overlap Events

Alternatively, you could use the Scene Outliner's search box and search for EditorCube. (Note: When you click an object in the level it will select the object in the Scene Outliner. That's how I knew to search for EditorCube.) Then click one of the cubes from the list and press Ctrl+A. This will highlight all of them in the level.

[![](https://d3ar1piqh1oeli.cloudfront.net/2/2a/Theokrin_TRP11_MultiPhysObjGenOverlap2.png/700px-Theokrin_TRP11_MultiPhysObjGenOverlap2.png)](/File:Theokrin_TRP11_MultiPhysObjGenOverlap2.png)

[![](/skins/common/images/magnify-clip.png)](/File:Theokrin_TRP11_MultiPhysObjGenOverlap2.png "Enlarge")

Set multiple objects to Generate Overlap Events

### Understanding Collisions

Figuring out how to get the proper events to trigger took some research. So here are a couple reference links I found when researching collisions and events for this project. They were extremely helpful in understanding how collisions work and what events will fire under what circumstances.

[Unreal Engine | Collision Responses](http://docs.unrealengine.com/latest/INT/Engine/Physics/Collision/index.html)

[Unreal Engine | Events](http://docs.unrealengine.com/latest/INT/Engine/Blueprints/UserGuide/Events/index.html)

I found them by searching the [documentation](http://docs.unrealengine.com/latest/INT/index.html). Also, it's a good idea to see what others have posted up on the Answers exchange and forums ([Link 1](http://forums.unrealengine.com/showthread.php?1318-Hit-Event-not-triggering), [Link 2](http://forums.unrealengine.com/showthread.php?932-Event-Hit)). Big thanks to the Epic developers and their insightful responses.

Adding Our Projectile Code
--------------------------

Be sure to save your level and close the editor. Now, we want to make the projectile work! First we need to modify the header file to add some member variables, overload some inherited Actor functions, and create the callback function for Overlap events.

### Changes to WPPost2Projectile.h

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    
2.  #pragma once
    

4.  #include "WPPost2Projectile.generated.h"
    

6.  UCLASS(config \= Game)
    
7.  class AWPPost2Projectile : public AActor
    
8.  {
    
9.      GENERATED\_UCLASS\_BODY()
    

11.      /\*\* Sphere collision component \*/
    
12.      UPROPERTY(VisibleDefaultsOnly, Category \= Projectile)
    
13.      TSubobjectPtr<USphereComponent\> CollisionComponent;
    

15.      /\*\* Projectile's velocity vector \*/
    
16.      FVector MyVelocity;
    

18.      /\*\* Flag to indicate projectile has been reflected \*/
    
19.      bool bReflected;
    

21.      /\*\* called when projectile overlaps with something \*/
    
22.      UFUNCTION()
    
23.      void OnOverlap(AActor\* OtherActor, UPrimitiveComponent\* OtherComp, int32 OtherBodyIndex);
    

25.  public:
    
26.      /\*\* How fast the projectile moves \*/
    
27.      UPROPERTY(EditAnywhere, Category \= Projectile)
    
28.      float fSpeed;
    

30.      /\*\* How much a bounce affects the speed of the projectile \*/
    
31.      UPROPERTY(EditAnywhere, Category \= Projectile)
    
32.      float fBounceSpeedLoss;
    

34.      // Begin AActor overrides
    
35.      virtual void OnConstruction(const FTransform& Transform) OVERRIDE;
    
36.      virtual void ReceiveHit(class UPrimitiveComponent\* MyComp, class AActor\* Other, class UPrimitiveComponent\* OtherComp, bool bSelfMoved, FVector HitLocation, FVector HitNormal, FVector NormalImpulse, const FHitResult& Hit) OVERRIDE;
    
37.      virtual void Tick(float DeltaSeconds) OVERRIDE;
    
38.      // End AActor overrides
    
39.  };
    

### Changes to WPPost2Projectile.cpp

Now we want to implement these functions and set the variables in the correct places. The following code belongs in the CPP file.

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    

3.  #include "WPPost2.h"
    
4.  #include "WPPost2Projectile.h"
    

7.  AWPPost2Projectile::AWPPost2Projectile(const class FPostConstructInitializeProperties& PCIP)
    
8.  : Super(PCIP)
    
9.  {
    
10.      PrimaryActorTick.bCanEverTick \= true;
    
11.      fSpeed \= 3000.f;
    
12.      fBounceSpeedLoss \= 0.7f;
    

14.      // Use a sphere as a simple collision representation
    
15.      CollisionComponent \= PCIP.CreateDefaultSubobject<USphereComponent\>(this, TEXT("SphereComp"));
    
16.      CollisionComponent\-\>InitSphereRadius(5.0f);
    
17.      CollisionComponent\-\>OnComponentBeginOverlap.AddDynamic(this, &AWPPost2Projectile::OnOverlap);   // set up a notification for when this component overlaps something
    
18.      CollisionComponent\-\>OnComponentEndOverlap.AddDynamic(this, &AWPPost2Projectile::OnOverlap);     // set up a notification for when this component overlaps something
    
19.      RootComponent \= CollisionComponent;
    

21.      // Die after 3 seconds by default
    
22.      InitialLifeSpan \= 3.0f;
    
23.  }
    

25.  void AWPPost2Projectile::OnConstruction(const FTransform& Transform)
    
26.  {
    
27.      Super::OnConstruction(Transform);
    

29.      MyVelocity \= GetActorForwardVector() \* fSpeed;
    
30.  }
    

32.  void AWPPost2Projectile::OnOverlap(AActor\* OtherActor, UPrimitiveComponent\* OtherComp, int32 OtherBodyIndex)
    
33.  {
    
34.      if ((OtherActor !\= NULL) && (OtherActor !\= this) && (OtherComp !\= NULL))
    
35.      {
    
36.          // Only add impulse and destroy projectile if we hit a physics object
    
37.          if (OtherComp\-\>IsSimulatingPhysics())
    
38.          {
    
39.              OtherComp\-\>AddImpulseAtLocation(MyVelocity \* 100.f, GetActorLocation());
    

41.              Destroy();
    
42.          }
    
43.      }
    
44.  }
    

46.  void AWPPost2Projectile::ReceiveHit(class UPrimitiveComponent\* MyComp, class AActor\* Other, class UPrimitiveComponent\* OtherComp,
    
47.      bool bSelfMoved, FVector HitLocation, FVector HitNormal, FVector NormalImpulse, const FHitResult& Hit)
    
48.  {
    
49.      Super::ReceiveHit(MyComp, Other, OtherComp, bSelfMoved, HitLocation, HitNormal, NormalImpulse, Hit);
    

51.      // Reflect the projectile because we hit a non-physics object
    
52.      FVector ReflectedVelocity \= fBounceSpeedLoss \* (\-2 \* FVector::DotProduct(MyVelocity, HitNormal) \* HitNormal + MyVelocity);
    
53.      MyVelocity \= ReflectedVelocity;
    
54.      ReflectedVelocity.Normalize();
    
55.      SetActorRotation(ReflectedVelocity.Rotation());
    

57.      bReflected \= true;
    
58.  }
    

60.  void AWPPost2Projectile::Tick(float DeltaSeconds)
    
61.  {
    
62.      Super::Tick(DeltaSeconds);
    

64.      FColor LineColor \= bReflected ? FColor::Red : FColor::Green;
    
65.      DrawDebugLine(GetWorld(), GetActorLocation(), GetActorLocation() + MyVelocity \* DeltaSeconds, LineColor, false, 2.f, 0, 1.f);
    

67.      SetActorLocation(GetActorLocation() + MyVelocity \* DeltaSeconds, true);
    
68.  }
    

Now I'm going to breakdown each part and explain what each variable is for, what each function is doing, why we're setting certain variables in certain functions, when each function is called, etc.

Breaking Down the Changes
-------------------------

### Constructor

First lets inspect the code added to the projectile's constructor.

1.  // Constructor changes
    
2.  PrimaryActorTick.bCanEverTick \= true;
    
3.  fSpeed \= 3000.f;
    
4.  fBounceSpeedLoss \= 0.7f;
    

6.  CollisionComponent\-\>OnComponentBeginOverlap.AddDynamic(this, &AWPPost2Projectile::OnOverlap);   // set up a notification for when this component overlaps something
    
7.  CollisionComponent\-\>OnComponentEndOverlap.AddDynamic(this, &AWPPost2Projectile::OnOverlap);     // set up a notification for when this component overlaps something
    

We have to set the actor's tick flag to true otherwise our Tick function will not be called. This is accomplished by line 2 above. Line 3 and 4 are just setting default values for the speed and speed loss variables. Lines 6 and 7 are setting our OnOverlap function to be the function that the CollisionComponent will call when overlap events occur for that component. These events will occur when our projectile's movement overlaps one of the physics object in the level just the way we set it up in the Collision Profiles section.

### OnConstruction

In this function we want to set the velocity of our projectile. This is accomplished by retrieving the projectile's forward vector and scaling it by our speed variable.

// OnConstruction setting velocity
MyVelocity \= GetActorForwardVector() \* fSpeed;

I originally tried setting the velocity in the constructor, but that resulted in the projectile always firing in the X axis direction regardless of where you were aiming. Then I tried setting it in the Tick function, but that would overwrite our change to the velocity on reflection. So after some research I found this function could be overrided from AActor, and it was giving me the correct forward vector whenever a projectile was fired. A quick note, if you're overriding a function from a class you're extending be sure to call the super class's function first. That's why I'm calling Super::OnConstruction first.

// Call the super class's function first
Super::OnConstruction(Transform);

### OnOverlap

The OnOverlap function is what gets called thanks to our collision profile set to provide an Overlap response for PhysicsBody and because we ticked the Generate Overlap Events checkbox on both our projectile and the physics objects. So to push the objects around we need to apply our velocity to the objects. First it's good programming practice to check pointers before de-referencing them.

// Checking pointers
if ((OtherActor !\= NULL) && (OtherActor !\= this) && (OtherComp !\= NULL))

Then we know if we hit one of the physics object by checking if it's simulating physics as no other objects in the level are.

// Only add impulse and destroy projectile if we hit a physics object
if (OtherComp\-\>IsSimulatingPhysics())

Note, since the boxes are simulating physics we are able to push them by using the AddImpulseAtLocation function. We do this by passing the projectile's velocity with a little extra umph, and we use the location of the projectile at the moment of collision (which is the current location when this function is called). Then we destroy the projectile. Otherwise, it will continue moving and generating overlap events and pushing the boxes.

OtherComp\-\>AddImpulseAtLocation(MyVelocity \* 100.f, GetActorLocation());
 
Destroy();

### ReceiveHit

The ReceiveHit function is called whenever the projectile has a blocking collision otherwise known as a Hit event. As always you should call the super class's function first.

Super::ReceiveHit(MyComp, Other, OtherComp, bSelfMoved, HitLocation, HitNormal, NormalImpulse, Hit);

Then using a little [vector math](http://www.3dkingdoms.com/weekly/weekly.php?a=2) we can reflect the vector at the point of collision. Note, FVector overloads the pipe ( | ) and caret ( ^ ) operators. Here I've used the verbose DotProduct function call, but in the engine's source you will find the pipe ( | ) and caret ( ^ ) symbols being used for DotProduct and CrossProduct respectively.

// Reflect the projectile because we hit a non-physics object
FVector ReflectedVelocity \= fBounceSpeedLoss \* (\-2 \* FVector::DotProduct(MyVelocity, HitNormal) \* HitNormal + MyVelocity);
MyVelocity \= ReflectedVelocity;

Now we need to update the projectile's rotation because the reflected velocity is in a different direction. Also, we need to normalize the vector first because we want a unit vector for the rotation.

ReflectedVelocity.Normalize();
SetActorRotation(ReflectedVelocity.Rotation());

Finally, we update the boolean that tells us when a reflection has occurred. I use this in the Tick function to change the line color.

bReflected \= true;

### Tick

Last but not least, the Tick function is responsible for moving the projectile forward and drawing a line showing us the path the projectile took. Nothing new here, we need to call the super class's function first.

Super::Tick(DeltaSeconds);

DeltaSeconds is the amount of time that has passed between Tick calls. Using this in our calculations is what allows for smooth movement of the projectile. Now lets figure out what color to use and draw the projectile's path.

FColor LineColor \= bReflected ? FColor::Red : FColor::Green;
DrawDebugLine(GetWorld(), GetActorLocation(), GetActorLocation() + MyVelocity \* DeltaSeconds, LineColor, false, 2.f, 0, 1.f);

Here I make use of the [ternary operator](http://www.cprogramming.com/reference/operators/ternary-operator.html) which is just a shorthand version of an **IF** statement. Then we draw a debug line using DrawDebugLine and use the same calculation as we would to move our projectile. Finally, we move the projectile by setting its new location to the sum of its current location and the velocity vector times DeltaSeconds.

SetActorLocation(GetActorLocation() + MyVelocity \* DeltaSeconds, true);

The second parameter is a flag that indicates whether this is a sweep movement or not. We want to pass true because sweeping movements generate blocking events aka hit events. Otherwise we are just teleporting the projectile around. Thanks to Epic's JamesG for pointing this out in a response to Shammah's [forum post](http://forums.unrealengine.com/showthread.php?8075-Extended-blocking-volume-and-overlapping-volume-hitresults).

Videos
------

Compile and run the project to see the reflecting projectile in action. Here's a couple more videos of the finished product. These showcase the speed loss due to reflection, and the projectile reflecting off other projectiles.

Conclusion / Final Notes
------------------------

Thanks for reading my tutorial. I hope my few days of research condensed into a post is helpful for anyone else starting out with UE4.

A parting protip for anyone doing lots of C++ development especially in UE4, check out the trial for [Visual Assist](http://www.wholetomato.com/) (only works with non express versions of Visual Studio). If you like it, you'll probably buy a license when the trial expires just like I did.

  

Tutorial by [Theokrin](http://wiki.unrealengine.com/User:Theokrin)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Reflecting\_Projectile\_C%2B%2B&oldid=8299](https://wiki.unrealengine.com/index.php?title=Reflecting_Projectile_C%2B%2B&oldid=8299)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")
*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)