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
- Set up the `grumblr` application as an angular application.
- Create an angular application in the main js file
- Create an angular controller
- That angular controller will have a property that is an array that contains 5 objects with the following properties:
  - title
  - author name
  - content
  - photo url

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

> This is just an anchor with an `ng-click` attribute. The value of the attribute is a function of the todosController that logs hello. `ng-click` adds a click event to the dom element it's associated with.

This sort of behavior is nice, but who wants to just say hello. I think it'd be really really nice if it did something useful like show a form.

We're going to be using another angular directive that allows us to leverage booleans values to display elements. The idea is that the element is only displayed if a property of the controller evaluates to true.

Let's instantiate a property of our controller and replace our `.sayHello()` function to be `.toggleForm`. In `js/controllers/todos.js`:

```js
  this.formIsVisible = false
  this.toggleForm = function(){
    console.log("toggleform")
    if(this.formIsVisible){
      this.formIsVisible = false
    }
    else{
      this.formIsVisible = true
    }
  }
```

> All we've done here. Is instantiate a property of our controller to false. Then defined the `.toggleForm()` function of our controller to change `this.formIsVisible` between true and false any time that function is called

## Update `index.html`
We need to now link our JS that we just made to the HTML. We can do this by utilizing an angular directive that hides or shows the element in which the directive is assigned based on the boolean result inside the value of attribute.

We now need to link `.formIsVisible` to an actual form. We can do this by utilizing an angular directive that displays or hides the form based on whether `.formIsVisible` evaluates to true or false. In `index.html`:

```html
<div ng-controller="todosController as todosCtrl">
  <div ng-click="todosCtrl.toggleForm()">New Todo</div>
  <form ng-show="todosCtrl.formIsVisible">
    <label>content</label>
    <input type="text" name="content">
  </form>
</div>
```

> `ng-click` is used here to toggle the value of `todosCtrl.formIsVisible` between true and false. `ng-show` is being used here to evaluate `todosCtrl.formIsVisible` and show the form if it's true and hide if it's false. If we click on `New Todo`, we can see that the form appears and disappears.

> ---- talk about 2 way data binding here?

## Fill out form - you do - grumble (20)
1. Initialize a controller in the DOM
2. add a property to the grumble controller that is a boolean value in the script file
3. add a function to toggle a form to create Grumbles
4. add an `ng-click` to call the function defined in step 3 that changes the boolean value of the property in the first step
5. add a form with an `ng-show` that uses the property in step 1
6. The form should contain label and input tags for:
  - title
  - author name
  - content
  - photo url

## ng repeat
Right now all we can do with our form is toggle it, but we'll be learning later today how to use the form to create a new todo. But first, let's render all of our todos using a new angular directive.

In the past with OOJS or Backbone we generated a whole bunch of html through JS itself. In angular we'll be using directives through the html to execute this same sort of behavior. It feels more railsy/handlebarsy then OOJS or backbone. In `index.html`:

```html
<div ng-repeat="todo in todosCtrl.todos">
  <p>{{$index}}{{todo}}</p>
</div>
```

> All we've done here, is print each todo with it coresponding index value.

Let's also add the form that we'll be using to edit each corresponding grumble. In `index.html`:

```html
<div ng-repeat="todo in todosCtrl.todos">
  <p>{{$index}}{{todo}}</p>
  <button class ='edit'>Edit Todo</button>
  <form>
    <input type="text" name="content">
  </form>
</div>
```

> We've added a button that will be used to toggle the form as well as a generic form here.

Earlier, we added a property and function to our controller and used some angular directives to hide and show forms. We're going to do the same sort of thing here to make our edit form show/hide correctly. In `index.html`:

```html
<div ng-repeat="todo in todosCtrl.todos">
  <p ng-show='!editTodo'>{{$index}}{{todo}}</p>
  <button class ='edit' ng-click='editTodo = !editTodo'>Edit Todo</button>
  <form ng-show='editTodo'>
    <input type="text" name="content">
  </form>
</div>
```

> Note that we utilized a seemingly uninstantiated global variable `editTodo`. `ng-repeat`, however, establishes a scope for `editTodo`. If we utilized the same logic as the last time we did this behavior (ie using `formIsVisible`) any time we click on one, all of the edit forms would open. We're using the scope of the `ng-repeat` to our advantage.

## You do - grumblr ng-repeat
- Display all of the hardcoded grumbles on to the screen using `ng-repeat`
- Make sure that you display all of the information for each grumble(title, author name, content, photo url)
- make sure each grumble has a toggleable edit form.


## ng-model
We can see all of our todos, we can even toggle forms to create new ones and edit existing ones. Theres just one problem. We can't actually create or edit todos yet. We need a way to access the values of the input elements and call a function to create the Todo in the form. We'll be using `ng-model` and `ng-submit` to do these things. Let's get the functionality working for creating Todos. In `index.html`:

```html
<div ng-controller="todosController as todosCtrl">
  <div ng-click="todosCtrl.toggleForm()">New Todo</div>
  <form ng-show="todosCtrl.formIsVisible" ng-submit="todosCtrl.create()">
    <label>content</label>
    <input type="text" name="content" ng-model="todosCtrl.content">
  </form>
</div>
```

> We added an angular directive to execute a function when the form is submitted `.create` (we haven't defined this method yet). Additionally, we added an `ng-model` to our input tag with a value of the `content` property of our `todosCtrl`. When we submit the form, the value contained in the input box will be stored as a property of the `todosCtrl`.

Let's define our `.create` function in the controller now. In `js/controllers/todos.js`:

```js
this.create = function(){
  this.todos.unshift(this.content)
}
```

We can also use `ng-model` to fill out the values of the form itself. We will need this bit of functionality to program the logic of our edit functionality. In `index.html`:

```html
<div ng-repeat="todo in todosCtrl.todos">
  <p ng-show="!editTodo">{{$index}}{{todo}}</p>
  <button class ="edit" ng-click="todosCtrl.edit($index); editTodo = !editTodo">Edit Todo</button>
  <form ng-show="editTodo">
    <input type="text" name="content" ng-model="todosCtrl.content">
    <button class="new" ng-click="todosCtrl.update($index); editTodo = !editTodo">Save</button>
    <button ng-click='editTodo = !editTodo' class='cancel'>Cancel</button>
  </form>
</div>
```

> We've added alot of stuff here. We added `.edit` and `.update` (neither are defined... yet). The `.edit` function will essentially fill out the initial value of the `ng-model="todosCtrl.content"`. The `.update` function will actually change the hardcoded string value in our array of `todos` located in controller defintion. Additionally both buttons in the form will toggle the form to hide it.

Let's update the controller to include these two functions now. In `js/controllers/todos.js`:

```js
// when called, this function will select a todo by an index passed in as an argument.
// It will then change the value of the html element with attribute: `ng-model='todoCtrl.content'`
// to be the string contained at that index value.
this.edit = function(index){
  var todo = this.todos[index]
  this.content = todo
}

// when called, this will replace the content of a todo at at an index value that
// passed in as an argument.
this.update = function(index){
  var todo = this.todos[index]
  todo = this.content
}
```

## Grumbles - you do edit/update functionality
We've finished our todo app with everything except for delete functionality.
You do:
- Update grumblr to match the functionality of Todos
- it should have create and edit functionality.

> Remember the todo app utilized an array of "strings". You'll need to figure out how the functionalities for strings map to the functionalities for objects.

## Grumbles - you do delete functionality
Using what you know about angular directives and controllers, update the view(`index.html`) and the controller (`js/controllers/grumbles.js`) to incorporate delete functionality for your grumbles.


$scope ????
