 SaveGame Pointers and Structs - Epic Wiki             

 

SaveGame Pointers and Structs
=============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Blueprint Setup](#Blueprint_Setup)
    *   [2.1 Blueprint Saving Setup](#Blueprint_Saving_Setup)
    *   [2.2 Blueprint Loading Setup](#Blueprint_Loading_Setup)
*   [3 CPP setup](#CPP_setup)
    *   [3.1 Save Game Archive](#Save_Game_Archive)
    *   [3.2 Object Record Struct](#Object_Record_Struct)
    *   [3.3 Save Game Object](#Save_Game_Object)
*   [4 Conclusion](#Conclusion)

Overview
--------

I've writing this tutorial to share what I learn't when trying to setup a save game function for a strategy game I'm developing. This is really just expanding on a post on the Fortnite Save system that was posted by Ben Zeigler [here](https://answers.unrealengine.com/questions/35618/savingloading-an-array-of-objects.html) and some of Rama's excellent [posts](/index.php?title=Save_System,_Read_%26_Write_Any_Data_to_Compressed_Binary_Files "Save System, Read & Write Any Data to Compressed Binary Files"). I just found those didn't quite explain the method of saving pointers for Actors and UObjects from start to finish so hopefully I can just add to that information and show my whole system.

I've setup this system in c++ to be called from blueprints for saving the data. This using my project a 4X turn based strategy game as an example so I will talk about saving Planets, empires (players), corps (AI industry), etc

Here is an early shot of the galaxy map in case it helps picture what I'm saving\\loading:

[![WorldsCollideEarlyShot.png](https://d26ilriwvtzlb.cloudfront.net/0/00/WorldsCollideEarlyShot.png)](/index.php?title=File:WorldsCollideEarlyShot.png)

Blueprint Setup
---------------

### Blueprint Saving Setup

[![SaveMain.png](https://d26ilriwvtzlb.cloudfront.net/2/2f/SaveMain.png)](/index.php?title=File:SaveMain.png)

[![SaveState.png](https://d26ilriwvtzlb.cloudfront.net/d/d4/SaveState.png)](/index.php?title=File:SaveState.png)

### Blueprint Loading Setup

Here is the main layout and order of loading, you will see I just spawn all actors first then all saved UObject's get constructed (preloaders). Next I de-serialize all data into the actors then objects, doing it in bulk mean all objects exists when de-serializing so the save archive can successfully find the objects for any pointers that you serialized when saving.

[![LoadingMain.png](https://d26ilriwvtzlb.cloudfront.net/b/bb/LoadingMain.png)](/index.php?title=File:LoadingMain.png)

At the end I call the post loading event, this will just loop through all objects that were created (AActors and UObjects) and call the interface "Post Loading Initialize" on them this allows any final calculations or setup to be run at the end when all data has finished loading. Using an interface is good because you only have to setup the interface call for objects that need anything done at this point.

[![PostLoadingEvent.png](https://d26ilriwvtzlb.cloudfront.net/3/39/PostLoadingEvent.png)](/index.php?title=File:PostLoadingEvent.png)

The interface 'Post Loading' for "Planet" actor will setup effects, non saved actors or any actor data that can be calculated instead of save\\loaded, for example "Apply Influence" function will spawn and configure an actor to display the teams borders using a "Current Influence" value that was loaded when de-serializing data (LoadData Function):

[![PlanetPostLoading.png](https://d26ilriwvtzlb.cloudfront.net/f/fd/PlanetPostLoading.png)](/index.php?title=File:PlanetPostLoading.png)

This is the interface Post Loading I use for my 'Empire' UObjects. Here I call a function "Assign Controller" which will Assign the first empire to PlayerController and for the other empires spawn AI controllers and link to the empire.

[![EmpirePostLoading.png](https://d26ilriwvtzlb.cloudfront.net/4/40/EmpirePostLoading.png)](/index.php?title=File:EmpirePostLoading.png)

CPP setup
---------

Below I've setup the c++ code, this I mostly copy and paste though some lines may have been edited to make it easier to read compared to how it interfaces with my project. So though it may not work directly as copy and paste code you should be able to get the idea any use for you own project with minor tweaking at most.

### Save Game Archive

**WCSaveGameArchive.h**

This is a very basic setup and all I needed. Setting the default for ArIsSaveGame = true will make sure UPROPERTY() have to be tagged with SaveGame to save. This allows you to skip saving\\loading any properties that can be calculated or is a temp value in the class\\struct saved.

That my understanding so far anyway!

<syntaxhighlight lang="cpp">

1.  include "Serialization/ObjectAndNameAsStringProxyArchive.h"
2.  include "WCSaveGameArchive.generated.h"

/\*\*

\* Save Game Archiver.
\*/

struct FWCSaveGameArchive : public FObjectAndNameAsStringProxyArchive { FWCSaveGameArchive(FArchive& InInnerArchive)

            : FObjectAndNameAsStringProxyArchive(InInnerArchive,true)

{ ArIsSaveGame = true;

               ArNoDelta = true; // Optional, useful when saving/loading variables without resetting the level.
                                 // Serialize variables even if weren't modified and mantain their default values.

} }; </syntaxhighlight>

  

### Object Record Struct

This saves all the data needed to recreate a UObject back in the game. Biggest thing I learn't here was to save the Outer as well. UObjects are required to have the same outer when saving and loading as this is used to restore pointers to the right objects. I save pointers to the outer objects for outers that are part of the map or otherwise already existant, OuterID will be used if Outer is a previously loaded object and the ID will be the index for the TempObjects Array the SaveGame object uses. This is so I don't have to structure the load functions with the right outers for the right objects.

The rule you have to make sure you follow here is that all outers actually get created\\loaded before the objects they are an outer for does. Generally this works ok if you save in the right order it will load that way too. e.g. I save an array of 'Empire' objects for my game first then an array of 'Corps' that use it's owning empire object as an outer for it.

Outer layout and save order for me: _Planets > Empires > Corps > ResearchedTechs_

I still want to tidy up how the outers are managed but at least is functional like this, Also not fully sure on if there is much benefit to using specific outers, instead you could just have GameState as the outer for all objects and then don't need to save or load them. I thought it might effect garbage collection performance but haven't properly investigated it yet.

  
**ObjectRecord.h**

<syntaxhighlight lang="cpp"> USTRUCT(BlueprintType) struct FObjectRecord {

GENERATED\_USTRUCT\_BODY()

public:

// class that this object is UPROPERTY(BlueprintReadWrite) UClass\* Class;

// save the outer used for object so they get loaded back in the correct hierachy UPROPERTY(BlueprintReadWrite) UObject\* Outer;

// save the outer used for object so they get loaded back in the correct hierachy UPROPERTY(BlueprintReadWrite) int32 OuterID;

// if the outer is an actor otherwise will be UObject UPROPERTY(BlueprintReadWrite) bool bActor;

// this is for loading only, store a pointer for the loaded object here so you can loop for the records later to de-serialize all the data UPROPERTY(BlueprintReadWrite) UObject\* Self;

// Name of the object UPROPERTY(BlueprintReadWrite) FName Name;

// serialized data for all UProperties that are 'SaveGame' enabled UPROPERTY(BlueprintReadWrite) TArray<uint8> Data;

// Spawn location if it's an actor UPROPERTY(BlueprintReadWrite) FTransform Transform;

FObjectRecord() { Class = nullptr; Outer = nullptr; Self = nullptr; } }; </syntaxhighlight>

### Save Game Object

**SaveGame.h**

<syntaxhighlight lang="cpp">

/\*\*

\* 
\*/

UCLASS(Blueprintable) class WORLDSCOLLIDE\_API USaveGameC : public USaveGame { GENERATED\_BODY()

public:

  

UPROPERTY(EditAnywhere, BlueprintReadWrite) TArray<uint8> GalaxyData;

// All object data in one array UPROPERTY(EditAnywhere, BlueprintReadWrite) TArray<FObjectRecord> ObjectRecords;

// used for temp loading objects before serializing but after loading UPROPERTY(EditAnywhere, BlueprintReadWrite) TArray<UObject\*> TempObjects;

// outers that are part of the map or otherwise preloaded so won't be in the list of TempObjects UPROPERTY(EditAnywhere, BlueprintReadWrite) TArray<UObject\*> PersistentOuters;

public:

// basically just a wrapper so you don't have to do a for loop in blueprints UFUNCTION(BlueprintCallable) void ActorArraySaver(UPARAM(ref)TArray<AActor\*>& SaveActors);

// Save individual Actors UFUNCTION(BlueprintCallable) void ActorSaver(AActor\* SaveActor);

// Create all saved actors without any data serialized yet UFUNCTION(BlueprintCallable) void ActorPreloader(AActor\* WorldActor, FObjectRecord& ActorRecord);

// basically just a wrapper so you don't have to do a for loop in blueprints UFUNCTION(BlueprintCallable) void UObjectArraySaver(UPARAM(ref) TArray<UObject\*>& SaveObjects);

// Save individual objects UFUNCTION(BlueprintCallable) void UObjectSaver(UObject\* SaveObject);

// create all saved objects without any data serialized yet UFUNCTION(BlueprintCallable) void UObjectsPreloader(AActor\* WorldActor);

// load all data after all objects exist so all pointers will load UFUNCTION(BlueprintCallable) void UObjectDataLoader();

// serialize the data UFUNCTION(BlueprintCallable) void SaveData(UObject\* Object, TArray<uint8>& Data);

// de-serialize the data UFUNCTION(BlueprintCallable) void LoadData(UObject\* Object, UPARAM(ref) TArray<uint8>& Data); }; </syntaxhighlight>

  
**SaveGame.cpp**

<syntaxhighlight lang="cpp">

// Fill out your copyright notice in the Description page of Project Settings.

1.  include "SaveGameC.h"
2.  include "GameFramework/Actor.h"
3.  include "Serialization/MemoryReader.h"
4.  include "Serialization/MemoryWriter.h"
5.  include "Engine/World.h"
6.  include "GameStateC.h"

DEFINE\_LOG\_CATEGORY(LogSaveGame)

void USaveGameC::ActorArraySaver(UPARAM(ref) TArray<AActor\*>& SaveActors) { for (AActor\* SaveActor : SaveActors) { ActorSaver(SaveActor); } }

void USaveGameC::ActorSaver(AActor\* SaveActor) {

  
int32 Index = ObjectRecords.Emplace(); FObjectRecord& ObjectRecord = ObjectRecords\[Index\];

ObjectRecord.Name = SaveActor->GetFName(); ObjectRecord.Transform = SaveActor->GetTransform(); ObjectRecord.Class = SaveActor->GetClass(); ObjectRecord.bActor = true;

SaveData(SaveActor, ObjectRecord.Data);

this->TempObjects.Add(SaveActor); UE\_LOG(LogSaveGame, Display, TEXT("Complete Save Actor %s"), \*SaveActor->GetName())

}

void USaveGameC::ActorPreloader(AActor\* WorldActor, FObjectRecord& ActorRecord) {

FActorSpawnParameters SpawnParams; SpawnParams.Name = ActorRecord.Name;

// TODO: change this to SpawnActorDeferred so you can de-serialize and apply data before it calls constructor\\BeginPlay AActor\* NewActor = WorldActor->GetWorld()->SpawnActor<AActor>(ActorRecord.Class, ActorRecord.Transform, SpawnParams); //AActor\* NewActor = WorldActor->GetWorld()->SpawnActorDeferred

// BUG? actor doesn't appear to load scale correctly using transform so I specifically apply the scale after loading NewActor->SetActorScale3D(ActorRecord.Transform.GetScale3D());

// don't load now, load after all objects are preloaded //LoadData(LoadObject, ObjectRecord.Data);

// add to temp array for lookup it another object using already loaded objects as outers (array gets cleared once all objects loaded) this->TempObjects.Add(NewActor);

UE\_LOG(LogSaveGame, Display, TEXT("Complete Load Actor %s"), \*NewActor->GetPathName()) }

  
void USaveGameC::UObjectArraySaver(UPARAM(ref) TArray<UObject\*>& SaveObjects) { for (UObject\* SaveObject : SaveObjects) { UObjectSaver(SaveObject); } }

void USaveGameC::UObjectSaver(UObject\* SaveObject) { if (SaveObject == nullptr) { UE\_LOG(LogSaveGame, Error, TEXT("Invalid Save Object!")) return; }

if (SaveObject->HasAnyFlags(EObjectFlags::RF\_Transient)) { UE\_LOG(LogSaveGame, Warning, TEXT("Saving RF\_Transient object")) return; }

if (SaveObject->IsA<AActor>()) { ActorSaver(Cast<AActor>(SaveObject)); return; }

int32 Index = ObjectRecords.Emplace(); FObjectRecord& ObjectRecord = ObjectRecords\[Index\];

  
// Use custom IDs for save\\retrieving outer pointers // \* Negative IDs if outer is a permanent map object (i.e. not loaded from SaveGame) // \* Negative IDs start from -2 because -1 is already assigned to INDEX\_NONE, and 0+ is used for SaveGame loaded objects ObjectRecord.OuterID = TempObjects.Find(SaveObject->GetOuter()); ObjectRecord.bActor = false;

// if outer is a saved object then don't try to save the direct object pointer if (ObjectRecord.OuterID == INDEX\_NONE) { ObjectRecord.OuterID = PersistentOuters.Find(SaveObject->GetOuter()); if (ObjectRecord.OuterID != INDEX\_NONE) { ObjectRecord.OuterID = -(ObjectRecord.OuterID + 2); } else { int32 Index = PersistentOuters.Add(SaveObject->GetOuter()); ObjectRecord.OuterID = -(Index + 2); UE\_LOG(LogSaveGame, Display, TEXT("Save Outer %s"), \*SaveObject->GetOuter()->GetPathName())

} }

ObjectRecord.Name = SaveObject->GetFName(); ObjectRecord.Class = SaveObject->GetClass();

SaveData(SaveObject, ObjectRecord.Data);

this->TempObjects.Add(SaveObject);

UE\_LOG(LogSaveGame, Display, TEXT("Complete Save UObject %s"), \*SaveObject->GetName()) }

void USaveGameC::UObjectsPreloader(AActor\* WorldActor) { UObject\* LoadOuter = nullptr;

for (FObjectRecord& ObjectRecord : ObjectRecords) { if (ObjectRecord.bActor == false) { if (ObjectRecord.OuterID != INDEX\_NONE) { if (TempObjects.IsValidIndex(ObjectRecord.OuterID) == true) { LoadOuter = TempObjects\[ObjectRecord.OuterID\]; if (LoadOuter == nullptr) { UE\_LOG(LogSaveGame, Error, TEXT("Unable to find Outer for object (invalid array object)")) } } else { int32 NewIndex = FMath::Abs(ObjectRecord.OuterID) - 2;

if (PersistentOuters.IsValidIndex(NewIndex)) { LoadOuter = PersistentOuters\[NewIndex\]; } else { UE\_LOG(LogSaveGame, Error, TEXT("Unable to find Outer for object (invalid ID)")) } } } if (LoadOuter == nullptr) { UE\_LOG(LogSaveGame, Error, TEXT("Unable to find Outer for object (no pointer)")) continue; }

UObject\* LoadObject = NewObject<UObject>(LoadOuter, ObjectRecord.Class, ObjectRecord.Name);

if (LoadObject == nullptr) return;

// don't load now, load after all objects are preloaded //LoadData(LoadObject, ObjectRecord.Data);

// add to here to cycle through and keep a pointer temporarly to avoid garbage collection (not sure if required but to be safe) this->TempObjects.Add(LoadObject);

UE\_LOG(LogSaveGame, Display, TEXT("Complete Load UObject %s %d"), \*LoadObject->GetPathName(), this->TempObjects.Num() - 1) }

else { ActorPreloader(WorldActor, ObjectRecord); } } }

void USaveGameC::UObjectDataLoader() { for (int32 a = 0 ; ObjectRecords.IsValidIndex(a) ; a++) { // Load now after all objects are preloaded LoadData(TempObjects\[a\], ObjectRecords\[a\].Data); } }

void USaveGameC::SaveData(UObject\* Object, TArray<uint8>& Data) { if (Object == nullptr) return;

FMemoryWriter MemoryWriter = FMemoryWriter(Data, true); FWCSaveGameArchive MyArchive = FWCSaveGameArchive(MemoryWriter);

Object->Serialize(MyArchive); }

void USaveGameC::LoadData(UObject\* Object, UPARAM(ref) TArray<uint8>& Data) { if (Object == nullptr) return;

FMemoryReader MemoryReader(Data, true);

FWCSaveGameArchive Ar(MemoryReader); Object->Serialize(Ar); }

</syntaxhighlight>

Conclusion
----------

That's the first implementation of my save system so there is probably plenty of room for improvement still. Hope it can help others understand how the FObjectAndNameAsStringProxyArchive can be used with object pointers and what you need to watch out for. Feel free to PM me with any questions or suggestion to expand or explain further anything I've shown here.

Thanks,

[Fishy418](/index.php?title=User:Fishy418&action=edit&redlink=1 "User:Fishy418 (page does not exist)")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=SaveGame\_Pointers\_and\_Structs&oldid=595](https://wiki.unrealengine.com/index.php?title=SaveGame_Pointers_and_Structs&oldid=595)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")