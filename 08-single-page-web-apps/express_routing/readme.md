# Express Routing

- Define the parts of a route
- Extract routes to separate files
- Explain the `all` routing method
- Support multiple functions for a single route
- Describe the role of response methods


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


### [Optional] Regular Expression, light (20 min)

We are throwing these regular expressions at you again.  It's high time we shared a little about them.  Regular expressions are a specialized syntax for matching portions of text. In js and ruby, a RegEx is wrapped in forward slashes (`/expression/`).

I am going to show you a few example in [Rubular](http://rubular.com), a Ruby regular expression editor.

Enter "a" as the regular expression and add some fruits to "Your test string".

> Q. What is it doing?
---

Correct.  It's indicating everywhere the letter "a" appears.  In most applications, we would use this to indicate if the string had an "a" contained somewhere in it.  

F0r instance, if we wanted to match routes that had the word "song" in then, we would use `/song/`.

Take a minute to review the the Regex Quick Reference at the bottom of Rubular.  Try the other example from the docs: `/.*fly$/`

> Q. What are the `.`, `*`, and `$` used for?
---

From the docs, that regex "will match butterfly, dragonfly; but not butterflyman, dragonfly man, and so on".  Let me break it down... this RegEx matches all strings that:
- start with anything `.*` and
- end in `fly$`.  

The dollar sign indicates "End of line".  To be honest, I think that is the same as `/fly$/`.  Let's try it.


This is by no means a thorough overview of RegExes, but it should be enough to get you started.  One of the most powerful features of RegEx's is "capture groups". You indicate portions of the string should be captured for later use - but that, is for another lesson.

### Express Route Tester

Similarly, let's take a look at the [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/?_ga=1.256234632.2070291842.1433362238).  It can be a handy tool for testing basic Express routes.
