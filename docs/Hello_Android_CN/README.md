Hello Android CN - Epic Wiki                    

Hello Android CN
================

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:(please verify)

NOTE:Editing 这篇教程将指导你用UE4创建一个简单的旋转立方体,并把他部署到安卓设备上. 先决条件:已安装Android SDK, JDK,Ant. 请参阅[这里](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/)

  

Contents
--------

*   [1 关卡创建](#.E5.85.B3.E5.8D.A1.E5.88.9B.E5.BB.BA)
*   [2 项目设置](#.E9.A1.B9.E7.9B.AE.E8.AE.BE.E7.BD.AE)
*   [3 打包游戏](#.E6.89.93.E5.8C.85.E6.B8.B8.E6.88.8F)
*   [4 创建我们的立方体](#.E5.88.9B.E5.BB.BA.E6.88.91.E4.BB.AC.E7.9A.84.E7.AB.8B.E6.96.B9.E4.BD.93)
*   [5 最后](#.E6.9C.80.E5.90.8E)

关卡创建
----

打开UE4,创建一个新的空项目,并命名"HelloAnd".请保证"Include started content"是未选中的. 虚幻引擎将自动为我们生成一个简单的关卡,我们需要保存它.从"File(文件)"菜单选择Save,在"HelloAnd/Content"下创建一个Levels文件夹, 然后我们把这个关卡保存在这里.

项目设置
----

我们需要为项目应用一些改动.

1.  打开Project Settings (Edit -> Project Settings…)
2.  在描述页,你可以输入游戏有关的信息.
3.  在Map&Modes页,你可以改变默认地图.
4.  在默认地图节,改变默认地图为你保存好的关卡名字.
5.  同样设置应用于编辑器启动地图和服务器默认地图.
6.  你需要配置项目的安卓平台配置,在安卓页,有个红色警告,"Project is not configured for the android platform",点击后面的"Configure Now" 按钮.

*   如果你的设备不支持Mobile HDR,取消选中"Mobile HDR"(在渲染页,有'Mobile section',下面有个复选框"Mobile HDR").

  

[![](https://d26ilriwvtzlb.cloudfront.net/2/2c/HelloAnd1.png)](/File:HelloAnd1.png)

Project Settings - Game - Description

[![](https://d26ilriwvtzlb.cloudfront.net/3/35/HelloAnd2.png)](/File:HelloAnd2.png)

Project Settings - Game - Maps & modes

[![](https://d26ilriwvtzlb.cloudfront.net/5/5f/HelloAnd3.png)](/File:HelloAnd3.png)

Project Settings - Platforms - Android

  
点击"Set as Default"保存改动,现在我们已经准备好打包我们的安卓游戏了,让我们开始吧!

打包游戏
----

连接你的安卓设备到电脑,确认已经打开"USB调试模式".UE4会自动发现你的手机,并部署到上面. 下一步点击编辑器上的"Launch"后面的小三角(▼),下拉菜单里有所有可用设备,包括你的计算机名和你的手机名.UE4会自动部署当前关卡到目标设备.

[![HelloAndDeploytoAndriod.png](https://d3ar1piqh1oeli.cloudfront.net/7/77/HelloAndDeploytoAndriod.png/500px-HelloAndDeploytoAndriod.png)](/File:HelloAndDeploytoAndriod.png)

  

创建我们的立方体
--------

我们需要为我们的立方体创建blueprint.在Content Browser中创建一个Blueprints文件夹,在这个文件夹下创建一个新的Blueprint,命名为"BP\_RotatingCube".打开"BP\_RotatingCube",在"Components"节我们添加一个静态网格,这将是我们的blueprint的根节点,命名为MyCube.在Static Mesh的详情面板,点击下拉小三角,一个小号的Content Browser会弹出,在底部右边会有"View Options",点击它,选中"Show Engine Content".现在我们可以看到所有虚幻内建的内容了.找到Cube(或者直接在搜索框输入). [![HelloAnd5.png](https://d3ar1piqh1oeli.cloudfront.net/8/81/HelloAnd5.png/250px-HelloAnd5.png)](/File:HelloAnd5.png) [![HelloAnd6.png](https://d3ar1piqh1oeli.cloudfront.net/d/d1/HelloAnd6.png/250px-HelloAnd6.png)](/File:HelloAnd6.png)

  
切换到"Graph"节,创建一个新的变量,命名"RotationSpeed".设置它的默认值为100.0.(你需要编译blueprint使其生效) [![HelloAnd7.png](https://d3ar1piqh1oeli.cloudfront.net/9/99/HelloAnd7.png/250px-HelloAnd7.png)](/File:HelloAnd7.png)

  

我们想让立方体绕Y轴以固定速度旋转,blueprint 需要如下设置:

[![](https://d26ilriwvtzlb.cloudfront.net/1/17/HelloAnd8.png)](/File:HelloAnd8.png)

Final Blueprint

  

保存blueprint.

  
保存blueprint 之后,你可以拖放"BP\_RotatingCube"到关卡中,点击Play查看结果.

[![Final Level](https://d3ar1piqh1oeli.cloudfront.net/3/3a/HelloAndFinal.png/750px-HelloAndFinal.png)](/File:HelloAndFinal.png "Final Level")

  
打包游戏,生成apk文件:打开'File -> Package Project'菜单,选择'Android,选择一个目标文件夹,UE4会为你生成这个apk文件.

[![HelloAnd9.png](https://d3ar1piqh1oeli.cloudfront.net/a/a8/HelloAnd9.png/250px-HelloAnd9.png)](/File:HelloAnd9.png)

最后
--

我们的安卓设备上有了一个漂亮的旋转立方体游戏.

  

[![HelloAndOnDevice.JPG](https://d26ilriwvtzlb.cloudfront.net/6/6d/HelloAndOnDevice.JPG)](/File:HelloAndOnDevice.JPG)

(Original Author: [Taesiri](/index.php?title=User:Taesiri&action=edit&redlink=1 "User:Taesiri (page does not exist)")) (CN Translate: [YanYuHongChen](/index.php?title=User:YanYuHongChen&action=edit&redlink=1 "User:YanYuHongChen (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Hello\_Android\_CN&oldid=8592](https://wiki.unrealengine.com/index.php?title=Hello_Android_CN&oldid=8592)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)