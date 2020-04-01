Custom Input Devices - Epic Wiki                     

Custom Input Devices
====================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Example Code](#Example_Code)
    *   [2.1 uPlugin Ddefinition](#uPlugin_Ddefinition)
    *   [2.2 Module Build File](#Module_Build_File)
    *   [2.3 IPlugin Header File](#IPlugin_Header_File)
    *   [2.4 PCH File](#PCH_File)
    *   [2.5 Plugin Header File](#Plugin_Header_File)
    *   [2.6 Plugin Cpp File](#Plugin_Cpp_File)
    *   [2.7 Input Device Header File](#Input_Device_Header_File)
    *   [2.8 Input Device Cpp File](#Input_Device_Cpp_File)
    *   [2.9 Input Device Cpp File](#Input_Device_Cpp_File_2)
    *   [2.10 Input Device Cpp File](#Input_Device_Cpp_File_3)

Overview
--------

This page will detail how to create custom Input Device plugins in order to add support for additional controller/input types. It will also show example code for adding additional Key/Gamepad Input Names. The code will show how to fire events from the existing Input Names via a MessageHandler and how to fire events from any Key/Gamepad Input directly.

The actor is a useful way of referencing the InputDevice to run arbitary methods. For some reason if the two actor classes are deleted this all fails to compile (Possibly related to \*.generated.h files). If someone figures out why I would love to know (mspe044).

Example Code
------------

The code will show how to create a plugin for an input device named PsudoController which will simulate controller#1 pressing and holding the bottom face button (jump) and moving the right analog stick wildly. It will also create a new custom Gamepad Input called "Psudo Player Weight" and fire events for this input with a value of 75.0 (kg).

In your own code you will most likely link your plugin with a static/dynamic library which communicates with you Input Device. When the engine calls FPsudoControllerInputDevice::SendControllerEvents() you can then pass on any events/polled controller states using the MessageHandler in a generic way.

### uPlugin Ddefinition

**/Plugins/PsudoController/PsudoController.uplugin**

{
    "FileVersion" : 0,
 
	"FriendlyName" : "Psudo Controller Plugin",
	"Version" : 0,
	"VersionName" : "0.2",
	"CreatedBy" : "mspe044@gmail.com",
	"EngineVersion" : 1579795,
	"Description" : "I wish I was a real input! :'(",
	"Category" : "Tutorial",
 
	"Modules" :
	\[
		{
			"Name" : "PsudoController",
			"Type" : "Runtime",
			"LoadingPhase" : "PreDefault",
			"WhitelistPlatforms" : \[ "Win64", "Win32" \]
		}
	\]
}

### Module Build File

This is where you link to any library supporting your Input Device. There is a sample method 'LoadYourThirdPartyLibraries()' to help you do this however the call to it is currently commented out.

This method will will link to a static library in **.../Plugins/PsudoController/Source/PsudoController/ThirdParty/LibraryDirName/...** with include files in the sub directory **.../include/** and library code in subdirectoires seprated by compile arcitecture I.E. **.../Win64/VS2013/MyLibrary.lib**

**/Plugins/PsudoController/Source/PsudoController/PsudoController.Build.cs**

namespace UnrealBuildTool.Rules
{
    using System.IO; // ToDo: Replace with standard mechenism
 
    public class PsudoController : ModuleRules
    {
        public PsudoController(TargetInfo Target)
        {
            PCHUsage \= PCHUsageMode.NoSharedPCHs;
 
            // ... add public include paths required here ...
            PublicIncludePaths.AddRange( new string\[\] {
                "PsudoController/Public",
                "PsudoController/Classes",
            });
 
            // ... add other private include paths required here ...
            PrivateIncludePaths.AddRange( new string\[\] {
                "PsudoController/Private",
            });
 
            // ... add other public dependencies that you statically link with here ...
            PublicDependencyModuleNames.AddRange( new string\[\] { 
                "Core", 
                "CoreUObject",      // Provides Actors and Structs
                "Engine",           // Used by Actor
                "Slate",            // Used by InputDevice to fire bespoke FKey events
                "InputCore",        // Provides LOCTEXT and other Input features
                "InputDevice",      // Provides IInputInterface
            });
 
            // ... add private dependencies that you statically link with here ...
            PrivateDependencyModuleNames.AddRange( new string\[\] {
            });
 
            // ... add any modules that your module loads dynamically here ...
            DynamicallyLoadedModuleNames.AddRange( new string\[\] { 
            });
 
            // !!!!!!!!!! UNCOMMENT THIS IF YOU WANT TO CALL A LIBRARY !!!!!!!!!!
            //LoadYourThirdPartyLibraries(Target);
        }
 
        public bool LoadYourThirdPartyLibraries(TargetInfo Target)
        {
            bool isLibrarySupported \= false;
 
            // This will give oyu a relitive path to the module ../PsudoController/
            string ModulePath \= Path.GetDirectoryName(RulesCompiler.GetModuleFilename(this.GetType().Name));
            // This will give you a relative path to ../PsudoController/ThirdParty/"LibraryDirName"/
            string MyLibraryPath \= Path.Combine(ModulePath, "ThirdParty", "LibraryDirName");
 
            // Use this to keep Win32/Win64/e.t.c. library files in seprate subdirectories
            string ArchitecturePath \= "";
 
            // When you are building for Win64
            if (Target.Platform \== UnrealTargetPlatform.Win64 &&
                WindowsPlatform.Compiler \== WindowsCompiler.VisualStudio2013)
            {
                // We will look for the library in ../PsudoController/ThirdParty/MyLibrary/Win64/VS20##/
                ArchitecturePath \= Path.Combine("Win64", "VS" + WindowsPlatform.GetVisualStudioCompilerVersionName());
 
                isLibrarySupported \= true;
            }
            // When you are building for Win32
            else if (Target.Platform \== UnrealTargetPlatform.Win32 &&
                WindowsPlatform.Compiler \== WindowsCompiler.VisualStudio2013)
            {
                // We will look for the library in ../PsudoController/ThirdParty/MyLibrary/Win32/VS20##/
                ArchitecturePath \= Path.Combine("Win32", "VS" + WindowsPlatform.GetVisualStudioCompilerVersionName());
 
                isLibrarySupported \= true;
            }
            // Add mac/linux/mobile support in much the same way
 
            // If the current build architecture was supported by the above if statements
            if (isLibrarySupported)
            {
                // Add the architecture spacific path to the library files
                PublicAdditionalLibraries.Add(Path.Combine(MyLibraryPath, "lib", ArchitecturePath, "MyLibrary.lib"));
                // Add a more generic path to the include header files
                PublicIncludePaths.Add(Path.Combine(MyLibraryPath, "include"));
            }
 
            // Defination lets us know whether we successfully found our library!
            Definitions.Add(string.Format("WITH\_MY\_LIBRARY\_PATH\_USE={0}", isLibrarySupported ? 1 : 0));
 
            return isLibrarySupported;
        }
    }
}

### IPlugin Header File

**/Plugins/PsudoController/Source/PsudoController/Public/IPsudoControllerPlugin.h**

#pragma once
 
#include "ModuleManager.h"
#include "IInputDeviceModule.h"
 
#include "InputCoreTypes.h"
 
/\*\*
 \* The public interface to this module.  In most cases, this interface is only public to sibling modules 
 \* within this plugin.
 \*/
class IPsudoControllerPlugin : public IInputDeviceModule
{
public:
	/\*\*
	 \* Singleton-like access to this module's interface.  This is just for convenience!
	 \* Beware of calling this during the shutdown phase, though.  Your module might have been unloaded already.
	 \*
	 \* @return Returns singleton instance, loading the module on demand if needed
	 \*/
	static inline IPsudoControllerPlugin& Get() {
		return FModuleManager::LoadModuleChecked< IPsudoControllerPlugin \>("PsudoController");
	}
 
	/\*\*
	 \* Checks to see if this module is loaded and ready.  It is only valid to call Get() if IsAvailable() returns true.
	 \*
	 \* @return True if the module is loaded and ready to use
	 \*/
	static inline bool IsAvailable() {
		return FModuleManager::Get().IsModuleLoaded( "PsudoController" );
	}
 
	// This is where I declare my fancy new output type 
	//  - It's pretending to be a set of scales like a poor mans Wii Balance Board)
	static const FKey Psudo\_WeighingScales;
};

### PCH File

**/Plugins/PsudoController/Source/PsudoController/Private/PsudoControllerPrivatePCH**

// You should place include statements to your module's private header files here.  You only need to
// add includes for headers that are used in most of your module's source files though.
 
#include "Core.h"
#include "CoreUObject.h"
 
#include "IPsudoControllerPlugin.h"

### Plugin Header File

**/Plugins/PsudoController/Source/PsudoController/Private/PsudoControllerPlugin.h**

#pragma once
#include "PsudoControllerPrivatePCH.h"
 
class FPsudoControllerPlugin : public IPsudoControllerPlugin
{
public:
	/\*\* IPsudoControllerInterface implementation \*/
	virtual TSharedPtr< class IInputDevice \> CreateInputDevice(const TSharedRef< FGenericApplicationMessageHandler \>& InMessageHandler);
 
	//virtual void StartupModule() OVERRIDE; // This is not required as IInputDeviceModule handels it!
	virtual void ShutdownModule() OVERRIDE;
 
	TSharedPtr< class FPsudoControllerInputDevice \> PsudoInputDevice;
};

### Plugin Cpp File

**/Plugins/PsudoController/Source/PsudoController/Private/PsudoControllerPlugin.cpp**

#include "PsudoControllerPrivatePCH.h"
 
#include "Internationalization.h" // LOCTEXT
#include "InputCoreTypes.h"
 
#include "PsudoControllerPlugin.h"
 
#include "Engine.h" // Are these both necessary?
#include "EngineUserInterfaceClasses.h" // Are these both necessary?
 
#include "IPsudoControllerPlugin.h"
 
#include "PsudoController.generated.inl"
 
IMPLEMENT\_MODULE(FPsudoControllerPlugin, PsudoController)
DEFINE\_LOG\_CATEGORY\_STATIC(PsudoControllerPlugin, Log, All);
 
#define LOCTEXT\_NAMESPACE "InputKeys"
 
const FKey IPsudoControllerPlugin::Psudo\_WeighingScales("Psudo\_WeighingScales");
 
// This function is called by \*Application.cpp after startup to instantiate the modules InputDevice
TSharedPtr< class IInputDevice \> FPsudoControllerPlugin::CreateInputDevice(const TSharedRef< FGenericApplicationMessageHandler \>& InMessageHandler)
{
	UE\_LOG(PsudoControllerPlugin, Log, TEXT("Create Input Device"));
 
	// EKey: use these sparingly... only when you need a button/axis/motion that doesn't fit any of the input names that already exist
	//  - I'm defineing my poor mans Wii Balance Board, it will be called "Psudo Player Weight" in the editor
	EKeys::AddKey(FKeyDetails(IPsudoControllerPlugin::Psudo\_WeighingScales, LOCTEXT("Psudo\_WeighingScales", "Psudo Player Weight"), FKeyDetails::Axis));
	const\_cast<UInputSettings\*\>(GetDefault<UInputSettings\>())\-\>AddAxisMapping(FInputAxisKeyMapping("PsudoWeighingScales", IPsudoControllerPlugin::Psudo\_WeighingScales, 1.0F));
 
	FPsudoControllerPlugin::PsudoInput \= MakeShareable(new FPsudoControllerInputDevice(InMessageHandler));
 
	return PsudoInput;
}
 
#undef LOCTEXT\_NAMESPACE
 
// This function may be called during shutdown to clean up the module.
void FPsudoControllerPlugin::ShutdownModule()
{
	FPsudoControllerPlugin::PsudoInput\-\>~FPsudoControllerInputDevice();
 
	UE\_LOG(PsudoControllerPlugin, Log, TEXT("Shutdown Module"));
}

### Input Device Header File

**/Plugins/PsudoController/Source/PsudoController/Private/PsudoControllerInputDevice.h**

#pragma once
 
#include "IInputDevice.h"
 
#define MAX\_NUM\_PSUDO\_INPUT\_CONTROLLERS	4 // We dont realy have any input controllers, this is a sham! :P
#define NUM\_PSUDO\_INPUT\_BUTTONS			6 // I've only used the one button but w/evs
 
/\*\*
\* Type definition for shared pointers to instances of FMessageEndpoint.
\*/
// ToDo: Is this necessary?
typedef TSharedPtr<class FPsudoControllerInputDevice\> FPsudoControllerInputDevicePtr;
 
/\*\*
\* Type definition for shared references to instances of FMessageEndpoint.
\*/
// ToDo: Is this necessary?
typedef TSharedRef<class FPsudoControllerInputDevice\> FPsudoControllerInputDeviceRef;
 
/\*\*
\* Interface class for WiiInput devices (wii devices)
\*/
class FPsudoControllerInputDevice : public IInputDevice
{
public:
	FPsudoControllerInputDevice(const TSharedRef< FGenericApplicationMessageHandler \>& MessageHandler);
 
	/\*\* Tick the interface (e.g. check for new controllers) \*/
	virtual void Tick(float DeltaTime) OVERRIDE;
 
	/\*\* Poll for controller state and send events if needed \*/
	virtual void SendControllerEvents() OVERRIDE;
 
	/\*\* Set which MessageHandler will get the events from SendControllerEvents. \*/
	virtual void SetMessageHandler(const TSharedRef< FGenericApplicationMessageHandler \>& InMessageHandler) OVERRIDE;
 
	/\*\* Exec handler to allow console commands to be passed through for debugging \*/
	virtual bool Exec(UWorld\* InWorld, const TCHAR\* Cmd, FOutputDevice& Ar) OVERRIDE;
 
	// IForceFeedbackSystem pass through functions
	virtual void SetChannelValue(int32 ControllerId, FForceFeedbackChannelType ChannelType, float Value) OVERRIDE;
	virtual void SetChannelValues(int32 ControllerId, const FForceFeedbackValues &values) OVERRIDE;
 
	virtual ~FPsudoControllerInputDevice();
private:
	// ToDo: Is this necessary?
	bool Active;
 
	/\*\* Delay before sending a repeat message after a button was first pressed \*/
	float InitialButtonRepeatDelay; // How long a button is held for before you send a 2nd event
 
	/\*\* Delay before sending a repeat message after a button has been pressed for a while \*/
	float ButtonRepeatDelay; // How long a button is held for before you send a 3rd/4th/e.t.c event
 
	EControllerButtons::Type PsudoInputButtonMapping\[NUM\_PSUDO\_INPUT\_BUTTONS\];
 
	/\*\* Last frame's button states, so we only send events on edges \*/
	bool PreviousButtonStates\[NUM\_PSUDO\_INPUT\_BUTTONS\];
 
	/\*\* Next time a repeat event should be generated for each button \*/
	double NextRepeatTime\[NUM\_PSUDO\_INPUT\_BUTTONS\];
 
	TSharedRef< FGenericApplicationMessageHandler \> MessageHandler;
};

### Input Device Cpp File

**/Plugins/PsudoController/Source/PsudoController/Private/PsudoControllerInputDevice.cpp**

#include "PsudoControllerPrivatePCH.h"
 
#include "GenericPlatformMath.h"
 
#include "PsudoControllerInputDevice.h"
 
#include "Slate.h"
 
#include "WindowsApplication.h"
#include "WindowsWindow.h"
#include "WindowsCursor.h"
#include "GenericApplicationMessageHandler.h"
#include "IInputDeviceModule.h"
#include "IInputDevice.h"
 
DEFINE\_LOG\_CATEGORY\_STATIC(LogPsudoControllerDevice, Log, All);
 
FPsudoControllerInputDevice::FPsudoControllerInputDevice(const TSharedRef< FGenericApplicationMessageHandler \>& InMessageHandler) : Active(true), MessageHandler(InMessageHandler) {
	UE\_LOG(LogPsudoControllerDevice, Log, TEXT("Starting PsudoControllerInputDevice"));
 
	// Initialize button repeat delays
	InitialButtonRepeatDelay \= 0.2f;
	ButtonRepeatDelay \= 0.1f;
 
	// Setting all buttons on my psudo controllers to 'not pressed' 
	// (You should check the inital state of your controllers)
	PreviousButtonStates\[NUM\_PSUDO\_INPUT\_BUTTONS\] \= { 0 };
	//NextRepeatTime\[NUM\_PSUDO\_INPUT\_BUTTONS\] = { 0.0 };
 
	// Initialize mapping of controller button mask to unreal button mask
	// - mapping 0-3 to the 'FaceButtons'
	// --- 'X','Square','Circle','Triangle' for playstation
	// --- 'A','X','B','Y' on xbox
	PsudoInputButtonMapping\[0\] \= EControllerButtons::FaceButtonTop;		// PSUDO\_BUTTON\_ZERO
	PsudoInputButtonMapping\[1\] \= EControllerButtons::FaceButtonBottom;	// PSUDO\_BUTTON\_ONE
	PsudoInputButtonMapping\[2\] \= EControllerButtons::FaceButtonLeft;	// PSUDO\_BUTTON\_TWO
	PsudoInputButtonMapping\[3\] \= EControllerButtons::FaceButtonRight;	// PSUDO\_BUTTON\_THREE
	// - mapping 4-5 to the left joystick (traditionally used for movement controls)
	PsudoInputButtonMapping\[4\] \= EControllerButtons::LeftAnalogX;		// PSUDO\_BUTTON\_FOUR
	PsudoInputButtonMapping\[5\] \= EControllerButtons::LeftAnalogY;		// PSUDO\_BUTTON\_FIVE
}
 
void FPsudoControllerInputDevice::Tick(float DeltaTime) {
	// This will spam the log heavily, comment it out for real plugins :)
	UE\_LOG(LogPsudoControllerDevice, Log, TEXT("Tick %f"), DeltaTime);
}
 
void FPsudoControllerInputDevice::SendControllerEvents() {
	// Here is where we check the state of our input device proberbly by calling a method in your third party libary...
	//  - I dont have a real device (xbox controller, wiimote, e.t.c.) in this tutorial :'( so we will just pretend!!!
 
	// I could make libary to read from a fancy set of 'matrix' cerebellum jacks and iterate over each of those 'controllers'.. but ill save that for the next tutorial
	int controllerIndex \= 0; // Apparantly I was lazy so there is only one controller firing events today!
 
	const double CurrentTime \= FPlatformTime::Seconds(); 
	const float CurrentTimeFloat \= FPlatformTime::ToSeconds(FPlatformTime::Cycles()); // Works with FMath functions
 
	// This weard statement simulates user holding down the button 1/3 of the time
	if (FMath::Fmod(CurrentTimeFloat, 1.5f) < .5f) {
		// If the button was pressed this tick
		if (!PreviousButtonStates\[1\]) {
			// Fire button pressed event
			MessageHandler\-\>OnControllerButtonPressed(PsudoInputButtonMapping\[1\], controllerIndex, false);
 
			// this button was pressed - set the button's NextRepeatTime to the InitialButtonRepeatDelay
			NextRepeatTime\[1\] \= CurrentTime + InitialButtonRepeatDelay;
			PreviousButtonStates\[1\] \= true;
		// If the buttons has been held long enough to fire a nth event
		} else if (NextRepeatTime\[1\] <= CurrentTime) {
			// Fire button held event
			MessageHandler\-\>OnControllerButtonPressed(PsudoInputButtonMapping\[1\], controllerIndex, true);
 
			// set the button's NextRepeatTime to the ButtonRepeatDelay
			NextRepeatTime\[1\] \= CurrentTime + ButtonRepeatDelay;
		}
	// If the button was released this tick
	}
	else if (PreviousButtonStates\[1\]) {
		UE\_LOG(LogPsudoControllerDevice, Log, TEXT("Release"));
		// Fire button released event
		MessageHandler\-\>OnControllerButtonReleased(PsudoInputButtonMapping\[1\], controllerIndex, false);
		PreviousButtonStates\[1\] \= false;
	}
 
	// This simulates the user moving the stick left and right repeatedly
	float xMove \= FMath::Sin(CurrentTimeFloat \* .223f \* 2 \* PI);
	// Fire analog input event
	MessageHandler\-\>OnControllerAnalog(PsudoInputButtonMapping\[4\], controllerIndex, xMove);
 
	// This simulates the user moving the stick up and down repeatedly
	float yMove \= FMath::Cos(CurrentTimeFloat \* .278f \* 2 \* PI);
	// Fire analog input event
	MessageHandler\-\>OnControllerAnalog(PsudoInputButtonMapping\[5\], controllerIndex, yMove);
 
	// This will spam the log heavily, comment it out for real plugins :)
	UE\_LOG(LogPsudoControllerDevice, Log, TEXT("Sending Controller Events jump%d, x%f, y%f"), PreviousButtonStates\[1\], xMove, yMove);
 
	// This is how you fire your fancypantz new controller events... the ones you added because you couldn't find an existing EControllerButton that matched your needs!
	FSlateApplication::Get().OnControllerAnalog(IPsudoControllerPlugin::Psudo\_WeighingScales, controllerIndex, 75); // This will spam 75(kg) to my fancy new output type!
}
 
void FPsudoControllerInputDevice::SetMessageHandler(const TSharedRef< FGenericApplicationMessageHandler \>& InMessageHandler) {
	UE\_LOG(LogPsudoControllerDevice, Log, TEXT("Set Message Handler"));
	MessageHandler \= InMessageHandler;
}
 
bool FPsudoControllerInputDevice::Exec(UWorld\* InWorld, const TCHAR\* Cmd, FOutputDevice& Ar) {
	UE\_LOG(LogPsudoControllerDevice, Log, TEXT("Execute Console Command: %s"), Cmd);
 
	// Put your fancy custom console command code here... 
	// ToDo: use this to let you fire psudo controller events
 
	return true;
}
 
// IForceFeedbackSystem pass through functions
//  - I \*believe\* this is a handel for the game to communicate back to your third party libary (i.e. game tells joystick to increase force feedback/vibrate/turn on/off a light)
void FPsudoControllerInputDevice::SetChannelValue(int32 ControllerId, FForceFeedbackChannelType ChannelType, float Value) {
	UE\_LOG(LogPsudoControllerDevice, Log, TEXT("Set Force Feedback %f"), Value);
}
void FPsudoControllerInputDevice::SetChannelValues(int32 ControllerId, const FForceFeedbackValues &values) {
	// This will spam the log heavily, comment it out for real plugins :)
	UE\_LOG(LogPsudoControllerDevice, Log, TEXT("Set Force Feedback Values"));
}
 
// This is where you nicely clean up your plugin when its told to shut down!
//  - USE THIS PLEASE!!! no one likes memory leaks >\_<
FPsudoControllerInputDevice::~FPsudoControllerInputDevice() {
	UE\_LOG(LogPsudoControllerDevice, Log, TEXT("Closing PsudoControllerInputDevice"));
}

### Input Device Cpp File

**/Plugins/PsudoController/Source/PsudoController/Classes/PsudoActor.cpp**

// Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
#include "PsudoControllerPrivatePCH.h"
 
#include "Engine.h"
#include "PsudoActorObject.h"
 
#include "PsudoControllerPlugin.h"
#include "PsudoControllerInputDevice.h"
 
DEFINE\_LOG\_CATEGORY\_STATIC(LogPsudoActor, Log, All);
 
// Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
 
APsudoActorObject::APsudoActorObject(const class FPostConstructInitializeProperties& PCIP) : Super(PCIP) {
	UE\_LOG(LogPsudoActor, Log, TEXT("Construct"));
}
 
void APsudoActorObject::FunkyMethod() {
	UE\_LOG(LogPsudoActor, Log, TEXT("FunkyMethod()"));
}

### Input Device Cpp File

**/Plugins/PsudoController/Source/PsudoController/Classes/PsudoActor.h**

#pragma once
#include "GameFramework/Actor.h"
#include "PsudoActorObject.generated.h"
 
UCLASS(MinimalAPI, hidecategories \= (Input))
class APsudoActorObject : public AActor
{
	GENERATED\_UCLASS\_BODY()
 
	UFUNCTION(BlueprintCallable, Category \= "Development")
	virtual void FunkyMethod();
};

[mspe044](/index.php?title=User:Mspe044&action=edit&redlink=1 "User:Mspe044 (page does not exist)") ([talk](/index.php?title=User_talk:Mspe044&action=edit&redlink=1 "User talk:Mspe044 (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Custom\_Input\_Devices&oldid=10252](https://wiki.unrealengine.com/index.php?title=Custom_Input_Devices&oldid=10252)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)