 Linux Support - Epic Wiki             

 

Linux Support
=============

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[![Code Category.png](https://d26ilriwvtzlb.cloudfront.net/7/7a/Code_Category.png)](/index.php?title=Building_On_Linux "Building On Linux")

[Building](/index.php?title=Building_On_Linux "Building On Linux")

[![Linux running.png](https://d26ilriwvtzlb.cloudfront.net/b/bf/Linux_running.png)](/index.php?title=Running_On_Linux "Running On Linux")

[Running](/index.php?title=Running_On_Linux "Running On Linux")

[![Linux cooking.png](https://d26ilriwvtzlb.cloudfront.net/3/35/Linux_cooking.png)](/index.php?title=Cooking_On_Linux "Cooking On Linux")

[Cooking](/index.php?title=Cooking_On_Linux "Cooking On Linux")

[![Linux mac windows.png](https://d26ilriwvtzlb.cloudfront.net/b/bf/Linux_mac_windows.png)](/index.php?title=Compiling_For_Linux "Compiling For Linux")

[Cross-Compiling](/index.php?title=Compiling_For_Linux "Compiling For Linux")

[![Playlists3.png](https://d3ar1piqh1oeli.cloudfront.net/5/53/Playlists3.png/160px-Playlists3.png)](/index.php?title=Linux_Media "Linux Media")

[Media](/index.php?title=Linux_Media "Linux Media")

[![Tappy chicken.png](https://d26ilriwvtzlb.cloudfront.net/2/26/Tappy_chicken.png)](/index.php?title=Linux_Demos "Linux Demos")

[Demos](/index.php?title=Linux_Demos "Linux Demos")

[![Lifesafer bottom.png](https://d26ilriwvtzlb.cloudfront.net/8/8c/Lifesafer_bottom.png)](/index.php?title=Linux_Known_Issues "Linux Known Issues")

[Known Issues](/index.php?title=Linux_Known_Issues "Linux Known Issues")

[![Linux wip.png](https://d26ilriwvtzlb.cloudfront.net/6/6c/Linux_wip.png)](/index.php?title=Linux_Work_in_Progress "Linux Work in Progress")

[Work in Progress](/index.php?title=Linux_Work_in_Progress "Linux Work in Progress")

Big picture view
----------------

There are two major directions in UE4 Linux development - the first being helping people, who might not have had prior experience with Linux, to easily support it as an application platform (SteamOS, embedded systems), while the second - giving Linux folks at large ability to use and develop with Unreal Engine on this platform natively.

For the first group, we want to provide smooth, "console-like" experience, where they just need to install a [Linux "SDK"](/index.php?title=Compiling_For_Linux "Compiling For Linux") in order to compile and package Linux games without having to switch from Mac or Windows.

The second group - where you probably belong - is expected to have more knowledge and be prepared to delve into nitty-gritty details, if needed.

Depending on which group you are from, you may be interested in either [cross-compilation](/index.php?title=Compiling_For_Linux "Compiling For Linux") or [native development](/index.php?title=Building_On_Linux "Building On Linux"). Be advised that cross-compilation is a more traveled road, since it is used in production, while native compilation is for more advanced users - you want to be present on community [IRC channel](#Community_IRC_channel) (#ue4linux on [Freenode](http://webchat.freenode.net)), especially if you compile on an uncommon Linux distro.

Note that while cross-development from Windows to Linux is supported (which is especially crucial for non-Intel Linux architectures), the opposite direction (cross-developing for Windows on Linux) is not presently possible.

Of course, we welcome any help you might be able to offer to further improve Unreal on Linux.

Epic Games Launcher
-------------------

Currently, there is no possibility to access the launcher on Linux systems. It is not known when and if the launcher will be provided for the platform.

Supported architectures
-----------------------

### Linux x86-64

This is the primary architecture we are supporting.

### Linux AArch64/AArch32

Supported primarily for servers; albeit packaging a game is also possible (but requires desktop OpenGL which is only available on NVidia Jetson).

Distros
-------

### Binary compatibility

On Intel architectures, the cross-compiled binary should run on any distro with glibc 2.12 (CentOS 6.x) for Unreal 4.13 and earlier or with glibc 2.17 (Cent OS 7.x) for Unreal 4.14 and above. For binaries that are built natively, binary compatibility is not guaranteed and generally you should expect to be able to run them only on a system exactly like yours.

For compatibility on non-Intel architectures see cross-toolchain README files for glibc versions.

### Suitability for native development

The recommended distro for developing Unreal on Linux is Ubuntu. The LTS version that is the closest to the release of a particular Unreal version works best (i.e. 14.04 for UE4 4.11 and lower, 16.04 for UE 4.12 and above).

Users of other systems, especially Gentoo and Arch Linux are expected to be knowledgeable about system components and be able to find discrepancies between Ubuntu and their system that can prevent Unreal build process or the engine itself from running.

Community IRC channel
---------------------

Although this is not an official support outlet, people from [irc://irc.freenode.net/UE4Linux](irc://irc.freenode.net/UE4Linux) might be able to offer some help. You can find archived IRC discussions at [http://teemperor.de/ue4-logs/ue4linux/](http://teemperor.de/ue4-logs/ue4linux/)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Linux\_Support&oldid=43](https://wiki.unrealengine.com/index.php?title=Linux_Support&oldid=43)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")