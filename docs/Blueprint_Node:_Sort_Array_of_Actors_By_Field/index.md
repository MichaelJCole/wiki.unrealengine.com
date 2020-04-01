Blueprint Node: Sort Array of Actors By Field - Epic Wiki                    

Blueprint Node: Sort Array of Actors By Field
=============================================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

Contents
--------

*   [1 Overview](#Overview)
*   [2 The Setup](#The_Setup)
*   [3 The Header File (.h)](#The_Header_File_.28.h.29)
    *   [3.1 Ordering](#Ordering)
    *   [3.2 The Method Declaration](#The_Method_Declaration)
    *   [3.3 The Intercept](#The_Intercept)
    *   [3.4 Custom Thunk](#Custom_Thunk)
    *   [3.5 Source](#Source)
*   [4 The Sorting Predicate](#The_Sorting_Predicate)
*   [5 The Source File (.cpp)](#The_Source_File_.28.cpp.29)
*   [6 Notes/Concerns/TODO/Pitfalls](#Notes.2FConcerns.2FTODO.2FPitfalls)

Overview
--------

_Author_ [Nimgoble](/index.php?title=User:Nimgoble&action=edit&redlink=1 "User:Nimgoble (page does not exist)") ([talk](/index.php?title=User_talk:Nimgoble&action=edit&redlink=1 "User talk:Nimgoble (page does not exist)"))

Dear Community,

This snippet is to show you how to make a utility function for blueprint arrays that allows you to sort the array by a given field, in ascending or descending order.

The Setup
---------

Make yourselves a new Blueprint Function Library in C++.

The Header File (.h)
--------------------

### Ordering

We'll need to know in which order to sort the array: Ascending or Descending. I made an enumeration for this purpose and stuck it in the header file, before the "UXXXBlueprintFunctionLibrary" declaration:

UENUM(BlueprintType)
enum class ESortDirection: uint8
{
    ASCENDING UMETA(DisplayName \= "Ascending"),
    DESCENDING UMETA(DisplayName \= "Descending")
};

### The Method Declaration

Let's go ahead and declare our method(s) in the header. We're going to follow the naming conventions of the other TArray utilities and name our methods: "Array\_Sort" and "GenericArray\_Sort".

We'll need four arguments:  
\-A pointer to the array that we'll be sorting  
\-A pointer to the array property (I'm not sure why, I was just following convention here).  
\-A string that will represent the field that we'll be sorting the array by.  
\-The sort direction.  

So, here's what that looks like in code:

UFUNCTION(BlueprintCallable, CustomThunk, meta \= (DisplayName \= "Sort Array", CompactNodeTitle \= "SORTARRAY", ArrayParm \= "TargetArray|ArrayProperty"), Category \= "Utilities|Array")
static void Array\_Sort(const TArray<int32\>& TargetArray, const UArrayProperty\* ArrayProperty, const FString &FieldName, ESortDirection SortDirection);
static void GenericArray\_Sort(void\* TargetArray, const UArrayProperty\* ArrayProp, const FString &FieldName, ESortDirection SortDirection);

The first method, "Array\_Sort", is a dummy method. It should never be called. It's there solely to prevent compilation errors. "GenericArray\_Sort" is where our sorting will actually be happening. The reason for this is that Unreal Engine 4's templated function support is limited (at the moment). More info [here](https://forums.unrealengine.com/showthread.php?5324-Templated-Blueprint-functions).

### The Intercept

This next snippet is a bit of call stack magic. I believe this intercepts any call to our dummy method, "Array\_Sort", and redirects it to "GenericArray\_Sort".

DECLARE\_FUNCTION(execArray\_Sort)
{
    Stack.StepCompiledIn<UArrayProperty\>(NULL);
    void\* ArrayAddr \= Stack.MostRecentPropertyAddress;
 
    P\_GET\_OBJECT(UArrayProperty, ArrayProperty);
    PARAM\_PASSED\_BY\_REF(FieldName, UStrProperty, FString);
    PARAM\_PASSED\_BY\_VAL(SortDirection, UByteProperty, ESortDirection);
    P\_FINISH;
 
    GenericArray\_Sort(ArrayAddr, ArrayProperty, FieldName, SortDirection);
}

### Custom Thunk

Next up is our Custom Thunk, which is also part of the pseudo-templating stuff. To be honest, I'm not 100% sure what it does/is used for, EXACTLY. Again, just following convention.

struct FXXXCustomThunkTemplates
{
    template<typename T\>
    static void Array\_Sort(TArray<T\>& TargetArray, const UArrayProperty\* ArrayProperty, const FString &FieldName, ESortDirection SortDirection)
    {
        UXXXBlueprintFunctionLibrary::GenericArray\_Sort(&TargetArray, ArrayProperty, FieldName, SortDirection);
    }
};

### Source

#pragma once
 
#include "Kismet/BlueprintFunctionLibrary.h"
#include "XXXBlueprintFunctionLibrary.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class XXX\_API UXXXBlueprintFunctionLibrary : public UBlueprintFunctionLibrary
{
    GENERATED\_BODY()
public:
    UFUNCTION(BlueprintCallable, CustomThunk, meta \= (DisplayName \= "Sort Array", CompactNodeTitle \= "SORTARRAY", ArrayParm      \= "TargetArray|ArrayProperty"), Category \= "Utilities|Array")
    static void Array\_Sort(const TArray<int32\>& TargetArray, const UArrayProperty\* ArrayProperty, const FString &FieldName, ESortDirection SortDirection);
    static void GenericArray\_Sort(void\* TargetArray, const UArrayProperty\* ArrayProp, const FString &FieldName, ESortDirection SortDirection);
 
    DECLARE\_FUNCTION(execArray\_Sort)
    {
        Stack.StepCompiledIn<UArrayProperty\>(NULL);
        void\* ArrayAddr \= Stack.MostRecentPropertyAddress;
 
        P\_GET\_OBJECT(UArrayProperty, ArrayProperty);
        PARAM\_PASSED\_BY\_REF(FieldName, UStrProperty, FString);
        PARAM\_PASSED\_BY\_VAL(SortDirection, UByteProperty, ESortDirection);
        P\_FINISH;
 
        GenericArray\_Sort(ArrayAddr, ArrayProperty, FieldName, SortDirection);
    }
};
 
struct FXXXCustomThunkTemplates
{
    template<typename T\>
    static void Array\_Sort(TArray<T\>& TargetArray, const UArrayProperty\* ArrayProperty, const FString &FieldName, ESortDirection SortDirection)
    {
        UXXXBlueprintFunctionLibrary::GenericArray\_Sort(&TargetArray, ArrayProperty, FieldName, SortDirection);
    }
};

The Sorting Predicate
---------------------

Next up is our sorting predicate. This will be passed to the "Sort" method of our array of Actors. I put this in the header with all of the other stuff; You can put it wherever you want.

This does some UProperty type checking, casting, and comparisons.

struct FArraySortByFieldPredicate
{
    FArraySortByFieldPredicate(const FString &InFieldName, ESortDirection InSortDirection) 
		: FieldName(InFieldName), SortDirection(InSortDirection)
    {
    }
 
    bool operator ()(const AActor& A, const AActor& B) const
    {
	UClass \*ourClass \= A.GetClass();
	if (ourClass !\= B.GetClass())
	    return false;
 
	UProperty \*targetProperty \= FindField<UProperty\>(ourClass, \*FieldName);
	if (targetProperty \== nullptr)
	    return false;
 
	const void \*Aa \= (SortDirection \== ESortDirection::ASCENDING) ? &A : &B;
	const void \*Bb \= (SortDirection \== ESortDirection::ASCENDING) ? &B : &A;
 
	if (targetProperty\-\>IsA<UByteProperty\>())
	{
	    return Cast<UByteProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Aa) <
		   Cast<UByteProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Bb);
	}
	else if (targetProperty\-\>IsA<UIntProperty\>())
	{
	    return
	        Cast<UIntProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Aa) <
		Cast<UIntProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Bb);
	}
	else if (targetProperty\-\>IsA<UUInt32Property\>())
	{
	    return
		Cast<UUInt32Property\>(targetProperty)\-\>GetPropertyValue\_InContainer(Aa) <
		Cast<UUInt32Property\>(targetProperty)\-\>GetPropertyValue\_InContainer(Bb);
	}
	else if (targetProperty\-\>IsA<UFloatProperty\>())
	{
	    return
		Cast<UFloatProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Aa) <
		Cast<UFloatProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Bb);
	}
	else if (targetProperty\-\>IsA<UDoubleProperty\>())
	{
	    return
		Cast<UDoubleProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Aa) <
		Cast<UDoubleProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Bb);
	}
	else if (targetProperty\-\>IsA<UStrProperty\>())
	{
	    return
		Cast<UStrProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Aa) <
		Cast<UStrProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Bb);
	}
	else if (targetProperty\-\>IsA<UNameProperty\>())
	{
	    return
		Cast<UNameProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Aa) <
		Cast<UNameProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Bb);
	}
	else if (targetProperty\-\>IsA<UTextProperty\>())
	{
	    return
		Cast<UTextProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Aa).ToString() <
		Cast<UTextProperty\>(targetProperty)\-\>GetPropertyValue\_InContainer(Bb).ToString();
	}
	// fall back, just let diff type win:
	else
	    return false;
    }
 
    FString FieldName;
    ESortDirection SortDirection;
};

