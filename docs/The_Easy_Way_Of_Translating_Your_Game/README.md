 The Easy Way Of Translating Your Game - Epic Wiki             

 

The Easy Way Of Translating Your Game
=====================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Requirements](#Requirements)
*   [3 The Localization Dashboard](#The_Localization_Dashboard)
*   [4 Standard Interactions](#Standard_Interactions)
*   [5 Setting up the native language](#Setting_up_the_native_language)
*   [6 Adding the new language](#Adding_the_new_language)
*   [7 Translating](#Translating)
*   [8 Compiling](#Compiling)
*   [9 Changing languages from within the game](#Changing_languages_from_within_the_game)
*   [10 End](#End)

Overview
--------

Hey guys to my second wiki page :) Today I'm explaining how to create translations for your game, which is pretty easy with the new, but still experimental toolset you can use out-of-the-box.

Requirements
------------

To use the features we are using below, you need to enable an experimental feature. As of my current version (4.10.2) you do this by opening the **Editor Preferences**, go to the category **Experimental**, and check the entry **Localization Dashboard**. You don't even need to restart the editor! After this, you can find it under the **Window** menu on the top bar. Another requirement: all the elements you want to translate (for example in an UMG widget) need to be variables of the type **Text (FText)**. Strings cannot be translated.

The Localization Dashboard
--------------------------

Lets have a look at the Localization Dashboard first! If you open it, it should look like this:

[![](https://d3ar1piqh1oeli.cloudfront.net/e/ef/LocalizationDashboard1.png/940px-LocalizationDashboard1.png)](/index.php?title=File:LocalizationDashboard1.png)

Localization Dashboard

The first entry, the Localization Service Provider can be ignored for now. More down you see the **Targets** section. In here, you'll set up the localizations for different targets (e.g. Game or Editor). You see the five buttons **Gather All**, **Import All**, **Export All**, **Count Words All** and **Compile All**. Those are the basic interactions for interacting with localizations. A brief explanation of them is below! Then you can see the first target: **Game**. The conflict status displays if yuo have any conflicts with other targets. In your case, it should be an orange exclamation mark. Cultures shows which languages you implement, Word count displays how many words you have translated, and Actions mirrors the standard interactions, but only for this entry (= not all, like the big buttons above).

Standard Interactions
---------------------

*   Gather:
    *   Gathering is another word for "Finding all words". Clicking this will force the engine to search for all words in assets you specify (more below!)
*   Import:
    *   You can import/export translations via a handy file with the extension .po. Importing files will cause the current translation to overwrite.
*   Export:
    *   Should be safe-explaining! You export with this your current translation. This is helpful if you want anyone else to translate your work. There are handy editors (Google Translator Toolbox has this too!) for editing this.
*   Count Words:
    *   Safe-explaining aswell. It basicially counts the words.
*   Compile:
    *   Compiling is the final step when you finished the translation. It basicially puts them in a binary format so the engine can read it.

Setting up the native language
------------------------------

So first, you click on the underlined Game target. This should expand the screen and you have more options below. The relevant category we need to take a look at first is **Gather**. Here we basicially specify how and where we want to find Texts which can be translated. Since we only want to translate Variables - for now - we make a check on the entry **Gather from Packages**. Then, you expand it, and add one entry to the value **Include Path Wildcards**. Then you basicially specify the folder your assets are in which you want to translate. If you want to translate the whole game (which is mostly unnessecary), you just put in your Content/ folder. In my case, I only want to translate my UIs, so I put in the folder where my UMG widgets are in. Now, you should see an culture entry already, this should be **English**. We need to set it to be native, so those are the translations you use originally (= no translation = the value you type in in the UMG editor for example). So, to do that, simply click on the not filled radio button in the "Native" slot. It'll ask you to confirm that, because changes could be lost. After doing this, you are ready to Gather, so just click the Gather or Gather all button! After a short processing time, you can click "Okay". Now the word count progress bar should have updated with an actual word count (don't be afraid if this value is too freaking high!). This language now contains the standard values of your Text variables, so you won't need to change anything there.

Adding the new language
-----------------------

Okay, after all that stuff, lets get to the new language. In my case, I wan't to add german. Click on the fat **Add new Culture** button, and select the language you want (in my case its "German (Germany)"). It'll add a new culture slot there, and the word count is set to zero. You can now gather here aswell, but from my tests, this is currently bugged, because it moves everything into the "Untranslated" category, and I'm not sure how to mark this as translated, so we will use a little but good workaround. However, we need to gather first, so it generates the locale folder for you, so you just click the big **Gather** button or **Gather All**. After that, you find the word count bar at your new language still empty. You then need to export the native language to an file! To do this, click on the little **Export** button in the native language's Actions slot. Select an directory and name it something like "native.po". After the exporting, you import this to your new language's slot. Same here, click on the little **Import** button in the Actions slot. Select the exported file from the native language, and let it proceed. It should work without errors, and your word count bar should be full orange after this!

Translating
-----------

Now, because you just imported the native's file, this will have the same translations as before. To edit them, you click the little **Edit Translations** button in the Actions slot. You'll see new window coming up, containing all words and the translations. The **Preview** tab can be closed, since I think this is unnessecary. You'll see the big list, on the left the original names (= the values you typed in in UMG for example) and on the right the translation. Now, you can start from the top and edit the values so they fit to what you want to have there. Pressing enter will automaticially bring you to the next line, so you can stay in the flow. Once your done, don't forget to hit the Save button in the toolbar!

Compiling
---------

Okay, your translations are done, now you only need them to be in the game. To do that, just hit the big **Compile All** button in the Targets section in your Localization Dashboard. It should run without errors!

Changing languages from within the game
---------------------------------------

Fine, we got translations and shit, but how do we want to change the languages inside the game? There's currently no built-in blueprint node, but I'll show you how to do this with simple C++. To add Blueprint nodes, you go to **File -> New C++ class** and choose the parent class to be a **Blueprint Function Library**. Give it a filename, set it to public, and click Create Class. Will take some time, generate Visual Studio project files (yes, you need VS for it!), and after VS is done doing things, you can proceed writing a bit of code. In the header file (.h), we declare the new function as the following:

	/\* Change Localization at Runtime. \*/
	UFUNCTION(BlueprintCallable, meta \= (DisplayName \= "Change Localization"), Category \= "Locale")
	static void changeLocalization(FString target);

So the whole file looks like this (without the includes):

UCLASS()
class UNIVERSE\_API UBlueprintFunctions : public UBlueprintFunctionLibrary
{
	GENERATED\_BODY()

public:
	/\* Change Localization at Runtime. \*/
	UFUNCTION(BlueprintCallable, meta \= (DisplayName \= "Change Localization"), Category \= "Locale")
	static void changeLocalization(FString target);
};

Ok, lets proceed to the .cpp file and write the implementation. It's simple:

void UBlueprintFunctions::changeLocalization(FString target)
{
	FInternationalization::Get().SetCurrentCulture(target);
}

You see it sets the current culture to a different, depending on a string you input. I'll get to that later. Once you wrote all the code, jump back into the Unreal Editor and hit the big **Compile** button. It should compile your code, and when it is succeeded, you can use the new Blueprint node! I just hook the node up to an InputAction event for the letter 'G', so if I press it, the language will change to german. Now let's get to the string we need to input. It actually takes up the iso-standard namings of the different languages + regions. An example: german is de-DE (de = language; DE = region). To get the name of your culture, simple hover over it in the localization dashboard. Now, it's time to try it out! In my case, I have a main menu with texts which are going to be translated. [Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)") See the final result here:

[![](https://d26ilriwvtzlb.cloudfront.net/e/e6/LocalizationFinal.gif)](/index.php?title=File:LocalizationFinal.gif)

Localization works!

End
---

I hope you enjoyed this wiki entry! If you have questions, errors or want to thank me, please to this [here](https://forums.unrealengine.com/showthread.php?99689-Localization-Tutorial&p=467445#post467445). Thanks :)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=The\_Easy\_Way\_Of\_Translating\_Your\_Game&oldid=247](https://wiki.unrealengine.com/index.php?title=The_Easy_Way_Of_Translating_Your_Game&oldid=247)"