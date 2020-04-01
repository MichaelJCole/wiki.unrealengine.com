Global Vector Fields (Tutorial) - Epic Wiki                    

Global Vector Fields (Tutorial)
===============================

  

Contents
--------

*   [1 Overview](#Overview)
*   [2 Setup](#Setup)
    *   [2.1 Vector Field Volume Actor](#Vector_Field_Volume_Actor)
    *   [2.2 Global Vector Field Particle System](#Global_Vector_Field_Particle_System)

Overview
--------

Global Vector Fields are set up in the level as placeable actors. Any GPU sprite particle system that uses the Global Vector Fields module can then be affected by these vector fields. These differ from Local Vector Fields in that a local field is inherent to a particle system. Global vector fields exist completely outside of a particle system and must have eligible particle systems placed within them in order to have an effect.

Setup
-----

Using a Global Vector Field first requires that you have a vector field asset that you can place via a Vector Field Volume actor.

> Vector Field Volumes are _not_ volumes in the traditional sense. They are created from the **Class Viewer**, not via a volume!

### Vector Field Volume Actor

Once you have a Vector Field Volume actor placed in your level, you need to associate a vector field with it. First, select your vector field asset in the Content Browser. Then, select your Vector Field Volume actor in the level. In the Details panel, look under the Vector Field Volume group and click the **Edit** button.

[![VFV Details 1 GVF.png](https://d26ilriwvtzlb.cloudfront.net/3/3d/VFV_Details_1_GVF.png)](/File:VFV_Details_1_GVF.png)

[![](/skins/common/images/magnify-clip.png)](/File:VFV_Details_1_GVF.png "Enlarge")

  

This will bring up the properties for this instance of the actor. Near the top, you will notice the Vector Field property. Add the selected vector field from the Content Browser to it by clicking the arrow button.

[![VFV Details 2 GVF.png](https://d26ilriwvtzlb.cloudfront.net/d/dc/VFV_Details_2_GVF.png)](/File:VFV_Details_2_GVF.png)

[![](/skins/common/images/magnify-clip.png)](/File:VFV_Details_2_GVF.png "Enlarge")

  

You will probably also need to resize the vector field using the local scale properties, near the bottom of the window:

[![ScaleSettings GVF.png](https://d26ilriwvtzlb.cloudfront.net/4/4e/ScaleSettings_GVF.png)](/File:ScaleSettings_GVF.png)

[![](/skins/common/images/magnify-clip.png)](/File:ScaleSettings_GVF.png "Enlarge")

  

You may now place the vector field in the level however you wish.

[![VFScaled GVF.png](https://d26ilriwvtzlb.cloudfront.net/8/8f/VFScaled_GVF.png)](/File:VFScaled_GVF.png)

[![](/skins/common/images/magnify-clip.png)](/File:VFScaled_GVF.png "Enlarge")

  

### Global Vector Field Particle System

The remainder of setting up the effect is fairly straightforward. Simply create a GPU Sprites particle system that uses a Global Vector Fields module.

In this example, we have a GPU sprite particle system that emits a series of long-lived slow moving particles. By moving a global vector field into these particles, we can influence their motion.

[![GlobalVectorFieldsSystem GVF.png](https://d26ilriwvtzlb.cloudfront.net/3/3c/GlobalVectorFieldsSystem_GVF.png)](/File:GlobalVectorFieldsSystem_GVF.png)

[![](/skins/common/images/magnify-clip.png)](/File:GlobalVectorFieldsSystem_GVF.png "Enlarge")

  

Now simply place the particle system within the volume of the Vector Field Volume actor. In this image, the bar of slow-moving particles is being disrupted as the Vector Field Volume is moved through them.

[![GameModeVFV GVF.png](https://d26ilriwvtzlb.cloudfront.net/1/17/GameModeVFV_GVF.png)](/File:GameModeVFV_GVF.png)

[![](/skins/common/images/magnify-clip.png)](/File:GameModeVFV_GVF.png "Enlarge")

  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Global\_Vector\_Fields\_(Tutorial)&oldid=6382](https://wiki.unrealengine.com/index.php?title=Global_Vector_Fields_(Tutorial)&oldid=6382)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Particle](/Category:Particle "Category:Particle")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)