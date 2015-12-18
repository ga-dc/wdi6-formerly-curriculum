## Angular Intro, Controllers, and Directives
- Describe the benefits of using a front end framework
- Explain how libraries differ from frameworks.
- Build a controller with hard coded data.
- Render and bind controller data in the view.
- Explain what angular directives do and how they are leveraged to execute JS.
- Use `ng-repeat` to iterate over data.
- use `ng-hide`/`ng-show` to hide and show elements.
- use `ng-submit` to create hard coded objects on the client.

## High-level Overview of FEFW
## Opening Framing (5/5)

How we got here:

1. Vanilla JS
  - a lot of code to write

2. jQuery
  - easier to do more
  - easier to write more bad code

3. OOJS
  - more structured but a royal pain to write

4. Frameworks
  - provides code to structure and relate front-end components

What's the purpose of a front end framework? JS and all of it's many libraries are great, but you can start building and building your application and all of a sudden there's no structure and everything's soup.

### Libraries (2.5/7.5)

- libraries gives us tools to utilize.
- abstracts behaviors and allows us to write our code more succinctly
- allows us to write applications faster and easier
- lots of options, very few rules (jQuery)

### Frameworks (2.5/10)

- like libraries in that it gives us tools to utilize
- additionally they abstract structure and provide conventions for users to write code into that structure.
- Lots of rules (convention), fewer options (Express)
- What parts of your front-end from project3 could have been generically abstracted?

## What is a Front End Framework? (5/15)
- a library that attempts to move some or all application logic to the browser, while providing a simple interface for keeping the front-end in sync with the back-end
- applications can run completely in the browser, minimizing server load since the server is only accessed when the front end needs to synchronize data with the backend
- server sends over the app in the initial request (HTML/CSS/JS) then JS makes all subsequent requests with AJAX
- provides more fluid user experience
- loads everything from the database on page load (data and templates) then renders/updates the page content based on user interaction.

## What is Angular? (15/30)

