Notepad++ as basic IDE - Epic Wiki             

Notepad++ as basic IDE
======================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

Overview
--------

The following tutorial is designed to help you setup Notepad++ as a basic alternate IDE to VS2013.  
It assumes you already have [Notepad++](http://notepad-plus-plus.org/) and the [NppExec plugin](http://setup-steps.blogspot.com.au/2013/05/notepad-adds-plug-in-nppexec.html) installed.

How to
------

1\. Download [File:UE4NppIDE.zip](/File:UE4NppIDE.zip "File:UE4NppIDE.zip") and extract it to C:\\Program Files\\Unreal Engine\\

[![Nppide fig1.jpg](https://d3ar1piqh1oeli.cloudfront.net/1/1b/Nppide_fig1.jpg/180px-Nppide_fig1.jpg)](/File:Nppide_fig1.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Nppide_fig1.jpg "Enlarge")

  
2\. Copy npes\_saved.txt & NppExec.ini from C:\\Program Files\\Unreal Engine\\  
to \\Users\\<Username>\\AppData\\Roaming\\Notepad++\\plugins\\config\\.

[![Nppide fig2.jpg](https://d3ar1piqh1oeli.cloudfront.net/9/92/Nppide_fig2.jpg/180px-Nppide_fig2.jpg)](/File:Nppide_fig2.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Nppide_fig2.jpg "Enlarge")

  
3\. Restart Notepad++, if open.

4\. You should end up with four new macros:

[![Nppide fig3.jpg](https://d3ar1piqh1oeli.cloudfront.net/7/7e/Nppide_fig3.jpg/180px-Nppide_fig3.jpg)](/File:Nppide_fig3.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Nppide_fig3.jpg "Enlarge")

  

Usage
-----

Run a macro with one of your projects files open.

Provided the file is in the directory structure of your project, it will automatically locate the appropriate project file to use with Unreal Engine 4.

eg. If <Username>\\Documents\\Unreal Projects\\ShooterGame\\Source\\ShooterGame\\Private\\Player\\ShooterPlayerController.cpp is open,  
the project file used will be <Username>\\Documents\\Unreal Projects\\ShooterGame\\ShooterGame.uproject.

[Kris](/User:Kris "User:Kris")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Notepad%2B%2B\_as\_basic\_IDE&oldid=8294](https://wiki.unrealengine.com/index.php?title=Notepad%2B%2B_as_basic_IDE&oldid=8294)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")