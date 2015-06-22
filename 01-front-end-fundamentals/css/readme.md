# CSS

## LO's
- Describe the syntactical and functional relationship between selectors, properties, and values
- Differentiate between stylesheets, styles in the head, in-line styles
- describe "cascading" and CSS specificity
- Style all elements of a particular HTML element on a web page
- Describe the difference between class and id selectors
- Apply styles to specific elements by selecting elements with classes and ids
- Differentiate between padding border and margin using the box model

## Opening Framing (3 min)
> Although some of this may be review from the prework, repetition is key to becoming a good programmer!

Wouldn't it be nice to make our webpages look schnazzy? Enter CSS. There is such a wide breadth of things to learn about CSS and honestly, you could probably teach a whole 12 weeks to understand all the capabilities, nuances and subtleties. So we'll only be scratching the surface with it, but I encourage you to experiment with CSS on your own. As you consistently use CSS you realize that it is both awesome and frustrating to utilize.

[family guy CSS gif](https://i.imgur.com/Q3cUg29.gif)

## In-line vs head vs stylesheets (30m)

At the crux of it all, the primary concept of CSS is to select an HTML element and then do something to it. IE. I want to take the body element, and I want to apply a background color to it.

Let's get started by creating a new html webpage that we'll call `index.html` in some working directory of your choosing:

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
</body>
</html>
```

So one way we can style elements in HTML is in the tag itself. These are called inline-styles:

```html
<p style="background:blue"></p>
```
Blech even just writing this out feels miserable. Why do you guys think I feel miserable about this?

### T & T (3m)
Knowing not too much about coding. Take a couple minutes and chat with your partner about why this particular way of styling an element might not be the greatest approach?

> Don't use inline styles if you can avoid it

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
> You've seen this before, but I want to highlight some syntax here. The p in this code is what's called the selector. The background  in the code is the property. Finally blue is the value.

This is a bit better. I feel less dirty. But feel weird about this one too. Why might that be? (ST-WG)


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

## CSS Specifi
[CSS Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
