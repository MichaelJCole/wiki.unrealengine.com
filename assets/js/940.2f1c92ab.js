(window.webpackJsonp=window.webpackJsonp||[]).push([[940],{667:function(e,t,r){"use strict";r.r(t);var a=r(28),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("p",[e._v("RPC Client Server Messages Example - Epic Wiki")]),e._v(" "),r("h1",{attrs:{id:"rpc-client-server-messages-example"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#rpc-client-server-messages-example"}},[e._v("#")]),e._v(" RPC Client Server Messages Example")]),e._v(" "),r("p",[e._v("From Epic Wiki")]),e._v(" "),r("p",[e._v("Jump to: "),r("a",{attrs:{href:"#mw-head"}},[e._v("navigation")]),e._v(", "),r("a",{attrs:{href:"#p-search"}},[e._v("search")])]),e._v(" "),r("h2",{attrs:{id:"contents"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#contents"}},[e._v("#")]),e._v(" Contents")]),e._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#Audience"}},[e._v("1 Audience")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#Use_Case"}},[e._v("2 Use Case")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#Two_Implementations"}},[e._v("3 Two Implementations")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#Implementation_Option_1_-_events_by_BPs"}},[e._v("4 Implementation Option 1 - events by BPs")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#Implementation_Option_2_-_all_events_by_code"}},[e._v("5 Implementation Option 2 - all events by code")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#Open_points"}},[e._v("6 Open points")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#Appendix.2C_some_tests_to_check_how_RPC_client.2Fserver_works"}},[e._v("7 Appendix, some tests to check how RPC client/server works")])])]),e._v(" "),r("h2",{attrs:{id:"audience"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#audience"}},[e._v("#")]),e._v(" Audience")]),e._v(" "),r("p",[e._v("This tutorial is intended for people who are developing a game with a "),r("a",{attrs:{href:"/index.php?title=Dedicated_Server_Guide_(Windows_%26_Linux)",title:"Dedicated Server Guide (Windows & Linux)"}},[e._v("dedicated server")]),e._v(" and want to have client BPs send messages to server and then parse the data server side with C++, send back an answer to the client and continue the logic with BPs.")]),e._v(" "),r("h2",{attrs:{id:"use-case"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#use-case"}},[e._v("#")]),e._v(" Use Case")]),e._v(" "),r("p",[e._v("I'm going to demonstrate the following use case:")]),e._v(" "),r("ul",[r("li",[e._v("On the client, inside a Blue Print Graph, get some text the user has typed in an edit box")]),e._v(" "),r("li",[e._v("Send this text to the server")]),e._v(" "),r("li",[e._v("On the server manipulate this text in a C++ function.")]),e._v(" "),r("li",[e._v("On the server from C++ send back a message to the client.")]),e._v(" "),r("li",[e._v("On the client get the response as a Blue Print event, and implement the rest of the logic in the BP")])]),e._v(" "),r("h2",{attrs:{id:"two-implementations"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#two-implementations"}},[e._v("#")]),e._v(" Two Implementations")]),e._v(" "),r("p",[e._v("I've found two possible ways to implement the use case above. One which is mainly BluePrint based, and allows to have only one method server side code in C++, the rest is in BPs.")]),e._v(" "),r("p",[e._v("A second possibility is to have all events coded in C++. This is useful if you need specific code at any point in the sequence of events.")]),e._v(" "),r("h2",{attrs:{id:"implementation-option-1-events-by-bps"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#implementation-option-1-events-by-bps"}},[e._v("#")]),e._v(" Implementation Option 1 - events by BPs")]),e._v(" "),r("p",[e._v("The first two steps are the same as the Implementation 2. You can find it here just for completion. The only different is that for this version I used another screen (CharCreationQuick).")]),e._v(" "),r("ul",[r("li",[r("p",[e._v("I have a widget which is one of character creation screens of our game (CharCreationQuick). This is where the call to server starts to ask for population of some fields with server information.")])]),e._v(" "),r("li",[r("p",[e._v("I create a variable (CharCreateQuickWidget) in my PlayerController BP, which we will use later. Its of type CharCreationQuick (which is the name of my UI Widget).")])])]),e._v(" "),r("p",[r("a",{attrs:{href:"/index.php?title=File:Rpc_bp0.jpg"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/d/dd/Rpc_bp0.jpg",alt:"Rpc bp0.jpg"}})])]),e._v(" "),r("ul",[r("li",[e._v("In the (CharCreationQuick) Widget BP, I edit the construction method to fill the variable (CharCreateRaceWidget) in playercontroller with this widget reference")])]),e._v(" "),r("p",[r("a",{attrs:{href:"/index.php?title=File:Rpc_bp1.jpg"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/9/9a/Rpc_bp1.jpg",alt:"Rpc bp1.jpg"}})])]),e._v(" "),r("ul",[r("li",[e._v('In the PlayerController BP we add two custom events, one replicated "Executes on Server" and "Reliable", which will call the function we implemented server side in the PlayerController class. Another custom event which is replicated "Executes on Owning Client" and "Reliable", which will be called by the server and executes on client.')])]),e._v(" "),r("p",[r("a",{attrs:{href:"/index.php?title=File:Rpc_bp3.jpg"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/f/f4/Rpc_bp3.jpg",alt:"Rpc bp3.jpg"}})])]),e._v(" "),r("ul",[r("li",[e._v("The only method to implement server side is getAllPathsInfo(). In the .h I have this code:")])]),e._v(" "),r("p",[e._v('UFUNCTION(BlueprintCallable, Category = "Character Creation")\nTArray'),r("FPathDefinition",[e._v(" getAllPathsInfo();")])],1),e._v(" "),r("p",[e._v("In the .cpp this code:")]),e._v(" "),r("p",[e._v("TArray"),r("FPathDefinition",[e._v(" APlaneshiftPlayerControllerBase::getAllPathsInfo() {\nreturn charCreationManager->getPathDefinitions();\n}")])],1),e._v(" "),r("p",[e._v("Please disregard the return type, you can just use a FString. In my case I needed a struct to contain more data.")]),e._v(" "),r("ul",[r("li",[e._v('In the BluePrint of the CharCreationQuick screen we implement a custom event called "Receive Path Definitions", which executes on client and reliable. This one will be called just within the client side from the player controller. The reason to do this is that we want to develop the rest of the logic inside the Char Creation UI.')])]),e._v(" "),r("p",[r("a",{attrs:{href:"/index.php?title=File:Rpc_bp2.jpg"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/c/c9/Rpc_bp2.jpg",alt:"Rpc bp2.jpg"}})])]),e._v(" "),r("p",[e._v("Note: trying to call the server method GetAllPathInfos directly from the CharCreation UI BP will fail")]),e._v(" "),r("p",[e._v("Note2: trying to call the event Receive Path Definitions directly from server side will fail as it will not be able to resolve the reference to the Widget. SO we need first to call a client side method inside PlayerController, and then call the event in the UI screen.")]),e._v(" "),r("h2",{attrs:{id:"implementation-option-2-all-events-by-code"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#implementation-option-2-all-events-by-code"}},[e._v("#")]),e._v(" Implementation Option 2 - all events by code")]),e._v(" "),r("ul",[r("li",[e._v("I have a widget which is the character creation screen of our game (CharCreationRace), in this widget a button (btnAdvanced)")]),e._v(" "),r("li",[e._v("I create a variable (CharCreateRaceWidget) in my PlayerController BP, which we will use later. Its of type CharCreationRace (which is the name of my UI Widget).")])]),e._v(" "),r("p",[r("a",{attrs:{href:"/index.php?title=File:RPC_example_1.jpg"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/c/c2/RPC_example_1.jpg",alt:"RPC example 1.jpg"}})])]),e._v(" "),r("ul",[r("li",[e._v("In the (CharCreationRace) Widget BP, I edit the construction method to fill the variable (CharCreateRaceWidget) in playercontroller with this widget reference")])]),e._v(" "),r("p",[r("a",{attrs:{href:"/index.php?title=File:RPC_example_2.jpg"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/b/be/RPC_example_2.jpg",alt:"RPC example 2.jpg"}})])]),e._v(" "),r("ul",[r("li",[r("p",[e._v("Implement a server method in PlayerController which will handle our logic, in my case it's inside PlaneShiftPlayerControllerBase.h")])]),e._v(" "),r("li",[r("p",[e._v("Server_HandleName is the one called by the client and executed on server, which we will use in our BP below.")])])]),e._v(" "),r("p",[e._v('// Checks for name validity\nUFUNCTION(Server, Reliable, BlueprintCallable, WithValidation, Category = "Character Creation")\nvoid Server_HandleName(const FString& firstName, const FString& lastName);')]),e._v(" "),r("ul",[r("li",[e._v("Client_HandleName is the one we use to give back the control to the client sending our results.")])]),e._v(" "),r("p",[e._v('// Replies with name validity to client\nUFUNCTION(Client, Reliable, Category = "Character Creation")\nvoid Client_HandleName(const bool result, const FString& error);')]),e._v(" "),r("ul",[r("li",[e._v("OnHandleName is used to trigger an event node on the client side (red node) we can use to restart our implementation in the BP graph as soon as the server has completed his work.")])]),e._v(" "),r("p",[e._v('// Event to connect to BP on client side\nUFUNCTION(BlueprintImplementableEvent, Category = "Character Creation")\nvoid OnHandleName(const bool result, const FString& error);')]),e._v(" "),r("ul",[r("li",[e._v("Implement the methods in PlaneShiftPlayerControllerBase.cpp")]),e._v(" "),r("li",[e._v("Server_HandleName_Implementation executes your logic on the server to parse whatever inputs the client has sent. When finished, this method calls the function Client_HandleName. This is actually passing back the control to the client.")])]),e._v(" "),r("p",[e._v('void APlaneshiftPlayerControllerBase::Server_HandleName_Implementation(const FString& firstName, const FString& lastName) {\nUE_LOG(LogTemp, Error, TEXT("APlaneshiftPlayerControllerBase::Server_HandleName %s %s"), *firstName, *lastName);\n// executes on server (implement here your logic)\ncharCreationManager->HandleName(this, firstName, lastName);\n// calls the client\n//this->Client_HandleName(true, "here is your error boy.");\n}')]),e._v(" "),r("ul",[r("li",[e._v('Server_HandleName was flagged "WithValidation" and so we need to implement Server_HandleName_Validate')])]),e._v(" "),r("p",[e._v("bool APlaneshiftPlayerControllerBase::Server_HandleName_Validate(const FString& firstName, const FString& lastName) { return true; };")]),e._v(" "),r("ul",[r("li",[e._v("Inside Client_HandleName_Implementation method we are now on the client side, and we want to trigger the event we will catch in the blueprint.")])]),e._v(" "),r("p",[e._v('void APlaneshiftPlayerControllerBase::Client_HandleName_Implementation(const bool result, const FString& error)\n{\nUE_LOG(LogTemp, Error, TEXT("APlaneshiftPlayerControllerBase::Client_HandleName_Implementation %s"), *error);\n// triggers the event client side\nthis->OnHandleName(result, error);\n// implement in BP graph.\n}')]),e._v(" "),r("ul",[r("li",[e._v("At this point we need just to implement the click of the button in our (CharCreationRace) BP, which will call the server function Server_HandleName. In my case it gets two input fields as parameters from the UI with first name and last name.")])]),e._v(" "),r("p",[r("a",{attrs:{href:"/index.php?title=File:RPC_example_3.jpg"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/2/27/RPC_example_3.jpg",alt:"RPC example 3.jpg"}})])]),e._v(" "),r("ul",[r("li",[e._v('Then we catch the event in the PlaneShiftPlayerController. To do this be sure to be in the PlayerController BP, you will not see this node from any other BP, search for "Add Event" and then "Event On Handle Name".')])]),e._v(" "),r("p",[r("a",{attrs:{href:"/index.php?title=File:RPC_example_4.jpg"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/3/3f/RPC_example_4.jpg",alt:"RPC example 4.jpg"}})])]),e._v(" "),r("ul",[r("li",[e._v("Here we use the CharCreateRaceWidget variable we created at the beginning, to get a reference to our UI widget on which we pressed the button and do whatever we need to, like give a message to the user, go to the next widget or else.")])]),e._v(" "),r("p",[e._v("If you look at what's happening in the logs...")]),e._v(" "),r("p",[e._v("Server side log:"),r("br"),e._v("\n[2017.02.23-23.42.33:321][824]LogTemp:Error: APlaneshiftPlayerControllerBase::Server_HandleName")]),e._v(" "),r("p",[e._v("Client side log:"),r("br"),e._v("\n[2017.02.23-23.42.33:331][643]LogTemp:Error: APlaneshiftPlayerControllerBase::Client_HandleName_Implementation here is your error boy."),r("br"),e._v("\n[2017.02.23-23.42.33:331][643]LogBlueprintUserMessages: [PlaneshiftPlayerController_C_0] here is your error boy."),r("br"),e._v("\n[2017.02.23-23.42.33:331][643]LogBlueprintUserMessages: [PlaneshiftPlayerController_C_0] You got a name validated by the server")]),e._v(" "),r("h2",{attrs:{id:"open-points"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#open-points"}},[e._v("#")]),e._v(" Open points")]),e._v(" "),r("ul",[r("li",[e._v('It\'s not intuitive to have some BPs in the UI graph and some in the player controller just to manage one single "transaction".')]),e._v(" "),r("li",[e._v("Is there a way to avoid going through PlayerController for all those calls, it means the player controller class will be pretty cluttered by function calls related to the UI")]),e._v(" "),r("li",[e._v("Is this the best way to achieve the results? Are there other ways?")])]),e._v(" "),r("h2",{attrs:{id:"appendix-some-tests-to-check-how-rpc-client-server-works"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#appendix-some-tests-to-check-how-rpc-client-server-works"}},[e._v("#")]),e._v(" Appendix, some tests to check how RPC client/server works")]),e._v(" "),r("p",[e._v("This appendix just captures some tests I did to understand how RPC works, and I hope it will save you some time.")]),e._v(" "),r("p",[e._v("In particular consider the following BP:")]),e._v(" "),r("p",[r("a",{attrs:{href:"/index.php?title=File:RPC_some_tests.jpg"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/e/e9/RPC_some_tests.jpg",alt:"RPC some tests.jpg"}})])]),e._v(" "),r("p",[e._v("and the following code:")]),e._v(" "),r("p",[e._v("in PlayerControllerBase.h")]),e._v(" "),r("p",[e._v('UFUNCTION(Server, Reliable, BlueprintCallable, WithValidation, Category = "Character Creation")\nvoid Server_HandleCharDelete(const FString& charName);')]),e._v(" "),r("p",[e._v("in PlayerControllerBase.cpp")]),e._v(" "),r("p",[e._v('void APlaneshiftPlayerControllerBase::Server_HandleCharDelete_Implementation(const FString& charName) {\nUE_LOG(LogTemp, Error, TEXT("APlaneshiftPlayerControllerBase::Server_HandleCharDelete %s"),*charName);\nFPlatformProcess::Sleep(5);\nUE_LOG(LogTemp, Error, TEXT("APlaneshiftPlayerControllerBase::Server_HandleCharDelete %s"), *charName);\n}')]),e._v(" "),r("p",[e._v("In the server function we just have the server wait for 5 seconds to simulate some calculations.")]),e._v(" "),r("p",[e._v("When clicking on the button in the UI, the log server side is the following:")]),e._v(" "),r("p",[e._v("[2017.02.23-23.07.45:464][954]LogTemp:Error: APlaneshiftPlayerControllerBase::Server_HandleCharDelete first call"),r("br"),e._v("\n[2017.02.23-23.07.50:465][954]LogTemp:Error: APlaneshiftPlayerControllerBase::Server_HandleCharDelete first call"),r("br"),e._v("\n[2017.02.23-23.07.50:465][954]LogTemp:Error: APlaneshiftPlayerControllerBase::Server_HandleCharDelete second call"),r("br"),e._v("\n[2017.02.23-23.07.55:467][954]LogTemp:Error: APlaneshiftPlayerControllerBase::Server_HandleCharDelete second call")]),e._v(" "),r("p",[e._v("the log client side is the following:")]),e._v(" "),r("p",[e._v("[2017.02.23-23.07.45:462][268]LogBlueprintUserMessages: [CharCreationRace_C_0] clicked btnQuick"),r("br"),e._v("\n[2017.02.23-23.07.45:462][268]LogBlueprintUserMessages: [CharCreationRace_C_0] after server call"),r("br"),e._v("\n[2017.02.23-23.07.45:462][268]LogBlueprintUserMessages: [CharCreationRace_C_0] Call server event")]),e._v(" "),r("p",[e._v("Please take a look at the timestamps.")]),e._v(" "),r("p",[e._v("Takeaways:")]),e._v(" "),r("ul",[r("li",[e._v("The client BP will not wait the execution of the server call, it will just execute all the nodes which are after it, so it's pointless to continue with more BPs in the first branch.")]),e._v(" "),r("li",[e._v('Even if the Event Get My Answer is flagged as "Run on Server", this doesn\'t mean the next BP nodes will be executed on server, in fact our "Call server event" is printed on the client log.')]),e._v(" "),r("li",[e._v('Server calls must have "void" as return argument, because are executed asyncronously from the client, so we cannot get an immediate result from that function call.')])]),e._v(" "),r("p",[e._v('Retrieved from "'),r("a",{attrs:{href:"https://wiki.unrealengine.com/index.php?title=RPC_Client_Server_Messages_Example&oldid=759",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://wiki.unrealengine.com/index.php?title=RPC_Client_Server_Messages_Example&oldid=759"),r("OutboundLink")],1),e._v('"')])])}),[],!1,null,null,null);t.default=n.exports}}]);