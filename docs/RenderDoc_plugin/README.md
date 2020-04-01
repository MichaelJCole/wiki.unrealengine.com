RenderDoc plugin - Epic Wiki                    

RenderDoc plugin
================

  

Name

RenderDoc Plugin

Category

Debugging, Rendering, Shaders

Author

Fredrik Lindh

Version

Alpha 1

UE4 Build

4.7.0

Overview
========

This plugin integrates the RenderDoc shader debugger with UE4. You can get the latest source code at: [https://github.com/Temaran/UE4RenderDocPlugin](https://github.com/Temaran/UE4RenderDocPlugin) Make sure to check out the appropriate r/ branch for your Unreal Engine version!

Key Features
------------

*   It detects your current installation of renderdoc, so you are not bound to the version I use, and can update at will as long as the API is compatible.

If you don't have an installation, and have just downloaded a zip, built it yourself etc. It will prompt for a path. Or you could set the path yourself in your project game.ini under \[RenderDoc\] BinaryPath=PATHGOESHERE

*   It adds capture buttons to all viewports of the editor. This means you no longer have to cycle swap chains to get to the element you want. When you press the capture button (or its hotkey) it will capture the window the viewport

is attached to, and then launch renderdoc with that capture as argument. It also opens a connection to renderdoc so you can perform subsequent captures etc.

*   Options menu button next to the capture button. This small window lets you set several properties that control how the plugin operates:

The settings are:

*   Capture callstacks

Save the call stack for every draw event in addition to the event itself. This is useful when you need additional information to solve your particular problem.

*   Capture all resources:

Capture all resources, including those that are not referenced by the current frame.

*   Save all initial states

Save the initial status of all resources, even if we think that they will be overwritten in this frame.

Installation
------------

To install the plugin, simply clone this git-repo to your project/plugins/ folder: [https://github.com/Temaran/UE4RenderDocPlugin](https://github.com/Temaran/UE4RenderDocPlugin)

You can also add it to your engine plugins, although I personally prefer project installation.

You also need a compatible version of renderdoc. You can find the newer binary releases here: [https://renderdoc.org/builds](https://renderdoc.org/builds)

Or you can clone this repo and build it yourself if you prefer: [https://github.com/baldurk/renderdoc](https://github.com/baldurk/renderdoc)

Each release branch of the plugin is tested with a certain version of renderdoc, so if the latest version of renderdoc does not work (due to API changes or bugs for example), you should be able to get the version that the branch is tested for and use that.

Links
-----

RenderDoc Plugin repository: [https://github.com/Temaran/UE4RenderDocPlugin](https://github.com/Temaran/UE4RenderDocPlugin)

RenderDoc repository: [https://github.com/baldurk/renderdoc](https://github.com/baldurk/renderdoc)

RenderDoc build link: [http://renderdoc.org/builds](http://renderdoc.org/builds)

RenderDoc video tutorials: [https://www.youtube.com/watch?v=EMFG...tYkxKiCDl4UO1Q](https://www.youtube.com/watch?v=EMFG...tYkxKiCDl4UO1Q)

\--[Temaran](/index.php?title=User:Temaran&action=edit&redlink=1 "User:Temaran (page does not exist)") ([talk](/index.php?title=User_talk:Temaran&action=edit&redlink=1 "User talk:Temaran (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=RenderDoc\_plugin&oldid=13436](https://wiki.unrealengine.com/index.php?title=RenderDoc_plugin&oldid=13436)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)