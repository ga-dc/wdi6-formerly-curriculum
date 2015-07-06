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

```

### Addition
- `.append()`
  - the selector expression preceding the method is the container into which the content(argument) is inserted
- `.appendTo()`
  - the content precedes the method, either as a selector expression or as markup created on the fly, and it is inserted into the target container(argument)
- `.prepend()`
  - same as append but inserts the specified content(argument) as the first child
- `.prependTo()`
  - same as appendto but the content precedes the method call is inserted as the first child of the target container(argument)
- `.html()`
  - get or set the HTML contents
    - get: no argument
    - set: one argument that you want the html content to be
- `.text()`
  - get or set the text contained, it will strip the HTML elements
  - same as `.html()`

### Removal
- `.remove()`
  - removes the jquery object it is called on, as well as bound events and everything inside it
- `.empty()`
  - removes all the child elements of the jquery object it is called on

### Edition
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
- `.show()`
  - changes a `display:none` to `display:block` or whatever it initially was
- `.hide()`
  - changes elements style to have `display:none`
- `.addClass()`
  - does not replace existing classes
  - pass in argument of 1 string to add 1 or more classes
- `.removeClass()`
  - pass in argument of 1 string remove 1 or more classes
- `.children()`
- `.each()`
  - loops through collections of jquery objects
  - `$(".somejQueryClass").each(function(index){//code goes here})`
  - collect all child jquery objects of a the jquery object it is being called on
- `.on()`
  - a way to create event listeners
  - takes two arguments normally
    - first argument is the event
    - second argument is the callback
  - What is `$(this)`?
    - refers to the jquery object you called `.on` on, as long as you're in the scope of the `.on` function
