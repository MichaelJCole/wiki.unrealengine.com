(window.webpackJsonp=window.webpackJsonp||[]).push([[216],{457:function(t,e,r){"use strict";r.r(e);var a=r(28),i=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("p",[t._v("Blueprint Lift Tutorial - Epic Wiki")]),t._v(" "),r("h1",{attrs:{id:"blueprint-lift-tutorial"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#blueprint-lift-tutorial"}},[t._v("#")]),t._v(" Blueprint Lift Tutorial")]),t._v(" "),r("p",[t._v("From Epic Wiki")]),t._v(" "),r("p",[t._v("(Redirected from "),r("a",{attrs:{href:"/index.php?title=Blueprint_Lift_(Tutorial)&redirect=no",title:"Blueprint Lift (Tutorial)"}},[t._v("Blueprint Lift (Tutorial)")]),t._v(")")]),t._v(" "),r("p",[t._v("Jump to: "),r("a",{attrs:{href:"#mw-navigation"}},[t._v("navigation")]),t._v(", "),r("a",{attrs:{href:"#p-search"}},[t._v("search")])]),t._v(" "),r("h2",{attrs:{id:"contents"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#contents"}},[t._v("#")]),t._v(" Contents")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#Overview"}},[t._v("1 Overview")])]),t._v(" "),r("li",[r("a",{attrs:{href:"#Setting_up_the_Level"}},[t._v("2 Setting up the Level")])]),t._v(" "),r("li",[r("a",{attrs:{href:"#Matinee"}},[t._v("3 Matinee")])]),t._v(" "),r("li",[r("a",{attrs:{href:"#Blueprint"}},[t._v("4 Blueprint")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#Commenting"}},[t._v("4.1 Commenting")])])])])]),t._v(" "),r("h2",{attrs:{id:"overview"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),r("p",[t._v("Lifts and moving platforms can be an integral part of moving your character through a level, and by combining Matinee and Blueprints, it is simple to construct them. Like the "),r("em",[t._v("Spotlight Off Switch")]),t._v(" and "),r("em",[t._v("Spotlight Toggle Switch")]),t._v(" Level Blueprint examples, this example begins with the template "),r("strong",[t._v("Blueprint Third Person")]),t._v(". This template contains a camera, a character, and some basic gameplay setup, all in Blueprint format. You can open the existing Blueprints in the game to see how those work.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Scene_no_lift_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/b/b0/Scene_no_lift_LT.png",alt:"Scene no lift LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Scene_no_lift_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("h2",{attrs:{id:"setting-up-the-level"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#setting-up-the-level"}},[t._v("#")]),t._v(" Setting up the Level")]),t._v(" "),r("p",[t._v("Just to provide a visible objective for the character to reach, a StaticMesh platform has been added above the character's head, with an additional StaticMesh sphere to represent some object the character wants to pick up. "),r("strong",[t._v("Class Blueprints")]),t._v(" would be ideal for adding in-game functionality to objects like this sphere. The platform and sphere do not need to be present for this example to work - they just help to provide context for the lift platform's placement.")]),t._v(" "),r("p",[t._v("We are beginning with the Level Blueprint for this game. Anything currently in a level can be referenced by a Level Blueprint. Therefore, our first step is to put some objects into our level.")]),t._v(" "),r("p",[t._v("1. From either the "),r("strong",[t._v("Content Browser")]),t._v(" or the "),r("strong",[t._v("Tools")]),t._v(" pane, select the "),r("em",[t._v("StaticMesh")]),t._v(" "),r("strong",[t._v("Shape_Cube")]),t._v(". Drag this StaticMesh into the level, and place it on the ground somewhere next to the platform your character needs to reach. You can resize the platform to make it a good size to stand on.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Scene_liftmesh_perspective_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/7/7c/Scene_liftmesh_perspective_LT.png",alt:"Scene liftmesh perspective LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Scene_liftmesh_perspective_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Scene_liftmesh_top_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/c/ca/Scene_liftmesh_top_LT.png",alt:"Scene liftmesh top LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Scene_liftmesh_top_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("2. In the "),r("strong",[t._v("Details")]),t._v(" pane for your "),r("em",[t._v("StaticMesh")]),t._v(", rename it to "),r("strong",[t._v('"LiftPlatform"')]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Details_liftmesh_rename_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/9/9a/Details_liftmesh_rename_LT.png",alt:"Details liftmesh rename LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Details_liftmesh_rename_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("3. Also in the "),r("strong",[t._v("Details")]),t._v(" pane, change the "),r("strong",[t._v("Mobility")]),t._v(" of the "),r("em",[t._v("StaticMesh")]),t._v(" to "),r("strong",[t._v("Moveable")]),t._v(". This will allow your "),r("em",[t._v("MatineeActor")]),t._v(" to move the platform.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Details_liftmesh_mobility_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/1/1d/Details_liftmesh_mobility_LT.png",alt:"Details liftmesh mobility LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Details_liftmesh_mobility_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("4. Right-click in the level, and then select "),r("strong",[t._v("Add Actor > Trigger > Trigger (Box)")]),t._v(" to place a "),r("strong",[t._v("Trigger (Box)")]),t._v(" in your level. Align it over your "),r("strong",[t._v("LiftPlatform")]),t._v(", and resize it so that it is the same size as the platform in the X and Y directions.")]),t._v(" "),r("p",[t._v("An Actor is an object that can be placed or spawned in the level. "),r("em",[t._v("Lights, TriggerVolumes, StaticMeshes,")]),t._v(" and "),r("em",[t._v("Cameras")]),t._v(" are all examples of Actors.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Scene_trigger_perspective_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/3/31/Scene_trigger_perspective_LT.png",alt:"Scene trigger perspective LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Scene_trigger_perspective_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("5. In the "),r("strong",[t._v("Scene Outliner")]),t._v(" pane, drag and drop the "),r("strong",[t._v("TriggerBox")]),t._v(" entry onto the "),r("strong",[t._v("LiftPlatform")]),t._v(" entry, so that it becomes nested below it. This will attach the "),r("strong",[t._v("TriggerBox")]),t._v(" to the "),r("strong",[t._v("LiftPlatform")]),t._v(", so that when the "),r("em",[t._v("Level Blueprint")]),t._v(" moves the "),r("strong",[t._v("LiftPlatform")]),t._v(", the "),r("strong",[t._v("TriggerBox")]),t._v(" will move as well.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Attach_trigger_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/5/5d/Attach_trigger_LT.png",alt:"Attach trigger LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Attach_trigger_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("6. Using the "),r("strong",[t._v("Window")]),t._v(" menu in the "),r("strong",[t._v("Level Editor")]),t._v(", open the "),r("strong",[t._v("Class Viewer")]),t._v(".")]),t._v(" "),r("p",[t._v("7. Type "),r("em",[t._v("Matinee")]),t._v(" into the "),r("strong",[t._v("Class Viewer")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Class_viewer_matinee_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/7/75/Class_viewer_matinee_LT.png",alt:"Class viewer matinee LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Class_viewer_matinee_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("8. Drag and drop a "),r("em",[t._v("MatineeActor")]),t._v(" into the level.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_dragdrop_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/9/96/Matinee_dragdrop_LT.png",alt:"Matinee dragdrop LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_dragdrop_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("9. In the "),r("strong",[t._v("Details")]),t._v(" pane for your new "),r("em",[t._v("MatineeActor")]),t._v(", rename it to "),r("strong",[t._v('"LiftMatinee"')]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Details_matinee_rename_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/5/5e/Details_matinee_rename_LT.png",alt:"Details matinee rename LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Details_matinee_rename_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("h2",{attrs:{id:"matinee"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#matinee"}},[t._v("#")]),t._v(" Matinee")]),t._v(" "),r("p",[t._v("You are going to use this "),r("em",[t._v("MatineeActor")]),t._v(" to move the lift platform to its final position.")]),t._v(" "),r("p",[t._v("1. Click on the "),r("strong",[t._v("Matinee")]),t._v(" button in the "),r("strong",[t._v("Level Editor")]),t._v(" Toolbar and select "),r("strong",[t._v("LiftMatinee")]),t._v(" in the menu that appears.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Open_matinee_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/4/4c/Open_matinee_LT.png",alt:"Open matinee LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Open_matinee_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("2. Click "),r("strong",[t._v("Continue")]),t._v(" on the "),r("strong",[t._v("Matinee Undo Warning")]),t._v(" that appears.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_undo_warning_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/c/c6/Matinee_undo_warning_LT.png",alt:"Matinee undo warning LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_undo_warning_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("The "),r("strong",[t._v("Matinee Editor")]),t._v(" window will open.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_editor_LT.png"}},[r("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/8/80/Matinee_editor_LT.png/940px-Matinee_editor_LT.png",alt:"Matinee editor LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_editor_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("3. Right-click in the "),r("strong",[t._v("Group/Track List")]),t._v(" of the "),r("strong",[t._v("Timeline Pane")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Right_click_area_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/e/ec/Right_click_area_LT.png",alt:"Right click area LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Right_click_area_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("4. Select "),r("strong",[t._v("Add New Empty Group")]),t._v(" in the right-click menu.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Add_new_empty_group_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/5/56/Add_new_empty_group_LT.png",alt:"Add new empty group LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Add_new_empty_group_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("5. Type "),r("em",[t._v("LiftGroup")]),t._v(" in the "),r("strong",[t._v("New Group Name")]),t._v(" dialog.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:New_group_name_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/d/de/New_group_name_LT.png",alt:"New group name LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:New_group_name_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("6. Switch to the "),r("strong",[t._v("Level Editor")]),t._v(", and select your "),r("strong",[t._v("LiftPlatform")]),t._v(".")]),t._v(" "),r("p",[t._v("7. Return to the "),r("strong",[t._v("Matinee Editor")]),t._v(". Right-click on "),r("strong",[t._v("LiftGroup")]),t._v(", then select "),r("strong",[t._v("Actors > Add Selected Actors")]),t._v(" in the right-click menu.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_add_selected_actor_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/9/97/Matinee_add_selected_actor_LT.png",alt:"Matinee add selected actor LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_add_selected_actor_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("8. Right-click on "),r("strong",[t._v("LiftGroup")]),t._v(" and select "),r("strong",[t._v("Add New Movement Track")]),t._v(". A "),r("strong",[t._v("Movement")]),t._v(" track will appear below your "),r("strong",[t._v("LiftGroup")]),t._v(" group.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Add_new_movement_track_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/3/38/Add_new_movement_track_LT.png",alt:"Add new movement track LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Add_new_movement_track_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("9. Click on the Timeline and drag left to move the timeline to the left of the green timeline block.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_shifted_track_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/4/40/Matinee_shifted_track_LT.png",alt:"Matinee shifted track LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_shifted_track_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("There is already a red triangle to indicate the first keyframe. Your platform is already in its starting location, so you do not have to edit this first keyframe.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_first_keyframe_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/5/58/Matinee_first_keyframe_LT.png",alt:"Matinee first keyframe LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_first_keyframe_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("10. Click on the vertical black bar below your first keyframe and drag it to the right, to a time of approximately 1.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Drag_timeline_track_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/b/be/Drag_timeline_track_LT.png",alt:"Drag timeline track LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Drag_timeline_track_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("11. Press "),r("strong",[t._v("Enter")]),t._v(" to create your ending keyframe.")]),t._v(" "),r("p",[t._v("12. Switch to the Level Editor.")]),t._v(" "),r("p",[t._v("13. Translate your platform vertically to its final position. A yellow line will appear showing the path the platform will follow.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_drag_up_LT.png"}},[r("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/a/a8/Matinee_drag_up_LT.png/940px-Matinee_drag_up_LT.png",alt:"Matinee drag up LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_drag_up_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("If you disconnect the Matinee Editor tab, and arrange the tabs so that you can see both the Level Editor and the Matinee Window, you can preview the motion of your platform.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_preview_LT.png"}},[r("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/c/cc/Matinee_preview_LT.png/940px-Matinee_preview_LT.png",alt:"Matinee preview LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Matinee_preview_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("• Hit "),r("strong",[t._v("Stop")]),t._v(" twice to move playback to the start of your Matinee.")]),t._v(" "),r("p",[t._v("• Use the Play and Reverse controls to play back and reverse your Matinee.")]),t._v(" "),r("h2",{attrs:{id:"blueprint"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#blueprint"}},[t._v("#")]),t._v(" Blueprint")]),t._v(" "),r("p",[t._v("At this point, you have completed your Matinee and can close the Matinee Editor. You are now ready to begin assembling your Blueprint.")]),t._v(" "),r("p",[t._v("1. Select your TriggerBox in the Level Editor.")]),t._v(" "),r("p",[t._v("2. Click on Level Blueprint in the Level Editor Toolbar.")]),t._v(" "),r("p",[t._v("3. Right-click in the graph pane. A context menu will pop up, with a search bar to help refine your options.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Trigger_overlap_1_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/3/3e/Trigger_overlap_1_LT.png",alt:"Trigger overlap 1 LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Trigger_overlap_1_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("We want something to happen when our character overlaps the Trigger Volume. An overlap is defined as an Actor crossing into the volume of the Trigger.")]),t._v(" "),r("p",[t._v("4. In the search bar, type "),r("em",[t._v("Overlap")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Trigger_overlap_2_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/0/0c/Trigger_overlap_2_LT.png",alt:"Trigger overlap 2 LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Trigger_overlap_2_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("5. Select Set "),r("strong",[t._v("OnActorBeginOverlap")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Trigger_overlap_node_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/4/48/Trigger_overlap_node_LT.png",alt:"Trigger overlap node LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Trigger_overlap_node_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("Note here that the "),r("em",[t._v("Node")]),t._v(" that pops up has a red title bar. This identifies it as a Event "),r("em",[t._v("Node")]),t._v(".")]),t._v(" "),r("p",[t._v("6. Select your "),r("strong",[t._v("MatineeActor")]),t._v(" in the Level Editor.")]),t._v(" "),r("p",[t._v("7. Return to the "),r("strong",[t._v("Level Blueprint")]),t._v(", right-click on the Graph, and select "),r("strong",[t._v("Add Reference to LiftMatinee")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Add_matinee_reference_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/b/bb/Add_matinee_reference_LT.png",alt:"Add matinee reference LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Add_matinee_reference_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Overlap_and_matinee_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/f/f6/Overlap_and_matinee_LT.png",alt:"Overlap and matinee LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Overlap_and_matinee_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("8. Drag and drop off of the blue output pin on the "),r("strong",[t._v("LiftMatinee")]),t._v(" reference, and then type "),r("em",[t._v("Play")]),t._v(" in the context menu.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Graph_added_play_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/f/fe/Graph_added_play_LT.png",alt:"Graph added play LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Graph_added_play_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("9. Select "),r("strong",[t._v("Play")]),t._v(" under "),r("strong",[t._v("Call Function > Matinee")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Graph_add_play_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/0/0c/Graph_add_play_LT.png",alt:"Graph add play LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Graph_add_play_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("10. Connect the output execution pin of the "),r("strong",[t._v("OnActorBeginOverlap")]),t._v(" Node to the input execution pin of the "),r("strong",[t._v("Play")]),t._v(" node.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Graph_added_play_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/f/fe/Graph_added_play_LT.png",alt:"Graph added play LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Graph_added_play_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("You have created a lift that will go up when you stand on it and overlap the "),r("em",[t._v("TriggerVolume")]),t._v(". For a fully functional, reusable lift, you can set the MatineeActor to reverse whenever you leave the TriggerVolume.")]),t._v(" "),r("p",[t._v("1. Select your "),r("strong",[t._v("TriggerBox")]),t._v(" in the Level Editor.")]),t._v(" "),r("p",[t._v("2. Click on "),r("strong",[t._v("Level Blueprint")]),t._v(" in the Level Editor Toolbar.")]),t._v(" "),r("p",[t._v("3. Right-click in the graph pane. A context menu will pop up, with a search bar to help refine your options.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Trigger_overlap_1_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/3/3e/Trigger_overlap_1_LT.png",alt:"Trigger overlap 1 LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Trigger_overlap_1_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("We now want something to happen when our character leaves the Trigger Volume. This is also known as the overlap ending.")]),t._v(" "),r("p",[t._v("4. In the search bar, type "),r("em",[t._v("Overlap")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Trigger_overlap_2_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/0/0c/Trigger_overlap_2_LT.png",alt:"Trigger overlap 2 LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Trigger_overlap_2_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("5. Select "),r("strong",[t._v("Set OnActorEndOverlap")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Added_end_overlap_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/d/d3/Added_end_overlap_LT.png",alt:"Added end overlap LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Added_end_overlap_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("6. Now, drag and drop again off of the blue output pin on the "),r("strong",[t._v("LiftMatinee")]),t._v(" reference. Type Reverse in the context menu.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Add_reverse_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/8/85/Add_reverse_LT.png",alt:"Add reverse LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Add_reverse_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("7. Select Reverse under Call Function > Matinee.")]),t._v(" "),r("p",[t._v("While the output execution pin of a Node cannot be connected to the input execution pin of two different Nodes, Variables and Actor references can be connected to as many Nodes as needed. You may still want duplicate Variable or Actor reference nodes for clarity in large graphs, but there is not a linear execution system enforced for Variable and Actor references.")]),t._v(" "),r("p",[t._v("8. Connect the output execution pin of the "),r("strong",[t._v("OnActorEndOverlap")]),t._v(" Node to the input execution pin of the "),r("strong",[t._v("Reverse node")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Lift_graph_uncommented_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/b/bc/Lift_graph_uncommented_LT.png",alt:"Lift graph uncommented LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Lift_graph_uncommented_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("At this point, the Blueprint will work. If you "),r("strong",[t._v("Compile")]),t._v(" the "),r("em",[t._v("Level Blueprint")]),t._v(" and then play the game in the Level Editor, running onto the platform will cause the platform to move upwards to its final location, and leaving the platform will make it reverse to its starting position.")]),t._v(" "),r("h3",{attrs:{id:"commenting"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#commenting"}},[t._v("#")]),t._v(" Commenting")]),t._v(" "),r("p",[t._v("You can also comment your Blueprint graph so that going forward, it will be easy to know what each part of your graph does, and to keep your Blueprints organized.")]),t._v(" "),r("p",[t._v("1. Click and drag to select the five nodes you have added to the "),r("em",[t._v("Level Blueprint")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Platform_selected_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/e/e9/Platform_selected_LT.png",alt:"Platform selected LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Platform_selected_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("2. Right-click in the graph pane and select "),r("strong",[t._v("Create Comment from Selection")]),t._v(".")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Comment_2_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/d/d1/Comment_2_LT.png",alt:"Comment 2 LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Comment_2_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("3. Type "),r("em",[t._v("Lift Mechanism")]),t._v(" in the comment box that appears.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Platform_name_comment_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/4/47/Platform_name_comment_LT.png",alt:"Platform name comment LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Platform_name_comment_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("You have now successfully commented your Blueprint nodes.")]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Final_lift_bp_LT.png"}},[r("img",{attrs:{src:"https://d26ilriwvtzlb.cloudfront.net/2/2a/Final_lift_bp_LT.png",alt:"Final lift bp LT.png"}})])]),t._v(" "),r("p",[r("a",{attrs:{href:"/File:Final_lift_bp_LT.png",title:"Enlarge"}},[r("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),r("p",[t._v("By clicking on the comment box and dragging, you can drag all related nodes around in the "),r("strong",[t._v("Graph")]),t._v(" tab. The comment box title also scales as you zoom, so that even at a distance, you can locate your Lift Mechanism if you need to edit it.")]),t._v(" "),r("p",[t._v('Retrieved from "'),r("a",{attrs:{href:"https://wiki.unrealengine.com/index.php?title=Blueprint_Lift_Tutorial&oldid=6541",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://wiki.unrealengine.com/index.php?title=Blueprint_Lift_Tutorial&oldid=6541"),r("OutboundLink")],1),t._v('"')]),t._v(" "),r("p",[r("a",{attrs:{href:"/Special:Categories",title:"Special:Categories"}},[t._v("Categories")]),t._v(":")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"/Category:Tutorials",title:"Category:Tutorials"}},[t._v("Tutorials")])]),t._v(" "),r("li",[r("a",{attrs:{href:"/Category:Blueprint",title:"Category:Blueprint"}},[t._v("Blueprint")])]),t._v(" "),r("li",[r("a",{attrs:{href:"/Category:Cinematic",title:"Category:Cinematic"}},[t._v("Cinematic")])]),t._v(" "),r("li",[r("a",{attrs:{href:"/Category:Matinee",title:"Category:Matinee"}},[t._v("Matinee")])]),t._v(" "),r("li",[r("a",{attrs:{href:"/Category:Epic_Created_Content",title:"Category:Epic Created Content"}},[t._v("Epic Created Content")])])])])}),[],!1,null,null,null);e.default=i.exports}}]);