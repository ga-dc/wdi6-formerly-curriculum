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

## Create Grumble Router / Templates
### How the pieces fit together
### Add `ngRoute`

* `$ bower install --save angular-route`
* Add script tag to index
* Add as a dependency of our app in app.js (`ngRoute`)



### Creating Templates / Routes
#### Index (I do)
#### Show (You do)
#### New (I do)
#### Edit (You do)

##

## Services
### Create Grumble Service
### Update Index Controller (I do)
### Update Show Controller (You do)
### Update New Controller (I do)
### Update Edit Controller (You do)
