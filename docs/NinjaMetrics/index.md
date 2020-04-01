NinjaMetrics - Epic Wiki                    

NinjaMetrics
============

  

Name

NinjaMetrics

Category

Analytics

Author

Ninja Metrics, Inc. - support@ninjametrics.com

Version

1.1.0

UE4 Build

4.4.1

Overview
========

The Ninja Metrics plugin provides an implementation of the Unreal Engine in-game analytics engine. Further documentation for in-game analytics can be found at: [https://udn.unrealengine.com/docs/ue4/INT/Gameplay/Analytics/index.html](https://udn.unrealengine.com/docs/ue4/INT/Gameplay/Analytics/index.html).

Download
--------

You can download the latest as a \[[compressed file](https://bitbucket.org/ninja_metrics/ninjametrics-unreal-plugin/get/master.zip)\] or visit our \[[bitbucket repo](https://bitbucket.org/ninja_metrics/ninjametrics-unreal-plugin/overview)\] for full information.

Installation
------------

The code for the Ninja Metrics plugin can be placed in: <gamename>\\Plugins\\NinjaMetrics

The built-in analytics API doesn't support identifying the type of the data being sent to distinguish between strings, floats, and longs as required by the Ninja Metrics JSON interface. The implementation of the Ninja Metrics interface supporting types can be found in the blueprint class UNinjaMetricsEvents including type and range constraints. This allows calling the interface from both C++ code and blueprints.

There is an additional change required in Unreal Engine in ModuleManager.cpp to add a line to 'void FModuleManager::UnloadModulesAtShutdown()':

  

TArray<FModulePair> ModulesToUnload;  

for( FModuleMap::TConstIterator ModuleIt( Modules ); ModuleIt; ++ModuleIt )  

{  

TSharedRef< FModuleInfo > ModuleInfo( ModuleIt.Value() );  

  

// Only if already loaded  

if( ModuleInfo->Module.IsValid() )  

{  

// Only if the module supports shutting down in this phase  

if( ModuleInfo->Module->SupportsAutomaticShutdown() )  

{  

new (ModulesToUnload) FModulePair(ModuleIt.Key(), ModuleIt.Value()->LoadOrder);  

\---> // \[PHX\]\[BS\] Call the PreUnloadCallback before unload.  

\---> ModuleInfo->Module->PreUnloadCallback();  

\---> // \[PHX\]\[BS\]  

}  

}  

}  

To configure using the Ninja Metrics plugin add the following information to your DefaultEngine.ini file for your game from [https://katana.ninjametrics.com/ninja/account/applications](https://katana.ninjametrics.com/ninja/account/applications):

\[Analytics\]  

ProviderModuleName=NinjaMetrics  

ClientID=<ClientID>  

ApplicationID=<ApplicationID>  

AccessToken=<AccessToken>  

  

\[AnalyticsDevelopment\]  

ProviderModuleName=NinjaMetrics  

ClientID=<ClientID>  

ApplicationID=<ApplicationID>  

AccessToken=<AccessToken>  

  

\[AnalyticsTest\]  

ProviderModuleName=NinjaMetrics  

ClientID=<ClientID>  

ApplicationID=<ApplicationID>  

AccessToken=<AccessToken>  

  

\[AnalyticsProduction\]  

ProviderModuleName=NinjaMetrics  

ClientID=<ClientID>  

ApplicationID=<ApplicationID>  

AccessToken=<AccessToken>  

  

Verifying Installation
----------------------

You can verify functionality after these changes by running the Ninja Metrics test suite: Engine\\Binaries\\Win64\\UE4Editor.exe <gamename> -game -automationtests="NinjaMetrics" -unattended -nopause -testexit="Automation Test Queue Empty" -log

The test pass should complete successfully. Output will include the json data for failures to trace issues.

Data can be verified online at [https://katana.ninjametrics.com/ninja/account/logs](https://katana.ninjametrics.com/ninja/account/logs). There is a 5-30 minute latency for updates.

Contact
-------

If you have any Questions, Comments, Bug reports or feature requests for this plugin, or you wish to contact us you can and should email us at [support@ninjametrics.com](mailto:support@ninjametrics.com).

Retrieved from "[https://wiki.unrealengine.com/index.php?title=NinjaMetrics&oldid=14762](https://wiki.unrealengine.com/index.php?title=NinjaMetrics&oldid=14762)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)