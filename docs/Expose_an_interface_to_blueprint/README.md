Expose an interface to blueprint - Epic Wiki                    

Expose an interface to blueprint
================================

[![BlueprintInterface.png](https://d3ar1piqh1oeli.cloudfront.net/5/5a/BlueprintInterface.png/180px-BlueprintInterface.png)](/File:BlueprintInterface.png)

[![](/skins/common/images/magnify-clip.png)](/File:BlueprintInterface.png "Enlarge")

**Rate this Article:**

3.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:(please verify)

  
**NOTE: This tutorial is largely out of date, recommend reading this instead** [https://wiki.unrealengine.com/Interfaces\_in\_C%2B%2B#The\_Interface](https://wiki.unrealengine.com/Interfaces_in_C%2B%2B#The_Interface)

  
We will create a simple interface that you can use in your blueprints. As you can see in the picture above we will create a simple event called _On Interact_ which exposes your interface "clicked" with argument type **ITargetInterface**. Note that this argument is only needed in this specific example. If you make your own class with your own event, you can make events with an optional number of arguments. With this interface in place we will be able to call it's functions like _GetHealth_.

Header file:

#pragma once
#include "TargetInterface.generated.h"
UINTERFACE(MinimalAPI)
class UTargetInterface :
	public UInterface
{
	GENERATED\_UINTERFACE\_BODY()
};
 
class ITargetInterface{
	GENERATED\_IINTERFACE\_BODY()
public:
	UFUNCTION(BlueprintImplementableEvent, meta\=(FriendlyName \= "On Interact"))
	void OnInteract(const TScriptInterface<ITargetInterface\> &clicked);
	virtual float GetHealth();
 
};

.cpp file:

#include "YourProject.h"
#include "TargetInterface.h"
 
UTargetInterface::UTargetInterface(const class FPostConstructInitializeProperties& PCIP) : Super(PCIP){
 
}
// Give GetHealth a default implementation
float ITargetInterface::GetHealth(){
	return 0.0f;
}

  
The important part here is

UFUNCTION(BlueprintImplementableEvent, meta\=(FriendlyName \= "On Interact"))
	void OnInteract(const TScriptInterface<ITargetInterface\> &clicked);

1.) BlueprintImplementableEvent turns your function into a blueprint event. This event will be called in blueprint when ever you call it in c++.

2.) _void OnInteract(const TScriptInterface<ITargetInterface> &clicked);_ . Sometimes simple events are not enough for example in this case we want to know who has started the OnInteract event.

3.) The most important part is "_const TScriptInterface<ITargetInterface> &clicked_". We have to wrap our interface inside of an TScriptInterface to expose it to blueprint.

To trigger the event you can from within your C++ code call the function Execute\_OnInteract. It always takes the instance of your class as an argument + the optional arguments you defined. In our case this is a TScriptInterface<ITargetInterface> object. Below is the example code, where we have created an instance named actor. We will generate the necessary argument "s" and then call the Execute\_OnInteract function.

auto t \= InterfaceCast<ITargetInterface\>(actor);
if (t !\= nullptr){		
	TScriptInterface<ITargetInterface\> s \= TScriptInterface<ITargetInterface\>();
	s.SetObject(actor);
        s.SetInterface(t);
	t\-\>Execute\_OnInteract(actor,s);
}

InterfaceCast tries to convert your actor to an ITargetInterface. In this case the variable "t" will be null if the cast has failed. The next step is to wrap our actor who implements our ITargetInterface in an TScriptInterface. You do this by creating an TScriptInterface with the default consturctor and use the _SetObject_ method.

Now the most important part here is that you should not call the method _OnInteract_ because this will result in an runtime error. Instead you need to call the generated utility function which is called _Execute\_YourFunctionName_ in this case it is called _Execute\_OnInteract_. The first argument is always the UObject and the following argument are the arguments of your function.

In our case we defined

void OnInteract(const TScriptInterface<ITargetInterface\> &clicked)

So the type signature will look like this

Execute\_OnInteract(UObject \*object, const TScriptInterface<ITargetInterface\> &clicked);

  
At this point you can already use your event in your blueprints. The problem is that you have no functions that are working with your newly created interface. Let's fix this.

Header code:

#pragma once
 
#include "GameFramework/Actor.h"
#include "TargetInterface.h"
#include "TargetInterfaceBPFunctionLibrary.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class UTargetInterfaceBPFunctionLibrary : public UBlueprintFunctionLibrary
{
	GENERATED\_UCLASS\_BODY()
 
	UFUNCTION(BlueprintCallable, Category\="TargetInterface")
	static float GetHealth(const TScriptInterface<ITargetInterface\> &target);
};

.cpp code:

#include "project.h"
#include "TargetInterfaceBPFunctionLibrary.h"
 
 
UTargetInterfaceBPFunctionLibrary::UTargetInterfaceBPFunctionLibrary(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
 
}
 
float UTargetInterfaceBPFunctionLibrary::GetHealth(const TScriptInterface<ITargetInterface\> &target)
{
	return target\-\>GetHealth();
}

That's it. Now you can access your interface inside of your blueprints.

[Maikklein](/index.php?title=User:Maikklein&action=edit&redlink=1 "User:Maikklein (page does not exist)")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Expose\_an\_interface\_to\_blueprint&oldid=15398](https://wiki.unrealengine.com/index.php?title=Expose_an_interface_to_blueprint&oldid=15398)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)