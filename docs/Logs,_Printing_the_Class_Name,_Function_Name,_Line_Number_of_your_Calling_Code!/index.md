Logs, Printing the Class Name, Function Name, Line Number of your Calling Code! - Epic Wiki                    

Logs, Printing the Class Name, Function Name, Line Number of your Calling Code!
===============================================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Print Screen Messages With Class/LineNumber](#Print_Screen_Messages_With_Class.2FLineNumber)
*   [3 Print the name of the Calling Function, With Entire Siganture!](#Print_the_name_of_the_Calling_Function.2C_With_Entire_Siganture.21)
*   [4 My C++ Code For You](#My_C.2B.2B_Code_For_You)
*   [5 V\_LOG](#V_LOG)
    *   [5.1 V\_LOGM](#V_LOGM)
*   [6 More Info](#More_Info)
*   [7 Summary](#Summary)

Overview
--------

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

In this wiki I am giving the code for how to independently print the Class, Function Name, and Line number wherever you are in the calling code that uses my pre-processor commands below!

You can even get a UE4 FString telling you the whole function signature of the function you are in where you use my code, including variable types!

Print Screen Messages With Class/LineNumber
-------------------------------------------

I also provide you with a pre-processor command that prints a message to the screen including the Class name and line number!

Here's a pic!

[![JoyStringCurrentClassFuncLineNumber2.jpg](https://d3ar1piqh1oeli.cloudfront.net/1/11/JoyStringCurrentClassFuncLineNumber2.jpg/700px-JoyStringCurrentClassFuncLineNumber2.jpg)](/File:JoyStringCurrentClassFuncLineNumber2.jpg)

After you get my .h file below, the code for the above picture is this!

//~~~ Tick ~~~
void AEVCoreDefense::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	//~~~~~~~~~~~~~
 
	VSCREENMSG("Got Here!");  //Class and line number get printed for you! ♥ Rama
}

Print the name of the Calling Function, With Entire Siganture!
--------------------------------------------------------------

[![JoyStringCurrentClassFuncLineNumber3.jpg](https://d3ar1piqh1oeli.cloudfront.net/8/83/JoyStringCurrentClassFuncLineNumber3.jpg/700px-JoyStringCurrentClassFuncLineNumber3.jpg)](/File:JoyStringCurrentClassFuncLineNumber3.jpg)

My C++ Code For You
-------------------

Here is the entire file you can #include in your code base!

I call it JoyCurrentClassFuncLine.h.

So you would then do this somewhere at the top of one of your core classes:

// Joy Class Func Line
#include "JoyCurrentClassFuncLine.h"

/\*
	Joy String 
		Current Class, File, and Line Number!
			by Rama
 
	PreProcessor commands to get 
		a. Class name
		b. Function Name
		c. Line number 
		d. Function Signature (including parameters)
 
	Gives you a UE4 FString anywhere in your code that these macros are used!
 
	Ex: 
		You can use JOYSTR\_CUR\_CLASS anywhere to get a UE4 FString back telling you 
		what the current class is where you called this macro!
 
	Ex:
		This macro prints the class and line along with the message of your choosing!
		VSCREENMSG("Have fun today!");
	<3  Rama
\*/
#pragma once
 
//Current Class Name + Function Name where this is called!
#define JOYSTR\_CUR\_CLASS\_FUNC (FString(\_\_FUNCTION\_\_))
 
//Current Class where this is called!
#define JOYSTR\_CUR\_CLASS (FString(\_\_FUNCTION\_\_).Left(FString(\_\_FUNCTION\_\_).Find(TEXT(":"))) )
 
//Current Function Name where this is called!
#define JOYSTR\_CUR\_FUNC (FString(\_\_FUNCTION\_\_).Right(FString(\_\_FUNCTION\_\_).Len() - FString(\_\_FUNCTION\_\_).Find(TEXT("::")) - 2 ))
 
//Current Line Number in the code where this is called!
#define JOYSTR\_CUR\_LINE  (FString::FromInt(\_\_LINE\_\_))
 
//Current Class and Line Number where this is called!
#define JOYSTR\_CUR\_CLASS\_LINE (JOYSTR\_CUR\_CLASS + "(" + JOYSTR\_CUR\_LINE + ")")
 
//Current Function Signature where this is called!
#define JOYSTR\_CUR\_FUNCSIG (FString(\_\_FUNCSIG\_\_))
 
 
//Victory Screen Message
// 	Gives you the Class name and exact line number where you print a message to yourself!
#define VSCREENMSG(Param1) (GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, \*(JOYSTR\_CUR\_CLASS\_LINE + ": " + Param1)) )
 
#define VSCREENMSG2(Param1,Param2) (GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, \*(JOYSTR\_CUR\_CLASS\_LINE + ": " + Param1 + " " + Param2)) )
 
#define VSCREENMSGF(Param1,Param2) (GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, \*(JOYSTR\_CUR\_CLASS\_LINE + ": " + Param1 + " " + FString::SanitizeFloat(Param2))) )
 
//UE LOG!
#define V\_LOG(LogCat, Param1) 		UE\_LOG(LogCat,Warning,TEXT("%s: %s"), \*JOYSTR\_CUR\_CLASS\_LINE, \*FString(Param1))
 
#define V\_LOG2(LogCat, Param1,Param2) 	UE\_LOG(LogCat,Warning,TEXT("%s: %s %s"), \*JOYSTR\_CUR\_CLASS\_LINE, \*FString(Param1),\*FString(Param2))
 
#define V\_LOGF(LogCat, Param1,Param2) 	UE\_LOG(LogCat,Warning,TEXT("%s: %s %f"), \*JOYSTR\_CUR\_CLASS\_LINE, \*FString(Param1),Param2)
 
#define V\_LOGM(LogCat, FormatString , ...) UE\_LOG(LogCat,Warning,TEXT("%s: %s"), 	\*JOYSTR\_CUR\_CLASS\_LINE, \*FString::Printf(TEXT(FormatString), ##\_\_VA\_ARGS\_\_ ) )

V\_LOG
------

Each of the V\_LOG Macros takes as the first parameter the log category that you want to use!

#define V\_LOG(LogCat, Param1)   UE\_LOG(LogCat,Warning,TEXT("%s: %s"), \*JOYSTR\_CUR\_CLASS\_LINE, \*FString(Param1))

### V\_LOGM

V\_LOGM is special in that you can have an arbitrary number of vars that you output, and of any type, similar to standard UE\_LOG functionality!

Example usage:

int32 Health \= 100;
float ArmorPct \= 52.33;
FVector Location(33,12,1);
 
V\_LOGM(Joy, "Health: %d, ArmorPct: %f, Loc: %s",  Health, ArmorPct, \*Location.ToString());

More Info
---------

[VS C++ Predifined Macros](https://msdn.microsoft.com/library/b0084kay.aspx)

[Variadic Macros](https://gcc.gnu.org/onlinedocs/cpp/Variadic-Macros.html)

Summary
-------

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Logs,\_Printing\_the\_Class\_Name,\_Function\_Name,\_Line\_Number\_of\_your\_Calling\_Code!&oldid=11851](https://wiki.unrealengine.com/index.php?title=Logs,_Printing_the_Class_Name,_Function_Name,_Line_Number_of_your_Calling_Code!&oldid=11851)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)