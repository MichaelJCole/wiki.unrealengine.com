Spawn Different Pawns For Every Player - Epic Wiki                    

Spawn Different Pawns For Every Player
======================================

**Rate this Article:**

4.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:(please verify)

Not every player is likely going to use [DefaultPawnClass](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/DefaultPawnClass/index.html) as their Pawn and my quick search through the UE4 community didn't result in any information. The Shooter example touches on this but only handles the difference between AI and Player, and not what to do if you have multiple Pawns that a player can select.

The first question I had when starting into this was where to store the information that tells the server what player is using what Pawn. I think the reason I struggled with this for so long was simply because the class that really holds information about a player is named [APlayerController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/APlayerController/index.html) and that led me to believe that I really should only be using it for input from the player. So very very wrong. The [APlayerController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/APlayerController/index.html) class is perfectly suited for this usage.

So the first thing I did was create a new struct to hold information about the players chosen Pawn. In the example below I only have one int32 as a property, but in our actual code we're storing much more about the Pawn that is required at spawn such as items the player may have equipped. For the purposes of this tutorial though the below is enough.

struct PlayerPawnData
{
	int32 Type;
};

Then inside your custom [APlayerController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/APlayerController/index.html) declaration you'd want to define a public property that uses this struct as it's type.

PlayerPawnData CurrentPawnData;

With this data now available in your [APlayerController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/APlayerController/index.html) declaration lets move to the custom [AGameMode](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/index.html) you've defined for your UE4 game.

There are a few functions inside [AGameMode](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/index.html) that are important to respawning a player. The first is [RestartPlayer](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/RestartPlayer/index.html) and the name of this function should make it's use pretty self-explanatory. This function is called when a player spawns, whether it's when they've first joined or just died. The functions that are called inside [RestartPlayer](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/RestartPlayer/index.html) is what we're going to focus on, primarily [GetDefaultPawnClassForController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/GetDefaultPawnClassForController/index.html).

The basic functionality of [GetDefaultPawnClassForController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/GetDefaultPawnClassForController/index.html) simply returns the member variable [DefaultPawnClass](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/DefaultPawnClass/index.html) but for this game that isn't going to work since each player could have a different Pawn class. That means we're going to have to override this function entirely. Lets start with the declaration inside your custom [AGameMode](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/index.html) class.

virtual UClass\* GetDefaultPawnClassForController(AController\* InController) OVERRIDE;

We'll also need some sort of storage so we can reference the Pawn class using the type provided inside the PlayerPawnData variable on the [APlayerController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/APlayerController/index.html).

TMapBase<int32, UClass\*, false> PawnTypes;

So we've marked [GetDefaultPawnClassForController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/GetDefaultPawnClassForController/index.html) as an override and we have a place to store our pawn types now lets create the functionality. Same as the examples above I've simplified the code for this tutorial. We've got a little more going on inside our [GetDefaultPawnClassForController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/GetDefaultPawnClassForController/index.html).

UClass\* AMyGameMode::GetDefaultPawnClassForController(AController\* InController)
{
	AMyPlayerController\* PlayerController = Cast<AMyPlayerController>(InController);

	UClass\* PawnClass = PawnTypes.Find(PlayerController->CurrentPawnData.Type);

	return PawnClass;
}

So what's happening above? We're casting the incoming [AController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AController/index.html) into our custom [APlayerController](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/APlayerController/index.html) and then referencing the CurrentPawnData's property Type to find the correct Pawn to spawn. With just this overridden the UE4 base [AGameMode](https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/GameFramework/AGameMode/index.html) class will start spawning the correct Pawn when the player joins or dies.

I'm sure there's a different way to go about doing this but this felt right to me. Storing the actual UClass would be an option but because in our specific use case we're storing more than just the UClass to spawn but also base stats pertaining to that Pawn type I went with just storing the type.

Reposted from [http://www.osnapgames.com/2014/06/17/spawn-different-pawns-depending-on-player-selection/](http://www.osnapgames.com/2014/06/17/spawn-different-pawns-depending-on-player-selection/)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Spawn\_Different\_Pawns\_For\_Every\_Player&oldid=8306](https://wiki.unrealengine.com/index.php?title=Spawn_Different_Pawns_For_Every_Player&oldid=8306)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)