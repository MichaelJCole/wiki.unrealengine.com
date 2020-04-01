Metal Rendering API - Epic Wiki                    

Metal Rendering API
===================

Contents
--------

*   [1 Metal in UE4](#Metal_in_UE4)
    *   [1.1 How To Use Metal](#How_To_Use_Metal)
        *   [1.1.1 Source Code Required](#Source_Code_Required)
        *   [1.1.2 Setup](#Setup)
        *   [1.1.3 Notes/Gotchas](#Notes.2FGotchas)

Metal in UE4
------------

With the release of UE4 version 4.3, we have brought our users the same Metal rendering technology that we showed in the Zen Garden demo during Apple's WWDC 2014 keynote. As an aside, that was the first live public demonstration of Metal, just like the Unreal Engine was also the first live demo of PS3 and PS4!

  

Metal is a really awesome rendering API that is low overhead, and maps very well to Unreal's high level rendering methods. There are some interesting new ideas in Metal that add some structure that helps reduce the overhead that would be seen in GL ES2 or similar. One such core concept is the Render Pipeline State, which explicitly defines the graphics state in a premade object that can be reused.

  

Metal also introduces a new shader language (called Metal Shading Language) that is based on C++11, and can be precompiled offline. Unreal will translate the HLSL code in .usf files into Metal Shading Language when you cook content for iOS. Metal also has built-in support for rendering from multiple threads. We are currently developing our high-level, cross-platform parallel rendering technology in UE4. Once this is ready, Metal support will be really easy to add for even further faster CPU times, on any devices that have enough cores to take advantage of parallel rendering.

  

There are some caveats with our Metal support, because Metal is still a beta technology in iOS. We are very lucky that Apple has loosened the NDA restrictions for beta tech, because if this was in iOS 7 or earlier, we would not have been able to release the code.

  

It should also be noted that, while Metal does introduce a new shader language, most of the benefit of Metal is on the CPU side. The final compiled shader code executed by the GPU won't be significantly different than the ES2 compiled GLSL code. As such, you will really see benefits in games that have a lot of stuff. As we showed in the Zen Garden demo, you can have thousands of draw calls per frame now. With ES2, we would go to crazy lengths to reduce draw calls by merging meshes together, and not having many dynamic objects. Metal allows for much more dynamic worlds that feel alive.

  

### How To Use Metal

#### Source Code Required

  

Because Metal is in beta, we can't compile it into the binaries or libraries that we release with 4.3. You will need source code access from GitHub and compile the source code on a Mac with Xcode.

  

4.3 does allow Windows users to run our precompiled UE4Game executable on an iOS device, but the workflow isn't finalized for remote compiling of iOS apps from Windows. It is possible to do using UnrealRemoteTool (found in GitHub in Engine/Build/iOS). See this page for info: [https://answers.unrealengine.com/questions/21222/steps-for-ios-build-with-unrealremotetool.html](https://answers.unrealengine.com/questions/21222/steps-for-ios-build-with-unrealremotetool.html)

  

Since Metal is still beta, Apple will be changing the API without worrying about backwards compatibility. This means that the our Metal code may not compile in future betas. 4.3 supports iOS 8 beta 3. When beta 4 is released, the code in GitHub may fail to compile. We will update our code to support beta 4 and beyond so you will be able to get fixes from GitHub.

  

#### Setup

Basic steps:

\- Make sure you are a registered Apple developer with beta access

\- Make sure you have an iOS device with an A7 chip (iPad Air, iPhone 5S, iPad Mini 2nd Gen)

\- Download Xcode 6 beta 3, and copy it into Applications

o **IMPORTANT:** To be safe, we recommend renaming it to Xcode.app instead of its default beta name

o You could also modify BuildConfiguration.xml to set XcodeDeveloperDir to point to the beta Xcode (or even just modify IOSToolChain.cs)

\- Download iOS 8 beta 3 image for your device

\- Download 4.3 from GitHub

\- Compile 3 things (as usual)

o UE4Editor (or your code-based project's editor)

o ShaderCompileWorker

o UE4Game (or your code-based game) for iOS

 You should see MetalRHI getting compiled if you have the beta Xcode

\- In the project settings in the editor, there is a new "Cooking" section. Check the "Support Metal" checkbox and save your settings.

  
[![MetalPicture1.png](https://d26ilriwvtzlb.cloudfront.net/7/7a/MetalPicture1.png)](/File:MetalPicture1.png)  

\- That's it! When you run your game on an A7 device, it will automatically use the Metal renderer and the Metal shaders.

#### Notes/Gotchas

\- If you are GPU bound, you may not see much or any increase in speed

\- You may see hitches during gameplay. The way that shaders and the render state are bound together can be slow the first time. Metal does a good job caching these, so you shouldn't see such hitches next time.

\- If you want to verify that Metal is being used, look in the boot log and you will see a line like:

o **::: Created a UIView that will support Metal :::**

\- If it doesn't use Metal when you expected it to, look in the log for a log line that starts with the following, and it will indicate why it couldn't use Metal:

o **Not using Metal because**

\- If you cook with Windows, the shaders will not be precompiled because there is no shader compiler program for Windows. It will compile the shaders at runtime if this is the case (it uses the offline/online flag for looking up the shader in the DerivedDataCache, so both modes live together correctly).

\- Beta 3 has some false positives for API verification. If you run with Xcode, it is recommended that you disable Metal verification. In your Scheme (Command-Option-R is one way to get there), go to the Options tab. Set Metal API Validation to Disabled.

\- This is still very early, and some features may not work right with Metal. You can run the game with -es2 on the commandline to switch back to ES2 rendering. If you have any Metal-specific rendering issues, we'd love to hear about them!

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Metal\_Rendering\_API&oldid=7161](https://wiki.unrealengine.com/index.php?title=Metal_Rendering_API&oldid=7161)"

  ![](https://tracking.unrealengine.com/track.png)