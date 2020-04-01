Html5 - Building On Windows - Epic Wiki                    

Html5 - Building On Windows
===========================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Prerequisites](#Prerequisites)
    *   [1.2 Disclaimer](#Disclaimer)
    *   [1.3 Requirement](#Requirement)
        *   [1.3.1 Downloading all Requirement](#Downloading_all_Requirement)
            *   [1.3.1.1 Links and Instructions](#Links_and_Instructions)
                *   [1.3.1.1.1 Firefox Nightly](#Firefox_Nightly)
                *   [1.3.1.1.2 Python](#Python)
                *   [1.3.1.1.3 Emscripten SDK](#Emscripten_SDK)
        *   [1.3.2 Configuration Emscripten SDK](#Configuration_Emscripten_SDK)
            *   [1.3.2.1 Update and activate SDK Emscripten](#Update_and_activate_SDK_Emscripten)
                *   [1.3.2.1.1 Emscripten folder](#Emscripten_folder)
                *   [1.3.2.1.2 Open Command Window Here](#Open_Command_Window_Here)
                *   [1.3.2.1.3 Typing Command Prompt](#Typing_Command_Prompt)
        *   [1.3.3 System Variables](#System_Variables)
            *   [1.3.3.1 Emscripten](#Emscripten)
                *   [1.3.3.1.1 Emscripten Variable](#Emscripten_Variable)
                *   [1.3.3.1.2 Path Variable](#Path_Variable)
        *   [1.3.4 Configuration Engine](#Configuration_Engine)
            *   [1.3.4.1 HTML5 & Engine](#HTML5_.26_Engine)
                *   [1.3.4.1.1 Open HTML5Engine.ini](#Open_HTML5Engine.ini)
                *   [1.3.4.1.2 Firefox path](#Firefox_path)
                *   [1.3.4.1.3 Python path](#Python_path)
                *   [1.3.4.1.4 Emscripten](#Emscripten_2)
                *   [1.3.4.1.5 Before building](#Before_building)
        *   [1.3.5 Building on Windows](#Building_on_Windows)
            *   [1.3.5.1 Tappy Chicken](#Tappy_Chicken)
                *   [1.3.5.1.1 Create a clean project](#Create_a_clean_project)
            *   [1.3.5.2 Unreal Engine](#Unreal_Engine)
                *   [1.3.5.2.1 Open the project](#Open_the_project)
                *   [1.3.5.2.2 Project Platforms](#Project_Platforms)
                *   [1.3.5.2.3 Building Project](#Building_Project)
                *   [1.3.5.2.4 Successful or not](#Successful_or_not)
        *   [1.3.6 Final Game](#Final_Game)
            *   [1.3.6.1 Tappy Chicken html](#Tappy_Chicken_html)
                *   [1.3.6.1.1 Game Directory](#Game_Directory)
                *   [1.3.6.1.2 Play Tappy Chicken Game](#Play_Tappy_Chicken_Game)
                *   [1.3.6.1.3 Tappy Chicken Firefox x64](#Tappy_Chicken_Firefox_x64)
        *   [1.3.7 Final Note](#Final_Note)
            *   [1.3.7.1 Tappy Chicken Firefox x32](#Tappy_Chicken_Firefox_x32)

Overview
========

This step by step tutorial used the Unreal Engine & Emscripten documentation, nothing more. For more information, check if the Unreal Engine documentation has been updated. This step by step tutorial has been made on local computer. If you want follow this tutorial with Google Chrome x86 or Google Chromimum x64 , the files need to hosted behind a web server.

**Rate this Page:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.7.3

1\. First, sign up for Unreal Engine 4. Download the UE4 tools, and install example content, including Tappy Chicken, from Marketplace.

Prerequisites
-------------

\# Windows 7 x64: Updated/Windows Update
# Unreal Engine 4.7.3:  Binaries/Epic Game Launcher
# Tappy Chicken 4.7.3 project
# Small brain

Disclaimer
----------

![Note](https://d26ilriwvtzlb.cloudfront.net/b/b3/Icon_template_warning1.png)  
HTML5 is currently experimental. Some projects may not run properly when built for the HTML5 platform

Requirement
-----------

1\. 64-bit browser
2. Python 2.7.x
3. Emscripten + SDK

### Downloading all Requirement

#### Links and Instructions

##### Firefox Nightly

1\. First step , you need downloading and installing [Firefox Nightly 64 bits (Tested)](ftp://ftp.mozilla.org/pub/mozilla.org/firefox/nightly/latest-mozilla-central/firefox-39.0a1.en-US.win64.installer.exe) [more info](ftp://ftp.mozilla.org/pub/mozilla.org/firefox/nightly/latest-mozilla-central/)

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) With Mozilla, game can be launch in offline  
Mozilla can bring large, high-performance applications to HTML5 and 64 bit browsers can allocate more than 512MB of memory to around 1.5 GB.

##### Python

2\. Now, you can download and install [Python 2.7.7 x86/x64 (Tested)](https://www.python.org/ftp/python/2.7.7/python-2.7.7.amd64.msi) [more info](https://www.python.org/download/releases/2.7/)

![Note](https://d26ilriwvtzlb.cloudfront.net/b/b3/Icon_template_warning1.png)  
Any version of Python 2.7 will do. As of this writing, 2.7.9 is the latest 2.7 release. Do not use Python 3.X.

##### Emscripten SDK

3\. Next, download [Emscripten-1.29.0 64bit](https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-1.29.0-web-64bit.exeand) and open the file, then follow the installer prompts. [more info](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)

### Configuration Emscripten SDK

#### Update and activate SDK Emscripten

##### Emscripten folder

1\. Go to Emscripten folder installation:

C:\\Program Files\\Emscripten

##### Open Command Window Here

2\. Open a command prompt inside the SDK directory

Press '''<Shift>''' and '''<right click>''' and select  '''Open Command Window Here'''

##### Typing Command Prompt

3\. Type the following Command Prompt:

    emsdk update
    emsdk install latest
    emsdk activate latest

### System Variables

#### Emscripten

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) Though the web installer for Emscripten will append its path to the System Path environment variable, just check to make sure it was.

##### Emscripten Variable

1\. Check if the **EMSCRIPTEN** variable is set correctly.

 
EMSCRIPTEN
C:\\Program Files\\Emscripten\\emscripten\\1.29.0

[![](https://d26ilriwvtzlb.cloudfront.net/0/07/SystemVariables01.png)](/File:SystemVariables01.png)

[![](/skins/common/images/magnify-clip.png)](/File:SystemVariables01.png "Enlarge")

EMSCRIPTEN Variable

##### Path Variable

2\. Now , Make sure that these lines have been added in your **PATH** variable.

PATH
c:\\Program Files\\Emscripten;
c:\\Program Files\\Emscripten\\crunch\\1.03;
c:\\Program Files\\Emscripten\\mingw\\4.6.2\_32bit;
c:\\Program Files\\Emscripten\\emscripten\\1.29.0;
c:\\Program Files\\Emscripten\\clang\\e1.29.0\_64bit

[![](https://d26ilriwvtzlb.cloudfront.net/7/74/SystemVariables02.png)](/File:SystemVariables02.png)

[![](/skins/common/images/magnify-clip.png)](/File:SystemVariables02.png "Enlarge")

PATH Variables

### Configuration Engine

#### HTML5 & Engine

##### Open HTML5Engine.ini

Open **HTML5Engine.ini** in your favorite code editor and edit Path as below :

K:\\Program Files\\Unreal Engine\\4.7\\Engine\\Config\\HTML5

##### Firefox path

\[HTML5DevicesWindows\]
Firefox Nightly(64 bit)\="C:\\Program Files\\Nightly\\firefox.exe"

##### Python path

\[HTML5SDKPaths\]
Python\="C:/Python27"

##### Emscripten

\[HTML5SDKPaths\]
Emscripten\="C:\\Program Files\\Emscripten\\emscripten\\1.29.0"

[![](https://d26ilriwvtzlb.cloudfront.net/f/f8/HTML5Engine.ini.png)](/File:HTML5Engine.ini.png)

[![](/skins/common/images/magnify-clip.png)](/File:HTML5Engine.ini.png "Enlarge")

HTML5Engine.ini

##### Before building

Very important step ! Restart your computer before building on Windows.

### Building on Windows

#### Tappy Chicken

##### Create a clean project

1\. Launch the Unreal Engine Launcher.  
2\. Go to learn Tab.  
3\. Select Tappy Chicken  
4\. Click on Create Project \[4.7.3\] button

[![](https://d3ar1piqh1oeli.cloudfront.net/e/ef/CreateTappyChickenProject.png/800px-CreateTappyChickenProject.png)](/File:CreateTappyChickenProject.png)

[![](/skins/common/images/magnify-clip.png)](/File:CreateTappyChickenProject.png "Enlarge")

Create Tappy Chicken Project

#### Unreal Engine

##### Open the project

1\. Open Unreal Engine 4.7.3  
2\. Open Tappy Chicken project

##### Project Platforms

3\. Click **File > Package Project > Supported Platforms**  
4\. Select **HTML5** as supported platforms for this project.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) Shipping build configuration mode or Development configuration mode is not a problem for this tutorial

[![](https://d3ar1piqh1oeli.cloudfront.net/4/48/Html5SupportedPlatforms.png/800px-Html5SupportedPlatforms.png)](/File:Html5SupportedPlatforms.png)

[![](/skins/common/images/magnify-clip.png)](/File:Html5SupportedPlatforms.png "Enlarge")

HTML5 Supported Platforms

##### Building Project

5\. Hit **File > Package Project > HTML5**  
6\. Choose a directory to save the files to

##### Successful or not

7\. you will probably alerted **packaging failed** ! It's not a problem , i dunno why !

[![](https://d26ilriwvtzlb.cloudfront.net/4/4f/Packagingfailed.png)](/File:Packagingfailed.png)

[![](/skins/common/images/magnify-clip.png)](/File:Packagingfailed.png "Enlarge")

Packaging failed !

8\. Open the Output Log Tab **Window > Developer Tools > Output Log**  
9\. Check you see Building successful

[![](https://d3ar1piqh1oeli.cloudfront.net/2/29/BuildingSuccessful.png/800px-BuildingSuccessful.png)](/File:BuildingSuccessful.png)

[![](/skins/common/images/magnify-clip.png)](/File:BuildingSuccessful.png "Enlarge")

building Successful

### Final Game

#### Tappy Chicken html

##### Game Directory

1\. Open Tappy Chicken directory  
2\. Check all files as below

[![](https://d26ilriwvtzlb.cloudfront.net/f/fa/Gamerepertory.png)](/File:Gamerepertory.png)

[![](/skins/common/images/magnify-clip.png)](/File:Gamerepertory.png "Enlarge")

Game Repertory

##### Play Tappy Chicken Game

1\. Right-Click on **TappyChicken-HTML5-Shipping.html** or **TappyChicken-HTML5.html**  
2\. Select **Open With** > **Nightly** (Firefox Nightly x64)  
3\. Firefox will pre-load & download all data  
4\. Have fun & Enjoy !  

[![](https://d3ar1piqh1oeli.cloudfront.net/8/83/OpenInFirefox.png/800px-OpenInFirefox.png)](/File:OpenInFirefox.png)

[![](/skins/common/images/magnify-clip.png)](/File:OpenInFirefox.png "Enlarge")

Open In Firefox

##### Tappy Chicken Firefox x64

[![](https://d26ilriwvtzlb.cloudfront.net/a/a4/Tappychickenplay.png)](/File:Tappychickenplay.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tappychickenplay.png "Enlarge")

Tappy Chicken Firefox x64

### Final Note

Game will probably work in Firefox x32 & Firefox x64 . At the moment , the game doesn't work in Chrome x32 & Chromium x64 (Error Script & Black Screen)

![Note](https://d26ilriwvtzlb.cloudfront.net/b/b3/Icon_template_warning1.png) For things to work on chrome x32 & Chromium x64  
the files need to hosted behind a web server, chrome doesn't like direct file system access.

#### Tappy Chicken Firefox x32

[![](https://d26ilriwvtzlb.cloudfront.net/e/e8/Tappychickenplay2.png)](/File:Tappychickenplay2.png)

[![](/skins/common/images/magnify-clip.png)](/File:Tappychickenplay2.png "Enlarge")

Tappy Chicken Firefox x32

If you have any question, do not hesitate to ask on the [Unreal Engine forums](https://forums.unrealengine.com/forumdisplay.php?67-HTML5-Development)  

[ChrisTm](/index.php?title=User:ChrisTm&action=edit&redlink=1 "User:ChrisTm (page does not exist)") ([talk](/index.php?title=User_talk:ChrisTm&action=edit&redlink=1 "User talk:ChrisTm (page does not exist)")) 20:25, 22 March 2015 (GTM)  
  
  
  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Html5\_-\_Building\_On\_Windows&oldid=12879](https://wiki.unrealengine.com/index.php?title=Html5_-_Building_On_Windows&oldid=12879)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [HTML5 Game Development](/index.php?title=Category:HTML5_Game_Development&action=edit&redlink=1 "Category:HTML5 Game Development (page does not exist)")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)