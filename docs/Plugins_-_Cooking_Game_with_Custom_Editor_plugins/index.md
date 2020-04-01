Plugins - Cooking Game with Custom Editor plugins - Epic Wiki                    

Plugins - Cooking Game with Custom Editor plugins
=================================================

  
Recently, I ran into an issue with cooking a standalone version of my game using the Development (Non-Editor) build configuration. I was unable to find anything on the Wiki or forums to help, so now that I've solved my issue I wanted to share it here.

### Problem

In my game I created a custom plugin that added functionality to the editor, including new menu items. When cooking a non-editor configuration of my game project I was getting errors from AutomationTool in my plugin. I don't know the specifics of what AutomationTool does but I believe it runs some test execution of code as the error was a check() failing while it was processing my new plugin.

Let's look at an example. Here we have a plugin that is creating commands that can be added to a Menu. Assume that FMyPluginCommands has already been created, and inherits from TCommands. This plugin will suffer from the error.

class FMyPlugin : public IMyPlugin
{
	/\*\* IModuleInterface implementation \*/
	virtual void StartupModule() override
	{
	        FMyPluginCommands::Register();
 
		const FMyPluginCommands& Commands \= FMyPluginCommands::Get();
 
		TSharedPtr<FUICommandList\> CommandsList \= MakeShareable(new FUICommandList);
		CommandsList\-\>MapAction(Commands.MyPluginCommand, FExecuteAction::CreateRaw(this, &FMyPlugin::MyPluginCommand), FCanExecuteAction());
	}
};

The cook process provides a log file that can be used to try to figure out the problem. In the output log, the call stack indicated an assert had failed in the process of registering the commands, most likely because it needs the editor but the configuration is not building the editor. So how do we fix it?

### Solution

The solution is quite simple once I figured out what was needed. I tried wrapping the code with a check for the define WITH\_EDITOR but it seems to always be defined to 1 in the Development configuration, as are some of the other defines that I tried.

In the end the solution ended up being the following ( New code in bold ):

class FMyPlugin : public IMyPlugin
{
	/\*\* IModuleInterface implementation \*/
	virtual void StartupModule() override
	{
                if ( !IsRunningCommandlet() )
                {
	            FMyPluginCommands::Register();
 
		    const FMyPluginCommands& Commands \= FMyPluginCommands::Get();
 
		    TSharedPtr<FUICommandList\> CommandsList \= MakeShareable(new FUICommandList);
		    CommandsList\-\>MapAction(Commands.MyPluginCommand, FExecuteAction::CreateRaw(this, &FMyPlugin::MyPluginCommand), FCanExecuteAction());
                }
	}
};

According to the comment above the definition of IsRunningCommandlet() in Core.h, this function "checks to see if the executable is running custom command-line processing code in an editor-like environment". This check is done in a lot of the Epic provided plugins as well, so I am fairly certain that this is the best method for solving this problem.

I hope this information proves useful for others out there!

\--[Zymatic](/index.php?title=User:Zymatic&action=edit&redlink=1 "User:Zymatic (page does not exist)") ([talk](/index.php?title=User_talk:Zymatic&action=edit&redlink=1 "User talk:Zymatic (page does not exist)")) 17:42, 17 January 2015 (UTC)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Plugins\_-\_Cooking\_Game\_with\_Custom\_Editor\_plugins&oldid=11077](https://wiki.unrealengine.com/index.php?title=Plugins_-_Cooking_Game_with_Custom_Editor_plugins&oldid=11077)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)