Take a look at [this quick overview of angular](http://www.tutorialspoint.com/angularjs/angularjs_overview.htm)(10)

T&T - Some points to think about (5)
- What are some features or characteristics of Angular?
- What are some of the advantages of Angular? Disadvantages?

## Angular (5/35)
- structural front end framework for dynamic web apps
- uses HTML as your template language and lets you extend HTML's syntax to express your application's functionality
- allows you to utilize html attributes to add behavior through JS. (directives)
- changes are reflected in various areas and persisted immediately without page refresh
- it's interesting, there'll be a lot of logic in the dom.

## Setup (5/40)
Let's set up an angular environment

Files/folders:
``` bash
$ mkdir todo_angular
$ cd todo_angular
$ touch index.html
$ mkdir app
$ mkdir app/todos
$ touch app/app.js
```

`index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Angular Lesson</title>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular.min.js"></script>
 <script src="app/app.js"></script>
</head>
<body>

</body>
</html>
```

> In the `index.html` file, we are linking to a cdn to import jQuery and AngularJS before along with our main `app/app.js` file

## Creating an Angular App (5/45)
We're going to add an immediately invoked function expression to instantiate our angular application. In `app/app.js`:

```js
(function() {
  angular.module('todo', []);
})()
```

What's a [module](https://docs.angularjs.org/api/ng/function/angular.module)?
What's an immediately-invoked function ([IIFE](http://gregfranko.com/blog/i-love-my-iife/))?

> This is an immediately invoked function expression. The name really tells us everything we need to know about what an IIFE is. It is a __function expression__ (as apposed to a declaration which is why we wrap the expression in parenthesis) which is immediately-invoked (the `()` after the expression executes it). Why do we want to do this. What do functions provide us? The IIFE calls `angular.module` with two arguments which creates a new module -- our application. The first argument is the name of the angular module. The second argument is an array of modules on which the current module will depend.

## [Directives](https://docs.angularjs.org/guide/directive) (5/50)

Directives are markers on a DOM element (tags and attributes) that tell AngularJS's HTML compiler to attach a specified behavior to that DOM element.

Angular has many built-in directives which we will introduce this morning and explore in depth this afternoon. Later in the week we will go further, defining our own custom directives.

Directives are Angular's way of letting you add behavior to elements and attributes. DOM elements already have behavior we would want for displaying and linking documents, the original utility of the web. Angular directives add behaviors we would want for building applications.

### Our First Directive - [ng-app](https://docs.angularjs.org/api/ng/directive/ngApp).
Let's add our very first directive. In the `index.html`:

```html
<html lang='en' ng-app='todo'>
```

> ng-app designates the root element of the application and is usually place near the root element of the page (i.e. the `<html>` or `<body>` tags). In this case, we're adding it to the `<html>`. The domain of the directive begins and ends with the opening and closing tags of the html element on which the directive is defined.

`ng-app` says which HTML element is going to be the "box" inside which all of our Angular stuff lives.

## [Angular expression](https://docs.angularjs.org/guide/expression) (10/60)
### `{{}}`(5)
Because we defined our ng-app we are able to use `{{}}` much in the same way we did with hbs or how we used `<%%>` in erb.

`{{}}` allows us to execute JS code in the `index.html`

### You Do: Try adding these elements to your index.html. Move them around, nest other divs and move ng-app among them, and try other embedded JavaScript! (5)
```html
<div>{{5 + 5}}</div>
<div>{{5 == "5"}}</div>
<div>{{5 === "5"}}</div>
<div>{{"pizza"}}</div>
```

## Break (10/70)
## [Angular controllers](https://docs.angularjs.org/guide/controller) (10/80)

This is cool, but not very useful. We're basically just hard-coding in data here, which we'll never do in a "real" app. Instead, we want to dynamically insert data. **Controllers** are the go-between for views (our HTML) and our data.

Let's create the controller file `$ touch app/todos/todos.controller.js` and add the following code:

```js
var app = angular.module("todo")
app.controller("todosController", function(){
  this.todos = [
    "Walk the dog",
    "Buy groceries",
    "Drink coffee",
    "Wake up like this"
  ]
});
```

> We've instantiated a controller on our main app. This is where all the logic will be contained. We'll be learning later this week how to fetch data from an external API, that behavior will belong in the controller. For now, we've hardcoded 4 strings as a property for the controller acting as our API fetch for our model. Our model is a todo string

Additionally we need to add this controller as a dependency to our `index.html`:

```html
<script src="app/todos/todos.controller.js"></script>
```

> Placement of the script tag matters here. Think about what is going on in the file to get an idea of where the tag should go.

### Setup & Add Controller and Seed Data in Controller - You Do - Grumblr (20/100)
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
<div ng-controller='todosController as todosViewModel'>
  <p>{{todosViewModel.todos[0]}}</p>
</div>
```

> we used the [`ng-controller` directive](https://docs.angularjs.org/api/ng/directive/ngController) here in order to instantiate our controller in the DOM. In the same way that `ng-app` established the domain of the js functionality in the html element, the `ng-controller` establishes the domain in this div.

> `todosViewModel` is an instance of our controller. `ng-controller` gives this whole div access to all the values and methods defined in that controller. This instance of a controller is called a "ViewModel".

### Accessing Values in the Controller - You Do (5/105)
As above, use `{{}}` (an angular expression) to access a grumble from the controller.

## Controller Functions (20/125)
We need to be able to define functions that interact with our models and views. We do this through the controller.

Let's create a function in our controller and see if we can utilize it in the DOM. In `app/todos/todos.controller.js`:

```js
  this.sayHello = function(){
    console.log("Hello World!")
  }
```

> All we did here is add a function to our controller. We can use this functionality in a variety of ways.

### [`ng-click`](https://docs.angularjs.org/api/ng/directive/ngClick)
Often we want JS functionality we've defined in a controller to execute on click. There is a built-in directive `ng-click` which executes a specified controller function when that HTML element is clicked. We're going to update the html and nest an `ng-click` anchor tag (`<a></a>`) in our `<div>` that contains the controller.

```html
<a href="#" ng-click="todosViewModel.sayHello()">Say Hello</a>
```

> This is just an anchor with an `ng-click` attribute. The value of the attribute is a function of the todosController that logs hello. `ng-click` adds a click event to the dom element it's associated with.

This sort of behavior is nice, but who wants to just say hello. It'd be great if it did something useful like show a form.

We're going to be using another angular directive that allows us to leverage booleans values to display elements. The idea is that the element is only displayed if a property of the controller evaluates to true.

Let's instantiate a property of our controller and replace our `.sayHello()` function to be `.toggleForm`. In `app/todos/todos.controller.js`:

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

> All we've done here is instantiate a property of our controller to false. Then defined the `.toggleForm()` function of our controller to change `this.formIsVisible` between true and false any time that function is called

## [`ng-show`](https://docs.angularjs.org/api/ng/directive/ngShow)
We now need to link `.formIsVisible` to an actual form. We can do this by using an angular directive called `ng-show`. This adds a `display:none` using CSS if something is `true`. In this case, we're going to hide the form if `.formIsVisible` evaluates to `true`. In `index.html`:

**Note:** Directives all take somewhat different values! Before we had directives that looked like `ng-something={{something.else}}`, and `ng-something=object.method()`. Now we have `ng-show="todosViewModel.formIsVisible"`

```html
<div ng-controller="todosController as todosViewModel">
  <div ng-click="todosViewModel.toggleForm()">New Todo</div>
  <form ng-show="todosViewModel.formIsVisible">
    <label>content</label>
    <input type="text" name="content">
  </form>
</div>
```

> `ng-click` is used here to toggle the value of `todosViewModel.formIsVisible` between true and false. `ng-show` is being used here to evaluate `todosViewModel.formIsVisible` and show the form if it's true and hide if it's false. If we click on `New Todo`, we can see that the form appears and disappears.


## Create Form - You Do - Grumble (25/150)
1. Use `ng-controller` to initialize a controller in your view
2. In the controller JS file, give the controller a property that is either `true` or `false` (like `.formIsVisible`)
3. add a function to toggle a form to create Grumbles
4. add an `ng-click` to call the function defined in step 3 that changes the boolean value of the property in step 2
5. add a form with an `ng-show` that uses the property in step 2
6. The form should contain label and input tags for:
  - title
  - author name
  - content
  - photo url

## Lunch

## [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat) (15/15)
Right now all we can do with our form is toggle it, but we'll be learning later today how to use the form to create a new todo. But first, let's render all of our todos using a the ng-repeat directive.

In the past with jQuery and hbs we generated a whole bunch of html with JavaScript. In Angular we'll be using directives in our html to execute this same sort of behavior. In `index.html`:

```html
<div ng-repeat="todo in todosViewModel.todos">
  <p>{{$index}}{{todo}}</p>
</div>
```

> All we've done here, is print each todo with it coresponding index value. It is important to note that `$index` is the index value for each iteration of the `ng-repeat`

Let's also add the form that we'll be using to edit each corresponding grumble. In `index.html`:

```html
<div ng-repeat="todo in todosViewModel.todos">
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
<div ng-repeat="todo in todosViewModel.todos">
  <p ng-show='!editTodo'>{{$index}}{{todo}}</p>
  <button class ='edit' ng-click='editTodo = !editTodo'>Edit Todo</button>
  <form ng-show='editTodo'>
    <input type="text" name="content">
  </form>
</div>
```

> Note that we utilized a seemingly uninstantiated global variable `editTodo`. `ng-repeat`, however, establishes a scope for `editTodo`. If we utilized the same logic as the last time we did this behavior (ie using `todoViewModel.formIsVisible`) any time we click on one, all of the edit forms would open. Because we never instantiated editTodo it by default is undefined, which is falsey. So we use `!editTodo` so that we show them initially. We're using the scope of the `ng-repeat` to our advantage because there is a new scope for each iteration.

## `ng repeat` - You Do - Grumblr (20/35)
- Display all of the hardcoded grumbles on to the screen using `ng-repeat`
- Make sure that you display all of the information for each grumble(title, author name, content, photo url)
- make sure each grumble has a toggleable edit form.

## ViewModel - Revisted! (5/40)
ViewModel is a model which has been tailored to support a specific UI, helping in easing data binding. In our case, when we did `ng-controller="todosController as todosViewModel"`, we're creating a new instance of our controller (`todosViewModel`) -- the View Model -- that is tailored to support our interface. In this way, we can use the View Model to access functions and properties we've defined in our controller. Everytime we load the DOM we create a new View Model based on the functionality defined in the controller.

## [ng-model](https://docs.angularjs.org/api/ng/directive/ngModel) + Break (40/80)
We can utilize the view model in a variety of ways. We'll be using view model to leverage the angular directive `ng-model` to retreive and set data. We can actually just create properties on the view model to serve this end.

### Example of 2-way Data Binding

> you can update the view from the model, and the model with the view.

We can see all of our todos, we can even toggle forms to create new ones and edit existing ones. Theres just one problem. We can't actually create or edit todos yet. We need a way to access the values of the input elements and call a function to create the Todo in the form. We'll be using `ng-model` and `ng-submit` to do these things. Let's get the functionality working for creating Todos. In `index.html`:

```html
<div ng-controller="todosController as todosViewModel">
  <div ng-click="todosViewModel.toggleForm()">New Todo</div>
  <form ng-show="todosViewModel.formIsVisible" ng-submit="todosViewModel.create()">
    <label>content</label>
    <input type="text" name="content" ng-model="todosViewModel.content">
  </form>
</div>
```

> We added an angular directive to execute a function when the form is submitted `.create` (we haven't defined this method yet). Additionally, we added an `ng-model` to our input tag with a value of the `content` property of our `todosViewModel`. When we submit the form, the value contained in the input box will be stored as a property of the `todosViewModel`.

Let's define our `.create` function in the controller now. In `app/todos/todos.controller.js`:

```js
this.create = function(){
  this.todos.unshift(this.content);
};
```

> unshift is just like push, only it adds the argument as the first element of the array instead of the last.

## `ng-model` & `createGrumble` - You Do (20/100)

Add the create same functionality we just did for todo's for your Grumblr application.
* **NOTE:** we're not just saving a single property this time.

## Edit & Update

We can also use `ng-model` to fill out the values of the form itself. We will need this bit of functionality to program the logic of our edit functionality. In `index.html`:

```html
<div ng-repeat="todo in todosViewModel.todos">
  <p ng-show="!editTodo">{{$index}}{{todo}}</p>
  <button class ="edit" ng-click="todosViewModel.edit($index); editTodo = !editTodo">Edit Todo</button>
  <form ng-show="editTodo">
    <input type="text" name="content" ng-model="todosViewModel.content">
    <button class="new" ng-click="todosViewModel.update($index); editTodo = !editTodo">Save</button>
    <button ng-click='editTodo = !editTodo' class='cancel'>Cancel</button>
  </form>
</div>
```

> We've added a lot of stuff here. We added `.edit` and `.update` (neither are defined... yet). The `.edit` function will essentially fill out the initial value of the `ng-model="todosViewModel.content"`. The `.update` function will actually change the hardcoded string value in our array of `todos` located in controller defintion. Additionally both buttons in the form will toggle the form to hide it. NOTE: if we have added this next to our new todo form, we have introduced a bug? Try to find it and fix it. There's more than one way to do that.

Let's update the controller to include these two functions now. In `app/todos/todos.controller.js`:

```js
// when called, this function will select a todo by an index passed in as an argument.
// It will then change the value of the html element with attribute: `ng-model='todoViewModel.content'`
// to be the string contained at that index value.
this.edit = function(index){
  var todo = this.todos[index];
  this.content = todo;
};

// when called, this will replace the content of a todo at at an index value that
// passed in as an argument.
this.update = function(index){
  this.todos[index] = this.content;
};
```

## Edit/Update Functionality - You Do - Grumblr (30/130)
We've added basic functionality our todo app with just delete left to implement.
You do:
- Update grumblr to match the functionality of Todos
- it should have create and edit functionality.

> Remember the todo app utilized an array of "strings". You'll need to figure out how the functionalities for strings map to the functionalities for objects.

## Delete Functionality - You Do - Grumblr (20/150)
Using what you know about angular directives and controllers, update the view(`index.html`) and the controller (`app/grumbles/grumbles.controller.js`) to incorporate delete functionality for your grumbles.
