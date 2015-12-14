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

If you haven't already, please fork the grumblr_angular repo

    $ git clone https://github.com/ga-dc/grumblr_angular

You can get today's starter code by checking out a new branch:

    $ git checkout -b ui-router 1.0.0

## Open the file in Atom and your browser

It's all terribly exciting: the word `Grumblr`, and that's pretty much it.

Grumblr is like Tumblr, only grumblier. It's a two-model CRUD app with posts and comments. Down the road it'll have users too.

In the coming classes you're going to be interacting with data from an API that we provide. For this class, though, we'll just be hardcoding data and getting some views up and running.

> Note: There's no reason this app uses CloudFlare for some dependencies and Google APIs for others. It'd probably be a better idea to use the same domain for all of them, just to be consistent.

## Under the hood

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

# Our first module

We're going to create our own Angular module. It's not going to do anything for a bit. For the next part of this class, we're only going to focus on setting up modules.

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

## Dependency Injection

The process of requiring dependencies in Angular is called **dependency injection**. It's an extremely important part of Angular since this framework is all about modules being dependent on other modules.

#### Try removing that array altogether. What happens?

We get an error. In order to create a module you have to specify the number of dependencies it has, even if that number is zero.

A `.module` with an array creates a new module; without an array it looks up an existing module of that name.

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

We're going to configure this app to have routes to multiple views: a view for the Grumbles index, and a Grumbles show page.

Remember in Express we had a `config/routes.js` file with all of the routes defined in it. Here, we put the `routes` inside a `config` module.

Add `.config` to your `app.js`:

```js
"use strict";

(function(){
  angular
  .module("grumblr", [
    "ui.router"
  ])
  .config([
    "$stateProvider"
  ]);
}());
```

You'll notice `$stateProvider` is in quotes. You'll also notice that if you refresh the page, you'll get an error. That's OK -- we're going to talk about `$stateProvider` first and then we'll address the error.

## $stateProvider

The `ui.router` module we're requiring includes factories, services, providers, and more. We're not going to talk about the differences between those for now. Just know that `$stateProvider` is something `ui.router` gives us to manage **states**.

A state in Angular is basically a route: it's an umbrella term for a URL, the view associated with it, and any controllers used in that view.

## Config needs functions

The reason `.config` is throwing an error is because Angular expects calling `.config` to always result in it calling a function -- and we haven't yet told `.config` to call a function. The purpose of the function is to actually *do* the configuring.

Here's how we're going to add the function:

```js
"use strict";

(function(){
  angular
  .module("grumblr", [
    "ui.router"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider){
    
  }
}());
```

## Wat

Two weird things here:

**Weird thing number 1:** First `$stateProvider` is in quotes. Then it isn't. This is how Angular wrangles dependency injection. The reason it does things this goofy way is to protect against minification: compressing your Javascript code to make the file smaller. When you minify Javascript, variable names get changed, but strings don't. Without this, `$stateProvider` would get replaced with a variable name like `c`, which would throw an error because Angular doesn't know about anything named `c`.

> Yes, this is a bit hacky -- but it's Good Angular!

**Weird thing number 2:** What's up with this `RouterFunction`? It only gets called once; why not just do something like:

```js
"use strict";

(function(){
  angular
  .module("grumblr", [
    "ui.router"
  ])
  .config([
    "$stateProvider",
    function($stateProvider){

    }
  ]);
}());
```

That works the exact same way.

Q. So why do we do it with the named function? Why not an anonymous function? (Hint: Trick question)
---
> Because the anonymous function looks uglier and gives us more parentheses to juggle.

`RouterFunction` doesn't have to be called `RouterFunction`; it could be called `wombatsAnonymous`. We just named it that because that's what it is: a function that does routing.

## ui-view

Add the `ui-view` directive to your `index.html`:

```html
<body>
  <h1>Grumblr</h1>
  <div data-ui-view></div>
</body>
```

