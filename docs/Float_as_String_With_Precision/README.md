 Float as String With Precision - Epic Wiki             

 

Float as String With Precision
==============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Thank You Epic](#Thank_You_Epic)
*   [3 Static](#Static)
*   [4 Code For You](#Code_For_You)
*   [5 Include Leading Zero](#Include_Leading_Zero)
*   [6 Example Usage](#Example_Usage)
*   [7 Output](#Output)
*   [8 More Info on C++ Static Function Libraries](#More_Info_on_C.2B.2B_Static_Function_Libraries)
*   [9 Summary](#Summary)

Overview
--------

_Author:_ [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Here is my function for obtaining a float as a string, but limiting the number of decimal places.

 And including appropriate rounding!

Thank You Epic
--------------

Please note I am leveraging all the hard work of Epic Engineers by using the conversion functions provided with the FText class.

Thank You Epic!

Static
------

I recommend making your own static library of functions to use anywhere in your code, if you are just wanting to test stuff just remove the word static and put this in any .h file of your choosing

Code For You
------------

<syntaxhighlight lang="cpp"> //In YourFunctionLibrary.h

//Float as String With Precision! static FORCEINLINE FString GetFloatAsStringWithPrecision(float TheFloat, int32 Precision, bool IncludeLeadingZero=true) {

       //Round to integral if have something like 1.9999 within precision

float Rounded = roundf(TheFloat); if(FMath::Abs(TheFloat - Rounded) < FMath::Pow(10,-1 \* Precision)) { TheFloat = Rounded; } FNumberFormattingOptions NumberFormat; //Text.h NumberFormat.MinimumIntegralDigits = (IncludeLeadingZero) ? 1 : 0; NumberFormat.MaximumIntegralDigits = 10000; NumberFormat.MinimumFractionalDigits = Precision; NumberFormat.MaximumFractionalDigits = Precision; return FText::AsNumber(TheFloat, &NumberFormat).ToString(); }

//Float as FText With Precision! static FORCEINLINE FText GetFloatAsTextWithPrecision(float TheFloat, int32 Precision, bool IncludeLeadingZero=true) {

       //Round to integral if have something like 1.9999 within precision

float Rounded = roundf(TheFloat); if(FMath::Abs(TheFloat - Rounded) < FMath::Pow(10,-1 \* Precision)) { TheFloat = Rounded; } FNumberFormattingOptions NumberFormat; //Text.h NumberFormat.MinimumIntegralDigits = (IncludeLeadingZero) ? 1 : 0; NumberFormat.MaximumIntegralDigits = 10000; NumberFormat.MinimumFractionalDigits = Precision; NumberFormat.MaximumFractionalDigits = Precision; return FText::AsNumber(TheFloat, &NumberFormat); } </syntaxhighlight>

Include Leading Zero
--------------------

Please note in my function you can opt to have a value of 0.5 display as

 .5

or

 0.5

Based on whether you want that leading zero or not!

Yay!

Example Usage
-------------

<syntaxhighlight lang="cpp"> const float MyFloat = 16.16621111111111111111;

FString Str = "My Float is "; Str += UYourFunctionLibrary::GetFloatAsStringWithPrecision(MyFloat,2); ClientMessage(Str); </syntaxhighlight>

Output
------

 My Float is 16.17

More Info on C++ Static Function Libraries
------------------------------------------

**My Wiki On Static Function Libraries** [https://wiki.unrealengine.com/Static\_Function\_Libraries,\_Your\_Own\_Version\_of\_UE4\_C%2B%2B,\_No\_Engine\_Compile\_Times](https://wiki.unrealengine.com/Static_Function_Libraries,_Your_Own_Version_of_UE4_C%2B%2B,_No_Engine_Compile_Times)

  

Summary
-------

I hope you enjoy this function!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Float\_as\_String\_With\_Precision&oldid=625](https://wiki.unrealengine.com/index.php?title=Float_as_String_With_Precision&oldid=625)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")