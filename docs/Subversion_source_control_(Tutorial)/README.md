Subversion source control (Tutorial) - Epic Wiki                    

Subversion source control (Tutorial)
====================================

**Rate this Article:**

0.00

![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif)

Approved for Versions:(please verify)

Contents
--------

*   [1 Overview](#Overview)
*   [2 SVN Server](#SVN_Server)
*   [3 Setting Up SVN](#Setting_Up_SVN)
*   [4 Check In](#Check_In)
    *   [4.1 Check In Error](#Check_In_Error)
*   [5 Finally](#Finally)

Overview
--------

Hello Everyone! My name is Satheesh PV (aka RyanJon2040) and in this tutorial i will guide you to setup SVN (Subversion) in Unreal Engine 4. Subversion is a free/open source version control system (VCS). That is, Subversion manages files and directories, and the changes made to them, over time. This allows you to recover older versions of your data or examine the history of how your data changed.

SVN Server
----------

Before you continue with this tutorial you need to host a SVN Server. I hosted mine at [CloudForge](http://cloudforge.com/). They offer **Unlimited users** and **Unlimited workspace** for **FREE** but storage is limited to 2GB per account. But anyway i have my repository there so if you dont yet have a SVN repository go ahead and create one.

Setting Up SVN
--------------

Now that you have a SVN repository lets start this tutorial. The very first thing you need to do is checkout a local copy of your UE4 Projects folder. (Without this, Unreal will complain that you need to checkout from a working copy). So to do this follow below steps:

1\. Open [CMD (Command Prompt)](http://cdn.winability.com/info/delete-partition/start-menu-cmd.png)  
2\. Change to your **UE4 Installation Path\\Engine\\Binaries\\ThirdParty\\svn\\Win64**

[![](https://d3ar1piqh1oeli.cloudfront.net/5/55/2_ChangeToSVNDirectory.jpg/180px-2_ChangeToSVNDirectory.jpg)](/File:2_ChangeToSVNDirectory.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:2_ChangeToSVNDirectory.jpg "Enlarge")

Use command: **cd /d YourUE4\_SVN\_Path** and press enter

  
3\. Once you are in that directory, you need to checkout your UE4 Projects directory to your repository

[![](https://d3ar1piqh1oeli.cloudfront.net/0/0a/4_CheckoutLocalCopy.jpg/180px-4_CheckoutLocalCopy.jpg)](/File:4_CheckoutLocalCopy.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:4_CheckoutLocalCopy.jpg "Enlarge")

Checkout command: **svn checkout "Repository URL" "Projects Folder"**

  
4\. After checking out, you should see three new directories called **branches**, **tags** and **trunk** in your projects folder.  
5\. Now open your UE4 Project and open Source Control dialog. (Right click on any asset and select **Connect To Source Control**)

[![](https://d3ar1piqh1oeli.cloudfront.net/4/42/5_SourceControlSetting.JPG/180px-5_SourceControlSetting.JPG)](/File:5_SourceControlSetting.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:5_SourceControlSetting.JPG "Enlarge")

Give your repository link, username and password and click on **Accept Settings**

  
6\. Now you should see the connection successful message.

[![6 ConnectionSuccesful.JPG](https://d3ar1piqh1oeli.cloudfront.net/b/be/6_ConnectionSuccesful.JPG/180px-6_ConnectionSuccesful.JPG)](/File:6_ConnectionSuccesful.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:6_ConnectionSuccesful.JPG "Enlarge")

  

If you reach upto this step successfully then Congrats! :) You have now successfully connected to SVN. Now lets begin the fun part...Checking in and out. :)

Check In
--------

So lets begin to check in our assets to repository. Follow the steps below:

  
1: First you need to mark the asset for check in. To do that right click on your asset and select **Mark For Add**.

[![8 MarkForAdd.jpg](https://d3ar1piqh1oeli.cloudfront.net/8/85/8_MarkForAdd.jpg/180px-8_MarkForAdd.jpg)](/File:8_MarkForAdd.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:8_MarkForAdd.jpg "Enlarge")

  
2: Then right click on that same asset and select **Check In**.

[![](https://d3ar1piqh1oeli.cloudfront.net/f/f3/9_CheckIn.JPG/180px-9_CheckIn.JPG)](/File:9_CheckIn.JPG)

[![](/skins/common/images/magnify-clip.png)](/File:9_CheckIn.JPG "Enlarge")

You need to provide a changelist too and press OK.

  

### Check In Error

At this point you might probably face an error saying **Failed to check in files**.

[![](https://d3ar1piqh1oeli.cloudfront.net/3/34/10_PossibleError.jpg/180px-10_PossibleError.jpg)](/File:10_PossibleError.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:10_PossibleError.jpg "Enlarge")

See the message log.

  
But dont worry! Its just a simple fix :). All you have to do is go to your UE4 Projects folder (Remember the one we checked out earlier using svn checkout command) and copy the _.svn_ folder (Its a hidden folder) to your working project folder.

[![](https://d3ar1piqh1oeli.cloudfront.net/a/a2/11_CopySVNDirectoryToProject.jpg/180px-11_CopySVNDirectoryToProject.jpg)](/File:11_CopySVNDirectoryToProject.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:11_CopySVNDirectoryToProject.jpg "Enlarge")

Copy this _.svn_ folder to your project. For eg: Here i copied the _.svn_ folder to **RTSExample** folder.

  

Finally
-------

Thats it! Check In again and enjoy SVN!

[![](https://d3ar1piqh1oeli.cloudfront.net/3/3d/12_Final.jpg/180px-12_Final.jpg)](/File:12_Final.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:12_Final.jpg "Enlarge")

Successfully checked in. :)

  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Subversion\_source\_control\_(Tutorial)&oldid=8312](https://wiki.unrealengine.com/index.php?title=Subversion_source_control_(Tutorial)&oldid=8312)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)