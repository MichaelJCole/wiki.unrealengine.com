 Linking Dlls - Epic Wiki             

 

Linking Dlls
============

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)") **Creating and linking DLLs.**

Contents
--------

*   [1 Overview](#Overview)
*   [2 Creating a C++ DLL](#Creating_a_C.2B.2B_DLL)
    *   [2.1 Visual Studio Community 2015](#Visual_Studio_Community_2015)
*   [3 Unreal Engine Project](#Unreal_Engine_Project)
*   [4 Creating the Blueprint](#Creating_the_Blueprint)
*   [5 Project Source Code](#Project_Source_Code)
*   [6 Final Words](#Final_Words)

Overview
--------

This tutorial explains how to link / bind your own [DLL](https://en.wikipedia.org/wiki/Dynamic-link_library) to Unreal Engine 4 and how to use your DLL's methods for visual scripting in a [Blueprint Function Library](https://docs.unrealengine.com/latest/INT/Programming/BlueprintFunctionLibraries/).

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

Creating a C++ DLL
------------------

This article originally centered on binding the DLL but here is also a brief explanation on how to build DLLs in different [IDEs](https://en.wikipedia.org/wiki/Integrated_development_environment).

### Visual Studio Community 2015

*   Create a new project: _menu bar -> File -> New -> Project..._
    
    [![](https://d3ar1piqh1oeli.cloudfront.net/e/e7/VS2015DLLProject.jpg/100px-VS2015DLLProject.jpg)](/index.php?title=File:VS2015DLLProject.jpg)
    
    New Project
    
    1.  In the _New Project_ window on the left select _Installed -> Templates -> Visual C++ -> Win32_.
    2.  Select _Win32 Project_ in the middle.
    3.  _Name:_ the project CreateAndLinkDLLTut and the _Solution name:_ CreateAndLinkDLLTutSol.
    4.  Click _OK_.
        
        [![](https://d3ar1piqh1oeli.cloudfront.net/6/63/VS2015DLLProjectSettings.jpg/100px-VS2015DLLProjectSettings.jpg)](/index.php?title=File:VS2015DLLProjectSettings.jpg)
        
        Application Settings
        
*   In the next window _Win32 Application Wizard - CreateAndLinkDLLTut_ click _Next_.
    1.  In the **Application Settings** select
        *   _Application type: -> DLL_
        *   _Additional options: -> Empty project_
            
            [![](https://d3ar1piqh1oeli.cloudfront.net/3/3d/VS2015DLLProjectMenuBar.jpg/100px-VS2015DLLProjectMenuBar.jpg)](/index.php?title=File:VS2015DLLProjectMenuBar.jpg)
            
            Solution Explorer
            
    2.  Click _Finish_.
*   On the left side of Visual Studio in the _Solution Explorer_ make sure that CreateAndLinkDLLTut is selected.
    
    [![](https://d3ar1piqh1oeli.cloudfront.net/c/c3/VS2015DLLFile.jpg/100px-VS2015DLLFile.jpg)](/index.php?title=File:VS2015DLLFile.jpg)
    
    Wizard
    
    1.  Click _main menu -> Project -> Add Class..._
    2.  In the Add Class window select _Installed -> Visual C++ -> C++ ->_ on the left side and **C++ Class** in the middle then click **Add**.
    3.  In the _Generic C++ Class Wizard_ window fill in CreateAndLinkDLLfile into the _Class name:_ input field. Click _Finish_.
*   On the left side in the _Solution Explorer_ select the file CreateAndLinkDLLfile.h and copy & paste the following code. Replace all automatically generated code.

<syntaxhighlight lang="cpp">

1.  pragma once

1.  define DLL\_EXPORT \_\_declspec(dllexport) //shortens \_\_declspec(dllexport) to DLL\_EXPORT

1.  ifdef \_\_cplusplus //if C++ is used convert it to C to prevent C++'s name mangling of method names

extern "C" {

1.  endif

bool DLL\_EXPORT getInvertedBool(bool boolState); int DLL\_EXPORT getIntPlusPlus(int lastInt); float DLL\_EXPORT getCircleArea(float radius); char DLL\_EXPORT \*getCharArray(char\* parameterText); float DLL\_EXPORT \*getVector4( float x, float y, float z, float w);

1.  ifdef \_\_cplusplus

}

1.  endif

</syntaxhighlight>

*   Then select the file CreateAndLinkDLLfile.cpp and copy & paste the following code. Replace all automatically generated code.

<syntaxhighlight lang="cpp">

1.  pragma once

1.  include "string.h"
2.  include "CreateAndLinkDLLFile.h"

  
//Exported method that invertes a given boolean. bool getInvertedBool(bool boolState) { return bool(!boolState); }

//Exported method that iterates a given int value. int getIntPlusPlus(int lastInt) { return int(++lastInt); }

//Exported method that calculates the are of a circle by a given radius. float getCircleArea(float radius) { return float(3.1416f \* (radius \* radius)); }

//Exported method that adds a parameter text to an additional text and returns them combined. char \*getCharArray(char\* parameterText) { char\* additionalText = " world!";

if (strlen(parameterText) + strlen(additionalText) + 1 > 256) { return "Error: Maximum size of the char array is 256 chars."; }

char combinedText\[256\] = "";

strcpy\_s( combinedText, 256, parameterText); strcat\_s( combinedText, 256, additionalText);

return ( char\* )combinedText; }

//Exported method that adds a vector4 to a given vector4 and returns the sum. float \*getVector4( float x, float y, float z, float w ) { float\* modifiedVector4 = new float\[4\];

modifiedVector4\[0\] = x + 1.0F; modifiedVector4\[1\] = y + 2.0F; modifiedVector4\[2\] = z + 3.0F; modifiedVector4\[3\] = w + 4.0F;

return ( float\* )modifiedVector4; } </syntaxhighlight>

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

*   Save with _menu bar -> File -> Save All_.
*   Set the proper build options for your 64-bit DLL: In the menu bar select **Release** as _Solution Configuration_ and **x64** as _Solution Platform_. ( If you use a 32-bit Windows system please select **x86** instead of x64. )
    
    [![](https://d3ar1piqh1oeli.cloudfront.net/d/d7/VS2015DLLBuildConfiguration.jpg/100px-VS2015DLLBuildConfiguration.jpg)](/index.php?title=File:VS2015DLLBuildConfiguration.jpg)
    
    Configuration
    
*   Build the DLL with _menu bar -> Build -> Build CreateAndLinkDLLTut_. The Output at the bottom should show a message like _\========== Build: 1 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========_.
*   The 64-bit DLL was created in the folder .../CreateAndLinkDLLTutSol/x64/Release/ and is called CreateAndLinkDLLTut.dll. ( The 32-bit DLL was created in the folder .../CreateAndLinkDLLTutSol/Release/ and is called CreateAndLinkDLLTut.dll. [You won't be able to bind the DLL if the platforms are different.](https://answers.unrealengine.com/questions/30927/does-it-make-a-difference-if-you-load-a-custom-win.html) )

Unreal Engine Project
---------------------

[![](https://d3ar1piqh1oeli.cloudfront.net/d/dd/UE4DLLProject.jpg/50px-UE4DLLProject.jpg)](/index.php?title=File:UE4DLLProject.jpg)

New Project

*   On **Unreal Engine**, create a new project: _New Project -> C++ -> Basic Code_.
*   Name the project CreateAndLinkDLLProj and create it.
*   Open **Windows Explorer**.
    1.  Go to the main folder of your created UE4 project.
    2.  Add a folder called [Plugins](https://docs.unrealengine.com/latest/INT/Programming/Plugins/index.html#pluginfolders).
        
        [![](https://d3ar1piqh1oeli.cloudfront.net/e/e9/UE4DLLProjectNewCPlusPlus.jpg/35px-UE4DLLProjectNewCPlusPlus.jpg)](/index.php?title=File:UE4DLLProjectNewCPlusPlus.jpg)
        
        New Class
        
    3.  In the _Plugins_ folder create an other folder called MyTutorialDLLs.
    4.  Copy and paste the DLL CreateAndLinkDLLTut.dll you have created earlier into the folder MyTutorialDLLs.
*   Add a new C++ class to your project in **Unreal Editor**.
*   Choose the _Blueprint Function Library_ as the base class.
    
    [![](https://d3ar1piqh1oeli.cloudfront.net/7/74/UE4DLLProjectBFL.jpg/50px-UE4DLLProjectBFL.jpg)](/index.php?title=File:UE4DLLProjectBFL.jpg)
    
    BFL
    
*   Name your blueprint function library CreateAndLinkDLLTutBFL.
    
    [![](https://d3ar1piqh1oeli.cloudfront.net/9/96/UE4DLLProjectBFLCreate.jpg/50px-UE4DLLProjectBFLCreate.jpg)](/index.php?title=File:UE4DLLProjectBFLCreate.jpg)
    
    Name BFL
    
*   If **Visual Studio** does not open it automatically, open it by double clicking CreateAndLinkDLLTutBFL in the UE4 content browser.
*   Open the CreateAndLinkDLLTutBFL.h and CreateAndLinkDLLTutBFL.cpp files.
    
    [![](https://d3ar1piqh1oeli.cloudfront.net/c/c6/UE4DLLProjectBFLOpenVS.jpg/50px-UE4DLLProjectBFLOpenVS.jpg)](/index.php?title=File:UE4DLLProjectBFLOpenVS.jpg)
    
    Open BFL
    
*   Select the file CreateAndLinkDLLTutBFL.h and copy & paste the following code:

<syntaxhighlight lang="cpp">

1.  pragma once

1.  include "Kismet/BlueprintFunctionLibrary.h"
2.  include "CreateAndLinkDLLTutBFL.generated.h"

  
UCLASS() class CREATEANDLINKDLLPROJ\_API UCreateAndLinkDLLTutBFL : public UBlueprintFunctionLibrary { GENERATED\_BODY()

public:

UFUNCTION(BlueprintCallable, Category = "My DLL Library") static bool importDLL( FString folder, FString name);

  
UFUNCTION(BlueprintCallable, Category = "My DLL Library") static bool importMethodGetInvertedBool( );

UFUNCTION(BlueprintCallable, Category = "My DLL Library") static bool importMethodGetIntPlusPlus( );

UFUNCTION(BlueprintCallable, Category = "My DLL Library") static bool importMethodGetCircleArea( );

UFUNCTION(BlueprintCallable, Category = "My DLL Library") static bool importMethodGetCharArray( );

UFUNCTION( BlueprintCallable, Category = "My DLL Library" ) static bool importMethodGetVector4( );

  
UFUNCTION(BlueprintCallable, Category = "My DLL Library") static bool getInvertedBoolFromDll(bool boolState);

UFUNCTION(BlueprintCallable, Category = "My DLL Library") static int getIntPlusPlusFromDll(int lastInt);

UFUNCTION(BlueprintCallable, Category = "My DLL Library") static float getCircleAreaFromDll(float radius);

UFUNCTION(BlueprintCallable, Category = "My DLL Library") static FString getCharArrayFromDll(FString parameterText);

UFUNCTION( BlueprintCallable, Category = "My DLL Library" ) static FVector4 getVector4FromDll( FVector4 vector4 );

  
UFUNCTION(BlueprintCallable, Category = "My DLL Library") static void freeDLL(); }; </syntaxhighlight>

*   Select the file CreateAndLinkDLLTutBFL.cpp and copy & paste the following code:

<syntaxhighlight lang="cpp">

1.  include "CreateAndLinkDLLProj.h"
2.  include "CreateAndLinkDLLTutBFL.h"

typedef bool(\*\_getInvertedBool)(bool boolState); // Declare a method to store the DLL method getInvertedBool. typedef int(\*\_getIntPlusPlus)(int lastInt); // Declare a method to store the DLL method getIntPlusPlus. typedef float(\*\_getCircleArea)(float radius); // Declare a method to store the DLL method getCircleArea. typedef char\*(\*\_getCharArray)(char\* parameterText); // Declare a method to store the DLL method getCharArray. typedef float\*(\*\_getVector4)(float x, float y, float z, float w); // Declare a method to store the DLL method getVector4.

\_getInvertedBool m\_getInvertedBoolFromDll; \_getIntPlusPlus m\_getIntPlusPlusFromDll; \_getCircleArea m\_getCircleAreaFromDll; \_getCharArray m\_getCharArrayFromDll; \_getVector4 m\_getVector4FromDll;

void \*v\_dllHandle;

  

1.  pragma region Load DLL

// Method to import a DLL. bool UCreateAndLinkDLLTutBFL::importDLL(FString folder, FString name) { FString filePath = \*FPaths::GamePluginsDir() + folder + "/" + name;

if (FPaths::FileExists(filePath)) { v\_dllHandle = FPlatformProcess::GetDllHandle(\*filePath); // Retrieve the DLL. if (v\_dllHandle != NULL) { return true; } } return false; // Return an error. }

1.  pragma endregion Load DLL

1.  pragma region Import Methods

// Imports the method getInvertedBool from the DLL. bool UCreateAndLinkDLLTutBFL::importMethodGetInvertedBool() { if (v\_dllHandle != NULL) { m\_getInvertedBoolFromDll = NULL; FString procName = "getInvertedBool"; // Needs to be the exact name of the DLL method. m\_getInvertedBoolFromDll = (\_getInvertedBool)FPlatformProcess::GetDllExport(v\_dllHandle, \*procName); if (m\_getInvertedBoolFromDll != NULL) { return true; } } return false; // Return an error. }

// Imports the method getIntPlusPlus from the DLL. bool UCreateAndLinkDLLTutBFL::importMethodGetIntPlusPlus() { if (v\_dllHandle != NULL) { m\_getIntPlusPlusFromDll = NULL; FString procName = "getIntPlusPlus"; // Needs to be the exact name of the DLL method. m\_getIntPlusPlusFromDll = (\_getIntPlusPlus)FPlatformProcess::GetDllExport(v\_dllHandle, \*procName); if (m\_getIntPlusPlusFromDll != NULL) { return true; } } return false; // Return an error. }

// Imports the method getCircleArea from the DLL. bool UCreateAndLinkDLLTutBFL::importMethodGetCircleArea() { if (v\_dllHandle != NULL) { m\_getCircleAreaFromDll = NULL; FString procName = "getCircleArea"; // Needs to be the exact name of the DLL method. m\_getCircleAreaFromDll = (\_getCircleArea)FPlatformProcess::GetDllExport(v\_dllHandle, \*procName); if (m\_getCircleAreaFromDll != NULL) { return true; } } return false; // Return an error. }

// Imports the method getCharArray from the DLL. bool UCreateAndLinkDLLTutBFL::importMethodGetCharArray() { if (v\_dllHandle != NULL) { m\_getCharArrayFromDll = NULL; FString procName = "getCharArray"; // Needs to be the exact name of the DLL method. m\_getCharArrayFromDll = (\_getCharArray)FPlatformProcess::GetDllExport(v\_dllHandle, \*procName); if (m\_getCharArrayFromDll != NULL) { return true; } } return false; // Return an error. }

// Imports the method getVector4 from the DLL. bool UCreateAndLinkDLLTutBFL::importMethodGetVector4( ) { if( v\_dllHandle != NULL ) { m\_getVector4FromDll = NULL; FString procName = "getVector4"; // Needs to be the exact name of the DLL method. m\_getVector4FromDll = ( \_getVector4 ) FPlatformProcess::GetDllExport( v\_dllHandle, \*procName ); if( m\_getVector4FromDll != NULL ) { return true; } } return false; // Return an error. }

1.  pragma endregion Import Methods

1.  pragma region Method Calls

// Calls the method getInvertedBoolFromDll that was imported from the DLL. bool UCreateAndLinkDLLTutBFL::getInvertedBoolFromDll(bool boolState) { if (m\_getInvertedBoolFromDll != NULL) { bool out = bool(m\_getInvertedBoolFromDll(boolState)); // Call the DLL method with arguments corresponding to the exact signature and return type of the method. return out; } return boolState; // Return an error. }

// Calls the method m\_getIntPlusPlusFromDll that was imported from the DLL. int UCreateAndLinkDLLTutBFL::getIntPlusPlusFromDll(int lastInt) { if (m\_getIntPlusPlusFromDll != NULL) { int out = int(m\_getIntPlusPlusFromDll(lastInt)); // Call the DLL method with arguments corresponding to the exact signature and return type of the method. return out; } return -32202; // Return an error. }

// Calls the method m\_getCircleAreaFromDll that was imported from the DLL. float UCreateAndLinkDLLTutBFL::getCircleAreaFromDll(float radius) { if (m\_getCircleAreaFromDll != NULL) { float out = float(m\_getCircleAreaFromDll(radius)); // Call the DLL method with arguments corresponding to the exact signature and return type of the method. return out; } return -32202.0F; // Return an error. }

// Calls the method m\_getCharArrayFromDLL that was imported from the DLL. FString UCreateAndLinkDLLTutBFL::getCharArrayFromDll(FString parameterText) { if (m\_getCharArrayFromDll != NULL) { char\* parameterChar = TCHAR\_TO\_ANSI(\*parameterText);

char\* returnChar = m\_getCharArrayFromDll(parameterChar);

return (ANSI\_TO\_TCHAR(returnChar)); } return "Error: Method getCharArray was probabey not imported yet!"; // Return an error. }

// Calls the method m\_getVector4FromDll that was imported from the DLL. FVector4 UCreateAndLinkDLLTutBFL::getVector4FromDll( FVector4 vector4 ) { if( m\_getVector4FromDll != NULL ) { float\* vector4Array = m\_getVector4FromDll( vector4.X, vector4.Y, vector4.Z, vector4.W );

return FVector4( vector4Array\[0\], vector4Array\[1\], vector4Array\[2\], vector4Array\[3\] ); } return FVector4( -32202.0F, -32202.0F, -32202.0F, -32202.0F ); // Return an error. }

1.  pragma endregion Method Calls

  

1.  pragma region Unload DLL

// If you love something set it free. void UCreateAndLinkDLLTutBFL::freeDLL() { if (v\_dllHandle != NULL) { m\_getInvertedBoolFromDll = NULL; m\_getIntPlusPlusFromDll = NULL; m\_getCircleAreaFromDll = NULL; m\_getCharArrayFromDll = NULL; m\_getVector4FromDll = NULL;

FPlatformProcess::FreeDllHandle(v\_dllHandle); v\_dllHandle = NULL; } }

1.  pragma endregion Unload DLL

</syntaxhighlight>

*   Save with _menu bar -> File -> Save All_.

Creating the Blueprint
----------------------

*   First hit the **Compile** button [![PD CompileButton.PNG](https://d26ilriwvtzlb.cloudfront.net/c/cb/PD_CompileButton.PNG)](/index.php?title=File:PD_CompileButton.PNG) of the **Unreal Editor** to compile the code you've added and saved in Visual Studio before.
*   In **Unreal Editor** add a new _Blueprint Class_ called BP\_DllTest and open it. ([How to create a blueprint class](https://docs.unrealengine.com/latest/INT/Engine/Blueprints/UserGuide/Types/ClassBlueprint/Creation/index.html))
*   Select the **Event Graph** and add the following nodes construct ( Click it and click it again to download it! ). Important note: If you don't see the functions in the dropdown, try compiling from Visual Studio and then reopening UE4. If this doesn't work, close UE4, remove Binaries folder and Intermediate folder (but avoid deleting Intermediate/Project Files). You will be prompted to rebuild the project.

[![UE4DLLProjectBSS.png](https://d26ilriwvtzlb.cloudfront.net/e/e2/UE4DLLProjectBSS.png)](/index.php?title=File:UE4DLLProjectBSS.png)

*   Then compile and save the blueprint and drag & drop it into the level.
*   The result should look like this:

[![UE4DLLProjResult2.jpg](https://d26ilriwvtzlb.cloudfront.net/8/80/UE4DLLProjResult2.jpg)](/index.php?title=File:UE4DLLProjResult2.jpg)

Project Source Code
-------------------

You can download the final [Visual Studio Solution of the DLL](https://github.com/XenoEgger/CreateAndLinkDLLTutSol) and the [Unreal Engine 4 project](https://github.com/XenoEgger/CreateAndLinkDLLProj) from GitHub. ( You may need to rebuild the DLL and copy it to your UE4 _Plugins_ folder. )

Final Words
-----------

*   You can use any DLL from C code or C++ or other languages.
*   You can use unmanaged or managed (CLR, .Net Framework) code from a project in your solution or external.
*   Most issues arise from differences in the signature of the DLL function and the type definition in the Unreal Project.
*   Automatic packaging of third party DLL is not yet supported, you will need to package the DLL, the DLL folder and the plugin folder as well, which is not created in a package by default at this time.
*   Be mindful of load times of DLL, it may slow down your project.
*   Be mindful of processing time of your DLL, your project loses execution control inside the DLL, until it returns, it may be expensive to perform some operations.
*   To go further with this tutorial:
    *   C++ with proper class, namespace and name mangling.
    *   DLL with multithreading and callback example.

  
_Original Author:_ [ZkarmaKun](/index.php?title=User:ZkarmaKun&action=edit&redlink=1 "User:ZkarmaKun (page does not exist)") ([talk](/index.php?title=User_talk:ZkarmaKun&action=edit&redlink=1 "User talk:ZkarmaKun (page does not exist)"))  
_Updated / Improved:_ [F3NR1S](/index.php?title=User:F3NR1S&action=edit&redlink=1 "User:F3NR1S (page does not exist)") ([talk](/index.php?title=User_talk:F3NR1S&action=edit&redlink=1 "User talk:F3NR1S (page does not exist)")), [XenoEgger](/index.php?title=User:XenoEgger&action=edit&redlink=1 "User:XenoEgger (page does not exist)"), [Darkgaze](/index.php?title=User:Darkgaze&action=edit&redlink=1 "User:Darkgaze (page does not exist)")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Linking\_Dlls&oldid=165](https://wiki.unrealengine.com/index.php?title=Linking_Dlls&oldid=165)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")