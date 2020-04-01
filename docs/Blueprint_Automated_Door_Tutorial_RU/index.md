Blueprint автоматические двери - Epic Wiki                     

Blueprint автоматические двери
==============================

(Redirected from [Blueprint Automated Door Tutorial RU](/index.php?title=Blueprint_Automated_Door_Tutorial_RU&redirect=no "Blueprint Automated Door Tutorial RU"))

  
Перевод в процессе, появится в ближайшее время

Contents
--------

*   [1 Обзор](#.D0.9E.D0.B1.D0.B7.D0.BE.D1.80)
*   [2 Начальная настройка](#.D0.9D.D0.B0.D1.87.D0.B0.D0.BB.D1.8C.D0.BD.D0.B0.D1.8F_.D0.BD.D0.B0.D1.81.D1.82.D1.80.D0.BE.D0.B9.D0.BA.D0.B0)
    *   [2.1 Новый Blueprint](#.D0.9D.D0.BE.D0.B2.D1.8B.D0.B9_Blueprint)
    *   [2.2 Mesh компоненты](#Mesh_.D0.BA.D0.BE.D0.BC.D0.BF.D0.BE.D0.BD.D0.B5.D0.BD.D1.82.D1.8B)
    *   [2.3 Box Component](#Box_Component)
    *   [2.4 Тестирование уровня](#.D0.A2.D0.B5.D1.81.D1.82.D0.B8.D1.80.D0.BE.D0.B2.D0.B0.D0.BD.D0.B8.D0.B5_.D1.83.D1.80.D0.BE.D0.B2.D0.BD.D1.8F)
    *   [2.5 Инициализация события](#.D0.98.D0.BD.D0.B8.D1.86.D0.B8.D0.B0.D0.BB.D0.B8.D0.B7.D0.B0.D1.86.D0.B8.D1.8F_.D1.81.D0.BE.D0.B1.D1.8B.D1.82.D0.B8.D1.8F)
    *   [2.6 Настройка Timeline](#.D0.9D.D0.B0.D1.81.D1.82.D1.80.D0.BE.D0.B9.D0.BA.D0.B0_Timeline)
    *   [2.7 Тестирование и Поиск ошибок](#.D0.A2.D0.B5.D1.81.D1.82.D0.B8.D1.80.D0.BE.D0.B2.D0.B0.D0.BD.D0.B8.D0.B5_.D0.B8_.D0.9F.D0.BE.D0.B8.D1.81.D0.BA_.D0.BE.D1.88.D0.B8.D0.B1.D0.BE.D0.BA)
    *   [2.8 Closing the Door](#Closing_the_Door)
    *   [2.9 Adjusting Motion](#Adjusting_Motion)
    *   [2.10 Chapter 1: Troubleshooting](#Chapter_1:_Troubleshooting)
*   [3 Scale Controls](#Scale_Controls)
    *   [3.1 Adding a Scale Control](#Adding_a_Scale_Control)
    *   [3.2 Finalizing Scale Control](#Finalizing_Scale_Control)
    *   [3.3 Chapter 2: Troubleshooting](#Chapter_2:_Troubleshooting)
*   [4 Overrides](#Overrides)
    *   [4.1 Mesh Overrides](#Mesh_Overrides)
    *   [4.2 Material Override](#Material_Override)
    *   [4.3 Chapter 3: Troubleshooting](#Chapter_3:_Troubleshooting)
*   [5 Organizing and Commenting](#Organizing_and_Commenting)
    *   [5.1 Custom Events and Organization](#Custom_Events_and_Organization)
    *   [5.2 Commenting](#Commenting)
    *   [5.3 Collapsing Nodes](#Collapsing_Nodes)
    *   [5.4 Chapter 4: Troubleshooting](#Chapter_4:_Troubleshooting)
*   [6 Making a Useable Door](#Making_a_Useable_Door)
    *   [6.1 Enabling Input](#Enabling_Input)
    *   [6.2 Key Events](#Key_Events)
    *   [6.3 Finalizing Use Controls](#Finalizing_Use_Controls)
    *   [6.4 Chapter 5: Troubleshooting](#Chapter_5:_Troubleshooting)
*   [7 Creating a Door Counter](#Creating_a_Door_Counter)
    *   [7.1 Custom Interface](#Custom_Interface)
    *   [7.2 Making the Counter Blueprint](#Making_the_Counter_Blueprint)
    *   [7.3 Blueprint Actor Setup](#Blueprint_Actor_Setup)
    *   [7.4 Chapter 6: Troubleshooting](#Chapter_6:_Troubleshooting)
*   [8 Русское сообщество Unreal Engine 4](#.D0.A0.D1.83.D1.81.D1.81.D0.BA.D0.BE.D0.B5_.D1.81.D0.BE.D0.BE.D0.B1.D1.89.D0.B5.D1.81.D1.82.D0.B2.D0.BE_Unreal_Engine_4)

Обзор
-----

Это первый урок в серии уроков по Blueprint, мы рассмотрим, один из основных элементов дизайна игрового уровня - автоматическая двери.

[![DoorFinal DT.png](https://d26ilriwvtzlb.cloudfront.net/d/db/DoorFinal_DT.png)](/File:DoorFinal_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorFinal_DT.png "Enlarge")

  
Предполагается, что вы будете изучать главы последовательно одну за другой. К примеру для завершения 4-й главы, вы должны выполнить 1, 2 и 3.

_**Assets (активы)**_

В данном уроке мы будем использовать **Blueprint Third Person** проект.

Данный урок использует несколько мешей, материалов и текстур. Все они доступны в этом zip архиве:

[Automated Door uAssets](https://d26ilriwvtzlb.cloudfront.net/c/c6/Door.zip "Door.zip")

После загрузки, откройте папку созданного вами Blueprint Third Person проекта и распакуйте в нее содержимое архива.

_**Target Audience**_

Так как это базовый урок, предполагается что у вас очень мало опыта. В идеале, вы должны быть знакомы с основами управления в UE4 и легко ориентироваться в Content Browser. Так же поможет, если вы знакомы с концепцией работы Blueprints. Дополнительная информация содержится в следующих документах:

*   Engine/Blueprints/GettingStarted
*   Engine/Blueprints/Editor
*   Engine/Blueprints/UserGuide

_**Target Blueprint Features**_

При работе с Blueprints, важно заранее знать чего в итоге вы хотите добиться. В нашем случае, как дизайнеры уровня мы хотим установить дверь карту, и она должна работать. Когда игрок подойдет к ней, она должна автоматически открыться. Позже, добавим различные функции, для повышения полезности нашего blueprint объекта. Некоторые из низ будут прямыми и очевидными улучшениями функциональности данного объекта, тогда как другие чисто обучающими - что бы показать особенности работы в системе blueprint объектов.

**Данные функции включают:**

*   **Начальная настройка**: Создание базового функционале двери, для обеспечения возможности создания необходимого количества дверей не нуждающихся в настройке.
*   **Масштабирование**: Возможность равномерного масштабирования двери, как глобальной переменной.
*   **Overrides**: Возможность изменения мешей и материалов дверей, без потери функциональности. Настройки по умолчанию для быстрой установки..
*   **Организация и комментарии**: Оптимизация организации узлов и добавление комментариев.
*   **Создание активируемой двери**: Возможность установки двери, открывающейся при приближении пользователя или при активации двери им..
*   **Создание счетчика двери**: Возможность включения "счетчика тразакций" Blueprint который будет отслеживать число открываний двери. Отдельные blueprint которые могут сообщаться с любыми blueprint дверей расположенными на уровне.

Начальная настройка
-------------------

Первая серия уроков предлагает вступительный обзор в мир работы с Blueprints. В данном примере, вы будете создавать модульную автоматизированную дверь, в самом общем ее смысле, состоящую из:

*   Несколько мешей выступающих в качестве дверной рамы и двери.
*   Box Component в качестве объемного триггера для детектирования приближения персонажа.
*   Сеть blueprint узлов, которая будет осуществлять анимацию двери.

  
В дальнейших уроках, мы будем улучшать систему, что бы пользователь мог менять меши используемые для двери и дверной рамы, изменять материалы и многое другое.

  

### Новый Blueprint

1\. В Content Browser, создайте новую папку, можете дать ей любое имя. Выберите эту папку, что бы новый Blueprints располагался внутри неё.

[![NewFolder DT.png](https://d26ilriwvtzlb.cloudfront.net/d/df/NewFolder_DT.png)](/File:NewFolder_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewFolder_DT.png "Enlarge")

  
2\. Правый клик в Content Browser и выберите New Blueprint.

[![NewBlueprint DT.png](https://d26ilriwvtzlb.cloudfront.net/1/1e/NewBlueprint_DT.png)](/File:NewBlueprint_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewBlueprint_DT.png "Enlarge")

  
3\. Появится окно Pick Parent Class . Разверните _Object_ и выберите _Actor_. Это означает, что вы создаете размещаемый Blueprint Actor (объект). Кликните кнопку **Ok**.

[![PickParentClass DT.png](https://d26ilriwvtzlb.cloudfront.net/2/22/PickParentClass_DT.png)](/File:PickParentClass_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:PickParentClass_DT.png "Enlarge")

  
4\. В качестве имени Blueprint'а, выберите _Tutorial Door_. Нажмите Enter. Это создаст новый пустой Blueprint готовый для конструирования.

[![TutorialDoor Blueprint DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b0/TutorialDoor_Blueprint_DT.png)](/File:TutorialDoor_Blueprint_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:TutorialDoor_Blueprint_DT.png "Enlarge")

  
5\. При работе с Blueprints важно часто сохранять проделанную работу. Есть несколько способов сделать это. В нашем случае, мы будем использовать кнопку **Save** в Content Browser. Нажмите её.

  
Вы всегда можете проверить требуется ли сохранить Blueprint взглянув на иконку в Content Browser. В левом нижем углы иконки вы увидите маленькую серебристую звездочку, она показывает, что есть не сохраненные изменения. Данную звездочку видно на изображении ниже, и она исчезнет как только последние изменения в Blueprint будут сохранены.

  

### Mesh компоненты

1\. Пожалуйста продолжите с урока 1.1.

2\. Правый клик на **Tutorial Door** и выберите _Open in Full Editor_ . Откроется Blueprint Editor (редактор).

[![FullEditor DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c0/FullEditor_DT.png)](/File:FullEditor_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:FullEditor_DT.png "Enlarge")

  
3\. Кликните кнопку Components для открытия Component Previewer.

[![ComponentTab2 DT.png](https://d26ilriwvtzlb.cloudfront.net/6/6c/ComponentTab2_DT.png)](/File:ComponentTab2_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:ComponentTab2_DT.png "Enlarge")

  

[![ComponentEditor DT.png](https://d3ar1piqh1oeli.cloudfront.net/7/7a/ComponentEditor_DT.png/940px-ComponentEditor_DT.png)](/File:ComponentEditor_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:ComponentEditor_DT.png "Enlarge")

  
4\. В Content Browser, разместите _S\_LT\_Doors\_SM\_Door05_ static mesh. (для удобства копия этого asset (актива) содержится в [активах для этого урока](https://d26ilriwvtzlb.cloudfront.net/c/c6/Door.zip "Door.zip"))

[![Doorway DT.png](https://d26ilriwvtzlb.cloudfront.net/1/1e/Doorway_DT.png)](/File:Doorway_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Doorway_DT.png "Enlarge")

5\. Кликните Add Component.

[![AddComponentButton2 DT.png](https://d26ilriwvtzlb.cloudfront.net/7/7d/AddComponentButton2_DT.png)](/File:AddComponentButton2_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:AddComponentButton2_DT.png "Enlarge")

  
6\. Выберите новый _Unnamed StaticMeshComponent_. На панели Details, установите значение **DoorFrame** для Variable name.

[![NameDoorFrame DT.png](https://d26ilriwvtzlb.cloudfront.net/6/6c/NameDoorFrame_DT.png)](/File:NameDoorFrame_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NameDoorFrame_DT.png "Enlarge")

  
7\. В Content Browser, разместите _S\_LT\_Doors\_SM\_DoorWay05_ static mesh. (для удобства копия этого asset (актива) содержится в [активах для этого урока](https://d26ilriwvtzlb.cloudfront.net/c/c6/Door.zip "Door.zip")).

[![DoorMesh DT.png](https://d26ilriwvtzlb.cloudfront.net/3/39/DoorMesh_DT.png)](/File:DoorMesh_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorMesh_DT.png "Enlarge")

  
8\. Кликните список компонентов и на самом верху выберите Assets. Кликните Add Component, затем установите значение Variable name для нового static mesh компонента **Door**.

[![DoorFramePlaced DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c2/DoorFramePlaced_DT.png)](/File:DoorFramePlaced_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorFramePlaced_DT.png "Enlarge")

  
9\. Теперь в Component Viewport, вы должны видеть меши двери и дверной рамы.

[![DoorAssembled DT.png](https://d3ar1piqh1oeli.cloudfront.net/c/c9/DoorAssembled_DT.png/940px-DoorAssembled_DT.png)](/File:DoorAssembled_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorAssembled_DT.png "Enlarge")

  
10\. Сохраните Blueprint выбрав File > Save в Blueprint Editor.

[![SaveBlueprint2 DT.png](https://d26ilriwvtzlb.cloudfront.net/4/49/SaveBlueprint2_DT.png)](/File:SaveBlueprint2_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:SaveBlueprint2_DT.png "Enlarge")

### Box Component

1\. Пожалуйста продолжите с урока 1.2. Убедитесь что вы работает с Blueprint _Tutorial\_Door_ в ComponentList.

2\. В списке Add Component, выберите **Box**. Установите Variable name **TriggerVolume**.

[![TriggerVolumeAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/6/60/TriggerVolumeAdded_DT.png)](/File:TriggerVolumeAdded_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:TriggerVolumeAdded_DT.png "Enlarge")

  
3\. Выберите BoxComponent _TriggerVolume_ и взгляните на панель Details. В категории Shape (форма), установите **Box Extent** <192, 192, 128>.

[![ShapeBoxExtent DT.png](https://d26ilriwvtzlb.cloudfront.net/5/55/ShapeBoxExtent_DT.png)](/File:ShapeBoxExtent_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:ShapeBoxExtent_DT.png "Enlarge")

  
4\. Пролистайте вверх к Transform на панели Details и установите **Location** <0, 0, 128>.

[![RelativeLocation DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b6/RelativeLocation_DT.png)](/File:RelativeLocation_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:RelativeLocation_DT.png "Enlarge")

5\. Пролистайте вниз к группе Collision. Убедитесь что _Collision Presets_ в положении **Custom**. Поставьте флажок в положение _Ignore_, затем для **Pawn** выберите ряд **Overlap**. Это означает, что когда персонаж соприкасается с этим компонентом, он будет регистрировать контакт с ним, а не блокироваться.

[![CollisionSettingsCheckboxes DT.png](https://d26ilriwvtzlb.cloudfront.net/f/f6/CollisionSettingsCheckboxes_DT.png)](/File:CollisionSettingsCheckboxes_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CollisionSettingsCheckboxes_DT.png "Enlarge")

  
6\. Скомпилируйте с помощью **F7**, и сохраните Blueprint.

  

### Тестирование уровня

1\. Пожалуйста продолжите с урока 1.3. Откройте Content Browser и разместите _Tutorial\_Door_.

2\. Перетащите _Tutorial\_Door_ на ваш уровень.

[![DragDropBlueprint DT.png](https://d3ar1piqh1oeli.cloudfront.net/e/e1/DragDropBlueprint_DT.png/940px-DragDropBlueprint_DT.png)](/File:DragDropBlueprint_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DragDropBlueprint_DT.png "Enlarge")

  
3\. Сохраните ваш уровень и ваш Blueprint.

  

### Инициализация события

Сейчас мы начнем настройку системы, с помощью которой дверь будет двигаться. В предыдущей версии движка, это осуществлялось через Matinee sequence. Сейчас, такая настройка требуется что бы изменять поведение двери по ключевым кадрам. Здесь же мы настроим начальную и конечную точки для двери и линейную интерполяцию между ними.

  
1\. Пожалуйста продолжите с урока 1.4. Откройте _Tutorial\_Door_ Blueprint в Blueprint редакторе.

2\. Нажмите кнопку **Script** и выберите вкладку **Event Graph** что бы показать the Event Graph.

[![EventGraphScriptWindow DT.png](https://d3ar1piqh1oeli.cloudfront.net/c/c5/EventGraphScriptWindow_DT.png/940px-EventGraphScriptWindow_DT.png)](/File:EventGraphScriptWindow_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:EventGraphScriptWindow_DT.png "Enlarge")

  
3\. Во вкладке _My Blueprint_, выберите переменную Trigger Volume (объемный триггер).

[![TriggerVolumeSelected DT.png](https://d26ilriwvtzlb.cloudfront.net/e/e4/TriggerVolumeSelected_DT.png)](/File:TriggerVolumeSelected_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:TriggerVolumeSelected_DT.png "Enlarge")

  
4\. Кликните правой кнопкой мыши в окне Blueprint Event Graph. Начните печатать "ComponentBeginOverlap." Вы увидите, как в списке появится **OnComponentBeginOverlap**. Нажмите на нее, что бы создать событие ReceiveComponentTouch.

[![ComponentBeginOverlapList DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0c/ComponentBeginOverlapList_DT.png)](/File:ComponentBeginOverlapList_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:ComponentBeginOverlapList_DT.png "Enlarge")

  

[![OnComponentBeginOverlapNode DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0f/OnComponentBeginOverlapNode_DT.png)](/File:OnComponentBeginOverlapNode_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OnComponentBeginOverlapNode_DT.png "Enlarge")

  
Это событие генерируется каждый раз когда любой actor касается Blueprint actor. Поскольку box component считает касания только от pawn, это значит, что событие будет запускаться pawn (в данном случае игроком) проходящим в box component. По этой причине box компонент ведет себя как объемный триггер.

5\. Сейчас мы будем настраивать систему линейной интерполяции (lerp). Обратите внимание, что пока мы не создали никакую движущую силу, наш lerp не производит никакого движения. Кликните правой кнопкой мыши и печатайте "lerp" в строке поиска. Из отфильтрованного выберите **Lerp (vector)**.

[![LerpVectorList DT.png](https://d26ilriwvtzlb.cloudfront.net/b/bd/LerpVectorList_DT.png)](/File:LerpVectorList_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:LerpVectorList_DT.png "Enlarge")

  

[![LerpVectorNodeAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/8/81/LerpVectorNodeAdded_DT.png)](/File:LerpVectorNodeAdded_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:LerpVectorNodeAdded_DT.png "Enlarge")

  
6\. На узле входа **A** для **Lerp (Vector)** кликните правой кнопкой мыши (ПКМ) и выберите **Promote to Variable**. Назовите _DoorStart_.

[![PromoteToVariableMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b8/PromoteToVariableMenu_DT.png)](/File:PromoteToVariableMenu_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:PromoteToVariableMenu_DT.png "Enlarge")

  

[![NameVariableDoorStart DT.png](https://d3ar1piqh1oeli.cloudfront.net/d/dd/NameVariableDoorStart_DT.png/940px-NameVariableDoorStart_DT.png)](/File:NameVariableDoorStart_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NameVariableDoorStart_DT.png "Enlarge")

  

[![DoorStartVariableInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/d/d8/DoorStartVariableInPlace_DT.png)](/File:DoorStartVariableInPlace_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorStartVariableInPlace_DT.png "Enlarge")

  
7\. На узле входа **B** для **Lerp (Vector)** ПКМ и выберите **Promote to Variable**. Назовите _DoorEnd_..

[![DoorEndVariableInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/6/64/DoorEndVariableInPlace_DT.png)](/File:DoorEndVariableInPlace_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorEndVariableInPlace_DT.png "Enlarge")

  
8\. Во вкладке My Blueprint в правой верхней стороне Blueprint Editor, выберите переменную Door End и нажмите кнопку Public Variable. Отобразится желтый открытый глаз, показывающий, что переменная стала public, но к ней требуется подсказка (описание).

[![DoorEndPublicMyBlueprint DT.png](https://d26ilriwvtzlb.cloudfront.net/6/64/DoorEndPublicMyBlueprint_DT.png)](/File:DoorEndPublicMyBlueprint_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorEndPublicMyBlueprint_DT.png "Enlarge")

  
9\. На панели _My Blueprint_ выберите переменную _Door End_. На панели _Details_, выберите **Show 3D Widget**. В поле **Category** напишите"Door Setup." Так же добавьте tooltip (подсказку), например: "Sets the end location for the motion of the door."

[![DoorEndVariableSetup DT.png](https://d26ilriwvtzlb.cloudfront.net/7/78/DoorEndVariableSetup_DT.png)](/File:DoorEndVariableSetup_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorEndVariableSetup_DT.png "Enlarge")

  
10\. Выберите переменную _DoorStart_ и на панели _Details_ в графе **Category** выберите "Door Setup". Это приведет к тому, что DoorStart и DoorEnd будут находится в категории DoorSetup. Скомпилируйте.

[![DoorStartSetup DT.png](https://d26ilriwvtzlb.cloudfront.net/e/e0/DoorStartSetup_DT.png)](/File:DoorStartSetup_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorStartSetup_DT.png "Enlarge")

  
11\. Вверху Blueprint редактора нажмите кнопку Defaults. Для **Door End** установите значение Z _288_.

[![DoorEndSetupDefault DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0a/DoorEndSetupDefault_DT.png)](/File:DoorEndSetupDefault_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorEndSetupDefault_DT.png "Enlarge")

  
12\. Скомпилируйте и сохраните ваш Blueprint.

  

### Настройка Timeline

Все готово к тому, что бы дверь начала работать. Осталось только настроить систему, которая приведет её в движение. Это как добавить мотор к двери. В данном случае, мы будем использовать Timeline, который создаст простую интерполяцию между ключевыми кадрами.

Для углубленного изучения смотрите документацию по Timelines.

1\. Пожалуйста продолжите с урока 1.5. Откройте _Tutorial\_Door_ Blueprint в Blueprint Editor.

2\. Кликните правой кнопкой мыши в окне Event Graph в Blueprint Editor и выберите Add Timeline...

[![TimelineContextMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/6/62/TimelineContextMenu_DT.png)](/File:TimelineContextMenu_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:TimelineContextMenu_DT.png "Enlarge")

  

[![TimelineNodeAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/4/44/TimelineNodeAdded_DT.png)](/File:TimelineNodeAdded_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:TimelineNodeAdded_DT.png "Enlarge")

  
3\. Назовите "Timeline - Door Driver". Нажмите Enter.

[![RenameTimeline 1 DT.png](https://d26ilriwvtzlb.cloudfront.net/4/45/RenameTimeline_1_DT.png)](/File:RenameTimeline_1_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:RenameTimeline_1_DT.png "Enlarge")

  

[![DoorDriverTimelineNode DT.png](https://d26ilriwvtzlb.cloudfront.net/e/ed/DoorDriverTimelineNode_DT.png)](/File:DoorDriverTimelineNode_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorDriverTimelineNode_DT.png "Enlarge")

  
Таймлайны при создании присваивают себе имя "Timeline\_X" где X отображает номер созданного таймлайна. Переименовывая ваш таймлайн, вы указываете, что он должен делать, это облегчит работу вам и людям использующим ваш проект.

Когда вы переименовываете таймлайн, вы можете допустить ошибку. Это не проблема, просто перекомпелируйте его и она должна исчезнуть.

4\. Откройте окно редактора таймлайна двойным кликом по узлу Timeline.

[![TimelineEditorWindow DT.png](https://d26ilriwvtzlb.cloudfront.net/e/e3/TimelineEditorWindow_DT.png)](/File:TimelineEditorWindow_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:TimelineEditorWindow_DT.png "Enlarge")

  
5\. Нажмите кнопку **Add Float Track**. Переименуйте Track Name в "Driver."

[![DriverTrackAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b1/DriverTrackAdded_DT.png)](/File:DriverTrackAdded_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DriverTrackAdded_DT.png "Enlarge")

  
6\. В окне с кривой таймлайна нажмите, шифт-кликните приблизительно в районе (0,0). Не обязательно добиваться 100% точности. Таким образом мы создадим ключевой кадр для таймлайна.

[![AddedNewKeyframe DT.png](https://d26ilriwvtzlb.cloudfront.net/0/07/AddedNewKeyframe_DT.png)](/File:AddedNewKeyframe_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:AddedNewKeyframe_DT.png "Enlarge")

  
7\. Выберите новый keyframe кликнув по нему. В верху окна появятся два поля для ввода переменных. То что слева - временной индекс, то что справа - значение. Установите оба значения на 0.0, тем самым определив начальное значение для перехода в таймлайне.

[![SetValuesToZeroInTimeline DT.png](https://d26ilriwvtzlb.cloudfront.net/1/1e/SetValuesToZeroInTimeline_DT.png)](/File:SetValuesToZeroInTimeline_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:SetValuesToZeroInTimeline_DT.png "Enlarge")

  
8\. Шифт-кликните в стороне от первого key frame для создания второго. Выберите новый keyframe и установите значение времени на 1.5, а второе значение на 1.0.

[![SecondKeyAdded DT.PNG](https://d26ilriwvtzlb.cloudfront.net/f/f2/SecondKeyAdded_DT.PNG)](/File:SecondKeyAdded_DT.PNG)

[![](/skins/common/images/magnify-clip.png)](/File:SecondKeyAdded_DT.PNG "Enlarge")

Чтобы была возможность видеть весь график, нажмите кнопку "Zoom to Fit", которая расположена в верхнем левом углу графа!

9\. Перед тем, как покинуть Timeline Editor, проверьте галочку "Use Last Keyframe?". Это поможет защитит Timeline от задержки в несколько секунд после открытия двери.

[![UseLastKeyframecheckbox DT.PNG](https://d26ilriwvtzlb.cloudfront.net/c/cd/UseLastKeyframecheckbox_DT.PNG)](/File:UseLastKeyframecheckbox_DT.PNG)

[![](/skins/common/images/magnify-clip.png)](/File:UseLastKeyframecheckbox_DT.PNG "Enlarge")

  
10\. Вернитесь к Event Graph соедините выход **Driver** от Timeline со входом **Alpha** Lerp (vector).

[![TimelineToLerp DT.png](https://d26ilriwvtzlb.cloudfront.net/1/1a/TimelineToLerp_DT.png)](/File:TimelineToLerp_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:TimelineToLerp_DT.png "Enlarge")

  
11\. Мы должны создать году, которая заставит дверь двигаться. На панели My Blueprint выберите компонент Door. Кликните правой кнопкой мыши на графе и введите "set Relative Location." Это создаст ноду с переменными Door.

[![SetRelativeLocation DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2d/SetRelativeLocation_DT.png)](/File:SetRelativeLocation_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:SetRelativeLocation_DT.png "Enlarge")

  
12\. Наконец, пришло время присоединить событие, которое запустит таймлайн и откроет дверь. Соедините **OnComponentBeginOverlap** со входом от **Timeline - Door Driver**. После выход **Update** таймлайна с Set Relative Location. И **Return Value** от Lerp (Vector) со входом **New Location** от Set Relative Location.

[![OverlapEventAdded DT.png](https://d3ar1piqh1oeli.cloudfront.net/d/d5/OverlapEventAdded_DT.png/940px-OverlapEventAdded_DT.png)](/File:OverlapEventAdded_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OverlapEventAdded_DT.png "Enlarge")

  
13\. Скомпилируйте и сохраните ваш Blueprint.

### Тестирование и Поиск ошибок

In this tutorial we take a moment to drop our Blueprint into a level and give it a test. At this point, your doorway should be opening when the player approaches it. One of the great benefits of Blueprints of this sort is that we can easily test them out at any time by simply dropping the Blueprint actor into a level and then using Play In Editor to see how they're working.

Blueprints are error-checked every time they are compiled. If there are any errors within the node network, a window will appear in which all such errors are listed, along with links to jump you directly to the problem.

1\. Please continue from Tutorial 1.6. Open the _Tutorial\_Door_ Blueprint in the Blueprint Editor.

2\. Be sure that the Blueprint has been fully compiled (press F7) in the Blueprint Editor. Should there be any errors that appear, click on the hyperlink within the error entry. The error itself should spell out the nature of the problem. Your network should look something like this:

[![OverlapEventAdded DT.png](https://d3ar1piqh1oeli.cloudfront.net/d/d5/OverlapEventAdded_DT.png/940px-OverlapEventAdded_DT.png)](/File:OverlapEventAdded_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OverlapEventAdded_DT.png "Enlarge")

  
3\. The Blueprint should be functional at this point. With the Blueprint placed in the level, press the Play in Editor button. When the player walks into the volume of the Box Component, the door should open.

[![DoorOpening DT.png](https://d26ilriwvtzlb.cloudfront.net/6/60/DoorOpening_DT.png)](/File:DoorOpening_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorOpening_DT.png "Enlarge")

  
4\. Save your level.

### Closing the Door

When testing the level, you might have noticed that the door opens but does not close. In this tutorial, we will set up a counter event that causes the door to close when the player exits the volume of the BoxComponent.

1\. Please continue from Tutorial 1.7. Open the _Tutorial\_Door_ Blueprint in the Blueprint Editor.

2\. Select the Trigger Volume component variable. Right click near the Timeline and type "OnComponentEnd," which will bring up the _OnComponentEndOverlap_ event. This event is fired whenever an object exits the BoxComponent.

[![OnComponentEndOverlapNode DT.png](https://d26ilriwvtzlb.cloudfront.net/7/79/OnComponentEndOverlapNode_DT.png)](/File:OnComponentEndOverlapNode_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OnComponentEndOverlapNode_DT.png "Enlarge")

  

[![OnComponentEndOverlapNodeAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/e/ec/OnComponentEndOverlapNodeAdded_DT.png)](/File:OnComponentEndOverlapNodeAdded_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OnComponentEndOverlapNodeAdded_DT.png "Enlarge")

  
3\. Connect the output execution plug of the OnComponentEndOverlap event to the Reverse input of the Timeline. This will cause the Timeline to play backwards when the BoxComponent volume is exited, thereby closing the door.

[![DoorNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/6/6f/DoorNetwork_DT.png/940px-DoorNetwork_DT.png)](/File:DoorNetwork_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorNetwork_DT.png "Enlarge")

  

[![DoorClosingArrows DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2b/DoorClosingArrows_DT.png)](/File:DoorClosingArrows_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorClosingArrows_DT.png "Enlarge")

  
4\. Compile your Blueprint by pressing the Compile button and test the level. Your door should now open and close.

### Adjusting Motion

In this tutorial, we will adjust the animation curve of the door's motion, causing it to start by moving quickly upward, but slowing to a stop. Because we are playing the same motion back to close the door, we the door will accelerate as it comes back down.

1\. Please continue from Tutorial 1.8. Open the _Tutorial\_Door_ Blueprint in the Blueprint Editor.

2\. Within the Blueprint Editor, double-click the Timeline node to open it in the Timeline Editor.

[![SecondKeyAdded DT.PNG](https://d26ilriwvtzlb.cloudfront.net/f/f2/SecondKeyAdded_DT.PNG)](/File:SecondKeyAdded_DT.PNG)

[![](/skins/common/images/magnify-clip.png)](/File:SecondKeyAdded_DT.PNG "Enlarge")

  
3\. Select the first keyframe by clicking it. Right-click on the keyframe and choose Cubic-locked. This will add user-controlled tangent handles to the keyframe so that you can adjust its shape.

[![CubicLockedKeyframe1 DT.png](https://d26ilriwvtzlb.cloudfront.net/5/5d/CubicLockedKeyframe1_DT.png)](/File:CubicLockedKeyframe1_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CubicLockedKeyframe1_DT.png "Enlarge")

  
4\. Repeat this process with the second keyframe, so that they are both set to Cubic-locked.

5\. Move the inner tangent handles (the right for the first keyframe, left for the second) up slightly to shape the curve into an upward ramp that planes off at the end.

[![CurveAdjusted DT.png](https://d26ilriwvtzlb.cloudfront.net/0/03/CurveAdjusted_DT.png)](/File:CurveAdjusted_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CurveAdjusted_DT.png "Enlarge")

  
6\. Compile and test. The door should start opening very quickly, slowing as it ascends. When closing, it starts slow and accelerates as it descends.

[![DoorSlowingAsAscending DT.png](https://d26ilriwvtzlb.cloudfront.net/5/5f/DoorSlowingAsAscending_DT.png)](/File:DoorSlowingAsAscending_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorSlowingAsAscending_DT.png "Enlarge")

  
7\. Save your Blueprint.

### Chapter 1: Troubleshooting

Problem

Solution

Cannot enter the BoxComponent volume. It seems to be solid.

Select the BoxComponent within the Components tab.

In the Details panel, make sure that under _Collision_ that **PawnMovement** is set to _Overlap_ and everything else is set to _Ignore_.

The OnComponentBeginOverlap event seems to be working, but the door is not moving.

Verify the keyframes within the Timeline run between values of 0 to 1 over 1.5 seconds.

You can press the Zoom to Fit Horizontal and Zoom to Fit Vertical buttons to make sure that the curve is shaped properly.

The Timeline looks great. Door still isn't moving!

Make sure the DoorEnd variable is set up properly.

If you didn't set its Default Value (we used 288), then you're probably trying to interpolate between 0 and 0 for start and end, respectively.

The door seems to vanish or fly away when I enter the BoxComponent.

Make sure you're using a SetRelativeTranslation node instead of an AddRelativeTranslation node.

The two nodes look very much alike! Using an additive node will constantly add the translation value to the location of the door each time the Timeline updates.

This causes the door to accelerate away, fast enough that it will seem to disappear.

  

Scale Controls
--------------

Now that the door itself is set up, it is time for us to start adding some convenience features to turn it into a useful and practical asset. The first of these will be a slider-based scale control system, which will allow a level designer to quickly increase or decrease the scale of the door. This slider will be accessible from the Details panel on any instance of the Blueprint that gets placed in the level.

### Adding a Scale Control

In this tutorial we will implement a 3D scale adjustment system for our automated door. As you may have noticed, scaling the Blueprint itself does not have any effect. Instead, we will create a single slider control that can be used to quickly size the door up and down, starting from a base default value.

1\. Continue from the end of Tutorial 1.

[![DoorFinal DT.png](https://d26ilriwvtzlb.cloudfront.net/d/db/DoorFinal_DT.png)](/File:DoorFinal_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorFinal_DT.png "Enlarge")

  
2\. First, we need a new variable to hold the scale for the door. In the My Blueprint panel on the left, click the **New Variable** button. Set the type to Float, set the name to _3D Scale_, and set the remaining properties as shown below:

[![3DScaleVariableSettings DT.png](https://d26ilriwvtzlb.cloudfront.net/4/44/3DScaleVariableSettings_DT.png)](/File:3DScaleVariableSettings_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:3DScaleVariableSettings_DT.png "Enlarge")

  
3\. Click the **Defaults** button and set the default value of the **3D Scale** variable to 1.0.

[![3DScaleDefault DT.png](https://d26ilriwvtzlb.cloudfront.net/0/02/3DScaleDefault_DT.png)](/File:3DScaleDefault_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:3DScaleDefault_DT.png "Enlarge")

  
4\. Compile and save your Blueprint. At this time, there is nothing we can test just yet.

### Finalizing Scale Control

Now that we have our 3D Scale variable established, we will now implement it via the Blueprint's Construction Script. The Construction Script is executed when the Blueprint is first created in the world, and updated whenever any part of the Blueprint is updated during level construction.

1\. Continue from Tutorial 2.1. Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

2\. Within the Blueprint Editor, click the ConstructionScript tab at the top of the screen. This shows the Construction Script for this Blueprint, which currently just shows the Construction Script node. Think of this like an event that is called when the Blueprint is first created, or whenever it becomes edited during level design.

[![ConstructionScript DT.png](https://d3ar1piqh1oeli.cloudfront.net/8/8d/ConstructionScript_DT.png/940px-ConstructionScript_DT.png)](/File:ConstructionScript_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:ConstructionScript_DT.png "Enlarge")

  
3\. Select the My Blueprint tab on the left, then Ctrl-drag a copy of the **Door Frame** component variable into the Construction Script.

[![DoorFrameVariableInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/f/fd/DoorFrameVariableInPlace_DT.png)](/File:DoorFrameVariableInPlace_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorFrameVariableInPlace_DT.png "Enlarge")

  
4\. Drag a wire off the Door Frame node and release the mouse in open space. Type Set Relative Scale 3D and create a Set Relative Scale 3D node.

[![RelativeScaleContentMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/0/02/RelativeScaleContentMenu_DT.png)](/File:RelativeScaleContentMenu_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:RelativeScaleContentMenu_DT.png "Enlarge")

  

[![SetRelativeScale3DNode DT.png](https://d26ilriwvtzlb.cloudfront.net/3/3b/SetRelativeScale3DNode_DT.png)](/File:SetRelativeScale3DNode_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:SetRelativeScale3DNode_DT.png "Enlarge")

  
5\. Ctrl-drag in a copy of the 3D Scale variable.

[![3DScaleVarAddedInGraph DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0a/3DScaleVarAddedInGraph_DT.png)](/File:3DScaleVarAddedInGraph_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:3DScaleVarAddedInGraph_DT.png "Enlarge")

  
6\. Right-click and create a Make Vector node.

[![MakeVectorNodeInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/5/58/MakeVectorNodeInPlace_DT.png)](/File:MakeVectorNodeInPlace_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:MakeVectorNodeInPlace_DT.png "Enlarge")

  
7\. Connect the output of the 3D Scale node to all three inputs of the Make Vector node, then connect the output to the New 3D Scale input of the Set Relative Scale 3D node.

[![3DScaleConnectedToMakeVector DT.png](https://d26ilriwvtzlb.cloudfront.net/9/96/3DScaleConnectedToMakeVector_DT.png)](/File:3DScaleConnectedToMakeVector_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:3DScaleConnectedToMakeVector_DT.png "Enlarge")

  
8\. Finally, connect the output of the ConstructionScript node to the execution input of the Set Relative Scale 3D node.

[![ConstructionScriptComplete DT.png](https://d26ilriwvtzlb.cloudfront.net/7/75/ConstructionScriptComplete_DT.png)](/File:ConstructionScriptComplete_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:ConstructionScriptComplete_DT.png "Enlarge")

  
9\. Compile and save your Blueprint.

10\. In the main editor, watch your Blueprint in the viewport as you adjust the **3D Scale** variable's slider from within the Details panel.

[![Set3DScale DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2c/Set3DScale_DT.png)](/File:Set3DScale_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Set3DScale_DT.png "Enlarge")

  

[![ScalingDoor DT.png](https://d3ar1piqh1oeli.cloudfront.net/5/52/ScalingDoor_DT.png/940px-ScalingDoor_DT.png)](/File:ScalingDoor_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:ScalingDoor_DT.png "Enlarge")

  

### Chapter 2: Troubleshooting

Problem

Solution

I cannot see the scaling slider in the Details panel.

Make sure that the DoorScale variable is set to _Editable_ (click the small eye icon).

After implementing the scale controls, the door seems to have vanished!

Double-check the default setting for the DoorScale variable within the Blueprint Editor's _Blueprint Defaults_ panel.

It is likely that this was left at 0.0, which would size your door down to nothingness.

Overrides
---------

In this chapter we take a look at making our door Blueprint asset even more useful by adding the ability to override the static meshes and materials in use. Basically, we want the level designer to have the power to use any kind of vertically-opening door, starting with this Blueprint as a template. To do this, we will have to make use of the User Construction Script, which is run in advance of gameplay. Through this method, we can expose the ability for the LD to choose other meshes and materials from the Content Browser and use them to replace the assets set up by default.

This example is designed to make use of standard Materials, not Material Instance Constants. However, the text does include some guides to help make the minor modifications required to utilize Material Instances in your assets.

### Mesh Overrides

In this tutorial we will adjust our automated door so that a level designer could quickly swap out the meshes for the door and the door frame. Since the Blueprint already has meshes in place for those parts, those existing meshes will be considered defaults. This is useful because an level designer can quickly lay out the doors wherever they are needed, but then quickly swap out meshes later down the road. It also opens the door for collaborative efforts, since a level layout artist can just drop the doors into place while a finishing artist comes in later and changes out the doors for something more appropriate.

1\. Continue from the end of Tutorial 2.

[![StartTutorial3 DT.png](https://d3ar1piqh1oeli.cloudfront.net/8/8b/StartTutorial3_DT.png/940px-StartTutorial3_DT.png)](/File:StartTutorial3_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:StartTutorial3_DT.png "Enlarge")

  
2\. Open the Blueprint's Construction Script.

[![UserConstructionScript 3 DT.png](https://d3ar1piqh1oeli.cloudfront.net/7/74/UserConstructionScript_3_DT.png/940px-UserConstructionScript_3_DT.png)](/File:UserConstructionScript_3_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:UserConstructionScript_3_DT.png "Enlarge")

  
3\. In the _My Blueprint_ panel, click the **Add Variable** button to create a new variable. Select the new variable and in the _Details_ panel set its type to **Static Mesh** and its name to _Door Mesh Override_. Set its remaining properties as shown below:

[![DoorMeshOverrideVariable DT.png](https://d26ilriwvtzlb.cloudfront.net/c/ca/DoorMeshOverrideVariable_DT.png)](/File:DoorMeshOverrideVariable_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorMeshOverrideVariable_DT.png "Enlarge")

  
4\. Create a second **Static Mesh** variable named Door Frame Mesh Override. Set its remaining properties as shown below:

[![OverrideDoorFrameMeshVar DT.png](https://d26ilriwvtzlb.cloudfront.net/6/65/OverrideDoorFrameMeshVar_DT.png)](/File:OverrideDoorFrameMeshVar_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OverrideDoorFrameMeshVar_DT.png "Enlarge")

5\. To the right of the Set Relative Scale 3D node, add a Sequence node. This will fire off a series of operations, one after another. Go ahead and connect it to the Set Relative Scale 3D node.

[![AddedSequence2 DT.png](https://d26ilriwvtzlb.cloudfront.net/4/45/AddedSequence2_DT.png)](/File:AddedSequence2_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:AddedSequence2_DT.png "Enlarge")

  
You may, for now, right-click on the **Then 2** and **Then 3** options and choose "Remove execution pin," since we will not be using those pins in this tutorial.

6\. Ctrl-drag in a copy of the **Door Mesh Override** variable, and also a copy of the **Door Frame Mesh Override** variable.

[![OverrideVariables DT.png](https://d26ilriwvtzlb.cloudfront.net/4/44/OverrideVariables_DT.png)](/File:OverrideVariables_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OverrideVariables_DT.png "Enlarge")

7\. The first thing we will need to do is make sure that these variables are not empty. If either of them are, then we need not swap out that mesh. Create **2 Branch nodes** and connect them to the **Then 0** and **Then 1** output pins of the Sequence node.

[![TwoBranches DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b1/TwoBranches_DT.png)](/File:TwoBranches_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:TwoBranches_DT.png "Enlarge")

  
8\. Drag a wire from the DoorMeshOverride variable and type "Not equal" to create a **Not Equal (Object)** node. Connect the output pin to the Condition pin on the Branch node. Repeat for the **Door Frame Mesh Override** variable.

[![NotEqualObjects DT.png](https://d26ilriwvtzlb.cloudfront.net/7/76/NotEqualObjects_DT.png)](/File:NotEqualObjects_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NotEqualObjects_DT.png "Enlarge")

  
9\. Ctrl-drag a copy of the **Door** component variable into the Event Graph. Drag a wire from the variable and create a **Set Static Mesh** node. Make a duplicate of the _Door Mesh Override_ variable and plug it into the **New Mesh** input.

[![SetStaticMesh Door DT.png](https://d3ar1piqh1oeli.cloudfront.net/f/f8/SetStaticMesh_Door_DT.png/940px-SetStaticMesh_Door_DT.png)](/File:SetStaticMesh_Door_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:SetStaticMesh_Door_DT.png "Enlarge")

  
10\. Repeat the process above to make a Set Static Mesh node that swaps out the mesh for the Door Frame component variable.

[![BothMeshesOverriding DT.png](https://d3ar1piqh1oeli.cloudfront.net/b/b2/BothMeshesOverriding_DT.png/940px-BothMeshesOverriding_DT.png)](/File:BothMeshesOverriding_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:BothMeshesOverriding_DT.png "Enlarge")

  
Your network should look like this when finished.

**(Click for full size!)**

[![OverrideMeshNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/1/1e/OverrideMeshNetwork_DT.png/940px-OverrideMeshNetwork_DT.png)](/File:OverrideMeshNetwork_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OverrideMeshNetwork_DT.png "Enlarge")

  

[![OverrideMeshNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/1/1e/OverrideMeshNetwork_DT.png/940px-OverrideMeshNetwork_DT.png)](/File:OverrideMeshNetwork_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OverrideMeshNetwork_DT.png "Enlarge")

  
11\. Compile your Blueprint and save. If you have a copy in the viewport, look at the Details panel and find the new **Mesh & Materials Override** group. You can place other static meshes from the Content Browser into these variables, and the door will update accordingly.

### Material Override

Continue from Tutorial 3.1. Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

1\. Create a new variable of type **MaterialInterface** named _Door Material Override_. Provide the following variable settings:

*   Set the variable to be _Editable_.
*   Set the tooltip to something describing that this variable will hold an override material for the door.
*   Set the Custom Group Name to **Mesh & Material Overrides**.

[![DoorMaterialOverride DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c7/DoorMaterialOverride_DT.png)](/File:DoorMaterialOverride_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorMaterialOverride_DT.png "Enlarge")

  
2\. Repeat the above step to create a new variable named **Door Frame Material Override** with an appropriate tooltip.

[![DoorFrameMaterialOverride DT.png](https://d26ilriwvtzlb.cloudfront.net/5/50/DoorFrameMaterialOverride_DT.png)](/File:DoorFrameMaterialOverride_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorFrameMaterialOverride_DT.png "Enlarge")

  
3\. Take a look at the **Sequence** node. If it has only 2 output pins, click the **Add pin** button twice to give it a total of 4.

[![AddPinsToSequence DT.png](https://d26ilriwvtzlb.cloudfront.net/4/47/AddPinsToSequence_DT.png)](/File:AddPinsToSequence_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:AddPinsToSequence_DT.png "Enlarge")

  
4\. As with the meshes, we need to make sure that these variable contain some asset before we commence any execution. Create a Branch node for each variable, connecting them to each of the 2 open pins on the Sequence.

[![2NewBranches DT.png](https://d26ilriwvtzlb.cloudfront.net/8/80/2NewBranches_DT.png)](/File:2NewBranches_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:2NewBranches_DT.png "Enlarge")

  
You may need to move around the other nodes to make room!

5\. Ctrl-drag in the 2 new material override variables created above, then create a "Not Equal (object)" node for each variable, connected like so. These will drive the new Branches.

[![MaterialOverrideBranches DT.png](https://d26ilriwvtzlb.cloudfront.net/9/93/MaterialOverrideBranches_DT.png)](/File:MaterialOverrideBranches_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:MaterialOverrideBranches_DT.png "Enlarge")

  
6\. At this stage, we really only need to create the same type of network we produced for the mesh overrides. The only difference is that we use a **Set Material** node instead of a _Set Static Mesh_ node to make the swap. Below you can see the final network, most of which can be created by simply duplicating the previous networks for overriding the meshes.

[![OverrideMat FullNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/a/a2/OverrideMat_FullNetwork_DT.png/940px-OverrideMat_FullNetwork_DT.png)](/File:OverrideMat_FullNetwork_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OverrideMat_FullNetwork_DT.png "Enlarge")

  

[![OverrideMat FullNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/a/a2/OverrideMat_FullNetwork_DT.png/940px-OverrideMat_FullNetwork_DT.png)](/File:OverrideMat_FullNetwork_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OverrideMat_FullNetwork_DT.png "Enlarge")

  
Leave the _Element Index_ for both of the **Set Material** nodes set to _0_.

7\. Compile and save your Blueprint. You may now specify material overrides for the meshes in the Blueprint. If left blank, there will be no change.

### Chapter 3: Troubleshooting

The following is a list of common pitfalls one may run into when setting up mesh and material overrides for the door.

  

Problem

Solution

The Mesh and/or Material Override is not working.

I can place assets within the variables, but see no updates in the viewport.

The problem is likely going to exist within your User Construction Script.

Remember that the Door/Material Override variables _must_ be of the appropriate type. You must then make sure you're setting the right type of proprerty.

If you're getting nothing at all, your best bet may be to carefully go back through the steps of the tutorial to see what you missed.

Material Instance Constants aren't working to override my materials.

Make sure the variable type for your override materials is **Material Interface**.

You may have accidentally created a variable of type **Material**. That's going to be a problem, since you cannot place Material Instance Constant assets into that type of variable.

Conversely, if you set the variable type to **Material Instance Constant**, you won't be able to use regular Materials.

This is why in the tutorial we used the **Material Interface** type, which can take in both a regular Material and a Material Instance Constant.

Organizing and Commenting
-------------------------

In this chapter we will look at how to go about separating your Blueprint network into easily identifiable sections. This serves a dual purpose:

*   Making the network easier to "read" by chopping apart functionality into logical regions.
*   Making it much easier to identify and fix problems when something doesn't work.

Generally speaking, the more modular your networks are - or, put another way, the more one applies the concept of "separation of concerns" - the easier it is to tell quickly where a problem lies and where exactly one must go to make changes.

We will also examine the process of applying comments to your Blueprint networks. Comments serve as an invaluable organizational tool, allowing you to explain an entire group of nodes wihtin a network, or even to put comments on individual nodes to explain their purpose. Just as when programming using actual code, using comments can make it much faster and easier for your work to be used and edited when in a team environment, or when having to walk away from a specific system for extended periods of time.

### Custom Events and Organization

As a Blueprint network becomes more and more complex, it is a good idea to separate key parts of functionality into easily identifiable groups. Not only does this help by making it easier to see what each section of the network does, but it also makes it a much simpler task to insert additional functionality as you move forward.

In this case, we will separate out this behavior by using Custom Events.

1\. Continue from the end of Tutorial 3. Double-click the Blueprint to open it within the Blueprint Editor.

2\. In the Event Graph, right-click somewhere near the **OnComponentBeginOverlap (TriggerVolume)** event in the Blueprint sequence and choose **Add Custom Event**. A new Custom Event will appear, prompting you to supply a name. Name this event **DoorOpen**.

[![AddCustomEvent DT.png](https://d26ilriwvtzlb.cloudfront.net/8/8a/AddCustomEvent_DT.png)](/File:AddCustomEvent_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:AddCustomEvent_DT.png "Enlarge")

  

[![DoorOpenEvent DT.png](https://d26ilriwvtzlb.cloudfront.net/e/e7/DoorOpenEvent_DT.png)](/File:DoorOpenEvent_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorOpenEvent_DT.png "Enlarge")

  
3\. Next to the **OnComponentEndOverlap** event, create another Custom Event named **DoorClose**.

[![DoorCloseEvent DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2e/DoorCloseEvent_DT.png)](/File:DoorCloseEvent_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorCloseEvent_DT.png "Enlarge")

  
4\. Disconnect the **OnComponentBeginOverlap** event and replace it with the **DoorOpen** Custom Event. Replace the **OnComponentEndOverlap** event with the **DoorClose** event.

[![CustomEventsInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/4/4e/CustomEventsInPlace_DT.png)](/File:CustomEventsInPlace_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CustomEventsInPlace_DT.png "Enlarge")

  
5\. Move the **OnComponentBeginOverlap (TriggerVolume)** and **OnComponentEndOverlap (TriggerVolume)** events away from the main network.

[![TouchEventsSeparated DT.png](https://d26ilriwvtzlb.cloudfront.net/d/dc/TouchEventsSeparated_DT.png)](/File:TouchEventsSeparated_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:TouchEventsSeparated_DT.png "Enlarge")

  
6\. Drag a wire off the execution pin for **OnComponentBeginOverlap (TriggerVolume)** and release in empty space. Type "DoorOpen" and you will see a _DoorOpen_ function appear. Create it. Repeat this process for **OnComponentEndOverlap (TriggerVolume)** and create a _DoorClose_ function.

[![AddingDoorOpen DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0f/AddingDoorOpen_DT.png)](/File:AddingDoorOpen_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:AddingDoorOpen_DT.png "Enlarge")

  

[![CustomEventsAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/5/58/CustomEventsAdded_DT.png)](/File:CustomEventsAdded_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CustomEventsAdded_DT.png "Enlarge")

  
7\. Compile, save, and test your door. By separating out your behavior like this, it will be much easier to see exactly what happens when a player touches the BoxComponent, as well as much easier to insert additional behavior later on.

### Commenting

Commenting can be a lifesaver when it comes to more complex Blueprint networks. Should you be working on a team with multiple people, or ever have to walk away from a Blueprint only to have to come back and edit it later, having comments in place can make it much easier to follow along with what was already done. Comments can also make it clearer where additions should be made when trying to produce specific functionality.

1\. Continue from Tutorial 4.1. Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

2\. Drag a selection box around the section of the network that handles door motion.

[![SelectionBox3 DT.png](https://d3ar1piqh1oeli.cloudfront.net/5/53/SelectionBox3_DT.png/940px-SelectionBox3_DT.png)](/File:SelectionBox3_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:SelectionBox3_DT.png "Enlarge")

  
3\. Press the _C_ key to create a comment box. Alternatively, you may also right-click and choose **Create Comment from Selection**.

[![NewCommentBox DT.png](https://d3ar1piqh1oeli.cloudfront.net/d/d6/NewCommentBox_DT.png/940px-NewCommentBox_DT.png)](/File:NewCommentBox_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewCommentBox_DT.png "Enlarge")

  
4\. You can name a Comment as soon as it is created. However, this can also be done after the fact . Simply double-click on the comment and set it to something descriptive, such as, "Handles door motion for opening and closing."

[![CommentText DT.png](https://d26ilriwvtzlb.cloudfront.net/2/25/CommentText_DT.png)](/File:CommentText_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CommentText_DT.png "Enlarge")

  
5\. Move the Comment box to a new location. Notice that all the nodes within it move as well.

[![CommentMoving DT.png](https://d3ar1piqh1oeli.cloudfront.net/0/0b/CommentMoving_DT.png/940px-CommentMoving_DT.png)](/File:CommentMoving_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CommentMoving_DT.png "Enlarge")

  
6\. Compile and save your Blueprint.

Remember that unlike programming code, the visual nature of Blueprints - particularly how nodes can branch in many directions at once - means that it will often not be an easy task to glance at a network and see what it's supposed to be doing. Liberal use of comments can help make it a quick and easy task for you or anyone on your team to see what any part of a network is doing and where any edits or adjustments should take place.

### Collapsing Nodes

Sometimes, for sake of organization, it can be a good idea to take a network of nodes and collapse them down into a single custom-named node. This creates a sub-graph of the nodes that were collapsed, leaving the main Graph much cleaner and in many cases, easier to read. In this example, we will apply this to the Construction Script to condense our mesh and material override networks down into singular nodes.

1\. Continue from Tutorial 4.2. Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

2\. In the _ConstructionScript_ tab, carefully select only those nodes that override the Door mesh. These should be connected to the **Then 0** output pin of the _Sequence_ node.

[![DoorMeshOverrideNetwork DT.png](https://d3ar1piqh1oeli.cloudfront.net/6/6a/DoorMeshOverrideNetwork_DT.png/940px-DoorMeshOverrideNetwork_DT.png)](/File:DoorMeshOverrideNetwork_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorMeshOverrideNetwork_DT.png "Enlarge")

  
3\. With those nodes selected, right-click on one of the selected nodes and choose _Collapse Nodes_ from the context menu. A name entry box will appear; enter the name **Override Mesh - Door**. Press enter, and a new node will appear to replace the selections.

[![CollapseNodes DT.png](https://d26ilriwvtzlb.cloudfront.net/8/86/CollapseNodes_DT.png)](/File:CollapseNodes_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CollapseNodes_DT.png "Enlarge")

  

[![OverrideMesh Door DT.png](https://d26ilriwvtzlb.cloudfront.net/b/bf/OverrideMesh_Door_DT.png)](/File:OverrideMesh_Door_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OverrideMesh_Door_DT.png "Enlarge")

  

[![MeshOverride DoorNode DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0e/MeshOverride_DoorNode_DT.png)](/File:MeshOverride_DoorNode_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:MeshOverride_DoorNode_DT.png "Enlarge")

  
4\. Repeat this process with the remaining networks that branch out of the _Sequence_ node. When finished, your network should look something like this:

[![Collapsed Network DT.png](https://d3ar1piqh1oeli.cloudfront.net/1/18/Collapsed_Network_DT.png/940px-Collapsed_Network_DT.png)](/File:Collapsed_Network_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Collapsed_Network_DT.png "Enlarge")

  
5\. Mouse-over any of the collapsed nodes and notice the preview thumbnail that appears. This can give you a quick idea of the network within the collapsed node.

[![ThumbnailPreview DT.png](https://d26ilriwvtzlb.cloudfront.net/0/00/ThumbnailPreview_DT.png)](/File:ThumbnailPreview_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:ThumbnailPreview_DT.png "Enlarge")

  
6\. Double-click on any of the collapsed networks. This will allow you to "step inside" the node and see the network within.

[![CollapsedNetwork Inside DT.png](https://d3ar1piqh1oeli.cloudfront.net/7/74/CollapsedNetwork_Inside_DT.png/940px-CollapsedNetwork_Inside_DT.png)](/File:CollapsedNetwork_Inside_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CollapsedNetwork_Inside_DT.png "Enlarge")

  
7\. Notice the **Inputs** and **Outputs** nodes. These define the inputs and outputs that can be found on the collapsed node. By selecting either of these, you can go to the details panel and add further inputs and outputs.

[![TunnelEntranceDetails DT.png](https://d26ilriwvtzlb.cloudfront.net/5/5c/TunnelEntranceDetails_DT.png)](/File:TunnelEntranceDetails_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:TunnelEntranceDetails_DT.png "Enlarge")

  
New _Input_ and _Output_ pins can be created by clicking the **New** button, and then adding a type and a name.

Unwanted _Input_ and _Output_ pins can be removed by clicking the **X Remove** button.

Notice that the _Output_ node currently has no output in. This is because the final node in our selected network did not have an outgoing connection. Had we selected a series of nodes that were already connected to something else, then we would see an output connection of the appropriate type had been created automatically.

To add an execution pin rather than a variable data type, set the _Type_ dropdown to **exec**. When doing so, you can set the name to a space if you want a single unnamed execution pin.

8\. Compile and save your Blueprint.

### Chapter 4: Troubleshooting

Problem

Solution

I can't create a function _before_ a Custom Event. Why is that?

This is simply the nature of the workflow.

While you can create Custom Events with any name you like, there is no mechanism for creating the functions first.

This prevents accidentally creating arbitrary functions which call non-existent events.

I can't seem to change the title of my Comment blocks.

Make sure you're not looking for a "Comment" property, as one does not exist.

Simply double-click the comment title in the Graph.

My collapsed network does not have an output pin!

This is to be expected, as long as you selected a series of nodes in which the final node was not outputting anything.

If you select a node that is outputting into another node, an output pin will be created and connected automatically.

You can double-click any collapsed network and use the _Details_ panel to modify the **Tunnel Entrance** and **Tunnel Exit** nodes to create your own inputs and outputs.

Making a Useable Door
---------------------

Chapter 5 takes a look at how we can modify our door so that a level designer has the option of making it a "useable" door. This means that instead of the door opening when a player enters the Box Component, the player will instead have to walk up to the door and press a "use" key on the keyboard.

Since this will be optional behavior, set up will require that we create a global Boolean variable that an LD can check in the Details panel, and the value of that variable will be used to branch behavior within our network. In short, the door will behave like so:

*   Exposed global variable "Door Is Usable".
*   If checked, the door must be used to open.
*   If not checked, the door will open due to player proximity.

In order to make this system work, however, we will have to set up our Blueprint such that it can accept and process inputs from the user. This will require the implementation of a special Blueprint Interface.

### Enabling Input

In order to make our door "usable" rather than merely proximity based, we have to set our Blueprint up in a special way so that it can receive inputs from the user.

This process in itself is very simple. However, from a useability standpoint, we have some changes to make in our network to make sure it works properly.

*   First, we will set up an editible variable (visible within the editor) that allows us to set the door as "usable."
    *   If this is checked, players will need to press a key to open and close the door.
    *   If not, the door will operate if the player enters or exits the box component. In this way, we set the stage for functionality options.

*   If the door is set to be usable, then instead of opening the door when the player enters the BoxComponent, we will enable and disable the ability for inputs to be read. Those inputs will, in turn, open and close the door.

*   We will create a special variable that will be used to monitor when the door is open and closed. This will keep the state of the door from falling out of sync, which could require the player to press their input an additional time, causing confusion and/or frustration.

In this tutorial, we will set up the system by which we enable inputs from the player.

1\. Continue from the end of Tutorial 4. Be sure to drag a copy of the Blueprint into the level for testing within PIE. Double-click the Blueprint to open it within the Blueprint Editor.

2\. Create a new Boolean variable called "Door Is Usable." Give it the following properties:

[![DoorIsUsable DT.png](https://d26ilriwvtzlb.cloudfront.net/a/a8/DoorIsUsable_DT.png)](/File:DoorIsUsable_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorIsUsable_DT.png "Enlarge")

  
3\. Disconnect the **Door Open** and **Door Close** functions from the **OnComponentBeginOverlap** and **OnComponentEndOverlap** nodes. Move the function nodes away for the time being.

[![OverlapNodes DT.png](https://d26ilriwvtzlb.cloudfront.net/1/10/OverlapNodes_DT.png)](/File:OverlapNodes_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:OverlapNodes_DT.png "Enlarge")

  
4\. Drag a wire off the **OnComponentBeginOverlap** node, using the execution output pin, and create a new **Branch** node.

[![CreateBranch DT.png](https://d26ilriwvtzlb.cloudfront.net/1/1f/CreateBranch_DT.png)](/File:CreateBranch_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CreateBranch_DT.png "Enlarge")

  

[![BranchNodeCreated DT.png](https://d26ilriwvtzlb.cloudfront.net/5/53/BranchNodeCreated_DT.png)](/File:BranchNodeCreated_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:BranchNodeCreated_DT.png "Enlarge")

  
5\. Ctrl-drag a copy of the **Door Is Usable** variable to the _Condition_ input of the new **Branch** node.

[![DoorIsUsableCondition DT.png](https://d26ilriwvtzlb.cloudfront.net/f/f8/DoorIsUsableCondition_DT.png)](/File:DoorIsUsableCondition_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorIsUsableCondition_DT.png "Enlarge")

  
6\. Drag a wire off the _True_ output of the **Branch** node and create an **Enable Input** node. It will be easiest to start typing "Enable Input" in the search line.

[![EnableInput DT.png](https://d26ilriwvtzlb.cloudfront.net/2/29/EnableInput_DT.png)](/File:EnableInput_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:EnableInput_DT.png "Enlarge")

  
7\. Drag a wire backwards form the _Player Controller_ input pin of the **Enable Input** node. Use the search line to create a **Get Player Controller** node.

[![GetPlayerController DT.png](https://d26ilriwvtzlb.cloudfront.net/7/74/GetPlayerController_DT.png)](/File:GetPlayerController_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:GetPlayerController_DT.png "Enlarge")

_For sake of simplicity in this introductory tutorial, we are simply enabling and disabling input for Player 0, which is the player of a single player game. Things would get slightly more intricate if you needed multiplayer support, and is beyond the scope of this tutorial set._

  
8\. Drag a wire from the _False_ output of the **Branch** node and create a **Door Open** function. This means that the door will open on proximity if the _Door Is Usable_ variable is currently set to false.

[![DoorOpenFromFalse DT.png](https://d26ilriwvtzlb.cloudfront.net/1/18/DoorOpenFromFalse_DT.png)](/File:DoorOpenFromFalse_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorOpenFromFalse_DT.png "Enlarge")

  
9\. Repeat the above steps for the **OnComponentEndOverlap** node, but swap the nodes connected to the **Branch** for a **Disable Input** node and a **Door Close** function, as shown.

[![DisableInput DT.png](https://d26ilriwvtzlb.cloudfront.net/3/3a/DisableInput_DT.png)](/File:DisableInput_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DisableInput_DT.png "Enlarge")

  
10\. Compile and save your Blueprint. At this time, there is no direct way to test our progress.

### Key Events

In the previous tutorial, we set up our door to have the _ability_ to accept inputs from the user. However, we now need to set up an event for the desired key press and tell the Blueprint script to do something with that input. To make sure things stay in sync with the current state of the door, we will start by creating a Boolean to track whether the door is open or closed.

  
1\. Continue from Tutorial 5.1. Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

2\. Create a new Boolean variable named _Door Is Open_. It requires no special settings. Ctrl-drag a Get variable node for _Door Is Open_ into the Graph.

[![DoorIsOpenVariable DT.png](https://d26ilriwvtzlb.cloudfront.net/6/6e/DoorIsOpenVariable_DT.png)](/File:DoorIsOpenVariable_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorIsOpenVariable_DT.png "Enlarge")

  

[![DoorIsOpenCreated DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c3/DoorIsOpenCreated_DT.png)](/File:DoorIsOpenCreated_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorIsOpenCreated_DT.png "Enlarge")

  
3\. Right-click and create a new Input Event for the F key. These are found under _Input > Key Events_.

[![InputKeyF DT.png](https://d26ilriwvtzlb.cloudfront.net/8/85/InputKeyF_DT.png)](/File:InputKeyF_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:InputKeyF_DT.png "Enlarge")

  
4\. Drag a wire from the _Pressed_ output of the **InputKey F** event and create a new **Branch** node. Connect the **Door Is Open** node to the _Condition_ input.

[![InputBranch DT.png](https://d26ilriwvtzlb.cloudfront.net/6/69/InputBranch_DT.png)](/File:InputBranch_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:InputBranch_DT.png "Enlarge")

  
5\. The next part is pretty straightforward from a logical standpoint. Create **Door Open** and **Door Closed** function and connect them to the **Branch** such that if the door is closed, we open it; and vice versa.

[![InputBranchingInPlace DT.png](https://d26ilriwvtzlb.cloudfront.net/1/11/InputBranchingInPlace_DT.png)](/File:InputBranchingInPlace_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:InputBranchingInPlace_DT.png "Enlarge")

  
6\. Our final step is to make sure that the _Door Is Open_ variable gets updated appropriately. **Alt-drag** a copy of the variable into the graph and connect it in between the **Custom Event DoorOpen** and the **Timeline - Door Driver** nodes. Make sure to check its default value so that sets the variable properly. Repeat for the **Custom Event DoorClose** node as shown.

[![SetDoorIsOpen DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b1/SetDoorIsOpen_DT.png)](/File:SetDoorIsOpen_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:SetDoorIsOpen_DT.png "Enlarge")

  
7\. Compile and save your Blueprint. Notice the _Door Is Usable_ checkbox in the Details panel when the door is selected in the viewport. When checked, you should have to press _F_ to open the door. If unchcekd, the door should open when the player enters the BoxComponent.

[![DoorIsUsable Property DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c7/DoorIsUsable_Property_DT.png)](/File:DoorIsUsable_Property_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorIsUsable_Property_DT.png "Enlarge")

  

### Finalizing Use Controls

We need to set up a system such when we press the Use key (E in our case) the door will open and close. Although we could employ a FlipFlop node to handle this type of behavior, this may introduce the occasional bug if the state of the door and the use of the key ever get out of sync. In short, we could wind up telling a closed door to close again. Instead, we will create a new Boolean variable that stores the current state of the door, and use that to branch behavior of what happens when we press the E key. If the door is open, we'll close it. If it's closed, we'll open it.

1\. Continue from Tutorial 5.2 or open the **DoorTutorial\_5-3** folder included with [the assets for this tutorial](https://d26ilriwvtzlb.cloudfront.net/c/c6/Door.zip "Door.zip"). Double-click the Blueprint to open it in the Blueprint Editor and make sure that it has been added to the level for testing.

2\. Create a Custom Event named **UseKeyPressed**.

[![CustomEventUseKeyPressed DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2a/CustomEventUseKeyPressed_DT.png)](/File:CustomEventUseKeyPressed_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:CustomEventUseKeyPressed_DT.png "Enlarge")

  
The name UseKeyPressed was defined in an earlier tutorial in which we set up an InputComponent. If you have used another name to define the custom event for your use key, please use that instead. If necessary, go into the Components tab and double check the Action bindings on the InputController to make sure you're using the right name. Remember, if all else fails, just copy/paste it!

3\. Create a new Branch node and connect it to the **UseKeyPressed** event. Right-click on its Condition input and choose _Promote to Variable_. Set the name of the new Boolean variable to **DoorIsOpen**.

[![DoorIsOpenVariableGraph DT.png](https://d26ilriwvtzlb.cloudfront.net/d/d7/DoorIsOpenVariableGraph_DT.png)](/File:DoorIsOpenVariableGraph_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorIsOpenVariableGraph_DT.png "Enlarge")

  
4\. From the _True_ output pin, create a new **DoorClose** function (or duplicate one from elsewhere in the graph). From the _False_ output pin, create or duplicate a new DoorOpen function.

[![DoorUseMechanism DT.png](https://d26ilriwvtzlb.cloudfront.net/3/30/DoorUseMechanism_DT.png)](/File:DoorUseMechanism_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorUseMechanism_DT.png "Enlarge")

  
5\. Alt-drag a copy of the DoorIsClosed Boolean variable (to create a set node) and connect one to each of the DoorOpen and DoorClosed functions. The DoorOpen version should set the variable to _True_ (checked), while the DoorClosed version should set it to _False_ (unchecked).

[![DoorVariableSet DT.png](https://d3ar1piqh1oeli.cloudfront.net/b/b3/DoorVariableSet_DT.png/940px-DoorVariableSet_DT.png)](/File:DoorVariableSet_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorVariableSet_DT.png "Enlarge")

  
6\. Compile and save your Blueprint. Test within the level.

*   If the door's DoorIsUsable setting is checked (look in the Details panel), then the door will not open when approached.
*   While within the BoxComponent, you should be able to press the Use key (E in our case) and thereby open and close the door.
*   If you step away from the door's BoxComponent, you should no longer be able to open and close door.
*   If the door's DoorIsUsable setting is UNchecked, then the door will simply work as a basic proximity door.

### Chapter 5: Troubleshooting

Problem

Solution

I press the F key and nothing happens!

There are a few possible causes for this problem:

Possible Issue

Solution

You're not enabling inputs for the Blueprint properly.

Keep in mind that when setting up the Use system, our Box Component's job changes from opening the door to firing an **Enable Inputs** function.

This means that the player controller is now able to pass inputs directly to the door Blueprint.

Make sure your network is set up so that if the _Door Is Usable_ variable is _True_, then the **OnComponentBeginOverlap** event branches to a **Begin Control** node, with a **Get Player Controller** node attached to the _New Controller_ input, and the Player index of the **Get Player Controller** set at 0.

The _Door Is Usable_ variable is not properly utilized.

You set a different key than F as your Key Event.

The _Door Is Usable_ variable must be set to Editable and must have its value checked in order for the inputs to work.

Double-check the tutorial steps before continuing. Although unlikely, we've actually seen this error pop up. Make sure that your Key Event is for the F key.

If it isn't either create the proper Key Event or try testing again while pressing whatever button you happened to use.

I can press Use and open and close the door, no matter where I am in the level.

The likeliest problem is that you're never firing an **Disable Input** node.

This means you're enabling inputs for the Blueprint door, but never relinquishing that ability.

Make sure that your **OnComponentEndOverlap** event uses a Branch to check the _Door Is Usable_ variable, and if it's set to _True_ you should be executing an **Disable Inputs** node.

Creating a Door Counter
-----------------------

Chapter 6 concludes this series of tutorials by demonstrating the creation of a special Blueprint whose sole job is to keep track of the number of times your door (or _doors_) open. While not directly practical in and of itself, this does demonstrate how you can send data from one Blueprint to another.

To make this happen, we are going to need to create and implement a custom Blueprint Interface. This interface will include a customized function, allowing us to send the name of the new Counter Blueprint to our door, so that it can send info back, reporting each time it opens. The Counter will simply hold an integer that increments each time it receives a function call.

Of particular importance in this case is that the Counter will increment its stored value whenever it receives this call, no matter where it's coming from. This means we can have any number of doors in our level, and as long as each door is associated with the same Counter Blueprint Actor, the value will always represent the total number of times that any door has opened.

### Custom Interface

As an exercise to help us see how Blueprints can talk to one another via Blueprint Interfaces, we are going to create a simple Blueprint that counts the number of times any of our level's doors open. This could potentially be used later for stat tracking, or even to cause some sort of event should enough doors be opened.

The system will work as follows:

*   We will create an interface that serves to pass data between all parts of our door system.
*   Our door will implement (or utilize) this interface.
*   We will create a new custom transaction counter Blueprint that also implements this interface.
*   Each time a door opens, it will call a custom increment function that is part of our interface.
*   Because the counter also implements our interface, this same function will be called on the counter Blueprint, which will increment the transaction count and print the total to the screen.

This process is purely academic; generally, you will not create Blueprints designed specifically to log data to the screen. The purpose here is to show how, by way of an interface, we can call functions on other Blueprints.

Please be aware that this Tutorial assumes that you have now been working with with Blueprints at least a bit. As such, there will not be as much handholding throughout the steps.

1\. Continue from the end of Tutorial 5. Be sure to drag a copy of the Blueprint into the level for testing within PIE. Double-click the Blueprint to open it within the Blueprint Editor.

2\. In the Content Browser, within the folder of your choice, create a new Blueprint Interface. Name it _Interface\_Tutorial\_Door_. Double-click it to open this interface in the Interface Editor.

[![NewBPInterfaceMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0f/NewBPInterfaceMenu_DT.png)](/File:NewBPInterfaceMenu_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewBPInterfaceMenu_DT.png "Enlarge")

  

[![NewBlueprintInterface DT.png](https://d26ilriwvtzlb.cloudfront.net/7/77/NewBlueprintInterface_DT.png)](/File:NewBlueprintInterface_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewBlueprintInterface_DT.png "Enlarge")

  
3\. In the _My Blueprint_ panel, click the **New Function** button and create a function named **"IncrementDoorTransactions."** This new function will appear in the _My Blueprint_ list, and its graph will appear in the main editor view.

[![IncrementDoorTransactionsFunction DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2e/IncrementDoorTransactionsFunction_DT.png)](/File:IncrementDoorTransactionsFunction_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:IncrementDoorTransactionsFunction_DT.png "Enlarge")

  
Notice that you cannot add nodes as you would in the Blueprint Editor. An interface only contains functions that have no functionality in and of themselves. Within any Blueprint that implements that interface, you may then use that function as a template, defining custom functionality from there.

4\. Compile and save your Interface. We cannot yet test anything.

### Making the Counter Blueprint

With the interface complete, we now have a means by which to make function calls from one Blueprint to another. In this tutorial, we will create a new non-rendering Blueprint whose only job is to keep track of the number of times any associated door has opened and print that to the screen.

1\. Continue from Tutorial 6.1.

2\. In the Content Browser, create a new Blueprint. Set the Parent Class to Actor. Name this Blueprint **Tutorial\_Counter** and open it in the Blueprint Editor.

[![NewTutorialCounterBP DT.png](https://d26ilriwvtzlb.cloudfront.net/5/50/NewTutorialCounterBP_DT.png)](/File:NewTutorialCounterBP_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewTutorialCounterBP_DT.png "Enlarge")

  
3\. In the Components list **Components** Button in the Blueprint Editor toolbar), add a new **SpriteComponent** named _Marker_. This is only there to give us something to look at when the counter is placed in the level. We won't be using it for anything else.

[![NewMarkerSpriteComponent DT.png](https://d3ar1piqh1oeli.cloudfront.net/6/6e/NewMarkerSpriteComponent_DT.png/940px-NewMarkerSpriteComponent_DT.png)](/File:NewMarkerSpriteComponent_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewMarkerSpriteComponent_DT.png "Enlarge")

  
4\. At the top of the Blueprint Editor, click the **Blueprint Props** Button. In the _Details_ panel, look within the _Interfaces_ category and click the **Add Interface** Button. Choose _Interface\_Tutorial\_Door_ created in the previous tutorial. This will implement the interface, giving you access to all functions within that interface.

[![DoorInterfaceImplemented DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b0/DoorInterfaceImplemented_DT.png)](/File:DoorInterfaceImplemented_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorInterfaceImplemented_DT.png "Enlarge")

  
If you do not see your interface listed, make sure you saved the the interface!

5\. In the Event Graph, right-click and type "increment." You should see the IncrementDoorTransactions event appear within the list. Click it to create the event.

[![NewIncrementEvent DT.png](https://d26ilriwvtzlb.cloudfront.net/3/31/NewIncrementEvent_DT.png)](/File:NewIncrementEvent_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewIncrementEvent_DT.png "Enlarge")

  
6\. In the _My Blueprints_ panel click the **Add Variable** Button to create a new variable of type Int (integer) named DoorTransactions. This will hold the total door transactions for all doors associated with this Blueprint.

[![DoorTransactionsVariableCreated DT.png](https://d26ilriwvtzlb.cloudfront.net/2/27/DoorTransactionsVariableCreated_DT.png)](/File:DoorTransactionsVariableCreated_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorTransactionsVariableCreated_DT.png "Enlarge")

  
7\. Ctrl-drag a copy of the **Door Transactions** variable into the Event Graph.

[![GetDoorTransactions DT.png](https://d26ilriwvtzlb.cloudfront.net/f/fe/GetDoorTransactions_DT.png)](/File:GetDoorTransactions_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:GetDoorTransactions_DT.png "Enlarge")

  
8\. Drag a wire off the **Door Transactions** variable and type a **+** sign. You should see **\+ (Integer)** appear in the list. Click to create one, and set the second input field to 1. This will add 1 to the current value of the **Door Transactions** variable.

[![AddIntegerMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2a/AddIntegerMenu_DT.png)](/File:AddIntegerMenu_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:AddIntegerMenu_DT.png "Enlarge")

  

[![IntegerAddNode DT.png](https://d26ilriwvtzlb.cloudfront.net/3/3d/IntegerAddNode_DT.png)](/File:IntegerAddNode_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:IntegerAddNode_DT.png "Enlarge")

  
9\. Alt-drag a copy of the **Door Transactions** variable into the Event Graph. This will create a **Set** node. Connect it to the event and then connect the result of the addition node to the Value input of the Set node.

[![SetDoorTransactions DT.png](https://d26ilriwvtzlb.cloudfront.net/2/2d/SetDoorTransactions_DT.png)](/File:SetDoorTransactions_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:SetDoorTransactions_DT.png "Enlarge")

  
10\. Finally, create a **Print String** node. Wire it to take place after the Set variable node and connect the **Door Transactions** variable into the string input. Notice that a conversion node is automatically created.

[![LoggingDoorTransactions DT.png](https://d26ilriwvtzlb.cloudfront.net/c/c9/LoggingDoorTransactions_DT.png)](/File:LoggingDoorTransactions_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:LoggingDoorTransactions_DT.png "Enlarge")

  
11\. Compile and save. At this point, the functionality for the complete. However, there is no way to test this until our door can be associated with the Blueprint.

### Blueprint Actor Setup

We will now finish up the final steps in creating our Door Counter Blueprint, allowing us to track door transactions.

1\. Continue from **Tutorial 6.2**. Open the _Tutorial\_Door_ Blueprint.

2\. At the top of the Blueprint Editor, click the **Blueprint Props** Button. In the _Details_ panel, look within the **Interfaces** category, click the **New** Button and choose _Interface\_Tutorial\_Door_.

[![DoorInterfaceImplemented DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b0/DoorInterfaceImplemented_DT.png)](/File:DoorInterfaceImplemented_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorInterfaceImplemented_DT.png "Enlarge")

  
If you do not see your interface listed, make sure you saved the the interface!

3\. Create a new variable of type Actor, named **DoorCounter**. Set this variable to global and give it a tooltip of, "This holds an associated transaction counter Blueprint." Set the Custom Group Name to _Door Setup_.

[![DoorCounterVariableSettings DT.png](https://d26ilriwvtzlb.cloudfront.net/b/b1/DoorCounterVariableSettings_DT.png)](/File:DoorCounterVariableSettings_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorCounterVariableSettings_DT.png "Enlarge")

  
It is important to create an Actor variable, which can reference an actor that is placed within the level, as opposed to an Object variable, which cannot.

4\. Locate the **DoorOpen** custom event, which should currently be connected to a **Set Door Is Open** node. Move the event away from the setter node and disconnect it.

[![DoorOpenSeparated DT.png](https://d26ilriwvtzlb.cloudfront.net/9/9b/DoorOpenSeparated_DT.png)](/File:DoorOpenSeparated_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorOpenSeparated_DT.png "Enlarge")

5\. Right-click in empty space (outside the Comment block!) and expand **Interface Messages**. You should see the name of your interface underneath. Expand this and you should see the **IncrementDoorTransactions** function. Click it to create the function.

[![IncrementDoorTransactionsMenu DT.png](https://d26ilriwvtzlb.cloudfront.net/7/73/IncrementDoorTransactionsMenu_DT.png)](/File:IncrementDoorTransactionsMenu_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:IncrementDoorTransactionsMenu_DT.png "Enlarge")

  

[![IncrementDoorTransactionsNode DT.png](https://d26ilriwvtzlb.cloudfront.net/2/29/IncrementDoorTransactionsNode_DT.png)](/File:IncrementDoorTransactionsNode_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:IncrementDoorTransactionsNode_DT.png "Enlarge")

  
It is absolutely vital that you choose the version of the function listed under Interface Messages. There is also a version that lies under Functions, but it will only work locally. Visually, the only difference is that the Interface Message version has a light blue banner across the top.

6\. Wire the new IncrementDoorTransactions node between the DoorOpen event and the Timeline.

[![IncrementDoorTransactionsWired DT.png](https://d26ilriwvtzlb.cloudfront.net/0/0d/IncrementDoorTransactionsWired_DT.png)](/File:IncrementDoorTransactionsWired_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:IncrementDoorTransactionsWired_DT.png "Enlarge")

  
7\. Ctrl-drag a copy of the DoorCounter variable into the Event Graph and connect it to the Target of the IncrementDoorTransactions function.

[![DoorCounterAdded DT.png](https://d26ilriwvtzlb.cloudfront.net/a/ae/DoorCounterAdded_DT.png)](/File:DoorCounterAdded_DT.png)

[![](/skins/common/images/magnify-clip.png)](/File:DoorCounterAdded_DT.png "Enlarge")

  
8\. Compile and save.

9\. To test, do the following:

*   Drag a copy of the Counter Blueprint into the level.
*   Select the door, which should already be placed within the level.
*   Lock the Details panel, using the lock icon in the upper right of the panel.
*   Select the Counter Blueprint from the Scene Outliner list.
*   In the door's details, click the arrow next to the Door Counter setting. This will place a copy of that actor into the slot, associating the counter with that door.
*   Optionally, create additional doors and associate them with this counter blueprint. No matter which door opens, the transactions should continue to increment.

### Chapter 6: Troubleshooting

Problem

Solution

I don't see my Blueprint Interface in the Interface list.

Make sure you saved the Interface asset in the Content Browser.

Though rarely an issue, you should also try closing and re-opening your Blueprint in the Blueprint Editor.

I cannot connect my DoorCounter variable to the Target input on the IncrementDoorTransactions function.

The likeliest problem is that you're using the wrong _version_ of your function.

Each function has a local and non-local version. You want to make sure you're using the one listed under **Interface Messages** in the context menu.

That's the only one that actually transmits by way of the interface to other Blueprints.

  

Русское сообщество Unreal Engine 4
----------------------------------

[Русское сообщество Unreal Engine 4](http://ue4.codengine.ru)

[Уроки по Unreal Engine 4 на Русском](http://ue4.codengine.ru/index.php/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A3%D1%80%D0%BE%D0%BA%D0%B8)

[Ссылка на русское сообщество](http://ue4.codengine.ru/index.php/Blueprint_%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D0%B4%D0%B2%D0%B5%D1%80%D0%B8)

Перевел [Дмитрий Кулик](http://vk.com/sentike)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_автоматические\_двери&oldid=13940](https://wiki.unrealengine.com/index.php?title=Blueprint_автоматические_двери&oldid=13940)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")

  ![](https://tracking.unrealengine.com/track.png)