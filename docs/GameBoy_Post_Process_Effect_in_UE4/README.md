 GameBoy Post Process Effect in UE4 - Epic Wiki             

 

GameBoy Post Process Effect in UE4
==================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Authored by: Alan Noon

  
[![Gameboy 1.png](https://d26ilriwvtzlb.cloudfront.net/9/9f/Gameboy_1.png)](/index.php?title=File:Gameboy_1.png)

Inspired by the the recent **[Game Boy Jam](http://jams.gamejolt.io/gbjam3)**, I thought it would be neat to experiment with some of Unreal 4′s post processing capabilities. Finally we have all of the power and flexibility we need to accurately recreate primitive LCD displays of the late 80′s!!!

  

The effect is pretty straight forward. First there’s there’s the iconic monochrome display, capable of a massive 4 different shades of sickly green. Second is the low res nature of the Game Boy’s screen. Third, I chose to add an outline effect in order to make things look more pixel art-y.

  

For the monochrome, olive toned display, we’ll use color grading in the Global Post Processing Volume.

  

The blocky, low res look and outline effects will be done by leveraging a couple of post process materials swiped from some of Epic’s Content Example projects.

  

As this tutorial assumes little to no prior UE4 experience, expect a boatload of screenshots.

  

OK, let’s walk through it together!

  

STEP 1: Create a New Project
----------------------------

First up, create a new project, making sure to check “include starter content” so you have something interesting to look at. Name your project. You should now see a simple scene consisting of a couple of chairs and a table on a slab, floating in heaven.

[![Gameboy 2.png](https://d26ilriwvtzlb.cloudfront.net/2/21/Gameboy_2.png)](/index.php?title=File:Gameboy_2.png)

Right click in the Asset Pane of the Content Browser and make a new folder to hold your content. I called mine “GBA” for some reason. (We’re actually going to mimic the GB.)

[![Gameboy 3.png](https://d26ilriwvtzlb.cloudfront.net/c/cb/Gameboy_3.png)](/index.php?title=File:Gameboy_3.png)

STEP 2: Color Grading
---------------------

Color grading is an extremely powerful way to control the final look of your scene. Fortunately, it is EXTREMELY easy, (and fun!) to do in UE4.

  

First of all, we’ll grab a screen shot of our original scene. PRNT SCRN will do, as will the Snipping Tool. In the image editing tool of your choice, (mine is Photoshop,) paste the screen grab into a new file.

  

When we do color grading, we’re going to take the default range of colors in our rendered frame and remap them into a new palette. This is done by way of a LUT, or Look Up Table. In our case, it’s a Color Look Up Table. We’re going crush the beauty of UE4′s renderer down into 4 colors of ick. So download and save the image from the link: **[LUT Texture Example](https://docs.unrealengine.com/latest/images/Engine/Rendering/PostProcessEffects/ColorGrading/RGBTable16x1.png)**, which will represent the full color, unadulterated spectrum. Load that into Photoshop and then Copy/Paste it into our project’s screen shot image. Anywhere will do really; placement is not important.

[![Gameboy 4.png](https://d26ilriwvtzlb.cloudfront.net/4/4d/Gameboy_4.png)](/index.php?title=File:Gameboy_4.png)

Now let’s mash down those colors! Using Photoshop’s Adjustment Layers, manipulate the image to your liking. I threw on a Posterize to bring the number of colors down, followed by Levels in order to make the blacks not so black, and then Hue/Saturation to impart that characteristic green hue, in that order.

[![Gameboy 5.png](https://d26ilriwvtzlb.cloudfront.net/7/71/Gameboy_5.png)](/index.php?title=File:Gameboy_5.png)

Once the screen shot of our table and chair scene looked suitably Game Boy-ey, I cropped the image to just the LUT portion of the image. Here are the Adjustment Layer settings I used and their effect, step by step:

  
**Original:**

[![Gameboy 6.png](https://d26ilriwvtzlb.cloudfront.net/a/ae/Gameboy_6.png)](/index.php?title=File:Gameboy_6.png)

**Posterize:**

[![Gameboy 7.png](https://d26ilriwvtzlb.cloudfront.net/a/a9/Gameboy_7.png)](/index.php?title=File:Gameboy_7.png)

**Levels:**

[![Gameboy 8.png](https://d26ilriwvtzlb.cloudfront.net/e/e5/Gameboy_8.png)](/index.php?title=File:Gameboy_8.png)

**Hue/Saturation:**

[![Gameboy 9.png](https://d26ilriwvtzlb.cloudfront.net/e/ee/Gameboy_9.png)](/index.php?title=File:Gameboy_9.png)  

Save that LUT strip out into a format that Unreal likes, and we’re good to go. (I use PNG.)

  

In UE4, select your GBA asset folder, then right click in the right hand pane of the Content Browser. Select “Import to /Game/GBA…” and browse to that LUT image we just saved.

[![Gameboy 10.png](https://d26ilriwvtzlb.cloudfront.net/6/62/Gameboy_10.png)](/index.php?title=File:Gameboy_10.png)

Double click the thumbnail that just appeared so we can edit one of the texture settings. From the LOD Group setting, choose “Color Lookup Table” and click the Save icon in the upper left.

[![Gameboy 11.png](https://d26ilriwvtzlb.cloudfront.net/f/f8/Gameboy_11.png)](/index.php?title=File:Gameboy_11.png)

In the upper righthand portion of the UE4 UI, we see the Scene Outliner. Scroll through that list and select “GlobalPostProcessVolume” Guess what? This controls all the fancy post process effects happening in our scene.

  

Below the Scene Outliner is the Details Panel, which displays the particulars of whatever actor we’ve selected in the Scene Outliner. Scroll down a bit to find the Scene Color group and you should see the Color Grading setting. From the Content Browser, we click and drag our Game Boy LUT over and drop it on the thumbnail that currently reads “None”.

[![Gameboy 12.png](https://d26ilriwvtzlb.cloudfront.net/d/de/Gameboy_12.png)](/index.php?title=File:Gameboy_12.png)

Press the Play button in the toolbar above the viewport, and BAM! We’re looking a lot more like 1998 portable gaming.

[![Gameboy 13.png](https://d26ilriwvtzlb.cloudfront.net/9/94/Gameboy_13.png)](/index.php?title=File:Gameboy_13.png)

  

STEP 3: Low Res
---------------

  

The Game Boy’s screen res was a whopping 160×144, so let’s downgrade our image some more. From here, I am going to refer to Alan Willard’s great tutorial on how to do just that.

  
<youtube>[https://www.youtube.com/watch?v=GLJC1qG3oK4](https://www.youtube.com/watch?v=GLJC1qG3oK4)</youtube>  

Assuming you followed along as you watched the video, you should have a good understanding of what the shader does and have a material instance of the 8 Bit Pixellize Post Process Material to boot. If not, here’s a neat trick:

  

_**PROTIP:** You can Select/Copy/Paste Material Graphs and share them via .txt files._

  

I’ve done just that for you, here: **[8Bit Pixellize\_Post\_Process\_Material](http://web.archive.org/web/20150305061202/http://alannoon.com:80/wp-content/uploads/8Bit-Pixellize_Post_Process_Material.txt)**. Save and then open that text file in a suitable text editor, CTRL+A to select all, and CTRL+C to copy. Now go back into UE4, right click in the Content Browser, create a new material and name it something logical such as “M\_Pixellize\_Post\_Process”

[![Gameboy 14.png](https://d26ilriwvtzlb.cloudfront.net/7/73/Gameboy_14.png)](/index.php?title=File:Gameboy_14.png)

Double click the material icon and the Material Editor will appear. Select the lone material node sitting there and then change the Material Domain to “Post Process” in the Details Panel on the lefthand side of the dialog.

[![Gameboy 15.png](https://d26ilriwvtzlb.cloudfront.net/0/0b/Gameboy_15.png)](/index.php?title=File:Gameboy_15.png)

Now click anywhere in the graph view and CTRL+V to paste the contents of the pixellize text file from earlier. After a short pause, UE4 will rebuild the shader graph. Reposition nodes to taste. Now just wire the Color output of the Scene Texture node to the Emissive input of the master material node. Click the Save icon in the upper left of the Material Editor and close it.

[![Gameboy 16.png](https://d26ilriwvtzlb.cloudfront.net/6/6f/Gameboy_16.png)](/index.php?title=File:Gameboy_16.png)

Right click the material we just created in the Content Browser, and choose “Create Material Instance” Press ENTER to accept the name UE4 supplies for you. Right click the material instance and select “Save” This will create a optimized version of our post process material that only exposes the pixellation parameter, which will save us from having to monkey around in the graph of the master material should we want to change the low res look.

[![Gameboy 17.png](https://d26ilriwvtzlb.cloudfront.net/e/e4/Gameboy_17.png)](/index.php?title=File:Gameboy_17.png)

With the GlobalPostProcess actor selected in the Scene Outliner, go back to the Details Panel and scroll down to the “Misc” group where you should find the “Blendables” array, currently containing zero members. This is where we can add however many post process effects we would like in order to manipulate our final output. Press the “+” button. Now from the Content Browser, we’ll drag the material instance of the post process shader into the slot that was created in the Blendables Array.

[![Gameboy 18.png](https://d26ilriwvtzlb.cloudfront.net/1/13/Gameboy_18.png)](/index.php?title=File:Gameboy_18.png)

Press Play.

[![Gameboy 19.png](https://d26ilriwvtzlb.cloudfront.net/a/a9/Gameboy_19.png)](/index.php?title=File:Gameboy_19.png)

_EEEK!_ A bit too low res. Double click the material instance in the Content Browser. Click the triangle next to “Scalar Parameter” and the Pixellation setting should unfold. Tick the checkbox to enable editing of the field and set the value as desired. I chose 256.

[![Gameboy 20.png](https://d26ilriwvtzlb.cloudfront.net/c/c5/Gameboy_20.png)](/index.php?title=File:Gameboy_20.png)

That’s better!

  

STEP 4: Outline
---------------

  

By now this tutorial is running long, so I am going to take another shortcut and borrow some work from Epic’s Stylized Rendering Content Example, (available on the Content Marketplace!) put together by Kendall Tucker. I am also going to forgo screenshotting redundant UI operations as you can reference the basics up above. Switching to Expert Mode…

  

In the Stylized Rendering Project there’s a post process material that does an outline effect similar to what we want, though it contains a couple of features that aren’t suitable for our purposes here. So I’ve gone ahead and circumvented that stuff and hijacked the bits we do need. It’s a fairly complex material that I myself do not fully understand, so let’s skip the pesky details regarding exactly how it works and jump to the final result: **[Outline\_Post\_Process\_Material](http://alannoon.com/wp-content/uploads/Outline_Post_Process_Material.txt)**. You know the routine: Save/Open/CTRL+A/CTRL+C to grab the contents of the material.

  

In UE4, right click the content browser and make a new material. Name it. Double click the icon. In the Material Editor Graph, select the material node. In the Details Panel of the Material Editor, change the Material Domain to “Post Process” Click anywhere in the graph view and CTRL+V to paste the contents of the text file in. Wait just a sec, and the graph will be recreated. Drag off of the pin on the right most Lerp node and connect it to “Emissive” on the head material node.

[![Gameboy 21.png](https://d26ilriwvtzlb.cloudfront.net/1/1c/Gameboy_21.png)](/index.php?title=File:Gameboy_21.png)

Click Save. Zoom out with the mouse wheel and you should have something that looks like this:

[![Gameboy 22.png](https://d26ilriwvtzlb.cloudfront.net/3/32/Gameboy_22.png)](/index.php?title=File:Gameboy_22.png)

Close the Material Editor and right click the material we just made and create a material instance of it. Save it.

  

With GlobalPostProcess selected in the Scene Outliner, drop down to the Details Panel and scrolll back down to the Blendables Array in the Misc Group. Click the “+” to add another Blendable to the array, and drag M\_Outline\_Post\_Process\_Inst to the new slot. Press Play.

[![Gameboy 23.png](https://d26ilriwvtzlb.cloudfront.net/0/03/Gameboy_23.png)](/index.php?title=File:Gameboy_23.png)

That’s it!

  

STEP 5: Tweaking
----------------

  

There are all sorts of goodies in the Detail Panel of the Global Post Process Volume, so I encourage you to experiment in there and find some settings you like. For example, I prefer a little more life in my scene so I turned on Grain. YMMV.

  

I felt our outline was probably too dark, so I went ahead and opened the outline post process material instance to tune the outline color. (I eyeballed 0.070811, 0.095, 0.033771) You can also play with the outline thickness.

  

Tweak out the LUT in Photoshop to tune the colors. I ended up desaturating mine beyond the initial values listed above. Try reducing the levels of Posterization to make the scene even harsher looking.

  

Further Work
------------

  

*   Fixing reflections. You may notice that the outline is not working in the floor plane reflection. I’ll have to look into that.**UPDATE!!!** Outline reflection has been fixed
*   Dithering. It would be fun to come up with another post process material to dither the image, adding to that retro feel.
*   Motion Blur. The Game Boy was notorious for the amount of blurring that occurred on moving objects. It would be worth trying to duplicate that effect for maximum authenticity.
*   Wrap head around how the Outline Shader works.

  

Conclusion
----------

  

I hope you enjoyed this tutorial as much as I did making it. With luck, you learned something new and saw how easy it is to dramatically alter the final look of your projects with the post processing features of UE4. Thanks!

UPDATE!!! Game Boy Post Process Effect in UE4 Outline Reflections Fixed
-----------------------------------------------------------------------

  
[![Gameboy 24.png](https://d26ilriwvtzlb.cloudfront.net/e/e7/Gameboy_24.png)](/index.php?title=File:Gameboy_24.png)

In attempting to recreate the look of the Game Boy, I added an outline effect, which looked pretty good, save for one very noticeable issue: the outline was not being rendered into the reflection on the floor. Turns out, the fix is super simple!

Basically, the outline effect was being applied to the scene AFTER reflections were being calculated. The reflection feature had no knowledge of the outline and therefore did not know to render it. We just need to change the order in which the effect is applied to the scene and everything should be happy. This is done at the material level. Let’s check it out…

Open up the project you created previously, and in the Content Browser, double click the master outline post process material we created in order to open it in the material editor.

[![Gameboy 25.png](https://d26ilriwvtzlb.cloudfront.net/8/86/Gameboy_25.png)](/index.php?title=File:Gameboy_25.png)

Select the head node in the graph view, and scroll down in the details panel on the left hand side of the Material Editor dialog. Find the Post Process Material group and we see the setting for “Blendable Location” This is where we control at which point in the post process chain this effect will be applied.

  

There are three options here: After Tonemapping, Before Tonemapping, After Translucency.

  

The Tonemapping process determines the final color of the scene. Reflections are calculated after that. (Makes sense, right? You want your reflections to match the rest of the scene, don’t ya?) So what we want to do is pick “Before Tonemapping” for our outline material, so that by the time the reflection system does its thing, it sees the outline.

[![Gameboy 26.png](https://d26ilriwvtzlb.cloudfront.net/0/01/Gameboy_26.png)](/index.php?title=File:Gameboy_26.png)

So make that change, save the material with the button in the upper left, and close the Material Editor.

  

Press Play, and Viola! Outlined reflections!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=GameBoy\_Post\_Process\_Effect\_in\_UE4&oldid=519](https://wiki.unrealengine.com/index.php?title=GameBoy_Post_Process_Effect_in_UE4&oldid=519)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Epic Created Content](/index.php?title=Category:Epic_Created_Content "Category:Epic Created Content")