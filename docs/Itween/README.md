Itween - Epic Wiki                    

Itween
======

Parameter Parsing  
Strings may be passed into the "Parameters" input on Simple, Expert, and Minimal iTween operations.

_Anatomy of an iTween Parameter_  
Each parameter has four elements, from left to right: The key, the assignment operator (or equals sign), the value and the punctuation (or semicolon).  
\-The key tells the parser which variable in the iTweenEvent to change.  
\-The assignment operator tells the parser that the command part is finished.  
\-The input is what the variable will be changed to.  
\-The punctuation tells the parser that the value part is finished and this parameter is complete.

   Example: "name = New Tween; vectorFrom = this; vectorTo = (10, 50, 100); time = 3.5;"

Keys are case-insensitive and space-agnostic, so "name," "NAME," and "Na Me" will all have the same effect. Values are not case-insensitive, so names should be input with the actual capitalization you want. Numeric values like "float" and "vector" are space-agnostic, but lettered values are not, i.e. "name."

Punctuation at the end of the last parameter in a string is not required, but is considered a best practice.

_Parser Arithmetic_  
For numeric values, arithmetic operations are not parsed with one exception: one single multiplication operation per value. This allows for vectors and rotators to be easily multiplied, but also works for floats and other numeric values.

_Keywords_  
Consider that vectors, rotators, and vector2D keys can take lettered values such as "this," "current," "zero" and "one."

   Example: "vectorfrom = this \* 2; vectorto = one \* 5;"

In this example, the from vector will be the object's current location multiplied by 2 and the to vector will be (5,5,5).

"this" OR "current" will return the object's current vector, rotator, or vector2D.  
"zero" will return (0,0,0) or (0,0) for vector2D.  
"one" will return (1,1,1) or (1,1) for vector2D.  

_Parser Grammar_  
Vectors, Vector2Ds, Rotators, and Linear Colors can be written with parentheses (), braces {}, brackets \[\] or nothing at all as long as the values are separated by commas (,).

Converting these values to string through the engine is also allowed into the parser. For example, converting a vector (9,7,8) to string will produce "X=9 Y=7 Z=8". The parser will recognize these without issue.

Linear color values can be input as 0-to-1-based RGB vectors or one of the following named colors: black, blue, cyan, green, magenta, red, white, and yellow.

Object references can be set by FName. These object reference keys include onstarttarget, onticktarget, onlooptarget, oncompletetarget, and orientationtarget. Note that the custom curve used as an EaseType cannot be set through the parser.

_Variables in the Parser_  
Variable names may not be passed as a value because they can not be parsed from a string. In Blueprints, best practice is to use the "Format Text" node and convert your variable into text (or in some cases to string then to text) then convert the "Format Text" node's output into a string. Readings from string conversions will be understood by the parser. For C++ users, best practice is as follows:

   ("vectorfrom = this; vectorto = " + vectorVariable.ToString() + "; time = 5")

_Keys and Values_  
By default, the values listed below are listed in the order that they are evaluated by the parser.

Key

Effect

Alternative Keys

Acceptable Values

Example

Default Value

name

Sets the Tween's name.

N/A

Anything

name = Super Tween 1!;

""

floatfrom

Sets the "from" float for operations that use floats.  
Ex: UMG RT Rotate From/To, Float From/To

ffrom

1 OR 1.0 OR  
1f OR 1.f

floatfrom = 65;  
ffrom = 4.5 \* 2;

0

floatto

Sets the "from" float for operations that use floats.  
Ex: UMG RT Rotate From/To, Float From/To

fto

1 OR 1.0 OR  
1f OR 1.f

floatto = 7f;  
fto = 100.267f \* 30;

0

coordinatespace

Sets the space for the tween.  
Ex: world space, parent space, or self space

cspace

world, self, space

coordinatespace = self;  
cspace = parent;

world

vectorfrom

Sets the "from" vector for operations that use vectors.  
Ex: Vector From/To, Actor Scale From/To

vfrom

zero: (0,0,0)  
one: (1,1,1)  
2,2,2 OR \[3,3,3\]

vectorfrom = (2,75,33);  
vfrom = one \* 5;

FVector(0,0,0)

vectorto

Sets the "to" vector for operations that use vectors.  
Ex: Component Move From/To

vto

zero: (0,0,0)  
one: (1,1,1)  
X=20 Y=90 Z=100

vectorto = zero;  
vto = 8,0,8 \* 2.65;

FVector(0,0,0)

vector2dfrom

Sets the "from" vector2D for operations that use vector2Ds.  
Ex: Vector2D From/To, UMG RT Scale From/To

v2from

zero: (0,0)  
one: (1,1)  
{4,4} OR (5,5)

vector2dfrom = (2,75);  
v2from = one \* 5;

FVector2D(0,0)

vector2dto

Sets the "to" vector2D for operations that use vector2Ds.  
Ex: UMG RT Move From/To

v2to

zero: (0,0)  
one: (1,1)  
X=20 Y=90

vector2dto = zero;  
v2to = 8,0 \* 2.65;

FVector2D(0,0)

rotatorfrom

Sets the "from" rotator for operations that use rotators.  
Ex: Rotator From/To, Actor Rotate From/To

rfrom

zero: (0,0,0)  
one: (1,1,1)  
2,2,2 OR \[3,3,3\]

rotatorfrom = (2,75,33);  
rfrom = one \* 5;

FRotator(0,0,0)

rotatorto

Sets the "to" rotator for operations that use rotators.  
Ex: Component Rotate From/To

rto

zero: (0,0,0)  
one: (1,1,1)  
R=20 P=90 Y=100

rotatorto = zero;  
rto = 8,0,8 \* 2.65;

FRotator(0,0,0)

linearcolorfrom

Sets the "from" linear color for operations that use linear colors.  
Can accept some color names, an RGB vector (R,G,B) or an RGB vector with Alpha argument (R,G,B,A).  
Ex: Linear Color From/To

linearcolourfrom  
colorfrom  
colourfrom  
cfrom OR lcfrom

black, blue,  
cyan, green,  
magenta, red,  
white, yellow  
1,0,1  
\[0.5,0.75,1,0.5\]

linearcolorfrom = (2,75,33);  
cfrom = white;

FColor::Black

linearcolorto

Sets the "to" linear color for operations that use linear colors.  
Can accept some color names, an RGB vector (R,G,B) or an RGB vector with Alpha argument (R,G,B,A).  
Ex: Linear Color From/To

linearcolourto  
colorto  
colourto  
cto OR lcto

black, blue,  
cyan, green,  
magenta, red,  
white, yellow  
{0.5,0.75,1,0.5}  
R=1 G=1 B=0 A=1

colorto = zero;  
lcto = yellow;

FColor::Black

delaytype

Sets when to wait for the delay parameter.  
First: Only delay before the tween begins  
First and After Each Loop Section (firstloop): Delay before the tween and after every looping rewind or switch between back-and-forth.  
First and After Each Full Loop (firstloopfull): Delay before the tween and after every looping rewind or back-and-forth set.  
After Each Loop Section (loop): Loop after every looping rewind or switch between back-and-forth only.  
After Each Full Loop (loopfull): Loop after every looping rewind or back-and-forth set only.

