# Custom Directives

## Lenin's Objections
- DRY a given Angular app by extracting repeating logic and HTML into custom directives
- Explain the purpose of each of the four directive options, and the four options for the "restrict" directive, E, A, C, M
- Use a custom directive to render an array of objects

## This class is about tidying up

That is: breaking things up into separate files.

We approached Angular a bit differently than we did, say, Node. You see how we have all of our controllers in one file? We could totally split those up into separate files, and in Node, we probably would have started off that way. Here, though we're starting with very few files.

Take a look at the Grumbles controller file. It's only 46 lines long and I feel like it's tough to read.

When I say "tough to read", I mean it takes me more than about 2 seconds to see where something is on a page.

**Who cares about 2 seconds? [Relevant visual aid.](http://i.imgur.com/Ssz6pjF.png)**

### All of programming is shortcuts

I've said this a couple times before: programming is making shortcuts. The first programmer wrote in 0s and 1s. The second programmer got tired of writing 0s and 1s and invented machine code to do it for him (or her). The third programmer got tired of writing machine code and invented assembly code. The fourth programmer got tired of writing assembly and invented C. The fifth programmer got tired of writing C and invented Ruby. And on the sixth day, God rested.

Indenting is a tiny thing that has a tremendous impact on the usability of your code. Breaking things up into files is the same. It doesn't affect the performance of your app at all -- maybe by a couple milliseconds -- it just improves the readability.

##### Turn and talk: What things do you see that aren't DRY in Grumblr?

Our focus is going to be...

## DRYing the HTML

##### What HTML isn't DRY?

The `index` and `show` pages have almost identical HTML, as do the `new` and `edit` pages.

##### Why would we want to DRY the HTML?

Continuity across an app is a big part of UX. If a Grumble appears one way on one page, and another way on another page, that creates confusion for users. To that end, we can copy and paste HTML from one view to another, but when inevitably we want to change that HTML, it means copying and pasting again.

We're going to do this with...

## Custom directives

##### What are some *standard* directives we've seen so far?

We've seen a lot of attributes: `ng-repeat`, `ng-app`, and so on. But directives can also be entire elements. Angular lets you create, say, `<grumble>` and `<comment>`.

##### So what *is* a directive, anyway?

Basically, a directive is some HTML defined by Angular. A directive can be an attribute, an element, a class, or even a comment.

All HTML elements have behaviors: anchors take you to a page when you click on them, textareas let you write stuff inside them, and so on. Angular lets you create your own HTML elements and give them behaviors you define.

Ever wished there was a `<comment-box>` or a `<random-bill-murray-img>` element? Now you can make one.

One of Angular's sort-of "mission statements" is "to be what HTML would have been if it was designed from the start with web apps in mind."

### Things that are weird about directives

#### First: They're called "directives"

This is a dumb name. If it was up to me, I'd call them "Angular elements" or something much more intuitive.

In fact, I got so frustrated with Angular's goofy way of naming things that I created a [cheat sheet of which Angular terms map to which Rails terms](../angular-vs-rails.md).

Directives are most like helpers in Rails.

##### What are some Rails helpers you remember?

`form_for`, `link_to`, `render partial`, and so on.

##### What do those helpers do?

They all add HTML to a view.

#### Second: They don't validate :(

If you try to validate HTML with `<div ng-repeat>` in it, you'll get a big ol' error saying `ng-repeat` isn't an allowed attribute.

This has an easy fix:

**Any time you use a non-standard element or attribute, put `data-` in front of it.**

For example: `<data-comment>` or `<div data-ng-repeat>`. This is how you signal that you're aware you're using non-standard HTML and it isn't simply a typo.

Angular can be very picky about whether or not you've properly nested and closed elements, so using `data-` is very helpful. (That said, we did *not* use `data-` in the Grumblr solutions. We also didn't use `<!DOCTYPE html>`. Sigh.)

#### Third: They're mixing logic with HTML

That is: they do pretty much everything we've told you *not* to do with HTML. You're discouraged from using the `onclick=` attribute, and now all of a sudden you're being told to use `ng-click=`.

##### A question to which I don't have a well-articulated answer: why is this good?

I can think of a few reasons:

1. We don't have to put event listeners everywhere
- It makes the HTML easier to read, whereas in Backbone templates are sort of strewn about and it's not so easy to see which goes where
- It makes the HTML make *more sense*, somehow. HTML is meant to tell you the function of content, and this lets you be much more specific about that function. It's (theoretically) easier to read than Javascript, and it's more useful than just defining semantics.

