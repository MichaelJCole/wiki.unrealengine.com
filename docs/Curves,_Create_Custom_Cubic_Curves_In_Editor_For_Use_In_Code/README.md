Curves, Create Custom Cubic Curves In Editor For Use In Code - Epic Wiki                    

Curves, Create Custom Cubic Curves In Editor For Use In Code
============================================================

Contents
--------

*   [1 Overview](#Overview)
*   [2 UE4 Curve Asset](#UE4_Curve_Asset)
*   [3 UE4 Curve Editor](#UE4_Curve_Editor)
*   [4 .h](#.h)
*   [5 .cpp](#.cpp)
*   [6 Character BP](#Character_BP)
*   [7 Conclusion](#Conclusion)

Overview
--------

_Author:_ [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

This wiki tutorial shows you how to get custom hand crafted curves into C++ !

This uses a combination of UE4 blueprints and UE4 c++ to enable you to create custom effects and physics movement curves in pure C++ with the ease of UE4's visual curve editor!

Below is a picture of the final result!

I draw this curve in the editor and and can now use it in C++ !

[![CurveFinal.jpg](https://d3ar1piqh1oeli.cloudfront.net/b/b7/CurveFinal.jpg/700px-CurveFinal.jpg)](/File:CurveFinal.jpg)

UE4 Curve Asset
---------------

[![MiscCurve.jpg](https://d26ilriwvtzlb.cloudfront.net/d/db/MiscCurve.jpg)](/File:MiscCurve.jpg)

UE4 Curve Editor
----------------

[![CurveAuto.jpg](https://d3ar1piqh1oeli.cloudfront.net/e/e4/CurveAuto.jpg/700px-CurveAuto.jpg)](/File:CurveAuto.jpg)

.h
--

UCLASS()
class AYourCharacter : public ACharacter
{
	GENERATED\_UCLASS\_BODY()
 
 
	/\*\* Joy Curve \*/
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="JoyCurve")
	UCurveFloat\* JoyCurve;    
 
 
	//Rama's Draw Point wrapper
	FORCEINLINE void DrawPoint 
	(
		const FVector& Loc,
		const float Size \= 7,
		const FColor& Color \= FColor::Red,
		const float Duration\=\-1.f
	) const {
		DrawDebugPoint(
			GetWorld(), 
			Loc,  
			Size, //thickness
			Color, 
			false,
			Duration
		);
	}

.cpp
----

//Tick
void AYourCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
	//~~~~~~~~~~~~
 
 
	//~~~ Draw the Curve! ~~~
 
	if(JoyCurve)
	{
		for(float v \= 0; v < 1; v+\=0.01)
		{
			DrawPoint(GetActorLocation() + FVector(v \* 128,0,128 \* JoyCurve\-\>GetFloatValue(v)) );
		}
	}
	else
	{
		//UE\_LOG "Joy CURVE IS INVALID!!!!";
	}
}

Character BP
------------

Compile the above addition to your Character class!

Now set the asset reference that you made in the code, in the editor in your character BP!

[![CharBP.jpg](https://d3ar1piqh1oeli.cloudfront.net/6/6c/CharBP.jpg/700px-CharBP.jpg)](/File:CharBP.jpg)

Conclusion
----------

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Curves,\_Create\_Custom\_Cubic\_Curves\_In\_Editor\_For\_Use\_In\_Code&oldid=8830](https://wiki.unrealengine.com/index.php?title=Curves,_Create_Custom_Cubic_Curves_In_Editor_For_Use_In_Code&oldid=8830)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)