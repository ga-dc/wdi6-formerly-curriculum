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


## Codealong: Implement Twitter Log-In

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
  callbackUrl: "http://127.0.0.1:3000"
}
```

> Make sure to include `env.js` in `.gitignore` so your API key and secret are not pushed to GitHub!

### Update Model

At the moment our User model can only handle local signups and logins. We need to modify it so that, when somebody signs up using Twitter, it saves pertinent information about his or her Twitter account.

```javascript
// /models/user.js

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// The local object in the User schema is used when a user signs up or logs in locally.
// The twitter object is used when a user signs up or logs in via Twitter.
// What do you think we would do if we wanted to add authentication via Facebook or Github?
var User = mongoose.Schema({
  local : {
    email: String,
    password: String,
  },
  twitter : {
    id: String,
    token: String,
    username: String,
    displayName: String
  }
});

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('User', User);
```

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

// passport.authenticate('twitter') is all we need to trigger that redirect to Twitter.
router.route('/auth/twitter')
  .get(passport.authenticate('twitter'), usersController.twitter);

module.exports = router;
```

```js
// /controllers/users.js

// function getSignup, postSignup, getLogin, postLogin, getLogout, secret

function twitter(request, response){
  // Don't need to put any code in here. Thanks Passport!
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

#### Handle the Callback

Now we need to create a route that handles the information sent back from Twitter. Let's create an additional route in `config/routes.js` that will take care of this callback.

```js
// /config/routes.js

router.route('/auth/twitter/callback')
  .get(passport.authenticate('twitter'), usersController.twitterCallback);
```

Next, let's create a corresponding `twitterCallback` function in `/controllers/users.js`.

```js
// /controllers/users.js

function twitterCallback(request, response){
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  });
}

// Don't forget to export our new function.
module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret,
  twitter: twitter,
  twitterCallback: twitterCallback
};
```

## Independent Practice (20 minutes)

> ***Note:*** _This can be a pair programming activity or done independently._

Try to add GitHub to this app and make sure the strategy doesn't create two users if you authenticate with GitHub and Facebook.

Take a look at the [GitHub OAuth API docs](https://developer.github.com/v3/oauth/).
