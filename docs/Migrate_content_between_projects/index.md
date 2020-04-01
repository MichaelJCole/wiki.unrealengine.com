Migrate content between projects - Epic Wiki                    

Migrate content between projects
================================

  
If you have a Blueprint/Material/Etc. that you have built in one project, that you want to use in another project, you can use the "Migrate" function to do this easily. Migrating will copy all dependencies for that content to another project. This is completely different than the Export function.  
  

Contents
--------

*   [1 How to Migrate (copy) content from one Project to another Project](#How_to_Migrate_.28copy.29_content_from_one_Project_to_another_Project)
    *   [1.1 Step 1: Locate the content](#Step_1:_Locate_the_content)
    *   [1.2 Step 2: Right Click](#Step_2:_Right_Click)
    *   [1.3 Step 3: Confirm Assets](#Step_3:_Confirm_Assets)
    *   [1.4 Step 4: Locate Project to migrate to](#Step_4:_Locate_Project_to_migrate_to)
*   [2 IMPORTANT NOTES](#IMPORTANT_NOTES)
    *   [2.1 Migrating from C++ Project to C++ Project](#Migrating_from_C.2B.2B_Project_to_C.2B.2B_Project)
    *   [2.2 Migrating from C++ Project to Blueprint Project](#Migrating_from_C.2B.2B_Project_to_Blueprint_Project)

How to Migrate (copy) content from one Project to another Project
-----------------------------------------------------------------

### Step 1: Locate the content

You will want to first locate the content in the content browser, depending on the quantity of items in your project you may need to use the search function.  
  

### Step 2: Right Click

Once you have found the content you want to migrate, use the Right Mouse Button to pull up the context menu. You will then want to select "Migrate...".  
[![RMB Migrate.png](https://d26ilriwvtzlb.cloudfront.net/2/22/RMB_Migrate.png)](/File:RMB_Migrate.png)  
  

### Step 3: Confirm Assets

Once you click on "Migrate..." the Asset Browser window will open. This will show all files that will be associated to the content you are attempting to migrate. Click on "OK".  
[![Migrate Asset Report.png](https://d26ilriwvtzlb.cloudfront.net/9/9b/Migrate_Asset_Report.png)](/File:Migrate_Asset_Report.png)  
  

### Step 4: Locate Project to migrate to

This will then bring up a folder list. You will want to find the folder where your Unreal Engine projects are located, then find the _Content_ folder for that project. Once you have found the content folder, click on "OK".

Default Location

Documents\\Unreal Projects\\(project name)\\Content

[![Migrate Browse Folders.png](https://d26ilriwvtzlb.cloudfront.net/3/3e/Migrate_Browse_Folders.png)](/File:Migrate_Browse_Folders.png)

  
  
It will then show the progress of copying files, and then once it completes you can open your project and locate the migrated content.  
  

IMPORTANT NOTES
---------------

### Migrating from C++ Project to C++ Project

If you are migrating content from a C++ project to another C++ project, you will not have any custom items such as functions and variables that were compiled in the C++. For that you will need to use Visual Studio and copy/paste the corresponding C++ code from one project to the other and 'Build' again.  
  

### Migrating from C++ Project to Blueprint Project

If you are migrating content from a C++ project to another Blueprint project, you will not have any custom items such as functions and variables that were compiled in the C++. You will need to create new Blueprint functions to mimic those created in C++.  
  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Migrate\_content\_between\_projects&oldid=6439](https://wiki.unrealengine.com/index.php?title=Migrate_content_between_projects&oldid=6439)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)