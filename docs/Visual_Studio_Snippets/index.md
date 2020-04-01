Visual Studio Snippets - Epic Wiki                    

Visual Studio Snippets
======================

Visual Studio Snippets could be very useful, that’s why I’ve created a [public repository](https://github.com/mpolaczyk/ue4snippets) with a few examples. Snippets are generated with [doxygen](http://www.stack.nl/~dimitri/doxygen/manual/docblocks.html#cppblock) style comments.

How to add snippet ?
--------------------

First of all you have to clone [GitHub repository](https://github.com/mpolaczyk/ue4snippets). Then you have two choices:

1.  Method one. Paste _.snippet_ files into: _"C:\\Users\\$user$\\Documents\\Visual Studio 2013\\Code Snippets\\Visual C++\\My Code Snippets"_. Then restart VS.
2.  Method two. Open Visual Studio, navigate to TOOLS -> Code Snippets Manager… -> Import… (This allows an Add folder option for easier management)

**\[4.6 Branch and above\]** Epic seems to have started initial integration with Branch 4.6 and above. Look on GitHub under "\\Engine\\extras\\VisualStudioSnippets" and follow the Readme file.

How to use snippets ?
---------------------

Import them and just start typing ue4…

[![Ue4-snippet.png](https://d26ilriwvtzlb.cloudfront.net/2/2e/Ue4-snippet.png)](/File:Ue4-snippet.png)

After selecting snippet from the list, hit TAB.

[![Ue4-snippet-pasted.png](https://d26ilriwvtzlb.cloudfront.net/2/29/Ue4-snippet-pasted.png)](/File:Ue4-snippet-pasted.png)

To navigate between highlited fields you can use TAB and SHIFT + TAB. After you enter all names, hit ENTER.

Snippets
--------

*   **ue4classa** – Blueprintable class that derives from an AActor. Parameters are: comment, class name and base class name.

/\*\*
 \* Comment 
 \*/
UCLASS(BlueprintType, Blueprintable)
class AFoo : public AFooBase
{
	GENERATED\_UCLASS\_BODY()
 
public:
 
protected:
 
private:
 
};

*   **ue4classu** – Blueprintable class that derives from an UObject. Parameters are: comment, class name, base class name.

/\*\*
 \* Comment 
 \*/
UCLASS(BlueprintType, Blueprintable)
class UFoo : public UFooBase
{
	GENERATED\_UCLASS\_BODY()
 
public:
 
protected:
 
private:
 
};

*   **ue4enum** – Simple enum. Parameters are: comment, enum name, first member name and it’s comment.

/\*\*
 \* Comment
 \*/
UENUM()
enum EMyEnum
{
	Name, /\*\*> Comment \*/
 
};

*   **ue4enumdisplay** – Enum that can be used with blueprints. Parameters are: comment, enum name, first member name, it’s display name and comment.

/\*\*
 \* Comment
 \*/
UENUM()
namespace EMyEnum
{
	enum Type
	{
		Name UMETA(DisplayName \= "DisplayName"), /\*\*> Comment \*/
 
	};
}

*   **ue4event** – This function can be used as an event in blueprint. Parameters are: comment (parameters and return value), UI category, virtual and const modifiers, return type, function name and arguments.

/\*\*
 \* Comment
 \* @param Comment
 \* @return Comment
 \*/
UFUNCTION(BlueprintImplementableEvent, Category \= "MyProject")
virtual void OnFunctionName(args) const;

*   **ue4func** – This function is available for blueprint logic. Parameters are: comment (parameters and return value), UI category, virtual and const modifiers, function name and arguments.

/\*\*
 \* Comment
 \* @param Comment
 \* @return Comment
 \*/
UFUNCTION(BlueprintCallable, Category \= "MyProject")
virtual void FunctionName(args) const;

*   **ue4interface** – Simple ue4 interface. Parmameters are: comment and name.

/\*\*
 \* Comment
 \*/
UINTERFACE()
class UFoo : public UInterface
{
	GENERATED\_UINTERFACE\_BODY()
};
 
class IFoo
{
	GENERATED\_IINTERFACE\_BODY()
 
};

*   **ue4log** – Simplest log line. Parameters are category, verbosity and message.

UE\_LOG(MyProject, Error, TEXT("Log message"));

*   **ue4logdeclare** – Declaration of log category. Place this in main header of your project to allow logging. Parameters are: category, default verbosity and compile time verbosity.

DECLARE\_LOG\_CATEGORY\_EXTERN(MyProject, Log, All);

*   **ue4logdefine** – Definition of log category. Place this in main code file. Parameter is category name.

DEFINE\_LOG\_CATEGORY(MyProject);

*   **ue4logfloat** – Log line that can be used to print float value. Parameters are: category, verbosity and variable name.

UE\_LOG(MyProject, Error, TEXT("The value of 'variable' is: %f"), variable);

*   **ue4logint** – This log line can be used to log an integer value. Parameters are: category, verbosity and variable name.

UE\_LOG(MyProject, Error, TEXT("The value of 'variable' is: %i"), variable);

*   **ue4loguobj** – This log line is designed to log from inside of the objects. By default, square brackets contains a name of an object that writes the log. Parameters are: category, verbosity, message and name of a pointer to the object.

UE\_LOG(MyProject, Error, TEXT("\[%s\] Log message"), \*(this\->GetName()));

*   **ue4prop** – This read/write property is available everywhere (blueprint, instance and archetype details). Parameters are: comment, category, type and name.

/\*\*
 \* Comment
 \*/
UPROPERTY(EditAnywhere, BlueprintReadWrite, Category \= "MyProject")
Type Name;

*   **ue4struct** – Simple structure. Parameters are: comment and name.

/\*\*
 \* Comment
 \*/
USTRUCT()
struct FFoo
{
	GENERATED\_USTRUCT\_BODY()
 
};

*   **ue4mark** – This comment can be used to mark changes made to engine classes. Parameters are: Company symbol, task/ticket number, name and surname of a developer and short description of modification.

/\* BEGIN ACME (ACME-938) \*/
// Name Surname - Comment
 
virtual void Tick(float DeltaTime);
 
/\* END ACME \*/

  
  
Author: [mpo](/User:Mpo "User:Mpo")

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Visual\_Studio\_Snippets&oldid=11512](https://wiki.unrealengine.com/index.php?title=Visual_Studio_Snippets&oldid=11512)"

[Category](/Special:Categories "Special:Categories"):

*   [Code](/Category:Code "Category:Code")

  ![](https://tracking.unrealengine.com/track.png)