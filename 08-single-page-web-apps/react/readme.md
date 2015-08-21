## Learning Objectives

* Explain what ReactJS is.
* Explain the component model of web development.
* Create and render React components in the browser.
* Nest React components.
* Modify the state of a React component through events.

## What is ReactJS?

### Some History (10 / 10)
The first thing most people hear about React is "Facebook uses it."
* Recently went open-source.
* Born out of their frustration with the traditional MVC model and how.
  * Re-rendering something meant re-rendering everything (or just a lot).
  * That had negative implications on processing power and ultimately user experience, which at times became glitchy and laggy.
* So they found a creative way to tackle this that flips the Javascript MVC on its head and, in a way, shakes up everything you guys have learned about front-end web development in class so far.

Here's a taste of what React is all about: [https://www.youtube.com/watch?v=KVZ-P-ZI6W4&feature=youtu.be&t=510](https://www.youtube.com/watch?v=KVZ-P-ZI6W4&feature=youtu.be&t=510)  

### React in the MVC (5 / 10)
This week you were introduced to the Javascript MVC model.
* **React only concerns our "Views".**
  * What does "view" mean in Javascript? Compared to Rails?
  * Visual representations of our models - not the entire page.
* React can coexist with Models and Controllers. The user can set those up however they see fit.
* This means that React can also coexist with other Javascript frameworks.
  * Let them handle the models and controllers, and have React sort out the views.

# Housekeeping

