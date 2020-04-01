Actor Custom Components, Edit Variables Per Instance In Level Editor - Epic Wiki                    

Actor Custom Components, Edit Variables Per Instance In Level Editor
====================================================================

  

Contents
--------

*   [1 Overview](#Overview)
*   [2 Custom Component](#Custom_Component)
*   [3 Actor Class To Store Component](#Actor_Class_To_Store_Component)
*   [4 Conclusion](#Conclusion)

Overview
--------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

In this wiki I am showing you how you can make a custom C++ Actor Component whose variables can be edited on a per-instance basis in the Level Editor!

I used the setup I am showing here to make my own navigation system from scratch that allows me to add or remove objects from the nav mesh at any time by clicking on instanced objects in the level editor.

It's really useful to be able to edit your C++ component on a per-instance basis in the level editor!

You need two things:

1\. A Custom C++ Component

2\. A C++ Actor Base Class to house your custom component.

Custom Component
----------------

//Choosing a class group and making it BlueprintSpawnableComponent
UCLASS(ClassGroup\=JoyMech, meta\=(BlueprintSpawnableComponent))
class UJoyNavComp : public UActorComponent
{ 
	GENERATED\_BODY()
public: 
	UJoyNavComp(const FObjectInitializer& ObjectInitializer);
 
	//UPROPERTY(EditAnywhere, BlueprintReadWrite,Category="JoyNav")
	//FString CustomNavGroup;
 
	/\*\* Density Core Value, the smaller the more dense, density = 360/JoyNavDensity \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite,Category\="JoyNav")
	float JoyNavDensity;
 
	/\*\* Draw Units! \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite,Category\="JoyNav")
	bool DoDrawUnits;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite,Category\="JoyNav")
	bool DoDrawJoyNavDisplayInfo;
 
	/\*\* Each radius gets its own layers of units! \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite,Category\="JoyNav")
	TArray<int32\> RadiusLevels;
 
	/\*\* Trim out units that are closer than Radius \* TrimPercent \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite,Category\="JoyNav")
	float TrimPercent;
 
//.. etc

Actor Class To Store Component
------------------------------

UCLASS()
class AJoySMAHighest : public AStaticMeshActor
{
	GENERATED\_BODY()
public:
  UPROPERTY(VisibleAnywhere, Category\=JoySMAHighest,meta\=(ExposeFunctionCategories\="JoyNav", AllowPrivateAccess \= "true"))
  UJoyNavComp\* JoyNavComp;
 
};

Conclusion
----------

By using a C++ Actor base class for your custom C++ component, you can provide your Level Designers and yourself with the fastest possible workflow for your project!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Actor\_Custom\_Components,\_Edit\_Variables\_Per\_Instance\_In\_Level\_Editor&oldid=12617](https://wiki.unrealengine.com/index.php?title=Actor_Custom_Components,_Edit_Variables_Per_Instance_In_Level_Editor&oldid=12617)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)