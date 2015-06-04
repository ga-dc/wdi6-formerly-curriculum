# Fellowship of the Ring DOM Manipulation

Create a function for each of the following steps to practice DOM Manipulation and JavaScript. These should each be called in order after the window has loaded.

```
// Dramatis Personae

var hobbits = [
  "Frodo Baggins",
  "Samwise 'Sam' Gamgee",
  "Meriadoc \"Merry\" Brandybuck",
  "Peregrin 'Pippin' Took"
];

var buddies = [
  "Gandalf the Grey",
  "Legolas",
  "Gimli",
  "Strider",
  "Boromir"
];

```

## 1

```
var lands = ["The Shire", "Rivendell", "Mordor"];

function makeMiddleEarth(lands) {
    // create a section tag with an id of middle-earth
    // add each land as an article tag
    // inside each article tag include an h1 with the name of the land
    // append middle-earth to your document body
}

makeMiddleEarth(lands);
```

## 2
```
function makeHobbits(hobbits) {
  // display an unordered list of hobbits in the shire
  // give each hobbit a class of hobbit
}
```

## 3
```
function keepItSecretKeepItSafe() {
  // create a div with an id of 'the-ring'
  // add the ring as a child of Frodo
}
```

## 4

```
function makeBuddies(buddies) {
  // create an aside tag
  // display an unordered list of buddies in the aside
  // insert your aside before rivendell
}
```

## 5

```
function beautifulStranger() {
  // change the buddy 'Strider' textnode to "Aragorn"
}
```

## 6

```
function forgeTheFellowShip() {
  // move the hobbits and the buddies to Rivendell
  // create a new div called 'the-fellowship'
  // add each hobbit and buddy one at a time to 'the-fellowship'
  // after each character is added make an alert that they have joined your party
}
```

### Resources

- [dom reference](https://developer.mozilla.org/en-US/docs/DOM/DOM_Reference)
- [dom cheatsheet](http://christianheilmann.com/stuff/JavaScript-DOM-Cheatsheet.pdf)