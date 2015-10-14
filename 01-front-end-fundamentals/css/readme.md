# CSS

##LO's
- Construct a CSS rule using selectors, declarations, properties, and values
- Articulate the pros and cons of stylesheets, styles in the head, and in-line styles
- Define "cascading" in the context of CSS specificity
- Style the size, color, border, text, and font of all elements of a given tag on a page
- Demonstrate the use of class and ID selectors to target specific element(s)
- Distinguish between block and inline display values
- Identify the components of the box model
- Differentiate between the border-box and content-box values for box-sizing
- Apply knowledge of the box model to adjust spacing between and around elements on a page
- Bookmark 2-3 good resources that developers can use refer to for CSS help

## Opening Framing (3 min)
> Although some of this may be review from the prework, repetition is key to becoming a good programmer!

Wouldn't it be nice to make our webpages look schnazzy? Enter CSS. There is such a wide breadth of things to learn about CSS and honestly, you could probably teach a whole 12 weeks to understand all the capabilities, nuances and subtleties. So we'll only be scratching the surface with it, but I encourage you to experiment with CSS on your own. As you consistently use CSS you realize, while frustrating, becomes awesome to utilize.

## Separation of Concerns

It is possible to style web pages using html alone. We did this in the early 2000s using mostly images and table borders. CSS allows us to separate
the styles of our website/app from the content and behavior:

- HTML
  - Content 
- CSS
  - Styles 
- JS
  - Behavior 

## In-line vs head vs stylesheets(30m)
> Not a codealong let class know they're welcome to but may be better just to pay attention to the first hour instead of typing everything out. All notes available in lesson plan

At the crux of it all, the primary concept of CSS is to select an HTML element and then do something to it. IE. I want to take the body element, and I want to apply a background color to it.

Let's get started by creating a new html webpage that we'll call `index.html` in `~/wdi/sandbox/css/`:

```bash
$ touch index.html
```

Let's throw some dummy content into HTML inside our `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>CSS!</title>
</head>
<body>
  <h1>Hello world!</h1>
  <p>This is some fake dummy content. It doesn't matter what it is! Whatever you want! Smelly fish create beautiful works of art in order to achieve world peace.</p>
  <!-- http://hipsum.co/ -->
</body>
</html>
```

*Whiteboard definitions as they come up*

So one way we can style elements in HTML is in the tag itself. These are called inline-styles:

```html
<p style="background:blue;"></p>
```

### T & T (3m)
Knowing not too much about coding. Take a couple minutes and chat with your partner about why this particular way of styling an element might not be the greatest approach?

> Don't use inline styles if you can avoid it. They are very specific! (More on this in a minute)

The next approach to implementing a style is to put the styling in the `<head>`:

```html
<head>
  <title>CSS!</title>
  <style>
    p {
      background: blue
    }
  </style>
</head>
```
> You've seen this before, but I want to highlight some syntax here. From p until the ending curly brace is a CSS rule. The p in this code is what's called the selector. The background  in the code is the property. Finally blue is the value.

This is a bit better. I feel less dirty. But feel weird about this one too. Why might that be? (ST-WG)

> What if you have both styles in the head *and* inline styles? Which style will be applied? Why is this?

What's the best way? External stylesheets! Let's create a new file called `styles.css`:

```bash
$ touch styles.css
```

In our `index.html` let's go ahead and link to that stylesheet in the `<head>`:

```html
<head>
  <title>CSS!</title>
  <link rel='stylesheet' href='styles.css'>
</head>
```

In `styles.css`:
```css
p{
  background:blue;
}
```

Ahh, much bettah. You might be asking yourself, but Andy? that seems like a lot more work. And you might be right initially. But we're talking about 1 `<p>` right now. What if we're talking about 100 `<p>`'s and now those elements were spread across multiple web pages. Now all of a sudden this last method is less work.

## CSS Selectors(10m)
As you can see, there's more than one place to target elements. There's also multiple WAYS you can target elements. Let's throw some additional content in `index.html`:

```html
<body>
  <h1>Hello world!</h1>
  <p>This is some fake dummy content. It doesn't matter what it is! Whatever you want! Smelly fish create beautiful works of art in order to achieve world peace.</p>
  <p class="red">This paragraph tag element has a class of "red"</p>
  <p class="red" id="green">This paragraph tag element has an id of "green"</p>
  <div class="red">This div tag element has a class of "red"</div>
</body>
```

All I did here was add two `<p>` elements and added a class of "red" to both and an id of "green" to the last. Additionally I added a `<div>` element with a class of red.

The first thing I want to do is make it so all elements with the class of "red" has a background of red. In our `styles.css`:

```css
.red {
  background: red;
}
```

Awesome, but I think I want just the `<p>` elements with that class name to have a background of red. So in `styles.css`:

```css
p.red{
  background: red;
}
```

Finally to select an element with an id you use `#`. I'm going to change the background color of the p element with class "green" in our `styles.css`:

```css
#green{
  background: green;
}
```

