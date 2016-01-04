# MongoDB
## Learning Objectives

- Compare and contrast relational to document based (NoSql)
- Setup local mongo db server
- CRUD documents using mongo CLI
- Use an ORM to persist data (Mongoose)
- Connect ORM to an Express app, to persist data

## Opening

Well, we've come full circle ... again. What we're learning today isn't fundamentally that different from what we know. We're going to learn a different way to store information. A document-based non-relational way. We've learned a considerable amount of information about relational databases. We join on foreign keys in relational databases in order to query our database. Sometimes these joins can get really expensive to query the database. When dealing with less complex associations, non relational databases can be more effective. We've also seen that schema's in SQL(relational DB's) are fairly rigid. Adding columns can be taxing(migrations). Also if we delete a row in a table that is being used as a foreign key in another table, we must delete all the rows associated with that foreign key before we can delete the parent object. Mongo provides a more flexible, scalable solution for less complex domain models.

> This is not to say that mongo is a better solution than postgres or other SQL libraries, but an alternative solution.


MongoDB is an open-source **document database** that provides:
- High Performance
- High Availability
- Automatic Scaling

## Document Database?

### A basic example of a `Person` document:

```json
{
  "name": "Sue",
  "age": 26,
  "status": "Active",
  "groups": ["sass", "express"]
}
```
---
TPS: What do you see?

### A Document

- json
- different data types
- even arrays

### More complicated example of a `Restaurant` document:

```json
{
   "_id" : ObjectId("54c955492b7c8eb21818bd09"),
   "address" : {
      "street" : "2 Avenue",
      "zipcode" : "10075",
      "building" : "1480",
      "coord" : [ -73.9557413, 40.7720266 ],
   },
   "borough" : "Manhattan",
   "cuisine" : "Italian",
   "grades" : [
      {
         "date" : ISODate("2014-10-01T00:00:00Z"),
         "grade" : "A",
         "score" : 11
      },
      {
         "date" : ISODate("2014-01-16T00:00:00Z"),
         "grade" : "B",
         "score" : 17
      }
   ],
   "name" : "Vella",
   "restaurant_id" : "41704620"
}
```

## Documentation

https://www.mongodb.org



## Documents

### A record in MongoDB is a document

- a data structure composed of field(key) and value pairs.
  - similar to JSON objects.
  - stored as BJSON
- fields may include other documents, arrays, and arrays of documents.
- analogous to rows in a table

## Collections

MongoDB stores documents in collections.

- Collections are analogous to tables in relational databases.
- does **NOT** require its documents to have the same schema.
- documents stored in a collection must have a unique `_id` field that acts as a primary key.

## [Installation](https://docs.mongodb.org/getting-started/shell/tutorial/install-mongodb-on-os-x/)

### Install

```
brew update
brew install mongo
```

You should see:
```
mongodb: stable 3.0.7 (bottled), devel 3.1.2
```

### Start mongo:

```
mongod --config /usr/local/etc/mongod.conf
```

You should see:

`nothing`
> no news is good news



### More info?

```
brew info mongo
```

## Mongo shell

### Start the shell

```
$ mongo
```

> feels a little bit like a JS REPL

You should see:

```
MongoDB shell version: 3.0.3
connecting to: test
>
```

### Help

```
help
```

ThinkShare (2min):
- What jumps out as important?
- Try it

## What jumped out to me
- `show dbs`: show database names
- `show collections`:  show collections in current database
- `use <db_name>`: set current database
- `db.foo.find()`: list objects in collection foo

Also:

- `<tab>` key completion
- `<up-arrow>` and the `<down-arrow>` for history.

In the mongo REPL we want to connect to create/connect to a database.

We *want* to work with the `restaurants` database:

```
use restaurant_db
```

Verify:
```
> db
restaurant_db
```

Common Mistake:
`show dbs`
> note we don't see restaurants listed. It isn't until we add a document to our database does it list the DB in `show dbs`

## CLI: Create a record

### Insert

- use `insert()` to add documents to a collection

### Insert a restaurant

``` json
db.restaurants.insert(
   {
      name: "Cookies Corner",
      "address" : {
         "street" : "1970 2nd St NW",
         "zipcode" : 20001,
      },
      yelp: "http://www.yelp.com/biz/cookies-corner-washington",
});
```

> The db is the database we're connected to. In this case, `restaurant_db`. `.restaurants` is then referring to a collection in our `restaurant_db`. We use the `.insert()` to add the document inside the parentheses.

