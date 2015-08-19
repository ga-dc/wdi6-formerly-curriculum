# OOJS - Reading

## Learning Objectives
- use `$.ajax` to populate objects in the front end(client-side)
- differentiate between "class methods" and "instance (prototyped) methods" in JS.
- use OOJS to build model and view objects
- Utilize promises to access the response from an `$.ajax` request
- render views on the client-side utilizing JS objects in your application.

## Opening Framing (10/10)
We've learned how to make web applications with RESTful routing. We've even learned how to create them as API's that respond with JSON. Additionally, we've also learned how to make requests to API in order to access data. But really all we did with that data was maybe create a single div in the promise of the ajax request. This isn't really ideal.

I think instead, it would be great if we could take that ajax response, and encapsulate the information we want into JS objects on the client-side. Then with those objects we can render views utilizing view objects. In the same way we used rails/ruby to group functionality and separate concerns, we can do similar things with JS objects on the client side. This stuff is hard guys. OOJS is the most difficult thing we teach in this class. It's ok to not fully understand right away. Pick up what you can, practice and break stuff. 

> One thing to note about this class, and WDI as a whole. We teach you many many tools. You won't use every tool all the time, but start to identify good use cases for these tools. IE. if you were building a hole in the ground a foot deep, a back hoe might be a bit much and a shovel might do the trick. That said OOJS is not the end all be all of doing things on the front end.

