# CSS Transitions & Animations

- Describe the importance of prefixing CSS properties
- Describe what a CSS transform is, and give some examples
- Describe what it means to transition or animate in CSS
- List the types of properties that can / can't be animated
- Use the `transition` declaration to change element properties on events
- Describe the purpose and syntax of css `keyframes`
- List and describe the purpose of the `animation` properties
- Compare & contrast CSS Transitions and Animations
- Create complex animations using CSS animation properties
- Compare & contrast using CSS and JS for animations

## Intro (10 minutes)

Today we'll be covering 3 major topics, each somewhat related:

* CSS Transforms (2D)
* CSS Transitions
* CSS Animations
* Prefixing

**Transforms** are a set of CSS properties that take a an element and transform
it's shape, e.g. rotating it, scaling it, skewing it, etc.

**Transitions** let us tell the browser how to change a property over time. For
example, if the height of an element changes (due to a :hover selector, for
example), we can tell the browser to change the height gradually over 1 second.

**Animations** are similar to transitions, in that they let us have properties
change over time, but they give us more control over how those changes happen.
For example, we have more control over how the animation repeats, change between
multiple values at once, etc.

**Prefixing** - If you're using chrome, you won't need to prefix any properties
for this lesson, but in general, it's a good idea to check [Can I Use](caniuse.com)
to see if you need to use prefixes to support most users. For CSS Animations,
you should use prefixes to ensure support for Safari, IE, and other browsers.

The easiest way to do this is with [prefix free](http://leaverou.github.io/prefixfree/).

## Group Breakouts (50 minutes)

Breakout into groups of 4... each group will have 20 minutes to prepare a short
explanation / demo of their assigned topic. Your demos should take **no longer than
5 minutes**.

| Group | Topic                                              |
|-------|----------------------------------------------------|
| 1     | CSS Transforms (No animation)                      |
| 2     | CSS Transitions                                    |
| 3     | CSS Animations (basic keyframes and syntax)        |
| 4     | CSS Animations (timing functions)                  |
| 5     | CSS Animations (iterations / repeats / direction ) |

## Break (10 minutes)

## Lab (50 minutes)

Work with a partner to implement as many of these exercises as you can:
* [CSS Accordion](https://github.com/ga-dc/css-accordion)
* [DolphinCat!](https://github.com/ga-dc/dolphin-cat-css-animations)
* [Clock](https://github.com/adambray/clock-bro)

### Bonuses

Look at the following examples, try to re-create them from scratch using as little
starter code as possible.

* [Animated Buttons](http://tympanus.net/Tutorials/AnimatedButtons/index.html) (Transitions and Animations)
* [Image Hover Effects](http://tympanus.net/Tutorials/OriginalHoverEffects/) (Transitions and Animations)
* [Solar System in CSS](http://neography.com/journal/our-solar-system-in-css3/) (Transitions and Animations)

## Break (10 Minutes)

## Questions / Recap  (20 minutes)

### CSS / JS Animations

CSS Animations are easy and mostly compatible, so they're often a good choice
for basic animation needs. For anything more complex, such as animation that
depends on user input, you'll need to use Javascript. There are good libraries
for animation, including jQuery UI, and [GSAP (Greensock Animation Platform)](http://greensock.com/gsap)
