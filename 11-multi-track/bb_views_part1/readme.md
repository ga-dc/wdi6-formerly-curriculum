# Backbone Views and Events - Item Views

## Learning Objectives

* Define the role of a View in a Backbone app.
* Define the role of an `el` in a Backbone View.
* Differentiate between an "assigned" `el` and a "constructed" `el`.
* Use a Backbone View to render a Model's data in the browser.
* Use Handlebars templates in BB to simplify rendering a view.
* Make a View "listen for" and respond to Model events.
* Make a View "listen for" and respond to DOM events.

## References

* [Backbone Docs](http://backbonejs.org)
* [Backbone Tutorials](https://backbonetutorials.com)
* [Backbone.js for absolute beginners](http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/)

## Getting Started

Today we will continue working on the Grumblr application we started building yesterday.  

* [Starter Code](https://github.com/ga-dc/grumblr_backbone/tree/views_part_1_starter). Located on the `views_part_1_starter` branch.
* [Solution Code](https://github.com/ga-dc/grumblr_backbone/tree/views_part_1_solution). Located on the `views_part_1_solution` branch.

And like yesterday, we will be using `http-server` to run our Backbone application. You can do that by entering `http-server` or `hs` in the application directory. From there, visit `http://localhost:8080`.

## What Are Backbone Views? (10 minutes)

Like models, Backbone views have many similarities to the views we built in our hand-rolled OOJS classes. In Backbone, views are the objects responsible for...

* Rendering content data into HTML and appending it to the page.
* Listening to their models (for changes, destroys, etc.) and responding accordingly.
* Listening for events on the page (usually within their `el`) and responding accordingly.

They are sometimes called **View Controllers**, since they react to events as well as render data.

Our views will always extend `Backbone.View` to ensure we get the behavior we
want.

```js
App.Views.Grumble = Backbone.View.extend({
  // Our code goes here.
});
```
> We are using the same syntax as last class and defining our Grumble View inside of a global `App` object.

Views can serve many purposes, but in general, we construct views that fall into
one of the three following categories:

  1. **Item Views:** used to render a single model instance, and respond to it's
  changes. Often we'll create one of these for each item we want to show on the
  page.  

  2. **Collection/List Views:** These views are associated with a Backbone
  collection, and are responsible for rendering that collection. Usually they do
  this by making Item views as needed. They are also responsible for things like
  sorting the items, etc.  

  3. **Specialty Views:** These are for managing things like a login form, or maybe a creation form for a model.  

> Today's lesson will cover item views. Tomorrow you will cover the other
two.

It's worth noting that when we instantiate item views in Backbone, it's
customary to pass in the model instance. Backbone will automatically set the
`model` property of the view to be that instance.  

```js
var my_grumble = new App.Models.Grumble({title: "Demo", authorName: "Adam",
                                        content: "Demo Content"});

var view = new App.Views.Grumble({model: my_grumble});

view.model // returns the my_grumble instance
```

## The `el` in Backbone (10 minutes)

Just like in our 'hand-rolled' OOJS, our views will have an `el` property, which
represents the corresponding element.

Backbone will automatically create the `.el` property, and the associated DOM
element for us when a view is instantiated. By default it will be a plain
`<div>`, but we can change that by setting the `tagName` and `className`
properties.

```js
App.Views.Grumble = Backbone.View.extend({
  tagName: "div",
  className: "grumble"
});
```
> In this example, `tagName: "div"` is optional.

Backbone also makes a jQuery version of the `.el` available using `.$el`. We
often use this instead of the vanilla DOM `.el`.

Note that it's possible to specify the `.el` property explicitly. In that case,
Backbone won't create the `el`, but will use what we specified. We'll use this
approach for our collection views later.

```js
App.Views.Grumble = Backbone.View.extend({
  tagName: "div",
  className: "grumble",
  el: "grumbles"
});
```
> We won't be manually setting the `el` property until tomorrow's class. But preview: by setting an `el` property, we no longer need to explicitly append our view to a DOM element.

### Exercise: Define our Grumble View (10 minutes)

Define a view in `js/backbone/views/grumble.js`. You should define the view such
that it's 'el' will be a div with class 'grumble'.

Test it in the console by doing something like the following...

```js
var my_grumble = new App.Models.Grumble({
  title: "Dogs are the Worst! ",
  content: "I do say, my good sir... aren't dogs the worst? I mean, they don't know how to groom themselves, they are always chewing on tennis balls like a fool, and they can't even climb trees!",
  authorName: "Cornelius McWhiskertons III, Esq.",
  photoUrl: "http://www.babyanimalzoo.com/wp-content/uploads/2012/08/fancy-cats-a-proper-sir.jpg"
});

var grumbleView = new App.Views.Grumble({model: my_grumble});

grumbleView.model
grumbleView.el
grumbleView.$el
// The two previous lines should return a <div> with class grumble.
```

## Rendering (5 minutes)

Just like in vanilla JS, we usually want to render HTML and put it into the
`el`. This method could be called anything, but convention is to call it
`render`.

### Exercise: Define a Basic Render Method (10 minutes)

In a `render` method, use jQuery's `.html()` to fill your view's `.$el` with some basic HTML. For now,
just make an `<h2>` and set it's content to be the grumble's title.
> Not sure how to begin? Think about how we defined `render` in our [earlier OOJS classes](https://github.com/ga-dc/curriculum/tree/master/08-single-page-web-apps/oojs1-read#views-artist-2090). Your Backbone render method in this exercise, however, will be much shorter.

Remember that each view has a `model` property.

Test your view by instantiating one, calling `.render()`, and looking at the `$el`...

```js
var my_grumble = new App.Models.Grumble({
  title: "Dogs are the Worst! ",
  content: "I do say, my good sir... aren't dogs the worst? I mean, they don't know how to groom themselves, they are always chewing on tennis balls like a fool, and they can't even climb trees!",
  authorName: "Cornelius McWhiskertons III, Esq.",
  photoUrl: "http://www.babyanimalzoo.com/wp-content/uploads/2012/08/fancy-cats-a-proper-sir.jpg"
});

var grumbleView = new App.Views.Grumble({model: my_grumble});

grumbleView.model
grumbleView.$el

$('#grumbles').append(grumbleView.$el)

grumbleView.render()
grumbleView.$el
```

[Solution](https://gist.github.com/amaseda/0c21eda5d0365099bd47)

## Break (10 minutes)

## Handlebars Templates (10 minutes)

It's no fun (and quite error-prone) to build our HTML using jQuery methods
like `.append()`, etc. It's much better to use a templating library, such as
Handlebars, Mustache, Jade, etc.

Backbone is agnostic regarding which library we use, but that means we'll need
to do all the setup ourselves. Let's go with Handlebars since it's a popular
and easy-to-use library.

Take a few minutes to look at **Getting Started** section on the the
[Handlebars site](http://handlebarsjs.com). Pretty much everything we need is
in there.

The only trick is setting up the library. Let's use bower to install Handlebars...
```bash
$ bower install handlebars
```

And then in our `index.html`...
```html
<head>
  ...
  <!-- after underscore but before backbone -->
  <script src="bower_components/handlebars/handlebars.min.js"></script>
  ...
</head>
```

### Exercise: Define a Handlebars Template (10 minutes)

1. Define a Handlebars template for our Grumble. Your template should be placed inside a script file that is defined in `index.html`, like so...

```html
<script id="grumbleTemplate" type="text/x-handlebars-template">
  <!-- Template code goes in here -->
</script>
```
> You can place this at the end of `<body>`.

2. The content of your template should be formatted like the below code, with placeholders replacing the actual model properties (e.g., `title`).

```html
<div class="grumble">
  <h2>Dogs are the Worst! <span class="delete">(X)</span></h2>
  by: Cornelius McWhiskertons III, Esq.
  <p>
    I do say, my good sir... aren't dogs the worst? I mean, they don't know how
    to groom themselves, they are always chewing on tennis balls like a fool,
    and they can't even climb trees!
  </p>
  <img src="http://www.babyanimalzoo.com/wp-content/uploads/2012/08/fancy-cats-a-proper-sir.jpg" alt="">
  <button class="edit">Update Grumble</button>
</div>
```
> This all exists inside of that `<script>` you just created.

3. In your view's `initialize` method, set a `this.template` property, which should point to a
**compiled handlebars template**.

```js
initialize: function(){
  this.template = Handlebars.compile( source );
}
```
> You need to replace `source`. HINT: Use jQuery to (1) select the script that contains our template and (2) select the HTML inside that script.  

4. Update the `render` function to use the template. When using the template,
we need to pass in just our model attributes - not the whole model. Do some
research to find the best way!
> HINT: How does [this Backbone example](http://backbonejs.org/docs/todos.html) pass in model information to the template?  

5. For good measure, let's call the `render()` method at the end of initialize,
so we don't have to explicitly call it when we create new views. Also add a line to `render()` appending our view's `.$el` to `<div id="grumbles"></div>` in `index.html`.  

Test your render function as before, only this time, you should see HTML that
came from your template.

[Solution](https://gist.github.com/amaseda/1290ecbe267335e81541)

## Responding to Model Events (10 minutes)

One of the great features of Backbone is the events system. There are two types
of events: **Model / Collection Events** and **View Events**. We'll take a look at both, starting with Model / Collection Events.  

For now, we'll focus on model events. Collection events will be covered tomorrow morning, but they are very similar.  

Any Backbone model will trigger events when certain things happen to it. Other
parts of the application can `listen` for those events, and automatically take
action when they happen.  

Take a moment to read the
[Events documentation on Backbone](http://backbonejs.org/#Events).  

As a general guide, we prefer to use `.listenTo()` over `.on`, in that it allows
the listening object to be in charge rather than the object that is triggering
events.  

### Think Pair Share (5 minutes)

Spend two minutes looking at the catalog of events in the above documentation.
Which events do you think we might use most often, and why?

### Exercise: Re-render on Change (5 minutes)

A very common pattern is to have a view listen to it's model for change events,
and re-render in response. Take a moment to set this up.  
> Hint: You'll only need to add one line of code to make this work.  

Where should we setup the listening? What method should we call in response to
the change event?

You can test it by doing something like the following...

```js
var my_grumble = new App.Models.Grumble({
  title: "Dogs are the Worst! ",
  content: "I do say, my good sir... aren't dogs the worst? I mean, they don't know how to groom themselves, they are always chewing on tennis balls like a fool, and they can't even climb trees!",
  authorName: "Cornelius McWhiskertons III, Esq.",
  photoUrl: "http://www.babyanimalzoo.com/wp-content/uploads/2012/08/fancy-cats-a-proper-sir.jpg"
});

var grumbleView = new App.Views.Grumble({model: my_grumble});
$('#grumbles').append(grumbleView.$el)

my_grumble.set('title', "Cats are the Best!");
// After running the above line, the page should update automatically!
```

[Solution](https://gist.github.com/amaseda/2a746c7b7634c6a94324)

## Aside: Fetching, Rendering and Auto-Appending (5 minutes)

So we don't have to keep testing this in the console, let's do write some quick
code in `app.js` to auto-fetch all grumbles, and display them.

```js
$(document).ready(function() {
  var grumbles = new App.Collections.Grumbles();

  grumbles.fetch().then(function() {

    grumbles.models.forEach(function(grumble) {
      var grumbleView = new App.Views.Grumble({model: grumble});
      $('#grumbles').append(grumbleView.$el);
    });

  });
});
```

We can also get rid of the `.append` line from our view's `initialize` since that's taken care of in `app.js` now.  

We'll see later that this sort of thing will be handled by a collection view.

## View Events (5 minutes)

The last main feature of Backbone views is the DOM event system. It's really
just a nicer way to handle events. Instead of writing a bunch of jQuery like
below, we can define a simple list of events and what to do in response.

So instead of this...

```js
  $el.find('.beep').on("click", function() {
    // code goes here to honk horn
  })
```

...we can do this...

```js
events: {
  'click .beep': 'honkHorn'
}

honkHorn: function() {
  // honkHorn code goes here.
}
```

This keeps our event declarations in one place and encourages us to write
re-usable methods on our view.

### Exercise: Adding Deletion When "X" is Clicked (10 minutes)

Add an event such that when the user clicks on the delete `<span>`, a method named `deleteGrumble` is called. This method should be defined on the view and should...  

1. Destroy the associated grumble model.  
2. Fade out the el.  

### Exercise: Rendering Edit Template When Edit is Clicked (10 minutes)

When the user clicks the `edit` button, call the `renderEditForm` method, which
should...

1. Prevent the default action of submitting the form. **Very important!**    
2. Replace the `el` with a form, using a new template you'll have to define.  

The template should produce HTML that looks like this for the updated `el`...

```html
<div class="grumble">
  <form class="grumbleForm">
    <input type="text" name="title" value="Cats are the best!">
    by: <input type="text" name="authorName" value="Cornelius McWhiskertons III, Esq.">
    <textarea name="content">I do say, my good sir... aren't dogs the worst? I mean, they don't know how to groom themselves, they are always chewing on tennis balls like a fool, and they can't even climb trees!</textarea>
    <input type="text" name="photoUrl" value="http://www.babyanimalzoo.com/wp-content/uploads/2012/08/fancy-cats-a-proper-sir.jpg">
    <button class="submit">Submit</button>
    <button class="cancel">Cancel</button>
  </form>
</div>
```

#### Bonuses

1. Make the form disappear when the "Update Grumble" button is clicked a second time.
2. Prevent two versions of the form from appearing after clicking the "Update Grumble" button a second time.  

### Exercise: Update Grumble when Form is Submitted (10 minutes)

When the user clicks the `update` button, call the `updateGrumble` method.

This method should should:

1. Prevent the default action of submitting the form.
2. Gather data from the form.
3. Use the `save` method on the associated grumble (and the data from the form)
to update the grumble.
4. Re-render the show view.

[Solution](https://gist.github.com/amaseda/82812bb101a733bffb7a)

### Exercise: Cancel Button (5 minutes)

When the user clicks the `cancel` button, go back to the show view.
> You can do this by adding just one line to our view's `events` object. No need to define a new method.

## Sample Questions

* What is the role of a view in Backbone?
* What features do Backbone views have that our hand-rolled views did not?
* How do model events work in Backbone?
* How do DOM events work in Backbone?
* Describe the process of using Handlebars templates in Backbone.
