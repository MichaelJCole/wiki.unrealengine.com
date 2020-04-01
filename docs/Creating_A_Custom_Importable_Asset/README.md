Creating A Custom Importable Asset - Epic Wiki                    

Creating A Custom Importable Asset
==================================

TUTORIAL CURRENTLY UNDER CONSTRUCTION. TIS NOT COMPLETE MY FRIENDS.

**Rate this Tutorial:**

3.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (2 votes)

Approved for Versions:4.9

Overview
--------

The full source code for this tutorial can be found [here](https://github.com/BGR360/UE4_CustomAssetTutorial).

This tutorial will show you how to create a custom Asset type that can be imported from an XML file using the Content Browser. This Asset will behave like you would expect any Asset to: you can import it, delete it, move it, and even drag and drop it onto components!

This is my first tutorial on the Wiki. If you find ANYTHING on this tutorial to be confusing or unclear, **do not hesitate to contact me.** You can make a post on my Talk page. I hope you enjoy!! :)

Custom Asset Class
------------------

A good use of this tutorial is to create a sort of in-game asset customization that players can do (e.g. players could create and customize their own levels or characters). In this tutorial, I have created a procedurally-generated city system that uses XML files to store a city's configuration. You can imagine this being used in a city-building game where players can create their own cities and share them with their friends (totally novel, I know).

The city will be grid-based, like this:

(TODO: Insert Sketch) (TODO: Insert Screenshot of generated city in UE4)

You needn't worry about the detailed implementation of the procedurally-generated city. All we are concerned with in this tutorial is how to make the Editor able to import the XML files as assets. However, if you are still curious (I know I would be), check out the code on GitHub (link at top of page).

### XML Format

The example city's XML file would look like this:

<city\>
  <intersection id\="0"/>
  <intersection id\="0"/>
  <road lanes\="0"/>
    <inter id\="0"/>
    <inter id\="0"/>
  </road\>
  <house pos\="0,0" size\="0"/>
</city\>

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Creating\_A\_Custom\_Importable\_Asset&oldid=16931](https://wiki.unrealengine.com/index.php?title=Creating_A_Custom_Importable_Asset&oldid=16931)"

[Category](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)