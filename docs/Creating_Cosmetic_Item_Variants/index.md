Creating Cosmetic Item Variants - Epic Wiki                    

Creating Cosmetic Item Variants
===============================

  

Contents
--------

*   [1 Overview](#Overview)
*   [2 Simple Variants](#Simple_Variants)
*   [3 More Complex Variants](#More_Complex_Variants)
*   [4 Testing In Game](#Testing_In_Game)

Overview
--------

You may want to support having several variants of a cosmetic item, but the variants aren't major enough to warrant having a separate item for each one. For example, you may have a cap that you want to allow players to make blue, green or yellow, but making them acquire each individual hat would be overkill. We've implemented a variant system to solve this problem. There are simple variants that just swap colors in your materials and complex variants that have full blueprint support for you to implement whatever you can dream up.

Simple Variants
---------------

The simplest form of cosmetic variant is a color swap. The cosmetic system supports setting two named vector material parameters, "CosmeticColor1" and "CosmeticColor2".

My material looks like so:

[![Material.png](https://d3ar1piqh1oeli.cloudfront.net/1/1b/Material.png/900px-Material.png)](/File:Material.png)

[![](/skins/common/images/magnify-clip.png)](/File:Material.png "Enlarge")

You then add to the Variant Names array in cosmetic blueprint. We automatically add a variant called default to the customization drop down in-game, so make sure you account for that when modifying the Variant Color Swaps array. Note that I have 3 Variant Names and 4 Variant Color swaps in the image below. Variant Color Swaps index 0 will be the default color scheme.

[![CosmeticvariantBlueprint.png](https://d26ilriwvtzlb.cloudfront.net/1/1e/CosmeticvariantBlueprint.png)](/File:CosmeticvariantBlueprint.png)

[![](/skins/common/images/magnify-clip.png)](/File:CosmeticvariantBlueprint.png "Enlarge")

More Complex Variants
---------------------

There's a blueprint event that you can implement in your cosmetic blueprint named "On Variant Selected". It will have an integer called "Variant" that signals your cosmetic that the player has chosen a non-default variant. If you are using this method, it is not necessary to fill out Variant Color Swaps. If you would like color swaps in addition, make sure that you have a call to the parent function like the below image (Compile the blueprint, then right click the event node and select Add Call To Parent Function).

[![Callparent.png](https://d26ilriwvtzlb.cloudfront.net/2/2a/Callparent.png)](/File:Callparent.png)

[![](/skins/common/images/magnify-clip.png)](/File:Callparent.png "Enlarge")

Testing In Game
---------------

Open the Player Settings menu. Select your custom cosmetic and an extra dropdown will appear if Variant Names array has any items in it. Selecting an item in the Variant dropdown will update the live preview with your changes.

[![Playersettings.png](https://d26ilriwvtzlb.cloudfront.net/f/f4/Playersettings.png)](/File:Playersettings.png)

[![](/skins/common/images/magnify-clip.png)](/File:Playersettings.png "Enlarge")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_Cosmetic\_Item\_Variants&oldid=12980](https://wiki.unrealengine.com/index.php?title=Creating_Cosmetic_Item_Variants&oldid=12980)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")

  ![](https://tracking.unrealengine.com/track.png)