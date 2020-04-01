HTTP Administration Plugin Tutorial - Epic Wiki                    

HTTP Administration Plugin Tutorial
===================================

Contents
--------

*   [1 HTTP Administration Plugin Tutorial](#HTTP_Administration_Plugin_Tutorial)
    *   [1.1 Requirements](#Requirements)
    *   [1.2 Skipping to the fun stuff](#Skipping_to_the_fun_stuff)
    *   [1.3 Embedded HTTP mods](#Embedded_HTTP_mods)
    *   [1.4 IModuleInterface](#IModuleInterface)
    *   [1.5 HTTPAdmin header](#HTTPAdmin_header)
    *   [1.6 HTTPAdmin source file](#HTTPAdmin_source_file)
    *   [1.7 Easy ways to improve and extend this example](#Easy_ways_to_improve_and_extend_this_example)

HTTP Administration Plugin Tutorial
===================================

This tutorial will teach you how to make a more complex C++ server-side mod for Unreal Tournament. If you have not completed [C++\_Game\_Mode\_Tutorial](/C%2B%2B_Game_Mode_Tutorial "C++ Game Mode Tutorial") or the [C++\_Mutator\_Tutorial](/C%2B%2B_Mutator_Tutorial "C++ Mutator Tutorial"), I recommend you do that first.

Requirements
------------

*   Engine version: 4.5.1
*   Skill level: intermediate C++ knowledge

Skipping to the fun stuff
-------------------------

*   There's already two C++ tutorials that go over build.cs and .uplugin file creation so I'm glossing over most things and just sticking to the things that might interest an advanced user right now.
*   You can download the files required for this tutorial at [https://github.com/knepleyp/UTHTTPAdmin](https://github.com/knepleyp/UTHTTPAdmin)
*   We'll use a slightly modified version of [https://code.google.com/p/embedded-httpd/](https://code.google.com/p/embedded-httpd/) to get the HTTP interactions done

Embedded HTTP mods
------------------

*   #include "AllowWindowsPlatformTypes.h" is required before #include <winsock.h" so types like INT and DWORD are allowed
*   #include "HTTPAdmin.h" is required in httpd.cpp because of Unreal Header Tool
*   I've set the HTTP socket to be non-blocking with ioctlsocket(server->socket, FIONBIO, &nonblock);
*   The server is set to Cache-Control: no-cache everything by default. This really isn't what we want. Everything but our json should get cached for at least an hour. Modified httpresponse\_response to make that happen.

IModuleInterface
----------------

*   Inside HTTPAdminPlugin, we have our IModuleInterface class that the Plugin Manager will create
*   Note that unlike the previous example, we use StaticConstructObject to create a UHTTPAdmin object
*   Also of note is that immediately after construction, Init() is called which happens to flag the UHTTPAdmin object to be in the root set and avoid garbage collection. This is very important.

HTTPAdmin header
----------------

*   Our UHTTPAdmin class inherits from FTickableGameObject which means the engine will call our ::Tick() every frame
*   We've set our class to Config=HTTPAdmin, this will cause Plugins\\HTTPAdmin\\Config\\DefaultHTTPAdmin.ini to be loaded at runtime and fill out our UPROPERTY(Config) variables

HTTPAdmin source file
---------------------

*   Once again, note that ::Init() flags the object as root set so that it won't get garbage collected, that's very important.
*   Due to the way Embedded HTTP works, we had to supply it a static function pointer and pass our classes's this pointer to it. StaticHTTPHandler calls back into our class's this pointer later.
*    ::HTTPHandler() does a simple version of HTTP Basic Authentication if the config variable bRequireAuth is set.
*   The HTTP argument "consolecommand" is fetched from either HTTP form POST or GET and then sent to GEngine->Exec()
*   Any json request is piped into the function PrepareAdminJSON(). PrepareAdminJSON() assembles some relevant server information into a JSON object for easy consumption from admin.html's XMLHTTPRequest.
*   The remainder of ::HTTPHandler() serves data files given certain file extensions

Easy ways to improve and extend this example
--------------------------------------------

*   The HTTP server used is not well suited for world facing applications. It is most likely insecure to buffer overflows and doesn't have threading to handle malicious spam attacks. Updating to a HTTPd implementation that's more robust is recommended. Mongoose may be a good alternative for those doing non-commercial plugins.
*   Hook up kick and ban buttons
*   Make kick and ban do POST requests instead of GET requests
*   Mutator enabling and disabling via web request
*   Map list changing via web request
*   Add some more variables to the JSON output

Retrieved from "[https://wiki.unrealengine.com/index.php?title=HTTP\_Administration\_Plugin\_Tutorial&oldid=10612](https://wiki.unrealengine.com/index.php?title=HTTP_Administration_Plugin_Tutorial&oldid=10612)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")

  ![](https://tracking.unrealengine.com/track.png)