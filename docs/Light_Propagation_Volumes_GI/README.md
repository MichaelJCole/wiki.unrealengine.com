 Light Propagation Volumes GI - Epic Wiki             

 

Light Propagation Volumes GI
============================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

  

_**

Light Propagation Volumes (LPV) are currently implemented as a Work in Progress feature! Expect bugs and flaws while working with them!



**_

  

Contents
--------

*   [1 Description](#Description)
*   [2 How to enable it](#How_to_enable_it)
*   [3 Tweaking](#Tweaking)
*   [4 Helpful things to get you started](#Helpful_things_to_get_you_started)
*   [5 References](#References)

Description
-----------

Light propagation volumes is a technique to approximately achieve global illumination (GI) in Real-time.  
It uses lattices and spherical harmonics (SH) to represent the spatial and angular distribution of light in the scene.[\[1\]](/index.php?title=Light_Propagation_Volumes_GI#References "Light Propagation Volumes GI")

  

How to enable it
----------------

The use of Light propagation volumes is disabled by default, since this feature is still under development by Epic.  
To enable this feature you need to edit the "ConsoleVariables.ini" file, which is located in your engine config folder. The default location for it is as follows  

`C:\Program Files\Unreal Engine\4.0\Engine\Config\`  

Now you have to add _r.LightPropagationVolume=1_ at the bottom, right below the _\[Startup\]_ category.  
Now your file should look like this:  

; ConsoleVariables.ini
;
; This file allows to set console variables on engine startup (In undefined order).
; Console variables also can be set in engine ini files (e.g. BaseEngine.ini, DefaultEngine.ini) in the \[SystemSettings\] section.
; This file should be in the source control database (for the comments and to know where to find it)
; but kept empty from variables.
; A developer can change it locally to save time not having to type repetitive
; console variable settings. The variables need to be in the section called \[Startup\].
; Later on we might have multiple named sections referenced by the section name.
; This would allow platform specific or level specific overrides.
; The name comparison is not case sensitive and if the variable doesn't exists it's silently ignored.
;
; Example file content:
;
; \[Startup\]
; FogDensity = 0.9
; ImageGrain = 0.5
; FreezeAtPosition = 2819.5520 416.2633 75.1500 65378 -25879 0

\[Startup\]

; Uncomment to get detailed logs on shader compiles and the opportunity to retry on errors
;r.ShaderDevelopmentMode=1
r.LightPropagationVolume=1

Now you have to start/restart your Editor.  

But before you can actually use this feature you need to change some settings inside the Editor.  

[![DirLight.png](https://d3ar1piqh1oeli.cloudfront.net/2/26/DirLight.png/42px-DirLight.png)](/index.php?title=File:DirLight.png)

First of all you have to place a "_Directional Light_" in your scene.  

By either clicking with your right mouse button in the viewport and selecting "_Place Actor - Directional Light_" or by dragging it from the left "_Modes_" tab into your scene.  

As next you need to go into the properties of your newly created Light. You now need to check the "_Affect Dynamic Indirect Lighting_" option in order to activate the use of LPV.  
In case you don't see this option, make sure that the "_Show All Advanced Details_" option is checked inside the Details panel. You can find this option under the little _Eye icon_ [![Eye-ico.gif](https://d26ilriwvtzlb.cloudfront.net/5/55/Eye-ico.gif)](/index.php?title=File:Eye-ico.gif) right next to the search bar.  
As next scroll down to the "_Cascaded Shadow Maps_" category and increase the value of "_Dynamic Shadow Distance StationaryLight_" (Dynamic Shadow Distance Movable if it is a Movable light) to 10.000.  

Now you have to disable the use of Lightmass, by going into your World Settings. [![WorldSet.gif](https://d3ar1piqh1oeli.cloudfront.net/7/7c/WorldSet.gif/20px-WorldSet.gif)](/index.php?title=File:WorldSet.gif)  
In here you have to look for an option called "_Force No Precomputed Lighting_" which is located under the Lightmass category, check the checkbox to disable the use of Lightmass. Now you can close the World Settings tab or window.  

Once this is done you actually need to re/build your lighting to invalidate and delete all previous existing baked data.  

Congratulations, now you have global illumination in real-time.

Tweaking
--------

No matter that this feature is actually under development, there are already some option for you to tweak.  
To get these options you have to place a "_PostProcessVolume_" in your scene. Once again simple drag & drop a "_PostProcessVolume_" from the "_Volumes_" list under the "Modes" tab into your scene.  

Now in its properties scroll all the way down to the "_PostProcessVolume_" category and check the "_Unbound_" checkbox. This will make sure that your PP is used in the whole level and not just inside its boundaries.  
Now scroll up until you see the "Light Propagation Volume" category and expand it.  

**Property**

Description

Intensity

How strong the dynamic GI from the LPV should be. 0 is off, 1.0 is normal value and anything above it can be used to boost the effect.

(DISABLED) Grid Warp Intensity

The strength of the warp offset for reducing light bleeding. 0 is off, 1.0 is normal value and anything above it can be used to boost the effect.

Light Injection Bias

Bias applied to the light injected into the LPV in cell units (**not Unreal Units**). Increase this value to reduce bleeding through thin walls.

Size

The size of the LPV volume, in Unreal Units.

Secondary Occlusion Intensity

Secondary occlusion strength (bounce light shadows). Set to 0 to disable.

Geometry Volume Bias

Bias applied to the geometry volume in cell units (**not Unreal Units**). Increase to reduce darkening due to secondary occlusion.

Emissive Injection Intensity

No information is given at this time. But i guess it controls the injection of emissive materials.

Transmission Intensity

How strong the light transmission from the LPV should be. 0 is off, 1.0 is normal value and anything above it can be used to boost the effect.

  
Thats it, folks! You probably have to play around with these settings a bit to get proper results out of it.  
But it's a start.  

Helpful things to get you started
---------------------------------

*   [File:CornellBoxUE4.zip](/index.php?title=File:CornellBoxUE4.zip "File:CornellBoxUE4.zip") This ZIP File contains the [Cornell Box](http://en.wikipedia.org/wiki/Cornell_box) as a Map for the UE4. So that you can tweak the settings more easy.  
    

  

References
----------

*   [Light Propagation Volumes by Anton Kaplanyan](http://www.crytek.com/download/Light_Propagation_Volumes.pdf)
*   [Cascaded Light Propagation Volumes for Real-Time Indirect Illumination by Carsten Dachsbachery† and Anton Kaplanyan](http://www.vis.uni-stuttgart.de/~dachsbcn/download/lpv.pdf)
*   [Octree Light Propagation Volumes by John David Olovsson and Michael Doggett](http://scivis.itn.liu.se/sigrad2013/wp-content/uploads/2013/06/Octree_Light_Propagation_Volumes.pdf)
*   [Originally discovered by](https://forums.unrealengine.com/showthread.php?530-How-to-enable-Light-Propagation-Volumes-GI-WIP-AND-BETA) [vblanco](https://forums.unrealengine.com/member.php?154-vblanco)
*   The Cornell Box Level for the UE4 was made by [Chris.R](/index.php?title=User:Chris.R&action=edit&redlink=1 "User:Chris.R (page does not exist)")
*   [Using Reflections with LPVs, by Daedalus](https://forums.unrealengine.com/showthread.php?40211-Request-decouple-ambient-cubemap-feature-from-postprocess-into-separate-entity&p=150164&viewfull=1#post150164)
*   [Translucent material crash work around](https://answers.unrealengine.com/questions/35329/lpv-causing-crash-with-translucent-material-in-a-m.html)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Light\_Propagation\_Volumes\_GI&oldid=257](https://wiki.unrealengine.com/index.php?title=Light_Propagation_Volumes_GI&oldid=257)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")