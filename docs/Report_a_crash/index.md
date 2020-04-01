Report a crash - Epic Wiki             

Report a crash
==============

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

How To Report a Crash
=====================

So you were working on your project in Unreal Engine 4, and everything was going smoothly. You were in the zone, and nothing was going to stop you from getting a lot of stuff done today. Suddenly, everything comes to a screeching halt because the Editor just crashed. Unfortunately, this does happen occasionally. So what now?

First of all… “DON’T PANIC.” Unless you have turned autosave off (not recommended) or changed it to a really long time period (also not recommended), you most likely have not lost much work.

You should now put yourself into information gathering mode. When the Engine crashed, it should have opened the crash report tool (there are some rare instances when this does not happen). Copy the information displayed there and paste it into a Word document for safe keeping, then fill in a brief summary of what you were doing just before the crash occurred at the top of the window and submit the report.

Make a new Info folder and place the document containing the information from the crash report tool inside it. Locate the most recent .log and .dmp files for your project (..\\YourProject\\Saved\\Logs\\) and _copy_ and _paste_ them into the new folder. Also, locate the most recent CrashReportClient.log file, if you have one, and _copy_ and _paste_ it into the new folder.

Re-open your project in the Editor and respond to any prompts that you see in the bottom corner of the screen. If all is well, and it should be, this will put you back to where you were a few minutes before the crash occurred. Slowly start working your way towards where you were when the crash occurred, taking careful note of what you are doing and how you are doing it (details are often critical here!). If you see the crash happen again, that is good. Replace everything you placed in the Info folder you created previously with the information from the new crash.

Now open a new project in the Editor using a template that corresponds to the type of game you are making in your project. Using what you learned in the previous paragraph when reproducing the crash in your own project, try to get the Editor to crash in the new project. If the crash happens again, that is great. Replace everything in the Info folder again with the information for the newest crash. Feel free to repeat these steps as many times as you feel necessary to narrow down as much as possible what is triggering the crash.

Now it is time to let us know what is happening. Go to the AnswerHub and create a new post. For your Question, enter a summary of the crash that you experienced. Set the section to Bug Reports. In the body of your post, use the following format:

> **Branch:** Are you using the binary version of the Engine installed by the Launcher, or did you build the Engine using source code from GitHub?
> 
> **Version:** What version of the Engine are you currently using? You can find this in the Editor by going to Help -> About Unreal Editor. Please be as specific as possible. Don’t just say “4.3” or “4.4”. Tell us if you are using 4.3.0 or 4.4.1. You may also see a string of seven digits after the version number in the About Unreal Editor window (eg. 2256484), please include that number as well.
> 
> **Detailed Description:** Use this to expand on the summary you entered for your question. Give us as much detail here as possible. What were you doing when the crash happened? What had you done leading up to the crash? Were you able to reproduce this in a new project, or does it only happen in your own project? Were you able to narrow down what causes the crash to happen? The more information you can provide here related to the crash, the better. Include any code you are using.
> 
> **Screenshots/Link to Video:** If you have a screenshot of a specific Blueprint setup that you think may be causing the crash, or a video of something happening in PIE mode that results in a crash, please include that here. This is optional, but potentially very helpful.
> 
> **Repro Steps:** This section is critical! Be as detailed and specific as possible, and it is often helpful to assume that the person reading the steps has no idea what you are doing. For example…
> 
> Bad:
> 
> 1.  Make new Blueprint
> 2.  Add chair mesh
> 3.  Add sphere mesh
> 4.  Compile
> 
> Good:
> 
> 1.  Create new project using First Person Code template
> 2.  Make new Actor Blueprint
> 3.  Add Static Mesh Component
> 4.  Set Static Mesh Component to use the “SM\_Chair” static mesh
> 5.  Add another Static Mesh Component
> 6.  Set new Static Mesh Component to use the “MaterialSphere” static mesh
> 7.  Click Compile in the Blueprint Editor window
> 
> **System Specs:** This is also optional in most cases, unless you suspect the crash may be related to your hardware. It doesn’t hurt to attach your dxdiag information anyway.
> 
> **Attachments:** This is where you will want to attach all of the files you were saving previously (you may want to save any Word documents as text files to simplify things).

Before we can fix something we need to be able to reproduce it, so the more detailed and specific your information is, the faster we will be able to identify what is going on. Please don’t be frustrated if we ask for more information, or request clarification of a detail. We want to be able to reproduce the crash so we can get started on correcting it, and we may be doing something slightly differently than you which allows everything to work normally (which is why the repro steps are critical!).

Author: [Tim Lincoln](/User:Tim_Lincoln "User:Tim Lincoln") ([talk](/index.php?title=User_talk:Tim_Lincoln&action=edit&redlink=1 "User talk:Tim Lincoln (page does not exist)")) 19:54, 4 September 2014 (UTC)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Report\_a\_crash&oldid=8885](https://wiki.unrealengine.com/index.php?title=Report_a_crash&oldid=8885)"