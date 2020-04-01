AI aiming for the lazy - Epic Wiki                     

AI aiming for the lazy
======================

**Rate this Tutorial:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.10

Contents
--------

*   [1 Overview](#Overview)
*   [2 Requirements](#Requirements)
*   [3 Getting Started](#Getting_Started)
    *   [3.1 Setting up character](#Setting_up_character)
    *   [3.2 **Fire** behavior part 1](#Fire_behavior_part_1)
*   [4 C++ Hardcore](#C.2B.2B_Hardcore)
    *   [4.1 Minimal math](#Minimal_math)
    *   [4.2 KINSOL library](#KINSOL_library)
    *   [4.3 Linking libraries to our project](#Linking_libraries_to_our_project)
    *   [4.4 Actuall C++ hardcore](#Actuall_C.2B.2B_hardcore)
*   [5 Tying everything together](#Tying_everything_together)
    *   [5.1 **Fire** behavior part 2](#Fire_behavior_part_2)
*   [6 Further improvements](#Further_improvements)

Overview
--------

You'll learn how to implement basic aiming for your AI characters that do not require lot of math, only basic school knowledge on vectors and movement equations.

I wrote this tutorial with maximal clarity in mind. If you want to see main content, go to [KINSOL library](#KINSOL_library) section.

Names of all entities (assets, variables, components) created during tutorial given in **bold**. Entities from FPS template have their names in _italic_.

Requirements
------------

You should be ready to get your hands dirty with some C++. Of course you'll need Visual Studio.

Though I'll indicate all necessary steps, but since you are here it would be more efficient to know about [Behavior Trees](https://docs.unrealengine.com/latest/INT/Engine/AI/BehaviorTrees/index.html) and [AI controllers](https://docs.unrealengine.com/latest/INT/Engine/AI/BehaviorTrees/QuickStart/6/index.html).

Getting Started
---------------

Create new project (let's call it **AIAiming** hereupon) from Blueprint FPS template. Described here is UE 4.10, adjust values you'll stumble on in this tutorial if your template differs.

### Setting up character

Make new folder **AICharacter** in [Content Browser](https://docs.unrealengine.com/latest/INT/Engine/Content/Browser/index.html). Create three new assets there:

*   Blueprint **Firer** inherited from _Character_
*   Blueprint **FirerController** inherited from _AIController_
*   Behavior Tree **FirerBehavior**

[![Created assets](https://d26ilriwvtzlb.cloudfront.net/9/92/Assets.png)](/File:Assets.png "Created assets")

Open **Firer**.

*   Set _AI Controller Class_ to **FirerController**
*   Select _Mesh (Inherited)_ component
    *   Set _Skeletal Mesh_ to _SK\_Mannequin\_Arms_
    *   Set _Anim Blueprint Class_ to _FirstPerson\_AnimBP_
    *   Set mesh location to (-0.51, -2.6, -155.71) and Z rotation to -10° (same values as in _FirstPersonCharacter_).
*   Add Skeletal Mesh Component **Gun** in Components list, grub it and attach to _Mesh (Inherited)_.

[![Gun Component](https://d26ilriwvtzlb.cloudfront.net/0/00/Gun-component.png)](/File:Gun-component.png "Gun Component")

*   Set Skeletal Mesh for **Gun** to _SK\_FPGun_.
*   Setup following Construction Script (references to components are created by simple drug'n'drop from components list):

[![Firer Construction Script](https://d26ilriwvtzlb.cloudfront.net/4/45/Firer-construction-script.png)](/File:Firer-construction-script.png "Firer Construction Script")

*   Create vector variable **GunOffset** with default value (100, 33, 10) (again copy-paste from _FirstPersonCharacter_)

[![Firer GunOffset variable](https://d26ilriwvtzlb.cloudfront.net/2/23/Firer-gun-offset.png)](/File:Firer-gun-offset.png "Firer GunOffset variable")

Your character should look something like this:

[![Firer blueprint](https://d26ilriwvtzlb.cloudfront.net/8/84/Firer.png)](/File:Firer.png "Firer blueprint")

*   Reproduce following Event Graph:

[![Firer Event Graph](https://d26ilriwvtzlb.cloudfront.net/c/c5/Firer-event-graph.png)](/File:Firer-event-graph.png "Firer Event Graph")

It's almost copy-paste from _FirstPersonCharacter_. We deleted input events, replaced mesh reference, replaced _GetControlRotation_ with _GetActorRotation_ and created custom event (RMB->Add Event->Add Custom Event...) **FireProjectile**.

  
Open **FirerController**

*   Setup following minimal Event Graph:

[![FirerController Event Graph](https://d26ilriwvtzlb.cloudfront.net/1/15/Firer-controller-event-graph.png)](/File:Firer-controller-event-graph.png "FirerController Event Graph")

### **Fire** behavior part 1

Open **FirerBehavior**. Create new Task, rename it to **Fire** and open for editing.

[![Create task](https://d26ilriwvtzlb.cloudfront.net/3/3a/Create-task.png)](/File:Create-task.png "Create task")

Create **Target offset** vector variable. It will specify offset from player character (it's pivot point if to be precise) location to point we want to hit. If for example our player mesh was full-blown humanoid mannequin, we would've liked to hit exactly in the head and **Target offset** would've specified vector from character's location to character mesh's head. Since we only have hands, we make our firer aim exactly at the camera. You can measure offset using ruler (middle mouse button):

[![Ruler tool](https://d26ilriwvtzlb.cloudfront.net/a/aa/Ruler.png)](/File:Ruler.png "Ruler tool")

In our case camera is perfectly aligned to pivot point except for Z coordinate, so **Target offset** will be:

[![TargetOffset variable](https://d26ilriwvtzlb.cloudfront.net/2/2f/Target-offset.png)](/File:Target-offset.png "TargetOffset variable")

Override _Receive Execute_ and reproduce following graph:

[![Partial Event Graph of Fire task](https://d26ilriwvtzlb.cloudfront.net/c/c3/Fire-partial-event-graph.png)](/File:Fire-partial-event-graph.png "Partial Event Graph of Fire task")

It incomplete, but we will return to it when C++ part is ready.

C++ Hardcore
------------

Go to _File_ -> _New C++ Class ..._ and select _Blueprint Function Library_ as parent class. I named it **FiringLibrary** (banal to the end), but it doesn't really matter. Since it's first C++ class in our game, editor will take some time to create, build and open project for Visual Studio. For now just leave it there, we will return to it a bit later.

### Minimal math

So how are we going to aim? Let's remember some school physics. Our target (possible offseted) current location is _**P**_T, and it moves with speed _**V**_T, so in _t_ seconds it will be at

_**P**_T + _**V**_T \* _t_.

(_t_ is a variable, we'll have to compute it). Our projectile in _t_ seconds will be at

_**P**_P + _**V**_P \* _t_ + _**g**_ \* _t_2 / 2

_**P**_P is a location where projectile will be created, _**V**_P - it's speed and _**g**_ - gravity vector ((0, 0, -980) by default in UE4 because all lengths are in centimeters). We want for our projectile to meet target, so their locations should be equal:

_**P**_T + _**V**_T \* _t_ = _**P**_P + _**V**_P \* _t_ + _**g**_ \* _t_2 / 2

or

_**P**_T + _**V**_T \* _t_ - _**P**_P - _**V**_P \* _t_ - _**g**_ \* _t_2 / 2 = _**0**_

It's a system of three nonlinear equations. If our firer stand in one place we have three variables:

1.  time _t_ > 0
2.  \-180 < _yaw_ < 180
3.  \-90 < _pitch_ < 90

So you can go and solve it, arriving at general quartic equation (with sines and cosines!) and feeling the fear from it's [general solution](https://en.wikipedia.org/wiki/Quartic_function#/media/File:Quartic_Formula.svg). You can try different approximations as [this](http://www.gamasutra.com/blogs/KainShin/20090515/83954/Predictive_Aim_Mathematics_for_AI_Targeting.php) guy did, but I'm too lazy for such things and going to make computer solve it for me.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) We don't really care for time _t_, but it's computation is unavoidable consequence of current problem formulation. It's possible to get rid of it, but won't make problem easier.

### KINSOL library

(I describe building process for Windows. Can't help poor souls with MacOS. Smarties with linux should be able to build everything themselves because hey, you've installed linux!)

[KINSOL](https://computation.llnl.gov/casc/sundials/description/description.html#descr_kinsol) "is a solver for nonlinear algebraic systems". It is OSS released under a [BSD license](http://computation.llnl.gov/casc/sundials/download/license.html) which means you only can't call their code yours. [Download](http://computation.llnl.gov/casc/sundials/download/download.php) it (only KINSOL is needed. You will be asked for email but that's only a formality).

Install [CMake](https://cmake.org/download/) (grub simpliest win32 exe installer, no need to go fancy). Make sure you checked the box "Add CMake to the system [PATH](https://en.wikipedia.org/wiki/PATH_(variable)#DOS.2C_OS.2F2.2C_and_Windows)" (for current user would be enough) during installation.

Create folder **C:\\path\\to\\your\\project\\AIAiming\\ThirdParty\\kinsol**. We will install library here.

From archive you've downloaded erlier unpack whole folder **kinsol-_version_** somewhere (precise location doesn't matter, you can delete folder after building). Create **kinsol-build** near it so you have structure:

some folder\\
   kinsol-_version_
   kinsol-build
   

Everything ready, let's build this baby!

*   Run cmd (from Start of Win+R).
*   Enter command **cd "C:\\full\\path\\to\\some foler\\kinsol-build"**
*   Enter command **cmake-gui ..\\kinsol-_version_**
*   Click **Configure** button in appeared window
*   Select _Visual Studio 14 2015 Win64_ from generator list

[![CMake configure](https://d26ilriwvtzlb.cloudfront.net/5/5a/Configure.png)](/File:Configure.png "CMake configure")

*   Do not panic because of all the red
*   _BUILD\_KINSOL_ and _BUILD\_STATIC\_LIBS_ boxes must be checked, every else unchecked.
*   Change _CMAKE\_CONFIGURATION\_TYPES_ value to _Release_
*   Change _CMAKE\_INSTALL\_PREFIX_ to **C:\\path\\to\\your\\project\\AIAiming\\ThirdParty\\kinsol**
*   Change _SUNDIALS\_PRECISION_ to _single_ (double is useless because all computations inside UE use floats)

[![KINSOL build configuration](https://d26ilriwvtzlb.cloudfront.net/d/d8/Kinsol-build-configuration.png)](/File:Kinsol-build-configuration.png "KINSOL build configuration")

*   Hit _Generate_ button and close the window when done
*   There will appear several VS projects in **kinsol-build**, you need to open _sundials_ solution
*   Build _ALL\_BUILD_ project.
*   Build _INSTALL_ project

If all went well built libraries should appear with C++ headers in **C:\\path\\to\\your\\project\\AIAiming\\ThirdParty\\kinsol**.

We don't need **kinsol-build** and **kinsol-_version_** anymore, you can delete them.

### Linking libraries to our project

(Huge gratitude to author of [tutorial](/Linking_Static_Libraries_Using_The_Build_System "Linking Static Libraries Using The Build System") for linking)

Let's return to our game's project in Visual Studio. You can read article mentioned above to understand what's going on or simply open **AIAiming.Build.cs**, add following code to body of **AIAiming** class

    private string ModulePath
    {
        get { return Path.GetDirectoryName(RulesCompiler.GetModuleFilename(this.GetType().Name)); }
    }
 
    private string ThirdPartyPath
    {
        get { return Path.GetFullPath(Path.Combine(ModulePath, "../../ThirdParty/")); }
    }
 
    public bool LoadKinsol(TargetInfo Target)
    {
        bool isLibrarySupported \= false;
 
        if ((Target.Platform \== UnrealTargetPlatform.Win64) || (Target.Platform \== UnrealTargetPlatform.Win32))
        {
            isLibrarySupported \= true;
            string LibrariesPath \= Path.Combine(ThirdPartyPath, "kinsol", "lib");
 
            PublicAdditionalLibraries.Add(Path.Combine(LibrariesPath, "sundials\_kinsol.lib"));
            PublicAdditionalLibraries.Add(Path.Combine(LibrariesPath, "sundials\_nvecserial.lib"));
        }
 
        if (isLibrarySupported)
        {
            // Include path
            PublicIncludePaths.Add(Path.Combine(ThirdPartyPath, "kinsol", "include"));
        }
 
        Definitions.Add(string.Format("WITH\_KINSOL\_BINDING={0}", isLibrarySupported ? 1 : 0));
 
        return isLibrarySupported;
    }

and following line to the end of **AIAiming(TargetInfo Target)** constructor

        LoadKinsol(Target);

and following

using System.IO;

after

using UnrealBuildTool;

This code will tell the engine to link libraries during compilation.

![Note](https://d26ilriwvtzlb.cloudfront.net/a/a5/Icon_template_note1.png) Libraries built this way will only work for x64 builds of your game, but if you care it's likely you already know how to fix it.

### Actuall C++ hardcore

OK. This time for real. Open header of your blueprint library and add following function declaration to your class:

UFUNCTION(BlueprintCallable, Category \= "Ballistics")
static bool ComputeFiringRotation(const AActor\* ''t''arget, const FVector& targetOffset, const AActor\* firer, const FVector& gunOffset, float projectileSpeed, FRotator& firingRotation);

This function will try to solve equations. It will pass computed rotation to blueprint in **firingRotation** reference and boolean return value will indicate if computation was successful (it may be not).

Switch to **FiringLibrary.cpp**.

*   Add necessary includes:

#include <kinsol/kinsol.h>
#include <kinsol/kinsol\_dense.h>
#include <nvector/nvector\_serial.h>
#include <sundials/sundials<sub>T</sub>ypes.h>
#include <sundials/sundials\_math.h>

*   Declare struct that will keep necessary data to compute equations

struct FiringData {
 
    FiringData(const AActor\* ''t''arget,
               const AActor\* firer, const FVector& gunOffset,
               float projectileSpeed)
        : targetLocation(target\-\>GetActorLocation())
        , targetVelocity(target\-\>GetVelocity())
        , firerLocation(firer\-\>GetActorLocation())
        , gunOffset(gunOffset)
        , projectileSpeed(projectileSpeed)
        , g(FVector(0, 0, firer\-\>GetWorld()\-\>GetWorldSettings()\-\>GetGravityZ()))
    {}
 
    FVector targetLocation;
    FVector targetVelocity;
    FVector firerLocation;
    FVector gunOffset;
    float projectileSpeed;
    FVector g;
};

*   Declare function that computes our equations (it will be called by KINSOL)

// x are current values of variables and library expect us to put equations' values in f
// userData is arbitrary data that we want to use in computations. 
// We have to specify it to library by calling KINSetUserData()
// In our case we specify userData to point at FiringData struct.
int F(N\_Vector x, N\_Vector f, void\* userData) {
    float t \= NV\_Ith\_S(x, 0);
    float yaw \= NV\_Ith\_S(x, 1);
    float pitch \= NV\_Ith\_S(x, 2);
    auto rotator \= FRotator(pitch, yaw, 0);
 
    auto firingData \= (FiringData\*)userData;
 
 
    auto p1 \= firingData\-\>targetLocation + firingData\-\>targetVelocity\*t;
 
    auto projectileStartingLocation \= firingData\-\>firerLocation + rotator.RotateVector(firingData\-\>gunOffset);
    auto projectileVelocity \= rotator.RotateVector(FVector::ForwardVector \* firingData\-\>projectileSpeed);
    auto p2 \= projectileStartingLocation + velocity \* ''t'' + firingData\-\>g \* ''t'' \* ''t'' / 2;
 
    auto eq \= p1 \- p2;
 
    NV\_Ith\_S(f, 0) \= eq.X;
    NV\_Ith\_S(f, 1) \= eq.Y;
    NV\_Ith\_S(f, 2) \= eq.Z;
 
    return 0;
}

**p1** is expected target location, **p2** is expected projectile position. Computation of **projectileStartingLocation** and **projectileVelocity** follows from the way we spawn projectile. They are virtually the same as ones from _Spawn projectile_ box in **Firer**.

Returning 0 indicates that computations went smooth. If something breaks during execution of your variant of function return non-zero value.

Finally all preparations done and we can write out the function we are here for:

bool UFiringLibrary::ComputeFiringRotation(const AActor\* ''t''arget, const FVector& targetOffset, 
                 const AActor\* firer, const FVector& gunOffset, 
                 float projectileSpeed, FRotator& firingRotation) {
 
    // Number of equations
    const int N \= 3;
 
    // x is our initial guess on variables of equation.
    auto x \= N\_VNew\_Serial(N);
    if (x \== nullptr) return false;
    // I guessed projectile will hit target after one second.
    NV\_Ith\_S(x, 0) \= 1; 
    // Guess for rotation is simply current firer rotation.
    NV\_Ith\_S(x, 1) \= firer\-\>GetActorRotation().Yaw;
    NV\_Ith\_S(x, 2) \= firer\-\>GetActorRotation().Pitch;
 
    // Scale of equations' variables. Scaling them may help with speed of solving,
    // but find solutions far from initial values.
    auto scale \= N\_VNew\_Serial(N);
    if (scale \== nullptr) return false;
    N\_VConst\_Serial(1, scale); // no scaling
 
    // Constraints on equations' variables
    auto constraints \= N\_VNew\_Serial(N);
    if (constraints \== nullptr) return false;
 
    // 0.0 means no constraints on variable
    // -1.0, 1.0 means <= 0 or >= 0 constraints correspondingly
    // -2.0, 2.0 means < 0 or > 0 constraints correspondingly
    NV\_Ith\_S(constraints, 0) \= 2.0f; // t > 0
    NV\_Ith\_S(constraints, 1) \= 0; // no constraints on yaw
    NV\_Ith\_S(constraints, 2) \= 0; // no constraints on pitch
 
    // handler for KINSOL library
    auto kinsolMemory \= KINCreate();
    if (kinsolMemory \== nullptr) return false;
 
    // setting pointer to userData for use in our F function
    FiringData firingData(target, targetOffset, firer, gunOffset, projectileSpeed);
    int flag \= KINSetUserData(kinsolMemory, &firingData);
    if (flag < 0) return false;
 
    // setting up constraints
    flag \= KINSetConstraints(kinsolMemory, constraints);
    if (flag < 0) return false;
 
    // We want our equations be this (1.0f) close to zeros. 1 cm is pretty good precision.
    flag \= KINSetFuncNormTol(kinsolMemory, 1.0f);
    if (flag < 0) return false;
    // Stop if difference in consecutive values of variables this (1e-5f) small.
    flag \= KINSetScaledStepTol(kinsolMemory, 1e\-5f);
    if (flag < 0) return false;
 
    // specifying our equations' function
    flag \= KINInit(kinsolMemory, F, x);
    if (flag < 0) return false;
 
    // initializing the simplest available solver
    flag \= KINDense(kinsolMemory, N);
    if (flag < 0) return false;
 
    // little magic
    flag \= KINSetMaxSetupCalls(kinsolMemory, 1);
    if (flag < 0) return false;
 
    // actually solving equations
    flag \= KINSol(kinsolMemory, x, KIN\_LINESEARCH, scale, scale);
    if (flag < 0) return false;
 
    // getting solution rotations
    firingRotation \= FRotator(NV\_Ith\_S(x, 2), NV\_Ith\_S(x, 1), 0);
 
    bool success \= false;
    switch (flag)
    {
    case KIN\_SUCCESS:
    case KIN\_INITIAL\_GUESS\_OK:
        // equations were successfully solved
        success \= true;
        break;
    case KIN\_STEP\_LT\_STPTOL:
        // algorithm finished correctly but no good solution were found
        break;
    default:
 
        break;
    }
 
    // releasing memory
    N\_VDestroy\_Serial(x);
    N\_VDestroy\_Serial(scale);
    N\_VDestroy\_Serial(constraints);
    KINFree(&kinsolMemory);
 
    return success;
}

Build project. We're done with code part.

Tying everything together
-------------------------

### **Fire** behavior part 2

Complete our **Fire** task Event Graph:

[![Full Event Graph of Fire task](https://d26ilriwvtzlb.cloudfront.net/c/c6/Fire-full-event-graph.png)](/File:Fire-full-event-graph.png "Full Event Graph of Fire task")

Functionality is pretty straightforward - if necessary rotation was successfully computed we rotate our firer to it and emitting **FireProjectile** event. Projectile speed is taken from _FirstPersonProjectile_ blueprint.

At last create following structure in **FirerBehavior** Behavior Tree:

[![Firer Behavior Tree](https://d26ilriwvtzlb.cloudfront.net/c/c2/Firer-behavior-tree.png)](/File:Firer-behavior-tree.png "Firer Behavior Tree")

You can now place our **Firer** character somewhere on the map and try out it's aiming:

[![Aiming](https://d26ilriwvtzlb.cloudfront.net/0/05/Demonstration.png)](/File:Demonstration.png "Aiming")

Further improvements
--------------------

The very first enhancement you should think about is gradual rotation. Right now our firer changes it's rotation instantly. But then you have to consider time required to rotate to given angles in equations.

After it you'll probably like to move your firer around, but then you'll have more variables than equations and it will no longer be system of equations solving problem, but an [optimization](https://en.wikipedia.org/wiki/Mathematical_optimization) problem. But you're lucky because [there are](https://en.wikipedia.org/wiki/Comparison_of_optimization_software) a lot more optimization libraries than nonlinear equations solvers.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=AI\_aiming\_for\_the\_lazy&oldid=16988](https://wiki.unrealengine.com/index.php?title=AI_aiming_for_the_lazy&oldid=16988)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)