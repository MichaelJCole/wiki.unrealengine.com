Timer Macros - Epic Wiki                    

Timer Macros
============

Contents
--------

*   [1 Overview](#Overview)
*   [2 YourProject.h](#YourProject.h)
*   [3 Examples](#Examples)
    *   [3.1 Dummy handle](#Dummy_handle)
        *   [3.1.1 SomeActor.h](#SomeActor.h)
        *   [3.1.2 SomeActor.cpp](#SomeActor.cpp)
    *   [3.2 Predefined handle](#Predefined_handle)
        *   [3.2.1 YourPlayerController.h](#YourPlayerController.h)
        *   [3.2.2 YourPlayerController.cpp](#YourPlayerController.cpp)

Overview
--------

_Authors:_ [Rama](/User:Rama "User:Rama"), [Kris](/User:Kris "User:Kris")

Convenience macros initially created by Rama and extended by Kris, for working with the timer system introduced from UE4.7 onwards.

YourProject.h
-------------

#define SETTIMER(param1, param2, param3) \\
{ \\
    FTimerHandle TimerHandle; \\
    GetWorldTimerManager().SetTimer(TimerHandle, this, &param1, param2, param3); \\
}
 
#define SETTIMERH(handle, param1, param2, param3) (GetWorldTimerManager().SetTimer(handle, this, &param1, param2, param3))
#define CLEARTIMER(handle) (GetWorldTimerManager().ClearTimer(handle))
#define ISTIMERACTIVE(handle) (GetWorldTimerManager().IsTimerActive(handle))
 
#define GETTIMERREMAINING(handle) (GetWorldTimerManager().GetTimerRemaining(handle))
#define GETTIMERELAPSED(handle) (GetWorldTimerManager().GetTimerElapsed(handle))

Examples
--------

### Dummy handle

Use the SETTIMER() macro to create a timer based off a dummy FTimerHandle variable.  
Once created, you cannot interact with this kind of timer in any way.

You will find plenty of cases where a dummy handle is used in the UE4 engine code base, this is a common case.

If you need to track a timer in any way, such as clearing it at a time of your choosing, or checking if it is active, make sure to use SETTIMERH() and a handle that you store as a global variable.

#### SomeActor.h

protected:
    UFUNCTION()
    void SomeFunction();

#### SomeActor.cpp

    SETTIMER(ASomeActor::SomeFunction, 0.25f, false);

### Predefined handle

Use the SETTIMERH() macro when to create a timer based off an existing FTimerHandle variable.  
Once created, you can interact with this timer by passing the FTimerHandle variable into other macros, such as CLEARTIMER() or ISTIMERACTIVE().

#### YourPlayerController.h

protected:
    FTimerHandle TimerHandle\_Taunt;
    float LastTauntTime;
 
    UFUNCTION()
    void TauntTimer();

#### YourPlayerController.cpp

void AYourPlayerController::ServerTaunt\_Implementation()
{
    // Only allow Taunt its been awhile since we last tried to commit Taunt.
    // TIMEXXX macros from https://wiki.unrealengine.com/Time\_Macros
    if (TIMESINCE(LastTauntTime) \> 5.0)
    {
        LastTauntTime \= TIMENOW;
        // Don't commit Taunt if a Taunt attempt is already pending.
        if (!ISTIMERACTIVE(TimerHandle\_Taunt))
        {
            // Delay the Taunt attempt a random amount to prevent trolling.
            SETTIMERH(TimerHandle\_Taunt, AYourPlayerController::TauntTimer, FMath::FRandRange(1.5f, 3.0f), false);
        }
    }
}

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Timer\_Macros&oldid=14645](https://wiki.unrealengine.com/index.php?title=Timer_Macros&oldid=14645)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)