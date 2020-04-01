SimpleTelemetryProvider Plugin - Epic Wiki                    

SimpleTelemetryProvider Plugin
==============================

**Rate this Plug-in:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.1+ (including, 4.2, 4.3 and 4.4)

Name

SimpleTelemetryProvider UBT Plugin

Category

Unreal Build Tool/Telemetry

Author

[Moritz "Moss" Wundke](http://www.moritzwundke.com/)

Version

v0.2

UE4 Build

4.1+ (including, 4.2, 4.3 and 4.4)

GitHub

[Repository](https://github.com/moritz-wundke/SimpleTelemetryProvider)

Forum

[Forum Discussion](https://forums.unrealengine.com/showthread.php?5500-Unreal-Build-Tool-Telemetry-Provider)

SimpleTelemetryProvider
=======================

Simple JSON-RPC 2.0 compilant telemetry provider for [UE4](https://www.unrealengine.com/)s UBT (Unreal Build Tool). The provider just sends UBT events to a hosted JSON-RPC 2.0 web service to be processed further.

For more information check the official [GitHub repository](https://github.com/moritz-wundke/SimpleTelemetryProvider).

Contents
--------

*   [1 SimpleTelemetryProvider](#SimpleTelemetryProvider)
    *   [1.1 Usage](#Usage)
    *   [1.2 Sample Back-end](#Sample_Back-end)
    *   [1.3 License](#License)
    *   [1.4 Legal info](#Legal_info)

Usage
-----

Download the provider and the sample back-end from the official [GitHub repository](https://github.com/moritz-wundke/SimpleTelemetryProvider)

To use the provider just copy the folder containing the source (SimpleTelemetryProvider) into the UnreadBuildTool in your visual Studio Solution. For Linux and Mac add the folder into the required project files.

To debug the provider set the **ue.UBT.bDebugRPCCalls** environment variable to true, you will see the requests and responses to get printed to your build log.

Once you have the folder setup you only have to change the URL and the method name (depending on your WebServer) using the following environment variables:

*   **ue.UBT.TelemetryProviderURL**
*   **ue.UBT.TelemetryProviderMethodName**
*   **ue.UBT.TelemetryProviderProjectName**

Sample Back-end
---------------

A simple JSON RPC 2.0 python server has been provided to be able to start getting your stats up and running as fast as possible. Just use the **run.\[bat|sh\]**to launch the server. The server will run by default on port 8080, check the launch script to specify a different port.

The server requires a set of prerequisite:

*   Python 2.7
*   Web.Py
*   Setuptools
*   PyMongo

To configure your mongo db connection just change the connection URL which can be found in **ubt.config.py**

License
-------

The MIT License (MIT)

Copyright (c) 2014 Moritz Wundke

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Legal info
----------

Unreal® is a trademark or registered trademark of Epic Games, Inc. in the United States of America and elsewhere.

Unreal® Engine, Copyright 1998 – 2014, Epic Games, Inc. All rights reserved.

[UE4](https://www.unrealengine.com/)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=SimpleTelemetryProvider\_Plugin&oldid=8680](https://wiki.unrealengine.com/index.php?title=SimpleTelemetryProvider_Plugin&oldid=8680)"

[Categories](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")
*   [Plug-ins](/Category:Plug-ins "Category:Plug-ins")

  ![](https://tracking.unrealengine.com/track.png)