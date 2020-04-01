Survival Sample Game: Section 2 - Epic Wiki                    

Survival Sample Game: Section 2
===============================

**Rate this Tutorial:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (4 votes)

Approved for Versions:4.7

Be sure to first read the [**project overview page**](https://wiki.unrealengine.com/Survival_sample_game) for information on the project series, recommended documentation and a section overview! The best place for questions and feedback is the [**official forum thread**](https://forums.unrealengine.com/showthread.php?63678-Upcoming-C-Gameplay-Example-Series-Making-a-Survival-Game), it is monitored (the community is often kind enough to help out too!) and will try to answer any question as quickly as possible.

Contents
--------

*   [1 Introduction](#Introduction)
    *   [1.1 Additional concepts introduced in code](#Additional_concepts_introduced_in_code)
*   [2 Concepts](#Concepts)
    *   [2.1 Manipulating materials in C++](#Manipulating_materials_in_C.2B.2B)
    *   [2.2 Driving FX with Physical Materials](#Driving_FX_with_Physical_Materials)
    *   [2.3 Attaching/Detaching Actors using Sockets](#Attaching.2FDetaching_Actors_using_Sockets)
    *   [2.4 Dealing & handling damage](#Dealing_.26_handling_damage)
*   [3 Closing](#Closing)

Introduction
============

This section adds weapon support for the character, a flashlight, UT-style inventory with on-character visual representation of the carried items and deals with damage, death and respawns for players.

Please consider this documentation a reference guide to get additional information on topics covered in the sample game's source itself. If you are missing a topic or think a specific topic requires more details then feel free to leave your feedback on the [**section-specific forum thread**](https://forums.unrealengine.com/showthread.php?66263-Announcing-Section-2-for-Survival-Game)!

[![Section2 overview02.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c9/Section2_overview02.jpg)](/File:Section2_overview02.jpg)

[![Flashlight 01..jpg](https://d26ilriwvtzlb.cloudfront.net/7/71/Flashlight_01..jpg)](/File:Flashlight_01..jpg)

View & download [**latest project source**](https://github.com/tomlooman/EpicSurvivalGameSeries) on GitHub

Additional concepts introduced in code
--------------------------------------

*   Arrays (See: SCharacter.h - Inventory)
*   Structs (See: STypes.h - FTakeHitInfo)
*   Enums (See: STypes.h - EInventorySlot)

Concepts
========

Manipulating materials in C++
-----------------------------

[![Section2 materialinstances.jpg](https://d26ilriwvtzlb.cloudfront.net/d/d9/Section2_materialinstances.jpg)](/File:Section2_materialinstances.jpg)

To alter a single object's material during gameplay we have to create a [MaterialInstanceDynamic](https://docs.unrealengine.com/latest/INT/Engine/Rendering/Materials/MaterialInstances/index.html#materialinstancedynamic). This gives us a unique instance to change parameters like the flashlight brightness.

First we create the instance. Any new instance must be applied to the mesh, CreateAndSetMaterialInstanceDynamic takes care of both. The first parameter for the material index is usually 0 - your StaticMesh may have more than one material applied using multiple indices (see the Weapons/SK\_Rifle mesh for an example)

void ASFlashlight::BeginPlay()
{
	Super::BeginPlay();
 
	/\* Create an instance unique to this actor instance to manipulate emissive intensity \*/
	USkeletalMeshComponent\* MeshComp \= GetWeaponMesh();
	if (MeshComp)
	{
		MatDynamic \= MeshComp\-\>CreateAndSetMaterialInstanceDynamic(0);
	}
}

If you didn't create this MaterialInstanceDynamic, changing a parameter on a material, would change it on all meshes that use the same material since by default instances of the same materials are shared between meshes.

Now that we have a material to play around with, we can update the brightness of our flashlight like so:

void ASFlashlight::UpdateLight(bool Enabled)
{
	/\* Update material parameter \*/
	if (MatDynamic)
	{		
		/\* " Enabled ? MaxEmissiveIntensity : 0.0f " picks between first or second value based on "Enabled" boolean \*/
		MatDynamic\-\>SetScalarParameterValue(EmissiveParamName, Enabled ? MaxEmissiveIntensity : 0.0f);	
	}
}

The EmissiveParamName contains the FName of the parameter, in this case "Brightness".

The second parameter field may look strange to you, here is a code snippet to explain what it does:

/\* This line is a shorthand for the if-statement below \*/
Enabled ? MaxEmissiveIntensity : 0.0f
 
float Intensity;
if (Enabled)
{
    Intensity \= MaxEmissiveIntensity;
}
else
{
    Intensity \= 0.0f;
}

Driving FX with Physical Materials
----------------------------------

[![Section2 DrivingFXphysmats.jpg](https://d26ilriwvtzlb.cloudfront.net/9/98/Section2_DrivingFXphysmats.jpg)](/File:Section2_DrivingFXphysmats.jpg)

To spawn particle FX based on the surface we hit, or play a sound based on the surface we standing on we need to know the PhysicalMaterial of a StaticMesh or SkeletalMesh. For StaticMesh this is specified in the shader material in the MaterialEditor, for SkeletalMeshes it's set using the [PhatTool](https://docs.unrealengine.com/latest/INT/Engine/Physics/PhAT/index.html) on the PhysicsAsset assigned to the SkeletalMesh.

You need to define your own custom Physics Material first. (See: SurvivalGame.h) Default already exists, but for convenience we assign a C++ definition to it. Don't forget to add them to DefaultEngine.ini or the engine won't recognize the types (the C++ code below is only for convenience, the .ini file it where the actual defining is done)

/\*\* when you modify this, please note that this information can be saved with instances
\* also DefaultEngine.ini \[/Script/Engine.PhysicsSettings\] should match with this list \*\*/
#define SURFACE\_DEFAULT				SurfaceType\_Default
#define SURFACE\_FLESH				SurfaceType1

We assign these types to PhysicalMaterial assets. (See: '/Base/PhysMat\_Flesh') And the assets are then applied to either (shader) materials or PhysicsAsset (See: '/AnimStarterPack/Character/HeroTPP\_Physics')

Now there is one step remaining, our code needs to check the type we hit, and spawn a particle effect, or play a sound based on what we just hit. (See: SImpactEffect.cpp)

void ASImpactEffect::PostInitializeComponents()
{
	Super::PostInitializeComponents();
 
	/\* Figure out what we hit (SurfaceHit is setting during actor instantiation in weapon class) \*/
	UPhysicalMaterial\* HitPhysMat \= SurfaceHit.PhysMaterial.Get();
	EPhysicalSurface HitSurfaceType \= UPhysicalMaterial::DetermineSurfaceType(HitPhysMat);
 
	UParticleSystem\* ImpactFX \= GetImpactFX(HitSurfaceType);
	if (ImpactFX)
	{
		UGameplayStatics::SpawnEmitterAtLocation(this, ImpactFX, GetActorLocation(), GetActorRotation());
	}
 
	USoundCue\* ImpactSound \= GetImpactSound(HitSurfaceType);
	if (ImpactSound)
	{
		UGameplayStatics::PlaySoundAtLocation(this, ImpactSound, GetActorLocation());
	}
}

The SurfaceHit variable is applied by SWeaponInstant.cpp.

void ASWeaponInstant::SpawnImpactEffects(const FHitResult& Impact)
{
	if (ImpactTemplate && Impact.bBlockingHit)
	{
		/\* This function prepares an actor to spawn, but requires another call to finish the actual spawn progress. This allows manipulation of properties before entering into the level \*/
		ASImpactEffect\* EffectActor \= GetWorld()\-\>SpawnActorDeferred<ASImpactEffect\>(ImpactTemplate, Impact.ImpactPoint, Impact.ImpactPoint.Rotation());
		if (EffectActor)
		{
			EffectActor\-\>SurfaceHit \= Impact;
			UGameplayStatics::FinishSpawningActor(EffectActor, FTransform(Impact.ImpactNormal.Rotation(), Impact.ImpactPoint));
		}
	}
}

We retrieved this surface information by performing a ray-trace with bReturnPhysicalMaterial = true. (See: SWeapon.cpp)

FHitResult ASWeapon::WeaponTrace(const FVector& TraceFrom, const FVector& TraceTo) const
{
	FCollisionQueryParams TraceParams(TEXT("WeaponTrace"), true, Instigator);
	TraceParams.bTraceAsyncScene \= true;
	TraceParams.bReturnPhysicalMaterial \= true;
 
	FHitResult Hit(ForceInit);
	GetWorld()\-\>LineTraceSingle(Hit, TraceFrom, TraceTo, COLLISION\_WEAPON, TraceParams);
 
	return Hit;
}

Attaching/Detaching Actors using Sockets
----------------------------------------

[![Section2 attachedmeshsockets.jpg](https://d26ilriwvtzlb.cloudfront.net/f/f2/Section2_attachedmeshsockets.jpg)](/File:Section2_attachedmeshsockets.jpg)

Sockets are great for creating your own attach points on skeletal meshes. To use a socket in C++ you must know the name of the socket as specified through the Skeletal Mesh Editor. See the [Docs on how to setup and name Sockets](https://docs.unrealengine.com/latest/INT/Engine/Content/Types/SkeletalMeshes/Sockets/index.html).

In this project we are using it for a couple of things. To attach a weapon to our character's hands, back and pelvis and on the weapon mesh to define the muzzle location. You can use it for many other things too, such as spawning particle FX on your jetpack.

In the code snippet below we retrieve an FName for the slot we wish to attach our weapon to. The AttachTo() function doesn't require you to specify a Bone or Socket, if you omit this value, it will use the root (or pivot) instead.

void ASWeapon::AttachMeshToPawn(EInventorySlot Slot)
{
	if (MyPawn)
	{
		// Remove and hide
		DetachMeshFromPawn();
 
		USkeletalMeshComponent\* PawnMesh \= MyPawn\-\>GetMesh();
		FName AttachPoint \= MyPawn\-\>GetInventoryAttachPoint(Slot);
		Mesh\-\>SetHiddenInGame(false);
		Mesh\-\>AttachTo(PawnMesh, AttachPoint, EAttachLocation::SnapToTarget);
	}
}

Detaching is even simpler:

void ASWeapon::DetachMeshFromPawn()
{
	Mesh\-\>DetachFromParent();
	Mesh\-\>SetHiddenInGame(true);
}

Dealing & handling damage
-------------------------

[![Section2 dealingdamage.jpg](https://d26ilriwvtzlb.cloudfront.net/1/18/Section2_dealingdamage.jpg)](/File:Section2_dealingdamage.jpg)

The engine already have a base framework to support damage. If you're new to Unreal Engine, check out the blog post on [Damage in UE4](https://www.unrealengine.com/blog/damage-in-ue4).

An example on dealing damage to an Actor is available in SWeaponInstant.cpp (Note that Actor already includes the function TakeDamage() ) We override and extend this function in our SCharacter.cpp to update Hitpoints and handle death.

void ASWeaponInstant::DealDamage(const FHitResult& Impact, const FVector& ShootDir)
{
	FPointDamageEvent PointDmg;
	PointDmg.DamageTypeClass \= DamageType;
	PointDmg.HitInfo \= Impact;
	PointDmg.ShotDirection \= ShootDir;
	PointDmg.Damage \= HitDamage;
 
	Impact.GetActor()\-\>TakeDamage(PointDmg.Damage, PointDmg, MyPawn\-\>Controller, this);
}

Another way to deal damage is through UGameplayStatics::ApplyRadialDamage (variations exist like ApplyPointDamage and ApplyRadialDamageWithFalloff) The SBombActor uses it to apply damage to anything within the explosion radius.

void ASBombActor::OnExplode()
{
	if (bExploded)
		return;
 
	// Notify the clients to simulate the explosion
	bExploded \= true;
 
	// Run on server side
	SimulateExplosion();
 
	// Apply damage to player, enemies and environmental objects
	TArray<AActor\*\> IgnoreActors;
	UGameplayStatics::ApplyRadialDamage(this, ExplosionDamage, GetActorLocation(), ExplosionRadius, DamageType, IgnoreActors, this, nullptr);
}

You can specify your own DamageTypes in content and deal with different types individually (eg. ExplosionDamage, FallDamage etc.) and have each type specify different magnitudes of impulse, if any.

Closing
=======

In this section we've added the basics for our gameloop. In the upcoming sections we will introduce enemies and game objective to put all this to use. If you are confused on a particular feature that was covered, feel free to ask about it in the [official section 2 thread](https://forums.unrealengine.com/showthread.php?66263-Announcing-Section-2-for-Survival-Game) for this project.

*   [Main Project Page](https://wiki.unrealengine.com/Survival_sample_game)
*   [Main Forum Thread](https://forums.unrealengine.com/showthread.php?63678-Upcoming-C-Gameplay-Example-Series-Making-a-Survival-Game)
*   [Source on GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Survival\_Sample\_Game:\_Section\_2&oldid=26252](https://wiki.unrealengine.com/index.php?title=Survival_Sample_Game:_Section_2&oldid=26252)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)