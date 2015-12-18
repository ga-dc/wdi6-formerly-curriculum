# OOJS - Reading

## Learning Objectives
* Use `$.ajax` to populate objects client-side.
* Differentiate between "class methods" and "instance (prototyped) methods" in JS.
* Use OOJS to build model and view objects.
* Utilize promises to access the response from an `$.ajax` request.
* Render views client-side utilizing JS objects.

## Opening Framing (10/10)
We've learned how to make web applications with RESTful routing. We've even learned how to create them as API's that respond with JSON. Additionally, we've also learned how to make requests to an API in order to access data. But really all we did with that data was maybe create a single div in the promise of the AJAX request. This isn't really ideal.

Instead, it would be great if we could take that AJAX response and encapsulate the information we want into client-side JS objects. Then, with those model objects, we can render views utilizing view objects. In the same way we used Rails to group functionality and separate concerns, we can do similar things with JS objects on the client-side.  

**HEADS UP:** This stuff is hard guys. OOJS is one of more difficult thing we teach in this class. That being said, it's OK to not fully understand right away. Pick up what you can, practice and break stuff.  

> NOTE: We teach you many many tools. You won't use every tool all the time, but start to identify good use cases for these tools. If you were building a hole in the ground a foot deep, a back hoe might be a bit much and a shovel might do the trick. That said OOJS is not the end all be all of doing things on the front end.

