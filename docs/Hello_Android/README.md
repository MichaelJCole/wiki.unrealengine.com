Hello Android - Epic Wiki                    

Hello Android
=============

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (4 votes)

Approved for Versions:(please verify)

This tutorial will show you how to create a simple rotating cube in Unread Engine 4 and deploy it on an Android Device.

Prerequisites: had Android SDK, JDK, and Ant installed. You can find a tutorial [here](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/). Let’s Begin!

Contents
--------

*   [1 Level Setup](#Level_Setup)
*   [2 Project Settings](#Project_Settings)
*   [3 Packaging Game](#Packaging_Game)
*   [4 Let’s Create our Cube](#Let.E2.80.99s_Create_our_Cube)
*   [5 Conclusion](#Conclusion)

Level Setup
-----------

Open unreal engine 4 and create a new blank project and call it "HelloAnd". Make sure "_Include started content_" is **unchecked**. Unreal will generate a sample level for us, we need to save it. From 'File' menu select Save Make a folder in "HelloAnd/Content" Directory and call it "Levels", choose a name for your level and hit Save. I will call my level "master"

  

Project Settings
----------------

We need to apply some changes to Project Settings

1.  Open Project Settings (Edit -> Project Settings…)
2.  Under Description tab you can enter some information about your game.
3.  Under Map & Modes tab you have to change Default map
    
    Under Default Maps section Change Game Default Map to master by clicking on a button next to Textbox (▼) and choosing your level name ('master' in my case)
    
    Do same thing with Editor Startup Map and Server Default Map
    
4.  You need to configure project for Android Platform, Under Android tab there is a Red Warning "Project is not configured for the android platform" and there is "Configure Now" button next to it. Click on "Configure Now" Button.

*   Consider **unchecking** "Mobile HDR" if your mobile device doesn't support it! (Under Rendering tab, there is 'Mobile section' and a Check box for "Mobile HDR").

  

[![](https://d26ilriwvtzlb.cloudfront.net/2/2c/HelloAnd1.png)](/File:HelloAnd1.png)

Project Settings - Game - Description

[![](https://d26ilriwvtzlb.cloudfront.net/3/35/HelloAnd2.png)](/File:HelloAnd2.png)

Project Settings - Game - Maps & modes

[![](https://d26ilriwvtzlb.cloudfront.net/5/5f/HelloAnd3.png)](/File:HelloAnd3.png)

Project Settings - Platforms - Android

Click on "**Set as Default**" for saving changes. Now we ready to package game for android! Let's dot it!

Packaging Game
--------------

Connect your device to your computer. Make sure **USB Debug Mode** is enabled on the device. Unreal Editor will automatically find your phone and you can deploy your level into your phone. Next to the “Launch" button on Main Editor Window there is drop down menu (▼) that list all available devices. you should see your computer’s name and name of your phone in there. Unreal Engine will automatically deploy current level into your device

  

[![HelloAndDeploytoAndriod.png](https://d3ar1piqh1oeli.cloudfront.net/7/77/HelloAndDeploytoAndriod.png/500px-HelloAndDeploytoAndriod.png)](/File:HelloAndDeploytoAndriod.png)

  

Let’s Create our Cube
---------------------

We need to create a blueprint for our cube. In Content Browser, create new folder and call it "Blueprints". Under Blueprints directory create a new Blueprint and call it "BP\_RotatingCube". Open "BP\_RotatingCube", under "Components" section we need to add Static Mesh; it will be Root component of our blueprint, Call it MyCube. Under details panel in Static Mesh Section click on little white down pointing triangle (▼), the tiny version of Content Browser will pop up. There is "View Options" on bottom right, click on it, check the "Show Engine Content" check box. Now we are able to see all Unreal built-in contents. Find Cube (or just simply type cube in search text box).

  
[![HelloAnd5.png](https://d3ar1piqh1oeli.cloudfront.net/8/81/HelloAnd5.png/250px-HelloAnd5.png)](/File:HelloAnd5.png) [![HelloAnd6.png](https://d3ar1piqh1oeli.cloudfront.net/d/d1/HelloAnd6.png/250px-HelloAnd6.png)](/File:HelloAnd6.png)

  
Go to "Graph" section. Create a new Variable and call it "RotationSpeed" change its default value to 100.0 (You need to compile blueprint for setting default values)

[![HelloAnd7.png](https://d3ar1piqh1oeli.cloudfront.net/9/99/HelloAnd7.png/250px-HelloAnd7.png)](/File:HelloAnd7.png)

  
We want to rotate cube around Y axis at constant speed the blueprint for this behavior is looks like this:

[![](https://d26ilriwvtzlb.cloudfront.net/1/17/HelloAnd8.png)](/File:HelloAnd8.png)

Final Blueprint

  

Save blueprint.

After saving blueprint you can drag and drop "BP\_RotatingCube" blueprint into level. hit Play to see the result.

  

[![Final Level](https://d3ar1piqh1oeli.cloudfront.net/3/3a/HelloAndFinal.png/750px-HelloAndFinal.png)](/File:HelloAndFinal.png "Final Level")

  
For packaging the game and generating actual _\*.apk_ file, go to 'File -> Package Project' menus and choose 'Android'. choose destination folder and unreal engine will crate an apk file for you.

[![HelloAnd9.png](https://d3ar1piqh1oeli.cloudfront.net/a/a8/HelloAnd9.png/250px-HelloAnd9.png)](/File:HelloAnd9.png)

Conclusion
----------

We have a beautiful rotating Cube in our android device.

  

[![HelloAndOnDevice.JPG](https://d26ilriwvtzlb.cloudfront.net/6/6d/HelloAndOnDevice.JPG)](/File:HelloAndOnDevice.JPG)

(Original Author: [Taesiri](/index.php?title=User:Taesiri&action=edit&redlink=1 "User:Taesiri (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Hello\_Android&oldid=8273](https://wiki.unrealengine.com/index.php?title=Hello_Android&oldid=8273)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)