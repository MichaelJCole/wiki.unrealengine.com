Unions, Different Data Types, Same Memory - Epic Wiki                    

Unions, Different Data Types, Same Memory
=========================================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 My Example](#My_Example)
*   [2 Syntax](#Syntax)
*   [3 My Example: Converting to Float From Binary](#My_Example:_Converting_to_Float_From_Binary)
*   [4 Conclusion](#Conclusion)

Overview
--------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

Unions enable you to have a shape-shifting data type :)

The same memory space can be used to store different variable types, but only 1 of the data types is ever active at any one time.

The amount of memory set aside for the union is the amount needed for the largest data type.

Search the code base for example uses of unions!

For lots of info on unions, google **"unions c++"**, or check out [MSDN: Unions](http://msdn.microsoft.com/en-us/library/5dxy4b7b.aspx)

### My Example

In my example below, I am extracting binary data from a binary array, and storing it into the union space of a float/long union.

Then once the data is transferred to the union, as a long, then I am switching it to its float value to get the float data!

**The result:**

Converting binary data to a float variable type using a union :)

My example covers Platform Endian-ness

Syntax
------

typedef union floatdata {
  float AsFloat;
  unsigned long byteData;
} FloatUnionData;
 
UCLASS()
class AVictoryPC : public APlayerController
{
  GENERATED\_UCLASS\_BODY()
 
  float BinaryToFloat( const TArray<uint8\> BinaryData, const int64 BinaryStart) const
 
  //FloatUnionData FloatUnion; 
  //Could be declared Globally here
};

My Example: Converting to Float From Binary
-------------------------------------------

float AVictoryPC::BinaryToFloat( const TArray<uint8\> BinaryData, const int64 BinaryStart) const
{
 
	//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
	//Set end based on BinaryStart and fact that we're making a float
	const int64 BinaryEnd \= BinaryStart + sizeof(	float	);
	//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
 
 
	//check valid range for BinaryStart, BinaryEnd
	if (! BinaryData.IsValidIndex(BinaryStart) || ! BinaryData.IsValidIndex(BinaryEnd\-1))
        {
           return \-1;
        }
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
        //The float union! 
        FloatUnionData FloatUnion; 
        FloatUnion.AsFloat \= 0;
 
	if (PLATFORM\_LITTLE\_ENDIAN)
	{
		//the float union's long version
		FloatUnion.byteData \= (BinaryData\[ BinaryStart + 3 \] << 24) | (BinaryData\[ BinaryStart + 2 \] << 16) | (BinaryData\[ BinaryStart + 1 \]  << 8) | BinaryData\[ BinaryStart  \] ;
	}
	else
	{
		//the float union's long version
		FloatUnion.byteData \= (BinaryData\[ BinaryStart \] << 24) | (BinaryData\[ BinaryStart + 1 \] << 16) | (BinaryData\[ BinaryStart + 2 \]  << 8) | BinaryData\[ BinaryStart + 3 \] ;
	}
 
	//switch and get float value from union
	//	thus we return the float that was reconstructed from binary
	return FloatUnion.AsFloat;
}

Conclusion
----------

This is a fully functional example of where using a union comes in handy!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Unions,\_Different\_Data\_Types,\_Same\_Memory&oldid=4521](https://wiki.unrealengine.com/index.php?title=Unions,_Different_Data_Types,_Same_Memory&oldid=4521)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)