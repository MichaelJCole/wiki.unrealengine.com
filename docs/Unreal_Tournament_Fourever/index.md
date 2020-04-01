Unreal Tournament Fourever - Epic Wiki                   

Unreal Tournament Fourever
==========================

The goal of this project is to explore numerous ideas relating to the Unreal Tournament and Championship franchise! It is largely a collection of new ideas for testing purposes to try and expand on the core game without deviating from the essence, to apply those ideas in a way they will still fit with the new art direction and theme whilst staying true to the originals. This is very much a tribute to great modifications for FPS games over the years, inspiration from the likes of Painkeep, Team Fortress, Weapons Factory, ChaosUT2, Fraghouse Invasion, Ballistic Weapons, Weapons of Power and a whole host more. The idea is a losely packed set of mutators to begin with adding new weapons, gamerules, player movement and new items.

Contents
--------

*   [1 Liandri Grand Championship](#Liandri_Grand_Championship)
    *   [1.1 Legendary Heros](#Legendary_Heros)
    *   [1.2 Hype/Fame](#Hype.2FFame)
    *   [1.3 Species](#Species)
    *   [1.4 Skill Shots](#Skill_Shots)
    *   [1.5 Professions](#Professions)
*   [2 Fourtress](#Fourtress)
    *   [2.1 Source](#Source)
    *   [2.2 Design](#Design)
    *   [2.3 Class Types](#Class_Types)
*   [3 Bombing Run](#Bombing_Run)
    *   [3.1 Greed](#Greed)
*   [4 Assault](#Assault)
    *   [4.1 Waves](#Waves)
    *   [4.2 Positions](#Positions)
    *   [4.3 Kit / Loadout](#Kit_.2F_Loadout)
    *   [4.4 Horde Mutator](#Horde_Mutator)
*   [5 Onslaught/Warfare](#Onslaught.2FWarfare)
    *   [5.1 Attrition](#Attrition)
*   [6 The Adrenaline Mutator](#The_Adrenaline_Mutator)
    *   [6.1 Faction](#Faction)
*   [7 Relics, Runes and Artifacts](#Relics.2C_Runes_and_Artifacts)
*   [8 Botpack](#Botpack)
    *   [8.1 Unreal](#Unreal)
*   [9 Powerups and Pickup Bases](#Powerups_and_Pickup_Bases)

Liandri Grand Championship
--------------------------

Is a single player ladder modification that adds player rosters and various other features to the PvP portion of [Unreal Tournament](/Unreal_Tournament "Unreal Tournament"). The rules of the grand tournament vary slightly and are subject to change (random mutators, transmogrify powerup bases, etc), this year Liandri has decided to focus on allowing combatants a wider variety of utility tools and melee weapons.

*   Offhand Weapon support (Akimbo & Mixmode)

Cant mix hammer, translocator and grapple, all offhands.  

### Legendary Heros

Historic great matches from previous UT games, the first Malcolm vs Xan final featuring more classical versions of their skins. This extended ladder should encompass all the best matches through out the history of the tournament, in a similar vein to the original Assault reenactments but focusing on spectacle and the immortal gladiators.  

### Hype/Fame

The idea behind this concept is that the Liandri Tournament really is a form of entertainment, the combatants should aim to please the audience and keep them enthralled in the heat of the battles. This should help the spectacle of the event, to really put the focus on new and interesting things within the game instead of the same type of kills and combat you've seen in past UT games.

[https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=56227&viewfull=1#post56227](https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=56227&viewfull=1#post56227)  
[https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=66818&viewfull=1#post66818](https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=66818&viewfull=1#post66818)  

**First Blood**: could add a short multiplier on event? Audience Attention bar drains down, multiplier continually drains off bar but there is a pause between bars.  

### Species

[http://liandri.beyondunreal.com/Species\_Statistics](http://liandri.beyondunreal.com/Species_Statistics)

Species

_Human_

_Gene-boosted  
Human_

_Skaarj Hybrid_

_Skaarj_

_Nakhti_

_Cybernetic_

_Undead_

Mass

1.1

1.3

1.35

1.5

1.4

1.4

0.9

Agility

0.7

0.5

0.85

1.0

1.1

1.1

0.9

Vitality

1.0

1.5

1.2

1.35

1.4

0.8

1.0

Stamina

1.5

1.0

1.4

1.2

1.6

2.0

1.8

  

### Skill Shots

Skill shot mutator to add events to interesting kill shots like hitting someone long range with a mid-air rocket or a long distance headshot etc. Largely inspired by Quake and Bulletstorm, the idea is to make killing people more interesting by tying this into the Hype/Fame system more unique kills are rewarded higher than just simply killing someone with the same weapon the entire game. Similar to the idea behind Gun Gametypes which require players to make a kill with each weapon to win.

**Ace** : Air Rocket  
**Hot Shot** : Loaded Rocket MultiKill  
**Shombo** : Shock Combo MultiKill  
**Goo'd** : Goo MultiKill  
**Shredded** : Flak Shard Gib Close Range  
**Headshot**  
**Hammer Time** : Hammer Kill after Spawn  
**Gangsta** : Dual Enforcer Double Kill  
**Vertigo** : Send an enemy down a huge drop.  
**Juggler** : Blast an enemy into the air and then kill them.  
**Knee Capping** : Blast an enemy into the air and then they die from falling damage.  

This is about making the game more interesting for spectators also, to that end unique kills are higher rewarded but you can play well with a single weapon and also achieve a reasonable amount of Hype/Fame. It rewards players who take the risk to try and achieve these types of kills and in variation, each first blood kill with the weapons will also award Hype with multi-kills also being rewarding but higher for streaks with multiple weapons.

### Professions

Warrior, Soldier, Mercenary, Hunter, Assassin, Prisoner, Criminal.

Fourtress
---------

### Source

[Fourtress.h](http://pastebin.com/7cKS8Va6) [Fourtress.cpp](http://pastebin.com/zPEcA1MW)

### Design

Is a basic class based framework consisting of modifiers in the form of the following statistics:

*   **Mass** : How heavy a player of this class is, affects gravity scale, momentum, etc.
*   **Agility** : How restricted the players movement is, Wall Dodges, etc.
*   **Vitality** : The amount of Health a player has.
*   **Strength** : Damage scaling of this players Weapons. (_Im not convinced that adjusting weapon damage values are the best idea for balance, see old species UT2004_)
*   **Stamina** : Relates to how much Adrenaline a player can use.

### Class Types

All values are multipliers for various base stats, for instance Agility is considered to be a number of variables in the movement component, such as a characters ability to wall dodge.

_Pawn_

_Bishop_

_Knight_

_Rook_

Weight

Standard

Light

Medium

Heavy

Size

1.0

0.94

1.12

1.2

Mass

1.0

1.1

1.25

1.35

Agility

1.0

1.14

1.08

0.9

Vitality

1.0

0.75

1.25

1.5

Stamina

1.8

2.0

1.5

1.0

Armour

Shield  
Helmet  
Vest  
Thighs

Shield  

Vest  
Thighs

Vest  
Thighs  
Helmet

  

Bombing Run
-----------

Round resets after players have delivered the Orb to the goal. Alot more sports themed than its counterpart CTF, this modified version of BR will feature player classes by default, each class will only allow a limited amount of players to select it, for instance there will be 3 core classes with a coach or commander being a possible expanded role setting out plays for the team.  

The idea here is that players will have to work together more to score a goal, a Heavy class player may be used primarily on defense for example but for a strong defensive team it might become a necessity to push through with a Heavy class on offense. This basically takes the Fourtress mutator and applies it at the core of the gametype, Light classes will gain the ability to use the hoverboard in this gametype and players will be equipped with the Shieldgun (ball launcher).  

### Greed

Variant where kills with the Orb give you a slight buff and increase the score per each frag.

  

Assault
-------

A modification to the classic Assault game rules to improve the flow could see different scenarios which could include:

*   Invasion, Tower Defense: Where defense teams are given a short time to setup a defense and then a larger attacking force attacks. (could use the ONS Core, turrets etc)
*   Ambush, Defend: Not all defense scenarios need to include bases, convoys and other logistics such as outposts are prone to attacks.
*   Payload, Offense: Not all scenarios need to be defensive, in this one a team maneuvers through a map pushing a payload forward, locking it in at check points. This could include extra objectives such as locked doors to provide side missions and opportunity for teams to split into squads.

The games winner is determined by which team either holds out the longest on defense, or successfully attacks the fastest.

#### Waves

Players are limited to spawning in waves, this allows a more unified front for attack and defense, punishing the players more for their deaths.

#### Positions

Offense,  
Defense,  
Stealth,  
Perimeter Defense,  
Mechanic,  
Medic,  
Support,  
Coach/Commander  

#### Kit / Loadout

Assault being historical reenactments the weaponry could be that from previous Unreal games to showcase the breadth of the universe. Chosen by the level designer to best suit the scenario, typically 3 main weapons and 2 secondaries will be selected along with the ability to man turrets.

Kits might include utility items such as grapples, scuba gear etc.

#### Horde Mutator

Changes the mode to use the AI for a single team putting all humans on. Can allow Species/Faction rosters to be added as well as some classed based tweaks such as Champions, Heros etc.  

Onslaught/Warfare
-----------------

Liandri Vehicle Set  
Species Hoverboards (Skaarj, Necris, etc)  
Better turrets, deployable, buildable, required a node to be "over charged"? Radar Dishes, switchable vehicle factory, class kit loadout pods  

### Attrition

Degenerating Health, Armour and Shields. For CTF/Onslaught this will only happen in enemy territory. Vehicles ammo regenerates faster in friendly linked territories (logistics, supply lines)

The Adrenaline Mutator
----------------------

The core concept behind adrenaline is that its a form of energy the player can use, in UT2003/4 players use it to perform combos which is the basic premise. The idea is to keep it largely intact but removing the issues with the positive feedback loop for skilled players and make it more skillful, make it useful for lower skilled players to use as a comeback mechanism. A typical type of energy we see in fighting games (which would could relate to UC2) is an energy or super bar, this bar fills based on a number of different events not just when a player frags/damages another.  

[http://forums.unrealtournament.com/showthread.php?4627-Adrenaline!-Yes-or-No&p=59196&viewfull=1#post59196](http://forums.unrealtournament.com/showthread.php?4627-Adrenaline!-Yes-or-No&p=59196&viewfull=1#post59196)  
[http://forums.unrealtournament.com/showthread.php?4627-Adrenaline!-Yes-or-No&p=59433&viewfull=1#post59433](http://forums.unrealtournament.com/showthread.php?4627-Adrenaline!-Yes-or-No&p=59433&viewfull=1#post59433)  
[http://forums.unrealtournament.com/showthread.php?4627-Adrenaline!-Yes-or-No&p=59652&viewfull=1#post59652](http://forums.unrealtournament.com/showthread.php?4627-Adrenaline!-Yes-or-No&p=59652&viewfull=1#post59652)  
[http://forums.unrealtournament.com/showthread.php?4627-Adrenaline!-Yes-or-No&p=60268&viewfull=1#post60268](http://forums.unrealtournament.com/showthread.php?4627-Adrenaline!-Yes-or-No&p=60268&viewfull=1#post60268)  
[https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&highlight=Adrenaline](https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&highlight=Adrenaline)  
[https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=56460&viewfull=1#post56460](https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=56460&viewfull=1#post56460)  
[https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=56496&viewfull=1#post56496](https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=56496&viewfull=1#post56496)  
[https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=71666&viewfull=1#post71666](https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=71666&viewfull=1#post71666)  

[http://mortalkombat.wikia.com/wiki/Super\_Meter](http://mortalkombat.wikia.com/wiki/Super_Meter)  
[http://i.imgur.com/oW77T.png](http://i.imgur.com/oW77T.png)

### Faction

All Faction skills will require Adrenaline to perform.

[https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=61539&viewfull=1#post61539](https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=61539&viewfull=1#post61539)  
[https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=66974&viewfull=1#post66974](https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=66974&viewfull=1#post66974)  

[Weapon Manufacturers](https://forums.unrealtournament.com/showthread.php?9636-Weapon-Manufacturers)

Thunder Crash

Alliance

New Earth Government

Colour

Green

Gold?

Skills

_Concussion_  
Will boost towards a player stunning them.

_Booster_  
Small Jetpacks allow the player to boost up slopes further.

_Hooah_  
Boosts health and agility of players around for a short time.

Guns

_Enforcer_  
[NEG issue, Axon contracted](https://forums.unrealtournament.com/attachment.php?attachmentid=7249&d=1407572930)

_Pulsegun_  
[Combat Assault Rifle (CAR)](http://liandri.beyondunreal.com/Combat_Assault_Rifle)

_Sniper Rifle_  

Melee

_Impact Hammer_  
Liandri Mining standard issue impact hammer.

Iron Guard

Alliance

Jihan Nyhn

Colour

Gold

Skills

_Stalwart_  
Buffs a players armour, especially against energy weapons.

_Steady Aim_  
causes all weapon spreads to tighten.

_Vengeance_  
Causes all damage received to boost health and reflect a  
portion of damage back on the attacker. (Thorns)

Guns

_Enforcer_  
NEG issue, Axon contracted

_Flak Cannon_  

_Trifecta_  
[Triple barrel machine gun](http://www.dukenukemforever.com/html/us/community/features/img/rippershot.jpg)

Melee

_Kick_  
Can kick people and stun them, cause them to ragdoll and fall off ledges to their doom.

Corrupt

Alliance

Liandri

Colour

Orange

White

Skills

_Cannibalize_  
Provides a temporary health boost by using non-vital systems.

_Homing_  
Causes projectiles to target opponents.

_Repulse_  
Strong internal emp that partially reflects projectiles.

Guns

_Rivot Gun_  
Welging/nailing space tool, modifed to be an smg for the tournament, liandri make the rules.

_Cannister Gun_  
(Sentry/Proxy/Sticky?) Axon was looking for a replacement to their old split delivery system

_Lightning Gun_  
Instagib/Railgun replacement, has its original charge mode with the status bar.

Melee

_Hammers_  

Juggernaut

Alliance

Axon

Colour

Red Decals

Gun Metal Armour

Silver/Brown?(Axon?)

Skills

_Beserk_  
Raises the firerate to 1.25, projectile damage doesnt do as much knockback.

_Smash_  
Flying Melee Attack with Gauntlet, can be used for jumping up higher.

_Regenerate_  
GeneBoosters kick in when a warrior has reached a level of trauma  
causing tissue to rapidly regenerate for a short period.

Guns

_Double Barrel Shotgun_  
[Pitbull Shotgun](http://media.moddb.com/cache/images/mods/1/12/11115/thumb_620x2000/Pitbull-1.1.jpg)

_Ripjack_  
Crafted from technology capture by the NEG during the Human/Skaarj war, Axon was contracted to make this weapon more ergonomic for humans.

_Minigun_  
These antiques were mounted to vehicles but reclaimed when Axon won the NEG contract to supply Earth with military vehicles.

Melee

_Gauntlets_  
[Power Fist](http://img2.wikia.nocookie.net/__cb20110210224044/fallout/images/b/bb/POWERFIST.png)

Black Legion

Alliance

Phayder

Necris

Drakk

Colour

Black Armour

White/Grey Skin

Skills

_Siphon / Vampire_  
A portion of damage caused is returned to the player.

_Ethereal_  
Causes the player to become partially elemental with physical damage taken being weakened.

_Nano Cloud_  
Collects health from the surrounding area and returns it, will also leech health from opponents.

Guns

_Six Shooter_  
Primary is air rounds to push players around, slight knockback. Secondary is air burst nanoblack clouds.

_Venom Rifle_  
Railgun necris style, causes lingering damage on body shots. Small amount of health but reasonable duration.

_Spider Mines_  
Spidermines build a laser web?

Melee

_Nano-Blades_  

[Grapple](/Grappling_Hook_Tutorial "Grappling Hook Tutorial")

Ronin

Alliance

Izanagi

Colour

Red

Grey?

Skills

_Shuriken_  
Dash and a push move.

_Wraith_  
Deals extra damage against the enemy who last killed you.

_Flash_  
Flashes and makes you temporarily invisible. (ghost warrior)

Guns

_Stinger_ (Speargun) :  

_Ball Launcher_  
Canon but fires energy balls that bounce around areas.

_Takkra_  
[Takkra](http://liandri.beyondunreal.com/Takkra)

Melee

_Shield Gun_? Ball Launcher?

Skaarj

Alliance

Skaarj Queen? Mercenary? Hybrid?

Colour

Green

Tattoo Colour

Skills

_Primal Scream_  
Audible defense against enemys, will stun them if they are close enough.

_Warrior Spirit_  
Call on inner strength making you less vulnerable to physical damage.

_Predator_  
Thermo camouflage

Guns

_SludgeGun_  
Modified BioRifle.

_Eightball_  
[http://img1.wikia.nocookie.net/\_\_cb20131210225818/legacyofkain/images/e/e2/Nosgoth-Character-Hunter-Bola-Weapon.jpg](http://img1.wikia.nocookie.net/__cb20131210225818/legacyofkain/images/e/e2/Nosgoth-Character-Hunter-Bola-Weapon.jpg)

_RazorJack_  
hunting weapon, adapted for military purposes.

Melee

_Razik_ :  
_Blade Burst_  
Charge with your Melee weapon.

Nahkti

Colour

Gold

Teal

Skills

_Energy Shield_  
Blocks damage from Energy Weapons.

_Energy Burst_  
EMP burst that disables electronics, including pickup bases.

_Stun Trap_  

Guns

_Dispersion Pistol_  

_Goo Gun_  

_Stinger_  

Melee

_Shock Lance_

Nali

Colour

Gold

Teal

Guns

_Dispersion Pistol_

_Quad Enforcers_

Krall

Gen Mo Kai

Relics, Runes and Artifacts
---------------------------

**Runes**: Weapons come with various sockets allowing you to select combination of Runes that modifies a weapons abilities  
**Relics**: Mutator for dropped pickup version of the Skills.  
[https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=68553&viewfull=1#post68553](https://forums.unrealtournament.com/showthread.php?6867-Adrenaline&p=68553&viewfull=1#post68553)  
**Artifacts**: Usable powerups  

Botpack
-------

Updated AI to include caching to disk to improve bots ability to navigate the map and remember successful strategies, not just of their own but their opponents. This could be expanded to a cloud service to allow for sharing of AI on different servers by syncing new data into the database, however on dedicated servers the mutator will allow the server to cache data locally.

### Unreal

Powerups and Pickup Bases
-------------------------

**Riot Shield:**

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Unreal\_Tournament\_Fourever&oldid=10528](https://wiki.unrealengine.com/index.php?title=Unreal_Tournament_Fourever&oldid=10528)"

[Category](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")

  ![](https://tracking.unrealengine.com/track.png)