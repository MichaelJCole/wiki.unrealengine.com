Workflow: MakeHuman and Blender - Epic Wiki                    

Workflow: MakeHuman and Blender
===============================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (2 votes)

Approved for Versions:(please verify)

Contents
--------

*   [1 Workflow: MakeHuman, Blender, UE4 - Rigging and Animation](#Workflow:_MakeHuman.2C_Blender.2C_UE4_-_Rigging_and_Animation)
    *   [1.1 Introduction](#Introduction)
    *   [1.2 Prerequisites](#Prerequisites)
        *   [1.2.1 bvhacker](#bvhacker)
        *   [1.2.2 Motion Captures](#Motion_Captures)
        *   [1.2.3 MakeHuman](#MakeHuman)
        *   [1.2.4 Autodesk FBX Converter](#Autodesk_FBX_Converter)
        *   [1.2.5 Blender 2.7](#Blender_2.7)
        *   [1.2.6 Blender IO-FBX](#Blender_IO-FBX)
        *   [1.2.7 Setting up Blender](#Setting_up_Blender)
    *   [1.3 Create character in MakeHuman](#Create_character_in_MakeHuman)
    *   [1.4 Import character in Blender](#Import_character_in_Blender)
    *   [1.5 Add animation to character](#Add_animation_to_character)
    *   [1.6 Export from Blender to UE4](#Export_from_Blender_to_UE4)
        *   [1.6.1 MHX to FBX export](#MHX_to_FBX_export)
        *   [1.6.2 Import to UE4](#Import_to_UE4)
        *   [1.6.3 Texturing your character](#Texturing_your_character)

  

Workflow: MakeHuman, Blender, UE4 - Rigging and Animation
=========================================================

Introduction
------------

This tutorial will show you how you can make a character in MakeHuman, export it to Blender, add an animation to it and import it into UE4. The tutorial is based on KingBadger3d's great YouTube tutorial ([http://www.youtube.com/user/KingBadger3d/videos](http://www.youtube.com/user/KingBadger3d/videos)). This tutorial tries at using Open Source Software where possible.

Prerequisites
-------------

We need a few programs to work with.

### bvhacker

URL: [http://davedub.co.uk/bvhacker/index.html](http://davedub.co.uk/bvhacker/index.html) Used to modify \*.bvh motion capture files. You can use it to realign animations and get rid of root motion. You can use blender for this, too: [https://forums.unrealengine.com/showthread.php?11313-Getting-rid-of-Root-Motion](https://forums.unrealengine.com/showthread.php?11313-Getting-rid-of-Root-Motion)

### Motion Captures

You can get free motion captures from e.g.: - [http://accad.osu.edu/research/mocap/mocap\_data.htm](http://accad.osu.edu/research/mocap/mocap_data.htm)

### MakeHuman

URL: [http://www.makehuman.org](http://www.makehuman.org) Used to create human characters, including rigs. Don't forget to download the Blender Tools, too!

### Autodesk FBX Converter

URL: [http://usa.autodesk.com/adsk/servlet/pc/item?siteID=123112&id=22694909](http://usa.autodesk.com/adsk/servlet/pc/item?siteID=123112&id=22694909) Used to convert ASCII-FBX files to Binary FBX files (may not be needed with Blender 2.71 anymore).

### Blender 2.7

URL: [http://www.blender.org/](http://www.blender.org/)

### Blender IO-FBX

Most likely not needed for Blender 2.71 URL: [https://github.com/mont29/blender-io-fbx/commits/master](https://github.com/mont29/blender-io-fbx/commits/master) Installation: DELETE "C:\\Program Files\\Blender Foundation\\Blender\\2.70\\scripts\\addons\\io\_scene\_fbx", then copy the folder from github there.

### Setting up Blender

\- Unzip blendertools-1.x.x-all.zip to "C:\\Users\\USER\\AppData\\Roaming\\Blender Foundation\\Blender\\2.70\\scripts\\addons" - Open Blender's User Preferences and activate all MakeHuman plugins

[![001 Settings.png](https://d26ilriwvtzlb.cloudfront.net/0/05/001_Settings.png)](/File:001_Settings.png)

[![](/skins/common/images/magnify-clip.png)](/File:001_Settings.png "Enlarge")

\- Set "Auto run python scripts"

[![002 Prefs Scripts.png](https://d26ilriwvtzlb.cloudfront.net/4/45/002_Prefs_Scripts.png)](/File:002_Prefs_Scripts.png)

[![](/skins/common/images/magnify-clip.png)](/File:002_Prefs_Scripts.png "Enlarge")

\- Activate "Rigify

[![003 Prefs Rigify.png](https://d26ilriwvtzlb.cloudfront.net/9/95/003_Prefs_Rigify.png)](/File:003_Prefs_Rigify.png)

[![](/skins/common/images/magnify-clip.png)](/File:003_Prefs_Rigify.png "Enlarge")

\- DEactivate "Import/Export MakeHuman" in the CATEGORY Import-Export

[![004 Prefs ImportExport.png](https://d26ilriwvtzlb.cloudfront.net/9/93/004_Prefs_ImportExport.png)](/File:004_Prefs_ImportExport.png)

[![](/skins/common/images/magnify-clip.png)](/File:004_Prefs_ImportExport.png "Enlarge")

\- Click "Save User Settings" in the User Preferences window and close it

Create character in MakeHuman
-----------------------------

Not much to tell here. Feel free to create any character you like. Please use low poly eyes, otherwise your character will be cross-eyes in UE4. To export your character, use these settings: - Set "Pose/Animate - Rig Presets" to HumanIK. - MeshFormat: Blender exchange (.mhx) - Options: Feet on ground, Export for Rigify - Scale units: centimeter

Import character in Blender
---------------------------

Delete all stuff from the default scene (camera, light, cube). Click File - Import - Makehumane (.mhx) You should now see your character in Blender!

Add animation to character
--------------------------

Set the maximum number of frames in Blender to a number that fits your desired animation! In the Pose Tools / MakeWalk catagory click "Load And Retarget"

[![005 MakeWalk.png](https://d26ilriwvtzlb.cloudfront.net/b/bf/005_MakeWalk.png)](/File:005_MakeWalk.png)

[![](/skins/common/images/magnify-clip.png)](/File:005_MakeWalk.png "Enlarge")

Now choose a \*.bvh file. Adjust the value of "Last Frame" if your animation is longer.

That's all! Click the play button in Blender's animation controls and your character should perform the motion capture animation.

[![006 Playbutton.png](https://d26ilriwvtzlb.cloudfront.net/f/f9/006_Playbutton.png)](/File:006_Playbutton.png)

[![](/skins/common/images/magnify-clip.png)](/File:006_Playbutton.png "Enlarge")

  

Export from Blender to UE4
--------------------------

### MHX to FBX export

First we have to export the character mesh and the skeleton. DO NOT continue. Start a NEW project in Blender.

\- Import your MakeHuman file again into Blender - Do not change anything - Export to "Autodesk FBX" - Use settings (Blender 2.71 may not need this): FBX 6.1 ASCII, enabled ONLY "Mesh" and "Armature", check "Include Tangent Space"

[![007 FBX export.png](https://d26ilriwvtzlb.cloudfront.net/3/3a/007_FBX_export.png)](/File:007_FBX_export.png)

[![](/skins/common/images/magnify-clip.png)](/File:007_FBX_export.png "Enlarge")

\- Now continue, as already described above, to import your .bvh animation - Export again to "Autodesk FBX", but ONLY enabled "Armature"

[![008 FBX export arma.png](https://d26ilriwvtzlb.cloudfront.net/c/cd/008_FBX_export_arma.png)](/File:008_FBX_export_arma.png)

[![](/skins/common/images/magnify-clip.png)](/File:008_FBX_export_arma.png "Enlarge")

\- Use Autodesk FBX Converter to convert the ASCII FBX files to "FBX 2013 Binary"

[![009 AD FBX Converter.png](https://d26ilriwvtzlb.cloudfront.net/c/cb/009_AD_FBX_Converter.png)](/File:009_AD_FBX_Converter.png)

[![](/skins/common/images/magnify-clip.png)](/File:009_AD_FBX_Converter.png "Enlarge")

### Import to UE4

Create a new Unreal project (e.g. Third Person Blueprint).

[![010 Import.png](https://d26ilriwvtzlb.cloudfront.net/7/77/010_Import.png)](/File:010_Import.png)

[![](/skins/common/images/magnify-clip.png)](/File:010_Import.png "Enlarge")

  
\- First, import the MESH (the export without the bvh animation!) - Set: Skeletal Mesh, None Skeleton, Import Normals and Tangents, Use T0 as Ref Pose, Preserve Smoothing Groups, None Physics Asset, Import Materials

[![011 Import Mesh.png](https://d26ilriwvtzlb.cloudfront.net/3/39/011_Import_Mesh.png)](/File:011_Import_Mesh.png)

[![](/skins/common/images/magnify-clip.png)](/File:011_Import_Mesh.png "Enlarge")

\- After that, import the FBX file with the animation - Select the imported mesh as Skeleton, and set the desired number of frames (using "Exported Times" usually works, though)

[![012 Import Anim.png](https://d26ilriwvtzlb.cloudfront.net/d/d1/012_Import_Anim.png)](/File:012_Import_Anim.png)

[![](/skins/common/images/magnify-clip.png)](/File:012_Import_Anim.png "Enlarge")

\- Drag your imported character into the editor - Set Animation mode to "Use Animation Asset" - Set Anim to play to your imported animation - Click play and watch your character performing the animation in UE4!

[![013 Use Char.png](https://d3ar1piqh1oeli.cloudfront.net/b/bf/013_Use_Char.png/940px-013_Use_Char.png)](/File:013_Use_Char.png)

[![](/skins/common/images/magnify-clip.png)](/File:013_Use_Char.png "Enlarge")

### Texturing your character

Create a new texture folder in UE4. Blender exported all textures to a subfolder "textures". Drag all those files into the empty textures folder in your content browser.

[![014 Textures import.png](https://d3ar1piqh1oeli.cloudfront.net/a/ab/014_Textures_import.png/940px-014_Textures_import.png)](/File:014_Textures_import.png)

[![](/skins/common/images/magnify-clip.png)](/File:014_Textures_import.png "Enlarge")

Now open the MATERIALS that UE4 imported and set the "Base color" to the according texture.

[![015 Set Materials.png](https://d3ar1piqh1oeli.cloudfront.net/b/b3/015_Set_Materials.png/940px-015_Set_Materials.png)](/File:015_Set_Materials.png)

[![](/skins/common/images/magnify-clip.png)](/File:015_Set_Materials.png "Enlarge")

Connect the normals textures of the jeans and t-shirt (if you used them) to the normal pin.

Eyelashes and eyebrows need a little transparency. Set the material's blend mode to "translucent" and connect the alpha channel to the opacity pin.

[![016 Brows.png](https://d26ilriwvtzlb.cloudfront.net/2/2c/016_Brows.png)](/File:016_Brows.png)

[![](/skins/common/images/magnify-clip.png)](/File:016_Brows.png "Enlarge")

[![017 Brows Result.png](https://d26ilriwvtzlb.cloudfront.net/f/ff/017_Brows_Result.png)](/File:017_Brows_Result.png)

[![](/skins/common/images/magnify-clip.png)](/File:017_Brows_Result.png "Enlarge")

[Btengelh](/User:Btengelh "User:Btengelh")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Workflow:\_MakeHuman\_and\_Blender&oldid=8330](https://wiki.unrealengine.com/index.php?title=Workflow:_MakeHuman_and_Blender&oldid=8330)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)