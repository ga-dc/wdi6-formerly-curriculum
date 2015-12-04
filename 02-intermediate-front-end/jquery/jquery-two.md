# jQuery: Part 2

## Learning Objectives
- Use jQuery to:
  - add elements to the DOM using jQuery objects and functions
  - change elements in the DOM using jQuery objects and functions
  - add event listeners to elements in the DOM using jQuery objects and functions
  - loop through jQuery objects using the `each()` method

## Opening Framing (5)
### PKI (ST-WG)
What are some things you've learned about jQuery?
- when to use which
- when you're able to use which
- how to load jQuery
- how to select DOM elements

In the last lesson, you learned how to select elements using jquery and maybe update some of its properties. In this lesson, we want to dive a little deeper into some of the more common jQuery functions that exist. The basic premise of jQuery is pretty easy though. We want to select something, and then do something to it.

## jQuery (I do/You do)
> I'm going to throw lots of code at you. It will be available in this lesson plan. So really just try and take it in and not follow along. There will also be parts where you will teach yourself some jQuery functions.

## Setup (5/10)
Create 2 files we'll need in this class:

```bash
$ touch index.html
$ touch script.js
```

in `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="https://code.jquery.com/jquery-2.1.4.js"></script>
  <script src="script.js"></script>
</head>
<body>
  <div class="awesome">this is a div</div>
  <div class="awesome">this is the second awesome div</div>
</body>
</html>
```

In `script.js`:

```js
$(document).ready(function(){
  alert("jq working")
})
```

## Addition
### I do - append/appendTo (10/20)
- `.append()`
  - the selector expression preceding the method is the container into which the content(argument) is inserted as the last child

  ```javascript
    $(".awesome").append("<div>this div is appended</div>")
    // this would add the div as the last child in it to all elements with class awesome
  ```

- `.appendTo()`
  - the content precedes the method, either as a selector expression or as markup created on the fly, and it is inserted into the target container(argument) as the last element

  ```javascript
    $("<div>this div is appended</div>").appendTo($(".awesome"))
    // same thing as above
  ```

### You do - prepend/prependTo (10/30)
- Go into the [jquery docs](https://api.jquery.com/) to learn about prepend/prependTo
- Add 2 elements to each div as the first child of that div
- make sure to use both `.prepend()` and `.prependTo()`

- `.prepend()`
  - same as append but inserts the specified content(argument) as the first child

  ```javascript
    $(".awesome").prepend("<div>this div is prepended</div>")
    // this would add the div as the first child in it to all elements with class awesome
  ```

- `.prependTo()`
  - same as appendto but the content precedes the method call is inserted as the first child of the target container(argument)

  ```javascript
    $("<div>this div is prepended</div>").prependTo($(".awesome"))
    // same thing as above
  ```

  > Think about how facebook statuses work. When we add a new status, does it go to the bottom of the list? or is it right at the top? Maybe they're using a prepend here ...

### `.html()`/`.text()` (10/40)
- `.html()`
  - get or set the HTML contents
    - get: no argument, know that it returns the innerHTML of the first jQuery object

    ```javascript
      $(".awesome").html()
      // returns the innerHTML of the first element in the jQuery object
    ```

    - set: one argument that you want the html content to be

    ```javascript
      $(".awesome").html("this is awesome!")
      // returns the innerHTML of the of all elements in the jQuery object to be "this is awesome!"
    ```

- `.text()`
  - get or set the text contained, it will strip the HTML elements
  - same as `.html()` only it returns the text of all jQuery objects selected for the getter portion

### Removal
#### I do (remove) (5/45)
- `.remove()`
  - removes the jquery object it is called on, as well as bound events and everything inside it

  ```javascript
    $(".awesome").remove()
  ```

#### You do (empty) (5/50)
- In the `index.html`, create some dummy content that is children of the the second div with class awesome.
- Then using jquery, remove all of those child elements.

- `.empty()`
  - removes all the child elements of the jquery object it is called on

  ```javascript
    $(".awesome").empty()
  ```

  > Note: when we call the above code, we'll actually be emptying all content from any element with the class of 'awesome'

## Break (10/60)

### Edition (20/80)
> you guys glossed over this a bit, but here they are again.

Add an input tag to the `index.html`:

```html
<input type="text" class="search" placeholder="some text here ....">
```

- `.attr()`
  - acts as both a getter and setter
    - setter: requires 2 arguments(key/value pair), or an object(with multiple key/value pairs)
    - getter: requires 1 argument to get the value of the attribute from the jQuery object
- `.css()`
  - acts as both a getter and setter
    - setter: requires 2 arguments(key/value pair), or an object(with multiple key/value pairs)
    - getter: requires 1 argument to get the value of the attribute from the jQuery object
- `.val()`
  - setter: pass in an argument
  - getter: pass in no argument

> We need to be able to get information from users. Input tags are a great way to do that. But more importantly we need to be able to access those values so that our JS can act on it. Think about auto complete on search forms. As we type something into google, it starts giving us options. For every key stroke we make, the callback that is fired is probably using some form of `.val()`. This will also be extremely important moving forward in week 7 with AJAX.

### Other (30/110)
- `.hide()`
  - changes elements style to have `display:none`

  ```javascript
    $(".awesome").hide()
    // returns the innerHTML of the first element in the jQuery object
  ```

- `.show()`
  - changes a `display:none` to `display:block` or whatever it initially was

  ```javascript
    $(".awesome").show()
    // returns the innerHTML of the first element in the jQuery object
  ```

- `.addClass()`
  - does not replace existing classes
  - pass in argument of 1 string to add 1 or more classes

  ```javascript
    $(".awesome").addClass("add three classes")
    // adds the classes add, three and classes to all elements in the jQuery object returned
  ```

- `.removeClass()`
  - pass in argument of 1 string remove 1 or more classes

  ```javascript
    $(".awesome").removeClass("add three classes")
    // removes the classes add, three and classes to all elements in the jQuery object selected
  ```

- `.children()`
  - returns a jQuery object that contains all the child elements of the jQuery object it is called on.

  ```javascript
    $(".awesome").children()
  ```


- `.each()`
  - loops through collections of jquery objects

  ```javascript
    $(".awesome").each(function(index){
      $(this).html("this html element has the index of ()" + index + ") in the each function")
    })
  ```

> note what the context of `$(this)` is. This refers to each of the elements being looped through.

> This also is actually the second time in this lesson a jquery function requires a callback, can you think of the other?


- `.on()`
  - a way to create event listeners
  - takes two arguments normally
    - first argument is the event(lots of them)
    - second argument is the callback

    ```javascript
      $(".awesome").on("click", function(){
        console.log($(this))
      })
    ```

> What is `$(this)` here? Refers to the jquery object you called `.on` on, as long as you're in the scope of the `.on` function

### You do - Create a drop down menu... sorta (10/120)
- Create a button in the `index.html`
- Your JS should have the button hide and show the awesome divs when clicked

### Class Ex- [TIMER js](https://github.com/ga-dc/timer_js) refactor (30/150)

### Additional Exercise - [ATM](https://github.com/ga-dc/atm)
