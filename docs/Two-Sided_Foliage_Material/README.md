 Two-Sided Foliage Material - Epic Wiki             

 

Two-Sided Foliage Material
==========================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Overview
--------

    This tutorial assumes the user has a basic understanding of Materials.

In this tutorial you will learn how to create a simple two-sided foliage material for your projects. Nearly every output will be converted into a parameter for instancing.

Setup
-----

1\. Create a new blank project with Starter Content.

2\. Create a new Default Level

3\. Place two of the 'SM\_Bush' actors (found in the Content Browser) side by side on the floor within the level.

4\. Locate and duplicate the Material used for the 'SM\_bush' and rename it to something like 'M\_TwoSided'

5\. Set the Blend Mode to Masked, the Shading Model to Two Sided, and check the Two Sided option.

6\. Now create a Vector Parameter by pressing the 'V' key and clicking in the material graph. Name this Subsurface Color.

7\. Create a Multiply node and plug the Subsurface Color into the 'B' input and the Diffuse Texture Sample into the 'A' input.

8\. Plug the result of your Multiply into the Subsurface Color input of your material.

9\. Create another Multiply node and plug the Alpha channel from the Diffuse Texture Sample into the 'A' input.

10\. Create a Scalar Parameter by holding the 'S' key and clicking in the material graph. Name this 'Opacity' and plug this into the 'B' input of your multiply.

11\. Plug the output of your multiply into the Opacity input of your material.

12\. Create two scalar parameters and name one Specular and one Roughness. Plug them into their respective inputs of your material. Apply and Save!

[![](https://d26ilriwvtzlb.cloudfront.net/d/de/MaterialCreation.png)](/index.php?title=File:MaterialCreation.png)

Final Material Connections and Properties

Final Result
------------

Below are the results you should get when applied as a Material Instance after slightly tweaking the parameters.

[![](https://d26ilriwvtzlb.cloudfront.net/2/24/FinalOutcome.png)](/index.php?title=File:FinalOutcome.png)

Left: Default Material Right: Two-Sided Material

[![](https://d26ilriwvtzlb.cloudfront.net/c/cc/ParameterSettings.png)](/index.php?title=File:ParameterSettings.png)

Material Parameter settings

Thanks for following along! I have written some more tutorials you can check out by following the links within my Wiki Profile page found below.

[Andrew Hurley Wiki Profile Page](/index.php?title=User:AndrewHurley "User:AndrewHurley")

**Written by:**

Andrew Hurley

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Two-Sided\_Foliage\_Material&oldid=325](https://wiki.unrealengine.com/index.php?title=Two-Sided_Foliage_Material&oldid=325)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Material](/index.php?title=Category:Material "Category:Material")
*   [Epic Created Content](/index.php?title=Category:Epic_Created_Content "Category:Epic Created Content")