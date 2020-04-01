Algorithm Analysis: Create Directory Recursively - Epic Wiki                    

Algorithm Analysis: Create Directory Recursively
================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Standard Create Directory](#Standard_Create_Directory)
*   [3 The Issue](#The_Issue)
*   [4 Static](#Static)
*   [5 CreateDirectoryRecursively](#CreateDirectoryRecursively)
    *   [5.1 Input](#Input)
    *   [5.2 Output](#Output)
*   [6 Algorithm Analysis](#Algorithm_Analysis)
    *   [6.1 Loop Protection](#Loop_Protection)
    *   [6.2 Algorithm Formatting to Avoid Input Requirements](#Algorithm_Formatting_to_Avoid_Input_Requirements)
    *   [6.3 Recycling Memory in Looping Algorithms](#Recycling_Memory_in_Looping_Algorithms)
    *   [6.4 Simplicity](#Simplicity)
    *   [6.5 Review](#Review)
*   [7 Conclusion](#Conclusion)

Overview
--------

_Algorithm & Algorithm Analysis by:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

**I have a gift for you!**

And also a chance to do some in-depth C++ algorithm analysis with you :)

Here is my entire function for recursively creating a directory!

Standard Create Directory
-------------------------

The standard create directory function in UE4 is:

 FPlatformFileManager::Get().GetPlatformFile().CreateDirectory(\*FullPath);

FullPath should look something like:

 "C:/YourProj/YourLevels/YourSubLevels"

The Issue
---------

If you try to create the above directory, YourSubLevels, supplying the entire path, the CreateDirectory function will fail if all of the super directories do not exist.

So if `C:/YourProj/YourLevels/` does not exist, the function will fail.

But in my case, I want to ensure that all necessary super directories will be created!

**So I wrote a function to do this!**

Static
------

Remove the word static if you just want to plop this function in a .h file somewhere to test it :)

CreateDirectoryRecursively
--------------------------

//Create Directory, Creating Entire Structure as Necessary
//		so if JoyLevels and Folder1 do not exist in JoyLevels/Folder1/Folder2
//			they will be created so that Folder2 can be created!
 
//This is my solution for fact that trying to create a directory fails 
//		if its super directories do not exist
 
 
//Expects entire directory path, such as:
 
// C:/Folder1/Folder2/Folder3/NewFolderToMake/
 
//			Author: Rama
 
 
static FORCEINLINE void CreateDirectoryRecursively(FString FolderToMake) 
{
	//FolderToMake is not const so split can be used, and does not damage input
 
        //Loop Proteciton
	const int32 MAX\_LOOP\_ITR \= 3000; //limit of 3000 directories in the structure
 
	// Normalize all / and \\ to TEXT("/") and remove any trailing TEXT("/") 
        //if the character before that is not a TEXT("/") or a colon
	FPaths::NormalizeDirectoryName(FolderToMake);
 
	//Normalize removes the last "/", but my algorithm wants it
	FolderToMake +\= "/";
 
	FString Base;
	FString Left;
	FString Remaining;
 
	//Split off the Root
	FolderToMake.Split(TEXT("/"),&Base,&Remaining);
	Base +\= "/"; //add root text to Base
 
	int32 LoopItr \= 0;
	while(Remaining !\= "" && LoopItr < MAX\_LOOP\_ITR)
	{
		Remaining.Split(TEXT("/"),&Left,&Remaining);
 
		//Add to the Base
		Base +\= Left + FString("/"); //add left and split text to Base
 
		//Create Incremental Directory Structure!
		FPlatformFileManager::Get().GetPlatformFile().CreateDirectory(\*Base);
 
		LoopItr++;
	}
}

### Input

**New Folder =** C:/Users/Rama/Documents/Victory/FolderSong/FolderDance/FolderRain/FolderRainbow

FString NewFolder \= 
   "C:/Users/Rama/Documents/Victory/FolderSong/FolderDance/FolderRain/FolderRainbow/";
 
//remove UMyFunctionLibrary:: if you removed the "static"
UMyFunctionLibrary::CreateDirectoryRecursively(NewFolder);

### Output

[![RainbowRecursively.jpg](https://d26ilriwvtzlb.cloudfront.net/9/94/RainbowRecursively.jpg)](/File:RainbowRecursively.jpg)

Algorithm Analysis
------------------

### Loop Protection

The first and most important thing to note is that this is a while loop!

So in any while loop it is a really good idea to have Loop Protection!

const int32 MAX\_LOOP\_ITR \= 3000;
int32 LoopItr \= 0;
 
while(Remaining !\= "" && LoopItr < MAX\_LOOP\_ITR)
{
        //... 
	LoopItr++;
}

The loop is supposed to end happily and healthily when Remaining == "", because all parts of the directory structure have been created.

If the directory structure contains 3000 folders I'd be rather surprised, and so I use this number as the max loop count, to protect against a permanent hang.

 You should always incorporate Loop Protection if you are using a While Loop!

### Algorithm Formatting to Avoid Input Requirements

My algorithm requires that the file path not be using any \\ characters instead of / for the file path, such as

 C:\\YourProj\\YourLevels\\YourSubLevels

In order to ensure that my algorithm will work, I am using Epic's awesome NormalizeDirectoryName function!

// Normalize all / and \\ to TEXT("/") and remove any trailing TEXT("/") if the character before that is not a TEXT("/") or a colon
FPaths::NormalizeDirectoryName(FolderToMake);

If I did not do this re-formatting internally to guarantee success, I would have had to make users understand to only supply a certain format.

 So wherever possible, you should try to format the input yourself to meet your algorithm's requirements.

### Recycling Memory in Looping Algorithms

I am using Split to recycle variables to minimize Memory usage.

//While Loop
//{
Remaining.Split(TEXT("/"),&Left,&Remaining);
//}

Recall from my **[UE4 C++ Introductory Guide](/Entry_Level_Guide_to_UE4_C%2B%2B "Entry Level Guide to UE4 C++")** that the & symbol means that you are accessing the memory location of the variable.

So in the while loop above, the Split function is continuously recycling the variable data!

Split is separating the input string Remaining on the first instance of the "/".

The left part of Remaining is passed off to the Base, added to the rest of the Base in order to make the folder.

The right part of the string, the remaining portion, is passed right back into Remaining!

So the contents of Remaining are replaced after the function is run!

In this way I am using the same amount of memory whether the directory structure contains 3 or 700 directories!

 In any looping alogrithm make careful use of pointers and the & operator to minimize memory used

### Simplicity

When I first was making this function, it was getting very complicated.

I stepped back, realized where my mistake was, and re wrote the algorithm much more simply!

 If your algorithms are running away with you and getting complicated, 
 take a step back and look for a simpler approach, 
 that may involving using or understanding the UE4 C++ API better.

In my case I did not notice that using NormalizeDirectoryName was removing the last "/" that my algorithm relied upon.

In my fix for this, I also ended up guaranteeing that a last "/" will be added even if the user did not put one in!

// Normalize all / and \\ to TEXT("/") and remove any trailing TEXT("/") if the character before that is not a TEXT("/") or a colon
FPaths::NormalizeDirectoryName(FolderToMake);
 
//Normalize removes the last "/", but my algorithm wants it
FolderToMake +\= "/";

### Review

Now check out the entire algorithm again, and see what you've learned from reading this algorithm analysis!

**[Algorithm Review! See What You've Learned!](#CreateDirectoryRecursively)**

Conclusion
----------

I hope you have additional insights now for when you are writing your own C++ Algorithms.

And I hope you enjoy using my CreateDirectoryRecursively!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Algorithm\_Analysis:\_Create\_Directory\_Recursively&oldid=2606](https://wiki.unrealengine.com/index.php?title=Algorithm_Analysis:_Create_Directory_Recursively&oldid=2606)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)