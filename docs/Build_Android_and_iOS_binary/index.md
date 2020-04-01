 Build Android and iOS binary - Epic Wiki             

 

Build Android and iOS binary
============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Android](#Android)
*   [3 IOS](#IOS)
*   [4 Conclusion](#Conclusion)

Overview
--------

Greetings!

This is a simple tutorial show you how to build UE4 binary for Android and iOS platform on Windows.

Let's start from Android.

Android
-------

Navigate to \[ENGINE Source LOCATION\]\\Engine\\Extras\\Android, you'll find tadp-2.0r8-windows.exe, this a one-stop solution for Android development from NVIDIA, run the exe and use the default installation set to install. It will begin to download and install everything needed to build Android native application.

The important pieces are:

*   SDK

*   NDK

*   JDK

*   Ant

After the installation done, you should close your UE4.sln if it is open, then run \[ENGINE INSTALL LOCATION\]\\GenerateProjectFiles.bat to refresh the project files.

Load UE4.sln again, now you can select Android platform from the target platform drop down list on Visual Studio toolbar, then you should change the solution configuration from Development Editor to Development, now you can right click UE4 project to build it. If everything is going well, when build progress done, you'll find UE4Game-armv7.apk和UE4Game-armv7.so in \[ENGINE Source LOCATION\]\\Engine\\Binaries fold, UE4Game-armv7.so is UE4 Android runtime library.

IOS
---

Build for Android platform is straightforward, for iOS there is a little more steps.

Before start, there is something need to clarify.

Unreal Engine use a uniform build system, that is you can start launch any platform build proccess within Visual Studio， then UnrealBuildTool will route the build configuration parameters to platform independent toolchain to build。

For iOS platform, UnrealBuildTool use RPC protocol transfer needed source file and compile command to Mac，then UnrealRemoteTool will parse the compile command and launch clang to compile.

Prerequisite:

1\. A Macintosh running Mac OS 10.9.2 or higher, virtual machine is OK.

2.With XCode 5.1 and Command Line Tool installed.

3.Change the Mac OS host name to a1011(UnrealBuildTool will searching for this host).

4.Running UnrealRemoteTool on Mac OS.

5.You should have a validate certificate for iOS development，more information please refer [https://docs.unrealengine.com/latest/INT/Platforms/iOS/GettingStarted/index.html](https://docs.unrealengine.com/latest/INT/Platforms/iOS/GettingStarted/index.html).

change the mobileprovision file name to UE4Game.mobileprovision and put it into \[ENGINE Source LOCATION\]\\Engine\\Build\\IOS

Note: UnrealRemoteTool can find at \[ENGINE Source LOCATION\]\\Engine\\Build\\IOS

6.On Mac OS, open terminal window and execute follow command:

sudo mkdir /UE4

sudo chmod 777 /UE4

sudo mkdir -p /Library/MobileDevice/Provisioning\\ Profiles

sudo chmod 777 /Library/MobileDevice/Provisioning\\ Profiles

Now we can start build, change target platform to IOS and solution configuration to Development in Visual Studio, right click UE4 project to build.

When build process done， you can find UE4Game.app, UE4Game.ipa in /UE4/Builds/HostPCName/Users/MacUserName/Desktop/UnrealEngine-4.0/Engine/Binaries/IOS

Conclusion
----------

The Unreal Engine 4 codebase is invaluable for developer and this uniform build system is easy to deploy and maintain, we can learn something from this treasure.

[Eros](/index.php?title=User:Eros&action=edit&redlink=1 "User:Eros (page does not exist)") ([talk](/index.php?title=User_talk:Eros&action=edit&redlink=1 "User talk:Eros (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Build\_Android\_and\_iOS\_binary&oldid=701](https://wiki.unrealengine.com/index.php?title=Build_Android_and_iOS_binary&oldid=701)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")