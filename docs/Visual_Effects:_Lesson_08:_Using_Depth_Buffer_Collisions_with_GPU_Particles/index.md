Visual Effects: Lesson 08: Using Depth Buffer Collisions with GPU Particles - Epic Wiki                    

Visual Effects: Lesson 08: Using Depth Buffer Collisions with GPU Particles
===========================================================================

  

Depth Buffer Module Setup and controls
--------------------------------------

GPU Particles support Depth Buffer Collision, using the Collision (Scene Depth) Module in Cascade.

Let’s add a Depth Buffer module to any translucent particle system you may have available from the previous lessons. I am using a spark emitter I have around from another project.

Depth buffer collision is only supported for translucent materials, masked and opaque materials contribute to the buffer and cannot collide with it.

  

[![8 1.png](https://d3ar1piqh1oeli.cloudfront.net/e/e0/8_1.png/400px-8_1.png)](/File:8_1.png)

[![](/skins/common/images/magnify-clip.png)](/File:8_1.png "Enlarge")

  

[![8 2.png](https://d3ar1piqh1oeli.cloudfront.net/2/23/8_2.png/400px-8_2.png)](/File:8_2.png)

[![](/skins/common/images/magnify-clip.png)](/File:8_2.png "Enlarge")

  

The module is fairly straight forward, and each option has well written descriptions of what the feature does.

**Resillience** – controls how bouncy the particle is. This can be mapped to a uniform distribution for variation.

You can see the difference in response between these two images. Note the difference in the Max field changes from 1, which is very bouncy, to .1 which nearly sticks to the surface.

[![8 3.png](https://d3ar1piqh1oeli.cloudfront.net/e/e8/8_3.png/400px-8_3.png)](/File:8_3.png)

[![](/skins/common/images/magnify-clip.png)](/File:8_3.png "Enlarge")

  

[![8 4.png](https://d3ar1piqh1oeli.cloudfront.net/0/0f/8_4.png/400px-8_4.png)](/File:8_4.png)

[![](/skins/common/images/magnify-clip.png)](/File:8_4.png "Enlarge")

  

**Friction** – Controls how much particles will grip or slide when colliding with a surface.

In the first image you can see the particles have a tendency to clump up near the point of contact with the surface which is tilted at ~30 degree angle. In the second image the lower friction allows the particles to maintain more of their original velocity and slide more easily.

[![8 5.png](https://d3ar1piqh1oeli.cloudfront.net/0/02/8_5.png/400px-8_5.png)](/File:8_5.png)

[![](/skins/common/images/magnify-clip.png)](/File:8_5.png "Enlarge")

  

[![8 6.png](https://d3ar1piqh1oeli.cloudfront.net/5/59/8_6.png/400px-8_6.png)](/File:8_6.png)

[![](/skins/common/images/magnify-clip.png)](/File:8_6.png "Enlarge")

  

**Radius Scale** - offsets your particles from the surface with which they are colliding. This is a good way to offset larger sprites if, for example, you are unhappy with surface interpenetration.

It is important to keep in mind that the collision of a particle is based on its radius, or rather its size, so changes to Size and Radius Scale can both affect the offset between a particle and surface. In the following examples, you can see how increasing size also increases the offset, making the particles further from the surface despite having the same Radius Scale.

Size 2.0 Radius Scale 10

[![8 7.png](https://d26ilriwvtzlb.cloudfront.net/f/f2/8_7.png)](/File:8_7.png)

[![](/skins/common/images/magnify-clip.png)](/File:8_7.png "Enlarge")

  
  Size 30 Radius Scale 10

[![8 8.png](https://d3ar1piqh1oeli.cloudfront.net/2/26/8_8.png/400px-8_8.png)](/File:8_8.png)

[![](/skins/common/images/magnify-clip.png)](/File:8_8.png "Enlarge")

  

All Translucent GPU particles with the Depth Buffer Module applied will show this type of behavior when colliding with Opaque or Masked materials.

If you want to see the surfaces Particles will collide against, and how the surface normal impacts evaluation use the Buffer Visualization tool

  

[![8 9.png](https://d3ar1piqh1oeli.cloudfront.net/b/b8/8_9.png/400px-8_9.png)](/File:8_9.png)

[![](/skins/common/images/magnify-clip.png)](/File:8_9.png "Enlarge")

  

  

*   [Go back to Lesson 07 part B](/Visual_Effects:_Lesson_07B:_Creating_and_Using_GPU_Particle_Simulations "Visual Effects: Lesson 07B: Creating and Using GPU Particle Simulations")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Visual\_Effects:\_Lesson\_08:\_Using\_Depth\_Buffer\_Collisions\_with\_GPU\_Particles&oldid=11790](https://wiki.unrealengine.com/index.php?title=Visual_Effects:_Lesson_08:_Using_Depth_Buffer_Collisions_with_GPU_Particles&oldid=11790)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Particle](/Category:Particle "Category:Particle")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)