 Linking Static Libraries Using The Build System - Epic Wiki             

 

Linking Static Libraries Using The Build System
===============================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Scope & Notes](#Scope_.26_Notes)
*   [2 Visual Studio 2013/2015 - Library Configuration](#Visual_Studio_2013.2F2015_-_Library_Configuration)
    *   [2.1 Creating the project](#Creating_the_project)
    *   [2.2 Updating another Project](#Updating_another_Project)
    *   [2.3 Customizations for Targeting UE4 Modules](#Customizations_for_Targeting_UE4_Modules)
        *   [2.3.1 Targeting 64 bit platforms](#Targeting_64_bit_platforms)
        *   [2.3.2 Multi Threaded DLL](#Multi_Threaded_DLL)
    *   [2.4 Third Party Directory](#Third_Party_Directory)
*   [3 UE4 - Build System](#UE4_-_Build_System)
    *   [3.1 Extending the Base ModuleRules class](#Extending_the_Base_ModuleRules_class)
    *   [3.2 Loading Our Libraries](#Loading_Our_Libraries)
*   [4 Visual Studio 2013/2015 - Linking Our Library](#Visual_Studio_2013.2F2015_-_Linking_Our_Library)
    *   [4.1 Startup Module](#Startup_Module)
    *   [4.2 Marshalling](#Marshalling)
*   [5 More Information](#More_Information)

Overview
========

The goal of this tutorial is to show you how to link a _static library_ into UE4 using the **Build System**. This is primarily targeted at developers that are not intending to make engine level modification, but still want to extend the capabilities of UE4 with a library that provides such capabilities.

For examples sake, I will be creating a library called **BobsMagic** and linking into a UE4 project called **UE4Magic**.

Scope & Notes
-------------

*   You will be able to link in a library of your own design by the end
*   I will not go too deeply into exposing functions or defining any API
*   I expect you to have, at the very least, a more than cursory level of knowledge about C++, C# and MS Visual Studio 2013
*   All Code paths provided are from the UE4 Project's base directory.

Visual Studio 2013/2015 - Library Configuration
===============================================

_It is important that you compile out your static libraries with the same version of MS Visual Studio as you are using to work with UE4. This is because each edition of Visual Studio comes with a different compiler, leading to incompatibilities in the binaries. Rest assured if you cross into this realm you will get a warning when you attempt to compile the library in._

Creating the project
--------------------

Please go to the [MSDN](http://msdn.microsoft.com/en-us/library/ms235627.aspx#BKMK_CreateLibProject) and follow the steps there in order to create a new Static library. Once you have finished, please return, as we have to make a couple of modifications to be able to get things working.

Updating another Project
------------------------

When you open up a project with Project or solution files targeted at an earlier edition of Visual Studio you are asked to upgrade. Allowing this to proceed will address the point at the beginning of this section. If you missed that dialog, or by chance it was not shown to you, it is possible to upgrade by going to the menu bar Project > Update VC++ project when it is selected in your solution explorer.

Customizations for Targeting UE4 Modules
----------------------------------------

We will need to make a few other modifications to ensure that our libraries are able to be linked in easily.

### Targeting 64 bit platforms

With a standard Static Library project we will be targeting x86 (32 bit) machines, which wont work for the UE4 toolset.

1.  Open the Project Properties page.
2.  Choose Configuration Manager
3.  Open the **Active Solution Platform** drop down list and select **<New...>**
4.  Type in or select **x64** if it is there
5.  Save it by clicking OK

You should be able to close out your project at this point. You should see it in the drop down at the top of Visual Studio.

[More Info on targeting x64](http://msdn.microsoft.com/en-us/library/h2k70f3s.aspx)

### Multi Threaded DLL

The unreal build system expects you to be providing a static library that is then linked into a DLL, so we have to ensure that our project does this as well.

1.  Open the Project Properties Page
2.  Filter through to Configuration Properties > C/C++ > Code Generation > Runtime Library
3.  From the drop down list select Multi-threaded DLL (/MD)
4.  Save it by clicking OK

Third Party Directory
---------------------

[![](https://d3ar1piqh1oeli.cloudfront.net/3/3e/UnrealDLL_Builds.jpg/200px-UnrealDLL_Builds.jpg)](/index.php?title=File:UnrealDLL_Builds.jpg)

sample directory layout

Build your project and note the location that the libraries are output to. Your lib file(s) should be in /bin/Debug or /bin/Release depending on the mode you built your project with, unless you changed them before hand. We will be moving them from here into our UE4 project directory, for ease of reference and later packaging.

Open up a new explorer window and navigate to your Project directory. Once there, create a new path for your library - **/ThirdParty/BobsMagic**

You will want to follow this step for each library you wish to reference, if I were to be adding in the V8 library I would create /ThirdParty/V8

Within this directory we will be adding two new folders - Libraries and Includes - to house their respective files. Includes are the header files that come with your library, used to define the API (Application Programming Interface) for you to reference in UE4. You should copy your \*.lib file(s) into the Libraries directory.

**Note**: This is an arbitrary directory. It is only important to note its path so you can reference it in the build system later.

UE4 - Build System
==================

Now we are going to step into the UnrealEngine and actually address the binding of our library to the engine.

The build system requires some C# code, but you shouldn't fret. Our example is going to be pretty simple and so you should be alright to copy and paste the majority of the following code.

### Extending the Base ModuleRules class

For anyone doing this as more than a one off you can, and probably should, add in a couple of properties to the ModuleRules class. The two I will be noting here are convenience properties to ensure that we always know where our Module and ThirdParty directories are. These two properties will leverage the System.IO namespace, to utilize a couple of the Path static methods.

inside **/Source/UE4Magic/UE4Magic.Build.cs** <syntaxhighlight lang="csharp"> using System.IO; using UnrealBuildTool;

public class UE4Magic : ModuleRules {

   private string ModulePath
   {
       get { return ModuleDirectory; }
   }

   private string ThirdPartyPath
   {
       get { return Path.GetFullPath( Path.Combine( ModulePath, "../../ThirdParty/" ) ); }
   }

   \[Constructor\]

} </syntaxhighlight>

### Loading Our Libraries

Next we will dive into our modules constructor, where we will create a new method to be called to configure the build system to load our libraries.

inside **/Source/UE4Magic/UE4Magic.Build.cs** <syntaxhighlight lang="csharp"> public class UE4Magic : ModuleRules {

   \[Convenience Properties\]

   public UE4Magic(TargetInfo Target)
   {
       \[Standard Module Initialization\]

       LoadBobsMagic(Target);
   }

} </syntaxhighlight>

LoadBobsMagic accepts a TargetInfo object, which holds a number of configuration elements for the build system, allowing you to customize the build at compilation time. It is passed in to allow us to load in the libs for windows targeting, and can be used later to target other platforms. It also allows you to see if 64 or 32 bit platforms are being targeted, which is gold for our circumstances. If you remember, above I mentioned that we will be targeting x64 machines, but you can use this opportunity to compile out 32bit (x86) libraries as well.

Next we will define a constant to be passed in with the name of the library to link.

inside **/Source/UE4Magic/UE4Magic.Build.cs** <syntaxhighlight lang="csharp"> public class UE4Magic : ModuleRules {

   \[Convenience Properties\]

   \[Constructor\]

   public bool LoadBobsMagic(TargetInfo Target)
   {
       bool isLibrarySupported = false;

       if ((Target.Platform == UnrealTargetPlatform.Win64) || (Target.Platform == UnrealTargetPlatform.Win32))
       {
           isLibrarySupported = true;

           string PlatformString = (Target.Platform == UnrealTargetPlatform.Win64) ? "x64" : "x86";
           string LibrariesPath = Path.Combine(ThirdPartyPath, "BobsMagic", "Libraries");

           /\*
           test your path with:
           using System; // Console.WriteLine("");
           Console.WriteLine("... LibrariesPath -> " + LibrariesPath);
           \*/

           PublicAdditionalLibraries.Add(Path.Combine(LibrariesPath, "BobsMagic." + PlatformString + ".lib")); 
       }

       if (isLibrarySupported)
       {
           // Include path
           PublicIncludePaths.Add( Path.Combine( ThirdPartyPath, "BobsMagic", "Includes" ) );
       }

       Definitions.Add(string.Format( "WITH\_BOBS\_MAGIC\_BINDING={0}", isLibrarySupported ? 1 : 0 ) );

       return isLibrarySupported;
   }

} </syntaxhighlight>

This is an exceptionally straight forward setup, and not likely to be representative of a fully cross platform build. What we have done is to create the constant WITH\_BOBS\_MAGIC\_BINDING to be passed in at compile time, it is set to 1 (or true).

Visual Studio 2013/2015 - Linking Our Library
=============================================

All of the UE4 goodies are taken care of at this point. You can now include your header files and start executing code.

Startup Module
--------------

A little known detail of working with unreal is that you can overwrite the default game implementation and get access to a method executed when your module is started/shutdown, similar to loaded/unloaded. This is not exactly build system related but a common thing that plugin deveopers are likely to be looking for is an initialization point.

inside **/Source/UE4Magic/UE4Magic.cpp** <syntaxhighlight lang="cpp"> \[Header Comment\]

1.  include "Welcome/to/bobsmagic.h"

\[Standard Includes\]

class FUE4MagicGameModule : public FDefaultGameModuleImpl {

   BobsMagic::MagicalBob \*PointerToBobsMagic;
   
   /\*\*
   \* Called right after the module DLL has been loaded and the module object has been created
   \*/
   virtual void StartupModule() override
   {
       PointerToBobsMagic = new BobsMagic::MagicalBob();

       PointerToBobsMagic->ThankEveryoneForReading();
   }

   /\*\*
   \* Called before the module is unloaded, right before the module object is destroyed.
   \*/
   virtual void ShutdownModule()
   {
       PointerToBobsMagic->Dispose();
       PointerToBobsMagic = NULL;
   }

};

// Override the default implementation with ours implementation =) IMPLEMENT\_PRIMARY\_GAME\_MODULE(FUE4MagicGameModule, UE4Magic, "UE4Magic"); </syntaxhighlight>

You can start the Visual Studio Debugger at this point and step through your code, even into the library you compiled, if you linked to a debug build. It will load in the header file from ThirdParty/BobsMagic/Includes/Welcome/to and allow the Libraries to execute as we all expect.

Marshalling
-----------

As you will likely find out quickly, your Library wont be using the same types as in UE4. It is important that you marshall your data between these two in a meaningful and well thought out way. Changing it later may lead to complications.

When binding V8 into UE4 I uncovered a couple of macros in **StringConv.h** that are used in converting between, Wide Character, Unicode, Strings and C style Character Strings and I recommend you look around for other useful conversions. You may also end up having to create Wrapper objects.

More Information
================

I have successfully linked V8 into UE4 and am authoring a module allowing you to use JavaScript as a scripting language to use in your own projects. You can follow development on the [forums](https://forums.unrealengine.com/showthread.php?254-Linking-V8-(JavaScript)-to-UE4).

If you are interested in doing something similar I would recommend you look at the [V8 Embedders Guide](https://developers.google.com/v8/embed) or the source for [Node.js](https://github.com/joyent/node).

You can read more about me on my [User Page](/index.php?title=User:Bob_Gneu "User:Bob Gneu")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Linking\_Static\_Libraries\_Using\_The\_Build\_System&oldid=73](https://wiki.unrealengine.com/index.php?title=Linking_Static_Libraries_Using_The_Build_System&oldid=73)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")