Clone [this repo](https://github.com/ga-dc/react-inclass).
* Contains a simple Express server that we'll use in today's class.
* We need to include some React script files: `react.js` and `JSXTransformer.js`
  * Available as a download [here](http://facebook.github.io/react/downloads/react-0.11.2.zip).
  * Or available via CDNs [here](https://cdnjs.com/libraries/react/).


# Components

## Hello World: A Very Basic Component (10 / 20)

The basic unit you'll be working with in ReactJS is a **component**.
* It sounds like a simple word, but using "components" is a pretty different way of approaching web development.

Throughout class we have separated HTML, CSS and Javascript.
* With components, the lines between those three become a bit blurry.
* Instead, we organize our web apps according to small, reusable components that define their own content, presentation and behavior.
* Basically, everything we need is condensed into a small capsule.
* This'll become more clear as we start defining some components...

What does a component look like? Let's start with a simple "Hello World" example.

```js
<script type="text/jsx">
  /** @jsx React.DOM */

</script>
```

What is JSX?
> JSX is a XML-like syntax extension to ECMAScript without any defined semantics.

I'll explain JSX as we encounter it in our application.
* Just know for now that...
  * Our `script` tag needs a type of "text/jsx".
  * The content of `script` must begin with this pseudo-comment: `/** @jsx React.DOM */`

```js
var Hello = React.createClass({
  render: function(){
    return (
      <p>Hello world.</p>
    );
  }
})
```

1. `var Hello`
  * This is the component we're creating. In this example, we are creating a "Hello" component.

2. `React.createClass`
  * This is the React library method we use to create our component definition.
  * Takes an object as an argument.

3. `render`
  * Every component has, at minimum, a render method.
  * Generates a Virtual DOM node that will be added to the actual DOM.
    * What does a Virtual DOM node sound like it does?
    * Looks just like a regular ol' DOM node, but it's not yet attached to the DOM.
    * Instead, it acts as a staging area for changes that will eventually be implemented.
  * The contents of this node are defined in the method's return statement.
    * At the moment, this return value looks exactly like HTML. But it's not...

So we've created the template for our component. But how do we actually render it?

```js
var Hello = React.createClass({
  render: function(){
    return (
      <p>Hello world.</p>
    );
  }
})

// Many tutorials will use React.renderComponent, which has been phased out. Change outlined here: http://bit.ly/1E81Whs
React.render(
  <Hello />,
  document.getElementById( "container" )
);
```

`React.render` takes the Virtual DOM node created by `.createClass` and adds it to the actual DOM.
* Takes two arguments...
  1. The component.
  2. The DOM element we want to append it to.

What language is `<Hello />` written in? **JSX.**
* Similar to XML.
* JSX is an alternate syntax for Javascript that helps us visualize what a Virtual DOM node will look like.
  * React can actually be run without JSX.
  * When we say `<Hello />`, in plain Javascript we are actually saying `React.DOM.div( null, "Hello world.")`
    * Basically, a string of React methods that create a virtual DOM node.

## Hello World: A Little Dynamic (10 / 30)

Our `Hello` component isn't too helpful. Let's make it more interesting.
* Rather than simply display "Hello world", let's display a greeting to the user.
* How do we feed a name to our `Hello` component without hardcoding it into our render method?

```js
var Hello = React.createClass({
  render: function(){
    return (
      <p>Hello { this.props.name }</p>
    );
  }
});

React.render(
  <Hello name="Tony" />,
  document.getElementById( "container" )
)
```

In the above example, we replaced "world" with `{this.props.name}`  

What are `.props`?
* Properties! Every component has a `.props` property.
* Properties are immutable and cannot be changed while your program is running.
* We define properties in development and pass them in as attributes to the JSX element in our `.render` method.

We can create multiple properties for a component.

```js
var Hello = React.createClass({

  // render's return statement can only return one DOM element
  // You can, however, place multiple elements within the parent DOM element

  render: function(){
    return (
      <div>
        <p>Hello { this.props.name }.</p>
        <p>You are { this.props.age } years old.</p>
      </div>
    );
  }
});

React.render(
  <Hello name="Tony" age="21" />,
  document.getElementById( "container" )
)
```

## Exercise: A Blog Post (15 / 45)

Let's have some practice creating a React component for scratch. How about a blog post?
* Define a Post constructor that has the following properties:
  1. title
  2. author
  3. body
  4. comments
* Render these properties using a Post component.
* The HTML/CSS composition of your Post is up to you.

### Solution

[https://gist.github.com/amaseda/efeb9d6ee266f8fa3178](https://gist.github.com/amaseda/efeb9d6ee266f8fa3178)

## Nested Components (5 / 50)

What problems did you encounter when trying to add multiple comments to your Post?
* It would be a pain to have to explicitly define every comment inside of `<PostView />`, especially if each comment itself had multiple properties.
* The solution? **Nested components**.

We can nest Comment components within a PostView component
* We create these comments the same way we did with posts: `.createClass` and `.render`
* Then we can reference a comment using `<Comment />` inside of PostView's render method.

## Exercise: Add Nested Comments To Blog (10 / 60)

1. Create a `CommentView` component in the same way we did for `PostView`.
* Your `CommentView` render method should render a `commentBody` property.

2. Amend your `PostView`'s render method so that its return value generates three `<CommentView />` elements.
* Make sure to pass in the comment body as an argument to each component.

### Solution

[https://gist.github.com/amaseda/0eba4f73b1ec8073ea0a](https://gist.github.com/amaseda/0eba4f73b1ec8073ea0a)

## Break (10 / 70)

## State (15 / 85)

We already went over properties.
* The thing about properties is, you can't change them.
* What do we do about values that need to be changed after a component is rendered?
* That's where **state** comes in.

Values stored in a component's state are mutable attributes.
* Like properties, we can access state values using `this.state.val`
* Setting up and modifying state is not as straightforward as properties. Requires multiple methods

Lets implement state in our earlier `Hello` example by incorporating a counter into our greeting.

```js
var Hello = React.createClass({

  // We need to define the initial values of our state using `getInitialState`.
  // It returns an object with the initial state values.
  getInitialState: function(){
    return {
      // We are passing in a new `count` property, which we will initialize in `React.render`
      counter: this.props.count
    }
  },

  render: function(){
    return (
      <div>
        <p>Hello { this.props.name }.</p>
        <p>You are { this.props.age } years old.</p>

        // We can reference state values just like props using `this.state.val`
        <p>It is {this.state.date}</p>
      </div>
    );
  }
});

// NOTE: We initialize a count property below at 1.
React.render(
  <Hello name="Tony" age="21" count="1"/>,
  document.getElementById( "container" )
)
```

Ok, we set an initial state. But how do we go about changing it?
* We need to set up some sort of trigger event to change our counter.
* How about a button? Where should we initialize it?

```js
var Hello = React.createClass({

  getInitialState: function(){
    return {
      counter: this.props.count
    }
  },

  raiseCounter: function(){
    this.setState({
      counter: parseInt(this.state.counter) + 1
    })
  },

  render: function(){
    return (
      <div>
        <p>Hello { this.props.name }.</p>
        <p>You are { this.props.age } years old.</p>
        <p>I have said hello {this.state.counter} times.</p>
        <button onClick={ this.raiseCounter }>Again.</button>
      </div>
    );
  }
});

React.render(
  <Hello name="Tony" age="21" count="1"/>,
  document.getElementById( "container" )
)
```

Whenever we run `.setState`, our component "diff's" the current DOM, and compares the Virtual DOM node with the updated state to the current DOM.
* Only replaces the current DOM with parts that have changed.
* This is super important! Using React, we only change parts of the DOM that need to be changed.
  * Implications on performance.
  * We **do not** re-render the entire component like we have been in class.

## Exercise: Implement State (10 / 95)

Let's create a state for our earlier blog example. We want to be able to edit the body of our post.

1. Initialize a state for our PostView. It should save a value for post body.
2. Create a method inside your PostView component definition that sets state to a new value.
  * Keep it simple: have your method generate a prompt through which you can create a new PostView body.
3. Create a button that triggers the above function.

### Solution

[https://gist.github.com/amaseda/0118e488caad10030e6d](https://gist.github.com/amaseda/0118e488caad10030e6d)

## What's Next? (5 / 100)

* [Events](https://facebook.github.io/react/tips/dom-event-listeners.html)
* [Forms](https://facebook.github.io/react/docs/forms.html)

## Questions / Closing (5 / 105)

Having learned the basics of React, what are some benefits to using it vs. a different framework or plain ol' Javascript?
* Clear HTML structure of rendered components.
* Nicely compartmentalized properties via props and state.
* Easily pass in values from model to view.
* Swift rendering of update state values.

## Additional Reading

* [React DC (Meetup)](http://www.meetup.com/React-DC/)
* [React Tic-Tac-Toe (by Jesse Shawl)](https://github.com/jshawl/react-tic-tac-toe)
