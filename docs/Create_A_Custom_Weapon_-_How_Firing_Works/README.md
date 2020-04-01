Create A Custom Weapon - How Firing Works - Epic Wiki                    

Create A Custom Weapon - How Firing Works
=========================================

**Rate this Tutorial:**

4.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:4.6, 4.7

Contents
--------

*   [1 Intro: How Firing Works in Unreal Tournament](#Intro:_How_Firing_Works_in_Unreal_Tournament)
    *   [1.1 Requirements](#Requirements)
    *   [1.2 Classes Overview](#Classes_Overview)
*   [2 From Player to Weapon](#From_Player_to_Weapon)
*   [3 Weapon States](#Weapon_States)

### Intro: How Firing Works in Unreal Tournament

So you want to create a custom weapon, but you're unsure how to implement in C++/Blueprints the functionality of your weapon design?

This tutorial is intended to cover some basics in conceptualizing how the pieces of weapon code work together to create the desired weapon behavior. This can be useful if you want to try implementing weapon behavior that may not exist in any known weapons, and thus extending from those weapons is not appropriate.

  

#### Requirements

*   Access to Unreal Tournament C++ Source / GitHub, & Unreal Engine 4 Editor.
*   Engine version: 4.6
*   Skill level: Beginner

At this stage I assume you have all of the Unreal Tournament source files and have successfully compiled the project from source.

#### Classes Overview

This tutorial assumes a fairly basic level of knowledge of Unreal Engine classes, so for that purpose I will be outlining the classes featured in this tutorial and their basic functionality.

*   UTPlayerController: The UTPlayerController is an abstract entity that acts as an interface between the player and the world. Think of the PlayerController as a 'spirit' that inhabits bodies within the game world.
*   UTCharacter: The UTCharacter class is the basic class that defines a "body" in the game world. Typically this might be a human, but it may also be an alien, a monster, etc. A character is generally 'possessed' by a PlayerController (or a BotController, if it's an AI Bot).
*   UTCharacterMovement: This object is a component of the Character, it defines movement related properties of a UTCharacter
*   UTWeapon: A UTWeapon is an inventory item, it is held by a UTCharacter.
*   UTWeaponState: A UTWeaponState is an object within UTWeapon used to define its state (being held, being fired, being put away, etc).

  

  

### From Player to Weapon

What happens between the player pressing the mouse button and the firing of a weapon? How does a mouse click translate into a shock beam or a cluster of flak shards? When you want to implement behavior that differs from standard weapons this is a question you might find yourself asking. Other tutorials demonstrate that we can call the functions **UTWeapon::FireInstantHit()** or **UTWeapon::FireProjectile()** to fire a hitscan beam or to fire a projectile. We can override these functions to change the behavior of each function individually, but how do we get there?

The first step is to open the Editor and look under the menu **Edit** -> **Project Settings**. In the **Project Settings** window we should look at the **Input** section.

As of the writing of this tutorial, the **Input** section for the Unreal Tournament project looks like so:

[![Editorinput.jpg](https://d26ilriwvtzlb.cloudfront.net/b/be/Editorinput.jpg)](/File:Editorinput.jpg)

This can also be seen in the **UnrealTournament/UnrealTournament/Config/DefaultInput.ini** file:

+ActionMappings\=(ActionName\="StartFire", Key\=LeftMouseButton)
+ActionMappings\=(ActionName\="StopFire", Key\=LeftMouseButton)
+ActionMappings\=(ActionName\="StartFire", Key\=Gamepad\_RightTrigger)
+ActionMappings\=(ActionName\="StopFire", Key\=Gamepad\_RightTrigger)
+ActionMappings\=(ActionName\="StartFire", Key\=RightControl)
+ActionMappings\=(ActionName\="StopFire", Key\=RightControl)
+ActionMappings\=(ActionName\="StartAltFire", Key\=RightMouseButton)
+ActionMappings\=(ActionName\="StopAltFire", Key\=RightMouseButton)
+ActionMappings\=(ActionName\="StartAltFire", Key\=Gamepad\_LeftTrigger)
+ActionMappings\=(ActionName\="StopAltFire", Key\=Gamepad\_LeftTrigger)

  
Whether you're looking in the Editor or at DefaultInput.ini, you'll see that the important thing that occurs when the player presses the default fire input is the action called "StartFire." So what does StartFire do? Using Visual Studio we can search the entire Unreal Tournament solution (Ctrl+Shift+F) for "StartFire." These results will be found in **UTPlayerController::SetupInputComponent()** :

	InputComponent\-\>BindAction("StartFire", IE\_Pressed, this, &AUTPlayerController::OnFire);
	InputComponent\-\>BindAction("StopFire", IE\_Released, this, &AUTPlayerController::OnStopFire);
	InputComponent\-\>BindAction("StartAltFire", IE\_Pressed, this, &AUTPlayerController::OnAltFire);
	InputComponent\-\>BindAction("StopAltFire", IE\_Released, this, &AUTPlayerController::OnStopAltFire);

From here we can see the InputComponent of the PlayerController is binding an action called "StartFire" to the function **UTPlayerController::OnFire()**. This tells us that when the player presses left mouse button, the StartFire binding is called and our **UTPlayerController::OnFire()** function is called.

Looking at the implementation of **UTPlayerController::OnFire()** we will see

void AUTPlayerController::OnFire()
{
	if (GetPawn() !\= NULL)
	{
		new(DeferredFireInputs) FDeferredFireInput(0, true);
	}
	else if (IsInState(NAME\_Spectating))
	{
		if ((PlayerState \== nullptr || !PlayerState\-\>bOnlySpectator) && 
			bPlayerIsWaiting)
		{
			ServerRestartPlayer();
		}
		else
		{
			ServerViewNextPlayer();
		}
	}
	else
	{
		ServerRestartPlayer();
	}
}

This might look a little confusing at first, but the key element to point out here is the code that executes when we have a pawn. The majority of this code handles spectating only, so only the line

		new(DeferredFireInputs) FDeferredFireInput(0, true);

Is relevant to the actual firing behavior while the player is alive. What does this line do? In short, it creates an object of type FDeferredFireInput, passing along the FireMode, in this case 0, and whether this input was the start or end of the input.

The definition for the FDefferedFireInput can be seen in the UTPlayerController.h

struct FDeferredFireInput
{
	/\*\* the fire mode \*/
	uint8 FireMode;
	/\*\* if true, call StartFire(), false call StopFire() \*/
	bool bStartFire;
 
	FDeferredFireInput(uint8 InFireMode, bool bInStartFire)
		: FireMode(InFireMode), bStartFire(bInStartFire)
	{}
};

The FDeferredFireInput struct was created so that fire inputs can be applied in a slightly different order than they would normally occur. If you trace down where the DeferredFireInputs are used, you'll see that they are typically processed in the movement component of the UTCharacter, UTCharacterMovement::TickComponent(). This entire process is a bit circuitous, but the long and short of it is that DeferredFireInputs are ultimately resolved in **UTPlayerController::ApplyDeferredFireInputs()**.

void AUTPlayerController::ApplyDeferredFireInputs()
{
	for (FDeferredFireInput& Input : DeferredFireInputs)
	{
		if (Input.bStartFire)
		{
			if (UTCharacter !\= NULL)
			{
				if (StateName \== NAME\_Playing)
				{
					UTCharacter\-\>StartFire(Input.FireMode);
				}
			}
			else if (GetPawn() !\= nullptr)
			{
				GetPawn()\-\>PawnStartFire(Input.FireMode);
			}
		}
		else if (UTCharacter !\= NULL)
		{
			UTCharacter\-\>StopFire(Input.FireMode);
		}
	}
	DeferredFireInputs.Empty();
}

Now we're getting somewhere. In **UTPlayerController::ApplyDeferredFireInputs()** the standard processing of our player input will have us calling a function on our UTCharacter called StartFire, passing along a numerical value for the firemode we're calling. **UTCharacter::StartFire()** looks like so:

void AUTCharacter::StartFire(uint8 FireModeNum)
{
	UE\_LOG(LogUTCharacter, Verbose, TEXT("StartFire %d"), FireModeNum);
 
	if (!IsLocallyControlled())
	{
		UE\_LOG(LogUTCharacter, Warning, TEXT("StartFire() can only be called on the owning client"));
	}
	// when feigning death, attempting to fire gets us out of it
	else if (bFeigningDeath)
	{
		FeignDeath();
	}
	else if (Weapon !\= NULL && EmoteCount \== 0)
	{
		Weapon\-\>StartFire(FireModeNum);
	}
}

The important bits here is how UTCharacter passes input to the Weapon class, getting us to our destination at last, calling **UTWeapon::StartFire()**.

Here is a small diagram outlining the input flow through these initial classes.

[![InputDiagramTrim1.jpg](https://d26ilriwvtzlb.cloudfront.net/a/ad/InputDiagramTrim1.jpg)](/File:InputDiagramTrim1.jpg)

  

### Weapon States

You might be thinking, "That's great, you've shown how a single button press translates into a single function call in my weapon, but what happens next?" This section will walk through the steps of what happens once our player input reaches our weapon.

Starting off, our first point of entry into the Weapon class is the **UTWeapon::StartFire()** function:

void AUTWeapon::StartFire(uint8 FireModeNum)
{
	if (!UTOwner\-\>IsFiringDisabled())
	{
		bool bClientFired \= BeginFiringSequence(FireModeNum, false);
		if (Role < ROLE\_Authority)
		{
			ServerStartFire(FireModeNum, bClientFired); 
		}
	}
}

As you can see, in games where the client is not the authority (e.g. all online games), this redirects to **UTWeapon::ServerStartFire()**. Lets take a brief look there as well:

void AUTWeapon::ServerStartFire\_Implementation(uint8 FireModeNum, bool bClientFired)
{
	if (!UTOwner\-\>IsFiringDisabled())
	{
		BeginFiringSequence(FireModeNum, bClientFired);
	}
}

Both the clientside and serverside functions here call **UTWeapon::BeginFiringSequence()**, so it's important to see how input is passed along through this function to produce the firing behavior.

bool AUTWeapon::BeginFiringSequence(uint8 FireModeNum, bool bClientFired)
{
	if (UTOwner)
	{
		UTOwner\-\>SetPendingFire(FireModeNum, true);
		if (FiringState.IsValidIndex(FireModeNum) && CurrentState !\= EquippingState && CurrentState !\= UnequippingState)
		{
			FiringState\[FireModeNum\]\-\>PendingFireStarted();
		}
		bool bResult \= CurrentState\-\>BeginFiringSequence(FireModeNum, bClientFired);
		if (CurrentState\-\>IsFiring() && CurrentFireMode !\= FireModeNum)
		{
			OnMultiPress(FireModeNum);
		}
		return bResult;
	}
	return false;
}

The next step to pay attention to is in AUTWeapon::BeginFiringSequence involves looking at this next set of lines to execute,

if (FiringState.IsValidIndex(FireModeNum) && CurrentState !\= EquippingState && CurrentState !\= UnequippingState)
		{
			FiringState\[FireModeNum\]\-\>PendingFireStarted();
		}

If you look only at the name of this variable you might think to yourself that the FiringState is a state that controls certain firing behaviors of the weapon. If you've looked through the class structure you've likely seen such things as UTWeaponStateFiringBeam, UTWeaponStateFiringBurst, UTWeaponStateFiringSpinUp. It might seem confusing that somehow your weapon already has a so-called FiringState even though we haven't even fired a shot yet!

The important thing to recognize here is that FiringState is an object of type UUTWeaponState. UUTWeaponState is an object defined to exist within each UTWeapon, but each UTWeaponState corresponds to more than just a particular firing behavior in a weapon. Imagine that you are playing a game and you have in your inventory the Impact Hammer, the Enforcer, the Shock Rifle, and the Rocket Launcher. If we were to call UTWeapon::BeginFiringSequence() on all of these weapons, they would all have a 'firing state.' However, in Unreal Tournament where the player can only have one active weapon at a time, three of those weapons would be in WeaponState UTWeaponStateInactive. The one "currently-held" weapon would be in UTWeaponStateActive. There are also transitional states used for equipping and unequipping weapons, as we can see from UTWeapon::BeginFiringSequence().

Moving on, our code above indicates we should call the PendingFireStarted function of our Weapon State class. As I stated above, a held weapon is in the UTWeaponStateActive class, so looking at the function definition **UTWeaponStateActive::PendingFireStarted()** we see:

bool UUTWeaponStateActive::BeginFiringSequence(uint8 FireModeNum, bool bClientFired)
{
	if (GetOuterAUTWeapon()\-\>FiringState.IsValidIndex(FireModeNum) && GetOuterAUTWeapon()\-\>HasAmmo(FireModeNum))
	{
		GetOuterAUTWeapon()\-\>CurrentFireMode \= FireModeNum;
		GetOuterAUTWeapon()\-\>GotoState(GetOuterAUTWeapon()\-\>FiringState\[FireModeNum\]);
		return true;
	}
	return false;
}

Fortunately this is straightforward, knowing that our weapon initially is in state UTWeaponStateActive, we'll want to use the **UTWeapon::GotoState()** function to go to the state specified by our CurrentFireMode/FireModeNum. These actually will vary per weapon, but in all current examples these Firing States are subclasses of UTWeaponStateFiring.

Looking first at **UTWeapon::GotoState()**:

void AUTWeapon::GotoState(UUTWeaponState\* NewState)
{
	if (NewState \== NULL || !NewState\-\>IsIn(this))
	{
		UE\_LOG(UT, Warning, TEXT("Attempt to send %s to invalid state %s"), \*GetName(), \*GetFullNameSafe(NewState));
	}
	else if (ensureMsgf(UTOwner !\= NULL || NewState \== InactiveState, TEXT("Attempt to send %s to state %s while not owned"), \*GetName(), \*GetNameSafe(NewState)))
	{
		if (CurrentState !\= NewState)
		{
			UUTWeaponState\* PrevState \= CurrentState;
			if (CurrentState !\= NULL)
			{
				CurrentState\-\>EndState(); // NOTE: may trigger another GotoState() call
			}
			if (CurrentState \== PrevState)
			{
				CurrentState \= NewState;
				CurrentState\-\>BeginState(PrevState); // NOTE: may trigger another GotoState() call
				StateChanged();
			}
		}
	}
}

Again, for the time being we're assuming we will be going to a Weapon State that extends UTWeaponStateFiring. This is the standard base class for firing behavior. **UTWeaponStateFiring::BeginState()** shows us:

void UUTWeaponStateFiring::BeginState(const UUTWeaponState\* PrevState)
{
	GetOuterAUTWeapon()\-\>GetWorldTimerManager().SetTimer(this, &UUTWeaponStateFiring::RefireCheckTimer, GetOuterAUTWeapon()\-\>GetRefireTime(GetOuterAUTWeapon()\-\>GetCurrentFireMode()), true);
	ToggleLoopingEffects(true);
	PendingFireSequence \= \-1;
	bDelayShot \= false;
	GetOuterAUTWeapon()\-\>OnStartedFiring();
	FireShot();
	GetOuterAUTWeapon()\-\>bNetDelayedShot \= false;
}

Here we can see that the function **UTWeaponStateFiring::FireShot()** is called.

void UUTWeaponStateFiring::FireShot()
{
	//float CurrentMoveTime = (GetUTOwner() && GetUTOwner()->UTCharacterMovement) ? GetUTOwner()->UTCharacterMovement->GetCurrentSynchTime() : GetWorld()->GetTimeSeconds();
	//UE\_LOG(UT, Warning, TEXT("Fire SHOT at %f (world time %f)"), CurrentMoveTime, GetWorld()->GetTimeSeconds());
	GetOuterAUTWeapon()\-\>FireShot();
}

In UTWeaponStateFiring the most basic case of firing behavior is implemented. One button press immediately fires the gun, and on release the gun firing behavior ceases. UTWeaponStateFiring::FireShot() thus calls **UTWeapon::FireShot()**:

void AUTWeapon::FireShot()
{
	UTOwner\-\>DeactivateSpawnProtection();
	ConsumeAmmo(CurrentFireMode);
 
	if (!FireShotOverride() && GetUTOwner() !\= NULL) // script event may kill user
	{
		PlayFiringEffects();
		if (ProjClass.IsValidIndex(CurrentFireMode) && ProjClass\[CurrentFireMode\] !\= NULL)
		{
			FireProjectile();
		}
		else if (InstantHitInfo.IsValidIndex(CurrentFireMode) && InstantHitInfo\[CurrentFireMode\].DamageType !\= NULL)
		{
			FireInstantHit();
		}
	}
	if (GetUTOwner() !\= NULL)
	{
		static FName NAME\_FiredWeapon(TEXT("FiredWeapon"));
		GetUTOwner()\-\>InventoryEvent(NAME\_FiredWeapon);
	}
}

From this point on our weapon code will branch to either **UTWeapon::FireProjectile()** or **UTWeapon::FireInstantHit()**. Other tutorials provide ample examples of utilizing these functions for custom firing behavior, so I leave it to the reader to decide how to implement those functions as necessary to achieve desired behavior. For examples of how the Weapon State is used I recommend looking at the **UTWeaponStateFiringBurst** code to see how overriding the Weapon State can allow the user to create functionality where one button press does not necessarily correspond to one shot, but rather to an arbitrary number of shots. Overriding this functionality can allow the user to implement all kinds of exotic and never-before-seen types of functionality!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Create\_A\_Custom\_Weapon\_-\_How\_Firing\_Works&oldid=12071](https://wiki.unrealengine.com/index.php?title=Create_A_Custom_Weapon_-_How_Firing_Works&oldid=12071)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)