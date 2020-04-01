Introduction to UE4 Programming - 3 - Creating the Base Pickup Class - Epic Wiki                    

Introduction to UE4 Programming - 3 - Creating the Base Pickup Class
====================================================================

  

**Author:**

Epic Games

**Description:**

In this video, we’ll add our first class! This class will be the template for a generic pickup, and we will build on it more in later videos. We’ll also add our first function and variable, and talk about the UCLASS, UFUNCTION, and UPROPERTY macros.

**Related Links:**

  

[Source](https://d26ilriwvtzlb.cloudfront.net/3/3c/Source.zip "Source.zip")

[Source (4.4)](https://d26ilriwvtzlb.cloudfront.net/8/85/Source_4_4.zip "Source 4 4.zip")

[Source\_4.72](http://www.filedropper.com/source472)

**UE 4.6 Changes:**

*   "GENERATED\_UCLASS\_BODY()" macro is now "GENERATED\_BODY()". You must also specify the public access manually under "GENERATED\_BODY()" by adding "public:" directly under "GENERATED\_BODY()".
*   You now need to manually add the constructor "APickup(const FObjectInitializer& ObjectInitializer);" under "public:" in the header file.
*   The constructor in the .cpp file is now: "APickup(const FObjectInitializer& ObjectInitializer) : Super(ObjectInitializer)", this means you also need to replace all references to "PCIP" with "ObjectInitializer"
*   The SubObject template pointer has been replaced. Use normal pointers now, e.g:  
    "class USphereComponent\* BaseCollisionComponent;"

[Playlist Home](/Category:Epic_Video_Playlists "Category:Epic Video Playlists")

[< Project Creation](/Introduction_to_UE4_Programming_-_2_-_Project_Creation "Introduction to UE4 Programming - 2 - Project Creation")

[Creating a Battery in C++ >](/Introduction_to_UE4_Programming_-_4_-_Creating_a_Battery_in_C%2B%2B "Introduction to UE4 Programming - 4 - Creating a Battery in C++")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Introduction\_to\_UE4\_Programming\_-\_3\_-\_Creating\_the\_Base\_Pickup\_Class&oldid=12901](https://wiki.unrealengine.com/index.php?title=Introduction_to_UE4_Programming_-_3_-_Creating_the_Base_Pickup_Class&oldid=12901)"

[Category](/Special:Categories "Special:Categories"):

*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)