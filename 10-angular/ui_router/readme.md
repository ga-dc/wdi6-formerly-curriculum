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

We're going to create our own Angular module. It's not going to do anything for a bit. For the next part of this class, we're only going to focus on setting up modules.

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
angular.module("grumblr", ["ui.router"]);
```

We put something called "ui.router" in that array. You may recognize it as another one of the modules we have. Checking `grumblr.requires` again, it's now an array with one thing inside it -- `ui.router`!

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

## ng-app

At this point Angular is "aware" of this module but isn't actually using it anywhere.

To prove it, try changing the `ui.router` to some random word, like `zoboomafoo`. That's a module we clearly don't have, so you'd expect Angular to throw an error. It doesn't. That's because it's only "aware" of the module but hasn't actually turned it on.

To "require" the module, change the `html` tag in your `index.html` to look like this:

```html
<html data-ng-app="grumblr">
```

If you refresh the page you should see a whole lot of nothing.

This is Angular's version of `$document(ready)`. You don't "start" an Angular app; you just add this `data-ng-app` directive and it loads your module as soon as it's able to do so.

Change `ui.router` to `zoboomafoo` now and you'll get an error. `ui.router` should be just fine. This shows Angular's trying to run this module.

Q. `data-ng-app` is a directive. What's a directive?
---
> A custom HTML element or attribute that's defined by Angular.

Q. `data-ng-app` and `ng-app` do the exact same thing. Why add `data-`?
---
> It makes the HTML validate. You may see us forget to use `data-` occasionally in this class. It doesn't change the functionality at all; it literally just makes the HTML validate.

You can only have **one** `data-ng-app` per page in Angular. Since that's the case, usually people put it in the `<html>` element. Add more `ng-app`s and it may not yell at you, but it'll defintely cause things to break.

## Module style conventions

We're still not going to make this module do anything yet. First, we're going to talk about the proper way to write a module. You'll just have to be content that the module isn't throwing errors.

Angular is complex, and as such there's a big movement to standardize how people write it. The go-to style guide is this:

https://github.com/johnpapa/angular-styleguide

> John Papa has, I believe, no relation to Papa John's.

The fact that this thing has 14,000 stars on Github should give you an idea of how well-respected and widely-used it is.

As with all style conventions, the ones detailed in here won't impact the performance or functionality of your app at all. The purpose is just to make things easier to read and more standard for developers.

## IIFEs

The "correct" way to write a module is to wrap the whole thing in an IIFE, or an **immediately-invoked function expression**.

Q. Turn and talk: What the heck is an IIFE? What's the point?
---
> It's a function that is called as soon as it's defined. The point is that any variables declared inside it won't exist *outside* it. This is useful when you have some procedural code you need to run and don't want a bunch of global variables and functions bogging down the browser.

To use this convention, rewrite your `app.js` to look like the following:

```js
(function (){
  angular
  .module("grumblr", [
    "ui.router"
  ]);
}());
```

We'll be writing everything in Angular like this from now on. Notice things have been spaced out onto separate lines, too.

Q. Why is `ui.router` off on its own line?
---
> Presumably we're going to add more dependencies later on. This way, they're visually in a nice list instead of a big long line.

## Strictness

Now for something weird: make the very first line of this file `"use strict";`. You may have seen this when Googling stuff. It looks like we're just writing a weird little random string here. What purpose can it possibly have?

To find out, add this garden-variety `for` loop to the bottom of your `app.js`:

```js
var array = ["a", "b", "c"];
for(i = 0; i < array.length; i++){
  console.log(array[i]);
}
```

### You do: Figure out what `use strict` does.

Take 3 minutes to compare what happens now to what happens when you delete the `use strict` line. Google it for more information.

### Basically...

`"use strict"` forces you to write better Javascript. The big thing here is that it forces you to not use a variable without first declaring it. [There are many other uses as well.](http://www.w3schools.com/js/js_strict.asp)

### Why declaring variables is important

To demonstrate why this is important, remove the `"use strict";` line. For instructional purposes only, I'm going to rename the `i` variable to something more visually interesting -- `potatoSack`, in this case:

```
var array = ["a", "b", "c"];
for(potatoSack = 0; potatoSack < array.length; potatoSack++){
  console.log(array[potatoSack]);
}
```

Now I'm going to `console.log(window)` in the Chrome console. Scrolling down, I see `potatoSack` is attached to `window`!

![Potatosack attached to window](http://i.imgur.com/e7IgnAY.png)

When you don't use `var` Javascript attaches the variable to the top-most object it can find. On a webpage, this is always going to be `window`. Do that a lot and it will drastically reduce the performance of your app. `use strict` prevents you from making this mistake.

With all our ducks in a row, we're now ready to make this module actually do something.

# Making this module actually do something

