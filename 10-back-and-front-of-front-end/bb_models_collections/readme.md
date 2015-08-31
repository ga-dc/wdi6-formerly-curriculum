# Backbone Models and Collections
## Learning Objectives
- Describe the benefits of using a front end framework
- Explain how libraries differ from frameworks.
- Define a new backbone model and create instances
- Perform CRUD actions on a backbone model
- Explain what a collection is in backbone
- Define a new backbone collection
- Use the backbone collection to store models
- Perform CRUD on a collection
- Associate a backbone model and collection with a rails backend
- Perform CRUD actions using backbone's RESTful API
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

What's the purpose of a front end framework? JS and all of it's many libraries are great, but you can start building and building your application and all of a sudden there's no structure and everything's soup.

### libraries (2.5/7.5)

- libraries gives us tools to utilize.
- abstracts code and allows us to write our code more succinctly
- allows us to write applications faster and easier
- lots of options, very few rules (jQuery)

### frameworks (2.5/10)

- like libraries in that it gives us tools to utilize
- additionally they provide structure and conventions users have to follow in order for them to work.
- Lots of rules (convention), few options (Ruby on Rails)

## What is a front end framework? (5/15)
- a library that attempts to move some or all application logic to the browser, while providing a simple interface for keeping the front-end in sync with the back-end
- applications can run completely in the browser, minimizing server load since the server is only accessed when the front end needs to synchronize data with the backend
- server sends over the app in the initial request (HTML/CSS/JS) then JS makes all subsequent requests with AJAX
- provides more fluid user experience
- loads everything from the database on page load (data and templates) then renders/updates the page content based on user interaction.


