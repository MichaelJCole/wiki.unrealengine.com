 RPC Client Server Messages Example - Epic Wiki             

 

RPC Client Server Messages Example
==================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Audience](#Audience)
*   [2 Use Case](#Use_Case)
*   [3 Two Implementations](#Two_Implementations)
*   [4 Implementation Option 1 - events by BPs](#Implementation_Option_1_-_events_by_BPs)
*   [5 Implementation Option 2 - all events by code](#Implementation_Option_2_-_all_events_by_code)
*   [6 Open points](#Open_points)
*   [7 Appendix, some tests to check how RPC client/server works](#Appendix.2C_some_tests_to_check_how_RPC_client.2Fserver_works)

Audience
--------

This tutorial is intended for people who are developing a game with a [dedicated server](/index.php?title=Dedicated_Server_Guide_(Windows_%26_Linux) "Dedicated Server Guide (Windows & Linux)") and want to have client BPs send messages to server and then parse the data server side with C++, send back an answer to the client and continue the logic with BPs.

Use Case
--------

I'm going to demonstrate the following use case:

*   On the client, inside a Blue Print Graph, get some text the user has typed in an edit box
*   Send this text to the server
*   On the server manipulate this text in a C++ function.
*   On the server from C++ send back a message to the client.
*   On the client get the response as a Blue Print event, and implement the rest of the logic in the BP

Two Implementations
-------------------

I've found two possible ways to implement the use case above. One which is mainly BluePrint based, and allows to have only one method server side code in C++, the rest is in BPs.

A second possibility is to have all events coded in C++. This is useful if you need specific code at any point in the sequence of events.

Implementation Option 1 - events by BPs
---------------------------------------

The first two steps are the same as the Implementation 2. You can find it here just for completion. The only different is that for this version I used another screen (CharCreationQuick).

*   I have a widget which is one of character creation screens of our game (CharCreationQuick). This is where the call to server starts to ask for population of some fields with server information.

*   I create a variable (CharCreateQuickWidget) in my PlayerController BP, which we will use later. Its of type CharCreationQuick (which is the name of my UI Widget).

[![Rpc bp0.jpg](https://d26ilriwvtzlb.cloudfront.net/d/dd/Rpc_bp0.jpg)](/index.php?title=File:Rpc_bp0.jpg)

*   In the (CharCreationQuick) Widget BP, I edit the construction method to fill the variable (CharCreateRaceWidget) in playercontroller with this widget reference

[![Rpc bp1.jpg](https://d26ilriwvtzlb.cloudfront.net/9/9a/Rpc_bp1.jpg)](/index.php?title=File:Rpc_bp1.jpg)

*   In the PlayerController BP we add two custom events, one replicated "Executes on Server" and "Reliable", which will call the function we implemented server side in the PlayerController class. Another custom event which is replicated "Executes on Owning Client" and "Reliable", which will be called by the server and executes on client.

[![Rpc bp3.jpg](https://d26ilriwvtzlb.cloudfront.net/f/f4/Rpc_bp3.jpg)](/index.php?title=File:Rpc_bp3.jpg)

*   The only method to implement server side is getAllPathsInfo(). In the .h I have this code:

   UFUNCTION(BlueprintCallable, Category = "Character Creation")
   TArray<FPathDefinition> getAllPathsInfo();

In the .cpp this code:

   TArray<FPathDefinition> APlaneshiftPlayerControllerBase::getAllPathsInfo() {
       return charCreationManager->getPathDefinitions();
   }

Please disregard the return type, you can just use a FString. In my case I needed a struct to contain more data.

*   In the BluePrint of the CharCreationQuick screen we implement a custom event called "Receive Path Definitions", which executes on client and reliable. This one will be called just within the client side from the player controller. The reason to do this is that we want to develop the rest of the logic inside the Char Creation UI.

[![Rpc bp2.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c9/Rpc_bp2.jpg)](/index.php?title=File:Rpc_bp2.jpg)

Note: trying to call the server method GetAllPathInfos directly from the CharCreation UI BP will fail

Note2: trying to call the event Receive Path Definitions directly from server side will fail as it will not be able to resolve the reference to the Widget. SO we need first to call a client side method inside PlayerController, and then call the event in the UI screen.

Implementation Option 2 - all events by code
--------------------------------------------

*   I have a widget which is the character creation screen of our game (CharCreationRace), in this widget a button (btnAdvanced)
*   I create a variable (CharCreateRaceWidget) in my PlayerController BP, which we will use later. Its of type CharCreationRace (which is the name of my UI Widget).

[![RPC example 1.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c2/RPC_example_1.jpg)](/index.php?title=File:RPC_example_1.jpg)

*   In the (CharCreationRace) Widget BP, I edit the construction method to fill the variable (CharCreateRaceWidget) in playercontroller with this widget reference

[![RPC example 2.jpg](https://d26ilriwvtzlb.cloudfront.net/b/be/RPC_example_2.jpg)](/index.php?title=File:RPC_example_2.jpg)

*   Implement a server method in PlayerController which will handle our logic, in my case it's inside PlaneShiftPlayerControllerBase.h

*   Server\_HandleName is the one called by the client and executed on server, which we will use in our BP below.

   // Checks for name validity
   UFUNCTION(Server, Reliable, BlueprintCallable, WithValidation, Category = "Character Creation")
   void Server\_HandleName(const FString& firstName, const FString& lastName);

*   Client\_HandleName is the one we use to give back the control to the client sending our results.

   // Replies with name validity to client
   UFUNCTION(Client, Reliable, Category = "Character Creation")
   void Client\_HandleName(const bool result, const FString& error);

*   OnHandleName is used to trigger an event node on the client side (red node) we can use to restart our implementation in the BP graph as soon as the server has completed his work.

   // Event to connect to BP on client side
   UFUNCTION(BlueprintImplementableEvent, Category = "Character Creation")
   void OnHandleName(const bool result, const FString& error);

  

*   Implement the methods in PlaneShiftPlayerControllerBase.cpp
*   Server\_HandleName\_Implementation executes your logic on the server to parse whatever inputs the client has sent. When finished, this method calls the function Client\_HandleName. This is actually passing back the control to the client.

 void APlaneshiftPlayerControllerBase::Server\_HandleName\_Implementation(const FString& firstName, const FString& lastName) {
   UE\_LOG(LogTemp, Error, TEXT("APlaneshiftPlayerControllerBase::Server\_HandleName %s %s"), \*firstName, \*lastName);
   // executes on server (implement here your logic)
   charCreationManager->HandleName(this, firstName, lastName);
   // calls the client
   //this->Client\_HandleName(true, "here is your error boy.");
 }

*   Server\_HandleName was flagged "WithValidation" and so we need to implement Server\_HandleName\_Validate

 bool APlaneshiftPlayerControllerBase::Server\_HandleName\_Validate(const FString& firstName, const FString& lastName) { return true; };

*   Inside Client\_HandleName\_Implementation method we are now on the client side, and we want to trigger the event we will catch in the blueprint.

 void APlaneshiftPlayerControllerBase::Client\_HandleName\_Implementation(const bool result, const FString& error)
 {
   UE\_LOG(LogTemp, Error, TEXT("APlaneshiftPlayerControllerBase::Client\_HandleName\_Implementation %s"), \*error);
   // triggers the event client side
   this->OnHandleName(result, error);
   // implement in BP graph.
 }

*   At this point we need just to implement the click of the button in our (CharCreationRace) BP, which will call the server function Server\_HandleName. In my case it gets two input fields as parameters from the UI with first name and last name.

[![RPC example 3.jpg](https://d26ilriwvtzlb.cloudfront.net/2/27/RPC_example_3.jpg)](/index.php?title=File:RPC_example_3.jpg)

*   Then we catch the event in the PlaneShiftPlayerController. To do this be sure to be in the PlayerController BP, you will not see this node from any other BP, search for "Add Event" and then "Event On Handle Name".

[![RPC example 4.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3f/RPC_example_4.jpg)](/index.php?title=File:RPC_example_4.jpg)

*   Here we use the CharCreateRaceWidget variable we created at the beginning, to get a reference to our UI widget on which we pressed the button and do whatever we need to, like give a message to the user, go to the next widget or else.

If you look at what's happening in the logs...

Server side log:  
\[2017.02.23-23.42.33:321\]\[824\]LogTemp:Error: APlaneshiftPlayerControllerBase::Server\_HandleName

Client side log:  
\[2017.02.23-23.42.33:331\]\[643\]LogTemp:Error: APlaneshiftPlayerControllerBase::Client\_HandleName\_Implementation here is your error boy.  
\[2017.02.23-23.42.33:331\]\[643\]LogBlueprintUserMessages: \[PlaneshiftPlayerController\_C\_0\] here is your error boy.  
\[2017.02.23-23.42.33:331\]\[643\]LogBlueprintUserMessages: \[PlaneshiftPlayerController\_C\_0\] You got a name validated by the server  

Open points
-----------

*   It's not intuitive to have some BPs in the UI graph and some in the player controller just to manage one single "transaction".
*   Is there a way to avoid going through PlayerController for all those calls, it means the player controller class will be pretty cluttered by function calls related to the UI
*   Is this the best way to achieve the results? Are there other ways?

Appendix, some tests to check how RPC client/server works
---------------------------------------------------------

This appendix just captures some tests I did to understand how RPC works, and I hope it will save you some time.

In particular consider the following BP:

[![RPC some tests.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e9/RPC_some_tests.jpg)](/index.php?title=File:RPC_some_tests.jpg)

  
and the following code:

in PlayerControllerBase.h

   UFUNCTION(Server, Reliable, BlueprintCallable, WithValidation, Category = "Character Creation")
   void Server\_HandleCharDelete(const FString& charName);

in PlayerControllerBase.cpp

 void APlaneshiftPlayerControllerBase::Server\_HandleCharDelete\_Implementation(const FString& charName) {
   UE\_LOG(LogTemp, Error, TEXT("APlaneshiftPlayerControllerBase::Server\_HandleCharDelete %s"),\*charName);
   FPlatformProcess::Sleep(5);
   UE\_LOG(LogTemp, Error, TEXT("APlaneshiftPlayerControllerBase::Server\_HandleCharDelete %s"), \*charName);
 }

In the server function we just have the server wait for 5 seconds to simulate some calculations.

When clicking on the button in the UI, the log server side is the following:

\[2017.02.23-23.07.45:464\]\[954\]LogTemp:Error: APlaneshiftPlayerControllerBase::Server\_HandleCharDelete first call  
\[2017.02.23-23.07.50:465\]\[954\]LogTemp:Error: APlaneshiftPlayerControllerBase::Server\_HandleCharDelete first call  
\[2017.02.23-23.07.50:465\]\[954\]LogTemp:Error: APlaneshiftPlayerControllerBase::Server\_HandleCharDelete second call  
\[2017.02.23-23.07.55:467\]\[954\]LogTemp:Error: APlaneshiftPlayerControllerBase::Server\_HandleCharDelete second call  

the log client side is the following:

\[2017.02.23-23.07.45:462\]\[268\]LogBlueprintUserMessages: \[CharCreationRace\_C\_0\] clicked btnQuick  
\[2017.02.23-23.07.45:462\]\[268\]LogBlueprintUserMessages: \[CharCreationRace\_C\_0\] after server call  
\[2017.02.23-23.07.45:462\]\[268\]LogBlueprintUserMessages: \[CharCreationRace\_C\_0\] Call server event  

Please take a look at the timestamps.

Takeaways:

*   The client BP will not wait the execution of the server call, it will just execute all the nodes which are after it, so it's pointless to continue with more BPs in the first branch.
*   Even if the Event Get My Answer is flagged as "Run on Server", this doesn't mean the next BP nodes will be executed on server, in fact our "Call server event" is printed on the client log.
*   Server calls must have "void" as return argument, because are executed asyncronously from the client, so we cannot get an immediate result from that function call.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=RPC\_Client\_Server\_Messages\_Example&oldid=759](https://wiki.unrealengine.com/index.php?title=RPC_Client_Server_Messages_Example&oldid=759)"