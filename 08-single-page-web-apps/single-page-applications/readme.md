# Intro to Single Page Applications

## Learning Objectives

- Compare / contrast single page applications with traditional web applications
- Identify common problems with single page applications
- Explain the concept of deep linking and why it's useful
- Bootstrap an application at load
- Use the history api to update the url

## Opening / Framing

>Single Page Applications are Web apps that load a single HTML page
and dynamically update that page as the user interacts with the app. SPAs use AJAX and
HTML5 to create fluid and responsive web apps, without constant page reloads.

## You do: Compare / Contrast SPAs and TWAs

TWA is traditional web app.

Break into ~ 5 groups

- Gmail and [SquirrelMail](https://www.softaculous.com/demos/SquirrelMail)
- Slack.com and Slack web app
- Yelp.com and TripAdvisor.com
- Wordpress.com and Medium.com
- Facebook.com and LinkedIn.com

## Single Page Applications vs. Traditional Web Apps

- SPAs load one page on initial page load
  -  extra requests are done in the background
  -  no full page refreshes.
- TWAs are traditional Web 1.0
  - every request is a full page refresh and a browser repaint

Ultimately we are trying to create a more "native" experience for web-based applications.

## We do: Common problems with single page applications

### Bookmarking

Every web page has a URL. We link to pages via these URLs and bookmark them. Without relying on URLs, how
do we represent state in an application?

Trello is an excellent example of a SPA. Try clicking around on a few cards and
watch how the URL changes.

Question: Does every "state" of the application have a corresponding URL?

### Search Engine Optimization

How can Google index our content if the content is hidden behind event listeners and ajax requests?

- Serve a raw html version as well? https://cdnjs.com/libraries/backbone.js/tutorials/seo-for-single-page-apps
- Start with a fully funcional html app, and "progressively enhance"

### Analytics

Similar to the above, URL's are often the #1 indicator for collecting analytics (counting page views). How do measure
who is doing what when there's only one page load per person?

- https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications

### Progressive Enhancement vs Graceful degradation

Some users have JS disabled, or at least more recent features are unavailable. Should we build an app
that progresses as more features become available, or an app that degrades gracefully? (Like Gmail's this is taking a long time to load...)

- https://jakearchibald.com/2013/progressive-enhancement-still-important/

How do we reflect this new state?

## Deep Linking

Let's say we wanted to share these results with others. How could we do that? 

Ask them to follow our steps exactly? 

Wouldn't it be nice if we could reflect the state of our application in the URL?

>In the context of the World Wide Web, deep linking is the use of a hyperlink that links to a specific, generally searchable or indexed, piece of web content on a website (e.g. "http://example.com/path/page"), rather than the website's home page (e.g. "http://example.com/").

A practical example of this is Trello's card detail view.

A common solution before HTML5 was to add a hash to the URL with `window.location.hash`

## HTML5 History API

Shameless plug, I actually wrote an article for CSS tricks on this! http://css-tricks.com/rethinking-dynamic-page-replacing-content

I was reading [this article](http://diveintohtml5.info/history.html) late one night and had the idea!

But seriously, the HTML5 history API allows us to manipulate the URL without a hash and without refreshing the page.

## We do: Dive into Dogs Local Setup

    git clone git@github.com:ga-dc/dive-into-dogs
    cd dive-into-dogs
    npm install
    nodemon

## You do: Ajaxify the Prev and Next Buttons

Setup event listeners for the previous and next buttons.

When the user clicks on either button, load the contents of the button's `href` attribute using `$.getJSON`

## We do: `history.pushState()`

https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history#Adding_and_modifying_history_entries

The HTML5 history api allows us to programatically manipulate the browser history with `history.pushState()`

```js
var stateObj = { user: "jesse" }
history.pushState(stateObj, "page 2", "profile.html")
```

It takes three arguments:

1. State object
  - useful for maintaining state (what does this mean?)
2. Title
3. Url
  - must be same origin

## You do: update the URL using `pushState()`

## We do: Handling Back and Forward Buttons

Currently, the back and forward buttons update the url but not the content on the page. 

We can set an event listener for a `popstate` event:

```js
window.addEventListener("popstate", function(event) {
  console.log(location.pathname)
}, false)
```

This event fires on page load, in addition to the back and forward clicks. We can prevent that
with a 1 second timeout

```js
setTimeout(function(){
  window.addEventListener("popstate", function(event) {
    console.log(location.pathname)
  }, false)
},1)
```

## You do: Handle back and forward buttons

### Bonus! 

Can you think of a way to load a list of all the images when the page loads?

i.e. no Ajax requests *or* full page refreshes.
