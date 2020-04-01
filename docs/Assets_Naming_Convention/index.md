 Assets Naming Convention - Epic Wiki             

 

Assets Naming Convention
========================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Basics](#Basics)
*   [3 Assets folders](#Assets_folders)
*   [4 Folders by categories](#Folders_by_categories)
*   [5 Assets names](#Assets_names)
*   [6 Texture Masks](#Texture_Masks)

Overview
--------

This article contains ideas for assets naming convention and content folders structure.

  

Basics
------

1\. All names in **English**.  
2\. All asset dependencies should be in its folder (instead of some shared assets).  

  

Assets folders
--------------

(maps)

**Content\\Maps**

parent maps folder

............ **Maps\\Episode(\_Number)**

game episodes, where (\_Number) is 01, 02, 03, etc

............ **Maps\\TestMaps**

test maps, maps prototypes and other levels not for production

(assets)

**Content\\Base**

basic materials, material functions and other “foundation” assets

**Content\\Characters**

folder for characters

............ **Characters\\NPC**

NPCs

............ **Characters\\Player**

player character(s)

**Content\\Dev**

development assets, like objects icons, special meshes and textures, etc

**Content\\Effects**

various shared effects

**Content\\Environment**

environment assets

............ **Environment\\Background**

backgrounds

............ **Environment\\Buildings**

buildings (simple or procedural)

............ **Environment\\Foliage**

foliage

............ **Environment\\Props**

various props

............ **Environment\\Sky**

skies

............ **Environment\\Landscape**

terrains assets

............ **Environment\\Water**

water meshes and materials

**Content\\Gameplay**

assets for various gameplay purposes

**Content\\PostProcess**

post process chains and it’s assets

**Content\\Sound**

sounds and sound cues

**Content\\UI**

UI assets

**Content\\Vehicles**

vehicles with effects

**Content\\Weapons**

weapons with effects

  

Folders by categories
---------------------

**Blueprints**

blueprints

**Meshes**

static and skeletal meshes, physical assets

**Materials**

materials and instances

**Textures**

textures

**Animations**

animations

**Particles**

particle systems

**LensFlares**

flares

**Sounds**

sounds + cues

**Morphs**

morphs

**FaceFX**

FaceFX assets

  

Assets names
------------

**Form:**  
(Prefix\_)AssetName(\_Number)(\_Suffix)  

Example:  
T\_Rock\_01\_D  

  
**Prefixes:** (optional because of filters in content browser)

(by usage)

CH\_

Characters

UI\_

User Interface

VH\_

Vehicles

WP\_

Weapons

(by type)

BP\_

Blueprint

SK\_

Skeletal Mesh

SM\_

Static Mesh

AD\_

Apex Destructible Asset

AC\_

Apex Cloth Asset

MT\_

Morph Target

ST\_

Speed Tree

PS\_

Particle System

LF\_

Lens Flare

VF\_

Vector Field

S\_

Sound

SC\_

Sound Cue

M\_

Material

MI\_

Material Instance

MITV\_

Material Instance Time Varying

MF\_

Material Function

MPC\_

Material Parameter Collection

T\_

Texture

SP\_

Sprite

SS\_

Sprite Sheet

TC\_

Texture Cube

RT\_

Render Target

PM\_

Physical Material

  
**Suffixes:**  

(textures)

\_BC

Base color

\_MT

Metallic

\_S

Specular

\_R

Roughness

\_N

Normal

\_DP

Displacement

\_AO

Ambient Occlusion

\_H

Height Map

\_FM

Flow Map

\_L

Light Map (fake)

\_M

Mask

(meshes)

\_Physics

physics assets (generated name)

\_FaceFX

FaceFx assets

(animations)

\_BlendSpace

blend space (generated name)

\_AnimBlueprint

animation blueprint (generated name)

Texture Masks
-------------

RGB Mask for characters:  

*   R = Metallic  
    
*   G = Roughness  
    
*   B = Subsurface Opacity  
    

  
RGB Mask for character's Hair:  

*   R = Hair Alpha  
    
*   G = Specular/Roughness map  
    
*   B = Anisotropic direction map  
    

  
RGB Mask for environment:  

*   R = Metallic  
    
*   G = Roughness  
    
*   B = Ambient Occlusion  
    

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Assets\_Naming\_Convention&oldid=25](https://wiki.unrealengine.com/index.php?title=Assets_Naming_Convention&oldid=25)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")
*   [Community Created Content](/index.php?title=Category:Community_Created_Content "Category:Community Created Content")