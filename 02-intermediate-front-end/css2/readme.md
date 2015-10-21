# CSS2 - Layout, Advanced Selectors, Etc.

* List use cases for `relative` `static` `absolute` and `fixed` positioning.
* Use the `float` and `clear` properties to position elements on a webpage.
* Use advanced CSS selectors -- attributes, pseudo-selector, relationships -- to target elements on a webpage.
* Use a Google CDN to include webfonts on a webpage.

## Note

Links for all the Codepen examples I'll be using in class are in their respective sections in the lesson plan. If you want to play around with them yourselves, make sure to follow along!  

## Framing (5 / 5)

## Layout: Turn & Talk (5 / 10)

Spend 2 minutes talking with a partner about the CSS selectors we have already learned this course that allow us to control layout.
* What can we do with these properties?
* What tools do we still lack?

## Position (20 / 30)

We've used combinations of `margin` `border` and `padding` to modify the layout of DOM elements. But changing the box model isn't always enough...
* Sometimes we need to move the box itself! That's where **position** comes in.
* We could do that with `margin`, but our CSS would get pretty messy and unpredictable.
* **Position** has 5 properties we can use to control layout...

### How do we offset the position of an element?

**I'll be using this [Codepen](http://codepen.io/amaseda/pen/BoJbMM) as an example.**

`left` `right` `top` `bottom`
* If `left: 100px;`, then the element is offset (or pushed away) 100px left from its default position.
* How and whether elements can be offset depends on the value of their **position** property.

### Static
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
* What do you notice when you apply `left` `right` `top` `bottom`? **Where are the blocks offset from?**

### Relative
When we change the `left` `right` `top` `bottom` of a relatively-positioned element, it is displaced from its position in the document flow.
* Really, it's a statically-positioned element that can be offset.

### Absolute
Absolutely-positioned elements are offset based on the position of their parent container.
* They are extracted from the document flow.
* **Q: Why would we ever want to use absolute?**

#### Combining Absolute and Relative

When working with parent-child elements, pay attention to their `position` properties.
* [This CSS Tricks post](https://css-tricks.com/absolute-positioning-inside-relative-positioning/) does a good job of demonstrating what happens when you place absolutely-positioned elements inside a relatively-positioned container.
* Absolute inside absolute is relative to parent-parent container?

### Exercise: Positioning Operation (15 / 45)

Spend 10 minutes playing Operation using what you've learned so far: [Positioning Operation](https://github.com/ga-dc/positioning_operation)

## Break (10 / 55)

## Floats (20 / 75)

Sometimes our layout goals are simpler. Rather than pinpointing the position of an element, we may just want to move it to the left or right side of a page.
* We accomplish that using another CSS property: `float`.

A basic example you'll encounter in most tutorials is surrounding an image with text [[Codepen](http://codepen.io/amaseda/pen/ZbvwMV)].
* Images are, by default, `inline` elements.
* To remove them from that flow and re-position them, we set `float` to either `left` or `right`.
* We can do this with multiple images with similar or varying `float` values.

We can also use floats to set up the entire layout of a webpage...
* [Insert link for real-life example of this](https://css-tricks.com/wp-content/csstricks-uploads/web-layout.png).
* Let's try that out ourselves [[Codepen](http://codepen.io/amaseda/pen/JYMxwj)].

### Clear

That all sounds pretty straightforward. But floating, if untamed, can cause some layout issues...

Let's use the first example, but this time without any text [Codepen](http://codepen.io/amaseda/pen/NGXQKZ).
* What happens to the container when we set our image to `float: left;`?
* What about if we substitute our image with a block element (e.g., `<div>`)?
* When all the elements inside a container are floated, it shrinks to the smallest size possible.
  * Inline element dimensions are ignored.
  * Block elements are condensed to the smallest size possible.
* [Best way to illustrate this is a bad thing?]

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
* **Teams 1, 4, 7:** Pseudo-Selectors  
* **Teams 2, 5, 8:** Relationships  
* **Teams 3, 6:** Attributes  

Each team should spend 15 minutes creating a [Codepen(s)](http://codepen.io) that answers the below questions for their assigned topic.
* Make sure to include examples. Don't just write out definitions.
* When you're done, Slack the link to your [Codepen(s)](http://codepen.io) in the classroom channel.

#### Teams 1, 4, 7: Pseudo-Selectors

What are pseudo-selectors?  

How do the following groups of pseudo-selectors work...
* `:hover`, `:visited`, `:active`
* `:first-of-type`, `:nth-of-type`
* `:first-child`, `:nth-child`
* Another one of your choice!

#### Teams 2, 5, 8: Relationships

With a single selector, how do we select...
* Child elements
* Direct child elements
* Elements of a certain type and class (e.g., `<div class="pizza"></div>`)
* Multiple elements (e.g., `<div class="pizza"></div>` AND `<p id="hamburger"></p>`)

#### Teams 3, 6: Attributes

How do we select DOM elements in CSS using their attributes?  

How do we select and style the following form elements...
* Text field
* Checkbox
* Radio Button
* Submit button

What are some other attributes you anticipate selecting often?  


## Break (10 / 115)

## Exercise: Moonrise Kingdom (30 / 145)

You probably don't have all the CSS knowledge required to do this exercise perfectly. That's okay!
* Use what you've learned so far and when in doubt: ask a classmate, Google it or ask an instructor.
* As always, you're encourage to work with each other on this!

[http://github.com/ga-dc/moonrise_kingdom](http://github.com/ga-dc/moonrise_kingdom)

## Closing Q&A (5 / 150)
