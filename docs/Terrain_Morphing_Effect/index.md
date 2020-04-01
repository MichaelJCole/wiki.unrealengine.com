Terrain Morphing Effect - Epic Wiki                    

Terrain Morphing Effect
=======================

  

Contents
--------

*   [1 **Overview**](#Overview)
*   [2 **Effect Breakdown**](#Effect_Breakdown)
    *   [2.1 Post Process Whiteout](#Post_Process_Whiteout)
    *   [2.2 Adjusting the Lighting from Interior to Exterior](#Adjusting_the_Lighting_from_Interior_to_Exterior)
    *   [2.3 Magic Particle Effect](#Magic_Particle_Effect)
        *   [2.3.1 Expanding Bubble](#Expanding_Bubble)
        *   [2.3.2 Magic Dust](#Magic_Dust)
    *   [2.4 Floor Material Change](#Floor_Material_Change)
    *   [2.5 Grass Growing (Blueprint Effect)](#Grass_Growing_.28Blueprint_Effect.29)
    *   [2.6 Bush and Tree Growing Particle Effect](#Bush_and_Tree_Growing_Particle_Effect)
    *   [2.7 The Final Blueprints](#The_Final_Blueprints)
*   [3 **Full Project**](#Full_Project)

**Overview**
------------

Many times what is perceived as a singular effect can actually be a very well crafted series of effects tied closely together in time made to simulate a singular event. As an example, here is an effect made to simulate a piece of an interior changing to an outdoor forest setting. I am presenting a brief run down of each component of teh effect, but suggest you download the full project and follow through each section to see the full effect settings.

[Terrain Morph Effect, Final Render (Movie)](https://vimeo.com/114140173)

The effect as a whole is actually made up of several particle effects and a blueprint effect all timed to a specific set of events to create the final effect. To breakdown the effect according to the where in the timed sequence each start:

*   **Post Process White Out**
*   **Adjust Lighting from Interior to Exterior**
*   **Magic Particle Effect**
*   **Floor Material Change**
*   **Grass Growing (Blueprint Effect)**
*   **Bush and Tree Growing Particle Effect**

**Effect Breakdown**
--------------------

### Post Process Whiteout

This effect is created using a simple Post Process Material which LERPs between the Scene and a Complete White Color using a Material Parameter Collection(MPC) Scalar Value as the alpha. In all of these effects I use an MPC to help keep the blueprints easier to update and change. This Material was added to the unbound post process volume in the level as a Blendable.  
  
[![Post Process Material](https://d3ar1piqh1oeli.cloudfront.net/6/67/PostProcess.jpg/794px-PostProcess.jpg)](/File:PostProcess.jpg "Post Process Material")  
  

### Adjusting the Lighting from Interior to Exterior

This is done simply by adjusting the intensity of the point lights and directional light up and down in the level blueprint. In this same step I also un-hide the Sky Sphere and Atmospheric Fog (which start off hidden) to complete the outdoor look. The exact light levels were determined in editor first then transferred into the level blueprint nodes.  
[![LevelBlueprint](https://d3ar1piqh1oeli.cloudfront.net/1/14/Lights.jpg/609px-Lights.jpg)](/File:Lights.jpg "LevelBlueprint")  

### Magic Particle Effect

This particle effect is made from 3 emitters, the expanded bubble, the Magic Dust growing and the stable Magic Dust stable.

#### Expanding Bubble

The Expanding Bubble is a mesh type emitter where the “bubble pop” effect is controlled by a Dynamic Parameter which connects the material and the emitter and allows the emitter to control the material on the mesh over the particles lifetime.  
[![Cascade Window, Dynamic Parameter](https://d3ar1piqh1oeli.cloudfront.net/e/e6/Magic01.jpg/959px-Magic01.jpg)](/File:Magic01.jpg "Cascade Window, Dynamic Parameter")  
  

[![Material Windows, Dynamic Parameter](https://d26ilriwvtzlb.cloudfront.net/1/1f/Magic02.jpg)](/File:Magic02.jpg "Material Windows, Dynamic Parameter")  

#### Magic Dust

The Magic Dust Growth and Stable are actually the same effect the growth simply changing the offset value over the particles life from 0 to its final value and thus growing. The important thing to see is that the stable emitter is actually delayed according to the lifetime of the growth ring and actually slightly before. This way it looks like the ring grows and stops and becomes stable.  
[![Cascade Window, Emitter Delay](https://d3ar1piqh1oeli.cloudfront.net/2/24/Magic03.jpg/954px-Magic03.jpg)](/File:Magic03.jpg "Cascade Window, Emitter Delay")  

### Floor Material Change

This is the real trick of the real trick of the entire effect. The actual mesh that represents the floor (both the Tiled floor and the Grass) never changes only the material adjusts. In this particular effect I am using a flat surface, but this can be done on any static mesh in a similar fashion. You just need to watch how your unwrap is laid out in the UV space.  
[![Floor Material, complete](https://d3ar1piqh1oeli.cloudfront.net/7/7a/Floormaterial.jpg/1310px-Floormaterial.jpg)](/File:Floormaterial.jpg "Floor Material, complete")  
The material itself is controlled by a change in a single scalar value housed in the Material Parameter Collection via the IF node comparisons driving a series of LERP alphas.

### Grass Growing (Blueprint Effect)

This is actually an effect that comes from the Blueprint Office Content Example with only one small section added. This is the blueprint which spawns a series of flowers and grasses around the tree in Blueprint Office, which I have re-purposed to only spawn my grass. The Construction script is identical but in the Event Graph I store the values of the grass in an array and reset all the Z Scale Values to 0 and when it’s time for them to actually spawn I simply reset the Z value of all the array element using a LERP in the Blueprints. This LERP-ing simulates the growth of the grass.  
[![Actor Blueprint, initial spawn with Z=0 set](https://d3ar1piqh1oeli.cloudfront.net/e/ee/Grass01.jpg/657px-Grass01.jpg)](/File:Grass01.jpg "Actor Blueprint, initial spawn with Z=0 set")  
  

[![Actor Blueprint, growth of Z value](https://d3ar1piqh1oeli.cloudfront.net/4/4f/Grass02.jpg/616px-Grass02.jpg)](/File:Grass02.jpg "Actor Blueprint, growth of Z value")  

### Bush and Tree Growing Particle Effect

These two effects do fire off in the order of Bush then Tree, but besides the scale difference and mesh used the effects themselves are identical. The Sphere(Seeded) module has been shared between the two emitters with a Random seed information shared to insure that the bushes always spawn in the same spot so the bushes and trees grow in the same spots that the finished trees exist. You can also see that the Int. Mesh Rot (Seed) always the same for rotation. This way the trees and bushes will be slightly different each time but will still give the growing effect we are after.  
[![Cascade Window of Bush Emitter, Sphere(Seed)](https://d3ar1piqh1oeli.cloudfront.net/b/b2/Bushtree01.jpg/958px-Bushtree01.jpg)](/File:Bushtree01.jpg "Cascade Window of Bush Emitter, Sphere(Seed)")  
  

[![Cascade Window of Tree Emitter, Int Mesh Rot(Seed)](https://d3ar1piqh1oeli.cloudfront.net/8/88/Bushtree02.jpg/962px-Bushtree02.jpg)](/File:Bushtree02.jpg "Cascade Window of Tree Emitter, Int Mesh Rot(Seed)")  

For the Tree Effect I also added a Leaves and branches effect the shoots off as they complete their growth, making it look like leaves and branches are being thrown up in the air during the growth. It is an addition and not necessary for the overall effect but a nice extra touch which helps sell the motion of the trees.  
[![Cascade Window of Tree Emitter, Location Box for Added Effect](https://d3ar1piqh1oeli.cloudfront.net/1/1e/Bushtree03.jpg/958px-Bushtree03.jpg)](/File:Bushtree03.jpg "Cascade Window of Tree Emitter, Location Box for Added Effect")  

### The Final Blueprints

Here is the Event Graph of the Actor Blueprint for the Entire effect, please note that floor mesh, the grass construction script, and all effects exist in this singular blueprint. With the exception of the grass random placement in the construction graph all effects are run in the Event Graph.  
[![Actor Blueprint, complete](https://d3ar1piqh1oeli.cloudfront.net/f/f5/ActorBlueprint.jpg/959px-ActorBlueprint.jpg)](/File:ActorBlueprint.jpg "Actor Blueprint, complete")  

The Level Blueprint uses the button and key pressed to drive the custom events in the actor blueprint above as well as adjust the lighting as mentioned previously.  
[![Level Blueprint, complete](https://d3ar1piqh1oeli.cloudfront.net/8/88/LevelBlueprint.jpg/958px-LevelBlueprint.jpg)](/File:LevelBlueprint.jpg "Level Blueprint, complete")  

**Full Project**
----------------

Here is a link to the full project for dissection:

[TerrainMorphEffect.zip](https://mega.co.nz/#!Cdk1SQra!0LDd2Bi5JuLgB762aoiaxRsb_TGcEwKAqA8-s5QpgP0)  
[TerrainMorphEffect\_4\_7.zip](https://mega.co.nz/#!fMMFnSab!t_qPF0PlyswUPSLDm8lwY0iyGsPXgd_hSJZtw5RVjpM)

The final build for this project is built using the **4.6.0**. Unzip files into a new folder and double click the TerrainMorphEffect.uproject file.

*   Now Updated with a 4.7 project - 6/4/2015

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Terrain\_Morphing\_Effect&oldid=14468](https://wiki.unrealengine.com/index.php?title=Terrain_Morphing_Effect&oldid=14468)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Particle](/Category:Particle "Category:Particle")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)