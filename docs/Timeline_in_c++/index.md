Timeline in c++ - Epic Wiki                    

Timeline in c++
===============

How to use Timeline in c++
--------------------------

This example maybe gives you an idea about how to use Timelines in c++.

It was tested on 4.10, but it should also work on other version in a similar way.

Disclaimer: This wiki combines previous examples from Answerhub and Forum and adds on top of it, that you dont need the actors tick component where u place the timeline.

  
.h

YourClass(const FObjectInitializer& ObjectInitializer);
 
UPROPERTY()
UTimelineComponent\* ScoreTimeline;
 
UPROPERTY()
UCurveFloat\* fCurve;
 
FOnTimelineFloat InterpFunction{};
 
UFUNCTION()
void TimelineFloatReturn(float val);

  
.cpp

// Constructor
AYourClass::AYourClass(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{
static ConstructorHelpers::FObjectFinder<UCurveFloat\> Curvy(TEXT("Reference Path to your Float Curve"));
 if (Curvy.Object) {
     fCurve \= Curvy.Object;
 }
 
ScoreTimeline \= ObjectInitializer.CreateDefaultSubobject<UTimelineComponent\>(this, TEXT("TimelineScore"));
 
//Bind the Callbackfuntion for the float return value
 InterpFunction.BindUFunction(this, FName{ TEXT("TimelineFloatReturn") });
}
 
 
//BeginPlay
void AYourClass::BeginPlay()
{
//Add the float curve to the timeline and connect it to your timelines's interpolation function
ScoreTimeline\-\>AddInterpFloat(fCurve, InterpFunction, FName{ TEXT("Floaty") });
 
 // Start your Timeline or PlayFromStart() etc, can be called anywhere in this class
ScoreTimeline\-\>Play();
}
 
 
//Your Callback Function for the timeline float value
void AYourClass::TimelineFloatReturn(float val)
{
 //Your float val from curve returns here
}

  
If at the same time you would like to get the return value from another float or vector curve in your return function, then just get the playback position of your timeline and and get the corresponding return value from your curve.

YourOtherFloatCurve\-\>GetFloatValue(ScoreTimeline\-\>GetPlaybackposition());
YourOtherVectorCurve\-\>GetVectorValue("");

  
[spaceharry](/User:Spaceharry "User:Spaceharry") ([talk](/index.php?title=User_talk:Spaceharry&action=edit&redlink=1 "User talk:Spaceharry (page does not exist)"))

  

**Rate this Page:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (2 votes)

Approved for Versions:4.12

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Timeline\_in\_c%2B%2B&oldid=22088](https://wiki.unrealengine.com/index.php?title=Timeline_in_c%2B%2B&oldid=22088)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)