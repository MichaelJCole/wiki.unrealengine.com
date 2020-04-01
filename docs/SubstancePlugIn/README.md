SubstancePlugIn - Epic Wiki                    

SubstancePlugIn
===============

  

**Overview**
------------

This is a brief tutorial to help users who want to install the Allegorithmic Plug-In for Unreal Engine 4 to allow them to use Substance in UE4. These instructions have been tested and are working as of March 5th 2015 and on versions 4.7.0 + of the Unreal Engine and with Plug-in Version 4.7.0.5. For earlier versions, these instructions may work but have NOT been tested, please see the forums listed below for precise instructions with earlier versions.

**Plug-In Referernce Pages on the UE4 and Allegorithmic Forums:**  

[**Substance plugin for UE4 - How to get it working**](https://forum.allegorithmic.com/index.php?topic=1223.0)  

[**4.7.0.5 Plug In Release**](https://forum.allegorithmic.com/index.php?topic=4147.0)  

[**Substance UE4 Forums, for future Plug-In Releases look here**](https://forum.allegorithmic.com/index.php?board=23.0)  

  

**GitHub**
----------

These instructions assume you want to get the most current version of the Plug-In from a Source Location with the Engine Source.

Find the Version of the Plug-In which works with the Engine Version you are using. Normally there is an updated plug-in version for each Full version of the engine and are denoted by the Engine Version number followed by an iteration number (4.7.0.5). Follow the Source Link.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/0/0b/Substance_11.jpg/1201px-Substance_11.jpg)](/File:Substance_11.jpg)
    
    Download Link
    

You will be taken to Allegorithmic's Fork of the Unreal Engine 4, Download the Zip File. (NOTE: You will need to have a GitHub Account)

*   [![](https://d3ar1piqh1oeli.cloudfront.net/b/b9/Substance_12.jpg/1200px-Substance_12.jpg)](/File:Substance_12.jpg)
    
    GitHub Download
    

Open your download location and find the downloaded ZIP File.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/2/29/Substance_13.jpg/512px-Substance_13.jpg)](/File:Substance_13.jpg)
    
    Zip File Location
    

Extract the Zip File to where you want your Engine to be installed. (I keep a Directory on a Secondary Drive for GitHub Builds)

*   [![](https://d3ar1piqh1oeli.cloudfront.net/d/de/Substance_14.jpg/1200px-Substance_14.jpg)](/File:Substance_14.jpg)
    
    Engine Installation Directory
    

Opening the newly extracted Directory, Run the Setup.bat file to download and Install all Engine Dependencies

*   [![](https://d3ar1piqh1oeli.cloudfront.net/0/03/Substance_15.jpg/1200px-Substance_15.jpg)](/File:Substance_15.jpg)
    
    Setup.bat
    

Once Dependencies are downloaded and the CMD window closes, Run the GenerateProjectFiles.bat file

*   [![](https://d3ar1piqh1oeli.cloudfront.net/8/89/Substance_16.jpg/1200px-Substance_16.jpg)](/File:Substance_16.jpg)
    
    GenerateProjectFiles.bat
    

Open the newly created Visual Studio Project Files in VS 2013 and Build Solution(as of 4.7.0 you must compile the engine on Visual Studio 2013)

*   [![](https://d3ar1piqh1oeli.cloudfront.net/f/fe/Substance_17.jpg/1200px-Substance_17.jpg)](/File:Substance_17.jpg)
    
    Build Solution
    

Once the Build is Complete, Find the UE4Editor.exe file to Open the Editor.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/c/c9/Substance_18.jpg/1200px-Substance_18.jpg)](/File:Substance_18.jpg)
    
    Build Solution
    

Create a New Project.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/f/f0/Substance_08.jpg/1200px-Substance_08.jpg)](/File:Substance_08.jpg)
    
    Create a New Project
    

Open Project Settings and insure that the Substance Sub-Section appears.

*   [![](https://d3ar1piqh1oeli.cloudfront.net/5/55/Substance_09.jpg/1200px-Substance_09.jpg)](/File:Substance_09.jpg)
    
    Project Settings
    

Enjoy!

*   [![](https://d3ar1piqh1oeli.cloudfront.net/3/33/Substance_10.jpg/1200px-Substance_10.jpg)](/File:Substance_10.jpg)
    
    Working Plug-In
    

Retrieved from "[https://wiki.unrealengine.com/index.php?title=SubstancePlugIn&oldid=13646](https://wiki.unrealengine.com/index.php?title=SubstancePlugIn&oldid=13646)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [PlugIn](/index.php?title=Category:PlugIn&action=edit&redlink=1 "Category:PlugIn (page does not exist)")
*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)