This is a lot like `yield` in ERB and HBS files: it tells Angular where to put the views we're about to define. `index.html` is now like a `layout.hbs` or `layout.html.erb` file. 

Note that you may see `ng-view` a lot in Angular documentation. This is used with the `ngRoute` module, which is the original built-in router included with Angular. Although it's still supported, Angular itself recommends you use `uiRouter`. They do the same thing -- `uiRouter` is just better.

## Defining states

Modify the RouterFunction to look like this:

```js
function RouterFunction($stateProvider){
  $stateProvider
  .state("grumbleIndex", {
    url: "/grumbles",
    template: "I'm the Grumbles index!"
  });
}
```

We've just defined the first **state**. Remember I said earlier that a state is a lot like a route in Rails or Express: it's a URL, often with an associated view and controller.

In your browser, go to `index.html#/grumbles`. You should see "I'm the Grumbles index!" show up! You could put HTML in that `template` as well.

The `/grumbles` comes from the `url` we defined. Change it to `/wombat` and now you'd need to go to `#/wombat`.

Q. Where does the `#` come from?
---
> We're not changing any views on the back end -- there are no page refreshes going on here. The `#` is a "jump anchor". Usually these are used for links that "jump down" a page of text. The important thing is that changing whatever comes after the `#` doesn't cause a page refresh.

## Templates

Writing a huge string of HTML inside that `template` parameter would be annoying. There's a second option: `templateUrl`. You can have Angular load and insert whole HTML files for you -- just like with *partials* in Rails and Express.

Let's create a folder in which we can put some partials:

```js
$ mkdir js/grumbles
$ touch js/grumbles/index.html
```

Put a piece of HTML into that `index.html`, just so we know it's working:

```html
<h2>I'm the Grumbles index!</h2>
```

Now, change `template` to `templateUrl` and make its value the path to the `index.html` you created:

```js
function RouterFunction($stateProvider){
  $stateProvider
  .state("grumbleIndex", {
    url: "/grumbles",
    templateUrl: "js/grumbles/index.html"
  });
}
```

Bam! Now you have an easy way of using partials and never again having to write huge swaths of HTML in a Javascript file. You will virtually never use `template`; always `templateUrl`.

## Moar States

We'll create one more state: a `show` page. Do this by chaining an additional `.state` onto the earlier one:

```js
function RouterFunction($stateProvider){
  $stateProvider
  .state("grumbleIndex", {
    url: "/grumbles",
    templateUrl: "js/grumbles/index.html"
  })
  .state("grumbleShow", {
    url: "/grumbles/show",
    templateUrl: "js/grumbles/show.html"
  });
}
```

Create a `show.html` page as well.

# You do: Create states for `edit` and `new`
> Make sure you can go to them in your browser!

# Modularity

Before we continue, we're going to create a new module, called `grumbles`, that represents the grumbles themselves -- whereas the `grumblr` module represents the whole app. This `grumbles` module is going to contain all of the code and logic specific to individual grumbles -- creating, saving, updating, displaying, and so on -- whereas the `grumblr` module will contain the code necessary to run the app at a high level.

```
$ touch js/grumbles/grumbles.module.js
```

Why? It's good practice. Angular's all about modules in the same way that Rails apps are all about models. Rather than having one big module, it's good convention to have a bunch of smaller modules that contain only the things relevant to themselves.

All we're going to put into that file is this:

```js
"use strict";

(function(){
  angular
  .module("grumbles", []);
}());
```

That is: we're only going to create the module. We don't have a need to do more to it. But it's still good practice.

Now that module needs to be dependency-injected into the main Grumblr module:

```
angular
.module("grumblr", [
  "ui.router",
  "grumbles"
])
```

...and needs to be required in the main `index.html`:

```html
<script src="js/app.js"></script>
<script src="js/grumbles/grumbles.module.js"></script>
```

# Controllers

