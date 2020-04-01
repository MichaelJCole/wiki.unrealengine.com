Third Person Camera Zoom C++ - Epic Wiki              

Third Person Camera Zoom C++
============================

From Epic Wiki

Jump to: [navigation](#mw-navigation), [search](#p-search)

**Rate this Article:**

4.00

![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_on.gif)![](/extensions/VoteNY/images/star_off.gif) (one vote)

Approved for Versions:(please verify)

**Third Person Camera Zoom with C++**
-------------------------------------

  
  

Hello and welcome to this page! Here is a list of things that you will learn upon the completion of this tutorial:  

*   _1) Creating Custom Functions_  
    
*   _2) Initializing and Declaring Local and Global Variables_  
    
*   _3) Compiling and Creating Working Code for a Zooming 3rd Person Camera_  
    
*   _4) Understanding WHY it works! (I can't stress how important this is!)_  
    

   

Well then, let's get started shall we? First and foremost go ahead and start the UE4 launcher. That would be this little guy here in the caption:  

[![](https://d3ar1piqh1oeli.cloudfront.net/d/d2/UE4ZoomTut1.png/180px-UE4ZoomTut1.png)](/File:UE4ZoomTut1.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut1.png "Enlarge")

The Launcher

  

Now that this is open it's important too follow these steps very carefully. We wouldn't want to get lost would we? Anyways, go ahead and click the big yellow button that says "Launch".  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/6/64/UE4ZoomTut2.png/180px-UE4ZoomTut2.png)](/File:UE4ZoomTut2.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut2.png "Enlarge")

Template

Now that you've done that you'll want to click "New Project" and scroll down until you find the "Code Third Person" template. When you've done that you can go ahead and name it anything you'd like but i'd strongly recommend you follow my naming convention (Basically name it the same as me) so that way it'll be easier to follow, i'll explain later, in case you're lost please click the image that says Template.  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/2/2e/UE4ZoomTut3.png/180px-UE4ZoomTut3.png)](/File:UE4ZoomTut3.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut3.png "Enlarge")

Visual Studio Startup

So you've just created the Code Third Person template with the name TutorialForOthers and just clicked Create Project. Amazing! Let's move on. If you have Microsoft Visual Studio 2013(Which is basically required for Coding in UE4!), the project should have immediately started in the compiler. If it did and this is your first time with Visual Studio 2013, don't freak out. I admit that it does look sort of intimidating but don't let that frighten you. Be sure to click the image on this wiki page called Visual Studio Startup.  
  

  
One thing you'll notice is that on the left panel I have TutorialForOthers selected that is why it's highlighted in blue. But directly to the left you should notice a little arrow, go ahead and click that to open up the solution's contents. Now go ahead and click on the folder called "**Source**" and again just click the little arrow underneath it. Go ahead and repeat the process for the folder in that one called "_TutorialForOthers_"  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/3/31/UE4ZoomTut4.png/180px-UE4ZoomTut4.png)](/File:UE4ZoomTut4.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut4.png "Enlarge")

Visual Studio Solution 1

