Streamed Levels, Test If Actor Is In Level Bounds - Epic Wiki                    

Streamed Levels, Test If Actor Is In Level Bounds
=================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Calculate Level Bounds](#Calculate_Level_Bounds)
*   [3 IsInside](#IsInside)
*   [4 Getting the Streaming Level Name](#Getting_the_Streaming_Level_Name)
*   [5 Summary](#Summary)

Overview
--------

**Author:** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here's how you can determine if an actor is within the bounds of a **streamed in level**!

  
//in playercontroller class

//Get the Currently Streamed Levels
const TArray<ULevelStreaming\*\>& StreamedLevels \= GetWorld()\-\>StreamingLevels;
 
for(const ULevelStreaming\* EachLevelStreaming : StreamedLevels)
{
	if( !EachLevelStreaming) 
	{
		continue;
	}
 
	ULevel\* EachLevel \=  EachLevelStreaming\-\>GetLoadedLevel();
 
	//Is This Level Valid and Visible?
	if( !EachLevel || !EachLevel\-\>bIsVisible) 
	{
		continue;
	}
 
	//Print Name of current Level Streaming to know which level the unit is in!
	ClientMessage( EachLevelStreaming\-\>GetWorldAssetPackageName() );
 
	//Is the Player Location Within this Level's Bounds
	if(ALevelBounds::CalculateLevelBounds(EachLevel).IsInside(GetPawn()\-\>GetActorLocation()))
	{
		ClientMessage("Yes Player Is Within This Level");
	}
}

Calculate Level Bounds
----------------------

The most notable function here is:

FBox ALevelBounds::CalculateLevelBounds

IsInside
--------

CalculateLevelBounds returns an FBox,

IsInside is an FBox function that takes in an FVector and sees if the FVector is within that box's bounds

ALevelBounds::CalculateLevelBounds(EachLevel).IsInside(GetPawn()\-\>GetActorLocation())

Getting the Streaming Level Name
--------------------------------

Please note as of 4.8 the way to obtain the name of the streaming level is:

EachLevelStreaming\-\>GetWorldAssetPackageName()

Summary
-------

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Streamed\_Levels,\_Test\_If\_Actor\_Is\_In\_Level\_Bounds&oldid=14820](https://wiki.unrealengine.com/index.php?title=Streamed_Levels,_Test_If_Actor_Is_In_Level_Bounds&oldid=14820)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)