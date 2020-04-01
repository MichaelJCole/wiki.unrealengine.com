 Blueprint Rotating Movement Component - Epic Wiki             

 

Blueprint Rotating Movement Component
=====================================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

Overview
--------

In UE3 we were able to make rotating actors through creating **Mover (Interpactor)** and adjusting it's **Rotation Rate** parameters.  
In UE4 it can be done via **Rotating Movement Component** in blueprint.

Blueprint example
-----------------

Create a new blueprint from **Actor** class.

Open **Components** tab and add:

*   Rotating Movement Component
*   Static Mesh Component (Movable)

[![BRMC 1.jpg](https://d26ilriwvtzlb.cloudfront.net/6/61/BRMC_1.jpg)](/index.php?title=File:BRMC_1.jpg)

  
Select **Rotating Movement Component** and look at **Details** panel. Here you can see its parameters.

[![BRMC 2.jpg](https://d26ilriwvtzlb.cloudfront.net/4/4e/BRMC_2.jpg)](/index.php?title=File:BRMC_2.jpg)

  
**Rotation Rate** - rotator, which specifies rotation speed in degrees per second.  
**Pivot Translation** - vector, which specifies rotation pivot local offset.  
**Rotation in Local Space** - boolean, which specifies is rotation in local or world space.  

  
Open **Graph** tab -> Construction Script

Create next editable variables:

*   Rotation Rate (Rotator)
*   Pivot Translation (Vector)
*   Rotation in Local Space (Bool)
*   Mesh (Static Mesh)

[![BRMC 3.jpg](https://d26ilriwvtzlb.cloudfront.net/8/86/BRMC_3.jpg)](/index.php?title=File:BRMC_3.jpg)

  
So, for now we need to setup blueprint to change mesh and adjust rotation parameters when it is already in level.

Drag and drop **Static Mesh** (component) and **Mesh** (variable) one by one into **Construction Script** graph selecting **Get**.  
Drag **Static Mesh** (component) pin and find **Set Static Mesh** node.

[![BRMC 4.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a7/BRMC_4.jpg)](/index.php?title=File:BRMC_4.jpg)

  
Using **Set Static Mesh** node and **Mesh** (variable) set new mesh into **Static Mesh Component**

[![BRMC 5.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3d/BRMC_5.jpg)](/index.php?title=File:BRMC_5.jpg)

  
Now, get **Rotating Movement** component, drag its pin and find **Set** functions for its variables - Rotation Rate, Pivot Translation, Rotation in Local Space.

[![BRMC 6.jpg](https://d26ilriwvtzlb.cloudfront.net/8/8c/BRMC_6.jpg)](/index.php?title=File:BRMC_6.jpg)

  
And using early created correspond variables set new parameters for rotating movement.

[![BRMC 7.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c9/BRMC_7.jpg)](/index.php?title=File:BRMC_7.jpg)

  
Compile and save blueprint. Place it in your level, select and look at **Details** panel. Here you can find and adjust all parameters we told about.

[![BRMC 8.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a4/BRMC_8.jpg)](/index.php?title=File:BRMC_8.jpg)

  
On this simple preview mesh you can see how it works in comparison with old system.

X = Roll  
Y = Pitch  
Z = Yaw  

[![BRMC 9.jpg](https://d26ilriwvtzlb.cloudfront.net/8/83/BRMC_9.jpg)](/index.php?title=File:BRMC_9.jpg)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Rotating\_Movement\_Component&oldid=187](https://wiki.unrealengine.com/index.php?title=Blueprint_Rotating_Movement_Component&oldid=187)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")