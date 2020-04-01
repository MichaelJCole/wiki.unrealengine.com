 Authoritative Networked Character Movement - Epic Wiki             

 

Authoritative Networked Character Movement
==========================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Original Author: [DarthCoder](/index.php?title=User:DarthCoder&action=edit&redlink=1 "User:DarthCoder (page does not exist)") ([talk](/index.php?title=User_talk:DarthCoder&action=edit&redlink=1 "User talk:DarthCoder (page does not exist)"))

Implementing proper authoritative character movement is a very complex, yet under documented task. This tutorial serves as an introduction to implementing networked movement features in Unreal 4 by extending the [UCharacterMovementComponent](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/UCharacterMovementComponent/index.html). This will be an intermediate to advanced tutorial, and will require using C++ since saved moves do not appear to be supported in Blueprint. Most of my knowledge of the character movement system comes from the Unreal Tournament 4 source code, so some similarities will be apparent.

Contents
--------

*   [1 Initial Setup](#Initial_Setup)
*   [2 Implementing Movement Abilities](#Implementing_Movement_Abilities)
    *   [2.1 Sprint](#Sprint)
        *   [2.1.1 Unlimited Sprint](#Unlimited_Sprint)
        *   [2.1.2 Only Sprint Forward](#Only_Sprint_Forward)
    *   [2.2 Boost Dodge](#Boost_Dodge)
    *   [2.3 Double Jump](#Double_Jump)
*   [3 Cooldown Timers](#Cooldown_Timers)
*   [4 Conclusion](#Conclusion)
*   [5 Other Resources](#Other_Resources)

Initial Setup
-------------

To implement custom networked character movement, you must extend the [UCharacterMovementComponent](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/UCharacterMovementComponent/index.html) and saved move classes. For starters let's get a class setup with all the boilerplate code out of the way. (thanks to antsonthetree for providing the code to fix this for the latest Unreal 4 version) [![Create-character-movement-class.jpg](https://d26ilriwvtzlb.cloudfront.net/b/b5/Create-character-movement-class.jpg)](/index.php?title=File:Create-character-movement-class.jpg)

_MyCharacterMovement.h_

#pragma once

#include "GameFramework/CharacterMovementComponent.h"
#include "MyCharacterMovement.generated.h"

UCLASS()
class UMyCharacterMovement : public UCharacterMovementComponent
{
	GENERATED\_UCLASS\_BODY()

	//============================================================================================
	//Replication
	//============================================================================================

public:

	friend class FSavedMove\_ExtendedMyMovement;

	virtual void UpdateFromCompressedFlags(uint8 Flags) override;

	virtual class FNetworkPredictionData\_Client\* GetPredictionData\_Client() const override;
};

class FSavedMove\_MyMovement : public FSavedMove\_Character
{
public:

	typedef FSavedMove\_Character Super;

	///@brief Resets all saved variables.
	virtual void Clear() override;

	///@brief Store input commands in the compressed flags.
	virtual uint8 GetCompressedFlags() const override;

	///@brief This is used to check whether or not two moves can be combined into one.
	///Basically you just check to make sure that the saved variables are the same.
	virtual bool CanCombineWith(const FSavedMovePtr& NewMove, ACharacter\* Character, float MaxDelta) const override;

	///@brief Sets up the move before sending it to the server. 
	virtual void SetMoveFor(ACharacter\* Character, float InDeltaTime, FVector const& NewAccel, class FNetworkPredictionData\_Client\_Character & ClientData) override;
	///@brief Sets variables on character movement component before making a predictive correction.
	virtual void PrepMoveFor(class ACharacter\* Character) override;
};

class FNetworkPredictionData\_Client\_MyMovement : public FNetworkPredictionData\_Client\_Character
{
public:
        FNetworkPredictionData\_Client\_MyMovement(const UCharacterMovementComponent& ClientMovement);

	typedef FNetworkPredictionData\_Client\_Character Super;

	///@brief Allocates a new copy of our custom saved move
	virtual FSavedMovePtr AllocateNewMove() override;
};

_MyCharacterMovement.cpp_

#include "MyCharacterMovement.h"

UMyCharacterMovement::UMyCharacterMovement(const FObjectInitializer& ObjectInitializer)
	:Super(ObjectInitializer)
{
	
}

//============================================================================================
//Replication
//============================================================================================

//Set input flags on character from saved inputs
void UMyCharacterMovement::UpdateFromCompressedFlags(uint8 Flags)//Client only
{
	Super::UpdateFromCompressedFlags(Flags);

	
}

class FNetworkPredictionData\_Client\* UMyCharacterMovement::GetPredictionData\_Client() const
{
	check(PawnOwner != NULL);
	check(PawnOwner\->Role < ROLE\_Authority);

	if (!ClientPredictionData)
	{
		UMyCharacterMovement\* MutableThis \= const\_cast<UMyCharacterMovement\*>(this);

		MutableThis\->ClientPredictionData \= new FNetworkPredictionData\_Client\_MyMovement(\*this);
		MutableThis\->ClientPredictionData\->MaxSmoothNetUpdateDist \= 92.f;
		MutableThis\->ClientPredictionData\->NoSmoothNetUpdateDist \= 140.f;
	}

	return ClientPredictionData;
}

void FSavedMove\_MyMovement::Clear()
{
	Super::Clear();

	
}

uint8 FSavedMove\_MyMovement::GetCompressedFlags() const
{
	uint8 Result \= Super::GetCompressedFlags();

	return Result;
}

bool FSavedMove\_MyMovement::CanCombineWith(const FSavedMovePtr& NewMove, ACharacter\* Character, float MaxDelta) const
{

	return Super::CanCombineWith(NewMove, Character, MaxDelta);
}

void FSavedMove\_MyMovement::SetMoveFor(ACharacter\* Character, float InDeltaTime, FVector const& NewAccel, class FNetworkPredictionData\_Client\_Character & ClientData)
{
	Super::SetMoveFor(Character, InDeltaTime, NewAccel, ClientData);

	UMyCharacterMovement\* CharMov \= Cast<UMyCharacterMovement\>(Character\->GetCharacterMovement());
	if (CharMov)
	{
		
	}
}

void FSavedMove\_MyMovement::PrepMoveFor(class ACharacter\* Character)
{
	Super::PrepMoveFor(Character);

	UMyCharacterMovement\* CharMov \= Cast<UMyCharacterMovement\>(Character\->GetCharacterMovement());
	if (CharMov)
	{
		
	}
}

FNetworkPredictionData\_Client\_MyMovement::FNetworkPredictionData\_Client\_MyMovement(const UCharacterMovementComponent& ClientMovement)
: Super(ClientMovement)
{

}

FSavedMovePtr FNetworkPredictionData\_Client\_MyMovement::AllocateNewMove()
{
	return FSavedMovePtr(new FSavedMove\_MyMovement());
}

In order to actually use the custom component we'll have to set the default subobject class in the character class constructor.

_MyCharacter.cpp_

AMyCharacter::AMyCharacter(const FObjectInitializer& ObjectInitializer)
	:Super(ObjectInitializer.SetDefaultSubobjectClass<UMyCharacterMovement\>(ACharacter::CharacterMovementComponentName))
{
	//Do normal stuff in constructor...
}

Implementing Movement Abilities
-------------------------------

### Sprint

Sprint is an example of an ability that can be implemented quite easily using just the compressed flags. To start with, we'll implement a basic unlimited sprint ability. We'll gradually improve it as we go along.

#### Unlimited Sprint

The first thing to do is add the input events to the character class.

_MyCharacter.cpp_

void AMyCharacter::SetupPlayerInputComponent(class UInputComponent\* InputComponent)
{
	check(InputComponent);

	InputComponent\->BindAction("Sprint", IE\_Pressed, this, &AMyCharacter::StartSprinting);
	InputComponent\->BindAction("Sprint", IE\_Released, this, &AMyCharacter::StopSprinting);

	//Other input bindings...
}

void AMyCharacter::StartSprinting()
{
	UMyCharacterMovement\* MoveComp \= Cast<UMyCharacterMovement\>(GetCharacterMovement());
	if (MoveComp)
	{
		MoveComp\->SetSprinting(true);
	}
}

void AMyCharacter::StopSprinting()
{
	UMyCharacterMovement\* MoveComp \= Cast<UMyCharacterMovement\>(GetCharacterMovement());
	if (MoveComp)
	{
		MoveComp\->SetSprinting(false);
	}
}

The character movement component will need to have the SetSprinting method, and also a few properties. Add the following properties and methods to _MyCharacterMovement.h_

UPROPERTY(EditAnywhere, Category \= "Sprint")
float SprintSpeedMultiplier;
UPROPERTY(EditAnywhere, Category \= "Sprint")
float SprintAccelerationMultiplier;

///@brief Activate or deactivate sprint.
void SetSprinting(bool bSprinting);

///@brief Flag for activating sprint.
uint8 bWantsToSprint : 1;

///@brief Override maximum speed during sprint.
virtual float GetMaxSpeed() const override;
///@brief Override maximum acceleration for sprint.
virtual float GetMaxAcceleration() const override;

SetSprinting will be called to activate the sprint ability, and should need no explanation. GetMaxSpeed and GetMaxAcceleration use the sprint flag to determine whether or not to apply the speed and acceleration multipliers. This is all you need for a single player game, but try to run this in a networked game you'll quickly discover it doesn't work. The client can't sprint because the server doesn't know it's trying to, so it keeps getting corrected back to the normal walking speed.

_MyCharacterMovement.cpp_

void UMyCharacterMovement::SetSprinting(bool bSprinting)
{
	bWantsToSprint \= bSprinting;
}

float UMyCharacterMovement::GetMaxSpeed() const
{
	float MaxSpeed \= Super::GetMaxSpeed();

	if (bWantsToSprint)
	{
		MaxSpeed \*= SprintSpeedMultiplier;
	}

	return MaxSpeed;
}

float UMyCharacterMovement::GetMaxAcceleration() const
{
	float MaxAccel \= Super::GetMaxAcceleration();

	if (bWantsToSprint)
	{
		MaxAccel \*= SprintAccelerationMultiplier;
	}

	return MaxAccel;
}

To make this replicate to the server and work with the prediction system we'll finally need to use the saved move class we inherited from earlier. We need to add a flag corresponding to the character movement component's sprint flag. This flag is used to re-trigger the ability later if a network correction forces us to resimulate the move.

_MyCharacterMovement.h_

class FSavedMove\_MyMovement : public FSavedMove\_Character
{
public:

	typedef FSavedMove\_Character Super;

	///@brief Resets all saved variables.
	virtual void Clear() override;

	///@brief Store input commands in the compressed flags.
	virtual uint8 GetCompressedFlags() const override;

	///@brief This is used to check whether or not two moves can be combined into one.
	///Basically you just check to make sure that the saved variables are the same.
	virtual bool CanCombineWith(const FSavedMovePtr& NewMove, ACharacter\* Character, float MaxDelta) const override;

	///@brief Sets up the move before sending it to the server. 
	virtual void SetMoveFor(ACharacter\* Character, float InDeltaTime, FVector const& NewAccel, class FNetworkPredictionData\_Client\_Character & ClientData) override;
	///@brief Sets variables on character movement component before making a predictive correction.
	virtual void PrepMoveFor(class ACharacter\* Character) override;

	uint8 bSavedWantsToSprint : 1;
};

The character movement component will create these saved moves and fill them with data needed to replay moves on the server. The implementation of the saved move is pretty much just responsible for copying the variables needed to make the movement calculations back and forth between the saved move and the character movement component. Also, the SprintSpeedMultiplier and SprintAccelerationMultiplier should be given sensible default values in the constructor (2.0f should work fine).

_MyCharacterMovement.cpp_

void UMyCharacterMovement::UpdateFromCompressedFlags(uint8 Flags)
{
	Super::UpdateFromCompressedFlags(Flags);

	//The Flags parameter contains the compressed input flags that are stored in the saved move.
	//UpdateFromCompressed flags simply copies the flags from the saved move into the movement component.
	//It basically just resets the movement component to the state when the move was made so it can simulate from there.
	bWantsToSprint \= (Flags&FSavedMove\_Character::FLAG\_Custom\_0) != 0;
}

void FSavedMove\_MyMovement::SetMoveFor(ACharacter\* Character, float InDeltaTime, FVector const& NewAccel, class FNetworkPredictionData\_Client\_Character& ClientData)
{
	Super::SetMoveFor(Character, InDeltaTime, NewAccel, ClientData);

	UExtendedCharacterMovement\* CharMov \= Cast<UExtendedCharacterMovement\>(Character\->GetCharacterMovement());
	if (CharMov)
	{
		//This is literally just the exact opposite of UpdateFromCompressed flags. We're taking the input
		//from the player and storing it in the saved move.
		bSavedWantsToSprint \= CharMov\->bWantsToSprint;
	}
}

void FSavedMove\_MyMovement::Clear()
{
	Super::Clear();

	//Clear variables back to their default values.
	bSavedWantsToSprint \= false;
}

//This is where we compress the flags saved in SetMoveFor. We're basically just ORing a bunch of them together.
uint8 FSavedMove\_ExtendedMovement::GetCompressedFlags() const
{
	uint8 Result \= Super::GetCompressedFlags();

	if (bSavedWantsToSprint)
	{
		Result |= FLAG\_Custom\_0;
	}

	return Result;
}

bool FSavedMove\_ExtendedMovement::CanCombineWith(const FSavedMovePtr& NewMove, ACharacter\* Character, float MaxDelta) const
{
	//This pretty much just tells the engine if it can optimize by combining saved moves. There doesn't appear to be
	//any problem with leaving it out, but it seems that it's good practice to implement this anyways.
	if (bSavedWantsToSprint != ((FSavedMove\_ExtendedMovement\*)&NewMove)\->bSavedWantsToSprint)
	{
		return false;
	}

	return Super::CanCombineWith(NewMove, Character, MaxDelta);
}

At this point you should have a basic sprint ability that can be triggered from either the client, or server. However, the sprint ability right now isn't very customizable. The player can sprint sideways and backwards just as easily as forwards, and can also sprint forever with no breaks between.

#### Only Sprint Forward

Disclaimer: This is only my current implementation. If I come up with a better way then I'll update this tutorial.

There are a couple ways to prevent the player from sprinting sideways and backwards. One way would be to store the forward key state in the compressed flags just like we did with bWantsToSprint. This is fairly easy to do, but it uses up a flag that could be used for other abilities. It's actually possible to prevent the player from sprinting in other directions without sending any additional data.

Since inputs are handled by the saved move, as long as our calculations only rely on things that are replicated (velocity and rotation in this example), then we can make calculations based on them. Start by adding a method to check that we're moving forward.

_MyCharacterMovement.h_

///@return Whether or not the character is currently moving in a forward direction.
bool IsMovingForward() const;

_MyCharacterMovement.cpp_

bool UMyCharacterMovement::IsMovingForward() const
{
	if (!PawnOwner)
	{
		return false;
	}

	FVector Forward \= PawnOwner\->GetActorForwardVector();
	FVector MoveDirection \= Velocity.GetSafeNormal();

	//Ignore vertical movement
	Forward.Z \= 0.0f;
	MoveDirection.Z \= 0.0f;

	float VelocityDot \= FVector::DotProduct(Forward, MoveDirection);
	return VelocityDot \> 0.7f;//Check to make sure difference between headings is not too great.
}

Then we simply check to make sure we're moving forward before applying the sprint speed boost in GetMaxSpeed and GetMaxAcceleration

_MyCharacterMovement.cpp_

float UMyCharacterMovement::GetMaxSpeed() const
{
	float MaxSpeed \= Super::GetMaxSpeed();

	if (bWantsToSprint && IsMovingForward())
	{
		MaxSpeed \*= SprintSpeedMultiplier;
	}

	return MaxSpeed;
}

float UMyCharacterMovement::GetMaxAcceleration() const
{
	float MaxAccel \= Super::GetMaxAcceleration();

	if (bWantsToSprint && IsMovingForward())
	{
		MaxAccel \*= SprintAccelerationMultiplier;
	}

	return MaxAccel;
}

### Boost Dodge

A popular feature lately in FPS games is to have boost dodges/thruster packs basically your character quickly boosts horizontally to avoid damage, close the distance for a melee, make a long jump, or whatever else the player wants to try and use it for. Two prime examples of recent games with this ability being Halo 5 and Call of Duty: Advanced Warfare. The boost dodge ability is one example of an ability that can benefit from sending extra data alongside the typical activation flags. In Unreal Tournament 4 the ability is implemented using four flags: one for each boost direction, but in this implementation we'll be sending along the character's movement vector to the server, since we can reuse it for other abilities as well.

To start with we'll deal with how to send additional input data to use in prediction. First add a variable to store it in the character movement component, then add the corresponding saved direction vector to the FSavedMove\_MyMovement class. We'll also need to override the OnMovementUpdated method. The ability activation flag is handled just like bWantsToSprint. Don't forget to give DodgeStrength and GroundDodgeStrengthMultiplier some sane default values in the constructor.

_MyCharacterMovement.h_

//Inside UMyCharacterMovement class...
UPROPERTY(EditAnywhere, Category \= "Dodge")
float DodgeStrength;
UPROPERTY(EditAnywhere, Category \= "Dodge")
float GroundDodgeStrengthMultiplier;

UFUNCTION(Unreliable, Server, WithValidation)
void ServerSetMoveDirection(const FVector& MoveDir);

///@brief Triggers the dodge action.
void DoDodge();

///@brief Event triggered at the end of a movement update
virtual void OnMovementUpdated(float DeltaSeconds, const FVector & OldLocation, const FVector & OldVelocity) override;

FVector MoveDirection;
uint8 bWantsToDodge : 1;

//Inside FSavedMove\_MyMovement class...
FVector SavedMoveDirection;
uint8 bSavedWantsToDodge : 1;

///@brief This is used to copy state from the saved move to the character movement component.
///This is ONLY used for predictive corrections, the actual data must be sent through RPC.
virtual void PrepMoveFor(class ACharacter\* Character) override;

For sending extra client inputs to the server, we'll need to use RPC functions in place of the compressed flags. A convenient place to send the inputs is in the beginning of the OnMovementUpdated method.

_MyCharacterMovement.cpp_

bool UMyCharacterMovement::ServerSetMoveDirection\_Validate(const FVector& MoveDir)
{
	return true;
}

void UMyCharacterMovement::ServerSetMoveDirection\_Implementation(const FVector& MoveDir)
{
	MoveDirection \= DodgeDir;
}

void UMyCharacterMovement::OnMovementUpdated(float DeltaSeconds, const FVector& OldLocation, const FVector& OldVelocity)
{
	Super::OnMovementUpdated(DeltaSeconds, OldLocation, OldVelocity);

	if (!CharacterOwner)
	{
		return;
	}

	//Store movement vector
	if (PawnOwner\->IsLocallyControlled())
	{
		MoveDirection \= PawnOwner\->GetLastMovementInputVector();
	}
	//Send movement vector to server
	if (PawnOwner\->Role < ROLE\_Authority)
	{
		ServerSetMoveDirection(MoveDirection);
	}
}

The input will also need to be added to the saved moves. The implementation is very similar to adding an input flag to the saved moves, but does not involve compressed flag methods. The only difference is that PrepMoveFor needs to be implemented to allow for client corrections to be made.

_MyCharacterMovement.cpp_

void FSavedMove\_MyMovement::SetMoveFor(ACharacter\* Character, float InDeltaTime, FVector const& NewAccel, class FNetworkPredictionData\_Client\_Character& ClientData)
{
	Super::SetMoveFor(Character, InDeltaTime, NewAccel, ClientData);

	UMyCharacterMovement\* CharMov \= Cast<UMyCharacterMovement\>(Character\->GetCharacterMovement());
	if (CharMov)
	{
		//This is literally just the exact opposite of UpdateFromCompressed flags. We're taking the input
		//from the player and storing it in the saved move.
		bSavedWantsToSprint \= CharMov\->bWantsToSprint;

		//Again, just taking the player movement component's state and storing it for later it in the saved move.
		SavedMoveDirection \= CharMov\->MoveDirection;
	}
}

void FSavedMove\_MyMovement::Clear()
{
	Super::Clear();

	//Clear variables back to their default values.
	bSavedWantsToSprint \= false;
	SavedMoveDirection \= FVector::ZeroVector;
}

bool FSavedMove\_MyMovement::CanCombineWith(const FSavedMovePtr& NewMove, ACharacter\* Character, float MaxDelta) const
{
	//This pretty much just tells the engine if it can optimize by combining saved moves. There doesn't appear to be
	//any problem with leaving it out, but it seems that it's good practice to implement this anyways.
	if (bSavedWantsToSprint != ((FSavedMove\_ExtendedMovement\*)&NewMove)\->bSavedWantsToSprint)
	{
		return false;
	}

	if (SavedMoveDirection != ((FSavedMove\_ExtendedMovement\*)&NewMove)\->SavedMoveDirection)
	{
		return false;
	}

	return Super::CanCombineWith(NewMove, Character, MaxDelta);
}

void FSavedMove\_MyMovement::PrepMoveFor(class ACharacter\* Character)
{
	Super::PrepMoveFor(Character);

	UMyCharacterMovement\* CharMov \= Cast<UMyCharacterMovement\>(Character\->GetCharacterMovement());
	if (CharMov)
	{
		//This is just the exact opposite of SetMoveFor. It copies the state from the saved move to the movement
		//component before a correction is made to a client.
		CharMov\->MoveDirection \= SavedMoveDirection;
		
		//Don't update flags here. They're automatically setup before corrections using the compressed flag methods.
	}
}

Now we have all the data needed in order to implement the actual ability in OnMovementUpdated. We'll also need to implement the method to trigger the ability and hook it up to the character's input component. For the sake of brevity, and my own sanity, it's assumed that you can figure out how to hook up the DoDodge method to the input component by now if you've already made it this far, so that bit of code has been omitted.

_MyCharacterMovement.cpp_

void UMyCharacterMovement::OnMovementUpdated(float DeltaSeconds, const FVector& OldLocation, const FVector& OldVelocity)
{
	Super::OnMovementUpdated(DeltaSeconds, OldLocation, OldVelocity);

	if (!CharacterOwner)
	{
		return;
	}

	//Store movement vector
	if (PawnOwner\->IsLocallyControlled())
	{
		MoveDirection \= PawnOwner\->GetLastMovementInputVector();
	}
	//Send movement vector to server
	if (PawnOwner\->Role < ROLE\_Authority)
	{
		ServerSetMoveDirection(MoveDirection);
	}

	//Update dodge movement
	if (bWantsToDodge)
	{		
		MoveDirection.Normalize();
		FVector DodgeVel \= MoveDirection\*DodgeStrength;
		DodgeVel.Z \= 0.0f;

		if (IsMovingOnGround())
		{
			DodgeVel \*= GroundDodgeStrengthMultiplier;
		}

		Launch(DodgeVel);

		bWantsToDodge \= false;
	}
}

void UMyCharacterMovement::DoDodge()
{
	bWantsToDodge \= true;
}

Now you should be able to test the character movement and boost around using whatever key you've assigned boost to. To keep things simple, this is just a basic boost implementation. You could get more advanced and average the velocities in OnMovementUpdated so that you boost faster when going forward, or use all sorts of other math to make things more interesting.

### Double Jump

A simple double jump is actually quite easy to implement. The first thing is to override the CanJumpInternal\_Implementation method in the character class so that we can actually trigger the extra jump.

_MyCharacter.cpp_

bool AMyCharacter::CanJumpInternal\_Implementation() const
{
	bool bCanJump \= Super::CanJumpInternal\_Implementation();

	UMyCharacterMovement\* MyMovementComp \= Cast<UMyCharacterMovement\>(GetCharacterMovement());
	if (!bCanJump && MyMovementComp)
	{
		bCanJump \= MyMovementComp\->CanJump();
	}

	return bCanJump;
}

It's much more convenient to check for double jumping capability inside the character movement component, so we'll just call into a CanJump method we'll add to it. Additionally, we'll want to override a couple methods, and add a couple properties. We'll also need to add a member to the saved move for corrections to work.

_MyCharacterMovement.h_

//Inside UMyCharacterMovement...

///@brief Override DoJump to trigger the extra jumps.
virtual bool DoJump(bool bReplayingMoves) override;
///@return Whether or not the character can currently jump.
bool CanJump();
///@brief This is called whenever the character lands on the ground, and will be used to reset the jump counter.
virtual void ProcessLanded(const FHitResult& Hit, float remainingTime, int32 Iterations) override;

UPROPERTY(Category \= "Multijump", EditAnywhere, BlueprintReadWrite, meta \= (DisplayName \= "Max Multijump Count"))
int32 MaxJumpCount;
UPROPERTY(Category \= "Multijump", BlueprintReadWrite, meta \= (DisplayName \= "Current jump count"))
int32 JumpCount;

//Inside FSavedMove\_MyMovement...
int32 SavedJumpCount;

Okay, I lied. It's not necessarily a double jump, because you can set the MaxJumpCount property higher than 2 to let your character jump as many times as you want. It turns out it's easier to implement this way though, so you basically get extra functionality for free.

First of all just get all the saved move stuff out of the way. Not much special here, just the same as before. The only difference being we don't have to bother sending the JumpCount through an RPC, because it just gets incremented on both the client and server whenever a jump is triggered.

_MyCharacterMovement.cpp_

void FSavedMove\_MyMovement::Clear()
{
	Super::Clear();

	//Omitted variables from previous abilities...

	SavedJumpCount \= 0;
}

bool FSavedMove\_MyMovement::CanCombineWith(const FSavedMovePtr& NewMove, ACharacter\* Character, float MaxDelta) const
{
	//Omitted variables from previous abilities...

	if (SavedJumpCount != ((FSavedMove\_MyMovement\*)&NewMove)\->SavedJumpCount)
	{
		return false;
	}

	return Super::CanCombineWith(NewMove, Character, MaxDelta);
}

void FSavedMove\_MyMovement::SetMoveFor(ACharacter\* Character, float InDeltaTime, FVector const& NewAccel, class FNetworkPredictionData\_Client\_Character & ClientData)
{
	Super::SetMoveFor(Character, InDeltaTime, NewAccel, ClientData);

	UMyCharacterMovement\* CharMov \= Cast<UMyCharacterMovement\>(Character\->GetCharacterMovement());
	if (CharMov)
	{
		//Omitted variables from previous abilities...

		SavedJumpCount \= CharMov\->JumpCount;
	}
}

void FSavedMove\_MyMovement::PrepMoveFor(class ACharacter\* Character)
{
	Super::PrepMoveFor(Character);

	UMyCharacterMovement\* CharMov \= Cast<UMyCharacterMovement\>(Character\->GetCharacterMovement());
	if (CharMov)
	{
		//Omitted variables from previous abilities...

		CharMov\->JumpCount \= SavedJumpCount;
	}
}

Now comes the actual extra jump implementation. To let the player even trigger the jump, the CanJump method we call into from the character class needs to be implemented. It's pretty self explanatory.

_MyCharacterMovement.cpp_

bool UExtendedCharacterMovement::CanJump()
{
	return (IsMovingOnGround() || JumpCount < MaxJumpCount) && CanEverJump();
}

Now all that remains is to increment the jump count whenever an extra jump is triggered, and reset it on landing. The character movement component has a DoJump method for incrementing the counter, and a convenient ProcessLanded method we can override to reset the counter.

_MyCharacterMovement.cpp_

bool UMyCharacterMovement::DoJump(bool bReplayingMoves)
{
	if (Super::DoJump(bReplayingMoves))
	{
		JumpCount++;

		return true;
	}

	return false;
}

void UMyCharacterMovement::ProcessLanded(const FHitResult& Hit, float remainingTime, int32 Iterations)
{
	JumpCount \= 0;

	Super::ProcessLanded(Hit, remainingTime, Iterations);
}

The double jump will work now if all you want to do is add an extra jump. The only problem is you can't really change directions while jumping. The good news is, we sent the movement vector earlier so that we could boost in different directions, so we can just reuse that here to make whatever velocity calculations we want to.

_MyCharacterMovement.cpp_

bool UMyCharacterMovement::DoJump(bool bReplayingMoves)
{
	if (Super::DoJump(bReplayingMoves))
	{
		JumpCount++;

		//Adjust midair velocity using the input direction
		if (JumpCount \> 1)
		{
			//Calculate lateral speed to use in adjusting trajectory in midair
			FVector LateralVelocity \= Velocity;
			LateralVelocity.Z \= 0.0f;//Don't care about vertical velocity
			float LateralSpeed \= LateralVelocity.Size();

			//Average the actual velocity with the target velocity
			FVector NewVelocity \= MoveDirection\*LateralSpeed;
			NewVelocity.Z \= 0.0f;
			NewVelocity += LateralVelocity;
			NewVelocity \*= 0.5f;

			Velocity \= NewVelocity;
			Velocity.Z \= JumpZVelocity;
		}

		return true;
	}

	return false;
}

Now jumping while holding in a different direction will cause the character to change directions mid jump.

Cooldown Timers
---------------

The last example for character movement is cooldown timers on abilities. The boost dodge ability will be used to demonstrate how to implement a simple cooldown timer. The same concept applies to sprint energy and other timer/energy type effects as well.

Timers are just calculated on both the client and the server independently, because they don't really need to match up perfectly since the server is authoritative. The only reason they need to be calculated on the client too is so that players don't try to spam the boost button and see their character getting corrected back to its original position. If you have a timer that really needs to be synchronized, then you could probably set it to be replicated, but in the interest of not wasting bandwidth the boost timer won't be replicated.

_MyCharacterMovement.h_

//Inside UMyCharacterMovement class...

UPROPERTY(EditAnywhere, Category \= "Dodge")
float DodgeCooldown;

float DodgeCooldownTimer;

//Inside FSavedMove\_MyMovement class...
float SavedDodgeCooldownTimer;

DodgeCooldown should be initialized to something like 2.0f or whatever you want the cooldown time to be. DodgeCooldownTimer is what will actually be doing the timing, so set it to 0.0f in the constructor. We'll use OnMovementUpdated to update our timers.

_MyCharacterMovement.cpp_

void UMyCharacterMovement::OnMovementUpdated(float DeltaSeconds, const FVector& OldLocation, const FVector& OldVelocity)
{
	//...

	//Update dodge movement
	if (bWantsToDodge && DodgeCooldownTimer <= 0.0f)
	{		
		MoveDirection.Normalize();
		FVector DodgeVel \= MoveDirection\*DodgeStrength;
		DodgeVel.Z \= 0.0f;

		if (IsMovingOnGround())
		{
			DodgeVel \*= GroundDodgeStrengthMultiplier;
		}

		Launch(DodgeVel);

		bWantsToDodge \= false;

		//Reset cooldown timer
		DodgeCooldownTimer \= DodgeCooldown;
	}

	//Update cooldown timers
	{
		if (DodgeCooldownTimer \> 0.0f)
		{
			DodgeCooldownTimer \-= DeltaSeconds;
		}
	}

	//...
}

We pretty much just update and check against the timers all in the OnMovementUpdated method. After a while this can get kind of messy, so in a larger project with lots of movement abilities it can be beneficial to refactor things a bit and maybe split stuff up into more methods, but for the sake of this example this will work fine.

Finally, just do the usual with the saved moves.

void FSavedMove\_MyMovement::Clear()
{
	Super::Clear();
 
	//Omitted other variables...
 
	SavedDodgeCooldownTimer\= 0;
}
 
bool FSavedMove\_MyMovement::CanCombineWith(const FSavedMovePtr& NewMove, ACharacter\* Character, float MaxDelta) const
{
	//Omitted other variables...
 
	if (SavedDodgeCooldownTimer!= ((FSavedMove\_MyMovement\*)&NewMove)\->SavedDodgeCooldownTimer)
	{
		return false;
	}
 
	return Super::CanCombineWith(NewMove, Character, MaxDelta);
}
 
void FSavedMove\_MyMovement::SetMoveFor(ACharacter\* Character, float InDeltaTime, FVector const& NewAccel, class FNetworkPredictionData\_Client\_Character & ClientData)
{
	Super::SetMoveFor(Character, InDeltaTime, NewAccel, ClientData);
 
	UMyCharacterMovement\* CharMov \= Cast<UMyCharacterMovement\>(Character\->GetCharacterMovement());
	if (CharMov)
	{
		//Omitted other variables...
 
		SavedDodgeCooldownTimer \= CharMov\->DodgeCooldownTimer;
	}
}
 
void FSavedMove\_MyMovement::PrepMoveFor(class ACharacter\* Character)
{
	Super::PrepMoveFor(Character);
 
	UMyCharacterMovement\* CharMov \= Cast<UMyCharacterMovement\>(Character\->GetCharacterMovement());
	if (CharMov)
	{
		//Omitted other variables...
 
		CharMov\->DodgeCooldownTimer \= SavedDodgeCooldownTimer;
	}
}

Conclusion
----------

Most movement abilities should be easy to implement in quite a similar fashion. A jetpack would just need to use the compressed flags to set some sort of bWantsToJetpack on the movement component, then just use OnMovementUpdated to adjust the velocity.

If you find any errors, or have any questions or suggestions about this tutorial then just drop them in the [forum thread](https://forums.unrealengine.com/showthread.php?79646-Wiki-Authoritative-Networked-Character-Movement-Tutorial&p=351317#post351317) and I'll try to update accordingly.

Other Resources
---------------

This section just includes links to various useful resources relating to the character movement component. I'll be updating this whenever I find more.

[Custom Character Movement Component](/index.php?title=Custom_Character_Movement_Component "Custom Character Movement Component")

[Character Movement Component docs](https://docs.unrealengine.com/latest/INT/Gameplay/Networking/CharacterMovementComponent/index.html)

[Error545's Character Movement Replication in UE4 blog post](http://error454.com/2015/03/20/ue4/movement/replication/)

[Custom Movement Modes](https://forums.unrealengine.com/showthread.php?5047-How-to-add-a-movement-type-inherited-from-Walking-Like-Covering)

[UTCharacterMovement.h](https://github.com/EpicGames/UnrealTournament/blob/clean-master/UnrealTournament/Source/UnrealTournament/Public/UTCharacterMovement.h)

[UTCharacterMovement.cpp](https://github.com/EpicGames/UnrealTournament/blob/clean-master/UnrealTournament/Source/UnrealTournament/Private/UTCharacterMovement.cpp)

[UTCharacter.h](https://github.com/EpicGames/UnrealTournament/blob/clean-master/UnrealTournament/Source/UnrealTournament/Public/UTCharacter.h)

[UTCharacter.cpp](https://github.com/EpicGames/UnrealTournament/blob/clean-master/UnrealTournament/Source/UnrealTournament/Private/UTCharacter.cpp)

[UTCharMovementReplication.cpp](https://github.com/EpicGames/UnrealTournament/blob/clean-master/UnrealTournament/Source/UnrealTournament/Private/UTCharMovementReplication.cpp)

  
[DarthCoder](/index.php?title=User:DarthCoder&action=edit&redlink=1 "User:DarthCoder (page does not exist)") ([talk](/index.php?title=User_talk:DarthCoder&action=edit&redlink=1 "User talk:DarthCoder (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Authoritative\_Networked\_Character\_Movement&oldid=321](https://wiki.unrealengine.com/index.php?title=Authoritative_Networked_Character_Movement&oldid=321)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")