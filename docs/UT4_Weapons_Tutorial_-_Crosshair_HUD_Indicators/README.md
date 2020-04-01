UT4 Weapons Tutorial - Crosshair HUD Indicators - Epic Wiki                    

UT4 Weapons Tutorial - Crosshair HUD Indicators
===============================================

**Rate this Tutorial:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.6, 4.7

  

Contents
--------

*   [1 Unreal Tournament Weapons Tutorial - Crosshair HUD Indicators](#Unreal_Tournament_Weapons_Tutorial_-_Crosshair_HUD_Indicators)
    *   [1.1 Requirements](#Requirements)
    *   [1.2 Overview](#Overview)
        *   [1.2.1 Video Demonstration](#Video_Demonstration)
    *   [1.3 Rocket Launcher](#Rocket_Launcher)
        *   [1.3.1 UTWeap\_RocketLauncher.cpp DrawWeaponCrosshair Code](#UTWeap_RocketLauncher.cpp_DrawWeaponCrosshair_Code)
    *   [1.4 Draw Text on Crosshair](#Draw_Text_on_Crosshair)
        *   [1.4.1 UTWeap\_ExampleWeapon.h](#UTWeap_ExampleWeapon.h)
        *   [1.4.2 UTWeap\_ExampleWeapon.cpp](#UTWeap_ExampleWeapon.cpp)

Unreal Tournament Weapons Tutorial - Crosshair HUD Indicators
=============================================================

This tutorial will show you how to create some simple crosshair HUD indicators in the Unreal Tournament project, using C++.

Requirements
------------

Some existing C++ & Unreal Engine knowledge is needed.

*   Engine version: 4.6+
*   Skill level: Beginner - Intermediate
*   Unreal Tournament Jan 2015 or Later

  

Overview
--------

Creating a new weapon in Unreal Tournament doesn't have to be difficult. But if you are introducing functionality that differs significantly from the standard Unreal Tournament arsenal of weapons, one of the challenges you'll face is communicating how your weapon functions to players who have never touched the weapon before. Unfortunately, players aren't likely to stop in the middle of their deathmatch to read a manual!

One simple way that you can help to communicate functionality of your weapon is to use the crosshair to display that information. This page is intended to give you a couple of basic templates for ways that you can override the weapon crosshair to display additional information. In this tutorial I will be providing code examples for ways that the crosshair can be used to communicate information to the player about weapon state.

### Video Demonstration

Rocket Launcher
---------------

The prototypical example of using the crosshair to display additional information about the state of your weapon is the standard Unreal Tournament Rocket Launcher. The Rocket Launcher incorporates several features to help communicate weapon state to the user. So how are these things accomplished?

### UTWeap\_RocketLauncher.cpp DrawWeaponCrosshair Code

void AUTWeap\_RocketLauncher::DrawWeaponCrosshair\_Implementation(UUTHUDWidget\* WeaponHudWidget, float RenderDelta)
{
	//Draw the Rocket Firemode Text
	if (bDrawRocketModeString && RocketModeFont !\= NULL)
	{
		FText RocketModeText \= RocketFireModes\[CurrentRocketFireMode\].DisplayString;
		float PosY \= WeaponHudWidget\-\>GetRenderScale() \* UnderReticlePadding;
 
		WeaponHudWidget\-\>DrawText(RocketModeText, 0.0f, PosY, RocketModeFont, FLinearColor::Black, 1.0f, 1.0f, FLinearColor::White, ETextHorzPos::Center, ETextVertPos::Top);
	}
 
	//Draw the crosshair
	if (LoadCrosshairTextures.IsValidIndex(NumLoadedRockets) && LoadCrosshairTextures\[NumLoadedRockets\] !\= NULL)
	{
		UTexture2D\* Tex \= LoadCrosshairTextures\[NumLoadedRockets\];
		float W \= Tex\-\>GetSurfaceWidth();
		float H \= Tex\-\>GetSurfaceHeight();
		float Scale \= WeaponHudWidget\-\>GetRenderScale() \* CrosshairScale \* GetCrosshairScale(WeaponHudWidget\-\>UTHUDOwner);
 
		float DegreesPerRocket \= 360.0f / MaxLoadedRockets;
		float CrosshairRot \= 0;
 
		if (NumLoadedRockets < MaxLoadedRockets)
		{
			float DeltaTime \= GetWorld()\-\>TimeSeconds \- LastLoadTime;
			float Alpha \= FMath::Clamp(DeltaTime / CrosshairRotationTime, 0.0f, 1.0f);
			CrosshairRot \= FMath::Lerp(0.f, DegreesPerRocket, Alpha);
		}
 
		WeaponHudWidget\-\>DrawTexture(Tex, 0, 0, W \* Scale, H \* Scale, 0.0, 0.0, W, H, 1.0, GetCrosshairColor(WeaponHudWidget), FVector2D(0.5f, 0.5f), CrosshairRot);
		AUTPlayerState\* PS;
		if (ShouldDrawFFIndicator(WeaponHudWidget\-\>UTHUDOwner\-\>PlayerOwner, PS))
		{
			WeaponHudWidget\-\>DrawTexture(WeaponHudWidget\-\>UTHUDOwner\-\>DefaultCrosshairTex, 0, 0, W \* Scale \* 0.75f, H \* Scale \* 0.75f, 0.0, 0.0, 16, 16, 1.0, FLinearColor::Green, FVector2D(0.5f, 0.5f), 45.0f);
		}
		else
		{
			UpdateCrosshairTarget(PS, WeaponHudWidget, RenderDelta);
		}
	}
 
	//Draw the locked on crosshair
	if (HasLockedTarget())
	{
		UTexture2D\* Tex \= LockCrosshairTexture;
		float W \= Tex\-\>GetSurfaceWidth();
		float H \= Tex\-\>GetSurfaceHeight();
		float Scale \= WeaponHudWidget\-\>GetRenderScale() \* GetCrosshairScale(WeaponHudWidget\-\>UTHUDOwner);
 
		FVector ScreenTarget \= WeaponHudWidget\-\>GetCanvas()\-\>Project(LockedTarget\-\>GetActorLocation());
		ScreenTarget.X \-\= WeaponHudWidget\-\>GetCanvas()\-\>SizeX\*0.5f;
		ScreenTarget.Y \-\= WeaponHudWidget\-\>GetCanvas()\-\>SizeY\*0.5f;
 
		float CrosshairRot \= GetWorld()\-\>TimeSeconds \* 90.0f;
 
		WeaponHudWidget\-\>DrawTexture(Tex, ScreenTarget.X, ScreenTarget.Y, W \* Scale, H \* Scale, 0.0, 0.0, W, H, 1.0, FLinearColor::Red, FVector2D(0.5f, 0.5f), CrosshairRot);
	}
}

As we can see here, the Rocket Launcher crosshair code is being used to handle several distinct features of the weapon:

*   When the Rocket Launcher is utilizing one of its toggled alternate firemodes, the appropriate text string is drawn below the crosshair.
*   Then the handling of the actual crosshair is drawn. The first step of this is that the texture drawn for the crosshair is chosen based on the number of loaded rockets. The second step is to rotate the crosshair to its next position as further rockets are loaded
*   Lastly, the crosshair is actually used to draw an indicator on the screen when the Rocket Launcher is locked on to a given target.

Draw Text on Crosshair
----------------------

The first and simplest example is using the crosshair to draw text on the screen. The example I will be covering here uses the crosshair to display both dynamic text and static text in order to achieve a readout of "X / 100." This can be easily adapted to display whatever textual or numerical information is needed for your purpose. Lets begin with the header file.

### UTWeap\_ExampleWeapon.h

#pragma once
 
#include "UTInventory.h"
#include "UTWeapon.h"
#include "UTWeap\_ExampleWeapon.generated.h"
 
 
/\*\*
 \* 
 \*/
UCLASS()
class UNREALTOURNAMENT\_API AUTWeap\_ExampleWeapon: public AUTWeapon
{
	GENERATED\_BODY()
 
public:
 
UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= ExampleWeapon)
    UFont\* ExampleDisplayFont;
 
void DrawWeaponCrosshair\_Implementation(UUTHUDWidget\* WeaponHudWidget, float RenderDelta) override;
 
};

As we can see here, we have a very minimal number of things we need to add to our weapon header in order to display some text. Lets move on to the .cpp file.

### UTWeap\_ExampleWeapon.cpp

#include "UnrealTournament.h"
#include "UTWeap\_ExampleWeapon.h"
 
void AUTWeap\_ExampleWeapon::DrawWeaponCrosshair\_Implementation(UUTHUDWidget\* WeaponHudWidget, float RenderDelta)
{
    // DisplayCount is the string that we will ultimately be displaying. This should be used for something meaningful to your weapon!
    FString DisplayCount \= FString::FromInt( FMath::RandRange(0, 100) );
 
    // We concatenate to DisplayCount the string " / " to use as a divider
    DisplayCount +\= FString(TEXT(" / "));
 
    // Now we concatenate to DisplayCount the string representation of 100.
    DisplayCount +\= FString::FromInt(100);
 
    // PosY is a variable declared to determine the position 
    float PosY \= WeaponHudWidget\-\>GetRenderScale() \* 50;
 
    // We use the UUTHUDWidget::DrawText function to draw our string onto the weapon HUD widget
    WeaponHudWidget\-\>DrawText(FText::FromString(DisplayCount), 0.0f, PosY, ExampleDisplayFont, FLinearColor::Black, 1.0f, 1.0f, FLinearColor::White, ETextHorzPos::Center, ETextVertPos::Top);
 
    Super::DrawWeaponCrosshair\_Implementation(WeaponHudWidget, RenderDelta);
}

As we can see here, this code is relatively straightforward. We declare a variable of type FString, converting an integer value (presumably something meaningful, but in our example we are merely generating a random number between 0 and 100) to FString type. To this dynamic value, we concatenate some additional static values that give us information on the range of values we can expect. Once we have our string, then we use the UUTHUDWidget built in DrawText function to display our string. This last step is the most involved and if you wish to truly understand what is happening I recommend reviewing the implementation of DrawText.

**Reminder**: In order to actually see any text when wielding your weapon, you need to have set the font that is used! This should be done in the blueprint of your weapon class to avoid hard-coding references to assets like the font.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UT4\_Weapons\_Tutorial\_-\_Crosshair\_HUD\_Indicators&oldid=12407](https://wiki.unrealengine.com/index.php?title=UT4_Weapons_Tutorial_-_Crosshair_HUD_Indicators&oldid=12407)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)