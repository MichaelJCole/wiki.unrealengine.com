How To Test Dedicated Server Games Via Commandline - Epic Wiki                    

How To Test Dedicated Server Games Via Commandline
==================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 .bat files](#.bat_files)
*   [3 UE4Editor.exe](#UE4Editor.exe)
*   [4 Step 1: Server Bat File](#Step_1:_Server_Bat_File)
*   [5 The Server IP Address](#The_Server_IP_Address)
*   [6 Step 2: Client Bat Files](#Step_2:_Client_Bat_Files)
*   [7 Step 3: All In One Bat File](#Step_3:_All_In_One_Bat_File)
*   [8 Player Starts](#Player_Starts)
*   [9 Conclusion](#Conclusion)

Overview
--------

**Author** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

In this wiki I show you how you can run a dedicated server game with 2 connecting clients from commandline! (editor closed or used for other purposes)

All the batch files listed below go in your main project directory where your .uproject is.

Steam is disabled via -nosteam because you can't run multiple network instances from the same steam account.

.bat files
----------

Just make a text file and rename it to .bat instead of .txt, make sure file extensions are visible in your operating system or it might be saving to .txt.bat :)

UE4Editor.exe
-------------

Make sure the UE4Editor path is accurate for your machine and is the correct version number.

Step 1: Server Bat File
-----------------------

VictoryCreateDedicatedServer.bat

 "C:\\Program Files\\Epic Games\\4.9\\Engine\\Binaries\\Win64\\UE4Editor.exe" "%CD%\\YourProject.uproject" MapName -server -log -nosteam

\-server is the main thing to note here :)

The Server IP Address
---------------------

When the Server instance loads you will notice in the log that it lists a WinSock IP address.

This is the IP address you use for client .bat files below!

[![DedicatedServerWinSockIP.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c4/DedicatedServerWinSockIP.jpg)](/File:DedicatedServerWinSockIP.jpg)

Step 2: Client Bat Files
------------------------

VictoryCreateClient1.bat

 TIMEOUT /T 6
 "C:\\Program Files\\Epic Games\\4.9\\Engine\\Binaries\\Win64\\UE4Editor.exe" "%CD%\\YourProject.uproject" 192.168.0.3 -game -ResX=800 -ResY=900 -WinX=0 -WinY=20 -log -nosteam

  
VictoryCreateClient2.bat

 TIMEOUT /T 6
 "C:\\Program Files\\Epic Games\\4.9\\Engine\\Binaries\\Win64\\UE4Editor.exe" "%CD%\\YourProject.uproject" 192.168.0.3 -game -ResX=800 -ResY=900 -WinX=800 -WinY=20 -log -nosteam

You can use shorter than 6 seconds if your dedicated loads fast :)

Step 3: All In One Bat File
---------------------------

 start VictoryCreateDedicatedServer
 start VictoryCreateClient1
 VictoryCreateClient2

The start command initiates new process so all three commands run simultaneously.

Then you just call this bat file to start the whole process each time!

Player Starts
-------------

Make sure to have enough player starts to support loading in all your clients at the same time, or else some players might not join or end up in the floor or something :)

Conclusion
----------

Now you can start Dedicated Server games with 2 clients from commandline with 1 click!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_To\_Test\_Dedicated\_Server\_Games\_Via\_Commandline&oldid=16083](https://wiki.unrealengine.com/index.php?title=How_To_Test_Dedicated_Server_Games_Via_Commandline&oldid=16083)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)