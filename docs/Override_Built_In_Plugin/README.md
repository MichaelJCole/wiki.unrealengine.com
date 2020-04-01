Override Built In Plugin - Epic Wiki                    

Override Built In Plugin
========================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.9

Overview
========

The goal of this tutorial is to explain how to override the functionality of a _Built In_ plugin, such as SimpleHMD, without changing the original plugin source. This is useful for instance, when you want to change an existing plugin behavior but the changes should only be applied to a specific project.

We will override the SimpleHMD plugin as an example.

The tutorial was only tested on Windows, although the general logic should be similar in OSX.

We assume the reader is familiar with plugins in UE4 ([https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html)).

Instructions
============

*   Create a _Plugins_ folder inside your project directory if it does not exist already.
*   Copy the folder of the plugin you want to override from the Unreal Engine installation folder to your project's _Plugins_ folder (e.g. C:\\Program Files\\Epic Games\\4.9\\Engine\\Plugins\\Experimental\\SimpleHMD -> C:\\Users\\pgomes\\Documents\\Unreal Projects\\plugin\_override\\Plugins\\SimpleHMD). All further modifications will be in your project's local _Plugins_ folder.
*   Rename the plugin folder (...\\Plugins\\SimpleHMD -> ...\\Plugins\\SimpleHMDX).
*   Change the uplugin file name to match the new plugin name (...\\Plugins\\SimpleHMD\\SimpleHMD.uplugin -> ...\\Plugins\\SimpleHMDX.uplugin).
*   Edit the _\*.uplugin_ file with a text editor. Modify the _FriendlyName_ and the _Module>Name_ property ("SimpleHMD" -> "SimpleHMDX").
*   Rename the \*.Build.cs file (SimpleHMD.Build.cs -> SimpleHMDX.Build.cs).
*   In the public header (...\\Public\\ISimpleHMDPlugin.h) change the FModuleManager related function calls arguments to match your new plugin name. In our SimpleHMD example:

FModuleManager::LoadModuleChecked< ISimpleHMDPlugin \>( "SimpleHMD" );
//->
FModuleManager::LoadModuleChecked< ISimpleHMDPlugin \>( "SimpleHMDX" );
//
// and
//
return FModuleManager::Get().IsModuleLoaded( "SimpleHMD" );
//->
return FModuleManager::Get().IsModuleLoaded( "SimpleHMDX" );

*   Edit the \*.Build.cs and modify the PrivateIncludePaths engine adds to be relative to the engine folder and not the local directory. In our example:

// add to the top
using System.IO;
//
// and
//
"../../../../Source/Runtime/Renderer/Private",
//->
Path.GetDirectoryName( RulesCompiler.GetModuleFilename("Renderer"))+"/Private",

*   Still in \*.Build.cs, change the name of the class, and constructor, to match your new plugin name (SimpleHMD -> SimpleHMDX).
*   Change the macro calls to IMPLEMENT\_MODULE to reference your new plugin name. In our example edit ..\\Private\\SimpleHMD.cpp

IMPLEMENT\_MODULE( FSimpleHMDPlugin, SimpleHMD )
//->
IMPLEMENT\_MODULE( FSimpleHMDPlugin, SimpleHMDX )

*   Open your unreal project. You will be prompted to build the new added plugin.
*   Navigate to Window>Plugins. There should be a new plugin available. Tick the checkbox for your new plugin and make sure that the old plugin is unticked.

You should now be ready to modify the plugin so that the changes you make only affect your local project.

FAQ
===

Q: Why don't you rename more elements inside the plugin in your instructions?

R: While it's certainly possible to rename more things in the plugin, namely class names, further changes need to be made consistently. What I propose are a small set of consistent modifications that allow the Unreal editor to recognize the plugin as being different.

  
Q: Whenever I tick the new plugin, the old plugin also gets ticked. What is happening?

R: Your probably forgot to do one of the name changes I suggest above. Most likely the module name in the \*.uplugin file. Remember to change both the friendly name and the module name.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Override\_Built\_In\_Plugin&oldid=16214](https://wiki.unrealengine.com/index.php?title=Override_Built_In_Plugin&oldid=16214)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)