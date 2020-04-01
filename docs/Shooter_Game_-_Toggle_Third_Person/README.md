Shooter Game - Toggle Third Person - Epic Wiki                     

Shooter Game - Toggle Third Person
==================================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (7 votes)

Approved for Versions:4.4, 4.5, 4.6, 4.7, 4.8, 4.9

Original author: [GregBlast](https://forums.unrealengine.com/member.php?3827-GregBlast)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Purpose](#Purpose)
*   [3 Required](#Required)
*   [4 Tutorial](#Tutorial)
    *   [4.1 Play-testing the game](#Play-testing_the_game)
    *   [4.2 Inside the code](#Inside_the_code)
        *   [4.2.1 Digging the grave (into the death code)](#Digging_the_grave_.28into_the_death_code.29)
        *   [4.2.2 Camera view state](#Camera_view_state)
        *   [4.2.3 Adding third person support](#Adding_third_person_support)
            *   [4.2.3.1 Preparing the header file](#Preparing_the_header_file)
            *   [4.2.3.2 Adding the code](#Adding_the_code)
        *   [4.2.4 Adding inputs](#Adding_inputs)
    *   [4.3 Taking a step back](#Taking_a_step_back)
    *   [4.4 The weapon](#The_weapon)
        *   [4.4.1 Adding support for third person view in weapon code](#Adding_support_for_third_person_view_in_weapon_code)
    *   [4.5 Fixing the camera view in third person](#Fixing_the_camera_view_in_third_person)
        *   [4.5.1 Adding the third person camera](#Adding_the_third_person_camera)
        *   [4.5.2 Fixing the zoom in/out (FOV change) on right-click](#Fixing_the_zoom_in.2Fout_.28FOV_change.29_on_right-click)
    *   [4.6 Fixing muzzle flash](#Fixing_muzzle_flash)
*   [5 Recap](#Recap)
*   [6 Potential Issues](#Potential_Issues)

Overview
========

Hello everyone !

  
In this tutorial I will show you how you can modify the **Shooter Game** sample from the **Marketplace** to allow toggling between first and third person views. The approach I will be using will be focused on sticking as much as possible to the original behaviour. By this I mean that I am not going to erase the use of a first person mesh when in first person view, but rather still keep its advantage and add a way to use the third person model and features only when needed.

In the tutorial I describe how I understood the code to tell you what it does and based on what. That's why it's not a quick short tutorial. If I have misunderstood something please do not hesitate to let me know.

[![](https://d3ar1piqh1oeli.cloudfront.net/d/d5/ShooterGameThirdPersonView.png/940px-ShooterGameThirdPersonView.png)](/File:ShooterGameThirdPersonView.png)

[![](/skins/common/images/magnify-clip.png)](/File:ShooterGameThirdPersonView.png "Enlarge")

**Third Person View** in the **Shooter Game** sample from the **Marketplace**

Purpose
=======

The main purpose of this tutorial is of course to show you how to upgrade the original code to add third person view. However I will try to explain everything I did and how I found out it had to be done so that you can understand what you do instead of just copy-pasting the code.  
The code sections won't include the methods names if they have been exposed in the description above them, so that you have to read them to know what to do. However I've marked the most relevant information in bold whenever applicable.

Required
========

For this tutorial you will need to download the **Shooter Game** sample from the **Marketplace** and create a project with it.

Tutorial
========

Play-testing the game
---------------------

So to get started - and if you haven't already - you should first run the sample to see how everything behaves.

When alive you can see your character arms and weapon. If you look down you won't see any legs. That's because a special first person mesh has been given to the local player. As the local player is always in first person view you could think that the code has been written in that direction as well. And it has for some parts of it but fortunately not all. We'll get back on this later.

It's interesting to see what happens when you die. The camera stops moving and you can see a third person ragdoll fall to the floor. This means that at this point the game switches between first person and third person views.

That is what got me started.

Inside the code
---------------

### Digging the grave (into the death code)

From that point I searched for the handling of player death. Having a look at **ShooterCharacter.cpp** you will quickly find the **OnDeath** method which is called upon player death. Inside of that method you will notice the following commented piece of code (On line 341):

// switch back to 3rd person view
UpdatePawnMeshes();

Let's then have a look at **UpdatePawnMeshes**. In that method you can see that another method determines which mesh should be visible: **IsFirstPerson()**. Its value is used with a call to **SetOwnerNoSee** on each mesh to show the first person mesh when in first person and show the third person mesh when in third person.

### Camera view state

The **IsFirstPerson()** method defines the camera view state. If you have a look at its implementation you can see that it:

*   returns **false** if the player is dead
*   returns **false** for remote players
*   returns **true** for local players

This is good enough for the purpose of the game as it is but you can see that it doesn't really talk about first or third person. It just assumes that local players will always be in first person unless they are dead (hence the third person switch on death). So next we're going to start by adding support for third person.

### Adding third person support

Here's what we're going to do for this purpose:

*   add a flag that will tell whether the player is using third person or not
*   add support for this flag to be replicated so that the server will know if a player is using third person
*   add default input support for this flag
*   update IsFirstPerson to rely on this flag

#### Preparing the header file

Find the section of **ShooterCharacter.h** where the other flags are defined (e.g. below **bWantsToFire**) and add a new boolean flag for third person toggle:

/\*\* flag used to toggle third person camera view \*/
UPROPERTY(Transient, Replicated)
uint8 bIsThirdPerson;

Next find the definition of **SetRunning** because we will be using a similar approach here. Below it add a definition for **SetThirdPerson**. This function will be responsible for actually toggling the camera view mode.

/\*\* <GB> \[server + local\] change third person state (server has to know that player is using third person) \*/
void SetThirdPerson(bool bNewThirdPerson);

We'll need one last definition in the header file. At the very bottom of the code you'll see **ServerSetRunning**. Again we'll add a relatively similar method below it:

/\*\* update first person state\*/
UFUNCTION(reliable, server, WithValidation)
void ServerSetThirdPerson(bool bNewThirdPerson);

#### Adding the code

Let's head to the code and add the implementation for our methods. Under **UpdateRunSounds** which is a good place for our purpose add the base code for the **SetThirdPerson** method (which will be similar to **SetRunning**):

void AShooterCharacter::SetThirdPerson(bool bNewThirdPerson)
{
	bIsThirdPerson \= bNewThirdPerson;
 
	if (Role < ROLE\_Authority)
	{
		ServerSetThirdPerson(bNewThirdPerson);
	}
}

Then similarily add the server validation and implementation:

bool AShooterCharacter::ServerSetThirdPerson\_Validate(bool bNewThirdPerson)
{
	return true;
}
 
void AShooterCharacter::ServerSetThirdPerson\_Implementation(bool bNewThirdPerson)
{
	SetThirdPerson(bNewThirdPerson);
}

Alright this will take care of updating our flag. However we saw earlier that **UpdatePawnMeshes** is the method that toggles the visibility of the mesh to use. We should then call it from **SetThirdPerson** to make sure that our first person mesh gets hidden and our third person mesh becomes visible when using third person (and vice versa). Simply add a call to **UpdatePawnMeshes();** at the bottom of **SetThirdPerson**:

void AShooterCharacter::SetThirdPerson(bool bNewThirdPerson)
{
	bIsThirdPerson \= bNewThirdPerson;
	UpdatePawnMeshes();
 
	if (Role < ROLE\_Authority)
	{
		ServerSetThirdPerson(bNewThirdPerson);
	}
}

Good. But still **UpdatePawnMeshes** relies on **IsFirstPerson()** to determine which mesh to show or hide. We thus still need to update it so it uses our flag to determine the camera view mode. Head to **IsFirstPerson()** and in addition to testing whether the player is alive and local, also check if the third person flag is not set:

return IsAlive() && Controller && Controller\-\>IsLocalPlayerController() && !bIsThirdPerson;

Oh and last but not least lets not forget to initialize our flag in the constructor. Below **bWantsToFire = false;** do the same with our flag:

bIsThirdPerson \= false;

  

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) You should probably declare a replication lifetime condition inside **GetLifetimeReplicatedProps** for the third person flag. I am unsure of how that works currently so I simply used the same as for **bWantsToRun**:

DOREPLIFETIME\_CONDITION(AShooterCharacter, bIsThirdPerson, COND\_SkipOwner);

### Adding inputs

This section will be pretty straightforward as it is assumed that you know how to add inputs to trigger some action. In **ShooterCharacter.h** below **OnStopRunning** add the following input declarations:

/\*\* player pressed 3rd person action \*/
void OnThirdPerson();
 
/\*\* player toggled 3rd person action \*/
void OnThirdPersonToggle();
 
/\*\* player released 3rd person action \*/
void OnFirstPerson();

In the code file **ShooterCharacter.cpp** add the third person inputs implementations below **IsRunning**:

void AShooterCharacter::OnThirdPerson()
{
	AShooterPlayerController\* MyPC \= Cast<AShooterPlayerController\>(Controller);
	if (MyPC && MyPC\-\>IsGameInputAllowed())
	{
		SetThirdPerson(true);
	}
}
 
void AShooterCharacter::OnThirdPersonToggle()
{
	AShooterPlayerController\* MyPC \= Cast<AShooterPlayerController\>(Controller);
	if (MyPC && MyPC\-\>IsGameInputAllowed())
	{
		SetThirdPerson(!bIsThirdPerson);
	}
}
 
void AShooterCharacter::OnFirstPerson()
{
	SetThirdPerson(false);
}

Now let's bind those actions in **SetupPlayerInputComponent**:

InputComponent\-\>BindAction("ThirdPerson", IE\_Pressed, this, &AShooterCharacter::OnThirdPerson);
InputComponent\-\>BindAction("ThirdPersonToggle", IE\_Pressed, this, &AShooterCharacter::OnThirdPersonToggle);
InputComponent\-\>BindAction("ThirdPerson", IE\_Released, this, &AShooterCharacter::OnFirstPerson);

Finally lets edit **Config/DefaultInput.ini** to bind some default keys to those actions:

+ActionMappings\=(ActionName="ThirdPersonToggle",Key\=G,bShift=False,bCtrl=False,bAlt=False,bCmd=False)
+ActionMappings\=(ActionName="ThirdPerson",Key\=F,bShift=False,bCtrl=False,bAlt=False,bCmd=False)

You'll thus be able to toggle third person with **G** or press and release **F** to switch to/from third person.

Taking a step back
------------------

Alright now we have a functional logic to toggle third person. So let's see what we get when running this code. Well you will actually notice a few problems:

*   in third person, the camera is inside of the player
*   in third person, the weapon doesn't snap to the character's hands
*   in third person, the right-click doesn't change bring iron sights or change the FOV

We'll start by taking care of the weapon.

The weapon
----------

If you look at the code in **ShooterWeapon.cpp** you'll see that it also defines two meshes (one for 1st person and one for 3rd person) and that pretty much everywhere both of those are used in a rather generic manner so that you won't have to change much. For example:

*   **GetWeaponMesh** already checks for **IsFirstPerson()** on the owning Pawn
*   **AttachMeshToPawn** has a comment that says: _For locally controller players we attach both weapons and let the bOnlyOwnerSee, bOwnerNoSee flags deal with visibility._

However it doesn't snap to the player when in third person. The reason for that is simple: it's still the first person weapon mesh that is displayed in third person. And that last comment I quoted should set you on the correct path to handling this issue. You just need to swap model visibilities when switching between camera view modes just like it is done for the player model.

### Adding support for third person view in weapon code

Let's define a new method in the **ShooterWeapon** header file that will be responsible for switching mesh visibility (below **IsAttachedToPawn** is fine):

/\*\* update the meshes visibility \*/
void UpdateMeshes();

The implementation in **ShooterWeapon.cpp** will simply check the pawn **IsFirstPerson()** and assign visibility based on that. We don't need to check if the pawn is a player and not a bot because **IsFirstPerson()** already checks if the pawn is locally controlled and returns false if not (i.e. third person for bots).

void AShooterWeapon::UpdateMeshes()
{
	if (MyPawn)
	{
		const bool bFirstPerson \= MyPawn\-\>IsFirstPerson();
		Mesh1P\-\>SetOwnerNoSee(!bFirstPerson);
		Mesh3P\-\>SetOwnerNoSee(bFirstPerson);
	}
}

Now we need to call that method when we switch between camera view modes. So let's go back to **ShooterCharacter.cpp** and update **UpdatePawnMeshes**. We'll simply update the meshes visibility for the current weapon, if any:

if (CurrentWeapon)
{
	CurrentWeapon\-\>UpdateMeshes();
}

Now if you run this you will notice a little problem when switching weapon. The second weapon will not use that code we just wrote. Well that's because when it is created and added to the inventory it will use the first person mesh and since we only change the visibilities when we toggle the camera view mode it won't affect that other weapon at the time we equip it.

To fix that we can simply have a look at **AShooterWeapon.OnEquip**. At the bottom of the code you'll see that there is a check for locally controlled pawns. That is perfect for us to call our method. So add a call to **UpdateMeshes();** directly below the call to **PlayerWeaponSound**.

Fixing the camera view in third person
--------------------------------------

Now you could be tempted to think that this section will be the easiest. Well if you know how the engine works with the cameras you will probably have guessed that we're going to use a **UCameraComponent** to customize the third person view.

For those of you who (like me before making this) do not know how the engine handles the local player view location and rotation here's what you need to know for this tutorial:

*   the **PlayerCameraManager** should be fed with a view target
*   if the view target is a **CameraActor** or an **Actor** that contains a **CameraComponent**, it will use its information only if **bFindCameraComponentWhenViewTarget** is set to **true**
*   if the flag is set to **false** or the **Actor** doesn't have a **CameraComponent** the camera manager will use the Actor's location and rotation

That said we know what we have to do:

*   add a **CameraComponent** to **ShooterCharacter**
*   make sure **bFindCameraComponentWhenViewTarget** is disabled when using the first person mesh (so that the camera manager keeps using the first person mesh's location and rotation and not our third person camera)

### Adding the third person camera

In the **ShooterCharacter** header file under **Mesh1P** add the following elements (camera + spring arm):

/\*\* third person camera \*/
UPROPERTY(VisibleDefaultsOnly, Category\=Camera)
UCameraComponent\* ThirdPersonCamera;
 
/\*\* an arm for the third person camera\*/
UPROPERTY(VisibleDefaultsOnly, Category\=Camera)
USpringArmComponent\* ThirdPersonCameraArm;

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) In engine version **4.5** or older, use **TSubobjectPtr<>** instead of regular pointers.

/\*\* third person camera \*/
UPROPERTY(VisibleDefaultsOnly, Category\=Camera)
TSubobjectPtr<UCameraComponent\> ThirdPersonCamera;

Initialize them in the constructor in the code file:

ThirdPersonCameraArm \= ObjectInitializer.CreateDefaultSubobject<USpringArmComponent\>(this, TEXT("ThirdPersonCameraArm"));
ThirdPersonCameraArm\-\>TargetOffset \= FVector(0.f, 0.f, 0.f);
ThirdPersonCameraArm\-\>SetRelativeLocation(FVector(\-40.f, 0.f, 160.f));
ThirdPersonCameraArm\-\>SetRelativeRotation(FRotator(\-10.f, 0.f, 0.f));
ThirdPersonCameraArm\-\>AttachTo(GetMesh()); // attach it to the third person mesh
ThirdPersonCameraArm\-\>TargetArmLength \= 200.f;
ThirdPersonCameraArm\-\>bEnableCameraLag \= false;
ThirdPersonCameraArm\-\>bEnableCameraRotationLag \= false;
ThirdPersonCameraArm\-\>bUsePawnControlRotation\= true; // let the controller handle the view rotation
ThirdPersonCameraArm\-\>bInheritYaw \= true;
ThirdPersonCameraArm\-\>bInheritPitch \= true;
ThirdPersonCameraArm\-\>bInheritRoll \= false;
 
ThirdPersonCamera \= ObjectInitializer.CreateDefaultSubobject<UCameraComponent\>(this, TEXT("ThirdPersonCamera"));
ThirdPersonCamera\-\>AttachTo(ThirdPersonCameraArm, USpringArmComponent::SocketName);
ThirdPersonCamera\-\>bUsePawnControlRotation\= false; // the arm is already doing the rotation
ThirdPersonCamera\-\>FieldOfView \= 90.f;

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) If you're using engine version **4.5** and older, the **ObjectInitializer** variable is replaced by **PCIP**.

ThirdPersonCamera \= PCIP.CreateDefaultSubobject<UCameraComponent\>(this, TEXT("ThirdPersonCamera"));

And the one instance of **GetMesh()** should be replaced with **Mesh**.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) Also in engine version **4.4** or older, replace the two instances of **bUsePawnControlRotation** with **bUseControllerViewRotation**

Now we need to deactivate the auto-search for camera functionality within our pawn when in **first person**. This will prevent the camera manager from using our **third person camera** as the point of view there. Remember it will use the **first person mesh's** location and rotation in that case. We can do this directly in **UpdatePawnMeshes** before updating the weapon meshes:

bFindCameraComponentWhenViewTarget \= !bFirstPerson;

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) The player controller can also be used as the view target in some situations. You should set it to never search for a camera to make sure it never uses it (even if I'm not sure the camera manager would find the pawn camera for it).

if (Controller)
{
	Controller\-\>bFindCameraComponentWhenViewTarget \= false;
}

At this point if you test the game everything should be working as expected. Everything except a little detail we forgot: remember what the right-click does in first person ? Well it would be great to have at least a part of it functioning in third person too right ? I mean it should at least zoom in/out (change the FOV). Well let's fix that then.

### Fixing the zoom in/out (FOV change) on right-click

The **ShooterCharacter** code file contains a method called **OnCameraUpdate**. This method is actually called by the custom camera manager called **ShooterPlayerCameraManager** when it updates the camera (**UpdateCamera**). The first thing to note about this method is that it gets called only in first person. That's how it is defined to work in **ShooterPlayerCameraManager.UpdateCamera**. Since **OnCameraUpdate** is meant to update the camera view for the pawn we should use it if we need specific actions to be done with the view in third person. So let's modify **ShooterPlayerCameraManager.UpdateCamera** to do what we need in third person.

The first part of the code calculates a new FOV (field of view). It does it only if the pawn returns **true** with **IsFirstPerson()**. If you still remember **IsFirstPerson** checks if the player is alive, local and now if he's not in third person (using our flag). Well let's just get rid of the check on our flag so it runs in third person too by checking alive and local manually. Replace:

if (MyPawn && MyPawn\-\>IsFirstPerson())

With:

if (MyPawn && MyPawn\-\>IsAlive() && MyPawn\-\>IsLocallyControlled())

Do the same to call **OnCameraUpdate** on the pawn below the call to the base class.

Finally we need to handle the camera update differently for the third person. There we'll only change the FOV of our third person camera while in first person there is a bunch of code that calculates a new relative location and rotation for the fist person mesh, which we don't want.

In the **ShooterCharacter** header file add two new method declarations that take the same parameters as **OnCameraUpdate**. This is because they will be called by **OnCameraUpdate** using a branch on the camera view mode. Add those below **TornOff();**:

/\*\* camera update in first person \*/
void UpdateCameraFirstPerson(const FVector& CameraLocation, const FRotator& CameraRotation);
 
/\*\* camera update in third person \*/
void UpdateCameraThirdPerson(const FVector& CameraLocation, const FRotator& CameraRotation);

Now take all the code from **OnCameraUpdate** and use it as the implementation of **UpdateCameraFirstPerson**. Just a simple cut-paste from one method to the other ;). Then modify **OnCameraUpdate** so that it updates the first person view in first person and the third person view in third person:

if (IsFirstPerson())
{
	UpdateCameraFirstPerson(CameraLocation, CameraRotation);
}
else
{
	UpdateCameraThirdPerson(CameraLocation, CameraRotation);
}

The implementation of **UpdateCameraThirdPerson** is not very complicated. Remember what the **ShooterPlayerCameraManager** did with the FOV ? It redefined it's own **DefaultFOV** value. So that's the one we'll be using for our third person camera. Simply assign the camera's FOV with the **DefaultFOV** from the camera manager like this:

void AShooterCharacter::UpdateCameraThirdPerson(const FVector& CameraLocation, const FRotator& CameraRotation)
{
	if (Controller && ThirdPersonCamera)
	{
		ThirdPersonCamera\-\>FieldOfView \= Cast<AShooterPlayerController\>(Controller)\-\>PlayerCameraManager\-\>DefaultFOV;
	}
}

Done! It should now be fully operational. Wait... I noticed one more strange thingy when playing. Yeah, the muzzle flash is not spawned at the correct location in third person. Well that's right. Again that part is based on mesh visibility but doesn't take the first person state into account directly.

Fixing muzzle flash
-------------------

**ShooterWeapon.SimulateWeaponFire** is the one method in charge for that. A comment has been added to let us know that 2 effects are created because of a potential split screen game. In thate case both players are locally controlled so the shooter will see one effect and the other player will see the other one. Well lets define our possible cases:

*   shooting in first person => show first person effect to shooter, show third person effect to other player
*   shooting in third person => show third person effect to both players

So we'll first gather the result of **IsFirstPerson()**. Then we'll spawn the first person effect only in first person as nobody will need to see it in third person. It will be the shooting player's effect in first person. In third person it will become the other player's effect. The second effect will be the shooting player's effect when in third person and the other player's effect when in first person. Modify the code to look like this:

if( PlayerCon !\= NULL )
{
	const bool isFirstPerson \= MyPawn\-\>IsFirstPerson();
 
	// <GB> In first person, this will be the Shooting player's effect
	if (isFirstPerson)
	{
		Mesh1P\-\>GetSocketLocation(MuzzleAttachPoint);
		MuzzlePSC \= UGameplayStatics::SpawnEmitterAttached(MuzzleFX, Mesh1P, MuzzleAttachPoint);
		MuzzlePSC\-\>bOwnerNoSee \= false;
		MuzzlePSC\-\>bOnlyOwnerSee \= true;
	}
 
	// <GB> In third person, this will be the Other player's effect
	else
	{
		Mesh3P\-\>GetSocketLocation(MuzzleAttachPoint);
		MuzzlePSC \= UGameplayStatics::SpawnEmitterAttached(MuzzleFX, Mesh3P, MuzzleAttachPoint);
		MuzzlePSC\-\>bOwnerNoSee \= true;
		MuzzlePSC\-\>bOnlyOwnerSee \= false;
	}
 
	// <GB> In first person, this will be the Other player's effect
	// <GB> In third person, this will be the Shooting player's effect
	Mesh3P\-\>GetSocketLocation(MuzzleAttachPoint);
	MuzzlePSCSecondary \= UGameplayStatics::SpawnEmitterAttached(MuzzleFX, Mesh3P, MuzzleAttachPoint);
	MuzzlePSCSecondary\-\>bOwnerNoSee \= isFirstPerson;
	MuzzlePSCSecondary\-\>bOnlyOwnerSee \= !isFirstPerson;
}

That should do it. Now you'll see your muzzle flash coming out of your gun correctly in third person view.

Recap
=====

That's it for this tutorial. Of course do not hesitate to let me know if I made any mistakes or if some improvements could be added. I'll gladly reply to you and upgrade this.

Thanks for reading :).

[GregBlast](https://forums.unrealengine.com/member.php?3827-GregBlast)

Potential Issues
================

As mentioned in the tutorial I am unsure about the replication part of the code. But as it doesn't really fall into the scope of this tutorial I'm not going to dig any further into it. Please feel free to let me know if what I did was incorrect.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Shooter\_Game\_-\_Toggle\_Third\_Person&oldid=15709](https://wiki.unrealengine.com/index.php?title=Shooter_Game_-_Toggle_Third_Person&oldid=15709)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)