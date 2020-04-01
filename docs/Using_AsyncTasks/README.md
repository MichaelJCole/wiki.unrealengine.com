 Using AsyncTasks - Epic Wiki             

 

Using AsyncTasks
================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 What You Will Learn](#What_You_Will_Learn)
*   [2 Async Tasks Explained](#Async_Tasks_Explained)
    *   [2.1 Why is this helpful?](#Why_is_this_helpful.3F)
*   [3 Types of Async Tasks](#Types_of_Async_Tasks)
    *   [3.1 FAsyncTask](#FAsyncTask)
    *   [3.2 FAutoDeleteAsyncTask](#FAutoDeleteAsyncTask)
*   [4 How to Declare and Define an Async Task](#How_to_Declare_and_Define_an_Async_Task)
    *   [4.1 Organization](#Organization)
    *   [4.2 The Actual Code](#The_Actual_Code)
*   [5 How to Instantiate and Run an Async Task](#How_to_Instantiate_and_Run_an_Async_Task)
*   [6 Advanced Topics](#Advanced_Topics)
    *   [6.1 Returning Data](#Returning_Data)

Overview
========

I have been asked about my work with successfully creating FAsyncTasks. It has come up enough in Slack chat that I finally broke down and I want to make a really fantastic article about it. Hopefully I will succeed.

What You Will Learn
-------------------

1.  What Async Tasks are
2.  Types of Async Tasks
3.  How to Declare and Define an Async Task
4.  How to Instantiate and Run an Async Task

Async Tasks Explained
=====================

A so called **Async Task** is a way of running non-blocking asynchronous code on a thread which is removed from the main 'Game Thread'

Why is this helpful?
--------------------

Well, if you need to take a long time to complete a task, chunk something up into multiple parts, or generally not interfere with the regular tick and render cycle of a game for any reason, then this is one of the best methods available to you in Unreal Engine.

If you run the same code **Synchronously** or have it **Blocking**, it will generally halt your game logic and rendering and cause major performance issues! No fun.

Also, you can _vastly_ increase performance for Asynchronous tasks that can make use of multi-threaded systems.

Types of Async Tasks
====================

The classes that are referred to as Async Tasks are 'friend' classes used in conjunction with FNonAbandonableTask and come in two flavors: FAsyncTask and FAutoDeleteAsyncTask.

FAsyncTask
----------

This task type requires some manual attention in order to stop, or delete the task. Other than that, both flavors are fairly identical.

[UE4 Documentation on FAsyncTask](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/Async/FAsyncTask/index.html)

FAutoDeleteAsyncTask
--------------------

This task type requires _zero_ attention in order to stop, or delete the task. Other than that, both flavors are fairly identical.

[UE4 Documentation on FAutoDeleteAsyncTask](https://docs.unrealengine.com/latest/INT/API/Runtime/Core/Async/FAutoDeleteAsyncTask/index.html)

How to Declare and Define an Async Task
=======================================

Although there are multiple ways to accomplish this, I will show you the way in which I handle Async Tasks personally, which should accommodate most uses.

Organization
------------

The method I use to organize my code is to create a C++ Component that handles the types of Tasks I want to create. That way, I can invoke the tasks from Blueprints very easily, and yet have all of the speed of C++. I'm going to focus a lot more on the Async Task code itself, so don't worry about that too much.

The Actual Code
---------------

Just below my Component class body in my component's Header file, I add all of my FAsyncTask and FAutoDeleteAsyncTask classes.

They are declared like so:

<syntaxhighlight lang="cpp"> class FMyTaskName : public FNonAbandonableTask { friend class FAutoDeleteAsyncTask<FMyTaskName>;

public: FMyTaskName(int32 Input, int32 Input2) : MyInput(Input), MyInput2(Input2) {}

protected: int32 MyInput; int32 MyInput2;

void DoWork() { // Place the Async Code here. This function runs automatically. }

// This next section of code needs to be here. Not important as to why.

FORCEINLINE TStatId GetStatId() const { RETURN\_QUICK\_DECLARE\_CYCLE\_STAT(FMyTaskName, STATGROUP\_ThreadPoolAsyncTasks); } } </syntaxhighlight>

The preceding code is valid, although it won't actually perform a task. It is up to you to define what this class actually does.

Also realize that you can and should change the instances of **FMyTaskName** with something unique and meaningful for each Task.

**DoWork()** will execute one time automatically once the task is started. I'll go into a little more detail later.

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

How to Instantiate and Run an Async Task
========================================

Heading back into the .cpp side of things, I'll show you the proper method for instantiating and executing the actual task itself.

<syntaxhighlight lang="cpp"> // Instantiate a copy of the actual task, and queue the task for execution with StartBackgroundTask() (new FAutoDeleteAsyncTask<FMyTaskName>(6,10))->StartBackgroundTask(); </syntaxhighlight>

As soon as the task is Started, it will be whisked away to the default Thread Pool and queued up for execution. Once a thread is available, it will immediately run the DoWork() function until that function is complete. Once that function is complete, the task will either Auto Delete or become Idle, depending on what type of task was used.

The speed of assigning a Task to a queue is remarkably fast. Other forms of thread management, such as FRunnable, tend to have more delays and overhead surrounding them, and are better suited for certain types of continuous operations.

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

[Template:Note](/index.php?title=Template:Note&action=edit&redlink=1 "Template:Note (page does not exist)")

Advanced Topics
===============

Returning Data
--------------

[**Returning Data from AsyncTasks**](/index.php?title=Using_AsyncTasks/Returning_Data "Using AsyncTasks/Returning Data")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Using\_AsyncTasks&oldid=245](https://wiki.unrealengine.com/index.php?title=Using_AsyncTasks&oldid=245)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")