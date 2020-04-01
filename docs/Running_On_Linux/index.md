Running On Linux - Epic Wiki                    

Running On Linux
================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (2 votes)

Approved for Versions:(please verify)

Once you have successfully [compiled the Editor](/Building_On_Linux "Building On Linux") in Linux, this page will provide you with additional information on running it. The main page is [Linux support](/Linux_Support "Linux Support").

  

Contents
--------

*   [1 Open Source (Mesa) Drivers](#Open_Source_.28Mesa.29_Drivers)
    *   [1.1 Ubuntu 14.04.1/2 LTS](#Ubuntu_14.04.1.2F2_LTS)
    *   [1.2 Fedora](#Fedora)
    *   [1.3 Arch](#Arch)
*   [2 Nvidia drivers](#Nvidia_drivers)
    *   [2.1 Ubuntu 14.04.1/2 LTS](#Ubuntu_14.04.1.2F2_LTS_2)
*   [3 "Building static mesh...", various malloc crashes, and mangled gizmo (XYZ axes)](#.22Building_static_mesh....22.2C_various_malloc_crashes.2C_and_mangled_gizmo_.28XYZ_axes.29)
*   [4 Font Corruption](#Font_Corruption)
*   [5 OpenGL versions](#OpenGL_versions)
*   [6 Nvidia Optimus](#Nvidia_Optimus)
*   [7 UnrealLightmass](#UnrealLightmass)
*   [8 Editor](#Editor)
    *   [8.1 Multi Desktop not supported](#Multi_Desktop_not_supported)
    *   [8.2 Pan, Orbit, Zoom and Copy](#Pan.2C_Orbit.2C_Zoom_and_Copy)
        *   [8.2.1 Xfce](#Xfce)
        *   [8.2.2 Unity](#Unity)
        *   [8.2.3 Gnome](#Gnome)
    *   [8.3 Source Code Accessors](#Source_Code_Accessors)
        *   [8.3.1 Qt](#Qt)
        *   [8.3.2 VIM or EMACS](#VIM_or_EMACS)
        *   [8.3.3 CodeLite](#CodeLite)

Open Source (Mesa) Drivers
==========================

If you use Mesa drivers use at least version >= 10.4.x . Better use newer ones.

Ubuntu 14.04.1/2 LTS
--------------------

The standard Mesa drivers in Ubuntu 14.04.1/2 LTS has the version 10.1.3 and will not be sufficient for UE4Editor. You can use the Oibaf ppa which updates your mesa drivers almost everyday to the newest version. Read [Oibaf PPA](https://launchpad.net/~oibaf/+archive/ubuntu/graphics-drivers) for more information. In the following are the steps how to use Oibaf to get the newest and "Up to Date" Mesa drivers.

1.  sudo apt-add-repository ppa:oibaf/graphics-drivers
2.  sudo apt-get update
3.  sudo apt-get dist-upgrade

Restart your system just in case.

Fedora
------

The Mesa drivers come in a set of packages named "mesa-"; so e.g. from a terminal,

 rpm -qa | grep ^mesa-

… yields the version numbers currently installed.

These are typically updated with the rest of the system, and as of Fedora 21 in Feb 2014, are version 10.4 (note that mesa-libGLU uses its own version numbering scheme). The lower-level drivers are in mesa-dri-drivers.

From the desktop (in a Terminal) you can run

 pkcon update mesa-dri-drivers

(which uses the Gnome authentication; you usually must be an administrator, i.e. a member of group "wheel") Or on current Fedora

 sudo dnf upgrade mesa-dri-drivers

On Fedora 19 or 20 perhaps

 sudo yum upgrade mesa-dri-drivers

(Again, just running Software Update will normally do this along with every other package)

You could also use a program like "yumex" in the GUI to explore the package system. (The default "Software" program doesn't provide visibility to system libraries like this.)

Newer releases go to the Testing repository before going to Updates, which is normally disabled, but you can activate it for one transaction with a line like

 sudo dnf --enablerepo=updates-testing upgrade mesa-dri-drivers

(or the same using Yum on ƒ20)

NB "dnf update" will do approximately the same thing as "dnf upgrade," but is more conservative about removing old packages and such.

Arch
----

sudo pacman -S mesa

If you are still experiencing crashes on Static Mesh generation or going through CacheOptimizeIndexBuffer function, see the following Answer Hub page for a possible resolution: [https://answers.unrealengine.com/questions/191581/crash-in-cacheoptimizeindexbuffer-on-editor-startu.html](https://answers.unrealengine.com/questions/191581/crash-in-cacheoptimizeindexbuffer-on-editor-startu.html)

Nvidia drivers
==============

You should get the newest drivers for Nvidia based gfx cards. Don't use the 331.x drivers because they might cause problems.

### Ubuntu 14.04.1/2 LTS

1.  sudo add-apt-repository ppa:xorg-edgers/ppa
2.  sudo apt-get update
3.  sudo apt-get install <package name>

<package name> can be like nvidia-349. Check the list which drivers are supported.See here [xorg-edgers](http://www.ubuntuupdates.org/ppa/xorg-edgers) for more information.

"Building static mesh...", various malloc crashes, and mangled gizmo (XYZ axes)
===============================================================================

As reported here: [https://answers.unrealengine.com/questions/183259/bug-ue4editor-manipulation-axis-rendering-error.html](https://answers.unrealengine.com/questions/183259/bug-ue4editor-manipulation-axis-rendering-error.html)

Generally this happens with Mesa drivers.

Edit ConsoleVariables.ini and add r.TriangleOrderOptimization=2, if there's no such parameter, else change the value to 2 if the parameter is already there.

Font Corruption
===============

As outlined in the following Answer Hub reports:

[https://answers.unrealengine.com/questions/117323/editor-rendering-problems.html](https://answers.unrealengine.com/questions/117323/editor-rendering-problems.html) [https://answers.unrealengine.com/questions/161055/font-problem-with-ue4editor.html](https://answers.unrealengine.com/questions/161055/font-problem-with-ue4editor.html)

[![Font Corruption Linux.png](https://d3ar1piqh1oeli.cloudfront.net/e/e2/Font_Corruption_Linux.png/400px-Font_Corruption_Linux.png)](/File:Font_Corruption_Linux.png)

If you are experiencing screen/font corruption that looks like the image above, please update your graphics drivers.

OpenGL versions
===============

If you have a graphics card and drivers that supports at least OpenGL 4.3 you can start the editor with the -opengl4 flag which will start the editor in OpenGL4 mode. This mode causes some issues in the editor's viewport, though. Here are some hints to make it work:

1.  Set the Anti-Alias level to "Medium"
2.  Switch off the Reflection Environment (r.ReflectionEnvironment=0) while using Reflection cubes or spheres (Sometimes necessary).

  

Nvidia Optimus
==============

If you're running on an computer with [Nvidia Optimus](http://en.wikipedia.org/wiki/Nvidia_Optimus%7C) (Intel and Nvidia on a laptop), run the Editor through _optirun_ or _primusrun_, otherwise you will run into OpenGL context issues and the editor will not run.

  

UnrealLightmass
===============

If your lighting is failing or stuck at 0%, make sure that your firewall is not blocking port 6666 and/or 230.0.0.1 network. It uses those for multicast operation, and is safe to open/enable in your firewall.

 sudo iptables -A INPUT -p UDP -d 230.0.0.1 --destination-port 6666 -j ACCEPT

Editor
======

Multi Desktop not supported
---------------------------

Do not try to use UE4Editor on separate "virtual" desktops. That means if you try for example to put a Blueprint, Matinee or the Cascade Editor window etc. into another virtual desktop, it will not work. You can use UE4Editor on multiple monitors.

Pan, Orbit, Zoom and Copy
-------------------------

The Unreal Editor supports Maya-style pan, orbit, and zoom viewport controls. Unfortunately it's using the ALT key on Windows which can be troublesome because that key is usually assigned to do other stuff in the world of X11/WM. To get the same behaviour like on Window change the assignment of the ALT key in you Window Manager.

### Xfce

Go to Settings menu, select Window Manager Tweaks and select the Accessibility tab. Change the field: Key used to grab and move windows. Select one which does not use the ALT key.

### Unity

Install Compiz Config Settings Manager (sudo apt-get install compizconfig-settings-manager in a terminal) and open it. Select "Window Management" and then the "Window Movement". Click on the button which is on the right side of the "Initiate Window Move" label. Select the "Enable" checkbox to disable or change it so that it does not conflict with other key combinations in UE4. Maybe "SHIFT" could be used.

### Gnome

Gnome 3 defaults to using the Super (Windows) key instead of Alt, which should work fine. If you need to change it, install Gnome Tweak Tool (sudo apt-get install gnome-tweak-tool) and open it. Select "Windows" on the left side, then change the "Window Action Key" setting.

Source Code Accessors
---------------------

If you get a message: Unable to create C++ template based projects because "an IDE is not installed", you need to add to **Engine/Config/Linux/LinuxEngine.ini**

     \[/Script/SourceCodeAccess.SourceCodeAccessSettings\]
     PreferredAccessor=QtCreatorSourceCodeAccessor

or

     \[/Script/SourceCodeAccess.SourceCodeAccessSettings\]
     PreferredAccessor=SensibleEditorSourceCodeAccessor

or

     \[/Script/SourceCodeAccess.SourceCodeAccessSettings\]
     PreferredAccessor=CodeLiteSourceCodeAccessor

and download the desired accessors from below

### Qt

 cd Engine/Plugins/Developer && git clone [https://github.com/fire/QtCreatorSourceCodeAccess](https://github.com/fire/QtCreatorSourceCodeAccess)

Additonally, you may wish to watch this video made by "Salamander Rake", which shows you how to create a kit in Qt Creator capable of compiling your project for in-IDE debugging and editor debugging.

[UE4Editor/UProject inside Qt Creator debugger](https://www.youtube.com/watch?v=RnINgMbJx5Q%7C)

### VIM or EMACS

 cd Engine/Plugins/Developer && git clone [https://github.com/fire/SensibleEditorSourceCodeAccess](https://github.com/fire/SensibleEditorSourceCodeAccess)

### CodeLite

If you are using Unreal Engine 4.9 >= you don't have to clone the accessor because CodeLite is fully integrated.

 cd Engine/Plugins/Developer && git clone [https://github.com/yaakuro/CodeLiteSourceCodeAccess](https://github.com/yaakuro/CodeLiteSourceCodeAccess)

<-- Back to the main [Linux Support](/Linux_Support "Linux Support") page.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Running\_On\_Linux&oldid=16067](https://wiki.unrealengine.com/index.php?title=Running_On_Linux&oldid=16067)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")
*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)