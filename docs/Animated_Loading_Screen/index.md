Animated Loading Screen - Epic Wiki                    

Animated Loading Screen
=======================

**Rate this Article:**

4.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif) (2 votes)

Approved for Versions:4.7

Contents
--------

*   [1 Overview](#Overview)
*   [2 Level Streaming](#Level_Streaming)
*   [3 So how did I use that to get a loading screen?](#So_how_did_I_use_that_to_get_a_loading_screen.3F)
*   [4 11 Short Steps to Create an Animated Loading Screen](#11_Short_Steps_to_Create_an_Animated_Loading_Screen)
*   [5 Wrap-Up](#Wrap-Up)

Overview
--------

The most common way of doing loading screens would be to have a static image just before the load happens and draw it on the screen again once the level had loaded (To give the impression of a seamless load even though the engine hangs when doing this!).

I managed to figure out a way to load levels with animated icons on screen… WITHOUT the engine hanging! That’s right!

So how did I do it?

Level Streaming
---------------

Some of you might not have a clue about “Level Streaming”. And that’s totally cool. Let’s have a super-quick overview of what “Level Streaming” is and how it can be used to create an awesome animated loading screen!

Level Streaming (In Unreal Engine 4): Level Streaming is a feature of Unreal Engine 4 that allows levels to be loaded and unloaded on the fly and gives the developer the extra ability to toggle their visibility all during play-time. This basically means that you can take a huge map and break it into tiny little chunks, Which can help massively with performance!

So how did I use that to get a loading screen?
----------------------------------------------

In a nutshell, What I did was have a level with a loading screen (Black screen) with a little rotating arrow on it. From there, I created a “Begin Play” in the level blueprint and connected that to an event called “Open Stream Level” (With the level that I wanted loaded in selected).

This node has an output called “Completed” which fires once the level has been loaded. So I created a quick Matinee (Which had a single Fade in > Fade Out track) and fired that once the level was loaded.

From there, I simply changed the active camera from the one in the “Loading level” to the one in the main level when the Matinee was completely faded out. Then once the camera change had happened, I fade back in and bam! The level is there, loaded and ready to go!

I know that reading that it sounds super complicated, When in actuality it’s super, super easy. For people who are new to Unreal Engine 4, it might sound like two paragraphs of alien language, But I’ll break down the process now for you to help you achieve what I created!

11 Short Steps to Create an Animated Loading Screen
---------------------------------------------------

Step #1 - I Went into Window > Levels

Step #2 - Created a New Level by going to “Levels” and selecting “Create new Level”

Step #3 - Moved all my main level stuff by highlighting it all in the editor window and selecting “Move Selected Actors to Level” via the “Levels” tab.

Step #4 - Created my load screen texture, camera and animated spinning icon and made sure they were in “Persistent Level”.

Step #5 - In the “Level Blueprint” (Of “Persistent Level”), I created a “Begin Play” event and created a “Open Stream Level” node and connected them both together.

Step #6 - I put the Level Name that I want loaded into the “Open Stream Level” and made sure “Block on Load” wasn’t ticked but “Make visible after load” was.

Step #7 - I created a Matinee with a “Fade” track and an “Event” track. I then made a quick fade in / Fade out / Fade in and put an event while the screen is supposed to be totally black.

Step #8 - I went back into the “Level Blueprint” and created the nodes to “Play” the Matinee once the level has been loaded.

Step #9 - I then added a “MatineeController” node and right-clicked and selected “Refresh nodes” to make my event I created in the Matinee to appear.

Step #10 - I added a node called “Remote Event” which searches all the Level Blueprints for the event in question to fire it.

Step #11 - In the “Level Blueprint” of the level that had just been loaded, I created an event that was called the same thing as the “Remote Event” and connected a “Get Player Controller > Set View Target with Blend” node to it.

And that was all I had to do!

See? 11 short steps to have a fully animated load screen. How awesome is that?!

Wrap-Up
-------

I now use this trick for every level in SUPER DISTRO. In cases where we’re moving from whole level to level (And not just loading a level in), I just fade to black with Matinee and then load in the next “Whole” level, fading in my loading screen on the next level once it’s loaded.

See? Super simple!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Animated\_Loading\_Screen&oldid=21066](https://wiki.unrealengine.com/index.php?title=Animated_Loading_Screen&oldid=21066)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Community](/index.php?title=Category:Community&action=edit&redlink=1 "Category:Community (page does not exist)")
*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)