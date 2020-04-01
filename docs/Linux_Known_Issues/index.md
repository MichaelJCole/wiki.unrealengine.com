 Linux Known Issues - Epic Wiki             

 

Linux Known Issues
==================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Presently known issues with UE4 natively running in Linux. A page of bugs until we have a better solution for tracking. This page is part of the [Linux Support](/index.php?title=Linux_Support "Linux Support") area.

If you are looking on how to configure an IDE editor or how to run on Linux, check [Running On Linux](/index.php?title=Running_On_Linux "Running On Linux") area.

Contents
--------

*   [1 GenerateProjectFiles.sh/make \*\*\*](#GenerateProjectFiles.sh.2Fmake_.2A.2A.2A)
*   [2 General](#General)
    *   [2.1 Problems interfacing with third party libraries that use STL](#Problems_interfacing_with_third_party_libraries_that_use_STL)
*   [3 UE4Editor](#UE4Editor)
    *   [3.1 Building](#Building)
    *   [3.2 Running](#Running)
    *   [3.3 Loading C++ Project](#Loading_C.2B.2B_Project)
*   [4 UnrealFrontend](#UnrealFrontend)
*   [5 SDL2 issues](#SDL2_issues)
    *   [5.1 4.8 branch](#4.8_branch)
    *   [5.2 Official <= 4.7 branch](#Official_.3C.3D_4.7_branch)
*   [6 Performance Troubleshooting](#Performance_Troubleshooting)
*   [7 Getting GLSL shaders source](#Getting_GLSL_shaders_source)
*   [8 .desktop file template](#.desktop_file_template)
*   [9 Window Managers](#Window_Managers)
    *   [9.1 Xfce 4.10+](#Xfce_4.10.2B)
    *   [9.2 Unity](#Unity)
    *   [9.3 Gnome](#Gnome)
    *   [9.4 KDE](#KDE)

GenerateProjectFiles.sh/make \*\*\*
-----------------------------------

If you get an error like this:

**UnrealBuildTool Exception: System.Security.SecurityException: No access to the given key ---> System.UnauthorizedAccessException: Access to the path "/etc/mono/registry" is denied.**

you need to:

$ export MONO\_REGISTRY\_PATH=~/.mono/registry

otherwise you can create the default registry path with:

$ sudo mkdir -p /etc/mono/registry/LocalMachine

  
If you get a following error:

**Localisation.Automation.cs(156,96): error CS0234: The type or namespace name \`LocaleCodeHelper' does not exist in the namespace \`OneSky'. Are you missing an assembly reference?**

from your engine root folder do:

$ cd Engine/Source/ThirdParty/OneSky
$ xbuild OneSky.csproj /verbosity:quiet /nologo /p:TargetFrameworkVersion=v4.0 /p:Configuration="Release"
$ cd -
$ cp Engine/Source/ThirdParty/OneSky/bin/Release/OneSky.dll Engine/Binaries/DotNET/OneSky.dll

General
-------

### Problems interfacing with third party libraries that use STL

In UE versions between 4.3 to 4.16 (both inclusive), a linker script (introduced [in this commit](https://github.com/EpicGames/UnrealEngine/commit/5ace6a8679073e495b83157f410156cdbae7b959)) was used to hide global new/delete overloads. The script was needed because Steam runtime library would allocate a class instance via one of the custom new signatures that UE4 did not overload, but deletion would still happen through a regular global operator delete, resulting in a crash (due to pointers coming from two different heaps).

The script unfortunately had a side effect of breaking third party libraries that used STL classes in their API: code that was getting inlined in the engine would use engine's operator new/delete, while the code that resided in the library itself, or libstdc++.so/libc++.so would continue to call its own operator new/delete - again resulting in a crash.

The problem also affected AMD drivers (that are written in C++), although the mechanism here is not completely clear.

The solution for this in UE 4.3 through 4.16 is to remove the linker script (i.e. undo [commit 5ace6a8679073](https://github.com/EpicGames/UnrealEngine/commit/5ace6a8679073e495b83157f410156cdbae7b959)). UE 4.17 does not hide new/delete by default and does not need any changes.

The original problem that necessitated the hiding should be gone now - Steam runtime problems has since been updated. In case you are running into a similar issue (custom new signature that results in allocations bypassing UE4's global new) with another library, you will need to contact the library author, since you cannot fix two of these problems at once (hiding new/delete AND being able to interface with third party C++ library that uses STL).

UE4Editor
---------

### Building

### Running

\- Some people have experienced a problem with the Editor not displaying anything in the Content Browser. One work-around is opening the Unreal Project from a case insensitive filesystem, such as a mounted fat volume on your system.

\- Creating from templates, or using existing C++ projects - other outstanding issues ie. missing IDE error, missing IDE plugins, etc,

\- Arch Linux users are unable to start the editor in normal POSIX multi-threaded mode, but only using a -onethread command line argument. Try installing pthreads via **pecl install pthreads** (thanks to IRC user fuken for the tip) or, building the editor using a Debug profile: **make UE4Editor-Linux-Debug** instead.

\- Lightmass crashes/lightbuilding fails (FIXED by amigo) still experiencing in russian (ru\_RU) locale,

\- Baking lighting fails arbitrarily, or works on some projects - inconsistent,

\- Optimus based laptop users who are getting _Assert failed: IsInRenderingThread()_ or DRI buffer related errors should try running editor with: **PRIMUS\_SYNC=1 primusrun UE4Editor** (thanks to HicksD for this tip),

\- right mouse button gets stuck sometimes so that it does not aim anymore but it dollies in and out

\- opening widget reflector, and dragging its window doubles total slate tick time.

\- dragging any window (non-ue4) over the editor window also increases total slate tick time.

\- opening a window (ie. char. BP) on the 2nd screen triples/quadruples total slate tick time.

\- opening a window (ie. mat.ed) on the 2nd screen only doubles or less total slate tick time.

\- dragging mouse over the details panel widgets triples or more the total slate tick time.

\- content browser does not allow some keyboard events (ie. F2 to rename).

\- Font/text on UI showing up as rectangles can be addressed by [https://answers.unrealengine.com/questions/117323/editor-rendering-problems.html](https://answers.unrealengine.com/questions/117323/editor-rendering-problems.html)

\- For artifacts on Mesa driver, try updating to latest. More info at [https://wiki.unrealengine.com/Running\_On\_Linux](https://wiki.unrealengine.com/Running_On_Linux)

\- Sometimes attempting to copy & paste or duplicate blueprint nodes stops working (**WORKAROUND**: copy & paste anything in another window, such as a text editor, and the editor should be able to copy & paste / duplicate blueprint nodes once more).

\- Tool tips can cause lag in the Editor, in Engine/Config/ConsoleVariables.ini under the editors root dir add the line

 Slate.AllowToolTips=0 

to the bottom of the file and restart the editor, or just type in the console

 Slate.AllowToolTips 0 

to turn Tool Tips off or

 Slate.AllowToolTips 1 

to turn Tool Tips back on.

### Loading C++ Project

\- when loading up the project and there is no editor module for a c++ project it will compile the missing editor module for your project but then crash, the module is built but something else crashes afterwards.

\- you can either

1.  start the editor and load the project then let it compile and crash then start the Editor and load the Project again.
2.  build the module in the IDE of choice then start the editor and load the project.
3.  build the module in the terminal, then start the editor and load the project.

\- if it has to build the module again it may crash at the same spot.

UnrealFrontend
--------------

\- Platform and process integration needs implementation/testing

  

SDL2 issues
-----------

### 4.8 branch

All the window issues mentioned below ( Official <= 4.7 branch ) are fixed.

\- Sometimes the Tooltip window does not disappear. (Happens when another thread starts for example if the Import File Dialog apears the open Tooltip will stuck)

\- Notification window is ontop of some dialog boxes. (Fixed by yaakuro)

\- Infinite rotation/scaling of objects in the viewport not possible.

\- In Content Browser renaming and deleting does not work.

### Official <= 4.7 branch

\- Need to be able to enumerate all graphics adapters in the system and get their basic parameters (brand, name, VRAM size...) _\-- SDL does support Xinerama and XRandR, i.e. all the facilities that X11 provides in that regard._

\- Need to be able to create a simple text window for console output, without needing to render text in advance,

Performance Troubleshooting
---------------------------

As per Epic|rcl:

$ sudo perf record -a -g sleep 60

Smaller intervals than 60 sec can be used as well..

$ perf report --no-children --sort comm,dso,sym

Then identify the offender and complain....use Dev builds, of course.

Getting GLSL shaders source
---------------------------

1 Uncomment r.DumpShaderDebugInfo=1 in ConsoleVariables.ini
2 Tweak GUID (change a random digit init) in ShaderVersion.usf
3 Launch the editor

.desktop file template
----------------------

Please change the location of the UnrealEngine directory:

\[Desktop Entry\]
Version=1.0
Type=Application
Exec=Documents/UnrealEngine/Engine/Binaries/Linux/UE4Editor -opengl4
Path=Documents/UnrealEngine/Engine/Binaries/Linux
Name=Unreal Engine Editor
Icon=Documents/UnrealEngine/Engine/Source/Programs/UnrealVS/Resources/Preview.png
Terminal=false

Window Managers
---------------

### Xfce 4.10+

Switch on the composite manager (Settings/Window Manager Tweaks/Compositor)

### Unity

UE4Editor does not need any special setting in the default version of Unity WM.

### Gnome

### KDE

Problems with tooltips (framerate drop and smearing) can be avoided by disabling "Allow applications to block compositing" in the KDE Compositor settings.

<-- Back to the main [Linux Support](/index.php?title=Linux_Support "Linux Support") page.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Linux\_Known\_Issues&oldid=343](https://wiki.unrealengine.com/index.php?title=Linux_Known_Issues&oldid=343)"