dtype

first OR firstloop OR  
firstloopfull OR  
loop OR loopfull

delaytype = first;  
dtype = loopfull;

DelayType::first

delay

Sets the amount of time in seconds that the operation will wait before starting or looping, depending on the delaytype.

N/A

1 OR 1.0 OR  
1f OR 1.f

delay = 3.5;  
delay = 4.5 \* 2;

0

ticktype

Sets whether to use speed or time in seconds for the tween's duration.  
Seconds: The ticktypevalue will be evaluated as literal time in seconds.  
Speed: The ticktypevalue will be evaluated as distance between from and to variables divided by the ticktypevalue divided by 100.

ttype

seconds OR speed

ticktype = seconds;  
ttype = speed;

TickType::seconds

ticktypevalue

Sets the duration of the tween, whether that be in seconds or by speed.

ttv

1 OR 1.0 OR  
1f OR 1.f

ticktypevalue = 3;  
ttv = 1.1 \* 3;

5

speed

Sets the ticktype to speed and sets the ticktypevalue to a literal float. Think of this as a shortcut.

N/A

1 OR 1.0 OR  
1f OR 1.f

speed = 10;

N/A

timeinseconds

Sets the ticktype to seconds and sets the ticktypevalue to a literal float. Think of this as a shortcut.

time

1 OR 1.0 OR  
1f OR 1.f

timeinseconds = 3;  
time = 1.0;

N/A

punchamplitude

Sets the amplitude by which the "punch" easetype will move.

punch OR pamp

1 OR 1.0 OR  
1f OR 1.f

punchamplitude = 2;  
punch = 3;  
pamp = 4.2 \* 4;

1

generatedpointdistance

Sets the distance at which vertices will be generated for a procedural spline component from the point of origin. Distance is in unreal units.  
For example, a gpd of 100 will generate a vertex 100 UU away from the selected origin in the selected direction and add it to the spline. Used for spline operations.

gpd

1 OR 1.0 OR  
1f OR 1.f

generatedpointdistance = 100;  
gpd = 50.f;

100

sweep

Sets whether or not an actor will stop tweening when it collides with another object.  
Ex: Actor Move From/To

N/A

true OR false

sweep = true;

false

vectorconstraints

Constrains an object's vector-based tween to the specified axis or axes.  
Ex: Actor Move From/To, Actor Scale From/To

vconst

no OR none  
x OR y OR z  
xy OR xz OR yz

vectorconstraints = x;  
vconst = xy

VectorConstraints::none

vector2dconstraints

Constrains an object's vector2D-based tween to the specified axis or axes.  
Ex: UMG RT Move From/To, UMG RT Shear From/To

v2const

no OR none  
x OR y

vector2dconstraints = x;  
v2const = y

Vector2DConstraints::none

rotatorconstraints

Constrains an object's rotator-based tween to the specified axis or axes.  
Ex: Component Rotate From/To

rconst

no OR none  
pitch OR yaw  
OR roll  
pitchyaw OR pitchroll  
OR yawroll

rotatorconstraints = pitch;  
vconst = yawroll

RotatorConstraints::none

looptype

Sets whether to loop and how to loop.  
Once: The tween will not loop.  
Back-and-forth (pingpong/backandforth): The tween will arrive at its destination then move back toward its starting position and repeat.  
Rewind: The tween will keep playing over and over, start to finish.

loop

once OR backandforth  
OR pingpong OR rewind

looptype = pingpong;  
loop = rewind;

LoopType::once

orientation

Specifies the look direction of a moving object.  
Ex: Actor Move From/To  
NoOrientationChange (no): The direction in which the object looks will not be changed by the tween.  
OrientToPath (path): The object will look in the direction it's traveling.  
OrientToTarget (target): The object will rotate to look at a specific target onscreen.

looktype  
look

no OR path  
OR target

orientation = path;  
look = target

LookType::noOrientationChange

orientationspeed

Sets the speed at which the object will reach its orientation if orientation is set to "path" or "target."

ospeed OR lookspeed

1 OR 1.0 OR  
1f OR 1.f

orientationspeed = 2;  
ospeed = 3;  
lookspeed = 4.2 \* 4;

5

tickwhenpaused

Sets whether or not an actor will continue to tween even with the built-in UE4 "Pause" function enabled. Leaving this option set to "false" will respect whatever setting is currently set for the object with regards to "Tick When Paused." Setting it to true will leave it set to true on the actor for now.  
Ex: Actor Move From/To, Component Rotate From/To

twp

true OR false

tickwhenpaused = true;  
twp = true;

false

ignoretimedilation

If enabled, the tweening object will have a time dilation that is the inverse of the global dilation.  
This is useful for when you use global time dilation modulation for slowdown effects or for pausing but you want the tween to function normally.  
The original time dilation will be restored after the tween completes or is stopped.  
Ex: Actor Move From/To, Component Rotate From/To

itd

true OR false

ignoretimedilation = true;  
itd = true;

false

onstarttarget

Sets the target to which the OnTweenStart interface message will be sent. Takes an object FName as a value.

ontweenstarttarget OR ost

object FName

onstarttarget = My\_Character; ost = Table;

nullptr

onticktarget

Sets the target to which the OnTweenTick and OnTweenDataTick interface messages will be sent. Takes an object FName as a value.

ontweenticktarget OR ott

object FName

onticktarget = My\_Character; ott = Table;

nullptr

onlooptarget

Sets the target to which the OnTweenLoop interface message will be sent. Takes an object FName as a value.

ontweenlooptarget OR olt

object FName

onlooptarget = My\_Character; olt = Table;

nullptr

oncompletetarget

Sets the target to which the OnTweenComplete interface message will be sent. Takes an object FName as a value.

ontweencompletetarget OR oct

object FName

onlooptarget = My\_Character; olt = Table;

nullptr

orientationtarget

If the LookType/orientation is set to "Orient To Target" then this will set that target to which the object will orient itself. Takes an object FName as a value.

ot

object FName

orientationtarget = My\_Character; ot = Table;

nullptr

splinecomponent

If performing a spline operation, you may use this key to specify a spline component by name. Takes an object FName as a value.

spline

object FName

splinecomponent = SplineComponent1; spline = coilSpline;

nullptr

interpolatetospline

If performing a spline operation, sets whether or not the object will interpolate from its current position/rotation to the beginning of the spline position/rotation. If disabled, the object will snap to the start spline position/rotation.  
Ex: Actor Move To Spline Point, Component Rotate To Spline Point

its

true OR false

interpolatetospline = true;  
its = true;

false

switchpathorientationdirection

If performing a spline operation and LoopType is pingpong/back-and-forth, this will determine whether or not the object will look back during its pong/back travel.  
Ex: Actor Move To Spline Point, Component Rotate To Spline Point

its

true OR false

switchpathorientationdirection = false;  
spod = false;

true

destroysplineobject

If performing a spline operation, this will destroy the actor that contains the spline component used in the operation. This should only be used when creating procedural splines using GenerateSplineFromVectorArray or GenerateSplineFromRotatorArray.  
Ex: Actor Move To Spline Point, Component Rotate To Spline Point

