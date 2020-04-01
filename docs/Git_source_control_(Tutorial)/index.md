 Git source control (Tutorial) - Epic Wiki             

 

Git source control (Tutorial)
=============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

As requested by the UE4 Twitch stream community, I have written a step-by-step guide on how to properly setup and handle binary files using Git in an Unreal Engine 4 production environment.

* * *

**NOTE:** Below is a **work-in-progress** guide to setting up Git in a UE4 production environment.

* * *

Contents
--------

*   [1 Overview](#Overview)
*   [2 Learn Git](#Learn_Git)
*   [3 Setting up Git](#Setting_up_Git)
*   [4 Setting up Git Source Control in Editor](#Setting_up_Git_Source_Control_in_Editor)
*   [5 Workarounds for dealing with binary files on your Git repository](#Workarounds_for_dealing_with_binary_files_on_your_Git_repository)
*   [6 Recommended branching workflow](#Recommended_branching_workflow)
*   [7 Git Optimizations](#Git_Optimizations)
*   [8 Recommended Git GUI's](#Recommended_Git_GUI.27s)
*   [9 See also](#See_also)

Overview
--------

Git is a distributed revision control and source code management (SCM) system with an emphasis on speed, data integrity, and support for distributed, non-linear workflows. Git was initially designed and developed by **Linus Torvalds** for Linux kernel development in 2005, and has since become the most widely adopted version control system for software development.

As with most other distributed revision control systems, and unlike most client–server systems, every Git working directory is a full-fledged repository with complete history and full version-tracking capabilities, independent of network access or a central server. Like the Linux kernel, Git is free software distributed under the terms of the **GNU General Public License** version 2.

**Source:** [Wikipedia](http://en.wikipedia.org/wiki/Git_(software))

  

Learn Git
---------

\- **[About Git](http://git-scm.com/about)**

\- **[Atlassian Git](https://www.atlassian.com/git/)**

\- **[Git Documentation](http://git-scm.com/doc)**

\- **[Got 15 minutes and want to learn Git?](https://try.github.io/levels/1/challenges/1)**

\- **[How to handle big repositories with git](http://blogs.atlassian.com/2014/05/handle-big-repositories-git/)**

  

Setting up Git
--------------

**Hosted/Cloud Options**

\- **[GitHub](https://github.com/)**

\- **[Bitbucket](https://bitbucket.org/)**

\- **[Visualstudio.com](https://www.visualstudio.com/team-services/pricing/)** Use with VS or any git client.

\- **[Assembla](https://www.assembla.com/)**

\- **[GitLab](https://about.gitlab.com/)**

\- **[CodeBase](https://www.codebasehq.com/)**

\- **[CloudForge](http://www.cloudforge.com/features)**

**Behind-the-Firewall Options/Local**

\- **[Gogs](https://gogs.io/)** - INTERMEDIATE

\- **[Atlassian Stash](https://www.atlassian.com/software/stash)** - INTERMEDIATE

\- **[GitHub Enterprise](https://enterprise.github.com/home)** - INTERMEDIATE

\- **[GitLab Community Edition](https://about.gitlab.com/downloads)** - INTERMEDIATE

\- **[Setting Up the Server](http://git-scm.com/book/en/v2/Git-on-the-Server-Setting-Up-the-Server)** - ADVANCED

Setting up Git Source Control in Editor
---------------------------------------

Note: If your command line does not recognize the 'git' command, you have not installed any git command line tools. The Git plugin can still pick up a git executable shipped by some common tools (SmartGit, SourceTree and GitHub for Windows).

1.  The Git Plugin 1.0 (beta) is installed and enabled by default since UE4.7!
2.  On the Toolbar, "Source Control" menu, select "Connect to Source Control"
3.  Select **Git** from the drop-down.
4.  If you've installed [Git](http://git-scm.com/downloads) the **Git Executable** should've been auto-detected, otherwise you need to specify the full location of the Git **executable** on the Field "Git Path" (Git.exe on Windows, may be just Git elsewhere, for example: _D:\\Progs\\Git\\bin\\git.exe_).
5.  If your project is already a Git repository, is should be auto-detected. Else, since UE4.8 you have the option to "**Initialize project with Git**". By default, this will also create a proper ".gitignore" file. Since UE4.13 you now also have the option to **make the initial commit** (with the uproject file, and the content of Config/Content/Sources folders)
    *   Note: In UE4.7 you had to intialize yourself your project with 'git init' and create a proper .gitignore file by yourself.
    *   Note: Before UE4.13 you had to make the initial commit with all appropriate files.
6.  Press the **Accept Settings** button to enable the Git source control provider.
7.  Congratulations! You're ready to start using **Git Source Control in editor** :)

You now have direct access for submitting & receiving work directly in editor. If you need further information on what each **Asset Status Icon** means, than to read this [step-by-step guide](https://docs.unrealengine.com/latest/INT/Engine/UI/SourceControl/index.html#statusicons).

Workarounds for dealing with binary files on your Git repository
----------------------------------------------------------------

**\[RECOMMENDED\] [git-lfs](https://github.com/github/git-lfs)** - Git Git Large File Storage (LFS) is a command line extension for managing large files with Git. The client is written in Go, with pre-compiled binaries available for Mac, Windows, Linux, and FreeBSD.

**NOTE:** Git LFS is on its way to becoming the industry standard for handling large binary files in Git. With a large community of developers & users of Git LFS both big & small even [GitHub.com is planning](https://github.com/blog/1986-announcing-git-large-file-storage-lfs) to make Git LFS a default for all its hosted repositories.

**[git-annex](https://git-annex.branchable.com)** - git-annex allows managing files with git, without checking the file contents into git. While that may seem paradoxical, it is useful when dealing with files larger than git can currently easily handle, whether due to limitations in memory, time, or disk space.

**NOTE:** git-annex is a far more comprehensive solution, but with less transparent workflow and with more dependencies.

**[git-fat](https://github.com/jedbrown/git-fat)** - A simple way to handle fat files without committing them to git, supports synchronization using rsync.

**[git-media](https://github.com/schacon/git-media)** - GitMedia extension allows you to use Git with large media files without storing the media in Git itself.

**NOTE:** git-media adopts a similar approach to git-fat, but with a different synchronization philosophy and with many Ruby dependencies.

Recommended branching workflow
------------------------------

**[git-flow](http://nvie.com/posts/a-successful-git-branching-model/)** - The [Gitflow Workflow](http://nvie.com/posts/a-successful-git-branching-model/) section below is derived from Vincent Driessen at [nvie](http://nvie.com/).

The Gitflow Workflow defines a strict branching model designed around the project release. While somewhat more complicated than the [Feature Branch Workflow](https://www.atlassian.com/git/workflows#!workflow-feature-branch), this provides a robust framework for managing larger projects.

This workflow doesn’t add any new concepts or commands beyond what’s required for the [Feature Branch Workflow](https://www.atlassian.com/git/workflows#!workflow-feature-branch). Instead, it assigns very specific roles to different branches and defines how and when they should interact. In addition to feature branches, it uses individual branches for preparing, maintaining, and recording releases. Of course, you also get to leverage all the benefits of the Feature Branch Workflow: pull requests, isolated experiments, and more efficient collaboration.

**Source:** [Atlassian Git Tutorials](https://www.atlassian.com/git/workflows#!workflow-gitflow)

Git Optimizations
-----------------

After a while, you may notice that your Git commits and all that would be a tad slow and your local repository size may end up having incredibly slow commits, pushes and other Git operations. This section is meant for those who just want to get working with Git and do not want to expend too much effort with the workarounds detailed previously.

One of the basic command that helps speed things up (not necessarily makes the local repository smaller) is :

git repack -a -d --window=250 --depth=250

Details of Command

Repack

This command is used to combine all objects that do not currently reside in a "pack", into a pack. It can also be used to re-organize existing packs into a single, more efficient pack.

A pack is a collection of objects, individually compressed, with delta compression applied, stored in a single file, with an associated index file.

Packs are used to reduce the load on mirror systems, backup engines, disk storage, etc.

\-a

Instead of incrementally packing the unpacked objects, pack everything referenced into a single pack. Especially useful when packing a repository that is used for private development. Use with -d. This will clean up the objects that git prune leaves behind, but git fsck --full --dangling shows as dangling.

Note that users fetching over dumb protocols will have to fetch the whole new pack in order to get any contained object, no matter how many other objects in that pack they already have locally.

\-d

After packing, if the newly created packs make some existing packs redundant, remove the redundant packs. Also run git prune-packed to remove redundant loose object files.

Note: This will ensure that redundant packs are consolidated to reduce space needed for your local repository.

\--window=250

These two options affect how the objects contained in the pack are stored using delta compression. The objects are first internally sorted by type, size and optionally names and compared against the other objects within --window to see if using delta compression saves space. --depth limits the maximum delta depth; making it too deep affects the performance on the unpacker side, because delta data needs to be applied that many times to get to the necessary object. The default value for --window is 10 and --depth is 50.

**More information on this : [http://stackoverflow.com/questions/14842127/how-to-use-git-repack-a-d-depth-250-window-250](http://stackoverflow.com/questions/14842127/how-to-use-git-repack-a-d-depth-250-window-250)**

\--depth=250

The command above should help make Git operations faster without resorting to the workarounds described earlier.

A good discussion and also notes on how to handle repositories with large files/blobs:

[http://stackoverflow.com/questions/6884331/git-repo-still-huge-after-large-files-removed-from-repository-history](http://stackoverflow.com/questions/6884331/git-repo-still-huge-after-large-files-removed-from-repository-history)

The method detailed here and also those in the linked articles within this section show that it is still possible to attain reasonable sizes and also performance simply by playing around with commands and so forth. This again, is ideal for people who want to just get started and do not necessarily want to perform the workarounds via git-annex and all that.

Recommended Git GUI's
---------------------

**[SourceTree](http://www.sourcetreeapp.com/) \[RECOMMENDED FOR BEGINNERS & ARTISTS\]**

**Platforms:** Windows & Mac

**Price:** Free

**[GitKraken](http://www.gitkraken.com/)** NEW! **\[RECOMMENDED FOR BEGINNERS & ARTISTS\]**

**Platforms:** Windows, Mac & Linux

**Price:** Free

**Note:** Git LFS not yet supported

**[SmartGit](http://www.syntevo.com/smartgit/)**

**Platforms:** Windows, Mac & Linux

**Price:** $79/user / Free for non-commercial use

**[TortoiseGit](https://tortoisegit.org) \[RECOMMENDED FOR PROGRAMMERS & TECHNICAL ARTISTS\]**

**Platforms:** Windows Explorer extension

**Price:** Free

**[Git Extensions](https://code.google.com/p/gitextensions/)**

**Platforms:** Windows & Linux

**Price:** Free

**[Git Tower](http://www.git-tower.com/)**

**Platforms:** Windows & Mac (**UPDATE:** Recently released on Windows)

**Price:** $59/user (Free 30 day trial)

See also
--------

*   [GitHub Desktop to manage your project](/index.php?title=GitHub_Desktop_to_manage_your_project "GitHub Desktop to manage your project")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Git\_source\_control\_(Tutorial)&oldid=31](https://wiki.unrealengine.com/index.php?title=Git_source_control_(Tutorial)&oldid=31)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Version Control](/index.php?title=Category:Version_Control&action=edit&redlink=1 "Category:Version Control (page does not exist)")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")