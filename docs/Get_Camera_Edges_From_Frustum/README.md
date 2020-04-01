Get Camera Edges From Frustum - Epic Wiki                    

Get Camera Edges From Frustum
=============================

**Rate this Tutorial:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.10

Overview
--------

This custom blueprint node retrieves the center of an **orthographic** camera's top, left, bottom and right frustum. It can be useful when you need to spawn actors right at the edge of the viewport.

Camera frustum visualized

[![CameraFrusum.png](https://d26ilriwvtzlb.cloudfront.net/e/e0/CameraFrusum.png)](/File:CameraFrusum.png)

Fire particle spawned at the center of each frustum. The cube represents the camera's location.

[![FireParticleSpawned.png](https://d26ilriwvtzlb.cloudfront.net/c/c2/FireParticleSpawned.png)](/File:FireParticleSpawned.png)

Usage
-----

The node requires a CameraComponent as the input and outputs four FVectors, one for each frustum center.

[![BlueprintUsage.png](https://d26ilriwvtzlb.cloudfront.net/7/7f/BlueprintUsage.png)](/File:BlueprintUsage.png)

  
To get this node inside the project copy the following files to your C++ classes directory.

CameraUtils.h

#pragma once
 
#include "Camera/CameraActor.h"
#include "CameraUtils.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PROJECTNAME\_API ACameraUtils : public ACameraActor
{
    GENERATED\_BODY()
 
 
public:
 
    UFUNCTION(BlueprintPure,
        meta \= (
            DisplayName \= "Get Camera Edges from Frustum",
            Keywords \= "Camera Edges Frustum"
            ),
        Category \= "Camera|Utility")
        static void GetCameraFrustumEdges(UCameraComponent\* camera, FVector& topCenter, FVector& leftCenter, FVector& bottomCenter, FVector& rightCenter);
 
 
};

  
**CameraUtils.cpp**

Note: Don't forget to change ProjectName.h to whatever your project is named

#include "ProjectName.h"
#include "CameraUtils.h"
 
 
void ACameraUtils::GetCameraFrustumEdges(UCameraComponent\* camera, FVector& topCenter, FVector& leftCenter, FVector& bottomCenter, FVector& rightCenter)
{
    // Assumptions: Camera is orthographic, Z axis is upwards, Y axis is right, X is forward
 
    FMinimalViewInfo cameraView;
    camera\-\>GetCameraView(0.0f, cameraView);
 
    float width \= cameraView.OrthoWidth;
    float height \= width / cameraView.AspectRatio;
 
    topCenter.Set(cameraView.Location.X,
                  cameraView.Location.Y,
                  cameraView.Location.Z + height/2.0f);
 
    bottomCenter.Set(cameraView.Location.X,
                     cameraView.Location.Y,
                     cameraView.Location.Z \- height / 2.0f);
 
    leftCenter.Set(cameraView.Location.X,
                   cameraView.Location.Y \- width / 2.0f,
                   cameraView.Location.Z);
 
    rightCenter.Set(cameraView.Location.X,
                    cameraView.Location.Y + width / 2.0f,
                    cameraView.Location.Z);
 
}

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Get\_Camera\_Edges\_From\_Frustum&oldid=17329](https://wiki.unrealengine.com/index.php?title=Get_Camera_Edges_From_Frustum&oldid=17329)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)