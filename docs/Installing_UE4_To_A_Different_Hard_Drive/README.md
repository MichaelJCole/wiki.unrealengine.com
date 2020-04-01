Installing UE4 To A Different Hard Drive - Epic Wiki                    

Installing UE4 To A Different Hard Drive
========================================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (3 votes)

Approved for Versions:ALL

  
_**NOTE: THIS GUIDE IS FOR WINDOWS.**_ - But with slight variations applies to linux and mac machines as well.

Overview
--------

This is a simple guide for people who would like to move Unreal Engine 4 to a different directory (After installing it before). For example, if you were to install Unreal Engine 4 on C:/ and then later down the line you purchased another Hard Disk Drive and plug it into your PC. Now, you're running out of space on C:/ and want to move it to another directory.

Steps to move Unreal Engine to a Different HDD
----------------------------------------------

**BEFORE WE START. MAKE SURE THE LAUNCHER AND UNREAL ENGINE 4 EDITOR ARE NOT RUNNING.**

Sidenote: The directory where the unreal engine is installed may be different depending on your launcher/engine version. It may be under C:\\Program Files\\Epic Games\\VersionNumber or under C:\\Program Files\\Unreal\\VersionNumber.

1) Create the folder where you want to move Unreal Engine to. In this case "D:\\Unreal" is used

2) Cut all the directories under the folder where Unreal Engine is installed and paste them to your desired location.

3)Make a link for each directory you moved: For example, if your install location is "C:\\Program Files\\Epic Games\\" and you want to link a directory named 4.8 to "D:\\Unreal\\4.8", you would open a command prompt (Windows Key + R, then type "cmd" , then press Enter Key) and type:

`cd "C:\Program Files\Epic Games\"`

`mklink /j 4.8 D:\Unreal\4.8`

You also need to make a link for the other Engine versions as well as the Launcher and DirectXRedist folder.

**You have now successfully moved whole Unreal Engine to a different folder.**

P.S. The same concept applies to linux and mac machines. The link command is just different.

Video tutorial for Windows
--------------------------

Disclaimer: This is not an EPIC GAMES tutorial. [https://www.youtube.com/watch?v=mUDqz17aaJY](https://www.youtube.com/watch?v=mUDqz17aaJY)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Installing\_UE4\_To\_A\_Different\_Hard\_Drive&oldid=17473](https://wiki.unrealengine.com/index.php?title=Installing_UE4_To_A_Different_Hard_Drive&oldid=17473)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")
*   [Community](/index.php?title=Category:Community&action=edit&redlink=1 "Category:Community (page does not exist)")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)