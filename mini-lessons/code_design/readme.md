# Code Design

## Learning Objectives
- Discuss Sandi Metz' Rules
- Debate SOLID Design Principles
- Compare refactoring to restructuring
- Identify Code Smells

This isn't your normal GA lesson.  You may have noticed that the Learning Objectives aren't the usual action-oriented, measurable goals. Exercises are minimal. This lesson is setting you up for continuing efforts.

In addition to learning the mechanics of coding.  It's important that we work to improve our craft.

Welcome to one of "Uncle Matt's Fireside Chats".

## Sandi Metz Rules (10 min)

Limit to:
- 100 lines per class
- 5 lines per method
- 4 params per method call (and don't even try cheating with hash params)
- 1 instance variable per controller action


Q. Class Discussion: How can these rules help us?
---

> A. There are many answers. I think there is one umbrella answer.  The human element.  These rules make it easier for humans to:
- reason about the code
- avoid mistakes
- make changes

We've found that following these rules usually lead towards a code base that is maintainable.

And that's important.  We want to create ecosystems that lead us in the right direction.  We make a crazy amount of decisions each day.  It's important to offload some of the decision making to the process.

Q. What does using "1 instance variable per controller action" encourage?
---

> A. Drives toward a Single Responsibility.  You have to name THEE purpose, THEE output of this action.


### Equally important

You should break these rules only if you have a good reason or your pair/peer lets you.

Think of this as rule zero. It is immutable.


## SOLID Principles (20 min)

I had been coding Object Oriented Programming for a few years before I read about these principles.  They were exactly what I was missing.

This was first discussed in the [first wiki... ever](http://c2.com/cgi/wiki?PrinciplesOfObjectOrientedDesign).

### [**S**ingle Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)

> A class should have only one reason to change
> -- "Uncle Bob" Martin

- Each responsibility should be a separate class, because each responsibility is an axis of change.
- A class should have one, and only one, reason to change.


Every module or class should have responsibility over a **single** part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class.

All its services should be narrowly aligned with that responsibility.

> A class has a single responsibility: it does it all, does it well, and does it only. - Bertrand Meyer

### [**O**pen/closed Principle](https://en.wikipedia.org/wiki/Open/closed_principle)

Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification

Such an entity can allow its behavior to be extended without modifying its source code.

In other words, (in an ideal world...) you should never need to change existing code or classes: All new functionality can be added by adding new subclasses or methods, or by reusing existing code through delegation.

### [**L**iskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)

Substitutability has to do with inheritence.  Essentially, it means that you can replace a parent with any child, without altering any of the desirable properties of that program.

You'll get to this when you get to more complex apps.  Moving on...

### [**I**nterface segregation principle](https://en.wikipedia.org/wiki/Interface_segregation_principle)

The dependency of one class to another one should depend on the smallest possible interface.

No client should be forced to depend on methods it does not use.

ISP splits interfaces which are very large into smaller and more specific ones so that clients will only have to know about the methods that are of interest to them.

### [**D**ependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle)

- High level modules should not depend upon low level modules. Both should depend upon abstractions.
- Abstractions should not depend upon details. Details should depend upon abstractions.


## Refactoring (20 min)


## What is it?

From Martin Fowler:

> I think the most important thing about refactoring is making very, very small changes that don’t affect the overall behavior of your system

Sound familiar?

> in practice [this] means you can run the tests (after each small change) and they will still pass.

Q. Why are we discussing testing here?
---

> A. When refactoring, the app should work exactly as it did before, just using different logic/organization under the hood.  Therefore, a battery of acceptance tests makes it **really** easy to change stuff and make sure you didn't

He goes on to say.

> And doing that a lot so that every time you run into code and it’s not quite right, you’re always in this constant state of improving it a little bit, because with refactoring, it’s all about doing it all the time. You never want to build up a whole load of work so that you have to spend a lot of time refactoring. You want to always be doing little bits of improvements so that the codebase is kept nice and healthy.

Healthy is an apt metaphor.

> You don’t want to get yourself really unfit and then after spend ages getting yourself fit again. You have to do your exercises every day if you’re going to stay healthy.

It means continually massaging the code to match the conversations we have outside of code.

## It's a a set of steps to follow

> **Verb**: Restructure software by applying a series of refactorings without changing its observable behavior.


> **Noun**: a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior.

An example of refactoring is **extract method** where you take some lines of code within an existing method and you extract them into their own method that’s called by the original place.

"You have a code fragment that can be grouped together."
"Turn the fragment into a method whose name explains the purpose of the method."

Before:
``` js
var firstAddend = ParseInt($('addend1').val());
var secondAddend = ParseInt($('addend2').val());
var sum = firstAddend + secondAddend;
```
After:
```js
function add(addend1, addend2){
  return addend1 + addend2;
}
var firstAddend = ParseInt($('addend1').val());
var secondAddend = ParseInt($('addend2').val());
var sum = add(firstAddend, secondAddend);
```

It **can** be that simple.  It feels like common sense.  But now, we have a name for it.  A better way to communicate.  We also have a list of instructions that can be followed for simple and complex refactorings.

Q. What did we just do?  What did we have to think about?  Carry over?
---

> A.  Let's read the steps: https://sourcemaking.com/refactoring/extract-method



### Why Refactor?  Why ALL the time?


> The whole point of refactoring is to go faster. - Martin Fowler

It's all about the health of the code base.

We do it as soon as the code works, because that's when you know the most, about the problem and the code that solves it.

We're running a marathon, creating a code base that lives a long time.  We pay the price for burning ourselves out by sprinting, rushing forward slapping down any code that works.


Beyond that, it is important cultivate understanding that healthy code base allows you to go fast.

## Some common refactorings

- [Extract method](https://sourcemaking.com/refactoring/extract-method)
- [Inline Method](https://sourcemaking.com/refactoring/inline-method)
- [Extract variable](https://sourcemaking.com/refactoring/extract-variable)
- [Inline (temporary) Variable](https://sourcemaking.com/refactoring/inline-temp)
- [Move Method](https://sourcemaking.com/refactoring/move-method)
- [Replace Data Value with Object] (https://sourcemaking.com/refactoring/replace-data-value-with-object)


## [Code Smells](http://c2.com/cgi/wiki/wiki?CodeSmell) (5 min)

>  A code smell is a hint that something has gone wrong somewhere in your code.

We use the "smell" to track down the problem.

Examples:
| Example | Likely Issue |
|---------|--------|
| Big class | Too many responsibilities | Lots of requires | Too many dependencies |
| Duplication | Sooo many |
| Unclear name | Unclear purpose |
| Name with "and" | Too many responsibilities |

If something smells, it definitely needs to be checked out, but it may not actually need fixing or might have to just be tolerated.

Duplication is the worst.  It is the number 1 reason for refactoring.  And it's insidious.  

There is the obvious duplication of code.  When functionality changes, the supporting code must be changed in multiple places.

Duplication of values.  The number 21 shows up multiple times.  Some represent the minimum age threshold.  Some have nothing to do with age.  Extracting the value to a variable gives it meaning.

Duplication of an idea.  Sometimes, it is much harder to suss out.  You find yourself changing multiple locations for one, seemingly small, feature change.  A good example would be authorization.  How many paces in your code would you have to change it the authorization rules for an admin change?


## Conclusion (5 min)

If you remember nothing else, remember the Single Responsibility Principle.  Strive for Continuous Refactoring, usually driven by duplication (in all its many forms).

> Refactor, not because you know the abstraction, but because you want to find it. --@sandimetz



## Resources

- Book: [Practical Object Oriented Design in Ruby, Sandi Metz](http://www.amazon.com/Practical-Object-Oriented-Design-Ruby-Addison-Wesley/dp/0321721330)
-  https://github.com/makaroni4/sandi_meter
- https://robots.thoughtbot.com/sandi-metz-rules-for-developers
- https://en.wikipedia.org/wiki/Code_refactoring
- http://c2.com/cgi/wiki?PrinciplesOfObjectOrientedDesign
- http://refactoring.com/catalog/extractMethod.html
- https://sourcemaking.com/refactoring/extract-method
- https://devchat.tv/ruby-rogues/178-rr-book-club-refactoring-ruby-with-martin-fowler
- http://c2.com/cgi/wiki/wiki?CodeSmell

## Exercises
- http://devblog.avdi.org/2010/04/08/refactoring-in-ruby/
