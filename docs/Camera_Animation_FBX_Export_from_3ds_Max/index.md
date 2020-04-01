Camera Animation FBX Export from 3ds Max - Epic Wiki                    

Camera Animation FBX Export from 3ds Max
========================================

The process is simple, the steps are outline below, or you can consult this video:

[Exporting 3ds Max Camera animation to UE4](http://www.youtube.com/embed/RtKdJ9wZMls)

I will be posting a MaxScript soon, that shoudl streamline the process.

1.  Complete your camera animation.
2.  Create a Dummy/null at 0,0,0
3.  clone your original camera and parent it to the Dummy.
4.  rotate the dummy -90 degrees on the Z-Axis.
5.  create a new free camera
6.  Add a position constraint and select the first duplicate camera (the one attached to the null) as the source
7.  Do the same for Orientation.
8.  right click and choose "Wire Parameter", select the Object>Fov property, then in the scene selection, choose the original or cloned camera, and ensure the source camera is driving this clone's FOV value (you could do this for all params, but i'm not sure if near/far planes or other info comes over or is usable yet)
9.  Go to the Motion tab, select trajectories, set your sample range to the length of your animation, ensure the samples are set to the entirety of the range, then Collapse. you now have a camera that has all the relative transforms of the original, but rotated around the world, with no other hierarchy to interfere with the export.
10.  Select your export camera, choose Export>selected, write out your FBX, and import into matinee.

There you go! Nice, working camera animation that points where you want it!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Camera\_Animation\_FBX\_Export\_from\_3ds\_Max&oldid=5616](https://wiki.unrealengine.com/index.php?title=Camera_Animation_FBX_Export_from_3ds_Max&oldid=5616)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorial](/Category:Tutorial "Category:Tutorial")

  ![](https://tracking.unrealengine.com/track.png)