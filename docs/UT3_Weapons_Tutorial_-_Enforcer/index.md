UT3 Weapons Tutorial - Enforcer - Epic Wiki                    

UT3 Weapons Tutorial - Enforcer
===============================

Contents
--------

*   [1 UT3 Weapons Tutorial - Enforcer](#UT3_Weapons_Tutorial_-_Enforcer)
    *   [1.1 Requirements](#Requirements)
    *   [1.2 Features](#Features)
    *   [1.3 Notes](#Notes)
    *   [1.4 Contact](#Contact)
    *   [1.5 Enforcer](#Enforcer)
        *   [1.5.1 Primary Fire](#Primary_Fire)
        *   [1.5.2 Secondary Fire](#Secondary_Fire)
    *   [1.6 Implementation](#Implementation)
        *   [1.6.1 Creating Enforcer Classes](#Creating_Enforcer_Classes)
        *   [1.6.2 Setting up weapon asset references](#Setting_up_weapon_asset_references)
        *   [1.6.3 Weapon firing properties](#Weapon_firing_properties)
        *   [1.6.4 Camera Shake](#Camera_Shake)
        *   [1.6.5 Adding custom weapon firing state](#Adding_custom_weapon_firing_state)
        *   [1.6.6 Implementing burst firing state](#Implementing_burst_firing_state)
            *   [1.6.6.1 Using faster FireInterval for burst firing](#Using_faster_FireInterval_for_burst_firing)
        *   [1.6.7 Customizing the burst properties per-weapon](#Customizing_the_burst_properties_per-weapon)
        *   [1.6.8 Burst animations & sounds](#Burst_animations_.26_sounds)
        *   [1.6.9 Dual weapons](#Dual_weapons)
    *   [1.7 Source Code](#Source_Code)

UT3 Weapons Tutorial - Enforcer
===============================

This tutorial will show you how to create Enforcer from Unreal Tournament 3 using C++ only.

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

*   Firing multiple projectiles in a burst
*   Dual weapons

  

Notes
-----

*   When overriding a function in subclass always add a definition to the header file as well.
*   Functions with [BlueprintNativeEvent](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/Specifiers/BlueprintNativeEvent/index.html) attribute generate additional virtual function called "FunctionName\_Implementation". Override the \_Implementation one instead.
*   Code snippets are located in grey expandable boxes. Click Expand on the right to see the code.
*   Yellow lines in code snippets highlight only the code that needs to be changed.

  

Contact
-------

*   Forum thread; [https://forums.unrealtournament.com/showthread.php?11237-UT3-Enforcer-Tutorial](https://forums.unrealtournament.com/showthread.php?11237-UT3-Enforcer-Tutorial)

\--[Neai](/User:Neai "User:Neai") ([talk](/index.php?title=User_talk:Neai&action=edit&redlink=1 "User talk:Neai (page does not exist)")) 17:49, 30 June 2014 (UTC)

  

Enforcer
--------

We'll start by defining what features we want to implement:

### Primary Fire

1.  Standard hitscan

### Secondary Fire

1.  Fire burst of 3 hitscan shots

  

Implementation
--------------

To implement such projectile weapon we should create subclasses of **AUTWeapon**, **UUTWeaponStateFiring**, **UUTDamageType** and **AUTWeaponAttachment**.

  

### Creating Enforcer Classes

Create classes for all the elements of Enforcer:

1.  Weapon
    1.  Create subclass of **AUTWeapon** called **AUTWeap\_Enforcer**
2.  3rd person weapon attachment
    1.  Create subclass of **AUTWeaponAttachment** called **AUTAttachment\_Enforcer**
3.  Burst firing mode
    1.  Create subclass of **UUTWeaponStateFiring** called **UUTWeaponStateFiringBurst**
4.  Damage Types
    1.  Create subclass of **UUTDamageType** called **UTDmgType\_Enforcer**
    2.  Create subclass of **UUTDamageType** called **UTDmgType\_DualEnforcers**

  

### Setting up weapon asset references

We will link all the parts together, add asset references and setup basic properties.

**AUTWeap\_Enforcer.cpp** - Setup asset references

1.  #include "UnrealTournament.h"
    
2.  #include "UTWeap\_Enforcer.h"
    
3.  #include "UTAttachment\_Enforcer.h"
    
4.  #include "UTDmgType\_Enforcer.h"
    
5.  #include "UTDmgType\_DualEnforcer.h"
    

8.  AUTWeap\_Enforcer::AUTWeap\_Enforcer(const class FPostConstructInitializeProperties& PCIP)
    
9.  : Super(PCIP)
    
10.  {
    
11.  	// Structure to hold one-time initialization
    
12.  	struct FConstructorStatics
    
13.  	{
    
14.  		ConstructorHelpers::FObjectFinder<USkeletalMesh\> SkeletalMesh;
    
15.  		ConstructorHelpers::FObjectFinder<UAnimBlueprintGeneratedClass\> AnimBlueprintGeneratedClass;
    
16.  		ConstructorHelpers::FObjectFinder<UParticleSystem\> MuzzleFlash;
    
17.  		ConstructorHelpers::FObjectFinder<USoundCue\> FireSound0;
    
18.  		ConstructorHelpers::FObjectFinder<USoundCue\> BurstFireSound1;
    
19.  		ConstructorHelpers::FObjectFinder<UAnimMontage\> FireAnimation0;
    
20.  		ConstructorHelpers::FObjectFinder<UAnimMontage\> BurstFireAnimation1;
    
21.  		ConstructorHelpers::FObjectFinder<UAnimMontage\> BringUpAnim;
    
22.  		ConstructorHelpers::FObjectFinder<UAnimMontage\> PutDownAnim;
    
23.  		ConstructorHelpers::FObjectFinder<UParticleSystem\> FireEffect0;
    
24.  		ConstructorHelpers::FObjectFinder<USoundCue\> PickupSound;
    
25.  		FConstructorStatics()
    
26.  			: SkeletalMesh(TEXT("SkeletalMesh'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Meshes/SK\_WP\_Enforcers\_1P.SK\_WP\_Enforcers\_1P'"))
    
27.  			, AnimBlueprintGeneratedClass(TEXT("AnimBlueprintGeneratedClass'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Anims/Enforcer\_AnimBP.Enforcer\_AnimBP\_C'"))
    
28.  			, MuzzleFlash(TEXT("ParticleSystem'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Effects/P\_WP\_Enforcers\_MuzzleFlash.P\_WP\_Enforcers\_MuzzleFlash'"))
    
29.  			, FireSound0(TEXT("SoundCue'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Audio/CUE/A\_Weapon\_Enforcer\_Fire\_Cue.A\_Weapon\_Enforcer\_Fire\_Cue'"))
    
30.  			, BurstFireSound1(TEXT("SoundCue'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Audio/CUE/A\_Weapon\_Enforcer\_AltFire\_Cue.A\_Weapon\_Enforcer\_AltFire\_Cue'"))
    
31.  			, FireAnimation0(TEXT("AnimMontage'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Anims/Enforcer\_ShootSingle\_Montage.Enforcer\_ShootSingle\_Montage'"))
    
32.  			, BurstFireAnimation1(TEXT("AnimMontage'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Anims/Enforcer\_ShootSecondary\_Montage.Enforcer\_ShootSecondary\_Montage'"))
    
33.  			, BringUpAnim(TEXT("AnimMontage'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Anims/Enforcer\_Equip.Enforcer\_Equip'"))
    
34.  			, PutDownAnim(TEXT("AnimMontage'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Anims/Enforcer\_Putdown.Enforcer\_Putdown'"))
    
35.  			, FireEffect0(TEXT("ParticleSystem'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Effects/P\_WP\_Enforcers\_Tracer.P\_WP\_Enforcers\_Tracer'"))
    
36.  			, PickupSound(TEXT("SoundCue'/Game/RestrictedAssets/Proto/UT3\_Pickups/Audio/Weapons/Cue/A\_Pickup\_Weapons\_Enforcer\_Cue.A\_Pickup\_Weapons\_Enforcer\_Cue'"))
    
37.  		{
    
38.  		}
    
39.  	};
    
40.  	static FConstructorStatics ConstructorStatics;
    

42.  	Mesh\-\>SkeletalMesh \= ConstructorStatics.SkeletalMesh.Object;
    
43.  	Mesh\-\>AnimBlueprintGeneratedClass \= ConstructorStatics.AnimBlueprintGeneratedClass.Object;
    
44.  	Mesh\-\>RelativeLocation \= FVector(\-30, 0, \-0);
    

46.  	TSubobjectPtr<UParticleSystemComponent\> MuzzleComponent \= PCIP.CreateDefaultSubobject<UParticleSystemComponent\>(this, TEXT("Enforcer-Muzzle"));
    
47.  	MuzzleComponent\-\>Template \= ConstructorStatics.MuzzleFlash.Object;
    
48.  	MuzzleComponent\-\>AttachTo(Mesh, FName(TEXT("MuzzleFlashSocket")));
    

51.  	// Visual
    

53.  	MuzzleFlash.SetNumZeroed(2);
    
54.  	MuzzleFlash\[0\] \= MuzzleComponent;
    
55.  	MuzzleFlash\[1\] \= MuzzleComponent;
    

57.  	AttachmentType \= AUTAttachment\_Enforcer::StaticClass();
    

59.  	BringUpAnim \= ConstructorStatics.BringUpAnim.Object;
    
60.  	PutDownAnim \= ConstructorStatics.PutDownAnim.Object;
    

62.  	FireAnimation.SetNumZeroed(1);
    
63.  	FireAnimation\[0\] \= ConstructorStatics.FireAnimation0.Object;
    

65.  	FireEffect.SetNumZeroed(2);
    
66.  	FireEffect\[0\] \= ConstructorStatics.FireEffect0.Object;
    
67.  	FireEffect\[1\] \= ConstructorStatics.FireEffect0.Object;
    

70.  	// Sounds
    

72.  	FireSound.SetNumZeroed(1);
    
73.  	FireSound\[0\] \= ConstructorStatics.FireSound0.Object;
    

75.  	PickupSound \= ConstructorStatics.PickupSound.Object;
    
76.  }
    

**AUTAttachment\_Enforcer.cpp** - Setup asset references

1.  AUTAttachment\_Enforcer::AUTAttachment\_Enforcer(const class FPostConstructInitializeProperties& PCIP)
    
2.  	: Super(PCIP)
    
3.  {
    
4.  	// Structure to hold one-time initialization
    
5.  	struct FConstructorStatics
    
6.  	{
    
7.  		ConstructorHelpers::FObjectFinder<USkeletalMesh\> SkeletalMesh;
    
8.  		FConstructorStatics()
    
9.  			: SkeletalMesh(TEXT("SkeletalMesh'/Game/RestrictedAssets/Proto/UT3\_Weapons/WP\_Enforcers/Meshes/SK\_WP\_Enforcer\_3P\_Mid.SK\_WP\_Enforcer\_3P\_Mid'"))
    
10.  		{
    
11.  		}
    
12.  	};
    
13.  	static FConstructorStatics ConstructorStatics;
    

15.  	Mesh\-\>SkeletalMesh \= ConstructorStatics.SkeletalMesh.Object;
    
16.  }
    

  

### Weapon firing properties

We're going to use weapon properties from UT3. Set them in constructors:

**AUTWeap\_Enforcer.cpp** - Add weapon firing properties to constructor

1.  	ProjClass.SetNumZeroed(0);
    

3.  	FInstantHitDamageInfo PrimaryFireInfo;
    
4.  	PrimaryFireInfo.Momentum \= 1000 \* UT3\_TO\_UT4\_SCALE;
    
5.  	PrimaryFireInfo.Damage \= 20;
    
6.  	PrimaryFireInfo.DamageType \= UUTDmgType\_Enforcer::StaticClass();
    

8.  	FInstantHitDamageInfo SecondaryFireInfo;
    
9.  	SecondaryFireInfo.Momentum \= 1000 \* UT3\_TO\_UT4\_SCALE;
    
10.  	SecondaryFireInfo.Damage \= 20;
    
11.  	SecondaryFireInfo.DamageType \= UUTDmgType\_Enforcer::StaticClass();
    

13.  	InstantHitInfo.SetNumZeroed(2);
    
14.  	InstantHitInfo\[0\] \= PrimaryFireInfo;
    
15.  	InstantHitInfo\[1\] \= SecondaryFireInfo;
    

17.  	FireInterval.SetNumZeroed(2);
    
18.  	FireInterval\[0\] \= 0.5;
    
19.  	FireInterval\[1\] \= 1.0;
    

21.  	AmmoCost.SetNumZeroed(2);
    
22.  	AmmoCost\[0\] \= 1;
    
23.  	AmmoCost\[1\] \= 1;
    

25.  	Ammo \= 20;
    
26.  	MaxAmmo \= 50;
    

28.  	FireOffset \= FVector(50, 0, 0);
    

30.  	Group \= 4;
    

  

### Camera Shake

Add camera shake to AUTWeapon. If you already have added this code before, just add default properties for Enforcer.

**AUTWeapon.h** - Add camera shake properties and function

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
    

**AUTWeapon.cpp** - Add PlayCameraShake() implementation

1.  void AUTWeapon::PlayCameraShake\_Implementation()
    
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
    

**AUTWeapon.cpp** - Override PlayFiringEffects() so it calls our PlayCameraShake() function

1.  void AUTWeapon::PlayFiringEffects()
    
2.  {
    
3.  	Super::PlayFiringEffects();
    

5.  	// Play camera shake after optional delay
    
6.  	if (CameraShakeDelay.IsValidIndex(CurrentFireMode) && CameraShakeDelay\[CurrentFireMode\] \> 0)
    
7.  	{
    
8.  		GetWorldTimerManager().SetTimer(this, &AUTWeapon::PlayCameraShake, CameraShakeDelay\[CurrentFireMode\], false);
    
9.  	}
    
10.  	else
    
11.  	{
    
12.  		PlayCameraShake();
    
13.  	}
    
14.  }
    

**AUTWeap\_Enforcer.cpp** - Add CameraShake assets & default properties to constructor

1.  	struct FConstructorStatics
    
2.  	{
    
3.  		//...
    
4.  		ConstructorHelpers::FClassFinder<UCameraShake\> CameraShakeType0;
    
5.  		ConstructorHelpers::FClassFinder<UCameraShake\> CameraShakeType1;
    
6.  		FConstructorStatics()
    
7.  			//...
    
8.  			, CameraShakeType0(TEXT("BlueprintGeneratedClass'/Game/RestrictedAssets/Blueprints/WIP/Nick/CameraAnims/Camerashake2.Camerashake2\_C'"))
    
9.  			, CameraShakeType1(TEXT("BlueprintGeneratedClass'/Game/RestrictedAssets/Blueprints/WIP/Nick/CameraAnims/Camerashake2.Camerashake2\_C'"))
    
10.  		{
    
11.  		}
    
12.  	};
    

14.  	//...
    

16.  	CameraShakeType.SetNumZeroed(2);
    
17.  	CameraShakeType\[0\] \= ConstructorStatics.CameraShakeType0.Class;
    
18.  	CameraShakeType\[1\] \= ConstructorStatics.CameraShakeType1.Class;
    

20.  	CameraShakeDelay.SetNumZeroed(2);
    
21.  	CameraShakeDelay\[0\] \= 0.f;
    
22.  	CameraShakeDelay\[1\] \= 0.f;
    

24.  	CameraShakeScale.SetNumZeroed(2);
    
25.  	CameraShakeScale\[0\] \= 1.f;
    
26.  	CameraShakeScale\[1\] \= 1.f;
    

  

### Adding custom weapon firing state

In the Enforcer's constructor we will disable creation of default weapon firing states and create our own ones instead.

**AUTWeap\_Enforcer.cpp** - Create our own weapon firing states

1.  AUTWeap\_Enforcer::AUTWeap\_Enforcer(const class FPostConstructInitializeProperties& PCIP)
    
2.  : Super(PCIP
    
3.  .DoNotCreateDefaultSubobject(TEXT("FiringState0"))
    
4.  .DoNotCreateDefaultSubobject(TEXT("FiringState1"))
    
5.  )
    
6.  {
    
7.  	//...
    

9.  	if (!GCompilingBlueprint)
    
10.  	{
    
11.  		UUTWeaponStateFiring\* PrimaryState \= PCIP.CreateDefaultSubobject<UUTWeaponStateFiring, UUTWeaponStateFiring\>(this, FName(TEXT("Enforcer-WeaponState0")), false, false, false);
    
12.  		if (PrimaryState)
    
13.  		{
    
14.  			FiringState.Add(PrimaryState);
    
15.  			FiringStateType.Add(PrimaryState\-\>StaticClass());
    
16.  		}
    

18.  		UUTWeaponStateFiringBurst\* AlternateState \= PCIP.CreateDefaultSubobject<UUTWeaponStateFiringBurst, UUTWeaponStateFiringBurst\>(this, FName(TEXT("Enforcer-WeaponState1")), false, false, false);
    
19.  		if (AlternateState)
    
20.  		{
    
21.  			FiringState.Add(AlternateState);
    
22.  			FiringStateType.Add(AlternateState\-\>StaticClass());
    
23.  		}
    
24.  	}
    
25.  }
    

  

### Implementing burst firing state

Weapon firing works as follows (simplified):

1.  When user holds fire and weapon can fire, weapon goes to WeaponStateFiring state, WeaponStateFiring::BeginState() is called
2.  WeaponStateFiring::BeginState() fires a shot and starts a RefireCheckTimer. Weapon can't fire again nor be switched away until this timer finishes.
3.  When RefireCheckTimer times out, weapon checks its state. Firing ends when:
    1.  There is a pending weapon change
    2.  User no longer presses fire
    3.  There is no more ammo
4.  Otherwise weapon fires again and timer is restarted.

  
To create a burst firing mode, we're going to count the shots and modify RefireCheckTimer so it will automatically fire again until burst completes.

**UUTWeaponFiringStateBurst.h** - Add burst count variables

1.  	int32 BurstRounds;
    
2.  	int32 BurstRoundsFired;
    

**UUTWeaponFiringStateBurst.cpp** - Add default values for burst count variables in constructor

1.  UUTWeaponStateFiringBurst::UUTWeaponStateFiringBurst(const class FPostConstructInitializeProperties& PCIP)
    
2.  	: Super(PCIP)
    
3.  {
    
4.  	BurstRounds \= 3;
    
5.  	BurstRoundsFired \= 0;
    
6.  }
    

**UUTWeaponFiringStateBurst.cpp** - Override FireShot() to increment burst rounds counter

1.  void UUTWeaponStateFiringBurst::FireShot()
    
2.  {
    
3.  	Super::FireShot();
    

5.  	// Increment number of burst rounds fired
    
6.  	++BurstRoundsFired;
    
7.  }
    

**UUTWeaponFiringStateBurst.cpp** - Override RefireCheckTimer() so it will automatically fire remaining burst rounds as long as there is ammo.

1.  void UUTWeaponStateFiringBurst::RefireCheckTimer()
    
2.  {
    
3.  	UE\_LOG(LogTemp, Warning, TEXT("%s : BurstRoundsFired:%d"), TEXT(\_\_FUNCTION\_\_), BurstRoundsFired);
    
4.  	if (BurstRoundsFired < BurstRounds)
    
5.  	{
    
6.  		if (!GetOuterAUTWeapon()\-\>HasAmmo(GetOuterAUTWeapon()\-\>GetCurrentFireMode()))
    
7.  		{
    
8.  			GetOuterAUTWeapon()\-\>GotoActiveState();
    
9.  		}
    
10.  		else
    
11.  		{
    
12.  			FireShot();
    
13.  		}
    
14.  	}
    
15.  	else
    
16.  	{
    
17.  		BurstRoundsFired \= 0;
    
18.  		Super::RefireCheckTimer();
    
19.  	}
    
20.  }
    

Notice that when burst is finished we reset the burst counter.

**UUTWeaponFiringStateBurst.cpp** - Override BeginState() to reset burst counter whenever weapon goes to firing state

1.  void UUTWeaponStateFiringBurst::BeginState(const UUTWeaponState\* PrevState)
    
2.  {
    
3.  	BurstRoundsFired \= 0;
    
4.  	Super::BeginState(PrevState);
    
5.  }
    

  

#### Using faster FireInterval for burst firing

So far the burst works but we want to have a fast refire time for burst shots and longer delay between bursts.

**UUTWeaponFiringStateBurst.h** - Add BurstRefireRate variable

1.  	float BurstRefireRate;
    

**UUTWeaponFiringStateBurst.cpp** - Set default value for BurstRefireRate in constructor

1.  	BurstRefireRate \= 0.15;
    

**UUTWeaponFiringStateBurst.cpp** - Override UpdateTiming() to use custom shorter refire time if next shot is a part of burst

1.  void UUTWeaponStateFiringBurst::UpdateTiming()
    
2.  {
    
3.  	// TODO: we should really restart the timer at the percentage it currently is, but FTimerManager has no facility to do this
    

5.  	// If the next round will be a part of this burst, change fire rate to burst rate, otherwise reset it to default.
    
6.  	float NextRefireRate \= (BurstRoundsFired < BurstRounds)
    
7.  		? BurstRefireRate
    
8.  		: GetOuterAUTWeapon()\-\>GetRefireTime(GetOuterAUTWeapon()\-\>GetCurrentFireMode());
    
9.  	GetOuterAUTWeapon()\-\>GetWorldTimerManager().SetTimer(this, &UUTWeaponStateFiring::RefireCheckTimer, NextRefireRate, true);
    
10.  }
    

**UUTWeaponFiringStateBurst.cpp** - Modify FireShot() to update refire timer after each shot

1.  void UUTWeaponStateFiringBurst::FireShot()
    
2.  {
    
3.  	Super::FireShot();
    

5.  	// Increment number of burst rounds fired
    
6.  	++BurstRoundsFired;
    

8.  	// Burst fire uses different firing rate, update according to current state
    
9.  	UpdateTiming();
    
10.  }
    

  

### Customizing the burst properties per-weapon

Should we want to create a blueprint of this weapon to tweak the properties, we need to setup the properties in AUTWeap\_Enforer. Weapon state objects are not supported by editor property GUI yet.

**AUTWeap\_Enforcer.h** - Add properties to Enforcer

1.  	/\*\* Number of rounds to fire in a burst \*/
    
2.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Enforcer")
    
3.  	int32 BurstRounds;
    

5.  	/\*\* Time between each round in a burst \*/
    
6.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Enforcer")
    
7.  	float BurstRefireRate;
    

**AUTWeap\_Enforcer.cpp** - Set default properties in Enforcer constructor

1.  AUTWeap\_Enforcer::AUTWeap\_Enforcer(const class FPostConstructInitializeProperties& PCIP)
    
2.  : Super(PCIP
    
3.  .DoNotCreateDefaultSubobject(TEXT("FiringState0"))
    
4.  .DoNotCreateDefaultSubobject(TEXT("FiringState1"))
    
5.  )
    
6.  {
    
7.  	//...
    

9.  	BurstRounds \= 3;
    
10.  	BurstRefireRate \= 0.15;
    

12.  	if (!GCompilingBlueprint)
    
13.  	{
    
14.  		UUTWeaponStateFiring\* PrimaryState \= PCIP.CreateDefaultSubobject<UUTWeaponStateFiring, UUTWeaponStateFiring\>(this, FName(TEXT("Enforcer-WeaponState0")), false, false, false);
    
15.  		if (PrimaryState)
    
16.  		{
    
17.  			FiringState.Add(PrimaryState);
    
18.  			FiringStateType.Add(PrimaryState\-\>StaticClass());
    
19.  		}
    

21.  		UUTWeaponStateFiringBurst\* AlternateState \= PCIP.CreateDefaultSubobject<UUTWeaponStateFiringBurst, UUTWeaponStateFiringBurst\>(this, FName(TEXT("Enforcer-WeaponState1")), false, false, false);
    
22.  		if (AlternateState)
    
23.  		{
    
24.  			AlternateState\-\>BurstRounds \= BurstRounds;
    
25.  			AlternateState\-\>BurstRefireRate \= BurstRefireRate;
    
26.  			FiringState.Add(AlternateState);
    
27.  			FiringStateType.Add(AlternateState\-\>StaticClass());
    
28.  		}
    
29.  	}
    
30.  }
    

  

### Burst animations & sounds

We have an animation & firing sound that covers entire burst. Lets add a function that will play animation & sound when weapon first starts firing, and when it refires after completed firing sequence.

**AUTWeapon.h** - Add properties & functions

1.  	/\*\* AnimMontage to play when weapon initially starts firing \*/
    
2.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
3.  	TArray<UAnimMontage\*\> StartedFireAnimation;
    

5.  	/\*\* AnimMontage to play when weapon completes firing sequence and starts firing another one \*/
    
6.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
7.  	TArray<UAnimMontage\*\> ContinuedFireAnimation;
    

9.  	/\*\* Sound to play when weapon initially starts firing \*/
    
10.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
11.  	TArray<USoundBase\*\> StartedFireSound;
    

13.  	/\*\* Sound to play when weapon completes firing sequence and starts firing another one \*/
    
14.  	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "Weapon")
    
15.  	TArray<USoundBase\*\> ContinuedFireSound;
    

17.  	/\*\* Called when weapon initially starts firing \*/
    
18.  	UFUNCTION(BlueprintCallable, Category \= "Weapon")
    
19.  	virtual void PlayStartedFiringEffects();
    

21.  	/\*\* Called when weapon completes firing sequence and starts firing another one \*/
    
22.  	UFUNCTION(BlueprintCallable, Category \= "Weapon")
    
23.  	virtual void PlayContinuedFiringEffects();
    

**AUTWeapon.cpp** - Add PlayStartedFiringEffects() & PlayContinuedFiringEffects() implementation

1.  void AUTWeapon::PlayStartedFiringEffects()
    
2.  {
    
3.  	if (GetNetMode() !\= NM\_DedicatedServer && UTOwner !\= NULL)
    
4.  	{
    
5.  		// try and play the sound if specified
    
6.  		if (StartedFireSound.IsValidIndex(CurrentFireMode) && StartedFireSound\[CurrentFireMode\] !\= NULL)
    
7.  		{
    
8.  			UUTGameplayStatics::UTPlaySound(GetWorld(), StartedFireSound\[CurrentFireMode\], UTOwner, SRT\_AllButOwner);
    
9.  		}
    

11.  		// Play animation
    
12.  		if (StartedFireAnimation.IsValidIndex(CurrentFireMode) && StartedFireAnimation\[CurrentFireMode\] !\= NULL)
    
13.  		{
    
14.  			UAnimInstance\* AnimInstance \= Mesh\-\>GetAnimInstance();
    
15.  			if (AnimInstance !\= NULL)
    
16.  			{
    
17.  				AnimInstance\-\>Montage\_Play(StartedFireAnimation\[CurrentFireMode\], 1.f);
    
18.  			}
    
19.  		}
    
20.  	}
    
21.  }
    

23.  void AUTWeapon::PlayContinuedFiringEffects()
    
24.  {
    
25.  	if (GetNetMode() !\= NM\_DedicatedServer && UTOwner !\= NULL)
    
26.  	{
    
27.  		// try and play the sound if specified
    
28.  		if (ContinuedFireSound.IsValidIndex(CurrentFireMode) && ContinuedFireSound\[CurrentFireMode\] !\= NULL)
    
29.  		{
    
30.  			UUTGameplayStatics::UTPlaySound(GetWorld(), ContinuedFireSound\[CurrentFireMode\], UTOwner, SRT\_AllButOwner);
    
31.  		}
    

33.  		// Play animation
    
34.  		if (ContinuedFireAnimation.IsValidIndex(CurrentFireMode) && ContinuedFireAnimation\[CurrentFireMode\] !\= NULL)
    
35.  		{
    
36.  			UAnimInstance\* AnimInstance \= Mesh\-\>GetAnimInstance();
    
37.  			if (AnimInstance !\= NULL)
    
38.  			{
    
39.  				AnimInstance\-\>Montage\_Play(ContinuedFireAnimation\[CurrentFireMode\], 1.f);
    
40.  			}
    
41.  		}
    
42.  	}
    
43.  }
    

**AUTWeapon.cpp** - Modify OnStartedFiring\_Implementation() & OnContinuedFiring\_Implementation() to make them call our functions

1.  void AUTWeapon::OnStartedFiring\_Implementation()
    
2.  {
    
3.  	PlayStartedFiringEffects();
    
4.  }
    

6.  void AUTWeapon::OnContinuedFiring\_Implementation()
    
7.  {
    
8.  	PlayContinuedFiringEffects();
    
9.  }
    

  

### Dual weapons

**TODO**

  

Source Code
-----------

*   [https://github.com/EpicGames/UnrealTournament/pull/27](https://github.com/EpicGames/UnrealTournament/pull/27)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UT3\_Weapons\_Tutorial\_-\_Enforcer&oldid=10611](https://wiki.unrealengine.com/index.php?title=UT3_Weapons_Tutorial_-_Enforcer&oldid=10611)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")

  ![](https://tracking.unrealengine.com/track.png)