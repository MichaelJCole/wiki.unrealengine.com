 Vulkan - Epic Wiki             

 

Vulkan
======

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

How to use Vulkan in Unreal Engine 4
------------------------------------

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Overview
--------

On February 16th 2016 the final Vulkan specifications along with the Vulkan SDK were released. Vulkan is a new graphics API and Unreal Engine 4 supports it! In this small tutorial I will show you how to use Vulkan in UE4. So let's get started!

Setup
-----

Setting up Vulkan for UE4 is easy, but you have to make sure to do everything in the correct order.

1\. Download the newest graphics driver for your GPU, make sure you get the version with Vulkan support. Both AMD and Nvidia have released such drivers. Download it, install it and restart your PC.

2\. Go to the official website and download the Vulkan SDK for your platform: [http://lunarg.com/vulkan-sdk/](http://lunarg.com/vulkan-sdk/) Then just install it, not that much to say about it.

3\. Go to the Unreal Engine 4 github site: [https://github.com/EpicGames/UnrealEngine](https://github.com/EpicGames/UnrealEngine)

For being able to access it, you need to have your Unreal Engine Account linked to your github Account. Select the "master" branch and click on "download zip" on the right. Wait for the download to finish, extract the zip file, then first run the "Setup.bat" and once that finished, run the "GenerateProjectFiles.bat" and then double click the generated "UE4.sln" file to open up the Visual Studio project.

Right click the UE4 solution and select "Build". Then you have to wait a while for Unreal Engine to build. It's important that you build the engine \*after\* you installed the SDK. So if you have a recent master build, you can't use it if you only installed the Vulkan SDK after you built the engine.

4\. Once the engine build finished, there are multiple options how to get Vulkan running. You can launch the whole Engine in "Vulkan Mode" with going into the Engine/Binaries/Win64/ directory, then right click the "UE4Editor.exe" and select "Create Shortcut". Then edit the shortcut so that it's pointing to

"C:\\YOUR\_INSTALL\_DIRECTORY\\Engine\\Binaries\\Win64\\UE4Editor.exe" -vulkan

You can now launch the engine from that shortcut and it's running Vulkan!

Another way to see it running is just using the engine build without the -vulkan parameter, but using the new "Vulkan Preview" mode you find below the "Mobile Preview" you probably know about.

[![VulkanPreview.jpg](https://d26ilriwvtzlb.cloudfront.net/6/6b/VulkanPreview.jpg)](/index.php?title=File:VulkanPreview.jpg)

This will launch your game as a standalone application running Vulkan. On first launch, a lot of Shaders will have to compile and that might take a while, but once that's finished, you see your project running on the new Vulkan API!

But keep in mind that Vulkan is only using the mobile rendering path of UE4 at the moment, so you won't be able to use some of the "High End" features UE4 offers. Still, it's awesome to see a new API like Vulkan to run on your PC :)

  
I hope you find some useful information in this, is there are any questions left I would suggest to ask in the forums :) Cheers!

~John Alcatraz

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Vulkan&oldid=283](https://wiki.unrealengine.com/index.php?title=Vulkan&oldid=283)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")