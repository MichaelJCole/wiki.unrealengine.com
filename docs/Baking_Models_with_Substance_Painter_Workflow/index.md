Baking Models with Substance Painter Workflow - Epic Wiki                    

Baking Models with Substance Painter Workflow
=============================================

The goal of this document is a quick "How-To" for those new to baking models. My focus is using a sync'd tangent basis workflow from Substance Painter to UE4. In addition, some tips and tricks to fix artifacts. I am using Maya 2014 to prepare the models for baking inside of Substance Painter 1.3.

Contents
--------

*   [1 Model Preparation:](#Model_Preparation:)
*   [2 Baking with Painter:](#Baking_with_Painter:)
*   [3 Exporting the model for UE4](#Exporting_the_model_for_UE4)
*   [4 Troubleshooting Normal Map Artifacts](#Troubleshooting_Normal_Map_Artifacts)

Model Preparation:
------------------

**Make sure the High Poly Mesh and the Low Poly Mesh are aligned, sized, and centered in the scene.**

[![Aligned1.jpg](https://d3ar1piqh1oeli.cloudfront.net/9/9f/Aligned1.jpg/150px-Aligned1.jpg)](/File:Aligned1.jpg)

I recommend sizing the model near to the correct size that you will be using inside of UE4. I find that a lot of the models I get from the modelers come in very small, and I have experienced artifacts from some averaging algorithms. Too small causes it to pull in data from far away normals which means your threshold is in the noise domain.

  
**Don't go too Low Poly! Spend the extra geometry to match any extreme silhouette differences.**

[![Lowpoly1.jpg](https://d3ar1piqh1oeli.cloudfront.net/d/d0/Lowpoly1.jpg/150px-Lowpoly1.jpg)](/File:Lowpoly1.jpg)

Normals are only good within a certain tolerance between the low poly and high poly meshes. In today's production environment, polycount can go higher and the term Medium Poly should be thought of. If you really, want a true Low Poly, then follow up with a LOD mesh chain using Simplygon afterwards.

  
**Triangulate the Low Poly Mesh and Average Normals.**

[![Triaverage1.jpg](https://d3ar1piqh1oeli.cloudfront.net/a/a7/Triaverage1.jpg/150px-Triaverage1.jpg)](/File:Triaverage1.jpg)

Before you triangulate the mesh, make sure to save a copy of the scene if you need to go back to the quad version without running the quadrangulate function later. Also, as an option, I like to perform an Average Normals function on the Low Poly mesh. The reason that I do this is so that my baking canvas becomes more relaxed. The grouping threshold to use will vary per model just dial it in. This averaging is optional and is my preference.

**Clean up duplicate material nodes, implement naming conventions, and delete extra UV Sets.**

**Exploding a mesh, Setting up SubMeshNames**

[![Exploded1.jpg](https://d3ar1piqh1oeli.cloudfront.net/8/8c/Exploded1.jpg/150px-Exploded1.jpg)](/File:Exploded1.jpg)

Take your mesh and if there are any submeshes, separate them. Move the submeshes so that they are not close to other sub pieces. I like to keep things simple and move along the axes in 50 unit increments. This way you can easily move the sub-meshes back to their exact spot if the transform is lost.

_Note: A new feature coming soon may replace this technique, "Match by Sub-Meshes Name"_

**Setting up a Cage for baking**

With Maya, Make sure that all of the sub meshes are separated. The goal is to create a cage which envelopes the High Poly and Low Poly mesh as close as possible without interpenetration. I find you can obtain closer fitting cages by doing each piece separate.

*   Select only the Low Poly Mesh
*   Change to the Rendering preset and select Lighting/Shading from the menu and choose "Transfer Maps"
*   In the pop up, choose to show "Both" which makes the cage appear in red. Adjust the slider to expand and collapse the cage so that it hugs as close as possible.
*   When the right size is found, click on the cage in the viewport, duplicate it, and unparent it. Cancel the Transfer Map operation.
*   Repeat the operation for each SubMesh

*   [![](https://d3ar1piqh1oeli.cloudfront.net/d/d6/Transfermaps1.jpg/120px-Transfermaps1.jpg)](/File:Transfermaps1.jpg)
    
    Opening Transfer Maps
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/0/04/Envelope1.jpg/120px-Envelope1.jpg)](/File:Envelope1.jpg)
    
    Size the Envelope Tightly
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/0/0f/Duplicated.jpg/117px-Duplicated.jpg)](/File:Duplicated.jpg)
    
    Duplicate the Envelope
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/8/89/EnvelopeAll1.jpg/120px-EnvelopeAll1.jpg)](/File:EnvelopeAll1.jpg)
    
    Repeat for All Submeshes
    

  
_Basically, you just hijacked the cage from the Maya baker and will now export it to be used in Substance Painter. In other modeling programs you can do push operations or similiar procedures;_

**Combine your meshes into a single mesh.**

For the Low Poly and Cage Mesh you need to combine the submeshes in the exact same sequence so that the vertex ordering is the same for the baking process. The High Poly doesn't seem to matter.

**Export the Low Poly Mesh, High Poly Mesh, & Cage as FBX.**

[![FBXexport1.jpg](https://d3ar1piqh1oeli.cloudfront.net/9/98/FBXexport1.jpg/150px-FBXexport1.jpg)](/File:FBXexport1.jpg)

Use the following settings when exporting. Check Smoothing Groups and Smooth Mesh

To find out more about other settings look here

[FBX Best Practices](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/BestPractices/index.html)

Baking with Painter:
--------------------

**Open Painter and create a new project.**

Load in the exploded low poly mesh and set the document resolution.

**Select on the Bake Textures button**

[![PainterBake1.jpg](https://d3ar1piqh1oeli.cloudfront.net/d/d7/PainterBake1.jpg/400px-PainterBake1.jpg)](/File:PainterBake1.jpg)

Set your desired output size and your Dilation width. The dilation width is how much padding around the uvshells you want to expand. This is helpful to keep enough space for mipmaps.

**Load in your High Poly Mesh and Cage File**

Finalize your common Settings

*   Max Frontal Distance, the distance the rays will shoot outward looking for geometry
*   Max Rear Distance, same as frontal but shot the opposite direction
*   Relative to Bounding Box, leave checked
*   Average Normals, leave checked. It will smooth out your high poly mesh normals
*   Ignore Backface, leave checked
*   match by Sub-Meshes Name, leave unchecked. This a future feature which will replace the exploding mesh technique
*   Antialiasing, Max it to 8x8

**Perform the bake:**

After the bakes are done the textures are automatically mapped to the correct channels for use by painter. Save and paint away.

Allegorithmic created a nice video [Baking Textures 1.3](https://youtu.be/7oLD4dmjJqI?list=PLB0wXHrWAmCyOxi2BbfTf4ySMJ2iR4Xqy)

Exporting the model for UE4
---------------------------

**Export the textures from Substance painter**

[![ExportSP1.jpg](https://d3ar1piqh1oeli.cloudfront.net/3/34/ExportSP1.jpg/400px-ExportSP1.jpg)](/File:ExportSP1.jpg)

1.  Select File, then Export all Channels
2.  Set your Config to "Unreal Engine 4 (Packed). Packed means that the roughness and metal masks will be packed into a single file. By default, the Red & Green channels will have the Roughness mask and the Blue channel will contain the Metallic mask.

_You can create your own configuration through the configuration tab_

  

**Import the Low Poly Mesh and Textures into UE4**

[![ImporteUE4 2.jpg](https://d3ar1piqh1oeli.cloudfront.net/1/1d/ImporteUE4_2.jpg/300px-ImporteUE4_2.jpg)](/File:ImporteUE4_2.jpg)

*   The import setting to remember for the mesh is to select "Import Normals" on the Normal Import Method option.

*   The other settings are unique to your workflow. If you want UE4 to generate a lightmap then check it, or even better you make your own lightmap uv set in a second uv set. There are other tutorials for that. [Unwrapping UVs for Lightmaps](https://docs.unrealengine.com/latest/INT/Engine/Content/Types/StaticMeshes/LightmapUnwrapping/index.html)

_Read [FBX Import Options Reference](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/ImportOptions/index.html) to find out what other settings may apply for your workflow._

  

[![SRGB1.jpg](https://d3ar1piqh1oeli.cloudfront.net/8/8a/SRGB1.jpg/300px-SRGB1.jpg)](/File:SRGB1.jpg)

*   When importing the Packed Roughness/Metallic texture, make sure to uncheck sRGB! If you don't your model will become very shiny. Again, this is only for the packed textures.

*   Another quick check for importing the normal maps, make sure to check they are actually imported as Normal Maps
    *   Compression Settings to 'TC Normalmap"
    *   Set your Texture Group, such as "WorldNormalMap"

  

  
**Setup your Material and connect your textures.**

[![MatNodes1.jpg](https://d3ar1piqh1oeli.cloudfront.net/3/33/MatNodes1.jpg/300px-MatNodes1.jpg)](/File:MatNodes1.jpg)

  

*   Remember "R" for "R"oughness, Blue for Metallic

*   Connect your Emmissive texture if one was exported

*   Optionally, you could also connect your AO map that was generated in Painter

Troubleshooting Normal Map Artifacts
------------------------------------

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Baking\_Models\_with\_Substance\_Painter\_Workflow&oldid=12374](https://wiki.unrealengine.com/index.php?title=Baking_Models_with_Substance_Painter_Workflow&oldid=12374)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)