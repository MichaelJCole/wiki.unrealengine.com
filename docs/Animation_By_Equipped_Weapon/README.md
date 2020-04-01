Animation By Equipped Weapon - Epic Wiki                    

Animation By Equipped Weapon
============================

**Rate this Tutorial:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:Not tested

Contents
--------

*   [1 Purpose and Use](#Purpose_and_Use)
*   [2 Overall Design](#Overall_Design)
*   [3 States](#States)
*   [4 The Survivor (Player)](#The_Survivor_.28Player.29)
*   [5 The WeaponBP](#The_WeaponBP)
*   [6 Fallback Animations Selection](#Fallback_Animations_Selection)
*   [7 Upper Body State Machine](#Upper_Body_State_Machine)
    *   [7.1 DANGER - Bad Idea Here](#DANGER_-_Bad_Idea_Here)
*   [8 Animation Switching by EAnimAction](#Animation_Switching_by_EAnimAction)
*   [9 Networking Animation](#Networking_Animation)
*   [10 Lower Body Animation](#Lower_Body_Animation)
*   [11 Animation Events](#Animation_Events)
*   [12 Weapon Hit Sweep for Melee](#Weapon_Hit_Sweep_for_Melee)
*   [13 Tilt Up and Down on Attack](#Tilt_Up_and_Down_on_Attack)
*   [14 Weapon Sockets](#Weapon_Sockets)

Purpose and Use
---------------

This tutorial describes how to make a player that has a lower body animation, and an upper body animation. The upper body animation is determined by the equipped weapon and by the current action the player is making. We also want the head to track where the camera is looking. And of course it all has to be multiplayer and networked, track melee weapons realistically, and be easy to add now weapons in.

This is **not** a ready to go code base. It is just the ideas and incomplete samples to help other along the same path.

This tutorial was created in Unreal 4.7.5 on Windows 8.

Overall Design
--------------

Our player (called a Survivor) has an action they are doing. The action might be like Idle, Walk, Sprint, Primary Attack, Die, Eat. The action is driven by the keyboard and mouse (or controller) input. The action and input determines the upper and lower body animations. For example input to walk forward causes the lower body animation to be walking. We use a 2D blend map to mix partial forward and strafe (sidestep) animations smoothly. The lower body is mostly movement, and the upper body is more like attack and such.

The upper body motion needs to change depending on the equipped weapon. Even an Idle stance is different depending on whether the hands are empty, holding a sword, or holding a gun.

States
------

We made up an enumeration called EAnimAction that enumerates all the possible motions we can have. This lets us have a symbol for each motion to pass around. The EAnimAction is all motions for both upper and lower body.

In general the input control code in SurvivorBP (our Player) is deciding what the actions are and telling the Animation Blueprint what to do.

(enum goes here)

The Survivor (Player)
---------------------

The Survivor has variables in the Animation Blueprint (Called SurvivorBPAnimation) for the default animations for **all** EAnimActions. None are allowed to be None (None and NULL are the same thing. In blueprints None is used for un-set or undefined things. In C++ NULL is used for the same purpose.)

(variables screen shot goes here)

The WeaponBP
------------

We have a blueprint called WeaponBP and derived from that are MeleeBP and ProjectileBP. Then each individual weapon that can be spawned, found, picked up, put in inventory, used, or dropped is a blueprint sub-classed from the appropriate parent. For example sword\_katana has MeleeBP as a parent, and thus WeaponBP as a parent. (And also up the inheritance tree to LootBP)

The WeaponBP has variables like damage, and more important for this discussion, Animation Sequences for all the weapon related possible EAnimActions. These \*\*are\*\* allowed to be None and should be if there is no specific animation.

(Weapon variables screen shot goes here.)

Fallback Animations Selection
-----------------------------

When deciding on an upper body animation we first check if there is an equipped weapon. This is easy because we have CurrentEquippedRightHand in SurvivorBP. If there is a weapon, we try to pull the animation for the EAnimAction. If that results in None, we use the SurvivorBPAnimation default animation instead.

Upper Body State Machine
------------------------

A Player in Unreal has an overall AnimScript in the Animation Blueprint. It can have one or more state machines that are then combined to a ultimate actual bone position to animate the character.

### DANGER - Bad Idea Here

So we first tried implementing a simple single state and had a variable UpperBodyAnim that fed into a pin in a animation node. The problem is that when we change the animation on that pin, Unreal can crash if the previous animation is longer and so the frame index is off the end.

(screen shot here)

Animation Switching by EAnimAction
----------------------------------

We want to be able to switch animation when the EAnimAction changes, and to switch smoothly. The total possibilities (permutations) of all animations, actions, and weapons is huge, so instead we just have two states. The are designated **A** and **B**.

We implement what is called 'PongPong', a term from graphics rendering where more than one frame buffer is used and you switch between them. [Wikipedia Ping Pong Scheme](http://en.wikipedia.org/wiki/Ping-pong_scheme)

What we do is when a new state is desired, we check a boolean to see if we are currently in state A or B. Then we set the animation clip for the other (inactive) state, and then flip the boolean to cause a state change on the next game frame. This way the clip frame is always reset, and the transition will get blended so the player mesh does not jerk suddenly to the new animation.

(Screen shot of ping pong code)

Networking Animation
--------------------

Of course we want other players to see what the player is doing, and where they are looking, so we share the setting of an animation over the net. We have a server and a client events, and in the end we call the actual animation switch code.

(screen shot)

Lower Body Animation
--------------------

(screen shot)

Animation Events
----------------

There are several things we want to detect about an animation. First is we decide if it should be repeating (loop) or just a single time through. And thus we need to know when the animation finishes. We use Animation Events for this. We have to add an event at the end of each animation for non-looping animations and use the event to get back to Idle.

While were on this topic, we also need to know when a melee weapon starts and ends a section of animation where it does damage. There may even be more than one section. For example a sword animation for a double swing would have to arcs of motion where the blade can cut.

(screen shot)

Weapon Hit Sweep for Melee
--------------------------

We want blades like swords to sweep through the air and calculate contact based on the blade. The easy fallback version of this is to just solve a ray from the camera forward and see if it hits an enemy. But that looks bad and is not very realistic. So we instead setup our bladed weapons (MeleeBP child blueprints) with a series of points along the blade. This is done in 3DSMax and/or in Unreal.

(screen shot, Unreal setup)

We then detect when a weapon is starting its damage arc, and ending. During the damage part of the animation we keep track of where all the damage points were in world space on the previous tick and solve lines to where they are on the current tick. Then deal damage. We also only want to have damage count once for a given arc and enemy, so we keep track of that too. Pretty simple in idea, but rather complex in implementation when you put it all together.

We have the MeleeBP do the actual tracking, and the Animation Blueprint watches the events.

Also, in our game zombies only take damage on **head hits**, so we have a sphere collider on the head bone that is tagged as HeadShotSphere and we only use hits on that for damage. Later we will have other tags to check, such as body parts, trees, and such.

(several screen shots of the scripts)

Not yet implement: We will detect hit locations and chop off arms and such.

Tilt Up and Down on Attack
--------------------------

The animation of a melee swing assumes the target is in front of the player. It may be that the player is fighting up or down a stairway and is looking on a tit up or down. We want to add that tilt from about the waste up to account for this.

Also guns will want to be able to shoot almost straight up and down and aim that way too. So we allow up to +- 98 degree tilt to be added in.

Like this...

(screen shot here)

Weapon Sockets
--------------

The Survivor mesh has lots of bones for animation. We need to be able to equip weapons to the bones so they are carried by the player. This is done with **Sockets**. We also have to do the equipping correctly so the Actor of the weapon gets picked up, physics turned off, and it gets glued to the socket. Then reverse the process on drop. In our game a fast click auto-equipps ar puts the item in the backpack. A click and hold instead floats the item in front of the player to carry it around or position it for nailing.

Unreal is so cool with sockets. You can stick a mesh in a socket in the editor to get it just right, but then when the game runs the mesh is gone.

(screen shot)

  

[SND R Keene](/User:SND_R_Keene "User:SND R Keene") ([talk](/User_talk:SND_R_Keene "User talk:SND R Keene")) 20:07, 14 April 2015 (UTC)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Animation\_By\_Equipped\_Weapon&oldid=13664](https://wiki.unrealengine.com/index.php?title=Animation_By_Equipped_Weapon&oldid=13664)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)