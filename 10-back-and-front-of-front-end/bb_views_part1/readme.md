# Backbone Views and Events - Item Views

## Learning Objectives

- Define the role of a View in a Backbone app
- Define the role of an `el` in a Backbone View
- Differentiate between an "assigned" `el` and a "constructed" `el`
- Use a Backbone View to render a Model's data in the browser
- Use handlebars templates in BB to simplify rendering a view
- Make a View "listen for" and respond to Model events
- Make a View "listen for" and respond to DOM events


## Intro - What are Backbone Views?

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

## The `el` in Backbone

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

### Exercise: Define our Grumble View

Define a view in `js/backbone/views/grumble.js`. Test it in the console by doing
something like:

```js
var grumbles = new App.Collections.Grumbles();
grumbles.fetch();

var my_grumble = grumbles.at(0);
var grumbleView = new App.Views.Grumble({model: my_grumble});

grumbleView.model
grumbleView.el
grumbleView.$el
```

## Rendering

Just like in vanilla JS, we usually want to render HTML and put it into the
`el`. This method could be called anything, but convention is to call it
`render`.

### Exercise: Define a basic render method

Use the `.html()` method to fill your view's `el` with some basic HTML. For now,
just make an `<h2>` and set it's content to be the grumble's title.

Remember that each view has a `model` property.

## Handlebars Templates
### Exercise: Define a Handlebars Template

## Responding to Model Events
### Exercise: Re-render the view when the model changes

## View Events
### Exercise: Adding Deletion when "X" is clicked
### Exercise: Rendering Edit Template when Edit is Clicked
### Exercise: Update Grumble when Form is Submitted
