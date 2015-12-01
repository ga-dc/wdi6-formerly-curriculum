# Local User Authentication with Express

This lesson is a screencast! You can watch here - https://vimeo.com/137368290

Here are a few explicit steps if you'd like a quick reference:

## Create User Model

```js
// models/user.js

var Sequelize = require("sequelize")
module.exports = function(db){
  return db.define("user",{
    username: Sequelize.STRING,
    password: Sequelize.STRING
  })
}
```

## Setup the Database

```js
// config/migrate.js
var User = require("../models/user")(db)
```

    $ node config/migrate.js

## Install dependencies

    $ npm install --save bcrypt-nodejs passport passport-local cookie-parser body-parser express-session

## Configure Application

```js
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))

passport.use(new Strategy(function(username, pass, cb){
  var hashedPass = bcrypt.hashSync(pass)
  User.findOne({
    where: {
      username: username
    }
  }).then(function(user, err){
    if (err) { return cb(err); }
    if (!user) { 
    return cb(null, false); }
    if (!bcrypt.compareSync(pass, user.password)){ 
      return cb(null, false); }
    return cb(null, user);
  })
}))

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id).then(function (user) {
    cb(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  if(req.user){
    res.locals.user = req.user.username
  }
  next()
})
```

## Create Sign Up Form

```js
// index.js
app.get("/signup", function(req, res){
  res.render("auth/signup")
})
```

```html
// views/auth/signup.hbs

<h2>Sign Up</h2>

<form method="post" action="/signup">
  <input type="text" name="username" placeholder="Username">
  <input type="password" name="password" placeholder="password">
  <button>Sign Up</button>
</form>
```

## Handle the Post Request

```js
app.post("/signup", function(req, res, next){
  User.findOne({
    where: {
     username: req.body.username
    }
  }).then(function(user){
    if(!user){
      User.create({
        username: req.body.username,
	password: bcrypt.hashSync(req.body.password)
      }).then(function(user){
        passport.authenticate("local", {failureRedirect:"/signup", successRedirect: "/posts"})(req, res, next)
      })
    } else {
      res.send("user exists")
    }
  })
})
```

## Create the Sign In Form

```js
app.get("/signin", function(req, res){
  res.render("auth/signin")
})
```

```html
// views/auth/signin.hbs

<form method="post" action="/signin">
  <input type="text" name="username" placeholder="Username">
  <input type="password" name="password" placeholder="password">
  <button>Sign In</button>
</form>
```

## Handle the sign in post request

```js
app.post("/signin", passport.authenticate('local', { 
  failureRedirect: '/signin',
  successRedirect: '/posts'
}))
```

## Show whether the user is logged in or not

Passport's version of Devise's `current_user` is `req.user`. This is the Sequelize instance
of the user that contains the id and username. If you want to associate posts with a particular user, 
you can use `req.user.id`.

```js
// index.js

app.use(function(req, res, callback){
  if(req.user){
    res.locals.currentUser = req.user.username
  }
})
```

```html
<!-- views/layout.hbs -->

{{#if user}}
  Signed in as {{user}}. <a href="/signout">Sign Out</a>
{{else}}
  <a href='/signin'>Sign In</a>
  <a href='/signup'>Sign Up</a>
{{/if}}
```

## Allow users to log out

```js
app.get("/signout", function(req, res){
  req.session.destroy()
  res.redirect("/posts")
})
```