## Goal
The goal here is to build this [app](https://github.com/ga-dc/tunr_mongo_oojs).
We want to be able to create these views strictly on the client-side.  

## Setup (10/20)
The first thing we should do is fork/clone the [Tunr repo](https://github.com/ga-dc/tunr_mongo_oojs). Then, let's install dependencies and start the server.  

```bash
$ npm install
$ node db/seeds.js
$ nodemon app.js
```

  If we go into our browser we can view all the endpoints and see that we can access all Tunr data as JSON. Take a look at `app.js`, `controllers/artists.js` and `models/artist.js` and you can see the different routes.  

Additionally if we look into `app.js` We can see at the root route we are rendering the index view.

**NOTE:** This index view is not the same as the `.hbs` views we've been using in Express. In fact, we won't be making use of any Express views at all. Instead, we'll be working from a single `index.html` file in our `public` folder.

In the `<body>` of `public/index.html`, we have a header as well as `<div class="artists"></div>`.

In the `<head>` we're linking to a stylesheet as well as some script files. We'll be adding a few more script files in class today.

## I Do: Models (10/30)
The first thing that I want to do is create a model file. This will hold the constructor function for a model. Let's create a file for the artist model: `$ touch public/js/models/artist.js`

In `public/js/models/artist.js`:

```js
var Artist = function(info){
  this.name = info.name;
  this.photoUrl = info.photoUrl;
  this.nationality = info.nationality;
  this.id = info.id
}
```

> In this constructor function, `info` is an argument passed in when creating a new Artist object. The properties of this object match to the columns in the `artists` database table.

Let's go ahead and test this out in the console of our browser.  

```js
var artist = new Artist()
// > Uncaught ReferenceError: Artist is not defined

```

What gives? We haven't included the script file in our layout file. In `views/layout.hbs`:

```html
<script src="/js/models/artist.js"></script>
```

Lets try again.

```js
var artist = new Artist()
// > Uncaught TypeError: Cannot read property 'name' of undefined
```

I think the issue here is that we didn't pass in an argument to the constructor function. Ok, third time's a charm.  

```js
var artist = new Artist({
  name: "Blues Traveler",
  photoUrl: "http://coloredvinylrecords.com/pictures/b/blues-traveler-four-01433512670.png",
  nationality: "murica",
  id: 6
})
// > undefined
artist
// > Artist {name: "blues traveler", photoUrl: "someURL", nationality: "murica", id: 6}
```

Great - we created a client-side instance of our object!  

## You Do: Models (10/40)
Now that we've created the artist model, go ahead and code the Song model definition.

Remember to:
* Create a model file.
* Code the constructor function in that file.
* Link to that file to your layout.

## Fetching (20/60)
It's not enough to just be able to create an object on the client side. We have to be able to make an ajax call to a server to actually parse the database into objects on the client side. Let's update our artist model to fetch from a database. In `js/models/artist.js`...

```js
Artist.fetch = function(){
  // saving the ajax request to a local variable
  var request = $.getJSON("http://localhost:3000/artists")
  // the promise function on a successful ajax call.
  .then(function(response) {
    // local variable in the promise callback instantiated as an empty array
    var artists = []
    // loop over each element in the response
    for(var i = 0; i < response.length; i++){
      // create a new JS Artist object for each element in the response
      artists.push(new Artist(response[i]))
    }
    // returns artists in the promise so that it can be passed in as an argument to future promises
    return artists
    })
  .fail(function(response){
      console.log("artists fetch fail")
    })
  // explicit return of the fetch function that returns the json request with artists available an argument for future promises  
  return request
}
```
> [`$.getJSON`](http://api.jquery.com/jquery.getjson/) is jQuery method that serves the same purpose as a GET `$.ajax` to a JSON source.  

> NOTE: We defined the `fetch` function inside the Artist constructor. This is more or less the same as class methods in Ruby.

There's a lot going on here. Let's take it slow and play around with it in the console.  

```js
artists = Artist.fetch()
// > Object{}
```

> We can drill into the response object and see some pretty cryptic stuff. But if you remember in the code comments above, that's possible because we return the response. By saving the response to an `artists` variable, we have access to artists as an argument in future promises.

Let try attaching a promise to it.

```js
artists.then(function(artists){
  console.log(artists)
})
// > [Artist, Artist, Artist, Artist, Artist]
```

We now have access to our artists in our database on the  client side.

## Break (10/70)

## Views: Artist (20/90)
We have the ability to create objects in JS from the database on the client side. We need to additionally render views based on those models. There's lots of ways to build views as well as lots of front-end frameworks that do it as well. This is just one way.  

Lets start by creating and editing `public/js/views/artistView.js`.

```js
var ArtistView = function(artist){
  this.artist = artist;
  this.$el = $("<div class='artist'></div>");
};
```
> `$el` is an HTML representation of what our view will look like when rendered on our webpage. The `$` means it's a jQuery object, so we can call jQuery methods on it.

We can quickly test this in the console by creating a new artistView.

```js
var bluesTraveler = new Artist({
  name: "Blues Traveler",
  photoUrl: "http://coloredvinylrecords.com/pictures/b/blues-traveler-four-01433512670.png",
  nationality: "murica",
  id: 6
})
var bluesTravelerView = new ArtistView(bluesTraveler)
```

We can call `.artist` or `.$el` and retrieve those properties now.

We're setting 2 properties in the ArtistView objects. The first is an artist, which gets passed into the constructor function. The second is an `.$el` property which is just a jQuery object that's an empty div.  

Let's create some additional functionality for the ArtistView Object in `public/js/views/artistView.js`.  

```js
ArtistView.prototype = {
  render: function(){
    // we'll be adding event listeners later but will still need access to the Artist view in the event listener
    var self = this;
    // appending elements to the .$el property
    self.$el.append("<h3>" + self.artist.name + "</h3>");
    self.$el.append("<img class='artist-photo' src='" + self.artist.photoUrl + "'>");
    self.$el.append("<button class='showSongs'>Show Songs</button>");
    self.$el.append("<div class='songs'></div>");
    // append the .$el to the div with class artists in our view.
    $("div.artists").append(self.$el);
  }
}
```
> NOTE: We namespaced the .render() functionality under prototype. That is to say, this is like an instance method. It is available to each instance of the ArtistView Object

Let's test this out in the console.  

```js
var bluesTraveler = new Artist({
  name: "Blues Traveler",
  photoUrl: "http://coloredvinylrecords.com/pictures/b/blues-traveler-four-01433512670.png",
  nationality: "USA",
  id: 6
});
var bluesTravelerView = new ArtistView(bluesTraveler);
bluesTravelerView.render();
```

Great, we see the view was generated and rendered to our page! Now let's do some refactoring in `public/js/views/artistView.js`.

```js
ArtistView.prototype ={
  render: function(){
    var self = this;
    self.$el.html(self.artistTemplate(self.artist));
    $(".artists").append(self.$el);
  },
  artistTemplate: function(artist){
    var html = $("<div>");
    html.append("<h3>" + this.artist.name + "</h3>");
    html.append("<img class='artist-photo' src='" + this.artist.photoUrl + "'>");
    html.append("<button class='showSongs'>Show Songs</button>");
    html.append("<div class='songs'></div>");
    return(html);
  }
}
```

> We'll get into templating later. When we implement this (probably with Handlebars) we will no longer need this `artistTemplate` function.

We want all artists to be rendered upon page load. Let's take care of that in `public/js/script.js`:

```js
$(document).ready(function(){
  Artist.fetch().then(function(artists){
    artists.forEach(function(artist){
      var view = new ArtistView(artist)
      view.render();
    })
  })
});
```

Let's reload the page. BAM!

> NOTE: Code snippets moving forward will be parts of an entire file.

## I Do: Fetching Songs (20/110) w/ break
As we can see on our new landing page, there's a show songs button for each Artist. We want to be able to click on that button and see all of the songs that belong to that Artist.  

In the render function of our artists, we additionally want to add an event listener to this button. In the render function of `public/js/views/artistView.js`...

```js
var showButton = self.$el.find(".showSongs");
var songsDiv = self.$el.find("div.songs");
songsDiv.hide();
showButton.on("click", function(){
  console.log("show button clicked");
});
```

The event is firing off. We also hid the `div` with class `songs` because we want to be able to call `.show` on it for the initial click.  

It's not enough to just log that the button was clicked though. Really what we want to do is append a Song for each Song associated with this Artist.  

The first thing we need is the ability to get our Songs. Let's update our Artist model to incorporate that functionality. In `public/js/models/artist.js`...  

```js
Artist.prototype.fetchSongs = function(){
  var url = "http://localhost:3000/artists/" + this.id + "/songs";
  var request = $.getJSON(url)
  .then(function(response){
    var songs = [];
    for(var i = 0; i < response.length; i++){
      songs.push(new Song(response[i]));
    }
    return songs;
  })
  .fail(function(repsonse){
    console.log("js failed to load");
  })
  return request;
}
```

> NOTE: While they look pretty similar, there are some important different between `.fetch()` and `.fetchSongs()`. `.fetch()` is a class method which is called on the constructor function to get all of the Artists. `.fetchSongs` is an instance method and is available for each instance of the Artist constructor and grabs all of the Songs for that single Artist.

So we're able to get the Songs for each Artist. Now, we want the ability to generate a view for each Song so we can append it to the Artist.  

## You Do: Create and Edit `/public/js/view/songView.js` (10/120)

The song view is kept minimal because we are just attaching it to the artist view. All we want to return in the render function is a `<p>` containing the title.  

## I Do: Show Songs Click Event (20/140)

Alright, let's update event listener in our render function inside of `public/js/views/artistView.js`.

```js
showButton.on("click", function(){
  if(songsDiv.children().length === 0){
    self.artist.fetchSongs().then(function(songs){
      songs.forEach(function(song){
        var songView = new SongView(song);
        songsDiv.append(songView.render());
        songsDiv.show();
      });
    });
  }
  // toggle (note: songsDiv starts hidden)
  songsDiv.toggle();
})
```

Awesome! We can now click Show Songs (and it even toggles). Seems a little bit off that the button still shows show songs after we click it, but we can fix that in a bit.  

Our code is starting to get a little bit out of control. Let's take some time to refactor. We want to get as much out of this render function as possible and separate our concerns. Let's first abstract out all of the functionality inside of the click event and namespace it into `toggleSongs`. In the `ArtistView.prototype` object inside of `public/js/views/artistView.js`...

```js
render: function(){
  var self = this;
  self.$el.html(self.artistTemplate(self.artist));
  $(".artists").append(self.$el);
  var showButton = self.$el.find(".showSongs");
  var songsDiv = self.$el.find("div.songs");
  showButton.on("click", function(){
    self.toggleSongs(songsDiv);
  })
},

toggleSongs: function(songsDiv){
  if(songsDiv.children().length === 0){
    this.artist.fetchSongs().then(function(songs){
      songs.forEach(function(song){
        var songView = new SongView(song);
        songsDiv.append(songView.render());
        songsDiv.show();
      });
    });
  }
  songsDiv.toggle();
}
```

Even though the method is `toggleSongs`, it's additionally appending views if it hasn't fetched yet. I think we should go ahead and abstract this out as well in order to separate our concerns. In the `ArtistView.prototype` object inside of `public/js/views/artistView.js`...

```js
render: function(){
  var self = this;
  self.$el.html(self.artistTemplate(self.artist));
  $(".artists").append(self.$el);
  var showButton = self.$el.find(".showSongs");
  var songsDiv = self.$el.find("div.songs");
  showButton.on("click", function(){
    self.toggleSongs(songsDiv);
  })
},

toggleSongs: function(songsDiv){
  var self = this;
  if(songsDiv.children().length === 0){
    this.artist.fetchSongs().then(function(songs){
      self.appendSongs(songs, songsDiv);
      songsDiv.show();
    });
  }
  songsDiv.toggle();
},

appendSongs: function(songs, songsDiv){
  songs.forEach(function(song){
    var songView = new SongView(song);
    songsDiv.append(songView.render());
  });
}
```

> It's a little bit more code upfront, but you increase your code maintainability, scalability and modularity.

One last little detail we need to fix on the UI. The buttons text should change from "Show Songs" to "Hide Songs" depending on the state of the application.  

## You Do: Toggle the Button (10/150)
Create an instance method inside the `ArtistView.prototype` object. This method should make it such that the buttons text changes dynamically depending on whether songs are showing or not.

## Closing / Questions

# Cliff Notes

The solution for the `read` portion of today's in-class example is available [here](https://github.com/ga-dc/tunr_mongo_oojs/tree/read).

### /public/index.html
```js
<!DOCTYPE html>
<html>
  <head>
    <title>Tun.r</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="js/models/artist.js"></script>
    <script src="js/models/song.js"></script>
    <script src="js/views/artistView.js"></script>
    <script src="js/views/songView.js"></script>
    <script src="js/script.js"></script>
  </head>
  <body>
    <header><h1>Tun.r</h1></header>
    <div class="artists"></div>
  </body>
</html>
```

### /public/js/models/artist.js
```js
var Artist = function(info){
  this.name = info.name;
  this.photoUrl = info.photoUrl;
  this.nationality = info.nationality;
  this.id = info.id
}

Artist.fetch = function(){
  var request = $.getJSON("http://localhost:3000/artists").then(function(response){
    var artists = [];
    for(var i = 0; i < response.length; i++){
      artists.push(new Artist(response[i]));
    }
    return artists;
  }).fail(function(response){
    console.log("artists fetch fail");
  });
  return request;
}

Artist.prototype.fetchSongs = function(){
  var url = "http://localhost:3000/artists/" + this.id + "/songs";
  var request = $.getJSON(url);
  .then(function(response){
    var songs = [];
    for(var i = 0; i < response.length; i++){
      songs.push(new Song(response[i]));
    }
    return songs;
  })
  .fail(function(repsonse){
    console.log("js failed to load");
  });
  return request;
}
```

### /public/js/views/artistView.js
```js
var ArtistView = function(artist){
  this.artist = artist;
  this.$el = $("<div class='artist'></div>");
}

ArtistView.prototype = {
  render: function(){
    var self = this;
    self.$el.html(self.artistTemplate(self.artist));
    $(".artists").append(self.$el);
    var showButton = self.$el.find(".showSongs");
    var songsDiv = self.$el.find("div.songs");
    showButton.on("click", function(){
      self.toggleSongs(songsDiv);
    })
  },
  toggleSongs: function(songsDiv){
    var self = this;
    if(songsDiv.children().length === 0){
      this.artist.fetchSongs().then(function(songs){
        self.appendSongs(songs, songsDiv);
        songsDiv.show();
      });
    }
    songsDiv.toggle();
  },
  appendSongs: function(songs, songsDiv){
    songs.forEach(function(song){
      var songView = new SongView(song);
      songsDiv.append(songView.render());
    });
  },
  artistTemplate: function(artist){
    var html = $("<div>");
    html.append("<h3>" + artist.name + "</h3>");
    html.append("<img class='artist-photo' src='" + artist.photoUrl + "'>");
    html.append("<button class='showSongs'>Show Songs</button>");
    html.append("<div class='songs'></div>");
    return(html);
  }
}
```

### /public/js/models/song.js
```js
var Song = function(info){
  this.title = info.title;
  this.album = info.album;
  this.previewUrl = info.previewUrl;
  this.artwork = info.artwork;
  this.artistId = info.artistId;
  this.id = info.id
}
```

### /public/js/models/songView.js
```js
var SongView = function(song){
  this.song = song;
}

SongView.prototype = {
  render: function(){
    var el = $("<p>" + this.song.title + "</p>");
    return(el)
  }
}
```

### /public/js/script.js
```js
$(document).ready(function(){
  Artist.fetch().then(function(artists){
    artists.forEach(function(artist){
      var view = new ArtistView(artist)
      view.render();
    })
  })
});
```
