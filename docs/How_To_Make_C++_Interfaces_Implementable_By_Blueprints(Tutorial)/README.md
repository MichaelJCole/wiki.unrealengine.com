How To Make C++ Interfaces Implementable By Blueprints(Tutorial) - Epic Wiki                    

How To Make C++ Interfaces Implementable By Blueprints(Tutorial)
================================================================

**Rate this Tutorial:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.10

Contents
--------

*   [1 Overview](#Overview)
*   [2 Getting Started](#Getting_Started)
    *   [2.1 How to implement an Interface](#How_to_implement_an_Interface)
    *   [2.2 Creating an Actor which inherits from this Interface](#Creating_an_Actor_which_inherits_from_this_Interface)
    *   [2.3 Let it grow](#Let_it_grow)

Overview
--------

Hello Ladies and Gentlemen,

I recently came to the conclusion that it is a bit tricky to make C++ Interfaces also implementable by Blueprints. Because of the lack of Information I could get from the Search Engine I used, I had to gather all this knowledge little by little. So lets begin :)

Getting Started
---------------

At first we have to implement our Interface: Unreal Engine has a special way to handle Interfaces so this part was a bit confusing at first. But in the End it was all clear (for me >\_>)

I assume that you know how to do basic stuff like creating projects and new c++ classes etc.

### How to implement an Interface

Our first step is to create a new C++ Class and let it inherit from our beloved Base Class UObject. Unfortunately one cannot simply inherit from UInterface directly so we have to do it ourselves. Lets call the Interface "Lookable".

Let's make a code example to better visualize:

**Interface Header File**

#pragma once
 
#include "Object.h"
#include "Lookable.generated.h"
 
//Instead of UCLASS() we use UINTERFACE()
UINTERFACE()
class IAWESOME\_API ULookable: public UInterface
{
        //Dont forget to use this makro.
	GENERATED\_UINTERFACE\_BODY()
 
};
 
//Create a new class ILookable and use GENERATED\_IINTERFACE\_BODY() Makro in class body
class ILookable
{
	GENERATED\_IINTERFACE\_BODY()
 
public:
	UFUNCTION(BlueprintNativeEvent, BlueprintCallable, Category \= Gameplay)
		void ProcessEvent(FName TestParamName, float TestParamFloat);
};

Here you can see that I'm using a BlueprintNativeEvent. This tells Unreal internally that we want to implement this function in Blueprint and/or C++.

**Interface Source File**

#include "IAwesome.h"
#include "Lookable.h"
 
//This constructor is predeclared so you dont have to declare it in your .header file
//Don't forget to define this constructor so no compiler errors are thrown
ULookable::ULookable(const FObjectInitializer& ObjectInitializer)
	:Super(ObjectInitializer)
{
 
}
 
//This is the C++ part of our Event. Just let the Body empty if you don't want to do stuff in your Base Interface<br />
 //;) !!!Do not forget the \_Implementation suffix!!!
void ILookable::ProcessEvent\_Implementation(FName TestParamName, float TestParamFloat)
{
 
}

### Creating an Actor which inherits from this Interface

So far so good. Let's create a new C++ Class which inherits from AActor. Lets call him LookableActor. In addition to that, we have to let our new LookableActorinherit from ILookable(NOT ULookable) right after we included "Lookable.h".

**Actor Header File**

#pragma once
 
#include "GameFramework/Actor.h"
#include "Lookable.h"
#include "LookableActor.generated.h"
 
UCLASS()
class IAWESOME\_API ALookableActor: public AActor, public ILookable
{
	GENERATED\_BODY()
 
public:
	ALookableActor();
 
	virtual void BeginPlay() override;
 
	virtual void Tick(float DeltaTime) override;
 
	virtual void ProcessEvent\_Implementation(FName Name, float Float) override;
};

Make sure to override ProcessEvent\_Implementation Function. Unfortunately all methods which are provided of our Interface **HAVE TO** be overridden. The Compiler makes sure to tell you if you forget it.

**Actor Header File**

#include "IAwesome.h"
#include "LookableActor.h"
 
ALookableActor::ALookableActor()
{
	PrimaryActorTick.bCanEverTick \= true;
        RootComponent \= CreateDefaultSubobject<UStaticMeshComponent\>(TEXT("LookAtMe"));
}
 
void ALookableActor::BeginPlay()
{
	Super::BeginPlay();
}
 
void ALookableActor::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}
 
void ALookableActor::ProcessEvent\_Implementation(FName Name, float Float)
{
        UE\_LOG(LogTemp, Warning, TEXT("Parameter (FName) : %s \\nParameter (float) : %f"), \*Name.ToString(), Float);
 
	SetActorScale3D(FVector(GetActorScale.X \* 1.05f));
}

This ProcessEvent defines that everytime this is called on our Actor he grows by 5%.

### Let it grow

So now we have an Actor which gets bigger and bigger. Unfortunately there isn't an Actor which calls our ProcessEvent Function so our Actor stays small :( BUT WAIT (Dramatic Sound Playing) We can do that ourselves because we have hands which create whole new **Worlds** and **Universes** by writing cool **Letters**. ;D For the ones who think I'm weird and I should begin to just write a Tutorial without making stupid jokes. I can't.

Let's go on by quickly creating a new Actor which calls our ProcessEvent Function.

#pragma once
 
#include "GameFramework/Actor.h"
#include "LineTraceActor.generated.h"
 
UCLASS()
class IAWESOME\_API ALineTraceActor: public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	ALineTraceActor();
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	UFUNCTION()
	void NotifyEvent();
 
	/\*
		This Function creates a Raycast and fills the given HitResult
		@param Hit: This Variable will be filled with the Information one needs.
		@return bool value which specifies IF something was hit
	\*/
	bool LineTraceFromCamera(FHitResult& Hit);
 
private:
	//A Reference to the Player Camera
	APlayerController\* PC;
 
 
};

At first I create 2 Methods NotifyEvent and LineTraceFromCamera I would say that the names describe their functions pretty well :) The next step is to fill our source file:

#include "IAwesome.h"
#include "Interfaced.h"
#include "LineTraceActor.h"
 
 
// Sets default values
ALineTraceActor::ALineTraceActor()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= false;
}
 
