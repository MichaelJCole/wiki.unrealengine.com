HUD, Canvas, Code Sample of 800+ Lines, Create Buttons & Draw Materials - Epic Wiki                    

HUD, Canvas, Code Sample of 800+ Lines, Create Buttons & Draw Materials
=======================================================================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Multiple convenience functions for](#Multiple_convenience_functions_for)
    *   [1.2 Transparency](#Transparency)
    *   [1.3 Centering](#Centering)
    *   [1.4 Rest of Game Code Integration](#Rest_of_Game_Code_Integration)
    *   [1.5 Player Keyboard,Mouse,Controller Input](#Player_Keyboard.2CMouse.2CController_Input)
    *   [1.6 Text Size](#Text_Size)
    *   [1.7 Buttons](#Buttons)
    *   [1.8 Cursor](#Cursor)
    *   [1.9 Tooltips](#Tooltips)
    *   [1.10 Drawing Images/Textures/Materials](#Drawing_Images.2FTextures.2FMaterials)
*   [2 Video](#Video)
    *   [2.1 Customizing the Appearance](#Customizing_the_Appearance)
*   [3 Credit](#Credit)
*   [4 Pre-requisites](#Pre-requisites)
*   [5 C++ Code](#C.2B.2B_Code)
    *   [5.1 JoyHUD.h](#JoyHUD.h)
    *   [5.2 JoyHUD.cpp](#JoyHUD.cpp)
*   [6 Compile and Make BP](#Compile_and_Make_BP)
*   [7 Adding The Graphics](#Adding_The_Graphics)
*   [8 Conclusion](#Conclusion)

Overview
--------

_Code Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

In this tutorial I am giving you a fully functional HUD class that is 800+ lines of UE4 C++ code.

**Features of this sample HUD class include:**

### Multiple convenience functions for

*   drawing textures
*   drawing materials
*   drawing lines
*   drawing rectangles
*   drawing text

The functions use the new UE4 method of using CanvasItems.

### Transparency

Every HUD element I show in my sample has at least some transparency!

The main HUD menu graphic is actually mostly transparent, except for the edges!

### Centering

*   how to draw stuff centered in the screen (used by confirm dialog)

### Rest of Game Code Integration

I have code in the tutorial to show you how to get a reference to your custom PC or Character class from within the HUD.

From your PC reference you can get access to your custom Game Mode and Game State classes (using the Cast<> code I show in tutorial PostInit)

### Player Keyboard,Mouse,Controller Input

How to capture player key presses for ANY key,mouse,controller that you want from within the HUD

**Key Controls used in this tutorial code:**

*   ESC: clears the screen lock so camera will move with cursor.
*   F: Toggle screen lock so only the cursor moves as player moves the mouse.
*   H: Toggles hiding the HUD
*   LMB: Clicks on buttons
*   Y: Confirm yes if confirm dialog open
*   N: Cancel if confirm dialog is open

### Text Size

How to measure text, accounting for scaling and font size, to size backgrounds,buttons,tooltips appropriately

### Buttons

A button system and corresponding USTRUCT

### Cursor

How to draw cursor that player can move in-game

How to change cursor when hovering over button

### Tooltips

Button tooltips

### Drawing Images/Textures/Materials

Drawing custom button and menu backgrounds that come from textures/materials

Video
-----

Here is a video of this exact code in action!

### Customizing the Appearance

Note that I made my own fonts and cursors and materials as seen in video, you can make your own appearance using same code :)

Credit
------

Feel free to use this as a template/foundation for making a c++ HUD-based GUI for your game!

Please do give me credit in some appropriate way for this base-line code contribution.

 All of this code is of my own creation, and I am using functions made only by Epic.

  

**Why Did I Do All This?**

I have implemented a very featured GUI for my game using only UE4 C++ and the HUD class!

I was able to create from scratch everything I wanted, including scrollable panels and an in-game file system.

  
I wanted to demo for you how this can be done, so that you can do this in your game too!

  
Constructing this tutorial for you took me about 5 hours, 2 hours of which was just documation / video

Adding buttons and such to this code should only take you minutes.

Integrating this code with your game engine will be easy, you can get a reference to the owning Character or the player controller from within the HUD class itself.

Pre-requisites
--------------

Make at least one font of your own, right click and make a new font asset.

I recommend a large default size like 36, as explained in the code below.

C++ Code
--------

The code below assumes you have created a now Class named "JoyHUD". If you "add code to project" from the Editor, then you will need to replace the default files with the code below.

### JoyHUD.h

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
//VictoryHUD extension by Rama
 
#pragma once
 
#include "JoyHUD.generated.h"
 
USTRUCT()
struct FJoyButtonStruct
{
	GENERATED\_USTRUCT\_BODY()
 
	//Vars
	int32 		type;
	FString	toolTip;
	float 		minX;
	float 		maxX;
	float 		minY;
	float 		maxY;
 
	//~
 
	//default properties
 
	FJoyButtonStruct()
	{
		type 			\= \-1;
		toolTip 		\= "";
		minX 			\= 0;
		maxX 			\= 0;
		minY 			\= 0;
		maxY 			\= 0;
	}
};
 
UCLASS()
class AJoyHUD : public AHUD
{
	GENERATED\_UCLASS\_BODY()
 
	// Font 
	//		I recommend creating the font at a high resolution / size like 36
	//			then you can scale down the font as needed to any size of your choice
 
	/\*\* Verdana \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=JoyHUD)
	UFont\* VerdanaFont;
 
	/\*\* Put Roboto Here \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=JoyHUD)
	UFont\* UE4Font;
 
	/\*\* Font Scaling Used By Your HUD Code \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=JoyHUD)
	float DefaultFontScale;
 
	/\*\* HUD Scaling \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=JoyHUD)
	float GlobalHUDMult;
 
	// T2D 
	/\*\* Cursor \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=T2D)
	UTexture2D\* CursorMain;
 
	/\*\* Hovering \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=T2D)
	UTexture2D\* CursorHoveringButton;
 
	/\*\* Button \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=T2D)
	UTexture2D\* ButtonBackground;
 
	// Materials 
	/\*\* Events \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Materials)
	UMaterialInterface\* MaterialBackground;
 
	//
 
	/\* Draw Hud? \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=Options)
	bool DontDrawHUD;
 
//Cursor
public:
	FVector2D MouseLocation;
	void DrawHUD\_DrawCursor();
 
//Buttons
public:
	TArray<FJoyButtonStruct\> ButtonsMain;
	TArray<FJoyButtonStruct\> ButtonsConfirm;
 
	//Cursor In buttons
	void DrawHUD\_CheckCursorInButtons();
	void CheckCursorInButtonsMain();
	void CheckCursorInButtonsConfirm();
 
	const FJoyButtonStruct\* CurCheckButton;
	int32 CheckCursorInButton(const TArray<FJoyButtonStruct\>& ButtonArray);
	int32 ClickedButtonType;
	//States
	bool ConfirmDialogOpen;
	bool InMainMenu;
 
	int32 		ActiveButton\_Type;
	FString 	ActiveButton\_Tip;
	bool CursorHoveringInButton;
//Colors
public:
	const FLinearColor \* ColorPtr; 
 
	//Colors
	static const FColor		FColorBlack;
	static const FColor		FColorRed;
	static const FColor		FColorYellow;
	static const FColor		FColorBlue;
	static const FColor		FColor\_White;
 
	static const FLinearColor LC\_Black;
	static const FLinearColor LC\_Pink;
	static const FLinearColor LC\_Red;
	static const FLinearColor LC\_Yellow;
//FString
public:
 
	//\`Titles
	static const FString S\_Title\_Main;
	static const FString S\_Title\_Confirm;
	//\`Button Text
	static const FString S\_Button\_Restart; 
	static const FString S\_Button\_Exit;
 
// Utility 
 
//Stop Camera From Moving With Mouse
FORCEINLINE void SetCursorMoveOnly(bool CursorOnly)
{
	if(!ThePC) return;
	//
	ThePC\-\>SetIgnoreLookInput(CursorOnly);
 
}
 
//DrawLine
FORCEINLINE void DrawJoyLine
(
	const FVector2D& Start, 
	const FVector2D& End, 
	const FLinearColor& TheColor, 
	const float& Thick
)
{
	if (!Canvas) return;
	//
 
	FCanvasLineItem NewLine(Start,End);
	NewLine.SetColor(TheColor);
	NewLine.LineThickness \= Thick;
	Canvas\-\>DrawItem(NewLine);
}	
 
//~
 
FORCEINLINE void DrawJoyRect( 
	float X, float Y, 
	float Width, float Height, 
	const FLinearColor& Color
)
{
	if(!Canvas) return;
	//
 
	FCanvasTileItem RectItem( 
		FVector2D(X, Y), 
		FVector2D( Width, Height ), 
		Color 
	);
 
    RectItem.BlendMode \= SE\_BLEND\_Translucent;
	Canvas\-\>DrawItem(RectItem);
}
 
//~
 
//DrawText
FORCEINLINE void DrawJoyText(
	UFont\*	TheFont,
	const FString& TheStr, 
	const float& X, const float& Y, 
	const FLinearColor& TheColor, 
	const float& TheScale,
	bool DrawOutline\=false,
	const FLinearColor OutlineColor\=FLinearColor(0,0,0,1)
) {
	if(!Canvas) return;
	//
 
	//Text and Font
	FCanvasTextItem NewText(
		FVector2D(X,Y),
		FText::FromString(TheStr),
		TheFont,
		TheColor
	);
 
	//Text Scale
	NewText.Scale.Set(TheScale,TheScale);
 
	//Outline gets its alpha from the main color
	NewText.bOutlined \= true;
	NewText.OutlineColor \= OutlineColor;
	NewText.OutlineColor.A \= TheColor.A \* 2;
 
	//Draw
	Canvas\-\>DrawItem(NewText);
}
 
//~
//Draw Full Size Tile
FORCEINLINE void DrawFullSizeTile(UTexture2D\* tex, float x, float y, const FColor& Color)
{
	if (!Canvas) return;
	if (!tex) return;
	//~~
 
	Canvas\-\>SetDrawColor(Color);
 
	//Draw
	Canvas\-\>DrawTile(
		tex, x, y, 0, //z pos
		tex\-\>GetSurfaceWidth(), //screen width
		tex\-\>GetSurfaceHeight(),  //screen height
		0, //texture start width
		0, //texture start height
		tex\-\>GetSurfaceWidth(), //texture width from start
		tex\-\>GetSurfaceHeight(), //texture height from start
		BLEND\_Translucent
	);
}
 
//~
 
FORCEINLINE void VDrawTile(UTexture2D\* tex, float x, float y, float screenX, float screenY, const FColor& TheColor)
{
	if (!Canvas) return;
	if (!tex) return;
	//~
 
	Canvas\-\>SetDrawColor(TheColor);
 
	//Draw
	Canvas\-\>DrawTile(
		tex, x, y, 0, //z pos
		screenX, //screen width
		screenY,  //screen height
		0, //texture start width
		0, //texture start height
		tex\-\>GetSurfaceWidth(), //texture width from start
		tex\-\>GetSurfaceHeight(), //texture height from start
		BLEND\_Translucent
	);
}
 
//~
 
//Draw
public:
	void DrawHUD\_DrawDialogs();
 
	//Menus
	void DrawMainMenu();
	void DrawConfirm();
 
	//Buttons
	void DrawMainMenuButtons();
	void DrawConfirmButtons();
public:
	void DrawToolTip();
 
//Core
public:
	APlayerController\* ThePC;
	void PlayerInputChecks();
protected:
	//Draw HUD
	void DrawHUD\_Reset();
	virtual void DrawHUD() OVERRIDE;
 
	/\*\* after all game elements are created \*/
	virtual void PostInitializeComponents() OVERRIDE;
 
 
};

### JoyHUD.cpp

// Copyright 1998-2013 Epic Games, Inc. All Rights Reserved.
 
//JoyHUD extension by Rama
 
#include "VictoryGame.h"   //Replace with a reference to the header file of your own project
 
#define BUTTONTYPE\_MAIN\_RESTART 	1
#define BUTTONTYPE\_MAIN\_EXIT 		2
 
#define BUTTONTYPE\_CONFIRM\_YES 	1
#define BUTTONTYPE\_CONFIRM\_NO 	2
 
#define CANVAS\_WHITE if(Canvas) Canvas->SetDrawColor(FColor\_White);
 
//Cursor Draw Offset
//		use this to position texture over the point of your cursor, 
//			if the point is not at exactly 0,0
#define CURSOR\_DRAW\_OFFSET 3
 
//
//Static Consts
//
 
const FString AJoyHUD::S\_Title\_Main			\= FString("Joy!"); 
const FString AJoyHUD::S\_Title\_Confirm		\= FString("Exit Game?");
 
const FString AJoyHUD::S\_Button\_Restart	\= FString("Restart"); 
const FString AJoyHUD::S\_Button\_Exit		\= FString("Exit"); 
 
// Colors 
const FColor AJoyHUD::FColorBlack 		\= FColor(0,0,0,255);
const FColor AJoyHUD::FColorRed 			\= FColor(255,0,0,255);
const FColor AJoyHUD::FColorYellow 		\= FColor(255,255,0,255);
const FColor AJoyHUD::FColorBlue			\= FColor(0,0,255,255);
const FColor AJoyHUD::FColor\_White		\= FColor(255,255,255,255);
// Backgrounds 
const FLinearColor AJoyHUD::LC\_Black 	\= FLinearColor(0, 0, 0, 1);
const FLinearColor AJoyHUD::LC\_Pink		\= FLinearColor(1, 0, 1, 1);
const FLinearColor AJoyHUD::LC\_Red 		\= FLinearColor(1, 0, 0, 1);
const FLinearColor AJoyHUD::LC\_Yellow 	\= FLinearColor(1, 1, 0, 1);
 
AJoyHUD::AJoyHUD(const class FPostConstructInitializeProperties& PCIP) : Super(PCIP)
{
	//Draw HUD?
	DontDrawHUD 		\= false;
 
	//States
	ConfirmDialogOpen 	\= false;
	InMainMenu 			\= true;
 
	//Scale
	GlobalHUDMult \= 1;
	DefaultFontScale \= 0.7;   //scaling down a size 36 font
 
	//	 I recommend creating fonts at a high resolution / size like 36
	//			then you can scale down the font as needed to any size of your choice
 
	// this avoids needing to make multiple fonts for different sizes, but have a high
	// resolution when you use larger font sizes
 
}	
 
//Core 
 
void AJoyHUD::PostInitializeComponents()
{
	Super::PostInitializeComponents();
 
	//Establish the PC
	ThePC \= GetOwningPlayerController();
 
	//How to get a ref to your custom PC
	//AYourPlayerController\* YourChar = Cast<AYourPlayerController>(ThePC);
 
	//How to Get The Character
	//AYourCharacterClass\* YourChar = Cast<AYourCharacterClass>(GetOwningPawn());
 
}
 
//===============
// Draw Dialogs
//===============
void AJoyHUD::DrawHUD\_DrawDialogs()
{
	DrawMainMenu();
	if(ConfirmDialogOpen) DrawConfirm();
}
//Menus
void AJoyHUD::DrawMainMenu()
{
	//Background
	DrawMaterialSimple(
		MaterialBackground, 
		10, 10, 
		256, 
		512,
		1.3
	);
 
	//Menu Title
 
	//Draw buttons
	DrawMainMenuButtons();
}
void AJoyHUD::DrawConfirm()
{
	//Blue rect with alpha 50%
	DrawJoyRect(Canvas\-\>SizeX/2 \- 100, Canvas\-\>SizeY/2 \- 50,200,100,FLinearColor(0,0,1,0.2333));
 
	//Confirm Title
 
	//Draw buttons
	DrawConfirmButtons();
}
 
//Buttons
void AJoyHUD::DrawMainMenuButtons()
{
	//Start Point
	float xStart \= 100;
	float yStart \= 110;
 
	//Background
	VDrawTile(ButtonBackground,xStart,yStart,150,80,FColor(255,255,255,120)); //alpha 120/255
 
	//Text
	DrawJoyText(
		VerdanaFont,"Restart",xStart+30,yStart+20,
		LC\_Black, DefaultFontScale,
		true,LC\_Red
	);
 
	//Struct
	//Add Button If Necessary
	//		could be cleared and need refreshing if using a different menu
	//			clear buttons with ButtonsMain.Empty()
	if (ButtonsMain.Num() < 1 )
	{
		FJoyButtonStruct newButton \= FJoyButtonStruct();
		newButton.type 			\= BUTTONTYPE\_MAIN\_RESTART;
		newButton.toolTip		\= "Restart the Game!";	
		newButton.minX 			\= xStart;
		newButton.maxX 			\= xStart + 150;		
		newButton.minY 			\= yStart;
		newButton.maxY 			\= yStart + 80;
 
		//Add to correct array
		ButtonsMain.Add(newButton);
	}
 
 
	xStart \= 100;
	yStart \= 410;
 
	VDrawTile(ButtonBackground,xStart,yStart,150,80,FColor(255,255,255,120)); //alpha 120/255
 
	//Text
	DrawJoyText(
		VerdanaFont,"Exit",xStart+55,yStart+20,
		LC\_Black, DefaultFontScale,
		true,LC\_Red
	);
 
	if (ButtonsMain.Num() < 2 )
	{
		FJoyButtonStruct newButton \= FJoyButtonStruct();
		newButton.type 			\= BUTTONTYPE\_MAIN\_EXIT;
		newButton.toolTip			\= "Exit the Game!";	
		newButton.minX 			\= xStart;
		newButton.maxX 			\= xStart + 150;		
		newButton.minY 			\= yStart;
		newButton.maxY 			\= yStart + 80;
 
		//Add to correct array
		ButtonsMain.Add(newButton);
	}
}
void AJoyHUD::DrawConfirmButtons()
{
	float xStart \= Canvas\-\>SizeX/2 \- 100;
	float yStart \= Canvas\-\>SizeY/2 \- 40;
 
	//Highlighted?
	if(ActiveButton\_Type \== BUTTONTYPE\_CONFIRM\_YES ) ColorPtr \= &LC\_Pink;
	else ColorPtr \= &LC\_Yellow;
 
	//Text
	DrawJoyText(
		VerdanaFont,"Yes",xStart+30,yStart+20,
		\*ColorPtr, DefaultFontScale,
		true
	);
 
	if (ButtonsConfirm.Num() < 1 )
	{
		FJoyButtonStruct newButton \= FJoyButtonStruct();
		newButton.type 			\= BUTTONTYPE\_CONFIRM\_YES ;
		newButton.toolTip			\= "";	
		newButton.minX 			\= xStart;
		newButton.maxX 			\= xStart + 75;		
		newButton.minY 			\= yStart + 20;
		newButton.maxY 			\= yStart + 60;
 
		//could use GetTextSize to streamline this
 
		//Add to correct array
		ButtonsConfirm.Add(newButton);
	}
 
	xStart \= Canvas\-\>SizeX/2 + 20;
	yStart \= Canvas\-\>SizeY/2 \- 40;
 
	//Highlighted?
	if(ActiveButton\_Type \== BUTTONTYPE\_CONFIRM\_NO) ColorPtr \= &LC\_Black;
	else ColorPtr \= &LC\_Yellow;
 
	//Text
	DrawJoyText(
		VerdanaFont,"No",xStart+30,yStart+20,
		\*ColorPtr, DefaultFontScale,
		true
	);
 
	if (ButtonsConfirm.Num() < 2 )
	{
		FJoyButtonStruct newButton \= FJoyButtonStruct();
		newButton.type 			\= BUTTONTYPE\_CONFIRM\_NO;
		newButton.toolTip			\= "";	
		newButton.minX 			\= xStart;
		newButton.maxX 			\= xStart + 75;		
		newButton.minY 			\= yStart + 20;
		newButton.maxY 			\= yStart + 60;
 
		//could use GetTextSize to streamline this
 
		//Add to correct array
		ButtonsConfirm.Add(newButton);
	}
}
 
//===============
// Cursor In Buttons
//===============
int32 AJoyHUD::CheckCursorInButton(const TArray<FJoyButtonStruct\>& ButtonArray)
{
	for(int32 b \= 0; b < ButtonArray.Num(); b++)
	{
		CurCheckButton \= &ButtonArray\[b\];
 
		//check cursor in bounds
		if (CurCheckButton\-\>minX <= MouseLocation.X && MouseLocation.X <= CurCheckButton\-\>maxX &&
			CurCheckButton\-\>minY <= MouseLocation.Y && MouseLocation.Y <= CurCheckButton\-\>maxY )
		{
 
			//Active Button Type
			ActiveButton\_Type \= CurCheckButton\-\>type; 
 
			//Tool Tip
			ActiveButton\_Tip \= CurCheckButton\-\>toolTip; 
 
			//Change Cursor
			CursorHoveringInButton \= true;
 
			//Mouse Clicked?
			if (ThePC\-\>WasInputKeyJustPressed(EKeys::LeftMouseButton))
			{
				return ActiveButton\_Type;
				//~~
				//no need to check rest of buttons
			}
		}
	}
 
	//No Click Occurred This Tick
	return \-1;	
}
 
//Check Confirm
void AJoyHUD::CheckCursorInButtonsConfirm()
{
	//Check Confirm Buttons
	ClickedButtonType \= CheckCursorInButton(ButtonsConfirm); //fills global ActiveButton\_Type
 
	if(ClickedButtonType \== BUTTONTYPE\_CONFIRM\_YES )
	{
		ThePC\-\>ConsoleCommand("Exit");
		return;
	}
	if(ClickedButtonType \== BUTTONTYPE\_CONFIRM\_NO)
	{
		ConfirmDialogOpen \= false;
		ButtonsConfirm.Empty(); //Buttons not needed anymore
		return;
	}
}
 
//Check Buttons
void AJoyHUD::CheckCursorInButtonsMain()
{
	//Check Confirm Buttons
	ClickedButtonType \= CheckCursorInButton(ButtonsMain);
 
	if(ClickedButtonType \== BUTTONTYPE\_MAIN\_RESTART )
	{
		ThePC\-\>ConsoleCommand("RestartLevel");
		return;
	}
	if(ClickedButtonType \== BUTTONTYPE\_MAIN\_EXIT)
	{
		ConfirmDialogOpen \= true;
		return;
	}
}
void AJoyHUD::DrawHUD\_CheckCursorInButtons()
{
	if(ConfirmDialogOpen)
	{
		CheckCursorInButtonsConfirm();
 
		//Take Focus Away From All Other buttons
		return; 
		//~
	}
 
	//Main
	CheckCursorInButtonsMain();
}
 
void AJoyHUD::DrawToolTip()
{
	//if mouse is too far to right, draw from left instead
	float xStart \= MouseLocation.X + 150;
	float yStart \= MouseLocation.Y + 5;
 
	//out vars
	float RV\_xLength; 
	float RV\_yLength;
	//Text Size
	GetTextSize(
		ActiveButton\_Tip, 
		RV\_xLength, 
		RV\_yLength, 
		UE4Font,
		DefaultFontScale \* 2
	);
 
	// Decide Draw to Left or to the Right 
 
	//Draw to the Left
	if (xStart + RV\_xLength \>= Canvas\-\>SizeX \- 40)
	{
		xStart \-\= 150 + 140 + 64 + RV\_xLength;
 
		//If Text is too long, bring it closer to the cursor
		if(xStart < 33 ) xStart \= 33;
	}
 
	//Background
	DrawJoyRect(
		xStart, yStart, 
		RV\_xLength + 70, 
		80, 
		FLinearColor(0, 0, 1, 0.7) //alpha 0.7
	);
 
	//Tool Tip
	DrawText(
		ActiveButton\_Tip, 
		LC\_Pink,
		xStart + 32, yStart + 20,
		UE4Font,
		DefaultFontScale \* 2,			
		false		//scale position of message with HUD scale
	);
}
void AJoyHUD::DrawHUD\_DrawCursor()
{
	//Tool Tip
	if(ActiveButton\_Tip !\= "") DrawToolTip();
 
	//Cursor Hovering in a Button?
	if (CursorHoveringInButton)
	{
		//pointer tex found?
		if (!CursorHoveringButton) return;
		DrawFullSizeTile(CursorHoveringButton, MouseLocation.X \- CURSOR\_DRAW\_OFFSET, MouseLocation.Y \- CURSOR\_DRAW\_OFFSET, FColor\_White );
	}
 
	else
	{
		//cursor tex found?
		if(!CursorMain) return;
		DrawFullSizeTile(CursorMain, MouseLocation.X \- CURSOR\_DRAW\_OFFSET, MouseLocation.Y \- CURSOR\_DRAW\_OFFSET, FColor\_White );
	}
}
 
void AJoyHUD::PlayerInputChecks()
{
	//check out this tutorial of mine for a list of all EKeys::
	//http://forums.epicgames.com/threads/972861-Tutorials-C-for-UE4-Code-Samples-gt-gt-New-Video-Freeze-Render-When-Tabbed-Out?p=31660286&viewfull=1#post31660286
 
	if(ThePC\-\>WasInputKeyJustPressed(EKeys::Escape))
	{
		SetCursorMoveOnly(false);
		return;
	}
	if(ThePC\-\>WasInputKeyJustPressed(EKeys::F))
	{
		SetCursorMoveOnly(!ThePC\-\>IsLookInputIgnored());
		return;
	}
	if(ThePC\-\>WasInputKeyJustPressed(EKeys::H))
	{
		DontDrawHUD \= !DontDrawHUD;
		return;
	}
 
	//Confirm
	if(ConfirmDialogOpen)
	{
		if(ThePC\-\>WasInputKeyJustPressed(EKeys::Y))
		{
			ThePC\-\>ConsoleCommand("Exit"); 
			//could replace with function based on confirm context
 
			return;
		}
		if(ThePC\-\>WasInputKeyJustPressed(EKeys::N))
		{
			ConfirmDialogOpen \= false;
			ButtonsConfirm.Empty(); //Buttons not needed anymore
			//Cancel Confirm
 
			return;
		}
	}
}
 
void AJoyHUD::DrawHUD\_Reset()
{
	ActiveButton\_Type 		\= \-1;
	ActiveButton\_Tip 		\= "";
	CursorHoveringInButton 	\= false;
}
 
void AJoyHUD::DrawHUD()
{
	//==============================
	//==============================
	//==============================
	//Have PC for Input Checks and Mouse Cursor?
	if(!ThePC)
	{
		//Attempt to Reacquire PC
		ThePC \= GetOwningPlayerController();
 
		//Could Not Obtain PC
		if(!ThePC) return;
		//~~
	}
 
	//Multiplayer Safety Check
	if(!ThePC\-\>PlayerInput) return; //not valid for first seconds of a multiplayer client
	//~~
	//==============================
	//==============================
	//==============================
 
	//Player Input
	PlayerInputChecks();
 
	//Draw HUD?
	if(DontDrawHUD) return;
	//~~
 
	//Super
	Super::DrawHUD();
 
	//No Canvas?
	if(!Canvas) return;
	//
 
	//Reset States
	DrawHUD\_Reset();
 
	//================
	//Get New Mouse Position
	//================
	ThePC\-\>GetMousePosition(MouseLocation.X,MouseLocation.Y);
 
	//Cursor In Buttons
	DrawHUD\_CheckCursorInButtons();
 
	//Draw Dialogs
	DrawHUD\_DrawDialogs();
 
	//### Do Last ###
	//Draw Cursor
	DrawHUD\_DrawCursor();
 
	//Debugging Info
	//ThePC->ClientMessage("HUD Loop Completed!");
}

Compile and Make BP
-------------------

After you get the above to compile, you need to go into the editor and make a blueprint of this JoyHUD

Then you need to go to your GameMode.cpp file and add this line:

AYourGameMode::AYourGameMode(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
	// You can obtain the asset path of your HUD blueprint through the editor 
	// by right-clicking the Blueprint asset and choosing "Copy Reference".
	// You should then add the "\_C" suffix so that the class finder properly 
	// points to the actual class used by the game, as opposed to its Blueprint
	// which is an editor-only concept).
	// 
	// For instance, given a blueprint named BP\_JoyHUD, the class path would be
	//	"/Game/Blueprints/BP\_JoyHUD\_C"
	static ConstructorHelpers::FClassFinder<AHUD\> TheHUDOb(TEXT("/Game/Blueprints/BP\_JoyHUD\_C"));
	if (TheHUDOb.Class !\= NULL)
	{
		HUDClass \= TheHUDOb.Class;
	}
}

Adding The Graphics
-------------------

Open the defaults of your new HUD BP and set the various assets!

Conclusion
----------

Now you have the code to make your own button system, with tooltips, and draw textures and materials of any size and shape to the screen during game time!

Using the DrawMaterial function you can make fancy effects in your game's GUI as you see in my video!

You also have a solid foundation for a mouse/pointer driven GUI that responds to hover as well as click events!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=HUD,\_Canvas,\_Code\_Sample\_of\_800%2B\_Lines,\_Create\_Buttons\_%26\_Draw\_Materials&oldid=11897](https://wiki.unrealengine.com/index.php?title=HUD,_Canvas,_Code_Sample_of_800%2B_Lines,_Create_Buttons_%26_Draw_Materials&oldid=11897)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)