destroysplineobject  
OR destroyspline OR dso

true OR false

destroysplineobject = true;  
dso = true;

false

shortestpath

Will use find the shortest path between current rotation and the target rotation. Will avoid Gimbal Lock, but will not rotate more than is necessary to reach a rotation between 0 and 359 degrees.  
If disabled, 0 to 540 degrees will get you 3 full rotations; enabled will only get you one.  
Ex: Actor Rotate From/To, Component Rotate From/To

short

true OR false

shortestpath = true;  
short = true;

false

easetype

Determines how the object will ease in or out of its tween. See table below for more information.

ease

see table below for easetype values

easetype = easeinandoutback;  
ease = ioquad;

EaseType::Linear

timerinterval

Sets the interval, in seconds, at which the tween will update.  
0 will make the tween operate on the tick function. Values greater or less than 0 will operate at the designated interval.  
You may add "fps" into the value to make the tween run at a fixed framerate. This works by setting timerInterval to 1 divided by the numerical value when "fps" is found in the value.

interval OR ti

1 OR 1.0 OR  
1f OR 1.f

timerinterval = 0.5;  
interval = 30fps;  
ti = 0.016;

0

_EaseTypes_  
With iTween, users can modulate the transform of their tweens to give them a different look. "In" refers to the beginning of the tween. "Out" refers to the end of the tween. "Ease In Quadratic" will produce a natural, slowed ease at the beginning of the tween and end more quickly. Try out different easetypes to get a feel for how they look. Generally, most users opt for "EaseInAndOutQuadratic" for single-motion tweens because it has the most natural look to it.  
Values in this table are listed by the order that they are listed in the "EEaseType" enumeration.  
Quadratic, Cubic, Quartic, Quintic, Circular, Sine and Exponential all perform the same type of animation more or less: a smooth push to the destination with a shorter or longer ease. Because of this, I will not be writing descriptions for them.  
**Note that the Elastic, Bounce, Back, Punch and Spring EaseTypes, also known as Out-Of-Bounds EaseTypes, do not currently work properly with spline operations. They won't cause crashes, but they won't look right because they work by running data through an equation. Splines only go from 0 to the specified spline "duration," so if the equation returns a negative number or a number greater than the spline's duration, the equation ends up clamped. This is being investigated for a fix, but as of now we have no announcements.**

EaseType

Description

Acceptable Values

Curve

Linear

No modulation. 1:1 relationship between Lerped value and output value.

linear

Coming Soon

EaseInQuadratic

See above paragraph.

EaseInQuadratic OR iquad

Coming Soon

EaseOutQuadratic

See above paragraph.

EaseOutQuadratic OR oquad

Coming Soon

EaseInAndOutQuadratic

See above paragraph.

EaseInAndOutQuadratic OR ioquad

Coming Soon

EaseInCubic

See above paragraph.

EaseInCubic OR icubic

Coming Soon

EaseOutCubic

See above paragraph.

EaseOutCubic OR ocubic

Coming Soon

EaseInAndOutCubic

See above paragraph.

EaseInAndOutCubic OR iocubic

Coming Soon

EaseInQuartic

See above paragraph.

EaseInQuartic OR iquart

Coming Soon

EaseOutQuartic

See above paragraph.

EaseOutQuartic OR oquart

Coming Soon

EaseInAndOutQuartic

See above paragraph.

EaseInAndOutQuartic OR ioquart

Coming Soon

EaseInQuintic

See above paragraph.

EaseInQuintic OR iquint

Coming Soon

EaseOutQuintic

See above paragraph.

EaseOutQuintic OR oquint

Coming Soon

EaseInAndOutQuintic

See above paragraph.

EaseInAndOutQuintic OR ioquint

Coming Soon

EaseInSine

See above paragraph.

EaseInSine OR isine

Coming Soon

EaseOutSine

See above paragraph.

EaseOutSine OR osine

Coming Soon

EaseInAndOutSine

See above paragraph.

EaseInAndOutSine OR iosine

Coming Soon

EaseInExponential

See above paragraph.

EaseInExponential OR iexpo

Coming Soon

EaseOutExponential

See above paragraph.

EaseOutExponential OR oexpo

Coming Soon

EaseInAndOutExponential

See above paragraph.

EaseInAndOutExponential OR ioexpo

Coming Soon

EaseInCircular

See above paragraph.

EaseInCircular OR icirc

Coming Soon

EaseOutCircular

See above paragraph.

EaseOutCircular OR ocirc

Coming Soon

EaseInAndOutCircular

See above paragraph.

EaseInAndOutCircular OR iocirc

Coming Soon

EaseInBounce

The tween will act is if it's bouncing into place, but in reverse; the tween will seem to bounce out of its source transform. The opposite of EaseOutBounce.

EaseInBounce OR ibounce

Coming Soon

EaseOutBounce

The tween will appear to bounce like a ball as it hits its destination.

EaseOutBounce OR obounce

Coming Soon

EaseInAndOutBounce

The tween will appear to reverse bounce out of its source transform then land on its destination, again bouncing like a ball.

EaseInAndOutBounce OR iobounce

Coming Soon

EaseInBack

The tween winds up and softly moves to its destination.

EaseInBack OR iback

Coming Soon

EaseOutBack

The tween moves to its destination, overshoots, then comes back.

EaseOutBack OR oback

Coming Soon

EaseInAndOutBack

The tween winds up in anticipation and then moves toward its destination, but overshoots then comes back.

EaseInAndOutBack OR ioback

Coming Soon

EaseInElastic

The tween will appear to vibrate in an elastic manner Then push to its destination The opposite of EaseOutElastic.

EaseInElastic OR ielastic

Coming Soon

EaseOutElastic

The tween will push toward its destination then vibrate and fling as if it had landed in a rubber band.

EaseOutElastic OR oelastic

Coming Soon

EaseInAndOutElastic

The tween will vibrate in an elastic manner then fling to its destination and vibrate in the same manner again.

EaseInAndOutElastic OR ioelastic

Coming Soon

Punch

Pushes like one of the elastic tweens in the direction of the destination, but ends up back where it started. The degree of violence is affected by the punchAmplitude property.

punch

Coming Soon

Spring

A much softer version of EaseOutElastic.

spring

Coming Soon

CustomCurve

Select this EaseType to use a CurveFloat asset to drive the tween's easing.

curve

Coming Soon

iTween for UE4 Installer source  

