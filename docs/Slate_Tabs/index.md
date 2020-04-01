Slate Tabs - Epic Wiki                    

Slate Tabs
==========

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(4.7)

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png)

**Some or all of the information on this page is inconsistent, irrelevant or confusing.**

Please help clean it up if you are able.

Overview
--------

_Author_ [Syntopia](https://forums.unrealengine.com/member.php?31661-Syntopia)

In this tutorial I show you how to make tabs. There are many ways to do this. With a checkbox or button style change, but for me it was the easiest way.

[![Tabs.png](https://d26ilriwvtzlb.cloudfront.net/3/3c/Tabs.png)](/File:Tabs.png)

Code:
-----

MyStyle.h

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
#pragma once
 
class FMyStyle 
{
public:
	static void Initialize();
	static void Shutdown();
 
	static const ISlateStyle& Get();
 
	static TSharedPtr<class ISlateStyle\> StylePtr;
 
};

MyStyle.cpp

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
#include "TabbedView.h"
#include "MyStyle.h"
#include "Engine.h"
#include "SlateBasics.h"
#include "SlateStyle.h"
 
#define IMAGE\_BRUSH(RelativePath, ...)	FSlateImageBrush(Style->RootToContentDir(RelativePath, TEXT(".png")), \_\_VA\_ARGS\_\_)
 
TSharedPtr<ISlateStyle\> CreateStyle()
{
	TSharedPtr<FSlateStyleSet\> Style \= MakeShareable(new FSlateStyleSet("PreloadStyle"));
	Style\-\>SetContentRoot(FPaths::GameContentDir() / "Slate");
 
	Style\-\>Set("tab\_normal", new IMAGE\_BRUSH("tab\_normal", FVector2D(256, 64)));
	Style\-\>Set("tab\_active", new IMAGE\_BRUSH("tab\_active", FVector2D(256, 64)));
 
	return Style;
}
 
#undef IMAGE\_BRUSH
 
 
TSharedPtr<ISlateStyle\> FMyStyle::StylePtr \= NULL;
 
void FMyStyle::Initialize()
{
	if (!StylePtr.IsValid())
	{
		StylePtr \= CreateStyle();
		FSlateStyleRegistry::RegisterSlateStyle(\*StylePtr);
	}
}
 
void FMyStyle::Shutdown()
{
	FSlateStyleRegistry::UnRegisterSlateStyle(\*StylePtr);
	ensure(StylePtr.IsUnique());
	StylePtr.Reset();
}
 
const ISlateStyle& FMyStyle::Get()
{
	return \*StylePtr;	
}

TabbedView.h

#pragma once
 
#include "Engine.h"

TabbedView.cpp

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
#include "TabbedView.h"
#include "MyStyle.h"
 
class MyModule : public FDefaultGameModuleImpl
{
public:
	virtual void StartupModule() override
	{
		FSlateStyleRegistry::UnRegisterSlateStyle("PreloadStyle");
		FMyStyle::Initialize();
	}
 
	virtual void ShutdownModule() override
	{
		FMyStyle::Shutdown();
	}
};
 
IMPLEMENT\_PRIMARY\_GAME\_MODULE(MyModule, TabbedView, "TabbedView");

MyGameMode.h

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
#pragma once
 
#include "MyGameMode.generated.h"
 
UCLASS(minimalapi)
class AMyGameMode : public AGameMode
{
	GENERATED\_UCLASS\_BODY()
 
};

MyGameMode.cpp

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
#include "TabbedView.h"
#include "MyGameMode.h"
#include "MyHUD.h"
 
 
AMyGameMode::AMyGameMode(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
	// use our custom HUD class
	HUDClass \= AMyHUD::StaticClass();
}

MyHUD.h

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
#pragma once 
 
#include "MyHUD.generated.h"
 
class SMyUIWidget : public SCompoundWidget
{
	SLATE\_BEGIN\_ARGS(SMyUIWidget)
	{}
    /\*See private declaration of OwnerHUD below.\*/
	SLATE\_ARGUMENT(TWeakObjectPtr<class AMyHUD\>, OwnerHUD)
	/\*\* The visual style of the button \*/
	SLATE\_END\_ARGS()
 
public:
	void Construct(const FArguments& InArgs);
 
	FReply FirstTabClicked();
	FReply SecondTabClicked();
 
	const FSlateBrush\* GetFirstImageBrush() const;
	const FSlateBrush\* GetSecondImageBrush() const;
 
private:
	TWeakObjectPtr<class AMyHUD\> OwnerHUD;
 
	int32 TabIndex;
 
	int32 GetCurrentTabIndex() const
	{
		return TabIndex;
	}
 
};
 
UCLASS()
class AMyHUD : public AHUD
{
	GENERATED\_UCLASS\_BODY()
 
public:
	void BeginPlay();
 
	virtual void DrawHUD() override;
 
private:
	TSharedPtr<SMyUIWidget\> MyUIWidget;
 
};

MyHUD.cpp

// Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.
 
#include "TabbedView.h"
#include "MyHUD.h"
#include "SWidgetSwitcher.h"
#include "MyStyle.h"
 
int FirstTabActive  \= 1;
int SecondTabActive \= 0;
 
int ftClick \= 1;
int stClick \= 0;
 
void SMyUIWidget::Construct(const FArguments& InArgs)
{
	OwnerHUD \= InArgs.\_OwnerHUD;
 
	TabIndex \= 0;
 
	ChildSlot
		\[
			SNew(SVerticalBox) 
			+ SVerticalBox::Slot()
			.FillHeight(0.1)
 
			+ SVerticalBox::Slot()
			.FillHeight(0.8)
			\[
				SNew(SHorizontalBox)
 
				+ SHorizontalBox::Slot()
				.FillWidth(0.3)
 
				+ SHorizontalBox::Slot()
				.FillWidth(0.4)
				\[
					SNew(SVerticalBox)
					+ SVerticalBox::Slot()
					.FillHeight(0.2)
					\[
						SNew(SHorizontalBox)
						+ SHorizontalBox::Slot()
						\[
							SNew(SButton)
							.ContentPadding(\-3)
							.OnClicked(this, &SMyUIWidget::FirstTabClicked)
							\[
								SNew(SVerticalBox)
								+ SVerticalBox::Slot()
								.HAlign(HAlign\_Fill)
								.VAlign(VAlign\_Fill)
								\[
									SNew(SBorder)
									.HAlign(HAlign\_Center)
									.VAlign(VAlign\_Center)
									.BorderImage(this, &SMyUIWidget::GetFirstImageBrush)
									\[
										SNew(STextBlock)
										.Font(FSlateFontInfo("Veranda", 54))
										.ColorAndOpacity(FLinearColor(1, 1, 1, 1))
										.Text(FText::FromString("Page One"))
									\]
								\]
							\]
						\]
 
						+ SHorizontalBox::Slot()
						.FillWidth(0.1)
 
						+ SHorizontalBox::Slot()
						\[
							SNew(SButton)
							.ContentPadding(\-3)
							.OnClicked(this, &SMyUIWidget::SecondTabClicked)
							\[
								SNew(SVerticalBox)
								+ SVerticalBox::Slot()
								.HAlign(HAlign\_Fill)
								.VAlign(VAlign\_Fill)
								\[
									SNew(SBorder)
									.HAlign(HAlign\_Center)
									.VAlign(VAlign\_Center)
									.BorderImage(this, &SMyUIWidget::GetSecondImageBrush)
									\[
										SNew(STextBlock)
										.Font(FSlateFontInfo("Veranda", 54))
										.ColorAndOpacity(FLinearColor(1, 1, 1, 1))
										.Text(FText::FromString("Page Two"))
									\]
								\]
							\]
						\]
					\]
 
					+ SVerticalBox::Slot()
					.FillHeight(0.8)
					\[
						SNew(SWidgetSwitcher)
						.WidgetIndex(this, &SMyUIWidget::GetCurrentTabIndex)
						+ SWidgetSwitcher::Slot() 
						\[
							SNew(SBorder)
							.BorderImage(FCoreStyle::Get().GetBrush("ToolPanel.GroupBorder"))
							\[
								SNew(SVerticalBox)
								+ SVerticalBox::Slot()
								.HAlign(HAlign\_Center)
								.VAlign(VAlign\_Center)
								\[
									SNew(STextBlock)
									.ColorAndOpacity(FLinearColor(1, 1, 1, 1))
									.Font(FSlateFontInfo("Veranda", 72))
									.Text(FText::FromString("Page One"))
								\]
								+ SVerticalBox::Slot()
									.HAlign(HAlign\_Center)
									.VAlign(VAlign\_Center)
									\[
										SNew(STextBlock)
										.ColorAndOpacity(FLinearColor(1, 1, 1, 1))
										.Font(FSlateFontInfo("Veranda", 52))
										.Text(FText::FromString("Page One"))
									\]
								+ SVerticalBox::Slot()
								.HAlign(HAlign\_Center)
								.VAlign(VAlign\_Center)
								\[
									SNew(STextBlock)
									.ColorAndOpacity(FLinearColor(1, 1, 1, 1))
									.Font(FSlateFontInfo("Veranda", 32))
									.Text(FText::FromString("Page One"))
								\]
							\]
						\]
						+ SWidgetSwitcher::Slot() // Weapons
							\[
								SNew(SBorder)
								.BorderImage(FCoreStyle::Get().GetBrush("ToolPanel.GroupBorder"))
								\[
									SNew(SVerticalBox)
									+ SVerticalBox::Slot()
									.HAlign(HAlign\_Center)
									.VAlign(VAlign\_Center)
									\[
										SNew(STextBlock)
										.ColorAndOpacity(FLinearColor(1, 1, 1, 1))
										.Font(FSlateFontInfo("Veranda", 72))
										.Text(FText::FromString("Page Two"))
									\]
									+ SVerticalBox::Slot()
									.HAlign(HAlign\_Center)
									.VAlign(VAlign\_Center)
									\[
										SNew(STextBlock)
										.ColorAndOpacity(FLinearColor(1, 1, 1, 1))
										.Font(FSlateFontInfo("Veranda", 52))
										.Text(FText::FromString("Page Two"))
									\]
									+ SVerticalBox::Slot()
									.HAlign(HAlign\_Center)
									.VAlign(VAlign\_Center)
									\[
										SNew(STextBlock)
										.ColorAndOpacity(FLinearColor(1, 1, 1, 1))
										.Font(FSlateFontInfo("Veranda", 32))
										.Text(FText::FromString("Page Two"))
									\]
								\]
							\]
					\]
				\]
 
				+ SHorizontalBox::Slot()
				.FillWidth(0.3)
			\]
 
			+ SVerticalBox::Slot()
			.FillHeight(0.1)
		\];
}
 
const FSlateBrush\* SMyUIWidget::GetFirstImageBrush() const
{
	FName BrushName;
	(FirstTabActive \== 0) ? BrushName \= TEXT("tab\_normal") : BrushName \= TEXT("tab\_active");
 
	return FMyStyle::Get().GetBrush(BrushName);
}
 
const FSlateBrush\* SMyUIWidget::GetSecondImageBrush() const
{
	FName BrushName;
	(SecondTabActive \== 0) ? BrushName \= TEXT("tab\_normal") : BrushName \= TEXT("tab\_active");
 
	return FMyStyle::Get().GetBrush(BrushName);
}
 
AMyHUD::AMyHUD(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
 
}
 
void AMyHUD::BeginPlay()
{
	SAssignNew(MyUIWidget, SMyUIWidget).OwnerHUD(this);
 
	if (GEngine\-\>IsValidLowLevel())
	{
		GEngine\-\>GameViewport\-\>AddViewportWidgetContent(SNew(SWeakWidget).PossiblyNullContent(MyUIWidget.ToSharedRef()));
	}
 
	if (MyUIWidget.IsValid())
	{
		MyUIWidget\-\>SetVisibility(EVisibility::Visible);
	}
}
 
void AMyHUD::DrawHUD()
{
	Super::DrawHUD();
}
 
FReply SMyUIWidget::FirstTabClicked()
{
	TabIndex \= 0;
 
	stClick \= 0;
	ftClick++;
 
	if (ftClick \== 1)
	{
		if (FirstTabActive \== 0)
		{
			FirstTabActive \= 1;
			SecondTabActive \= 0;
		}
 
	}
 
	return FReply::Handled();
}
 
FReply SMyUIWidget::SecondTabClicked()
{
	TabIndex \= 1;
 
	ftClick \= 0;
	stClick++;
 
	if (stClick \== 1)
	{
		if (SecondTabActive \== 0)
		{
			FirstTabActive \= 0;
			SecondTabActive \= 1;
		}
 
	}
 
	return FReply::Handled();
}

Summary
-------

Set your level to use your new game mode, and run!

Source code: [File:TabbedView.zip](/File:TabbedView.zip "File:TabbedView.zip") (~67KB)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Slate\_Tabs&oldid=12969](https://wiki.unrealengine.com/index.php?title=Slate_Tabs&oldid=12969)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)