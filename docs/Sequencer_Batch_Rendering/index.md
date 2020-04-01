Sequencer Batch Rendering - Epic Wiki                    

Sequencer Batch Rendering
=========================

  

Contents
--------

*   [1 Rendering Movies/Image Sequences from Command Line](#Rendering_Movies.2FImage_Sequences_from_Command_Line)
*   [2 Basic Formatting](#Basic_Formatting)
*   [3 Command Line Arguments](#Command_Line_Arguments)
    *   [3.1 Required](#Required)
    *   [3.2 Secondary](#Secondary)
*   [4 Custom Render Passes](#Custom_Render_Passes)
*   [5 Console Variables](#Console_Variables)
*   [6 Examples](#Examples)
    *   [6.1 Preview Render](#Preview_Render)
    *   [6.2 Final Renders](#Final_Renders)

Rendering Movies/Image Sequences from Command Line
==================================================

This is a simple guide to the command line arguments that you may be interested in when rendering out cinematics from the command line. These will only work with Sequencer.

A common use of these commands is **batch rendering**. You can string these commands together in a batch file to render multiple Sequences in a row. While this wiki isn't a tutorial on how to create a batch file, it is a guide on how to format in CMD and what arguments to use to render out a Sequence

Basic Formatting
================

For those of you who have never used the command line to launch the editor, here is the basic formatting with only the -game argument (leave quotes when using absolute paths or a path that uses spaces):

 "FullPathToEngineInstallFolder\\4.##\\Engine\\Binaries\\Win64\\UE4Editor.exe" "FullPathToProjectFolder\\TestProject.uproject" MapName -game

Depending on your file structure, you can use relative paths or in some cases the project name alone, but the above format covers any case.

Command Line Arguments
======================

Command Line Arguments reference

Some definitions below will mirror these: [https://docs.unrealengine.com/latest/INT/Programming/Basics/CommandLineArguments/index.html](https://docs.unrealengine.com/latest/INT/Programming/Basics/CommandLineArguments/index.html)

All arguments require a hyphen before them. I.E. -game

Required
--------

These are the basic arguments to render out an image sequence:

Arg.

Desc.

\-MovieSceneCaptureType="/Script/MovieSceneCapture.AutomatedLevelSequenceCapture"

References MovieSceneCapture.cpp, which defines many of the command line arguments listed here

\-LevelSequence="/Game/PathToSequence/SequenceName"

Tells the editor which sequence to play

\-NoLoadingScreen

\-game instance of the editor will fail to render properly without this

Secondary
---------

These are some of the recommended command line arguments to give you full control over image quality, rendering parameters, and file naming/type. Final column includes recommendations on when to use the cmd argument:

Arg.

Desc.

Notes

When to use

\-ResX=####

Set horizontal resolution for game window

Eg: -ResX=1920

Lower res for previews, Higher for final

\-ResY=####

Set vertical resolution for game window

Eg: -ResY=1080

Lower res for previews, Higher for final

\-ForceRes

Forces the window to the specified resolution, even when larger than the screen resolution

\-VSync

Activate the VSYNC via command line

High Perf cost, but doesn't hurt us since we aren't rendering in real-time

Final Renders

\-NoVSync

Deactivate the VSYNC via command line

See Above

Preview Renders

\-MovieFrameRate=30

Sets the frame rate of the output

Overrides the default of 30fps

Depends on the needs of your cinematic (i.e. rhythmic movement suffers when using a low FPS, could be unwanted even in Previews)

\-NoTextureStreaming

Disables texture streaming

Will take longer to render, but worth it for final renders.

Final Renders

\-MovieFolder="PATH"

Destination folder for rendered images

Defaults to Project/Saved/Screenshots

Recommended when batch rendering. Otherwise all image files dump into the same folder.

\-MovieFormat=ASD

Media format. JPG, BMP, PNG, or Video

Defaults to PNG

\-MovieQuality=##

Sets the compression quality

Expressed in a percentage, defaults to 75

\-MovieName="Example.{frame}"

Sets the naming format for the output files

\* {fps}, {frame}, {width}, {height}, {world}, {quality}, {material}

Definitely recommended for batch rendering. Gives the files a unique name corresponding to the map name, render pass, etc.

\-MovieCinematicMode=Yes/No

Enables Cinematic Mode

Hides Player Character and disables Player Character Movement. Also disables HUD.

Usually a good idea to enable this all the time

\-MovieWarmUpFrames=##

Number of frames to run the scene before playing the sequence. This will not play out in real-time

Default of 0 frames. This will also run the frames before the beginning of your sequence's play range.

Useful when you have Particle Systems or physics that need to simulate before you begin recording.

\-MovieDelayBeforeWarmUp=#

Number of seconds before the Warmup Begins. Runs in real-time

If you need to do anything with your pawn before the sequence starts.

\-MovieStartFrame=###

Overrides the start frame of your sequence

Defaults to the in and out markers in Sequencer

\-MovieEndFrame=###

Overrides the end frame of your sequence

Defaults to the in and out markers in Sequencer

\-NoScreenMessages

Hides on screen messages like "Rebuild Lighting" or "Pring String" outputs

  

\* MovieName Descriptions

*   {fps} - The captured framerate
*   {frame} - The current frame number (only relevant for image sequences)
*   {width} - The width of the captured frames
*   {height} - The height of the captured frames
*   {world} - The name of the current world
*   {quality} - The image compression quality setting
*   {material} - The material/render pass

Custom Render Passes
====================

Requires -MovieFormat=CustomRenderPasses and {material} in the -MovieName.

Arg.

Desc.

Notes

\-CustomRenderPasses="RenderPassName"

Sets the custom render Pass

Options are (exclude parenthesis):

AmbientOcclusion, BaseColor, CustomDepth, CustomDepthWorldUnits, CustomStencil, FinalImage, MaterialAO (Ambient Occlusion), Metallic, Opacity, PostTonemapHDRColor, Roughness, SceneColor, SceneDepth, SceneDepthWorldUnits, SeparateTranslucencyA (Alpha), SeparateTranslucencyRGB, ShadingModel, Specular, SubsurfaceColor, WorldNormal

\-CaptureFramesInHDR

Renders with HDR in the .exr format

\-HDRCompressionQuality=##

Compression Quality for HDR Frames (0 for no compression, 1 for default compression which can be slow). Dependent on -CaptureFramesInHDR

\-CaptureGamut="HCGM\_Name"

The color gamut to use when storing HDR captured data. Dependent on -CaptureFramesInHDR

\* HCGM\_Rec709, HCGM\_P3DCI, HCGM\_Rec2020, HCGM\_ACES, HCGM\_ACEScg, HCGM\_MAX

\-PostProcessingMaterial="MaterialPath"

Custom Post Processing Material to use for rendering

Format looks like: "Material'/Engine/BufferVisualization/SceneDepth.SceneDepth'"

Easy way to get that path is to right click the material in the Content Browser and Copy Reference

\* Capture Gamut Descriptions

*   HCGM\_Rec709 - Rec. 709 / sRGB
*   HCGM\_P3DCI - P3 D65
*   HCGM\_Rec2020 - Rec. 2020
*   HCGM\_ACES - ACES
*   HCGM\_ACEScg - ACEScg

Console Variables
=================

There are some console variables that can be useful for the quality of your renders. ïYou'll want to add these to your //Game/Config/defaultEngine.ini.

All the listed values are for highest quality

Variable and Recommended Value

Desc.

r.ForceLOD=0

Forces all LODs to 0. -1 is off.

r.MotionBlurQuality=4

Defines the motion blur method which allows to adjust for quality or performance.  
0:off, 1:low, 2:medium, 3:high (default), 4: very high

r.MotionBlurSeparable=1

Adds a second motion blur pass that smooths noise for a higher quality blur. 0:off, 1:on

r.DepthOfFieldQuality=4

Allows to adjust the depth of field quality. Currently only fully affects BokehDOF. GaussianDOF is either 0 for off, otherwise on.  
0: Off  
1: Low  
2: high quality (default, adaptive, can be 4x slower)  
3: very high quality, intended for non realtime cutscenes, CircleDOF only (slow)  
4: extremely high quality, intended for non realtime cutscenes, CircleDOF only (very slow)

r.HLOD=0

Single argument: 0 or 1 to Disable/Enable HLOD System  
Multiple arguments: force X where X is the HLOD level that should be forced into view

r.SSR.Quality=4

Whether to use screen space reflections and at what quality setting.  
(limits the setting in the post process settings which has a different scale)  
(costs performance, adds more visual realism but the technique has limits)  
0: off (default)  
1: low (no glossy)  
2: medium (no glossy)  
3: high (glossy/using roughness, few samples)  
4: very high (likely too slow for real-time)

r.ViewDistanceScale=30

Controls the view distance scale. A primitive's MaxDrawDistance is scaled by this value.  
Higher values will increase view distance but at a performance cost.

r.MipMapLODBias=-1

Apply additional mip map bias for all 2D textures, range of -15.0 to 15.0

r.Shadow.MaxResolution=4096

Max square dimensions (in texels) allowed for rendering shadow depths. Range 4 to hardware limit. Higher = better quality shadows but at a performance cost.

Examples
========

Here are some full cmd arguments for different situations. In the examples, these are the specifics of the project:

*   Build Location = C:\\Program Files (x86)\\Epic Games\\4.##\\Engine\\Binaries\\Win64\\UE4Editor.exe
*   Project Location = D:\\Unreal Projects\\SequencerTestBed\\SequencerTestBed.uproject
*   Map Name = TestRender\_Map.umap
*   Sequence Name = Test\_Render\_SQ

Preview Render
--------------

This is for a 16:9 preview render at 30fps with a resolution of 1280x720 in the jpg format

"C:\\Program Files (x86)\\Epic Games\\4.##\\Engine\\Binaries\\Win64\\UE4Editor.exe" "D:\\Unreal Projects\\SequencerTestBed\\SequencerTestBed.uproject" /Game/TestRender/TestRender\_Map -game -MovieSceneCaptureType="/Script/MovieSceneCapture.AutomatedLevelSequenceCapture" -LevelSequence="/Game/Test\_Render/Test\_Render\_SQ" -MovieFrameRate=30 -noloadingscreen -resx=1280 -resy=720 -MovieFormat=JPG -MovieQuality=75

Final Renders
-------------

This is for final, full quality renders. Aiming for 16:9 at 30fps, 3840x2160 resolution, BMP format

"C:\\Program Files (x86)\\Epic Games\\4.##\\Engine\\Binaries\\Win64\\UE4Editor.exe" "D:\\Unreal Projects\\SequencerTestBed\\SequencerTestBed.uproject" /Game/TestRender/TestRender\_Map -game -MovieSceneCaptureType="/Script/MovieSceneCapture.AutomatedLevelSequenceCapture" -LevelSequence="/Game/Test\_Render/Test\_Render\_SQ" -MovieFrameRate=30 -noloadingscreen -resx=3840 -resy=2160 -forceres -MovieFormat=BMP -MovieQuality=100 -notexturestreaming -MovieCinematicMode=yes -MovieWarmUpFrames=60

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Sequencer\_Batch\_Rendering&oldid=27377](https://wiki.unrealengine.com/index.php?title=Sequencer_Batch_Rendering&oldid=27377)"

[Category](/Special:Categories "Special:Categories"):

*   [Cinematic](/Category:Cinematic "Category:Cinematic")

  ![](https://tracking.unrealengine.com/track.png)