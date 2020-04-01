 Networking/Replication - Epic Wiki             

 

Networking/Replication
======================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Creating a server](#Creating_a_server)
    *   [2.1 Listen](#Listen)
    *   [2.2 Dedicated](#Dedicated)
*   [3 Joining a server](#Joining_a_server)
*   [4 Play In Editor Support](#Play_In_Editor_Support)
*   [5 Blueprint support](#Blueprint_support)
*   [6 C++ examples](#C.2B.2B_examples)
    *   [6.1 Sync character health to all clients](#Sync_character_health_to_all_clients)
        *   [6.1.1 YourCharacter.h](#YourCharacter.h)
        *   [6.1.2 YourCharacter.cpp](#YourCharacter.cpp)
    *   [6.2 Command from client to server](#Command_from_client_to_server)
        *   [6.2.1 YourPlayerController.h](#YourPlayerController.h)
        *   [6.2.2 YourPlayerController.cpp](#YourPlayerController.cpp)

Overview
--------

Unreal Engine has been designed with networking in mind since Unreal Engine 1.  
This includes:

*   Remote procedure calls (RPC).
*   Replication of variables, including structs & dynamic arrays.
*   Dedicated server support.
*   VOIP

Creating a server
-----------------

### Listen

A listen server includes the host as a local player.  
To launch a listen server, use the command line:  
<mygame.exe> <mymap>?listen -game

### Dedicated

A dedicated server does not include the host as a local player.  
Renderering, audio, and anything else that isn't required is disabled to use a minimal footprint both in memory and cpu.

To launch a dedicated server, use the command line:  
<mygame.exe> <mymap> -server

Games that are ready to ship with cooked data will also include a standalone executable <mygameserver.exe>.  
These are fully optimized for multiple instances per machine.

To launch a dedicated server using <mygameserver.exe>, use the command line:  
<mygameserver.exe> <mymap>

Joining a server
----------------

To join a server at a specified IP address as a client, use the command line:  
<mygame.exe> <IP address> -game

To join a server via the in-game console, use the command:  
open <IP address>

Play In Editor Support
----------------------

The editor includes built in support for networked games.

This is incredibly handy for quickly testing multiplayer games on a single host machine.

[![](https://d26ilriwvtzlb.cloudfront.net/7/74/EditorPIEOptions.jpg)](/index.php?title=File:EditorPIEOptions.jpg)

PIE Options

[![](https://d26ilriwvtzlb.cloudfront.net/7/74/EditorPIEOptions.jpg)](/index.php?title=File:EditorPIEOptions.jpg)

PIE Advanced Settings

Blueprint support
-----------------

Blueprints fully support replication, including replication notifications.  
Replication notifications are handy if you want a client to do something when a variable updates.  
eg. Play a particle effect if their health increases.

[![](https://d3ar1piqh1oeli.cloudfront.net/a/af/ReplicationBlueprintSupport.jpg/300px-ReplicationBlueprintSupport.jpg)](/index.php?title=File:ReplicationBlueprintSupport.jpg)

Blueprint Replication

[![](https://d3ar1piqh1oeli.cloudfront.net/e/e2/ReplicationBlueprintOnRep.jpg/300px-ReplicationBlueprintOnRep.jpg)](/index.php?title=File:ReplicationBlueprintOnRep.jpg)

Blueprint On Rep

C++ examples
------------

### Sync character health to all clients

#### YourCharacter.h

    UPROPERTY(Replicated)
    float Health;

#### YourCharacter.cpp

#include "UnrealNetwork.h"
// ...
void AYourCharacter::GetLifetimeReplicatedProps(TArray< FLifetimeProperty \> & OutLifetimeProps) const
{
    Super::GetLifetimeReplicatedProps(OutLifetimeProps);

    // Replicate to everyone
    DOREPLIFETIME(AYourCharacter, Health);
}

The DOREPLIFETIME macro is defined in UnrealNetwork.h, so make sure you #include it in your .cpp file. Your project will need a dependency on the "Engine" module in its Build.cs file to find the header, but most projects will have this dependency already.

### Command from client to server

#### YourPlayerController.h

    bool bSomeBool;
    
    void SetSomeBool(bool bNewSomeBool);

    UFUNCTION(reliable, server, WithValidation)
    void ServerSetSomeBool(bool bNewSomeBool);
    virtual void ServerSetSomeBool\_Implementation(bool bNewSomeBool);
    virtual bool ServerSetSomeBool\_Validate(bool bNewSomeBool);

As of UE 4.15 the compile system adds the implementation and validation definitions for you. Making the code for the header as follows

    bool bSomeBool;
    
    void SetSomeBool(bool bNewSomeBool);

    UFUNCTION(reliable, server, WithValidation)
    void ServerSetSomeBool(bool bNewSomeBool);

You'll still need everything in the cpp file though!

#### YourPlayerController.cpp

void AYourPlayerController::SetSomeBool(bool bNewSomeBool)
{
    // Change the value of the bSomeBool property
    bSomeBool \= bNewSomeBool;

    // If this next check succeeds, we are \*not\* the authority, meaning we are a network client.
    // In this case we also want to call the server function to tell it to change the bSomeBool property as well.
    if (Role < ROLE\_Authority)
    {
        ServerSetSomeBool(bNewSomeBool);
    }
}

bool AYourPlayerController::ServerSetSomeBool\_Validate(bool bNewSomeBool)
{
    return true;
}

void AYourPlayerController::ServerSetSomeBool\_Implementation(bool bNewSomeBool)
{
    // This function is only called on the server (where Role == ROLE\_Authority), called over the network by clients.
    // We need to call SetSomeBool() to actually change the value of the bool now!
    // Inside that function, Role == ROLE\_Authority, so it won't try to call ServerSetSomeBool() again.
    SetSomeBool(bNewSomeBool);
}

[Kris](/index.php?title=User:Kris&action=edit&redlink=1 "User:Kris (page does not exist)")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Networking/Replication&oldid=161](https://wiki.unrealengine.com/index.php?title=Networking/Replication&oldid=161)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")