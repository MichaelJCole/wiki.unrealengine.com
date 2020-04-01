Entry Level Guide to UE4 C++ - Epic Wiki                    

Entry Level Guide to UE4 C++
============================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (21 votes)

Approved for Versions:(please verify)

Contents
--------

*   [1 Overview](#Overview)
*   [2 What is a good starting point for learning UE4 C++?](#What_is_a_good_starting_point_for_learning_UE4_C.2B.2B.3F)
    *   [2.1 ClientMessage](#ClientMessage)
    *   [2.2 There will always be a PC](#There_will_always_be_a_PC)
*   [3 What are ->, ., ::](#What_are_-.3E.2C_..2C_::)
    *   [3.1 \-> and .](#-.3E_and_.)
        *   [3.1.1 Example](#Example)
        *   [3.1.2 Summary](#Summary)
    *   [3.2 The Use of ::](#The_Use_of_::)
        *   [3.2.1 What is it for?](#What_is_it_for.3F)
        *   [3.2.2 Example](#Example_2)
        *   [3.2.3 If Not for ::](#If_Not_for_::)
        *   [3.2.4 Summary](#Summary_2)
*   [4 Those T things](#Those_T_things)
    *   [4.1 Shared Reference](#Shared_Reference)
*   [5 Those Prefixes](#Those_Prefixes)
    *   [5.1 Epic's Official Class Documentation](#Epic.27s_Official_Class_Documentation)
    *   [5.2 G](#G)
*   [6 Ok, Really, What Are Those T Things???](#Ok.2C_Really.2C_What_Are_Those_T_Things.3F.3F.3F)
*   [7 Pointers](#Pointers)
    *   [7.1 Always Check Your Pointers](#Always_Check_Your_Pointers)
    *   [7.2 De-Referencing Pointers](#De-Referencing_Pointers)
        *   [7.2.1 De-Reference with \*](#De-Reference_with_.2A)
        *   [7.2.2 De-Reference with ->](#De-Reference_with_-.3E)
    *   [7.3 Why Use a Pointer?](#Why_Use_a_Pointer.3F)
        *   [7.3.1 Access Data That is Far Far Away](#Access_Data_That_is_Far_Far_Away)
        *   [7.3.2 Access Huge Quantities of Data Any Time](#Access_Huge_Quantities_of_Data_Any_Time)
        *   [7.3.3 Stay Current With Runtime Changes](#Stay_Current_With_Runtime_Changes)
    *   [7.4 Passing Data by Reference](#Passing_Data_by_Reference)
*   [8 Related Epic Tutorial](#Related_Epic_Tutorial)
*   [9 Summary](#Summary_3)

Overview
--------

_Author_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

This wiki page is devoted to reducing the intensity of the C++ entry point for new coders.

If you have general questions as you are trying to get comfortable with C++, please ask them in the Discussion Tab.

I and hopefully others can then answer those questions in this main page.

What is a good starting point for learning UE4 C++?
---------------------------------------------------

I personally can recommend starting with extending the PlayerController class, and then making a blueprint of that.

Then you reference your custom player controller in your Game Mode Class.

I have a tutorial on this here:

**[Game Mode, Linking to Player Controller Blueprint](/Game_Mode,_Linking_to_Player_Controller_Blueprint_in_C%2B%2B "Game Mode, Linking to Player Controller Blueprint in C++")**

### ClientMessage

When you are learning C++ you need to be able to give yourself feedback on what functions are running, what info your algorithms are getting, and what different parts of the code are actually computing.

You can use logs for this, but you can also use ClientMessage!

  
I enjoy ClientMessage because **all you have to do is press the ~ or other key to open the player console** and your feedback is right there.

  
When you are just starting out, having this instant feedback is really important so you know what you did right and where parts of your code are not working correctly, or simply not running at all!

ClientMessage("Yes this function did run!");

ClientMessage("Current value of the float is ");
ClientMessage(FString::SanitizeFloat(TheFloat));

### There will always be a PC

In any actual game circumstance you will always have a PlayerController, so it is a great entry point into the world of UE4 C++ :)

What are ->, ., ::
------------------

_I've seen that in C++ we use hyphen arrow symbol (->) instead of dot (.) as in other languages. But i've also saw using double colons (::) which i dont understand. So can you please explain why is C++ using these symbols? Whats the difference between -> and ::?_

_For example, open UnrealEdEngine.cpp (\\UnrealEngine\\Engine\\Source\\Editor\\UnrealEd\\Private) and you can see the UUnrealEdEngine::Init function at line 26. Why is this function having double colons? Inside the function block i see Super::Init(InEngineLoop)._

_I was expecting to see Super->Init(InEngineLoop) but instead its using double colons. Inside that function most of them are using double colons. So please explain the difference of :: and -> and dot (.)._

### \-> and .

In very non-programmatic terms: The -> means that the variable is a pointer to where the data is actually stored, whereas the . means that the variable is the actual container of the data.

This means that the . is a direct access to real hard data, whereas the -> is an indirect reference to data that may or may not actually exist.

 The -> is like a sign that can point to a tree that is not actually there.
 So you must always check whether the sign is accurate!

#### Example

FVector\* LocationPtr \= nullptr;
FVector Location;
 
Location.X \= 5;
LocationPtr \= &Location;
ClientMessage(FString::SanitizeFloat(LocationPtr\-\>X));

LocationPtr does not inherently point to anything upon being created, it must be pointed to the actual data

LocationPtr \= &Location;

Location however IS the data itself, and can be accessed immediately using "."

Location.X \= 5;

Now that we have assigned LocationPtr, we can access the X variable via indirect reference "->"

if(!LocationPtr) return;
ClientMessage(FString::SanitizeFloat(LocationPtr\-\>X));

 Value will print out as "5"

#### Summary

When you have a normal variable you use ".", because the variable itself is the container of the data so you can access it any time.

When you are using a pointer, which is an indirect reference, you dont actually know at any time if it is pointing to something, so you must check:

if(!LocationPtr) return; //the pointer wasnt pointing to anything.

If the pointer is pointing to actual variable data, you can then access that data using ->

LocationPtr\-\>X;

### The Use of ::

This tells you the namespace / scope of the function or variable.

UUnrealEdEngine::Init

The above means that the Init function is found in the class UUnrealEdEngine.

Super::Init(InEngineLoop).

Because the Init function is virtual, you can call the Super class version of the function (and you should!)

Super itself means the super class of UUnrealEdEngine.

#### What is it for?

 You have enormous power and freedom in C++!

This perhaps is what makes it a little more complex to learn :)

You can put functions and declare variables pretty much anywhere you want in C++, so you use the :: to limit the scope so that different classes can have variables and functions with the same name, but still be recognized as distinct by the compiler.

#### Example

For example, let's say you have class AMyTree, and AMyFlower.

AMyTree wants to have a GetLocation() function, and so does AMyFlower.

FVector GetLocation() const;

But in C++, you are working at a very low level, which means you have the power to put functions and variables in the global name space.

If you simply declare a variable or a function outside of a class or ustruct or other namespace

static const FVector MyGlobalVector \= FVector(2,4,16);
FORCEINLINE void MyVeryGlobalFunction()
{
  //Does something
}

Then those symbols have entered the global namespace and will be recognized anywhere they are used.

This is actually very useful for **[C++ Operators](/Operator_Overloads_in_UE4_C%2B%2B "Operator Overloads in UE4 C++")**!

  
However this causes a problem for AMyTree and AMyFlower, who both want a GetLocation() function!

  
If you don't use the ::, you cannot distinguish for the compiler at compile time whether GetLocation() is for the Flower or for the Tree !

You use the :: to tell the compiler which version of the function is for which class

FVector AMyFlower::GetLocation() const
{
	//one set of code
}
FVector AMyTree::GetLocation() const
{
	//another set of code
}

#### If Not for ::

If we did not have :: to declare the scope of a variable or function, then every single symbol in your entire game code would have to be unique.

You could not ever have functions with the same name!

#### Summary

 Think of :: as simply a label, telling you which class the function or variable belongs to.

Those T things
--------------

_What are these T things? Like TSharedRef, TWeakPtr, TArray and so on?_

Do not let those T things confuse you!

It does make symbols looke a little more confusing, so try to block it out of your mind when first reading a existing UE4 symbol, like

TArray

pretend this reads as

Array

The letter T is required, but it is more of a declaration of the type of class that Array is.

 Imagine that class names could be different colors, T is just one color, or flavor of classes in UE4.

But when you are trying to read the code, the letter T can make you not understand what the class itself is about, if you do not ignore it.

### Shared Reference

Another example,

TSharedRef

Read this without the T and it reads as "Shared Reference".

See?

Ignore the T and you will be able to read the code base much more easily to get a clear sense of the intent of each class.

Just make sure to use the T when you are trying to use the class :)

Those Prefixes
--------------

_Those extra capital prefixes. For example_

*   what is the F in FVector and FSourceControlStatePtr
*   what is the T in TSharedRef, TWeakPtr, TArray
*   what is the U (i guess its for Unreal) UObject, UUnrealEdEngine
*   what is the G in GIsEditor, GSlowTaskOccurred
*   and so on...

With the exception of G, think of all the others as colors, or flavors of classes in UE4.

Each letter indicates that this particular class is of a certain nature.

### Epic's Official Class Documentation

Epic expands on what the prefixes mean here:

[Epic's Class Documentation](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Classes/index.html)

### G

G means "Global", and it is a label to tell you that you can access these variables anywhere.

Ok, Really, What Are Those T Things???
--------------------------------------

In the UE4 source, types are always prefixed with a character specifying the type's category. In this example, T is used to let you know that the type is a template class. So TSharedRef, TWeakPtr, TArray, etc. are all template classes. Having a prefix allows you to easily differentiate type names from variable names, as variable names are not typically declared with a prefix in UE4 source (one notable exception to this is that boolean variable names are prefixed with a 'b').

So, in short, those "T things" should make you think two things:

1.  You're looking at a type name (and not a variable name).
2.  The type name is specifying a template class.

  

There are other prefixes that will appear in the source, such as U, A, S, I, and F. You can read about their meanings here:

[Epic's Naming Conventions](https://docs.unrealengine.com/latest/INT/Programming/Development/CodingStandard/index.html#namingconventions)

As a side note, I like to think of template classes as a way to give a "sub type" to a "main type". For TArray, the subtype could be the type that TArray is supposed to contain, for example:

TArray<FString\> MyVariableName;

That would be a container for a series of FString values. Without template classes, it would be up to you to "just know" that MyVariableName actually contained FStrings, but thanks to template classes the compiler can know that as well, so you don't have to keep as much stuff in your head while reading your friend's magic alien voodoo spaghetti code.

You can read more about template classes here:

[Template (Wikipedia Article)](https://en.wikipedia.org/wiki/Template_(C%2B%2B))

Pointers
--------

_Pointers (\*) and References (&). Man i find it hard to use these. What exactly are they? Can you include some examples on how to use and where to use and whats the advantage of using it?_

This is perhaps the most important thing for newcomers to understand to really get rolling with C++.

Once you have a firm grasp on Pointers you should be coding happily in UE4 C++ !

Pointers are extremely powerful and also a bit dangerous in order to give you the power that they have.

 Pointers require you to be a diligent coder. In return they give you speed and power.

A pointer must point to a memory address where the actual data is stored.

To get the memory address for the pointer to point to, you use &

FVector Location \= FVector(1, 2, 9000);
FVector\* LocationPtr \= nullptr; //LocationPtr currently points to NOTHING
 
LocationPtr \= &Location; //LocationPtr now points to the memory address of Location

  

### Always Check Your Pointers

Before trying to access the data that pointers are supposed to be pointing to, you must always check if they actually are!

check(LocationPtr);

or

if(!LocationPtr) return;

You have to do this because at any time you do not know if the pointer still points to valid data.

Using check will crash the game deliberately if the pointer is not valid, you would do this if you consider it absolutely critical that a pointer never be invalid at a particular point in your code.

In the case of returning out of the function, this could be a "silent" fail case that you would not detect unless you print out a screen or log message as you exit.

The check method guarantees you will know what happened, which is that a pointer that absolutely must be valid wasnt.

### De-Referencing Pointers

After you've verified the pointer does point to valid data, you can dereference it to access the data

#### De-Reference with \*

FVector NewVector \= FVector::ZeroVector;
if(LocationPtr)
{
  NewVector \= \*LocationPtr; //De-Referencing pointer
}

#### De-Reference with ->

if(!LocationPtr) return;
const float XValue \= LocationPtr\-\>X;

### Why Use a Pointer?

*   Pointers give you direct access to memory locations that might be far far away from your local context in wich you are running code.

*   Pointers also give you a way to access huge amounts of data without creating a copy of that data

*   Pointers give you a living connection, a dynamically updated link to data that will always be current because the pointer is an indirect reference that does not have to change itself to update along with the data it is pointing to.

#### Access Data That is Far Far Away

Let's say you have a Character, that is part of a sublevel, that is part of a sub world, that is part of a far away Galaxy,

and to actually finally reach this Character's current Armor variable, you have to travel through a whole series of Gets, like this:

GetGalaxy()\-\>GetSolarSystem()\-\>GetPlanet()\-\>GetMainCharacter()\-\>Armor;

The above operation is costly and takes time to execute, it is also complicated to read in code.

The above code is however, a way to access the current armor of a Character in a Galaxy far far away.

  
But wouldn't it be nice to be able to do this complicated retrieval operation only once, and obtain a sort of link, some kind of a _pointer_ to the actual data, for quick access?

FArmorStruct\* TheArmor \= & GetGalaxy()\-\>GetSolarSystem()\-\>GetPlanet()\-\>GetMainCharacter()\-\>Armor;

Now, to obtain data about the armor, you dont have to write

GetGalaxy()\-\>GetSolarSystem()\-\>GetPlanet()\-\>GetMainCharacter()\-\>GetCurrentArmor().Durability;
GetGalaxy()\-\>GetSolarSystem()\-\>GetPlanet()\-\>GetMainCharacter()\-\>GetCurrentArmor().Color;
GetGalaxy()\-\>GetSolarSystem()\-\>GetPlanet()\-\>GetMainCharacter()\-\>GetCurrentArmor().Size;

which is both confusing to read, and does actually incur a runtime cost on the CPU to do all those get operations to get across the Galaxy to the Character's armor.

Instead you can write:

//Always Check Your Pointers
if(!TheArmor) return;
 
TheArmor\-\>Durability;
TheArmor\-\>Color;
TheArmor\-\>Size;

See? Isn't that easier to read?

But wait there's more!

#### Access Huge Quantities of Data Any Time

Pointers can point to relatively small amounts of data, or vast and huge quantities of data!

 The pointer is pointing to a location in memory,
 the actual amount of memory involved could be enormous!

So continuing the above example, you might say, "Why don't I just create a copy of the Character's Armor?"

FArmorStruct ArmorVar \= GetGalaxy()\-\>GetSolarSystem()\-\>GetPlanet()\-\>GetMainCharacter()\-\>Armor;

But what if the FArmorStruct contains a huuuuge amount of data, and you want to do this for 300 Characters across the Galaxy?

 You would be copying this data many times over!

 But the data already exists in one memory location.
 Why would you copy it over just to access it, thereby duplicating the data?

Pointers enable you to avoid this entirely!

 You can simply point to the one memory location and access it any time.

#### Stay Current With Runtime Changes

Also, in the above case, once you copy the armor data, it is no longer the actual armor of the Character on the other world.

 You have lost the living connection to the Armor.

So if the Character on the other world chooses to change their armor color, you won't know!

 Pointers give you an actual living, dynamically updated link
 to potentially large quantities of data,
 that you only want to have to obtain access to once.

So again, the correct way:

FArmorStruct\* TheArmor \= & GetGalaxy()\-\>GetSolarSystem()\-\>GetPlanet()\-\>GetMainCharacter()\-\>Armor;

 Now you have easy access and a living connection to data that is in a Galaxy far far away,
 without ever having to duplicate any data.

### Passing Data by Reference

Another use of & is to pass data by reference into functions.

This is especially important for very large quantities of data that you would not want to copy into the function context!

int32 AMyClass::GetArraySize(TArray<uint8\>& MyHugeBinaryArray) const
{
	return MyHugeBinaryArray.Num(); //you use . instead of-> because passing by Reference
}

If you dont use the &, then you will be copying the entire huge array, just to find out how big it is!

 Try to pass by reference wherever you can, instead of passing in pointers. It is much safer :)

Related Epic Tutorial
---------------------

[Programming Guide](https://docs.unrealengine.com/latest/INT/Programming/index.html) :

*   **[Programming Quick Start](https://docs.unrealengine.com/latest/INT/Programming/QuickStart/index.html)**
*   **[Introduction to C++ Programming in UE4](https://docs.unrealengine.com/latest/INT/Programming/Introduction/index.html)**
*   **[C++ Programming Tutorials](https://docs.unrealengine.com/latest/INT/Programming/Tutorials/index.html)**

[Coding Standard](https://docs.unrealengine.com/latest/INT/Programming/Development/CodingStandard/index.html)

Summary
-------

Feel free to post new questions in the Discussion tab!

I hope this helps you to cross the C++ entry barrier and enjoy the power and Beauty of UE4 C++ !

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Entry\_Level\_Guide\_to\_UE4\_C%2B%2B&oldid=23745](https://wiki.unrealengine.com/index.php?title=Entry_Level_Guide_to_UE4_C%2B%2B&oldid=23745)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)