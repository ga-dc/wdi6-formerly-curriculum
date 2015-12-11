# Angular Services and Factories

## Learning Objectives

* Explain what dependency injection is and what problem it solves
* Explain the purpose of services in Angular
* Create a custom service to access data from an api
* Explain the purpose of the $routeProvider in Angular
* Create restful client-side routes using $routeProvider
* Explain the purpose of templates in Angular
* Use the ng-view directive to load angular templates
* Define multiple controllers in a single module
* Use $routeParams and $location to access query parameters and update the URL
* Difference between Service and Factory.
* Create separate views and routes for each CRUD action
* Compare/contrast the components of angular to OOJS / Backbone.js

## Overview of Today's Lesson (role of Templates, Routers, and Services)

Today we will...  

* Use a service so that we can connect to an API to store our data.
* Use templates to organize reusable chunks of HTML.
* Use multiple controllers to give context to a view.

## Set Up Grumblr API

Let's start by cloning and running a Grumblr Rails API in the background. Our front-end Grumblr application will make AJAX calls to this API.

  ```bash
  $ git clone git@github.com:ga-dc/grumblr_rails_api.git
  $ bundle install
  $ rails s
  ```

## Walkthrough of Current App

We'll continue working on our front-end Grumblr Application from where you left off in your UI Router lesson. Follow either of the two instructions below to get your starter code.

  Go to (https://github.com/ga-dc/grumblr_angular/tree/2.0.0)[https://github.com/ga-dc/grumblr_angular/tree/2.0.0] and download that ZIP file. Unzip and move it to `wdi/in-class`.

  **or**  

  ```bash
  $ git clone git@github.com:ga-dc/grumblr_angular.git
  $ git checkout 2e1e3b1468b459ecc62542adb7b494a9b9d44709
  ```

Let's do a walkthrough of the application as it stands.

```html
<!-- index.html -->

<!DOCTYPE html>
<html data-ng-app="grumblr">
  <head>
    <title>Angular</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-resource.min.js"></script>

    <script src="js/app.js"></script>
    <script src="js/grumbles/grumbles.js"></script>
    <script src="js/grumbles/index.controller.js"></script>
  </head>
  <body>
    <h1>Grumblr</h1>
    <main data-ui-view></main>
  </body>
</html>
```
> What is `ng-app` doing?
> What is `data-ui-view` doing?

```html
<!-- js/grumbles/index.html -->

<h2>These are all the Grumbles</h2>

<div data-ng-repeat="grumble in GrumbleIndexViewModel.grumbles">
  <p>{{grumble.title}}</p>
</div>
```
> What does ng-repeat do?
> This index file is functioning the same as what view tool in Rails?

```html
<!-- js/grumbles/show.html -->
<h2>This is a Grumble</h2>
```

```js
// js/app.js

"use strict";

(function(){
  angular
  .module("grumblr", [
    "ui.router",
    "grumbles"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("grumbleIndex", {
      url: "/grumbles",
      templateUrl: "js/grumbles/index.html",
      controller: "GrumbleIndexController",
      controllerAs: "GrumbleIndexViewModel"
    })
    .state("grumbleShow", {
      url: "/grumbles/:id",
      templateUrl: "js/grumbles/show.html"
    });
  }
}());
```
> What is an Angular module?
> What arguments are being passed into the module?
> What purpose does UI Router serve in Angular?
> What does each `.state` represent?
> What is `controllerAs:`?

```js
// js/grumbles/grumbles.js

"use strict";

(function(){
  angular
  .module("grumbles", []);
}());
```
> Why don't we have to pass anything into this module?

```js
// js/grumbles/index.controller.js

"use strict";

(function(){
  angular
  .module("grumbles")
  .controller("GrumbleIndexController", [
    GrumbleIndexControllerFunction
  ]);

  function GrumbleIndexControllerFunction(){
    this.grumbles = [
      {title: "These"},
      {title: "Are"},
      {title: "Hardcoded"},
      {title: "Grumbles"}
    ]
  }
}());
```
> What purpose does a controller serve in Angular? What might be a more accurate thing to call it?
> Why have we named our controller this way?

You'll notice that, at the moment, we have hard-coded models into the Grumbles controller. Today we'll be learning about `$resource`, an interace that allows us to make calls to that Rails API we set up at the start of class.

## Services

First up, we'll convert the hardcoded data to read from an external API using a service.

Useful terminology:

- **Factory**
  - You create an object, attach properties and methods, and return that object
- **Service**
  - Like a factory, but instantiated with `new`. Instead of defining an object and returning it, we
  attach properties and methods to `this`
- **Provider**
  - Used to create configurable Service objects. Useful if you wanted to have separate development and production URLs

### Create Grumble Factory

By default, angular does not include a way to interact with APIs.

For that, there is a separate module, called [angular-resource](https://docs.angularjs.org/api/ngResource).

Install with:

    $ bower install --save angular-resource

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

```html
<!-- index.html -->
<script src="js/services/grumble.js"></script>
```

```js
// js/services/grumble.js
(function() {
  var grumbleServices = angular.module('grumbleServices', ['ngResource']);
  grumbleServices.factory('Grumble', ['$resource', function($resource) {
    return $resource('http://grumblr.wdidc.org/grumbles/:id');
  }]);
})();
```

and add `grumbleServices` as a dependency in `app.js`

```js
// app.js

(function() {
  var app = angular.module('grumblr', [
    'grumbleControllers',
    'ngResource',
    'grumbleServices'
  ]);
})()
```

Out of the box, this gives us several methods for our newly defined `Grumble` service:

- `Grumble.get`
- `Grumble.save`
- `Grumble.query`
- `Grumble.remove`
- `Grumble.delete`

>When the data is returned from the server then the object is an instance of the resource class. The actions save, remove and delete are available on it as methods with the $ prefix. This allows you to easily perform CRUD operations (create, read, update, delete) on server-side data like this:

```js
// for example...
var User = $resource('/user/:userId');
var user = User.get({userId:123}, function(user) {
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

### You do: Delete, and Create

[Docs here](https://docs.angularjs.org/api/ngResource/service/$resource#usage)

Replace the `delete` and `create` methods to use our new `Grumble` service.

- Reuse existing HTML when possible
  - https://github.com/ga-dc/grumblr_angular/blob/controllers-and-directives/index.html

We'll refactor this later and separate logic into separate controllers.

## Break

## Creating Templates / Routes

As our application grows in complexity, it becomes more difficult to manage state.

We'll use the built-in angular router and templating to separate our concerns.

### How the pieces fit together

![](https://i-msdn.sec.s-msft.com/dynimg/IC416621.png)

You should recognize this diagram from yesterday's discussion of MVVM.

For each route, we will have a corresponding diagram.

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

Finish early? Check out [ui-router](https://github.com/angular-ui/ui-router) from the angular-ui team
and replace the ng-router with ui-router.

Or read the [tldr version](http://stackoverflow.com/a/21024270/850825)

#### $location (we do)

Move delete link to show page. It would be useful if we could redirect the user
or rather, update the url and switch out the template after a Grumble is deleted.

We can manipulate the url using angular's `$location` service:

```js
// js/controllers/grumbles.js
// show controller (handles delete link on show page)
app.controller('grumbleController', ['$routeParams','$location','Grumble', function($routeParams, $location, Grumble){
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
this.grumble.$update({id: this.grumble.id})
// or
Grumble.update({id: this.grumble.id}, this.grumble, function(){
  $location.path("/grumbles/" + self.id)
})
```

### Update edit view to update grumbles on server

- Create an `edit` route
- Link to it from the show view
- Create an edit template
- Create an `editGrumble` controller with an `update` method
- invoke `update()` using `ng-click` or `ng-submit`
