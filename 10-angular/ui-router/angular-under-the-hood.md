# Angular under the hood

Open up your Chrome console and enter `console.log(angular)`. Click on the output to expand it.

![Console log angular](http://i.imgur.com/0z37sD2.png)

This is the `angular` object. It contains absolutely everything that has to do with Angular. You can see it has some weird things attached to it, like `getTestability` and `$$csp`, but it also has a whole bunch of pretty easy-to-read things: `angular.isDate`, `angular.forEach`, `angular.toJson`, and so on.

Q. What are all these things attached to the `angular` object? Why are they here?
---
> They're convenience methods -- things that don't come built-in with Javascript, but are handy to have around.

**Those of you using Chrome** click on `module`, then `<function scope>`. This is a Chrome-only thing that shows all of the variables available in the scope of this object. Click on `Closure`, then `b: Object`.

> Those of you not using Chrome can just observe me doing this. What we're doing here doesn't have any practical application; we're just exploring.

![Inside module](http://i.imgur.com/1eLxSDz.png)

After a lot of hunting, you can see something interesting: These are all the **modules** available to us from the Angular libraries included in this file.

## Modules

Modules -- not to be confused with *models* -- are the building block of Angular. Every Angular app is a collection of modules interacting with each other. They're kind of like Javascript objects, and kind of like gems, and kind of like models, and kind of like jQuery plug-ins.

If you click on any one of those modules, and then click on `requires`, you can see that each one requires another module. This is evidence of how they all work off of each other.

![Requires](http://i.imgur.com/ZvfroEY.png)

**I'm going to remove two Angular libraries** out of the three included on this page, `angular-ui-router` and `angular-resource`, just by deleting their `<script>` tags. Now I only have two modules: `ng` and `ngLocale`. These are the only two that come out-of-the-box with Angular.

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

## Our first module

Notice there's an `app.js` linked in this `index.html`. Open it and add this line:

```js
angular.module("grumblr", []);
```

**It's very important that you include that empty array.** We'll talk about why in a moment.

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
