Plugins Packaging - Epic Wiki                    

Plugins Packaging
=================

  
Currently packaging process for plugins is a bit strange and deletes a lof of its fuctionality.

To prevent any classes will be removed (especially if you're focused blueprints), you can apply simple trick - you should "show" to the compilator that classes are used.

  

class FMyPlugin : public IMyPlugin
{
	/\*\* IModuleInterface implementation \*/
	virtual void StartupModule() OVERRIDE
	{
		// @HACK Force classes to be compiled on shipping build
		UMyClassOne::StaticClass();
		UMyClassTwo::StaticClass();
 
		/\*\* List all your classes here \*/
	}
 
	virtual void ShutdownModule() OVERRIDE
	{
 
	}
};

  
It's a trick, but it works.

\--[Ufna](/User:Ufna "User:Ufna") ([talk](/index.php?title=User_talk:Ufna&action=edit&redlink=1 "User talk:Ufna (page does not exist)")) 19:49, 15 July 2014 (UTC)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Plugins\_Packaging&oldid=6960](https://wiki.unrealengine.com/index.php?title=Plugins_Packaging&oldid=6960)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)