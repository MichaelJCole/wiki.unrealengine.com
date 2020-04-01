Rama's Landscape Collision Plugin - Epic Wiki             

Rama's Landscape Collision Plugin
=================================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

Contents
--------

*   [1 Overview](#Overview)
*   [2 Videos](#Videos)
    *   [2.1 Adding Collision for Sloped Parts of Landscape Only](#Adding_Collision_for_Sloped_Parts_of_Landscape_Only)
    *   [2.2 Victory!!! Navmesh-free AI goes romping on Landscape](#Victory.21.21.21_Navmesh-free_AI_goes_romping_on_Landscape)
*   [3 Download](#Download)
*   [4 Installation Instructions](#Installation_Instructions)
*   [5 Pictures](#Pictures)
    *   [5.1 Algorithm Tests](#Algorithm_Tests)

Overview
--------

I have written a plugin to fix landscape collision issues for anyone experiencing them as I was.

**Newer projects and landscape assets may never need this!**

**I was unable to reproduce the landscape collision issues on a new 4.2 third person code project with a new landscape!**

but If you are finding your character is falling through the landscape on steep slopes or otherwise, my plugin will fix that issue.

Enjoy!

Videos
------

### Adding Collision for Sloped Parts of Landscape Only

  

  

### Victory!!! Navmesh-free AI goes romping on Landscape

Download
--------

**[File:VictoryCollision.zip](/File:VictoryCollision.zip "File:VictoryCollision.zip")**

Installation Instructions
-------------------------

1\. drag the plugin to a folder named exactly "Plugins" in your project main directory where the .uproject is located.

2\. open editor, go to window->plugins

3\. check to enable my plugin

4\. restart the editor

5\. click on a landscape

6\. go to level blueprint

7\. right click and add the reference to your clicked landscape

8\. right click and search for victory landscape

9\. connect the landscape to my node

10\. add the event begin play

11\. Celebrate!

  

Pictures
--------

The Final BP Setup, It's Easy! [![Blueprint2.jpg](https://d3ar1piqh1oeli.cloudfront.net/f/fc/Blueprint2.jpg/700px-Blueprint2.jpg)](/File:Blueprint2.jpg)

### Algorithm Tests

[![ZDiffof30.jpg](https://d3ar1piqh1oeli.cloudfront.net/6/68/ZDiffof30.jpg/700px-ZDiffof30.jpg)](/File:ZDiffof30.jpg)

[![ZDiffof72.jpg](https://d3ar1piqh1oeli.cloudfront.net/1/18/ZDiffof72.jpg/700px-ZDiffof72.jpg)](/File:ZDiffof72.jpg)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Rama%27s\_Landscape\_Collision\_Plugin&oldid=5840](https://wiki.unrealengine.com/index.php?title=Rama%27s_Landscape_Collision_Plugin&oldid=5840)"