Creating Input Devices - Epic Wiki              

Creating Input Devices
======================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Example Code](#Example_Code)
    *   [2.1 Plugin Code](#Plugin_Code)
    *   [2.2 uPlugin Ddefinition](#uPlugin_Ddefinition)
    *   [2.3 Module Build File](#Module_Build_File)
    *   [2.4 IPlugin Header File](#IPlugin_Header_File)
    *   [2.5 PCH File](#PCH_File)
    *   [2.6 Plugin Header File](#Plugin_Header_File)
    *   [2.7 Plugin Cpp File](#Plugin_Cpp_File)
    *   [2.8 Input Device Header File](#Input_Device_Header_File)
    *   [2.9 Input Device Cpp File](#Input_Device_Cpp_File)

Overview
--------

This page will detail how to create custom Input Device plugins in order to add support for additional controller/input types. It will also show example code for adding additional Key/Gamepad Input Names. The code will show how to fire events from the existing Input Names via a MessageHandler and how to fire events from any Key/Gamepad Input directly.

WARNING: The code is currently unstable! There is a bug with ForceFeedback that is preventing a build. I will have this fixed by 25th July unless someone fixes it before then.

(Warning: firing direct messages bypasses 'controller#, and therefore does not support local multilayer)

Example Code
------------

The code will show how to create a plugin for a psudo Input Device which will simulate controller#1 pressing the bottom face button every .1 seconds. It will also create a new custom Gamepad Input called "Psudo Player Weight" and fire events for this input with a value of 75.0 (kg).

In your own code you will most likely link your plugin with a static/dynamic library which communicates with you Input Device. When the engine calls FPsudoInputsInputDevice::SendControllerEvents() you can then pass on any events/polled controller states using the MessageHandler in a generic way.

### Plugin Code

### uPlugin Ddefinition

**/Plugins/PsudoInputs/PsudoInputs.uplugin**

{
    "FileVersion" : 0,
 
	"FriendlyName" : "Psudo Inputs Plugin"
	"Version" : 0,
	"VersionName" : "0.2",
	"CreatedBy" : "mspe044@gmail.com",
	"EngineVersion" : 1579795,
	"Description" : "I wish I was a real input! :'(",
	"Category" : "MyInputs",
 
	"Modules" :
	\[
		{
			"Name" : "PsudoInputs",
			"Type" : "Runtime",
			"LoadingPhase" : "PreDefault"
		}
	\]
}

### Module Build File

This is where you link to any library supporting your Input Device. There is a sample method 'LoadYourThirdPartyLibraries()' to help you do this however the call to it is currently commented out.

This method will will link to a static library in **.../Plugins/PsudoInputs/Source/PsudoInputs/ThirdParty/LibraryDirName/...** with include files in the sub directory **.../include/** and library code in subdirectoires seprated by compile arcitecture I.E. **.../Win64/VS2013/MyLibrary.lib**

**/Plugins/PsudoInputs/Source/PsudoInputs/PsudoInputs.Build.cs**

namespace UnrealBuildTool.Rules
{
    using System.IO;
 
    public class PsudoInputs : ModuleRules
    {
        public PsudoInputs(TargetInfo Target)
        {
            // I chose not to use PCH, this is proberbly slower and worse
            PCHUsage \= PCHUsageMode.NoSharedPCHs;
 
            // ... add public include paths required here ...
            PublicIncludePaths.AddRange( new string\[\] {
                "PsudoInputs/Public",
            });
 
            // ... add other private include paths required here ...
            PrivateIncludePaths.AddRange( new string\[\] {
                "PsudoInputs/Private",
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
 
            // This will give oyu a relitive path to the module ../PsudoInputs/
            string ModulePath \= Path.GetDirectoryName(RulesCompiler.GetModuleFilename(this.GetType().Name));
            // This will give you a relative path to ../PsudoInputs/ThirdParty/"LibraryDirName"/
            string MyLibraryPath \= Path.Combine(ModulePath, "ThirdParty", "LibraryDirName");
 
            // Use this to keep Win32/Win64/e.t.c. library files in seprate subdirectories
            string ArchitecturePath \= "";
 
            // When you are building for Win64
            if (Target.Platform \== UnrealTargetPlatform.Win64 &&
                WindowsPlatform.Compiler \== WindowsCompiler.VisualStudio2013)
            {
                // We will look for the library in ../PsudoInputs/ThirdParty/MyLibrary/Win64/VS20##/
                ArchitecturePath \= Path.Combine("Win64", "VS" + WindowsPlatform.GetVisualStudioCompilerVersionName());
 
                isLibrarySupported \= true;
            }
            // When you are building for Win32
            else if (Target.Platform \== UnrealTargetPlatform.Win32 &&
                WindowsPlatform.Compiler \== WindowsCompiler.VisualStudio2013)
            {
                // We will look for the library in ../PsudoInputs/ThirdParty/MyLibrary/Win32/VS20##/
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

**/Plugins/PsudoInputs/Source/PsudoInputs/Public/PsudoInputsPlugin.h**

#pragma once
 
#include "ModuleManager.h"
#include "IInputDeviceModule.h"
 
#include "InputCoreTypes.h"
 
/\*\*
 \* The public interface to this module.  In most cases, this interface is only public to sibling modules 
 \* within this plugin.
 \*/
class IPsudoInputsPlugin : public IInputDeviceModule
{
public:
	/\*\*
	 \* Singleton-like access to this module's interface.  This is just for convenience!
	 \* Beware of calling this during the shutdown phase, though.  Your module might have been unloaded already.
	 \*
	 \* @return Returns singleton instance, loading the module on demand if needed
	 \*/
	static inline IPsudoInputsPlugin& Get()
	{
		return FModuleManager::LoadModuleChecked< IPsudoInputsPlugin \>("PsudoInputs");
	}
 
	/\*\*
	 \* Checks to see if this module is loaded and ready.  It is only valid to call Get() if IsAvailable() returns true.
	 \*
	 \* @return True if the module is loaded and ready to use
	 \*/
	static inline bool IsAvailable()
	{
		return FModuleManager::Get().IsModuleLoaded( "PsudoInputs" );
	}
 
	// This is where I declare my fancy new output type 
	//  - It's pretending to be a set of scales like a poor mans Wii Balance Board)
	static const FKey Psudo\_WeighingScales;
};

### PCH File

**/Plugins/PsudoInputs/Source/PsudoInputs/Private/PsudoInputsPrivatePCH**

// You should place include statements to your module's private header files here.  You only need to
// add includes for headers that are used in most of your module's source files though.
 
#include "Core.h"
#include "CoreUObject.h"
 
#include "IPsudoInputsPlugin.h"

### Plugin Header File

**/Plugins/PsudoInputs/Source/PsudoInputs/Private/PsudoInputsPlugin.h**

#pragma once
#include "PsudoInputsPrivatePCH.h"
 
class FPsudoInputsPlugin : public IPsudoInputsPlugin
{
public:
	/\*\* IPsudoInputsInterface implementation \*/
	virtual TSharedPtr< class IInputDevice \> CreateInputDevice(const TSharedRef< FGenericApplicationMessageHandler \>& InMessageHandler);
 
	// This is not required as IInputDeviceModule handels startup!
	//virtual void StartupModule() OVERRIDE; 
	virtual void ShutdownModule() OVERRIDE;
 
	TSharedPtr< class FPsudoInputsInputDevice \> PsudoInputDevice;
};

### Plugin Cpp File

**/Plugins/PsudoInputs/Source/PsudoInputs/Private/PsudoInputsPlugin.c**

#include "PsudoInputsPrivatePCH.h"
 
#include "Internationalization.h" // LOCTEXT
#include "InputCoreTypes.h"
 
#include "PsudoInputsPlugin.h"
 
#include "Engine.h" // Are these both necessary?
#include "EngineUserInterfaceClasses.h" // Are these both necessary?
 
#include "IPsudoInputsPlugin.h"
 
#include "PsudoInputs.generated.inl"
 
IMPLEMENT\_MODULE(FPsudoInputsPlugin, PsudoInputs)
DEFINE\_LOG\_CATEGORY\_STATIC(PsudoInputsPlugin, Log, All);
 
#define LOCTEXT\_NAMESPACE "InputKeys"
 
const FKey IPsudoInputsPlugin::Psudo\_WeighingScales("Psudo\_WeighingScales");
 
// This function is called by \*Application.cpp after startup to instantiate the modules InputDevice
TSharedPtr< class IInputDevice \> FPsudoInputsPlugin::CreateInputDevice(const TSharedRef< FGenericApplicationMessageHandler \>& InMessageHandler)
{
	UE\_LOG(PsudoInputsPlugin, Log, TEXT("Create Input Device"));
 
	// EKey: use these sparingly... only when you need a button/axis/motion that doesn't fit any of the input names that already exist
	//  - I'm defineing my poor mans Wii Balance Board, it will be called "Psudo Player Weight" in the editor
	EKeys::AddKey(FKeyDetails(IPsudoInputsPlugin::Psudo\_WeighingScales, LOCTEXT("Psudo\_WeighingScales", "Psudo Player Weight"), FKeyDetails::Axis));
	const\_cast<UInputSettings\*>(GetDefault<UInputSettings\>())\->AddAxisMapping(FInputAxisKeyMapping("PsudoWeighingScales", IPsudoInputsPlugin::Psudo\_WeighingScales, 1.0F));
 
	FPsudoInputsPlugin::PsudoInputDevice \= MakeShareable(new FPsudoInputsInputDevice(InMessageHandler));
 
	// We return the IInputDevice so that the Application has a handel on it.
	//  - The application will ask for controller updates via 'SendControllerEvents()'
	//  - The application will update the MessageHandler if it changes via 'SetMessageHandler(...)'
	return FPsudoInputsPlugin::PsudoInputDevice;
}
 
#undef LOCTEXT\_NAMESPACE
 
// This function may be called during shutdown to clean up the module.
void FPsudoInputsPlugin::ShutdownModule()
{
	FPsudoInputsPlugin::PsudoInputDevice\->~FPsudoInputsInputDevice();
 
	UE\_LOG(PsudoInputsPlugin, Log, TEXT("Shutdown Module"));
}

### Input Device Header File

**/Plugins/PsudoInputs/Source/PsudoInputs/Private/PsudoInputsInputDevice.h**

#pragma once
//#include "PsudoInputsPluginPrivatePCH.h"
 
#include "IInputDevice.h"
 
#define MAX\_NUM\_PSUDO\_INPUT\_CONTROLLERS	4 // We dont realy have any input controllers, this is a sham! :P
#define NUM\_PSUDO\_INPUT\_BUTTONS			4 // I've only used the one button but w/evs
 
/\*\*
\* Type definition for shared pointers to instances of FMessageEndpoint.
\*/
// ToDo: Is this necessary?
typedef TSharedPtr<class FPsudoInputsInputDevice\> FPsudoInputsInputDevicePtr;
 
/\*\*
\* Type definition for shared references to instances of FMessageEndpoint.
\*/
// ToDo: Is this necessary?
typedef TSharedRef<class FPsudoInputsInputDevice\> FPsudoInputsInputDeviceRef;
 
/\*\*
\* Interface class for my psudo device
\*/
class FPsudoInputsInputDevice : public IInputDevice
{
public:
	FPsudoInputsInputDevice(const TSharedRef< FGenericApplicationMessageHandler \>& MessageHandler);
 
	// Tick the interface (e.g. check for new controllers)
	virtual void Tick(float DeltaTime) OVERRIDE;
 
	// Poll for controller state and send events if needed
	virtual void SendControllerEvents() OVERRIDE;
 
	// Set which MessageHandler will get the events from SendControllerEvents.
	virtual void SetMessageHandler(const TSharedRef< FGenericApplicationMessageHandler \>& InMessageHandler) OVERRIDE;
 
	// Exec handler to allow console commands to be passed through for debugging
	virtual bool Exec(UWorld\* InWorld, const TCHAR\* Cmd, FOutputDevice& Ar) OVERRIDE;
 
	// IForceFeedbackSystem pass through functions
	virtual void SetChannelValue(int32 ControllerId, FForceFeedbackChannelType ChannelType, float Value) OVERRIDE;
	virtual void SetChannelValues(int32 ControllerId, const FForceFeedbackValues &values) OVERRIDE;
 
	virtual ~FPsudoInputsInputDevice();
private:
	// ToDo: Is this necessary?
	bool Active;
 
	/\*\* Delay before sending a repeat message after a button was first pressed \*/
	float InitialButtonRepeatDelay; // How long a button is held for before you send a 2nd event
 
	/\*\* Delay before sending a repeat message after a button has been pressed for a while \*/
	float ButtonRepeatDelay; // How long a button is held for before you send a 3rd/4th/e.t.c event
 
	EControllerButtons::Type PsudoInputButtonMapping\[NUM\_PSUDO\_INPUT\_BUTTONS\];
	double NextRepeatTime\[NUM\_PSUDO\_INPUT\_BUTTONS\];
 
	TSharedRef< FGenericApplicationMessageHandler \> MessageHandler;
};

### Input Device Cpp File

**/Plugins/PsudoInputs/Source/PsudoInputs/Private/PsudoInputsInputDevice.cpp**

#include "PsudoInputsPrivatePCH.h"
 
#include "GenericPlatformMath.h"
 
#include "PsudoInputsInputDevice.h"
 
#include "Slate.h"
 
#include "WindowsApplication.h"
#include "WindowsWindow.h"
#include "WindowsCursor.h"
#include "GenericApplicationMessageHandler.h"
#include "IInputDeviceModule.h"
#include "IInputDevice.h"
 
DEFINE\_LOG\_CATEGORY\_STATIC(LogPsudoInputDevice, Log, All);
 
byte pollState\[MAX\_NUM\_PSUDO\_INPUT\_CONTROLLERS\];
 
FPsudoInputsInputDevice::FPsudoInputsInputDevice(const TSharedRef< FGenericApplicationMessageHandler \>& InMessageHandler) : Active(true), MessageHandler(InMessageHandler)
{
	UE\_LOG(LogPsudoInputDevice, Log, TEXT("Starting PsudoInputsInputDevice"));
 
	InitialButtonRepeatDelay \= 0.2f;
	ButtonRepeatDelay \= 0.1f;
 
	PsudoInputButtonMapping\[0\] \= EControllerButtons::FaceButtonTop;			// PSUDO\_BUTTON\_ONE
	NextRepeatTime\[0\] \= \-1.0;												// Set to !pressed
	PsudoInputButtonMapping\[1\] \= EControllerButtons::FaceButtonBottom;		// PSUDO\_BUTTON\_TWO
	NextRepeatTime\[1\] \= \-1.0;												// Set to !pressed
	PsudoInputButtonMapping\[2\] \= EControllerButtons::FaceButtonLeft;		// PSUDO\_BUTTON\_THREE
	NextRepeatTime\[2\] \= \-1.0;												// Set to !pressed
	PsudoInputButtonMapping\[3\] \= EControllerButtons::FaceButtonRight;		// PSUDO\_BUTTON\_FOUR
	NextRepeatTime\[3\] \= \-1.0;												// Set to !pressed
}
 
// This method runs once every game tick, use it if you need a regular polling event
void FPsudoInputsInputDevice::Tick(float DeltaTime){
}
 
// This method runs every time the game wants to check for controller updates!
void FPsudoInputsInputDevice::SendControllerEvents()
{
	// Commented this out as it will spam the log!
	//UE\_LOG(LogPsudoInputDevice, Log, TEXT("Sending Controller Events"));
 
	// Here is where we check the state of our input device proberbly by calling a method in your third party library...
	//  - I dont have a real device (xbox controller, wiimote, e.t.c.) in this tutorial :'( so im gona fake it!!!
	const double CurrentTime \= FPlatformTime::Seconds();
 
	// I could make library to read from a fancy set of matrix serebellum jacks and iterate over each of those 'controllers'.. but ill save that for the next tutorial
	int controllerIndex \= 0; // Apparantly I was lazy so there is only one controller!
 
	// This is how you fire regular boring controller events... the ones like the green xbox 'A' key (EControllerButtons::FaceButtonBottom)
 
	int jumpButtonIndex \= 0;
 
	// This will make the third person tutorial man jump for player one!
 
	// IF BUTTON IS CURRENTLY PRESSED DOWN BY USER
	//  - If button pressed has not fired since the user pressed the button
	if (NextRepeatTime\[jumpButtonIndex\] \== \-1.0) {
		MessageHandler\->OnControllerButtonPressed(PsudoInputButtonMapping\[jumpButtonIndex\], controllerIndex, false);
 
		NextRepeatTime\[jumpButtonIndex\] \= CurrentTime + InitialButtonRepeatDelay;
	}
	//  - Else If (button pressed has fired > 0 times) && (time since last event > repeat event time)
	else if (NextRepeatTime\[jumpButtonIndex\] <= CurrentTime) {
		MessageHandler\->OnControllerButtonPressed(PsudoInputButtonMapping\[jumpButtonIndex\], controllerIndex, true);
 
		NextRepeatTime\[jumpButtonIndex\] \= CurrentTime + ButtonRepeatDelay;
	}
	// ELSE (BUTTON IS CURRENTLY NOT PRESSED BY USER)
	if (NextRepeatTime\[jumpButtonIndex\] != \-1.0) {
		// You would normally test whether the controll is pressed or released, on release you call: (see XInputInterface.cpp for a nice example)
		//MessageHandler->OnControllerButtonReleased(PsudoInputButtonMapping\[jumpButtonIndex\], controllerIndex, false);
		//NextRepeatTime\[jumpButtonIndex\] = -1.0;
	}
 
 
	InitialButtonRepeatDelay \= 0.2f;
	ButtonRepeatDelay \= 0.1f;
 
	// This is how you fire your fancypantz new controller events... the ones you added because you couldn't find an existing EControllerButton that matched your needs!
	FSlateApplication::Get().OnControllerAnalog(IPsudoInputsPlugin::Psudo\_WeighingScales, controllerIndex, 75); // This will spam 75(kg) to my fancy new output type!
 
}
 
// This method is called every time someone changes the message handler (other hacky plugins might change it to customise it.. we haven't cos we're cool like that)
void FPsudoInputsInputDevice::SetMessageHandler(const TSharedRef< FGenericApplicationMessageHandler \>& InMessageHandler)
{
	UE\_LOG(LogPsudoInputDevice, Log, TEXT("Setting Message Handler"));
	MessageHandler \= InMessageHandler;
}
 
// Exec handler to allow console commands to be passed through for debugging
bool FPsudoInputsInputDevice::Exec(UWorld\* InWorld, const TCHAR\* Cmd, FOutputDevice& Ar){
	UE\_LOG(LogPsudoInputDevice, Log, TEXT("Execute Console Command: %s"), Cmd);
 
	// Put your fancy custom console command code here... I could have used this to let you fire psudo controller events but im lazy..
 
	return true;
}
 
// IForceFeedbackSystem pass through functions
//  - I \*believe\* this is a handel for the game to communicate back to your third party library (i.e. game tells joystick to increase force feedback/vibrate/turn on/off a light)
void FPsudoInputsInputDevice::SetChannelValue(int32 ControllerId, FForceFeedbackChannelType ChannelType, float Value){
	UE\_LOG(LogPsudoInputDevice, Log, TEXT("Set Force Feedback %f"), Value);
}
void FPsudoInputsInputDevice::SetChannelValues(int32 ControllerId, const FForceFeedbackValues &values){
	UE\_LOG(LogPsudoInputDevice, Log, TEXT("Set Force Feedback Values"));
}
 
// This is where you nicely clean up your plugin when its told to shut down!
//  - USE THIS PLEASE!!! no one likes a memory leak >\_<
FPsudoInputsInputDevice::~FPsudoInputsInputDevice() {
	UE\_LOG(LogPsudoInputDevice, Log, TEXT("Shutdown Complete"));
}

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_Input\_Devices&oldid=6624](https://wiki.unrealengine.com/index.php?title=Creating_Input_Devices&oldid=6624)"