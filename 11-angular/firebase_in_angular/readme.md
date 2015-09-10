# AngularFire
- Create and configure a Firebase back-end
- Create a Javascript that communicates with a Firebase back-end
- Explain the difference between HTTP and Websockets, and provide an advantage and disadvantage of each
- Use a custom directive to render an array of objects sourced from Firebase
- Explain what AngularFire is and how it differs from Firebase
- Deploy your app to Firebase Hosting


## Introduction

You've heard that there are database options, other than Postgresql.  Today, we'll investigate one, Firebase.

### Websockets

http -> Websockets
send letter -> phone

??? Diagram

## Exercise: Your own Firebase (20 min)

[Intro to Firebase & AngularFire](https://www.firebase.com/docs/web/libraries/angular/guide/intro-to-angularfire.html#section-angularfire-intro)

> Questions
- Benefits of Firebase?

- Review examples

Deliverable: a database, with specified objects, using GUI


## Demo: Tetris



## Exercise: Read/Write data (20 min)

basic index.html/app.js, write/read

https://www.firebase.com/docs/web/quickstart.html


Timings:
 - 10 min: cdn
 - 20 min: write/read

Deliverable: a database, with specified objects, using JS

## Break (10 min)

## AngularFire


### We do: require, write/read object (30 min)

simple angular App


### Grumbler and Firebase

Let's use our new found knowledge to update Grumbler.  This will be a walk through.  We'll work hard to take small, discreet steps.  We'll even debug when the way isn't clear.  Starting where your homework left off:
```
$ git checkout -b templating-and-routing-with-comments origin/templating-and-routing-with-comments
```

Big picture:
- install & require dependencies
- replace the existing service
- update for interface changes

#### install & require dependencies
```
bower install angularfire --save
```
Q. What just happened?
---

> A. Check out bower.json and bower_components
- git diff

Q. How do I verify?
---

> A. Save something via JS console

Our Grumbles have a "title", so let's use that.

```js
var firebaseRef = new Firebase("https://ga-dc-wdi-grumblr.firebaseio.com/grumbles");
firebaseRef.set({"title": "We have a connection!"});
```

#### A Firebase Resource

Q.  We want to use this firebase database instead of our calls to our RESTful API.  What do we replace?
---

> A. The Grumbler Resource service.

The best possible world would be to create a new service that accesses Firebase using the same interface as the ngResource.
Then, we can just replace that service, with no changes to the rest of the app.  We might not get there, but that's our goal.

Q. How do we know what interface we need to support?
---
> A. Check usage in the Controllers.

First, we need a connection.

```js
(function() {
  var firebaseUrl = "https://ga-dc-wdi-grumblr.firebaseio.com";
  var connectedRef = new Firebase(firebaseUrl + "/.info/connected");
  connectedRef.on("value", function(snapshot) {
    if (snapshot.val() === true) {
      console.log("Connected to firebase:", firebaseUrl);
    } else {
      console.log("Not connected to firebase:", firebaseUrl);
    }
  });
});
```

Let's walk through this code.
We need to connect to the remote Firebase.  From our reading, we know that we start with a base url and change the path to identify the specific resource we want.
- store the base url in `firebaseUrl`
- make a reference to the specific path, provided by Firebase, for checking connection: `/.info/connected`.
- Listen for any changes in the data stored at this location via [`on`](https://www.firebase.com/docs/web/api/query/on.html).
```
connectedRef.on("value", ...
```

#### What makes a resource?

Q. How are we creating the current ngResource?
---

A. instantiate a module, named "grumbleServices" and add that module as a dependency in "app.js".   

This service manages persisting our Grumbles.  We want to use the same names and interface (where possible).  Just changing the inner functionality.

Let's add our new dependency: "firebase".

```
var grumbleServices = angular.module('grumbleServices', ['ngResource', 'firebase']);
```



### First stop?  Index.

Q. What does our index controller expect?
---

> A. `Grumble.query();`

To manage a list of grumblers, we'll need an Array.

#### Research: [Synchronized Arrays](https://www.firebase.com/docs/web/libraries/angular/guide/synchronized-arrays.html)


### Grumble.query()

```js
grumbleServices.factory('GrumbleFirebase', ['$firebaseObject','$firebaseArray', grumbleFirebase]);

// Manages resources in friebase
// mirrors ngResource interface
function grumbleFirebase($firebaseObject, $firebaseArray) {
  // get reference to grumbles "namespace"
  var grumblesRef = new Firebase(firebaseUrl + "/grumbles");

  // retrieve our grumbles
  var grumbles = $firebaseArray(grumblesRef);

  // mirror ngResource interface
  var Grumble = {
    query: function(){ return grumbles; },
  }
  // Don't forget to...
  return Grumble;
});
```

- get the reference to our grumbles
- create an Angular Factory, passing the Firebase dependencies
- retrieve our grumbles
- support `Grumble.query()`, see "js/controllers/grumbles.js"
- return our Grumble

Let's refresh our list of grumbles: http://localhost:3000/#/grumbles.  

Q. What do you see?  Nothing? Why?
---

> A. (sing it with me) Weeeee ain't got no grumbles. Nobody.  Cares for them.  Nobody. I-i-i-i-i-i'm so...

### And so, they created a Grumble

Looking in our controller, we see:

```js
Grumble.save(this.grumble,...
```

This prompts us to add `save` to our Grumble interface:

```js
var Grumble = {
  query: function(){ return grumbles; },
  save: function( grumble, callback ){
    // persist our grumble
    grumbles.$add(grumble).then(function(ref) {
      // and pass the saved grumble back
      callback(grumble);
    });
  }
  return Grumble;
}
```

Returning to the browser, we create a new Grumble.  Only to see:
```
Argument 'grumbleController' is not a
```

Not much to go on.  What's the url?

```
http://localhost:3000/#/grumbles/undefined
```

Q. What's missing?
---

> A. What happened to our grumble's `id`?

Let's check it just after it's saved, before we redirect to the "show" page.

```js
console.log("Saving (for create)", grumble)
```

Results:

```
Saving (for create) Object {title: "test 99", authorName: "mms"}
```

What does `add` do?

> $add(newData)

>Creates a new record in the database and adds the record to our local synchronized array.
>This method returns a promise which is resolved after data has been saved to the server. The promise resolves to the Firebase reference for the newly added record, providing easy access to its key.

And here's why they pay me the big bucks.

```js
var list = $firebaseArray(ref);
list.$add({ foo: "bar" }).then(function(ref) {
  var id = ref.key();
  console.log("added record with id " + id);
  list.$indexFor(id); // returns location in the array
});
```

Oh.  It doesn't change the grumble that is passed in.  It resolves to a reference for the newly added record.  We could return the new key, but we would have to change the Controller to support that.  The Controller expects a grumbler.  Let's send back a grumbler with an `id`.

```
// WORKAROUND: this is the original Grumbler, with it's new id.
// TODO: just pass the id/key
grumble.id = ref.key();
// and pass the saved grumble back
callback(grumble);
```

Q. What do you expect when we refresh this page?
---

> A.

```
{{ grumbleCtrl.grumble.title }}
```

Q. What's wrong?
---

> A. We are on the "show" route.  Our new Resource only supports `query` & `save`.

Workaround.  Check via index for now.  Ah, that looks much better.  But wait!  Look at those links.  Where's the id?

### Update the links on the index view.

Seriously?  This is why they pay us to do this.  And.. this is the point where you realize why you took this course.

Remember back when we researched [Synchronized Arrays](https://www.firebase.com/docs/web/libraries/angular/guide/synchronized-arrays.html)?  In there they mentioned,
> We can also access an item's id in ng-repeat with $id.

Or, maybe you get lucky enough to type the right search into Google AND you read past the first answer, to [find this](http://stackoverflow.com/questions/19308135/access-firebase-unique-ids-within-ng-repeat-using-angularfire-implicit-sync)

Or maybe, just maybe, you've got someone on your team that can clue you in. :)

> Aside: At this point, I spent many hours trying to find a way to alias `$id` as `id`.  I wanted to mirror the current interface, so I could leave the rest of the code alone AND not become dependent on an angularfire specific interface.  I didn't find a way. :(

Onward!  Our links get the right path once the index view uses `grumble.$id`. We have to replace `grumble.id` with `grumble.$id`.

> For the entire app?

That's up to you.  Personally, I would change them as needed.  We certainly should confirm your hypothesis, by testing it here first.

Don't forget the one in `Grumble.save`.

After updating index.html and  


### You DO: Finally, we show the Grumble. (35 min)



Timings:
- Break?
- 10: get (Pro tip: $id)
- 30 min: review


Hints:
- There just may be other places that need ``$id`.
- `mockComment = { authorName: 'REPLACE ME', created_at: '01/01/77', content: "Please replace me?" };`


## Conclusion (5 min)

??? Needs questions







## Resources

- https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-42/q1_2015_img1.png
- [Simple (ruby) Server](http://www.benjaminoakes.com/2013/09/13/ruby-simple-http-server-minimalist-rake/)
- https://www.firebase.com/tutorial/#session/gf3bu09wvlf
