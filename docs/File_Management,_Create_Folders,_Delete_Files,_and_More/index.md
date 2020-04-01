File Management, Create Folders, Delete Files, and More - Epic Wiki                    

File Management, Create Folders, Delete Files, and More
=======================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Required Knowledge](#Required_Knowledge)
    *   [2.1 Using \*FString](#Using_.2AFString)
    *   [2.2 Using TEXT() Macro](#Using_TEXT.28.29_Macro)
*   [3 Example Code](#Example_Code)
    *   [3.1 Verify or Create Directory](#Verify_or_Create_Directory)
    *   [3.2 Get File Size](#Get_File_Size)
    *   [3.3 Moving / Renaming File](#Moving_.2F_Renaming_File)
    *   [3.4 Delete File](#Delete_File)
    *   [3.5 Read/Write to Files](#Read.2FWrite_to_Files)
        *   [3.5.1 Text Files](#Text_Files)
        *   [3.5.2 Binary Files](#Binary_Files)
            *   [3.5.2.1 Writing](#Writing)
        *   [3.5.3 Read from Binary Files](#Read_from_Binary_Files)
*   [4 Create Directory Recursively](#Create_Directory_Recursively)
*   [5 Copy Directory Tree](#Copy_Directory_Tree)
*   [6 Documentation](#Documentation)
*   [7 Conclusion](#Conclusion)

Overview
--------

**Original Author** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

**Contributing Author** [Zyr](/index.php?title=User:Zyr&action=edit&redlink=1 "User:Zyr (page does not exist)") ([talk](/index.php?title=User_talk:Zyr&action=edit&redlink=1 "User talk:Zyr (page does not exist)"))

The Unreal Engine 4 provides a cross-platform standardization for accessing the file system, i.e. creating, renaming, moving, deleting files and folders and writing to or reading from files.

This platform-agnostic file system is referred to as the UFS (Unreal File System)!

Required Knowledge
------------------

Before we can get started you need to know how to work with FString's. Most file functions require a TCHAR\* argument as the file path. This short section covers the very basics.

### Using \*FString

FString contains a TArray<TCHAR> which internally stores a TCHAR\*. This can be retrieved through

 FString MyString;
 TCHAR\* MyTCharArray = \*MyString;

### Using TEXT() Macro

The TEXT() macro can be used to create a TCHAR\*. The result of TEXT() is not meant for manipulation, it may behave unexpectedly. If you need to manipulate a string literal, it is recommended to construct an FString with this literal and manipulate the FString. Then use the above code to retrieve the manipulated data. Example:

 FString ManipulateMe = FString(TEXT("String literal"));
 ManipulateMe.RemoveAt(6); // Remove the blank
 TCHAR\* ManipulatedData = \*ManipulateMe;

Example Code
------------

### Verify or Create Directory

//If this function cannot find or create the directory, returns false.
static FORCEINLINE bool VerifyOrCreateDirectory(const FString& TestDir) const
{
	// Every function call, unless the function is inline, adds a small
	// overhead which we can avoid by creating a local variable like so.
	// But beware of making every function inline!
	IPlatformFile& PlatformFile \= FPlatformFileManager::Get().GetPlatformFile();
 
	// Directory Exists?
	if (!PlatformFile.DirectoryExists(\*TestDir)) 
	{
		PlatformFile.CreateDirectory(\*TestDir);
 
		if (!PlatformFile.DirectoryExists(\*TestDir)) 
		{
			return false;
			//~~~~~~~~~~~~~~
		}
	}
	return true;
}

### Get File Size

Note: UE4 standardizes the file paths across platforms. Even on Windows systems regular slashes are used instead of backslashes.

FString AbsoluteFilePath \= "E:/MyProject/SaveFiles/Today/SaveFile1.SAV";
if (!FPlatformFileManager::Get().GetPlatformFile().FileExists(\*AbsoluteFilePath))
{
	UE\_LOG(...., "Could Not Find File");
	return;
}
 
const int64 FileSize \= FPlatformFileManager::Get().GetPlatformFile().FileSize(\*AbsoluteFilePath);
 
FString Message \= FString::Printf(TEXT("File size is: %d"), FileSize);
UE\_LOG(..., \*Message);

### Moving / Renaming File

_Hint: When simply renaming a file, the path to the file remains the same while simply the file name (the last bit after the final slash "/") changes._

FString AbsoluteSourcePath \= "E:/MyProject/SaveFiles/Today/SaveFile1.SAV";
FString AbsoluteDestinationPath \= "E:/MyProject/SaveFiles/Yesterday/SaveFile1.SAV";
if ( ! FPlatformFileManager::Get().GetPlatformFile().FileExists( \*AbsoluteSourcePath))
{
	UE\_LOG(..., "Could Not Find File");
	return;
}
 
if( ! FPlatformFileManager::Get().GetPlatformFile().MoveFile(AbsoluteDestinationPath, AbsoluteSourcePath))
{
	UE\_LOG(..., "Could not move file");
}

### Delete File

FString AbsoluteFilePath \= "E:/MyProject/SaveFiles/Today/SaveFile1.SAV";
if (!FPlatformFileManager::Get().GetPlatformFile().DeleteFile(\*AbsoluteFilePath))
{
	UE\_LOG(...., "Could Not Find File");
	return;
}

### Read/Write to Files

If you need to simply read and write strings to a file, UE4 has you covered. Should you require a more specialized solution, you'll need to write your own binary file format.

#### Text Files

Text files can be easily handled using [FFileHelper](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/Misc/FFileHelper/index.html). Following is an example of how to write to a text file. Reading from a text file is analogous.

FString SaveDirectory \= FString("C:/Path/To/My/Save/Directory");
FString FileName \= FString("MyFileName.sav");
FString TextToSave \= FString("Lorem ipsum");
bool AllowOverwriting \= false;
 
IPlatformFile& PlatformFile \= FPlatformFileManager::Get().GetPlatformFile();
 
// CreateDirectoryTree returns true if the destination
// directory existed prior to call or has been created
// during the call.
if (PlatformFile.CreateDirectoryTree(\*SaveDirectory))
{
	// Get absolute file path
	FString AbsoluteFilePath \= SaveDirectory + "/" + FileName;
 
	// Allow overwriting or file doesn't already exist
	if (AllowOverwriting || !PlatformFile::FileExists(\*AbsoluteFilePath))
	{
		FFileHelper::SaveStringToFile(TextToSave, \*AbsoluteFilePath);
	}
}

#### Binary Files

Binary files cannot be read by normal human beings. They have different purposes and usually are not intended for easy modding. One example would be save files.

The same data stored in a binary file uses up different space. For example, when storing "38" as a string, you must store its individual digits as characters: "3" and "8". Storing them as characters in ASCII fills the file with the bytes 0x33 0x38. Storing the number as a binary-formatted byte would fill the file only with 0x26, half the size. Storing it as an integer, however, yields for example 0x00 0x00 0x00 0x26 (depending on system endian). Using an int32 thus would be an improvement if you stored a large number, such as 1,234,567 which would use 7 bytes as an ASCII but only 4 as an int32.

Usually any string-formatted data set can be stored in binary format more efficiently at the cost of flexibility and human-readability. Example: XML or JSON. Flexibility is lost simply because data usually is not associated with keys.

##### Writing

Since the UE4 functions only support uint8\* arrays, you'll surely be exploiting pointers.

IPlatformFile& PlatformFile \= FPlatformFileManager::Get().GetPlatformFile();
 
IFileHandle\* FileHandle \= PlatformFile.OpenWrite(\*FileName);
if(FileHandle)
{
	// Create our byte buffer
	uint8\* ByteArray \= reinterpret\_cast<uint8\*\>(FMemory::Malloc(sizeof(int32));
 
	// If we were to directly write to the byte buffer, data would likely be lost.
	// It is better practice to reinterpret the pointer to the byte buffer you want
	// to write to to the type of the data you want to write.
	int32\* IntPointer \= reinterpret\_cast<int32\*\>(ByteArray);
 
	// Write the integer to the byte buffer
	\*IntPointer \= MyInteger;
 
	// Write the bytes to the file
	FileHandle\-\>Write(ByteArray, sizeof(int32));
 
	// Close the file again
	delete FileHandle;
 
	// Free the memory allocated to the byte buffer
	FMemory::Free(ByteArray);
}

The above example of course could also be done quickly and easily like so:

IPlatformFile& PlatformFile \= FPlatformFileManager::Get().GetPlatformFile();
 
IFileHandle\* FileHandle \= PlatformFile.OpenWrite(\*FileName);
if(FileHandle)
{
	int32\* IntPointer \= &MyInteger;
	uint8\* ByteBuffer \= reinterpret\_cast<uint8\*\>(IntPointer);
 
	// Write the bytes to the file
	FileHandle\-\>Write(ByteBuffer, sizeof(int32));
 
	// Close the file again
	delete FileHandle;
}

The former simply is a more generic solution which allows adding more data to a larger byte buffer and flush them all at once while the latter writes a single piece of data at a time.

If the above sorcery confuses you, my personal recommendation is to experiment more with pointers and get a deeper understanding of what they are and how they work. Maybe follow Rama's guide to **[Saving Binary Files](/Save_System,_Read_%26_Write_Any_Data_to_Compressed_Binary_Files#Saving_Binary_Files "Save System, Read & Write Any Data to Compressed Binary Files")**.

Following is an alternative way of storing a string in a file.

IPlatformFile& PlatformFile \= FPlatformFileManager::Get().GetPlatformFile();
 
IFileHandle\* FileHandle \= PlatformFile.OpenWrite(\*FileName);
if(FileHandle)
{
	FString Guid \= FString(
		TEXT("// This file is written to disk\\n")
		TEXT("// GUID = "))
		+ FGuid::NewGuid().ToString();
 
	FileHandle\-\>Write((const uint8\*)TCHAR\_TO\_ANSI(\*Guid), Guid.Len());
 
	delete FileHandle;
}

#### Read from Binary Files

Reading from a binary file works similarly:

IPlatformFile& PlatformFile \= FPlatformFileManager::Get().GetPlatformFile();
 
IFileHandle\* FileHandle \= PlatformFile.OpenRead(\*FileName);
if(FileHandle)
{
	// Create a pointer to MyInteger
	int32\* IntPointer \= &MyInteger;
	// Reinterpret the pointer for the Read function
	uint8\* ByteBuffer \= reinterpret\_cast<uint8\*\>(IntPointer);
 
	// Read the integer from file into our reinterpret pointer
	FileHandle\-\>Read(ByteBuffer, sizeof(int32));
 
	// Because ByteBuffer points directly to MyInteger, it's already been updated at this point
	GEngine\-\>AddOnScreenDebugMessage(\-1, 10.f, FColor::Yellow, FString::Printf(TEXT("Read integer is %d"), MyInteger);
 
	// Close the file again
	delete FileHandle;
}

Create Directory Recursively
----------------------------

_IPlatformFile_ provides a function [CreateDirectoryTree](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/GenericPlatform/IPlatformFile/CreateDirectoryTree/index.html) which can be used to create a directory including all its parent directories should they not exist.

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama")) has written a guide to implementing such functionality yourself **[here](/Algorithm_Analysis:_Create_Directory_Recursively "Algorithm Analysis: Create Directory Recursively")**.

Copy Directory Tree
-------------------

Use CopyDirectoryTree if you want to copy an entire folder tree to another location, with the option to overwrite files at that location!

This can be very useful for patching your game or updating local data/documentation files that you ship with your game.

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama")) submitted the pull request for CopyDirectoryTree early on in the release of UE4

Github Pull Request (You must be logged into a UE4-Github linked account to view this) [https://github.com/EpicGames/UnrealEngine/pull/27](https://github.com/EpicGames/UnrealEngine/pull/27)

Epic Documentation on [CopyDirectoryTree](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/GenericPlatform/IPlatformFile/CopyDirectoryTree/index.html)

Documentation
-------------

One source of documentation is _GenericPlatformFile.h_ delivered with the UE4 engine.

You will also find the online documentation on IPlatformFile.h [here](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/GenericPlatform/IPlatformFile/index.html) helpful.

Conclusion
----------

With the vast assortment of File IO operations shown in this wiki and found in GenericPlatformFile.h and IPlatformFile.h you have at your disposal the power of the UFS, a platform agnostic FileIO system to make just the kind of game you want!

<3

Rama

Retrieved from "[https://wiki.unrealengine.com/index.php?title=File\_Management,\_Create\_Folders,\_Delete\_Files,\_and\_More&oldid=23579](https://wiki.unrealengine.com/index.php?title=File_Management,_Create_Folders,_Delete_Files,_and_More&oldid=23579)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)