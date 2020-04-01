 Custom input device plugin guide - Epic Wiki             

 

Custom input device plugin guide
================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

This page describes how to integrate a custom input device with UE4 as an engine plug in. It presents the bare-minimum code for an input device plugin that compiles with Unreal Engine 4.7, explains how it works, and points out a few crucial places where users can begin integrating external code.

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 Getting started](#Getting_started)
*   [3 Show me the code!](#Show_me_the_code.21)
    *   [3.1 BlankInputDevicePlugin.uplugin](#BlankInputDevicePlugin.uplugin)
    *   [3.2 IBlankInputDevicePlugin.h](#IBlankInputDevicePlugin.h)
    *   [3.3 BlankInputDevicePlugin.cpp](#BlankInputDevicePlugin.cpp)
    *   [3.4 GenericInputDevice.h](#GenericInputDevice.h)
    *   [3.5 GenericInputDevice.cpp](#GenericInputDevice.cpp)
    *   [3.6 BlankInputDevicePluginPrivatePCH.h](#BlankInputDevicePluginPrivatePCH.h)
    *   [3.7 BlankInputDevicePlugin.Build.cs](#BlankInputDevicePlugin.Build.cs)
*   [4 Compiling](#Compiling)
*   [5 Additional notes](#Additional_notes)

Introduction
------------

There are a ton of resources from Epic about writing plugins - unfortunately, most of the example plugins and tutorials are irrelevant deal with input devices. The key difference between input device plugins and other plugins is that they implement different interfaces. A normal plugin needs to complete the [IModuleInterface](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/Modules/IModuleInterface/index.html) interface, whereas an input device plugin needs to implement the [IInputDeviceModule](https://docs.unrealengine.com/latest/INT/API/Runtime/InputDevice/IInputDeviceModule/index.html) interface AND the [IInputDevice](https://docs.unrealengine.com/latest/INT/API/Runtime/InputDevice/IInputDevice/index.html) interface. Unfortunately, the details of implementing the latter two interfaces doesn't seem too well documented. This goal of this page is to share some "lessons learned" and hopefully help other developers get up to speed faster.

**If you haven't read the [official UE4 documentation on plugins yet](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html), it might be a good idea to give it a glance before continuing.**

Getting started
---------------

In the spirit of the BlankPlugin plugin that is shipped with the UE4 source code (under Engine\\Plugins\\Developer), we are going to present a bare-minimum engine plugin called BlankInputDevicePlugin that can be used as the jumping-off point for building custom input device plugins. There are 2 "metadata" files and 6 code files:

*   BlankInputDevicePlugin.uplugin
*   Icon128.png

*   IBlankInputDevicePlugin.h
*   BlankInputDevicePlugin.cpp
*   GenericInputDevicePlugin.h
*   GenericInputDevicePlugin.cpp
*   BlankInputDevicePluginPrivatePCH.h
*   BlankInputDevicePlugin.build.cs

These files are usually in a folder structure like the following:

|- BlankInputDevicePlugin\\ (root directory of plugin)
  |- BlankInputDevicePlugin.uplugin
  |- Resources\\
    |- Icon128.png
  |- Source\\
    |- BlankInputDevicePlugin\\
      |- Public\\
        |- IBlankInputDevicePlugin.h
      |- Private\\
        |- BlankInputDevicePlugin.cpp
        |- GenericInputDevicePlugin.h
        |- GenericInputDevicePlugin.cpp
        |- BlankInputDevicePluginPrivatePCH.h
    |- BlankInputDevicePlugin.build.cs

That's a lot of files! The good news is, most of these files contain boilerplate code for hooking into the engine - stuff common to plugins that you shouldn't have to touch. At a high level, here's what each file does:

*   BlankInputDevicePlugin.uplugin - This is a standard, required, descriptor file that lets UE4 know what the contents of your plugin are, who made it, what it does, etc. It's essentially a bunch of key-value pairs in text form. You can read more about the descriptor file format [at the official Unreal Engine docs](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html).

*   Icon128.png - This is exactly what it sounds like. It's a 128 x 128 PNG image that serves as the icon for your plugin.

*   IBlankInputDevicePlugin.h - This file is the starting point of your plugin. It defines a subclass of IInputDeviceModule, and implements \*part\* of that interface. These include methods indicating whether or not your plugin is available and how to get an instance of your plugin.

*   BlankInputDevicePlugin.h - This file defines a subclass of the subclass from previous file and implements the rest of the IInputDeviceModule interface. These include callback methods that let you do custom work at the startup and shutdown of your plugin. (The reason for splitting up the implementation of the interface across two files/classes will be more obvious later).

*   GenericInputDevicePlugin.h/GenericInputDevicePlugin.cpp - This file is where you should abstract away your custom input device. It should define a subclass of IInputDevice. Note the difference between IInputDevice and IInputDeviceModule! You can think of IInputDevice as the interface that lets your custom device talk to UE4, and IInputDeviceModule as the interface that lets your plugin MODULE integrate nicely with UE4. They serve different purposes.

*   BlankInputDevicePluginPrivatePCH.h - This is just a precompiled header (hence the "PCH" in the name) that is included in all other private source files. It's just a convenience file, because an include statement in this file will automatically be included in all other files. That means you do want to choose what you put in here carefully!

*   BlankInputDevicePlugin.build.cs - This file instructs the [Unreal Build System](https://docs.unrealengine.com/latest/INT/Programming/UnrealBuildSystem/index.html) how to build your plugin. This is where you tell the build system where your custom input device's SDK's library files and headers are located on your computer. In other words, you specify include paths and library paths here.

Show me the code!
-----------------

### BlankInputDevicePlugin.uplugin

<syntaxhighlight lang="csharp"> { "FileVersion" : 1,

"FriendlyName" : "Blank Input Device Plugin", "Version" : 1, "VersionName" : "1.0", "CreatedBy" : "Karaage", "CreatedByURL" : "cs.stanford.edu", "EngineVersion" : "4.2.0", "Description" : "Allows you to add support for a custom input device.", "Category" : "Examples", "EnabledByDefault" : true,

"Modules" : \[ { "Name" : "BlankInputDevicePlugin", "Type" : "Developer" } \] } </syntaxhighlight>

  
Related documentation: [Descriptor file format](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html#plugindescriptorfiles)

  

### IBlankInputDevicePlugin.h

<syntaxhighlight lang="cpp"> // Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.

1.  pragma once

1.  include "ModuleManager.h"
2.  include "IInputDeviceModule.h"

  
/\*\*

\* The public interface to this module.  In most cases, this interface is only public to sibling modules 
\* within this plugin.
\*/

class IBlankInputDevicePlugin : public IInputDeviceModule {

public:

/\*\* \* Singleton-like access to this module's interface. This is just for convenience! \* Beware of calling this during the shutdown phase, though. Your module might have been unloaded already. \* \* @return Returns singleton instance, loading the module on demand if needed \*/ static inline IBlankInputDevicePlugin& Get() { return FModuleManager::LoadModuleChecked< IBlankInputDevicePlugin >( "BlankInputDevicePlugin" ); }

/\*\* \* Checks to see if this module is loaded and ready. It is only valid to call Get() if IsAvailable() returns true. \* \* @return True if the module is loaded and ready to use \*/ static inline bool IsAvailable() { return FModuleManager::Get().IsModuleLoaded( "BlankInputDevicePlugin" ); } }; </syntaxhighlight>

  
Things to note:

*   Apart from the fact that we are subclassing from IInputDeviceModule, this is mostly boilerplate code identical to the BlankPlugin example included with the engine.
*   These are standard implementations of Get() and IsAvailable(), using provided classes to load your plugin module.

Related documentation:

*   [FModuleManager](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/Modules/FModuleManager/index.html)
*   [IInputDeviceModule](https://docs.unrealengine.com/latest/INT/API/Runtime/InputDevice/IInputDeviceModule/index.html)

  

### BlankInputDevicePlugin.cpp

<syntaxhighlight lang="cpp"> // Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.

1.  include "BlankInputDevicePluginPrivatePCH.h"
2.  include "GenericInputDevice.h"

  
class FBlankInputDevicePlugin : public IBlankInputDevicePlugin { /\*\* Implements the rest of the IInputDeviceModule interface \*\*/

/\*\* Creates a new instance of the IInputDevice associated with this IInputDeviceModule \*\*/ virtual TSharedPtr<class IInputDevice> CreateInputDevice(const TSharedRef<FGenericApplicationMessageHandler>& InMessageHandler);

/\*\* Called right after the module DLL has been loaded and the module object has been created \*\*/ virtual void StartupModule() override;

/\*\* Called before the module is unloaded, right before the module object is destroyed. \*\*/ virtual void ShutdownModule() override; };

IMPLEMENT\_MODULE( FBlankInputDevicePlugin, BlankInputDevicePlugin )

  
TSharedPtr<class IInputDevice> FBlankInputDevicePlugin::CreateInputDevice(const TSharedRef<FGenericApplicationMessageHandler>& InMessageHandler) { UE\_LOG(LogTemp, Warning, TEXT("Created new input device!"));

// See GenericInputDevice.h for the definition of the IInputDevice we are returning here return MakeShareable(new FGenericInputDevice(InMessageHandler)); }

  
void FBlankInputDevicePlugin::StartupModule() { // This code will execute after your module is loaded into memory (but after global variables are initialized, of course.) // Custom module-specific init can go here.

UE\_LOG(LogTemp, Warning, TEXT("BlankInputDevicePlugin initiated!"));

// IMPORTANT: This line registers our input device module with the engine. // If we do not register the input device module with the engine, // the engine won't know about our existence. Which means // CreateInputDevice never gets called, which means the engine // will never try to poll for events from our custom input device. IModularFeatures::Get().RegisterModularFeature(IInputDeviceModule::GetModularFeatureName(), this); }

  
void FBlankInputDevicePlugin::ShutdownModule() { // This function may be called during shutdown to clean up your module. For modules that support dynamic reloading, // we call this function before unloading the module.

UE\_LOG(LogTemp, Warning, TEXT("BlankInputDevicePlugin shut down!"));

// Unregister our input device module IModularFeatures::Get().UnregisterModularFeature(IInputDeviceModule::GetModularFeatureName(), this); } </syntaxhighlight>

  
Things to note:

*   CreateInputDevice(...) is where subclasses of IInputDeviceModule and IInputDevice work with each other. In this method, your subclass of IInputDeviceModule creates the instance of IInputDevice that it will be responsible for.
*   Don't forget to register your input device plugin with the engine! See the IMPORTANT inline comment.
*   If you haven't see the logging macros UE\_LOG(...) before, [this page](https://wiki.unrealengine.com/Logs,_Printing_Messages_To_Yourself_During_Runtime) should tell you everything you need to know. In short, it prints a message to the Output Log in the Unreal Editor. You can open the Output Log in the Unreal Editor by selecting Window > Developer Tools > Output Log.

Related documentation:

*   [FGenericApplicationMessageHandler](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/GenericPlatform/FGenericApplicationMessageHandle-/index.html)
*   [IInputDeviceModule](https://docs.unrealengine.com/latest/INT/API/Runtime/InputDevice/IInputDeviceModule/index.html)

  

### GenericInputDevice.h

<syntaxhighlight lang="cpp"> // Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.

1.  pragma once

1.  include "IInputDevice.h"

class FGenericInputDevice : public IInputDevice { public: FGenericInputDevice(const TSharedRef<FGenericApplicationMessageHandler>& InMessageHandler); ~FGenericInputDevice();

/\*\* Tick the interface (e.g. check for new controllers) \*/ virtual void Tick(float DeltaTime) override;

/\*\* Poll for controller state and send events if needed \*/ virtual void SendControllerEvents() override;

/\*\* Set which MessageHandler will get the events from SendControllerEvents. \*/ virtual void SetMessageHandler(const TSharedRef< FGenericApplicationMessageHandler >& InMessageHandler) override;

/\*\* Exec handler to allow console commands to be passed through for debugging \*/ virtual bool Exec(UWorld\* InWorld, const TCHAR\* Cmd, FOutputDevice& Ar) override;

/\*\* IForceFeedbackSystem pass through functions \*\*/ virtual void SetChannelValue(int32 ControllerId, FForceFeedbackChannelType ChannelType, float Value) override; virtual void SetChannelValues(int32 ControllerId, const FForceFeedbackValues &values) override;

private: /\* Message handler \*/ TSharedRef<FGenericApplicationMessageHandler> MessageHandler; }; </syntaxhighlight>

  
Things to note:

*   All the functions above are simply required functions for the IInputDevice interface. In this bare-minimum example we will only pay particular attention to SendControllerEvents(), but you should check out the other callback functions too and see how they might provide other ways for you to integrate your custom input device neatly with UE4.

Related documentation:

*   [IForceFeedbackSystem](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/GenericPlatform/IForceFeedbackSystem/index.html)
*   [IInputDevice](https://docs.unrealengine.com/latest/INT/API/Runtime/InputDevice/IInputDevice/index.html)

  

### GenericInputDevice.cpp

<syntaxhighlight lang="cpp"> // Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.

1.  include "BlankInputDevicePluginPrivatePCH.h"
2.  include "GenericInputDevice.h"
3.  include "IInputInterface.h"

  
FGenericInputDevice::FGenericInputDevice(const TSharedRef<FGenericApplicationMessageHandler>& InMessageHandler) : MessageHandler(InMessageHandler) { // Initiate your device here }

  
FGenericInputDevice::~FGenericInputDevice() { // Close your device here }

  
void FGenericInputDevice::Tick(float DeltaTime) { // Nothing necessary to do (boilerplate code to complete the interface) }

  
void FGenericInputDevice::SendControllerEvents() { // Poll your device here and fire off events related to its current state

// Example: Sending a dummy value UE\_LOG(LogTemp, Warning, TEXT("Sending dummy analog controller event!")); MessageHandler->OnControllerAnalog(EControllerButtons::LeftTriggerAnalog, 0, 0.5f); }

  
void FGenericInputDevice::SetMessageHandler(const TSharedRef< FGenericApplicationMessageHandler >& InMessageHandler) { MessageHandler = InMessageHandler; }

  
bool FGenericInputDevice::Exec(UWorld\* InWorld, const TCHAR\* Cmd, FOutputDevice& Ar) { // Nothing necessary to do (boilerplate code to complete the interface) return false; }

  
void FGenericInputDevice::SetChannelValue(int32 ControllerId, FForceFeedbackChannelType ChannelType, float Value) { // Nothing necessary to do (boilerplate code to complete the interface) }

  
void FGenericInputDevice::SetChannelValues(int32 ControllerId, const FForceFeedbackValues &values) { // Nothing necessary to do (boilerplate code to complete the interface) } </syntaxhighlight>

  
Things to note:

*   SendControllerEvents() is where the magic happens. In this method you should check your device state and fire off UE4 BluePrint events with the message handler if your device is in a state your are interested in. The game engine will automatically call this method again and again to poll your device.
*   What kind of events can you send with the message handler?
    *   MessageHandler->OnControllerAnalog(EControllerButtons::Type Button, int 32 ControllerId, float AnalogValue);  
        can be used to fire off a bunch of predefined buttons. These include D-pad buttons, shoulder buttons, trigger buttons, and thumbsticks on a standard gamepad. Analog values usually take the range 0.0f - 1.0f. You can see the [full list of predefined buttons here](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/GenericPlatform/EControllerButtons__Type/index.html).
    *   FGenericApplicationMessageHandler also exposes a bunch of mouse-related events (OnMouseUp, OnMouseMove, OnMouseDoubleClick, etc.). You can fire these events to simulate a mouse with your custom input device.
    *   FGenericApplicationMessageHandler also exposes a bunch of keyboard events (OnKeyDown, OnKeyUp). You can use these to simulate pressing specific keyboard keys.

Related documentation:

*   [EControllerButtons::Type](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/GenericPlatform/EControllerButtons__Type/index.html)
*   [FGenericApplicationMessageHandler](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/GenericPlatform/FGenericApplicationMessageHandle-/index.html)

  

### BlankInputDevicePluginPrivatePCH.h

<syntaxhighlight lang="cpp"> // Copyright 1998-2015 Epic Games, Inc. All Rights Reserved.

1.  include "Core.h"
2.  include "IBlankInputDevicePlugin.h"

// You should place include statements to your module's private header files here. You only need to // add includes for headers that are used in most of your module's source files though. </syntaxhighlight>

  

### BlankInputDevicePlugin.Build.cs

<syntaxhighlight lang="csharp"> // Copyright 1998-2015 Epic Games, Inc. All Rights Reserved. using System.IO;

namespace UnrealBuildTool.Rules { public class BlankInputDevicePlugin : ModuleRules { public BlankInputDevicePlugin(TargetInfo Target) { PublicIncludePaths.AddRange( new string\[\] { // ... add public include paths required here ... } );

PrivateIncludePaths.AddRange( new string\[\] { "Developer/BlankInputDevicePlugin/Private", // ... add other private include paths required here ... } );

PublicDependencyModuleNames.AddRange( new string\[\] { "Core", "Engine", "Slate", "InputCore", "InputDevice", // ... add other public dependencies that you statically link with here ... } );

PrivateDependencyModuleNames.AddRange( new string\[\] { // ... add private dependencies that you statically link with here ... } );

DynamicallyLoadedModuleNames.AddRange( new string\[\] { // ... add any modules that your module loads dynamically here ... } );

AddThirdPartyPrivateStaticDependencies(Target,

               		new string\[\] 
               		{ 
               			// ... add any third party modules included with UE4 here ...
               		}
               		);

} } } </syntaxhighlight>

  
Things to note:

*   If you are adding support for a custom input device, chances are you'll need to link against external SDK headers and library files. To make a statement like "#include "Foobar.h"" compile correctly in your plugin code, you'll have to modify _this_ build file to tell the build system where to find those headers and library files.
*   Fortunately, this is not too complicated. To tell the build system where to find header files, you simply need to add their location to the arrays inside PublicIncludePaths.AddRange(...) and PrivateIncludePaths.AddRange(...). There's a [great community guide on how to link against static libraries here](https://wiki.unrealengine.com/Linking_Static_Libraries_Using_The_Build_System).
*   If your third-party SDK headers require Windows-only types like DWORD and such, you must wrap their include statements with special files "AllowWindowsPlatformTypes.h" and "HideWindowsPlatformTypes.h", provided with Unreal:

#include "AllowWindowsPlatformTypes.h"
#include "MyWindowsDependentHeader.h"
#include "HideWindowsPlatformTypes.h"

Compiling
---------

Hopefully, at this point, the biggest question left is - how do I compile my plugin? Answer: Basically, you build the plugin by building the whole Unreal game engine and letting Unreal's Build System find your plugin and compile it for you.

In more detail:

*   [Join Epic Games](https://accounts.unrealengine.com/register) and register as an official Unreal Engine developer if you haven't already
*   Join the [Epic Games organization on Github](https://github.com/EpicGames)
*   Check out a source build of Unreal Engine from the repository
*   Build it with [Visual Studio](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx) (just to make sure everything compiles)
*   Place your plugin's root folder in the Engine\\Plugins\\Developer folder (or a similar folder)
*   Build the whole application again (the second build should only compile changes, or in our case, the newly-added files)

Note: If you are running a source build of UE4 with your compiled plugin, you cannot compile the plugin again until you close UE4! For obvious reasons, you can't overwrite your plugin's DLL with a new one while it's still being used by an open application. Visual Studio will give you errors.

Additional notes
----------------

If you want to copy and paste the above example code and rename them to suit your project, it might be a good idea to check out [Unreal Engine Coding Standard](https://docs.unrealengine.com/latest/INT/Programming/Development/CodingStandard/index.html#namingconventions) before doing so. It's a good idea to adopt the official style, because it'll make it easier for others to read and also help with code maintenance!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Custom\_input\_device\_plugin\_guide&oldid=801](https://wiki.unrealengine.com/index.php?title=Custom_input_device_plugin_guide&oldid=801)"