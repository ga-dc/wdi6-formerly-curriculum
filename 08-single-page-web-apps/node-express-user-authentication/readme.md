---
title: Encrypting Passwords with Express/Mongoose
type: lesson
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Server Applications
---

# Encrypting Passwords with Express/Mongoose

### Objectives
*After this lesson, students will be able to:*

- Create a mongoose-backed User model with email & password
- Recall what encryption is and why it's important
- Generate a salt & encrypt a password
- Find a user based on email & password, and check against an encrypted password to authentication

### Preparation
*Before this lesson, students should already be able to:*

- Create a MVC app with Express
- Create a schema with mongoose and create/read documents

## Refresh Bcrypt and Authentication system - Intro (15 mins)

#### Authentication system

We've already implemented an authentication system in Rails, and the logic is the same in NodeJS. For this lesson, we will re-implement the login and signup logic over an api. In a later lesson, we will use different packages to make the authentication system easy to implement.

For this lesson, our app will have two routes:

- `POST    /signup`, we will send a password and an email to this route; this will hash the password and save it in the database

- `POST    /login`, we send a password and an email to this route and then the server will respond with a message and a http status to indicate if the credentials are right.


#### Bcrypt, hashing refresher

Remember, hashing is when a function is called on a variable - in this case a password - in order to produce a constant-sized output; it being a one-way function, there isn't a function to reverse or undo a hash and calling the function again - or reapplying the hash - isn't going to produce the same output again.

