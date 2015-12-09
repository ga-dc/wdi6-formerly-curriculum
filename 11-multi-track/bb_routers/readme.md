# Backbone Routers

- Explain what role a router plays in a front-end application.
- Identify the router's role/responsibilities in the Backbone MVC model.
- Define static routes, actions and initialize a router.
- utilize `.navigate()` on a backbone router to update the url
- Define dynamic routes.
- Give examples of using :params in routes and actions.
- Recall the order in which routes are matched.
- Describe {trigger: true} as it applies to actions and routes.

## Opening Framing (5/5)
We have the makings of a pretty sick single page application now. We've got mostly full CRUD functionality for both grumbles and comments and things are even looking alot better thanks to Robin's bootstrap styles. As it stands we've got all the functionality we wanted in our MVP, but there's just one thing that's missing.

## State (10/15)
Let's look at [gmail](https://mail.google.com/)

As I click through this page, notice the url bar at the top of our browser. When I click on the inbox the last part of the url changes to `/#inbox` and as i click through various options it continues to update the URL. There are no page refreshes happening though.

Additionally, if I enter that url into another window, assuming i'm in the same session I'll be routed to that exact place. That's pretty neat. I think it would be really nice if that same sort of behavior existed within our grumblr application. It just so happens we can extend functionality out of backbone to execute this kind of behavior for us. Backbone Routers.

