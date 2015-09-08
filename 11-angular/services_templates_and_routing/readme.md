# Angular Services, Templates, and Routes

## Learning Objectives

- Explain what dependency injection is and what problem it solves
- Explain the purpose of the $routeProvider in Angular
- Explain the purpose of templates in Angular
- Explain the purpose of services in Angular
- Compare/contrast the components of angular to OOJS / Backbone.js
- Use $routeProvider and $location to access query parameters and update the URL
- Use the ng-view directive to load angular templates
- Define multiple controllers in a single module
- Create restful client-side routes using $routeProvider
- Create a custom service to access data from an api
- Create separate views and routes for each CRUD action

## Overview of Today's Lesson (role of Templates, Routers, and Services)

Introduce templates / routers / services / multiple controllers at a high level,
we're introducing these components to make our app more maintainable / readable.
Specifically, we'll be removing logic from the view, and breaking our views down
into smaller pieces. Additionally, our app will have proper, linkable routes.

Finally, we'll introduce a service so that we can connect to an API to store our
data.

Today's objectives include:

1. Represent state via routes.
2. Decouple views from behavior.
3. Persist data.

## Walkthrough of Current App

Make sure it's working locally, and motivate how the current app has the three
problems listed above.

To obtain the starter code for today, `cd` to `grumblr_angular`:

    $ git checkout -b templating-and-routing origin/controllers-and-directives-with-comments

## Services

First up, we'll convert the hardcoded data to read from an external API using a service.

- **Factory**
  - You create an object, attach properties and methods, and return that object
- **Service**
  - Like a factory, but instantiated with `new`. Instead of defining an object and returning it, we
  attach properties and methods to `this`
- **Provider**
  - Used to create configurable Service objects. Useful if you wanted to have separate development and production URLs

### Create Grumble Factory

Install [angular-resource](https://docs.angularjs.org/api/ngResource)

    $ bower install angular-resource

Link to it in index.html

```html
<script src="bower_components/angular-resource/angular-resource.js"></script>
```

Add `ngResource` as a dependency to our application.

```js
// js/app.js

var app = angular.module('grumblr', [
  'grumbleControllers',
  'ngResource'
])
```

create a new file in `js/services/grumble.js` and include in index.html

```js
// js/services/grumble.js
(function() {
  var grumbleServices = angular.module('grumbleServices', ['ngResource']);
  grumbleServices.factory('Grumble', ['$resource', function($resource) {
    return $resource('http://grumblr.wdidc.org/grumbles/:id');
  }]);
})();
```

Out of the box, this gives us several methods for our newly defined `Grumble` service:

- `Grumble.get`
- `Grumble.save`
- `Grumble.query`
- `Grumble.remove`
- `Grumble.delete`

>When the data is returned from the server then the object is an instance of the resource class. The actions save, remove and delete are available on it as methods with the $ prefix. This allows you to easily perform CRUD operations (create, read, update, delete) on server-side data like this:

```js
var User = $resource('/user/:userId');
var user = User.get({userId:123}, function() {
  user.abc = true;
  user.$save();
});
```


### Update Index Controller (I do)

```js
// js/controllers/grumbles.js
// index controller
grumbleControllers.controller('grumblesController', ['Grumble', function(Grumble) {
  this.grumbles = Grumble.query();
}]);
```

### You do: Delete, and create

[Docs here](https://docs.angularjs.org/api/ngResource/service/$resource#usage)

We'll refactor this later and separate logic into separate controllers.

## Break 

## Creating Templates / Routes

As our application grows in complexity, it becomes more difficult to manage state.

We'll use the built-in angular router and templating to separate our concerns.

### How the pieces fit together

![](https://i-msdn.sec.s-msft.com/dynimg/IC416621.png)
???

### Add `ngRoute`

    $ bower install --save angular-route

```html
<!-- index.html -->
<script src="bower_components/angular-route/angular-route.js"></script>
```

```js
// js/app.js
angular.module('grumblr', [
    'ngRoute',
    'ngResource',
    'grumbleControllers'
])
```

Create a routes.js file:

```js
// routes.js
(function(){
 var router = angular.module('grumbleRouter', []);
 router.config(['$routeProvider', function($routeProvider){
   $routeProvider.when("/grumbles",{
     templateUrl: 'js/views/grumbles/index.html',
     controller: 'grumblesController',
     controllerAs: 'grumblesCtrl'
   }); 
 }]);
})();
```

Specifying `controller` and `controllerAs` in the router config allows us to remove `ng-controller` from our view.

Effectively, this means each view will have its own controller.

Next, let's add `grumbleRouter` to `app.js` as module dependency.

```js
// js/app.js
angular.module('grumblr', [
    'ngRoute',
    'ngResource',
    'grumbleControllers',
    'grumbleRouter'
])
```

#### Index (I do)

in index.html add

`<div ng-view></div>`

Create a new file `js/views/grumbles/index.html`

in it:

```html
<div class='grumbles' ng-repeat>

</div>
```

### Show (You do)

well, almost. We need to create a separate controller for the show page. Typically, you will see one controller per view.

Let's create a new controller:

```js
...controller('grumbleController',['$routeParams','Grumble', function($routeParams, Grumble){
    this.grumble = Grumble.get({id: $routeParams.id})
  }])
```

#### You do: define a new route `/grumbles/:id` 

that: 

- loads the controller we just created 
- loads a new template in `js/views/grumbles/show.html`

This template should display:

- grumble title
- grumble author name
- grumble content
- grumble photoUrl

Add a link (using `ng-href`)on index page to link to show page.


#### $location (we do)

Move delete link to show page. It would be useful if we could redirect the user
or rather, update the url and switch out the template after a Grumble is deleted.

We can manipulate the url using angular's `$location` service:

```js
// js/controllers/grumbles.js
// show controller (handles delete link on show page)
grumbleControllers.controller('grumbleController', ['$routeParams','$location','Grumble', function($routeParams, $location, Grumble){
  this.grumble = Grumble.get({id: $routeParams.id});
  this.delete = function(id){
    Grumble.delete({id: id}, function(){
      $location.path("/grumbles")
    });
  }
}]);
```

Without the callback, the view would update before the delete request returns from the server.

We can force a reload of the data by updating the applications path.

## Lunch

#### New/Create Grumble (I do)

- link to a new page
- define a route
- create newGrumbleController
- new template in js/views called new.html

#### Edit (You do)

do the same as above, but with edit!
but just the route and view, dont worry about updating grumbles on the server


### I do: Edit/ Update

Angular doesn't have opinions about REST or how things get updated. As a result,
we have to create our own `update` method which will make a `PUT` request
to the server.

```js
grumbleServices.factory('Grumble', ['$resource', function($resource) {
  return $resource('http://grumblr.wdidc.org/grumbles/:id', {}, {
    update: {method:'PUT'}
  });
}]);
```

You can now update a grumble like so:

```js
this.grumble.$update
// or
Grumble.update(this.grumble, function(){

  $location.path("/grumbles/" + self.id)
})
```

### Update edit view to update grumbles on server



