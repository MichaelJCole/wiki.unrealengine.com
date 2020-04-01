Blueprint Lift Tutorial RU - Epic Wiki                    

Blueprint Lift Tutorial RU
==========================

  

Contents
--------

*   [1 Обзор](#.D0.9E.D0.B1.D0.B7.D0.BE.D1.80)
*   [2 Настройка уровня](#.D0.9D.D0.B0.D1.81.D1.82.D1.80.D0.BE.D0.B9.D0.BA.D0.B0_.D1.83.D1.80.D0.BE.D0.B2.D0.BD.D1.8F)
*   [3 Matinee](#Matinee)
*   [4 Blueprint](#Blueprint)
    *   [4.1 Комментарии](#.D0.9A.D0.BE.D0.BC.D0.BC.D0.B5.D0.BD.D1.82.D0.B0.D1.80.D0.B8.D0.B8)

  

Обзор
-----

Лифты и движущиеся платформы, могут быть неотъемлемой частью перемещения вашего персонажа по уровню, и их легко можно создать объединив Matine и Blueprints. Как и примеры с _Spotlight Off Switch_ и _Spotlight Toggle Switch_ данный пример начинается с **Blueprint Third Person**. Данная заготовка содержит камеру, персонажа и некоторые основы настройки геометрии в blueprint формате. Вы можете открыть существующие Blueprints, что бы посмотреть как они устроены.

[![Scene no lift LT.png](https://d26ilriwvtzlb.cloudfront.net/b/b0/Scene_no_lift_LT.png)](/File:Scene_no_lift_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Scene_no_lift_LT.png "Enlarge")

  

Настройка уровня
----------------

Что бы показать как это работает, была добавлена StaticMesh платформа с StaticMesh сферой, которая выступает в роли персонажа забравшегося на нее. **Class Blueprints** идеально подходит для добавления в игру функциональных объектов наподобие этой сферы. Присутствие платформы и сферы не обязательны для работы данного урока - они здесь лишь для примера.

Мы начнем с Blueprint уровня. Все на уровне может ссылаться на Blueprint. Поэтому, нашим первым шагом будет разместить объекты.

1\. Из **Content Browser** на панели **Tools** выберите _StaticMesh_ **Shape\_Cube**. Перетащите данный StaticMesh на уровень, и разместите его на землю, туда где хотите что бы располагалась платформа. Вы можете изменить размер платформы, что бы на ней было удобно стоять.

[![Scene liftmesh perspective LT.png](https://d26ilriwvtzlb.cloudfront.net/7/7c/Scene_liftmesh_perspective_LT.png)](/File:Scene_liftmesh_perspective_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Scene_liftmesh_perspective_LT.png "Enlarge")

[![Scene liftmesh top LT.png](https://d26ilriwvtzlb.cloudfront.net/c/ca/Scene_liftmesh_top_LT.png)](/File:Scene_liftmesh_top_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Scene_liftmesh_top_LT.png "Enlarge")

  

2\. На панели **Details** вашего _StaticMesh_, переименуйте его в **"LiftPlatform"**.

[![Details liftmesh rename LT.png](https://d26ilriwvtzlb.cloudfront.net/9/9a/Details_liftmesh_rename_LT.png)](/File:Details_liftmesh_rename_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Details_liftmesh_rename_LT.png "Enlarge")

  

3.Так же на панели **Details** измените значение **Mobility** вашего _StaticMesh_ на **Moveable**. Это позволит вашему _MatineeActor_ перемещать платформу.

[![Details liftmesh mobility LT.png](https://d26ilriwvtzlb.cloudfront.net/1/1d/Details_liftmesh_mobility_LT.png)](/File:Details_liftmesh_mobility_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Details_liftmesh_mobility_LT.png "Enlarge")

  

4\. ПКМ на уровне и выберите **Add Actor > Trigger > Trigger (Box)** для размещения на уровне **Trigger (Box)**. Выровняйте его над вашей **LiftPlatform**, и подгоните размер под вашу платформу по осям X и Y.

Actor - это объект который может быть размещен или создан на уровне. _Lights, TriggerVolumes, StaticMeshes,_ и _Cameras_ - это все Actors.

[![Scene trigger perspective LT.png](https://d26ilriwvtzlb.cloudfront.net/3/31/Scene_trigger_perspective_LT.png)](/File:Scene_trigger_perspective_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Scene_trigger_perspective_LT.png "Enlarge")

  

5\. На панели **Scene Outliner** перетащите **TriggerBox** во внутрь **LiftPlatform** так что бы она стала вложена в него. Это присоединит **TriggerBox** к **LiftPlatform**, так когда _Level Blueprint_ будет перемещать **LiftPlatform**, **TriggerBox** будет перемещаться вместе с ней.

[![Attach trigger LT.png](https://d26ilriwvtzlb.cloudfront.net/5/5d/Attach_trigger_LT.png)](/File:Attach_trigger_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Attach_trigger_LT.png "Enlarge")

  

6\. Используйте меню **Window** в **Level Editor** и откройте **Class Viewer**.

7\. Напечатайте _Matinee_ в строке поиска в **Class Viewer**.

[![Class viewer matinee LT.png](https://d26ilriwvtzlb.cloudfront.net/7/75/Class_viewer_matinee_LT.png)](/File:Class_viewer_matinee_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Class_viewer_matinee_LT.png "Enlarge")

  

8\. Перетащите _MatineeActor_ на ваш уровень.

[![Matinee dragdrop LT.png](https://d26ilriwvtzlb.cloudfront.net/9/96/Matinee_dragdrop_LT.png)](/File:Matinee_dragdrop_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_dragdrop_LT.png "Enlarge")

  

9\. В панели **Details** переименуйте ваш _MatineeActor_ в **"LiftMatinee"**.

[![Details matinee rename LT.png](https://d26ilriwvtzlb.cloudfront.net/5/5e/Details_matinee_rename_LT.png)](/File:Details_matinee_rename_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Details_matinee_rename_LT.png "Enlarge")

  

Matinee
-------

Вы будите использовать данный _MatineeActor_ для перемещения вашей платформы в её конечное положение.

1\. Нажмите конопку **Matinee** на панели **Level Editor** и в появившемся меню выберите **LiftMatinee**.

[![Open matinee LT.png](https://d26ilriwvtzlb.cloudfront.net/4/4c/Open_matinee_LT.png)](/File:Open_matinee_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Open_matinee_LT.png "Enlarge")

  

2\. В появившемся предупреждении **Matinee Undo Warning** нажмите **Continue**.

[![Matinee undo warning LT.png](https://d26ilriwvtzlb.cloudfront.net/c/c6/Matinee_undo_warning_LT.png)](/File:Matinee_undo_warning_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_undo_warning_LT.png "Enlarge")

  
Откроется окно **Matinee Editor**.

[![Matinee editor LT.png](https://d3ar1piqh1oeli.cloudfront.net/8/80/Matinee_editor_LT.png/940px-Matinee_editor_LT.png)](/File:Matinee_editor_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_editor_LT.png "Enlarge")

  

3\. На **Timeline Pane** ПКМ на **Group/Track List**.

[![Right click area LT.png](https://d26ilriwvtzlb.cloudfront.net/e/ec/Right_click_area_LT.png)](/File:Right_click_area_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Right_click_area_LT.png "Enlarge")

  

4\. В меню правой кнопки мыши выберите **Add New Empty Group**.

[![Add new empty group LT.png](https://d26ilriwvtzlb.cloudfront.net/5/56/Add_new_empty_group_LT.png)](/File:Add_new_empty_group_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Add_new_empty_group_LT.png "Enlarge")

  

5\. В диалоговом окне **New Group Name** напишите _LiftGroup_.

[![New group name LT.png](https://d26ilriwvtzlb.cloudfront.net/d/de/New_group_name_LT.png)](/File:New_group_name_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:New_group_name_LT.png "Enlarge")

  

6\. Переключитесь на редактор уровня и выберите **LiftPlatform**.

7\. Вернитесь в **Matinee Editor**. ПКМ на **LiftGroup**, затем выберите **Actors > Add Selected Actors**.

[![Matinee add selected actor LT.png](https://d26ilriwvtzlb.cloudfront.net/9/97/Matinee_add_selected_actor_LT.png)](/File:Matinee_add_selected_actor_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_add_selected_actor_LT.png "Enlarge")

  

8\. ПКМ на **LiftGroup** и выберите **Add New Movement Track**. **Movement** track появится ниже группы **LiftGroup**.

[![Add new movement track LT.png](https://d26ilriwvtzlb.cloudfront.net/3/38/Add_new_movement_track_LT.png)](/File:Add_new_movement_track_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Add_new_movement_track_LT.png "Enlarge")

  

9\. Click on the Timeline and drag left to move the timeline to the left of the green timeline block.

[![Matinee shifted track LT.png](https://d26ilriwvtzlb.cloudfront.net/4/40/Matinee_shifted_track_LT.png)](/File:Matinee_shifted_track_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_shifted_track_LT.png "Enlarge")

  
Уже есть красный треугольник, который обозначает первый keyframe. Ваша платформа уже находится в её стартовом положении, так что вам не нужно редактировать первый keyframe.

[![Matinee first keyframe LT.png](https://d26ilriwvtzlb.cloudfront.net/5/58/Matinee_first_keyframe_LT.png)](/File:Matinee_first_keyframe_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_first_keyframe_LT.png "Enlarge")

  

10\. Нажмите на вертикальную черную полосу находящуюся под вашим первым keyframe и перетащите её направо, примерно в положение 1 секунды.

[![Drag timeline track LT.png](https://d26ilriwvtzlb.cloudfront.net/b/be/Drag_timeline_track_LT.png)](/File:Drag_timeline_track_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Drag_timeline_track_LT.png "Enlarge")

  

11\. Нажмите **Enter** для создания вашего конечного keyframe.

12\. Переключитесь на редактор уровня.

13\. Переместите вашу платформу по вертикали, в её конечное положение. Желтая линия показывает путь по которому будет следовать платформа.

[![Matinee drag up LT.png](https://d3ar1piqh1oeli.cloudfront.net/a/a8/Matinee_drag_up_LT.png/940px-Matinee_drag_up_LT.png)](/File:Matinee_drag_up_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_drag_up_LT.png "Enlarge")

  
Если вы разместите окно Matinee редактора так, что бы видеть и Matinee редактор и редактор уровня, то вы сможете увидеть передвижение вашей платформы относительно черной вертикальной полоски.

[![Matinee preview LT.png](https://d3ar1piqh1oeli.cloudfront.net/c/cc/Matinee_preview_LT.png/940px-Matinee_preview_LT.png)](/File:Matinee_preview_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Matinee_preview_LT.png "Enlarge")

  

• Дважды нажмите **Stop** что бы остановить проигрывание и переместить Matinee в стартовое положение.

• Используйте Play и Reverse для проигрыша вперед и в обратном направлении вашего Matinee.

  

Blueprint
---------

На этом мы закончим работу с Matinee и закроем Matinee Editor. Сейчас вы готовы собирать ваш Blueprint.

1\. Выберите TriggerBox в Level Editor.

2\. Нажмите кнопку Level Blueprint на панели редактора уровня.

3\. В окне панели grap ПКМ. В контекстном меня появится панель поиска что бы помочь найти нужный вам вариант.

[![Trigger overlap 1 LT.png](https://d26ilriwvtzlb.cloudfront.net/3/3e/Trigger_overlap_1_LT.png)](/File:Trigger_overlap_1_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Trigger_overlap_1_LT.png "Enlarge")

  
Мы хотим, что бы что то происходило когда персонаж заходит в Trigger Volume. Overlap определяет когда какой-то Actor пересекает Trigger.

4\. В строке поиска напечатайте _Overlap_.

[![Trigger overlap 2 LT.png](https://d26ilriwvtzlb.cloudfront.net/0/0c/Trigger_overlap_2_LT.png)](/File:Trigger_overlap_2_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Trigger_overlap_2_LT.png "Enlarge")

  

5\. Выберите **OnActorBeginOverlap**.

[![Trigger overlap node LT.png](https://d26ilriwvtzlb.cloudfront.net/4/48/Trigger_overlap_node_LT.png)](/File:Trigger_overlap_node_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Trigger_overlap_node_LT.png "Enlarge")

  
Стоит отметить, что появившийся узел красного цвета. Это значит что он определяет событие Event _Node_.

6\. В редакторе уровня выберите **MatineeActor**.

7\. Вернитесь в **Level Blueprint**, ПКМ в окне Graph, и выберите **Add Reference to LiftMatinee**.

[![Add matinee reference LT.png](https://d26ilriwvtzlb.cloudfront.net/b/bb/Add_matinee_reference_LT.png)](/File:Add_matinee_reference_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Add_matinee_reference_LT.png "Enlarge")

  

[![Overlap and matinee LT.png](https://d26ilriwvtzlb.cloudfront.net/f/f6/Overlap_and_matinee_LT.png)](/File:Overlap_and_matinee_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Overlap_and_matinee_LT.png "Enlarge")

  

8\. Вытяните синюю точку **LiftMatinee** и в появившемся контекстом меню напишите _Play_.

[![Graph added play LT.png](https://d26ilriwvtzlb.cloudfront.net/f/fe/Graph_added_play_LT.png)](/File:Graph_added_play_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Graph_added_play_LT.png "Enlarge")

  

9\. Выберите **Play** в появившемся списке функций **Call Function > Matinee**.

[![Graph add play LT.png](https://d26ilriwvtzlb.cloudfront.net/0/0c/Graph_add_play_LT.png)](/File:Graph_add_play_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Graph_add_play_LT.png "Enlarge")

  

10\. Соедините output execution узла **OnActorBeginOverlap** с input execution узла **Play**.

[![Graph added play LT.png](https://d26ilriwvtzlb.cloudfront.net/f/fe/Graph_added_play_LT.png)](/File:Graph_added_play_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Graph_added_play_LT.png "Enlarge")

  
Вы создали лифт который будет подниматься когда вы встаете на него и пересекаете _TriggerVolume_. Для полной функциональности и многоразового использования лифта, вы должны установить MatineeActor в обратном направлении, когда вы покидаете TriggerVolume.

1\. В редакторе уровня выберите ваш **TriggerBox**.

2\. На панели Редактора уровня нажмите кнопку **Level Blueprint**.

3\. ПКМ в окне grap. Появится контекстное меню со строкой поиска.

[![Trigger overlap 1 LT.png](https://d26ilriwvtzlb.cloudfront.net/3/3e/Trigger_overlap_1_LT.png)](/File:Trigger_overlap_1_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Trigger_overlap_1_LT.png "Enlarge")

  
Сейчас мы хотим, что бы что-нибудь происходило, когда персонаж покидает Trigger Volume. Это так же известно, как overlap ending.

4\. В строке поиска наберите _Overlap_.

[![Trigger overlap 2 LT.png](https://d26ilriwvtzlb.cloudfront.net/0/0c/Trigger_overlap_2_LT.png)](/File:Trigger_overlap_2_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Trigger_overlap_2_LT.png "Enlarge")

  

5\. Выберите **Set OnActorEndOverlap**.

[![Added end overlap LT.png](https://d26ilriwvtzlb.cloudfront.net/d/d3/Added_end_overlap_LT.png)](/File:Added_end_overlap_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Added_end_overlap_LT.png "Enlarge")

  

6\. Снова перетащите синий значок **LiftMatinee**. В появившемся контекстном меню напишите Reverse.

[![Add reverse LT.png](https://d26ilriwvtzlb.cloudfront.net/8/85/Add_reverse_LT.png)](/File:Add_reverse_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Add_reverse_LT.png "Enlarge")

  

7\. Выберите функцию Reverse в Call Function > Matinee.

While the output execution pin of a Node cannot be connected to the input execution pin of two different Nodes, Variables and Actor references can be connected to as many Nodes as needed. You may still want duplicate Variable or Actor reference nodes for clarity in large graphs, but there is not a linear execution system enforced for Variable and Actor references.

8\. Соедините значок output execution узла **OnActorEndOverlap** со значком input execution узла **Reverse node**.

[![Lift graph uncommented LT.png](https://d26ilriwvtzlb.cloudfront.net/b/bc/Lift_graph_uncommented_LT.png)](/File:Lift_graph_uncommented_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Lift_graph_uncommented_LT.png "Enlarge")

  
Теперь Blueprint готов к работе. Если вы **Compile** (скомпилируете) _Level Blueprint_ и запустите игру в окне редактора, и взойдете на платформу, то она начнет подниматься до намеченной конечной точки, а когда сойдете с нее, то начнет двигаться в обратном направлении к стартовой позиции.

  

### Комментарии

Вы можете оставлять комментарии к вашим Blueprint graph, в дальнейшем это облегчит работу так как вы будете знать какой Blueprint за что отвечает.

1\. Кликните и растяните выделение, что бы охватить все пять узлов которые вы добавили в _Level Blueprint_.

[![Platform selected LT.png](https://d26ilriwvtzlb.cloudfront.net/e/e9/Platform_selected_LT.png)](/File:Platform_selected_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Platform_selected_LT.png "Enlarge")

  

2\. ПКМ в окне панели graph и выберите **Create Comment from Selection**.

[![Comment 2 LT.png](https://d26ilriwvtzlb.cloudfront.net/d/d1/Comment_2_LT.png)](/File:Comment_2_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Comment_2_LT.png "Enlarge")

  

3\. Напишите _Lift Mechanism_ в появившемся поле для комментариев.

[![Platform name comment LT.png](https://d26ilriwvtzlb.cloudfront.net/4/47/Platform_name_comment_LT.png)](/File:Platform_name_comment_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Platform_name_comment_LT.png "Enlarge")

  
Вы только что успешно добавили комментарий к вашим узлам.

[![Final lift bp LT.png](https://d26ilriwvtzlb.cloudfront.net/2/2a/Final_lift_bp_LT.png)](/File:Final_lift_bp_LT.png)

[![](/skins/common/images/magnify-clip.png)](/File:Final_lift_bp_LT.png "Enlarge")

  
Нажав на окно комментария вы можете перетаскивать все находящиеся в нем узлы в пределах панели **Graph**. Подпись окна комментарии увеличивается при приближении, что бы вы могли найти Механизм вашего лифта, если его нужно будет отредактировать.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Blueprint\_Lift\_Tutorial\_RU&oldid=6542](https://wiki.unrealengine.com/index.php?title=Blueprint_Lift_Tutorial_RU&oldid=6542)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Cinematic](/Category:Cinematic "Category:Cinematic")
*   [Matinee](/Category:Matinee "Category:Matinee")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)