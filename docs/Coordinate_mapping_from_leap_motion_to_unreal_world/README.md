Coordinate mapping from leap motion to unreal world - Epic Wiki                    

Coordinate mapping from leap motion to unreal world
===================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Requirements](#Requirements)
*   [3 Tutorials](#Tutorials)
*   [4 Problem with this method](#Problem_with_this_method)

Overview
--------

**Rate this Video:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.8,4.9

This page provides a way to change coordinate mapping from leap motion world to unreal world in **official** leap motion plug-in. In the current leap motion plug in, there is no obvious way to change the mapping. It is inconvenient if you want to move your hand farther in unreal world.

Requirements
------------

This tutorial requires to change leap motion plug in code; Therefore, You need to use "build from source" version of unreal engine from unreal github. To apply the change in leap motion plug-in code, in unreal editor, you can go to Windows->Developer Tools->Modules, and find "LeapMotionController" and click recompile [How to build unreal engine from source](//https://www.unrealengine.com/ue4-on-github).

  

Tutorials
---------

Open Visual studio of your project and open LeapMotionHandActor.cpp from Engine/Runtime/LeapMotionController\\Source\\Private The Relative code is at around line 153, UpdateBones() function.

void ALeapMotionHandActor::UpdateBones(float DeltaSeconds)
{
   if (BoneActors.Num() == 0) { return; }

   float CombinedScale = GetCombinedScale();

   FLeapMotionDevice\* Device = FLeapMotionControllerPlugin::GetLeapDeviceSafe();
   if (Device && Device->IsConnected())
     {
     int BoneArrayIndex = 0;
     for (ELeapBone LeapBone = bShowArm ? ELeapBone::Forearm : ELeapBone::Palm; LeapBone <= ELeapBone::Finger4Tip;      ((int8&)LeapBone)++)
        {
         FVector TargetPosition;
         FRotator TargetOrientation;

         bool Success = Device->GetBonePostionAndOrientation(HandId, LeapBone, TargetPosition, TargetOrientation);
         if (Success)
           {
           // Offset target position & rotation by the SpawnReference actor's transform
           const FQuat RefQuat = GetRootComponent()->GetComponentQuat();
           TargetPosition = RefQuat \* TargetPosition \* CombinedScale + GetRootComponent()->GetComponentLocation();
           TargetOrientation = (RefQuat \* TargetOrientation.Quaternion()).Rotator();

           // Get current position & rotation
           ALeapMotionBoneActor\* BoneActor = BoneActors\[BoneArrayIndex++\];
           UPrimitiveComponent\* PrimitiveComponent = Cast<UPrimitiveComponent>(BoneActor->GetRootComponent());
           if (PrimitiveComponent)
           {
           PrimitiveComponent->SetRelativeLocationAndRotation(TargetPosition, TargetOrientation, true);
				}
			}
		}
	}
}

To start with, in the last line, I recommend you change "PrimitiveComponent->SetRelativeLocationAndRotation(TargetPosition, TargetOrientation, true)" to "PrimitiveComponent->SetWorldLocationAndRotation(TargetPosition, TargetOrientation, true)"

You might find a problem that you put LeapMotioncontroller actor into the unreal world but hand does not show up in the location you put the controller but some location far away. With the change above, hand can correctly show up in the position you placed LeapMotioncontroller actor.

Then we can start to change the coordinate mapping. My method is to only multiply the first bone's location by a factor and change other bones according to the first bone.

void ALeapMotionHandActor::UpdateBones(float DeltaSeconds)
{
   //MODIFICATION.This array to record each bone's position. The first bone's position is boneLocationData\[0\]
   TArray<FVector> boneLocationData;
        
   if (BoneActors.Num() == 0) { return; }

   float CombinedScale = GetCombinedScale();

   FLeapMotionDevice\* Device = FLeapMotionControllerPlugin::GetLeapDeviceSafe();
   if (Device && Device->IsConnected())
    {
      int BoneArrayIndex = 0;
      for (ELeapBone LeapBone = bShowArm ? ELeapBone::Forearm : ELeapBone::Palm; LeapBone <= ELeapBone::Finger4Tip;       ((int8&)LeapBone)++)
      {
         FVector TargetPosition;
         FRotator TargetOrientation;

         bool Success = Device->GetBonePostionAndOrientation(HandId, LeapBone, TargetPosition, TargetOrientation);
         if (Success)
          {
           // Offset target position & rotation by the SpawnReference actor's transform
            const FQuat RefQuat = GetRootComponent()->GetComponentQuat();
            TargetPosition = RefQuat \* TargetPosition \* CombinedScale + GetRootComponent()->GetComponentLocation();
            TargetOrientation = (RefQuat \* TargetOrientation.Quaternion()).Rotator();

            // Get current position & rotation
            ALeapMotionBoneActor\* BoneActor = BoneActors\[BoneArrayIndex++\];
            UPrimitiveComponent\* PrimitiveComponent = Cast<UPrimitiveComponent>(BoneActor->GetRootComponent());
            if (PrimitiveComponent)
             {
              //MODIFICATION. you can substitute 15 with the factor you like 
               PrimitiveComponent->SetWorldLocationAndRotation(TargetPosition + FVector(boneLocationData\[0\].X \* 15, boneLocationData\[0\].Y \* 15, boneLocationData\[0\].Z\*15), TargetOrientation, true);
					
				}
			}
		}
		


	}
}

Problem with this method
------------------------

The Starting location will also change by this mapping. You maybe need some calculation to find out the starting location. If you find out a way not to change starting point, please feel free to change this page. I feel the possible solution is related to the [interaction box](//https://developer.leapmotion.com/documentation/csharp/devguide/Leap_Coordinate_Mapping.html).

\-ywj7931

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Coordinate\_mapping\_from\_leap\_motion\_to\_unreal\_world&oldid=17199](https://wiki.unrealengine.com/index.php?title=Coordinate_mapping_from_leap_motion_to_unreal_world&oldid=17199)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)