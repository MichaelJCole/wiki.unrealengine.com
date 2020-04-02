(window.webpackJsonp=window.webpackJsonp||[]).push([[370],{834:function(e,t,n){"use strict";n.r(t);var i=n(28),o=Object(i.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("p",[e._v("Compiling For Linux - Epic Wiki")]),e._v(" "),n("h1",{attrs:{id:"compiling-for-linux"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#compiling-for-linux"}},[e._v("#")]),e._v(" Compiling For Linux")]),e._v(" "),n("p",[e._v("From Epic Wiki")]),e._v(" "),n("p",[e._v("Jump to: "),n("a",{attrs:{href:"#mw-head"}},[e._v("navigation")]),e._v(", "),n("a",{attrs:{href:"#p-search"}},[e._v("search")])]),e._v(" "),n("p",[n("a",{attrs:{href:"/index.php?title=Template:Rating&action=edit&redlink=1",title:"Template:Rating (page does not exist)"}},[e._v("Template:Rating")])]),e._v(" "),n("h2",{attrs:{id:"contents"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#contents"}},[e._v("#")]),e._v(" Contents")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#Why_cross-compilation"}},[e._v("1 Why cross-compilation")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#Platform_Support_for_Cross-Compilation"}},[e._v("2 Platform Support for Cross-Compilation")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#Getting_the_toolchain"}},[e._v("3 Getting the toolchain")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#Using_the_toolchain"}},[e._v("4 Using the toolchain")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#Setup"}},[e._v("4.1 Setup")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#clang_v8.2B"}},[e._v("4.1.1 clang v8+")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#clang_v4-7"}},[e._v("4.1.2 clang v4-7")])])])]),e._v(" "),n("li",[n("a",{attrs:{href:"#Packaging_for_Linux"}},[e._v("4.2 Packaging for Linux")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"#From_the_editor"}},[e._v("4.2.1 From the editor")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#Additional_Step_for_Linux-ARM_platforms"}},[e._v("4.2.2 Additional Step for Linux-ARM platforms")])])])])])])]),e._v(" "),n("h2",{attrs:{id:"why-cross-compilation"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#why-cross-compilation"}},[e._v("#")]),e._v(" Why cross-compilation")]),e._v(" "),n("p",[e._v("Cross-compilation was chosen in order to make it easier for game developers (who tend to have a centric workflow on a platform that differs from the deployment target). At the moment, this is only supported for Windows, Mac users currently have to resort to "),n("a",{attrs:{href:"/index.php?title=Building_On_Linux",title:"Building On Linux"}},[e._v("native compilation")]),e._v(".")]),e._v(" "),n("h2",{attrs:{id:"platform-support-for-cross-compilation"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#platform-support-for-cross-compilation"}},[e._v("#")]),e._v(" Platform Support for Cross-Compilation")]),e._v(" "),n("p",[e._v("Currently cross compilation from "),n("strong",[e._v("Windows")]),e._v(" is supported for Linux-x86_64 and Linux-ARM target platforms.")]),e._v(" "),n("p",[e._v("Support is currently for:")]),e._v(" "),n("ul",[n("li",[e._v("On Windows | For Linux-x86_64")]),e._v(" "),n("li",[e._v("On Windows | For Linux-ARM")])]),e._v(" "),n("h2",{attrs:{id:"getting-the-toolchain"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#getting-the-toolchain"}},[e._v("#")]),e._v(" Getting the toolchain")]),e._v(" "),n("p",[e._v("There are now 2 toolchain binaries available for cross compiling from Windows. One for cross compiling to Linux-x86_64 platforms and another for cross compiling to Linux-ARM platforms."),n("br"),e._v("\nThe Linux-x86_64 cross compile toolchain binaries can be downloaded from")]),e._v(" "),n("p",[e._v("- v4 "),n("a",{attrs:{href:"http://cdn.unrealengine.com/qfe/v4_clang-3.5.0_ld-2.24_glibc-2.12.2.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("clang-3.5.0-based"),n("OutboundLink")],1),e._v(" - for UE4 <= 4.8")]),e._v(" "),n("ul",[n("li",[e._v("v6 "),n("a",{attrs:{href:"https://s3.amazonaws.com/unrealengine/qfe/v6_clang-3.6.0_ld-2.24_glibc-2.12.2.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("clang-3.6.0-based"),n("OutboundLink")],1),e._v(" - for UE4 4.9 and 4.10")]),e._v(" "),n("li",[e._v("v7 "),n("a",{attrs:{href:"https://s3.amazonaws.com/unrealengine/CrossToolchain_Linux/v7_clang-3.7.0_ld-2.24_glibc-2.12.2.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("clang 3.7.0-based"),n("OutboundLink")],1),e._v(" - for UE4 4.11, 4.12 and 4.13")]),e._v(" "),n("li",[e._v("v8 "),n("a",{attrs:{href:"http://cdn.unrealengine.com/qfe/v8_clang-3.9.0-centos7.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("clang 3.9.0-based"),n("OutboundLink")],1),e._v(" - for UE4 4.14 and 4.15")]),e._v(" "),n("li",[e._v("v9 "),n("a",{attrs:{href:"http://cdn.unrealengine.com/CrossToolchain_Linux/v9_clang-4.0.0-centos7.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("clang 4.0.0-based"),n("OutboundLink")],1),e._v(" - for UE4 4.16 and 4.17")]),e._v(" "),n("li",[e._v("v10 "),n("a",{attrs:{href:"http://cdn.unrealengine.com/CrossToolchain_Linux/v10_clang-5.0.0-centos7.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("clang 5.0.0-based"),n("OutboundLink")],1),e._v(" - for UE4 4.18")]),e._v(" "),n("li",[e._v("v11 "),n("a",{attrs:{href:"http://cdn.unrealengine.com/CrossToolchain_Linux/v11_clang-5.0.0-centos7.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("clang 5.0.0-based"),n("OutboundLink")],1),e._v(" - for UE4 4.19 (includes extra tools for LTO compared to v10)")])]),e._v(" "),n("p",[e._v("The Linux-ARM cross compile toolchain binaries can be downloaded from "),n("a",{attrs:{href:"https://s3.amazonaws.com/unrealengine/qfe/arm-unknown-linux-gnueabihf_v5_clang-3.5.0-ld-2.23.1-glibc-2.13.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("clang-3.5.0-arm"),n("OutboundLink")],1),e._v("."),n("br"),e._v("\nFor other cross compile configurations see "),n("a",{attrs:{href:"/index.php?title=Building_Linux_cross-toolchain",title:"Building Linux cross-toolchain"}},[e._v("build your own")]),e._v(" (this is needed if you want different versions of the tools).")]),e._v(" "),n("p",[e._v("The clang v4 Linux-x86_64 cross compile toolchain can be automatically set up with this Powershell script "),n("a",{attrs:{href:"https://gist.github.com/megamorf/46a36a7be2979d43ee07",target:"_blank",rel:"noopener noreferrer"}},[e._v("Install-LinuxToolChain"),n("OutboundLink")],1),e._v(". Run Powershell as Administrator and paste the contents into the Powershell window and hit enter twice.")]),e._v(" "),n("h2",{attrs:{id:"using-the-toolchain"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#using-the-toolchain"}},[e._v("#")]),e._v(" Using the toolchain")]),e._v(" "),n("h3",{attrs:{id:"setup"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#setup"}},[e._v("#")]),e._v(" Setup")]),e._v(" "),n("h4",{attrs:{id:"clang-v8"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#clang-v8"}},[e._v("#")]),e._v(" clang v8+")]),e._v(" "),n("p",[e._v("Add an environment variable (Control Panel->System->Advanced system settings->Advanced->Environment variables) named LINUX_MULTIARCH_ROOT. The value should be the path to the clang v8 directory containing the multiple linux architecture directories (for example one being x86_64-unknown-linux-gnu and another arm-unknown-linux-gnueabihf). Make sure the new environment variable has been registered to the system / application (MSVC) by rebooting the machine or restarting the app at least before continuing to the build step.")]),e._v(" "),n("h4",{attrs:{id:"clang-v4-7"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#clang-v4-7"}},[e._v("#")]),e._v(" clang v4-7")]),e._v(" "),n("p",[e._v("Add an environment variable (Control Panel->System->Advanced system settings->Advanced->Environment variables) named LINUX_ROOT, value of which is the absolute path to your toolchain, without trailing backslash:")]),e._v(" "),n("p",[n("a",{attrs:{href:"/index.php?title=File:Adding_Windows_Environment_Variable.png",title:"Setting Windows Environment Variable LINUX_ROOT"}},[n("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/7/70/Adding_Windows_Environment_Variable.png/800px-Adding_Windows_Environment_Variable.png",alt:"Setting Windows Environment Variable LINUX_ROOT"}})])]),e._v(" "),n("p",[e._v("If you are using the Linux-ARM cross compile toolchain before running GenerateProjectFiles.bat below edit the following file in the UE4 source code:"),n("br"),e._v("\n.../UnrealEngine/Engine/Source/Programs/UnrealBuildTool/Linux/UEBuildLinux.cs"),n("br"),e._v("\nby commenting out the following line:"),n("br"),e._v('\nstatic private string DefaultArchitecture = "x86_64-unknown-linux-gnu";'),n("br"),e._v("\nand un-commenting the linux-arm architecture line just below it:"),n("br"),e._v('\n//static private string DefaultArchitecture = "arm-unknown-linux-gnueabihf";')]),e._v(" "),n("p",[e._v("After you made sure that variable is set, re-regenerate UE4 project files (using GenerateProjectFiles.bat) and restart Visual Studio. After this, you should have \"Linux\" available among Win32/Win64 configurations, and you should be able to cross-compile for it. Should but not always will. As of 4.17 you won't have it on a source version of the engine for some reason. Just don't trust this thing like I did and spend 5 minutes looking for it, just launch the editor and try packaging to linux again. At this point you are reading too much into this wiki page. Just download the toolkit, extract and set your environment variables. If this doesn't work then that's when you come back and read more.")]),e._v(" "),n("p",[e._v("You also need to rerun Setup.bat or .../UnrealEngine/Engine/Binaries/DotNET/GitDependencies.exe because that step will grab/copy libc++ stuff to .../UnrealEngine/Engine/Source/ThirdParty/Linux/LibCxx/. Otherwise, cross-compiling will fails with saying it cannot find standard C++ headers. If you haven't explicitly defined and set an environment variable of UE4_LINUX_USE_LIBCXX to 0, cross-compiling will use libc++ headers/libraries in there by default instead of the one inside the clang toolchain.")]),e._v(" "),n("p",[e._v("For packaging for Linux platforms (both x86_64 and ARM) the CrashReportClient is also needed to be built for the Linux configuration in addition to the default UE4Game project.")]),e._v(" "),n("p",[e._v("Notice that you may want to (re)build the Editor for your platform to get Linux target modules built. They are built for your current platform (i.e. select Win64 in configuration), and they are needed so that Unreal Editor and Unreal Frontend know how to cook/package games for Linux.")]),e._v(" "),n("p",[e._v('Note: If packaging for Linux (see below) fails it may be necessary to explicitly build UnrealPak and ShaderCompileWorker for the host platform, which in this case is windows (Win32 or Win64). To do this right-click on each of this project in the solution explorer and execute the "Build" command.')]),e._v(" "),n("p",[e._v("Note: If starting UE4Editor fails with message about not able to find libfbxsdk.dll, this can be fixed by copying libfbxsdk.dll from ...\\UnrealEngine\\Engine\\Source\\ThirdParty\\FBX\\2014.2.1\\lib\\vs2012\\x64\\release to the same location as the UE4Editor executable file where ...\\UnrealEngine is the top location of the UE4 source code. For Win32 systems use the file located under ...\\x86\\release instead.")]),e._v(" "),n("h3",{attrs:{id:"packaging-for-linux"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#packaging-for-linux"}},[e._v("#")]),e._v(" Packaging for Linux")]),e._v(" "),n("h4",{attrs:{id:"from-the-editor"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#from-the-editor"}},[e._v("#")]),e._v(" From the editor")]),e._v(" "),n("p",[e._v("The easiest way to package a project is opening it in the editor and then using File->Package To->Linux (assuming that you have a cross-toolchain installed in the previous step and Linux target modules are built for the editor in question - if you don't see Linux in the list, then it's likely that one of the former is not true - see "),n("a",{attrs:{href:"#Setup"}},[e._v("above")]),e._v("). After some time (which depends on the project in question and is rather short for sample project) you will have game assets and binaries in the directory you chose to package to.")]),e._v(" "),n("p",[e._v('The details of the packaging process can be seen by clicking the "Show Output Log" link. If this process fails with error message "unable to find UnrealPak or ShaderCompileWorker" see '),n("a",{attrs:{href:"#Setup"}},[e._v("above")]),e._v(" about building them for the host (windows) platform.")]),e._v(" "),n("p",[e._v("Scp or otherwise copy it to a target machine (mounting a Samba share - if you know how to do that - may be better if target machine is low on disk space, this also reduces iteration times), chmod +x the target executable (which will be located in LinuxNoEditor/"),n("ProjectName",[e._v("/Binaries/Linux/ directory) and run it.")])],1),e._v(" "),n("h4",{attrs:{id:"additional-step-for-linux-arm-platforms"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#additional-step-for-linux-arm-platforms"}},[e._v("#")]),e._v(" Additional Step for Linux-ARM platforms")]),e._v(" "),n("p",[e._v("An additional step is required for the packaged project to be runnable on Linux-ARM platforms. The following has been verified using the SunTemple project packaged using Unreal-4.6 and executed on NVIDIA's Jetson TK1 platform.")]),e._v(" "),n("p",[e._v("Assuming the packaged project is located at \\Users\\foo\\SunTemple_Linux open the following location:"),n("br"),e._v("\n\\Users\\foo\\SunTemple_Linux\\LinuxNoEditor\\Engine\\Binaries\\Linux"),n("br"),e._v("\nand replace libopenal.so.1 with the version from:"),n("br"),e._v("\n...\\UnrealEngine\\Engine\\Source\\ThirdParty\\OpenAL\\1.15.1\\lib\\Linux\\arm-unknown-linux-gnueabihf\\libopenal.so"),n("br"),e._v("\nwhere ...\\UnrealEngine is the location of the UE4 source code. Please be sure to rename libopenal.so to libopenal.so.1.")]),e._v(" "),n("p",[e._v("Now the project can be copied over to the target machine, chmod+x the target executable and run it as instructed above.")]),e._v(" "),n("p",[e._v("<-- Back to the main "),n("a",{attrs:{href:"/index.php?title=Linux_Support",title:"Linux Support"}},[e._v("Linux Support")]),e._v(" page.")]),e._v(" "),n("p",[e._v('Retrieved from "'),n("a",{attrs:{href:"https://wiki.unrealengine.com/index.php?title=Compiling_For_Linux&oldid=103",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://wiki.unrealengine.com/index.php?title=Compiling_For_Linux&oldid=103"),n("OutboundLink")],1),e._v('"')]),e._v(" "),n("p",[n("a",{attrs:{href:"/index.php?title=Special:Categories",title:"Special:Categories"}},[e._v("Categories")]),e._v(":")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"/index.php?title=Category:Tutorials&action=edit&redlink=1",title:"Category:Tutorials (page does not exist)"}},[e._v("Tutorials")])]),e._v(" "),n("li",[n("a",{attrs:{href:"/index.php?title=Category:Code",title:"Category:Code"}},[e._v("Code")])]),e._v(" "),n("li",[n("a",{attrs:{href:"/index.php?title=Category:Community_Created_Content",title:"Category:Community Created Content"}},[e._v("Community Created Content")])])])])}),[],!1,null,null,null);t.default=o.exports}}]);