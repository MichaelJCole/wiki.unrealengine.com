Creating A Tutorial - Epic Wiki                   

Creating A Tutorial
===================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Purpose](#Purpose)
*   [3 The Tutorial](#The_Tutorial)
*   [4 The Wrapper](#The_Wrapper)
*   [5 Closing](#Closing)

Overview
--------

In this tutorial I hope to outline methods and practices that assist in the composition of a tutorial.

Purpose
-------

The purpose for a tutorial on tutorials is mostly to present the possibility of a uniform format, thus presenting information for any audience that is both informative and fulfilling for all readers.

The Tutorial
------------

It is important, when writing a tutorial, to understand your audience. I don't mean know your audience; by understand I mean, don't assume anything, unless that assumption is that they know nothing about your topic. I know that most people seek out tutorials on things that they want to learn and as such will have a basic understanding of the topic, but in most cases it could be the most basic of understanding so try to explain everything as if it is new. Most people make the mistake of assuming that the reader knows as much as they do, that is a poor assumption.

This does not mean that you need to go over every system and sub-system that you touch, it just means that you can't jump right into advanced tutorials without some foundation. It is very often you will see tutorials in a numeric "to do" list. This works but most times the writer jumps right in with a "Do this and then do that" list that starts with the user already at a certain point. Well the user needs to know where the starting point is and how to get there. Again DO NOT assume anything. You probably do not need to do a tutorial like this:

1.  Open the editor
2.  Open your map
3.  Etc.

But does it hurt to do so? No it doesn't, so where it applies, start from the very beginning. This is evermore crucial if you choose not to use video or images. When this is the case, the end user must be able to envision what they should be seeing and in this case step by step needs to start at the very beginning so they can follow along for every step.

How about an example:

Tutorial: Add a particle effect to a custom trigger.

1.  In your blueprint add the particle effect that you want to use.
2.  Add a node to toggle visibility.
3.  Set the bool to true if the player enters the trigger volume.
4.  Compile and save the blueprint.
5.  Test level.

What is wrong with that tutorial? Well, if you understand how all of these systems work, that is enough information. I understand the system and I still think that it is a little weak because it assumes too much of the reader. I see MANY tutorials like this. So I will go over with, what I think, is the problem.

The reader needs to know how to do the following things:

1.  How to create a blueprint. Not just any blueprint, but a class blueprint. Should they already know this? Maybe but does it really hurt to remind even veteran users how to do this in 10 words or less? No it doesn't, so don't be lazy.
2.  This also assumes the user knows how to make a trigger volume...but in reality to a new user this is not going to be easily apparent to them how to do it, so tell them.
3.  Blueprints have multiple tabs, I call them tabs but that might be confusing to some so use images whenever possible, and these tabs have different features. So Show them where to add a node and where to add the particle effect.
4.  Nodes can also be very convoluted because many of them will be created locally as variables or need to be sent from another function to be visible. Also tell the user how to create or where to find a node. It doesn't hurt to add a side note of what the node can do and what all the pins represent.
5.  In the above i also didn't explain how to get/set a bool, how to create one if necessary, or how to pass the output of the trigger to the bool. I know how to do it, but my reader may not and there are some check boxes involved to set the bool and make the effect visible. It is important to be clear on your instructions.
6.  Compile, save and test. These again seem very simple...but this tutorial could be the very first steps in blueprints for the user. It may only take another minute of writing to explain how and why to do these steps in this order. For instance, blueprints need to be compiled before changes will start to work. The reader may have never made a blueprint yet and this is a pretty important piece of information to them.

Pictures and video are important pieces of the puzzle too, but they can be very misleading. Videos are great but the same rules apply, move at a speed the viewer can keep up with. If you do something on screen explain it and if you forget to explain it then put text overlay before posting the video. Other options include a text walk-through with times, ie. "At 1:30 in the video I actually pressed Control-S to save but you could not see that". Videos can get out of control very fast because people inexperienced in making them have no logical order, spend a lot of time in silence, or the video gets really long while the teacher fumbles about their words or has complications with their tasks so video editing is important...don't overlook it.

Photos can also be misleading if they are not explained properly. Good descriptions and even overlay text and arrows, etc., help the reader understand what they are looking for.

**Tips:**

*   try to avoid tech Jargon when first explaining things to the user: Bools = Booleans and are representative of a true/false statement.
*   Use descriptive titles: Tutorial: Skill Level: Assets OR Creating a custom player: Intermediate: Video and Walkthrough
*   Start the tutorial with an example of the finished product. This can be an image or a video, either way it gives the reader a visual idea of how the final product should be. This could easily be added to the "Overview" section (See 'The Wrapper' below).

The Wrapper
-----------

This is the MOST absent feature of tutorials.

In short it is all of the info the reader needs, with none of the tutorial. Here is an example of a wrapper:

**Overview** What you intend to teach the reader.

**Purpose** Why does the reader need to know this and how does it fall into the "Big Picture"?

**Tutorial** This is the body of the tutorial. Tell it like a story, start from the beginning and end at the end. Leave no stone unturned because if they are reading it, they are depending on you to help them overcome a problem.

**Recap** Here you go over what the end result should have been and if possible what reasons this could be useful. An example, if I taught a reader how to use bools I would go over some additional cases where this tutorial can come in handy using bools for other tasks.

**Potential Issues** Tell the reader what issues they could run into and especially include issues that you ran into and how you fixed them.

**Tech Specs** It doesn't hurt to tell the reader the specs of the hardware/software you are using: UE4 version 4.0.2 for MacOS

Closing
-------

Of course THIS tutorial deviates a bit from my suggested format, it contains suggestions that are directly targeted towards a tech tutorial where THIS tutorial is only a basic theory or practice that I feel would help the community grow. With all things considered I would love to expand this with help and feedback so that we can create standards in how we share information in hopes to create a very strong community helping each other.

Thank you for taking the time to read and consider.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_A\_Tutorial&oldid=3764](https://wiki.unrealengine.com/index.php?title=Creating_A_Tutorial&oldid=3764)"

  ![](https://tracking.unrealengine.com/track.png)