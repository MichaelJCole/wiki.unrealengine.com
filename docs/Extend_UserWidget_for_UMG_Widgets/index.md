Extend UserWidget for UMG Widgets - Epic Wiki                    

Extend UserWidget for UMG Widgets
=================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 1: We start of by creating a new Blank Project from the launcher.](#1:_We_start_of_by_creating_a_new_Blank_Project_from_the_launcher.)
*   [3 2: After compiling](#2:_After_compiling)
*   [4 3: In your new project](#3:_In_your_new_project)
*   [5 4: Add new class](#4:_Add_new_class)
*   [6 5: Add the Dependency Module](#5:_Add_the_Dependency_Module)
*   [7 6: Extending the User Widget](#6:_Extending_the_User_Widget)
*   [8 7: Re-compile your project](#7:_Re-compile_your_project)
*   [9 8: Set Parent Class](#8:_Set_Parent_Class)
*   [10 9: Compiling Widget and Notes](#9:_Compiling_Widget_and_Notes)
*   [11 Conclusion](#Conclusion)
*   [12 Project Download](#Project_Download)
*   [13 Related Tutorials](#Related_Tutorials)

Overview
--------

_Author:_ [WCode](/User:WCode "User:WCode") ([talk](/index.php?title=User_talk:WCode&action=edit&redlink=1 "User talk:WCode (page does not exist)"))

Some months back i did a tutorial on how to extend a User Widget for UMG Widgets. Now that UMG is more mature and have gotten scientifically better. I realize that the process of extending the User Widget class is much simpler.

1: We start of by creating a new Blank Project from the launcher.
-----------------------------------------------------------------

[![UMGExtedUserWidget 1a.png](https://d3ar1piqh1oeli.cloudfront.net/4/44/UMGExtedUserWidget_1a.png/180px-UMGExtedUserWidget_1a.png)](/File:UMGExtedUserWidget_1a.png)

[![](/skins/common/images/magnify-clip.png)](/File:UMGExtedUserWidget_1a.png "Enlarge")

2: After compiling
------------------

After compiling the new project and launching your new project you should have something like this in your new project folder.

[![UMGExtedUserWidget 2a.png](https://d3ar1piqh1oeli.cloudfront.net/f/fc/UMGExtedUserWidget_2a.png/180px-UMGExtedUserWidget_2a.png)](/File:UMGExtedUserWidget_2a.png)

[![](/skins/common/images/magnify-clip.png)](/File:UMGExtedUserWidget_2a.png "Enlarge")

3: In your new project
----------------------

In your new project in the top left corner Press on the Option «File» File >Add Code to Project

[![UMGExtedUserWidget 3a.png](https://d3ar1piqh1oeli.cloudfront.net/1/1e/UMGExtedUserWidget_3a.png/180px-UMGExtedUserWidget_3a.png)](/File:UMGExtedUserWidget_3a.png)

[![](/skins/common/images/magnify-clip.png)](/File:UMGExtedUserWidget_3a.png "Enlarge")

4: Add new class
----------------

In the new Window that opens up check «Show All Classes» in the top right corner. And enter UserWidget in the search field at the top of the class list. And Select UserWidget.

[![UMGExtedUserWidget 4a.png](https://d3ar1piqh1oeli.cloudfront.net/2/23/UMGExtedUserWidget_4a.png/180px-UMGExtedUserWidget_4a.png)](/File:UMGExtedUserWidget_4a.png)

[![](/skins/common/images/magnify-clip.png)](/File:UMGExtedUserWidget_4a.png "Enlarge")

**Note:** I got a «Error» when making this tutorial related to the editor was unable to hot-reload. Closing the Editor and compiling manualy was the solution.

5: Add the Dependency Module
----------------------------

Now in you IDE (I am using MS Visual Studio) you need to edit your Build file for your project. You need to add the Dependency Module «UMG» to the project.

The edited line in you ProjectName.Build.cs file should be.

PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "UMG" });

Also you need to uncomment the modules for Slate as shown.

// Uncomment if you are using Slate UI
PrivateDependencyModuleNames.AddRange(new string\[\] { "Slate", "SlateCore" });

Here is a image showing the edited Build file.

[![UMGExtedUserWidget 5a.png](https://d3ar1piqh1oeli.cloudfront.net/d/da/UMGExtedUserWidget_5a.png/180px-UMGExtedUserWidget_5a.png)](/File:UMGExtedUserWidget_5a.png)

[![](/skins/common/images/magnify-clip.png)](/File:UMGExtedUserWidget_5a.png "Enlarge")

6: Extending the User Widget
----------------------------

In order to see the difference and for the sake of this tutorial we now open the MyUserWidget.h file in your IDE. And we add the following member to our new UserWidget class.

public:
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "My New User Widget")
		FString MyNewWidgetName;

[![UMGExtedUserWidget 6a.png](https://d3ar1piqh1oeli.cloudfront.net/b/bc/UMGExtedUserWidget_6a.png/180px-UMGExtedUserWidget_6a.png)](/File:UMGExtedUserWidget_6a.png)

[![](/skins/common/images/magnify-clip.png)](/File:UMGExtedUserWidget_6a.png "Enlarge")

7: Re-compile your project
--------------------------

Now re-compile your project and open up your project in the editor. And create a new Widget Blueprint.

[![UMGExtedUserWidget 7a.png](https://d3ar1piqh1oeli.cloudfront.net/5/56/UMGExtedUserWidget_7a.png/180px-UMGExtedUserWidget_7a.png)](/File:UMGExtedUserWidget_7a.png)

[![](/skins/common/images/magnify-clip.png)](/File:UMGExtedUserWidget_7a.png "Enlarge")

8: Set Parent Class
-------------------

Open up the new Widget Blueprint and select the Graph in the top right corner. And press on the Class Settings button at the top left. (To the right of the compile button.) In the Details panel (To the bottom left in my Editor) find the category «Class Options» Press on the dropdown menu for Parent Class and select your new User Widget class. (MyUserWidget in this case).

[![UMGExtedUserWidget 8a.png](https://d3ar1piqh1oeli.cloudfront.net/0/0e/UMGExtedUserWidget_8a.png/180px-UMGExtedUserWidget_8a.png)](/File:UMGExtedUserWidget_8a.png)

[![](/skins/common/images/magnify-clip.png)](/File:UMGExtedUserWidget_8a.png "Enlarge")

9: Compiling Widget and Notes
-----------------------------

Compile the Widget and you are done. If you can not see the new member we added earlier make sure you have checked. «Show Inherited Variabels»

[![UMGExtedUserWidget 9a.png](https://d26ilriwvtzlb.cloudfront.net/f/f2/UMGExtedUserWidget_9a.png)](/File:UMGExtedUserWidget_9a.png)

[![](/skins/common/images/magnify-clip.png)](/File:UMGExtedUserWidget_9a.png "Enlarge")

And you will see the new member in your Blueprint Tab.

[![UMGExtedUserWidget 9b.png](https://d3ar1piqh1oeli.cloudfront.net/0/0e/UMGExtedUserWidget_9b.png/180px-UMGExtedUserWidget_9b.png)](/File:UMGExtedUserWidget_9b.png)

[![](/skins/common/images/magnify-clip.png)](/File:UMGExtedUserWidget_9b.png "Enlarge")

**Notes:** That is it this is got alot simpler then before. But i like to list some headers that may come in handy down the road.

	"Runtime/UMG/Public/UMG.h"
	"Runtime/UMG/Public/UMGStyle.h"
	"Runtime/UMG/Public/Slate/SObjectWidget.h"
	"Runtime/UMG/Public/IUMGModule.h"
	"Runtime/UMG/Public/Blueprint/UserWidget.h"

Conclusion
----------

You are done, now you have a simple and fast way to extend the user widget. From everything from Data Storage to picking up "events" delegates and so on.

Hope this was helpfull.  

WCode

Project Download
----------------

Here is a link to a Project Download it contains all the information displayed here.  
As well as a copy of the finished tutorial.  
[https://drive.google.com/file/d/0B7MMiQc2raPVZmxBYVFqWGpoOGs/view?usp=sharing](https://drive.google.com/file/d/0B7MMiQc2raPVZmxBYVFqWGpoOGs/view?usp=sharing)

Related Tutorials
-----------------

[Epic's UMG Documentation](https://docs.unrealengine.com/latest/INT/Engine/UMG/index.html)

[UMG, Create Scrollable List of Clickable Buttons From Dynamic Array, by Rama!](/UMG,_Create_Scrollable_List_of_Clickable_Buttons_From_Dynamic_Array "UMG, Create Scrollable List of Clickable Buttons From Dynamic Array")

[\[Tutorial/ Snippet\] Creating a UMG Widget in C++, and delegate example by WCode.](https://forums.unrealengine.com/showthread.php?52773-Tutorial-Snippet-Creating-a-UMG-Widget-in-C-and-delegate-example)

[\[Tutorial\] UMG, How to extend a UUserWidget:: for UMG in C++.](https://wiki.unrealengine.com/UMG,_How_to_extend_a_UUserWidget::_for_UMG_in_C%2B%2B.)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Extend\_UserWidget\_for\_UMG\_Widgets&oldid=16753](https://wiki.unrealengine.com/index.php?title=Extend_UserWidget_for_UMG_Widgets&oldid=16753)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)