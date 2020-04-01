Platform Staging Sandbox - Epic Wiki             

Platform Staging Sandbox
========================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

Here is [Epic's Android Device Compatibility page](https://docs.unrealengine.com/latest/INT/Platforms/Android/DeviceCompatibility/index.html).

This page is a place for the community to provide feedback on Android devices they have run UE4 on. Please add devices under the appropriate GPU family or add one if it doesn't exist. If you're not sure what GPU the phone has, make sure you provide the specific model number and maybe others can add that information!

[Performance tiers are explained here.](https://docs.unrealengine.com/latest/INT/Platforms/Mobile/Performance/index.html#performancetiers)

Legend:  

**LDR** - Low Dynamic Range. The highest performance tier supported in UE4 and is recommended for games that do not require lighting or postprocessing features  

**Basic Lighting** - Leverages static lighting and fully rough Materials to create levels with interesting lighting while maximizing performance to reach a broader range of mobile devices  

**Full HDR** - High Dynamic Range. Take advantage of most of the HDR lighting features available for mobile in UE4 as well as some of the postprocessing features. Using these features requires quite a bit of performance in exchange for high quality lighting features.  

**Full HDR w/ Sun** - This tier is the same as the 'Full HDR' tier and has the same advantages and recommendations except that a single directional light is rendered at much higher quality  

Contents
--------

*   [1 Device List](#Device_List)
*   [2 Device Specific Notes](#Device_Specific_Notes)
    *   [2.1 Samsung Galaxy Fascinate SCH-I500](#Samsung_Galaxy_Fascinate_SCH-I500)
    *   [2.2 Samsung Nexus S GT-I9020](#Samsung_Nexus_S_GT-I9020)
    *   [2.3 Kindle Fire HDX](#Kindle_Fire_HDX)
    *   [2.4 Qualcomm Adreno 320](#Qualcomm_Adreno_320)
        *   [2.4.1 Samsung Galaxy S4 SGH-I337](#Samsung_Galaxy_S4_SGH-I337)
        *   [2.4.2 Xiaomi MI-2S](#Xiaomi_MI-2S)

Device List
-----------

Device

Model

4.1 Supported

Tappy Chicken

4.3 Supported (Current)

4.4 Supported

Tappy Chicken 4.4

Driver

Nexus 5

Nexus 5

Basic Lighting/Full HDR\*

Runs

Basic Lighting/Full HDR\*

Passed functional testing

Runs

[http://developer.android.com/sdk/win-usb.html#download](http://developer.android.com/sdk/win-usb.html#download)

Nexus 7 (2012)

ASUS-1B32

Basic Lighting/Full HDR\*

Runs

Does not run

[http://www.asus.com/Tablets\_Mobile/Nexus\_7/HelpDesk\_download/](http://www.asus.com/Tablets_Mobile/Nexus_7/HelpDesk_download/)

Kindle Fire HDX

KFAPWI

Basic Lighting/Full HDR\*

Runs

Basic Lighting/Full HDR\*

[https://developer.amazon.com/post/Tx3RZFBU0KJTSWS/Setting-up-the-ADB-driver-for-Kindle-Fire-Devices.html](https://developer.amazon.com/post/Tx3RZFBU0KJTSWS/Setting-up-the-ADB-driver-for-Kindle-Fire-Devices.html)

Samsung Galaxy S 4

S4 SGH-I337

Basic Lighting/Full HDR\*

Runs

Basic Lighting/Full HDR\*

Expected

Expected

[http://www.samsung.com/us/support/owners/product/SGH-I337ZWAATT](http://www.samsung.com/us/support/owners/product/SGH-I337ZWAATT)

Asus Transformer

TF300T

Runs

Failed functional testing

Runs

[http://www.asus.com/us/Tablets\_Mobile/ASUS\_Transformer\_Pad\_TF300T/HelpDesk\_Download/](http://www.asus.com/us/Tablets_Mobile/ASUS_Transformer_Pad_TF300T/HelpDesk_Download/)

Samsung Galaxy Express

SGH-I437

Runs

Failed functional testing

Runs

[http://www.samsung.com/us/support/owners/product/SGH-I437ZSAATT](http://www.samsung.com/us/support/owners/product/SGH-I437ZSAATT)

Samsung Galaxy Fascinate

SCH-I500

Runs

Failed functional testing

Runs

[http://www.samsung.com/us/support/owners/product/SCH-I500RKAVZW](http://www.samsung.com/us/support/owners/product/SCH-I500RKAVZW)

Samsung Galaxy Grand

GT-i9082L

Runs

Failed functional testing

Runs

[http://www.samsung.com/pk/support/model/GT-I9082EWAPAK](http://www.samsung.com/pk/support/model/GT-I9082EWAPAK)

Samsung Galaxy Note 10.1 2014

SM-P600

Runs

Failed functional testing

Runs

[http://www.samsung.com/us/support/owners/product/SM-P6000ZKVXAR](http://www.samsung.com/us/support/owners/product/SM-P6000ZKVXAR)

Samsung Galaxy Note 2

SCH-I605

Runs

Failed functional testing

Runs

[http://www.samsung.com/us/support/owners/product/SCH-I605TSAVZW](http://www.samsung.com/us/support/owners/product/SCH-I605TSAVZW)

Samsung Galaxy Note 3

SM-N900P

Runs

Failed functional testing

Runs

[http://www.samsung.com/us/support/owners/product/SM-N900PZKESPR](http://www.samsung.com/us/support/owners/product/SM-N900PZKESPR)

Samsung Galaxy Note 3

SM-N900

Runs

Passed functional testing

Runs

[http://www.samsung.com/levant/consumer/mobile-phones/mobile-phones/galaxy-note/SM-N9000ZKEXSG-support](http://www.samsung.com/levant/consumer/mobile-phones/mobile-phones/galaxy-note/SM-N9000ZKEXSG-support)

Samsung Galaxy S Duos

GT-S7562L

Runs

Failed functional testing

Runs

[http://www.samsung.com/pk/consumer/mobile-devices/mobile-phones/smartphones/GT-S7562UWAPAK-support](http://www.samsung.com/pk/consumer/mobile-devices/mobile-phones/smartphones/GT-S7562UWAPAK-support)

Samsung Galaxy S2

GT-I9100

Passed functional testing

[http://www.samsung.com/uk/support/model/GT-I9100LKAXEU](http://www.samsung.com/uk/support/model/GT-I9100LKAXEU)

Samsung Galaxy S2

SPH-D710

Runs

Failed functional testing

Runs

[http://www.samsung.com/us/support/owners/product/SPH-D710ZKASPR](http://www.samsung.com/us/support/owners/product/SPH-D710ZKASPR)

Samsung Galaxy S3

SHV-E210L

Runs

Failed functional testing

Runs

[http://www.samsung.com/sec/consumer/mobile-phone/mobile-phone/lgt/SHV-E210LMB1LC](http://www.samsung.com/sec/consumer/mobile-phone/mobile-phone/lgt/SHV-E210LMB1LC)

Samsung Galaxy S3

SGH-I747

Runs

Failed functional testing

Runs

[http://www.samsung.com/us/support/owners/product/SGH-I747MBBATT](http://www.samsung.com/us/support/owners/product/SGH-I747MBBATT)

Samsung Galaxy S3 mini

GT-i8190L

Runs

Failed functional testing

Runs

[http://www.samsung.com/latin\_en/support/model/GT-I8190TALTTT](http://www.samsung.com/latin_en/support/model/GT-I8190TALTTT)

Samsung Galaxy S4

GT-i9505

Runs

Runs

[http://www.samsung.com/uk/support/model/GT-I9505ZWABTU](http://www.samsung.com/uk/support/model/GT-I9505ZWABTU)

Samsung Galaxy S4

SHV-E300L

Runs

Runs

[http://www.samsung.com/sec/consumer/mobile-phone/mobile-phone/lgt/SHV-E300LDS3LC-support](http://www.samsung.com/sec/consumer/mobile-phone/mobile-phone/lgt/SHV-E300LDS3LC-support)

Samsung Galaxy S4

SCH-I545

Runs

Failed functional testing

Expected

[http://www.samsung.com/us/support/owners/product/SCH-I545ZWAVZW](http://www.samsung.com/us/support/owners/product/SCH-I545ZWAVZW)

Samsung Galaxy S4

GT-I9500

Runs

Expected

[http://www.samsung.com/levant/support/model/GT-I9500ZKAMID](http://www.samsung.com/levant/support/model/GT-I9500ZKAMID)

Samsung Galaxy S4 mini

GT-i9190

Runs

Passed functional testing

Runs

[http://www.samsung.com/ae/support/model/GT-I9190ZWAXSG](http://www.samsung.com/ae/support/model/GT-I9190ZWAXSG)

Samsung Galaxy S5

SM-G900A

Runs

Failed functional testing

Runs

[http://www.samsung.com/us/support/owners/product/SM-G900AZKAATT](http://www.samsung.com/us/support/owners/product/SM-G900AZKAATT)

Samsung Galaxy S5

SM-G900H

Runs

Passed functional testing

Runs

[http://www.samsung.com/levant/consumer/mobile-phones/mobile-phones/smart-phones/SM-G900HZWAMID-support](http://www.samsung.com/levant/consumer/mobile-phones/mobile-phones/smart-phones/SM-G900HZWAMID-support)

Samsung Galaxy Tab 10.1

GT-P7100

Runs

Failed functional testing

Runs

[http://www.samsung.com/uk/support/model/GT-P7100MSATOP](http://www.samsung.com/uk/support/model/GT-P7100MSATOP)

Samsung Galaxy Tab 2

SGH-i497

Runs

Failed functional testing

Runs

[http://www.samsung.com/us/support/owners/product/SGH-I497ZSAATT](http://www.samsung.com/us/support/owners/product/SGH-I497ZSAATT)

Samsung Galaxy Tab 3 10.1

GT-P5200

Runs

Failed functional testing

Runs

[http://www.samsung.com/ae/support/model/GT-P5200ZWAXSG](http://www.samsung.com/ae/support/model/GT-P5200ZWAXSG)

Samsung Galaxy Tab 7

GT-P1000

Runs

Failed functional testing

Runs

[http://www.samsung.com/hk\_en/support/model/GT-P1000CWATGY](http://www.samsung.com/hk_en/support/model/GT-P1000CWATGY)

Samsung Galaxy Tab 2 7

GT-P3100

Runs

[http://www.samsung.com/in/support/model/GT-P3100TSEINU-downloads](http://www.samsung.com/in/support/model/GT-P3100TSEINU-downloads)

Samsung Galaxy Tab 7.7

GT-P6810

Runs

Failed functional testing

Runs

[http://www.samsung.com/au/support/model/GT-P6810LSAXSA](http://www.samsung.com/au/support/model/GT-P6810LSAXSA)

Huawei

Ascend G510

Runs

Runs

[http://consumer.huawei.com/en/mobile-phones/support/downloads/g510-en.htm](http://consumer.huawei.com/en/mobile-phones/support/downloads/g510-en.htm)

HTC

Desire 500

Runs

Runs

[http://www.htc.com/us/support/software/htc-sync-manager.aspx](http://www.htc.com/us/support/software/htc-sync-manager.aspx)

HTC One X+

One X+

Runs

Failed functional testing

Runs

[http://www.htc.com/us/support/software/htc-sync-manager.aspx](http://www.htc.com/us/support/software/htc-sync-manager.aspx)

LG G2

LG-LS980

Runs

Failed functional testing

Runs

[http://www.lg.com/us/support-mobile/lg-LS980](http://www.lg.com/us/support-mobile/lg-LS980)

LG Optimus 2X

G-P990

Runs

Failed functional testing

Runs

[http://www.lg.com/hk\_en/support-mobile/lg-LGP990](http://www.lg.com/hk_en/support-mobile/lg-LGP990)

LG G Pro 2

LG-F350K

Runs

Failed functional testing

Runs

[http://www.lg.com/sg/support-mobile/lg-G-Pro-2](http://www.lg.com/sg/support-mobile/lg-G-Pro-2)

Motorola Xoom

Xoom

Runs

Failed functional testing

Runs

[https://motorola-global-portal.custhelp.com/app/answers/detail/a\_id/88481](https://motorola-global-portal.custhelp.com/app/answers/detail/a_id/88481)

Samsung Nexus S

GT-I9020

Runs

Failed functional testing

Runs

[http://developer.android.com/sdk/win-usb.html#download](http://developer.android.com/sdk/win-usb.html#download)

Nvidia Shield

Shield

Runs

Passed functional testing

Runs

[https://developer.nvidia.com/gameworksdownload](https://developer.nvidia.com/gameworksdownload)

RAZR i

RAZR i

Runs

Failed functional testing

Runs

[https://motorola-global-portal.custhelp.com/app/answers/detail/a\_id/88481](https://motorola-global-portal.custhelp.com/app/answers/detail/a_id/88481)

Kindle Fire

Kindle Fire (1st gen)

Failed functional testing

[https://developer.amazon.com/post/Tx3RZFBU0KJTSWS/Setting-up-the-ADB-driver-for-Kindle-Fire-Devices.html](https://developer.amazon.com/post/Tx3RZFBU0KJTSWS/Setting-up-the-ADB-driver-for-Kindle-Fire-Devices.html)

Kindle Fire HD 8.9

KFJWI

Failed functional testing

[https://developer.amazon.com/post/Tx3RZFBU0KJTSWS/Setting-up-the-ADB-driver-for-Kindle-Fire-Devices.html](https://developer.amazon.com/post/Tx3RZFBU0KJTSWS/Setting-up-the-ADB-driver-for-Kindle-Fire-Devices.html)

Kindle fire HD

KFTT

[https://developer.amazon.com/post/Tx3RZFBU0KJTSWS/Setting-up-the-ADB-driver-for-Kindle-Fire-Devices.html](https://developer.amazon.com/post/Tx3RZFBU0KJTSWS/Setting-up-the-ADB-driver-for-Kindle-Fire-Devices.html)

Xiaomi MIUI

MI-1S

\* [http://miuiandroid.com/windows/](http://miuiandroid.com/windows/)

Xiaomi MIUI

MI-2S

Failed functional testing

\* [http://miuiandroid.com/windows/](http://miuiandroid.com/windows/)

Device Specific Notes
---------------------

##### Samsung Galaxy Fascinate SCH-I500

*   Poor performance when using Basic Lighting or higher

##### Samsung Nexus S GT-I9020

*   Poor performance when using Basic Lighting or higher

##### Kindle Fire HDX

*   LDR: runs great!
*   Basic Lighting: runs great!
*   Full HDR: runs ok, Epic says updated drivers from Qualcomm help a lot.

### Qualcomm Adreno 320

##### Samsung Galaxy S4 SGH-I337

*   LDR: runs great!
*   Basic Lighting: runs great!
*   Full HDR: runs ok, Epic says updated drivers from Qualcomm help a lot.

##### Xiaomi MI-2S

*   Install notes for Xiaomi drivers

1.  Install MiPhoneManagerSetup
2.  Plug in device (you may need to open MiPhoneManager to install additional software)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Platform\_Staging\_Sandbox&oldid=8617](https://wiki.unrealengine.com/index.php?title=Platform_Staging_Sandbox&oldid=8617)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")