Change rotate pivot - Epic Wiki                    

Change rotate pivot
===================

Overview
--------

**Rate this Video:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.8,4.9

This page provides a way to change the rotation pivot.

Tutorials
---------

For example, I want to implement a pendulum. My actor has a mesh of cylinder and code implementing the rotation. However, the pivot is not right.

[![](https://d26ilriwvtzlb.cloudfront.net/d/dc/Pend_ywj7931_1.png)](/File:Pend_ywj7931_1.png)

blueprint

[![](https://d26ilriwvtzlb.cloudfront.net/0/08/Pend_ywj7931_2.png)](/File:Pend_ywj7931_2.png)

blueprint

As shown in the video below, the pivot is at the bottom instead of the top.

Instead, we can clear the cylinder mesh of our pendulum actor. Then we create another new cylinder actor and make it the children of our pendulum actor.

[![](https://d26ilriwvtzlb.cloudfront.net/6/67/Pend_ywj7931_3.png)](/File:Pend_ywj7931_3.png)

blueprint

[![](https://d26ilriwvtzlb.cloudfront.net/2/27/Pend_ywj7931_4.png)](/File:Pend_ywj7931_4.png)

blueprint

Now, it swings like a pendulum.

You can change the position of the pendulum to change the rotation pivot, for example, you can move it to the middle point, so it rotates around the mid point:

[![](https://d26ilriwvtzlb.cloudfront.net/f/f9/Pend_ywj7931_5.png)](/File:Pend_ywj7931_5.png)

blueprint

This method should be helpful to implement hinged door or other stuff.

  
\-ywj7931

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Change\_rotate\_pivot&oldid=17353](https://wiki.unrealengine.com/index.php?title=Change_rotate_pivot&oldid=17353)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)