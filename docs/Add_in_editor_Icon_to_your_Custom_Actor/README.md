Add in editor Icon to your Custom Actor - Epic Wiki                    

Add in editor Icon to your Custom Actor
=======================================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:(please verify)

  

Contents
--------

*   [1 Overview](#Overview)
*   [2 MyActor.h](#MyActor.h)
*   [3 MyActor.cpp](#MyActor.cpp)
*   [4 Conclusion](#Conclusion)

Overview
--------

Greetings!

This is a code snippets show you how to add in editor icon to your custom Actor.

Just like this:

*   [![](https://d3ar1piqh1oeli.cloudfront.net/b/b7/CustomActorIcon.jpg/120px-CustomActorIcon.jpg)](/File:CustomActorIcon.jpg)
    
    Custom Actor Icon
    

I add some comment for reference.

MyActor.h
---------

 
// Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "MyActor.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class AMyActor : public AActor
{
	GENERATED\_UCLASS\_BODY()
	virtual void BeginPlay() OVERRIDE;
 
 
	UPROPERTY()
	// A UBillboardComponent to hold Icon sprite
	TSubobjectPtr<UBillboardComponent\> SpriteComponent;
 
	// Icon sprite
	UTexture2D\* SpriteTexture;;
};

MyActor.cpp
-----------

 
// Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
 
#include "MyActor.h"
 
AMyActor::AMyActor(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
	// Structure to hold one-time initialization
	struct FConstructorStatics
	{
		// A helper class object we use to find target UTexture2D object in resource package
		ConstructorHelpers::FObjectFinderOptional<UTexture2D\> NoteTextureObject;
 
		// Icon sprite category name
		FName ID\_Notes;
 
		// Icon sprite display name
		FText NAME\_Notes;
 
		FConstructorStatics()
			// Use helper class object to find the texture
			// "/Engine/EditorResources/S\_Note" is resource path
			: NoteTextureObject(TEXT("/Engine/EditorResources/S\_Note"))
			, ID\_Notes(TEXT("Notes"))
			, NAME\_Notes(NSLOCTEXT("SpriteCategory", "Notes", "Notes"))
		{
		}
	};
	static FConstructorStatics ConstructorStatics;
 
	// We need a scene component to attach Icon sprite
	TSubobjectPtr<USceneComponent\> SceneComponent \= PCIP.CreateDefaultSubobject<USceneComponent\>(this, TEXT("SceneComp"));
	RootComponent \= SceneComponent;
	RootComponent\-\>Mobility \= EComponentMobility::Static;
 
#if WITH\_EDITORONLY\_DATA
	SpriteComponent \= PCIP.CreateEditorOnlyDefaultSubobject<UBillboardComponent\>(this, TEXT("Sprite"));
	if (SpriteComponent)
	{
 
		SpriteComponent\-\>Sprite \= ConstructorStatics.NoteTextureObject.Get();		// Get the sprite texture from helper class object
		SpriteComponent\-\>SpriteInfo.Category \= ConstructorStatics.ID\_Notes;		// Assign sprite category name
		SpriteComponent\-\>SpriteInfo.DisplayName \= ConstructorStatics.NAME\_Notes;	// Assign sprite display name
		SpriteComponent\-\>AttachParent \= RootComponent;				        // Attach sprite to scene component
		SpriteComponent\-\>Mobility \= EComponentMobility::Static;
	}
#endif // WITH\_EDITORONLY\_DATA
 
}

Conclusion
----------

Please refer to Engine\\Source\\Runtime\\Engine\\Private\\Note.cpp for more information.

Enjoy!

[Eros](/User:Eros "User:Eros") ([talk](/index.php?title=User_talk:Eros&action=edit&redlink=1 "User talk:Eros (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Add\_in\_editor\_Icon\_to\_your\_Custom\_Actor&oldid=8212](https://wiki.unrealengine.com/index.php?title=Add_in_editor_Icon_to_your_Custom_Actor&oldid=8212)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)