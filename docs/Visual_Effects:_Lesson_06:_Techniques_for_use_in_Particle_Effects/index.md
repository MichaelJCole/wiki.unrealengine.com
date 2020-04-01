Visual Effects: Lesson 06: Techniques for use in Particle Effects - Epic Wiki                    

Visual Effects: Lesson 06: Techniques for use in Particle Effects
=================================================================

  

Techniques for using Particle Effects in Unreal Engine 4.0
----------------------------------------------------------

**Beginner Level**

Prerequisite – Lesson 05: This lesson builds directly on 05, I advise at least reading it quickly.

\-Advanced Curve editing techniques in Cascade, for faster modification, iteration times.

This lesson will cover some of the less ‘Sexy’ aspects of FX creation. Quickly editing Color, Size, ScaleColor, and just about any other value over the lifetime of a sprite, mesh, light, etc. in Cascade is a fundamental part of making FX.

I am going to take some time and cover some of the basics of curve editing, and then get into more advanced features to help you quickly modify attributes of an effect with a high level of precision.

I will make my best effort to be as detailed as possible and include plenty of images, but if you are not 100% familiar with the curve editor now might be a good time to quickly read this page.

[https://docs.unrealengine.com/latest/INT/Engine/Rendering/ParticleSystems/Cascade/index.html#curveeditor](https://docs.unrealengine.com/latest/INT/Engine/Rendering/ParticleSystems/Cascade/index.html#curveeditor)

Let’s get started by duplicating the effect we created for Lesson 05, and name it something like _P\_CurveEdit_. Double-click your effect to open Cascade. If you don’t have the effect from the previous lesson, take a minute and review Lesson 05 and create that effect really quickly.

Set your **Spawn rate** to a value of 1.

[![VisualEffects Lesson 06pic1.png](https://d26ilriwvtzlb.cloudfront.net/e/e0/VisualEffects_Lesson_06pic1.png)](/File:VisualEffects_Lesson_06pic1.png)

  
Make sure your **Lifetime** is set to 1.

[![VisualEffects Lesson 06pic2.png](https://d26ilriwvtzlb.cloudfront.net/c/cb/VisualEffects_Lesson_06pic2.png)](/File:VisualEffects_Lesson_06pic2.png)

  
Next, map your Scale **Color/Life** module to the Curve Editor timeline by clicking on the small graph icon.

[![VisualEffects Lesson 06pic3.png](https://d26ilriwvtzlb.cloudfront.net/e/ec/VisualEffects_Lesson_06pic3.png)](/File:VisualEffects_Lesson_06pic3.png)

  
Press the **All** button in the Curve Editor to frame up your curves.

[![VisualEffects Lesson 06pic4.png](https://d26ilriwvtzlb.cloudfront.net/2/21/VisualEffects_Lesson_06pic4.png)](/File:VisualEffects_Lesson_06pic4.png)

  
If you are using the duplicate effect from the previous lesson, you might have something like this on your timeline.

[![VisualEffects Lesson 06pic5.png](https://d26ilriwvtzlb.cloudfront.net/c/c3/VisualEffects_Lesson_06pic5.png)](/File:VisualEffects_Lesson_06pic5.png)

  
If not, set up your color/alpha curves to be similar and then **disable** the view of the **ColorScaleOverLife** curve with the radial button in the curve editor.

[![VisualEffects Lesson 06pic6.png](https://d26ilriwvtzlb.cloudfront.net/b/be/VisualEffects_Lesson_06pic6.png)](/File:VisualEffects_Lesson_06pic6.png)

  
This time, instead of pressing the ‘All’ button to frame up your alpha curve, try holding Shift+Z key and move your mouse while holding the left mouse button. This will scale the curve view vertically, shrinking your curve in the view.

[![VisualEffects Lesson 06pic7.png](https://d26ilriwvtzlb.cloudfront.net/6/64/VisualEffects_Lesson_06pic7.png)](/File:VisualEffects_Lesson_06pic7.png)

  
Now press the All button to frame up your curve on the timeline.

Try holding Shft+Z and moving your mouse from side to side while holding the right mouse button, this will scale your curve horizontally in the view.

[![VisualEffects Lesson 06pic8.png](https://d26ilriwvtzlb.cloudfront.net/0/06/VisualEffects_Lesson_06pic8.png)](/File:VisualEffects_Lesson_06pic8.png)

  
You can tell when you have effectively entered the Zoom/Scale mode by watching the Pan/Zoom icons change above the graph.

[![VisualEffects Lesson 06pic9.png](https://d26ilriwvtzlb.cloudfront.net/d/d5/VisualEffects_Lesson_06pic9.png)](/File:VisualEffects_Lesson_06pic9.png)

  Zooming in and out like this can be very helpful when you are trying to time up the alpha fade in/out of your alpha curve against the playback speed of a SubUV image sequence. Sometimes, I ease my SubUV playback in and out, depending on my alpha settings, so I get the most out of the frames in my image sequence. Or, perhaps there is a particular frame that has an element in it I want highly visible for a moment in time. Being able to scale a 0,1 curve in the view against a 0,63 curve can be very helpful.

[![VisualEffects Lesson 06pic10.png](https://d26ilriwvtzlb.cloudfront.net/7/74/VisualEffects_Lesson_06pic10.png)](/File:VisualEffects_Lesson_06pic10.png)

  
Don’t worry about adding a SubUV index to your effect, I just wanted to better illustrate the point I was trying to make 

Next, let’s hit the ‘All’ button again to frame the entire alpha curve in range.

Since this tutorial is about more advanced curve editing techniques, I am going to assume you already know how to move points along the curve, but let’s say you want to scale one of the values on your curve, and you need to do it precisely.

This is very easy in the curve editor. Marquee select your curve tangent, right-click, choose **scale Values**, and enter a value in the field of 4.133.

[![VisualEffects Lesson 06pic11.png](https://d26ilriwvtzlb.cloudfront.net/b/b7/VisualEffects_Lesson_06pic11.png)](/File:VisualEffects_Lesson_06pic11.png)

  
 

Note that if your initial value was 1, your new value for point 1 on your curve is now precisely 4.133.

[![VisualEffects Lesson 06pic12.png](https://d26ilriwvtzlb.cloudfront.net/1/17/VisualEffects_Lesson_06pic12.png)](/File:VisualEffects_Lesson_06pic12.png)

  
Set the value back to 1 on the curve using the field shown above.

Now, let’s say you want to offset the entire curve, not just one point on the curve.

Using the same curve editing interface on the left of the curve editor, enter a value of .5 in the 0, and 2 positions.

[![VisualEffects Lesson 06pic13.png](https://d26ilriwvtzlb.cloudfront.net/2/2f/VisualEffects_Lesson_06pic13.png)](/File:VisualEffects_Lesson_06pic13.png)

  
[![VisualEffects Lesson 06pic14.png](https://d26ilriwvtzlb.cloudfront.net/b/bf/VisualEffects_Lesson_06pic14.png)](/File:VisualEffects_Lesson_06pic14.png)

  
Your curve should now map from .5 to 1 to .5 over the lifetime of the particle.

Marquee select the entire curve, right-click, and Scale your values by 1.5.

[![VisualEffects Lesson 06pic15.png](https://d26ilriwvtzlb.cloudfront.net/a/a7/VisualEffects_Lesson_06pic15.png)](/File:VisualEffects_Lesson_06pic15.png)

  
In the previous example, scaling by hand would be pretty straight forward, but with a curve like the one below, things might get a bit more hectic if you just wanted to punch your alpha up a bit…

[![VisualEffects Lesson 06pic16.png](https://d26ilriwvtzlb.cloudfront.net/5/5f/VisualEffects_Lesson_06pic16.png)](/File:VisualEffects_Lesson_06pic16.png)

  
  Precisely scaling a curve like this up, or down while retaining timing is a cinch with the marquee select feature.

[![VisualEffects Lesson 06pic17.png](https://d26ilriwvtzlb.cloudfront.net/2/20/VisualEffects_Lesson_06pic17.png)](/File:VisualEffects_Lesson_06pic17.png)

  
Let’s say we want to scale our size settings, which is often the case. Let’s go ahead and change the screen alignment mode of our sprite to be rectangle.

Click the Required Module and find the **Screen Alignment** drop down, click it and choose _PSA\_Rectangle_.

[![VisualEffects Lesson 06pic18.png](https://d26ilriwvtzlb.cloudfront.net/f/f0/VisualEffects_Lesson_06pic18.png)](/File:VisualEffects_Lesson_06pic18.png)

  
Select the **Initial Size** module and make sure your distribution is set to **Constant**.

[![VisualEffects Lesson 06pic19.png](https://d26ilriwvtzlb.cloudfront.net/4/45/VisualEffects_Lesson_06pic19.png)](/File:VisualEffects_Lesson_06pic19.png)

  
With Screen alignment set to Rectangle, if either of your X,Y vectors are set to 0 the particle will disappear. Set all of the values to 115.3315

[![VisualEffects Lesson 06pic20.png](https://d26ilriwvtzlb.cloudfront.net/8/80/VisualEffects_Lesson_06pic20.png)](/File:VisualEffects_Lesson_06pic20.png)

  
Now, let’s say hypothetically that 115.3314 is the perfect size for your particle along the X axis. For any random reason you can come up with, it just HAS to be that width, but you need it to be twice as tall as it is wide - precisely twice as tall and not a guess. Sure, you could do this math in your head with a bit of concentration…maybe if you block out the music on your headphones …

Or, you could just do the math right there in the field, in Cascade.

[![VisualEffects Lesson 06pic21.png](https://d26ilriwvtzlb.cloudfront.net/3/3d/VisualEffects_Lesson_06pic21.png)](/File:VisualEffects_Lesson_06pic21.png)

  
One of the best kept secrets about Cascade, the Material Editor and many other systems in UE4 is that you can do math, right in the input fields. So add \*2 to the end of your Y value and hit enter.

[![VisualEffects Lesson 06pic22.png](https://d26ilriwvtzlb.cloudfront.net/3/39/VisualEffects_Lesson_06pic22.png)](/File:VisualEffects_Lesson_06pic22.png)

Now your sprite size = 2\* the width with some basic math. This can be incredibly handy when trying to tweak mesh emitter sizes based on values to which you construct your mesh in an external package, especially if you are using a mesh to convey gameplay specific areas such as a Heal Aura, or an area of Denial.

It is also helpful to keep in mind, anything you can marquee select in the Curve editor can have the same scale values applied to them in one go. If you need to scale Color and Alpha across multiple modules, do it in the Curve Editor to get it done quickly and precisely.

[![VisualEffects Lesson 06pic23.png](https://d26ilriwvtzlb.cloudfront.net/9/9a/VisualEffects_Lesson_06pic23.png)](/File:VisualEffects_Lesson_06pic23.png)

  
Here, I selected the curve points for multiple modules, even an InitialColor module with no time mapping, and scaled their values by 1.5.

[![VisualEffects Lesson 06pic24.png](https://d26ilriwvtzlb.cloudfront.net/2/26/VisualEffects_Lesson_06pic24.png)](/File:VisualEffects_Lesson_06pic24.png)

  
Being able to scale your color values can be incredibly helpful if you have the perfect shade of Blue, for example, but you want to punch up the intensity a bit without fighting to keep the same hue.

Hopefully this workflow saves you some time when making tweaks to large complex FX.

*   [Go back to Lesson 05](/Visual_Effects:_Lesson_05:_Techniques_for_using_Particle_Effects "Visual Effects: Lesson 05: Techniques for using Particle Effects")
*   [Continue to Lesson 07 part A](/Visual_Effects:_Lesson_07A:_Using_GPU_Particle_Simulations "Visual Effects: Lesson 07A: Using GPU Particle Simulations")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Visual\_Effects:\_Lesson\_06:\_Techniques\_for\_use\_in\_Particle\_Effects&oldid=14665](https://wiki.unrealengine.com/index.php?title=Visual_Effects:_Lesson_06:_Techniques_for_use_in_Particle_Effects&oldid=14665)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Particle](/Category:Particle "Category:Particle")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)