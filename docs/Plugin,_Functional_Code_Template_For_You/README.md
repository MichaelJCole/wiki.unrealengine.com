Plugin, Functional Code Template For You - Epic Wiki                    

Plugin, Functional Code Template For You
========================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Download](#Download)
*   [3 .h](#.h)
*   [4 Conclusion](#Conclusion)

Overview
--------

_Authoer_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here is a completely functional plugin template that you can download and modify to your liking!

It is functional because it is basically a wrapper for some extra BP nodes that I like to give to my clients to use in their BP AI systems.

The whole purpose of this wiki is to provide you with a download of a simple and completely usable plugin template that you can load up and see what it does immediately, and then modify to your wishes :)

Download
--------

**Rama's AI Plugin Template**

[File:VictoryAI.zip](/File:VictoryAI.zip "File:VictoryAI.zip")

.h
--

Here's the list of BP nodes that come with this plugin!

/\*\* SQUARED distanced between actors \*/
UFUNCTION(BlueprintPure, Category \= "VictoryAILibrary")
static float Calculations\_\_SquaredDistanceBetweenActors(AActor\* Actor1,AActor\* Actor2);
 
 
//~~~
 
/\*\* Convert Rotator to Vector \*/
UFUNCTION(BlueprintPure, Category \= "VictoryBPLibrary", meta \= (FriendlyName \= "Vector To Rotator", CompactNodeTitle \= "->", Keywords \= "convert vector rotator conversion"))
static FRotator Conversions\_\_VectorToRotator(const FVector& TheVector);
 
/\*\* Convert Vector to Rotator\*/
UFUNCTION(BlueprintPure, Category \= "VictoryBPLibrary", meta \= (FriendlyName \= "Rotator to Vector", CompactNodeTitle \= "->", Keywords \= "convert vector rotator conversion"))
static FVector Conversions\_\_RotatorToVector(const FRotator& TheRotator);
 
//~~~
 
/\*\* Set Max Move Speed. Supply the Character whose Character Movement to change! Returns false if operation could not occur due to invalid Character or MovementComponent could not be obtained.\*/
UFUNCTION(BlueprintCallable, Category \= "VictoryAILibrary", meta\=(DefaultToSelf\="TheCharacter"))
static bool CharacterMovement\_\_SetMaxMoveSpeed(ACharacter\* TheCharacter, float NewMaxMoveSpeed);
 
/\*\* Replicated Jump Rama-Style. Use negative values for down, backward, and left. Returns false if operation could not occur. \*/
UFUNCTION(BlueprintCallable, Category \= "VictoryAILibrary")
static bool CharacterMovement\_\_RamaJump(ACharacter\* TheCharacter, float UpAmount\=3000, float ForwardAmount\=3000, float RightAmount\=0);
 
/\*\* Replicated Jump Rama-Style. Directions are relative to direction to target. Forward = direct line to target. Use negative values for down, backward, and left. Returns false if operation could not occur. \*/
UFUNCTION(BlueprintCallable, Category \= "VictoryAILibrary")
static bool CharacterMovement\_\_RamaJumpRelativeToTarget(ACharacter\* TheCharacter, AActor\* Target, float UpAmount\=3000, float ForwardAmount\=3000, float RightAmount\=0);
 
 
/\*\* Is Controller's Pawn Falling? Returns the Controller's Pawn as a Character \*/
UFUNCTION(BlueprintCallable, Category \= "VictoryAILibrary")
static ACharacter\* CharacterMovement\_\_ControllerPawnIsFalling(AActor\* Controller, bool& IsFalling);

Conclusion
----------

Have fun making plugins!

♥

Rama

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Plugin,\_Functional\_Code\_Template\_For\_You&oldid=11433](https://wiki.unrealengine.com/index.php?title=Plugin,_Functional_Code_Template_For_You&oldid=11433)"

[Categories](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")
*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)