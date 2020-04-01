 Procedural Materials - Epic Wiki             

 

Procedural Materials
====================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Goal of this article
====================

With this article you will learn how to make and use of dynamic materials to create procedurally generated texture that during runtime is writable and readable in C++. This article will be catered to C++ programmers, and currently there is no support for blueprints.

Contents
--------

*   [1 Goal of this article](#Goal_of_this_article)
*   [2 Setup](#Setup)
    *   [2.1 What you will need](#What_you_will_need)
    *   [2.2 Texture Setup](#Texture_Setup)
        *   [2.2.1 Motivation](#Motivation)
    *   [2.3 Material Setup](#Material_Setup)
        *   [2.3.1 Motivation](#Motivation_2)
    *   [2.4 Enqueue Render Task](#Enqueue_Render_Task)
        *   [2.4.1 Explanation](#Explanation)
    *   [2.5 Dynamic Texture & Dynamic Material](#Dynamic_Texture_.26_Dynamic_Material)
    *   [2.6 Manipulating the texture](#Manipulating_the_texture)
    *   [2.7 Implemenations](#Implemenations)
    *   [2.8 Complete example](#Complete_example)

Setup
=====

What you will need
------------------

*   A texture that with the following properties: (_Editor_)
    *   No compression (B8G8R8A8) _making it humanly readable and writable_.
    *   No mipmaps
    *   No sRGB applied
*   A material with a Texture Sample 2D parameter (_Editor_)
*   A function for enqueueing tasks on the render thread. (_C++_)
*   Create the dynamic texture and link it with the dynamic material (_C++_)
*   Manipulate the texture (_C++_)

Texture Setup
-------------

[![](https://d3ar1piqh1oeli.cloudfront.net/5/5a/DynamicTexture.JPG/300px-DynamicTexture.JPG)](/index.php?title=File:DynamicTexture.JPG)

Image

First you will need to import a texture with your desired dimensions. In its' settings change the following:

*   Mip Gen Settings -> **NoMipmaps**
*   sRGB -> **false**
*   Compression Settings -> **TC Vector Displacementmap**

### Motivation

Unreal4 auto-compresses the textures when imported. They usually default to DXT5 which is not appropriate for us to edit. It skews the data and we're unable to get predictable results and values from the texture. By setting the Compression Settings to **TC Vector Displacementmap** we are guaranteed no compression.  
We are setting the Gamma (sRGB) to false because it also skews the data. Gamma is useful for expanding the color palette in the region we humans are able to detect change. But since we're going to edit the texture it will obscure the pixel values which will make it harder for us to establish a proper prediction and estimation when working with the texture.  
By setting the Mip Gen Settings to **NoMipmaps** we tell the engine that we are not going to be needing any mipmaps of our texture. This is to prevent bugs when the engine tries to downscale the texture (which we will dynamically write to and read from).

Material Setup
--------------

[![DynamicTextureParam.JPG](https://d3ar1piqh1oeli.cloudfront.net/d/d7/DynamicTextureParam.JPG/300px-DynamicTextureParam.JPG)](/index.php?title=File:DynamicTextureParam.JPG)

*   Create a Texture Sample Parameter 2D node in the material
*   Change the _Sampler Type_ to **Linear Color**
*   Change the _Parameter Name_ to **DynamicTextureParam** (or whatever name you set in SetTextureParameterValue())

### Motivation

The material setup can be as advanced as you wish, all you're going to need to keep in mind is that the texture from the dynamic parameter will be just that; dynamic. The picture illustrates how a simple setup may look (Use the colors of the dynamic texture and sample them with TexCoords). Something to keep in mind: If you don't set the _Sampler Type_ to **Linear Color** you will encounter an error prompting you to change it accordingly. Later you will write to this parameter through C++.

Enqueue Render Task
-------------------

<syntaxhighlight lang="cpp">void UpdateTextureRegions(UTexture2D\* Texture, int32 MipIndex, uint32 NumRegions, FUpdateTextureRegion2D\* Regions, uint32 SrcPitch, uint32 SrcBpp, uint8\* SrcData, bool bFreeData) { if (Texture && Texture->Resource) { struct FUpdateTextureRegionsData { FTexture2DResource\* Texture2DResource; int32 MipIndex; uint32 NumRegions; FUpdateTextureRegion2D\* Regions; uint32 SrcPitch; uint32 SrcBpp; uint8\* SrcData; };

FUpdateTextureRegionsData\* RegionData = new FUpdateTextureRegionsData;

RegionData->Texture2DResource = (FTexture2DResource\*)Texture->Resource; RegionData->MipIndex = MipIndex; RegionData->NumRegions = NumRegions; RegionData->Regions = Regions; RegionData->SrcPitch = SrcPitch; RegionData->SrcBpp = SrcBpp; RegionData->SrcData = SrcData;

ENQUEUE\_UNIQUE\_RENDER\_COMMAND\_TWOPARAMETER( UpdateTextureRegionsData, FUpdateTextureRegionsData\*, RegionData, RegionData, bool, bFreeData, bFreeData, { for (uint32 RegionIndex = 0; RegionIndex < RegionData->NumRegions; ++RegionIndex) { int32 CurrentFirstMip = RegionData->Texture2DResource->GetCurrentFirstMip(); if (RegionData->MipIndex >= CurrentFirstMip) { RHIUpdateTexture2D( RegionData->Texture2DResource->GetTexture2DRHI(), RegionData->MipIndex - CurrentFirstMip, RegionData->Regions\[RegionIndex\], RegionData->SrcPitch, RegionData->SrcData + RegionData->Regions\[RegionIndex\].SrcY \* RegionData->SrcPitch + RegionData->Regions\[RegionIndex\].SrcX \* RegionData->SrcBpp ); } } if (bFreeData) { FMemory::Free(RegionData->Regions); FMemory::Free(RegionData->SrcData); } delete RegionData; }); } }</syntaxhighlight>

### Explanation

This function is a straight copy-paste from [here](/index.php?title=Dynamic_Textures "Dynamic Textures"), which is where you can read some more about it if you wish to know the ins- and outs of how it works and what it does.

Dynamic Texture & Dynamic Material
----------------------------------

It does not matter where you do this; as long as it is only done once. A good start-off point would be to have this code in **PostInitializeComponents()**.

<syntaxhighlight lang="cpp"> //Convert the static material in our mesh into a dynamic one, and store it (please note that if you have more than one material that you wish to mark dynamic, do so here). mDynamicMaterials.Add(StaticMeshComponent->CreateAndSetMaterialInstanceDynamic(0)); //Create a dynamic texture with the default compression (B8G8R8A8) mDynamicTexture = UTexture2D::CreateTransient(w, h); //Make sure it won't be compressed mDynamicTexture->CompressionSettings = TextureCompressionSettings::TC\_VectorDisplacementmap; //Turn off Gamma-correction mDynamicTexture->SRGB = 0; //Guarantee no garbage collection by adding it as a root reference mDynamicTexture->AddToRoot(); //Update the texture with new variable values. mDynamicTexture->UpdateResource(); //Grab the colorvalues from our existing texture (the one we created at **Texture Setup**) and copy it into a uint8\* mTextureColors variable. int32 w, h; w = textureToReadFrom->GetSizeX(); h = textureToReadFrom->GetSizeY(); FTexture2DMipMap& readMip = textureToReadFrom->PlatformData->Mips\[0\]; mDataSize = w \* h \* 4; // \* 4 because we're working with uint8's - which are 4 bytes large mDataSqrtSize = w \* 4; // \* 4 because we're working with uint8's - which are 4 bytes large readMip.BulkData.GetCopy((void\*\*)&mTextureColors); // Initalize our dynamic pixel array with data size mDynamicColors = new uint8\[mDataSize\]; // Copy our current texture's colors into our dynamic colors FMemory::Memcpy(mDynamicColors, mTextureColors, mDataSize); // Create a new texture region with the width and height of our dynamic texture mUpdateTextureRegion = new FUpdateTextureRegion2D(0, 0, 0, 0, w, h); // Set the Paramater in our material to our texture mDynamicMaterials\[0\]->SetTextureParameterValue("DynamicTextureParam", mDynamicTexture); </syntaxhighlight>

And the setup is complete. We now have three things:

*   An array of uint8's which acts as a copy of our static texture
*   A dynamic texture which is read/write enabled
*   A dynamic material which is read/write enabled

Manipulating the texture
------------------------

This is the final piece of the puzzle, which also happens to be the easiest. All you need to do now is to manipulate the array of mDynamicColors and set the individual color values. Worth noting; the entire array exists of BGRA-values, which means that every fourth index is the color B for the current pixel. Here's a small example: <syntaxhighlight lang="cpp"> mDynamicColors\[0\] = 255; // Set the Blue channel in pixel nr. 0 to 255 mDynamicColors\[1\] = 120; // Set the Green channel in pixel nr. 0 to 120 mDynamicColors\[2\] = 120; // Set the Red channel in pixel nr. 0 to 120 mDynamicColors\[3\] = 120; // Set the Alpha channel in pixel nr. 0 to 120 mDynamicColors\[4\] = 120; // Set the Blue channel in pixel nr. 1 to 120 // etc etc // Array example: int pixelAmount = mDataSize / 4; for (int i = 0; i < pixelAmount; ++i) { int blue = i \* 4 + 0; int green = i \* 4 + 1; int red = i \* 4 + 2; int alpha = i \* 4 + 3; mDynamicColors\[red\] = 120; // Set pixel's red value to 120 } </syntaxhighlight> And now writing the newly set pixels to our texture: <syntaxhighlight lang="cpp"> void AYourSpecificActor::Tick(float DeltaTime) { Super::Tick(DeltaTime); UpdateTextureRegions(mDynamicTexture, 0, 1, mUpdateTextureRegion, mDataSqrtSize, (uint32)4, mDynamicColors, false); mDynamicMaterials\[0\]->SetTextureParameterValue("DynamicTextureParam", mDynamicTexture); } </syntaxhighlight>

Implemenations
--------------

[Simple Dynamic Texture Implementation (Public Domain)](https://gist.github.com/makuto/bf87e5ccd0b15b0859608c9b745ac5f1)

Complete example
----------------

This code is a snippet from our own game. It should be pretty straight forward what it does. Please note that this is copyrighted.

The .h file <syntaxhighlight lang="cpp">

1.  pragma once

1.  include "GameFramework/Actor.h"
2.  include "WLavaActor.generated.h"

/\*\*

\* 
\*/

UCLASS() class SPELLSWORN\_API AWLavaActor : public AStaticMeshActor { GENERATED\_UCLASS\_BODY()

virtual void BeginPlay() override; virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override; virtual void PostInitializeComponents() override; virtual void Tick(float DeltaTime) override; void PropagateLava(); int GetLavaValue(const FVector& aWorldPosition) const;

void SetMeltRateDivisor(float aDivisor) { mMeltRateDivisor = aDivisor; } float GetDynamicMeltRate() const { return mMeltRate + mMeltRate \* mMeltRateDivisor \* .2f; }

int32 GetRowSize() const { return mRowSize; } int32 GetCellSize() const { return mCellSize; } UFUNCTION() void BeginPropagateLava(); UFUNCTION() void EndPropagateLava(); void UpdateLava();

UFUNCTION() void ResetColors();

private: FTimerHandle mTimerHandle\_PropagateLava;

UPROPERTY(EditAnywhere, Category = "TextureToArray") class UWTextureToArray\* LavaPixelArray; TArray<uint8>\* ExportedLavaValues;

UPROPERTY(EditAnywhere, Category = "WLavaActor") float mMeltRate; UPROPERTY(EditAnywhere, Category = "WLavaActor") uint8 mMeltWhenNeighborIsBelow; UPROPERTY(EditAnywhere, Category = "WLavaActor") float mMeltValue;

int32 mCellSize; int32 mRowSize; int32 mArraySize; TArray<int32> mArrayOfIndexes;

TArray<class UMaterialInstanceDynamic\*> mDynamicMaterials; UPROPERTY() UTexture2D \*mDynamicTexture; FUpdateTextureRegion2D\* mUpdateTextureRegion; uint8\* mDynamicColors; float\* mDynamicColorsFloat; uint32 mDataSize; uint32 mDataSqrtSize;

UPROPERTY(ReplicatedUsing=OnRep\_CurrentMeltTime) float mCurrentMeltTime; float mPreviousMeltTime; float mMeltRateDivisor;

UFUNCTION() void OnRep\_CurrentMeltTime();

UPROPERTY(Replicated) bool bPropagating; float mPropagateTime;

}; </syntaxhighlight>

  
The .cpp file <syntaxhighlight lang="cpp">

  

1.  include "Spellsworn.h"
2.  include "WLavaActor.h"
3.  include "WGameState.h"
4.  include "WGameMode.h"
5.  include "StaticMeshResources.h"
6.  include "Misc/TextureToArray/WTextureToArray.h"

1.  define RED 2
2.  define GREEN 1
3.  define BLUE 0
4.  define ALPHA 3

1.  define ALPHA\_CHECK 200

void UpdateTextureRegions(UTexture2D\* Texture, int32 MipIndex, uint32 NumRegions, FUpdateTextureRegion2D\* Regions, uint32 SrcPitch, uint32 SrcBpp, uint8\* SrcData, bool bFreeData) { if (Texture && Texture->Resource) { struct FUpdateTextureRegionsData { FTexture2DResource\* Texture2DResource; int32 MipIndex; uint32 NumRegions; FUpdateTextureRegion2D\* Regions; uint32 SrcPitch; uint32 SrcBpp; uint8\* SrcData; };

FUpdateTextureRegionsData\* RegionData = new FUpdateTextureRegionsData;

RegionData->Texture2DResource = (FTexture2DResource\*)Texture->Resource; RegionData->MipIndex = MipIndex; RegionData->NumRegions = NumRegions; RegionData->Regions = Regions; RegionData->SrcPitch = SrcPitch; RegionData->SrcBpp = SrcBpp; RegionData->SrcData = SrcData;

ENQUEUE\_UNIQUE\_RENDER\_COMMAND\_TWOPARAMETER( UpdateTextureRegionsData, FUpdateTextureRegionsData\*, RegionData, RegionData, bool, bFreeData, bFreeData, { for (uint32 RegionIndex = 0; RegionIndex < RegionData->NumRegions; ++RegionIndex) { int32 CurrentFirstMip = RegionData->Texture2DResource->GetCurrentFirstMip(); if (RegionData->MipIndex >= CurrentFirstMip) { RHIUpdateTexture2D( RegionData->Texture2DResource->GetTexture2DRHI(), RegionData->MipIndex - CurrentFirstMip, RegionData->Regions\[RegionIndex\], RegionData->SrcPitch, RegionData->SrcData + RegionData->Regions\[RegionIndex\].SrcY \* RegionData->SrcPitch + RegionData->Regions\[RegionIndex\].SrcX \* RegionData->SrcBpp ); } } if (bFreeData) { FMemory::Free(RegionData->Regions); FMemory::Free(RegionData->SrcData); } delete RegionData; }); } }

AWLavaActor::AWLavaActor(const class FObjectInitializer& PCIP) : Super(PCIP) { PrimaryActorTick.bCanEverTick = true; mMeltRate = 0.05f; mMeltWhenNeighborIsBelow = 127; mMeltRateDivisor = 0.0f; SetReplicates(true); bPropagating = false; mDynamicColors = nullptr; mDynamicColorsFloat = nullptr; mUpdateTextureRegion = nullptr; }

void AWLavaActor::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const { Super::GetLifetimeReplicatedProps(OutLifetimeProps);

DOREPLIFETIME(AWLavaActor, mCurrentMeltTime); DOREPLIFETIME(AWLavaActor, bPropagating); }

void AWLavaActor::BeginPlay() { Super::BeginPlay();

UWorld\* world = GetWorld(); if (world) { AWGameState\* gameState = world->GetGameState<AWGameState>(); if (gameState) { gameState->mRestartRoundDelegate.RemoveAll(this); gameState->mRestartRoundDelegate.AddUObject(this, &AWLavaActor::BeginPropagateLava); gameState->mStartShopDelegate.RemoveAll(this); gameState->mStartShopDelegate.AddUObject(this, &AWLavaActor::EndPropagateLava); } } }

void AWLavaActor::OnRep\_CurrentMeltTime() { if (mCurrentMeltTime - mPreviousMeltTime > 2.f) { //GetWorld()->GetTimerManager().ClearTimer(mTimerHandle\_PropagateLava); //GetWorld()->GetTimerManager().SetTimer(mTimerHandle\_PropagateLava, this, &AWLavaActor::PropagateLava, GetDynamicMeltRate(), false);

int timesToPropagate = (mCurrentMeltTime - mPreviousMeltTime) / mMeltRate; for (int i = 0; i < timesToPropagate; ++i) { PropagateLava(); } } }

void AWLavaActor::EndPlay(const EEndPlayReason::Type EndPlayReason) { //PRINT("Destroying lava actor"); UWorld\* world = GetWorld(); if (world) { AWGameState\* gameState = world->GetGameState<AWGameState>(); if (gameState) { gameState->mRestartRoundDelegate.RemoveAll(this); gameState->mStartShopDelegate.RemoveAll(this); } } delete\[\] mDynamicColors; mDynamicColors = nullptr; delete\[\] mDynamicColorsFloat; mDynamicColorsFloat = nullptr; delete mUpdateTextureRegion; mUpdateTextureRegion = nullptr; Super::EndPlay(EndPlayReason); }

void AWLavaActor::PostInitializeComponents() { Super::PostInitializeComponents(); if (mDynamicColors) delete\[\] mDynamicColors; if (mDynamicColorsFloat) delete\[\] mDynamicColorsFloat; if (mUpdateTextureRegion) delete mUpdateTextureRegion; if (!LavaPixelArray) return;

ExportedLavaValues = LavaPixelArray->GetArray(); int32 w, h; w = FMath::Sqrt(ExportedLavaValues->Num() / 4); h = w;

if (!IsRunningDedicatedServer()) { mDynamicMaterials.Empty(); mDynamicMaterials.Add(GetStaticMeshComponent()->CreateAndSetMaterialInstanceDynamic(0)); mDynamicTexture = UTexture2D::CreateTransient(w, h); mDynamicTexture->CompressionSettings = TextureCompressionSettings::TC\_VectorDisplacementmap; mDynamicTexture->SRGB = 0; mDynamicTexture->AddToRoot(); mDynamicTexture->UpdateResource();

mUpdateTextureRegion = new FUpdateTextureRegion2D(0, 0, 0, 0, w, h);

mDynamicMaterials\[0\]->SetTextureParameterValue("DynamicTextureParam", mDynamicTexture); } mDataSize = w \* h \* 4; mDataSqrtSize = w \* 4; mArraySize = w \* h; mRowSize = w; mDynamicColors = new uint8\[mDataSize\]; mDynamicColorsFloat = new float\[mArraySize\];

ResetColors(); }

void AWLavaActor::BeginPropagateLava() { bPropagating = true; mPropagateTime = 0; mCurrentMeltTime = mPreviousMeltTime = 0.0f; //GetWorld()->GetTimerManager().ClearTimer(mTimerHandle\_PropagateLava); //GetWorld()->GetTimerManager().SetTimer(mTimerHandle\_PropagateLava, this, &AWLavaActor::PropagateLava, GetDynamicMeltRate(), false); ResetColors(); }

void AWLavaActor::EndPropagateLava() { bPropagating = false; mPropagateTime = 0; mCurrentMeltTime = mPreviousMeltTime = 0.0f; //GetWorld()->GetTimerManager().ClearTimer(mTimerHandle\_PropagateLava); ResetColors(); }

void AWLavaActor::ResetColors() { mArrayOfIndexes.Empty(); FMemory::Memcpy(mDynamicColors, ExportedLavaValues->GetData(), mDataSize);

for (int i = 0; i < mArraySize; ++i) { mDynamicColorsFloat\[i\] = static\_cast<float>(mDynamicColors\[i \* 4 + RED\]); if (mDynamicColors\[i \* 4 + RED\] > mDynamicColors\[i \* 4 + BLUE\]) mArrayOfIndexes.Add(i); }

UpdateLava(); }

int AWLavaActor::GetLavaValue(const FVector& aWorldPosition) const { if (!mDynamicColors) return 0; FVector origin; FVector bounds; GetActorBounds(false, origin, bounds); FVector corner = origin - bounds; FVector relativePosition = aWorldPosition - corner; float cellSize = (bounds.X\*2) / FMath::Max<float>(1.f, mRowSize); int32 cellX = FMath::Clamp(FMath::RoundToInt(relativePosition.X / FMath::Max(1.f, cellSize)), 0, mRowSize); int32 cellY = FMath::Clamp(FMath::RoundToInt(relativePosition.Y / FMath::Max(1.f, cellSize)), 0, mRowSize); int32 cellIndex = FMath::Clamp<int32>(cellX + mRowSize \* cellY, 0, mArraySize - 1); uint8 value = FMath::Max<uint8>(mDynamicColors\[cellIndex \* 4 + RED\], mDynamicColors\[cellIndex \* 4 + BLUE\]); if(mDynamicColors\[cellIndex \* 4 + ALPHA\] < ALPHA\_CHECK) return 0;

return value; }

void AWLavaActor::PropagateLava() { mPreviousMeltTime = mCurrentMeltTime; mCurrentMeltTime += mMeltRate;

//GetWorld()->GetTimerManager().ClearTimer(mTimerHandle\_PropagateLava); //GetWorld()->GetTimerManager().SetTimer(mTimerHandle\_PropagateLava, this, &AWLavaActor::PropagateLava, GetDynamicMeltRate(), false);

struct Neighbor { Neighbor(int indx, float v) :index(indx), val(v){} int index; float val; }; for (int32 i = 0; i < mArrayOfIndexes.Num(); ++i) { int index = mArrayOfIndexes\[i\]; int colorIndex = index \* 4; uint8 colorValue = mDynamicColors\[colorIndex + RED\]; if (colorValue <= mDynamicColors\[colorIndex + BLUE\] || mDynamicColors\[colorIndex + ALPHA\] < ALPHA\_CHECK) { mArrayOfIndexes.RemoveAt(i--); continue; }

int x = index % mRowSize; int y = FMath::FloorToInt(index / mRowSize); Neighbor neighbors\[12\] = { Neighbor((mRowSize \* (y - 1) + (x - 0)) \* 4, 1.00f), // Below Neighbor((mRowSize \* (y - 1) + (x - 1)) \* 4, 0.75f), // Below Left Neighbor((mRowSize \* (y - 0) + (x - 1)) \* 4, 1.00f), // Left Neighbor((mRowSize \* (y + 1) + (x - 1)) \* 4, 0.75f), // Above Left Neighbor((mRowSize \* (y + 1) + (x + 0)) \* 4, 1.00f), // Above Neighbor((mRowSize \* (y + 1) + (x + 1)) \* 4, 0.75f), // Above Right Neighbor((mRowSize \* (y - 0) + (x + 1)) \* 4, 1.00f), // Right Neighbor((mRowSize \* (y - 1) + (x - 0)) \* 4, 0.75f), // Below right Neighbor((mRowSize \* (y - 2) + (x - 0)) \* 4, 0.50f), // Below \* 2 Neighbor((mRowSize \* (y - 0) + (x - 2)) \* 4, 0.50f), // Left \* 2 Neighbor((mRowSize \* (y + 2) + (x - 0)) \* 4, 0.50f), // Above \* 2 Neighbor((mRowSize \* (y + 0) + (x + 2)) \* 4, 0.50f), // Right \* 2 };

for (uint8 n = 0; n < 12; ++n) { if (n >= 0 && n < mDataSize) { colorValue = mDynamicColors\[colorIndex + RED\]; if (colorValue <= 0) break;

int rVal = mDynamicColors\[neighbors\[n\].index + RED\]; if (rVal < mMeltWhenNeighborIsBelow) { float propVal = mMeltValue \* neighbors\[n\].val/\* \* (mDynamicColorsFloat\[index\] / 255.f)\*/; mDynamicColorsFloat\[index\] -= propVal; mDynamicColorsFloat\[index\] = FMath::Max<float>(mDynamicColorsFloat\[index\], 0.f); mDynamicColors\[colorIndex + RED\] = static\_cast<uint8>(FMath::FloorToInt(mDynamicColorsFloat\[index\])); } } } }

UpdateLava(); }

void AWLavaActor::Tick(float DeltaTime) { Super::Tick(DeltaTime);

if(bPropagating) { mPropagateTime += DeltaTime; float dynamicMeltRate = GetDynamicMeltRate(); while(mPropagateTime >= dynamicMeltRate) { mPropagateTime -= dynamicMeltRate; PropagateLava(); } } }

void AWLavaActor::UpdateLava() { if (!IsRunningDedicatedServer()) { UpdateTextureRegions(mDynamicTexture, 0, 1, mUpdateTextureRegion, mDataSqrtSize, (uint32)4, mDynamicColors, false); mDynamicMaterials\[0\]->SetTextureParameterValue("DynamicTextureParam", mDynamicTexture); } } </syntaxhighlight>

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Procedural\_Materials&oldid=379](https://wiki.unrealengine.com/index.php?title=Procedural_Materials&oldid=379)"