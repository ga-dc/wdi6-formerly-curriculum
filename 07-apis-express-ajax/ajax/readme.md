# Ajax

## Screencasts
- [ajax 1](https://youtu.be/K4zRqJm7sXU)
- [ajax 2](https://youtu.be/WoA5LnPXWB8)
- [ajax 3](https://youtu.be/3xUy5QmrBuc)

## Learning Objectives
- Explain the difference between synchronous and asynchronous program execution
- Explain why synchronous program execution is not conducive to the front-end.
- Use jQuery `$.ajax()` method to make asynchronous GET requests for data.
- Use jQuery's 'promise-like' methods to handle AJAX responses asynchronously.
- Render new HTML content using data loaded from an Ajax request.
- Perform POST, PUT, and DELETE requests to an API to modify data.

## Opening Framing (5/5)

### PKI -
Let's list out some technologies we've learned in this class thus far.

That is a tremendous amount of stuff. In the first couple of weeks we learned how to style a semantically structured HTML site with the ability to manipulate the DOM. In the past couple weeks or so, we've been learning a lot about server-side requests and responses. Today we'll be tying these concepts together. Currently we know how to create applications with full CRUD on models in our database, and that's great. When we do that CRUD, however, it requires a page reload of some kind. It would be really nice if had some functionality on the client side of our application but still communicate with the backend without a page refresh. If only we had a client side language that was non blocking and asynchronous...

(ST-WG) Think back to the first couple weeks of class, whats the difference between synchronous and asynchronous program execution? More importantly, what kind of things can we do with non blocking asynchronous program execution?

### T & T (10/15)
Let's look at Google Maps. How would this site work with things not happening asynchronously?

Turn and talk to you neighbor, why might synchronous programming not be effective for the front end? Consider how http requests work within your rails application.

We don't want to sit around and wait for code to execute before we load the rest of our script. It would be really nice if we could just describe what we want to happen when the code finally does execute, in a callback.


## `$.ajax`- JSON (10/25)

For the first part of this lesson we'll be using the [Weather Underground API](http://www.wunderground.com/weather/api/d/docs). **Follow the link and sign up for a key.**

Once you're ready, follow this link. Check out the example in the middle of the page. You'll see a URL   that looks something like: `http://api.wunderground.com/api/your_key/conditions/q/CA/San_Francisco.json`
> Replace `your_key` with your actual key and visit that URL.
> If you're using the key provided in the lesson plan, we only have a rate limit of 500 so please don't over use!

You should see a really gigantic object/hash. It can be really intimidating at first. But let's just start clicking around till we find some information we might want to display.

Turns out, we can actually access this JSON object using Javascript!
> JSON stands for Javascript Object Notation. JSON can come in a bunch of different ways. But at the end of the day, it's just an object/hash.

## `$.ajax` (25/50)
The jQuery library gives us access to this awesome thing called "Asynchronous Javascript and XML" (AJAX). With the help of AJAX we can do server side requests asynchronously on the client without having to send an actual browser request that reloads the page.

With AJAX we can make the usual HTTP requests: 'GET' 'POST' 'PUT' 'PATCH' 'DELETE'. Let's give that a shot.  

The first thing we'll do is create the files we need for this application...  

```bash
$ mkdir wunderground_ajax
$ cd wunderground_ajax
$ touch index.html
$ touch script.js
```

Let's give `index.html` a `<head>` that links to both jQuery and our script file...  

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <h1>hello</h1>
  <script src="https://code.jquery.com/jquery-2.1.4.js"></script>
  <script src="script.js"></script>
</body>
</html>
```
> AJAX is given to us through the jQuery library.

Let's go ahead and make our first AJAX `GET` request in our `script.js`...

```js
$(document).ready(function(){
  $("h1").on("click", function(){
    var url = "https://api.wunderground.com/api/f28a93cae85945b6/geolookup/conditions/q/va/midlothian.json"
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
      // $.ajax takes an object as an argument with at least three key-value pairs...
      // (1) The URL endpoint for the JSON object.
      // (2) Type of HTTP request.
      // (3) Datatype. Usually JSON.
    }).done(function(){
      console.log("Ajax request success!")
    }).fail(function(){
      console.log("Ajax request fails!")
    }).always(function(){
      console.log("This always happens regardless of successful ajax request or not.")
    })
  })
})
```
> This is kind of similar to when we used HTTParty synchronously on the back-end!

> You'll notice there are 3 functions that are tacked onto the AJAX call. These are known as promises. Promises are just callbacks that may or may not happen. A promise represents the future result of an asynchronous operation. In the `.done()` promise if that ajax is executed successfully, the block of code inside it will execute. In the `.fail()` promise, if that ajax is not executed successfully, the block of code inside it will execute. In the `.always()` promise, code block inside will always occur regardless of the ajax's success.

But how do we go about accessing that big JSON object we saw before? By passing in an argument to the anonymous function callback. The `$.ajax` call returns a response that you can then pass in as an argument to the promise.

```js
// `response` contains the actual response from the ajax call.
.done(function(response)(){
  console.log(response)
})
```

We can drill through this response just like any other JS object.

```js
// Note that we use traditional Javascript object notation to access the response.
.done(function(response)(){
  console.log(response.current_observation.temp_f)
})
```

## YOU DO: DOM Manipulation Using Response Data (10/60)

Take our existing code for the the weather underground app. Instead of logging the temperature, the `.done()` promise should create a div with the current wind speed in mph.  

### Bonus
  1. Create an input text field for City and State in the HTML.  
  2. Have the endpoint url change dynamically based on user input to generate a div about current weather in that area.  

## Break (10/70)

## Intro: AJAX and CRUD (5/75)
So we've used AJAX to do an asynchronous `GET` request to a 3rd party API. More often than not, 3rd party API's are usually read only. They probably don't want just anyone to be able to update the weather however they want. That is not to say that kind of functionality doesn't exist, we just don't have access to it.

It just so happens we've built a new Rails API where we can do full CRUD with AJAX. Go ahead and fork and clone [this repo](https://github.com/ga-dc/tunr_ajax).

Once you've cloned the repo, `cd` into it and run the usual commands...

```bash
$ bundle install
$ rake db:create db:migrate db:seed
```

We can now use `$.ajax()` to make asynchronous HTTP requests to our Tunr app! Let's go ahead and create a new Artists controller action and corresponding view: `test_ajax`

## Setting up a view to test AJAX with (10/85)
Let's update our routes in `config/routes.rb` for a new route to test all of our AJAX calls in:

```ruby
get '/test_ajax', to: 'artists#test_ajax'
```

in `app/controllers/artists_controller.rb`:

```ruby
# We're just creating this so we can test AJAX on a separate view, test_ajax.html.erb.
def test_ajax
end
```

Create `app/views/artists/test_ajax.html.erb` and place the following content:

```html
<div class="test_ajax_get">AJAX GET!</div>
<div class="test_ajax_post">AJAX POST!</div>
<div class="test_ajax_put">AJAX PUT!</div>
<div class="test_ajax_delete">AJAX DELETE!</div>
```

We're just going to add a quick event listener to this div inside `app/assets/javascripts/application.js`:

```javascript
$(document).ready(function(){
  $(".test_ajax_get").on("click", function(){
    alert("clicked!");
  })
})
```

## AJAX GET (5/90)
Great, everything's working. Let's try doing a `GET` request to our API like we did with the Weather underground API. In `app/assets/javascripts/application.js`:

```javascript
$(document).ready(function(){
  $(".test_ajax_get").on("click", function(){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "http://localhost:3000/artists"
    }).done(function(response) {
      console.log(response);
    }).fail(function(response){
      console.log("Ajax get request failed.");
    })
  })
})
```

> If we access the response object, we can see all of the artists that were seeded in the database. Inside the done promise, we can interact with and display all the contents of the response.

## Setup for AJAX POST (10/100)
Lets update our view to include some input fields and all of our existing artists in `app/views/artists/test_ajax.html.erb`:

```html
<!-- div attached to event handler -->
<div class="test_ajax_get">AJAX GET!</div>

