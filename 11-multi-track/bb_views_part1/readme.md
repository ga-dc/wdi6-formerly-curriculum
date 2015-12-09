# Backbone Views and Events - Item Views

## Learning Objectives

- Define the role of a View in a Backbone app
- Define the role of an `el` in a Backbone View
- Differentiate between an "assigned" `el` and a "constructed" `el`
- Use a Backbone View to render a Model's data in the browser
- Use handlebars templates in BB to simplify rendering a view
- Make a View "listen for" and respond to Model events
- Make a View "listen for" and respond to DOM events

## References

* [Backbone Docs](http://backbonejs.org)
* [Backbone Tutorials](https://backbonetutorials.com)
* [Backbone.js for absolute beginners](http://adrianmejia.com/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/)

## Intro - What are Backbone Views? (10 minutes)

In Backbone, views are the objects responsible for:

- Rendering content data into HTML, and appending it to the page
- Listening to their models (for changes, destroys, etc), and responding accordingly
- Listening for events on the page (usually within their `el`), and responding accordingly

They are sometimes called View Controllers, since the react to events as well as
render data.

Our views will always extend `Backbone.View` to ensure we get the behavior we
want.

```js
App.Views.Grumble = Backbone.View.extend({
  // our code goes here
});
```

Views can serve many purposes, but in general, we construct views that fall into
one of the three following categories:

- Item views: used to render a single model instance, and respond to it's
changes. Often we'll create one of these for each item we want to show on the
page.
- Collection (or 'List') views: These views are associated with a Backbone
collection, and are responsible for rendering that collection. Usually they do
this by making Item views as needed. They are also responsible for things like
sorting the items, etc.
- Specialty Views: These are for managing things like a login form, or maybe a
creation form for a model.

Part 1 of today's lessons will cover item views, and Part 2 will cover the other
two.

It's worth noting that when we instantiate item views in backbone, it's
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

Backbone also makes a jQuery version of the `.el` available using `.$el`. We
often use this instead of the vanilla DOM `.el`.

Note that it's possible to specify the `.el` property explicitly. In that case,
Backbone won't create the `el`, but will use what we specified. We'll use this
approach for our collection views later.

### Exercise: Define our Grumble View (10 minutes)

Define a view in `js/backbone/views/grumble.js`. You should define the view such
that it's 'el' will be a div with class 'grumble'.

Test it in the console by doing something like the following:

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
// expect to see a div with class grumble
```

## Rendering (5 minutes)

Just like in vanilla JS, we usually want to render HTML and put it into the
`el`. This method could be called anything, but convention is to call it
`render`.

### Exercise: Define a basic render method (10 minutes)

Use the `.html()` method to fill your view's `el` with some basic HTML. For now,
just make an `<h2>` and set it's content to be the grumble's title.

Remember that each view has a `model` property.

Test your view by instantiating one, calling `.render()`, and looking at the el:

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

## Break (10 minutes)

## Handlebars Templates (10 minutes)

It's no fun (and quite error-prone) to build our HTML using jQuery methods
like `.append()`, etc. It's much better to use a templating library, such as
handlebars, mustache, jade, etc.

Backbone is agnostic regarding which library we use, but that means we'll need
to do all the setup ourselves. Let's go with handlebars, since it's a popular,
and easy to use library.

Take a few minutes to look at **Getting Started** setion on the the
[Handlebars site](http://handlebarsjs.com). Pretty much everything we need is
in there.

The only trick is setting up the library. Let's use bower to install handlebars:
```bash
$ bower install handlebars
```

And the in our index.html:
```html
<head>
  ...
  <!-- after underscore but before backbone -->
  <script src="bower_components/handlebars/handlebars.min.js"></script>
  ...
</head>
```

### Exercise: Define a Handlebars Template (10 minutes)

1. Define a handlebars template for our grumble. (See the sample HTML below)
2. On initialize, set a `this.template` property, which should point to a
**compiled handlebars template**
3. Update the `render` function to use the template. When using the template,
we need to pass in just our model attributes, not the whole model, do some
research to find the best way!
4. For good measure, let's call the `render()` method at the end of initialize,
so we don't have to explicitly call it when we create new views.

Test your render function as before, only this time, you should see HTML that
came from your template.

Sample HTML:

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

## Responding to Model Events (10 minutes)

One of the great features of backbone is the events system. There are two types
of events, model/collection events, and view events. We'll take a look at both,
starting with model / collection events.

For now, we'll focus on model events. Collection events will be covered in
Part 2, but they are very similar.

Any backbone model will trigger events when certain things happen to it. Other
parts of the application can `listen` for those events, and automatically take
action when they happen.

Take a moment to read the
[Events documentation on Backbone](http://backbonejs.org/#Events).

As a general guide, we prefer to use `.listenTo()` over `.on`, in that it allows
the listening object to be in charge rather than the object that is triggering
events.

### Think Pair Share (5 minutes)

Take a moment to look at the catalog of events in the above documentation.
Which events do you think we might use most often, and why?

### Exercise: Re-render on Change (5 minutes)

A very common pattern is to have a view listen to it's model for change events,
and re-render in response. Take a moment to set this up. Hint: you'll only need
to add one line of code to make this work.

Where should we setup the listening? What method should we call in response to
the change event?

You can test it by doing something like the following:

```js
var my_grumble = new App.Models.Grumble({
  title: "Dogs are the Worst! ",
  content: "I do say, my good sir... aren't dogs the worst? I mean, they don't know how to groom themselves, they are always chewing on tennis balls like a fool, and they can't even climb trees!",
  authorName: "Cornelius McWhiskertons III, Esq.",
  photoUrl: "http://www.babyanimalzoo.com/wp-content/uploads/2012/08/fancy-cats-a-proper-sir.jpg"
});

var grumbleView = new App.Views.Grumble({model: my_grumble});
$('#grumbles').append(grumbleView.$el)

my_grumble.set('title', "Cats are the Best!"); // watch the page update automatically!
```

## Aside: Fetching, Rendering, and Auto-Appending (5 minutes)

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

We'll see later that this sort of thing will be handled by a collection view.

## View Events (5 minutes)

The last main feature of backbone views is the DOM event system. It's really
just a nicer way to handle events. Instead of writing a bunch of jQuery like
below, we can define a simple list of events, and what to do in response.

So instead of this:
```js
  $el.find('.beep').on("click", function() {
    // code goes here to honk horn
  })
```

we can do this:
```js
events: {
  'click .beep': 'honkHorn'
}

honkHorn: function() {
  // code goes here to honk horn
}
```

This keeps our event declarations in one place, and encourages us to write
re-usable methods on our view.

### Exercise: Adding Deletion when "X" is clicked (10 minutes)

Add an event such that when the user clicks on the delete span, a method called
`deleteGrumble` is called. This method should be defined on the view and should:

1. Destroy the associated grumble model.
2. Fade out the el.

### Exercise: Rendering Edit Template when Edit is Clicked (10 minutes)

When the user clicks the `edit` button, call the `renderEditForm` method, which
should:

0. Prevent the default action of submitting the form (IMPORTANT!)
1. Replace the `el` with a form, using a new template you'll have to define.

The template should produce HTML that looks like this for the updated `el`:

```html
<div class="grumble">
  <form class="grumbleForm">
    <input type="text" name="title" value="Cats are the best!">
    by: <input type="text" name="authorName" value="Cornelius McWhiskertons III, Esq.">
    <textarea name="content">I do say, my good sir... aren't dogs the worst? I mean, they don't know how to groom themselves, they are always chewing on tennis balls like a fool, and they can't even climb trees!</textarea>
    <img src="http://www.babyanimalzoo.com/wp-content/uploads/2012/08/fancy-cats-a-proper-sir.jpg" alt="">
    <input type="text" name="photoUrl" value="http://www.babyanimalzoo.com/wp-content/uploads/2012/08/fancy-cats-a-proper-sir.jpg">
    <button class="submit">Submit</button>
    <button class="cancel">Cancel</button>
  </form>
</div>
```

### Exercise: Update Grumble when Form is Submitted (10 minutes)

When the user clicks the `update` button, call the `updateGrumble` method.

This method should should:

0. Prevent the default action of submitting the form.
1. Gather data from the form.
2. Use the `save` method on the associated grumble (and the data from the form)
to update the grumble.
3. Re-render the show view.

### Exercise: Cancel Button (5 minutes)

When the user clicks the `cancel` button, go back to the show view.


## Sample Questions

* What is the role of a view in Backbone?
* What features do Backbone views have that our hand-rolled views didn't?
* How do model events work in Backbone?
* How do DOM events work in backbone?
* Describe the process of using Handlebars templates in backbone.
