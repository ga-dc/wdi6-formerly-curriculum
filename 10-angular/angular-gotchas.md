# So you're getting an Angular error?

Here are some common reasons:

## IIFEs are missing trailing parentheses
```js
(function(){
  // This is good
}())

(function(){
  // This is good
})()

(function(){
  // This is bad
})
```

## Using curlies where you need parentheses
```js
someState({id: 42})
// This is good

someSTate{{id: 42}}
// This is bad
```

## Dependencies not being inside an array
```js
angular
.module("myModule", [
  "ngResource"
]);
// This is good

angular
.module("myModule", []);
  "ngResource"
// This is bad
```

## Writing `ui-router` instead of `ui.router`

## Missing `<script>` tags for some of your `.js` files
Every `.js` file should have a `<script>` tag in your main `index.html`

## Script tags aren't closed
```html
<script></script>
<!-- This is good -->

<script />
<!-- This is bad -->

<script>
<!-- This is bad -->
```

## Missing a `<script>` tag for a library
`ui.router` needs to be loaded from a CDN

## `<script>` tags in the wrong order
1. Libraries come first (`angular.min.js`, `angular-resource.js`)
- Your main `app.js`
- Your first submodule (`grumbles.js`)
- Factories and services
- Controllers

## Not having caching disabled in Chrome
![Caching disabling gif](http://i.imgur.com/p2TZixz.gif) 
