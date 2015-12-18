# Factories, Services and `ngResource`

## Screencasts
- Dec 16, 2015 (Robin)
  - [Part 1](https://youtu.be/Ni-KnX9eEDI)
  - [Part 2](https://youtu.be/Jm4lmgpQfJ8)
  - [Part 3](https://youtu.be/dP0YsPTnaTU)
  - [Part 4](https://youtu.be/oEFmmQgh4cE)

## Learning Objectives

* Explain the purpose of and differentiate between Factories and Services in Angular.
* Use `ngResource` to pull information from an API.
* Define multiple controllers in a single module.
* Use $stateParams to access query parameters and update the URL.
* Create separate views and routes for each CRUD action.

## Framing (2.5 minutes / 0:02)

In the last couple of classes, we've been using hard coded values in our controller to act as our "backend". We probably won't ever do that again. Instead we'll be connecting to an external API using resources and providing an interface to models using factories.

## Set Up Grumblr API (2.5 minutes / 0:05)

Let's start by cloning and running a Grumblr Rails API in the background. Our front-end Grumblr application will make AJAX calls to this API.

```bash
$ git clone git@github.com:ga-dc/grumblr_rails_api.git
$ cd grumblr_rails_api
$ bundle install
$ rake db:create
$ rake db:migrate
$ rake db:seed
$ rails s
```

## You do: Walkthrough of Current App (20 minutes / 0:25)

> With the person next to you, take 10 minutes to walk through the following part of the lesson plan, up to the `Factories and Services` header. Read our descriptions of the different components.

> As you go, make a list of up to 3 things on which you could use the most clarification. We'll then take the next 10 minutes to clarify them as a class.

Where we're picking up the app, it has only a functioning index route that uses grumbles hardcoded into the index controller.

Also, it doesn't use `$locationProvider` to remove the hashmark from URLs: all the URLs will be something like index.html#/grumbles/32. This makes things a bit easier for development: without the hashmark refreshing the page doesn't work, but it does with the hashmark.

Grab the starter code by running the below lines in Terminal...

```bash
$ git clone git@github.com:ga-dc/grumblr_angular.git
$ git checkout -b factory-resource 2.0.0
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
  </head>
  <body>
    <h1><a data-ui-sref="grumbleIndex">Grumblr</a></h1>
    <main data-ui-view></main>
  </body>
</html>
```
> **data-ng-app**: Establishes the domain of our Angular application.  
>  
> **data-ui-sref:** This creates a link that, when clicked, directs the user to `#/grumbles` without reloading the page.
> 
> We use this instead of the usual `href` because `sref` refers to a state and automatically grabs the URL for that state. It's like link helpers in rails.
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
> **.module:** A module is a container for controllers, directives, services -- all parts of our application. A module can have sub-modules (e.g., `grumbles`).  
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
A factory is an Angular component that adds functionality to an Angular application. It does this by generating new instances of something. In this case, Grumbles.  

Factories allow us to separate concerns and extract functionality that would otherwise be defined in our controller. We do this by creating an object, attaching properties and methods to it and then returning that object. Here's a simple example...

> No need to code along since this won't be incorporated into Grumblr.

```js
(function(){
  angular
    .module( "appName" )
    .factory( "factoryName", [
      FactoryFunction
    ]);

  function FactoryFunction(){
    return {
      this.helloWorld: function(){
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

  function controllerFunction( factoryName ){
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

  function controllerFunction( serviceName ){
    this.helloWorld = serviceName.helloWorld();
  }
}());
```

### What's the Difference?

Our controllers look nearly identical in both examples. The difference is in the content of the factory and service. **What do you notice?**

#### Which One Should I Use?

The answer is it doesn't really matter. You might take a look at this "cheat sheet" of what should be used when:

[http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html](http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html)

Great article comparing Factories, Services, & Providers:

[http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/](http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/)

### I DO: Create Grumble Factory (15 minutes / 0:55)

Let's make a factory that's actually useful. It's purpose: enable us to perform CRUD actions on our Rails Grumblr API.  

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
> Where's `update`, you ask? We're going to define that ourselves later on.

When the data is returned from the server, the response object is an instance of the resource class. The actions `save`, `remove` and `delete` are available on it as methods with the `$` prefix. This allows you to easily perform CRUD operations on server-side data like this...  

```js
var Grumble = $resource('/grumbles/:id');
var grumble = Grumble.get( { id:123 }, function(grumble) {
  grumble.abc = true;
  grumble.$save();
});
```

### I DO: Update Index Controller (5 minutes / 1:00)

Let's update our index controller so that, instead of using hard-coded grumbles, `this.grumbles` is set to the result of making a `GET` request to `http://localhost:3000/grumbles`.

```js
// js/controllers/index.controller.js
(function(){

  angular
    .module( "grumbles" )
    .controller( "GrumbleIndexController", [
      "GrumbleFactory",
      GrumbleIndexControllerFunction
    ]);

    // Whenever `.grumbles` is called on our ViewModel, it returns the response from `.query()`
    function GrumbleIndexControllerFunction( GrumbleFactory ){
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

```js
.state("grumbleShow", {
  url: "/grumbles/:id",
  templateUrl: "js/grumbles/show.html"
});
```

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
The controller requires access to ui-router's `$stateParams` service. We pass it in the same way we do `GrumbleFactory`.  
* `$stateParams` returns an object containing the information passed into, in this case, `grumbleShow`. If we print it to the console, it looks like this...
```js
Object {id: "6"}
```

The controller will have a `grumble` property. It should be set to the return value of `ngResource`'s `get` method.
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


### I DO: New/Create (15 minutes / 1:35)

#### Create `grumbleNew` Route

```js
// app.js

$stateProvider
  .state("grumbleIndex", {
    url: "/grumbles",
    templateUrl: "js/grumbles/index.html",
    controller: "GrumbleIndexController",
    controllerAs: "GrumbleIndexViewModel"
  })
  .state("grumbleShow", {
    url: "/grumbles/:id",
    templateUrl: "js/grumbles/show.html",
    controller: "GrumbleShowController",
    controllerAs: "GrumbleShowViewModel"
  })
  .state("grumbleNew", {
    url: "/grumbles/new",
    templateUrl: "js/grumbles/new.html",
    controller: "GrumbleNewController",
    controllerAs: "GrumbleNewViewModel"
  });
```

#### Create `new.html`

Let's start by creating a form view for creating Grumbles.

```html
<!-- js/grumbles/new.html -->

<h2>Create Grumble</h2>

<form>
  <input placeholder="Title" data-ng-model="GrumbleNewViewModel.grumble.title" />
  <input placeholder="Author name" data-ng-model="GrumbleNewViewModel.grumble.authorName" />
  <input placeholder="Photo URL" data-ng-model="GrumbleNewViewModel.grumble.photoUrl" />
  <textarea placeholder="Grumble content" data-ng-model="GrumbleNewViewModel.grumble.content"></textarea>
  <button type="button" data-ng-click="GrumbleNewViewModel.create()">Create</button>
</form>
```
> Fields are matched to grumble properties using the `data-ng-model` directive.  
#### Add New Link to `index.html`

This link will trigger the `grumbleNew` state when clicked.

```html
<a data-ui-sref="grumbleNew">New Grumble</a>

<h2>These are all the Grumbles</h2>

<div data-ng-repeat="grumble in GrumbleIndexViewModel.grumbles">
  <p><a data-ui-sref="grumbleShow({id: grumble.id})">{{grumble.title}}</a></p>
  <a data-ui-sref="grumbleEdit({id: grumble.id})">Edit</a>
</div>
```

#### Link to `new.controller.js` in `index.html`

```html
<!-- index.html -->

<script src="js/app.js"></script>
<script src="js/grumbles/grumbles.js"></script>
<script src="js/grumbles/index.controller.js"></script>
<script src="js/grumbles/show.controller.js"></script>
<script src="js/grumbles/new.controller.js"></script>
<script src="js/grumbles/grumble.factory.js"></script>
```

#### Create `new.controller.js`

```js
// js/grumbles/new.controller.js

"use strict";

(function(){
  angular
    .module( "grumbles" )
    .controller( "GrumbleNewController", [
      "GrumbleFactory",
      GrumbleNewControllerFunction
    ]);

    function GrumbleNewControllerFunction( GrumbleFactory ){
      this.grumble = new GrumbleFactory();
      this.create = function(){
        this.grumble.$save()
      }
    }
}());
```

### YOU DO: Edit/Update (20 minutes / 1:55)

The steps here are pretty similar to those of the last "I Do," with a few exceptions. The biggest one is...

#### Define an `update` method in the Factory

`ngResource` does not come with a native `update` method. We need to define it in the `FactoryFunction` return statement, indicating that `update` corresponds to a `PUT` request.  

```js
// js/grumbles/grumble.factory.js

"use strict";

(function(){
  angular
    .module( "grumbles" )
    .factory( "GrumbleFactory", [
      "$resource",
      FactoryFunction
    ])

  function FactoryFunction( $resource ){
    return $resource( "http://localhost:3000/grumbles/:id", {}, {
        update: { method: "PUT" }
    });
  }
}());
```

The rest of the steps are a bit more straightforward...  

#### Create `grumbleEdit` Route

Follow the same process we did for `grumbleNew`, making sure to use the word `edit` wherever necessary.  

Not sure what URL to use? Think about what the path would look like for an edit form in a Rails app...  

#### Update `index.html`

Let's update our `ng-repeat` div so that it also displays a link with each Grumble that will direct us to an edit page.

```html
<!-- js/grumbles/index.html -->

<div data-ng-repeat="grumble in GrumbleIndexViewModel.grumbles">
  <p><a data-ui-sref="grumbleShow({id: grumble.id})">{{grumble.title}}</a></p>
  <a data-ui-sref="grumbleEdit({id: grumble.id})">Edit</a>
</div>
```
#### Create `edit.html`

The form on this page will look a lot like the one in `new.html`, but you'll need to make some changes to it...
* Reference the proper controller instance. You probably called it `GrumbleEditViewModel`.
* Replace your inputs' `placeholder` attribute with `value` so we have some content to work with in our input fields upon page load.
* Set these value attributes to the contents of the Grumble like so...
```html
<input value="GrumbleEditViewModel.grumble.title" ... >
```
* In the button's `ng-click` directive, reference a yet-to-be-defined `.update` method instead of `.create`.

#### Link to Edit Controller in `index.html`

#### Create `edit.controller.js`

The big addition here is our controller's `update` method. You'll notice that it makes use of `$update`. THIS is the method we defined in `js/grumbles/grumble.factory.js`. It is preceded by a `$` because this is how `ngResource` indicates it's an instance method.

```js
"use strict";

(function(){
  angular
    .module( "grumbles" )
    .controller( "GrumbleEditController", [
      "GrumbleFactory",
      "$stateParams",
      GrumbleEditControllerFunction
    ]);

  function GrumbleEditControllerFunction( GrumbleFactory, $stateParams ){
    this.grumble = GrumbleFactory.get({id: $stateParams.id});
    this.update = function(){
      this.grumble.$update({id: $stateParams.id})
    }
  }
}());
```

### BREAK (10 minutes / 2:05)

### YOU DO: Delete (10 minutes / 2:15)

Contrary to how we've done things for every other RESTful route, we will not be creating a separate controller for `delete`. This is because we want to be able to delete a Grumble simply by clicking a button on each grumble's show page.

#### Add Delete Button to `edit.html`

When clicked, the delete button will trigger a `destroy` method that we have yet to define in `edit.controller.js`.

```html
<form>
  <input value="GrumbleEditViewModel.grumble.title" data-ng-model="GrumbleEditViewModel.grumble.title" />
  <input value="GrumbleEditViewModel.grumble.authorName" data-ng-model="GrumbleEditViewModel.grumble.authorName" />
  <input value="GrumbleEditViewModel.grumble.photoUrl" data-ng-model="GrumbleEditViewModel.grumble.photoUrl" />
  <textarea value="GrumbleEditViewModel.grumble.content" data-ng-model="GrumbleEditViewModel.grumble.content"></textarea>
  <button data-ng-click="GrumbleEditViewModel.update()">Update</button>
  <button data-ng-click="GrumbleEditViewModel.destroy()">Delete</button>
</form>
```

#### Add Destroy Method to `edit.controller.js`

```js
"use strict";

(function(){
  angular
    .module( "grumbles" )
    .controller( "GrumbleEditController", [
      "GrumbleFactory",
      "$stateParams",
      GrumbleEditControllerFunction
    ]);

  function GrumbleEditControllerFunction( GrumbleFactory, $stateParams ){
    this.grumble = GrumbleFactory.get({id: $stateParams.id});
    this.update = function(){
      this.grumble.$update({id: $stateParams.id})
    }
    this.destroy = function(){
      this.grumble.$delete({id: $stateParams.id});
    }
  }
}());
```

### Closing/Questions (15 minutes / 2:30)

### Resources

* Angular documentation for [ngResource](https://docs.angularjs.org/api/ngResource) and [$resource](https://docs.angularjs.org/api/ngResource/service/$resource).
