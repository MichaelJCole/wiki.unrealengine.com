 GitHub Sharing Hub - Epic Wiki             

 

GitHub Sharing Hub
==================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Index
-----

GitHub is a fantastic resource for sharing changes and adding new features to UE4. Though the developers cannot always implement the changes they are given from the community, you can still make the changes to the engine if you so choose. Here you can browse a list of pulls or add your own.

GitHub submission pages must include the version of UE4 it is compatible with, author's name, size, date, a link and a description. Remember, only link to github commits and pull requests that are under a fork of UnrealEngine. That will make sure that there are no conflicts with the EULA in regards to code-sharing.

**Note: If clicking on a link throws a 404 error, check to make sure you have your GitHub account associated with your Epic account as outlined [here](https://www.unrealengine.com/ue4-on-github) and are logged into GitHub. You must complete these steps in order to view forks of the Unreal Engine source.**

Title

Link

Version

Author

Size

Release

Description

Example

[https://github.com/](https://github.com/)

4.0

J. Doe

100MB

01/01/2015

This is an example

GitDepsPacker

[https://github.com/bozaro/UE4GitDepsPacker](https://github.com/bozaro/UE4GitDepsPacker)

4.7+

Artem V. Navrotskiy

1MB

10/01/2015

Unofficial utility to create \*.gitdeps.xml files for Unreal Engine 4.7+.

octobuild

[https://github.com/bozaro/octobuild](https://github.com/bozaro/octobuild)

4.8+

Artem V. Navrotskiy

1MB

23/11/2015

Compilation cache (like ccache)

Game Build

[https://github.com/EpicGames/UnrealEngine/pull/1975](https://github.com/EpicGames/UnrealEngine/pull/1975)

4.10+

Satheesh PV (ryanjon2040)

1MB

24/01/2016

BlueprintPure method that returns the type of build. This is useful for running any functions just for testing and to skip in any other build.

Toon Shading

*   4.10 [https://github.com/moritz-wundke/UnrealEngine/tree/ToonShading.4.10](https://github.com/moritz-wundke/UnrealEngine/tree/ToonShading.4.10)
*   4.13 [https://github.com/marynate/UnrealEngine/tree/4.13-toon](https://github.com/marynate/UnrealEngine/tree/4.13-toon)
*   Original PR [https://github.com/EpicGames/UnrealEngine/pull/1552](https://github.com/EpicGames/UnrealEngine/pull/1552)

4.10+

*   4.10 by [Moritz Wundke (Moss)](/index.php?title=User:Moss&action=edit&redlink=1 "User:Moss (page does not exist)")
*   4.13 by marynate
*   Original by ArneBezuijen

< 1MB

09/14/2015

Toon Shading model

4.10 Support for Xcode 7.3

[https://github.com/EpicGames/UnrealEngine/pull/2182](https://github.com/EpicGames/UnrealEngine/pull/2182)

4.10

Derek van Vliet

<1MB

24/03/2016

Resolves errors that occur when compiling 4.10 using Xcode 7.3

Menu Fix

[https://github.com/EpicGames/UnrealEngine/pull/2231](https://github.com/EpicGames/UnrealEngine/pull/2231)

4.12

Robert Khalikov

<1MB

14/04/2016

Fixes appearance of menu items that don't have icons assigned to them (follow the link to see the screenshot).

Alpha Composite Blend Mode

[https://github.com/EpicGames/UnrealEngine/pull/2114](https://github.com/EpicGames/UnrealEngine/pull/2114)

4.11+, integrated in 4.13 by Epic

[Moritz Wundke (Moss)](/index.php?title=User:Moss&action=edit&redlink=1 "User:Moss (page does not exist)")

<1MB

29/02/2016

Adding Alpha Composite aka 'pre-multiplied alpha' to the blend modes. Used in VFX such as [Diablo III](http://www.gdcvault.com/play/1017660/Technical-Artist-Bootcamp-The-VFX).

Toggle Light Propagation Volumes at Runtime

[https://github.com/EpicGames/UnrealEngine/pull/2218](https://github.com/EpicGames/UnrealEngine/pull/2218)

4.11

Michael Fortin

<1MB

15/06/2016

Allow toggling of Global Illumination through Light Propagation Volumes at runtime. Tested in 4.8 and 4.11.

Intel Hardware Metrics for DX11/12

[https://github.com/EpicGames/UnrealEngine/pull/2544](https://github.com/EpicGames/UnrealEngine/pull/2544)

4.12

[Jeff Rous (Intel)](/index.php?title=User:JeffRous&action=edit&redlink=1 "User:JeffRous (page does not exist)")

150MB

06/28/2016

Adds a stat command to get data from Intel hardware counters through a driver interface.

Additional Ease functions

[https://github.com/EpicGames/UnrealEngine/pull/1786](https://github.com/EpicGames/UnrealEngine/pull/1786)

4.8+

[Moritz Wundke (Moss)](/index.php?title=User:Moss&action=edit&redlink=1 "User:Moss (page does not exist)")

<1MB

12/17/2015

Partially merged into engine. Adds Elastic, Bounce and Back functions. Lets you customize the Amplitude, period and overshoot if the functions supports it.

Vehicle optimization via concurrent PxVehicleUpdate

[https://github.com/EpicGames/UnrealEngine/pull/2767](https://github.com/EpicGames/UnrealEngine/pull/2767)

4.15+

[Deniz Piri (Ahoy Games)](/index.php?title=User:DenizPiri&action=edit&redlink=1 "User:DenizPiri (page does not exist)")

<1MB

03/09/2017

This patch makes PxVehicleUpdate be used concurrently from multiple threads (using TaskGraph).

Override functions context menu search functionality

[https://github.com/EpicGames/UnrealEngine/pull/4227](https://github.com/EpicGames/UnrealEngine/pull/4227)

4.18+

[projectgheist](/index.php?title=User:Project.gheist&action=edit&redlink=1 "User:Project.gheist (page does not exist)")

<1MB

12/22/2017

Makes it possible to do a search query in the Override functions context menu.

Contribute!
-----------

GitHub submissions can be added to provide developers with various changes to the engine. If you'd like to add your repository to the page, please make sure to include the version, size, release date, link and a description of the changes made.

### Share your project

While creating a fork is straightforward distributing a project will require some additional steps to be guarded by the EULA. The idea we will show you is very simple, we just create a new branch in an exiting engine fork (the fork must lie within an account that has been added to Epics Organization) and get rid of the history which results in a so called orphan branch.

Create an orphan branch:

git checkout --orphan MyProjectBranch
git rm -rf .

Add your content and commit it:

git add .
git commit -m "Initial Commit"

Push it back to GitHub tracking the new branch:

git push -u origin MyProjectBranch

Now you will have a shiny new branch that has it's own history and is living in your engine fork safely guarded by the EULA.

Submitting Pull Requests
------------------------

This small guide will show you a common pipeline to submit and update your pull requests to the engines upstream (aka. main git).

#### Create a Pull Request

A pull requests is just a bunch of commits that are send the engines upstream to be integrated in the main branch. It's the main way to contribute to the engine.

Creating a pull requests is simple yet a challenge at times. One of the main errors when submitting a PR is creating it from a non clean history. What I mean by that is that you may be submitting the PR from a branch you actively work on and not only the explicit PR changes but all the differences between your branch and the one you submit the PR to will be pushed up.

So the first pull a clean version of the branch you will submit your PR to. I normally let all branches that come the upstream clean and just create my own branches from those. This way I just have to sync the clean branches (we will call them vendor branches from now on).

As an example we will use the **release** branch for our examples for now. You can also use the **master** branch it may not compile.

In case you have not set the upstream to the main git just use.

Warning: This guide does not work for pull requests. Use [https://wiki.unrealengine.com/Git\_Pull\_Requests](https://wiki.unrealengine.com/Git_Pull_Requests) instead.

git remote add upstream git@github.com:EpicGames/UnrealEngine.git

First we will switch to the **release** branch

git checkout release

or in case you haven't checked it out never ([more info remotes](https://git-scm.com/book/ch3-5.html))

git checkout -b release origin/release

So to sync your branch with the changes from the upstream we will simply pull and merge the changes.

git fetch upstream
git merge upstream/release

\[WIP\]

#### Update an existing Pull Request

\[WIP\]

Integrate into your own fork
----------------------------

The following guide will show you how to integrate a given PullRequest into your own engine fork. In this case we will try to integrate the original _Toon Shading_ PullRequest into a clean 4.10 engine fork (the code is made for 4.11+ to show you how a hard case is handled). The final version can be found here: [https://github.com/moritz-wundke/UnrealEngine/tree/ToonShading.4.10](https://github.com/moritz-wundke/UnrealEngine/tree/ToonShading.4.10).

#### What do you need

*   PR: [https://github.com/EpicGames/UnrealEngine/pull/1552](https://github.com/EpicGames/UnrealEngine/pull/1552)
*   Made of the master branch, but our branch is based on 4.10
*   You will need your own fork of the engine (I will use GitHub)

#### Setup

So first we will start of creating a 4.10 branch (using a specifc branch will give you the ability to try yourself and replicate the following steps), if you already have one then you can just skip this part and jump directlty to **Adding the PRs remote**.

git clone git@github.com:<your/github/user>/UnrealEngine.git -b 4.10

Once forked we ensure that the branch is updated to Epics 4.10 branch, when in development I always try to be as updated as possible. You may not want to update your branch but for sake of consistence I will go through the process of updating your fork.

First we will have to add a new remote that will point to the oficial UnrealEngine repository, this remote will be called upstream. Again, if you already have it configured just jump to **Adding the PRs remote**.

git remote add upstream git@github.com:EpicGames/UnrealEngine.git

Now that our upstream is setup we just merge the changes in. We can use the merge or the pull commands, if you use merge remember to fetch the latest 4.10 branch from the upstream.

git fetch upstream 4.10
git merge upstream 4.10

Some folk prefer not to merge the entire history in, so if you just want a single commit generated by the merge command just add the --squash argument

git merge upstream 4.10 --squash

Ok now we have our nice 4.10 branch, let's create a new one from it that we use to hold the PR in. Using a seperate branch will helo you integrating it and if you are activily developing it will give you a sandbox test bed to test the PR appropiatly.

git checkout -b ToonShading.4.10
git push -u origin ToonShading.4.10

Nice we now have our separate updated 4.10 branch to play with!

#### Adding the PRs remote

To pull the changes in we will have to add a new remote to our git, a PR is actually just a collection of commits of diffs from one fork onto another, this is way when you commit to a branch that you made a PR the PR will get updated with those commits.

So first we have to discover the fork that the PR was made of, in our case the Toon shading model PR comes with a set of commits [https://github.com/EpicGames/UnrealEngine/pull/1552/commits](https://github.com/EpicGames/UnrealEngine/pull/1552/commits).

Those commits will yield to [https://github.com/ArneBezuijen/UnrealEngineToonShading](https://github.com/ArneBezuijen/UnrealEngineToonShading) so adding it as a new remote would be as follows:

git remote add toonUpstream git@github.com:ArneBezuijen/UnrealEngineToonShading.git

And let us fetch the branch where the actual PR lives in

git fetch toonUpstream master

#### Cherry pick the commits

The ^ is important, if not you wont pickup A but only what comes after A

git cherry-pick A^..B

So now we have to identify the commit we want to range cherrypic (supported from git 1.7.2+, in case you have a lower version you would use rebase instead). We simply check the commit made to the PR at (in our case [https://github.com/EpicGames/UnrealEngine/pull/1552/commits](https://github.com/EpicGames/UnrealEngine/pull/1552/commits)) which results in the following commands. Unfortunatly in the case of the Toon Shading PR we can not just cherry-pick a range of commits, so we have to cherrypick them one by one and resolve any conflicts that could we could get, the good news is that our commit will be consecutive and you could squash them together later on.

git cherry-pick 311cbeb

This one is tricky (actually all are tricky), a lot of rendering and shader code has been changed in the master branch. So what we get are conflicts due to the fact that the master is ahead the 4.10 branch. Let's pickup \`DeferredhadingCommon.usf\`:

The following conflict contains changes from the PR and changes made to the master itself.

[![Conflict example.png](https://d26ilriwvtzlb.cloudfront.net/9/9e/Conflict_example.png)](/index.php?title=File:Conflict_example.png)

_A nice conflict to resolve_

So the way to filter them out is to check what the PR changed and what are changes made by Epic and only applying those from the PR.

[![Conflict solved example.png](https://d26ilriwvtzlb.cloudfront.net/e/e6/Conflict_solved_example.png)](/index.php?title=File:Conflict_solved_example.png)

_Aaaaaann it's solved_

Another change we will perform on the PR is adding new material parameters to not reuse the default ones, the PR uses a set of custom pins that will be available in newer versions of the engine but for 4.10 we better add some custom ones (the more you know). So we will resolve the following conflicts as shown.

[![Fixing pused conflic.png](https://d26ilriwvtzlb.cloudfront.net/e/e0/Fixing_pused_conflic.png)](/index.php?title=File:Fixing_pused_conflic.png)

_Tweaking and redoing_

will become

[![Some custom changes.png](https://d26ilriwvtzlb.cloudfront.net/5/5d/Some_custom_changes.png)](/index.php?title=File:Some_custom_changes.png)

_Not bad at all_

The PR contains actually a lot more commits because the original author tried to update it to newer verions of the master branch. In our case we are good to go with what we have at the moment.

You have to carefully integrate changes that come from the master branch into your own due to the fact that you may pull not only changes from the PR itself but changes made in the actual master branch. It does not help that many PRs are not only pushing only their changes, people tend to sync their fork and so their PR get's really messy and you really lose track of what are actually changes from the PR or from Epic.

[![Too much rebase.png](https://d26ilriwvtzlb.cloudfront.net/0/0b/Too_much_rebase.png)](/index.php?title=File:Too_much_rebase.png)

_Ok sometimes we might need a fresh start_

The commits we wont actually cherry-pick:

git cherry-pick 8511fb9
git cherry-pick b69ddc0
git cherry-pick ccdf074
git cherry-pick 5abf035
git cherry-pick 2849422
git cherry-pick 4b77319

Sometimes it is easier to perform the cherrypick in the same branch that the PR is based of and then squashing/pulling the final result into the desired branch.

So after all the work and fixing code let us post our final result:

[![Toon shading.png](https://d26ilriwvtzlb.cloudfront.net/b/b5/Toon_shading.png)](/index.php?title=File:Toon_shading.png)

_It was well worth the effort! Mhh that arrow is kinda pointy_

But before we are done ensure to commit and push your integration. I recommend you to push it all in a single commit, if not backtracking any possible bugs will be hell.

In case you want to check all the changes I had to make I pushed them to [https://github.com/moritz-wundke/UnrealEngine/commit/fd5c3c92947d067d0fc418211f71f87437b43d04](https://github.com/moritz-wundke/UnrealEngine/commit/fd5c3c92947d067d0fc418211f71f87437b43d04) so you will be able to just pick them and use them easily.

#### Final thoughts

When integrating engine changes it is always wise to mark those changes in some way. Now you ask why the heck should I mark those? Git will handle it for me. The answer is yes and no. Git knows about the history for sure but what if Epic decides to integrate that particular change you already merged into your own fork but you made some minor tweaks to it. So when it comes to updating to a new engine version all that conflict horror and not knowing what was from the PR, what was yours and what was done by Epics starts again without any hint.

It is common to tag any change made to the engine to avoid nasty bugs and silent changes that might go unoticed until a major bug touches the surface and those bugs come alive normally when you are stressing your game aka shipping it :)

So what I encourage you to do when changing any engine code is to add some \*start/end\* tags to your changes, also those tags should be descriptive enough to know what's all about and make it easier to spot a \*start/end\* pair. The following is an example of what is commonly used in the industry.

// --> <Compan or project tag> by <Who integrated it?> <Date here> - <Descriptoion, link to PR, commit from Epic, etc>
// ... Engine changes in here
// <-- <Compan or project tag> by <Who integrated it?> <Date here> - <Descriptoion, link to PR, commit from Epic, etc>

So the first change in \*MaterialShader.cpp\* could be tagged as follows

case MSM\_TwoSidedFoliage:   ShadingModelName \= TEXT("MSM\_TwoSidedFoliage"); break;
// --> TOON by Moss 1/1/2016 - Integrated toon shader from https://github.com/EpicGames/UnrealEngine/pull/1552
case MSM\_Toon:              ShadingModelName \= TEXT("MSM\_Toon"); break;
// <-- TOON by Moss 1/1/2016 - Integrated toon shader from https://github.com/EpicGames/UnrealEngine/pull/1552
default: ShadingModelName \= TEXT("Unknown"); break;

I hope this guide could be useful for you when it comes to integrating a community Pull Request of a feature you need and Epic might not be able to integrate any time soon.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=GitHub\_Sharing\_Hub&oldid=1043](https://wiki.unrealengine.com/index.php?title=GitHub_Sharing_Hub&oldid=1043)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Pages with ignored display titles](/index.php?title=Category:Pages_with_ignored_display_titles&action=edit&redlink=1 "Category:Pages with ignored display titles (page does not exist)")