Blueprint Manual Level Streaming RU - Epic Wiki                    

Blueprint Manual Level Streaming RU
===================================

  

Contents
--------

*   [1 Обзор](#.D0.9E.D0.B1.D0.B7.D0.BE.D1.80)
*   [2 Настройка уровня](#.D0.9D.D0.B0.D1.81.D1.82.D1.80.D0.BE.D0.B9.D0.BA.D0.B0_.D1.83.D1.80.D0.BE.D0.B2.D0.BD.D1.8F)
*   [3 Blueprint переход между уровней](#Blueprint_.D0.BF.D0.B5.D1.80.D0.B5.D1.85.D0.BE.D0.B4_.D0.BC.D0.B5.D0.B6.D0.B4.D1.83_.D1.83.D1.80.D0.BE.D0.B2.D0.BD.D0.B5.D0.B9)
*   [4 Summary](#Summary)

  

Обзор
-----

Переходы между уровнями - это неотъемлемая часть любой игры, в которой есть много различных уровней и с необходимостью легкого перехода между ними. Данный урок покажет, как настроить переход между уровнями на основе **Blueprint**. Так же в данном уроке продемонстрируем переход между двумя уровнями, используя коридор, разделенный двумя дверями. Почти все что здесь показывается содержится в **Content Example - Level Streaming Level**.

Настройка уровня
----------------

1\. Первое что необходимо сделать, это открыть окно **Levels Window**, оно расположено в меню **Window/Levels**

[![](https://d26ilriwvtzlb.cloudfront.net/5/53/Menu_WindowLevels.png)](/File:Menu_WindowLevels.png)

Расположение окна меню Levels.

[![](https://d26ilriwvtzlb.cloudfront.net/f/f3/WindowLevels_Empty.png)](/File:WindowLevels_Empty.png)

Пустое окно уровней Levels.

2\. _ПКМ_ на **Levels Window** и выберите Add Level и добавьте столько, сколько вам нужно уровней. Возможно вы заходите расположить подуровни в под папках, что бы логически поделить ваш мир.

[![](https://d26ilriwvtzlb.cloudfront.net/0/09/WindowLevels_Create.png)](/File:WindowLevels_Create.png)

Создайте новый уровень.

3\. Обратите внимание, на то какой уровень является текущим **Current Level** в окне **Levels Window**, что бы добавить actors в вашу сцену, они должны добавляться именно в **Current Level**. Теперь разместите объекты на уровне, так же как если бы вы делали обычный уровень, и не забудьте размещать actors на нужном уровне. Если вы случайно разместите actor не в том уровне, вы можете легко переназначить его выбрав actor и нажам ПКМ на уровне в level window и выбрав **Move Selected Actors to Level**/

Blueprint переход между уровней
-------------------------------

Теперь ваш уровень должен быть готов к тому, что бы добавить переход **Level Streaming**.

1\. Так как мы используем коридор для перехода между двумя уровнями, сперва мы должны добавить actors представляющих коридор. В данном уроке я использовал две напольные плиты повернутые вертикально, они будут скользить вниз при приближении персонажа. У этих дверей есть свои собственные blueprints содержащие редактируемую переменную под названием **Level**. Это сделано для того, что бы триггер анимировал дверь и осуществить переход в одном blueprint. Каждая дверь принадлежит разным уровням, дверь слева принадлежит уровню с серебряным полом, а дверь справа принадлежит уровню с красным полом.

[![](https://d26ilriwvtzlb.cloudfront.net/a/a9/SlidingDoors.png)](/File:SlidingDoors.png)

Спиной к спине, раздвижные двери, разделяющие два уровня.

[![](https://d26ilriwvtzlb.cloudfront.net/d/d0/SlidingDoors_Blueprint.png)](/File:SlidingDoors_Blueprint.png)

Часть Blueprint для того что бы сдвинуть дверь. Соедините Begin и End overlap с Play и Reverse для триггера.

2\. To Load a level set up a door containing a trigger volume that triggers on begin и end overlap. The volume extends in-front and behind the door. When the player enters the volume an **Open Door Event** is triggered. This event calls **Load Stream Level** passing in the _Name_ of the level to stream in. When a player leaves the volume the **Close Door Event** is called and this event is only connected to the Reverse connection of the timeline. Level unloading is done outside of the sliding door.

[![](https://d26ilriwvtzlb.cloudfront.net/e/ee/SlidingDoors_Blueprint_Streaming.png)](/File:SlidingDoors_Blueprint_Streaming.png)

Level Streaming Blueprint.

3\. To unload the previous level, place another trigger volume outside the door. When the player leaves the hallway he will trigger the unloading of the previous section.

[![](https://d26ilriwvtzlb.cloudfront.net/8/82/Unload_Trigger_Volume.png)](/File:Unload_Trigger_Volume.png)

Unload Trigger Volume.

[![](https://d26ilriwvtzlb.cloudfront.net/7/7b/Unload_Trigger_Volume_Blueprint.png)](/File:Unload_Trigger_Volume_Blueprint.png)

Unload Trigger Volume Blueprint.

Summary
-------

That is all there is to it. For a blueprint only solution to level streaming using a set of two doors you only need four separate triggers. Two to load and open the doors and to outside to unload the other level.

[Blueprint Level Streaming - VIDEO](https://www.youtube.com/watch?v=W93LqDGDHwY)  
  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Manual\_Level\_Streaming\_RU&oldid=5839](https://wiki.unrealengine.com/index.php?title=Blueprint_Manual_Level_Streaming_RU&oldid=5839)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [LevelStreaming](/index.php?title=Category:LevelStreaming&action=edit&redlink=1 "Category:LevelStreaming (page does not exist)")

  ![](https://tracking.unrealengine.com/track.png)