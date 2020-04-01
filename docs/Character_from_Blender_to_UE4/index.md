Character from Blender to UE4 - Epic Wiki                   

Character from Blender to UE4
=============================

  

Contents
--------

*   [1 How to create and export a rigged character from Blender to UE4](#How_to_create_and_export_a_rigged_character_from_Blender_to_UE4)
    *   [1.1 Goal](#Goal)
    *   [1.2 Importing the default UE4 skeleton](#Importing_the_default_UE4_skeleton)
    *   [1.3 Skinning and Rigging the Character](#Skinning_and_Rigging_the_Character)
        *   [1.3.1 Use of Vertex Groups](#Use_of_Vertex_Groups)
    *   [1.4 Exporting to UE4](#Exporting_to_UE4)
    *   [1.5 Applying an animation to the Character](#Applying_an_animation_to_the_Character)
    *   [1.6 Resources](#Resources)
        *   [1.6.1 Luis Garcia's UE4 Blender tools (includes default Manequinn Character in Blender)](#Luis_Garcia.27s_UE4_Blender_tools_.28includes_default_Manequinn_Character_in_Blender.29)
        *   [1.6.2 Blender Software](#Blender_Software)
        *   [1.6.3 Make Human](#Make_Human)

How to create and export a rigged character from Blender to UE4
===============================================================

Page is still under construction

Goal
----

To show you how to created a character in Blender that can be successfully exported to UE4.

These are the following steps:

[![Blender Character Flow.png](https://d3ar1piqh1oeli.cloudfront.net/7/73/Blender_Character_Flow.png/940px-Blender_Character_Flow.png)](/File:Blender_Character_Flow.png)

Importing the default UE4 skeleton
----------------------------------

Download the Blender file with the base mannequin. You can either grab:

[UE4 Tools (including the Blend file)](http://www.lluisgarcia.es/ue-tools-addon/) or

[Download the .blend file directly](http://www.adventuresinsilicon.com/public/ue4/UE4_Mannequinn_Base.blend)

Then open this in Blender.

You will be presented with the default mannequin model.

[![Basic Mannequin import](https://d26ilriwvtzlb.cloudfront.net/c/c4/Blender_Character_screen_1.png)](/File:Blender_Character_screen_1.png "Basic Mannequin import")

  
This is very similar to the mesh and skeleton from the UE4 default Mannequin.

[![UE4 Default Skeleton and Mannequin](https://d26ilriwvtzlb.cloudfront.net/6/60/UE4_mannequin_1_bones.png)](/File:UE4_mannequin_1_bones.png "UE4 Default Skeleton and Mannequin")

  
You can see the UE4 bone structure in the default skeleton hierarchy on the left of the above screen shot taken from UE4.

Skinning and Rigging the Character
----------------------------------

This will include making sure the character is skinned and rigged for exporting.

The Default Mannequin .blend file includes all of the armatures (bones) for inclusion in the character. This skeleton is the default UE4 skeleton. Where possible it is best to use this skeleton (names and hierarchy) to make animation retargeting easier.

  

[![screenshot showing bones](https://d26ilriwvtzlb.cloudfront.net/6/6c/Blender_Character_screen_3.png)](/File:Blender_Character_screen_3.png "screenshot showing bones")

  

### Use of Vertex Groups

The way Blender will associate vertices of a mesh with a particular bone (armature) is via the use of vertex groups.

[![Vertex Association Flow Chart](https://d26ilriwvtzlb.cloudfront.net/f/f8/Vertex_Group_association.png)](/File:Vertex_Group_association.png "Vertex Association Flow Chart")

A good resource to refer to when dealing with Vertex Groups in Blender is the Blender manual page:

[Blender Manual - Vertex Groups](https://docs.blender.org/manual/en/dev/modeling/meshes/properties/vertex_groups/assigning_vertex_group.html#working-with-content-of-vertex-groups)

In the image below the vertex group labelled "pelvis" is selected. This demonstrates which vertices are controlled by the pelvis armature.

[![Vertex Group Pelvis selected](https://d26ilriwvtzlb.cloudfront.net/b/b0/Blender_Character_screen_4.png)](/File:Blender_Character_screen_4.png "Vertex Group Pelvis selected")

Blender knows to bind the right armature (bone) with the correct vertex group when they share the same name and the following check box is ticked:

[![vertex group check box](https://d26ilriwvtzlb.cloudfront.net/8/8c/Blender_Character_screen_6.png)](/File:Blender_Character_screen_6.png "vertex group check box")

Exporting to UE4
----------------

Use the following settings when exporting the FBX file

[![Blender Export Settings](https://d26ilriwvtzlb.cloudfront.net/a/ae/Blender_Character_Export_Montage.png)](/File:Blender_Character_Export_Montage.png "Blender Export Settings")

Applying an animation to the Character
--------------------------------------

This step requires use of the UE4 tools to retarget the animation from another source to the Blender character.

A great guide is found here: [https://docs.unrealengine.com/latest/INT/Engine/Animation/RetargetingDifferentSkeletons/](https://docs.unrealengine.com/latest/INT/Engine/Animation/RetargetingDifferentSkeletons/)

Example video of a character exported from Blender:

[https://youtu.be/DHG\_C0obCLM](https://youtu.be/DHG_C0obCLM)

One important note when retargeting is to not retarget upperarm\_twist\_l, upperarm\_twist\_r or lowerarm\_twist\_l or lowerarm\_twist\_r. Leave these unmapped against the humanoid rig for best results.

Resources
---------

### Luis Garcia's UE4 Blender tools (includes default Manequinn Character in Blender)

[http://www.lluisgarcia.es/ue-tools-addon/](http://www.lluisgarcia.es/ue-tools-addon/)

### Blender Software

[https://www.blender.org/](https://www.blender.org/)

### Make Human

[http://www.makehuman.org/](http://www.makehuman.org/)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Character\_from\_Blender\_to\_UE4&oldid=25725](https://wiki.unrealengine.com/index.php?title=Character_from_Blender_to_UE4&oldid=25725)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blender](/index.php?title=Category:Blender&action=edit&redlink=1 "Category:Blender (page does not exist)")

  ![](https://tracking.unrealengine.com/track.png)