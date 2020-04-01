 Third Party Socket Server Connection - Epic Wiki             

 

Third Party Socket Server Connection
====================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)") We’ve been quietly working on our new game here at OSnap! Games and one of the features our new game will include is a lobby system where all players can chat among one another. The UE4 dedicated server is great for a game server but it’s overkill for something as simple as a chat server so we set out to get UE4 connecting to a third party socket server.

Contents
--------

*   [1 Creating the Socket](#Creating_the_Socket)
*   [2 Preparing the Address](#Preparing_the_Address)
*   [3 Sending a Message](#Sending_a_Message)
*   [4 Dependency in Build.cs](#Dependency_in_Build.cs)

### Creating the Socket

The first step in getting UE4 connected to a third party server is initializing a socket.

FSocket\* Socket = ISocketSubsystem::Get(PLATFORM\_SOCKETSUBSYSTEM)->CreateSocket(NAME\_Stream, TEXT("default"), false);

The parameters are as follows

1.  Type
2.  Description
3.  ForceUDP

  In our case we're connecting using TCP so we've set ForceUDP to false.

### Preparing the Address

The next part is getting the address you wish to connect to ready. Epic provides the tools to get this done quickly.

FIPv4Address ip(127, 0, 0, 1);

TSharedRef<FInternetAddr> addr = ISocketSubsystem::Get(PLATFORM\_SOCKETSUBSYSTEM)->CreateInternetAddr();
addr->SetIp(ip.Value);
addr->SetPort(7776);

Now that your address is ready to go you simply have to tell UE4 to start the connection.

bool connected = Socket->Connect(\*addr);

If connected is true you've successfully connected to your socket server!

### Sending a Message

Alright, so you're connected but how do you send messages to it? A lot of that is up to you. Depending on your server there are different ways to serialize and send a message. The important part though is how does UE4 handle it.

First things first, we must prepare the message to be sent.

FString serialized = TEXT("loadPlayer|1");
TCHAR \*serializedChar = serialized.GetCharArray().GetData();
int32 size = FCString::Strlen(serializedChar);
int32 sent = 0;

What's going on in the above? We're sending a message to a socket server with the type "loadPlayer" and a single parameter of 1. What is happening in UE4 here is we're taking an FString, and turning it into a TCHAR\*.

Finally, with the message formatted we can send it to our server!

bool successful = Socket->Send((uint8\*)TCHAR\_TO\_UTF8(serializedChar), size, sent);

Sending data in UE4 requires it to be a uint8\* and again, Epic provides the tools to get from TCHAR\* to UTF8 which can be sent as a uint8\*.

As far as reading data back from your socket server the key is in the functions [HasPendingData](https://docs.unrealengine.com/latest/INT/API/Runtime/Sockets/FSocket/HasPendingData/index.html) and [Recv](https://docs.unrealengine.com/latest/INT/API/Runtime/Sockets/FSocket/Recv/index.html) of the [FSocket](https://docs.unrealengine.com/latest/INT/API/Runtime/Sockets/FSocket/index.html) class.

### Dependency in Build.cs

One final thing to take note of. Inside your project's Build.cs file you'll need to add the "Sockets" package as a dependency in PublicDependencyModuleNames.

PublicDependencyModuleNames.AddRange(
   new string\[\]
   {
      "Core",
      "CoreUObject",
      "Engine",
      "Sockets"
   }
);

Reposted from [http://www.osnapgames.com/2014/05/24/connecting-to-a-third-party-socket-server-in-unreal-engine-4/](http://www.osnapgames.com/2014/05/24/connecting-to-a-third-party-socket-server-in-unreal-engine-4/)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Third\_Party\_Socket\_Server\_Connection&oldid=339](https://wiki.unrealengine.com/index.php?title=Third_Party_Socket_Server_Connection&oldid=339)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")