How To Send Game Logs To Custom Files & Log Without Console Window - Epic Wiki                    

How To Send Game Logs To Custom Files & Log Without Console Window
==================================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Log to any custom file](#Log_to_any_custom_file)
*   [3 Logging Silently, No Console Window](#Logging_Silently.2C_No_Console_Window)
*   [4 Losing Valuable Log Data](#Losing_Valuable_Log_Data)
*   [5 Conclusion](#Conclusion)

Overview
--------

**Author:** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

In this wiki I explain how you can write to custom logs and also write silently without having the console log open itself when the game starts!

Log to any custom file
----------------------

To log to any custom file name that will appear in Saved/Logs, simply add this to your commandline when launching the game:

 -log LOG=MyGameLog.txt

This will still open the console window, but will write to the file of your choosing, overwriting any previous contents.

The great part about this is if you routinely test multiplayer, you can easily delineate the logs of different clients in a way that makes sense to you, using different commandlines for each instance.

 -log LOG=Client1.txt

 -log LOG=Client2.txt

 -log LOG="Server.txt"

Logging Silently, No Console Window
-----------------------------------

If you want to log but dont want to distract your user with the console log popping up all the time, you can add this switch:

 -silent

so now you have:

 -silent LOG=MyGameLog.txt

You dont have to include -log in this case.

In fact omitting -log and just using LOG= seems to work the same as -silent as far as I can tell.

It is -log that causes the console window to open.

Losing Valuable Log Data
------------------------

Please note that when you specify the name, it will overwrite previous log files, so if the user generates important log info but then plays again before telling you what happened, the log that occurred during the crash will be lost already.

To avoid this you can use -silent without specifying a name

 -silent

This also appears to be the default behavior if you do not include any logging specifications on the commandline.

So the best use of specific log naming is for your own iterative testing where you expect to only want the latest logs :)

Conclusion
----------

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_To\_Send\_Game\_Logs\_To\_Custom\_Files\_%26\_Log\_Without\_Console\_Window&oldid=21808](https://wiki.unrealengine.com/index.php?title=How_To_Send_Game_Logs_To_Custom_Files_%26_Log_Without_Console_Window&oldid=21808)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)