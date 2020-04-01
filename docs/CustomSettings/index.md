CustomSettings - Epic Wiki                    

CustomSettings
==============

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Custom settings](#Custom_settings)
        *   [1.1.1 Creating your settings object](#Creating_your_settings_object)
        *   [1.1.2 Registering the object with our module](#Registering_the_object_with_our_module)
    *   [1.2 Using Auto-discovery Settings](#Using_Auto-discovery_Settings)
    *   [1.3 Summary](#Summary)

Overview
--------

_Original Author:_ [Moss](/User:Moss "User:Moss") (GitHub repo: [https://github.com/moritz-wundke/CustomSettings](https://github.com/moritz-wundke/CustomSettings))

Hi guys!

The following tutorial will guide you to expose your config objects (UObjects that have decorated UPROPERTY fields) in a more user-friendly way. What we will do is to expose the configuration fields into the \***Project Settings** part of the editor so you can tweak and change those values from the editor directly without going into the low-level **ini** files.

[![CustomSettings.png](https://d26ilriwvtzlb.cloudfront.net/0/0f/CustomSettings.png)](/File:CustomSettings.png)

### Custom settings

#### Creating your settings object

We will create a simple **UObject** that will hold out config data. The header should be look like the following:

// Copyright 2015 Moritz Wundke. All Rights Reserved.
// Released under MIT.
 
#pragma once
 
#include "CustomGameSettings.generated.h"
 
/\*\*
 \* Setting object used to hold both config settings and editable ones in one place
 \* To ensure the settings are saved to the specified config file make sure to add
 \* props using the globalconfig or config meta.
 \*/
UCLASS(config \= Game, defaultconfig)
class UCustomGameSettings : public UObject
{
	GENERATED\_BODY()
 
public:
	UCustomGameSettings(const FObjectInitializer& ObjectInitializer);
 
	/\*\* Sample bool property \*/
	UPROPERTY(EditAnywhere, config, Category \= Custom)
	bool bSampleBool;
 
	/\*\* Sample float property that requires a restart \*/
	UPROPERTY(EditAnywhere, config, Category \= Custom, meta \= (ConfigRestartRequired \= true))
	float SampleFloatRequireRestart;
 
	/\*\* Sample string list \*/
	UPROPERTY(config, EditAnywhere, Category \= Custom)
	TArray<FString\> SampleStringList;
 
	/\*\* Or add min, max or clamp values to the settings \*/
	UPROPERTY(config, EditAnywhere, Category \= Custom, meta \= (UIMin \= 1, ClampMin \= 1))
	int32 ClampedIntSetting;
 
	/\*\* We can even use asset references \*/
	UPROPERTY(config, EditAnywhere, Category \= Materials, meta \= (AllowedClasses \= "MaterialInterface"))
	FStringAssetReference StringMaterialAssetReference;
 
};

As you can see we have to tell the engine which config file to use, the _UCLASS_ decorators will take care of it. Then to add items to our config we just have to decorate our _UPROPERTY_ fileds with the _config_ or _globalconfig_ flags.

We will just add a stub ctor as our implementation:

// Copyright 2015 Moritz Wundke. All Rights Reserved.
// Released under MIT.
 
#include "CustomSettings.h"
#include "CustomGameSettings.h"
 
UCustomGameSettings::UCustomGameSettings(const FObjectInitializer& ObjectInitializer) : Super(ObjectInitializer)
{
 
}

#### Registering the object with our module

You can register the object to any game module, this will work for your game modules or even plugins. What we have to do is to create a child class of our **IModuleInterface**, plugins and game modules will inherit from different classes but the process of registering settings will be exactly the same.

So we will have to override the _StartupModule_ and _ShutdownModule_ functions, in our case I will also override _SupportsDynamicReloading_. The idea is to register our settings object in _StartModule_ and unregister them in _ShutdownModule_.

Our module source should be something like the following:

// Copyright 2015 Moritz Wundke.All Rights Reserved.
// Released under MIT.
 
#include "CustomSettings.h"
 
// Settings
#include "CustomGameSettings.h"
#include "ISettingsModule.h"
#include "ISettingsSection.h"
#include "ISettingsContainer.h"
 
#define LOCTEXT\_NAMESPACE "CustomSettings"
 
class FCustomSettingsModule : public FDefaultGameModuleImpl
{
	virtual void StartupModule() override
	{
		RegisterSettings();
	}
 
	virtual void ShutdownModule() override
	{
		if (UObjectInitialized())
		{
			UnregisterSettings();
		}
	}
 
	virtual bool SupportsDynamicReloading() override
	{
		return true;
	}
 
private:
 
	// Callback for when the settings were saved.
	bool HandleSettingsSaved()
	{
		UCustomGameSettings\* Settings \= GetMutableDefault<UCustomGameSettings\>();
		bool ResaveSettings \= false;
 
		// You can put any validation code in here and resave the settings in case an invalid
		// value has been entered
 
		if (ResaveSettings)
		{
			Settings\-\>SaveConfig();
		}
 
		return true;
	}
 
	void RegisterSettings()
	{
		// Registering some settings is just a matter of exposing the default UObject of
		// your desired class, feel free to add here all those settings you want to expose
		// to your LDs or artists.
 
		if (ISettingsModule\* SettingsModule \= FModuleManager::GetModulePtr<ISettingsModule\>("Settings"))
		{
			// Create the new category
			ISettingsContainerPtr SettingsContainer \= SettingsModule\-\>GetContainer("Project");
 
			SettingsContainer\-\>DescribeCategory("CustomSettings",
				LOCTEXT("RuntimeWDCategoryName", "CustomSettings"),
				LOCTEXT("RuntimeWDCategoryDescription", "Game configuration for the CustomSettings game module"));
 
			// Register the settings
			ISettingsSectionPtr SettingsSection \= SettingsModule\-\>RegisterSettings("Project", "CustomSettings", "General",
				LOCTEXT("RuntimeGeneralSettingsName", "General"),
				LOCTEXT("RuntimeGeneralSettingsDescription", "Base configuration for our game module"),
				GetMutableDefault<UCustomGameSettings\>()
				);
 
			// Register the save handler to your settings, you might want to use it to
			// validate those or just act to settings changes.
			if (SettingsSection.IsValid())
			{
				SettingsSection\-\>OnModified().BindRaw(this, &FCustomSettingsModule::HandleSettingsSaved);
			}
		}
	}
 
	void UnregisterSettings()
	{
		// Ensure to unregister all of your registered settings here, hot-reload would
		// otherwise yield unexpected results.
 
		if (ISettingsModule\* SettingsModule \= FModuleManager::GetModulePtr<ISettingsModule\>("Settings"))
		{
			SettingsModule\-\>UnregisterSettings("Project", "CustomSettings", "General");
		}
	}
};
 
IMPLEMENT\_PRIMARY\_GAME\_MODULE( FCustomSettingsModule, CustomSettings, "CustomSettings" );
 
#undef LOCTEXT\_NAMESPACE

As you can see we register our **UCustomGameSettings** into a new category, we can create as many categories as we like but I prefer having one one custom section, if not it will get messy quickly. _HandleSettingsSaved_ gets called once the config object has changed, this is the best place to validate your changes and to act to the config changes to reload any required logic.

### Using Auto-discovery Settings

If you just want to add your settings to the **Game** section of the project settings you can skip all the custom stuff from above and just inherit from **UDeveloperSettings**.

UCLASS(config\=Game, defaultconfig, meta\=(DisplayName\="My Settings"))
class LOADINGSCREEN\_API UMyDeveloperSettings : public UDeveloperSettings
{
    GENERATED\_UCLASS\_BODY()
 
public:
 
    // Add all your properties here as we did before
};

### Summary

Adding settings to your editor makes it easier to modify them and lets non-code folk tweak without the fear of breaking the low-level config files.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=CustomSettings&oldid=17228](https://wiki.unrealengine.com/index.php?title=CustomSettings&oldid=17228)"

[Categories](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)