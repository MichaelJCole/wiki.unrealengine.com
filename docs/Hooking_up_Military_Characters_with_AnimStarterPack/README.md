Hooking up Military Characters with AnimStarterPack - Epic Wiki                    

Hooking up Military Characters with AnimStarterPack
===================================================

Hooking up Military Characters with AnimStarterPack
---------------------------------------------------

1.  **Import Military Characters and Anim Starter Pack into the same Third person Blueprint project** – _In order to be able to use both packs they both need to be in the same project. Otherwise you will get folder structure errors._
2.  **Open Blueprints -> MyGame, set the Default Pawn class to “ASP\_Character”** – _This sets the AnimStarterPack character as the default character when launching the game._
3.  **Create a “Crouch” input command in the project (Optional, if you want crouch functionality)** – _The Default ThirdPerson Blueprint project doesn’t have a “Crouch” Input, The Animation character does. If you do not create a “Crouch” input you will receive errors when you attempt to compile. And the character will not be able to crouch._
4.  **Delete the Skeleton in the “Military Character Silver” folder and use “Replace References” replace them with the skeleton provided with “Anim Starter Pack” (Eventually this will be included in the Engine folder)** – _The Military Character Silver pack comes with a Skeleton and So does the Animation pack. By deleting and replacing the Military Character Skeleton you ensure that all the characters and animations are using the same skeleton._
5.  **Open “ASP\_Character” and replace the “mesh” component with the Military Character of your choosing.** – _This replaces the Blue Character in the AnimStarter content with the Military Character of your choosing. When you load into the game._
6.  **In the “Defaults” tab of “ASP\_Character”, make sure the blueprint is using “ASP\_HeroTTP\_AnimBlueprint” as its Anim Blueprint** – _This makes sure the ASP\_Character uses ASP\_HeroTTP\_animBlueprint as its anim blueprint. This might not be necessary. Its more of a “Double Check” step._
7.  **Recompile and you are ready to go!**

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Hooking\_up\_Military\_Characters\_with\_AnimStarterPack&oldid=8844](https://wiki.unrealengine.com/index.php?title=Hooking_up_Military_Characters_with_AnimStarterPack&oldid=8844)"

  ![](https://tracking.unrealengine.com/track.png)