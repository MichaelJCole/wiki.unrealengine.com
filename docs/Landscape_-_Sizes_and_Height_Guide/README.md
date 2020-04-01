Landscape - Sizes and Height Guide - Epic Wiki                    

Landscape - Sizes and Height Guide
==================================

  
This is an integration to basic documentation for Unreal Landscape tool. After reading this document, you'll be able to obtain the exact size and vertex/meter resolution you need for your landscape,  
edit it and get the height you need for your mountains and hills.  

Let's get started!  

Landscape basics
----------------

A landscape is a subdivided plane with a density of 1 vertex per meter.  
At Z Scale = 100 it has an height range limit of -256m:256.  
If you understand these basic rules, you can get any size at any resolution with height extensions needed.  

Changing your size and height extensions
----------------------------------------

If you need a 2km wide landscape, but you think that a resolution of 1 vertex/ 2 meters is more than enough,  
and you want your mountains/hills to be 512 m tall, you can go like this:

1.  create a new landscape with 1009x1009 resolution (as usual, refer to [Landscape recommended size](https://docs.unrealengine.com/latest/INT/Engine/Landscape/TechnicalGuide/index.html#recommendedlandscapesizes))
2.  set X scale to 200.
3.  now your landscape will be not centered anymore: if you want it to be in center of the scene, you must adjust x and y location. you doubled the size of the landscape, so now it has an extent of 1009\*2 = 2018 m = 201800 cm(UE units) divide it by two (201800/2 = 100900) and insert them in x and y position of your Landscape actor with a MINUS sign.
4.  basic height extent is 256 at Z scale = 100, so to have it extended to 512, you must multiply Z scale by 2. So set Z scale = 200.
5.  edit your landscape freely

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Landscape\_-\_Sizes\_and\_Height\_Guide&oldid=22999](https://wiki.unrealengine.com/index.php?title=Landscape_-_Sizes_and_Height_Guide&oldid=22999)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Landscape](/Category:Landscape "Category:Landscape")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)