---
title: Writing Custom Directives
type: Lesson
duration: "1:25"
creator:
    name: Micah Rich
    city: LA
competencies: Front-end MV*
---

# Writing Custom Directives

### Objectives
- Describe the different types of custom directives available
- Create a custom directive
- Explain why custom directives are valuable

### Preparation

*Before this lesson, students should already be able to:*

- Describe Angular directives

## Custom Directives - Intro (10 mins)

As you've seen by now, a huge amount of the code you work with in Angular are directives. Angular was designed to be an extension of HTML - a way to have custom-defined interactive tags of your own making.

While we've been getting good at using the directives that come with Angular, it's time to start seeing what we can do if we start making some up.

One of the most obvious _uses_ of this is when you've got repetitive code to render some information or data. If you're using a bunch of tags all over the place, it's a simple DRY principle – you might forget a tag or decide to change something and have to change it in a million places.

By extracting it to a custom directive, we can just reference that directive whenever we need to use it and not worry about repeating the code to render it.

#### Real World Example

As an example, we're going to mess around with duplicating something that's becoming a common pattern in interface design – the concept of a card. Applications like Twitter, Pinterest, Facebook, and a lot more are moving towards this design pattern.

<img width="571" alt="Twitter" src="https://cloud.githubusercontent.com/assets/25366/9665317/4f8a5e56-5224-11e5-9b9c-fe62d8a6cdf4.png">

