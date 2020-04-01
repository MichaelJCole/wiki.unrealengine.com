Landscape - Sizes and Height Guide TR - Epic Wiki                    

Landscape - Sizes and Height Guide TR
=====================================

  
Orjinal Metin: [Landscape - Sizes and Height Guide](https://wiki.unrealengine.com/Landscape_-_Sizes_and_Height_Guide)

Buradaki bilgiler Unreal Landscape aracının resmi dökümanına ek olarak hazırlanmıştır. Bu dökümanın yardımıyla istediğiniz boyut ve vertex/metre çözünürlüğünde arazi yaratıp ihtiyacınız olan yükseklikte dağlar ve tepeler yapabileceksiniz.

  

Landscape(Arazi) Temelleri
--------------------------

Her arazi 1 metreye 1 vertex yoğunluğunda olacak şekilde bölünmüş bir düzlemden oluşur.  
Z boyutunda(Scale)100 birim olduğu zaman yükseklik -256 : 256 metre aralığında sınırlanır.  
Bu temel kuralları kavradığınızda istediğiniz yükseklik ve çözünürlükte arazi yaratmanız mümkündür.

  

Genişlik ve Yükseklik Arttırma
------------------------------

Eğer 2km genişliğinde bir arazi istiyorsanız ve 2 metreye 1 vertex çözünürlüğü yeterli ise ve dağ/tepelerin 512 metre yüksekliğinde olmasını istiyorsanız şunları yapmanız gerekir:

1.  1009x1009 çözünürlüğünde yeni bir arazi oluşturun(önerilen arazi çözünürlükleri için [bu sayfayı](https://docs.unrealengine.com/latest/INT/Engine/Landscape/TechnicalGuide/index.html#recommendedlandscapesizes) kullanabilirsiniz.
2.  X boyutunu(Scale) 200 olarak belirleyin.
3.  Bu aşamadan sonra araziniz artık merkezde yer almayacak. Eğer tekrar merkeze oturtmak isterseniz x ve y konumlarını ayarlamanız gerekli. Arazinin boyutunu iki katına çıkarttığımız için şu anki ölçüsü 1009\*2 = 2018m = 201800cm(1cm = 1UE birimi), bunu da ikiye bölün (201800/2 = 100900) ve bu değeri x ve y konumlarına EKSİ değer olarak girin.
4.  Varsayılan yükseklik limiti 100 Z boyutunda 256'dır. O yüzden limiti 512'ye çıkartmak için tek yapmanız gereken Z boyutunu 2 ile çarpmak, bu da demek oluyor ki Z = 200.
5.  Şimdi arazinizi istediğiniz gibi şekillendirebilirsiniz.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Landscape\_-\_Sizes\_and\_Height\_Guide\_TR&oldid=14782](https://wiki.unrealengine.com/index.php?title=Landscape_-_Sizes_and_Height_Guide_TR&oldid=14782)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Landscape](/Category:Landscape "Category:Landscape")
*   [Türkçe](/index.php?title=Category:T%C3%BCrk%C3%A7e&action=edit&redlink=1 "Category:Türkçe (page does not exist)")

  ![](https://tracking.unrealengine.com/track.png)