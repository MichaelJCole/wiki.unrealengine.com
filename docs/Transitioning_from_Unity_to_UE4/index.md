Transitioning from Unity to UE4 - Epic Wiki                    

Transitioning from Unity to UE4
===============================

Unity Developers New to Unreal Engine 4

Check out the official [Unreal Engine 4 for Unity Developers](https://docs.unrealengine.com/latest/INT/GettingStarted/FromUnity/index.html) guide in the documentation!

**Rate this Article:**

3.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:(please verify)

This is a collection of comments and write-ups from people who have used Unity prior to switching to Unreal Engine 4. This is their feedback and tips. Feel free to add your write-ups!

Contents
--------

*   [1 User:joessu's Write-Up](#User:joessu.27s_Write-Up)
    *   [1.1 Feedback:](#Feedback:)
*   [2 User:KitatusStudios's Write-Up](#User:KitatusStudios.27s_Write-Up)
    *   [2.1 Pros:](#Pros:)
    *   [2.2 Cons:](#Cons:)
    *   [2.3 Quaternion Conversions](#Quaternion_Conversions)

[User:joessu](/index.php?title=User:Joessu&action=edit&redlink=1 "User:Joessu (page does not exist)")'s Write-Up
----------------------------------------------------------------------------------------------------------------

##### Feedback:

**Good First:**

*   Wow with the community support, lots of good help all around.
*   With no knowledge of the UE4 animation system, i was able to retarget aim offset animations from one character to another!!

That is a major accomplishment on your guys' part.

*   Being a CS grad whose undergrad was all C++, the API's so far aren't that scary, even though i've been doing C# and java recently.
*   Blueprint scripting is intuitive.

**Needs Improvement:**

*   The biggest roadblock for me was corrupted blueprint files, it took 4~ hours of my time to backtrack. I posted in the bug report my info. [https://answers.unrealengine.com/que...g-project.html](https://answers.unrealengine.com/que...g-project.html)
*   Some of the docs are outdated i think, the notes on Animation Blend Spaces seemed out of sync a tiny bit (but enough for me, being new, to be confused).
*   No doubt, you are going to get A LOT of unity developers wanting to migrate and move from unity to unreal. Perhaps providing a migration FAQ/Doc would be of great help to a lot of people. I'm sure too you could get the community to help formulate it, maybe on the wiki or something?

So there you have it! Aside from the corrupted blueprint files and me running out of RAM every once and a while(i had my project AND the content project open at the same time for reference), it was smooth sailing all weekend.

[User:KitatusStudios](/User:KitatusStudios "User:KitatusStudios")'s Write-Up
----------------------------------------------------------------------------

Kitatus Studios were working on Distro Horizons for Unity. Distro Horizons is a 3D N64-Style Platformer. Hearing of Unreal Engine 4's features and pricing, I decided to jump ship. But I didn't want to throw away what I worked on for the Unity project; So we have decided to continuing using Unity for the mobile edition of Distro Horizons. The UE4 version of Super Distro is the "Desktop" version and thus my write-up will be based on using Unity and Unreal Engine 4 hand-in-hand.

##### Pros:

*   Meshes can collide with each other without strobing weird textures which happens in Unity.
*   Pricing structure is very user-friendly
*   You can import most of your meshes created in Unity. To do this, I used the .OBJ Exporter (Which can be found here: [Click here for the link](http://wiki.unity3d.com/index.php?title=ObjExporter). Once installed, simply converting to .FBX provides the meshes you once had in Unity straight into Unreal Engine 4 in a heartbeat.
*   The animation system is much simpler to use compared to Mecanim, using the [FPS example](/First_Person_Shooter_(Tutorial) "First Person Shooter (Tutorial)") I was able to get a fully animated character in minutes (Again, using the models and animations I had from Unity.
*   The Example Content already provided in Unreal Engine is of extremely high-quality and provides perfect assets to use.

##### Cons:

*   The Marketplace in Unreal Engine 4 isn't available just yet to the public to upload and sell their assets. This is one of the only downsides to what I've seen.
*   There's not a lot of documentation at the moment, but that's constantly changing.
*   Unreal Engine has crashed a few times for me. This is because the engine is constantly being worked on however, and so this con will disappear over time.

##### Quaternion Conversions

In some cases you may want to convert special hardware input from Unity input transforms to Unreal. Both Unity and Unreal Engine use a left handed coordinate system. (In some places the Unreal docs say otherwise, but, no, both ARE left handed.) In Unity Forward is Z, Right is X, and Up is Y. In Unreal Forward is X, Right is Y, and Up is Z.

Transform code for Quat and Rotators is like this for converting NatNet Unity Quaternions to Unreal...

FRotator UNatNetFacade::LatestRotation(int32 Id)
{
	if (!ReadFrame())
	{
		return FRotator::ZeroRotator;
	}
	for (int i = 0; i < CurrentMotiveFrame.RigidBodyCount; i++)
	{
		if ((int32)CurrentMotiveFrame.RigidBodies\[i\].Id == Id)
		{
			FQuat q;
			q.X = CurrentMotiveFrame.RigidBodies\[i\].qx;
			q.Y = CurrentMotiveFrame.RigidBodies\[i\].qy;
			q.Z = CurrentMotiveFrame.RigidBodies\[i\].qz;
			q.W = CurrentMotiveFrame.RigidBodies\[i\].qw;

			// Convert to from Unity to Unreal rotations.
			FVector axis;
			float angle;
			q.ToAxisAndAngle(axis, angle);
			axis = FVector(axis.Z, -axis.X, axis.Y);

			FQuat q2 = FQuat(FVector::UpVector, FMath::DegreesToRadians(90.0f)) \* FQuat(axis, -angle);

			return FRotator(q2);
		}
	}
	return FRotator::ZeroRotator;
} 

  
Another rotation difference is that in Unity Z is forward, and in Unreal X is forward. This means models like guns often need to be rotated. In Unreal Tournament the projectile meshes face along X but the gun meshes face along Y.

(Authors: [User:joessu](/index.php?title=User:Joessu&action=edit&redlink=1 "User:Joessu (page does not exist)") [User:KitatusStudios](/User:KitatusStudios "User:KitatusStudios") [User:SNDRKeene](/index.php?title=User:SNDRKeene&action=edit&redlink=1 "User:SNDRKeene (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Transitioning\_from\_Unity\_to\_UE4&oldid=16293](https://wiki.unrealengine.com/index.php?title=Transitioning_from_Unity_to_UE4&oldid=16293)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")

Hidden category:

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)