C++ Troubleshooting Guide - Epic Wiki                    

C++ Troubleshooting Guide
=========================

  
This page will hold a collection of common code issues that users run into, and steps that can be taken to resolve the issues. It is by no means an exhaustive list of issues, just a list of the ones that come up most frequently. We will be adding to this page as needed in the future. If the issue you are experiencing is not listed here, please visit the [AnswerHub](https://answers.unrealengine.com/index.html) or [Forums](https://forums.unrealengine.com/) for additional assistance. This page is currently only for issues with Windows and Visual Studio.

Contents
--------

*   [1 Cannot Build Engine from Source](#Cannot_Build_Engine_from_Source)
*   [2 Build Error Codes](#Build_Error_Codes)
    *   [2.1 C1069](#C1069)
    *   [2.2 C1083](#C1083)
    *   [2.3 RC1015](#RC1015)
    *   [2.4 OtherCompilerError(#)](#OtherCompilerError.28.23.29)
*   [3 UnrealBuildTool Errors](#UnrealBuildTool_Errors)
*   [4 FAQ](#FAQ)
    *   [4.1 Where is RegisterShellCommands.bat?](#Where_is_RegisterShellCommands.bat.3F)

Cannot Build Engine from Source
===============================

This section is meant to encompass a variety of build errors that could prevent the Engine from being built. The solutions here should work in most instances, starting with the most common.

*   Make sure you have the correct dependencies for the version you are trying to build.

*   If you're building a version on or past 4.6, you should run the Setup.bat (Setup.command for Mac) to download the dependencies. Earlier versions will need to download them separately from Github. These can be found in the readme on the Github page.
*   Dependencies for 4.3.0 will not work when trying to build 4.4.0, or vice versa.
*   Dependency zip files all have the same name regardless of Engine version, so it may be less confusing to download the correct dependencies again if there is any question about which version they are for.
*   If you are using Visual Studio 2012, be sure to also download the Optional dependency file.

*   If you are using Visual Studio 2013 for any version on 4.10 or higher, you'll need to add the **\-2013** argument to your GenerateProjectFiles.bat to build the project files for 2013.
    
    You can add it on this line: "call "%~dp0Engine\\Build\\BatchFiles\\GenerateProjectFiles.bat" **\-2013** %\*
    
*   Make sure your VS140COMNTOOLS environment variable is correct.

*   You can find your environment variables at

 Control Panel\\System and Security\\System -> Advanced System Settings -> Environment Variables

*   This should point to the Tools folder in your Visual Studio 2013/2015 installation.

*   eg. C:\\Program Files (x86)\\Microsoft Visual Studio 14.0\\Common7\\Tools\\

*   If you are using Visual Studio 2013, this variable will be named VS120COMNTOOLS, and will point to your Visual Studio 2013 Tools folder.
*   If you are using Visual Studio 2012, this variable will be named VS110COMNTOOLS, and will point to your Visual Studio 2012 Tools folder.

*   Make sure you have the correct version of Visual Studio Express installed, if you are using Express.

*   Microsoft has several different versions of Visual Studio Express 2015 available.
*   The current version supported with Unreal Engine 4 is Visual Studio Express 2015 for Desktop (2013 for versions prior to 4.10) [here](https://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx).

*   Make sure you have the June 2010 DirectX Runtimes installed.

*   These are required for Unreal Engine 4.
*   Download the Runtimes [here](http://www.microsoft.com/en-us/download/details.aspx?id=8109).

*   Make sure only one version of Visual Studio is installed.

*   Having multiple installations of Visual Studio has caused problems for some users.
*   Uninstall any unneeded versions of Visual Studio.

*   Make sure there are no special characters in any Engine file paths (such as é or ô).

*   This is a limitation internal to Visual Studio that affects how Visual Studio communicates with the UnrealBuildTool.
*   Install UE4 (and preferably Visual Studio as well) to a location that does not have any special characters in the file path.
*   Ensure projects are not created in locations containing special characters in the file path.

Build Error Codes
=================

C1069
-----

 fatal error C1069: cannot read compiler command line

*   Check the TMP and TEMP environment variables and make sure there are no spaces in the paths.

C1083
-----

 fatal error C1083: Cannot open include file: 'new': No such file or directory

*   Often paired with error RC1015.
*   Ensure Windows SDK is installed.

*   Download [here](http://www.microsoft.com/en-us/download/details.aspx?id=8279) for Windows 7.

*   If building the Engine, ensure correct dependencies have been downloaded and extracted.

RC1015
------

 fatal error RC1015: cannot open include file 'windows.h'

*   Often paired with error C1083.
*   Ensure Windows SDK is installed.

*   Download [here](http://www.microsoft.com/en-us/download/details.aspx?id=8279) for Windows 7.

*   Check anti-virus software to make sure it is not interfering.
*   As a last resort, as editing Environment Variables can be risky, if you're sure that your Windows SDK is installed but Visual Studio isn't seeing it, you can follow these steps to ensure that the Environment Variables are set up correctly:

1.  Find "My Computer" (Or "Computer" in the Start Menu), right-click it, and select Properties.
2.  Select "Advanced System Settings"
3.  Under the "Advanced" tab, select "Environment Variables"
4.  Find the variable labeled "Path" under "System Variables", select it, and then hit Edit
5.  Note that there are multiple file paths listed here, all separated by a semi-colon (;)
6.  Look for the following path "C:\\Program Files (x86)\\Windows Kits\\8.1\\Windows Performance Toolkit\\". or the version you're looking for. Please note that the path may change based off the drive you're using and 32-bit vs 64-bit
7.  If it does not exist, add it to the end (Add a semicolon prior to the entry but not after it)

OtherCompilerError(#)
---------------------

*   This line means that the error that occurred isn't something that has an error code related to it. You can check the Output log for more information in the majority of situations that involve this message.

UnrealBuildTool Errors
======================

 UnrealBuildTool Exception: ERROR: Windows SDK v8.1 must be installed in order to build this target.

*   Windows SDK 8.1 is missing.

*   Download [here](http://msdn.microsoft.com/en-us/windows/desktop/bg162891.aspx).

 UnrealHeaderTool failed for target 'UE4Editor'

*   DirectX June 2010 Runtimes are missing.

*   Download [here](http://www.microsoft.com/en-us/download/details.aspx?id=8109).

FAQ
===

Where is RegisterShellCommands.bat?
-----------------------------------

This file was removed starting in version 4.1. To update a project to a new Engine version:

*   Right-click on the .uproject file.
*   Select "Switch Unreal Engine Version..."
*   Choose the version of the Engine you would like to associate the project with.
*   Right-click on the .uproject file.
*   Select "Generate Visual Studio project files".
*   Open the solution in Visual Studio.
*   Build the project.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=C%2B%2B\_Troubleshooting\_Guide&oldid=17608](https://wiki.unrealengine.com/index.php?title=C%2B%2B_Troubleshooting_Guide&oldid=17608)"

[Categories](/Special:Categories "Special:Categories"):

*   [Programming](/index.php?title=Category:Programming&action=edit&redlink=1 "Category:Programming (page does not exist)")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")
*   [Troubleshooting](/Category:Troubleshooting "Category:Troubleshooting")

  ![](https://tracking.unrealengine.com/track.png)