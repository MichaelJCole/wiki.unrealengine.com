Steam workshop - Epic Wiki                     

Steam workshop
==============

Contents
--------

*   [1 Overview](#Overview)
*   [2 Requirements](#Requirements)
*   [3 Basic structure to interact with steam](#Basic_structure_to_interact_with_steam)
*   [4 First Steps with Steam](#First_Steps_with_Steam)
*   [5 Steam workshop](#Steam_workshop)
    *   [5.1 The count of subscribed items](#The_count_of_subscribed_items)
    *   [5.2 Getting file ids for subscribed items](#Getting_file_ids_for_subscribed_items)
    *   [5.3 Requesting details](#Requesting_details)
*   [6 Conclusion](#Conclusion)

Overview
--------

Hello to my first Unreal wiki entry :) This one is about using the SteamAPI so you can interact with it pretty easily using the [Steamworks documentation](https://partner.steamgames.com/home/steamworks) as your friend. In this one, I'll talk about the Steam workshop, which is a pretty neat feature in Steam, and it's 100% usable in Unreal Engine 4. Most of the features can also be written inside a Blueprint Function library which allows you to access Steam functions through blueprints! In the following examples, I just show how to use this in general, in my case, the Game instance which allows me to get Steam things at startup, but you can simply move the code to where-ever you want to have it!

Requirements
------------

Because we are using Steam, you need to follow some steps to get Steam working. If you already see the Steam overlay in your game, then you can skip this part. If not, read [this](https://wiki.unrealengine.com/Steam,_Using_the_Steam_SDK_During_Development). For a successful compiling, I'll write a few things here aswell because the wiki is not complete at that point.

*   You need to include the main steam\_api header file into your code file so it can find the functions. To do that, just include **"ThirdParty/Steamworks/Steamv132/sdk/public/steam/steam\_api.h"**. Note that the v132 may change due to later Unreal engine versions!
*   You need to compile the game with Steamworks, otherwise you'll get errors like UNRESOLVED EXTERNALS. To do this, simply go to your GameName.Build.cs file and add the following:

        PublicDependencyModuleNames.AddRange(new string\[\] {
            "OnlineSubsystem",
            "OnlineSubsystemUtils",
            "Steamworks"
        });
 
        DynamicallyLoadedModuleNames.Add("OnlineSubsystemSteam");

Thats all, so now your game should compile fine with using native SteamAPI functions!

Basic structure to interact with steam
--------------------------------------

So if we interact with Steam, we always need to make sure that Steam is up and running, otherwise the game will crash (for example if you test something in the editor, which will obviously not work). To be on the safe side:

if (SteamAPI\_Init())
{
  //do my steam stuff
}
else
{
  //push an error or something
}

SteamAPI\_Init() will return true if Steam is good to go, and false if not.

First Steps with Steam
----------------------

So in this article I go with the Steam workshop, but I'll just introduce you to a quick example so you see how to interact with Steam. The API delivers many interfaces like SteamFriends, SteamUtils, SteamUGC and many others. On the Steamworks page you find anything and how to use it. So a small test to get the players steam name:

if (SteamAPI\_Init())
{
  const char\* name \= SteamFriends()\-\>GetPersonaName();
  GEngine\-\>AddOnScreenDebugMessage(\-1, 5, FColor::Red, name);
}

This prints my Steam name onto the screen!

Steam workshop
--------------

Finally, lets get to the hot topic: Steam Workshop. Nearly all interactions with the Steam workshop via the API use the SteamUGC interface (UGC = **U**ser **G**enerated **C**ontent). I start by just getting the amount of items I have subscribed. We can use for testing the AppID 480, which is Spacewar, because that has Steam workshop support. Neat!

### The count of subscribed items

Getting the amount of items I have subscribed to is really easy. In those examples here I won't show you a header file, because thats self-explaining. The full code:

int32 UMyGameInstance::GetSubscribedItemCount()
{
  if (SteamAPI\_Init())
  {
    return SteamUGC()\-\>GetNumSubscribedItems();
  }
  else
  {
    return 0;
  }
}

So, this is pretty simple. If the SteamAPI is valid, he just returns the output of the function **SteamUGC()->GetNumSubscribedItems();** which is from the SteamUGC interface, as you can see. If Steam is not valid for some reason, I just output 0.

### Getting file ids for subscribed items

The Steam workshop operates with File IDs, so every workshop object has it's own Workshop ID. In this example, I will return a TArray<int32> containing all IDs. This would also be blueprint node ready. The code:

TArray<int32\> UMyGameInstance::GetSubscribedItemIDs()
{
  TArray<int32\> outArray;
 
  if (SteamAPI\_Init())
  {
    PublishedFileId\_t fileIds\[16\];
    int32 subItems \= SteamUGC()\-\>GetSubscribedItems(fileIds, 16);
 
    for (int i \= 0; i < subItems; i++)
    {
      PublishedFileId\_t id \= fileIds\[i\];
      outArray.Add(id);
    }
  }
  else
  {
    outArray.Add(0);
  }
  return outArray;
}

Lets go over it step-by-step. First I create an empty TArray of type int32 where I can store the IDs inside, because Steam will return an own type. After the check if steam is valid, I create a standard C++ array (it's different from Unreal arrays!) of the type **PublishedFileId\_t** which is Steam's type for those IDs. The array has an fixed size of 16 in this example, so 16 is the maximum output I want to have. Like a limit. Then, we'll execute **SteamUGC()->GetSubscribedItems()**, whereas the first argument is my array where all file ids should go, and the 16 is my limit again. Cool thing about this function is that it actually returns the amount of subscribed items he filled, so if you subscribed to 3 items, my variable subItems will be 3. Thats cool, because you need this now. I just run a simple for loop going from zero to the amount of subscribed items he got. Then I can just get one ID out of the array, and store this inside the **id** variable. Then, to make this unreal friendly, I add this id into the TArray. At the end, we'll just return this array, and done! Note the outArray.Add(0); which I made if steam is not valid! Pretty easy! Now, having an ID, we can go on with requesting details from items!

### Requesting details

So, in this example, we want the name of this object. This one is a bit harder because we use Callbacks for this. The way it works:

*   We send a request to the Steam Servers to get details for a specific file id
*   We need to wait till we have an answer from Steam
*   If we have received the answer, we call a function which processes the received data
*   We extract the name out of the received data

In this case, I show you the header part of this:

  /\* Steam UGC details \*/
  void OnUGCRequestUGCDetails(SteamUGCRequestUGCDetailsResult\_t \*pResult, bool bIOFailure);
  CCallResult<UMyGameInstance, SteamUGCRequestUGCDetailsResult\_t\> m\_callResultUGCRequestDetails;

The **OnUGCRequestUGCDetails** is the method we call if we got an answer. You see it takes two arguments. They are described [here](https://partner.steamgames.com/documentation/ugc#ConsumeContent). I also have the variable **m\_callResultUGCRequestDetails** which is the CallResult handler we will use to receive callbacks. Notice the structure of it:

  CCallResult<yourClass, theResult\> someName;

yourClass is then equal to the class name where you specify the result function and theResult is just the type of the result you want to get! Okey, after telling you this, lets get to the code!

  SteamAPICall\_t hSteamAPICall \= SteamUGC()\-\>RequestUGCDetails(fileids\[0\], 20);
  m\_callResultUGCRequestDetails.Set(hSteamAPICall, this, &UMyGameInstance::OnUGCRequestUGCDetails);

Every operation which has something to do with requests return an **SteamAPICall\_t**. In this case, I name it hSteamAPICall (h stands for handle). We use **SteamUGC()->RequestUGCDetails(fileId, maxAge)** for the requesting. fileID is the fileID where you want to get the details for (see the file id section above), and maxAge is actually a value in seconds which acts like a timeout. If we don't get an answer from steam for X seconds, he will terminate listening for that. Creating the callback then is relatively easy. We use our **m\_callResultUGCRequestDetails** callResult and execute the **.Set(apiCall, class, method)**. apiCall is as I said, the returned call of the request, class is equal to the class were listening at, in this case, we can use **this**, and method is the method we call when we have the result (we defined this in the header already!). The result method is then:

void UMyGameInstance::OnUGCRequestUGCDetails(SteamUGCRequestUGCDetailsResult\_t \*pResult, bool bIOFailure)
{
  if (bIOFailure)
  {
    return; //Something went wrong
  }
 
  SteamUGCDetails\_t hUGCDetails \= pResult\-\>m\_details;
  GEngine\-\>AddOnScreenDebugMessage(\-1, 10, FColor::Green, hUGCDetails.m\_rgchTitle);
}

Pretty simple setup. If we have an IOFailure, then we just return, because thats an error. If not, we go on. I store the details in the variable called **hUGCDetails**, which is from type **SteamUGCDetails\_T**. We can get the details easily by taking a look at the **pResult** variable we get back. It has the member **m\_details**, which contains all the details for an item. Then, I just get the title and print it to screen. Examples for getting different values of an item:

void UMyGameInstance::OnUGCRequestUGCDetails(SteamUGCRequestUGCDetailsResult\_t \*pResult, bool bIOFailure)
{
  itemName \= hUGCDetails.m\_rgchTitle; //Title
  itemDesc \= hUGCDetails.m\_rgchDescription; //Description (max 8000 chars long)
  itemLikes \= hUGCDetails.m\_unVotesUp; //How many upvotes we got on this item
}

Conclusion
----------

This is all I wanted to show you. Thanks to Steam, we don't need to mess around with downloading, because Steam does that on his own. With the details you should be able to create a simple UI showing all subscribed items, and If you create a blueprint library out of this, contact me, as I want to see what people do with this information :)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Steam\_workshop&oldid=17577](https://wiki.unrealengine.com/index.php?title=Steam_workshop&oldid=17577)"

  ![](https://tracking.unrealengine.com/track.png)