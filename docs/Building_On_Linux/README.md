 Building On Linux - Epic Wiki             

 

Building On Linux
=================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)") This page contains information about the effort to build UE4 natively on a Linux host. If you are looking for information about targeting Linux using the existing Mac or Windows tools please see [Compiling For Linux](/index.php?title=Compiling_For_Linux "Compiling For Linux"). The main page is [Linux support](/index.php?title=Linux_Support "Linux Support").

Contents
--------

*   [1 Foreword before building](#Foreword_before_building)
*   [2 Prerequisites](#Prerequisites)
*   [3 Getting Started](#Getting_Started)
    *   [3.1 Current State](#Current_State)
    *   [3.2 Building](#Building)
        *   [3.2.1 First Time Setup](#First_Time_Setup)
        *   [3.2.2 Controlling the Build Environment](#Controlling_the_Build_Environment)
    *   [3.3 Build Prerequisites](#Build_Prerequisites)
        *   [3.3.1 4.9 and later](#4.9_and_later)
        *   [3.3.2 Before 4.7](#Before_4.7)
            *   [3.3.2.1 Clang](#Clang)
        *   [3.3.3 Enhancing the Makefile](#Enhancing_the_Makefile)
    *   [3.4 Known Issues](#Known_Issues)
    *   [3.5 Miscellaneous](#Miscellaneous)
        *   [3.5.1 Building with a VM](#Building_with_a_VM)
        *   [3.5.2 Recent version of Mono required](#Recent_version_of_Mono_required)
        *   [3.5.3 Recent Mono versions](#Recent_Mono_versions)
        *   [3.5.4 Builds and runs](#Builds_and_runs)
        *   [3.5.5 SDL2 with multi-monitor support](#SDL2_with_multi-monitor_support)
    *   [3.6 Distro Specific Instructions](#Distro_Specific_Instructions)
        *   [3.6.1 Setting up on Ubuntu](#Setting_up_on_Ubuntu)
            *   [3.6.1.1 Installing Dependencies](#Installing_Dependencies)
        *   [3.6.2 Setting up on CentOS 7](#Setting_up_on_CentOS_7)
        *   [3.6.3 Setting up on Fedora 20](#Setting_up_on_Fedora_20)
        *   [3.6.4 Setting up on Arch Linux](#Setting_up_on_Arch_Linux)
        *   [3.6.5 Setting up on Linux Mint](#Setting_up_on_Linux_Mint)
            *   [3.6.5.1 Before running "First Time Setup"](#Before_running_.22First_Time_Setup.22)
            *   [3.6.5.2 libGL](#libGL)
*   [4 After Building](#After_Building)
    *   [4.1 Generating project files for your project](#Generating_project_files_for_your_project)
        *   [4.1.1 Visual Studio Code project files](#Visual_Studio_Code_project_files)
    *   [4.2 Opening your project](#Opening_your_project)
        *   [4.2.1 Debian Based Distros Integration](#Debian_Based_Distros_Integration)
        *   [4.2.2 A Note on IPTables](#A_Note_on_IPTables)

Foreword before building
------------------------

**For the love of all good, please don't use the _root_ user to compile and run Unreal Engine 4.**

Create another user account on your system and build and run using that account.

Prerequisites
-------------

As per [Epic's FAQ](https://www.unrealengine.com/faq) minimum system requirements for UE4 are:

Desktop PC or Mac
Quad-core Intel or AMD processor, 2.5 GHz or faster
NVIDIA GeForce 470 GTX or AMD Radeon 6870 HD series card or higher
8 GB RAM

Please make sure that you at least meet the minimum system requirements and are running a native Linux install (not a VM), with binary NVIDIA or AMD graphics drivers.

The officially used (by Epic QA) Linux distribution is Ubuntu, and we suggest you have, or install, Ubuntu 16.04 LTS for its longevity and compatibility. UE4 only works on 64-bit architecture so make sure you get that right as well.

**Note:** **We get too many questions from people who do not even meet minimum requirements, wondering why something does not build or run. So please, just because you are running Linux, it does not mean you can use some 10+ year old clunker of a computer to build and run a next-gen game engine (which UE4 is).**

Getting Started
===============

Current State
-------------

We've been discussing it mostly on the IRC at [irc://irc.freenode.net/UE4Linux](irc://irc.freenode.net/UE4Linux), but you can also find a few forum threads about it. If you'd like to have native Linux development tools, please jump in and join us.

Most current stable branch we suggest you use is _Release_ from [Epic GitHub](https://github.com/EpicGames/UnrealEngine):

Epic source code repositories ([https://www.unrealengine.com/ue4-on-github](https://www.unrealengine.com/ue4-on-github)) are set to private. In order to gain access you need to add your GitHub username when you sign up at [https://unrealengine.com](https://unrealengine.com). If you do not have a GitHub username, then you need to get one first.

If you get a message that repository does not exist, you probably:

*   did not accept invitation from Epic to join their Git,
*   did not log into GitHub (if browsing via web),
*   have forgotten to add your GitHub username to your profile at [https://unrealengine.com](https://unrealengine.com), or
*   just need to wait a few minutes after accepting the invitation.

Building
--------

### First Time Setup

Make sure you linked your GitHub account to your profile on [https://unrealengine.com](https://unrealengine.com), as all Epic repositories are private.

For the first time setup (if you just want to use the release version, if not follow the instructions after the following instructions), run the below commands in your favorite terminal:

$ git clone [https://github.com/EpicGames/UnrealEngine.git](https://github.com/EpicGames/UnrealEngine.git)
$ # or if you are using ssh authentication: 
$ # git clone git@github.com:EpicGames/UnrealEngine.git
$ cd UnrealEngine
$ ./Setup.sh
$ ./GenerateProjectFiles.sh 

Or if you want to use a versioned branch that the latest Release is based on to get latest fixes, use a versioned branch for the release version. For the moment it is 4.18. (Note to maintainers, please keep this section up to date)

$ git clone -b 4.18 [https://github.com/EpicGames/UnrealEngine.git](https://github.com/EpicGames/UnrealEngine.git)
$ # or if you are using ssh authentication: 
$ # git clone -b 4.18 git@github.com:EpicGames/UnrealEngine.git
$ cd UnrealEngine
$ ./Setup.sh
$ ./GenerateProjectFiles.sh 

The script may ask you to install additional packages (on certain distributions), and either git hooks will download the binary dependencies or the script will handle that for you.

Now you should be all set and you can build all needed UE4 projects to develop your projects using the generated Makefile. e.g:

$ make

This will compile the most needed UE4 binaries and will take a while. After finishing the binaries (Unreal Engine 4 Editor included) will be located in your Engine/Binaries/Linux subfolder. You can also import CMakeLists.txt which is generated by GenerateProjectFiles.sh as well into your favorite IDE (KDevelop, QTCreator, Codelite, or any that will handle a Makefile project or CMake project.).

You are ready to test it now.

$ ./Engine/Binaries/Linux/UE4Editor

If something goes wrong run UE4Editor through gdb using a generated project by passing the path to the project in gdb via : (replace $USER with your user name and $PROJECT with the name of a default project or your project)

$ gdb ./Engine/Binaries/Linux/UE4Editor

Then in gdb: (/home/$USER/Documents/Unreal Projects/ is the default location that UE4Editor creates projects)

set args "/home/$USER/Documents/Unreal Projects/$PROJECT/$PROJECT.uproject"

Then you can run the commands to get the information you need, which may be limited since the default editor is built against the Developer profile and not Debug, for than you need to build the Debug editor (see below for instructions on building the Debug editor)

If you get a core dump message, the core file may not be saved, if the error/crash is repeatable, you will need to set it to unlimited using ulimit and rerun the editor(run this as your default user, not as root or sudo).

$ ulimit -c unlimited

The core file is massive, the greater side of 1.8 Gigs, if you need to share the core file with others, or you want to store it without it taking up all that space, you can tar it: If you ran it from the root UnrealEngine folder.

$ tar Jvcf core-\`date +%Y%m%d\`.tar.xz ./Engine/Binaries/Linux/core 

Otherwise, the Editor should present you with a Project Browser Window. Hooray. First time run will be longer because shaders need to convert/compile, so sit tight and if you don't have a Dual Xeon 12-Core workstation, process will take > 5 mins (even > 1 hour on 2-Core systems).

You are on your own now, create a new project and play with the Editor ;)

### Controlling the Build Environment

UnrealBuildTool (UBT) can be configured further by editing:

Engine/Saved/UnrealBuildTool/BuildConfiguration.xml

See the default file for a list of possible keys:

Engine/Programs/UnrealBuildTool/BuildConfiguration.xml

Build Prerequisites
-------------------

### 4.9 and later

   Setup.sh

will fetch required packages. This is the main and supported method of getting required packages.

### Before 4.7

Manual installations.

You will need _**mono 3.2.8+**_, C# compiler (mcs), clang, dos2unix and cmake installed in order to build the editor:

    build-essential mono-gmcs mono-xbuild mono-dmcs libmono-corlib4.0-cil libmono-system-data-datasetextensions4.0-cil 
    libmono-system-web-extensions4.0-cil libmono-system-management4.0-cil libmono-system-xml-linq4.0-cil cmake dos2unix clang xdg-user-dirs

**Note: Only used for 4.7 and below. -> Depending whether you wish to use Qt or GTK for your dialogs, libqt4-dev or libqt5-dev or gtk2 or gtk3 will be needed. Setup.sh asks to install libqt4-dev**.

If you wish to recompile third party dependencies (which is no longer a necessary step for _release_ or _versioned release numbered_ branch), you will also need autoconf, bison, flex, libz, glew and possibly more.

#### Clang

Clang 4.0.1 is the last supported version.

On Ubuntu 16.04 and later, use Clang 3.8 . If you have a later version you can create a soft link for 3.8:

sudo ln -s /usr/bin/clang-3.8 /usr/bin/clang
sudo ln -s /usr/bin/clang++-3.8 /usr/bin/clang++

On Ubuntu 14.04, use Clang 3.5 or Clang 3.3 . Do not use Clang 3.4, as it has issues.

One of the websites with precompiled binaries of Clang 3.3 is [http://gaming.jhu.edu/mirror/archlinux/extra/os/x86\_64/](http://gaming.jhu.edu/mirror/archlinux/extra/os/x86_64/), you will need clang-3.3, llvm-3.3 and, llvm-libs-3.3

Clang version can be specified in UnrealEngine/Engine/Build/BatchFiles/Linux/Setup.sh

### Enhancing the Makefile

Makefile does not contain a **clean** method, but you can clean any target by adding ARGS=-clean to it, like this

 make UE4Editor ARGS=-clean

The above is the preferred way to clean a target, although you can also remove target files manually. Edit the Makefile in the engine's root and add the following to it before **.PHONY:** statement at the bottom:

shaders-clean:
       rm -rf Engine/Intermediate/Shaders Engine/Saved Engine/DerivedDataCache Engine/Intermediate/CachedAssetRegistry.bin

editor-clean:
       rm -rf Engine/Intermediate/Build/Linux/x86\_64-unknown-linux-gnu/UE4Editor Engine/Binaries/Linux/libUE4Editor-\* Engine/Binaries/Linux/UE4Editor

clean:
       rm -f Engine/Binaries/Linux/Unreal\* Engine/Binaries/Linux/UE\* \\
       Engine/Binaries/Linux/libUnreal\* Engine/Binaries/Linux/libUE\* Engine/Binaries/Linux/libSh\* \\
       Engine/Binaries/Linux/ShaderCompileWorker\* Engine/Binaries/Linux/SlateViewer\* Engine/Binaries/Linux/CrashReportClient\*
       rm -rf Engine/Intermediate/Build Engine/Binaries/Linux/HTML5 Engine/Binaries/Linux/Linux Engine/Binaries/Linux/Android Engine/Binaries/Linux/IOS Engine/Binaries/Linux/HTML5

Make sure that the indented sections are not made out of spaces, but a single tab.

Known Issues
------------

See [Known Issues](/index.php?title=Linux_Known_Issues "Linux Known Issues")

Miscellaneous
-------------

### Building with a VM

Distributions of Linux that are not officially supported (e.g. Arch Linux) may have difficulty compiling and/or running the engine. You can build with the supported Linux distribution (Ubuntu 14.04 LTS at the time of this writing) like so:

*   set up a virtual machine with this OS
*   create a shared folder between the guest and host OS
*   place the Unreal Engine code in this folder
*   build Unreal Engine inside the VM
*   run the compiled executable on the host machine

  

### Recent version of Mono required

If you are getting an error like this:

  Could not load file or assembly 'Microsoft.Build.Tasks.v4.0' or one of its dependencies.

You may need to upgrade your mono version:

  [http://stackoverflow.com/questions/25116391/building-sln-on-mono-ubuntu](http://stackoverflow.com/questions/25116391/building-sln-on-mono-ubuntu)
  [http://www.mono-project.com/docs/getting-started/install/linux/#debian-ubuntu-and-derivatives](http://www.mono-project.com/docs/getting-started/install/linux/#debian-ubuntu-and-derivatives)

(at least this fixed the problem for me).

### Recent Mono versions

**Note: this should not be the case as of 4.7.**

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

You also have to export MSBuildToolsVersion=4.0 in the latest master it seems.

### Builds and runs

*   UnrealHeaderTool
*   BlankProgram
*   SlateViewer
*   UE4Editor
*   ShaderCompileWorker
*   UnrealLightmass
*   UnrealPak
*   UE4Client
*   UE4Game
*   UE4Server

Builds - Mostly Untested:

*   UE4EditorServices
*   UnrealFileServer
*   UnrealVersionSelector
*   UnrealFrontend
*   CrashReportClient

Not appropiate on Linux:

*   MinidumpDiagnostics
*   UnrealLaunchDaemon
*   SymbolDebugger
*   UnrealSync

### SDL2 with multi-monitor support

If you run multi-monitor setup and have issues e.g. Editor splash screen appears centered between displays, make sure that SDL2 is compiled with xinerama and/or xrandr support. You will need to have the dev libs of both installed ahead of time. In Ubuntu (and alike) do:

$ sudo apt-get install libxinerama-dev libxrandr-dev x11proto-xinerama-dev

Then re-build SDL2:

$ cd Engine/Source/ThirdParty/SDL2 && ./build.sh

Distro Specific Instructions
----------------------------

### Setting up on Ubuntu

#### Installing Dependencies

Ubuntu users can install the dependencies needed to build Unreal Engine 4 by running the following command:

\_\_14.04\_\_

$ sudo apt-get install build-essential mono-gmcs mono-xbuild mono-dmcs libmono-corlib4.0-cil libmono-system-data-datasetextensions4.0-cil libmono-system-web-extensions4.0-cil libmono-system-management4.0-cil libmono-system-xml-linq4.0-cil cmake dos2unix clang-3.5 libfreetype6-dev libgtk-3-dev libmono-microsoft-build-tasks-v4.0-4.0-cil xdg-user-dirs

\_\_16.04\_\_

$ sudo apt-get install build-essential mono-mcs mono-devel mono-xbuild mono-dmcs mono-reference-assemblies-4.0 libmono-system-data-datasetextensions4.0-cil libmono-system-web-extensions4.0-cil libmono-system-management4.0-cil libmono-system-xml-linq4.0-cil cmake dos2unix clang-3.5 libfreetype6-dev libgtk-3-dev libmono-microsoft-build-tasks-v4.0-4.0-cil xdg-user-dirs

### Setting up on CentOS 7

See [Building on CentOS](/index.php?title=Building_On_Centos "Building On Centos") page.

  

### Setting up on Fedora 20

See [https://forums.unrealengine.com/showthread.php?53451-Successful-4-6-0-build-on-Fedora-20-x86\_64](https://forums.unrealengine.com/showthread.php?53451-Successful-4-6-0-build-on-Fedora-20-x86_64)

  

### Setting up on Arch Linux

For a manual install, the dependencies needed to build Unreal Engine 4 can be added by running the following command:

$ sudo pacman -S mono clang35 dos2unix cmake

Arch users will have to either recompile their Clang or get a compiled package that does not use ld.gold, because ld.gold causes linking problems yet has been hard coded into Clang.

Optionally you could go through the following steps for a work around (faster and easier):

1\. Open up a terminal.

2\. Execute the following command:

$ mkdir ~/bin/ && cd ~/bin/ && ln -s /bin/ld.bfd ./ld.gold

3\. Add the following line to your .bashrc (or .zshrc if you use zsh) usually found in the home folder (hidden).

export PATH=$HOME/bin:$PATH

4\. Close all your terminals to apply the changes.

**Arch Linux users should try building the Editor using the Debug profile if Development (default) does not work**:

$ make UE4Editor-Linux-Debug

This might work better and not cause threading crashes seen when building standard "Development" profile. More investigation is needed at this point.

### Setting up on Linux Mint

#### Before running "First Time Setup"

Mint users should install the dependencies needed to build Unreal Engine 4 by running the following command:

version (09.2016):

sudo apt install git build-essential clang-3.8 libglew-dev libcheese8 libcheese-gtk25 libclutter-gst-3.0-0 libcogl20 libclutter-gtk-1.0-0 libclutter-1.0-0  xserver-xorg-input-all

Now that Clang is installed; Mint users should also make a Symlink for clang & clang++:

sudo ln -s /usr/bin/clang-3.8 /usr/bin/clang
sudo ln -s /usr/bin/clang++-3.8 /usr/bin/clang++

#### libGL

When running SlateViewer, and later UE4Editor, libGL.so.1 needs to be either preloaded with LD\_PRELOAD -OR- an installation of a package like fglrx to add the library to the build.

installation example:

sudo apt-get install fglrx

\-OR-

LD\_PRELOAD method: After "make ./SlateViewer":

export LD\_PRELOAD=/usr/lib/x86\_64-linux-gnu/mesa/libGL.so.1 SlateViewer 

then run ./SlateViewer

and after UE4Editor is built:

export LD\_PRELOAD=/usr/lib/x86\_64-linux-gnu/mesa/libGL.so.1 UE4Editor

then run ./UE4Editor

After Building
==============

Generating project files for your project
-----------------------------------------

To generate project files for your project, you need to run this command from the UnrealEngine folder:

$ ./GenerateProjectFiles.sh -project="/home/user/Documents/Unreal\\ Projects/MyProject/MyProject.uproject" -game -engine

### Visual Studio Code project files

To generate project files for visual studio code, you need to pass -vscode parameter to the GenerateProjectFiles.sh script:

$ ./GenerateProjectFiles.sh -project="/home/user/Documents/Unreal\\ Projects/MyProject/MyProject.uproject" -game -engine -vscode

This will also generate the necessary include file lists for vscode, they should be found in projectdir/.vscode.

Opening your project
--------------------

To open your project directly from the command line, you need to run this command from the Engine/Binaries/Linux folder in the UnrealEngine folder:

$ ./UE4Editor "/home/user/Documents/Unreal\\ Projects/MyProject/MyProject.uproject"

### Debian Based Distros Integration

As of 4.16 the Setup.sh creates a .desktop file for the engine, mime type for .uproject files, and adds an icon for .uproject files.

This is a try to make an early integration with the system and it may not work as expected.

<-- Back to the main [Linux Support](/index.php?title=Linux_Support "Linux Support") page.

### A Note on IPTables

As of at least 4.17, when building lighting, the engine requires that port 6666/udp be opened or it will fail with some cryptic messages

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Building\_On\_Linux&oldid=17](https://wiki.unrealengine.com/index.php?title=Building_On_Linux&oldid=17)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")