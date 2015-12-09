# Foundation

Screencasts
- [Part 1](http://youtu.be/aLtWccm8Ayo)
- [Part 2](http://youtu.be/A9Mn2UoUW-k)

## Loaning Objections
- List 3 ways Foundation is different from Bootstrap
- Describe a situation in which using Foundation might be preferable to using Bootstrap, and a situation in which the reverse is true
- Explain what is meant by "breadcrumbs"
- Explain the concepts of graceful degradation and progressive enhancement.

## But first, some reading

[How to make your site look half-decent (for programmers, by a programmer)](https://24ways.org/2012/how-to-make-your-site-look-half-decent)

## What is "good design", anyway?

Some quick design tips:
- No more than 2 fonts. The exceptions is when you use a font for a logo or something else big and off by itself.
- Your fonts should either be exactly the same, or completely different. Otherwise you get into a sort-of "uncanny valley". A page with both Helvetica and Verdana looks really weird.
- Avoid black; use `#222`. Avoid white; use `#eee`.
- Use textured backgrounds. They make a page significantly easier on the eyes.
- If you find yourself with more than 3 `float`ing elements, you should probably do something differently. They're a pain in the butt to manage.
- 1 pixel of text-shadow can add a nice softening effect to text.
- Borderless is "in" right now.

### Graceful Degradation and Progressive Enhancement

[Straight from the W3](http://www.w3.org/wiki/Graceful_degradation_versus_progressive_enhancement):

> **Graceful degradation** is the practice of building your web functionality so that it provides a certain level of user experience in more modern browsers, but it will also degrade gracefully to a lower level of user in experience in older browsers.

> **Progressive enhancement** is similar, but it does things the other way round. You start by establishing a basic level of user experience that all browsers will be able to provide when rendering your web site, but you also build in more advanced functionality that will automatically be available to browsers that can use it.

**TLDR**: Make your browser look good for modern browsers, and then make tweaks so it looks good in your grandma's IE5... or do it the other way around. Pick one.

Foundation, Bootstrap, and pretty much every other major front-end libary or framework takes care of this for you.

In Foundation, you see Modernizr, which adds modern Javascript functionality to outdated browsers -- like `Array.indexOf()`.

This shouldn't be confused with Normalize, which makes sure your webpage -- before you've added any other CSS to it -- looks the same across all browsers by providing, for instance, a new default font and specific button styling.

## How's Foundation different from Bootstrap?

Wow. We get *way* more changes out-of-the-box.

Plus, we get some extras, like Modernizr, Normalize, Fastclick, and some jQuery plug-ins.

#### What is Modernizr?

Foundation also gives us some more explicit instructions in their documentation:

- They want us to name our custom stylesheet `app.css`
- They want us to include a `meta viewport` tag
- They want us to include Noramlize

...and who am I to disagree?

## Take 5 minutes to check out the kitchen sink

http://foundation.zurb.com/docs/components/kitchen_sink.html

#### What are your impressions?

## Take another 5 minutes to look at examples of Foundation in the wild

http://foundation.zurb.com/learn/website-examples.html

#### What do you think?

[Kelly Clarkson uses Foundation](http://www.kellyclarkson.com/us/), so it must be good!

## Foundation is definitely a framework

It's significantly more explicit than Bootstrap. It has to be: it's all about mobile-first development, which requires a lot of juggling in order to suit all mobile browsers' needs.

There are some visual cues to this end: the colors are much more vibrant than were Bootstrap's, and there are fewer gradients. This is to make things stand out more on a smaller screen that is likely surrounded by distractions.

All in all, foundation gives you comparatively little flexibility: things *have* to be set up a certain way.

#### Why would anyone want to use such a rigid framework?

Because, a la 1984, there's freedom in obedience. Rails requires you to write code in a specific way, but as a result, it does a lot of things for you that you'd otherwise have to worry about. Ditto for Foundation.

## Foundation also basically requires Javascript

Much of the Foundation functionality has to be explicitly linked in. That is: you have to explicitly link to the script for sidebar menus.

In order to make this Javascript work, you **must** include in your main Javascript file:

```js
$(document).foundation();
```

...and that's it. Unfortunately, the placement of this matters. It has to be run *after* everything else has finished loaded. So it needs to go inside `$(document).ready`, or in between `<script>` tags right at the end of your HTML as the last thing before `</body>`.

## Like Bootstrap

...it's got 12 columns.

Also like Boostrap, it has a lot of goofy terms:

- Off-canvas
- Magellan
- Breadcrumbs
- Orbit Slider
- Clearing Lightbox
- Flex Video
- Joyride

#### Take 5 minutes with your table partner to figure out what these are.

Breadcrumbs aren't a Foundation-specific thing at all.

## Unlike Bootstrap

...Foundation is intended to get you up and running ASAP. For instance, it comes with a "Pricing Table" module:

http://foundation.zurb.com/docs/components/pricing_tables.html

It also ships with a very handy form validator called Abide:

http://foundation.zurb.com/docs/components/abide.html

#### True or false: If you validate a form on the front-end, you don't really need to validate the form on the back-end.

False. Javascript validation can only be relied upon to give people notifications that they entered something incorrectly. Bypassing your validators is as easy as using "inspect element".

## Foundationify Grumblr

Checkout `master` to get the original Grumblr, create a new branch, and try adding in Foundation!

https://github.com/ga-dc/grumblr_css_redesign
