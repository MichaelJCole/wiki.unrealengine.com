Game User Settings - Epic Wiki                    

Game User Settings
==================

**Rate this Guide:**

4.80

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_half.gif) (5 votes)

Approved for Versions:4.6

In this guide we will look at the options for changing game settings, such as whether or not to use fullscreen, the window or fullscreen resolution used, the position of the window, and scalability/graphics settings.

This is a guide written by [Furyhunter](/User:Furyhunter "User:Furyhunter").

The UGameUserSettings class
---------------------------

API documentation: `[UGameUserSettings](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/UGameUserSettings/index.html)`

This class is not exposed to Blueprint so you'll have to work with it via a game code module. A pointer to the global `UGameUserSettings` can be found in the global `GEngine`.

UGameUserSettings\* GetGameUserSettings()
{
    if (GEngine !\= nullptr)
    {
        return GEngine\-\>GameUserSettings;
    }
    return nullptr;
}

Several of the values used internally by this class are saved to the GameUserSettings.ini config file. If you have external automation needs, this would be the place to start.

Setting the mode
----------------

When you use the various mode setting functions, the mode is not immediately applied, much like you would expect from a PC game settings menu. Instead, the value is saved to the Game config. To set up a mode test flow (e.g. user selects mode, clicks apply, and is prompted to confirm if the mode is worked), you should use the following:

int32 Width \= 1280, Height \= 720;
UGameUserSettings\* Settings \= GetGameUserSettings(); // note we are using the function defined above
if (Settings !\= nullptr)
{
    Settings\-\>RequestResolutionChange(Width, Height, EWindowMode::Type::Windowed, false); // we can choose to ignore the command line arguments, this is probably best when the game UI sets the mode after startup
}
 
// ...
 
if (UserConfirmed)
{
    Settings\-\>ConfirmVideoMode();
 
    // Save the requested settings to our local data now
    Settings\-\>SetScreenResolution(Settings\-\>GetLastConfirmedScreenResolution());
    Settings\-\>SetFullscreenMode(Settings\-\>GetLastConfirmedFullscreenMode());
    Settings\-\>SaveSettings();
}
else
{
    Settings\-\>RevertVideoMode();
}

Setting the scalability settings
--------------------------------

The `UGameUserSettings` class provides access to a `[FQualityLevels](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/FQualityLevels/index.html)` instance which it refers to when using the `ApplySettings(bool)` and `ApplyNonResolutionSettings()` functions. It is very simple to set these. Note that a `GetQualityLevels()` function exists in `GEngine` to obtain the _current_ quality levels, unrelated to the quality levels in the user settings (these can diverge for the purposes of easy settings dialog implementations).

Settings\-\>ScalabilityQuality.AntiAliasingQuality \= 0; // Use "Low" AA quality
Settings\-\>ScalabilityQuality.ResolutionQuality   \= 3; // Use "Epic" resolution quality
 
Settings\-\>ApplyNonResolutionSettings();
Settings\-\>SaveSettings();

The values range from 0 to 3 and correspond to "Low", "Medium", "High" and "Epic" as in the editor quick settings dialog and in the scalability cvars. The actual meaning of these (e.g. the cvar presets to use) can be set in Scalability.ini (some sane defaults are copied to your Saved/CleanSourceConfigs and are a good basis for your own). [More info on Scalability from UE4 documentation](https://docs.unrealengine.com/latest/INT/Engine/Performance/Scalability/ScalabilityReference/index.html).

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Game\_User\_Settings&oldid=11783](https://wiki.unrealengine.com/index.php?title=Game_User_Settings&oldid=11783)"

[Categories](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)