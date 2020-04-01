Landscape - World Machine perfect integration - Epic Wiki                    

Landscape - World Machine perfect integration
=============================================

**Rate this Article:**

3.67

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_half.gif)![](/extensions/VoteNY/images/star_off.gif) (3 votes)

Approved for Versions:(please verify)

This is a workflow guide to use the powerful World Machine terrain generator to create, edit and change your landscapes in Unreal Engine 4. It's mainly about setting up your projects and terrain generation to have a seamless import/export pipeline.

Let's get started!  

Contents
--------

*   [1 Create and edit a Landscape in Unreal](#Create_and_edit_a_Landscape_in_Unreal)
    *   [1.1 Creating the landscape](#Creating_the_landscape)
    *   [1.2 Exporting data](#Exporting_data)
*   [2 World Machine setup](#World_Machine_setup)
    *   [2.1 Bringing in your Heightmap](#Bringing_in_your_Heightmap)
    *   [2.2 Setting up your project](#Setting_up_your_project)
*   [3 World Machine editing](#World_Machine_editing)
    *   [3.1 Adding Nodes](#Adding_Nodes)
    *   [3.2 Masking your landscape](#Masking_your_landscape)

Create and edit a Landscape in Unreal
-------------------------------------

Start from a blank scene and press **SHIFT+3** . This will bring up Landscape Tool menu'.  

### Creating the landscape

I recommend to use ["recommended Landscape sizes"](https://docs.unrealengine.com/latest/INT/Engine/Landscape/Creation/index.html#recommendedlandscapesizes) as a starting point, it will lead to a cleaner pipeline. If you already have a layed out scene, try to create a landscape that embed all your features using the recommended sizes.  
  

[![Creating landscape](https://d3ar1piqh1oeli.cloudfront.net/4/4e/01.jpg/800px-01.jpg)](/File:01.jpg "Creating landscape")  
  

Edit it a little bit, again for the sake of the example, it will be good to reach the maximum extent of the landscape: sculpt until the mountain slope doesn't grow anymore and dig until you reach the lower limit. **WARNING : for scale Z=100 you've a range of -256m : +256m.**  
  

[![Creating landscape](https://d3ar1piqh1oeli.cloudfront.net/3/3f/02.jpg/800px-02.jpg)](/File:02.jpg "Creating landscape")  
  

Now, you should apply a Landscape material (you can use [Content Example - Landscape](https://docs.unrealengine.com/latest/INT/Resources/ContentExamples/Landscapes/1_1/index.html) to get how to do it). Keep it simple, you need only two layers for this step: one will be the area you want to be edited by World Machine, the other is an area where you want to mantain EXACTLY the same height you've in Unreal Engine. In my example, I want the RED area to be left unmodified by World Machine.  
  

[![Creating landscape](https://d3ar1piqh1oeli.cloudfront.net/f/fd/WM_03.jpg/800px-WM_03.jpg)](/File:WM_03.jpg "Creating landscape")  
  

### Exporting data

We're ready to export our data towards World Machine!  
Select "Sculpt" sub menu in Landscape Tool, RIGHT CLICK on Heightmap and select "Export to file". Export your .png file where you want it to be.  
  

[![Creating landscape](https://d3ar1piqh1oeli.cloudfront.net/b/b9/WM_04.jpg/800px-WM_04.jpg)](/File:WM_04.jpg "Creating landscape")  
  

Select "Paint" sub menu in Landscape Tool, RIGHT CLICK on the layer you want to export and select "Export to file". Export your .png file where you want it to be. Calling it "mask" or something like that it's a good idea.  
  

[![Creating landscape](https://d3ar1piqh1oeli.cloudfront.net/5/5d/WM_05.jpg/800px-WM_05.jpg)](/File:WM_05.jpg "Creating landscape")  
  

Now we've everything we need to use World Machine to bring some beauty into our landscape...  
  

World Machine setup
-------------------

You'll need to be very careful when setting up your project in World Machine: stick exactly to the measurement you've in Unreal and you'll be good to go. Project settings and Heightmap output resolutions should be adapted to your data, I'll continue with my example.

### Bringing in your Heightmap

Start World Machine and bring immediately a File Input node in your node network. Then open it and load you heightmap.png.  
Now it's time for some hardcore measurement party: in the width-height input field of "File Input" dialog put THE EXACT EXTENSION OF YOUR UE4 LANDSCAPE  
For me it's 505mx505m...  

[![Creating landscape](https://d3ar1piqh1oeli.cloudfront.net/1/19/WM_06.jpg/800px-WM_06.jpg)](/File:WM_06.jpg "Creating landscape")  
  
[![Creating landscape](https://d3ar1piqh1oeli.cloudfront.net/c/c4/WM_07.jpg/800px-WM_07.jpg)](/File:WM_07.jpg "Creating landscape")  
  

### Setting up your project

Then setup your project settings to match extensions and height of your UE4 landscape.  
Open "Project Settings" and modify extensions data under Render Extents and General Setup tabs.  
For me it's 505m under _"Location"_ in **"Render Extents"** tab and -256:+256 in _"Terrain Altitudes"_ in **"General Setup"**  
  

[![Creating landscape](https://d3ar1piqh1oeli.cloudfront.net/d/de/WM_08_a.jpg/800px-WM_08_a.jpg)](/File:WM_08_a.jpg "Creating landscape")  
  

If you think that from now on, exporting data via the output node will give you a perfect matching terrain in UE4, well, you're right.  
You can give it a shot by exporting this unchanged heightmap and creating a new landscape in Unreal4. It will match perfectly to what you've done!  
To try it, just RIGHT CLICK on the Height Output and select "Write output to file".  
  

World Machine editing
---------------------

TODO  
  

### Adding Nodes

TODO  
  

### Masking your landscape

TODO  
  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Landscape\_-\_World\_Machine\_perfect\_integration&oldid=15829](https://wiki.unrealengine.com/index.php?title=Landscape_-_World_Machine_perfect_integration&oldid=15829)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Landscape](/Category:Landscape "Category:Landscape")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)