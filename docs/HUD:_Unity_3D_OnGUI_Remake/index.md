HUD: Unity 3D OnGUI Remake - Epic Wiki                    

HUD: Unity 3D OnGUI Remake
==========================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Functions Matching Unity's GUI class](#Functions_Matching_Unity.27s_GUI_class)
    *   [1.2 Transparency](#Transparency)
    *   [1.3 Centering](#Centering)
    *   [1.4 Input](#Input)
*   [2 Demos](#Demos)
*   [3 Credit](#Credit)
*   [4 Pre-requisites](#Pre-requisites)
    *   [4.1 Font](#Font)
    *   [4.2 Texture](#Texture)
    *   [4.3 Button Material](#Button_Material)
    *   [4.4 Animated Button Material](#Animated_Button_Material)
    *   [4.5 Slider Background Material](#Slider_Background_Material)
    *   [4.6 Slider Button Material](#Slider_Button_Material)
*   [5 C++ Code](#C.2B.2B_Code)
    *   [5.1 HUDObjects.h](#HUDObjects.h)
    *   [5.2 HUDObjects.cpp](#HUDObjects.cpp)
    *   [5.3 GUI.h](#GUI.h)
    *   [5.4 GUI.cpp](#GUI.cpp)
    *   [5.5 YourHUD.h](#YourHUD.h)
    *   [5.6 YourHUD.cpp](#YourHUD.cpp)
*   [6 BluePrint/Editor End](#BluePrint.2FEditor_End)
    *   [6.1 Text Section](#Text_Section)
    *   [6.2 Buttons Section](#Buttons_Section)
    *   [6.3 Textures Section](#Textures_Section)
    *   [6.4 Materials Section](#Materials_Section)
    *   [6.5 Animations Section](#Animations_Section)
*   [7 Conclusion](#Conclusion)

Overview
--------

_Code Author:_ [Loken01](https://forums.unrealengine.com/member.php?4329-Loken01)

For a while I had taken a break from UDK and had been using Unity3D for a bit, and even though it will never quite match up with AutoDesk ScaleForm, I thought I'd give it a whirl at making a more simplistic HUD system for users.

The basics of AHUD I learnt from Rama's awesome tutorials! [HUD, Canvas, Code Sample of 800+ Lines](/HUD,_Canvas,_Code_Sample_of_800%2B_Lines,_Create_Buttons_%26_Draw_Materials "HUD, Canvas, Code Sample of 800+ Lines, Create Buttons & Draw Materials")

Everything in this is based on objects, so everything can handle it's own instance! Makes things super easy for us!

### Functions Matching Unity's GUI class

*   Labels
*   Textures
*   Materials
*   Animated Materials
*   Buttons
*   Animated Buttons
*   Horizontal Sliders
*   Vertical Sliders
*   Movable Windows (Coming soon)

### Transparency

Everything in this entire HUD system has full control over transparency. Materials are handled in the material editor. Textures work best if their LOD group is set to 'UI'.

### Centering

I wanted to make sure everything could be scaled according to screen size so I made four functions:

*   Scale Width
*   Scale Height
*   Center Horizontal
*   Center Vertical

These work based on getting the sizes from the Canvas, and then doing a check against the relative position of 1920x1080. It means no matter the screen size, everything will stay exactly the same relative to the edges of the screen.

### Input

Currently the only form of input is the mouse. But you can use your PlayerController or Character class to bind other actions and simply tweak this code. My personal version works using the controller and simulating mouse movement, but I wanted to generalize as much as possible for this tutorial.

Demos
-----

So I made a few gifs just to show what could be done in about 2-3 minutes with this HUD system!

Labels:

[![Label](https://d26ilriwvtzlb.cloudfront.net/0/06/Label.png)](/File:Label.png "Label")

Buttons:

[![Button](https://d26ilriwvtzlb.cloudfront.net/7/7a/Button.gif)](/File:Button.gif "Button")

Animated Buttons:

[![Animated Buttons](https://d26ilriwvtzlb.cloudfront.net/2/2e/AnimatedButton.gif)](/File:AnimatedButton.gif "Animated Buttons")

Horizontal Sliders:

[![Slider](https://d26ilriwvtzlb.cloudfront.net/2/23/HorizontalSlider.gif)](/File:HorizontalSlider.gif "Slider")

Vertical Sliders:

[![Slider](https://d26ilriwvtzlb.cloudfront.net/f/f0/VerticalSlider.gif)](/File:VerticalSlider.gif "Slider")

Credit
------

Everything I learnt about the standard AHUD system came directly from Rama, so this is like an extension to his work

Apart from a few tiny bits here and there, (Rama's) almost all of this is my own creation.

Also a big thanks to [DroseGaming](https://forums.unrealengine.com/member.php?10846-DroseGaming) for helping me with some bug issues!

**Why Did I make this system?**

I wanted it to be easier to make an easy to use object based system that could be easily managed in memory, handle their own animations, etc dynamically, without cluttering up your HUD class.

Pre-requisites
--------------

As in Rama's tutorial, you need to have a few things:

### Font

Creat a font in your content browser. Right click, and make a new font, and give it a large default size. I tend to just stick it to the highest.

### Texture

Literally any texture would do.

### Button Material

Create a new material and set it to be Transparent and Unlit. You will need a button 'Up' and button 'Down' texture. You will need two parameters called 'Highlight' and 'Click'

And finally plug everything together like so:

[![Button Material Editor](https://d26ilriwvtzlb.cloudfront.net/4/42/ButtonMaterial.png)](/File:ButtonMaterial.png "Button Material Editor")

### Animated Button Material

This can be done exactly the same as above, but the textures would need to be in a sprite sheet like layout.

### Slider Background Material

Create a material that is Transparent and Unlit. Only really needs the one texture.

### Slider Button Material

For this you can simply use any "Button Material"

C++ Code
--------

The code below assumes you have created a new class named "YourHud". Although you can rename to whatever you want. Just clean up any references. Simply replace any references to "YourGame.h" to be whatever your game has been called.

### HUDObjects.h

153 Lines

#pragma once
 
#include "GameFramework/HUD.h"
#include "HUDObjects.generated.h"
 
USTRUCT()
struct FShapeStruct
{
	GENERATED\_USTRUCT\_BODY()
 
	//Vars
	float x;
	float y;
	float w;
	float h;
 
	//default properties
	FShapeStruct()
	{
		x \= 0;
		y \= 0;
		w \= 0;
		h \= 0;
	}
};
 
UCLASS()
class UHUDObjects : public UObject
{
	GENERATED\_UCLASS\_BODY()
 
	protected:
		//State handler
		bool IsButton;
 
		//Shape and positioning of this object
		FShapeStruct BGShapeAndPos;
 
		//Shape and positioning of this object
		FShapeStruct ShapeAndPos;
 
		//Background material reference
		UPROPERTY()
		UMaterialInterface\* BackGround;
 
		//Slider background material reference
		UPROPERTY()
		UMaterialInterface\* SliderBackGround;
 
		//Created material instance reference
		UPROPERTY()
		UMaterialInstanceDynamic\* MIObj;
 
		//Created material instance for a slider background
		UPROPERTY()
		UMaterialInstanceDynamic\* BGMIObj;
 
		//Name of the highlight parameter
		FString HighLightName;
 
		//Name of the click parameter
		FString ClickName;
 
		//Whether or not this has an animation
		bool bHasAnim;
 
		//Scale of the text
		float ScaleAmount;
 
		//Text
		FString Text;
 
		//Reference to the font used
		UPROPERTY()
		UFont\* Font;
 
		//Animation
		FVector2D AnimTiling;
		//Number of tiles in total
		int NumTiles;
		//Time between frame updates
		float FrameUpdateDelay;
		//Current time taken from the last frame update
		float currentTime;
 
		//CurrentAnimTile
		int Tile;
		float MatU;
		float MatV;
		float MatUWidth;
		float MatVHeight;
 
		float CropU;
		float CropV;
		float CropX;
		float CropY;
 
		UPROPERTY()
		UTexture2D\* Texture;
 
	//Functions
	public:
		//State of button
		bool IsInside;
		bool bGrabbed;
 
		//If the passed position is within the screen bounds of this object
		bool Hovered();
 
		//Update and Draw depending on how the object was initialised
		//SHOULD BE CALLED WITH CARE
		void Update(AHUD\* HUDRef, FVector2D MousePos, float x, float y, float w, float h, float Scale, FLinearColor TextColour \= FLinearColor::White);
 
		//Draw the horizontal slider
		float DrawHorizontalSlider(AHUD\* HUDRef, float Amount, float MinAmount, float MaxAmount, FVector2D MousePos, float x, float y, float w, float h, float Scale);
 
		//Draw the vertical slider
		float DrawVerticalSlider(AHUD\* HUDRef, float Amount, float MinAmount, float MaxAmount, FVector2D MousePos, float x, float y, float w, float h, float Scale);
 
		//Check for click on slider BG
		bool CheckInsideSliderBG(FVector2D MousePos);
 
		//Draw the texture that this object was initialised with.
		//SHOULD BE CALLED WITH CARE
		void DrawTexture(AHUD\* HUDRef, float x, float y, float w, float h, FColor pColour);
 
		//Crops the U/V sizes. 0=No crop, 1=MaxCrop
		//This will only work on Texture or Animation Objects
		void CropObjectUV(FVector2D UVCrop);
 
		//Crops the X/Y sizes. 0=No crop, 1=MaxCrop
		//This will only work on Texture or Animation Objects
		void CropObjectXY(FVector2D XYCrop);
 
		//Initialise this object with only Text
		void Init(FString pText, UFont\* pFont);
		//Initialise this object with only a texture
		void Init(UTexture2D\* pTexture);
		//Initialise this object with a highlightable material
		void Init(bool pIsButton, UMaterialInterface\* BackgroundMaterial, FString pHighLightName, FString pClickName);
		//Initialise this object with a slider button and background
		void Init(bool pIsButton, UMaterialInterface\* SliderMaterial, FString pHighLightName, FString pClickName, UMaterialInterface\* BackgroundMaterial);
		//Initialise this object with a highlightable material with text
		void Init(bool pIsButton, UMaterialInterface\* BackgroundMaterial, FString pHighLightName, FString pClickName, FString pText, UFont\* pFont);
		//Initialise this object with a highlightable animated material
		void Init(bool pIsButton, UMaterialInterface\* BackgroundMaterial, FString pHighLightName, FString pClickName, FVector2D pAnimTiling, int pNumTiles, float pFrameUpdateDelay);
		//Initialise this object with a highlightable animated material with text
		void Init(bool pIsButton, UMaterialInterface\* BackgroundMaterial, FString pHighLightName, FString pClickName, FString pText, UFont\* pFont, FVector2D pAnimTiling, int pNumTiles, float pFrameUpdateDelay);
 
	protected:
		void UpdateAnim();
		void CheckInside(FVector2D MousePos);
};

### HUDObjects.cpp

487 Lines

#include "YourGame.h"
#include "HUDObjects.h"
 
UHUDObjects::UHUDObjects(const class FPostConstructInitializeProperties& PCIP) : Super(PCIP)
{}
 
void UHUDObjects::Init(UTexture2D\* pTexture)
{
	//Pass the texture
	Texture \= pTexture;
}
 
void UHUDObjects::Init(bool pIsButton, UMaterialInterface\* BackgroundMaterial, FString pHighLightName, FString pClickName)
{
	//Initialise global variables with passed parameters
	IsButton \= pIsButton;
 
	//This material pointer is assigned as another pointer isn't it?
	//So how would I make is it's own dynamic instance?
	BackGround \= BackgroundMaterial;
 
	//Set the highlight and click names
	HighLightName \= pHighLightName;
	ClickName \= pClickName;
 
	//If the material exists
	if (BackGround !\= NULL)
	{
		//Create an instance of it
		MIObj \= UMaterialInstanceDynamic::Create(BackGround\-\>GetMaterial(), this);
	}//if
}//Init
 
void UHUDObjects::Init(bool pIsButton, UMaterialInterface\* SliderMaterial, FString pHighLightName, FString pClickName, UMaterialInterface\* BackgroundMaterial)
{
	//pass vars
	Init(pIsButton, SliderMaterial, pHighLightName, pClickName);
	//set slider background
	SliderBackGround \= BackgroundMaterial;
 
	//if it exists
	if (SliderBackGround !\= NULL)
	{
		//create an instance of it
		BGMIObj \= UMaterialInstanceDynamic::Create(SliderBackGround\-\>GetMaterial(), this);
	}//if
}//Init
 
void UHUDObjects::Init(bool pIsButton, UMaterialInterface\* BackgroundMaterial, FString pHighLightName, FString pClickName, FVector2D pAnimTiling, int pNumTiles, float pFrameUpdateDelay)
{
	//pass vars
	Init(pIsButton, BackgroundMaterial, pHighLightName, pClickName);
 
	//set anim tilings
	AnimTiling \= pAnimTiling;
	//set number of anim tiles
	NumTiles \= pNumTiles;
	//set that we have an anim
	bHasAnim \= true;
	//set up frame delay
	FrameUpdateDelay \= pFrameUpdateDelay;
	//set current time to the max
	currentTime \= FrameUpdateDelay;
	//set current tile to 0
	Tile \= 0;
	//calculate the u width of the material
	MatUWidth \= 1 / AnimTiling.X;
	//calculate the v width of the material
	MatVHeight \= 1 / AnimTiling.Y;
}//Init
 
void UHUDObjects::Init(bool pIsButton, UMaterialInterface\* BackgroundMaterial, FString pHighLightName, FString pClickName, FString pText, UFont\* pFont, FVector2D pAnimTiling, int pNumTiles, float pFrameUpdateDelay)
{
	//pass vars
	Init(pIsButton, BackgroundMaterial, pHighLightName, pClickName, pAnimTiling, pNumTiles, pFrameUpdateDelay);
 
	//set text
	Text \= pText;
	//set font
	Font \= pFont;
}//Init
 
void UHUDObjects::Init(FString pText, UFont\* pFont)
{
	//Initialise global variables with passed parameters
	IsButton \= false;
	Text \= pText;
	Font \= pFont;
}//Init
 
void UHUDObjects::Init(bool pIsButton, UMaterialInterface\* BackgroundMaterial, FString pHighLightName, FString pClickName, FString pText, UFont\* pFont)
{
	//pass vars
	Init(pIsButton, BackgroundMaterial, pHighLightName, pClickName);
	//Set text
	Text \= pText;
	//Set font
	Font \= pFont;
}//Init
 
void UHUDObjects::CheckInside(FVector2D MousePos)
{
	//If within the X area
	if (MousePos.X \> ShapeAndPos.x && MousePos.X < ShapeAndPos.x + ShapeAndPos.w)
	{
		//If within the Y area
		if (MousePos.Y \> ShapeAndPos.y && MousePos.Y < ShapeAndPos.y + ShapeAndPos.h)
		{
			//Mouse is inside
			IsInside \= true;
		}//if
		else
		{
			//Mouse is not inside
			IsInside \= false;
		}//else
	}//if
	else
	{
		//Mouse is not inside
		IsInside \= false;
	}//else
 
	//If the material instance exists and the highlight name exists
	if (MIObj !\= NULL && IsButton && HighLightName.Len() \> 0)
	{
		//Set up var
		float TmpVar;
		//Get highlight value, to be sure it exists
		if (MIObj\-\>GetScalarParameterValue(FName(\*HighLightName), TmpVar))
		{
			//if we are inside
			if (IsInside)
			{
				//set it to 1
				MIObj\-\>SetScalarParameterValue(FName(\*HighLightName), 1);
			}//if
			else
			{
				//otherwise set it to 0
				MIObj\-\>SetScalarParameterValue(FName(\*HighLightName), 0);
			}//else
		}//if
	}//if
 
	//If the material instance exists and the click name exists
	if (MIObj !\= NULL && IsButton && ClickName.Len() \> 0)
	{
		//Set up var
		float TmpVar;
		//Get click value, to be sure it exists
		if (MIObj\-\>GetScalarParameterValue(FName(\*ClickName), TmpVar))
		{
			//if it has been grabbed
			if (bGrabbed)
			{
				//set it to 1
				MIObj\-\>SetScalarParameterValue(FName(\*ClickName), 1);
			}//if
			else
			{
				//otherwise set it to 0
				MIObj\-\>SetScalarParameterValue(FName(\*ClickName), 0);
			}//else
		}//if
	}//if
 
}//CheckInside
 
bool UHUDObjects::CheckInsideSliderBG(FVector2D MousePos)
{
	//If within the X area
	if (MousePos.X \> BGShapeAndPos.x && MousePos.X < BGShapeAndPos.x + BGShapeAndPos.w)
	{
		//If within the Y area
		if (MousePos.Y \>(BGShapeAndPos.y \- BGShapeAndPos.h) && MousePos.Y < BGShapeAndPos.y + (BGShapeAndPos.h \* 2))
		{
			//Mouse is inside
			return true;
		}//if
		else
		{
			//Mouse is not inside
			return false;
		}//else
	}//if
	else
	{
		//Mouse is not inside
		return false;
	}//else
}
 
bool UHUDObjects::Hovered()
{
	return IsInside;
}//Hovered
 
void UHUDObjects::UpdateAnim()
{
	//if the time is greater than 0
	if (currentTime \> 0)
	{
		//decrement it
		currentTime \-\= 0.01f;
	}//if
	else
	{
		//otherwise reset it
		currentTime \= FrameUpdateDelay;
 
		//if the current tile is less than the max number of tiles
		if (Tile < (NumTiles \- 1))
		{
			//increment it
			Tile +\= 1;
 
			//increment the u position
			MatU +\= MatUWidth;
 
			//if the u position is now equal to or greater than 1
			if (MatU \>= 1)
			{
				//reset it to 0
				MatU \= 0;
 
				//increment the v position
				MatV +\= MatVHeight;
 
				//if the v position is now equal to or greater than 1
				if (MatV \>= 1)
				{
					//reset it
					MatV \= 0;
				}//if
			}//if
		}//if
		else
		{
			//otherwise reset everything
			Tile \= 0;
			MatU \= 0;
			MatV \= 0;
		}//else
	}//else
}//UpdateAnim
 
void UHUDObjects::Update(AHUD\* HUDRef, FVector2D MousePos, float x, float y, float w, float h, float Scale, FLinearColor TextColour)
{
	//Set vars
	ShapeAndPos.x \= x;
	ShapeAndPos.y \= y;
	ShapeAndPos.w \= w;
	ShapeAndPos.h \= h;
	ScaleAmount \= Scale;
 
	//Check if the mouse is inside the object
	CheckInside(MousePos);
 
	//If the BG material reference  isn't null, and the passed HUD isn't null
	if (HUDRef !\= NULL)
	{
		if (MIObj !\= NULL)
		{
			//if this is an animation
			if (bHasAnim)
			{
				//Update the animation
				UpdateAnim();
 
				HUDRef\-\>DrawMaterial(MIObj,
					ShapeAndPos.x, ShapeAndPos.y,								//X and Y
					ShapeAndPos.w \- (ShapeAndPos.w \* CropX),					//Width Minus cropped percentage
					ShapeAndPos.h \- (ShapeAndPos.h \* CropY),					//Height Minus cropped percentage
					MatU + (MatUWidth \* CropX),									//U start plus percentage of U Width
					MatV + (MatVHeight \* CropY),								//V start plus percentage of V Height
					(MatUWidth \* (1 \- CropU)) \- (MatUWidth \* CropX),			//Width is percentage of cropped U, 
					(MatVHeight \* (1 \- CropV)) \- (MatVHeight \* CropY),			//Height is percentage of cropped V, 
					1, false);													//Other bits
			}//if
			else
			{
				//Draw the material as assigned
				HUDRef\-\>DrawMaterialSimple(MIObj, ShapeAndPos.x, ShapeAndPos.y, ShapeAndPos.w, ShapeAndPos.h, 1, false);
			}//else
		}//If
 
		//if the text isn't empty
		if (!Text.IsEmpty())
		{
			//if the font exists
			if (Font !\= NULL)
			{
				//Get the font text size
				float tWidth, tHeight;
				HUDRef\-\>GetTextSize(Text, tWidth, tHeight, Font, ScaleAmount);
 
				//Calculate spaceing around the text inside the button
				float newX \= (ShapeAndPos.w \- tWidth) / 2;
				float newY \= (ShapeAndPos.h \- tHeight) / 2;
 
				//Draw text and adjust for center
				HUDRef\-\>DrawText(Text, TextColour, ShapeAndPos.x + newX, ShapeAndPos.y + newY, Font, ScaleAmount, false);
			}//if
		}//if 
	}//if
 
}//Update
 
float UHUDObjects::DrawHorizontalSlider(AHUD\* HUDRef, float Amount, float MinAmount, float MaxAmount, FVector2D MousePos, float x, float y, float w, float h, float Scale)
{
	//Set vars
	BGShapeAndPos.x \= x;
	BGShapeAndPos.y \= y;
	BGShapeAndPos.w \= w;
	BGShapeAndPos.h \= h;
	ScaleAmount \= Scale;
 
	//Work out how much to extend the slider to make it fit correctly
	float BGWidener \= BGShapeAndPos.w \* 0.08f;
	//If the BG material reference  isn't null, and the passed HUD isn't null
	if (HUDRef !\= NULL)
	{
		if (BGMIObj !\= NULL)
		{
			//Draw the material as assigned
			HUDRef\-\>DrawMaterialSimple(BGMIObj, BGShapeAndPos.x \- BGWidener, BGShapeAndPos.y, BGShapeAndPos.w + (BGWidener \* 2), BGShapeAndPos.h, 1, false);
		}//if
	}//if
 
	//Get a percentage between 0-1
	float PercentageAlong \= Amount / (MaxAmount \- MinAmount);
 
	//Work out the size/position of the slider, based off of the total size
	ShapeAndPos.w \= BGShapeAndPos.w\*0.05f;
	ShapeAndPos.x \= (BGShapeAndPos.x + (BGShapeAndPos.w \* PercentageAlong)) \- (ShapeAndPos.w/2);
	ShapeAndPos.h \= BGShapeAndPos.h \* 2.5f;
	ShapeAndPos.y \= BGShapeAndPos.y \- ((ShapeAndPos.h \- BGShapeAndPos.h)/2);
 
	//Check if the mouse is inside the object
	CheckInside(MousePos);
 
	//if the object has been grabbed
	if (bGrabbed)
	{
		//then we are inside
		IsInside \= true;
 
		//calculate slider ranges
		float Left \= (BGShapeAndPos.x + (BGShapeAndPos.w \* 0)) \- (ShapeAndPos.w / 2);
		float Right \= (BGShapeAndPos.x + (BGShapeAndPos.w \* 1)) \- (ShapeAndPos.w / 2);
 
		//Update the object to match the mouse pos
		ShapeAndPos.x \= (MousePos.X) \- (ShapeAndPos.w / 2);
		//Clamp within ranges
		ShapeAndPos.x \= FMath::Clamp<float\>(ShapeAndPos.x, Left, Right);
 
		//work out the new percentage to return
		PercentageAlong \= ((ShapeAndPos.x \- BGShapeAndPos.x) + (ShapeAndPos.w / 2)) / BGShapeAndPos.w;
 
		//Calculate the amount to return
		Amount \= MaxAmount \* PercentageAlong;
		//Clamp again just to be sure
		Amount \= FMath::Clamp<float\>(Amount, MinAmount, MaxAmount);
	}//if
 
	//If the BG material reference  isn't null, and the passed HUD isn't null
	if (HUDRef !\= NULL)
	{
		if (MIObj !\= NULL)
		{
			//Draw the material as assigned
			HUDRef\-\>DrawMaterialSimple(MIObj, ShapeAndPos.x, ShapeAndPos.y, ShapeAndPos.w, ShapeAndPos.h, 1, false);
		}//if
	}//if
	return Amount;
}//DrawHorizontalSlider
 
float UHUDObjects::DrawVerticalSlider(AHUD\* HUDRef, float Amount, float MinAmount, float MaxAmount, FVector2D MousePos, float x, float y, float w, float h, float Scale)
{
	//Set vars
	BGShapeAndPos.x \= x;
	BGShapeAndPos.y \= y;
	BGShapeAndPos.w \= w;
	BGShapeAndPos.h \= h;
	ScaleAmount \= Scale;
 
	//Work out how much to extend the slider to make it fit correctly
	float BGHeightAdd \= BGShapeAndPos.h \* 0.08f;
	//If the BG material reference  isn't null, and the passed HUD isn't null
	if (HUDRef !\= NULL)
	{
		if (BGMIObj !\= NULL)
		{
			//Draw the material as assigned
			HUDRef\-\>DrawMaterialSimple(BGMIObj, BGShapeAndPos.x, BGShapeAndPos.y \- BGHeightAdd, BGShapeAndPos.w, BGShapeAndPos.h + (BGHeightAdd \* 2), 1, false);
		}//if
	}//if
 
	//Get a percentage between 0-1
	float PercentageAlong \= Amount / (MaxAmount \- MinAmount);
 
	//Inverting
	PercentageAlong \= 1 \- PercentageAlong;
 
	//Work out the size/position of the slider, based off of the total size
	ShapeAndPos.h \= BGShapeAndPos.h\*0.05f;
	ShapeAndPos.y \= (BGShapeAndPos.y + (BGShapeAndPos.h \* PercentageAlong)) \- (ShapeAndPos.h / 2);
	ShapeAndPos.w \= BGShapeAndPos.w \* 2.5f;
	ShapeAndPos.x \= BGShapeAndPos.x \- ((ShapeAndPos.w \- BGShapeAndPos.w) / 2);
 
	//Check if the mouse is inside the object
	CheckInside(MousePos);
 
	//if the object has been grabbed
	if (bGrabbed)
	{
		//then we are inside the button
		IsInside \= true;
 
		//Work out the ranges the slider can meet
		float Top \= (BGShapeAndPos.y + (BGShapeAndPos.h \* 0)) \- (ShapeAndPos.h / 2);
		float Bottom \= (BGShapeAndPos.y + (BGShapeAndPos.h \* 1)) \- (ShapeAndPos.h / 2);
 
		//Update the object to match the mouse pos
		ShapeAndPos.y \= (MousePos.Y) \- (ShapeAndPos.h / 2);
		//Clamp within ranges
		ShapeAndPos.y \= FMath::Clamp<float\>(ShapeAndPos.y, Top, Bottom);
 
		//Work out the percentage to return
		PercentageAlong \= ((ShapeAndPos.y \- BGShapeAndPos.y) + (ShapeAndPos.h / 2)) / BGShapeAndPos.h;
 
		//Inverting
		PercentageAlong \= 1 \- PercentageAlong;
 
		//Calculate the amount
		Amount \= MaxAmount \* PercentageAlong;
		//Clamp it just to be sure
		Amount \= FMath::Clamp<float\>(Amount, MinAmount, MaxAmount);
	}//if
 
	//If the BG material reference  isn't null, and the passed HUD isn't null
	if (HUDRef !\= NULL)
	{
		if (MIObj !\= NULL)
		{
			//Draw the material as assigned
			HUDRef\-\>DrawMaterialSimple(MIObj, ShapeAndPos.x, ShapeAndPos.y, ShapeAndPos.w, ShapeAndPos.h, 1, false);
		}//if
	}//if
	return Amount;
}//DrawVerticalSlider
 
void UHUDObjects::DrawTexture(AHUD\* HUDRef, float x, float y, float w, float h, FColor pColour)
{
	//if the hud exists
	if (HUDRef !\= NULL)
	{
		//if the texture exists
		if (Texture !\= NULL)
		{
			//Draw the texture
			HUDRef\-\>DrawTexture(Texture, x, y,
				w \- (w \* CropX), 
				h \- (h \* CropY), 
				0 + CropX, 
				0 + CropY, 
				(1 \- CropU) + CropX, 
				(1 \- CropV) + CropY, 
				pColour);
		}//if
	}//if
}
 
void UHUDObjects::CropObjectUV(FVector2D UVCrop)
{
	//Pass in vars within clamped ranges
	CropU \= FMath::Clamp<float\>(UVCrop.X, 0, 1);
	CropV \= FMath::Clamp<float\>(UVCrop.Y, 0, 1);
}//CropObjectUV
 
void UHUDObjects::CropObjectXY(FVector2D XYCrop)
{
	//Pass in vars within clamped ranges
	CropX \= FMath::Clamp<float\>(XYCrop.X, 0, 1);
	CropY \= FMath::Clamp<float\>(XYCrop.Y, 0, 1); 
}//CropObjectXY

### GUI.h

251 Lines

#pragma once
 
#include "GameFramework/HUD.h"
#include "HUDObjects.h"
#include "GUI.generated.h"
 
USTRUCT()
struct FButtonMaterial
{
	GENERATED\_USTRUCT\_BODY()
 
	//The material to be used for this HUD object
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Buttons)
		UMaterialInterface\* Material;
 
	//Name of the material var for toggling Highlighting
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Buttons)
		FString HighLightVarName;
 
	//Name of the material var for toggling Selection
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Animations)
		FString ClickVarName;
 
	FButtonMaterial()
	{
		//Defaults
		HighLightVarName \= "HighLight";
		ClickVarName \= "Click";
	}
};
 
USTRUCT()
struct FAnimationStruct
{
	GENERATED\_USTRUCT\_BODY()
 
	//The material to be used for this HUD object
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Animations)
		UMaterialInterface\* Material;
 
	//Name of the material var for toggling Highlighting
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Animations)
		FString HighLightVarName;
 
	//Name of the material var for toggling Selection
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Animations)
		FString ClickVarName;
 
	//Animation Rows and Columns
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Animations)
		FVector2D AnimColRows;
 
	//Total Number of tiles in the animation
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Animations)
		float TotalAnimTiles;
 
	//Time between each frame
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Animations)
		float FrameDelaySeconds;
 
	FAnimationStruct()
	{
		//Defaults
		TotalAnimTiles \= 0;
		FrameDelaySeconds \= 0.5f;
		HighLightVarName \= "";
		ClickVarName \= "";
	}
};
 
UCLASS()
class AGUI : public AHUD
{
	GENERATED\_UCLASS\_BODY()
 
	// Infiltrace
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Text)
		TArray<UFont\*\> Fonts;
 
	//Font scale
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Text)
		float DefaultFontScale;
 
	//Button Materials 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Buttons)
		TArray<FButtonMaterial\> ButtonMaterials;
 
	//Image Textures
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Textures)
		TArray<UTexture2D\*\> ImageTextures;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Materials)
		TArray<UMaterialInterface\*\> Materials;
 
	//Animated Materials
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Animations)
		TArray<FAnimationStruct\> AnimationMaterials;
 
	// Draw Hud?
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= Options)
		bool NoHUD;
 
	public:
		//Reference to the Player Controller
		UPROPERTY()
		APlayerController\* ThePC;
 
	protected:
 
		//Screen Sizes
		UPROPERTY()
			float SizeX;
		UPROPERTY()
			float SizeY;
 
		/\*
		\* GUI Object that creates a label with simple, centered text
		\* @param Object (out) - The object to be instantiated and/or updated
		\* @param pHUDRef - The hud pointer to be passed : this
		\* @param pText - The text to be displayed
		\* @param FontIndex - The font to be used from this HUD's FONT array
		\* @param TextColour - The colour of the font to be displayed
		\* @param x - The start horizontal position of the object in pixels
		\* @param y - The start vertical position of the object in pixels
		\* @param w - The width of the object in pixels
		\* @param h - The height of the object in pixels
		\* @param pScale - Standard AHUD scaling		
		\*/
		void Label(/\* Out \*/ UHUDObjects\* & Object, AHUD\* pHUDRef, FString pText, int FontIndex, FLinearColor TextColour, float x, float y, float w, float h, float pScale \= 1);
 
		/\*
		\* GUI Object that creates a texture at a specified location, with a given size and colour
		\* @param Object (out) - The object to be instantiated and/or updated
		\* @param pHUDRef - The hud pointer to be passed : this
		\* @param TextureIndex - The texture to be used from this HUD's TEXTURE array
		\* @param x - The start horizontal position of the object in pixels
		\* @param y - The start vertical position of the object in pixels
		\* @param w - The width of the object in pixels
		\* @param h - The height of the object in pixels
		\* @param pColour - The colour adjustment that should be applied to the texture
		\*/
		void Texture(/\* Out \*/ UHUDObjects\* & Object, AHUD\* pHUDRef, int TextureIndex, float x, float y, float w, float h, FColor pColour \= FColor::White);
 
		/\*
		\* GUI Object that creates a basic material, with a given size and position
		\* @param Object (out) - The object to be instantiated and/or updated
		\* @param pHUDRef - The hud pointer to be passed : this
		\* @param MatIndex - The material to be used from this HUD's MATERIAL array
		\* @param pText - The text to be displayed
		\* @param FontIndex - The font to be used from this HUD's FONT array
		\* @param TextColour - The colour of the font to be displayed
		\* @param x - The start horizontal position of the object in pixels
		\* @param y - The start vertical position of the object in pixels
		\* @param w - The width of the object in pixels
		\* @param h - The height of the object in pixels
		\* @param pScale - Standard AHUD scaling
		\*/
		void Material(/\* Out \*/ UHUDObjects\* & Object, AHUD\* pHUDRef, int MatIndex, FString pText, int FontIndex, FLinearColor TextColour, float x, float y, float w, float h, float pScale \= 1);
 
		/\*
		\* GUI Object that creates an Animated Sprite Sheet Material, with a given size and position
		\* @param Object (out) - The object to be instantiated and/or updated
		\* @param pHUDRef - The hud pointer to be passed : this
		\* @param AnimIndex - The animated material to be used from this HUD's ANIMATEDMATERIAL array
		\* @param x - The start horizontal position of the object in pixels
		\* @param y - The start vertical position of the object in pixels
		\* @param w - The width of the object in pixels
		\* @param h - The height of the object in pixels
		\* @param pScale - Standard AHUD scaling
		\*/
		void AnimatedMaterial(/\* Out \*/ UHUDObjects\* & Object, AHUD\* pHUDRef, int AnimIndex, float x, float y, float w, float h, float pScale \= 1);
 
		/\*
		\* GUI Object that acts as a button, with 3 states: Normal, Highlighted and Clicked. Returns a bool if clicked
		\* @param Object (out) - The object to be instantiated and/or updated
		\* @param pHUDRef - The hud pointer to be passed : this
		\* @param ButtonIndex - The button material to be used from this HUD's BUTTONMATERIAL array
		\* @param pText - The text to be displayed
		\* @param FontIndex - The font to be used from this HUD's FONT array
		\* @param TextColour - The colour of the font to be displayed
		\* @param pMousePos - The position of the mouse in screen space
		\* @param x - The start horizontal position of the object in pixels
		\* @param y - The start vertical position of the object in pixels
		\* @param w - The width of the object in pixels
		\* @param h - The height of the object in pixels
		\* @param pScale - Standard AHUD scaling
		\*/
		bool Button(/\* Out \*/ UHUDObjects\* & Object, AHUD\* pHUDRef, int ButtonIndex, FString pText, int FontIndex, FLinearColor TextColour, FVector2D pMousePos, float x, float y, float w, float h, float pScale \= 1);
 
		/\*
		\* GUI Object that acts as a button, with 3 animated sprite sheet states: Normal, Highlighted and Clicked. Returns a bool if clicked
		\* @param Object (out) - The object to be instantiated and/or updated
		\* @param pHUDRef - The hud pointer to be passed : this
		\* @param AnimButtonIndex - The button material to be used from this HUD's ANIMATEDMATERIAL array
		\* @param pText - The text to be displayed
		\* @param FontIndex - The font to be used from this HUD's FONT array
		\* @param TextColour - The colour of the font to be displayed
		\* @param pMousePos - The position of the mouse in screen space
		\* @param x - The start horizontal position of the object in pixels
		\* @param y - The start vertical position of the object in pixels
		\* @param w - The width of the object in pixels
		\* @param h - The height of the object in pixels
		\* @param pScale - Standard AHUD scaling
		\*/
		bool AnimatedButton(/\* Out \*/ UHUDObjects\* & Object, AHUD\* pHUDRef, int AnimButtonIndex, FString pText, int FontIndex, FLinearColor TextColour, FVector2D pMousePos, float x, float y, float w, float h, float pScale \= 1);
 
		/\*
		\* GUI Object that returns the updated value of the slider
		\* @param Object (out) - The object to be instantiated and/or updated
		\* @param pHUDRef - The hud pointer to be passed : this
		\* @param SliderButtonIndex - The button material to be used from this HUD's BUTTONMATERIAL array
		\* @param SliderBackgroundMaterialIndex - The button material to be used from this HUD's MATERIAL array
		\* @param pMousePos - The position of the mouse in screen space
		\* @param x - The start horizontal position of the object in pixels
		\* @param y - The start vertical position of the object in pixels
		\* @param w - The width of the object in pixels
		\* @param h - The height of the object in pixels
		\* @param Amount - The amount to be passed in on this update pass
		\* @param MinAmount - The minimum amount to be used in this slider
		\* @param MaxAmount - The maximum amount to be used in this slider
		\*/
		float HorizontalSlider(/\* Out \*/ UHUDObjects\* & Object, AHUD\* pHUDRef, int SliderButtonIndex, int SliderBackgroundMaterialIndex, FVector2D pMousePos, float x, float y, float w, float h, float Amount \= 0, float MinAmount \= 0, float MaxAmount \= 1);
 
 
		/\*
		\* GUI Object that returns the updated value of the slider
		\* @param Object (out) - The object to be instantiated and/or updated
		\* @param pHUDRef - The hud pointer to be passed : this
		\* @param SliderButtonIndex - The button material to be used from this HUD's BUTTONMATERIAL array
		\* @param SliderBackgroundMaterialIndex - The button material to be used from this HUD's MATERIAL array
		\* @param pMousePos - The position of the mouse in screen space
		\* @param x - The start horizontal position of the object in pixels
		\* @param y - The start vertical position of the object in pixels
		\* @param w - The width of the object in pixels
		\* @param h - The height of the object in pixels
		\* @param Amount - The amount to be passed in on this update pass
		\* @param MinAmount - The minimum amount to be used in this slider
		\* @param MaxAmount - The maximum amount to be used in this slider
		\*/
		float VerticalSlider(/\* Out \*/ UHUDObjects\* & Object, AHUD\* pHUDRef, int SliderButtonIndex, int SliderBackgroundMaterialIndex, FVector2D pMousePos, float x, float y, float w, float h, float Amount \= 0, float MinAmount \= 0, float MaxAmount \= 1);
 
		//Scaling
		float CenterHorizontal(float Width);
		float CenterVertical(float Height);
		float ScaleWidth(float Width);
		float ScaleHeight(float Height);
 
		/\*\* after all game elements are created \*/
		virtual void PostInitializeComponents() OVERRIDE;
		virtual void DrawHUD() OVERRIDE;
};

### GUI.cpp

346 Lines

#include "YourGame.h"
#include "GUI.h"
 
//Constructor
AGUI::AGUI(const class FPostConstructInitializeProperties& PCIP) : Super(PCIP)
{
	//Draw HUD?
	NoHUD \= false;
 
	//Scale
	DefaultFontScale \= 0.7;
}//Constructor
 
//SCALING
float AGUI::ScaleWidth(float Width)
{
	return (Width / 1920)\*SizeX;
}///Scale Width
 
float AGUI::CenterHorizontal(float Width)
{
	return (SizeX / 2) \- (ScaleWidth(Width) / 2);
}//CenterHorizontal
 
float AGUI::ScaleHeight(float Height)
{
	return (Height / 1920)\*SizeY;
}//ScaleHeight
 
float AGUI::CenterVertical(float Height)
{
	return (SizeY / 2) \- (ScaleHeight(Height) / 2);
}//CenterVertical
 
//CORE
void AGUI::PostInitializeComponents()
{
	Super::PostInitializeComponents();
 
	//Grab the PC
	ThePC \= GetOwningPlayerController();
}//PostInitializeComponents
 
void AGUI::DrawHUD()
{
	//If the PC is NULL
	if (!ThePC)
	{
		//Try to get the PC
		ThePC \= GetOwningPlayerController();
 
		//If there still isn't a PC, then return
		if (!ThePC) return;
	}//if
 
	//Check that the PC's input exists, otherwise, return
	if (!ThePC\-\>PlayerInput) return;
 
	//Draw HUD?
	if (NoHUD) return;
 
	//Super
	Super::DrawHUD();
 
	//No Canvas?
	if (!Canvas) return;
 
	//Assign the canvas sizes to the global vars for use outside of DrawHUD
	SizeX \= Canvas\-\>SizeX;
	SizeY \= Canvas\-\>SizeY;
}//DrawHUD
 
//GUI WIDGETS
void AGUI::Label(UHUDObjects\* & Object, AHUD\* pHUDRef, FString pText, int FontIndex, FLinearColor TextColour, float x, float y, float w, float h, float pScale)
{
	//Instantiate new object and assign reference to the pointer
	if (Object \== NULL)
	{
		//If the pointer has an object
		if (Fonts.IsValidIndex(FontIndex) && Fonts\[FontIndex\] !\= nullptr)
		{
			Object \= NewObject<UHUDObjects\>(this);
			if (Object !\= NULL)
			{
				//Set up the HUD Object
				Object\-\>Init(pText, Fonts\[FontIndex\]);
			}//if
		}//if
	}//if
	else
	{
		//Update the object
		Object\-\>Update(pHUDRef, FVector2D(0, 0), x, y, w, h, pScale, TextColour);
	}//else
}//Label
 
void AGUI::Texture(/\* Out \*/ UHUDObjects\* & Object, AHUD\* pHUDRef, int TextureIndex, float x, float y, float w, float h, FColor pColour)
{
	if (Object \== NULL)
	{
		//If the pointer has an object
		if (ImageTextures.IsValidIndex(TextureIndex) && ImageTextures\[TextureIndex\] !\= nullptr)
		{
			Object \= NewObject<UHUDObjects\>(this);
			if (Object !\= NULL)
			{
				//Set up the HUD Object
				Object\-\>Init(ImageTextures\[TextureIndex\]);
			}//if
		}//if
	}//if
	else
	{
		//Update the object
		Object\-\>DrawTexture(pHUDRef, x, y, w, h, FColor::White);
	}//else
}//Texture
 
void AGUI::Material(UHUDObjects\* & Object, AHUD\* pHUDRef, int MatIndex, FString pText, int FontIndex, FLinearColor TextColour, float x, float y, float w, float h, float pScale)
{
	if (Object \== NULL)
	{
		//If the pointer has an object
		if (ButtonMaterials.IsValidIndex(MatIndex) && ButtonMaterials\[MatIndex\].Material !\= nullptr && Fonts.IsValidIndex(FontIndex) && Fonts\[FontIndex\] !\= nullptr)
		{
			Object \= NewObject<UHUDObjects\>(this);
			if (Object !\= NULL)
			{
				//Set up the HUD Object
				Object\-\>Init(false, Materials\[MatIndex\], "", "", pText, Fonts\[FontIndex\]);
			}//if
		}//if 
	}//if
	else
	{
		//Update object
		Object\-\>Update(pHUDRef, FVector2D(0, 0), x, y, w, h, pScale, TextColour);
	}//else
}//Material
 
void AGUI::AnimatedMaterial(UHUDObjects\* & Object, AHUD\* pHUDRef, int AnimIndex, float x, float y, float w, float h, float pScale)
{
	//Instantiate new object and assign reference to the pointer
	if (Object \== NULL)
	{
		//If the pointer has an object
		if (AnimationMaterials.IsValidIndex(AnimIndex) && AnimationMaterials\[AnimIndex\].Material !\= nullptr)
		{
			Object \= NewObject<UHUDObjects\>(this);
			if (Object !\= NULL)
			{
				//Set up the HUD Object
				Object\-\>Init(false, AnimationMaterials\[AnimIndex\].Material, AnimationMaterials\[AnimIndex\].HighLightVarName, AnimationMaterials\[AnimIndex\].ClickVarName, AnimationMaterials\[AnimIndex\].AnimColRows, AnimationMaterials\[AnimIndex\].TotalAnimTiles, AnimationMaterials\[AnimIndex\].FrameDelaySeconds);
			}
		}//if
	}//if
	else
	{
		//Update the object
		Object\-\>Update(pHUDRef, FVector2D(0,0), x, y, w, h, pScale);
	}//else
}//Animated Material
 
bool AGUI::Button(UHUDObjects\* & Object, AHUD\* pHUDRef, int ButtonIndex, FString pText, int FontIndex, FLinearColor TextColour, FVector2D pMousePos, float x, float y, float w, float h, float pScale)
{
	//If the object doesn't exit
	if (Object \== NULL)
	{
		//If the pointer has an object
		if (ButtonMaterials.IsValidIndex(ButtonIndex) && ButtonMaterials\[ButtonIndex\].Material !\= nullptr && Fonts.IsValidIndex(FontIndex) && Fonts\[FontIndex\] !\= nullptr)
		{
			//create a new version of the object
			Object \= NewObject<UHUDObjects\>(this);
			if (Object !\= NULL)
			{
				//Set up the HUD Object
				Object\-\>Init(true, ButtonMaterials\[ButtonIndex\].Material, ButtonMaterials\[ButtonIndex\].HighLightVarName, ButtonMaterials\[ButtonIndex\].ClickVarName, pText, Fonts\[FontIndex\]);
			}//if
		}//if 
 
		return false;
	}//if
	else
	{
		//Update the object
		Object\-\>Update(pHUDRef, pMousePos, x, y, w, h, pScale, TextColour);
 
		//If the left mouse button is down
		if (ThePC\-\>IsInputKeyDown(EKeys::LeftMouseButton))
		{
			//if the object is hovered and the button was just pressed
			if (Object\-\>Hovered() && ThePC\-\>WasInputKeyJustPressed(EKeys::LeftMouseButton))
			{
				//we have grabbed the object
				Object\-\>bGrabbed \= true;
			}//if
		}//if
		else
		{
			//if the object has been grabbed
			if (Object\-\>bGrabbed)
			{
				//set it to false
				Object\-\>bGrabbed \= false;
				return Object\-\>Hovered();
			}//if
			return false;
		}//else
		return false;
	}//else
}//button
 
bool AGUI::AnimatedButton(UHUDObjects\* & Object, AHUD\* pHUDRef, int AnimButtonIndex, FString pText, int FontIndex, FLinearColor TextColour, FVector2D pMousePos, float x, float y, float w, float h, float pScale)
{
	//Instantiate new object and assign reference to the pointer
	if (Object \== NULL)
	{
		//If the pointer has an object
		if (AnimationMaterials.IsValidIndex(AnimButtonIndex) && AnimationMaterials\[AnimButtonIndex\].Material !\= nullptr && Fonts.IsValidIndex(FontIndex) && Fonts\[FontIndex\] !\= nullptr)
		{
			//create a new object
			Object \= NewObject<UHUDObjects\>(this);
			if (Object !\= NULL)
			{
				//Set up the HUD Object
				Object\-\>Init(true, AnimationMaterials\[AnimButtonIndex\].Material, AnimationMaterials\[AnimButtonIndex\].HighLightVarName, AnimationMaterials\[AnimButtonIndex\].ClickVarName, pText, Fonts\[FontIndex\], AnimationMaterials\[AnimButtonIndex\].AnimColRows, AnimationMaterials\[AnimButtonIndex\].TotalAnimTiles, AnimationMaterials\[AnimButtonIndex\].FrameDelaySeconds);
			}//if
		}//if
 
		return false;
	}//if
	else
	{
		//update object
		Object\-\>Update(pHUDRef, pMousePos, x, y, w, h, pScale, TextColour);
 
		//if the left mouse button is down
		if (ThePC\-\>IsInputKeyDown(EKeys::LeftMouseButton))
		{
			//if the mouse is over the object and the button was pressed during this frame
			if (Object\-\>Hovered() && ThePC\-\>WasInputKeyJustPressed(EKeys::LeftMouseButton))
			{
				//we have grabbed the object
				Object\-\>bGrabbed \= true;
			}//if
		}//if
		else
		{
			//if the object has been grabbed
			if (Object\-\>bGrabbed)
			{
				//set it to false
				Object\-\>bGrabbed \= false;
				return Object\-\>Hovered();
			}//if
			return false;
		}//else
		return false;
	}//else
}//AnimatedButton
 
float AGUI::HorizontalSlider(UHUDObjects\* & Object, AHUD\* pHUDRef, int SliderButtonIndex, int SliderBackgroundMaterialIndex, FVector2D pMousePos, float x, float y, float w, float h, float Amount, float MinAmount, float MaxAmount)
{
	if (Object \== NULL)
	{
		//If the pointer has an object
		if (ButtonMaterials.IsValidIndex(SliderButtonIndex) && ButtonMaterials\[SliderButtonIndex\].Material !\= nullptr && Materials.IsValidIndex(SliderBackgroundMaterialIndex) && Materials\[SliderBackgroundMaterialIndex\] !\= nullptr)
		{
			Object \= NewObject<UHUDObjects\>(this);
			if (Object !\= NULL)
			{
				//Set up the HUD Object
				Object\-\>Init(true, ButtonMaterials\[SliderButtonIndex\].Material, ButtonMaterials\[SliderButtonIndex\].HighLightVarName, ButtonMaterials\[SliderButtonIndex\].ClickVarName, Materials\[SliderBackgroundMaterialIndex\]);
			}//if
		}//if
 
		return Amount;
	}//if
	else
	{
		if (ThePC\-\>IsInputKeyDown(EKeys::LeftMouseButton))
		{
			if ((Object\-\>Hovered() || Object\-\>CheckInsideSliderBG(pMousePos)) && ThePC\-\>WasInputKeyJustPressed(EKeys::LeftMouseButton))
			{
				Object\-\>bGrabbed \= true;
			}//if
		}//if
		else
		{
			if (Object\-\>bGrabbed)
			{
				Object\-\>bGrabbed \= false;
			}//if
		}//else
 
		//Clamp the range just to be sure
		Amount \= FMath::Clamp<float\>(Amount, MinAmount, MaxAmount);
 
		//Draw slider button
		return Object\-\>DrawHorizontalSlider(pHUDRef, Amount, MinAmount, MaxAmount, pMousePos, x, y, w, h, 1);
	}//else
	return Amount;
}//HorizontalSlider
 
float AGUI::VerticalSlider(UHUDObjects\* & Object, AHUD\* pHUDRef, int SliderButtonIndex, int SliderBackgroundMaterialIndex, FVector2D pMousePos, float x, float y, float w, float h, float Amount, float MinAmount, float MaxAmount)
{
	if (Object \== NULL)
	{
		//If the pointer has an object
		if (ButtonMaterials.IsValidIndex(SliderButtonIndex) && ButtonMaterials\[SliderButtonIndex\].Material !\= nullptr && Materials.IsValidIndex(SliderBackgroundMaterialIndex) && Materials\[SliderBackgroundMaterialIndex\] !\= nullptr)
		{
			Object \= NewObject<UHUDObjects\>(this);
			if (Object !\= NULL)
			{
				//Set up the HUD Object
				Object\-\>Init(true, ButtonMaterials\[SliderButtonIndex\].Material, ButtonMaterials\[SliderButtonIndex\].HighLightVarName, ButtonMaterials\[SliderButtonIndex\].ClickVarName, Materials\[SliderBackgroundMaterialIndex\]);
			}//if
		}//if
 
		return Amount;
	}//if
	else
	{
		if (ThePC\-\>IsInputKeyDown(EKeys::LeftMouseButton))
		{
			if ((Object\-\>Hovered() || Object\-\>CheckInsideSliderBG(pMousePos)) && ThePC\-\>WasInputKeyJustPressed(EKeys::LeftMouseButton))
			{
				Object\-\>bGrabbed \= true;
			}//if
		}//if
		else
		{
			if (Object\-\>bGrabbed)
			{
				Object\-\>bGrabbed \= false;
			}//if
		}//else
 
		//Clamp the range just to be sure
		Amount \= FMath::Clamp<float\>(Amount, MinAmount, MaxAmount);
 
		//Draw slider button
		return Object\-\>DrawVerticalSlider(pHUDRef, Amount, MinAmount, MaxAmount, pMousePos, x, y, w, h, 1);
	}//else
	return Amount;
}//VerticalSlider

### YourHUD.h

42 Lines

#pragma once
 
#include "GUI.h"
#include "YourHUD.generated.h"
 
UCLASS()
class AYourHUD : public AGUI
{
	GENERATED\_UCLASS\_BODY()
 
	public:
 
		//Objects we will be using to demonstrate each type of object
		UPROPERTY()
		UHUDObjects\* TestLabel;
		UPROPERTY()
		UHUDObjects\* TestTexture;
		UPROPERTY()
		UHUDObjects\* TestMaterial;
		UPROPERTY()
		UHUDObjects\* TestAnimMaterial;
		UPROPERTY()
		UHUDObjects\* TestButton;
		UPROPERTY()
		UHUDObjects\* TestAnimButton;
		UPROPERTY()
		UHUDObjects\* TestHorizontalSlider;
		UPROPERTY()
		UHUDObjects\* TestVerticalSlider;
 
		//Variables to hold for the sliders
		float horizontalSlideValue;
		float verticalSlideValue;
 
		//Variable to hold mouse position
		UPROPERTY()
		FVector2D MousePos;
 
	protected:
		//Draw HUD
		virtual void DrawHUD() OVERRIDE;
};

### YourHUD.cpp

72 Lines

#include "YourGame.h"
#include "YourHUD.h"
 
//Constructor
AYourHUD::AYourHUD(const class FPostConstructInitializeProperties& PCIP) : Super(PCIP)
{
	//Default the mouse positions
	MousePos.X \= 0;
	MousePos.Y \= 0;
 
	//Default the slider values
	horizontalSlideValue \= 0;
	verticalSlideValue \= 0;
}//Constructor
 
void AYourHUD::DrawHUD()
{
	//If the PC is NULL
	if (!ThePC)
	{
		//Try to get the PC
		ThePC \= GetOwningPlayerController();
 
		//If there still isn't a PC, then return
		if (!ThePC) return;
	}//if
 
	//Check that the PC's input exists, otherwise, return
	if (!ThePC\-\>PlayerInput) return; 
 
	//Draw HUD?
	if (NoHUD) return;
 
	//Super
	Super::DrawHUD();
 
	//No Canvas?
	if (!Canvas) return;
 
	//Grab the mouse position
	ThePC\-\>GetMousePosition(MousePos.X, MousePos.Y);
 
	//This works by passing the object, this hud, the text, the index of the font array you want to use, the mouse position, then rectangle positioning, using scaling functions, and then the font size, scaled to the screen.
	Label(TestLabel, this, "This is a label!", 0, FLinearColor::White, CenterHorizontal(300), ScaleHeight(120), ScaleWidth(300), ScaleHeight(120), ScaleWidth(0.75f));
 
	//This works by passing the object, this hud, the index of the texture array you want to use, then rectangle positioning, and finally a tint colour
	Texture(TestTexture, this, 0, CenterHorizontal(300), ScaleHeight(240), ScaleWidth(300), ScaleHeight(120), FColor::White);
 
	//This works by passing the object, this hud, the index of the material array you want to use, the text, the index of the font array you want to use, rectangle positioning, and font/material scaling
	Material(TestMaterial, this, 0, "This is a material!", 0, FLinearColor::White, CenterHorizontal(300), ScaleHeight(360), ScaleWidth(300), ScaleHeight(120), ScaleWidth(0.75f));
 
	//This works by passing the object, this hud, the index of the animated material array you want to use, rectangle positions, and font/material scaling
	AnimatedMaterial(TestAnimMaterial, this, 0, CenterHorizontal(300), ScaleHeight(480), ScaleWidth(300), ScaleHeight(120), ScaleWidth(0.75f));
 
	//This works by passing the object, this hud, then index of the button material array you want to use, the text, the index of the font, the font colour, the mouse position, rectangle positioning and font/material scaling
	if(Button(TestButton, this, 0, "This is a button!", 0, FLinearColor::White, MousePos, CenterHorizontal(300), ScaleHeight(600), ScaleWidth(300), ScaleHeight(120), ScaleWidth(0.75f)))
	{
		//Stuff goes here for when button is clicked
	}//if
 
	//This works by passing the object, this hud, then index of the animated button material array you want to use, the text, the index of the font, the font colour, the mouse position, rectangle positioning and font/material scaling
	if(AnimatedButton(TestAnimButton, this, 0, "This is an animated button!", 0, FLinearColor::White, MousePos, CenterHorizontal(300), ScaleHeight(720), ScaleWidth(300), ScaleHeight(120), ScaleWidth(0.75f)))
	{
		//Stuff goes here for when button is clicked
	}//if
 
	//This works by passing the object, this hud, the index of the button for the slider, the index for the material for the background, rectangle positioning, the current value, the min value and the max value.
	horizontalSlideValue \= HorizontalSlider(TestHorizontalSlider, this, 0, 0, MousePos, CenterHorizontal(300), ScaleHeight(840), ScaleWidth(300), ScaleHeight(7.5f), horizontalSlideValue, 0, 1);
 
	//This works by passing the object, this hud, the index of the button for the slider, the index for the material for the background, rectangle positioning, the current value, the min value and the max value.
	verticalSlideValue \= HorizontalSlider(TestVerticalSlider, this, 0, 0, MousePos, CenterHorizontal(400), CenterVertical(300), ScaleWidth(7.5f), ScaleHeight(300), verticalSlideValue, 0, 1);	
}//DrawHUD

BluePrint/Editor End
--------------------

Once you have compild your new project, make a new Class BluePrint of "YourHUD" and set the new BP to be your HUD System. Open the BluePrint and go into the defaults.

### Text Section

Drop down the Text section, add an element to the Fonts array, and add in the font you created earlier. Any time the script asks for a 'Font Index', it's referring to the element number of this array. (On the left)

[![Fonts](https://d26ilriwvtzlb.cloudfront.net/5/51/TextHUD.png)](/File:TextHUD.png "Fonts")

### Buttons Section

Drop down the Button section, add an element to the Button Materials array, and add in the button material you created earlier. Set the Highlight and Click names to be the respective parameters in that material. Any time the script asks for a 'Button Index' or 'Slider Button Index', it's referring to the element number of this array. (On the left)

[![Buttons](https://d26ilriwvtzlb.cloudfront.net/d/df/ButtonHUD.png)](/File:ButtonHUD.png "Buttons")

### Textures Section

Drop down the Textures section, add an element to the Image Textures array, and add in the texture you want. Any time the script asks for a 'Texture Index', it's referring to the element number of this array. (On the left)

[![Textures](https://d26ilriwvtzlb.cloudfront.net/a/a7/TextureHUD.png)](/File:TextureHUD.png "Textures")

### Materials Section

Drop down the Materials section, add an element to the Materials array, and add in the simple material you made earlier. Any time the script asks for a 'Material Index' or 'Slider Background Material Index', it's referring to the element number of this array. (On the left)

[![Materials](https://d26ilriwvtzlb.cloudfront.net/a/a0/MaterialHUD.png)](/File:MaterialHUD.png "Materials")

### Animations Section

Drop down the Animations section, add an element to the Animation Materials array, and add in the simple or button material you created earlier. NOTE: This expects the textures of the material to be in a sprite sheet layout. If its a Button, then set the Highlight and Click names to be the respective parameters in that material. Any time the script asks for a 'Anim Button Index' or 'Anim Index', it's referring to the element number of this array. (On the left)

The 'Anim Col Rows' is how many sprites across the texture is, then how many down. Total anim tiles is how many tiles there are altogether, in case it doesn't go all the way to the end. The Frame Delay Seconds is how much time you want there to be between frame updates.

[![Animations](https://d26ilriwvtzlb.cloudfront.net/a/af/AnimationHUD.png)](/File:AnimationHUD.png "Animations")

Conclusion
----------

You can take this code and make whatever kind of HUD system you want. I never demonstrated it, but there are functions in the GUI class that can crop animated materials, so you can have an animated health bar thats cropped from the left, making it look like it's decreasing without cutting off at the right. 'CropXY(FVector2D)' and 'CropUV(FVector2D)'

You can also set up your own mouse system that doesn't use 'ThePC->GetMousePosition()' and implement a cool feature like gamepad control, etc.

\-Peace

Retrieved from "[https://wiki.unrealengine.com/index.php?title=HUD:\_Unity\_3D\_OnGUI\_Remake&oldid=5469](https://wiki.unrealengine.com/index.php?title=HUD:_Unity_3D_OnGUI_Remake&oldid=5469)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)