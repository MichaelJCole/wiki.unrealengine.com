Atlas - Epic Wiki                    

Atlas
=====

  

Name

Atlas

Category

Security.Tracking

Author

Bob Chatman - Bob@Gneu.org

Version

RC 1

UE4 Build

4.4.1

Overview
--------

Atlas provides a rudimentary form of tracking and logging for your UE4 title. There are two parts, the UE4 plugin (the titan) and the server (a celestial sphere). The plugin is responsible for sending the beacons and identifying the user to the server, and the server handles aggregation, caching and state maintenance.

Alpha Lock
----------

Each title added to the server provides the manager with the ability to set a default access ability to any unauthorized user – Allow Game, Allow Editor. The plugin sends the users credentials and allows your title to act on the response, either exiting immediately or executing a method to allow you to update your UI, change values or do something more fun like blow up someone’s avatar.

Server, State Maintenance, Data Aggregation & Caching
-----------------------------------------------------

The server allows for editing of the values and reviewing state. From a single view you can see when a given user last used your title, update their access and or remove them from the listing and revert them to anonymous usage.

The reporting portion of the tool is not mature enough to be worthy of documenting. More details will be shared as the application grows. You can see a sample of the server here: atlas.gneu.org.

Everything is functional as of now. There is a lot of flexibility built into it already, so customizing the beacons, reporting and such is definitely a realistic expectation.

You can find more details on the [forum](https://forums.unrealengine.com/showthread.php?40896-Atlas-Alpha-Lock-Custom-Analytics-amp-Tracking-for-UE4)

Contact
-------

If you have any Questions, Comments, Bug reports or feature requests for this plugin, or you wish to contact me you can and should email me or make a contribution to the [Trello board](https://trello.com/b/pV2sCkLo/v8-plugin-ue4).

Alternatively, you can join me in #gneu on [irc.freenode.net](irc://irc.freenode.net/gneu) or [irc.gamesurge.net](irc://irc.gamesurge.net/gneu)

[Bob Gneu](/User:Bob_Gneu "User:Bob Gneu") ([talk](/index.php?title=User_talk:Bob_Gneu&action=edit&redlink=1 "User talk:Bob Gneu (page does not exist)")) 07:09, 16 September 2014 (UTC)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Atlas&oldid=9077](https://wiki.unrealengine.com/index.php?title=Atlas&oldid=9077)"

[Category](/Special:Categories "Special:Categories"):

*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)