The Source File (.cpp)
----------------------

The Source File is fairly straightforward. It contains the body of our dummy method, "Array\_Sort" and the body of "GenericArray\_Sort".

#include "YourGame.h"
#include "XXXBlueprintFunctionLibrary.h"
 
void UXXXBlueprintFunctionLibrary::Array\_Sort(const TArray<int32\>& TargetArray, const UArrayProperty\* ArrayProp, const FString &FieldName, ESortDirection SortDirection)
{
    // We should never hit these!  They're stubs to avoid NoExport on the class.  Call the Generic\* equivalent instead
    check(0);
}
 
void UXXXBlueprintFunctionLibrary::GenericArray\_Sort(void\* TargetArray, const UArrayProperty\* ArrayProp, const FString &FieldName, ESortDirection SortDirection)
{
    if (TargetArray)
    {
        TArray<AActor \*\> \*actorArray \= (TArray<AActor \*\> \*)TargetArray;
	if (actorArray !\= nullptr)
	{
	    actorArray\-\>Sort(FArraySortByFieldPredicate(FieldName, SortDirection));
	}
    }
}

Notes/Concerns/TODO/Pitfalls
----------------------------

\-This is not a truly templated sort method. I believe that you can send an array of objects that do not derive from AActor. In this case, the sort method will fail silently. With that being said:

\-This could probably use better logging. Or any, really.

\-If the class of the objects that you pass in does NOT contain the field in question, you may get weird results.

\-The blueprint node does NOT contain field names. You'll have to infer which field is which (it isn't hard, considering that there are two of them, and one is an enumeration).

\-The FArraySortByFieldPredicate structure is limited to basic types.

\-I don't think sorting strings actually works right now. Perhaps calling "Compare()" would be better than the "<" operator.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Node:\_Sort\_Array\_of\_Actors\_By\_Field&oldid=14806](https://wiki.unrealengine.com/index.php?title=Blueprint_Node:_Sort_Array_of_Actors_By_Field&oldid=14806)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)