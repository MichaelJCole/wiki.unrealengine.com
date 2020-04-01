Building On Centos - Epic Wiki                    

Building On Centos
==================

Contents
--------

*   [1 CentOS 7 - Unreal Engine 4 Guide for Release Branch (last updated at time of writing 4.7)](#CentOS_7_-_Unreal_Engine_4_Guide_for_Release_Branch_.28last_updated_at_time_of_writing_4.7.29)
    *   [1.1 Foreword](#Foreword)
    *   [1.2 CentOS 7 Installation](#CentOS_7_Installation)
        *   [1.2.1 Starting with a Clean Slate](#Starting_with_a_Clean_Slate)
        *   [1.2.2 Update](#Update)
        *   [1.2.3 Adding Some Repos](#Adding_Some_Repos)
            *   [1.2.3.1 Reasons to have Repos](#Reasons_to_have_Repos)
            *   [1.2.3.2 Adding some software](#Adding_some_software)
                *   [1.2.3.2.1 Steam](#Steam)
                *   [1.2.3.2.2 VLC](#VLC)
                *   [1.2.3.2.3 HEXChat](#HEXChat)
                *   [1.2.3.2.4 System Libraries](#System_Libraries)
        *   [1.2.4 Installing your Video Card](#Installing_your_Video_Card)
    *   [1.3 Installing Unreal Engine 4](#Installing_Unreal_Engine_4)
        *   [1.3.1 Getting the source](#Getting_the_source)
        *   [1.3.2 Getting the Dependencies](#Getting_the_Dependencies)
            *   [1.3.2.1 System Required Compilers and Dependencies](#System_Required_Compilers_and_Dependencies)
            *   [1.3.2.2 Unreal Engine 4 Dependencies](#Unreal_Engine_4_Dependencies)
    *   [1.4 Building Unreal Engine 4](#Building_Unreal_Engine_4)
    *   [1.5 Running Unreal Engine 4 Editor](#Running_Unreal_Engine_4_Editor)
    *   [1.6 Learning From This](#Learning_From_This)

CentOS 7 - Unreal Engine 4 Guide for Release Branch (last updated at time of writing 4.7)
=========================================================================================

Foreword
--------

This guide is being created to help troubleshoot problems that the Unreal Engine is currently having in regards to running on CentOS 7, for those people looking to have official tech support when running professional applications from Autodesk such as Maya. CentOS 7 is the best option, while not currently offically supported yet by Autodesk, Autodesk does have a long history of only providing support for the RedHat distro and recently CentOS. I'd also like to note that this guide is not an official document from Epic on running the Unreal Engine 4 on CentOS 7, but a user created guide to attempt to help this application succeed on Linux in general.

Also I'd also like to note -- not all computers are going to be able to run Unreal 4 as a game or editor. Even if you can install Centos 7 x64 on your computer, that doesn't mean your hardware will be power enough to run Unreal 4.

CentOS 7 Installation
---------------------

If you need help because you've never used Linux at all or are just new to Centos, I suggest reading this article from Unixmen.

[http://www.unixmen.com/linux-basics-install-centos-7-machine/](http://www.unixmen.com/linux-basics-install-centos-7-machine/)

### Starting with a Clean Slate

Installed CentOS 7 and only worried about the installation and formatting of the main system drive. The system was installed as a "Development and Creative Workstation" and included the following package groups were checked from the menu on the right side.

Compatibility Libraries
Development Tools
Graphics Creation Tools
Office Suite and Productivity

Note - The User that was created during the install process was also made an administrator by checking the box.

This process should install 1538 packages.

### Update

After rebooting I opened an console and ran

$ sudo yum clean all
$ sudo yum update

### Adding Some Repos

#### Reasons to have Repos

Now that the system has been updated it's time to add the additional repos EPEL, Nux-Desktop and Mono-Project. For those that don't know, a Repository is another source of linux packages designed for a specific distro. This allows you as a user to install software that doesn't offically come from CentOS or Redhat without having to build the software from source code. Offical repos come added to a system when you install to do thinks like provide updates. Extra Packages Enterprise Linux (EPEL) adds some additional packages that aren't included in CentOS 7 and have been tested by the Fedora Community for RedHat 7, such as mono and clang. The Nux-Desktop repo aims to bring better multimedia packages to Enterprise Linux includes programs such as Steam, vlc and other multimedia software that you'll find useful when working with the Unreal Engine 4, such as HandBrake to better encode videos produced by Unreal's Matinee. These repos work well together and trying to not overwrite the base CentOS 7 packages. This means that your software won't break because of library incompatiablities.

$ sudo yum install epel-release 
$ sudo rpm -Uvh [http://li.nux.ro/download/nux/dextop/el7/x86\_64/nux-dextop-release-0-1.el7.nux.noarch.rpm](http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-1.el7.nux.noarch.rpm)

And a special thanks to JKnife who has provided the community with repo that contains mono 3.10 and clang 3.5.

$ wget [http://copr.fedoraproject.org/coprs/jknife/ue4deps/repo/epel-7/jknife-ue4deps-epel-7.repo](http://copr.fedoraproject.org/coprs/jknife/ue4deps/repo/epel-7/jknife-ue4deps-epel-7.repo)
$ sudo cp jknife-ue4deps-epel-7.repo /etc/yum.repos.d/jknife-ue4deps-epel-7.repo

Alternatively you can run the following commands to install the official up to date Mono (3.12) from Mono-Project by running the following commands.

$ sudo rpm --import "[http://keyserver.ubuntu.com/pks/lookup?op=get&search=0x3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF](http://keyserver.ubuntu.com/pks/lookup?op=get&search=0x3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF)"
$ sudo yum-config-manager --add-repo [http://download.mono-project.com/repo/centos/](http://download.mono-project.com/repo/centos/)

#### Adding some software

After adding the repos, I installed the following.

$ sudo yum install steam vlc hexchat ntfs-3g mesa-libGLU

If you plan on having Autodesk Maya installed, then you should also run the following command to install some font's that aren't checked as dependencies when you install Maya.

$ sudo yum install xorg-x11-fonts-ISO8859-1-100dpi xorg-x11-fonts-ISO8859-1-75dpi xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi libXp

##### Steam

I'm not sure I really have to explain Steam. It's the Steam client from Valve.

##### VLC

Installing vlc allows you to watch the videos created using Unreal 4 Matinee.

  

##### HEXChat

Installing xchat will allow you join the IRC chat at irc.freenode.net #UE4Linux

  

##### System Libraries

ntfs-3g is installed so you can see any windows drives on your system.

mesa-libGLU was installed because it is needed if you intend to use Blender.

### Installing your Video Card

Now it's time to install your video card, the open source video card drivers may work alright but often times better to get the closed source Nvidia and Radeon drivers, especially if you are using professional applications such as Autodesk Maya.

Please note that while some repos provide these graphics drivers in packages for CentOS 7, these repos may overwrite packages provided by RedHat, CentOS and Fedora and can effect the stablity of your system. Meaning - you may want to look at how to install the drivers by making a package for your system directly from the installers provided by Nvidia or AMD. This may mean you need to re-install the driver with every kernel update as well.

Installing Unreal Engine 4
--------------------------

Now that you have the system installed and the correct video card drivers and the case insensitive filesystem ready it's time to get the source and build Unreal Engine 4.

### Getting the source

Created a directory to save the clean branch in my home Directory.

$ cd Documents
$ mkdir Epic
$ cd /home/$USER/Documents/Epic
$ git clone [https://github.com/EpicGames/UnrealEngine](https://github.com/EpicGames/UnrealEngine) -b release
$ cd UnrealEngine

### Getting the Dependencies

#### System Required Compilers and Dependencies

Getting Dependencies - if you are trying to go with what RedHat, Centos and Fedora provide to keep it simple and stable, which installs mono 2.10.8 and clang/llvm 3.4.2, Unreal Engine will not build for you. Both package versions are known to have some problems on Mac and other Linux distros. With the Additional repo from JKnife that I talked about earlier in the guide you can run the following to install what is needed to build Unreal Engine 4. (These commands also work if you've installed the official mono-project repo like I have)

$ sudo yum install mono-core mono-devel dos2unix cmake gtk3-devel clang

mono-core and mono-devel installs the additional dependencies

glib2-devel libgdiplus mono-data mono-data-sqlite mono-extras mono-mvc mono-wcf mono-web mono-winforms mono-winfx monodoc

gtk3-devel is needed to build the LinuxNativeDialogs since Gnome is the default desktop on CentOS 7. gtk3-devel installs the additional dependencies

 at-spi2-atk-devel atk-devel cairo-devel cairo-gobject-devel expat-devel fontconfig-devel freetype-devel gdk-pixbuf2-devel gl-manpages harfbuzz-devel libX11-devel libXau-devel libXcomposite-devel libXcursor-devel libXdamage-devel libXext-devel libXfixes-devel libXft-devel libXi-devel libXinerama-devel libXrandr-devel libXrender-devel libXxf86vm-devel libdrm-devel libicu-devel libpng-devel libxcb-devel mesa-libEGL-devel mesa-libGL-devel pango-devel pixman-devel xorg-x11-proto-devel kzlib-devel

clang installs the additional dependencies

llvm llvm-libs

#### Unreal Engine 4 Dependencies

Next you have to generate your Oauth token on github's site.

[https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)

Then export or Oauth key with the following command

$ export OAUTH\_TOKEN=YourLongStringOfNumbersHere
$ cd
$ cd UnrealEngine
$ ./Setup.sh

Because Mono 3.10.0 or 3.12.0 was installed the follow command needs to be run in order to even generate the make files.

$ find Engine/Source/Programs/AutomationTool -name "\*Automation.csproj" -exec sed -i "s/ToolsVersion=\\"11.0\\"/ToolsVersion=\\"4.0\\"/g" "{}" \\;

Now we can generate the make files in order to start building Unreal Engine 4.

$ ./GenerateProjectFiles.sh

It should now run and update the dependency files you need if they are out of date.

Building Unreal Engine 4
------------------------

The follow commands should be all you need to do in order to have the editor running in CentOS 7.

$ cd 
$ cd UnrealEngine
$ make UE4Client SlateViewer ShaderCompileWorker UnrealLightmass UnrealPak UE4Editor

This could take a while depending on your machine. On an AMD FX 4150, I walked my dogs and got some lunch.

Running Unreal Engine 4 Editor
------------------------------

This step is one of the easiest steps but it's important to see what is working and what isn't working currently with Unreal Engine 4 on the linux platform.

$ cd Engine/Binaries/Linux
$ ./UE4Editor

If the UE4Editor is crashing when you exit you can try launching with the following (undocumented) command.

$ ./UE4Editor -ansimalloc

Learning From This
------------------

I hope this helps people and helps Unreal Engine 4 make it's move to Linux.

<-- Back to the [Building on Linux](/Building_On_Linux "Building On Linux") page.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Building\_On\_Centos&oldid=23648](https://wiki.unrealengine.com/index.php?title=Building_On_Centos&oldid=23648)"

  ![](https://tracking.unrealengine.com/track.png)