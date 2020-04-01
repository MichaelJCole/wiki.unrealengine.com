Mobile Development Troubleshooting Guide - Epic Wiki                    

Mobile Development Troubleshooting Guide
========================================

_This page is currently under construction, more errors and solutions will be added over time._

Contents
--------

*   [1 Additional Resources](#Additional_Resources)
*   [2 Windows](#Windows)
    *   [2.1 Android](#Android)
        *   [2.1.1 Build Failing](#Build_Failing)
        *   [2.1.2 Not Deploying to the Device](#Not_Deploying_to_the_Device)
        *   [2.1.3 How to fix Advertisements and Googleplay Leaderboards](#How_to_fix_Advertisements_and_Googleplay_Leaderboards)
        *   [2.1.4 Crashing Once Deployed on the Device](#Crashing_Once_Deployed_on_the_Device)
        *   [2.1.5 Game Freezing Once Deployed](#Game_Freezing_Once_Deployed)
        *   [2.1.6 Game crashing due to a Static Mesh](#Game_crashing_due_to_a_Static_Mesh)
        *   [2.1.7 Screen is Black, but Analogs are Showing](#Screen_is_Black.2C_but_Analogs_are_Showing)
        *   [2.1.8 Dynamic Shadows are not Rendering Properly](#Dynamic_Shadows_are_not_Rendering_Properly)
        *   [2.1.9 Failed to find Shader Map for default material WorldGridMaterial!](#Failed_to_find_Shader_Map_for_default_material_WorldGridMaterial.21)
        *   [2.1.10 Unable to load level on Android project](#Unable_to_load_level_on_Android_project)
        *   [2.1.11 Using FPaths::ConvertRelativePathToFull on Android](#Using_FPaths::ConvertRelativePathToFull_on_Android)
        *   [2.1.12 Materials not Showing Correctly](#Materials_not_Showing_Correctly)
        *   [2.1.13 Android Missing .so File](#Android_Missing_.so_File)
        *   [2.1.14 AndroidWorks SDK Installation Error](#AndroidWorks_SDK_Installation_Error)
        *   [2.1.15 Unimplemented OpenGL ES API](#Unimplemented_OpenGL_ES_API)
        *   [2.1.16 AutomationTool Unable to Run](#AutomationTool_Unable_to_Run)
        *   [2.1.17 Error Exporting to Android](#Error_Exporting_to_Android)
        *   [2.1.18 Orientation Trouble](#Orientation_Trouble)
        *   [2.1.19 Launch Failure](#Launch_Failure)
        *   [2.1.20 Asus Transformer TF700T: Screen Garbled on Deploy](#Asus_Transformer_TF700T:_Screen_Garbled_on_Deploy)
        *   [2.1.21 APKBlacklist is not working? (4.13)](#APKBlacklist_is_not_working.3F_.284.13.29)
        *   [2.1.22 How to correctly package a prebuilt shared library (.so)?](#How_to_correctly_package_a_prebuilt_shared_library_.28.so.29.3F)
    *   [2.2 iOS](#iOS)
        *   [2.2.1 Build Failing](#Build_Failing_2)
        *   [2.2.2 Not Deploying to the Device](#Not_Deploying_to_the_Device_2)
        *   [2.2.3 Crashing Once Deployed to the Device](#Crashing_Once_Deployed_to_the_Device)
        *   [2.2.4 Screen is Black, but Analogs are Showing](#Screen_is_Black.2C_but_Analogs_are_Showing_2)
        *   [2.2.5 Dynamic Shadows not Rendering Properly](#Dynamic_Shadows_not_Rendering_Properly)
        *   [2.2.6 Materials or Textures rendering Black or Splotchy](#Materials_or_Textures_rendering_Black_or_Splotchy)
        *   [2.2.7 How do you disable packaging a second chunk for IPA?](#How_do_you_disable_packaging_a_second_chunk_for_IPA.3F)
*   [3 Mac](#Mac)
    *   [3.1 Android](#Android_2)
    *   [3.2 iOS](#iOS_2)
        *   [3.2.1 Build Failing](#Build_Failing_3)
        *   [3.2.2 Not Deploying to the Device](#Not_Deploying_to_the_Device_3)
        *   [3.2.3 Screen is Black, but Analogs are Showing](#Screen_is_Black.2C_but_Analogs_are_Showing_3)
        *   [3.2.4 Dynamic Shadows not Rendering Properly](#Dynamic_Shadows_not_Rendering_Properly_2)
        *   [3.2.5 Materials or Textures rendering Black or Splotchy](#Materials_or_Textures_rendering_Black_or_Splotchy_2)
        *   [3.2.6 Setting up iOS Device Compatibility for the Apple Store](#Setting_up_iOS_Device_Compatibility_for_the_Apple_Store)
        *   [3.2.7 Setting up Flurry Analytics for iOS](#Setting_up_Flurry_Analytics_for_iOS)
*   [4 Additional Information](#Additional_Information)
    *   [4.1 Creating a Bug Report](#Creating_a_Bug_Report)
    *   [4.2 How to get logs off of an iOS device](#How_to_get_logs_off_of_an_iOS_device)
        *   [4.2.1 Windows](#Windows_2)
        *   [4.2.2 Mac](#Mac_2)
    *   [4.3 How to get logs off of an Android device](#How_to_get_logs_off_of_an_Android_device)
    *   [4.4 How to Remove Obsolete Mobile Provision Profiles (iOS)](#How_to_Remove_Obsolete_Mobile_Provision_Profiles_.28iOS.29)
        *   [4.4.1 Windows](#Windows_3)
        *   [4.4.2 Mac](#Mac_3)
    *   [4.5 Useful Mobile Documentation](#Useful_Mobile_Documentation)

Mobile Development Troubleshooting Guide

Here is your one stop shop to find solutions to the most common mobile development and packaging . Take a look to see if the problems you are experiencing are listed and if so what steps you can take to fix the bug. If these fixes do not work, there will be a list of information needed when you make a post on the **[Answerhub](http://answers.unrealengine.com)** detailing your specific error.

Additional Resources
--------------------

Here are a few extra pages that may help determine if the error you are seeing is a bug in engine or a compatibility error with the specific device you are using.

*   [Android Device Compatibility](/Android_Device_Compatibility "Android Device Compatibility")
*   [IOS Device Compatibility](/IOS_Device_Compatibility "IOS Device Compatibility")
*   [Android Quick Start](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/index.html)
*   [iOS Quick Start](https://docs.unrealengine.com/latest/INT/Platforms/iOS/QuickStart/index.html)

**This page is currently under development and will be populated as we find more common mobile development bugs/crashes. Thank you for your understanding.**

Windows
=======

Android
-------

### Build Failing

  
**4.11 or earlier:**

1.  Make sure you have AndroidWorks installed instead of CodeWorks.
2.  Be sure that you are using Visual Studio 2013.
3.  Did you follow the SDK Documentation? (Found [here](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/1/index.html))

*   If not, Re-installation of SDK may be necessary.

5.  Did you download the correct [Drivers](/Android_Device_Compatibility "Android Device Compatibility") for your device?
6.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

  
**4.12 or higher:**

1.  Make sure that you have CodeWorks installed instead of AndroidWorks.
2.  Be sure that Visual Studio 2015 is installed.
3.  Did you follow the SDK Documentation? (Found [here](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/1/index.html))

*   If not, Re-installation of SDK may be necessary.

5.  Did you download the correct [Drivers](/Android_Device_Compatibility "Android Device Compatibility") for your device?
6.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

**Build Failure Solutions:**

1.  Failure due to [both old and new .jar files included in build library](https://answers.unrealengine.com/questions/294806/ue-49-android-launch-fails.html)
2.  Warning: [Major Version 51 is newer than 50](https://answers.unrealengine.com/questions/264423/android-package-build-fail.html).
3.  [SDK/NDK version mismatch.](https://answers.unrealengine.com/questions/294430/packaging-for-android-fail-on-49-was-working-on-48.html)
4.  Build failure due to [NDK API Level of Android-23](https://answers.unrealengine.com/questions/294258/49-androidworks-cant-package-my-game.html).
5.  Error [GameActivity.java:277: error: cannot find symbol](https://answers.unrealengine.com/questions/464357/gameactivityjava277-error-cannot-find-symbol.html).
6.  Build failure due to [Android Keystore](https://answers.unrealengine.com/questions/394628/android-keystore-file-cannot-be-found.html) not being found.
7.  ['wchar.h' file not found.](https://answers.unrealengine.com/questions/370017/wcharh-file-not-found.html)

### Not Deploying to the Device

1.  Is your [Device Supported?](/Android_Device_Compatibility "Android Device Compatibility")
2.  Is the phone on [Developer Mode](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/2/index.html)?
3.  Do you have the correct [Drivers](/Android_Device_Compatibility "Android Device Compatibility") installed? (Located in the Epic Games Device List graph)
4.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
5.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### How to fix Advertisements and Googleplay Leaderboards

Solution: [AnswerHub](https://answers.unrealengine.com/questions/473592/ads-not-working-in-android-game.html)2.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
3.  Review [Unreal Match 3 Advertisement Documentation](https://docs.unrealengine.com/latest/INT/Platforms/Android/Ads/)
4.  Review [Google Developer Documentation](https://developer.android.com/google/index.html)
5.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Crashing Once Deployed on the Device

1.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
2.  Obtain [Monitor.bat](https://wiki.unrealengine.com/index.php?title=Mobile_Development_Troubleshooting_Guide#How_to_get_logs_off_of_an_Android_device) logs from device.

*   These logs will be vital when writing a Bug Report

4.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Game Freezing Once Deployed

1.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
2.  Did you recently change the API level?
3.  If not, obtain [Monitor.bat](https://wiki.unrealengine.com/index.php?title=Mobile_Development_Troubleshooting_Guide#How_to_get_logs_off_of_an_Android_device) logs from device.

*   These logs will be vital when writing a Bug Report

5.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Game crashing due to a Static Mesh

1.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
2.  Does deleting your Intermediate, Saved and Config folders from your project resolve the issue?
3.  Are you able to launch onto your device?
4.  Does it only crash in the engine? If so, save your Output Logs as a .txt file.
5.  Does the application crash once it's on your device?
6.  If so, obtain [Monitor.bat](https://wiki.unrealengine.com/index.php?title=Mobile_Development_Troubleshooting_Guide#How_to_get_logs_off_of_an_Android_device) logs from device.

*   Either of these logs will be vital when writing a Bug Report

8.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Screen is Black, but Analogs are Showing

1.  Is your [Device Supported?](/Android_Device_Compatibility "Android Device Compatibility")
2.  Have you built your lighting/lightmass?
3.  Make sure your Default/Startup Map is set correctly in ‘Project Settings’
4.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Dynamic Shadows are not Rendering Properly

1.  Is the Directional Light in the project set to Movable?
2.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Failed to find Shader Map for default material WorldGridMaterial!

1.  Did you change your r.MobileHDR option in DefaultDeviceProfile.ini?
2.  If so, does it differ from your settings in ProjectSettings? Make sure they both match one another.
3.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Unable to load level on Android project

Solution: [AnswerHub](https://answers.unrealengine.com/questions/489178/launch-error-unable-to-load-level-onto-htc-m9.html)2.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
3.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Using FPaths::ConvertRelativePathToFull on Android

Solution: [AnswerHub](https://answers.unrealengine.com/questions/498328/androidconvertrelativepathtofull-didnt-work.html)2.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Materials not Showing Correctly

1.  [Materials for Mobile Platforms](https://docs.unrealengine.com/latest/INT/Platforms/Mobile/Materials/index.html)
2.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
3.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Android Missing .so File

Android missing .so file to launch or package (ERROR: Can't make an APK without the compiled .so \[C:\\Program Files\\Epic Games\\4.6\\Engine\\Binaries\\Android\\UE4Game-x86-es2.so\])

Solution: Open Project Setting and in Platforms/Android/Build uncheck "Support x86"1.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
2.  Post your issue on the [Answerhub](https://answers.unrealengine.com/)

**We will need the following information:***   Crash logs
*   [DxDiag](https://support.microsoft.com/en-us/instantanswers/b319762b-f281-41b4-b746-d14de804b246/open-and-run-dxdiag.exe)
*   Engine version
*   The exact type of mobile device (Example: Samsung Galaxy S3)
*   The exact version of the Operating System being used on the device
*   Can it be reproduced in a clean project?
*   If it can be reproduced, we will need a detailed list of steps to reproduce the issue on our end

### AndroidWorks SDK Installation Error

Solution: Contact [NVIDIA®](http://www.nvidia.com/page/support.html) for support.

### Unimplemented OpenGL ES API

Galaxy S3 mini: called unimplemented OpenGL ES API

Solution: Galaxy S3 mini is not supported1.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
2.  Post your issue on the [Answerhub](https://answers.unrealengine.com/)

**We will need the following information:***   Crash logs
*   [DxDiag](https://support.microsoft.com/en-us/instantanswers/b319762b-f281-41b4-b746-d14de804b246/open-and-run-dxdiag.exe)
*   Engine version
*   The exact type of mobile device (Example: Samsung Galaxy S3)
*   The exact version of the Operating System being used on the device
*   Can it be reproduced in a clean project?
*   If it can be reproduced, we will need a detailed list of steps to reproduce the issue on our end

### AutomationTool Unable to Run

Packaging (Android (All)): BUILD FAILED AutomationTool was unable to run successfully.

Solution: [Video: Setting up Android Development Environment | UE4](http://www.youtube.com/watch?v=e9YApCIx18Q)2.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
3.  Post your issue on the [Answerhub](https://answers.unrealengine.com/)

**We will need the following information:***   Crash logs
*   [DxDiag](https://support.microsoft.com/en-us/instantanswers/b319762b-f281-41b4-b746-d14de804b246/open-and-run-dxdiag.exe)
*   Engine version
*   The exact type of mobile device (Example: Samsung Galaxy S3)
*   The exact version of the Operating System being used on the device
*   Can it be reproduced in a clean project?
*   If it can be reproduced, we will need a detailed list of steps to reproduce the issue on our end

### Error Exporting to Android

Error Exporting to Android Platform (Software Development Kit (SDK) not found. Please install the SDK for the Android target platform)

Solution: Make sure NVPACK is properly installed1.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
2.  Post your issue on the [Answerhub](https://answers.unrealengine.com/)

**We will need the following information:***   Crash logs
*   [DxDiag](https://support.microsoft.com/en-us/instantanswers/b319762b-f281-41b4-b746-d14de804b246/open-and-run-dxdiag.exe)
*   Engine version
*   The exact type of mobile device (Example: Samsung Galaxy S3)
*   The exact version of the Operating System being used on the device
*   Can it be reproduced in a clean project?
*   If it can be reproduced, we will need a detailed list of steps to reproduce the issue on our end

### Orientation Trouble

Incorrect Orientation for Download Background

Solution: Replace the image with a 1280x720 image. Copy the downloader\_progress.xml in Engine/Build/Java/res/layout to your project's Build/Android/res/layout (make the directories as needed). Edit downloader\_progress.xml and change the orientation="vertical" to "horizontal".1.  Similar [Answerhub](https://answers.unrealengine.com/questions/436788/landscape-oriented-download-background-android.html) issue.
2.  Post your issue on the [Answerhub](https://answers.unrealengine.com/)

**We will need the following information:***   Crash logs
*   [DxDiag](https://support.microsoft.com/en-us/instantanswers/b319762b-f281-41b4-b746-d14de804b246/open-and-run-dxdiag.exe)
*   Engine version
*   The exact type of mobile device (Example: Samsung Galaxy S3)
*   The exact version of the Operating System being used on the device
*   Can it be reproduced in a clean project?
*   If it can be reproduced, we will need a detailed list of steps to reproduce the issue on our end

### Launch Failure

Andriod Launch Failure (The system cannot find the path specified.)

Solution: Try to reinstall the Android SDK. If you have not previously done so, you can find documentation here on how to set it up: [Documentation: Getting Started on Android](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/1/index.html)2.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
3.  Post your issue on the [Answerhub](https://answers.unrealengine.com/)

**We will need the following information:***   Crash logs
*   [DxDiag](https://support.microsoft.com/en-us/instantanswers/b319762b-f281-41b4-b746-d14de804b246/open-and-run-dxdiag.exe)
*   Engine version
*   The exact type of mobile device (Example: Samsung Galaxy S3)
*   The exact version of the Operating System being used on the device
*   Can it be reproduced in a clean project?
*   If it can be reproduced, we will need a detailed list of steps to reproduce the issue on our end

### Asus Transformer TF700T: Screen Garbled on Deploy

Asus Transformer TF700T is recognized by the engine, but when pushing to deploy the screen on the tablet looks garbled.

Solution: Disabled Mobile HDR and Use Android DXT1.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
2.  Post your issue on the [Answerhub](https://answers.unrealengine.com/)

**We will need the following information:***   Crash logs
*   [DxDiag](https://support.microsoft.com/en-us/instantanswers/b319762b-f281-41b4-b746-d14de804b246/open-and-run-dxdiag.exe)
*   Engine version
*   The exact type of mobile device (Example: Samsung Galaxy S3)
*   The exact version of the Operating System being used on the device
*   Can it be reproduced in a clean project?
*   If it can be reproduced, we will need a detailed list of steps to reproduce the issue on our end

### APKBlacklist is not working? (4.13)

Solution: [AnswerHub: ApkBlacklist-Shipping.txt not working](https://answers.unrealengine.com/questions/479126/apkblacklist-shippingtxt-not-working.html)2.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
3.  Post your issue on the [Answerhub](https://answers.unrealengine.com/)

**We will need the following information:***   Engine version
*   Log or screenshot from Blacklist

### How to correctly package a prebuilt shared library (.so)?

Solution: [AnswerHub: Prebuilt Shared Library (.so)](https://answers.unrealengine.com/questions/412020/what-is-correct-and-present-method-of-packaging-a.html)

iOS
---

**\*\*When building on a Windows machine, you are going to need to have [iTunes](https://www.apple.com/itunes/) available as well as a Mac available for [Remote Building](https://forums.unrealengine.com/showthread.php?78804-Windows-gt-iOS-Rsync-Remote-Build-Guide-(4-8))\*\***

### Build Failing

1.  Did you set up [SSH Remote Building?](https://forums.unrealengine.com/showthread.php?78804-Windows-gt-iOS-Rsync-Remote-Build-Guide-(4-8))
2.  Did you ‘Trust’ your PC on the iOS device?
3.  Did you ‘Trust’ the device on your PC via iTunes?
4.  Have you entered your Provisions and/or Certificate in the Project Settings>iOS section?
5.  Are the Provisions and/or Certificate sections highlighted red or green?
6.  Are you able to recreate this issue on a Blank Template Project?
7.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Not Deploying to the Device

1.  Did you set up [SSH Remote Building?](https://forums.unrealengine.com/showthread.php?78804-Windows-gt-iOS-Rsync-Remote-Build-Guide-(4-8))
2.  Did you ‘Trust’ your PC on your iOS device?
3.  Did you Trust the device on your PC, via iTunes?
4.  Have you entered your Provisions and/or Certificate in the Project Settings>iOS section?
5.  Are the Provisions and/or Certificate sections highlighted red or green?
6.  Are you able to recreate this issue on a Blank Template Project?
7.  If it is still occurring:

*   Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Crashing Once Deployed to the Device

1.  Would you be able to replicate this issue on a blank template project?

*   If so, could you provide steps to reproduce the issue?

3.  Would you be able to provide the logs from the device? (See below for how to acquire the logs needed)
4.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Screen is Black, but Analogs are Showing

1.  Have you built your lighting/lightmass?
2.  Make sure your Default/Startup Map is set correctly in ‘Project Settings’
3.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Dynamic Shadows not Rendering Properly

1.  Change Directional light from ‘Stationary’ to ‘Movable’
2.  Character has ‘Cast Dynamic Shadow’ checked
3.  Have you built lighting?
4.  [Lighting for Mobile Platforms](https://docs.unrealengine.com/latest/INT/Platforms/Mobile/Lighting/index.html)
5.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Materials or Textures rendering Black or Splotchy

1.  What is the normal intensity of your material?
2.  Are the texture samples formatted correctly for mobile?
3.  Uncheck the ‘Allow Static Lighting for Normal Maps’ within the ‘Project Settings’
4.  [Texture Guidelines for Mobile Platforms](https://docs.unrealengine.com/latest/INT/Platforms/Mobile/Textures/index.html)
5.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### How do you disable packaging a second chunk for IPA?

Solution: [AnswerHub: Disabling Second Chunk for IPA](https://answers.unrealengine.com/questions/483209/packaging-problem-3.html)2.  Search the [Answerhub](https://answers.unrealengine.com/) for similar issues.
3.  Post your issue on the [Answerhub](https://answers.unrealengine.com/)

**We will need the following information:***   Engine version
*   Can it be reproduced in a clean project?
*   Step by step reproduction

Mac
===

Android
-------

**\*\*[Android](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/) is now available for developing on Mac as of 4.12.\*\***

iOS
---

### Build Failing

1.  Have you entered your Provisions and/or Certificate in the Project Settings>iOS section?
2.  Are the Provisions and/or Certificate sections highlighted red or green?
3.  Are you able to recreate this issue on a Blank Template Project?
4.  Obtain the [iOS](https://wiki.unrealengine.com/index.php?title=Mobile_Development_Troubleshooting_Guide#How_to_get_logs_off_of_an_Android_device) logs from device.
5.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Not Deploying to the Device

1.  Have you entered your Provisions and/or Certificate in the Project Settings>iOS section?
2.  Are the Provisions and/or Certificate sections highlighted red or green?
3.  Are you able to recreate this issue on a Blank Template Project?
4.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Screen is Black, but Analogs are Showing

1.  Have you built your lighting/lightmass?
2.  Make sure your Default/Startup Map is set correctly in ‘Project Settings’.
3.  Obtain the [iOS](https://wiki.unrealengine.com/index.php?title=Mobile_Development_Troubleshooting_Guide#How_to_get_logs_off_of_an_Android_device) logs from device.
4.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Dynamic Shadows not Rendering Properly

1.  Change Directional light from ‘Stationary’ to ‘Movable’
2.  Character has ‘Cast Dynamic Shadow’ checked
3.  Have you built lighting?
4.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Materials or Textures rendering Black or Splotchy

1.  What is the normal intensity of your material?
2.  Are the texture samples formatted correctly for mobile?
3.  Uncheck the ‘Allow Static Lighting for Normal Maps’ within the ‘Project Settings’

### Setting up iOS Device Compatibility for the Apple Store

Solution: [Answerhub](https://answers.unrealengine.com/questions/222566/ios-device-compatibility-set-for-apple-store.html)2.  Documentation: [Device Compatibility](https://developer.apple.com/library/ios/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/DeviceCompatibilityMatrix/DeviceCompatibilityMatrix.html)
3.  Create a Bug Report on the [Answerhub](https://answers.unrealengine.com/). (See [‘Creating a Bug Report’](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#Creating_a_Bug_Report) below)

### Setting up Flurry Analytics for iOS

Solution: [Answerhub](https://forums.unrealengine.com/showthread.php?92932-Flurry-Documentation-Sentences-aren-t-even-finished)2.  Documentation: [In-Game Analytics](https://docs.unrealengine.com/latest/INT/Gameplay/Analytics/)

  

Additional Information
======================

Creating a Bug Report
---------------------

*   Is the mobile device Android or iOS?
*   What is the exact device they are using and what version is that device on?
*   Would you be able to reproduce this issue on a Blank Template Project?
*   What version of the Engine are you using and is that version a binary or source build?
*   What engine version did you first see this error occurring?
*   Would you be able to reproduce this issue on a blank template project?
*   If there is a crash, would it be occurring when opening the application on the device of while packaging the project?
*   Be sure to include any build failed logs or any logs that may help to understand what may be occurring.
*   If the application is crashing on an Android device, include the Monitor Logs. (Need to add a link for how to obtain the monitor logs)

How to get logs off of an iOS device
------------------------------------

### Windows

*   Open iPhonePackager (Engine/Binaries/DotNET/IOS)
*   Select a uproject file (Optional)
*   Select the Advance Tools tab
*   Select Other Deployment Tools…
*   Select Backup Documents…
*   Select the IPA for the game you wish to get a log for
*   The documents directory data will then be copied to Engine/Binaries/DotNET/IOS/IOS\_Backups or GameDir/IOS\_Backups if a uproject was selected
*   The log can then be found at IOS\_Backups/Game/Saved/Logs

### Mac

*   Connect device to a Mac
*   Open XCode > Window > Devices
*   Select your device
*   Select 'View Device Logs'
*   Select the process which matches your Game and Crash date/time
*   Right-click on the process and select 'Export Log'

How to get logs off of an Android device
----------------------------------------

*   Attach your phone to the computer
*   Go here: C:\\NVPACK\\android-sdk-windows\\tools
*   Open up Monitor.bat
*   Launch the program and save the logs

**If you cannot get Monitor.bat to open, please go to:**

*   C:\\NVPACK\\android-sdk-windows\\tools\\lib\\monitor-x86
*   Open up Monitor.exe
*   Follow the instructions above

How to Remove Obsolete Mobile Provision Profiles (iOS)
------------------------------------------------------

### Windows

*   C:\\Users\\<you>\\AppData\\Local\\Apple Computer\\MobileDevice\\Provisioning Profiles
*   Profiles will show up and can be deleted as necessary.

### Mac

*   ~/Library/MobileDevice/Provisioning Profiles
*   Profiles will show up and can be deleted as necessary.

Useful Mobile Documentation
---------------------------

**iOS***   [Building iOS on Windows](https://docs.unrealengine.com/latest/INT/Platforms/iOS/Windows/index.html)
*   [iOS Quick Start Documentation](https://docs.unrealengine.com/latest/INT/Platforms/iOS/QuickStart/1/index.html)
*   [iOS Device Compatibility](https://docs.unrealengine.com/latest/INT/Platforms/iOS/DeviceCompatibility/index.html)
*   [iOS Game Center](https://docs.unrealengine.com/latest/INT/Platforms/iOS/Leaderboards/index.html)
*   [iOS: Using In-Game Ads](https://docs.unrealengine.com/latest/INT/Platforms/iOS/Ads/index.html)

**Android**

*   [Android Quick Start Documentation](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/index.html)
*   [Android Device Compatibility](https://docs.unrealengine.com/latest/INT/Platforms/Android/DeviceCompatibility/index.html)
*   [Android: Using Google Play Achievements](https://docs.unrealengine.com/latest/INT/Platforms/Android/Achievements/index.html)
*   [Android: Using Ad Mob In-Game Ads](https://docs.unrealengine.com/latest/INT/Platforms/Android/Ads/index.html)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Mobile\_Development\_Troubleshooting\_Guide&oldid=23898](https://wiki.unrealengine.com/index.php?title=Mobile_Development_Troubleshooting_Guide&oldid=23898)"

[Category](/Special:Categories "Special:Categories"):

*   [Troubleshooting](/Category:Troubleshooting "Category:Troubleshooting")

  ![](https://tracking.unrealengine.com/track.png)