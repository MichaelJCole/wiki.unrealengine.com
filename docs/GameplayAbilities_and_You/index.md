 GameplayAbilities and You - Epic Wiki             

 

GameplayAbilities and You
=========================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

This guide is based on [a wonderful post by KJZ in the Unreal Engine forums](https://forums.unrealengine.com/showthread.php?137352-GameplayAbilities-and-you). It is being placed here in the Wiki to allow a wider audience to find and view it easily, as well as to allow it to be organized more easily.

Contents
--------

*   [1 Introduction](#Introduction)
*   [2 Getting Started](#Getting_Started)
    *   [2.1 Setting up the Project](#Setting_up_the_Project)
    *   [2.2 Setting up our Character](#Setting_up_our_Character)
    *   [2.3 Binding to Character Input](#Binding_to_Character_Input)
    *   [2.4 Giving the Character an Ability](#Giving_the_Character_an_Ability)
*   [3 The Essentials](#The_Essentials)
    *   [3.1 GameplayAbilities](#GameplayAbilities)
        *   [3.1.1 Overview](#Overview)
        *   [3.1.2 Notable Variables](#Notable_Variables)
    *   [3.2 GameplayTasks](#GameplayTasks)
        *   [3.2.1 Overview](#Overview_2)
        *   [3.2.2 GameplayTasks Example](#GameplayTasks_Example)
    *   [3.3 GameplayEffects](#GameplayEffects)
        *   [3.3.1 Overview](#Overview_3)
        *   [3.3.2 Notable Variables](#Notable_Variables_2)
        *   [3.3.3 GameplayEffects Example](#GameplayEffects_Example)
    *   [3.4 AttributeSet](#AttributeSet)
        *   [3.4.1 Using AttributeSets](#Using_AttributeSets)
        *   [3.4.2 Data-driven Initialization of Attributes](#Data-driven_Initialization_of_Attributes)
        *   [3.4.3 Replication](#Replication)
*   [4 The More Advanced Nitty Gritty](#The_More_Advanced_Nitty_Gritty)
    *   [4.1 GameplayEffectExectutionCalculation](#GameplayEffectExectutionCalculation)
    *   [4.2 Gameplay Events](#Gameplay_Events)
    *   [4.3 Targeting](#Targeting)
        *   [4.3.1 Target Actors](#Target_Actors)
*   [5 Conclusion](#Conclusion)
*   [6 Common Issues](#Common_Issues)

Introduction
------------

_So, what's a GameplayAbility?_

Basically, they're like the abilities you have in Dota or equivalent games. You can cast a fireball, and this fireball hits a player, explodes (doing a set amount of damage), and sets everyone in the radius of the explosion on fire (doing damage over time). Meanwhile, the player who cast the fireball loses some mana and is put on cooldown.

You could use Epic's GameplayAbility plugin to do all of those things. The module is hard to wrap your head around, but once you learn how powerful they can be and how to properly make use of them, they can make your life much, much easier.

_But why use this over rolling your own system?_

GameplayAbilities can come in handy if your game is in need of a powerful skill, buff and attribute system that is both easy to extend and crazy-efficient to replicate. This can do wonders for people working on a multiplayer RPG with a lot of skills/classes or perhaps even a MOBA, but you can use this system for pretty much any game you want. The main problem is that it isn't the easiest to comprehend, quite big and may get a little in your way the further you stray too far away from this multiplayer RPG ideal, so not every game will get the same mileage out of it.

_Well, that sounds like a dream, but where do I get it?_

Well, first of all, GameplayAbilities is a code module that used to be integrated into UE4's source, but since this current version (4.15, that is, people from the future) has been moved into a separate plugin that is delivered alongside the Unreal Engine, so that it may not take away space in your games if they do not make use of the system. This system does not actually originate as a built-in engine feature, but has, in fact, been kindly left in there from the developers of Paragon and Fortnite for third parties to enjoy. Unfortunately, due to these unique circumstances, the module as a whole is quite messy, poorly _(read: barely at all, your best bet are code comments and even those are only there like half the time)_ documented, and rarely updated and cleaned up.

It is also not 100% exposed to blueprints, partially, but not entirely, due to a lot of the system abusing a lot of engine trickery and magic to work as well as they do, so if you never worked with C++ in the context of UE4, you may want to turn back and maybe do a little tutorial on that now, because this tutorial will make for a poor first learning experience.

In other words, it is a total flippin' pain in the buttocks to wrap your head around, but that's where this guide comes in to help ya. [Epic Developer Dave Ratti has an example GitHub project](https://github.com/daveratti/GameplayAbilitiesSample) which goes through some basic examples to get you started, but ignores the fine lines and goes for broad strokes. The project itself has been pretty hidden, however, and (at the time) doesn't really show up on Google or any real search about the GameplayAbilities plugin, so it hasn't been as helpful as a full-fledged guide. Moreover, now that GameplayTags are properly integrated into the editor by default (a system GameplayAbilities itself uses at every corner of the way, acting as GameplayAbilities' backbone), setup has never been any easier!

With all that said, let's get started, finally.

Getting Started
---------------

### Setting up the Project

So, first of all, let us create an all-new C++ third person project, not just because I want you to properly understand the specifics of enabling the system for your own use, but also because I want to start on a clean slate so that you may not be confused by assets which you do not have on hand.

[![GameplayAbilities-Project-Creation.png](https://d3ar1piqh1oeli.cloudfront.net/d/d9/GameplayAbilities-Project-Creation.png/940px-GameplayAbilities-Project-Creation.png)](/index.php?title=File:GameplayAbilities-Project-Creation.png)

This should be a fairly straightforward and obvious step to anyone that has ever created a UE4 c++ project before. I'm calling it `GameplayAbilitiesTut`, but you may call it as you'd like, really, as long as you pay attention and replace my project's name with yours while coding and understanding. Alright, we're here. Good old third person template, such a familiar environment, and so useful for tutorials! We want to open the plugin menu, accessed through the Settings tab.

[![Enabling-Plugins.png](https://d3ar1piqh1oeli.cloudfront.net/f/ff/Enabling-Plugins.png/940px-Enabling-Plugins.png)](/index.php?title=File:Enabling-Plugins.png)

We find GameplayAbilities in the Gameplay category. Enable it. Do not be scared off by the big scary "\[UNSUPPORTED\]" in the description or the prompt that asks you if you're sure. You know darn well you're sure! You must now restart the editor to fully enable the plugin. It contains a few menus and a new blueprint type to select from the new asset-menu, but it won't load those until the next restart.

After you restart, you may or may not notice a few new things: A new blueprint type called "Gameplay Ability Blueprint" when you press right-click in the content browser to create a new blueprint and a new window in the window menu called "GameplayCue Editor".

[![GameplayCue-Editor.png](https://d3ar1piqh1oeli.cloudfront.net/a/a5/GameplayCue-Editor.png/940px-GameplayCue-Editor.png)](/index.php?title=File:GameplayCue-Editor.png)

[![GameplayAbility-Blueprint.png](https://d3ar1piqh1oeli.cloudfront.net/0/03/GameplayAbility-Blueprint.png/940px-GameplayAbility-Blueprint.png)](/index.php?title=File:GameplayAbility-Blueprint.png)

We don't go into specifics with these just yet, but we do want to create a Gameplay Ability Blueprint, mostly because it's pretty much just a generic blueprint for abilities, and we will need one to test our `AbilitySystemComponent` later.

Select "GameplayAbility" as your blueprint's parent, name it `Use_Spell_1`, open the blueprint and just link a Print String node to the `ActivateAbility` event. Now you know when your `AbilitySystem` successfully calls your ability, because then a reassuring light-blue "Hello." will show on the screen. Self-explanatory, really.

### Setting up our Character

Alright, I hope you got your Visual Studio ready already, it's time for some nitty gritty code. We want to give our character an ability component to use.

... well, not quite, anyway. We need to tell our compiler that we want to use the GameplayAbilities module first. Go into your project's `Build.cs` file(in my case it's `GameplayAbilitiesTut.Build.cs`) and change this

<syntaxhighlight lang="cpp">PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "HeadMountedDisplay" });</syntaxhighlight>

to this

<syntaxhighlight lang="cpp">PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "HeadMountedDisplay", "GameplayAbilities" });</syntaxhighlight>

Basically, we add "GameplayAbilities" to the list. Don't worry about getting it wrong, your compiler will immediately start nagging if it can't find the module with the name you typed in. Adding the module name into this list assures that the module will be properly linked to our project. Without it our compiler would throw out a bunch of confusing external linker errors each time we were to include a header from this module into our project's files.

Now, open your project's C++ character. This will be `GameplayAbilitiesTutCharacter` for me. Go into the class header and declare a new pointer to a `UAbilitySystemComponent` right below your other component pointers. You should also give it a `UPROPERTY` macro. It's okay to copy and paste the `UPROPERTY` from your camera components, but you should probably change the category to something like `"Abilities"` for clarity reasons. It should look a little like this.

<syntaxhighlight lang="cpp">/\*\* Camera boom positioning the camera behind the character \*/

UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Camera, meta = (AllowPrivateAccess = "true")) class USpringArmComponent\* CameraBoom;

/\*\* Follow camera \*/ UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Camera, meta = (AllowPrivateAccess = "true")) class UCameraComponent\* FollowCamera;

/\*\* Our ability system \*/ UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = Abilities, meta = (AllowPrivateAccess = "true")) class UAbilitySystemComponent\* AbilitySystem;</syntaxhighlight>

What is also extremely important, so we don't get into trouble later down the line, is to make it so that our character implements the `IAbilitySystemInterface`. The guide assumes basic programming knowledge, you should know about what an interface does, so I won't get too much into detail, but it allows us to define a pseudo-parent of sorts that defines functions we have to override. This interface here gives other actors an easy way to both know we have an ability system, and a way to get it without doing something dumb and inefficient like iterating through our components for an ability system. Many features will not run properly without this interface implemented. Our code until now would run fine without it, but you will head into trouble once we're done with our initial setup and want to throw buffs and similar things on our character.

<syntaxhighlight lang="cpp">#include "AbilitySystemInterface.h" //We add this include

UCLASS(config=Game) class AGameplayAbilitiesTutCharacter : public ACharacter, public IAbilitySystemInterface //We add this parent. {

UAbilitySystemComponent\* GetAbilitySystemComponent() const override //We add this function, overriding it from IAbilitySystemInterface. { return AbilitySystem; };</syntaxhighlight>

Further, we go into our cpp file and go to the constructor of your character. For me that is `GameplayAbilitiesTutCharacter.cpp`. We need to actually create the component, and have our pointer point to it. As you will actually create an object of type `UAbilitySystemComponent` now, you must include `"AbilitySystemComponent.h"` in your cpp file. Top of the file up to constructor should look a little like this now.

<syntaxhighlight lang="cpp">// Copyright 1998-2017 Epic Games, Inc. All Rights Reserved.

1.  include "GameplayAbilitiesTut.h"
2.  include "Kismet/HeadMountedDisplayFunctionLibrary.h"
3.  include "GameplayAbilitiesTutCharacter.h"
4.  include "AbilitySystemComponent.h"

////////////////////////////////////////////////////////////////////////// // AGameplayAbilitiesTutCharacter

AGameplayAbilitiesTutCharacter::AGameplayAbilitiesTutCharacter() { // Set size for collision capsule GetCapsuleComponent()->InitCapsuleSize(42.f, 96.0f);

// set our turn rates for input BaseTurnRate = 45.f; BaseLookUpRate = 45.f;

// Don't rotate when the controller rotates. Let that just affect the camera. bUseControllerRotationPitch = false; bUseControllerRotationYaw = false; bUseControllerRotationRoll = false;

// Configure character movement GetCharacterMovement()->bOrientRotationToMovement = true; // Character moves in the direction of input... GetCharacterMovement()->RotationRate = FRotator(0.0f, 540.0f, 0.0f); // ...at this rotation rate GetCharacterMovement()->JumpZVelocity = 600.f; GetCharacterMovement()->AirControl = 0.2f;

// Create a camera boom (pulls in towards the player if there is a collision) CameraBoom = CreateDefaultSubobject<USpringArmComponent>(TEXT("CameraBoom")); CameraBoom->SetupAttachment(RootComponent); CameraBoom->TargetArmLength = 300.0f; // The camera follows at this distance behind the character CameraBoom->bUsePawnControlRotation = true; // Rotate the arm based on the controller

// Create a follow camera FollowCamera = CreateDefaultSubobject<UCameraComponent>(TEXT("FollowCamera")); FollowCamera->SetupAttachment(CameraBoom, USpringArmComponent::SocketName); // Attach the camera to the end of the boom and let the boom adjust to match the controller orientation FollowCamera->bUsePawnControlRotation = false; // Camera does not rotate relative to arm

// Our ability system component. AbilitySystem = CreateDefaultSubobject<UAbilitySystemComponent>(TEXT("AbilitySystem"));

// Note: The skeletal mesh and anim blueprint references on the Mesh component (inherited from Character) // are set in the derived blueprint asset named MyCharacter (to avoid direct content references in C++) }</syntaxhighlight>

You may try to compile if you are unsure whether you did everything the right way.

Once you have compiled, you can open your character blueprint(which inherits from your C++ character) and lo and behold, right under the character's movement component you should see an `AbilitySystemComponent`.

[![AbilitySystemComponent-Added.png](https://d3ar1piqh1oeli.cloudfront.net/e/e8/AbilitySystemComponent-Added.png/940px-AbilitySystemComponent-Added.png)](/index.php?title=File:AbilitySystemComponent-Added.png)

Alright, well... what now? The blueprint menu for the component is not helpful at all, and none of the nodes you get by dragging off AbilitySystem are particularly useful, either. There's these "Try Activate Ability" nodes, but you may find out that these things don't do anything right now. That's because the ability system doesn't have any abilities to activate yet, nor does it have any inputs assigned to them, anyway, so trying to activate an ability you do not have is, obviously, a quite useless effort. We will work on fixing both things. You must do both things in C++.

### Binding to Character Input

First of all, we will bind our ability system to our character's input, because it's the slightly more complicated issue and it's actually pretty interesting on how you do it. So first of all, go back to your character's cpp file, and go to the `SetupPlayerInputComponent` function. It's the one responsible for binding your character's inputs to the player controlling it, and takes a `UInputComponent` as parameter. This is important, we need it to bind our ability system to it. We want to call `AbilitySystem->BindAbilityActivationToInputComponent` within the `SetupPlayerInputComponent`. It takes two parameters: The UInputComponent pointer at hand and a struct called `FGameplayAbiliyInputBinds`. _**This is not a typo!**_ It is not called **FGameplayAbilityInputBinds**, but **FGameplayAbiliyInputBinds**!

The constructor for `FGameplayAbiliyInputBinds` takes at least 3 parameters: The first two are strings, and represent the input names that will be used to define "Confirm" and "Cancel"-input commands. You do not necessarily need these depending on your game, but abilities can be set up to listen to these while they're active, and targeting actors (basically, actors that return an ability viable targets/locations to aim at for an ability, if an ability requests one) will use these too, so generally it can't hurt to have these even if you will never use them. The third parameter is the name of an arbitrary UEnum of all things. This is one of the witchcraft-ier aspects of the system: The ability system component will look into the enum whose name you've given and will map its ability slots to the names of the elements contained within the enum. This probably sounds way complicated from the way I'm describing this, but it's actually quite simple. This is an input enum lifted from my own project:

<syntaxhighlight lang="cpp">//Example for an enum the FGameplayAbiliyInputBinds may use to map input to ability slots.

//It's very important that this enum is UENUM, because the code will look for UENUM by the given name and crash if the UENUM can't be found. BlueprintType is there so we can use these in blueprints, too. Just in case. Can be neat to define ability packages. UENUM(BlueprintType) enum class AbilityInput : uint8 { UseAbility1 UMETA(DisplayName = "Use Spell 1"), //This maps the first ability(input ID should be 0 in int) to the action mapping(which you define in the project settings) by the name of "UseAbility1". "Use Spell 1" is the blueprint name of the element. UseAbility2 UMETA(DisplayName = "Use Spell 2"), //Maps ability 2(input ID 1) to action mapping UseAbility2. "Use Spell 2" is mostly used for when the enum is a blueprint variable. UseAbility3 UMETA(DisplayName = "Use Spell 3"), UseAbility4 UMETA(DisplayName = "Use Spell 4"), WeaponAbility UMETA(DisplayName = "Use Weapon"), //This finally maps the fifth ability(here designated to be your weaponability, or auto-attack, or whatever) to action mapping "WeaponAbility".

       //You may also do something like define an enum element name that is not actually mapped to an input, for example if you have a passive ability that isn't supposed to have an input. This isn't usually necessary though as you usually grant abilities via input ID,
       //which can be negative while enums cannot. In fact, a constant called "INDEX\_NONE" exists for the exact purpose of rendering an input as unavailable, and it's simply defined as -1.
       //Because abilities are granted by input ID, which is an int, you may use enum elements to describe the ID anyway however, because enums are fancily dressed up ints.

};</syntaxhighlight>

Basically, this means we need to define an enum, too. Let's just do it in our `GameplayAbilitiesTutCharacter`'s header. You may copy-paste this enum here if you wish, (and this tutorial will do just that), even if 5 slots may be a little overkill for the purpose of example. Finally, our function should look something like this:

<syntaxhighlight lang="cpp">AbilitySystem->BindAbilityActivationToInputComponent(PlayerInputComponent, FGameplayAbiliyInputBinds("ConfirmInput", "CancelInput", "AbilityInput"));</syntaxhighlight>

Place this code at the end of your `SetupPlayerInputComponent` function, and you should be gravy. You have successfully bound your ability system's ability activation to player input!

### Giving the Character an Ability

The final step of our setup is to finally give the character an ability of choice. For simplicity's sake we will only give him one on the action mapping "UseAbility1" and just give the actor a variable that defines which ability to put there, but the same principles for granting one ability are applicable for multiple ones. We will make it blueprint-editable too so we can easily change the ability we want to test later down the line.

Our variable will be a `TSubclassOf<UGameplayAbility>`, because we get all relevant info from the class alone. In fact, GameplayAbilities can be set up to only instance per activation or not to instance at all even, so giving an instance we can freely change beforehand would be a weird idea, anyway.

<syntaxhighlight lang="cpp">UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Abilities)

TSubclassOf<class UGameplayAbility> Ability;</syntaxhighlight>

In `BeginPlay`, we will call AbilitySystem's `GiveAbility` function. We actually wrap this in an if-statement that first checks if we are authority. If a client tries to give himself an ability, an assert is violated and the game goes to crash and burn, taking the editor with it. You've been warned. Only give abilities on the server... or else! We'll also need to check if Ability is valid, and not NULL/nullptr.

`GiveAbility` requests an `FGameplayAbilitySpec` as parameters. An `FGameplayAbilitySpec` is the data surrounding a `GameplayAbility`, notably which level (the system has built-in support for a level variable, quite good for RPGs/MOBAs as mentioned) and which input ID it is.

`FGameplayAbilitySpec` requests a `GameplayAbility` object as parameter, but that's not a problem; we can just give the Ability class' default object as parameter. There is very little reason to use anything other than the default object of a `GameplayAbility` class as far as I've understood it from going through the source. Finally, while on the topic of `BeginPlay`, we should also call `AbilitySystem->InitAbilityActorInfo`. It tells the AbilitySystem what its **Owner** (the actor responsible for the AbilitySystem) and **Avatar** (the actor through which the AbilitySystem acts, uses Abilities from etc.) is. In our case our character is both. Our final `BeginPlay` should look something like this:

<syntaxhighlight lang="cpp">void AGameplayAbilitiesTutCharacter::BeginPlay()

{

  Super::BeginPlay();
  if(AbilitySystem)
  {
     if (HasAuthority() && Ability)
     {

AbilitySystem->GiveAbility(FGameplayAbilitySpec(Ability.GetDefaultObject(), 1, 0));

     }
     AbilitySystem->InitAbilityActorInfo(this, this);
  }

}</syntaxhighlight>

  
You also need to make sure that the AbilitySystemComponent's ActorInfo struct is being updated each time the controller changes. On the surface much of the system will work without that, but in a multiplayer enviroment especially(where pawns may be spawned before the client controller possesses them) you will experience crashes and behaviour that can be difficult to debug should you not properly set the ActorInfo up. Override your character's/pawn's OnPossessed function like so:

<syntaxhighlight lang="cpp">void AGameplayAbilitiesTutCharacter::PossessedBy(AController \* NewController)

{

   Super::PossessedBy(NewController);

   AbilitySystem->RefreshAbilityActorInfo();

}</syntaxhighlight>

  
Compile, add an action input mapping in your project settings called "UseAbility1" and start the game. If the game doesn't crash and the mapped input produces a plain old "Hello.", then congratulations! You have successfully set up your gameplay ability system for this character.

Note that if it crashes and spits out an error message talking about `AbilityActorInfo` being invalid, try adding this code just before the `HasAuthority()` check and seeing if it fixes the problem:

<syntaxhighlight lang="cpp">FGameplayAbilityActorInfo\* actorInfo = new FGameplayAbilityActorInfo();

actorInfo->InitFromActor(this, this, AbilitySystem); AbilitySystem->AbilityActorInfo = TSharedPtr<FGameplayAbilityActorInfo>(actorInfo);</syntaxhighlight>

That was the worst and dryest part, so you are allowed to be proud of yourself! We can finally move on to the actually exciting part of using the system.

The Essentials
--------------

Alright, you should now have at least one functional GameplayAbility bound to your character, which is pretty cool. However, we haven't even gotten into what GameplayAbilities can do yet. Heck, we haven't gotten to what _**anything at all**_ does yet, because setup took so long. However, GameplayAbilities are a great place to start general comprehension.

### GameplayAbilities

#### Overview

**GameplayAbilities** are the stupidly flexible implementation of spells, skills and such in this system. Not only do they have easy support for such things as cooldown, costs and other common RPG-ish stock spell features, but they are set up in such a way that you may call so-called **Ability Tasks** within them. These are specialized asynchronous tasks that you may request to run during an ability's active period, returning to the blueprint graph once the task has completed its task, or until a certain event or passage of time prompts the task to call back.

They're in a sense very much like your run-of-the-mill Blueprint Delay node, but they can do oh-so-much-more than just waiting a certain amount of time to continue. They may, for instance, wait for an input, or for a collision/overlap, or for a montage to finish playing(going to a different execution path when ending normally or when interrupted), they can even wait for client and server to sync up to a certain point. This means that an ability must not immediately be done after the initial activation frame, but may consist of one to several different time-consuming processes before finally being finished.

Wait for an animation to finish playing before firing a fireball? Easy. Charge the fireball by holding down the button mapped to the ability, releasing the button to fire the fireball? Easy. Heck, you could probably program an ability that forces you to play DDR with your fingers before shooting a fireball, with the fireball getting stronger with godlike finger dancing skills, if you really wanted to.

This comes at a small price though, because an ability activation always needs to directly or indirectly call `EndAbility` to announce that its Activation has ended. By default you will be unable to trigger an activation past the first one (though there is an option to be able to reset a running ability when pressing the activate-button), and it will be considered permanently active for all intents and purposes. This may mess with other abilities or aspects of the system. You must also manually call "Commit Ability" within the ability activation, which checks for and applies the likes of cost and cooldowns.

An ability is also able to control its own instancing state, and each ability may independently choose whether they do not want to be **instanced** (no ability tasks, no personal state and variables and some other limited functionality, but ridiculously cheap so preferable if you can get away with it), **instanced on activation** (personal state limited to a per-activation basis, variables and such can be replicated but it is not recommended) or **instanced per ability owner** (most expensive, but variables can easily be replicated, state can be carried across activations \[for example, a fireball that gets stronger with each use would be possible without permanently considering the ability active\] and most functions are intact).

Finally, abilities can be useful for certain passive effects too, as abilities can listen for tags being granted upon their owners or `Gameplay Events` firing in the owning `Ability System Component` (more on that another time). Buffs that respond to certain outside influences may implement themselves by granting the affected actor with a hidden passive ability to listen for these, for example.

As such, GameplayAbilities are extremely useful, and you'd do good to learn how to best make use of them.

#### Notable Variables

GameplayAbilities possess the following notable Class Default variables:

*   **Ability Tags**: Gameplay Tags the ability uses as flags, so to speak. Gameplay Tags are pretty much a global list of names and terms that can be used by assets as generic names and labels. In the context of GameplayAbilities these can be useful by having a GameplayAbility use an **Ability Task** to listen for the activation of a different ability with specified tag as ability tag.
    *   Alternatively, an ability may cancel other currently active abilities that are described to have ability tag **X**, or it may be blocked from activating while ability with ability tag **X** is active. These are easy ways to set up global behaviour and interaction between different abilities. Perhaps only one transformation can be active at a time? Perhaps activating fire magic while water magic is active cancels one or both? It's up to you and what type of game you want to make. There are no strict rules.
*   **Cancel Ability with Tags**: Abilities with these tags will be cancelled upon activation of this ability.
*   **Block Ability with Tags**: Abilities with these tags will be blocked while this ability here is active.
*   **Activation Owned Tags**: The Owner of the ability gets these tags while the ability is active. This is something different than **Ability Tags**, because the owner gets these here. `GameplayEffects` (buffs) may interact with them this way, and other abilities can, as already mentioned, listen for a tag to be granted to its owner to active. This has a lot of uses if you get creative with it, you could make the user of the ability immune to damage while they are casting this, etc.
*   **Activation Required Tags**: The Owner has to have these tags _**BEFOREHAND**_ so that it may become activatable. Great for, say, buffs that allow you access to strong abilities, or perhaps status effect-purging abilities that are only activatable as you are affected by the status effect at hand.
*   **Activation Blocked Tags**: Same as **Activation Required Tags** but in reverse: the Owner of the ability must not have these tags. Excellent for crowd control effects such as silences, stuns, roots (which, in some games, disable movement-related abilities), you name 'em.
*   **Source Required Tags**: The source must have these tags. What the system considers "source tags" is not immediately obvious because it isn't explained anywhere, but you can trigger abilities with payloads containing this information using a feature called GameplayEvents, which are detailed much further down below. The GameplayEvent will pass a struct which you can fill out as you please beforehand, with the InstigatorTags in that struct acting as the tags used in the Source Required and Source Blocked checks. When the payload contains all tags here specified in some capacity, the ability activation is allowed.
*   **Source Blocked Tags**: See **Source Required Tags**. Same applies, but instead of checking if all described tags are present, it checks if none of the blocked tags are present in the payload. If a blocking tag is present, the activation will be stopped.
*   **Target Required Tags**: See **Source Required Tags**. Same rules apply, but the tag container "TargetTags" from the GameplayEvent payload is used. It stands to reason that the InstigatorTags should be filled out with either the currently applied or at least descriptive tags of the actor owning the ability and firing it, and the TargetTags should be filled out with info relevant to who will get hit by this ability activation. As the code doesn't really enforce how you're filling out the tag containers in the GameplayEvent data however, you're free to do whatever you like, really.
*   **Target Blocked Tags**: Same as **Target Required Tags** but with Blocked tags.
*   **Cost GameplayEffect**: This is a `GameplayEffect` (in a sense a buff, or instant stat modifying action) that may contain instant, and thus permanent, stat modifiers, for example for mana and stamina and such. This checks if the attribute in question will be lowered below 0 by one such instant modifier. If so, `Commit Ability` will prompt the ability to end prematurely.
*   **Ability Triggers**: Can be used for remote ability activation. You can choose to activate the ability in response to a tag being granted to the owner, the tag being present on the owner (ending the ability automatically when the tag ceases applying(?)), or a `Gameplay Event` labelled with the specified tag being handled by the ability's owning Ability System Component.
*   **Cooldown GameplayEffect**: This `GameplayEffect` represents the ability's cooldown. When checking for cooldown, the ability will look into this gameplay effect's granted tag container (the tags it may grant to the owner while active) and will then check if the using ability system has any of these tags granted to them. If yes, the ability will be considered on cooldown.
    *   This essentially means that all independent cooldowns need their own dedicated gameplay tag, but it also means that multiple abilities can easily share a cooldown, outside events may easily set a particular cooldown and one ability may also have a gameplay effect sharing cooldowns with 2 different kinds of cooldowns that do not influence each other.
    *   A cooldown gameplay effect can also be set to 0/really low so that you may set the cooldown manually with the tags specified in the dedicated cooldown `GameplayEffect` as the ability is running, which can be useful if your ability doesn't always have a predictable and predefined cooldown in mind.

### GameplayTasks

#### Overview

Fairly self-explanatory; **AbilityTasks** are Blueprint nodes you can call in Ability graphs that wait for an outside stimuli before continuing. AbilityTasks inherit from so-called **GameplayTasks**, which generally have very similar usages that involve calling a blueprint node that may call back to the graph later, but while GameplayTasks are intended for much more general usage that covers things from giving an AI commands to follow to completion to simply acting as slightly expanded Delay node, AbilityTasks are specialized for usage within(and only within) GameplayAbilities. AbilityTasks usually possess an unlabelled top exec route that you may use to continue calling functions within the current frame and labelled exec pins that will run its attached route of functions at a later time, much like how delays work but with things other than time, usually.

They usually do what they advertise in their name/description, they support multiplayer because the server will generally always call them because the ability itself will generally always be called on the server, and will do their best predicting because the client will usually call them first unless specified otherwise by you. They do not actually have innate systems for correcting predictions on their own, but the things you do change with them usually will be replicated/will have systems to prevent desyncs themselves, so for the built-in tasks this is rarely a problem. Still, you should be wary of that when writing your own task classes.

Tasks will only run for as long as the ability is active, so the `EndAbility` node will prematurely end all pending ability tasks originating from that ability, as well. Because of this, you probably want to place things that **HAVE** to happen, no matter how the ability ended, in the `EndAbility` function. One example I could think off probably being purging off a buff that roots you in place as you play your casting animation.

Furthermore, because abilities have to remain active to use their tasks and abilities can really only track their state for their current activation, this also means that, for example, projectiles with elaborate effects should try to find a workaround over constantly keeping the ability active until they hit something/cease to exist, unless said projectile actively occupies the character or there is other similar reasons ability duration and projectile lifetime have to be so tightly knit together.

The rest of this section will be about creating your own custom task. You are free to skip to the usage example for Blueprints further down below for now if you have no reason to create your own task at the moment. You won't exactly have to make your own custom task often, this bit here is mostly so you don't feel too lost if you have to actually do one yourself.

Creating an AbilityTask is relatively simple, but it's not immediately obvious how you're supposed to do it. It's also not actually needed unless you have an outside system you need to incorporate into abilities somehow, and that has any meaningful callbacks to send back to these abilities. I personally have created a custom ability task for a melee attack system component that I intend to use, that first plays an attack montage and then calls back using delegates each time a new enemy has been hit by an attack's hitbox, and finally when the montage ends and the attack ceases. With these delegate callbacks it is possible to implement custom on-hit logic from the comfort inside your ability and still let the melee system do all the heavy lifting for you. Being able to have bigger procedures and actions be all handled within a compact and easy task node while you just have to implement what happens after which events is a huge boon and a big reason to use them where they make sense!

First, you must include the `GameplayTask` module in your build files. GameplayTasks are the overarching system AbilityTasks use to create asynchrous nodes in abilities, so trying to create new AbilityTasks without adding this module first will usually result in Linker errors:

<syntaxhighlight lang="cpp"> PublicDependencyModuleNames.AddRange(new string\[\] { "Core", "CoreUObject", "Engine", "InputCore", "HeadMountedDisplay", "GameplayAbilities", "GameplayTasks"} ); </syntaxhighlight>

Now create your AbilityTask object in the UE4 C++ file explorer. I'm calling mine AbilityTask\_MyTask, but you may want to rename it depending on what you want it to do. You know the drill.

Once you have created a new, empty class that inherits from AbilityTask, you should first of all define a static function in there that will help creating the AbilityTask within an ability BP. Technically you can put this static function anywhere really, but having it in your class is easy and makes it easy to find if you need to change it, too.

They're all set up about the same way, just a static function taking an OwningAbility, a task name and some optional extra variables(depending on usage) as parameters, returning a task of the type you want to return, with the UFUNCTION properties further easing and streamlining it for BP use:

<syntaxhighlight lang="cpp"> /\* This UFUNCTION macro describes, in that order: The function can be called in BP, the category in which the function will de displayed in the BP-function- dropdown is "Ability", subcategory "Tasks", the function name in BP is displayed as "ExecuteMyTask", the pin for the parameter "OwningAbility" is hidden in BP and the parameter "OwningAbility" will default to the object the calling graph belongs to, if applicable. Finally, BlueprintInternalUseOnly = "TRUE" prevents a regular function node for this UFUNCTION to be created, which makes sense because this function needs to use an async task node instead(which has some added behaviour on being called such as actually activating the task, extra exec pins, etc). \*/

UFUNCTION(BlueprintCallable, Category = "Ability|Tasks", meta = (DisplayName = "ExecuteMyTask", HidePin = "OwningAbility", DefaultToSelf = "OwningAbility", BlueprintInternalUseOnly = "TRUE")) static UAbilityTask\_MyTask\* CreateMyTask(UGameplayAbility\* OwningAbility, FName TaskInstanceName, float examplevariable); </syntaxhighlight>

The cpp code is fairly straightforward, you simply create a task using the dedicated NewAbilityTask constructor function, initialize its values as you see fit and then return it. The blueprint node itself will usually do the rest of the job activating and keeping track of it, etc.:

<syntaxhighlight lang="cpp"> UAbilityTask\_MyTask\* UAbilityTask\_MyTask::CreateMyTask(UGameplayAbility \* OwningAbility, FName TaskInstanceName, float examplevariable) {

UAbilityTask\_MyTask\* MyObj = NewAbilityTask<UAbilityTask\_MyTask>(OwningAbility, TaskInstanceName); //Just assume we have defined a float called OptionalValue somewhere in the class before. This is just an example. MyObj->OptionalValue = examplevariable;

return MyObj; } </syntaxhighlight>

Compile and, if everything has been done correctly, you should now have a new task function by the name of "ExecuteMyTask"(or your custom name) to use in your ability BPs. It doesn't have any new exec pins we could use though. Let us fix that!

While the exact logic behind how and why async task nodes work remain nebulous to me, creating new exec pins is actually rather easy in practice. First you need to define a dynamic multicast delegate. Multicast delegates are basically special structs you can wire functions into to call later upon "broadcasting" the delegate. These macros require a name for the new type of delegate you want to define, and they also need a list of parameter types and their corresponding names if your delegate is supposed to take functions that take at least one parameter themselves(as the delegate will then call these functions with the parameters it is broadcasted with). This all probably sounds very strange and complicated just written out like that, but it is actually rather easy when you see the code:

<syntaxhighlight lang="cpp"> //This lets you create a delegate with no parameters by the struct name of "FMyDelegate". DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE(FMyDelegate); //So if you want to have a class with a delegate variable of that type, you'd declare it as FMyDelegate DelegateVariable; //Finally, if you want to call all functions wired to DelegateVariable, you call DelegateVariable.Broadcast();

/\* You're not limited to just no-parameter functions either, a delegate that takes functions with a first parameter float and a second parameter int looks like this: \*/ DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_TwoParams(FMyTwoParamDelegate, float, FirstParamName, int32, SecondParamName); //You would then broadcast it like, for example: TwoParamDelegateVariable.Broadcast(20.f, 15); </syntaxhighlight>

How does this detour help us? Simple, an async task node will look for the first UPROPERTY dynamic multicast delegate variable it finds in your AbilityTask class and use it as the delegate type for its extra outgoing exec pins from that point. Check out this code for example:

<syntaxhighlight lang="cpp">DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_TwoParams(FMyTwoParamDelegate, float, FirstParamName, int32, SecondParamName);

UCLASS() class WIZARDMP\_API UAbilityTask\_MyTask : public UAbilityTask { GENERATED\_BODY()

//The important bit here. UPROPERTY(BlueprintAssignable) FMyTwoParamDelegate OnCalled;

UFUNCTION(BlueprintCallable, Category = "Ability|Tasks", meta = (DisplayName = "ExecuteMyTask", HidePin = "OwningAbility", DefaultToSelf = "OwningAbility", BlueprintInternalUseOnly = "TRUE")) static UAbilityTask\_MyTask\* CreateMyTask(UGameplayAbility\* OwningAbility, FName TaskInstanceName, float examplevariable);

/\* This function will call after the BP node has successfully requested the ability task from the static function. You put your actual functionality here. More on that in a bit. \*/ virtual void Activate() override;

  
}; </syntaxhighlight>

The async node will now have a new outgoing exec pin labelled "OnCalled" right under its regular exec pin, and there will even be pins for a float and an int value right below said exec pin, which you may now use to decide further action with inside your ability BP!

Do note that you may only have one multicast delegate type as dedicated exec pin delegate. If you were to have multiple multicast delegate types used in your class, the first one takes priority and the variables using the other types will not show up! Henceforth you should make sure that your delegate covers the variable needs of all your possible output execution pins. Better to have a pin occassionally unused than not having enough to convey all the important info your ability may need.

Broadcasting the delegate variable will now also fire off the exec pin in the BP. Usually you will have a different function within your class that you can wire up to some kind of different delegate, TimerHandle or any similar thing so you can wait for a particular thing to happen before broadcasting your main delegate. Unfortunately this example has no actual usage scenario in mind, so we will simply just broadcast the delegate right in the Activate function instead:

<syntaxhighlight lang="cpp"> void UAbilityTask\_MyTask::Activate() { /\* This is the part where you'd set up different delegates, timers etc. to prepare the task to eventually broadcast OnCalled sometime later. We have nothing prepared in this tutorial task however, so we may as well just call OnCalled right within the Activate function instead. \*/ OnCalled.Broadcast(500.f, 42); } </syntaxhighlight>

With that, your first task should be complete! This example is quite barebones, but should showcase everything important you need to know when making your own, real task to use in conjunction with your own systems. In case you are still a bit unsure about certain things, you can use the folder with the ability tasks contained within the plugin itself for further directions and pointers on how to do certain things. Godspeed!

#### GameplayTasks Example

Here is an example Blueprint graph of using a `GameplayAbilityTargetActor_SingleLineTrace` to do a "hitscan"-type weapon. It fires a ray from the player's origin in the direction they're looking (handled by the GameplayTask). When it hits something, it reports back to the Blueprint graph. The Blueprint graph then draws a pink line based on the origin and ending points of the line trace and ends the ability.

[![Hitscan Weapon.PNG](https://d3ar1piqh1oeli.cloudfront.net/c/c3/Hitscan_Weapon.PNG/940px-Hitscan_Weapon.PNG)](/index.php?title=File:Hitscan_Weapon.PNG)

You could go farther and use the struct provided from the output of `GameplayAbilityTargetActor_SingleLineTrace` to determine which Pawn you hit (if any) and apply a **GameplayEffect** to it, reducing its health or applying buffs of some kind. Speaking of GameplayEffects...

### GameplayEffects

#### Overview

**GameplayEffects** can be described as this system's dedicated buff class. Their functionality goes a little beyond that, and in fact most stat modifiers regardless of instant and permanent or over time and temporary are usually GameplayEffects. They're very peculiar in how they are set up to work as they are built to be hyper-efficient to replicate/network in general.

As such GameplayEffects are, first and foremost, glorified struct-like data assets with in-blueprint inheritance and without the ability to change their variables during runtime, as they will often be passed by class reference alone. In fact, you will almost NEVER see a plain GameplayEffect being passed around in code and especially not in Blueprint. The tooltip says they're data-only, and they really do mean that.

GameplayEffects usually use `GameplayEffectSpec`s to move around, which are huge behemoths of structs that store everything from effect context (what level, who is instigator, who is target, which ability spawned me, why do I even exist?) to reference to the GameplayEffect class that defines most default behaviour and variables to stack count to potential extra modifiers/tags/whatever to pass in alongside what the class reference defines upon applying. In a strange sort of way, `GameplayEffectSpec`s are much closer to object instances than the GameplayEffect instances themselves are. As such, if you want to apply a gameplay effect via ability, either apply it directly through a class reference or create a GameplayEffectSpec within the ability and use that to apply a GameplayEffect.

#### Notable Variables

Due to the unusual nature of Gameplay Effect blueprint classes, most of their variables are either simple values, other direct class references or just tags. There are too many to list and after explaining how abilities and their tags work, it should be fairly self-explanatory what most tags are used for, or do. It should however be noted that Gameplay Effects have 3 containers for each type of tag, one that is not directly editable, one that describes tags added on top of tags potentially owned from a parent and tags that are removed from a potential parent. Basically, this tag inheritance setup is one of relatively few reasons why Gameplay Effects are full-fledged UObject classes in the first place. Some of the more notable variables are:

*   **Duration Policy**: Is the effect instant, does it have a fixed duration, or does it go on infinitely? Do note that instant effects turn modifiers into permanent stat changes, and executions will be triggered immediately.
*   **Modifiers**: Stat changes in all shapes and forms. Whether you want to add a flat amount to a stat, multiply a stat, divide, override with a fixed value or do any of these things in relation to other stats.
*   **Executions**: Executions are an interesting case: They are essentially the functions the gameplay effect itself can't have (due to being meant to be as data-only as possible). An Execution takes a `GameplayEffectExecutionCalculation` as parameter, a class that is set up to define attributes to capture from both target and source, and to do things with them that would be considered too complex with modifiers alone. They are more or less meant to do as they please, however they cannot listen to events and such like abilities can do and pretty much only run in fixed, predefined intervals on timed GameplayEffects (and optionally once on application), or immediately on application in the case of instant GameplayEffects. They're your go-to for complex damage calculation and the likes. More on that later.
*   **Stacking**: You know how in some games certain buffs/debuffs of one kind can stack on a target? This behaviour is managed here. By default all GameplayEffects of the same type will act and tick down independently (though requesting the amount of stacks of a gameplay effect will usually still show the total amount of effect instances of this type). There are options to make them all go on the same timer, removing one stack each time duration runs out, removing all of them once the timer runs out once, if application of a new stack refreshes the current duration or if there is a cap on stacks. You can get quite creative with these.
*   **Overflow**: Adding up on stacks, overflow effects are essentially effects that the affected actor will be affected by when the max amount of stacks of this gameplay event has been reached. If you get cold enough you freeze, breathe enough poison gas to get heavily poisoned, whatever, you get it.
*   **Display**: You can define **GameplayCues** to use here. At their most basic, GameplayCues are essentially visual/audible effects that respond to a specialized tag they've been assigned to. It needs to have "GameplayCue" as its parent tag, so an example tag could be "GameplayCue.DoT.Fire". You can call these directly in abilities too. They're a network-friendly way to spawn stuff like particle effects, cosmetic meshes and sound effects to provide your debuffs and skills with some eye candy. How they react to being called by the GameplayEffect/Ability is defined within the GameplayCue itself (there's 4 types of events a GameplayCue will respond to: **OnActive** (Called when a GameplayCue is activated), **WhileActive** (Called when GameplayCue is active, even if it wasn't actually just applied, eg. Join in progress), **Removed** (when... well, removed) and **Executed** (This will be called when a GameplayEffect's execute classes run via instant effects or periodic tick).
*   **GrantedAbilities**: This has many uses. You may use a buff to temporarily provide an active ability as part of the buff(maybe a fire mage can give someone else a fire ability by igniting one of his allies? Heh, gotta love combat arson), but, more importantly, you can use these for effects that are too specific for modifiers but need to be permanently active in a way effect executions can't. If a gameplay effect is tagged to grant an actor an "OnFire" tag, you may have an ice buff with a passive ice ability granted listen for this event and remove the offending effect, as well as the ice buff itself (GameplayAbilities have a function just to allow them to remove the effect that granted them). Together with modifiers and executions, this allows you to do virtually anything with your effects.

It should be noted that most float values put into are not actually just plain float values, but rather a struct called **FScalableFloat**. You can use it just like any regular float, but there is an asset pointer to the right of the box where you'd put the float value in. It may confuse you because there are no valid references to use, and there is no option to create a new one. This slot is reserved for a **Curve Table**, an asset you get by importing a csv, or file with a comparable table file format, into the project.

_**This is one of the few things where effect level makes a difference**_, as the table will then look at the column labelled with this level (or the columns it should be between, determining the value dependent on what kind of graph the table row is set to describe) so if you use levels in, for example, your `GameplayEffectExecutionCalculation`s, keep that in mind, as you may accidentally set a value to scale in unexpected ways otherwise.

#### GameplayEffects Example

Let's make an example of perhaps the simplest use case for GameplayEffects: Cooldowns. Below, we have a very simple GameplayAbility that prints "Hello", puts itself on cooldown, then ends the ability.

[![CooldownAbility.PNG](https://d3ar1piqh1oeli.cloudfront.net/4/4a/CooldownAbility.PNG/940px-CooldownAbility.PNG)](/index.php?title=File:CooldownAbility.PNG)

The part circled in blue is the GameplayEffect which signals that we are on cooldown. When this GameplayEffect is applied to us, the ability is unusable.

The part circled in red is the GameplayEffect that gets applied to us when we use this ability. In this example, it's just something that puts us on cooldown right away, but we could make it so using an ability slows us down for a little bit, or starts stacking GameplayEffects until we reach a maximum amount, at which point _another_ GameplayEffect is applied which causes us to actually go on cooldown (which could be a simple example of using GameplayAbilities for a weapon/ammo system).

Now we move on to the GameplayEffect itself.

[![CooldownGameplayEffect.PNG](https://d3ar1piqh1oeli.cloudfront.net/c/cb/CooldownGameplayEffect.PNG/940px-CooldownGameplayEffect.PNG)](/index.php?title=File:CooldownGameplayEffect.PNG)

The part in red sets this to be a GameplayEffect which happens over a duration (5 seconds in this example). At the end of this duration, the GameplayEffect is lifted. That's all this example does; it just applies itself for 5 seconds.

The part in blue is where all the magic happens. An `FGameplayTag` `"AbilityTags.Cooldown"` is applied to our AbilitySystemComponent while this GameplayEffect is active. This is how our AbilitySystemComponent knows which GameplayEffects are active. When you try to activate the sample GameplayAbility above, it checks to see if you have the tags in blue. If you do, then nothing happens -- it won't let you activate the ability. Otherwise, the ability works. The tags in there can be called whatever you want; these ones just happen to be called `"AbilityTags.Cooldown"`.

### AttributeSet

**AttributeSets** are thankfully very simple to explain. They define float values (_and ONLY float values._ Right now only float attributes are supported) and can be connected to AbilitySystems to grant the ability system in question these attributes. GameplayEffects and GameplayEffectExecutionCalculations have specifically designed macros and menus to manipulate these attributes on an ability system. An ability system may use multiple attribute sets or none at all, too.

The system accounts for attributes it cannot find and will simply ignore stats that are not appropriate for the particular actor and his AbilitySystem. As such, maybe both players and foes have Health, Mana, attack damage, defense, you name 'em, and players then have an extra attribute set containing RPG attributes such as Strength, Intelligence, Constitution and the like. These are all perfectly possible scenarios, and it's nice that the system gives you the option to mix and match multiple attribute sets. The best way to bind an attribute set to an ability system is to create the AttributeSet as the same actor's subobject in the constructor. The ability system should find it by itself. It does for me, at least.

Attributes within attribute sets are defined like any other `UPROPERTY`, which is amazingly practical and straightforward. Why can't everything in this module be... Well, it isn't that easy anyway, due to the AttributeSet's functions, which either deal with finding out which `UPROPERTY` the current parameter is talking about or have to do with the infinitely more complex `GameplayEffectExecutionCalculation`.

**PreAttributeBaseChange** is called before... well, an attribute's base value (so without any temporary modifiers) is changed. It would be unwise to use this for game logic, and is mostly there to allow you to describe stat clamping.

**PreAttributeChange** is in the same boat, but here you can define clamping with temporary modifiers instead. Either way, NewValue describes the new value of a changed stat, and FGameplayAttribute Attribute describes some info about the stat we're talking about. If you want to find out if this particular Attribute change is talking about a particular Attribute `MyAttribute` in `UMyAttributeSet`, you'd do it something like this:

<syntaxhighlight lang="cpp">Attribute.GetUProperty() == FindFieldChecked<UProperty>(UMyAttributeSet::StaticClass(), GET\_MEMBER\_NAME\_CHECKED(UMyAttributeSet, MyAttribute))</syntaxhighlight>

This code takes the `UPROPERTY` variable of the Attribute parameter and checks if the referenced `UPROPERTY` is identical with the one that describes `MyAttribute` in `UMyAttributeSet`. The macro is mostly there for safety, I believe this is actually defined as a relatively simple string.

**PreGameplayEffectExecute** is a function that takes the data a `GameplayEffectExecutionCalculation` spits out (including which stats it wishes to modify, and by how much), and can then decide if the `GameplayEffectExecutionCalculation` is allowed to influence the `AttributeSet` in any way, by returning an appropriate bool. **PostGameplayEffectExecute** happens after this evaluation and as such you are unable to throw the `GameplayEffectExecution` out properly by then. However, because 90% of the time things such as damage calculations will be effect executions, here will be an excellent place to wrap such a thing up, such as by, for example, checking if the damage you took killed you.

#### Using AttributeSets

So, now that we understand what Attributes are and how they work, let's take a look at a simple "Health" attribute.

This is some simple code, which just gives an AbilitySystemComponent a "Health" value:

<syntaxhighlight lang="cpp">UCLASS()

class UMyAttributeSet : public UAttributeSet { GENERATED\_BODY() public: //Hitpoints. Self-explanatory. UPROPERTY(Category = "Wizard Attributes | Health", EditAnywhere, BlueprintReadWrite) FGameplayAttributeData Health;

//FGameplayAttributeData is the intended struct to be used for attributes by the system. However, //attributes can also be declared as simple floats. I am unsure if the attribute initialization method //further down functions with the struct, however the float method seems to be the more dated one.

}</syntaxhighlight>

That's it! Easy, right?

But as of right now, that health value doesn't _do_ anything. You can tell the ability system that you have some health, but it doesn't know what to do when your health hits 0 (and indeed, in the above example, your health IS 0 -- you might want to add a constructor or something to set it to a reasonable value). That's where the functions like `PostGameplayEffectExecute` that we just learned about come into play!

Here's some code taken from Dave Ratti's example GitHub project linked at the beginning of the article:

<syntaxhighlight lang="cpp">

void UGASAttributeSet::PostGameplayEffectExecute(const struct FGameplayEffectModCallbackData &Data) { UAbilitySystemComponent\* Source = Data.EffectSpec.GetContext().GetOriginalInstigatorAbilitySystemComponent();

if (HealthAttribute() == Data.EvaluatedData.Attribute) { // Get the Target actor AActor\* DamagedActor = nullptr; AController\* DamagedController = nullptr; if (Data.Target.AbilityActorInfo.IsValid() && Data.Target.AbilityActorInfo->AvatarActor.IsValid()) { DamagedActor = Data.Target.AbilityActorInfo->AvatarActor.Get(); DamagedController = Data.Target.AbilityActorInfo->PlayerController.Get(); }

// Get the Source actor AActor\* AttackingActor = nullptr; AController\* AttackingController = nullptr; AController\* AttackingPlayerController = nullptr; if (Source && Source->AbilityActorInfo.IsValid() && Source->AbilityActorInfo->AvatarActor.IsValid()) { AttackingActor = Source->AbilityActorInfo->AvatarActor.Get(); AttackingController = Source->AbilityActorInfo->PlayerController.Get(); AttackingPlayerController = Source->AbilityActorInfo->PlayerController.Get(); if (AttackingController == nullptr && AttackingActor != nullptr) { if (APawn\* Pawn = Cast<APawn>(AttackingActor)) { AttackingController = Pawn->GetController(); } } }

// Clamp health Health = FMath::Clamp(Health, 0.0f, MaxHealth); if (Health <= 0) { // Handle death with GASCharacter. Note this is just one example of how this could be done. if (AGASCharacter\* GASChar = Cast<AGASCharacter>(DamagedActor)) { // Construct a gameplay cue event for this death FGameplayCueParameters Params(Data.EffectSpec.GetContext()); Params.RawMagnitude = Data.EvaluatedData.Magnitude;; Params.NormalizedMagnitude = FMath::Abs(Data.EvaluatedData.Magnitude / MaxHealth); Params.AggregatedSourceTags = \*Data.EffectSpec.CapturedSourceTags.GetAggregatedTags(); Params.AggregatedTargetTags = \*Data.EffectSpec.CapturedTargetTags.GetAggregatedTags();

GASChar->Die(DamagedController, DamagedActor, Data.EffectSpec, Params.RawMagnitude, Params.Normal); } } } }</syntaxhighlight>

You can see how things start getting a little more complex, but really, it's nothing you can't handle! `HealthAttribute()` is defined using that same macro we used earlier:

<syntaxhighlight lang="cpp">

FGameplayAttribute UGASAttributeSet::HealthAttribute() { static UProperty\* Property = FindFieldChecked<UProperty>(UGASAttributeSet::StaticClass(), GET\_MEMBER\_NAME\_CHECKED(UGASAttributeSet, Health)); return FGameplayAttribute(Property); }</syntaxhighlight>

Obviously, this would need to be changed to fit whatever game you're making, but it's one simple way of implementing a damage function using GameplayAbilities.

#### Data-driven Initialization of Attributes

One way to initialize your attributes is to use a data table. You can create a .csv file in the following format and when importing, select "Attribute Meta Data" as the row type. The name column is a little tricky here: you have to use your class name without the 'U' in front, so MyAttributeSet instead of UMyAttributeSet.

Name

BaseValue

MinValue

MaxValue

DerivedAttributeInfo

bCanStack

\[YourAttrClass\].\[YourAttrProperty\]

x

y

z

 ???

T/F

MyAttributeSet.Movespeed

300

0

1000

FALSE

Next, add a property in your character to hold a pointer to this table. Make sure to assign your table to this pointer, whether through blueprints or C++. <syntaxhighlight lang="cpp"> UPROPERTY(EditDefaultsOnly, BlueprintReadOnly, Category = Abilities) UDataTable \* AttrDataTable; </syntaxhighlight>

Somewhere after you create your AbilitySystemComponent, like at the end of BeginPlay(), you can read in the table. It's a simple one-liner:

<syntaxhighlight lang="cpp"> if (AbilitySystem && AttrDataTable) { const UAttributeSet \* Attrs = AbilitySystem->InitStats(UMyAttributeSet::StaticClass(), AttrDataTable); } </syntaxhighlight>

If you setup your table correctly, your stats should be initialized properly!

#### Replication

In the case of a multiplayer game, attributes must usually still be replicated. You replicate them like any other C++ variable, by including the `UnrealNetwork.h` in your header, adding a "Replicated" tag inside the variable `UPROPERTY` macro and overriding `void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps)` const so that the variable is properly included as replicated variable.

However, the system requires some extra replication parameters that the normal `DOREPLIFETIME` macro does not set properly. As such, we need to use a macro which has more parameters, and set these accordingly. It's thankfully quite simple, as all attributes will use the same settings.

<syntaxhighlight lang="cpp">void UWizardAttributeSet::GetLifetimeReplicatedProps(TArray< FLifetimeProperty > & OutLifetimeProps) const

{ Super::GetLifetimeReplicatedProps(OutLifetimeProps);

//DOREPLIFETIME( UMyAttributeSet, MyAttribute); Chances are this is how you would ordinarily do it, however in the case of attributes this'll lead to confusing and annoying replication errors, usually involving clientside ability prediction. DOREPLIFETIME\_CONDITION\_NOTIFY( UMyAttributeSet, MyAttribute, COND\_None, REPNOTIFY\_Always); //This is how it is done properly for attributes. }</syntaxhighlight>

However, attributes need some extra legwork so that values and structs depending on this attribute in question get changed according to a value a client receives from the server. We need to replace the "Replicated"-tag in your `UPROPERTY` with a `"ReplicatedUsing=OnRep_MyFunction"` tag, with `OnRep_MyFunction` being the function you wish to call to update your current attribute. Functionally this means each attribute needs its own `OnRep` function, like so:

<syntaxhighlight lang="cpp">UPROPERTY(Category = "Attribute", EditAnywhere, ReplicatedUsing = OnRep\_MyAttribute, BlueprintReadWrite)

float MyAttribute; UFUNCTION() void OnRep\_MyAttribute() { GAMEPLAYATTRIBUTE\_REPNOTIFY(UMyAttributeSet, MyAttribute); }</syntaxhighlight> That's a lot to write for one attribute, so if you are sure you do not need the `OnRep` function for anything else, you may set up a macro that does this whole thing for you, as most of these functions will look about identical to each other.

This should be the basics. With knowledge of **GameplayAbilities**, **GameplayEffects**, **AttributeSets** and a tiny crash course on **GameplayCues**, you should be able to get simple types of abilities, buffs and debuffs done. You may explore for yourself and see what the system allows you to accomplish. You will probably find it to be very powerful and simple to use once you've gotten into its rhythm.

The More Advanced Nitty Gritty
------------------------------

So we have Abilities, Attributes and Effects now. Cool. However, with the tools we have currently introduced, it is difficult to really tie the individual components of this system into each other: Abilities can be called remotely, but only when tags are/have been granted to their owner and without any parameters to work with, GameplayEffects are severely limited by modifiers being so basic and abilities requiring explicit outside triggers to really do anything, and Attributes... well, those are actually working just fine considering they're just float containers at heart, but accessing them and setting up global calculations with them could be easier.

Anyhow, GameplayEvents and GameplayEffectExecutionCalculations are there to really tie up the loose ends of the system together and really make a proper package out of the single excellent systems we have right now.

### GameplayEffectExectutionCalculation

To put it simply, a **GameplayEffectExecutionCalculation** is a function a GameplayEffect may have and may call in fixed intervals over the effect's duration and/or during initial application. They can do whatever they want really as their `Execute` function provides them with all parameters necessary to influence their respective actor, ability system or even outside world directly, but due to being a little inconvenient to set up, being C++ only for the moment and lacking any real way to react to the outside world in the way Abilities can, you may be better off with Abilities instead depending on what you want to do.

However, an GameplayEffectExecutionCalculation's unique gimmick is that it can capture attributes from both Source of the GameplayEffect and Target of the GameplayEffect while applying a modifier to them just for this function activation, and use them as parameters of sorts for the calculation, being also able to snapshot particular attributes when the GameplayEffect is first conceived if such a thing would be necessary (for instance, you can attach a GameplayEffectSpec to a fireball projectile, applying it to whoever gets hit, and the fireball naturally shouldn't be influenced by damage boosts and changes on the source once it has initially been fired). This makes GameplayEffectExecutionCalculations amazingly useful for things such as global damage calculations, which will also be our go-to example to understand the setup with in this guide. It will be a very simple and naively implemented example, but it will help you set up a more complex one.

For starters, assume that we have an arbitrary attribute system possessing the following attributes: _Health_, _AttackMultiplier_ and _DefenseMultiplier_. _Health_ will decrease as damage is taken (I mean, obviously), _AttackMultiplier_ multiplies outgoing damage with itself and _DefenseMultiplier_ will multiply incoming damage with itself (usually being below 1, or 100%, essentially reducing incoming damage).

I will assume that you will have experimented with the system and the examples in the previous section already and can just add these to your other attributes if you do not already possess similar ones. Just in case, the code of an attribute system with just these values could look a little like this:

<syntaxhighlight lang="cpp">UCLASS()

class UMyAttributeSet : public UAttributeSet { GENERATED\_BODY()

public:

//Hitpoints. Self-explanatory. UPROPERTY(Category = "Wizard Attributes | Health", EditAnywhere, BlueprintReadWrite) FGameplayAttributeData Health;

//Outgoing damage-multiplier. UPROPERTY(Category = "Wizard Attributes | Health", EditAnywhere, BlueprintReadWrite, meta = (HideFromModifiers)) FGameplayAttributeData AttackMultiplier;

//Incoming damage-multiplier. UPROPERTY(Category = "Wizard Attributes | Health", EditAnywhere, BlueprintReadWrite) FGameplayAttributeData DefenseMultiplier;

}</syntaxhighlight>

However, we actually want to add another attribute on top of that.

Because a GameplayEffectExecutionCalculation takes attributes as pseudo-parameter, we want an extra attribute just so we may define an effect's base damage. We could combine AttackMultiplier and BaseAttackPower into one attribute, but you may get into deep feces once you want to add buffs that influence your outgoing damage, and simply adding values to your BaseAttack may have quite notable balance implications and such if you have a rapid-fire ability that deals a lot of very small damage effects. You COULD change BaseAttack for some buffs and effects, but that's mostly you and your game's call. Basically, having a percentage multiplier on top of a flat attack value is probably a better idea.

Anyhow, you should add BaseAttackPower as an attribute.

<syntaxhighlight lang="cpp">UCLASS()

class UMyAttributeSet : public UAttributeSet { GENERATED\_BODY()

public:

//Hitpoints. Self-explanatory. UPROPERTY(Category = "Wizard Attributes | Health", EditAnywhere, BlueprintReadWrite) FGameplayAttributeData Health;

//Outgoing damage-multiplier. UPROPERTY(Category = "Wizard Attributes | Health", EditAnywhere, BlueprintReadWrite, meta = (HideFromModifiers)) FGameplayAttributeData AttackMultiplier;

//Incoming damage-multiplier. UPROPERTY(Category = "Wizard Attributes | Health", EditAnywhere, BlueprintReadWrite) FGameplayAttributeData DefenseMultiplier;

//Base damage of an outgoing attack. UPROPERTY(Category = "Wizard Attributes | Health", EditAnywhere, BlueprintReadWrite) FGameplayAttributeData BaseAttackPower; }</syntaxhighlight>

Alright, so we got all our important attributes set up, it's time to create a new GameplayEffectExecutionCalculation. Go to your C++ folder in your content explorer, click New C++ class, select GameplayEffectExecutionCalculation as your parent, and select a name for your new class that doesn't take half a decade to pronounce or type. I am calling mine `DamageExec`. You may do too, if you like.

Once it has finished compiling, you want to change `GENERATED_BODY()` at the top of your class declaration in your header to `GENERATED_UCLASS_BODY()`. This way, Unreal's preprocessor-generation-thingie will define us a constructor `DamageExec(const FObjectInitializer& ObjectInitializer)`. We want to implement it in our cpp file like so.

<syntaxhighlight lang="cpp">UDamageExecution::UDamageExecution(const FObjectInitializer& ObjectInitializer)

: Super(ObjectInitializer) {

}</syntaxhighlight>

We will actually need to do a few things in our constructor, namely giving the Execution info on what attributes we wish to capture from whom. We will need `FGameplayEffectAttributeCaptureDefinitions` for this. Thankfully, the module has macros for these that makes it easy to set them up.

For the sake of simplicity (as we will need the definitions and `UPROPERTY`s of our attributes in different functions), we will put these in a struct.

<syntaxhighlight lang="cpp">struct AttStruct

{ DECLARE\_ATTRIBUTE\_CAPTUREDEF(Health); //The DECLARE\_ATTRIBUTE\_CAPTUREDEF macro actually only declares two variables. The variable names are dependent on the input, however. Here they will be HealthProperty(which is a UPROPERTY pointer)

                                                                        //and HealthDef(which is a FGameplayEffectAttributeCaptureDefinition).

DECLARE\_ATTRIBUTE\_CAPTUREDEF(AttackMultiplier); //Here AttackMultiplierProperty and AttackMultiplierDef. I hope you get the drill. DECLARE\_ATTRIBUTE\_CAPTUREDEF(DefenseMultiplier); DECLARE\_ATTRIBUTE\_CAPTUREDEF(BaseAttackPower);

AttStruct() { // We define the values of the variables we declared now. In this example, HealthProperty will point to the Health attribute in the UMyAttributeSet on the receiving target of this execution. The last parameter is a bool, and determines if we snapshot the attribute's value at the time of definition. DEFINE\_ATTRIBUTE\_CAPTUREDEF(UMyAttributeSet, Health, Target, false);

//This here is a different example: We still take the attribute from UMyAttributeSet, but this time it is BaseAttackPower, and we look at the effect's source for it. We also want to snapshot is because the effect's strength should be determined during its initial creation. A projectile wouldn't change

               //damage values depending on the source's stat changes halfway through flight, after all.

DEFINE\_ATTRIBUTE\_CAPTUREDEF(UMyAttributeSet, BaseAttackPower, Source, true);

//The same rules apply for the multiplier attributes too. DEFINE\_ATTRIBUTE\_CAPTUREDEF(UMyAttributeSet, AttackMultiplier, Source, true); DEFINE\_ATTRIBUTE\_CAPTUREDEF(UMyAttributeSet, DefenseMultiplier, Target, false); } };</syntaxhighlight>

Now we have a struct that contains the `CaptureDefinitions` we need, so in the constructor we can simply write:

<syntaxhighlight lang="cpp">UDamageExec::UDamageExec(const FObjectInitializer& ObjectInitializer)

: Super(ObjectInitializer) {

     AttStruct Attributes;
     
     RelevantAttributesToCapture.Add(Attributes.HealthDef); //RelevantAttributesToCapture is the array that contains all attributes you wish to capture, without exceptions. 
     InvalidScopedModifierAttributes.Add(Attributes.HealthDef); //However, an attribute added here on top of being added in RelevantAttributesToCapture will still be captured, but will not be shown for potential in-function modifiers in the GameplayEffect blueprint, more on that later.
     
     RelevantAttributesToCapture.Add(Attributes.BaseAttackPowerDef);
     RelevantAttributesToCapture.Add(Attributes.DefenseMultiplierDef);
     RelevantAttributesToCapture.Add(Attributes.AttackMultiplierDef);

}</syntaxhighlight>

Compile, and voilà, it should now successfully capture attributes. You may check by opening up a GameplayEffect blueprint, and trying to select DamageExec as Execution class. It should allow you to view and select a few more settings. Add a new element in the array `CalculationModifiers`, and you should see BaseAttackPower, DefenseMultiplier and AttackMultiplier as valid Backing Capture Definition (not Health, however, as you have rendered it as hidden by adding it to `InvalidScopedModifierAttributes`). These are these calculation-only modifiers I talked about. Basically, you can now easily define each gameplay effect's BaseAttackPower individually by adding/setting BaseAttackPower to a value of choice.

Well, but that wouldn't really do anything right now. We have set up capture definitions, but we haven't really set up any functionality. Declare the function `virtual void Execute_Implementation(const FGameplayEffectCustomExecutionParameters& ExecutionParams, OUT FGameplayEffectCustomExecutionOutput& OutExecutionOutput) const override` in your header, and create a fitting definition in your cpp file.

I will just copy-paste an excerpt from Dave's damage calculation from the example project mentioned in this wiki's introduction, and will add comments and changes where appropriate for our level of wisdom and our current setup of attributes.

<syntaxhighlight lang="cpp">void UDamageExec::Execute\_Implementation(const FGameplayEffectCustomExecutionParameters& ExecutionParams, OUT FGameplayEffectCustomExecutionOutput& OutExecutionOutput) const

{ AttStruct Attributes; //Creating the attribute struct, we will need its values later when we want to get the attribute values.

UAbilitySystemComponent\* TargetAbilitySystemComponent = ExecutionParams.GetTargetAbilitySystemComponent(); //We put AbilitySystemComponents into little helper variables. Not necessary, but it helps keeping us from typing so much. UAbilitySystemComponent\* SourceAbilitySystemComponent = ExecutionParams.GetSourceAbilitySystemComponent();

AActor\* SourceActor = SourceAbilitySystemComponent ? SourceAbilitySystemComponent->AvatarActor : nullptr; //If our AbilitySystemComponents are valid, we get each their owning actors and put them in variables. This is mostly to prevent crashing by trying to get the AvatarActor variable from AActor\* TargetActor = TargetAbilitySystemComponent ? TargetAbilitySystemComponent->AvatarActor : nullptr; //a null pointer.

const FGameplayEffectSpec& Spec = ExecutionParams.GetOwningSpec();

const FGameplayTagContainer\* SourceTags = Spec.CapturedSourceTags.GetAggregatedTags(); const FGameplayTagContainer\* TargetTags = Spec.CapturedTargetTags.GetAggregatedTags(); //Some more helper variables: Spec is the spec this execution originated from, and the Source/TargetTags are pointers to the tags granted to source/target actor, respectively.

FAggregatorEvaluateParameters EvaluationParameters; //We use these tags to set up an FAggregatorEvaluateParameters struct, which we will need to get the values of our captured attributes later in this function. EvaluationParameters.SourceTags = SourceTags; EvaluationParameters.TargetTags = TargetTags;

  

float Health = 0.f; //Alright, this is where we get the attribute's captured value into our function. Damage().HealthDef is the definition of the attribute we want to get, we defined EvaluationParameters just above us, and Health is the variable where we will put the captured value into(the Health variable we just declared) ExecutionParams.AttemptCalculateCapturedAttributeMagnitude(Attributes.HealthDef, EvaluationParameters, Health);

float BaseAttackPower = 0.f; ExecutionParams.AttemptCalculateCapturedAttributeMagnitude(Attribute.BaseAttackPowerDef, EvaluationParameters, BaseAttackPower); // We do this for all other attributes, as well.

float AttackMultiplier = 0.f; ExecutionParams.AttemptCalculateCapturedAttributeMagnitude(Attribute.AttackMultiplierDef, EvaluationParameters, AttackMultiplier);

float DefensePower = 0.f; ExecutionParams.AttemptCalculateCapturedAttributeMagnitude(Attribute.DefenseMultiplierPowerDef, EvaluationParameters, DefenseMultiplier);

  

//Finally, we go through our simple example damage calculation. BaseAttackPower and AttackMultiplier come from soruce, DefensePower comes from target. float DamageDone = BaseAttackPower \* AttackMultiplier \* DefensePower; //An optional step is to clamp to not take health lower than 0. This can be ignored, or implemented in the attribute sets' PostGameplayEffectExecution function. Your call, really. DamageDone = FMath::Min<float>( Damage, Health );

//Finally, we check if we even did any damage in this whole ordeal. If yes, then we will add an outgoing execution modifer to the Health attribute we got from our target, which is a modifier that can still be thrown out by the attribute system if it wishes to throw out the GameplayEffectExecutionCalculation. if (DamageDone > 0.f) { OutExecutionOutput.AddOutputModifier(FGameplayModifierEvaluatedData(Damage().HealthProperty, EGameplayModOp::Additive, -DamageDone)); }

//Congratulations, your damage calculation is complete!</syntaxhighlight>

With that, your new damage calculation is now complete. You are free to try to use it through an instant GameplayEffect of choice. Set up a widget or debug string somewhere to tell you your current HP, set the BaseAttackPower of your GameplayEffect's execution to something high like 100, _**do not forget to assure that the multiplier attributes are not 0**_, and if your effect reduces your HP, then congrats! You got your very first damage execution calculation running!

You can expand it as you please, as the ExecutionParams parameter of your Execute contains all info about your target, source and GameplayEffectSpec. Want to multiply your damage by your GameplayEffectSpec's level? Easily done. Have an if-statement somewhere that says "if the target actor has tag X that is described to grant him immunity to all damage, reduce the damage of this calculation to 0" if you need such a thing for your game.

It is easy to extend this damage calculation once you get it running initially. Add new multiplier attributes for fire or ice or whatever damage, and have it so that your execution checks for tags on either the source or the EffectSpec itself that say whether to consider these or not. Be creative! You have the tools, you have the power!

An aspect I forgot to mention, and that doesn't quite fit into this example, is that calculations can be used to decide if conditional gameplay effect classes attached to a particular gameplay effect should be applied upon calling of the execution, calling the function `MarkConditionalGameplayEffectsToTrigger()` from the `Execute_Implementation` function's parameter `OutExecutionOutput`.

For example, you may use calculations to determine if the user's health is below half their maximum health, and call a GameplayEffect granting them a stats buff accordingly. It can be as simple as a simple stat check to as elaborate as a calculation that refuses to apply the conditional GameplayEffect without a certain effect asset tag while applying copies of the owning gameplay effect with this asset tag, simulating an aura-effect that doesn't affect the owner with just a `GameplayEffectExecution` alone (this example is a little out there, though. Cut me some slack, thinking off a usage example for every other aspect of the system is hard).

Another thing to keep in mind is that executions are not set up to predictively run for a client. As such, their effects will only show themselves to the causing actor when the server receives it.

### Gameplay Events

Alright, this should about be the last major component of the system we haven't extensively talked about. Gameplay Events are amazingly useful due to their ability to trigger abilities without messing around with the ability owner's tags, while at the same time providing the GameplayAbility in question with a useful payload that may contain the source, target actors, magnitude and even generic object pointers for abilities to use as parameter. They're great if you have generic events and situations many abilities will call or listen for. A damage execution may for example throw out a GameplayEvent before damage is applied so that abilities can react with damage-decreasing buffs or pre-damage heals, and one after all multipliers and reductions so that abilities can take the final damage done to, for example, heal the source in proportion to the dealt damage (which would be a simple implementation for lifesteal). Gameplay Events are amazingly flexible, and most kinds of reactionary passive abilities can be implemented with well-implemented Gameplay Events in globally used functions and executions.

You don't really create a new GameplayEvent in the same way you create a new class. They're in fact just mere data structs, and use a tag to tell abilities what kind of event they are. It is up to the abilities themselves to react to them appropriately.

The struct responsible for GameplayEvents, the `FGameplayEventData`, has the following variables:

*   **EventTag**: The tag that the event uses as label to be identified by. Do note that an event with tag label X will NOT actually call all GameplayAbilities using this tag as trigger. More on that later.
*   **Instigator**: An actor pointer to point to the source or instigator with. Due to the nature of events, you can place any actor reference here, or even leave it null, but it never hurts to put a fitting actor reference here.
*   **Target**: Same as instigator, but for targets. Personally, I always set this to the actor we call the gameplay event for, because, I mean, that IS pretty much the target of the GameplayEffect. That said, if you for example have an event that tells a damage source it dealt damage to a target, you can switch it around like that too. It's your call, you are given pretty much no limits or guidelines in this struct.
*   **OptionalObject** and **OptionalObject2**: UObject pointers that can be filled with references for extra info. Maybe you want a GameplayEvent in your own child, or maybe a GameplayAbility you inherit all your other spells from that implements at the initial activation, taking the GameplayAbility object itself as parameter.
*   **ContextHandle**: `GameplayEffectContextHandles` are the part of effect specs that store the origin of an effect, such as the ability they came from, the original creation point in the world, the owner of the effect. These all can be useful for the GameplayEvent itself, so add this parameter when you can.
*   **InstigatorTags**, **TargetTags**: The tags the instigator and target had during the initial calling of the GameplayEvent. This is different from getting the tags through the instigator/target pointers, as the tag containers through the pointers may update halfway through (obviously, due to being pointers).

These are _not_ actually unused as it turns out, as abilities called with the payload will run these tags through its Source/Target Required/Blocked tags, so if you wish to use these features that are built into every ability by default, you should set the tags accordingly. Also worth noting is that the code doesn't check if any rules are held up though, so it's up to you how you ultimately wish to fill these out. Whether you simply pass the tags currently applied to your target and instigator actors to these containers, whether you opt to fill the containers with tags further describing the situation or a different alternative is all up to you.

*   **EventMagnitude**: A singular float. You're more or less free to use it as you want. I personally use it as parameter for my damage events, setting the magnitude to the calculated damage up to the particular step in the calculation (I have an event before all calculations, after bonus multipliers, after resistances, etc.). This is just an example, though.

GameplayEvent structs do not have a constructor that parametrizes these, so you need to set these manually. A little annoying, but you can set up functions to help with that.

Alright, now that we have a GameplayEvent struct, it's time to trigger abilities with it. Abilities may set up a trigger by going to their class defaults and adding a trigger with trigger source Gameplay Event and your tag of choice as values.

We actually can go two different paths to call a GameplayEvent for all abilities in an ability system component:

*   We may call the static `function SendGameplayEventToActor(AActor* Actor, FGameplayTag EventTag, FGameplayEventData Payload)` from the `AbilitySystemBlueprintLibrary` class (which is pretty much just one big class of convenience methods exposed to blueprints)
*   We may also call the ability system component's `HandleGameplayEvent(FGameplayTag EventTag, const FGameplayEventData* Payload)` function directly.

AbilitySystemBlueprintLibrary's function is safer and more convenient to use, though our actor needs the `IAbilitySystemInterface` implemented for it to work properly. It also does not return the amount of abilities that got triggered by the particular EventTag we use as parameter, though chances are most abilities and systems will very rarely need it. As such, using AbilitySystemBlueprintLibrary's function is often a better idea.

Either way, the meaningful parameters of both functions boil down to an `FGameplayTag` `EventTag` and the `GameplayEvent` struct itself, which is usually called `Payload`. The `Payload` is self-explanatory, as this is what we will give our ability to work with when called from `GameplayEvent`. The `EventTag` is the tag that the ability system component to try to trigger all abilities by. This tag and the tag you give to the struct as label must **not** be the same thing. For my own usage they usually are, but nothing stops you from having separate tags for event calling and tags for event labelling.

Alright, so if you did everything correctly, your ability should respond to a GameplayEvent of choice (this is easily testable by assigning a random key input on your character to send the event with the event tag of choice to your character, as it should have implemented the interface a long time ago by now).

That's fine and dandy, but where is the payload? Well, going back to the GameplayAbility blueprint for a little, you may or may not have noticed already that there is a different `ActivateAbilityEvent` defined, but not added to the event graph by default. The event is called `ActivateAbilityFromEvent`, which does have a Gameplay Event data struct as input.

Your first thought may be to set up a separate chain of blueprint nodes that start from the `ActiveAbilityFromEvent` node, but this is wrong. The reason for this is not at all simple and in fact rather bizarre, because GameplayAbility's constructor is set in such a way that **it will set a hidden bool to use the struct-less `ActivateAbility` node for all ability activations when it is present in the blueprint graph of an inherited blueprint class**. I told you man, witchcraft! This module is witchcraft!

Essentially, you will have to replace the `ActivateAbility` node with the Event activation event in your GameplayAbility blueprint. This surrenders your ability to call your ability through conventional means which does not provide the ability with a Gameplay Event struct to work with (such as via action mapping or through `TryActivate` functions), but you may be okay with this if the ability is meant to be purely passive and response-based.

If you want an ability that does need both gameplay event structs when called via GameplayEvent while still being eligible for manual activations with action mappings/`TryActivate`, you're best off just splitting active and response-based ability activations into separate abilities that are usually delivered in one bundle.

### Targeting

Way back in the Tasks section we looked at an example task called `Wait for Target Data`. This task is particularly significant within the AbilitySystem because not only does it provide a system for visualising the targeting of an ability, it provides a framework for the player to send data client->server.

When using this node, the first thing to note is that it is likely best to place before CommitAbility. This is because you can give the player the option to see what their ability is going to do before they choose to activate it. There's a couple of options for Confirmation Type, but the main two are `Instant` and `User Confirmed`. These two options are a simple way to swap between quick-casting (Instant), and requiring additional input to confirm and continue the ability. The class option needs to be a child of `AGameplayAbilityTargetActor`. We'll get to that shortly. We also have some options for a reticle, which I don't use so we won't be covering it, and a filter option. The filter will only really be relevant if you're going to be targeting actors, as opposed to targeting a location or some other thing. A good example might be an AoE spell that affects all targets within a circle - using the filter we can remove the caster from the list of targets, so that we neither highlight them during targeting nor apply effects to them later in the ability.

[![WaitTargetData.png](https://d3ar1piqh1oeli.cloudfront.net/a/ad/WaitTargetData.png/940px-WaitTargetData.png)](/index.php?title=File:WaitTargetData.png)

If you've selected `User Confirmed` for the Confirmation Type. You'll need to either call `UAbilitySystemComponent::TargetConfirm()` or have Confirm as part of you input binds discussed earlier. You can also call `UAbilitySystemComponent::TargetCancel()` or use Cancel from the input binding if you want to give the player the option to see where they're aiming and then stop the ability from doing anything if they change their mind. This is particularly handy if creating abilities that build or place things in the world. If you're doing user confirmed remember to link the cancelled pin to EndAbility to clean things up!

The data pin on the right of the Task Node will be valid on both the client and the server, and the Valid Data delegate will fire on both. At the back end, this is done in an interesting way since while the task has spawned an Actor (the Targeting Actor), this actor is NOT replicated. So the RPC to send the client data actually goes via the `AbilitySystemComponent`, which is part of the reason why Targeting Actors are a little peculiar to set up.

#### Target Actors

To create a new Targeting Actor, create a new child inheriting from `AGameplayAbilityTargetActor`. The two main methods you need to implement are `virtual void StartTargeting(UGameplayAbility* Ability) override` and `virtual void ConfirmTargetingAndContinue() override`.

In StartTargeting, you have the Ability Instance, so sometimes you'll pull in some information about the Ability you're visualising and targeting for from there. An example would be if you have a generic ability for building walls, you might have the type of wall available in the Ability so that the Targeting Actor can find out what mesh it should display. This is also your opportunity to get a ptr to the Avatar that activated the ability, so if anything to do with targeting is dependent on what tags or attributes the Avatar has (maybe the character's AoE size increases based on an attribute) then now is the time to grab that.

ConfirmTargetingAndContinue is where things get weird, but if we distill it down to its most simple, what we want to do is fire the `TargetDataReadyDelegate` with a payload containing our target data. So if we wanted to send down two transforms containing a source location and a destination, it's going to look something like this:

<syntaxhighlight lang="cpp"> FGameplayAbilityTargetData\_LocationInfo \*ReturnData = new FGameplayAbilityTargetData\_LocationInfo(); ReturnData->SourceLocation.LocationType = EGameplayAbilityTargetingLocationType::LiteralTransform; ReturnData->SourceLocation.LiteralTransform = FTransform(SourceLocation); ReturnData->TargetLocation.LocationType = EGameplayAbilityTargetingLocationType::LiteralTransform; ReturnData->TargetLocation.LiteralTransform = FTransform((TargetLocation - SourceLocation).ToOrientationQuat(), TargetLocation); FGameplayAbilityTargetDataHandle Handle(ReturnData); TargetDataReadyDelegate.Broadcast(Handle); </syntaxhighlight>

The key struct is `FGameplayAbilityTargetData`, which `FGameplayAbilityTargetData_LocationInfo` and other variants inherit from. So if you want to send a location or two, use `FGameplayAbilityTargetData_LocationInfo`, if you want to send some actors, use `FGameplayAbilityTargetData_ActorArray`, if you want to send a hitresult, use `FGameplayAbilityTargetData_SingleTargetHit`. These cover most common use cases, but let's assume you're a special snowflake and you want to send some other piece of data that isn't covered. Remember, this is your method for pushing data client->server for ability activation, and as such it can be tampered with by cheaters, so be really careful with what you send and what you do with it. I (/u/woppin) use this for sending a float that states how long the button has been held for. The server also has this value, but it's not exact, so it's checked against the player's ping and the value the player sent to make sure it's reasonable. You have been warned.

OK, so you still want to send some more info client->server and you understand the risks. In this example we're going to send a source and destination location, plus a float and an int. In the actual project, this is used to let the player click and drag to draw a line (source and destination) that becomes a wall, with the time the button is held (float) increasing the strength of the wall. First thing to do is to create a struct that inherits from `FGameplayAbilityTargetData`:

<syntaxhighlight lang="cpp"> USTRUCT(BlueprintType) struct FGameplayAbilityCastingTargetingLocationInfo: public FGameplayAbilityTargetData { GENERATED\_USTRUCT\_BODY()

/\*\* Amount of time the ability has been charged \*/ UPROPERTY(BlueprintReadWrite, EditAnywhere, Category = Targeting) float ChargeTime;

/\*\* The ID of the Ability that is performing targeting \*/ UPROPERTY() uint32 UniqueID;

/\*\* Generic location data for source \*/ UPROPERTY(BlueprintReadWrite, EditAnywhere, Category = Targeting) FGameplayAbilityTargetingLocationInfo SourceLocation;

/\*\* Generic location data for target \*/ UPROPERTY(BlueprintReadWrite, EditAnywhere, Category = Targeting) FGameplayAbilityTargetingLocationInfo TargetLocation;

// -------------------------------------

virtual bool HasOrigin() const override { return true; }

virtual FTransform GetOrigin() const override { return SourceLocation.GetTargetingTransform(); }

// -------------------------------------

virtual bool HasEndPoint() const override { return true; }

virtual FVector GetEndPoint() const override { return TargetLocation.GetTargetingTransform().GetLocation(); }

virtual FTransform GetEndPointTransform() const override { return TargetLocation.GetTargetingTransform(); }

// -------------------------------------

virtual UScriptStruct\* GetScriptStruct() const override { return FGameplayAbilityCastingTargetingLocationInfo::StaticStruct(); }

virtual FString ToString() const override { return TEXT("FGameplayAbilityCastingTargetingLocationInfo"); }

bool NetSerialize(FArchive& Ar, class UPackageMap\* Map, bool& bOutSuccess); };

template<> struct TStructOpsTypeTraits<FGameplayAbilityCastingTargetingLocationInfo> : public TStructOpsTypeTraitsBase2<FGameplayAbilityCastingTargetingLocationInfo> { enum { WithNetSerializer = true // For now this is REQUIRED for FGameplayAbilityTargetDataHandle net serialization to work }; }; </syntaxhighlight>

I have no idea what that last part does! In our .cpp we need to add an implementation for NetSerialize to include our new data (a float and an int):

<syntaxhighlight lang="cpp"> bool FGameplayAbilityCastingTargetingLocationInfo::NetSerialize(FArchive& Ar, class UPackageMap\* Map, bool& bOutSuccess) { SourceLocation.NetSerialize(Ar, Map, bOutSuccess); TargetLocation.NetSerialize(Ar, Map, bOutSuccess);

Ar << ChargeTime; Ar << UniqueID;

bOutSuccess = true; return true; } </syntaxhighlight>

Now we update our targeting confirmation to include new data:

<syntaxhighlight lang="cpp"> FGameplayAbilityCastingTargetingLocationInfo \*ReturnData = new FGameplayAbilityCastingTargetingLocationInfo(); ReturnData->ChargeTime = CastingCharacter->GetChargeTime(); // Get the wall strength ReturnData->UniqueID = OwningAbility->GetUniqueID(); // Ignore this FVector SourceLocation = CastingCharacter->GetCastingSourceLocation(); // Get where the character is aiming from FVector TargetLocation = CastingCharacter->GetCastingTargetLocation(); // Get where the character is aiming to ClampLocations(SourceLocation, TargetLocation); // Limit the maximum wall length

// Set Location Data ReturnData->SourceLocation.LocationType = EGameplayAbilityTargetingLocationType::LiteralTransform; ReturnData->SourceLocation.LiteralTransform = FTransform(SourceLocation); ReturnData->TargetLocation.LocationType = EGameplayAbilityTargetingLocationType::LiteralTransform; ReturnData->TargetLocation.LiteralTransform = FTransform((TargetLocation - SourceLocation).ToOrientationQuat(), TargetLocation);

FGameplayAbilityTargetDataHandle Handle(ReturnData); TargetDataReadyDelegate.Broadcast(Handle); </syntaxhighlight>

The last remaining pieces worth mentioning are firstly that you can visualise the ability in the actor as well, but how you do that is entirely up to you, and secondly you might want to re-use the targeting actor if you're rapidly re-firing the same ability over and over. Also note that if the ability is instant, the actor will spawn and then immediately be destroyed, so visualisation is a bit pointless. For visualisation generally follow the model of spawning the meshes/particles you need in StartTargeting, and then use tick to update each frame based on changes in player input. This will probably mean storing where you're aiming in the PlayerController or the Character's Tick, storing a ptr to one of those two in StartTargeting, and then Calling out to them during the TargetingActor's Tick. Of course you don't have to use tick if you're not doing analogue targeting (eg. targeting controlled by keys instead of mouse) or if you can handle a lower refresh rate and use a Timer instead.

There's quite a few examples of TargetingActors already in the Plugin, so look at them if in doubt.

Conclusion
----------

That's it! You now have a somewhat complete overview of the module's core systems, as well as their helper systems that allow better interaction between each of them.

Questions, and typo-searching would be appreciated. As would be complementing sections of this guide with knowledge and discoveries of your own should you garner enough experience to contribute, as while I feel like I have a rough overview of the module down, a lot of the fine lines of this system are still lost on me.

Once again, this guide is taken from [a post on the forums](https://forums.unrealengine.com/showthread.php?137352-GameplayAbilities-and-you) by [KZJ](https://forums.unrealengine.com/member.php?267563-KZJ), and was originally adapted for the Unreal Engine wiki by [Jay2645](/index.php?title=User:Jay2645&action=edit&redlink=1 "User:Jay2645 (page does not exist)") ([talk](/index.php?title=User_talk:Jay2645&action=edit&redlink=1 "User talk:Jay2645 (page does not exist)")).

Common Issues
-------------

**Cues not visible in packaged game**

By default, only referenced assets are included in packaged builds, and if you've set up your GameplayCues to be triggered by tags this won't be enough. GameplayCues usually inherit from one of two base classes, so they can be added to the Asset Manager like so:

[![CuePackaging.png](https://d3ar1piqh1oeli.cloudfront.net/f/fb/CuePackaging.png/940px-CuePackaging.png)](/index.php?title=File:CuePackaging.png)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=GameplayAbilities\_and\_You&oldid=69](https://wiki.unrealengine.com/index.php?title=GameplayAbilities_and_You&oldid=69)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")