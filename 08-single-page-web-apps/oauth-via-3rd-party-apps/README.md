# Into to OAuth and 3rd Party APIs with Express

## Learning Objectives

* Describe OAuth is & why it's commonly used
* Use a Passport strategy to authenticate with a 3rd party login

> Worth doing T&T about the benefits of local vs. 3rd party login?

## What is OAuth? (10 mins)

You see many sites with buttons that allow for users to sign up with their Facebook or Twitter credentials.  OAuth makes all this possible.  

[OAuth](https://en.wikipedia.org/wiki/OAuth) is an agreed-upon set of standards for logging in through a third party service. It involves:

1. Leaving a website.
2. Authenticating with the third party.
3. Then the third party will redirect the user back to the original website with, among other things, an authentication token that can be persisted and used to request more information later.  

At a high level, the standard lays out the overall protocol of login: you have to have _this_ route in your application, with _these_ parameters in your request/response, and after that, you need to be directed to _these_ pages.  And because it's a set of standards that are universally accepted, there's a whole bunch of libraries we can use to make this happen - like [Passport](http://passportjs.org/)!

![facebook-login](https://cloud.githubusercontent.com/assets/40461/9360397/e49b15be-468d-11e5-8b88-3757ca6cbcac.png)


You probably know this as "Login with Facebook": you click on "Login with Facebook", you're redirected to Facebook's application, and then you get back to your site.  As a developer, one benefit is that you don't have to worry about developing your own authentication system.  The other benefit is your application gets a whole bunch of information it can use - or persist - later on, from Facebook.  A downside for the users is that in order to login, they're giving a lot of of their data to the requesting application. Developers and companies love this, though, because they can use all this data from the OAuth provider (Facebook/Twitter etc).

#### What information is available via OAuth?

> Show example response after getting user information from Facebook. Maybe have sample app ready to go so it can be generated via example.

#### How it works

> Great opportunity for diagram.

To make any of our apps work, we need to first declare our app as a Facebook application using Facebook's [developer interface](https://developers.facebook.com/).  Ultimately, we'll be defining the set of permissions / information we are requesting from the user.

A visitor of our website clicks **Login with Facebook**, and leaves our original application and are brought to Facebook - as a developer, you lose everything you had (params from a form, for example).  

As a Facebook user, when you login, you pass in two important pieces of information to Facebook: the **app ID** and the **app secret** that identifies the application requesting the information.  

After our app is given the okay, Facebook sends back an **access token**. With that access token, Facebook can identify users of our application as real Facebook users. These access tokens only last so long, usually expiring after a week or so, but with this access token we can call out to Facebook, if we want, and get Facebook data associated with that Facebook user.

> Insert example of access token being returned. Might be accessible via earlier example.


## Codealong: Implement Twitter Log-In (50 mins)

> Should replace this application with the one started in the first Passport class.

To demonstrate OAuth, we are going to create a really simple app that shows the Twitter details of a user when there is a user connected or a link to Twitter login if the user isn't connected.

### Sign up for Twitter API

> NOTE: For the in-class example we will be using Twitter. If you do not have Twitter, feel free to use Facebook.

Navigate to [Twitter Apps](https://apps.twitter.com/) and follow these steps:

* Click "Create New App".
* Give your application a "Name", "Description", "Website" and "Callback URL".
  * Enter whatever you want for "Name", "Description" and "Website".
  * Enter `http://127.0.0.1` for "Callback URL".
* Agree to "Developer Agreement".
* Click "Create Your Twitter Application".
* In the "Keys and Access Tokens" tab of application management, take note of the "Consumer Key" and "Consumer Secret".

### Clone Repo and Install

Clone the `solution` branch of the repo you worked on in the first Passport class: [https://github.com/ga-dc/express-passport-local-authentication/tree/solution](https://github.com/ga-dc/express-passport-local-authentication/tree/solution)  

Then, as always, run `$ npm install`.  
* Our dependencies include `passport-twitter`.

### Create Environment Variables

#### Q: How Do We Hide API Keys in Express?

> Not sure? Think about what happens when you install Figaro in a Rails application.

In the main directory of your application, create a `env.js` file. This file will contain API information that we want to keep hidden from the end-user. We will export an object from this file and require/reference it whenever we want to access this information.

```bash
$ touch env.js
```

```js
// env.js

// The below information can be found in the application management page of your Twitter app - https://apps.twitter.com/
module.exports = {
  consumerKey: "your consumer key here",
  consumerSecret: "your consumer secret here",
  callbackUrl: "your callback url here"
}
```

> Make sure to include `env.js` in `.gitignore` so your API key and secret are not pushed to GitHub!

### Create Passport Strategy

#### Q: What is a Strategy?

```js
// /config/passport.js

// New Requires
// (1) TwitterStrategy: middleware required to implement Twitter login via Passport.
// (2) Env: so we can access our Twitter API information.
var TwitterStrategy = require('passport-twitter').Strategy;
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');
var env             = require('../env');

module.exports = function(passport){

  // passport.serializeUser()
  // passport.deserializeUser()

  // passport.use('local-signup', new LocalStrategy())

  // Unlike local authorization, we don't need to pass our Twitter Strategy a name argument.
  passport.use(new TwitterStrategy({
    // Here we reference the values stored in env.js.
    consumerKey: env.consumerKey,
    consumerSecret: env.ConsumerSecret,
    callbackUrl: env.callbackUrl
  }, function(aToken, aTokenSecret, aProfile, done){
    token = aToken;
    tokenSecret = aTokenSecret;
    profile = aProfile;
    done(null, profile);
  }));
}
```

### Set up our First Route

Our next order of business is to create a route that, when visited by the user, will redirect them to authorize on Twitter.com.

```js
// /config/routes.js

// We need to require Passport since we now reference it in our routes file.
var express = require('express');
var passport = require('passport');
var router = express.Router();
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');

// function authenticatedUser()

// router.route( '/', '/signup', '/login', '/logout', '/secret')

// passport.authenticate('twitter') is all we need to trigger that redirect to Twitter. Thanks Passport!
router.route('/auth/twitter')
  .get(passport.authenticate('twitter'), usersController.twitter);

module.exports = router;
```

```js
// /controllers/users.js

// function getSignup, postSignup, getLogin, postLogin, getLogout, secret

function twitter(request, response){

}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret,
  twitter: twitter
};
```

> Include code that adds "Login via Twitter" link to login.hbs.

This code is all we need to redirect users to Twitter for authorization. Test this out by clicking the "Login with Twitter" link on our login page. You should see something very similar to this in your browser...  

![Twitter authorization screen](http://i.imgur.com/YliYWHb.png)

#### Create the Model

Now that Facebook knows about us - and note, you'll have to do this for each application you use Facebook auth - we can jump into our application and add the fields into the user model to store the data sent back by Facebook.

In `models/user.js`:

```javascript
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  }
});
```

#### Add the Facebook strategy

As we've already seen when we've used `passport-local`, passport use strategies.  `passport-facebook` uses the same process!  In the file `config/passport.js` we need to add a lot of code:

```javascript
var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserializing user:',user);
      done(err, user);
    });
  });

  passport.use('facebook', new FacebookStrategy({
    clientID        : process.env.FACEBOOK_API_KEY,
    clientSecret    : process.env.FACEBOOK_API_SECRET,
    callbackURL     : 'http://localhost:3000/auth/facebook/callback',
    enableProof     : true,
    profileFields   : ['name', 'emails']
  }, function(access_token, refresh_token, profile, done) {

    // // Use this to see the information returned from Facebook
    // console.log(profile)

    process.nextTick(function() {

      User.findOne({ 'fb.id' : profile.id }, function(err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {

          var newUser = new User();
          newUser.fb.id           = profile.id;
          newUser.fb.access_token = access_token;
          newUser.fb.firstName    = profile.name.givenName;
          newUser.fb.lastName     = profile.name.familyName;
          newUser.fb.email        = profile.emails[0].value;

          newUser.save(function(err) {
            if (err)
              throw err;

            return done(null, newUser);
          });
        }

      });
    });
  }));

}
```

There's a lot going on here so lets break it down. This code is really similar to what we did to use `passport-local`:

- First, we give the credentials for the current app to the Facebook strategy;
- Then, with the array given to `profileFields`, we describe which fields we want to get back from Facebook;
- The function that follows will be executed when Facebook sends back the data to the website using `/auth/facebook/callback` endpoint;
- Finally, if the user already exists, the code directly executes the callback and gives the user object found by mongo to the callback, otherwise, we create a new user object and execute the callback.

#### Add the routes and the views

To authenticate via OAuth with Facebook, an app needs three routes:

- A route to request Facebook
- A route for the Facebook callback
- A route for the logout

For simplicity sake, we will set up just one view that shows different data depending on whether or not the user is logged in or not. In layout.ejs, add:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Facebook authentication</title>
</head>
<body>
  <h1>FACEBOOK LOGIN USING PASSPORT</h1>  
  <div>
    <% if(user != undefined){ %>
      <h2>Below is the data sent by facebook</h2>
      <pre>
        <%= user.fb %>
      </pre>
      <a href="/logout">Logout</a>
    <% } else { %>
      <a href="/auth/facebook">Login with Facebook</a>
    <% } %>
  </div>
</body>
</html>
```

Look, again, in your `user.js` file, to the block of code that provides us with the `user` object if it already exists - there are a whole bunch of attributes that we'll have access to. In this case, if the user exists, we'll do a `user.fb` to show the Facebook data for the current user and a link to logout, or a link to sign-in via Facebook, if the user isn't logged in.  Remember, from our logic above, if the user doesn't exist, and they click sign-in, we will create a new user for our application using information from Facebook.

Now, we need to create a route to render this view:

```javascript
app.get('/', function(req, res){
  res.render('layout', {user: req.user});
});
```

When using passport, the user object will always be attached to the request object. In this method, the user object will be sent to the view using `{user: req.user}`.

Now, let's add the route that will be used to create the request to Facebook:

```javascript
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));
```

This one's easy and will redirect the user to the Facebook website.  If the user already authorized the app, then Facebook will send back the request to the url passed as a param with the field `callbackURL`.

> #### Scope?!

> The "scope" argument we are passing to the `facebook` Strategy, is to change the permissions that we want to request from Facebook. By default, the [Facebook Graph](https://developers.facebook.com/docs/facebook-login/permissions/v2.4) doesn't give you access to the users's email. It will also not provide you an email if you haven't verified it.

For this app, if you take a look at the strategy, we've used `http://localhost:3000/auth/facebook/callback`. We will now create the route handler for this route:

```javascript
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);
```

For this app, we will always redirect to the main page, but in some other apps, you may want to have different actions depending on the result of the login, `success` or `failure`.

The last route is the one that will log the user out:

```javascript
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/")
})
```

## Independent Practice (20 minutes)

> ***Note:*** _This can be a pair programming activity or done independently._

Try to add GitHub to this app and make sure the strategy doesn't create two users if you authenticate with GitHub and Facebook.

Take a look at the [GitHub OAuth API docs](https://developer.github.com/v3/oauth/).
