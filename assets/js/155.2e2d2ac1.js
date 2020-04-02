(window.webpackJsonp=window.webpackJsonp||[]).push([[155],{891:function(e,t,a){"use strict";a.r(t);var r=a(28),n=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("p",[e._v("Blueprint Анимация вращения и движения - Epic Wiki")]),e._v(" "),a("h1",{attrs:{id:"blueprint-анимация-вращения-и-движения"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#blueprint-анимация-вращения-и-движения"}},[e._v("#")]),e._v(" Blueprint Анимация вращения и движения")]),e._v(" "),a("p",[e._v("(Redirected from "),a("a",{attrs:{href:"/index.php?title=Blueprint_Animate_Rotation_and_Movement_Tutorial_RU&redirect=no",title:"Blueprint Animate Rotation and Movement Tutorial RU"}},[e._v("Blueprint Animate Rotation and Movement Tutorial RU")]),e._v(")")]),e._v(" "),a("h2",{attrs:{id:"contents"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#contents"}},[e._v("#")]),e._v(" Contents")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#.D0.92.D0.B2.D0.B5.D0.B4.D0.B5.D0.BD.D0.B8.D0.B5"}},[e._v("1 Введение")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#.D0.9D.D0.B0.D1.87.D0.B0.D0.BB.D0.BE_.D1.80.D0.B0.D0.B1.D0.BE.D1.82.D1.8B_.D1.81_Blueprint"}},[e._v("2 Начало работы с Blueprint")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#.D0.9F.D0.B5.D1.80.D0.B5.D0.BC.D0.B5.D0.BD.D0.BD.D1.8B.D0.B5"}},[e._v("2.1 Переменные")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#.D0.9E.D0.B3.D1.80.D0.B0.D0.BD.D0.B8.D1.87.D0.B5.D0.BD.D0.B8.D1.8F"}},[e._v("2.2 Ограничения")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#.D0.A4.D1.83.D0.BD.D0.BA.D1.86.D0.B8.D1.8F_GetNewFromAndTo"}},[e._v("2.3 Функция GetNewFromAndTo")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#.D0.A4.D1.83.D0.BD.D0.BA.D1.86.D0.B8.D1.8F_GetNewFromAndTo_2"}},[e._v("2.4 Функция GetNewFromAndTo")])])])]),e._v(" "),a("li",[a("a",{attrs:{href:"#Blueprint._.D0.9F.D0.BE.D1.88.D0.B0.D0.B3.D0.BE.D0.B2.D0.BE.D0.B5_.D1.80.D1.83.D0.BA.D0.BE.D0.B2.D0.BE.D0.B4.D1.81.D1.82.D0.B2.D0.BE"}},[e._v("3 Blueprint. Пошаговое руководство")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#.D0.9A.D0.B0.D0.BA_.D0.B7.D0.B0.D0.BF.D1.83.D1.81.D1.82.D0.B8.D1.82.D1.8C_.D0.B0.D0.BD.D0.B8.D0.BC.D0.B0.D1.86.D0.B8.D1.8E"}},[e._v("3.1 Как запустить анимацию")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#.D0.9D.D0.B0.D1.81.D1.82.D1.80.D0.BE.D0.B9.D0.BA.D0.B0_.D0.B0.D0.BD.D0.B8.D0.BC.D0.B0.D1.86.D0.B8.D0.B8"}},[e._v("3.2 Настройка анимации")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#.D0.97.D0.B0.D0.B2.D0.B5.D1.80.D1.88.D0.B5.D0.BD.D0.B8.D0.B5_.D0.B0.D0.BD.D0.B8.D0.BC.D0.B0.D1.86.D0.B8.D0.B8"}},[e._v("3.3 Завершение анимации")])])])]),e._v(" "),a("li",[a("a",{attrs:{href:"#.D0.97.D0.B0.D0.B2.D0.B5.D1.80.D1.88.D0.B5.D0.BD.D0.B8.D0.B5_.D1.80.D0.B0.D0.B1.D0.BE.D1.82.D1.8B"}},[e._v("4 Завершение работы")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#.D0.A0.D1.83.D1.81.D1.81.D0.BA.D0.BE.D0.B5_.D1.81.D0.BE.D0.BE.D0.B1.D1.89.D0.B5.D1.81.D1.82.D0.B2.D0.BE_Unreal_Engine_4"}},[e._v("5 Русское сообщество Unreal Engine 4")])])]),e._v(" "),a("h2",{attrs:{id:"введение"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#введение"}},[e._v("#")]),e._v(" Введение")]),e._v(" "),a("p",[e._v("Цель данного урока в том, чтобы иметь гибкую систему произвольных движений(анимаций). Кроме того, вы можете сделать переменную скорость в зависимости от угла поворота и движений; каждый из которых имеет собственную скорость.")]),e._v(" "),a("p",[e._v("Эта анимация предназначена для бесконечного цикла(повторений) - после окончания анимации, она вернется к началу. Это моя первая работа с blueprint, если есть более оптимальный способ реализации - сообщите. "),a("a",{attrs:{href:"/File:MoveAndRotate.gif"}},[a("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/8/82/MoveAndRotate.gif",alt:"MoveAndRotate.gif"}})])]),e._v(" "),a("h2",{attrs:{id:"начаnо-работы-с-blueprint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#начаnо-работы-с-blueprint"}},[e._v("#")]),e._v(" Начало работы с Blueprint")]),e._v(" "),a("ol",[a("li",[e._v("Создайте какой нибудь прямоугольник, или объект, например, самурайский меч;")]),e._v(" "),a("li",[e._v("Сконвертируйте ваш объект в static mesh;")]),e._v(" "),a("li",[e._v("Создайте blueprint-скрипт и назовите, как вам удобно;")]),e._v(" "),a("li",[e._v("Добавьте ваш объект в blueprint, как компонент;")]),e._v(" "),a("li",[e._v("Создайте новые переменные и функции")])]),e._v(" "),a("h3",{attrs:{id:"переменные"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#переменные"}},[e._v("#")]),e._v(" Переменные")]),e._v(" "),a("p",[e._v("SecondsPerRot (editable, default = 1)")]),e._v(" "),a("p",[e._v("SecondsPerMove (editable, default = 1)")]),e._v(" "),a("p",[e._v("Rotations (Rotation array, editable)")]),e._v(" "),a("p",[e._v("Movements (Vector array, editable, show 3d widget)")]),e._v(" "),a("p",[e._v("MovementsWorld (Vector array)")]),e._v(" "),a("p",[e._v("InitialLocation (Vector)")]),e._v(" "),a("p",[e._v("RotFrom (int)")]),e._v(" "),a("p",[e._v("RotTo (int, default = 1)")]),e._v(" "),a("p",[e._v("MoveFrom (int)")]),e._v(" "),a("p",[e._v("MoveTo (int, default = 1)")]),e._v(" "),a("p",[e._v("fNewFrom (int)")]),e._v(" "),a("p",[e._v("fNewTo (int)")]),e._v(" "),a("h3",{attrs:{id:"ограничения"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ограничения"}},[e._v("#")]),e._v(" Ограничения")]),e._v(" "),a("ol",[a("li",[e._v('Щелкните правой кнопкой мыши в вашем графике событий и введите "добавить ограничения"("add timeline") и дать ему название «TimelineMovement".')]),e._v(" "),a("li",[e._v('Щелкните правой кнопкой мыши в вашем графике событий и введите "добавить ограничения"("add timeline") и дать ему название «TimelineRotations".')]),e._v(" "),a("li",[e._v("Для настройки ограничения кликните дважды по значку события, добавьте два ключевых события(shift + нажатие): (0,0) и (1,1);")]),e._v(" "),a("li",[e._v("Подробнее об timelines вы можете узнать в "),a("a",{attrs:{href:"https://docs.unrealengine.com/latest/INT/Engine/Blueprints/UserGuide/Timelines/index.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("офф. документации"),a("OutboundLink")],1)])]),e._v(" "),a("h3",{attrs:{id:"функция-getnewfromandto"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#функция-getnewfromandto"}},[e._v("#")]),e._v(" Функция GetNewFromAndTo")]),e._v(" "),a("p",[e._v('Create a new function in this blueprint. Set it\'s "Access Specifier" and its Inputs and Outputs per the screenshot below.')]),e._v(" "),a("p",[a("a",{attrs:{href:"/File:Bp_animate5.JPG"}},[a("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/e/eb/Bp_animate5.JPG",alt:"Bp animate5.JPG"}})])]),e._v(" "),a("p",[e._v('In the end you should have something like this. "Blade" below is my static mesh component, yours will be different.')]),e._v(" "),a("p",[a("a",{attrs:{href:"/File:Bp_vars.JPG"}},[a("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/4/4c/Bp_vars.JPG",alt:"Bp vars.JPG"}})])]),e._v(" "),a("h3",{attrs:{id:"функция-getnewfromandto-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#функция-getnewfromandto-2"}},[e._v("#")]),e._v(" Функция GetNewFromAndTo")]),e._v(" "),a("p",[e._v('For lack of a better name I choose to name it this. Feel free to change it. Why is this a function? Because we need it twice, once for the movement and once for the rotations. I loathe duplicating code and feel the same when blueprinting. "DRY it up"...."don\'t repeat yourself" if you can help it and make functions in your blueprints! However, at this point in time I think Blueprint functions lack the proper feature to have variables scoped in their own function with the same user interface (get/set) like any other blueprint event graph variable.')]),e._v(" "),a("p",[e._v('That\'s why we have the hack variables "fNewFrom" and "fNewTo". Without these we would have to use the "Local Variables" that you see in a function, and to be honest they seem very lacking right now. These are hack variables because they are exposed outside of our function and we may accidentally edit them. Also, there could be a possibility that the finish event of our two timelines collide over these (although doubtful unless timelines are multithreaded?). '),a("a",{attrs:{href:"/File:Bp_animate6.JPG"}},[a("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/d/de/Bp_animate6.JPG",alt:"Bp animate6.JPG"}})])]),e._v(" "),a("h2",{attrs:{id:"blueprint-пошаговое-руководство"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#blueprint-пошаговое-руководство"}},[e._v("#")]),e._v(" Blueprint. Пошаговое руководство")]),e._v(" "),a("h3",{attrs:{id:"как-запустить-анимацию"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#как-запустить-анимацию"}},[e._v("#")]),e._v(" Как запустить анимацию")]),e._v(" "),a("p",[e._v("As you can see below, this blueprint can function with it's defualts. There will be no animations unless the level designer has added elements to the editable Movements and Rotations arrays. Also, we set the initial location which you will see why next. "),a("a",{attrs:{href:"/File:Bp_animate1.JPG"}},[a("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/2/21/Bp_animate1.JPG",alt:"Bp animate1.JPG"}})])]),e._v(" "),a("h3",{attrs:{id:"настройка-анимации"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#настройка-анимации"}},[e._v("#")]),e._v(" Настройка анимации")]),e._v(" "),a("p",[e._v('Our two Branch nodes in the above screenshot take these two paths in the screenshot below respectively. Before we setup our animations I need to point something out. All the elements that get added to the "Movements" array by the level designer will be converted to world space. So it\'s important that when they get created in the editor to do so with the rotation transform at 0,0,0 (if using the 3D widget for each one). Otherwise, the movement animation wont be what was desired. We do this so we can possibly procedurally spawn this blueprint in our level and have the movements be relative to wherever they are spawned.')]),e._v(" "),a("p",[e._v("We have two timelines, one for rotation and one for movement. You can see how we change the play rate of the timelines, wireup the update of the timelines and wire up the finished. The updates lerp and then set the new location or rotation. The real trick is all the "),a("em",[e._v("...to")]),e._v(" and "),a("em",[e._v("...from")]),e._v(" variables. Further down I will show you a function that sets those magic variables for us. "),a("a",{attrs:{href:"/File:Bp_animate2.JPG"}},[a("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/e/eb/Bp_animate2.JPG",alt:"Bp animate2.JPG"}})])]),e._v(" "),a("h3",{attrs:{id:"завершение-анимации"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#завершение-анимации"}},[e._v("#")]),e._v(" Завершение анимации")]),e._v(" "),a("p",[e._v("This is the place were we call our function and set the outputs that will be used in the next time we do our animation. That function below "),a("strong",[e._v("GetNewFromAndTwo")]),e._v(", wraps our movement and rotations array. By wrapping the array we always get a valid index for the next item to animate to. That function is shown in the next section.")]),e._v(" "),a("p",[e._v('1. Create the nodes below, then, wire up the "Finish" of the '),a("strong",[e._v("TimelineRotations")]),e._v(' node to the "GetNewFromAndTwo" as seen below.')]),e._v(" "),a("p",[a("a",{attrs:{href:"/File:Bp_animate3.JPG"}},[a("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/f/f4/Bp_animate3.JPG",alt:"Bp animate3.JPG"}})])]),e._v(" "),a("p",[e._v('2. Create the nodes below, then, wire up the "Finish" of the '),a("strong",[e._v("TimelineMovement")]),e._v(' node to the "GetNewFromAndTwo" as seen below.')]),e._v(" "),a("p",[a("a",{attrs:{href:"/File:Bp_animate4.JPG"}},[a("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/d/d0/Bp_animate4.JPG",alt:"Bp animate4.JPG"}})])]),e._v(" "),a("h2",{attrs:{id:"завершение-работы"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#завершение-работы"}},[e._v("#")]),e._v(" Завершение работы")]),e._v(" "),a("p",[e._v("Here are the settings I used that you see in the animated gif above after I placed this blueprint into my level. And after that is the thumb for the full blueprint in all it's glory. If you know of a better way to implement this please do let me know as it was a learning process for me.")]),e._v(" "),a("p",[a("a",{attrs:{href:"/File:Bp_animate7.JPG"}},[a("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/6/69/Bp_animate7.JPG/180px-Bp_animate7.JPG",alt:""}})])]),e._v(" "),a("p",[a("a",{attrs:{href:"/File:Bp_animate7.JPG",title:"Enlarge"}},[a("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),e._v(" "),a("p",[e._v("Caption text")]),e._v(" "),a("p",[a("a",{attrs:{href:"/File:Bp_animate8.JPG"}},[a("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/e/e7/Bp_animate8.JPG",alt:"Bp animate8.JPG"}})])]),e._v(" "),a("h2",{attrs:{id:"русское-сообщество-unreal-engine-4"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#русское-сообщество-unreal-engine-4"}},[e._v("#")]),e._v(" Русское сообщество Unreal Engine 4")]),e._v(" "),a("p",[a("a",{attrs:{href:"http://ue4.codengine.ru",target:"_blank",rel:"noopener noreferrer"}},[e._v("Русское сообщество Unreal Engine 4"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"http://ue4.codengine.ru/index.php/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A3%D1%80%D0%BE%D0%BA%D0%B8",target:"_blank",rel:"noopener noreferrer"}},[e._v("Уроки по Unreal Engine 4 на Русском"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"http://ue4.codengine.ru/index.php/Blueprint_%D0%90%D0%BD%D0%B8%D0%BC%D0%B0%D1%86%D0%B8%D1%8F_%D0%B2%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B8_%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F",target:"_blank",rel:"noopener noreferrer"}},[e._v("Ссылка на русское сообщество"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v('Retrieved from "'),a("a",{attrs:{href:"https://wiki.unrealengine.com/index.php?title=Blueprint_%D0%90%D0%BD%D0%B8%D0%BC%D0%B0%D1%86%D0%B8%D1%8F_%D0%B2%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B8_%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F&oldid=3999",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://wiki.unrealengine.com/index.php?title=Blueprint_Анимация_вращения_и_движения&oldid=3999"),a("OutboundLink")],1),e._v('"')]),e._v(" "),a("p",[a("a",{attrs:{href:"/Special:Categories",title:"Special:Categories"}},[e._v("Categories")]),e._v(":")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"/Category:Tutorials",title:"Category:Tutorials"}},[e._v("Tutorials")])]),e._v(" "),a("li",[a("a",{attrs:{href:"/Category:Blueprint",title:"Category:Blueprint"}},[e._v("Blueprint")])])]),e._v(" "),a("p",[a("img",{attrs:{src:"https://tracking.unrealengine.com/track.png",alt:""}})])])}),[],!1,null,null,null);t.default=n.exports}}]);