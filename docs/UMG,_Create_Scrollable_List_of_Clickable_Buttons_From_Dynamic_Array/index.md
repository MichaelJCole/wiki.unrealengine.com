 UMG, Create Scrollable List of Clickable Buttons From Dynamic Array - Epic Wiki             

 

UMG, Create Scrollable List of Clickable Buttons From Dynamic Array
===================================================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Main Widget](#Main_Widget)
    *   [2.1 Create Widget BP](#Create_Widget_BP)
    *   [2.2 Add Variable Enabled Scroll Box](#Add_Variable_Enabled_Scroll_Box)
*   [3 Secondary List Item Widget](#Secondary_List_Item_Widget)
    *   [3.1 Create Bind Event](#Create_Bind_Event)
*   [4 My Character BP](#My_Character_BP)
*   [5 Create Joy UI](#Create_Joy_UI)
*   [6 Add List Items](#Add_List_Items)
*   [7 Create Button And Set Text](#Create_Button_And_Set_Text)
*   [8 Significant Improvements in UE4 4.5](#Significant_Improvements_in_UE4_4.5)
*   [9 Conclusion](#Conclusion)
*   [10 FAQ](#FAQ)
    *   [10.1 How do I return the Button as type Object?](#How_do_I_return_the_Button_as_type_Object.3F)
*   [11 Related Tutorials](#Related_Tutorials)

Overview
--------

[![RamaUMGTitle.jpg](https://d3ar1piqh1oeli.cloudfront.net/6/63/RamaUMGTitle.jpg/700px-RamaUMGTitle.jpg)](/index.php?title=File:RamaUMGTitle.jpg)

_Author:_ [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Dear Community,

In this tutorial I show you, mostly through pictures, how to make a UMG widget that is a scrollable list of clickable buttons, created during game time from a dynamic array!

In other words, you can use this tutorial to fill a scrolling list with any text items you want, from a simple String Array!

And each of the buttons you create from the dynamic array can perform any BP actions you want!

The setup for this is actually quite simple, compared to the result of being able to add as many clickable buttons as you want to a scrolling list, by just adding entries to a BP String Array!

Main Widget
-----------

### Create Widget BP

After enabling UMG via Editor Preferences -> Experimental,

Restart the editor and right click to add a UMG widget!

[![UMGStep1.jpg](https://d3ar1piqh1oeli.cloudfront.net/6/60/UMGStep1.jpg/700px-UMGStep1.jpg)](/index.php?title=File:UMGStep1.jpg)

### Add Variable Enabled Scroll Box

Add a Panel-> scroll box and make sure it is a variable, and give it a name of your choosing!

[![MainWidget.jpg](https://d3ar1piqh1oeli.cloudfront.net/b/b4/MainWidget.jpg/700px-MainWidget.jpg)](/index.php?title=File:MainWidget.jpg)

Secondary List Item Widget
--------------------------

Create a second widget that is simply a TextBlock wrapped around by a Button.

Make sure both are set to be variables!

[![SecondWidget.jpg](https://d3ar1piqh1oeli.cloudfront.net/8/82/SecondWidget.jpg/700px-SecondWidget.jpg)](/index.php?title=File:SecondWidget.jpg)

### Create Bind Event

Create the bind BP function after clicking on "bind" for the buttons On Click event!

[![BindEvent.jpg](https://d3ar1piqh1oeli.cloudfront.net/c/c4/BindEvent.jpg/700px-BindEvent.jpg)](/index.php?title=File:BindEvent.jpg)

My Character BP
---------------

Open up your my character BP and create this setup!

[![UMG Mycharacter1.jpg](https://d3ar1piqh1oeli.cloudfront.net/d/d2/UMG_Mycharacter1.jpg/700px-UMG_Mycharacter1.jpg)](/index.php?title=File:UMG_Mycharacter1.jpg)

Create Joy UI
-------------

[![CreateJoyUI.jpg](https://d3ar1piqh1oeli.cloudfront.net/5/57/CreateJoyUI.jpg/700px-CreateJoyUI.jpg)](/index.php?title=File:CreateJoyUI.jpg)

Add List Items
--------------

The String Array called ListItems is a global variable for the My Character BP !

You could edit this variable from anywhere in any other BP to change how the UMG widget creates itself!

Please note that I am retrieving the variable-enabled Scroll Box, called JoyList, from the main widget variable we saved off when creating the main widget.

So I am adding the new buttons directly to the scroll box JoyList!

[![UMG MyCharacter2.jpg](https://d3ar1piqh1oeli.cloudfront.net/5/5f/UMG_MyCharacter2.jpg/700px-UMG_MyCharacter2.jpg)](/index.php?title=File:UMG_MyCharacter2.jpg)

Create Button And Set Text
--------------------------

The return type of this function is UObject!

Please very carefully note, you cannot return the created widget itself, if you try to add that to the Scroll Box it wont show up, you instead add the button that wraps around the Text Block!

[![UMG MyCharacter3.jpg](https://d3ar1piqh1oeli.cloudfront.net/a/ae/UMG_MyCharacter3.jpg/700px-UMG_MyCharacter3.jpg)](/index.php?title=File:UMG_MyCharacter3.jpg)

Significant Improvements in UE4 4.5
-----------------------------------

As of 4.5

1\. You dont have to cast the widget after you create it, you can use the special create widget node that returns the widget already casted

2\. Add to Viewport and user input are now separated, so you can specify exactly how you want your menu to work. The menu can work with game viewport input or can take away control from the game viewport.

3\. Show mouse cursor is done via the Player Controller.

[![UMG Tutorial Update Rama.jpg](https://d3ar1piqh1oeli.cloudfront.net/4/4e/UMG_Tutorial_Update_Rama.jpg/900px-UMG_Tutorial_Update_Rama.jpg)](/index.php?title=File:UMG_Tutorial_Update_Rama.jpg)

Conclusion
----------

By adding the button of the secondary widget to the scroll box of the first widget, I have enabled you to create an easy-to-use dynamic list of scrollable buttons that can perform any BP actions when clicked!

Enjoy!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

FAQ
---

### How do I return the Button as type Object?

If you are having trouble setting the return type of the function to be Object, please note you can use the search filter to find it more easily! Here's a pic!

[![ObjectInSearchFilter.jpg](https://d3ar1piqh1oeli.cloudfront.net/0/0c/ObjectInSearchFilter.jpg/700px-ObjectInSearchFilter.jpg)](/index.php?title=File:ObjectInSearchFilter.jpg)

Related Tutorials
-----------------

[Epic's UMG Documentation](https://docs.unrealengine.com/latest/INT/Engine/UMG/index.html)

[How to extend UserWidget in C++, by WCode!](/index.php?title=UMG,_How_to_extend_a_UUserWidget::_for_UMG_in_C%2B%2B. "UMG, How to extend a UUserWidget:: for UMG in C++.")

  
[How to add the widget itself, not the button](/index.php?title=Adding_Blueprints_To_Scrollbox "Adding Blueprints To Scrollbox")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UMG,\_Create\_Scrollable\_List\_of\_Clickable\_Buttons\_From\_Dynamic\_Array&oldid=157](https://wiki.unrealengine.com/index.php?title=UMG,_Create_Scrollable_List_of_Clickable_Buttons_From_Dynamic_Array&oldid=157)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")