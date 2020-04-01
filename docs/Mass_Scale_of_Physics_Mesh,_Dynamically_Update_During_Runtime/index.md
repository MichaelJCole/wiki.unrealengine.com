Mass Scale of Physics Mesh, Dynamically Update During Runtime - Epic Wiki                    

Mass Scale of Physics Mesh, Dynamically Update During Runtime
=============================================================

Dear Community,

Please note that in UE4, physics objects / Kactors are actually Static Mesh Actors that are set to have physics simulation active.

So the code below is for an AStaticMeshActor deriving class of your own making.

Here is a function you can use to set the mass scale of a Static Mesh Actor that is using physics simulation, DURING runtime!

  
**Yes, you can dynamically update the mass of UE4 Physics Objects anytime you want during runtime!**

  
The key thing to note is the function

UpdateMassProperties()

Which is present in BodyInstance.h

void AYourStaticMeshActorClass::SetMassScale(const float& NewScale)
{
	if(!StaticMeshComponent) return;
       //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
	FBodyInstance\* BodyInst \= StaticMeshComponent\-\>GetBodyInstance();
 
	if(!BodyInst) return;
	//~~~~~~~~~~~~~~~~~~~~~~~~
 
	// New Scale 
	BodyInst\-\>MassScale \= NewScale;  
 
	// Trigger Update! 
	BodyInst\-\>UpdateMassProperties();
}

  

Summary
-------

By accessing the BodyInstance of a Static Mesh Actor you can update its mass scale during runtime,

**making physics objects in your game world lighter or heavier any time you want :)**

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Mass\_Scale\_of\_Physics\_Mesh,\_Dynamically\_Update\_During\_Runtime&oldid=2311](https://wiki.unrealengine.com/index.php?title=Mass_Scale_of_Physics_Mesh,_Dynamically_Update_During_Runtime&oldid=2311)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)