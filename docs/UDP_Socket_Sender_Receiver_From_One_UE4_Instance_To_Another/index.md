UDP Socket Sender Receiver From One UE4 Instance To Another - Epic Wiki                    

UDP Socket Sender Receiver From One UE4 Instance To Another
===========================================================

Contents
--------

*   [1 Overview](#Overview)
    *   [1.1 Setup](#Setup)
    *   [1.2 Build CS](#Build_CS)
*   [2 Custom Data](#Custom_Data)
*   [3 Sender](#Sender)
    *   [3.1 .h](#.h)
    *   [3.2 .cpp](#.cpp)
*   [4 Receiver](#Receiver)
    *   [4.1 .h](#.h_2)
    *   [4.2 .cpp](#.cpp_2)
*   [5 TCP](#TCP)
*   [6 Conclusion](#Conclusion)
*   [7 Post 4.12](#Post_4.12)

Overview
--------

**Author:** [Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama")) [www.ue4code.com](http://www.ue4code.com)

In this tutorial I give you the core code for how you can send any custom data structure you want, BP-exposed, from one instance of UE4 to another!

The implications are vast, the use cases are nearly infinite!

You can send any data you want from any 1 UE4 instance to any other!

[![px=900](https://d26ilriwvtzlb.cloudfront.net/7/78/UDPVictory.jpg)](/File:UDPVictory.jpg "px=900") [![px=900](https://d26ilriwvtzlb.cloudfront.net/a/a2/UDPGraph.jpg)](/File:UDPGraph.jpg "px=900")

### Setup

Below are two actor classes, you should spawn 1 in your sending instance of UE4 and 1 in your receiving instance of UE4, of the respective types.

The reason they are actors is to allow them to be easily blueprintable and have async BP event responses via BlueprintImplementable event.

I used this ip,port

IP = 127.0.0.1

Port = 8890

The IP is passed in an FString

### Build CS

Make sure to include the extra dependencies!

PublicDependencyModuleNames.AddRange(new string\[\] {
    "Core", "CoreUObject", "Engine", "InputCore",
 
     "Sockets", "Networking"   //<~~~~~
 });

Custom Data
-----------

The core of my method is that your data structure must have its own serialization function defined, here is the code for a BP exposed serializable data structure in UE4.

#pragma once
 
#include "AnyCustomData.generated.h"
 
USTRUCT(BlueprintType)
struct FAnyCustomData
{ 
	GENERATED\_USTRUCT\_BODY()
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Joy Color")
	FString Name \= "Victory!";
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Joy Color")
	int32 Count \= 1;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Joy Color")
	float Scale \= 1.f;
 
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Joy Color")
	FLinearColor Color \= FLinearColor::Red;
 
	FAnyCustomData()
	{}
};
 
FORCEINLINE FArchive& operator<<(FArchive &Ar, FAnyCustomData& TheStruct )
{
	Ar << TheStruct.Name; 
	Ar << TheStruct.Count; 
	Ar << TheStruct.Scale; 
	Ar << TheStruct.Color;
 
	return Ar;
}

As you can see am using a C++ operator overload of operator<< to tell UE4's FArchive how to serialize my data structure.

Because the data types are simple I can rely on UE4's existing serialization overloads for each simple data type.

Sender
------

### .h

/\*
 
	By Rama
 
\*/
#pragma once
 
//Networking
#include "Networking.h"
 
//Base
#include "RamaUDPSender.generated.h"
 
UCLASS()
class ARamaUDPSender : public AActor
{
	GENERATED\_UCLASS\_BODY()
 
	bool IsUDP;
 
	//UFUNCTION(BlueprintCallable, Category=RamaUDPSender)
	bool RamaUDPSender\_SendString(FString ToSend);
 
public:
	TSharedPtr<FInternetAddr\>	RemoteAddr;
	FSocket\* SenderSocket;
 
	bool StartUDPSender(
		const FString& YourChosenSocketName,
		const FString& TheIP, 
		const int32 ThePort,
		bool UDP \= false
	);
 
public:
	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category\="Rama UDP Sender")
	bool ShowOnScreenDebugMessages;
 
 
	//ScreenMsg
	FORCEINLINE void ScreenMsg(const FString& Msg)
	{
		if(!ShowOnScreenDebugMessages) return;
		GEngine\-\>AddOnScreenDebugMessage(\-1, 5.f, FColor::Red, \*Msg);
	}
	FORCEINLINE void ScreenMsg(const FString& Msg, const float Value)
	{
		if(!ShowOnScreenDebugMessages) return;
		GEngine\-\>AddOnScreenDebugMessage(\-1, 5.f, FColor::Red, FString::Printf(TEXT("%s %f"), \*Msg, Value));
	}
	FORCEINLINE void ScreenMsg(const FString& Msg, const FString& Msg2)
	{
		if(!ShowOnScreenDebugMessages) return;
		GEngine\-\>AddOnScreenDebugMessage(\-1, 5.f, FColor::Red, FString::Printf(TEXT("%s %s"), \*Msg, \*Msg2));
	}
 
 
public:
 
	/\*\* Called whenever this actor is being removed from a level \*/
	virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;
};

### .cpp

/\*
 
	RamaUDPSender
 
	by Rama
\*/
#include "UDPSendReceive.h"
#include "RamaUDPSender.h"
 
ARamaUDPSender::ARamaUDPSender(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{	
	SenderSocket \= NULL;
 
	ShowOnScreenDebugMessages \= true;
}
 
void ARamaUDPSender::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	Super::EndPlay(EndPlayReason);
	//~~~~~~~~~~~~~~~~
 
	if(SenderSocket)
	{
		SenderSocket\-\>Close();
		ISocketSubsystem::Get(PLATFORM\_SOCKETSUBSYSTEM)\-\>DestroySocket(SenderSocket);
	}
}
 
bool ARamaUDPSender::StartUDPSender(
	const FString& YourChosenSocketName,
	const FString& TheIP, 
	const int32 ThePort
){	
	//Create Remote Address.
	RemoteAddr \= ISocketSubsystem::Get(PLATFORM\_SOCKETSUBSYSTEM)\-\>CreateInternetAddr();
 
	bool bIsValid;
	RemoteAddr\-\>SetIp(\*TheIP, bIsValid);
	RemoteAddr\-\>SetPort(ThePort);
 
	if(!bIsValid)
	{
		ScreenMsg("Rama UDP Sender>> IP address was not valid!", TheIP);
		return false;
	}
 
	SenderSocket \= FUdpSocketBuilder(\*YourChosenSocketName)
		.AsReusable()
		.WithBroadcast()
	;
 
 
	//check(SenderSocket->GetSocketType() == SOCKTYPE\_Datagram);
 
	//Set Send Buffer Size
	int32 SendSize \= 2\*1024\*1024;
	SenderSocket\-\>SetSendBufferSize(SendSize,SendSize);
	SenderSocket\-\>SetReceiveBufferSize(SendSize, SendSize);
 
	UE\_LOG(LogTemp,Log,TEXT("\\n\\n\\n\~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
	UE\_LOG(LogTemp,Log,TEXT("Rama \*\*\*\*UDP\*\*\*\* Sender Initialized Successfully!!!"));
	UE\_LOG(LogTemp,Log,TEXT("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\\n\\n\\n"));
 
	return true;
}
 
bool ARamaUDPSender::RamaUDPSender\_SendString(FString ToSend)
{
	if(!SenderSocket) 
	{
		ScreenMsg("No sender socket");
		return false;
	}
	//~~~~~~~~~~~~~~~~
 
	int32 BytesSent \= 0;
 
	FAnyCustomData NewData;
	NewData.Scale \= FMath::FRandRange(0,1000);
	NewData.Count \= FMath::RandRange(0,100);
	NewData.Color \= FLinearColor(FMath::FRandRange(0,1),FMath::FRandRange(0,1),FMath::FRandRange(0,1),1);
 
	FArrayWriter Writer;
 
	Writer << NewData; //Serializing our custom data, thank you UE4!
 
	SenderSocket\-\>SendTo(Writer.GetData(),Writer.Num(),BytesSent,\*RemoteAddr);
 
	if(BytesSent <= 0)
	{
		const FString Str \= "Socket is valid but the receiver received 0 bytes, make sure it is listening properly!";
		UE\_LOG(LogTemp,Error,TEXT("%s"),\*Str);
		ScreenMsg(Str);
		return false;
	}
 
	ScreenMsg("UDP~ Send Succcess! Bytes Sent = ",BytesSent );
 
	return true;
}

The core here is:

FArrayWriter Writer;
 
Writer << NewData; //Serializing our custom data, thank you UE4!
 
SenderSocket\-\>SendTo(Writer.GetData(),Writer.Num(),BytesSent,\*RemoteAddr);

I am using UE4's ArrayWriter to do the serializtion and then send this serialized data over the network.

Receiver
--------

### .h

/\*
 
	By Rama
 
\*/
#pragma once
 
//Networking
#include "Networking.h"
 
//Base
#include "RamaUDPReceiver.generated.h"
 
UCLASS()
class ARamaUDPReceiver : public AActor
{
	GENERATED\_UCLASS\_BODY()
 
//====================================================
//		Data Received Events!
public:
	/\*\* Data has been received!! \*/
	UFUNCTION(BlueprintImplementableEvent)
	void BPEvent\_DataReceived(const FAnyCustomData& ReceivedData );
 
//====================================================
 
public:
	FSocket\* ListenSocket;
 
	FUdpSocketReceiver\* UDPReceiver \= nullptr;
	void Recv(const FArrayReaderPtr& ArrayReaderPtr, const FIPv4Endpoint& EndPt);
 
	bool StartUDPReceiver(
		const FString& YourChosenSocketName,
		const FString& TheIP, 
		const int32 ThePort
	);
 
//ScreenMsg
	FORCEINLINE void ScreenMsg(const FString& Msg)
	{
		GEngine\-\>AddOnScreenDebugMessage(\-1, 5.f, FColor::Red, \*Msg);
	}
	FORCEINLINE void ScreenMsg(const FString& Msg, const float Value)
	{
		GEngine\-\>AddOnScreenDebugMessage(\-1, 5.f, FColor::Red, FString::Printf(TEXT("%s %f"), \*Msg, Value));
	}
	FORCEINLINE void ScreenMsg(const FString& Msg, const FString& Msg2)
	{
		GEngine\-\>AddOnScreenDebugMessage(\-1, 5.f, FColor::Red, FString::Printf(TEXT("%s %s"), \*Msg, \*Msg2));
	}
 
 
public:
 
	/\*\* Called whenever this actor is being removed from a level \*/
	virtual void EndPlay(const EEndPlayReason::Type EndPlayReason) override;
};

### .cpp

/\*
 
	RamaUDPReceiver
 
	by Rama
\*/
#include "UDPSendReceive.h"
#include "RamaUDPReceiver.h"
 
ARamaUDPReceiver::ARamaUDPReceiver(const FObjectInitializer& ObjectInitializer)
	: Super(ObjectInitializer)
{	
	ListenSocket \= NULL;
}
 
void ARamaUDPReceiver::EndPlay(const EEndPlayReason::Type EndPlayReason)
{
	Super::EndPlay(EndPlayReason);
	//~~~~~~~~~~~~~~~~
 
	delete UDPReceiver;
	UDPReceiver \= nullptr;
 
	//Clear all sockets!
	//		makes sure repeat plays in Editor dont hold on to old sockets!
	if(ListenSocket)
	{
		ListenSocket\-\>Close();
		ISocketSubsystem::Get(PLATFORM\_SOCKETSUBSYSTEM)\-\>DestroySocket(ListenSocket);
	}
}
 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
//Rama's Start TCP Receiver
bool ARamaUDPReceiver::StartUDPReceiver(
	const FString& YourChosenSocketName,
	const FString& TheIP, 
	const int32 ThePort
){
 
	ScreenMsg("RECEIVER INIT");
 
	//~~~
 
	FIPv4Address Addr;
	FIPv4Address::Parse(TheIP, Addr);
 
	//Create Socket
	FIPv4Endpoint Endpoint(Addr, ThePort);
 
	//BUFFER SIZE
	int32 BufferSize \= 2\*1024\*1024;
 
	ListenSocket \= FUdpSocketBuilder(\*YourChosenSocketName)
		.AsNonBlocking()
		.AsReusable()
		.BoundToEndpoint(Endpoint)
		.WithReceiveBufferSize(BufferSize);
	;
 
	FTimespan ThreadWaitTime \= FTimespan::FromMilliseconds(100);
	UDPReceiver \= new FUdpSocketReceiver(ListenSocket, ThreadWaitTime, TEXT("UDP RECEIVER"));
	UDPReceiver\-\>OnDataReceived().BindUObject(this, &ARamaUDPReceiver::Recv); 
 
	return true;
}
 
void ARamaUDPReceiver::Recv(const FArrayReaderPtr& ArrayReaderPtr, const FIPv4Endpoint& EndPt)
{
	ScreenMsg("Received bytes", ArrayReaderPtr\-\>Num() );
 
	FAnyCustomData Data;
	\*ArrayReaderPtr << Data;		//Now de-serializing! See AnyCustomData.h
 
	//BP Event
	BPEvent\_DataReceived(Data);
}

The core here is the binding of the receiver thread delegate:

UDPReceiver\-\>OnDataReceived().BindUObject(this, &ARamaUDPReceiver::Recv);

and then deserializing inside this delegate binded function:

FAnyCustomData Data;
\*ArrayReaderPtr << Data;		//Now de-serializing! See AnyCustomData.h
 
//BP Event
BPEvent\_DataReceived(Data);

TCP
---

I have a wiki on communicating via TCP here! [TCP\_Socket\_Listener,\_Receive\_Binary\_Data\_From\_an\_IP/Port\_Into\_UE4,\_(Full\_Code\_Sample)](/TCP_Socket_Listener,_Receive_Binary_Data_From_an_IP/Port_Into_UE4,_(Full_Code_Sample) "TCP Socket Listener, Receive Binary Data From an IP/Port Into UE4, (Full Code Sample)")

Conclusion
----------

As you can see I am using my custom USTRUCT serialization function to send any data I want from one instance of UE4 to another, and straight into Blueprints!

Now you can too!

Enjoy!

[Rama](/User:Rama "User:Rama") ([talk](/User_talk:Rama "User talk:Rama")) [www.ue4code.com](http://www.ue4code.com)

Post 4.12
---------

If your receiver doesn't receive anything, you might want to try add this line:

Receiver\-\>Start();

Thanks to David\_88 here: [https://forums.unrealengine.com/showthread.php?125064-FUdpSocketReceiver-not-receiving-data](https://forums.unrealengine.com/showthread.php?125064-FUdpSocketReceiver-not-receiving-data)

Another thing might help you: if you want to spawn actor or set timer in your blueprint after receiving data, you'll have to call the blueprint event BPEvent\_DataReceived(...) in game thread. Rama has another tutorial about multithreading here: [https://wiki.unrealengine.com/Multi-Threading:\_How\_to\_Create\_Threads\_in\_UE4](https://wiki.unrealengine.com/Multi-Threading:_How_to_Create_Threads_in_UE4)

What's needed here, is the last bit of that tutorial:

#include "Async.h"
...
AsyncTask(ENamedThreads::GameThread, \[&\]() {
    BPEvent\_DataReceived(Data); // call your event this way so it'll be executed on game thread
 });

This'll call your blueprint event in game thread.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UDP\_Socket\_Sender\_Receiver\_From\_One\_UE4\_Instance\_To\_Another&oldid=23922](https://wiki.unrealengine.com/index.php?title=UDP_Socket_Sender_Receiver_From_One_UE4_Instance_To_Another&oldid=23922)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)