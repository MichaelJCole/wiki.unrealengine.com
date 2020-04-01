Asset Creation and Import Troubleshooting - Epic Wiki                    

Asset Creation and Import Troubleshooting
=========================================

  

  

Contents
--------

*   [1 **Documentation and Links**](#Documentation_and_Links)
*   [2 **Frequently Asked Questions**](#Frequently_Asked_Questions)
    *   [2.1 **General Questions**](#General_Questions)
        *   [2.1.1 What are Degenerate Tangents and what does this error message mean?](#What_are_Degenerate_Tangents_and_what_does_this_error_message_mean.3F)
        *   [2.1.2 Why won't UAssets show up in the folder, or why can't I import UAssets directly?](#Why_won.27t_UAssets_show_up_in_the_folder.2C_or_why_can.27t_I_import_UAssets_directly.3F)
        *   [2.1.3 Why does my model take so long to import, or why does the editor freeze when I import my mesh?](#Why_does_my_model_take_so_long_to_import.2C_or_why_does_the_editor_freeze_when_I_import_my_mesh.3F)
        *   [2.1.4 Why is my mesh see through, or why are the faces on my mesh flipped?](#Why_is_my_mesh_see_through.2C_or_why_are_the_faces_on_my_mesh_flipped.3F)
        *   [2.1.5 Is there a poly count limitation?](#Is_there_a_poly_count_limitation.3F)
        *   [2.1.6 Why is my mesh facing on the wrong axis?](#Why_is_my_mesh_facing_on_the_wrong_axis.3F)
        *   [2.1.7 Why is my mesh so small/large when I import?](#Why_is_my_mesh_so_small.2Flarge_when_I_import.3F)
        *   [2.1.8 How do I check the UVs for my mesh?](#How_do_I_check_the_UVs_for_my_mesh.3F)
        *   [2.1.9 Why do I need to UV my mesh for texture mapping?](#Why_do_I_need_to_UV_my_mesh_for_texture_mapping.3F)
        *   [2.1.10 Why does my FBX not apply all the textures or shaders that were made in my modeling program?](#Why_does_my_FBX_not_apply_all_the_textures_or_shaders_that_were_made_in_my_modeling_program.3F)
        *   [2.1.11 How do I Import a .apx CLOTH file created with NVIDIA's tools?](#How_do_I_Import_a_.apx_CLOTH_file_created_with_NVIDIA.27s_tools.3F)
        *   [2.1.12 How can I use my Pivot from my modeling program instead of it being offset?](#How_can_I_use_my_Pivot_from_my_modeling_program_instead_of_it_being_offset.3F)
        *   [2.1.13 Why can I walk through my mesh, or Why does my collision look wrong when I import my mesh?](#Why_can_I_walk_through_my_mesh.2C_or_Why_does_my_collision_look_wrong_when_I_import_my_mesh.3F)
    *   [2.2 **Skeletal Mesh**](#Skeletal_Mesh)
        *   [2.2.1 COMING SOON!](#COMING_SOON.21)
    *   [2.3 **Texture or Material**](#Texture_or_Material)
        *   [2.3.1 When I import a texture with an Alpha, why doesn't the Alpha show?](#When_I_import_a_texture_with_an_Alpha.2C_why_doesn.27t_the_Alpha_show.3F)
        *   [2.3.2 What does the Power of 2 warning mean when I import my image?](#What_does_the_Power_of_2_warning_mean_when_I_import_my_image.3F)
        *   [2.3.3 Why can't I use a texture resolution larger than 8192 in-game?](#Why_can.27t_I_use_a_texture_resolution_larger_than_8192_in-game.3F)
        *   [2.3.4 Why does my texture/material look low quality/blurry in the game?](#Why_does_my_texture.2Fmaterial_look_low_quality.2Fblurry_in_the_game.3F)
        *   [2.3.5 Why does the editor freeze/take a long time when I try to open my asset?](#Why_does_the_editor_freeze.2Ftake_a_long_time_when_I_try_to_open_my_asset.3F)

**Documentation and Links**
---------------------------

[https://docs.unrealengine.com/latest/INT/Engine/Content/AssetCreation/index.html](https://docs.unrealengine.com/latest/INT/Engine/Content/AssetCreation/index.html) [https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/BestPractices/](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/BestPractices/) [https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/ImportOptions/](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/ImportOptions/) [https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/StaticMeshes/](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/StaticMeshes/) [https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/Materials/](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/Materials/) [https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/) [https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/Animations/](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/Animations/) [https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/SkeletalMeshes/](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/SkeletalMeshes/) [https://docs.unrealengine.com/latest/INT/Shared/Editor/FbxErrors/](https://docs.unrealengine.com/latest/INT/Shared/Editor/FbxErrors/) [https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/MorphTargets/](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/MorphTargets/) [https://docs.unrealengine.com/latest/INT/Engine/Content/ContentStandards/](https://docs.unrealengine.com/latest/INT/Engine/Content/ContentStandards/)

  

**Frequently Asked Questions**
------------------------------

### **General Questions**

#### What are Degenerate Tangents and what does this error message mean?

If you've seen the warning message "Object has Degenerate Tangent bases which will results in incorrect shading" you may be wondering what this means exactly.

As of Unreal Engine version 4.7 and higher, the editor will now use MikkTSpace tangents by default. This can easily be changed in the Import Options window by changing the **Normal Generation Method** or it can be changed in the **Build Settings** from the Static Mesh Editor.

The main difference between the previous method and MikkTSpace is that you have to make sure that you're static mesh asset has been properly UV mapped. If not, it can produce the error message mentioned above and will not provide accurate lighting results, even though you may not see any issue with the way the mesh is rendered. It it up to your discretion if you are happy with the results or need to use the alternative built-in method of tangent calculation over MikkTSpace.

In the example here the cube's face has been inset causing the UV's to no longer be properly mapped. This is the result of the tangent calculation with each method.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/2/2e/MikkTSpace.png/524px-MikkTSpace.png)](/File:MikkTSpace.png)
    
    MikkTSpace
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/b/b1/BuiltIn.png/521px-BuiltIn.png)](/File:BuiltIn.png)
    
    Built-In
    

#### Why won't UAssets show up in the folder, or why can't I import UAssets directly?

UAssets are compiled assets created for use with Unreal Engine 4 that are generated from files imported such as Textures, Media/Movies, and FBX/OBJs. This compile happens when the asset is imported for the first time and will now show up in your Content Browser and the subsequent Project Folder under the Content section in Windows/Mac/Linux.

These UAssets can be moved directly from folder to folder in your OS without the need to use the editor to migrate them, but there are some caveats to this method.

*   They require the same folder structure as the original project they were created in otherwise they will lose references. For example, if you have a UAsset of a static or skeletal mesh that has materials assigned to it, the asset will need to be placed in the same folder structure as the original project to show these correctly. So if you have these in Project Folder > Content > Meshes for the original project and your new project you place the UAsset in Project Folder > Content > FBXs the material references will be lost since they will not know where they were referenced to the original mesh.

*   The UAsset may not be from a build of the engine that is compatible. For instance, If you have an UAsset from a 4.10 project you've made, this will not be able to be opened with a 4.9 project. Previous version of the engine are not forward compatible which is in line with pretty much any other software out there.

*   The UAsset may be serialized so that it can only work with a specific engine that so that the asset cannot ever be loaded in another engine or engine version that it is not assigned to. This type of serialization does not refer to the engine versions available via GitHub or the Epic Games Launcher.

#### Why does my model take so long to import, or why does the editor freeze when I import my mesh?

There are number of reasons that importing a Static Mesh or Skeletal Mesh into the editor can take a bit of time. Here are some of the things that you can do to help more quickly get your assets into UE4.

Static Meshes:

1\. **FBX Triangulation:** This routine can be slow and is dependent on the mesh being imported. We use a routine provided by the FBX SDK and it can be slower with meshes that consist of larger polygon counts.

**Resolution:** You can Triangulate your mesh before you export it from your modeling application.

2\. **Lots of Meshes in a single FBX:** When importing a single FBX that may contain a number of assets that need to be combined into a single mesh on import you will see the processing time go up, sometimes exponentially. This is usually something that is reported as a "Freeze" or "Crash" with UE4, but it's just processing the asset. Largely, this can happen because there needs to be a lot of copying around in memory for this to work, which itself takes a while. Each part will save as a whole and then load another piece that needs to be added and saved.

**Resolution:** In your modeling application you can combine meshes to be a single asset or bring the mesh into the editor in chunks rather than a single FBX with lots of pieces. Depending on on your asset and needs this may differ slightly for different FBXs.

3\. **Build Adjacency Buffers:** This is required for PNT triangles to work for Tessellation. If you have a large mesh or do not plan to use tessellation with it just disable it.

Skeletal Meshes:

1\. **Animation Key Frames:** This can cause the import process to increase by having a large number of Key Frames setup for your animation, and can largely depend on the number of bones that are being animated.

  
2\. **Morph Targets:** The more morph targets you have to be imported with your skeletal mesh the longer the import process will take.

#### Why is my mesh see through, or why are the faces on my mesh flipped?

You may need to double check in your modeling package that your polygons normals are facing the correct direction. In most modeling programs, like 3Ds Max or Maya, the back-face will render in the viewport, however in a game engine where you don't want to render what is not needed the backface is culled unless specified to. Only the direction of the polygon's normal will render unless it has a two-sided material applied that will render the face.

You can verify this issue in UE4 by opening the Static/Skeletal Mesh Editors. Once enabled you will see Green lines drawn out from each vertex that shows the direction of the normal.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/2/2d/StaticMeshNormals.png/700px-StaticMeshNormals.png)](/File:StaticMeshNormals.png)
    
    Static Mesh Editor
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/1/1d/SkeletalMeshNormals.png/595px-SkeletalMeshNormals.png)](/File:SkeletalMeshNormals.png)
    
    Skeletal Mesh Editor
    

If these are Green lines are facing inward you will want to edit this in your modeling program to flip the faces the correct direction. Your modeling program should also have a method of displaying the direction of the normal as well.

#### Is there a poly count limitation?

For Desktop development the only limitation is based on what your hardware is capable of handling. However, on Mobile the scene view is limited to <= 500k triangles. This is needed to hit 30fps on both iPad4 and iPad Air.

There is also a limit of 65k vertices due to lack of 32 bit index support on mobile hardware.

For more information about Mobile see these documentation pages:

*   [https://docs.unrealengine.com/latest/INT/Platforms/Mobile/Content/index.html](https://docs.unrealengine.com/latest/INT/Platforms/Mobile/Content/index.html)

*   [https://docs.unrealengine.com/latest/INT/Platforms/Mobile/Performance/index.html](https://docs.unrealengine.com/latest/INT/Platforms/Mobile/Performance/index.html)

*   [https://docs.unrealengine.com/latest/INT/Engine/Content/ContentStandards/index.html](https://docs.unrealengine.com/latest/INT/Engine/Content/ContentStandards/index.html)

#### Why is my mesh facing on the wrong axis?

All models should have their Forward dimension facing in the direction of the X-Axis.

You can read more about this in the documentation here: [https://docs.unrealengine.com/latest/INT/Engine/Content/ContentStandards/index.html](https://docs.unrealengine.com/latest/INT/Engine/Content/ContentStandards/index.html)

#### Why is my mesh so small/large when I import?

When developing content in an external package make sure that you've setup your Scale correctly to correlate with Unreal Engine 4's scale.

Unreal Engine 4 uses Centimeters. 1 Unreal Unit = 1 Centimeter(cm)

When you export your FBX from 3Ds Max or Maya for example, you will need to also make sure that you've set the FBX to export in the scale of Centimeters otherwise it will default to Inches for it's export.

This is an example of the 3Ds Max export window with the section for \`Units\` highlighted. Here you will see that \`Automatic\` is unchecked and the drop-down is set to Centimeters.

[![3DsmaxExportSettings.png](https://d3ar1piqh1oeli.cloudfront.net/2/2e/3DsmaxExportSettings.png/350px-3DsmaxExportSettings.png)](/File:3DsmaxExportSettings.png)

You also have the option to adjust the scale when you import by looking in the **Tranform** section.

[![ImportUniformScale.png](https://d3ar1piqh1oeli.cloudfront.net/d/d0/ImportUniformScale.png/350px-ImportUniformScale.png)](/File:ImportUniformScale.png)

For more information about External Content Creation see the documentation here:

*   [https://docs.unrealengine.com/latest/INT/Engine/Content/ContentStandards/index.html](https://docs.unrealengine.com/latest/INT/Engine/Content/ContentStandards/index.html)

#### How do I check the UVs for my mesh?

If you need to check the UVs of your mesh in you can do this for your Skeletal Mesh or your Static Mesh.

To view your UV(s) for your Static Mesh open it in its Static Mesh Editor, then in the toolbar click the UV icon. This will overlay a window with the currently selected UV, which defaults to UV0. You can use the drop-down to select another UV Channel if needed.

[![Static Mesh Editor UV](https://d3ar1piqh1oeli.cloudfront.net/6/63/StaticMeshUVs.png/500px-StaticMeshUVs.png)](/File:StaticMeshUVs.png "Static Mesh Editor UV")

  
  
  
  
  
  
  
  
  
  
  
  
  

  

1.  Enables the UV Channel overlay view
2.  Allows selection of UV Channel

To view the UV of your Skeletal Mesh you will need to open it in Persona to view the Skeletal Mesh. Then in the Viewport you will be able to select the drop-down for **Show** > **Advanced** > Check the **UV check box**. Here you will also have the drop-down for UV Channel you would like to be overlaid in the view.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/c/ca/SkelMeshUVs.png/595px-SkelMeshUVs.png)](/File:SkelMeshUVs.png)
    
    Menu Option for UVs
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/0/01/SkelMeshUVs1.png/595px-SkelMeshUVs1.png)](/File:SkelMeshUVs1.png)
    
    Skeletal Mesh UVs
    

#### Why do I need to UV my mesh for texture mapping?

If you need to assign a material to your mesh it would be imperative to setup your UV, otherwise you would see stretching or other artifacts because the UV is not laid out properly.

You can read more about this in the documentation page: [https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/Materials/index.html](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/Materials/index.html)

#### Why does my FBX not apply all the textures or shaders that were made in my modeling program?

Unreal Engine 4 cannot import specific materials/textures/shaders that were created in other programs. While the Material Editor in UE4 is a robust system there isn't a universal system in place to communicate the different shader setups from other programs. With the many different modeling packages out there and their own shader setups Unreal can only do basic imports. It is for this reason that it is recommended to use the Material Editor in the engine to create all your materials for your assets.

There are a few types of textures that can be imported automatically to create the material and assign to the mesh, but this is only for simple materials that use Diffuse, Normal, and Opacity(Alpha) textures. These types of textures can be automatically assigned in a generated material.

#### How do I Import a .apx CLOTH file created with NVIDIA's tools?

When you create a Apex Cloth asset with your modeling package using Maya, 3Ds Max, or Nvidias ClothingTool that comes with their SDK you may be wondering how you would import that .apb/.apx file that is created with your Cloth attributes.

You will not be able to directly import this type of file using the Import option from the Content Browser. Instead it will be assigned to the Skeletal Mesh that houses the material that this file needs to be assigned to.

1\. Start by importing your Skeletal Mesh  
2\. Now open the Skeletal Mesh in Persona (Skeletal Mesh Editor)  

3\. In the Detail's panel on the left and locate the section named **Clothing** and click the **Add APEX clothing file...**

[![](https://d26ilriwvtzlb.cloudfront.net/2/2e/Clothassignment.png)](/File:Clothassignment.png)

Add APEX clothing file button

  

  

  

  
4\. Select your .apx file from the selection window.  

5\. Once imported you can select the **Clothing** drop-down under each Material Element to choose where it should be assigned.

[![Cloth Assignment to Material Element](https://d3ar1piqh1oeli.cloudfront.net/5/5f/ApxClothAssignment.png/400px-ApxClothAssignment.png)](/File:ApxClothAssignment.png "Cloth Assignment to Material Element")

#### How can I use my Pivot from my modeling program instead of it being offset?

By default, the pivot will use the World Origin (0,0,0) of the FBX, so if the meshes pivot is not centered out to 0,0,0 then the mesh will appear to be offset when you import it into UE4.

As of 4.12 you can now import your static meshes and have have the pivot use the one from the DCC for the mesh rather than being centered to the FBX's DCC.

Use the following when you import:

[![FBXPivot.png](https://d3ar1piqh1oeli.cloudfront.net/f/f4/FBXPivot.png/350px-FBXPivot.png)](/File:FBXPivot.png)

[![](/skins/common/images/magnify-clip.png)](/File:FBXPivot.png "Enlarge")

Simply uncheck the option for **Transform Vertex to Absolute** so that the Pivot, Transform, and Offset from the FBX will be used for the static mesh.

#### Why can I walk through my mesh, or Why does my collision look wrong when I import my mesh?

If you are able to walk through your mesh you likely have no collision setup for your static mesh. This will prevent the player or any objects simulating physics to interact with the mesh.

For an overview of different methods that Unreal Engine 4 uses with collision along with how-to set these up have a look at this documentation:

*   [https://docs.unrealengine.com/latest/INT/Engine/Physics/Collision/HowTo/index.html](https://docs.unrealengine.com/latest/INT/Engine/Physics/Collision/HowTo/index.html)

If you are having trouble getting collision to be more accurate you will likely need to use the auto-convex method of collision generation with higher accuracy settings, or you will need to create custom collision in your modeling application.

You can read more about that here in the documentation where it covers adding convex collision and the caveats to using it.

*   [https://docs.unrealengine.com/latest/INT/Engine/Physics/Collision/HowTo/AddConvexHulls/index.html](https://docs.unrealengine.com/latest/INT/Engine/Physics/Collision/HowTo/AddConvexHulls/index.html)
*   [https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/StaticMeshes/index.html#collision](https://docs.unrealengine.com/latest/INT/Engine/Content/FBX/StaticMeshes/index.html#collision)

  

### **Skeletal Mesh**

#### COMING SOON!

### **Texture or Material**

#### When I import a texture with an Alpha, why doesn't the Alpha show?

When importing any textures that have an Alpha, like with PNG, the Alpha is disabled when viewing just the texture asset, but it's visible when viewing in the Texture Editor. When disabling the Alpha the color information is not known for this negative space and is just pulled from the colors of the pixels that are known in that area.

[![](https://d26ilriwvtzlb.cloudfront.net/9/91/AlphaImport.png)](/File:AlphaImport.png)

[![](/skins/common/images/magnify-clip.png)](/File:AlphaImport.png "Enlarge")

Texture Asset

  

  

  

  

  

  
When opening the Texture Editor with this asset you can enable and disable the Alpha to see how this works.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/2/24/AlphaEnabled.png/551px-AlphaEnabled.png)](/File:AlphaEnabled.png)
    
    Alpha Channel Enabled
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/4/47/AlphaDisabled.png/551px-AlphaDisabled.png)](/File:AlphaDisabled.png)
    
    Alpha Channel Disabled
    

#### What does the Power of 2 warning mean when I import my image?

When creating or using a texture in Unreal Engine you will need to make sure that it is a Power of two, meaning that it should be using 16, 32, 64, 128, 256, etc for it's resolutions. ie. 256 x 256 for it's dimensions.

While you can use a texture without these dimensions you may run into issues, especially depending on the file size of the time. When not using a power of two the texture can never be streamed, which means that it cannot have mipmaps to lower its resolutions dynamically at further distances. This means that it will always render at full quality at the farthest distances and at its full file size too.

It's always best to use a power of two where possible and take precautions where you cannot.

#### Why can't I use a texture resolution larger than 8192 in-game?

Unreal Engine 4 has no problem importing textures that are up to 8192, but you may have noticed if you look at the Texture Editor the in-game resolution is still listed as 4196. Before you can use 8192 you will need to make some edits to your device profiles in order to enable this.

Follow the documentation here to see how to proceed: [https://docs.unrealengine.com/latest/INT/Engine/Content/Types/Textures/SupportAndSettings/index.html#textureresolution](https://docs.unrealengine.com/latest/INT/Engine/Content/Types/Textures/SupportAndSettings/index.html#textureresolution)

#### Why does my texture/material look low quality/blurry in the game?

If you're seeing a difference between working in the Editor and PIE (Play in Editor) then you will likely want to check to make sure that your Engine Scalability settings are set to EPIC. Sometimes these can be lowered when monitoring performance of your computer to make sure that you keep decent performance while working in the Editor.

For more information on Engine Scalability you can see the documentation here: [https://docs.unrealengine.com/latest/INT/Engine/Performance/Scalability/ScalabilityReference/](https://docs.unrealengine.com/latest/INT/Engine/Performance/Scalability/ScalabilityReference/)

If you find that the scalability is being lowered often you can disable the option for **Monitor Editor Performance?** to keep the same quality settings.

[![](https://d26ilriwvtzlb.cloudfront.net/c/c7/MonitorPerformance.png)](/File:MonitorPerformance.png)

[![](/skins/common/images/magnify-clip.png)](/File:MonitorPerformance.png "Enlarge")

Engine Scalability Monitoring

#### Why does the editor freeze/take a long time when I try to open my asset?

If it's the first time you've opened an asset in the editor it can take a moment to write the Derive Data Cache (DDC) so that it can make it easier for the editor to know what these assets are and open them more quickly in the future. For most assets you may not notice any delay in opening them the first time, but if you have textures with high resolutions in the range of 8192 and high polygon density static meshes it can take a moment or more to write these to the DDC the first time. The time it takes to write to the DDC is dependent on the number of assets being opened and the hardware that is being used. If opening multiple assets it can take more time.

For more information about the Derive Data Cache you can see the documentation here: [https://docs.unrealengine.com/latest/INT/Engine/Basics/DerivedDataCache/index.html](https://docs.unrealengine.com/latest/INT/Engine/Basics/DerivedDataCache/index.html)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Asset\_Creation\_and\_Import\_Troubleshooting&oldid=23447](https://wiki.unrealengine.com/index.php?title=Asset_Creation_and_Import_Troubleshooting&oldid=23447)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")
*   [Troubleshooting](/Category:Troubleshooting "Category:Troubleshooting")
*   [Material](/Category:Material "Category:Material")
*   [Import](/index.php?title=Category:Import&action=edit&redlink=1 "Category:Import (page does not exist)")
*   [FBX](/index.php?title=Category:FBX&action=edit&redlink=1 "Category:FBX (page does not exist)")
*   [Asset Creation](/index.php?title=Category:Asset_Creation&action=edit&redlink=1 "Category:Asset Creation (page does not exist)")

  ![](https://tracking.unrealengine.com/track.png)