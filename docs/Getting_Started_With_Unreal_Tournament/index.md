Getting Started With Unreal Tournament - Epic Wiki                   

Getting Started With Unreal Tournament
======================================

  
If you are interested in level design or content creation, you can download the Unreal Tournament flavored version of the Unreal Editor from the Epic Games Launcher. If you are interested in looking at the UT code base, and perhaps developing C++ code mods or plugins, or making code contributions to the project, read on.

Contents
--------

*   [1 Installation](#Installation)
    *   [1.1 Install required software if needed](#Install_required_software_if_needed)
    *   [1.2 Getting the Latest Unreal Tournament Build](#Getting_the_Latest_Unreal_Tournament_Build)
    *   [1.3 How do you want to do this?](#How_do_you_want_to_do_this.3F)
    *   [1.4 OPTION 1: SETUP THROUGH THE GITHUB CLIENT](#OPTION_1:_SETUP_THROUGH_THE_GITHUB_CLIENT)
    *   [1.5 OPTION 2: SETUP WITH GITHUB ZIP FILE](#OPTION_2:_SETUP_WITH_GITHUB_ZIP_FILE)
    *   [1.6 COMPILING THE UNREAL TOURNAMENT PROJECT](#COMPILING_THE_UNREAL_TOURNAMENT_PROJECT)
    *   [1.7 Open the Editor](#Open_the_Editor)
    *   [1.8 Open the Game Client](#Open_the_Game_Client)
*   [2 Common issues](#Common_issues)

Installation
============

You'll need to register by going to [https://www.unrealengine.com/](https://www.unrealengine.com/) and clicking the Get Unreal button at the top. Once you've registered, you'll have access to Unreal Engine 4 and can start making stuff for Unreal Tournament. But how exactly do you get the latest Unreal Tournament build?

Install required software if needed
-----------------------------------

Be sure to have [Visual Studio 2015](https://www.visualstudio.com/vs/) installed. You can use any desktop version of [Visual Studio 2015](https://www.visualstudio.com/), including the free version called Community 2015.

You need [DirectX End-User Runtimes (June 2010)](https://www.microsoft.com/en-us/download/details.aspx?id=8109) to avoid compilation errors. Most users will already have this, if you have ever installed DirectX runtimes to play a game. If you want to keep a fresh copy of the repository a git client will be needed.

**Mac OSX:** Be sure to have [Xcode 5.1](https://itunes.apple.com/us/app/xcode/id497799835) installed. The Full Engine Source is included in the Unreal Tournament project repository. You do NOT need to download or install another engine.

**The Full Engine Source is included in the Unreal Tournament project repository. You do NOT need to download or install another engine.**

Getting the Latest Unreal Tournament Build
------------------------------------------

**Setting Up Github Permissions and tying them to your Accounts**

1\. If you do not have a Github account, sign up for one at [http://github.com/](http://github.com/)

*   Don't forget to confirm your e-mail address, Github will send you an email with a link to do so.

2\. Log in to UnrealEngine.com and associate your GitHub account with your Unreal Engine account at [https://www.unrealengine.com/dashboard/settings](https://www.unrealengine.com/dashboard/settings) :

[![GitHubAccountName.png](https://d26ilriwvtzlb.cloudfront.net/c/c4/GitHubAccountName.png)](/File:GitHubAccountName.png)

*   Just your Github username is required. You will receive an E-mail from Epic Games confirming access to the Unreal Engine Github repositories.
*   Please note if you change your associated GitHub account name, your private fork will be permanently deleted from GitHub.

  
3\. After associating your account, head to [https://github.com/epicgames/unrealtournament](https://github.com/epicgames/unrealtournament)

How do you want to do this?
---------------------------

You are now ready to download and install the Unreal Tournament project via Github. You can choose one of two methods:

**OPTION 1: SETUP THROUGH THE GITHUB CLIENT** If you wish to use the Github client, download the client from here: [https://desktop.github.com/](https://desktop.github.com/)

**OPTION 2: SETUP WITH THE GITHUB ZIP FILE**

OPTION 1: SETUP THROUGH THE GITHUB CLIENT
-----------------------------------------

**Step 1:**

*   Login to your Github Client

[![Github S1 01.jpg](https://d26ilriwvtzlb.cloudfront.net/0/0a/Github_S1_01.jpg)](/File:Github_S1_01.jpg)

[![Github S1 02.jpg](https://d26ilriwvtzlb.cloudfront.net/4/44/Github_S1_02.jpg)](/File:Github_S1_02.jpg)

[![Github S1 03.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a4/Github_S1_03.jpg)](/File:Github_S1_03.jpg)

  
**Step 2:**

*   Download the project by clicking the **Clone or Download** on the right hand side of the UnrealTournament Github project page ([https://github.com/EpicGames/UnrealTournament](https://github.com/EpicGames/UnrealTournament))
*   Choose **Open in Desktop**. Your browser may prompt you with a message to ‘Launch Application’ go ahead select that.

[![Github S2 01.jpg](https://d26ilriwvtzlb.cloudfront.net/b/b4/Github_S2_01.jpg)](/File:Github_S2_01.jpg)

  
**Step 3:**

*   Your Github Desktop application will be launched. You will be prompted to choose a location you want the project to be installed in. Select a directory to install the project and click ‘ok’.

[![Github S3 01.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e2/Github_S3_01.jpg)](/File:Github_S3_01.jpg)

*   Your Github client should have a message saying its ‘Cloning UnrealTournament’.

[![Github S3 02.jpg](https://d26ilriwvtzlb.cloudfront.net/d/d2/Github_S3_02.jpg)](/File:Github_S3_02.jpg)

*   Once the cloning is completed the project should be fully synced, however it is better to be safe than sorry. Click on ‘Sync’ to make sure your project files are up to date.

[![Github S3 03.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a4/Github_S3_03.jpg)](/File:Github_S3_03.jpg)

*   Once the syncing is finished, navigate to the directory that you choose to install this project and then proceed to COMPILING THE UNREAL TOURNAMENT PROJECT further down the page

[![Github S3 04.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3f/Github_S3_04.jpg)](/File:Github_S3_04.jpg)

  

OPTION 2: SETUP WITH GITHUB ZIP FILE
------------------------------------

**Step 1:**

*   Download the project by clicking the **Download ZIP** button on this page.

[![Github S4 01.jpg](https://d26ilriwvtzlb.cloudfront.net/e/ee/Github_S4_01.jpg)](/File:Github_S4_01.jpg)

*   Unzip the files to a directory of your choosing.
*   Once you have extracted the files into your directory, proceed to COMPILING THE UNREAL TOURNAMENT PROJECT section below.

COMPILING THE UNREAL TOURNAMENT PROJECT
---------------------------------------

**Step 1:**

*   Navigate to where you installed your UT project either via github or zip extraction. In the main UnrealTournament directory, run **Setup.bat**. This will download essential files for compiling.

[![Compile S1 01.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a1/Compile_S1_01.jpg)](/File:Compile_S1_01.jpg)

*   **Once the Setup.bat file finishes, do a Safety Check:** Run **UE4PrereqSetup\_x64.exe** located in the **Engine\\Extras\\Redist\\en-us** folder. This will check to see if you’re missing any dependencies. If the only option you have is to ‘uninstall’ **DO NOT click uninstall**, just close the program and proceed to Step 2.

  
**Step 2:**

*   Navigate to **Engine\\Source\\Programs\\UnrealSwarm** and launch **UnrealSwarm.sln**
*   When the file is launched in Visual Studio, **set the solution configuration drop down to ‘Development’ Mode**.

[![Compile S2 01.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e9/Compile_S2_01.jpg)](/File:Compile_S2_01.jpg)

*   Find **Agent** in the Solution Explorer located on the right side of Visual Studio. Once you find it, right click on it and select **Properties**.

[![Compile S2 02.jpg](https://d26ilriwvtzlb.cloudfront.net/2/28/Compile_S2_02.jpg)](/File:Compile_S2_02.jpg)

*   A window will pop up in the main project view, go to the **‘Signing’** tab and uncheck **"Sign the ClickOnce manifests"**.

[![Compile S2 03.jpg](https://d26ilriwvtzlb.cloudfront.net/1/10/Compile_S2_03.jpg)](/File:Compile_S2_03.jpg)

*   Build the Agent project by right clicking on **Agent** and selecting Build.

[![Compile S2 04.jpg](https://d26ilriwvtzlb.cloudfront.net/5/59/Compile_S2_04.jpg)](/File:Compile_S2_04.jpg)

Once the build is complete you can close Visual Studio.

  
**Step 3:**

*   Navigate back to your main directory where you installed the project files, run the **GenerateProjectFiles.bat** file. This will generate a **UE4.sln** file in the same directory.

[![Compile S3 01.jpg](https://d26ilriwvtzlb.cloudfront.net/2/26/Compile_S3_01.jpg)](/File:Compile_S3_01.jpg)

*   Launch **UE4.sln** in Visual Studio. When the project is open in Visual Studio, **set the Solution Configuration drop down to Development Editor.**

[![Compile S3 02.jpg](https://d26ilriwvtzlb.cloudfront.net/f/f2/Compile_S3_02.jpg)](/File:Compile_S3_02.jpg)

  
**Step 4:**

*   Right click on **ShaderCompileWorker** and select **Build**
*   Right click on **UnrealLightmass** and select **Build**
*   Right click on **UnrealPak** and select **Build**
*   Right click on **CrashReportClient** and select **Build**

[![Compile S4 01.jpg](https://d26ilriwvtzlb.cloudfront.net/0/00/Compile_S4_01.jpg)](/File:Compile_S4_01.jpg)

*   Once those 4 solutions finish building, Right click on UnrealTournament (under games) and select Build

[![Compile S4 02.jpg](https://d26ilriwvtzlb.cloudfront.net/0/02/Compile_S4_02.jpg)](/File:Compile_S4_02.jpg)

  
**Step 5: YOU DID IT!**

*   Navigate to your UnrealTournament directory and choose one of the following methods below to launch UT!
*   Launch Editor Version:
    *   Go to \\Engine\\Binaries\\Win64\\ and Make a shortcut of **ue4editor.exe**
    *   Right click on the shortcut and go to properties – add the following to the target line:
        *   Unrealtournament –log
*   Launch Client Version:
    *   Go to \\Engine\\Binaries\\Win64\\ and Make a shortcut of **ue4editor.exe**
    *   Right click on the shortcut and go to properties – add the following to the target line:
        *   Unrealtournament –game –log
*   Launch through Visual Studio:
    *   Right click the Unreal Tournament project in Visual Studio and start a debug session.

Open the Editor
---------------

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) If you had to run **UnrealVersionSelector.exe** above, you will need to browse to %unrealtournamentfolder%\\UnrealTournament and right-click on **UnrealTournament.uproject**. In the menu, you will see an option for _Switch Unreal Engine version_. Click this and you will get a box with a dropdown indicating the Unreal Engine installations you have on your computer. One of the options in the dropdown should say _Source build at %unrealtournamentfolder%_. Select that and click _OK_.

Once done, you can either go to %unrealtournamentfolder%\\Engine\\Binaries\\Win64 and Double click (or run) **UE4Editor.exe** or go to %unrealtournamentfolder%\\UnrealTournament and double-click **UnrealTournament.uproject**.

You should now be able to open the uproject in the editor. On first launch it is normal for the editor to take a significant amount of time to open as it caches and compiles shaders, materials, and other items.

1\. On the Project Browser screen, click **Browse...** and navigate to the folder where you unzipped the files or the repository was cloned.

[![BrowseForUT.png](https://d26ilriwvtzlb.cloudfront.net/f/f8/BrowseForUT.png)](/File:BrowseForUT.png)

*   If you have been working in UE4 for a while, and have a project that auto loads, you can use **File** -> **Open Project** to summon the project browser.

2\. Choose the UnrealTournament.uproject file.

  
[![OpenUTProj.png](https://d26ilriwvtzlb.cloudfront.net/d/d2/OpenUTProj.png)](/File:OpenUTProj.png)

  
This is the latest WIP of the game.

3\. Unreal Editor will now load. After it does any project specific compiling it will open.

4\. Click on **Play** [![Fps pie.png](https://d26ilriwvtzlb.cloudfront.net/e/ed/Fps_pie.png)](/File:Fps_pie.png) at the top of the editor to play.

Open the Game Client
--------------------

To play the game, run **%unrealtournamentfolder%\\Engine\\Binaries\\UE4-Win64-Shipping.exe UnrealTournament**

  

Common issues
=============

**Compilation errors**

Due to the way the source control system is set up, the Github repository does not correspond one-to-one with Epic's internal Perforce repository, which contains some additional code such as the MCP (Master Control Program) and the Social module. Therefore the latest Github commit can sometimes have dependencies that cannot be resolved. Some examples of error messages you may encounter that are caused by this:

*   _fatal error C1083: Cannot open include file: 'OnlineSubsystemMcp.h': No such file or directory_

*   _error C2065: 'IFriendsAndChatManager': undeclared identifier_

*   _error C2227: left of '->AddOnVerifyAuthCompleteDelegate\_Handle' must point to class/struct/union/generic type_

*   _error C2039: 'OnFriendsJoinParty': is not a member of 'IOnlinePartyJoinInfo'_

The easiest solution for this is to simply wait for the repository to be updated with a fix. But this can take a couple of days, so it is not very practical if you want a working editor right now. Here are some alternatives:

*   **Switch to the release branch**.  
    The release branch is updated less frequently than the default clean-master branch and is often more stable, though it is not guaranteed to work (and currently does not for the 03/09/2016 build). From a command prompt, enter the following:  
    **git fetch**  
    **git checkout release**  
    The post-checkout hook will update the game assets to match the new branch.

*   **Find the latest working commit**.  
    If you don't want to switch to the release branch, you can check the git history of the file that is causing the error, and check out the last commit before the one that introduced the issue. The [Github commit history](https://github.com/EpicGames/UnrealTournament/commits/clean-master) is another useful tool for this. You can use the short commit hash to check out a commit from the command line:  
    **git checkout f09ae1c**

*   **Exclude the code from the build**.  
    If you are comfortable with C++, the changes needed to fix the build are usually trivial. You can use preprocessor directives to exclude the offending code from the build, for instance:

#if WITH\_PROFILE
ReservationBeaconHost\-\>OnServerConfigurationRequest().BindUObject(this, &AUTGameSessionRanked::OnServerConfigurationRequest);
OnCreateSessionCompleteDelegateHandle \= SessionInt\-\>AddOnCreateSessionCompleteDelegate\_Handle(OnCreateSessionCompleteDelegate);
#endif

The relevant macros are WITH\_PROFILE and WITH\_SOCIAL, which are always set to 0 on GitHub builds.  
Note: only do this when the errors are related to the Social and MCP modules. If the build is broken for some other reason, fixing it will usually be more complicated and you may be better off reverting to an older commit until the problem is resolved.

*   **Ask on Discord**.  
    You can also come to #ut-dev on [Discord](http://discord.gg/unrealtournament%20) and ask about your specific problem.

**Lighting build fails instantly with "Lighting build failed. Swarm failed to kick off."**

Check if **embree.dll**, **tbb.dll** and **tbbmalloc.dll** are present in Engine/Binaries/Win64. If not, you can copy them from Engine/Source/ThirdParty/IntelEmbree/Embree270/Win64/lib. This is a known issue and has been fixed in the 4.11 engine release. If the DLLs are present and the lighting build still fails, you can check the swarm log for more info by double clicking the Swarm Agent icon in the system tray and going to the Log tab.

**Linux: Failed to open descriptor file ../../../UE4/UE4.project**

You need to launch UE4 with

   ./UE4-Linux-Shipping UnrealTournament

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Getting\_Started\_With\_Unreal\_Tournament&oldid=24207](https://wiki.unrealengine.com/index.php?title=Getting_Started_With_Unreal_Tournament&oldid=24207)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT How to Play](/Category:UT_How_to_Play "Category:UT How to Play")

  ![](https://tracking.unrealengine.com/track.png)