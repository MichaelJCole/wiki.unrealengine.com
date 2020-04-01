UMG Disable Focus Outline - Epic Wiki                    

UMG Disable Focus Outline
=========================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 How to disable/customize the UMG focus outline in C++](#How_to_disable.2Fcustomize_the_UMG_focus_outline_in_C.2B.2B)
    *   [1.2 Using the project settings](#Using_the_project_settings)
*   [2 Related Tutorials](#Related_Tutorials)

Overview
--------

_Author:_ [Moss](/User:Moss "User:Moss") ([talk](/User_talk:Moss "User talk:Moss"))

While working on [Red Godess](http://redgoddessgame.com/) we had an issues with the focus using a GamePad. Always a widget acquired focus it will get a dotted outline that seams to be more for PC keyboard then a GamePad on a console.

We first implemented our own focus system which worked like a charm but later we investigated on how to override the default behavior. The following tutorial is about the right way to handle it :D.

### How to disable/customize the UMG focus outline in C++

First of all we have to create a new class that inherits from UGameViewportClient like the following.

**MyGameViewportClient.h (public header)**

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "Engine/GameViewportClient.h"
#include "MyGameViewportClient.generated.h"
 
UCLASS(Within\=Engine, transient, config\=Engine)
class MYGAME\_API UMyGameViewportClient : public UGameViewportClient
{
        GENERATED\_BODY()
 
public:
    UMyGameViewportClient();
 
    // We will override this methos to only return false, this way we complete disable
    // the focus outline. Consider using your own logic here.
    virtual TOptional<bool\> QueryShowFocus(const EFocusCause InFocusCause) const override;
}

**MyGameViewportClient.cpp (private implementation)**

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "MyGame.h"
#include "Public/MyGameViewportClient.h"
 
UMyGameViewportClient::UMyGameViewportClient()
{
}
 
TOptional<bool\> UMyGameViewportClient::QueryShowFocus(const EFocusCause InFocusCause) const
{
    // Consider your own special logic, you might want to call the super method first.
    return false;
}

Now you just have to add the class into your **DefaultEngine.ini** file and you should be good to go.

\[/Script/Engine.Engine\]
GameViewportClientClassName\=/Script/MyGame.MyGameViewportClient

So that should be all you need to get rid or control the focus outline your own way.

### Using the project settings

As stated by Nick Darnell in the forums, from 4.8 you can customize the behavior directly in the Project Settings.

Project Settings \>> User Interface \>> RenderFocusRule (Set To) Never

There are more option to explore if you are corious. This method will apply to the project itself while the C++ version is a more flexible way, for example, you could enable it if a keyboard is plugged in and disable it if a GamePad is detected.

Related Tutorials
-----------------

[Epic's UMG Documentation](https://docs.unrealengine.com/latest/INT/Engine/UMG/index.html)

[UMG, Create Scrollable List of Clickable Buttons From Dynamic Array, by Rama!](/UMG,_Create_Scrollable_List_of_Clickable_Buttons_From_Dynamic_Array "UMG, Create Scrollable List of Clickable Buttons From Dynamic Array")

[\[Tutorial/ Snippet\] Creating a UMG Widget in C++, and delegate example by WCode.](https://forums.unrealengine.com/showthread.php?52773-Tutorial-Snippet-Creating-a-UMG-Widget-in-C-and-delegate-example)

[\[Tutorial\] UMG, How to extend a UUserWidget:: for UMG in C++.](https://wiki.unrealengine.com/UMG,_How_to_extend_a_UUserWidget::_for_UMG_in_C%2B%2B.)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UMG\_Disable\_Focus\_Outline&oldid=14716](https://wiki.unrealengine.com/index.php?title=UMG_Disable_Focus_Outline&oldid=14716)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)