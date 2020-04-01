 Modular Pawn - Epic Wiki             

 

Modular Pawn
============

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 MyCharacter.h](#MyCharacter.h)
*   [3 MyCharacter.cpp](#MyCharacter.cpp)
*   [4 Usage](#Usage)

Overview
--------

Contains code to create a basic modular pawn/character with separate head, body & legs.

NOTE: Created with & tested on UE4 beta. May be slight difference between it and public build.

MyCharacter.h
-------------

<syntaxhighlight lang="cpp"> class AMyCharacter : public AMyCharacter {

   GENERATED\_UCLASS\_BODY()

   /\*\* 
    \*  The skeletal mesh used for the body.
    \*  Mesh (inherited from ACharacter) will act as characters head.
    \*/
   UPROPERTY(Category=Character, VisibleAnywhere, BlueprintReadOnly)
   TSubobjectPtr<class USkeletalMeshComponent> Body;

   /\*\*
    \*  Name of the BodyComponentName.
    \*  Use this name if you want to prevent creation of the component (with PCIP.DoNotCreateDefaultSubobject).
    \*/
   static FName BodyComponentName;

   /\*\* 
    \*  The skeletal mesh used for the legs.
    \*  Mesh (inherited from ACharacter) will act as characters head.
    \*/
   UPROPERTY(Category=Character, VisibleAnywhere, BlueprintReadOnly)
   TSubobjectPtr<class USkeletalMeshComponent> Legs;

   /\*\*
    \*  Name of the BodyComponentName.
    \*  Use this name if you want to prevent creation of the component (with PCIP.DoNotCreateDefaultSubobject).
    \*/
   static FName LegsComponentName;

} </syntaxhighlight>

MyCharacter.cpp
---------------

<syntaxhighlight lang="cpp"> FName AMyCharacter::BodyComponentName(TEXT("CharacterBody0")); FName AMyCharacter::LegsComponentName(TEXT("CharacterLegs0"));

AMyCharacter::AMyCharacter(const class FPostConstructInitializeProperties& PCIP)

   : Super(PCIP)

{

   static FName CollisionProfileName(TEXT("IgnoreOnlyPawn"));
   
   Body = PCIP.CreateOptionalDefaultSubobject<USkeletalMeshComponent>(this, AMyCharacter::BodyComponentName);
   if (Body)
   {
       Body->AlwaysLoadOnClient = true;
       Body->AlwaysLoadOnServer = true;
       Body->bOwnerNoSee = false;
       Body->MeshComponentUpdateFlag = EMeshComponentUpdateFlag::AlwaysTickPose;
       Body->bCastDynamicShadow = true;
       Body->PrimaryComponentTick.TickGroup = TG\_PrePhysics;
       Body->bChartDistanceFactor = true;
       Body->SetCollisionProfileName(CollisionProfileName);
       Body->bGenerateOverlapEvents = false;

       // Mesh acts as the head, as well as the parent for both animation and attachment.
       Body->AttachParent = Mesh;
       Body->SetMasterPoseComponent(Mesh);

       Components.Add(Body);
   }

   Legs = PCIP.CreateOptionalDefaultSubobject<USkeletalMeshComponent>(this, AMyCharacter::LegsComponentName);
   if (Legs)
   {
       Legs->AlwaysLoadOnClient = true;
       Legs->AlwaysLoadOnServer = true;
       Legs->bOwnerNoSee = false;
       Legs->MeshComponentUpdateFlag = EMeshComponentUpdateFlag::AlwaysTickPose;
       Legs->bCastDynamicShadow = true;
       Legs->PrimaryComponentTick.TickGroup = TG\_PrePhysics;
       Legs->bChartDistanceFactor = true;
       Legs->SetCollisionProfileName(CollisionProfileName);
       Legs->bGenerateOverlapEvents = false;

       // Mesh acts as the head, as well as the parent for both animation and attachment.
       Legs->AttachParent = Mesh;
       Legs->SetMasterPoseComponent(Mesh);

       Components.Add(Legs);
   }

} </syntaxhighlight>

Usage
-----

*   Create a blueprint based on this character.
*   Under the components tab, find the body & legs components
*   Set the skeletal meshes the body & legs should use.

[Kris](/index.php?title=User:Kris&action=edit&redlink=1 "User:Kris (page does not exist)")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Modular\_Pawn&oldid=797](https://wiki.unrealengine.com/index.php?title=Modular_Pawn&oldid=797)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")