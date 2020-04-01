Content example blueprint HUD - Epic Wiki                    

Content example blueprint HUD
=============================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

### HUD and Menu in Blueprint

The UE4 Marketplace (at least 4.1 upwards)include Content Example that includes "Blueprint\_HUD". Specifically to find the Content Examples you need to look under the Learn tab and not the Marketplace tab In the Unreal Launcher.

This examples demonstrates a very simple BP implementation of a Menu which is invokved by pressing 'M'. It shows pausing on the game and displaying a menu, acting on click events and then resuming the game.

Unreal staff member Steve Allison stated this about the example in an AnswerHUB response ([https://answers.unrealengine.com/questions/16558/hud-create-a-basic-menu.html](https://answers.unrealengine.com/questions/16558/hud-create-a-basic-menu.html)):

The high level outline would be that your map needs a GameMode blueprint (see here) which will allow you to specify blueprints that will likely control your HUD--PlayerController Class and HUD Class.

Your PlayerController Class would ideally be where you want to handle any keyboard inputs for your map/game/HUD. For example, in Blueprint\_HUD map, the BP\_PlayerController\_HUD blueprint is where we have our Input M to open the menu.

Your HUD Class is where all the magic happens with drawing your HUD. Event Receive Draw HUD is a Tick event, meaning it will fire off every frame of your game to draw your HUD given the instructions you connect to it. In the Blueprint\_HUD map, our BP\_HUD\_Example has a branch early on that is toggled based on if the Menu should be drawn or not. If not, the main gameplay HUD is drawn, if yes, the Menu HUD is drawn (and gameplay HUD is not).

The HUD Class also contains the events for when you click the Hitboxes that are drawn by the Receive Draw HUD event.

Hopefully this enough to keep you going on working with Blueprint HUD. We're working hard to get more official documentation for both Blueprint HUD and C++ HUD and hope to be able to provide it soon!

Relevant UE4 Video Tutorial: [https://www.youtube.com/watch?v=7gwgU0UPENA&feature=youtu.be](https://www.youtube.com/watch?v=7gwgU0UPENA&feature=youtu.be)

[https://www.youtube.com/watch?v=s423ydn3t\_E](https://www.youtube.com/watch?v=s423ydn3t_E)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Content\_example\_blueprint\_HUD&oldid=13810](https://wiki.unrealengine.com/index.php?title=Content_example_blueprint_HUD&oldid=13810)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Videos](/Category:Community_Videos "Category:Community Videos")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)