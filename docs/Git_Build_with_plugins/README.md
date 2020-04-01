Git Build with plugins - Epic Wiki                    

Git Build with plugins
======================

**Rate this Tutorial:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.11+

Contents
--------

*   [1 Overview](#Overview)
*   [2 Getting Started](#Getting_Started)
    *   [2.1 Needed Accounts](#Needed_Accounts)
    *   [2.2 Necessary Software](#Necessary_Software)
    *   [2.3 PC Requirements](#PC_Requirements)
*   [3 GitHub Web Setup](#GitHub_Web_Setup)
    *   [3.1 Linking Epic and Github Accounts](#Linking_Epic_and_Github_Accounts)
    *   [3.2 Unreal Engine 4 - Fork Creation](#Unreal_Engine_4_-_Fork_Creation)
*   [4 Software Installation](#Software_Installation)
    *   [4.1 Windows Patches](#Windows_Patches)
    *   [4.2 Unreal Launcher](#Unreal_Launcher)
    *   [4.3 Visual Studio 2015 Community Edition](#Visual_Studio_2015_Community_Edition)
    *   [4.4 Github Desktop Installation](#Github_Desktop_Installation)
*   [5 Configure and Build Source](#Configure_and_Build_Source)
    *   [5.1 Prerequisites](#Prerequisites)
    *   [5.2 Generate Project Files](#Generate_Project_Files)
    *   [5.3 Visual Studio Prep Work](#Visual_Studio_Prep_Work)
    *   [5.4 Compile Source](#Compile_Source)
    *   [5.5 Create Shortcut / First Time Run](#Create_Shortcut_.2F_First_Time_Run)
*   [6 Add Plugins to Base Source Engine](#Add_Plugins_to_Base_Source_Engine)
    *   [6.1 GitHub Web Site](#GitHub_Web_Site)
    *   [6.2 GitHub Desktop Client](#GitHub_Desktop_Client)
    *   [6.3 Visual Studio Build](#Visual_Studio_Build)
    *   [6.4 GitHub Desktop Final Steps](#GitHub_Desktop_Final_Steps)
    *   [6.5 Final Notes on Plugins](#Final_Notes_on_Plugins)
*   [7 Plugin / Engine Upgrades](#Plugin_.2F_Engine_Upgrades)
    *   [7.1 Plugin Upgrades](#Plugin_Upgrades)
    *   [7.2 Unreal Engine 4 Upgrade](#Unreal_Engine_4_Upgrade)
*   [8 That's all folks](#That.27s_all_folks)

Overview
--------

Tired of having to put [Rama's](https://forums.unrealengine.com/showthread.php?3851-(39)-Rama-s-Extra-Blueprint-Nodes-for-You-as-a-Plugin-No-C-Required!) excellent VictoryBPLibraries into all of your projects manually? How about building a Git source that includes your favorite plugins. This means when new projects are created, the plugins are already there.

Even if you decide not to add plugins to your project, you can use the steps here to create a source build of the engine.

This tutorial is aimed at beginners so I will go through the entire process. A support / comments / suggestion forum thread is [here.](https://forums.unrealengine.com/showthread.php?109293-Tutorial-Source-Build-with-your-Favorite-Plugins)

Getting Started
---------------

### Needed Accounts

You must have an Epic Games account, if you don't head over [here](https://accounts.unrealengine.com/login/index?state=https%3A%2F%2Fwww.unrealengine.com%2Fdashboard&client_id=43e2dea89b054198a703f6199bee6d5b). Also needed will be Github and Microsoft account for Visual Studio 2015 Community Edition. Github account creation will be covered, but Microsoft will not be because it is not necessary, but recommended.

### Necessary Software

[Unreal Launcher](https://launcher-public-service-prod06.ol.epicgames.com/launcher/api/installer/download/EpicGamesLauncherInstaller.msi): The launcher has a top row of items for Epic Games major initiatives, but we'll be hanging out in the Unreal Engine tab. Finally, there are four sub-sections in the left hand column: Community keeps you updated on important UE4 news. Learn is a great place to find tutorials. Marketplace is great for art assets and blueprint programming projects, and finally, the Library. This is where you projects and purchased (Vault) items are stored.

[Visual Studio 2015 Community](https://www.microsoft.com/en-us/download/details.aspx?id=48146): Microsoft Visual Studio 2015 Community Edition is a development environment for the creation of all sorts of applications, from C#, C++ to web applications. For our purposes, we only need C++ which is _not_ installed by default.

[Github Desktop Windows Client](https://github-windows.s3.amazonaws.com/GitHubSetup.exe): Github will be our access to the Unreal Engine 4 source code.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) While the Unreal Launcher is not necessary, I would highly recommend downloading and installing. If you ever want to purchase from the Marketplace it needs a place to be stored (your vault). A negative is that your completed build can not be added to the launcher at this time, only the binaries. We'll go over where the final executable will be so you can create a shortcut to your desktop.

### PC Requirements

You should have fast multi-core PC as compiling can take a long time. Visual Studio will use all of the cores that it finds (at least for Intel) but does not seem to take advantage of hyper-threading. Additionally, you will need about 45GB of disk space for the Unreal Engine 4 source so keep that in mind for source directory destination. Finally, Epic recommends 32GB of RAM, but if that is not possible try to at least have 16GB.

For the purposes of this tutorial, I'm running VMWare Workstation 12 Windows 7 VM with 2 vCPU's and 16GB of RAM. My compile time took 1.25 hours. Horrible, and I should have added additional vCPUs and stored the VM files on my SSD drive!

More information from Epic about recommended hardware (slightly outdated) can be found [here.](https://wiki.unrealengine.com/Recommended_Hardware)

GitHub Web Setup
----------------

### Linking Epic and Github Accounts

Head over to [Github](https://github.com/epicgames) and create an account. You will see the green SIGN UP button in the top right hand corner of the web page. Once the necessary information is filled out, the free personal plan is pre-selected. Click continue. Finally, just skip the next step if you want or provide the requested information.

Now that Github has been setup, head back to your Epic user settings page [here](https://unrealengine.com/dashboard/settings). Make sure to be in the profile section and look for Github account name and put in the account name used above.

Head back over to [Github](https://github.com/EpicGames) and click on the button view invitation in the top right hand corner and then click on Join Epic Games. Epic has two repositories, UnrealEngine and UnrealTournament, click on UnrealEngine.

### Unreal Engine 4 - Fork Creation

Now that you have been granted access to the UnrealEngine repository, you will need to "fork" a copy to your GitHub account that you just created above. To do that you first need to change the GitHub dashboard to the EpicGames organization. See screenshot below:

[![Gitweb2a.png](https://d26ilriwvtzlb.cloudfront.net/2/23/Gitweb2a.png)](/File:Gitweb2a.png)

Once you have selected the EpicGames organization you will be taken to their dashboard which looks like the screenshot below.

[![UEGitHub2a.png](https://d26ilriwvtzlb.cloudfront.net/2/28/UEGitHub2a.png)](/File:UEGitHub2a.png)

In the top right hand corner of their dashboard click on Fork. You will be given a choice to select where you want to fork the code to and the only option is your GitHub account. Simply click on it and a few minutes later your own Github account will have a repository named: YourAccountName/UnrealEngine. We're pretty much done here, so let's move to software installation.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) Its possible to get to the EpicGames Organizational screen which does not show the source code for UE4. This page is actually the News Feed. To get to the UE4 source, look for a box labeled Repositories (3) and select EpicGames/UnrealEngine.

Software Installation
---------------------

We need to install our software in the recommended order:

1.  Unreal Launcher
2.  Visual Studio 2015
3.  Github Desktop Client

### Windows Patches

What does this have to do with Unreal Engine 4? Well...It turns out that some patches are needed by both the Unreal Editor and Visual Studio 2015 and you might as well update before getting the dreaded MISSING PREREQUISITES message. Besides, we all know how secure Windows is? Yeah, right. Best to be updated.

### Unreal Launcher

The Unreal Launcher is very easy to install, simply click on the download that was done above and follow the prompts. Once installed, the launcher will ask you for your username and password, enter them in. That's it!

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) During the setup process you will be asked for an installation directory, choose wisely as this is where you vault downloads will go.

### Visual Studio 2015 Community Edition

There is a little more work involved with the installation of Visual Studio 2015. The first and most important consideration is to ensure that you select C++ from the installation dialog box. Run the executable from the download above to start the installation process. Be sure to select custom installation (see below screen shot).

[![Vs1.png](https://d26ilriwvtzlb.cloudfront.net/8/84/Vs1.png)](/File:Vs1.png)

The next screen is very important because you will need to manually select C++ as shown below.

[![Vs2.png](https://d26ilriwvtzlb.cloudfront.net/0/0f/Vs2.png)](/File:Vs2.png)

As you can see, I've selected the Visual C++ option. I did deselect Windows XP Support for C++ because who uses XP anymore? All of the other options are up to you.

Click next and head to your favorite coffee shop...It will be awhile! Once done, it will ask you to restart. Restart and now onto Github Desktop installation and configuration.

### Github Desktop Installation

Head to the downloads directory and run GitHubSetup. Super easy process and when the installation is completed, double-click on the GitHub icon on the desktop. The below screen shot is what the screen will look like.

[![GithubLogin.png](https://d26ilriwvtzlb.cloudfront.net/a/ac/GithubLogin.png)](/File:GithubLogin.png)

Enter GitHub account information and click Log in.

The next screen will ask to Configure git. It should default to the account information put in in the previous step...Keep in mind that the email address will be public if there are any published commits. Click Continue.

[![ConfigureGitHub.PNG](https://d26ilriwvtzlb.cloudfront.net/5/59/ConfigureGitHub.PNG)](/File:ConfigureGitHub.PNG)

A welcome screen will be displayed but no repositories. Well, we're going to fix that! Click on the dashboard link to get started.

[![GitHubWelcomeScreen.png](https://d26ilriwvtzlb.cloudfront.net/5/5f/GitHubWelcomeScreen.png)](/File:GitHubWelcomeScreen.png)

Clicking the dashboards link will display your personal dashboard of repositories. A tutorial repository has been created and you might want to consider running through it. Its pretty nifty!

From your personal dashboard, click on + and select clone. See screen shot below.

[![Gitdesktop3a.PNG](https://d26ilriwvtzlb.cloudfront.net/5/5b/Gitdesktop3a.PNG)](/File:Gitdesktop3a.PNG)

Make sure to select the fork inside your organization, in my case, 837studios. Then, click on UnrealEngine and click on Clone UnrealEngine.

A dialog box will come up and ask where to store the local copy, select a disk with plenty of space.

Depending on internet connection speed this could take quite awhile. I've got a 150MB Comcast (argh!) connection and it took about 5 minutes. When completed, the screen should look like the below screenshot.

[![CompletedDesktop.PNG](https://d26ilriwvtzlb.cloudfront.net/e/e3/CompletedDesktop.PNG)](/File:CompletedDesktop.PNG)

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) We will be adding additional repositories like Rama's Blueprint Nodes in a little bit, but for now, let's stop with this. We will also go over how to upgrade from 4.11.x to 4.11.x.

Configure and Build Source
--------------------------

### Prerequisites

There are a few things we need to do before we actually compile the source. The first is download the prerequisites and then generate Visual Studio 2015 project files.

Go to the root of your source by clicking open this repository in Explorer from the GitHub Desktop Client.

Right click on Setup.bat and Run As Administrator. It will download about 4GB of dependencies, so you might want to head back to your favorite coffee shop if your internet connection is stinky. After the download completes you will see it Installing prerequisites and the command prompt will close.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) You may get a dialog box that says Register Unreal Engine File types, if so, click Yes.

### Generate Project Files

The next step is to GenerateProjectFiles and luckily, a trip to the coffee shop is not required. Right click on the batch file GenerateProjectFiles and Run As Administrator. A command prompt window will be displayed for about 10 seconds and disappears. Gasp! We're now ready to go into Visual Studio 2015 and compile the source.

### Visual Studio Prep Work

We're now ready to compile the source inside of Visual Studio 2015. In the repository directory, double-click on the UE4.SLN (Solution File) and Visual Studio 2015 will load. As with most Microsoft products, they want to gather important advertising statistics <cough> I mean important Visual Studio targeted information, so create an account or login with your current Microsoft account.

While Visual Studio is parsing files in our solution, let's setup Visual Studio 2015 with some recommended settings. There is already a very good article located [here.](https://docs.unrealengine.com/latest/INT/Programming/Development/VisualStudioSetup/#recommendedsettings) Ignore anything to do with Visual Studio 2013. Be sure to install the UE4 plugin for Visual Studio because it will save time when needing to regenerate project files.

When you are done following the tutorial above, you should have a screen that looks like mine below.

[![VisualStudio1.PNG](https://d26ilriwvtzlb.cloudfront.net/c/c1/VisualStudio1.PNG)](/File:VisualStudio1.PNG)

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) You may have chosen a different color scheme, or even slightly different lengths for your tool bars, but the important thing is to have Development Editor and UE4 in the drop down menus.

### Compile Source

We're now finally ready to compile the source code. Right click on UE4 under Engine and click build. Even if you have the fastest computer on the planet (perhaps not Mars) then a trip to the coffee shop might be in order. As I've said early, my virtual Windows PC took over an hour! Normally, it takes about 25 minutes on my i7 workstation.

In the output window you will see a ton of stuff fly by, this is completely normal. If successful, the final line will look like the screen shot below. If you see a number next to failed, a step might have been missed.

[![Output.png](https://d26ilriwvtzlb.cloudfront.net/4/4a/Output.png)](/File:Output.png)

### Create Shortcut / First Time Run

Since a source engine can not be added to the launcher, the easiest way to access the editor is to go to GitHub dashboard and open in explorer and then: \\Engine\\Binaries\\Win64 and create a shortcut for UE4Editor.exe on your desktop. You also might want to make a short cut for UE4.SLN on your desktop for easier access to UE4 source build in Visual Studio.

Double-click on the newly created short cut and watch and gasp as the editor is stuck at 45%!! No, nothing is wrong, it will only hang at 45% the first time the editor is loaded. Once the project browser is loaded, shaders will be compiled.

Congratulations, you now have a working Unreal Engine 4.11.2 source installation. Now, let's move to adding Rama's plugin.

Add Plugins to Base Source Engine
---------------------------------

### GitHub Web Site

Its time to head back to [GitHub](https://github.com) and fork the plugins we want to include in our base source engine. In search box type VictoryPlugin and then click EverNewJoy/VictoryPlugin. It will take to a screen that looks similar to the Unreal Engine repository. You already know what to do...Click Fork and select your account. That's it!

### GitHub Desktop Client

Open the GitHub Desktop Client and click the + key again and select Clone. VictoryPlugin is now part of the repositories. Select it and click Clone repository. Select a location to store the source code. It should default to the directory GitHub. Cloning is much faster than Unreal Engine!

Click on open this repository in explorer and go up one level and right-click and select copy on the directory VictoryPlugin and then paste into the .\\Engine\\Plugins\\Runtime directory.

### Visual Studio Build

Click on the UE4.sln shortcut that you created on the desktop and go into Visual Studio. This is where the Unreal Visual Studio plugin comes in handy. In the top right hand corner of Visual Studio, locate two green arrows pointing to each other in a circle and click on it. A dialog box will appear, click on Reload All.

[![Reload.png](https://d26ilriwvtzlb.cloudfront.net/9/98/Reload.png)](/File:Reload.png)

If you do not have the Unreal Plugin loaded, go to your repository directory and click on GenerateFiles.bat.

The final step is to build the code into our base engine. Right click on UE4 in the solution explorer and select build. Don't worry, a coffee break will not be necessary because its smart enough to only compile the new code.

Double click on the UE4Editor shortcut and create a new project (can be anything). Once inside the editor, go to File->Plugins. And, if everything worked, it should look like the screen shot below.

[![TaDa.png](https://d26ilriwvtzlb.cloudfront.net/e/ee/TaDa.png)](/File:TaDa.png)

TaDa! You did it... Only a couple of small things we need to do and you can finally leave this joint!

### GitHub Desktop Final Steps

Go back into the GitHub Desktop Client and click on the UnrealEngine repository in the left hand column. There should be ~18 changes as of 4/30/2016. In the summary box, put in VictoryPlugin Addition and click Commit to release. Once its committed, you will need to update your repository at GitHub.com. Click Sync in the brown area of the GitHub Desktop client. Head back to [GitHub](https://github.com) and view the commit. Pretty awesome!

### Final Notes on Plugins

This procedure can be used for pretty much all plugins that adhere to Epic's standards. There are a few more complicated ones that require additional work (Javascript plugin!) but for the most part, it should work smoothly. Do roam around GitHub and see what's out there! Lots of people have created excellent plugins that will make developers lives easier.

Plugin / Engine Upgrades
------------------------

### Plugin Upgrades

Most plugins will be updated from time to time and its important to check the state of the source code. If the plugin is stored on your GitHub repository, upgrading is very easy. To check if there is an upgrade, open your GitHub Desktop Client and see if the Update from xxxxxx/master is highlighted. See below.

[![Updatea.png](https://d26ilriwvtzlb.cloudfront.net/5/5a/Updatea.png)](/File:Updatea.png)

Good news for us is that Rama upgraded his plugin to include new functionality. Click on the Update from EverNewJoy/master and it should become darker. Click on History to see the updates.

[![Update1.png](https://d26ilriwvtzlb.cloudfront.net/4/43/Update1.png)](/File:Update1.png)

Go back into Visual Studio and refresh your project. Then, right-click on UE4 in solution explore and select Build. The build should be much shorter but there will be a delay when starting up the editor for the first time. Last thing is to sync your changes back to GitHub.com. Select the plugin that you updated (in this case, VictoryPlugin) and click sync.

Most likely, UnrealEngine will need to be synced as well, before syncing, click on UnrealEngine and click on Changes. If there are any files that need to be committed go ahead and do so now. I named mine, VictoryPlugin Update. Once the commit has been created, click Sync.

### Unreal Engine 4 Upgrade

Engine upgrades are similar to the above procedure, except you click the UnrealEngine repository, click Upgrade from Epic/release. Once upgrade has been completed, load up Visual Studio, refresh project and build. Oh! And, one last thing, make sure to sync so that GitHub.com is updated. That's pretty much it!

That's all folks
----------------

I hope this tutorial has helped in some way...! Support / Comment / Suggestion Thread [here.](https://forums.unrealengine.com/showthread.php?109293-Tutorial-Source-Build-with-your-Favorite-Plugins)

teak421

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Git\_Build\_with\_plugins&oldid=23298](https://wiki.unrealengine.com/index.php?title=Git_Build_with_plugins&oldid=23298)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)