### Custom directives are the "flagship" of Angular

Without directives, Angular is just another MVC-ish framework.

So: let's make one!

```
git checkout -b origin/templating-and-routing-with-comments templating-and-routing-with-comments
```

## Grumble `show`

This is the HTML that's identical between `index.html` and `show.html`: the information about a Grumble. It's repeated in the index, and shown once in `show`.

For now, we'll leave `show` alone and just get this working in `index`.

1. Let's create a blank `.html` file into which we'll put the template, or "partial", for the Grumble info. Rails convention for partials is to put an underscore `_` at the beginning of their file name, so we may as well do that here: `_grumble.html`.

2. Cut and paste the relevant HTML into it from `index.html`.

3. Where the HTML used to be in `index.html`, put the custom directive. We'll call this one plain ol' `<grumble />`, although we could call it whatever we want. Make sure you name your directive something that isn't a variable on your page. That is: don't put `<comment>` inside `ng-repeat="grumble in grumbles"`.

4. Now we'll give the directive its behavior. Let's make `js/directives/grumble.js`.

5. Next we'll set up the actual Javascript. Directives look like pretty much every other module:

  ```js
  (function(){
    var directives = angular.module('grumbleDirectives',[]);
    directives.directive('grumble', function(){

    });
  })();
  ```

6. Now we'll tell the directive what to use as a template:

  ```js
  (function(){
    var directives = angular.module('grumbleDirectives',[]);
    directives.directive('grumble', function(){
      return {
        templateUrl: "views/grumbles/_grumble.html"
      }
    });
  })();
  ```

7. Finally, inject `grumbleDirectives` into your `app.js`, the way we did with `grumbleServices` and `grumbleControllers`

8. Actually finally, include `directives/grumble.js` in the app's main `index.html`.

...and that's it! Run it, and see what happens.

```
git checkout -b origin/custom-directives custom-directives
```

##### Swap out the HTML in `show.html` with the `<grumble />` directive.

We've effectively created a little widget we can use anywhere on our app!

##### Do the same for `edit` and `new`
- What needs to change in the HTML of the partial for this to work?

## Directive options

### What kind of directive do you want?

I mentioned before that custom directives can be elements, attibutes, comments, or classes. For example, as far as Angular is concerned, these are all the same:

```
<grumble-cake></grumble-cake>
<div grumble-cake></div>
<div class="grumble-cake"></div>
<!-- directive:grumble-cake -->
```

If you're looking for a mnemonic by which to remember these, use `MACE`, where `M` is the 'm' in 'comment'.

If you only want your directive to be available as an element or an attribute, you'd add `restrict: 'EA'` to your directive:

```js
(function(){
  var directives = angular.module('grumbleDirectives',[]);
  directives.directive('grumble', function(){
    return {
      templateUrl: "views/grumbles/_grumble.html",
      restrict: "EA"
    }
  });
})();
```

### Do you want your template to be a string or another file?

We've been having our directives load their HTML from another file. But you can also put the HTML right in your directive as a string: just swap `templateUrl` with `template`:

```js
(function(){
  var directives = angular.module('grumbleDirectives',[]);
  directives.directive('grumble', function(){
    return {
      template: "<h1>{{grumble.title}}</h1>"
    }
  });
})();
```

### Do you want your directive to *replace* the HTML that calls it, or just go inside it?

If my directive looks like this:
```js
(function(){
  var directives = angular.module('grumbleDirectives',[]);
  directives.directive('grumble', function(){
    return {
      template: "<h1>Slim Shady</h1>"
    }
  });
})();
```

...and my HTML looks like this:
```html
<div>
  <grumble></grumble>
</div>
```

...what actually gets rendered in the browser is this:
```html
<div>
  <grumble><h1>Slim Shady</h1></grumble>
</div>
```

I can add a parameter called `replace` that will have my template *replace* the directive that calls it:
```js
(function(){
  var directives = angular.module('grumbleDirectives',[]);
  directives.directive('grumble', function(){
    return {
      template: "<h1>Slim Shady</h1>",
      replace: true
    }
  });
})();
```

```html
<div>
  <h1>Slim Shady</h1>
</div>
```

This is nice if you're anal-retentive about your HTML validating.

### Do you want to put methods in the directive itself?

You can give a directive its own methods and properties that will show up in the view using a `link` function. For instance, here I am adding a property:

```js
(function(){
  var directives = angular.module('grumbleDirectives',[]);
  directives.directive('grumble', function(){
    return {
      template: "<h1>{{myName}}</h1>",
      link: function(scope, element, attributes){
        scope.myName = "Slim Shady";
      }
    }
  });
})();
```