## Backbone Routers (15/25)
### Doc Dive (8~)
[Read from Backbone.Router to the `route` subsection ](http://backbonejs.org/#Router)

- Backbone routers are used for routing your applications' URLs
- provides linkable, bookmarkable, shareable URLs for important locations in the app.
- The routes hash maps URLs with parameters to functions on your router

In the backbone stack, it's kind of this omnipresent entity of your application. It can instantiate collections and views. It's aware of the URL and its current state by updating the URL in conjunction with functionality of the View objects as events occur. Additionally it knows which functions to execute depending on the URL.

This all sounds great...but let's actually build out some routing functionality for our application

## Setup (10/35)
If you don't already have it, make sure you have the [grumblr_rails_api](https://github.com/ga-dc/grumblr_rails_api)

> re: see `bb_models_collection` lesson plan for installation instructions

Next, in your `grumblr_backbone` repo pull down the `routing_starter` branch.

```bash
$ git fetch
$ git checkout routing_starter
# make sure origin is our version of the repo. Or utilize upstream if our version is the upstream.
```

Let's start up our rails backend in the terminal:

```bash
$ cd path_to_your_rails_app
$ rails s
# assuming you've already run rails setup(ie bundle install, rake db, etc. etc.)
```

If we open the `index.html` in our `grumblr_backbone` application. We can see everythings working great. We're going to break it temporarily because in order to incorporate our router we'll be instantiating things a little differently.

In our `js/app.js`:

```js
App = {
  Models: {},
  Views: {
    grumbleViews: []
  },
  Collections: {},
  Routers: {}
};

$(document).ready(function() {

});
```

> We got rid of our collection instantiation and view instantiations because that will be the job of the router. Additionally we created another name space in our global `App` object for `Routers`

The next thing we should do is create a file for our router defintion and link it in our `index.html`. In the terminal:

```bash
$ touch js/backbone/routers/grumble.js
```

In `index.html`:
```html
<script src="js/backbone/routers/grumble.js"></script>
```

## DeepLinking and Fragmented urls (10/45)
One purpose of the backbone router is for deep linking. We want to be able to bookmark our webpage such that when a certain url is entered the state of the application reflects the url. Additionally we use fragmented urls to do this. Fragmented urls are at the end of a url and are preceded by a `#`. We use fragmented urls because they can fire off backbone events when they get updated.

> Another thing to note is that when we set up a deep link. The purpose is not neccessarily to completely preserve state. The idea is to get the most important things perserved in state. An example of this that we'll see later is the editing capability. We can open up multiple edit forms for each view. But it would extremely difficult and unweildy to perserve 4 different editform to be open in a certain state. We're able to do it, but sometimes it's just not worth the time.

## Define Backbone Router `index` route(I do - 10/55)
Let's define our router in `js/backbone/routers/grumble.js`:

```js
App.Routers.Grumble = Backbone.Router.extend({
  routes: {
    '' : 'index'
  },

  index: function(){
    $("body").append("Index route was called")
  }
})
```

Let's instantiate a new grumble router and start the Backbone history in our main `js/app.js`:

```js
$(document).ready(function() {
  App.Routers.grumble = new App.Routers.Grumble();
  Backbone.history.start();
});
```

> We instantiated a new Grumble Router and we started the Backbone history. When we start the history the application begins to monitor hashchange events and routes.

If we open the `index.html` file, we can see `Index route was called`.

## Break (10/65)

## Define a `grumbles/new` route (You do - 10/75)
- add another key-value pair to the routes object in the router
- define a call back function `newGrumble` to append the string "New route was called" to the body
- make sure the call back fires off based on the fragment url `#new`
- test the route by opening the `index.html` in your browser and adding `#new` to the URL.


## Initialize (15/90)
So this is all really great, but really it's not doing anything but appending a hard coded string into the DOM. Really what we want to be doing is creating views that reflect the state the DOM based off of the URL.

It just so happens we have some views already defined! That makes life much easier. Although we can't really have a view until we have a collection. In order to get the collection we need to make an ajax `.fetch()` call. The question is, where can we do this?

Just like in all other Backbone object constructors, `Backbone.Router` comes with an `initialize` function we can define as a callback for when we instantiate a backbone router.

Let's update our router definition to include an `initialize` function.

In `js/backbone/routers/grumble.js`:

```js
initialize: function() {
  App.Collections.grumbles = new App.Collections.Grumbles();
  App.Views.grumbleList = new App.Views.GrumbleList({collection: App.Collections.grumbles});
  App.Views.grumbleCreate = new App.Views.GrumbleCreate({collection: App.Collections.grumbles});
}
```

> In the initialize method, I've instantiated the following:
- a new grumbles collection in `App.Collections.grumbles`
- a new grumbles list view in `App.Views.grumbleList`
- a new grumbles create view in `App.Views.grumbleCreate`

One thing to note here is that we haven't made any calls to the database yet. As soon as we call `fetch()`, it will trigger an event to render the view. Which is not something we want to do on the routers instantiation.

(ST-WG) Where should we call `.fetch()` instead?

## The *REAL* `index` (5/95)

If you said in our `index` function, you are correct! Let's get rid of the one line of jquery that we hardcoded and replace it with a `fetch()` on our collection.

In the `index` function of `js/backbone/routers/grumble.js`:

```js
index: function(){
  App.Collections.grumbles.fetch()
}
```

If we look in our browser and refresh the page we can now see our listView at the index route.

## The *REAL* `new` - you do (20/115)
- change the function definition of `newGrumble` to render the listView as well as the form for a new grumble.
- test your route by adding `#new` to the end of the url.

## Break (10/125)

## URL updating (20/145)
Awesome, we've done some deep linking by setting up some routes. Everything works like it used too, we can even just go directly to the fragmented url `#new` and can see our form automatically renders without hitting the button.

> fragmented url is just the part of the url with the `#`. The optional last part of a URL for a document. Typically used to identify a portion of a document but additionally can trigger events in backbone.

The only issue is if we hit the button and the form goes away, the `#new` is still in the url. Additionally, when at the root route and we toggle the form, it doesn't update the url to include `#new`. Currently users have no way of referencing or bookmarking the state of the app unless they know the code base.

We want to add functionality so that the url updates as we change state in our application. We can do this by `.navigate()` on the instance of our grumble router.

Let's go into the console of our browser and execute this line of code:

```js
App.Routers.grumble.navigate("billybob")
```

> Note the `.navigate()` is being called on the router that we instantiated in `js/app.js`. The string argument that is passed in is the url fragment that will be added to the url.

When we hit enter, notice the change in the url. AWESOME!!!

(ST-WG) Knowing what we know about this last line of code we executed in the console of our browser, where can we utilize code similar to it in our application to update the url for our `new` route?

If we look at our `grumbleCreate` view we can see that we have a `toggleButton` function. I think this would be a great place to try out adding url updates.

In `js/backbone/views/grumbleCreate.js`:

```js
toggleButton: function(state){
  if(state === "New Grumble"){
    this.$(".new").text("Hide Form")
    App.Routers.grumble.navigate('grumbles/new')
  }else{
    this.$(".new").text("New Grumble")
    App.Routers.grumble.navigate('')
  }
}
```

Hmmm.. the function is called `toggleButton` and updating a url doesn't seem like it belongs there. Perhaps we should abstract this into another function so it's not so tightly coupled. Let's remove the `.navigate` calls from the `toggleButton` function and create a new function `toggleUrlState` that handles that logic.

In `js/backbone/views/grumbleCreate.js`:

```js
toggleButton: function(state){
  if(state === "New Grumble"){
    this.$(".new").text("Hide Form")
  }else{
    this.$(".new").text("New Grumble")
  }
},
toggleUrlState: function(state){
  if(state === "New Grumble"){
    App.Routers.grumble.navigate('')
  }else{
    App.Routers.grumble.navigate('grumbles/new')
  }
}
```

## Using an anchor tag. (5/150)

We can actually have an anchor tag that links directly to one of the deep links that we've created. Clicking on this link will actually fire off the call back that the router maps to that url.

> When we use the `.navigate()` function we can also pass in a second argument, an object with the key-value pair of `{trigger: true}`. That is when we navigate to that url it will in addition fire the call back associated with the route. Though this is generally bad practice as this is not the default behavior.

## Lunch

## Routing for editing a grumble - Overview (5/5)
So before we left off, we managed state in our application by updating urls and providing deep links for the index and new grumble route. The last state that we haven't encapsulated is the editing capability of our application.

It would be really nice if we could deep link to an edit form for a particular model. IE if I click on update Grumble it should update the url such that I can visit that url later and the edit form for that specific grumble is open.

In order for us to be able to identify a specific grumble we're going to need some sort of unique identifier. What might that be? (ST-WG)

An ID!!!

So an id will be somewhere in the url. Additionally that id will dynamically change depending on which grumble has the edit form open. We need to be able to pass in a params value from the url, and backbone allows us to do just that.

## Backbone params in the url (15/20)
Let's update our `routes` property in our router.

In `js/backbone/routers/grumble.js`:

```js
routes: {
  '': 'index',
  'grumbles/new': 'newGrumble',
  'grumbles/:id/edit': 'editGrumble'
}
```

> notice the `:id` in the path for the last route. This is a parameter value that we pass in as an argument to the callback.

Let's do something simple for now just so we can see the parameter value in a simple view that we append.

In `js/backbone/routers/grumble.js`:

```js
editGrumble: function(id){
  $("body").append("this is the params value in the edit route: " + id)
}
```

Let's go ahead and test this by refreshing the browser and appending `#grumbles/15/edit` to the browser. We can see that `this is the params value in the edit route: 15` gets rendered on to the page.

## Finding a way to get the view (20/40)
So we have a way to put an id in the URL, but that's really not enough. We need to get the model or view thats associated with that id.

Currently we have no way of doing that. (ST-WG) How might we go about finding a particular model or view associated by id?

We could look the collection that we instantiated. Fetch the collection from our database loop through each of the models to find the one we want by id, and then create a view and render the edit form of that view.

There's a problem with that though
- All of the views for each grumble exists already, we would be creating 2 views for one model.

If we look at our listView, we can see that we have a property, views. This array contains each individual grumble view. Why don't we create a function that accepts an id argument for our listView that loops through all of the individual views and returns the one that matches the id.

Add this function definition in `js/backbone/views/grumbleList.js`:

```js
findView: function(id){
  for(var i = 0; i < this.views.length; i++){
    if(this.views[i].model.get("id") == id){
      view = this.views[i]
    }
  }
  return view
}
```

## Rendering the edit form (15/55)
Now that we have the ability to target a specific view based on id. The rest is pretty simple! We want to call `fetch()` which triggers an event to render all of the grumbles. Inside of a promise afterward, we can run our `findView` function to get the view we need to call `renderEditForm()` on.

```js
editGrumble: function(id){
  App.Collections.grumbles.fetch().then(function() {
    view = App.Views.listView.findView(id);
    view.renderEditForm();
  });
}
```

## Break (10/65)

## Updating Urls for editing - you do (20/85)

Sick! Now we have deep linking for our edit routes. What's missing?

- In your JS, update the urls to reflect the state change in the DOM
- test your routes in the browser and see if the url updates when you click the edit grumble button

## You do- Grumble show route (remainder of class)
- Your job is to create a show route for individual grumbles.
- The idea is to have the routes `/grumbles/:id` map to view that shows 1 grumble and its comments.
- make sure this route is deep linked

### Bonus
- add a button to the the grumble view that allows a user to switch from the index view(all grumbles) to the show view of that grumble.
- When the button in the grumble view is clicked on the index view, it transitions that grumble view into the show view. And vice versa.
