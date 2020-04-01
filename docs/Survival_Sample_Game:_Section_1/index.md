Survival Sample Game: Section 1 - Epic Wiki                    

Survival Sample Game: Section 1
===============================

**Rate this Tutorial:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (9 votes)

Approved for Versions:4.7

Be sure to first read the **[project overview page](https://wiki.unrealengine.com/Survival_sample_game)** for information on the project series, recommended documentation and a section overview! The best place for questions and feedback is the [official forum thread](https://forums.unrealengine.com/showthread.php?63678-Upcoming-C-Gameplay-Example-Series-Making-a-Survival-Game), it is monitored (the community is often kind enough to help out too!) and will try to answer any question as quickly as possible.

Contents
--------

*   [1 Introduction](#Introduction)
    *   [1.1 Other concepts available in source:](#Other_concepts_available_in_source:)
*   [2 Setting up Input in C++](#Setting_up_Input_in_C.2B.2B)
*   [3 Exposing functions and properties to Blueprint.](#Exposing_functions_and_properties_to_Blueprint.)
*   [4 Performing Ray-traces](#Performing_Ray-traces)
*   [5 Checking the Type of Actor](#Checking_the_Type_of_Actor)
*   [6 Third person Camera](#Third_person_Camera)
    *   [6.1 Extending CameraManager](#Extending_CameraManager)
*   [7 Using Timers](#Using_Timers)
*   [8 Replication (Networking)](#Replication_.28Networking.29)
    *   [8.1 RepNotify](#RepNotify)
*   [9 Closing](#Closing)

### Introduction

This section sets up the third-person character movement with animation, object interaction, simple hunger system, sound and particle playback - all with networking support.

Please consider this documentation a reference guide to get additional information on topics covered in the sample game's source itself. If you are missing a topic or think a specific topic requires more details then feel free to leave your feedback on the **[section-specific forum thread](https://forums.unrealengine.com/showthread.php?64833-Announcing-Section-1-for-Survival-Game)**!

[![Survivalgame section1.jpg](https://d26ilriwvtzlb.cloudfront.net/7/78/Survivalgame_section1.jpg)](/File:Survivalgame_section1.jpg)

View & download **[latest project source](https://github.com/tomlooman/EpicSurvivalGameSeries)** on GitHub a **[branch for this section](https://github.com/tomlooman/EpicSurvivalGameSeries/tree/Section-1)** is available too.

#### Other concepts available in source:

Each section covers a lot more subjects and concepts than I could cover in the docs, if you are interested in learning more you can explore the code and content of the subjects below. Any questions you might have can be answered on the [forums of this section](https://forums.unrealengine.com/showthread.php?64833-Announcing-Section-1-for-Survival-Game).

*   Handling Sound & Particle FX in C++.
*   Overriding existing game framework functionality.
*   Setup of components.
*   Using C++ character movement and behavior data in AnimBlueprint.
*   Advanced MovementComponent to allow sprinting (_SCharacterMovementComponent.cpp_)
*   Advanced Camera Manipulation with FOV zoom (_SCameraManager.cpp_)
*   Interacting with objects in the world. (_SUsableActor.cpp_)

### Setting up Input in C++

Binding functions to Key/Mouse input is a fairly simple two-step process. First you bind a string such as "MoveForward" to a function as shown below. The second step is to map this string of "MoveForward" to a key or mouse event by going to  _Edit > Project Settings > Input._

*   **BindAction()** - Provides a trigger to call events like Jump or Throw. You may specify when you wish to run the function in the second parameter.
*   **BindAxis()** - Useful for Movement and mouse input. The function you bind to this takes a single float as input. For example to move forward with W (1.0) or backward with S (-1.0), these values are manually specified in your project settings _Edit > Project Settings > Input_.

[SCharacter.cpp](https://github.com/tomlooman/EpicSurvivalGameSeries/blob/Section-1/SurvivalGame/Source/SurvivalGame/Private/SCharacter.cpp)

// Called to bind functionality to input
void ASCharacter::SetupPlayerInputComponent(class UInputComponent\* InputComponent)
{
    Super::SetupPlayerInputComponent(InputComponent);

    /\* Movement \*/
    InputComponent->BindAxis("MoveForward", this, &ASCharacter::MoveForward);
    InputComponent->BindAxis("MoveRight", this, &ASCharacter::MoveRight);

    /\* Looking up/down/sideways is already supported in APawn.h, so we simply reference the existing functions. \*/
    InputComponent->BindAxis("Turn", this, &APawn::AddControllerYawInput);
    InputComponent->BindAxis("LookUp", this, &APawn::AddControllerPitchInput);

    /\* There is an overload (meaning a variation with a different set of parameters, but equal funciton name) available to specify when you wish the function to execute. This parameter is only available for BindAction function     and not the above BindAxis. \*/
    InputComponent->BindAction("Jump", IE\_Pressed, this, &ASCharacter::OnStartJump);
    InputComponent->BindAction("Jump", IE\_Released, this, &ASCharacter::OnStopJump);
}

[SCharacter.h](https://github.com/tomlooman/EpicSurvivalGameSeries/blob/Section-1/SurvivalGame/Source/SurvivalGame/Public/SCharacter.h)

Example of the different between MoveForward that binds to an Axis, and OnStartJump that binds to an Action.

virtual void MoveForward(float Val);

void OnStartJump();

You can read more on [Input](https://docs.unrealengine.com/latest/INT/Gameplay/Input/index.html) here.

### Exposing functions and properties to Blueprint.

Unreal Engine 4 supports several C++ Macros that allow you to expose properties and functions to Blueprint. This is very valuable for designers to extend C++ classes with Blueprint behavior and to rapidly tweak or overwrite values for multiple different child Blueprints. The same C++ Macros are used for replication (Networking), serialization (load/save games) etc. Replication is covered in later parts of this section.

[SCharacter.h](https://github.com/tomlooman/EpicSurvivalGameSeries/blob/Section-1/SurvivalGame/Source/SurvivalGame/Public/SCharacter.h)

/\* UPROPERTY is a Macro that exposes this variable to Unreal’s reflection system, this is how the editor knows how to deal with/visualize this value and to show or hide it as a tweakable value. It has several other purposes too which we will dig into later (such as replication) It is not required on every variable, only when you wish to apply special logic on it like exposing it to Blueprint. \*/
UPROPERTY(EditDefaultsOnly, Category = "PlayerCondition", Replicated)
float Health;

/\* UFUNCTION follows the same theory, but is specialized to functions. In this case we expose the function to Blueprint and place it under “PlayerCondition” context menus of the editor. (you can specify any new category you wish. The “const” specifier specifies that no value inside this function is changed, it effectively turns this into into readonly. \*/
UFUNCTION(BlueprintCallable, Category = "PlayerCondition")
float GetMaxHealth() const;

Even if you expose a property to Blueprint it’s recommended to assign sensible default values in the constructor so a designer can immediately start tweaking when creating a child Blueprint based on the C++ parent.

For more information please refer to [Unreal Architecture](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/index.html) page.

### Performing Ray-traces

Performing ray-traces is one way to finding objects in your scene, if you’re new to physics and/or collision in Unreal Engine 4 check out the [Collision Responses](https://docs.unrealengine.com/latest/INT/Engine/Physics/Collision/index.html) page for info on Collision channels, responses and a few common interaction samples.

This section we only use ray-tracing (or line tracing) to retrieve the object the player crosshair is currently looking at. In later sections we will perform line-traces to handle weapon damage and use physics material response to determine damage and particle effect responses.

Performing a line trace is very simple, you need a start, end and length. Another important parameter to be aware of is the collision-channel. In the example below we use _ECC\_Visibility_, any object that does not interact with this channel will let the ray pass through uninterrupted.

Using bTraceComplex ensures we won’t collide with any rough blockers that are used for player motion and that we instead use per-triangle collision checks. Using this is more expensive, but required to avoid frustration of small invisible collision pieces sticking out of nearby objects that interrupt the ray.

/\*
    Performs ray-trace to find closest looked-at UsableActor.
\*/

ASUsableActor\* ASCharacter::GetUsableInView()
{
    FVector CamLoc;
    FRotator CamRot;

    if (Controller == NULL)
        return NULL;

    /\* This retrieves are camera point of view to find the start and direction we will trace. \*/
    Controller->GetPlayerViewPoint(CamLoc, CamRot);
    const FVector TraceStart = CamLoc;
    const FVector Direction = CamRot.Vector();
    const FVector TraceEnd = TraceStart + (Direction \* MaxUseDistance);

    FCollisionQueryParams TraceParams(FName(TEXT("TraceUsableActor")), true, this);
    TraceParams.bTraceAsyncScene = true;
    TraceParams.bReturnPhysicalMaterial = false;
    TraceParams.bTraceComplex = true;

    /\* FHitResults is passed in with the trace function and holds the result of the trace. \*/
    FHitResult Hit(ForceInit);
    GetWorld()->LineTraceSingle(Hit, TraceStart, TraceEnd, ECC\_Visibility, TraceParams);

    /\* Uncomment this to visualize your line during gameplay. \*/
    //DrawDebugLine(GetWorld(), TraceStart, TraceEnd, FColor::Red, false, 1.0f);

    return Cast<ASUsableActor>(Hit.GetActor());
}

### Checking the Type of Actor

Continuing with the code snippet above, we end with a type-cast to our SUsableActor class, if the cast fails it safely returns _NULL_. And since you should always check your returned pointers, the rest of the calling code will never run (see example below)

ASUsableActor\* Usable = GetUsableInView();
if (Usable) /\* Is NULL unless we hit an actor and successfully Cast it to SUsableActor \*/
{
    /\* This won’t run unless the cast was succesful, if you’re familiar with langu    ages such as C#, if (UsableActor) is equal to if (UsableActor != NULL) in C#. \*/
    Usable->OnUsed(this);
}

Always make sure you include the correct header for the class you are casting to. In this case we must add...

#include “SUsableActor.h”

...to the top of our SCharacter.cpp file. This is true whenever you use your own types in another class, I’m simply putting a reminder here - C++ errors may end up looking quite cryptic if you leave this out.

### Third person Camera

A third person camera requires some additional setup compared to a first-person viewpoint, but it’s still very quick and easy to do. All we need is to attach a spring arm between our character and the camera we wish to place behind our player mesh. The SpringArmComponent supports some neat features such as _bUsePawnControlRotation_ to make the attached camera (or other component if we wish) follow the rotation of our character.

ASCharacter::ASCharacter(const class FObjectInitializer& ObjectInitializer)
: Super(ObjectInitializer.SetDefaultSubobjectClass<USCharacterMovementComponent>(ACharacter::CharacterMovementComponentName))
{
    // …

    /\* The spring component sits between the character and the camera and handles position and rotation of the camera we attach to this spring arm. \*/
    CameraBoomComp = ObjectInitializer.CreateDefaultSubobject<USpringArmComponent>(this, TEXT("CameraBoom"));

    /\* Some defaults to start with, socket is the start and target is position     of our camera. Tweakable in Blueprint. \*/
    CameraBoomComp->SocketOffset = FVector(0, 35, 0);
    CameraBoomComp->TargetOffset = FVector(0, 0, 55);

    /\* Enabling this makes the camera stick on the character’s back. \*/
    CameraBoomComp->bUsePawnControlRotation = true;
    CameraBoomComp->AttachParent = GetRootComponent();

    /\* Simple camera, attached to the spring arm to handle the rotation. \*/
    CameraComp = ObjectInitializer.CreateDefaultSubobject<UCameraComponent>(this, TEXT("Camera"));

    CameraComp->AttachParent = CameraBoomComp;
}

#### Extending CameraManager

This is great for some more advanced camera manipulations at runtime such as dynamically changing the Field of View. You can inspect [ASPlayerCameraManager.cpp](https://github.com/tomlooman/EpicSurvivalGameSeries/blob/Section-1/SurvivalGame/Source/SurvivalGame/Private/SPlayerCameraManager.cpp) on how that works.

ASPlayerController::ASPlayerController(const class FObjectInitializer& ObjectInitializer)
: Super(ObjectInitializer)
{
    PlayerCameraManagerClass = ASPlayerCameraManager::StaticClass();
}

And don’t forget to include the correct header!

### Using Timers

Timers can be very useful in many different gameplay scenarios. In the example we use it for the fuze of the pirate bomb. When the player interacts with the object, the fuze is activated (sound plays and particles start fizzing) and a timer is set as seen below.

void ASBombActor::OnUsed(APawn\* InstigatorPawn)
{
    Super::OnUsed(InstigatorPawn);

    if (!bIsFuzeActive)
    {
        // This will trigger the ActivateFuze() on the clients
        bIsFuzeActive = true;

        // Repnotify does not trigger on the server, so call the function here directly.
        SimulateFuzeFX();

        // Active the fuze to explode the bomb after several seconds
        FTimerHandle TimerHandle;
        GetWorld()->GetTimerManager().SetTimer(TimerHandle, this, &ASBombActor::OnExplode, MaxFuzeTime, false);
    }
}

After _MaxFuzeTime_ elapses, OnExplode() is called. Since we pass “false” as the final parameter the timer does NOT repeat.

### Replication (Networking)

I can recommend everyone interested in making a networked game to read through the [Networking & Multiplayer](https://docs.unrealengine.com/latest/INT/Gameplay/Networking/index.html) documentation pages.

There is an [Networking Intro](https://www.youtube.com/watch?v=TbaOyvWfJE0) video on YouTube that explains some additional basics of the server-client pattern.

If you are using replication in your own project make sure you add...

#include "Net/UnrealNetwork.h"

...to your YourProjectName.h file (eg. SurvivalGame.h) in Visual Studio. Otherwise you do not have access to the required macros for replication (such as DOREPLIFETIME(...))

A nice “trick” with YourProjectName.h is that any header you include is now available to all class files in the project, but don’t go around adding all your custom classes to this file! It will only increase your compilation times.

A general rule in networking is to Never trust the client. All gameplay runs on the server. This means that updating a variable, should be done on the server. Input is triggered on the client, yet we change the value on the server before the other clients will receive this change.

Using Targeting (or Aiming Down Sights) as an example:

/\* “Transient” is related to serialization, we only care about the “Replicated” designation for this section. Do remember to always include your variables inside the GetLifetimeReplicatedProps() function or they will not replicate to clients. (as shown below) \*/
UPROPERTY(Transient, Replicated)
bool bIsTargeting;

A very common convention from earlier versions of the engine is to prefix server-side functions with “Server” and explicit client-side functions with “Client”. A function without either one specified in the UFUNCTION macro should not use either prefixes.

Now any client should call SetTargeting(), inside the function we check if we are authorative (Role == ROLE\_Authority) if that check fails, we push the request to the server function which is ServerSetTargeting().

void SetTargeting(bool NewTargeting);

UFUNCTION(Server, Reliable, WithValidation)
void ServerSetTargeting(bool NewTargeting);

There are a few things to know about when dealing with server functions. In your class (cpp) file there is no function that is called ServerSetTargeting(), instead you have ServerSetTargeting\_Implementation() and ServerSetTargeting\_Validate(). In most cases, your \_Implementation should only call the original function, since it is now executed on the server the Role check will pass. and the variables get updated and later replicated back to all clients.

As you can see in the first function, we directly set the variable regardless of Role. This is possible because we used the COND\_SkipOwner, replication condition on this variable inside the GetLifetimeReplicatedProps() function (see 2nd example below). With this special replication condition the value is never send back to us, so we have to set it locally anyway.

void ASCharacter::SetTargeting(bool NewTargeting)
{
    bIsTargeting = NewTargeting;

    if (Role < ROLE\_Authority)
    {
        ServerSetTargeting(NewTargeting);
    }
}

void ASCharacter::ServerSetTargeting\_Implementation(bool NewTargeting)
{
    SetTargeting(NewTargeting);
}

bool ASCharacter::ServerSetTargeting\_Validate(bool NewTargeting)
{
    return true;
}

If you browse to [Character.cpp](https://github.com/tomlooman/EpicSurvivalGameSeries/blob/master/SurvivalGame/Source/SurvivalGame/Private/SCharacter.cpp) you will notice a function like:

void ASCharacter::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
    Super::GetLifetimeReplicatedProps(OutLifetimeProps);

    // Value is already updated locally, so we may skip it in replication step for the owner only (1 client)
    DOREPLIFETIME\_CONDITION(ASCharacter, bWantsToRun, COND\_SkipOwner);
    DOREPLIFETIME\_CONDITION(ASCharacter, bIsTargeting, COND\_SkipOwner);
    DOREPLIFETIME\_CONDITION(ASCharacter, bIsJumping, COND\_SkipOwner);

    // Replicate to every client, no special condition required
    DOREPLIFETIME(ASCharacter, Health);
    DOREPLIFETIME(ASCharacter, Hunger);
}

There are two different replication methods being used here. The first (DOREPLIFETIME\_CONDITION(...)) is an optimization, since we already set our value locally, we can skip the owning client of the object. We do want to replicate these values to all other clients (and server) because for example bIsTargeting is used to drive the animation of the characters that are controlled by the other players.

DOREPLIFETIME(...) is the default way, it replicates the value to all clients with no special logic. Now at this stage of the project you might be wondering why we want to replicate this value to other clients (afterall, they do not SEE or NEED this value at this time? And you are correct, we could have used DOREPLIFETIME\_CONDITION(..., …, COND\_OwnerOnly) to reduce network load! But since we are looking ahead, I know I want to include this data into the HUD as healthbars for your “party members”.

#### RepNotify

RepNotify is another replication concept so that clients can immediately respond to changes in a variable by the server. Whenever a variable marked with UPROPERTY(...,  ReplicatedUsing=OnRep\_YourFunction) is updated then “OnRep\_YourFunction” gets called, OnRep\_ is another standard prefix you should consider using when dealing with RepNotify in your own code.

[View SBombActor.cpp](https://github.com/tomlooman/EpicSurvivalGameSeries/blob/master/SurvivalGame/Source/SurvivalGame/Private/SBombActor.cpp) for an example on RepNotify. The pirate bomb responds to _bIsFuzeActive_ by activating the sound and particle FX through OnRep\_FuzeActive(). A good convention to use when dealing with RepNotify is to split cosmetic features into functions with a "Simulate" prefix. That makes it easier to keep track of the gameplay critical data that must always run on the server, and the cosmetic that is played on clients and non-dedicated servers (eg. a player that acts as the host of the match) only.

### Closing

This first section has given us a great springboard for the upcoming sections that will focus more on the gameloop such as enemies, damage dealing and game rules. If you are confused on a particular feature that was covered, feel free to ask about it in the [official section 1 thread](https://forums.unrealengine.com/showthread.php?64833-Announcing-Section-1-for-Survival-Game) for this project.

[Main Project Page](https://wiki.unrealengine.com/Survival_sample_game)

[Main Forum Thread](https://forums.unrealengine.com/showthread.php?63678-Upcoming-C-Gameplay-Example-Series-Making-a-Survival-Game)

[Source on GitHub](https://github.com/tomlooman/EpicSurvivalGameSeries)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Survival\_Sample\_Game:\_Section\_1&oldid=26251](https://wiki.unrealengine.com/index.php?title=Survival_Sample_Game:_Section_1&oldid=26251)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)