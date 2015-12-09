# Pseudo-Pseulectors

- Screencasts
  - [Part 1](http://youtu.be/O9dpZj4XWmA)
  - [Part 2](http://youtu.be/sd8xY2jUXpc)
  - [Part 3](http://youtu.be/c-AsuaboyeI)
  - [Part 4](http://youtu.be/s7hM9RDgkRY)

## Lemming Expletives
- Describe what "pseudo" means in the context of CSS
- Describe how to select even and odd elements on a page
- Make a page multi-paginated without using Javascript
- Create custom radio buttons and drop-down menus using CSS

## Artwork in CSS

- http://www.cssplay.co.uk/menu/three_d
- http://mozilla.seanmartell.com/raindrop/
- [My personal favorite](http://www.romancortes.com/blog/bush-css/)

#### Why *shouldn't* you make a habit of creating artwork in CSS?

For one thing, there's a strong likelihood your CSS artwork will look terrible in other browsers.

For another thing, it takes a long time.

That said, it's great practice, and it's *fun*.

## Make CSS proud to be American

To begin, I'd like you to "warm up" by using CSS to take an HTML table and make it look like the American flag.

I've provided the table. However, there are no classes or IDs on any of the elements. Nonetheless, your goal is to accomplish this *without* touching the HTML at all -- just the CSS.

You may have never used the CSS involved here before, so as you work on this, think about what you'd need to Google to make this happen. When you successfully Google something, **please write down what you Googled**.

Please work individually:

https://github.com/ga-dc/murican_css

#### What did you Google?

#### What were the results?

### Let's look at the solution...

-----

## Pseudo-selectors

`:nth-child()` is one. More specifically, it's a pseudo-*class*. They let us do all sorts of things we had to use jQuery to do back in the day.

#### What does "pseudo" mean?

It's Latin (or Greek or something) for "false". `:nth-child()` is a "false class" because it doesn't really select an element; it selects a specific *state* of an element.

Pseudo-selectors all start with a colon. So if I wanted to select every `div` that was the 4th child of its parent, I'd write `div:nth-child(4)`.

### Whee, math!

You can do **very simple math** in these pseudo-selectors. If I wanted to select every third element, I'd write `div:nth-child(3n)`.

`n` is the number of the current element. So when CSS looks at the first `div`, it multiples `3 * 1`, and actually selects the 3rd div. When CSS looks at the second `div`, it multiplies `3 * 2`, and actually selects the 6th div.

If I wanted to select the first 9 `divs`, I'd use `div:nth-child(-n + 10)`. When the browser looks at the first `div`, it evaluates `-1 + 10`, and selects the 9th div. When it looks at the second `div` it evaluates `-2 + 10` and selects the 8th div.

```html
<tr><!-- I'm the 0th of my type. (3 * 0) + 3 is 3, so instead of me being selected, the 3rd <tr> is selected--></tr>
<tr><!-- I'm the 1st of my type. (3 * 1) + 3 is 6, so instead of me being selected, the 6th <tr> is selected--></tr>
<tr><!-- I'm the 2nd of my type. (3 * 2) + 3 is 9, so the 9th <tr> is selected... but it doesn't exist, so nothing happens.--></tr>
<tr></tr>
<tr></tr>
<tr></tr>
```

### Odds and evens

You *could* do `:nth-child(2n)`, but you can also just use the words "odd" and "even", as in `:nth-child(odd) and `:nth-child(even)`.

Here's a handy site for demonstrating all this:

https://css-tricks.com/examples/nth-child-tester/

### Getting really crazy

You can treat pseudo-selectors just like any other selector in that you can chain them together:

If I wanted to select all the elements between 10 and 18, I'd use `div:nth-child(n + 9):nth-child(-n + 19)`.

There are probably more interesting things you can select, but my brain starts to hurt after thinking about it after a while.

## CSS Color Box

https://github.com/ga-dc/css_color_box

## Pscavenger Hunt

There are lots of CSS pseudo-selectors, and they're really useful.

Look up each of the selectors below, and write down what it does.

- Group 1
  - `:hover`
  - `:visited`
  - `:active`
- Group 2
  - `:disabled`
  - `:checked`
  - `:focus`
- Group 3
  - `:target`
  - `:first-letter`
  - `:first-line`
- Group 4
  - `:empty`
  - `:not`
- Group 5
  - `:first-of-type`
  - `:last-of-type`
  - `:only-of-type`
  - `:nth-of-type`
- Group 6
  - `:first-child`
  - `:last-child`
  - `:only-child`
  - `:nth-child`
- Group 7
  - `:nth-of-last-type`
  - `:nth-of-last-child`
- Group 8
  - `:after`
  - `:before`


#### What does this select, in English?

`nav a:nth-of-type(odd):active`

> "Inside every `nav`, select every odd-numbered anchor that is currently being clicked upon."

## Forms

HTML checkboxes and radio buttons are virtually impossible to style, just because of the way browsers are built.

### Radio buttons

It's easy to make your own with CSS using `this+that`, which indicates "any `that` preceded immediately by a `this`":

```html
<input type="radio" name="country" value="USA" id="countryUSA" /><label for="countryUSA">USA</label>

<input type="radio" name="country" value="UK" id="countryUK" /><label for="countryUK">Britain</label>

<input type="radio" name="country" value="USSR" id="countryUSSR" /><label for="countryUSSR">Mother Russia</label>
```

```css
input[type=radio]{
  width:1px;
  height:1px;
  overflow:hidden;
  position:absolute;
  opacity:0.01;
}
input[type=radio]+label{
  display:block;
  background-color:#eee;
  color:#369;
}
input[type=radio]:checked+label{
  background-color:#369;
  color:#eee;
}
```

Why go to all that trouble on the radio button?

I'd use `display:none`, but in some (dumb) browsers, display:none means the element isn't included in form submissions.

### Drop-downs

HTML has drop-down menus built-in...

```html
<select name="country">
  <option value="USA">USA</option>
  <option value="UK">Britain</option>
  <option value="USSR">Mother Russsia</option>
</select>
```

...but they're ugly, and virtually impossible to style. You can make your own in the same way as your custom labels above.

The HTML is a bunch of radio buttons with labels, but you can use CSS to make them appear like a drop-down. It's still semantically valid, AND it looks great!

```html
<div class="dropdown">
  <a href="#">Select a country</a>
  <div>
    <input type="radio" name="country" value="USA" id="countryUSA" /><label for="countryUSA">USA</label>

    <input type="radio" name="country" value="UK" id="countryUK" /><label for="countryUK">Britain</label>

    <input type="radio" name="country" value="USSR" id="countryUSSR" /><label for="countryUSSR">Mother Russia</label>
  </div>
</div>
```

```css
.dropdown input[type=radio]{
  width:1px;
  height:1px;
  overflow:hidden;
  position:absolute;
  opacity:0.01;
}
.dropdown input[type=radio] + label{
  display:block;
  background-color:#eee;
  color:#369;
}
.dropdown input[type=radio]:hover + label{
  background-color:#369;
  color:#eee;
}
.dropdown a + div{
  display:none;
}
.dropdown a:hover + div{
  display:block;
}
```

## Pagination

We've used some Javascript to make single-page apps appear to have multiple views. But you can do the same thing with the `:target` selector in CSS.

You've probably seen URLs like this:

```
http://something.com/index.html#aboutMe
```

The `#` at the end indicates an anchor (or jump-tag, or jump-to). The browser is going to look for an element with the ID of `aboutMe`, and if it exists, it'll try to scroll to that element such that it's aligned with the top of the screen. If you click on a jump-tag referencing an element on the current page, it will *not* reload the page. This is handy for jumping around sections. (See any Github readme.)

The element indicated by the jump-tag is then considered "targeted", meaning we can select it with `:target`.

*This* means we can do stuff like show only the element that has been targeted, creating the illusion of having separate pages.

Here's an example (the orange flash):

http://stackoverflow.com/questions/11227809/why-is-processing-a-sorted-array-faster-than-an-unsorted-array/17782979#17782979

```html
<nav>
  <a href="#aboutMe">About me</a>
  <a href="#contact">Contact</a>
</nav>

<section id="aboutMe">
  <h2>About me</h2>
</section>

<section id="contact">
  <h2>Contact</h2>
</section>
```

```css
section{
  display:none;
}
section:target{
  display:block;
}
```

## Pseudo-selector translation

With the person at your table, write out *in English* what each of the following is selecting:

- `*:first-letter:after`
- `input:checked+label:hover`
- `input:not([type=text]):disabled`
- `p:last-of-type:after`
- `div:nth-of-last-type(3n+3)+*:hover`
- `input.title:focus+div`
- `a.button.delete:hover:after`
- `button.active.edit#update`
  - What's "wrong" with this selector?

## Continue working on your portfolio page

Try building a navigation menu, or creating the illusion of there being multiple pages on your one webpage.

If you're certain you don't have more you'd like to add to it, let your instructor know!

## (For those letting the instructor know)

**Write an exercise** for a future WDI student learning pseudo-selectors:

1. Create a "hook". What's the scenario? Maybe a shopkeeper in Legend of Zelda needs a website? Maybe the student has been tasked with refactoring the code for a crusty old Geocities page and making it HTML5/CSS3-compliant?
- Create starter code. This should be enough that students have an idea of where to start. If there's a lot of "busywork" that they need to do (e.g. doing `npm init` or `bower install bootstrap-sass`) maybe do that for them.
- Create a `readme.md` file. Anticipate questions students may have about the prompt and try to address those.
- Push it to **your** Github. Share your exercise with `/r/web_design` or `/r/programming`!
