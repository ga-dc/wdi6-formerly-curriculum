# Intro To [Elm](http://elm-lang.org/)!

[Understanding the functional revolution in front-end applications](http://blog.reactandbethankful.com/posts/2015/09/15/understanding-the-functional-revolution/)

## What is Elm? (5 - 0/50)

> **Elm** is a [functional programming](https://en.wikipedia.org/wiki/Functional_programming) language for [declaratively](https://en.wikipedia.org/wiki/Declarative_programming) creating [web browser](https://en.wikipedia.org/wiki/Web_browser)-based [graphical user interfaces](https://en.wikipedia.org/wiki/Graphical_user_interface). Elm uses the [Functional Reactive Programming](https://en.wikipedia.org/wiki/Functional_reactive_programming) style and [purely functional](https://en.wikipedia.org/wiki/Purely_functional) graphical layout to build user interface without any destructive updates.
>
> — Wikipedia, [Elm (Programming Language)](https://en.wikipedia.org/wiki/Elm_(programming_language))

Let's break this down piece...

- __functional programming language:__ A programming paradigm rooted in lambda calculus. Functional programming languages avoid mutability and side-effects prefering _pure_ functions.
- __declarative:__ Everything is an expression to be evaluated.
- __Functional Reactive Programming:__ This is a pretty deep and hotly debated term. The functional part we addressed above. __Reactive__ refers to asyncronous dataflow within an application (we know a lot about that!)
- __Purely functional:__ Pure functions do not have side-effects. We can right pure functions in JS but are not confined to it. In Elm, we cannot have side-effects in our functions. This can feel restrictive but we get lots of really awesome guarentees from it.

Pragmatic Studio Blog:

- [What is Elm? Q&A](https://pragmaticstudio.com/blog/2015/7/23/what-is-elm-qa)
- [Is learning Elm Worth Your Time? 4 Ways to know](https://pragmaticstudio.com/blog/2015/10/22/is-learning-elm-worth-your-time)



## Why Elm? (5 - 5/50)

(from [elm-lang.org](elm-lang.org))

1. __No runtime exceptions:__ Yes, you read that right, no runtime exceptions. Elm’s compiler is amazing at finding errors before they can impact your users. The only way to get Elm code to throw a runtime exception is by explicitly invoking[`crash`](http://package.elm-lang.org/packages/elm-lang/core/latest/Debug#crash).
2. __Blazing fast rendering:__ The [elm-html](http://elm-lang.org/blog/blazing-fast-html) library outperforms even React.js in [TodoMVC benchmarks](http://evancz.github.io/todomvc-perf-comparison/), and it is super simple to optimize your code by sprinkling in some [`lazy`](http://package.elm-lang.org/packages/evancz/elm-html/latest/Html-Lazy) rendering.
3. __Libraries with guarantees:__ Semantic versioning is automatically enforced for all [community libraries](http://package.elm-lang.org/). Elm's package manager [detects any API changes](https://twitter.com/czaplic/status/601826927838650369), so breaking API changes never sneak into patches. You can upgrade with confidence.
4. __Clean syntax:__ No semicolons. No mandatory parentheses for function calls. Everything is an expression. For even more concise code there’s also destructuring assignment, pattern matching, automatic currying, and more.
5. __Smooth JavaScript Interop:__ No need to reinvent the wheel when there’s a JavaScript library that already does what you need. Thanks to Elm’s simple [ports](http://elm-lang.org/guide/interop) system, your Elm code can communicate with JavaScript without sacrificing guarantees.
6. __Time-traveling debugger:__ What if you could pause time and replay all recent user inputs? What if you could make a code change and watch the results replay without a page refresh? [Try it out](http://elm-lang.org/blog/time-travel-made-easy) and see for yourself!

## Getting Started with Elm (5 - 10/50)

### Install

#### as a module

```
$ npm install -g elm
```

#### … or with the [installer](http://elm-lang.org/install)

If you have any problem installing with node, you can use the installer which also makes everything super easy.

#### Check everything installed

Run `elm` from the command line and you should see output that looks like:

```
Elm Platform 0.16.0 - a way to run all Elm tools

Usage: elm <command> [<args>]

Available commands include:
...
```

Make sure you have version 0.16.0 — the update was about two weeks ago and some syntax we will be talking about today has changed.

### [Hello World & Fibonacci Bars](http://elm-by-example.org/chapter1helloworld.html) from elm-by-example.org (20 - 15/50)

For convenience, you can use [try elm](http://elm-lang.org/try). We will be looking at the very fundamental parts of an Elm application.

#### importing [modules](http://elm-lang.org/docs/syntax#modules)

In Elm, code is organized into modules which we can think of just like node modules. They give us namespaced libraries. To import a module use the keyword import followed by the module name: `import <module-name>` (e.g. `import List`). The module is then available in that scope and its functions and definitions are accessable namespaced under the module name `<module>.<func/def>` .

```
> "String"
"String" : String
> String.length "cat"
-- NAMING ERROR ---------------------------------------------- repl-temp-000.elm

Cannot find variable `String.length`.

3│   String.length "cat"
     ^^^^^^^^^^^^^
The qualifier `String` is not in scope.


> import String
> String.length "cat"
3 : Int
```

We can use the `exposing` keyword to make module contents accessable without the module name prefix.

```
> String.length "cat"
3 : Int
> length "doesn't know"
-- NAMING ERROR ---------------------------------------------- repl-temp-000.elm

Cannot find variable `length`

6│   length "doesn't know"
     ^^^^^^
Maybe you want one of the following?

    List.length
    String.length


> import String exposing (length)
> length "knows"
5 : Int
```

### [Elm Architecture](https://github.com/evancz/elm-architecture-tutorial/)

## Resources

- [elm-by-example](http://elm-by-example.org/)
- Elm [Core Language](http://elm-lang.org/guide/core-language)
- Elm [by Example](http://elm-lang.org/examples)
- [Elm Syntax](http://elm-lang.org/docs/syntax)
- [From JavaScript?](http://elm-lang.org/docs/from-javascript)
