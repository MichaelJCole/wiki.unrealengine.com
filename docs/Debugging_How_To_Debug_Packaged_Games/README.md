 Debugging How To Debug Packaged Games - Epic Wiki             

 

Debugging How To Debug Packaged Games
=====================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Debug Symbols For Crash Reporter](#Debug_Symbols_For_Crash_Reporter)
*   [3 Debugging With Visual Studio](#Debugging_With_Visual_Studio)
*   [4 Enjoy!](#Enjoy.21)

Overview
--------

Original Author: [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Dear Community,

In this wiki I explain how it is that you can debug packaged games, both by having the **debug symbols/files available** for the UE4 crash reporter, and via **attach to process** using Visual Studio!

Debug Symbols For Crash Reporter
--------------------------------

If you're reading this you probably have gotten a crash in your packaged game and simply been told that you do not have debugging symbols enabled/available to assist further with figuring out what happened.

To package the game so that debugging symbols are included, check out this pic!

You can get here from **Package Project -> Packaging Settings** or **Project Settings -> Packaging Settings**

[![DebugGame2.jpg](https://d26ilriwvtzlb.cloudfront.net/6/6f/DebugGame2.jpg)](/index.php?title=File:DebugGame2.jpg)

Debugging With Visual Studio
----------------------------

To debug a packaged game via Visual Studio:

1\. In visual studio, compile the game for DebugGame Win32/Win64

2\. After packaging, add all of the DebugGame files you find in your Binaries folder to your packaged Binaries folder, in Win32/Win64 directory.

3\. **Run the DebugGame executable instead of the regular one.**

4\. After your game starts, open visual studio, and press CTRL + ALT + P

5\. Find your game in the process list and select it.

6\. Now debugger symbols will load and you have full debugging help for your game!

[![DebugGame1.jpg](https://d26ilriwvtzlb.cloudfront.net/d/db/DebugGame1.jpg)](/index.php?title=File:DebugGame1.jpg)

Enjoy!
------

Oh ye UE4 C++ Programmers!

You can now rest easy, your debugging powers in packaged games have just exponentially increased!

♥

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Debugging\_How\_To\_Debug\_Packaged\_Games&oldid=311](https://wiki.unrealengine.com/index.php?title=Debugging_How_To_Debug_Packaged_Games&oldid=311)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")