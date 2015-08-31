# Collection and Specialty Views

## Learning Objectives
* Define the role of collection views in Backbone.
* Define the purpose of the el property on a Backbone View.
* Write a collection view that renders model views.
* Write a collection view that listens to collection events.
* Define the role of a specialty view in Backbone.
* Create a specialty view.

## Quick Recap

This morning Adam went over three types of views we will encounter in Backbone.
  1. **Item views.** Render a single model instance and respond to its changes.
  2. **Collection views.** Render and manage a collection.
  3. **Specialty views.** Views for log-in forms, create/edit forms, etc.

This afternoon, we will go over the latter two.

## Collection View

So we have a model view for each Grumble. What can it do?
* Generate a DOM representation of each Grumble.
  * Defined by a Handlebars template: `grumbleTemplate`.
  * Attached to the DOM using a `render` method.
* Acts as a controller. Manages CRUD interactions with model.
  * Listening for events, not only in the DOM but also in the model!
  * `updateGrumble`, `deleteGrumble`.
  * It also handles non-CRUD interactions (e.g., toggle form, change background to lemonchiffon).
* Generates DOM elements (e.g., forms) required for CRUD interactions.
  * Defined by a Handlebars template: `grumbleFormTemplate`.
  * A mini "specialty view" of sorts.

Next: a **collection view** that does the same thing for multiple models in different scenarios.
  * When we first load Grumblr, all of our Grumbles should be rendered.
  * When we create a new Grumble, it should be added to our existing list of Grumbles.

## Let's Get Started

