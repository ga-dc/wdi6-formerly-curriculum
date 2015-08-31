  # Sass - Basic Reuse

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

- Step 1: Start a new Pen on CodePen.io.  I recommend you Log in/sign up for CodePen.io.
- Step 2: Decide how you will approach the problem.
- Step 3: Add some html.  Add some css.  Iterate.
- Step 4: Look for things that might benefit from a variable: remove duplication, signify intent, or to make change easier.

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

Bonus: Review and/or reproduce any of the other examples.

## Break (10 min)

## Discuss your examples (10 min)

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
- Put them at the top of your script, so that you can use them to configure your "page".

Timings:
- 5 min: Status.
  - Discuss [string interpolation](http://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375).
- 15 min: Start discussion: proper naming, usage. Students slack out examples.

#### Research: Color Functions (15 min)

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

[Check it out](http://codepen.io/mattscilipoti/pen/xwKrMR?editors=110). Look for `darken()`, `lighten()`, and `rgba()`


Review [Sass color options](http://sass-lang.com/documentation/Sass/Script/Functions.html).


## Break (10 min)

## Nesting (10 min)

As we've seen, CSS isn't very dry.  Take this nested CSS, for example.

```scss
.nav a{
  text-decoration:none;
}

.nav li{
  display: inline-block;
}

.nav a:hover{
  text-decoration:underline;
}
```

> Q. What does this do?

## The & selector (10 min)

Copy this scss into precess.co.  
```scss

.nav{
  & li{
    display: inline-block;
  }
  & a{
  text-decoration:none;
    &:hover{
      text-decoration:underline;
    }
  }
}
```

> Q: What happened?  How can we use this?

---

- Remove duplication.  
- Group similar rules together.  

An ecosystem that encourages best practices?  I love that.

## Mixins & Inheritance (10 min)

Remember the clearfix problem from the CSS2 lesson.  We had to write specific css to ensure floats did not effect the next element. Imagine trying to remember that "fix" and typing it in correctly every time you needed it.  Now, you can make a `clearfix` mixin that codifies the rules.  Then, those rules can be included in any CSS rule we want.

Let's look at this in precess.co.

```scss
// Make this in one file
@mixin clearfix(){
  /* clearfix */
  content: '';
  display:table;
  clear:both;
}

// Use it in many others
body::after{
  @include clearfix();
}

.nav::after{
  @include clearfix();
}
```

### Comments
While we're here, make note of those comments.  Some are in the compiled CSS.  Some are not.

- CSS Style Comments remain (`/* comment */`).
- Single line comments do not (`// comment`)
```

[Docs](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#comments)

> Q. Why would we want that?

---

See the example.


## Exercise: Flash (15 min)
http://codepen.io/mattscilipoti/pen/XmWbgq

## Conclusion

- Write the Sass to assign a color for every `h1`.  Style each `h2` with a color that "compliments" the color used by your `h1`.
- How do `@mixin` and `@include` work together to make css more managable?
- Name 3 benefits of Sass.


## References

- [All you ever needed to know about Sass interpolation](http://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375)
- [3D Buttons with Sass](https://jesse.sh/makes-3d-buttons-with-sass/)
- [WDI5](https://github.com/ga-dc/milk-and-cookies/tree/master/w10/d01_sass)
- http://precess.co
- Colors
  - http://sass-lang.com/documentation/Sass/Script/Functions.html
  - https://robots.thoughtbot.com/controlling-color-with-sass-color-functions
  - http://jackiebalzer.com/color
