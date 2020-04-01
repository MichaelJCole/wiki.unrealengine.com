GitHub Setup - Epic Wiki                    

GitHub Setup
============

**Rate this Article:**

4.50

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_half.gif) (6 votes)

Approved for Versions:4.3, 4.6, 4.12

Contents
--------

*   [1 Building Unreal Engine 4 using Source Code from GitHub](#Building_Unreal_Engine_4_using_Source_Code_from_GitHub)
*   [2 Initial Setup](#Initial_Setup)
    *   [2.1 Unreal Engine Account](#Unreal_Engine_Account)
    *   [2.2 GitHub Account](#GitHub_Account)
    *   [2.3 Install the GitHub Client](#Install_the_GitHub_Client)
    *   [2.4 Install Visual Studio 2015](#Install_Visual_Studio_2015)
*   [3 Visual Studio Setup](#Visual_Studio_Setup)
*   [4 Get Source Code](#Get_Source_Code)
    *   [4.1 Create Your Own Fork](#Create_Your_Own_Fork)
    *   [4.2 Cloning Your Fork](#Cloning_Your_Fork)
        *   [4.2.1 Use GitHub Client](#Use_GitHub_Client)
        *   [4.2.2 Clone from GitHub](#Clone_from_GitHub)
    *   [4.3 Get Dependencies](#Get_Dependencies)
        *   [4.3.1 Versions up to 4.5.1](#Versions_up_to_4.5.1)
        *   [4.3.2 Versions 4.6.0 and later](#Versions_4.6.0_and_later)
*   [5 Build the Engine](#Build_the_Engine)
*   [6 Opening an existing C++ project](#Opening_an_existing_C.2B.2B_project)

Building Unreal Engine 4 using Source Code from GitHub
======================================================

The purpose of this tutorial is to provide a step-by-step guide to setting up your GitHub account, obtaining the source code for Unreal Engine 4, and building a version of the Engine in Visual Studio. This tutorial is intended for anyone who has never gone through this process before, and who may be unfamiliar with GitHub or Visual Studio. This tutorial will be focused on Windows operating systems. There are some differences when setting up for Mac usage, but those differences are generally minor.

First, [watch this video](http://www.youtube.com/watch?v=usjlNHPn-jo&feature=youtu.be). I will be going over a lot of what is covered in the video in this tutorial (not necessarily in the same order), but it may be helpful to see what you will be doing first.

Initial Setup
=============

Unreal Engine Account
---------------------

Make sure you have an [Unreal Engine 4](https://www.unrealengine.com) account.

[![UE4Account.png](https://d26ilriwvtzlb.cloudfront.net/1/19/UE4Account.png)](/File:UE4Account.png)

GitHub Account
--------------

Make sure you have a [GitHub account](https://github.com).

[![2 GitHub.png](https://d26ilriwvtzlb.cloudfront.net/9/97/2_GitHub.png)](/File:2_GitHub.png)

Go to your Unreal Engine 4 account and link your GitHub account. You will receive an email from GitHub notifying you that you have been invited to join the EpicGames Organization. Click the link in the email to join EpicGames, or visit the [Organization page](https://github.com/EpicGames) on GitHub and click the button to join the Organization (make sure you are logged into your GitHub account when you do this). Once you have joined the Organization, you will see the Unreal Engine 4 and Unreal Tournament repositories that are maintained by the EpicGames Organization.

[![ProfileSettings.png](https://d26ilriwvtzlb.cloudfront.net/0/08/ProfileSettings.png)](/File:ProfileSettings.png)

Install the GitHub Client
-------------------------

Download and install the [GitHub client](https://desktop.github.com/).

[![GitHubDesktop.png](https://d26ilriwvtzlb.cloudfront.net/5/5e/GitHubDesktop.png)](/File:GitHubDesktop.png)

Install Visual Studio 2015
--------------------------

If you do not already have Visual Studio 2015 installed, [you can get it here](http://www.visualstudio.com/products/visual-studio-community-vs). You can then download and use Visual Studio Community 2015 for free, which is the same as Visual Studio Professional 2015 but with a more restrictive license. Make sure to check the [license terms](http://www.visualstudio.com/support/legal/dn877550) for Community to be sure you are able to use it. I will be using the Professional version in my examples, but there should be no difference in how it works for you if you are using a different version of Visual Studio 2015.

[![VSCommunity 2013.png](https://d26ilriwvtzlb.cloudfront.net/0/03/VSCommunity_2013.png)](/File:VSCommunity_2013.png)

It is possible to use Visual Studio 2013, but we will be phasing out support for this version of Visual Studio soon.

Visual Studio Setup
===================

This section is optional. The following steps will allow you to closely mimic the way I have Visual Studio set up. I find this setup to be very useful, but it is entirely up to you if you want to follow these suggestions.

Start Visual Studio, then right-click on an empty area of the toolbar and make sure the Standard toolbar option is selected (has a check mark). If you are not sure what the different Visual Studio toolbars are, it may be helpful to make sure this is the only toolbar currently displayed for now. You can hide or display toolbars as you choose.

[![7 StandardToolbar.png](https://d26ilriwvtzlb.cloudfront.net/f/fe/7_StandardToolbar.png)](/File:7_StandardToolbar.png)

Click the down arrow at the far right side of the Standard toolbar, select “Add or Remove Buttons”, then make sure “Solution Configurations” and “Solution Platforms” are both selected.

[![8 StandardToolbar.png](https://d26ilriwvtzlb.cloudfront.net/2/22/8_StandardToolbar.png)](/File:8_StandardToolbar.png)

Right-click an empty area of the toolbar and select the “Customize” option at the bottom of the context menu.

[![9 VSToolbarOptions.png](https://d26ilriwvtzlb.cloudfront.net/0/02/9_VSToolbarOptions.png)](/File:9_VSToolbarOptions.png)

In the Customize window, click the Commands tab, then select the Toolbar radio button and find the Standard toolbar in the dropdown menu. In the Controls window, locate the Solution Configurations option, click it, then click Modify Selection to the right. Set the width to 200, then close the Customize window. This extends the width of the Solution Configuration option in your toolbar so that the full text will be displayed.

[![10 VSSolutionConfig.png](https://d26ilriwvtzlb.cloudfront.net/a/a7/10_VSSolutionConfig.png)](/File:10_VSSolutionConfig.png)

You can customize a large number of Visual Studio toolbar items in this way. It is entirely up to you if you choose to do so.

Get Source Code
===============

Create Your Own Fork
--------------------

Log into GitHub. If you added your GitHub account name to your Unreal Engine account, then you will see that you have been added to the EpicGames Organization in GitHub.

[![11 GitHubOrganizations.png](https://d26ilriwvtzlb.cloudfront.net/f/fc/11_GitHubOrganizations.png)](/File:11_GitHubOrganizations.png)

Click on the Epic Games logo to go to the Epic Games page on GitHub. You will see two private repositories. The “UnrealTournament” repository contains the source code for the new Unreal Tournament game that we are developing in conjunction with the community. Feel free to join in if you want. The “UnrealEngine” repository is the one you want for the purposes of this tutorial. Click on that repository.

[![12 EpicGames.png](https://d26ilriwvtzlb.cloudfront.net/f/f6/12_EpicGames.png)](/File:12_EpicGames.png)

The repository screen allows you to explore all of the files in the repository, as well as a bunch of stats about the repository. Feel free to look around later. For now, click on the Fork button in the top right.

[![13 UnrealEngine.png](https://d26ilriwvtzlb.cloudfront.net/d/d8/13_UnrealEngine.png)](/File:13_UnrealEngine.png)

You will see a prompt asking you want to fork the repository. You should see two options, your own account or the Epic Games account. You will only be able to select your own account, so do so.

[![14 ForkDestination.png](https://d26ilriwvtzlb.cloudfront.net/b/b9/14_ForkDestination.png)](/File:14_ForkDestination.png)

After a few seconds, you will see another repository page, but this one will be your own repository. It is identical to the current state of the repository at Epic Games, but it will not automatically update. I will let you know in another tutorial how you can update your repository with any updates that Epic Games makes to their repository.

Cloning Your Fork
-----------------

Now that you have your fork of the source code, you need to clone a copy of the repository to your local computer. There are a couple ways to do this, and I will show you both. Whichever way you decide to do it is up to you. The end result is the same.

### Use GitHub Client

Start the GitHub Client that you installed previously. When it loads, you will be asked to log in. Log in with your GitHub account information.

[![16 GitHubClient.png](https://d26ilriwvtzlb.cloudfront.net/d/d2/16_GitHubClient.png)](/File:16_GitHubClient.png)

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) The GitHub client is a very simple client intended to give you a graphical display of your repository. It is not a fully featured interface with GitHub, but it is sufficient for most of what you will need to do. There are other clients that you can use if you wish, but this tutorial will be limited to using the GitHub client.

Once you are logged in, you will be presented with a blank interface with a large prompt inviting you to “Get started by adding a repository.”

[![17 GitHubClient.png](https://d26ilriwvtzlb.cloudfront.net/6/63/17_GitHubClient.png)](/File:17_GitHubClient.png)

Click the ‘+’ in the top left corner. You will see a window prompting you to provide a name for a repository and the path to the repository on your machine. We do not want to create a local empty repository, so click the Clone tab at the top of the window.

[![18 GitHubClient.png](https://d26ilriwvtzlb.cloudfront.net/a/a7/18_GitHubClient.png)](/File:18_GitHubClient.png)

You will see a column on the left containing your GitHub account and any GitHub organizations that you are a member of. Currently, there will most likely only be two options there. On the right, you will see any repositories that are available in the selected account/organization. Select your account and the Unreal Engine fork that we created earlier, then click “Clone UnrealEngine” at the bottom.

[![19 GitHubClient.png](https://d26ilriwvtzlb.cloudfront.net/c/c2/19_GitHubClient.png)](/File:19_GitHubClient.png)

You will be prompted for a location to save the repository. My suggestion would be to create a GitHub folder on your hard drive of choice and select that folder. Make sure you have plenty of space available, as this folder can become quite large. Click OK, and the client will begin cloning the repository to your computer. This will most likely take a few minutes.

[![20 GitHubClient.png](https://d26ilriwvtzlb.cloudfront.net/2/2e/20_GitHubClient.png)](/File:20_GitHubClient.png)

### Clone from GitHub

Open the GitHub client and log in using your GitHub account information. Click the “Clone in Desktop” button on your repository page on GitHub.

[![21 GitHub.png](https://d26ilriwvtzlb.cloudfront.net/4/4e/21_GitHub.png)](/File:21_GitHub.png)

If you are using Chrome, you will likely see a warning message appear. Other browsers may show something similar. Click “Launch Application”, or whatever option allows you to continue.

[![22 GitHub.png](https://d26ilriwvtzlb.cloudfront.net/e/e6/22_GitHub.png)](/File:22_GitHub.png)

The GitHub client will load, and you will be prompted to select a location to store the repository. As before, I would recommend creating a GitHub folder on your hard drive of choice, and make sure you have plenty of space available.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) If you are not already logged into the GitHub client, you will receive an error message. Log in and repeat the steps above again.

The GitHub client will begin cloning the repository to your computer. This will take a few minutes.

[![20 GitHubClient.png](https://d26ilriwvtzlb.cloudfront.net/2/2e/20_GitHubClient.png)](/File:20_GitHubClient.png)

When the GitHub client has finished cloning the repository, it will display a history of all of the commits to the repository.

[![24 GitHubClient.png](https://d26ilriwvtzlb.cloudfront.net/6/6c/24_GitHubClient.png)](/File:24_GitHubClient.png)

I can hear you now: “Great, that was easy. Now how do I start the Editor?” Well, we’re not done just yet.

Get Dependencies
----------------

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) The following section only applies to version 4.5.1 and older. Starting in version 4.6.0, a new batch file is included with the source code of the Engine that automatically downloads all of the required files to be able to build the Engine. Its use is explained at the end of this section.

### Versions up to 4.5.1

Return to Epic Games’ Unreal Engine repository (make sure you are at the original repository and not your fork of it). Click on the Releases link.

[![25 GitHubReleases.png](https://d26ilriwvtzlb.cloudfront.net/a/a5/25_GitHubReleases.png)](/File:25_GitHubReleases.png)

This page shows you all of the versions of the Unreal Engine that are available. Unless you want to use a specific version of the Engine, you will want to look for the one with a prominent “Latest release” label. This is the most recently released version, and is most likely where you want to start. If you want to install one of the other versions, the instructions will be the same.

[![26 Releases.png](https://d26ilriwvtzlb.cloudfront.net/6/6b/26_Releases.png)](/File:26_Releases.png)

Click the title of the version with the “Latest release” label. The only thing this changes is to open a page specifically for that version to remove any potential confusion caused by having the other versions visible.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) Currently all of the dependencies for the different versions have the same names. It is important to make sure you get the dependencies for the version of the Engine you are trying to build, since the dependencies for version 4.2.1 will not work with 4.3.0, and vice versa.

Download all of the Required zip files for your version of the Engine into a temporary folder. For version 4.3.0, you would need to download two files: Required\_1of2.zip and Required\_2of2.zip.

Unzip each of the dependency files that you downloaded. Make sure you unzip them into the folder where your GitHub repository is located. This folder will currently have two subfolders. One of these folders is named “Engine,” and the other (which is a hidden folder) is named “.git.” If you can’t see the “.git” folder, you can change the option for Windows Explorer to show hidden items. After you have unzipped the dependency files, you should see two new folders: “Samples” and “Templates.”

Alternatively, you can unzip the files into the location where you downloaded them and copy them over to your local repository. This may take a little more time than unzipping them directly there.

### Versions 4.6.0 and later

In the root folder of the source code that you have downloaded, you will see a file named Setup.bat. Run this file. It will automatically download all of the additional required files to be able to build the Engine. Depending on your internet connection, this download may take a few minutes.

A clean download of the engine binaries is currently around 2.5gb, which may take some time to complete. Subsequent checkouts only require incremental downloads and will be much quicker.

“Awesome!” you are thinking. “Now how do I start the Engine?” We still need to do a few things.

Build the Engine
================

If you have not already done so, open a Windows Explorer window and navigate to the folder where your local repository is located. Locate the GenerateProjectFiles.bat file and double-click on it to run it.

[![27 Directory.png](https://d26ilriwvtzlb.cloudfront.net/a/ac/27_Directory.png)](/File:27_Directory.png)

This will create two new files in your folder: “UE4.sln” and “UE4.v12.suo”.

[![28 Directory.png](https://d26ilriwvtzlb.cloudfront.net/1/13/28_Directory.png)](/File:28_Directory.png)

Double-click on UE4.sln to open it in Visual Studio. When Visual Studio opens the solution, your Solution Explorer should look something like this.

[![29 SolutionExplorer.png](https://d26ilriwvtzlb.cloudfront.net/5/50/29_SolutionExplorer.png)](/File:29_SolutionExplorer.png)

Check your Solution Configuration and Solution Platform to make sure they are set to Development Editor and Win64 respectively.

[![30 SolutionSettings.png](https://d26ilriwvtzlb.cloudfront.net/6/6d/30_SolutionSettings.png)](/File:30_SolutionSettings.png)

Feel free to explore later, but for now right-click on the UE4 project in the Engine folder and select Build.

[![31 BuildEngine.png](https://d26ilriwvtzlb.cloudfront.net/5/58/31_BuildEngine.png)](/File:31_BuildEngine.png)

Depending on your computer, this may take a while. Now would be a good time to get a snack. Or some coffee. Or both.

Welcome back! If everything went well, you should now have a version of Unreal Engine 4 built from source code and ready to go. If you ran into any build errors, you can search for help on our [Documentation page](https://docs.unrealengine.com/latest/INT/), which also searches our AnswerHub and Forums.

“So, can we start the Engine now?” Patience, Grasshopper. We are almost there. Go back to your Windows Explorer window where you should still be looking at your repository folder. From there navigate down to \\Engine\\Binaries\\Win64.

[![32 BinariesFolder.png](https://d26ilriwvtzlb.cloudfront.net/f/f3/32_BinariesFolder.png)](/File:32_BinariesFolder.png)

Scroll all the way down to the bottom of this folder. At the bottom you will see a file named “UnrealVersionSelector-Win64-Shipping.exe” Double-click this file to run it. This file registers your new Unreal Engine 4 with Windows.

[![33 VersionSelector.png](https://d26ilriwvtzlb.cloudfront.net/8/89/33_VersionSelector.png)](/File:33_VersionSelector.png)

Now, the moment you have been waiting for. Yes! We can start the Engine now. Near the top of this same folder, you will find a file named “UE4Editor.exe” Double-click on this file to start the Engine.

[![34 UE4Editor.png](https://d26ilriwvtzlb.cloudfront.net/1/13/34_UE4Editor.png)](/File:34_UE4Editor.png)

[![35 Launch.png](https://d26ilriwvtzlb.cloudfront.net/1/16/35_Launch.png)](/File:35_Launch.png)

The initial launch may take a little while as the Editor goes through some first-run setup tasks. It will not be long before you see the Project Browser appear.

[![36 Yay.png](https://d26ilriwvtzlb.cloudfront.net/5/5e/36_Yay.png)](/File:36_Yay.png)

You will most likely also see a notice at the bottom of your screen about shaders compiling. This should only happen the first time the Editor is run.

[![37 Shaders.png](https://d26ilriwvtzlb.cloudfront.net/e/ea/37_Shaders.png)](/File:37_Shaders.png)

You should be all set at this point. If you have any additional questions, please use the link above to the Documentation search, or visit the [AnswerHub](https://answers.unrealengine.com/index.html) and/or [Forums](https://forums.unrealengine.com/). I will also be creating a tutorial for upgrading your GitHub repository, so stay tuned for that. Feedback is always welcome. Have fun!

\--[Tim Lincoln](/User:Tim_Lincoln "User:Tim Lincoln") ([talk](/index.php?title=User_talk:Tim_Lincoln&action=edit&redlink=1 "User talk:Tim Lincoln (page does not exist)")) 22:42, 1 August 2014 (UTC)

Opening an existing C++ project
===============================

If this is the first time you've built the engine from the source code but you already have existing C++ projects, you'll want to be able to debug your project and step into the engine code from time to time in order to troubleshoot why your own code isn't working. Your original C++ project doesn't know about the engine or the source files, so when you try to step into an engine side method, you'll get visual studio notices saying that the program debug database (PDB) doesn't exist for those objects. This is obviously because it wasn't using the engine source code when you compiled the project, so no PDB's were generated.

  
Fortunately, it's pretty straight forward to bring your existing project into the engine build. All you have to do is open up the project in your newly built engine. You'll probably get a notice that the existing project is not up to date with the new engine build and it wants to convert the project. This is pretty harmless, so it's okay to convert in place. The UE4 engine will update a bunch of files in your intermediate folders and then will try to recompile the whole project. If you're using source control, you will need to make sure that you have write access to these intermediate files (you'll get errors with a list of files which can't be written to -- just check them out). Once the project has been updated, you are safe to close the editor and open up your newly updated project solution. You'll notice within the solution explorer that your existing game was put into a "Games" folder and you now have full access to the engine source code within the solution explorer. Now, there are a few things you need to pay close attention to:

1) Your build configuration has a bunch of new options. These may have changed. You want to make sure that you're still using the "Development Editor" or "Debug Editor" configurations. If you use other build configurations, you may get some funky linker errors originating within the engine.

2) You want to verify that you're still building the Win64 version of the binary. In my case, it got toggled to Win32.

  
When you're ready, you want to right click on your own game project and select "Debug -> Start New Instance" (alternatively, you can right click and set it as the default start up project and then press F5). Since this is the first time your project is being built with the engine, it will recompile a whole bunch of engine files which takes anywhere from 5-15 minutes, depending on your processor speed. Subsequent game builds will not require an engine rebuild. Once the build has completed, the project will launch your game application and you can debug as normal. Now however, you can step directly into the engine code to troubleshoot your engine method calls!

  
If you're feeling really ambitious, you can even extend the capabilities of the engine itself. By running the engine / editor in debug mode, you can also see exactly where the engine itself is crashing and fix the code. No need to wait for Epic to release an update on a monthly cycle :)

Things I don't know yet:

\-What happens to your engine updates when you upgrade to a new engine version?

\-How to submit your engine updates via GitHub to Epic for inclusion in the next release?

Retrieved from "[https://wiki.unrealengine.com/index.php?title=GitHub\_Setup&oldid=22792](https://wiki.unrealengine.com/index.php?title=GitHub_Setup&oldid=22792)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Version Control](/index.php?title=Category:Version_Control&action=edit&redlink=1 "Category:Version Control (page does not exist)")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)