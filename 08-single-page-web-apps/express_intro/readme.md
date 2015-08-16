# Express

## Learning Objectives
- Compare and contrast Javascript in the browser vs JS on the server
- Compare and contrast express JS to Rails && Sinatra.
- Use npm to manage project dependencies
- Use module.exports and require to organize code into models, views, and controllers
- Use Handlebars templates to simplify rendering on the back-end
- Use and configure middleware like body-parser to handle form submissions
- Link to static assets in an Express application

## Opening Framing (15/15)
PKI(5 m) List out the things we've covered in class. It is SO much stuff. We've pretty much covered the entire stack. Everything we cover from here on out is an extension of what we've already learned or a different language than we're used to. Today we'll be talking about expressJS. You've already used express, only the language was ruby and the framework was Sinatra. So you haven't actually used express, but you'll see many similarities. Express is a framework built on top of node.

> Node.js is not a framework. It is an application runtime environment that allows you to write server-side applications in javascript. Javascript that does not depend on a browser.

Frameworks like rails, are a very opinionated frameworks. (st-wg) Express is much less so. There are holy wars over which frameworks are better for reason x or y, but they all pretty much do the same thing just with a different syntax. Today we'll be learning about express.

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
The readme can be found [here](https://github.com/ga-dc/99_bottles_of_beer)
- Don't worry about the double bonus, and of course this will be in express instead of sinatra.

## Views
Remember how we utilized erb in Sinatra and rails?  We need to be able to do the same sort of templating with Express. For express we'll use handlebars. To install handlebars into our node application enter the following in the terminal:

```bash
$ npm install --save hbs
```

Then we need to set out view engine to be handle bars inside of the `application.js`:

```javascript
app.set("view engine", "hbs")
```
