How to Convert a BP/Content Project to a C++ Project in 8 Steps - Epic Wiki                    

How to Convert a BP/Content Project to a C++ Project in 8 Steps
===============================================================

Contents
--------

*   [1 Content Only to C++ Project Guide](#Content_Only_to_C.2B.2B_Project_Guide)
*   [2 Alternative To Guide Below](#Alternative_To_Guide_Below)
    *   [2.1 Non Destructive](#Non_Destructive)
    *   [2.2 Step 8](#Step_8)
*   [3 Step 1: Download Visual Studio 2013 Express for Desktop](#Step_1:_Download_Visual_Studio_2013_Express_for_Desktop)
*   [4 Step 2: Create a new C++ based project](#Step_2:_Create_a_new_C.2B.2B_based_project)
*   [5 Step 3: Compile in VS](#Step_3:_Compile_in_VS)
*   [6 Step 4: Open YourProjectGameMode.cpp](#Step_4:_Open_YourProjectGameMode.cpp)
*   [7 Step 5: Recompile](#Step_5:_Recompile)
*   [8 Step 6: Copy!](#Step_6:_Copy.21)
*   [9 Step 6: Open UE4 Editor](#Step_6:_Open_UE4_Editor)
*   [10 Step 7: Reparent](#Step_7:_Reparent)
*   [11 Step 8: Celebrate](#Step_8:_Celebrate)

Content Only to C++ Project Guide
---------------------------------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Here is a guide for how to transiation a Content only / BP project to a C++ project!

You retain everything you have in Blueprints, and you gain all the C++ power!

Alternative To Guide Below
--------------------------

I recently tried just using "File -> Add Code To Project" and adding each core class, game mode, character, HUD, and Player controller.

It works great! It's actually simpler than my method below, but you now have both to experiment with :)

You can also right-click on the .uproject file and generate Visual Studio files from there.

### Non Destructive

This guide is a non-destructive process for your original project!

You are only copying files from your current BP-only project, and so there is no chance of damaging your original project!

Just make sure to copy , not move, your original content folder :)

In other words, you can freely try this guide without concern of whether it succeeds or not, and I think you will find it is really not that hard!

### Step 8

**Don't forget step 8 it is very very important!**

Step 1: Download Visual Studio 2013 Express for Desktop
-------------------------------------------------------

[http://www.microsoft.com/en-us/download/details.aspx?id=44914](http://www.microsoft.com/en-us/download/details.aspx?id=44914)

After installation is finished, restart your computer.

Step 2: Create a new C++ based project
--------------------------------------

Create a C++ project from the templates that Epic provides, using the one most similar to your previous game.

So a third person C++ project if you are making a third person game.

Step 3: Compile in VS
---------------------

After the project is finished being created, Visual Studio will open and then you should right click on your new project name in the far right side of the screen and select Build.

Or from the top menu, find Build, and select Build Project

Everything should compile file!

Step 4: Open YourProjectGameMode.cpp
------------------------------------

Navigate to

 Unreal Projects/YourNewProject/Source/YourNewProject/Private 

and find

 YourProjectGameMode.cpp

Comment out the line that starts with DefaultPawnClass, by adding two "/" in front

 //DefaultPawnClass= "something"

Step 5: Recompile
-----------------

Compile this change in VS by navigating to

 Unreal Projects/YourNewProject/YourNewProject.sln

This .sln file is how you make changes to your project's C++ code!

Select Build->Build Solution

**By the way,** if you ever can't find the Build option, its because you have the text editor version of Visual Studio open, you have to re-open your .sln file to see the build option.

Step 6: Copy!
-------------

Delete the content folder for your new project!

Copy your **Content** and **Plugins** folder from previous project!

You may also want to copy some info from your **Config** folder of previous project, but dont just copy it directly!

**Key bindings:** if you dont want to set up your key binds again, copy the relevant portions from the Config files.

Step 6: Open UE4 Editor
-----------------------

a. Make sure all your plugins are enabled from your previous project by going to **Windows->Plugins**.

b. Go to **Windows->World Settings**, and Game Mode, and make a new game mode for your game.

c. Select your existing BP classes for your pawn class, HUD, player controller, etc, if you had them in your previous project.

 At this point you have connected all the circuitry 
 so that your C++ project is using the BP classes you made in your previous project!

Step 7: Reparent
----------------

a. Go to your base BP class for your Character, it should have Character.h in the top right, indicating who its parent class is.

Go to **File->Reparent** and select the name of the new C++ base class, YourNewProjectCharacter

b. Go to your new game mode class that you made and go to **File->Reparent** and select the name of your C++ base class, YourNewProjectGameMode

 Now you have connected your previous BP classes to your new C++ code foundation!

Step 8: Celebrate
-----------------

You're done!

Congratulations!

  
Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_to\_Convert\_a\_BP/Content\_Project\_to\_a\_C%2B%2B\_Project\_in\_8\_Steps&oldid=11776](https://wiki.unrealengine.com/index.php?title=How_to_Convert_a_BP/Content_Project_to_a_C%2B%2B_Project_in_8_Steps&oldid=11776)"

[Categories](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)