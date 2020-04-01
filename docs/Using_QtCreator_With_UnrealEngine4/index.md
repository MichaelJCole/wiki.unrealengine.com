Using QtCreator With UnrealEngine4 - Epic Wiki                     

Using QtCreator With UnrealEngine4
==================================

**Rate this Article:**

4.80

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_half.gif) (5 votes)

Approved for Versions:(please verify)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Prerequisites](#Prerequisites)
*   [3 Setting up your project](#Setting_up_your_project)
    *   [3.1 Generating defines.pri and includes.pri](#Generating_defines.pri_and_includes.pri)
        *   [3.1.1 defines.pri](#defines.pri)
        *   [3.1.2 includes.pri](#includes.pri)
*   [4 Setting up the debugger for Qt Creator](#Setting_up_the_debugger_for_Qt_Creator)
*   [5 Setting up the Qt Creator code style](#Setting_up_the_Qt_Creator_code_style)
*   [6 Configuring the project](#Configuring_the_project)
    *   [6.1 Build](#Build)
    *   [6.2 Clean](#Clean)
    *   [6.3 Run](#Run)
    *   [6.4 Configurations](#Configurations)
*   [7 Building, running and debugging our project](#Building.2C_running_and_debugging_our_project)
*   [8 Known issues](#Known_issues)

Overview
--------

This tutorial will describe how to setup your project for use with Qt Creator. Why would you want this?

*   Visual Studio is really limited for non-free versions.
*   Qt Creator is fast and lightweight.
*   Qt Creator's intellisense works better out of the box.
*   Qt Creator has a lot of refactoring options out of the box.

At the end of this tutorial you will be able to do the following:

*   Build your project from Qt Creator
*   Run your project from Qt Creator
*   Debug your project from Qt Creator

  
**Edit from another author:** I made a tool to automate some of the steps described below, for more information (including a modified version of this great tutorial, which makes use of the tool) see [Link](https://forums.unrealengine.com/showthread.php?59458-TOOL-Tut-WIN-Unreal-Qt-Creator-Project-Generator-%28v0-1-Beta%29)

Prerequisites
-------------

You will need the following software installed:

*   [Qt Creator for Visual Studio 2013 64 bit](http://qt-project.org/downloads), I took the OpenGL version since it was a bit smaller. It's important that you pick the 64 bit version for VS 2013.
*   Visual Studio 2013 (Express edition is OK)
*   [Debugging tools for windows](http://msdn.microsoft.com/en-US/windows/desktop/bg162891), required for debugging your project. Before installing untick everything but "Debugging tools for Windows", the rest is unneeded.
*   A text editor that understands regular expressions (regex) such as Notepad++.

Setting up your project
-----------------------

So for the sake of this tutorial, I'm going to go ahead and create a new project called "MyQtProject", which will be based on the C++ First Person template. Once the project is done generating, navigate to where you saved your project, which would be in my case "Documents\\Unreal Projects\\MyQtProject".

Now go to "Intermediate\\ProjectFiles" and create 3 new files called "MyQtProject.pro", "defines.pri" and "includes.pri". Make sure it has no extra extension such as ".txt". Now open "MyQtProject.pro" in your favorite text editor (NOT Qt Creator), which is in my case Notepad++. Go ahead and copy paste this into your project file:

TEMPLATE = app
CONFIG += console
CONFIG -= app\_bundle
CONFIG -= qt
CONFIG += c++11
 
\# All the defines of your project will go in this file
\# You can put this file on your repository, but you will need to remake it once you upgrade the engine.
include(defines.pri)
 
\# Qt Creator will automatically add headers and source files if you add them via Qt Creator.
HEADERS += ../../Source/MyQtProject/Public/MyQtProject.h \\
	../../Source/MyQtProject/Public/MyQtProjectCharacter.h \\
	../../Source/MyQtProject/Public/MyQtProjectGameMode.h \\
	../../Source/MyQtProject/Public/MyQtProjectHUD.h \\
	../../Source/MyQtProject/Public/MyQtProjectProjectile.h
 
SOURCES += ../../Source/MyQtProject/Private/MyQtProject.cpp \\
	../../Source/MyQtProject/Private/MyQtProjectCharacter.cpp \\
	../../Source/MyQtProject/Private/MyQtProjectGameMode.cpp \\
	../../Source/MyQtProject/Private/MyQtProjectHUD.cpp \\
	../../Source/MyQtProject/Private/MyQtProjectProjectile.cpp
 
\# All your generated includes will go in this file
\# You can not put this on the repository as this contains hardcoded paths
\# and is dependend on your windows install and engine version
include(includes.pri)

### Generating defines.pri and includes.pri

Now here is where the editor with regular expressions comes handy (and will save you a lot of annoying work).

Assuming you have the Visual Studio project files in place, if not you can generate by right clicking your ".uproject", open "MyQtProject.vcxproj" with your text editor (NOT Visual studio).

#### defines.pri

Scroll all the way down and find "<NMakePreprocessorDefinitions>", now copy the contents from that line into "defines.pri" and you will end up with something similar to this:

$(NMakePreprocessorDefinitions);UE\_GAME=1;IS\_PROGRAM=0;UE\_ROCKET=1;UNICODE;\_UNICODE;\_\_UNREAL\_\_;IS\_MONOLITHIC=1;WITH\_ENGINE=1;WITH\_UNREAL\_DEVELOPER\_TOOLS=0;WITH\_COREUOBJECT=1;USE\_STATS\_WITHOUT\_ENGINE=0;

I left a big part of the line out, but as you can see, we have a ridiculously long line, now we're going to convert it into a format Qt Creator can use.

Open up the replace window of your text editor and in the "Find" field put in ";" (without quotes), in the "Replace" field put "\\r\\n" (also without quotes), click "Replace all" (or the equivalent of it) and now every define should be on a new line.

We're not done yet, now put in the "Find" field "^" (again without quotes) and in the "Replace" field "DEFINES += "" (without the outer quotes, be sure to include the second last quote). And click "Replace all". Now we're almost done, just one last step. In the "Find" field, input "$" and in the "Replace" field input a quote. Click "Replace all" and your lines should like this:

DEFINES += "DEFINE\_GOES\_HERE"

Now save the file and we're done here.

#### includes.pri

Back in "MyQtProject.vcxproj" scroll all the way down to "<NMakeIncludeSearchPath>", again copy the contents from that line into "includes.pri".

Again replace semicolons by newlines just as we did for "defines.pri".

Now instead of prepending "DEFINES += "", we prepend "INCLUDEPATH += "".

Now append the quote like we did for "defines.pri".

Your lines should look like this (you obviously have a lot more lines):

INCLUDEPATH += "$(NMakeIncludeSearchPath)"
INCLUDEPATH += "C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Source"
INCLUDEPATH += "..\\..\\Source"
INCLUDEPATH += "..\\Build\\Win64\\MyQtProject\\Inc\\MyQtProject"
INCLUDEPATH += "..\\..\\Source\\MyQtProject\\Public"

Now save the file and we're done here.

Setting up the debugger for Qt Creator
--------------------------------------

Now we have successfully configured our project, we need to setup the debugger.

Open up Qt Creator and go to Tools->Options->Build & Run->Debuggers and click on "Add".

Even though there should already be a CDB listed, it's the 32 bit version, we need the 64 bit version for it to work with our project.

Unless you changed the default installation path, CDB should be in "C:\\Program Files (x86)\\Windows Kits\\8.1\\Debuggers\\x64\\".

Select "cdb.exe" and click "Open", give it a name and click "Apply".

Now, still in the options window, go to Debugger->CDB and check "Ignore first chance access violations".

Now to go the tab "CDB Paths" and put the following in "Symbol Paths":

symsrv\*symsrv.dll\*C:\\Users\\MyUsernameHere\\AppData\\Local\\Temp\\symbolcache
cache\*C:\\Users\\MyUsernameHere\\Local\\Temp\\symbolcache

Replace "MyUsernameHere" with your username (go to "C:\\Users\\" to make sure it's correct).

Now go to Build & Run->Kits and click "Add".

I named it "UE4", but you can name it whatever you want. Leave "File system name:" empty. As "Device type:" select "Desktop", as "Device" select "Local PC (default for desktop)".

Leave "Sysroot:" empty. As "Compiler:" select "Microsoft Visual C++ Compiler 12.0 (amd64)". As "Debugger:" select the debugger we added before, I called it "CDB 64 bit".

As "Qt version:" select "Qt 5.3 MSVC2013 OpenGL 64bit", your version might be different and you might not have the OpenGL version, but that doesn't matter as long as it's for "MSVC2013 64bit".

Now click "Apply" to save our changes.

NOTE: When starting to debug your project, it will ask if you want to use the Microsoft symbol servers, DO NOT USE THEM!!! It will slow down debugging to snail speed, having it turned on made just starting up the editor take about 5 minutes.

Setting up the Qt Creator code style
------------------------------------

Again in the options, go to C++->Code Style and copy one of the build in code styles and give it a name, this will allow you to export it later.

Click on "Edit..." and change the following:

Change "Tab Policy" to "Tabs Only", "Tab Size" to 4, "Indent Size" to 4 and "Align Continuation Lines" to "With Regular Indent".

The rest is all personal preference on how your code is formatted, so be sure to go there if you don't like how something is formatted. But you have to use tabs as per policy of Epic, probably because some tools only work well with tabs is my guess.

Configuring the project
-----------------------

Ok, now that we are almost done, we need to configure a few other small things for building, running and debugging to work.

Open the project file by clicking "Open Project" on the welcome page. The first time you open it you need to select a kit you want to use to compile, be sure to pick the kid we added before, in my case "UE4".

Now that our project is loaded, it wont compile and run just yet. We need to configure Qt Creator to use UBT first.

In the strip on the left size click on the folder icon with the text "Projects", here we can change the build settings.

At "Edit build configuration:" click "Rename" and rename the "Debug" configuration to "Debug Editor".

### Build

Now at "Build Steps" and "Clean Steps" remove all the entries. Now at "Build Steps", click "Add Build Step" and select "Custom Process Step".

Now you can fill in a command, point this to the "Build.bat" of the engine version you're using, in my case it is "C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Build.bat" (without quotes).

As "Arguments:" fill in "MyQtProjectEditor Win64 DebugGame "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket" (without quotes). Where "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" is the path to your project file and "MyQtProjectEditor" needs to be changed to reflect the name of your project.

As "Working directory:" set it to "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build" (without quotes).

### Clean

For the "Clean Steps" do the same, but point it "Clean.bat" instead, which is in the same folder as "Build.bat".

### Run

Now under "Run" and then "Run configuration:", click "Add" and select "Custom Executable".

Rename it to "Debug Editor" by clicking on "Rename...".

For "Executable:" point it to the location of "UE4Editor.exe", which is in my case "C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Binaries\\Win64\\UE4Editor.exe" (without quotes).

As "Arguments:" fill in ""C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -debug" (without the outer quotes).

And as "Working directory:" set it to "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\Binaries\\Win64" (without quotes). And uncheck "Run in terminal".

The annoying part is that you have to change this every time you change the configuration, it doesn't change with the build configurations.

### Configurations

Here is a list of configurations that can be used with the build tools:

Debug Editor:
{
	Build:
	{
		Command: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Build.bat
		Arguments: MyQtProjectEditor Win64 DebugGame "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build
	}
	Clean:
	{
		Command: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Clean.bat
		Arguments: MyQtProjectEditor Win64 DebugGame "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build
	}
	Run:
	{
		Executable: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Binaries\\Win64\\UE4Editor.exe
		Arguments: "C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -debug
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\PitStop\\Binaries\\Win64
	}
}
Debug Standalone:
{
	Build:
	{
		Command: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Build.bat
		Arguments: MyQtProject Win64 DebugGame "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build
	}
	Clean:
	{
		Command: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Clean.bat
		Arguments: MyQtProject Win64 DebugGame "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build
	}
	Run:
	{
		Executable: ..\\..\\Binaries\\Win64\\MyQtProject-Win64-DebugGame.exe
		Arguments:
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\PitStop\\Binaries\\Win64
	}
}
Development Editor:
{
	Build:
	{
		Command: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Build.bat
		Arguments: MyQtProjectEditor Win64 Development "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build
	}
	Clean:
	{
		Command: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Clean.bat
		Arguments: MyQtProjectEditor Win64 Development "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build
	}
	Run:
	{
		Executable: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Binaries\\Win64\\UE4Editor.exe
		Arguments: "C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject"
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\PitStop\\Binaries\\Win64
	}
}
Development Standalone:
{
	Build:
	{
		Command: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Build.bat
		Arguments: MyQtProject Win64 Development "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build
	}
	Clean:
	{
		Command: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Clean.bat
		Arguments: MyQtProject Win64 Development "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build
	}
	Run:
	{
		Executable: ..\\..\\Binaries\\Win64\\MyQtProject.exe
		Arguments:
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\PitStop\\Binaries\\Win64
	}
}
Shipping:
{
	Build:
	{
		Command: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Build.bat
		Arguments: MyQtProject Win32 Shipping "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build
	}
	Clean:
	{
		Command: C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Build\\BatchFiles\\Clean.bat
		Arguments: MyQtProject Win32 Shipping "C:\\Users\\MyUsernameHere\\Documents\\Unreal Projects\\MyQtProject\\MyQtProject.uproject" -rocket
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\MyQtProject\\Intermediate\\Build
	}
	Run:
	{
		Executable: ..\\..\\Binaries\\Win64\\MyQtProject-Win32-Shipping.exe
		Arguments:
		Working directory: C:\\Users\\Dragoon\\Documents\\Unreal Projects\\PitStop\\Binaries\\Win32
	}
}

Building, running and debugging our project
-------------------------------------------

We're now almost done, but here a few final guide lines.

To build the project you can either build from the menu or press Ctrl+B.

To run the project you can either run it from the menu or press Ctrl+R.

To debug you can either start debugging from the menu or press F5.

Once you start debugging for the first time, Qt Creator will ask you if you want to use the Microsoft Symbol servers, DO NOT USE IT! It will make the debugging process painfully slow, with it turned on it will take about 5 minutes before the editor is opened and you can start debugging.

Known issues
------------

Once you start building, you will get this warning:

WARNING: UnrealBuildTool found an Intermediate folder while looking for rules 'C:\\Program Files\\Unreal\\Unreal Engine\\4.4\\Engine\\Source\\Intermediate'.
It should only ever be searching under 'Source' folders -- an Intermediate folder is unexpected and will greatly decrease iteration times!

I don't know a fix for it, if you find it, please update the information accordingly.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Using\_QtCreator\_With\_UnrealEngine4&oldid=15278](https://wiki.unrealengine.com/index.php?title=Using_QtCreator_With_UnrealEngine4&oldid=15278)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)