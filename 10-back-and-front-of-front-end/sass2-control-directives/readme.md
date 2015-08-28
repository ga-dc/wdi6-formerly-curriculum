# Sass: Control Directive, Functions, and other worlds.

- Use control directives for conditionals (@if)
- Use control directives for loops (@for, @each and @while)
- Use pure Sass functions to make reusable logic
- Create a Pull Request to sass

## Intro

We are moving into the ,ore programmatic portion of SassScript: conditional, loops, and functions.

## @if

???

## BAMSAY!

Look at [BAMSAY](http://codepen.io/jshawl/pen/cLJal)

Check out the css.  Lots of text-shadow's, huh?  You want to type all of them?

> Q. Why not?

---

- boring!
- error prone
- time consuming
- maintenance?

Let's systematize it.  Let's specify what it takes to draw these shadows.  And then **codify** it.


## 3D Button

On to the next goal. A button.  A big, cool, [3D button](http://codepen.io/mattscilipoti/full/RWbPRw
).

Check out the css.  More text-shadows?  
All the reasons from before apply, plus... how do I know what to type?  This one is complicated.

Again, let's identify, systematize, and **codify** what it means to be a 3D button.

Q: How?  How does this button work?
---

- up
  - Flat rectangle
  - Lots of box-shadows, layer upon layer
  - color?  Relative?
- down
  - shift right, down
  - less box-shadows

### Exercise: Make It So (30 min)

- Recreate [Make It So](http://codepen.io/mattscilipoti/full/RWbPRw)

Timings:
- 5 min: Flat button, Hover state changes it.  Breaking down box-shadows. Identifying the pattern.
- 10 min: Realizing that you don't want to type all that. :)  Ignore it.  Get a basic button working.
  - You will need a loop:
```
$offset: 10;
@for $i from 0 through $offset{
  ???
}
```
- 20 min: You hav worked out the plan for the button and have started to codify it.

[Thanks jshawl!](https://jesse.sh/makes-3d-buttons-with-sass/)

Now we've added "functions" to our list, joining "variables" and "loops".


## Sass and Rails

???

## [Optional] Create a Pull Request to Sass