Everyone's favorite CSS framework, Bootstrap, is even on board, where in [version 4+ you're able to create a card](http://v4-alpha.getbootstrap.com/components/card/) with just some CSS classes:

<img width="346" alt="Bootstrap" src="https://cloud.githubusercontent.com/assets/25366/9665376/c2bcac6c-5224-11e5-8e4c-807a19a4432a.png">

Let's see if we can make something similar, wrapped up in our own custom HTML element.

## Know The Code - Independent (5 mins)

Take five minutes and inspect our starter code. You'll see a pretty normal Angular app, and since we're repeating using those cards, and there's a few consistent tags we're repeating every time we render a card, we're going to experiment with making those cards a custom-defined directive.

<img width="965" alt="Cards Against Assembly" src="https://cloud.githubusercontent.com/assets/25366/9666972/05a2f348-522e-11e5-8f6c-7c503032eff4.png">


## Building a Simple Directive - Codealong (15 mins)

Using our starter code, our goal is to take:

```html
<div class='card'>
  <h4 class="card-title">{{card.question}}</h4>
  <h6>Cards Against Assembly</h6>
</div>
```

and end up with a reusable `<card></card>` component, maybe something like:

```html
<card question="{{card.question}}"></card>
```

### Let's be organized!

Rather than just throw this wherever, let's make a file dedicated just to that function. Clean code, yo.

```
touch js/cardView.js
```

Of course, it could be named anything, but it's sort of a view, and it's definitely a card, so `cardView` felt right. Up to you.

#### Directives are as easy as...

Just like controllers, factories, anything else we've made in angular, the first line is a simple extension of `angular`:

```js
angular.module('CardsAgainstAssembly')
  .directive('card', cardView);
```

An important thing to point out: The first argument is the name of the directive and how you'll use it in your HTML; and remember, Angular converts `camelCase` to `snake-case` for us, so if you want to use `<secret-garden></secret-garden>` in your HTML, name your directive `.directive('secretGarden', myFunctionIHaventMadeYet)`.  Remember, in the official Angular docs it's called `ngClass` or `ngRepeat`, but in your HTML you use `ng-class` and `ng-repeat`.

#### Let's make a function!

Now, we obviously need a function named `cardView`!

```js
function cardView(){
  var directive = {};
  return directive;
}
```

Nothing fancy yet - we're just constructing an object. We'll put some specifics in there now, but that's simple so far.

## Directive Options - Codealong (30 mins)

You've got a couple interesting options when making your own directives. We'll go through them all, quickly, and you can play with them on your own in a bit.

1. `directive.restrict`
2. `directive.replace`
3. `directive.template/templateUrl`
4. `directive.scope`

#### 1. `directive.restrict`

While the name isn't obvious, the `restrict` option lets us decide what _kind_ of directive we want to make. It looks like this:

```js
directive.restrict = 'EACM';
```

- `E` is element. An HTML element, like `<card></card>`
- `A` is attribute. Like `<div card="something"></div>`
- `C` is class. Like `<div class="card"></div>`
- `M` is comment. Like `<!-- directive: card -->`

You can choose to have just one, all of the above, or any combination you like. You should steer towards elements & attributes as much as possible, though – classes can get messy with other CSS classes, and comments could just end up weird if there isn't a good reason for it.

For ours, let's play with just an element.

```js
function cardView(){
  var directive = {};
  directive.restrict = 'E';
  return directive;
}
```

#### 2. `directive.replace`

Replace is pretty straightforward. Should this directive replace the HTML? Do you want it to get rid of what's in the template & swap it out with the template we're going to make? Or add to it, and not remove the original. For example, replacing would mean:

```html
<div ng-repeat="card in cards.all" >
  <card></card>
</div>
```

Would actually render as:

```html
<div ng-repeat="card in cards.all" >
  <div class='card'>
    <h4 class="card-title">{{question}}</h4>
    <h6>Cards Against Assembly</h6>
  </div>
</div>
```

See, replaced. Let's say we like that for our example:

```js
function cardView(){
  var directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  return directive;
}
```

#### 3. `directive.template/templateUrl`

This is where our partial view comes in. Now, if it's a pretty tiny, self-contained directive, you can use `directive.template="Some javascript " + string + " concatenation";`

But that easily starts getting ugly, so it's often better (even for small directives like this) to make a quick little partial HTML file and reference it with `directive.templateUrl=` instead.

Let's extract our existing card tags, and throw them in a partial. Cut out:

```html
<div class='card'>
  <h4 class="card-title">{{card.question}}</h4>
  <h6>Cards Against Assembly</h6>
</div>
```

Quickly `touch _cardView.html` or some similarly obvious-named partial, and paste it back in.

```html
<!-- app/_cardView.html -->
<div class='card'>
  <h4 class="card-title">{{card.question}}</h4>
  <h6>Cards Against Assembly</h6>
</div>
```

In `js/cardView.js`, we can add our option:

```js
function cardView(){
  var directive = {};

  //'A' == attribute, 'E' == element, 'C' == class
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl =  "_cardView.html";

  return directive;
}
```

And lastly, in our `index.html`, let's finally use our custom directive. So exciting. This is it. Here we go.

```html
<!-- index.html -->
<div class='col-sm-6 col-md-6 col-lg-4' ng-repeat="card in cards.all" >
  <card></card>
</div>
```

TRY IT! So awesome! We've now got this much more readable `index.html`, with a _very_ semantic HTML tag describing exactly what we want rendered.

<img width="965" alt="Cards Against Assembly" src="https://cloud.githubusercontent.com/assets/25366/9666972/05a2f348-522e-11e5-8f6c-7c503032eff4.png">

This is awesome. This is a great, reusable component. Except for _one_ thing.

#### 4. `directive.scope`

If you notice, our template uses ``{{card.question}}`` inside it. This obviously works perfectly - we're geniuses. But what if we wanted to render a card somewhere outside of that `ng-repeat`, where `card in cards.all` isn't a thing. What if we want to render a one-off card, reusing our awesome new directive elsewhere? Isn't that part of the point?

It sure is. We're lacking a precise scope.

Just like controllers, we want to define what our scope is. We want to be able to say "Render a card, with these details, in whatever context I need to render it in." A card shouldn't rely on a controller's data to know what information to render inside it. The controller should pass that data to our directive, so it's freestanding and not relying on anyone but itself.

That's where `directive.scope` comes in, and this lets us decide what attributes our element should have! For example, in our card example, maybe we want to render a card with just a string somewhere outside of this controller. We want to make our own card with our own hardcoded text.

Try this. In your `index.html`, adjust our `<card>` element to say:

```html
<card question="{{card.question}}"></card>
```

In context, you'll see that the `ng-repeat` is giving us the variable `card`, and we're actually just rendering that out as a string. But we've decided we want to have an attribute called `question` to pass data through. We made that up, it's appropriate to our example, but it can be anything.

There are only two other pieces we need to make this reality.

In our `_cardView.html` partial, let's adjust to:

```html
<div class='card'>
  <h4 class="card-title">{{question}}</h4>
  <h6>Cards Against Assembly</h6>
</div>
```

No longer reliant on a variable named `card`, it's now just reliant on an element having the attribute of `question`.

And finally, in `js/cardView.js`:

```js
angular.module('CardsAgainstAssembly')
  .directive('card', cardView);

function cardView(){
  var directive = {};

  //'A' == attribute, 'E' == element, 'C' == class
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl =  "_cardView.html";
  directive.scope = {
      question: '@'
  };

  return directive;
}
```

In `directive.scope`, we just define an object. The key is whatever want the attribute on the element to be named. So if we want `<card bagel=""></card>`, then we'd need a key named `bagel` in our scope object.

#### The Different Types of Scope for a Directive
The _value_ is one of 3 options.

```js
directive.scope: {
  ngModel: '=',     // Bind the ngModel to the object given
  onSend: '&',      // Pass a reference to the method
  fromName: '@'     // Store the string associated by fromName
}
```

The corresponding options would look like:

```html
<div scope-example ng-model="to" on-send="sendMail(email)" from-name="ari@fullstack.io" />
```

The `=` is a mechanism for binding data that might change; the `&` is for passing a reference to a function you might want to call; and the `@` is simply storing a string & passing it through to the template.

#### Since we've decided to use `@`/strings, let's try it!

Our last test is to see if we can make a card using just a hardcoded string. Then we'll know our card is really reusable.

Somewhere _outside_ the context of the controller, let's say just above the footer in our `index.html`, throw a handmade card in:

```html
<!-- ... -->
</section>
<hr/>
<card question="Why is Angular so awesome?"></card>
<footer>
<!-- ... -->
```

<img width="965" alt="Custom Card" src="https://cloud.githubusercontent.com/assets/25366/9668827/a352dbf8-5238-11e5-8d00-80ccf02ca95c.png">

Would you look at that? Our own custom directive - a reusable, semantic HTML component that we designed ourselves.

## Independent Practice (15 minutes)

Now, while we dove pretty deep into explaining each part, you can see it's really just a combination of quickly defining a custom directive, what options you want, making a template, and then _using_ it.

For practice, let's break up into pairs and make something extra.

If you didn't notice, there's some extra code included in your starter `index.html`:

```html
<header class='navbar'>
  <h1 class='pull-left'>Cards Against Assembly</h1>

  <scores></scores>
</header>
```

Our goal is to craft a custom directive to show off our players scores, like so:

<img width="965" alt="Scores" src="https://cloud.githubusercontent.com/assets/25366/9669340/3b316dc0-523b-11e5-8e7d-036a8a140d7e.png">

As a pair, build a custom directive that makes use of the `playersController` included in your starter code, listing out each player & their score, built as a custom `<score></score>` directive.

You have 15 minutes! Go!

## Conclusion (5 mins)
- Where can you imagine using custom directives?
- What four types of directives can you make?
- How do you pass information into a custom directive?
