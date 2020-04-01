Blueprint Анимация вращения и движения - Epic Wiki                     

Blueprint Анимация вращения и движения
======================================

(Redirected from [Blueprint Animate Rotation and Movement Tutorial RU](/index.php?title=Blueprint_Animate_Rotation_and_Movement_Tutorial_RU&redirect=no "Blueprint Animate Rotation and Movement Tutorial RU"))

  

Contents
--------

*   [1 Введение](#.D0.92.D0.B2.D0.B5.D0.B4.D0.B5.D0.BD.D0.B8.D0.B5)
*   [2 Начало работы с Blueprint](#.D0.9D.D0.B0.D1.87.D0.B0.D0.BB.D0.BE_.D1.80.D0.B0.D0.B1.D0.BE.D1.82.D1.8B_.D1.81_Blueprint)
    *   [2.1 Переменные](#.D0.9F.D0.B5.D1.80.D0.B5.D0.BC.D0.B5.D0.BD.D0.BD.D1.8B.D0.B5)
    *   [2.2 Ограничения](#.D0.9E.D0.B3.D1.80.D0.B0.D0.BD.D0.B8.D1.87.D0.B5.D0.BD.D0.B8.D1.8F)
    *   [2.3 Функция GetNewFromAndTo](#.D0.A4.D1.83.D0.BD.D0.BA.D1.86.D0.B8.D1.8F_GetNewFromAndTo)
    *   [2.4 Функция GetNewFromAndTo](#.D0.A4.D1.83.D0.BD.D0.BA.D1.86.D0.B8.D1.8F_GetNewFromAndTo_2)
*   [3 Blueprint. Пошаговое руководство](#Blueprint._.D0.9F.D0.BE.D1.88.D0.B0.D0.B3.D0.BE.D0.B2.D0.BE.D0.B5_.D1.80.D1.83.D0.BA.D0.BE.D0.B2.D0.BE.D0.B4.D1.81.D1.82.D0.B2.D0.BE)
    *   [3.1 Как запустить анимацию](#.D0.9A.D0.B0.D0.BA_.D0.B7.D0.B0.D0.BF.D1.83.D1.81.D1.82.D0.B8.D1.82.D1.8C_.D0.B0.D0.BD.D0.B8.D0.BC.D0.B0.D1.86.D0.B8.D1.8E)
    *   [3.2 Настройка анимации](#.D0.9D.D0.B0.D1.81.D1.82.D1.80.D0.BE.D0.B9.D0.BA.D0.B0_.D0.B0.D0.BD.D0.B8.D0.BC.D0.B0.D1.86.D0.B8.D0.B8)
    *   [3.3 Завершение анимации](#.D0.97.D0.B0.D0.B2.D0.B5.D1.80.D1.88.D0.B5.D0.BD.D0.B8.D0.B5_.D0.B0.D0.BD.D0.B8.D0.BC.D0.B0.D1.86.D0.B8.D0.B8)
*   [4 Завершение работы](#.D0.97.D0.B0.D0.B2.D0.B5.D1.80.D1.88.D0.B5.D0.BD.D0.B8.D0.B5_.D1.80.D0.B0.D0.B1.D0.BE.D1.82.D1.8B)
*   [5 Русское сообщество Unreal Engine 4](#.D0.A0.D1.83.D1.81.D1.81.D0.BA.D0.BE.D0.B5_.D1.81.D0.BE.D0.BE.D0.B1.D1.89.D0.B5.D1.81.D1.82.D0.B2.D0.BE_Unreal_Engine_4)

Введение
--------

Цель данного урока в том, чтобы иметь гибкую систему произвольных движений(анимаций). Кроме того, вы можете сделать переменную скорость в зависимости от угла поворота и движений; каждый из которых имеет собственную скорость.

Эта анимация предназначена для бесконечного цикла(повторений) - после окончания анимации, она вернется к началу. Это моя первая работа с blueprint, если есть более оптимальный способ реализации - сообщите. [![MoveAndRotate.gif](https://d26ilriwvtzlb.cloudfront.net/8/82/MoveAndRotate.gif)](/File:MoveAndRotate.gif)

Начало работы с Blueprint
-------------------------

1.  Создайте какой нибудь прямоугольник, или объект, например, самурайский меч;
2.  Сконвертируйте ваш объект в static mesh;
3.  Создайте blueprint-скрипт и назовите, как вам удобно;
4.  Добавьте ваш объект в blueprint, как компонент;
5.  Создайте новые переменные и функции

### Переменные

SecondsPerRot (editable, default = 1)

SecondsPerMove (editable, default = 1)

Rotations (Rotation array, editable)

Movements (Vector array, editable, show 3d widget)

MovementsWorld (Vector array)

InitialLocation (Vector)

RotFrom (int)

RotTo (int, default = 1)

MoveFrom (int)

MoveTo (int, default = 1)

fNewFrom (int)

fNewTo (int)

### Ограничения

1.  Щелкните правой кнопкой мыши в вашем графике событий и введите "добавить ограничения"("add timeline") и дать ему название «TimelineMovement".
2.  Щелкните правой кнопкой мыши в вашем графике событий и введите "добавить ограничения"("add timeline") и дать ему название «TimelineRotations".
3.  Для настройки ограничения кликните дважды по значку события, добавьте два ключевых события(shift + нажатие): (0,0) и (1,1);
4.  Подробнее об timelines вы можете узнать в [офф. документации](https://docs.unrealengine.com/latest/INT/Engine/Blueprints/UserGuide/Timelines/index.html)

### Функция GetNewFromAndTo

Create a new function in this blueprint. Set it's "Access Specifier" and its Inputs and Outputs per the screenshot below.

[![Bp animate5.JPG](https://d26ilriwvtzlb.cloudfront.net/e/eb/Bp_animate5.JPG)](/File:Bp_animate5.JPG)

In the end you should have something like this. "Blade" below is my static mesh component, yours will be different.

[![Bp vars.JPG](https://d26ilriwvtzlb.cloudfront.net/4/4c/Bp_vars.JPG)](/File:Bp_vars.JPG)

### Функция GetNewFromAndTo

For lack of a better name I choose to name it this. Feel free to change it. Why is this a function? Because we need it twice, once for the movement and once for the rotations. I loathe duplicating code and feel the same when blueprinting. "DRY it up"...."don't repeat yourself" if you can help it and make functions in your blueprints! However, at this point in time I think Blueprint functions lack the proper feature to have variables scoped in their own function with the same user interface (get/set) like any other blueprint event graph variable.

That's why we have the hack variables "fNewFrom" and "fNewTo". Without these we would have to use the "Local Variables" that you see in a function, and to be honest they seem very lacking right now. These are hack variables because they are exposed outside of our function and we may accidentally edit them. Also, there could be a possibility that the finish event of our two timelines collide over these (although doubtful unless timelines are multithreaded?). [![Bp animate6.JPG](https://d26ilriwvtzlb.cloudfront.net/d/de/Bp_animate6.JPG)](/File:Bp_animate6.JPG)

Blueprint. Пошаговое руководство
--------------------------------

### Как запустить анимацию

As you can see below, this blueprint can function with it's defualts. There will be no animations unless the level designer has added elements to the editable Movements and Rotations arrays. Also, we set the initial location which you will see why next. [![Bp animate1.JPG](https://d26ilriwvtzlb.cloudfront.net/2/21/Bp_animate1.JPG)](/File:Bp_animate1.JPG)

### Настройка анимации

Our two Branch nodes in the above screenshot take these two paths in the screenshot below respectively. Before we setup our animations I need to point something out. All the elements that get added to the "Movements" array by the level designer will be converted to world space. So it's important that when they get created in the editor to do so with the rotation transform at 0,0,0 (if using the 3D widget for each one). Otherwise, the movement animation wont be what was desired. We do this so we can possibly procedurally spawn this blueprint in our level and have the movements be relative to wherever they are spawned.

We have two timelines, one for rotation and one for movement. You can see how we change the play rate of the timelines, wireup the update of the timelines and wire up the finished. The updates lerp and then set the new location or rotation. The real trick is all the _...to_ and _...from_ variables. Further down I will show you a function that sets those magic variables for us. [![Bp animate2.JPG](https://d26ilriwvtzlb.cloudfront.net/e/eb/Bp_animate2.JPG)](/File:Bp_animate2.JPG)

### Завершение анимации

This is the place were we call our function and set the outputs that will be used in the next time we do our animation. That function below **GetNewFromAndTwo**, wraps our movement and rotations array. By wrapping the array we always get a valid index for the next item to animate to. That function is shown in the next section.

1\. Create the nodes below, then, wire up the "Finish" of the **TimelineRotations** node to the "GetNewFromAndTwo" as seen below.

[![Bp animate3.JPG](https://d26ilriwvtzlb.cloudfront.net/f/f4/Bp_animate3.JPG)](/File:Bp_animate3.JPG)

2\. Create the nodes below, then, wire up the "Finish" of the **TimelineMovement** node to the "GetNewFromAndTwo" as seen below.

[![Bp animate4.JPG](https://d26ilriwvtzlb.cloudfront.net/d/d0/Bp_animate4.JPG)](/File:Bp_animate4.JPG)

  

Завершение работы
-----------------

Here are the settings I used that you see in the animated gif above after I placed this blueprint into my level. And after that is the thumb for the full blueprint in all it's glory. If you know of a better way to implement this please do let me know as it was a learning process for me.

[![](https://d3ar1piqh1oeli.cloudfront.net/6/69/Bp_animate7.JPG/180px-Bp_animate7.JPG)](/File:Bp_animate7.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:Bp_animate7.JPG "Enlarge")

Caption text

[![Bp animate8.JPG](https://d26ilriwvtzlb.cloudfront.net/e/e7/Bp_animate8.JPG)](/File:Bp_animate8.JPG)

Русское сообщество Unreal Engine 4
----------------------------------

[Русское сообщество Unreal Engine 4](http://ue4.codengine.ru)

[Уроки по Unreal Engine 4 на Русском](http://ue4.codengine.ru/index.php/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A3%D1%80%D0%BE%D0%BA%D0%B8)

[Ссылка на русское сообщество](http://ue4.codengine.ru/index.php/Blueprint_%D0%90%D0%BD%D0%B8%D0%BC%D0%B0%D1%86%D0%B8%D1%8F_%D0%B2%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B8_%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Анимация\_вращения\_и\_движения&oldid=3999](https://wiki.unrealengine.com/index.php?title=Blueprint_Анимация_вращения_и_движения&oldid=3999)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

  ![](https://tracking.unrealengine.com/track.png)