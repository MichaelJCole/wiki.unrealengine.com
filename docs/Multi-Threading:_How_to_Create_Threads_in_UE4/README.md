 Multi-Threading: How to Create Threads in UE4 - Epic Wiki             

 

Multi-Threading: How to Create Threads in UE4
=============================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 What The Code Below Does](#What_The_Code_Below_Does)
    *   [1.2 Static Functions](#Static_Functions)
    *   [1.3 Performance](#Performance)
    *   [1.4 Video](#Video)
*   [2 .H](#.H)
*   [3 .CPP](#.CPP)
*   [4 Starting the thread](#Starting_the_thread)
*   [5 Thread Management](#Thread_Management)
    *   [5.1 Using Sleep for Thread Management](#Using_Sleep_for_Thread_Management)
*   [6 What Not to Do](#What_Not_to_Do)
*   [7 Timer Functions in GameThread](#Timer_Functions_in_GameThread)
*   [8 How to Support Single Threaded Platforms?](#How_to_Support_Single_Threaded_Platforms.3F)
*   [9 Conclusion](#Conclusion)

Overview
--------

**Author** [Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Dear Community,

Here is how you can create your own threads in UE4!

This is the code you'd use for a very large task.

For small incremental tasks that can be divided into chunks check out my Task Graph Tutorial:

**[Multi-Threading:\_Task\_Graph\_System](/index.php?title=Multi-Threading:_Task_Graph_System "Multi-Threading: Task Graph System")**

_Note start ([Zyr](/index.php?title=User:Zyr&action=edit&redlink=1 "User:Zyr (page does not exist)") | [talk](/index.php?title=User_talk:Zyr&action=edit&redlink=1 "User talk:Zyr (page does not exist)"))_

The _FRunnable_ and _FRunnableThread_ approach Rama presents here is certainly a viable solution for most problems. However, when creating many tasks you might hit the upper limit of concurrency a CPU can handle, at which point the concurrent threads are actually going to hinder each other while fighting for CPU time. It might then be worth looking at the [FQueuedThreadPool](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/Misc/FQueuedThreadPool/index.html) to limit the number of threads available to your tasks.

The Unreal Engine 4 also provides a global _GThreadPool_, however this thread pool is set to only a single thread (UE4.14.3). It seems to be intended for simply running a concurrent task on another core.

_Note end_

### What The Code Below Does

*   Creates a thread to compute the first 50,000 prime numbers
*   Sends incremental completion data back to the Game Thread
*   Has static accessors for starting, shutting down, and finding out if thread is done.

### Static Functions

You will note in the code below I am using static functions to easily start the new thread, and I could also use a static Shutdown() function from the GameThread if I ever needed to shut the thread down in a hurry (such as player exiting the game)

### Performance

I first computed the first 50,000 prime numbers using the Task Graph System, and creating 50,000 tasks (1 for each prime to find).

In the code you see in this tutorial, I instead created a dedicated thread to calculate the first 50,000 prime numbers!

**The performance benefit was phenomenal!**

My fps stayed solid 90 (my chosen max fps) for the entire running of this thread in code below.

Whereas for with the task graph system, as I got closer to 50,000 the fps dropped by a max of 40.

For larger tasks make sure to try out actual multi-threading!

### Video

The below is video for the multi-task version, which had marked fps drop as compared with this method of creating an actual thread.

It's the same general idea though, the first 50,000 prime numbers get computed while you continue to do whatever you want in main game thread :)

I show my results at the end of the video.

You can compare them with this webpage!

My multi-threading system did actually calculate the first 50,000 (+1) prime numbers!

**[|First 50,000 Prime Numbers](http://www.cs.arizona.edu/icon/oddsends/primes.htm)**

<youtube>[https://www.youtube.com/watch?v=cgELOodtoSU&feature=youtu.be](https://www.youtube.com/watch?v=cgELOodtoSU&feature=youtu.be)</youtube>

.H
--

//~~~~~ Multi Threading ~~~
class FPrimeNumberWorker : public FRunnable
{	
	/\*\* Singleton instance, can access the thread any time via static accessor, if it is active! \*/
	static  FPrimeNumberWorker\* Runnable;
	
	/\*\* Thread to run the worker FRunnable on \*/
	FRunnableThread\* Thread;
	
	/\*\* The Data Ptr \*/
	TArray<uint32\>\* PrimeNumbers;
	
	/\*\* The PC \*/
	AVictoryGamePlayerController\* ThePC;
	
	/\*\* Stop this thread? Uses Thread Safe Counter \*/
	FThreadSafeCounter StopTaskCounter;
	
	//The actual finding of prime numbers
	int32 FindNextPrimeNumber();
	
private:
	int32				PrimesFoundCount;
public:
	
	int32				TotalPrimesToFind;

	//Done?
	bool IsFinished() const
	{
		return PrimesFoundCount \>= TotalPrimesToFind;
	}
	
	//~~~ Thread Core Functions ~~~
	
	//Constructor / Destructor
	FPrimeNumberWorker(TArray<uint32\>& TheArray, const int32 IN\_PrimesToFindPerTick, AVictoryGamePlayerController\* IN\_PC);
	virtual ~FPrimeNumberWorker();

	// Begin FRunnable interface.
	virtual bool Init();
	virtual uint32 Run();
	virtual void Stop();
	// End FRunnable interface
	
	/\*\* Makes sure this thread has stopped properly \*/
	void EnsureCompletion();
	
	
	
	//~~~ Starting and Stopping Thread ~~~
	
	
	
	/\* 
 Start the thread and the worker from static (easy access)! 
 This code ensures only 1 Prime Number thread will be able to run at a time. 
 This function returns a handle to the newly started instance.
 \*/
	static FPrimeNumberWorker\* JoyInit(TArray<uint32\>& TheArray, const int32 IN\_TotalPrimesToFind, AVictoryGamePlayerController\* IN\_PC);

	/\*\* Shuts down the thread. Static so it can easily be called from outside the thread context \*/
	static void Shutdown();

        static bool IsThreadFinished();

};

.CPP
----

//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
//Thread Worker Starts as NULL, prior to being instanced
//		This line is essential! Compiler error without it
FPrimeNumberWorker\* FPrimeNumberWorker::Runnable \= NULL;
//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

FPrimeNumberWorker::FPrimeNumberWorker(TArray<uint32\>& TheArray, const int32 IN\_TotalPrimesToFind, AVictoryGamePlayerController\* IN\_PC)
	: ThePC(IN\_PC)
	, TotalPrimesToFind(IN\_TotalPrimesToFind)
	, StopTaskCounter(0)
	, PrimesFoundCount(0)
{
	//Link to where data should be stored
	PrimeNumbers \= &TheArray;
	
	Thread \= FRunnableThread::Create(this, TEXT("FPrimeNumberWorker"), 0, TPri\_BelowNormal); //windows default = 8mb for thread, could specify more
}

FPrimeNumberWorker::~FPrimeNumberWorker()
{
	delete Thread;
	Thread \= NULL;
}

//Init
bool FPrimeNumberWorker::Init()
{
	//Init the Data 
	PrimeNumbers\->Empty();
	PrimeNumbers\->Add(2);
	PrimeNumbers\->Add(3);
	
	if(ThePC) 
	{
		ThePC\->ClientMessage("\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*");
		ThePC\->ClientMessage("Prime Number Thread Started!");
		ThePC\->ClientMessage("\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*");
	}
	return true;
}

//Run
uint32 FPrimeNumberWorker::Run()
{
	//Initial wait before starting
	FPlatformProcess::Sleep(0.03);
	
	//While not told to stop this thread 
	//		and not yet finished finding Prime Numbers
	while (StopTaskCounter.GetValue() \== 0 && ! IsFinished())
	{
		PrimeNumbers\->Add(FindNextPrimeNumber());
		PrimesFoundCount++;
		
		//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
		//Show Incremental Results in Main Game Thread!
		
		//	Please note you should not create, destroy, or modify UObjects here.
		//	  Do those sort of things after all thread are completed.
		
		//	  All calcs for making stuff can be done in the threads
		//	     But the actual making/modifying of the UObjects should be done in main game thread.
		ThePC\->ClientMessage(FString::FromInt(PrimeNumbers\->Last()));
		//\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
		
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		//prevent thread from using too many resources
		//FPlatformProcess::Sleep(0.01);
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	}
	
	//Run FPrimeNumberWorker::Shutdown() from the timer in Game Thread that is watching
        //to see when FPrimeNumberWorker::IsThreadFinished()
	
	return 0;
}

//stop
void FPrimeNumberWorker::Stop()
{
	StopTaskCounter.Increment();
}

FPrimeNumberWorker\* FPrimeNumberWorker::JoyInit(TArray<uint32\>& TheArray, const int32 IN\_TotalPrimesToFind, AVictoryGamePlayerController\* IN\_PC)
{
	//Create new instance of thread if it does not exist
	//		and the platform supports multi threading!
	if (!Runnable && FPlatformProcess::SupportsMultithreading())
	{
		Runnable \= new FPrimeNumberWorker(TheArray,IN\_TotalPrimesToFind,IN\_PC);			
	}
	return Runnable;
}

void FPrimeNumberWorker::EnsureCompletion()
{
	Stop();
	Thread\->WaitForCompletion();
}

void FPrimeNumberWorker::Shutdown()
{
	if (Runnable)
	{
		Runnable\->EnsureCompletion();
		delete Runnable;
		Runnable \= NULL;
	}
}

bool FPrimeNumberWorker::IsThreadFinished()
{
	if(Runnable) return Runnable\->IsFinished();
	return true;
}
int32 FPrimeNumberWorker::FindNextPrimeNumber()
{
	//Last known prime number  + 1
	int32 TestPrime \= PrimeNumbers\->Last();
	
	bool NumIsPrime \= false;
	while( ! NumIsPrime)
	{
		NumIsPrime \= true;
		
		//Try Next Number
		TestPrime++;
		
		//Modulus from 2 to current number - 1 
		for(int32 b \= 2; b < TestPrime; b++)
		{
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			//prevent thread from using too many resources
			//FPlatformProcess::Sleep(0.01);
			//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
			if(TestPrime % b \== 0) 
			{
				NumIsPrime \= false;
				break;
				//~~~
			}
		}
	}
	
	//Success!
	return TestPrime;
}

Starting the thread
-------------------

//In the .h for the player controller
// this is the actual data
TArray<uint32\> PrimeNumbers;

  

//player controller .cpp
//Multi-threading, returns handle that could be cached.
//		use static function FPrimeNumberWorker::Shutdown() if necessary
FPrimeNumberWorker::JoyInit(PrimeNumbers, 50000, this);

Thread Management
-----------------

You should look in the code base for "FRunnable" to see expanded uses of multi threading and lock / unlocking protection.

I used a simple example to get you started, but there's a lot to consider when multi-threading :)

### Using Sleep for Thread Management

You should consider using

FPlatformProcess::Sleep(seconds);

to prevent 1 thread from taking too many system resources :)

What Not to Do
--------------

*   Do not try to modify, create, or delete UObjects from other threads!

You can prepare all the data / do all the calculations, but only the game thread should be actually spawning / modifying / deleting UObjects / AActors.

*   Dont try to use TimerManager outside of the game thread :)

*   Don't try to draw debug lines/points etc, as it will likely crash, ie DrawDebugLine(etc...)

Notice (since 4.11):

If you want to use the timer, remove, and modify variables use it:

#include "Async.h"
...
AsyncTask(ENamedThreads::GameThread, \[\]() {
     // code to execute on game thread here
 });

Timer Functions in GameThread
-----------------------------

You can run a timer function in the game thread to periodically check on the data being gathered by the other threads you create.

How to Support Single Threaded Platforms?
-----------------------------------------

If your code absolutely has to run even in a single threaded environment such as HTML5, then check out

**AsyncIOSystemBase.h**

 struct CORE\_API FAsyncIOSystemBase : public FIOSystem, FRunnable, FSingleThreadRunnable

A Runnable can extend SingleThreadRunnable and return itself for FRunnable's hook for single threaded cases:

/\*\*
 \* Gets single thread interface pointer used for ticking this runnable when multi-threading is disabled.
 \* If the interface is not implemented, this runnable will not be ticked when FPlatformProcess::SupportsMultithreading() is false.
 \*
 \* @return Pointer to the single thread interface or nullptr if not implemented.
 \*/
virtual class FSingleThreadRunnable\* GetSingleThreadInterface( )
{
	return nullptr;
}

Conclusion
----------

Enjoy!

[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Multi-Threading:\_How\_to\_Create\_Threads\_in\_UE4&oldid=49](https://wiki.unrealengine.com/index.php?title=Multi-Threading:_How_to_Create_Threads_in_UE4&oldid=49)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")