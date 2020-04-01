Создание многослойных материалов - Epic Wiki             

Создание многослойных материалов
================================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Вступление](#.D0.92.D1.81.D1.82.D1.83.D0.BF.D0.BB.D0.B5.D0.BD.D0.B8.D0.B5)
*   [2 Простой материал хрома](#.D0.9F.D1.80.D0.BE.D1.81.D1.82.D0.BE.D0.B9_.D0.BC.D0.B0.D1.82.D0.B5.D1.80.D0.B8.D0.B0.D0.BB_.D1.85.D1.80.D0.BE.D0.BC.D0.B0)
    *   [2.1 Ноды материала Хрома](#.D0.9D.D0.BE.D0.B4.D1.8B_.D0.BC.D0.B0.D1.82.D0.B5.D1.80.D0.B8.D0.B0.D0.BB.D0.B0_.D0.A5.D1.80.D0.BE.D0.BC.D0.B0)
        *   [2.1.1 Основной цвет](#.D0.9E.D1.81.D0.BD.D0.BE.D0.B2.D0.BD.D0.BE.D0.B9_.D1.86.D0.B2.D0.B5.D1.82)
        *   [2.1.2 Переменная "Metallic"](#.D0.9F.D0.B5.D1.80.D0.B5.D0.BC.D0.B5.D0.BD.D0.BD.D0.B0.D1.8F_.22Metallic.22)
        *   [2.1.3 Шероховатости](#.D0.A8.D0.B5.D1.80.D0.BE.D1.85.D0.BE.D0.B2.D0.B0.D1.82.D0.BE.D1.81.D1.82.D0.B8)
        *   [2.1.4 Настройка нормалей](#.D0.9D.D0.B0.D1.81.D1.82.D1.80.D0.BE.D0.B9.D0.BA.D0.B0_.D0.BD.D0.BE.D1.80.D0.BC.D0.B0.D0.BB.D0.B5.D0.B9)

Вступление
----------

Здравствуйте, в данном уроке, мы разберемся, как создать простой, но многослойный материал; в данном случае: хром и снег. В результате чего, снег будет на поверхности объекта, так же будет осуществлено эффективное переключение между материалами.

Простой материал хрома
----------------------

*   [![](https://d3ar1piqh1oeli.cloudfront.net/4/4f/T_ExampleLayers_Metal01_BC.png/120px-T_ExampleLayers_Metal01_BC.png)](/File:T_ExampleLayers_Metal01_BC.png)
    
    T\_ExampleLayers\_Metal\_1\_BC.png
    
*   [![](https://d3ar1piqh1oeli.cloudfront.net/e/e5/T_ExampleLayers_Metal01_N.png/120px-T_ExampleLayers_Metal01_N.png)](/File:T_ExampleLayers_Metal01_N.png)
    
    T\_ExampleLayers\_Metal01\_N.png
    

Для нашего первого слоя материала, мы создадим хром с небольшой коррозией или неровностями в поверхности. Чтобы показать возможности редактирования, мы также создать несколько входов для управления внешним видом.

1.  В Content Browser, щелкните правой кнопкой и выберите материалы и текстуры > Функция Материалов(**Materials & Textures** > **Material Function**.)
    
    [![MakeMaterialFunction MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/2/2b/MakeMaterialFunction_MatLayTut.png)](/File:MakeMaterialFunction_MatLayTut.png)
    
    [![](/skins/common/images/magnify-clip.png)](/File:MakeMaterialFunction_MatLayTut.png "Enlarge")
    
2.  Назовите новую функцию Layer\_Chrome
    
    [![Layer Chrome.jpg](https://d26ilriwvtzlb.cloudfront.net/8/82/Layer_Chrome.jpg)](/File:Layer_Chrome.jpg)
    
    [![](/skins/common/images/magnify-clip.png)](/File:Layer_Chrome.jpg "Enlarge")
    
3.  Откройте, созданную функцию в редакторе материалов (двойной клик мышью)
    
    [![EditLayerChrome MatLayTut.png](https://d3ar1piqh1oeli.cloudfront.net/7/74/EditLayerChrome_MatLayTut.png/940px-EditLayerChrome_MatLayTut.png)](/File:EditLayerChrome_MatLayTut.png)
    
    [![](/skins/common/images/magnify-clip.png)](/File:EditLayerChrome_MatLayTut.png "Enlarge")
    
4.  Далее, нажмите правой кнопкой мыши и выберите **Material Attributes** > **Make Material Attributes**.
    
    [![MakeMaterialAttributesContext MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/b/b3/MakeMaterialAttributesContext_MatLayTut.png)](/File:MakeMaterialAttributesContext_MatLayTut.png)
    
    [![](/skins/common/images/magnify-clip.png)](/File:MakeMaterialAttributesContext_MatLayTut.png "Enlarge")
    
5.  Подключите ваш материал (**Base color**) к **Output Result**
    
    [![ConnectedMMA MatLayTut.png](https://d26ilriwvtzlb.cloudfront.net/4/44/ConnectedMMA_MatLayTut.png)](/File:ConnectedMMA_MatLayTut.png)
    
    [![](/skins/common/images/magnify-clip.png)](/File:ConnectedMMA_MatLayTut.png "Enlarge")
    

### Ноды материала Хрома

Ноды для этого слоя просты, они разбиты на отдельные части для лучшего понимания. Мы будем использовать всего две текстуры для этого материала:

*   T\_ExampleLayers\_Metal\_1\_BC.png для основного цвета и шероховатости;
*   T\_ExampleLayers\_Metal01\_N.png для карты нормалей.

Материал слоя разбивается на блоки комментариев, которые описаны ниже:

#### Основной цвет

Основной цвет - Эта часть кода очень просто. Мы создали линейный Interpolate, который взаимодействует с основным цветов хрома и другим цветом. Vector3, позволяет нам изменять цвет хрома. Мы используем красный канал T\_ExampleLayers\_Metal\_1\_BC текстуры для взаимодействия между ними.

  

#### Переменная "Metallic"

Metallic - так как мы создаем металл, если значение Metallic = 1

#### Шероховатости

Roughness - мы создаем хром, поэтому шероховатость будет почти отсутствовать. Тем не менее, в темных областях мы собираемся увеличить шероховатость, просто чтобы дать некоторую глубину в общий вид материала, для чего мы просто устанавливаем значение Lerping от 0,2 до 0,4.

#### Настройка нормалей

В этой части, мы отделяем зеленые и красные каналы, которые контролируют саму карту высот. После чего, мы умножаем полученные значения за счет чего получаем новые результат. Scalar - умножает высоты.

Будьте уверены, что вы сохранили свой материал перед выходом.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Создание\_многослойных\_материалов&oldid=4273](https://wiki.unrealengine.com/index.php?title=Создание_многослойных_материалов&oldid=4273)"