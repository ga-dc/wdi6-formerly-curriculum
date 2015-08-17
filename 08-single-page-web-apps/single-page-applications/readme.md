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

### Search Engine Optimization

How can Google index our content if the content is hidden behind event listeners and ajax requests?

### Analytics

Similar to the above, URL's are often the #1 indicator for collecting analytics (counting page views). How do measure
who is doing what when there's only one page load per person?

### Progressive Enhancement vs Graceful degradation

Some users have JS disabled, or at least more recent features are unavailable. Should we build an app
that progresses as more features become available, or an app that degrades gracefully? (Like Gmail's this is taking a long time to load...)

## We do: Boostrapping

"Bootstrapping" an application consists of loading *one* HTML file on the initial page load,
and letting the router load the correct state based on what is in the URL.

Let's create a new express app and hardcode some items to send on initial page load:

```js
app.get("/", function(request, response){
  response.sendFile(__dirname + "/app/views/index.html");
});
```

- Setup handlebars
- Find some sample gifs
- load into view
- create a form

## You do

- When the user searches for something, make a post request, update the view

How do we reflect this new state?

## Deep Linking

Let's say we wanted to share these results with others. How could we do that? 

Ask them to follow our steps exactly? 

Wouldn't it be nice if we could reflect the state of our application in the URL?

A common solution before HTML5 was to add a hash to the URL with `window.location.hash`

## HTML5 History API

Shameless plug, I actually wrote an article for CSS tricks on this! http://css-tricks.com/rethinking-dynamic-page-replacing-content

I was reading [this article](http://diveintohtml5.info/history.html) late one night and had the idea!

But seriously, the HTML5 history API allows us to manipulate the URL without a hash and without refreshing the page.

Here's what we're going to do:

1. When the user clicks, update the url
2. When the page loads, load the correct state.

## We do: `history.pushState()`

>history.pushState(null, null, "pizza.html")

Back and forward buttons

## You do: [FOLLOW EXAMPLE ON DIVEINTO SITE]



