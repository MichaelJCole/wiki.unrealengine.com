Save System, Read & Write Any Data to Compressed Binary Files - Epic Wiki                    

Save System, Read & Write Any Data to Compressed Binary Files
=============================================================

**Rate this Article:**

4.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif) (12 votes)

Approved for Versions:(please verify)

Contents
--------

*   [1 Custom Save System To Binary Files](#Custom_Save_System_To_Binary_Files)
    *   [1.1 Pre-Summary](#Pre-Summary)
    *   [1.2 Two Levels of Conversions](#Two_Levels_of_Conversions)
        *   [1.2.1 Binary Array = TArray<uint8>](#Binary_Array_.3D_TArray.3Cuint8.3E)
        *   [1.2.2 Step 1: Variable Format -> Binary Array](#Step_1:_Variable_Format_-.3E_Binary_Array)
        *   [1.2.3 Step 2: Binary Array -> Hard Disk](#Step_2:_Binary_Array_-.3E_Hard_Disk)
        *   [1.2.4 Optional Step 3: Compressed Binary](#Optional_Step_3:_Compressed_Binary)
    *   [1.3 Core Header Files](#Core_Header_Files)
        *   [1.3.1 Archive.h and ArchiveBase.h](#Archive.h_and_ArchiveBase.h)
        *   [1.3.2 FileManager.h](#FileManager.h)
        *   [1.3.3 BufferArchive](#BufferArchive)
        *   [1.3.4 FMemoryReader](#FMemoryReader)
    *   [1.4 The << Operator](#The_.3C.3C_Operator)
        *   [1.4.1 Variable -> Binary](#Variable_-.3E_Binary)
        *   [1.4.2 Binary -> Variable](#Binary_-.3E_Variable)
    *   [1.5 The Hardest Concept of UE4 C++ Custom Save System](#The_Hardest_Concept_of_UE4_C.2B.2B_Custom_Save_System)
        *   [1.5.1 Writing Your Function to Be Two-Way](#Writing_Your_Function_to_Be_Two-Way)
            *   [1.5.1.1 The order of how you write out data to binary file must be the exact order that you read it back in!](#The_order_of_how_you_write_out_data_to_binary_file_must_be_the_exact_order_that_you_read_it_back_in.21)
    *   [1.6](#)
    *   [1.7 SaveLoadData: Two-Way Save System Function](#SaveLoadData:_Two-Way_Save_System_Function)
        *   [1.7.1 Saving](#Saving)
        *   [1.7.2 Loading](#Loading)
        *   [1.7.3 Summary](#Summary)
    *   [1.8 My Binary Save System Functions For You](#My_Binary_Save_System_Functions_For_You)
        *   [1.8.1 Saving Binary Files](#Saving_Binary_Files)
        *   [1.8.2 Loading Binary Files](#Loading_Binary_Files)
        *   [1.8.3 Saving Compressed](#Saving_Compressed)
        *   [1.8.4 Loading Compressed](#Loading_Compressed)
    *   [1.9](#_2)
    *   [1.10 Overloading the << Operator](#Overloading_the_.3C.3C_Operator)
    *   [1.11 Crashes?](#Crashes.3F)
    *   [1.12 Enjoy!](#Enjoy.21)

Custom Save System To Binary Files
==================================

Original Author: [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

**Using what I explain in this tutorial you can write your own custom save systems wherein you**

*   write out literally any game-related data you want
*   read back in this data any time you want, from hard-disk
*   compress (ZLIB) these files to minimize usage of the end-user's computer hard disk space

I've already been writing out and loading back in levels that are zipped binary data files for my in-game editor.

  
**I am currently able to save literally any custom data I want, including dynamic arrays, for all my custom classes.**

  
I've developed a streamlined method for doing all this by overloading a specific UE4 C++ operator, so yay thank you thank you Epic for C++ access!

  

Pre-Summary
-----------

There's a lot of concepts in this tutorial, try out each part and get it working before moving on to the next

Just copy-pasting code will not work here, you need to understand the basics, because all I am presenting is the basics,

and you must apply the basics to your own project's needs.

After all, this is about a save system for any arbitrary project-specific custom class data :)

  

Two Levels of Conversions
-------------------------

When you want to save custom variable data for your custom save system,

there are TWO major steps involved

**Step 1** = variable format -> binary array (serialized by Archive class of UE4)

**Step 2** = Binary array -> hard disk

These steps are then done in reverse to read back in data from hard disk.

  

### Binary Array = TArray<uint8>

Binary data is represented in a very UE4 C++ friendly looking way as a dynamic array of uint8.

So any time you see TArray<uint8> in my code in this tutorial, that literally means "Binary Array" from UE4 C++ standpoint.

  

### Step 1: Variable Format -> Binary Array

An int32 takes up 4 bytes, as does a float.

An int64 takes up 8 bytes.

An FName takes up 8 bytes.

An FString takes up 16 bytes.

An FVector takes up 3 x float bytes.

etc.

So even a single int32 is actually an array of bytes, not a single entry.

Now let's suppose your save system needs to store

*   3 FVector's

*   40 int32's

*   20 FName's

Do all the math and this is a lot of bytes!

3 x 3 x 4 = 36

40 x 4 = 160

20 x 8 = 160

356

So this means that before your data leaves UE4 and goes to hard disk, you need a TArray<uint8> that has 356 entries.

### Step 2: Binary Array -> Hard Disk

UE4 C++ gives you functions via FileManager.h to write out TArray<uint8> to hard disk!

  

### Optional Step 3: Compressed Binary

UE4 gives you functionality via Archive.h to compress a TArray<uint8> before sending it to the FileManager

C++ Code For You

Below I am giving you the functions that I use to to read and write binary files of any custom data I choose

  

Core Header Files
-----------------

### Archive.h and ArchiveBase.h

See Archive.h and ArchiveBase.h for all the info you need about getting from your varibles and custom class data to binary format (serialized data).

### FileManager.h

All the functions you need to

*   create directories
*   delete directories
*   create files
*   delete files
*   get a listing of all files in a given path
*   get a listing of all folders in a given path
*   get the age of a file

and more are found in FileManager.h

You access these functions from anywhere using

if(GFileManager) GFileManager\-\>TheFunction()

### BufferArchive

The buffer archive is both a binary array (TArray<uint8>), and a MemoryWriter

**Archive.h**

/\*\*
 \* Buffer archiver.
 \*/
class FBufferArchive : public FMemoryWriter, public TArray<uint8\>
{

Because of this multiple-inheritance, the BufferArchive is my preferred way to write data to binary file.

As my code will show, because the GFileManager wants to receive a TArray<uint8>, not a MemoryArchive.

Review my Steps 1 and 2 to see why this is such an awesome class. :)

Thanks UE4 Devs!

  

### FMemoryReader

To read Data back from a binary array, that is retrieved by the FileManager, you need a MemoryReader

**Archive.h**

/\*\*
 \* Archive for reading arbitrary data from the specified memory location
 \*/
class FMemoryReader : public FMemoryArchive
{
public:

The << Operator
---------------

The BufferArchive/Binary Array needs to retrieve your game's variable data, how do you tell it what you want stored as binary?

The << operator!

  

### Variable -> Binary

Here's how you would put an FVector into a BufferArchive to then be saved to hard disk.

//in player controller class

FBufferArchive ToBinary;
ToBinary << GetPawn()\-\>GetActorLocation(); //save player location to hard disk
 
//save ToBinary to hard disk using File Manager, 
//see complete code samples below

### Binary -> Variable

Here's how you would retrieve an FVector from a TArray<uint8> as retrieved by GFileManager.

//TheBinaryArray was already obtained from FileManager, 
//see code below for full examples
 
//need to supply a variable to be filled with the data
FVector ToBeFilledWithData;
 
FMemoryReader Ar \= FMemoryReader(TheBinaryArray, true); //true, free data after done
Ar.Seek(0); //make sure we are at the beginning
 
Ar << ToBeFilledWithData;

The Hardest Concept of UE4 C++ Custom Save System
-------------------------------------------------

Compare these two lines

ToBinary << GetPawn()\-\>GetActorLocation();
Ar << ToBeFilledWithData;

The hardest concept for me about the UE4 archive system was the fact that the << operator could mean

\- getting data out of the archive and putting it into the variable

or

\- putting data from the variable into the archived binary format

depending on the context!

  
So that's why I recommend you name your BufferArchive something like ToBinary,

and your MemoryReader something **totally different**,

you can only discern the difference between writing to binary and reading from binary

based on the context as you show it in your code, as the << operator will tell you nothing from a simple glance.

  

### Writing Your Function to Be Two-Way

The critical advantage of this system though is that you can write a single function that works both ways.

So you can write a single function that loads data from file, or saves to file.

But why would you want this?

Because:

#### The order of how you write out data to binary file must be the exact order that you read it back in!

The computer does not have any way of knowing, nor does UE4, what the correct order of variable data should be.

You are responsible for telling the computer and UE4 to read data back in in the same order it was written out to file.

Thus, having a single function that both reads and writes, using the multi-purpose << operator, is the safest thing you can do to ensure consistency of writing/reading binary data.

SaveLoadData: Two-Way Save System Function
------------------------------------------

'''.h'''
 
//FArchive is shared base class for FBufferArchive and FMemoryReader
void SaveLoadData(FArchive& Ar, int32& SaveDataInt32, FVector& SaveDataVector, TArray<FRotator\>& SaveDataRotatorArray);
 
'''.cpp'''
 
//I am using controller class for convenience, use any class you want
 
//SaveLoadData
void YourControllerClass::SaveLoadData(FArchive& Ar,
  int32& SaveDataInt32,
  FVector& SaveDataVector,
  TArray<FRotator\>& SaveDataRotatorArray
)
{
	Ar << SaveDataInt32;
	Ar << SaveDataVector;
	Ar << SaveDataRotatorArray;
}

### Saving

Make a BufferArchive and pass it in, it is a Binary Array and also an FArchive

FBufferArchive ToBinary;
SaveLoadData(ToBinary,NumGemsCollected,PlayerLocation,ArrayOfRotationsOfTheStars);
//save the binary array / FBufferArchive to hard disk, see below

### Loading

// TheBinaryArray already retrieved from file, see full code sample
FMemoryReader FromBinary \= FMemoryReader(TheBinaryArray, true); //true, free data after done
FromBinary.Seek(0);
SaveLoadData(FromBinary,NumGemsCollected,PlayerLocation,ArrayOfRotationsOfTheStars);

### Summary

Use this setup to avoid crashes due to reading data not in same order that you wrote it to disk!

this two way functionality of UE4 << operator saves the day!

Thanks Epic Devs!

My Binary Save System Functions For You
---------------------------------------

Below I am giving you the functions that I use to save/load binary files!

### Saving Binary Files

bool ControllerClass::SaveGameDataToFile(const FString& FullFilePath, FBufferArchive& ToBinary)
{
	//note that the supplied FString must be the entire Filepath
	// 	if writing it out yourself in C++ make sure to use the \\\\
	// 	for example:
 
	// 	FString SavePath = "C:\\\\MyProject\\\\MySaveDir\\\\mysavefile.save";
 
	//Step 1: Variable Data -> Binary
 
	//following along from above examples
	SaveLoadData(ToBinary,NumGemsCollected,PlayerLocation,ArrayOfRotationsOfTheStars); 
	//presumed to be global var data, 
	//could pass in the data too if you preferred
 
	//No Data
	if(ToBinary.Num() <= 0) return false;
	//~
 
	//Step 2: Binary to Hard Disk
	if (FFileHelper::SaveArrayToFile(ToBinary, \* FullFilePath)) 
	{
		// Free Binary Array 
		ToBinary.FlushCache();
		ToBinary.Empty();
 
		ClientMessage("Save Success!");
		return true;
	}
 
	// Free Binary Array 
	ToBinary.FlushCache();
	ToBinary.Empty();
 
	ClientMessage("File Could Not Be Saved!");
 
	return false;
}

FBufferArchive

### Loading Binary Files

//I am using the sample save data from above examples as the data being loaded
bool ControllerClass::LoadGameDataFromFile(
	const FString& FullFilePath, 
	int32& SaveDataInt32,
	FVector& SaveDataVector,
	TArray<FRotator\>& SaveDataRotatorArray
){
	//Load the data array,
	// 	you do not need to pre-initialize this array,
	//		UE4 C++ is awesome and fills it 
	//		with whatever contents of file are, 
	//		and however many bytes that is
	TArray<uint8\> TheBinaryArray;
	if (!FFileHelper::LoadFileToArray(TheBinaryArray, \*FullFilePath))
	{
		ClientMessage("FFILEHELPER:>> Invalid File");
		return false;
		//~~
	}
 
	//Testing
	ClientMessage("Loaded File Size");
	ClientMessage(FString::FromInt(TheBinaryArray.Num()));
 
	//File Load Error
	if(TheBinaryArray.Num() <= 0) return false;
 
	//~
	//		  Read the Data Retrieved by GFileManager
	//~
 
	FMemoryReader FromBinary \= FMemoryReader(TheBinaryArray, true); //true, free data after done
	FromBinary.Seek(0);
	SaveLoadData(FromBinary,NumGemsCollected,PlayerLocation,ArrayOfRotationsOfTheStars);
 
	//~
	//								Clean up 
	//~
	FromBinary.FlushCache();
 
	// Empty & Close Buffer 
	TheBinaryArray.Empty();
	FromBinary.Close();
 
	return true;
}

### Saving Compressed

bool ControllerClass::SaveGameDataToFileCompressed(const FString& FullFilePath, 
	int32& SaveDataInt32,
	FVector& SaveDataVector,
	TArray<FRotator\>& SaveDataRotatorArray
){
	FBufferArchive ToBinary;
	SaveLoadData(ToBinary,NumGemsCollected,PlayerLocation,ArrayOfRotationsOfTheStars); 
 
	//Pre Compressed Size
	ClientMessage("~ PreCompressed Size ~");
	ClientMessage(FString::FromInt(ToBinary.Num()));
 
	//
 
	// Compress File 
	//tmp compressed data array
	TArray<uint8\> CompressedData;
	FArchiveSaveCompressedProxy Compressor \= 
		FArchiveSaveCompressedProxy(CompressedData, ECompressionFlags::COMPRESS\_ZLIB);
 
	//Send entire binary array/archive to compressor
	Compressor << ToBinary;
 
	//send archive serialized data to binary array
	Compressor.Flush();
 
	//
 
	//Compressed Size
	ClientMessage("~ Compressed Size ~");
	ClientMessage(FString::FromInt(CompressedData.Num()));
 
 
	if (!GFileManager) return false;
 
	//vibes to file, return successful or not
	if (FFileHelper::SaveArrayToFile(CompressedData, \* FullFilePath)) 
	{
		// Free Binary Arrays 
		Compressor.FlushCache();
		CompressedData.Empty();
 
		ToBinary.FlushCache();
		ToBinary.Empty();
 
		// Close Buffer 
		ToBinary.Close();
 
		ClientMessage("File Save Success!");
 
		return true;
		//
	}
	else
	{
		// Free Binary Arrays 
                Compressor.FlushCache();
		CompressedData.Empty();
 
		ToBinary.FlushCache();
		ToBinary.Empty();
 
		// Close Buffer 
		ToBinary.Close();
 
		ClientMessage("File Could Not Be Saved!");
 
		return false;
		//
	}
}

  

### Loading Compressed

//I am using the sample save data from above examples as the data being loaded
bool ControllerClass::LoadGameDataFromFileCompressed(
	const FString& FullFilePath, 
	int32& SaveDataInt32,
	FVector& SaveDataVector,
	TArray<FRotator\>& SaveDataRotatorArray
){
	//Load the Compressed data array
	TArray<uint8\> CompressedData;
	if (!FFileHelper::LoadFileToArray(CompressedData, \*FullFilePath))
	{
		Optimize("FFILEHELPER:>> Invalid File");
		return false;
		//~~
	}
 
	// Decompress File 
	FArchiveLoadCompressedProxy Decompressor \= 
		FArchiveLoadCompressedProxy(CompressedData, ECompressionFlags::COMPRESS\_ZLIB);
 
	//Decompression Error?
	if(Decompressor.GetError())
	{
		Optimize("FArchiveLoadCompressedProxy>> ERROR : File Was Not Compressed ");
		return false;
		//
	}
 
	//Decompress
	FBufferArchive DecompressedBinaryArray;
	Decompressor << DecompressedBinaryArray;
 
	//~
	//		  Read the Data Retrieved by GFileManager
	//~
 
	FMemoryReader FromBinary \= FMemoryReader(DecompressedBinaryArray, true); //true, free data after done
	FromBinary.Seek(0);
	SaveLoadData(FromBinary,NumGemsCollected,PlayerLocation,ArrayOfRotationsOfTheStars);
 
	//~
	//								Clean up 
	//~
	CompressedData.Empty();
	Decompressor.FlushCache();
	FromBinary.FlushCache();
 
	// Empty & Close Buffer 
	DecompressedBinaryArray.Empty();
	DecompressedBinaryArray.Close();
 
	return true;
}

  

Overloading the << Operator
---------------------------

Create your own << Operator overloads to simplify the process!

Let's say you have your own USTRUCT or your own class, and you want to write a way to

simply write

ToBinary << MyEntireSaveSystem;

or

ToBinary << MySpecialUStruct;

  
Here's how you overload the << Operator!

Please note this must be in the .h file, and no contents in the .cpp.

Also there is no context, such as MyClass::, it must be at the global level.

Also the .h file that has this definition must be compiled before any classes that want to use it.

You can use UClass(dependson=UYourDefinitionsClass) to ensure this

or simply put the .h contents in your public directory

and include them as a header somewhere.

**.h**

//Make as many Unique Overloads as you want!
FORCEINLINE FArchive& operator<<(FArchive &Ar, UMySaveGameClass\* SaveGameData )
{
	if(!SaveGameData) return Ar;
	//~
 
	Ar << SaveGameData\-\>NumGemsCollected;  //int32
	Ar << SaveGameData\-\>PlayerLocation;  //FVector
	Ar << SaveGameData\-\>ArrayOfRotationsOfTheStars; //TArray<FRotator>
 
        return Ar;
}

**Note:**

1\. The operator is returning the Ar by reference.

2\. No const are allowed at global level (its a compile error)

3\. No const allowed inside because you dont know if you are reading or writing due to nature of << operator.

Crashes?
--------

If you get crashes you are not reading/writing data in same order,

use overloaded << operator and the idea of a single function like SaveLoadGame to avoid this

  
Also, if you **compress data before saving it** make sure you are loading it using my **compressed function**, not the regular one, and vice versa :)

Enjoy!
------

Have fun making your very own custom save game system, and saving it to compressed binary file!

♥

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Save\_System,\_Read\_%26\_Write\_Any\_Data\_to\_Compressed\_Binary\_Files&oldid=22381](https://wiki.unrealengine.com/index.php?title=Save_System,_Read_%26_Write_Any_Data_to_Compressed_Binary_Files&oldid=22381)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)