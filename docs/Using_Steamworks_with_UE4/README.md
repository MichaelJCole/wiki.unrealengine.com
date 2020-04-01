Using Steamworks with UE4 - Epic Wiki                    

Using Steamworks with UE4
=========================

**Rate this Page:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (2 votes)

Approved for Versions:4.11

Contents
--------

*   [1 Session system](#Session_system)
*   [2 Downloading the pull request](#Downloading_the_pull_request)
*   [3 Let's start](#Let.27s_start)
    *   [3.1 Enabling Steam Authentication](#Enabling_Steam_Authentication)
    *   [3.2 Setting your product name](#Setting_your_product_name)
    *   [3.3 Registering the server on the Steam master server](#Registering_the_server_on_the_Steam_master_server)
*   [4 Custom server name](#Custom_server_name)
*   [5 Author Link](#Author_Link)

Session system
==============

In order to successfully set your game servers, you'll need to follow eXi's wiki page ([How\_To\_Use\_Sessions\_In\_C++](/How_To_Use_Sessions_In_C%2B%2B "How To Use Sessions In C++")) to set a basic session system in C++.

![Note](https://d26ilriwvtzlb.cloudfront.net/b/b3/Icon_template_warning1.png) You need to use C++ session functions to list your server on the Steam master server. Blueprint functions don't work.

Downloading the pull request
============================

I made a pull request on GitHub with some fixes to the engine Steam integration. You can download it here: [https://github.com/EpicGames/UnrealEngine/pull/2135](https://github.com/EpicGames/UnrealEngine/pull/2135)

![Note](https://d26ilriwvtzlb.cloudfront.net/b/b3/Icon_template_warning1.png) If you don't have this pull request, you can't use the Steam authentication, list your server on Steam master server, and join your Steam server via IP using the open command in the console.

Let's start
===========

Enabling Steam Authentication
-----------------------------

Once you have my pull request and you followed the eXi's tutorial, you can start using this system. First you need to enable the Steam authentication. To do that, go into your gamemode class and add this in the constructor:

`#if !UE_EDITOR
bUseAuthentication = true;
#endif` 

Now you should have enabled the Steam authentication into the engine code.

Setting your product name
-------------------------

Now you need to set the Product Name that Steam will use in the game filters. If you have a Steamworks account with an app ID, go to Edit Steamworks Settings -> Application -> Dedicated Servers and then edit the Dedicated Game Servers Information section. You can use the same value for Product Name and for Server Browser Name. When you set these parameters, click on Save, and then go to the Publish tab to publish these informations. Now on Steamworks all should be OK. Now you have to inform the Engine about the new settings. To do this, open OnlineSessionAsyncServerSteam.cpp inside Engine\\Source\\Runtime\\Online\\OnlineSubsystemSteam\\Private into your UnrealEngine repository folder, then set STEAMPRODUCTNAME and STEAMGAMEDIR with the same value you entered in Steamworks, inside STEAMGAMEDESC you can enter whatever you want. Now your product name should be set. Let's go to the next step.

Registering the server on the Steam master server
-------------------------------------------------

To register your dedicated server on Steam, you'll need to create a session at the server launch, to do this you'll need a custom GameSession class. Create a custom GameSession class, and then override the RegisterServer() function writing this in the header file:

`virtual void RegisterServer() override;` 

This is an example use of the RegisterServer() function to set your server visible on Steam master server:

`void AMyGameSession::RegisterServer()
{
    IOnlineSubsystem* const OnlineSub = IOnlineSubsystem::Get();
    if (OnlineSub)
    {
        IOnlineSessionPtr Sessions = OnlineSub->GetSessionInterface();
        if (Sessions.IsValid())
        {
            AMyGameMode* MyGM = Cast<AMyGameMode>(GetWorld()->GetAuthGameMode());
            if (MyGM)
            {
                HostSettings = MakeShareable(new FOnlineSessionSettings(false, false, MaxPlayers));
                HostSettings->Set(SETTING_GAMEMODE, FString(*MyGM->GetName()), EOnlineDataAdvertisementType::ViaOnlineService);
                HostSettings->Set(SETTING_MAPNAME, GetWorld()->GetMapName(), EOnlineDataAdvertisementType::ViaOnlineService);
                HostSettings->Set(SETTING_MATCHING_HOPPER, FString("Deathmatch"), EOnlineDataAdvertisementType::DontAdvertise);
                HostSettings->Set(SETTING_MATCHING_TIMEOUT, 120.0f, EOnlineDataAdvertisementType::ViaOnlineService);
                HostSettings->Set(SETTING_SESSION_TEMPLATE_NAME, FString("GameSession"), EOnlineDataAdvertisementType::DontAdvertise);
                HostSettings->bUsesPresence = false;
                HostSettings->bIsLANMatch = false;
                HostSettings->bIsDedicated = true;
                HostSettings->bShouldAdvertise = true;
                HostSettings->bAllowJoinInProgress = MyGM->bAllowJoinInProgress;
                HostSettings->NumPublicConnections = MaxPlayers;
                Sessions->CreateSession(0, GameSessionName, *HostSettings);
            }
        }
    }
}` 

In this RegisterServer function, I'm getting some parameters such as GameMode or Map name from the GameMode class or from the GetWorld() function, but you can set fake parameters just to see if it works. Ok, now your server should be listed on the Steam master server, and you should be able to connect using the eXi's session system.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) You'll need to set the Presence to false when using session functions. Unfortunately you can't use BP functions because you can't set the Presence to false, so you have to call your custom C++ functions from Blueprints if you need to, but everything is explained by eXi in his wiki article.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) If you don't set up Steam correctly, this system won't work.

Custom server name
==================

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) In order to have a custom server name, you'll need to have the latest commit of my pull request

If you want a custom server name, simply set the GameServerName variable of the OnlineSubsystemSteam session interface, before creating the session. For example:

`Sessions->GameServerName = FString("My Server!");` 

Author Link
===========

[Scienziatogm](/index.php?title=User:Scienziatogm&action=edit&redlink=1 "User:Scienziatogm (page does not exist)") ([talk](/index.php?title=User_talk:Scienziatogm&action=edit&redlink=1 "User talk:Scienziatogm (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Using\_Steamworks\_with\_UE4&oldid=20299](https://wiki.unrealengine.com/index.php?title=Using_Steamworks_with_UE4&oldid=20299)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)