If you need a starting point for the remainder of this lesson, fork and clone from [this branch](https://github.com/ga-dc/grumblr_backbone/tree/views_part_1_solution).

Let's begin as we did earlier in class and create our collection view in `/js/backbone/views/grumblesList.js`...
* What is the syntax we have used so far to create Backbone models and views?
* What function do all of our Backbone objects need?

```js
// /js/backbone/views/grumblesList.js

App.Views.GrumblesList = Backbone.View.extend({

  initialize: function(){
    console.log( "Grumbles view initialized!" );
  }

});
```

## el

Next, we're going to bind our collection view to a DOM element.
* What's that mean?

In Backbone, we can define an `el` property that indicates a DOM element to which our collection view, once rendered, will automatically append to.  
* So if we set `el: "#grumbles"`, our collection view will automatically append to `<div id="grumbles"></div>` upon rendering.
* Whatever we set `el` as, that DOM node must already exist in `index.html`.

```js
App.Views.GrumblesList = Backbone.View.extend({
  el: "#grumbles",

  initialize: function(){
    console.log( "Grumbles view initialized!" );
  }
});
```

Essentially, we are "coupling" our view with the DOM.
* [Some people don't like this](http://coenraets.org/blog/2012/01/backbone-js-lessons-learned-and-improved-sample-app/).
* Why do you think that is?
* If we don't set an `el` property, we create a ghost `el` that lives in Javascript until we manually attached it to the DOM.

**NOTE** This **does not** replace the `$el` property we use to build the DOM representation of our collection.

## renderOne

Our collection view is a collection of model views.
* We're going to use this view to generate multiple model views.
* In order for this to happen, we need to tell it how to generate a single model view. Let's do this using a `renderOne` method.

Why do we need a `renderOne` method?
* Wouldn't a method that renders an entire collection do just fine?

### Exercise: Create a `renderOne` method.

What To Do
* Instantiate a function that takes a model as an argument.
* Create a view for the passed-in model.
* Append that model view to the collection view.

```js
App.Views.GrumblesList = Backbone.View.extend({
  el: "#grumbles",

  initialize: function(){
    console.log( "Grumbles view initialized!" );
  },

  renderOne: function( grumble ){
    var view = new App.Views.Grumble({ model: grumble });
    this.$el.prepend( view.$el );
  }
});
```

### How Can I Test If It Works?

Open `index.html` and try entering the following in your browser console.
* The new Grumble should appear at the top of `<div id="grumbles"></div>`.

```js
var grumbles = new App.Collections.Grumbles();
var grumblesList = new App.Views.GrumblsList({ collection: grumbles });
grumblesList.$el;
// => Should return DOM representation of your collection

var grumble = new App.Model.Grumble({
  authorName: "Chewbacca",
  content: "Wrrrroaarrohhh",
  title: "Hello there",
  photoUrl: "http://img1.owned.com/media/images/2/3/2/1/23217/tupacca_540.jpg"
});
grumblesList.renderOne( grumble );
```

## renderAll

Now our collection view's `$el` property contains all of our model views. The next step is to append that `$el` to the DOM.
* We don't need to deal with any additional Handlebars templates here since that's taken care of inside each of our model views.

### Exercise: Create a `renderAll` method.

Steps
* Clear out the collection view's current $el property.
* Iterate through our collection (i.e., our collection's models) and render its individual model views.

```js
App.Views.GrumblesList = Backbone.View.extend({
  el: "#grumbles",

  initialize: function(){
    console.log( "Grumbles view initialized!" );
  },

  renderOne: function( grumble ){
    var view = new App.Views.Grumble({ model: grumble });
    this.$el.prepend( view.$el );
  },

  renderAll: function(){
    this.$el.empty();
    this.collection.each( this.renderOne.bind(this) );
  }
});
```

## Event Listeners

Like our model view, our collection view also needs event listeners so that it re-renders upon any change.

### Exercise: Create event listeners for our collection view.

What To Do
* Create a listener that re-renders our entire view upon reset.
* Create a listener that renders a new model view when one is added to our collection.

```js
App.Views.GrumblesList = Backbone.View.extend({
  el: "#grumbles",

  initialize: function(){
    this.listenTo(this.collection, 'reset', this.renderAll);
    this.listenTo(this.collection, 'add', this.renderOne);
  },

  renderOne: function( grumble ){
    var view = new App.Views.Grumble({ model: grumble });
    this.$el.prepend( view.$el );
  },

  renderAll: function(){
    this.$el.empty();
    this.collection.each( this.renderOne.bind(this) );
  }
});
```

Hold up. Why don't we need to pass in an argument to the `renderOne` callback in our "add" listener?
* Awesome Backbone feature: it just knows!
* "add" inherently passes in a model.

## Test Collection View in Console

## Update app.js

### Exercise: Update `app.js` so our application instantiates and renders a collection view.

What To Do
* Instantiate a collection.
* Instantiate a collection view and pass in a collection.

```js
// app.js

App = {
  Models: {},
  Views: {},
  Collections: {},
  Routers: {}
};

$(document).ready(function() {
  var grumbles = new App.Collections.Grumbles();
  var grumblesList = new App.Views.GrumblesList({ collection: grumbles });
  grumbles.fetch({ reset: true })
});
```

That's it...for now.
* As we continue building on our Backbone application, we'll revisit our collection view and add on some additional functionality.
* Wait, we don't need DOM events here? Why?

## Break

## Specialty Views

So we have views for our Grumbles -- model and collection. What about one for our new Grumble form?
* Let's make a **specialty view.**

Question: why are we not just putting this inside our model or collection views?

We've already gone everything we need to know in order to create a specialty view. Now, it's just a matter of putting all the pieces together.
* You're going to spend the rest of this class making one.
* It will looking something like the `createView` below.

![view diagram](img/view-diagram.png)
* **NOTE TO SELF: Will create own version of this diagram and highlight `createView`.**

## Exercise: Specialty View for Creating Grumbles

Questions to Consider
* What will the HTML of my "create" form look like? Where do I define that?
* How do I add a new Grumble to my collection and collection view?
* How do I update the database with my new Grumble?
* When/where do I tell my application to render the form?

### Part 1: View and Template

What To Do
* Start by adding the following HTML to the top of your HTML `<body>`.

  ```html
  <div id="createGrumble">
    <button class="new">New Grumble</button>
    <div class="formContainer"></div>
  </div>
  ```

* Create a `grumbleCreate.js` file in your views folder.
* In that file, instantiate a new Backbone view called `GrumbleCreate`.
* Couple your view with the DOM element you created in Step 1.
* Create a handlebars template for your view.
* Define an `initialize` method that inserts your template into the view's `$el`.
  * **Hint:** Use `.html()`.

### Part 2: Create The Grumble

* Define a `createGrumble` method that creates a Grumble based on user input to your template form. This method should...
  * Create an object literal that contains your new Grumble model's data.
  * Save this object literal as a model in your collection.
* Create an event that will trigger your `createGrumble` method.

### Bonus: Toggle Form

Your createGrumbleView should be hidden upon page load. If the user wants to create a new Grumble, he must click a "Show Form" button that reveals the form.

### Solution

```js
App.Views.GrumbleCreate = Backbone.View.extend({
  el: "#createGrumble",

  events: {
    'click .new':    'toggleForm',
    'click .cancel': 'toggleForm',
    'click .submit': 'createGrumble'
  },

  initialize: function(){

    this.template = Handlebars.compile($("#grumbleFormTemplate").html());

    this.$(".formContainer").html(this.template({}));
    this.$(".formContainer").hide();
  },

  toggleForm: function(){
    this.toggleButton(this.$(".new").text());
    this.toggleUrlState(this.$(".new").text());
    event.preventDefault();
    this.$(".formContainer").slideToggle();
  },

  toggleButton: function(state){
    if(state === "New Grumble"){
      this.$(".new").text("Hide Form")
    }else{
      this.$(".new").text("New Grumble")
    }
  },

  createGrumble: function(){
    event.preventDefault();
    var data = {
      title: this.$("[name='title']").val(),
      authorName: this.$("[name='authorName']").val(),
      content: this.$("[name='content']").val(),
      photoUrl: this.$("[name='photoUrl']").val()
    }
    this.collection.create(data);

    this.$el.find("input, textarea").val("");
    this.toggleForm();
  },
});
```

## Break

## Homework: Grumble Comments
