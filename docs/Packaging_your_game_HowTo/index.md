How to package your game with commands - Epic Wiki               

How to package your game with commands
======================================

From Epic Wiki

(Redirected from [Packaging your game HowTo](/index.php?title=Packaging_your_game_HowTo&redirect=no "Packaging your game HowTo"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

This aims to be a quick guide on how to package and distribute your game.

Some points:

*   If you use unreferenced blueprints/objects, you should add them a) using command line or b) by creating a level with all the objects you need to publish in your game (not recomended)
*   Cooking is the proccess of removing unwanted files from your final build
*   You can choose to Pak (like zip) all your content into a single file
*   If you are building a dedicated server, you need to have the compiled version of Unreal or will not work.
*   You will find the RunUAT at UnrealEngine/Engine/Build/BatchFiles
*   Add the command -Build if you're using Source Version from Github

**Compiling the client (With PAK files):**

RunUAT BuildCookRun \-project\="full\_project\_path\_and\_project\_name".uproject \-noP4 \-platform\=Win64 \-clientconfig\=Development \-serverconfig\=Development \-cook \-maps\=AllMaps \-compile \-stage \-pak \-archive \-archivedirectory\="Output Directory"

**Cooking the client (With PAK files):**

RunUAT BuildCookRun \-project\="full\_project\_path\_and\_project\_name".uproject \-noP4 \-platform\=Win64 \-clientconfig\=Development \-serverconfig\=Development \-cook \-maps\=AllMaps \-NoCompile \-stage \-pak \-archive \-archivedirectory\="Output Directory"

**Compiling the dedicated server (With PAK files):**

RunUAT BuildCookRun \-project\="full\_project\_path\_and\_project\_name".uproject \-noP4 \-platform\=Win64 \-clientconfig\=Development \-serverconfig\=Development \-cook \-server \-serverplatform\=Win64 \-noclient \-compile \-stage \-pak \-archive \-archivedirectory\="Output Directory"

**Cooking the dedicated server (With PAK files):**

RunUAT BuildCookRun \-project\="full\_project\_path\_and\_project\_name".uproject \-noP4 \-platform\=Win64 \-clientconfig\=Development \-serverconfig\=Development \-cook \-server \-serverplatform\=Win64 \-noclient \-NoCompile \-stage \-pak \-archive \-archivedirectory\="Output Directory"

Retrieved from "[https://wiki.unrealengine.com/index.php?title=How\_to\_package\_your\_game\_with\_commands&oldid=8277](https://wiki.unrealengine.com/index.php?title=How_to_package_your_game_with_commands&oldid=8277)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")