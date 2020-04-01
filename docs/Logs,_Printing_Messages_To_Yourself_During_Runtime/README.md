 Logs, Printing Messages To Yourself During Runtime - Epic Wiki             

 

Logs, Printing Messages To Yourself During Runtime
==================================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Accessing Logs](#Accessing_Logs)
    *   [2.1 In-Game](#In-Game)
    *   [2.2 Within Editor (Play-In-Editor)](#Within_Editor_.28Play-In-Editor.29)
*   [3 Quick Usage](#Quick_Usage)
*   [4 Log Verbosity Levels](#Log_Verbosity_Levels)
*   [5 Setting Up Your Own Log Category](#Setting_Up_Your_Own_Log_Category)
    *   [5.1 Log Category Macros](#Log_Category_Macros)
    *   [5.2 Usage Example](#Usage_Example)
        *   [5.2.1 MyGame.H](#MyGame.H)
        *   [5.2.2 MyGame.CPP](#MyGame.CPP)
        *   [5.2.3 MyClass.CPP](#MyClass.CPP)
*   [6 Log Formatting](#Log_Formatting)
    *   [6.1 Log Message](#Log_Message)
    *   [6.2 Log an FString](#Log_an_FString)
    *   [6.3 Log an Bool](#Log_an_Bool)
    *   [6.4 Log an Int](#Log_an_Int)
    *   [6.5 Log a Float](#Log_a_Float)
    *   [6.6 Log an FVector](#Log_an_FVector)
    *   [6.7 Log an FName](#Log_an_FName)
    *   [6.8 Log an FString,Int,Float](#Log_an_FString.2CInt.2CFloat)
*   [7 Log Coloring](#Log_Coloring)
    *   [7.1 Log: Grey](#Log:_Grey)
    *   [7.2 Warning: Yellow](#Warning:_Yellow)
    *   [7.3 Error: Red](#Error:_Red)
    *   [7.4 Fatal: Crash for Advanced Runtime Protection](#Fatal:_Crash_for_Advanced_Runtime_Protection)
*   [8 Related Tutorial](#Related_Tutorial)
*   [9 Quick tip print](#Quick_tip_print)
*   [10 Other Options for Debugging](#Other_Options_for_Debugging)
    *   [10.1 Logging message to the screen](#Logging_message_to_the_screen)
    *   [10.2 Logging message to the ~ Client Console](#Logging_message_to_the_.7E_Client_Console)
*   [11 Log conventions (in the console, ini files, or environment variables)](#Log_conventions_.28in_the_console.2C_ini_files.2C_or_environment_variables.29)
*   [12 Log console command usage](#Log_console_command_usage)
*   [13 Log command line](#Log_command_line)
*   [14 Environment variables](#Environment_variables)
*   [15 Config file](#Config_file)
*   [16 Printing the Class Name, Line Number, and Function Name Automatically](#Printing_the_Class_Name.2C_Line_Number.2C_and_Function_Name_Automatically)

Overview
--------

_Original Author:_ [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Dear Community,

Logs are essential for giving yourself feedback as to whether

*   Your new functions are even being called
*   What data your algorithm is using during runtime
*   Reporting errors to yourself and the end user / debugging team
*   Imposing a fatal error to stop runtime execution in special circumstances

This page describes how to use the **Unreal output log**.

Other options are also discussed at the bottom of the page.

Accessing Logs
--------------

### In-Game

To see logs you must run your game with -Log (you must create a shortcut to the Editor executable and add -Log to the end).

or use console command "showlog" in your game.

### Within Editor (Play-In-Editor)

Log messages are sent to the 'Output' log which is accessible via Window -> Developer Tools -> Output Log.

If you are using the Editor and PIE, logging should be enabled by default due to the presence of "GameCommandLine=-log" in your Engine INI file. If no logging is visible, add the "-Log" command line option as per the instructions for In-Game logging above.

Quick Usage
-----------

UE\_LOG(LogTemp, Warning, TEXT("Your message"));

This way you can log without the need of creating a custom category. Doing so will keep everything clean and sorted though.

Log Verbosity Levels
--------------------

Log verbosity levels are used to more easily control what is being printed, allowing you to keep even the most detailed log statements in your code without having them spam output when you don't want them to. Each log statement declares which log it belongs to and it's verbosity level. Verbosity level is controlled on a per-log basis. Each log's verbosity is controlled by four things: Compile-time verbosity, default verbosity, ini verbosity, and runtime-verbosity.

If a log statement is more verbose than it's log's compile time verbosity it won't even be compiled into the game code. From there the log's level is set to the default verbosity, which can then be overridden in the Engine.ini file, either of those can then be overridden from the command line (the runtime verbosity). Once the game (or editor) is running it may not be possible to change a log category's verbosity (I am not sure, someone who knows please correct this).

Here are the verbosity levels available to use:

*   **Fatal**

Fatal level logs are always printed to console and log files and crashes even if logging is disabled.

*   **Error**

Error level logs are printed to console and log files. These appear red by default.

*   **Warning**

Warning level logs are printed to console and log files. These appear yellow by default.

*   **Display**

Display level logs are printed to console and log files.

*   **Log**

Log level logs are printed to log files but not to the in-game console. They can still be viewed in editor as they appear via the Output Log window.

*   **Verbose**

Verbose level logs are printed to log files but not the in-game console. This is usually used for detailed logging and debugging.

*   **VeryVerbose**

VeryVerbose level logs are printed to log files but not the in-game console. This is usually used for very detailed logging that would otherwise spam output.

For the CompileTimeVerbosity parameter of DECLARE\_LOG\_CATEGORY\_EXTERN it is also valid to use **All** (functionally the same as using VeryVerbose) or **NoLogging** (functionally the same as using Fatal).

Setting Up Your Own Log Category
--------------------------------

### Log Category Macros

The macros DECLARE\_LOG\_CATEGORY\_EXTERN and DEFINE\_LOG\_CATEGORY go in YourGame.h and YourGame.cpp respectively.

The macro to declare a log category has three parameters. Each declared log category should have a corresponding defined log category in a cpp.

DECLARE\_LOG\_CATEGORY\_EXTERN(CategoryName, DefaultVerbosity, CompileTimeVerbosity);

**CategoryName** is simply the name for the new category you are defining.

**DefaultVerbosity** is the verbosity level used when one is not specified in the ini files or on the command line. Anything more verbose than this will not be logged.

**CompileTimeVerbosity** is the maximum verbosity to compile in the code. Anything more verbose than this will not be compiled.

The macro to define a log category takes only the name of the category.

DEFINE\_LOG\_CATEGORY(CategoryName);

  
[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

  
[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

### Usage Example

You can have different log categories for different aspects of your game!

This gives you additional info, because UE\_LOG prints out which log category is displaying a message.

Here is an example of where the different log levels start to become useful.

Say you're often having trouble with a certain system in your game. In debugging you might want very detailed logs, but when you've finished debugging for now you know you might need those detailed logs later on, but they're spamming the output. What do you do? Use different log levels.

#### MyGame.H

//General Log
DECLARE\_LOG\_CATEGORY\_EXTERN(LogMyGame, Log, All);

//Logging during game startup
DECLARE\_LOG\_CATEGORY\_EXTERN(LogMyGameInit, Log, All);

//Logging for your AI system
DECLARE\_LOG\_CATEGORY\_EXTERN(LogMyGameAI, Log, All);

//Logging for a that troublesome system
DECLARE\_LOG\_CATEGORY\_EXTERN(LogMyGameSomeSystem, Log, All);

//Logging for Critical Errors that must always be addressed
DECLARE\_LOG\_CATEGORY\_EXTERN(LogMyGameCriticalErrors, Log, All);

#### MyGame.CPP

#include "MyGame.h"

//General Log
DEFINE\_LOG\_CATEGORY(LogMyGame);

//Logging during game startup
DEFINE\_LOG\_CATEGORY(LogMyGameInit);

//Logging for your AI system
DEFINE\_LOG\_CATEGORY(LogMyGameAI);

//Logging for some system
DEFINE\_LOG\_CATEGORY(LogMyGameSomeSystem);

//Logging for Critical Errors that must always be addressed
DEFINE\_LOG\_CATEGORY(LogMyGameCriticalErrors);

#### MyClass.CPP

//...
void UMyClass::FireWeapon()
{
	UE\_LOG(LogMyGameSomeSystem, Verbose, TEXT("UMyClass %s entering FireWeapon()"), \*GetNameSafe(this));
	//Logic
	UE\_LOG(LogMyGameSomeSystem, Verbose, TEXT("UMyClass %s Attempting to fire."), \*GetNameSafe(this));
	if (CheckSomething())
	{
		UE\_LOG(LogMyGameSomeSystem, Log, TEXT("UMyClass %s is firing their weapon with charge of %f"), \*GetNameSafe(this), GetCharge());
		//Firing logic
	}
	else
	{
		UE\_LOG(LogMyGameSomeSystem, Error, TEXT("UMyClass %s CheckSomething() returned false during FireWeapon(), this is bad!"), \*GetNameSafe(this));
		//Fail with grace
	}
	//More code!
	UE\_LOG(LogMyGameSomeSystem, Verbose, TEXT("UMyClass %s leaving FireWeapon()"), \*GetNameSafe(this));
}

void UMyClass::Tick(float DeltaTime)
{
	UE\_LOG(LogMyGameSomeSystem, VeryVerbose, TEXT("UMyClass %s's charge is %f"), \*GetNameSafe(this), GetCharge());
	if (something)
	{
		UE\_LOG(LogMyGameSomeSystem, VeryVerbose, TEXT("Idk"));
	}
	if (somethingelse)
	{
		UE\_LOG(LogMyGameSomeSystem, VeryVerbose, TEXT("Stuff"));
	}
}
//...

When you're not working on this system all these log statements would absolutely flood your output, and even when you are working on it you might not want the level of detail that is putting out multiple logs per tick.

By using log levels you can simply change the verbosity in the category's declaration, in the ini files, or on the command line to hide/reveal different layers of log statements as you need them. Ex:

//All log statements are shown.
DECLARE\_LOG\_CATEGORY\_EXTERN(LogMyGameSomeSystem, Log, All);

//VeryVerbose statements won't be shown.
DECLARE\_LOG\_CATEGORY\_EXTERN(LogMyGameSomeSystem, Verbose, All);

//Neither VeryVerbose nor Verbose statements will be shown.
DECLARE\_LOG\_CATEGORY\_EXTERN(LogMyGameSomeSystem, VeryVerbose, All);

The log categories used by Unreal Engine use different log levels, but defaultly have a higher CompileTimeVerbosity. In debugging interaction with Unreal code it might be helpful to turn up the verbosity of Unreal code in DefaultEngine.ini under \[Core.Log\] by adding an entry like LogOnline=Verbose.

Log Formatting
--------------

### Log Message

//"This is a message to yourself during runtime!"
UE\_LOG(YourLog,Warning,TEXT("This is a message to yourself during runtime!"));

### Log an FString

 **%s strings are wanted as TCHAR\* by Log, so use \*FString()**

//"MyCharacter's Name is %s"
UE\_LOG(YourLog,Warning,TEXT("MyCharacter's Name is %s"), \*MyCharacter\->GetName() );

### Log an Bool

//"MyCharacter's Bool is %s"
UE\_LOG(YourLog,Warning,TEXT("MyCharacter's Bool is %s"), (MyCharacter\->MyBool ? TEXT("True") : TEXT("False")));

### Log an Int

//"MyCharacter's Health is %d"
UE\_LOG(YourLog,Warning,TEXT("MyCharacter's Health is %d"), MyCharacter\->Health );

### Log a Float

//"MyCharacter's Health is %f"
UE\_LOG(YourLog,Warning,TEXT("MyCharacter's Health is %f"), MyCharacter\->Health );

### Log an FVector

//"MyCharacter's Location is %s"
UE\_LOG(YourLog,Warning,TEXT("MyCharacter's Location is %s"), 
    \*MyCharacter\->GetActorLocation().ToString());

### Log an FName

//"MyCharacter's FName is %s"
UE\_LOG(YourLog,Warning,TEXT("MyCharacter's FName is %s"), 
    \*MyCharacter\->GetFName().ToString());

### Log an FString,Int,Float

//"%s has health %d, which is %f percent of total health"
UE\_LOG(YourLog,Warning,TEXT("%s has health %d, which is %f percent of total health"),
    \*MyCharacter\->GetName(), MyCharacter\->Health, MyCharacter\->HealthPercent);

Log Coloring
------------

### Log: Grey

//"this is Grey Text"
UE\_LOG(YourLog,Log,TEXT("This is grey text!"));

### Warning: Yellow

//"this is Yellow Text"
UE\_LOG(YourLog,Warning,TEXT("This is yellow text!"));

### Error: Red

//"This is Red Text"
UE\_LOG(YourLog,Error,TEXT("This is red text!"));

### Fatal: Crash for Advanced Runtime Protection

You can throw a fatal error yourself if you want to make sure that certain code never runs.

I have used this myself to help protect against algorithm cases that I wanted to make sure never occurred again.

It's actually really useful!

But it does look like a crash, and so if you use this, dont be worried, just look at the crash call stack :)

 Again this is an advanced case that crashes the program, use only for extremely important circumstances.
 

//some complicated algorithm
if(some fringe case that you want to tell yourself if the runtime execution ever reaches this point)
{
	//"This fringe case was reached! Debug this!"
	UE\_LOG(YourLog,Fatal,TEXT("This fringe case was reached! Debug this!"));
}

Related Tutorial
----------------

[Custom Log Coloring & NetMode](/index.php?title=Log_Macro_with_Netmode_and_Colour "Log Macro with Netmode and Colour")

  

Quick tip print
---------------

This a trick for easy print debug, you can use this MACRO at the begin of your cpp

#define print(text) if (GEngine) GEngine->AddOnScreenDebugMessage(-1, 1.5, FColor::White,text)

then you can use a regular lovely print(); inside to all.

To prevent your screen from being flooded, you can change the first parameter, key, to a positive number. Any message printed with that key will remove any other messages on screen with the same key. This is great for things you want to log frequently.

Other Options for Debugging
---------------------------

### Logging message to the screen

For the times when you want to just display the message on the screen, you can also do:

 #include <EngineGlobals.h>
 #include <Runtime/Engine/Classes/Engine/Engine.h>
 // ...
 GEngine\->AddOnScreenDebugMessage(\-1, 5.f, FColor::Red, TEXT("This is an on screen message!"));
 GEngine\->AddOnScreenDebugMessage(\-1, 5.f, FColor::Red, FString::Printf(TEXT("Some variable values: x: %f, y: %f"), x, y));

To prevent your screen from being flooded, you can change the first parameter, key, to a positive number. Any message printed with that key will remove any other messages on screen with the same key. This is great for things you want to log frequently.

### Logging message to the ~ Client Console

Pressing the ~ key in Unreal brings up the client console.

If you use the PlayerController class you can print a message to this console, which has the advantage of being a completely different logging space which does not require tabbing out of the game to view easily

 PC->ClientMessage("Your Message");

Answerhub post on using ClientMessage:

[https://answers.unrealengine.com/questions/81662/vshow-function.html](https://answers.unrealengine.com/questions/81662/vshow-function.html)

Forum Post

It is also possible to \[[messages to the client console](https://forums.unrealengine.com/showthread.php?33367-Log-to-Console%7Csend)\].

Log conventions (in the console, ini files, or environment variables)
---------------------------------------------------------------------

*   \[cat\] = a category for the command to operate on, or 'global' for all categories.
*   \[level\] = verbosity level, one of: none, error, warning, display, log, verbose, all, default

At boot time, compiled in default is overridden by ini files setting, which is overridden by command line

Log console command usage
-------------------------

*   Log list - list all log categories
*   Log list \[string\] - list all log categories containing a substring
*   Log reset - reset all log categories to their boot-time default
*   Log \[cat\] - toggle the display of the category \[cat\]
*   Log \[cat\] off - disable display of the category \[cat\]
*   Log \[cat\] on - resume display of the category \[cat\]
*   Log \[cat\] \[level\] - set the verbosity level of the category \[cat\]
*   Log \[cat\] break - toggle the debug break on display of the category \[cat\]

Log command line
----------------

\-LogCmds=\\"\[arguments\],\[arguments\]...\\"           - applies a list of console commands at boot time
-LogCmds=\\"foo verbose, bar off\\"         - turns on the foo category and turns off the bar category

Environment variables
---------------------

Any command line option can be set via the environment variable **UE-CmdLineArgs**

set UE-CmdLineArgs=\\"-LogCmds=foo verbose breakon, bar off\\"

Config file
-----------

In DefaultEngine.ini or Engine.ini:

\[Core.Log\]
global=\[default verbosity for things not listed later\]
\[cat\]=\[level\]
foo=verbose break

Printing the Class Name, Line Number, and Function Name Automatically
---------------------------------------------------------------------

To automatically print the Class Name, Function Name, and Line number, see my other wiki!

**[Logs,\_Printing\_the\_Class\_Name,\_Function\_Name,\_Line\_Number\_of\_your\_Calling\_Code!](/index.php?title=Logs,_Printing_the_Class_Name,_Function_Name,_Line_Number_of_your_Calling_Code! "Logs, Printing the Class Name, Function Name, Line Number of your Calling Code!")**

This lets you easily debug code during runtime because you are told what class and what line number is associated with the message you are printing to yourself!

♥ -Rama

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Logs,\_Printing\_Messages\_To\_Yourself\_During\_Runtime&oldid=13](https://wiki.unrealengine.com/index.php?title=Logs,_Printing_Messages_To_Yourself_During_Runtime&oldid=13)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")