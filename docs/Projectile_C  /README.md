Projectile C++ - Epic Wiki              

Projectile C++
==============

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

**Rate this Article:**

3.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:(please verify)

I've been looking for some very simple, bare bones tutorials on creating simple and modular objects for Unreal, and despite Rama's excellent work so far, some of them are still a bit over my head.

With that in mind, I figured I'd walk you through the step-by-step process of creating a projectile. I'll use the C++ Flying Template as my starting point, and grab the projectile from the C++ First Person Shooter template. Therefore, to have a better understanding of how this works, I suggest that you have both templates created.

Contents
--------

*   [1 Grabbing the projectile .h and .cpp](#Grabbing_the_projectile_.h_and_.cpp)
*   [2 Modifying the FlyingPawn .h and .cpp](#Modifying_the_FlyingPawn_.h_and_.cpp)
*   [3 Creating the projectile Blueprint](#Creating_the_projectile_Blueprint)
*   [4 Adding the projectile blueprint to the Ship Blueprint](#Adding_the_projectile_blueprint_to_the_Ship_Blueprint)

Grabbing the projectile .h and .cpp
-----------------------------------

I suggest just copying the FirstPersonProjectile.h & FirstPersonProjectile.cpp files from the First Person Shooter template and using those in the Flying project.

  
Place the .h file in your Flying / Classes folder and .cpp files in Flying/Private. The top of FirstPersonProjectile.cpp has an #include for the first person game. Instead, we want it to point towards our current game: Flying.h. Replace what is currently there, with:

  

#include "Flying.h"

Modifying the FlyingPawn .h and .cpp
------------------------------------

Inside your AFlyingPawn constructor, you need to add the MuzzleOffset for your projectile.

  

AFlyingPawn::AFlyingPawn(const class FPostConstructInitializeProperties& PCIP) 
	: Super(PCIP)
{
	…..
	// Default offset from the camera location for projectiles to spawn
	MuzzleOffset \= FVector(80.0f, 0.0f, \-30.0f);
 
	// Note: The ProjectileClass and the skeletal mesh/anim blueprints for FlyingPawn are set in the
	// derived blueprint asset named ShipBP (to avoid direct content references in C++)
	….
}

The numbers for the vector are irrelevant for the moment, but you can always go back and tweak them later from within the Blueprint.

  
We need to create an input action for firing our projectile now. Within **SetupPalyerInputComponent**, add the following:

  

void AFlyingPawn::SetupPlayerInputComponent(class UInputComponent\* InputComponent)
{
	….
	BIND\_ACTION(InputComponent, "Fire",		   IE\_Pressed,  &AFlyingPawn::OnFire);
	….
}

  
**"Fire"** is the name of the input action we are about to create. **IE\_Pressed** is the input enumeration for when we want the event to occur. This could be triggered either when we click on a key, or release the key. (IE\_Released)

  
**&AFlyingPawn::OnFire** is name of the method called on this object when the left-mouse button is clicked. We're passing it as a C++ method pointer, hence the pointer symbol "&" and the class name in which the method exists in, so that's why we have **AFlyingPawn::**. The macro actually expands to **InputComponent->BindAction("Fire", IE\_PRESSED, this, &AFlyingPawn::OnFire);** but can be considered as more descriptive. This and similar macros are defined in "InputComponent.h" in the engine source code.

  
Within the Rocket Editor, in the top left corner, left-click on **Edit -> Project Settings.** Under the Engine category, left-click on "Input". Left-click on Action Mappings, then the arrow next to the first item in the array (0). This will allow you to bind key mappings to a string (Action Name).

  
**Action Name:** Fire **Key:** LeftMouseButton

[File:Projectile1](/index.php?title=Special:Upload&wpDestFile=Projectile1 "File:Projectile1")

  
Leave Shift, Ctrl, and Alt unchecked, then click "Save As Defaults" in the top of the page. See why we called it "Fire" now?

  
Back in Visual Studio, we need to add the OnFire function. Place this code just beneath **SetUpPlayerInputComponent** in **FlyingPawn.cpp:**

  

void AFlyingPawn::OnFire()
{
	// try and fire a projectile
	if (ProjectileClass !\= NULL)
	{
		// Get the camera transforms
		FVector  CameraLoc;
		FRotator CameraRot;
		GetActorEyesViewPoint(CameraLoc, CameraRot);
 
		// MuzzleOffset is in camera space, so transform it to world space before offsetting from the camera to find the   final muzzle position
		FVector const MuzzleLocation \= CameraLoc + FTransform(CameraRot).TransformVector(MuzzleOffset);
		FRotator MuzzleRotation	  \= CameraRot;
		MuzzleRotation.Pitch		  +\= 10.0f;			// skew the aim upwards a bit
 
		UWorld\* const World \= GetWorld();
		if (World)
		{
			FActorSpawnParameters SpawnParams;
			SpawnParams.Owner	   \= this;
			SpawnParams.Instigator \= Instigator;
 
			// spawn the projectile at the muzzle
			AFirstpersonProjectile\* Projectile \= World\-\>SpawnActor<AFirstpersonProjectile\>(ProjectileClass, MuzzleLocation, MuzzleRotation, SpawnParams);
			if (Projectile)
			{
				// find launch direction
				FVector const LaunchDir \= MuzzleRotation.Vector();
				Projectile\-\>InitVelocity(LaunchDir);
 
			}
		}
	}
}

  
It's all pretty well documented, but if you would like more clarification, let me know and I can write more comments in there. Our work here is done, so now it's time to head to **FlyingPawn.h.** Add this Uproperty beneath the public section of your header:

  

/\*\* Gun muzzle's offset from the camera location \*/
UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Gameplay)
FVector MuzzleOffset;
 
/\*\* Projectile class to spawn \*/
UPROPERTY(EditDefaultsOnly, Category\=Projectile)
 
TSubclassOf<class AFirstpersonProjectile\> ProjectileClass;

  
Just beneath that, we also want to add the OnFire function we created in the .cpp file:

  

/\* Called when the Fire Key is pressed \*/
UFUNCTION()
void OnFire();

  
The hard part is over -- now we can just focus on what we're doing in the Rocket editor. Save and build your project. I also recently found out that you can debug the project directly from Visual Studio, which should make things far easier for you if you're trying to figure out why the projectile is not working. From the Debug pulldown in Visual studio, select **"Debug Editor"** and press F5 to launch a new instance of the Rocket Editor. Any breakpoints you set in Visual Studio now will work when playing your game within Rocket.

Creating the projectile Blueprint
---------------------------------

In the Content Browser, right-click and select the option for "Basic Assets -> Blueprint" A pop-up will appear, asking you to pick a parent class. It will allow you to type in the name of the custom object you're looking for as well. Type in "Projectile" and your FirstPersonProjectile should appear. Double click and a new blueprint should appear in the content browser.

  
Double click on that Blueprint to see the editor. In the top right corner, select **"Components"**, in the area where it says **Defaults > Components > Graph.** We want to add a new Static Mesh component, so that we can actually see our projectile within the game. The First Person Template has an identical blueprint, so if you are lost at any point, take a look at the one there.

  
Around the top left corner, click on **"Add Component"** and a dropdown will appear. Left-click on "Static Mesh". A details panel will appear. Beneath the section for **Static Mesh,** click on the area next to the empty image. It should read: "None". From here, type in **"Sphere"**, then scroll down. Towards the bottom you will see "Sphere" with the words "Static Mesh" beneath it. That's what we want.

  
In the top-right corner, click on the "**Defaults"** button. A "Blueprints Defaults" panel should appear. Within the **Collision section**, we want Collision Presets to be set to: Projectile. In the top left corner, left-click on **Compile**, then Save. Back in the Content Browser within the main Rocket Editor, right click on our Blueprint, then rename it to Projectile.

  

Adding the projectile blueprint to the Ship Blueprint
-----------------------------------------------------

Double click on the **ShipBp** to open it up. Beneath the section marked "Projectile" you ill see a **Projectile** Class property. Set it to "Projectile", and NOT FirstPersonProjectile.

Remember that muzzle offset we created within the FlyingPawn.cpp file before? Well it appears here now, because we exposed it as a public UPROPERTY. This is where the projectile will be fired from. If you left it as-is, then the projectiles should fire from the front of the ship.

  
In the top-left corner, click on **compile and save.** The last step is to compile the who project from within the Rocket Editor. On the top of the screen, left-click on compile. Wait a few moments and let the project build. You can see in the bottom right corner of the screen that it's compiling your project, as that pop-up should appear.

  
I've noticed that sometimes Rocket can be finicky about compiling, so if it doesn't work right away, trying closing the Editor, then opening it again and compiling. You may also have to have Visual Studio closed when this is compiling within the Editor, too.

  
The final step is to click "Play in…" and launch the game. If all went according to plan, then you should be able to left-click on the mouse and see projectiles fire! For an addded effect, trying attaching a particle system component to the projectile, in the same manner that we added the sphere static mesh.

  
If you have any questions, or can think of ways that I can improve this tutorial, then please leave comments here. If I find that these types of tutorials are helpful for people, then I'll write more. Thanks again Rama and Stephen Ellis for all of your time and patience when assisting me to get started with the projectile.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Projectile\_C%2B%2B&oldid=8297](https://wiki.unrealengine.com/index.php?title=Projectile_C%2B%2B&oldid=8297)"

[Categories](/Special:Categories "Special:Categories"):

*   [Pages with broken file links](/Category:Pages_with_broken_file_links "Category:Pages with broken file links")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")