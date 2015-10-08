## DOM

The [**D**ocument **O**bject **M**odel](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
is a programming interface for HTML.

An HTML *document* is available for us to manipulate as an object, and this object is structured like a tree:

(Not like this one http://hakim.se/experiments/css/domtree/)

![](http://www.tuxradar.com/files/LXF118.tut_grease.diagram.png)

### Document

`document`
  - `document.head`
  - `document.body`

Each web page loaded in the browser has its own document object. The Document interface serves as an entry point to the web page's content

`document.body`
  - .children
  - .childNodes
  - .firstChild
  - .lastChild
  - .nextSibling
  - .parentElement
  - .parentNode

### Selecting DOM elements

- document.getElementById
- document.getElementsByTagName
- document.getElementsByClassName
- document.querySelector
- document.querySelectorAll

### You Do: Traversing the DOM

### Altering DOM Elements

- .textContent
- .innerHTML
- .setAttribute(name, value);
- .id
- .classList.toggle (add, remove, contains)
- .style

### Creating/Removing DOM Elements

- .createElement
- .appendChild
- .removeChild

### You do: Logo hijack

- Open up www.google.com in Chrome or Firefox, and open up the console.
- Find the Google logo and store it in a variable.
- Modify the source of the logo IMG so that it's a Yahoo logo instead.
- Find the Google search button and store it in a variable.
- Modify the text of the button so that it says "Yahooo!" instead.

## Events
- https://developer.mozilla.org/en-US/docs/Web/API/Event

- .onclick
- .addEventListener
  - click
  - mouseover
- .preventDefault()

## Color Scheme Switcher

- [jessica hische](http://jessicahische.is/)
- [color scheme switcher](https://github.com/ga-dc/color-scheme-switcher)

---

## Homework

<https://github.com/ga-dc/fellowship>

---

## Sample Quiz Questions:

1. What is the difference between a method and an attribute?
2. What is the difference between `onclick` and `addEventListener?`
