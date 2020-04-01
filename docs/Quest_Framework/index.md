Quest Framework - Epic Wiki                    

Quest Framework
===============

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (2 votes)

Approved for Versions:4.8

[Original Content](http://enjoy-game-programming.blogspot.com/2016/02/unreal-engine-4-quest-framework-c-part-1.html)

Lately, I have been working on a simple horror game in UE4 that has a very simple Objective system that drives the gameplay. After looking at the code, I realized it could serve as the basis of a framework for a generic questing system. Today I will share all of that code and explain each class as it pertains to the framework.

The following classes to get started on a simple quest framework would are AQuest and AObjective, using the UE4 naming conventions for classes. AObjective is metadata about the quest as well the actual worker when it comes to completing parts of a quest. AQuest is a container of objectives and does group management of objectives. Both classes are derived from AInfo as they are purely classes of information and do not need to have a transform or collision within the world.

Objectives
----------

Since it is the foundation for a quest, I will first layout and explain AObjective. The header of AObjective goes as follows:

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Info.h"
#include "Objective.generated.h"
 
UCLASS()
class QUESTGAME\_API AObjective : public AInfo
{
 GENERATED\_BODY()
 
public: 
 // Sets default values for this actor's properties
 AObjective();
 
 // Called when the game starts or when spawned
 virtual void BeginPlay() override;
 
 // Called every frame
 virtual void Tick( float DeltaSeconds ) override;
 
 UPROPERTY( EditDefaultsOnly, BlueprintReadOnly, Category \= "O" )
  FText Description;
 
 UPROPERTY( EditDefaultsOnly, BlueprintReadOnly, Category \= "O" )
  FName ObjectiveName;
 
 UPROPERTY( EditDefaultsOnly, BlueprintReadOnly, Category \= "O" )
  bool MustBeCompletedToAdvance;
 
 UPROPERTY( EditDefaultsOnly, BlueprintReadOnly, Category \= "O" )
  int32 TotalProgressNeeded;
 
 UPROPERTY( EditDefaultsOnly, BlueprintReadOnly, Category \= "O" )
  int32 CurrentProgress;
 
 UFUNCTION( BlueprintCallable, Category \= "O" )
  void Update( int32 Progress );
 
 UFUNCTION( BlueprintCallable, Category \= "O" )
  virtual bool IsComplete( ) const;
 
 UFUNCTION( BlueprintCallable, Category \= "O" )
  virtual float GetProgress( ) const;
 
 
 
};

Not that bad of a deal. The only responsibilities of an AObjective is to track the completion of the sub-portion of an AQuest and offer some idea of what the player must do.

The objective is tracked by the CurrentProgress and TotalProgressNeeded properties. Added by the supplied helper functions, Update, IsComplete, and GetProgress, we can get a reasonable amount of data about just this tiny portion of a quest. These functions give you all the functionality needed to start a questing framework for your UE4 game.

There is one boolean property that has not been mentioned: MustBeCompletedToAdvance. Depending on the use case, this could be used to ensure a sequential order in objectives or having required and optional objectives. I will implement it as the first in this tutorial. Only minor changes later on would be needed to use it as an indicator or optional or required quests. Or, you could just add a new property to support both.

There are two more properties that help us out with AObjective management: ObjectiveName and Description. ObjectiveName can be thought of as a unique identifier for the implemented AObjective. The ObjectiveName's purpose is for player feedback. For instance, the FText value could be (in simple string terms) "Get a rock". It is nothing specific to the game, it is only something to be used as a hint in either a UI or other visual element to let the player know that they need to do something in order to complete the objective.

Next, we can look at the small amount of code that is used to define AObjective.

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "QuestGame.h"
#include "Objective.h"
 
 
// Sets default values
AObjective::AObjective( ) :
 Description( ),
 ObjectiveName( NAME\_None ),
 TotalProgressNeeded( 1 ),
 CurrentProgress( 0 ),
 MustBeCompletedToAdvance( true )
{
  // Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
 PrimaryActorTick.bCanEverTick \= true;
 
}
 
// Called when the game starts or when spawned
void AObjective::BeginPlay()
{
 Super::BeginPlay();
}
 
// Called every frame
void AObjective::Tick( float DeltaTime )
{
 Super::Tick( DeltaTime );
 
}
 
void AObjective::Update( int32 Progress )
{
 CurrentProgress +\= Progress;
}
 
bool AObjective::IsComplete( ) const
{
 return CurrentProgress \>= TotalProgressNeeded;
}
 
float AObjective::GetProgress( ) const
{
 check( TotalProgressNeeded !\= 0 )
 return (float)CurrentProgress / (float)TotalProgressNeeded;
}

Again, you will be hard pressed to say "that is a lot of code". Indeed, the most complex code is the division in the GetProgress function.

Wait, why do we call / override BeginPlay or Tick? Well, that is an extreme implementation detail. For instance, what if, while an AObjective is active, you want to tick a countdown for a time trialed AObjective.

For BeingPlay we could implement various other details such as activating certain items in the world, spawning enemies, and so on and so forth. You are only limited by your code skills and imagination.

Right, so how do we manage all of these objectives and make sure only relevant AObjectives are available? Well, we implement an AQuest class in which it acts as an AObjective manager.

Quests
------

Here is the declaration of an AQuest to get you started:

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Info.h"
#include "Quest.generated.h"
 
UCLASS()
class QUESTGAME\_API AQuest : public AInfo
{
 GENERATED\_BODY()
 
public: 
 // Sets default values for this actor's properties
 AQuest();
 
 // Called when the game starts or when spawned
 virtual void BeginPlay() override;
 
 // Called every frame
 virtual void Tick( float DeltaSeconds ) override;
 
public:
 UPROPERTY( EditDefaultsOnly, BlueprintReadWrite, Category \= "Q" )
  TArray<class AObjective\*\> CurrentObjectives;
 
 UPROPERTY( EditDefaultsOnly, BlueprintReadWrite, Category \= "Q" )
  TArray<TSubclassOf<AObjective\>> Objectives;
 
 UPROPERTY( EditDefaultsOnly, BlueprintReadOnly, Category \= "Q" )
  USoundCue\* QuestStartSoundCue;
 
 UPROPERTY( EditDefaultsOnly, BlueprintReadOnly, Category \= "Q" )
  FName QuestName;
 
 UPROPERTY( EditDefaultsOnly, BlueprintReadOnly, Category \= "Q" )
  FText QuestStartDescription;
 
 UPROPERTY( EditDefaultsOnly, BlueprintReadOnly, Category \= "Q" )
  FText QuestEndDescription;
 
 UFUNCTION( BlueprintCallable, Category \= "Q" )
  bool IsQuestComplete( ) const;
 
 UFUNCTION( BlueprintCallable, Category \= "Q" )
  bool CanUpdate( FName Objective );
 
 UFUNCTION( BlueprintCallable, Category \= "Q" )
  void Update( FName Objective, int32 Progress );
 
 UFUNCTION( BlueprintCallable, Category \= "Q" )
  bool TryUpdate( FName Objective, int32 Progress );
 
        UFUNCTION( BlueprintCallable, Category \= "Q" )
                float QuestCompletion( ) const; 
 
};

Not much bigger that the AObjective class is it? This is because all AQuest does is wrap around a collection of AObjective's and provides some utility functions to help manage them.

The Objectives property is a simple way to configure an AQuest's objectives via the Blueprints Editor. And the CurrentObjectives is a collection of all live AObjective's that are configured for the given AQuest.

There are several user friendly properties such as a USoundCue, FName, and FText types that help give audio visual feedback to the player. For instance, when a player starts a quest, a nice sound plays - like a chime - and the QuestStartDescription text is written to the player's HUD and a journal implementation. Then, when a player completes a quest, a get is called for the QuestEndDescription property and writes it to a journal implementation. But those are all specific implementation details related to your game and is limited only by coding skills and imagination.

All of the functions for AQuest are wrappers to operate on collections of AObjectives to update and query for completion. All AObjectives in the AQuest are referenced and found by FName property types. This allows for updating different instances of AObjectives that are essentially the same, but differ at the data level. It also allows the removal of managing pointers. As another argument, it decouples knowledge of what an AObjective object is from other classes, so completing quests via other class implementations only requires the knowledge of an AQuest - or the container for the AQuest - object and default types supplied by the engine such as int32 and FName.

How does this all work, well, just like before, here is the definition of AQuest:

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "QuestGame.h"
#include "Objective.h"
#include "Quest.h"
 
 
AQuest::AQuest() :
    QuestName( NAME\_None ),
    CurrentObjectives( ),
    QuestStartDescription( ),
    QuestEndDescription( )
{
}
 
void AQuest::BeginPlay()
{
 Super::BeginPlay();
        UWorld\* World \= GetWorld();
 if ( World )
 {
  for ( auto Objective : Objectives )
  {
   CurrentObjectives.Add(World\-\>SpawnActor(Objective));
  }
        }
}
 
// Called every frame
void AQuest::Tick( float DeltaTime )
{
 Super::Tick( DeltaTime );
 
}
 
bool AQuest::IsQuestComplete() const
{
 bool result \= true;
 for ( auto Objective : CurrentObjectives )
 {
  result &\= Objective\-\>IsComplete();
 }
 return result;
}
 
bool AQuest::CanUpdate( FName Objective )
{
 bool PreviousIsComplete \= true;
 for ( auto Obj : CurrentObjectives )
 {
  if ( PreviousIsComplete )
  {
   if ( Objective \== Obj\-\>ObjectiveName )
    return true;
   else
    PreviousIsComplete \= Obj\-\>IsComplete() |
    !Obj\-\>MustBeCompletedToAdvance;
  }
  else
  {
   return false;
  }
 }
 return true;
}
 
void AQuest::Update( FName Objective, int32 Progress )
{
 for ( auto Obj : CurrentObjectives )
 {
  if ( Obj\-\>ObjectiveName \== Objective )
  {
   Obj\-\>Update( Progress );
   return;
  }
 }
}
 
bool AQuest::TryUpdate( FName Objective, int32 Progress )
{
 bool result \= CanUpdate( Objective );
 if ( result )
 {
  Update( Objective, Progress );
 }
 return result;
}
 
float AQuest::QuestCompletion( ) const 
{
        int32 NumObjectives \= CurrentObjectives.Num( );
        if( NumObjectives \== 0 ) return 1.0f;
 
        float AggregateCompletion \= 0.0f;
        for( auto Objective : CurrentObjectives )
        {
                AggregateCompletion +\= Objective\-\>GetProgress( );
        }
        return AggregateCompletion / (float)NumObjectives;
}

Probably the most complex code out of all of this is the CanUpdate method. It checks to see, sequentially (so order of AObjective configuration matters), if an AObjective is completed and if it is required to complete any other AObjectives after it. This is where the bitwise OR comes in. So basicly, we cannot advance to the requested AObjective if any of the previous AObjectives are not complete and are set to MustBeCompletedToAdvance (or as the listeral code says you CAN advance if the previous AObjective IS complete OR it does not required to be completed in order to advance).

The IsComplete function is just and aggregate check to see if all AObjectives are complete - defining a completed AQuest. The QuestCompletion method is a simple averaging of all AObjective completion percentages.

Also, the AQuest class has a simple function to wrap up the CanUpdate and Update calls into one neat little function called TryUpdate. This allows a check for the ability to update before applying the requested progress update and returns an indicator of success or failure. This is useful when code outside of AQuest wants to attempt AObjective updates without caring about much else.

Finally, for the same reason of AObjective's BeginPlay and Tick functions, AQuest also overrides these to allow your coding skills and imagination to fly.

Hopefully, this was a good introduction into the groundwork of designing a questing framework for your Unreal Engine 4 game. If you did enjoy it, comment or like it. If there is enough interest I will continue on-wards with Part II: Nesting Quests and Objectives. That part will be a tutorial just like this, with full code samples, explaining how to structure the framework to nest multiple AObjectives into an AObjective to create a structure of sub-objectives as well as the same pattern applied to AQuest to supply sub-quests.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Quest\_Framework&oldid=19141](https://wiki.unrealengine.com/index.php?title=Quest_Framework&oldid=19141)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)