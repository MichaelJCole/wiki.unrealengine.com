Networking 多人在线游戏之如何测试 - Epic Wiki                    

Networking 多人在线游戏之如何测试
======================

**Rate this Article:**

4.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif) (2 votes)

Approved for Versions:(4.2)

NOTE : WIP, don't delete for this moment, please. Thanks :) 文档编写过程中

Contents
--------

*   [1 概述](#.E6.A6.82.E8.BF.B0)
*   [2 服务器类型](#.E6.9C.8D.E5.8A.A1.E5.99.A8.E7.B1.BB.E5.9E.8B)
*   [3 新建项目并运行测试](#.E6.96.B0.E5.BB.BA.E9.A1.B9.E7.9B.AE.E5.B9.B6.E8.BF.90.E8.A1.8C.E6.B5.8B.E8.AF.95)
    *   [3.1 编辑器(PIE)中运行](#.E7.BC.96.E8.BE.91.E5.99.A8.28PIE.29.E4.B8.AD.E8.BF.90.E8.A1.8C)
    *   [3.2 以Launch方式运行](#.E4.BB.A5Launch.E6.96.B9.E5.BC.8F.E8.BF.90.E8.A1.8C)
    *   [3.3 以发布方式运行](#.E4.BB.A5.E5.8F.91.E5.B8.83.E6.96.B9.E5.BC.8F.E8.BF.90.E8.A1.8C)
*   [4 总结](#.E6.80.BB.E7.BB.93)

概述
--

Unreal Engine中开发网络游戏极为容易，但将C/S同置于一个项目，也许对于很多熟悉编写独立C/S的开发者来说比较不适应。将通过本教程介绍常见的几种多人游戏测试方法。 示例项目：Blueprint Third Person Template

服务器类型
-----

在次之前先简单介绍UE4中两种服务器类型：

*   Listen-Server ：Listen-Server 表示玩家
*   Dedicated-Server ：与我们常见的无异

  

新建项目并运行测试
---------

[![Ue4 network how to test 01.png](https://d26ilriwvtzlb.cloudfront.net/7/75/Ue4_network_how_to_test_01.png)](/File:Ue4_network_how_to_test_01.png)

### 编辑器(PIE)中运行

点击Play右侧的小三角，现在我们主要关注：

[![Ue4 network how to test 02.png](https://d26ilriwvtzlb.cloudfront.net/0/0c/Ue4_network_how_to_test_02.png)](/File:Ue4_network_how_to_test_02.png)

Numbers of Clients : 当我们指定的客户端数量超过1个时，就表示我们想运行多人游戏了，这里最大数量是64，也就是最多支持64人。 Run Dedicated Server: 勾选表示运行独立服务器，不选择则运行Listen Server

[![Ue4 network how to test 03.png](https://d26ilriwvtzlb.cloudfront.net/1/19/Ue4_network_how_to_test_03.png)](/File:Ue4_network_how_to_test_03.png)

点击Play就可以了看到立即实例化两个角色出来了。

[![Ue4 network how to test 04.png](https://d26ilriwvtzlb.cloudfront.net/b/b9/Ue4_network_how_to_test_04.png)](/File:Ue4_network_how_to_test_04.png)

[![Ue4 network how to test 05.png](https://d26ilriwvtzlb.cloudfront.net/c/ca/Ue4_network_how_to_test_05.png)](/File:Ue4_network_how_to_test_05.png)

其他： 根据需要，可以点击Advanced，模拟客户端的窗口的位置与大小。

[![Ue4 network how to test 06.png](https://d26ilriwvtzlb.cloudfront.net/9/9d/Ue4_network_how_to_test_06.png)](/File:Ue4_network_how_to_test_06.png)

虽然PIE测试很简单，但有些情况下PIE并不能满足我们的需求，比如说我们在测试另一个玩家开火的声音，或者看另一个玩家蹲下被爆头的效果等等至少需要两个人才能完成测试的条件下，PIE就难以满足。

[![Ue4 network how to test 07.png](https://d26ilriwvtzlb.cloudfront.net/2/21/Ue4_network_how_to_test_07.png)](/File:Ue4_network_how_to_test_07.png)

### 以Launch方式运行

首先抱歉的是，我不知道该如何命名这个运行方式。

在你的编辑器也就是UE4Editor.exe目录下创建 分别运行客户端、服务端的快捷方式， 右击快捷方式， 加上参数，客户端很简单：127.0.0.1 -game - 示例： C:\\UnrealEngine\\4.2.1\\Engine\\Binaries\\Win64\\UE4Editor.exe D:\\Project\\Unreal\\4.2\\MyTPS\\127.0.0.1 -game

服务端 : Listen Server: Example\_Map?listen -game - 示例： C:\\UnrealEngine\\4.2.1\\Engine\\Binaries\\Win64\\UE4Editor.exe D:\\Project\\Unreal\\4.2\\MyTPS\\MyTPS.uproject Example\_Map?listen -game

Dedicated Server : <MapName> -server -log - 示例： Map5D -server -log

为什么要使用这种方式运行？ 这是最接近编译结果的方式，你可以多人联机测试

  

### 以发布方式运行

发布游戏，我们需要打包游戏资源，编译游戏代码。如果你是刚刚开始学习UE4，这边的资料可能 有些繁杂。

UE4是开源的，就目前而言也是不成熟的，大部分情况下我们使用编译过的编辑器来工作， 不成熟导致我们在从编译好的编辑器下打包游戏时，只有DebugGame/Development/Shipping三 个选项，但没有编译客户端还是服务器的概念。

所以想要以发布的方式运行多人游戏，在本文里只介绍使用Listen Server，如果对如何打包 Dedicated Server感兴趣，可以看看我的另外一篇博文： Unreal Engine 4 Packaging与Cooking游戏项目

总结
--

联系我：[hexcola](/User:Hexcola "User:Hexcola")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Networking\_多人在线游戏之如何测试&oldid=12752](https://wiki.unrealengine.com/index.php?title=Networking_多人在线游戏之如何测试&oldid=12752)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)