Understanding Unreal's Build System - Epic Wiki                    

Understanding Unreal's Build System
===================================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.7

Contents
--------

*   [1 Overview](#Overview)
*   [2 Introduction to Builds](#Introduction_to_Builds)
    *   [2.1 Configurations](#Configurations)
*   [3 How and Why](#How_and_Why)
    *   [3.1 Editor Builds](#Editor_Builds)
    *   [3.2 Executable Builds](#Executable_Builds)
    *   [3.3 Command Line](#Command_Line)
    *   [3.4 Compile in Editor](#Compile_in_Editor)

Overview
--------

It can be initially confusing when presented with the different soultion configurations or build options in Visual Studio. This is a compiled list detailing how the overall build systems seems to work and what you need to know as a developer.

Introduction to Builds
----------------------

To start things off you can find your builds in the Binaries folder of your Project Directory. Anytime you launch the Editor you need to have a compiled version of your project to run against. This is _always_ your **UE4Editor-YourGame.dll** but not limited to. Which brings us to the topic of Configurations:

#### Configurations

Configuration

Output

DebugGame

YourGame-Win64-DebugGame.exe

An Executable that runs on cooked content. It contains a non-optimized version wherein you can see and access some normally optimized variables such as FString's or other low level objects.

DebugGame Editor

UE4Editor-YourGame-Win64-DebugGame.dll

Same as above, but this version runs in the Editor.

Development

YourGame.exe

An Executable that runs on cooked content. This is a semi-optimized version wherein you can't see every variable in debug mode but still has most debugging features. You can read in-game log, etc.

Development Editor

UE4Editor-YourGame.dll

This version is the required version by the editor in order for it to boot up. It is the same as above, but this version runs in the Editor.

Shipping

YourGame.exe

This is your game with complete optimization and is the version you will ship to your users

How and Why
-----------

### Editor Builds

*   Development Editor
*   DebugGame Editor

When the UE4Editor.exe is loaded it attaches to the Development Editor \[UE4Editor-YourGame.dll\]. If this .dll is not present it will offer to build it. Once the editor is loaded you can updated it by recompiling from Visual Studio as a Development Editor build. You can also recompile from Visual Studio as a DebugGame Editor build \[UE4Editor-YourGame-Win64-DebugGame.dll\].

It's worth noting before moving on, that if you shut down the editor and reload it will use the last good Development Editor build. So if you were using DebugGame Editor builds it may look like you lost work. Simply rebuild the DebugGame Editor and it will hot load into the editor.

### Executable Builds

*   Development
*   DebugGame
*   Shipping

When using a stand alone build you drop the overhead of the UE4Editor and just run the game. This must be done with COOKED content created from the editor. Simply go to **File>Cook Content for \[Platform\]** This will create cooked content in your game in project local directory **..\\Saved\\Cooked\\WindowsNoEditor**.

### Command Line

*   Development Editor
*   DebugGame Editor

Either listed build type can be used when launching the your game from command line. using switch "-game" will launch your game using \[UE4Editor-YourGame.dll\]. And using switches "-game -debug" will launch your game using \[UE4Editor-YourGame-Win64-DebugGame.dll\].

### Compile in Editor

The editor contains a Compile button on the main shelf. When this button is pushed, the unreal build tools create a new Development Editor build and hot links it back to the editor.

This introduction should be expanded as more is learned, but I hope this helps!

[OliverBarraza](/index.php?title=User:OliverBarraza&action=edit&redlink=1 "User:OliverBarraza (page does not exist)") ([talk](/index.php?title=User_talk:OliverBarraza&action=edit&redlink=1 "User talk:OliverBarraza (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Understanding\_Unreal%27s\_Build\_System&oldid=14011](https://wiki.unrealengine.com/index.php?title=Understanding_Unreal%27s_Build_System&oldid=14011)"

[Categories](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)