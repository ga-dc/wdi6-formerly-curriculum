# Express Routing

- Define the parts of a route
- Extract routes to separate files
- Explain the `all` routing method
- Support multiple functions for a single route
- Describe the role of response methods

## Request methods (10 min)

- http://expressjs.com/guide/routing.html
Read Routing, Route Methods, and Route Paths.  Stop at Route Handlers.

This should be familiar from the Express lesson.

``` javascript
app.METHOD(path, [callback...], callback)
```
- where `app` is an instance of express,
- `METHOD` is an HTTP request method,
- `path` is a path on the server, and
- `callback` is the function executed when the route is matched.

### You Do, Pair and Share: Write basic CRUD routes for a Song. (15 min)

- Follow RESTful conventions
- Just the route, returning a helpful message.

Like this...

``` javascript
var express = require('express');
var app = express();

// songs#index
app.get('/songs', function (req, res) {
  res.send('GET index of Songs');
});
```

---

Note: earlier reading did not discuss :id placeholders

``` js
var express = require('express');
var app = express();

app.listen(4000, function(){
  console.log("app listening on port 4000");
});


// root route
app.get('/', function (req, res){
  res.redirect('/songs');
});

// songs#index
app.get('/songs', function (req, res) {
  res.send('GET index of Songs');
});

// songs#new
app.get('/songs/new', function (req, res) {
  res.send('GET to gather info for a new Song');
});

// songs#show
app.get('/songs/:id', function (req, res) {
  res.send('GET to show Song:' + req.params.id);
});

// songs#create
app.post('/songs', function (req, res) {
  res.send('POST to create a Song');
});

// songs#edit
app.get('/songs/:id/edit', function (req, res) {
  res.send('GET to gather info to update Song:' + req.params.id);
});

// songs#update
app.patch('/songs/:id', function (req, res) {
  res.send('PATCH to update Song:' + req.params.id);
});

// songs#delete
app.delete('/songs/:id', function (req, res) {
  res.send('DELETE Song:' + req.params.id);
});
```

## Other Request methods (15 min)

### app.head()

The [docs](http://expressjs.com/guide/routing.html#route-methods) list 26 request methods.  So far, we've used 5 (GET, POST, PUT, PATCH, DELETE).

The only other one that I've used is `HEAD`.  Sometimes, we just want a little information.  According to [RFC2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
> This method (HEAD) can be used for obtaining metainformation about the entity implied by the request without transferring the entity-body itself.

Meta-information about the entity.

> Q. Why might we want that?
---

A. The RFC goes on to say, "This method is often used for testing hypertext links for validity, accessibility, and recent modification."

Speed, small payload, find out if something has changed.

[Thx StackOverflow](http://stackoverflow.com/a/1461973/232247)

"The reason why HEAD is preferred to GET is due to the absence of the message body in the response making it using in scenarios where you want to determine if the content has changed at all - a change in the last modified time or content length usually signifies this.

Also, a HEAD request will provide some information about the server setup (whether it is IIS/Apache etc.), unless the server was masked; of course, this is available in all responses, but HEAD is preferred especially when you don't know the size of the response. HEAD is also the easiest way to determine if a site is up or down; again the irrelevance of the message body makes HEAD the ideal candidate."

### app.all()

If you need to process something no matter what the request method is (BET, POST, PUT, etc), then `all` is a good choice.

> Q. When would we use this?
---

Cross cutting concerns.  Like authentication, authorization, and loading the parent of a nested route.

``` js
app.all('*', requireAuthentication, loadUser);
```

## Route Paths (10 min)

Back to the docs for [Routing Paths](http://expressjs.com/guide/routing.html#route-paths)

> Q.

---


### Express Route Tester

[Express Route Tester](http://forbeslindesay.github.io/express-route-tester/?_ga=1.256234632.2070291842.1433362238) can be a handy tool for testing basic Express routes

## Exercise: Write route paths to support each route. (15 min)

???

## Response Methods (20 min)

> Q. What kind of responses have we given so far?
---

A. html and json.


The [docs](http://expressjs.com/guide/routing.html#response-methods) share many more.

That `res.json` looks handy.  THe link takes us to http://expressjs.com/4x/api.html.  If you search for
`res.json([body])`, we'll find what we are looking for.

"This method is identical to res.send() with an object or array as the parameter. However, you can use it to convert other values to JSON, such as null, and undefined. (although these are technically not valid JSON)."

Did we miss one or two?

### res.redirect

We used this in the first exercise.

``` js
// root route
app.get('/', function (req, res){
  res.redirect('/songs');
});
```

### res.render

Andy covered this.  It's used to render a view template with your chosen templating language.


## Exercise: The Bowling Game (30 min)

https://github.com/ga-dc/bowling_game

## exports (20 min)

In order to simplify your index.js, you will find it helpful to extract your routes to separate files.

### I Do: Extract example Song's routes to a separate file


## Exercise: Extract your Bowling Game routes to a separate file (15 min)



## Resources
- http://expressjs.com/guide/routing.html
- Looking for more?  We recommend NodeSchool's [ExpressWorks](https://github.com/azat-co/expressworks)
