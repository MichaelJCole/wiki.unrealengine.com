Unreal Engine 4 Internals - Epic Wiki             

Unreal Engine 4 Internals
=========================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

This page covers my discoveries as I dig through the internals of the Unreal Engine 4. It applies primarily to version 4.3, but I may update in the future for later versions.

Contents
--------

*   [1 Launching](#Launching)
*   [2 Preinit Stage](#Preinit_Stage)
*   [3 Init](#Init)
*   [4 Tick Loop](#Tick_Loop)
*   [5 Exit](#Exit)

Launching
---------

Each supported platform has a platform-specific file that contains the platforms main function. `LaunchWindows.cpp` is the windows platform launch file, there are equivalent files for the other supported platforms. The three desktop platforms call `GuardedMain`, which lives in `Launch.cpp` in module `Launch`.

`GuardedMain` is the platform independent main function for the desktop platforms. It's primary function is to pass control to the singleton object `GEngineLoop`, which is a `FEngineLoop` (`LaunchEngineLoop.h/LaunchEngineLoop.cpp`.

The four stages of execution are PreInit, Init, Tick Loop and Exit. FEngineLoop has a method, which is called from functions in `Launch.cpp` for each of these stages.

Preinit Stage
-------------

The Preinit stage handles basic setup tasks from command line tokenizing to loading core modules like Core, Engine, etc. The Preinit stage is managed by the function `FEngineLoop::Preinit`

The command line is managed by a singleton class `FCommandLine`, which lives in CoreMisc.h/CoreMisc.cpp.

Modules loaded during Preinit include:

*   FEngineLoop::LoadPreInitModules()
    *   CoreUObject
    *   Engine
    *   Renderer
    *   ShaderCore
    *   Platform specific preinit modules
*   FEngineLoop::LoadStartupCoreModules()
    *   Core
    *   Networking
    *   Messaging
    *   Slate

Init
----

Tick Loop
---------

Exit
----

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Unreal\_Engine\_4\_Internals&oldid=8003](https://wiki.unrealengine.com/index.php?title=Unreal_Engine_4_Internals&oldid=8003)"