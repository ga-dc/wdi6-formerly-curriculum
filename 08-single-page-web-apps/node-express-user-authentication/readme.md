# Local Authentication with Express and Passport

## Learning Objectives

- Create a login form with email & password
- Use passport-local to find a user & verify their password
- Restrict access to API without an authenticated user

## Preparation

- Create an express application and add CRUD/REST resources
- Create a Mongoose Model
- Describe an authentication model

## Passport and the logics - Intro (5 mins)

From the [passport website](http://passportjs.org/docs):

"_Passport is authentication Middleware for Node. It is designed to serve a singular purpose: authenticate requests. When writing modules, encapsulation is a virtue, so Passport delegates all other functionality to the application. This separation of concerns keeps code clean and maintainable, and makes Passport extremely easy to integrate into an application._

_In modern web applications, authentication can take a variety of forms. Traditionally, users log in by providing a username and password. With the rise of social networking, single sign-on using an OAuth provider such as Facebook or Twitter has become a popular authentication method. Services that expose an API often require token-based credentials to protect access._"

### Strategies

The main concept when using passport is to register _Strategies_.  A strategy is a passport Middleware that will create some action in the background and execute a callback; the callback should be called with different arguments depending on whether the action that has been performed in the strategy was successful or not. Based on this and on some config params, passport will redirect the request to different paths.

Because strategies are packaged as individual modules, we can pick and choose which ones we need for our application. This logic allows the developer to keep the code simple - without unnecessary dependencies - in the controller and delegate the proper authentication job to some specific passport code.


## Implementing Passport.js - Codealong (25 mins)

#### Setup/Review Starter Code

First, clone the starter code

    $ git clone https://github.com/ga-dc/express-passport-local-authentication.git

and setup with `npm install` to ensure that we have all of the correct dependencies.

The starter-code is structured like this:

```
.
└── app
    ├── app.js
    ├── config
    │   ├── passport.js
    │   └── routes.js
    ├── controllers
    │   └── users.js
    │   └── statics.js
    ├── models
    │   └── user.js
    ├── package.json
    ├── public
    │   └── css
    │       └── bootstrap.min.css
    └── views
        ├── index.hbs
        ├── layout.hbs
        ├── login.hbs
        ├── secret.hbs
        └── signup.hbs

7 directories, 12 files
```

Now let's open the code up in Atom with `atom .`.

#### Users & Statics Controller

Let's have a quick look at the `users.js` controller. As you can see, the file is structured like a module with 6 empty route handlers:

```
// GET /signup
// POST /signup
// GET /login
// POST /login
// GET /logout
// Restricted page
```

The statics controller, just has the home action.

#### Routes.js

We have separated the routes into a separate file, to remove them from the app.js file.

#### Signup

First we will implement the signup logic. For this, we will have:

1. a route action to display the signup form
2. a route action to receive the params sent by the form

When the server receives the signup params, the job of saving the user data into the database, hashing the password and validating the data will be delegated to the strategy allocated for this part of the authentication, this logic will be written in `config/passport.js`

Open the file `config/passport.js` and add:

```javascript
var LocalStrategy   = require('passport-local').Strategy;
 var User            = require('../models/user');

 module.exports = function(passport) {
   passport.use('local-signup', new LocalStrategy({
     usernameField : 'email',
     passwordField : 'password',
     passReqToCallback : true
   }, function(req, email, password, callback) {

   }));
};
```

Here we are declaring the strategy for the signup - the first argument given to `LocalStrategy` is a hash giving info about the fields we will use for the authentication.

By default, passport-local expects to find the fields `username` and `password` in the request. If you use different field names, as we do, you can give this information to `LocalStrategy`.

The third argument will tell the strategy to send the request object to the callback so that we can do further things with it.

Then, we pass the function that we want to be executed as a callback when this strategy is called: this callback method will receive the request object; the values corresponding to the fields name given in the hash; and the callback method(`done`) to execute when this 'strategy' is done.

Now, inside this callback method, we will implement our custom logic to signup a user.

```javascript
  ...
  }, function(req, email, password, callback) {
    // Find a user with this e-mail
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return callback(err);

      // If there already is a user with this email
      if (user) {
	return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
      } else {
      // There is no email registered with this emai
	// Create a new user
	var newUser            = new User();
	newUser.local.email    = email;
	newUser.local.password = newUser.encrypt(password);

	newUser.save(function(err) {
	  if (err) throw err;
	  return callback(null, newUser);
	});
      }
    });
  }));
  ....

```

First we will try to find a user with the same email, to make sure this email is not already use.

Once we have the result of this mongo request, we will check if a user document is returned - meaning that a user with this email already exists.  In this case, we will call the `callback` method with the two arguments `null` and `false` - the first argument is for when a server error happens; the second one corresponds to the user object, which in this case hasn't been created, so we return false.

If no user is returned, it means that the email received in the request can be used to create a new user object. We will, therefore create a new user object, hash the password and save the new created object to our mongo collection. When all this logic is created, we will call the `callback` method with the two arguments: `null` and the new user object created.

In the first situation we pass `false` as the second argument, in the second case, we pass a user object to the callback, corresponding to true, based on this argument, passport will know if the strategy has been successfully executed and if the request should redirect to the `success` or `failure` path. (see below).

#### User.js

The last thing is to add the method `encrypt` to the user model to hash the password received and save it as encrypted:

```javascript
  User.methods.encrypt = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
```

As we did in the previous lesson, we generate a salt token and then hash the password using this new salt.

That's all for the signup strategy.

#### Route Handler

Now we need to use this strategy in the route handler.

In the `users.js` controller, for the method `postSignup`, we will add the call to the strategy we've declared

```javascript
  function postSignup(request, response) {
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/signup',
      failureFlash : true
    });

    return signupStrategy(request, response);
  }
```

Here we are calling the method `authenticate` (given to us by passport) and then telling passport which strategy (`'local-signup'`) to use.

The second argument tells passport what to do in case of a success or failure.

- If the authentication was successful, then the response will redirect to `/`
- In case of failure, the response will redirect back to the form `/signup`


#### Session

We've seen in previous lessons that authentication is based on a value stored in a cookie, and then, this cookie is sent to the server for every request until the session expires or is destroyed. This is a form of [serialization](https://en.wikipedia.org/wiki/Serialization).

To use the session with passport, we need to create two new methods in `config/passport.js` :

```javascript
  module.exports = function(passport) {

    passport.serializeUser(function(user, callback) {
      callback(null, user.id);
    });

    passport.deserializeUser(function(id, callback) {
      User.findById(id, function(err, user) {
          callback(err, user);
      });
    });
  ...

```

What exactly are we doing here? To keep a user logged in, we will need to serialize their user.id to save it to their session. Then, whenever we want to check whether a user is logged in, we will need to deserialize that information from their session, and check to see whether the deserialized information matches a user in our database.

The method `serializeUser` will be used when a user signs in or signs up, passport will call this method, our code then call the `done` callback, the second argument is what we want to be serialized.

The second method will then be called every time there is a value for passport in the session cookie. In this method, we will receive the value stored in the cookie, in our case the `user.id`, then search for a user using this ID and then call the callback. The user object will then be stored in the request object passed to all controller methods calls.

## Flash Messages - Intro (5 mins)

Remember Rails? Flash messages were one-time messages that were rendered in the views and when the page was reloaded, the flash was destroyed.  

In our current Node app, back when we have created the signup strategy, in the callback we had this code:

```javascript
  req.flash('signupMessage', 'This email is already used.')
```

This will store the message 'This email is already used.' into the response object and then we will be able to use it in the views. This is really useful to send back details about the process happening on the server to the client.


## Incorporating Flash Messages - Codealong (5 mins)

In the view `signup.hbs`, before the form, add:

```hbs
  {{#if message}}
    <div class="alert alert-danger">{{message}}</div>
  {{/if}}
```

Let's add some code into `getSignup` in the users Controller to render the template:

```javascript
  function getSignup(request, response) {
    response.render('signup.hbs', { message: request.flash('signupMessage') });
  }
```

Now, start up the app using `nodemon app.js` and visit `http://localhost:3000/signup` and try to signup two times with the same email, you should see the message "This email is already used." appearing when the form is reloaded.


## Test it out - Independent Practice (5 mins)

All the logic for the signup is now set - you should be able to go to `/signup` and create a user.


## Sign-in - Codealong (10 mins)

Now we need to write the `signin` logic.

We also need to implement a custom strategy for the login, In passport.js, after the signup strategy, add add a new LocalStrategy:

```javascript
  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {

  }));
```

The first argument is the same as for the signup strategy - we ask passport to recognize the fields `email` and `password` and to pass the request to the callback function.

For this strategy, we will search for a user document using the email received in the request, then if a user is found, we will try to compare the hashed password stored in the database to the one received in the request params. If they are equal, the the user is authenticated; if not, then the password is wrong.

Inside `config/passport.js` let's add this code:

```javascript
  ...
  }, function(req, email, password, callback) {

    // Search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return callback(err);
      }

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return callback(null, user);
    });
  }));
  ...

```

#### User validate method

We need to add a new method to the user schema in `user.js` so that we can use the method `user.validatePassword()`. Let's add:

```javascript
  User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
  };
```

#### Adding flash messages to the view

As we are again using flash messages, we will need to add some code to display them in the view:

In `login.hbs`, add the same code that we added in `signup.hbs` to display the flash messages:

```javascript
  {{#if message}}
    <div class="alert alert-danger">{{message}}</div>
  {{/if}}
```

#### Login GET Route handler

Now, let's add the code to render the login form in the `getLogin` action in the controller (`users.js`):

```javascript
  function getLogin(request, response) {
    response.render('login.hbs', { message: request.flash('loginMessage') });
  }
```

You'll notice that the flash message has a different name (`loginMessage`) than the in the signup route handler.

#### Login POST Route handler

We also need to have a route handler that deals with the login form after we have submit it. So in `users.js` lets also add:

```javascript
  function postLogin(request, response) {
    var loginProperty = passport.authenticate('local-login', {
      successRedirect : '/',
      failureRedirect : '/login',
      failureFlash : true
    });

    return loginProperty(request, response);
  }
```

You should be able to login now!

## Test it out - Independent Practice (5 mins)

#### Invalid Login

First try to login with:

- a valid email
- an invalid password

You should also see the message 'Oops! Wrong password.'

#### Valid Login

Now, try to login with valid details and you should be taken to the index page with a message of "Welcome".

The login strategy has now been setup!


#### Accessing the User object globally

By default, passport will make the user available on the object `request`. In most cases, we want to be able to use the user object everywhere, for that, we're going to add a middleware in `app.js`:

```javascript
  require('./config/passport')(passport);

  app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });
```

Now in the layout, we can add:

```javascript
<ul>
  {{#if currentUser}}
    <li><a href="/logout">Logout {{currentUser.local.email}}</a></li>
  {{else}}
    <li><a href="/login">Login</a></li>
    <li><a href="/signup">Signup</a></li>
  {{/if}}                
</ul>
```

## Signout - Codealong (10 mins)

#### Logout

The last action to implement for our authentication system is to set the logout route and functionality.

In `controllers/users.js`:
```js
function getLogout(request, response) {
  request.logout();
  response.redirect('/');
}
```

## Test it out - Independent Practice (5 mins)

You should now be able to login and logout! Test this out.

## Restricting access (10 mins)

As you know, an authentication system is used to allow/deny access to some resources to authenticated users.

Let's now turn our attention to the `secret` route handler and it's associated template.

To restrict access to this route, we're going to add a method at the top of `config/routes.js`:

```javascript
  function authenticatedUser(req, res, next) {
    // If the user is authenticated, then we continue the execution
    if (req.isAuthenticated()) return next();

    // Otherwise the request is always redirected to the home page
    res.redirect('/');
  }
```

Now when we want to "secure" access to a particular route, we will add a call to the method in the route definition.

For the `/secret` route, we need to add this to the `/config/routes.js` file:

```javascript
  router.route("/secret")
    .get(authenticatedUser, usersController.secret)
```

Now every time the route `/secret` is called, the method `authenticatedUser` will be executed first. In this method, we either redirect to the homepage or go to the next method to execute.

Now test it out by clicking on the secret page link. You should see: "This page can only be accessed by authenticated users"


## Independent Practice (20 minutes)

> ***Note:*** _This can be a pair programming activity or done independently._

- Add pages with restricted access.

- Once the user is authenticated, make sure he/she can't access the sign-in or sign-up and redirect with a message, and vice-versa for the logout

## Conclusion (5 mins)

Passport is a really useful tool because it allows developers to abstract the logic of authentication and customize it, if needed. It comes with a lot of extensions that we will cover later.

- How do salts work with hashing?
- Briefly describe the authentication process using passport in Express.
