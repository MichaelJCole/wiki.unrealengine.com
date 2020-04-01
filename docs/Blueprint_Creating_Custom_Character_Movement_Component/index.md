Blueprint Creating Custom Character Movement Component - Epic Wiki                    

Blueprint Creating Custom Character Movement Component
======================================================

**Rate this Tutorial:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:Not tested

Contents
--------

*   [1 Purpose and Use](#Purpose_and_Use)
*   [2 Assumptions](#Assumptions)
*   [3 Setup in Character Blueprint - Event Graph](#Setup_in_Character_Blueprint_-_Event_Graph)
*   [4 Setup in Animation Blueprint - AnimGraph](#Setup_in_Animation_Blueprint_-_AnimGraph)

Purpose and Use
---------------

How to create a custom movement mode so the character can climb a ladder.

I tried two separate times to figure out how to use a custom character movement mode in blueprints with no success and ended up just using a workaround with the existing preset modes. There's very little documentation about how to do this in blueprints and the concept is a bit different using Enumerated types. I finally figured it out so I decided to do a quick tutorial to hopefully visually bridge the gap of understanding for someone else. If someone see's a better way to do this then please update.

Assumptions
-----------

1.  You know how to create and edit Persona blueprints.

Setup in Character Blueprint - Event Graph
------------------------------------------

*   [![](https://d3ar1piqh1oeli.cloudfront.net/c/cb/Blueprints_CharacterCustomMovementEvents.png/120px-Blueprints_CharacterCustomMovementEvents.png)](/File:Blueprints_CharacterCustomMovementEvents.png)
    
    Event Graph - Triggering a Custom Movement Mode Change
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/8/85/Character_CustomModeTravelingCalculation.png/120px-Character_CustomModeTravelingCalculation.png)](/File:Character_CustomModeTravelingCalculation.png)
    
    "Calculate Ladder Climbing Position" - Inside macro
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/b/b7/Character_PlayerDirection.png/120px-Character_PlayerDirection.png)](/File:Character_PlayerDirection.png)
    
    "Player Direction Macro" - Player Direction
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/0/08/Character_CustomModeMoveForward.png/120px-Character_CustomModeMoveForward.png)](/File:Character_CustomModeMoveForward.png)
    
    MoveForward Event
    

1.  The "Climbing Ladder" variable in the images is a Byte which I happen to have set to 7 just for the sake of being in order of the different EMovementMode variations already existing although I think you can start at 0.
2.  "Can The Player Touch The Ground" is doing a Line Trace to see if the character is close to the ground. (Optional)
3.  Using Calc Velocity will affect all the other movement modes so be aware but I adjusted Delta time to 1 to speed up offsets and Braking Deceleration to 40 to give a bit of follow through

Setup in Animation Blueprint - AnimGraph
----------------------------------------

*   [![](https://d3ar1piqh1oeli.cloudfront.net/4/48/AnimationBP_CustomCharacterMovementModeTransitionRule.png/120px-AnimationBP_CustomCharacterMovementModeTransitionRule.png)](/File:AnimationBP_CustomCharacterMovementModeTransitionRule.png)
    
    Transition Rule - Moving from Idle to Climbing state within the AnimGraph of the Animation Blueprint
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/d/dc/AnimationBP_CustomModeClimbingState.png/120px-AnimationBP_CustomModeClimbingState.png)](/File:AnimationBP_CustomModeClimbingState.png)
    
    Climbing State - Looping climbing animation using play rate based on the speed of velocity to keep feet aligned to ladder
    

1.  I had to use Cast to Character in the event graph of the Animation blueprint to transfer the "Climbing Ladder" byte variable over from the Character Blueprint.
2.  Some of the wiring like "Getting Direction" could be put into a Macro function

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Creating\_Custom\_Character\_Movement\_Component&oldid=14750](https://wiki.unrealengine.com/index.php?title=Blueprint_Creating_Custom_Character_Movement_Component&oldid=14750)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)