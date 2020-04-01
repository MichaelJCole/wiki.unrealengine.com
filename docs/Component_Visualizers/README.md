 Component Visualizers - Epic Wiki             

 

Component Visualizers
=====================

From Epic Wiki

Jump to: [navigation](#mw-head), [search](#p-search)

[Template:Rating](/index.php?title=Template:Rating&action=edit&redlink=1 "Template:Rating (page does not exist)")

Contents
--------

*   [1 Overview](#Overview)
*   [2 Setting Up](#Setting_Up)
*   [3 Laser Cannon Class Example](#Laser_Cannon_Class_Example)
*   [4 Creating a Visualization Class](#Creating_a_Visualization_Class)
    *   [4.1 Hit Proxies](#Hit_Proxies)
        *   [4.1.1 Implement Hit Proxy Macro](#Implement_Hit_Proxy_Macro)
    *   [4.2 Drawing our Visualization](#Drawing_our_Visualization)
    *   [4.3 Receiving Clicks](#Receiving_Clicks)
    *   [4.4 Set Widget Location](#Set_Widget_Location)
    *   [4.5 Handle Input Delta](#Handle_Input_Delta)
    *   [4.6 Receiving Key Input](#Receiving_Key_Input)
    *   [4.7 Generate a Context Menu](#Generate_a_Context_Menu)
*   [5 Registering Your Visualizer](#Registering_Your_Visualizer)
*   [6 Conclusion](#Conclusion)

  

Overview
--------

Component visualizers are a good way to visualize non-rendering component data in the editor viewport. You can even make the visualizer interactive, you can right click and get a context menu, capture mouse input and create keyboard commands.

A good example of this in the engine is the spline component. When you click on a spline, the spline path, points and handles are all visualized and interactive.

This is good if you have light weight structs or data types in your component that need to be easily edited in the viewport. For example you might have a laser cannon with a set of target points, you can store the target point as a FVector and use a visualizer to make a line going from the cannon to the target and draw a point at the target. The alternative would be using a separate component for the target which would use up a lot more memory and increase code complexity.

Disclaimer: The code provided is not a full working example. It is only supposed to illustrate what can be done.

Setting Up
----------

Before you can use a component visualizer you will need to create an editor module for your game. This separates out the editor only functionality from your game module reducing the size of your cooked game and preventing linking errors when the editor module isn't included.

Start by following the instructions on [this page](/index.php?title=Creating_an_Editor_Module "Creating an Editor Module") to create an editor module for your game. Once you've got it all working come back to this page. Make sure you add the components visualizer module to the dependencies in your Build.cs file.

[Template:Warning](/index.php?title=Template:Warning&action=edit&redlink=1 "Template:Warning (page does not exist)")

Laser Cannon Class Example
--------------------------

Lets continue with the laser cannon example from above for this tutorial. The cannon is probably an actor that has a Targeting Component which other actors can use as well. Lets say we have a class that looks like this in our game module:

<syntaxhighlight lang="cpp"> class MYGAME\_API UTargetingComponent : public ActorComponent { ...

   UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Cannon)
   TArray<FVector> Targets;

   UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Cannon)
   float TimeBetweenAttacks;

   UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = Cannon)
   int32 CurrentAttackIndex;

... } </syntaxhighlight>

  
To edit this component effectively we're going to want to be able to:

*   Add and remove target points
*   Move the target points in the world

Since the property is exposed this can be done in the details panel but it's hard to visualize where in the world it will be targeting just by looking at a row of numbers. It would be better if we could draw this information in the viewport end edit it using a translation widget. Well with component visualizers we can!

Of course this example is a little contrived since we could simply make this in a blueprint and show the widget for the vector array. But it will work as an example to illustrate what can be done.

Creating a Visualization Class
------------------------------

Create a new class in your editor module. This class will need to extend [FComponentVisualizer](https://docs.unrealengine.com/latest/INT/API/Editor/UnrealEd/FComponentVisualizer/index.html). We'll call it something sensible such as 'FTargetingComponentVisualizer' when it's visualising 'UTargetingComponent'. A minimum header will look something like this. It's probably best to copy in all the override method stubs and comment them out until you need them.

<syntaxhighlight lang="cpp">

1.  pragma once

1.  include "ComponentVisualizer.h"
2.  include "TargetComponent.h"

class FTargetingComponentVisualizer : public FComponentVisualizer { public: FTargetingComponentVisualizer(); virtual ~FTargetingComponentVisualizer();

// Begin FComponentVisualizer interface virtual void OnRegister() override; virtual void DrawVisualization(const UActorComponent\* Component, const FSceneView\* View, FPrimitiveDrawInterface\* PDI) override; virtual bool VisProxyHandleClick(FLevelEditorViewportClient\* InViewportClient, HComponentVisProxy\* VisProxy, const FViewportClick& Click) override; virtual void EndEditing() override; virtual bool GetWidgetLocation(const FEditorViewportClient\* ViewportClient, FVector& OutLocation) const override; virtual bool GetCustomInputCoordinateSystem(const FEditorViewportClient\* ViewportClient, FMatrix& OutMatrix) const override; virtual bool HandleInputDelta(FEditorViewportClient\* ViewportClient, FViewport\* Viewport, FVector& DeltaTranslate, FRotator& DeltaRotate, FVector& DeltaScale) override; virtual bool HandleInputKey(FEditorViewportClient\* ViewportClient, FViewport\* Viewport, FKey Key, EInputEvent Event) override; virtual TSharedPtr<SWidget> GenerateContextMenu() const override; // End FComponentVisualizer interface

/\*\* Get the target component we are currently editing \*/ UTargetingComponent\* GetEditedTargetingComponent() const;

private:

       /\*\*Index of target in selected component\*/
       int32 CurrentlySelectedTarget;

/\*\*Output log commands\*/ TSharedPtr<FUICommandList> TargetingComponentVisualizerActions; ... </syntaxhighlight>

Note by [Darkgaze](/index.php?title=User:Darkgaze&action=edit&redlink=1 "User:Darkgaze (page does not exist)") ([talk](/index.php?title=User_talk:Darkgaze&action=edit&redlink=1 "User talk:Darkgaze (page does not exist)")): As for version 4.18, these changes have been made to the interface:

<syntaxhighlight lang="cpp"> // New available methods virtual void DrawVisualizationHUD(const UActorComponent\* Component, const FViewport\* Viewport, const FSceneView\* View, FCanvas\* Canvas); virtual bool IsVisualizingArchetype();\*/

//Changed method: InViewportClient is now FEditorViewportClient, instead of FLevelEditorViewportClient virtual bool VisProxyHandleClick(FEditorViewportClient\* InViewportClient, HComponentVisProxy\* VisProxy, const FViewportClick& Click); </syntaxhighlight>

  
To achieve full functionality we'll need to override most of the functions of the base class. We've also created a variable storing the index of the target from the Targets array in the currently selected component. How do we work out what target is selected? Using hit proxies!

### Hit Proxies

Hit proxies are a way of collecting data about what was clicked on in the viewport. If a hit proxy that we drew into the viewport is clicked on the VisProxyHandleClick() function in our class will be called passing in that hit proxy. We can then collect data that we wrote into the hit proxy when we drew it. If you only want to draw things to the view port and not interact with them you can skip this section.

First declare a base struct for all your hit proxies to extend from. Even though we only have one in this instance this is still a good idea in case we want to add more later. This base will extend HComponentVisProxy and then we can extend our base for different proxies:

<syntaxhighlight lang="cpp"> /\*\*Base class for clickable targeting editing proxies\*/ struct HTargetingVisProxy : public HComponentVisProxy { DECLARE\_HIT\_PROXY();

HTargetingVisProxy (const UActorComponent\* InComponent) : HComponentVisProxy(InComponent, HPP\_Wireframe) {} };

/\*\*Proxy for target\*/ struct HTargetProxy : public HTargetingVisProxy { DECLARE\_HIT\_PROXY();

HTargetProxy (const UActorComponent\* InComponent, int32 InTargetIndex) : HTargetingVisProxy (InComponent) , TargetIndex(InTargetIndex) {}

int32 TargetIndex; }; </syntaxhighlight>

  
As you can see the base HComponentVisProxy takes the component that's being edited as an argument. Our target sub struct will also store the index of the target point so we know which one has been selected.

#### Implement Hit Proxy Macro

Another important thing is to use the the IMPLEMENT\_HIT\_PROXY macro at the top of your .cpp file. For this example it would look like this:

IMPLEMENT\_HIT\_PROXY(HTargetingVisProxy, HComponentVisProxy)

IMPLEMENT\_HIT\_PROXY(HTargetProxy, HTargetingVisProxy )

The first argument is the sub type and the second is the base.

### Drawing our Visualization

Drawing is done in the DrawVisualization function. As parameters for this function we get the component being edited, a scene view and a primitive draw interface. Check out the documentation for each of these if you want more info. For this example let's just draw a line from our component to each target and a point where the target is.

<syntaxhighlight lang="cpp"> void FTargetingComponentVisualiser::DrawVisualization(const UActorComponent\* Component, const FSceneView\* View, FPrimitiveDrawInterface\* PDI) { //cast the component into the expected component type if(const UTargetingComponent\* TargetingComponent = Cast<const UTargetingComponent>(Component)) { //get colors for selected and unselected targets //This is an editor only uproperty of our targeting component, that way we can change the colors if we can't see them against the background const FLinearColor SelectedColor = TargetingComponent->EditorSelectedColor; const FLinearColor UnselectedColor = TargetingComponent->EditorUnselectedColor;

const FVector Locaction = TargetingComponent->GetComponentLocaction();

//Iterate over each target drawing a line and dot for(int i = 0; i < TargetingComponent->Targets.Num(); i++) { FLinearColor Color = (i == SelectedTargetIndex) ? SelectedColor : UnselectedColor;

//Set our hit proxy PDI->SetHitProxy(new HTargetProxy(Component, i)); PDI->DrawLine(Locaction, TargetingComponent->Targets\[i\], Color, SDPG\_Foreground); PDI->DrawPoint(TargetingComponent->Targets\[i\], Color, 20.f, SDPG\_Foreground); PDI->SetHitProxy(NULL); } } } </syntaxhighlight>

  
A couple things to note here, firstly we're getting a color out of the component. By allowing designers to change the color of the visualization we can allow for a case where the default color is blending with the background. Also note how we set and unset the hit proxy before and after drawing, this means that if either the line or point is clicked we can receive the click.

If all you wanted to do was draw your components you can probably skip to the bottom at [#Registering Your Visualizer](#Registering_Your_Visualizer). Checkout the primitive draw interface documentation for other draw commands.

### Receiving Clicks

You can receive hits from your hit proxy by overriding the VisProxyHandleClick() function. This function receives the viewport client and the clicked vis proxy as parameters. It returns a bool indicating whether you have handled the click or not. For our simple example we just want to set our SelectedTargetIndex proxy to the clicked target.

<syntaxhighlight lang="cpp"> bool FTargetingComponentVisualiser::VisProxyHandleClick(FLevelEditorViewportClient\* InViewportClient, HComponentVisProxy\* VisProxy, const FViewportClick& Click) { bool bEditing = false;

if (VisProxy && VisProxy->Component->IsValid()) { bEditing = true;

if(VisProxy->IsA(HTargetProxy::StaticGetType())) { HTargetProxy\* Proxy = (HTargetProxy\*) VisProxy;

SelectedTargetIndex = VisProxy->TargetIndex; } } else { SelectedTargetIndex = INDEX\_NONE; }

return bEditing; } </syntaxhighlight>

  
All we need to do is make sure that all our data is valid, a bit of casting and then we can access the data we stored in the hit proxy we created in a draw function above.

### Set Widget Location

Earlier I mentioned that we want to be able to interact with our targets in the view port. So far we are drawing our targets on the view port, we can select a target and see which is selected, but we can't interact with them at all. What would be nice is to be able to move our targets with a translation widget like we would with a normal actor or component.

The first step to doing this is overriding the widget location so it appears on our target instead of the selected actor/component. This can be done overriding the GetWidgetLocation() method. This method returns a bool to indicate if it's provided the location and has an FVector out parameter for providing it.

<syntaxhighlight lang="cpp"> bool FTargetingComponentVisualiser::GetWidgetLocation(const FEditorViewportClient\* ViewportClient, FVector& OutLocaction) const { if (GetEditedTargetingComponent().IsValid() && SelectedTargetIndex != INDEX\_NONE) { OutLocaction = GetEditedTargetingComponent()->Targets\[SelectedTargetIndex\];

return true; }

return false; } </syntaxhighlight>

  
We simply check our selected component and selected index are valid and then set the out location to that target. We really should check that our index is valid in the targeting array before accessing it as well.

### Handle Input Delta

We can also override the behavior of the widget by receiving it's input in HandleInputDelta. This function gives us a delta translation, scale and rotation that we can use as we will to edit our components. Once again we need to return a bool to indicate whether or not we handled this input. For our example lets just move the selected target by the delta translation.

<syntaxhighlight lang="cpp"> bool FTargetingComponentVisualiser::HandleInputDelta(FEditorViewportClient\* ViewportClient, FViewport\* Viewport, FVector& DeltaTranslate, FRotator& DeltaRotate, FVector& DeltaScale) { bool bHandled = false;

if (GetEditedTargetingComponent().IsValid() && SelectedTargetIndex != INDEX\_NONE) { GetEditedTargetingComponent()->Targets\[SelectedTargetIndex\] += DeltaTranslate; bHandled = true; }

return bHandled; } </syntaxhighlight>

  
What makes this really useful is that we can restrict the effect of the widget. For example if you want to make sure that the target can't move more than 1000 units away from the cannon you can check for this and simply set the Target to an appropriate value. If you try to move the target further than this in the editor the widget and your cursor just won't move.

### Receiving Key Input

You can also receive key input with your visualizer. For example we can make it so that the delete key deletes the selected target with some callback function in our component.

<syntaxhighlight lang="cpp"> bool FTargetingComponentVisualiser::HandleInputKey(FEditorViewportClient\* ViewportClient, FViewport\* Viewport, FKey Key, EInputEvent Event) { bool bHandled = false;

if (Key == EKeys::Delete) { if(GetEditedTargetingComponent().IsValid() && SelectedTargetIndex != INDEX\_NONE) { GetEditedTargetingComponent()->DeleteTarget(SelectedTargetIndex); bHandled = true; } } } </syntaxhighlight>

  

### Generate a Context Menu

One last really useful thing we can do is generate a context menu if one of our hit proxies is right clicked. This is a bit more complicated but lets make it so we can right click on a target and selected 'duplicate' to create a new target in the same spot. Be sure to read up on slate if you want to create more complex menus.

First we need to make a commands class to hold our command list, this should go at the top of your .cpp file:

<syntaxhighlight lang="cpp"> class FTargetingVisualizerCommands : public TCommands < FTargetingVisualizerCommands > { public: FTargetingVisualizerCommands() : TCommands <FTargetingVisualizerCommands> ( "TargetingComponentVisualizer", LOCTEXT("TagetingComponentVisualizer", "Targeting Component Visualizer"), NAME\_None, FEditorStyle::GetStyleSetName() ){}

virtual void RegisterCommands() override { UI\_COMMAND(Duplicate, "Duplicate Target", "Duplicate the current target.", EUserInterfaceActionType::Button, FInputGesture()); }

public: /\*\* Duplicate Target \*/ TSharedPtr<FUICommandInfo> Duplicate;

}; </syntaxhighlight>

  
Don't worry to much about the syntax of this, if all you want to do is create clickable buttons on the menu simply create a new TSharedPtr<FUICommandInfo> member to hold the command and add a new call to the UI\_COMMAND macro in RegisterCommands changing the first 3 arguments appropriately. These arguments are, the command, the text that will appear on the menu, and long text for the command.

We also need to bind our commands to a function that will get called when selected. Do this in the OnRegister function of the visualizer.

<syntaxhighlight lang="cpp"> void FTargetingComponentVisualiser::OnRegister() {

       TargetingComponentVisualizerActions = MakeSharable<new FUICommandList>

const auto& Commands = FTargetingVisualizerCommands::Get();

TargetingComponentVisualizerActions->MapAction( Commands.Duplicate, FExecuteAction::CreateSP(this, &FTargetingComponentVisualizer::OnDuplicateTarget), true)); } </syntaxhighlight>

  
You will need to call MapAction for every command you declared above. The parameters are: The command you are mapping, a binding to a function to call when the command is selected and if the action can be performed. That last one really should be another function pointer so we can dynamically determine this.

Lastly we have to generate the context menu in the GenerateContextMenu() function.

<syntaxhighlight lang="cpp"> TSharedPtr<SWidget> FTargetingComponentVisualiser::GenerateContextMenu() const { FMenuBuilder MenuBuilder(true, TargetingComponentVisualizerActions); { MenuBuilder.BeginSection("Target Actions"); { MenuBuilder.AddMenuEntry(FTargetingVisualizerCommands::Get().Duplicate); } MenuBuilder.EndSection(); }

TSharedPtr<SWidget> MenuWidget = MenuBuilder.MakeWidget(); return MenuWidget; } </syntaxhighlight>

  
Now when a hit proxy is right clicked we can select a duplicate option. When this is clicked the function we bound above, OnDuplicateTarget, will be called. This function can call a callback function in the targeting component to duplicate the target and create a new one.

Registering Your Visualizer
---------------------------

That's all the code you need for a basic visualizer! Before you can use it you need to register it. This tutorial assumes that you've set up an editor module and overridden the startup and shutdown module function. If not go back to [#Setting Up](#Setting_Up) and do so.

As of 4.7 there is a bug in the component visualizer module that prevents you from registering it in the 'correct' way. We'll need to use a work around which may break in a future release. In your startup module function add the following code:

<syntaxhighlight lang="cpp"> if (GUnrealEd != NULL) { TSharedPtr<FComponentVisualizer> Visualizer = MakeShareable(new FTargetingComponentVisualizer());

if (Visualizer.IsValid()) { GUnrealEd->RegisterComponentVisualizer(UTargetingComponent::StaticClass()->GetFName(), Visualizer); Visualizer->OnRegister(); }

} </syntaxhighlight>

  
And in shutdown module add:

<syntaxhighlight lang="cpp"> if (GUnrealEd != NULL) { GUnrealEd->UnregisterComponentVisualizer(UTargetingComponent::StaticClass()->GetFName()); } </syntaxhighlight>

  
The unreal devs have indicated in the past that you really shouldn't access GUnrealEd directly. They may remove support for this in the future but hopefully if they do they'll fix the bug that prevents the correct method of registering.

Conclusion
----------

Component visualizers are a great way to add functionality to the editor. You can quickly set up powerful editing systems for your components without adding lots of unnecessary metadata to your component classes.

[Karltheawesome](/index.php?title=User:Karltheawesome&action=edit&redlink=1 "User:Karltheawesome (page does not exist)") ([talk](/index.php?title=User_talk:Karltheawesome&action=edit&redlink=1 "User talk:Karltheawesome (page does not exist)"))

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Component\_Visualizers&oldid=375](https://wiki.unrealengine.com/index.php?title=Component_Visualizers&oldid=375)"

[Categories](/index.php?title=Special:Categories "Special:Categories"):

*   [Code](/index.php?title=Category:Code "Category:Code")
*   [Tutorials](/index.php?title=Category:Tutorials&action=edit&redlink=1 "Category:Tutorials (page does not exist)")