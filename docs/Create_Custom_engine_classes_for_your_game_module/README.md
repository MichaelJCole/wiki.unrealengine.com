Create Custom engine classes for your game module - Epic Wiki                     

Create Custom engine classes for your game module
=================================================

**Rate this Article:**

1.50

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_half.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (2 votes)

Approved for Versions:(please verify)

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 Adding Classes](#Adding_Classes)
*   [3 Add UnrealEd dependency](#Add_UnrealEd_dependency)
*   [4 Edit DefaultEngine.ini](#Edit_DefaultEngine.ini)
*   [5 UE4 Answer Hub Related posts](#UE4_Answer_Hub_Related_posts)
*   [6 Extending the editor engine](#Extending_the_editor_engine)
*   [7 How to Include files from another module](#How_to_Include_files_from_another_module)
*   [8 Linking error when exporting component](#Linking_error_when_exporting_component)
*   [9 How can I set up multiple modules so that they can interact? (theoretical explanation)](#How_can_I_set_up_multiple_modules_so_that_they_can_interact.3F_.28theoretical_explanation.29)

Introduction
------------

Creating, custom Engine classes is actually very easy, and there is not much work needed. Why would you want to create custom Engine class ? It's useful, when you need to initialize some data before game or editor will be loaded, during engine initialization, so that data will be accessible after game starts.

Adding Classes
--------------

To get started you will need to add two new classes to your project. Note the "U" prefix, which is required for any non-Actor UCLASS. An actor uses "A":

`

#include "Engine.h"
#include "YourGameEngine.generated.h"
 
UCLASS()
class UYourGameEngine : public UGameEngine
{
	GENERATED_BODY()
}





`

and

`

#include "UnrealEd.h"
#include "YourGameEditorEngine.generated.h"
 
UCLASS()
class UYourGameEditorEngine : public UUnrealEdEngine
{
	GENERATED_BODY()
}





`

Along with standard blank implementation in CPP files.

Add UnrealEd dependency
-----------------------

In your Build.cs file, you will find PublicDependencyModuleNames. Add UnrealEd in it, like this:

`

PublicDependencyModuleNames.AddRange(
    new string[] { 
        "Core", 
        "CoreUObject", 
        "Engine", 
        "InputCore", 
        "UnrealEd"
    });





`

Edit DefaultEngine.ini
----------------------

Now you need to edit DefaultEngine.ini in your project config folder. Open file and add these lines:

`[/Script/Engine.Engine]  
GameEngine=/Script/YourModuleName.YourGameEngine  
EditorEngine=/Script/UnrealEd.EditorEngine  
UnrealEdEngine=/Script/YourModuleName.YourGameEditorEngine  
`

That is it! Now when you compile and run you project, new classes will be used.

If you're creating a custom editor engine, there are some more set-ups that need to be done to ensure a proper building of both game and editor. Refer to [https://answers.unrealengine.com/questions/41509/extending-editor-engine.html](https://answers.unrealengine.com/questions/41509/extending-editor-engine.html) for it.

UE4 Answer Hub Related posts
----------------------------

Extending the editor engine
---------------------------

[https://answers.unrealengine.com/questions/41509/extending-editor-engine.html](https://answers.unrealengine.com/questions/41509/extending-editor-engine.html)

How to Include files from another module
----------------------------------------

[https://answers.unrealengine.com/questions/54681/how-to-include-files-from-another-module.html](https://answers.unrealengine.com/questions/54681/how-to-include-files-from-another-module.html)

Linking error when exporting component
--------------------------------------

[https://answers.unrealengine.com/questions/31640/linking-error-when-exporting-component.html](https://answers.unrealengine.com/questions/31640/linking-error-when-exporting-component.html)

How can I set up multiple modules so that they can interact? (theoretical explanation)
--------------------------------------------------------------------------------------

[https://answers.unrealengine.com/questions/39838/classinterface-multiple-modules-confusion.html](https://answers.unrealengine.com/questions/39838/classinterface-multiple-modules-confusion.html)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Create\_Custom\_engine\_classes\_for\_your\_game\_module&oldid=24128](https://wiki.unrealengine.com/index.php?title=Create_Custom_engine_classes_for_your_game_module&oldid=24128)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)