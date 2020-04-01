Log Macro with Netmode and Colour - Epic Wiki                    

Log Macro with Netmode and Colour
=================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 YourProject.h](#YourProject.h)
*   [3 YourProject.cpp](#YourProject.cpp)
*   [4 Examples](#Examples)
    *   [4.1 Function logging](#Function_logging)
    *   [4.2 Variable logging](#Variable_logging)
*   [5 Credits](#Credits)

Overview
--------

Macro that adds the current netmode and colour to logging, as well as making it easier to use.  
Not recommended as a replacement for UE\_LOG, but as a quick'n dirty tool for rapid iteration.

YourProject.h
-------------

#define NETMODE\_WORLD (((GEngine == nullptr) || (GetWorld() == nullptr)) ? TEXT("") \\
        : (GEngine->GetNetMode(GetWorld()) == NM\_Client) ? TEXT("\[Client\] ") \\
        : (GEngine->GetNetMode(GetWorld()) == NM\_ListenServer) ? TEXT("\[ListenServer\] ") \\
        : (GEngine->GetNetMode(GetWorld()) == NM\_DedicatedServer) ? TEXT("\[DedicatedServer\] ") \\
        : TEXT("\[Standalone\] "))
 
#if \_MSC\_VER
    #define FUNC\_NAME    TEXT(\_\_FUNCTION\_\_)
#else // FIXME - GCC?
    #define FUNC\_NAME    TEXT(\_\_func\_\_)
#endif
 
#define TRACE(Format, ...) \\
{ \\
    SET\_WARN\_COLOR(COLOR\_CYAN);\\
    const FString Msg = FString::Printf(TEXT(Format), ##\_\_VA\_ARGS\_\_); \\
    if (Msg == "") \\
    { \\
        UE\_LOG(LogYourCategory, Log, TEXT("%s%s() : %s"), NETMODE\_WORLD, FUNC\_NAME, \*GetNameSafe(this));\\
    } \\
    else \\
    { \\
        UE\_LOG(LogYourCategory, Log, TEXT("%s%s() : %s"), NETMODE\_WORLD, FUNC\_NAME, \*Msg);\\
    } \\
    CLEAR\_WARN\_COLOR();\\
}
 
#define TRACESTATIC(Format, ...) \\
{ \\
    SET\_WARN\_COLOR(COLOR\_CYAN);\\
    const FString Msg = FString::Printf(TEXT(Format), ##\_\_VA\_ARGS\_\_); \\
    UE\_LOG(LogYourCategory, Log, TEXT("%s() : %s"), FUNC\_NAME, \*Msg);\\
    CLEAR\_WARN\_COLOR();\\
}
 
#define TRACEWARN(Format, ...) \\
{ \\
    SET\_WARN\_COLOR( COLOR\_YELLOW );\\
    const FString Msg = FString::Printf(TEXT(Format), ##\_\_VA\_ARGS\_\_); \\
    UE\_LOG(LogYourCategory, Log, TEXT("\*\*WARNING\*\* %s%s() : %s"), NETMODE\_WORLD, FUNC\_NAME, \*Msg);\\
    CLEAR\_WARN\_COLOR();\\
}
 
#define TRACEERROR(Format, ...) \\
{ \\
    SET\_WARN\_COLOR( COLOR\_RED );\\
    const FString Msg = FString::Printf(TEXT(Format), ##\_\_VA\_ARGS\_\_); \\
    UE\_LOG(LogYourCategory, Log, TEXT("\*\*ERROR\*\* %s%s() : %s"), NETMODE\_WORLD, FUNC\_NAME, \*Msg);\\
    CLEAR\_WARN\_COLOR();\\
}
 
#define SCREENDEBUG(Format, ...) \\
{ \\
    const FString Msg = FString::Printf(TEXT(Format), ##\_\_VA\_ARGS\_\_); \\
    if (Msg == "") \\
    { \\
        TCHAR StdMsg\[MAX\_SPRINTF\] = TEXT(""); \\
        FCString::Sprintf(StdMsg, TEXT("%s%s() : %s"), NETMODE\_WORLD, FUNC\_NAME, \*GetNameSafe(this)); \\
        GEngine->AddOnScreenDebugMessage(-1, 10.0f, FColor::White, StdMsg); \\
    } \\
    else \\
    { \\
        GEngine->AddOnScreenDebugMessage(-1, 10.0f, FColor::White, Msg); \\
    } \\
}

YourProject.cpp
---------------

    DEFINE\_LOG\_CATEGORY( LogYourCategory );

Examples
--------

### Function logging

Usage:

void USomeClass::WithSomeFunction()
{
    TRACE("");
}

Output:  
LogYourCategory: \[Standalone\] USomeClass::WithSomeFunction() :

### Variable logging

Usage:

void USomeClass::WithSomeFunction()
{
    TRACE("Name: %s, Health %d, DistanceToEnemy: %f", \*PlayerName.ToString(), Health, GetDistance(EnemyLoc));
}

Output:  
LogYourCategory: \[Client\] USomeClass::WithSomeFunction() : Name: DudeGuy, Health 76, DistanceToEnemy: 128.0512

Credits
-------

[Spoof](/index.php?title=User:Spoof&action=edit&redlink=1 "User:Spoof (page does not exist)") - original implementation.  
[Kris](/User:Kris "User:Kris") - simplification & netmode.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Log\_Macro\_with\_Netmode\_and\_Colour&oldid=14089](https://wiki.unrealengine.com/index.php?title=Log_Macro_with_Netmode_and_Colour&oldid=14089)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)