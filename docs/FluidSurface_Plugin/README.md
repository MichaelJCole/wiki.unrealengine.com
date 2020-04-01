FluidSurface Plugin - Epic Wiki                    

FluidSurface Plugin
===================

  

Overview
--------

In UE2 we had a simple but fun feature called a FluidSurfaceInfo. This was a small, simulated fluid surface that could place in your level, and would respond to the player running through it and shooting it. It was requested that we bring back this feature in UE4. So I am posting the original source from UE2, if anyone is interested in porting it to UE4 as a plugin!

Source code: [File:FluidSurface.zip](/File:FluidSurface.zip "File:FluidSurface.zip")

This is a CPU implementation. In UE3 we had a more sophisticated GPU-based fluid surface implementation, but I thought this would be a simpler way to start. I would look at the CableComponent to give an example of how to set up a plugin and render custom geometry each frame.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=FluidSurface\_Plugin&oldid=3712](https://wiki.unrealengine.com/index.php?title=FluidSurface_Plugin&oldid=3712)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)