The progression that we're following for creating this app is the same that I would follow for creating a "real" app: creating some routes is an easy win, so I'll do those first and test out the URLs. Then I'll worry about what we're going to do next: putting in data.

Q. In Rails, what do we call the thing that controls which data should be available to a user at which route?
---
> A controller.

A controller in Angular is similar: it's where we control which data is available on the view. However, Rails and Express controllers usually contained the logic for a bunch of routes -- that is, a bunch of **actions**. In Angular, it's considered good style to have **one controller for one action**.

Q. If I've defined the `show` and `index` actions, how many controllers should I have?
---
> Two controllers: one for each action.

We're just going to make one controller for now: the `index` controller:

```
$ touch js/grumbles/index.controller.js
```

This naming convention is used because it puts the `index` controller alphabetically right next to the `index` view. Since each view is going to have a controller, we're not going to put all the controllers together the way we would in Rails or Express: that would result in a lot of jumping around from file-to-file.

Replace the contents of that controller file with this:

```js
"use strict";

(function(){
  angular
  .module("grumbles")
  .controller("GrumbleIndexController", [
    GrumbleIndexControllerFunction
  ]);

  function GrumbleIndexControllerFunction(){
    console.log("I'm in the controller!");
  }
}());
```

> Note: `GrumbleIndexControllerFunction` is a super-long function name. A better name might be just `ControllerFunction`. We just used this long name to be a little more explicit for instructional purposes.

Then, in the app's **main** `index.html`, include the controller file right below `grumbles.module.js`:

```html
<script src="js/app.js"></script>
<script arc="js/grumbles/grumbles.module.js"></script>
<script src="js/grumbles/index.controller.js"></script>
```

Q. Why isn't there an array in this `.module`?
---
> Because the `grumbles` has already been created; we're adding something *to* the module. Angular thinks any `.module` with an array in it is creating a new module.


Q. This controller isn't doing anything yet. How can I tell?
---
> I'd see "I'm in the controller!" console logged.

To activate this controller, we need to tell the router that it should use this controller for the `index` state / route:

```js
function RouterFunction($stateProvider){
  $stateProvider
  .state("grumbleIndex", {
    url: "/grumbles",
    templateUrl: "js/grumbles/index.html",
    controller: "GrumbleIndexController"
  })
  .state("grumbleShow", {
    url: "/grumbles/:id",
    templateUrl: "js/grumbles/show.html"
  });
}
```

Now you should see that console logging.

## Instantiation

What's actually going on here is Angular is running `new GrumbleIndexController()`; that is, it's creating a new instance of that object.

You can see that this can be used to make things happen, like console logging. But console logging isn't really the point of controllers. The point is to pass data to the view.

For this case, let's try to make a variable called `grumble` available in the view. We have an instance of `GrumbleInstanceController`, and want to give it a `grumble` property.

Q. How do you give an instance of a Javascript object a property from inside its constructor function?
---
> You use `this`:

```js
function GrumbleIndexControllerFunction(){
  this.grumbles = "These are some grumbles."
}
```

Now we need a way of making this new controller instance available in the view: it's been instantiated, but we need to actually save that instance somewhere the view can use it.

You do this with `controllerAs`:

```js
function RouterFunction($stateProvider){
  $stateProvider
  .state("grumbleIndex", {
    url: "/grumbles",
    templateUrl: "js/grumbles/index.html",
    controller: "GrumbleIndexController",
    controllerAs: "GrumbleIndexViewModel"
  })
  .state("grumbleShow", {
    url: "/grumbles/:id",
    templateUrl: "js/grumbles/show.html"
  });
}
```

Q. Why am I calling this `ViewModel`?
---
> A viewmodel is the Angular term for an instance of a controller. It's an interface between a view and a model.


This is short for "Save this instance of the **controller as**..."

Now, add to your `grumbles/index.html`:

