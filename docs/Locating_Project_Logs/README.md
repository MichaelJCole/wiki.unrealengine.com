 Locating Project Logs - Epic Wiki             

 

Locating Project Logs
=====================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Editor Session Log](#Editor_Session_Log)
*   [2 Game Logs](#Game_Logs)
*   [3 Build/Cook/Package Logs](#Build.2FCook.2FPackage_Logs)
*   [4 Crash Logs](#Crash_Logs)
*   [5 Compile Logs](#Compile_Logs)

Editor Session Log
------------------

This log will be generated while running UE4Editor.exe or in a specific project. This file is almost always going to be included when needing a log.

Log Name

Windows location

Mac Location

UE4.log

UE4-backup-YYYY.DD.MM-HR.Mn.Sc.log

Engine\\Saved\\Logs\\

~/Library/Logs/Unreal Engine/Editor/

ProjectName.log

ProjectName-backup-YYYY.DD.MM-HR.Mn.Sc.log

ProjectName\\Saved\\Logs\\

~/Library/Logs/Unreal Engine/ProjectNameEditor/

Game Logs
---------

This log will be generated while running a Cooked/Packaged Project (ProjectName.exe or ProjectName.app) Always include this if there is an issue with running the packaged game.

Log Name

Windows location

Mac Location

ProjectName.log

WindowsNoEditor/ProjectName/Saved/Logs

~/Library/Logs/ProjectName/

Build/Cook/Package Logs
-----------------------

These logs are generated any time you Build/Cook/Package a project. File >Package > Platform, Editor Launch On, UFE sessions.

Log Name

Windows location

Mac Location

Cook.txt

UAT\_Log.txt UnrealBuildTool-YYYY.MM.DD-HH.mm.ss.txt

**P4** - Engine\\Programs\\AutomationTool\\Saved\\Logs

**Binary** - %USERPROFILE%\\AppData\\Roaming\\Unreal Engine\\AutomationTool\\Logs\\

~/Library/Logs/Unreal Engine/LocalBuildLogs/

Crash Logs
----------

These are the logs that created and uploaded to CrashReporter.

Log Name

Windows location

Mac Location

diagnostics.txt

minidump.dmp ProjectName.log

 %USERPROFILE%\\AppData\\Local\\Microsoft\\Windows\\WER\\ReportQueue (Note: C:\\Users\\UserName\\AppData is invisible, just type the path on the address bar)

**P4** - Engine/Saved/Crashes/CrashReport-ProjectName/

**Binary:** ~/Library/Application Support/Epic/Unreal Engine/4.X/Saved/Crashes/CrashReport-ProjectName/ (Note that /Users/yourusername/Library is invisible. Hold the alt-key and from the finder menu select Go->Library)

Compile Logs
------------

Any time a compile fails in Visual Studio or Xcode, copy all of the Output and paste into a txt file. Often times we only copy the last few lines that say it failed, which really doesn’t give the information that devs need.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Locating\_Project\_Logs&oldid=179](https://wiki.unrealengine.com/index.php?title=Locating_Project_Logs&oldid=179)"