Анимированный Загрузочный Экран - Epic Wiki                    

Анимированный Загрузочный Экран
===============================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:4.7

Contents
--------

*   [1 Общая информация](#.D0.9E.D0.B1.D1.89.D0.B0.D1.8F_.D0.B8.D0.BD.D1.84.D0.BE.D1.80.D0.BC.D0.B0.D1.86.D0.B8.D1.8F)
*   [2 Level Streaming](#Level_Streaming)
*   [3 Как я смогу использовать эту особенность для создания загрузочного экрана?](#.D0.9A.D0.B0.D0.BA_.D1.8F_.D1.81.D0.BC.D0.BE.D0.B3.D1.83_.D0.B8.D1.81.D0.BF.D0.BE.D0.BB.D1.8C.D0.B7.D0.BE.D0.B2.D0.B0.D1.82.D1.8C_.D1.8D.D1.82.D1.83_.D0.BE.D1.81.D0.BE.D0.B1.D0.B5.D0.BD.D0.BD.D0.BE.D1.81.D1.82.D1.8C_.D0.B4.D0.BB.D1.8F_.D1.81.D0.BE.D0.B7.D0.B4.D0.B0.D0.BD.D0.B8.D1.8F_.D0.B7.D0.B0.D0.B3.D1.80.D1.83.D0.B7.D0.BE.D1.87.D0.BD.D0.BE.D0.B3.D0.BE_.D1.8D.D0.BA.D1.80.D0.B0.D0.BD.D0.B0.3F)
*   [4 11 коротких шагов для создания Анимированного Экрана Загрузки](#11_.D0.BA.D0.BE.D1.80.D0.BE.D1.82.D0.BA.D0.B8.D1.85_.D1.88.D0.B0.D0.B3.D0.BE.D0.B2_.D0.B4.D0.BB.D1.8F_.D1.81.D0.BE.D0.B7.D0.B4.D0.B0.D0.BD.D0.B8.D1.8F_.D0.90.D0.BD.D0.B8.D0.BC.D0.B8.D1.80.D0.BE.D0.B2.D0.B0.D0.BD.D0.BD.D0.BE.D0.B3.D0.BE_.D0.AD.D0.BA.D1.80.D0.B0.D0.BD.D0.B0_.D0.97.D0.B0.D0.B3.D1.80.D1.83.D0.B7.D0.BA.D0.B8)
*   [5 Итог](#.D0.98.D1.82.D0.BE.D0.B3)

Общая информация
----------------

Самый простой способ создания экрана загрузки (лоадскрина) заключается в отображении на экране обычной статической картинки при загрузке непосредственно уровня. (Для создания ощущения беспрерывной загрузки даже если движок при этом зависает!).

Мне удалось выяснить способ отображения анимированных изображений на экране загрузки...БЕЗ зависания самого движка!

Как это сделать?

Level Streaming
---------------

Некоторые из вас не имеют ни малейшего понятия о том, что же такое “Level Streaming”. И это круто. Давайте сделаем супер-быстрый обзор самого “Level Streaming'a” и того как он может быть использован при создании нашего анимированного лоадскрина.

Level Streaming (в Unreal Engine 4): Level Streaming это особенность Unreal Engine 4 которая позволяет загружать/выгружать уровни на лету и дает разработчику дополнительную возможность переключать их отображение в игровом времени. Проще говоря, вы можете взять огромную карту разбить ее на кусочки, которые будут загружаться/выгружаться не все сразу а по мере надобности, таким образом увеличивая производительность.

Как я смогу использовать эту особенность для создания загрузочного экрана?
--------------------------------------------------------------------------

В двух словах я расскажу о том, что мне нужно было сделать, чтобы на экране отображался черный экран с вращающейся стрелкой. Сначала я создал “Begin Play” в level blueprint и соединил с событием(event), которое называется “Open Stream Level” (С тем уровнем, который я выбрал для загрузки).

У этого узла(node) есть выход(output) с названием “Completed”, который срабатывает один раз, когда уровень загружен. Так что я по быстрому создал Matinee (Который содержал single Fade in > Fade Out) и выстрелил, когда уровень был загружен.

Отсюда, я просто изменил активную камеру из “Loading level” на одну из main level когда Matinee полностью исчез(faded out). Затем, когда камера изменилась, я отобразил все снова)fade back in) и БАМ! Уровень готов и загружен! _(Прошу проверить этот абзац других пользователей в оригинале и внести необходимые правки, если таковые нужны!)_

Я знаю что читая это вслух все это звучит сложно, хотя на самом деле это супер-супер просто. Для людей не знакомых с Unreal Engine 4, это прозвучало как два параграфа на инопланетном языке, но я распишу вам весь процесс поэтапно!

11 коротких шагов для создания Анимированного Экрана Загрузки
-------------------------------------------------------------

Step #1 - Переходим в _**Window**_ > _**Levels**_

Step #2 - Создаем новый уровень(_**New Level**_) выбираем в “_**Levels**_” и нажимаем “_**Create new Level**_”

Step #3 - В основном уровне(main level) перемещаем все что подсвечено в окно редактора(editor window) и выбираем “_**Move Selected Actors to Level**_” с помощью вкладки “Уровни(_**Levels**_)”.

Step #4 - Убедитесь что созданная вами текстура самого лоадскрина, камера и анимированная иконка находятся в “_**Persistent Level**_”.

Step #5 - В “_**Level Blueprint**_” (для “_**Persistent Level**_”), я создаю событие(_event_) “Начать игру (_**Begin Play**_)” и создаем узел(_node_) “_**Open Stream Level**_” и соединяем их.

Step #6 - Ввожу название уровня в “_**Open Stream Level**_” и проверяю чтобы “'**Block on Load'**” не был отмечен галочкой, но включен “_**Make visible after load**_”.

Step #7 - Создаем Matinee с треком “_**Fade**_” и треком “_**Event**_”. Затем необходимо сделать быстрое _**Fade out / Fade in**_ и расположить событие (_event_) в то время, когда экран будет полностью черный.

Step #8 - Возвращаемся к “_**Level Blueprint**_” и создаем узел “_**Play**_” Matinee один раз, когда уровень был загружен.

Step #9 - Затем добавляем узел (_node_) - “_**MatineeController**_” жмем ПКМ и выбираем “_**Refresh nodes**_” чтобы наш _event_ созданный в Matinee появился.

Step #10 - Добавляем узел (_node_) - “Remote Event” который ищет все _Level Blueprints_ для события (_event_) in question to fire it.

Step #11 - в “Level Blueprint” на уровне, который был загружен, я создаю событие (_event_) которое называется точно так же - “Remote Event” и соединяю с узлом “_**Get Player Controller > Set View Target with Blend**_”.

И это все, что нам необходимо сделать!

Видите? 11 простых шагов и у нас анимированный лоадскрин. Впечатляет !

Итог
----

Теперь я использую этот способ в каждом уровне в SUPER DISTRO. Даже в тех случаях, когда мы переходим между уровнями, я просто затеняю до черноты Мatinee и затем гружу на следующем “Whole” уровне, отображая на следующем уровне на лоадскрине.

Видите? Все просто!

Оригинал статьи - [https://wiki.unrealengine.com/Animated\_Loading\_Screen](https://wiki.unrealengine.com/Animated_Loading_Screen)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Анимированный\_Загрузочный\_Экран&oldid=14323](https://wiki.unrealengine.com/index.php?title=Анимированный_Загрузочный_Экран&oldid=14323)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Community](/index.php?title=Category:Community&action=edit&redlink=1 "Category:Community (page does not exist)")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)