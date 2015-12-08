# Intro to OAuth and 3rd Party APIs with Express

## Learning Objectives

* Describe OAuth is & why it's commonly used
* Use a Passport strategy to authenticate with a 3rd party login

## What is OAuth?

You see many sites with buttons that allow for users to sign up with their Facebook or Twitter credentials.  OAuth makes all this possible.  

[OAuth](https://en.wikipedia.org/wiki/OAuth) is an agreed-upon set of standards for logging in through a third party service. It involves:

1. Leaving a website.
2. Authenticating with the third party.
3. Then the third party will redirect the user back to the original website with, among other things, an authentication token that can be persisted and used to request more information later.  

At a high level, the standard lays out the overall protocol of login: you have to have _this_ route in your application, with _these_ parameters in your request/response, and after that, you need to be directed to _these_ pages.  And because it's a set of standards that are universally accepted, there's a whole bunch of libraries we can use to make this happen - like [Passport](http://passportjs.org/)!

![facebook-login](https://cloud.githubusercontent.com/assets/40461/9360397/e49b15be-468d-11e5-8b88-3757ca6cbcac.png)

You probably know this as "Login with Facebook": you click on "Login with Facebook", you're redirected to Facebook's application, and then you get back to your site.

## Turn & Talk: Local vs. 3rd Party User Authentication

What are the pros and cons of authenticating users locally (plain ol' username and password) or via a 3rd party application (like Twitter or Facebook).

> As a developer, one benefit is that you don't have to worry about developing your own authentication system.  The other benefit is your application gets a whole bunch of information it can use - or persist - later on, from Facebook.  A downside for the users is that in order to login, they're giving a lot of of their data to the requesting application. Developers and companies love this, though, because they can use all this data from the OAuth provider (Facebook/Twitter etc).

#### What information is available via OAuth?

Here's part of a sample response from Twitter. There's plenty more information that is cut off here for readability.

```js
{
  id: '8839212',
  username: 'urdmaseda',
  displayName: 'Adrian Maseda',
  photos: [ { value: 'https://pbs.twimg.com/profile_images/609055940596236288/RfQHyuDo_normal.jpg' } ],
  provider: 'twitter',
  _json:
   { id: 8839212,
     id_str: '8839212',
     name: 'Adrian Maseda',
     screen_name: 'urdmaseda',
     location: 'DC',
     profile_location: null,
     description: 'WDI Instructor @GA_DC // Founder @AllThingsGo',
     url: 'http://t.co/WVMZNQNlM7',
     entities: { url: [Object], description: [Object] },
     protected: false,
     followers_count: 501,
     friends_count: 641,
     listed_count: 20,
     created_at: 'Wed Sep 12 18:56:55 +0000 2007',
     favourites_count: 667,
     utc_offset: -18000,
     time_zone: 'Eastern Time (US & Canada)',
     geo_enabled: false,
     verified: false,
     statuses_count: 2157,
     lang: 'en',
  }
}
```

#### How it works

To make any of our apps work, we need to first declare our app as a Twitter application using Twitter's [developer interface](https://apps.twitter.com/).  Ultimately, we'll be defining the set of permissions / information we are requesting from the user.

A visitor of our website clicks **Login with Twitter**, and leaves our original application and are brought to Twitter - as a developer, you lose everything you had (params from a form, for example).  

As a Twitter user, when you login, you pass in two important pieces of information to Twitter: the **app ID** and the **app secret** that identifies the application requesting the information.  

After our app is given the okay, Twitter sends back an **access token**. With that access token, Twitter can identify users of our application as real Twitter users. These access tokens only last so long, usually expiring after a week or so, but with this access token we can call out to Twitter, if we want, and get Twitter data associated with that Twitter user.

> You'll be able to see this access token via the callback URL in the browser. It will look something like `/auth/twitter/callback?oauth_token=_emExwAAAAAAjDpMAAABUXmEXAg&oauth_verifier=e9g1zE58fJGz1K3FJklSqg0GG5OTNDE0`

### Here's a diagram of the whole OAuth process:

![Here's a diagram of the whole OAuth process.](http://i.imgur.com/FLDP5YY.png)

### Sign up for Twitter API

> NOTE: For the in-class examples we will be using Twitter. If you don't have a Twitter account, create a dummy account for today's class.

Navigate to [Twitter Apps](https://apps.twitter.com/) and follow these steps:

* Click "Create New App".
* Give your application a "Name", "Description", "Website" and "Callback URL".
  * Enter whatever you want for "Name", "Description" and "Website".
  * Enter `http://127.0.0.1:3000/auth/twitter/callback` for "Callback URL".
* Agree to "Developer Agreement".
* Click "Create Your Twitter Application".
* In the "Keys and Access Tokens" tab of application management, take note of the "Consumer Key" and "Consumer Secret".

## Get to know OAuth and Passport

We've made a super-simple app that consists of a "Log in with Twitter" functionality and not much else. Each part of the app has a `console.log` that tells you what that part does when it's run.

In order to re-familiarize yourselves with Passport, and get to know OAuth a bit better, we'd like you to clone down this app and explore it for a little bit.

```bash
$ git clone git@github.com:ga-dc/super-simple-twitter-app.git
$ cd super-simple-twitter-app
$ git checkout annotated
$ npm install
```

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
  sessionSecret: "fruitbat",
  twitter: {
    consumerKey: "abc123",
    consumerSecret: "def456",
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  }
}
```

> Make sure to include `env.js` in `.gitignore` so your API key and secret are not pushed to GitHub!

### Note: Localhost vs 127.0.0.1

Twitter won't reply to requests from Localhost. You can't start off on `localhost:3000` and then have the callback direct you to `127.0.0.1`. This is because your session ID's cookie will have been associated with `localhost` and *not* with `127.0.0.1`.

### You do: Explore an OAuth app

**Take 10 minutes** with the person next to you to explore this app. Click on all the links, and see what happens in your server log when you do. As you go, answer these questions about this app:

- What is "serialization"?
- What is "deserialization"?
- What is "authentication"?
- What is a "strategy"?
- How are sessions and cookies related?

## You Do: Implement Twitter Log-In

To demonstrate OAuth, we are going to create another really simple app that shows the Twitter details of a user when there is a user connected or a link to Twitter login if the user isn't connected.

### Clone Repo and Install

Clone the `solution` branch of the repo you worked on in the first Passport class: [https://github.com/ga-dc/express-passport-local-authentication/tree/solution](https://github.com/ga-dc/express-passport-local-authentication/tree/solution)  

Then, as always, run `$ npm install`.  

Create an `env.js` that looks like this:

```
module.exports = {
  consumerKey: "abc",
  consumerSecret: "123",
  callbackUrl: "http://127.0.0.1:3000/auth/twitter/callback"
}
```

### Update Login View

Let's update `/views/login.hbs` so that the user has the option of logging in via Twitter. We'll do this by adding an image that, when clicked, will direct the user to a route that we'll set up in a later step.

```html
<h2>Login</h2>

{{#if message.length}}
  <div class="alert alert-danger">{{message}}</div>
{{/if}}

<form method="post" action="/login">
  <div class="form-group">
    <label for="email">Email</label>
    <input class="form-control" type="text" name="email" id="email">
  </div>

  <div class="form-group">
    <label for="email">Password</label>
    <input class="form-control" type="password" name="password" id="password">
  </div>

  <input class="btn btn-default" type="submit">
</form>

<!-- Here's the Twitter image! -->
<a href="/auth/twitter"><img id="twitter-login" src="http://i.imgur.com/3kYcO3Y.png"></a>
```

### Update Model

At the moment our User model can only handle local signups and logins. We need to modify it so that, when somebody signs up using Twitter, it saves pertinent information about his or her Twitter account.

```javascript
// /models/user.js

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
```

### Create Passport Strategy

Next we're going to create a Passport Strategy that handles all Twitter authentication. This is going to look pretty similar to the Strategy we set up for local login and signup.  

The first step is to pass in credentials for the current app to the Twitter strategy.

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

  // passport.serializeUser(), .deserializeUser(), .use('local-signup', new LocalStrategy())

  passport.use('twitter', new TwitterStrategy({
    // Here we reference the values in env.js.
    consumerKey: env.consumerKey,
    consumerSecret: env.consumerSecret,
    callbackUrl: env.callbackUrl
  })
}
```

Then we need to create a new User based on the information passed to us from Twitter.

```js
passport.use('twitter', new TwitterStrategy({
  consumerKey: env.consumerKey,
  consumerSecret: env.consumerSecret,
  callbackUrl: env.callbackUrl
}, function(token, secret, profile, done){
  process.nextTick(function(){
    User.findOne({'twitter.id': profile.id}, function(err, user){
      if(err) return done(err);

      // If the user already exists, just return that user.
      if(user){
        return done(null, user);
      } else {
        // Otherwise, create a brand new user using information passed from Twitter.
        var newUser = new User();

        // Here we're saving information passed to us from Twitter.
        newUser.twitter.id = profile.id;
        newUser.twitter.token = token;
        newUser.twitter.username = profile.username;
        newUser.twitter.displayName = profile.displayName;

        newUser.save(function(err){
          if(err) throw err;
          return done(null, newUser);
        })
      }
    })
  })
```

We need to store `id` and `token` to the user because they are required in the Twitter authentication process. `userName` and `displayName`, however, are optional. We as developers chose to retain this information. There is more information stored in the Twitter response that we could save to our model if we want.

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
  .get(passport.authenticate('twitter'));

module.exports = router;
```

#### Handle the Callback

Now we need to create a route in `config/routes.js` that handles the information sent back from Twitter.

```js
// /config/routes.js

router.route('/auth/twitter/callback')
  .get(passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
```

How does Twitter know to redirect the user to this route after it's done authenticating? Because we defined the callback URL in our Twitter Strategy.

This code is all we need to redirect users to Twitter for authorization. Test this out by clicking the "Login with Twitter" link on our login page. You should see something very similar to this in your browser...  

![Twitter authorization screen](http://i.imgur.com/YliYWHb.png)

#### All Done!

Pretty similar to what you did in the last class, right? Though we are implementing a different kind of user authentication here, the code required to implement this is very similar to local authentication because of the way Passport is set up.

## You Do: Implement Facebook Login

> ***Note:*** _This can be a pair programming activity or done independently._

Try to add Facebook to this app. Start by creating a Facebook application [here](https://developers.facebook.com/).

# Quiz Questions

- What's an advantage of using OAuth over local authentication? What's a disadvantage?
- What's the purpose of an OAuth callback URL?
- What are the 3 things that would go into an `env.js` file, at minimum, for an OAuth app?
