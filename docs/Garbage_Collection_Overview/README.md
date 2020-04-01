 Garbage Collection Overview - Epic Wiki             

 

Garbage Collection Overview
===========================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)") Unreal's game-level memory management system uses reflection to implement garbage collection. Working effectively in Unreal requires some understanding of how these two systems interact.

Contents
--------

*   [1 What is reflection?](#What_is_reflection.3F)
*   [2 Garbage Collection](#Garbage_Collection)
*   [3 Structs vs. Objects](#Structs_vs._Objects)
*   [4 Containers](#Containers)
*   [5 See Also](#See_Also)

What is reflection?
===================

Read this for a great introduction to Unreal's reflection system and using it: [https://www.unrealengine.com/blog/unreal-property-system-reflection](https://www.unrealengine.com/blog/unreal-property-system-reflection)

Reflection allows the engine to determine if objects are still referenced by other objects, making garbage collection a viable strategy for managing memory.

Garbage Collection
==================

One of the most important tasks within a game engine is managing memory. Unreal’s approach to solve this problem is the usage of garbage collection. In this approach, the engine will automatically delete objects when they are no longer needed. An object is no longer needed when it is no longer referenced by any other object. More general information on garbage collection can be found here: [http://en.wikipedia.org/wiki/Garbage\_collection\_(computer\_science)](http://en.wikipedia.org/wiki/Garbage_collection_(computer_science))

Unreal uses the reflection system to drive garbage collection. Because the engine knows about your objects and properties, it can recognize when an object is no longer needed and automatically delete it.

While this automatic memory management does significantly reduce the mental workload to working in the engine, it is important to understand at a high level how it works, as it can only work well when you follow the “rules.” IMPORTANT: There are always exceptions to the rules, but be sure to know what you are doing if you break the rules!

*   Every member of a class should be declared as a UPROPERTY
    *   If an member is left “naked,” unreal will not know about it. So, an object you are pointing at could get deleted out from under you! It is safe to leave value types such as an int or a bool “naked” although they could not be saved, replicated, or appear in the editor.
*   Member pointers should only point at UObject or UObject-derived objects
    *   The garbage collector is only smart enough to recognize relationships to an object, so the object could get deleted out from under your pointer.
*   Any non-UObject pointer must be pointing to something “global” in the engine, or something within its own UObject
    *   The garbage collector could delete the object that owns what you are pointing at.
*   The only container that is safe to have UObject or UObject-derived pointers in is a TArray

NOTE: UObject-derived pointers/objects would be any object, component, or actor.

**Remember, the garbage collector relies on reflection data!**

Structs vs. Objects
===================

Structs are intended to be used as “value” types. They are best used for small bits of data that are to be reused within objects and actors. For example, FVector, FRotator, FQuat. They are not garbage collected, so they must always exist within a UObject.

One advantage of a UStruct is that it is very small. While a UObject must carry book-keeping data in addition to your data, UStructs (technically UScriptStructs) are only as large as the data you put in them. The garabage collector does not need to do as much work to maintain them.

However, UStructs do have limitations. Pointing to another object’s member struct directly is not safe.

UObjects are garbage-collected. While they are heavier, it is generally safe to to point at them. Bear in mind that every UObject is one more thing for the garbage collector to keep track of. Although the engine can handily deal with thousands of objects, this capability should be used carefully. If your project requires thousands of instances of something, and UStructs are acceptable, they will generally be more performant than UObjects.

Containers
==========

For the garbage collector to do its work of determining what is safe to delete, it must traverse every field of every object. While Unreal provides several types of containers (TArray, TMap, …) the garbage collector only considers pointers in TArray

See Also
========

Some more specifics and code examples related to memory management, see [Garbage\_Collection\_&\_Dynamic\_Memory\_Allocation](/index.php?title=Garbage_Collection_%26_Dynamic_Memory_Allocation "Garbage Collection & Dynamic Memory Allocation")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Garbage\_Collection\_Overview&oldid=251](https://wiki.unrealengine.com/index.php?title=Garbage_Collection_Overview&oldid=251)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")