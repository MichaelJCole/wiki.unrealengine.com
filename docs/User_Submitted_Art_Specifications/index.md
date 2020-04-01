User Submitted Art Specifications - Epic Wiki                    

User Submitted Art Specifications
=================================

This will be an evolving document that covers the content specifications for artists who want to contribute artwork to Unreal Engine 4 based games.

**Static Meshes**

**Scale**

The standardized scale for UE4 content is 1uu == 1cm. This translates as 1 Unreal Unit == 1 Centimeter. Extrapolating from that, it means a 6’0” character would be ~183 centimeters tall, which is ~183 Unreal units.

This is simple and clean and allows assets authored by different artists to work together nicely in the same scene.

Set up your modeling application to use centimeters as its base unit and you’ll be all set.

**The Decimal Grid**

UE4 uses a decimal grid by default rather than the power-of-two grid that our engines have used in the past. This is, again, done to simplify content creation.

A best practices way to create modular content would be to create your meshes so that they snap together nicely on a 10 grid. In simpler terms, make sure that any side of a static mesh you intend to butt up against another in the level, have that side snapped to some multiple of 10 units.

**Axis Orientation**

To allow for fast swapping of assets, it’s important that they all share the same rules in terms of orientation. This way, assuming your assets are using the standardized scale described above, swapping in a new chair or statue or whatever should be a painless procedure.

The standard UE4 orientation for assets is that the “up” vector of your asset is mapped the Z axis and the “forward” vector is mapped to the X axis.

If you had a heroic statue, for example, the figure in the statue should be facing down the X axis and the sword being held high would be pointing along the Z axis.

**Origin**

The origin of your mesh will be the location that your mesh scales and rotates from once it is in UE4. This is generally represented by the world origin in your modeling application. Be sure to position your model relative to that spot before exporting it. This is particularly important for modular assets.

For example, if you’re creating a modular wall piece, a good place for the origin is on the edge of the mesh so it can snap easily into place. Conversely, something like a statue on a plinth might work better with the origin in the bottom center of the mesh so it can be easily rotated and scaled to look just how you want it.

**Triangle Count**

This greatly depends on the platform that you’ll be targeting with your content so it’s difficult to give discrete numbers here. What can be said is that, in reality, vertex count is far more important these days than triangle count. Fewer vertices means faster rendering.

**UV Layouts**

Generally, for static meshes you’ll need two sets of UV coordinates.

The first set is your base set of coordinates. This is where you map your diffuse, normal and other maps to the mesh.

The second set is your light map coordinates. These have a few special considerations, such as all UV islands must fall within the 0-1 UV space. Also, no islands can overlap or you’ll get errors in your lighting results.

**Texture Limits**

As with triangle count, this varies based on your target platform. However, best practices would be to author your content at the highest resolution your artists feel comfortable with. The Unreal Engine can LOD that texture down based on platform, so you should author in as high a resolution as your are comfortable with and LOD down as your platform dictates.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=User\_Submitted\_Art\_Specifications&oldid=10529](https://wiki.unrealengine.com/index.php?title=User_Submitted_Art_Specifications&oldid=10529)"

[Category](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")

  ![](https://tracking.unrealengine.com/track.png)