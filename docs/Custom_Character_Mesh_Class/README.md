Custom Character Mesh Class - Epic Wiki                    

Custom Character Mesh Class
===========================

Contents
--------

*   [1 Overview](#Overview)
*   [2 .cpp](#.cpp)
*   [3 Review](#Review)
*   [4 Summary](#Summary)

Overview
--------

**Author:** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

In this wiki I show you how you can easily use your own custom Skeletal Mesh Component class with the UE4 ACharacter class!

In the same way that you can easily change the UE4 Character class to use a [custom character movement component](https://wiki.unrealengine.com/Custom_Character_Movement_Component), without having to create your own character class from Pawn upward, you can also tell UE4 to use a custom character mesh class!

**This means that you can implement a custom Skeletal Mesh component with your ACharacter-extending-characters at any time during development!**

The only rule is that your custom USkeletalMeshComponent class must extend USkeletalMeshComponent as its base class

.cpp
----

In the constructor of your character, you specify your custom character mesh class:

//Custom Mesh Class!
AYourCharacter::AYourCharacter(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer.SetDefaultSubobjectClass<UVictoryMorpherComp\>(ACharacter::MeshComponentName))
{

Review
------

The only change to the regular UE4 constructor is this:

Super(ObjectInitializer.SetDefaultSubobjectClass<UVictoryMorpherComp\>(ACharacter::MeshComponentName))

You are telling UE4 to set a subobject class by name.

This name is set in Character.cpp

FName ACharacter::MeshComponentName(TEXT("CharacterMesh0"));

and used here:

Mesh \= CreateOptionalDefaultSubobject<USkeletalMeshComponent\>(ACharacter::MeshComponentName);

Summary
-------

Epic Engineers have made it very easy for you to customize the ACharacter class with your own custom Skeletal Mesh, Capsule, and Movement component classes!

You dont have to rebuild characters from APawn to use custom components, just use the syntax shown above to tell UE4 to use your own custom component classes that derive from the base classes used by ACharacter!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Custom\_Character\_Mesh\_Class&oldid=13587](https://wiki.unrealengine.com/index.php?title=Custom_Character_Mesh_Class&oldid=13587)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)