Compiling For FreeBSD - Epic Wiki                    

Compiling For FreeBSD
=====================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

Contents
--------

*   [1 Why cross-compilation](#Why_cross-compilation)
*   [2 Getting the source](#Getting_the_source)
*   [3 Getting the toolchain and dependencies](#Getting_the_toolchain_and_dependencies)
*   [4 Using the toolchain](#Using_the_toolchain)
    *   [4.1 Setup](#Setup)
    *   [4.2 Packaging](#Packaging)

Why cross-compilation
---------------------

As required libraries for the editor are not available on FreeBSD, it is not possible to compile or use the editor natively. Cross-compilation for FreeBSD works similarly to cross-compilation for [Linux](/Compiling_For_Linux "Compiling For Linux"). The cross-compilation toolchain is currently targeted for FreeBSD 11.

Getting the source
------------------

The FreeBSD fork resides in an external repository at [https://github.com/UE4-FreeBSD/UE4-FreeBSD](https://github.com/UE4-FreeBSD/UE4-FreeBSD). The FreeBSD code is located in the release\_freebsd branch. To get the source use the following command.  

`git clone -b release_freebsd [https://github.com/UE4-FreeBSD/UE4-FreeBSD.git](https://github.com/UE4-FreeBSD/UE4-FreeBSD.git)`

Getting the toolchain and dependencies
--------------------------------------

The cross-compilation toolchain for Windows and precompiled dependencies for FreeBSD can be downloaded from the latest -freebsd release on the releases page of the FreeBSD repository at [https://github.com/UE4-FreeBSD/UE4-FreeBSD/releases](https://github.com/UE4-FreeBSD/UE4-FreeBSD/releases). The dependencies must be extracted to the engine source directory.

[![Downloading toolchain and dependencies](https://d3ar1piqh1oeli.cloudfront.net/7/76/Freebsd-download-toolchain.jpg/800px-Freebsd-download-toolchain.jpg)](/File:Freebsd-download-toolchain.jpg "Downloading toolchain and dependencies")

Using the toolchain
-------------------

### Setup

Add an environment variable (Control Panel->System->Advanced system settings->Advanced->Environment variables) named FREEBSD\_MULTIARCH\_ROOT. The value should be the path to the toolchain directory downloaded from the releases page. Make sure the new environment variable has been registered to the system / application (MSVC) by rebooting the machine or restarting the app before continuing to the build step.

[![Setting Windows Environment Variable FREEBSD_MULTIARCH_ROOT](https://d3ar1piqh1oeli.cloudfront.net/c/c5/Freebsd-update-environment.jpg/800px-Freebsd-update-environment.jpg)](/File:Freebsd-update-environment.jpg "Setting Windows Environment Variable FREEBSD_MULTIARCH_ROOT")

### Packaging

Packaging for FreeBSD follows the same rules as [Packaging for Linux](/Compiling_For_Linux "Compiling For Linux") except with FreeBSD as the target platform.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Compiling\_For\_FreeBSD&oldid=25300](https://wiki.unrealengine.com/index.php?title=Compiling_For_FreeBSD&oldid=25300)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")
*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)