Vue Series - Terrains to UE4 - Epic Wiki                    

Vue Series - Terrains to UE4
============================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:All

[![Vue Series of tutorials - UE4 Terrains1.png](https://d26ilriwvtzlb.cloudfront.net/f/f8/Vue_Series_of_tutorials_-_UE4_Terrains1.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains1.png)

Welcome to the first part in my Vue Series of tutorials.

In this guide we'll cover;

\* Setting up a basic terrain generation in e-on software's Vue xStream
\* Exporting landscapes from Vue as either heightmap (Heightfield) or OBJ mesh
\* And finally importing it into Unreal Engine 4.
\* Working with weightmaps for texturing will be covered in the next tutorial.

Let's assume you already have _some_ working knowledge of Vue.

xStream edition is not critical, but this is the version I will be using for this tutorial.

The different Landscape Visualization editions can be found over on the E-on software website:

*   [Landscape Visualization with e-on software](http://www.e-onsoftware.com/products/solutions/?page=6)

VUE Pioneer 2015 is now free for non-commercial use, but carries a watermark on Rendered images.

This may not include exported heightmaps or models, but Render watermarks can be removed by purchasing the RenderUp module for about $69USD [Modules for VUE 2015 - RenderUp on cornucopia3d](http://www.cornucopia3d.com/products/vue/vue_2015_modules/?page=renderup)

* * *

This tutorial should apply to any Vue version from about 7 and up.

Start
=====

To start, open your version of Vue to a new scene.

[![Vue Series of tutorials - UE4 Terrains1c.png](https://d26ilriwvtzlb.cloudfront.net/4/40/Vue_Series_of_tutorials_-_UE4_Terrains1c.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains1c.png)

Section A
=========

#### Step A1

On the left hand toolbar, **LEFT CLICK** the terrain button. This should create a default "mountain" terrain that is auto-generated inside your Vue scene.

For the sake of time, we'll leave this auto-generated terrain as-is.

[![Vue Series of tutorials - UE4 Terrains2.png](https://d26ilriwvtzlb.cloudfront.net/3/31/Vue_Series_of_tutorials_-_UE4_Terrains2.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains2.png)

#### Step A2

Double click this terrain in one of the Perspective views, or right click the newly created Terrain in the Layers panel, and choose "Edit Object".

[![Vue Series of tutorials - UE4 Terrains3.png](https://d26ilriwvtzlb.cloudfront.net/c/cc/Vue_Series_of_tutorials_-_UE4_Terrains3.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains3.png)

[![Vue Series of tutorials - UE4 Terrains4.png](https://d26ilriwvtzlb.cloudfront.net/2/21/Vue_Series_of_tutorials_-_UE4_Terrains4.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains4.png)

Section B
=========

Along the top toolbar inside the Terrain Editor, look for the "2x" button to "double the terrain resolution"

[![Vue Series of tutorials - UE4 Terrains5.png](https://d26ilriwvtzlb.cloudfront.net/e/e7/Vue_Series_of_tutorials_-_UE4_Terrains5.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains5.png)

**IMPORTANT Note:**

The size (resolution) for the terrain is important and has distinct advantages and disadvantages based on the size.

The higher the resolution, the more 'detailed' the terrain will be, at a great cost to rendering performance, editing performance and final in-game performance.

Inversely, low resolution terrains will lead to bad terracing on the exported terrain, and within the Vue editor. You should avoid going below 512x512 unless you know exactly what you are doing and why.

For more info about the Scale in UE4, read the top section of [WM to UE4: In-Depth Guide](/World_Machine_to_Unreal_Engine_4_-_In_Depth_Guide#A_Few_Notes_About_Scale "World Machine to Unreal Engine 4 - In Depth Guide")

Even though this guide is fairly different because the options in Vue are vastly different to World Machine, the scale theory still applies.

Using 1 meter = 1 Pixel ratio, the default Vue terrain of 256x256 (before pressing 2x) will be 255 meters squared in UE4.

After pressing 2x, the terrain should then be 512x512, or 511 meters squared.

#### Step B1

**Press 2x ONCE now**.

Section C
=========

Your terrain should auto update to the higher resolution in both the Terrain editor, and in the (background) scene in Vue.

The features of the landscape terrain itself shouldn't change, but Vue will "smooth" the terrain based on the new sub-division.

Be wary of this before painting, because if you paint in the default 256x256 size, and then sub-divide, Vue will smooth out what you have just painted, and you might lose detail(s).

Sub-divide first, then paint.

Section D
=========

Now that we have a terrain we're happy with, we have 2 choices;

Exporting as a heightmap (Heightfield)
--------------------------------------

Just a quick factoid, the official term for a _**Terrain** Heightmap_ is technically **"Heightfield"**.

This term is used to denote the difference between a (**always** black & white) _Texture Heightmap_ and a map that defines the topography of a terrain (not always black and white).

#### Step D1

Press the "Export Terrain" button at the bottom right of the Terrain Editor

There are several options here, but we're going to ignore most of them for now.

[![Vue Series of tutorials - UE4 Terrains6.png](https://d26ilriwvtzlb.cloudfront.net/3/3d/Vue_Series_of_tutorials_-_UE4_Terrains6.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains6.png)

#### Step D2

Next to the default name of "Terrain.3ds" press **Browse**

[![Vue Series of tutorials - UE4 Terrains7.png](https://d26ilriwvtzlb.cloudfront.net/6/65/Vue_Series_of_tutorials_-_UE4_Terrains7.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains7.png)

#### Step D3

Select **PNG (\*.png)** from the "_Save as Type_" drop down list.

[![Vue Series of tutorials - UE4 Terrains8b.png](https://d26ilriwvtzlb.cloudfront.net/a/a8/Vue_Series_of_tutorials_-_UE4_Terrains8b.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains8b.png)

#### Step D4

Give your Terrain a descriptive name, don't just call it "Terrain". You should also probably put the resolution you used in the actual name. Something like, _**Mountain\_Terrain\_512\_v1.png**_

For this tutorial we'll save the file to the Vue/Terrains folder, but you can save this anywhere you like.

#### Step D5

Press **Save**

Vue hasn't actually exported anything yet, we're just "saving" a location to be exported to.

After pressing **Save**, you're presented with a couple of PNG output options;

**CRITICAL**: Move the slider all the way up to **"100%" (High)**.

[![Vue Series of tutorials - UE4 Terrains15.png](https://d26ilriwvtzlb.cloudfront.net/2/20/Vue_Series_of_tutorials_-_UE4_Terrains15.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains15.png)

#### Step D6

Make sure you have UNCHECKED "Generate Material maps"

We'll be covering this in the next tutorial: [Vue Series - Weightmaps to UE4](/index.php?title=Vue_Series_-_Weightmaps_to_UE4&action=edit&redlink=1 "Vue Series - Weightmaps to UE4 (page does not exist)")

Also note that "Mesh resolution" only applies to certain meshes, it has no effect on Heightfields.

[![Vue Series of tutorials - UE4 Terrains12.png](https://d26ilriwvtzlb.cloudfront.net/2/27/Vue_Series_of_tutorials_-_UE4_Terrains12.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains12.png)

#### Step D7

Press _**OK**_ on the Terrain Export Options window.

#### Step D8

Unfortuantely, Vue cannot export greyscale PNG's, which is a problem for importing into UE4 and will have undsired results.

[![Vue Series of tutorials - UE4 Terrains17.png](https://d26ilriwvtzlb.cloudfront.net/8/8b/Vue_Series_of_tutorials_-_UE4_Terrains17.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains17.png)

You will need to convert the Indexed RBG .png into a Greyscale PNG before importing into UE4.

This can be done in any decent image editing program like Photoshop, Gimp, Corel etc.

Another unfortunate fact is you cannot convert to greyscale in Paint.NET or MS Paint.

### Convert to greyscale in Gimp

**1.** Duplicate the original image (Ctrl+D)

**2.** Right-click on the copy. Select _Image_ -> _Mode_ -> **Grayscale**.

**3.** Then we need to convert the PNG to **16bit depth**. Again, select _Image_ -> _Mode_ -> **Indexed**.

It is important to note that **"Greyscale"** is not the same as "_Desaturate_".

If you use Desaturate, the image will most likely still be saved as RGB, and also there may be more noise in a desaturated RGB image, compared to a Greyscale image.

More info on this over at: [gimp.org](http://www.gimp.org/tutorials/Color2BW)

**4.** Save the image from Gimp and continue to [Section E](#Section_E_.28Heightfield_based_terrain.29).

**NOTE:** If you don't save as _16bit_, when you import into UE4, you'll get a message like this;

[![Vue Series of tutorials - UE4 Terrains14a.png](https://d26ilriwvtzlb.cloudfront.net/e/e5/Vue_Series_of_tutorials_-_UE4_Terrains14a.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains14a.png)

Epic aren't messing around here! Not only is the terrain lower quality, but has _unexpected_ and _undesired_ results.

If you receive this message, press _OK_, then immediately delete the terrain, go back to Photoshop or Gimp, and make sure you change & save the **PNG** as **16-bit**.

### Convert to greyscale in Photoshop

Photoshop doesn't require you to duplicate the image to convert to greyscale.

Other than that, the process is quite similar to Gimp.

**1.** Open your exported PNG in Photoshop

**2.** Go to the _Image_ menu -> _Mode_ -> _Greyscale_

*   Photoshop may ask you: "Discard color information?", this is not important as our source image is already black and white (just saved in a RGB format)

[![Vue Series of tutorials - UE4 Terrains19.png](https://d26ilriwvtzlb.cloudfront.net/2/2c/Vue_Series_of_tutorials_-_UE4_Terrains19.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains19.png)

**3.** Press "OK" to 'discard color information

**4.** Go back to the _Image_ menu -> _Mode_ -> and choose **16 Bits/Channel**.

[![Vue Series of tutorials - UE4 Terrains21.png](https://d26ilriwvtzlb.cloudfront.net/7/7e/Vue_Series_of_tutorials_-_UE4_Terrains21.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains21.png)

You should now see in the title bar "Myimage.png @ 100% (Gray/16)\*

**5.** Save this image as either a new copy, or overwrite the original exported file.

You should now have successfully exported your _heightfield_ to a PNG image ready for importing into UE4.

[![Mountain Terrain 512 v1.png](https://d26ilriwvtzlb.cloudfront.net/c/c4/Mountain_Terrain_512_v1.png)](/File:Mountain_Terrain_512_v1.png)

Continue to [Section E](#Section_E_.28Heightfield_based_terrain.29_.28Heightfield_based_terrain.29) to begin importing your PNG heightfield into UE4.

**TGA Note**: If you incorrectly chose Targa (\*.tga) as the export format, you will get a message saying something like;

Vue can export Targa pictures that are altitude maps coded with a 16 bit resolution for improved details (Red is high order byte, green is the lower order byte). Should this file be saved as a 16 bit altitude map?

[![Vue Series of tutorials - UE4 Terrains10.png](https://d26ilriwvtzlb.cloudfront.net/e/e7/Vue_Series_of_tutorials_-_UE4_Terrains10.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains10.png)

The "altitude maps" that are mentioned in the previous message are exactly why there is a both a name and end-result difference between a _"Height**MAP**"_ and a _"Height**FIELD**"_, but UE4 makes no such distinction. That's doesn't mean you shouldn't though!

Exporting as an OBJ mesh
------------------------

**IMPORTANT NOTE:**

This method is a more advanced option, and should only be considered for exportation of Terrains that you want to be a mesh object in UE4 instead of the built in "Terrain" feature of UE4. (This will most likely give you less control in UE4 and could severely hurt cooking performance!).

Exporting in multiple mesh formats is supported, but we're going to use OBJ here for ease of importing into UE4.

Other formats like .3ds or .c4d are useful if you are going to further edit the mesh in 3DS MAX or Cinema4D.

#### Step D1b (OBJ)

Instead of exporting from the Terrain Editor, we're going to **Export Object** (the terrain) from the **File menu**.

This is necessary to add/preserve smoothing groups in the mesh. (Not working though?)

TODO: Why is smoothing not working?

[![Vue Series of tutorials - UE4 Terrains11d.png](https://d26ilriwvtzlb.cloudfront.net/0/00/Vue_Series_of_tutorials_-_UE4_Terrains11d.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains11d.png)

#### Step D2b (OBJ)

Select **Wavefront OBJ export (\*.obj)** from the "_File Format_" drop down list.

#### Step D3b (OBJ)

If you have Vue Infinite or xStream, you can crank up the resolution, but be warned, even a small to medium sized terrain (our 512x512 example) at 100% resolution will create an OBJ 17mb in size, and have approximately 264,000 polys / 132,000 vertices.

[![Vue Series of tutorials - UE4 Terrains11e.png](https://d26ilriwvtzlb.cloudfront.net/7/7c/Vue_Series_of_tutorials_-_UE4_Terrains11e.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains11e.png)

For small terrains like our example, we'll use 100% to max out the resolution of the terrain due to it's reasonably small size.

For larger terrains however, there is a trick with the slider in the Mesh Resolution section;

If you slide it all the way up to 100%, then very gently slide back 1 pixel/unit of the slider, you will notice a significant jump between the size/polys/verts of 100% and 99%. Something in the range of 50% less or greater.
As it currently stands, I can't fully explain this, and through researching I haven't been able to get a straight forward answer.
My best guess is that it's an exponential component, so each % = a subdivision of the resolution to some decimal place.

**REMINDER:** This is an advanced option. Make sure you read the [IMPORTANT NOTE](#Exporting_as_an_OBJ_mesh) under Exporting as an OBJ mesh.

Cooking a 100% resolution, 264k poly terrain, even at 512x512, and even at "Medium" lighting with no other meshes in the scene could severely damage cooking times. Especially without a "Lightmap Importance Volume".

YOU HAVE BEEN WARNED! :)

#### Step D4b (OBJ)

Press _Browse_ and choose a target location and name for your OBJ terrain.

Give your Terrain a descriptive name, don't just call it "Terrain". You should also probably put the resolution you used in the actual name. Something like, _**Mountain\_Terrain\_512\_v1.obj**_

We'll save the file to the Vue/Terrains folder, but you can save this anywhere you like.

[![Vue Series of tutorials - UE4 Terrains11.png](https://d26ilriwvtzlb.cloudfront.net/c/c4/Vue_Series_of_tutorials_-_UE4_Terrains11.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains11.png)

Make sure you have UNCHECKED _Generate color maps_, _Generate bump maps_ and _Generate alpha maps_, as we won't be needing them at this point.

UE4 also makes it possible to skip this step completely, even if the terrain will be textured. (We'll cover this in a later tutorial) :)

#### Step D5b (OBJ)

Press **OK** to export your terrain.

[![Vue Series of tutorials - UE4 Terrains11e.png](https://d26ilriwvtzlb.cloudfront.net/7/7c/Vue_Series_of_tutorials_-_UE4_Terrains11e.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains11e.png)

You should now have successfully exported your terrain to an OBJ mesh ready for importing!

Skip ahead to [Section F](#Section_F_.28OBJ_based_terrain.29) to begin importing your OBJ Terrain into UE4.

Section E (Heightfield based terrain)
=====================================

#### Step E1

Open up your UE4 editor to a map of your choosing.

For this tutorial, I've made a new UE4 project, and included the Sample Content inside of it, and removed all of the static meshes that are default to this setup (the chairs and table, glass statue etc)

[![Vue Series of tutorials - UE4 Terrains13.png](https://d26ilriwvtzlb.cloudfront.net/2/2f/Vue_Series_of_tutorials_-_UE4_Terrains13.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains13.png)

#### Step E2

Select the _**"Landscape"**_ tab or alternatively press _**Shift + 3**_

[![Vue Series of tutorials - UE4 Terrains14.png](https://d26ilriwvtzlb.cloudfront.net/e/ec/Vue_Series_of_tutorials_-_UE4_Terrains14.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains14.png)

#### Step E3

Under the heading _"New landscape"_ press **"Import from File"**.

#### Step E4

Click the ellipsis (**...**) and browse to the PNG Heightfield you exported from [Section D](#Section_D).

[![Vue Series of tutorials - UE4 Terrains16.png](https://d26ilriwvtzlb.cloudfront.net/5/51/Vue_Series_of_tutorials_-_UE4_Terrains16.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains16.png)

#### Step E5

On the left hand panel, you should see some [![Vue Series of tutorials - UE4 Terrains XYZ.png](https://d26ilriwvtzlb.cloudfront.net/9/92/Vue_Series_of_tutorials_-_UE4_Terrains_XYZ.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains_XYZ.png) options for both Location and Scale.

We'll leave the "Location" fields alone.

Next to the Z in Scale, we'll need to do some trial and error to get this just right.

For this example tutorial, I first imported the terrain at Z:100 and this was too excessive.

I halved it, and tried Z:50, and was still too high.

Z:33 seemed to work ok for this example. It's not perfect but it should give you an idea.

[![Vue Series of tutorials - UE4 Terrains14c.png](https://d26ilriwvtzlb.cloudfront.net/a/a2/Vue_Series_of_tutorials_-_UE4_Terrains14c.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains14c.png)

Ideally, importing from Vue would most likely be around the Z:16-25 mark, but every terrain is different, and there's no harm in trying.

If you don't like it, delete the whole terrain, and go straight back to [Step E3](#Step_E3).

[![Vue Series of tutorials - UE4 Terrains22.png](https://d26ilriwvtzlb.cloudfront.net/5/58/Vue_Series_of_tutorials_-_UE4_Terrains22.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains22.png)

#### Step E6

Now press **Import** at the bottom of the Landscape panel and your new terrain should import.

[![Vue Series of tutorials - UE4 Terrains16b.png](https://d26ilriwvtzlb.cloudfront.net/7/7f/Vue_Series_of_tutorials_-_UE4_Terrains16b.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains16b.png)

Section F (OBJ based terrain)
=============================

Continuing from [Step D5b](#Step_D5b_.28OBJ.29).

#### Step F1

Open up your UE4 editor to a map of your choosing.

For this tutorial, I've made a new UE4 project, and included the Sample Content inside of it, and removed all of the static meshes that are default to this setup (the chairs and table, glass statue etc)

#### Step F2

In your content browser, or from the file menu, choose **Import**.

[![Vue Series of tutorials - UE4 Terrains11a.png](https://d26ilriwvtzlb.cloudfront.net/b/b2/Vue_Series_of_tutorials_-_UE4_Terrains11a.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains11a.png)

#### Step F3

Browse to the OBJ you exported from [Step D5b](#Step_D5b_.28OBJ.29).

[![Vue Series of tutorials - UE4 Terrains11b.png](https://d26ilriwvtzlb.cloudfront.net/6/6f/Vue_Series_of_tutorials_-_UE4_Terrains11b.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains11b.png)

#### Step F4

Upon import, you will be presented with "FBX Import Options" window.

You should change the "Roll" (X) to 90 to align the OBJ to it's correct upward facing orientation. This is caused by the way Vue exports objects, and what Vue see "XYZ" as.

[![Vue Series of tutorials - UE4 Terrains23a.png](https://d26ilriwvtzlb.cloudfront.net/9/90/Vue_Series_of_tutorials_-_UE4_Terrains23a.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains23a.png)

#### Step F5

Press **Import** to start importing the terrain.

For high density/quality terrains, this may take a few seconds or more.

Your OBJ should then pop into the Content Browser.

[![Vue Series of tutorials - UE4 Terrains23b.png](https://d26ilriwvtzlb.cloudfront.net/c/cd/Vue_Series_of_tutorials_-_UE4_Terrains23b.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains23b.png)

You may get a warning such as;

No smoothing group information was found in this FBX scene. Please make sure to enable the "Export Smoothing Groups" option in the FBX Exporter plug-in before exporting the file.

Even for tools that do not support smoothing groups, the FBX Exporter will generate appropriate smoothing data at export-time so that correct vertex normals can be inferred while importing.

I have yet to find the correct way to retain smoothing groups from Vue within the exported OBJ.

#### Step F5

Now simply drag and drop your Terrain Mesh into the 3D world in the editor, and your terrain should appear like so;

[![Vue Series of tutorials - UE4 Terrains23c.png](https://d26ilriwvtzlb.cloudfront.net/a/ad/Vue_Series_of_tutorials_-_UE4_Terrains23c.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains23c.png)

As you may have already noticed, the physical size is much smaller than if you imported a Heightfield of the same terrain. This is due to scaling within the model itself.

#### Step F6

On the right hand **Details** panel, with your Terrain mesh selected, press the Padlock icon next to **Scale**.

This will make sure scaling our terrain is uniform. You can safely turn off the lock at any time to scale the terrain in any direction, but it's best to keep it uniform.

With the scale X:1 Y:1 and Z:1 the terrain is quite small and not playable, unless you're project is after a miniture terrain look of course!

Change the values to something like X:10 Y:10 and Z:10 to increase the mesh scale by 10x.

[![Vue Series of tutorials - UE4 Terrains23d.png](https://d26ilriwvtzlb.cloudfront.net/2/24/Vue_Series_of_tutorials_-_UE4_Terrains23d.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains23d.png)

This should give you a much more believable terrain.

[![Vue Series of tutorials - UE4 Terrains23e.png](https://d26ilriwvtzlb.cloudfront.net/2/2a/Vue_Series_of_tutorials_-_UE4_Terrains23e.png)](/File:Vue_Series_of_tutorials_-_UE4_Terrains23e.png)

Done!
=====

We've now got our high quality VUE terrain inside UE4, ready to use!

In our next tutorial, we'll cover working with weightmaps to texture the terrain based on it's features.

(Coming soon!)

* * *

Tutorial stats:

Written for UE4 Wiki by [User:Jenkins](/User:Jenkins "User:Jenkins").

Time to write:

~12 hours including testing, trial and error

Software used:

Vue xStream 2014 (of course!), Photoshop CS6, MS Paint (for quick desktop screenshot saving) and MediaMonkey (to give me inspirational tunes while composing this tutorial), and last but not least, Unreal Engine 4.9.2!

Time to cook heightfield based terrain (with no other meshes or LightMap Importance Volume):

Mere seconds at "Preview", 20ish secs at "Medium"

Time to cook OBJ based terrain (with no other meshes or LightMap Importance Volume):

60mins+ at "Medium" build quality. (Cancelled after 55mins sitting at 80%)

My specs:

i5 3570K @ 3.8GHz | ASUS GTX660OC | 8GB Corsair Dominator Platinum RAM | Samsung 1TB SSD (where all assets, engine & software is stored)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Vue\_Series\_-\_Terrains\_to\_UE4&oldid=15919](https://wiki.unrealengine.com/index.php?title=Vue_Series_-_Terrains_to_UE4&oldid=15919)"

[Categories](/Special:Categories "Special:Categories"):

*   [Landscape](/Category:Landscape "Category:Landscape")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [User Created Content](/index.php?title=Category:User_Created_Content&action=edit&redlink=1 "Category:User Created Content (page does not exist)")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)