# CSS2 - Layout, Advanced Selectors, Etc.

* Position elements using `position: [relative | static | fixed | absolute]`
* Use the `float` and `clear` properties to position elements on a webpage.
* Explain what a clearfix is and when you would use one.
* Use advanced CSS selectors -- attributes, pseudo-selector, relationships -- to target elements on a webpage.
* Use pseudo elements to style forms.

## Note

Links for all the Codepen examples I'll be using in class are in their respective sections in the lesson plan. If you want to play around with them yourselves, make sure to follow along!  
* Make sure to fork the repo so you can make/save changes to the examples.

## Framing (5 / 5)

>Where are we? How did we get here? Where are we going?

Over the last two weeks, we have covered the basics of front-end web development. Today's CSS lesson is about preparing
you for Project 1, your first portfolio piece! More on Project 1 Friday.

Today we'll focus on layout, common (but more advanced CSS selectors), and styling forms to enhance the user experience.

## Layout: Turn & Talk (5 / 10)

Spend 2 minutes talking with a partner about the CSS properties we have learned this course that allow us to control layout.
* What can we do with these properties?
* What tools do we still lack?

## Position (20 / 30)

We've used combinations of `margin` `border` and `padding` to modify the layout of DOM elements. But changing the box model isn't always enough...
* Sometimes we need to move the box itself! That's where **position** comes in.
* We could do that with `margin`, but our CSS would get pretty messy and unpredictable.
* **Position** has 4 properties we can use to control layout...

### How do we offset the position of an element?

