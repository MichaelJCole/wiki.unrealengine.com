How To Modify Blueprint Variable References In C++ Without Copying - Epic Wiki                    

How To Modify Blueprint Variable References In C++ Without Copying
==================================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 Non-Const Input Variable by Reference?](#Non-Const_Input_Variable_by_Reference.3F)
*   [3 Example 1: Increment Integer by Reference](#Example_1:_Increment_Integer_by_Reference)
*   [4 Example 2: Sort Integer Array by Reference](#Example_2:_Sort_Integer_Array_by_Reference)
*   [5 Example 3: Sort Float Array by Reference](#Example_3:_Sort_Float_Array_by_Reference)
*   [6 Efficiency And Stability](#Efficiency_And_Stability)
*   [7 Conclusion](#Conclusion)

Overview
--------

**Author** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Dear Community,

As you know, if you pass an BP array or other variable reference to C++ by reference, you have to make it const or the variable will appear as an output, not an input!

ex:

//This parameter will show as an out parameter because it is a non-const reference
UFUNCTION(BlueprintPure, Category \= "VictoryBPLibrary|Transform")
FRotator TransformVectorToActorSpaceAngle(AActor\* Actor, FVector& ShouldBeInVector);

//In this case InVector will indeed show up as an input parameter because it is const
UFUNCTION(BlueprintPure, Category \= "VictoryBPLibrary|Transform")
FRotator TransformVectorToActorSpaceAngle(AActor\* Actor, const FVector& InVector);

Non-Const Input Variable by Reference?
--------------------------------------

Well what if you want to modify the BP array in C++ and send it back to Blueprints, as is ideal since C++ can do calculations faster than BP?

Your team gives you a BP array and wants you to sort it, or modify it, and you should be able to do so without creating a copy of the data just to send it back to blueprints!

Well UPARAM(ref) is the solution!

I have 3 real-life examples for you!

Example 1: Increment Integer by Reference
-----------------------------------------

/\*\* Easily increment an integer! \*/
UFUNCTION(BlueprintCallable, meta \= (CompactNodeTitle \= "++",Keywords \= "increment integer"), Category \= "VictoryBPLibrary|Math|Integer")
static void VictoryIntIncrement(UPARAM(ref) int32& Int, int32& IntOut);
 
//~~~
 
void UVictoryBPFunctionLibrary::VictoryIntIncrement(UPARAM(ref) int32& Int, int32& IntOut)
{  
	Int++;
	IntOut \= Int; 
}

Example 2: Sort Integer Array by Reference
------------------------------------------

/\*\* Sort an integer array, smallest value will be at index 0 after sorting. Modifies the input array, no new data created. <3 Rama \*/
UFUNCTION(BlueprintCallable, meta \= (Keywords \= "sort integer array"), Category \= "VictoryBPLibrary|Array")
static void VictorySortIntArray(UPARAM(ref) TArray<int32\>& IntArray, TArray<int32\>& IntArrayRef);
 
//~~~
 
void UVictoryBPFunctionLibrary::VictorySortIntArray(UPARAM(ref) TArray<int32\>& IntArray, TArray<int32\>& IntArrayRef)
{
	IntArray.Sort();
	IntArrayRef \= IntArray;
}

Example 3: Sort Float Array by Reference
----------------------------------------

/\*\* Sort a float array, smallest value will be at index 0 after sorting. Modifies the input array, no new data created. \*/
UFUNCTION(BlueprintCallable, meta \= (Keywords \= "sort float array"), Category \= "VictoryBPLibrary|Array")
static void VictorySortFloatArray(UPARAM(ref) TArray<float\>& FloatArray, TArray<float\>& FloatArrayRef);
 
//~~~
 
void UVictoryBPFunctionLibrary::VictorySortFloatArray(UPARAM(ref) TArray<float\>& FloatArray, TArray<float\>& FloatArrayRef)
{
	FloatArray.Sort();
	FloatArrayRef \= FloatArray;
}

Efficiency And Stability
------------------------

Because the variables are references rather than hard data, these operations are very efficient, because no new data is being created!

The array data is never duplicated, only sorted and a reference to the array passed back out to BP!

Yay!

Conclusion
----------

Now you know how you can perform high-speed calculations on BP variables in C++ and then send the results back to BP in the most efficient and stable way possible: by reference!

Enjoy!

Rama

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_To\_Modify\_Blueprint\_Variable\_References\_In\_C%2B%2B\_Without\_Copying&oldid=15963](https://wiki.unrealengine.com/index.php?title=How_To_Modify_Blueprint_Variable_References_In_C%2B%2B_Without_Copying&oldid=15963)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)