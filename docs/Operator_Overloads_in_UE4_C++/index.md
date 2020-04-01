Operator Overloads - Epic Wiki                     

Operator Overloads
==================

(Redirected from [Operator Overloads in UE4 C++](/index.php?title=Operator_Overloads_in_UE4_C%2B%2B&redirect=no "Operator Overloads in UE4 C++"))

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Code Simplification](#Code_Simplification)
*   [2 UE4 String Stream](#UE4_String_Stream)
    *   [2.1 Without Custom C++ Operators](#Without_Custom_C.2B.2B_Operators)
*   [3 Global Scope](#Global_Scope)
*   [4 FORCEINLINE](#FORCEINLINE)
*   [5 The C++](#The_C.2B.2B)
*   [6 Overloading Comparison Operators](#Overloading_Comparison_Operators)
    *   [6.1 C++ Example](#C.2B.2B_Example)
*   [7 Summary](#Summary)

Overview
--------

Dear Community,

Sooooo

This is one reason why I love UE4 C++ so much!

  
We can do **anything**!

  
Below is the C++ code for making two operators that I've overloaded for use with an FString and a Float

  

### Code Simplification

This enables me to go from

(Str is a FString)

Str \= FString::SanitizeFloat(TheFloat);

to

Str <<= TheFloat;

  

UE4 String Stream
-----------------

Using the code I am sharing with you below, I can also now create a UE4 String Stream! Streaming in Float values to Str like this!

Str \= "";
Str << Float1 << Float2 << Float3;

### Without Custom C++ Operators

for reference to do the above without my operators I would have to do this

Str \= ""
Str +\= FString::SanitizeFloat(Float1);
Str +\= " ";
Str +\= FString::SantizeFloat(Float2);
Str +\= " ";
Str +\= FString::SanitizeFloat(Float3);

Global Scope
------------

Please note you must define the operators at the global scope, so whatever .h you put them, dont include any "::" like MyClass::etc

FORCEINLINE
-----------

FORCEINLINE is a requirement for operator overloads if you want to be able to easily define them in a way that the UE4 compiler will like even when you have code split across multiple .cpp chunks!

With operator overloads you can either define them in one place, or use FORCEINLINE, and FORCEINLINE is the much easier approach when multiple header include appearances are involved :)

The C++
-------

//Str float
FORCEINLINE	FString&	operator<<(FString &Str, const float& Value )
{
	if(Str.Len() \> 0) Str +\= " ";
	Str +\= FString::SanitizeFloat(Value);
	return Str;
}
FORCEINLINE	FString&	operator<<=(FString &Str, const float& Value )
{
	Str \= FString::SanitizeFloat(Value);
	return Str;
}

Overloading Comparison Operators
--------------------------------

Sometimes, you will want to overload a comparison operator for a special type of struct or class. Every comparison operator must return a boolean return value. Overloading comparison operators can be useful for determining if two objects are the same object based on a particular property rather than pointer reference. If you store a list of actors within a TArray, you may want those objects to be sorted by some particular property. If you overload the "<" operator, you can now call "sort()" on your TArray and the sort method will sort based off your "<" operator logic.

### C++ Example

Let's say you have a custom struct for storing a list of creatures and their associated 'aggro' values. Each creature has a TArray which contains a list of sensed creatures and their associated aggro values. Each tick, your creature will try to resense all nearby creatures and update this aggro value data. If the list already contains an aggro record, we want to update the existing record rather than adding a new one. Once all aggro records have been updated, we want to call "sort()" on the creatures list of aggro records.

USTRUCT(BlueprintType)
struct FAggroData
{
	GENERATED\_USTRUCT\_BODY()
public:
 
	/\*Sort Key: This is the aggro value for this enemy\*/
	UPROPERTY(BlueprintReadWrite, Category \= "Aggro")
	int32 Aggro;
 
	/\*This is the enemy we sensed\*/
	UPROPERTY(BlueprintReadWrite, Category \= "Aggro")
	ABaseCreature\* Enemy;
 
	/\*This is the last known position of the enemy\*/
	UPROPERTY(BlueprintReadWrite, Category \= "Aggro")
	FVector LastSensePosition;
 
	/\*This is the last known velocity of the enemy\*/
	UPROPERTY(BlueprintReadWrite, Category \= "Aggro")
	FVector LastSenseVelocity;
 
	/\*This is how old the last sense time was\*/
	UPROPERTY(BlueprintReadWrite, Category \= "Aggro")
	float LastSenseAge;
 
	//override the "<" operator so that this object can be sorted
	FORCEINLINE bool operator<(const FAggroData &Other) const
	{
		return Aggro < Other.Aggro;
	}
 
	//check to see if the aggro record matches another aggro record by overloading the "==" operator.
	FORCEINLINE bool operator\==(const FAggroData &Other) const
	{
		return Enemy \== Other.Enemy;
	}
};
 
//ABaseCreature Class header:
TArray<FAggroData\> SensedEnemies;
 
//ABaseCreature Tick:
//This will sort the list of sensed enemies based on the overloaded "<" operator. In this case, our sort
//scheme will put the creature with the highest aggro at the very front of the list. If we want to change the sort
//order, we can just swap the operands in the "<" operator overload
SensedEnemies.Sort();

Summary
-------

With these operators in your code, no more

Str \= FString::SanitizeFloat(TheFoat);

you can just do

Str <<= TheFloat;

  
Yay!

  
[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Operator\_Overloads&oldid=17324](https://wiki.unrealengine.com/index.php?title=Operator_Overloads&oldid=17324)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)