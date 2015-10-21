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

## Floats (15 / 70)

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

### Relationships

#### Child Selectors

```css
/* This will target any <p> inside of a <div> */
div p {

}

/* This will target any element with an id "thing" inside a <div> */
div #thing {

}

/* This will target any <p> that is a DIRECT child of a <div> */
div > p {

}
```

The space (or `>`) is important! What does the below selector target?

```css
div#thing {

}
```

You can go crazy and combine them all...

```css
div#thing div > p {

}
```

### Attributes

We can target any HTML element based on it's attributes. Say we had the below code...

```html
<h1>Resume</h1>
<h2>Experience</h2>
<div class="job" field="sanitation">Garbage Man</div>
<div class="job" field="politics">President</div>
<div class="job" field="sports">Quarterback</div>
```

...and we wanted to apply particular styling to the `div` detailing our time as a quarterback, we could select is using its attributes...

```css
div[field=quarterback]{
  border: 1px red solid;
}

/* We could even target classes this way if we want */
div[class="job"]{
  border: 2px purple solid;
}
```

### Styling Forms

Attributes come in handy when styling forms, in particular `<input>` elements.
* Forms make use of different types of `<input>` -- like text fields, checkboxes and radio buttons -- each of which is defined by its `type` attribute.
* In forms that use a variety of inputs, it's rare that we would apply the same styling to all of them using a single `input { ... }` selector.
* That's where attributes come in...

```css
/* Text fields */
input[type=text] {
  font-family: "Comic Sans MS", sans-serif;
  box-shadow: none;
  border-radius: 5px;
}

/* Checkboxes */
input[type=checkbox]{
  /* Insert styling */
}

/* Radio buttons */
input[type=radio]{
  /* Insert styling */
}
```
> If you want to go crazy with your checkbox and radio styling, there are plenty of "hacks" out there you should check out. [For example](http://www.paulund.co.uk/style-checkboxes-with-css).



### pseudo-element `:after`, `:before`

These allow you to insert content via CSS.  The content is not actually in the DOM, but it appears on the page as if it is.

This css:
``` css
div::after {
  content: "hi";
}
```

Causes 'hi' to appear at the end of every div, essentially:
``` html
<div>
  <!-- Rest of stuff inside the div -->
  hi
</div>
```

What content?

- string: `content: "a string";`
- image: `content: url(/path/to/image.jpg);` - The image is inserted at it's exact dimensions and cannot be resized. Since things like gradients are actually images, a pseudo element can be a gradient.
- nothing: `content: "";` - Useful for clearfix and inserting images as background-images (set width and height, and can even resize with background-size).
- counter: `content: counter(li);` - css-tricks says this is "Really useful for styling lists until :marker comes along."  (This is above my paygrade.)

- https://css-tricks.com/pseudo-element-roundup/

https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Selectors

### You Do (Write/Pair/Share): Students will create html and css to illustrate each selector.

Let's get more comfortable with the tools we'll be using as developers.

Break classroom into 3 groups.  Each group gets a category to research.  This will be individual/pair work, but your group number indicates which category you should focus on.

You will:
- research a selector
- create a few examples in CodePen (or similar) to share with class.  Try to illustrate different scenarios.

1. By Relationship
2. By Attribute
3. By pseudo-class

## By relationship: `section:target > element`

- A E
  > Any E element that is a descendant of an A element (that is: a child, or a child of a child, etc.)
- A > E
  > Any E element that is a child (i.e. direct descendant) of an A element
- E:first-child
  > Any E element that is the first child of its parent
- B + E
  > Any E element that is the next sibling of a B element (that is: the next child of the same parent)

### By attribute: `input[type=checkbox]`

- `selector[attribute=value]`

### By pseudo-class: `:nth-of-type(odd)`

Also known as "pseudo-classes", in CSS, are used to indicate elements in a special state or position.

Remember `:hover`, `:visited`?  We're adding a few more.

https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes

- `:nth-child(1)`
- `:nth-of-type(odd)`

## Break (10)

## Exercise: Moonrise Kingdom (30)

[Spend 30 minutes recreating this card from Moonrise Kingdom.](http://github.com/ga-dc/moonrise_kingdom)

## Closing Q&A (15)

## If there's time...

## Miscellaneous

### [percent width](http://learnlayout.com/percent.html)

As the name implies.

- You will see this a lot in layouts.
- Sometimes combined with min/max-width.

### Google fonts
https://www.google.com/fonts

1. Choose:
Search or browse hundreds of font families, then add the ones you like to your Collection.

2. Review:
Compare and refine your Collection, even see the styles in a dynamic sample layout.

3. Use:
Grab the code we prepare and you’re ready to add the Collection to your website!

### Bonus: Font-Awesome

[http://fontawesome.io/get-started/](http://fontawesome.io/get-started/)
