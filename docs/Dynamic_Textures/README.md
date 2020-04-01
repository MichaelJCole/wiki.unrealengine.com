Dynamic Textures - Epic Wiki                    

Dynamic Textures
================

Sometimes it's necessary to create a texture at runtime and update its contents. Depending on your particular needs there are a couple different methods:

*   If you need to create a dynamic UTexture2D at runtime and update it efficiently every frame, use UTexture2D::CreateTransient() and copy/paste the following function:

NOTE: Currently UE4 doesn't support updating subregions of a texture so you have to update the entire thing every frame or you will end up with garbage in places. In the DX11 runtime the texture creation is done with D3D11\_USAGE\_DEFAULT not D3D11\_USAGE\_DYNAMIC.

DynamicTexture \= UTexture2D::CreateTransient(SizeX, SizeY);
 
// Allocate the texture HRI
DynamicTexture\-\>UpdateResource();
 
// Use this function to update the texture rects you want to change:
// NOTE: There is a method called UpdateTextureRegions in UTexture2D but it is compiled WITH\_EDITOR and is not marked as ENGINE\_API so it cannot be linked
// from plugins.
 
void UpdateTextureRegions(UTexture2D\* Texture, int32 MipIndex, uint32 NumRegions, FUpdateTextureRegion2D\* Regions, uint32 SrcPitch, uint32 SrcBpp, uint8\* SrcData, bool bFreeData)
{
	if (Texture\-\>Resource)
	{
		struct FUpdateTextureRegionsData
		{
			FTexture2DResource\* Texture2DResource;
			int32 MipIndex;
			uint32 NumRegions;
			FUpdateTextureRegion2D\* Regions;
			uint32 SrcPitch;
			uint32 SrcBpp;
			uint8\* SrcData;
		};
 
		FUpdateTextureRegionsData\* RegionData \= new FUpdateTextureRegionsData;
 
		RegionData\-\>Texture2DResource \= (FTexture2DResource\*)Texture\-\>Resource;
		RegionData\-\>MipIndex \= MipIndex;
		RegionData\-\>NumRegions \= NumRegions;
		RegionData\-\>Regions \= Regions;
		RegionData\-\>SrcPitch \= SrcPitch;
		RegionData\-\>SrcBpp \= SrcBpp;
		RegionData\-\>SrcData \= SrcData;
 
		ENQUEUE\_UNIQUE\_RENDER\_COMMAND\_TWOPARAMETER(
			UpdateTextureRegionsData,
			FUpdateTextureRegionsData\*, RegionData, RegionData,
			bool, bFreeData, bFreeData,
			{
			for (uint32 RegionIndex \= 0; RegionIndex < RegionData\-\>NumRegions; ++RegionIndex)
			{
				int32 CurrentFirstMip \= RegionData\-\>Texture2DResource\-\>GetCurrentFirstMip();
				if (RegionData\-\>MipIndex \>= CurrentFirstMip)
				{
					RHIUpdateTexture2D(
						RegionData\-\>Texture2DResource\-\>GetTexture2DRHI(),
						RegionData\-\>MipIndex \- CurrentFirstMip,
						RegionData\-\>Regions\[RegionIndex\],
						RegionData\-\>SrcPitch,
						RegionData\-\>SrcData
						+ RegionData\-\>Regions\[RegionIndex\].SrcY \* RegionData\-\>SrcPitch
						+ RegionData\-\>Regions\[RegionIndex\].SrcX \* RegionData\-\>SrcBpp
						);
				}
			}
			if (bFreeData)
			{
				FMemory::Free(RegionData\-\>Regions);
				FMemory::Free(RegionData\-\>SrcData);
			}
			delete RegionData;
		});
	}
}

*   If you need to create a dynamic texture and update it a single time you can use this method. Note: After every call to Lock/Unlock you must call UpdateResource(). This deletes the HRI texture and recreates it so it won't be fast but if done infrequently it is simpler to use.

Texture \= UTexture2D::CreateTransient(SizeX, SizeY);
FTexture2DMipMap& Mip \= \[Texture\]\-\>PlatformData\-\>Mips\[Level\];
void\* Data \= Mip.BulkData.Lock( LOCK\_READ\_WRITE );
FMemory::Memcpy( Data, NewData, DataSize );
Mip.BulkData.Unlock( );
Texture\-\>UpdateResource();

*   If you are using Slate, or a Slate viewport to render you can use a FSlateTexture2DRHIRef which can be created from the slate function:

FSlateTexture2DRHIRef Texture \= MakeShareable(new FSlateTexture2DRHIRef(Width, Height, PF\_B8G8R8A8, NULL, TexCreate\_Dynamic, bCreateEmptyTexture));

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Dynamic\_Textures&oldid=4120](https://wiki.unrealengine.com/index.php?title=Dynamic_Textures&oldid=4120)"

  ![](https://tracking.unrealengine.com/track.png)