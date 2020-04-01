Event handling - Epic Wiki                    

Event handling
==============

The goal for this wiki is to be a goto page for learning a general method for writing event handlers to interface with a target delegate, to give a top-down view of this part of the engine and pass on a grasp of the idioms required to handle events via C++. Why is understanding delegates important? Events are handled by delegates. The delegate "system: is a key vertebrae in the backbone of the UDK's messaging system, the idioms and axioms surrounding the defining of delegates will be essential learning for anyone doing non-trivial work with the engine on it's higher levels.

Delegates are very cleverly defined and complex, making heavy use of templates and typedefs, but thanks to encapsulation and that same clever design, the interfaces are all that need to be understood. The first argument, `FActorBeginOverlapSignature`, associates a type with this delegates signature. Delegate signatures are stored in the header files of their respective classes and super-classes. Children can and do inherit their status with delegates from their parents. While this wiki only deals with `OnActorBeginOverlap` take note that you can look in the headers of base classes and find information about the delegates signatures available to them. Adding our event handler to the OnActorBeginOverlap delegate's list of callbacks will be the end-goal of this howto.

//Actor.h
...
// Delegate signatures
...
DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_OneParam( FActorBeginOverlapSignature, class AActor\*, OtherActor );
...

The delegate will expect an event handler (regular function) with the EXACT same signature. If the signature has no type/name arguments then the function you define must also have no arguments. That isn't to say that you copy-past the signature from the macro above; the signatures must be the same **conceptually, not literally**. The delegate signature's first parameter is a type associated with the signature for use in other parts of the system. The rest of the parameters rotate between the type and name of the parameters in the delegates interface in order from left to right. If there are no parameters after the signature's type, then the interface has no parameters. In this example, there is only one parameter, it's type is `AActor*` and it's name is `OtherActor`.

//Bleakwise.h
...
UFUNCTION()
void OnOverlap(AActor\* OtherActor)

  

//Bleakwise.cpp
...
void ABleakwise::OnOverlap(AActor\* OtherActor)
{
...
}

Now that our function has been declared and defined, we can add it to the delegates list of callbacks. This is done by calling the delegate's `AddDynamic` method. The fist argument is the object that will be associated with the event. In this example that is `ABleakwise`, so the first argument is a reference to itself, `this`. The second argument is a reference to the function that will be called in the event of this event. And there you have it. Whenever ABleakwise and another actor overlap eachother, the system will call the OnActorBeginOverlap delegate which will call `ABleakwise::OnOverlap(AActor* OtherActor)` passing in a pointer to the other `AActor` overlapping it (OtherActor). There's not much more to it.

//Bleakwise.cpp
...
OnActorBeginOverlap.AddDynamic(this, &ABleakwise::OnOverlap);

Delegates in Actor
------------------

As noted above, you can locate the signatures of a particular delegate from the header file of its respective source file (e.g., Actor.h has the delegates used by `Actor`). However, it's useful to have these collected in one location since they're not easily retrieved from the documentation at this time. You must of course give your method names actual names.

Damage-related event signatures:

*   **FTakeAnyDamageSignature:** `void (float Damage, const class UDamageType* DamageType, class AController* InstigatedBy, AActor* DamageCauser)`
*   **FTakePointDamageSignature:** `void (float Damage, class AController* InstigatedBy, FVector HitLocation, class UPrimitiveComponent* FHitComponent, FName BoneName, FVector ShotFromDirection, const class UDamageType* DamageType, AActor* DamageCauser )`

Collision/Overlap-related event signatures:

*   **FActorBeginOverlapSignature:** `void ( AActor* OtherActor )`
*   **FActorEndOverlapSignature:** `void ( AActor* OtherActor )`
*   **FActorHitSignature:** `void ( AActor* SelfActor, AActor* OtherActor, FVector NormalImpulse, const FHitResult& Hit )`

Mouse-related event signatures (none of these have formal parameters):

*   **FActorBeginCursorOverSignature:** `void ( )`
*   **FActorEndCursorOverSignature:** `void ( )`
*   **FActorOnClickedSignature:** `void ( )`
*   **FActorOnReleasedSignature:** `void ( )`

  
Touch-related event signatures:

*   **FActorOnInputTouchBeginSignature:** `void ( ETouchIndex::Type FingerIndex )`
*   **FActorOnInputTouchEndSignature:** `void ( ETouchIndex::Type FingerIndex )`
*   **FActorBeginTouchOverSignature:** `void ( ETouchIndex::Type FingerIndex )`
*   **FActorEndTouchOverSignature:** `void ( ETouchIndex::Type FingerIndex )`

Miscellaneous event signatures:

*   **FActorDestroyedSignature:** `void ( )`
*   **FActorEndPlaySignature:** `void ( EEndPlayReason::Type EndPlayReason )`
*   **FMakeNoiseDelegate:** `void ( AActor*, float, class APawn*, const FVector& )`

Documentation, [\[1\]](https://docs.unrealengine.com/latest/INT/Search/index.html?x=0&y=0&q=delegate), **Delegates**

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Event\_handling&oldid=13798](https://wiki.unrealengine.com/index.php?title=Event_handling&oldid=13798)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)