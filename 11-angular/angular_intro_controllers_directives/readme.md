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

## What is Angular? Doc Dive

## Start basic setup
- setup `index.html`
- link to angular CDN
- `app.js` (angular module)

## Our first directive - ng-app.
> explanation

## Angular expression
show basic repl stuff in expressions(eg. 5 + 5, "string", true, false)

## Angular controllers
`var app = angular.module("nameOfApp")`
`app.controller("nameOfController", function(){

  })`

## $scope?

## Accessing values in the Controller

## add function to controller

## show ng-click directive in order to execute function in the browser

## ng repeat ( maybe us a simple array of strings )

## add a form and then add to array of strings
### ng- model on an input tag

## delete string from array

## edit existing string

## ng show/hide
