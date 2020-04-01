Building Linux cross-toolchain - Epic Wiki                    

Building Linux cross-toolchain
==============================

Big picture view
================

1.  Download the pre-built toolchain to get shell scripts and ct-ng configs
2.  Build gcc-based cross-toolchain on a Linux machine.
3.  Copy it to Windows machine and build/download clang.

Building gcc-based cross-toolchain
----------------------------------

You need to download the pre-built toolchain first, since it contains the necesary scripts (see toolchain/Build/script/ directory). You may also want to follow the steps in its Build/script/README.md rather than here, since they may match the scripts you have better.

Copy BuildCrossToolchain.sh together with linux-host.config and win64-host.config to a Linux machine running reasonably recent distro. Make sure that the following pre-requisites are installed (using Debian package names here):

mercurial autoconf gperf bison flex libtool ncurses-dev

and of course make/gcc.

Run the script, which will clone current crosstool-ng and will use it to perform so called "Canadian cross", i.e. will build Linux-hosted toolchain which targets mingw64 first, and then will build Windows-hosted toolchain that targets Linux. Note that the choice of kernel and binutils is pretty conservative and you are free to experiment (using "ct-ng menuconfig") if you need more recent ones. Not every combination is buildable though.

If the script finishes without error, the new toolchain will be copied to subfolder called CrossToolchain of the current folder. Copy it to your Windows machine, e.g. to C:\\CrossToolchain. Note that libz.a from this folder will be copied to lib64 folder of the toolchain.

Building clang
--------------

You can grab a pre-built clang from [here](http://llvm.org/releases/download.html), but we haven't actually tried that, building ourselves for various reasons. Detailed instructions how to build clang are given here: [http://clang.llvm.org/get\_started.html](http://clang.llvm.org/get_started.html) To recap, you will need: cmake, python and a supported compiler (recent Visual Studio is Ok).

Grab stable releases of llvm and clang from here: [http://llvm.org/releases/download.html#3.3](http://llvm.org/releases/download.html#3.3) and unpack it to your local folder (unpack llvm first, then unpack clang into llvm/tools subdirectory).Use cmake to generate project files and then build Release (or MinSizeRel) x64 configuration of "install" (or INSTALL, if you are using Visual Studio) target. Copy

bin/clang++.exe
lib/clang/3.3/include 

into the toolchain (so their relative path from toolchain root stays the same). At this point you should be done and your toolchain should be usable for [cross-compilation](/Compiling_For_Linux "Compiling For Linux").

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Building\_Linux\_cross-toolchain&oldid=4125](https://wiki.unrealengine.com/index.php?title=Building_Linux_cross-toolchain&oldid=4125)"

  ![](https://tracking.unrealengine.com/track.png)