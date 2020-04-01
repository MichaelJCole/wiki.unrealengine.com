Hot Reload - Epic Wiki                    

Hot Reload
==========

**Rate this Tutorial:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.10

Contents
--------

*   [1 Overview](#Overview)
*   [2 General](#General)
*   [3 Visual Studio](#Visual_Studio)
    *   [3.1 Tips](#Tips)
*   [4 XCode](#XCode)
*   [5 Notes](#Notes)

Overview
--------

Hot Reload is a feature that allows the Unreal Editor to detect newly compiled .DLLs automatically.

General
-------

The projects contains several configurations by default (see [Compiling Game Projects](https://docs.unrealengine.com/latest/INT/Programming/Development/CompilingProjects/index.html#buildconfiguration)), but for Hot Reload you need to use the _\* Editor_ configurations.

Visual Studio
-------------

You will first need to [Generate\_Visual\_Studio\_Project](/Generate_Visual_Studio_Project "Generate Visual Studio Project"), then open the solution (from the explorer or using File -> Open Visual Studio.). If you open a single file from the editor, the build configurations will not be available.

  
Choose one of the _\* Editor_ configurations from the list [![ConfigurationList.png](https://d26ilriwvtzlb.cloudfront.net/1/10/ConfigurationList.png)](/File:ConfigurationList.png).

Right-click your game project and choose Build to compile. If you selected an _\* Editor_ configuration the the build output will contain **Compiling game modules for hot reload** !

The editor will then reload the DLL as soon as the project is compiled !

### Tips

The toolbar doesn't have a "Build" button by default, to add one follow these steps :

*   Click the small arrow at the right of the toolbar [![ToolbarOptions.png](https://d26ilriwvtzlb.cloudfront.net/3/33/ToolbarOptions.png)](/File:ToolbarOptions.png)
*   Click customize
*   Go to the Commands tab
*   Toolbar -> Standard (or the one you are currently using)
*   Add a new command -> Build -> Generate the solution
*   Click the new button in the preview, and click Move Down until the place is satisfying enough for you.

This steps are detailed in \[[How to: Customize Menus and Toolbars in Visual Studio](https://msdn.microsoft.com/en-us/library/wdee4yb6.aspx)\]

XCode
-----

Please edit and fill me in !

Notes
-----

The "Compile" button in the editor will not use the same build folder as Visual, so be consistent and either always build from Visual/XCode or always from the Unreal Editor. That way you will not be recompiling untouched files.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Hot\_Reload&oldid=17765](https://wiki.unrealengine.com/index.php?title=Hot_Reload&oldid=17765)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")
*   [Getting Started](/Category:Getting_Started "Category:Getting Started")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)