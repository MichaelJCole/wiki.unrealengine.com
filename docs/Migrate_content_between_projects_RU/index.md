Migrate content between projects RU - Epic Wiki                    

Migrate content between projects RU
===================================

  
Если у вас имеются Blueprint/Material/и так далее. в одном проекте, и вы хотите использовать их в другом проекте, то вы можете воспользоваться функцией переноса "Migrate". Функция переноса скопирует все зависящие элементы для переносимых объектов. Данный способ кардинально отличается от функции экспорта.  
  

Contents
--------

*   [1 Как перенести (скопировать) содержимое из одного проекта в другой](#.D0.9A.D0.B0.D0.BA_.D0.BF.D0.B5.D1.80.D0.B5.D0.BD.D0.B5.D1.81.D1.82.D0.B8_.28.D1.81.D0.BA.D0.BE.D0.BF.D0.B8.D1.80.D0.BE.D0.B2.D0.B0.D1.82.D1.8C.29_.D1.81.D0.BE.D0.B4.D0.B5.D1.80.D0.B6.D0.B8.D0.BC.D0.BE.D0.B5_.D0.B8.D0.B7_.D0.BE.D0.B4.D0.BD.D0.BE.D0.B3.D0.BE_.D0.BF.D1.80.D0.BE.D0.B5.D0.BA.D1.82.D0.B0_.D0.B2_.D0.B4.D1.80.D1.83.D0.B3.D0.BE.D0.B9)
    *   [1.1 Шаг 1: Выбрать контент](#.D0.A8.D0.B0.D0.B3_1:_.D0.92.D1.8B.D0.B1.D1.80.D0.B0.D1.82.D1.8C_.D0.BA.D0.BE.D0.BD.D1.82.D0.B5.D0.BD.D1.82)
    *   [1.2 Шаг 2: ПКМ](#.D0.A8.D0.B0.D0.B3_2:_.D0.9F.D0.9A.D0.9C)
    *   [1.3 Шаг 3: Подтвердить Assets](#.D0.A8.D0.B0.D0.B3_3:_.D0.9F.D0.BE.D0.B4.D1.82.D0.B2.D0.B5.D1.80.D0.B4.D0.B8.D1.82.D1.8C_Assets)
    *   [1.4 Шаг 4: Выберите проект в который хотите переместить контент](#.D0.A8.D0.B0.D0.B3_4:_.D0.92.D1.8B.D0.B1.D0.B5.D1.80.D0.B8.D1.82.D0.B5_.D0.BF.D1.80.D0.BE.D0.B5.D0.BA.D1.82_.D0.B2_.D0.BA.D0.BE.D1.82.D0.BE.D1.80.D1.8B.D0.B9_.D1.85.D0.BE.D1.82.D0.B8.D1.82.D0.B5_.D0.BF.D0.B5.D1.80.D0.B5.D0.BC.D0.B5.D1.81.D1.82.D0.B8.D1.82.D1.8C_.D0.BA.D0.BE.D0.BD.D1.82.D0.B5.D0.BD.D1.82)
*   [2 ВАЖНО](#.D0.92.D0.90.D0.96.D0.9D.D0.9E)
    *   [2.1 Перенос из C++ Project в C++ Project](#.D0.9F.D0.B5.D1.80.D0.B5.D0.BD.D0.BE.D1.81_.D0.B8.D0.B7_C.2B.2B_Project_.D0.B2_C.2B.2B_Project)
    *   [2.2 Перенос из C++ Project в Blueprint Project](#.D0.9F.D0.B5.D1.80.D0.B5.D0.BD.D0.BE.D1.81_.D0.B8.D0.B7_C.2B.2B_Project_.D0.B2_Blueprint_Project)
*   [3 Русское сообщество Unreal Engine 4](#.D0.A0.D1.83.D1.81.D1.81.D0.BA.D0.BE.D0.B5_.D1.81.D0.BE.D0.BE.D0.B1.D1.89.D0.B5.D1.81.D1.82.D0.B2.D0.BE_Unreal_Engine_4)

Как перенести (скопировать) содержимое из одного проекта в другой
-----------------------------------------------------------------

### Шаг 1: Выбрать контент

Сперва вы должны найти желаемый контент в content browser, возможно для этого вам придется воспользоваться функцией поиска.  
  

### Шаг 2: ПКМ

Найдя контент который вы хотите переместить, нажмите правую кнопку мыши для появления контекстного меню. Затем выберите "Migrate...".  
[![RMB Migrate.png](https://d26ilriwvtzlb.cloudfront.net/2/22/RMB_Migrate.png)](/File:RMB_Migrate.png)  
  

### Шаг 3: Подтвердить Assets

Нажав "Migrate..." откроется окно Asset Browser. Здесь отображаются все файлы связанные с переносимым объектом. Нажмите "OK".  
[![Migrate Asset Report.png](https://d26ilriwvtzlb.cloudfront.net/9/9b/Migrate_Asset_Report.png)](/File:Migrate_Asset_Report.png)  
  

### Шаг 4: Выберите проект в который хотите переместить контент

Появиться список папок. Найдите папку где находится ваш проект на Unreal Engine, в нем найдите папку _Content_. Нажмите "OK".

Местоположение по умолчанию

Documents\\Unreal Projects\\(project name)\\Content

[![Migrate Browse Folders.png](https://d26ilriwvtzlb.cloudfront.net/3/3e/Migrate_Browse_Folders.png)](/File:Migrate_Browse_Folders.png)

  
  
Отобразиться окно прогресса копирования, по его завершению вы сможете открыть свой проект и посмотреть результат копирования.  
  

ВАЖНО
-----

### Перенос из C++ Project в C++ Project

Если вы переносите содержимое из одного C++ project в другой C++ project, то у вас не будет никаких объектов таких как функции и переменные, которые были скомпилированы на C++. Для этого вам понадобиться запустить Visual Studio и копировать/вставить соответствующий C++ проекта в другой и снова нажать 'Build'.  
  

### Перенос из C++ Project в Blueprint Project

Если вы переносите содержимое из C++ проекта в Blueprint проект, то у вас не будет никаких объектов таких как функции и переменные, которые были скомпилированы на C++. Вам понадобиться создать новые Blueprint функции которые будут повторять те же созданные в C++.  
  

Русское сообщество Unreal Engine 4
----------------------------------

[Русское сообщество Unreal Engine 4](http://ue4.codengine.ru)

[Уроки по Unreal Engine 4 на Русском](http://ue4.codengine.ru/index.php/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A3%D1%80%D0%BE%D0%BA%D0%B8)

[Ссылка на русское сообщество](http://ue4.codengine.ru/index.php/Blueprint_%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D0%B4%D0%B2%D0%B5%D1%80%D0%B8)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Migrate\_content\_between\_projects\_RU&oldid=6441](https://wiki.unrealengine.com/index.php?title=Migrate_content_between_projects_RU&oldid=6441)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)