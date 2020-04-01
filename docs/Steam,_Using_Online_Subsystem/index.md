Steam, Using Online Subsystem - Epic Wiki                    

Steam, Using Online Subsystem
=============================

_Original Author_: Math Nerd Productions

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 Prerequisites](#Prerequisites)
*   [3 Online Subsystem Overview](#Online_Subsystem_Overview)
    *   [3.1 Using the Online Subsystem](#Using_the_Online_Subsystem)
    *   [3.2 Interfaces](#Interfaces)
    *   [3.3 C++ Sample Code](#C.2B.2B_Sample_Code)
        *   [3.3.1 Accessing the Online Subsystem Interface](#Accessing_the_Online_Subsystem_Interface)
        *   [3.3.2 The Identity Interface](#The_Identity_Interface)
            *   [3.3.2.1 Sample: Get Player SteamID64](#Sample:_Get_Player_SteamID64)
        *   [3.3.3 Restricting to Steam](#Restricting_to_Steam)
            *   [3.3.3.1 Sample: Check Player is Logged Into Steam](#Sample:_Check_Player_is_Logged_Into_Steam)
*   [4 Manual Implementation](#Manual_Implementation)
*   [5 Conclusion](#Conclusion)

Introduction
============

Dear Community,

After spending hours and hours on the forums, the answers website, and in the documentation trying to figure out just how to use the Steam API in an Unreal Engine project, I thought I'd make a guide for anyone else who wants to do the same. Please note that this guide is not complete at this time and it is very much based on my own personal experience, but since there is very little documentation on just how to use the Steam API, this guide is here to help get people started.

I will only post about Interfaces that I have used and know how to work with, so feel free to contribute to the guide and provide examples on how to use other Interfaces in the Online Subsystem.

Before getting started, make sure you have the Steam API already integrated with your project. Please check out Rama's guide to do that here:

[https://wiki.unrealengine.com/Steam,\_Using\_the\_Steam\_SDK\_During\_Development](https://wiki.unrealengine.com/Steam,_Using_the_Steam_SDK_During_Development)

* * *

Prerequisites
=============

By this point, you should be able to build your project, run it as a standalone preview, and see the Steam overlay. If you have that, congrats, your project is set up for Steam and you are ready to go. If not, check Rama's guide again or ask for help on the forums.

* * *

Online Subsystem Overview
=========================

I am by no means an expert, but I'll do my best to share my understanding of the Online Subsystem with you.

Basically, it is a layer of abstraction that provides us with access to community features on multiple online platforms without having to write platform-specific code, very much like the Unreal Engine itself. Specifically, this is the system that allows you to write a project that can access the online features of Steam, Game Center, Google Play, etc. without having to write specific code for each of those platforms.

The Online Subsystem is the interface that makes all of it happen.

* * *

Using the Online Subsystem
--------------------------

At the time of writing, there is currently little or no support for using the Online Subsystem in blueprints, so you'll have to work with it in C++. Of course, you can expose the code to blueprints by making your own nodes, but that's the only way I know of to access the Online Subsystem in a blueprint project.

* * *

Interfaces
----------

There are several interfaces in the Online Subsystem that you will use to access all of Steam's API. Each is pretty self-explanatory:

*   AchievementsInterface
*   ChatInterface
*   EntitlementsInterface
*   ExternalUIInterface
*   FriendsInterface
*   GroupsInterface
*   IdentityInterface
*   LeaderboardInterface
*   MessageInterface
*   NotificationTransportInterface
*   PartyInterface
*   PresenceInterface
*   SessionInterface
*   SharedCloudInterface
*   SharingInterface
*   StoreInterface
*   TimeInterface
*   TitleFileInterface
*   TurnBasedInterface
*   UserCloudInterface
*   UserInterface
*   TurnBasedMatchInterface
*   VoiceInterface

All of these are found at /Engine/Source/Runtime/Online/OnlineSubsystem/Public/Interfaces.

* * *

C++ Sample Code
---------------

Here's a few examples of just how to use these interfaces in your C++ code:

### Accessing the Online Subsystem Interface

You'll need to import the Online header:

 #include "Online.h"

If you've followed Rama's guide correctly, the Online Subsystem should automatically default to using Steam's methods, so all you need to do to access the system is to get a generic instance of the IOnlineSubsystem interface:

 IOnlineSubsystem\* ion = IOnlineSubsystem::Get();

* * *

### The Identity Interface

[https://docs.unrealengine.com/latest/INT/API/Runtime/OnlineSubsystem/Interfaces/IOnlineIdentity/index.html](https://docs.unrealengine.com/latest/INT/API/Runtime/OnlineSubsystem/Interfaces/IOnlineIdentity/index.html)

This interface is used primarily for getting information about the active player, such as the player's online status, unique SteamID64, nickname, etc.

##### Sample: Get Player SteamID64

Here's a sample function to get the player's SteamID64 using the Identity Interface:

 FString ASteamHandler::getSteamID(class APlayerController\* PlayerController)
 {
     IOnlineSubsystem\* ion = IOnlineSubsystem::Get();
     TSharedPtr<const FUniqueNetId> pid = ion->GetIdentityInterface()->GetUniquePlayerId(PlayerController->Player->GetControllerId());
     
     if (pid->IsValid())
         return pid->ToString();
     
     return "Error";
 }

* * *

### Restricting to Steam

By default, calling `IOnlineSubsystem::Get()` will return an instance of whatever version of IOnlineSubsystem is available, starting with the default. If you enabled Steam as your default OnlineSubsystem version, then it will be prioritized; however, if it is unavailable, you will get an instance of FOnlineSubsystemNull, or whatever else is available at the time. Each platform profile in UE4 has specific OnlineSubsystem assigned that is the best or official for that platform, so it is recommended to keep it like that for portability.

If there is ever a time where you absolutely cannot live without Steam, you can force IOnlineSubsystem to try to only return an instance of FOnlineSubsystemSteam. If it cannot, it will give you a null pointer. To do that, you simply provide Steam as an FName to the Get() method mentioned earlier.

 IOnlineSubsystem\* ion = IOnlineSubsystem::Get(FName("Steam"));

##### Sample: Check Player is Logged Into Steam

So with that in mind, here's a method to check if your active user is logged into Steam:

 UENUM(BlueprintType)
 enum class EOnlineStatus : uint8
 {
     eoLoggedIn = 0		UMETA(DisplayName = "Logged In"),
     eoNotLoggedIn = 1		UMETA(DisplayName = "Not Logged In"),
     eoLocal = 2		UMETA(DisplayName = "Local Player")
 };

 EOnlineStatus ASteamHandler::getPlayerOnline(class APlayerController\* PlayerController)
 {
     IOnlineSubsystem\* ion = IOnlineSubsystem::Get(FName("Steam"));
     
     if (ion == nullptr)
     {
         return EOnlineStatus::eoNotLoggedIn;
     }
     
     ELoginStatus::Type l = ion->GetIdentityInterface()->GetLoginStatus(PlayerController->Player->GetControllerId());
     
     if (l == ELoginStatus::Type::LoggedIn)
         return EOnlineStatus::eoLoggedIn;
     else if (l == ELoginStatus::Type::NotLoggedIn)
         return EOnlineStatus::eoNotLoggedIn;
     else if (l == ELoginStatus::Type::UsingLocalProfile)
         return EOnlineStatus::eoLocal;
     
     return EOnlineStatus::eoNotLoggedIn;
 }

* * *

Manual Implementation
=====================

The Online Subsystem can handle almost everything that you would want to do with the Steam API; however, if you still want to manually implement the Steam API, check out this guide:

[https://wiki.unrealengine.com/Linking\_Static\_Libraries\_Using\_The\_Build\_System](https://wiki.unrealengine.com/Linking_Static_Libraries_Using_The_Build_System)

* * *

Conclusion
==========

The Online Subsystem is a very simple way to integrate Steam into your projects. I hope this guide helps bring a bit of clarity to this very underdocumented topic.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Steam,\_Using\_Online\_Subsystem&oldid=16965](https://wiki.unrealengine.com/index.php?title=Steam,_Using_Online_Subsystem&oldid=16965)"

  ![](https://tracking.unrealengine.com/track.png)