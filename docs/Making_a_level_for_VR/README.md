Making a level for VR - Epic Wiki             

Making a level for VR
=====================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

Making a level feel real is not as simple as creating objects to scale. Games must be made to be more than real and virtual reality is no exception. The following tutorial will run you through an exercise that should leave you feeling comfortable developing levels for the Oculus Rift.

You will need:

*   An Oculus Rift,
*   Unreal Engine 4 set up to work with the Rift,
*   A 3D modelling program (I used 3DS Max),
*   A long ruler,
*   Reference objects within easy reach.

*   I used my desk, the windows and the door to the office.
*   They need to be big objects with simple shapes. You’re going to make them out of BSP.

  

Contents
--------

*   [1 Step 1: Making yourself.](#Step_1:_Making_yourself.)
*   [2 Step 2: Importing and setting it up.](#Step_2:_Importing_and_setting_it_up.)
*   [3 Step 3: Creating your work space.](#Step_3:_Creating_your_work_space.)
    *   [3.1 Step 3.1: The Ultimate Test.](#Step_3.1:_The_Ultimate_Test.)
*   [4 Step 4: Building the Level](#Step_4:_Building_the_Level)

Step 1: Making yourself.
------------------------

It is very important that you get the camera in the right place, ready for the rest of the level building. You will be judging the effectiveness of your level based on what you can see through the camera so if you get it wrong now, it will be wrong for everything else in your scene.

*   Open your modelling program and create a biped. This will be the representation of you in the game.
*   Make sure the biped is the same height as you.
*   Put the biped into the T-Pose; both arms out to the side, feet shoulders’ width apart.
*   If you are using 3DS Max’s Biped bone system you will now need to “Snapshot” a static mesh version of the bones.

*   Go to Tools > Snapshot
*   On the dialogue that pops up, press OK. The defaults should work fine.
*   You now have a static mesh copy of your bone system.
*   Convert one of the pieces into Editable Poly and “Attach” the bones to that piece.

*   Export the polygon to FBX.

  

*   If you’re working in different modelling software, follow the relevant workflow to export your biped as an FBX.

*   The proportions are the important bit. Ignore any other details.

  

Step 2: Importing and setting it up.
------------------------------------

*   Save and close your modelling software.
*   Open Unreal Engine 4.
*   At the top of the Content Browser, click “New/ Import to”

[![](https://d3ar1piqh1oeli.cloudfront.net/a/a4/ContentBrowserImport.png/180px-ContentBrowserImport.png)](/File:ContentBrowserImport.png)

[![](/skins/common/images/magnify-clip.png)](/File:ContentBrowserImport.png "Enlarge")

This button to import new stuff

*   Select your FBX file and accept the defaults.
*   Drag your new static mesh into the scene.

  
Now UE4 does allow you to attach cameras to static meshes and meshes to the character controller but as we want to be able to examine the scene and compare it to how large it actually feels, the mesh we just imported would just get in the way. What we will do, however, is temporarily drag it into the Character Blueprint just to get the height of the camera right.

*   Double click on the Character Blueprint that your scene is currently using (typically it’s got "Character" in the name), opening it in the Blueprint Editor.

*   If there isn't a Character Blueprint and you don't know how to make one, grab one of the example projects on the marketplace and use their's or download my version of this project at the bottom of the page.
*   If there are any meshes in there already, delete them.

*   Switch to Components Mode
*   Drag the biped from the Content Browser into the Components Window.
*   Position a camera such that the biped’s head and shoulder are poking through the lens.

[![](https://d3ar1piqh1oeli.cloudfront.net/1/11/CharacterBlueprint.png/180px-CharacterBlueprint.png)](/File:CharacterBlueprint.png)

[![](/skins/common/images/magnify-clip.png)](/File:CharacterBlueprint.png "Enlarge")

The biped, in t-pose, with a camera on their shoulders. Note how I've also made the character collider thinner. This is so that it fits through the smaller doors.

*   Delete the biped and save the Blueprint.

  

*   Place a Player Start into your scene and put a biped inside it.

[![](https://d3ar1piqh1oeli.cloudfront.net/d/db/PlayerStart.png/180px-PlayerStart.png)](/File:PlayerStart.png)

[![](/skins/common/images/magnify-clip.png)](/File:PlayerStart.png "Enlarge")

The PlayerStart should be inside the biped

*   When the game begins the player should start inside the head of the biped, looking out.

*   Remember: The Rift elevates the camera when it is active so don't worry if it looks wrong outside of the Rift.

*   Make sure the Rift is working and run your game in a Standalone Window. Full screen it once it has loaded to activate Rift mode.

  

*   Stand up (don’t fall over! The Rift can make you dizzy) and adopt the same position as the biped.
*   Look down your virtual arms and lift the Rift up to compare them to your actual arms.
*   Refine the position of your real arms till they match up with the virtual arms. You’re looking for inconsistencies between reality and virtuality.

*   Does it feel real? If not, change the camera’s position and try again.
*   If you find the way the camera intersects with the head and neck of the biped annoying, go back into your modelling program and create a headless version. Use that version in the scene.

  

Step 3: Creating your work space.
---------------------------------

You need a reference on which to base everything else’s scale. Try measuring a doorway using a ruler and recreating it in-game with BSP.

*   Stand in the doorway in game and look carefully at it, trying to judge how far away it is. Reach out and imagine gripping the sides and top of the doorframe. Remember how it feels for your arms to be in that position.
*   Remove the Rift and repeat the process in a real doorway, comparing imagined distance and arm positions. Again, you’re looking for things that feel wrong, adjusting where needed.

*   Personally, I found that my door felt too narrow in virtual reality, especially at the floor, despite being modelled accurately. I made it 10cm wider than reality.
*   Another common issue is that the top of the door feels too low. Experimentation is key.

[![](https://d3ar1piqh1oeli.cloudfront.net/e/ed/VR_Door.jpeg/180px-VR_Door.jpeg)](/File:VR_Door.jpeg)

[![](/skins/common/images/magnify-clip.png)](/File:VR_Door.jpeg "Enlarge")

This is the door I made. I also put a box behind it detailing the real world dimentions

### Step 3.1: The Ultimate Test.

Now we’re going to create your desk, a model of you sitting to get the height of the camera right and put markers on both your virtual and real desk to check to see if they match up.

*   Save your UE4 Scene and open your modelling software. Again, I’m assuming 3DS Max.
*   Take your original biped and pose it in a comfortable sitting position. Try to mimic how you’re sitting in your chair at the moment so that you can recreate the pose in reality with relative ease.

*   Take a second Snapshot of the biped, attach it together and export/import it into your UE4 scene.
*   Duplicate the Character Blueprint, keeping track of which is the original.
*   Rename the clone to CharacterStanding or something similar.
*   Open the original in the Blueprint Editor.
*   Drag in the sitting model you just created and adjust the camera to the correct height.
*   Delete the mesh and save the Blueprint.

*   The reason you change the original, not the copy, is that the original is the one used by Player Start. If you find nothing has changed, go into your GameType settings and change the default Character.

[![](https://d3ar1piqh1oeli.cloudfront.net/a/af/GameModeBlueprint.png/180px-GameModeBlueprint.png)](/File:GameModeBlueprint.png)

[![](/skins/common/images/magnify-clip.png)](/File:GameModeBlueprint.png "Enlarge")

GameModes are stored as blueprints. Go to the Defaults Mode to change which type of character spawns at Player Starts

  
Next up, you’ll need a desk.

*   Measure your desk and build it in the scene. Put the sitting mesh next to it so that it’s sitting in place.

[![](https://d3ar1piqh1oeli.cloudfront.net/0/0f/CameraheadSitting.png/180px-CameraheadSitting.png)](/File:CameraheadSitting.png)

[![](/skins/common/images/magnify-clip.png)](/File:CameraheadSitting.png "Enlarge")

One biped, sitting at a desk. The black patches on the desk are not intentional

*   Position the Player Start so that you start the game sitting at your desk.
*   Adopt the position of the model and compare the real desk’s position to the virtual desk.

*   Put your hands where the biped’s hands are and raise/lower the Rift to compare. Are your hands the right size? Small hands is a sure fire way to identify a low desk.
*   I found my virtual desk felt a little too low. I raised it by 10cm.
*   See if you can convince yourself that you’re leaning on the virtual desk when you’re leaning on your real one.

  
Now to set up some reference points.

*   Using BSP to measure distances, place little markers (more BSP) on your virtual desk and then replicate the markers on your real desk using coins or stickers.
*   Put on the Rift and try to reach out and touch the virtual markers on your desk. Compare where you touch to where your real markers actually are. If you can reliably line up the virtual with the real, you’re ready to start making the rest of the level.

Step 4: Building the Level
--------------------------

*   [![SittingPOV.jpeg](https://d3ar1piqh1oeli.cloudfront.net/e/e3/SittingPOV.jpeg/120px-SittingPOV.jpeg)](/File:SittingPOV.jpeg)
    
*   [![VRLevelScreenshot05.jpg](https://d3ar1piqh1oeli.cloudfront.net/1/12/VRLevelScreenshot05.jpg/120px-VRLevelScreenshot05.jpg)](/File:VRLevelScreenshot05.jpg)
    
*   [![VR Door.jpeg](https://d3ar1piqh1oeli.cloudfront.net/e/ed/VR_Door.jpeg/120px-VR_Door.jpeg)](/File:VR_Door.jpeg)
    
*   [![VRLevelScreenshot04.jpg](https://d3ar1piqh1oeli.cloudfront.net/f/ff/VRLevelScreenshot04.jpg/120px-VRLevelScreenshot04.jpg)](/File:VRLevelScreenshot04.jpg)
    
*   [![VRLevelScreenshot05-5.jpg](https://d3ar1piqh1oeli.cloudfront.net/f/fc/VRLevelScreenshot05-5.jpg/120px-VRLevelScreenshot05-5.jpg)](/File:VRLevelScreenshot05-5.jpg)
    
*   [![VRLevelScreenshot06.jpg](https://d3ar1piqh1oeli.cloudfront.net/f/f3/VRLevelScreenshot06.jpg/120px-VRLevelScreenshot06.jpg)](/File:VRLevelScreenshot06.jpg)
    

Based on my own experiences running through this exercise, surfaces at hip height (desks, window sills) should be moved up by 5-10cm compared to their real world counterparts and doors should be made slightly wider than reality to both allow players to travel through them easier and to relieve the sense that they’re too small at the bottom where perspective combines with the narrow frame.

I’ve also created a very simple crouch mechanic in the Character Blueprint that takes the character to and from sitting position, allowing me to test heights from sitting position or standing without having to change the character controller in the level. It is included in the level. If you simply copy the nodes for the crouch mechanic across to your project, bear in mind that by default, crouching is not allowed. You have to go into the Defaults tab of the Blueprint Editor and change both the checkbox that allows crouching and the crouch height so that it matches your character’s sitting height.

I got measurements for my test level from insulation company websites and window and door manufacturers. If you can measure things yourself, all the better but sometimes that won't be possible. In a pinch, the internet will provide.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Making\_a\_level\_for\_VR&oldid=5023](https://wiki.unrealengine.com/index.php?title=Making_a_level_for_VR&oldid=5023)"