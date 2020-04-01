CTF Flag State Blueprint (Unreal Tournament) - Epic Wiki                    

CTF Flag State Blueprint (Unreal Tournament)
============================================

Contents
--------

*   [1 Introduction](#Introduction)
    *   [1.1 Concept](#Concept)
    *   [1.2 Detect flag state](#Detect_flag_state)
        *   [1.2.1 Power Manager Blueprint](#Power_Manager_Blueprint)
        *   [1.2.2 Update Flag State](#Update_Flag_State)
        *   [1.2.3 Blueprint Interface and Power Actor](#Blueprint_Interface_and_Power_Actor)
        *   [1.2.4 Get All Power Actors](#Get_All_Power_Actors)
        *   [1.2.5 Update Power State](#Update_Power_State)
    *   [1.3 BP\_PowerDoor blueprint](#BP_PowerDoor_blueprint)
        *   [1.3.1 Door Components](#Door_Components)
        *   [1.3.2 Door Variables](#Door_Variables)
        *   [1.3.3 Construction Scipt](#Construction_Scipt)
        *   [1.3.4 Set Power State](#Set_Power_State)
        *   [1.3.5 Open and Close events](#Open_and_Close_events)
    *   [1.4 Player interaction](#Player_interaction)
        *   [1.4.1 Detecting Overlaps](#Detecting_Overlaps)
        *   [1.4.2 Flag Holding](#Flag_Holding)
        *   [1.4.3 End Overlap](#End_Overlap)
        *   [1.4.4 Door Colouring](#Door_Colouring)

Introduction
============

While working on a CTF map for Unreal Tournament I had the idea of driving events from the flag state. This tutorial documents creating that system using blueprint. The primary purpose of the tutorial is to highlight what is possible with blueprint within the UT framework.

I like writing tutorials, and I REALLY like working with blueprint. I'm currently working on a CTF map that uses flag state to drive blueprints across the map, this tutorial covers the flag detection system and setting up the responding blueprints.

Concept
-------

> **The flags control generators powering base security systems. Taking the flag cause the generators to fail and resets all the base doors to open. When the flag is returned the generator turns on and the doors close again. While powered doors will only open for team members who are not carrying the enemy flag.**

Here is a video of it all working as intended;

Let's start by breaking it up into discrete tasks;

*   Detect flag state
*   Update actors based on state
*   Create Door
*   Open door if flag is taken
*   Only allow team members to open door if powered
*   Do not let them though if they are carrying enemy flag\*
*   Unless they are behind a door when they are powered and need to get back into the "public" area.
    *   In the current version there is an issue where one team member can hold open the door while one runs though. I am trying to work out how to cause the flag to drop in that case but it's hard to do via blueprint. There is a DropCarriedObject function on UTcharater but it isn't blueprint exposed.

Detect flag state
-----------------

UT currently has no global events for the flag state, I.e. OnPickup, OnDrop, OnCapture, OnReturn. We can however create our own system in blueprint. This works by looking at the state of the Carried Object relating to each flag base (i.e. the flag). These objects have 4 states. Home (at base), Held (by a player), Dropped (on the floor) and None (default). If, every server tick, compare the current state to its previous state we can identify when the state changes and fire off logic in response.

This however shouldn't be done with each object that needs to know the current flag state as we look at it each server tick. Instead it should be done in one location, a manager blueprint. I dislike creating blueprints that sit in the environment with no visual presence but it's the cleanest way I've found to do this so far. However, since we need to make a manager blueprint we can get it to do a bit more processing, freeing up our objects to act more independently.

### Power Manager Blueprint

This blueprint has two main functions. To keep track of the flag states, and to update other actors when the state changes. With this concept it controls if the power is on (flag at base) or off (flag not at base)

Firstly the flag state updater. For this you'll need 4 variables. Two Name variables and two UTCTFFlagBase variables, one for each per flag base. Make sure the UTCTFFlagBase variables are editable so that when you drop the manager in the world you can correctly hook up the variables with the flag bases in the world.

This script is fired each server tick, for each flag base. It looks at the current flag state and compares it to the stored (previous) state; if they don't match the current state is updated with the new state and we fire the update flag state function.

[![](https://d26ilriwvtzlb.cloudfront.net/c/ca/UT_BP_CTF_FlagStateTut1.jpg)](/File:UT_BP_CTF_FlagStateTut1.jpg)

Checks to see if state has changed since last tick.

The update flag function takes in a team byte and a state bool. For this I'm using if the flag is held or not. To keep the blueprint clean I put this little comparison in a macro. All it does is check if the stored state matches Dropped or Held and returns if so. You could easily also check if it's at base with a single == Home if it wasn't for the default None. In fact when I first created this I forgot Dropped was a state so pumped for the option with the fewest nodes (I.e. just a single == held). Either method is fine, I just chose this one.

[![](https://d26ilriwvtzlb.cloudfront.net/1/1b/UT_BP_CTF_FlagStateTut2.jpg)](/File:UT_BP_CTF_FlagStateTut2.jpg)

Space saving macro, hiding two possible states.

As I said, we do this for each flag base per tick. So the entire sequence looks like this;

[![](https://d26ilriwvtzlb.cloudfront.net/6/67/UT_BP_CTF_FlagStateTut3.jpg)](/File:UT_BP_CTF_FlagStateTut3.jpg)

State change logic in it's entirety.

### Update Flag State

Update Flag State is used to interpret the updated state and apply logic to it. For this map we want to take the state of the flag and only update the relevant team actors. It looks at the incoming team, the incoming state and makes the updates. The NOT nodes here swap the IsHeld to Power status (True = powered, False = unpowered); in hindsight setting it up to be AtBase would have been more logical but there we go.

[![](https://d26ilriwvtzlb.cloudfront.net/8/8d/UT_BP_CTF_FlagStateTut4.jpg)](/File:UT_BP_CTF_FlagStateTut4.jpg)

Passes state update to BP\_PowerActors by team.

### Blueprint Interface and Power Actor

Next we need to create a two new blueprints. One being the Blueprint Interface BPI\_Power including the function Set Power State with the input Bool PowerState. The other being BP\_PowerActor which both implements BPI\_Power and has an editable Team Byte variable on it.

The idea here is that when we create blueprints with different functionality, doors, lights, etc, that all need to respond to updates from our manager we can set their parent to be BP\_PowerActor. This allows us to set that blueprints team, and compare it at runtime as well as call Set Power State on any of these new blueprints. This might not make much sense now but it will when we come to create the door.

### Get All Power Actors

There are two variables on Update Flag State I have yet to talk about, the arrays of Red and Blue actors. These are collected in the managers construction script, which is just hooked directly up to the Get All Power Actor function ... which is a little complex so I'll break it up.

[![](https://d26ilriwvtzlb.cloudfront.net/0/05/UT_BP_CTF_FlagStateTut5.jpg)](/File:UT_BP_CTF_FlagStateTut5.jpg)

Complete sequence.

The first step is to grab all the actors of the class BP\_Power, this gives us an array of actors we can then foreach loop though.

[![](https://d26ilriwvtzlb.cloudfront.net/5/5e/UT_BP_CTF_FlagStateTut6.jpg)](/File:UT_BP_CTF_FlagStateTut6.jpg)

Grabs all the Power Actors in the level.

We need to make sure we're not counting our actors twice, this section checks if each actor in the generated array is contained within the RedActors or BlueActors array, if so it ignores the actor and moves on. You might be thinking that this checking isn't required but keep in mind that we never empty these arrays. More or less any interaction with a blueprint in the level (moving it, building, etc) will cause it to re-run it's construction script so the arrays can easily end up containing multiple references to actors in the world meaning any action on the array is likely to hit the same actor multiple times. This section avoids all that.

[![](https://d26ilriwvtzlb.cloudfront.net/3/33/UT_BP_CTF_FlagStateTut7.jpg)](/File:UT_BP_CTF_FlagStateTut7.jpg)

Protects against duplicates.

Now that we know we've not stored the actor yet we can cast it to a BP\_Power actor (the foreach loop generalizes the actor), look at its team and add it to the appropriate array.

[![](https://d26ilriwvtzlb.cloudfront.net/3/32/UT_BP_CTF_FlagStateTut8.jpg)](/File:UT_BP_CTF_FlagStateTut8.jpg)

Stores actors in relevant arrays.

### Update Power State

We now have arrays of both red actors and blue actors of which we know will respond to the function Set Power State. This leads us nicely to the next part of the Update Flag State function where we call Update Power State. All this does is take the power state and the array passed to it and calls Set Power State for each one.

[![](https://d26ilriwvtzlb.cloudfront.net/4/44/UT_BP_CTF_FlagStateTut9.jpg)](/File:UT_BP_CTF_FlagStateTut9.jpg)

Looping though array and calling Set Power state on each via interface.

Currently we have a system that tracks each flags state and tells a specific set of actors to update when that state changes. Now we just need some actors to update.

BP\_PowerDoor blueprint
-----------------------

The door may look quite complex on the surface but it's just big, not complex; it also has a lot of variables and components so I'm going to take it piece by piece. Just to refresh your memory, like any actor that responds to power updates it must have the parent class of BP\_PowerActor.

### Door Components

Here we have all the components of the door and how they're organised, there are a couple of things here to note. Firstly everything is parented to DoorBase, secondly the left and right meshes are parented to the scene components left and right door. Also note the OutDirection arrow, it doesn't render in game but helps us orientate the door correctly. We also have a box component I've renamed trigger volume.

[![](https://d26ilriwvtzlb.cloudfront.net/9/91/UT_BP_CTF_FlagStateTut10.jpg)](/File:UT_BP_CTF_FlagStateTut10.jpg)

Component list.

The exact details of each component will depend on what meshes you're using, but in you want the centre of your door to be at DoorBase, and for your left and right door scene components to have 0 relative location and rotation. Any transform changes should be made on the actual mesh components themselves. This way we can move the scene components in relative space without having to worry about the meshes transform getting messed up. I've also set the three audio components to acceptable sounds.

The only other key changes you need to worry about is with the TriggerVolume Box Component collision settings. Make sure it is only registering an overlap with pawns. To do this you need to set the preset to custom and set everything but pawn to ignore, pawn should be overlap. If this is set wrong you can end up allowing shots to trigger the door rather than just players.

[![](https://d26ilriwvtzlb.cloudfront.net/e/e5/UT_BP_CTF_FlagStateTut11.jpg)](/File:UT_BP_CTF_FlagStateTut11.jpg)

Trigger Volume Collision settings.

### Door Variables

Next we have variables, all 14 of them. I'm going to go though these as they come up, but here's an image of the whole set so you get the idea.

[![](https://d26ilriwvtzlb.cloudfront.net/9/96/UT_BP_CTF_FlagStateTut12.jpg)](/File:UT_BP_CTF_FlagStateTut12.jpg)

Full variables list.

### Construction Scipt

First thing I did was set up the ability to scale the door as desired. For this I created an editable Doors scale vector variable and hooked it up to a Set Relative Scale 3D node targeted at door base; this goes in the construction script and makes it easy to make the door any size you like.

On the subject of the construction script we need to set up some variables related to the door's visuals. As you can see in the video the door mesh has some panels that change colour depending on the door's state. To make this work we need what's called a Material Instance Dynamic (or MID for short). These variables are set by taking a mesh and hooking it up to a Create Dynamic Material Instance node, This node has an element index entry which is used to specify which material index you want to change. To correctly select which element index you want take a look at the mesh you're using; on the right you should see the LOD0 section with a bunch of element entries.

MIDs are mesh component independent, this means you need one for each door mesh.

[![](https://d26ilriwvtzlb.cloudfront.net/f/f5/UT_BP_CTF_FlagStateTut13.jpg)](/File:UT_BP_CTF_FlagStateTut13.jpg)

Door scale and creating MIDs.

The last part of the construction script changes the material of the door's body depending on what the team variable (inherited from BP\_PowerActor) is set to. To do this we have two variables pointing at two Material Instances, one for red, one for blue. We simply then look at the team variable and branch depending on the result, and set the material for each door in turn.

[![](https://d26ilriwvtzlb.cloudfront.net/a/a1/UT_BP_CTF_FlagStateTut14.jpg)](/File:UT_BP_CTF_FlagStateTut14.jpg)

Setting door material based on team.

### Set Power State

Next, in the event graph, I added the event Set Power State from the BPI\_Power interface inherited from BP\_PowerActor; from this I set the bool variable IsPowered. Since this variable is set to Rep Notify it automatically fires off the function On Rep Notify which in turn fires off the custom events Close or Open door depending on the state of IsPowered. We also run the Set Door Colour function, but we will come back to that.

There is a little bit of redundancy here, in a way we are replicating the same data twice. Since On Rep Is Powered happens on every client we don't need to multicast Close and Open door. However as we want to open and close doors without updating the IsPowered variable multicasting is still useful.

[![](https://d26ilriwvtzlb.cloudfront.net/5/52/UT_BP_CTF_FlagStateTut15.jpg)](/File:UT_BP_CTF_FlagStateTut15.jpg)

Interface event Set Power State updating IsPowered on the server.

[![](https://d26ilriwvtzlb.cloudfront.net/9/90/UT_BP_CTF_FlagStateTut16.jpg)](/File:UT_BP_CTF_FlagStateTut16.jpg)

Client response to change in variable state via RepNotify.

### Open and Close events

Next we have the meat of the door, the Open and Close Door events.

[![](https://d26ilriwvtzlb.cloudfront.net/5/50/UT_BP_CTF_FlagStateTut17.jpg)](/File:UT_BP_CTF_FlagStateTut17.jpg)

Complete sequence.

To make the door move we need a timeline node, inside we have a float track with two keyframes, (0,0) and (1,1); we use this to drive two set relative location nodes via two Lerp(vector) nodes. These go between (relative) 0,0,0 and the (relative) Door Open Distance Vector Variable (which I have defaulted to 200). What this means is that for each frame within the timeline the Lerp will calculate how far the door will have moved and sets the doors relative location to that value. Hey presto, movement. Attaching Open to Play and Close to Reverse results in a door that opens on OpenDoor, and Closes on CloseDoor.

[![](https://d26ilriwvtzlb.cloudfront.net/a/ad/UT_BP_CTF_FlagStateTut18.jpg)](/File:UT_BP_CTF_FlagStateTut18.jpg)

Timeline set-up.

This however is not the entirety of this section. At the start of it we do a few things. Firstly we check the bool DoorOpen to check if the door is in fact open or not. This only exists to catch visual and audio events which would otherwise play when we don't want them to. We should **probably** be replicating this variable and doing all this checking on the server side, but for this example I'm not going to, which is probably bad. However as these doors will likely open and close so frequently the state will change often so in reality it doesn't really matter if the state is always replicated perfectly.

Next we want to change the play rate of the timeline. This lets us define how fast we want to open or close the door independently, for example if you wanted a door to open very slowly but close very quickly. The method I use here was borrowed from DM-Overlord and is more of a guestimate system to allow level designers to tweak it until it feels right. In essence it's a factor system in which you're dilating or constricting the time range against the original value of the timeline. A value of 0.25 means "Do this in 1/4 of the time", a value of 2 means "Do this is double the time".

Anyway, maths isn't my strongest suit so apologies for this rather muddled explanation. TLDR; for Open and Close Door Time, big numbers = slower, small number = faster.

Near the end of this section we have two sets of Deactivate and Activate nodes targeted at our open and close audio components. These simply make sure the opposite sound isn't playing and plays the correct sound. E.g. if the door is closing and suddenly needs to open, the close sound will cut short and the open sound will start. It's worth noting here that all 3 audio components are set not to auto activate, this avoids the cacophony of all the door sounds, for all the doors all going off at once when the level starts.

The last step here sets the Door Open bool to the new door state.

[![](https://d26ilriwvtzlb.cloudfront.net/f/f6/UT_BP_CTF_FlagStateTut19.jpg)](/File:UT_BP_CTF_FlagStateTut19.jpg)

Bool checks gate play and sound activation to avoid double playing.

Player interaction
------------------

Now the system detects the change in flag sate, set the power state, and opens and closes a door based on that power state. The next thing to tackle is allowing players to open doors, if they are on the right team, and if they are not carrying the enemy flag. To do this we need to take the OnComponentBeingOverlap and OnComponentEndOverlap events for TriggerVolume and check the incoming actor. Here's the entire sequence in tiny eyestrain-o-vision.

[![](https://d26ilriwvtzlb.cloudfront.net/2/21/UT_BP_CTF_FlagStateTut20.jpg)](/File:UT_BP_CTF_FlagStateTut20.jpg)

Completed sequence.

### Detecting Overlaps

First thing we do on the BeginOverlap is check if the actor is powered, if it is we run CheckTeam which just casts the actor to a UTcharacter and if it's team matches the team of the door.

[![](https://d26ilriwvtzlb.cloudfront.net/6/6c/UT_BP_CTF_FlagStateTut21.jpg)](/File:UT_BP_CTF_FlagStateTut21.jpg)

Server receives overlap.

[![](https://d26ilriwvtzlb.cloudfront.net/9/9b/UT_BP_CTF_FlagStateTut22.jpg)](/File:UT_BP_CTF_FlagStateTut22.jpg)

Check team function returns if player is on the same team as the door or not.

### Flag Holding

This chunk calls another custom function, CheckIfHoldingFlag. It takes the incoming actor an casts it to a UTcharacter, takes the player state of that character and casts THAT to a UTPlayerState; from that we can get the CarriedObject variable. We can use the IsValid node to check if an entry exists or not, we know that if the player is the same team as the door, and is carrying an object that they must be carrying the enemy flag, since this is the only object they can carry. From this we can set the local variable IsHoldingFlag and return it.

[![](https://d26ilriwvtzlb.cloudfront.net/a/a4/UT_BP_CTF_FlagStateTut23.jpg)](/File:UT_BP_CTF_FlagStateTut23.jpg)

Various checks on the status of the overlapping player.

[![](https://d26ilriwvtzlb.cloudfront.net/5/59/UT_BP_CTF_FlagStateTut24.jpg)](/File:UT_BP_CTF_FlagStateTut24.jpg)

CheckIfHoldingFlag function.

Next we check if the door we are interacting with is set to internal or not. Internal doors have no way "out" and hence shouldn't stop a team member carrying the flag from moving though them. This moves into the IsBehindDoor function; this exists to protect against a stalemate scenario where a flag carrying team member becomes trapped behind a team door after it has become powered following a stalemate.

IsBehindDoor takes in an actor and checks if the difference between it's location vector and the location vector of the door is in the same orientation as the out arrow. I.e. is the actor activating the door behind it or not.

All this allows us to apply some logic to the data we're getting in. We only want to call OpenDoor if the activating player is on our team, and is not carrying the flag; unless they are, and are behind a door / if the door is internal. Otherwise we want to call the Custom event DoorBlocked.

[![](https://d26ilriwvtzlb.cloudfront.net/7/7d/UT_BP_CTF_FlagStateTut25.jpg)](/File:UT_BP_CTF_FlagStateTut25.jpg)

IsbeindDoor function.

### End Overlap

EndOverlap is much simpler. Since the the player has either passed though the door, or has given up trying to if they on the wrong team all it needs to do is check if it's powered or not. If it is all we need to do is clear the door, and close it.

[![](https://d26ilriwvtzlb.cloudfront.net/4/4b/UT_BP_CTF_FlagStateTut26.jpg)](/File:UT_BP_CTF_FlagStateTut26.jpg)

End overlap.

And we're almost done. The last major thing we need to look at are the DoorBlocked and the DoorClear custom events. First DoorBlocked set the doors colour to Denied, activates the denied sound, and closes the door in the face of the enemy / flag carrying team member. DoorClear simply sets the colour back to Powered. Simple.

[![](https://d26ilriwvtzlb.cloudfront.net/0/0d/UT_BP_CTF_FlagStateTut27.jpg)](/File:UT_BP_CTF_FlagStateTut27.jpg)

Door Bocked and Door Clear events replicated to clients.

DoorClear simply sets the colour back to Powered.

### Door Colouring

The very last thing to look at is our Set Door Colour function. We first saw this back in On Rep Is Powered. We use this as a go to function to set the colour of the emissive door insert, and it takes in 3 arguments. A colour value, if the light is on, and if it is pulsing.

[![](https://d26ilriwvtzlb.cloudfront.net/4/46/UT_BP_CTF_FlagStateTut28.jpg)](/File:UT_BP_CTF_FlagStateTut28.jpg)

Completed Set Door Colour utility function.

This first chunk sets the Colour parameter for the left and right door to the linear colour passed to it via the MIDs we set up in the construction script.

[![](https://d26ilriwvtzlb.cloudfront.net/2/25/UT_BP_CTF_FlagStateTut29.jpg)](/File:UT_BP_CTF_FlagStateTut29.jpg)

Setting vector parameters for colour

The second chunk looks at the IsOn bool and sets the Timer parameter for the same MIDs. This parameter controls the rate at which the emissive material scrolls across. Setting it to 0 stops is moving, i.e. unpowered. We do a similar thing with the PulseTime parameter which controls the speed of the pulses, a value of 0 means no pulses.

[![](https://d26ilriwvtzlb.cloudfront.net/e/ec/UT_BP_CTF_FlagStateTut30.jpg)](/File:UT_BP_CTF_FlagStateTut30.jpg)

Setting scalar parameters for pulsing and scrolling.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=CTF\_Flag\_State\_Blueprint\_(Unreal\_Tournament)&oldid=11619](https://wiki.unrealengine.com/index.php?title=CTF_Flag_State_Blueprint_(Unreal_Tournament)&oldid=11619)"

[Categories](/Special:Categories "Special:Categories"):

*   [Unreal Tournament](/Category:Unreal_Tournament "Category:Unreal Tournament")
*   [UT Content Creation](/Category:UT_Content_Creation "Category:UT Content Creation")
*   [Tutorials](/Category:Tutorials "Category:Tutorials")

  ![](https://tracking.unrealengine.com/track.png)