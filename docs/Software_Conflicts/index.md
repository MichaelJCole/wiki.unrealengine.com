Software Conflicts - Epic Wiki                    

Software Conflicts
==================

This is where we would like to collaborate with the community and gather together a list of software that conflicts with Unreal Engine 4. Whether it's the editor, packaged games, or even the launcher we would like to know what other software doesn't play nice.

Please feel free to add to this list if you encounter any Software Conflicts. We would appreciate it if you could provide the software name, version number, Windows Version, UE4 Engine Version that you're using, a short description of the conflict, and a workaround (if known).

 NOTE:  While a conflict may be listed with a specific version number(Software, OS, or UE4), it is
 possible that it is not isolated to that version

Contents
--------

*   [1 Windows](#Windows)
    *   [1.1 Major Conflicts](#Major_Conflicts)
    *   [1.2 Minor Conflicts](#Minor_Conflicts)
*   [2 Mac](#Mac)
*   [3 Linux](#Linux)

Windows
-------

##### Major Conflicts

Software

Version #

Windows Version

Discovered in UE4 Version:

Description

Workaround

Lucid Virtu MVP (GPU Management)

2.1.227/3.0.109

8.1

4.7.6

Allows easy switching between integrated and discrete graphics. Known to launch the editor in an "invisible" state.

Uninstall

Nvidia Optimus (GPU Management)

N/A (Latest Nvidia Drivers)

All

4.7.6

Crash while building lighting

Nvidia Optimus (GPU Management)

N/A (Latest Nvidia Drivers)

Win7 Only

4.9

Optimus does not switch to Nvidia GPU when running the editor

This occurs with all 64bit software on Win7 with Optimus. [See Here](https://forums.geforce.com/default/topic/748213/geforce-drivers/nvidia-optimus-big-problem-with-my-gtx660m/post/4292633/#4292633)

Kaspersky Antivirus

15.0.2.361

All

4.7.6

Most issues with antivirus come up when building code or launching the editor. UBT and UHT are sometimes flagged as suspicious programs and quarantined.

Add UE4Editor.exe to your firewall and Antivirus exceptions list. Post to Answerhub if this does not help.

Avast Antivirus

2015.10.2.2218

All

4.10.0

Most issues with antivirus come up when building code or launching the editor. UBT and UHT are sometimes flagged as suspicious programs and quarantined.

Add UE4Editor.exe to your firewall and Antivirus exceptions list. Post to Answerhub if this does not help.

Some USB Video Card Drivers

N/A

All

4.7.6

Known to cause possible memory leaks and display driver crashes

Uninstall

DisplayLink Drivers

N/A

All

4.8.0

Crashes editor on launch with old drivers. Throws D3D11 errors in callstack.

Update drivers or uninstall

Intel Integrated Graphics Video Drivers

10.18.10.####

All

4.8.0/1

Crash/Freeze while building lighting or Shader Compiling

Update to latest version  

NOTE: Intel Software will tell you that your drivers are up to date. It is a lie. Locate your CPU at the [Intel Download Center](https://downloadcenter.intel.com/) and you'll find the latest drivers.

Windows 10 Notifications

N/A

Win10

4.9

Performance problems when mousing over UI in the Editor

Clear all notifications. [See both answers here](https://answers.unrealengine.com/questions/277599/very-slow-ui-after-updating-to-windows-10.html) for a more permanent solution

EVGA PrecisionX

5.3.8

All

4.9

Performance problems when mousing over UI in the Editor

Turn off or uninstall EVGA PrecisionX

MSI Nahimic Sound Enhancement

1.2.3

All

4.10

Editor freezing in color picker and after opening BP classes. Slowdown when using the toolbars/UI outside of the editor viewports.

Disable Nahimic

Sonic Suite 2

2.2.16

All

4.9/4.10/4.11 Preview

Performance problems when mousing over UI in the Editor

Disable Sonic Suite 2

AMD Drivers with R9 200/300 Series

All

All, Windows 10

4.10, 4.11-pre6

Driver Crashes, Freezing, etc

See solutions [here](https://answers.unrealengine.com/questions/370852/fix-for-amd-driver-crash.html).

AMD Crimson Drivers

15.12 and later

All, more so Win10

4.10

Intermittent Editor Crashes, freezing, etc

See solutions [here](https://answers.unrealengine.com/questions/370852/fix-for-amd-driver-crash.html).

Networx Bandwidth Monitor

Any Version

All

4.11

Client's show black screens and their Begin Play functions aren't called in PIE when using a Dedicated Server

Disable Networx

Asus Strix UI Launcher

Any Version

All

4.10+

Performance problems when mousing over UI in the Editor

Turn of Asus Strix sound card UI

##### Minor Conflicts

Software

Version #

Windows Version

UE4 Version

Description

Workaround

Synergy

1.7.1

All

4.7.6

Has been known to cause viewport navigation issues on client PCs

No known workaround

Teamviewer

10

All

UT 5/28/2015

Keeps UT from running fullscreen

Open Teamviewer. **Options>Advanced>Show Advanced Options>QuickConnect button>Configure**. Add **...\\Program Files\\Epic Games\\UnrealTournamentDev\\Engine\\Binaries\\Win64\\UE4-Win64-Test.exe**

Mac
---

Software

Version #

OSX Version

UE4 Version

Description

Workaround

Avast Mac Security 2015

11.9 (46174)

10.11.4

4.11.2

SwarmAgent.exe is quarantined during engine download, causing it to fail.

Open Avast, go into the virus container, then secondary-click the file, choose to submit to virus lab. Fill out the popup to submit as false alarm. Then re-attempt download, it should work now.

Linux
-----

Software

Version #

Linux Version

UE4 Version

Description

Workaround

Example

Example

Example

Example

Example

Example

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Software\_Conflicts&oldid=24307](https://wiki.unrealengine.com/index.php?title=Software_Conflicts&oldid=24307)"

  ![](https://tracking.unrealengine.com/track.png)