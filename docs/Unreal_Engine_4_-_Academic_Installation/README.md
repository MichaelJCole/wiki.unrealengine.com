Unreal Engine 4 - Academic Installation - Epic Wiki                    

Unreal Engine 4 - Academic Installation
=======================================

Contents
--------

*   [1 **Unreal Engine 4 - Academic Installation**](#Unreal_Engine_4_-_Academic_Installation)
    *   [1.1 **Introduction**](#Introduction)
    *   [1.2 **Installing UE4**](#Installing_UE4)
    *   [1.3 **Updating the Engine and Content**](#Updating_the_Engine_and_Content)
    *   [1.4 **Instructions for Students**](#Instructions_for_Students)

**Unreal Engine 4 - Academic Installation**
===========================================

_This document is valid with Launcher version 1.5.0 and above. Version information can be found in the lower left of the launcher on the main screen._

### **Introduction**

With the announcement of special licensing terms for Unreal Engine 4 for Academic Institutions, there have been a large number of universities, trade schools, and colleges who have begun offering this to their students and faculties. A common question that arises is how these institutions should properly distribute the Unreal Engine to their school computers without exposing the academic account used to access UE4.

Unfortunately, at this time, there is no simple, one-step, silent installer for UE4. The installer must be run manually on at least one machine. Schools can choose to mirror that machine or simply run the installer manually on all machines they wish to setup. In addition, because there are new releases for UE4 put out on a regular basis, institutions will need to update manually and push out all of their computers. Fortunately, some of this process can be automated and the purpose of this document is to assist in this deployment automation.

### **Installing UE4**

To install UE4, the following steps can be followed:

**Github Download**

1.  Follow the steps listed here to get the editor without the launcher:

a. [https://wiki.unrealengine.com/GitHub\_Setup](https://wiki.unrealengine.com/GitHub_Setup)

**Launcher Download**

It is important to note that the launcher will not launch behind a proxy server. If you are behind one, it would be best to utilize the github build of the engine. If you are still utilizing the launcher version, have your IT department open port 7777/7778, however this does not always allow the launcher to open/update.

1.  Download the latest installers here:

a. PC: [https://launcher-service-prod06.ol.epicgames.com/launcher/api/installer/download/UnrealEngineInstaller.msi](https://launcher-service-prod06.ol.epicgames.com/launcher/api/installer/download/UnrealEngineInstaller.msi)

b. Mac: [https://launcher-service-prod06.ol.epicgames.com/launcher/api/installer/download/UnrealEngine.dmg](https://launcher-service-prod06.ol.epicgames.com/launcher/api/installer/download/UnrealEngine.dmg)

3.  Run the installer on the machine you plan to make an image from.
4.  Once the installer is complete the launcher will auto run and you should log in with the credentials you used when you created an account for UE4. Please note that the account must have a valid, active subscription or otherwise have been activated by Epic’s customer service.
5.  The very latest version of the engine should download automatically, but if it does not, click on the Library sidebar option and download the engine versions you wish students to use. In general, we recommend the latest version always.

[![DefaultEditor.png](https://d3ar1piqh1oeli.cloudfront.net/f/fb/DefaultEditor.png/600px-DefaultEditor.png)](/File:DefaultEditor.png)

_Select the engine version you want to download and click the plus symbol._

8.  The Marketplace contains a number of examples that students and faculty can reference to learn UE4. The content is entirely optional, but we recommend downloading it. In order to do so, click on the Marketplace tab and select the content you want to download.

[![VehicleMarketPlace.png](https://d3ar1piqh1oeli.cloudfront.net/5/57/VehicleMarketPlace.png/600px-VehicleMarketPlace.png)](/File:VehicleMarketPlace.png)

_Click on “Free” to download Vehicle game_

[![DefaultMarketPlaceDetail2.png](https://d3ar1piqh1oeli.cloudfront.net/1/12/DefaultMarketPlaceDetail2.png/600px-DefaultMarketPlaceDetail2.png)](/File:DefaultMarketPlaceDetail2.png)

_Make sure you select the correct content version that will work with your engine version then click “Download”_

13.  The launcher will auto-create new projects form downloaded content in the library tab. As it may cause problems with users on shared machines all sharing the same projects, it is suggested to delete these auto-created projects.

[![DefaultDeleteMap.png](https://d3ar1piqh1oeli.cloudfront.net/c/cc/DefaultDeleteMap.png/600px-DefaultDeleteMap.png)](/File:DefaultDeleteMap.png)

_Choose Delete to remove projects auto created when first downloaded._

16.  Once all downloads are complete and auto-created projects are removed, you can now mirror this machine’s setup out to the rest of the computers for the class or save the image of this machine for distribution to you lab’s computers.

  

### **Updating the Engine and Content**

As new content is released, the following process can be used to update the mirror or push out the newest content to a machine that has an installation by copying the files (which is easily automated via a script).

1.  Engine Updates
    
    a. From a central machine open the launcher and navigate to the Library
    
    b. Click on the add Engine slot and select the engine version you wish to download.
    
    [![DefaultAddEngine.png](https://d3ar1piqh1oeli.cloudfront.net/c/c5/DefaultAddEngine.png/600px-DefaultAddEngine.png)](/File:DefaultAddEngine.png)
    
    c. Once the download is complete, the mirror is ready to be updated. Alternatively, continue with the steps below to copy the updates to all machines UE4 is installed on.
    
    d. Copy the following directories to each and every machine you wish to update; this will copy all content on the base machine
    
    i. C:\\Program Files (x86)\\Epic Games\\Launcher\\VaultCache
    
    ii. C:\\Program Files (x86)\\Epic Games\\<Engine Version> (e.g. C:\\Program Files (x86)\\Epic Games\\4.11 for the 4.11 version of the engine; you can automate the copy for all versions by using 4.\* for the wildcard)
    
    iii. C:\\ProgramData\\Epic\\EpicGamesLauncher\\Data\\Manifests
    
    1\. You should grab the most recent downloaded manifest assuming you have only downloaded the engine last (e.g. C:\\ProgramData\\Epic\\EpicGamesLauncher\\Data\\Manifests\\6CB2FA264A9C80D23D584586B525AE86.manifest)
    
    2\. You can verify by opening the manifest file in a text editor and search for “AppNameString”
    
    e. Once copied, the launcher will automatically detect the updated when a user next runs the launcher. This is true of both new engine versions and content downloaded from the marketplace.
    
2.  Turning Off Auto Updates  
    
    Sometimes it is necessary to turn off auto updates so they do not interrupt class sessions. The launcher is set up to automatically check for updates during launch. To prevent this from taking up class time, RMB the launcher.exe and at the end of the target line add in the command "-noselfupdate". This will prevent the launcher from automatically updating, though the school will need to update the launcher when possible.
    

### **Instructions for Students**

1.  Students can run the launcher and login in offline mode. With this setup in place students will be able access to the content previously downloaded.

[![Academic6.png](https://d3ar1piqh1oeli.cloudfront.net/d/d5/Academic6.png/600px-Academic6.png)](/File:Academic6.png)

3.  If computers or drives are wiped on a regular basis and returned to the base image, it is important that students save their work in a location that will not be wiped or cleared.

a. Students can create new projects from content in their vault on the Library tab.

b. When creating a new project from the Vault students should select a location on a drive or network location that will not be removed when a computer is re-imaged.

[![Academic7.png](https://d3ar1piqh1oeli.cloudfront.net/1/15/Academic7.png/600px-Academic7.png)](/File:Academic7.png)

_Select an install location for new projects to a drive or location that will not be wiped._

7.  Students can also download additional content but if these items are not saved off the mirrored drive they would be wiped when reimaged.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Unreal\_Engine\_4\_-\_Academic\_Installation&oldid=21441](https://wiki.unrealengine.com/index.php?title=Unreal_Engine_4_-_Academic_Installation&oldid=21441)"

  ![](https://tracking.unrealengine.com/track.png)