_(Oh and for good reference please click the picture called Visual Studio Solution 1 to double check that you're looking at the exact same thing as I.)_  
  

  
Anyways, let's continue. Now you're probably thinking if you're new to Visual Studio or programming in general, "What the heck am I looking at!?". Trust me this is totally normal. On the left hand side you should notice a bunch of files that are literally called TutorialForOthers with their respective .cpp (C++) and .h(Header) files next to them.  
  

### Coding Start

Well where do we get started? Simple. If we think about this logically, who does the camera really concern in a game? The character. So that tells us immediately that we should probably take a look in the TutorialForOthersCharacter.cpp and TutorialForOthersCharacter.h files. Go ahead and double click on both of those.  
  

_(A Header File is a file in which the programmer typically creates a class and defines all the functions (Or methods, it's basically the same thing.) into it, this includes variables as well. This is called proto-typing. That means that if I wanted a character to Jump, i'd create the Jumping in the Header file but the actual code that performs the jump would be in the .cpp file. Get it? A Class is just a collection of Methods and Variables, it's called encapsulation.)_  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/5/52/UE4ZoomTut5.png/180px-UE4ZoomTut5.png)](/File:UE4ZoomTut5.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut5.png "Enlarge")

Visual Studio Solution 2

Please go ahead and click the image Visual Studio Solution 2. Immediately you should notice that we should be in the TutorialForOthersCharacter.h file, in the protected section. Don't worry about protection and what that means until you've familiarized yourself with C++ a little more. It's a little out of the scope of this tutorial and won't effect us at this time. Now here is where the real fun begins and it's time to get our hands dirty with some actual coding.  
  

First and fore-most. Directly under "_Protected:_" it is important to write this exactly as I do, if confused look at the image HeaderFileCharacter .  

[![](https://d3ar1piqh1oeli.cloudfront.net/8/83/UE4ZoomTut6.png/180px-UE4ZoomTut6.png)](/File:UE4ZoomTut6.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut6.png "Enlarge")

HeaderFileCharacter

  

Protected:
    void CameraZoomIn();
    void CameraZoomOut();
    float CameraZoom\_v;

Don't worry about all the other code directly underneath the bit we just wrote. Now then it's important to explain exactly what we did. As mentioned before this is called proto-typing. We created two functions(Or methods, same thing really) with the void return type(No return type) which is literally just a name of something that we expect it to do. For instance if we made a function name called Jump then we'd expect something to jump when that function is called. Last but not least we created a variable using the data type float which is basically a decimal number. We're going to call it CameraZoom\_v, why \_v? Because it reminds me that this is a variable that needs to be assigned a number later on.  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/0/0a/UE4ZoomTut7.png/180px-UE4ZoomTut7.png)](/File:UE4ZoomTut7.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut7.png "Enlarge")

CPPFileCharacter

Go ahead and double click on TutorialForOthersCharacter.cpp and it should open the appropriate file. Of course you can click on the image on this wiki CPPFileCharacter to make sure that you're on the right track. Don't mind the red lines that your compiler might get for now. It's perfectly fine. Visual Studio 2013 can act a little bit slow and glitchy from time to time. It isn't anything to worry about at this time.  
  

Now let's get to work. Directly underneath the two include instructions at the top of the code I want you to create the following. If you're lost then go ahead and click the image called CPPFileCharacter2.  

/////
void ATutorialForOthersCharacter::CameraZoomIn()
{
 
}
 
void ATutorialForOthersCharacter::CameraZoomOut()
{
 
}

  

[![](https://d3ar1piqh1oeli.cloudfront.net/5/52/UE4ZoomTut8.png/180px-UE4ZoomTut8.png)](/File:UE4ZoomTut8.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut8.png "Enlarge")

CPPFileCharacter2

  
Alright, I feel it's pretty important to discuss exactly what we just did. Remember in the .h file we made the name of the two functions and I mentioned that we were proto-typing them? Well this is where we actually start to see it come to life. In the .cpp file we're going to actually make it DO SOMETHING. First though we had to specify it's return type, the void and then call the name of the class with the letter A in front of it, in this case it was called ATutorialForOthersCharacter. Then we included the membership operator which is the two colons :: followed by the name of the function that we earlier created in the Header file. Pretty cool huh? We separated it this time with curly braces and this means that inside this function any code created will be used. So now it's time to actually tell the camera how we want it to operate.  
  

Inside the CameraZoomIn function what do we expect? Well, if I scroll up with my middle mouse button then I expect the camera to zoom in. But how do we do that? If you scrolled down and looked at this page you might have found this: CameraBoom->TargetArmLength = 300.0f; Woah, what the heck is that!? Well, when we started with the Third Person Template from earlier it created something called a CameraBoom which handles the camera. That was nice of it wasn't it? Thanks Unreal! Anyways, it then has an arrow pointing towards something called TargetArmLength, this is called the member Access operator. Don't worry about it since it is a little beyond the scope of this tutorial. However at the end we can see a float value at the number 300.0f. This means the the camera is currently behind the character at around 300.0 unreal measurement units. This is extremely important to us because this is the number we want to play with.  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/e/eb/UE4ZoomTut9.png/180px-UE4ZoomTut9.png)](/File:UE4ZoomTut9.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut9.png "Enlarge")

NextPart

So here is what we're going to do, if confused you know the drill, simply click the image titled NextPart. Inside of our newly created CameraZoomIn function let's go ahead and add the following:  

float a \= 25.0;
CameraZoom\_v \= CameraZoom\_v \- 25.0;
 
if(CameraZoom\_v <= 75.0)
{
    CameraBoom\-\>TargetArmLength \= 75.0;
    CameraZoom\_v \= 75.0;
}
else
{
    CameraBoom\-\>TargetArmLength \= CameraZoom\_v;
}

  
Oh boy! Well let's go over what we just did and why. First we created a local variable called 'a'. That means that ONLY IN THIS FUNCTION can the variable 'a' be used. The moment this function is done, that variable is gone and the bytes it took to store it are now no longer being used. Anyways, we had also assigned the float type variable 'a' to the number '25.0'. Then underneath that we decided to use our old friend CameraZoom\_v. We assigned CameraZoom\_v to itself and then performed abit of math. We're going to subtract whatever number (Currently nothing) that's in CameraZoom\_v by 25.0. This means every time you call this function that number is going to get subtracted by 'a'.  
  
Next on the list we have our first control statement called an If statement. It does exactly what it sounds like. If the condition is true then perform what is inside the brackets if it is no longer true then perform the else statement. Now the real question is what is inside these control statements and how are they working? Well, the if statement says: "If CameraZoom\_v is less than or equal to the number 75.0 then inside I want you to set the camera at 75.0 no matter what. Also let's set the number CameraZoom\_v to 75 as well.". Next in the else statement it's telling us: "Hey, if CameraZoom\_v is anything greater than the number 75.0 then I want you to set the camera to whatever number is in CameraZoom\_v.". Pretty neat, huh?  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/e/e4/UE4ZoomTut10.png/180px-UE4ZoomTut10.png)](/File:UE4ZoomTut10.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut10.png "Enlarge")

Constructor

Now then... this all look's fine and dandy except we're missing one thing. What number is assigned to CameraZoom\_v!? Well currently we don't have a number in it so if we ran this right now the compiler is going to throw a huge fit and say "Hey buddy, I don't know what number this is! You tell me!". So that's exactly what we're going to do. Scroll down to the constructor. What is the constructor you might be asking? Well, when this class is created and turned into an object the first thing it's going to do is run something called a constructor. This is the FIRST bit of code that get's executed.  
So scroll on down and look for the following: _ATutorialForOthersCharacter::ATutorialForOthersCharacter(const class FPostConstructInitializeProperties& PCIP)_.  
A good way to know that this is the constructor is that the membership operator :: is literally the same name as the Class. A constructor will ALWAYS have the same name as the Class.  
  
Anyways... by now you should know that the code goes in between the brackets. So let's go ahead and write our code, of course if you're lost just go ahead and click the picture that says Constructor.  
  

CameraZoom\_v \= 300.0;

  

  
Woah that was real hard wasn't it? Phew. Glad we could manage to do that. By now you might be able to see what i'm getting at here. Programming isn't really that difficult once you understand the logic and syntax(How it's formatted and written, us programmers like to use terms of art though which can make things really confusing!). What we just said was the moment this object, our character, is created we want to turn this global (float) variable CameraZoom\_v into the number 300.0. So now the compiler knows exactly what this number is and now we do too.  
  

  

[![](https://d3ar1piqh1oeli.cloudfront.net/1/1a/UE4ZoomTut11.png/180px-UE4ZoomTut11.png)](/File:UE4ZoomTut11.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut11.png "Enlarge")

ZoomOutTut

Say... aren't we forgetting something else? Oh my goodness we are! What happens when we zoom out!? Well currently nothing. Scroll back on up to your ZoomOut function. Now... I wouldn't recommend copying and pasting because that is usually where things typically can go wrong, but quite literally you CAN copy and paste this next part from your own code and tweak it slightly to work for you. We're not going to do that though, but you'll see what I mean in just a second, if not go ahead and click the image called ZoomOutTut on this page.  
  

float a \= 25.0;
CameraZoom\_v \= CameraZoom\_v + 25.0;
 
if(CameraZoom\_v \>= 300.0)
{
    CameraBoom\-\>TargetArmLength \= 300.0;
    CameraZoom\_v \= 300.0;
}
else
{
    CameraBoom\-\>TargetArmLength \= CameraZoom\_v;
}

  

Do you by chance happen to see something here? A pattern maybe? If not i'll help you see it! Remember in our CameraZoomIn we said CameraZoom\_v = CameraZoom\_v - 25.0;? Well now we're going to go in the opposite direction and ADD. You might begin to see the picture now. When we zoom out we're subtracting from 300.0 and since we know that 300.0 is the start of the camera position we're actually moving it closer to the character who is at 0. When we're adding to that number we're actually moving the camera further by adding to it. Pretty simple right? Uh-oh... then we get to our if statement what on earth does that mean?  
  
The If statement says "Hey listen fella. If CameraZoom\_v is greater then or equal to 300.0 then i'm going to lock this at 300.0 i'm also going to set the variable CameraZoom\_v to 300.0 and make sure it doesn't exceed past that number. If this isn't true then well, let's go ahead and set the number to whatever CameraZoom\_v is". And that is literally all that If statement does... but we STILL aren't done, I know, I know. Trust me we're almost finished! This will go by so much quicker when you completely understand what is happening.  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/8/8e/UE4ZoomTut12.png/180px-UE4ZoomTut12.png)](/File:UE4ZoomTut12.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut12.png "Enlarge")

CharacterInput

  

_(Now just in case you haven't been looking at the pictures you're going to want to do so here.)_  
  

Next we want a way to actually CALL these functions. They exist but how do we actually use them? Well, scroll on down towards the function/method called _void ATutorialForOthersCharacter::SetupPlayerInputComponent(class UInputComponent\* InputComponent)_. At first glance you might look at it and immediately recognize that this is where all the character input is actually handled from your keyboard, touch-screen or controller. For the sake of this tutorial though we're using the keyboard. Anyways we're going to add two lines of code and then guess what? We're done with the programming part! Cheers! By now you should know where the code goes, if not look at the picture called CharacterInput  
  

InputComponent\-\>BindAction("ZoomIn", IE\_Pressed, this, &ATutorialForOthersCharacter::CameraZoomIn);
InputComponent\-\>BindAction("ZoomOut", IE\_Pressed, this, &ATutorialForOthersCharacter::CameraZoomOut);

  

Alright, so what on earth are we telling the compiler? Well... when I press a button, which we haven't decided yet, I want to call the Action **"ZoomIn"** and only do this when I press the button, **IE\_Pressed**. I want it to effect **this** object(TutorialForOthers). When that happens I want you to call the function CameraZoomIn from this object (&ATutorialForOthersCharacter::CameraZoomIn).  
  
  

Enough Coding Already!
----------------------

Good news or bad news first? Okay, the bad news is we aren't done just yet. Good news is we've finished the programming side of things! Go ahead and click the Green Arrow on your compiler that says "Start Debugging". This will compile and launch the editor. It might take a little while for the first time but it will eventually speed up.  
  

[![](https://d3ar1piqh1oeli.cloudfront.net/1/1f/UE4ZoomTut13.png/180px-UE4ZoomTut13.png)](/File:UE4ZoomTut13.png)

[![](/skins/common/images/magnify-clip.png)](/File:UE4ZoomTut13.png "Enlarge")

HomeStretch

Right about now you should be looking at the default level that comes with this template, if confused click the image called HomeStretch. Here is what you need to do. At the top left click Edit and then scroll down to Project Settings and then click on the left hand side the button that says Input. Underneath action mappings we want to add our own input, how do we do that? Click the + sign next to the button Action Mappings. Now this part is very important, you'll notice a new box appeared underneath Jump. You need to name this "ZoomIn" just like you did in the code. Click the + button beside the new ZoomIn action map to add something underneath it. Be sure to click the arrow to expand the window. Here you can set it to whatever button you would like. For the sake of this tutorial though you may want to set it to Mouse Wheel Up. Repeat this process except for the next field make sure it's called ZoomOut and then map it to whichever key you like. Of course you SHOULD use Mouse Wheel Down if you had already used Mouse Wheel Up, it's only common sense... unless you LIKE being confused and confusing others with weird inputs! Anyways...  
  
Last but not least close that window and press the giant play button and test it out. I hope you enjoyed this tutorial! Happy Coding and be sure to make your Unreal Engine 4 a FUN experience the way that you would like to. Take it easy!  
  

Creator of this Tutorial: [https://wiki.unrealengine.com/User:Master\_Kyp](https://wiki.unrealengine.com/User:Master_Kyp)

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Third\_Person\_Camera\_Zoom\_C%2B%2B&oldid=8660](https://wiki.unrealengine.com/index.php?title=Third_Person_Camera_Zoom_C%2B%2B&oldid=8660)"

[Categories](/Special:Categories "Special:Categories"):

*   [Tutorials](/Category:Tutorials "Category:Tutorials")
*   [Code](/Category:Code "Category:Code")
*   [Community Created Content](/Category:Community_Created_Content "Category:Community Created Content")