PhysX Source Guide - Epic Wiki                    

PhysX Source Guide
==================

UE4 uses Nvidia PhysX and APEX as its underlying physics engine. PhysX takes care of core functionality like rigid body simulation, while APEX takes care of destruction and clothing. The source code is fully available for both which makes debugging and modifying behavior easy. To generate debug symbols you will need to compile.

Compiling PhysX
---------------

The PhysX visual studio solution can be found here, relative to your UE install:

Engine\\Source\\ThirdParty\\PhysX\\PhysX-3.3\\Source\\compiler\\vc12win64\\PhysX.sln

UE4 uses the profile PhysX binaries for all configurations by default so you’ll want to change the configuration to profile and compile the solution by pressing Build -> Build Solution

Compiling APEX
--------------

The APEX visual studio solution can be found here:

Engine\\Source\\ThirdParty\\PhysX\\APEX-1.3\\compiler\\vc12win64-PhysX\_3.3\\APEX.sln

Again you’ll want to set the configuration to profile and press Build -> Build Solution. Note that APEX relies on PhysX so you should compile PhysX first.

Connecting to UE4
-----------------

UE4 will automatically find the appropriate binaries when it compiles the engine module. You can either do a full recompile, or simply make a trivial modification (enter a few new lines) to this file:

Engine\\Source\\Runtime\\Engine\\Private\\PhysicsEngine\\PhysXLibs.cpp

Retrieved from "[https://wiki.unrealengine.com/index.php?title=PhysX\_Source\_Guide&oldid=13825](https://wiki.unrealengine.com/index.php?title=PhysX_Source_Guide&oldid=13825)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)