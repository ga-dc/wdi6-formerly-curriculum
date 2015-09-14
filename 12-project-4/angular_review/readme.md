# Angular Review

| An Angular | ...        | is (sort-of) like a Rails | ...       |
|------------|------------|-----------------|---------------------|
|            | module     |                 | gem                 |
|            | controller |                 | controller's action |
|            | resource   |                 | model               |
|            | ng-model   |                 | model's field       |
|            | directive  |                 | helper              |
|            | service    |                 | ActiveRecord::Base  |
|            | view       |                 | view                |

## Angular on Rails...?

Angular is all about rendering multiple views.

Rails can also render multiple views.

However, in Rails going to a new view requires a page refresh. Angular doesn't require page refreshes. This conserves a considerable amount of memory and time.

An app incorporating both Rails and Angular should divide the responsibilities accordingly. Views rendered by Rails should be the "main" views with `<script>` and `<link>` tags. Views rendered by Angular should compose the content of those main views.

In this way, each view rendered by Rails is effectively its own single-page app.

For example, if the GA website was made with Rails and Angular, there might be 3 views rendered by Rails. The file structure might look something like this:

```
app/ 
  views/
    classes/
      index.html.erb
    students/
      index.html.erb
    instructors/
      index.html.erb
  assets/
    javascripts/
      application.js
      classes/
        directives/
        views/
        controllers/
      students/
        directives/
        views/
        controllers/
      instructors/
        directives/
        views/
        controllers/
```

`classes/index.html.erb` would contain all the `<script>` tags necessary for Angular to display that page.

One advantage here is that the user does not need to re-load all the external .js and .css files any time they go to a view within the "classes" mini-app, as they would if Rails was rendering the view rather than Angular. This is because Angular is just swapping out what's inside the `<body>` of the page, not what's in the `<head>`.

Additionally, the user has a more seamless experience. They do not experience a page refresh between each view change within the "classes" mini-app.

This also means the user's browser has in memory only the scripts necessary to show the "classes" mini-app when using it, and only the scripts necessary to show the "students" mini-app when using *that*: rather than including *all* of the Javascripts in the `application.html.erb`, we'd only include `application.js` and maybe `angular.min.js` there, and all the directives, views, and controllers for classes only on the `classes/index.html.erb` page, and so on for students and instructors.

In this way, Rails renders the "big" views and Angular renders the "little" views. The app is one big app made up of a bunch of smaller apps, each based on an `index.html.erb` that is loaded by Rails but ultimately rendered by Angular.

