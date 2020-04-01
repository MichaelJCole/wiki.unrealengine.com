 Top Tips for Game Jams - Epic Wiki             

 

Top Tips for Game Jams
======================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Art](#Art)
    *   [1.1 Material Instances are your Friend!](#Material_Instances_are_your_Friend.21)
    *   [1.2 Materials Don’t Have to be Complicated](#Materials_Don.E2.80.99t_Have_to_be_Complicated)
    *   [1.3 Fix it in Post!](#Fix_it_in_Post.21)
    *   [1.4 Add some Ambient Animation](#Add_some_Ambient_Animation)
    *   [1.5 Change up the Default Cloud Texture](#Change_up_the_Default_Cloud_Texture)
    *   [1.6 The Foliage Brush is your Friend](#The_Foliage_Brush_is_your_Friend)
*   [2 Video Tutorials](#Video_Tutorials)
    *   [2.1 Mathew Wadstein](#Mathew_Wadstein)

Art
---

Although time is often squeezed in a game jam, there are a few quick things you can do in engine which can make all the difference to the visuals of the game!

### Material Instances are your Friend!

Create one ‘Master’ Material for your scene and then create [Material Instances](https://docs.unrealengine.com/latest/INT/Engine/Rendering/Materials/MaterialInstances/) from it. It’ll help keep all of your visuals coherent and makes updating Materials a lot easier as changes in the Master Material will replicate out to all of the Instances.

[![Image00.png](https://d3ar1piqh1oeli.cloudfront.net/c/c5/Image00.png/600px-Image00.png)](/index.php?title=File:Image00.png)

  

### Materials Don’t Have to be Complicated

You can get a great look from a simple set-up. Check out Zak’s [Fresnel based Material](https://youtu.be/w7xd4kvck0I) from his 3rd Person Game Tutorial. It provides a great base to modify if you are going for a flat colour style.

### Fix it in Post!

I know to most artists this will send them screaming and running in the other direction. But given that most game jam games are run on PC’s a quick fix using a Post Process Material can be justified: it is simple to set-up and can make dramatic visual changes quickly.

There’s a fantastic write-up by [Clinton Crumpler on how he set-up his Kingwash Scene](http://80.lv/articles/clinton-crumpler-king-wash-laundromat-scene-production/). At the end he details his process for using Post Processing, mainly through [Colour Grading](https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/ColorGrading/) and you can see the difference it makes:

[![](https://d3ar1piqh1oeli.cloudfront.net/c/c6/Image02.jpg/600px-Image02.jpg)](/index.php?title=File:Image02.jpg)

No Post Processing

[![](https://d3ar1piqh1oeli.cloudfront.net/d/db/Image01.jpg/600px-Image01.jpg)](/index.php?title=File:Image01.jpg)

With Post Processing

  
As Clinton mentions, CLUTs are a simple way to make colour/saturation/contrast adjustments. I expanded out on the [docs](https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/ColorGrading/) and wrote up a [small tutorial on how to set them up and use them](https://jesshiderue4.wordpress.com/materials/colour-grading-using-a-colour-lookup-table/).

Another great Post Processing technique to use is Depth of Field. If your game level is floating mid-screen, using DOF to focus on the level, and blur out the rest, can save on asset creation for backgrounds.

[![](https://d3ar1piqh1oeli.cloudfront.net/7/7d/Image04.png/600px-Image04.png)](/index.php?title=File:Image04.png)

May #UE4 Game Jam Winner - What’s up, block? By Graeme Little

  

### Add some Ambient Animation

You can quickly add some animation to trees, flowers and other environment assets through changing the World Position Offset on a Material. Some simple movement can really make an environment come to life; April’s Game Jam Winner, [Grabbity](https://www.youtube.com/watch?v=6tRZio0i7jo) made great use of WPO on their flowers and grass!

It’s worth downloading the Content Examples from the Launcher and looking at the Math Hall and Material Nodes maps, there are great examples of how to make Materials move in different ways.

### Change up the Default Cloud Texture

Using the default skybox is always handy as you can swiftly change the time of day and lighting at the same time. One quick way to help make it look more unique is to change the cloud texture, found here:

Engine Content → EngineSky → T\_Sky\_Clouds\_M

I’d recommend using the default texture as a base to paint over, as it gives even cloud distribution. Once finished simply save over the texture, or change the textures in M\_Sky\_Panning\_Clouds2 highlighted below and it’ll be replicated across the skybox.

[![](https://d3ar1piqh1oeli.cloudfront.net/b/b8/Image03.png/600px-Image03.png)](/index.php?title=File:Image03.png)

Change the textures in the highlighted TextureSamples to you custom cloud texture.

  

### The Foliage Brush is your Friend

Need to add a bunch of Static Meshes to your scene quickly? Load them into the [Foliage tool](https://docs.unrealengine.com/latest/INT/Engine/Foliage/) and paint away! In this [article](http://80.lv/articles/timothy-dries-ruins-in-ue4/), Timothy Dries talks through the creation of his Forest Ruin and how he used the Foliage brush for both his grass and bricks.

[![Toptip7.jpg](https://d3ar1piqh1oeli.cloudfront.net/6/6e/Toptip7.jpg/600px-Toptip7.jpg)](/index.php?title=File:Toptip7.jpg)

  

Another quick note, if you change "Align Max Angle" and "Ground Slope Angle Max" to 180, this lets you paint on any angle (including the roof!) - perfect for painting stars on a skybox or mould on the ceiling.

Video Tutorials
---------------

### Mathew Wadstein

[Game Jam - Tips and Tricks Tutorial Series](https://www.youtube.com/playlist?list=PLSlkDq2rO1t7_IV8zwwfBml2DYnVfoSwY)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Top\_Tips\_for\_Game\_Jams&oldid=707](https://wiki.unrealengine.com/index.php?title=Top_Tips_for_Game_Jams&oldid=707)"