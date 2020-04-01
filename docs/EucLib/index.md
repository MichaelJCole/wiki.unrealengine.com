EucLib - Epic Wiki                    

EucLib
======

  

Name

EucLib

Category

Procedural Level Design

Author

Robert Chubb - rchubbmw@gmail.org

Version

Alpha 0.0.1

UE4 Build

4.8.3

Overview
--------

A Procedural Level Design Tool. EucLib - Powered by Moxels

The goal of the tool is to enable users of unreal engine 4 to develop levels with ease. Be it with full procedural generation based on types and rules, or semi procedural where users generate something and then modify it, or just build naturally with tools to help users manage modular meshes.

EucLib is named EucLib because Euclid of Alexandria inspired me to develop a modular architectural system where users could generate all sorts of geometrical patterns. Right now for ease of development the generator is limited to a single maze type. I have many many different types of generators though, there are home generators, castle generators, city generators, maze generators, cave generators, dungeon generators, cellular automaton and more!

Right now the tool works as such, you build a set of tiles which are blueprints with static meshes. Each blueprint tile represents an area of the set, so for example i have a set of 7 base tiles, a full cube tile, floor tile, wall cap tile, wall corner tile, wall tile, wall T tile, and wall + tile.

My tiles for example are 400cm x 400cm x 400cm. Which is 13.1ft x 13.1ft x 13.1ft. A size of 300cm-400cm is great for 3D with use of Unreal provided assets as it will be in scale. You should probably use their scale anyways as it makes most sense and physics will work well. For 2D i would figure out my player size and make a static mesh plane tile that size or larger depending on how you want the game to play. I prefer square tile sets, but you are more than welcome to use non square assets like an isometric-esq game with 64x32 tiles as an example, or just weird sized tiles if you wanted.

The tiles and sizing offset is set up inside of a MoxelSet.UASSET which has a name, both x and y offset, and an array of blueprint tile actors. (no z offset for now as the tool is limited to a bi plane for ease of development, z plane will come in the future), (The order in which you add you tiles to the array of bp tiles should be in the exact order i specify as the auto tiling feature will now work other wise. I have ideas how to make your own tile orders but that won't come for some time. It's really not that big of a deal though.

The last thing you will need is a MoxelActorFactory with your MoxelSet referenced in the details of the bp. once inside your level, you can select the MoxelActoryFactory from with in the plugin window, select your generator type, modify rules and variables and either build normally with no auto tiling or with, your choice.

  
The most amazing thing about this plugin is not only does it make and help make levels for you and such but you can run something called Moxilization (disabled for now, soon to be enabled) which will convert all static meshes inside tile blueprints to an instanced static mesh instance across the entire level, so that there is only one mesh ever of one type everything is just an instance. which not only boosts performance, but you can even tell the MoxelActorFactory to premoxilize the entire factory before hand so that before it even spawns anything it will generate only instances, not blueprints.

You can find more details on the [forum](https://forums.unrealengine.com/showthread.php?83476-Procedural-Level-Designer-EucLib-Alpha-Powered-by-Moxels)

Contact
-------

If you have any Questions, Comments, Bug reports or feature requests for this plugin, or you wish to contact me you can and should email me or make a contribution to the [\[ EucLib Trello Board](https://trello.com/b/EYVshiCr/euclib)\].

[SaxonRah](/User:SaxonRah "User:SaxonRah") ([talk](/index.php?title=User_talk:SaxonRah&action=edit&redlink=1 "User talk:SaxonRah (page does not exist)")) 07:29 A.M, 9 September 2015 (EST)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=EucLib&oldid=15343](https://wiki.unrealengine.com/index.php?title=EucLib&oldid=15343)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)