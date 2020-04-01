Oculus Rift Separate View - Epic Wiki                    

Oculus Rift Separate View
=========================

**Rate this Article:**

4.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif) (3 votes)

Approved for Versions:4.4, 4.4.1, 4.4.2

Contents
--------

*   [1 Overview](#Overview)
*   [2 Blueprints](#Blueprints)
*   [3 C++](#C.2B.2B)
    *   [3.1 Your.Build.cs](#Your.Build.cs)
    *   [3.2 YourPlayerController.h](#YourPlayerController.h)
    *   [3.3 YourPlayerController.cpp](#YourPlayerController.cpp)
    *   [3.4 YourCharacter.h](#YourCharacter.h)
    *   [3.5 YourCharacter.cpp](#YourCharacter.cpp)
    *   [3.6 YourGameMode.cpp](#YourGameMode.cpp)
*   [4 See also](#See_also)

Overview
--------

By default, using an [Oculus Rift](/Oculus_Rift "Oculus Rift") in Unreal Engine 4 affects the rotation responsible for both the players view and movement direction.

There are two main ways to change this:

*   Creating a Player Camera Manager, Player Controller & GameMode using Blueprints.
*   Creating a new Player Controller, Character & GameMode in C++.

The end results are similar - the players view and movement directions are separate - but the C++ version is more flexible.

Blueprints
----------

1.  Create a Blueprint that based on PlayerCameraManager.
2.  In the Defaults tab, find "Follow Hmd Orientation" and set it to "true".
3.  Create a Blueprint that based on PlayerController.
4.  In the Defaults tab, find Player Camera Manager Class and set it to your PlayerCameraManager Blueprint.
5.  Create a Blueprint that based on GameMode.
6.  In the Defaults tab, find Default Controller Class and set it to your PlayerController Blueprint.
7.  Finally, under your levels World Settings, find GameMode Override and set it to your GameMode Blueprint.

C++
---

The C++ method is a more complex, but is also more flexible.

### Your.Build.cs

Add HeadMountedDisplay to PublicDependencyModuleNames.

        PublicDependencyModuleNames.AddRange(new string\[\] { 
            "Core", 
            "CoreUObject",
            "Engine",
            "InputCore", 
            "HeadMountedDisplay"
        });
});

### YourPlayerController.h

    virtual void UpdateRotation(float DeltaTime) override;
 
    UFUNCTION(BlueprintCallable, Category\="Pawn")
    FRotator GetViewRotation() const;
 
    UFUNCTION(BlueprintCallable, Category\="Pawn")
    virtual void SetViewRotation(const FRotator& NewRotation);
 
    virtual void SetControlRotation(const FRotator& NewRotation) override;
 
protected:
 
    /\*\*
     \*  View & Movement direction are now separate.
     \*  The controller rotation will determine which direction we will move.
     \*  ViewRotation represents where we are looking.
     \*/
    UPROPERTY()
    FRotator ViewRotation;

### YourPlayerController.cpp

// Make sure you include this!!
#include "IHeadMountedDisplay.h"
 
void AYourPlayerController::UpdateRotation(float DeltaTime)
{
    // Calculate Delta to be applied on ViewRotation
    FRotator DeltaRot(RotationInput);
 
    FRotator NewControlRotation \= GetControlRotation();
 
    if (PlayerCameraManager)
    {
        PlayerCameraManager\-\>ProcessViewRotation(DeltaTime, NewControlRotation, DeltaRot);
    }
 
    SetControlRotation(NewControlRotation);
 
    if (!PlayerCameraManager || !PlayerCameraManager\-\>bFollowHmdOrientation)
    {
        if (GEngine\-\>HMDDevice.IsValid() && GEngine\-\>HMDDevice\-\>IsHeadTrackingAllowed())
        {
            FQuat HMDOrientation;
            FVector HMDPosition;
 
            // Disable bUpdateOnRT if using this method.
            GEngine\-\>HMDDevice\-\>GetCurrentOrientationAndPosition(HMDOrientation, HMDPosition);
 
            FRotator NewViewRotation \= HMDOrientation.Rotator();
 
            // Only keep the yaw component from the controller.
            NewViewRotation.Yaw +\= NewControlRotation.Yaw;
 
            SetViewRotation(NewViewRotation);
        }
    }
 
    APawn\* const P \= GetPawnOrSpectator();
    if (P)
    {
        P\-\>FaceRotation(NewControlRotation, DeltaTime);
    }
}
 
void AYourPlayerController::SetControlRotation(const FRotator& NewRotation)
{
    ControlRotation \= NewRotation;
 
    // Anything that is overriding view rotation will need to 
    // call SetViewRotation() after SetControlRotation().
    SetViewRotation(NewRotation);
 
    if (RootComponent && RootComponent\-\>bAbsoluteRotation)
    {
        RootComponent\-\>SetWorldRotation(GetControlRotation());
    }
}
 
void AYourPlayerController::SetViewRotation(const FRotator& NewRotation)
{
    ViewRotation \= NewRotation;
}
 
FRotator AYourPlayerController::GetViewRotation() const
{
    return ViewRotation;
}

### YourCharacter.h

public:
    virtual FRotator GetViewRotation() const override;

### YourCharacter.cpp

FRotator AYourCharacter::GetViewRotation() const
{
    if (AYourPlayerController\* MYPC \= Cast<AYourPlayerController\>(Controller))
    {
        return MYPC\-\>GetViewRotation();
    }
    else if (Role < ROLE\_Authority)
    {
        // check if being spectated
        for (FConstPlayerControllerIterator Iterator \= GetWorld()\-\>GetPlayerControllerIterator(); Iterator; ++Iterator)
        {
            APlayerController\* PlayerController \= \*Iterator;
            if (PlayerController && PlayerController\-\>PlayerCameraManager\-\>GetViewTargetPawn() \== this)
            {
                return PlayerController\-\>BlendedTargetViewRotation;
            }
        }
    }
 
    return GetActorRotation();
}

### YourGameMode.cpp

AYourGameMode::AYourGameMode(const class FPostConstructInitializeProperties& PCIP)
    : Super(PCIP)
{
    DefaultPawnClass \= AYourCharacter::StaticClass();
    PlayerControllerClass \= AYourPlayerController::StaticClass();
}

See also
--------

*   [Oculus Rift](/Oculus_Rift "Oculus Rift")
*   [Oculus Rift Blueprint](/Oculus_Rift_Blueprint "Oculus Rift Blueprint")

[Kris](/User:Kris "User:Kris")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Oculus\_Rift\_Separate\_View&oldid=8967](https://wiki.unrealengine.com/index.php?title=Oculus_Rift_Separate_View&oldid=8967)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)