Procedural programming
Is straightforward and goes step by step

## OOP

object oriented programming aims to structure code base in a way that is reusable and modular.

These are the core OOP concepts:

## Encapsulation

Objects consist of properties and methods

Properties describe objects characteristics, while methods are used to perform object specific actions.

Reduces complexity, structures code, reasubale

## Abstraction

Hides the implementation details and let's the user focus on the functionality it provides.

With abstraction we hide implementation details, which reduces complexity and the impact of change.


## Inheritance

A mechanism to reduce redundant code by specifying a base object structure from which to inherit properties and methods

Then every time we want to create an object that would like to use some of the features other objects use, we would not have to define those abilities again, hence reducing code repetition.

By the curtesy of [this video](https://www.youtube.com/watch?v=hxGOiiR9ZKg), when using inheritance, composition should be considered as a replacement.

### Composition

*Inheritance* and *composition* try to solve the problem of - **code reusability**.

*Inheriting* classes means - making copies of the old class. Then we can extend the new class and or override existing functionalities from the base (parent) class.

Let's say we had a class that handles images and it had abstract functions for saving and loading. 

File types (PNG, JPG, etc.) may have different ways of loading and saving, so with inheritance we could create subclasses for each and the subclasses would implement their unique save and load methods.

But now we get an object structure example so unique, it breaks inheritance. An image that does not come from a file, instead has methods that allows user to draw on the image. We still have to implement the save and load methods for the new class, even when it has no need for them.

One way we can solve this is by creating a new subclass for file images and moving the load and save methods to them. But that breaks the places where the image class is expected to have load and save methods. So now we would have to edit all of the classes to implement the new subclass and fix places where image object would be used to save/load. This is an expensive **refactor**.

***Change** is the enemy of perfect design*

With *inheritance* we bundle commonality, which breaks when we find exceptions for it.

*Composition* aims to solve that. If some new-to-be classes want to use a piece of code 

Let's convert our previous example to be composed.

We remove abstract methods load/save from base class image. It represents an image in-memory. Our file specific classes no longer have a need to inherit from image. They implement their own load/save as class methods, but we need in-memory image to perform load/save operations. Previously it had no problem with that as the class inherited the in-memory Image class, but now it's separated. File specific image classes now would need to require an Image class object for the load/save methods as a parameter.

Now the image draw class, does not need to inherit from an image, it just receives an in-memory image it modifies. Now we can create an image with Image class by loading with PNG class, then draw on that image object with ImageDraw class and then save to JPG with JPGImage class. 

This type of implementation does demand for refactors, code classes are modular and can be used to adapt new functionality without changing previous solutions.

Composition can be extended into *dependency injection*. Dependency injection means passing interfaces as arguments. 

So let's say we have an ImageApp class, which creates an image object based on the loaded file name (which let's us infer what type of image file we are dealing with). With interfaces (some other languages use different verbatim) we can abstract file type determination code by passing the interface, that image file classes would be extended with. 

The difference between inheritance that is used so define critical parts of some functionality, while classes are used more of a baseline and try to capture as much of the commonality as possible. 

So with ImageApp class example, the user can just pass the interface to load an image. So logically the class now does not handle file type logic, but only creation of images through file type interfaces and image class objects  

Cons for *composition* are:

- boilerplate
- wrapper for exposing internal types

Pros:

- Reduces coupling 
- Adaptable as new requirements come in


## Polymorphism 

Poly(Many)morph(forms)ism let's us make changes to the base object structure when creating new structures from base, so that it uniquely behaves on same methods. 

This let's us reduce type checking