Система частиц в UE 4 - Epic Wiki                     

Система частиц в UE 4
=====================

(Redirected from [Beam Particle (Tutorial) RU](/index.php?title=Beam_Particle_(Tutorial)_RU&redirect=no "Beam Particle (Tutorial) RU"))

**Rate this Article:**

2.50

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_half.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (2 votes)

Approved for Versions:(please verify)

Contents
--------

*   [1 Введение](#.D0.92.D0.B2.D0.B5.D0.B4.D0.B5.D0.BD.D0.B8.D0.B5)
*   [2 Шаг 1. Подготовка \[править\]](#.D0.A8.D0.B0.D0.B3_1._.D0.9F.D0.BE.D0.B4.D0.B3.D0.BE.D1.82.D0.BE.D0.B2.D0.BA.D0.B0_.5B.D0.BF.D1.80.D0.B0.D0.B2.D0.B8.D1.82.D1.8C.5D)
*   [3 Step 2: Add effects. noise](#Step_2:_Add_effects._noise)
*   [4 Шаг 3 источника и назначения](#.D0.A8.D0.B0.D0.B3_3_.D0.B8.D1.81.D1.82.D0.BE.D1.87.D0.BD.D0.B8.D0.BA.D0.B0_.D0.B8_.D0.BD.D0.B0.D0.B7.D0.BD.D0.B0.D1.87.D0.B5.D0.BD.D0.B8.D1.8F)
*   [5 Настройка исходного и целевого параметра луча](#.D0.9D.D0.B0.D1.81.D1.82.D1.80.D0.BE.D0.B9.D0.BA.D0.B0_.D0.B8.D1.81.D1.85.D0.BE.D0.B4.D0.BD.D0.BE.D0.B3.D0.BE_.D0.B8_.D1.86.D0.B5.D0.BB.D0.B5.D0.B2.D0.BE.D0.B3.D0.BE_.D0.BF.D0.B0.D1.80.D0.B0.D0.BC.D0.B5.D1.82.D1.80.D0.B0_.D0.BB.D1.83.D1.87.D0.B0)
*   [6 Note](#Note)
*   [7 Русское сообщество Unreal Engine 4](#.D0.A0.D1.83.D1.81.D1.81.D0.BA.D0.BE.D0.B5_.D1.81.D0.BE.D0.BE.D0.B1.D1.89.D0.B5.D1.81.D1.82.D0.B2.D0.BE_Unreal_Engine_4)

Введение
--------

Система частиц в Unreal Engine - это хорошая вещь, чтобы моделировать такие вещи, как:

*   Лазеры, молнии;
*   Дым, пар, огонь
*   И так далее.

В этой статье вы узнаете о принципах работы с системами частиц в UE 4.

Шаг 1. Подготовка \[править\]
-----------------------------

Во-первых, перед началом работы с частицей; является ли это или последствия того, что оружие (например, лазерные пушки и т.п.) требуется программирования, который выходит за рамки данного руководства. Теперь мы рассмотрим, как работать с ним эффектов. Что бы работать с частицами, мы нуждаемся в такой структуре. Как правило, точнее, как правило, требуется горизонтальная текстуру (например, как на скриншоте). В нашем примере мы создали простой материал, используя следующую структуру:

  

*   [![BaseBeam.png](https://d3ar1piqh1oeli.cloudfront.net/c/c0/BaseBeam.png/120px-BaseBeam.png)](/File:BaseBeam.png)
    
*   [![BeamPulse.png](https://d3ar1piqh1oeli.cloudfront.net/d/de/BeamPulse.png/120px-BeamPulse.png)](/File:BeamPulse.png)
    

Эти текстуры объединены в следующие _'материала'_ :

[![BeamMaterial.jpg](https://d3ar1piqh1oeli.cloudfront.net/1/10/BeamMaterial.jpg/940px-BeamMaterial.jpg)](/File:BeamMaterial.jpg)

После того как мы добавить этот пункт в новой системе частиц, мы готовы сосредоточиться на пучок частиц (на наших Пучко-образных частиц). Для начала, нам нужно добавить модуль луч. (Щелкните правой кнопкой мыши в _'эмиттер'_ и select_TypeData_ \> _New-Beam Data_ . Модуль Beam TypeData щелкнув правой кнопкой мыши в эмиттере и выбор TypeData> Нью-Beam данных.

[![AddBeamData.jpg](https://d26ilriwvtzlb.cloudfront.net/5/52/AddBeamData.jpg)](/File:AddBeamData.jpg)

Это, чтобы создать наш луч. Для дальнейшей настройки, что бы получить что-то интересное. Используйте следующую таблицу, чтобы начать с того, что будет более подробное исследование пучка частиц.

Module Properties

property

value

description

Lifetime Module

Lifetime

0.0

The life span of the beam. (Default is infinite)

Beam Data Module

Beam Method

PEB2M\_Distance

The beam will be calculated via distance along the emitter's X-Axis, rather than requiring a source and target.

Texture Tile Distance

500

Tiles the texture every 500 Unreal Units. Allows animated pulses to show more clearly.

Max Beam Count

3

Adds in a few more beams, which will look nice once we have noise.

Speed

0

Beam will travel instantly to its target.

Interpolation Points

50

Gives the beam some flexibility for the addition of noise, which we will do later.

Distance

1000

Extends the beam 1000 Unreal Units along the X-Axis, giving us something to work with.

Once you have set up the beam. Your beam will look like this:

[![DistanceBeam.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3d/DistanceBeam.jpg)](/File:DistanceBeam.jpg)

Step 2: Add effects. noise
--------------------------

Ваше луч может быть более интересным, вы можете добавить немного шума - искажение. Это делается с помощью модуля _'Noise'_ . Он расположен в подменю _Луч_ \> _Шум_ .

[![AddNoiseModule.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3d/AddNoiseModule.jpg)](/File:AddNoiseModule.jpg)

Используйте следующую таблицу, чтобы изменить различные свойства:

Module Properties

Properties

Values

Descriptions

Frequency

30

Gives us a nice amount of noise. Adjust to taste.

Low Freq Enabled

Checked

Enables randomization of noise points.

Noise Range

Vector Uniform distribution. Min:( 0, -50, -50) Max:( 0, 50, 50)

Tells the noise how far it can move away from the beam.

Noise Tessellation

10

Smoothes out the noise.

Frequency Distance

100

Rounds out the shape of the noise.

Вот пример результат нашей работы.

[![NoisyBeam.jpg](https://d26ilriwvtzlb.cloudfront.net/9/99/NoisyBeam.jpg)](/File:NoisyBeam.jpg)

Используйте различные свойств и их значений, которые диверсификации вашу работу.

  

Шаг 3 источника и назначения
----------------------------

Если вы хотите, что бы ваша пучок имел разную длину вдоль одной оси, эта часть урока для вас.

[![DistanceBeamInLevel.jpg](https://d26ilriwvtzlb.cloudfront.net/5/55/DistanceBeamInLevel.jpg)](/File:DistanceBeamInLevel.jpg)

К сожалению, этот способ не всегда хорошо; В некоторых случаях, вам нужно будет указать начальную и конечную точки, а также контролировать процесс между ними. Это можно сделать с помощью «захвата цели» (источник и цель).

Для начала, мы добавили двух актеров на сцене, что бы они быть использованы в качестве начальных и конечных положениях. В этом случае, мы будем использовать _Замечание актеров._

[![NotesAdded.jpg](https://d26ilriwvtzlb.cloudfront.net/7/75/NotesAdded.jpg)](/File:NotesAdded.jpg)

Вернуться к Cascade, добавьте _Источник_ модуля i_Target_ для вашей излучателя. Они оба в суб-луча.

[![SourceAndTargetModules.jpg](https://d26ilriwvtzlb.cloudfront.net/6/63/SourceAndTargetModules.jpg)](/File:SourceAndTargetModules.jpg)

Модули Тип луча данных, источник и цель, установите следующие параметры:

Module Properties

Property

Value

Reason

Beam Data Module

Beam Method

PEB2M\_Target

Extablishes that the beam will require a source and a target.

Source Module

Source Method

PEB2STM\_Actor

Tells the beam to start at the location of an actor.

Source Name

BeamSource

Tells the beam to start at the location of an actor.

Source

Vector Constant Distribution. Value:(0, 0, 0)

This sets the display source in the Preview window to be 0,0,0.

Target Module

Target Method

PEB2STM\_Actor

Tells the beam to end at the location of an actor.

Target Name

BeamTarget

This is just a parameter name and can be anything you like.

Target

Vector Constant Distribution. Value:(1000, 0, 0)

This sets the display target in the Preview window to be 1000,0,0.

Ваше луч не изменится, но теперь он будет иметь начальную и конечную точки луча - сегмент.

Настройка исходного и целевого параметра луча
---------------------------------------------

Чтобы луч использовать Note actor, как источник и цель, мы должны установить их в качестве параметров, например, для эмиттера актера. После того, как вы принесли эмиттер луча на сцену, выполните следующие действия:

*   Настройте 2 параметра экземпляра на эмиттере актора. Назовите BeamSource и BeamTarget.
*   Установка и их Тип в _PSPT\_Actor_.
*   Установите один из Note Actor в поле Actor каждого параметра.

Когда закончите, ваша панель должна выглядеть примерно так:

[![InstanceParameters.jpg](https://d26ilriwvtzlb.cloudfront.net/3/38/InstanceParameters.jpg)](/File:InstanceParameters.jpg)

Ваш луч в настоящее время движется между двумя Note actor-ами:

[![Beamnotes.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c9/Beamnotes.jpg)](/File:Beamnotes.jpg)

Note
----

Вы можете сделать намного интереснее, чем балки, регулируя касательные источника и цели.

[![TangentBeam.jpg](https://d26ilriwvtzlb.cloudfront.net/6/6b/TangentBeam.jpg)](/File:TangentBeam.jpg)

Русское сообщество Unreal Engine 4
----------------------------------

[Русское сообщество Unreal Engine 4](http://ue4.codengine.ru)

[Уроки по Unreal Engine 4 на Русском](http://ue4.codengine.ru/index.php/%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A3%D1%80%D0%BE%D0%BA%D0%B8)

[Ссылка на русское сообщество](http://ue4.codengine.ru/index.php/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D1%87%D0%B0%D1%81%D1%82%D0%B8%D1%86_%D0%B2_UE_4)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Система\_частиц\_в\_UE\_4&oldid=20700](https://wiki.unrealengine.com/index.php?title=Система_частиц_в_UE_4&oldid=20700)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Уроки](/Category:%D0%A3%D1%80%D0%BE%D0%BA%D0%B8 "Category:Уроки")
*   [Программирование](/index.php?title=Category:%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5&action=edit&redlink=1 "Category:Программирование (page does not exist)")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Native](/index.php?title=Category:Native&action=edit&redlink=1 "Category:Native (page does not exist)")
*   [Particle](/Category:Particle "Category:Particle")
*   [Русское сообщество](/Category:%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%BE%D0%B5_%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BE "Category:Русское сообщество")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)