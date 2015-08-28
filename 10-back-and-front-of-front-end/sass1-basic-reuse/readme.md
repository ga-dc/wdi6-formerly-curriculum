# Sass - Basic Reuse

- Explain what a preprocessor is and what problem it solves
- Use variables and nesting to dry up CSS
- Use color functions to create dynamic color schemes
- Explain what `&` is and why we use it
- Use @include and @extend to create mixins and inherit from other rules

## What is Sass? (15 min)

![Sass Icon](http://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg)
![Sass Glasses](http://sass-lang.com/assets/img/illustrations/glasses-2087d741.svg)

---

### Some would say Sass is...
## [Syntactically Awesome Stylesheets](http://codepen.io/mattscilipoti/full/xwKrMR).

> Sass is an extension of CSS that adds power and elegance to the basic language.

> You write a combination of CSS and SassScript, which compiles to proper CSS.

> It allows you to use variables, nested rules, mixins, inline imports, and more, all with a fully CSS-compatible syntax.

> Sass helps keep large stylesheets well-organized, and helps get small stylesheets up and running quickly...


## The Finished Product

Here are a few examples of Jesse playing with CSS/Sass.  Let's look at the css that is required to produce this effect.  Then, compare that to the Sass we used to generate the css.

- [BAMSAY](http://codepen.io/jshawl/pen/cLJal)
- [Boxes](http://codepen.io/jshawl/pen/nHDLz)
- [Bullseye](http://codepen.io/jshawl/pen/wpeit)
- [A Button](http://codepen.io/jshawl/pen/bcjyH)
- [Forest](http://codepen.io/jshawl/pen/cJjIm)
- [Space Invader](http://codepen.io/jshawl/pen/cnyrJ)

### Exercise: Syntastically Awesome Stylesheets (35 min)

You task is to [make this](http://codepen.io/mattscilipoti/full/xwKrMR).  Have fun.  Make portions of it stand out -- **using just CSS**.  Don't worry about Sass yet.

- Step 1: Start a new Pen.  I recommend you Log in/sign up for CodePen.io.
- Step 2: Decide how you will approach the problem.
- Step 3: Add some html.  Add some css.  Iterate.

Suggestions:
- Use a [google font](https://www.google.com/fonts).
- Highlight the first character.  Css has a selector for that.

Timing Expectations:
- 5 min: Your own CodePen.  We see the phrase.  Identified the components needed and steps to reach your goal. Researching how to highlight the characters.
  - Discuss:
    - What elements?
    - Which characters are highlighted?
    - How?

- 15 min:  Shaping up nicely. First letters are highlighted.  Playing with that middle "s".
  - Discuss:
    - All of your first characters should be highlighted.  If not, I recommend you adjust your approach.  Discuss.
    - How did you highlight?  Specifics.
      - `::first-letter`.  Breaking "Stylesheets" into two elements. Only "block" elements (including "inline-block").  
- 25 min: Fto5 to continue
- 35 min: Discuss after the break.

## Break (10 min)

## Discuss your "Sass" examples (10 min)

Student(s) displays result.  Discuss steps and reasoning.

## Variables

Sass allows us to intermingle css and SassScript.  Similar to how ERB allowed us to embed Ruby in our html.  One thing this gives us the variable.

Assignment (note the dollar sign):
``` sass
$variableName: value
```

Usage:
``` sass
css_declaration: $variableName
```

### Real world example:

Assignment:
``` sass
$colorPrimary: #badda55;
```

Usage:
``` sass
background-color: $colorPrimary;
```



### Exercise: Variables & Colors (30 min)

Use variables to signify intent.  
- Extract some values in your css to variables.  Choose helpful names.  
- Identify duplication and things that vary frequently.  Think about what you changed a few times as you were building this.  What are you likely to change in the future?  Turn these into "vary"ables.  
- Put them at the top of your script, so that you can use to configure your "page".

Timings:
- 5 min: Status.
  - Discuss [string interpolation](http://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375).
- 15 min: Start discussion: proper naming, usage. Students slack out examples.

#### Colors

Let's stay right here and play with colors.

> Q. How many colors do you see on this page?

---


I see five:
- font color
- first character
  - background-color
  - border-color
  - box-shadow
- background

But... they are all based off of just 2 colors.  The primary color is Cerulean Blue (#2A52BE, my favorite color).  The secondary color is "Jesse" Green (#bada55).

[Check it out](http://codepen.io/mattscilipoti/pen/xwKrMR?editors=110).

Review [Sass color options](http://sass-lang.com/documentation/Sass/Script/Functions.html).

## Intro to SassScript

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

## Nesting (10 min)

```scss
h1{
  text-decoration:none;
  a:hover{
    text-decoration:underline;
  }
}
```

## The & selector (10 min)

```scss
a{
  color: #BADA55;
  &:hover{
    color: blue;
  }
}
```

## References
- [All you ever needed to know about Sass interpolation](http://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375)
- [3D Buttons with Sass](https://jesse.sh/makes-3d-buttons-with-sass/)
- [WDI5](https://github.com/ga-dc/milk-and-cookies/tree/master/w10/d01_sass)
- http://precess.co
- Colors
  - http://sass-lang.com/documentation/Sass/Script/Functions.html
  - https://robots.thoughtbot.com/controlling-color-with-sass-color-functions
  - http://jackiebalzer.com/color
## Exercises:
 - Loops
   - Bamsay: http://codepen.io/mattscilipoti/pen/doxgBX?editors=110

Goals:
- No "I do"
  - students already familiar with basic programming concepts (variables etc.)
- minimal lecture.  Use sass docs.
  - break into pieces.  e.g. read, exercise on "variables".  Then, read, exercise on "@if". etc.
- PROBLEM!?!
- Get students to share You do, instead of me presenting my solution.
