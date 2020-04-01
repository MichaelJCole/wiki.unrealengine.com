 Integrating Lua - Epic Wiki             

 

Integrating Lua
===============

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Requirements](#Requirements)
*   [3 Starting off: code in our project](#Starting_off:_code_in_our_project)
*   [4 Aquiring](#Aquiring)
*   [5 Copying the files](#Copying_the_files)
*   [6 Linking](#Linking)
*   [7 First steps](#First_steps)
*   [8 Why -1? Why luaL\_dostring()? Why this? Why that?](#Why_-1.3F_Why_luaL_dostring.28.29.3F_Why_this.3F_Why_that.3F)
*   [9 Conclusion](#Conclusion)

Overview
--------

Welcome to my third wiki page about the awesome game engine - Unreal! This article covers the question which people asked me a few times right now, and I think this could be useful for gameplay programming, and a great grade of mod-abilty: Integrating Lua. Lua itself is a programming language which is relatively easy to learn and to use, and with no big deal you can create gameplay scripts, and much more. In contrast to other programming languages, such as C/C++, Lua doesn't require compiling, which makes the workflow of developing really fast: Changing a bit in Lua code => reloading Lua scripts in the engine => Using the new code in the game. In languages like C++, we would need to compile the game first before we can use the new code, which takes longer than reloading script files.

Requirements
------------

To get Lua in our UE4 project, we don't need that much, and to be honest, also the work we need to afford to get Lua working is kept at a minimum here. To use Lua, we need a **C++ code in our project** (and therefore, a installation of Visual Studio on your computer). No matter if you started of with a blueprint or a C++ project, we are still on the right track! Also, **intermediate C++ knowledge** will help here, because we will dig down into the Lua C API, with it's pointers, variable types, converters, and more like that. Last stop is Lua itself. To use it, we need **binaries and headers**. The headers are defining functions we can find in the binaries, so the compiler knows what we are talking about. Let's get started!

Starting off: code in our project
---------------------------------

If you already have a C++ project, you can skip this step. If not, we need to add code to the project so Unreal generates Visual Studio project files and build files. To do that, open up the editor of your project, go to **File** and choose **New C++ class**. In the dialog we need to select the class we want to inherit our new piece of code from. Since we want to run Lua code from blueprints in this example, we choose **Blueprint Function Library**. Click on Next, and enter the name for our new class (in this example I chose LuaBlueprints). Make sure the little **Public** button is selected, and then click on **Create Class**. This should add the code to your project, compile it, and Visual Studio should open, and show the new class (one header and one source) files you created with the wizard.

Aquiring
--------

Now, we need to include Lua into the project, so it gets compiled with our project and is included in the final game. But first, we need to grab ourselves the Lua binaries. There are projects out there which supply you with precompiled binaries, or you can build your own! Because that takes time, and is rather nessecary, we'll take the precompiled version. [LuaBinaries](https://sourceforge.net/projects/luabinaries/files/) is a great project, which is always up-to-date and has the binaries for every platform out there (we will just mess with Windows in this article). Choose the newest version, then **Windows Libraries**, then **Static** since we will "embed" Lua inside our game's executable, and then search the package for your needs. [Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)") After we downloaded the packages, we should find the following structure inside:

*   include/ (essential includes for working with Lua)
    *   lauxlib.h
    *   lua.h
    *   lua.hpp
    *   luaconf.h
    *   lualib.h
*   luaXX.lib (where XX is the current lua version (e.g. Lua 5.3.3 is lua53.lib))

Now, that we have the binaries and the includes, we can go ahead to integrating them!

Copying the files
-----------------

Linking Lua in Unreal is easy. First off, we need to create a new folder in our project directory where we can put the Lua stuff inside. I personally prefer creating a new folder in the project's home (where your .uproject lives) and naming it "ThirdParty". Then it this folder, I created a folder called "Lua", and that splits up in "includes" and "libraries". Overview of the structure

*   Project Home/
    *   ThirdParty/
        *   Lua/
            *   includes/ (we only need to copy them once, since they don't differ from the architecture | note the 's' in the end)
            *   libraries/
                *   luaXX.x64.lib (this is the library file you downloaded in the Win64 package, renamed for seperation)
                *   luaXX.x86.lib (this is the library file you downloaded in the Win32 package, renamed for seperation)

Linking
-------

In Visual Studio, open up the **YourProjectName.Build.cs** located in the Source/YourProjectName/ folder. By default, this file only links default engine modules. To link Lua against this, we need to add some code to it. Since this would be too much to go over every detail, I just show you what I did in my Build.cs: <syntaxhighlight lang=csharp> using System.IO; using UnrealBuildTool;

public class ProjectName : ModuleRules { private string ThirdPartyPath { get { return Path.GetFullPath(Path.Combine(ModuleDirectory, "../../ThirdParty/")); } }

public ProjectName(TargetInfo Target) { PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore" });

PrivateDependencyModuleNames.AddRange(new string\[\] { });

// Uncomment if you are using Slate UI

               // PrivateDependencyModuleNames.AddRange(new string\[\] { "Slate", "SlateCore" });

               // Uncomment if you are using online features
               // PrivateDependencyModuleNames.Add("OnlineSubsystem");

               // To include OnlineSubsystemSteam, add it to the plugins section in your uproject file with the Enabled attribute set to true

               LoadLua(TargetRules); // This functions loads Lua

}

private bool LoadLua(ReadOnlyTargetRules TargetRules) { bool isLibSupported = false;

// Check if we are on Windows if ((Target.Platform == UnrealTargetPlatform.Win64) || (Target.Platform == UnrealTargetPlatform.Win32)) { isLibSupported = true;

string PlatformString = (Target.Platform == UnrealTargetPlatform.Win64) ? "x64" : "x86"; // This string is either "x64" or "x86" so we can append it on the lib filename string LibrariesPath = Path.Combine(ThirdPartyPath, "Lua", "libraries");

PublicAdditionalLibraries.Add(Path.Combine(LibrariesPath, "lua53." + PlatformString + ".lib"));

PublicIncludePaths.Add(Path.Combine(ThirdPartyPath, "Lua", "includes")); }

Definitions.Add(string.Format("WITH\_LUA\_BINDING={0}", isLibSupported ? 1 : 0));

return isLibSupported; } } </syntaxhighlight> The "LoadLua" method checks if we are on Windows, and if so, we create a string which either contains "x64" or "x86" depending on our architecture we compile for, so we can easily find the lib file. Then we create the libraries path, which is just the LibraryPath (in this Case "ThirdParty/")/Lua/libraries. From there, we append the platform string to the pre- and the suffix of the filename, so in the end it should be **lua53.xxx.lib**. This path is added to **PublicAdditionalLibraries**, which forces the compiler to use the lib file we put in there. We also add the includes directory to **PublicIncludePaths**, so the compiler finds our includes. Last but not least we add a definition to the compiled game: **WITH\_LUA\_BINDING=x**, where x is either 0 (when Lua is not supported) or 1 (when Lua is supported).

First steps
-----------

Now, that we have integrated the lua binary into our game, let's try it out by right-clicking the project in Visual Studio and choose "Build". It should succeed! Next stop: writing a blueprint node which executes Lua code from a string we feed inside. Open up the header (.h) file of the blueprint function library you created. It is empty and should look like this: <syntaxhighlight lang=cpp>

1.  pragma once

1.  include "Kismet/BlueprintFunctionLibrary.h"
2.  include "LuaBlueprints.generated.h"

/\*\*

\* 
\*/

UCLASS() class YOURPROJECT\_API ULuaBlueprints : public UBlueprintFunctionLibrary { GENERATED\_BODY() }; </syntaxhighlight> First of all, we add the Lua includes on top, so the compiler knows where our functions are declared. To do this, add **#include "lua.hpp"** on top of the other includes. Next, we add a new UFUNCTION to it, which is parsed to a blueprint node with the following declaration: <syntaxhighlight lang=cpp> public: UFUNCTION(BlueprintCallable, Category = "Lua") static void RunLua(const FString& code); </syntaxhighlight> This creates a callable blueprint node, which takes a string (FString) where we can enter Lua code which will be run. Note that this is static, since we don't have any object we want to call this in context, or in other words, we want to call it from everywhere without a target. Let's go into the LuaBlueprints.cpp file, which should be empty (except the includes). We add the definition for our RunLua function: <syntaxhighlight lang=cpp> void ULuaBlueprints::RunLua(const FString& code) { lua\_State\* L = luaL\_newstate(); luaL\_openlibs(L);

int result = luaL\_dostring(L, TCHAR\_TO\_ANSI(\*code)); if (result != 0) { UE\_LOG(LogTemp, Error, TEXT("Lua Script error: %s"), ANSI\_TO\_TCHAR(lua\_tostring(L, -1))); } } </syntaxhighlight> This is fairly easy. It uses the Lua C API to create a new Lua State, which we assign to the variable called L. Then, we open the standard lua libraries (such as math), and then we run the code by doing **luaL\_dostring()**. This takes the lua state L as one argument, and the code to run as the other argument. [Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)") That function returns an integer, which is 0 if everything went fine. If it is not 0, something obviously went wrong. In that case, I print it to the log with UE\_LOG. Notice that we can get the Lua error message with **lua\_tostring(L, -1)**.

Why -1? Why luaL\_dostring()? Why this? Why that?
-------------------------------------------------

The Lua C API is strange sometimes, since it uses a stack based system, which means that values / functions are on a "stack", where the items can be accessed with indices. To get heavy things going with Lua, read through the Lua C API book [here](http://www.lua.org/manual/5.1/manual.html#3)

Conclusion
----------

Congratulations, you read through a lot of text here. Now you should be able to compile it, and call the blueprint node from any graph and run lua code in it! From there, I leave you alone with the big, dangerous world of the Lua C API. If you have questions, feel free to ask me on my [Unreal forums account](https://forums.unrealengine.com/member.php?19899-iUltimateLP). Have a nice day :)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Integrating\_Lua&oldid=457](https://wiki.unrealengine.com/index.php?title=Integrating_Lua&oldid=457)"