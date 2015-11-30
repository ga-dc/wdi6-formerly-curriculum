# Express Routing

- Extract routes to separate files
- Describe the role of response methods
- Use module.exports and MVC to organize Express app
- Explain what `bodyParser` is used for
- Create an application that responds to JSON requests
- Explain what JSONP is and why we (sometimes) need it.

## Intro

You visit a page.  You click a link.  You fill in a form and press submit.  These are all requests.  Requests that are directed to a server.  That server needs to know how to respond to that request.  We map the request to the appropriate "controller" via routing.  In development, we spend a lot of time and effort mapping one thing to another.

## Request methods (10 min)

- http://expressjs.com/guide/routing.html
Read Routing, Route Methods, and Route Paths.  Stop at Route Handlers.

This should be familiar from the Express lesson.  Node doesn't provide the obvious separation of concerns that Rails provides, but it's still there.  Like Sinatra, we merge the route definition with the controller functionality.


``` javascript
app.METHOD(path, [callback...], callback)
```
- where `app` is an instance of express,
- `METHOD` is an HTTP request method,
- `path` is a path on the server, and
- `callback` is the function executed when the route is matched.

Let's create our express application `emergency_compliment` now:

```bash
$ mkdir emergency_compliment
$ cd emergency_compliment
$ npm init
$ npm install express --save
$ npm install hbs --save
$ mkdir controllers
$ mkdir views
$ mkdir views/compliments
$ touch index.js
```

### Exercise: Pair and Share: Write CRUD routes for a Compliment. (15 min)
Think back to rails. Write all the RESTful routes for a single model `Compliment` in express, don't worry about adding functionality to the callback for now. EX:

```js
app.get('/compliments', function(req, res){
  // code for compliment index route
})
```

## We do: Create controller module and index route

https://github.com/ga-dc/emergency_compliment

Create controller `controllers/complimentsController.js` and place the following:

```js
// controllers/complimentsController.js

var complimentsController = {
  index: function(req,res){
    res.render("compliments/index.hbs", {compliments:[]});
  }
}
```

Create view `views/compliments/index.hbs` and place the following:

```html
<!-- views/compliments/index.hbs -->
<ul>
  {{#each compliments}}
    <li>{{this}}</li>
  {{/each}}
</ul>
```

In `index.js`:

```js
var express = require("express");
var app = express();
var complimentsController = require("./controllers/complimentsController");

app.get("/compliments", complimentsController.index);

app.listen(3000, function(){
  console.log("app listening at http://localhost:3000/");
})
```

## You do: Create show, edit, and update routes (15 min)

Add methods to your `complimentsController`

## I do: Create model

```js
// index.js
var compliment = require('./models/compliment')
```

```js
// models/compliment

var compliments = [
  "Your instructors love you",
  "High five = ^5",
  "Is it Ruby Tuesday yet?",
  "It's almost beer o'clock",
  "The Force is strong with you"
];

var Compliment = function(){

}

Compliment.all = function(){
  return compliments;
}

module.exports = Compliment;
```

```js
// controllers/complimentsController.js
// compliment model is required in ../index.js

var Compliment = require("../models/compliment");

var complimentsController = {
  index: function(req, res){
    res.render('index', {compliments: Compliment.all()});
  }
}

module.exports = complimentsController;
```

> Bonus: show a random color when the page loads

## I Do: Forms, bodyParser, and creating compliments

```html
<!-- views/compliments/new.hbs -->
<form action="/compliments" method="post">
  <input type='text' name='compliment'>
  <input type='submit' value='Create New Compliment'>
</form>
```

```js
// models/compliment.js

Compliment.create = function(compliment){
  compliments.push(compliment)
  return compliment
}
```

```js
// index.js

app.post("/compliments/?:format?", complimentsController.create);
```


See [first express lesson](../07-apis-express-ajax/express_intro/readme.md) for
more on forms and bodyParser.

http://stackoverflow.com/a/33986576/850825 for put and delete

### res.redirect

We used this in the first exercise.

``` js
// root route
app.get('/', function (req, res){
  res.redirect('/songs');
});
```

## You do: edit compliments

Write an edit route which renders a form to update a compliment.

Write an update route which takes the form data and updates the compliment.

Hint: For now, you can use `Compliment.all()[:id] = new_data` to update the
compliment.

## Break

## Response Methods (20 min)

> Q. What kind of responses have we given so far?
---

A. html and json.


The [docs](http://expressjs.com/guide/routing.html#response-methods) share many more.

### res.json

That `res.json` looks handy.  The link takes us to http://expressjs.com/4x/api.html.  If you search for
`res.json([body])`, we'll find what we are looking for.

"This method is identical to res.send() with an object or array as the parameter. However, you can use it to convert other values to JSON, such as null, and undefined. (although these are technically not valid JSON)."

## Let's build a compliment api

>People would actually use this. Ask Robin about his million click moment.

## I do: api

http://stackoverflow.com/a/12984730/850825

In short, we'll add some code that modifies each request to indicate the client
wants JSON if the request ends in `.json`.

```js
// index.js

app.use("*.json",function (req, res, next) {
  req.headers.accept = 'application/json';
  next();
});

app.get("/compliments/?:format?", complimentsController.index)
```

```js
// controllers/complimentsController.js

module.exports = {
  index: function(req, res){
    res.format({
      html: function(){
        res.render("compliments/index.hbs",{compliments: Compliment.all()});
      },
      json: function(){
	res.json(Compliment.all());
      }
    })
  }
}
```

### You do: Create, update delete routes

* Implement a create route which creates a new compliment using JSON
* Implement update routes for JSON (no need for edit)
* Implement a delete route to delete a compliment by ID (index)

### res.jsonp

http://dabble.site/jsonp.html (view source)

#### You do: 

Read the question and answer about JSON with padding - http://stackoverflow.com/questions/2067472/what-is-jsonp-all-about

http://expressjs.com/api.html#res.jsonp

## Conclusion

- What is the purpose of routing?
- What are the three ways we can specify a path?
- Name a request method other than GET, POST, PATCH, PUT, or DELETE.
- In node, how do we reference code in other files?

## Resources
- http://expressjs.com/guide/routing.html
- Really like the organization I see in [this tutorial](https://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/)
- Looking for more?  We recommend NodeSchool's [ExpressWorks](https://github.com/azat-co/expressworks)
- [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/?_ga=1.256234632.2070291842.1433362238)

## Conclusion

- What action do you expect this route to perform: `app.post('/authors', function() {...}`?
- Explain the `req` and `res` variables in `app.get('/authors', function(req, res){...})`
- Write a root route that redirects to '/authors'.
