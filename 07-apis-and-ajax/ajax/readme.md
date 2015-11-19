# Ajax

## Learning Objectives
- Explain the difference between synchronous and asynchronous program execution
- Explain why synchronous program execution is not conducive to the front-end.
- Use jQuery `$.ajax()` method to make asynchronous GET requests for data.
- Use jQuery's 'promise-like' methods to handle AJAX responses asynchronously.
- Render new HTML content using data loaded from an Ajax request.
- Perform POST, PUT, and DELETE requests to an API to modify data.

## Opening Framing (5/5)
In the past couple weeks or so, we've been learning ALOT about server side requests and responses. Currently we know how to create applications with full CRUD on models in our database, and that's great. When we do that CRUD, however, it requires a page reload of some kind. It would be really nice if we could execute some kind of functionality on the client side of our application but still communicate with the backend without a page refresh. If only we had a client side language that was non blocking and asynchronous.

(ST-WG) Think back to the first couple weeks of class, whats the difference between synchronous and asynchronous program execution?

### T & T (10/15)
Turn and talk to you neighbor, why might synchronus programming not be effective for the front end? Consider how http requests work within your rails application.

We don't want to sit around and wait for code to execute before we load the rest of our script. It would be really nice if we could just describe what we want to happen when the code finally does execute, in a callback.

Let's look at google maps. How would this site work with things not happening asynchronously?

## `$.ajax`- JSON (10/25)

For the first part of this lesson, we'll be using the [weather underground api](http://www.wunderground.com/weather/api/d/docs)

## You do sign up and register for a key!
You guys can signup and register for your very own key!

So if we go to this link, and we go to the example in the middle of the page, we can see a url, something like: `http://api.wunderground.com/api/Your_Key/conditions/q/CA/San_Francisco.json`

Let go to this url `http://api.wunderground.com/api/f28a93cae85945b6/conditions/q/CA/San_Francisco.json`:

> replace my key with yours if you've registered and received a key

If you're using the key provided in the lesson plan, we only have a rate limit of 500 so please don't over use!

So if you go to this URL, you'll see a really gigantic object(hash in ruby). It can be really intimidating at first. But let's just start clicking around till we find some information we might want to display.

Turns out, we can actually access this json object using Javascript!

> JSON stands for Javascript Object Notation. JSON can come in a bunch of different ways. But at the end of the day, it's just an object(hash in ruby).

## `$.ajax` - get (25/50)
The jquery library gives us access to this awesome thing called asynchronous javascript and xml(AJAX). With the help of AJAX we can do server side requests asynchronously on the client without having to send an actual browser request that reloads the page.

With AJAX we can do HTTP requests:
- get
- post
- delete
- put

The first thing I'd like to do is create the files I'll need for this application.

```bash
$ mkdir wunderground_ajax
$ cd wunderground_ajax
$ touch index.html
$ touch script.js
```

We're going to load of some bare bones content to load jquery and our script file in the `index.html`:

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

> AJAX is given to us through the jQuery library, so make sure that you attach jQuery to any app that will be using AJAX

Let's go ahead and make our first `$.ajax` get request in our `script.js`:

```javascript
// waiting for dom to load
$(document).ready(function(){
  // just adding a click event to the only element we have on the page.
  $("h1").on("click", function(){
    var url = "https://api.wunderground.com/api/f28a93cae85945b6/geolookup/conditions/q/va/midlothian.json"
    $.ajax({
      // the URL endpoint for the JSON object
      url: url,
      // type of request
      type: "get",
      // datatype xml or json
      dataType: "json"
    // promise that executes on successful ajax call
    }).done(function(){
      console.log("ajax request success!")
    // promise that executes on unsuccessful ajax call
    }).fail(function(){
      console.log("ajax request fails!")
    // promise that executes either way
    }).always(function(){
      console.log("this always happens regardless of successful ajax request or not")
    })
  })
})
```
> You'll notice there are 3 functions that are tacked onto the AJAX call. These are known as promises. What are promises? They're just callbacks that may or may not happen. A promise represents the future result of an asynchronous operation. In the `.done()` promise if that ajax is executed successfully, the block of code inside it will execute. In the `.fail()` promise, if that ajax is not executed successfully, the block of code inside it will execute. In the `.always()` promise, code block inside will always occur regardless of the ajax's success.

> If we mess up the URL even by one character, it goes from being a success to a failure. SO be sure to make sure your end points are... on point!

But Andy, i thought we were able to access that big json object we saw before? Well you can, you have to add in an argument to the anonymous function callback. The ajax call gives a response back that you can than in turn pass in as an argument for the promise.

```javascript
.done(function(response)(){
  console.log(response)
})
```

We can drill through this response just like any other JS object.

```javascript
.done(function(response)(){
  console.log(response.current_observation.temp_f)
})
```

> This is huge. We now have a way to access information from an API as a JSON object. With it we can do a myriad of things.

## You do - (10/60)
- Take our existing code for the the weather underground app. Instead of logging the temperature, the `.done()` promise should create a div with the current wind speed in mph.

### BONUS!
- Create an Input text field for City and State in the HTML
- Have the endpoint url change dynamically based on user input to generate a div about current weather in that area.

## Break - 10/70

