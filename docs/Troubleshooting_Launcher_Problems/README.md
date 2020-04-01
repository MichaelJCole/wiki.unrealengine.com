Troubleshooting Launcher Problems - Epic Wiki                    

Troubleshooting Launcher Problems
=================================

Contents
--------

*   [1 Troubleshooting Launcher Problems](#Troubleshooting_Launcher_Problems)
    *   [1.1 Launcher Recommended Specs](#Launcher_Recommended_Specs)
    *   [1.2 I am unable to login to the Launcher with my account](#I_am_unable_to_login_to_the_Launcher_with_my_account)
    *   [1.3 I am unable to install the Launcher for Windows](#I_am_unable_to_install_the_Launcher_for_Windows)
    *   [1.4 The Launcher hangs at "Please Wait" when I try to run it.](#The_Launcher_hangs_at_.22Please_Wait.22_when_I_try_to_run_it.)
    *   [1.5 The Launcher fails to load or crashes on load](#The_Launcher_fails_to_load_or_crashes_on_load)
    *   [1.6 The Launcher is unable to download content](#The_Launcher_is_unable_to_download_content)
    *   [1.7 None of the Above Helped - Getting Debug Logs](#None_of_the_Above_Helped_-_Getting_Debug_Logs)
    *   [1.8 Tips and Tricks](#Tips_and_Tricks)

Troubleshooting Launcher Problems
---------------------------------

The Unreal Engine Launcher is used to download and launch binary versions of the Unreal Engine 4 (as opposed to the engine source code from GitHub), as well as serve as a location to download additional content and view news and blog posts.

If you are experiencing a problem with the Launcher, please read over the troubleshooting guide to see if there is an existing solution for your issue. If you cannot find a solution, please visit [http://help.epicgames.com/](http://help.epicgames.com/) and use the Email Us button located under the Contact Us section, and ensure to provide as much information as possible regarding the problem that you are running into.

### Launcher Recommended Specs

OS: A x64-bit version of Windows 7, 8, 8.1, 10, or Mac OS X 10.9.2 or later.

Hard Drive Space: ~1GB recommended for installing only the launcher. More hard drive space is required if you wish to download and install games, editors and projects, or content from the Marketplace.

Graphics Card: Any DX11, DX12 compatible card

Processor: Quad-Core Intel or AMD processor

### I am unable to login to the Launcher with my account

It is possible you are logging in with your account on multiple machines. The maximum limit of active machines under your account is 5. It may even be reduced to 1 if you log in with your account after many tries.

Note that your access to the Unreal Engine forums also counts towards the number of active machines.

### I am unable to install the Launcher for Windows

If you are unable to download and start the installer try some of the steps listed here:

*   Make sure you are running as an Administrator on your computer.
*   Make sure you have read/write access to the selected install path.
*   Make sure your computer is up to date and has the latest Service Packs and drivers.

If none of the recommendations solved your issue you will need to get installer logs. To get installer logs follow these steps:

*   Place the msi on the root of C drive
*   Press WindowsKey+R and enter:
*   msiexec /i C:\\EpicGamesLauncherInstaller.msi /L\*V C:\\EpicGamesInstallerLog.txt (Make sure to use the exact name of the installer msi file in place of the "EpicGamesLauncherInstaller.msi")

Once you get the logs, please make a report on AnswerHub and attach them to your post.

### The Launcher hangs at "Please Wait" when I try to run it.

If you receive this notice when signing in try these steps listed here:

*   Make sure you are not behind a proxy (You can check to see if you are [here](http://amibehindaproxy.com/)) and do not have epicgames.com filtered. If you are behind a proxy, add a wildcard exception for **\*.epicgames.com** (or ask your IT department to do so). If your IT department would rather directly whitelist subdomains, there is a list at the bottom of this section.
*   You'll also need to ensure that ports **80**(http), **443**(https), and **5222** are unblocked.
*   Try switching your DNS Server (OpenDNS or GoogleDNS)

List of Subdomains

unrealengine.com  
unrealtournament.com  
fortnite.com  
  
account-public-service-prod03.ol.epicgames.com  
catalog-public-service-prod06.ol.epicgames.com  
eulatracking-public-service-prod06.ol.epicgames.com  
entitlement-public-service-prod08.ol.epicgames.com  
orderprocessor-public-service-ecomprod01.ol.epicgames.com  
friends-public-service-prod06.ol.epicgames.com  
persona-public-service-prod06.ol.epicgames.com  
lightswitch-public-service-prod06.ol.epicgames.com  
ut-public-service-prod10.ol.epicgames.com  
launcher-public-service-prod06.ol.epicgames.com  
xmpp-service-prod.ol.epicgames.com  
[https://download.epicgames.com](https://download.epicgames.com)  
[https://cdn1.epicgames.com](https://cdn1.epicgames.com)  
[http://et2.epicgames.com](http://et2.epicgames.com)  
[https://launcher-website-prod07.ol.epicgames.com](https://launcher-website-prod07.ol.epicgames.com)  

### The Launcher fails to load or crashes on load

If nothing appears to happen when attempting to open or load the launcher, try these steps:

*   Make sure the launcher is not already open.
*   Check Task Manager to see if the launcher process did not close from the last session.
*   Make sure graphics drivers are updated to the latest version.

### The Launcher is unable to download content

If you’re having trouble downloading or seeing content try these steps:

*   Close and restart the launcher and/or your computer, please try waiting a few minutes before restarting. (this is the most common solution!)
*   Make sure you are not behind a proxy (you can check to see if you are [here](http://amibehindaproxy.com)) and do not have epicgames.com and it’s subdomains filtered. If you are behind a proxy, add an exception for epicgames.com and it’s subdomains (or ask your IT department to do so).
*   Make sure if you are behind a firewall that exceptions are made for epicgames.com and it’s subdomains (or ask your IT department to do so).
*   Try switching your DNS Server ([OpenDNS](https://www.opendns.com) or [GoogleDNS](https://developers.google.com/speed/public-dns))
*   If Marketplace content is stuck at syncing please let us know on the marketplace forums.

### None of the Above Helped - Getting Debug Logs

If none of the above helped in solving your issue or you are experiencing an issue not mentioned here, please take a look at the UE4 AnswerHub and see if someone else has already reported it. If not, you can make a new post but be sure to attach your DxDiag and Debug Logs!

**Getting your DxDiag:**

_For Windows:_

*   Select the Start button and in the search field type “cmd”.
*   Once the command prompt is opened, type “dxdiag” and hit enter.
*   The directX diagnostic tool window should come up and have a progress bar going in the bottom left corner.
*   Once finished click the “Save All Information” button.
*   Save the text file to your desktop or somewhere you’ll be able to easily access it

_For Mac:_

*   Go and click on the Apple Menu
*   Select “About This Mac” option
*   Copy the information including the OS and OS version.

From there just attach the DxDiag or include your Mac System information when you post your AnswerHub issue!

**Getting Debug Logs:**

_From Inside the Launcher:_

*   In the top-right of the Launcher, click the Gear icon.
*   Select 'Enable debug logging' and then choose 'Enable Now'. If you issue occurs at launch or sign in, Select 'Enable debug logging' and then choose 'Restart'
*   Reproduce the issue you’re experiencing while the debug logging is on.
*   After reproducing your issue go back to the Gear icon and select 'show launcher log'
*   Place all of the logs in this folder into a zip file and attach it to your AnswerHub report.
*   Back in the Launcher, select the Settings icon again and select 'Disable debug logging' or close your launcher.

If you are unable to log in to turn on the debug logging, you can try using this command line to get debug logs as well.

_From Outside of the Launcher:_

*   Right-Click on the Epic Games Launcher desktop shortcut
*   Select Properties and go to the "Shortcut" tab
*   Add " -debuglogging" to the end of the file path in the target field
*   Don't add the quotes and make sure there is a space between the file path and the dash. It should look something like this:

[![DebugLoggingCommand.JPG](https://d26ilriwvtzlb.cloudfront.net/6/60/DebugLoggingCommand.JPG)](/File:DebugLoggingCommand.JPG)

*   After you have obtained the debug logs, remove the command from the target field

_Finding and zipping the logs folder:_

You can find the logs here:

WIN: "C:\\Users\\"Username"\\AppData\\Local\\EpicGamesLauncher\\Saved\\Logs"

MAC: "~/Library/Logs/Unreal Engine/EpicGamesLauncher/"

It’s best to go ahead and zip up the entire logs folder and attach it to you answerhub issue.

### Tips and Tricks

**How to create a Symbolic Link**

**Windows:**

If you have disk space issues, Windows NTFS has symbolic link capabilities. For redirecting directories use "mklink /D link target".

Two common issues are the 30GB+ of example content available currently and the duplicate copy of engine made when upgrading a release (4.7 is sitting at 16GB+ w/o DerivedDataCache).

In a Command Prompt opened with Administrator privileges. \[ Windows 8.1, right click absolute lower left, click "Command Prompt(Admin)" \]

*   cd "\\Program Files\\Epic Games\\Launcher"
*   explorer . (that's a space followed by a period, will open Windows Explorer in current location)
*   (User GUI to move PatchStaging and VaultCache to new location, Launcher should not be running... for example sake, root of E: drive)
*   mklink /d VaultCache E:\\VaultCache
*   mklink /d PatchStaging E:\\PatchStaging

You should see something like:

Directory of C:\\Program Files\\Epic Games\\Launcher    
02/02/2015  07:24 PM    <DIR>          Backup
12/11/2014  01:19 AM    <DIR>          Engine
02/12/2015  07:28 PM    <SYMLINKD>     PatchStaging \[E:\\PatchStaging\]
01/07/2015  02:31 AM    <SYMLINKD>     VaultCache \[E:\\VaultCache\]

Note the D at end of SYMLINKD.

You can also use "mklink" to move individual engine directories or Unreal Projects directory. Or your Android SDK install directory,...

By the way, your "Documents" folder is itself special, if you right click it, select Properties, there is a Location tab where you can re-base it. On that note, some directories are special to Windows and should not be messed with.

**MAC:**

You can move the install location on a Mac to an external drive by using a Symbolic Link (SymLink). This method requires moving the /Users/Shared/UnrealEngine folder to the external drive and creating a symbolic link to the new location in the old folder. To set this up on the mac, these are the steps to take:

*   Backup the UnrealEngine folder found in /Users/Shared
*   Move the UnrealEngine folder to the drive the engine is to be installed to. This can be done with the following terminal command (without the quotation marks): “Sudo mv /Users/Shared/UnrealEngine /Destination/Location/” (Note: there is a space between the path of the folder that is being moved and the destination it is being moved to)
*   Enter the admin password when prompted
*   Create a symlink in the older UnrealEngine folder location and point it at the new UnrealEngine location: "ln -s /Destination/Location/ /Users/Shared/UnrealEngine"

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Troubleshooting\_Launcher\_Problems&oldid=23786](https://wiki.unrealengine.com/index.php?title=Troubleshooting_Launcher_Problems&oldid=23786)"

[Category](/Special:Categories "Special:Categories"):

*   [Troubleshooting](/Category:Troubleshooting "Category:Troubleshooting")

  ![](https://tracking.unrealengine.com/track.png)