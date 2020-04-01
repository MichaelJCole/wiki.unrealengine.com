Converting UT Maps - Epic Wiki                    

Converting UT Maps
==================

  

[![UTLogoFinal Drop.png](https://d26ilriwvtzlb.cloudfront.net/e/e4/UTLogoFinal_Drop.png)](/File:UTLogoFinal_Drop.png)

  

Contents
--------

*   [1 Porting Previous UT Maps Into Unreal Tournament in UE4](#Porting_Previous_UT_Maps_Into_Unreal_Tournament_in_UE4)
*   [2 Quick and Dirty Instructions](#Quick_and_Dirty_Instructions)
*   [3 In-Depth Explanation and Important Details](#In-Depth_Explanation_and_Important_Details)
    *   [3.1 BSP Geometry](#BSP_Geometry)
    *   [3.2 Static Mesh Geometry](#Static_Mesh_Geometry)
    *   [3.3 Miscellaneous Actors](#Miscellaneous_Actors)
    *   [3.4 Grid and Scale](#Grid_and_Scale)

Porting Previous UT Maps Into Unreal Tournament in UE4
======================================================


-----------------------------------------------------------------------------------------------------------------

We have had several people request that their favorite map from a previous Unreal Tournament game be ported into the new game. We obviously won’t be able to accommodate every request, but we did want to ensure that the process was clear enough that you could port a map yourself, should you chose to do so. I’ve ported several maps for UT games in the past, and have done a handful of maps for the new Unreal Tournament as well, and here are some important disclaimers:

  

*   First and foremost, no conversion will ever be as good as building a map from scratch. It’s worth pointing out that every single time I’ve ever ported a map, I have never actually used it for more than a guide; every single “remake” I’ve done has actually been reconstructed brush by brush. This is the only way to ensure consistency with the new game and avoid some common errors that creep up in the automated porting process.

*   Next, it’s important to understand that different parts of a map port differently, and there are big discrepancies between various games due to the (in)compatibility of the various builds and engine versions. This means that some things can’t always be ported, or port with mixed results. So have patience, as it can sometimes be a laborious and frustrating process; this is yet another reason that it’s often best to just rebuild from scratch – the effort is often about the same.

  

Quick and Dirty Instructions
----------------------------

1.  Open the map you’d like to port in its original editor.
2.  Delete everything except the BSP brushes.
3.  Delete all nonsolid and 2D sheet BSP brushes.
4.  Select all BSP brushes, right click, and select the option to permanently transform them.
5.  Rebuild.
6.  From the File menu (top left), export the map to T3D.
7.  Run the T3D through a conversion program. (A reliable converter created by the community can be found [here](http://ut.raxxy.com/maps/).) Note: sometimes this works... and sometimes it doesn't. Good luck!
8.  Import the converted T3D into the Unreal Tournament UE4 editor.

  

In-Depth Explanation and Important Details
------------------------------------------

### BSP Geometry

The real structural “bones” of a traditional Unreal Tournament map are the BSP brushes. BSP brushes show up as the blue, yellow, and green geometric wireframe shapes in the editor. In the original Unreal Tournament, these primitives were used to build all the geometry within a map. Techniques have changed with the march of technology, and much of a map’s geometry in newer titles is now built with Static Meshes (assets imported from outside 3D programs), but the underlying world is still often constructed with BSP; even within Unreal Engine 4, BSP is still the most powerful tool a Level Designer has to prototype map designs. But be warned: BSP’s great power and versatility is often offset by its somewhat quirky nature.

*   When shifting BSP between versions of the Unreal Engine, it is important to note that the original Unreal Tournament and UT2004 were both based on a subtractive world, while UT3 and the new Unreal Tournament both use an additive world:

*   When you’re looking at a completely blank space in a subtractive world, it’s easiest to imagine that blank space as a hunk of solid rock – you need to carve shapes out of the rock by subtracting holes from the inside of it. In order to create a room, you need to start by subtracting a cube. This one subtraction will create a floor, four walls, and a ceiling – it’s a hole that a player can stand inside of.

*   In an additive world, by comparison, the blank space is a complete void, and you need to add geometry to fill it. You’ll need to add a cube to create a floor, and others to create walls or ceilings. Instead of a hole, you create geometry that players stand on top of.

*   This difference is vitally important because if you’re porting a map from UT99 to the new UT, that means that you’re attempting to subtract a UT99 level from the void of New UT nothingness, and if you subtract nothing from nothing, you’ll get nothing – it won’t display properly. To work around this, you’ll need to add a giant cube to the world first, one that is big enough to encompass the entirety of the old map’s geometry, and then subtract the new map from it.

*   The order in which brushes are created is another important consideration: during a conversion, you need to make sure that the additive brush is added before you import the T3D, otherwise you’ll be adding the brush on top the existing level and filling holes rather than creating a space for holes to be carved out from. You can always re-order your brush after the fact (ordering is in the Details Panel in UE4), but I thought it was worth pointing it out since it can throw you for a loop if you’re not familiar with the process.

*   Subtractive worlds were also separated into individual “zones” for visibility culling and improved performance. Without going into too much detail here, this meant that there were a large number of BSP zone portals – two dimensional, non-solid brushes – scattered throughout the maps. Zone portals are not needed in Unreal Engine 3 or Unreal Engine 4. These types of brushes were also used for water, fire, or other effects and they are generally not used in additive versions of the Unreal Engine. To complicate things further, they sometimes become corrupt and can interfere with a map port. In short, select all your green, non-solid BSP brushes and delete them before porting (regardless of engine version), and you will save yourself a good amount of headache and trouble.

*   BSP brushes start out in the shape of a basic primitive (a cube, a cone, a sphere) and are then manipulated by adjusting individual vertices, sides, or faces; intersecting or clipping can be used to create more complicated shapes. Brushes will retain their original information, however, and can sometimes revert to those forms during a map port. In order to avoid this, and to lock your brushes in place, it is sometimes necessary to right click on them and select the option to permanently transform them. Sometimes, a BSP brush can become corrupted during the original build process, and even a transform cannot fix this. So, be prepared for times with brushes appear in odd locations, or do not appear at all. There is no known workaround for fixing a corrupted brush, those areas simply need to be rebuilt in the new editor.

  

### Static Mesh Geometry

Static Meshes were introduced in Unreal Engine 2, and used as the primary way to create geometry in Unreal Tournament 2003 / 2004, and Unreal Tournament 3. If you follow the instructions above, note that none of the static meshes will port along with the BSP. This one fact alone can make it nearly impossible to port maps from those games into the new Unreal Tournament in any sort of playable state.

*   It might be possible to import those static mesh assets if you could re-import all the source art using all the exact same names and exact same structure, but since Unreal Engine 4 uses an asset-based structure instead of a package-based organizational structure, I do not know if this would even be possible.
*   You could, of course, re-import all the assets and manually place them, but at that level of detail you'd be much better served to just rebuild the map from scratch anyway.

### Miscellaneous Actors

There are a number of other actors involved in map creation that you cannot expect to port, or that are likely to be corrupt due to differences in the way that separate versions of the Unreal Engine operate. player start actors, lights, ambient sound actors, fluid surfaces, and game specific actors (CTF Flags, DOM Points, etc.) are best just deleted before export and manually placed using the new Unreal Engine 4 versions of those actors (where available).

  

### Grid and Scale

Unreal Engine 4 uses a base-10 grid system by default. This means that you'll see grid lines that following the metric system (at 1, 5, 10, 50, 100... ). All previous versions of the engine use a base-2 grid system (so you'll see grid lines at 1, 2, 4, 8, 16, 32, 64...). This means that any map imported into Unreal Engine 4 will no longer be arranged on the grid, and this could create some small issues with actor placement and organization.

*   You can change your grid settings to base-2 in the editor properties window, and if you're not going to rebuild from scratch, I would advise that you do this.
*   Note that these settings are global, not map based, so if you're also working on new content that was build on the base-10 system, you'll need to convert the editor settings back and forth on a per-map basis.

It is also worth noting that every version of Unreal Tournament has been built to a different scale. Maps ported from the original Unreal Tournament into Unreal Engine 4, for example, will need to be scaled to approximately twice their original size.

*   Again, note that this is approximate, and differences in player speed, gravity, and general physics may cause the map to play differently. This is yet another reason that it is better to rebuild maps from scratch when porting, as they can be built to take advantage of the new game's settings.

*   Scaling can be done on a per-brush basis, but I would recommend that they all be scaled together in order to ensure proper alignment and placement.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Converting\_UT\_Maps&oldid=10615](https://wiki.unrealengine.com/index.php?title=Converting_UT_Maps&oldid=10615)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")

  ![](https://tracking.unrealengine.com/track.png)