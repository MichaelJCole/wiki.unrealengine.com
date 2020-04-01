Time Macros - Epic Wiki                    

Time Macros
===========

Contents
--------

*   [1 Overview](#Overview)
*   [2 YourProject.h](#YourProject.h)
*   [3 Examples](#Examples)
    *   [3.1 Actor Tick](#Actor_Tick)
        *   [3.1.1 SomeActor.h](#SomeActor.h)
        *   [3.1.2 SomeActor.cpp](#SomeActor.cpp)
*   [4 Credits](#Credits)

Overview
--------

Convenience macros for creating and working with values based on GetWorld()->GetTimeSeconds().

YourProject.h
-------------

#define TIMENOW            (GetWorld() ? GetWorld()->GetTimeSeconds() : 0.0f)
#define TIMESINCE(Time)    (GetWorld()->GetTimeSeconds() - Time)

Examples
--------

### Actor Tick

#### SomeActor.h

protected:
    float SomeTime;

#### SomeActor.cpp

void ASomeActor::Tick(float DeltaSeconds)
{
    Super::Tick(DeltaSeconds);
 
    if (TIMESINCE(SomeTime) \>= 1.0f)
    {
        SomeTime \= TIMENOW;
        DoSomething();
    }
}

Credits
-------

[Kris](/User:Kris "User:Kris")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Time\_Macros&oldid=14093](https://wiki.unrealengine.com/index.php?title=Time_Macros&oldid=14093)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)