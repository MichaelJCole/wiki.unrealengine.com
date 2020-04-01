Skybox from DDS cubemap - Epic Wiki                    

Skybox from DDS cubemap
=======================

Creating and exporting the cubemap
----------------------------------

In this tutorial we are going to use Spacescape ([\[1\]](http://alexcpeterson.com/spacescape/)). It's free, powerful and easy to use. It also comes with some presets!

Open the program.

[![Image.png](https://d3ar1piqh1oeli.cloudfront.net/3/34/Image.png/940px-Image.png)](/File:Image.png)

[![](/skins/common/images/magnify-clip.png)](/File:Image.png "Enlarge")

After creating your skybox, click on File > Export skybox.

[![Image2.png](https://d3ar1piqh1oeli.cloudfront.net/e/ee/Image2.png/940px-Image2.png)](/File:Image2.png)

[![](/skins/common/images/magnify-clip.png)](/File:Image2.png "Enlarge")

Choose your save location, file name. Set the file type to "Single DDS Cube Map (\*.dds)". The image size depends on how high resolution you want the skybox to be(or how large your map is). Finally, export for SOURCE. Ironically, it is the only option that works. The UNREAL option exports some images in the wrong orientation and your skybox ain't going to look well unless you are willing to fiddle around with it manually (bad choice).

[![Image3.png](https://d26ilriwvtzlb.cloudfront.net/c/cc/Image3.png)](/File:Image3.png)

[![](/skins/common/images/magnify-clip.png)](/File:Image3.png "Enlarge")

Proceeding inside the engine
----------------------------

The time has come to open the engine and import your file! After some time (less than 1 minute for me), the file sould have been imported.

Open the file in the editor and set:

"Compression Settings" > "UserInterface2D (RGBA)" "Mip Gen Settings" > "NoMipmaps" "Texture Group" > "Skybox"

Finall, you may need to untick the sRGB checkbox.

[![Image4.png](https://d26ilriwvtzlb.cloudfront.net/5/50/Image4.png)](/File:Image4.png)

[![](/skins/common/images/magnify-clip.png)](/File:Image4.png "Enlarge")

Create a new material. Set the Shading model to Unlit and make sure it is Two Sided.

[![Image5.png](https://d26ilriwvtzlb.cloudfront.net/b/bb/Image5.png)](/File:Image5.png)

[![](/skins/common/images/magnify-clip.png)](/File:Image5.png "Enlarge")

The material setup is only 3 nodes and looks like this:

[![Image6.jpg](https://d3ar1piqh1oeli.cloudfront.net/0/0b/Image6.jpg/940px-Image6.jpg)](/File:Image6.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Image6.jpg "Enlarge")

Create a new actor. Make the Root Component a Static Mesh. Disable garvity, collision. On the static mesh picker, go on View Options and tick Show Engine Content.

[![Image7.png](https://d26ilriwvtzlb.cloudfront.net/4/43/Image7.png)](/File:Image7.png)

[![](/skins/common/images/magnify-clip.png)](/File:Image7.png "Enlarge")

Choose SM\_SkySphere. Any of the two will do. The one has just about a hundred triangles more than the other.

[![Image8.png](https://d26ilriwvtzlb.cloudfront.net/c/cc/Image8.png)](/File:Image8.png)

[![](/skins/common/images/magnify-clip.png)](/File:Image8.png "Enlarge")

Then, just do this:

[![Image9.png](https://d3ar1piqh1oeli.cloudfront.net/b/b8/Image9.png/940px-Image9.png)](/File:Image9.png)

[![](/skins/common/images/magnify-clip.png)](/File:Image9.png "Enlarge")

Drag and drop it inside your level and set the material.

[![Image10.jpg](https://d3ar1piqh1oeli.cloudfront.net/c/c3/Image10.jpg/940px-Image10.jpg)](/File:Image10.jpg)

[![](/skins/common/images/magnify-clip.png)](/File:Image10.jpg "Enlarge")

This is it!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Skybox\_from\_DDS\_cubemap&oldid=20736](https://wiki.unrealengine.com/index.php?title=Skybox_from_DDS_cubemap&oldid=20736)"

  ![](https://tracking.unrealengine.com/track.png)