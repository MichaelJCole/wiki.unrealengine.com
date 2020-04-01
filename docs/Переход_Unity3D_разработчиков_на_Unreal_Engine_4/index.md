Переход Unity3D разработчиков на Unreal Engine 4 - Epic Wiki                    

Переход Unity3D разработчиков на Unreal Engine 4
================================================

Contents
--------

*   [1 Общее](#.D0.9E.D0.B1.D1.89.D0.B5.D0.B5)
*   [2 Ключевые понятия](#.D0.9A.D0.BB.D1.8E.D1.87.D0.B5.D0.B2.D1.8B.D0.B5_.D0.BF.D0.BE.D0.BD.D1.8F.D1.82.D0.B8.D1.8F)
    *   [2.1 Игровая логика](#.D0.98.D0.B3.D1.80.D0.BE.D0.B2.D0.B0.D1.8F_.D0.BB.D0.BE.D0.B3.D0.B8.D0.BA.D0.B0)
        *   [2.1.1 Unity](#Unity)
        *   [2.1.2 Unreal Engine 4](#Unreal_Engine_4)
    *   [2.2 Начало игры](#.D0.9D.D0.B0.D1.87.D0.B0.D0.BB.D0.BE_.D0.B8.D0.B3.D1.80.D1.8B)
        *   [2.2.1 Unity](#Unity_2)
        *   [2.2.2 Unreal Engine 4](#Unreal_Engine_4_2)
    *   [2.3 Сцена](#.D0.A1.D1.86.D0.B5.D0.BD.D0.B0)
        *   [2.3.1 Unity3D](#Unity3D)
        *   [2.3.2 Unreal Engine4](#Unreal_Engine4)
    *   [2.4 Объекты сцены](#.D0.9E.D0.B1.D1.8A.D0.B5.D0.BA.D1.82.D1.8B_.D1.81.D1.86.D0.B5.D0.BD.D1.8B)
        *   [2.4.1 Unity](#Unity_3)
        *   [2.4.2 Unreal Engine 4](#Unreal_Engine_4_3)
    *   [2.5 События ввода](#.D0.A1.D0.BE.D0.B1.D1.8B.D1.82.D0.B8.D1.8F_.D0.B2.D0.B2.D0.BE.D0.B4.D0.B0)
        *   [2.5.1 Unity](#Unity_4)
        *   [2.5.2 Unreal Engine 4](#Unreal_Engine_4_4)
    *   [2.6 Вывод в консоль (log)](#.D0.92.D1.8B.D0.B2.D0.BE.D0.B4_.D0.B2_.D0.BA.D0.BE.D0.BD.D1.81.D0.BE.D0.BB.D1.8C_.28log.29)
        *   [2.6.1 Unity](#Unity_5)
        *   [2.6.2 Unreal Engine 4](#Unreal_Engine_4_5)
*   [3 Главные классы и функции](#.D0.93.D0.BB.D0.B0.D0.B2.D0.BD.D1.8B.D0.B5_.D0.BA.D0.BB.D0.B0.D1.81.D1.81.D1.8B_.D0.B8_.D1.84.D1.83.D0.BD.D0.BA.D1.86.D0.B8.D0.B8)
    *   [3.1 Основные типы данных](#.D0.9E.D1.81.D0.BD.D0.BE.D0.B2.D0.BD.D1.8B.D0.B5_.D1.82.D0.B8.D0.BF.D1.8B_.D0.B4.D0.B0.D0.BD.D0.BD.D1.8B.D1.85)
    *   [3.2 Продвинутые типы данных](#.D0.9F.D1.80.D0.BE.D0.B4.D0.B2.D0.B8.D0.BD.D1.83.D1.82.D1.8B.D0.B5_.D1.82.D0.B8.D0.BF.D1.8B_.D0.B4.D0.B0.D0.BD.D0.BD.D1.8B.D1.85)
    *   [3.3 Функции](#.D0.A4.D1.83.D0.BD.D0.BA.D1.86.D0.B8.D0.B8)
    *   [3.4 Компоненты](#.D0.9A.D0.BE.D0.BC.D0.BF.D0.BE.D0.BD.D0.B5.D0.BD.D1.82.D1.8B)
    *   [3.5 Статические данные](#.D0.A1.D1.82.D0.B0.D1.82.D0.B8.D1.87.D0.B5.D1.81.D0.BA.D0.B8.D0.B5_.D0.B4.D0.B0.D0.BD.D0.BD.D1.8B.D0.B5)
    *   [3.6 Спавн](#.D0.A1.D0.BF.D0.B0.D0.B2.D0.BD)
        *   [3.6.1 Unity3D](#Unity3D_2)
        *   [3.6.2 Unreal Engine4](#Unreal_Engine4_2)
*   [4 #includes](#.23includes)
    *   [4.1 ParticleDefinitions.h](#ParticleDefinitions.h)

Общее
-----

Это руководство создано для людей, которые пришли с Unity3D и C # и хотят перейти на Unreal Engine 4 и C++. Это руководство предполагает, что вы понимаете, как работает Unreal Editor включая такие вещи, как импорт и экспорт, чертежи \[Blueprints\], настройки мира, настройки проекта и многое другое. Здесь будут рассмотрены ключевые понятия Unreal Engine 4 и как они соотносятся с Unity3D.  
ПРИМЕЧАНИЯ АВТОРА: Тут я складываю все полезные связи, которые я нашел в процессе изучения движка. А потом пользуюсь этой статьей как кратким руководством сходств и отличий.  
  

Ключевые понятия
================

Игровая логика
--------------

##### Unity

Игровая логика описывается с использованием среды Mono. Игровые скрипты манипулируют игровыми объектами \[GameObject\]. Игровые объекты могут иметь несколько игровых скриптов или вообще ни одного.

##### Unreal Engine 4

Игровая логика описывается с использованием C++ и/или редактора чертежей \[Blueprint Editor\]. Классы C++ и чертежи управляют актерами \[Actors\] сцены. Чертежи похожи на префабы \[Prefabs\] Unity. Чертежи представляют собой родительский класс, интерфейсы и любые компоненты, которые вы добавляете через редактор чертежей, а так же единую логику поведения чертежа. Обычно игру представляют набором функциональных систем написанных на C++, однако поскольку классы можно описывать через систему чертежей, то всю второстепенную функциональность игры можно полностью описать чертежами.  
  

Начало игры
-----------

##### Unity

По умолчанию загружается уровень с индексом 0. Будучи однажды загруженными, все скрипты (по регламентированной очередности) вызывают несколько специальных методов класса, такие как Awake, Start, OnEnable, и т.д...

##### Unreal Engine 4

Уровень загружаемый по умолчанию можно обозначить (Edit > Project Settings > Maps & Modes). Каждый уровень имеет класс настроек мира \[WorldSettings\], поля которого можно изменять в редакторе. Используя эти поля создается класс UWorld, который создает объект GameMode в сцене. Объекты GameMode используются для создания объектов PlayerController, менеджеров и других, используемых в игре.

Замечание: (Edit > Project Settings > Maps & Modes) Секция Default Modes позволяет установить класс GameMode по умолчанию, которым будут пользоваться все уровни которым явно не назначено иное.

Стартовая точка игры - конструктор класса GameMode (или его наследника).  
  

Сцена
-----

Принцип сцены в обоих движках идентичен. Однако Unity3D и UE4 имеют разные направления координатных осей.

##### Unity3D

Ось Y направлена вверх.

*   X - влево, вправо
*   Y - вверх, вниз
*   Z - вперед, назад

Формат файла: \*.scene

Используются статические методы класса GameObject для операции с объектами на сцене (find, spawn, destroy)

Загрузка сцены: Application.LoadLevel(string name);

##### Unreal Engine4

Ось Z направлена вверх.

*   X - вперед, назад
*   Y - влево, вправо
*   Z - вверх, вниз

UE4 дает осям вращение иное наименование (в отличии от координатных): Roll, Pitch и Yaw.

Формат файла: \*.umap

Используются методы класса UWorld для операции с объектами на сцене (find, spawn, destroy). Можно получить экземпляр UWorld используя функцию GetWorld() класса PlayerController.

Загрузка сцены: GetWorld()->ServerTravel(string URL);

URL – путь к сцене, который может содержать дополнительные параметры. Например: "/Game/Maps/<map\_name>?<key\_1>=<value\_1>&<key\_2>=<value\_2>"

Чтение параметров в коде: (GameMode class) GetIntOption(OptionsString, <key\_1>, <default\_value>);  
  

Объекты сцены
-------------

##### Unity

Базовый объект сцены – GameObject.

Объекты GameObject являются контейнерами для других компонентов \[Components\]. По умолчанию всегда снабжается компонентом Transform. Компоненты добавляются, что бы внести в объект GameObject новую функциональность.

Объекты GameObject поддерживают иерархию (родительский объект -> дочерние объекты).

##### Unreal Engine 4

Базовый объект сцены - Actor.

Сам по себе Actor не содержит компонентов USceneComponent. Actor это просто базовый объект, который может быть представлен в сцене. Компоненты добавляются, что бы внести в объект Actor новую функциональность.

Объекты Actor поддерживают иерархию (родительский объект -> дочерние объекты).

Программисты могут наследоваться от UActorComponent для создания своих компонентов.

Пример создания компонента:

TSubobjectPtr<USceneComponent\> SceneComponent \= PCIP.CreateDefaultSubobject<USceneComponent\>(this, TEXT("SceneComp"));
RootComponent \= SceneComponent;

  
  

События ввода
-------------

##### Unity

Единый класс обрабатывающий пользовательский ввод

Input.GetAxis("MoveForward");
Input.GetTouch(0);

##### Unreal Engine 4

Компонент UInputComponent висящий на объекте Actor

InputComponent\-\>BindAxis("MoveForward", this, &AFirstPersonBaseCodeCharacter::MoveForward);
InputComponent\-\>BindTouch(EInputEvent::IE\_Pressed, this, &AStrategyPlayerController::OnTapPressedMy);
...
void AStrategyPlayerController::OnTapPressedMy(ETouchIndex::Type index, FVector ScreenPosition)
{
}

  
  

Вывод в консоль (log)
---------------------

##### Unity

Debug.Log("Log text " + (0.1f).ToString());
Debug.LogWarning("Log warning");
Debug.LogError("Log error");

##### Unreal Engine 4

GEngine\-\>AddOnScreenDebugMessage(\-1, 5.f, FColor::Red, TEXT("This is an on screen message!"));
UE\_LOG(LogTemp, Log, TEXT("Log text %f"), 0.1f);
UE\_LOG(LogTemp, Warning, TEXT("Log warning"));
UE\_LOG(LogTemp, Error, TEXT("Log error"));
FError::Throwf(TEXT("Log error"));
FMessageDialog::Open(EAppMsgType::Ok, FText::FromString(TEXT("Dialog message")));

Подробнее: [Wiki Entry on logging](/Logs,_Printing_Messages_To_Yourself_During_Runtime "Logs, Printing Messages To Yourself During Runtime")  
  

Главные классы и функции
========================

Основные типы данных
--------------------

Unity3D

Unreal Engine4

int

int32, int24, int8

string

FString

Transform

FTransform

Quaternion

FQuat

Rotation

FRotator

Gameobject

Actor

Array

TArray

  

Продвинутые типы данных
-----------------------

Unreal Engine4

Описание

TAssetPtr

Указатель на ресурс, который еще не загружен, но может, если потребуется

TAssetSubclassOf

Указатель на подкласс, который еще не загружен, но может, если потребуется. Используется как указатель на чертежи \[Blueprints\].

  

Функции
-------

Тут представлен список наиболее часто используемых функций, которые любой разработчик Unity C# должен знать и использовать. Соответственно справа указаны идентичные функции UE4

Unity3D

Unreal Engine4

Update()

Tick(), TickComponent()

transform

GetActorTranform(), GetFocalLocation()

transform.position

GetActorTranform().GetLocation()

transform.roation

GetActorTranform().GetRotation()

transform.localScale

GetActorTranform().GetScaled3D()

GetComponent<T>()

FindComponentByClass<T>()

Destroy()

Destroy()

Find()

TObjectIterator<T>(), FActorIterator<T>, ActorItr(GetWorld()),ConstructorHelpers::FObjectFinder<your\_class> object(name)

MathF

FMath

RayCast

Trace

SphereCast

Sweep

  

Компоненты
----------

Unity3D

Unreal Engine4

Transform

USceneComponent

Camera

UCameraComponent

BoxCollider

UBoxComponent

MeshFilter

UStaticMeshComponent

ParticleSystem

UParticleSystemComponent

AudioSource

UAudioComponent

  

Статические данные
------------------

Unreal Engine 4

Описание

UGameplayStatics

Используется для получения таких вещей как players pawn, game mode, singlton, controller, spawn decal, spawn emitter

Спавн
-----

Для создания чего-то в режиме реального времени.

##### Unity3D

**Instantiate()**

Эта функция создает копию объекта, как вызов Duplicate в редактора. Клонируя GameObject вы можете обозначить его новое местоположение. Если вы клонируете компонент, то GameObject которому принадлежит компонент так же клонируется.

##### Unreal Engine4

**UWorld->SpawnActor()**

Процесс создания нового экземпляра Actor называется - спавн \[spawn\]. Спавн объекта Actor производится функцией UWorld::SpawnActor(). Эта функция создает новый экземпляр класса и возвращает указатель на вновьсозданного Actor. UWorld::SpawnActor() может использоваться только для спавна классов, унаследованных от Actor.

  

#includes
=========

Стоит отметить, что все включенное директивой #include в файле "Project.h" распространится на все классы проекта. Однако ваш компилятор может подложить вам свинью, поэтому рекомендуется все-таки делать включения индивидуально для каждого класса.

#### ParticleDefinitions.h

При попытке добавить систему частиц из C++ вы получите ошибку, если не подключите файл "ParticleDefinitions.h" к вашему "class.h".

**.h**

// Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "ParticleDefinitions.h"
#include "ParticleTest.generated.h"
 
UCLASS()
class AParticleTest : public AActor
{
	GENERATED\_UCLASS\_BODY()
 
	UPROPERTY(VisibleAnywhere, Category \= Particle System)
	TSubobjectPtr<UParticleSystemComponent\> ParticleSystem;
};

**.cpp**

// Copyright 1998-2014 Epic Games, Inc. All Rights Reserved.
 
#include "MyProject.h"
#include "ParticleTest.h"
 
 
AParticleTest::AParticleTest(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
	ParticleSystem \= PCIP.CreateDefaultSubobject<UParticleSystemComponent\>(this, FName(TEXT("Particle System")));
	RootComponent \= ParticleSystem;
 
}

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Переход\_Unity3D\_разработчиков\_на\_Unreal\_Engine\_4&oldid=6972](https://wiki.unrealengine.com/index.php?title=Переход_Unity3D_разработчиков_на_Unreal_Engine_4&oldid=6972)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)