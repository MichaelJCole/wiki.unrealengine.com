IOS Device Compatibility - Epic Wiki                    

IOS Device Compatibility
========================

This page is a place for the community to view and provide data on iOS devices that have run UE4. Please be sure to include the version of iOS for your device.

Legend:  

**LDR** (TappyChicken) - Low Dynamic Range. The highest performance tier supported in UE4 and is recommended for games that do not require lighting or postprocessing features  
**Basic Lighting** (StrategyGame) - Leverages static lighting and fully rough Materials to create levels with interesting lighting while maximizing performance to reach a broader range of mobile devices  
**Full HDR w/ Sun** (SunTemple) - This tier is the same as the 'Full HDR' tier and has the same advantages and recommendations except that a single directional light is rendered at much higher quality

 For detailed information on the Rendering Features in the table, see our [Performance Guidelines for Mobile Devices](https://docs.unrealengine.com/latest/INT/Platforms/Mobile/Performance/index.html) page.

**Supported** - Device passed basic compatibility testing and is expected to work, barring minor issues that may need to be fixed for certain features, or low performance  
**Expected** - Device was not fully tested but the hardware is expected to be supported, barring any unique software/driver implementation  

Contents
--------

*   [1 Customer Device List](#Customer_Device_List)
*   [2 Epic Games Currently Tested Device List](#Epic_Games_Currently_Tested_Device_List)
*   [3 Devices Tested In Previous Versions](#Devices_Tested_In_Previous_Versions)
*   [4 OS Specific Notes](#OS_Specific_Notes)
    *   [4.1 iOS 9.0](#iOS_9.0)

Customer Device List
--------------------

Device

iOS version

LDR (Tappychicken)

Basic Lighting (StrategyGame)

Full HDR w/Sun (SunTemple)

UE4 Tested

Example Device

#.#.#

Supported?

Supported?

Supported?

4.#

Epic Games Currently Tested Device List
---------------------------------------

Device

iOS version

LDR (Tappychicken)

Basic Lighting (StrategyGame)

Full HDR w/Sun (SunTemple)

UE4 Tested

iPad 3

7.0.4

Supported (60fps)

Supported (60fps)

Supported (16fps)

4.9

8

Supported (60fps)

Supported (30fps)

Supported (14fps)

4.9

iPad 4

9.0

Supported (60fps)

Supported (38fps)

Supported (35fps)

4.9.1

iPad Air

9.0

Supported (60fps)

Supported (46fps)

Supported (37fps)

4.9.1

7

Supported (60fps)

Supported (46fps)

Supported (30fps)

4.9

iPad Air 2

**\*** 9.0

Supported (60fps)

Supported (30fps)

Supported (30fps)

4.9.1

iPad Mini

8.1

Supported (60fps)

Supported (30fps)

Supported (7fps)

4.9

iPad Mini 2

7.1.2

Supported (60fps)

Supported (46fps)

Supported (30fps)

4.9

iPad Mini 3

**\*** 9.0

Supported (60fps)

Supported (38fps)

Supported (49fps)

4.9.1

iPhone 5

7.1.2

Supported (60fps)

Supported (60fps)

Supported (30fps)

4.9

iPhone 5C

9.0

Supported (60fps)

Supported (60fps)

Supported (35fps)

4.9.1

iPhone 5S

7.0

Supported (60fps)

Supported (60fps)

Supported (30fps)

4.9

iPhone 6

8.0.2

Supported (60fps)

Supported (30fps)

Supported (30fps)

4.9

iPhone 6+

8.3

Supported (60fps)

Supported (30fps)

Supported (30fps)

4.9

iTouch 5

8.1

Supported (60fps)

Supported (30fps)

Supported (16fps)

4.9

Devices Tested In Previous Versions
-----------------------------------

Device

iOS version

LDR (Tappychicken)

Basic Lighting (StrategyGame)

Full HDR w/Sun (SunTemple)

UE4 Tested

iPad 2

8.1

Supported

Supported

Supported

4.7

7

Supported

Supported

Supported

4.7

6.1.3

Supported

Expected

Supported

4.7

7.1.2

Supported

Supported

Supported

4.7

8

Supported

Supported

Supported

4.7

iPad 3

8.1

Supported

Supported

Supported

4.7

6.1

Supported

Expected

Supported

4.7

iPad 4

8.1

Supported

Supported

Supported

4.7

6.1.2

Supported

Expected

Supported

4.7

8.0

Supported

Supported

Supported

4.7

iPad Air

8

Supported

Supported

Supported

4.7

iPad Mini

7

Supported

Supported

Supported

4.7

6.1.2

Supported

Expected

Supported

4.7

8.0

Supported

Supported

Supported

4.7

iPad Mini 2

8.1

Supported

Supported

Supported

4.7

iPhone 4

6.1.2

Supported

Supported

Supported

4.7

7

Supported

Supported

Supported

4.7

7.1

Supported

Supported

Supported

4.7

iPhone 4S

8.1

Supported

Supported

Supported

4.7

6.1.2

Supported

Supported

Supported

4.7

7

Supported

Supported

Supported

4.7

8

Supported

Supported

Supported

4.7

iPhone 5

8.1

Supported

Supported

Supported

4.7

6.1.2

Supported

Supported

Supported

4.7

8

Supported

Supported

Supported

4.7

iPhone 5C

7.0.4

Supported

Supported

Supported

4.7

8.1

Supported

Supported

Supported

4.7

7.1.1

Supported

Supported

Supported

4.7

iPhone 5S

7.1.1

Supported

Supported

Supported

4.7

8.1

Supported

Supported

Supported

4.7

iTouch 5

6.1.2

Supported

Supported

Supported

4.7

8

Supported

Supported

Supported

4.7

  
**\*** See OS Specific notes below

**†** See Device Specific notes below

OS Specific Notes
-----------------

### iOS 9.0

Code projects packaged from a Mac hang on a black screen when the app is run on some tablet devices. This was reproduced on an iPad Air 2 and iPad Mini 3.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=IOS\_Device\_Compatibility&oldid=15445](https://wiki.unrealengine.com/index.php?title=IOS_Device_Compatibility&oldid=15445)"

  ![](https://tracking.unrealengine.com/track.png)