# Flex Box

Screencasts
- [Part 1](http://youtu.be/wBlBTO7mqoI)
- [Part 2](http://youtu.be/_I58MXDnBEs)

## Objective Learnings
- Give an example of a problem solved by Flex Box
- Given a desktop-first webpage, make it look presentable on mobile devices (and vice-versa) with as little CSS as possible
- Contrast Flex Containers and Flex Items
- Draw a diagram that includes: Flex Container, Flex Item, Main and Cross Axes, Starts and Ends for all Axes, and Main and Cross Sizes
- Contrast `align-items` and `align-self`
- Explain what is meant by the "Holy Grail Layout"

## Problem 1: Vertical alignment

I have a div. I would like to center it vertically and horizontally on my page.

#### You tell me: What should I try?

Here's some starter code:

```html
<body>
  <div>This is my div!</div>
</body>
```

```CSS
html{
  height:100%;
}
body{
  min-height:100%;
  background-color:#ccc;
  margin:0 auto;
}
div{
  width:100px;
  height:100px;
  outline:1px solid red;
}
```

This problem has been the laughingstock of CSS for years: how can something so obvious be so difficult to accomplish?

### Flex-box to the rescue

```CSS
html{
  height:100%;
}
body{
  min-height:100%;
  background-color:#ccc;
  margin:0 auto;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
}
div{
  width:100px;
  height:100px;
  outline:1px solid red;
}
```

## How it works

When you declare `display:flex` on a container, it becomes a **flex container**.

First, you use `flex-direction` to indicate whether you want the items in the container -- the **flex items** -- to "read" left-to-right (`row`), right-to-left (`row-reverse`), top-to-bottom (`column`), **or** bottom-to-top (`column-reverse`).

When you specify a flex-direction, you can think of it as placing an axis in that direction across your flex container. So if you use `flex-direction:row` or `row-reverse`, this **main axis** will be the same as the X-axis (horizontal) on a graph. Otherwise, it'll be the Y-axis.

Then, you determine how you want to align or **justify** the items along this main axis using the `justify-content` property. It'll do nice things for you like let you put even spacing between all the items (`spacing-between` and `spacing-around`).

Finally, you control how you align the items along the axis that goes across the main axis -- the **cross axis**, if you will -- with the `align-items` property. If you have `flex-direction:row`, the main axis is the X-axis, and the cross-axis is the Y-axis.

Lastly, you can also do nice things like control how you want things to line up across the cross-axis by using `align-content`, such as `space-between` and `space-around`.

## Problem 2: Make the footer stick

I want my footer to lie along the bottom of my page.

#### You tell me: What should I try?

Starter code:

```html
<body>
  <header>This is my header.</header>
  <main><p>Blah blah blah blah blah...</p></main>
  <footer>This is my footer!</footer>
</body>
```

```CSS
html{
  height:100%;
}
body{
  min-height:100%;
  background-color:#ccc;
  margin:0 auto;
}
footer{
  width:100%;
  height:50px;
  background-color:#888;
}
```

Making the footer lie against the bottom of my *screen* is pretty easy: I can just use absolute or fixed positioning. However, using absolute or fixed positioning means everything else on the page ignores my footer. The text of my `main` could easily run under my footer. I want the text of my `main` to "push" my footer to the end of the page.

### Flex-box to the rescue

```CSS
html{
  height:100%;
}
body{
  min-height:100%;
  background-color:#ccc;
  margin:0 auto;
  display:flex;
  flex-direction:column;
}
footer{
  width:100%;
  height:50px;
  background-color:#888;
}
```

#### What's the main axis on here?
#### What's the cross axis?

Four more terms: the **main start** (`flex-start`), where the start of the main axis is, the **main end** (`flex-end`), and the cross starts and ends.

### To recap

- `justify-content`: Align along flex-direction (main axis)
- `align-items`: Align along not-flex-direction (cross axis)
- `align-content`: Space things along main axis

## Some reading on Flex Box

Take 10 minutes to read through these. In particular, look at the Problems Solved by Flexbox.

As you do this, come up with "Explain Like I'm 5" (ELI5) definitions for these CSS properties:

- `flex-basis`
- `flex-shrink`
- `flex-grow`
- `order`

https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties

http://philipwalton.github.io/solved-by-flexbox/

http://bennettfeely.com/flexplorer/

#### What were your definitions?

### Recap

- `flex-basis`: How big the flex items "want" to be
- `flex-shrink`: If the flex container is too small to accommodate all the flex bases, the proportion a particular flex item will occupy
- `flex-grow`: If the flex container is too big for all the flex bases, the proportion a particular flex item will occupy
- `order`: The order in which you want flex items to appear along the main access. The default is 0. Negative numbers are allowed.

In particular, let's look at...

## The Holy Grail Layout

This is something you know well, even if you don't recognize the term. It describes a webpage with a header bar, a footer bar, and three columns along the middle: a wide "main" column, a navigation column on the left, and an advertisement, site map, or extra info column along the right.

Obviously, this layout won't work on tiny screens, unless you really like super-skinny columns. It's common to stack things on top of each other for mobile views to make one single column.

Before flex box, this involved a lot of pushing and shoving with dimensions and positioning. You would essentially have to write two completely separate stylesheets: one for mobile, and one for desktop.

With flex box, just change the `flex-direction` for smaller screen sizes, and you're pretty much done!

```
body{
  display:flex;
  flex-direction:row;
}
@media screen and (max-width:480px){
  body{
    flex-direction: column;
  }
}
```

## Exorcize

https://github.com/ga-dc/hyrule_potion_shop

### ...and that's it.

For the rest of class, please continue to work on your portfolio pages, or the pseudo-selector homework if you haven't done it yet. If you have questions about design, please make use of the instructors!
