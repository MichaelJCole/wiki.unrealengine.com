6DOF from Flying Template - Epic Wiki                    

6DOF from Flying Template
=========================

  

**Introduction**
----------------

This is a tutorial, on how to use the existing flying c++ template to create a 6DOF (six dimensions of freedom) first person game. Before you start, create a new project from the flying template, in this tutorial I'll be using the name "SDOF".

**Getting the camera right**
----------------------------

Open up the c++ files "SDOFPawn.h" and "SDOFPawn.cpp". First, let's modify the viewpoint, so it's actually first person.

In the header file, find those pieces of code:

UPROPERTY(Category = Camera, VisibleDefaultsOnly, BlueprintReadOnly, meta = (AllowPrivateAccess = "true"))

class USpringArmComponent\* SpringArm;

and

FORCEINLINE class USpringArmComponent\* GetSpringArm() const { return SpringArm; }

and delete them. Because this is what is actually holding our camera in the position it is now.

After that, open the cpp file, and find the piece:

SpringArm = ObjectInitializer.CreateDefaultSubobject<USpringArmComponent>(this, TEXT("SpringArm0"));
SpringArm->AttachTo(RootComponent);
SpringArm->TargetArmLength = 160.0f; // The camera follows at this distance behind the character	
SpringArm->SocketOffset = FVector(0.f,0.f,60.f);
SpringArm->bEnableCameraLag = false;
SpringArm->CameraLagSpeed = 15.f;

delete it too.

Now we have to attach the camera to something, as we deleted the Spring Arm, so find the line:

Camera->AttachTo(SpringArm, USpringArmComponent::SocketName);

and change it to:

Camera->AttachTo(RootComponent);

Now you can compile it and you will be in first person view.

**Making it actually 6DOF**
---------------------------

First we have to remove the force that is keeping us upright. To do that, find the function

void ASDOFPawn::MoveRightInput(float Val)

in the cpp file. And delete this part:

// Is there any left/right input?
const bool bIsTurning = FMath::Abs(Val) > 0.2f;
// If turning, yaw value is used to influence roll
// If not turning, roll to reverse current roll value
float TargetRollSpeed = bIsTurning ? (CurrentYawSpeed \* 0.5f) : (GetActorRotation().Roll \* -2.f);
// Smoothly interpolate roll speed
CurrentRollSpeed = FMath::FInterpTo(CurrentRollSpeed, TargetRollSpeed, GetWorld()->GetDeltaSeconds(), 2.f);

Now we need to create a function that makes it possible to control rolling.

So open up the header file and after the line

void MoveRightInput(float Val);

add this line

void RollInput(float Val);

Then, open the cpp file ad at the end add this code:

void ASDOFPawn::RollInput(float Val)
{
       float TargetRollSpeed = (Val \* TurnSpeed);
       CurrentRollSpeed = FMath::FInterpTo(CurrentRollSpeed, TargetRollSpeed, GetWorld()->GetDeltaSeconds(), 2.f);
}

This is actually the code from the MoveRightInput function, just slightly modified to influence roll instead of yaw.

Now we need to bind our Roll input axis to this function. So find the lines:

InputComponent->BindAxis("Thrust", this, &ASDOFPawn::ThrustInput);
InputComponent->BindAxis("MoveUp", this, &ASDOFPawn::MoveUpInput);
InputComponent->BindAxis("MoveRight", this, &ASDOFPawn::MoveRightInput);

and add this line after them:

InputComponent->BindAxis("Roll", this, &ASDOFPawn::RollInput);

Now compile the project.

That's it, now we have to change the config of our project so we have a way to input roll. Open the project in the unreal editor, and open the input config using Edit->Project Settings...->Input, add an axis mapping, name it "Roll" and add two keys to it. E and Q. Set E scale to 1, and Q scale to -1.

That's it!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=6DOF\_from\_Flying\_Template&oldid=10483](https://wiki.unrealengine.com/index.php?title=6DOF_from_Flying_Template&oldid=10483)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)