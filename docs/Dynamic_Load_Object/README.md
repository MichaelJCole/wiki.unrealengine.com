 Dynamic Load Object - Epic Wiki             

 

Dynamic Load Object
===================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Get Object's Path](#Get_Object.27s_Path)
    *   [2.1 Why FName?](#Why_FName.3F)
*   [3 My Templated Dynamic Load Object Function](#My_Templated_Dynamic_Load_Object_Function)
*   [4 Example Uses of The Template](#Example_Uses_of_The_Template)

Overview
--------

Dear Community,

here are my static library functions for saving a objects path and then loading an object dynamically from a path

I have a templated version of my dynamic load object function for your entertainment!

To test this you could remove the word static and put in any .h file of your choosing like player controller

Get Object's Path
-----------------

<syntaxhighlight lang="cpp"> //Get Path static FORCEINLINE FName GetObjPath(const UObject\* Obj) { if(!Obj)

       {
         return NAME\_None;
       }

//~

FStringAssetReference ThePath = FStringAssetReference(Obj);

if(!ThePath.IsValid()) return NAME\_None;

//The Class FString Name For This Object FString Str = Obj->GetClass()->GetDescription();

Str += "'"; Str += ThePath.ToString(); Str += "'";

return FName(\*Str); } </syntaxhighlight>

### Why FName?

Because in my In-Game editor I only save the asset references to binary file, and use Dynamic Load Object during the loading of a level, and

 FName is half the size of FString, 8 compared to 16 bytes.

So I do it for Save File size-reduction reasons

My Templated Dynamic Load Object Function
-----------------------------------------

<syntaxhighlight lang="cpp"> //TEMPLATE Load Obj From Path template <typename ObjClass> static FORCEINLINE ObjClass\* LoadObjFromPath(const FName& Path) { if(Path == NAME\_None) return NULL; //~

     return Cast<ObjClass>(StaticLoadObject( ObjClass::StaticClass(), NULL,\*Path.ToString()));

} </syntaxhighlight>

Example Uses of The Template
----------------------------

<syntaxhighlight lang="cpp"> // Load PS From Path static FORCEINLINE UParticleSystem\* LoadPSFromPath(const FName& Path) { if(Path == NAME\_None) return NULL; //~

return LoadObjFromPath<UParticleSystem>(Path); }

  
// Load Material From Path static FORCEINLINE UMaterialInterface\* LoadMatFromPath(const FName& Path) { if(Path == NAME\_None) return NULL; //~

return LoadObjFromPath<UMaterialInterface>(Path); }

// Load Static Mesh From Path static FORCEINLINE UStaticMesh\* LoadMeshFromPath(const FName& Path) { if(Path == NAME\_None) return NULL; //~

return LoadObjFromPath<UStaticMesh>(Path); } </syntaxhighlight>

  
[Rama](/index.php?title=User:Rama "User:Rama") ([talk](/index.php?title=User_talk:Rama "User talk:Rama"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Dynamic\_Load\_Object&oldid=205](https://wiki.unrealengine.com/index.php?title=Dynamic_Load_Object&oldid=205)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")