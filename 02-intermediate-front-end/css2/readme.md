# CSS2 - Layout, Selectors, and Fonts

- Label elements on a webpage as being blocks, inline, or inline-blocks
- List use cases for using relative, static, absolute, and fixed positioning, and floats
- Contrast the display options: inline, inline-block, and block
- Embed a font in a website using either a CDN or uploaded fonts
- Describe a use case for the `:before` and `:after` selectors
- Select any element without relying on classes and IDs
    - `:nth-child(1)`, `:nth-of-type(odd)`, `input:checked + label`, `section:target > element`, `input[type=checkbox]`

## Framing (5)

The internet was designed to share documents.  A WEB of connected documents.  Granted, they were enabling a new world of hyperlinked documents, but it was just text.  All the underlying technologies -- the servers, the protocols, the markup language, everything -- was engineered to support sharing pages of text.  This whole thing, this "cloud", was not _designed_ to provide this rich media, real-time web that we enjoy today, and yet it does.  Quite well.  That's like designing a  bridge for pedestrians and then having it repurposed for carrying freight trains.  It is amazing that it has held up for so long.  

Let's **own** our portion of this World Wide Web.  Let's make sure it is a pleasure to interact with.  We need to control the layout.  To select specific elements and position as we see fit.  And, it must be maintainable so our _team_ can make changes, quickly.

### Layout: Turn & Talk (5 / 10)

Spend 2 minutes talking with a partner about the CSS selectors we have already learned this course that allow us to control layout.
* What can we do with these properties?
* What tools do we still lack?

## Position (20 / 30)

We've used combinations of `margin` `border` and `padding` to modify the layout of DOM elements. But changing the box model isn't always enough...
* Sometimes we need to move the box itself! That's where **position** comes in.
* **Position** has 5 properties we can use to control layout...

### How do we offset the position of an element?

I'll be using this [Codepen](http://codepen.io/amaseda/pen/BoJbMM) as an example.

`left` `right` `top` `bottom`
* If `left: 100px;`, then the element is offset (or pushed away) 100px left from ______.
* These changes only go into effect depending on the value of the **position** property...

### Static
All elements are static by default.
* When `position: static;` you cannot offset the position of an element. **Try it.**
* Rarely will you explicitly type this out.

### Fixed
A fixed element is pinned to a designated place on the browser window.
* Use `left` `right` `top` `bottom` to designate where on the page the fixed element should be displayed.
* When you scroll, a fixed element will remain the same place in the browser window. **Try it.**
* This could be useful when creating a header or footer menu that stays with the user as he/she explores a website.

### Relative and Absolute Positioning

Relative and Absolute position can be a bit confusing at first. Let's begin, however, by diving in head-first...

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
* [This CSS Tricks post](https://css-tricks.com/absolute-positioning-inside-relative-positioning/) does a good job of demonstrating what happens when you place absolutely-position elements inside a relatively-positioned container.

### Exercise: Positioning Operation (15 / 45)

Spend 10 minutes playing Operation using what you've learned so far: [Positioning Operation](https://github.com/ga-dc/positioning_operation)

## Break (10 / 55)

## Floats (20 / 75)

Sometimes our layout goals are simpler. Rather than pinpointing the position of an element, we may just want to move it to the left or right side of a page.  

A basic example you'll encounter in most tutorials is surrounding an image with text.
* You'll see this a lot with newspaper articles...
* Let's try that out ourselves [[Codepen](http://codepen.io/amaseda/pen/ZbvwMV)].

We can also use floats to set up the entire layout of a webpage...
* Real-life example.
* Let's try that out ourselves [[Codepen](http://codepen.io/amaseda/pen/JYMxwj)].
  * Is there a better way to illustrate this (and lead into clear)?
* Stack floats.

### Clear

While floating an element is just a matter of setting a CSS property (or two), we need to account for the effects that has on the rest of our page.
* What happens when we _________?
* We can remedy this using the `clear` property.
* Chances are you won't use `float` without `clear`.

### Clearfix

> Q. How does `.clearfix` differ from other css rules we have applied?

---

A. It's not for a specific page or component.  It's reused in many places.

Ensure you organize these "reusable" css rules together.  You can group them together in styles.css, but I recommend using a separate file (shared.css, constraints.css, )

### Further Layout Reading

We'll encounter the following in future lessons, but feel free to get a headstart...

* Responsive Design
* Flexbox
* CSS Frameworks (e.g., Bootstrap, Foundation, Material Design)


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

[http://github.com/ga-dc/moonrise_kingdom](http://github.com/ga-dc/moonrise_kingdom)

## Closing Q&A (5 / 150)
