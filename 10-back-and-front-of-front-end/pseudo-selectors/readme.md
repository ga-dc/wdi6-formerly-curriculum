# Pseudo-Pseulectors

## Lemming Expletives
- Describe what "pseudo" means in the context of CSS
- Describe how to select even and odd elements on a page
- Make a page multi-paginated without using Javascript
- Create custom radio buttons and drop-down menus using CSS

## Make CSS American

Take 10 minutes to do this:

https://github.com/ga-dc/murican_css

Feel free to work with someone.

"But Robin, I don't know how!"

Well, what might you Google?

### In retrospect

...you should probably never actually make artwork in CSS. As you saw in the SASS lesson, people *do*, but it's much more just for kicks than for any practical purpose, in the same way that someone wrote [COBOL on COGS](http://www.coboloncogs.org/INDEX.HTM) -- a back-end framework based on Rails, but written in a programming language that hasn't really been used in 30 years.

## Pseudo-selectors

`:nth-child()` is one. More specifically, it's a pseudo-*class*.

#### What does "pseudo" mean?

It's Latin (or Greek or something) for "false". `:nth-child()` is a "false class" because it doesn't really select an element; it selects a specific *state* of an element.

Pseudo-selectors all start with a colon. So if I wanted to select every `div` that was the 4th child of its parent, I'd write `div:nth-child(4)`.

#### What other pseudo-selectors have you seen?

- Pseudo-classes
  - `:hover`
  - `:visited`
  - `:active`
  - `:disabled`
  - `:checked`
  - `:focus`
  - `:target`
  - `:first-letter`
  - `:first-line`
  - `:first-of-type`
  - `:last-of-type`
  - `:only-of-type`
  - `:nth-of-type`
  - `:nth-of-last-type`
  - `:first-child`
  - `:last-child`
  - `:only-child`
  - `:nth-child`
  - `:nth-of-last-child`
  - `:empty`
  - `:not`
- pseudo-elements
  - `:after`
  - `:before`

You can treat pseudo-selectors just like any other selector in that you can chain them together:

#### What does this select, in English?

### Multiples

`nav a:nth-of-type(odd):active`

> "Inside every `nav`, select every odd-numbered anchor that is currently being clicked upon."

You can select any multiples of elements:

`tr:nth-of-type(3n+3)`

This will select every 3rd row. How? `n` represents the element's number of its particular type. For example:

```html
<tr><!-- I'm the 0th of my type. (3 * 0) + 3 is 3, so instead of me being selected, the 3rd <tr> is selected--></tr>
<tr><!-- I'm the 1st of my type. (3 * 1) + 3 is 6, so instead of me being selected, the 6th <tr> is selected--></tr>
<tr><!-- I'm the 2nd of my type. (3 * 2) + 3 is 9, so the 9th <tr> is selected... but it doesn't exist, so nothing happens.--></tr>
<tr></tr>
<tr></tr>
<tr></tr>
```

## Forms

HTML checkboxes and radio buttons are virtually impossible to style, just because of the way browsers are built.

### Radio buttons

It's easy to make your own with CSS:

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
  /* In some browsers, just using display:none would mean this element isn't included in form submissions. */
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

## To be continued
