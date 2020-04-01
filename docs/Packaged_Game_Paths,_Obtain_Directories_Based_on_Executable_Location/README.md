Packaged Game Paths, Obtain Directories Based on Executable Location - Epic Wiki                    

Packaged Game Paths, Obtain Directories Based on Executable Location
====================================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 How It Works](#How_It_Works)
*   [3 InstallDir/WindowsNoEditor/GameName/Binaries/Win64](#InstallDir.2FWindowsNoEditor.2FGameName.2FBinaries.2FWin64)
*   [4 InstallDir/WindowsNoEditor/](#InstallDir.2FWindowsNoEditor.2F)
*   [5 InstallDir/WindowsNoEditor/GameName](#InstallDir.2FWindowsNoEditor.2FGameName)
*   [6 InstallDir/WindowsNoEditor/GameName](#InstallDir.2FWindowsNoEditor.2FGameName_2)
*   [7 InstallDir/WindowsNoEditor/GameName/Saved](#InstallDir.2FWindowsNoEditor.2FGameName.2FSaved)
*   [8 InstallDir/WindowsNoEditor/GameName/Saved/Logs](#InstallDir.2FWindowsNoEditor.2FGameName.2FSaved.2FLogs)
*   [9 Dynamic Relocation of Project](#Dynamic_Relocation_of_Project)
*   [10 Conclusion](#Conclusion)

Overview
--------

Dear Community,

**Here is how you get access to various parts of the directory structure of a Packaged game!**

You do not need to use ConverRelativePathToFull while testing WITH\_EDITOR builds, though it will still work correctly.

But it is essential to include in packaged builds!

**Below are the directories that get returned for each of several different UE4 C++ FPath:: functions!**

You can use pretty much any one of these to then create your own directory structure all inside of wherever your game's packaged binary is running from.

How It Works
------------

All the other paths are found by using the BaseDir, where the exe is running from.

This is determined at runtime, so if the entire project is moved, all the paths below will still work correctly!

InstallDir/WindowsNoEditor/GameName/Binaries/Win64
--------------------------------------------------

//InstallDir/WindowsNoEditor/GameName/Binaries/Win64
const FString ThePath \= FString(FPlatformProcess::BaseDir());

InstallDir/WindowsNoEditor/
---------------------------

//InstallDir/WindowsNoEditor/
const FString ThePath \= FPaths::ConvertRelativePathToFull(FPaths::RootDir());

InstallDir/WindowsNoEditor/GameName
-----------------------------------

//InstallDir/WindowsNoEditor/GameName
const FString ThePath \= FPaths::ConvertRelativePathToFull(FPaths::GameDir());

InstallDir/WindowsNoEditor/GameName
-----------------------------------

//InstallDir/WindowsNoEditor/GameName/
const FString ThePath \= FPaths::ConvertRelativePathToFull(FPaths::GameUserDir());

InstallDir/WindowsNoEditor/GameName/Saved
-----------------------------------------

//InstallDir/WindowsNoEditor/GameName/Saved
const FString ThePath \= FPaths::ConvertRelativePathToFull(FPaths::GameSavedDir());

InstallDir/WindowsNoEditor/GameName/Saved/Logs
----------------------------------------------

//InstallDir/WindowsNoEditor/GameName/Saved/Logs
const FString ThePath \= FPaths::ConvertRelativePathToFull(FPaths::GameLogDir());

Dynamic Relocation of Project
-----------------------------

The above code I am sharing with you will work even if you change the location of your packaged game after packaging!

Try it!

I added many many subdirectories between my InstallDir and WindowsNoEditor and it still worked perfectly!

So even if the end user moves everything starting with WindowsNoEditor around, the above code will still generate the correct and updated directory structure!

Conclusion
----------

Now you know how to create your own directory structures relative to the installation directory of your packaged game!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Packaged\_Game\_Paths,\_Obtain\_Directories\_Based\_on\_Executable\_Location&oldid=6015](https://wiki.unrealengine.com/index.php?title=Packaged_Game_Paths,_Obtain_Directories_Based_on_Executable_Location&oldid=6015)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)