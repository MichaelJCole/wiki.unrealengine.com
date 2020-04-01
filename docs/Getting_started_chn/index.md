Getting started chn - Epic Wiki             

Getting started chn
===================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

This page is a translation to [https://docs.unrealengine.com/latest/CHN/GettingStarted/index.html](https://docs.unrealengine.com/latest/CHN/GettingStarted/index.html) which is not exist for now. Translated by Lostink(Seeldam Windsong).\\

  
Getting Started

  
准备工作

硬件与软件要求

安装引擎

  
编辑器基础 在虚幻引擎里面, 你创造的任何游戏都可以被称为一个项目(project). 项目本身是自包含的独立单元，构成一个独立游戏所需要的所有资源、 代码都将会包含在里面。你可以同时创造、维护、修改任意多数量的项目，因为引擎本身和编辑器可以很方便地在项目之间进行切换。这本身将 会使开发者们更容易在同一时间进行多个游戏开发，又或是在主项目之外进行测试项目的编辑。

在虚幻引擎当中，你在游戏里面所看到、体会到的场景一般都会被称为关卡(Levels)。你或许可以将一个关卡视为一个3D的环境，在这个环境 下你将会放置一系列的物品和集合体来形成游戏玩家眼中的世界。任何你放入的物品，例如灯光，几何体，或者是角色，在这里将会被称为角色 (Actor)。从技术上来说，角色是程序中的一个类，它在虚幻引擎中被作为一个拥有三维坐标，旋转和尺寸的部件调用。简单点说，角色就是你 可以放置在你关卡里面的东西。

  
虚幻编辑器快速入门指引 1. 创建一个新的项目Create a New Project

2\. 移动你的视点Navigating the Viewport

3\. 开始一个新的关卡Start a New Level

4\. 放置角色Place Actors

5\. 编辑放置的角色Edit Placed Actors

6\. 构建一个关卡Running the Build Process

7\. 深入研究Further Reading

关卡编辑器简要Level Editor Walkthrough

关卡编辑器工具箱Level Editor Toolbar

  
编辑器视点(Viewports)

视点是你欣赏你所创建的虚幻世界的窗口。他们可以像你在游戏里面一样移动，又或者是在进行一个严谨的设计，例如建筑蓝图的设计的时候被利 用。虚幻编辑器里面所包含的视点包含了大量的工具以及形成的图像来帮助你看到你需要的数据。

  

       视点基础Viewport Basics

       视点的控制Viewport Controls

  
编辑器样板(Editor Modes)

在模型(Modes)面板下面包含有各种各样的画刷模型以供进行选择。这些选择将会改变关卡编辑器的基本情况来迎合特定的功能需求。例如添加新

的元素，创建几何画刷以及几何体，对现有模型进行填充，产生树叶，修整地形等等。

  

  

     编辑器模式Level Editor Modes

角色与几何体Actors & Geometry 从最基本的层面上来说，创建关卡就是将元件放入虚幻编辑器的地图。这些元件也许是几何体(geometry)，装饰(decorations)，静态元件 (static meshes)，灯光(lights)，玩家开始点(player starts)，武器(weapons)或者是交通工具(vehicles)。至于元件放置的先 后顺序，往往取决于开发团队的工作流程。

放置角色Placing Actors

几何角色Geometry Actors

转换角色Transforming Actors

灯光基础Lighting Basics

  
内容浏览器Content Browser 内容浏览器是虚幻编辑器中用于创建、导入、管理、浏览和修改编辑器中的附件(assets)的基础区域。同时也提供了管理文件夹以及附件管理 的实用的功能，例如重命名文件，移动文件，拷贝文件和浏览文件关联。在内容浏览器中可以搜索并修改任何游戏中的附件。

附件与材料包Assets and Packages

内容浏览器Content Browser

美工快速起步Artist Quick Start Guide

1\. 创建一个新的项目Create a New Project

2\. 重要的文件类型Important File Types

3\. 预备好附件Prepare your Assets

4\. 导入你的内容Import Your Content

5\. 制作你的材料Make Your Materials

6\. 使用你的材料Apply Your Materials

7\. 深入研究Further Reading

  
蓝图可视化编程Blueprints Visual Scripting

蓝图(Blueprints)式可视化编程是虚幻引擎之中完全用于游戏元件编程的系统。通过利用指针、接口等方式，我们可以从虚幻编辑器中创造我们 游戏中需要的元件。这个系统是极度自由并且强大的，因为他提供了游戏设计者们用可视化的工具以及概念进行创建的可能，而在过去这些工作似 乎只有程序员们才可以进行。

蓝图的介绍Introduction to Blueprints

  
编程Programming

  
实现一个游戏和修改游戏引擎本身对于任何游戏项目来说都是至关重要的部分。而虚幻编辑器给予你通过代码或者蓝图可视化编程的方法来实现你自 己的游戏。你甚至可以创建你自己的插件来修改或者是扩充引擎和编辑器的功能，来供给设计师或者是美工来使用。

编程快速起步Programming Quick Start Guide

1\. 搭建代码环境Install Your Coding Environment

2\. 创建一个新的项目Create a New Project

3\. 添加一个新的类Add a New Class

4\. 编辑你的类头文件Edit Your Class Header

5\. 编辑你的类的源程序Edit Your Class Source File

6\. 编译你的项目Compile Your Project

7\. 使用你新创建的类Using Your New Class

虚幻引擎程序基础Unreal Engine Programming Basics

学习游戏框架Learn About the Game Framework

  
测试你的游戏Playtest Your Game

通过使用创建-运行(built-in features)测试与调试你的关卡和游戏。直接获取实时的反馈信息，只用在编辑器模式下点击开始即可(Play)。你 甚至可以通过编辑模式下的模拟(Simulate)模式来在进行游戏的同时观察、控制元件。若是想要修改游戏代码、重编译并且随时在测试之中更新，那 么可以通过热载入(Hot Reload)来实现。

模拟与测试Simulate & Play

蓝图调试Blueprint Debugging

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Getting\_started\_chn&oldid=2124](https://wiki.unrealengine.com/index.php?title=Getting_started_chn&oldid=2124)"