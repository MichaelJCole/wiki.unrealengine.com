 How To Package Plugins For UE4 Marketplace - Epic Wiki             

 

How To Package Plugins For UE4 Marketplace
==========================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 .Uplugin White List](#.Uplugin_White_List)
    *   [2.1 Avoiding Android Error Outs](#Avoiding_Android_Error_Outs)
*   [3 The Batch File](#The_Batch_File)
*   [4 Extremely Important Major Look At This First Please](#Extremely_Important_Major_Look_At_This_First_Please)
*   [5 How to Not Nuke Your Entire Project](#How_to_Not_Nuke_Your_Entire_Project)
*   [6 Safe Use Case](#Safe_Use_Case)
*   [7 What is %CD% ?](#What_is_.25CD.25_.3F)
*   [8 How to see the output? The screen disappears?](#How_to_see_the_output.3F_The_screen_disappears.3F)
*   [9 Conclusion](#Conclusion)

Overview
--------

**Author:** [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Dear Community,

Here is the process you can use to package your plugin using Epic's Clang compiling process that will automatically generate all the binaries for you!

This is the same process I used in tandem with UE4 Marketplace engineers to get my Rama Melee Plugin and Rama Save System Plugin on the Marketplace.

Again, the output of this automation process is every packaged binary for every platform you have whitelisted (see below). It is an extremely handy tool!

Please note you should be sure to specify your whitelist to avoid having the automation tool trying to compile for platforms you dont/can't support, especially true if you dont have the Android runtime installed on your computer.

The CLang compiler is more rigorous than Visual Studio and so if this process works for you, you are set!

.Uplugin White List
-------------------

Here is my Victory Plugin .uplugin descriptor file:

{
	"FileVersion" : 3,
	"Version" : 1,
	"VersionName" : "1.0",
	"FriendlyName" : "Victory Plugin",
	"Description" : "120+ Custom Blueprint Nodes For You! <3 Rama",
	"Category" : "Rama",
	"CreatedBy" : "Rama",
	"CreatedByURL" : "http://www.ue4code.com",
	"DocsURL" : "http://www.ue4code.com",
	"MarketplaceURL" : "http://www.ue4code.com",
	"SupportURL" : "http://www.ue4code.com",
	"EnabledByDefault" : true,
	"CanContainContent" : false,
	"IsBetaVersion" : false,
	"Installed" : true,
	"RequiresBuildPlatform" : false,
	"Modules" :
	\[
		{
			"Name" : "VictoryBPLibrary",
			"Type" : "Runtime",
			"LoadingPhase" : "PreDefault",
			"WhitelistPlatforms" :
			\[
				"Win64",
				"Win32",
				"HTML5"
			\]
		}
	\]
}

### Avoiding Android Error Outs

The above is how you avoid getting Android errors when you are not trying to support android.

You could also specify Mac, Linux, or IOS or PS4 or XboxOne if you support those platforms

The Batch File
--------------

JoyCompilePlugin.bat

"C:\\Program Files (x86)\\Epic Games\\4.12\\Engine\\Build\\BatchFiles\\RunUAT.bat" BuildPlugin Plugin="C:\\Users\\Rama\\Documents\\Unreal Projects\\Sun\\Plugins\\VictoryPlugin\\VictoryBPLibrary.uplugin" Package="%CD%\\PluginPackaged" -Rocket

Or in more recent engine versions:

 "C:\\Program Files\\Epic Games\\UE\_4.16\\Engine\\Build\\BatchFiles\\RunUAT.bat" BuildPlugin -Plugin="D:\\RamaPlugins\\RamaSaveSystem\\Plugins\\RamaSaveSystem\\RamaSaveSystem.uplugin" -Package="%CD%\\PluginStaging\_ALL\\UE4\_416" -Rocket

You can create a text file and rename it to .bat, if windows doesnt complain about extension change and it stays as text make sure you have enabled showing of file extensions in windows. (google "windows show file extensions")

Extremely Important Major Look At This First Please
---------------------------------------------------

Recommended Work Flow

**First time I used this tool it nuked my entire project** because I specified output directory to be same place where my .uproject was located!

I recommend you do the following

1\. Put my batch file above in its own subdirectory of your project, or somewhere completely different

2\. Even then, specify a subdirectory of this new directory, just to avoid your .bat file getting nuked.

3\. Subdirectory can be specified as %CD%/subdir for ease of use.

How to Not Nuke Your Entire Project
-----------------------------------

!!! Warning !!!

I hope I have made it clear, do NOT run this .bat file in the same directory as your .uproject, your entire project will get nuked with no recycle bin hope of recovery! ( I know from experience )

So to be safe, simply dont ever run this .bat file anywhere near your actual project!

♥

Rama

Safe Use Case
-------------

Put my .bat file shown above in here:

 C:/NiceIsolatedUnusedDirectoryThatCanGetNuked

and then specify output directory:

 C:/NiceIsolatedUnusedDirectoryThatCanGetNuked/output

Now when you run the .bat file you will get to keep the bat file, and your project!

PS: I have to say all this loudly since this is a public document and can be read/translated in many languages.

What is %CD% ?
--------------

This will be translated as the current directory that you launched the .bat file from.

So if you store my batchfile here:

 C:/MyStagingDir/JoyCompilePlugin.bat

then

 %CD%/output

will be:

 C:/MyStagingDir/output

How to see the output? The screen disappears?
---------------------------------------------

Dont run the .bat file from within windows explorer, instead

1\. right click on the folder where you put the .bat file

2\. hold down left shift

3\. right click with shift held down

4\. now you will see an additional option **"Open Command Prompt here"**

5\. now run the bat file, type Joy and then press tab and it will auto complete

Now if you get any errors, the errors will stay visible to you!

Victory!

Now you can compile your plugin using the UE4 Marketplace C++ coding standard too!

Conclusion
----------

Now you can practice the UE4 Marketplace workflow before submitting your first plugin, and also update your UE4 marketplace plugins more easily!

Enjoy!

♥

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_To\_Package\_Plugins\_For\_UE4\_Marketplace&oldid=733](https://wiki.unrealengine.com/index.php?title=How_To_Package_Plugins_For_UE4_Marketplace&oldid=733)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")