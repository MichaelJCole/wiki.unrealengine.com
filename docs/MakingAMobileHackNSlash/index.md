MakingAMobileHackNSlash - Epic Wiki                    

MakingAMobileHackNSlash
=======================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.7

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 What template should I use and does it matter if I pick the wrong one?](#What_template_should_I_use_and_does_it_matter_if_I_pick_the_wrong_one.3F)
*   [3 Should I pick the C++ one or the Blueprints one and is there a difference?](#Should_I_pick_the_C.2B.2B_one_or_the_Blueprints_one_and_is_there_a_difference.3F)
*   [4 If I pick the C++ one, can I still use Blueprints and vice versa?](#If_I_pick_the_C.2B.2B_one.2C_can_I_still_use_Blueprints_and_vice_versa.3F)
*   [5 How do I use the assets that I bought from the Market Place?](#How_do_I_use_the_assets_that_I_bought_from_the_Market_Place.3F)
*   [6 How do I set up animations? What are Animation Blueprints?](#How_do_I_set_up_animations.3F_What_are_Animation_Blueprints.3F)
*   [7 How do I attach things onto my character? What can I attach?](#How_do_I_attach_things_onto_my_character.3F_What_can_I_attach.3F)
*   [8 How do I add a button to make my character attack with his weapon?](#How_do_I_add_a_button_to_make_my_character_attack_with_his_weapon.3F)
*   [9 My character is going to have a spell, how do I add a button for that?](#My_character_is_going_to_have_a_spell.2C_how_do_I_add_a_button_for_that.3F)
*   [10 How do I show a health bar for my character?](#How_do_I_show_a_health_bar_for_my_character.3F)
*   [11 My character has a weapon, how do I make it work?](#My_character_has_a_weapon.2C_how_do_I_make_it_work.3F)
*   [12 I want my character launch a fireball! How do I make him do that?](#I_want_my_character_launch_a_fireball.21_How_do_I_make_him_do_that.3F)
*   [13 I want to give my character an aura! How do I do that?](#I_want_to_give_my_character_an_aura.21_How_do_I_do_that.3F)
*   [14 I want to add things on the floor the player can pick up. How do I do that?](#I_want_to_add_things_on_the_floor_the_player_can_pick_up._How_do_I_do_that.3F)
*   [15 How do I add a potion that give the player health?](#How_do_I_add_a_potion_that_give_the_player_health.3F)
*   [16 It’s difficult to be accurate on Android! How do I make items auto collect when near?](#It.E2.80.99s_difficult_to_be_accurate_on_Android.21_How_do_I_make_items_auto_collect_when_near.3F)
*   [17 I want to make a new monsters for the dungeon! Where do I start?](#I_want_to_make_a_new_monsters_for_the_dungeon.21_Where_do_I_start.3F)
*   [18 Monsters need to path to the player so that they can do that? What do I use?](#Monsters_need_to_path_to_the_player_so_that_they_can_do_that.3F_What_do_I_use.3F)
*   [19 Monsters need to attack the player, how do I do that?](#Monsters_need_to_attack_the_player.2C_how_do_I_do_that.3F)
*   [20 How do I set up my PC to allow me to develop for Android?](#How_do_I_set_up_my_PC_to_allow_me_to_develop_for_Android.3F)
*   [21 What is cooking and why do I need to it?](#What_is_cooking_and_why_do_I_need_to_it.3F)
*   [22 How do I put the game onto my Android device and try it out?](#How_do_I_put_the_game_onto_my_Android_device_and_try_it_out.3F)

Introduction
------------

I (James Tan) did a live demonstration talk at Unreal Summit 2015, however I ran out of time and had to skip some sections of the live demonstration. This wiki page will have the entire session documented.

Download link for the power point slides.

This page isn't yet finished. I am writing this in a hotel in Korea at the moment and will be able to finish everything up within the next few days.

What template should I use and does it matter if I pick the wrong one?
----------------------------------------------------------------------

For this demonstration we are going to pick the top down template to start with. This will give us the basics with a character that we can move around by left clicking or touching on the screen.

For your games, you should try to pick a template which matches your game as close as possible. If none can be found, then you may need to start from a blank slate; or you may want to do that anyways.

At the end of the day, picking a template only causes Unreal to set the project up with a few key assets that give you the groundwork laid out. But it doesn't configure or alter Unreal in any way which prevents you from changing the game later on. You can start out with the first person template and then change it into a third person shooter.

Should I pick the C++ one or the Blueprints one and is there a difference?
--------------------------------------------------------------------------

For this demonstration we are going to choose the Blueprints version of the top down template. This just gets Unreal to copy the Blueprint mirror of the C++ source version. Other than that, there isn't any differences between the C++ version of the top down template and the Blueprints version of the top down template.

If I pick the C++ one, can I still use Blueprints and vice versa?
-----------------------------------------------------------------

Blueprints can communicate with C++ and C++ can communicate with Blueprints. Thus, it doesn't matter which one you pick. Pick C++ if you know the language or you want to learn it, you can always use Blueprints later on.

How do I use the assets that I bought from the Market Place?
------------------------------------------------------------

When assets have been purchased from the Unreal Marketplace they will appear in the Vault section of the Library. You can then use the 'Add to project' button which then brings up another dialog box which asks you which project you'd like to add it to.

To start, we are going to customize the character that the player controls. To do this, select the character that has been placed in the level. Open up its Blueprint in the Blueprint Editor. Select on the Viewport tab which allows us to customize the components that this Blueprint contains. Select the Knight asset in the Content Browser and then assign it to the Skeletal Mesh component. When we switch back to the Level Viewport we can see that the changes have been reflected immediately.

How do I set up animations? What are Animation Blueprints?
----------------------------------------------------------

How do I attach things onto my character? What can I attach?
------------------------------------------------------------

How do I add a button to make my character attack with his weapon?
------------------------------------------------------------------

My character is going to have a spell, how do I add a button for that?
----------------------------------------------------------------------

How do I show a health bar for my character?
--------------------------------------------

My character has a weapon, how do I make it work?
-------------------------------------------------

I want my character launch a fireball! How do I make him do that?
-----------------------------------------------------------------

I want to give my character an aura! How do I do that?
------------------------------------------------------

I want to add things on the floor the player can pick up. How do I do that?
---------------------------------------------------------------------------

How do I add a potion that give the player health?
--------------------------------------------------

It’s difficult to be accurate on Android! How do I make items auto collect when near?
-------------------------------------------------------------------------------------

I want to make a new monsters for the dungeon! Where do I start?
----------------------------------------------------------------

Monsters need to path to the player so that they can do that? What do I use?
----------------------------------------------------------------------------

Monsters need to attack the player, how do I do that?
-----------------------------------------------------

How do I set up my PC to allow me to develop for Android?
---------------------------------------------------------

What is cooking and why do I need to it?
----------------------------------------

How do I put the game onto my Android device and try it out?
------------------------------------------------------------

Retrieved from "[https://wiki.unrealengine.com/index.php?title=MakingAMobileHackNSlash&oldid=14001](https://wiki.unrealengine.com/index.php?title=MakingAMobileHackNSlash&oldid=14001)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)