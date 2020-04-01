 Simple Portals - Epic Wiki             

 

Simple Portals
==============

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Math](#Math)
    *   [2.1 Basic portals math functions](#Basic_portals_math_functions)
    *   [2.2 Tracing portals](#Tracing_portals)
*   [3 Rendering portals](#Rendering_portals)
    *   [3.1 Setup SceneCaptureComponent2D](#Setup_SceneCaptureComponent2D)
    *   [3.2 Update SceneCaptureComponent2D](#Update_SceneCaptureComponent2D)
    *   [3.3 Optimization](#Optimization)
    *   [3.4 Limitations](#Limitations)
*   [4 Teleportation](#Teleportation)
*   [5 Momentum](#Momentum)
*   [6 Conclusion](#Conclusion)
*   [7 Example project](#Example_project)

Overview
--------

This tutorial describes how to setup simple portals in Unreal Engine 4. Main purpose is to explain theoretical techniques and cases of portals logic, math, and its usage on practice. And to make you understand all its pros and cons, before you start to developing game about portals. This tutorial uses **render to texture** portals rendering method and **blueprints** programming.

Math
----

In editor/game you will use portals as simple placeable actors, and link them to each other to make portals pairs - current portal and target portal. Here you need to remember that target portal has the same local axes as current. You can think that target portal should work like current portal, rotated by 180 degrees on Yaw, but this is mistake. It must work like current portal, mirrored by its local X and Y axes.

[![SP math01.jpg](https://d26ilriwvtzlb.cloudfront.net/7/7f/SP_math01.jpg)](/index.php?title=File:SP_math01.jpg)

Portals look like mirrors, but work like windows. Light ray becomes mirrored after passing through the mirror, but saves original direction after passing through the portal.

[![SP math02.jpg](https://d26ilriwvtzlb.cloudfront.net/c/cd/SP_math02.jpg)](/index.php?title=File:SP_math02.jpg)

### Basic portals math functions

To understand portals math, you need to know how to transform direction and location from current to target portal.

To transform direction, convert it into current portal local space, mirror by X and Y vectors, and convert into world space from target portal.

To transform location, convert it into current portal local space with mirrored X and Y axes, and convert into world space from target portal.

Here is basic portals functions:

*   PortalConvertDirection - converts specified direction vector from current to target portal.

[![Pfb 01.jpg](https://d26ilriwvtzlb.cloudfront.net/7/7a/Pfb_01.jpg)](/index.php?title=File:Pfb_01.jpg)

*   PortalConvertLocation - converts specified location from current to target portal.

[![Pfb 02.jpg](https://d26ilriwvtzlb.cloudfront.net/c/c7/Pfb_02.jpg)](/index.php?title=File:Pfb_02.jpg)

*   PortalConvertLocationMirrored - converts specified location from current to target portal as mirrored to target portal.

[![Pfb 03.jpg](https://d26ilriwvtzlb.cloudfront.net/6/61/Pfb_03.jpg)](/index.php?title=File:Pfb_03.jpg)

*   PortalConvertRotation - converts specified rotator from current to target portal (converts rotation X and Y vectors as directions, and makes new rotator).

[![Pfb 04.jpg](https://d26ilriwvtzlb.cloudfront.net/2/2b/Pfb_04.jpg)](/index.php?title=File:Pfb_04.jpg)

*   PortalConvertVelocity - converts specified velocity vector with its size from current to target portal.

[![Pfb 05.jpg](https://d26ilriwvtzlb.cloudfront.net/0/05/Pfb_05.jpg)](/index.php?title=File:Pfb_05.jpg)

### Tracing portals

Now, let’s make simple line trace through the portal:

*   Make line trace from weapon/camera/etc, and check if it hits portal actor;
*   Convert trace direction to get new trace direction;
*   Get hit location and convert to get new trace start location;
*   Calculate new trace end location and make new line trace.

[![SP trace 01.jpg](https://d26ilriwvtzlb.cloudfront.net/c/cb/SP_trace_01.jpg)](/index.php?title=File:SP_trace_01.jpg)

You will get traces, incoming into current portal, and outgoing from target one with the same hit location and direction.

[![SP trace02.jpg](https://d26ilriwvtzlb.cloudfront.net/3/3e/SP_trace02.jpg)](/index.php?title=File:SP_trace02.jpg)

Using this in some recursive function allows you to trace through as many portals as you wish.

[![SP trace03.jpg](https://d26ilriwvtzlb.cloudfront.net/8/8f/SP_trace03.jpg)](/index.php?title=File:SP_trace03.jpg)

Rendering portals
-----------------

I know two methods to render portals - render to texture, and render using stencil buffer. For now, I don’t know any way to use stencil buffer in UE4 for that purpose, so, this tutorial describes method of render to texture. Purpose of this method is to render portal view, using scene capture component, relatively to player’s camera and target portal, and map rendered texture to portal surface with screen aligned UVs.

### Setup SceneCaptureComponent2D

Create blueprint for portal actor and add SceneCaptureComponent2D (SCC) to it. SCC should use global clip plane to cut objects between itself and portal surface, so enable it in project and in SCC settings.

Project Settings:

[![SP clipplane project.jpg](https://d26ilriwvtzlb.cloudfront.net/f/f1/SP_clipplane_project.jpg)](/index.php?title=File:SP_clipplane_project.jpg)

SceneCaptureComponent2D:

[![SP clipplane SCC.jpg](https://d26ilriwvtzlb.cloudfront.net/f/f8/SP_clipplane_SCC.jpg)](/index.php?title=File:SP_clipplane_SCC.jpg)

Create simple portal material:

[![SP M Portal.jpg](https://d26ilriwvtzlb.cloudfront.net/7/70/SP_M_Portal.jpg)](/index.php?title=File:SP_M_Portal.jpg)

Create render target texture, set it as render target for SCC. Create dynamic material instance from portal material and set it’s RT parameter as render target texture.

[![SP SCC Init.jpg](https://d26ilriwvtzlb.cloudfront.net/b/b9/SP_SCC_Init.jpg)](/index.php?title=File:SP_SCC_Init.jpg)

### Update SceneCaptureComponent2D

SCC, or portal camera, should render scene in front of target portal, so you can see it in current portal. As with line trace, here you also need to make 2 operations - convert location and direction from current to target portal:

*   Set SCC clip plane from target portal location and forward vector;
*   Get player camera world location and convert with PortalConvertLocation function;
*   Get player camera rotation and convert with PortalConvertRotation function.

[![SP SCC Update.jpg](https://d26ilriwvtzlb.cloudfront.net/6/66/SP_SCC_Update.jpg)](/index.php?title=File:SP_SCC_Update.jpg)

With this setup it doesn’t matter how portals oriented in space. It is only limited by your perception.

[![SP SCC final.jpg](https://d26ilriwvtzlb.cloudfront.net/f/fb/SP_SCC_final.jpg)](/index.php?title=File:SP_SCC_final.jpg)

### Optimization

It’s unnecessary to capture portal view every frame if you can’t see it. So, maybe it would be useful to check if camera is located in front/back of portal surface, and enable/disable scene capture by this condition:

*   Get player camera world location;
*   Subtract portal world location from it to get relative location;
*   Make dot product between relative location and portal forward vector.
*   Positive result - camera is in front of portal surface, negative - behind it.

[![SP SCCcheck.jpg](https://d26ilriwvtzlb.cloudfront.net/b/be/SP_SCCcheck.jpg)](/index.php?title=File:SP_SCCcheck.jpg)

### Limitations

To make good quality of portal view its render target resolution must be equal to screen resolution.

There is no anti-aliasing of render target texture, so maybe you need to add some blur/distortion effects to portal material.

Unfortunately, depending on performance, portal view may have a lag.

With this setup you can’t achieve recursive portals rendering, because render target texture mapped on portal surface by screen aligned UV coordinates, and through current portal you can see only current portal. So, try to avoid situations when portals from one pair can be seen through each other.

[![SP recursive.jpg](https://d26ilriwvtzlb.cloudfront.net/d/da/SP_recursive.jpg)](/index.php?title=File:SP_recursive.jpg)

Almost the same with portals from another portals pair. Lets imagine situation when you can see some objects through 2 portals pairs.

[![SP 21.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a7/SP_21.jpg)](/index.php?title=File:SP_21.jpg)

This is what you will get in this case:

[![SP 22.jpg](https://d26ilriwvtzlb.cloudfront.net/7/74/SP_22.jpg)](/index.php?title=File:SP_22.jpg)

It looks like portal from another pair calculates its view in wrong way. Yes, it’s because portals uses **player’s camera** world coordinates to calculate their view, and it means that portal can be seen only through this camera. Portals doesn’t know that you look at them through other portals or cameras. Well, I think there is nothing impossible with programming, and you can implement how to set any other camera you want to calculate portal view from, for some specific situations. Remember that it is possible to see portal through the player’s camera and some other portal at the same time:

[![SP 23.jpg](https://d26ilriwvtzlb.cloudfront.net/f/fa/SP_23.jpg)](/index.php?title=File:SP_23.jpg)

Light cannot pass through portal, and lit meshes will look different during passing. And there is no good way to fix that. You can try some fake lightning, or custom lightning model, or even light source attached to mesh with specific lightning channels.

Well, I think in really near future it will be possible to use some ray tracing rendering method in realtime, and render any portal view without any limits.

  

Teleportation
-------------

When player overlaps current portal surface, you teleport him to target portal. And remember that character must never overlap more than one portal at the same time.

Simplest case here is when portals oriented vertically. This requires some additional offset in destination area, to prevent player from overlapping target portal right after teleportation, and cause teleportation back.

Also, remember that camera has its near clip plane distance = 10 uu, so try to teleport player at least from that distance to prevent portal clipping.

Here you have next options:

*   Teleport to the center of target portal;
*   Teleport to “mirrored” location with the same rotation;
*   Teleport relatively to previous direction.

[![SP telep 01.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a5/SP_telep_01.jpg)](/index.php?title=File:SP_telep_01.jpg)

It looks like 3rd one is more accurate, because it stores view direction. But in case of player forward vector is parallel to portal surface, it will teleport player into infinity!

[![SP telep 02.jpg](https://d26ilriwvtzlb.cloudfront.net/4/4b/SP_telep_02.jpg)](/index.php?title=File:SP_telep_02.jpg)

So, for **simple teleportation** place portals only vertically, like doors or passes, and use teleport to mirrored location.

More difficult situation when portals is freely oriented. In this case you can’t just teleport player to relative location even with additional offset, because he can still overlap target portal.

[![SP telep 03.jpg](https://d26ilriwvtzlb.cloudfront.net/b/b5/SP_telep_03.jpg)](/index.php?title=File:SP_telep_03.jpg)

Here you need to make some additional calculations to normally fit character's capsule in destination area. For example, trace capsule in destination point, trace again with some offset if it overlapping portal or something else, and so on…

One more advanced case is a smooth teleportation, when the camera can pass first, when player’s mesh appear on the both sides and so on... In this case you need to check portal’s overlapping every tick, track its relative location/rotation, and create a copy of your character on both sides… Well, first of all try to apply transformed coordinates to camera only.

As you can see, all this cases is about simple first person character, and there are many other situations with third person camera, 6-DOF movement and so on...

Momentum
--------

Momentum (or kinetic energy) must be retained through portals. In simple words - you should store previous velocity before teleportation, and apply transformed velocity after.

During movement, if portals oriented one to another, character’s direction vector and velocity vector are the same before and after teleportation.

[![SP vel 01.jpg](https://d26ilriwvtzlb.cloudfront.net/6/6e/SP_vel_01.jpg)](/index.php?title=File:SP_vel_01.jpg)

If portals oriented in some different way, direction vector changes during teleportation, but, for some time, velocity vector is still the same, and it affects movement. So, after teleportation, you will see some additional movement to the previous movement direction.

[![SP vel 02.jpg](https://d26ilriwvtzlb.cloudfront.net/a/a5/SP_vel_02.jpg)](/index.php?title=File:SP_vel_02.jpg)

To avoid this, you can convert object velocity and try to apply it as new velocity or impulse. I’m didn't get good results with this, but I hope you will go further in this implementation.

Conclusion
----------

Well, I think today you learned something about portals. Portals is a huge feature. And it is not really hard to understand them, but it is difficult to implement and use. I hope this tutorial will help you to develop, or not develop some good game about portals. :)

Example project
---------------

In example project you will find:

*   Example of line tracing through one or more portals pairs;
*   Example of portal rendering using SceneCaptureComponent2D;
*   Example of simple teleportation function in character class;
*   Example of advanced (smooth) teleportation function in character class;
*   Example of physics actor that can be teleported through portal;

(4.15.3)

[File:SimplePortals.zip](/index.php?title=File:SimplePortals.zip "File:SimplePortals.zip")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Simple\_Portals&oldid=341](https://wiki.unrealengine.com/index.php?title=Simple_Portals&oldid=341)"

[Category](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")