// Called when the game starts or when spawned
void ALineTraceActor::BeginPlay()
{
	Super::BeginPlay();
}
 
void ALineTraceActor::Tick(float DeltaTime)
{
        Super::Tick(DeltaTime);
        NotifyEvent();
}
 
bool ALineTraceActor::LineTraceFromCamera(FHitResult& Hit)
{
	auto PlayerCameraManager \= PC\-\>PlayerCameraManager;
 
        FName TraceTag \= Text("Draw");
	GetWorld()\-\>DebugDrawTraceTag \= TraceTag;
 
	if (PlayerCameraManager)
	{
		FVector CameraForwardVector \= PlayerCameraManager\-\>GetActorForwardVector();
 
		FVector LineStart \= PlayerCameraManager\-\>GetCameraLocation();
		FVector LineEnd \= LineStart + CameraForwardVector \* 1024;
 
		FCollisionQueryParams Params;
		Params.bTraceComplex \= true;
		Params.bReturnPhysicalMaterial \= false;
		Params.bReturnFaceIndex \= false;
                Params.TraceTag \= TraceTag;
 
		return GetWorld()\-\>LineTraceSingleByChannel(Hit, LineStart, LineEnd, ECollisionChannel::ECC\_Visibility, Params);
	}
 
 
	UE\_LOG(LogTemp, Error, TEXT("PlayerCameraManager is null"));
	return false;
}

Our Tick method just calls NotifyEvent which will be defined next.

The LineTraceFromCamera method just generates a LineTrace from the Cameras View. This setting for now should only be used for Ego Perspective games. To see our LineTrace we override the DebugDrawTraceTag of our World to "Draw". (I don't know if there a predefined Names for it, but just changing it to any Name should give you the expected result) Our next step is to calculate the LineStart and LineEnd of our Trace. In our case the LineStart begins at the WorldLocation of our Camera. The LineEnd should be calculated by using the Forward Vector of the Camera Multiplied by the length of the line PLUS our LineStart. Simple Vector calculation :) Our next step is to fill the collision parameters for our linetrace. Make sure to let the TraceTag of your parameter having the same value as the worlds TraceTag.

Our next method is NotifyEvent which is the key to notify not only c++ Interactables but also Blueprint's.

void ALineTraceActor::NotfiyEvent()
{
	FHitResult Hit;
	if (LineTraceFromCamera(Hit))
	{
		if(Hit.GetActor()\-\>Implements<ULookable\>())
                {
			ILookable::Execute\_ProcessEvent(Hit.GetActor(), Hit.GetActor()\-\>GetFName(), Hit.Distance);
                }
	}
}

Let's go through this: We create a new variable of type FHitResult which we will fill by giving it into our LineTrace Method. If something was hit we have to check first if the Actor from our Hit Result Implements **ULookable** not ILookable. Please make sure to not forget that :) Fortunately the Compiler throws an error if we give ILookable into the template because its not of type UObject :P

Now we use a static method from our ILookable Interface which was generated by Unreal itself. The Parameters are the Actor and the parameters we specified ourselves in our ProcessEvent Function :) (FName and float)

Our last step is testing this Interface in either C++ and Blueprint

Let's place our LineTrace Actor in the Scene. Also our Lookabel Actor should be placed somewhere. Don't forget to give our LookableActor a visual representation by just editing the StaticMesh Value of our Root StaticMeshComponent.

Next we will create a Blueprint Actor which also implements from Lookable. You just have to open the Blueprint Editor and go to Class Settings to Add our cool Interface. Then go to the Event Graph and Right Click on an empty spot. Then search "Event ProcessEvent" and define a funny behaviour to see your result. Don't forget to add a Static Mesh to this Actor :)

Now let's place this Blueprint Actor next to our LookableActor in World. Just hit 'Play' and see the result of our hard work :D

I hope you enjoyed this tutorial. I try to edit this further to give more visual examples of the final result ;)

Thanks and have fun

Greetings Cloudy

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_To\_Make\_C%2B%2B\_Interfaces\_Implementable\_By\_Blueprints(Tutorial)&oldid=22091](https://wiki.unrealengine.com/index.php?title=How_To_Make_C%2B%2B_Interfaces_Implementable_By_Blueprints(Tutorial)&oldid=22091)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)