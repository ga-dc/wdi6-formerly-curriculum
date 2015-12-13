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
$ cd grumblr_rails_api
$ touch config/secrets.yml
# Follow the instructions in the repo README re: secrets.yml
$ bundle install
$ rails s
```

## Walkthrough of Current App

We'll continue working on our front-end Grumblr Application from where you left off in your UI Router lesson. Follow either of the two instructions below to get your starter code.

  Go to [https://github.com/ga-dc/grumblr_angular/tree/2.0.0](https://github.com/ga-dc/grumblr_angular/tree/2.0.0) and download that ZIP file. Unzip and move it to `wdi/in-class`.

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
    <script src="js/grumbles/grumble.factory.js"></script>
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

## Factories and Services

First up, we'll convert the hardcoded data to read from an external API using a factory. A factory, however, is not the only way to accomplish this. Let's see what tools we have at our disposal.

### Factory
A factory is an Angular component that adds functionality to an Angular application. Factories allow us to separate concerns and extract functionality that would otherwise be defined in our controller. We do this by creating an object, attaching properties and methods to it and then returning that object. Here's a simple example...

```js
(function(){
  angular
    .module( "appName" )
    .factory( "factoryName", function(){
      return {
        helloWorld: function(){
          console.log( "Hello world!" );
        }
      }
    }
  ]);
}());
```
> Factories can also take dependencies. In that case, the arguments passed into a factory will look a little different. We'll see that in play when we learn about `ng-resource` later today.

Now we can call it in a controller...

```js
(function(){
  angular
    .module( "appName" )
    .controller( "controllerName", [
      // The factory is passed in as a dependency to our controller.
      "factoryName",
      controllerFunction
    ]);

  function controllerFunction(){
    // When `helloWorld` is called on the controller, it runs the function that we defined in our factory.
    this.helloWorld = factoryName.helloWorld();
  }
}());
```
> This is nice because it keeps our controller clean. We leave the function declaration(s) to our factory.

### Service
A service achieves the same purpose as a factory. It is instantiated, however, using the `new` keyword. Instead of defining an object and returning it, we attach properties and methods to `this`. Let's recreate the above factory using a service...

```js
(function(){
  angular
    .module( "appName" )
    .service( "serviceName", function(){
      this.helloWorld = function(){
        console.log( "Hello world!" );
      }
    })
})
```

And in our controller...
```js
(function(){
  angular
    .module( "appName" )
    .controller( "controllerName", [
      "serviceName",
      controllerFunction
    ]
  });

  function controllerFunction(){
    this.helloWorld = serviceName.helloWorld();
  }
}());
```

### What's the Difference?

Our controllers look nearly identical in both examples. The difference is in the content of the factory and service. **What do you notice?**

#### Which One Should I Use?

> Is it worth going into how, under the hood, instantiating a service actually involves instantiating a factory?

### Create Grumble Factory

Let's make a factory that's actual useful. It's purpose: enable us to perform CRUD functions on our Rails Grumblr API.  

By default, Angular does not include a way to interact with APIs.  For that, there is a separate module, called [angular-resource](https://docs.angularjs.org/api/ngResource).

Let's include it in our application using a CDN.

```html
<!-- index.html -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-beta.2/angular-resource.min.js"></script>
```

Add `ngResource` as a dependency to our application in `js/grumbles/grumbles.js`.

```js
// js/grumbles/grumbles.js

(function(){
  angular
    .module( "grumbles", [
      "ngResource"
    ]);
}());
```

Create a new file `js/grumbles/grumble.factory.js` and include in `index.html`.

```html
<!-- index.html -->
<script src="js/grumbles/grumble.factory.js"></script>
```
> Note the file naming syntax! Not mandatory but we're choosing to follow [this Angular style guide](https://github.com/johnpapa/angular-styleguide).

```js
// js/grumbles/grumble.factory.js
(function(){
  angular
    .module( "grumbles" )
    .factory( "GrumbleFactory", [
      "$resource",
      FactoryFunction
    ]);

    function FactoryFunction( $resource ){
      return $resource( "http://localhost:3000/grumbles/:id" );
    }
}());
```
> Naming this function `controllerFunction` is another stylistic decision. We can call it whatever we want.

Out of the box, this gives us several methods for our newly defined `Grumble` service...

* `Grumble.get`
* `Grumble.save`
* `Grumble.query`
* `Grumble.remove`
* `Grumble.delete`

When the data is returned from the server, the response object is an instance of the resource class. The actions `save`, `remove` and `delete` are available on it as methods with the `$` prefix. This allows you to easily perform CRUD operations on server-side data like this...

```js
var Grumble = $resource('/grumbles/:id');
var grumble = Grumble.get( { id:123 }, function(grumble) {
  grumble.abc = true;
  grumble.$save();
});
```
> Perform this in the console. Highlight what form the response is returned as.

### I DO: Update Index Controller

```js
// js/controllers/index.controller.js
(function(){

  angular
    .module( "grumbles" )
    .controller( "GrumbleIndexController", [
      "GrumbleFactory",
      controllerFunction
    ]);

    // Whenever `.grumbles` is called on our ViewModel, it returns the response from `.query()`
    function controllerFunction( GrumbleFactory ){
      this.grumbles = GrumbleFactory.query();
    }

}());
```
> Demonstrate `.query` in console.

### YOU DO: Delete and Create

Replace the `delete` and `create` methods to use our new `Grumble` service.

Refrain from modifying the existing HTML in `/js/index.html` and `/js/show.html` if possible.

We'll refactor this later and separate logic into separate controllers.

## Break

For the rest of class we're going to be adding the missing CRUD functionality to our application. Using only the knowledge we have so far, this will make our application a multi-page application. After tomorrow's **Custom Directives** class, you will be converting Grumblr into a more fluid single page application.  

### I DO: New/Create Grumble

1. Link to a new page  
2. Define a route  
3. Create newGrumbleController  
4. New template in js/views called new.html  

### YOU DO: Edit

Do the same as above, but with `edit`! Just do the route and view - don't worry about updating grumbles on the server.

## I DO: Update

Angular doesn't have opinions about REST or how things get updated. As a result,
we have to create our own `update` method which will make a `PUT` request
to the server.

```js
grumbleServices.factory('Grumble', ['$resource', function($resource) {
  return $resource('http://grumblr.wdidc.org/grumbles/:id', {}, {
    update: { method:'PUT' }
  });
}]);
```

You can now update a grumble like so...

```js
this.grumble.$update({id: this.grumble.id})
```

**or**  

```js
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
