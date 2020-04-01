Creating a movement component for pawn - Epic Wiki                    

Creating a movement component for pawn
======================================

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 Task 1 - Searching for the optimal path](#Task_1_-_Searching_for_the_optimal_path)
*   [3 Task 2 - Implementing movement to the end point](#Task_2_-_Implementing_movement_to_the_end_point)
*   [4 Future Prospects](#Future_Prospects)

Introduction
------------

Hi, My name is Dmitry and I'm a programmer at Snowforged Entertainment. Our team is currently working on Starfall Tactics – an upcoming online RTS game based on the Unreal Engine 4. I’ve just finished refactoring a movement component for spaceships. This component had to be rewritten three times, going back all the way to the start of development on the game to working on the current alpha version.

During this period of time, a lot of mistakes were made and painful lessons learned. In this diary, I’d like to share my experience with you and talk about Navigation Volumes, Movement component, AIController and Pawn.

**Objective: implement spaceship movement on a given plane.**

Things to consider:

*   Spaceships in Starfall Tactics have a maximum speed, rotational speed and a rate of acceleration. These parameters directly influence the ship’s movement.
*   You have to rely on Navigation Volume to automatically search for obstacles and decide on the safest path.
*   There shouldn’t be continuous synchronization of position coordinates across the network.
*   Spaceships can start moving from different speed states.
*   Everything must be done natively with regards to the architecture of Unreal Engine 4.

For the sake of simplicity, I've decided to break up the task into two sub-tasks: searching for the safest/optimal path and moving to the end point (located under the cursor).

Task 1 - Searching for the optimal path
---------------------------------------

First, let’s consider the elements involved in finding an optimal path via Unreal Engine 4. **UShipMovementComponent** is a movement component inherited from **UPawnMovementComponent**, due to the end unit (in this case, our spaceship) being derived from APawn.

**UPawnMovementComponent** is originated from **UNavMovementComponent**, which contains the **FNavProperties** field. These are navigational parameters that describe the shape of a given **APawn** that is also used by the **AIController** when searching for pathways.

Suppose we have a level that contains a spaceship, some static objects and Navigation Volume. We decide to send this spaceship from one point of the map to another. This is what happens inside UE4:

[![Scheme41.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c5/Scheme41.jpg)](/File:Scheme41.jpg)

1) **APawn** finds within itself the **ShipAIController** (in our case, it's just the class that was derived from **AIController**, having just a single method) and calls the method for seeking pathways. 2) In this method we first prepare a request to the navigation system. Then, after sending the request, we receive movement control points.

TArray<FVector> AShipAIController::SearchPath(const FVector& location)
{
  FPathFindingQuery Query;
  const bool bValidQuery = PreparePathfinding(Query, location, NULL);
  UNavigationSystem\* NavSys = UNavigationSystem::GetCurrent(GetWorld());
  FPathFindingResult PathResult;
  TArray<FVector> Result;
  if(NavSys)
  {
     PathResult = NavSys->FindPathSync(Query);
     if(PathResult.Result != ENavigationQueryResult::Error)
     {
         if(PathResult.IsSuccessful() && PathResult.Path.IsValid())
         {
             for(FNavPathPoint point : PathResult.Path->GetPathPoints())
             {
                 Result.Add(point.Location);
             }
         }
     }
     else
     {
         DumpToLog("Pathfinding failed.", true, true, FColor::Red);
     }
  }
  else
  {
      DumpToLog("Can't find navigation system.", true, true, FColor::Red);
  }
  return Result;
}

3) These points are then returned as an array to **APawn**, in a format that is convenient for us (**FVector**). Finally, the movement begins.

In a nutshell: **APawn** contains a **ShipAIController**, which at the time of the calling of **PreparePathfinding()** refers to **APawn** and receives the **UShipMovementComponent**, containing **FNavProperties** that address the navigation system in order to find the optimal path.

Task 2 - Implementing movement to the end point
-----------------------------------------------

So, we’ve just received a list of movement control points. The first point is always the spaceship’s current position, the latter - our destination. In this case, the place on the game map where we clicked with the cursor.

I should probably tell you a little bit about how we plan to interface with the network. For the sake of simplicity, let’s break up the process into several steps and describe each one:

1) We call the function responsible for starting the movement - **AShip::CommandMoveTo()**:

UCLASS()
class STARFALL\_API AShip : public APawn, public ITeamInterface
{
  ...
  UFUNCTION(BlueprintCallable, Server, Reliable, WithValidation, Category = "Ship")
  void CommandMoveTo(const FVector& location);
  void CommandMoveTo\_Implementation(const FVector& location);
  bool CommandMoveTo\_Validate(const FVector& location);
  ...
}

Pay close attention. On the client’s side, all Pawns are missing an **AIController**, which exists only on the server. So when the client calls the function to send the ship to a new location, all calculations should be done server-side. In other words, the server is responsible for seeking the optimal path for each spaceship because it is the **AIController** that works with the navigation system.

2) After we’ve found a list of control points inside the **CommandMoveTo()** method, we call the next one to start moving the selected spaceship. This method should be called on all clients.

