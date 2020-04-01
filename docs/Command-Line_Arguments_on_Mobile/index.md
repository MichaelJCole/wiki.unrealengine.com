 Command-Line Arguments on Mobile - Epic Wiki             

 

Command-Line Arguments on Mobile
================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Quick documentation on how-to pass command-line arguments to the UE4Game executable on devices, based on my experience with Android Gear VR. This is especially useful when profiling on mobile target. [SRombauts](/index.php?title=User:SRombauts&action=edit&redlink=1 "User:SRombauts (page does not exist)") ([talk](/index.php?title=User_talk:SRombauts&action=edit&redlink=1 "User talk:SRombauts (page does not exist)"))

Command-Line Arguments introduction
-----------------------------------

*   [Command-Line Arguments official documentation](https://docs.unrealengine.com/latest/INT/Programming/Basics/CommandLineArguments/) : **Command-Line Arguments** are strings of keywords that you can pass when running the executable via the command line or a shortcut to the executable. Their purpose is to customize the manner in which the engine runs to suit the needs of the developer or user.

These commands are not case sensitive.

*   [Command-line options for profiling](https://docs.unrealengine.com/latest/INT/Engine/Performance/Options/index.html) : Certain features can be disabled on the command line e.g. **UE4.exe -NoSound**. The most useful ones for profiling:

Command-line option

Description

\-NoSound

To disable the sound and music system.

\-NoTextureStreaming

To disable texture streaming (good to isolate where hitches are coming from).

\-NoVerifyGC

Otherwise expect massive hitching in Developpment builds at least every 30 seconds or so.

\-NoVSync

Gives faster rendering but can result in image tearing, especially important with high FPS.

\-Streaming

Useful with StartFPSChart/StopFPSChart to get the data from a non windows device to the cooking PC for further investigations (assuming we use cook on the fly).

UE4CommandLine.txt
------------------

[Since UE4.8](https://docs.unrealengine.com/latest/INT/Support/Builds/ReleaseNotes/2015/4_8/): The editor now checks for additional command line arguments stored in a **UE4CommandLine.txt** file in the root installation directory. Create this file to set arguments that the editor should always be run with.

Command-line arguments on Android
---------------------------------

Android OS does not support passing command line arguments to an executable. A default UE4CommandLine.txt is created and deployed on the target for that, on **/mnt/sdcard/UE4Game/<ProjectName>/UE4CommandLine.txt**

If you which to specify a specific option (let say _\-NoSound_) you have to overwrite this file. There is a template file and a batch file that you can use to do that. Look in:

C:\\Program Files\\Epic Games\\UE\_4.17\\Engine\\Build\\Android\\UE4Game

UE4CommandLine.txt.template:

../../../Samples/Showcases/Mobile/Mobile.uproject -filehostip=###.###.###.### -nosound -streaming

Should be edited with correct project name, for instance :

../../../UE4GearVR/UE4GearVR.uproject  /Game/Maps/GearVR -NoSound

Then simply execute **PushCommandLine.bat** after each new **Launch** from the Editor, and then restart your game on the target device.

Reference: the only place where I could find a reference to this file was on page 10 of the [UE4 – Mobile Deployment presentation](https://cdn2.unrealengine.com/Resources/files/UE4_DevCon2014_MobileDeployment-997068457.pdf)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Command-Line\_Arguments\_on\_Mobile&oldid=1187](https://wiki.unrealengine.com/index.php?title=Command-Line_Arguments_on_Mobile&oldid=1187)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Android](/index.php?title=Category:Android&action=edit&redlink=1 "Category:Android (page does not exist)")
*   [Mobile](/index.php?title=Category:Mobile&action=edit&redlink=1 "Category:Mobile (page does not exist)")
*   [Deployment](/index.php?title=Category:Deployment&action=edit&redlink=1 "Category:Deployment (page does not exist)")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")