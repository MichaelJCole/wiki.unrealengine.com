Boost Compile Times - Epic Wiki                     

Boost Compile Times
===================

**Rate this Tutorial:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (3 votes)

Approved for Versions:(please verify)

Name

Creating Boost Compile Times

Category

[Tutorials](https://wiki.unrealengine.com/Category:Tutorials) [Code](https://wiki.unrealengine.com/Category:Code) [Build](https://wiki.unrealengine.com/Category:Build)

Author

[Moritz "Moss" Wundke](http://www.moritzwundke.com/)

Cross-Post

[Boost Unreal Engine 4 Compile Times](http://www.moritzwundke.com/2014/08/boosting-compile-times/)

Forum Thread

[Tutorial - Boost Compile Times](https://forums.unrealengine.com/showthread.php?32064-Tutorial-Boost-Compile-Times)

UE4 Build

Any

Note: This guide is applicable for any type of project and operating system, while we analyze the case of building Unreal Engine 4 on a Windows 7 box.

Contents
--------

*   [1 Using all available cores](#Using_all_available_cores)
*   [2 Optimizing hard drive](#Optimizing_hard_drive)
*   [3 Using junction links with SSD](#Using_junction_links_with_SSD)
*   [4 Final compile times](#Final_compile_times)
*   [5 Other uses](#Other_uses)

Using all available cores
-------------------------

Using all available cores will give you an extra boost without too much setup effort. The engine will use only one compile worker per CPU core, in case your CPU uses Hyper Threading you could actually use 2 per physical core. This is disabled by default to not saturate the system. In my opinion I prefer to consume less time to build what I'm building instead of being able to use other programs while I'm building. Being able to use 4 or 8 workers is a huge difference.

To change the number of workers created you should create a copy of your build configuration file (**\\UnrealEngine\\Engine\\Programs\\UnrealBuildTool**) and past it into the following path **C:\\Users\\<user>\\Documents\\Unreal Engine\\UnrealBuildTool\\BuildConfiguration.xml**.

Open the XML file and change the **ProcessorCountMultiplier** value to **2** for example (4 cores with HyperThreading will then spawn 8 workers).

    <ProcessorCountMultiplier\>2</ProcessorCountMultiplier\>

Another option to tweak your build setting is playing around with UnityBuild and the PCH settings. Unreal is configured for large projects and so Unity build will be very helpful in such cases. If your project has very little code you can try to set the **bUseUnityBuild** value to **false** and the **MinFilesUsingPrecompiledHeader** value to **1** and see what happens. In my case I prefer to not change those values.

    <bUseUnityBuild\>true</bUseUnityBuild\>
    <MinFilesUsingPrecompiledHeader\>6</MinFilesUsingPrecompiledHeader\>

Optimizing hard drive
---------------------

Indexing is a very nice feature for every day usage of your system, it lets you find your files faster and makes it easier for anyone using your PC. But this is not always the case when you have heavy I/O interactions for example when you are compiling and building the engine. Each time you build you will open and close tons of files, check if they have changed etc... this consumes a lot of time, sometimes even more than actually building.

A quick way to drop the time required for each I/O operation is preventing the OS to perform indexing operation on your files. While I'm preventing it for my whole main drive you can do the same for a specific folder if you which within the advanced option section of the folder properties. Just disable the option called **Allow files on this drive to have contents indexed in addition to file properties** and you will have an instant boost in your compile times. On a full rebuild just that option gave me about 2 to 3 minutes of improvement.

Using junction links with SSD
-----------------------------

The next and most important optimization is to speedup your building, again **optimizing the time required for any I/O operation**, using a nice SSD drive. You do not need a super expensive one which comes with a lot space, a simple SSD is enough to get very good numbers.

The main idea behind using a SSD is not to have your whole engine or game installation onto a SSD but instead just having some folders that are very prone to I/O operations. The two most important folders are the Intermediate and the Source folders (same applies to your project specific folders).

We just navigate to the desired folder (the Engine folder in this case) and create a Junction Link fro the Intermediate and the Source folder which will then actually be on a different drive, the SSD one. You will be able to navigate the folders as always and your source control system will work exactly the same.

    cd UnrealEngine\\Engine
    mklink /J Intermediate C:\\UE4\\PR\\Intermediate
    mklink /J Source C:\\UE4\\PR\\Source

Final compile times
-------------------

All benchmarks has been performed using the following machine:

*   Operating System: Windows 7 Ultimate 64-bit (6.1, Build 7601) Service Pack 1
*   Board: Z68AP-D3 Gigabyte Technology Co., Ltd.
*   BIOS: Award Modular BIOS v6.00PG
*   Processor: Intel(R) Core(TM) i7-2600 CPU @ 3.40GHz (4 CPUs), ~3.7GHz, HyperThreading
*   Memory: 8192MB RAM

Without the changes:

*   Unreal Header Tool execution time (no tweaks): 53.84 seconds
*   UE4 execution time (no tweaks): 2145.25 seconds approx. 36 minutes

With the changes:

*   Unreal Header Tool execution time (with tweaks): 51.67 seconds
*   UE4 execution time (with tweaks): 1362.48 seconds approx. 23 minutes

The compiles of the header tool are nearly the same but **the full build of the engine took 13 minutes less to complete!** There are plenty of ways to boost your compile and building times but many require quite an amount of investment. Just using a small and cheap SSD can give you incredible boost for low cash.

Other uses
----------

As stated by user [kklors](https://forums.unrealengine.com/member.php?14825-kklors) using these optimizations makes a huge difference when using Lightmass [Lightmass (5-10x faster)](https://forums.unrealengine.com/showthread.php?32064-Tutorial-Boost-Compile-Times&p=126164&viewfull=1#post126164)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Boost\_Compile\_Times&oldid=25729](https://wiki.unrealengine.com/index.php?title=Boost_Compile_Times&oldid=25729)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Building](/index.php?title=Category:Building&action=edit&redlink=1 "Category:Building (page does not exist)")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)