UCLASS()
class STARFALL\_API AShip : public APawn, public ITeamInterface
{
  ...
  UFUNCTION(BlueprintCallable, Reliable, NetMulticast, Category = "Ship")
  void StartNavMoveFrom(const FVector& location);
  virtual void StartNavMoveFrom\_Implementation(const FVector& location);
  ...
}

In this method, a client that does not have any control points adds the fist received coordinate to the list of control points and “starts the engine”, moving the ship into motion. Using timers, we activate the process of sending the remaining intermediate and end points for this particular journey on the server:

void AShip::CommandMoveTo(const FVector& location)
{
  ...
  GetWorldTimerManager().SetTimer(timerHandler,
                                  FTimerDelegate::CreateUObject(this, &AShip::SendNextPathPoint),
                                  0.1f, true);
  ...
}

UCLASS()
class STARFALL\_API AShip : public APawn, public ITeamInterface
{
  ...
  FTimerHandle timerHandler;
  UFUNCTION(BlueprintCallable, Reliable, NetMulticast, Category = "Ship")
  void SendPathPoint(const FVector& location);
  virtual void SendPathPoint\_Implementation(const FVector& location);
  ...
}

On the client’s side, while the ship starts to accelerate and move to the first control point, it gradually receives the remaining control points and adds them to an array. This takes some load off the network and allows us to stretch the time it takes to send data, thus distributing the load.

Alright, enough with the supplementary info. Let’s get back to business ;) Our current task – make the ship move towards the nearest control point. Keep in mind that our ship has rotational speed, as well as a speed of acceleration.

When you send the spaceship to a new destination, it could be flying at full speed, staying still, accelerating or be in the process of turning in that particular moment. Therefore, we have to act depending on current speed characteristics and destination.

We have identified three types of spaceship behavior:

