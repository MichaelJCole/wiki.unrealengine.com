Blueprint Light Switch Tutorial RU - Epic Wiki                    

Blueprint Light Switch Tutorial RU
==================================

Настройка сцена
===============

1\. Откройте проект **Blank With Starter Content**.

2\. У светильника прикрепленного к потолку выберите источник света PointLight1.

[![Selected pointlight.Jpeg](https://d3ar1piqh1oeli.cloudfront.net/a/ac/Selected_pointlight.Jpeg/400px-Selected_pointlight.Jpeg)](/File:Selected_pointlight.Jpeg)

[![](/skins/common/images/magnify-clip.png)](/File:Selected_pointlight.Jpeg "Enlarge")

  
3\. На панели **Details** уберите галочку с **Visible** и в **Rendering** свет выключится.

4\. На закладке Modes , выберите **Place** и затем **Volumes**.

5\. Пролистайте вниз до **Trigger Volume**, и затем разместите его на карте.

6\. Масштабируйте TriggerVolume до тех пор пока он не заполнит комнату.

[![Placedtriggervolume.Jpeg](https://d3ar1piqh1oeli.cloudfront.net/f/f3/Placedtriggervolume.Jpeg/400px-Placedtriggervolume.Jpeg)](/File:Placedtriggervolume.Jpeg)

[![](/skins/common/images/magnify-clip.png)](/File:Placedtriggervolume.Jpeg "Enlarge")

  

Blueprint
=========

Пришло время создать логическую часть Level Blueprint, он будет включать свет когда вы входите в комнату и выключать, когда вы её покидаете.

  
1\. В закладке **Details** для TriggerVolume, пролистайте до заголовка **Blueprint**.

2\. В раскрывшемся **Add Level Events for TriggerVolume**, выберите **Add On Actor Begin Overlap**.

Откроется **Level Blueprint** и узел события **Event** автоматически добавится для вашего TriggerVolume.

3\. Мы хотим, что бы свет включался когда вы входите в комнату. Нам нужна ссылка на источник света. Вернемся в редактор уровня и выберем PointLight1.

4\. Вернемся в Level Blueprint.

5\. ПКМ с пустой области graph и в контекстном меню выберем **Add Reference to PointLight1**.

6\. Перетащим синий кончик **PointLight1** в свободную часть и тем самым вызовем контекстное меню.

7\. В контекстном меню найдем **Visibility**, и выберем **Toggle Visibility**.

8\. Теперь нам нужно соединить узел **On Actor Begin Overlap** с узлом **Toggle Visibility**, для этого нужно выполнить событие **Toggle Visibility**. Кликните на output pin On Actor Begin Overlap и перетащите его на input execution pin у **Toggle Visibility**.

9\. И конечно же мы хотим, что бы свет выключался когда мы покидаем комнату. ПКМ на узле**On Actor Begin Overlap** и нажмите **Find Actor in Level**. Это выделит TriggerVolume в SceneOutliner.

10\. ПКМ на **TriggerVolume3** в **Scene Outliner**.

11\. В **Level Blueprint Events**, наведите курсор на Add Event и в раскрывшемся меню выберите **On Actor End Overlap**. Откроется**Level Blueprint** и узел события **Event**для вашего TriggerVolume добавится автоматически.

12\. Перетащите output pin для **On Actor End Overlap** на input execution pin для **Toggle Visibility**.Вы можете кликнуть на и перетащить **On Actor End Overlap** в окне graph для его наилучшего расположения.

13\. Нажмите Play в редакторе для проверки логики вашего нового Blueprint!

[![](https://d3ar1piqh1oeli.cloudfront.net/6/66/Lightswitch_tut_blueprint1.jpg/600px-Lightswitch_tut_blueprint1.jpg)](/File:Lightswitch_tut_blueprint1.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Lightswitch_tut_blueprint1.jpg "Enlarge")

Final Blueprint layout

Русское сообщество Unreal Engine 4
----------------------------------

[Русское сообщество Unreal Engine 4](http://ue4.codengine.ru)

[Уроки по Unreal Engine 4 на Русском](http://ue4.codengine.ru/index.php/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A3%D1%80%D0%BE%D0%BA%D0%B8)

[Ссылка на русское сообщество](http://ue4.codengine.ru/index.php/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D1%87%D0%B0%D1%81%D1%82%D0%B8%D1%86_%D0%B2_UE_4)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Light\_Switch\_Tutorial\_RU&oldid=5752](https://wiki.unrealengine.com/index.php?title=Blueprint_Light_Switch_Tutorial_RU&oldid=5752)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

  ![](https://tracking.unrealengine.com/track.png)