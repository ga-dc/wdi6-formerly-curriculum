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

## `$.ajax`- JSON (10/25)

For the first part of this lesson, we'll be using the [weather underground api](http://www.wunderground.com/weather/api/d/docs)

So if we go to this link, and we go to the example in the middle of the page, we can see a url, something like: `http://api.wunderground.com/api/Your_Key/conditions/q/CA/San_Francisco.json`

You guys can signup and register for your very own key! For now, let's just use mine: `http://api.wunderground.com/api/f28a93cae85945b6/conditions/q/CA/San_Francisco.json`

Lets not go crazy and screw your instructor though, we only have a rate limit of 500!

So if you go to this URL, you'll see a really gigantic hash. It can be really intimidating at first. But let's just start clicking around till we find some information we might want to display.

Turns out, we can actually access this json object using Javascript!

> JSON stands for Javascript Object Notation. JSON can come in a bunch of different ways. But at the end of the day, it's just a hash.

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

We're going to load of some bare bones content to load jquery and our scripty file in the `index.html`:

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

It just so happens we've built a new Rails API (through matt's class) where we can do full CRUD with AJAX. Go ahead and fork and clone [this repo](#). We can now use `$.ajax()` to CRUD the models of our tunr app! Let's go ahead and create a new artists controller action and corresponding view: `test_ajax`

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
<div class="test_ajax_get">AJAX!</div>
<div class="test_ajax_post">AJAX!</div>
<div class="test_ajax_put">AJAX!</div>
<div class="test_ajax_delete">AJAX!</div>
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
  $(".test_ajax").on("click", function(){
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

> If we drill through this response, we can see all of the artists that were seeded in the database.

## AJAX Post (10/100)
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

As you can see, every time I click on this button another artists get's generated.

We hardcoded some values here, but how might we be able to dynamically aquire data on the client side instead of hardcoding values? (ST-WG)

## You do - Work in pairs (20/120)
- create a inputs for new artists in `app/views/artists/test_ajax.html.erb`
- use those DOM elements to dynamically create artists using AJAX

## AJAX PUT (10/130)
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

## AJAX DELETE(10/140)
Let's update our JS for our final event listener to delete a record in our database through AJAX in `app/assets/javascripts/application.js`:

```javascript
$(".test_ajax_delete").on("click", function(){
  $.ajax({
    type: 'DELETE',
    dataType: 'json',
    url: "http://localhost:3000/artists/9"
  }).done(function(response){
    console.log("shiz got deleted")
    console.log(response)
  }).fail(function(){
    console.log("failed to delete")
  })
})
```

## You do... more to follow
