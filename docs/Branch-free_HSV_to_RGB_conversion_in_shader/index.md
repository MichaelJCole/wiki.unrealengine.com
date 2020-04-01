Branch-free HSV to RGB conversion in shader - Epic Wiki                    

Branch-free HSV to RGB conversion in shader
===========================================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.8

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png)

**Some or all of the information on this page is inconsistent, irrelevant or confusing.**

Please help clean it up if you are able.

Original Author: [DarthCoder](/User:DarthCoder "User:DarthCoder") ([talk](/index.php?title=User_talk:DarthCoder&action=edit&redlink=1 "User talk:DarthCoder (page does not exist)"))

Certain color operations can become far easier in HSV color space, unfortunately Unreal 4 includes only an RGB to HSV shader node in the engine by default. This is a simple HSV to RGB conversion shader function based on the branch-free function found on the [lolengine](http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl) blog.

[![Hsv-to-rgb-material-function.jpeg](https://d26ilriwvtzlb.cloudfront.net/7/75/Hsv-to-rgb-material-function.jpeg)](/File:Hsv-to-rgb-material-function.jpeg)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Branch-free\_HSV\_to\_RGB\_conversion\_in\_shader&oldid=17083](https://wiki.unrealengine.com/index.php?title=Branch-free_HSV_to_RGB_conversion_in_shader&oldid=17083)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)