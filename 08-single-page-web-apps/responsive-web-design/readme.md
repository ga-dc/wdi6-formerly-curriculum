# Responsive Web Design

## Learning Objectives

- Explain the difference between a responsive website and a mobile-specific website.
- Compare mobile-first to desktop-first responsive design
- Use media queries to adjust styles for different viewport sizes.
- Identify and use relative units like `em`, `rem`, `vh`, `vw`, etc..
- List the different media query values and their conditions.
- Use the iOS simulator, Safari console, and Chrome Dev tools to debug responsive CSS.

## Opening (5 min)

Ultimately we are trying to answer the question:

>How do we build web applications and sites for an optimal interaction experience on a multitude of devices?

### How we got here

In the beginning, there was no CSS. Every site looked nearly identical. As styling web pages became more common,
developers began structuring their pages with table layouts and fixed-width CSS.

Many designers still ask

>What are the most common dimensions for a website design?

## You tell me! http://screensiz.es (5 min)

## You do: Turn and Talk (10 min)

What makes a design fixed? What makes a design fluid? What makes a site responsive?

Check out [mediaqueri.es](http://mediaqueri.es) for inspiration.

## Mobile Specific Sites (5 min)

One way to create optimal experiences for mobile users is a dedicated mobile site.

You know you're on one when you see `m.` in the url!

Compare https://m.ups.com with https://ups.com

![](http://imgs.xkcd.com/comics/server_attention_span.png)

Avoid these... please.

## The Three Components of Responsive Web Design (10 min)

1. Flexible (or Fluid) Grids
1. Flexible Images (or Media)
1. Media Specific Layouts

## Flexible Grids

A grid based layout which adjusts with screen size.

Coming soon to a lesson near you.

## Flexible Images

We need images that fit their containers.  
It turns `max-width: 100%` is the answer.  Most of the time.  For any media.

Even as our flexible container resizes, shrinking or enlarging our image, the image’s aspect ratio remains intact.

```css
img,
embed,
object,
video {
  max-width: 100%;
}
```

## Media Queries

One way to adjust the styles depending on the device's size is by using media queries:

```css
body{
  background: papayawhip;
}

@media (max-width: 400px){
  body{
    background: tomato;
  }
}
```

Using media queries, we can group our css rules according to the size of our expected viewing devises.  This media query says, if our viewport is less than 400px, use the following css rules.

The 400px corresponds to the device's viewport.  A device's viewport is different from both its screen size and resolution.  Check out [this article](http://www.quirksmode.org/mobile/viewports.html) if you're interested in why.

Other possible values include

```
/* these are most commonly used */
min-width | max-width | min-height | max-height

/* these are possible, but less common */
| width | height
| device-width | min-device-width | max-device-width
| device-height | min-device-height | max-device-height
| aspect-ratio | min-aspect-ratio | max-aspect-ratio | max-device-aspect-ratio
| device-aspect-ratio | min-device-aspect-ratio |
| color | min-color | max-color
| color-index | min-color-index | max-color-index
| monochrome | min-monochrome | max-monochrome
| resolution | min-resolution | max-resolution
| scan | grid
```

## You do: Media Queries (15 min)

### Step 1

Working with the example above, create a [jsfiddle](https://jsfiddle.net/), [codepen](http://codepen.io/pen/), or [webpage](http://justinjackson.ca/words.html) that includes at least two media queries.

When the viewport is less than 800px wide, make the background yellow. When the viewport is less
than 400px wide, make the background green.

![](https://dl.dropboxusercontent.com/s/o8xh3hdql9oijo2/mediaqueries.gif?dl=0)

### Step 2

Try out a few of the properties above. You can combine media queries to get several different results.

i.e. what combination of media queries could produce the following grid as the viewport [changes size](http://maximin.tv/srm/)?

| green     | yellow | red    |
|-----------|--------|--------|
| turqouise | green  | purple |

[Like this.](http://recordit.co/UfnuMHQbWa)

### Media Query Logical Operators

You should have just seen these in your research.

Q. How do we "and" two media queries?
---

> A. The "and"  clause

```css
@media (min-width: 700px) and (orientation: landscape) { ... }
```


Q. How do we "or" two media queries?
---

> A.  Comma separated List

```css
@media (min-width: 700px), handheld and (orientation: landscape)
```

Q. What does the "not" keyword do?
---

> A. Applies to the whole media query and returns true if the media query would otherwise return false (such as monochrome on a color display or a screen width of 600px with a min-width: 700px feature query).  [See more here](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#not)


## Mobile first vs Desktop first

Q. What is the difference between starting with the smallest viewport and applying styles as the viewport size increases
and starting with the largest viewport size as the default?
---

> A. See below.

Q. Do the order of the media queries matter?
---

> A. Yes.

Q. Do media queries affect specificity?
---

> A. No.

[Read more](https://css-tricks.com/logic-in-media-queries/)
## Break (10 min)

## Relative units of measurement

So far, we've been working with pixels (absolute unit of measurement) and percentages (relative unit of measurements)

### You do: Research the following units (30 min)

Form groups with your tables to research, discuss (15 min), and demo one of the following pair:

- em and rem
- vh and vw
- vmin and vmax
- ex and ch

## You do: Convert the "Craigslist Grid" (15 min)

https://github.com/ga-dc/craigslist_grid

## Break (10 min)

## You do: 007 Exercise (20 min)

https://github.com/ga-dc/responsive_007

## We do: Check it out w/ Chrome dev tools (15 min)

Be sure to include

```html
<meta name="viewport" content="width=device-width">
```

>Mobile Safari introduced the "viewport meta tag" to let web developers control the viewport's size and scale. Many other mobile browsers now support this tag, although it is not part of any web standard.  This setting makes the width of the browser’s viewport equal to the width of the device’s screen.


## Questions

1. What are the three components of responsive web design?
2. How do we "and" two media queries?
3. What is the name of the design pattern where the initial designs support mobile, then we move to larger devices?

## Cheatsheet:

- Sizes, sizes, and more sizes
- fluid media: `img, embed, object, video { max-width: 1 };`
- `@media (max-width: 400px) { ... }`
- min/max-width, min/max-height
- And: `@media (max-width: 400px) and (orientation: portrait) { ... }`
- Or (comma separated): `@media (min-width: 700px), handheld and (orientation: landscape) { ... }`

## Resources

- The post that introduced us to [responsive web design](http://alistapart.com/article/responsive-web-design)
- http://screensiz.es
- http://mediaqueri.es
- Media Query [Logical Operators](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Logical_operators)
- [Viewports](http://www.quirksmode.org/mobile/viewports.html)
- Book: Responsive Web Design, Ethan Marcotte
