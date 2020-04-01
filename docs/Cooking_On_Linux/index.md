Cooking On Linux - Epic Wiki                    

Cooking On Linux
================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (3 votes)

Approved for Versions:(please verify)

**PRELIMINARY - WORK IN PROGRESS**

  

Contents
--------

*   [1 Getting Started](#Getting_Started)
    *   [1.1 Using UnrealFrontend](#Using_UnrealFrontend)
    *   [1.2 Using Command Line](#Using_Command_Line)
    *   [1.3 Using Editor](#Using_Editor)

Getting Started
---------------

The latest [branch](https://github.com/EpicGames/UnrealEngine) now allows natively cooking content in Linux, either from the command line or from within the Editor. This feature has not been thoroughly tested so please try it and report of issues.

It is assumed that you have already compiled the following binaries and that they are in your Engine/Binaries/Linux folder

*   UE4Editor
*   UnrealFrontend
*   UE4Game
*   ShaderCompileWorker
*   UnrealPak

### Using UnrealFrontend

If there is no reason to script your cooking process you can use UnrealFrontend. If you need more control over the cook process create a custom profile in UnrealFrontend.

### Using Command Line

If you are in your Engine's root folder issue the following command (all in one line, Wiki won't wrap):

$ Engine/Build/BatchFiles/RunUAT.sh BuildCookRun -nocompile -nop4 -project="/absolute/path/to/your/MyProject/MyProject.uproject" -cook -compressed 
-allmaps -stage -archive -archivedirectory="/absolute/path/to/output/folder/" -package -LinuxNoEditor -clientconfig=Development -ue4exe=UE4Editor -clean 
-pak -targetplatform=Linux -utf8output

If it complains that all branches must have /Saved/Sandbox/BlankProject, then you need to build the BlankProject first.

\- Open UE4Editor
- Click New Project
- Click Blank Project
- Create the blank project ( I called it BlankProject )
- Click "save all" and then exit.

If it complains: No files found to deploy for

$HOME/Development/UnrealEngine/Engine/Binaries/Linux with wildcard libLND\*.so
- Copy the file libLND.so from another directory. 
- In my case, I got it from: 

/UnrealEngine/Engine/Source/ThirdParty/LinuxNativeDialogs/UELinuxNativeDialogs/lib/Linux/x86\_64-unknown-linux-gnu/libLND.so

After many lines of text you should see:

<SNIP>
BuildCommand.Execute: BUILD SUCCESSFUL
Automation.Execute: Script execution successful, exiting.
ProcessManager.KillAll: Trying to kill 0 spawned processes.
Program.Main: AutomationTool exiting with ExitCode=0
Domain\_ProcessExit
ProcessManager.KillAll: Trying to kill 0 spawned processes.

Your packaged project should be in wherever you set your /absolute/path/to/output/folder/ above. Because the process does not rename the UE4Game binary to the name of the project, you have to do that yourself.

Assuming your project is named MyProject, go to the /absolute/path/to/output/folder/LinuxNoEditor/Engine/Binaries/Linux folder and do:

$ mv UE4Game MyProject

Then try starting your project:

$ ./MyProject

You might also need some other libraries such as libjemalloc.so.1 so copy it from your main UE4 Engine folder. Cooking process does not copy them either for now, and they should be statically linked into UE4Game binary anyway.

### Using Editor

This is a matter of loading your project and from the **File** menu selecting **Package Project** and then **Linux**. You will be prompted for an output folder, so select one where you can write to and proceed.

While cooking is running you can click on Show Output Log in the notification dialog to see the progress of the process.

Please note that there's an issue right now where the notification dialog will show Failure at the end, even though the cooking has succeeded, so always check your Output Log !

<-- Back to the main [Linux Support](/Linux_Support "Linux Support") page.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Cooking\_On\_Linux&oldid=24054](https://wiki.unrealengine.com/index.php?title=Cooking_On_Linux&oldid=24054)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)