## AJAX - CUD intro (5/75)
So we've used AJAX to do an asynchronous `get` request to a third party API. But it wouldn't make sense for us to be able to do CUD functionality to that same site. They probably don't want anyone that's not a developer there to be able to update the weather however we want. That is not to say that kind of functionality doesn't exist, we just don't have access to it.

It just so happens we've built a new Rails API (through matt's class) where we can do full CRUD with AJAX. Go ahead and fork and clone [this repo](https://github.com/ga-dc/tunr_ajax).

Once you've cloned the repo cd into it and run the commands  `$bundle install`, `$rake db:create`, `$rake db:migrate` and `$rake db:seed` in the terminal

We can now use `$.ajax()` to CRUD the models of our tunr app! Let's go ahead and create a new artists controller action and corresponding view: `test_ajax`

## Setting up a view to test AJAX with (10/85)
Let's update our routes in `config/routes.rb` for a new route to test all of our AJAX calls in:

```ruby
get '/test_ajax', to: 'artists#test_ajax'
```

in `app/controllers/artists_controller.rb`:

```ruby
def test_ajax
end
```

in `app/views/artists/test_ajax.html.erb`:

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
    alert("clicked!")
  })
})
```

## AJAX Get (5/90)
Great, everything's working. Let's try doing a get request to our API like we did with the Weather underground API. In `app/assets/javascripts/application.js`:

```javascript
$(document).ready(function(){
  $(".test_ajax_get").on("click", function(){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: "http://localhost:3000/artists"
    }).done(function(response) {
      console.log(response)
    }).fail(function(response){
      console.log("ajax get request failed")
    })
  })
})
```

> If access the objects in this response, we can see all of the artists that were seeded in the database. Here in the done response I could display whatever i want from the response.

## Setup for AJAX post (10/100)
Lets update our view to include some input fields and all of our existing articles in `app/views/artists/test_ajax.html.erb`:

```html
<!-- div attached to event handler -->
<div class="test_ajax_get">AJAX GET!!</div>

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

<h1>Articles</h1>
<ul class="articles">
  <% @artists.each do |artist| %>
    <li>
      <a href="/artists/<%= artist.id %>">
        <%= artist.name %>
      </a>
    </li>
  <% end %>
</ul>

```

> We can see now that artists are in this view as well as some input fields to help us generate some artists

## AJAX Post (10/110)
Let's try and create an artist through AJAX. Let's update our `app/assets/javascripts/application.js`:

```javascript
$(".test_ajax_post").on("click", function(){
  $.ajax({
    type: 'POST',
    data: {artist: {photo_url: "www.google.com", name: "bob", nationality: "bob"}},
    dataType: 'json',
    url: "http://localhost:3000/artists"
  }).done(function(response) {
    console.log(response)
  }).fail(function(response){
    console.log("ajax get request failed")
  })
})
```

As you can see, every time I click on this button another artists get's generated. This is awesome, we can now create things in our database on the client side. But there's a problem here. We've hardcoded the attributes.

We hardcoded some values here, but how might we be able to dynamically aquire data on the client side instead of hardcoding values? (ST-WG)

## You do - Work in pairs (20/130)
- use the input fields to dynamically generate artists on the client side

- BONUS - not only does it create on the client side, but it also changes in the view layer to reflect the update in the database. hint: check out the response!

## AJAX PUT (10/140)
Let's now update an existing artist by adding another ajax call to our next event listener:

```javascript
$(".test_ajax_put").on("click", function(){
  $.ajax({
    type: 'PUT',
    data: {artist: {photo_url: "www.google.com", name: "bobbby", nationality: "bob"}},
    dataType: 'json',
    url: "http://localhost:3000/artists/6"
  }).done(function(response){
    console.log(response)
  }).fail(function(){
    console.log("failed to updated")
  })
})
```

> note this is really just to show you how put requests work, normally we would not hardcode the url. We'll get more into this during OOJS/front end frameworks. But think about how we could modify the DOM in order to effectively use AJAX put requests

## AJAX DELETE(10/150)
Let's update our JS for our final event listener to delete a record in our database through AJAX in `app/assets/javascripts/application.js`:

```javascript
$(".test_ajax_delete").on("click", function(){
  $.ajax({
    type: 'DELETE',
    dataType: 'json',
    url: "http://localhost:3000/artists/9"
  }).done(function(response){
    console.log("DELETED")
    console.log(response)
  }).fail(function(){
    console.log("failed to delete")
  })
})
```

> read above comments for ajax put

### Bonus exercises for put and delete
- create a button or link, when clicked creates in line editing for an artist
- should then also create a button that submits an AJAX put request to update that artist in the database and change the view on the client side if need be
- create a button or link for each artist that submits an AJAX delete request to delete an artist in the database, update the view in the client side accordingly.

## You do! On your own time(Practice makes perfect:smile:)
- Try the same thing with songs resources

- Try and recreate these AJAX request on another app you've created like scribbler or your project. Be sure to make sure your controller actions repond to json.

- Try and incorporate AJAX into your collaborative project /w UXDI!

## Sample quiz questions

1. Write an AJAX GET request to a known end point.

2. How does a promise differ from a callback?

3. Write an AJAX POST to create an object in a rails application.
