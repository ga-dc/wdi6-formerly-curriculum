# Backbone Models and Collections
## Screen Casts
[Video 1](https://www.youtube.com/watch?v=llq2O25g8kY)
[Video 2](https://www.youtube.com/watch?v=I2pQXRhCYc0)
[Video 3](https://www.youtube.com/watch?v=06Mzemj9vaE)
[Video 4](https://www.youtube.com/watch?v=XvrWxUOrAkE)
[Video 5](https://www.youtube.com/watch?v=kdzyPt26SmY)

## Learning Objectives
- Describe the benefits of using a front end framework
- Explain how libraries differ from frameworks.
- Define a new Backbone model and create instances
- Perform CRUD actions on a Backbone model
- Explain what a collection is in Backbone
- Define a new Backbone collection
- Use the Backbone collection to store models
- Perform CRUD on a collection
- Associate a Backbone model and Collection with a rails backend
- Perform CRUD actions using Backbone's RESTful API
- Compare BB models with AR models

## Opening Framing (5/5)

How we got here:

1. vanilla js
  - a lot of code to write

2. jQuery
  - easier to do more
  - easier to write more bad code

3. OOJS
  - more structured but a royal pain to write

4. Frameworks
  - All the structure of OOJS with the ease of writing like jQuery.

What's the purpose of a front end framework?
> JS and all of it's many libraries are great, but you can start building your application and all of a sudden there's no structure and everything's soup.

### Libraries (2.5/7.5)

- Libraries give us tools to utilize.
- abstracts code and allows us to write our code more succinctly
- allows us to write applications faster and easier
- lots of options, very few rules (jQuery)

### Frameworks (2.5/10)

- like libraries in that it gives us tools to utilize
- additionally, they provide structure and conventions users have to follow in order for them to work.
- Lots of rules (convention), few options (Ruby on Rails)

## What is a Front End Framework? (5/15)
- a library that attempts to move some or all of a application's logic to the browser, while providing a simple interface for keeping the front-end in sync with the back-end
- applications can run completely in the browser, minimizing server load since the server is only accessed when the front end needs to synchronize data with the backend
- server sends over the app in the initial request (HTML/CSS/JS) then JS makes all subsequent requests with AJAX
- provides more fluid user experience
- loads everything from the database on page load (data and templates) then **renders/updates** the page content based on user interaction.


### What is [Backbone](http://backbonejs.org/#)? (25/40)
**Doc Dive (10/25)**
- Go to [backbonejs documentation](http://backbonejs.org/#Getting-started)
  - Read from Getting Started to Backbone.Model
  - Check out some [examples](http://backbonejs.org/#examples) of Backbone in the wild

### T&T(5/30)
With what you know about OOJS, jot down some ideas about:
- What problem does Backbone aim to solve?
- When or why would you use Backbone?
- How might you use Backbone components in conjunction with other technologies?
- How would you compare/contrast it to Angular.js?

---
## Backbone JS (10/40)
- The brainchild of [Jeremy Ashkenas](https://github.com/jashkenas), creator of CoffeeScript, Underscore.js, and Backbone.js, and self-proclaimed Rubyist
- A JS library that was built to mimic the rMVC structure of Rails
- Router, Views, Models/Collections
  - Allows us to organize code into separate components that are able to interact fluidly with each other to build robust, client/browser based web applications
- Not truly a "framework" in that there is much more flexibility and not nearly a rigidly defined structure like Rails.
- Meant be able to be changed/altered/configured to suit your needs
- Provides objects that help separate concerns on the front end
- Provides an interface, API, for communicating with a server back end

> A common problem with large JS web application developed is that they can become pretty messy really quickly. The lack of structure makes the code hard to maintain. This is where Backbone comes into play. It provides structure to organize the code and increase maintainability. Backbone has a vibrant community and it’s also being fully used in production for a considerable number of big companies like: Wal-Mart mobile, Groupon, Khan Academy, Pandora, Wordpress, Foursquare, and so on.

## Setup 20/60
Now that we have a bit of a high level overview of Backbone, let's build our first app with it!

Before we implement Backbone, let's set up our file structure and load our dependencies for a new static site!

We're going to create a static HTML application. Go ahead and create a new directory we're going to work in, let's call it `grumblr_backbone`.

Ahh, our old friend 'Grumblr'! We are using a familiar domain both because its a single model CRUD app we know, but also to illustrate that we will be using the same back-end as we did for angular!

```bash
mkdir grumblr_backbone
cd grumblr_backbone
```

Lets make some folders and files we're going to need for our Backbone application.

```bash
touch index.html
mkdir js
mkdir js/models
touch js/app.js
touch js/models/grumble.js
```

> Something to **note**: Backbone doesn't yell at you for having your code in the wrong folders. However, going forward it will be nice for you and future you to separate our concerns. You will see the more of this importance when we get into Backbone views and routing. Additionally **note** that we are just using a static `index.html` page to create this application. Backbone can sit on top of frameworks like Rails and Express as well. The configuration and setups can be a bit different depending on the domain you're working in.

Great, now that we have our app's structure in place, let's load the necessary dependencies for Backbone.

### Bower
Bower is a package manager that allows us to manage dependencies. To install it we run:

```bash
npm install -g bower
```

Additionally, we also want to install all of the dependencies we'll be needing for this application:

```bash
bower install jquery
bower install handlebars
bower install underscore
bower install backbone
```
Let's make sure we include these dependencies in our `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Grumblr!</title>

    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/underscore/underscore-min.js"></script>
    <script src="bower_components/handlebars/handlebars.min.js"></script>
    <script src="bower_components/backbone/backbone-min.js"></script>

    <script src="js/app.js"></script>
    <script src="js/models/grumble.js"></script>
  </head>
  <body>

  </body>
</html>

```
> **Order** is very important here. Note that underscore is a dependency of Backbone and that jquery is a dependency of underscore. As a result we load jquery first, then underscore, then Backbone. Additionally, we want to require our main `app.js` file, which will help stich together our app's components. Finally, we want include our model definition to follow the Backbone dependency because we will be using Backbone abstractions inside of the model file.

> We could have also installed dependencies using CDN's or downloading the source code for the dependencies as well. Additionally we have installed the handlebars dependency. We won't be using this one today, but we'll be needing it for views tomorrow.

## Break 10/70

## Backbone Models(50/120)
**Q:** What's a model? What was it in Rails?

**A:** A [Model](http://backbonejs.org/#Model) is an object that represents data attributes and behavioral logic related to an entity. It provides CRUD functionality for that data. This encapsulation allows us to keep our business logic out of the view, and instead allow the view to render or update based on a *"change"* event. These events are triggered whenever a UI action causes an attribute of a model to change.

Here's a look of how the model fits into Backbone's MVC
![MVC](http://backbonejs.org/docs/images/intro-model-view.svg)

Let's define our very first Backbone model. In `js/models/grumble.js`:

```javascript
var Grumble = Backbone.Model.extend({

})

```
> Much like inheriting from `ActiveRecord::Base`. Were just extending Backbone model functionality into our own model definitions.

Awesome! Let spin up our sweet website by running `http-server` from the command line and navigating to `localhost:8080`. Make sure to include a `document.ready` and a `console.log` to show js/jquery dependency is working). In `js/app.js`:

```js
$(document).ready(function(){
  console.log("jq loaded!")
})

```

Let's go into the console and create our very first instance of a Backbone model. `var grumble = new Grumble()` lets see what it's given us by typing in `grumble` and hitting enter.

cid?! whats that?
[id vs cid vs idAttribute](http://stackoverflow.com/questions/12169822/backbone-js-id-vs-idattribute-vs-cid)

TLDR version: cid is short for client id, cid is assigned by Backbone.js client side and is useful if you don't have an actual id.

There's a lot of other stuff happening here that Backbone's doing but the important part of it is the attributes object nested within our Backbone object.

## Getting and setting attributes
Just like in Active Record, our Backbone Models have attributes attached to them that represent the data in our app and normally correspond to the columns in our model's table in our DB

### Setting attributes(also updates)
Attributes can be set in a number of ways.
- We can set them on instantiation of the object, i.e:
```js
var grumble = new Grumble({author: "bob", content: "learned Backbone today!!"})
```
- We can set them on an existing objects
```js
grumble.set("difficulty", 5)
```
```js
grumble.set({timeOfDay: "morning", visibility:"daytime"})
```
  - can also set functions as attributes
  ```javascript
  grumble.set({
    logBody: function(){
      console.log(this.content)
    }
  })
  ```
- we can also use `attributes`
```js
grumble.attributes.newAttribute = "this is a new attribute"
```
- We can also set defaults in the model definition.
in `js/models/grumble.js`:
```javascript
Grumble = Backbone.Model.extend({
  defaults:{
    content: "the default content!"
  }
})
```
Now if we to create a new grumble instance
```js
var grumble = new Grumble()
```
We would be able to see our default content in that grumble's `attributes`

### Getting attributes

```js
grumble.get("attributeName")
```
```js
grumble.attributes.attributeName
```

> `.get` / ` .set` are generally preferred over direct access via `.attributes`

### Deleting attributes

```js
grumble.unset("attributeName")
```
check with:
```js
grumble.has("attributeName")
```

remove all attributes of a model with:
```js
grumble.clear()
```

### Initialize
Backbone models also come with an initialize function(like ruby classes)
```javascript
var Grumble = Backbone.Model.extend({
  defaults:{
    completed: false
  },
  initialize: function(){
    console.log("new grumble!")
  }
})
```

### You-Do: Play with BB Models (5 mins)
With a partner, take 5 minutes to play around with our new Model.
Reference the [docs](http://backbonejs.org/#Model) to see all available methods for Backbone models.
- Practice getting and setting properties and explore how the `changed` attribute works

**Questions on BB models?**

## Backbone [Collections](http://backbonejs.org/#Collection) (30/150)
What is a Backbone collection?
Backbone collections are simply an ordered set of models. A collection acts as an intelligent wrapper for similar models. Collections also come with their own set of methods for performing the CRUD operations the models of a collection.

![Collections](http://backbonejs.org/docs/images/intro-collections.svg)

Create and edit the file `js/collections/grumbles.js`, and make sure to link to that file it in your `index.html`:

### Creating a collection
```javascript
var Grumbles = Backbone.Collection.extend({
  initialize:function(){
    console.log("New Grumbles collection created!")
  },
  model: Grumble
})
```

We add the model as an attribute of the collection so that any objects we add to this collection will be formatted as objects of the Grumble Backbone model.

#### Setting models on collections
How are models added to a collection?
```javascript
// on instantiation of collection
var grumbles = new Grumbles([grumble1, grumble2, grumble3])

// set on existing collection
grumbles.set([grumble1, grumble2])

// added to existing collection
grumbles.add(grumble1)
```

In our Browser's console, let's add some models and practice creating a collection:

```javascript
var grumble1 = new Grumble({content: "Grumble1"})
var grumble2 = new Grumble({content: "Grumble2"})
var grumble3 = new Grumble({content: "Grumble3"})

var grumbles = new Grumbles([grumble1, grumble2, grumble3])
```

#### Getting models from collection
```javascript
// gets all models
grumbles.models

// get model based on cid
grumbles.get("c1")

// like Active Record you can use where to return an array of objects fitting the match
grumbles.where({attributeName: "valueOfAttribute"})

// findWhere finds the first match
grumbles.findWhere({attributeName: "valueOfAttribute"})
```

#### Removing models
```javascript
// removes accepts a single model object, a cid or array of model objects
grumbles.remove("c3")
grumbles.remove(objectVariable)
grumbles.remove([grumble1, grumble2])

// reset if passed in an array of objects removes all models and replaces with the passed in model objects, if no argument is passed in, resets collection to have no models
grumbles.reset([grumble1, grumble2])
grumbles.reset()
```

#### Also of note
Collections can use the following:
- push
- pop
- unshift
- shift
- length

## Lunch
## Class Ex - Reminders Part 1(30/30)
Look at the repo [here](https://github.com/ga-dc/reminder#part-1)

## AJAX /w BB (60/90)
So we've learned how to create Backbone Models and Collections, but so far we have been hard-coding our data, instead it would be great if we could fetch the data for our models/collections through an existing backend. For the purposes of this class, we'll use a nice and simple Rails application that we've created for you.

You can pull the code for our backend API [here](https://github.com/ga-dc/grumblr_rails_api)

After you fork/clone this repo, go ahead and run standard setup for a rails app:

```bash
$ cd grumblr_rails_api
$ bundle install
$ rake db:create
$ rake db:migrate
$ rake db:seed
$ rails s
```

### Models
Remember all that complex ajax stuff we used to get information from a server? Well BB abstracts all of that for you and makes it much easier. All we have to do is change up our model definition slightly! In `js/models/grumble.js`:

```javascript
var Grumble = Backbone.Model.extend({
  urlRoot: "http://localhost:3000/grumbles",
  defaults: {

  }
});
```

Everything you did before is the same. The only difference now is if we want to make changes to the database. We just need to call `.save()` on the instance of the object.

```javascript
var grumble = new Grumble({authorName: "Charlie", content: "Dayman, fighter of the Nightman", title: "The Nightman Cometh", photoUrl: "http://ak-hdl.buzzfed.com/static/2013-10/enhanced/webdr01/14/20/enhanced-buzz-2646-1381796229-3.jpg"})
grumble.save()
```

> If we have our Rails Application running, we can refresh the page and see our new grumble got saved to our database.

One thing to note is that the [`.save`](http://backbonejs.org/#Model-save) method returns a deferred object that allows us to use the object that was saved as an argument. Something like this:

```js
grumble.set({content: "Champion of the sun"})
grumble.save().then(function(response){
  console.log(response)
})
```

> The `response` in this log is the object(key-value pairs) that was saved in the database.

## Break

### Collections
Collections can also be set up to interface with our back-end API.

Let's change our collection definition in `js/collections/grumbles.js`:

```javascript
var GrumblesCollection = Backbone.Collection.extend({
  initialize: function() {
    console.log('New Grumbles Collection');
  },
  model: Grumble,
  url: "http://localhost:3000/grumbles"
});
```

Again, the rules are much the same for manipulating data within the collection.

Similarly to ActiveRecord there is a [`create`](http://backbonejs.org/#Collection-create) method that can be called on a collection:

```javascript
Grumbles.create({authorName: "bob", content: "smith", title: "the title", photoUrl: "http://placebear.com/400/400"})
```

`create` will actually save an instance of that model to the database, so long as you meet the strong params requirements.

Another common method that you will use on a collection is [`fetch`](http://backbonejs.org/#Collection-fetch).
`fetch` is used to grab all the models from the server, and set them on the collection, i.e.

```javascript
var grumbles = Grumbles.fetch()
```

There is also an additional hash of options you can pass for `fetch`, that allow you to control the triggering of events. For example, to fetch a collection, getting an `add` event for every new model, and a `change` event for every changed existing model, without removing anything: `Grumbles.fetch({remove: false})`

## Class Ex - Reminders Part 2 (40/130)
Look at the repo [here](https://github.com/ga-dc/reminder#part-2)

## Refactoring and Best Practices (20/150)
Let's do a quick overview of our app so far.
Does anything jump out where we know we can help set ourselves up for future success?
What about anything we used as best practices with Angular.js following style guides?

### IIFE's and Global Objects
Looking at our current model and collection definitions:

in `js/models/grumble.js`
```javascript
var Grumble = Backbone.Model.extend({
  urlRoot: "http://localhost:3000/grumbles",
  initialize: function(){
    console.log("New Grumble Model Created")
  }
})
```

And in `js/collections/grumbles.js`
```javascript
var Grumbles = Backbone.Collection.extend({
  initialize:function(){
    console.log("new Grumbles collection Created ")
  },
  model: App.Models.Grumble,
  url: '/grumbles'
})
```

Ohhh, currently we are defining our app's model and collection in the global namespace!?!

Instead, Backbone developers favor grouping all of our app's components under one global `App` object, so let's do this as well.

In `js/app.js`, add the global object at the top of the file (before the `document.ready`) like:

```javascript
App = {
  Models: { },
  Collections: { },
  Views: { }
}
```

Great! Now, we need to go back and update our definitions to make sure to namespace them under our global `App` object.
It's also a good idea to go ahead and include IIFEs to further protect the scope of our components.  

Our updated model in `js/models/grumble.js` becomes:

```javascript
(function(){
  App.Models.Grumble = Backbone.Model.extend({
    urlRoot: "http://localhost:3000/grumbles",
    initialize: function(){
      console.log("New Grumble Model Created")
    }
  })
})()
```

and our updated collection in `js/collections/grumbles.js` becomes:

```javascript
(function(){
  App.Collections.Grumbles = Backbone.Collection.extend({
    initialize:function(){
      console.log("new Grumbles collection Created ")
    },
    model: App.Models.Grumble,
    url: "http://localhost:3000/grumbles"
  })
})()
```

Awesome, now we're no longer over polluting the global namespace. Up next, we'll learn about how to use views to interface with our data and provide the UI for our app!

## Homework
No deliverables-finish up reminders part2 and any left over in-class work

## Sample Quiz Questions
- Is Backbone an example of a library or a front end Framework? Defend your answer
- Why do we define our Backbone models with `Backbone.Model.extend({...})` and our collections with models with `Backbone.Collection.extend({...})`?
- What are Backbone.js' dependencies?

## Resources
- [What's a Model?](https://cdnjs.com/libraries/backbone.js/tutorials/what-is-a-model/)
- [What's a Collection?](https://cdnjs.com/libraries/backbone.js/tutorials/what-is-a-collection/)
- [Backbone Fundamentals (Awesome Free eBook)](https://addyosmani.com/backbone-fundamentals)
- [Backbone Example Sites, Tutorials, and Blog Posts](https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites)
- [Backbone Design Patterns](http://ricostacruz.com/backbone-patterns/index.html)
- [Comprehensive Backbone Tutorial](http://javascriptissexy.com/learn-backbone-js-completely/)
