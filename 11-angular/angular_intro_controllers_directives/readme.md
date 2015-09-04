## Angular Intro, Controllers, and Directives
- Describe the benefits of using a front end framework
- Explain how libraries differ from frameworks.
- Build a controller with hard coded data.
- Render controller data in the view
- bind data with a controller variable
- explain the difference and similarities between $scope and controllerAs (should we talk about this? seems conflatey)

- explain what angular directives do and how they are leveraged to execute JS
- Use ng-repeat to iterate over data
- use ng-if & ng-hide/ng-show to hide and show elements
- use ng-submit to create hard coded objects on the client

## highlevel overview of FEFW
## Opening Framing (5/5)

How we got here:

1. vanilla js
  - a lot of code to write

2. jQuery
  - easier to do more
  - easier to write more bad code

3. OOJS
  - more structured but a royal pain to write

4. Frameworks
  - All the structure of OOJS with the ease of writing like jQuery.

What's the purpose of a front end framework? JS and all of it's many libraries are great, but you can start building and building your application and all of a sudden there's no structure and everything's soup.

### libraries (2.5/7.5)

- libraries gives us tools to utilize.
- abstracts code and allows us to write our code more succinctly
- allows us to write applications faster and easier
- lots of options, very few rules (jQuery)

### frameworks (2.5/10)

- like libraries in that it gives us tools to utilize
- additionally they provide structure and conventions users have to follow in order for them to work.
- Lots of rules (convention), few options (Ruby on Rails)

## What is a front end framework? (5/15)
- a library that attempts to move some or all application logic to the browser, while providing a simple interface for keeping the front-end in sync with the back-end
- applications can run completely in the browser, minimizing server load since the server is only accessed when the front end needs to synchronize data with the backend
- server sends over the app in the initial request (HTML/CSS/JS) then JS makes all subsequent requests with AJAX
- provides more fluid user experience
- loads everything from the database on page load (data and templates) then renders/updates the page content based on user interaction.

## What is Angular? (15/30)

Take a look at [this quick overview of angular](http://www.tutorialspoint.com/angularjs/angularjs_overview.htm)(10)

T&T - Some points to think about (5)
- How does the MVC pattern differ on the front-end vs back-end, what are it similarities?
- What do front end frameworks provide?
- How does angular differ from front-end frameworks?

## Angular (5/35)
- structural front end framework for dynamic web apps
- uses HTML as your template language and lets you extend HTML's syntax to express your application's functionality
- allows you to utilize html attributes to add behavior through JS. (directives)
- changes are reflected in various areas and persisted immediately without page refresh
- it's weird, there'll be a lot of logic in the dom.

## Setup (5/40)
Let's set up an angular environment

Files/folders:
``` bash
$ mkdir angular_app
$ cd angular_app
$ touch index.html
$ mkdir js
$ mkdir js/controllers
$ touch js/app.js
```

Bower Installation:
```bash
$ bower install jquery
$ bower install angular
```

`index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Angular Lesson</title>
 <script src="bower_components/jquery/dist/jquery.min.js"></script>
 <script src="bower_components/angular/angular.min.js"></script>
 <script src="js/app.js"></script>
</head>
<body>

</body>
</html>
```

> In the `index.html` file, we are linking to the bower components we installed before and linking to our main `js/app.js` file

## Creating angular app (5/45)
We're going to add an immediately invoked function expression to instantiate our angular application. In `js/app.js`:

```js
(function() {
  angular.module('todo', []);
})()
```

> the first argument is the name of the angular module. The second argument is an array of modules on which the current module will depend on. This is an immediately invoked function expression.

## Directives (5/50)
Directives are markers on a DOM element that tell AngularJS's HTML compiler to attach a specified behavior to that DOM element (e.g. via event listeners).

### Our first directive - ng-app.
Let's add our very first directive. In the `index.html`:

```html
<html lang='en' ng-app='todo'>
```

> ng-app defines which portion of the html that our JS will be applied to. In this case, we're adding it to the `<html>` so we extend our JS functionality to the entire DOM. The domain of the directive begins and ends with the opening and closing tags of the html element the directive is defined in.

## Angular expression (10/60)
### `{{}}`
Because we defined our ng-app we are able to use `{{}}` much in the same way we used `<%%>` in ruby.

`{{}}` allows us to execute JS code in the `index.html`

### You do write these expressions and what generates on the page. Try other things out!
```html
<div>{{5 + 5}}</div>
<div>{{5 == "5"}}</div>
<div>{{5 === "5"}}</div>
<div>{{"pizza"}}</div>
```

## Break (10/70)
## Angular controllers (10/80)
It's not really enough just to basic JS expressions, that just like hardcoding values into the DOM. We're never really going to do this, but we will be using expressions to access objects. We can do this sort of behavior with controllers. Let's create the controller file `$ touch js/controllers/todos.js` and add the following code:

```js
var app = angular.module("todo")
app.controller("todoController", function(){
  this.todos = [
    "Walk the Dog",
    "Buy Groceries",
    "Eat foot",
    "Smell fish"
  ]
})
```

> We've instantiated a controller on our main app. This is where all the logic will be contained. We'll be learning later this week how to fetch data from an external API, that behavior will belong in the controller. For now, we've hardcoded 4 strings as a property for the controller acting as our API fetch for our model. Our model is a todo string

### You do- Grumbles Setup & add controller and seed data in controller (20/100)
 > flesh out later

### Initialize Controller in the DOM
In `index.html`:
```html
<div ng-controller='todosController as todosCtrl'>

</div>
```

> we used the `ng-controller` directive here in order to instantiate our controller in the DOM. In the same way that `ng-app` established the domain of the js functionality in the html element, the `ng-controller` establishes the domain in this div. Additionally, we have access to all values and methods we define in our controller in this domain.

### Accessing values in the Controller - You do
In the div above, use `{{}}` (an angular expression) to access a todo from the controller.

## Controller Functions
We need to be able to define functions that interact with our models and views. We do this through the controller.

Let's create a function in our controller and see if we can utilize it in the DOM. In `js/controllers/todos.js`:

```js
  this.sayHello = function(){
    console.log("Hello World!")
  }
```

> all we did here is add a function to our controller we can use this functionality in a variety of ways.

## show ng-click directive in order to execute function in the browser
Sometimes we want JS functionality we've defined in a controller to execute on click. Enter `ng-click`. `ng-click` is just a directive that's value is an associated controller function that is assigned to an HTML element. When clicked, it will fire off the callback associated in the controller. We're going to update the html and nest an `ng-click` anchor tag (`<a></a>`) in our `<div>` that contains the controller.

```html
<a href="#" ng-click="todosCtrl.sayHello()">Say Hello</a>
```

> 

## ng repeat ( maybe us a simple array of strings )

## add a form and then add to array of strings
### ng- model on an input tag

## delete string from array

## edit existing string

## ng show/hide
## $scope?
