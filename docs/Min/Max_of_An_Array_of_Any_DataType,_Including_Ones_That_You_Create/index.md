Min/Max of An Array of Any DataType, Including Ones That You Create - Epic Wiki                    

Min/Max of An Array of Any DataType, Including Ones That You Create
===================================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 GenericPlatformMath.h](#GenericPlatformMath.h)
*   [3 Sample Usage](#Sample_Usage)
*   [4 Your Data Type Only Needs the < Operator](#Your_Data_Type_Only_Needs_the_.3C_Operator)

Overview
--------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

In 4.3 you now have available two C++ functions from me, which I gave to Epic!

These are template functions for the min and max of **an array** of any datatype for which the < operator is defined!

You can use my Min/Max of Array with literally any existing UE4 datatype or any datatype that you create, as long as you define **operator<** for your data type!

  
**Here is my wiki on custom operators / operator overloads in UE4 C++**

[Operator Overloads, Custom Operators](/Operator_Overloads "Operator Overloads")

  
My functions will **optionally** return the index of the min/max value if you supply a pointer!

This makes using my Min/Max of Array very flexible for you to use in code, because you dont have to supply the var by reference and so you dont have to supply it at all if you dont want to know the index of the min/max value!

Here's what Max looks like:

/\*\*
\* Max of Array
\* @param	Array of templated type
\* @param	Optional pointer for returning the index of the maximum element, if multiple maximum elements the first index is returned
\* @return	The max value found in the array or default value if the array was empty
\*/
template< class T \>
static FORCEINLINE T Max(const TArray<T\>& Values, int32\* MaxIndex \= NULL)
{
	if (Values.Num() \== 0)
	{
		if (MaxIndex)
		{
			\*MaxIndex \= INDEX\_NONE;
		}
		return T();
	}
 
	T CurMax \= Values\[0\];
	int32 CurMaxIndex \= 0;
	for (int32 v \= 1; v < Values.Num(); ++v)
	{
		const T Value \= Values\[v\];
		if (CurMax < Value)
		{
			CurMax \= Value;
			CurMaxIndex \= v;
		}
	}
 
	if (MaxIndex)
	{
		\*MaxIndex \= CurMaxIndex;
	}
	return CurMax;
}

GenericPlatformMath.h
---------------------

You can find my functions in:

 Public\\GenericPlatform\\GenericPlatformMath.h 

Sample Usage
------------

TArray<YourVarType\> MyVars;
TArraY<int32\> MyInts;
 
YourVarType MaxValue \= FMath::Max<YourVarType\>(MyVars); //dont need to know the index of the max value
 
int32 MaxIndex;
 
const int32 MaxValue \= FMath::Max<int32\>(MyInts,&MaxIndex);
 
UE\_LOG(YourLog,Log,TEXT("index of the max value is is %d), MaxIndex);\[/CODE\]

Your Data Type Only Needs the < Operator
----------------------------------------

Please note how I wrote the test for the Max of Array function!

 if (CurMax < Value)

I wrote it this way so you truly only need to define the **operator<** for your data type to use it with my template Min/Max array functions!

♥

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Min/Max\_of\_An\_Array\_of\_Any\_DataType,\_Including\_Ones\_That\_You\_Create&oldid=7013](https://wiki.unrealengine.com/index.php?title=Min/Max_of_An_Array_of_Any_DataType,_Including_Ones_That_You_Create&oldid=7013)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)