*whiteboard common selectors as well as let them know about references at the bottom of the page*

## CSS Specificity (20m)
If I change the css selector from `p.red` back to `.red` you'll notice that the paragraph element with the id of green is still green. This is because of CSS Specificity. While CSS cascades from top to bottom. The CSS that is applied depends on Specificity as well. Take the following example:

```css
#green {
  background: green;
}
.red {
  background: blue;
}

.red {
  background: red;
}
```

In this example the elements that have the class red, will ultimately have a background of red even though blue was set first because it takes the last declared property. However, even though the `#green` selector was written first, it has a higher specificity and therefore overides the following background properties.

The following list of selector types is by increasing specificity:

- Universal selectors (e.g., '\*')
- Type selectors (e.g., h1)
- Class selectors (e.g., .example)
- Attributes selectors (e.g., [type="radio"])
- Pseudo-classes (e.g., :hover)
- ID selectors (e.g., #example)
- Inline style (e.g., style="font-weight:bold")

You can read more about CSS specificity [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
You can access a CSS specificty calculator [here](http://specificity.keegan.st)

## The Box Model!(15m)
> One of the tricky things about CSS at first is the Box Model. But it's actually really simple. Let's break it down.

![](https://dl.dropboxusercontent.com/s/capg35hblhr6o7v/Screenshot%202015-10-13%2014.11.39.png?dl=0)

Any HTML element can be considered a box, and so the box model applies to all HTML elements. If you select an element prescribe it a height and width, the content itself will be that height and width.

What the size doesn't include:
- padding
- border
- margin

Let's go into our existing `index.html` and `styles.css` and add some stuff to illustrate what I mean. In `index.html`:

```html
<p>This is a paragraph</p>
<p class="padding">This is a paragraph</p>
```

In `styles.css`:

```css
p {
  background: red;
  height: 100px;
  width: 20%;
}
```

Lets check this out in our chrome browser with the developer tools. As you can see, everything is identical. Which makes sense. Let's go ahead and add some padding to the html element with class "padding". In `styles.css`:

```css
p {
  background: red;
  height: 100px;
  width: 20%;
}

p.padding {
  padding:10px;
}
```

> Well that's certainly interesting. Even though the dimensions are the same. The element with padding is larger.

Let go ahead and add `margin: 10px;` and `border: 10px solid black;` to the padding class as well. Let's inspect that element in the browser and you can see Chrome's clear depiction of content, padding, border and margin.

All these different sizings can be confusing. This can especially be frustrating when you think something's 20 % when in actuality it isn't.  Enter box-sizing.

At the top of our `styles.css`:

```css
* {
  box-sizing: border-box;
}
```

Now when we refresh, all of our 20% widths are the same regardless of padding. It also includes border! However, it does not include the margin.

## CSS Properties and values
Man, there's alot of them. We've seen many just in this lesson thus far. There are far more than I can cover. Additionally, there's just no way to know them all. Unless you're a CSS savant. Fortunately, there are some great references. Here's just a few!

[CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
[CSS Tricks- An awesome resource for cool CSS schtuff](https://css-tricks.com)

## We do- Wendy G Bite *Code Along*
Exercise is [here!](https://github.com/ga-dc/wendy_bite)
> notes will be pushed after lesson
## We do- Wendy G Bite *Code Along* (60 m)
> ST-WG. Use notes as a guideline and tool for students later. Don't necessarily have to stick to it 100%

    $ git clone https://github.com/ga-dc/wendy_bite

I think we can knock out an easy one early on. I can see by looking at that page that the background color and text color are mostly similar. Additionally centering everything and giving it a little bit of a buffer with the padding/border/margin on the edges will be nice. Let's go ahead and change that in `styles.css`:

```css
body{
  background: #444;
  color: #fff;
  border: 5px solid #777;
  margin: 2em auto;
  padding: 2em;

}
```

Alright, just with 5 properties already looking a lot better! I think we can do another quick fix by just centering the text for the header and footer.

```css
header, footer{
  text-align: center;
}
```

I think the default link color is bothering me. Lets ahead and change that and while were at it change the links to bold, they look bold to me:

```css
a {
  color: #66CD9B;
  font-weight: bold;
}
```

I'm digging those lines above and below that main section. Let's go ahead and add that:

```css
section {
  border-color: #ccc;
  border-width: 1px 0;
  border-style: solid;
  /*add padding and margin as necessary*/
}
```

Our words are too close together, lets fix that:

```css
p {
  line-height:1.5;
}
```

Man, this is already looking pretty close! Now just some small things. Theres a tiny border around the image, but its not directly on the image. I also notice that the text in the example isn't butting right up next to the image either. Let's fix all of that!

```css
img {
  border: 1px solid #ccc;
  padding: 5px;
  margin-left: 1em;
  margin-bottom: 1em;
}
```

I think that's pretty good. There's some minor tweaks that can be made. Like font and changing the color for active links.


## You do/ Finish for HW - Dew
