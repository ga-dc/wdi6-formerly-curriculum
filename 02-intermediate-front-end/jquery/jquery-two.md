# jQuery: Part 2

## Learning Objectives
- Use jQuery to:
  - add elements to the DOM using jQuery objects and functions
  - change elements in the DOM using jQuery objects and functions
  - add event listeners to elements in the DOM using jQuery objects and functions
  - loop through jQuery objects using the `each()` method

## Opening Framing
### PKI (ST-WG)
What are some things you've learned about jQuery?
- when to use which
- when you're able to use which
- how to load jQuery
- how to select DOM elements

## jQuery (# I do )
> I'm going to throw lots of code at you. It will be available in this lesson plan. So really just try and take it in and not follow along.

Assume the following html for the following examples:

```html
<div class="awesome">this is a div</div>
<div class="awesome">this is the second awesome div</div>
```

### Addition
- `.append()`
  - the selector expression preceding the method is the container into which the content(argument) is inserted

  ```javascript
    $(".awesome").append("<div>this div is appended</div>")
    // this would add the div as the last child in it to all elements with class awesome
  ```

- `.appendTo()`
  - the content precedes the method, either as a selector expression or as markup created on the fly, and it is inserted into the target container(argument)

  ```javascript
    $("<div>this div is appended</div>").appendTo($(".awesome"))
    // same thing as above
  ```

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
- `.remove()`
  - removes the jquery object it is called on, as well as bound events and everything inside it

  ```javascript
    $(".awesome").remove()
  ```

- `.empty()`
  - removes all the child elements of the jquery object it is called on

  ```javascript
    $(".awesome").empty()
  ```

### Edition
> you guys glossed over this a bit, but here they are again.

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

## BREAK(10m)
### Other
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
  - `$(".somejQueryClass").each(function(index){//code goes here})`

  ```javascript
    $(".awesome").each(function(index){
      $(this).html("this html element has the index of ()" + index + ") in the each function")
    })
  ```

> note what the context of `$(this)` is. This refers to each of the elements being looped through.


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


### Class Ex- TIMER js refactor (30m)

### Homework- ATM

[ATM](https://github.com/ga-dc/atm)
