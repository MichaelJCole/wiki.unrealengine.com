GPU Particle - Epic Wiki              

GPU Particle
============

From Epic Wiki

(Redirected from [GPU Particle (Tutorial)](/index.php?title=GPU_Particle_(Tutorial)&redirect=no "GPU Particle (Tutorial)"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Overview
--------

[![](https://d3ar1piqh1oeli.cloudfront.net/5/5d/GPUFire.jpg/180px-GPUFire.jpg)](/File:GPUFire.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:GPUFire.jpg "Enlarge")

Example GPU sprite with Vector Field

GPU Sprites are particles that have most of their calculations throughout their lifespan passed on to the GPU rather than the CPU. They provide the benefit of supporting significantly more particles per system than traditional CPU particles. Functionally, however, they are not significantly different than default CPU sprite particles.

For more information about GPU Sprites in general please see the [GPU Sprite reference page](https://docs.unrealengine.com/latest/INT/Engine/Rendering/ParticleSystems/Reference/TypeData/GPUSprites/index.html).  

Setup
-----

[![](https://d3ar1piqh1oeli.cloudfront.net/e/ef/GPUSpritesModule.jpg/180px-GPUSpritesModule.jpg)](/File:GPUSpritesModule.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:GPUSpritesModule.jpg "Enlarge")

Creating a new GPU Sprite

Not every module is compatible with GPU Sprites at this time. Only those modules available in the context menu after the GPU Sprites TypeData module is in place are valid.

Setting up a GPU emitter is as easy as adding a GPU Sprites TypeData module to your particle system via the right-click contextual menu.

For examples of adding Vector Fields to GPU Sprite particle systems to give motion similar to a fluidic simulation, see the [Global Vector Fields (Tutorial)](/Global_Vector_Fields_(Tutorial) "Global Vector Fields (Tutorial)") page and the [Local Vector Fields (Tutorial)](/Local_Vector_Fields_(Tutorial) "Local Vector Fields (Tutorial)") page.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=GPU\_Particle&oldid=8783](https://wiki.unrealengine.com/index.php?title=GPU_Particle&oldid=8783)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Particle](/Category:Particle "Category:Particle")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")