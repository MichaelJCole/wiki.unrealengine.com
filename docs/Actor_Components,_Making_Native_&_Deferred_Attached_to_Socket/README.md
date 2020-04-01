Actor Components, Making Native & Deferred Attached to Socket - Epic Wiki                    

Actor Components, Making Native & Deferred Attached to Socket
=============================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Deferred Attachment](#Deferred_Attachment)
*   [3 .h](#.h)
*   [4 .Cpp Constructor](#.Cpp_Constructor)
*   [5 What is Mesh?](#What_is_Mesh.3F)
*   [6 Conclusion](#Conclusion)

Overview
--------

**Author:** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Here is my complete code sample for creating and attaching native C++ actor components!

[![Nativecomp.jpg](https://d26ilriwvtzlb.cloudfront.net/9/91/Nativecomp.jpg)](/File:Nativecomp.jpg)

Deferred Attachment
-------------------

This code follows the Deferred Attachment model, whereby you pick a name and a socket, but the actual attachment occurs after the Character Blueprint has also initialized.

(blueprints are not yet setup during the C++ constructor, and their values cannot be relied on)

.h
--

    //JoyControl
TSubobjectPtr<UStaticMeshComponent\> JoyfulControl;
UStaticMesh \* AssetSM\_JoyControl;
 
FORCEINLINE void SetupSMComponentsWithCollision(UStaticMeshComponent\* Comp)
{
	if(!Comp) return;
	//~~~~~~~~
 
	Comp\-\>bOwnerNoSee \= false;
	Comp\-\>bCastDynamicShadow \= true;
	Comp\-\>CastShadow \= true;
	Comp\-\>BodyInstance.SetObjectType(ECC\_WorldDynamic);
	Comp\-\>BodyInstance.SetCollisionEnabled(ECollisionEnabled::QueryAndPhysics);
	Comp\-\>BodyInstance.SetResponseToAllChannels(ECR\_Ignore);
	Comp\-\>BodyInstance.SetResponseToChannel(ECC\_WorldStatic, ECR\_Block);
	Comp\-\>BodyInstance.SetResponseToChannel(ECC\_WorldDynamic, ECR\_Block);
	Comp\-\>BodyInstance.SetResponseToChannel(ECC\_Pawn, ECR\_Block);
	Comp\-\>SetHiddenInGame(false);
}

  

.Cpp Constructor
----------------

    //Asset, Reference Obtained Via Right Click in Editor
static ConstructorHelpers::FObjectFinder<UStaticMesh\> StaticMeshOb\_AW2(TEXT("StaticMesh'/Game/VictoryGoals/Mechs/JoyControl/JoyControl\_WindTurtle.JoyControl\_WindTurtle'"));
 
AssetSM\_JoyControl \= StaticMeshOb\_AW2.Object;
 
//Create
JoyfulControl \= ObjectInitializer.CreateDefaultSubobject < UStaticMeshComponent \> (this, TEXT("JoyfulControlYay"));
 
//Set Mesh
JoyfulControl\-\>SetStaticMesh(AssetSM\_JoyControl);
 
//Setup (see .h)
SetupSMComponentsWithCollision(JoyfulControl);
 
//Deferred Attachment (Ty Nick W.! Actual attach gets done after blueprint stuff)
JoyfulControl\-\>AttachParent \= Mesh;
JoyfulControl\-\>AttachSocketName \= "JoyControl";

What is Mesh?
-------------

Mesh is a great choice for a component to attach to if you are deriving from an ACharacter class.

If not using ACharacter, and if you have a RootComponent for your actor class already,

you can simply replace Mesh with RootComponent

 JoyfulControl->AttachParent = RootComponent;

If you are making a new actor class that does not have a RootComponent, then make one of your new components into the RootComponent

 RootComponent = YourComp;

Conclusion
----------

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Actor\_Components,\_Making\_Native\_%26\_Deferred\_Attached\_to\_Socket&oldid=12165](https://wiki.unrealengine.com/index.php?title=Actor_Components,_Making_Native_%26_Deferred_Attached_to_Socket&oldid=12165)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)