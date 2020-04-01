Profiling, How To Count CPU Cycles Of Specific Blocks Of Your Game Code - Epic Wiki                    

Profiling, How To Count CPU Cycles Of Specific Blocks Of Your Game Code
=======================================================================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Pic of What This Wiki Enables You To Do](#Pic_of_What_This_Wiki_Enables_You_To_Do)
*   [2 UE4 Documentation on Profiler](#UE4_Documentation_on_Profiler)
    *   [2.1 Running The UE4 Profiler](#Running_The_UE4_Profiler)
    *   [2.2 Opening Your Profiled Game Session Data in the Editor](#Opening_Your_Profiled_Game_Session_Data_in_the_Editor)
*   [3 Self](#Self)
*   [4 Creating Your Own Stat Group](#Creating_Your_Own_Stat_Group)
*   [5 Creating the Stat](#Creating_the_Stat)
*   [6 Using the Stat](#Using_the_Stat)
*   [7 Counting CPU Cycles For Any Block of Code](#Counting_CPU_Cycles_For_Any_Block_of_Code)
*   [8 Example From My Code Base](#Example_From_My_Code_Base)
*   [9 Conclusion](#Conclusion)

Overview
--------

**Author:** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

In this wiki I show you how you can count the CPU cycles of individual blocks of your game code, and expose this information to a very easy-to-use UI in the UE4 Editor!

This wiki shows you how to leverage all the work Epic engineers have put into the UE4 profiler, customizing it to monitor named sections of your game code!

After you're done with this wiki you will be able to check on the performance of any individual lines or functions from your entire project-level code base, assigning your own chosen names to these blocks of code!

Enjoy!

Rama

### Pic of What This Wiki Enables You To Do

In this picture you can see I've created my own custom STAT so that the UE4 Profiler can track a specific block of my game code that I called **"Joy ~ PerformSphereMovement"**.

I've successfully tracked the CPU cycles of a section of my own project-level code base and exposed this information to the very friendly GUI of the UE4 Profiler!

Yay!

This picture shows that the UE4 Profiler has confirmed my guess that a certain block of my code was causing almost 97% (96.6) of the performance hit for all the character tick code in my entire code base!

It saves me hours of time to be able to easily narrow down what block of code in my rather large character code base is causing **literally 97% of the character-code performance hit!**

[![WeHaveOurOwnStatsNow.jpg](https://d3ar1piqh1oeli.cloudfront.net/d/d6/WeHaveOurOwnStatsNow.jpg/1000px-WeHaveOurOwnStatsNow.jpg)](/File:WeHaveOurOwnStatsNow.jpg)

UE4 Documentation on Profiler
-----------------------------

I assume you are familiar with the basics of the UE4 profiler in this tutorial.

If you have not yet seen what the profiler can already do for you, I recommend reading the Epic Documentation and trynig it out!

[Epic Documentation on the Amazing UE4 Profiler](https://docs.unrealengine.com/latest/INT/Engine/Performance/Profiler/index.html)

  
I will however cover a few basics on using the profile to get you up and running:

### Running The UE4 Profiler

Type in the in-game console to Start Profile:

 "stat startfile";

Type in the in-game console To Stop Profile

 "stat stopfile";

### Opening Your Profiled Game Session Data in the Editor

Go to Window->Developer Tools->Session Front End

Then click on the profiler button!

[![SessionFrontProfiler.jpg](https://d3ar1piqh1oeli.cloudfront.net/a/af/SessionFrontProfiler.jpg/900px-SessionFrontProfiler.jpg)](/File:SessionFrontProfiler.jpg)

Then you can load your file that you saved!

It will be under the Saved/Profiling directory :)

Always check the date to make sure you are looking at the right file!

Self
----

Now on to the core of this wiki!

You'll notice that in your game code there will be huge blocks called "Self" which indicates code that has not been divided up into cycle-counted sub-sections! This Self block is all of the code running for your in-game class instances.

Well here is how you can sub-divide Self into your own chosen named categories, neatly organizing and cateloging your own code base!

Creating Your Own Stat Group
----------------------------

Let's say you have class hierachy of classes for your in-game Character.

You want to subdivide the inner workings of your entire character code into CPU cycle-counted code blocks.

In the highest level of your class structure, in the .h, declare your category

//For UE4 Profiler ~ Stat Group
DECLARE\_STATS\_GROUP(TEXT("JoyBall"), STATGROUP\_JoyBall, STATCAT\_Advanced);

Creating the Stat
-----------------

In the .cpp where you want to track a particular function body, put this at the top just below the #includes

/\*
 
	By Rama
 
\*/
#include "Joy.h"
#include "JoyBall.h"
 
//For UE4 Profiler ~ Stat
DECLARE\_CYCLE\_STAT(TEXT("Joy ~ PerformSphereMovement"), STAT\_PerformSphereMovement, STATGROUP\_JoyBall);

Please note you can create as many CYCLE\_STAT's as you want for your particular STATGROUP !

And you should have one DECLARE\_CYCLE\_STAT for each function body/scope that you want to count cycles for

Using the Stat
--------------

At the very top of the scope of the function you want to track, put the SCOPE macro. Everything within the brackets of the scope you put the SCOPE\_CYCLE\_COUNTER in will be cycle-counted by the profiler!

void AJoyBallMovement::PerformSphereMovement()
{
	SCOPE\_CYCLE\_COUNTER(STAT\_PerformSphereMovement);
 
    //... your code that you want to test the performance of and have show up in the profiler
 
} //Cycle count scope ends here -Rama

Counting CPU Cycles For Any Block of Code
-----------------------------------------

Please note your scope can be within a single function, just make sure to give such a stat an appropriate name like YourFunction\_Internal or something Again, the SCOPE\_CYCLE\_COUNTER will cycle-count within its brackets

void AJoyBallMovement::PerformSphereMovement()
{
	//First part of this function, code that wont be cycle counted
	ConsoleCommand("Joy");
	//... etc
 
	//You can scope any lines of code you want by adding brackets!
	{
		SCOPE\_CYCLE\_COUNTER(STAT\_PerformSphereMovement);
		int32 Parameter \= 200;
		YourFunctionThatYouThinkMightBeSlow(Parameter);
		//other code to cycle count
 
	} //Cycle count scope ends here -Rama
 
 
	//More code that wont be cycle counted
	ConsoleCommand("~~~~~");
        //... etc
}

Example From My Code Base
-------------------------

See the picture in the overview!

In my own code base I had a 10 class inheritance hierarchy for my game character, and the UE4 profiler was simply telling me that the character "Self" was costing 37% of my total performance hit.

I used the info I am sharing with you in this wiki to create a SCOPE\_CYCLE\_COUNTER for the function that I thought was probably taking all the performance, and I was right!

But the most important thing is that I enabled the awesome UE4 Profiler to help me narrow down the performance hit in my game code to just a single function / block of code, and so with that info I can easily address the performance hit, knowing it is worth the effort to rewrite the code!

Conclusion
----------

You now know how you can CPU cycle-count individual lines of your game code base, and expose this information to UE4's super awesome GUI Profiler!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Profiling,\_How\_To\_Count\_CPU\_Cycles\_Of\_Specific\_Blocks\_Of\_Your\_Game\_Code&oldid=13627](https://wiki.unrealengine.com/index.php?title=Profiling,_How_To_Count_CPU_Cycles_Of_Specific_Blocks_Of_Your_Game_Code&oldid=13627)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)