Form1.Designer.cs  

   namespace iTweenForUE4Installer
   {
       partial class iTween
       {
           /// <summary>
           /// Required designer variable.
           /// </summary>
           private System.ComponentModel.IContainer components = null;
   
           /// <summary>
           /// Clean up any resources being used.
           /// </summary>
           /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
           protected override void Dispose(bool disposing)
           {
               if (disposing && (components != null))
               {
                   components.Dispose();
               }
               base.Dispose(disposing);
           }
   
           #region Windows Form Designer generated code
   
           /// <summary>
           /// Required method for Designer support - do not modify
           /// the contents of this method with the code editor.
           /// </summary>
           private void InitializeComponent()
           {
               System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(iTween));
               this.lblVersion = new System.Windows.Forms.Label();
               this.rbnCPP = new System.Windows.Forms.RadioButton();
               this.rbnBlue = new System.Windows.Forms.RadioButton();
               this.btnInstall = new System.Windows.Forms.Button();
               this.folderBrowserDialog1 = new System.Windows.Forms.FolderBrowserDialog();
               this.txbPath = new System.Windows.Forms.TextBox();
               this.btnBrowse = new System.Windows.Forms.Button();
               this.lnkPixelPlacement = new System.Windows.Forms.LinkLabel();
               this.imgLogo = new System.Windows.Forms.PictureBox();
               this.lblDescription = new System.Windows.Forms.Label();
               this.lnkSweet = new System.Windows.Forms.LinkLabel();
               this.lblStatus = new System.Windows.Forms.Label();
               this.chkDebugMessages = new System.Windows.Forms.CheckBox();
               this.chkErrorMessages = new System.Windows.Forms.CheckBox();
               this.txtListLog = new System.Windows.Forms.TextBox();
               this.btnCopyLog = new System.Windows.Forms.Button();
               this.btnShowLog = new System.Windows.Forms.Button();
               this.lblLinkSeparator = new System.Windows.Forms.Label();
               this.btnUninstall = new System.Windows.Forms.Button();
               this.chkSaveLog = new System.Windows.Forms.CheckBox();
               ((System.ComponentModel.ISupportInitialize)(this.imgLogo)).BeginInit();
               this.SuspendLayout();
               // 
               // lblVersion
               // 
               this.lblVersion.AutoSize = true;
               this.lblVersion.Dock = System.Windows.Forms.DockStyle.Right;
               this.lblVersion.Location = new System.Drawing.Point(646, 0);
               this.lblVersion.Name = "lblVersion";
               this.lblVersion.Size = new System.Drawing.Size(103, 13);
               this.lblVersion.TabIndex = 0;
               this.lblVersion.Text = "iTween version here";
               this.lblVersion.TextAlign = System.Drawing.ContentAlignment.TopRight;
               // 
               // rbnCPP
               // 
               this.rbnCPP.AutoSize = true;
               this.rbnCPP.Location = new System.Drawing.Point(12, 94);
               this.rbnCPP.Name = "rbnCPP";
               this.rbnCPP.Size = new System.Drawing.Size(130, 17);
               this.rbnCPP.TabIndex = 2;
               this.rbnCPP.TabStop = true;
               this.rbnCPP.Text = "I\\'m a C++ User or both";
               this.rbnCPP.UseVisualStyleBackColor = true;
               this.rbnCPP.Click += new System.EventHandler(this.SetStatusWaiting);
               // 
               // rbnBlue
               // 
               this.rbnBlue.AutoSize = true;
               this.rbnBlue.Location = new System.Drawing.Point(12, 71);
               this.rbnBlue.Name = "rbnBlue";
               this.rbnBlue.Size = new System.Drawing.Size(154, 17);
               this.rbnBlue.TabIndex = 1;
               this.rbnBlue.TabStop = true;
               this.rbnBlue.Text = "I\\'m a Blueprinter exclusively";
               this.rbnBlue.UseVisualStyleBackColor = true;
               this.rbnBlue.Click += new System.EventHandler(this.SetStatusWaiting);
               // 
               // btnInstall
               // 
               this.btnInstall.Enabled = false;
               this.btnInstall.Location = new System.Drawing.Point(172, 71);
               this.btnInstall.Name = "btnInstall";
               this.btnInstall.Size = new System.Drawing.Size(59, 22);
               this.btnInstall.TabIndex = 3;
               this.btnInstall.Text = "Install";
               this.btnInstall.UseVisualStyleBackColor = true;
               this.btnInstall.MouseClick += new System.Windows.Forms.MouseEventHandler(this.btnInstall\_Click);
               // 
               // folderBrowserDialog1
               // 
               this.folderBrowserDialog1.HelpRequest += new System.EventHandler(this.folderBrowserDialog1\_HelpRequest);
               // 
               // txbPath
               // 
               this.txbPath.Location = new System.Drawing.Point(10, 166);
               this.txbPath.Name = "txbPath";
               this.txbPath.Size = new System.Drawing.Size(166, 20);
               this.txbPath.TabIndex = 4;
               this.txbPath.Text = "UE4 Project Path here...";
               this.txbPath.Click += new System.EventHandler(this.SetStatusWaiting);
               this.txbPath.TextChanged += new System.EventHandler(this.ValidatePath);
               // 
               // btnBrowse
               // 
               this.btnBrowse.Location = new System.Drawing.Point(180, 164);
               this.btnBrowse.Name = "btnBrowse";
               this.btnBrowse.Size = new System.Drawing.Size(51, 22);
               this.btnBrowse.TabIndex = 5;
               this.btnBrowse.Text = "Browse";
               this.btnBrowse.UseVisualStyleBackColor = true;
               this.btnBrowse.MouseClick += new System.Windows.Forms.MouseEventHandler(this.btnBrowse\_Click);
               // 
               // lnkPixelPlacement
               // 
               this.lnkPixelPlacement.AutoSize = true;
               this.lnkPixelPlacement.Location = new System.Drawing.Point(82, 190);
               this.lnkPixelPlacement.Name = "lnkPixelPlacement";
               this.lnkPixelPlacement.Size = new System.Drawing.Size(79, 13);
               this.lnkPixelPlacement.TabIndex = 6;
               this.lnkPixelPlacement.TabStop = true;
               this.lnkPixelPlacement.Text = "PixelPlacement";
               this.lnkPixelPlacement.LinkClicked += new System.Windows.Forms.LinkLabelLinkClickedEventHandler(this.lnkPixelPlacement\_Click);
               // 
               // imgLogo
               // 
               this.imgLogo.Location = new System.Drawing.Point(12, 1);
               this.imgLogo.Name = "imgLogo";
               this.imgLogo.Size = new System.Drawing.Size(64, 64);
               this.imgLogo.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
               this.imgLogo.TabIndex = 7;
               this.imgLogo.TabStop = false;
               // 
               // lblDescription
               // 
               this.lblDescription.Location = new System.Drawing.Point(82, 23);
               this.lblDescription.Name = "lblDescription";
               this.lblDescription.Size = new System.Drawing.Size(160, 45);
               this.lblDescription.TabIndex = 8;
               this.lblDescription.Text = "Choose the path to your project containing a \*.uproject file to enable the \\"Insta" +
       "ll\\" button!";
               // 
               // lnkSweet
               // 
               this.lnkSweet.AutoSize = true;
               this.lnkSweet.Location = new System.Drawing.Point(164, 190);
               this.lnkSweet.Name = "lnkSweet";
               this.lnkSweet.Size = new System.Drawing.Size(67, 13);
               this.lnkSweet.TabIndex = 9;
               this.lnkSweet.TabStop = true;
               this.lnkSweet.Text = "Sweet Team";
               this.lnkSweet.LinkClicked += new System.Windows.Forms.LinkLabelLinkClickedEventHandler(this.lnkSweet\_Click);
               // 
               // lblStatus
               // 
               this.lblStatus.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom)));
               this.lblStatus.AutoSize = true;
               this.lblStatus.Location = new System.Drawing.Point(348, 214);
               this.lblStatus.Name = "lblStatus";
               this.lblStatus.Size = new System.Drawing.Size(52, 13);
               this.lblStatus.TabIndex = 10;
               this.lblStatus.Text = "Waiting...";
               this.lblStatus.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
               // 
               // chkDebugMessages
               // 
               this.chkDebugMessages.AutoSize = true;
               this.chkDebugMessages.Location = new System.Drawing.Point(12, 118);
               this.chkDebugMessages.Name = "chkDebugMessages";
               this.chkDebugMessages.Size = new System.Drawing.Size(212, 17);
               this.chkDebugMessages.TabIndex = 11;
               this.chkDebugMessages.Text = "Print iTween Debug Messages in Editor";
               this.chkDebugMessages.UseVisualStyleBackColor = true;
               this.chkDebugMessages.CheckedChanged += new System.EventHandler(this.SetStatusWaiting);
               this.chkDebugMessages.CheckStateChanged += new System.EventHandler(this.SetStatusWaiting);
               this.chkDebugMessages.Click += new System.EventHandler(this.SetStatusWaiting);
               // 
               // chkErrorMessages
               // 
               this.chkErrorMessages.AutoSize = true;
               this.chkErrorMessages.Checked = true;
               this.chkErrorMessages.CheckState = System.Windows.Forms.CheckState.Checked;
               this.chkErrorMessages.Location = new System.Drawing.Point(12, 141);
               this.chkErrorMessages.Name = "chkErrorMessages";
               this.chkErrorMessages.Size = new System.Drawing.Size(202, 17);
               this.chkErrorMessages.TabIndex = 12;
               this.chkErrorMessages.Text = "Print iTween Error Messages in Editor";
               this.chkErrorMessages.UseVisualStyleBackColor = true;
               // 
               // txtListLog
               // 
               this.txtListLog.Location = new System.Drawing.Point(8, 237);
               this.txtListLog.Multiline = true;
               this.txtListLog.Name = "txtListLog";
               this.txtListLog.ReadOnly = true;
               this.txtListLog.ScrollBars = System.Windows.Forms.ScrollBars.Both;
               this.txtListLog.Size = new System.Drawing.Size(732, 159);
               this.txtListLog.TabIndex = 13;
               // 
               // btnCopyLog
               // 
               this.btnCopyLog.Location = new System.Drawing.Point(168, 209);
               this.btnCopyLog.Name = "btnCopyLog";
               this.btnCopyLog.Size = new System.Drawing.Size(63, 22);
               this.btnCopyLog.TabIndex = 14;
               this.btnCopyLog.Text = "Copy Log";
               this.btnCopyLog.UseVisualStyleBackColor = true;
               this.btnCopyLog.MouseClick += new System.Windows.Forms.MouseEventHandler(this.btnCopyLog\_Click);
               // 
               // btnShowLog
               // 
               this.btnShowLog.Location = new System.Drawing.Point(8, 209);
               this.btnShowLog.Name = "btnShowLog";
               this.btnShowLog.Size = new System.Drawing.Size(66, 22);
               this.btnShowLog.TabIndex = 15;
               this.btnShowLog.Text = "Show Log";
               this.btnShowLog.UseVisualStyleBackColor = true;
               this.btnShowLog.MouseClick += new System.Windows.Forms.MouseEventHandler(this.btnShowLog\_Click);
               // 
               // lblLinkSeparator
               // 
               this.lblLinkSeparator.AutoSize = true;
               this.lblLinkSeparator.Location = new System.Drawing.Point(158, 190);
               this.lblLinkSeparator.Name = "lblLinkSeparator";
               this.lblLinkSeparator.Size = new System.Drawing.Size(9, 13);
               this.lblLinkSeparator.TabIndex = 16;
               this.lblLinkSeparator.Text = "|";
               // 
               // btnUninstall
               // 
               this.btnUninstall.Enabled = false;
               this.btnUninstall.Location = new System.Drawing.Point(172, 94);
               this.btnUninstall.Name = "btnUninstall";
               this.btnUninstall.Size = new System.Drawing.Size(59, 22);
               this.btnUninstall.TabIndex = 17;
               this.btnUninstall.Text = "Uninstall";
               this.btnUninstall.UseVisualStyleBackColor = true;
               this.btnUninstall.Click += new System.EventHandler(this.btnUninstall\_Click);
               // 
               // chkSaveLog
               // 
               this.chkSaveLog.AutoSize = true;
               this.chkSaveLog.Checked = true;
               this.chkSaveLog.CheckState = System.Windows.Forms.CheckState.Checked;
               this.chkSaveLog.Location = new System.Drawing.Point(10, 189);
               this.chkSaveLog.Name = "chkSaveLog";
               this.chkSaveLog.Size = new System.Drawing.Size(72, 17);
               this.chkSaveLog.TabIndex = 18;
               this.chkSaveLog.Text = "Save Log";
               this.chkSaveLog.UseVisualStyleBackColor = true;
               // 
               // iTween
               // 
               this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
               this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
               this.ClientSize = new System.Drawing.Size(749, 408);
               this.Controls.Add(this.chkSaveLog);
               this.Controls.Add(this.btnUninstall);
               this.Controls.Add(this.lblLinkSeparator);
               this.Controls.Add(this.btnShowLog);
               this.Controls.Add(this.btnCopyLog);
               this.Controls.Add(this.txtListLog);
               this.Controls.Add(this.chkErrorMessages);
               this.Controls.Add(this.chkDebugMessages);
               this.Controls.Add(this.lblStatus);
               this.Controls.Add(this.lnkSweet);
               this.Controls.Add(this.lblDescription);
               this.Controls.Add(this.imgLogo);
               this.Controls.Add(this.lnkPixelPlacement);
               this.Controls.Add(this.btnBrowse);
               this.Controls.Add(this.txbPath);
               this.Controls.Add(this.btnInstall);
               this.Controls.Add(this.rbnBlue);
               this.Controls.Add(this.rbnCPP);
               this.Controls.Add(this.lblVersion);
               this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
               this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
               this.Name = "iTween";
               this.Text = "iTween for UE4 Installer";
               this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.FormClose);
               this.Load += new System.EventHandler(this.iTween\_Load);
               ((System.ComponentModel.ISupportInitialize)(this.imgLogo)).EndInit();
               this.ResumeLayout(false);
               this.PerformLayout();
   
           }
   
           #endregion
   
           private System.Windows.Forms.Label lblVersion;
           private System.Windows.Forms.RadioButton rbnCPP;
           private System.Windows.Forms.RadioButton rbnBlue;
           private System.Windows.Forms.Button btnInstall;
           private System.Windows.Forms.FolderBrowserDialog folderBrowserDialog1;
           private System.Windows.Forms.TextBox txbPath;
           private System.Windows.Forms.Button btnBrowse;
           private System.Windows.Forms.LinkLabel lnkPixelPlacement;
           private System.Windows.Forms.PictureBox imgLogo;
           private System.Windows.Forms.Label lblDescription;
           private System.Windows.Forms.LinkLabel lnkSweet;
           private System.Windows.Forms.Label lblStatus;
           private System.Windows.Forms.CheckBox chkDebugMessages;
           private System.Windows.Forms.CheckBox chkErrorMessages;
           private System.Windows.Forms.TextBox txtListLog;
           private System.Windows.Forms.Button btnCopyLog;
           private System.Windows.Forms.Button btnShowLog;
           private System.Windows.Forms.Label lblLinkSeparator;
           private System.Windows.Forms.Button btnUninstall;
           private System.Windows.Forms.CheckBox chkSaveLog;
       }
   }  

  
