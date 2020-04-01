Building On Linux - Epic Wiki              

Building On Linux
=================

From Epic Wiki

(Redirected from [BuildingOnLinux](/index.php?title=BuildingOnLinux&redirect=no "BuildingOnLinux"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:(please verify)

This page contains information about the effort to build UE4 natively on a linux host. If you are looking for information about targeting Linux using the existing Mac or Windows tools please see [Compiling For Linux](/Compiling_For_Linux "Compiling For Linux"). The main page is [Linux support](/Linux_Support "Linux Support").

Contents
--------

*   [1 Current State](#Current_State)
*   [2 Getting Started](#Getting_Started)
    *   [2.1 Prerequisites](#Prerequisites)
*   [3 Building](#Building)
    *   [3.1 Docker Builds](#Docker_Builds)
    *   [3.2 Manual Builds](#Manual_Builds)
        *   [3.2.1 Controlling the Build Environment](#Controlling_the_Build_Environment)
        *   [3.2.2 Enhancing the Makefile](#Enhancing_the_Makefile)
*   [4 The Editor](#The_Editor)
*   [5 Miscellaneous](#Miscellaneous)
    *   [5.1 Building with a VM](#Building_with_a_VM)
    *   [5.2 Arch Linux](#Arch_Linux)
        *   [5.2.1 Clang 3.3](#Clang_3.3)
    *   [5.3 Recent Mono versions](#Recent_Mono_versions)

Current State
-------------

We've been discussing it mostly on the IRC at [irc://irc.freenode.net/UE4Linux](irc://irc.freenode.net/UE4Linux), but you can also find a few forum threads about it. If you'd like see a working native Linux port, please jump in an join us. To catch up on our IRC conversations, you can access channel logs at [http://www.teemperor.de/ue4-logs/ue4linux/](http://www.teemperor.de/ue4-logs/ue4linux/).

Current state is stored in several github forks:

*   [https://github.com/3dluvr/UnrealEngine](https://github.com/3dluvr/UnrealEngine) - 4.4-linux currently builds and runs the Editor and other applications.
*   [https://github.com/wshearn/UnrealEngine/tree/4.3\_linux](https://github.com/wshearn/UnrealEngine/tree/4.3_linux) - TBD,
*   [https://github.com/sbc100/UnrealEngine/tree/master\_linux](https://github.com/sbc100/UnrealEngine/tree/master_linux) - builds but does not run Editor yet

Builds and Runs (3dluvr repo):

*   UnrealHeaderTool
*   BlankProgram
*   SlateViewer
*   UE4Editor
*   ShaderCompileWorker

Builds - Mostly Untested:

*   UE4EditorServices
*   UnrealLightmass
*   UnrealPak
*   UnrealFileServer
*   UnrealVersionSelector
*   UnrealFrontend
*   UE4Client
*   UE4Game
*   UE4Server
*   CrashReportClient

Not appropiate on linux:

*   MinidumpDiagnostics
*   UnrealLaunchDaemon
*   SymbolDebugger
*   UnrealSync

Getting Started
---------------

The following instructions are copied from [Engine/Build/BatchFiles/Linux/README.md](https://github.com/3dluvr/UnrealEngine/blob/master_linux/Engine/Build/BatchFiles/Linux/README.md). The most up-to-date instructions will always be in git itself.

### Prerequisites

You will need mono + gmcs installed in order to build:

$ sudo apt-get install mono-gmcs mono-xbuild mono-dmcs libmono-corlib4.0-cil libmono-system-data-datasetextensions4.0-cil libmono-system-web-extensions4.0-cil libmono-system-management4.0-cil libmono-system-xml-linq4.0-cil

You also need autoconf, git, curl, bison, flex, libz, glew, dos2unix, clang-3.3 and cmake 2.8.8+ so:

$ sudo apt-get install autoconf git curl bison flex zlib1g-dev libglew1.6-dev dos2unix clang-3.3 cmake

**Depending whether you wish to use Qt or GTK for your dialogs, libqt4-dev or libqt5-dev or gtk2 or gtk3 will be needed.**

Building
--------

### Docker Builds

See [https://registry.hub.docker.com/u/wshearn/ue4editor/](https://registry.hub.docker.com/u/wshearn/ue4editor/)

### Manual Builds

1\. Download the additional archives Required\_Linux\_4.4.tar.bz2 and Required\_Generic\_4.4.tar.bz2 from 3dluvr's GitHub releases page at [https://github.com/3dluvr/UnrealEngine/releases/tag/4.4.0-release](https://github.com/3dluvr/UnrealEngine/releases/tag/4.4.0-release) and put them in your $HOME/Downloads

2\. Download v130a of the Steamworks SDK and put it in $HOME/Downloads as well

3\. Open a Terminal and clone the master branch from 3dluvr's GitHub:

$ git clone git@github.com:3dluvr/UnrealEngine.git (this will clone 4.4-linux)

4\. After a 200MB+ download, switch to the newly cloned branch:

$ cd UnrealEngine

5\. Next, change directory to where Linux scripts are:

$ cd Engine/Build/BatchFiles/Linux/

6\. Install the downloaded dependencies with:

$ ./UpdateDeps.sh

7\. Build third party libraries:

$ ./BuildThirdParty.sh

8\. Build UnrealBuildTool (UBT) and generate top level Makefile:

$ ./GenerateProjectFiles.sh

9\. Now go back to the Engine root folder:

$ cd -

10\. Build your targets using the top-level Makefile. e.g:

$ make SlateViewer

Or by running \`Build.sh\` directly:

$ Engine/Build/BatchFiles/Linux/Build.sh SlateViewer Linux Development

To enable a more verbose output, append '-verbose' to the end of the Build.sh command (or ARGS=-verbose the make commandline):

$ Engine/Build/BatchFiles/Linux/Build.sh SlateViewer Linux Development -verbose

#### Controlling the Build Environment

UnrealBuildTool (UBT) can be configured further by editing:

Engine/Saved/UnrealBuildTool/BuildConfiguration.xml

See the default file for a list of possible keys:

Engine/Programs/UnrealBuildTool/BuildConfiguration.xml

#### Enhancing the Makefile

Makefile does not contain a **clean** method. You can edit the Makefile in the engine's root and add the following to it before **.PHONY:** statement at the bottom:

shaders-clean:
       rm -rf Engine/Intermediate/Shaders Engine/Saved Engine/DerivedDataCache Engine/Intermediate/CachedAssetRegistry.bin

editor-clean:
       rm -rf Engine/Intermediate/Build/Linux/x86\_64-unknown-linux-gnu/UE4Editor Engine/Binaries/Linux/libUE4Editor-\* Engine/Binaries/Linux/UE4Editor

clean:
       rm -f Engine/Binaries/Linux/Unreal\* Engine/Binaries/Linux/UE\* \\
       Engine/Binaries/Linux/libUnreal\* Engine/Binaries/Linux/libUE\* Engine/Binaries/Linux/libSh\* \\
       Engine/Binaries/Linux/ShaderCompileWorker\* Engine/Binaries/Linux/SlateViewer\* Engine/Binaries/Linux/CrashReportClient\*
       rm -rf Engine/Intermediate/Build Engine/Binaries/Linux/HTML5 Engine/Binaries/Linux/Linux

Make sure that the indented sections are not made out of spaces, but a single tab.

The Editor
----------

You really want the UE4Editor, so why wait any longer - build the Editor:

$ make ShaderCompileWorker UnrealLightmass UnrealPak UE4Editor

You are ready to test it now.

$ cd Engine/Binaries/Linux && ./UE4Editor

Fingers crossed all goes well, no crashes or other funny things. If they do, try running through gdb to see where it happens. Sometimes the issues are when running Open Source graphics drivers, so switch to the Binary Release, then try running again.

Otherwise, the Editor should present you with a Project Browser Window. Hooray. First time run will be longer because shaders need to convert/compile, so sit tight and if you don't have a Dual Xeon 12-Core workstation, process will take > 5 mins (even > 1 hour on 2-Core systems).

You are on your own now, create a new project and play with the Editor but don't run it in production, yet. ;)

**Arch Linux users should try building the Editor using the Debug profile**:

$ make UE4Editor-Linux-Debug

This seems to work better not causing threading crashes seen when building standard "Development" profile. More investigation is needed at this point.

Miscellaneous
-------------

### Building with a VM

Distributions of Linux that are not officially supported (i.e. Arch Linux) may have difficulty compiling and/or running the engine. You can build with the supported Linux distribution (Ubuntu 14.04 LTS at the time of this writing) like so:

*   set up a virtual machine with this OS
*   create a shared folder between the guest and host OS
*   place the Unreal Engine code in this folder
*   build Unreal Engine inside the VM
*   run the compiled executable on the host machine

### Arch Linux

Arch users will have to either recompile their Clang or get a compiled package that does not use ld.gold, because ld.gold causes linking problems yet has been hard coded into Clang.

Optionally you could go through the following steps for a work around (faster and easier):

1\. Open up a terminal.

2\. Execute the following command:

$ mkdir ~/bin/ && cd ~/bin/ && ln -s /bin/ld.bfd ./ld.gold

3\. Add the following line to your .bashrc (or .zshrc if you use zsh) usually found in the home folder (hidden).

export PATH=$HOME/bin:$PATH

4\. Close all your terminals to apply the changes.

#### Clang 3.3

It also appears there are issues with Clang 3.4, so using 3.3 is preferable. One of the websites with precompiled binaries of Clang 3.3 is [http://gaming.jhu.edu/mirror/archlinux/extra/os/x86\_64/](http://gaming.jhu.edu/mirror/archlinux/extra/os/x86_64/), you will need clang-3.3, llvm-3.3 and, llvm-libs-3.3

### Recent Mono versions

If you are getting an error like this:

<snip>Engine/Engine/Source/Programs/AutomationTool/Linux/Linux.Automation.csproj:  warning : Project has unknown ToolsVersion '11.0'. Using the default tools version '2.0' instead.
/usr/lib/mono/2.0/Microsoft.Common.targets:  warning : TargetFrameworkVersion 'v4.0' not supported by this toolset (ToolsVersion: 2.0).
/usr/lib/mono/2.0/Microsoft.CSharp.targets: error : Error executing task Csc: Argument cannot be null.

Edit the following files:

*   Engine/Source/Programs/AutomationTool/Linux/Linux.Automation.csproj

*   Engine/Source/Programs/AutomationTool/Android/Android.Automation.csproj

*   Engine/Source/Programs/AutomationTool/HTML5/HTML5.Automation.csproj

And change

ToolsVersion="11.0"

to

ToolsVersion="4.0"

usually found on the second or third line.

This can be automated with:

$ find Engine/Source/Programs/AutomationTool -name "\*Automation.csproj" -exec sed -i "s/ToolsVersion=\\"11.0\\"/ToolsVersion=\\"4.0\\"/g" "{}" \\;

<-- Back to the main [Linux Support](/Linux_Support "Linux Support") page.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Building\_On\_Linux&oldid=8610](https://wiki.unrealengine.com/index.php?title=Building_On_Linux&oldid=8610)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")