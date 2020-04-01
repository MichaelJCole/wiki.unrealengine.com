 NPC Dialogue System Tutorial - Epic Wiki             

 

NPC Dialogue System Tutorial
============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

  
**Authored by:** Adam Davis  
**Special Thanks:** Zeustiak, Rudy Triplett, Ian Shadden (all three provided some information on different aspects of this system that assisted in making it more stable). I also want to thank Alexander Paschall again for Daniel, the Chicken. He comes in handy!

Introduction
============

In many games, the need arises to have a variety of NPCs that the player can interact with independent of other units. Quest givers, party members, even static conversations with trivial NPC units can have an impact on the feel of a game. This system was designed to replicate a fully branching dialogue tree without the use of conventional tools such as data tables. The purpose was to see how possible it was to fully integrate an NPC system into a game with nothing but blueprints. The goal is for the user to be able to interact with Daniel, the Chicken. He is going to be the basis for our NPC blueprint.

  
[![Daniel TheChicken.png](https://d3ar1piqh1oeli.cloudfront.net/6/66/Daniel_TheChicken.png/560px-Daniel_TheChicken.png)](/index.php?title=File:Daniel_TheChicken.png)  
[![Daniel TheChicken 2.png](https://d3ar1piqh1oeli.cloudfront.net/8/86/Daniel_TheChicken_2.png/560px-Daniel_TheChicken_2.png)](/index.php?title=File:Daniel_TheChicken_2.png)  

_Something to consider here is that I did not remove the player’s ability to move as it was not necessary for this tutorial. However I feel it should be noted that this makes controlling the widget at first a bit difficult and you may wish to consider disabling player movement or possessing another player controller with no movement until the conversation is over, in which you return to the original play state. This has not been implemented here but something that may be worth looking into._

Blueprint setup
---------------

To begin, create an Actor Blueprint. Mine is named “TextRenderingActor” but any name will do. While you are at it, create a widget blueprint. The one I used in this example is just called widget. This isn’t a good name for a project, especially when you will have more than one of these available, so I would recommend using a different name. The components you will need for this setup are fairly few. As you can see below, all I used was a scene component to hold the root. Then a box component scaled so that the player can walk into it, a skeletal mesh (Daniel), and a text render actor.

  
[![Components Assets.png](https://d3ar1piqh1oeli.cloudfront.net/e/e0/Components_Assets.png/560px-Components_Assets.png)](/index.php?title=File:Components_Assets.png)  

This blueprint does require a number of variables, most of which are public so they can be edited to fit each individual NPC. In my example I have 12 different arrays, which have a number of variables for each ranging from 1-3. All of these as well as the “I must go” variable are public. The array variable is extremely important to the UMG setup so make sure to have a text array variable in place. Ours is called ButtonText. Additionally, you will need at least two int variables. One to update your selector and one to affect how the function interacts with your button presses. I named these Update Array and Int.

  
[![VariablesUsed.png](https://d26ilriwvtzlb.cloudfront.net/4/48/VariablesUsed.png)](/index.php?title=File:VariablesUsed.png)

### Event graph

The first thing you need to do is make sure that your player can interact with the NPC once it is overlapping with the Box Component. Create an On Actor Begin Overlap and On Actor End Overlap. Additionally, go ahead and create a custom event, call this “Leaving”. This will come into play in just a little bit, but for now, you want to go ahead and have it. From the begin overlap, create an “Enable Input” node, and make sure that the player controller is tied to your player controller (a Get player controller node will do the trick). Plug in a set text node after this, which should be set to your text render actor in your NPC blueprint.

Now that you have this set up, go ahead and make a “Create widget” node, with the class set as your widget that you set up earlier. The owning player again should be your player controller. The next step is create an Add to Viewport node, with the target set to the return value of your create widget node. This will set the widget to your viewport.

Cast to your player controller and from the “As Player Controller” output pin, get a “Set Show Mouse Cursor” node, check the checkbox to set it to true. This is necessary to be able to interact with the UMG widget. Finally, get a set of your text array.

  
[![Begin End Overlap.png](https://d3ar1piqh1oeli.cloudfront.net/9/9e/Begin_End_Overlap.png/560px-Begin_End_Overlap.png)](/index.php?title=File:Begin_End_Overlap.png)  

For the End overlap (and Leaving custom event), you will simply be undoing the actions you did in your begin overlap. Create a disable input node, set your text in your actor (I used goodbye), set the Update Array var to 0 (this will be explained shortly), remove the widget from your viewport, then cast to your player controller and set show mouse cursor to false. This can be seen in the above image.

### Set Events for Text Actions

This is by far the easiest part of the tutorial! You deserve a breather afterall. All you need to do is create 4 custom events. I labelled mine Answer1, Answer2, Answer3, and Answer4. For the first 3, do a separate set Int (your second integer variable) and set it to 0, 1, and 2 as seen below. All three of these need to be plugged into your Question 0 Response branch, which we will get to in just a moment. What these do is set your integer value to a specific number so that it can alter which dialogue options you get based on the choices you make.

  
[![CommentInput.png](https://d26ilriwvtzlb.cloudfront.net/8/81/CommentInput.png)](/index.php?title=File:CommentInput.png)  

For Answer4, all you need to do is create a function for your “Leaving” custom event that you created earlier. Right click and type in “Leaving”.

  
[![LeavingResponse.png](https://d26ilriwvtzlb.cloudfront.net/c/c4/LeavingResponse.png)](/index.php?title=File:LeavingResponse.png)  

### Arrays and the Selector

This array of arrays is what stores your responses to the prompts from your NPC. Create as many arrays as you require for your NPC’s and make sure to set the number of responses for each one. For instance, if you only want the player to have 2 options for a specific question the NPC asks, only add in 2 text variables. Additionally, make sure that you make these public so you can edit them from the details pane.

The next part is creating the selector. All you have to do is type “Select” into the context menu and it will show up. This node is very powerful, but it is also extremely fragile. Before adding anything to it, make sure you have the exact number of input pins for your arrays. So if you have 12 arrays, make sure to have exactly 12 input pins. If you have any pins leftover it will not compile and will throw warnings into your script until you delete the node and recreate it or find more arrays to fill the additional nodes. Anytime you alter the amount of arrays you are using you will have to create a new Selector. To add option pins, right click the node and press “Add Option Pin”.

Set your index to your Update Array variable. This is the main reason it is important to set the update array to 0 when you leave the overlap. This will 0 out the information held so that the conversation can start over when you re-enter the overlap. You can also ignore this to save the conversation at a specific point if you want to. Plug the output pins of your arrays into each option of the selector in the order you want them to appear. Additionally, take the array output from the first array and plug it into your “Set Button Text” from the “Begin Overlap” function created earlier.

  
[![ArraySelector PlayerResponses.png](https://d3ar1piqh1oeli.cloudfront.net/0/0b/ArraySelector_PlayerResponses.png/560px-ArraySelector_PlayerResponses.png)](/index.php?title=File:ArraySelector_PlayerResponses.png)  

### Setting up branching response paths

The final step to finishing your blueprint is to tell the blueprint what to do when you make specific selections. Create a branch node. All of your input custom events (Answer1, Answer2, Answer3) should be plugged into this branch. The only one you will want to keep away from this is Answer4, because that deals specifically with getting out of the conversation.

  
[![Question0 Setup.png](https://d3ar1piqh1oeli.cloudfront.net/7/7c/Question0_Setup.png/560px-Question0_Setup.png)](/index.php?title=File:Question0_Setup.png)  

This branch should check to see if the Update Array Int is equal to 0, if it is not, it will move on to the next in the series (Update Array == 1) and so on and so forth. If it is true (this is true of each case), the branch runs a series of checks. If the input you selected set Int to 0, it sets the text render actors text to a specific value (In my case, “Would you like to take a nap?”) then it updates the Update Array to a new value, in my case, 1. This is designed to take you to a specific array in your selector for your new set of responses based on the NPC’s reaction.

You run this same check for if the player pressed the second or third button (Int 1 and Int 2, respectively) and update the values accordingly. It is a good idea to note that much of this, specifically the branches, can be set to a function so that it looks much cleaner. I did not do this so I could walk through each step of the process.

  
[![Question1 Setup.png](https://d3ar1piqh1oeli.cloudfront.net/7/78/Question1_Setup.png/560px-Question1_Setup.png)](/index.php?title=File:Question1_Setup.png)  
[![Question2and3 Setup.png](https://d3ar1piqh1oeli.cloudfront.net/d/d6/Question2and3_Setup.png/560px-Question2and3_Setup.png)](/index.php?title=File:Question2and3_Setup.png)  

This determines what response you gave and sets the NPC’s reaction to what you said, then updates Update Array to choose a new set of responses based on the answer you gave. Finally, all of your choices should lead to a “set Button Text” node. Make sure to attach the Array output from your selector node to the input of the “set Button Text” node.

  
[![SetUMGText.png](https://d26ilriwvtzlb.cloudfront.net/4/4e/SetUMGText.png)](/index.php?title=File:SetUMGText.png)  

Once you are done with these steps, your blueprint will probably look a little something like this:

  
[![Full Dialogue Blueprint.png](https://d3ar1piqh1oeli.cloudfront.net/e/ea/Full_Dialogue_Blueprint.png/560px-Full_Dialogue_Blueprint.png)](/index.php?title=File:Full_Dialogue_Blueprint.png)

UMG
---

The first and easiest step to the UMG system is to create your buttons. Do this by dragging the widget “button” onto the design window and resizing it to where you want it. Then make sure it is placed as you prefer. For this example, we are placing them directly in the center of the screen so it is easy to access. Finally, add a Text block directly onto each button so that it is parented to the button.

  
[![UMG Buttons Layout.png](https://d3ar1piqh1oeli.cloudfront.net/b/b7/UMG_Buttons_Layout.png/560px-UMG_Buttons_Layout.png)](/index.php?title=File:UMG_Buttons_Layout.png)

To set up the click events for the buttons, Go to your design tab and select a button, then in the details pane, go to the events subsection and press the “Add OnClicked” button.

  
[![OnClicked.png](https://d26ilriwvtzlb.cloudfront.net/e/ec/OnClicked.png)](/index.php?title=File:OnClicked.png)

For each button, do a “Get all Actors of Class” then a “ForEachLoop”, casting to the NPC character. Then drag off of the “as NPC” pin and call your custom input events.

  
[![Setting the buttons.png](https://d3ar1piqh1oeli.cloudfront.net/6/67/Setting_the_buttons.png/560px-Setting_the_buttons.png)](/index.php?title=File:Setting_the_buttons.png)  

Next, select one of your text blocks in the widget design tab. Press bind in the “Content” section of the details pane, then “Create binding”.

  
[![BindText.png](https://d26ilriwvtzlb.cloudfront.net/3/30/BindText.png)](/index.php?title=File:BindText.png)  

Once you have created the binding, you need to get all actors of class for your NPC Blueprint. Run the Out of Actors pin to a for each loop, which will run a cast to your NPC Blueprint. Finally, you need to get the temporary variable holding your array. Set each of your text blocks in the same way, choosing the specific index from the responses in your array manually (for instance, for the first block I did array index 0, the second 1, and the third 2).

  
[![SettingButtonText.png](https://d3ar1piqh1oeli.cloudfront.net/1/16/SettingButtonText.png/560px-SettingButtonText.png)](/index.php?title=File:SettingButtonText.png)  

The only difference between the regular responses and the leaving response is the variable you call. Instead of getting the temp array, call your “leaving” variable, in my case it is the “I must go” variable.

  
[![SetLeavingText.png](https://d3ar1piqh1oeli.cloudfront.net/0/01/SetLeavingText.png/560px-SetLeavingText.png)](/index.php?title=File:SetLeavingText.png)

A practical Example
-------------------

Here is what the system looks like when used as above. Keep in mind, you will want to customize the text variables and the string values to fit your needs as well as how many arrays you need. Let us start by walking up to Daniel, who gives us a warm greeting with 4 response choices:

  
[![Daniel TheChicken 2.png](https://d3ar1piqh1oeli.cloudfront.net/8/86/Daniel_TheChicken_2.png/560px-Daniel_TheChicken_2.png)](/index.php?title=File:Daniel_TheChicken_2.png)  

After choosing the first response, you are given a whole new set of responses to the new text prompt:

  
[![Question1.png](https://d3ar1piqh1oeli.cloudfront.net/4/49/Question1.png/560px-Question1.png)](/index.php?title=File:Question1.png)  

Once you make a choice for the next set of responses, it travels down the line to an entirely new branch:

  
[![Question1 2.png](https://d3ar1piqh1oeli.cloudfront.net/1/1b/Question1_2.png/560px-Question1_2.png)](/index.php?title=File:Question1_2.png)  

When you first approach and choose the second option, which was a bit mean, it elicited an entirely different response and subsequent player choices because of it:

  
[![Question2.png](https://d3ar1piqh1oeli.cloudfront.net/b/bb/Question2.png/560px-Question2.png)](/index.php?title=File:Question2.png)  

If you chose the third response, you get yet another set of options!

  
[![Question3.png](https://d3ar1piqh1oeli.cloudfront.net/a/ae/Question3.png/560px-Question3.png)](/index.php?title=File:Question3.png)  

Finally, the system has the built in leave option so you aren’t forced to stick out a conversation if you don’t want/need to:

  
[![Goodbye.png](https://d3ar1piqh1oeli.cloudfront.net/0/09/Goodbye.png/560px-Goodbye.png)](/index.php?title=File:Goodbye.png)  

This system can be used to create multiple branches of a dialogue tree, and allow you to customize multiple copies of the blueprint for your specific needs, quickly populating your game with random NPC’s, quest givers, conversations between player characters, etc. Take a look and see what you can come up with!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=NPC\_Dialogue\_System\_Tutorial&oldid=121](https://wiki.unrealengine.com/index.php?title=NPC_Dialogue_System_Tutorial&oldid=121)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Epic Created Content](/index.php?title=Category:Epic_Created_Content "Category:Epic Created Content")