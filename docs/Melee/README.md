Melee - Epic Wiki                    

Melee
=====

  
Melee is simply doing damage to characters if they reside within a certain distance to the melee damage dealer.

  

Contents
--------

*   [1 Different Methods:](#Different_Methods:)
*   [2 Capsule Overlapping Outline](#Capsule_Overlapping_Outline)
    *   [2.1 Make a Capsule in your PlayerCharacter Class](#Make_a_Capsule_in_your_PlayerCharacter_Class)
    *   [2.2 In the Player Character Graph, Damage Overlapping Characters](#In_the_Player_Character_Graph.2C_Damage_Overlapping_Characters)
    *   [2.3 Finally Process the Damage inside the EnemyCharacters Class](#Finally_Process_the_Damage_inside_the_EnemyCharacters_Class)
*   [3 Animation based melee system](#Animation_based_melee_system)

Different Methods:
------------------

*   Weapon Collision with Components
*   Capsule Overlapping Actors

Capsule Overlapping Outline
---------------------------

in PlayerCharacter class

*   With in PlayerCharacter class making character class with a Capsule component that is wide enough to "overlap" potential melee recipients.
*   triggering the start of our damage method via an input
*   getting overlapped actors and applying damage

  
in the EnemyCharacter class

*   processing incoming damage, decrementing health, and checking for death

  

### Make a Capsule in your PlayerCharacter Class

[![Melee Capsule.jpg](https://d26ilriwvtzlb.cloudfront.net/6/6d/Melee_Capsule.jpg)](/File:Melee_Capsule.jpg)

  

  

### In the Player Character Graph, Damage Overlapping Characters

[![Melee OverlapDamage.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a6/Melee_OverlapDamage.jpg)](/File:Melee_OverlapDamage.jpg)

Ignore the branch and its condition, setting IsAttacking will be used in the animblueprint, the delay i used so that damage was dealt mid way through my swinging animation.

Then using the MeleeCapsule shown before is used to get all overlapping actors, but i changed the purple pin to class filter so it would only hit "myEnemyChar" class.

Then simply pushing that thru a for loop, it will do damage to all Enemies. MeleeDamage is simply a float that i set elsewhere. (default is 45)

  

  

  

### Finally Process the Damage inside the EnemyCharacters Class

[![Melee EnemyRecieveDamage.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a0/Melee_EnemyRecieveDamage.jpg)](/File:Melee_EnemyRecieveDamage.jpg)

Here is just converting the float to an int for subtracting from current health, checking if health is too low and kill the actor.

Animation based melee system
----------------------------

Here's a bit of info about how fortnite uses montages and anim notifies to do a animation-based melee combo system: [https://answers.unrealengine.com/questions/43365/fortnite-melee-combat-system.html](https://answers.unrealengine.com/questions/43365/fortnite-melee-combat-system.html)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Melee&oldid=11514](https://wiki.unrealengine.com/index.php?title=Melee&oldid=11514)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)