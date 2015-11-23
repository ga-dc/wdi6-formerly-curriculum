# Express

## Learning Objectives
- Compare and contrast Javascript in the browser vs JS on the server
- Compare and contrast express JS to Rails && Sinatra.
- Use npm to manage project dependencies
- Use module.exports and require to organize code
- Use Handlebars templates to simplify rendering on the back-end
- Use and configure middleware like body-parser to handle form submissions
- Link to static assets in an Express application

## Opening Framing (15/15)
PKI(5 m) List out the things we've covered in class. It is SO much stuff. We've pretty much covered the entire stack. Everything we cover from here on out is an extension of what we've already learned or a different language than we're used to. Today we'll be talking about expressJS the "e" in the MEAN stack. Which incidentally is super buzz wordy right now. You've already used express, only the language was ruby and the framework was Sinatra. So you haven't actually used express, but you'll see many similarities. Express is a framework built on top of node.

> Node.js is not a framework. It is an application runtime environment that allows you to write server-side applications in javascript. Javascript that does not depend on a browser.

Frameworks like rails, are very opinionated frameworks. (st-wg) Express is much less so. There are holy wars over which frameworks are better for reason x or y, but they all pretty much do the same thing just with a different syntax. Today we'll be learning about express. Express by itself, is much more like Sinatra, it feels very manual.

## Hello World - Express (we do 30/45)
To start, Lets create a simple hello world express application.

In the terminal:
```bash
$ mkdir hello-express
$ cd hello-express
$ npm init
$ npm install --save express
```

What do you think npm is? (ST-WG)
> npm, short for node package manager. Allows us to install dependencies for our nodeJS application. Much like how gems did this for us in Rails.

`$ npm init` will initialize a new NodeJS application. Upon initialization it will prompt you for some user input to update the package.json.

If we hit enter and use all of the default values and we take a look at the contents of the package.json file, we'll see something like this:

```bash
$ cat package.json
{
  "name": "hello-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

> The `package.json` file contains meta data about your app or module. More importantly, it includes the list of dependencies to install from npm when running npm install.

The next thing I'd like to do is install the express node module. In the terminal:

```bash
$ npm install --save express
```

> the `--save` flag allows us to update the package.json to include the dependency you just installed.

Let's make a new file `$ touch application.js` and place the following contents. In `application.js`:

```javascript
var express = require("express")
var app = express()

app.listen(4000, function(){
  console.log("app listening on port 4000")
})
```

We've required the express module. We then create another variable that invokes the module. The app variable is where we can set up which port to listen to and the different requests the server should listen for.

If we run the application(`$ node application.js`) we can see in the terminal `app listening on port 4000` You'll notice that it doesn't allow us to exit this application until we hit `cntrl + c`. This means our server is running. Let's try going to the local host of that port number. In the browser enter `http://localhost:4000`.

In the browser we'll see something like :

```
CANNOT GET /
```

OH NOES, what's going on here?

Basically we've told the server what port to listen on, but we didn't specify what to do if a user goes to the `"/"` route. Let's update `application.js`:

```javascript
app.get("/", function(req, res){
  res.send("hello world")
})
```

```
CANNOT GET /
```

What gives? we added a route and specified the `"hello world"` string to send as the response. Let's try restarting the server.

`Hello World`

Cool. Man, that's really unfortunate that we have to restart the server every time we make an update to our files. What was the fix for that in Sinatra?

Turns out express has something similar, nodemon.

In the terminal:

```bash
$ npm install -g nodemon
```

> When using the -g flag, we're specifying that nodemon will now be a global dependency because we want to be able to utilize nodemon across all of our node applications.

Then we start up our application a bit differently now. In the terminal:

```bash
$ nodemon application.js
```

## Params in URL in Express (5/50)
Remember parameters in our ruby frameworks? It's very similar in JS. Let's update `application.js` to include:

```javascript
app.get("/:name", function(req, res){
  res.send("hello " + req.params.name)
})
```

## Break(10/60)

