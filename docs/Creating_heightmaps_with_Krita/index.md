Creating heightmaps with Krita - Epic Wiki                    

Creating heightmaps with Krita
==============================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

Contents
--------

*   [1 Create a New Document](#Create_a_New_Document)
*   [2 Interface](#Interface)
*   [3 Painting](#Painting)
*   [4 Saving](#Saving)
*   [5 Importing into Unreal Editor 4](#Importing_into_Unreal_Editor_4)
*   [6 Previewing Changes in Unreal Editor 4](#Previewing_Changes_in_Unreal_Editor_4)

Create a New Document
---------------------

Create a new document in Krita. The dimensions of the image should match one of the **Overall size (vertices)** of UE4’s [Recommended Landscape Sizes](https://docs.unrealengine.com/latest/INT/Engine/Landscape/Creation/index.html#recommendedlandscapesizes).

Set the **Model** to _Grayscale_, **Depth** to _16 Bits_, and **Profile** to “_gray built-in_”.

[![Krita New File.PNG](https://d26ilriwvtzlb.cloudfront.net/3/3d/Krita_New_File.PNG)](/File:Krita_New_File.PNG)

Click the bar next to **Canvas Color** and set the **Value** field to _128_. This will make the background color of the image equal to the default actor’s height in UE4 (Z=0). Click the **Add to Custom Colors** button so you can easily access this important color value.

[![2 Canvas Color.PNG](https://d26ilriwvtzlb.cloudfront.net/b/b8/2_Canvas_Color.PNG)](/File:2_Canvas_Color.PNG)

Interface
---------

Change the color selector to make it easier to select finer shades of gray. Click the wrench under **Advanced Color Selector**.

[![3 Advanced Color Selector.PNG](https://d26ilriwvtzlb.cloudfront.net/f/f7/3_Advanced_Color_Selector.PNG)](/File:3_Advanced_Color_Selector.PNG)

Update your settings to match the following screenshots. Under **Zoom selectors**, the **zoom to size** should be set to a large value. On my 1920x1080 monitor, I’ve set the value to _600px_.

[![4 Color Selector.PNG](https://d26ilriwvtzlb.cloudfront.net/7/78/4_Color_Selector.PNG)](/File:4_Color_Selector.PNG)

Change the settings to match the **Shade Selector** tab as well.

[![5 Shade Selector.PNG](https://d26ilriwvtzlb.cloudfront.net/5/59/5_Shade_Selector.PNG)](/File:5_Shade_Selector.PNG)

Now when you hover the mouse over the gray cross, a larger version will appear. Hover your mouse over the center of that larger cross and you’ll be able to select subtle variations of the currently selected color.

Next click on the **Layers** tab which may be hidden behind the **Brush Presets** tab. Click the lock icon under _Layer 1_. This is your background, and it is good practice to make any changes to additional layers on top of it. Press the **Insert** key to add a new layer, or select _Paint Layer_ from the add layer drop-down icon.

Painting
--------

Lighter colors increase the height of the terrain, darker colors lower the terrain. Remember that the neutral gray color is equal to Z=0 in UE4. Black will be the bottom of a Grand Canyon and solid white the summit of Mt. Everest.

You want to use brushes that have _soft falloffs_ and _no noise_ unless you happen to be making unnatural cliffs or a field of volcanic glass.

You can quickly change the size of the brush using **\[** and **\]**.

If you find the changes to your canvas are so slight you cannot see them, change the layer you are editing to _Color Dodge_ or _Burn_. Just remember to change it back to _Normal_ before you save it.

Saving
------

_Krita will not warn or stop you from saving in a format where it cannot preserve layer information._ Specifically, if you save your file as a PNG for export to UE4 and exit Krita, you will have lost all the fancy data such as layers and strokes that are normally included in an image-editing file. For this reason it is recommended that you **Save** as a Krita file (.kra) and **Export** as a PNG.

When exporting, after choosing a filename and location, change **Save as type:** to _PNG image_ and click **Save**. Slide the **Compress** slider to _Fast_ and be sure **Interlacing** is unchecked.

Importing into Unreal Editor 4
------------------------------

In UE4, press **Shift-3** to open the Landscape editor. Assuming you don’t already have a landscape imported, select the **Import from File** radio button under the **New Landscape** section and select the PNG you exported. Further assuming you created an image that matches one of the recommended landscape sizes, all of the additional information will be correctly filled in. Optionally assign a material, _M\_Ground\_Gravel_ from the Starter Assets is a fine choice. Press the **Import** button.

Previewing Changes in Unreal Editor 4
-------------------------------------

You can preview changes you make in Krita by first saving your document as a PNG (and breaking the rule above). Then to preview, press CTRL-S to save, tab to UE4, undo the previous import with CTRL-Z, and clicking the import button. This can be automated with a simple script.

  
Started by: [User:Lbraud](/User:Lbraud "User:Lbraud")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_heightmaps\_with\_Krita&oldid=8255](https://wiki.unrealengine.com/index.php?title=Creating_heightmaps_with_Krita&oldid=8255)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)