[![Scheme3.png](https://d26ilriwvtzlb.cloudfront.net/8/8b/Scheme3.png)](/File:Scheme3.png)

1.  The vessel can fly to the end point at full speed and fall back on rotational speed to arrive at its destination.
2.  The spaceship’s current speed might be too fast, so it will try to align with its destination using average speed. When the ship directly faces its destination, it will accelerate and try to reach the target at maximum speed.
3.  If the other pathways takes more time than simply rotating on the spot and flying to the target in a straight line, the vessel will proceed to do so.

Before the ship starts moving to a control point, we need to decide on the speed parameters to be used. To achieve this, we’ve implemented a function for simulating a flight. I’d rather skip explaining the code in this article, but if you need more information on this, just drop me a message.

The principles are quite simple - using the current **DeltaTime**, we keep moving the vector of our position and rotate the forward vector, simulating the vessel’s rotation. It’s quite a simple operation that utilizes vectors and **FRotator**.

I should probably mention that in each iteration of the ship’s rotation, we should track and accumulate the angle of rotation. If it’s more than 180 degrees, it means that the spaceship has started moving in circles around the end point, so we should probably try the next set of speed parameters.

At first, the spaceship tries to fly at full speed and then at reduced speed (we are currently using average speed). If none of these solutions work – the ship simply needs to rotate in order to align with its destination and fly towards it.

Please keep in mind that all of the logic in the assessment of the situation and the movement processes should be implemented in **AShip**. This is due to the **AIController** missing on the client’s side, as well as **UShipMovementComponent** playing a different role (which I’ll talk about soon). So to make sure that our spaceships can move on their own, without constantly synchronizing coordinates with the server, we need to realize the movement logic within **AShip**.

Now, let’s talk about the most important part of the whole process - our movement component **UShipMovementComponent**. You should keep in mind that components of this type are just like engines. Their function is moving the object forward and rotating it when necessary, without worrying about what kind of logic should the object rely on for movement or what state it is in. Once again, they are only responsible for the actual movement of the said subject.

The gist of using **UMovementComponent** and its derived classes is as follows: we use a given **Tick()** to make all mathematical calculations related to our component’s parameters (speed, maximum speed, rotational speed). We then set the **UMovementComponent::Velocity** parameter to a value that is relevant to the spaceship’s transposition at this time tick. Then, we call **UMovementComponent::MoveUpdatedComponent()**, where the actual transposition and rotation of the spaceship occurs.

void UShipMovementComponent::TickComponent(float DeltaTime, enum ELevelTick TickType, FActorComponentTickFunction\* ThisTickFunction)
{
  Super::TickComponent(DeltaTime, TickType, ThisTickFunction);
  if(!PawnOwner || !UpdatedComponent || ShouldSkipUpdate(DeltaTime))
  {
     return;
  }
  if (CheckState(EShipMovementState::Accelerating))
  {
     if (CurrentSpeed < CurrentMaxSpeed)
     {
         CurrentSpeed += Acceleration;
         AccelerationPath += CurrentSpeed\*DeltaTime;
     }
     else
     {
         CurrentSpeed = CurrentMaxSpeed;
         RemoveState(EShipMovementState::Accelerating);
     }
  }
  else
  if (CheckState(EShipMovementState::Braking))
  {
    if (CurrentSpeed > 0.0f)
    {
       CurrentSpeed -= Acceleration;
       DeaccelerationPath += CurrentSpeed\*DeltaTime;
    }
    else
    {
       CurrentSpeed = 0.0f;
       CurrentMaxSpeed = MaxSpeed;
       RemoveState(EShipMovementState::Braking);
       RemoveState(EShipMovementState::Moving);
    }
 }
 else
 if (CheckState(EShipMovementState::SpeedDecreasing))
 {
   if (CurrentSpeed > CurrentMaxSpeed)
   {
     CurrentSpeed -= Acceleration;
     DeaccelerationPath += CurrentSpeed\*DeltaTime;
   }
   else
   {
       CurrentSpeed = CurrentMaxSpeed;
       RemoveState(EShipMovementState::SpeedDecreasing);
   }
 }
 if (CheckState(EShipMovementState::Moving) || CheckState(EShipMovementState::Turning))
 {
     MoveForwardWithCurrentSpeed(DeltaTime);
 }
}
...
void UShipMovementComponent::MoveForwardWithCurrentSpeed(float DeltaTime)
{
  Velocity = UpdatedComponent->GetForwardVector() \* CurrentSpeed \* DeltaTime;
  MoveUpdatedComponent(Velocity, AcceptedRotator, false);
  UpdateComponentVelocity();
}

A few words about the states that appear in this article. They are needed to combine the various processes related to movement. For example, when reducing speed (to have enough space for maneuvering, we need to move at average speed) and rotating towards a new destination.

In the movement component, states are used only for evaluation purposes: should we continue accelerating or should we decrease momentum, etc.

All of the logic related to the transition from one state of motion to another is done via **AShip**. For example, the spaceship is flying at full speed and the final destination has changed, so we need to lower the vessel’s speed to its average value.

And a quick word about **AcceptedRotator**. It's the ship’s rotation at the current time tick. In the **AShip** time tick we call the following method of the **UShipMovementComponent**:

bool UShipMovementComponent::AcceptTurnToRotator(const FRotator& RotateTo)
{
   if(FMath::Abs(RotateTo.Yaw - UpdatedComponent->GetComponentRotation().Yaw) < 0.1f)
   {
       return true;
   }
   FRotator tmpRot = FMath::RInterpConstantTo(UpdatedComponent->GetComponentRotation(),
                                              RotateTo, GetWorld()->GetDeltaSeconds(),
                                              AngularSpeed);
   AcceptedRotator = tmpRot;
   return false;
}

**RotateTo = (GoalLocation - ShipLocation).Rotation()** - ie this is a rotator that denotes what rotation value the vessel should be at in order for it to face the end point.

In this method, we evaluate whether the spaceship is already looking at the destination. In that case, this result is returned and the vessel will not rotate. In its assessment of the situation, **AShip** will reset the state **EShipMovementState::Turning** - and **UShipMovementComponent** will no longer attempt to rotate. Otherwise, we use the rotation and interpret based on **DeltaTime** and the spaceship’s rotational speed. Then apply this rotation to the current time tick, when calling **UMovementComponent::MoveUpdatedComponent()**.

Future Prospects
----------------

In my humble opinion, this particular version of **UShipMovementComponent** takes into account all of the problems our team faced during "Starfall Tactics" prototyping stage. As an added bonus, the solution turned out to be quite scalable and there is an opportunity to improve it further.

Take, for example, the moment when the spaceship is turning: if we simply rotate the ship, it looks dull, as if the vessel is attached to a piece of string. However, allowing the spaceship to dip slightly in the direction of the turn results in an attractive and fluid action.

Also, the synchronization of intermediate spaceship positions is realized on a workable level. As soon as the object reaches its destination, the data is synchronized with the server. So far, the difference in the vessel's final position on the server and the client is fairly small. However, if miscalculations start occurring more frequently, I have a lot of ideas on how to improve synchronization without spaceships performing sudden “jumps”. I guess we’ll talk about them next time.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_a\_movement\_component\_for\_pawn&oldid=12746](https://wiki.unrealengine.com/index.php?title=Creating_a_movement_component_for_pawn&oldid=12746)"

[Categories](/Special:Categories "Special:Categories"):

*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)