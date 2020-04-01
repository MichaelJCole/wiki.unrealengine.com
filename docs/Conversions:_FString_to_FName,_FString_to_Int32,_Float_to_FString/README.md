String Conversions: FString to FName, FString to Int32, Float to FString - Epic Wiki               

String Conversions: FString to FName, FString to Int32, Float to FString
========================================================================

From Epic Wiki

(Redirected from [Conversions: FString to FName, FString to Int32, Float to FString](/index.php?title=Conversions:_FString_to_FName,_FString_to_Int32,_Float_to_FString&redirect=no "Conversions: FString to FName, FString to Int32, Float to FString"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Converting FString to FNames](#Converting_FString_to_FNames)
*   [3 std::string to FString](#std::string_to_FString)
*   [4 FCString Overview](#FCString_Overview)
    *   [4.1 Converting FString to Numbers](#Converting_FString_to_Numbers)
    *   [4.2 FString to Integer](#FString_to_Integer)
    *   [4.3 FString to Float](#FString_to_Float)
*   [5 Float/Integer to FString](#Float.2FInteger_to_FString)
*   [6 UE4 Source Header References](#UE4_Source_Header_References)

Overview
--------

1.  FString to FName
2.  std::string to FString
3.  FString and FCString Overview
4.  FString to Integer
5.  FString to Float
6.  Float/Integer to FString
7.  UE4 C++ Source Header References

All the header files I refer to in this tutorial are found in

your UE4 install directory  / Engine / Source

you will probably want to do a search for them from this point :)

Converting FString to FNames
----------------------------

Say we have

FString TheString \= "UE4\_C++\_IS\_Awesome";

To convert this to an FName you do:

FName ConvertedFString \= FName(\*TheString);

std::string to FString
----------------------

#include <string>
 
//....
 
some function
{
  std::string TestString \= "Happy"; 
  FString HappyString(TestString.c\_str());
}

FCString Overview
-----------------

### Converting FString to Numbers

The \* operator on FStrings returns their TCHAR\* data which is what FCString functions use.

If you cant find the function you want in FStrings (UnrealString.h) then you should check out the FCString functions (CString.h)

I show how to convert from FString to FCString below:

Say we have

FString TheString \= "123.021";

### FString to Integer

int32 MyShinyNewInt \= FCString::Atoi(\*TheString);

### FString to Float

float MyShinyNewFloat \= FCString::Atof(\*TheString);

  
Note that Atoi and Atof are static functions, so you use the syntax FCString::TheFunction to call it :)

  

Float/Integer to FString
------------------------

FString NewString \= FString::FromInt(YourInt);
 
FString VeryCleanString \= FString::SanitizeFloat(YourFloat);

Static functions in the UnrealString.h :)

UE4 Source Header References
----------------------------

CString.h
UnrealString.h
NameTypes.h

See CString.h for more details and other functions like

atoi64 (string to int64)
Atod	(string to double precision float)

  
For a great deal of helpful functions you will also want to look at

UnrealString.h for direct manipulation of FStrings!

  

For more info on FNames check out

 NameTypes.h

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=String\_Conversions:\_FString\_to\_FName,\_FString\_to\_Int32,\_Float\_to\_FString&oldid=4464](https://wiki.unrealengine.com/index.php?title=String_Conversions:_FString_to_FName,_FString_to_Int32,_Float_to_FString&oldid=4464)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")