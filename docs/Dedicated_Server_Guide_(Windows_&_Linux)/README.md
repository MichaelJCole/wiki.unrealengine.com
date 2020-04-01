 Dedicated Server Guide (Windows & Linux) - Epic Wiki             

 

Dedicated Server Guide (Windows & Linux)
========================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

  
Engine Version: 4.14, 4.15, 4.16, 4.17, 4.18

NOTE - Apologies for the video quality of the tutorials. They were recorded in 1080p and decent quality but for some reason after uploading to you tube they became horribly blurred. I will redo them ASAP. Thanks

Contents
--------

*   [1 Section 1 Building a dedicated server in Unreal Engine 4](#Section_1_Building_a_dedicated_server_in_Unreal_Engine_4)
    *   [1.1 1\. Download the Unreal engine from source](#1._Download_the_Unreal_engine_from_source)
    *   [1.2 2\. Setup source unreal engine](#2._Setup_source_unreal_engine)
    *   [1.3 2.a Setup source unreal engine To use Visual studio 2017](#2.a_Setup_source_unreal_engine_To_use_Visual_studio_2017)
    *   [1.4 Congratulations - you should have now successfully setup a source built version of unreal engine](#Congratulations_-_you_should_have_now_successfully_setup_a_source_built_version_of_unreal_engine)
    *   [1.5 3\. Video guide](#3._Video_guide)
*   [2 Section 2 setting up a dedicated server on windows](#Section_2_setting_up_a_dedicated_server_on_windows)
    *   [2.1 1\. Dedicated Server from a brand new project](#1._Dedicated_Server_from_a_brand_new_project)
    *   [2.2 2\. Dedicated Server from a blueprint only project](#2._Dedicated_Server_from_a_blueprint_only_project)
    *   [2.3 3\. preparing the project for building](#3._preparing_the_project_for_building)
        *   [2.3.1 1\. Target file instructions for engine version 4.14](#1._Target_file_instructions_for_engine_version_4.14)
        *   [2.3.2 2\. Target file instructions for engine version 4.15](#2._Target_file_instructions_for_engine_version_4.15)
        *   [2.3.3 3\. Target file instructions for engine version 4.16](#3._Target_file_instructions_for_engine_version_4.16)
        *   [2.3.4 4\. Target file instructions for engine version 4.17](#4._Target_file_instructions_for_engine_version_4.17)
        *   [2.3.5 5\. Target file instructions for engine version 4.18](#5._Target_file_instructions_for_engine_version_4.18)
    *   [2.4 4\. Switch Unreal engine versions & generate project files](#4._Switch_Unreal_engine_versions_.26_generate_project_files)
    *   [2.5 5\. Building the server](#5._Building_the_server)
    *   [2.6 6\. Fixing the lighting swarm error](#6._Fixing_the_lighting_swarm_error)
    *   [2.7 6.a Video Guide](#6.a_Video_Guide)
    *   [2.8 7\. Prepare the project for packaging](#7._Prepare_the_project_for_packaging)
    *   [2.9 8\. setup packaging settings](#8._setup_packaging_settings)
    *   [2.10 9\. Congratulations you have now packaged your project yay :-p](#9._Congratulations_you_have_now_packaged_your_project_yay_:-p)
*   [3 Section 3 launching and joining the dedicated server](#Section_3_launching_and_joining_the_dedicated_server)
    *   [3.1 1\. copy the server executable](#1._copy_the_server_executable)
    *   [3.2 2\. create the server shortcut and setup log options](#2._create_the_server_shortcut_and_setup_log_options)
    *   [3.3 3\. Launch and test the server](#3._Launch_and_test_the_server)
*   [4 Section 4 notes](#Section_4_notes)
    *   [4.1 1\. allowing friends to join over internet](#1._allowing_friends_to_join_over_internet)
    *   [4.2 2\. Hosting on a virtual server](#2._Hosting_on_a_virtual_server)
    *   [4.3 3\. Creating additional maps and joining different maps](#3._Creating_additional_maps_and_joining_different_maps)
    *   [4.4 4\. Enabling Physics](#4._Enabling_Physics)
*   [5 Section 5](#Section_5)
    *   [5.1 1\. Im too lazy for all this just give me the files](#1._Im_too_lazy_for_all_this_just_give_me_the_files)
*   [6 section 6 Contact the author](#section_6_Contact_the_author)
    *   [6.1 1.](#1.)
*   [7 section 7 Building and deploying a UE4 dedicated server for Linux](#section_7_Building_and_deploying_a_UE4_dedicated_server_for_Linux)
    *   [7.1 1\. Configure Visual Studio for Linux cross compilation](#1._Configure_Visual_Studio_for_Linux_cross_compilation)
    *   [7.2 2\. Package your project to a distinct location](#2._Package_your_project_to_a_distinct_location)
    *   [7.3 3\. Build a dedicated server binary for Linux](#3._Build_a_dedicated_server_binary_for_Linux)
    *   [7.4 4\. Deploy your binary to a remote machine](#4._Deploy_your_binary_to_a_remote_machine)
    *   [7.5 5\. Connect to your server and run the dedicated server binary](#5._Connect_to_your_server_and_run_the_dedicated_server_binary)
    *   [7.6 6\. Open UDP:7777](#6._Open_UDP:7777)
    *   [7.7 7\. Play your game on your server](#7._Play_your_game_on_your_server)
    *   [7.8 8\. Issues](#8._Issues)
*   [8 8\. Dedicated Server on Steam](#8._Dedicated_Server_on_Steam)

Section 1 Building a dedicated server in Unreal Engine 4
--------------------------------------------------------

Building a standalone dedicated server wasn’t an easy thing to do and i know a lot of people struggle with it so i decided to make this wiki guide to try and help people. I’m going to cover the steps I took to build a Windows executable of a dedicated server.

### 1\. Download the Unreal engine from source

You’ll need a source-built version of the engine in order to build using the server solution configurations in Visual Studio.

To build the engine from source go to [https://github.com/EpicGames/UnrealEngine](https://github.com/EpicGames/UnrealEngine)

Note: to see the content of the link above you need first to create a git hub account and associate it to your epic games account, then accept the invite of epic games on GitHub. You will then need to click the link and login to your account.

Next select engine version and click the green clone/download button

[![Select engine.png](https://d26ilriwvtzlb.cloudfront.net/7/7b/Select_engine.png)](/index.php?title=File:Select_engine.png)

there are several options but i always prefer to just download as zip file

extract and unzip the zip file to a location of your choice.

### 2\. Setup source unreal engine

open up the previously extracted folder and find a file called Setup.bat

double click this file and it will open up a console window and begin installing unreal dependencies

Note if you receive any errors when trying to open the .bat file then just right click instead and select run as administrator

[![Setup.png](https://d26ilriwvtzlb.cloudfront.net/9/98/Setup.png)](/index.php?title=File:Setup.png)

now find a file called GenerateProjectFiles.bat

double click this file or again right click and run as administrator

once it is done you will then have a visual studios solution project file in your folder

[![Solution.png](https://d26ilriwvtzlb.cloudfront.net/8/85/Solution.png)](/index.php?title=File:Solution.png)

### 2.a Setup source unreal engine To use Visual studio 2017

If you are using visual studio 2017. Instead of clicking on the GenerateProjectFiles.bat as shown above. Open up a CMD prompt window. Navigate to the folder where source built unreal files are by using the cd (change directory) command. Once inside the correct directory you need to run the following command. "GenerateProjectFiles.bat -2017"

this will then generate visual studio 2017 project files instead. full info can be found here [https://answers.unrealengine.com/questions/579186/what-about-visual-studio-2017-in-ue4.html](https://answers.unrealengine.com/questions/579186/what-about-visual-studio-2017-in-ue4.html) \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

now open this solution file and it will open visual studios and begin loading the source code.

note the first time you open the solution it normally takes a long time to parse all the header files . make sure you let it completely finish until it says ready at the bottom before you continue.

next go up to where it says develop next to where it says win64 and in the drop down menu select DEVELOPMENT EDITOR

[![Editor.png](https://d26ilriwvtzlb.cloudfront.net/a/a1/Editor.png)](/index.php?title=File:Editor.png)

next go to the solution explorer and right click the ue4 and select build

[![Build.png](https://d26ilriwvtzlb.cloudfront.net/1/18/Build.png)](/index.php?title=File:Build.png)

note depending on your system this can again take quite a long time to complete

once complete you then need to right click on ue4 again in the solution explorer and go to "set as start up project"

[![Build.png](https://d26ilriwvtzlb.cloudfront.net/1/18/Build.png)](/index.php?title=File:Build.png)

finally go up to where it says local windows debugger and click the little green play button

  
[![Debugger.png](https://d26ilriwvtzlb.cloudfront.net/e/ed/Debugger.png)](/index.php?title=File:Debugger.png)

you may get a warning pop up like this

  
[![Warning2.png](https://d26ilriwvtzlb.cloudfront.net/3/37/Warning2.png)](/index.php?title=File:Warning2.png)

just click yes and the editor will begin to open.

note again the first time it may take a while to open and can appear to be stuck on a certain percentage as if its frozen. just be patient and it will open.

[![Shaders.png](https://d26ilriwvtzlb.cloudfront.net/2/2c/Shaders.png)](/index.php?title=File:Shaders.png)

it will compile all the shaders as well which can take a while the first time.

What i do now is right click and add to task bar so that next time you can just open the engine directly rather than having to open visual studio and do it that way.

### Congratulations - you should have now successfully setup a source built version of unreal engine

### 3\. Video guide

[https://www.youtube.com/watch?v=u0jtHK7BdzY&feature=youtu.be](https://www.youtube.com/watch?v=u0jtHK7BdzY&feature=youtu.be)

Section 2 setting up a dedicated server on windows
--------------------------------------------------

### 1\. Dedicated Server from a brand new project

Open up source unreal engine, select c++ and third person template, give it a suitable name and save location

[![Createproject.png](https://d26ilriwvtzlb.cloudfront.net/e/ef/Createproject.png)](/index.php?title=File:Createproject.png)

once the project and visual studio have finished completely loading, close them both down.

Note again wait until the header files have all been parsed in visual studio before closing. it may prompt you to save just click ok.

### 2\. Dedicated Server from a blueprint only project

if your project was made with a none source or different engine version or was simply only BLUEPRINTS to begin with you will not be able to make a dedicated server until you add some c++ code.

So simply go to add new, c++ class, an empty class will suffice, and you can delete it later.

Once you have a source directory, right click on the .uproject file and generate visual studio project files. This should create an .sln in the project directory that you can open in visual studio.

  

### 3\. preparing the project for building

#### 1\. Target file instructions for engine version 4.14

open up the previously created project folder from the file explorer inside there will be a folder called source . open this up

[![Sourcefolder.png](https://d26ilriwvtzlb.cloudfront.net/d/df/Sourcefolder.png)](/index.php?title=File:Sourcefolder.png)

inside you will find some visual studio source files. take one of the source files and copy and paste it and then rename it to match the others . format is gamenameServer.Target.cs so in my case because my project game name is called test i would rename my file to testServer.Target.cs like so

[![Testserver.png](https://d26ilriwvtzlb.cloudfront.net/0/04/Testserver.png)](/index.php?title=File:Testserver.png)

right click this newly created file and click edit

[![Editfile.png](https://d26ilriwvtzlb.cloudfront.net/6/6d/Editfile.png)](/index.php?title=File:Editfile.png)

this will normally bring up a notepad so you can edit the file , although you can use any kind of text or code editor you wish. notepad is just quick and easy.

delete anything that is in the file so it is completely blank and replace with this code/text

// Copyright 1998-2016 Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;
using System.Collections.Generic;

public class ShooterGameServerTarget : TargetRules
{
      public ShooterGameServerTarget(TargetInfo Target)
      {
         Type = TargetType.Server;
         bUsesSteam = true;
      }

       //
       // TargetRules interface.
       //

       public override bool GetSupportedPlatforms(ref List<UnrealTargetPlatform> OutPlatforms)
       {
            // It is valid for only server platforms
            return UnrealBuildTool.UnrealBuildTool.GetAllServerPlatforms(ref OutPlatforms, false);
       }

       public override void SetupBinaries
       (
          TargetInfo Target, ref List<UEBuildBinaryConfiguration> OutBuildBinaryConfigurations,
          ref List<string> OutExtraModuleNames
       )
       {
         OutExtraModuleNames.Add("ShooterGame");
       }
}

next you have to make 3 changes to the file

first find this line of code at the top

public class ShooterGameServerTarget : TargetRules

  
and change it so that it has your game name instead so in my case my game is called test so i would change the line of code to this

public class testServerTarget : TargetRules

  
next underneath it find this line of code and do the same as before and change the name to match your game

public ShooterGameServerTarget(TargetInfo Target)

  
so again in my case my game name is test so i would change this line of code to this

public testServerTarget(TargetInfo Target)

  
and finally find this line of code and do the same as before and change the name to match your game

OutExtraModuleNames.Add("ShooterGame");

  
so again in my case my game is called test so i would change this line of code to this

OutExtraModuleNames.Add("test");

  
Now just save the file with the same name and close it.

#### 2\. Target file instructions for engine version 4.15

// Copyright 1998-2017 Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;
using System.Collections.Generic;

\[SupportedPlatforms(UnrealPlatformClass.Server)\]
public class ShooterGameServerTarget : TargetRules      // Change this line of code as shown in the previous steps
{
 
    public ShooterGameServerTarget(TargetInfo Target)  // Change this line of code as shown in the previous steps

       {

     Type = TargetType.Server;

      bUsesSteam = false;

       }

        //
        // TargetRules interface.
        //
            public override void SetupBinaries
            (
             TargetInfo Target,
             ref List<UEBuildBinaryConfiguration> OutBuildBinaryConfigurations,
             ref List<string> OutExtraModuleNames
             )
               {
                OutExtraModuleNames.Add("ShooterGame");     // Change this line of code as shown in the previous steps
               }
  }

#### 3\. Target file instructions for engine version 4.16

// Copyright 1998-2017 Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;
using System.Collections.Generic;

\[SupportedPlatforms(UnrealPlatformClass.Server)\]
public class ShooterGameServerTarget : TargetRules    // Change this line of code as shown previously
{
	public ShooterGameServerTarget(TargetInfo Target) : base(Target) // Change this line of code as shown previously
       {
              Type = TargetType.Server;
              ExtraModuleNames.Add("ShooterGame");   // Change this line of code as shown previously
       }
}

#### 4\. Target file instructions for engine version 4.17

// Copyright 1998-2017 Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;
using System.Collections.Generic;

\[SupportedPlatforms(UnrealPlatformClass.Server)\]
public class ShooterGameServerTarget : TargetRules   // Change this line as shown previously
{
       public ShooterGameServerTarget(TargetInfo Target) : base(Target)  // Change this line as shown previously
       {
        Type = TargetType.Server;
        ExtraModuleNames.Add("ShooterGame");    // Change this line as shown previously
       }
}

#### 5\. Target file instructions for engine version 4.18

// Copyright 1998-2017 Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;
using System.Collections.Generic;

\[SupportedPlatforms(UnrealPlatformClass.Server)\]
public class ShooterGameServerTarget : TargetRules   // Change this line as shown previously
{
       public ShooterGameServerTarget(TargetInfo Target) : base(Target)  // Change this line as shown previously
       {
        Type = TargetType.Server;
        ExtraModuleNames.Add("ShooterGame");    // Change this line as shown previously
       }
}

### 4\. Switch Unreal engine versions & generate project files

next inside the project folder right click the uproject file and when the menu pops up select "switch unreal engine versions"

if when you right click on a uproject file you dont get a menu that looks like this

[![Build server.png](https://d26ilriwvtzlb.cloudfront.net/9/99/Build_server.png)](/index.php?title=File:Build_server.png)

then follow this step below from the read me file.

_One last thing. You’ll want to setup your Windows shell so that you can interact with .uproject files. Find the file named UnrealVersionSelector-Win64-Shippping.exe in the UnrealEngine/Engine/Binaries/Win64/ folder and run it. Now, you’ll be able to double-click .uproject files to load the project, or right click them to quickly update Visual Studio files._

This should now allow you to right click on the uproject file to bring up the menu.

when you click switch engine versions make sure that your source build version of the engine is selected in the drop down box and click ok.

[![Selectsource.png](https://d26ilriwvtzlb.cloudfront.net/a/a4/Selectsource.png)](/index.php?title=File:Selectsource.png)

this should automatically regenerate the visual studio solution project files . if it does not then it means your files are already up to date but just to be safe you can right click the uproject file again and click "generate visual studio project files"

### 5\. Building the server

next open up the visual studio project solution and allow it to fully load until it says ready.

[![Testsolution.png](https://d26ilriwvtzlb.cloudfront.net/c/c8/Testsolution.png)](/index.php?title=File:Testsolution.png)

go up to the drop down box and in the menu this time select DEVELOPMENT EDITOR

  
[![Developmenteditor.png](https://d26ilriwvtzlb.cloudfront.net/a/a8/Developmenteditor.png)](/index.php?title=File:Developmenteditor.png)

then same as before go to the solution explorer and right click and click build

  
[![Buildserver.png](https://d26ilriwvtzlb.cloudfront.net/6/6e/Buildserver.png)](/index.php?title=File:Buildserver.png)

again depending on youre computer this can take a long time to complete.

  
once this is done go back to the menu and in the drop down box this time select DEVELOPMENT SERVER

[![Development server.png](https://d26ilriwvtzlb.cloudfront.net/0/0a/Development_server.png)](/index.php?title=File:Development_server.png)

then same as before go to the solution explorer and right click and click build

  
[![Buildserver.png](https://d26ilriwvtzlb.cloudfront.net/6/6e/Buildserver.png)](/index.php?title=File:Buildserver.png)

again depending on your computer this can take a long time to complete.

once the server is built if you go into your project folder again then click binaries, win64 and you should have the server files in there like this

[![Serverfiles.png](https://d26ilriwvtzlb.cloudfront.net/7/70/Serverfiles.png)](/index.php?title=File:Serverfiles.png)

### 6\. Fixing the lighting swarm error

With source built unreal when you go to build the lighting it is common for the following error to occur and it took me forever to find the solution so i am including it here to save you guys the headache.

  
[![Swarm errorr.png](https://d26ilriwvtzlb.cloudfront.net/b/b9/Swarm_errorr.png)](/index.php?title=File:Swarm_errorr.png)

so what you do is in your solution explorer in visual studio scroll down until you see "unreal lightmass"

[![Lightmass.png](https://d26ilriwvtzlb.cloudfront.net/f/f7/Lightmass.png)](/index.php?title=File:Lightmass.png)

and again like before right click it and click build.

when it has finished close visual studio and now the swarm bug error should be fixed.

### 6.a Video Guide

[https://www.youtube.com/watch?v=lkrFFNfjtS0&feature=youtu.be](https://www.youtube.com/watch?v=lkrFFNfjtS0&feature=youtu.be)

### 7\. Prepare the project for packaging

now open up your project again by clicking on the uproject file.

ok so the first thing we need to do is under the content folder is add two new folders . one called maps, the other blueprints.

[![Folder structure.png](https://d26ilriwvtzlb.cloudfront.net/1/10/Folder_structure.png)](/index.php?title=File:Folder_structure.png)

then we need to go down to where the third person example map is stored and move it into your newly created map folder like so.

  
[![Maps.png](https://d26ilriwvtzlb.cloudfront.net/6/6c/Maps.png)](/index.php?title=File:Maps.png)

rename this to test level or whatever you like. this will be the level that the player loads into the server on and plays the game .

as of engine versions 4.14+ whenever you make a new map you must open the map and then click on build so that it generates the correct mapBuildDataRegistry Files for it. once this is done then click save all.

now we need to create 2 more additional maps. so go up to file, then new level and select the empty map level. name this first level entry map, and the second level transition map. like so

  

[![Mapfiles.png](https://d26ilriwvtzlb.cloudfront.net/d/dd/Mapfiles.png)](/index.php?title=File:Mapfiles.png)

again dont forget to build each time on the new map to make sure the data is saved correctly.

  
open up the entry level map and go up to blueprints and open the level blueprint

  
[![Openlevel.png](https://d26ilriwvtzlb.cloudfront.net/4/44/Openlevel.png)](/index.php?title=File:Openlevel.png)

in this blueprint drag off from begin play and find the open level node. in the level name set the parameter to 127.0.0.1 this is your local ip address.

  
[![Ip.png](https://d26ilriwvtzlb.cloudfront.net/4/47/Ip.png)](/index.php?title=File:Ip.png)

compile and save and close the blueprint.

finally open up the test level map and just click on the default character that is in the map and just delete him otherwise when you join the server you will end up with duplicated characters.

[![Testlevel.png](https://d26ilriwvtzlb.cloudfront.net/1/1b/Testlevel.png)](/index.php?title=File:Testlevel.png)

  
now we need to set the project settings up

so open up the project settings and then go to maps and modes.

set the editor startup map to entry

set the game default map to entry

set the transition map to transition

set the server default map to test level

like so

[![Mapsetup.png](https://d26ilriwvtzlb.cloudfront.net/8/80/Mapsetup.png)](/index.php?title=File:Mapsetup.png)

### 8\. setup packaging settings

go to file, packaging, packaging settings

[![PackagingSettings.png](https://d26ilriwvtzlb.cloudfront.net/6/6a/PackagingSettings.png)](/index.php?title=File:PackagingSettings.png)

in the packaging settings scroll down till you find the section list of maps to include in a packaged build . click on the + sign to add 3 elements to the array. one for each map you have in the project. then browse to your map folder and add each of your 3 maps to the array like so

  
[![Addmaps.png](https://d26ilriwvtzlb.cloudfront.net/1/13/Addmaps.png)](/index.php?title=File:Addmaps.png)

now close the settings and package the project.

  
[![Packageproject.png](https://d26ilriwvtzlb.cloudfront.net/5/5c/Packageproject.png)](/index.php?title=File:Packageproject.png)

### 9\. Congratulations you have now packaged your project yay :-p

Section 3 launching and joining the dedicated server
----------------------------------------------------

### 1\. copy the server executable

go to your project folder, then binaries, win 64, and find the file called "yourProjectNameServer.exe" and right click it and copy it.

[![Copyproject.png](https://d26ilriwvtzlb.cloudfront.net/d/dc/Copyproject.png)](/index.php?title=File:Copyproject.png)

next go to your packaged game location. then WindowsNoEditor, then the name of your project, binaries, win64, and paste in the server.exe like so.

[![Projectbinaries.png](https://d26ilriwvtzlb.cloudfront.net/e/eb/Projectbinaries.png)](/index.php?title=File:Projectbinaries.png)

### 2\. create the server shortcut and setup log options

now take the server file and create a shortcut to it. then rename it to match whatever you called your map inside the project . in my case i called it test level so my shortcut will look like this

  
[![Shortcut.png](https://d26ilriwvtzlb.cloudfront.net/8/89/Shortcut.png)](/index.php?title=File:Shortcut.png)

now right click this shortcut and go to properties

  
[![Properties.png](https://d26ilriwvtzlb.cloudfront.net/4/44/Properties.png)](/index.php?title=File:Properties.png)

at the end of the target path simply add -log like so

[![Targetpath.png](https://d26ilriwvtzlb.cloudfront.net/d/d0/Targetpath.png)](/index.php?title=File:Targetpath.png)

and click ok

  

### 3\. Launch and test the server

Now we are ready to launch the dedicated server and test level.

double click the server shortcut you just modified

if all goes well you should see a command window open and the server will launch itself

[![Serverlog.png](https://d26ilriwvtzlb.cloudfront.net/8/83/Serverlog.png)](/index.php?title=File:Serverlog.png)

here you can see the ip address of the computer hosting the server, you can see the server is listening on port 7777 which is the default unreal port, and it has loaded up the test level map as we set out in our project.

  
Your server is now running all that's left now is to click the project.exe to join the server.

  
in the logs if all is well you will see that a client requested to join the server and then at the bottom you should see join succeeded: 256

this means the player has successfully joined the dedicated server.

[![Joinsuccess.png](https://d26ilriwvtzlb.cloudfront.net/0/05/Joinsuccess.png)](/index.php?title=File:Joinsuccess.png)

if you were to launch another game exe you would now see another login success and the number would now be :257

like so

[![257.png](https://d26ilriwvtzlb.cloudfront.net/6/60/257.png)](/index.php?title=File:257.png)

  

congratulations you are now hosting a dedicated server on your own computer and have two players joined that can run around and see each other

[![Yay.png](https://d26ilriwvtzlb.cloudfront.net/6/6e/Yay.png)](/index.php?title=File:Yay.png)

  
to properly close down the server in the command window press ctrl c. alternatively you can press the x on the log window or failing that you can ctr alt delete and kill any unreal processes that are running. but the best method is to use ctrl c

Section 4 notes
---------------

### 1\. allowing friends to join over internet

if you want to allow friends to join your games etc then simply go back to your project and on the entry level, open the level blueprint and instead of using your local ip address, input your real public ip address.

[![Ip.png](https://d26ilriwvtzlb.cloudfront.net/4/47/Ip.png)](/index.php?title=File:Ip.png)

to find this simply type in to google "what is my ip" . or use an ip address finding program etc.

also remember that when you make changes in the game you need to repackage the game . so once you change the ip address to your real public ip make sure to repackage the game before you send it to your friends.

also you might need to rebuild the server binaries in visual studio.

once package is complete then zip up the whole windows no editor game folder and send it to youre friends.

start the server your end , then get the friends to open the game executable and join your game.

if your friends are unable to join your game it will be because you do not have the ports forwarded and setup properly on your router, and you may need to set up a static ip address.

  

### 2\. Hosting on a virtual server

log into your virtual server, open up the internet and download the game package. unzip it and then launch the server shortcut as normal.

### 3\. Creating additional maps and joining different maps

### 4\. Enabling Physics

Not sure if this is still relevant in engine 4.14+ but ive left it here just in case. from original wiki authors.

As of 4.4.3, if you’re replicating actors whose movement depends on simulated physics, you’ll need to set their **SkeletalMeshComponent.bEnablePhysicsOnDedicatedServer** property to true. The standalone dedicated servers return true to **IsRunningDedicatedServer()**, which results in prevention of physics simulations for SkeletalMeshComponents that do not explicitly set the bEnablePhysicsOnDedicatedServer property. Thanks to user **HateDread** for pointing this out for me.

Details:

[https://answers.unrealengine.com/questions/97074/vehicle-template-issues-with-standalone-dedicated.html#answer-101321](https://answers.unrealengine.com/questions/97074/vehicle-template-issues-with-standalone-dedicated.html#answer-101321)

Commit that fixes this:

[https://github.com/EpicGames/UnrealEngine/commit/9860acf7b10c7187cc9287342e43c73b0083791f](https://github.com/EpicGames/UnrealEngine/commit/9860acf7b10c7187cc9287342e43c73b0083791f)

Section 5
---------

### 1\. Im too lazy for all this just give me the files

i will provide the test project files soon i ran out of time

section 6 Contact the author
----------------------------

### 1.

if you need help you can find me on unreal forums - [https://forums.unrealengine.com/member.php?42414-EniGmaa](https://forums.unrealengine.com/member.php?42414-EniGmaa)

Or on unreal slackers discord [http://unrealslackers.org/](http://unrealslackers.org/)

Username is PrintStringFTW#6597

thankyou

section 7 Building and deploying a UE4 dedicated server for Linux
-----------------------------------------------------------------

Original blog post: [http://blog.piinecone.com/post/98470361272/building-and-deploying-a-ue4-dedicated-server-for-linux](http://blog.piinecone.com/post/98470361272/building-and-deploying-a-ue4-dedicated-server-for-linux)

In a prior post I covered the basics of building a standalone dedicated server executable for Windows from a UE4 game. This post will cover packaging, building, and deploying a Linux binary.

### 1\. Configure Visual Studio for Linux cross compilation

Epic have provided a prebuilt cross compilation toolchain for building Linux binaries from Windows. Follow the installation guide on the wiki: [https://wiki.unrealengine.com/Compiling\_For\_Linux](https://wiki.unrealengine.com/Compiling_For_Linux).

Once you have the toolchain installed, verify that you have a LINUX\_ROOT env var pointing to it. You can check this in git bash with the following command:

_\`env | grep LINUX\_ROOT \`_

### 2\. Package your project to a distinct location

Thanks to Osman for pointing this out to me. In order to compress everything you’ll need to deploy and run a standalone binary, you should package your project somewhere outside of your project’s working directory. The resulting file structure will contain the essentials.

Open the editor and package your project for Linux. Choose a distinct destination for the build (eg, ~/Desktop/MyGameLinux/). Once this completes, you should see a client build for Linux in the destination you chose.

### 3\. Build a dedicated server binary for Linux

Open your project solution in Visual Studio, select the Development Server configuration (or whichever server configuration you’d like to use) and build for Linux. Make sure you’ve followed the previous guide and that your Server target is correctly setup. When the build completes, you’ll have a new server binary in your project’s working directory (../MyGame/Binaries/Win64/MyGameServer).

Copy the Linux Server binary to the packaged project directory we created in step 2. You should put it next to the client binary. So when you look in:

_~/Desktop/MyGameLinux/LinuxNoEditor/MyGame/Binaries/Linux_

You should see:

_MyGame_

_MyGameServer_

### 4\. Deploy your binary to a remote machine

You’ll need a Linux machine to deploy and run your server. I’m using a Google Compute VM for testing, but EC2 or any other cloud provider should suffice for now. I haven’t done any research or benchmarking to determine which provider, OS, and machine type is ideal for running UE4 dedicated servers.

Using git bash, create a gzipped tar of your packaged directory (I foolishly forgot to remove the client binary before doing this; you should remove it as you won’t be running it remotely):

_tar -cvzf mygame-linux-server.tar.gz ~/Desktop/MyGameLinux/_

Copy the resulting archive to your remote Linux machine:

_scp mygame-linux-server.tar.gz piinecone@123.456.78.91_

This will copy the tar into the home directory of the machine at the supplied IP address. Replace my nonsense numbers with the external IP of your remote machine. Note that you may have to append

_\-i ~/.ssh/<name of your private key>_

to perform the secure copy, depending on your ssh configuration.

### 5\. Connect to your server and run the dedicated server binary

SSH into your machine:

_ssh piinecone@123.456.78.91_

You may need to append \`-i ~/.ssh/<your private key>\` again here.

Once connected, you’ll be in your home directory. \`ls\` and you should see your gzipped tarball. Unpack it:

_tar -xzf mygame-linux-server.tar.gz_

\`cd\` to your binary location:

_cd MyGameLinux/LinuxNoEditor/MyGame/Binaries/Linux_

Make your server binary executable:

_chmod +x MyGameServer_

Run it!

_./MyGameServer -log_

Okay, now kill it with Ctrl+C because we have to open up allow connections on UDP:7777.

Also, if you see this error:

**Could not adjust number of file handles**

Add this line to /etc/security/limits.conf:

_user - nofile 10000_

And for Debian and Ubuntu, add this line to /etc/pam.d/common-session:

_session required pam\_limits.so_

After rebooting your machine you should be able to run the server executable.

### 6\. Open UDP:7777

Most cloud VMs default to fairly tight security so you’ll probably have to manually open port 7777 (the UE4 server’s default port) to accept UDP connections. I’m not going to cover the specifics of this because it can vary by machine and provider. For a Google Compute VM you can just create a forwarding rule with the CLI. Other machines will require that you modify the iptables.

Once you’ve opened UDP 7777, you can verify the connection is working with netcat. On the remote machine:

_nc -luv 777_

On your machine:

_nc -vu server.ip.add.ress 7777_

Enter text on either console and it should appear in the other.

### 7\. Play your game on your server

This is, after all, the whole point. Build a client executable (or just use the one you built in step 2). Run it, open the console (with “~”), and type: open my.server.ip.address:7777

You should see a join in your server log, and your client pawn should spawn into whichever map the server is currently running.

### 8\. Issues

At some point of time (around Unreal Engine 4.4.x), Linux servers required glibc 2.14+, which made it unable to run on Debian-stable (back then Debian 7 'wheezy'). This was a temporary issue not experienced in previous versions, and it was fixed in later ones. Cross-toolchain provided with the Unreal Engine targets glibc 2.12.2, which is old enough to run on most contemporary distros, including Debian-stable and even CentOS 6.x without hassle.

  

8\. Dedicated Server on Steam
-----------------------------

Now on it's own page: [https://wiki.unrealengine.com/Dedicated\_Server\_Guide\_Steam](https://wiki.unrealengine.com/Dedicated_Server_Guide_Steam)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Dedicated\_Server\_Guide\_(Windows\_%26\_Linux)&oldid=19](https://wiki.unrealengine.com/index.php?title=Dedicated_Server_Guide_(Windows_%26_Linux)&oldid=19)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")