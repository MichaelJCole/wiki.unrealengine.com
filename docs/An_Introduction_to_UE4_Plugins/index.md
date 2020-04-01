 An Introduction to UE4 Plugins - Epic Wiki             

 

An Introduction to UE4 Plugins
==============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Scope & Notes](#Scope_.26_Notes)
*   [2 Concepts & Limitations](#Concepts_.26_Limitations)
    *   [2.1 Engine vs. Installed](#Engine_vs._Installed)
*   [3 First Steps](#First_Steps)
    *   [3.1 File Structure](#File_Structure)
*   [4 Content Module](#Content_Module)
    *   [4.1 Archive Manifest](#Archive_Manifest)
*   [5 Stand Alone Plugin](#Stand_Alone_Plugin)
    *   [5.1 File Structure](#File_Structure_2)
    *   [5.2 Archive Manifest](#Archive_Manifest_2)
*   [6 Non-Game Module](#Non-Game_Module)
    *   [6.1 Archive Manifest](#Archive_Manifest_3)
*   [7 Distribution](#Distribution)
    *   [7.1 Sample ReadMe.md](#Sample_ReadMe.md)
*   [8 More Information](#More_Information)

Overview
========

The goal of this tutorial is to show you how to create a new plugin, exercising the basic concepts and giving you a platform on which you can build your own projects out.

For examples sake, I will be creating a bundle called "Bob's Bundle" and it will do little more than expose an interface to call into a protected method that will output to the console.

[Template:Warning](/index.php?title=Template:Warning&action=edit&redlink=1 "Template:Warning (page does not exist)")

  

Scope & Notes
-------------

*   A "Plugin" is the wrong term to use in describing what we are doing. Instead we will refer to it as a bundle from now on. This is discussed in the next section - Concepts and Limitations.
*   You will be able to create a new bundle of your own by the end
*   I expect you to have, at the very least, a more than cursory level of knowledge about C++, and the UE4 Build System
*   All Code paths provided, unless noted otherwise, are from the UE4 Project's base directory.
*   Any time a file is added to the project, you should regenerate your project files.

Concepts & Limitations
======================

The general idea behind a bundle is to wrap up a set of functionality that can be treated as a self contained group, transplanted as needed, adding functionality to UE4. There are three types of bundle:

1.  **Non-Game Module** - Extension or Creation of a set of code that exposes an interface to internal code, allowing other modules and game modules to depend upon its functionality.
2.  **Stand Alone Plugin** - Extension or Creation of a set of code that does not allow exterior modules to modify its contents.
3.  **Content Module** - Contains content that is available to developers in the editor, as well as in the game.

As the designer you are free to include any number of these you wish in your bundle, and in fact - you can include them all in the same bundle. They are simply used as encapsulation tools.

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)") [Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

Engine vs. Installed
--------------------

An engine plugin is one that resides in the Plugin directory of your UE4 install. It will show up as **Built In** when looking at the plugin listing in the editor. An **Installed** plugin is only available or loaded for a particular Project.

To see a list of the plugins that are already available to you (Enabled and Disabled) open the editor and in the menu bar, select **Window** > **Plugins**1. From here you can load or unload any plugins by checking the **Enabled** checkbox.

If you wish to see any of the modules, including your game and plugins, that are available, select **Window** > **Developer Tools** > **Modules**. From here you can load, unload, reload and or recompile any of the modules currently available to the editor.

* * *

1 In recent versions, this menu has been moved to **Edit** > **Plugins**

First Steps
===========

To begin, you will need to create a new project from the UE4 Editor. I recommend a **C++ → Basic code** project, so you are able to exercise the interface of your module, given that you create one. I am exporting a **Basic Code** project called BobsPlayground.

File Structure
--------------

Once Visual Studio (VS) has finished spinning up open up the project path in the windows file explorer. Here, create a new folder - Plugins, which should reside at MyProject/Plugins. In my example it is called BobsPlayground/Plugins.

This is the directory that will house all of our further development, until we return to UE4 to confirm that we have the ability to add a dependency between our project and our plugin.

Content Module
==============

[![](https://d3ar1piqh1oeli.cloudfront.net/f/fc/Plugins-Listing.png/300px-Plugins-Listing.png)](/index.php?title=File:Plugins-Listing.png)

Figure 1. A peek into the plugin UI in the UE4 editor.

Within the Plugins directory, add a new folder - Content. This will house our Content modules assets. Within this directory add a ""Content.uplugin"" file. This will be the [descriptor for our plugin](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html#plugindescriptorfiles), so UE4 can find it, load it up and knows what to do with it.

Here is the sample I am using for my content module. Feel free to copy it. <syntaxhighlight lang="javascript"> {

   "FileVersion" : 3,
   "FriendlyName" : "Bob's Content",
   "Version" : 1,
   "VersionName": "1.0",
   "Description" : "Here I describe the content.",
   "Category" : "Bobs.Content",
   "CreatedBy" : "Bob Chatman",
   "CreatedByURL" : "[http://gneu.org](http://gneu.org)",
   "CanContainContent" : "true"

} </syntaxhighlight>

This provides the plugin system with everything short of an icon to show in the UI View. To add an icon, create a Resources directory within your plugin folder, and create a PNG in there called Icon128.png.

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

You should also be aware of the Category. It provides a way for you to filter your plugins by type, developer or whatever you choose. Each sub category is separated by a period character. Above, Bobs.Content becomes Bobs > Content in the plugin listing in the editor, as shows in Figure 1, above.

[Template:Warning](/index.php?title=Template:Warning&action=edit&redlink=1 "Template:Warning (page does not exist)")

[Template:Warning](/index.php?title=Template:Warning&action=edit&redlink=1 "Template:Warning (page does not exist)")

Archive Manifest
----------------

*   Content/\*
*   Resources/Icon128.png
*   Content.uplugin

Stand Alone Plugin
==================

[![Solution-Explorer - Plugins Generated.png](https://d3ar1piqh1oeli.cloudfront.net/4/4d/Solution-Explorer_-_Plugins_Generated.png/200px-Solution-Explorer_-_Plugins_Generated.png)](/index.php?title=File:Solution-Explorer_-_Plugins_Generated.png)

Although not quite as straight forward as content, the Stand Alone plugin is a hundred times more interesting, technically speaking. These plugins exist for no other purpose than to extend and create new unreal editor classes. A prime example of such a plugin is the [Vertex Snap Editor Extension](/index.php?title=Rama%27s_Vertex_Snap_Editor_Plugin#Core_of_Making_Your_Own_Editor_Mode "Rama's Vertex Snap Editor Plugin") by [Rama](/index.php?title=User:Rama "User:Rama"), which adds the ability for you to vertex snap meshes together, but also details out how his plugin works. Seeing as this is an introduction to plugins, I will only show you how to configure your plugin, what you do with it afterwards is on you =).

File Structure
--------------

We will, once again, add a uplugin plugin descriptor. This time we will make a modification to it though, adding in a modules listing parameter to allow us to configure the plugin and the declare the contexts that we wish for our standalone plugin to be loaded.

Inside **/Plugins/StandAlone/StandAlone.uplugin** <syntaxhighlight lang="javascript"> {

   "FileVersion" : 3,

   "FriendlyName" : "Bob's Plugin",
   "Version" : 1,
   "VersionName": "1.0",
   "Description" : "Here I describe the capabilities of the plugin.",
   "Category" : "Bobs.Stand Alone",
   "CreatedBy" : "Bob Chatman",
   "CreatedByURL" : "[http://gneu.org](http://gneu.org)",

   "Modules" :
   \[
       {
           "Name" : "StandAlone",
           "Type" : "Developer"
       } 
   \]

} </syntaxhighlight>

  
[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

  
The modules section accepts any number of entries, as a JSON array of objects. Name is the name of the module you are creating - this is likely to be same as the folder you put your module into. Type is one of three values, Developer, Runtime or Editor. Editor is loaded at editor load time, Runtime is loaded in all contexts, and Developer is loaded at any time where you are loading a Development build and never for Shipping builds. There is one final optional parameter to include, but it doesn't exactly mean much in a stand alone plugin. We will return to it in the next section.

With the descriptor in place, we can dive into the guts.

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

Create the following path: **/Plugins/StandAlone/Source/StandAlone/**

Within this directory you will begin working on your plugin. You will need a Build.cs file to declare dependencies, include paths or handle linking of an external library.

inside **/Plugins/StandAlone/Source/StandAlone/StandAlone.Build.cs** <syntaxhighlight lang="csharp"> using UnrealBuildTool; using System.IO;

public class StandAlone : ModuleRules {

   public StandAlone(ReadOnlyTargetRules Target) : base(Target)
   {
       PrivateIncludePaths.AddRange(new string\[\] { "StandAlone/Private" });
       PublicIncludePaths.AddRange(new string\[\] { "StandAlone/Public" });

       PublicDependencyModuleNames.AddRange(new string\[\] { "Engine", "Core" });
   }

} </syntaxhighlight>

Yep, at this point everything you see will be very similar to what you have already seen. I try to stick to the standard folder structure for my files, so I am following the coding guidelines that Epic has set out for us. In this directory you will want to create a Classes directory, for your UE4 related header files, and a Private folder to house your plugins implementations. There is no need for a public folder, as there is no public API to your plugin to be providing.

inside **/Plugins/StandAlone/Source/StandAlone/Public/StandAlone.h** <syntaxhighlight lang="cpp">

1.  pragma once

1.  include "ModuleManager.h"

class StandAloneImpl : public IModuleInterface { public: /\*\* IModuleInterface implementation \*/ void StartupModule(); void ShutdownModule(); }; </syntaxhighlight>

inside **/Plugins/StandAlone/Source/StandAlone/Private/StandAlone.cpp** <syntaxhighlight lang="cpp">

1.  include "StandAlonePrivatePCH.h"

1.  include "StandAlone.h"

void StandAloneImpl::StartupModule() { }

void StandAloneImpl::ShutdownModule() { }

IMPLEMENT\_MODULE(StandAloneImpl, Module) </syntaxhighlight>

inside **/Plugins/StandAlone/Source/StandAlone/Private/StandAlonePrivatePCH.cpp** <syntaxhighlight lang="cpp"> </syntaxhighlight>

**StandAlonePrivatePCH.h** is an empty file, currently. It is there for you to stick your own PreCompiled Header references and include them in one lump, as you do with the **MyProject.h** file in your standard game.

The startup and shutdown module methods are available for you to be able to hook in and handle events that come with the loading of and unloading of the modules. This is likely a good place to handle opening or closing of data stores, handles and the like. I use this as the point when my V8 plugin is initialized to ensure that it is available globally.

Archive Manifest
----------------

*   Binaries/Win64/UE4Editor-StandAlone.dll
*   Resources/Icon128.png
*   StandAlone.uplugin

Non-Game Module
===============

And finally, the pièce de résistance, a module exposing functionality. When this type of bundle comes into a party, everyone turns to look. There is one key element of this module, and that is the public facing interface and the importance of the load time. Everything else is as it was with a stand alone plugin. First, lets examine the addition to our plugin descriptor.

Inside **/Plugins/Module/Module.uplugin** <syntaxhighlight lang="javascript"> {

   "FileVersion" : 3,

   "FriendlyName" : "Bob's Module",
   "Version" : 1,
   "VersionName": "1.0",
   "Description" : "Here I describe the capabilities of the module.",
   "Category" : "Bobs.Module",
   "CreatedBy" : "Bob Chatman",
   "CreatedByURL" : "[http://gneu.org](http://gneu.org)",
   "CanContainContent" : "true",

   "Modules" :
   \[
       {
           "Name" : "Module",
           "Type" : "Developer",
           "LoadingPhase" : "PreDefault"
       } 
   \]

} </syntaxhighlight>

The addition of the LoadingPhase allows our module to be loaded prior to the standard load time, which would allow any module that is loaded afterwards to be able to include it as a dependency. Let's look at what options we have for that.

Inside **/Source/BobsPlayground/BobsPlayground.Build.cs** <syntaxhighlight lang="csharp"> using UnrealBuildTool;

public class BobsPlayground : ModuleRules {

   public BobsPlayground(ReadOnlyTargetRules Target) : base(Target)
   {
       PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore"});

       PrivateDependencyModuleNames.AddRange(new string\[\] { "Module" });

       DynamicallyLoadedModuleNames.AddRange(new string\[\] { "StandAlone" });
   }

} </syntaxhighlight>

There are three noteworthy ways to declare a dependency. **Public and Private dependencies are staticly linked into your project and visible to public and or private code, respectively**. Public implies that you may also expose such functionality to whatever tools, editors or plugins are dependent on your game/module. It is also important to keep in mind that with the static linking, the header files are included. Dynamically loaded modules do not include the header files at link time, and instead should be treated as an external dll, loaded when needed. The key difference is that because of the static linking, if the module is missing your code will fail out. _If you are using a dynamic link your code will be able to recover, in the event that the module is not found._

With this, all that remains is exposing our interface and writing a short test to confirm that it works. Create ""Module.Build.cs"", so your build system knows where to find the sources and how to build them:

inside **/Plugins/Module/Source/Module/Module.Build.cs** <syntaxhighlight lang="csharp"> using UnrealBuildTool; using System.IO;

public class Module : ModuleRules {

   public Module(ReadOnlyTargetRules Target) : base(Target)
   {
       PrivateIncludePaths.AddRange(new string\[\] { "Module/Private" });
       PublicIncludePaths.AddRange(new string\[\] { "Module/Public" });

       PublicDependencyModuleNames.AddRange(new string\[\] { "Engine", "Core" });
   }

} </syntaxhighlight>

Now we are able to create the public interface: **/Plugins/Module/Source/Module/Public/IModule.h**

Inside **/Plugins/Module/Source/Module/Public/IModule.h** <syntaxhighlight lang="cpp">

1.  pragma once

1.  include "ModuleManager.h"

/\*\*

*   The public interface to this module. In most cases, this interface is only public to sibling modules
*   within this plugin.
*   /

class IModule : public IModuleInterface { public: /\*\* \* Singleton-like access to this module's interface. This is just for convenience! \* Beware of calling this during the shutdown phase, though. Your module might have been unloaded already. \* \* @return Returns singleton instance, loading the module on demand if needed \*/ static inline IModule& Get() { return FModuleManager::LoadModuleChecked< IModule >("Module"); }

/\*\* \* Checks to see if this module is loaded and ready. It is only valid to call Get() if IsAvailable() returns true. \* \* @return True if the module is loaded and ready to use \*/ static inline bool IsAvailable() { return FModuleManager::Get().IsModuleLoaded("Module"); }

virtual bool IsThisNumber42(int32 num) = 0; }; </syntaxhighlight>

There are two static methods, and an instance method to test that a number is 42. The two methods provide us the ability to 1) Confirm that the module is loaded and available, and 2) get a reference to the plugin to be referenced in our game/module. Note the use of a pure virtual function here. Unreal uses classes and multiple inheritance to provide the contract of an interface, but that doesn't mean you have to provide implementations for your functions/methods. _I prefer to keep my interfaces pure virtual because it ensures that I have to implement methods_.

Add to **/Source/BobsPlayground/BobsPlayground.h** <syntaxhighlight lang="cpp"> DECLARE\_LOG\_CATEGORY\_EXTERN(BobsPlayground, Log, All); </syntaxhighlight>

Add to **/Source/BobsPlayground/BobsPlayground.cpp** <syntaxhighlight lang="cpp">

1.  include "IModule.h"

DEFINE\_LOG\_CATEGORY(BobsPlayground);

class FBobsPlaygroundModule : public IModule { /\*\* IModuleInterface implementation \*/ virtual void StartupModule() override; virtual void ShutdownModule() override; };

void FBobsPlaygroundModule::StartupModule() { if (IModule::IsAvailable()) { UE\_LOG(BobsPlayground, Log, TEXT("%s"), IModule::Get().IsThisNumber42(42) ? TEXT("True") : TEXT("False")); UE\_LOG(BobsPlayground, Log, TEXT("%s"), IModule::Get().IsThisNumber42(12) ? TEXT("True") : TEXT("False")); } } </syntaxhighlight>

Lastly, we will need to define our module implementation, defining our pure virtual function above.

Inside **/Plugins/Module/Source/Module/Private/Module.h** <syntaxhighlight lang="cpp">

1.  pragma once

class ModuleImpl : public IModule { public: /\*\* IModuleInterface implementation \*/ void StartupModule(); void ShutdownModule();

bool IsThisNumber42(int32 num); }; </syntaxhighlight>

Inside **/Plugins/Module/Source/Module/Private/Module.cpp** <syntaxhighlight lang="cpp">

1.  include "ModulePrivatePCH.h"

1.  include "Module.h"

void ModuleImpl::StartupModule() { }

void ModuleImpl::ShutdownModule() { }

bool ModuleImpl::IsThisNumber42(int32 num) { return num == 42; }

IMPLEMENT\_MODULE(ModuleImpl, Module) </syntaxhighlight>

Note the reference to the header here. It is convenient for a complicated plugin to include it because common header files are able to be used there.

Inside **/Plugins/Module/Source/Module/Private/ModulePrivatePCH.h** <syntaxhighlight lang="cpp">

1.  include "IModule.h"

// You should place include statements to your module's private header files here. You only need to // add includes for headers that are used in most of your module's source files though. </syntaxhighlight>

[Template:Warning](/index.php?title=Template:Warning&action=edit&redlink=1 "Template:Warning (page does not exist)")

If you compile this out, drop a break point in the startmodule routine for your game you will be able to step through and see the something like the following output to your logs.

\[2095.04.01-06.15.29:347\]\[  0\]BobsPlayground: True
\[2095.04.01-06.15.30:290\]\[  0\]BobsPlayground: False

Archive Manifest
----------------

*   Binaries/Win64/UE4Editor-Module.dll
*   Source/Module/Public/IModule.h
*   Resources/Icon128.png
*   Module.uplugin

Distribution
============

Now that we have completely built a new bundle, the question is - how do we get it into the hands of a developer interested in its cause? Until the market place is here and we have firm details on EULAs and such, the following will be of great help.

We are going to create an archive, zip or 7zip if you wish. It is likely easier for you to make a zip as that is a default tool in the windows file explorer.

In each of the above sections an Archive Manifest section has been included, listing important or key files to be included for distribution.

Within each archive it is a good idea to include a Readme.md file to detail out the Installation, Contact and key elements of your bundle. This would also be a good place to include any licensing or changelog information that an interested party could review before installation.

Sample ReadMe.md
----------------

Installation
-------------
Unzip the package into the Plugins directory of your game. To add it as an engine plugin you will need to unzip the module into the plugin directory under where you installed UE4.


Contact
-------------
If you have any Questions, Comments, Bug reports or feature requests for this plugin, or you wish to contact me you can and should email me - me@myemail.com

More Information
================

If you are interested in the plugin system, its capabilites or the descriptor file standard, details can be found in the **[UE4 Documentation](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html)**. There are a hundred examples you can pull from, included in the source, under the plugins directory of the UE4 project.

If you found this tutorial useful, you may also find the [Static Linking Tutorial](/index.php?title=Linking_Static_Libraries_Using_The_Build_System "Linking Static Libraries Using The Build System") beneficial, as it walks through how to load and link a static library. I am using a derivative of these two as the base for my V8 Plugin.

You can read more about me on my [User Page](/index.php?title=User:Bob_Gneu "User:Bob Gneu")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=An\_Introduction\_to\_UE4\_Plugins&oldid=37](https://wiki.unrealengine.com/index.php?title=An_Introduction_to_UE4_Plugins&oldid=37)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")
*   [Getting Started](/index.php?title=Category:Getting_Started "Category:Getting Started")