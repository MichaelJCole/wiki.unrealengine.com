UT3 Weapons Tutorial - Flak Cannon - Epic Wiki                    

UT3 Weapons Tutorial - Flak Cannon
==================================

Contents
--------

*   [1 UT3 Weapons Tutorial - Flak Cannon](#UT3_Weapons_Tutorial_-_Flak_Cannon)
    *   [1.1 Requirements](#Requirements)
    *   [1.2 Features](#Features)
    *   [1.3 Notes](#Notes)
    *   [1.4 Contact](#Contact)
    *   [1.5 Flak Cannon](#Flak_Cannon)
        *   [1.5.1 Primary Fire](#Primary_Fire)
        *   [1.5.2 Secondary Fire](#Secondary_Fire)
        *   [1.5.3 Shard Projectile](#Shard_Projectile)
        *   [1.5.4 Main Shard Projectile](#Main_Shard_Projectile)
        *   [1.5.5 Shell Projectile](#Shell_Projectile)
    *   [1.6 Implementation](#Implementation)
        *   [1.6.1 Common code](#Common_code)
        *   [1.6.2 Creating Flak Cannon Classes](#Creating_Flak_Cannon_Classes)
        *   [1.6.3 Setting up weapon asset references](#Setting_up_weapon_asset_references)
        *   [1.6.4 Basic Parameters](#Basic_Parameters)
        *   [1.6.5 Playtesting](#Playtesting)
        *   [1.6.6 Adding bounce effects](#Adding_bounce_effects)
            *   [1.6.6.1 Bounce Effect Rotation](#Bounce_Effect_Rotation)
        *   [1.6.7 Making projectile become affected by gravity after bounce](#Making_projectile_become_affected_by_gravity_after_bounce)
        *   [1.6.8 Limiting projectile bounce count](#Limiting_projectile_bounce_count)
        *   [1.6.9 Increasing projectile lifespan after bounce](#Increasing_projectile_lifespan_after_bounce)
        *   [1.6.10 Reducing projectile's damage over time](#Reducing_projectile.27s_damage_over_time)
        *   [1.6.11 Making projectile apply damage only when moving fast enough](#Making_projectile_apply_damage_only_when_moving_fast_enough)
        *   [1.6.12 Flak Cannon main shard](#Flak_Cannon_main_shard)
            *   [1.6.12.1 Adjusting damage based on how much in-the-face the shot was](#Adjusting_damage_based_on_how_much_in-the-face_the_shot_was)
        *   [1.6.13 Making Flak Shell spawn additional shards on explosion](#Making_Flak_Shell_spawn_additional_shards_on_explosion)
        *   [1.6.14 Spawning multiple shards at once](#Spawning_multiple_shards_at_once)
            *   [1.6.14.1 Projectile firing pattern](#Projectile_firing_pattern)
                *   [1.6.14.1.1 Projectile firing pattern randomization](#Projectile_firing_pattern_randomization)
        *   [1.6.15 Camera Shake](#Camera_Shake)
    *   [1.7 Source Code](#Source_Code)

UT3 Weapons Tutorial - Flak Cannon
==================================

This tutorial will show you how to create Flak Cannon from Unreal Tournament 3 using C++ only.

NOTE:

*   UT has just upgraded to UE 4.2.1, this tutorial will be verified for compatibility shortly.

  

Requirements
------------

Some existing C++ & Unreal Engine knowledge is needed.

*   Engine version: 4.2
*   Skill level: intermediate
*   Unreal Tournament commit: [9fe9fc679a26a0ea816e9fd3db080255394bf4dc](https://github.com/EpicGames/UnrealTournament/commit/9fe9fc679a26a0ea816e9fd3db080255394bf4dc)

  

Features
--------

*   Spawnng multiple projectiles at once
*   Controlled firing pattern for multiple projectiles
*   Making projectiles spawn other projectiles upon explosion
*   Adjusting projectile damage based on distance and hit location
*   Adjusting projectile damage over time

  

Notes
-----

*   When overriding a function in subclass always add a definition to the header file as well.
*   Functions with [BlueprintNativeEvent](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/BlueprintNativeEvent/index.html) attribute generate additional virtual function called "FunctionName\_Implementation". Override the \_Implementation one instead.
*   Code snippets are located in grey expandable boxes. Click Expand on the right to see the code.
*   Yellow lines in code snippets highlight only the code that needs to be changed.

  

Contact
-------

*   [unrealtournament.com forum thread](https://forums.unrealtournament.com/showthread.php?11233-UT3-Flak-Cannon-Tutorial&p=82857#post82857)

\--[Neai](/User:Neai "User:Neai") ([talk](/index.php?title=User_talk:Neai&action=edit&redlink=1 "User talk:Neai (page does not exist)")) 17:49, 30 June 2014 (UTC)

  

Flak Cannon
-----------

We'll start by defining what features we want to implement:

### Primary Fire

1.  Fire 9 shard projectiles at once
2.  Main shard should be fired at crosshair
3.  Remaining shards should be fired in a random'ish circle around the main shard
4.  The firing pattern should spread shards evenly inside the firing cone

### Secondary Fire

1.  Fire an explosive shell projectile

### Shard Projectile

1.  Bounces up to 2 times
2.  Is not affected by gravity until it bounces
3.  Can deal damage only when moving fast enough

### Main Shard Projectile

Same as shard projectile except that:

1.  Bounces up to 3 times
2.  Deals additional damage & momentum when firing at point blank at center of enemy

### Shell Projectile

1.  High trajectory
2.  Explodes upon contact
3.  Upon explosion spawns 5 shards

  

Implementation
--------------

To implement such projectile weapon we should create subclasses of **AUTWeapon**, **AUTProjectile**, **UUTDamageType** and **AUTWeaponAttachment**.

### Common code

We will implement some of the features in generic classes which can be later used for other weapons. To keep the tutorial code friendly to engine & game code updates, we will create our own generic subclasses of UTWeapon & UTProjectile instead of modifying them.

Lets start by creating an abstract subclass of **AUTWeapon** called **AUTWeapon\_Boom**. This will be our common base class for UT3 weapons.

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    
2.  #pragma once
    

4.  #include "UTWeapon.h"
    
5.  #include "UTWeapon\_Boom.generated.h"
    

7.  UCLASS(Abstract, NotPlaceable)
    
8.  class AUTWeapon\_Boom : public AUTWeapon
    
9.  {
    
10.  	GENERATED\_UCLASS\_BODY()
    
11.  };
    

We will also need an abstract subclass of **AUTProjectile** called **AUTProjectile\_Boom**. This will be our common base class for UT3 projectiles.

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    
2.  #pragma once
    

4.  #include "UTProjectile.h"
    
5.  #include "UTProjectile\_Boom.generated.h"
    

7.  UCLASS(Abstract, NotPlaceable)
    
8.  class AUTProjectile\_Boom : public AUTProjectile
    
9.  {
    
10.  	GENERATED\_UCLASS\_BODY()
    
11.  };
    

Since we are going to use property values from UT3, we will need to adjust them to UT4 player scale. In UT3 player is 88 units high, in UT4 player is 192 units high. Therefore we need to multiply all projectile velocities, damage radiuses, momentums, etc, to get the same results in UT4. Add the following definition to **UnrealTournament.h** so it's accessible from everywhere:

1.  // Ratio for scaling UT3 distance-related values
    
2.  // See AUTCharacter CapsuleComponent HalfHeight
    
3.  #define UT3\_TO\_UT4\_SCALE (96.f / 44.f)
    

  

### Creating Flak Cannon Classes

Next, lets create classes for all the elements of Flak Cannon:

1.  Weapon
    1.  Create subclass of **AUTWeapon\_Boom** called **AUTWeap\_FlakCannon**
2.  3rd person weapon attachment
    1.  Create subclass of **AUTWeaponAttachment** called **AUTAttachment\_FlakCannon**
3.  Projectiles
    1.  Create subclass of **AUTProjectile\_Boom** called **AUTProj\_FlakShell**
    2.  Create subclass of **AUTProjectile\_Boom** called **AUTProj\_FlakShard**
    3.  Create subclass of **AUTProj\_FlakShard** called **AUTProj\_FlakShardMain**
4.  Damage Types
    1.  Create subclass of **UUTDamageType** called **UTDmgType\_FlakShell**
    2.  Create subclass of **UUTDamageType** called **UTDmgType\_FlakShard**

  

### Setting up weapon asset references

It's a good idea to have a functional weapon at the start, even if the custom logic isn't there yet. We will link all the parts together and assign visual properties. Assigning asset references to properties is very easy in blueprints, but we can do it in C++ as well.

**AUTWeap\_FlakCannon.cpp** - Setup asset references

1.  // Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
    

3.  #include "UnrealTournament.h"
    
4.  #include "UTWeap\_FlakCannon.h"
    
5.  #include "UTProj\_FlakShard.h"
    
6.  #include "UTProj\_FlakShell.h"
    
7.  #include "UTProj\_FlakShardMain.h"
    
8.  #include "UTAttachment\_FlakCannon.h"
    

10.  AUTWeap\_FlakCannon::AUTWeap\_FlakCannon(const FPostConstructInitializeProperties& PCIP)
    
11.  : Super(PCIP)
    
12.  { 
    
13.  	// Asset references
    
14.  	struct FConstructorStatics
    
15.  	{
    
16.  		ConstructorHelpers::FObjectFinder<USkeletalMesh\> SkeletalMesh;
    
17.  		ConstructorHelpers::FObjectFinder<UAnimBlueprintGeneratedClass\> AnimBlueprintGeneratedClass;
    
18.  		ConstructorHelpers::FObjectFinder<UAnimMontage\> FireAnimation0;
    
19.  		ConstructorHelpers::FObjectFinder<UAnimMontage\> FireAnimation1;
    
20.  		ConstructorHelpers::FObjectFinder<UAnimMontage\> BringUpAnim;
    
21.  		ConstructorHelpers::FObjectFinder<UAnimMontage\> PutDownAnim;
    
22.  		ConstructorHelpers::FObjectFinder<USoundCue\> FireSound0;
    
23.  		ConstructorHelpers::FObjectFinder<USoundCue\> FireSound1;
    
24.  		ConstructorHelpers::FObjectFinder<USoundCue\> PickupSound;
    
25.  		ConstructorHelpers::FObjectFinder<UParticleSystem\> MuzzleFlash;
    
26.  		FConstructorStatics()
    
27.  			: SkeletalMesh(TEXT("SkeletalMesh'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Meshes/SK\_WP\_FlakCannon\_1P.SK\_WP\_FlakCannon\_1P'"))
    
28.  			, AnimBlueprintGeneratedClass(TEXT("AnimBlueprintGeneratedClass'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Anim/Flak\_AnimBP.Flak\_AnimBP\_C'"))
    
29.  			, FireAnimation0(TEXT("AnimMontage'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Anim/Flak\_Fire\_Montage.Flak\_Fire\_Montage'"))
    
30.  			, FireAnimation1(TEXT("AnimMontage'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Anim/Flak\_Fire\_Montage.Flak\_Fire\_Montage'"))
    
31.  			, BringUpAnim(TEXT("AnimMontage'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Anim/Flak\_Equip.Flak\_Equip'"))
    
32.  			, PutDownAnim(TEXT("AnimMontage'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Anim/Flak\_PutDown.Flak\_PutDown'"))
    
33.  			, FireSound0(TEXT("SoundCue'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Audio/CUE/A\_FlakCannon\_FireCue.A\_FlakCannon\_FireCue'"))
    
34.  			, FireSound1(TEXT("SoundCue'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Audio/CUE/A\_FlakCannon\_FireAltCue.A\_FlakCannon\_FireAltCue'"))
    
35.  			, PickupSound(TEXT("SoundCue'/Game/RestrictedAssets/Proto/UT3\_Pickups/Audio/Weapons/Cue/A\_Pickup\_Weapons\_Flak\_Cue.A\_Pickup\_Weapons\_Flak\_Cue'"))MuzzleFlash(TEXT("ParticleSystem'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Effects/P\_WP\_FlakCannon\_Muzzle\_Flash.P\_WP\_FlakCannon\_Muzzle\_Flash'"))
    
36.  		{
    
37.  		}
    
38.  	};
    
39.  	static FConstructorStatics ConstructorStatics;
    

42.  	// Mesh
    

44.  	Mesh\-\>SkeletalMesh \= ConstructorStatics.SkeletalMesh.Object;
    
45.  	Mesh\-\>AnimBlueprintGeneratedClass \= ConstructorStatics.AnimBlueprintGeneratedClass.Object;
    
46.  	Mesh\-\>RelativeLocation \= FVector(\-2.349056, \-3.957190, \-5.411549);
    
47.  	Mesh\-\>RelativeScale3D \= FVector(0.750000, 0.750000, 0.750000);
    

49.  	FireAnimation.SetNumZeroed(2);
    
50.  	FireAnimation\[0\] \= ConstructorStatics.FireAnimation0.Object;
    
51.  	FireAnimation\[1\] \= ConstructorStatics.FireAnimation1.Object;
    

53.  	BringUpAnim \= ConstructorStatics.BringUpAnim.Object;
    
54.  	PutDownAnim \= ConstructorStatics.PutDownAnim.Object;
    

57.  	// Muzzle Flash
    

59.  	TSubobjectPtr<UParticleSystemComponent\> MuzzleComponent \= PCIP.CreateDefaultSubobject<UParticleSystemComponent\>(this, TEXT("FlakCannon-MuzzleFlash"));
    
60.  	MuzzleComponent\-\>Template \= ConstructorStatics.MuzzleFlash.Object;
    
61.  	MuzzleComponent\-\>AttachTo(Mesh, FName(TEXT("MuzzleFlashSocket")));
    

63.  	MuzzleFlash.SetNumZeroed(2);
    
64.  	MuzzleFlash\[0\] \= MuzzleComponent;
    
65.  	MuzzleFlash\[1\] \= MuzzleComponent;
    

68.  	// 3rd person
    

70.  	AttachmentType \= AUTAttachment\_FlakCannon::StaticClass();
    

73.  	// Sounds
    

75.  	FireSound.SetNumZeroed(2);
    
76.  	FireSound\[0\] \= ConstructorStatics.FireSound0.Object;
    
77.  	FireSound\[1\] \= ConstructorStatics.FireSound1.Object;
    

79.  	PickupSound \= ConstructorStatics.PickupSound.Object;
    

82.  	// UI
    

84.  	Group \= 7;
    
85.  	IconCoordinates \= FTextureUVs(131.000000, 429.000000, 132.000000, 52.000000);
    

87.  }
    

Notice that assets are loaded statically only once. Asset paths can be copy-pasted straight from editor.

**AUTAttachment\_FlakCannon.cpp** - Setup asset references

1.  #include "UnrealTournament.h"
    
2.  #include "UTAttachment\_FlakCannon.h"
    

4.  AUTAttachment\_FlakCannon::AUTAttachment\_FlakCannon(const class FPostConstructInitializeProperties& PCIP)
    
5.  	: Super(PCIP)
    
6.  {
    
7.  	// Structure to hold one-time initialization
    
8.  	struct FConstructorStatics
    
9.  	{
    
10.  		ConstructorHelpers::FObjectFinder<USkeletalMesh\> SkeletalMesh;
    
11.  		FConstructorStatics()
    
12.  			: SkeletalMesh(TEXT("SkeletalMesh'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Meshes/SK\_WP\_FlakCannon\_3P\_Mid.SK\_WP\_FlakCannon\_3P\_Mid'"))
    
13.  		{
    
14.  		}
    
15.  	};
    
16.  	static FConstructorStatics ConstructorStatics;
    

18.  	Mesh\-\>SkeletalMesh \= ConstructorStatics.SkeletalMesh.Object;
    
19.  }
    

**AUTProj\_FlakShell.cpp** - Setup asset references

1.  #include "UnrealTournament.h"
    
2.  #include "UTProjectileMovementComponent.h"
    
3.  #include "UTProj\_FlakShell.h"
    
4.  #include "UTProj\_FlakShard.h"
    
5.  #include "UTDmgType\_FlakShell.h"
    

7.  AUTProj\_FlakShell::AUTProj\_FlakShell(const class FPostConstructInitializeProperties& PCIP)
    
8.  	: Super(PCIP)
    
9.  {
    
10.  	// Structure to hold one-time initialization
    
11.  	struct FConstructorStatics
    
12.  	{
    
13.  		ConstructorHelpers::FObjectFinder<UParticleSystem\> ExplosionEffect;
    
14.  		ConstructorHelpers::FObjectFinder<USoundCue\> ExplosionSound;
    
15.  		ConstructorHelpers::FObjectFinder<USoundCue\> AmbientSound;
    
16.  		ConstructorHelpers::FObjectFinder<UParticleSystem\> TrailEffect;
    
17.  		FConstructorStatics()
    
18.  			: ExplosionEffect(TEXT("ParticleSystem'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Effects/P\_WP\_Flak\_Alt\_Explosion.P\_WP\_Flak\_Alt\_Explosion'"))
    
19.  			, ExplosionSound(TEXT("SoundCue'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Audio/CUE/A\_FlakCannon\_FireAltImpactExplodeCue.A\_FlakCannon\_FireAltImpactExplodeCue'"))
    
20.  			, AmbientSound(TEXT("SoundCue'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Audio/CUE/A\_FlakCannon\_FireAltInAirCue.A\_FlakCannon\_FireAltInAirCue'"))
    
21.  			, TrailEffect(TEXT("ParticleSystem'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Effects/P\_WP\_Flak\_Alt\_Smoke\_Trail.P\_WP\_Flak\_Alt\_Smoke\_Trail'"))
    
22.  		{
    
23.  		}
    
24.  	};
    
25.  	static FConstructorStatics ConstructorStatics;
    

27.  	// Visuals
    

29.  	TSubobjectPtr<UAudioComponent\> AmbientSound \= PCIP.CreateDefaultSubobject<UAudioComponent\>(this, TEXT("FlakShell-Ambient"));
    
30.  	AmbientSound\-\>Sound \= ConstructorStatics.AmbientSound.Object;
    
31.  	AmbientSound\-\>VolumeMultiplier \= 0.5;
    
32.  	AmbientSound\-\>AttachTo(RootComponent);
    

34.  	TSubobjectPtr<UParticleSystemComponent\> TrailComponent \= PCIP.CreateDefaultSubobject<UParticleSystemComponent\>(this, TEXT("FlakShell-Trail"));
    
35.  	TrailComponent\-\>Template \= ConstructorStatics.TrailEffect.Object;
    
36.  	TrailComponent\-\>SetRelativeLocation(FVector(\-3, 0, 0));
    
37.  	TrailComponent\-\>SetRelativeScale3D(FVector(1.5, 1.5, 1.5));
    
38.  	TrailComponent\-\>AttachTo(RootComponent);
    

40.  	TSubobjectPtr<UPointLightComponent\> LightComponent \= PCIP.CreateDefaultSubobject<UPointLightComponent\>(this, TEXT("FlakShell-Light"));
    
41.  	LightComponent\-\>Intensity \= 150;
    
42.  	LightComponent\-\>AttenuationRadius \= 250;
    
43.  	LightComponent\-\>LightColor \= FColor(47, 209, 255);
    
44.  	LightComponent\-\>SetCastShadows(false);
    
45.  	LightComponent\-\>AttachTo(RootComponent);
    

47.  	ExplosionEffect \= ConstructorStatics.ExplosionEffect.Object;
    
48.  	ExplosionSound \= ConstructorStatics.ExplosionSound.Object;
    
49.  }
    

The mesh is actually set up as part of particle emitter, hence there's no static mesh component.

**AUTProj\_FlakShard.cpp** - Setup asset references

1.  #include "UnrealTournament.h"
    
2.  #include "UTProjectileMovementComponent.h"
    
3.  #include "UTProj\_FlakShard.h"
    
4.  #include "UTDmgType\_FlakShard.h"
    

6.  AUTProj\_FlakShard::AUTProj\_FlakShard(const class FPostConstructInitializeProperties& PCIP)
    
7.  	: Super(PCIP)
    
8.  {
    
9.  	// Structure to hold one-time initialization
    
10.  	struct FConstructorStatics
    
11.  	{
    
12.  		ConstructorHelpers::FObjectFinder<UParticleSystem\> BounceEffect;
    
13.  		ConstructorHelpers::FObjectFinder<USoundCue\> BounceSound;
    
14.  		ConstructorHelpers::FObjectFinder<UStaticMesh\> StaticMesh;
    
15.  		ConstructorHelpers::FObjectFinder<UMaterial\> StaticMeshMaterial0;
    
16.  		ConstructorHelpers::FObjectFinder<UParticleSystem\> TrailEffect;
    
17.  		FConstructorStatics()
    
18.  			: BounceEffect(TEXT("ParticleSystem'/Game/RestrictedAssets/Weapons/Flak/Assets/Flak\_Hit\_Spark.Flak\_Hit\_Spark'"))
    
19.  			, BounceSound(TEXT("SoundCue'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Audio/CUE/A\_FlakCannon\_FireImpactDirtCue.A\_FlakCannon\_FireImpactDirtCue'"))
    
20.  			, StaticMesh(TEXT("StaticMesh'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_FlakCannon/Meshes/S\_Flak\_Chunk.S\_Flak\_Chunk'"))
    
21.  			, StaticMeshMaterial0(TEXT("Material'/Game/RestrictedAssets/Weapons/Flak/Assets/M\_Shard.M\_Shard'"))
    
22.  			, TrailEffect(TEXT("ParticleSystem'/Game/RestrictedAssets/Weapons/Flak/Assets/Trail.Trail'"))
    
23.  		{
    
24.  		}
    
25.  	};
    
26.  	static FConstructorStatics ConstructorStatics;
    

28.  	// Visuals
    

30.  	TSubobjectPtr<UStaticMeshComponent\> StaticMeshComponent \= PCIP.CreateDefaultSubobject<UStaticMeshComponent\>(this, TEXT("FlakShard-StaticMesh"));
    
31.  	StaticMeshComponent\-\>StaticMesh \= ConstructorStatics.StaticMesh.Object;
    
32.  	StaticMeshComponent\-\>bGenerateOverlapEvents \= false;
    
33.  	StaticMeshComponent\-\>SetCollisionProfileName(UCollisionProfile::NoCollision\_ProfileName);
    
34.  	StaticMeshComponent\-\>SetMaterial(0, ConstructorStatics.StaticMeshMaterial0.Object);
    
35.  	StaticMeshComponent\-\>SetRelativeScale3D(FVector(0.25, 0.25, 0.25));
    
36.  	StaticMeshComponent\-\>AttachTo(RootComponent);
    

38.  	TSubobjectPtr<UParticleSystemComponent\> TrailComponent \= PCIP.CreateDefaultSubobject<UParticleSystemComponent\>(this, TEXT("FlakShard-Trail"));
    
39.  	TrailComponent\-\>Template \= ConstructorStatics.TrailEffect.Object;
    
40.  	TrailComponent\-\>AttachTo(RootComponent);
    

42.  	TSubobjectPtr<UPointLightComponent\> LightComponent \= PCIP.CreateDefaultSubobject<UPointLightComponent\>(this, TEXT("FlakShard-Light"));
    
43.  	LightComponent\-\>Intensity \= 100;
    
44.  	LightComponent\-\>AttenuationRadius \= 100;
    
45.  	LightComponent\-\>LightColor \= FColor(255, 133, 35);
    
46.  	LightComponent\-\>SetCastShadows(false);
    
47.  	LightComponent\-\>AttachTo(RootComponent);
    
48.  }
    

  

### Basic Parameters

We're going to use parameter values from UT3. Set them in constructors:

**AUTProj\_FlakShell.cpp** - We will use high TossZ value to give the projectile high trajectory. This way player can aim at distant opponents without having to aim at the sky.

1.  	// Movement
    

3.  	ProjectileMovement\-\>InitialSpeed \= 1200.f \* UT3\_TO\_UT4\_SCALE;
    
4.  	ProjectileMovement\-\>MaxSpeed \= 1200.f \* UT3\_TO\_UT4\_SCALE;
    
5.  	ProjectileMovement\-\>ProjectileGravityScale \= 1.0f;
    

7.  	CollisionComp\-\>InitSphereRadius(10);
    

9.  	TossZ \= 305 \* UT3\_TO\_UT4\_SCALE;
    

12.  	// Damage
    

14.  	MyDamageType \= UUTDmgType\_FlakShell::StaticClass();
    

16.  	DamageParams.BaseDamage \= 100;
    
17.  	DamageParams.OuterRadius \= 200 \* UT3\_TO\_UT4\_SCALE;
    

19.  	Momentum \= 75000 \* UT3\_TO\_UT4\_SCALE;
    

21.  	InitialLifeSpan \= 6;
    

**AUTProj\_FlakShard.cpp** - Lets make it rotate

1.  	// Movement
    

3.  	TSubobjectPtr<URotatingMovementComponent\> RotatingMovement \= PCIP.CreateDefaultSubobject<URotatingMovementComponent\>(this, TEXT("FlakShard-RotatingMovement"));
    
4.  	RotatingMovement\-\>RotationRate \= FRotator(0, 0, 270);
    

6.  	ProjectileMovement\-\>InitialSpeed \= 3500.f \* UT3\_TO\_UT4\_SCALE;
    
7.  	ProjectileMovement\-\>MaxSpeed \= 3500.f \* UT3\_TO\_UT4\_SCALE;
    
8.  	ProjectileMovement\-\>ProjectileGravityScale \= 0.f;
    
9.  	ProjectileMovement\-\>bRotationFollowsVelocity \= false;
    
10.  	ProjectileMovement\-\>bShouldBounce \= true;
    

13.  	// Damage
    

15.  	MyDamageType \= UUTDmgType\_FlakShard::StaticClass();
    
16.  	DamageParams.BaseDamage \= 18.f;
    
17.  	Momentum \= 14000 \* UT3\_TO\_UT4\_SCALE;
    

19.  	InitialLifeSpan \= 2.f;
    

**AUTWeap\_FlakCannon.cpp** - Setting up fire modes

1.  	// Firing
    

3.  	ProjClass.SetNumZeroed(2);
    
4.  	ProjClass\[0\] \= AUTProj\_FlakShardMain::StaticClass();
    
5.  	ProjClass\[1\] \= AUTProj\_FlakShell::StaticClass();
    

7.  	FireInterval.SetNumZeroed(2);
    
8.  	FireInterval\[0\] \= 1.1;
    
9.  	FireInterval\[1\] \= 1.1;
    

11.  	AmmoCost.SetNumZeroed(2);
    
12.  	AmmoCost\[0\] \= 1;
    
13.  	AmmoCost\[1\] \= 1;
    

15.  	Ammo \= 10;
    
16.  	MaxAmmo \= 30;
    

18.  	FireOffset \= FVector(75.f, 18.f, \-15.f);
    

  

### Playtesting

At this point we can test the weapon ingame, although it doesn't have custom logic yet. To test the weapon add an **WeaponBase** Blueprint to level and in its properties make it use our **AUTWeap\_FlakCannon**.

  

### Adding bounce effects

**AUTProjectile\_Boom.h** - Add properties for Bounce Effect assets

1.  	/\*\* Bounce effect \*/
    
2.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Projectile)
    
3.  	UParticleSystem\* BounceEffect;
    

5.  	/\*\* Sound played when projectile bounces off wall \*/
    
6.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Projectile)
    
7.  	USoundBase\* BounceSound;
    

**AUTProjectile\_Boom.cpp** - Override OnBounce to make it play bounce effects

1.  void AUTProjectile\_Boom::OnBounce(const struct FHitResult& ImpactResult, const FVector& ImpactVelocity)
    
2.  {
    
3.  	Super::OnBounce(ImpactResult, ImpactVelocity);
    

5.  	// Spawn bounce effect
    
6.  	if (GetNetMode() !\= NM\_DedicatedServer)
    
7.  	{
    
8.  		UGameplayStatics::SpawnEmitterAtLocation(GetWorld(), BounceEffect, ImpactResult.Location, ImpactResult.ImpactNormal.Rotation(), true);
    
9.  	}
    

11.  	// Play bounce sound
    
12.  	if (BounceSound !\= NULL)
    
13.  	{
    
14.  		UUTGameplayStatics::UTPlaySound(GetWorld(), BounceSound, this, SRT\_IfSourceNotReplicated, false);
    
15.  	}
    
16.  }
    

**AUTProj\_FlakShard.cpp** - Add default assets to constructor

1.  	BounceEffect \= ConstructorStatics.BounceEffect.Object;
    
2.  	BounceSound \= ConstructorStatics.BounceSound.Object;
    

After those changes, shards will spark on bounce and play sound effect.

  

#### Bounce Effect Rotation

Notice that the sparks asset used will spawn in incorrect direction. This is because we're spawning in HitNormal direction, which has X axis pointing away from surface, and the emitter is spawning projectiles in Z axis direction, which in this case will be parallel to floor. The correct fix is to adjust the emitter asset so it spawns in X direction. We can however add a temporary workaround.

**AUTProjectile\_Boom.h** - Lets add a BounceEffectRotation property

1.  	/\*\* Bounce effect \*/
    
2.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Projectile)
    
3.  	FRotator BounceEffectRotation;
    

**AUTProjectile\_Boom.cpp** - We will use it to rotate HitNormal used for BounceEffect spawn rotation

1.  void AUTProjectile\_Boom::OnBounce(const struct FHitResult& ImpactResult, const FVector& ImpactVelocity)
    
2.  {
    
3.  	Super::OnBounce(ImpactResult, ImpactVelocity);
    

5.  	// Spawn bounce effect
    
6.  	if (GetNetMode() !\= NM\_DedicatedServer)
    
7.  	{
    
8.  		UGameplayStatics::SpawnEmitterAtLocation(GetWorld(), BounceEffect, ImpactResult.Location, BounceEffectRotation.RotateVector(ImpactResult.ImpactNormal).Rotation(), true);
    
9.  	}
    

11.  	// Play bounce sound
    
12.  	if (BounceSound !\= NULL)
    
13.  	{
    
14.  		UUTGameplayStatics::UTPlaySound(GetWorld(), BounceSound, this, SRT\_IfSourceNotReplicated, false);
    
15.  	}
    

**AUTProj\_FlakShard.cpp** - Set default BounceEffectRotation in constructor

1.  	BounceEffectRotation \= FRotator(90, 0, 0);
    

  

### Making projectile become affected by gravity after bounce

We want the shards to fly unaffected by gravity initially. Only after bounce they should fall towards floor.

**AUTProj\_FlakShard.cpp** - To do so, lets override OnBounce

1.  void AUTProj\_FlakShard::OnBounce(const struct FHitResult& ImpactResult, const FVector& ImpactVelocity)
    
2.  {
    
3.  	Super::OnBounce(ImpactResult, ImpactVelocity);
    

5.  	// Set gravity on bounce
    
6.  	ProjectileMovement\-\>ProjectileGravityScale \= 1.f;
    
7.  }
    

  

### Limiting projectile bounce count

Next we will limit number of bounces to 2, as this is how UT3 Flak Shards work.

**AUTProj\_FlakShard.h** - Add 2 new properties to define max number of bounces and current number of bounces

1.  	/\*\* Limit number of bounces \*/
    
2.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
3.  	int32 BounceLimit;
    

5.  	/\*\* Current number of times this projectile bounced \*/
    
6.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
7.  	int32 BounceCount;
    

**AUTProj\_FlakShard.cpp** - Set default number of bounces in constructor

1.  	BounceLimit \= 2;
    

**AUTProj\_FlakShard.cpp** - Count the number of bounces in OnBounce and disable bouncing once limit is reached

1.  void AUTProj\_FlakShard::OnBounce(const struct FHitResult& ImpactResult, const FVector& ImpactVelocity)
    
2.  {
    
3.  	Super::OnBounce(ImpactResult, ImpactVelocity);
    

5.  	// Set gravity on bounce
    
6.  	ProjectileMovement\-\>ProjectileGravityScale \= 1.f;
    

8.  	// Limit number of bounces
    
9.  	if (++BounceCount \== BounceLimit)
    
10.  	{
    
11.  		ProjectileMovement\-\>bShouldBounce \= false;
    
12.  	}
    
13.  }
    

  

### Increasing projectile lifespan after bounce

We want to ensure that shards will fly for a bit after bouncing. Each projectile has a InitialLifeSpan property set that will limit how long this projectile can exist. Combined with velocity it affects maximum shooting distance.

**AUTProj\_FlakShard.h** - Add 2 new properties for increasing lifespan after bounce and an extra one after final bounce

1.  	/\*\* Increment lifespan on bounce by this amount \*/
    
2.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
3.  	float BounceLifeSpanIncrement;
    

5.  	/\*\* Increment lifespan when projectile stops by this amount \*/
    
6.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
7.  	float BounceFinalLifeSpanIncrement;
    

**AUTProj\_FlakShard.cpp** - Set default values for bonus lifespan

1.  	BounceLifeSpanIncrement \= 0.5f;
    
2.  	BounceFinalLifeSpanIncrement \= 0.25f;
    

**AUTProj\_FlakShard.cpp** - Count the number of bounces in OnBounce and disable bouncing once limit is reached

1.  void AUTProj\_FlakShard::OnBounce(const struct FHitResult& ImpactResult, const FVector& ImpactVelocity)
    
2.  {
    
3.  	Super::OnBounce(ImpactResult, ImpactVelocity);
    

5.  	// Set gravity on bounce
    
6.  	ProjectileMovement\-\>ProjectileGravityScale \= 1.f;
    

8.  	// Extend lifespan on bounce
    
9.  	SetLifeSpan(GetLifeSpan() + BounceLifeSpanIncrement);
    

11.  	// Limit number of bounces
    
12.  	if (++BounceCount \== BounceLimit)
    
13.  	{
    
14.  		ProjectileMovement\-\>bShouldBounce \= false;
    
15.  		SetLifeSpan(GetLifeSpan() + BounceFinalLifeSpanIncrement);
    
16.  	}
    
17.  }
    

  

### Reducing projectile's damage over time

Flak Shards lose 5 damage per second of flight. To implement that we'll need to add function that calculate actual damage instead of using only properties. While we're at it, we'll add dynamic momentum calculation as well, which will come handy later.

**AUTProjectile\_Boom.h** - Add DamageAttenuation property that will deteermine amount of damage lost per second, and 2 new functions.

1.  	/\*\* Damage reduction per second, down to minimum damage\*/
    
2.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Damage)
    
3.  	float DamageAttenuation;
    

5.  	/\*\* Base damage calculation \*/
    
6.  	UFUNCTION(BlueprintCallable, Category \= Projectile)
    
7.  	virtual float GetDamage(AActor\* OtherActor, const FVector& HitLocation);
    

9.  	/\*\* Momentum calculation \*/
    
10.  	UFUNCTION(BlueprintCallable, Category \= Projectile)
    
11.  	virtual float GetMomentum(AActor\* OtherActor, const FVector& HitLocation);
    

**AUTProjectile\_Boom.cpp** - If DamageAttenuation is set, GetDamage() will return reduced damage.

1.  float AUTProjectile\_Boom::GetDamage(AActor\* OtherActor, const FVector& HitLocation)
    
2.  {
    
3.  	if (DamageAttenuation \> 0)
    
4.  	{
    
5.  		return FMath::Max(DamageParams.BaseDamage \- (GetWorld()\-\>TimeSeconds \- CreationTime) \* DamageAttenuation, DamageParams.MinimumDamage);
    
6.  	}
    
7.  	return DamageParams.BaseDamage;
    
8.  }
    

**AUTProjectile\_Boom.cpp** - GetMomentum() will return standard momentum by default.

1.  float AUTProjectile\_Boom::GetMomentum(AActor\* OtherActor, const FVector& HitLocation)
    
2.  {
    
3.  	return Momentum;
    
4.  }
    

**AUTProjectile\_Boom.cpp** - To adjust damage & momentum of explosions, override Explode\_Implementation().

1.  void AUTProjectile\_Boom::Explode\_Implementation(const FVector& HitLocation, const FVector& HitNormal)
    
2.  {
    
3.  	if (!bExploded)
    
4.  	{
    
5.  		if (DamageParams.OuterRadius \> 0.0f)
    
6.  		{
    
7.  			TArray<AActor\*\> IgnoreActors;
    
8.  			if (ImpactedActor !\= NULL)
    
9.  			{
    
10.  				IgnoreActors.Add(ImpactedActor);
    
11.  			}
    
12.  			const float AdjustedDamage \= GetDamage(NULL, HitLocation);
    
13.  			const float AdjustedMomentum \= GetMomentum(NULL, HitLocation);
    
14.  			UUTGameplayStatics::UTHurtRadius(this, AdjustedDamage, DamageParams.MinimumDamage, AdjustedMomentum, HitLocation, DamageParams.InnerRadius, DamageParams.OuterRadius, DamageParams.DamageFalloff, MyDamageType, IgnoreActors, this, InstigatorController);
    
15.  		}
    
16.  		if (Role \== ROLE\_Authority)
    
17.  		{
    
18.  			bTearOff \= true;
    
19.  		}
    
20.  		bExploded \= true;
    
21.  		UUTGameplayStatics::UTPlaySound(GetWorld(), ExplosionSound, this, ESoundReplicationType::SRT\_IfSourceNotReplicated);
    
22.  		if (GetNetMode() !\= NM\_DedicatedServer)
    
23.  		{
    
24.  			UGameplayStatics::SpawnEmitterAtLocation(GetWorld(), ExplosionEffect, GetActorLocation(), HitNormal.Rotation(), true);
    
25.  		}
    
26.  		ShutDown();
    
27.  	}
    
28.  }
    

In current version of UT we had to copy paste entire function from AUT\_projectile, as applying radius damage is not split into own function yet.

**AUTWeapon\_Boom.cpp** - To adjust damage & momentum of direct damage, override DamageImpactedActor\_Implementation

1.  void AUTProjectile\_Boom::DamageImpactedActor\_Implementation(AActor\* OtherActor, UPrimitiveComponent\* OtherComp, const FVector& HitLocation, const FVector& HitNormal)
    
2.  {
    
3.  	const float AdjustedDamage \= GetDamage(OtherActor, HitLocation);
    
4.  	const float AdjustedMomentum \= GetMomentum(OtherActor, HitLocation);
    
5.  	// treat as point damage if projectile has no radius
    
6.  	if (DamageParams.OuterRadius \> 0.0f)
    
7.  	{
    
8.  		FUTRadialDamageEvent Event;
    
9.  		Event.Params \= DamageParams;
    
10.  		Event.Params.MinimumDamage \= AdjustedDamage; // force full damage for direct hit
    
11.  		Event.DamageTypeClass \= MyDamageType;
    
12.  		Event.Origin \= HitLocation;
    
13.  		Event.BaseMomentumMag \= AdjustedMomentum;
    
14.  		new(Event.ComponentHits) FHitResult(OtherActor, OtherComp, HitLocation, HitNormal);
    
15.  		Event.ComponentHits\[0\].TraceStart \= HitLocation \- GetVelocity();
    
16.  		Event.ComponentHits\[0\].TraceEnd \= HitLocation + GetVelocity();
    
17.  		OtherActor\-\>TakeDamage(AdjustedDamage, Event, InstigatorController, this);
    
18.  	}
    
19.  	else
    
20.  	{
    
21.  		FUTPointDamageEvent Event;
    
22.  		Event.Damage \= AdjustedDamage;
    
23.  		Event.DamageTypeClass \= MyDamageType;
    
24.  		Event.HitInfo \= FHitResult(OtherActor, OtherComp, HitLocation, HitNormal);
    
25.  		Event.ShotDirection \= GetVelocity().SafeNormal();
    
26.  		Event.Momentum \= Event.ShotDirection \* AdjustedMomentum;
    
27.  		OtherActor\-\>TakeDamage(AdjustedDamage, Event, InstigatorController, this);
    
28.  	}
    
29.  }
    

**AUTProj\_FlakShard.cpp** - Finally set default DamageAttentuation in Flak Shard constructor

1.  	DamageAttenuation \= 5.f;
    

  

### Making projectile apply damage only when moving fast enough

Flak Shards deal damage only when moving over 400 UU/s. This way shards that lost much of the velocity after bounce won't hit you.

**AUTProj\_FlakShard.h** - Add MinDamageSpeed property to determine minimum speed required to apply damage.

1.  	/\*\* Minimum speed at which damage can be applied \*/
    
2.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
3.  	float MinDamageSpeed;
    

**AUTProj\_FlakShard.cpp** - Set default MinDamageSpeed in FlakShard constructor.

1.  	MinDamageSpeed \= 400.f \* UT3\_TO\_UT4\_SCALE;
    

**AUTProj\_FlakShard.cpp** - With our custom GetDamage() function in place, override it in FlakShard to adjust its damage.

1.  float AUTProj\_FlakShard::GetDamage(AActor\* OtherActor, const FVector& HitLocation)
    
2.  {
    
3.  	// Apply damage only when moving fast enough
    
4.  	if (GetVelocity().Size() \> MinDamageSpeed)
    
5.  	{
    
6.  		return Super::GetDamage(OtherActor, HitLocation);
    
7.  	}
    
8.  	return 0.f;
    
9.  }
    

  

### Flak Cannon main shard

Flak Cannon fires a special shard at the center. It always fires at crosshair, can bounce 3 times and deals additional damage at close range.

**AUTProj\_FlakShardMain.cpp** - Increase BounceLimit to 3 in FlakShardMain constructor.

1.  	BounceLimit \= 3;
    

  

#### Adjusting damage based on how much in-the-face the shot was

Main Flak Shard deals bonus damage at very close range. Additionally it deals more damage when aiming at center of enemy.

**AUTProj\_FlakShardMain.h** - Add properties for bonus damage and momentum. To check how far the projectile travelled we will use the same method as in UT3 - checking elapsed LifeSpan

1.  	/\*\* Momentum bonus for point blank shots \*/
    
2.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
3.  	float CenteredMomentumBonus;
    

5.  	/\*\* Damage bonus for point blank shots \*/
    
6.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
7.  	float CenteredDamageBonus;
    

9.  	/\*\* Timeout for point blank shots \*/
    
10.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
11.  	float MaxBonusTime;
    

**AUTProj\_FlakShardMain.cpp** - Set default properties in constructor

1.  	CenteredMomentumBonus \= 90000 \* UT3\_TO\_UT4\_SCALE;
    
2.  	CenteredDamageBonus \= 100.0;
    
3.  	MaxBonusTime \= 0.2;
    

**AUTProj\_FlakShardMain.cpp** - Override GetDamage() & GetMomentum() to return adjusted valued

1.  /\*\*
    
2.  \* Increase damage to UTPawns based on how centered this shard is on target.  If it is within the time MaxBonusTime time period.
    
3.  \* e.g. point blank shot with the flak cannon you will do mega damage.  Once MaxBonusTime passes then this shard becomes a normal shard.
    
4.  \*/
    
5.  float AUTProj\_FlakShardMain::GetDamage(AActor\* OtherActor, const FVector& HitLocation)
    
6.  {
    
7.  	const float CalculatedDamage \= Super::GetDamage(OtherActor, HitLocation);
    

9.  	// When hitting a pawn within bonus point blank time
    
10.  	AUTCharacter\* OtherCharacter \= Cast<AUTCharacter\>(OtherActor);
    
11.  	const float BonusTime \= GetLifeSpan() \- InitialLifeSpan + MaxBonusTime;
    
12.  	if (CalculatedDamage \> 0.f && OtherCharacter !\= NULL && BonusTime \> 0)
    
13.  	{
    
14.  		// Apply bonus damage
    
15.  		const float CharacterRadius \= OtherCharacter\-\>GetSimpleCollisionRadius();
    
16.  		const float OffCenterDistance \= FMath::PointDistToLine(OtherActor\-\>GetActorLocation(), GetVelocity().SafeNormal(), HitLocation);
    
17.  		const float OffCenterMultiplier \= FMath::Max(0.f, 2.f \* (CharacterRadius \- OffCenterDistance)) / CharacterRadius;
    
18.  		const float BonusDamage \= CenteredDamageBonus \* BonusTime \* OffCenterMultiplier;
    
19.  		return CalculatedDamage + BonusDamage;
    
20.  	}
    
21.  	return CalculatedDamage;
    
22.  }
    

24.  /\*\*
    
25.  \* Increase momentum imparted based on how recently this shard was fired
    
26.  \*/
    
27.  float AUTProj\_FlakShardMain::GetMomentum(AActor\* OtherActor, const FVector& HitLocation)
    
28.  {
    
29.  	// When hitting something within bonus point blank time
    
30.  	const float Momentum \= Super::GetMomentum(OtherActor, HitLocation);
    
31.  	const float BonusTime \= GetLifeSpan() \- InitialLifeSpan + MaxBonusTime;
    
32.  	if (BonusTime \> 0)
    
33.  	{
    
34.  		// Apply bonus momentum
    
35.  		return Momentum + CenteredMomentumBonus \* BonusTime;
    
36.  	}
    

38.  	return Momentum;
    
39.  }
    

  

### Making Flak Shell spawn additional shards on explosion

Flak Shell should spawn 5 shards on explosion. The shards should fly away from hit surface.

**AUTProj\_FlakShell.h** - Add properties to FlakShell for number of shards to spawn, angle to spawn and class to use.

1.  	/\*\* Number of shards to spawn \*/
    
2.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
3.  	int32 ShardSpawnCount;
    

5.  	/\*\* Angle for spawning shards, relative to hit normal \*/
    
6.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
7.  	float ShardSpawnAngle;
    

9.  	/\*\* Shard class type \*/
    
10.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Flak Cannon")
    
11.  	TSubclassOf<AUTProjectile\> ShardClass;
    

**AUTProj\_FlakShell.cpp** - Set default properties in FlakShell constructor

1.  	ShardClass \= AUTProj\_FlakShard::StaticClass();
    
2.  	ShardSpawnCount \= 5;
    
3.  	ShardSpawnAngle \= 85;
    

**AUTProj\_FlakShell.cpp** - Override Explode\_Implementation() to spawn additional projectiles

1.  void AUTProj\_FlakShell::Explode\_Implementation(const FVector& HitLocation, const FVector& HitNormal)
    
2.  {
    
3.  	// On explosion spawn additional flak shards
    
4.  	if (!bExploded && Role \== ROLE\_Authority && ShardClass && ShardSpawnCount \> 0)
    
5.  	{
    
6.  		// Setup spawn parameters
    
7.  		FActorSpawnParameters Params;
    
8.  		Params.Instigator \= Instigator;
    
9.  		Params.Owner \= Instigator;
    
10.  		Params.bNoCollisionFail \= true;
    

12.  		for (int32 i \= 0; i < ShardSpawnCount; ++i)
    
13.  		{
    
14.  			// Randomize spawn direction along hit normal
    
15.  			const FRotator SpawnRotation \= FMath::VRandCone(HitNormal, FMath::DegreesToRadians(ShardSpawnAngle)).Rotation();
    

17.  			// Spawn shard
    
18.  			GetWorld()\-\>SpawnActor<AUTProjectile\>(ShardClass, HitLocation, SpawnRotation, Params);
    
19.  		}
    
20.  	}
    

22.  	Super::Explode\_Implementation(HitLocation, HitNormal);
    
23.  }
    

  

### Spawning multiple shards at once

Last but not least, we're going to add ability to spawn multiple projectiles at once from a weapon.

**AUTWeapon\_Boom.h** - Add properties for number of projectiles to fire and class for additional projectiles

1.  	/\*\* Number of projectiles to fire.
    
2.   \* When firing multiple projectiles at once, main projectile will be fired at crosshair.
    
3.   \* Remaining projectiles will be fired in a circle pattern \*/
    
4.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
5.  	TArray<int32\> MultiShotCount;
    

7.  	/\*\* Projectile class to use when firing multiple projectiles at once.
    
8.   \* This is only for additional projectiles, main projectile will use ProjClass. 
    
9.   \* If not specified, ProjClass will be used. \*/
    
10.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
11.  	TArray< TSubclassOf<AUTProjectile\> \> MultiShotProjClass;
    

**AUTWeapon\_Boom.cpp** - Override FireProjectile() to spawn multiple projectiles at once. In this snippet projectiles will be spawned using default weapon's spread.

1.  AUTProjectile\* AUTWeapon\_Boom::FireProjectile()
    
2.  {
    
3.  	if (GetUTOwner() \== NULL)
    
4.  	{
    
5.  		UE\_LOG(UT, Warning, TEXT("%s::FireProjectile(): Weapon is not owned (owner died during firing sequence)"));
    
6.  		return NULL;
    
7.  	}
    
8.  	else if (Role \== ROLE\_Authority)
    
9.  	{
    
10.  		// try and fire a projectile
    
11.  		checkSlow(ProjClass.IsValidIndex(CurrentFireMode) && ProjClass\[CurrentFireMode\] !\= NULL);
    

13.  		// increment 3rd person muzzle flash count
    
14.  		UTOwner\-\>IncrementFlashCount(CurrentFireMode);
    

16.  		// Setup spawn parameters
    
17.  		FActorSpawnParameters Params;
    
18.  		Params.Instigator \= UTOwner;
    
19.  		Params.Owner \= UTOwner;
    
20.  		Params.bNoCollisionFail \= true;
    

22.  		// Get muzzle location and rotation
    
23.  		const FVector SpawnLocation \= GetFireStartLoc();
    
24.  		const FRotator SpawnRotation \= GetAdjustedAim(SpawnLocation);
    

26.  		// Fire projectiles
    
27.  		AUTProjectile\* MainProjectile \= NULL;
    
28.  		if (MultiShotCount.IsValidIndex(CurrentFireMode) && MultiShotCount\[CurrentFireMode\] \> 1)
    
29.  		{
    
30.  			for (int32 i \= 0; i < MultiShotCount\[CurrentFireMode\]; ++i)
    
31.  			{
    
32.  				// Get firing location and rotation for this projectile
    
33.  				const FVector MultiShotLocation \= GetFireStartLoc();
    
34.  				const FRotator MultiShotRotation \= GetAdjustedAim(SpawnLocation);
    

36.  				// Get projectile class
    
37.  				TSubclassOf<AUTProjectile\> ProjectileClass \= ProjClass\[CurrentFireMode\];
    
38.  				if (i !\= 0 && MultiShotProjClass.IsValidIndex(CurrentFireMode) && MultiShotProjClass\[CurrentFireMode\] !\= NULL)
    
39.  				{
    
40.  					ProjectileClass \= MultiShotProjClass\[CurrentFireMode\];
    
41.  				}
    

43.  				// Spawn projectile
    
44.  				AUTProjectile\* MultiShot \= GetWorld()\-\>SpawnActor<AUTProjectile\>(ProjectileClass, MultiShotLocation, MultiShotRotation, Params);
    
45.  				if (MainProjectile \== NULL)
    
46.  				{
    
47.  					MainProjectile \= MultiShot;
    
48.  				}
    
49.  			}
    
50.  		}
    
51.  		else
    
52.  		{
    
53.  			// Spawn projectile
    
54.  			MainProjectile \= GetWorld()\-\>SpawnActor<AUTProjectile\>(ProjClass\[CurrentFireMode\], SpawnLocation, SpawnRotation, Params);
    
55.  		}
    
56.  		return MainProjectile;
    
57.  	}
    
58.  	else
    
59.  	{
    
60.  		return NULL;
    
61.  	}
    
62.  }
    

This will spawn MultiShotCount projectiles on firing.

**AUTWeap\_FlakCannon.cpp** - Add multishot default properties

1.  	MultiShotCount.SetNumZeroed(1);
    
2.  	MultiShotCount\[0\] \= 9;
    

4.  	MultiShotProjClass.SetNumZeroed(1);
    
5.  	MultiShotProjClass\[0\] \= AUTProj\_FlakShard::StaticClass();
    

  

#### Projectile firing pattern

Flak Cannon fires shards in distinct semi-random pattern. Main shard is fired at crosshair. Each additional projectile then is fired at equally spaced fragment of firing cone circle. Slight location & rotation randomization is still applied but the shards are guaranteed to cover entire firing cone. This makes the weapon more predictable which is good for pro gaming. We're going to implement this pattern as default for multi-shot weapons.

  

**AUTWeapon\_Boom.h** - Add property for angle of firing pattern and two functions to return firing location & rotation of individual projectiles.

1.  	/\*\* Firing cone angle in degrees.
    
2.   \* Applies to individual projectiles when firing multiple at once. \*/
    
3.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
4.  	TArray<FRotator\> MultiShotAngle;
    

6.  	/\*\* Returns projectile spawn location when firing multiple projectiles at once \*/
    
7.  	UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category \= "Weapon")
    
8.  	FVector GetFireLocationForMultiShot(int32 MultiShotIndex, const FVector& FireLocation, const FRotator& FireRotation);
    

10.  	/\*\* Returns projectile spawn rotation when firing multiple projectiles at once \*/
    
11.  	UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category \= "Weapon")
    
12.  	FRotator GetFireRotationForMultiShot(int32 MultiShotIndex, const FVector& FireLocation, const FRotator& FireRotation);
    

**AUTWeap\_FlakCannon.cpp** - Add multishot default properties

1.  	MultiShotAngle.SetNumZeroed(1);
    
2.  	MultiShotAngle\[0\] \= FRotator(0, 3, 0);
    

**AUTWeapon\_Boom.cpp** - Implement GetFireLocationForMultiShot(). We will add randomization later.

1.  FVector AUTWeapon\_Boom::GetFireLocationForMultiShot\_Implementation(int32 MultiShotIndex, const FVector& FireLocation, const FRotator& FireRotation)
    
2.  {
    
3.  	// Main projectile fires straight from muzzle center
    
4.  	return FireLocation;
    
5.  }
    

**AUTWeapon\_Boom.cpp** - Implement GetFireRotationForMultiShot(). We will add randomization later.

1.  FRotator AUTWeapon\_Boom::GetFireRotationForMultiShot\_Implementation(int32 MultiShotIndex, const FVector& FireLocation, const FRotator& FireRotation)
    
2.  {
    
3.  	if (MultiShotIndex \> 0 && MultiShotAngle.IsValidIndex(CurrentFireMode))
    
4.  	{
    
5.  		// Each additional projectile can have own fragment of firing cone.
    
6.  		// This way there are no empty spots in firing cone due to randomness.
    
7.  		// While still randomish, the pattern is predictable, which is good for pro gaming.
    

9.  		// Get direction at fragment of firing cone
    
10.  		const float Alpha \= (float)(MultiShotIndex \- 1) / (float)(MultiShotCount\[CurrentFireMode\] \- 1);
    
11.  		const FRotator ConeSector \= FRotator(0, 0, 360.f \* Alpha);
    
12.  		FVector FireDirection \= ConeSector.RotateVector(MultiShotAngle\[CurrentFireMode\].Vector());
    

14.  		// Return firing cone rotated by player's firing rotation
    
15.  		return FireRotation.RotateVector(FireDirection).Rotation();
    
16.  	}
    

18.  	// Main projectile fires straight at crosshair
    
19.  	return FireRotation;
    
20.  }
    

**AUTWeapon\_Boom.cpp** - Modify FireProjectile() so it uses our functions

1.  AUTProjectile\* AUTWeapon\_Boom::FireProjectile()
    
2.  {
    
3.  	if (GetUTOwner() \== NULL)
    
4.  	{
    
5.  		UE\_LOG(UT, Warning, TEXT("%s::FireProjectile(): Weapon is not owned (owner died during firing sequence)"));
    
6.  		return NULL;
    
7.  	}
    
8.  	else if (Role \== ROLE\_Authority)
    
9.  	{
    
10.  		// try and fire a projectile
    
11.  		checkSlow(ProjClass.IsValidIndex(CurrentFireMode) && ProjClass\[CurrentFireMode\] !\= NULL);
    

13.  		// increment 3rd person muzzle flash count
    
14.  		UTOwner\-\>IncrementFlashCount(CurrentFireMode);
    

16.  		// Setup spawn parameters
    
17.  		FActorSpawnParameters Params;
    
18.  		Params.Instigator \= UTOwner;
    
19.  		Params.Owner \= UTOwner;
    
20.  		Params.bNoCollisionFail \= true;
    

22.  		// Get muzzle location and rotation
    
23.  		const FVector SpawnLocation \= GetFireStartLoc();
    
24.  		const FRotator SpawnRotation \= GetAdjustedAim(SpawnLocation);
    

26.  		// Fire projectiles
    
27.  		AUTProjectile\* MainProjectile \= NULL;
    
28.  		if (MultiShotCount.IsValidIndex(CurrentFireMode) && MultiShotCount\[CurrentFireMode\] \> 1)
    
29.  		{
    
30.  			for (int32 i \= 0; i < MultiShotCount\[CurrentFireMode\]; ++i)
    
31.  			{
    
32.  				// Get firing location and rotation for this projectile
    
33.  				const FVector MultiShotLocation \= GetFireLocationForMultiShot(i, SpawnLocation, SpawnRotation);
    
34.  				const FRotator MultiShotRotation \= GetFireRotationForMultiShot(i, SpawnLocation, SpawnRotation);
    

36.  				// Get projectile class
    
37.  				TSubclassOf<AUTProjectile\> ProjectileClass \= ProjClass\[CurrentFireMode\];
    
38.  				if (i !\= 0 && MultiShotProjClass.IsValidIndex(CurrentFireMode) && MultiShotProjClass\[CurrentFireMode\] !\= NULL)
    
39.  				{
    
40.  					ProjectileClass \= MultiShotProjClass\[CurrentFireMode\];
    
41.  				}
    

43.  				// Spawn projectile
    
44.  				AUTProjectile\* MultiShot \= GetWorld()\-\>SpawnActor<AUTProjectile\>(ProjectileClass, MultiShotLocation, MultiShotRotation, Params);
    
45.  				if (MainProjectile \== NULL)
    
46.  				{
    
47.  					MainProjectile \= MultiShot;
    
48.  				}
    
49.  			}
    
50.  		}
    
51.  		else
    
52.  		{
    
53.  			// Spawn projectile
    
54.  			MainProjectile \= GetWorld()\-\>SpawnActor<AUTProjectile\>(ProjClass\[CurrentFireMode\], SpawnLocation, SpawnRotation, Params);
    
55.  		}
    
56.  		return MainProjectile;
    
57.  	}
    
58.  	else
    
59.  	{
    
60.  		return NULL;
    
61.  	}
    
62.  }
    

  

##### Projectile firing pattern randomization

Right now projectiles are fired in perfect circle pattern. We're going to randomize starting location and rotation.

**AUTWeapon\_Boom.h** - Add properrties for location & rotation randomization

1.  	/\*\* Firing location randomness, in unreal units.
    
2.   \* Applies to individual projectiles when firing multiple at once \*/
    
3.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
4.  	TArray<FVector\> MultiShotLocationSpread;
    

6.  	/\*\* Firing direction randomness, in degrees. 
    
7.   \* Applies to individual projectiles when firing multiple at once \*/
    
8.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
9.  	TArray<float\> MultiShotRotationSpread;
    

**AUTWeapon\_Boom.cpp** - Modify GetFireLocationForMultiShot() so it returns adjusted location.

1.  FVector AUTWeapon\_Boom::GetFireLocationForMultiShot\_Implementation(int32 MultiShotIndex, const FVector& FireLocation, const FRotator& FireRotation)
    
2.  {
    
3.  	if (MultiShotIndex \> 0 && MultiShotLocationSpread.IsValidIndex(CurrentFireMode))
    
4.  	{
    
5.  		// Randomise each projectile's spawn location if needed.
    
6.  		return FireLocation + FireRotation.RotateVector(FMath::VRand() \* MultiShotLocationSpread\[CurrentFireMode\]);
    
7.  	}
    

9.  	// Main projectile fires straight from muzzle center
    
10.  	return FireLocation;
    
11.  }
    

**AUTWeapon\_Boom.cpp** - Modify GetFireRotationForMultiShot() so it returns adjusted rotation.

1.  FRotator AUTWeapon\_Boom::GetFireRotationForMultiShot\_Implementation(int32 MultiShotIndex, const FVector& FireLocation, const FRotator& FireRotation)
    
2.  {
    
3.  	if (MultiShotIndex \> 0 && MultiShotAngle.IsValidIndex(CurrentFireMode))
    
4.  	{
    
5.  		// Each additional projectile can have own fragment of firing cone.
    
6.  		// This way there are no empty spots in firing cone due to randomness.
    
7.  		// While still randomish, the pattern is predictable, which is good for pro gaming.
    

9.  		// Get direction at fragment of firing cone
    
10.  		const float Alpha \= (float)(MultiShotIndex \- 1) / (float)(MultiShotCount\[CurrentFireMode\] \- 1);
    
11.  		const FRotator ConeSector \= FRotator(0, 0, 360.f \* Alpha);
    
12.  		FVector FireDirection \= ConeSector.RotateVector(MultiShotAngle\[CurrentFireMode\].Vector());
    

14.  		// Randomise each projectile's spawn rotation if needed 
    
15.  		if (MultiShotRotationSpread.IsValidIndex(CurrentFireMode))
    
16.  		{
    
17.  			FireDirection \= FMath::VRandCone(FireDirection, FMath::DegreesToRadians(MultiShotRotationSpread\[CurrentFireMode\]));
    
18.  		}
    

20.  		// Return firing cone rotated by player's firing rotation
    
21.  		return FireRotation.RotateVector(FireDirection).Rotation();
    
22.  	}
    

24.  	// Main projectile fires straight at crosshair
    
25.  	return FireRotation;
    
26.  }
    

**AUTWeap\_FlakCannon.cpp** - Add firing pattern default properties

1.  	MultiShotLocationSpread.SetNumZeroed(1);
    
2.  	MultiShotLocationSpread\[0\] \= FVector(0, 3, 3);
    

4.  	MultiShotRotationSpread.SetNumZeroed(1);
    
5.  	MultiShotRotationSpread\[0\] \= 3;
    

  

### Camera Shake

We can add camera shake as well to our base class. This way it can be used by all weapons.

**AUTWeapon\_Boom.h** - Add camera shake properties and function

2.  	/\*\* delay between firing and camera shake being played \*/
    
3.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
4.  	TArray<float\> CameraShakeDelay;
    

6.  	/\*\* how strong camera shake should be \*/
    
7.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
8.  	TArray<float\> CameraShakeScale;
    

10.  	/\*\* camera shake type \*/
    
11.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
12.  	TArray< TSubclassOf<class UCameraShake\> \> CameraShakeType;
    

14.  	/\*\* Plays camera shake immediately \*/
    
15.  	UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category \= "Weapon")
    
16.  	void PlayCameraShake();
    

**AUTWeapon\_Boom.cpp** - Add PlayCameraShake() implementation

1.  void AUTWeapon\_Boom::PlayCameraShake\_Implementation()
    
2.  {
    
3.  	if (UTOwner !\= NULL)
    
4.  	{
    
5.  		AUTPlayerController\* PC \= Cast<AUTPlayerController\>(UTOwner\-\>Controller);
    
6.  		if (PC !\= NULL)
    
7.  		{
    
8.  			// Play camera shake
    
9.  			if (CameraShakeType.IsValidIndex(CurrentFireMode) && CameraShakeType\[CurrentFireMode\] !\= NULL && CameraShakeScale.IsValidIndex(CurrentFireMode))
    
10.  			{
    
11.  				PC\-\>ClientPlayCameraShake(CameraShakeType\[CurrentFireMode\], CameraShakeScale\[CurrentFireMode\]);
    
12.  			}
    
13.  		}
    
14.  	}
    
15.  }
    

**AUTWeapon\_Boom.cpp** - Override PlayFiringEffects() so it calls our PlayCameraShake() function

1.  void AUTWeapon\_Boom::PlayFiringEffects()
    
2.  {
    
3.  	Super::PlayFiringEffects();
    

5.  	// Play camera shake after optional delay
    
6.  	if (CameraShakeDelay.IsValidIndex(CurrentFireMode) && CameraShakeDelay\[CurrentFireMode\] \> 0)
    
7.  	{
    
8.  		GetWorldTimerManager().SetTimer(this, &AUTWeapon\_Boom::PlayCameraShake, CameraShakeDelay\[CurrentFireMode\], false);
    
9.  	}
    
10.  	else
    
11.  	{
    
12.  		PlayCameraShake();
    
13.  	}
    
14.  }
    

**AUTWeap\_FlakCannon.cpp** - Add CameraShake assets & default properties to FlakCannon constructor

1.  	struct FConstructorStatics
    
2.  	{
    
3.  		...
    
4.  		ConstructorHelpers::FClassFinder<UCameraShake\> CameraShakeType0;
    
5.  		ConstructorHelpers::FClassFinder<UCameraShake\> CameraShakeType1;
    
6.  		FConstructorStatics()
    
7.  			...
    
8.  			, CameraShakeType0(TEXT("BlueprintGeneratedClass'/Game/RestrictedAssets/Blueprints/WIP/Nick/CameraAnims/Camerashake2.Camerashake2\_C'"))
    
9.  			, CameraShakeType1(TEXT("BlueprintGeneratedClass'/Game/RestrictedAssets/Blueprints/WIP/Nick/CameraAnims/Camerashake2.Camerashake2\_C'"))
    
10.  		{
    
11.  		}
    
12.  	};
    

14.  	...
    

16.  	CameraShakeType.SetNumZeroed(2);
    
17.  	CameraShakeType\[0\] \= ConstructorStatics.CameraShakeType0.Class;
    
18.  	CameraShakeType\[1\] \= ConstructorStatics.CameraShakeType1.Class;
    

20.  	CameraShakeDelay.SetNumZeroed(2);
    
21.  	CameraShakeDelay\[0\] \= 0.05f;
    
22.  	CameraShakeDelay\[1\] \= 0.05f;
    

24.  	CameraShakeScale.SetNumZeroed(2);
    
25.  	CameraShakeScale\[0\] \= 1.f;
    
26.  	CameraShakeScale\[1\] \= 1.f;
    

  

Source Code
-----------

\* [https://github.com/roman-dzieciol/UnrealTournament/commit/1a148e6381233f654aa4a1b84b88e94496c6b0c8](https://github.com/roman-dzieciol/UnrealTournament/commit/1a148e6381233f654aa4a1b84b88e94496c6b0c8)
\* [https://github.com/EpicGames/UnrealTournament/pull/26](https://github.com/EpicGames/UnrealTournament/pull/26)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UT3\_Weapons\_Tutorial\_-\_Flak\_Cannon&oldid=10610](https://wiki.unrealengine.com/index.php?title=UT3_Weapons_Tutorial_-_Flak_Cannon&oldid=10610)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")

  ![](https://tracking.unrealengine.com/track.png)