# CSS2 - Layout, Selectors, and Fonts

- Label elements on a webpage as being blocks, inline, or inline-blocks
- List use cases for using relative, static, absolute, and fixed positioning, and floats
- Contrast the display options: inline, inline-block, and block
- Embed a font in a website using either a CDN or uploaded fonts
- Describe a use case for the `:before` and `:after` selectors
- Select any element without relying on classes and IDs
    - `:nth-child(1)`, `:nth-of-type(odd)`, `input:checked + label`, `section:target > element`, `input[type=checkbox]`

## Framing

The internet was designed to share documents.  A WEB of connected documents.  Granted, they were enabling a new world of hyperlinked documents, but it was just text.  All the underlying technologies -- the servers, the protocols, the markup language, everything -- was engineered to support sharing pages of text.  This whole thing, this "cloud", was not _designed_ to provide this rich media, real-time web that we enjoy today, and yet it does.  Quite well.  That's like designing a  bridge for pedestrians and then having it repurposed for carrying freight trains.  It is amazing that it has held up for so long.  

Let's **own** our portion of this World Wide Web.  Let's make sure it is a pleasure to interact with.  We need to control the layout.  To select specific elements and position as we see fit.  And, it must be maintainable so our _team_ can make changes, quickly.

## The Layout

We are always on the lookout for a trusted source.  Something we can use as a reference; a textbook.  A resource you can refer back to during your career.  Today we will be using [LearnLayout.com](http://learnlayout.com/).

## [No Layout](http://learnlayout.com/no-layout.html)

Because you have to start somewhere.

Resize.  Resize.  Resize.

## [display](http://learnlayout.com/display.html)

`display` is CSS's most important property for controlling layout.

Stomp. Stomp.  Stomp.

I repeat... `display` is CSS's **most important property** for controlling layout.

[The Usual Suspects](https://en.wikipedia.org/wiki/The_Usual_Suspects):
- block
- inline
- none

Demo (compare visibility/display): http://codepen.io/mattscilipoti/pen/JdpdoJ

To give you an idea of just how big the world is that you are entering, check out this list of [display values](https://developer.mozilla.org/en-US/docs/CSS/display).  

Don't worry about learning it all.  Focus on learning how to identify your specific problem and research the tools to answer it.

## [margin: auto;](http://learnlayout.com/margin-auto.html)

Useful for... centering.  Kinda.
   - use `text-align:center` for `inline` and `inline-block`
   - `margin:0 auto` for `block`

## [max-width](http://learnlayout.com/max-width.html)

And its twin: `min-width`

## [The Box Model](http://learnlayout.com/box-model.html)

You Do: One of these things is not like the other...
> Compare the top & bottom box.  
> 1. Are they the same width?
> 2. What is different?
> 3. What settings would you use to make them equal?

---

Answers:
1. Yes.  `width: 500px;`
2. `padding` and `border`
3. `.fancy { width: 386 }`

## [box-sizing](http://learnlayout.com/box-sizing.html)

`box-sizing: border-box;` - just one solution to this problem.

## [position](http://learnlayout.com/position.html)

- static: not positioned
- relative: relative to normal position
- fixed: relative to viewport
- absolute: relative to the nearest **positioned** ancestor

## [Position Example 8/19](http://learnlayout.com/position-example.html)

Let's start by reviewing the page.  Container div, nav, 3 sections, and a footer.

## Exercise: Positioning Operation

https://github.com/ga-dc/positioning_operation

## [float](http://learnlayout.com/float.html)

Often used for layouts.  Coming soon...

## [clear](http://learnlayout.com/clear.html)

- left
- right
- **both**: usually, this is the right tool for the job


## [the clearfix hack](http://learnlayout.com/clearfix.html)

> Q. How does `.clearfix` differ from other css rules we have applied?

---

A. It's not for a specific page or component.  It's reused in many places.

Ensure you organize these "reusable" css rules together.  You can group them together in styles.css, but I recommend using a separate file (shared.css, constraints.css, )

Don't miss the links.

## [percent width](http://learnlayout.com/percent.html)

As the name implies.

- You will see this a lot in layouts.
- Sometimes combined with min/max-width.

##[media queries](http://learnlayout.com/media-queries.html)

Responsive Design is a topic for another lesson.

## Misc

- Ever wanted to make a grid of boxes?  Check out [`inline-block`](http://learnlayout.com/inline-block.html)
- Want text in [columns?](http://learnlayout.com/column.html)
  - `column-count`
  - `column-gap`
- flexbox: interesting stuff.  Covered in Responsive Design lesson.
- css frameworks: we have a lesson about these too.  
  > They're no replacement for knowing how CSS works.

## Google fonts
https://www.google.com/fonts#

1. Choose:
Search or browse hundreds of font families, then add the ones you like to your Collection.

2. Review:
Compare and refine your Collection, even see the styles in a dynamic sample layout.

3. Use:
Grab the code we prepare and you’re ready to add the Collection to your website!

## Bonus: Font-Awesome

http://fontawesome.io/get-started/


## Advanced CSS Selectors

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


## Homework:

https://github.com/ga-dc/ecardly

## Sample questions

- "What is the difference between 'relative' and 'absolute' positioning?"
- "What is a reliable source for 3rd party fonts?"
- "Name 2 pseudo-classes that allow css to add content to a page."
