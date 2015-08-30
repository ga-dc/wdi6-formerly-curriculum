# Sass: Control Directive, Functions, and other worlds.

- Use control directives for conditionals (@if)
- Use control directives for loops (@for, @each and @while)
- Use pure Sass functions to make reusable logic
- Create a Pull Request to sass

## Intro (10 min)

We are moving into the more programmatic portion of SassScript: conditionals, loops, and functions.

### Intro to SassScript

We've been playing with SassScript.  Sass is fully CSS3-compatible, meaning you *can* write css the way you always have.  But, where's the fun in that? More importantly, you can start with a plain old css file and enhance it.  You can use SassScript to make writing css more pleasant.  Note: this doesn't change the functionality of css.  In the end, Sass uses a concise language, SassScript, to generate the verbose css required to make your page sing.

> Q: If I said SassScript is like other languages, what would you expect?
---

It has:
- variables
- conditionals
- loops
- functions
- reuse form other files

It has all that.


### Sass Features

- Fully CSS3-compatible
- Language extensions such as variables, nesting, and mixins
- Many useful functions for manipulating colors and other values
- Advanced features like control directives for libraries
- Well-formatted, customizable output

In this lesson, we are covering the portions that helpers that enhance css.  The next lesson will dig deeper into the programmatic aspects of Sass.

## Preprocessor? Precompiler? (10 min)

How do we use it?

![Compile Steps](http://i0.wp.com/css-diary.com/wp-content/uploads/2014/07/sass.png?resize=700%2C400)

```
gem install sass
```
```
sass --watch input:output
```

### Example:

Start with this:
```
├── assets
│   └── sass
│       └── style.scss
└── public
```
Precomile the sass to css.
```
sass --watch assets/sass/style.scss:public/style.css
```
Results in:
```
├── assets
│   └── sass
│       └── style.scss
└── public
    └── style.css
```

> Q. What happens in our code?

---

The browser only supports CSS.  We reference the compiled **css** file.  Our front-end **ignores the sass**.  That's why we don't put the sass files in "public/".

## style.scss vs style.sass (5 min)

Sass supports to "styles": sass (*.sass) and Sassy CSS (*.scss).  They both use the same SassScript.  The .scss format is a superset of CSS3.  The .sass is a bit more concise and uses indentation to indicate blocks of CSS, but it requires a full rewrite of your css.

Further reading: http://thesassway.com/editorial/sass-vs-scss-which-syntax-is-better

## @if

???

## BAMSAY! (20 min)

Look at [BAMSAY](http://codepen.io/jshawl/full/cLJal)

Check out the css.  Lots of text-shadow's, huh?  You want to type all of them?

> Q. Why not?

---

- boring!
- error prone
- time consuming
- maintenance?

Let's systematize it.  Let's specify what it takes to draw these shadows.  And then **codify** it.

> Q. How did we create BAMSAY?

---

What is the element?  Start there.
Small steps.

Before long, you'll want to add all the text-shadows.

Take a look at the css:
```
text-shadow: -1px 0px 0px #fefefe,
-2px 1px 0px #fefefe,
-3px 2px 0px #fefefe,
-4px 3px 0px #fefefe,
-5px 4px 0px #fefefe,
-6px 5px 0px #fefefe,
...
-41px 40px 0px #fefefe
```

Start at?
Increment what?
Decrement what?
Until?

## Lunch (60 min)

## 3D Button (15 min)

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

### Exercise: Make It So (45 min)

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
- 20 min: You have worked out the plan for the button and have started to codify it.

[Thanks jshawl!](https://jesse.sh/makes-3d-buttons-with-sass/)

Now we've added "function" and "mixin" to our list, joining "variables" and "loops".

## Break (10 min)

## Sass and Rails (30 min)

???

## [Optional] Create a Pull Request to Sass
## [Optional] Review of School Health app, Group 5
