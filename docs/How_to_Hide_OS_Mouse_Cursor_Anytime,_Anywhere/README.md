How to Hide OS Mouse Cursor Anytime, Anywhere - Epic Wiki                    

How to Hide OS Mouse Cursor Anytime, Anywhere
=============================================

Dear Community,

Here is how you can absolutely guaranteed hide the OS mouse cursor if you see it while in-game and want it to not be visible

I put this into a static function library format for your convenience.

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  Show/Hide OS Mouse Cursor
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
static FORCEINLINE void SetOSCursorVisible(bool MakeVisible)
{
	FSlateApplication::Get().GetPlatformApplication()\-\>Cursor\-\>Show(MakeVisible);
}

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

PS: if you are wondering why this is a page unto itself its because it took me about a year to finally learn how to do this, more obvious methods in the codebase were not working :)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_to\_Hide\_OS\_Mouse\_Cursor\_Anytime,\_Anywhere&oldid=5940](https://wiki.unrealengine.com/index.php?title=How_to_Hide_OS_Mouse_Cursor_Anytime,_Anywhere&oldid=5940)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)