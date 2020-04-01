Particle Events - Epic Wiki                    

Particle Events
===============

When the desired effect is to have rain in a level, you can also get the splash effect of the rain on meshes and materials, including on characters.

Splashes on Character Pawns can be accomplished by placing a particle system above the model and linking it to the Pawn so it moves with the character. Inside of the particle system are two emitters. The first emitter sends very tiny particles (invisible due to their small scale) down from the particle system towards the mesh. They move quickly and have short lifetimes. These particles have collision enabled which is set to "kill" the particle when it detects a collision. This first emitter also has a module called **Event Generator**(under the Event submenu) set to _collision_ and given a unique name, which generates an event every time one of its particles collides with something.

The second emitter in the particle system is a small water splash. This could be a sprite or small mesh. Inside of this particle system is an Event Receiver Spawn module (also under the event submenu in Cascade) which listens to the Event Generator module and is told to spawn a particle whenever the collision event is detected, at that location.

The end result is a stream of individual invisible particles which collide with the mesh and, at that impact point, spawn a small splash.

In this image, we see a very simple rain simulation in which an Event Generator is producing a Collision event named _Splash_. A secondary emitter with an Event Receiver Spawn module takes in that event and uses it to produce small splashes on the collision surface.

[![RainExample PE.png](https://d3ar1piqh1oeli.cloudfront.net/c/ce/RainExample_PE.png/940px-RainExample_PE.png)](/File:RainExample_PE.png)

Particle size has been boosted for visibility.

[![RainCascade PE.png](https://d26ilriwvtzlb.cloudfront.net/f/f5/RainCascade_PE.png)](/File:RainCascade_PE.png)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Particle\_Events&oldid=6447](https://wiki.unrealengine.com/index.php?title=Particle_Events&oldid=6447)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Particle](/Category:Particle "Category:Particle")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)