From another [stack post](http://stackoverflow.com/questions/1602776/what-is-password-hashing):

_"Hashing a password will take a clear text string and perform an algorithm on it (depending on the hash type) to get a completely different value. This value will be the same every time, so you can store the hashed password in a database and check the user's entered password against the hash."_

This prevents you from storing the cleartext passwords in the database (bad idea).

Bcrypt is recognized as one of the most secure ways of encrypting passwords because of the per-password salt. Even with it being slower than any other algorithms, a lot of companies still prefer to use bcrypt for security reasons.

#### But wait, what's a salt?

A salt is random data that can be added as additional input to a one-way function, in our case a one-way function that  hashes a password or passphrase. We use salts to defend against dictionary attacks, a technique for "cracking" an authentication mechanism by trying to determine the decryption key.


## Using bcrypt with Express - Codealong (20 mins)

Take the starter-code an unzip it. Next, make sure that you run `npm install` to install of the dependencies.

Once you have done this, run `nodemon app.js` to check for any errors. You shouldn't have any!

**Note:** Make sure that you have Mongo running!

#### Creating a User Model

Now, we are going to declare and export a user model, so in `models/user.js`:

```javascript
  var mongoose = require('mongoose');
  var bcrypt   = require('bcrypt');

  var User = new mongoose.Schema({
    name:  { type: String },
    email: { type: String, required: true,  unique: true },
    password: { type: String, required: true }
  });

  module.exports = mongoose.model('User', User);
```

Nothing new here - we declare the fields and their respective types, but we need to make sure that the email is unique, hence the `{unique: true}`.

We have required mongoose and bcrypt here, athough we are not using bcrypt yet.

To check that this has been correctly setup, let's go into our Mongo terminal and quickly check the schema in this database:

```bash
  mongo
  use authentication-practise
  show collections
```

You should see:

```bash
  system.indexes
  users
```

#### App.js

Let's first have a look at the `app.js` file:

```javascript
  var express       = require('express');
  var path          = require('path');
  var logger        = require('morgan');
  var cookieParser  = require('cookie-parser');
  var bodyParser    = require('body-parser');
  var app           = express();
  var mongoose      = require('mongoose');
  var User          = require('./models/User');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  mongoose.connect('mongodb://localhost:27017/authentication-practise')

  // Only render errors in development
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.listen(3000)
```

Perhaps the only packages here that we have not seen are `cookie-parser` and `bcrypt`.
[`cookie-parser`](https://github.com/expressjs/cookie-parser) is some middleware that helps you parse cookies.

We are not actually going to use `cookie-parser` at the moment.

#### Creating the signup route

Now we will create the `signup` route. In app.js let's add that signup route:

```javascript
  app.post("/signup", function(req, res) {
    var userObject = new User(req.body.user);

    userObject.save(function(err, user) {
      if(err){
        return res.status(401).send({message: err.errmsg});
      } else {
        return res.status(200).send({message: "user created"});
      }
    });
  })
```

Once again, nothing new here: we just create the route handler for the signup and save a user Document based on the params received in the request body; therefore the request body should be something like...

```javascript
  "user" : {
    "name"        : "LLLLLL",
    "email"       : "XXXXXX",
    "password"    : "YYYYYY"
  }
```

Great, we can now create a user by posting to this route.

#### Test using cURL

Let's test this by starting up the app with `nodemon app.js` and cURLing this route with some data.

```bash
curl -i -H "Content-Type: application/json" -d '{
  "user" :{
  "name"		   : "Alex",
  "email"       : "alex@alex.com",
  "password"    : "password"
  }

}' http://localhost:3000/signup
```

You should see something like this:

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 26
ETag: W/"1a-T12+w8BGtrChZALrlerTPQ"
Date: Sat, 15 Aug 2015 00:56:35 GMT
Connection: keep-alive

{"message":"user created"}%
```

#### Signup Logic

Now that we have the signup route working and users being saved to our database, we need to implement the logic to encrypt the email when a user is created.

In `user.js`, we are going to add some middleware that will be executed every time a save action is performed for a user model.

```javascript
  User.pre('save', function(next) {
    // Some code in here
  });

  module.exports = mongoose.model('User', User);
```

*Note:* Similar to a Rails `before_save` callback.

The code in this function will now be executed for every call to create, save and update.

Inside this method let's add the logic to hash the password:

```javascript
  User.pre('save', function(next) {
    var user = this;

    // Generate a salt, with a salt_work_factor of 5
    bcrypt.genSalt(5, function(err, salt) {
      if (err) return next(err);

      // Hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // Override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });
```

Here we are calling two methods to encrypt the password:

- `genSalt()` will send a salt token to the callback method;
	- the argument `5` corresponds to the number of rounds that will be executed when generating a token - the higher the number, the more complex the salt will be.
- `bcrypt.hash()` will take the original password and hash it with the salt token passed as a second argument. Then the callback receive the hashed password.

We do not need the original password anymore, so we can replace it by the hashed one:

```
this.password = hash;
```  

The call to `next()` will now go to the next middleware or execute the save action.  

#### Create, save and update?!

This logic will work every time a save action is called on a user document, which is an issue, because every time save and update will be called on a user document, the password will be re-hashed; therefore, the original clear password will not correspond to the new hashed password.

So we need to hash the password only when the value of the password is different than the one stored - meaning the user/admin updated this password.  When the document is created, the field is set to null, so if the request contains a string for the password, Mongoose will perform a comparison between the value null and the new value.  Now, this test will work for a new document and for a document that is updated.

Therefore, at the start of the middleware `pre` callback method, add:

```javascript
  User.pre('save', function(next) {
    var user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    ...
```

Now the password will be hashed only when the value changes.

That's all for encoding the password!

## Create a user document with cURL - Independent Practice (5 mins)

To make sure your auth works, try to create a user document using another CURL command and use the Mongo terminal to check that the password has been hashed.

#### Solution

```bash
curl -i -H "Content-Type: application/json" -d '{
  "user" :{
  "name"   : "Dave",
  "email"       : "dave@dave.com",
  "password"    : "password"
  }

}' http://localhost:3000/signup
```

Then for mongo:

```bash
mongo
use authentication-practise
db.users.find({})
```

You should see something like:

```bash
> db.users.find({})
{ "_id" : ObjectId("55ce9b2edcb5c5d552c8c167"), "name" : "Alex", "email" : "alex@alex.com", "password" : "password", "__v" : 0 }
{ "_id" : ObjectId("55ce9b3993bbc2a953e4a618"), "name" : "Dave", "email" : "dave@dave.com", "password" : "$2a$05$UPopBQOQjqYmcuNg0EyiyerixjqfoSZvx2Aw4BfwcKabd1/.1mLIa", "__v" : 0 }
```

You can see now that the password has been hashed!

## Setting up the Login - Codealong (15 mins)

For the login, we will need to add another route `/signin` that will also receive an email and password under the same format than signup:

```javascript
  "user" :{
     "email"       : "XXXXXX",
     "password"    : "YYYYYY"
  }
```

But for the sign-in process, we will perform a search based on the email and then ask bcrypt to compare the value sent in the request and the hashed password stored in mongo.

In app.js, let's add:

```javascript
  app.post("/signin", function(req, res) {
    var userParams = req.body.user;

    User.findOne({ email: userParams.email }, function(err, user) {

      user.authenticate(userParams.password, function(err, isMatch) {
        if (err) throw err;

        if (isMatch) {
          return res.status(200).send({message: "Valid Credentials !"});
        } else {
          return res.status(401).send({message: "The credentials provided do not correspond to a registered user"});
        };
      });
    });
  });
```

#### User.authenticate method

So the method `authenticate` (that we need to add in the model) will take the password as an argument and a callback method. This callback will receive any error that occurred and then a boolean corresponding to wether or not the password is valid. Based on this boolean, the route handler will respond with a different message and a different http status.

Let's now write the method `authenticate` in the user model:

```javascript
  User.methods.authenticate = function(password, callback) {
    // Compare is a bcrypt method that will return a boolean,
    // if the first argument once encrypted corresponds to the second argument
    bcrypt.compare(password, this.password, function(err, isMatch) {
      callback(null, isMatch);
    });
  };
```

The call to `bcrypt.compare()` will take care of rehashing the password and comparing both versions, sending a boolean to the callback method, and the logic goes back to the route handler.


## Test your auth with a cURL - Independent Practice (5 mins)

You can test this using this curl command:

```javascript
curl -i -H "Content-Type: application/json" -d '{
  "user" :{
  "email"       : "dave@dave.com",
  "password"    : "password"
  }

}' http://localhost:3000/signin
```

If the credentials are valid, you should see:

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-0aBsDSDpbTcsYOjT+i4low"
Date: Sat, 15 Aug 2015 02:00:35 GMT
Connection: keep-alive

{"message":"Valid Credentials !"}%     
```

If they are not, you should see:

```
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 77
ETag: W/"4d-KyCW58vX57enbCaaHhh9pA"
Date: Sat, 15 Aug 2015 02:01:09 GMT
Connection: keep-alive

{"message":"The credentials provided do not correspond to a registered user"}%
```

There we go! we've implemented a login system with bcrypt, Mongoose and Express.

## Add validations and explicit messages - You Do (20 mins)

Now try to add detailed error messages:

- When the email is wrong
- When the email is already taken
- Also, try to use a password confirmation using [virtuals](http://mongoosejs.com/docs/2.7.x/docs/virtuals.html) attributes

## Conclusion (5 mins)

This is far from a complete authentication solution, and implementing full authentication logic would takes days and days if it had to be done manually. Luckily for us, tools exists to make developers' lives easier, and we will discover those tools later.

- How does hashing work with salts?
- Why is bcrypt trusted over other algorithms or using decryption keys?
