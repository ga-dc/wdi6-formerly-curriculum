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

1. Represent state via routes.
2. Decouple views from behavior.
3. Persist data.

## Walkthrough of Current App

Make sure it's working locally, and motivate how the current app has the three
problems listed above.

## Services

Service vs Factory vs Provider

### Create Grumble Service

bower install ngresource
add ngResource js/app.js && index.html

create a new file in `js/services/grumble.js` and include in index.html

```js
return $resource
```

### Update Index Controller (I do)

in js/controllers/grumble.js

```js
this.grumbles = Grumble.query()
```

### You do: Delete, and create

we'll come back to this

## Creating Templates / Routes
### How the pieces fit together
### Add `ngRoute`

* `$ bower install --save angular-route`
* Add script tag to index
* Add as a dependency of our app in app.js (`ngRoute`)

Create a routes.js file:

bower install ng-route

```js
(function(){
 var router = angular.module('grumbleRouter', []);
 router.config(['$routeProvider', function($routeProvider){
   $routeProvider.when("/grumbles",{
     templateUrl: 'views/grumbles/index.html',
     controller: 'grumblesController',
     controllerAs: 'grumblesCtrl'
   }); 
 }]);
})();
```

add `grumbleRouter` to `app.js` as module dependency.

#### Index (I do)

in index.html add

`<div ng-view></div>`

Create a new file `js/views/grumbles/index.html`

in it:

```html
<div class='grumbles' ng-repeat>

</div>
```

#### Show (You do)

well, almost. We need to create a separate controller for the show page. Typically, you will see one controller per view.

Let's create a new controller:

```js
var grumbles = //hardcoded data
...controller('grumbleController',['$routeParams','$location',function($routeParams, $location){
    this.grumble = Grumble.get({id: $routeParams.id})
  }])
```

#### You do: define a new route `/grumbles/:id` that loads the controller we jsut created and a view that you create

add a link on index page to link to show route

move delete link to show page

#### $location (we do)

add delete to redirect back after deleting

#### New (I do)

- link to a new page
- define a route
- create newGrumbleController
- new template in js/views called new.html


#### Edit (You do)

do the same as above, but with edit!
 but just the route and view, dont worry about updating

##

### I do: Edit/ Update

add 

```js
update: {method: 'PUT'}
```

Angular doesn't have opinions about REST or how things get updated

update should take grumble id




