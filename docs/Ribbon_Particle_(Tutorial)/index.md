Ribbon Particle (Tutorial) - Epic Wiki                    

Ribbon Particle (Tutorial)
==========================

Overview
--------

Adding the Ribbon TypeData module will cause your particles to be connected together by a polygon ribbon. The ribbon connects particles in the order of their birth.

Setup
-----

[![](https://d3ar1piqh1oeli.cloudfront.net/f/f7/RibbonSmoke.jpg/200px-RibbonSmoke.jpg)](/File:RibbonSmoke.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:RibbonSmoke.jpg "Enlarge")

Example Ribbon particle

  

The first step in creating ribbon particles is to add a Ribbon TypeData module to the particle system from the right-click contextual menu.

In this example, a Ribbon particle system is being used to simulate wisping smoke, such as the kind that trails off the end of a cigarette. Granted, this example takes some artistic license.

The overall setup is fairly simple. An additive unlit material is applied with a black-to-white gradient running from left to right.

[![](https://d3ar1piqh1oeli.cloudfront.net/a/aa/RibbonMaterial.jpg/180px-RibbonMaterial.jpg)](/File:RibbonMaterial.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:RibbonMaterial.jpg "Enlarge")

Example material for the ribbon

  

The particle system will apply this material such that the youngest parts of the ribbon will receive the leftmost data while the oldest receive the right. Or, more directly, the ribbon becomes more opaquely white is it ages.

For the particle setup, the modules are set up in the following manner:

Module Properties

Property

Value

Reason

Ribbon Data Module

Sheets Per Trail

2

Adds a few more polygons to the ribbon, smoothing it out a bit.

Max Particle in Trail Count

500

Makes a very long trail.

Tangent Recalculation on Every Frame

Checked

Smoothes out the overall trail as the particles accelerate.

Spawn Module

Rate

20

Provides adequately dense wisps of smoke.

Lifetime Module

Lifetime

4

Causes the smoke to last for 4 seconds.

Initial Size Module

Start Size

Vector Constant: (10, 5, 0)

Applies a good initial size to the smoke ribbon. Mileage may vary.

Initial Velocity Module

Velocity

Vector Uniform: Min(-5, -5, 10) Max(15, 5, 10)

Gives the particles upward movement, a little bit of lateral randomness.

Color Over Life Module

Color Over Life

Vector Constant Curve: Alpha from 1 to 0 over life

Causes the particles to fade as they die.

Acceleration Module

Acceleration

Vector Uniform: Min(0, -2, 20) Max(10, 2, 35)

Applies a little wind and upward acceleration to the particles.

Size By Life Module

Life Multiplier

Vector Constant Curve: From 0.1 to 3 over the life of the particle

Causes the smoke to expand as it moves upward.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Ribbon\_Particle\_(Tutorial)&oldid=6454](https://wiki.unrealengine.com/index.php?title=Ribbon_Particle_(Tutorial)&oldid=6454)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Particle](/Category:Particle "Category:Particle")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)