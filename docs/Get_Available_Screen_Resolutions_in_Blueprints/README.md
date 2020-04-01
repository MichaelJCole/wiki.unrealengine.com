Get Available Screen Resolutions in Blueprints - Epic Wiki                    

Get Available Screen Resolutions in Blueprints
==============================================

**Rate this Page:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.6

Contents
--------

*   [1 Overview](#Overview)
*   [2 Code](#Code)
    *   [2.1 Header File](#Header_File)
    *   [2.2 Cpp File](#Cpp_File)

Overview
========

The following Blueprint Node is based on the function provided by Rama, see [Solus Options Menu: Screen Resolutions](https://wiki.unrealengine.com/index.php?title=Solus_C%2B%2B_Tutorials&oldid=9371#Solus_Options_Menu:_Screen_Resolutions). The provided function has the limitation that you cannot use it in your own Blueprint Library. The reason is because the [FScreenResolutionRHI](https://docs.unrealengine.com/latest/INT/API/Runtime/RHI/FScreenResolutionRHI/index.html) Type is not a BlueprintType. As I required such a function for my options UMG widget I wrote it, tested it and decided to share it.

Code
====

The following code is meant to be included in your own Blueprint Library. If you do not know how to make a Blueprint Library I recommend you read [Rama's Guide](/Blueprint_Function_Library,_Create_Your_Own_to_Share_With_Others "Blueprint Function Library, Create Your Own to Share With Others")

Header File
-----------

First you declare the new FScreenResolutionRHI type. As mentioned in the comments it is not an exact duplicate of FScreenResolutionRHI. The reason is that when I used uint32 I was not able to use break or make nodes. My guess is that the Blueprint's Integer Type is defined as int32 in c++ and thus is not compatible with uint32. If someone can confirm this feel free to do.

/\*\*
 \* Screen Resolution
 \* @remark Engine type is not meant for blueprints so we replicate the type.
 \* @remark The Engine type uses uint32 but we need to use int32. Otherwise it won't be possible to break/make this type.
 \*/
USTRUCT(BlueprintType)
struct FScreenResolutionRHIBP
{
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= ScreenResolution)
	int32 Width;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= ScreenResolution)
	int32 Height;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= ScreenResolution)
	int32 RefreshRate;
 
	FScreenResolutionRHIBP()
	{
		Width \= Height \= RefreshRate \= 0;
	}
};
 
/\*\*
 \* Retrieve a sorted list of all screen resolutions supported by the player's display adapter.
 \*
 \* @returns the array of all supported screen resolutions.
 \*/
UFUNCTION(BlueprintPure, Category \= Utility)
static TArray<struct FScreenResolutionRHIBP\> GetDisplayAdapterScreenResolutions();

Cpp File
--------

#include "RHI.h"
 
...
 
TArray<FScreenResolutionRHIBP\> YourBlueprintLibrary::GetDisplayAdapterScreenResolutions()
{
	TArray<FScreenResolutionRHIBP\> ResolutionsToReturn;
	FScreenResolutionArray Resolutions;
	if (RHIGetAvailableResolutions(Resolutions, false))
	{
		// Preallocate just enough memory to store all elements
		ResolutionsToReturn.Reserve(Resolutions.Num());
 
		for (const FScreenResolutionRHI& EachResolution : Resolutions)
		{
			FScreenResolutionRHIBP resolution;
			resolution.Width \= EachResolution.Width;
			resolution.Height \= EachResolution.Height;
			resolution.RefreshRate \= EachResolution.RefreshRate;
 
			ResolutionsToReturn.Add(resolution);
		}
	}
 
	return ResolutionsToReturn;
}

Enjoy!

\--[Jtpgames](/index.php?title=User:Jtpgames&action=edit&redlink=1 "User:Jtpgames (page does not exist)") ([talk](/index.php?title=User_talk:Jtpgames&action=edit&redlink=1 "User talk:Jtpgames (page does not exist)")) 13:27, 18 January 2015 (UTC)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Get\_Available\_Screen\_Resolutions\_in\_Blueprints&oldid=11080](https://wiki.unrealengine.com/index.php?title=Get_Available_Screen_Resolutions_in_Blueprints&oldid=11080)"

[Categories](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)