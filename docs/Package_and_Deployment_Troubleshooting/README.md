Package and Deployment Troubleshooting - Epic Wiki                    

Package and Deployment Troubleshooting
======================================

_This page is currently under construction, more errors and solutions will be added over time._

Contents
--------

*   [1 Additional Resources](#Additional_Resources)
*   [2 Using Answerhub for Packaging Issues](#Using_Answerhub_for_Packaging_Issues)
    *   [2.1 Packaging Failed (Automation Tool Unable to Run Successfully)](#Packaging_Failed_.28Automation_Tool_Unable_to_Run_Successfully.29)
    *   [2.2 Searching for your error](#Searching_for_your_error)
    *   [2.3 Posting on Answerhub](#Posting_on_Answerhub)
    *   [2.4 Retrieving Logs from a packaged game](#Retrieving_Logs_from_a_packaged_game)
    *   [2.5 What are Unreal Engine 4's system recommendations?](#What_are_Unreal_Engine_4.27s_system_recommendations.3F)
*   [3 Common errors](#Common_errors)
    *   [3.1 Non-platform specific](#Non-platform_specific)
    *   [3.2 Windows](#Windows)
    *   [3.3 Android](#Android)
    *   [3.4 iOS](#iOS)
    *   [3.5 HTML5](#HTML5)
    *   [3.6 Mac](#Mac)
    *   [3.7 TVOS](#TVOS)
    *   [3.8 Additional Resources](#Additional_Resources_2)
    *   [3.9 Miscellaneous Links](#Miscellaneous_Links)

Packaging and Deployment Troubleshooting

Additional Resources
--------------------

Here are a few helpful guides:

*   [Mobile Development Troubleshooting Guide](/Mobile_Development_Troubleshooting_Guide "Mobile Development Troubleshooting Guide")
*   [Packaging Projects Documentation](https://docs.unrealengine.com/latest/INT/Engine/Basics/Projects/Packaging/)
*   [Packaging and Cooking Games Documentation](https://docs.unrealengine.com/latest/INT/Engine/Deployment/)
*   [Android Quick Start](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/index.html)
*   [iOS Quick Start](https://docs.unrealengine.com/latest/INT/Platforms/iOS/QuickStart/index.html)
*   [Obtain logs off an Android Device](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#How_to_get_logs_off_of_an_Android_device)
*   [Obtain logs off an iOS Device](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#How_to_get_logs_off_of_an_iOS_device)

**This page is currently under development and will be populated as we find more common mobile development bugs/crashes. Thank you for your understanding.**

**If you notice a build failure in your logs, please try the following first:**

1.  Open the log that includes the information about your build failure in a text editor. This can be found in the project's directory under the Saved/Logs directory.
2.  Use the find function (Ctrl+F) to search for the word "Error" and "Warning"
3.  Make a list of each unique error/warning and attempt to search for other Answerhub posts that mention them (Please take a look further in this guide for more information on common error messages, as well as the information that would likely be needed to diagnose your issue)

If you cannot find another report of the error you're receiving and are not able to solve the issue, a general all purpose solution can sometimes be to delete the following folders:

*   Intermediate
*   Saved
*   Config

*   Restart your computer if there is an 'Unknown Cook Failure'

If the above does not help your situation, please look through the rest of this guide for a run down of the troubleshooting process and examples of common errors and solutions

Using Answerhub for Packaging Issues
====================================

Packaging Failed (Automation Tool Unable to Run Successfully)
-------------------------------------------------------------

The first thing to keep in mind is that there are multiple error messages that are generic that are there to let you know that a process failed but will not give any useful information otherwise. These error messages are two examples of general errors which are stating that the process failed. This could be the result of a multitude of different errors. The best course of action is to search elsewhere in the log for other errors and warnings, as this is likely a symptom of those issues.

A couple more of these types of errors are:

*   RunUAT.bat ERROR: AutomationTool was unable to run
*   Error: Error Unknown Error

Searching for your error
------------------------

Once you believe you've found the actual error or warning that is causing your problem, try searching for the issue here. If the issue isn't listed on this page, you can try searching for it in our database. Try searching for your error on the [Documentation](https://docs.unrealengine.com/latest/INT/) page as this covers all of our support outlets.

If you are able to find a post that relates to your issue but the information is not helpful or the issue was never resolved, check the Product Version listed. If the Product Version is older than what you are currently using, create a new post (see next section). Otherwise, feel free to post about your issue on the existing page.

Posting on Answerhub
--------------------

When posting about a packaging issue on Answerhub, it will be easier for someone to help you when you provide them with as much information as possible. The list below can give you a starting point but any additional information is always helpful.

*   Logs (These are the most important and should be attached as a .txt file)
*   Engine version
*   The exact steps you've taken to package.
*   The exact OS version you're on.
*   Can it be reproduced in a clean project?
*   If it can be reproduced, provide a clear list of steps to reproduce the issue.

Retrieving Logs from a packaged game
------------------------------------

Finding errors that occur in the game that results from a successful package attempt can be done by looking at the warnings in the original packaging log but can also be seen in the logs for the packaged game itself. They can found different locations based off the platform.

*   Windows: _PackagedDirectory_/_ProjectName_/Saved/Logs/_ProjectName_.log
*   Mac: ~/Library/Logs/ProjectName/
*   iOS: [Obtain logs off an iOS Device](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#How_to_get_logs_off_of_an_iOS_device)
*   Android: [Obtain logs off an Android Device](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide#How_to_get_logs_off_of_an_Android_device)
*   HTML5: _To be added_
*   Linux: _To be added_
*   tvOS: _To be added_

What are Unreal Engine 4's system recommendations?
--------------------------------------------------

For developing with UE4, we recommend a certain level of hardware for a desired result. UE4 will run on desktops and laptops below these recommendations, but performance may be limited. For more information on these recommendations, please see [Recommended Hardware](https://wiki.unrealengine.com/Recommended_Hardware).

Common errors
=============

This section will provide a list of common errors along with resolved Answerhub links related to the issue as well as possible solutions.

Non-platform specific
---------------------

*   [**Error loading an asset**](https://answers.unrealengine.com/questions/303922/build-failed-64-bit-windows.html)

*   [**WARNING: Visual C++ 2015 toolchain does not appear to be correctly installed. Please verify that "Common Tools for Visual C++ 2015" was selected when installing Visual Studio 2015.**](https://answers.unrealengine.com/questions/412747/build-failed-windows.html)

*   No 32-bit compiler toolchain found in C:\\Program Files (x86)\\Microsoft Visual Studio 14.0\\VC\\bin\\cl.exe

This is a warning that can cause other errors to occur. This can be resolved by installing the Common Tools for Visual C++ 2015 for Visual Studio 2015. Please see the Answerhub post for steps to do so.

*   No modules found to build. All requested binaries were already part of the installed engine data.

This is a message that points out that you are using a Plugin that requires being compiled but you're using it in a Blueprint-only project. In this case, there are three options:

*   Find a version of the plugin that does not require compiling, if it exists
*   Disable/Uninstall the plugin
*   Add code to your project (File > New C++ Class...). Please note: This will permanently make the project a code project.

Windows
-------

*   [**Shipping - Source Build**](https://answers.unrealengine.com/questions/252762/failed-to-open-descriptior-file.html)

Ensure you have built for the type of build you're packaging: Shipping | Debug | Development

*   [**Rename the .exe**](https://answers.unrealengine.com/questions/262680/failed-to-open-descriptor-file-error.html)
*   [**Migrating Files to a New Project**](https://answers.unrealengine.com/questions/239140/descriptor-file-3.html)
*   [**An item with the same key has already been added**](https://answers.unrealengine.com/questions/284296/cant-package-game-an-item-with-the-same-key-has-al.html)
*   [**How to create a working Shipping build?**](https://answers.unrealengine.com/questions/364215/how-to-create-a-working-shipping-build.html)
*   [**Win10: Configurations are not updating on iOS devices via Remote Build**](https://answers.unrealengine.com/questions/385259/bug-4104-configurations-not-making-it-to-ios-devic.html)

*   [**Global shader cache-pcd3d-sm5 missing**](https://answers.unrealengine.com/questions/297165/global-shader-cache-pcd3d-sm5-missing.html)
*   [**UE4Game.pdb Missing**](https://answers.unrealengine.com/questions/397520/cannot-launch-y-level-after-update-from-4104-to-41.html)

This may also be resolved by unchecking "Include Debug Files" in your project's Project Settings under the Packaging section.

*   [**Cannot find HCAD.lib**](https://answers.unrealengine.com/questions/420623/cannot-find-hcadlib-when-using-unrealed.html)
*   [**Unknown Structure Error**](https://answers.unrealengine.com/questions/337507/unknown-structure-error-when-cook.html)

*   [**Fatal Error**](https://answers.unrealengine.com/questions/311220/fatal-error-in-packaged-game.html)

*   [**MSCORLIB ERROR: An item with the same key has already been added**](https://answers.unrealengine.com/questions/338180/cant-package-project.html)

Android
-------

*   [**Unable to Deploy to Android**](https://answers.unrealengine.com/questions/478177/unable-to-deploy-to-android-1.html)

*   [**Error: C:\\Unreal Projects\\_ProjectName_\\Intermediate\\Android\\APK\\JavaLibs\\play-services-ads-9.2.0 is not a valid project (AndroidManifest.xml not found).**](https://answers.unrealengine.com/questions/590201/android-packaging-failed-unknown-error-2.html)

iOS
---

*   [**Unable to Launch Code Projects on Windows - Cygwin**](https://answers.unrealengine.com/questions/480092/how-to-launch-code-project-to-ios-on-windows-413.html)

*   [**How to manually remove Mobile Provisions for iOS**](https://answers.unrealengine.com/questions/223227/remove-obsolete-mobileprovision-profiles-ios.html)

*   Windows: C:\\Users\\(you)\\AppData\\Local\\Apple Computer\\MobileDevices\\Provisioning Profiles
*   Mac: ~/Library/MobileDevice/Provisioning Profiles

*   [**Crashes on First Launch**](https://answers.unrealengine.com/questions/350633/ios-crash-on-first-launch.html)

*   [**Distribution Source Build Fails to Package**](https://answers.unrealengine.com/questions/361738/distribution-packing-ios-on-source-build-fails.html)

*   [**iOS Identifier is Not Matching**](https://answers.unrealengine.com/questions/258023/ios-identifier-not-matched.html)

*   [**Code signing is required for product type 'Application' in SDK iOS 10.0'**](https://answers.unrealengine.com/questions/498731/ios10-deploy-fails.html)

*   [**In-App Purchase Enabled Apps are Rejected from iOS**](https://answers.unrealengine.com/questions/480693/iap-enabled-apps-get-rejected-from-ios-store.html)

*   [**Provision & Signing Keys Not Found**](https://answers.unrealengine.com/questions/424191/ios-provisioning-and-signingkey-not-found-worked-o.html)

*   Related documentation: [Creating & Importing Provisions](https://docs.unrealengine.com/latest/INT/Platforms/iOS/QuickStart/6/)

*   [**iOS 4S Incorrect HUD Scaling**](https://answers.unrealengine.com/questions/341162/why-hud-is-odd-on-iphone-4s-after-49-version.html)

*   Related documentation: [Setting Device Profiles](https://docs.unrealengine.com/latest/INT/Platforms/DeviceProfiles/)

*   [**AssetPackManifest.plist Errors**](https://answers.unrealengine.com/questions/489154/assetpackmanifestplist-creating-errors-when-upload.html)

  

HTML5
-----

*   [**Issues hosting a HTML5 game online**](https://answers.unrealengine.com/questions/517823/hosting-html5-game-on-github-page.html)

*   [**Environment Variables aren't set for HTML5**](https://answers.unrealengine.com/questions/496832/ue4-doesnt-package-nor-launch-html5.html)

*   [**Trouble Launching Packaged Projects on Certain Sites**](https://answers.unrealengine.com/questions/287463/questions-about-the-packing-size.html)

*   [**How to Deploy HTML5 Games on Apache? (4.9)**](https://answers.unrealengine.com/questions/331691/how-to-deploy-a-html5-game-on-apache.html)

*   [**HTML5: Little-Endian Error**](https://answers.unrealengine.com/questions/331805/html5-how-to-make-it-work.html)

*   [**Failed to run llvm optimizations**](https://answers.unrealengine.com/questions/432839/html5-build-fails.html)

*   [**HTML5 In-Game Complications**](https://answers.unrealengine.com/questions/270610/html5-can-not-load-levels.html)

*   Related documentation: [Levels](https://docs.unrealengine.com/latest/INT/Engine/Levels/index.html)

Mac
---

*   [**Cooking with a Macbook Pro Hangs**](https://answers.unrealengine.com/questions/400490/ue-411-hangs-cooking-on-macbook-pro.html)

*   Related documentation: [Packaging and Cooking Games](https://docs.unrealengine.com/latest/INT/Engine/Deployment/)

TVOS
----

*   [**Error: iOS Incorrect Bundle Identifier**](https://answers.unrealengine.com/questions/372681/411-packaging-ios-incorrect-bundle-identifier.html)

Additional Resources
--------------------

*   [**How to stop UE4 from crashing on its own**](https://answers.unrealengine.com/questions/404275/how-can-i-stop-unreal-engine-from-closing-on-its-o.html)
*   [**Mobile Development Troubleshooting Guide**](https://wiki.unrealengine.com/Mobile_Development_Troubleshooting_Guide)
*   [**Packaging and Cooking Games**](https://docs.unrealengine.com/latest/INT/Engine/Deployment/index.html)

Miscellaneous Links
-------------------

*   [**Packaging Fails when using Chunk ID**](https://answers.unrealengine.com/questions/499017/packaging-fails-when-using-chunks.html)

*   [**Renaming Target Build**](https://answers.unrealengine.com/questions/395344/how-to-change-the-name-of-target-build.html)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Package\_and\_Deployment\_Troubleshooting&oldid=25394](https://wiki.unrealengine.com/index.php?title=Package_and_Deployment_Troubleshooting&oldid=25394)"

[Category](/Special:Categories "Special:Categories"):

*   [Troubleshooting](/Category:Troubleshooting "Category:Troubleshooting")

  ![](https://tracking.unrealengine.com/track.png)