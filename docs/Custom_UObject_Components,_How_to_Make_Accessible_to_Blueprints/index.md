Custom UObject Components, How to Make Accessible to Blueprints - Epic Wiki                    

Custom UObject Components, How to Make Accessible to Blueprints
===============================================================

_Author_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

This is how you expose your custom UObject components to Blueprints, so that you can add them to any blueprint you want!

Special thanks to Epic Dev Marc Audy for explaining this on the forums.

Code
----

#pragma once
#include "VictorySkelMeshComp.h"
#include "VictoryMorpherComp.generated.h"
 
UCLASS(meta\=(BlueprintSpawnableComponent))
class UVictoryMorpherComp : public UVictorySkelMeshComp
{
	GENERATED\_UCLASS\_BODY()

### The Critical Addition

The only thing you have to do to expose your custom UObject components to Blueprints is add this!

 meta=(BlueprintSpawnableComponent)

inside of UCLASS() !

Picture
-------

[![CustomComponents.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e0/CustomComponents.jpg)](/File:CustomComponents.jpg)

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Custom\_UObject\_Components,\_How\_to\_Make\_Accessible\_to\_Blueprints&oldid=5515](https://wiki.unrealengine.com/index.php?title=Custom_UObject_Components,_How_to_Make_Accessible_to_Blueprints&oldid=5515)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)