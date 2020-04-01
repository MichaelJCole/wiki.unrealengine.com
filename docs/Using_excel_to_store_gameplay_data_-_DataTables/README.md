 Using excel to store gameplay data - DataTables - Epic Wiki             

 

Using excel to store gameplay data - DataTables
===============================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Quick How To Use](#Quick_How_To_Use)
    *   [2.1 1\. Create the CSV File](#1._Create_the_CSV_File)
    *   [2.2 2\. Create the structure in the game](#2._Create_the_structure_in_the_game)
        *   [2.2.1 GameObjectLookupTable.h](#GameObjectLookupTable.h)
    *   [2.3 3\. Create the structure in the game](#3._Create_the_structure_in_the_game)
    *   [2.4 4\. Using the DataTable in Game](#4._Using_the_DataTable_in_Game)
*   [3 Referencing Assets from your data table](#Referencing_Assets_from_your_data_table)
*   [4 TODO](#TODO)

Overview
--------

Data driven gameplay helps mitigate the amount of work and complexity involved, as well as providing the ability to visualize and parameterize data creation and progression, for games that have an extended lifetime well beyond that of a typical boxed game, and require constant tweaking and balancing of data based on player feedback. The ability to move data out to Excel documents that can be maintained using proven tools and then imported to automatically take effect in the game. [Epic's Data Driven Page](https://docs.unrealengine.com/latest/INT/Programming/Gameplay/DataDriven/index.html)

Quick How To Use
----------------

#### 1\. Create the CSV File

Using Excel / Google Docs, create a sheet with the following properties:

[![Csv table example.png](https://d26ilriwvtzlb.cloudfront.net/7/70/Csv_table_example.png)](/index.php?title=File:Csv_table_example.png "Csv table example.png")

Remember to not use spaces in the field titles, and also its important to have the first column/row in blank. Export this file as CSV.

#### 2\. Create the structure in the game

There are two methods of creating the structure.

1) You can create a blueprint Structure in the engine under "Add New > Blueprints > Structure".

2) You can create a C++ struct in code like this:

##### GameObjectLookupTable.h

#include "CoreMinimal.h"
#include "Engine/DataTable.h"
#include "MyObjectLookupTable.generated.h"

/\*\* Structure to store the lookup of GameObjects for use in a UDataTable \*/
USTRUCT(BlueprintType)
struct FMyObjectLookupTable : public FTableRowBase
{
	GENERATED\_BODY()

	/\*\* Full Path of Blueprint \*/
	UPROPERTY(BlueprintReadOnly, Category \= "GO")
	FString Blueprint\_Class;

	/\*\* Category of GamePlay Object \*/
	UPROPERTY(BlueprintReadOnly, Category \= "GO")
		int32 Category;

	/\*\* Scriptable Use Code \*/
	UPROPERTY(BlueprintReadOnly, Category \= "GO")
		int32 Usecode;
};

#### 3\. Create the structure in the game

Import the data into your game. Make sure your file is named CSV, drag to content or hit the import button, select the destination data structure.

[![How-to-import-csv-to-content.png](https://d26ilriwvtzlb.cloudfront.net/d/d7/How-to-import-csv-to-content.png)](/index.php?title=File:How-to-import-csv-to-content.png "How-to-import-csv-to-content.png")

#### 4\. Using the DataTable in Game

**Declaration**

// o-- Lookup table for Game Objects - Loaded from CSV/Excel
UDataTable\* GameObjectLookupTable;

**Construction**

static ConstructorHelpers::FObjectFinder<UDataTable\> 
   GameObjectLookupDataTable\_BP(TEXT("DataTable'/Game/Data/GameObjectLookup.GameObjectLookup'"));
GameObjectLookupTable \= GameObjectLookupDataTable\_BP.Object;

**Searching and Getting Data**

static const FString ContextString(TEXT("GENERAL"));
// o-- Search using FindRow. It returns a handle to the row.
// Access the variables like GOLookupRow->Blueprint\_Class, GOLookupRow->Usecode
FGameObjectLookupTable\* GOLookupRow \= GameObjectLookupTable\->FindRow<FGameObjectLookupTable\>(
	\*FString::Printf(
		TEXT("%d"),
		GoID),
	ContextString
);

if (GOLookupRow) {
	GEngine\->AddOnScreenDebugMessage(
		GEngine\->ScreenMessages.Num() + 1,
		6.0f,
		FColor::Green,
		\*GOLookupRow\->Blueprint\_Class
	);
}

Referencing Assets from your data table
---------------------------------------

1\. Within the content browser, find the game asset you wish to reference. Right click on the asset and select "Copy Reference" to get the full path reference. Then, copy and paste that into your CSV file. Your asset will need to be surrounded by three double quotes (The first and last quote are quoting the quote). Note: The asset path contains an extension for the asset, which must be included! It's super easy to overlook.

Sample in CSV file: """Texture2D'/Game/Assets/Textures/Characters/KnightPortrait.KnightPortrait'"""

2\. Your struct should contain a TAssetPtr<T> for the asset type you are importing. The TAssetPtr is a lazy initialized asset pointer which only loads an asset when its needed by the game. Be careful with assets which have a large file size. If they need to load during runtime, you'll get a slight delay in game. You can force an asset to be loaded at any time within code by calling the "Get()" method.

Sample in struct:

UPROPERTY(EditAnywhere, BlueprintReadWrite, Transient, Category \= "CreatureData")
	TAssetPtr<UTexture2D\> Portrait;

TODO
----

*   Show how to load the CSV dynamically too. If you do, remember to get back here and put how you did.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Using\_excel\_to\_store\_gameplay\_data\_-\_DataTables&oldid=199](https://wiki.unrealengine.com/index.php?title=Using_excel_to_store_gameplay_data_-_DataTables&oldid=199)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")