Intro To Materials (Tutorial) TR - Epic Wiki                    

Intro To Materials (Tutorial) TR
================================

Genel Bakış
-----------

Orjinal Metin: [Intro To Materials (Tutorial)](/Intro_To_Materials_(Tutorial) "Intro To Materials (Tutorial)")

Materyal Editörü Unreal Engine içinde pek çok efekt yaratmanızı sağlayan çok etkili bir araçtır. Bu dökümanda birkaç basit materyal efektini nasıl yaratabileceğinizi göreceksiniz.

Bu ders nasıl Texture import edildiğini bildiğinizi varsaymaktadır.

Yeni Bir Materyal Yaratma
-------------------------

Texture'larınızı Content Browser içine aktardıktan sonra materyalinizi yaratabilirsiniz. Content Browser içindeki siyah alanın herhangi bir yerinde sağa tıklayın ve Material(Materyal)'ı seçin.

[![NewMaterial.png](https://d3ar1piqh1oeli.cloudfront.net/2/27/NewMaterial.png/940px-NewMaterial.png)](/File:NewMaterial.png)

[![](/skins/common/images/magnify-clip.png)](/File:NewMaterial.png "Enlarge")

  

Böylece yeni bir materyal asset'i oluşturmuş olursunuz. Materyal üzerinde çift tıklayıp Materyal Editörünü açın.

[![Mat TutStone.png](https://d26ilriwvtzlb.cloudfront.net/3/37/Mat_TutStone.png)](/File:Mat_TutStone.png)

[![](/skins/common/images/magnify-clip.png)](/File:Mat_TutStone.png "Enlarge")

  

Materyal Editörü
----------------

Materyal editörü içindeyken "T" ye basılı tutup siyah alanda herhangi bir yere tıkladığınızda Content Browser içinde o an seçili olan texture'ı içeren bir Texture Sample node'u oluşturabilirsiniz. Diffuse(renk bilgisini içeren texture'ınız) ve Normal texture'larını bu şekilde editöre ekleyip Base Color ve Normal girişlerine bağlayın. Bu size ışığa göre tepki veren kabarık detayların olduğu bir yüzey verecektir.

[![BasicMaterial 1.png](https://d3ar1piqh1oeli.cloudfront.net/2/2c/BasicMaterial_1.png/940px-BasicMaterial_1.png)](/File:BasicMaterial_1.png)

[![](/skins/common/images/magnify-clip.png)](/File:BasicMaterial_1.png "Enlarge")

  

Aynı zamanda bir maske veya yükseklik bilgisi içeren texture(heightmap) ekleyerek kabartma kaçıklığı/paralaks efekti verebilirsiniz. Farenin sağ tuşuna tıklayıp Utility > BumpOffset'i seçin, ardından maskenizin kırmızı kanalını bump offset'in yükseklik(height) girişine, bump offset'in çıkışını da renk ve normal texture'larınızın UV girişine bağlayın.

[![BasicMaterial 2.png](https://d3ar1piqh1oeli.cloudfront.net/e/e1/BasicMaterial_2.png/940px-BasicMaterial_2.png)](/File:BasicMaterial_2.png)

[![](/skins/common/images/magnify-clip.png)](/File:BasicMaterial_2.png "Enlarge")

  

Basit bir parlaklık etkisi elde etmek için "1" e basılı tutarak siyah alanda tıklayıp bir sabit sayı(Constant) yaratın. Ardından bunu seçip sol taraftaki Details panelinden değerini 0.5 olarak girin ve node'u Specular(Yansıma) ve Roughness(Sertlik) girişlerine bağlayın. Böylece materyaliniz yarı parlak bir hale gelip biraz ışık yansıtma özelliğine sahip olur.

[![BasicMaterial 3.png](https://d3ar1piqh1oeli.cloudfront.net/1/16/BasicMaterial_3.png/940px-BasicMaterial_3.png)](/File:BasicMaterial_3.png)

[![](/skins/common/images/magnify-clip.png)](/File:BasicMaterial_3.png "Enlarge")

  

Kullandığımız maske texture'ına kontrast vermenin en iyi yollarından birisi siyah alanda sağa tıklayıp **Math > LinearInterpolate** (veya "L" ye basılı tutup siyah alanda tıklayarak) node'u oluşturmaktır. Maskenin kırmızı kanalını Lerp node'unun Alpha girişine bağlayın. "1" tuşuna basıp siyah alanda iki kere tıklayarak 2 adet sabit sayı(Scalar Constant) oluşturun. Birine 0.1 ve diğerine 0.5 değerlerini vererek bunları Lerp'ün A ve B girişlerine bağlayın. Lerp'ün çıkışını Specular girişine bağladıktan sonra değerlerle oynayıp istediğiniz gibi bir görüntü elde edebilirsiniz.

[![BasicMaterial 4.png](https://d3ar1piqh1oeli.cloudfront.net/d/dd/BasicMaterial_4.png/940px-BasicMaterial_4.png)](/File:BasicMaterial_4.png)

[![](/skins/common/images/magnify-clip.png)](/File:BasicMaterial_4.png "Enlarge")

  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Intro\_To\_Materials\_(Tutorial)\_TR&oldid=14773](https://wiki.unrealengine.com/index.php?title=Intro_To_Materials_(Tutorial)_TR&oldid=14773)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Material](/Category:Material "Category:Material")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")
*   [Getting Started](/Category:Getting_Started "Category:Getting Started")
*   [Türkçe](/index.php?title=Category:T%C3%BCrk%C3%A7e&action=edit&redlink=1 "Category:Türkçe (page does not exist)")

  ![](https://tracking.unrealengine.com/track.png)