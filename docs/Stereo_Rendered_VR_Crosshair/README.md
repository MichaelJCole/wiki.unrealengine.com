Stereo Rendered VR Crosshair - Epic Wiki                    

Stereo Rendered VR Crosshair
============================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.9, 4.10, 4.11

Original author: [Michael 'Hegi' Hegemann](https://twitter.com/HegiDev)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Code](#Code)
    *   [2.1 VrCrosshairComponent.h](#VrCrosshairComponent.h)
    *   [2.2 VrCrosshairComponent.cpp](#VrCrosshairComponent.cpp)

Overview
========

Hello!

VR is now upon us and creating a proper 3D stereo crosshair that is always rendered correctly requires a bit more work than traditional 2D crosshairs. If the crosshair is rendered behind a surface, you get a cross-eyed image, that is why the crosshair always has to be ontop of the closest surface.

This code is compatible with all VR headsets. You may have to adjust some properties, though.

Here is the code for a component, that can be attached to the Pawn's first person camera. You can use any kind of static mesh as crosshair, for example a plane with an animated circle on it or a simple sphere.

Code
====

The properties are self-explanatory, except for these.

**CrosshairScaleOffset :** The multiplicator that is applied when the crosshair gets closer to the players view.

**CrosshairConstSurfaceOffset :** This offsets the crosshair towards the players view, it is recommended to change this value instead of disabling depth-test on the crosshair material.

### VrCrosshairComponent.h

#pragma once
 
#include "GameFramework/Actor.h"
#include "Components/StaticMeshComponent.h"
#include "VrCrosshairComponent.generated.h"
 
UCLASS(meta \= (BlueprintSpawnableComponent), ClassGroup \= Rendering)
class UVrCrosshairComponent : public UStaticMeshComponent
{
	GENERATED\_BODY()
 
	UVrCrosshairComponent();
 
	virtual void OnRegister() override;
	virtual void TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction \*ThisTickFunction) override;
 
public:
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	float CrosshairSize;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	float CrosshairScreenDistance;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	float CrosshairScaleOffset;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	float CrosshairConstSurfaceOffset;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	float CrosshairMinDist;
 
	float SavedTraceDist;
 
	UPROPERTY(BlueprintReadOnly)
	FHitResult CrosshairHit;
 
	UPROPERTY(BlueprintReadOnly)
	bool bReturnHit;
};

  

### VrCrosshairComponent.cpp

#include "YOURGAME.h"
 
#include "VrCrosshairComponent.h"
#include "Kismet/KismetSystemLibrary.h"
 
UVrCrosshairComponent::UVrCrosshairComponent()
{
	PrimaryComponentTick.bCanEverTick \= true;
	bTickInEditor \= false;
	bAutoActivate \= true;
 
	CrosshairScreenDistance \= 1500.0;
	CrosshairSize \= 0.15;
	CrosshairScaleOffset \= 0.9;
	CrosshairConstSurfaceOffset \= 1.0;
	CrosshairMinDist \= 50.0;
 
	SavedTraceDist \= CrosshairScreenDistance;
}
 
void UVrCrosshairComponent::OnRegister()
{
	Super::OnRegister();
}
 
void UVrCrosshairComponent::TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction \*ThisTickFunction)
{
	Super::TickComponent(DeltaTime, TickType, ThisTickFunction);
 
	APawn \*VrPawn \= Cast<APawn\>(GetOwner());
 
	//Works only on pawn, parented by a camera
	if (VrPawn \== NULL)
		return;
 
	FVector ViewPoint;
	FRotator ViewRotation;
	VrPawn\-\>GetActorEyesViewPoint(ViewPoint, ViewRotation);
	ViewRotation.Roll \= 0;
 
	const FVector Start \= ViewPoint;
	const FVector End \= Start + ViewRotation.Vector() \* CrosshairScreenDistance;
 
	FHitResult Hit;
	FCollisionQueryParams TraceParams(NAME\_None, false, VrPawn);
 
	const bool bHit \= GetWorld()\-\>LineTraceSingleByChannel(Hit, Start, End, ECC\_Camera, TraceParams);
 
	float TraceDist;
 
	if (bHit)
	{
		//UE\_LOG(LogTemp, Warning, TEXT("hit"))
		const FVector TraceToStart \= Hit.Location \- Start;
		TraceDist \= TraceToStart.Size();
 
		//Save the last known hit distance
		SavedTraceDist \= TraceDist;
	}
	else
	{
		//Set to the last known hit distance, otherwise it would just snap back too far
		TraceDist \= SavedTraceDist;
	}
 
	//Output some values
	bReturnHit \= bHit;
	CrosshairHit \= Hit;
 
	const float Distance \= CrosshairScreenDistance;
 
	TraceDist \= FMath::Clamp<float\>(TraceDist, CrosshairMinDist, Distance);
 
	//Set Position
	const float CrosshairPos \= TraceDist \- CrosshairConstSurfaceOffset; 
	SetRelativeLocation(FVector(1, 0, 0) \* CrosshairPos);
 
	//Set Scale
	const float CrosshairDistScale \= FMath::Min<float\>(TraceDist \* CrosshairScaleOffset / Distance, 1.0);
	const float CrosshairScale \= CrosshairDistScale \* CrosshairSize;
	SetWorldScale3D(CrosshairScale \* FVector(1,1,1));
}

  
**Afterthought:** It would be possible to scale the crosshair with the vertex shader in a custom material, this might even provide a bit more accuracy in making it look like the crosshair is rendered in screen space. Another way would be to attach a billboard component to the crosshair. I have not tried these two ways yet.

  
**In other notes:** A while ago, John Carmack said that it would be optimal to use four raytraces for checking the crosshair against surfaces. [See here](https://www.facebook.com/permalink.php?story_fbid=1717273305173846&id=100006735798590) . But for most cases one trace should be enough, another option would be to use a spherical trace with a very small radius.

  
Enjoy! If you have any improvements or suggestions, don't hesitate to edit this page.

  
[HEGI](https://wiki.unrealengine.com/User:HEGI)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Stereo\_Rendered\_VR\_Crosshair&oldid=18425](https://wiki.unrealengine.com/index.php?title=Stereo_Rendered_VR_Crosshair&oldid=18425)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)