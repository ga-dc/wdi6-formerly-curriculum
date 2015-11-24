# Express Routing

- Extract routes to separate files
- Support multiple functions for a single route
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

### Exercise: Pair and Share: Write basic CRUD routes for a Song. (15 min)

https://github.com/ga-dc/song_routes_express

Note: earlier reading did not discuss :id placeholders


## Route Paths (10 min)

Research: Back to the docs for [Routing Paths](http://expressjs.com/guide/routing.html#route-paths)(5 min).

> Q. What are the 3 ways to indicate a route?
---

- Straight, exact string match.
- String pattern
- Regular Expression

What are you likely to use?  You've already seen them.  The exact match of a string and the specific string pattern (colon) that captures a value.  If we have time, I've included an optional, light intro to Regular Expressions.

- String
``` js
app.get("/songs" ...
```

- String pattern
``` js
app.get('/songs/:id' ...
```

That covers the request end of routing.  On to the response.

## Response Methods (20 min)

> Q. What kind of responses have we given so far?
---

A. html and json.


The [docs](http://expressjs.com/guide/routing.html#response-methods) share many more.

### res.json

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

### res.jsonp

You will hear more about this in the Single Page Application lesson.  ???

## Exercise: The Bowling Game (45 min)

https://github.com/ga-dc/bowling_game_express

- 4 min:  Read through the docs.  If you aren't familiar with how to score a bowling game, just skim the rules for now.  You don't need the scoring details... yet.

> Q. What do we know about this application?
---

Discuss:
- a bowling game
  - bowl, knock down pins, add to score
- routes
  - bowl (POST): What does this return?  What are side-effects?
  - score (GET): What does this return?  What are side-effects?
  - hint: At some point, you are going to want to reset your game, reset/start route
- basic scoring - open frames only
- dependencies
- tests are totally optional (mocha -w)
  - Require
    - start(GET)
    - bowl/:pins (POST)
    - score (GET), returns `{score: value}`


It's been about 10 minutes. We have reviewed the project.  We have a handle on dependencies and routes.  You've run "mocha -w" and you've seen that your app doesn't fare too well. :)  

> Q. What are our first steps?
---

- avoid strike/spare
- score (GET)
  - route work?
  - { score: 0 }
- bowl/:pins (POST)
  - avoid strike/spare
  - change score?
- reset sore

> Q: Examples?
---

On whiteboard:
- Start: {score: 0}
- Roll/0: {score: 0}
- Roll/1: {score: 1}
- Roll/5: {score: 5}
- Multiple frames: easy scoring
- Whole game: all gutter balls
  - It's right about here you are wishing you had automated tests.
- Whole game: all 1 pin

Go to it.  We'll check in in 10 minutes.

- (10/25 min) CFU: Fist to 5, Who wants to me to share returning a score?  bowl/:pins updates score?

- (20/45 min): Expect "gutter game", "single pin game", and "partial game, no closed frames" work.

## exports (20 min)

In order to simplify your index.js, you will find it helpful to extract your routes to separate files.

### I Do: Extract example Song's routes to a separate file

https://github.com/ga-dc/song_routes_express

Steps:
- Create song_routes.js
- extract song related routes to song_routes.js
  - make available via `exports`;
- `require` extracted routes

There are many ways to handle the exports. I really like the organization I'm seeing in [this tutorial](https://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/).  So, I wrapped my routes in a `setup` function, make that available via `exports`, and call that from "index.js".

song_routes.js:
```
function setup(app) {
  // songs#index
  app.get(...
}

exports.setup = setup;
```

index.js:
```
...
var song_routes = require('./song_routes');
song_routes.setup(app);
```

This makes "index.js" smaller and easier for me to "parse".  To be honest, I prefer to put my route files in a "controllers/" dir.  But, since there is only one here, I fought that urge.  Even now, I kind of regret it.  For the full solution, see branch "solution_extract_routes".

## Exercise: Extract your Bowling Game routes to a separate file (15 min)

Your index.js should shorten considerably.  Hopefully, letting you see more of the big picture.


## Conclusion

- What is the purpose of routing?
- What are the three ways we can specify a path?
- Name a request method other than GET, POST, PATCH, PUT, or DELETE.
- In node, how do we reference code in other files?

## Resources
- http://expressjs.com/guide/routing.html
- Really like the organization I see in [this tutorial](https://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/)
- Looking for more?  We recommend NodeSchool's [ExpressWorks](https://github.com/azat-co/expressworks)


### Express Route Tester

Similarly, let's take a look at the [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/?_ga=1.256234632.2070291842.1433362238).  It can be a handy tool for testing basic Express routes.


## Conclusion

- What action do you expect this route to perform: `app.post('/authors', function() {...}`?
- Explain the `req` and `res` variables in `app.get('/authors', function(req, res){...})`
- Write a root route that redirects to '/authors'.
