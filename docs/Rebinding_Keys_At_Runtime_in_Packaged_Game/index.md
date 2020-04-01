Rebinding Keys At Runtime in Packaged Game - Epic Wiki                    

Rebinding Keys At Runtime in Packaged Game
==========================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Full Project Release For You](#Full_Project_Release_For_You)
*   [3 BP Node Overview](#BP_Node_Overview)
*   [4 Victory BP Library](#Victory_BP_Library)
*   [5 Pic](#Pic)
*   [6 My C++ Code](#My_C.2B.2B_Code)
*   [7 Conclusion](#Conclusion)

Overview
--------

_Author_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Full Project Release For You
----------------------------

I have composed a full sample project that uses my Victory BP Library plugin nodes to create a fully rebindable keys menu in UE4!

With this menu you can simply click on the names of keys next to their related actions, and then press a key to rebind!

My input system tracks Ctrl Alt Shift and Command as well.

So you can simply click, then hold CTRL and press R to bind any action to Ctrl R !

And it saves to disk immediately and rebinds the input so that the keybind is instantly updated during runtime!

**Rama's Re-Bindable Keys Complete Sample Project For You**

[File:ReBindableKeys.zip](/File:ReBindableKeys.zip "File:ReBindableKeys.zip")

  
[![ReBindableKeysTitle.jpg](https://d3ar1piqh1oeli.cloudfront.net/5/5e/ReBindableKeysTitle.jpg/900px-ReBindableKeysTitle.jpg)](/File:ReBindableKeysTitle.jpg)

  

BP Node Overview
----------------

I have succeeded in rebinding keys at runtime in a packaged game for use with a UMG Key Rebinding menu!

I have provided you with the Blueprint nodes in my Victory BP Library!

[![VictoryRebindableKeys.jpg](https://d3ar1piqh1oeli.cloudfront.net/4/47/VictoryRebindableKeys.jpg/900px-VictoryRebindableKeys.jpg)](/File:VictoryRebindableKeys.jpg)

Victory BP Library
------------------

[Victory BP Library Download](https://forums.unrealengine.com/showthread.php?3851-(39)-Rama-s-Extra-Blueprint-Nodes-for-You-as-a-Plugin-No-C-Required!&p=175549&viewfull=1#post175549)

Pic
---

My C++ Code
-----------

I spent several hours to research how to do this in the UE4 code base.

Here's the core C++ code I wrote!

The whole source code is in my Victory BP Library download!

Enjoy!

bool UVictoryBPFunctionLibrary::VictoryReBindKey(FVictoryInput Action)
{
	UInputSettings\* Settings \= const\_cast<UInputSettings\*\>(GetDefault<UInputSettings\>());
	if(!Settings) return false;
 
	TArray<FInputActionKeyMapping\>& Actions \= Settings\-\>ActionMappings;
 
	//~~~
 
	bool Found \= false;
	for(FInputActionKeyMapping& Each : Actions)
	{
		if(Each.ActionName.ToString() \== Action.ActionName)
		{  
			UVictoryBPFunctionLibrary::UpdateActionMapping(Each,Action);
			Found \= true;
			break;
		}  
	}
 
	if(Found) 
	{
		//SAVES TO DISK
		const\_cast<UInputSettings\*\>(Settings)\-\>SaveKeyMappings();
 
		//REBUILDS INPUT, creates modified config in Saved/Config/Windows/Input.ini
		for (TObjectIterator<UPlayerInput\> It; It; ++It)
		{
			It\-\>ForceRebuildingKeyMaps(true);
		}
	}
	return Found;
}

Conclusion
----------

Enjoy!

♥

Rama

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Rebinding\_Keys\_At\_Runtime\_in\_Packaged\_Game&oldid=10214](https://wiki.unrealengine.com/index.php?title=Rebinding_Keys_At_Runtime_in_Packaged_Game&oldid=10214)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)