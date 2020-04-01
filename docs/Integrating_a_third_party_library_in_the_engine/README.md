Integrating a third party library in the engine - Epic Wiki             

Integrating a third party library in the engine
===============================================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

This page results from my experience integrating Coherent UI directly into the Engine, rather than in a Game project. The knowledge was mostly gathered by obversing other modules, and whomever knows better should update this wiki to promote the best practices.

Let's call the dependency "CoherentUI".

First, you will be adding 2 directories for the dependency:

1.  One in Engine/Binaries/ThirdParty/CoherentUI. It will contain **dynamic** libraries into subdirectories for each platform (e.g. "Mac", "Win64/VS2013", etc.)
2.  One in Engine/Source/ThirdParty/CoherentUI. This will contain the rest of the files from the library, or at least the includes and static or import libraries.

You should add the Binaries one to your gitignore as checking in binary files in Git is recipe for trouble in the long term. Do the same for the second directory, except for a file you'll create called "CoherentUI.Build.cs". We'll cover it soon. I suggest managing the content of these 2 folders with a zip file as is done with the "Required" and "Optional" archives when using the Git distribution method for Unreal Engine.

In CoherentUI.Build.c, add this:

using UnrealBuildTool;

public class CoherentUI : ModuleRules
{
    public CoherentUI(TargetInfo Target)
    {
        Type = ModuleType.External;

        string CoherentUIPath = UEBuildConfiguration.UEThirdPartyDirectory + "CoherentUI/";

        string CoherentUIIncludePath = CoherentUIPath + "include/";
        PublicSystemIncludePaths.Add(CoherentUIIncludePath); // PublicSystemIncludePaths is for "stable" headers that don't change

        string CoherentUILibPath = CoherentUIPath + "lib/";
        if (Target.Platform == UnrealTargetPlatform.Win64)
        {
            CoherentUILibPath += "Win64/VS" + WindowsPlatform.GetVisualStudioCompilerVersionName();
            PublicLibraryPaths.Add(CoherentUILibPath);

            PublicAdditionalLibraries.Add("CoherentUI64.lib");

            PublicDelayLoadDLLs.Add("CoherentUI64.dll");
        }
        else if (Target.Platform == UnrealTargetPlatform.Win32)
        {
            CoherentUILibPath += "Win32/VS" + WindowsPlatform.GetVisualStudioCompilerVersionName();
            PublicLibraryPaths.Add(CoherentUILibPath);

            PublicAdditionalLibraries.Add("CoherentUI.lib");

            PublicDelayLoadDLLs.Add("CoherentUI.dll");
        }
    }
}

To be continued tomorrow...

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Integrating\_a\_third\_party\_library\_in\_the\_engine&oldid=2286](https://wiki.unrealengine.com/index.php?title=Integrating_a_third_party_library_in_the_engine&oldid=2286)"