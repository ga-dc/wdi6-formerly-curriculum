# Backbone Routers

- Explain what role a router plays in a front-end application.
- Identify the router's role in the Backbone MVC model.
- List the responsibilities of the Backbone router.
- Define static routes, actions and initialize a router.
- Define dynamic routes.
- Give examples of using :params in routes and actions.
- Recall the order in which routes are matched.
- Describe of trigger as it applies to actions and routes


## Opening Framing (5/5)
We have the makings of a pretty sick single page application now. We've got mostly full CRUD functionality for both grumbles and comments and things are even looking alot better thanks to Robin's bootstrap styles. As it stands we've got all the functionality we wanted in our MVP, but there's just one thing that's missing.

## State (10/15)
Let's look at [gmail](https://mail.google.com/)

As I click through this page, notice the url bar at the top of our browser. When I click on the inbox the last part of the url changes to `/#inbox` and as i click through various options it continues to update the URL. There are no page refreshes happening though.

Additionally, if I enter that url into another window, assuming i'm in the same session I'll be routed to that exact place. That's pretty neat. I think it would be really nice if that same sort of behavior existed within our grumblr application. It just so happens we can extend functionality out of backbone to execute this kind of behavior for us. Backbone Routers.

## Backbone Routers (15/25)
### Doc Dive (8~)
[Read from Backbone.Router to the `route` subsection ](http://backbonejs.org/#Router)

- Backbone routers are used for routing your applications URL's
- provides linkable, bookmarkable, shareable URLs for important locations in the app.
- The routes hash maps URLs with parameters to functions on your router

In the backbone stack, it's kind of this omnipresent entity of your application. It can instantiate collections and views. It's aware of the URL and its current state by updating the URL in conjunction with functionality of the View objects as events occur. Additionally it knows which functions to execute depending on the URL.

This all sounds great...but let's actually build out some routing functionality for our application

## Setup (10/35)
If you don't already have it, make sure you have the [grumblr_rails_api](https://github.com/ga-dc/grumblr_rails_api)

> re: see `bb_models_collection` lesson plan for installation instructions

Next, in your `grumblr_backbone` repo pull down the `routing_starter` branch.

```bash
$ git checkout -b routing_starter
$ git pull origin routing_starter
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

> We got rid of our collection instantiation and view instantiationsbecause that will be the job of the router. Additionally we created another name space in our global `App` object for `Routers`

The next thing we should do is create a file for our router defintion and link it in our `index.html`. In the terminal:

```bash
$ touch js/backbone/routers/grumble.js
```

In `index.html`:
```html
<script src="js/backbone/routers/grumble.js"></script>
```

## Define Backbone Router `index` route(I do - 10/45)
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

## Define a `new` route (You do - 10/55)
- add another key-value pair to the routes object in the router
- define a call back function to append the string "New route was called" to the body
- make sure the call back fires off based on the fragment url `#new`
- test the route by opening the `index.html` in your browser and adding `#new` to the URL.

## Break (10/65)

## Initialize
So this is all really great, but really it's not doing anything but appending a hard coded string into the DOM. Really what we want to be doing is creating views that reflect the state the DOM based off of the URL.