<!-- form for ajax post and put request -->
<label>Name:</label>
<input class="name" type="text">
<label>Photo_url:</label>
<input class="photo_url" type="text">
<label>Nationality:</label>
<input class="nationality" type="text">

<!-- divs attached to event handlers -->
<div class="test_ajax_post">AJAX POST!!</div>
<div class="test_ajax_put">AJAX PUT!!</div>
<div class="test_ajax_delete">AJAX DELETE!!</div>

<h1>Artists</h1>
<ul class="artists">
  <% @artists.each do |artist| %>
    <li>
      <a href="/artists/<%= artist.id %>">
        <%= artist.name %>
      </a>
    </li>
  <% end %>
</ul>

```
> Now we're listing all the artists in this view. We've also included an HTML form we'll use soon to generate new artists.

## AJAX Post (10/110)
Let's try and create an artist using AJAX. Let's update our `app/assets/javascripts/application.js`...

```javascript
$(".test_ajax_post").on("click", function(){
  $.ajax({
    type: 'POST',
    data: {artist: {photo_url: "www.google.com", name: "bob", nationality: "bob"}},
    dataType: 'json',
    url: "http://localhost:3000/artists"
  }).done(function(response) {
    console.log(response);
  }).fail(function(response){
    console.log("Ajax get request failed");
  })
})
```

As you can see, every time we click on this button another artist is generated. This is awesome! We can now create things in our database on the client side. But there's a problem here: we've hardcoded the attributes.

**Question for you:** how might we be able to dynamically acquire data on the client side instead of hardcoding values?

## BREAK

## YOU DO: Work in Pairs (20/130)

Use the form to dynamically generate artists from the client side.
* **BONUS**: Once you create a new artist in the database, asynchronously update the view so that it includes the new artist. (Hint: look at the response)

## AJAX PUT (10/140) - We do

Let's now update an existing artist by adding another AJAX call to our next event listener:

```javascript
$(".test_ajax_put").on("click", function(){
  $.ajax({
    type: 'PUT',
    data: {
      artist: {
        name: "Robert Goulet",
        nationality: "American",
        photo_url: "http://media.giphy.com/media/u5yMOKjUpASwU/giphy.gif"
      }
    },
    dataType: 'json',
    url: "/artists/6"
  }).done(function(response){
    console.log(response);
  }).fail(function(){
    console.log("Failed to update.");
  })
})
```

> NOTE: This is just to show you how put requests work. Normally we would not hardcode the URL. We'll get more into this during OOJS/Front-end Frameworks. But think about how we could modify the DOM in order to effectively use AJAX PUT requests.

## AJAX DELETE (10/150) - You do

Let's update our Javascript for our final event listener to delete a record in our database through AJAX in `app/assets/javascripts/application.js`...

```javascript
$(".test_ajax_delete").on("click", function(){
  $.ajax({
    type: 'DELETE',
    dataType: 'json',
    url: "http://localhost:3000/artists/9"
  }).done(function(response){
    console.log("DELETED");
    console.log(response);
  }).fail(function(){
    console.log("Failed to delete.");
  })
})
```

### Bonus Exercises for PUT and DELETE
  1. Create a button or link that, when clicked, creates inline editing for an artist.
  2. Create a button that submits an AJAX `PUT` request to update that artist in the database. Change the view on the client side, if need be.
  3. Create a button or link for each artist that submits an AJAX `DELETE` request to delete an artist in the database. Update the view in the client side accordingly.

## YOU DO (On Your Own Time): Practice Makes Perfect
* Do everything we've done in class today for Songs.
* Create an AJAX request in another app you've created (e.g., projects, Scribble). Be sure to make sure your controller actions respond to JSON.

## Homework over Thanksgiving:
You can find the homework over thanksgiving [here](https://github.com/ga-dc/thanksgiving-homework)

## Sample Quiz Questions
  1. Write an AJAX GET request to a known end point.  
  2. How does a promise differ from a callback?  
  3. Write an AJAX POST to create an object in a rails application.  

## Cliff Notes

In order to do an AJAX `get` request to a 3rd party API:

```javascript
$.ajax({
  url: url,
  type: "get",
  dataType: "json"
  // $.ajax takes an object as an argument with at least three key-value pairs...
  // (1) The URL endpoint for the JSON object.
  // (2) Type of HTTP request.
  // (3) Datatype. Usually JSON.
}).done(function(response){
  console.log(response)
  // Here is where you place code for DOM manipulation or anything else you'd like to do with the response
}).fail(function(){
  console.log("Ajax request fails!")
}).always(function(){
  console.log("This always happens regardless of successful ajax request or not.")
})
```

In order to do an AJAX `get` request to your own rails API:

```javascript
$.ajax({
  type: 'GET',
  dataType: 'json',
  url: "http://localhost:3000/artists"
}).done(function(response) {
  console.log(response);
}).fail(function(response){
  console.log("Ajax get request failed.");
})
```

In order to do an AJAX `post` request to your own rails API:
```javascript
$.ajax({
  type: 'POST',
  data: {artist: {photo_url: "www.google.com", name: "bob", nationality: "bob"}},
  dataType: 'json',
  url: "http://localhost:3000/artists"
}).done(function(response) {
  console.log(response);
}).fail(function(response){
  console.log("Ajax get request failed");
})
```

In order to do an AJAX `put` request to your own rails API:

```javascript
$.ajax({
  type: 'PUT',
  data: {
    artist: {
      name: "Robert Goulet",
      nationality: "American",
      photo_url: "http://media.giphy.com/media/u5yMOKjUpASwU/giphy.gif"
    }
  },
  dataType: 'json',
  url: "/artists/6"
}).done(function(response){
  console.log(response);
}).fail(function(){
  console.log("Failed to update.");
})
```

In order to do an AJAX `delete` request to your own rails API:

```javascript
$.ajax({
  type: 'DELETE',
  dataType: 'json',
  url: "http://localhost:3000/artists/9"
}).done(function(response){
  console.log("DELETED");
  console.log(response);
}).fail(function(){
  console.log("Failed to delete.");
})
```