Form1.cs  

   using System;
   using System.Diagnostics;
   using System.Collections.Generic;
   using System.ComponentModel;
   using System.Data;
   using System.Drawing;
   using System.Linq;
   using System.Text;
   using System.Threading.Tasks;
   using System.Windows.Forms;
   using System.Windows;
   using System.IO;
   
   namespace iTweenForUE4Installer
   {
       public partial class iTween : Form
       {
           //Paths
           string iTweenUpluginPath = "iTween/iTween.uplugin";
           string imagePath = "iTween/Resources/Icon128.png";
           string projectName;
   
           string BPPath;
           string CPPPath;
   
           //URLs
           string urlPixelPlacement = "[http://wwww.pixelplacement.com](http://wwww.pixelplacement.com)";
           string urlSweet = "[https://forums.unrealengine.com/showthread.php?33992-Open-Beta-Procedural-On-the-Fly-Animation-in-UE4-iTween](https://forums.unrealengine.com/showthread.php?33992-Open-Beta-Procedural-On-the-Fly-Animation-in-UE4-iTween)!";
   
           //log
           List<string> textLog = new List<string>();
   
           bool showLogState = false;
           int collapsedWidth = 258;
           int collapsedHeight = 274;
           int expandedWidth;
           int expandedHeight;
   
           public iTween()
           {
               InitializeComponent();
           }
   
           private void iTween\_Load(object sender, EventArgs e)
           {
               expandedHeight = this.Height;
               expandedWidth = this.Width;
               this.Height = collapsedHeight;
               AddToListLog("Window height is " + this.Height.ToString());
               this.Width = collapsedWidth;
               AddToListLog("Window width is " + this.Width.ToString());
   
               lblStatus.Text = "Waiting...";
   
               //Set the logo image
               if (File.Exists(imagePath))
               {
                   imgLogo.Image = Image.FromFile(imagePath);
                   AddToListLog("iTween logo found.");
               }
               else
               {
                   imgLogo.Image = imgLogo.ErrorImage;
                   AddToListLog("iTween logo not found.");
               }
   
               //Set Blueprinter Radio Button checked
               rbnBlue.Checked = true;
   
               //Set version name (all this just for that! Ha.)
               if (File.Exists(iTweenUpluginPath))
               {
                   StreamReader sr = new StreamReader(iTweenUpluginPath);
                   string line;
                   string fileText = "";
                   int lineCount = 1;
                   string versionLine = "versionLine is null.";
                   while ((line = sr.ReadLine()) != null)
                   {
                       if (line.Contains("VersionName"))
                       {
                           versionLine = line;
                       }
                       fileText = fileText + lineCount.ToString() + " - " + line + "\\n";
                       lineCount++;
                   }
                   versionLine = versionLine.Substring(versionLine.IndexOf(":") + 3);
                   versionLine = versionLine.Substring(0, versionLine.Length - 2);
                   lblVersion.Text = "Version " + versionLine;
                   AddToListLog("Version found in file '" + iTweenUpluginPath + "': " + lblVersion.Text);
               }
               else
               {
                   PrintMessage("This executable must be placed inside the root iTween folder to work. If it is in this folder, you may be missing 
   some files. Please unzip the source archive again and rerun this executable or install manually.");
                   AddToListLog("Incorrect installer configuration.");
               }
   
               if (File.Exists(Application.StartupPath + "\\\\InstallerPrefs.txt"))
               {
                   LoadPrefs();
               }
           }
   
           void PrintMessage(string message)
           {
               MessageBox.Show(message);
           }
   
           void LoadPrefs()
           {
               
               foreach (string s in File.ReadAllLines(Application.StartupPath + "\\\\InstallerPrefs.txt"))
               {
                   string\[\] entries;
                   string\[\] splitter = new string\[\] {"&=&"};
                   if (s.Contains("radioButton"))
                   {
                       entries = s.Split(splitter, StringSplitOptions.None);
   
                       if (entries.Contains("blue"))
                       {
                           rbnBlue.Checked = true;
                       }
                       else if (entries.Contains("cpp"))
                       {
                           rbnCPP.Checked = true;
                       }
                   }
                   else if (s.Contains("debugMessages"))
                   {
                       entries = s.Split(splitter, StringSplitOptions.None);
   
                       if (entries.Contains("true"))
                       {
                           chkDebugMessages.Checked = true;
                       }
                       else if (entries.Contains("false"))
                       {
                           chkDebugMessages.Checked = false;
                       }
                   }
                   else if (s.Contains("errorMessages"))
                   {
                       entries = s.Split(splitter, StringSplitOptions.None);
   
                       if (entries.Contains("true"))
                       {
                           chkErrorMessages.Checked = true;
                       }
                       else if (entries.Contains("false"))
                       {
                           chkErrorMessages.Checked = false;
                       }
                   }
                   else if (s.Contains("saveLog"))
                   {
                       entries = s.Split(splitter, StringSplitOptions.None);
   
                       if (entries.Contains("true"))
                       {
                           chkSaveLog.Checked = true;
                       }
                       else if (entries.Contains("false"))
                       {
                           chkSaveLog.Checked = false;
                       }
                   }
                   else if (s.Contains("lastPath"))
                   {
                       entries = s.Split(splitter, StringSplitOptions.None);
   
                       txbPath.Text = entries\[entries.Length - 1\];
                   }
               }
           }
   
           private void ValidatePath(object sender, EventArgs e)
           {
               if (Directory.Exists(txbPath.Text))
               {
                   string\[\] files = Directory.GetFiles(txbPath.Text, "\*.uproject");
   
                   if (files.Length > 0)
                   {
                       while (txbPath.Text.Substring(txbPath.Text.Length - 1) == "\\\\")
                       {
                           txbPath.Text = txbPath.Text.Substring(0, txbPath.Text.Length - 1);
                       }
   
                       projectName = files\[0\].Substring(txbPath.Text.Length + 1, files\[0\].IndexOf(".uproject") - txbPath.Text.Length - 1);
                       AddToListLog("Project name: " + projectName);
   
                       btnInstall.Enabled = true;
   
                       BPPath = txbPath.Text + "\\\\Plugins\\\\iTween";
                       CPPPath = txbPath.Text + "\\\\Source\\\\" + projectName + "\\\\iTween";
   
                       if (Directory.Exists(BPPath) && rbnBlue.Checked || Directory.Exists(CPPPath) && rbnCPP.Checked)
                       {
                           btnUninstall.Enabled = true;
                       }
                       else
                       {
                           btnUninstall.Enabled = false;
                       }
                   }
                   else
                   {
                       btnInstall.Enabled = false;
                       btnUninstall.Enabled = false;
                   }
               }
               else
               {
                   btnInstall.Enabled = false;
                   btnUninstall.Enabled = false;
               }
           }
   
           private void DirectoryCopy(string sourceDirName, string destDirName, bool copySubDirs)
           {
               // Get the subdirectories for the specified directory.
               DirectoryInfo dir = new DirectoryInfo(sourceDirName);
               DirectoryInfo\[\] dirs = dir.GetDirectories();
   
               if (!dir.Exists)
               {
                   throw new DirectoryNotFoundException(
                       "Source directory does not exist or could not be found: "
                       + sourceDirName);
               }
   
               // If the destination directory doesn't exist, create it. 
               if (!Directory.Exists(destDirName))
               {
                   Directory.CreateDirectory(destDirName);
                   AddToListLog("Created new directory at '" + destDirName + "'");
               }
   
               // Get the files in the directory and copy them to the new location.
               FileInfo\[\] files = dir.GetFiles();
               foreach (FileInfo file in files)
               {
                   string temppath = Path.Combine(destDirName, file.Name);
                   file.CopyTo(temppath, false);
                   AddToListLog("Copied '" + file.Name + "' from '" + sourceDirName + "' to '" + destDirName + "'");
               }
   
               // If copying subdirectories, copy them and their contents to new location. 
               if (copySubDirs)
               {
                   foreach (DirectoryInfo subdir in dirs)
                   {
                       string temppath = Path.Combine(destDirName, subdir.Name);
                       DirectoryCopy(subdir.FullName, temppath, copySubDirs);
                   }
               }
           }
   
           public void btnInstall\_Click(object sender, MouseEventArgs e)
           {
               if (rbnBlue.Checked)
               {
                   AddToListLog("Installing for Blueprint as a plugin for " + projectName + "...");
                   btnUninstall\_Click(sender, e);
   
                   lblStatus.Text = "Copying...";
                   AddToListLog("Copying...");
   
                   DirectoryCopy("iTween\\\\", txbPath.Text + "\\\\Plugins\\\\iTween", true);
   
                   lblStatus.Text = "Done!";
                   AddToListLog("Done!");
               } 
               else if (rbnCPP.Checked)
               {
                   AddToListLog("Installing for C++ user or both to " + projectName + "'s source folder...");
                   btnUninstall\_Click(sender, e);
   
                   lblStatus.Text = "Copying...";
                   AddToListLog("Copying...");
   
                   DirectoryCopy("iTween\\\\Source\\\\iTween\\\\Private\\\\", txbPath.Text + "\\\\Source\\\\" + projectName + "\\\\iTween", true);
   
                   lblStatus.Text = "Fixing...";
   
                   LocalizeSourceFiles();
   
                   lblStatus.Text = "Done!";
                   AddToListLog("Done!");
               }
   
               ValidatePath(sender, e);
           }
   
           private void LocalizeSourceFiles()
           {
               string sourcePath = txbPath.Text + "\\\\Source\\\\" + projectName + "\\\\iTween\\\\";
               string insertInclude = "#include \\"" + projectName + ".h\\"";
               string insertAPI = projectName.ToUpper() + "\_API";
   
               string\[\] sourceFiles = Directory.GetFiles(sourcePath, "\*.cpp");
               string\[\] headerFiles = Directory.GetFiles(sourcePath, "\*.h");
   
               //Source files
               AddToListLog("Editing iTween source files...");
               foreach (string s in sourceFiles)
               {
                   if (File.Exists(s))
                   {
                       List<string> textLines = new List<string>();
                       foreach (string lines in File.ReadAllLines(s))
                       {
                           textLines.Add(lines);
                       }
                       textLines.Insert(textLines.IndexOf("#include \\"iTweenPCH.h\\""), insertInclude);
                       AddToListLog("Added " + "'#include \\"" + projectName + ".h\\"'" + " to '" + s + "' at line " + (textLines.IndexOf("#include 
   \\"iTweenPCH.h\\"") - 1).ToString());
   
                       File.Delete(s);
                       File.WriteAllLines(s, textLines.ToArray());
                   }
               }
   
               //Header files
               AddToListLog("Editing iTween header files...");
               foreach (string s in headerFiles)
               {
                   if (File.Exists(s))
                   {
                       List<string> textLines = new List<string>();
                       foreach (string lines in File.ReadAllLines(s))
                       {
                           textLines.Add(lines);
                       }
                       for (int i = 0; i < textLines.Count; i++)
                       {
                           if (textLines\[i\].Contains("class") && textLines\[i\].Contains(": public"))
                           {
                               textLines\[i\] = textLines\[i\].Insert("class".Length, " " + insertAPI);
                               AddToListLog("Added '" + insertAPI + "' to '" + s + "' at line " + i.ToString());
   
                               if (s == sourcePath + "iTAux.h")
                               {
                                   if (!chkDebugMessages.Checked && textLines\[i\].Contains("bool printDebugMessages = true;"))
                                   {
                                       AddToListLog("User wants debug messages off but they are on.");
                                       textLines\[i\].Replace("true", "false");
                                       AddToListLog("Set line " + i.ToString() + " to '" + textLines\[i\] + "'");
                                   }
                                   else if (chkDebugMessages.Checked && textLines\[i\].Contains("bool printDebugMessages = false;"))
                                   {
                                       AddToListLog("User wants debug messages on but they are off.");
                                       textLines\[i\].Replace("false", "true");
                                       AddToListLog("Set line " + i.ToString() + " to '" + textLines\[i\] + "'");
                                   }
   
                                   if (!chkErrorMessages.Checked && textLines\[i\].Contains("bool printErrorMessages = true;"))
                                   {
                                       AddToListLog("User wants error messages off but they are on.");
                                       textLines\[i\].Replace("true", "false");
                                       AddToListLog("Set line " + i.ToString() + " to '" + textLines\[i\] + "'");
                                   }
                                   else if (chkErrorMessages.Checked && textLines\[i\].Contains("bool printErrorMessages = false;"))
                                   {
                                       AddToListLog("User wants error messages on but they are off.");
                                       textLines\[i\].Replace("false", "true");
                                       AddToListLog("Set line " + i.ToString() + " to '" + textLines\[i\] + "'");
                                   }
                                   break;
                               }
                               else
                               {
                                   break;
                               }
                           }
                           else if (s == sourcePath + "iTweenPCH.h")
                           {
                               if (textLines\[i\].Contains("Module"))
                               {
                                   AddToListLog("Removed '" + textLines\[i\] + "' from '" + s + "'");
                                   textLines.RemoveAt(i);
                               }
                           }
                       }
   
                       File.Delete(s);
                       File.WriteAllLines(s, textLines.ToArray());
                   }
               }
   
               //Add Modules to Build File
               AddToListLog("Opening '" + txbPath.Text + "\\\\Source\\\\" + projectName + "\\\\" + projectName + ".Build.cs'...");
               List<string> text = new List<string>();
               foreach (string lines in File.ReadAllLines(txbPath.Text + "\\\\Source\\\\" + projectName + "\\\\" + projectName + ".Build.cs"))
               {
                   text.Add(lines);
               }
               AddToListLog("Adding '" + "        PrivateDependencyModuleNames.AddRange(new string\[\] { \\"Slate\\", \\"SlateCore\\", \\"EditorStyle\\", 
   \\"UMG\\" });" + "' to '" + txbPath.Text + "\\\\Source\\\\" + projectName + "\\\\" + projectName + ".Build.cs' at line " + (text.IndexOf("	public " + 
   projectName + "(TargetInfo Target)") + 2).ToString());
               text.Insert(text.IndexOf("	public " + projectName + "(TargetInfo Target)") + 2, "        
   PrivateDependencyModuleNames.AddRange(new string\[\] { \\"Slate\\", \\"SlateCore\\", \\"EditorStyle\\", \\"UMG\\" });");
               text.Insert(text.IndexOf("	public " + projectName + "(TargetInfo Target)") + 3, "");
               File.Delete(txbPath.Text + "\\\\Source\\\\" + projectName + "\\\\" + projectName + ".Build.cs");
               File.WriteAllLines(txbPath.Text + "\\\\Source\\\\" + projectName + "\\\\" + projectName + ".Build.cs", text.ToArray());
   
               //File Cleanup
               AddToListLog("Removing plugin module files '" + sourcePath + "iTweenModule.cpp" + "' and '" + sourcePath + "iTweenModule.h" + "' since 
   they are not needed for the C++ option.");
               File.Delete(sourcePath + "iTweenModule.cpp");
               File.Delete(sourcePath + "iTweenModule.h");
           }
   
           private void folderBrowserDialog1\_HelpRequest(object sender, EventArgs e)
           {
   
           }
   
           private void AddToListLog(string logMessage)
           {
               textLog.Add(">> " + logMessage);
               txtListLog.Lines = textLog.ToArray();
           }
   
           private void btnBrowse\_Click(object sender, MouseEventArgs e)
           {
               lblStatus.Text = "Waiting...";
   
               if (Directory.Exists(txbPath.Text))
               {
       	        folderBrowserDialog1.SelectedPath = txbPath.Text;
               }
               folderBrowserDialog1.ShowDialog();
   
               txbPath.Text = folderBrowserDialog1.SelectedPath;
               AddToListLog("Selected path is '" + folderBrowserDialog1.SelectedPath + "'");
           }
   
           private void lnkPixelPlacement\_Click(object sender, LinkLabelLinkClickedEventArgs e)
           {
               lblStatus.Text = "Waiting...";
   
               Process.Start(urlPixelPlacement);
           }
   
           private void lnkSweet\_Click(object sender, LinkLabelLinkClickedEventArgs e)
           {
               lblStatus.Text = "Waiting...";
   
               Process.Start(urlSweet);
           }
   
           private void SetStatusWaiting(object sender, EventArgs e)
           {
               lblStatus.Text = "Waiting...";
   
               if (sender == rbnBlue || sender == rbnCPP)
               {
                   ValidatePath(sender, e);
               }
           }
   
           private void btnCopyLog\_Click(object sender, MouseEventArgs e)
           {
               string str = ">> Log from session at " + DateTime.Now.ToString() + ":\\r\\n\\r\\n";
   
               foreach (string s in txtListLog.Lines)
               {
                   str = str + s + "\\r\\n";
               }
   
               str = str + "\\r\\n-------------------------";
   
               Clipboard.SetText(str);
           }
   
           private void btnShowLog\_Click(object sender, MouseEventArgs e)
           {
               if (!showLogState)
               {
                   this.Height = expandedHeight;
                   this.Width = expandedWidth;
                   btnShowLog.Text = "Hide Log";
                   showLogState = true;
               }
               else
               {
                   this.Height = collapsedHeight;
                   this.Width = collapsedWidth;
                   btnShowLog.Text = "Show Log";
                   showLogState = false;
               }
           }
   
           private void btnUninstall\_Click(object sender, EventArgs e)
           {
               if (Directory.Exists(BPPath) && rbnBlue.Checked)
               {
                   lblStatus.Text = "Cleaning...";
                   AddToListLog("Cleaning...");
   
                   Directory.Delete(BPPath, true);
                   AddToListLog("Deleted folder '" + BPPath + "'");
               }
               else if (Directory.Exists(CPPPath) && rbnCPP.Checked)
               {
                   lblStatus.Text = "Cleaning...";
                   AddToListLog("Cleaning...");
   
                   Directory.Delete(CPPPath, true);
                   AddToListLog("Deleted folder '" + CPPPath + "'");
               }
   
               lblStatus.Text = "Done!";
               AddToListLog("Uninstall finished!");
   
               ValidatePath(sender, e);
           }
   
           private void FormClose(object sender, FormClosedEventArgs e)
           {
               if (chkSaveLog.Checked)
               {
                   List<string> lastLog = new List<string>();
                   if (File.Exists(Application.StartupPath + "\\\\iTween for UE4 installer log.txt"))
                   {
                       foreach (string s in File.ReadAllLines(Application.StartupPath + "\\\\iTween for UE4 installer log.txt"))
                       {
                           lastLog.Add(s);
                       }
                       File.Delete(Application.StartupPath + "\\\\iTween for UE4 installer log.txt");
                   }
                   lastLog.Add(">> Log from session at " + DateTime.Now.ToString() + ":");
                   lastLog.Add("");
                   foreach (string s in txtListLog.Lines)
                   {
                       lastLog.Add(s);
                   }
                   lastLog.Add("");
                   lastLog.Add("-------------------------");
                   lastLog.Add("");
                   File.WriteAllLines(Application.StartupPath + "\\\\iTween for UE4 installer log.txt", lastLog.ToArray());
               }
   
               SavePrefs();
           }
   
           void SavePrefs()
           {
               List<string> saveStrings = new List<string>();
               saveStrings.Add("radioButton&=&" + (rbnBlue.Checked ? "blue" : "cpp"));
               saveStrings.Add("debugMessages&=&" + (chkDebugMessages.Checked ? "true" : "false"));
               saveStrings.Add("errorMessages&=&" + (chkErrorMessages.Checked ? "true" : "false"));
               saveStrings.Add("lastPath&=&" + (txbPath.Text));
               saveStrings.Add("saveLog&=&" + (chkSaveLog.Checked ? "true" : "false"));
   
               if (File.Exists(Application.StartupPath + "\\\\InstallerPrefs.txt"))
               {
                   File.Delete(Application.StartupPath + "\\\\InstallerPrefs.txt");
               }
   
               File.WriteAllLines(Application.StartupPath + "\\\\InstallerPrefs.txt", saveStrings.ToArray());
           }
       }
   }  

Retrieved from "[https://wiki.unrealengine.com/index.php?title=Itween&oldid=10936](https://wiki.unrealengine.com/index.php?title=Itween&oldid=10936)"

  ![](https://tracking.unrealengine.com/track.png)