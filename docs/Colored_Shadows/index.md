Colored Shadows - Epic Wiki                    

Colored Shadows
===============

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:(please verify)

Contents
--------

*   [1 **Colored Transluscent Shadows for Stained Glass**](#Colored_Transluscent_Shadows_for_Stained_Glass)
*   [2 **Setting up the material**](#Setting_up_the_material)
*   [3 **Making use of the material**](#Making_use_of_the_material)
*   [4 **Using this effect in combination with other assets**](#Using_this_effect_in_combination_with_other_assets)
*   [5 **Dynamically Faked Colored Shadow starting point in Provided Scene**](#Dynamically_Faked_Colored_Shadow_starting_point_in_Provided_Scene)

**Colored Transluscent Shadows for Stained Glass**
--------------------------------------------------

  

  
**Documentation:** **[https://docs.unrealengine.com/latest/INT/Engine/Rendering/LightingAndShadows/Lightmass/index.html](https://docs.unrealengine.com/latest/INT/Engine/Rendering/LightingAndShadows/Lightmass/index.html)**

  
**You can download the Individual image pack and the project used in this example below:**

**[Image Pack](https://www.dropbox.com/s/hg3slkvnf8gxmr6/StainedGlass_Source_Images.zip?dl=0)**

[**Colored Shadow Tutorial Project**](https://www.dropbox.com/s/fdqk2ah8t22rdym/StainedGlassTutorial.zip?dl=0)  

  
The goal with this project is to replicate something similar to this from the linked documentation.  

We’ll go through the process of creating unlit version since this is the most practical and visibly noticeable.  

[![](https://d26ilriwvtzlb.cloudfront.net/0/04/Stained_Glass.png)](/File:Stained_Glass.png)

Stained Glass from Documentation

  

**Setting up the material**
---------------------------

First we’ll want to import our material that we will use for our Colored Transluscent Shadow.

Once you’ve imported the materials you will want to create a new material based and set it up like so:  

  
**Unlit Material Setup:**

  
**Set Blend Mode:** Modulate  
**(Optional):** Check Two Sided (Best for single planes)  
**Translucency:** Uncheck Enable Separate Translucency

  

[![Unlit Mat Setup.png](https://d26ilriwvtzlb.cloudfront.net/4/48/Unlit_Mat_Setup.png)](/File:Unlit_Mat_Setup.png)

  

**Making use of the material**
------------------------------

Now that our materials are setup we can apply these to a single plane mesh and setup our lighting to render a Colored Translucent Shadow.  

![Note](https://d26ilriwvtzlb.cloudfront.net/b/b3/Icon_template_warning1.png) It is important to remember that Translucent Colored Shadows will ONLY work with lighting set to STATIC.

  

[![Unlit Colored Shadow.png](https://d26ilriwvtzlb.cloudfront.net/5/53/Unlit_Colored_Shadow.png)](/File:Unlit_Colored_Shadow.png)

  

**Getting Better Resolutions:**  
Just like static lightmap shadows you’ll need to apply the same methodologies here as well. The higher resolution on the mesh receiving the cast shadow will give you better image results.  

**Here are two examples:**  

**Lightmap Resolution of the Floor Mesh set to 64**

  

[![CS LM Res 64.png](https://d26ilriwvtzlb.cloudfront.net/5/5f/CS_LM_Res_64.png)](/File:CS_LM_Res_64.png)

  

**Lightmap Resolution of the Floor Mesh set to 1024**

  

[![CS LM Res 1024.png](https://d26ilriwvtzlb.cloudfront.net/9/93/CS_LM_Res_1024.png)](/File:CS_LM_Res_1024.png)

  

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) With the higher resolution this is much more noticeable, the angle of your shadow casting static light will determine the sharpness of your Colored Translucent Shadow. The narrower the angle the more stretched and blurred your colored shadow will appear, as shown above. We have a sharper shadow closer to the plan than further away.

  

**Using this effect in combination with other assets**
------------------------------------------------------

  
Since we’re using an unlit material to drive our Colored Translucent Shadow we don’t have a way to use normal maps and get that amazing detail for our rippled effect for Stained glass.  

**Here is the target result:**

  

[![Faked CS Effect.png](https://d26ilriwvtzlb.cloudfront.net/2/28/Faked_CS_Effect.png)](/File:Faked_CS_Effect.png)

  

To achieve this affect we’re going to cheat a little bit.  
In total we’re going to place two planes with two separate materials.  
On the first plane we’ll set up our original unlit material to cast our Colored Translucent Shadow.  
We’ll place this in our scene where we want our window to be.  
Next we’ll create a new material that will be our lit material to represent our Stained glass and have a normal map setup.  

**Here is the material setup:**

  

[![Lit Mat Setup.jpg](https://d26ilriwvtzlb.cloudfront.net/9/9c/Lit_Mat_Setup.jpg)](/File:Lit_Mat_Setup.jpg)

  

We’ll place this material on our second plane.  
Place both these planes together or at least close together.  
In the settings for our unlit material plane that will cast our Colored Translucent Shadow we’ll need to set it up so that it doesn't appear in game, but still cast our colored shadow.  
In the details panel make sure to uncheck “Actor Hidden in Game” so that it does not render.  
We’ll next need to change our settings for our Lit material plane.  
Make sure to uncheck cast shadows in the details panel.  
This setup will allow us to have a lit material that does not cast shadow but that we can adjust the settings via our material itself. By setting up the opacity and the emissive power as a parameter we can adjust how translucent our material is and how bright the material is to get our desired result.

  

  
I hope you’ve enjoyed this short tutorial!

**Dynamically Faked Colored Shadow starting point in Provided Scene**
---------------------------------------------------------------------

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) In the example scene provided there is a setup for a dynamically faked version of colored shadows using 3 light function (one for each color channel, RGB). The start of using Blueprints to get the position of the sun and move the shadow along with the light is there. I will get more up on the wiki with the start of the setup for this. It's not finalized and will probably require tweaking to get perfect.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Colored\_Shadows&oldid=9360](https://wiki.unrealengine.com/index.php?title=Colored_Shadows&oldid=9360)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Material](/Category:Material "Category:Material")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)