### What is backbone? (25/40)
Individual reading(10/25)
- Go to [backbonejs documentation](http://backbonejs.org/)
  - Read from Getting Started to Backbone.Model

### T&T(5/30)
- With what you know about OOJS, jot down some ideas about what you think Backbone is and why you would use it.

---
## Backbone JS (10/40)
- a js library that was built to mimic the rMVC structure of Rails
- router, views, models/collections
  - organize code into separate components that are able to interact fluidly with each other to build robust, client/browser based web applications
- not truly a "framework" in that there is much more flexibility and not nearly a rigidly defined structure like rails.
- meant be able to be changed/altered/configured to suit your needs
- provides objects that help separate concerns on the front end
- provides an interface, API, for communicating with a server back end

## Setup 20/60
Before we implement backbone for the application we're building this week, let's set up our file structure and our dependencies for a new static site!

We're going to create a static html application. Go ahead and create a new directory we're going to work in, let's call it `grumblr`. We're calling it grumblr but know that it's really just a single model CRUD application. I heard you guys like todo apps.

```bash
mkdir grumblr
cd grumblr
```

Lets make some folders and files we're going to need for our backbone application.

```bash
touch index.html
mkdir js
mkdir js/models
touch js/app.js
touch js/models/grumble.js
```

> Something to note, backbone doesn't yell at you for having your code in the wrong folders. However, going forward it will be nice for you and future you to separate our concerns. You will see the more of this importance when we get into backbone views and routing. Additionally note that we are just using a static `index.html` page to create this application. Backbone can sit on top of frameworks like rails and express as well. The configuration and setups can be a bit different depending on the domain you're working in.

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
  </head>
  <body>

  <script src="bower_components/jquery/dist/jquery.min.js"></script>
  <script src="bower_components/underscore/underscore-min.js"></script>
  <script src="bower_components/handlebars/handlebars.min.js"></script>
  <script src="bower_components/backbone/backbone-min.js"></script>
  <script src="js/models/grumble.js"></script>
  <script src="js/app.js"></script>
  </body>
</html>

```
> Order is very important here. Note that underscore is a dependency of backbone and that jquery is a dependency of underscore. As a result we load jquery first, then underscore, then backbone. Additionally we want our model definition to follow the backbone dependency because we will be using backbone abstractions inside of the model file. And finally we also include the main `app.js` which will require our model definitions.

> We could have also installed dependencies using CDN's or downloading the source code for the dependencies as well. Additionally we have install the handlebars dependency. We won't be using this one today, but we'll be needing it for views tomorrow.

## Break 10/70

## Backbone Models(50/120)
What's a model? What was it in rails?
To rehash:
An object that represents data attributes and behavioral logic related to an entity. It provides CRUD functionality for that data

Let's define our very first backbone model. In `js/models/grumble.js`:

```javascript
var Grumble = Backbone.Model.extend({

})

```
> Much like inheriting from `ActiveRecord::Base`. Were just extending backbone model functionality into our own model definitions.

Awesome! Let spin up our sweet website. (include a document ready and a console.log to show js/jquery dependency is working). In `js/app.js`:

```js
$(document).ready(function(){
  console.log("jq loaded!")
})

```

Let's go into the console and create our very first instance of a backbone model. `var grumble = new Grumble()` lets see what it's given us by typing in `grumble` and hitting enter.

cid?! whats that?
[id vs cid vs idAttribute](http://stackoverflow.com/questions/12169822/backbone-js-id-vs-idattribute-vs-cid)

TLDR version: cid is short for client id, cid is assigned by backbone.js client side and is useful if you don't have an actual id.

There's alot of other stuff happening here that backbone's doing but the important part of it is the attributes object nested within our backbone object.

### Getting and setting attributes
### Setting attributes(also updates)
Attributes can be set in a number of ways.
- We can set them on instantiation of the object ie
```js
var grumble = new Grumble({author: "bob", content: "learned backbone today!!"})
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
```js
var grumble = new Grumble()
```
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
grumble.has("attrbuteName")
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

## Backbone Collections (30/150)
What is a backbone collection? A collection acts as an intelligent wrapper for like models. It provides a set of methods for performing the CRUD operations on models of the collection. Create and edit the file `js/collections/grumbles.js`:

### Creating a collection
```javascript
var Grumbles = Backbone.Collection.extend({
  initialize:function(){
    console.log("created a new grumbles collection")
  },
  model: Grumble
})
```

We add the model as an attribute of the collection so that any objects we add to this collection will be passed in as objects of the Grumble Backbone model.

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

#### Getting models from collection
```javascript
// gets all models
grumbles.models

// get model based on cid
grumbles.get("c1")

// like active record you can use where to return an array of objects fitting the match
grumbles.where({attributeName: "valueOfAttribute"})
// findWhere finds the first match
grumbles.findWhere({attributeName: "valueOfAttribute"})
```

#### Removing models
```javascript
// removes accepts a single model object, a cid or array of model objects
grumbles.remove("c1")
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
So we've learned how to create backbone models and collections, but it'd be really nice if we could define our models/collections through an existing backend. Enter rails. But it doesn't have to be! But for the purposes of this class we'll use a nice and simple rails application that we've created for you.

You can pull the code for our backend [here](https://github.com/ga-dc/grumblr_rails_api)

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
Remember all that complex ajax stuff we used to get information from a server? Well BB abstracts all of that for you and makes it much easier. All we have to do is change up our model definition slightly! In `app/assets/javascripts/backbone/models/grumbleModel.js`:

```javascript
var Grumble = Backbone.Model.extend({
  urlRoot: "http://localhost:3000/grumbles",
  defaults: {

  }
});
```

Everything you did before is the same. The only difference now is if we want to make changes to the database. We just need to call `.save()` on the instance of the object.

```js
grumble.set({authorName: "bob", content: "smith", title: "the title", photoUrl: "http://placebear.com/400/400"})

grumble.save()
```

> If we have our rails application running, we can refresh the page and see our new grumble got saved to our database.

One thing to note is that the `.save()` function returns a promise object that allows us to use the object that was saved as an argument. Something like this:

```js
grumble.save().then(function(response){
  console.log(response)
})
```

> the response in this log is the object(key-value pairs) that was saved in the database.

### Collections
Now let's create our collection definition in `app/assets/javascripts/backbone/collections/grumblesCollection.js`:

```javascript
var GrumblesCollection = Backbone.Collection.extend({
  initialize: function() {
    console.log('New Grumbles Collection');
  },
  model: Grumble,
  url: '/grumbles'
});
```

Again, the rules are much the same for manipulating data within the collection.
Similarly to ActiveRecord there is a create method that can be called on a collection:

```javascript
collection.create({authorName: "bob", content: "smith", title: "the title", photoUrl: "http://placebear.com/400/400"})
```
will actually save an instance of that model to the database, so long as you meet the strong params requirements.

## Class Ex - Reminders Part 2 (60/150)
Look at the repo [here](https://github.com/ga-dc/reminder#part-2)
