 Oculus Rift - Epic Wiki             

 

Oculus Rift
===========

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Supported Platforms](#Supported_Platforms)
*   [2 Usage](#Usage)
    *   [2.1 Sanity Check](#Sanity_Check)
    *   [2.2 In-Editor](#In-Editor)
    *   [2.3 In-Game](#In-Game)
    *   [2.4 Useful Console Commands](#Useful_Console_Commands)
    *   [2.5 Config Settings](#Config_Settings)
*   [3 Development](#Development)
    *   [3.1 World Scale](#World_Scale)
    *   [3.2 Player settings](#Player_settings)
        *   [3.2.1 Height & Width](#Height_.26_Width)
        *   [3.2.2 Speed](#Speed)
        *   [3.2.3 Camera Location](#Camera_Location)
*   [4 True First Person Viewpoint](#True_First_Person_Viewpoint)
    *   [4.1 Blueprint functions](#Blueprint_functions)
    *   [4.2 Default Head Tracking Behaviour](#Default_Head_Tracking_Behaviour)
    *   [4.3 Virtual Head Model](#Virtual_Head_Model)
    *   [4.4 C++ functions](#C.2B.2B_functions)
*   [5 Bugs / Issues](#Bugs_.2F_Issues)
    *   [5.1 Texture Blurring / Vibrating](#Texture_Blurring_.2F_Vibrating)
    *   [5.2 Limitations](#Limitations)
    *   [5.3 Simulation Sickness](#Simulation_Sickness)
*   [6 See also](#See_also)

Overview
--------

Unreal Engine 4 supports the Oculus Rift through the use of a plugin.  
This plugin is included as part of the initial UE4 download.

### Supported Platforms

Originally, the Rift was only supported in UE4 on Windows. OSX support was added as well starting in 4.4.1.

Usage
-----

### Sanity Check

Unreal Engine 4 will automatically use an Oculus Rift if it is plugged in and the plugin is enabled.

[![](https://d3ar1piqh1oeli.cloudfront.net/9/9b/OculusRiftPlugin.jpg/300px-OculusRiftPlugin.jpg)](/index.php?title=File:OculusRiftPlugin.jpg)

The _Oculus Rift Plugin_ is enabled by default.

  
To see if the plugin is active and your Rift has been detected:

*   Run a standalone game.
*   Bring the console (default: ~ / tilde).
*   Type in "showlog".
*   Type in "ovrversion".
*   The LibOVR version & built date should be printed to the log window.

[![](https://d3ar1piqh1oeli.cloudfront.net/0/00/OculusRiftPluginVersionCheck.jpg/300px-OculusRiftPluginVersionCheck.jpg)](/index.php?title=File:OculusRiftPluginVersionCheck.jpg)

Plugged in & enabled.

  
If the message "Command not recognised: ovrversion" is displayed instead, check that:

*   the plugin is enabled.
*   you are running UE4 on the Windows platform.
*   your Oculus Rift is plugged in.
*   Also check if you have installed the lastest runtime driver! (U4 uses this to activate the plugin: [https://developer.oculusvr.com/?action=dl](https://developer.oculusvr.com/?action=dl))
*   your Oculus Rift is functioning correctly.

For any hardware related issues, contact [Oculus VR Support](https://support.oculusvr.com/).

### In-Editor

Prior to release 4.7, the Rift did not work in the editor view port or any Play in Editor (PIE) game mode; i.e. Right-Clicking and selecting 'Play From Here' didn't work.

Release 4.7 introduced a **VR Preview** Play in Editor mode. Select _Options for Play in Editor (PIE)_, and select _VR Preview_ to preview in the Rift.

[![VR Preview Mode](https://d26ilriwvtzlb.cloudfront.net/0/09/PreviewInVR47.png)](/index.php?title=File:PreviewInVR47.png "VR Preview Mode")

### In-Game

To use in-game:

*   Create a non-PIE game mode, such as a Standalone Game.
*   If not full screen, press Alt-Enter.
*   Bring up the console (~ / tilde). and type "stereo on".

If you have any issues, go through the [sanity check](/index.php?title=Oculus_Rift#Sanity_Check "Oculus Rift").

### Useful Console Commands

To see a full list, check out the OculusRiftHMD.cpp (full UE4 source required).

**stereo show**  
Print list of settings to log.

**stereo on/off**  
Enabled/disable stereo rendering for HMD device.

**stereo reset**  
Resets IPD & clears IPD/stereo overrides.

**stereo HEADX=, HEADY= or HEADZ=<value>**  
Sets X, Y or Z component of head model.

**stereo e=<value>**  
Override and set IPD.

**hmd enable/disable**  
Enable/disable HMD device.

**hmd vsync on/off/reset**  
Control or reset vsync.

**ovrversion**  
Print LibOVR version build date to log.

### Config Settings

Oculus Rift settings go in DefaultEngine.ini under the section Oculus.Settings.  
DefaultEngine.ini is located at "<Path to YourGame>\\Config\\DefaultEngine.ini".

[![](https://d3ar1piqh1oeli.cloudfront.net/2/28/OculusRiftDefaultEngineIniLoc.jpg/300px-OculusRiftDefaultEngineIniLoc.jpg)](/index.php?title=File:OculusRiftDefaultEngineIniLoc.jpg)

Example location of DefaultEngine.ini.

  

The list and values were taken from the source of the plugin.

\[Oculus.Settings\]
; In meters, not Unreal Units (cm)
; Recommended for true first person viewpoint
; since you are simulating the head.
;HeadModel\_v2=(X=0.0,Y=0,Z=0.0)
; Default values
HeadModel\_v2=(X=0.12,Y=0,Z=0.17)

bChromaAbCorrectionEnabled=true
bMagEnabled=true
bDevSettingsEnabled=false
bMotionPredictionEnabled=true
bTiltCorrectionEnabled=true
AccelGain=0.0
MotionPrediction=0.04

bOverrideIPD=false
IPD=0.064

bOverrideStereo=false
ProjectionCenterOffset=0.0
LensCenterOffset=0.0
FOV=90.0

bOverrideVSync=false
bVSync=true

bOverrideScreenPercentage=false
; Value is out of range \[30..300\]
ScreenPercentage=100.0

bAllowFinishCurrentFrame=false
PositionScaleFactor=1.0
; Defaults to true if DLL built with OVR\_VISION\_ENABLED defined.
; Positional tracking for DK2 onwards perhaps?
bHmdPosTracking=false
bLowPersistenceMode=false

; Defaults to true.
; If enabled, viewpoint rotation is updated during the render thread.
; Depending on how you control a players view rotation, you may need to disable this.
bUpdateOnRT=true

Development
-----------

### World Scale

By default, 1uu (Unreal Unit) is equal to 1cm.

There is a World to Meters variable, under World Settings, that can be changed to affect how the Rift and other devices behave.

[![](https://d3ar1piqh1oeli.cloudfront.net/d/d6/WorldSettingsWorldToMeters.jpg/300px-WorldSettingsWorldToMeters.jpg)](/index.php?title=File:WorldSettingsWorldToMeters.jpg)

World to Meters setting under World Settings.

  

### Player settings

You can find settings relating to a players speed, size and more under the Defaults tab of your characters Blueprint. They are also located under the particular component related to each setting, which you can find under the Components tab.

[![](https://d3ar1piqh1oeli.cloudfront.net/c/c6/MyCharacterBlueprintDefaults.jpg/300px-MyCharacterBlueprintDefaults.jpg)](/index.php?title=File:MyCharacterBlueprintDefaults.jpg)

Defaults tab.

[![](https://d3ar1piqh1oeli.cloudfront.net/6/68/MyCharacterBlueprintComponents.jpg/300px-MyCharacterBlueprintComponents.jpg)](/index.php?title=File:MyCharacterBlueprintComponents.jpg)

Components tab.

  

#### Height & Width

Height is based off the Capsule Half Height.  
Width is based off the Capsule Radius.

By default, the player is 192cm tall and 84cm wide.  
In the Virtual Reality Demo, the player is 176cm tall and 68cm wide.

#### Speed

MaxWalkSpeed governs a characters speed while on the ground, in cm/s.  
By default, the player moves at 600cm/s or 6m/s.

#### Camera Location

The location of the camera is usually based off the BaseEyeHeight variable.  
In the First Person Template and Virtual Reality Demo, the camera is 160cm off the ground.

True First Person Viewpoint
---------------------------

One of the best ways to help with presence is to use a true first person viewpoint.  
Basically speaking, you bolt the camera to the players eyes.  
This can be done in the following manner:

1.  Create blueprint based on your character of choice.
2.  Under components tab, add a camera component.
3.  Drag the camera component over your characters mesh to attach it there.
4.  Select the camera component and change its Parent Socket to the bone/socket of your choice.
5.  Adjust the relative location & rotation if required (its under Transform).
6.  Make sure Camera Settings => Use Controller View Rotation is enabled.
7.  Compile the Blueprint.
8.  Set the Default Pawn Class of your game mode to your TFP character.
9.  Zero out the [Virtual Head Model](/index.php?title=Oculus_Rift#Virtual_Head_Model "Oculus Rift").

[![](https://d3ar1piqh1oeli.cloudfront.net/f/f7/TrueFirstPersonCameraSetup.jpg/300px-TrueFirstPersonCameraSetup.jpg)](/index.php?title=File:TrueFirstPersonCameraSetup.jpg)

True First Person camera setup.

  

### Blueprint functions

[![](https://d3ar1piqh1oeli.cloudfront.net/d/d9/BlueprintHMD.jpg/300px-BlueprintHMD.jpg)](/index.php?title=File:BlueprintHMD.jpg)

List of [Blueprint functions](/index.php?title=Oculus_Rift_Blueprint "Oculus Rift Blueprint").

  

### Default Head Tracking Behaviour

By default, head tracking will affect the player's view, rotation and movement direction.  
This behaviour can be altered via [C++ or Blueprints](/index.php?title=Oculus_Rift_Separate_View "Oculus Rift Separate View").

### Virtual Head Model

By default, a virtual head model will be used to offset the players viewpoint.  
For a traditional first person viewpoint that rotates on a central axis, this is fine.  
For a [true first person viewpoint](/index.php?title=Oculus_Rift#True_First_Person_Viewpoint "Oculus Rift") that is already positioned at the location of the players eyes, this extra offset is unnecessary.  
Similarly so for most third person viewpoints.

The dimensions of this virtual head model are determined by the [HeadModel\_v2](/index.php?title=Oculus_Rift#Config_Settings "Oculus Rift") config setting.

### C++ functions

There are two main functions, outside of the actual plugin, that are responsible for controlling how the players viewpoint is modified by input from the Oculus Rift:

*   APlayerController::UpdateRotation().
*   APlayerCameraManager::UpdateViewTarget().

Bugs / Issues
-------------

### Texture Blurring / Vibrating

This is caused by the TemporalAA.  
The current work around is disable TemporalAA by switching the AA method to FXAA or None.  
It is located in your global post processing volume settings, under Misc.

[![](https://d3ar1piqh1oeli.cloudfront.net/8/88/OculusRiftBugTemporalAA.jpg/300px-OculusRiftBugTemporalAA.jpg)](/index.php?title=File:OculusRiftBugTemporalAA.jpg)

AA method.

  

### Limitations

*   Currently, screen space reflections are not supported. [Source](https://forums.unrealengine.com/showthread.php?651-Build-quality-reduction-in-Oculus-VR-mode)

### Simulation Sickness

Simulation Sickness is a form of motion sickness that occurs when using the Oculus Rift or other VR screen technology. To help reduce the likelihood of your user having a bad experience because of this, please follow best practices closely.

Resources:

*   [Oculus VR Best Practices Guide](http://static.oculusvr.com/sdk-downloads/documents/OculusBestPractices.pdf) - PDF
*   [Developing Virtual Reality Games and Experiences](http://www.gdcvault.com/play/1020714) - video of GDC 2014 talk by Tom Forsyth

Some specific suggestions, not intended to be exhaustive:

*   Avoid cinematic cameras or anything that takes control of the camera movements. This tends to be the worst offender for causing sim sickness.
*   Don't override the field of view angle (FOV) manually, and don't expose it as a user preference. The value needs to match the physical geometry of the headset and lenses and should be set automatically through the device's SDK and internal configuration. If there's a mismatch, the world will appear to warp when you turn your head, leading to discomfort or nausea.
*   Do not have "Walking Bob" for first person games. This refers to the screen moving to mimic the human body moving up and down as it walks.
*   Do not "shake" the camera. If a grenade goes off next to a player, a camera shake may make sense in games, but on the Oculus, it can trigger sim sickness quickly.
*   Design dimmer areas. Strong/vibrant lighting in games can cause sim sickness to occur more quickly. Avoid this by using cooler shades and dimmer lights than you normally would.
*   Keep your framerate high. Low framerates are another trigger for a lot of gamers, so make sure to optimize your game as much as possible. Try to keep over 60fps if possible, so that if there is lag it is less likely to be a problem. Future devices will require higher framerates, i.e. 75fps for Oculus Rift DK2, and (rumored) 90fps for the consumer release.
*   Keep height in mind. Some players become nauseated when looking at things that are very far up or down. This may be more caused by height phobias.

Please note that simulation and motion sickness are still not fully understood by doctors, so this advice is based off of various user experiences along with some limited knowledge of disorientation.

See also
--------

*   [Oculus Rift Separate View](/index.php?title=Oculus_Rift_Separate_View "Oculus Rift Separate View")
*   [Oculus Rift Blueprint](/index.php?title=Oculus_Rift_Blueprint "Oculus Rift Blueprint")

  
[Kris](/index.php?title=User:Kris&action=edit&redlink=1 "User:Kris (page does not exist)")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Oculus\_Rift&oldid=429](https://wiki.unrealengine.com/index.php?title=Oculus_Rift&oldid=429)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Blueprint](/index.php?title=Category:Blueprint "Category:Blueprint")