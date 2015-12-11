# Angular and $uiRouter

## Learning Objectives

- Explain what dependency injection is and what problem it solves
- Explain the purpose of templates in Angular
- Create separate views and routes for each CRUD action
- Use the ng-view directive to load angular templates
- Use $stateProvider and $state to access query parameters and update the URL
- Define multiple controllers in a single module

# Building an actual Angular app

...is going to be what we start doing today. So far, we've pretty much just played around with some of Angular's different built-in components. Now we're going to start writing our own components.

# Getting set up

Please go to this link and download the ZIP file:

https://github.com/ga-dc/grumblr_angular/releases/tag/1.0.0

Then, if your computer didn't automatically "unzip" the ZIP file, double-click it. This should create a folder called `grumblr_angular-1.0.0`. Move it into your `wdi/in-class` folder.

This has the same end result as `git clone` except there's no `.git` folder in there. The reason we're asking you to use this ZIP file is because it gives you a nice little folder with its own version number: the subsequent folders you download will have their own numbers as well, so you won't have a zillion duplicate folders.

Note, though, that since there's no `.git` folder that means you can't make commits and branch and track changes. If you want to be able to do that, take a moment right now to `git init` and make an initial commit.

## Open the file in Atom and your browser

It's all terribly exciting: the word `Grumblr`, and that's pretty much it.

Grumblr is like Tumblr, only grumblier. It's a two-model CRUD app with posts and comments. Down the road it'll have users too.

In the coming classes you're going to be interacting with data from an API that we provide. For this class, though, we'll just be hardcoding data and getting some views up and running.

## Under the hood

Open up your Chrome console and enter `console.log(angular)`. Click on the output to expand it.

This is the `angular` object. It contains absolutely everything that has to do with Angular. You can see it has some weird things attached to it, like `getTestability` and `$$csp`, but it also has a whole bunch of pretty easy-to-read things: `angular.isDate`, `angular.forEach`, `angular.toJson`, and so on.

Q. What are all these things attached to the `angular` object? Why are they here?
---
> They're convenience methods -- things that don't come built-in with Javascript, but are handy to have around.

**Those of you using Chrome** click on `module`, then `<function scope>`. This is a Chrome-only thing that shows all of the variables available in the scope of this object. Click on `Closure`, then `b: Object`.

> Those of you not using Chrome can just observe me doing this. What we're doing here doesn't have any practical application; we're just exploring.

After a lot of hunting, you can see something interesting: These are all the **modules** available to us from the Angular libraries included in this file.

![Inside module](http://i.imgur.com/1eLxSDz.png)

## Modules

Modules -- not to be confused with *models* -- are the building block of Angular. Every Angular app is a collection of modules interacting with each other. They're kind of like Javascript objects, and kind of like gems, and kind of like models, and kind of like jQuery plug-ins.

If you click on any one of those modules, and then click on `requires`, you can see that each one requires another module. This is evidence of how they all work off of each other.

**I'm going to remove two Angular libraries** out of the three included on this page, just by deleting their `<script>` tags. Now I only have two modules: `ng` and `ngLocale`. These are the only two that come out-of-the-box with Angular.

![Two default modules](http://i.imgur.com/dRgcpXi.png)

## Here there be dragons

Now, only those of you in Chrome again, open the last `Closure` inside `<function scope>`. You should get something terrifying-looking: a bunch of important-looking methods that are all named completely unhelpful things like `a`, `b`, `c`, and so on.

![Letter-named methods](http://i.imgur.com/yIxpbnA.png)

Q. What is this stuff? (Hint: We're loading Angular from a file called `angular.min.js`.
---
> This is minified code. When you minify Javascript, in order to save memory functions and variables are renamed to just letters of the alphabet. 

If I remove the `.min` from the `<script>` tag in my HTML, all of these indecipherable function names are replaced with English-y function names like `$AnchorScrollProvider`, `MOZ_HACK_REGEXP`, `PRISTINE_CLASS`, and so on.

> They're in a different order because they're listed alphabetically.

![English-named methods](http://i.imgur.com/g9DtO4A.png)

These are all functions and constants used internally by Angular. The effects of minifaction will be brought up again later on in this class.

# Our first module

Notice there's an `app.js` linked in this `index.html`. Open it and add this line:

```js
angular.module("grumblr", []);
```

**It's very important that you include that empty array.**

If I go poking around with `angular.module` in the console again, I can see that `grumblr` has been added to Angular's available modules:

![Grumblr in the modules](http://i.imgur.com/s61Z6VP.png)

The `requires` part of `grumblr` is currently an empty array.

Now, modify `app.js` to look like this:

```js
angular.module("grumblr", ["$uiRouter"]);
```

We put something called "$uiRouter" in that array. Checking `grumblr.requires` again, it's now an array with one thing inside it -- `$uiRouter`!

Q. Based on your experiences with the word `require` so far, what does this array in `angular.module` do?
---
> It says which dependencies should be included in this module.

## Dependency Injection

The process of requiring dependencies in Angular is called **dependency injection**. It's an extremely important part of Angular since this framework is all about modules being dependent on other modules.

#### Try removing that array altogether. What happens?

We get an error. In order to create a module you have to specify the number of dependencies it has, even if that number is zero.

## Angular Errors

```
Uncaught Error: [$injector:nomod] http://errors.angularjs.org/1.3.15/$injector/nomod?p0=grumblr
```

This is a not-very-helpful error message. **Angular doesn't have built-in error messages.** Instead, to figure out what's going on, you need to click the link to the right of the `Uncaught Error` bit.

This will take you to one of the error pages on `angularjs.org`. In this case, it tells us:

```text
Error: $injector:nomod
Module Unavailable
Module 'grumblr' is not available! You either misspelled the module name
or forgot to load it. If registering a module ensure that you specify the
dependencies as the second argument.
```

All Angular errors are like this. Full disclosure: having to click to another page to see the error messages is going to get annoying.

Q. Open question: Why might the Angular developers have chosen to redirect you to these pages instead of giving you normal error messages?
---
> My guesses:

> Firstly, it's much easier to edit and update the error messages. Instead of having to release a new version of Angular to edit the message, they can just go edit the webpage.

> Secondly, it lets them explain the error in greater depth. Angular is a little complicated, and it might take a lot of text to explain what's going on. So rather than write huge error messages, they redirect you to a webpage with full descriptions and examples.

- Todo
  - IIFEs
  - Use strict