## Goal
The goal here is to build this [app](https://github.com/ga-dc/tunr_node_oojs/tree/solution).
We want to be able to create these views strictly on the client-side. Minus the header.

## Setup (10/20)
The first thing we should do is fork/clone the [tunr repo here](https://github.com/ga-dc/tunr_node_oojs).

Let's start by installing dependencies and starting the server.


```bash
$ npm install
$ nodemon app.js
```

Let's create a couple of folders as well

```bash
 $ mkdir public/js
 $ mkdir public/js/models
 $ mkdir public/js/views
 ```

If we go into our browser we can view all the endpoints and see that everythings responding to json. Take a look at `app.js`, `controllers/artists.js` and `controllers/artists.js` and you can see the different routes.

Additionally if we look into `app.js` We can see at the root route we are rendering the index view.

Inside the `views/index.hbs`, is just `<div class="artists"></div>`.

In our layout file we have a couple different things. We're linking to a stylesheet. We're loading some script files. Additionally theres a header for our sweet application.

## Models - I do(10/30)
The first thing that I want to do is create a model file. This will hold the constructor function for a model. So let's go ahead and create a file for the artist model `$ touch public/js/models/artist.js`.

In `public/js/models/artist.js`:

```js
var Artist = function(info){
  this.name = info.name;
  this.photoUrl = info.photoUrl;
  this.nationality = info.nationality;
  this.id = info.id
}
```

> In this constructor function, info is an argument when creating a new artist object. The properties of this function are from the columns in the database.

Let's go ahead and test this out in the console of our browser:

```js
var artist = new Artist()
// > Uncaught ReferenceError: Artist is not defined

```

What gives? We haven't included the script file in our layout file. In `views/layout.hbs`:

```html
<script src="/js/models/artist.js"></script>
```

Lets try it again ....:

```js
var artist = new Artist()
// > Uncaught TypeError: Cannot read property 'name' of undefined
```

I think the issue here is that we didn't pass in an argument to the constructor function.

Ok, third time's a charm:

```js
var artist = new Artist({name: "blues traveler", photoUrl: "someURL", nationality: "murica", id: 6})
// > undefined
artist
// > Artist {name: "blues traveler", photoUrl: "someURL", nationality: "murica", id: 6}
```

Great! we created an instance of our object in the client!

## Models - You do(10/40)
Great, now that we've created the artist model, go ahead and code the song model defintion.

Remember to:
- create a model file
- code the constructor function in that file
- link that file to your layout.

## Fetching (20/60)
It's not enough to just be able to create an object on the client side. We have to be able to make an ajax call to a server to actually parse the database into objects on the client side. Let's update our artist model to fetch from a database. In `js/models/artist.js`:

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

> notice that we defined the fetch function on the Artist Constructor functions. This is more or less the same as "class methods" you see in ruby.

Alot's going on here. Let's take it slow.

Let's play around with it in the console.

```js
artists = Artist.fetch()
// > Object{}
```

> this doesn't really seem all that helpful. We can drill in and see some pretty cryptic stuff. But if you remember in the comments in the code above, you can that because we return the request, we have access to artists as an argument in future promises.

Let try attaching a promise to it:

```js
artists.then(function(artists){
  console.log(artists)
})
// > [Artist, Artist, Artist, Artist, Artist]
```

Sick, we now have access to our artists in our database on the  client side.

## Break (10/70)

## Views - Artist (20/90)
We have the ability to create objects in JS from the database on the client side. We need to additionally render views based on those models. There's lots of ways to build views as well as lots of front end frameworks that do it as well. This is just one way. Adrian will be teaching a mini lesson on react on friday for another! Lets start by creating and editing `public/js/views/artistView.js`:

```js
var ArtistView = function(artist){
  this.artist = artist;
  this.$el = $("<div class='artist'></div>");
};
```

We can quickly check/test it out in the console by creating a new artistView in the console.

```
var bluesTraveler = new Artist({name: "blues traveler", photoUrl: "someURL", nationality: "murica", id: 6})
var bluesTravelerView = new Artist(bluesTraveler)
```

We can call `.artist` or `.$el` and retrieve those properties now.

We're setting 2 properties in the ArtistView objects. 1 is an artist, which gets passed into the constructor function. The second is an `.$el` property which is just a jquery object that's an empty div.

Let's create some additional functionality for the ArtistView Object in `public/js/views/artistView.js`:

```js
ArtistView.prototype ={
  render: function(){
    // we'll be adding event listeners later but will still need access to the Artist view in the event listener
    var self = this;
    // appending elements to the .$el property
    self.$el.append("<h3>" + artist.name + "</h3>");
    self.$el.append("<img class='artist-photo' src='" + artist.photoUrl + "'>");
    self.$el.append("<button class='showSongs'>Show Songs</button>");
    self.$el.append("<div class='songs'></div>");
    // append the .$el to the div with class artists in our view.
    $("div.artists").append(self.$el)
  }
}
```

> note that we namespaced the .render() functionality under prototype. That is to say this is like an instance method. It is available to each instance of the ArtistView Object

Let's test this out in the console.

```
var bluesTraveler = new Artist({name: "blues traveler", photoUrl: "someURL", nationality: "murica", id: 6})
var bluesTravelerView = new ArtistView(bluesTraveler)
bluesTravelerView.render()
```

Great, we see the view was generated and rendered to our page!

I see a quick refactor opportunity in `public/js/views/artistView.js`:

```js
ArtistView.prototype ={
  render: function(){
    var self = this
    self.$el.html(self.artistTemplate(self.artist));
    $(".artists").append(self.$el);
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

> We'll get into templating later, probably using handlerbars! Which you're already familiar with! Instead of an `artistTemplate()` function there will be some handlebars syntax

Really I want to do this sort of behavior for all artists on page load. So let's do that in `public/js/script.js`:

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

> note that the code snippets going forward will be parts of an entire file.

## I do - Fetching Songs (20/110) /w break
As we can see in our sick new landing page. There's a show songs button for each artist. We want to be able to click on that button and see all of the songs that belong to that artist.

In the render function of our artists, we additionally want to add an event listener to this button. In the render function of `public/js/views/artistView.js`:

```js
var showButton = self.$el.find(".showSongs")
var songsDiv = self.$el.find("div.songs")
songsDiv.hide()
showButton.on("click", function(){
  console.log("show button clicked")
});
```

Cool, the events firing off. We also hid the div with class songs because we want to be able to call `.show` on it for the initial click.

It's not enough to just log that the button was clicked though. Really what we want to do is append a song for each song associated with this artist.

The first thing we need is the ability to get our songs. Let's update our artist model to incorporate that functionality. In `public/js/models/artist.js`:

```js
Artist.prototype.fetchSongs = function(){
  var url = "http://localhost:3000/artists/" + this.id + "/songs"
  var request = $.getJSON(url)
  .then(function(response){
    var songs = []
    for(var i = 0; i < response.length; i++){
      songs.push(new Song(response[i]))
    }
    return songs
    })
  .fail(function(repsonse){
    console.log("js failed to load")
    })
  return request
}
```

> note the similarities between `.fetch()` and `.fetchSongs()`. Though there are many similarities, I want to note the differences. `.fetch()` is a class method which is called on the constructor function to get all of the artists. `.fetchSongs` is an instance method and is available for each instance of the Artist constructor and grabs all of the songs for that single artist.

So we're able to get the songs for each artist. Now we want the ability to generate a view for each song so we can append it to the artist.


## You do - Create and edit `/public/js/view/songView.js` (10/120):

> The song view is kept minimal because we are just attaching it to the artist view. All we want to return in the render function is a p tag containing the title.

## I do - show songs click event(20/140)

Alright, let's update event listener in our render function inside of `public/js/views/artistView.js`:

```js
showButton.on("click", function(){
  if(songsDiv.children().length === 0){
    self.artist.fetchSongs().then(function(songs){
      songs.forEach(function(song){
        var songView = new SongView(song)
        songsDiv.append(songView.render())
        songsDiv.show();
      })
    });
  }
  // toggle (note: songsDiv starts hidden)
  songsDiv.toggle();
})
```

Awesome! We can now click show songs and it even toggles. Seems a little bit off that the button still shows show songs after we click it, but we can fix that in a bit. Our code is starting to get a little bit out of control. I want to take this time to refactor abit. I want to get as much out of this render function as possible and separate our concerns. Let's first abstract out all of the functionality inside of the click event and namespace it into `toggleSongs`. In the `ArtistView.prototype` object inside of `public/js/views/artistView.js`:

```js
render: function(){
  var self = this
  self.$el.html(self.artistTemplate(self.artist));
  $(".artists").append(self.$el);
  var showButton = self.$el.find(".showSongs")
  var songsDiv = self.$el.find("div.songs")
  showButton.on("click", function(){
    self.toggleSongs(songsDiv)
  })
},

toggleSongs: function(songsDiv){
  if(songsDiv.children().length === 0){
    this.artist.fetchSongs().then(function(songs){
      songs.forEach(function(song){
        var songView = new SongView(song)
        songsDiv.append(songView.render())
        songsDiv.show();
      })
    });
  }
  songsDiv.toggle();
}
```

Even though the method is toggleSongs, it's additionally appending views if it hasn't fetched yet. I think we should go ahead and abstract this out as well in order to separate our concerns. In the `ArtistView.prototype` object inside of `public/js/views/artistView.js`:

```js
render: function(){
  var self = this
  self.$el.html(self.artistTemplate(self.artist));
  $(".artists").append(self.$el);
  var showButton = self.$el.find(".showSongs")
  var songsDiv = self.$el.find("div.songs")
  showButton.on("click", function(){
    self.toggleSongs(songsDiv)
  })
},

toggleSongs: function(songsDiv){
  var self = this
  if(songsDiv.children().length === 0){
    this.artist.fetchSongs().then(function(songs){
      self.appendSongs(songs, songsDiv)
      songsDiv.show()
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

One last little detail we need to fix on the UI. The buttons text should change from Show Songs to Hide Songs depending on the state of the application.

## You do - toggle the button! (10/150)
Create an instance method inside the `ArtistView.prototype` object. This method should make it such that the buttons text changes dynamically depending on whether songs are showing or not.
