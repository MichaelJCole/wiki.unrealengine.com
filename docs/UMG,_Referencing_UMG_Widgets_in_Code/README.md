 UMG, Referencing UMG Widgets in Code - Epic Wiki             

 

UMG, Referencing UMG Widgets in Code
====================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

  

Contents
--------

*   [1 Overview: (Tested in 4.7.5)](#Overview:_.28Tested_in_4.7.5.29)
*   [2 Here is the situation:](#Here_is_the_situation:)
*   [3 The next part of this post will cover:](#The_next_part_of_this_post_will_cover:)
*   [4 Prepare Project:](#Prepare_Project:)
    *   [4.1 1\. Create New Map:](#1._Create_New_Map:)
    *   [4.2 2\. Create C++ PlayerController Class:](#2._Create_C.2B.2B_PlayerController_Class:)
    *   [4.3 3\. Create UMG Widget:](#3._Create_UMG_Widget:)
    *   [4.4 4\. Create GameMode and PlayerController Blueprints:](#4._Create_GameMode_and_PlayerController_Blueprints:)
*   [5 Visual Studio:](#Visual_Studio:)
    *   [5.1 1\. Adding Modules:](#1._Adding_Modules:)
    *   [5.2 2\. PlayerController:](#2._PlayerController:)
*   [6 Testing](#Testing)
*   [7 Conclusion](#Conclusion)

**Overview: (Tested in 4.7.5)**
-------------------------------

_Author:_ [Bn\_Green](/index.php?title=User:Bn_Green&action=edit&redlink=1 "User:Bn Green (page does not exist)") ([talk](/index.php?title=User_talk:Bn_Green&action=edit&redlink=1 "User talk:Bn Green (page does not exist)"))  

This is my first contribution to the Unreal awesome community I hope you find it useful especially for newcomers. While I am coding in C++ I always keep in mind that I am not working alone in the project and there is some people is doing stuff with me and I need to use their content in the project.

**Here is the situation:**
--------------------------

An artist is working on the UI using UMG and he made some fancy Widget And now it comes the part where I need to create this widget in C++ and have reference for it so I can use it in future.

**The next part of this post will cover:**
------------------------------------------

1.  How to Make a UMG widget blueprint in the Editor.  
    
2.  Create and add to viewport using C++.  
    
3.  Have a reference to it in a Variable for future use.  
    
4.  Add the widget to the viewport.  
    

**Prepare Project:**
--------------------

First lets create new blank project based on C++ and call it whatever you like.  
Then make this folder hierarchy:  

1.  Content Folder.  
    
2.  Maps Folder -> Create new Blank Map.  
    
3.   Blueprints Folder -> Widgets Folder.  
    

### **1\. Create New Map:**

Create new blank map and I called mine "MainMenu" and don't forget to save it.  

  
[![CreatNewMap.png](https://d3ar1piqh1oeli.cloudfront.net/d/dd/CreatNewMap.png/700px-CreatNewMap.png)](/index.php?title=File:CreatNewMap.png)

  

### **2\. Create C++ PlayerController Class:**

Go To C++ Classes Folder->MyProject  
And Create new C++ PlayerController Class Call it “MyPlayerController”

  
[![CreatePC.png](https://d3ar1piqh1oeli.cloudfront.net/c/c5/CreatePC.png/700px-CreatePC.png)](/index.php?title=File:CreatePC.png)

### **3\. Create UMG Widget:**

Now Go to Blueprints Folder -> Widgets Folder. And create new Widget Blueprint Call it “MainMenu”.

  
[![CreateNewWidgetUMG.png](https://d3ar1piqh1oeli.cloudfront.net/4/47/CreateNewWidgetUMG.png/700px-CreateNewWidgetUMG.png)](/index.php?title=File:CreateNewWidgetUMG.png)

  
Open the “MainMenu” widget and let's make a button Called “QuitBTN” then assign onClicked Event

  
[![CreateBTN.png](https://d3ar1piqh1oeli.cloudfront.net/1/1b/CreateBTN.png/700px-CreateBTN.png)](/index.php?title=File:CreateBTN.png)

  
and do the following

[![QuitBTN.png](https://d26ilriwvtzlb.cloudfront.net/6/6a/QuitBTN.png)](/index.php?title=File:QuitBTN.png)

  
now we have ready widget with a button that exit the game on clicked using Blueprints.

### **4\. Create GameMode and PlayerController Blueprints:**

We need to create 2 more Blueprints and we are done from the editor for now.  

1.  Create Game Mode Blueprint “BP\_GameMode” Based on ProjectNameGameMode.  
    
2.  Create Player Controller Blueprint “BP\_PlayerController” Based on PlayerController Class we created earlier.  
    

[![PCandGM.png](https://d3ar1piqh1oeli.cloudfront.net/b/b8/PCandGM.png/400px-PCandGM.png)](/index.php?title=File:PCandGM.png)

  
[![PCandGM2.png](https://d3ar1piqh1oeli.cloudfront.net/6/67/PCandGM2.png/700px-PCandGM2.png)](/index.php?title=File:PCandGM2.png)

  

**Visual Studio:**
------------------

### **1\. Adding Modules:**

in order to use UMG in C++ you need to Add the following Modules in ProjectNameBuild.CS file

`"UMG", "Slate", "SlateCore`

In this line:

<syntaxhighlight lang="cpp"> //ProjectNameBuild.CS

PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "UMG", "Slate", "SlateCore" });

</syntaxhighlight>

### **2\. PlayerController:**

Open your MyPlayerController.h  
and we will make some variables and overriding the BeginPlay() function.  
PS: Better to add our widget reference to a [singleton class](/index.php?title=Global_Data_Access,_Data_Storage_Class_Accessible_From_Any_CPP_or_BP_Class_During_Runtime "Global Data Access, Data Storage Class Accessible From Any CPP or BP Class During Runtime").

<syntaxhighlight lang="cpp">

//MyPlayerController.h

UCLASS() class MYPROJECT\_API AMyPlayerController : public APlayerController { GENERATED\_BODY()

public: // Note: that I am using forward declaration Because I am not including the // widget in the header and to prevent circular dependency. // You don't need to do that if you include the Widget Class in the .h // Forward declaration is just putting "class" before the class name so the compiler know it's a // class but it's not included in the header and don't freak out. Ex. “class UUserWidget”

// Reference UMG Asset in the Editor UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Widgets") TSubclassOf<class UUserWidget> wMainMenu;

// Variable to hold the widget After Creating it. UUserWidget\* MyMainMenu;

// Override BeginPlay() virtual void BeginPlay() override;

};

</syntaxhighlight>

open your MyPlayerController.cpp

include this file to your cpp

<syntaxhighlight lang="cpp"> //MyPlayerController.cpp

  
// include

1.  include "Blueprint/UserWidget.h"

</syntaxhighlight>

BeginPlay() Function <syntaxhighlight lang="cpp"> //MyPlayerController.cpp

  
void AMyPlayerController::BeginPlay() { Super::BeginPlay();

if (wMainMenu) // Check if the Asset is assigned in the blueprint. { // Create the widget and store it. MyMainMenu = CreateWidget<UUserWidget>(this, wMainMenu);

// now you can use the widget directly since you have a referance for it. // Extra check to make sure the pointer holds the widget. if (MyMainMenu) { //let add it to the view port MyMainMenu->AddToViewport(); }

//Show the Cursor. bShowMouseCursor = true; }

}

</syntaxhighlight>

**Testing**
-----------

Now Open the Editor and Go to world Setting and assign our BP\_GameMode As the Current Game Mode for the Level.

  
[![WorldSettingsChange.png](https://d3ar1piqh1oeli.cloudfront.net/1/1d/WorldSettingsChange.png/700px-WorldSettingsChange.png)](/index.php?title=File:WorldSettingsChange.png)

  
and use our early created “BP\_PlayerController” As the Active Controller.

  
[![AssignPC.png](https://d3ar1piqh1oeli.cloudfront.net/9/98/AssignPC.png/400px-AssignPC.png)](/index.php?title=File:AssignPC.png)

  
Open the “BP\_PlayerController” and Assign the widget.

  
[![AssignWidget.png](https://d3ar1piqh1oeli.cloudfront.net/e/ed/AssignWidget.png/400px-AssignWidget.png)](/index.php?title=File:AssignWidget.png)

  
Press Play and Hurrray we have our Menu Shown.

  
[![FinalResult.png](https://d3ar1piqh1oeli.cloudfront.net/8/87/FinalResult.png/700px-FinalResult.png)](/index.php?title=File:FinalResult.png)

  

**Conclusion**
--------------

Now we are done and you have a working widget that you can control from C++ Code you can add more functionality and control your menu flow from code whenever you need.

From here you can extend your UMG Widgets the same way following this awesome tutorial By WCode:

[UMG,\_How\_to\_extend\_a\_UUserWidget::\_for\_UMG\_in\_C++.](/index.php?title=UMG,_How_to_extend_a_UUserWidget::_for_UMG_in_C%2B%2B. "UMG, How to extend a UUserWidget:: for UMG in C++.")

Posted By [Bn Green](/index.php?title=User:Bn_Green&action=edit&redlink=1 "User:Bn Green (page does not exist)") ([talk](/index.php?title=User_talk:Bn_Green&action=edit&redlink=1 "User talk:Bn Green (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UMG,\_Referencing\_UMG\_Widgets\_in\_Code&oldid=123](https://wiki.unrealengine.com/index.php?title=UMG,_Referencing_UMG_Widgets_in_Code&oldid=123)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")