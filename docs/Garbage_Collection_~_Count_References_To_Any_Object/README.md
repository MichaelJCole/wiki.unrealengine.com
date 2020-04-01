Garbage Collection ~ Count References To Any Object - Epic Wiki                    

Garbage Collection ~ Count References To Any Object
===================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Code](#Code)
*   [3 Who Is Referred to By My Object?](#Who_Is_Referred_to_By_My_Object.3F)
*   [4 Conclusion](#Conclusion)

Overview
--------

_Original Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

For a more thorough background in this topic of Memory Management I recommend you check out my main Garbage Collection wiki first:

[Garbage Collection and Dynamic Memory Allocation](https://wiki.unrealengine.com/Garbage_Collection_%26_Dynamic_Memory_Allocation#Counting_UPROPERTY.28.29_References_To_Any_Object)

In this wiki I am providing you with an extremely handy memory management tool, which is the ability to count references to any UObject yourself!

Additionally you can supply an array if you want to know exactly who is referred to by your object!

Victory!

Code
----

static int32 URamaStaticFunctionLib::GetObjReferenceCount(UObject\* Obj, TArray<UObject\*\>\* OutReferredToObjects \= nullptr)
{
	if(!Obj || !Obj\-\>IsValidLowLevelFast()) 
	{
		return \-1;
	}
 
	TArray<UObject\*\> ReferredToObjects;				//req outer, ignore archetype, recursive, ignore transient
	FReferenceFinder ObjectReferenceCollector( ReferredToObjects, Obj, false, true, true, false);
	ObjectReferenceCollector.FindReferences( Obj );
 
        if(OutReferredToObjects)
	{
		OutReferredToObjects\-\>Append(ReferredToObjects);
	}
	return OutReferredToObjects.Num();
}

Who Is Referred to By My Object?
--------------------------------

You can supply an array to my function if you want to know exactly who the object is referring to!

TArray<UObject\*\> ReferredToObjs;
 
GetObjReferenceCount(this,&ReferredToObjs);
 
for(UObject\* Each : ReferredToObjs)
{
	if(Each)
	{
		UE\_LOG(YourLog,Warning,TEXT("%s"), \*Each\-\>GetName());
	}
}

[![ObjRefCount.jpg](https://d26ilriwvtzlb.cloudfront.net/0/07/ObjRefCount.jpg)](/File:ObjRefCount.jpg)

Conclusion
----------

This is all the info you need to do your own careful UPROPERTY() memory management!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Garbage\_Collection\_%7E\_Count\_References\_To\_Any\_Object&oldid=21046](https://wiki.unrealengine.com/index.php?title=Garbage_Collection_%7E_Count_References_To_Any_Object&oldid=21046)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)