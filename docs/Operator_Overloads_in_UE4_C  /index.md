Operator Overloads - Epic Wiki               

Operator Overloads
==================

From Epic Wiki

(Redirected from [Operator Overloads in UE4 C++](/index.php?title=Operator_Overloads_in_UE4_C%2B%2B&redirect=no "Operator Overloads in UE4 C++"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Code Simplification](#Code_Simplification)
*   [2 UE4 String Stream](#UE4_String_Stream)
    *   [2.1 Without Custom C++ Operators](#Without_Custom_C.2B.2B_Operators)
*   [3 Global Scope](#Global_Scope)
*   [4 FORCEINLINE](#FORCEINLINE)
*   [5 The C++](#The_C.2B.2B)
*   [6 Summary](#Summary)

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

I only got the global scope operators to compile using FORCEINLINE, plus it is a good (amazing) thing to do :)

Look up "Inline C++ " for more info

  

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

  

Summary
-------

With these operators in your code, no more

Str \= FString::SanitizeFloat(TheFoat);

you can just do

Str <<= TheFloat;

  
Yay!

  
[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Operator\_Overloads&oldid=2331](https://wiki.unrealengine.com/index.php?title=Operator_Overloads&oldid=2331)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")