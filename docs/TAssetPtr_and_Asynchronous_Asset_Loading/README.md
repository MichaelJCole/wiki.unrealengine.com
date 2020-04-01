TAssetPtr and Asynchronous Asset Loading - Epic Wiki                    

TAssetPtr and Asynchronous Asset Loading
========================================

Contents
--------

*   [1 What is a TAssetPtr](#What_is_a_TAssetPtr)
*   [2 What Problem do they Solve](#What_Problem_do_they_Solve)
*   [3 Types](#Types)
    *   [3.1 Key Features](#Key_Features)
*   [4 How to use them](#How_to_use_them)
    *   [4.1 Asset Loader](#Asset_Loader)
    *   [4.2 Asset Loading](#Asset_Loading)
    *   [4.3 Asset Using](#Asset_Using)
*   [5 Further Reading](#Further_Reading)

What is a TAssetPtr
-------------------

Asset Pointers are similar to standard pointers in that they point to something. The difference is that TAssetPtr's point to an asset that may or may not yet be loaded, and if the asset is not loaded it contains the information required to load that asset for use. Where as standard hard pointers (\*) load the asset upon creation and has no reference to the asset other than it's memory address.

  

What Problem do they Solve
--------------------------

The easiest way to reference an asset is to create a UProperty of a hard pointer (\*) and populate the asset in the Editor. However the asset will be loaded when the object containing the property is loaded. If you are not careful, you can end up loading 100% of your assets at game startup time. For loading and memory management reason it wouldn't make sense to load all you assets before they are needed, So why not load them asynchronously right before they are needed. Doing this allows you to only load what you need to get the game running, and have all other assets at your beck and call.

Types
-----

Variable

Description

TAssetPtr<T>

Points to asset that hasn't been loaded yet, but can be by request

TAssetSubclassOf<T>

Points to a subclass of the defined baseclass that hasn't been loaded yet, but can be by request. Used to point to Blueprints instead of basic components.

  

### Key Features

**.h**

/\*\* Define the Asset Pointer. Don't forget to set a UPROPERTY \*/
UPROPERTY(EditAnywhere)
TAssetPtr<MyClass\> MyAssetPointer;
 
/\*\* Define a subclass version. This will only allow you to select subclasses of the defined type. \*/
UPROPERTY(EditAnywhere)
TAssetSubclassOf<MyBaseClass\> MyAssetSubclassOfPointer;

**.cpp**

// Call IsValid() to test if the asset pointer points to a live UObject
MyAssetPointer.IsValid();
 
// Call Get() to return a pointer to the UObject if one exists
MyAssetPointer.Get();
 
/\*\* Special Note about TAssetSubclassOf Get() it returns a UClass pointer!!\*/
MyAssetSubclassOfPointer.Get()
/\*\* To properly use a UClass pointer you must use GetDefaultObject<T>() to get a pointer to the UObject or derived class there of \*/
MyAssetSubclassOfPointer.Get()\-\>GetDefaultObject<MyBaseClass\>()
 
// Call ToStringReference() to return the StringAssetReference of the asset you wish to load
// More on this below
MyAssetPointer.ToStringReference();

  

How to use them
---------------

Variable

Description

FStreamableManager

The manager that controls the streaming of assets into the game at runtime. This is a user defined object and should be defined on a object such as the GameInstance to allow for easy access.

FStringAssetReference

A struct that contains a string reference to an asset, can be used to make soft references to assets. (ToStringReference() are loaded into these so they can be passed into to FStreamableManager .

#### Asset Loader

The FStreamableManager will be your asset loader for loading assets Asynchronously. This is best put on a persistent object like the GameInstance for two main reasons.

1.  To have easy access to it at all times which makes loading assets when you need them easy.
2.  That it remains persistent since you never want to lose or destroy the reference to the FStreamableManager while loading objects.

FStreamableManager AssetLoader;

  
The next major part is choosing how you want to load you're assets. There are two options

#### Asset Loading

**SimpleAsyncLoad** which allows you to load a single asset that is strongly referenced. This means it will never be garbage collected until you unload it manually using Unload.

// the .h
TAssetPtr<ABaseItem\> MyItem;
 
// the .cpp
FStringAssetReference AssetToLoad
AssetToLoad \= MyItem.ToStringReference();
AssetLoader.SimpleAsyncLoad(AssetToLoad);

  
**RequestAsyncLoad** loads an array of objects and fires a delegate when completed. This will Unload all the assets once the delegate is called, to ensure garbage collection takes place.

//the .h
TArray< TAssetPtr<ABaseItem\> \> MyItems;
 
// the .cpp
TArray<FStringAssetReference\> AssetsToLoad
for(TAssetPtr<ABaseItem\>& AssetPtr : MyItems) // C++11 ranged loop
{
     AssetsToLoad.AddUnique(AssetPtr.ToStringReference());
}
AssetLoader.RequestAsyncLoad(AssetsToLoad, FStreamableDelegate::CreateUObject(this, &MyClass::MyFunctionToBeCalledAfterAssetsAreLoaded));

#### Asset Using

After all this your asset(s) are ready to use. Don't forget to Get() them!

MyItem.Get(); // returns a pointer to the LIVE UObject

  

Further Reading
---------------

\[[Epic's Asynchronous Asset Loading Docs](https://docs.unrealengine.com/latest/INT/Programming/Assets/AsyncLoading/index.html)\]  
[Access Functions & Variables From a TSubclassOf Variable in C++](/Access_Functions_%26_Variables_From_a_TSubclassOf_Variable_in_C%2B%2B "Access Functions & Variables From a TSubclassOf Variable in C++")

  
[Oliver Barraza](/User:Oliver_Barraza "User:Oliver Barraza") ([talk](/User_talk:Oliver_Barraza "User talk:Oliver Barraza"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=TAssetPtr\_and\_Asynchronous\_Asset\_Loading&oldid=23900](https://wiki.unrealengine.com/index.php?title=TAssetPtr_and_Asynchronous_Asset_Loading&oldid=23900)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)