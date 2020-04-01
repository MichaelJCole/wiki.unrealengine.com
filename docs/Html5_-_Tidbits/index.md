Html5 - Tidbits - Epic Wiki                    

Html5 - Tidbits
===============

This page is meant to serve as an archive for assorted information regarding HTML5 development.

#### Exporting C functions to Javascript

  

![Note](https://d26ilriwvtzlb.cloudfront.net/b/b3/Icon_template_warning1.png)  
  
_Disclaimer: this is a living document based on current research and experience. This currently does not work._

  
Somewhere in the project, define a global C function to be called by Javascript

extern "C"
{
#if PLATFORM\_HTML5\_BROWSER
DEFINE\_LOG\_CATEGORY\_STATIC(LogHTML5, Log, All);
 
void my\_func( const char\* \_string, int \_number )
{
#ifdef \_\_EMSCRIPTEN\_TRACING\_\_
    // Log to emscripten
    emscripten\_log( EM\_LOG\_CONSOLE, TEXT("my\_func( %s, %d )"), \_string, \_number );
#endif
 
    // Log to UE console
    UE\_LOG( LogHTML5, Verbose, TEXT("my\_func( %s, %d )"), \_string, \_number );
}
 
#endif 
}

  
Append the C function name with a prefixed '\_' to this EXPORTED\_FUNCTIONS array

// File
// <Engine>/Source/Programs/UnrealBuildTool/HTML5/HTML5ToolChain.cs(87)
 
Result +\= " -s EXPORTED\_FUNCTIONS=\\"\['\_main', '\_resize\_game', '\_on\_fatal', '\_my\_func'\]\\" ";

  
The Javascript that handles the web interface gets pulled from a template during build, so any changes should be done to that.

// File
// <Engine>/Build/HTML5/GameX.html.template(223+)
var UE4 \= {
    ...
    get my\_func() {
        var fn \= Module.cwrap('my\_func', null, \['string'\],\['number'\] );
        delete UE4\["my\_func"\];
        UE4.my\_func \= fn;
        return fn;
    },
    ...
};
 
// Now anywhere inside Javascript, you can call
UE4.my\_func("mystring", 1234);

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Html5\_-\_Tidbits&oldid=17912](https://wiki.unrealengine.com/index.php?title=Html5_-_Tidbits&oldid=17912)"

[Category](/Special:Categories "Special:Categories"):

*   [Templates](/Category:Templates "Category:Templates")

  ![](https://tracking.unrealengine.com/track.png)