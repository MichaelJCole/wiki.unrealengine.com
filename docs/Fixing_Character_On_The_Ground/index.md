Fixing Character On The Ground - Epic Wiki                    

Fixing Character On The Ground
==============================

Overview
--------

**Rate this Video:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.8,4.9

This page provides a way to fix objects on the ground by a constraint-based approach, a way you can more strictly control your character.

Tutorials
---------

Suppose we have a cube floating in the air, and we want to fix it on the ground.

[![](https://d26ilriwvtzlb.cloudfront.net/1/1f/Ywj2.png)](/File:Ywj2.png)

cube1

Firstly,let's create a new trace channel named "floor"; this can be done in the project setting.

[![](https://d26ilriwvtzlb.cloudfront.net/d/d4/Ywj4.png)](/File:Ywj4.png)

trace channel

Then we can attach a blueprint to the cube

[![](https://d26ilriwvtzlb.cloudfront.net/d/d6/Ywj1.png)](/File:Ywj1.png)

blueprint

Here we cast a ray from cube to a location far below the cube. Then the ray will collide with floor layer and return the information of the floor. Then we can get the location of the collision point. Then we set our cube's location to this point + the height of our object.

After finishing this, your object should attach to the ground now:

[![](https://d26ilriwvtzlb.cloudfront.net/5/5d/Ywj3.png)](/File:Ywj3.png)

cube2

\-ywj7931

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Fixing\_Character\_On\_The\_Ground&oldid=17204](https://wiki.unrealengine.com/index.php?title=Fixing_Character_On_The_Ground&oldid=17204)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)