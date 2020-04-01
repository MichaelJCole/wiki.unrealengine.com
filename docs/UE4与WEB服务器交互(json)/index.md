UE4与WEB服务器交互(json) - Epic Wiki                     

UE4与WEB服务器交互(json)
==================

**Rate this Article:**

3.75

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_half.gif)![](/extensions/VoteNY/images/star_off.gif) (4 votes)

Approved for Versions:(4.1)

Contents
--------

*   [1 概述](#.E6.A6.82.E8.BF.B0)
*   [2 添加模块和头文件引用](#.E6.B7.BB.E5.8A.A0.E6.A8.A1.E5.9D.97.E5.92.8C.E5.A4.B4.E6.96.87.E4.BB.B6.E5.BC.95.E7.94.A8)
*   [3 创建json数据包](#.E5.88.9B.E5.BB.BAjson.E6.95.B0.E6.8D.AE.E5.8C.85)
*   [4 准备接收json数据包的PHP网页](#.E5.87.86.E5.A4.87.E6.8E.A5.E6.94.B6json.E6.95.B0.E6.8D.AE.E5.8C.85.E7.9A.84PHP.E7.BD.91.E9.A1.B5)
*   [5 POST数据](#POST.E6.95.B0.E6.8D.AE)
*   [6 总结](#.E6.80.BB.E7.BB.93)
*   [7 常见问题及参考](#.E5.B8.B8.E8.A7.81.E9.97.AE.E9.A2.98.E5.8F.8A.E5.8F.82.E8.80.83)

概述
--

制作游戏在很多情况下需要和WEB服务器进行交互，最常见的是在做Demo时需要通过游戏向WEB服务器传递数据（登录/注册验请求），WEB服务器处理（操作数据库）之后返回结果并调用指定的方法。 该教程简单介绍了如何通过UE4向WEB服务器（PHP）发送json数据包及回调方法。

  

添加模块和头文件引用
----------

在代码编辑器中打开项目解决方案，在<Solution Name>/Source/<ProjectName>路径下，找到并打开<ProjectName>.Build.cs文件，添加HTTP模块：

 
PrivateDependencyModuleNames.AddRange(new string\[\] {"HTTP"}); 
PrivateIncludePathModuleNames.AddRange(new string\[\] {"HTTP"});

然后在需要实现该功能的类文件中添加如下的头文件引用:

 
#include "Http.h"
#include "Json.h"

  

创建json数据包
---------

数据内容为：

{ "user" : "StormUnited"}

创建：

 
// Create a writer and hold it in this FString
FString JsonStr;
TSharedRef< TJsonWriter<TCHAR, TCondensedJsonPrintPolicy<TCHAR\> \> \> JsonWriter \= TJsonWriterFactory<TCHAR, TCondensedJsonPrintPolicy<TCHAR\> \>::Create(&JsonStr);
JsonWriter\-\>WriteObjectStart();
JsonWriter\-\>WriteValue(TEXT("user"), TEXT("StormUnited"));
JsonWriter\-\>WriteObjectEnd();
 
// Close the writer and finalize the output such that JsonStr has what we want
JsonWriter\-\>Close();

至此，json数据包准备完成。

  

准备接收json数据包的PHP网页
-----------------

本示例中使用了PHP，你可以选择使用搭建动态网站或者服务器的开源软件，比如说wamp/lamp等在本机上建立一个WEB服务器来解析PHP页面。 创建mywebpage.php文件，并添加如下代码：

<?php
     // 首先接收上传的数据
     $post\_data \= file\_get\_contents('php://input');
     // 解析json字符串
     $obj \= json\_decode($post\_data);
     // 获取包含在Json字符串中的数据
     echo $obj\->{'user'};
?>

  

POST数据
------

将通过如下的代码将上面准备好的json数据包提交给 [http://localhost/mywebpage.php](http://localhost/mywebpage.php)

*   SetHeader：可以设置POST数据的格式
*   SetURL：可以指定用于处理上传数据的链接
*   SetVerb：可以设置POST/PUT/GET
*   SetContentAsString：用于填充上传的数据内容
*   OnProcessRequestComplete().BindUObject 用于指定在发送请求之后的回调方法。

TSharedRef<IHttpRequest\> HttpRequest \= FHttpModule::Get().CreateRequest();
HttpRequest\-\>SetHeader(TEXT("Content-Type"), TEXT("application/json; charset=utf-8"));
HttpRequest\-\>SetURL(TEXT("http://localhost/mywebpage.php"));
HttpRequest\-\>SetVerb(TEXT("POST"));
HttpRequest\-\>SetContentAsString(JsonStr);
HttpRequest\-\>OnProcessRequestComplete().BindUObject(this, &ASUMiniGameMode::HttpCompleteCallback);
HttpRequest\-\>ProcessRequest();

  
关于回调函数的结构：void HttpCompleteCallback(FHttpRequestPtr Request, FHttpResponsePtr Response, bool bWasSuccessful); 示例：

void ASUMiniGameMode::HttpCompleteCallback(FHttpRequestPtr Request, FHttpResponsePtr Response, bool bWasSuccessful)
{
     FString MessageBody \= "";
 
     // If HTTP fails client-side, this will still be called but with a NULL shared pointer!
     if (!Response.IsValid())
     {
          MessageBody \= "{\\"success\\":\\"Error: Unable to process HTTP Request!\\"}";
     }
     else if (EHttpResponseCodes::IsOk(Response\-\>GetResponseCode()))
     {
          MessageBody \= Response\-\>GetContentAsString();
     }
     else
     {
          MessageBody \= FString::Printf(TEXT("{\\"success\\":\\"HTTP Error: %d\\"}"), Response\-\>GetResponseCode());
     }
}

一旦发送出请求后肯定会调用HttpCompleteCallback方法，WEB服务器处理的数据结果包含在Response参数中，可以通过Response->GetContentAsString()来获取返回的字符串，比如在本例中是StormUnited。

总结
--

联系我：[hexcola](/User:Hexcola "User:Hexcola")

常见问题及参考
-------

*   [https://answers.unrealengine.com/questions/4383/sending-an-fstring-via-sockets.html](https://answers.unrealengine.com/questions/4383/sending-an-fstring-via-sockets.html)
*   [https://answers.unrealengine.com/questions/4406/need-help-with-json-objects.html](https://answers.unrealengine.com/questions/4406/need-help-with-json-objects.html)
*   [https://answers.unrealengine.com/questions/2830/best-way-to-perform-a-http-request.html](https://answers.unrealengine.com/questions/2830/best-way-to-perform-a-http-request.html)
*   [https://answers.unrealengine.com/questions/3530/does-httprequest-use-httpmanager-by-default.html](https://answers.unrealengine.com/questions/3530/does-httprequest-use-httpmanager-by-default.html)
*   [https://answers.unrealengine.com/questions/2830/best-way-to-perform-a-http-request.html](https://answers.unrealengine.com/questions/2830/best-way-to-perform-a-http-request.html)
*   [https://answers.unrealengine.com/questions/23170/making-http-calls.html](https://answers.unrealengine.com/questions/23170/making-http-calls.html)
*   [https://answers.unrealengine.com/questions/31079/http%E9%80%9A%E4%BF%A1%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6.html](https://answers.unrealengine.com/questions/31079/http%E9%80%9A%E4%BF%A1%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6.html)
*   [https://answers.unrealengine.com/questions/26704/trouble-deserializing-json.html](https://answers.unrealengine.com/questions/26704/trouble-deserializing-json.html)
*   [https://answers.unrealengine.com/questions/2830/best-way-to-perform-a-http-request.html](https://answers.unrealengine.com/questions/2830/best-way-to-perform-a-http-request.html)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UE4与WEB服务器交互(json)&oldid=12751](https://wiki.unrealengine.com/index.php?title=UE4与WEB服务器交互(json)&oldid=12751)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)