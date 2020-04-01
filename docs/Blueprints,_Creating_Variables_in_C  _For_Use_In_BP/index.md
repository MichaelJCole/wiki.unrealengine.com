Blueprints, Creating Variables in C++ For Use In BP - Epic Wiki              

Blueprints, Creating Variables in C++ For Use In BP
===================================================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Example: PlayerMusicSkillLevel](#Example:_PlayerMusicSkillLevel)
*   [2 Why Create a Variable in C++ When It Is Used in BP?](#Why_Create_a_Variable_in_C.2B.2B_When_It_Is_Used_in_BP.3F)
*   [3 Core Syntax](#Core_Syntax)
*   [4 Comments](#Comments)
*   [5 Restricting Variable Access](#Restricting_Variable_Access)
    *   [5.1 EditDefaultsOnly](#EditDefaultsOnly)
    *   [5.2 BlueprintReadOnly](#BlueprintReadOnly)
    *   [5.3 VisibleAnywhere](#VisibleAnywhere)
*   [6 Fancier Naming](#Fancier_Naming)
    *   [6.1 Category Name](#Category_Name)
*   [7 Summary](#Summary)

Overview
--------

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here is how you create a property in a c++ base class,

so that it can be accessed in the blueprinted version of your base class that you see in the Editor!

### Example: PlayerMusicSkillLevel

Let's say you have a blueprinted player controller class,

and you want to add a variable: PlayerMusicSkillLevel

  
**This is a variable that other project members want to be able to read and write to from blueprints!**

[![Varbpcppnew.jpg](https://d3ar1piqh1oeli.cloudfront.net/b/b6/Varbpcppnew.jpg/700px-Varbpcppnew.jpg)](/File:Varbpcppnew.jpg)

Why Create a Variable in C++ When It Is Used in BP?
---------------------------------------------------

Not everyone in the project will be working in C++, and not everyone will be working all the time in blueprints!

To easily have access to variables in both C++ and blueprints, the variables should be created in the C++ base class, which is then blueprinted.

Then both the C++ programmers and the blueprint programmers can access the variable data any time!

Core Syntax
-----------

/\*\* What is the Player's current musical skill level? \*/
UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\=PlayerMusicSkill)
int32 MusicSkillLevel;

Comments
--------

Comments that you write as shown will be very neatly and wonderfully shown when the user hovers the mouse over the variable name in the Editor!

/\*\* What is the Player's current musical skill level? \*/

Restricting Variable Access
---------------------------

### EditDefaultsOnly

If you want team members to be able to access and edit a C++ variable, but only prior to runtime, use EditDefaultsOnly

UPROPERTY(EditDefaultsOnly, BlueprintReadWrite, Category\=PlayerMusicSkill)

### BlueprintReadOnly

If you do not ever want a variable to be modified via blueprints, but it should be easily read from, use BlueprintReadOnly.

This is important if a variable is part of a system, and a function should be used to modify the variable.

For example, if the blueprint user wants to increase the MusicSkillLevel,

but in the game, **the player can only increase their MusicSkillLevel under certain conditions that are only checked in C++**,

then you do not want the blueprint user to just directly increment the MusicSkillLevel,

and they should instead use your C++ function IncreaseMusicSkillLevel().

UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category\=PlayerMusicSkill)

### VisibleAnywhere

If you want a value to be visible in blueprint default properties, but not editable,

UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category\=PlayerMusicSkill)

  

Fancier Naming
--------------

### Category Name

If you use quotation marks you can create fancier category names!

UPROPERTY(EditDefaultsOnly, BlueprintReadWrite, Category\="PlayerMusicSkill ~ Yay!")

Summary
-------

Now you know how to enable both C++ and Blueprints to access custom variable data specific to your project!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprints,\_Creating\_Variables\_in\_C%2B%2B\_For\_Use\_In\_BP&oldid=3908](https://wiki.unrealengine.com/index.php?title=Blueprints,_Creating_Variables_in_C%2B%2B_For_Use_In_BP&oldid=3908)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")