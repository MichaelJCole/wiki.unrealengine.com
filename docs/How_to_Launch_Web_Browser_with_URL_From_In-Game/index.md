How to Launch Web Browser with URL From In-Game - Epic Wiki                    

How to Launch Web Browser with URL From In-Game
===============================================

Overview
--------

_Author_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

This is how you can launch the OS default web browser with your chosen URL from inside the game via C++!

CPP
---

FString TheURL \= "http://www.google.com/";
FPlatformProcess::LaunchURL( \*TheURL, nullptr, nullptr );

Summary
-------

[More information can be found in the documentation.](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/GenericPlatform/FGenericPlatformProcess/LaunchURL/index.html)

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_to\_Launch\_Web\_Browser\_with\_URL\_From\_In-Game&oldid=5554](https://wiki.unrealengine.com/index.php?title=How_to_Launch_Web_Browser_with_URL_From_In-Game&oldid=5554)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)