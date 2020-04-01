Merhaba Android - Epic Wiki                    

Merhaba Android
===============

**Rate this Article:**

5.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif) (one vote)

Approved for Versions:(please verify)

Orjinal Metin: [Hello Android](/Hello_Android "Hello Android")

Bu ders sizlere Unread Engine 4 içerisinde basit dönen bir küp oluşturmayı ve Android cihazında çalıştırmayı gösterecek.

Koşullar: Android SDK, JDK, ve kurulmuş Ant. Burda bulunan linkte dersi görebilirsiniz [Link](https://docs.unrealengine.com/latest/INT/Platforms/Android/GettingStarted/). Hadi başlayalım!

Contents
--------

*   [1 Harita Ayarları](#Harita_Ayarlar.C4.B1)
*   [2 Proje Ayarları](#Proje_Ayarlar.C4.B1)
*   [3 Oyunu Paketleme](#Oyunu_Paketleme)
*   [4 Hadi küpümüzü oluşturalım](#Hadi_k.C3.BCp.C3.BCm.C3.BCz.C3.BC_olu.C5.9Ftural.C4.B1m)
*   [5 Sonuç](#Sonu.C3.A7)

Harita Ayarları
---------------

Unreal Engine 4'ü açın ve yeni bir boş proje oluşturup "HelloAnd" diye adlandırın. "_Include started content_"in seçili olmadığından emin olun. Unreal bizim için basit bir harita oluşturacak, kaydetmemiz lazım. 'File' sekmesinden 'Save' butonuna basın ve "HelloAnd/Content" içerisinde "Levels" isimli bir klasörü seçin, haritanız için bir isim seçin ve kaydedin. Ben haritama "master" adını vereceğim.

  

Proje Ayarları
--------------

Proje ayarlarında bazı değişiklikler yapmamız gerekecek.

1.  "Project Settings"i açın (Edit -> Project Settings…)
2.  Description alanının altına bir kaç bilgi girin.
3.  Map & Modes alanının altında "Default" haritasını değiştirin.
    
    Default Maps alanının alt kısmında bulunan "Game Default Map" seçeneğini az önce oluşturduğunuz haritayı seçerek onaylayın.(Benim haritam "master" olduğu için onu seçiyorum.)
    
    Editor Startup Map ve Server Default Map için aynı işlemleri yapın.
    
4.  Android Platform'u için yapılandırma yapmamız lazım, Android sekmesinin altında kırmızı şöyle bir uyarı göreceksiniz. "Project is not configured for the android platform" ve burada "Configure Now" butonu bulunmakta. "Configure Now" butonuna basın.

*   Eğer akıllı telefonunuz Mobile HDR desteklemiyorsa; 'Mobile HDR' özelliğini kapatın.('Rendering' sekmesi altında, 'Mobile section' mevcut."Mobile HDR" seçeneği).

  

[![](https://d26ilriwvtzlb.cloudfront.net/2/2c/HelloAnd1.png)](/File:HelloAnd1.png)

Project Settings - Game - Description

[![](https://d26ilriwvtzlb.cloudfront.net/3/35/HelloAnd2.png)](/File:HelloAnd2.png)

Project Settings - Game - Maps & modes

[![](https://d26ilriwvtzlb.cloudfront.net/5/5f/HelloAnd3.png)](/File:HelloAnd3.png)

Project Settings - Platforms - Android

Değişiklikleri kaydetmek için "**Set as Default**" butonuna tıklayın. Şimdi oyunu android'e paketlemek için hazırız! Hadi yapalım!

Oyunu Paketleme
---------------

Android cihazınızı bilgisayarınıza bağlayın.**USB Debug Mode** modunun aktif olduğundan emin olun. Unreal Editor'ü cihazınızı otomatik olarak bulacaktır, bu durumda haritayı telefonunuzda açabileceksiniz.Ana Editör penceresinde bulunan “Launch" butonunun yanında açılır pencere(▼) mevcut. Tüm cihazlar orda listelenmiş durumda. Orada telefonunuzun ve bilgisayarınızın ismi olacak. Unreal Engine otomatik olarak haritayı cihazınıza aktarır.

  

[![HelloAndDeploytoAndriod.png](https://d3ar1piqh1oeli.cloudfront.net/7/77/HelloAndDeploytoAndriod.png/500px-HelloAndDeploytoAndriod.png)](/File:HelloAndDeploytoAndriod.png)

  

Hadi küpümüzü oluşturalım
-------------------------

Küpümüz için Blueprint oluşturmamız lazım. Content Browser içerisinde, yeni bir klasör oluşturun ve "Blueprints" adını verin. Blueprints klasörünün içinde yeni bir Blueprint oluşturun ve "BP\_RotatingCube" olarak adlandırın. "BP\_RotatingCube"'ü açın, "Components" sekmesinin altına Static Mesh eklememiz gerekli; bu bizim Blueprint'imiz için temel olacaktır, MyCube ismini verin. Details Panel sekmesinde bulunan Static Mesh alanında açılır menüye tıklayın, Content Browser'ın küçük hali açılacaktır. Açılan pencerenin sağ alt kısmında "View Options" seçeneği mevcut, onu seçin ve, "Show Engine Content" kutusuna tikleyin. Bu seçenek Unreal'ın oluşturduğu tüm meshleri görmemizi sağlar. Küpü bulun (veya sadece arama kutusuna "Cube" yazın).

  
[![HelloAnd5.png](https://d3ar1piqh1oeli.cloudfront.net/8/81/HelloAnd5.png/250px-HelloAnd5.png)](/File:HelloAnd5.png) [![HelloAnd6.png](https://d3ar1piqh1oeli.cloudfront.net/d/d1/HelloAnd6.png/250px-HelloAnd6.png)](/File:HelloAnd6.png)

  
"Graph" kısmına geçin. Yeni bir Variable oluşturun ve adını "RotationSpeed" Yapın.Default Value kısmını 100.0'e ayarlayın. ("Default Value" alanını görebilmek için Blueprint içinde "Compile" butonuna basmanız gerek.)

[![HelloAnd7.png](https://d3ar1piqh1oeli.cloudfront.net/9/99/HelloAnd7.png/250px-HelloAnd7.png)](/File:HelloAnd7.png)

  
Küpü Y ekseninde çevirmek için, aşağıda bulunan Blueprint'i uygulayın:

[![](https://d26ilriwvtzlb.cloudfront.net/1/17/HelloAnd8.png)](/File:HelloAnd8.png)

Final Blueprint

  

Ardından kaydedin.

"BP\_RotatingCube"ü kaydettikten sonra Content Browser'dan, haritanıza blueprint'i sürükleyip bırakın. Sonuçları görmek için "Play" butonuna basın.

[![Final Level](https://d3ar1piqh1oeli.cloudfront.net/3/3a/HelloAndFinal.png/750px-HelloAndFinal.png)](/File:HelloAndFinal.png "Final Level")

  
Oyunu paketlemek için ve _\*.apk_ dosyasını oluşturmak için, 'File -> Package Project' menüsüne gidin ve 'Android' seçeneğini seçin. İstediğiniz klasörü seçin ve Unreal Engine sizin için seçilen klasöre _\*.apk_ dosyasınız oluşturacaktır.

[![HelloAnd9.png](https://d3ar1piqh1oeli.cloudfront.net/a/a8/HelloAnd9.png/250px-HelloAnd9.png)](/File:HelloAnd9.png)

Sonuç
-----

Android cihazımızda güzel bir dönen küpümüz var.

  

[![HelloAndOnDevice.JPG](https://d26ilriwvtzlb.cloudfront.net/6/6d/HelloAndOnDevice.JPG)](/File:HelloAndOnDevice.JPG)

(Original Author: [Taesiri](/index.php?title=User:Taesiri&action=edit&redlink=1 "User:Taesiri (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Merhaba\_Android&oldid=15262](https://wiki.unrealengine.com/index.php?title=Merhaba_Android&oldid=15262)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")
*   [Türkçe](/index.php?title=Category:T%C3%BCrk%C3%A7e&action=edit&redlink=1 "Category:Türkçe (page does not exist)")
*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)