How To Package Extra NonUASSET Files With Your Game - Epic Wiki                    

How To Package Extra NonUASSET Files With Your Game
===================================================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 UFS Files (.pak)](#UFS_Files_.28.pak.29)
    *   [1.2 Custom IO system files](#Custom_IO_system_files)
*   [2 Project Settings](#Project_Settings)
*   [3 Search for Additional](#Search_for_Additional)
*   [4 Add!](#Add.21)
*   [5 How To Access Content Folder In Packaged Game](#How_To_Access_Content_Folder_In_Packaged_Game)
*   [6 Celebrate!](#Celebrate.21)

Overview
--------

**Author:** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

In this wiki I give you a pictorial guide of how to add extra files to your packaged game that are not .uassets.

Please note there are two types, and the tooltips explain them thoroughly :)

### UFS Files (.pak)

There are files which you expect UE4 to load via the Unreal File System, which will be put in the .pak file.

### Custom IO system files

And there are also files which you plan to load via your own methods in packaged game, which will be included but not added to the .pak file so your own IO system can still find them and load them.

♥

Rama

Project Settings
----------------

[![NonUassetPackaging1.jpg](https://d26ilriwvtzlb.cloudfront.net/0/08/NonUassetPackaging1.jpg)](/File:NonUassetPackaging1.jpg)

Search for Additional
---------------------

[![NonUassetPackaging2.jpg](https://d26ilriwvtzlb.cloudfront.net/c/ca/NonUassetPackaging2.jpg)](/File:NonUassetPackaging2.jpg)

Add!
----

[![NonUassetPackaging3.jpg](https://d26ilriwvtzlb.cloudfront.net/d/d9/NonUassetPackaging3.jpg)](/File:NonUassetPackaging3.jpg)

How To Access Content Folder In Packaged Game
---------------------------------------------

To find the Content folder of packaged game, you can use this code, I have a whole wiki on [Paths in Packaged Games](https://wiki.unrealengine.com/Packaged_Game_Paths,_Obtain_Directories_Based_on_Executable_Location)

//InstallDir/WindowsNoEditor/GameName/Content
const FString ThePath \= FPaths::ConvertRelativePathToFull(FPaths::GameContentDir());

Celebrate!
----------

♥

Rama

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_To\_Package\_Extra\_NonUASSET\_Files\_With\_Your\_Game&oldid=21408](https://wiki.unrealengine.com/index.php?title=How_To_Package_Extra_NonUASSET_Files_With_Your_Game&oldid=21408)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)