Common Questions and Answers - Epic Wiki              

Common Questions and Answers
============================

From Epic Wiki

(Redirected from [Current Questions](/index.php?title=Current_Questions&redirect=no "Current Questions"))

Jump to: [navigation](#mw-navigation), [search](#p-search)

Hey everyone! I know that the AnswerHub seems like it's flying by at a mile-a-minute, but you can help out just by jumping on common issues. This is a list of commonly asked questions that are currently popping up. Think of this as a FAQ that will be updated and changed as new trending questions arrive.

Contents
--------

*   [1 Legal and Licensing](#Legal_and_Licensing)
*   [2 Marketplace](#Marketplace)
*   [3 Hardware and Software](#Hardware_and_Software)
*   [4 Rendering](#Rendering)
*   [5 Misc](#Misc)

Legal and Licensing
-------------------

**Q**: Is there going to be a free version of UE4?

**A**: We do not have any plans for a free version. We think $19 is amazing value. For that $19 you will not receive a watered-down trial edition or feature limited version - it's the full Unreal Engine 4 that we're using to make our next big game - yet it has lots of cool friendly features, back by tons of tutorials and demos with lots & lots more to come! You spent your $19 and you're LICENSED to used that version forever - even if you download the engine, use it, and then cancel and never pay again. You're welcome to keep using it. Also, you can resume your subscription at any time to get the latest updates, new features, new content, etc. It's priced similarly to popular MMOs but can deliver a lifetime of learning and development fun if you're so inclined.

* * *

**Q**: I have a small team and want to know how the license works for us

**A**: Each team member who uses the UE4 source or tools should obtain a $19/mo subscription. However, if any team members can work without using UE4 (for example, working solely in Photoshop or Blender) then those folks don't need a subscription.

The 5% royalty is per-product, and doesn't depend on the number of team members. You should appoint one team member to be responsible for financial duties - receiving App Store revenue, paying royalties, distributing profits among team members, etc.

* * *

**Q**: Can you use the not yet released "Realistic Weapons Pack" for commercial use ?

**A**: Yes, you will be able to do that when it's available. Also, you can use all of the free Epic content in the marketplace commercially in any games you build with UE4. This includes all of the content residing in example projects. For example, all of the weapons, meshes, sounds and materials in Shooter Game. Tappy Chicken even!

* * *

**Q**: If I learn a cool trick, design, algorithm, pattern, etc. from UE4 and implement it in my own engine, is this considered copying?

**A**: Learning algorithms and ideas from Unreal and then independently writing a new implementation elsewhere is fine. Copyright law covers the code but not the underlying idea or algorithm. Generally, a good process is to very clearly separate your learning of techniques in one code base from your implementation of them in another. If you find yourself looking at Epic code in one window while writing your own engine in another window, you're in a danger zone where you risk copying the code or its structure. If you do it that way, you risk creating a copy of our code under copyright law, even if you choose different variable and function names. In the case of UE4, this means the difference between owing a royalty for using Epic code and having independently authored code.

* * *

**Q**: How many computers can I install UE4 on?

**A**: “There is no limit to the amount of systems you can install the engine to. You're restricted by the EULA only in making sure that there is only one person per subscription.”

Marketplace
-----------

**Q**: Can I download free items from the marketplace once I unsubscribe?

**A**: You will have access to any free content that was available to you during your time of subscription. You will not have free access to free content that was released during time periods you were not an active subscriber, however you will be able to purchase it, assuming your engine version is compatible with the content.

* * *

**Q**: Is free content free to everyone on the marketplace?

**A**: It depends. There is some content on the marketplace we intend to always be free, regardless of when you subscribe, and there is going to be some content that is only going to be free to active subscribers at the time of release. We haven't figured out the details there yet, but if something shows to YOU as free in the marketplace it will always be free to YOU.

* * *

**Q**: Can I use the marketplace without an active subscription?

**A**: Yes, you will be able to use the marketplace and purchase or re-download items even without an active subscription.

Hardware and Software
---------------------

[Recommended Hardware](/Recommended_Hardware "Recommended Hardware")

**Q**: My system is just below required hardware, is that ok?

**A**: The Unreal Editor can run on some lower spec systems, but it is most likely not going to be a very good experience. To cope with the low resolution, you can enable small icons, and use the editor's tab system to combine the tabs on the left and right sides of the screen together. Be prepared to switch tabs frequently.

Also, for laptop use, it's very beneficial to buy a mouse with two buttons and a wheel rather than using the trackpad. The required system specs there are the minimum needed to run with a good experience that we can recommend and endorse. It will often run on machines below these specs, but less pleasantly.

* * *

**Q**: What about Linux?

**A**: We have partial Linux support in the code base - working towards Steam OS support. You can subscribe and download the source code, and try and port it completely to Linux or any other platform you like. Let us know if you do! You can even push any improvements you make back to us (if you want). And you can absolutely publish your game (in compiled form - you're still bound by the license not to release our source code publicly.)”

* * *

**Q**: How can I change default location of Unreal Projects?

**A**: We currently don't allow you to change where the Unreal Project's directory is located. We are working on a fix to this issue. Until the fix can be implemented, a work-around can be found on this post: [https://answers.unrealengine.com/questions/12562/changing-sample-content-path.html](https://answers.unrealengine.com/questions/12562/changing-sample-content-path.html)

Rendering
---------

**Q**: Does UE4 support DX9? What about WinXP?

**A**: Unreal Engine 4 supports DX10 / OpenGL 3.3 and above, but it does not support DX9 at this point. If you are looking for DX9 support due to DX10+ not being available on Windows XP, then OpenGL might be a better route to get higher end rendering features.

Having said that, we currently don't support Windows XP, but have tentative plans to change that down the road.

There are some traces of support in the source if you or someone else in the community want to expand upon that. A complicating factor on the technical side is that the version of the Windows SDK we are using is not compatible with Windows XP. Luckily the extra functionality we use in the newer Windows SDK is not relied on for anything game critical.

* * *

**Q**: Will UE4 support DX12?

**A**: Yes. Epic will be working closely with NVIDIA and Microsoft to create a world-class implementation of DX12 in Unreal Engine 4.

Misc
----

**Q**: Where can I set the default user interface language?

**A**: The only way to force a particular culture always that I know of would be to pass in the culture to use on the command line. Which I believe is Culture=en if you want to force it to be English.

Adding Culture=en to C:\\Program Files\\Unreal Engine\\Launcher\\Engine\\Config\\BaseEditor.ini may also work.

This work-around does carry the potential to be responsible for data loss, so you may wish to back up projects before moving them.

[http://www.techsupportalert.com/content/how-move-windows-7-personal-folders-my-documents-another-drive.htm](http://www.techsupportalert.com/content/how-move-windows-7-personal-folders-my-documents-another-drive.htm)

Your already downloaded content should load correctly from the new location.

* * *

**Q**: Are there any advantages to making map objects out of brushes vs. making them in an 3D program and importing them?

**A**: Brushes are generally meant for prototyping layouts and for constructing very simple environments. They don't perform we when scaling up to high-polygon environments. Static meshes are the recommended primitive for building larger and more detailed environments. The levels in Infinity Blade and Gears of War are nearly 100% static meshes. Of course, the downside is that building a level with static meshes requires a large library of meshes or a significant effort modeling and UV mapping them in an external tool like 3D Studio Max, Maya, or Blender.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Common\_Questions\_and\_Answers&oldid=2868](https://wiki.unrealengine.com/index.php?title=Common_Questions_and_Answers&oldid=2868)"