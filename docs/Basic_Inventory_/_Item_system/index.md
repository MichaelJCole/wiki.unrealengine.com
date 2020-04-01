Basic Inventory / Item system - Epic Wiki                    

Basic Inventory / Item system
=============================

**Rate this Article:**

4.50

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_half.gif) (2 votes)

Approved for Versions:(please verify)

Contents
--------

*   [1 Foward](#Foward)
*   [2 Overview](#Overview)
*   [3 Item](#Item)
    *   [3.1 Header](#Header)
    *   [3.2 CPP](#CPP)
*   [4 Character](#Character)
    *   [4.1 Header](#Header_2)
    *   [4.2 CPP](#CPP_2)
*   [5 End Result](#End_Result)

Foward
======

This tutorial was made by [alvarofer0020](https://forums.unrealengine.com/member.php?2225-alvarofer0020) on the Unreal forums and adapted to the Wiki by myself. If you have any questions you can post in the thread [here](https://forums.unrealengine.com/showthread.php?3289-Tutorial-Basic-Inventory-Item-System) and I'll update this page with any new or important information as it comes to light .

Also note that currently this tutorial is for First-Person camera only - I'm planning on making a version that works with other cameras, but those require a mouse/pointer of some kind. -[G-Rath](/User:G-Rath "User:G-Rath") ([talk](/User_talk:G-Rath "User talk:G-Rath")) 21:11, 21 April 2014 (UTC)

Overview
========

This tutorial covers how to make a basic inventory system and items for that system complete with events for when the item is used and dropped in Blueprints.

Item
====

For the item we use a simple actor class and add a couple of things:

*   Used() is called when the item is used by another actor
*   Dropped() is called when another actor drops the item
*   Mesh sets what mesh the item uses when its dropped.

Both the Used and Dropped functions use BlueprintImplementableEvent so they can be overridden from blueprint, since the items are blueprints themselves, and this saves us from having to create a new C++ function for each item when instead we just declare it on the items blueprint.

Note however that for now this tutorial doesn't have a method for using or dropping an item - A basic form of these features will be added at a later date, but they won't cover displaying these items in a UI.

Header
------

UCLASS()
class AProojectItem : public AActor
{
	GENERATED\_UCLASS\_BODY()
 
public:
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category \= Item)
	FString ItemName;
 
	UPROPERTY(EditAnywhere, BlueprintReadOnly, Category \= Item)
	int32 Value;
 
	UFUNCTION(BlueprintImplementableEvent, meta \= (FriendlyName \= "Item: Used"))
		virtual void Used();
 
	UFUNCTION(BlueprintImplementableEvent, meta \= (FriendlyName \= "Item: Dropped"))
		virtual void Dropped();
 
	UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category \= Item)
		TSubobjectPtr<class UStaticMeshComponent\> Mesh;
 
	virtual void BeginPlay() OVERRIDE;
	void PickedUp();	
};

CPP
---

AProojectItem::AProojectItem(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
	Mesh \= PCIP.CreateDefaultSubobject<UStaticMeshComponent\>(this, TEXT("Mesh"));
	RootComponent \= Mesh;
}
 
void AProojectItem::BeginPlay()
{
	Super::BeginPlay();
	Mesh\-\>SetSimulatePhysics(true);
	Mesh\-\>WakeRigidBody();
}
 
void AProojectItem::PickedUp()
{
	if (Mesh)
	{
		Mesh\-\>DestroyComponent(); // physical item has been picked up, destroy its visible component
	}
}

Character
=========

In order to store our items we need an array of some kind in the Character class.

Header
------

UCLASS(config\=Game)
class AProojectCharacter : public ACharacter
{
UPROPERTY(EditAnywhere, Category \= Inventory)
		TArray<class AProojectItem\*\> ItemInventory; // Our Inventory
 
bool bDrawDebugViewTrace;
 
void Tick(float DeltaSeconds) OVERRIDE;
 
void PickUpItem(AProojectItem\* Item);
 
UFUNCTION(BlueprintPure, meta \= (FriendlyName \= "Get Inv", CompactNodeTitle \= "GetInv", Keywords \= "Get Player Inventory"), Category \= Inv)
	TArray<class AProojectItem\*\> GetCurrentInventory();
};

CPP
---

#include "ProojectItem.h" //Put this with your classes includes
 
void AProojectCharacter::Tick(float DeltaSeconds)
{
	Super::Tick(DeltaSeconds);
 
	FVector CamLoc;
	FRotator CamRot;
 
	Controller\-\>GetPlayerViewPoint(CamLoc, CamRot); // Get the camera position and rotation
	const FVector StartTrace \= CamLoc; // trace start is the camera location
	const FVector Direction \= CamRot.Vector();
	const FVector EndTrace \= StartTrace + Direction \* 200; 
 
	// Perform trace to retrieve hit info
	FCollisionQueryParams TraceParams(FName(TEXT("WeaponTrace")), true, this);
	TraceParams.bTraceAsyncScene \= true;
	TraceParams.bReturnPhysicalMaterial \= true;
 
	FHitResult Hit(ForceInit);
	if (GetWorld()\-\>LineTraceSingle(Hit, StartTrace, EndTrace, ECC\_WorldStatic, TraceParams))
	{
		AProojectItem\* NewItem \= Cast<AProojectItem\>(Hit.GetActor()); // typecast to the item class to the hit actor
		if (bDrawDebugViewTrace)
		{
	      DrawDebugLine(
			GetWorld(),
			StartTrace,
			EndTrace,
			FColor(255, 0, 0),
			false,
			3,
			0,
			1
			);
		}
 
		if (NewItem) // if we hit an item with the trace
		{
			this\-\>PickUpItem(NewItem); // pick it up
		}
	}
 
}
 
 
 
void AProojectCharacter::PickUpItem(AProojectItem\* Item)
{
	if (Item)
	{
		ItemInventory.Add(Item); // add it to the array
		Item\-\>PickedUp(); // hide mesh 
	}
}
 
TArray<class ABasicItem\*\> AProojectCharacter::GetCurrentInventory()
{
	return ItemInventory;
}

End Result
==========

[![BasicInvSystem E1.png](https://d26ilriwvtzlb.cloudfront.net/e/e4/BasicInvSystem_E1.png)](/File:BasicInvSystem_E1.png)  

Note you can print the inventory of a player character by using the GetInv node in this setup:

[![BasicInvSystem PrintInv E1.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3a/BasicInvSystem_PrintInv_E1.jpg)](/File:BasicInvSystem_PrintInv_E1.jpg)  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Basic\_Inventory\_/\_Item\_system&oldid=8223](https://wiki.unrealengine.com/index.php?title=Basic_Inventory_/_Item_system&oldid=8223)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)