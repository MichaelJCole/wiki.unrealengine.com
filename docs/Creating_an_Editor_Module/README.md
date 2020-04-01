 Creating an Editor Module - Epic Wiki             

 

Creating an Editor Module
=========================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 What is an editor module?](#What_is_an_editor_module.3F)
    *   [1.1 Why not a plugin?](#Why_not_a_plugin.3F)
*   [2 Creating an editor module](#Creating_an_editor_module)
    *   [2.1 Module Folder Structure](#Module_Folder_Structure)
    *   [2.2 Add Module Build Rules](#Add_Module_Build_Rules)
    *   [2.3 Editing Target.cs](#Editing_Target.cs)
    *   [2.4 Source Files](#Source_Files)
    *   [2.5 Generate project files](#Generate_project_files)
*   [3 Source code](#Source_code)
*   [4 What Next?](#What_Next.3F)
*   [5 Conclusion](#Conclusion)

What is an editor module?
-------------------------

An editor module allows you to extend the functionality of the editor for your own custom C++ Actors, Components and other classes. You can do a variety of things such as customize the details panel for UPROPERTYs, add new editor modes, use component visualizers and other exciting things. This tutorial isn't going to discuss how to do any of that though, it aims to fill the gap of actually creating a module to put your customization code into.

This might seem like a lot of work just to enable you to do something else but the customization you can perform are very powerful compered to other engines.

### Why not a plugin?

Whether you should use a plugin or editor module comes down to what your trying to do. If you want to extend the editor in a way that can be used across multiple projects then you probably want a plugin. If you only want to create customization specific to your game and class types then an editor module is a better design choice.

Please note that a plugin may also contain multiple modules. It is entirely possible to provide a runtime module in your plugin and accompany it with an editor plugin for convenience of use.

An editor module can be kept private from your game code meaning there are no cross dependencies. This vastly reduces the chances of having linking errors and means your editor code will not be included in your packaged application. If it's removed your game will still work fine and the editor will just lose the extended functionality.

Creating an editor module
-------------------------

First you will need to edit your .uproject file. It should already have an entry for your main game module:

<syntaxhighlight lang="javascript"> { "FileVersion": 3, "EngineAssociation": "4.7", "Category": "", "Description": "", "Modules": \[

       {
           "Name": "MyGame",
           "Type": "Runtime",
           "LoadingPhase": "Default"
       }

\] } </syntaxhighlight>

Under the existing module add an entry for your new editor module. Name is something sensible such as 'MyGameEditor' if your project is called 'MyGame'. It's important to keep this name consistent for your module to load. The type must be editor. Since we know that nothing will depend on this module we may as well load it as late as possible with 'PostEngineInit'. This is necessary to use component visualizers as of 4.7 and as far as I can tell has no other negative effects.

<syntaxhighlight lang="javascript">

       {
           "Name": "MyGameEditor",
           "Type": "Editor",
           "LoadingPhase":  "PostEngineInit"
       }

</syntaxhighlight>

Putting it together:

<syntaxhighlight lang="javascript"> { "FileVersion": 3, "EngineAssociation": "4.7", "Category": "", "Description": "", "Modules": \[

       {
           "Name": "MyGame",
           "Type": "Runtime",
           "LoadingPhase": "Default"
       },
       {
           "Name": "MyGameEditor",
           "Type": "Editor",
           "LoadingPhase":  "PostEngineInit"
       }

\] } </syntaxhighlight>

#### Module Folder Structure

Next you will need to add the folder structure for your module. Create a new folder under source with the same name as your new module name (we will assume this is 'MyGameEditor' for the rest of this tutorial). I would suggest creating a Public and Private folder inside this folder to organize your code but it's not strictly speaking necessary.

#### Add Module Build Rules

Create a file called 'MyGameEditor.Build.cs' in the Source/MyGameEditor folder, the easiest way to do this is to copy the MyGame.Build.cs and rename it. Make sure you rename any entries inside it as well. If you've used a public/private folder structure add them to the public and private include paths as below:

<syntaxhighlight lang="csharp"> ... public MyGameEditor(ReadOnlyTargetRules Target) : base(Target) {

       PublicIncludePaths.AddRange(
           new string\[\]
           {
               "MyGameEditor/Public"
           });

       PrivateIncludePaths.AddRange(
           new string\[\] 
           {

"MyGameEditor/Private" });

       PublicDependencyModuleNames.AddRange(
           new string\[\]
           {
               "MyGame"
           });
       PrivateDependencyModuleNames.AddRange(
           new string\[\] 
           {
           });

       PrivateIncludePathModuleNames.AddRange(
           new string\[\]
           {
           });

       DynamicallyLoadedModuleNames.AddRange(
           new string\[\] 
           {
           });

       }

... </syntaxhighlight>

You'll also need to add your game module as a public dependency as displayed abowe:

<syntaxhighlight lang="csharp">

       PublicDependencyModuleNames.AddRange(
           new string\[\]
           {
               "MyGame"
           });

</syntaxhighlight>

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

  
You'll also need to add in specific modules that you need to access editor libraries to **PrivateDependencyModuleNames**. At a minimum you'll want to add 'UnrealEd'. Check the API documentation for what module a class is part of, if your having linking errors it's probably because you haven't added the module in here.

### Editing Target.cs

**Note: SetupBinaries was depreciated in 4.16. See [\[1\]](https://forums.unrealengine.com/development-discussion/c-gameplay-programming/118722-c-4-16-transition-guide?p=996806#post996806) for guidance how to transition to the new system.**

If you look in the Source folder again you'll see two files, MyGame.Target.cs and MyGameEditor.Target.cs. You'll need to make a small edit to both of these files inside the SetupBinaries function:

In MyGame.Target.cs add (the if statement makes sure this only gets included in the editor build):

<syntaxhighlight lang="csharp">

       if (bBuildEditor)
       {
           ExtraModuleNames.AddRange( 
               new string\[\]
               {
                   "MyGameEditor"
               });
       }

</syntaxhighlight>

In MyGameEditor.Target.cs add:

<syntaxhighlight lang="csharp">

       // Game editor
       ExtraModuleNames.AddRange(
           new string\[\]
           {
               "MyGameEditor"
           });

</syntaxhighlight>

**4.16+ users (Depreciated use of bBuildEditor in MyGame.Target.cs)**

<syntaxhighlight lang="csharp">

       //if (bBuildEditor) //this will include UnrealEd and will throw errors when packaging
       if (Target.Type == TargetType.Editor)//4.16+
       {
           ExtraModuleNames.AddRange( 
               new string\[\]
               {
                   "MyGameEditor"
               });
       }

</syntaxhighlight>

  

### Source Files

We need a minimum of a header and source file to get the module to compile. Create a file called MyGameEditor.h and place it in the Public folder (if you created one), this is the only file you will need to put in Public, the rest should go in Private.

This file will act as the pre compiled header for the module so be sure to include anything that you think you'll need in most files here for faster compilation times.

We're also going to create a custom module class so we can load our customization once they're made, this is fairly similar to what you would see in a plugin. To do this create a class that extends **IModuleInterface** and at minimum override the **StartupModule()** and **ShutdownModule()** functions.

I also like to declare a log category for use with the module. Since we know that this isn't going to be in the final build we can afford to use verbose log outputs.

This will look something like this:

<syntaxhighlight lang="cpp">

1.  pragma once

1.  include "Engine.h"
2.  include "Modules/ModuleInterface.h"
3.  include "Modules/ModuleManager.h"
4.  include "UnrealEd.h"

DECLARE\_LOG\_CATEGORY\_EXTERN(MyGameEditor, All, All)

class FMyGameEditorModule: public IModuleInterface { public: virtual void StartupModule() override; virtual void ShutdownModule() override;

}; </syntaxhighlight>

Finally create a file called MyGameEditor.cpp in the private folder. There's a few things to do here.

At the top of the file use the **IMPLEMENT\_GAME\_MODULE** macro, the first argument is the name of the module class you created in the header file, the second argument is the name of the module as you declared it in the uproject file.

<syntaxhighlight lang="cpp">

1.  include "MyGameEditor.h"
2.  include "Modules/ModuleManager.h"
3.  include "Modules/ModuleInterface.h"

IMPLEMENT\_GAME\_MODULE(FMyGameEditorModule, MyGameEditor); </syntaxhighlight>

Under this make a basic implementation of the startup and shutdown functions, if you add in a log call then you can check that the module is being loaded correctly on startup. As you make your editor customizations this is where you will load and unload them. The exact method for this differs depending on the customization type but it usually involves accessing the appropriate module though the module manager and calling a registration function.

<syntaxhighlight lang="cpp"> DEFINE\_LOG\_CATEGORY(MyGameEditor)

1.  define LOCTEXT\_NAMESPACE "MyGameEditor"

void FMyGameEditorModule::StartupModule() { UE\_LOG(MyGameEditor, Warning, TEXT("MyGameEditor: Log Started")); }

void FMyGameEditorModule::ShutdownModule() { UE\_LOG(MyGameEditor, Warning, TEXT("MyGameEditor: Log Ended")); }

1.  undef LOCTEXT\_NAMESPACE

</syntaxhighlight>

### Generate project files

Almost done! Lastly right click on your _.uproject_ file and select generate project files. This will re-generate your project files including your new module. If you get an error you probably have a name inconstancy, make sure your using 'MyGameEditor' or whatever you chose in all the right spots.

Compile and run your project. If you check your output log you should see the log output from above. You have now successfully created your editor module!

15:44, 18 July 2017 (UTC)15:44, 18 July 2017 (UTC)[Vertex Soup](/index.php?title=User:Vertex_Soup&action=edit&redlink=1 "User:Vertex Soup (page does not exist)") ([talk](/index.php?title=User_talk:Vertex_Soup&action=edit&redlink=1 "User talk:Vertex Soup (page does not exist)")) Updated for 4.16.2 by VertexSoup

Source code
-----------

[https://github.com/GSAero/Creating-an-Editor-Module](https://github.com/GSAero/Creating-an-Editor-Module)

What Next?
----------

Now you actually need to create some customizations and register them in StartupModule(). Here are a few good resources to start with:

*   [Customizing Details Panels](/index.php?title=Customizing_detail_panels "Customizing detail panels") by [Temaran](/index.php?title=User:Temaran&action=edit&redlink=1 "User:Temaran (page does not exist)"), you can register the customization in the StartupModule() function
*   [Component Visualizers](/index.php?title=Component_Visualizers "Component Visualizers") by me

  
[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

Conclusion
----------

An editor module allows you to easily organize editor only code and separate it from your game code. If you are going to customize the editor for your specific types this is a good starting point. It might seem like a lot of work but you'll be glad you did it later!

  
[Karltheawesome](/index.php?title=User:Karltheawesome&action=edit&redlink=1 "User:Karltheawesome (page does not exist)") ([talk](/index.php?title=User_talk:Karltheawesome&action=edit&redlink=1 "User talk:Karltheawesome (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_an\_Editor\_Module&oldid=153](https://wiki.unrealengine.com/index.php?title=Creating_an_Editor_Module&oldid=153)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")