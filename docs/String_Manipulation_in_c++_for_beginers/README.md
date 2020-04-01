String Manipulation in c++ for beginers - Epic Wiki                    

String Manipulation in c++ for beginers
=======================================

**Convenience STRING manipulation Tutorial. ideal for beginners debugging**

After getting my self reaquainted with c++ I remembered just how much of a pain strings can be.

UE4 gives us FString, FName and FText to work with for various scenarios, and I recomend reading up on them, its important info for speed of calculation and localisation. Nonetheless the standard string (std::string) still has uses, especialy as a debugging tool. These files should allow you to work with strings in a manner similar to unreal script or other scripting languages. I wrote the following code to facilitate simple on screen debugging, and thought Id share it with the comunity.

Example uses: PrintStr("some text about mouse X:" + ToString(MouseLocation.X) + " Y:" + ToString(MouseLocation.Y));

Add code to your project (select no base class) - name AdvString in order to use GEngine you need to include Engine.h in your main project file, Projects created in later versions only include Engineminimal.h HEADER

1.  // File: AdvString.h
    
2.  #include <iostream>
    
3.  #include <sstream>
    
4.  #include <string>
    
5.  #include <stdexcept>
    
6.  #include "Spiral.h"
    

8.  class BadConversion : public std::runtime\_error {
    
9.  public:
    
10.  	BadConversion(std::string const& s)
    
11.  		: std::runtime\_error(s)
    
12.  	{ }
    
13.  };
    

15.  inline std::string ToString(double x)
    
16.  {
    
17.  	std::ostringstream o;
    
18.  	if (!(o << x))
    
19.  		throw BadConversion("ToString(double)");
    
20.  	return o.str();
    
21.  }
    

23.  inline std::string ToString(float x)
    
24.  {
    
25.  	std::ostringstream o;
    
26.  	if (!(o << x))
    
27.  		throw BadConversion("ToString(float)");
    
28.  	return o.str();
    
29.  }
    

31.  inline std::string ToString(int x)
    
32.  {
    
33.  	std::ostringstream o;
    
34.  	if (!(o << x))
    
35.  		throw BadConversion("ToString(int)");
    
36.  	return o.str();
    
37.  }
    

39.  inline std::string ToString(short x)
    
40.  {
    
41.  	std::ostringstream o;
    
42.  	if (!(o << x))
    
43.  		throw BadConversion("ToString(short)");
    
44.  	return o.str();
    
45.  }
    

47.  inline std::string ToString(long x)
    
48.  {
    
49.  	std::ostringstream o;
    
50.  	if (!(o << x))
    
51.  		throw BadConversion("ToString(long)");
    
52.  	return o.str();
    
53.  }
    

55.  inline std::string ToString(bool x)
    
56.  {
    
57.  	if (x)
    
58.  	{
    
59.  		return "true";
    
60.  	}
    
61.  	else
    
62.  	{
    
63.  		return "false";
    
64.  	}
    
65.  }
    

67.  inline FString ToFString(std::string x)
    
68.  {
    
69.  	FString f(x.c\_str());
    
70.  	return f;
    
71.  }
    

73.  inline void PrintFStr(FString text)
    
74.  {
    
75.  	GEngine\-\>AddOnScreenDebugMessage(\-1, 1.5, FColor::White, text);
    
76.  }
    

78.  inline void PrintFStrRed(FString text)
    
79.  {
    
80.  	GEngine\-\>AddOnScreenDebugMessage(\-1, 1.5, FColor::Red, text);
    
81.  }
    

83.  inline void PrintFStrGreen(FString text)
    
84.  {
    
85.  	GEngine\-\>AddOnScreenDebugMessage(\-1, 1.5, FColor::Green, text);
    
86.  }
    

88.  inline void PrintFStrBlue(FString text)
    
89.  {
    
90.  	GEngine\-\>AddOnScreenDebugMessage(\-1, 1.5, FColor::Blue, text);
    
91.  }
    

93.  inline void PrintStr(std::string text)
    
94.  {
    
95.  	GEngine\-\>AddOnScreenDebugMessage(\-1, 1.5, FColor::White, ToFString(text));
    
96.  }
    

98.  inline void PrintStrRed(std::string text)
    
99.  {
    
100.  	GEngine\-\>AddOnScreenDebugMessage(\-1, 1.5, FColor::Red, ToFString(text));
    
101.  }
    

103.  inline void PrintStrGreen(std::string text)
    
104.  {
    
105.  	GEngine\-\>AddOnScreenDebugMessage(\-1, 1.5, FColor::Green, ToFString(text));
    
106.  }
    

108.  inline void PrintStrBlue(std::string text)
    
109.  {
    
110.  	GEngine\-\>AddOnScreenDebugMessage(\-1, 1.5, FColor::Blue, ToFString(text));
    
111.  }
    

**source**

1.  #include "YOUR MAIN CLASS.h"
    
2.  #include "AdvString.h"
    

4.  // inline code defined in .h
    

Retrieved from "[https://wiki.unrealengine.com/index.php?title=String\_Manipulation\_in\_c%2B%2B\_for\_beginers&oldid=8888](https://wiki.unrealengine.com/index.php?title=String_Manipulation_in_c%2B%2B_for_beginers&oldid=8888)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)