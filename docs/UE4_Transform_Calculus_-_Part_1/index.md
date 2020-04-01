UE4 Transform Calculus - Part 1 - Epic Wiki                    

UE4 Transform Calculus - Part 1
===============================

Contents
--------

*   [1 UE4 Transform Calculus - Part 1](#UE4_Transform_Calculus_-_Part_1)
    *   [1.1 Motivation](#Motivation)
    *   [1.2 Target Audience](#Target_Audience)
    *   [1.3 Why “Calculus?”](#Why_.E2.80.9CCalculus.3F.E2.80.9D)
    *   [1.4 Rigid Body Hierarchies](#Rigid_Body_Hierarchies)
        *   [1.4.1 Hierarchies as Attachments](#Hierarchies_as_Attachments)
        *   [1.4.2 Hierarchies as Frames of Reference](#Hierarchies_as_Frames_of_Reference)
    *   [1.5 Transform Calculus](#Transform_Calculus)
    *   [1.6 Transforming Vectors and Points](#Transforming_Vectors_and_Points)
    *   [1.7 Summary](#Summary)
        *   [1.7.1 Footnotes](#Footnotes)

UE4 Transform Calculus - Part 1
===============================

Motivation
----------

Slate often has to deal with deep and wide hierarchies of widgets, expressing the sizes and positions of children in terms of their parents. Sometimes these are simple relationships like text in a button, but sometimes those relationships are much more complex, like a graph editing panel that might be panning and zooming across a virtual canvas.

As hierarchies get deeper, this relationship becomes layered. For instance, if we apply a global DPI (dots per inch) scale to our application, which itself sits in a window at some arbitrary location on the desktop, there are a series of zooms and offsets that combine to form the final position of a widget on the screen.

[![Calc1img1.png](https://d26ilriwvtzlb.cloudfront.net/3/33/Calc1img1.png)](/File:Calc1img1.png)

_\[The complex relationship of slate widgets. A UE4 Editor view displaying blueprint widgets within a virtual panel within a tabwell within a window, all having a global application scale applied. The Blueprint editor must reason about the widgets in **virtual canvas space**, implement mouse events in **desktop space**, and render the widgets in **window space**.\]_

Slate must not only be able to unwind these hierarchies internally, but also provide straightforward ways for widget authors to reason about widgets in multiple spaces (ie, local, virtual canvas, window, desktop). With the addition of [Render Transforms](https://docs.unrealengine.com/latest/INT/Engine/UMG/UserGuide/Styling/index.html) to Slate, the math for computing a child’s relationship to its parent became much more involved than a simple scale and offset.

[![Calc1img2.png](https://d26ilriwvtzlb.cloudfront.net/2/2c/Calc1img2.png)](/File:Calc1img2.png)

_\[SlateViewer can apply an arbitrary render transform to the entire application. Now what’s the relationship of one of these widgets to its parent, or the window, or the desktop?\]_

In fact, the historical simplicity of a child widget’s transform with respect to its parent in Slate contributed to an overall daunting task of updating hundreds of widgets to support arbitrary render transforms. We chose to focus on the core widgets that most widgets are composed of, but lots of legacy functions still exist in Slate that are used by other widgets that don’t support render transforms. This series of posts will focus on a new notation for manipulating transforms, along with a C++ implementation in UE4 that Slate is using to assist with this sometimes mind-bending task.

Target Audience
---------------

For this discussion, I assume you are already aware of basic [linear algebra](http://en.wikipedia.org/wiki/Linear_algebra) and have at least cursory experience working with rigid body hierarchies in code. You should be comfortable with vectors and matrices, be able to perform basic calculations with them, and be familiar with the idea of using them to represent transformations like translation, rotation, scale, shear, etc. Some familiarity with alternate representations like quaternions etc may also be useful when we start discussing the code implementation. If you’ve ever tried to use a physics engine or render something in OpenGL or Direct3D, you likely have more than enough exposure to these concepts.

I will generally try to keep a conversational tone, but will occasionally stray into math-heavy territory. When I do, I’ll try to summarize the salient points and provide links to read up more if you’d like. The reason for “getting mathy” sometimes is to establish the mathematical foundation for the notation we are developing, not to rigorously prove it. I’m a programmer, not a mathematician.

Why “Calculus?”
---------------

So, a word about why I chose the term “Transform Calculus” instead of something less presumptive (like Framework or API). This document in fact describes a [logical calculus](http://www.encyclopediaofmath.org/index.php/Logical_calculus), or a formalization of a logical theory\[1\]. These are concepts that provide a mathematical notation for uniformly expressing and manipulating transforms that transcends the representation (ie, a matrix or quaternion).

There happens to be an implementation in UE4, but that implementation is secondary to the underlying concepts. Also, the implementation sometimes has to make compromises to work within the C++ language and UE4 Core types, so is not a pure expression of these concepts.

To be clear, I'm not inventing anything "novel", I’m just wrapped some well-known math concepts in a higher level abstraction. That said, I do feel all the focus on notation is a critical part of the journey, as one can't use the library effectively without understanding the notation. For that reason, simply referring to this as a Framework or API seemed insufficient.

One could perhaps more accurately refer to this an an [algebra](http://en.wikipedia.org/wiki/Algebra_over_a_field), as it’s closed over the affine vector space. But I don’t prove this, and frankly I’ve been using the term calculus for years, so it seemed too late to turn back now. C’est la vie. :)

Rigid Body Hierarchies
----------------------

Slate UI hierarchies are conceptually identical to rigid body hierarchies that physics engines utilize. We’ll start with a quick overview of rigid body hierarchies to establish the concepts. I expect anyone reading this to be familiar already, so I won’t dwell on details.

[![Calc1img3.png](https://d26ilriwvtzlb.cloudfront.net/8/86/Calc1img3.png)](/File:Calc1img3.png)

### Hierarchies as Attachments

One way to think about the hierarchy is as each part being “attached” to its parent by a transformation. This transformation places a child part relative to its parent. To place a part in the world we start at the root of the tree (“world space”) and successively transform the part all the way down to the leaf node where the part is located.

[![Calc1imgIV.png](https://d26ilriwvtzlb.cloudfront.net/7/70/Calc1imgIV.png)](/File:Calc1imgIV.png)

If one thinks of these transformations as simple offsets, then it is easy to conceptualize. However, most rigid body systems allow more complex transformations like scale, rotate, and/or shear. Reasoning about parts’ relations to each other in such a hierarchy can quickly become very complicated.

### Hierarchies as Frames of Reference

Another way to look at the hierarchy is that each part is a camera, and the transformation is taking the part from it’s local the coordinate system into that of the parent. So each part is essentially in it’s own coordinate system, or [“frame of reference”](http://en.wikipedia.org/wiki/Frame_of_reference) relative to its parent. The representation is logically equivalent to the attachment point of view described above, but instead of viewing all parts as placed at different points in the same coordinate system, each part has its own local coordinate system. This makes it easier to conceptualize the parent-child relationship as more than a simple offset. To place a child in the world, we chain, or composite, these transformations in succession just as we did when thinking of them as attachments.

[![Calc1img5.png](https://d26ilriwvtzlb.cloudfront.net/9/97/Calc1img5.png)](/File:Calc1img5.png)

Transform Calculus
------------------

This notion of a hierarchy as a chain of transformations taking us from one frame of reference to another is very powerful. In linear algebra, a frame of reference is like a vector [basis](http://en.wikipedia.org/wiki/Basis_%28linear_algebra%29)\[2\], and the transformation to another frame of reference is a [change of basis](http://en.wikipedia.org/wiki/Change_of_basis). In code, we often represent this transformation as a matrix and composite them using matrix multiplication\[3\]. For efficiency, we sometimes represent a transform using narrower representations like euler angles, quaternions, translations, or even scalars. Regardless of the representation we use, a transformation is essentially a function over a vector space that maps one frame of reference to another. We can represent this function along with operations to manipulate it using a common notation, or calculus:

Transform Calculus Operations

Transformation

TA->B(V)

Evaluating T transforms V from frame A to frame B

*   Frame A is the “input frame”
*   Frame B is the “output frame”

[Inversion](http://en.wikipedia.org/wiki/Inverse_function)

TA->B\-1 ⇒ TB->A

T\-1 reverses the input and output frames, so A->B becomes B->A.

[Composition](http://en.wikipedia.org/wiki/Composition_of_relations) (⊕)

TA->B⊕TB->C ⇒ TA->C

composition forms a “chain”, going from frame A to frame B to frame C.

Note that composition (⊕) is a [transitive relation](http://en.wikipedia.org/wiki/Transitive_relation) -- the output frame of the first must match the input frame of the second, otherwise the composition is invalid:  

Composition is Transitive

TA->B⊕TB->C

Valid (output Frame B matches input Frame B)

TA->B⊕TC->B

Invalid (output Frame B mismatches input Frame C)

TA->B⊕TC->B\-1 ⇒ TA->B⊕TB->C

Valid (inversion swaps the input and output Frame)

I’m using the mysterious symbol for composition because it is a conceptual operation, and the calculation is not important right now. For instance, something like the multiply or addition operator might seem attractive to use instead, but could be misleading. For instance, two matrices are indeed composited using multiplication, but two translation vectors are composited using addition. However, they are both conceptually a composition of two transformations. I want to convey the concept of composition without focusing on the specific math required to achieve it, which is more tied to the representation used for the transform. I’ll discuss this more in the next post.

Let’s go back to our rigid body tank example and express some transformations using this new calculus:  

Tgun\->world = Tgun\->turret⊕Tturret\->chassis⊕Tchassis\->world

Tgun\->wheel1 = Tgun\->turret⊕Tturret\->chassis⊕Twheel1\->chassis\-1

  
This is makes logical sense: to determine the transformation from the gun’s frame of reference to the world’s, chain the gun-to-turret transform to the turret-to-chassis transform to the chassis-to-world transform. Each step moves UP the hierarchy to the root. Note in the second example how we use the inverse to go back DOWN the hierarchy to get to the lower wheel1 node, preserving the transitive chain of operations.

Transforming Vectors and Points
-------------------------------

As discussed, a transformation is a mapping function over the vector space. But we use points to describe geometry. So what’s the difference between a vector and a point? Well, a point is a distinct location in space, while a vector is a displacement between two points (like a vertex normal). Luckily, both points AND vectors can be represented using [homogeneous coordinates](http://en.wikipedia.org/wiki/Homogeneous_coordinates), the former with a homogeneous coordinate of 1, and the latter with a 0\[4\]. By thinking of our transforms as operating on [affine spaces](http://en.wikipedia.org/wiki/Affine_space) using homogeneous coordinates, we can transform points and vectors the same way:  

TA->B(P) ⇒ Transformation of homogeneous point P from frame A to frame B

TA->B(V) ⇒ Transformation of homogeneous vector V from frame A to frame B

Summary
-------

We have outlined a formal notation, or calculus, for expressing a rigid body hierarchy as a tree of coordinate transformations taking us from the frame of reference of a child node to its parent. We can composite and invert these transformations using a logical notation that allows us to reason about any node from the perspective of any other node, regardless of how that transform is represented. Finally, we can apply these transformations to a set of vectors or points to reason about specific geometry associated with those nodes. This is something Slate has to do all the time.

In the next post I’ll discuss how these operations are actually implemented using several transformation representations available in UE4 and demonstrate how the calculus allows us to simplify real-world code by expressing the concept rather than focusing on the math itself.

[Continue to Part 2 >](/UE4_Transform_Calculus_-_Part_2 "UE4 Transform Calculus - Part 2")

  

* * *

#### Footnotes

1I’m applying symbols for particular operations/semantics, so I guess it’s technically a [logico-mathematical calculus](http://www.encyclopediaofmath.org/index.php/Logical_calculus), but who really cares?

2 Technically, it’s an [affine space](http://en.wikipedia.org/wiki/Affine_space) as we also need an offset to place the basis at a point in space, but the mathematical properties we are concerned with are equivalent, as affine spaces are in fact [vector subspaces](http://en.wikipedia.org/wiki/Linear_subspace). However, studying vector bases leads us more directly to the properties we want to consider.

3This is known as composition of [linear transformations](http://en.wikipedia.org/wiki/Linear_map), which form what is called an [associative algebra](http://en.wikipedia.org/wiki/Associative_algebra). This algebra gives us many useful properties like [associativity](http://en.wikipedia.org/wiki/Associative_property) and [distributivity](http://en.wikipedia.org/wiki/Distributive_property).

4This [StackExchange link](http://math.stackexchange.com/questions/89621/how-to-multiply-vector-3-with-4by4-matrix-more-precisely-position-transformat) gives a good technical explanation without getting too mathy..

Retrieved from "[https://wiki.unrealengine.com/index.php?title=UE4\_Transform\_Calculus\_-\_Part\_1&oldid=14360](https://wiki.unrealengine.com/index.php?title=UE4_Transform_Calculus_-_Part_1&oldid=14360)"

[Category](/Special:Categories "Special:Categories"):

*   [Epic Created Content](/Category:Epic_Created_Content "Category:Epic Created Content")

  ![](https://tracking.unrealengine.com/track.png)