(window.webpackJsonp=window.webpackJsonp||[]).push([[1180],{1059:function(t,e,a){"use strict";a.r(e);var n=a(28),i=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("Update sun position using mousewheel - Epic Wiki")]),t._v(" "),a("h1",{attrs:{id:"update-sun-position-using-mousewheel"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#update-sun-position-using-mousewheel"}},[t._v("#")]),t._v(" Update sun position using mousewheel")]),t._v(" "),a("p",[a("strong",[t._v("Rate this Article:")])]),t._v(" "),a("p",[t._v("0.00")]),t._v(" "),a("p",[a("img",{attrs:{src:"/extensions/VoteNY/images/star_off.gif",alt:""}}),a("img",{attrs:{src:"/extensions/VoteNY/images/star_off.gif",alt:""}}),a("img",{attrs:{src:"/extensions/VoteNY/images/star_off.gif",alt:""}}),a("img",{attrs:{src:"/extensions/VoteNY/images/star_off.gif",alt:""}}),a("img",{attrs:{src:"/extensions/VoteNY/images/star_off.gif",alt:""}})]),t._v(" "),a("p",[t._v("Approved for Versions:(please verify)")]),t._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("p",[t._v("In this tutorial we will create a Blueprint setup (Level Blueprint) in which you can update the sun position (both pitch and yaw) using mouse scroll up and down. To update the pitch you'll use Mouse Scroll Up/Down and with CTRL pressed you can update the Yaw. When ALT is pressed you can speed up this movement.")]),t._v(" "),a("p",[t._v("First add Movable Directional Light in your viewport")]),t._v(" "),a("h2",{attrs:{id:"level-blueprint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#level-blueprint"}},[t._v("#")]),t._v(" Level Blueprint")]),t._v(" "),a("p",[t._v("Open your Level Blueprint and create a new Rotator variable and name it "),a("em",[t._v("SunRotation")]),t._v(". When you begin play, the directional light rotation from your level is saved to this variable so you can freely move the sun inside your viewport and still update it at runtime.")]),t._v(" "),a("p",[a("a",{attrs:{href:"/File:StepI.jpg"}},[a("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/9/9b/StepI.jpg/180px-StepI.jpg",alt:"StepI.jpg"}})])]),t._v(" "),a("p",[a("a",{attrs:{href:"/File:StepI.jpg",title:"Enlarge"}},[a("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),a("p",[t._v("Now create a new float variable with name "),a("em",[t._v("RotationValue")]),t._v(". We will later use this variable to update suns rotation.")]),t._v(" "),a("p",[a("a",{attrs:{href:"/File:RJ2040_SunBP_StepRotationValue.jpg"}},[a("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/3/3f/RJ2040_SunBP_StepRotationValue.jpg/180px-RJ2040_SunBP_StepRotationValue.jpg",alt:"RJ2040 SunBP StepRotationValue.jpg"}})])]),t._v(" "),a("p",[a("a",{attrs:{href:"/File:RJ2040_SunBP_StepRotationValue.jpg",title:"Enlarge"}},[a("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),a("p",[t._v("Then create a new "),a("em",[t._v("Event BeginPlay")]),t._v(" node and connect like this. NOTE: I am using a Blueprinted DirectionalLight. You may not want to do this. Instead you can simply add a reference to your Sun by selecting it in viewport and right click in Level Blueprint and select Add Reference to Sun.")]),t._v(" "),a("p",[a("a",{attrs:{href:"/File:RJ2040_SunBP_EventBeginPlay.jpg"}},[a("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/8/8e/RJ2040_SunBP_EventBeginPlay.jpg/180px-RJ2040_SunBP_EventBeginPlay.jpg",alt:"RJ2040 SunBP EventBeginPlay.jpg"}})])]),t._v(" "),a("p",[a("a",{attrs:{href:"/File:RJ2040_SunBP_EventBeginPlay.jpg",title:"Enlarge"}},[a("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),a("p",[t._v("Now create series of nodes as shown below. Once i created the nodes i collapsed them all. NOTE: You may not want to add Print Node. I added it just for debugging only.")]),t._v(" "),a("ul",[a("li",[a("p",[a("a",{attrs:{href:"/File:RJ2040_SunBP_RotationADD_NotCollapsed.jpg"}},[a("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/7/7b/RJ2040_SunBP_RotationADD_NotCollapsed.jpg/120px-RJ2040_SunBP_RotationADD_NotCollapsed.jpg",alt:"RJ2040 SunBP RotationADD NotCollapsed.jpg"}})])])]),t._v(" "),a("li",[a("p",[a("a",{attrs:{href:"/File:RJ2040_SunBP_RotationADD_NotCollapsed2.jpg"}},[a("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/8/85/RJ2040_SunBP_RotationADD_NotCollapsed2.jpg/120px-RJ2040_SunBP_RotationADD_NotCollapsed2.jpg",alt:"RJ2040 SunBP RotationADD NotCollapsed2.jpg"}})])])])]),t._v(" "),a("p",[t._v("Now you need to create two events for MouseScrollUP and for one of them make sure to enable Control modifier. Do the same for MouseScrollDown. Then connect the output rotation to Set Rotation node (make sure the target is connected to your sun).")]),t._v(" "),a("p",[a("a",{attrs:{href:"/File:RJ2040_SunBP_Connections.jpg"}},[a("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/c/ca/RJ2040_SunBP_Connections.jpg/180px-RJ2040_SunBP_Connections.jpg",alt:"RJ2040 SunBP Connections.jpg"}})])]),t._v(" "),a("p",[a("a",{attrs:{href:"/File:RJ2040_SunBP_Connections.jpg",title:"Enlarge"}},[a("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),a("p",[t._v("Thats it! Jump into game and use your mouse wheel to dynamically update Sun position.")]),t._v(" "),a("h2",{attrs:{id:"make-the-sun-go-faster"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#make-the-sun-go-faster"}},[t._v("#")]),t._v(" Make the sun go faster")]),t._v(" "),a("p",[t._v("We use the "),a("em",[t._v("bAltPressed")]),t._v(" boolean variable to see if the user has pressed the Alt Key. We will use this variable inside those collapsed nodes to check if we want the sun to move faster or not. Setup like this somewhere inside Level Blueprint.")]),t._v(" "),a("p",[a("a",{attrs:{href:"/File:TJ2040_SunBP_bAltPressed.jpg"}},[a("img",{attrs:{src:"https://d3ar1piqh1oeli.cloudfront.net/9/90/TJ2040_SunBP_bAltPressed.jpg/180px-TJ2040_SunBP_bAltPressed.jpg",alt:"TJ2040 SunBP bAltPressed.jpg"}})])]),t._v(" "),a("p",[a("a",{attrs:{href:"/File:TJ2040_SunBP_bAltPressed.jpg",title:"Enlarge"}},[a("img",{attrs:{src:"/skins/common/images/magnify-clip.png",alt:""}})])]),t._v(" "),a("p",[t._v('Retrieved from "'),a("a",{attrs:{href:"https://wiki.unrealengine.com/index.php?title=Update_sun_position_using_mousewheel&oldid=8323",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://wiki.unrealengine.com/index.php?title=Update_sun_position_using_mousewheel&oldid=8323"),a("OutboundLink")],1),t._v('"')]),t._v(" "),a("p",[a("a",{attrs:{href:"/Special:Categories",title:"Special:Categories"}},[t._v("Categories")]),t._v(":")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"/Category:Tutorials",title:"Category:Tutorials"}},[t._v("Tutorials")])]),t._v(" "),a("li",[a("a",{attrs:{href:"/Category:Blueprint",title:"Category:Blueprint"}},[t._v("Blueprint")])]),t._v(" "),a("li",[a("a",{attrs:{href:"/Category:Community_Created_Content",title:"Category:Community Created Content"}},[t._v("Community Created Content")])])]),t._v(" "),a("p",[t._v("Hidden category:")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"/Category:Templates",title:"Category:Templates"}},[t._v("Templates")])])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://tracking.unrealengine.com/track.png",alt:""}})])])}),[],!1,null,null,null);e.default=i.exports}}]);