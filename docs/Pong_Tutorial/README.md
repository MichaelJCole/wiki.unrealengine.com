Pong Tutorial - Epic Wiki                    

Pong Tutorial
=============

  
**This tutorial was recently finished and due to its length, there may be some grammatical/syntax errors scattered throughout it. If you are going through this and find anything confusing or that you think should be there, please change it! I am certain that I was not able to cover everything.**

Hi everyone. I recently went through the UE4 code base and created a pong game to help myself become familiarized with the Engine. Just a heads up that I am in no way sure that the implementation of this game follows the best practices for development. However, the goal of this tutorial was to implement everything via C++, which I managed. Hopefully by the end of this tutorial you will have a much better feel for working with the Engine in C++ and also a better feel for how awesome blueprints can be.

Contents
--------

*   [1 Creating the Project](#Creating_the_Project)
*   [2 Setting Up the World](#Setting_Up_the_World)
*   [3 Creating the Assets](#Creating_the_Assets)
*   [4 Opening up the Code](#Opening_up_the_Code)
*   [5 Creating the Background](#Creating_the_Background)
    *   [5.1 Background.h](#Background.h)
    *   [5.2 Background.cpp](#Background.cpp)
*   [6 Creating the Other Sprites](#Creating_the_Other_Sprites)
    *   [6.1 Ball.h](#Ball.h)
    *   [6.2 Ball.cpp](#Ball.cpp)
    *   [6.3 Paddle.h](#Paddle.h)
    *   [6.4 Paddle.cpp](#Paddle.cpp)
    *   [6.5 Bounds.h](#Bounds.h)
    *   [6.6 Bounds.cpp](#Bounds.cpp)
    *   [6.7 Goal.h](#Goal.h)
    *   [6.8 Goal.cpp](#Goal.cpp)
*   [7 Creating the GameMode](#Creating_the_GameMode)
    *   [7.1 PongGameMode.h](#PongGameMode.h)
    *   [7.2 PongGameMode.cpp](#PongGameMode.cpp)
*   [8 Initializing the Background/Camera/Paddle/Ball](#Initializing_the_Background.2FCamera.2FPaddle.2FBall)
    *   [8.1 Background](#Background)
        *   [8.1.1 Background.h](#Background.h_2)
        *   [8.1.2 Background.cpp](#Background.cpp_2)
    *   [8.2 PongCamera](#PongCamera)
        *   [8.2.1 PongCamera.h](#PongCamera.h)
        *   [8.2.2 PongCamera.cpp](#PongCamera.cpp)
    *   [8.3 Paddle](#Paddle)
        *   [8.3.1 Paddle.h](#Paddle.h_2)
        *   [8.3.2 Paddle.cpp](#Paddle.cpp_2)
    *   [8.4 Ball](#Ball)
        *   [8.4.1 Ball.h](#Ball.h_2)
        *   [8.4.2 Ball.cpp](#Ball.cpp_2)
    *   [8.5 PongGameMode](#PongGameMode)
        *   [8.5.1 PongGameMode.h](#PongGameMode.h_2)
        *   [8.5.2 PongGameMode.cpp](#PongGameMode.cpp_2)
*   [9 Moving the Paddle](#Moving_the_Paddle)
    *   [9.1 Paddle.h](#Paddle.h_3)
    *   [9.2 Paddle.cpp](#Paddle.cpp_3)
*   [10 Adding Bounds](#Adding_Bounds)
    *   [10.1 Bounds](#Bounds)
        *   [10.1.1 Bounds.h](#Bounds.h_2)
        *   [10.1.2 Bounds.cpp](#Bounds.cpp_2)
    *   [10.2 Background.h](#Background.h_3)
    *   [10.3 Background.cpp](#Background.cpp_3)
    *   [10.4 PongGameMode.h](#PongGameMode.h_3)
    *   [10.5 PongGameMode.cpp](#PongGameMode.cpp_3)
    *   [10.6 Paddle.h](#Paddle.h_4)
    *   [10.7 Paddle.cpp](#Paddle.cpp_4)
*   [11 Creating the GameState](#Creating_the_GameState)
    *   [11.1 PongGameState.h](#PongGameState.h)
    *   [11.2 PongGameState.cpp](#PongGameState.cpp)
    *   [11.3 PongGameMode.h](#PongGameMode.h_4)
    *   [11.4 PongGameMode.cpp](#PongGameMode.cpp_4)
*   [12 Adding Movement to the Ball](#Adding_Movement_to_the_Ball)
    *   [12.1 Ball.h](#Ball.h_3)
    *   [12.2 Ball.cpp](#Ball.cpp_3)
    *   [12.3 Paddle.h](#Paddle.h_5)
    *   [12.4 Paddle.cpp](#Paddle.cpp_5)
    *   [12.5 PongGameState.h](#PongGameState.h_2)
    *   [12.6 PongGameState.cpp](#PongGameState.cpp_2)
*   [13 Goals/Paddle AI](#Goals.2FPaddle_AI)
    *   [13.1 Paddle](#Paddle_2)
        *   [13.1.1 Paddle.h](#Paddle.h_6)
        *   [13.1.2 Paddle.cpp](#Paddle.cpp_6)
    *   [13.2 PaddleAI](#PaddleAI)
        *   [13.2.1 PaddleAI.h](#PaddleAI.h)
        *   [13.2.2 PaddleAI.cpp](#PaddleAI.cpp)
    *   [13.3 Goal](#Goal)
        *   [13.3.1 Goal.h](#Goal.h_2)
        *   [13.3.2 Goal.cpp](#Goal.cpp_2)
    *   [13.4 GameMode](#GameMode)
        *   [13.4.1 PongGameMode.h](#PongGameMode.h_5)
        *   [13.4.2 PongGameMode.cpp](#PongGameMode.cpp_5)
    *   [13.5 GameState](#GameState)
        *   [13.5.1 PongGameState.h](#PongGameState.h_3)
        *   [13.5.2 PongGameState.cpp](#PongGameState.cpp_3)
*   [14 Creating the HUD / Finishing up](#Creating_the_HUD_.2F_Finishing_up)
    *   [14.1 Pong HUD](#Pong_HUD)
        *   [14.1.1 PongHUD.h](#PongHUD.h)
        *   [14.1.2 PongHUD.cpp](#PongHUD.cpp)
    *   [14.2 Paddle.h](#Paddle.h_7)
    *   [14.3 Paddle.cpp](#Paddle.cpp_7)
    *   [14.4 PaddleAI.h](#PaddleAI.h_2)
    *   [14.5 PaddleAI.cpp](#PaddleAI.cpp_2)
    *   [14.6 Ball.h](#Ball.h_4)
    *   [14.7 Ball.cpp](#Ball.cpp_4)
    *   [14.8 PongGameState.h](#PongGameState.h_4)
    *   [14.9 PongGameState.cpp](#PongGameState.cpp_4)
*   [15 Finished](#Finished)
*   [16 All Source Files](#All_Source_Files)

Creating the Project
--------------------

So, this tutorial is being written for version 4.8.0 of the Engine. If you are using an older version, I would recommend upgrading to the latest.

1.  Launch the Engine
2.  Click on New Project
3.  Select Blueprint -> Blank - We just want to start with a completely empty project
4.  Target Desktop/Console, Scalable 3D or 2D graphics, and No Starter Content
5.  Select a Location for your project and a name - I used Pong

Setting Up the World
--------------------

1.  Go to the World Outliner in the right hand corner and delete everything under the World - Atmospheric Fog, Floor, Light Source, etc...
2.  Click Save and Save as PongMap

Now we have a completely blank project with nothing in the world. So what is next?

Creating the Assets
-------------------

The Following Assets are needed:

A Paddle

A Background (For the Pong Board)

A Ball

A Goal

A Boundary

So for these, I drew them in paint and made the background transparent. You can download the file here:

[![Pong Assets](https://d26ilriwvtzlb.cloudfront.net/3/37/PongAssets.png)](/File:PongAssets.png "Pong Assets")

Or you can create your own.

Once you have the .png file containing all of the sprites that you are going to use, drag it into the Content part of the Editor and the .png should be loaded in as a texture.

This editor is awesome and allows us to extract the sprites directly from the texture. The editor will handle creating UPaperSprite Objects for us which contain collision/rendering data - how awesome is that?

We are still going to have to modify the collision for the Boundaries however. The collision data for it is that of a filled square but we want a hollow square.

1.  Double click on the Texture
2.  Under Details -> Texture, Expand the Options and for the Filter Select Nearest
3.  Save and close
4.  Right Click on the Texture and Select Sprite Actions -> Extract Sprites
5.  Click Extract. You should now have 5 sprites in your content folder
6.  Right Click on the Content Folder and Select New Folder - Call it Sprites
7.  Drag the five sprites from the Content Folder to the Sprites Folder -> Select Move Here
8.  Rename the black circle to Ball, the black rectangle to Paddle, the large white box to Background, the smaller white rectangle to Goal, and the hollow rectangle to Bounds

Now we have the sprites that we need to work with to make the pong game!

Opening up the Code
-------------------

Okay, lets open up the code so that we can start to work with our sprites.

1.  In the Editor, click on File -> New C++ Class  
    We are going to be creating the background first, so we are going to want to extend the Actor class  
    Make sure to read up on the Terminology here: [https://docs.unrealengine.com/latest/INT/GettingStarted/Terminology/index.html](https://docs.unrealengine.com/latest/INT/GettingStarted/Terminology/index.html)
2.  Select Actor as the Class to extend and give it the name "Background"
3.  Click Create Class  
    Your project should be created now. Visual Studio will open up and there should be two .h and .cpp files under Source/Pong - Pong.cpp and Background.cpp

Before we get started with Creating the background, we are going to be using Paper2D, so we need to first make sure that we are building the Project with that included.

1.  Open Pong/Pong.Build.cs
2.  Add "Paper2D" to the PublicDependency ModuleNames
3.  It should look like this: `PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "Paper2D" });` Paper2D will be added as a dependency now.
4.  Go back into the Editor and select File -> Refresh Visual Studio Project  
    This will update the project so that you can see the Paper2D headers via intellisense.

Creating the Background
-----------------------

So, now we need to get our Background sprite and make it so that the Background Class we created will render the sprite to the screen. In the Unreal Engine, Components are used in order to create a modular way to attach functionality to objects. You can read up on components in the UE4 Documentation here: [https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/Components/index.html](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/Components/index.html)  
Really, the documentation is going to be your friend.

So, we have a Background Actor and we want to assign the Background Sprite that we made to it. So, lets take a look at the API reference to find out if there is any class pre-made for us that will save us a ton of time. Take a look at the Paper2D API reference here: [https://docs.unrealengine.com/latest/INT/API/Plugins/Paper2D/index.html](https://docs.unrealengine.com/latest/INT/API/Plugins/Paper2D/index.html)

You'll notice that if you read the description for each of the Classes in the library, you'll find a UPaperSpriteComponent which is defined as: A component that handles rendering and collision for a single instance of a UPaperSprite asset. This is really nice because we can attach this component to our Actor and have it handle all the rendering and collision. We will want this for each of our sprites (We won't want collision for the background, but we can just disable that).

So, lets create a UPaperSpriteComponent in our Background Class.

1.  Open up Background.h
2.  Add `const FObjectInitializer& ObjectInitializer` into the constructor  
    You can see this constructor defined in the generated.h file included if you are curious.
3.  Add a private variable `class UPaperSpriteComponent* Sprite` We are using the class keyword because we are making a forward declaration so that we don't have to include the header file that defines UPaperSpriteComponent - we will include the header in the .cpp.
4.  You header should look like this:

### Background.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Background.generated.h"
 
UCLASS()
class PONG\_API ABackground : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	ABackground( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
 
private:
 
	//Reference to the Background Sprite
	class UPaperSpriteComponent\* Sprite;
};

Now we want to attach the UPaperSpriteComponent to this Actor in the constructor. We have the Sprite in the header just to have a reference to the Component once we attach it. Now, since we exported the sprites in the editor, there are UPaperSprite objects that are created which we can grab references to.

Also, we can create a default UPaperSpriteComponent and attach it to ABackground through the use of the FObjectInitializer object. We can call the method CreateDefaultSubObject which will attach a SubOject to the Actor and register it. This is doing the same thing as adding a component to an actor via the editor. We are just implementing it in C++.

### Background.cpp

The code for this is as follows, your Background.cpp should look similar to this:

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Background.h"
#include "PaperSpriteComponent.h"
 
// Sets default values
ABackground::ABackground( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Background Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> BackgroundSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Background'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the BackgroundSprite Reference we grabbed
	Sprite\-\>SetSprite( BackgroundSpriteRef.Object );
}
 
// Called when the game starts or when spawned
void ABackground::BeginPlay()
{
	Super::BeginPlay();
 
}
 
// Called every frame
void ABackground::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}

Ok, now we have a background actor that renders to the background sprite we created. Awesome! Lets test it out.

1.  Save all your files and compile in the editor
2.  In the Content Browser, go to C++ Classes/Pong - Your Background class should be shown in here
3.  Drag it out into your world

You should now see your sprite in the world. This sprite is going to be used as the background.

Creating the Other Sprites
--------------------------

We still need to create classes for the other four sprites in the game - The ball and the paddle. The ball is going to be another class that we add which extends Actor - we need it to have a render target and collision.

1.  In the editor, add a C++ class which extends Actor
2.  Name it Ball and click Create class

We also need a class for the paddle. This class is different in that we are going to be controlling it. So, it is going to have to handle input. For this, we want to extend the Pawn class(The pawn class also extends the Actor Class) which is used when we want to create a controllable object in the world. You might think that the Character Class should be used here instead, but that would be used for a sprite that is going to have animations attached to it. The pong paddle is never going to be animating.

1.  in the editor, add a C++ class which extends Pawn
2.  Name it Paddle and click Create class

The Code for the .h and .cpp of each class is below - you may want to try to implement these by yourself before looking at how it is impelemented below to get a better feel for the syntax of the Unreal Engine.

### Ball.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Ball.generated.h"
 
UCLASS()
class PONG\_API ABall : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	ABall( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
private:
 
	//Reference to the Sprite Component which contains the ball sprite
	class UPaperSpriteComponent\* Sprite;
 
};

### Ball.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Ball.h"
#include "PaperSpriteComponent.h"
 
// Sets default values
ABall::ABall( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Ball Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> BallSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Ball'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the BallSprite Reference we grabbed
	Sprite\-\>SetSprite( BallSpriteRef.Object );
}
 
// Called when the game starts or when spawned
void ABall::BeginPlay()
{
	Super::BeginPlay();
 
}
 
// Called every frame
void ABall::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}

### Paddle.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Pawn.h"
#include "Paddle.generated.h"
 
UCLASS()
class PONG\_API APaddle : public APawn
{
	GENERATED\_BODY()
 
public:
	// Sets default values for this pawn's properties
	APaddle( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent\* InputComponent) override;
 
private:
 
	//Reference to the Sprite Component which contains the paddle sprite
	class UPaperSpriteComponent\* Sprite;
 
};

### Paddle.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Paddle.h"
#include "PaperSpriteComponent.h"
 
 
// Sets default values
APaddle::APaddle( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Paddle Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> PaddleSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Paddle'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the PaddleSprite Reference we grabbed
	Sprite\-\>SetSprite( PaddleSpriteRef.Object );
}
 
// Called when the game starts or when spawned
void APaddle::BeginPlay()
{
	Super::BeginPlay();
 
}
 
// Called every frame
void APaddle::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}
 
// Called to bind functionality to input
void APaddle::SetupPlayerInputComponent(class UInputComponent\* InputComponent)
{
	Super::SetupPlayerInputComponent(InputComponent);
 
}

### Bounds.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Bounds.generated.h"
 
UCLASS()
class PONG\_API ABounds : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	ABounds( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
 
private:
 
	//Reference to the Component that holds the Bounds Sprite.
	class UPaperSpriteComponent\* Sprite;
};

### Bounds.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Bounds.h"
#include "PaperSpriteComponent.h"
 
// Sets default values
ABounds::ABounds( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Bounds Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> BoundsSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Bounds'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the BoundsSprite Reference we grabbed
	Sprite\-\>SetSprite( BoundsSpriteRef.Object );
}
 
// Called when the game starts or when spawned
void ABounds::BeginPlay()
{
	Super::BeginPlay();
 
}
 
// Called every frame
void ABounds::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}

### Goal.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Goal.generated.h"
 
UCLASS()
class PONG\_API AGoal : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	AGoal( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
 
private:
 
	//Reference to the Sprite that represents a pong goal area
	class UPaperSpriteComponent\* Sprite;
 
};

### Goal.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Goal.h"
#include "PaperSpriteComponent.h"
 
// Sets default values
AGoal::AGoal( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Goal Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> GoalSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Goal'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the GoalSprite Reference we grabbed
	Sprite\-\>SetSprite( GoalSpriteRef.Object );
 
}
 
// Called when the game starts or when spawned
void AGoal::BeginPlay()
{
	Super::BeginPlay();
 
}
 
// Called every frame
void AGoal::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}

  

Creating the GameMode
---------------------

When we start up our game, we are going to want our own custom GameMode override. This is where we will set the DefaultPawnClass, the GameStateClass, and the HudClass. We can also do some initialization here for the game.

1.  Create a C++ class that extends GameMode, call it PongGameMode
2.  In the constructor set the DefaultPawnClass to APaddle::StaticClass()  
    This is going to make it so that when you start to play the game, APaddle is spawned which will be the default player-controlled object. You'll notice that there are a bunch of different Objects created in the world by default when you hit play. We are going to be creating custom classes for most of these.
3.  We are going to override the StartPlay() function contained in GameMode.h - You should view the header files to get a feel for all the different functions that you can override

### PongGameMode.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/GameMode.h"
#include "PongGameMode.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APongGameMode : public AGameMode
{
	GENERATED\_BODY()
 
public:
	//Constructor where we set the default classes to initialize
	APongGameMode( const FObjectInitializer& ObjectInitializer );
 
	//Function called to spawn our pawn objects into the world
	virtual void StartPlay() override;
};

### PongGameMode.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongGameMode.h"
#include "Paddle.h"
 
 
 
APongGameMode::APongGameMode( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	DefaultPawnClass \= APaddle::StaticClass();
}
 
 
void APongGameMode::StartPlay()
{
 
	Super::StartPlay();
	Super::StartMatch();
}

1.  Save/Compile
2.  In the editor, on the right side under World Settings, Set the GameMode Override to PongGameMode
3.  Save

Now when you hit Play, A Paddle should be spawned into the game. This is because the PongGameMode creates the default Pawn to spawn as the Paddle.

Initializing the Background/Camera/Paddle/Ball
----------------------------------------------

We have a GameMode, Camera, Background, Ball, and Paddle. So now we need to actually spawn all of these actors into our world. To do this, we can make a call `GetWorld()->SpawnActor` We will use this to create the Camera.Background, and the Ball. We will also set the PongCameraActor that we spawn to be our focused view. When we spawn the background, we are also going to want to set it's size to take up the entire view that we are looking at, so we will have to make some functions in the PongCameraActor/Background classes in order to help us do that.

### Background

For the background, we are going to want a way to set the width/height of the background sprite. So, three functions were created to handle doing this - SetHeight, SetWidth, and SetDimensions

#### Background.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Background.generated.h"
 
UCLASS()
class PONG\_API ABackground : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	ABackground( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Set the Width of this sprite
	void SetWidth( float Width );
 
	// Set the Height of this sprite
	void SetHeight( float Height );
 
	// Set the Width and Height of this sprite via a FVector2D
	void SetDimensions( FVector2D& Dimensions );
 
private:
 
	//Reference to the Background Sprite
	class UPaperSpriteComponent\* Sprite;
};

#### Background.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Background.h"
#include "PaperSpriteComponent.h"
 
// Sets default values
ABackground::ABackground( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Background Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> BackgroundSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Background'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the BackgroundSprite Reference we grabbed
	Sprite\-\>SetSprite( BackgroundSpriteRef.Object );
}
 
// Called when the game starts or when spawned
void ABackground::BeginPlay()
{
	Super::BeginPlay();
 
}
 
// Called every frame
void ABackground::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}
 
// Set the Width of this sprite
void ABackground::SetWidth( float Width )
{
	//calculate the new X scale value
	float sourceWidth \= Sprite\-\>GetSprite()\-\>GetSourceSize().X;
	float scale;
 
	//Scale must be > 1 is the sourceWidth < Width and < 1 in the other case
	if ( Width <= sourceWidth )
	{
		scale \= sourceWidth / Width;
	}
	else
	{
		scale \= Width / sourceWidth;
	}
 
	//Update the current scale with the new value
	FVector scaleV \= Sprite\-\>RelativeScale3D;
	scaleV.X \= scale;
	Sprite\-\>SetRelativeScale3D( scaleV );
}
 
// Set the Height of this sprite
void ABackground::SetHeight( float Height )
{
	//calculate the new Z scale value (Camera is orientated so that Z is up/down)
	float sourceHeight \= Sprite\-\>GetSprite()\-\>GetSourceSize().Y;
	float scale;
 
	//Scale must be > 1 is the sourceHeight < Height and < 1 in the other case
	if ( Height <= sourceHeight )
	{
		scale \= sourceHeight / Height;
	}
	else
	{
		scale \= Height / sourceHeight;
	}
 
	//Update the current scale with the new value
	FVector scaleV \= Sprite\-\>RelativeScale3D;
	scaleV.Z \= scale;
	Sprite\-\>SetRelativeScale3D( scaleV );
}
 
//Wrapper around SetHeight and SetWidth for a FVector2D
void ABackground::SetDimensions( FVector2D& Dimensions )
{
	SetWidth( Dimensions.X );
	SetHeight( Dimensions.Y );
}

  

### PongCamera

First, we need to create the class.

1.  Go into the Editor, select New C++ Class
2.  Click the CheckBox for Showing All the Classes
3.  Search for and Select "CameraActor"
4.  Call your new class PongCamera
5.  Create

Since we are making a 2D type of game, we are going to want to use an Orthographic perspective. The reason for this is that we won't have to worry about the depth of the objects too much (In this game, the y-axis is being used to represent the depth)

By extending the CameraActor class, we will default get a CameraComponent constructed onto our Actor. So, we need to run some initialization on this Class. Also, we need to create a function to get the Dimensions that we can use to set our background object. So, lets make this class.

#### PongCamera.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "Camera/CameraActor.h"
#include "PongCamera.generated.h"
 
/\*\*
\*
\*/
UCLASS( )
class PONG\_API APongCamera : public ACameraActor
{
	GENERATED\_BODY( )
 
public:
 
	APongCamera( const FObjectInitializer& ObjectInitializer );
 
	//Get a 2D vector representing the Height/Width of what is being current displayed on the screen
	FVector2D GetViewDimensions();
 
};

#### PongCamera.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongCamera.h"
 
 
APongCamera::APongCamera( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	UCameraComponent\* Camera \= GetCameraComponent();
 
	//Set the Camera To Orthographic.  Also set the Location and Rotation on the Camera: X is left and right, Z is up and down, Y is depth relative to this camera
	Camera\-\>ProjectionMode \= ECameraProjectionMode::Orthographic;
	Camera\-\>SetRelativeLocation( FVector( 0.0f, 100.0f, 0.0f ) );
	Camera\-\>SetRelativeRotation( FRotator( 0.0f, \-90.0f, 0.0f ) );
	Camera\-\>SetAbsolute( true, true, true );
 
}
 
//Get the Dimensions of what our camera can view
FVector2D APongCamera::GetViewDimensions()
{
	UCameraComponent\* Camera \= GetCameraComponent();
	FVector2D dimensions;
 
	//The width is the Orthographic view Width.  Calculate the height from the Aspect ratio and OrthoWidth
	dimensions.X \= Camera\-\>OrthoWidth;
	dimensions.Y \= 1 / ( Camera\-\>AspectRatio / Camera\-\>OrthoWidth );
 
	return dimensions;
}

  

### Paddle

For the ball, all we are going to do is set it up to spawn to the left on the board. We also need to remember that our Background has a location of 0,0,0. So, since we want our Paddle to be visible in front of the board, we are going to set the Y value of the paddle to be greater than that of the Background. In this case, we will just set it to 10.

Now, we could make a function in the paddle to set the starting location based on the background dimensions or the camera view. But, we are not going to worry about that and we are just going to hard-code in some values. If you want to attempt to initialize the paddle on the left hand side via a function call, it would make for a good practice exercise at this point.

#### Paddle.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Pawn.h"
#include "Paddle.generated.h"
 
UCLASS()
class PONG\_API APaddle : public APawn
{
	GENERATED\_BODY()
 
public:
	// Sets default values for this pawn's properties
	APaddle( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent\* InputComponent) override;
 
private:
 
	//Reference to the Sprite Component which contains the paddle sprite
	class UPaperSpriteComponent\* Sprite;
 
};

#### Paddle.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Paddle.h"
#include "PaperSpriteComponent.h"
 
 
// Sets default values
APaddle::APaddle( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Paddle Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> PaddleSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Paddle'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the PaddleSprite Reference we grabbed
	Sprite\-\>SetSprite( PaddleSpriteRef.Object );
}
 
// Called when the game starts or when spawned
void APaddle::BeginPlay()
{
	Super::BeginPlay();
 
	//Set the location of the Paddle to the Left
	Sprite\-\>SetRelativeLocation( FVector( \-200.0f, 10.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.1f, 1.0f, 0.1f ) );
	Sprite\-\>SetAbsolute( true, true, true );
}
 
// Called every frame
void APaddle::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}
 
// Called to bind functionality to input
void APaddle::SetupPlayerInputComponent(class UInputComponent\* InputComponent)
{
	Super::SetupPlayerInputComponent(InputComponent);
 
}

### Ball

For the ball, we are going to spawn it right in the middle of the screen instead of to the left with the paddle. This is a very similar setup.

#### Ball.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Ball.generated.h"
 
UCLASS()
class PONG\_API ABall : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	ABall( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
private:
 
	//Reference to the Sprite Component which contains the ball sprite
	class UPaperSpriteComponent\* Sprite;
 
};

#### Ball.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Ball.h"
#include "PaperSpriteComponent.h"
 
// Sets default values
ABall::ABall( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Ball Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> BallSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Ball'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the BallSprite Reference we grabbed
	Sprite\-\>SetSprite( BallSpriteRef.Object );
}
 
// Called when the game starts or when spawned
void ABall::BeginPlay()
{
	Super::BeginPlay();
 
	//Set the ball to spawn in the middle of the Board and scale its size down
	Sprite\-\>SetRelativeLocation( FVector( 0.0f, 10.0f, 0.0f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.07f, 1.0f, 0.07f ) );
	Sprite\-\>SetAbsolute( true, true, true );
}
 
// Called every frame
void ABall::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}

### PongGameMode

Finally, we are going to actually spawn everything in the GameMode's StartPlay() function. This is where we are going to tie the background and camera together too.

#### PongGameMode.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/GameMode.h"
#include "PongGameMode.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APongGameMode : public AGameMode
{
	GENERATED\_BODY()
 
public:
	//Constructor where we set the default classes to initialize
	APongGameMode( const FObjectInitializer& ObjectInitializer );
 
	//Function called to spawn our pawn objects into the world
	virtual void StartPlay() override;
};

#### PongGameMode.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongGameMode.h"
#include "Paddle.h"
#include "PongCamera.h"
#include "Background.h"
#include "Ball.h"
 
APongGameMode::APongGameMode( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	DefaultPawnClass \= APaddle::StaticClass();
 
}
 
 
void APongGameMode::StartPlay()
{
	Super::StartPlay( );
	UWorld\* const World \= GetWorld();
	if ( World )
	{
		APongCamera\* camera \= World\-\>SpawnActor<APongCamera\>( APongCamera::StaticClass() );
 
		//Camera is set to the CameraActor created
		World\-\>GetFirstPlayerController()\-\>SetViewTarget( camera );
 
		//Set the background to fill up the entire view of the camera
		ABackground\* background \= World\-\>SpawnActor<ABackground\>( ABackground::StaticClass() );
		FVector2D dimensions \= camera\-\>GetViewDimensions();
		background\-\>SetDimensions( dimensions );
 
		//Spawn the Ball into the World
		World\-\>SpawnActor<ABall\>( ABall::StaticClass() );
	}
 
	Super::StartMatch();
}

Play the game and you should see a Pong game in the works! There should be a paddle, a ball, and a background in your view.

Moving the Paddle
-----------------

So, now we need to make it where we can move the paddle up and down. To do this, we are going to bind the up and down arrow keys to call a function within the Paddle class. So, lets set this up.

1.  In the editor, go to Edit -> Project Settings
2.  Under Engine go to Input
3.  Create a new Axis Mapping and Call it "Move"
4.  Create two mappings under the group
5.  For the first one, select the Up key and set the scale to 1.0
6.  For the second one, select the Down Key and set the scale to -1.0
7.  Exit out of the Settings

Go back to Visual Studio and open up Paddle.cpp. We are going to modify this class to handle the input. Now, it may be the case where you want to create your own custom movement component and custom player controller. We are not going to do this because the paddle has very basic movement functionality that can be handled with ease inside the paddle class. I am mentioning this because if you are going to create more complex handling of the Player's will, then you might want your own playercontroller. You can read more on it here: [https://docs.unrealengine.com/latest/INT/Gameplay/Framework/Controller/PlayerController/](https://docs.unrealengine.com/latest/INT/Gameplay/Framework/Controller/PlayerController/)

Ok, now lets bind the input key to our paddle and update the movement of the paddle within the Tick function, please read the comments in the code to see how this is working.

### Paddle.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Pawn.h"
#include "Paddle.generated.h"
 
UCLASS()
class PONG\_API APaddle : public APawn
{
	GENERATED\_BODY()
 
public:
	// Sets default values for this pawn's properties
	APaddle( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent\* InputComponent) override;
 
	// Function called to move the paddle.  Scale represents up/down
	void MovePaddle( float Scale );
 
private:
 
	//Reference to the Sprite Component which contains the paddle sprite
	class UPaperSpriteComponent\* Sprite;
 
};

### Paddle.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Paddle.h"
#include "PaperSpriteComponent.h"
 
 
// Sets default values
APaddle::APaddle( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Paddle Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> PaddleSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Paddle'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the PaddleSprite Reference we grabbed
	Sprite\-\>SetSprite( PaddleSpriteRef.Object );
 
	ObjectInitializer.CreateDefaultSubobject<UPawnMovementComponent\>( this, TEXT( "MovementComp" ) );
}
 
// Called when the game starts or when spawned
void APaddle::BeginPlay()
{
	Super::BeginPlay();
 
	//Set the location of the Paddle to the Left
	Sprite\-\>SetRelativeLocation( FVector( \-200.0f, 10.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.1f, 1.0f, 0.1f ) );
	Sprite\-\>SetAbsolute( true, true, true );
}
 
// Called every frame
void APaddle::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	// Update the sprites location based on the movement input
	FVector move \= GetMovementInputVector();
	FVector location \= GetActorLocation();
	location +\= move\*DeltaTime;
	Sprite\-\>SetRelativeLocation( location );
 
}
 
// Called to bind functionality to input
void APaddle::SetupPlayerInputComponent(class UInputComponent\* InputComponent)
{
	Super::SetupPlayerInputComponent(InputComponent);
 
	const UInputSettings\* settings \= GetDefault<UInputSettings\>( );
 
	//Create movement mappings for upwards and downwards movement, the float value tells if we are moving the paddle up or down
	const FInputAxisKeyMapping upKey("Move", EKeys::Up, 1.0f);
	const FInputAxisKeyMapping downKey( "Move", EKeys::Down, \-1.0f );
 
	// Add the axis mappings
	// Once this code is executed, these mappings will be added in the editors Input Settings!
	((UInputSettings\*)settings)\-\>AddAxisMapping( upKey );
	((UInputSettings\*)settings)\-\>AddAxisMapping( downKey );
 
	// Bind the axis - if we press up, the function is called with 1.0.  if we press down, the function is called with -1.0.
	// if we do nothing, the function is called with 0.0f
	InputComponent\-\>BindAxis( "Move", this, &APaddle::MovePaddle );
 
}
 
void APaddle::MovePaddle( float Scale )
{
	//Add a movement input, hardcoding in 75.0f for the vector
	FVector direction \= FVector( 0.0f, 0.0f, 75.0f );
	GetMovementComponent()\-\>ConsumeInputVector();
	AddMovementInput( direction, Scale );
}

Running this, you'll notice that the paddle moves up and down but there is a problem! It can go straight off the screen. This is the next issue that we'll have to fix.

Adding Bounds
-------------

There are three different bounds that need to be added to the Pong game. Bounds for encompassing the border of the gameboard - you don't want the ball to go off screen ever. Also there need to be bounds for the goals when the pong ball counts as a score for the player or AI.

There are many ways to go about implementing this and I chose to use some sprites in order to handle collisions/overlap events. This seemed like the easiest way to me to create the necessary data to handle collision. Now we are going to go back into some of the classes created earlier and modify them to handle/generate events that we want.

### Bounds

The Bounds Class was modified to have a function to set it's scale (Since the bounds are being generated from a Sprite that is relative to the background Sprite, we want these two Objects to have the same scale). We also want the bounds to be set up for collision correctly. It should Block everything. The position of the Bounds should also be the same as the paddle/ball in the world - This is hardcoded to 50.0 units.

Before we go in and modify the code, we need to set the collision to be correct on the sprite itself.

1.  Go to the Bounds Sprite in the editor and double click on it
2.  Click on Edit Collision
3.  You will notice that the collision is set to be a filled rectangle. We DO NOT want this. In order to fix this, we are going to have to modify the collision data of the sprite.
4.  Under Collision/Collision Shapes on the right hand side, delete the current collision shape, we do not want it
5.  Add Four new collision shapes - Each a rectangle that covers one edge of the sprite. Use the tips in the top-left of the editor for help with how to insert/remove vertices.

Once your finished, your collision is probably not going to be perfect, but it will be decent. You can get a feel for working visually with the collision geometry. Now, lets go edit the Bounds Class.

#### Bounds.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Bounds.generated.h"
 
UCLASS()
class PONG\_API ABounds : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	ABounds( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Set the X,Y, and Z scale for the sprite
	void SetScale( FVector& vector );
 
private:
 
	//Reference to the Component that holds the Bounds Sprite.
	class UPaperSpriteComponent\* Sprite;
};

#### Bounds.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Bounds.h"
#include "PaperSpriteComponent.h"
 
// Sets default values
ABounds::ABounds( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Bounds Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> BoundsSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Bounds'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "Bounds" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the BoundsSprite Reference we grabbed
	Sprite\-\>SetSprite( BoundsSpriteRef.Object );
 
	//Make sure that this component blocks everything
	Sprite\-\>GetBodyInstance()\-\>SetCollisionEnabled( ECollisionEnabled::QueryAndPhysics );
	Sprite\-\>GetBodyInstance()\-\>SetObjectType( ECollisionChannel::ECC\_WorldStatic );
 
	//Don't draw this sprite
	Sprite\-\>SetVisibility( false );
 
}
 
// Called when the game starts or when spawned
void ABounds::BeginPlay()
{
	Super::BeginPlay();
 
	//Set the location of the Bounds to be the same as the paddle - This is just hardcoded to 50 units
	Sprite\-\>SetRelativeLocation( FVector( 0.0f, 50.f, 0.0f ) );
	Sprite\-\>SetAbsolute( true, true, true );
 
	//Ensure that this component's name is "Bounds"
	Rename( TEXT( "Bounds" ) );
}
 
// Called every frame
void ABounds::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}
 
// Set the X,Y, and Z scale for the sprite
void ABounds::SetScale( FVector& vector )
{
	Sprite\-\>SetRelativeScale3D( vector );
}

  
The Background class was also modified to add in an accessor for the Scale. The GameMode was also updated to spawn the bounds.

### Background.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Background.generated.h"
 
UCLASS()
class PONG\_API ABackground : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	ABackground( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Set the Width of this sprite
	void SetWidth( float Width );
 
	// Set the Height of this sprite
	void SetHeight( float Height );
 
	// Set the Width and Height of this sprite via a FVector2D
	void SetDimensions( FVector2D& Dimensions );
 
	// Get the scale
	FVector& GetScale();
 
private:
 
	//Reference to the Background Sprite
	class UPaperSpriteComponent\* Sprite;
};

### Background.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Background.h"
#include "PaperSpriteComponent.h"
 
// Sets default values
ABackground::ABackground( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Background Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> BackgroundSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Background'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the BackgroundSprite Reference we grabbed
	Sprite\-\>SetSprite( BackgroundSpriteRef.Object );
}
 
// Called when the game starts or when spawned
void ABackground::BeginPlay()
{
	Super::BeginPlay();
 
}
 
// Called every frame
void ABackground::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}
 
// Set the Width of this sprite
void ABackground::SetWidth( float Width )
{
	//calculate the new X scale value
	float sourceWidth \= Sprite\-\>GetSprite()\-\>GetSourceSize().X;
	float scale;
 
	//Scale must be > 1 is the sourceWidth < Width and < 1 in the other case
	if ( Width <= sourceWidth )
	{
		scale \= sourceWidth / Width;
	}
	else
	{
		scale \= Width / sourceWidth;
	}
 
	//Update the current scale with the new value
	FVector scaleV \= Sprite\-\>RelativeScale3D;
	scaleV.X \= scale;
	Sprite\-\>SetRelativeScale3D( scaleV );
}
 
// Set the Height of this sprite
void ABackground::SetHeight( float Height )
{
	//calculate the new Z scale value (Camera is orientated so that Z is up/down)
	float sourceHeight \= Sprite\-\>GetSprite()\-\>GetSourceSize().Y;
	float scale;
 
	//Scale must be > 1 is the sourceHeight < Height and < 1 in the other case
	if ( Height <= sourceHeight )
	{
		scale \= sourceHeight / Height;
	}
	else
	{
		scale \= Height / sourceHeight;
	}
 
	//Update the current scale with the new value
	FVector scaleV \= Sprite\-\>RelativeScale3D;
	scaleV.Z \= scale;
	Sprite\-\>SetRelativeScale3D( scaleV );
}
 
//Wrapper around SetHeight and SetWidth for a FVector2D
void ABackground::SetDimensions( FVector2D& Dimensions )
{
	SetWidth( Dimensions.X );
	SetHeight( Dimensions.Y );
}
 
FVector& ABackground::GetScale()
{
	return Sprite\-\>RelativeScale3D;
}

### PongGameMode.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/GameMode.h"
#include "PongGameMode.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APongGameMode : public AGameMode
{
	GENERATED\_BODY()
 
public:
	//Constructor where we set the default classes to initialize
	APongGameMode( const FObjectInitializer& ObjectInitializer );
 
	//Function called to spawn our pawn objects into the world
	virtual void StartPlay() override;
};

### PongGameMode.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongGameMode.h"
#include "Paddle.h"
#include "PongCamera.h"
#include "Background.h"
#include "Ball.h"
#include "Bounds.h"
#include "Goal.h"
 
APongGameMode::APongGameMode( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	DefaultPawnClass \= APaddle::StaticClass();
 
}
 
 
void APongGameMode::StartPlay()
{
	Super::StartPlay( );
	UWorld\* const World \= GetWorld();
	if ( World )
	{
		APongCamera\* camera \= World\-\>SpawnActor<APongCamera\>( APongCamera::StaticClass() );
 
		//Camera is set to the CameraActor created
		World\-\>GetFirstPlayerController()\-\>SetViewTarget( camera );
 
		//Set the background to fill up the entire view of the camera
		ABackground\* background \= World\-\>SpawnActor<ABackground\>( ABackground::StaticClass() );
		FVector2D dimensions \= camera\-\>GetViewDimensions();
		background\-\>SetDimensions( dimensions );
 
		//Spawn the Ball into the World
		World\-\>SpawnActor<ABall\>( ABall::StaticClass() );
 
		FVector scale \= background\-\>GetScale();
 
		//Spawn the Bounds into the World
		ABounds\* bounds \= World\-\>SpawnActor<ABounds\>( ABounds::StaticClass() );
		bounds\-\>SetScale( scale );
	}
 
	Super::StartMatch();
}

Finally, we want to make it so that the Paddle is unable to move once it hits the bounds. In order to do this, two booleans will be added to the Paddle header - MoveUp and MoveDown. These will represent when the paddle is able to move up and when the paddle is able to move down. In order to set these values, two functions will need to be overridden - NotifyActorBeginOverlap and NotifyActorEndOverlap. These two functions will be called when the Actor Overlaps with another Actor. In this case, we will be waiting for when the paddle starts to overlap with the bounds and we will force the paddle to stop moving.

### Paddle.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Pawn.h"
#include "Paddle.generated.h"
 
UCLASS()
class PONG\_API APaddle : public APawn
{
	GENERATED\_BODY()
 
public:
	// Sets default values for this pawn's properties
	APaddle( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent\* InputComponent) override;
 
	// Function called to move the paddle.  Scale represents up/down
	void MovePaddle( float Scale );
 
	// Notification when the paddle begins to overlap another Actor
	virtual void NotifyActorBeginOverlap( AActor\* OtherActor ) override;
 
	// Notification when the paddle ends overlap
	virtual void NotifyActorEndOverlap( AActor\* OtherActor ) override;
 
protected:
 
	//Reference to the Sprite Component which contains the paddle sprite
	UPROPERTY( EditAnywhere, BlueprintReadWrite, Category \= Paddle )
	class UPaperSpriteComponent\* Sprite;
 
private:
 
	//Booleans for keeping track of valid movement directions
	bool MoveUp;
	bool MoveDown;
 
};

### Paddle.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Paddle.h"
#include "PaperSpriteComponent.h"
 
 
// Sets default values
APaddle::APaddle( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Paddle Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> PaddleSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Paddle'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the PaddleSprite Reference we grabbed
	Sprite\-\>SetSprite( PaddleSpriteRef.Object );
 
	ObjectInitializer.CreateDefaultSubobject<UPawnMovementComponent\>( this, TEXT( "MovementComp" ) );
 
	//Can initially move in all directions
	MoveUp \= true;
	MoveDown \= true;
 
}
 
// Called when the game starts or when spawned
void APaddle::BeginPlay()
{
	Super::BeginPlay();
 
	//Set the location of the Paddle to the Left
	Sprite\-\>SetRelativeLocation( FVector( \-200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.1f, 1.0f, 0.1f ) );
	Sprite\-\>SetAbsolute( true, true, true );
}
 
// Called every frame
void APaddle::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	// Update the sprites location based on the movement input
	FVector move \= GetMovementInputVector();
	if ( ( MoveUp && move.Z \> 0 ) || ( MoveDown && move.Z < 0 ) )
	{
		FVector location \= GetActorLocation( );
		location +\= move\*DeltaTime;
		Sprite\-\>SetRelativeLocation( location );
	}
 
}
 
// Called to bind functionality to input
void APaddle::SetupPlayerInputComponent(class UInputComponent\* InputComponent)
{
	Super::SetupPlayerInputComponent(InputComponent);
 
	const UInputSettings\* settings \= GetDefault<UInputSettings\>( );
 
	//Create movement mappings for upwards and downwards movement, the float value tells if we are moving the paddle up or down
	const FInputAxisKeyMapping upKey("Move", EKeys::Up, 1.0f);
	const FInputAxisKeyMapping downKey( "Move", EKeys::Down, \-1.0f );
 
	// Add the axis mappings
	// Once this code is executed, these mappings will be added in the editors Input Settings!
	((UInputSettings\*)settings)\-\>AddAxisMapping( upKey );
	((UInputSettings\*)settings)\-\>AddAxisMapping( downKey );
 
	// Bind the axis - if we press up, the function is called with 1.0.  if we press down, the function is called with -1.0.
	// if we do nothing, the function is called with 0.0f
	InputComponent\-\>BindAxis( "Move", this, &APaddle::MovePaddle );
 
	//Set the sprite to generate overlap events for world-static objects -> The Bounds is set to World Static, so this should generate an overlap event now
	Sprite\-\>GetBodyInstance()\-\>SetCollisionEnabled( ECollisionEnabled::QueryAndPhysics );
	Sprite\-\>GetBodyInstance()\-\>SetObjectType( ECollisionChannel::ECC\_Pawn );
	Sprite\-\>GetBodyInstance()\-\>SetResponseToChannel( ECollisionChannel::ECC\_WorldStatic, ECollisionResponse::ECR\_Overlap );
}
 
void APaddle::MovePaddle( float Scale )
{
	//Add a movement input, hardcoding in 75.0f for the vector
	FVector direction \= FVector( 0.0f, 0.0f, 75.0f );
	GetMovementComponent()\-\>ConsumeInputVector();
	AddMovementInput( direction, Scale );
}
 
void APaddle::NotifyActorBeginOverlap( AActor\* OtherActor )
{
	if ( OtherActor\-\>GetName().Equals( "Bounds" ) )
	{
		FVector prev \= GetMovementComponent()\-\>GetLastInputVector();
 
		//If moving into a bound, set the movement in that direction to false
		if ( prev.Z \> 0.0f )
		{
			MoveUp \= false;
		}
		else if ( prev.Z < 0.0f )
		{
			MoveDown \= false;
		}
 
	}
}
 
void APaddle::NotifyActorEndOverlap( AActor\* OtherActor )
{
	if ( OtherActor\-\>GetName().Equals( "Bounds" ) )
	{
		//Out of the bounds so enable all movement inputs
		MoveUp \= true;
		MoveDown \= true;
	}
}

  

Creating the GameState
----------------------

Next, a game state will be added. This is a state machine will handle the custom states that the pong game goes through. Before the game starts and you can move your paddle around, we are going to make it so that you must press the spacebar first. This will be handled in the GameState class as a specific state. We will define custom states in the header of the class.

1.  In the Editor Add a New C++ Class
2.  Select Game State as the Class to Extend
3.  Name the new Class "PongGameState" and Create

Some states that will be added will be as follows:

WAITING\_TO\_START

PUSH\_BALL

PLAYING

UPDATE\_SCORE

These are all personally chosen and you can make whatever you desire. The GameMode will also need to be updated to set this as the default gamestate to use.

### PongGameState.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/GameState.h"
#include "PongGameState.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APongGameState : public AGameState
{
	GENERATED\_BODY()
 
	enum PONG\_STATES
	{
		WAITING\_TO\_START,
		PUSH\_BALL,
		PLAYING,
		UPDATE\_SCORE
	};
 
public:
 
	APongGameState( const FObjectInitializer& ObjectInitializer );
 
	//Tick called every frame
	virtual void Tick( float DeltaTime ) override;
 
private:
 
	//The current state the game is in
	PONG\_STATES CurrentState;
 
};

### PongGameState.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongGameState.h"
 
APongGameState::APongGameState( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	PrimaryActorTick.bCanEverTick \= true;
	CurrentState \= PONG\_STATES::WAITING\_TO\_START;
}
 
 
void APongGameState::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	// If match is in progress, run the custom state machine
	if ( IsMatchInProgress( ) )
	{
		switch ( CurrentState )
		{
		case PONG\_STATES::WAITING\_TO\_START:
			CurrentState \= PONG\_STATES::PUSH\_BALL;
			break;
 
		case PONG\_STATES::PUSH\_BALL:
			CurrentState \= PONG\_STATES::PLAYING;
			break;
 
		case PONG\_STATES::PLAYING:
			break;
 
		case PONG\_STATES::UPDATE\_SCORE:
			CurrentState \= PONG\_STATES::WAITING\_TO\_START;
			break;
 
		default:
			CurrentState \= PONG\_STATES::WAITING\_TO\_START;
			break;
		}
	}
}

### PongGameMode.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/GameMode.h"
#include "PongGameMode.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APongGameMode : public AGameMode
{
	GENERATED\_BODY()
 
public:
	//Constructor where we set the default classes to initialize
	APongGameMode( const FObjectInitializer& ObjectInitializer );
 
	//Function called to spawn our pawn objects into the world
	virtual void StartPlay() override;
};

### PongGameMode.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongGameMode.h"
#include "Paddle.h"
#include "PongCamera.h"
#include "Background.h"
#include "Ball.h"
#include "Bounds.h"
#include "Goal.h"
#include "PongGameState.h"
 
APongGameMode::APongGameMode( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	//Set Default Classes
	DefaultPawnClass \= APaddle::StaticClass();
	GameStateClass \= APongGameState::StaticClass();
}
 
 
void APongGameMode::StartPlay()
{
	Super::StartPlay( );
	UWorld\* const World \= GetWorld();
	if ( World )
	{
		APongCamera\* camera \= World\-\>SpawnActor<APongCamera\>( APongCamera::StaticClass() );
 
		//Camera is set to the CameraActor created
		World\-\>GetFirstPlayerController()\-\>SetViewTarget( camera );
 
		//Set the background to fill up the entire view of the camera
		ABackground\* background \= World\-\>SpawnActor<ABackground\>( ABackground::StaticClass() );
		FVector2D dimensions \= camera\-\>GetViewDimensions();
		background\-\>SetDimensions( dimensions );
 
		//Spawn the Ball into the World
		World\-\>SpawnActor<ABall\>( ABall::StaticClass() );
 
		FVector scale \= background\-\>GetScale();
 
		//Spawn the Bounds into the World
		ABounds\* bounds \= World\-\>SpawnActor<ABounds\>( ABounds::StaticClass() );
		bounds\-\>SetScale( scale );
	}
 
	Super::StartMatch();
}

  

Adding Movement to the Ball
---------------------------

Movement needs to be added to the ball. The ball should start out by shooting off in one direction (Towards the player in this game). In order to do this, the PongGameState class will be modified to cause the ball to shoot off to the left upon reaching the PUSH\_BALL state. Also, collision will have to be updated for the Ball so that it interacts with the paddle and the Bounds correctly.

The Ball needs to generate Hit Events, so physics must be simulated. Direction and Speed need to be kept track of for the ball. When a Hit Event Occurs, the direction should be updated so that the Ball is reflected in the right direction. Not only this, but the ball should also gain some velocity moving up/down if it hits the paddle.

**Note: There may be updates to some classes that I did not catch. I changed quite a few things. Make sure that in all the custom Classes with sprites that you add "RootComponent = Sprite;" in the constructor. I may have changed some of the initialization around for some of the classes as well**

Some changes that need to be made to get this all working are as follows:

Add a accessor for the Z velocity in the paddle class

Add velocity/direction to the Ball class

Add movement updates in the tick function of the Ball class

Override the NotifyHit event in the Ball class to update the direction/velocity

Update the GameState to shoot off the ball - A function will be added to the Ball Class to start movement

  

### Ball.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Ball.generated.h"
 
UCLASS()
class PONG\_API ABall : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	ABall( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Called to start moving the Ball
	void StartMove();
 
	// notify hit
	virtual void NotifyHit( UPrimitiveComponent\* MyComp, AActor\* Other, UPrimitiveComponent\* OtherComp, bool bSelfMoved, FVector HitLocation, FVector HitNormal, FVector NormalImpulse, const FHitResult& Hit ) override;
 
protected:
 
	//Reference to the Sprite Component which contains the ball sprite
	UPROPERTY( EditAnywhere, BlueprintReadWrite, Category \= Ball )
	class UPaperSpriteComponent\* Sprite;
 
private:
 
	//The direction the ball is traveling in
	FVector Direction;
 
	//Velocity of the ball.  How Fast it is travelling. Distance/Time
	float Velocity;
};

### Ball.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Ball.h"
#include "PaperSpriteComponent.h"
#include "Paddle.h"
 
// Sets default values
ABall::ABall( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Ball Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> BallSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Ball'" ) );
 
	//Find the Material we want to set this ball to: Note, you should have created this in the Editor
	//ConstructorHelpers::FObjectFinder<UPhysicalMaterial> BallPhysicsRef( TEXT( "PhysicalMaterial'/Game/Materials/BallMaterial'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the BallSprite Reference we grabbed
	Sprite\-\>SetSprite( BallSpriteRef.Object );
 
	RootComponent \= Sprite;
 
	//Set the physics properties
	//Restrict the translation/rotation axis
	SetActorEnableCollision( true );
	Sprite\-\>SetEnableGravity( false );
	Sprite\-\>SetConstraintMode( EDOFMode::SixDOF );
	Sprite\-\>GetBodyInstance()\-\>bLockXRotation \= true;
	Sprite\-\>GetBodyInstance()\-\>bLockYRotation \= true;
	Sprite\-\>GetBodyInstance()\-\>bLockZRotation \= true;
	Sprite\-\>GetBodyInstance()\-\>bLockXTranslation \= false;
	Sprite\-\>GetBodyInstance()\-\>bLockYTranslation \= true;
	Sprite\-\>GetBodyInstance()\-\>bLockZTranslation \= false;
 
	//Enable Hit Notifies
	Sprite\-\>SetNotifyRigidBodyCollision( true );
 
	//Set the ball to spawn in the middle of the Board and scale its size down
	Sprite\-\>SetRelativeLocation( FVector( 0.0f, 50.0f, 0.0f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.07f, 1.0f, 0.07f ) );
	Sprite\-\>SetAbsolute( true, true, true );
 
	Sprite\-\>SetLinearDamping( 0.0f );
	Sprite\-\>SetSimulatePhysics( true );
 
	Direction \= FVector( 0.0f, 0.0f, 0.0f );
	Velocity \= 0.0f;
}
 
// Called when the game starts or when spawned
void ABall::BeginPlay()
{
	Super::BeginPlay();
}
 
// Called every frame
void ABall::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	//Set a time variable to be < one hundreth of a second
	float time \= (DeltaTime \> 0.01f ? 0.0083f : DeltaTime);
 
	//Update the translation based on the time variable
	FTransform transform \= Sprite\-\>GetRelativeTransform();
	transform.AddToTranslation( Direction \* Velocity \* time );
	Sprite\-\>SetRelativeTransform( transform );
 
}
 
void ABall::StartMove()
{
	// Move the ball via setting the Direction and Velocity
	Direction \= FVector( \-1.0f, 0.0f, 0.0f );
	Velocity \= 250.0f;
}
 
//The Ball has hit something
void ABall::NotifyHit( UPrimitiveComponent\* MyComp, AActor\* Other, UPrimitiveComponent\* OtherComp, bool bSelfMoved, FVector HitLocation, FVector HitNormal, FVector NormalImpulse, const FHitResult& Hit )
{
	//Make sure that the physics velocities are set to 0.  We are keeping track of direction/speed.  We want this hit event so that we can easily mirror the direction
	Sprite\-\>SetAllPhysicsAngularVelocity( FVector( 0.0f, 0.0f, 0.0f ) );
	Sprite\-\>SetAllPhysicsLinearVelocity( FVector( 0.0f, 0.0f, 0.0f ) );
 
	//Mirror the Direction so that we can get the new trajectory of the ball
	Direction \= Direction.MirrorByVector( HitNormal );
 
	//If the ball hits the paddle, add Z velocity to the ball (This can become very fast)
	if ( Other\-\>GetName().Equals( "Paddle" ) )
	{
		APaddle\* paddle \= (APaddle\*)Other;
		Direction.Z +\= (paddle\-\>GetZVelocity() / Velocity);
	}
}

### Paddle.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Pawn.h"
#include "Paddle.generated.h"
 
UCLASS()
class PONG\_API APaddle : public APawn
{
	GENERATED\_BODY()
 
public:
	// Sets default values for this pawn's properties
	APaddle( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent\* InputComponent) override;
 
	// Function called to move the paddle.  Scale represents up/down
	void MovePaddle( float Scale );
 
	// Notification when the paddle begins to overlap another Actor
	virtual void NotifyActorBeginOverlap( AActor\* OtherActor ) override;
 
	// Notification when the paddle ends overlap
	virtual void NotifyActorEndOverlap( AActor\* OtherActor ) override;
 
	// How fast the paddle is moving up or down
	float GetZVelocity();
 
protected:
 
	//Reference to the Sprite Component which contains the paddle sprite
	UPROPERTY( EditAnywhere, BlueprintReadWrite, Category \= Paddle )
	class UPaperSpriteComponent\* Sprite;
 
private:
 
	//Booleans for keeping track of valid movement directions
	bool MoveUp;
	bool MoveDown;
 
	//How fast the paddle is moving
	float Velocity;
 
};

### Paddle.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Paddle.h"
#include "PaperSpriteComponent.h"
 
 
// Sets default values
APaddle::APaddle( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Paddle Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> PaddleSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Paddle'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the PaddleSprite Reference we grabbed
	Sprite\-\>SetSprite( PaddleSpriteRef.Object );
 
	RootComponent \= Sprite;
 
	ObjectInitializer.CreateDefaultSubobject<UPawnMovementComponent\>( this, TEXT( "MovementComp" ) );
 
	//Can initially move in all directions
	MoveUp \= true;
	MoveDown \= true;
 
	//Set the sprite to generate overlap events for world-static objects -> The Bounds is set to World Static, so this should generate an overlap event now
	Sprite\-\>GetBodyInstance()\-\>SetCollisionEnabled( ECollisionEnabled::QueryAndPhysics );
	Sprite\-\>GetBodyInstance()\-\>SetObjectType( ECollisionChannel::ECC\_Pawn );
	Sprite\-\>GetBodyInstance()\-\>SetResponseToChannel( ECollisionChannel::ECC\_WorldStatic, ECollisionResponse::ECR\_Overlap );
 
	Sprite\-\>SetSimulatePhysics( false );
 
	//Set the location of the Paddle to the Left
	Sprite\-\>SetRelativeLocation( FVector( \-200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.1f, 1.0f, 0.1f ) );
	Sprite\-\>SetAbsolute( true, true, true );
 
 
 
}
 
// Called when the game starts or when spawned
void APaddle::BeginPlay()
{
	Super::BeginPlay();
	Sprite\-\>SetRelativeLocation( FVector( \-200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
 
	//Ensure that this component's name is "Paddle"
	Rename( TEXT( "Paddle" ) );
}
 
// Called every frame
void APaddle::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	// Update the sprites location based on the movement input
	FVector move \= GetMovementInputVector();
	if ( ( MoveUp && move.Z \> 0 ) || ( MoveDown && move.Z < 0 ) )
	{
		FTransform loc \= Sprite\-\>GetRelativeTransform();
		loc.AddToTranslation( move\*DeltaTime );
		Sprite\-\>SetRelativeTransform( loc );
	}
 
}
 
// Called to bind functionality to input
void APaddle::SetupPlayerInputComponent(class UInputComponent\* InputComponent)
{
	Super::SetupPlayerInputComponent(InputComponent);
 
	const UInputSettings\* settings \= GetDefault<UInputSettings\>( );
 
	//Create movement mappings for upwards and downwards movement, the float value tells if we are moving the paddle up or down
	const FInputAxisKeyMapping upKey("Move", EKeys::Up, 1.0f);
	const FInputAxisKeyMapping downKey( "Move", EKeys::Down, \-1.0f );
 
	// Add the axis mappings
	// Once this code is executed, these mappings will be added in the editors Input Settings!
	((UInputSettings\*)settings)\-\>AddAxisMapping( upKey );
	((UInputSettings\*)settings)\-\>AddAxisMapping( downKey );
 
	// Bind the axis - if we press up, the function is called with 1.0.  if we press down, the function is called with -1.0.
	// if we do nothing, the function is called with 0.0f
	InputComponent\-\>BindAxis( "Move", this, &APaddle::MovePaddle );
 
	Velocity \= 0.0f;
}
 
void APaddle::MovePaddle( float Scale )
{
	//Add a movement input, hardcoding in 75.0f for the vector
	FVector direction \= FVector( 0.0f, 0.0f, 75.0f );
	GetMovementComponent()\-\>ConsumeInputVector();
	AddMovementInput( direction, Scale );
	Velocity \= Scale \* 75.0f;
}
 
void APaddle::NotifyActorBeginOverlap( AActor\* OtherActor )
{
	if ( OtherActor\-\>GetName().Equals( "Bounds" ) )
	{
		FVector prev \= GetMovementComponent()\-\>GetLastInputVector();
 
		//If moving into a bound, set the movement in that direction to false
		if ( prev.Z \> 0.0f )
		{
			MoveUp \= false;
		}
		else if ( prev.Z < 0.0f )
		{
			MoveDown \= false;
		}
 
	}
}
 
void APaddle::NotifyActorEndOverlap( AActor\* OtherActor )
{
	if ( OtherActor\-\>GetName().Equals( "Bounds" ) )
	{
		//Out of the bounds so enable all movement inputs
		MoveUp \= true;
		MoveDown \= true;
	}
}
 
//Get the ZVelocity (How fast the paddle is moving up or down)
float APaddle::GetZVelocity()
{
	return Velocity;
}

### PongGameState.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/GameState.h"
#include "PongGameState.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APongGameState : public AGameState
{
	GENERATED\_BODY()
 
	enum PONG\_STATES
	{
		WAITING\_TO\_START,
		PUSH\_BALL,
		PLAYING,
		UPDATE\_SCORE
	};
 
public:
 
	APongGameState( const FObjectInitializer& ObjectInitializer );
 
	//Tick called every frame
	virtual void Tick( float DeltaTime ) override;
 
	//Mutator for the reference to the Ball
	void SetBall( class ABall\* Ball );
 
private:
 
	//The current state the game is in
	PONG\_STATES CurrentState;
 
	//Reference to the Ball
	class ABall\* Ball;
 
};

### PongGameState.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongGameState.h"
#include "Ball.h"
 
APongGameState::APongGameState( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	PrimaryActorTick.bCanEverTick \= true;
	CurrentState \= PONG\_STATES::WAITING\_TO\_START;
}
 
 
void APongGameState::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	// If match is in progress, run the custom state machine
	if ( IsMatchInProgress( ) )
	{
		switch ( CurrentState )
		{
		case PONG\_STATES::WAITING\_TO\_START:
			CurrentState \= PONG\_STATES::PUSH\_BALL;
			break;
 
		case PONG\_STATES::PUSH\_BALL:
			Ball\-\>StartMove();
			CurrentState \= PONG\_STATES::PLAYING;
			break;
 
		case PONG\_STATES::PLAYING:
			break;
 
		case PONG\_STATES::UPDATE\_SCORE:
			CurrentState \= PONG\_STATES::WAITING\_TO\_START;
			break;
 
		default:
			CurrentState \= PONG\_STATES::WAITING\_TO\_START;
			break;
		}
	}
}
 
void APongGameState::SetBall( ABall\* Ball )
{
	this\-\>Ball \= Ball;
}

  
The Ball should now move around in the world and collide/bounce off of everything. If you move the paddle and hit the ball, the ball should move up/down in the direction that you hit it.

Goals/Paddle AI
---------------

The next step will be to add in the goals. A way to know when the Ball is overlapping a goal will also need to be known in the gamestate in order to move the state forwards when a goal is made. In order to do this, an overlap event will be added that will be called with the overlap happens.

Also, a PaddleAI class will be made that extends the Paddle Class. This will control the AI for the paddle.

1.  Create a new C++ Class
2.  Select the Paddle Class as the class to extend
3.  Name the new Class "PaddleAI" and create

### Paddle

A GetPosition Function has been added to this class in order to get where the paddle currently is. This is used when setting the locations of the Goals because we want the goals to be located behind the paddles. The renaming in the BeginPlay() method was also moved to the GameMode as part of initialization there due to double renaming once the PaddleAI class was created.

#### Paddle.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Pawn.h"
#include "Paddle.generated.h"
 
UCLASS()
class PONG\_API APaddle : public APawn
{
	GENERATED\_BODY()
 
public:
	// Sets default values for this pawn's properties
	APaddle( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent\* InputComponent) override;
 
	// Function called to move the paddle.  Scale represents up/down
	void MovePaddle( float Scale );
 
	// Notification when the paddle begins to overlap another Actor
	virtual void NotifyActorBeginOverlap( AActor\* OtherActor ) override;
 
	// Notification when the paddle ends overlap
	virtual void NotifyActorEndOverlap( AActor\* OtherActor ) override;
 
	// How fast the paddle is moving up or down
	float GetZVelocity();
 
	// Get the location of the sprite
	FVector2D GetPosition();
 
protected:
 
	//Reference to the Sprite Component which contains the paddle sprite
	UPROPERTY( EditAnywhere, BlueprintReadWrite, Category \= Paddle )
	class UPaperSpriteComponent\* Sprite;
 
private:
 
	//Booleans for keeping track of valid movement directions
	bool MoveUp;
	bool MoveDown;
 
	//How fast the paddle is moving
	float Velocity;
 
};

#### Paddle.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Paddle.h"
#include "PaperSpriteComponent.h"
 
 
// Sets default values
APaddle::APaddle( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Paddle Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> PaddleSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Paddle'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the PaddleSprite Reference we grabbed
	Sprite\-\>SetSprite( PaddleSpriteRef.Object );
 
	RootComponent \= Sprite;
 
	ObjectInitializer.CreateDefaultSubobject<UPawnMovementComponent\>( this, TEXT( "MovementComp" ) );
 
	//Can initially move in all directions
	MoveUp \= true;
	MoveDown \= true;
 
	//Set the sprite to generate overlap events for world-static objects -> The Bounds is set to World Static, so this should generate an overlap event now
	Sprite\-\>GetBodyInstance()\-\>SetCollisionEnabled( ECollisionEnabled::QueryAndPhysics );
	Sprite\-\>GetBodyInstance()\-\>SetObjectType( ECollisionChannel::ECC\_Pawn );
	Sprite\-\>GetBodyInstance()\-\>SetResponseToChannel( ECollisionChannel::ECC\_WorldStatic, ECollisionResponse::ECR\_Overlap );
 
	Sprite\-\>SetSimulatePhysics( false );
 
	//Set the location of the Paddle to the Left
	Sprite\-\>SetRelativeLocation( FVector( \-200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.1f, 1.0f, 0.1f ) );
	Sprite\-\>SetAbsolute( true, true, true );
 
 
 
}
 
// Called when the game starts or when spawned
void APaddle::BeginPlay()
{
	Super::BeginPlay();
	Sprite\-\>SetRelativeLocation( FVector( \-200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
}
 
// Called every frame
void APaddle::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	// Update the sprites location based on the movement input
	FVector move \= GetMovementInputVector();
	if ( ( MoveUp && move.Z \> 0 ) || ( MoveDown && move.Z < 0 ) )
	{
		FTransform loc \= Sprite\-\>GetRelativeTransform();
		loc.AddToTranslation( move\*DeltaTime );
		Sprite\-\>SetRelativeTransform( loc );
	}
 
}
 
// Called to bind functionality to input
void APaddle::SetupPlayerInputComponent(class UInputComponent\* InputComponent)
{
	Super::SetupPlayerInputComponent(InputComponent);
 
	const UInputSettings\* settings \= GetDefault<UInputSettings\>( );
 
	//Create movement mappings for upwards and downwards movement, the float value tells if we are moving the paddle up or down
	const FInputAxisKeyMapping upKey("Move", EKeys::Up, 1.0f);
	const FInputAxisKeyMapping downKey( "Move", EKeys::Down, \-1.0f );
 
	// Add the axis mappings
	// Once this code is executed, these mappings will be added in the editors Input Settings!
	((UInputSettings\*)settings)\-\>AddAxisMapping( upKey );
	((UInputSettings\*)settings)\-\>AddAxisMapping( downKey );
 
	// Bind the axis - if we press up, the function is called with 1.0.  if we press down, the function is called with -1.0.
	// if we do nothing, the function is called with 0.0f
	InputComponent\-\>BindAxis( "Move", this, &APaddle::MovePaddle );
 
	Velocity \= 0.0f;
}
 
void APaddle::MovePaddle( float Scale )
{
	//Add a movement input, hardcoding in 75.0f for the vector
	FVector direction \= FVector( 0.0f, 0.0f, 75.0f );
	GetMovementComponent()\-\>ConsumeInputVector();
	AddMovementInput( direction, Scale );
	Velocity \= Scale \* 75.0f;
}
 
void APaddle::NotifyActorBeginOverlap( AActor\* OtherActor )
{
	if ( OtherActor\-\>GetName().Equals( "Bounds" ) )
	{
		FVector prev \= GetMovementComponent()\-\>GetLastInputVector();
 
		//If moving into a bound, set the movement in that direction to false
		if ( prev.Z \> 0.0f )
		{
			MoveUp \= false;
		}
		else if ( prev.Z < 0.0f )
		{
			MoveDown \= false;
		}
 
	}
}
 
void APaddle::NotifyActorEndOverlap( AActor\* OtherActor )
{
	if ( OtherActor\-\>GetName().Equals( "Bounds" ) )
	{
		//Out of the bounds so enable all movement inputs
		MoveUp \= true;
		MoveDown \= true;
	}
}
 
//Get the ZVelocity (How fast the paddle is moving up or down)
float APaddle::GetZVelocity()
{
	return Velocity;
}
 
FVector2D APaddle::GetPosition()
{
	FVector2D location;
	location.X \= Sprite\-\>GetComponentLocation().X;
	location.Y \= Sprite\-\>GetComponentLocation().Z;
 
	return location;
}

### PaddleAI

The AI Paddle class was created. A SetBall Method was created in order to store a reference to the Ball. This is used in the Tick function for some very simple ai. If the ball is above the paddle, the paddle moves up. If the ball is below the paddle, the paddle moves down. If the paddle and the ball are at the same height, the paddle does not move.

#### PaddleAI.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "Paddle.h"
#include "PaddleAI.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APaddleAI : public APaddle
{
	GENERATED\_BODY()
 
public:
	// Sets default values for this pawn's properties
	APaddleAI( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Ball Reference
	void SetBall( class ABall\* Ball );
 
private:
 
	//Reference to Ball
	class ABall\* Ball;
 
};

#### PaddleAI.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PaddleAI.h"
#include "Ball.h"
#include "PaperSpriteComponent.h"
 
 
 
// Sets default values
APaddleAI::APaddleAI( const FObjectInitializer& ObjectInitializer )
: Super( ObjectInitializer )
{
	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
}
 
// Called when the game starts or when spawned
void APaddleAI::BeginPlay( )
{
	Super::BeginPlay();
	Sprite\-\>SetRelativeLocation( FVector( 200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
}
 
// Called every frame
void APaddleAI::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	// Update the direction the AI should move based on where the Ball is
	if ( Sprite\-\>GetComponentLocation().Z \> Ball\-\>GetActorLocation().Z )
	{
		MovePaddle( \-1.0f );
	}
	else if ( Sprite\-\>GetComponentLocation().Z < Ball\-\>GetActorLocation().Z )
	{
		MovePaddle( 1.0f );
	}
	else
	{
		MovePaddle( 0.0f );
	}
 
}
 
void APaddleAI::SetBall( ABall\* Ball )
{
	this\-\>Ball \= Ball;
}

### Goal

The goals were made so that a SetPosition function could be called to set the position of them. There are two goals, the PlayerGoal and the AIGoal. These were spawned and set in the GameMode class shown later on in this tutorial. The goals need to be initialized so that they are not visible and they generate overlap events when a dynamic object(The Ball) collides with it.

#### Goal.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Goal.generated.h"
 
UCLASS()
class PONG\_API AGoal : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	AGoal( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Set the X,Y, and Z scale for the sprite
	void SetScale( FVector& vector );
 
	// Set the position of the Goal
	void SetPosition( FVector& position );
 
	// Accessor for the width
	float GetWidth();
 
private:
 
	//Reference to the Sprite that represents a pong goal area
	class UPaperSpriteComponent\* Sprite;
 
};

#### Goal.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Goal.h"
#include "PaperSpriteComponent.h"
 
// Sets default values
AGoal::AGoal( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Goal Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> GoalSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Goal'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the GoalSprite Reference we grabbed
	Sprite\-\>SetSprite( GoalSpriteRef.Object );
 
	RootComponent \= Sprite;
 
	//Make sure that this component overlaps
	Sprite\-\>GetBodyInstance()\-\>SetCollisionEnabled( ECollisionEnabled::QueryOnly );
	Sprite\-\>GetBodyInstance()\-\>SetObjectType( ECollisionChannel::ECC\_WorldStatic );
	Sprite\-\>GetBodyInstance()\-\>SetResponseToAllChannels( ECollisionResponse::ECR\_Overlap );
	Sprite\-\>SetVisibility( false );
}
 
// Called when the game starts or when spawned
void AGoal::BeginPlay()
{
	Super::BeginPlay();
 
}
 
// Called every frame
void AGoal::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
}
 
// Set the X,Y, and Z scale for the sprite
void AGoal::SetScale( FVector& vector )
{
	Sprite\-\>SetRelativeScale3D( vector );
}
 
void AGoal::SetPosition( FVector& position )
{
	Sprite\-\>SetRelativeLocation( position );
}
 
float AGoal::GetWidth()
{
	return Sprite\-\>GetSprite()\-\>GetSourceSize().X;
}

### GameMode

The gamemode was updated to spawn an AIPaddle, spawn the Goals, rename the paddles/goals, set the positions of the goals, and update the state/aipaddle with references to the Ball. Just a bunch of initialization stuff here.

#### PongGameMode.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/GameMode.h"
#include "PongGameMode.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APongGameMode : public AGameMode
{
	GENERATED\_BODY()
 
public:
	//Constructor where we set the default classes to initialize
	APongGameMode( const FObjectInitializer& ObjectInitializer );
 
	//Function called to spawn our pawn objects into the world
	virtual void StartPlay() override;
};

#### PongGameMode.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongGameMode.h"
#include "Paddle.h"
#include "PongCamera.h"
#include "Background.h"
#include "Ball.h"
#include "Bounds.h"
#include "Goal.h"
#include "PongGameState.h"
#include "PaddleAI.h"
 
APongGameMode::APongGameMode( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	//Set Default Classes
	DefaultPawnClass \= APaddle::StaticClass();
	GameStateClass \= APongGameState::StaticClass();
}
 
 
void APongGameMode::StartPlay()
{
	Super::StartPlay( );
	UWorld\* const World \= GetWorld();
	if ( World )
	{
		APongGameState\* gameState \= GetGameState<APongGameState\>();
		APongCamera\* camera \= World\-\>SpawnActor<APongCamera\>( APongCamera::StaticClass() );
 
		//Camera is set to the CameraActor created
		World\-\>GetFirstPlayerController()\-\>SetViewTarget( camera );
 
		//Set the background to fill up the entire view of the camera
		ABackground\* background \= World\-\>SpawnActor<ABackground\>( ABackground::StaticClass() );
		FVector2D dimensions \= camera\-\>GetViewDimensions();
		background\-\>SetDimensions( dimensions );
 
		//Spawn the Ball into the World
		ABall\* ball \= World\-\>SpawnActor<ABall\>( ABall::StaticClass() );
 
		FVector scale \= background\-\>GetScale();
 
		//Spawn the Bounds into the World
		ABounds\* bounds \= World\-\>SpawnActor<ABounds\>( ABounds::StaticClass() );
		bounds\-\>SetScale( scale );
 
		//Spawn the Player and AI Goals
		AGoal\* playerGoal \= World\-\>SpawnActor<AGoal\>( AGoal::StaticClass() );
		AGoal\* aiGoal \= World\-\>SpawnActor<AGoal\>( AGoal::StaticClass() );
 
		playerGoal\-\>SetScale( scale );
		aiGoal\-\>SetScale( scale );
 
		playerGoal\-\>Rename( TEXT( "PlayerGoal" ) );
		aiGoal\-\>Rename( TEXT( "AIGoal" ) );
 
		//Get a reference to the paddles and rename them
		APaddle\* playerPaddle \= (APaddle\*)World\-\>GetFirstPlayerController()\-\>GetPawn();
		APaddleAI\* aiPaddle \= World\-\>SpawnActor<APaddleAI\>( APaddleAI::StaticClass( ) );
		playerPaddle\-\>Rename( TEXT( "PlayerPaddle" ) );
		aiPaddle\-\>Rename( TEXT( "AIPaddle" ) );
 
		//playerGoal spawns on the left, aiGoal on the right
		FVector playerPos, aiPos;
		playerPos.Y \= 50.f;
		aiPos.Y \= 50.f;
		playerPos.X \= playerPaddle\-\>GetPosition().X \- ( playerGoal\-\>GetWidth() \* scale.X ) / 2;
		aiPos.X \= 5.0f + aiPaddle\-\>GetPosition().X + ( playerGoal\-\>GetWidth() \* scale.X ) / 2;
		playerPos.Z \= 0.f;
		aiPos.Z \= 0.f;
 
		playerGoal\-\>SetPosition( playerPos );
		aiGoal\-\>SetPosition( aiPos );
 
		gameState\-\>SetBall( ball );
		aiPaddle\-\>SetBall( ball );
	}
 
	Super::StartMatch();
}

### GameState

The PongGameState was updated majorly for some of these changes made. A UFUNCTION() BallOVerlap function was created. This function was created and registered such that it is called whenever the Ball overlaps with another Actor. Private variables for the score were added in order to keep track of when a score was made. A ResetBoard helper function was also made so that the state machine can call it to reset everything back to initial states after a goal has been scored.

#### PongGameState.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/GameState.h"
#include "PongGameState.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APongGameState : public AGameState
{
	GENERATED\_BODY()
 
	enum PONG\_STATES
	{
		WAITING\_TO\_START,
		PUSH\_BALL,
		PLAYING,
		UPDATE\_SCORE
	};
 
public:
 
	APongGameState( const FObjectInitializer& ObjectInitializer );
 
	//Tick called every frame
	virtual void Tick( float DeltaTime ) override;
 
	//Mutator for the reference to the Ball
	void SetBall( class ABall\* Ball );
 
	//Overlap event for when the ball overlaps
	UFUNCTION()
	void BallOverlap( AActor\* OtherActor );
 
private:
	//Helper function to Reset the Board to it's initial state
	void ResetBoard();
 
private:
 
	//The current state the game is in
	PONG\_STATES CurrentState;
 
	//Reference to the Ball
	class ABall\* Ball;
 
	//booleans to keep track of when a goal is scored
	bool AIScored;
	bool PlayerScored;
 
	//values to store to the current score
	int AIScore;
	int PlayerScore;
 
};

#### PongGameState.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongGameState.h"
#include "Ball.h"
 
APongGameState::APongGameState( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	PrimaryActorTick.bCanEverTick \= true;
	PlayerScore \= 0;
	AIScore \= 0;
	CurrentState \= PONG\_STATES::WAITING\_TO\_START;
}
 
 
void APongGameState::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	// If match is in progress, run the custom state machine
	if ( IsMatchInProgress( ) )
	{
		switch ( CurrentState )
		{
		case PONG\_STATES::WAITING\_TO\_START:
			ResetBoard();
			CurrentState \= PONG\_STATES::PUSH\_BALL;
			break;
 
		case PONG\_STATES::PUSH\_BALL:
			Ball\-\>StartMove();
			CurrentState \= PONG\_STATES::PLAYING;
			break;
 
		case PONG\_STATES::PLAYING:
			if ( PlayerScored || AIScored )
			{
				CurrentState \= PONG\_STATES::WAITING\_TO\_START;
			}
			break;
 
		case PONG\_STATES::UPDATE\_SCORE:
			CurrentState \= PONG\_STATES::WAITING\_TO\_START;
			break;
 
		default:
			CurrentState \= PONG\_STATES::WAITING\_TO\_START;
			break;
		}
	}
}
 
void APongGameState::SetBall( ABall\* Ball )
{
	this\-\>Ball \= Ball;
	Ball\-\>OnActorBeginOverlap.AddDynamic( this, &APongGameState::BallOverlap );
}
 
void APongGameState::BallOverlap( AActor\* OtherActor )
{
	if ( OtherActor\-\>GetName().Equals( "PlayerGoal" ) )
	{
		AIScored \= true;
		AIScore++;
	}
 
	if ( OtherActor\-\>GetName().Equals( "AIGoal" ) )
	{
		PlayerScored \= true;
		PlayerScore++;
	}
}
 
void APongGameState::ResetBoard()
{
	PlayerScored \= false;
	AIScored \= false;
}

  

Creating the HUD / Finishing up
-------------------------------

Collision should be working now. The score should be updating. All that is needed now is a way to display the score and to polish up the states. In order to display the score, a HUD is going to be created. The HUD is going to be used to draw test to the canvas. In our case, we are going to draw the current score of the Pong Game and maybe an Initial text to start the game, something like "Press space to Begin.".

### Pong HUD

1.  Create a new c++ class in the editor
2.  Extend the HUD class
3.  call the new class "PongHUD" and click create

The HUD is going to go through a Draw Function where it will constantly draw the HUD. Some functions are made for different components to be drawn. The Score is set to always be drawn, and a boolean value controls when the Score is drawn.

  

#### PongHUD.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/HUD.h"
#include "PongHUD.generated.h"
 
/\*\*
\*
\*/
UCLASS( )
class PONG\_API APongHUD : public AHUD
{
	GENERATED\_BODY( )
 
 
public:
 
	APongHUD( const FObjectInitializer& ObjectInitializer );
 
	virtual void DrawHUD() override;
 
	//Display the current Pong Score on the screen
	void DisplayScore( );
 
	//Display The text waiting for space
	void DisplaySpaceText();
 
	//Set if the waiting for space text should be displayed
	void DisplayWaitingForSpace( bool bSpace );
 
	//Set the score to be displayed
	void SetScore( int PlayerScore, int AIScore );
 
private:
 
	//The score of the game
	int Score\[2\];
 
	//Display space text?
	bool bWaitingForSpace;
};

#### PongHUD.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongHUD.h"
 
 
 
 
APongHUD::APongHUD( const FObjectInitializer& ObjectInitializer )
: Super( ObjectInitializer )
{
	Score\[0\] \= 0;
	Score\[1\] \= 0;
	bWaitingForSpace \= false;
}
 
void APongHUD::DrawHUD( )
{
	Super::DrawHUD();
 
	DisplayScore();
 
	if ( bWaitingForSpace )
	{
		DisplaySpaceText();
	}
}
 
void APongHUD::DisplaySpaceText( )
{
	FVector2D sLoc;
	GetOwningPlayerController()\-\>ProjectWorldLocationToScreen( FVector( \-50.0f, 0.0f, 0.0f ), sLoc );
	FString s \= "Press Space to Begin.";
	DrawText( s, FLinearColor::Blue, sLoc.X, sLoc.Y );
}
 
void APongHUD::DisplayScore()
{
	FVector2D sLoc;
	GetOwningPlayerController( )\-\>ProjectWorldLocationToScreen( FVector( \-50.0f, 0.0f, 150.0f ), sLoc );
	FString s \= "Score: " + FString::FromInt( Score\[0\] ) + " - " + FString::FromInt( Score\[1\] );
	DrawText( s, FLinearColor::Blue, sLoc.X, sLoc.Y );
}
 
void APongHUD::SetScore( int PlayerScore, int AIScore)
{
	Score\[0\] \= PlayerScore;
	Score\[1\] \= AIScore;
}
 
void APongHUD::DisplayWaitingForSpace( bool bSpace )
{
	bWaitingForSpace \= bSpace;
}

Helper functions were added to the Ball and Paddle in order to Reset them. This is called from the PongGameState when we go into the RESET state. A boolean, bMoveable was also added to the paddle in order to control when the paddle can move.

### Paddle.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Pawn.h"
#include "Paddle.generated.h"
 
UCLASS()
class PONG\_API APaddle : public APawn
{
	GENERATED\_BODY()
 
public:
	// Sets default values for this pawn's properties
	APaddle( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Called to bind functionality to input
	virtual void SetupPlayerInputComponent(class UInputComponent\* InputComponent) override;
 
	// Function called to move the paddle.  Scale represents up/down
	void MovePaddle( float Scale );
 
	// Notification when the paddle begins to overlap another Actor
	virtual void NotifyActorBeginOverlap( AActor\* OtherActor ) override;
 
	// Notification when the paddle ends overlap
	virtual void NotifyActorEndOverlap( AActor\* OtherActor ) override;
 
	// How fast the paddle is moving up or down
	float GetZVelocity();
 
	// Get the location of the sprite
	FVector2D GetPosition();
 
	// Reset the paddles location
	virtual void Reset();
 
	// Sets if the paddle can be moved
	void SetMoveable( bool bMoveable );
 
protected:
 
	//Reference to the Sprite Component which contains the paddle sprite
	UPROPERTY( EditAnywhere, BlueprintReadWrite, Category \= Paddle )
	class UPaperSpriteComponent\* Sprite;
 
	//Booleans for keeping track of valid movement directions
	bool bMoveUp;
	bool bMoveDown;
 
private:
 
	//How fast the paddle is moving
	float Velocity;
 
	//Is the paddle moveable, can it move?
	bool bMoveable;
 
};

### Paddle.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Paddle.h"
#include "PaperSpriteComponent.h"
 
 
// Sets default values
APaddle::APaddle( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Paddle Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> PaddleSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Paddle'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the PaddleSprite Reference we grabbed
	Sprite\-\>SetSprite( PaddleSpriteRef.Object );
 
	RootComponent \= Sprite;
 
	ObjectInitializer.CreateDefaultSubobject<UPawnMovementComponent\>( this, TEXT( "MovementComp" ) );
 
	//Can initially move in all directions
	bMoveUp \= true;
	bMoveDown \= true;
 
	//Set the sprite to generate overlap events for world-static objects -> The Bounds is set to World Static, so this should generate an overlap event now
	Sprite\-\>GetBodyInstance()\-\>SetCollisionEnabled( ECollisionEnabled::QueryAndPhysics );
	Sprite\-\>GetBodyInstance()\-\>SetObjectType( ECollisionChannel::ECC\_Pawn );
	Sprite\-\>GetBodyInstance()\-\>SetResponseToChannel( ECollisionChannel::ECC\_WorldStatic, ECollisionResponse::ECR\_Overlap );
 
	Sprite\-\>SetSimulatePhysics( false );
 
	//Set the location of the Paddle to the Left
	Sprite\-\>SetRelativeLocation( FVector( \-200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.1f, 1.0f, 0.1f ) );
	Sprite\-\>SetAbsolute( true, true, true );
 
 
 
}
 
// Called when the game starts or when spawned
void APaddle::BeginPlay()
{
	Super::BeginPlay();
	Sprite\-\>SetRelativeLocation( FVector( \-200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
}
 
// Called every frame
void APaddle::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	// Update the sprites location based on the movement input
	FVector move \= GetMovementInputVector();
	if ( ( ( bMoveUp && move.Z \> 0 ) || ( bMoveDown && move.Z < 0 ) ) && bMoveable )
	{
		FTransform loc \= Sprite\-\>GetRelativeTransform();
		loc.AddToTranslation( move\*DeltaTime );
		Sprite\-\>SetRelativeTransform( loc );
	}
 
}
 
// Called to bind functionality to input
void APaddle::SetupPlayerInputComponent(class UInputComponent\* InputComponent)
{
	Super::SetupPlayerInputComponent(InputComponent);
 
	const UInputSettings\* settings \= GetDefault<UInputSettings\>( );
 
	//Create movement mappings for upwards and downwards movement, the float value tells if we are moving the paddle up or down
	const FInputAxisKeyMapping upKey("Move", EKeys::Up, 1.0f);
	const FInputAxisKeyMapping downKey( "Move", EKeys::Down, \-1.0f );
 
	// Add the axis mappings
	// Once this code is executed, these mappings will be added in the editors Input Settings!
	((UInputSettings\*)settings)\-\>AddAxisMapping( upKey );
	((UInputSettings\*)settings)\-\>AddAxisMapping( downKey );
 
	// Bind the axis - if we press up, the function is called with 1.0.  if we press down, the function is called with -1.0.
	// if we do nothing, the function is called with 0.0f
	InputComponent\-\>BindAxis( "Move", this, &APaddle::MovePaddle );
 
	Velocity \= 0.0f;
}
 
void APaddle::MovePaddle( float Scale )
{
	//Add a movement input, hardcoding in 75.0f for the vector
	FVector direction \= FVector( 0.0f, 0.0f, 75.0f );
	GetMovementComponent()\-\>ConsumeInputVector();
	AddMovementInput( direction, Scale );
	Velocity \= Scale \* 75.0f;
}
 
void APaddle::NotifyActorBeginOverlap( AActor\* OtherActor )
{
	if ( OtherActor\-\>GetName().Equals( "Bounds" ) )
	{
		FVector prev \= GetMovementComponent()\-\>GetLastInputVector();
 
		//If moving into a bound, set the movement in that direction to false
		if ( prev.Z \> 0.0f )
		{
			bMoveUp \= false;
		}
		else if ( prev.Z < 0.0f )
		{
			bMoveDown \= false;
		}
 
	}
}
 
void APaddle::NotifyActorEndOverlap( AActor\* OtherActor )
{
	if ( OtherActor\-\>GetName().Equals( "Bounds" ) )
	{
		//Out of the bounds so enable all movement inputs
		bMoveUp \= true;
		bMoveDown \= true;
	}
}
 
//Get the ZVelocity (How fast the paddle is moving up or down)
float APaddle::GetZVelocity()
{
	return Velocity;
}
 
FVector2D APaddle::GetPosition()
{
	FVector2D location;
	location.X \= Sprite\-\>GetComponentLocation().X;
	location.Y \= Sprite\-\>GetComponentLocation().Z;
 
	return location;
}
 
// Reset the paddles location
void APaddle::Reset()
{
	Sprite\-\>SetRelativeLocation( FVector( \-200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.1f, 1.0f, 0.1f ) );
	bMoveUp \= true;
	bMoveDown \= true;
}
 
void APaddle::SetMoveable( bool bMoveable )
{
	this\-\>bMoveable \= bMoveable;
}

### PaddleAI.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "Paddle.h"
#include "PaddleAI.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APaddleAI : public APaddle
{
	GENERATED\_BODY()
 
public:
	// Sets default values for this pawn's properties
	APaddleAI( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Ball Reference
	void SetBall( class ABall\* Ball );
 
	// AI Paddle Reset override
	virtual void Reset() override;
 
private:
 
	//Reference to Ball
	class ABall\* Ball;
 
};

### PaddleAI.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PaddleAI.h"
#include "Ball.h"
#include "PaperSpriteComponent.h"
 
 
 
// Sets default values
APaddleAI::APaddleAI( const FObjectInitializer& ObjectInitializer )
: Super( ObjectInitializer )
{
	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
}
 
// Called when the game starts or when spawned
void APaddleAI::BeginPlay( )
{
	Super::BeginPlay();
	Sprite\-\>SetRelativeLocation( FVector( 200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
}
 
// Called every frame
void APaddleAI::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	//Paddle AI can always move
	bMoveUp \= true;
	bMoveDown \= true;
 
	// Update the direction the AI should move based on where the Ball is
	if ( Sprite\-\>GetComponentLocation().Z \> Ball\-\>GetActorLocation().Z )
	{
		MovePaddle( \-1.0f );
	}
	else if ( Sprite\-\>GetComponentLocation().Z < Ball\-\>GetActorLocation().Z )
	{
		MovePaddle( 1.0f );
	}
	else
	{
		MovePaddle( 0.0f );
	}
 
}
 
void APaddleAI::SetBall( ABall\* Ball )
{
	this\-\>Ball \= Ball;
}
 
// Reset the paddles location
void APaddleAI::Reset( )
{
	Sprite\-\>SetRelativeLocation( FVector( 200.0f, 50.f, 0.0f ) );
	Sprite\-\>SetRelativeRotation( FRotator( 0.f, 0.f, 0.f ) );
	bMoveUp \= true;
	bMoveDown \= true;
}

### Ball.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/Actor.h"
#include "Ball.generated.h"
 
UCLASS()
class PONG\_API ABall : public AActor
{
	GENERATED\_BODY()
 
public:	
	// Sets default values for this actor's properties
	ABall( const FObjectInitializer& ObjectInitializer );
 
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;
 
	// Called every frame
	virtual void Tick( float DeltaSeconds ) override;
 
	// Called to start moving the Ball
	void StartMove();
 
	// notify hit
	virtual void NotifyHit( UPrimitiveComponent\* MyComp, AActor\* Other, UPrimitiveComponent\* OtherComp, bool bSelfMoved, FVector HitLocation, FVector HitNormal, FVector NormalImpulse, const FHitResult& Hit ) override;
 
	// Reset the Ball
	void Reset();
 
protected:
 
	//Reference to the Sprite Component which contains the ball sprite
	UPROPERTY( EditAnywhere, BlueprintReadWrite, Category \= Ball )
	class UPaperSpriteComponent\* Sprite;
 
private:
 
	//The direction the ball is traveling in
	FVector Direction;
 
	//Velocity of the ball.  How Fast it is travelling. Distance/Time
	float Velocity;
};

### Ball.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "Ball.h"
#include "PaperSpriteComponent.h"
#include "Paddle.h"
 
// Sets default values
ABall::ABall( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick \= true;
 
	//Find the Ball Sprite -- Right click on your sprite in the editor and click copy reference to get the path to it
	ConstructorHelpers::FObjectFinder<UPaperSprite\> BallSpriteRef( TEXT( "PaperSprite'/Game/Sprites/Ball'" ) );
 
	//Create a default UPaperSpriteComponent and register it to this Actor
	Sprite \= ObjectInitializer.CreateDefaultSubobject<UPaperSpriteComponent\>( this, TEXT( "SpriteComp" ) );
 
	//Set the Sprite to render for the UPaperSpriteComponent to the BallSprite Reference we grabbed
	Sprite\-\>SetSprite( BallSpriteRef.Object );
 
	RootComponent \= Sprite;
 
	//Set the physics properties
	//Restrict the translation/rotation axis
	SetActorEnableCollision( true );
	Sprite\-\>SetEnableGravity( false );
	Sprite\-\>SetConstraintMode( EDOFMode::SixDOF );
	Sprite\-\>GetBodyInstance()\-\>bLockXRotation \= true;
	Sprite\-\>GetBodyInstance()\-\>bLockYRotation \= true;
	Sprite\-\>GetBodyInstance()\-\>bLockZRotation \= true;
	Sprite\-\>GetBodyInstance()\-\>bLockXTranslation \= false;
	Sprite\-\>GetBodyInstance()\-\>bLockYTranslation \= true;
	Sprite\-\>GetBodyInstance()\-\>bLockZTranslation \= false;
 
	//Enable Hit Notifies
	Sprite\-\>SetNotifyRigidBodyCollision( true );
 
	//Set the ball to spawn in the middle of the Board and scale its size down
	Sprite\-\>SetRelativeLocation( FVector( 0.0f, 50.0f, 0.0f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.07f, 1.0f, 0.07f ) );
	Sprite\-\>SetAbsolute( true, true, true );
 
	Sprite\-\>SetLinearDamping( 0.0f );
	Sprite\-\>SetSimulatePhysics( true );
 
	Direction \= FVector( 0.0f, 0.0f, 0.0f );
	Velocity \= 0.0f;
}
 
// Called when the game starts or when spawned
void ABall::BeginPlay()
{
	Super::BeginPlay();
}
 
// Called every frame
void ABall::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	//Set a time variable to be < one hundreth of a second
	float time \= (DeltaTime \> 0.01f ? 0.0083f : DeltaTime);
 
	//Update the translation based on the time variable
	FTransform transform \= Sprite\-\>GetRelativeTransform();
	transform.AddToTranslation( Direction \* Velocity \* time );
	Sprite\-\>SetRelativeTransform( transform );
 
}
 
void ABall::StartMove()
{
	// Move the ball via setting the Direction and Velocity
	Direction \= FVector( \-1.0f, 0.0f, 0.0f );
	Velocity \= 250.0f;
}
 
//The Ball has hit something
void ABall::NotifyHit( UPrimitiveComponent\* MyComp, AActor\* Other, UPrimitiveComponent\* OtherComp, bool bSelfMoved, FVector HitLocation, FVector HitNormal, FVector NormalImpulse, const FHitResult& Hit )
{
	//Make sure that the physics velocities are set to 0.  We are keeping track of direction/speed.  We want this hit event so that we can easily mirror the direction
	Sprite\-\>SetAllPhysicsAngularVelocity( FVector( 0.0f, 0.0f, 0.0f ) );
	Sprite\-\>SetAllPhysicsLinearVelocity( FVector( 0.0f, 0.0f, 0.0f ) );
 
	//Mirror the Direction so that we can get the new trajectory of the ball
	Direction \= Direction.MirrorByVector( HitNormal );
 
	//If the ball hits the paddle, add Z velocity to the ball (This can become very fast)
	if ( Other\-\>GetName().Contains( "Paddle" ) )
	{
		APaddle\* paddle \= (APaddle\*)Other;
		Direction.Z +\= (paddle\-\>GetZVelocity() / Velocity);
	}
}
 
void ABall::Reset()
{
	Sprite\-\>SetRelativeLocation( FVector( 0.0f, 50.0f, 0.0f ) );
	Sprite\-\>SetRelativeScale3D( FVector( 0.07f, 1.0f, 0.07f ) );
	Direction \= FVector( 0.0f, 0.0f, 0.0f );
	Velocity \= 0.0f;
}

Finally, the GameState was updated significantly. The states were all filled in.

### PongGameState.h

// Fill out your copyright notice in the Description page of Project Settings.
 
#pragma once
 
#include "GameFramework/GameState.h"
#include "PongGameState.generated.h"
 
/\*\*
 \* 
 \*/
UCLASS()
class PONG\_API APongGameState : public AGameState
{
	GENERATED\_BODY()
 
	enum PONG\_STATES
	{
		RESET,
		WAITING\_TO\_START,
		PUSH\_BALL,
		PLAYING
	};
 
public:
 
	APongGameState( const FObjectInitializer& ObjectInitializer );
 
	//Called when play begins
	virtual void BeginPlay() override;
 
	//Tick called every frame
	virtual void Tick( float DeltaTime ) override;
 
	//Mutator for the reference to the Ball
	void SetBall( class ABall\* Ball );
 
	//Overlap event for when the ball overlaps
	UFUNCTION()
	void BallOverlap( AActor\* OtherActor );
 
private:
	//Helper function to Reset the Board to it's initial state
	void ResetBoard();
 
private:
 
	//The current state the game is in
	PONG\_STATES CurrentState;
 
	//Reference to the Ball
	class ABall\* Ball;
 
	//booleans to keep track of when a goal is scored
	bool bAIScored;
	bool bPlayerScored;
 
	//values to store to the current score
	int AIScore;
	int PlayerScore;
 
	//Reference to the controller used for the paddle
	class APlayerController\* Controller;
	class APongHUD\* HUD;
 
};

### PongGameState.cpp

// Fill out your copyright notice in the Description page of Project Settings.
 
#include "Pong.h"
#include "PongGameState.h"
#include "Ball.h"
#include "Paddle.h"
#include "PongHUD.h"
 
APongGameState::APongGameState( const FObjectInitializer& ObjectInitializer )
	: Super( ObjectInitializer )
{
	PrimaryActorTick.bCanEverTick \= true;
	PlayerScore \= 0;
	AIScore \= 0;
	CurrentState \= PONG\_STATES::WAITING\_TO\_START;
}
 
void APongGameState::BeginPlay()
{
	Super::BeginPlay();
 
	Controller \= GetWorld()\-\>GetFirstPlayerController();
	HUD \= (APongHUD\*)Controller\-\>GetHUD();
}
 
void APongGameState::Tick( float DeltaTime )
{
	Super::Tick( DeltaTime );
 
	// If match is in progress, run the custom state machine
	if ( IsMatchInProgress( ) )
	{
		switch ( CurrentState )
		{
		case PONG\_STATES::RESET:
			ResetBoard();
			for ( auto it \= GetWorld( )\-\>GetPawnIterator( ); it.GetIndex( ) < GetWorld( )\-\>GetNumPawns( ); it++ )
			{
				( (APaddle\*)it\-\>Get() )\-\>SetMoveable( false );
			}
			CurrentState \= PONG\_STATES::WAITING\_TO\_START;
			break;
 
		case PONG\_STATES::WAITING\_TO\_START:
			HUD\-\>DisplayWaitingForSpace( true );
			if ( Controller\-\>WasInputKeyJustReleased( EKeys::SpaceBar ) )
			{
				HUD\-\>DisplayWaitingForSpace( false );
				for ( auto it \= GetWorld( )\-\>GetPawnIterator( ); it.GetIndex( ) < GetWorld( )\-\>GetNumPawns( ); it++ )
				{
					( (APaddle\*)it\-\>Get() )\-\>SetMoveable( true );
				}
				CurrentState \= PONG\_STATES::PUSH\_BALL;
			}
			break;
 
		case PONG\_STATES::PUSH\_BALL:
			Ball\-\>StartMove();
			CurrentState \= PONG\_STATES::PLAYING;
			break;
 
		case PONG\_STATES::PLAYING:
			if (bPlayerScored || bAIScored )
			{
				HUD\-\>SetScore( PlayerScore, AIScore );
				CurrentState \= PONG\_STATES::RESET;
			}
			break;
 
		default:
			CurrentState \= PONG\_STATES::RESET;
			break;
		}
	}
}
 
void APongGameState::SetBall( ABall\* Ball )
{
	this\-\>Ball \= Ball;
	Ball\-\>OnActorBeginOverlap.AddDynamic( this, &APongGameState::BallOverlap );
}
 
void APongGameState::BallOverlap( AActor\* OtherActor )
{
	if ( OtherActor\-\>GetName().Equals( "PlayerGoal" ) )
	{
		bAIScored \= true;
		AIScore++;
	}
 
	if ( OtherActor\-\>GetName().Equals( "AIGoal" ) )
	{
		bPlayerScored \= true;
		PlayerScore++;
	}
}
 
void APongGameState::ResetBoard()
{
 
	bPlayerScored \= false;
	bAIScored \= false;
 
	// Reset the paddles
	for ( auto it \= GetWorld( )\-\>GetPawnIterator( ); it.GetIndex( ) < GetWorld( )\-\>GetNumPawns( ); it++ )
	{
		( (APaddle\*)it\-\>Get() )\-\>Reset( );
	}
 
	Ball\-\>Reset();
 
}

  

Finished
--------

And that is Pong, Congratulations!

  

All Source Files
----------------

Here are all of the final source files zipped up: [File:PongSource.zip](/File:PongSource.zip "File:PongSource.zip")

  
**Author:** Igne  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Pong\_Tutorial&oldid=17207](https://wiki.unrealengine.com/index.php?title=Pong_Tutorial&oldid=17207)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

  ![](https://tracking.unrealengine.com/track.png)