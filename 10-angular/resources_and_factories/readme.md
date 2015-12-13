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

## Overview (2.5 minutes / 0:02)

Today we will...  

* Use a factory so that we can connect to an API to store our data.
* Use templates to organize reusable chunks of HTML.
* Use multiple controllers to give context to a view.

## Set Up Grumblr API (2.5 minutes / 0:05)

Let's start by cloning and running a Grumblr Rails API in the background. Our front-end Grumblr application will make AJAX calls to this API.

```bash
$ git clone git@github.com:ga-dc/grumblr_rails_api.git
$ cd grumblr_rails_api
$ touch config/secrets.yml
# Follow the instructions in the repo README re: secrets.yml
$ bundle install
$ rails s
```

## Walkthrough of Current App (20 minutes / 0:25)

We'll continue working on our front-end Grumblr Application from where you left off in your UI Router lesson. Follow either of the two instructions below to get your starter code.

  Go to [https://github.com/ga-dc/grumblr_angular/tree/2.0.0](https://github.com/ga-dc/grumblr_angular/tree/2.0.0) and download that ZIP file. Unzip and move it to `wdi/in-class`.

  **or**  

  ```bash
  $ git clone git@github.com:ga-dc/grumblr_angular.git
  $ git checkout 2e1e3b1468b459ecc62542adb7b494a9b9d44709
  ```

#### index.html

```html
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
    <h1><a data-ui-sref="grumbleIndex">Grumblr</a></h1>
    <main data-ui-view></main>
  </body>
</html>
```
> **data-ng-app**: Establishes the domain of our Angular application.  
>  
> **data-ui-sref:** This creates a link that, when clicked, directs the user to `#/grumbles` without reloading the page. We must use this instead of the traditional `href` so that triggers our router.  
>  
> **data-ui-view:** Whichever view is triggered by the user will be displayed in the DOM element with this attribute.  

#### js/grumbles/index.html

```html
<h2>These are all the Grumbles</h2>

<div data-ng-repeat="grumble in GrumbleIndexViewModel.grumbles">
  <p>{{grumble.title}}</p>
</div>
```
> **data-ng-repeat:** Allows us to iterate through each item in the array passed in as an argument. In this case, the controller's `grumbles` property.  
>  
> **GrumbleIndexViewModel:** Represents the current instance of our index controller.  

#### js/app.js

```js
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
> **.module:** Instantiates. A module is a container for controllers, directives, services -- all parts of our application. A module can have sub-modules (e.g., `grumbles`).  
>  
> **ui.router:** A 3rd party module that functions as a router.  Allows our application to have multiple states.  
>  
> **grumbles:** A sub-module to which we attach the components of our application (e.g., controllers).  
>  
> **$stateProvider:**  A ui-router service - more on those later! - that allows us to define states in our application.  
>  
> **.state:** Used to define an individual state in our application. Arguments include (1) state name and (2) an object that contains information about route, template and controller used.  

#### js/grumbles/grumbles.js

```js
"use strict";

(function(){
  angular
  .module("grumbles", []);
}());
```
> **grumbles:** Definition of `grumbles` sub-module.  

#### js/grumbles/index.controller.js

```js
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
> **GrumbleIndexController:** The name of this controller.  
>  
> **GrumbleIndexControllerFunction:** A function that contains this controller's behavior. This is a stylistic decision - we could have passed in an anonymous function to `.controller` if we wanted to.  

You'll notice that, at the moment, we have hard-coded models into the Grumbles controller. Today we'll be learning about `ngResource`, a module that allows us to make calls to that Rails API we set up at the start of class.

## Factories and Services (15 minutes / 0:40)

First up, we'll convert the hardcoded data to read from an external API using a factory. A factory, however, is not the only way to accomplish this. Let's see what tools we have at our disposal.

### Factory
A factory is an Angular component that adds functionality to an Angular application. Factories allow us to separate concerns and extract functionality that would otherwise be defined in our controller. We do this by creating an object, attaching properties and methods to it and then returning that object. Here's a simple example...

```js
(function(){
  angular
    .module( "appName" )
    .factory( "factoryName", [
      FactoryFunction
    ]);

  function FactoryFunction(){
    return {
      this.helloWorld = function(){
        console.log( "Hello world!" );
      }
    }
  }
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
    .service( "serviceName", [
      ServiceFunction
    ]);

    function ServiceFunction(){
      this.helloWorld = function(){
        console.log( "Hello world!" );
      }
    }
}());
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

### I DO: Create Grumble Factory (15 minutes / 0:55)

Let's make a factory that's actual useful. It's purpose: enable us to perform CRUD actions on our Rails Grumblr API.  

By default, Angular does not include a way to interact with APIs. For that, there is a separate module, called [ngResource](https://docs.angularjs.org/api/ngResource).  

Let's include it in our application using a CDN.  

```html
<!-- index.html -->

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js"></script>
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

<script src="js/app.js"></script>
<script src="js/grumbles/grumbles.js"></script>
<script src="js/grumbles/index.controller.js"></script>
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

### I DO: Update Index Controller (5 minutes / 1:00)

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
### BREAK (10 minutes / 1:10)

### YOU DO: Show (20 minutes / 1:20)

#### Create and Link to a Show Controller File

```bash
$ touch js/grumbles/show.controller.js
```

```html
<!-- index.html -->
<script src="js/app.js"></script>
<script src="js/grumbles/grumbles.js"></script>
<script src="js/grumbles/index.controller.js"></script>
<script src="js/grumbles/show.controller.js"></script>
<script src="js/grumbles/grumble.factory.js"></script>
```

#### Add a Show `.state()` to `app.js`

Use the same format as we did with `grumbleIndex`.  
* You can chain the new `.state()` to the existing one.
* The `url` will require a placeholder for the individual grumble's unique identifier.  
> HINT: How did we represent this in Express?  

#### Update `index.html`

Each grumble listed here should link to its corresponding show page.

```html
<div data-ng-repeat="grumble in GrumbleIndexViewModel.grumbles | orderBy:'-created_at'">
  <p><a data-ui-sref="grumbleShow({id: grumble.id})">{{grumble.title}}</a></p>
</div>
```
> NOTE: The `data-ui-sref` attribute is not only set to route name `grumbleShow`, but `grumbleShow` also takes an `id` as an argument so that it knows which show page it should direct the user to.

#### Create a Show Controller

This will look very similar to the index controller, which a couple exceptions.
* The controller requires access to the `$stateParams` module.
* `ngResource`'s `get` method requires an object as an argument, which contains a key-value pair for the grumble's id.

```js
// js/grumbles/show.controller.js

"use strict";

(function(){
  angular
  .module("grumbles")
  .controller("GrumbleShowController", [
    "GrumbleFactory",
    "$stateParams",
    GrumbleShowControllerFunction
  ]);

  function GrumbleShowControllerFunction(GrumbleFactory, $stateParams){
    this.grumble = GrumbleFactory.get({id: $stateParams.id});
  }
}());
```

#### Update `show.html`

Use what you learned on your first day of Angular to create a show view for a Grumble. It should display the Grumble's title, author name, created at date, content and photo.  

#### Need Help?

[Here's the solution.](https://github.com/ga-dc/grumblr_angular/commit/892a8a2a190e64498723574ea8e6536a75c247ca)

Our app now matches the solution code for this class. We're going to spend the remainder of the lesson rounding out CRUD functionality in our application. Tomorrow you will learn about **Custom Directives** that will allow you to do this in true SPA fashion. But for now, we're going to use the same process we did when implementing `index` and `show`.

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