## You do: 99 Bottle of Beer(20/80)
The readme can be found [here](https://github.com/ga-dc/99_bottles_express)

## Views (20/100)
> One thing to note about views for today. We want to give you an initial introduction into how views can be generated through templating to achieve the same effects that erb did for us in Sinatra/Rails. However, during the course of this week, we won't be using to much server-side rendered views. Instead we'll be focusing more of this week on how we render views on the client side.

Let's leverage our [solution to 99 Bottles of Beer](https://github.com/ga-dc/99_bottles_express/tree/solution) to learn about views.

Remember how we utilized erb in Sinatra and rails?  We need to be able to do the same sort of templating with Express. For express we'll use handlebars. To install handlebars into our node application enter the following in the terminal:

```bash
$ npm install --save hbs
```

Then we need to set the view engine to be handle bars inside of the `application.js`:

```javascript
app.set("view engine", "hbs")
```

Let's go ahead and create a directory and some views. In the root directory of the express 99 bottles application. In the terminal:

```bash
$ mkdir views
$ touch views/index.hbs
$ touch views/layout.hbs
```

Let's change up our existing `application.js` to utilize a template rather than sending in a string directly.

In `application.js`:

```javascript
// instead of
// app.get("/:numberOfBottles?", function( req, res ){
//   var bottles = req.params.numberOfBottles || 99
//   var next = bottles - 1
//   if (bottles > 1){
//     res.send(bottles + " bottles of beer on the wall <a href='/" + next + "'>Take one down pass it around")
//   }
//   else{
//     res.send("1 bottle of beer on the wall <a href='/'>Start Over</a>")
//   }
// })

// we want this
app.get("/:numberOfBottles?", function( req, res ){
  var bottles = req.params.numberOfBottles || 99
  var next = bottles - 1
  res.render("index", {bottles: bottles, next: next})
})
```

> So instead of sending a string directly to the response of that get request, we instead want to render a view. The `.render` function takes two arguments here. The first is the view we want to render. The second argument is an object. We can use the keys in this object inside the view to access the values in these key-value pairs.

The only problem is our view is empty! Let's go ahead and change that now. In `views/layouts.hbs`:

```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
  </head>
  <body>
   {{{body}}}
  </body>
</html>
```

This is also a great time to note how we serve static assets. Notice we linked a stylesheet in our layout file. We are able to do this, because in our `application.js` we use `app.use(express.static(__dirname + '/public'))` in our code base. This allows us to utilize files in that folder in the layout.

Notice the `{{{body}}}` syntax. This is because Handlebars by default escapes HTML and you need the additional set of brackets to indicate that you want to render the tags in the body as HTML.

Finally we should update our index view to reflect the same strings we had before. In `views/index.hbs`:

```html
{{bottles}} bottles of beer on the wall.
{{#if next}}
  <a href='/{{next}}'>Take One Down, Pass it Around</a>
{{else}}
  <a href='/'>Start Over</a>
{{/if}}
```

> Like in ERB, we're able to use objects in our view. Additionally we can utilize control flow in our view as well!

## module.exports (20/120)
`module.exports` allows us to separate our js files by exposing their contents as one global variable. The global variable isn't assigned until we require the file.

For example:
```js
// aCustomModule.js
module.exports = {
  sayHello: function(){
    console.log("hello world")
  }
}
```

```js
// in app.js
// instantiate global variable to grant access to module we've created
var customModule = require("./aCustomModule.js")

// use variable to call the .sayHello(function) defined in aCustomModule.js
customModule.sayHello()
```

Well, we can actually separate our concerns using `module.exports` If we change our get request in `application.js`:

```js
app.get("/:numBottles?", routes.index )
```

to this instead. We could create a routes module that defines our index route. Lets create a `routes.js` file `$ touch routes.js` and place the following contents:

```js
module.exports = {
  index: function( req, res ){
    var numBottles = req.params.numBottles || 99
    var next = numBottles - 1
    res.render('index',{
      numBottles: parseInt(numBottles),
      next: next
    })
  }
}
```

> You can see that almost nothing has changed, really we just namespaced the functionality into a different file. What advantages does that bring to us with regard to separation of concerns in MVC? (st-wg)

You can start to see the neccessity of `module.export` when we start to add models to our application. If we had the 7 RESTful routes that rails have for each model, you can start to see how keeping everything in the `application.js` can begin to become unwieldy.

## Break (10/130)

## Bodyparser & Post requests (20/150)
We're going to leverage code from the [hello-express app](https://github.com/ga-dc/hello-express) we built earlier. I've added some hbs views so go ahead and clone this code if you want to follow along.

The first thing that I want to do is add a form to our `hello.hbs`:

```html
Hello {{name}}

<form action="/" method="post">
  <input type="text" name="name">
</form>
```

Let's go ahead and try entering a name and hitting enter:

```get CANNOT POST/```

How can we fix this?(st-wg) In `app.js`:

```js
app.post("/", function(req, res){
  res.send("can post")
})
```

Well it works, but it's not super valuable, we're not even getting our parameter. Let's add some stuff in `app.js`:

```js
app.post("/", function(req, res){
  res.send("hello " + req.params.name)
})
```

hello undefined... oh man.. and just to be sure let's `console.log(req.params)` . It's an empty object!

So we're not getting anything from params, turns out we need to install middleware in order to get form data and JSON data in a POST request for express applications. Rails and Sinatra already include the middleware to handle this(RACK). By default express does not, so we need to install it manually.

> middleware is code that runs in between receiving the request and responding. Body-parser used to be included to express, but they took it out. Why might they do that?

In the terminal:

```bash
$ npm install --save body-parser
```

In `app.js`:

```js
// configure app to use body parser
var bodyParser = require("body-parser")

app.use(bodyParser.json()) //handles json post requests
app.use(bodyParser.urlencoded({ extended: true })) // handles form submissions
```

Another thing to note is that, in express, `params` is always for parameters in the url. parameters in form data is `body`

So we change the final post request in app.js to:

```js
app.post("/", function(req, res){
  res.render("hello", {name: req.body.name})
})
```

## You do - Ultimate Complimate(if time allows)

## HW
You can find hw for tonight [here](https://github.com/ga-dc/do_something_express_part1)

## Sample Quiz Questions
- What is `npm`?

- Write a get request using any path as you would in an express application.

- How does `module.exports` help us with separation of concerns?
