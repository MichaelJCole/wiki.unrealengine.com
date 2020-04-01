External Build System Configuration - Epic Wiki                    

External Build System Configuration
===================================

If you don't want to use Visual Studio IDE to compile your projects (f.e. you prefer Sublime text editor), you can build your game without it.

  

Contents
--------

*   [1 Grabbing the MSBuild](#Grabbing_the_MSBuild)
*   [2 Building the game](#Building_the_game)
*   [3 Comments](#Comments)
*   [4 Links](#Links)

Grabbing the MSBuild
--------------------

First, you need to get the [MSBuild](http://msdn.microsoft.com/en-us/library/0k6kkbsd.aspx). This tool is part of .NET Framework, also as part of MSVS installation. Path can be different according to your OS version, f.e. _C:\\Program Files (x86)\\MSBuild\\12.0\\Bin_

I recommend to add its path to the PATH system variable to make your life easier.

  

Building the game
-----------------

This command will build the Shooter Game example (you need to generate .sln files first):

msbuild "<MY\_DOCUMENTS>\\Unreal Projects\\ShooterGame\\ShooterGame.sln" /p:configuration\=Development /p:platform\=Windows

Use **/t:rebuild** to completely rebuild the game solution.

  

Comments
--------

You can use this tool with whatever IDE or text editor you want.

  

Links
-----

*   [MSBuild Reference](http://msdn.microsoft.com/en-us/library/0k6kkbsd.aspx)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=External\_Build\_System\_Configuration&oldid=2378](https://wiki.unrealengine.com/index.php?title=External_Build_System_Configuration&oldid=2378)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)