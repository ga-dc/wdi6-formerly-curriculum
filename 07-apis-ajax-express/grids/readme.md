# CSS Grids

## Learning Objectives
* Explain why we use CSS grids.
* Identify the basic components of a grid.
* Review float, clearfix and other CSS properties.
* Build a grid from scratch.
* Use nested columns in a grid.
* Examine how grids are utilized in a front-end framework (e.g., Bootstrap).

## Opening Exercise (10 / 10)

Whiteboard a wireframe for [Craigslist](http://washingtondc.craigslist.org/).
* Focus on the main components of the page, sections that would be defined by the rows and columns in our grid.
* Don't worry about site content (e.g., text, images).
* Keep an eye out for width, height, proportion, number of components.
* [Sample wireframe.](http://www.comentum.com/images/wireframes-sample/ecommerce/home.png)

## Why use a CSS grid? (5 / 20)

### Structure
* A simple way to apply layout to a webpage. Not only makes our lives as developers easier, but also benefits the user through design.
* Avoid stressful CSS debugging by starting out on the right foot.

### Reusability
* Grids make the layout process easier because of resusable, semantically-named "utility classes" (i.e., a library of CSS class selectors).
* Grids aren't limited to a particular project. We can apply them to pretty much everything we do.
* Grids are highly customizable. You can really make them your own.

## Basic components of a grid (5 / 25)

### Rows
* The highest-level component of a grid.
* Comprised of columns.

### Columns
* Contain and separate site content.

### Gutters
* Provides spacing between our columns. Optional, but useful.

## Let's build a grid

You don't need a fancy-schmancy front-end framework to reap the benefits of a CSS grid. Let's start building one from scratch.

### Create HTML document

In your in-class folder, create a blank HTML file called `index.html`
* In the `<head>`, let's link to a stylesheet called `style.css`.
* And don't forget to create that stylesheet: `$ touch style.css`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel=stylesheet href="style.css" type="text/css">
</head>
<body>
</body>
</html>
```

### Define Column and Row Selectors

Let's start by creating `.column` and `.row` class selectors.
* These will contain properties that all rows and columns, regardless of size, will possess.

```css
.row, .column {

}

.row {
  /* Let's add a border so we can see our rows better */
  border: 2px solid rebeccapurple;
}

.column {
  /* Let's add another border so we can see our columns better */
  border: 2px solid tomato;
}
```

Before we start defining widths and giving our grid system some versatility, we need to take care of a few things...

### Box-Sizing (5 / 30)

**Q:** By default, what is `width` defined as?
* width = content

We want to be able to explicitly define our column widths so that they also include `border` and `padding`.
* `width` = `content` + `padding` + `border`
* This way, we know exactly how wide our columns will be.
* We can do this by changing the `box-sizing` property of our `.row` and `.column` selectors.

```css
/* styles.css */

.row, .column {
  /* By default, box-sizing is set to content-box */
  box-sizing: border-box;
}
```

[Strangely enough](https://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug), something that Internet Explorer actually got right was `box-sizing`.
* IE6, released back in 2006, had `box-sizing` set to `border-box` by default.

### Clearfix (10 / 40)

Our grid relies on being able to float columns. These columns will most likely contain content of various sizes.
* We need to make sure each piece of content is constrained to its respective row and column containers

Let's [illustrate this problem](https://jsfiddle.net/w0m0L8sg/).
* As this code stands, we have a row that contains two squares. But these squares are overflowing out of the row, which appears as a straight black line.

This is where the clearfix technique comes in. Fortunately, it's easy to implement (as long as you don't care about how your site looks in Internet Explorer).

```css
.row {
  overflow: auto;
}
```

Easy, right? But like I said, if we want to help out our IE friends, implementing clearfix requires a few more steps.

```css
/* The below code is in place of the previous clearfix example */

.row:before, .row:after {
  content: "";
  display: table;
}

.row:after {
  clear: both;
}
```

### Define Column Behavior (15 / 55)

So our rows are actually good to go!
* They're just horizontal containers.
* Thanks to clearfix we don't need to worry about content overflow.
* Our columns will handle page width. Let's work on that now...

```css
.column {
  float: left;
}
```

Let's give our rows and columns a spin.
* Take a minute or two to create some rows and columns in `index.html` using the class selectors we just made.
* What functionality do we currently have? What do we need to add?

```html
<body>
  <div class="row">
    <div class="column">Something</div>
    <div class="column">Something</div>
    <div class="column">Something</div>
  </div>
  <div class="row">
    <div class="column">Something</div>
    <div class="column">Something</div>
    <div class="column">Something</div>
  </div>
</body>
```

What does this look like?

!["just rows columns"](img/just-rows-columns.png)

Right now, we can...
* **Separate content into rows and columns.**
  * What does it look like when we turn `float` off?
  * How about `overflow`?

We need to...
* **Set column widths.** We don't necessarily want our column widths to be defined by their content.
* **Define total width.** In any scenario, we want our total grid width to cover the entire page.
* **Give everything some space.** Our grid will look better if we give our rows and columns some breathing room.

### BREAK (10 / 65)

### Create Columns with Specific Widths (15 / 80)

So we want to define our column widths not by the width of their content but how much of the page we want them to take up.
* Ex. a sidebar nav that takes up 1/6 of total page width.
* This is actually a topic of debate. Learn more [here](http://alistapart.com/article/content-out-layout).

Most grids have a column size of 12.
* That means the total column width for each row should equal 12.
* We're going to create a class selector for each column size.
  * `.column-1`: occupies 1/12 of total page width
  * `.column-3`: occupies a quarter (3/12) of total page width
  * `.column-12`: occupies entire (12/12) page width

**Q:** How are we going to define the widths for each of these classes?
* What unit should we use?
* How are we going to calculate these values?

```css
/* style.css */

/*
  How do we get these percentages?
  percentage = (n / 12) * 100
*/

.column-1 { width: 8.333%; }
.column-2 { width: 16.66%; }
.column-3 { width: 25%; }
.column-4 { width: 33.33%; }
.column-5 { width: 41.66%; }
.column-6 { width: 50%; }
.column-7 { width: 58.33%; }
.column-8 { width: 66.66%; }
.column-9 { width: 75%; }
.column-10 { width: 83.33%; }
.column-11 { width: 91.66%; }
.column-12 { width: 100%; }
```

You don't have to use the same class selector syntax as the above example.
* You can and should customize your grid to fit your own needs.
* Ex. `.col-2-3` = a column that takes up 2/3 width of its parent container.
* If you want to see some alternate syntax, check out [Jesse's grid](http://jshawl.github.io/grits/)!

Let's apply these selectors to `index.html` in a way that resembles an actual website.
* Note the addition of the `.header` `.middle` and `.footer` class selectors to our rows.
* We'll also add some actual content to our columns.

```html
<!-- index.html -->

<body>
  <div class="row header">
    <div class="column column-2">Logo</div>
    <div class="column column-4">-</div>
    <div class="column column-6">
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>FAQ</li>
      </ul>
    </div>
  </div>
  <div class="row middle">
    <div class="column column-2">-</div>
    <div class="column column-8">So much content.</div>
    <div class="column column-2">-</div>
  </div>
  <div class="row footer">
    <div class="column column-12">(c) Maseda Industries, 2015.</div>
  </div>
</body>
```

Let's also add some styling that will help us visualize this better.
* Note we give our `.header` `.middle` and `.footer` selectors some explicit padding and heights.

```css
/* style.css */

.column {
  float: left;
  border: 2px solid Tomato;
  border-radius: 20px;
  text-align: center;
}

.header > .column,
.footer > .column {
  padding: 25px;
}

.middle > .column {
  height: 400px;
  line-height: 400px;
}

/* Let's tweak our faux nav menu so it doesn't look as terrible */
.header ul {
  margin: auto;
}

.header li {
  display: inline-block;
  list-style-type: none;
}
```

!["before adding gutters"](img/pre-adding-gutters.png)

Let's take another look at our `index.html` in the browser.
* You can see our website has some form now.
* Our sections could use some space though...

### Gutters (15 / 95)

**Q:** How should we go about putting space between the sections of our site?
* What CSS properties do we have at our disposal?

We could try padding?
* But changing padding wouldn't make a difference since `box-sizing` is set to `border-box`.

What about margin? Maybe.
* Let's give each of our columns a little bit of margin. That should put just enough space between them.

```css

.column {
  /* We don't want to add too much space, so 1% should be enough */
  margin: 1%;

  float: left;
  position: relative;
  border: 2px solid Tomato;
  border-radius: 20px;
  text-align: center;
}

```

Let's see what our webpage looks like now...

!["gutters pre width adjustment"](img/gutters-pre-width-adjustment.png)

Ahh, what happened?
* Our width calculations are messed up since we added a 1% margin to each column.
* **Q:** How could we fix this? How about adjusting our widths?

```css
/* Since we added 1% margin to each column, we need to adjust our widths by -2% (1% on the left, 1% on the right). */

.column-1 { width: 6.333%; }  /* = 8.333% - 2% */
.column-2 { width: 14.66%; }
.column-3 { width: 23%; }
.column-4 { width: 31.33%; }
.column-5 { width: 39.66%; }
.column-6 { width: 48%; }
.column-7 { width: 56.33%; }
.column-8 { width: 64.66%; }
.column-9 { width: 73%; }
.column-10 { width: 81.33%; }
.column-11 { width: 89.66%; }
.column-12 { width: 98%; }
```

That does work...

!["gutters post width adjustment"](img/gutters-post-width-adjustment.png)

...but it can get pretty tedious.  

And what if we want some parts of our page to have larger/smaller gutters than others. How do we account for that?

#### Modules

The best way to go about adding gutters is using "modules".
* These are `<div>`'s that we place inside of our columns.
* We can then give these modules margins without displacing our columns.
* These margins count towards the content width of our column, meaning that they are included as width under `border-box`.

Let's add some modules to `index.html`...

```html
<body>
  ...
  <div class="row middle">
    <div class="column column-2">
      <div class="module">-</div>
    </div>
    <div class="column column-8">
      <!-- Place column content inside module -->
      <div class="module">So much content.</div>
    </div>
    <div class="column column-2">-</div>
  </div>
  ...
</body>
```

Now let's create a `.module` selector in `style.css`

```css
.module {
  /* Let's add a background color to our modules so they're clearly visible.*/
  background: lightblue;

  /* Now let's give our modules a left and right margin of 10px */
  margin: 0 10px 0 10px;
}
```

The result...

!["spacers added"](img/spacers-added.png)

Now we have some space between our columns' content.
* The whitespace is the margins generated by our module elements.
* If we wanted, we could go in and give each of our modules custom margins. Potential for customization is high here.

### Nested Columns (10 / 105)

Last thing about grids I want to talk about are nested columns...

We can "incept" our grid and plant columns within columns.
* For example, say we want the middle column in the center of our site to be divided into three content sections.
* We can treat that middle column as being 12 columns wide and create the following `<div>` tags in our HTML...

```html
<!-- index.html -->

<div class="row middle">
    <div class="column column-2">-</div>

    <!-- Here is that middle column. -->
    <div class="column column-8">
        <!-- We can divide it into thirds the same way we would any row. -->
        <div class="column column-4">1/3</div>
        <div class="column column-4">2/3</div>
        <div class="column column-4">3/3</div>
    </div>

    <div class="column column-2">-</div>
  </div>
```

And while we're at it, let's change the border color of our nested columns so we can see them better.

```css
.column .column {
  border: 2px solid springgreen;
}
```

Let's see how that changed our page...

!["nested columns"](img/nested-columns.png)

**Be Warned:** Making nested columns (and rows) work might require a fair amount of tweaking depending on how your grid and gutters are set up.

## Exercise: Match That Grid (15 / 120)

Use what we have learned in class to recreate the grid structure for [Craigslist](http://washingtondc.craigslist.org/).
* Start out by copying our in-class files into an exercise folder.
  * `$ mkdir exercise`
  * `$ cp index.html style.css exercise`
* In your exercise `index.html`, clear out all the content in `<body>`. We're going to start from scratch here.
* Do not clear out anything in your exercise `style.css` though. We're still going to use this.

Notes
* Don't worry about content. Just outline the main portions of the site.
* Start simple. Begin with the larger, outermost containers and work your way inside.
* Hold off on gutters and modules until you've built a basic grid.
* Not every `<div>` you create has to be a row or column.
* Use your wireframe from the opening exercise as guidance.

### Bonus
* Add gutters and modules wherever necessary.
* Replace the column class selector syntax (e.g., `.column-6`) with your own!
* Add some content to your columns. Keep it simple - we don't expect you to recreate the site.

## Break (10 / 130)

## Front-End Frameworks (10 / 140)

You don't always have to build a grid from the ground up.

**Q:** What is a CSS front-end framework?
* Like a library, in that it gives us a toolkit that we can use to streamline the front-end development process.
* But it's a framework, so that means we need to follow a certain structure and name things a certain way.
  * If you use Bootstrap but don't follow their protocol, Bootstrap styling won't work.

There are tons of front-end frameworks out there -- like Bootstrap, Foundation, Material Design -- that incorporate grid systems.
* They're not necessarily better. In fact, if you're only looking to implement a grid system and not any additional styling, you might be better off building a grid from scratch.
* Nevertheless, you will encounter these frameworks in the wild so let's get some experience with them.

## Bootstrap

[Bootstrap's got grids](http://getbootstrap.com/css/#grid).

!["bootstrap grid table"](img/bootstrap-grid-table.png)

Bootstrap uses a similar class selector syntax for columns as what we used in our from-scratch example.
* `col-md-6`
* Begins with `col-` and ends with `-6`, the width of that column.
* Bootstrap also helps out with responsive design and allows us to set multiple column widths depending on the user's device.
  * In this example, `md` stands for "medium" and covers most laptops and desktops.
  * Don't worry about the other sizes for now. You'll learn about Responsive Web Design later this week.

### Exercise: Implement Bootstrap (10 / 150)

Let's implement the [Craigslist grid](http://washingtondc.craigslist.org/) you created in the last exercise using Bootstrap
* In your exercise `index.html` file, link to the Bootstrap stylesheet [using a CDN](http://getbootstrap.com/getting-started/).
* You can keep using `style.css` too.
* Implement the same grid from the last exercise using Bootstrap row and column class selectors. Again, not every `<div>` needs to a row or column.
* If you finish early, feel free to experiment with responsive column widths and/or add some additional styling to your page.

## Additional Reading

* [Pesticide.io](http://pesticide.io/)
* [Internet Explorer Box Model Bug](https://en.wikipedia.org/wiki/Internet_Explorer_box_model_bug)
* [Learn Layout: Clearfix](http://learnlayout.com/clearfix.html)
* [A New Micro Clearfix Hack](http://nicolasgallagher.com/micro-clearfix-hack/)
* [Content-Out Layout](http://alistapart.com/article/content-out-layout)
* [Bootstrap CSS Documentation](http://getbootstrap.com/css/)
* [Grits, a grid system made by Jesse Shawl](http://jshawl.github.io/grits/)
