# Authentication via Twitter

## Learning Objectives

- Explain what OAuth is and what problem it solves
- Identify the pros/cons of authenticating with a third party
- Use Passport to authenticate users
- Create routes to redirect to Twitter and handle callback
- Register an application as a Twitter Developer

## Starter Code

We'll be working with this repo today: https://github.com/ga-dc/express-authentication

As we add authentication to this project, I might reference this repo as well: https://github.com/jshawl/express-log-in-with-twitter

## Intro to OAuth

Oauth is an agreed upon (omni) way to authenticate users.

https://marktrapp.com/blog/2009/09/17/oauth-dummies/

The biggest benefit to using oauth is:

1. Users don't have to reveal their username/password combination while logging in.
2. Users can revoke access to the application at any time.

## Registering with Twitter

Please visit https://apps.twitter.com/ and create a new application.

The most important field here is the "callback url". Please enter:

```
http://127.0.0.1:3001/auth/twitter/callback
```

After creating the application, we will need two things:

1. Consumer Secret
2. Consumer Key

In the express-authentication repo, create a file called `env.js` and add this to your gitignore file:

```js
module.exports = {
  consumerKey: "your consumer key here",
  consumerSecret: "your consumer secret here",
  callbackUrl: "your callback url here" // be sure to use http://127.0.0.1 not localhost
}
```

## Setup the Application

We'll need a few dependencies for this:

    npm install --save passport passport-twitter express-session

Let's load passport and the Twitter Strategy:

```js
var passport = require("passport")
var TwitterStrategy = require("passport-twitter").Strategy
passport.serializeUser(function(user, done) {
  done(null, user)
})
passport.deserializeUser(function(obj, done) {
  done(null, obj)
})
app.use(passport.initialize())
app.use(passport.session())
```

and configure passport

```js
passport.use(new TwitterStrategy({
  consumerKey: env.consumerKey,
  consumerSecret: env.consumerSecret,
  callbackUrl: env.callbackUrl
}, function(aToken, aTokenSecret, aProfile, done){
  token = aToken
  tokenSecret = aTokenSecret
  profile = aProfile
  done(null, profile)
}))
```

Note the missing vars. These are intentionally global variables.

## Set up our first route

```js
app.get("/auth/twitter", passport.authenticate("twitter"), function(req, res){
})
```

This route will redirect the user to authorize on Twitter.com

## Handle the callback

Once the user has agreed to let our application access their credentials, twitter will
redirect the user back to our application.

When the redirect happens, Twitter includes information about the currently logged in user, so
we'll save the important parts to a session variable.

```js
app.get("/auth/twitter/callback", passport.authenticate('twitter'), function(req, res){
 req.session.token = token
 req.session.tokenSecret = tokenSecret
 req.session.profile = profile
 res.redirect("/posts")
})
```

I think it's working, but I'm not sure. Let's add a welcome message to the posts view.

```
# posts/index
{{#if user}}
  Logged in as {{user.displayName}}
{{else}}
  <a href='/auth/twitter'>Please log in</a>
{{/if}}
```

## Next Steps

Once you've authenticated your user with a third party API, you might want to do one of the following:

### Storing User in Database

- When the callback comes back from Twitter.com:
  - Check if user exists by twitter user's id.
  - If not, create user, then redirect

### Making Authenticated API Calls

- Check out Twit - https://github.com/ttezel/twit
- when the callback comes back from Twitter.com:
  - Twit's `access_token` is our `token`
  - Twit's `access_token_secret` is our `token_secret`

You can now make authenticated API calls on behlaf of a user!

