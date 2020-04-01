Flathead - Epic Wiki                     

Flathead
========

(Redirected from [V8 Binding Plugin](/index.php?title=V8_Binding_Plugin&redirect=no "V8 Binding Plugin"))

  

Name

Flathead

Category

Programming Runtime.Language Binding

Author

Bob Chatman - Bob@Gneu.org

Version

RC 1

UE4 Build

4.4.1

Overview
========

This plugin binds in the V8 JavaScript runtime to the UE4 game engine, allowing you to write functions in JS that are executed by your game explicitly, leverage the event driven nature of JavaScript by adding listeners as you may have already done on the web, and even utilize some of this functionality by exposing objects from your game to modders and or other developers to extend the life of your game.

The plugin is currently in an early stage of development and not considered stable.

More information and the download link are on the [forums](https://forums.unrealengine.com/showthread.php?254-Linking-V8-(JavaScript)-to-UE4).

Installation
------------

Unzip the package into the Plugins directory of your game. To add it as an engine plugin you will need to unzip the module into the plugin directory under where you installed UE4.

Loading JS
----------

The IV8Plugin class has two static methods, one to check and see if the plugin is present, the other to get an instance of it. Once you have the instance you can load a file, as follows:

    if (IV8Plugin::IsAvailable())
    {
        IV8Plugin::Get().Load("test.js");
    }

This can be called from any location in your module. I recommend loading a global initialization file from the module's StartModule method, and that you use this opportunity to hook into any number of events that would then be fired off by the C++ code.

The Global Context
------------------

There are two global objects to note.

*   **game** takes the place of what you may have worked with on the web - console. All five levels of logging in UE4 are functions attached to this object: Log, Display, Warning, Error, Fatal. game also has a readonly version property, allowing you to query for the version of unreal engine.
*   **v8** has two readonly properties: version to query for the current version of V8 bound to the plugin; and bindingVersion which is incrementing as the API for the plugin is iterated over.

Contact
-------

If you have any Questions, Comments, Bug reports or feature requests for this plugin, or you wish to contact me you can and should email me or make a contribution to the [Trello board](https://trello.com/b/pV2sCkLo/v8-plugin-ue4).

Alternatively, you can join me in #gneu on [irc.freenode.net](irc://irc.freenode.net/gneu) or [irc.gamesurge.net](irc://irc.gamesurge.net/gneu)

[Bob Gneu](/User:Bob_Gneu "User:Bob Gneu") ([talk](/index.php?title=User_talk:Bob_Gneu&action=edit&redlink=1 "User talk:Bob Gneu (page does not exist)")) 19:49, 16 May 2014 (UTC)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Flathead&oldid=8904](https://wiki.unrealengine.com/index.php?title=Flathead&oldid=8904)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)