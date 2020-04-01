Dynamic Depth of Field TR - Epic Wiki                    

Dynamic Depth of Field TR
=========================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:4.0 to 4.7.5

Contents
--------

*   [1 Genel Bakış](#Genel_Bak.C4.B1.C5.9F)
*   [2 Blueprint Hazırlama](#Blueprint_Haz.C4.B1rlama)
    *   [2.1 Eventler](#Eventler)
    *   [2.2 Trace Hit Sonucu ve Odak Mesafesi](#Trace_Hit_Sonucu_ve_Odak_Mesafesi)
    *   [2.3 Post Process Ayarları](#Post_Process_Ayarlar.C4.B1)
*   [3 Sonuç ve Notlar](#Sonu.C3.A7_ve_Notlar)

Genel Bakış
-----------

[![DoF 5.jpg](https://d26ilriwvtzlb.cloudfront.net/e/e9/DoF_5.jpg)](/File:DoF_5.jpg)

**Dinamik Odak Derinliği** FPS oyunlarında şarjör değiştirirken veya gez & arpacıktan nişan alırken(ironsight) görüş alanının kalanının netliğini düşürmeye yarayan bir efekttir. Oyun dışında sahnelerinizde screenshot alırken veya animasyon kaydederken de sürekli post process değerleriyle uğraşmanıza gerek kalmadan odaklama yapmanızı sağlar.

Aşağıda bu efekti **TP\_FirstPersonBP** örnek projesinin oyuncu kamerasına nasıl entegre edebileceğinizi anlatacağım. Sonra buradan yola çıkarak sistemi istediğiniz kameraya uygulayabilirsiniz.

Blueprint Hazırlama
-------------------

Hazırlayacağımız Blueprint kodunun tamamı şu şekilde olacak:

[![DoF 6.JPG](https://d3ar1piqh1oeli.cloudfront.net/6/6e/DoF_6.JPG/360px-DoF_6.JPG)](/File:DoF_6.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:DoF_6.JPG "Enlarge")

  

Şimdi detaya girelim.

  

### Eventler

[![DoF 7.JPG](https://d26ilriwvtzlb.cloudfront.net/2/21/DoF_7.JPG)](/File:DoF_7.JPG)

  

**Event Tick** ve **Input(Right Mouse Button)** olmak üzere iki adet event kullanacağız. Bu efektin sürekli aktif olmasını istemediğimiz için sağ fare tuşunu(Right Mouse Button) kullanarak kameradan doğrusal bir çizgi(line trace) ateşleyeceğiz, bu da bize odak noktasında bir obje varsa hangi obje ve nerede olduğunu verecek. Sağ fare tuşunu bıraktığımızda ise Timeline'ı geriye sararak odaklama efektini durduracak. Takip eden bölümlerde göreceğimiz üzere Event Tick aynı zamanda kameranın post process ayarlarını güncelleyecek.

Trace Distance isimli node kalabalık olmasın diye daraltılmış(Collapse) bir gruptur. Açılmış halini aşağıda görebilirsiniz:

[![Collapsed TraceDistance.JPG](https://d3ar1piqh1oeli.cloudfront.net/0/0f/Collapsed_TraceDistance.JPG/720px-Collapsed_TraceDistance.JPG)](/File:Collapsed_TraceDistance.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:Collapsed_TraceDistance.JPG "Enlarge")

  

Return Value 1 kameranın konumu, 5000 ise takip edeceğimiz(Line Trace ile) maksimum uzaklıktır.

  

### Trace Hit Sonucu ve Odak Mesafesi

[![DoF 8.JPG](https://d26ilriwvtzlb.cloudfront.net/2/2a/DoF_8.JPG)](/File:DoF_8.JPG)

  

0.0'dan 0.5'e yükselen float track'i olan 1 saniye uzunluğunda bir Timeline kullanacağız. Bu aynı zamanda efekti açıp kapatmaya yarayacak. Her tick(işlemci zamanı) yaptırdığımız Line Trace bize bir boolean değişkeni verir. Boolean doğru(True) ise Blueprint'teki işlemlerimiz devam eder, yanlış(False) ise efekti durdurmak için Timeline başa sarılır.

Eğer Line Trace bir objeye isabet ederse çıkan sonucu açarız(Break Hit Result) ve oradan temas konumunu(Hit Location) alırız. Kamera ve temas noktası arasındaki mesafeyi hesaplamak için aşağıda görmüş olduğunuz makroyu kullanacağız:

[![FocusDistance Macro.JPG](https://d26ilriwvtzlb.cloudfront.net/8/83/FocusDistance_Macro.JPG)](/File:FocusDistance_Macro.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:FocusDistance_Macro.JPG "Enlarge")

  

Veya Vector Length node'unu kullanabilirsiniz. Kameranın konumunu odak noktasının konumundan çıkartın(Vector > Subtract) ve çıkan sonucu Vector Length'e bağlayın. Böylece yine aynı mesafeyi elde edebilirsiniz.

Şimdi istediğimiz verilere sahip olduğumuza göre bu verileri kameranın odak derinliği(depth of field) ayarlarını değiştirmek için kullanabiliriz.

  

### Post Process Ayarları

[![DoF 9.JPG](https://d26ilriwvtzlb.cloudfront.net/9/9e/DoF_9.JPG)](/File:DoF_9.JPG)

  

Önce kameranın post process ayarlarını alacağız, bu da odak mesafeleri arasındaki fark fazla ise yumuşak bir geçiş olmasını sağlayacak son odak mesafesi(last focal distance) değerini verecek.

Break/Make post process node'larını çıkartmak için;

1.  Önce kameranızın değişkenini çağırın. **Get First Person Camera**
2.  Kamera değişkeninin çıkışından imleci sürükleyip açılan menüden post process ayarlarını alın. **Get Post Process Settings**
3.  Post process ayarlayından sürükleyin ve **Break and Make PostProcessSettings** node'larını göreceksiniz.

Şimdi Break Postprocesssettings node'unun Details panelinden sadece Depth of Field Focal Distance ayarını etkinleştirin. Node üzerinde daha rahat çalışabilmeniz için bütün ayarları kapatıp(Details panelinden) sadece ihtiyacınız olanları etkinleştirmeniz iyi olur. Depth of Field Focal Distance değerini alıp Last Focus isimli bir değişkene dönüştürdüğümüz saman(Set) bu değer son odak mesafemiz olacaktır. Son olarak, son odak mesafesi ve temas noktası arasında yumuşak bir geçiş elde etmek için **FInterp To** node'unu kullanacağız.

  

Sonuç ve Notlar
---------------

Anlatılan ve gördüğünüz herşeyi yaptığınızda sağ fare tuşuna her basışınızda şöyle bir efekt göreceksiniz:

[Final Result](https://www.youtube.com/watch?v=rEargI8dNFk)

  
Bu fonksiyona sahip karakter Blueprinti olan örnek bir projeyi [**buradan**](https://drive.google.com/file/d/0B0LlbsIm3HuuTzNQZUJSQmkzR0k/view?usp=sharing) indirebilirsiniz.

  
**Notlar:**

*   Interp Speed(geçiş hızı) değerini kullanmak isteğe bağlıdır ama kullanılmasını tavsiye ederim.
*   Near ve Far Transition değerlerini istdiğiniz gibi belirleyebilirsiniz. Daha yumuşak bir geçiş için değere ekleyin(Add), keskin bir geçiş için değerden çıkartın(Subtract.)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Dynamic\_Depth\_of\_Field\_TR&oldid=14726](https://wiki.unrealengine.com/index.php?title=Dynamic_Depth_of_Field_TR&oldid=14726)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Blueprint](/Category:Blueprint "Category:Blueprint")
*   [Türkçe](/index.php?title=Category:T%C3%BCrk%C3%A7e&action=edit&redlink=1 "Category:Türkçe (page does not exist)")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)