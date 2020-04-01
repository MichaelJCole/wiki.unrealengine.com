Zip Utility Plugin - Epic Wiki                    

Zip Utility Plugin
==================

  

Name

Zip Utility Plugin

Category

Utility

Author

Getnamo

Overview
========

An event-driven, multi-threaded, C++ & blueprint accessible 7zip archiver and file manipulation plugin for Unreal Engine 4. Built on [7zip-cpp](https://github.com/getnamo/7zip-cpp) modernization of the SevenZip++.

Supports Zip, 7-Zip, GZip, BZip2, RAR (extract only), TAR, ISO, CAB, LZMA, LZMA86.

See the [main plugin thread](https://forums.unrealengine.com/showthread.php?95022-Plugin-ZipUtility-(7zip)) for the latest downloads and updates.

Quick Setup
-----------

1.  [Download latest release](https://github.com/getnamo/ZipUtility-ue4/releases)
2.  Create new or choose project.
3.  Browse to your project folder (typically found at _Documents/Unreal Project/{Your Project Root}_)
4.  Copy _Plugins_ folder into your Project root.
5.  Restart the Editor and open your project again.
6.  When your project has reloaded, the plugin should be enabled and ready to use.

Quick Example
-------------

Right Click in the event graph for a list of Zip Utility Blueprint functions

[![ListZipUtilityFunctions.png](https://d26ilriwvtzlb.cloudfront.net/7/70/ListZipUtilityFunctions.png)](/File:ListZipUtilityFunctions.png)

If you wish to e.g. unzip an archive use the Unzip function.

[![UnzipArchive.png](https://d26ilriwvtzlb.cloudfront.net/2/25/UnzipArchive.png)](/File:UnzipArchive.png)

If you wish to receive callbacks add a ZipUtilityInterface to your blueprint.

[![ZipUtilityInterface.png](https://d26ilriwvtzlb.cloudfront.net/a/a4/ZipUtilityInterface.png)](/File:ZipUtilityInterface.png)

  
Same functionality is available in C++.

Documentation and Discussion
----------------------------

For all use cases please see the up-to-date [Github Readme](https://github.com/getnamo/ZipUtility-ue4).

Post your questions and suggestions at the [main plugin thread](https://forums.unrealengine.com/showthread.php?95022-Plugin-ZipUtility-(7zip)).

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Zip\_Utility\_Plugin&oldid=17832](https://wiki.unrealengine.com/index.php?title=Zip_Utility_Plugin&oldid=17832)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)