`left` `right` `top` `bottom`
* If `left: 100px;`, then the element is offset (or pushed away) 100px left from its default position.
* How and whether elements can be offset depends on the value of their **position** property.
* Demo **[[Codepen](http://codepen.io/amaseda/pen/yYvBEq)]**.

### Static

**I'll be using this [Codepen](http://codepen.io/amaseda/pen/LpQNZv) to illustrate the different `position` properties.**  

All elements are `static` by default.
* When `position: static;` you cannot offset the position of an element.
* You will only need to type this out if you need to override an existing `property` value.

### Fixed
A fixed element is pinned to a designated place on the browser window.
* Use `left` `right` `top` `bottom` to designate where on the page the fixed element should be displayed.
* When you scroll, a fixed element will remain the same place in the browser window.
* This can be useful when creating a header or footer menu that stays with the user as he/she explores a website.

### Relative and Absolute Positioning

`relative` and `absolute` positioning can be a bit confusing at first. Let's begin with some exploration...

**YOU DO:** Take two minutes to apply `relative` and `absolute` positioning to the in-class example.
* What do you notice when you apply `left` `right` `top` `bottom`? **Where are elements blocks offset from?**

### Relative
When we change the `left` `right` `top` `bottom` of a relatively-positioned element, it is moved from its position in the document.
* Really, it's a statically-positioned element that can be offset.
* When a relatively-positioned element is moved, it does not affect the position of other elements.

### Absolute
Absolutely-positioned elements are offset based on the position of their parent container.
* So an element with `top: 0` and `left: 0` will be moved to the upper left corner of that element's parent container.
* They are extracted from the document flow.

#### Combining Different Position Values

Absolute position is particularly useful when we want to pinpoint the position of an element inside a container.
* We can do this by setting the container to `position: relative` and the elements inside of it to `position: absolute`.
  * [This CSS Tricks post](https://css-tricks.com/absolute-positioning-inside-relative-positioning/) does a good job of demonstrating this.
* [radical](http://a.singlediv.com/)

### Exercise: Positioning Operation (15 / 45)

Spend 10 minutes playing Operation using what you've learned so far: [Positioning Operation](https://github.com/ga-dc/positioning_operation)

## Break (10 / 55)

## Floats (20 / 75)

Sometimes our layout goals are simpler. Rather than pinpointing the position of an element, we may just want to move it to the left or right side of a page.
* We accomplish that using another CSS property: `float`.

A basic example you'll encounter in most tutorials is the "text wrap", or surrounding an image with text **[[Codepen](http://codepen.io/amaseda/pen/ZbvwMV)]**.
* Images are, by default, `inline` elements.
* To remove them from that flow and re-position them, we set `float` to either `left` or `right`.
* We can also do this with multiple images with similar or varying `float` values.

We can also use floats to set up the entire layout of a webpage...
* [We can use floats to replicate the basic structure of GitHub's homepage.](https://github.com/).
* Let's try that out ourselves **[[Codepen](http://codepen.io/amaseda/pen/JYMxwj)]**.

### Clear

That all sounds pretty straightforward. But floating, if untamed, can cause some layout issues...

Let's use the first example, but this time without any text **[[Codepen](http://codepen.io/amaseda/pen/NGXQKZ)]**.
* What happens to the container when we set our image to `float: left;`?
* What about if we substitute our image with a block element (e.g., `<div>`)?
* When all the elements inside a container are floated, it shrinks to the smallest size possible.
  * Inline element dimensions are ignored.
  * Block elements are condensed to the smallest size possible.

We can fix this using the `clear` property.
* Watch what happens when we add an empty `<div>` with a property of `clear: both;`...
* The container is re-sized to fit its children elements.
* This empty `<div>` is kind of ugly though...

### Clearfix

Enter clearfix.
* [Nicolas Gallagher](http://nicolasgallagher.com/micro-clearfix-hack/) created a technique that accomplishes the same thing by adding a class to the container.
* Makes use of the `:before` and `:after` pseudo-classes.
* Very reusable!

### Further Layout Reading

We'll encounter the following in future lessons, but feel free to get a headstart...

* [Learn Layout](http://learnlayout.com/): A great review of everything we've gone over so far (and more).
* [Responsive Web Design](http://alistapart.com/article/responsive-web-design)
* [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* CSS Frameworks (e.g., [Bootstrap](http://getbootstrap.com/), [Foundation](http://foundation.zurb.com/))


## Advanced CSS Selectors

Sometimes we want to be very particular about which elements on a page we're styling, whether that's for layout or otherwise. CSS comes with a number of **advanced selectors** that allow us to be very specific in which elements we target, for example...
* Each `<li>` inside of a `<ul>`.
* Every radio button on the page.
* Every even-numbered checkbox inside of a `<div>` with `class="what-a-mess"`.

### Selector Scavenger Hunt (30 / 105)

Break off into teams and spend 15 minutes researching the following...
* **Teams 1, 3, 4, 7:** Pseudo-Selectors  
* **Teams 2, 5, 6, 8:** Relationships  

Each team should spend 15 minutes creating a [Codepen(s)](http://codepen.io) that answers the below questions for their assigned topic.
* Make sure to include examples. Don't just write out definitions.
* When you're done, Slack the link to your [Codepen(s)](http://codepen.io) in the classroom channel.

#### Teams 1, 3, 5, 7: Pseudo-Classes

What are pseudo-classes? How do they differ from pseudo-elements?

How do the following groups of pseudo-selectors work...
* `:hover`, `:visited`, `:active`
* `:first-of-type`, `:nth-of-type`
* `:first-child`, `:nth-child`
* Another one of your choice!
  * https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes

#### Teams 2, 4, 6, 8: Relationships

With a single selector, how do we select...
* Child elements
* Direct child elements
* Elements of a certain type and class (e.g., `<div class="pizza"></div>`)
* Multiple elements (e.g., `<div class="pizza"></div>` AND `<p id="hamburger"></p>`)
* Direct and Indirect Siblings

http://www.w3.org/TR/selectors/#selectors

## Break (10 / 115)

## Styling HTML Forms

http://codepen.io/jshawl/pen/OyQJpZ?editors=110

## Exercise: Moonrise Kingdom (30 / 145)

You probably don't have all the CSS knowledge required to do this exercise perfectly. That's okay!
* Use what you've learned so far and when in doubt: ask a classmate, Google it or ask an instructor.
* As always, you're encourage to work with each other on this!
* Some things to look up: Google web fonts, percent widths.

[http://github.com/ga-dc/moonrise_kingdom](http://github.com/ga-dc/moonrise_kingdom)

## Closing Q&A (5 / 150)

### Turn-and-Talk (1)

## Suggested Exercises

* Continue working on Moonrise Kingdom.
* [eCardly](https://github.com/ga-dc/ecardly)

## Sample Quiz Questions

* Where are elements with `position: relative` offset from when moved using `left` `right` `top` `bottom`?
* What problem to floated elements present when not cleared using `clear`?
* What pseudo-class would you use to select all the even-numbered instances of `<li>` on a page?