```html
<h2>I'm the Grumbles index!</h2>
{{GrumbleIndexViewModel.grumbles}}
```

Refresh, and you should see the text show up!

## Faking data

Let's make this index more index-y so that it shows multiple grumbles.

Normally, at this point, I'd add in some actual data. We're going to be using that Grumblr API eventually, but that involves using factories, which we'll get into tomorrow.

For now, we're just going to "fake" the data by creating a global variable containing an array of fake grumbles. Just to serve as a reminder that **you would never actually do this in a real app**, we're going to put this fake data in the main `index.html`.

Before `<script src="js/app.js">`, add this:

```html
    <script>
var grumbles = [
  {
    title: "I am Grumble One"
  },
  {
    title: "I'm another Grumble"
  }
]
    </script>
    <script src="js/app.js"></script>
```

We can access this global variable in all the other files. Set `this.grumbles` equal to that variable in your controller:

```js
function GrumbleIndexControllerFunction(){
  this.grumbles = grumbles;
}
```

Let's see it in `grumbles/index.html`:

```html
<h2>I'm the Grumbles index!</h2>
{{GrumbleIndexViewModel.grumbles}}
```

Q. What Angular directive will we use to loop through the grumbles and print them out individually?
---
> ng-repeat

```html
<div data-ng-repeat="grumble in GrumbleIndexViewModel.grumbles">
  <p>{{grumble.title}}</p>
</div>
```

This is a lot like `.each` in Rails: it's looping trough the `grumbles` array and saving each one as a variable called `grumble` whose properties we can now access.

We have some semblance of an index page; let's head toward show pages for each grumble.

## ui-sref

Before we make the show pages themselves, we're going to create some links to them.

```html
<h2>I'm the Grumbles index!</h2>
<div data-ng-repeat="grumble in GrumbleIndexViewModel.grumbles">
  <p><a data-ui-sref="grumbleShow({id: 42})">{{grumble.title}}</a></p>
</div>
```

Q. What does `sref` stand for? Where have we seen `grumbleshow` before?
---
> It stands for "state".


We're referring to one of the states defined earlier in the router. This little `sref` thing checks whether or not a state exists, and if it does, it returns the URL for it. If that URL has parameters -- `:id` in this case -- you can supply a value for that parameter and it'll add it into the appropriate place in the URL.

This is cool because I can change the router all sorts of ways and `ui-sref` will still provide the correct URL. 

## $index

Obviously we don't want to hardcode the ID. The problem is, these grumbles don't actually have IDs -- they're just items in an array.

Q. Hmm. "Items in an array..." What do items in an array have that's sort-of like an ID?
---
> An index.

Inside `ng-repeat`, you automatically have access to a variable called `$index`. This refers to the index of the current item in the thing being repeated.

```html
<h2>I'm the Grumbles index!</h2>
<div data-ng-repeat="grumble in GrumbleIndexViewModel.grumbles">
  <p><a data-ui-sref="grumbleShow({id: $index})">{{grumble.title}}</a></p>
</div>
```

Now you can see the URL of each grumble reflects its index in the global array of grumbles.

Q. How would we make the main `Grumblr` header at the top into a link to the index page?
---
> `<h1><a data-ui-sref="grumbleIndex">Grumblr</a></h1>`

# You Do: Show Pages

#### Follow the rest of the lesson plan yourself to implement the rest of Grumblr.

Now we'll actually make the show pages themselves. This means creating a new controller, because we're doing **one controller, one view**.

```
$ touch js/grumbles/show.controller.js
```

## Set up

To start the show controller, I'm just going to copy the index controller. I'll change `index` to `show`, and change `this.grumbles` to `this.grumble` since we're just showing one:

```js
"use strict";

(function(){
  angular
  .module("grumbles")
  .controller("GrumbleShowController", [
    GrumbleShowControllerFunction
  ]);

  function GrumbleShowControllerFunction(){
    this.grumble = {}
  }
}());
```

