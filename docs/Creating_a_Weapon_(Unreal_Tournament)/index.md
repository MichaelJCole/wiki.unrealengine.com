Creating a Weapon (Unreal Tournament) - Epic Wiki                    

Creating a Weapon (Unreal Tournament)
=====================================

  
This document discusses how to implement weapon functionality through programming. For information on how to create a weapon model, check out [this tutorial](/Weapon_Modeling_Tutorial_Shock_Rifle "Weapon Modeling Tutorial Shock Rifle").

To start with, here are the classes that you need to implement to create a custom weapon:

**UTWeapon**: The weapon object itself and the first person representation. Contains references to the other elements as well as the code for any functionality specific to the weapon’s operation.

**UTWeaponAttachment**: The third person representation of the weapon. Only contains visual effects.

**UTProjectile**: The base class for projectiles fired by weapons.

**UTDamageType**: Describes the details of damage that aren’t the actual damage amount and physics impulse (whether it hits armor, death effects, etc)

  
In UTWeapon, there are a number of arrays that describe what happens for each fire mode (2 fire modes are currently supported by the input handling – primary and alternate fire – but the weapon code supports more). A simple weapon that fires a single projectile or instant hit beam can be created with no code at all simply by filling out the various properties. All of the properties are commented and most should be self-explanatory, but feel free to ask in the forums if you have any questions.

  
The Components view in the editor can be used to set up the first person view for the weapon. The components attached there will be attached to the player camera when the weapon is equipped and removed when the weapon is put away.

  
For custom functionality (such as the rocket launcher loading), either C++ or Blueprint code will be needed. Here are the main functions that are intended for custom functionality:

  
FireShot() (C++) / FireShotOverride() (Blueprint) – called to fire. The default implementation is to fire a single projectile or single instant hit trace depending on the values of the weapons’ properties. For many weapons, this is the only function that you will need to override.

  
BeginFiringSequence() (C++ only) – called when the user presses the trigger for a fire mode. Either enter the appropriate firing state immediately or queue it up to do so as soon as possible

EndFiringSequence() (C++ only) – called when the user releases the trigger for a fire mode. Note that leaving a firing state always waits for the refire time to complete, so this is always delayed.

OnStartedFiring() – called when the weapon enters the firing state.

OnStoppedFiring() – called when the weapon exits the firing state.

OnContinuedFiring() – called when the weapon fires, finishes its refire delay, and the trigger for that fire mode is still down so the weapon will fire again.

OnMultiPress() – called when one fire mode is firing and the user presses the button for the other fire mode. For example, this would be used for the rocket launcher line/spiral/grenade toggle as in UT3.

PlayFiringEffects() / PlayImpactEffects() / StopFiringEffects() – called to play audio and first person effects.

  
For any functions where an explicit fire mode isn’t passed in, the firing mode can be determined by looking at the CurrentFireMode property. Something important to keep in mind is that the entire weapon execution logic executes on the server and the client that owns the weapon, but no one else. This means two important things:

1.  You need to check for (Role == ROLE\_Authority) before spawning gameplay objects such as projectiles. Generally that sort of thing should only happen on the server.
2.  Excepting any Actors spawned such as projectiles, nothing the UTWeapon does will be seen by other players. For third person visuals, use UTWeaponAttachment.

  
UTWeaponAttachment is a much simpler “effects proxy” for the weapon, which performs third person effects. It is given a notification that the player fired their weapon, what fire mode, and if it was instant hit, the target location. Use these to create the appropriate effects. Similarly to UTWeapon, the Components view in the editor can be used to set up the mesh, muzzle flash, etc which will be attached to the third person character mesh at the appropriate time. Note that UTWeaponAttachment should \*NOT\* play sounds. Do that in the UTWeapon using UTPlaySound() so that the sounds can be replicated to clients where the actual character – and therefore UTWeaponAttachment - is not accessible (not network relevant because there’s a wall in the way, for example)

  
For examples, the Shock Rifle is a great place to start, since it contains both an instant hit and projectile fire mode, but minimal special code (only the projectile has custom code to execute the shock combo). From there, the Flak Cannon is the next step, containing a custom primary fire to create the 9 projectiles, and finally the rocket launcher is the most complex weapon we currently have in game with the rocket loading mechanic.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_a\_Weapon\_(Unreal\_Tournament)&oldid=12943](https://wiki.unrealengine.com/index.php?title=Creating_a_Weapon_(Unreal_Tournament)&oldid=12943)"

[Categories](/Special:Categories "Special:Categories"):

*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")
*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")

  ![](https://tracking.unrealengine.com/track.png)