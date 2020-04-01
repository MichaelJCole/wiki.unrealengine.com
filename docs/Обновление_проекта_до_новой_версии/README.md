Обновление проекта до новой версии - Epic Wiki                    

Обновление проекта до новой версии
==================================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

Краткая инструкция по обновлению проекта на новую версию движка, на примере перехода с Unreal Engine версии 4.0 до 4.1. Обратите внимание, что вся информация берется непосредственно из пресс-релиза Unreal Engine 4.1.

Обновление проекта на Blueprint
-------------------------------

Blueprint-скрипты обновляются автоматически, исключая ситуации, когда в новой версии движка было изменено Blueprint API. В этой ситуации, прочитайте раздел изменения API для получения дополнительной информации.

Обновление проекта на C++
-------------------------

*   Вы должны будете перекомпилировать свой проект на C++ для новой версии Unreal Engine.
*   Найдите .uproject файл в папке вашего проекта, щелкните правой кнопкой мыши и выберите опцию генерации новых файлов проекта, после чего перекомпилируйте проект.

**Примечение:** Если вы используете скомпилированный из исходников движок, и _не_ установили движок через Unreal Launcher, опция по генерации файлов проекта может отсутствовать в выпадающем меню. Для её появления вам потребуется скачать и установить движок соответствующей версии через Unreal Launcher. **Примечание:** Некоторые API C++ могут быть изменены в зависимости от версии, что может вызвать ошибки компиляции. Прочитайте раздел изменения API для получения дополнительной информации.

Автор перевода: [Sentike](/User:Sentike "User:Sentike")

Исправления: [Lordink](/index.php?title=User:Lordink&action=edit&redlink=1 "User:Lordink (page does not exist)")

Русское сообщество Unreal Engine 4
----------------------------------

[Русское сообщество Unreal Engine 4](http://ue4.codengine.ru)

[Уроки по Unreal Engine 4 на Русском](http://ue4.codengine.ru/index.php/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A3%D1%80%D0%BE%D0%BA%D0%B8)

[Ссылка на русское сообщество](http://ue4.codengine.ru/index.php/%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0_%D0%B4%D0%BE_%D0%BD%D0%BE%D0%B2%D0%BE%D0%B9_%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Обновление\_проекта\_до\_новой\_версии&oldid=8331](https://wiki.unrealengine.com/index.php?title=Обновление_проекта_до_новой_версии&oldid=8331)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)