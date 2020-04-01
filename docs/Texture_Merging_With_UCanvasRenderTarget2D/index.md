Texture Merging With UCanvasRenderTarget2D - Epic Wiki                    

Texture Merging With UCanvasRenderTarget2D
==========================================

Contents
--------

*   [1 Motivation](#Motivation)
*   [2 UCanvasRenderTarget2D](#UCanvasRenderTarget2D)
    *   [2.1 Getting Started](#Getting_Started)
*   [3 Texture Merge Code](#Texture_Merge_Code)
    *   [3.1 Code](#Code)
    *   [3.2 Usage](#Usage)

Motivation
----------

In multiplayer games, it's quite common to have customizable characters and support changing out different costumes and gear. A common way of doing so is with the [Modular Pawn](/Modular_Pawn "Modular Pawn") approach. Possibly combined with [FSkeletalMeshMerge](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/FSkeletalMeshMerge/index.html). For certain types of costume pieces though, using modular pawns is somewhat overkill. Gloves or tight fitting pats for example would be simple to create as a texture. Tattoos/war paint/scars also cannot be easily made as meshes. It would be nice if we were able to make textures in layers and then combine them into a single texture. Blending two textures inside a material could be used for this purpose, but that comes with the cost of extra texture samples and blending.

UCanvasRenderTarget2D
---------------------

The [UCanvasRenderTarget2D](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Engine/UCanvasRenderTarget2D/index.html) class is an incredibly useful tool for creating textures at runtime. Not much documentation seems to exist for it, but it's incredibly powerful in that [UCanvas](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Engine/UCanvas/index.html) methods can be used to draw into textures. The following section will demonstrate the use of the [UCanvasRenderTarget2D](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Engine/UCanvasRenderTarget2D/index.html) class. If you just want to copy the texture merging code into your project, then skip towards the end.

### Getting Started

First of all you'll need to create an instance of the canvas render target. It's a texture, so it can be used anywhere that a regular texture could.

UCanvasRenderTarget2D\* CanvasRenderTarget \= Cast<UCanvasRenderTarget2D\>(UCanvasRenderTarget2D::CreateCanvasRenderTarget2D(WorldContextObject, UCanvasRenderTarget2D::StaticClass(), Width, Height));

The next step is to write a callback method to hook into the canvas render target's drawing delegate. This method is where you actually do the drawing. You can use any of the drawing methods [UCanvas](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Engine/UCanvas/index.html) provides to create your texture.

void UWhatever::DrawToCanvasRenderTarget(UCanvas\* Canvas, int32 Width, int32 Height)
{
     //Drawing code with UCanvas goes here...
}

Simply register this with the canvas render target's OnCanvasRenderTargetUpdate delegate:

CanvasRenderTarget\-\>OnCanvasRenderTargetUpdate.AddDynamic(InstanceOfUWhatever, &UWhatever::DrawToCanvasRenderTarget);

How often the canvas render target redraws is up to you. You could call it once to generate a texture and slap it on a material instance, or you could call it every frame to make an animated material. To redraw the texture just call

CanvasRenderTarget \-\>UpdateResource();

and your DrawToCanvasRenderTarget method will be called when it's ready to redraw the texture.

Texture Merge Code
------------------

This is the full code for the class I'm currently using to do texture merging on my game's characters. It's derived from [UCanvasRenderTarget2D](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Engine/UCanvasRenderTarget2D/index.html) and is very simple to use.

### Code

**CompositeTexture.h**

#pragma once
 
#include "Engine/CanvasRenderTarget2D.h"
#include "CompositeTexture.generated.h"
 
///@brief Class for merging multiple textures into one to reduce texture samples and simplify shaders.
///Layers can be changed at any time, however after changing them UpdateResource must be called to finalize the changes.
UCLASS(Blueprintable)
class UCompositeTexture : public UCanvasRenderTarget2D
{
	GENERATED\_BODY()
 
	UCompositeTexture();
 
	UFUNCTION()
	void PerformMerge(UCanvas\* Canvas, int32 Width, int32 Height);
 
public:
 
	///@brief Texture layers
	UPROPERTY(EditAnywhere, Category \= "Layers")
	TArray<UTexture2D\*\> Layers;
	///@brief Tint applied to texture layers
	UPROPERTY(EditAnywhere, Category \= "Layers")
	TArray<FColor\> LayerTints;
 
	///@brief Creates a layered texture and updates it based on the passed in layers.
	static UCompositeTexture\* Create(UObject\* WorldContextObject, const TArray<UTexture2D\*\>& Layers);
	///@brief Creates a layered texture and updates it like the other version. Also applies tint to layers.
	static UCompositeTexture\* Create(UObject\* WorldContextObject, const TArray<UTexture2D\*\>& Layers, const TArray<FColor\>& LayerTints);
};

**CompositeTexture.cpp**

#include "Runtime/Engine/Classes/Engine/Canvas.h"
#include "CompositeTexture.h"
 
UCompositeTexture::UCompositeTexture()
{
	OnCanvasRenderTargetUpdate.AddDynamic(this, &UCompositeTexture::PerformMerge);
}
 
void UCompositeTexture::PerformMerge(UCanvas\* Canvas, int32 Width, int32 Height)
{
	for (int32 i \= 0; i < Layers.Num(); ++i)
	{
		UTexture\* LayerTex \= Layers\[i\];
		if (LayerTex)
		{
			FColor TintColor \= FColor::White;
			if (LayerTints.Num() \> i)
			{
				TintColor \= LayerTints\[i\];
			}
 
			Canvas\-\>SetDrawColor(TintColor);
			Canvas\-\>DrawTile(LayerTex, 0, 0, Width, Height, 0, 0, Width, Height);
		}
	}
}
 
UCompositeTexture\* UCompositeTexture::Create(UObject\* WorldContextObject, const TArray<UTexture2D\*\>& Layers)
{
	TArray<FColor\> Colors;
	return UCompositeTexture::Create(WorldContextObject, Layers, Colors);
}
 
UCompositeTexture\* UCompositeTexture::Create(UObject\* WorldContextObject, const TArray<UTexture2D\*\>& Layers, const TArray<FColor\>& LayerTints)
{
	if (Layers.Num() <= 0)
	{
		return NULL;
	}
 
	UTexture2D\* BaseTexture \= Layers\[0\];
 
	UCompositeTexture\* RenderTarget \= Cast<UCompositeTexture\>(UCanvasRenderTarget2D::CreateCanvasRenderTarget2D(WorldContextObject, UCompositeTexture::StaticClass(), BaseTexture\-\>GetSizeX(), BaseTexture\-\>GetSizeY()));
 
	RenderTarget\-\>Layers.Append(Layers);
	RenderTarget\-\>LayerTints.Append(LayerTints);
 
	RenderTarget\-\>UpdateResource();
	return RenderTarget;
}

### Usage

To use the composite texture class just use one of the static methods to create it and pass in the texture layers to be merged. They will be drawn in the order they appear, so the first texture will be the base, and so on.

UCompositeTexture\* MergedTexture \= UCompositeTexture::Create(this, MergeTextures);

You can also optionally pass in an array of tints that will be applied to the layers. The indices correspond 1:1 to the array of textures to merge, and white will draw a layer as if no tint was applied.

UCompositeTexture\* MergedTexture \= UCompositeTexture::Create(this, MergeTextures, MergeTints);

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Texture\_Merging\_With\_UCanvasRenderTarget2D&oldid=14895](https://wiki.unrealengine.com/index.php?title=Texture_Merging_With_UCanvasRenderTarget2D&oldid=14895)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)