### Verify the insert
```
> show collections
restaurants
system.indexes
```
Note: restaurants

```
> db.restaurants.find()
```

- name
- address
- yelp

What is surprising/unexpected?

- where did restaurants come from?
- `_id`?
- [ObjectId](https://docs.mongodb.org/manual/reference/object-id/)

## Review `insert`
```
// insert
db.your_collection_name.insert({ data as json })
// find
db.your_collection_name.find()
```

New Record:
- If the document passed to the insert() method does not contain the _id field, the mongo shell automatically adds the field to the document and sets the field’s value to a generated ObjectId.

New collection:
- If you attempt to add documents to a collection that does not exist, MongoDB will create the collection for you.

## Dropping a Database

```
use milk-n-cookies
db.dropDatabase()
```

Drops the **current** database.

### Exercise (5 minutes): Add a few more restaurants.

ProTip: I recommend you construct your statements in your editor and copy/paste.  It will help you now & later.

> Prompt: Did anyone insert multiple at one time?

Let's recreate the steps together:
Where are we now?
```
db
```

1. Create DB
2. Use the appropriate DB
3. Insert multiple restaurants

``` mongo
db.restaurants.remove({});
db.restaurants.insert([
  {
      name: "Cookies Corner",
      "address" : {
         "street" : "1970 2nd St NW",
         "zipcode" : 20001,
      },
      yelp: "http://www.yelp.com/biz/cookies-corner-washington"
  },
  { name: "The Blind Dog Cafe", address: { street: "944 Florida Ave",
        zipcode: 20001 }, yelp: "http://www.yelp.com/biz/the-blind-dog-cafe-washington-2?osq=cookies" },
  {name: "Birch & Barley", address: { street: "1337 14th St NW", zipcode: 20005}, yelp: "http://www.yelp.com/biz/birch-and-barley-washington?osq=Restaurants+cookies"},
  {name: "Captain Cookie and the Milk Man", address: { street: "Dupont Circle", zipcode: 20036 }, yelp: "http://www.yelp.com/biz/captain-cookie-and-the-milk-man-washington-5" },
  {name: "J’s Cookies", address: { street: "1700 N Moore St", zipcode: 22209}, yelp: "http://www.yelp.com/biz/js-cookies-arlington" }
])
db.restaurants.count()
```

## [Primary key](http://docs.mongodb.org/manual/reference/glossary/#term-primary-key)

- A record’s unique immutable identifier.
- RDBMS: usually *id* field, typically an *Integer*
- MongoDB: the *_id* field, usually a *[BSON](http://docs.mongodb.org/manual/reference/glossary/#term-bson) [ObjectId](http://docs.mongodb.org/manual/reference/glossary/#term-objectid)*.

## CLI: Find records

Find all:
```mongo
db.restaurants.find()
```

### Find by Conditions (like `where`)

Key: Value pairs
```mongo
db.restaurants.find({name: "Cookies Corner"});
db.restaurants.find({"address.zipcode": 20001});
```

## Helpful References
- [Mongo to SQL Mapping Chart](http://docs.mongodb.org/manual/reference/sql-comparison/)
- [CRUD Intro](http://docs.mongodb.org/manual/core/crud-introduction/)
- [CRUD Commands](http://docs.mongodb.org/manual/reference/crud/)
- [bios Collection](http://docs.mongodb.org/manual/reference/bios-example-collection/)


## CLI: Update a record(s)

http://docs.mongodb.org/manual/core/write-operations-introduction/

```
> db.your_collection.update(
  { criteria },  
  { $set: { assignments }},
  { options }
)
```

### You do (10 min):

Update a restaurants to have a new key-value par `{state: "DC"}`

```
> db.restaurants.update(
  {"name": "Cookies Corner"},
  { $set: { state: "DC" }}
)
```
```
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

> the first key value pair find the document you'd like to update, the second is what values you'd like to set and third is any additional options

Verify:
```
> db.restaurants.find()
```

## CLI: Remove records

```
db.restaurants.remove({ conditions })
```

## CLI: Add a nested object

> We already did this! (The address 'object' / 'subdocument')

## Key Advantages

- Usability
- High Performance
- High Availability
- Automatic Scaling
- No SQL :)

### Usability

- Documents (i.e. objects) correspond to native data types in many programming languages.
- Schema-less, less need to manage migrations
- Dynamic schema supports fluent polymorphism.

### High Performance

- Embedded documents and arrays reduce need for expensive joins (reduces I/O).
- Indexes support faster queries and can include keys from embedded documents and arrays.

### High Availability

MongoDB’s replication facility, called replica sets, provide:

- automatic failover.
- data redundancy.

replica set:
> is a group of MongoDB servers that maintain the same data set, providing redundancy and increasing data availability.

### Automatic Scaling

- Automatic sharding distributes data across a cluster of machines.
- Replica sets can provide eventually-consistent reads for low-latency high throughput deployments.

# [No SQL?](https://www.mongodb.com/nosql-explained)

## ST-WG (10min): Which database would you choose for?
- Blog: Posts have_many Comments
- HR app: Companies have_many Managers have_many Employees
- Gallery: Artists have_many Paintings

## Come up with your own examples, for both


## Vote for your best example for:

- RDBMS
- Document Database



![mongoose.js](https://www.filepicker.io/api/file/KDQZV88GTIaQn6p0GagE)

---

## http://mongoosejs.com

## Why?

> Let's face it, writing MongoDB validation, casting and business logic boilerplate is a drag.

That's why we wrote Mongoose.

Review example on [mongoosejs.com](http://mongoosejs.com)

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  console.log('meow');
});
```

Ok well thats nice. But let's see how mongoose plays with express by building an app called [reminders](https://github.com/ga-dc/reminders_mongo)

## Reminders- Schema, Models & Seeds

Lets create a brand new express application and grab up all the dependencies we'll need

```bash
$ mkdir reminders_mongo
$ cd reminders_mongo
$ npm init
$ npm install express --save
$ npm install hbs --save
$ npm install body-parser --save
$ npm install method-override --save
$ npm install mongoose --save
$ touch index.js
```

> The 5 dependencies we'll be using for this app are:
  1. `express` - web Frameworks
  2. `hbs` - view engine
  3. `body-parser` - allows us to get parameter values from forms
  4. `method-override` - allows us to do put/delete requests in our hbs views
  5. `mongoose` - our Mongo ORM

Let's first start by defining our schema, models and creating some seed data.

Folders/files:

```bash
$ mkdir db
$ mkdir models
$ touch models/author.js
$ touch models/reminder.js
$ touch db/schema.js
$ touch db/seeds.js
```

Just like in `active-record` we will define the structure of our database using schemas

Instead of defining tables we'll be defining documents.

In `db/schema.js`:

```js
// requiring mongoose dependency
var mongoose = require('mongoose')

// instantiate a name space for our Schema constructor defined by mongoose.
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

// defining schema for reminders
var ReminderSchema = new Schema({
  body: String
})

// defining schema for authors.
var AuthorSchema = new Schema({
  name: String,
  reminders: [ReminderSchema]
})

// setting models in mongoose utilizing schemas defined above
var AuthorModel = mongoose.model("Author", AuthorSchema)
var ReminderModel = mongoose.model("Reminder", ReminderSchema)
```

> Note the syntax for reminders  in the `AuthorSchema`. This signifies it will be an array of reminder documents

Next, let's define our models that will provide the interface for queries and other logic.

In `models/author.js`:

```js
require("../db/schema")
var mongoose = require('mongoose')

var AuthorModel = mongoose.model("Author")
module.exports = AuthorModel
```

In `models/reminder.js`:

```js
require("../db/schema")
var mongoose = require('mongoose')

var ReminderModel = mongoose.model("Reminder")
module.exports = ReminderModel
```

> In these model files, were setting an export to a mongoose model.

> `var AuthorModel = mongoose.model("Author")` is kind of like `class Author < ActiveRecord::Base`

Great now that we have an interface for our models, lets create a seed file so we have some data to work with in our application.

In `db/seeds.js`:

```js
var mongoose = require('mongoose')
var conn = mongoose.connect('mongodb://localhost/reminders')
var AuthorModel = require("../models/author")
var ReminderModel = require("../models/reminder")
AuthorModel.remove({}, function(err){
  console.log(err)
})
ReminderModel.remove({}, function(err){
  console.log(err)
})

var bob = new AuthorModel({name: "bob"})
var susy = new AuthorModel({name: "charlie"})
var tom = new AuthorModel({name: "tom"})

var reminder1 = new ReminderModel({body: "reminder1!!"})
var reminder2 = new ReminderModel({body: "reminder2!!"})
var reminder3 = new ReminderModel({body: "reminder3!!"})
var reminder4 = new ReminderModel({body: "reminder4!!"})
var reminder5 = new ReminderModel({body: "reminder5!!"})
var reminder6 = new ReminderModel({body: "reminder6!!"})

var authors = [bob, susy, tom]
var reminders = [reminder1, reminder2, reminder3, reminder4, reminder5, reminder6]

for(var i = 0; i < authors.length; i++){
  authors[i].reminders.push(reminders[i], reminders[i+3])
  authors[i].save(function(err){
    if (err){
      console.log(err)
    }else {
      console.log("author was saved")
    }
  })
}
```

Now that we've got all of our models and seed data set. Let's start building out the reminders application. Let's update our main application file to include the dependencies we'll need.

In `index.js`:

```js
// express dependency for our application
var express = require('express')
// loads mongoose dependency
var mongoose = require('mongoose')
// loads dependency for middleware for paramters
var bodyParser = require('body-parser')
// loads dependency that allows put and delete where not supported in html
var methodOverride = require('method-override')
// loads module containing all authors contrller actions. not defined yet...
var authorsController = require("./controllers/authorsController")
// connect mongoose interfaces to reminders mongo db
mongoose.connect('mongodb://localhost/reminders')
var app = express()
// sets view engine to handlebars
app.set("view engine", "hbs")
// allows for parameters in JSON and html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
// allows for put/delete request in html form
app.use(methodOverride('_method'))
// connects assets like stylesheets
app.use(express.static(__dirname + '/public'))

// app server located on port 4000
app.listen(4000, function(){
  console.log("app listening on port 4000")
})

// first route we'll define together ...
app.get("/authors", authorsController.index)
```
## Authors Index - We do

As we can see on the last line of the code above, we have just one route. It's using `authorsController.index` as a callback, but it hasn't been defined yet. Let's define it now.

```bash
$ mkdir controllers
$ touch controllers/authorsController.js
```

In `controllers/authorsController.js`:

```js
var AuthorModel = require("../models/author")
var ReminderModel = require("../models/reminder")

var authorsController = {
  index: function(req, res){
    AuthorModel.find({}, function(err, docs){
      res.render("authors/index", {authors: docs})
    })
  }
}

module.exports = authorsController;
```

> We use our model definitions from before to query our database. In our `index` action, we're doing a mongoose query for all Author documents. Upon success we render the view `authors/index` and pass in the object `{authors: docs}`. `docs` contains all the `Author` documents.

We're rendering a handlebars view that doesn't exist yet. Lets create it now as well as our layout view.

```bash
$ mkdir views
$ mkdir views/authors
$ touch views/layout.hbs
$ touch views/authors/index.hbs
```

In `views/layout.hbs`:

```
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
  </head>
  <body>
    <header>
      <h1><a href="/authors">Reminder.ly?</a></h1>
    </header>
   {{{body}}}
  </body>
</html>
```

In `views/authors/index.hbs`:

```
<a href="/authors/new">New Author</a>
{{#each authors}}
  <div class="author">
    <div class="authorName"><a href="/authors/{{_id}}">{{name}}</a></div>
    {{#each reminders}}
      <p class="reminder">{{body}}</p>
    {{/each}}
    <br>
  </div>
{{/each}}
```

> For each author, we display a link to that author's show page(which doesn't exist yet..), the author's name, as well as all the reminders that belong to them.

## Author's Show and New - You do
Create Author's Show page
- update `index.js` to include a route for an author's show page
- have it map to an action in `controllers/authorsController.js` called `show`
  - HINT!: Instead of `.find()` try `.findById`
- create a `views/authors/show.hbs` that has the following:
  - all of the author's reminders
  - a form for creating a new reminder(it's ok your form doesn't do anything right now)
  - a link to edit the author
  - a link to the authors index page

Create Author's New page
- update `index.js` to include a route for an author's new page
- have it map to an action in `controllers/authorsController.js` called `new`
- create a `views/authors/new.hbs` that has the following:
  - form to create new author(it's ok your form doesn't do anything right now)

## Creating a new author - We do
Our `views/authors/new.hbs` should look something like this:

```
<h2>Create new Author</h2>
<form action="/authors" method="post">
<label>Name:</label>
<input type="text" name="name">
<input type="submit">
</form>
```

Lets setup our `index.js` to listen for that post request.

```js
app.post("/authors", authorsController.create)
```

Finally, let's update our controller to include the create action that creates a new Author document.

In `controllers/authorsController.js`:

```js
create: function(req, res){
  var author = new AuthorModel({name: req.body.name})
  author.save(function(err){
    if (!err){
      res.redirect("authors")
    }
  })
}
```

> We're grabbing the form input using `req.body.name` and then creating a new `Author` document then saving it. Upon save it will redirect to the authors index page.

## Creating and deleting nested documents - We do

If you followed along the you do for show(`views/authors/show.hbs`), it should look something like this:

```
<h2>Reminders for {{name}}</h2>
<div>
  {{#each reminders}}
    <div class="reminders-show-each">
      <p>{{body}}</p>
    </div>
  {{/each}}
</div>

<div id="reminder-new">
  <h3>New Reminder</h3>
  <form action="/authors/{{_id}}/reminders" method="post">
    <label>Body</label>
    <input type="text" name="body">
    <input type="submit">
  </form>
</div>
```

Let's define a route and a controller action for creating reminders under an author document.

In `index.js`:

```js
app.post("/authors/:id/reminders", authorsController.addReminder)
```

In `controller/authorsController.js`:

```js
addReminder: function(req, res){
  AuthorModel.findById(req.params.id, function(err, docs){
    docs.reminders.push(new ReminderModel({body: req.body.body}))
    docs.save(function(err){
      if(!err){
        res.redirect("/authors/" + req.params.id)
      }
    })
  })
}
```

> In this callback, we're finding an author by the id in the url. Then when we find it, we're going to push a new `Reminder` document to that author and save the author with that new reminder.

Next, let's create the functionality to delete reminders as we complete them. Lets update our `views/authors/show.hbs` to include a form for deleting for each reminder:

```
{{#each reminders}}
  <div class="reminders-show-each">
    <p>{{body}}</p>
    <form method="post" action="/authors/{{../_id}}/reminders/{{_id}}?_method=delete">
        <input type="submit" value="Done!">
    </form>
  </div>
{{/each}}
```

> The actions a little weird. In order to get the id of our parent object we use `../_id`. This will also be true of any other attributes we'd want from the parent object. Another weird thing is `?_method=delete`. This was the best work around we could find using `method-override` dependency to allow for `PUT` and `DELETE` requests in html forms on express.

Now we just need set a route and a controller action.

In `index.js`:

```js
app.delete("/authors/:authorId/reminders/:id", authorsController.removeReminder)
```

In `controllers/authorsController.js`:

```js
removeReminder: function(req, res){
  AuthorModel.findByIdAndUpdate(req.params.authorId, {
    $pull:{
      reminders: {_id: req.params.id}
    }
  }, function(err, docs){
    if(!err){
      res.redirect("/authors/" + req.params.authorId)
    }
  })
}
```

> This is an alternate sytax `.findByIdAndUpdate()`. We can actually us this method and pass in an options object. In this case, we're setting a key of `$pull`. This will find the reminder by the id specified in the url(`req.params.id`) and get rid of it from the author. Then upon success of `.findByIdAndUpdate()` it redirects tot hat author's show page.

## Authors Edit/Update/destroy
Using what you've learned in class, set up edit update and destroy for authors.

## Cliff Notes

### Example Schema

```js
var mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

var ChildSchema = new Schema({
  body: String
})

var ParentSchema = new Schema({
  name: String,
  children: [ChildSchema]
})

var ParentModel = mongoose.model("ParentModel", AuthorSchema)
var ChildModel = mongoose.model("ChildModel", ReminderSchema)
```

### Some Example routes

```js
app.get("/authors", authorsController.index)
app.get("/authors/new", authorsController.new)
app.post("/authors", authorsController.create)
app.get("/authors/:id", authorsController.show)
```

### Some Example Controller actions

```js
var authorsController = {
  index: function(req, res){
    AuthorModel.find({}, function(err, docs){
      res.render("authors/index", {authors: docs})
    })
  },
  new: function(req, res){
    res.render("authors/new")
  },
  create: function(req, res){
    var author = new AuthorModel({name: req.body.name})
    author.save(function(err){
      if (!err){
        res.redirect("authors")
      }
    })
  },
  show: function(req, res){
    AuthorModel.findById(req.params.id, function(err, docs){
      res.render("authors/show", docs)
    })

  }
}
```

### Helpful mongoose queries
```js
// finds all documents of specified model type can also use to specify key value pair in query
Model.find({}, callback)

// finds model by id
Model.findById(someId, callback)

// removes document that match key value
Model.remove({someKey: someValue}, callback)
```
