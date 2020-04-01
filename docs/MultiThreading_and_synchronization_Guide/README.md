 MultiThreading and synchronization Guide - Epic Wiki             

 

MultiThreading and synchronization Guide
========================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 RNGThread.H](#RNGThread.H)
*   [3 RNGThread.CPP](#RNGThread.CPP)
*   [4 Using the Thread and it's methods inside PlayerController](#Using_the_Thread_and_it.27s_methods_inside_PlayerController)
*   [5 Conclusion](#Conclusion)

Overview
--------

**Author** [User:ColdSteel48](/index.php?title=User:ColdSteel48&action=edit&redlink=1 "User:ColdSteel48 (page does not exist)")

Dear Community,

Here is a little tutorial about thread synchronization and events.

I am not going to cover the thread creating techniques since [Rama](/index.php?title=User:Rama "User:Rama") did a great job on it!

We will take a look on how to use _FCriticalSection_ and _FEvent_.

We will create a somehow similar to [Rama](/index.php?title=User:Rama "User:Rama")'s thread example to compute random _Fvectors_ and store them in _TArray_ protected by _FCriticalSection_ for thread safety and we will create a kill thread event using _FEvent_.

We will also cover a Pause and UnPause thread with help of the same _FEvent_.

  

RNGThread.H
-----------

<syntaxhighlight lang="cpp"> class URPRJNAME\_API RNGThread : public FRunnable { public:

       //Constructor

RNGThread(int Count = 50000, int minNumber = 0, int maxNumber = 1000, int chunkCount = 20); //Destructor ~RNGThread();

       //Use this method to kill the thread!!

void EnsureCompletion();

       //Pause the thread 

void PauseThread();

       //Continue/UnPause the thread

void ContinueThread();

//FRunnable interface. virtual bool Init(); virtual uint32 Run(); virtual void Stop();

       bool IsThreadPaused();

       FVector GetRandomVector();        

private: //Thread to run the worker FRunnable on FRunnableThread\* Thread;

FCriticalSection m\_mutex; FEvent \* m\_semaphore;

int m\_chunkCount; int m\_amount; int m\_MinInt; int m\_MaxInt;

       //As the name states those members are Thread safe

FThreadSafeBool m\_Kill; FThreadSafeBool m\_Pause;

       //The array is a private member because we don't want to allow anyone from outside the class to access it since we want to ensure a thread safety.
       TArray<FVector> m\_RandomVecs;

}; </syntaxhighlight>

RNGThread.CPP
-------------

<syntaxhighlight lang="cpp">

1.  include "URPPRJNAME.h" /\* To be able to use FGenericPlatformProcess \*/
2.  include "RNGThread.h"

RNGThread::RNGThread(int Count, int minNumber, int maxNumber, int chunkCount) { m\_Kill= false; m\_Pause = false;

       //Initialize FEvent (as a cross platform (Confirmed Mac/Windows))

m\_semaphore = FGenericPlatformProcess::GetSynchEventFromPool(false);;

m\_MinInt = minNumber; m\_MaxInt = maxNumber;

m\_chunkCount = chunkCount;

m\_amount = Count; m\_RandomVecs.Reserve(m\_amount);

Thread = FRunnableThread::Create(this, TEXT("RNGThread") , 0, TPri\_BelowNormal); }

RNGThread::~RNGThread() { if (m\_semaphore) {

               //Cleanup the FEvent

FGenericPlatformProcess::ReturnSynchEventToPool(m\_semaphore); m\_semaphore = nullptr; }

if (Thread) {

               //Cleanup the worker thread

delete Thread; Thread = nullptr; } }

bool RNGThread::Init() {

       //Init the Data 

m\_RandomVecs.Empty(); return true; }

uint32 RNGThread::Run() { //Initial wait before starting FPlatformProcess::Sleep(0.03);

while (!m\_Kill) { if (m\_Pause) {

                       //FEvent->Wait(); will "sleep" the thread until it will get a signal "Trigger()"

m\_semaphore->Wait();

if (m\_Kill) { return 0; } } else {

                       //Create temporal array (chunk)

TArray<FVector> ChunkArray; ChunkArray.Reserve(m\_chunkCount);

                       //Calculate random vectors and put them to the temporal array
                       //I did it so we won't lock/unlock FCritical section each time we generating a new FVector (Locking and Unlocking is somewhat expensive).

for (int i = 0; i < m\_chunkCount; i++) { FVector RandomVec; RandomVec.X = (float)FMath::RandRange((int)m\_MinInt, (int)m\_MaxInt); RandomVec.Y = (float)FMath::RandRange((int)m\_MinInt, (int)m\_MaxInt); RandomVec.Z = 0; ChunkArray.Emplace(RandomVec); }

  

                       //Critical section:

m\_mutex.Lock();

                           //We are locking our FCriticalSection so no other thread will access it
                           //And thus it is a thread-safe access now

                           //Append the temporal array to the Actual storage array/

m\_RandomVecs.Append(ChunkArray);

                           //Get array size

int num = m\_RandomVecs.Num();

                          //Unlock FCriticalSection so other threads may use it.

m\_mutex.Unlock();

                       //Pause Condition - if we RandomVectors contains more vectors than m\_amount we shall pause the thread to release system resources.

if (num > m\_amount) { m\_Pause = true; }

                       //A little sleep between the chunks (So CPU will rest a bit -- (may be omitted))

FPlatformProcess::Sleep(0.1); } }

return 0; }

void RNGThread::PauseThread() { m\_Pause = true; }

void RNGThread::ContinueThread() { m\_Pause = false;

if (m\_semaphore) {

               //Here is a FEvent signal "Trigger()" -> it will wake up the thread.

m\_semaphore->Trigger(); } }

void RNGThread::Stop() { m\_Kill= true; //Thread kill condition "while (!m\_Kill){...}" m\_Pause = false;

if (m\_semaphore) {

               //We shall signal "Trigger" the FEvent (in case the Thread is sleeping it shall wake up!!)

m\_semaphore->Trigger(); } }

//Use this method to kill the thread!! void RNGThread::EnsureCompletion() { Stop();

if (Thread) { Thread->WaitForCompletion(); } }

//if the array is not yet ready we will generate the vector on the caller thread. FORCEINLINE FVector GenerateRandomVecInRange(int min, int max) { FVector WanderingPoint(0, 0, 0); WanderingPoint.X = (float)FMath::RandRange((int)min, (int)max); WanderingPoint.Y = (float)FMath::RandRange((int)min, (int)max); WanderingPoint.Z = (float)FMath::RandRange((int)min, (int)max); return WanderingPoint; }

bool RNGThread:IsThreadPaused() {

       return (bool)m\_Pause;

}

FVector RNGThread::GetRandomVector() {

       //Here we are retrieving the Vector from our storage array in a thread safe manner 
       //Despite this is a member method of this class it will be called from another thread (most likely from the GameThread) (This is by the way true for each public member methods except the "Run()" method) - So we must ensure the thread safety!
       //Critical section:

m\_mutex.Lock();

       	int lastIndex = m\_RandomVecs.Num() - 1;

if (lastIndex < 0) {

                       //The array is not ready yet :-0

m\_mutex.Unlock(); //We must unlock the critical section before the return to avoid a deadlock. return GenerateRandomVecInRange(m\_MinInt, m\_MaxInt); }

               FVector vec2ret;

vec2ret = m\_RandomVecs\[lastIndex\]; m\_RandomVecs.RemoveAt(lastIndex);

               //Some automation: if we have less than 10% random FVectors in our array we will UnPause the thread. (maybe omitted).
               if (m\_RandomVecs.Num() < m\_amount/10)

{ RandomVecsPoolThreadHandle->ContinueThread(); }

      //Critical section ends here.
      m\_mutex.Unlock();
      
      //return random vector to the caller.
      return vec2ret; 

} </syntaxhighlight>

  

Using the Thread and it's methods inside PlayerController
---------------------------------------------------------

<syntaxhighlight lang="cpp"> //In the .h for the player controller (for example) RNGThread\* RandomVecsPoolThreadHandle;

//Cpp //Starting For example in the BeginPlay (NOTE: Please do not start the thread in constructor!). void AMyPlayerController::BeginPlay() { Super::BeginPlay(); RandomVecsPoolThreadHandle = nullptr;

       RandomVecsPoolThreadHandle = new RNGThread(/\*We will use the default values\*/);

}

//Killing the thread for example in EndPlay() or BeginDestroy() void AMyPlayerController::EndPlay(const EEndPlayReason::Type EndPlayReason) { if (RandomVecsPoolThreadHandle) { if (RandomVecsPoolThreadHandle) { RandomVecsPoolThreadHandle->EnsureCompletion(); delete RandomVecsPoolThreadHandle; RandomVecsPoolThreadHandle = nullptr; } }

Super::EndPlay(EndPlayReason); }

void AMyPlayerController::BeginDestroy() { if (RandomVecsPoolThreadHandle) { RandomVecsPoolThreadHandle->EnsureCompletion(); delete RandomVecsPoolThreadHandle; RandomVecsPoolThreadHandle = nullptr; } Super::BeginDestroy(); }

//Lets print the Random vectors inside the Tick for instance: void AMyPlayerController::Tick(float DeltaSeconds) { Super::Tick(DeltaSeconds);

       if (RandomVecsPoolThreadHandle)

{

            FVector myVector = RandomVecsPoolThreadHandle->GetRandomVector();
            if(GEngine)
            {
                GEngine->AddOnScreenDebugMessage(-1, 3, FColor::Yellow, FString::Printf(TEXT("MyRandomVec = (%.2f, %.2f, %.2f) "), myVector.X, myVector.Y, myVector.Z ));
            }
       }

} </syntaxhighlight>

  

Conclusion
----------

That's it for now :-) Enjoy!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=MultiThreading\_and\_synchronization\_Guide&oldid=307](https://wiki.unrealengine.com/index.php?title=MultiThreading_and_synchronization_Guide&oldid=307)"