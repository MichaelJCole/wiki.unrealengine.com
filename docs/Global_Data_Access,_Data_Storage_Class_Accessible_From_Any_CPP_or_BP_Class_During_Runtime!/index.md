Global Data Access, Data Storage Class Accessible From Any CPP or BP Class During Runtime - Epic Wiki                     

Global Data Access, Data Storage Class Accessible From Any CPP or BP Class During Runtime
=========================================================================================

(Redirected from [Global Data Access, Data Storage Class Accessible From Any CPP or BP Class During Runtime!](/index.php?title=Global_Data_Access,_Data_Storage_Class_Accessible_From_Any_CPP_or_BP_Class_During_Runtime!&redirect=no "Global Data Access, Data Storage Class Accessible From Any CPP or BP Class During Runtime!"))

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Important Design Consideration](#Important_Design_Consideration)
    *   [1.2 Easy to Set Defaults in Editor](#Easy_to_Set_Defaults_in_Editor)
*   [2 The CPP Base Class](#The_CPP_Base_Class)
    *   [2.1 .h](#.h)
    *   [2.2 .cpp](#.cpp)
    *   [2.3 The BP of the CPP Class](#The_BP_of_the_CPP_Class)
    *   [2.4 Easily Set Default Values Any Time!](#Easily_Set_Default_Values_Any_Time.21)
    *   [2.5 Project Settings->Engine->General](#Project_Settings-.3EEngine-.3EGeneral)
*   [3 Function Library To Access Anywhere in BP](#Function_Library_To_Access_Anywhere_in_BP)
    *   [3.1 .h](#.h_2)
    *   [3.2 .cpp](#.cpp_2)
*   [4 Help My Project Wont Load Any More, Editor Just Crashes](#Help_My_Project_Wont_Load_Any_More.2C_Editor_Just_Crashes)
*   [5 Accessing the Global Data Storage in Blueprints!](#Accessing_the_Global_Data_Storage_in_Blueprints.21)
*   [6 Conclusion](#Conclusion)

Overview
--------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here is a way that Epic recommend to store data you need in a globally accessible way!

Let's say you have an array of classes, item classes, tree classes, whatever, and you need to access this array or add to it from many different CPP or BP classes!

With the help of the Epic-supplied Engine singleton class you can add to a globally accessible data storage during runtime, as well as set default properties to access during runtime.

### Important Design Consideration

I caution you not to use this class for doing calculations of any kind!

Remember any class could be accessing this data at any time and overwriting the contents!

Use this class simply to store data like lists of common textures, common materials, common projectile blueprints, creature BP classes you want to access anytime so you can spawn them, etc.

This is globally accessible data so its contents cannot be relied on for precise or time-sensitive calculations :)

This global storage is ideal however for storing lists/arrays of classes or data **that do not change during runtime.**

### Easy to Set Defaults in Editor

Additinally, via the setup I am showing you below, you can easily edit this global default data inside the editor!

**This makes creating a set of references to various project assets very easy to do!**

The CPP Base Class
------------------

### .h

/\*
 
	By Rama
 
\*/
#pragma once
 
#include "SolusDataSingleton.generated.h"
 
UCLASS(Blueprintable, BlueprintType)
class USolusDataSingleton : public UObject
{
	GENERATED\_UCLASS\_BODY()
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Solus Data Singleton")
	TArray<UClass\*\> SolusTreeBlueprints;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Solus Data Singleton")
	UTexture2D\* SolusT2D;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Solus Data Singleton")
	FVector SolusEssentialVector;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Solus Data Singleton")
	FString SolusCoreFilePath;
};

### .cpp

/\*
 
	By Rama
 
\*/
#include "Solus.h"
#include "SolusDataSingleton.h"
USolusDataSingleton::USolusDataSingleton(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
	SolusCoreFilePath \= "E:/Solus";
 
	SolusEssentialVector \= FVector(9000,0,0);
}

  

### The BP of the CPP Class

[![NewBPDataSingleton.jpg](https://d26ilriwvtzlb.cloudfront.net/1/18/NewBPDataSingleton.jpg)](/File:NewBPDataSingleton.jpg)

### Easily Set Default Values Any Time!

[![DataSingleton setdefaultseasily.jpg](https://d3ar1piqh1oeli.cloudfront.net/8/8b/DataSingleton_setdefaultseasily.jpg/900px-DataSingleton_setdefaultseasily.jpg)](/File:DataSingleton_setdefaultseasily.jpg)

### Project Settings->Engine->General

Make sure to use your BP of the CPP base class!

Then you change the values / add to dynamic arrays, any time in your defaults, and the changes will be up to date when you use the instance during game time!

[![DataSingleton projectsettings.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3a/DataSingleton_projectsettings.jpg)](/File:DataSingleton_projectsettings.jpg)

Function Library To Access Anywhere in BP
-----------------------------------------

### .h

/\*
	Solus Data Singleton Library
 
	by Rama
 
\*/
 
#pragma once
 
//Data Singleton Class
#include "SolusDataSingleton.h"
 
#include "SolusDataSingletonLibrary.generated.h"
 
//note about UBlueprintFunctionLibrary
// This class is a base class for any function libraries exposed to blueprints.
// Methods in subclasses are expected to be static, and no methods should be added to the base class.
 
UCLASS()
class SOLUS\_API USolusDataSingletonLibrary : public UBlueprintFunctionLibrary
{
	GENERATED\_UCLASS\_BODY()
 
	UFUNCTION(BlueprintPure,   Category\="Solus Data Singleton")
	static USolusDataSingleton\* GetSolusData(bool& IsValid);
 
};

### .cpp

/\*
	Solus Data Singleton Library
 
	by Rama
 
\*/
#include "Solus.h"
#include "SolusDataSingletonLibrary.h"
//////////////////////////////////////////////////////////////////////////
// USolusDataSingletonLibrary
 
USolusDataSingletonLibrary::USolusDataSingletonLibrary(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
 
}
 
USolusDataSingleton\* USolusDataSingletonLibrary::GetSolusData(bool& IsValid)
{
	IsValid \= false;
	USolusDataSingleton\* DataInstance \= Cast<USolusDataSingleton\>(GEngine\-\>GameSingleton);
 
	if(!DataInstance) return NULL;
	if(!DataInstance\-\>IsValidLowLevel()) return NULL;
 
	IsValid \= true;
	return DataInstance;
}

Help My Project Wont Load Any More, Editor Just Crashes
-------------------------------------------------------

If your Data Singleton class gets deleted misplaced or renamed in some unusual fashion, you can end up in situation where your project simply will not load!

There's an easy fix!

Just navigate to your **Config/DefaultEngine.ini** and remove the line related to your singleton class which is now missing

 \[/Script/Engine.Engine\]
 GameViewportClientClassName=/Script/Engine.GameViewportClient
 GameViewportClientClassName=/Script/Solus.SolusViewportClient
 LevelScriptActorClassName=/Script/Engine.LevelScriptActor
 LevelScriptActorClassName=/Script/Solus.SolusLevelScriptActor
 GameSingletonClassName=/Game/Rama/SolusDataSingletonBP.SolusDataSingletonBP\_C  ;<-----

Accessing the Global Data Storage in Blueprints!
------------------------------------------------

[![DataSingleTon accessingviaBPlibrary.jpg](https://d26ilriwvtzlb.cloudfront.net/2/2a/DataSingleTon_accessingviaBPlibrary.jpg)](/File:DataSingleTon_accessingviaBPlibrary.jpg)

Conclusion
----------

Now you know a place you can store data that can then be accessed from any BP or CPP class during game time!

Again I recommend you use it primarily for data that doesn't change during runtime, because any class could be editing the global data at any time during gametime :)

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Global\_Data\_Access,\_Data\_Storage\_Class\_Accessible\_From\_Any\_CPP\_or\_BP\_Class\_During\_Runtime&oldid=7832](https://wiki.unrealengine.com/index.php?title=Global_Data_Access,_Data_Storage_Class_Accessible_From_Any_CPP_or_BP_Class_During_Runtime&oldid=7832)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)