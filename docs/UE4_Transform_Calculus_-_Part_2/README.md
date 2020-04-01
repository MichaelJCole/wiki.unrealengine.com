UE4 Transform Calculus - Part 2 - Epic Wiki                    

UE4 Transform Calculus - Part 2
===============================

Contents
--------

*   [1 UE4 Transform Calculus - Part 2](#UE4_Transform_Calculus_-_Part_2)
    *   [1.1 Recap](#Recap)
    *   [1.2 Implementing Transform Calculus With UE4 Types](#Implementing_Transform_Calculus_With_UE4_Types)
        *   [1.2.1 UE4 Vector Types](#UE4_Vector_Types)
        *   [1.2.2 UE4 Transform Types](#UE4_Transform_Types)
        *   [1.2.3 UE4 Type Ambiguities](#UE4_Type_Ambiguities)
        *   [1.2.4 Transformation using UE4 Types](#Transformation_using_UE4_Types)
        *   [1.2.5 Inversion using UE4 Types](#Inversion_using_UE4_Types)
        *   [1.2.6 Composition using UE4 Types](#Composition_using_UE4_Types)
    *   [1.3 Concept vs Notation](#Concept_vs_Notation)
    *   [1.4 Examples in UE4](#Examples_in_UE4)
    *   [1.5 Sidebar: FTransform in UE4](#Sidebar:_FTransform_in_UE4)
    *   [1.6 Summary](#Summary)
        *   [1.6.1 Footnotes:](#Footnotes:)

UE4 Transform Calculus - Part 2
===============================

Recap
-----

Last post I described a way of looking at a transformation as a vector function that changes from one coordinate system, or frame of reference, to another, along with a logical notation for manipulating them:

Transform Calculus Operations

Transform Calculus Operations

Transformation

TA->B(V)

Evaluating T transforms V from frame A to frame B

*   Frame A is the “input frame”
*   Frame B is the “output frame”

Inversion

TA->B\-1 ⇒ TB->A

T\-1 reverses the input and output frames, so A->B becomes B->A.

Composition (⊕)

TA->B ⊕ TB->C ⇒ TA->C

composition forms a “chain”, going from frame A to frame B to frame C.

In this post, we’ll discuss how those operations are implemented using several representations available in UE4. Additionally, we’ll discover how using a uniform notation like this can convey intent more clearly, particularly when multiple representations are involved.

Implementing Transform Calculus With UE4 Types
----------------------------------------------

To implement the transform calculus using types found in UE4, we must first understand the types available and how they can be interpreted in terms of vector space transformations. These types are found in the Math subdirectory of the Runtime/Core module. We’ll start by describing how these types can be interpreted, followed by how the transform calculus can be implemented for each of these interpretations.

### UE4 Vector Types

UE4 Type

Possible Interpretations

FVector2D

*   2D point (implicit homogeneous 1)
*   2D vector (implicit homogeneous 0)

FVector

*   3D point (implicit homogeneous 1)
*   3D vector (implicit homogeneous 0)
*   2D homogeneous point/vector

FVector4D

*   3D homogeneous point/vector

For the most part, the differences in dimensionality of an FVector are immaterial and we’ll generally ignore it\[1\]. However, when an FVector represents a non-homogeneous vector, its interpretation as a point or vector is purely contextual and thus must be conveyed explicitly. For instance, FVector(0,0,1) could be a vector representing Z-axis, or point at <0,0,1>. It’s up to the code to specify.

### UE4 Transform Types

UE4 Type

Possible Interpretations

FVector

*   3D Translation
*   3D Non-uniform scale

FVector2D

*   2D Translation
*   2D Non-uniform scale

FMatrix

*   3D affine transform

FRotator

*   3D rotation

FQuat

*   3D rotation

float\[2\]

*   2D or 3D uniform scale

### UE4 Type Ambiguities

As can be seen in the previous tables, UE4 types can be interpreted in several ways with respect to transform calculus, and those interpretations are purely contextual, meaning there is no static typing to distinguish them. The following are the primary interpretation ambiguities in UE4 types:

*   row vectors vs column vectors

*   points vs vectors

*   homogeneous vs non-homogeneous vectors

*   FVectors as mathematical vectors vs transformations (translation or scale)

Any implementation of transform calculus for UE4 must provide a way to disambiguate these interpretations.

### Transformation using UE4 Types

The following table describes how to implement evaluation of TA->B(V) using UE4 types. Where type ambiguities matter, it will be called out:

TypeOf(T)

TypeOf(V)

Implementation (TA->B(V))

FMatrix

FVector (row)

V \* M

FMatrix

FVector (col)

M \* V

FQuat

FVector

Q.RotateVector(V)

FRotator

FVector

R.RotateVector(V)

FVector (translation)

FVector (non-homogeneous vector)

V\[3\]

FVector (translation)

FVector (non-homogeneous point)

T + V

FVector or float (scale)

FVector

S \* V\[4\]

### Inversion using UE4 Types

The following table describes how to implement the inverse, TA->B\-1, using UE4 types. Where type ambiguities matter, it will be called out:

TypeOf(T)

Implementation (TA->B\-1)

FMatrix

M.Inverse()

FQuat

M.Inverse()

FRotator

EulerAngles = R.Euler();

FRotator::MakeFromEuler(FVector(-EulerAngles.Z, -EulerAngles.Y, -EulerAngles.X));

FVector (translation)

\-T

FVector (scale)

FVector(1 / S.x, 1 / S.y, 1 / S.z)

float (scale)

1 / S

  

### Composition using UE4 Types

The following table describes how to implement composition, TA->B ⊕ TB->C, using UE4 types. Where type ambiguities matter, it will be called out:

TypeOf(T)

Implementation (TA->B ⊕ TB->C)

FMatrix

M1 \* M2

FQuat

Q2 \* Q1 \[5\]

FRotator

FRotator(FMatrix(M1) \* FMatrix(M2))

FVector (translation)

T1 + T2

FVector or float (scale)

S1 \* S2

Concept vs Notation
-------------------

At that point it should be clear why I am introducing a separate notation for transformation calculus -- depending on the type, the math required to express a particular transformational concept may differ (or not exist) in UE4. So we need a new way to uniformly express those concepts in UE4, and we’ll need to adapt the existing UE4 types to support it.

Most of the type ambiguities in UE4 mentioned earlier are about the type’s conceptual use rather than ambiguities in the math\[6\]. This is because the UE4 FVector and FMatrix classes are math classes, and those mathematical notations are well-defined regardless of the object’s conceptual purpose. As a case in point, the FVector interface mixes different interpretations of itself throughout the API, which can lead to confusion and mistakes. Here are a few examples:

FVector Interpretation Ambiguities

FVector Method

FVector Interpretation

FVector::Normalize()

non-homogeneous vector

FVector::Dist()

non-homogeneous point

FVector::Projection()

2D homogeneous vector

FVector::PointPlaneDist()

non-homogeneous point AND vector

In cases like these, understanding the intent of a type is critical to readability. For instance, if V1 and V2 are FVectors, what does this expression do?

V1 + V2

Mathematically, it means vector addition. Conceptually it’s ambiguous. It could be compositing two translations, transforming a vector by a translation, or simply adding two grouped scalars! Commutativity of addition makes this even more ambiguous. But by providing a distinct notation for transform calculus that wraps the math, we can clarify the conceptual use:

V1A->B(V2) ⇒ transformation evaluation

V1 ⊕ V2 ⇒ transformation composition

V1 + V2 ⇒ mathematical addition

Examples in UE4
---------------

In isolation, these conceptual vs notational nuances may seem like hair-splitting, but in the context of a math-heavy bit of code, this becomes critically important to comprehension. By supplying a notation specifically for the use of transforming vectors between affine spaces, we can eliminate most or all of this conceptual ambiguity.

For instance, the following was taken from real Slate code that existed in UE4 (see SFxWidget). What is it doing?

const FVector2D CenteringAdjustment \= Geometry.AbsoluteScale\*ScaleOrigin \- RenderScale\*ScaleOrigin\*Geometry.AbsoluteScale;
const FVector2D OffsetAdjustment \= Offset\*Geometry.AbsoluteScale;
const FVector2D NewPos \= Geometry.AbsolutePosition + CenteringAdjustment + OffsetAdjustment;
const float NewScale \= Geometry.AbsoluteScale \* RenderScale;
FGeometry ChildGeometry(NewPos, Geometry.Size, NewScale);

Even if you have a good understanding of Slate’s FGeometry class, you would probably have to work pretty hard to decipher, much less debug this. For simplicity, think of FGeometry as a transform from a Slate widget’s local frame of reference to the desktop frame of reference, TLocal->Desktop, along with an additional SizeLocal that determines the size of the widget. With transform calculus we can then express the code like:

FGeometry ChildGeometry \= ScaleOrigin^\-1 ⊕ RenderScale ⊕ ScaleOrigin ⊕ Offset ⊕ Geometry;

If you understand transform calculus, that’s much easier. Although perhaps an even better expression of intent would be:

FGeometry ChildGeometry \= ScaleAboutPoint(RenderScale, ScaleOrigin) ⊕ Offset ⊕ Geometry

We wrapped the higher notion of “scaling about a point” in another function. Code composition like this is generally discussed in terms of reducing duplication, but it also enhances readability!

And that was relatively simple code. Here’s another UE4 Slate example (see STutorialContent):

FPaintGeometry ShadowGeometry(
	(WidgetGeometry.AbsolutePosition \- FVector2D(ShadowBrush\-\>Margin.Left, ShadowBrush\-\>Margin.Top) \* ShadowBrush\-\>ImageSize \* WidgetGeometry.AbsoluteScale \* TutorialConstants::ShadowScale) \- WindowPos,
	((WidgetGeometry.Size \* WidgetGeometry.AbsoluteScale) + (FVector2D(ShadowBrush\-\>Margin.Right \* 2.0f, ShadowBrush\-\>Margin.Bottom \* 2.0f) \* ShadowBrush\-\>ImageSize \*WidgetGeometry.AbsoluteScale \* ::TutorialConstants::ShadowScale)),
	WidgetGeometry.AbsoluteScale \* TutorialConstants::ShadowScale);

Again, if you are unfamiliar with FGeometry, you’ll have to take my word for it, but this code is intermingling some basic algebra with transformational logic. It is building a transform to apply a scale about the widget center, and using some simple algebra to determine the scale amount. As written it’s really hard to separate them! Also, the innocuous subtraction of the WindowPos in the middle of all that is technically an ADDITIONAL transformation to get from desktop to window space. That’s an important distinction that easily gets lost in all the raw math! Let’s break this code out into the pure algebra needed along with the actual transformations that are taking place:

// This is the algebra
auto Center \= WidgetGeometry.GetRect().GetCenter();
auto Scale \= 1 + ShadowBrush\-\>Margin.GetDesiredSize() 
               \* ShadowBrush\-\>ImageSize 
               \* TutorialConstants::ShadowScale 
               / WidgetGeometry.Size;
// This is the transformation calculus
FPaintGeometry \= ScaleAboutPoint(Center, Scale) ⊕ WidgetGeometry ⊕ WindowToDesktop^\-1;

While there’s still room for improvement (the scale computation is difficult to figure out), the intent (and order of operations) of the code is much more clear. Also, if the transform from window to desktop space becomes more complex in the future (say it adds a scale), we can handle it without really changing the code.

Sidebar: FTransform in UE4
--------------------------

UE4’s FTransform exists to efficiently represent a combination scale ⊕ rotate ⊕ translate by storing each separately. So can FTransform be adapted to work with our transform calculus? Unfortunately, no. Its support for non-uniform scale would impart a shear when inverted or composited, but much of FTransform’s efficiency is due to its representation not supporting shear. Luckily, FTransform is not used in situations where this would be a problem\[7\], but is unsuitable with transform calculus without significant impact on its efficiency\[8\].

Summary
-------

We’ve discussed how to implement our transform calculus using types found in UE4 and used this to motivate the need for a notation specific to transformations that abstracts the conceptual use from the underlying math, since the math often depends on the transformation representation being used (ie, matrix or quaternion). Finally, we used real-world examples from UE4 to illustrate how this distinct notation can improve code readability by distinguishing the transformation portion from other unrelated math.

Next time I’ll present the actual Transform Calculus implementation in UE4, how to use it, how it adapts existing UE4 types, and how to implement your own custom transformation types. I’ll also discuss how the C++ framework supports efficient composition of mixed transform representations when possible. That discussion will be much more focused on C++ implementation details.

Of course, if you just can’t wait until then, go check out the implementation (TransformCalculus\*.h in Runtime/Core/Math and SlateLayoutTransform.h in Runtime/SlateCore/Rendering). I’d love to hear your feedback!

[< Back to Part 1](/UE4_Transform_Calculus_-_Part_1 "UE4 Transform Calculus - Part 1")

* * *

#### Footnotes:

1You can always subtract elements to project to the dimensionality you want.

2This is really a shorthand for a FVector where all elements are the same. However, since uniform scale is a very common concept in game engines, it’s often represented as a single float for efficiency.

3This is because a vector has no origin so cannot be translated. Think about the homogeneous math to prove it to yourself.

4I am able to lump FVector and float because the implementation of FVector-FVector multiply operator in UE4 is compatible (component-wise multiply). There is no notion of a component-wise vector-vector multiply in mathematics.

5Note this is backwards compared to the matrix multiply operator!

6row vs column vectors are the primary exception

7see FTransform’s version of composition, FTransform::Multiply.

8[This paper](http://www.m-hikari.com/ija/ija-password-2008/ija-password17-20-2008/aristidouIJA17-20-2008.pdf) gives one way to represent such a decomposition, along with a very detailed proof of correctness. To do it, however, it resorts to a full matrix to support the non-uniform scale and potential shear, defeating most of such a decomposition’s efficiency goals. It's essentially using transformation concepts to compute a [QR decomposition](http://en.wikipedia.org/wiki/QR_decomposition) (or RQ) of the upper-3x3 matrix, while representing Q is a unit quaternion.

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UE4\_Transform\_Calculus\_-\_Part\_2&oldid=14457](https://wiki.unrealengine.com/index.php?title=UE4_Transform_Calculus_-_Part_2&oldid=14457)"

[Category](/Special:Categories "Special:Categories"):

*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)