I'll update the router accordingly to reference the new controller:

```js
.state("grumbleShow", {
  url: "/grumbles/:id",
  templateUrl: "js/grumbles/show.html",
  controller: "GrumbleShowController",
  controllerAs: "GrumbleShowViewModel"
});
```

## $stateParams

Now I need a way of getting the ID from the URL. Angular makes this possible with a module called `$stateParams`, included with `ui.router`. I'll inject it into the controller the same way I injected into the router, and add a `console.log` so we can see what's in `$stateParams`:

```js
"use strict";

(function(){
  angular
  .module("grumbles")
  .controller("GrumbleShowController", [
    "$stateParams",
    GrumbleShowControllerFunction
  ]);

  function GrumbleShowControllerFunction($stateParams){
    this.grumble = grumbles[$stateParams.id];
  }
}());
```

You can see that it's a small object containing the URL parameters (or the URL's one parameter, in this case).

So, to get the index of the current grumble, you just need `$stateParams.id`:

```js
function GrumbleShowControllerFunction($stateParams){
  this.grumble = grumbles[$stateParams.id];
}
```

Wha-bam! You have a little app!

# Removing the hash

You've probably never seen an Angular app that has hashmarks in its URLs the way we have here. That's because they're ugly and Angular makes them super-easy to remove.

## http-server

This will be easier with a less-clunky URL. Right now your URL is probably something horrible like `file:///Users/robertthomas/wdi/in-class/grumblr_angular-1.0.0/index.html`. We're going to use a Node module called `http-server` to give us a nice little server so we can use a cleaner URL, like `localhost:8080`.

In your current Grumblr folder:

```
$ npm install --global http-server
$ http-server
```

...and that's it! Now if you go to `localhost:8080` you should see your app.

## $locationProvider

Now we'll actually remove the hash.

First, inject `$locationProvder` into your router. Then, add `$locationProvider.html5Mode(true)`. The result should be:

```js
// ...
  .config([
    "$stateProvider",
    "$locationProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
// ...
```

If you refresh the page now and follow the error link, it'll tell you that `$location` needs a `<base>` tag.

> This is a standard but little-used HTML tag, the purpose of which is to say what URL all relative URLs should be based on.

Add this to your main `index.html`, right below the `<title>`:

```html
<base href="http://localhost:8080/" />
```

Go to `localhost:8080` and you should be able to click on URLs without seeing that hash. Note that if you actually type `localhost:8080/grumbles` into your browser's address bar it won't work.

That's because your `http-server` considers that to be a completely different route -- it doesn't know that you actually want `index.html`.

Remember that Angular is geared toward single-page apps. In the "real world", you'd probably have the server redirect every page to `index.html`.

# You do: CRUD Grumbles

This data won't persist since we're not hooked up to a database: refresh the page and it's gone.

But being able to CRUD grumbles, even if they just exist until you next refresh the page, will be really useful in doing it for realzies later on!

To start, here's what you'll need to make "Create" work:

`data-ng-model="GrumbleIndexViewModel.newGrumble.title"`

`data-ng-click="GrumbleIndexViewModel.create()`

```js
this.newGrumble = {};
this.create = function(){
  grumbles.push(this.newGrumble);
  this.newGrumble = {}
}
```

Take these snippets and incorporate them into your Grumblr in the appropriate way. Then, work on updating and deleting grumbles.

# Quiz Questions

What's the difference between `.module("myModule")` and `.module("myModule", [])`?
> The first retrieves an existing module; the second creates a new module.

What's an Angular "state"?
> A URL with an attached template, and usually a controller.

Why does a state need both a `controller` and a `controllerAs` parameter?
> The first says which controller should be used; the second says into which variable its new instance (view model) should be saved.

How many views should be managed by one controller?
> Just one: one view, one controller.

What's the equivalent of `{{yield}}` or `<%= yield %>` in Angular?
> `data-ui-view`

