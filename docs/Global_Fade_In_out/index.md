Global Fade In out - Epic Wiki                     

Global Fade In out
==================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 The custom UGameViewportClient](#The_custom_UGameViewportClient)
    *   [1.2 Our fade logic](#Our_fade_logic)
    *   [1.3 Using the screen fade](#Using_the_screen_fade)
    *   [1.4 Summary](#Summary)

Overview
--------

_Original Author:_ [Moss](/User:Moss "User:Moss")

Hi guys!

Doing a global fade in out is very simple in UE4, you do not need to create any fancy PP materials or using an animation in UMG. The following tutorial will implement the effect by using a custom **UGameViewportClient**.

### The custom UGameViewportClient

First of all we will create a new C++ class that inherits from **UGameViewportClient**, for now we will just create an empty class and register it in your **DefaultEngine.ini** file.

Our header should look similar to the following:

// Copyright 2015 Moritz Wundke. All Rights Reserved.
// Released under MIT
 
#pragma once
 
#include "Engine/GameViewportClient.h"
#include "CustomGameViewportClient.generated.h"
 
/\*\*
 \* A simple UGameViewportClient used to handle a global fade in/out
 \*/
UCLASS()
class MYGAME\_API UCustomGameViewportClient: public UGameViewportClient
{
        GENERATED\_BODY()
 
};

And an empty _cpp_ file such as:

// Copyright 2015 Moritz Wundke. All Rights Reserved.
// Released under MIT
 
#include "MyGame.h"
#include "CustomGameViewportClient.h"

To tell the engine to use our custom class instead of the base engine version we have to add the following into the projects **DefaultEngine.ini** file.

\[/Script/Engine.Engine\]
GameViewportClientClassName\=/Script/MyGame.CustomGameViewportClient

### Our fade logic

The idea is to add the fading logic into our newly created ViewportClient. The _cpp_ and the _h_ should be something like the following.

// Copyright 2015 Moritz Wundke. All Rights Reserved.
// Released under MIT
 
#pragma once
 
#include "Engine/GameViewportClient.h"
#include "CustomGameViewportClient.generated.h"
 
/\*\*
 \* A simple UGameViewportClient used to handle a global fade in/out
 \*/
UCLASS()
class MYGAME\_API UCustomGameViewportClient: public UGameViewportClient
{
        GENERATED\_BODY()
 
public:
 
        /\*\*
         \* Called after rendering the player views and HUDs to render menus, the console, etc.
         \* This is the last rendering call in the render loop
         \*
         \* @param Canvas        The canvas to use for rendering.
         \*/
        virtual void PostRender( UCanvas\* Canvas ) override;
 
        /\*\* Clear fading state \*/
        virtual void ClearFade();
 
        /\*\* Used for Fade to and from black \*/
        virtual void Fade(const float Duration, const bool bToBlack);
 
        /\*\* Does the actual screen fading \*/
        void DrawScreenFade(UCanvas\* Canvas);
 
private:
 
        // Values used by our screen fading
        uint32 bFading : 1;
        uint32 bToBlack : 1; // Fading to black will be applied even if alpha is 1
        float FadeAlpha;
        float FadeStartTime;
        float FadeDuration;
};

// Copyright 2015 Moritz Wundke. All Rights Reserved.
// Released under MIT
 
#include "MyGame.h"
#include "CustomGameViewportClient.h"
 
void UCustomGameViewportClient::PostRender(UCanvas\* Canvas)
{
        Super::PostRender(Canvas);
 
        // Fade if requested, you could use the same DrawScreenFade method from any canvas such as the HUD
        if (bFading)
        {
              DrawScreenFade(Canvas);
        }
}
 
void UCustomGameViewportClient::ClearFade()
{
        bFading \= false;
}
 
void UCustomGameViewportClient::Fade(const float Duration, const bool bToBlack)
{
        const UWorld\* World \= GetWorld();
        if (World)
        {
                bFading \= true;
                this\-\>bToBlack \= bToBlack;
                FadeDuration \= Duration;
                FadeStartTime \= World\-\>GetTimeSeconds();
        }
}
 
void UCustomGameViewportClient::DrawScreenFade(UCanvas\* Canvas)
{
        if (bFading)
        {
                const UWorld\* World \= GetWorld();
                if (World)
                {
                        const float Time \= World\-\>GetTimeSeconds();
                        const float Alpha \= FMath::Clamp((Time \- FadeStartTime) / FadeDuration, 0.f, 1.f);
 
                        // Make sure that we stay black in a fade to black
                        if (Alpha \== 1.f && !bToBlack)
                        {
                                bFading \= false;
                        }
                        else
                        {
                                FColor OldColor \= Canvas\-\>DrawColor;
                                FLinearColor FadeColor \= FLinearColor::Black;
                                FadeColor.A \= bToBlack ? Alpha : 1 \- Alpha;
                                Canvas\-\>DrawColor \= FadeColor.ToFColor(true); // TheJamsh: "4.10 cannot convert directly to FColor, so need to use FLinearColor::ToFColor() :)
                                Canvas\-\>DrawTile(Canvas\-\>DefaultTexture, 0, 0, Canvas\-\>ClipX, Canvas\-\>ClipY, 0, 0, Canvas\-\>DefaultTexture\-\>GetSizeX(), Canvas\-\>DefaultTexture\-\>GetSizeY());
                                Canvas\-\>DrawColor \= OldColor;
                        }
                }
        }
}

### Using the screen fade

Using the fade logic from any _Actor_ is now just a matter of some simple lines:

const UWorld\* World \= GetWorld();
if (World)
{
        UCustomGameViewportClient\* GameViewportClient \= Cast<UCustomGameViewportClient\>(World\-\>GetGameViewport());
        if (GameViewportClient)
        {
                GameViewportClient\-\>Fade(Duration, bToBlack);
        }
}

### Summary

Now we have a simple yet very effective way on doing a screen fade globally, it will cost you just the overhead of drawing a texture on screen and that's it. You can add more functionality to the whole thingy but the basics are all set.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Global\_Fade\_In\_out&oldid=17043](https://wiki.unrealengine.com/index.php?title=Global_Fade_In_out&oldid=17043)"

[Categories](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)