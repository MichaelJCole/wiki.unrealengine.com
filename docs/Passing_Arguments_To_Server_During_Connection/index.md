Passing Arguments To Server During Connection - Epic Wiki                    

Passing Arguments To Server During Connection
=============================================

**Rate this Article:**

4.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:(please verify)

Just a quick tutorial from me today. It may be pretty self explanatory but maybe someone is trying to figure this out for themselves right now.

When working on our upcoming PC game in Unreal Engine 4 I found a need to pass information about the player from the client to the server, but without replication, and without an RPC once connected.

First let me explain some of the server side architecture. This game is going to have hosted dedicated servers that are created on demand on cloud machines. Players won't be hosting these themselves in order to keep the game fair and competitive. As a result I wanted to pass this information from my client while it was connecting to the dedicated server. It's incredibly easy to do this once you understand how connection to a server works in UE4.

Connection is handled through the [APlayerController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/APlayerController/index.html) class inside the function [ClientTravel](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/APlayerController/ClientTravel/index.html). [ClientTravel](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/APlayerController/ClientTravel/index.html) takes two required arguments and two optional. The required arguments are an address (including port) and what type of travel it is. Most cases the travel will be absolute. The address is the important piece of information though.

Your typical address will look something like this.

FString Address = TEXT("127.0.0.1:7777");

So we have our address but how do we append our parameters to the address so that the server can read them when the client connects? Appending parameters is quite similar to a URL in a web browser.

FString Address = FString::Printf(TEXT("127.0.0.1:7777?Param1=%s?Param2=%s"), \*Param1, \*Param2);

That is all it takes. Now once the client connects the server will be able to access those parameters.

Inside the [AGameMode](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/index.html)class there's a function named [InitNewPlayer](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/InitNewPlayer/index.html). This is called when a player connects and it takes in a [AController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AController/index.html), [FUniqueNetId](https://docs.unrealengine.com/latest/INT/API/Runtime/OnlineSubsystem/FUniqueNetId/index.html), FString. The FString named Options is what we're worried about here. By overriding the [InitNewPlayer](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/InitNewPlayer/index.html) function you can parse the additional parameters passed in by doing the following.

FString Param1 = ParseOption(Options, TEXT("Param1"));
FString Param2 = ParseOption(Options, TEXT("Param2"));

Now you can do whatever it is you needed to with the information you've passed onto the server. Hope this helped!

Reposted from [http://www.osnapgames.com/2014/06/13/passing-and-reading-arguments-to-an-unreal-engine-4-server-upon-connection/](http://www.osnapgames.com/2014/06/13/passing-and-reading-arguments-to-an-unreal-engine-4-server-upon-connection/)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Passing\_Arguments\_To\_Server\_During\_Connection&oldid=8295](https://wiki.unrealengine.com/index.php?title=Passing_Arguments_To_Server_During_Connection&oldid=8295)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)