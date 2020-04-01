Access Functions & Variables From a TSubclassOf Variable in C++ - Epic Wiki                    

Access Functions & Variables From a TSubclassOf Variable in C++
===============================================================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (2 votes)

Approved for Versions:4.5, 4.6, 4.7

Contents
--------

*   [1 Overview](#Overview)
*   [2 Why](#Why)
*   [3 The Problem](#The_Problem)
*   [4 Example](#Example)

Overview
--------

In this tutorial I'll show you how to access the variables and functions of a specific class that you have specified, inside a <TSubclassOf> container.

  

Why
---

TSubclassOf is a special template of UClass which only accepts specific subclasses of some base class. So it's still a UClass which is just a class specifier which you can spawn things from, but it does not have the variables or functions of the declared class. however, you can GetDefaultObject<T>() which is a master copy of the defined class object and contains the default variables which you can use before spawning that object.

  

The Problem
-----------

In my example; I want to know how much ammunition a certain type of projectile will cost me in order to subtract it from my available ammunition, and to ensure I'm allowed to spawn it.

The Ordnance.h class allows me to return the (protected variable) cost of the ordnance object (usually a Blueprinted Sub-class) using the float GetAmmoCost(); function:

  

**Ordnance.cpp**

float AOrdnance::GetAmmoCost()
{
	return AmmoCost;
}

If you have a specific actor of sub-class, you can access this function with any issues. However, if you want to have a weapon that can specify any sub-class of ordnance, you'll have to first get that specified class in order to call the function.

  

Example
-------

The following code in 'Weapon.h' declares a variable using the <TSubclassOf> container. When Blueprinted, it allows the developer to select a specific sub-class of ordnance that we can fire from it. You'll also notice that this is part of a struct (this is not neccesary, but for the purposes of the tutorial shows that the code works with UStructs):

  
**Weapon.h**

USTRUCT()
struct FWeaponData
{
	GENERATED\_USTRUCT\_BODY()
 
	/\* Actual Ordnance To Fire \*/
	UPROPERTY(EditDefaultsOnly, Category \= "Ordnance")
	TSubclassOf<AOrdnance\> OrdnanceClass;
 
	FWeaponData()
		: OrdnanceClass(NULL)
	{
	}
};

  
The following code in 'Weapon.cpp', allows me to access and cast to the specific class defined by that variable, and call functions on it. Traditionally you might think to try and perform a regular 'Cast', but doing so will result in a difficult-to-debug Breakpoint, and stop your code from executing properly.

The key difference is the use of the 'GetDefaultObject()' function provided by Unreal, which will actually perform a safe cast and a check to the specific sub-class, enabling you to call functions on it and return values!

  
**Weapon.cpp**

void AWeapon::HandleFiring()
{
	/\* Check if we have Enough Ammo To Fire \*/
	float OrdnanceCost \= WeaponConfig.OrdnanceClass\-\>GetDefaultObject<AOrdnance\>()\-\>GetAmmoCost();
	bool bEnoughAmmo \= GetCurrentAmmo() \>= OrdnanceCost;
 
	if (bEnoughAmmo)
	{
		FireWeapon(OrdnanceCost); // Tab-Out Pure-Virtual For Now!
	}
}

**Note:** You have to do this for ANY type of variable that you want to return from an object specified inside a <TSubclassOf> variable!

Hope this helps!

[TheJamsh](/User:TheJamsh "User:TheJamsh") ([talk](/User_talk:TheJamsh "User talk:TheJamsh"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Access\_Functions\_%26\_Variables\_From\_a\_TSubclassOf\_Variable\_in\_C%2B%2B&oldid=12770](https://wiki.unrealengine.com/index.php?title=Access_Functions_%26_Variables_From_a_TSubclassOf_Variable_in_C%2B%2B&oldid=12770)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)