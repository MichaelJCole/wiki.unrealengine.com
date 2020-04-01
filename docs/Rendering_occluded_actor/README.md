Rendering occluded actor - Epic Wiki                    

Rendering occluded actor
========================

**Rate this Page:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.2.1

Overview
--------

Details

Created by: Satheesh PV (ryanjon2040)

Engine version: 4.2.1

In this tutorial i will show you how to render actors that are behind other objects. You might have seen this in some games like in [Batman Arkham Series](http://1.bp.blogspot.com/-mlVz5pxPoQU/Un07pqFo61I/AAAAAAAAk8I/ZUIB1Z6wwqM/s1600/Batman-Arkham_City_(PC)_23.jpg), [Evolve](http://i1.wp.com/www.tomlooman.com/wp-content/uploads/2014/05/evolve_outline_effect.jpg), [Left 4 Dead](http://i0.wp.com/www.tomlooman.com/wp-content/uploads/2014/04/left_4_dead_outlines.jpg) etc. First of all, create a new material and set its domain to Post-Process and set the material like below.

**Result: (Skip to 0:42)**

**Line Render**

[![](https://d3ar1piqh1oeli.cloudfront.net/c/cc/Tut_Occluded_Actor_Screen_1.png/180px-Tut_Occluded_Actor_Screen_1.png)](/File:Tut_Occluded_Actor_Screen_1.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Occluded_Actor_Screen_1.png "Enlarge")

Renders an outline on all objects in World.

  

**Scanlines**

[![](https://d3ar1piqh1oeli.cloudfront.net/2/20/Tut_Occluded_Actor_Screen_2.png/180px-Tut_Occluded_Actor_Screen_2.png)](/File:Tut_Occluded_Actor_Screen_2.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Occluded_Actor_Screen_2.png "Enlarge")

Shows horizontal bands across screen. Optional (Feel free to skip this step if you dont need it).

  

**Material Final Step**

[![](https://d3ar1piqh1oeli.cloudfront.net/6/66/Tut_Occluded_Actor_Screen_3.png/180px-Tut_Occluded_Actor_Screen_3.png)](/File:Tut_Occluded_Actor_Screen_3.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Occluded_Actor_Screen_3.png "Enlarge")

Connect the last node to Emissive.

  

**Material Parameter Collection**

[![](https://d3ar1piqh1oeli.cloudfront.net/1/10/Tut_Occluded_Actor_Screen_5.png/180px-Tut_Occluded_Actor_Screen_5.png)](/File:Tut_Occluded_Actor_Screen_5.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Occluded_Actor_Screen_5.png "Enlarge")

Material Parameter Collection that i used in above material.

  

Final
-----

[![Tut Occluded Actor Screen 4.png](https://d3ar1piqh1oeli.cloudfront.net/1/1f/Tut_Occluded_Actor_Screen_4.png/180px-Tut_Occluded_Actor_Screen_4.png)](/File:Tut_Occluded_Actor_Screen_4.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tut_Occluded_Actor_Screen_4.png "Enlarge")

  

Finally select your mesh and set Custom Depth to enabled. **Important:** Set Bounds Scale to a higher value (10) otherwise mesh might not render properly when behind another object.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Rendering\_occluded\_actor&oldid=8428](https://wiki.unrealengine.com/index.php?title=Rendering_occluded_actor&oldid=8428)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)