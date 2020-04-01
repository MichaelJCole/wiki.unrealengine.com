Unreal Engine AI Tutorial - 2 - Avoidance - Epic Wiki                    

Unreal Engine AI Tutorial - 2 - Avoidance
=========================================

Authored by: Mieszko Zielinski

  
In this super quick tutorial I'll show you how to make your AI avoid each other while following paths. There are two separate ways UE4 supports AI avoidance and both are very easy to set up but the one resulting in better results has some restrictions and caveats. Let's start with the easier one (the caveats-less one).

  

### UCharacterMovementComponent's RVO

UCharacterMovementComponent has an embedded implementation of a simple RVO algorithm ([Reciprocal Velocity Obstacle](https://en.wikipedia.org/wiki/Velocity_obstacle)). To enable it just set the **UCharacterMovementComponent::bUseRVOAvoidance** flag on your AI and that's it (you can even do it in Blueprint!).

One thing you need to be aware of when using this feature is that it's navigation-agnostic which in practice means it doesn't care about navmesh and its bounds which in turn means AI can end up being pushed outside of navmesh by RVO simulation (see the T02\_Avoidance map for an example).

  

### Detour Crowd

UE4 has an integration of DetourCrowd, which is a natural thing to have since we use (modified) [Recast](http://github.com/memononen/recastnavigation) for navmesh generation. It's a lot more sophisticated then the CharacterMovementComponent's RVO and as such more complex.

The easiest way to enable DetourCrowd for your AI is to have your AI use **UCrowdFollowingComponent** for your AIController's PathFollowingComponent. You just need to do something like this:

 `AMyVeryOwnAIController::AMyVeryOwnAIController(const FPostConstructInitializeProperties& PCIP)
   : Super(PCIP.SetDefaultSubobjectClass<UCrowdFollowingComponent>(TEXT("PathFollowingComponent")))
   {
       // ...
   }` 

This is curently the only way to enable detour crowd for your project, unfortunately. It's the case since there's no way to override Actor's default subobjects in blueprints just yet. Alternatively we'll introduce an out of the box AIController that uses crowd pathfollowing. Stay tuned for more information on this topic ;)

  

### These don't cooperate!

The two avoidance methods described here do not work together. I haven't tried enabling both on a single AI so I can only imagine what would happen exactly, but since RVO works on movement component level I'd guess it will override whatever DetourCrowd tries to do.

  

### Summary

There's a lot more to cover in terms of configuring or tweaking avoidance, especially DetourCrowd, bit I would prefer to introduce stuff in bite-sized chunks. The defaults work well enough to get anyone off the ground when setting up a project, and I'll cover avoidance tweaking in one of the future, more advanced tutorials.

As always there's some [github](http://github.com/MieszkoZ/AITutorialCPP/commit/51996b803b0f1681b6b90460f7e385cfc5e5d584) goodies (not a lot this time around) and [content](http://unreal-ai-tutorial.info/repo/AITutorial02_Avoidance.zip) (just a single map) that come along. Give them a try to see UE4 avoidance in action!

Don't hesitate to share your feedback!

[Previous Tutorial](/Unreal_Engine_AI_Tutorial_-_1_-_Making_AI_Jump_as_a_Part_of_Path_Following "Unreal Engine AI Tutorial - 1 - Making AI Jump as a Part of Path Following")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Unreal\_Engine\_AI\_Tutorial\_-\_2\_-\_Avoidance&oldid=15983](https://wiki.unrealengine.com/index.php?title=Unreal_Engine_AI_Tutorial_-_2_-_Avoidance&oldid=15983)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)