...and here I am adding a method:

```js
(function(){
  var directives = angular.module('grumbleDirectives',[]);
  directives.directive('grumble', function(){
    return {
      template: "<h1 ng-click='say(myName)'>Click me!</h1>",
      link: function(scope, element, attributes){
        scope.myName = "Slim Shady",
        scope.say = function(what){
          alert(what);
        }
      }
    }
  });
})();
```

`link` will always take the same three arguments: `scope`, `element`, and `attributes`. The only one you really need to worry about is `scope`. It's an object that when you attach things to it makes them available inside your directive.

This is a **big deal**. It means **we don't have to use controllers at all for this directive**.

In the `grumble` controller, we have this method:

```js
this.delete = function(id){
  Grumble.delete({id: id}, function(){
    $location.path("/grumbles")
  });
}
```

I can remove it from the controller and plunk it right in the directive:

```js
(function(){
  var directives = angular.module('grumbleDirectives',[]);
  directives.directive('grumble', function(){
    return {
      templateUrl: "views/grumbles/_grumble.html",
      scope: function(scope, element, attributes){
        scope.delete = function(id){
            Grumble.delete({id: id}, function(){
              $location.path("/grumbles")
            });
          }
        }
      }
    }
  });
})();
```

## We've covered four "options":

- `restrict: "EACM"`
- `replace`
- `template` and `templateUrl`
- `link`

##### What's the *right* way to use them?

There isn't one.

### The story of Robin and Angular

At my last job, I was asked to learn Angular to make an app. It *kicked my butt*. It seemed so "draw the rest of the effing owl". I couldn't even find adequate definitions for "controller" and "directive", let alone know when to use which. I was spared from total failure only by the fact that GA came along and poached me.

Going it over again before this class, I ran into the same trouble.

#### In retrospect, this reminds me very much of when I was selling Noteboards.

Folks around the world had been asking me to sell them internationally. I had a vague idea that I needed to pay tariffs or at least fill out some paperwork to do so. I looked for instructions. I *couldn't find them anywhere*.

This seemed so "draw the rest of the effing owl". It was like how to register to sell internationally was a state secret. Being the law-abiding citizen I am, and not wanting to get in trouble, I ended up just not selling them internationally at all.

...until one day, about 6 months in, it hit me:

**There is no owl.**

The absence of resources telling me the rules and restrictions and the "right" thing to do meant there weren't rules and restrictions. All I had to do was mail them, and unless I was selling in excess of some random big number or selling some controller substance, I didn't have to worry about covering my butt. The choices were all my own.

### Angular has fewer owls than you think

Unlike, say, Rails, which was written with pretty explicit rules in mind, Angular is in some ways a much more flexible framework: you use it however you want to use it.

There are lots of choices you have to make *for which there aren't "right" answers*, and that have no bearing on the performance of your app whatsoever:

##### What are some of these choices that don't have right answers?

- Put methods in directives or controllers?
- Use directives as elements or attributes?
- Use Firebase or AJAX?
- Use `<data-grumble>` or `<grumble>`?
- Use a CDN or Bower?
- More or fewer files?
  - We put all of the controllers in one big file, but could totally have put them in separate files.
  ```js
  // grumbleDirective.js
  angular.module('grumblr').directive('grumble')...
  ```
  ```js
  // commentDirective.js
  angular.module('grumblr').directive('comment')...
  ```
  ```html
  // index.html
  <script src="directives/grumbleDirective.js"></script>
  <script src="directives/commentDirective.js"></script>
  ```
- Organize your files by the model they relate to, or by the type of file?
  ```
  directives/
    grumble.js
    comment.js
  controllers/
    grumble.js
    comment.js
  ```
  ```
  grumble/
    directives.js
    controllers.js
  comment/
    directive.js
    controllers.js
  ```
- Have a whole bunch of modules, or one?
  - We made a module to hold all of our directives:
  ```js
  (function(){
    var directives = angular.module('grumbleDirectives',[]);
    directives.directive("grumble")...
    directives.directive("somethingElse")...
  })();
  ```
  ...but we could just attach them to the main module we defined in `app.js`:
  ```js
  (function(){
    angular.module('grumblr');
    .directive("grumble")...
    .directive("somethingElse")...
  })();
  ```

There's as much a right answer to these as there is to:
- Hyphens or underscores?
- 2 spaces or 4?
- Tabs or spaces?
- Atom or SublimeText?

**The only answer is to pick the one you like the best and stick with it.**

