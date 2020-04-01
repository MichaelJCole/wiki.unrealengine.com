Debugging Unreal Shader Files - Epic Wiki                     

Debugging Unreal Shader Files
=============================

(Redirected from [Debugging Renderer Code](/index.php?title=Debugging_Renderer_Code&redirect=no "Debugging Renderer Code"))

**Rate this Article:**

3.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:(please verify)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Different ways to debug shaders](#Different_ways_to_debug_shaders)
*   [3 Getting renderdoc to capture a frame from the editor](#Getting_renderdoc_to_capture_a_frame_from_the_editor)
    *   [3.1 Renderdoc plugin for UE4](#Renderdoc_plugin_for_UE4)
    *   [3.2 Renderdoc settings file approach](#Renderdoc_settings_file_approach)
    *   [3.3 Single project setup](#Single_project_setup)
    *   [3.4 Multiple project setup](#Multiple_project_setup)
*   [4 Points to improve](#Points_to_improve)
*   [5 Summary](#Summary)

Overview
--------

Dear Community,

This tutorial will introduce one way to debug unreal shader files (USF-shaders) and the renderer in general using the renderdoc tool.

The reason why I chose this tool and not any other (PIX, NVidia nSight & Visual Studio's graphical diagnostics) is that they, in my experience, all crash when trying to capture logs from the editor process. These other tools might be more useful when trying to debug a game build, but as I have no interest in this personally, I have not explored this avenue. Another point in this case is that some operations, like utility render targets, are not available or are very hard to debug in a game build.

If you have questions for me, please ask them in the Discussion Tab. I and hopefully others can then answer those questions in this main page.

Different ways to debug shaders
-------------------------------

There are a multitude of ways in which a developer can debug shaders. The most basic way is to use visual studio's output window in conjunction with the -d3ddebug flag when launching your debug session. This technique is described in a cursory fashion in among other places this thread: [https://forums.unrealengine.com/showthread.php?6719-Debugging-USF-(Unreal-Shader-Files)](https://forums.unrealengine.com/showthread.php?6719-Debugging-USF-(Unreal-Shader-Files))

as well as in the official documentation: [https://docs.unrealengine.com/latest/INT/Programming/Rendering/index.html](https://docs.unrealengine.com/latest/INT/Programming/Rendering/index.html) [https://docs.unrealengine.com/latest/INT/Programming/Rendering/ShaderDevelopment/index.html](https://docs.unrealengine.com/latest/INT/Programming/Rendering/ShaderDevelopment/index.html)

This approach basically relies on outputting intermediate results to debug render targets. This process is fairly slow (since you need to recompile every time you want to set up a new test. It also assumes that you already have a running example with a render target set up which of course is not always the case. In addition to this, it does not provide much useful information of what is happening at the lower API levels. One reason for this is that the low level API's are abstracted in UE4's renderer behind a layer called the "RHI" (Rendering Hardware Interface) layer which provides a common way to interact with all supported graphics API's (DirectX 11 and OpenGL4 at the time of writing.)

To get this extra information then it seems, a specialized tool is required.

Enter renderdoc. Renderdoc comes with several advantages, some of them being:

*   It's open source: [https://github.com/baldurk/renderdoc](https://github.com/baldurk/renderdoc)
*   Subsequently, it is also completely free and easy to download and get started with
*   It's the only tool that does not crash on capturing a log at the time of writing
*   It is actively developed and has a fantastic community!

  
It is not without caveats at the moment though, as I will touch on later in the tutorial.

Getting renderdoc to capture a frame from the editor
----------------------------------------------------

Normally renderdoc is able to capture frames from graphical applications without any tinkering, but for reasons currently unknown to me, it will not attach to UE4 correctly without some extra love.

### Renderdoc plugin for UE4

The most practical way to approach the problem is to use the [RenderDoc plugin](/RenderDoc_plugin "RenderDoc plugin") for UE4, which can be found at: [https://github.com/Temaran/UE4RenderDocPlugin](https://github.com/Temaran/UE4RenderDocPlugin) The plugin loads Renderdoc into the editor process by default and lets you capture a frame and inspect it at any time. It does this by adding capture buttons to all open viewports. To create a capture log, click the corresponding button for the viewport, or use the hotkey (default Alt+F12) while a viewport has focus to capture it. When a capture command is given the plugin will launch the renderdoc UI for you soon after to let you begin debugging.

### Renderdoc settings file approach

If you do not want to use a plugin, you can instead create a renderdoc settings file and use that as a shortcut to launch your project. To set this up, follow these steps:

1.  Start renderdoc and press ctrl+N to start a new log capture session.
2.  Check the "Hook into children" and "Auto start" checkboxes
3.  Now add the executable path to your editor to the "executable path" textbox, it should look something like: "C:\\UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor-Win64-Debug.exe"
4.  Now set the working directory to the previous one without the file part, i.e. C:\\UnrealEngine\\Engine\\Binaries\\Win64\\ in the previous example.
5.  Finally add the path to your uproject file **in quotes** to the Command-line arguments textbox, for example: "C:\\My Projects\\Project\\Project.uproject"
6.  Save these settings to a file of your choosing.
7.  Finally, double click the file and set renderdoc as the default program and you're good to go.

Double clicking that file now should launch a renderdoc session for your project; a handy shortcut file for graphics debugging!

### Single project setup

If you are content with working on one game project at a time, this might be the easiest approach.

To set this up, first start the UE4 editor. This should load the project selector by default. First check the box in the bottom left called "Always load last project on startup" and then load the project. After it has loaded, turn the editor off again.

1.  Now start renderdoc (I am using v0.20 at the time of writing)
2.  Press ctrl+N to start a new log capture session, specify the executable path & working dir and launch the log session
3.  When the editor has launched, cycle the swap chain with F11 until it points to the main window. You can see which swap chain is active by looking at the white debug output text at the top of each window. The window with the active swap chain will display more information than the other windows (fps, frame count, capture info etc.). The windows that are inactive display a message telling you to press F11 to change swap chain.
4.  You can now capture frames using F12, the trigger capture button or PrintScrn
5.  After capturing a frame you should now be able to see it in renderdoc under the session window for the editor process. Double clicking any log in that window will load it as the current debugging session and you're good to go!
6.  If you are having problems after this I will have to defer you to the official documentation or the github discussion section.

github repository: [https://github.com/baldurk/renderdoc](https://github.com/baldurk/renderdoc)

documentation: [http://docs.renderdoc.org/](http://docs.renderdoc.org/)

  

### Multiple project setup

If you are working on more than one project at one time though, it becomes a bit more complicated, but this is one way to attach successfully:

1.  First start renderdoc (I am using v0.20 at the time of writing)
2.  Press ctrl+N to start a new log capture session, specify the executable path & working dir and check the "Hook Into Children" checkbox.
3.  Start the capture and choose your project in the UE4 launcher
4.  Go back to renderdoc, choose file->Inject into process and choose your editor process in the list, then inject with the default settings.
5.  Go back to UE4 and cycle the swap chain with F11 until it points to the main window. You can see which swap chain is active by looking at the white debug output text at the top of each window. The window with the active swap chain will display more information than the other windows (fps, frame count, capture info etc.). The windows that are inactive display a message telling you to press F11 to change swap chain.
6.  You can now capture frames using F12, the trigger capture button or PrintScrn
7.  After capturing a frame you should now be able to see it in renderdoc under the session window for the editor process. Double clicking any log in that window will load it as the current debugging session and you're good to go!
8.  If you are having problems after this I will have to defer you to the official documentation or the github discussion section.

github repository: [https://github.com/baldurk/renderdoc](https://github.com/baldurk/renderdoc)

documentation: [http://docs.renderdoc.org/](http://docs.renderdoc.org/)

Points to improve
-----------------

I am sure there will be tricks that will be unique for debugging UE4 that is not covered in the general renderdoc documentation. I encourage everyone to update this article with such information if you should come across it.

Also, updating renderdoc so the initialization-procedure is easier for UE4-users should also be a priority. As renderdoc is open source, this should be doable in a reasonable time-frame.

Summary
-------

Debugging shaders and rendering code with the official recommended debugging techniques can be time-consuming and inefficient. Unfortunately, most third party tools cannot capture logs from the UE4 editor. The notable exception to this is renderdoc which works if one observes certain caveats when setting the debugging session up.

I want to give thanks to the creator of Renderdoc (Baldurk) as he was instrumental in helping me figure out how to launch it like this until a better solution can be patched into the tool.

I would recommend everyone to check out the code at his github: [https://github.com/baldurk/renderdoc](https://github.com/baldurk/renderdoc)

  
Feel free to post new questions in the Discussion tab!

Hopefully this tutorial will save someone else some time when trying to figure this out :)

[Temaran](/index.php?title=User:Temaran&action=edit&redlink=1 "User:Temaran (page does not exist)") ([talk](/index.php?title=User_talk:Temaran&action=edit&redlink=1 "User talk:Temaran (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Debugging\_Unreal\_Shader\_Files&oldid=9145](https://wiki.unrealengine.com/index.php?title=Debugging_Unreal_Shader_Files&oldid=9145)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)