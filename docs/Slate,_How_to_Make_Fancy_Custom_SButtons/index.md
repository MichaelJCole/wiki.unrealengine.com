Slate, How to Make Fancy Custom SButtons - Epic Wiki                    

Slate, How to Make Fancy Custom SButtons
========================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Video](#Video)
*   [3 .H](#.H)
*   [4 .CPP](#.CPP)
    *   [4.1 FButtonStyle](#FButtonStyle)
    *   [4.2 Rainbow Background Button](#Rainbow_Background_Button)
    *   [4.3 Trash Can Button](#Trash_Can_Button)
    *   [4.4 Setting The Cursors](#Setting_The_Cursors)
    *   [4.5 Setting the Custom Tooltips](#Setting_the_Custom_Tooltips)
    *   [4.6 Updating the Text When Highlighted](#Updating_the_Text_When_Highlighted)
*   [5 Summary](#Summary)

Overview
--------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

In this tutorial I show you how to make some fancy custom buttons!

I show you how to use **images** as button background, or as the entire button!

I also show you how to use custom color and font text!

I also give you the code for how to make **custom Tool Tips**

Lastly I show how to make text highlight when it is hovered over :)

Enjoy!

Video
-----

Here's a video demoing what I am showing you in this tutorial!

.H
--

//Buttons
  TSharedPtr<SButton\> RefreshButton;
  TSharedPtr<STextBlock\> RefreshButtonText;
  TSharedPtr<SButton\> ClearTileButton;

.CPP
----

### FButtonStyle

Both of my example buttons use a special Slate Core Style.

.ButtonStyle( FCoreStyle::Get(), "NoBorder" )

### Rainbow Background Button

//The button!
SAssignNew( RefreshButton, SButton )
	.ButtonStyle( FCoreStyle::Get(), "NoBorder" ) 
	.OnClicked( this, &SDDFileTree::RefreshButtonPressed )
	.HAlign( HAlign\_Center )
	.VAlign( VAlign\_Center )
	.ForegroundColor( FSlateColor::UseForeground() )
	\[
		//Colored Background
		SNew(SBorder)
		  .Padding(FMargin(3))
 
		  //~~~ Rainbow Image for Button!!! ~~~
		  .BorderImage( FCoreStyle::Get().GetBrush("ColorSpectrum.Spectrum") )
		  \[
			//Button Text!! AssignNew so can change color later
			SAssignNew(RefreshButtonText , STextBlock)
			  .Text( FString("Refresh (F5) ") )
			  .Font(FSlateFontInfo(FPaths::EngineContentDir() / TEXT("Slate/Fonts/Roboto-Bold.ttf"), 16))
			  .ColorAndOpacity(FLinearColor(1,0,1,1))
			  .HighlightColor(FLinearColor(1,1,0,1))
			  .ShadowColorAndOpacity(FLinearColor::Black)
			  .ShadowOffset(FIntPoint(1, \-1))
		  \]
	\]

### Trash Can Button

//Resizes the image
SNew(SBox)
	.WidthOverride(64)
	.HeightOverride(64)
	\[
	  //~~~ Clear Button / Trash Can ~~~
	  SAssignNew( ClearTileButton, SButton )
		.ButtonStyle( FCoreStyle::Get(), "NoBorder" ) 
		.OnClicked( this, &SDDFileTree::ClearButtonPressed )
		.HAlign( HAlign\_Center )
		.VAlign( VAlign\_Center )
		.ForegroundColor( FSlateColor::UseForeground() )
		\[
			//Button Content Image
			TSharedRef<SWidget\>( SNew( SImage ) .Image( 
				FCoreStyle::Get().GetBrush("TrashCan")
			))
		\]
	\]

### Setting The Cursors

//Set Cursors
ClearTileButton\-\>SetCursor(EMouseCursor::SlashedCircle);
RefreshButton\-\>SetCursor(EMouseCursor::Hand);

### Setting the Custom Tooltips

ClearTileButton\-\>SetToolTip( 
		SNew(SToolTip)
		\[
			SNew(STextBlock)
			  .Text(NSLOCTEXT("FileTree", "Clear", "Clear any currently Loaded Preview Tile!  -Rama"))
			  .Font(FSlateFontInfo(FPaths::EngineContentDir() / TEXT("Slate/Fonts/Roboto-Bold.ttf"), 12))
			  .ColorAndOpacity(FLinearColor(1,0,1,1))
			  .HighlightColor(FLinearColor(1,1,0,1))
			  .ShadowColorAndOpacity(FLinearColor::Black)
			  .ShadowOffset(FIntPoint(\-2, 2))
		\]
	);
 
RefreshButton\-\>SetToolTip(	
		SNew(SToolTip)
		\[
			SNew(STextBlock)
			  .Text( NSLOCTEXT("FileTree", "Refresh", "Refresh Directory and File Listing, updating to hard drive contents! -Rama") )
			  .Font(FSlateFontInfo(FPaths::EngineContentDir() / TEXT("Slate/Fonts/Roboto-Bold.ttf"), 12))
			  .ColorAndOpacity(FLinearColor(1,0,1,1))
			  .HighlightColor(FLinearColor(1,1,0,1))
			  .ShadowColorAndOpacity(FLinearColor::Black)
			  .ShadowOffset(FIntPoint(\-2, 2))
		\]
	);

### Updating the Text When Highlighted

void SDDFileTree::Tick( const FGeometry& AllottedGeometry, const double InCurrentTime, const float InDeltaTime )
{
	// Call parent implementation
	SCompoundWidget::Tick( AllottedGeometry, InCurrentTime, InDeltaTime );
 
 
	//~~~~~~~~~~~~
	// Button Hovering
	//~~~~~~~~~~~~
	if(RefreshButtonText\-\>IsHovered())
	{
		SetRainbowGlowColor();
		RefreshButtonText\-\>SetForegroundColor( RainbowGlowingColor );
	}
	else
	{
		RefreshButtonText\-\>SetForegroundColor( FLinearColor(1,0,1,1) );
	}
}

Summary
-------

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Slate,\_How\_to\_Make\_Fancy\_Custom\_SButtons&oldid=4671](https://wiki.unrealengine.com/index.php?title=Slate,_How_to_Make_Fancy_Custom_SButtons&oldid=4671)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)