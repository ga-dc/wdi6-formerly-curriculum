# Sass: Control Directive, Functions, and other worlds.

- Explain what a preprocessor is and what problem it solves
- Use control directives for conditionals (@if)
- Use control directives for loops (@for, @each and @while)
- Use pure Sass functions to make reusable logic

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

## Conditionals (@if)

Let's take a few minutes to read about [@if](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#control_directives__expressions)

> Q: Any points of interest?

---

A. Student responses.


### Exercise: Flash Redux (15 min)

Let's go back to the Flash messages.  This time, we will update our mixin with a conditional that sets the text color to `#fff` if the background is dark enough and `#000` if the background is light enough.

[Solution](http://codepen.io/adambray/pen/vLgrKK)

Hint: research how you can determine the "lightness" of a color using SASS.

## Loops

Look at BAMSAY.

- [Pure CSS Solution](http://codepen.io/adambray/pen/obBOgP?editors=110)

Check out the css.  Lots of text-shadow's, huh?  You want to type all of them?

Q. Why not?

---

> A.
- boring!
- error prone
- time consuming
- maintenance?

### Exercise: Write a function to build BAMSAY

- [Starter](http://codepen.io/adambray/pen/adpxOq?editors=110)
- [Solution](http://codepen.io/adambray/pen/NxdmGG?editors=110)

Let's specify what it takes to draw these shadows.  And then **codify** it using a function.


## Using the SASS Preprocessor

How do we use it?

![Compile Steps](http://i0.wp.com/css-diary.com/wp-content/uploads/2014/07/sass.png?resize=700%2C400)

```
gem install sass
```
```
sass --watch input_file:output_file
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

Q. What happens in our code?

---

> A.
The browser only supports CSS.  We reference the compiled **css** file.  Our front-end **ignores the sass**.  That's why we don't put the sass files in "public/".

## style.scss vs style.sass (5 min)

Sass supports two "styles": sass (*.sass) and Sassy CSS (*.scss).  They both use the same SassScript.  The .scss format is a superset of CSS3.  The .sass is a bit more concise and uses indentation to indicate blocks of CSS, but it requires a full rewrite of your css.

Further reading: http://thesassway.com/editorial/sass-vs-scss-which-syntax-is-better

## Exercise: Convert Codepen to Project (10 minutes)

Create a new repo for BAMSAY, and create the necessary files to get sass / css
compilation working.

## Break (10 min)

## Sass and Rails (30 min)

The [sass-rails gem](https://github.com/rails/sass-rails) is provided for working with Sass in Rails. I found that my words of wisdom were lining up with nicely with their documentation.  They've got you covered.  

### Research (15 min)

That said, let's practice reading documentation together. We'll discuss how to pull out the important points and gotchas.
https://github.com/rails/sass-rails

Q. What stood out to you?

---

> A.
- Sass is supported by default (by Asset Pipeline).
- Configuration has caveats.  Must review when/if I configure something.
- Important Note!?!
- Glob Imports.  Looks powerful.  Note the "Note".
- One "Asset Helper" for each media type.  Where are the "Asset Helpers" used?  
- Tests?  Why would I run the tests?

### Organization

http://www.mattboldt.com/organizing-css-and-sass-rails/

Don't miss the comments.

Here's an example of an app I (Adam) worked on:
[Reservations](https://github.com/YaleSTC/reservations/tree/master/app/assets/stylesheets)

#### tl;dr

- Use @import to explicitly require each file you need, in the order you require them (rather than `*= require_tree .`).  Judicious use of  file glob `@import "mixins/*"`).
- Use `main.scss` to load your app's dependencies (vars, mixins, etc.), then the page styles.
- Development adds links to .scss source
- Load vendors (i.e. Bootstrap) in application.css, before you include main.scss
- Note: You need to load all your dependencies in the file that uses them.  If you have more than one layout, you may need a "main" file for each, to load the dependencies in each.

The [Rails Guides](http://guides.rubyonrails.org/asset_pipeline.html) are a recommended resource too.

## [Optional] Apply SASS to an app from Project 2 or 3.  

Look for ways to remove duplication and improve documenting your intent.

## [Optional] Exercise: 3D Button

On to the next goal. A button.  A big, cool, [3D button](http://codepen.io/adambray/full/rxjKWR/).

- [Starter](http://codepen.io/adambray/pen/xZgzgK?editors=110)
- [Solution](http://codepen.io/adambray/pen/xZgzgK?editors=110)

Check out the css.  More text-shadows?  
All the reasons from before apply, plus... how do I know what to type?  This one is complicated.

Again, let's identify, systematize, and **codify** what it means to be a 3D button.

Q: How?  How does this button work?

---

- up
  - Flat rectangle
  - Lots of box-shadows, layer upon layer
  - color?  Relative?
- hover
  - moves to the left a bit
- down (active)
  - shift right, down
  - less box-shadows

Timings:
- 5 min: Flat button, Hover state changes it.  Breaking down box-shadows. Identifying the pattern.
- 10 min: Realizing that you don't want to type all that. :)  Ignore it.  Get a basic button working.
  - You will need a loop:
```
$offset: 10;
@for $i from 0 through $offset{
  text-shadow: 0+$i,
}
```
- 20 min: You have worked out the plan for the button and have started to codify it.

Jesse has a [great blog post](https://jesse.sh/makes-3d-buttons-with-sass/) on how he built this.

Now we've added "function" and "mixin" to our list, joining "variables" and "loops".


## Conclusion

We covered a lot about Sass, but we're really just scratching the surface.  Make time to review the docs and look over fun examples online.  It's important get some more ideas about what we can do with sass and css.

- How we use sass files in a standard html page?
- Do we need to run `sass --watch` when working in Rails?
- What directive should we use to require other sass files?
- Name 3 benefits of Sass.


## References
- [3D Buttons with Sass](https://jesse.sh/makes-3d-buttons-with-sass/)
- [WDI5](https://github.com/ga-dc/milk-and-cookies/tree/master/w10/d01_sass)
- http://precess.co
