# OOJS on the Front End - Part Deux: Create, Update, Destroy

## Screencasts

- 12/1 (Robin)
  - [Part 1](https://youtu.be/GZ2y31JBeHA)
  - [Part 2](https://youtu.be/Y5EfQB98AFQ)
- 12/2 (Robin)
  - [Part 1](https://youtu.be/hB4skwJpTK4)
  - [Part 2](https://youtu.be/45Cm9blHG70)

## Learning Objectives

* Use OOJS to structure front end code.
* Build model objects that create, update, destroy data on the server.
* Build view objects that render forms and interact with model objects.
* Describe the role of model objects on the front-end.
* Describe the role of view objects on the front-end.

# Framing

Our goal for today is to complete the Tunr app so that we have basic CRUD functionality for Artists. This means we'll be able to Create, Edit/Update, and Destroy artists. Additions to Songs functionality will be a bonus.

# You Do: To begin the class...

I'd like you to take **10 minutes** to do two things, the steps for which are detailed in this lesson plan:

1. [Clone down and set up the repo for this lesson](http://github.com/ga-dc/tunr_mongo_oojs).
2. Turn and talk with the person next to you about the 5 questions below.

You may have used [a different repo](https://github.com/ga-dc/tunr_node_oojs) before. That one uses an ORM called Sequelize; this one uses MongoDB. Any front-end Javascript you wrote for that one will work perfectly fine with this one -- you should be able to just copy it over. Even so, we'll go through the steps from yesterday together to get this new repo set up.

## 1. Set up the repo

If you don't have Mongo installed on your computer yet:

```sh
$ brew update
$ brew install mongo
$ npm install --global mongod
$ sudo mkdir -p /data/db
$ ls -ld /data/db
$ sudo chmod 0755 /data/db
$ sudo chown -R $USER /data/db
```

```sh
$ git clone git@github.com:ga-dc/tunr_mongo_oojs.git
$ cd tunr_mongo_oojs
$ npm install
$ mongod # Run just this line in another Terminal window
$ node db/seeds.js
$ nodemon app.js
```

If `mongod` doesn't seem to work, instead try:

```sh
$ mongod --config /usr/local/etc/mongod.conf
```

## 2. Turn and talk

- Pick one of the following and make an argument for it:
  - Tunr should have an object-oriented front-end.
  - Tunr should not have an object-oriented front-end.
  - It doesn't matter whether Tunr has an object-oriented front-end.
- How would you write `Artist.fetch()` in ActiveRecord? How about `Artist.prototype.fetchSongs()`?
- Pick one of the following and make an argument for it:
  - Tunr should be a single-page app.
  - Tunr should be a multi-page app.
- What's the difference between `Artist.methodName = function(){}` and `Artist.prototype.methodName = function(){}`?
- Describe an app with a purpose completely different from Tunr that you could turn Tunr into with as little effort as possible.

# I do: Putting it together

## Exposing the Back-End

The backend exposes our app's data and functionality to the web (via HTTP). The
backend has a few parts:

- `app.js` - Loads express and other libraries, as well as the other parts of our app.  
- `models/` - Serve as the interface to the database, so our app can easily interact with our data. They look pretty bare but have been given a lot of functionality underneath the surface, just like the models with `< ActiveRecord::Base` in Rails.
- `controllers/` - Define what routes our app responds to, and how to respond. This is usually by either finding data and returning it as JSON, or accepting JSON data to edit/update our DB
- `public/` - Where you put any file you'd want a user to be able to access by typing its URL into their browser's address bar: your images, JS files, CSS files, and any "static" HTML pages -- that is, ones in which you're not using Handlebars to inject code.
- `views/` - **...doesn't exist.** Normally, this is where all the `.hbs` files would live, just like the `.erb` files in Rails, which let you inject code right into your HTML.

But we're making this a **Single-Page Application**, and we're not using Handlebars.

Q. What makes something a "single-page app"? How is a SPA different from anything else?
---

> I wouldn't consider a website with one page of HTML to be a single-page app. It might be single-page, but it's not an app: an app lets you manipulate data and usually save it somewhere.

Single-page apps are most often one page of HTML *with attached Javascript* that lets you interact with an API.

That's exactly what this app is doing. However, instead of using an external API, like Giphy or the IMDB, it's using an *internal* API.

Q. We could probably do this more simply using a bunch of Handlebars views. Why are we instead making a single-page AJAX app?
---

> Single-page apps make for a much more seamless user experience: there aren't page refreshes anywhere. A page refresh here and there isn't a big deal, but imagine if Trello had a page refresh every time you made a change to a Trello card. It would be terrible to use!

Additionally, you're probably going to have *some* Javascript on your page anyway. This way, your concerns are super-separated: Express is solely responsible solely for interacting with the database, and your front-end JS is solely responsible for rendering that data. Contrary to all appearances, this can greatly simplify the process of maintaining your app.

Finally, this makes your app really easy to extend. This Tunr is basically two separate apps: the API, and the front-end that uses the API. You could host your front-end on GH Pages and the API on a completely separate server across the planet without having to change a line of code. Using Handlebars, your front-end and back-end absolutely must be on the same server.

This also means other people can write front-ends to interface with your API. This is an awesome feature for apps to have: it cultivates a lot of customer loyalty since people can make their own interfaces to work with your data. 

### So, about the missing `views` folder...

Since we're not using Handlebars, we may as well just use a single `index.html` file. Since Node doesn't need to do anything fancy to render a plain HTML file, we may as well put it in the `public` folder.

## The Front-End

Our front-end code runs in the browser, and interfaces with the backend (over
HTTP) to request or update data, and then render the appropriate HTML.

- `script.js` - This is the main file that waits for the page to finish loading, and then starts up our app. In this case, it fetches all artists, and then displays them.  
- `models/` - These classes are responsible for representing our data in a structured way, and for providing an interface to sync that data with the server. This keeps the rest of our code (i.e. views) clean of ajax requests.  
- `views/` - These classes are responsible for...  
  - Rendering models into HTML  
  - Responding to events (e.g., clicking on buttons) appropriately.  

## Design choices

Q. Here at GA DC, we *don't* teach the right way to make an Express app. Why not?
---

> Trick question: there isn't a right way! Almost everything you see in this app -- file names, variable names, function names -- can be changed to something else. They are what they are because it's what made sense to the instructor who wrote this code.

Q. Why do you have to use an OOJS front-end with an Express back-end?
---

> Trick question: you don't! In fact, you can make an Express app without any front-end Javascript at all.

Express is almost exactly the same thing as Sinatra, only it happens to be written in Javascript instead of Ruby. We didn't use Javascript on any of our Sinatra apps -- although we could have!

If you do want to use front-end Javascript on an Express app, you're free to write that Javascript however you want: use jQuery, or don't use jQuery; be really object-oriented, or don't be object-oriented at all.

We happen teach OOJS and Express so closely together largely because they look very similar.

### Why be object-oriented?

The tricky thing about WDI is that you don't necessarily feel the "pain" that would make you want to write object-oriented Javascript. Our apps are really simple.

However, even with simple apps, you can find yourself winding up with a single `script.js` file that's 500 lines long. That's probably already happened to many of you. You may not realize how much time you spend scrolling around looking for code, but it can add up to a tremendous amount.

Object-oriented Javascript probably won't make your app run any faster. It will make the process of *developing and maintaining* your app much faster. The frameworks we'll learn next, Angular and Backbone, are based heavily on the concepts of object-oriented Javascript -- although they do most of the grunt work for us!

### How to tell when you'd benefit from making your app more objected-oriented:

You look at a file of code and you find...
- It's more than 100 lines long
- You spend more than 5 seconds looking for a piece of code
- 3 or more function names share a word (e.g. `songCreate`, `songUpdate`, `songDestroy`...)
- A certain variable is used in less than 25% of the lines of the function in which it appears
- You want to put off working on something else, and/or you want to look like you know what you're doing

# We do: Getting caught up from yesterday

Let's add in the code from yesterday. We're just going to add in the code for Artists as a refresher, and so we can answer lingering questions. Then, I'll ask you to check out a branch that has all the code for reading (but not creating, updating, or deleting) artists and songs.

Q. Which 4 files are we missing from the `public/` directory?
---
> Model files and view files for Artists and Songs.

Let's add those: 

```sh
$ touch public/js/models/artist.js
$ touch public/js/models/song.js
$ touch public/js/views/artistView.js
$ touch public/js/views/songView.js
```

To use them we'll need to include them in `index.html`:

```sh
<script src="js/models/artist.js"></script>
<script src="js/models/song.js"></script>
<script src="js/views/artistView.js"></script>
<script src="js/views/songView.js"></script>
<script src="js/script.js"></script>
```

Next, we'll add this to the Artist model:

```js
var Artist = function(info){
  this.name = info.name;
  this.photoUrl = info.photoUrl;
  this.nationality = info.nationality;
  this.id = info.id;
};
```

Q. This doesn't seem very DRY. What's the point of all the `this...info` stuff?
---
> Less typing.

We could totally write something like:

```js
var Artist = function(info){
  this.info = info;
}
```

...but that would mean to get an artist's name you'd write `artist.info.name`. The other way you can just write `artist.name`.

Now we need to be able to "fetch" all the artists. This is exactly like doing `Artist.all` in Rails.

Q. In which file should this `Artist.fetch` method go?
---
> The model file.

Add this:

```js
Artist.all = []
Artist.fetch = function(){
  var url = "http://localhost:3000/artists";
  var request = $.getJSON(url).then(function(response){
    for(var i = 0; i < response.length; i++){
      Artist.all.push(new Artist(response[i]));
    }
  }).fail(function(response){
    console.log("js failed to load");
  });
  return request;
};
```

Q. From the top to the bottom, what does this snippet do?
---
> First it loads some JSON from a URL, then it parses that JSON and creates a new Artist model from each thing in it, and saves all those Artists to an array. If it fails, it throws an error.

We need to be able to fetch songs as well. On the one hand it seems like that should go in the Song model. On the other hand, we're not going to be getting any songs without getting an Artist first. For that reason we chose to put it in the Artist model. However, either way is correct!

```js
Artist.prototype = {
  fetchSongs: function(){
    var artist = this;
    var url = "http://localhost:3000/artists/" + artist.id + "/songs";
    artist.songs = [];
    var request = $.getJSON(url).then(function(response){
      for(var i = 0; i < response.length; i++){
        artist.songs.push(new Song(response[i]));
      }
    }).fail(function(repsonse){
      console.log("js failed to load");
    });
    return request;
  }
}
```

Q. The first `fetch` was attached to `Artist`; this is attached to `Artist.prototype`. Why?
---
> The first way was like `Artist.all`. This way is like `@artist.songs`. Using `prototype` makes it an instance method as opposed to a class method.

When we get all the Artists we're doing it without a particular Artist in mind. When we get Songs we're always going to have a particular Artist in mind. 

Now we can get Artist data, but can't make it show up on the page. We'll need the Artist View for that.

```js
var ArtistView = function(artist){
  this.artist = artist;
  this.$el = $("<div class='artist'></div>");
  this.render();
  $(".artists").append(this.$el);
};

ArtistView.prototype = {
  render: function(){
    var self = this;
    self.$el.html(self.artistTemplate());
    var showButton = self.$el.find(".showSongs");
    var songsDiv   = self.$el.find("div.songs");
    songsDiv.hide();
  },
  artistTemplate: function(){
    var artist = this.artist;
    var html = $("<div>");
    html.append("<h3>" + artist.name + "</h3>");
    html.append("<img class='artist-photo' src='" + artist.photoUrl + "'>");
    html.append("<button class='showSongs'>Show Songs</button>");
    html.append("<div class='songs'></div>");
    return(html);
  }
};
```

The artistTemplate is pretty straightforward: you insert an Artist, and out comes some HTML. This is currently an instance method, although it may be better off as a class method. Again, there's no right way!

Q. Why does `el` have a dollar sign in front of it?
---
> It doesn't have to. The whole reason is just to remind you that $el is a jQuery element, instead of a regular HTML element.

The last part is to make the browser run all this stuff as soon as the page loads. We'll do this in the `script.js` file:

```js
$(document).ready(function(){
  Artist.fetch().then(function(artists){
    Artist.all.forEach(function(artist){
      var view = new ArtistView(artist)
      view.render();
    })
  })
});
```

That's all we're going to do ourselves. What's left is rendering songs, and those buttons to show and hide songs. To get that code, `git checkout read`.

# BREAK

# CUD

## Turn & Talk (5 minutes)

Look at the following two pictures. They show a summary of the methods we're
going to have at the end of today in our views. The highlighted ones are the
ones we'll be working on in this lesson.  

- What's the purpose of the `reload` function?
- What's the difference between `renderEditForm`, `updateArtist`, and `artistEditTemplate`?

### Artist Model Methods
![artist model methods](images/artist_model_methods.png)

### Artist View Methods
![artist view methods](images/artist_view_methods.png)

# You do: Editing (20 minutes)

**Heads up:** Our first feature, editing, will be the most intense!

Overall, we want our feature to work like this:  

1. Click the edit button.
2. The view changes such that the various bits of text become editable fields.
3. We edit the text in the fields and click submit.
4. The app updates the database.
5. The app re-renders the artist to look like before, but with updated information.

The lesson plan provides very detailed steps on how to do this. I'd like you to **go through this part of the lesson plan yourself** with the person next to you and add the functionality it describes to your Tunr.

### Adding the Edit Button

The edit button needs to be in our existing `artistTemplate`, since it
needs to be visible on each artist's "show" view.  

Let's add the button to the template:  

```js
// ...
html.append("<button class='showSongs'>Show Songs</button>");
html.append("<button class='editArtist'>Edit Artist</button>");
html.append("<div class='songs'></div>");
// ...
```

Now we need to update our `render` method to add the appropriate event listener
on the button:  

```js
var editButton = self.$el.find(".editArtist");

editButton.on("click", function() {
  self.renderEditForm();
});
```

Note that we're saying "when I click on the edit button", call the `renderEditForm` method, so we should probably write that next!  

### Rendering the Edit Form

Just like our rendering for the "show view", we'll need a method that:

1. Uses a template to build the HTML.  
2. Updates the `$el` to contain the new HTML.  
3. Adds any event listeners as needed.  

#### Making the Edit Form Template

Our template for the edit form is pretty similar to the one we wrote for "show". The main difference is that here we're using `<input>` tags for `name` and `photoUrl`, that are pre-populated with the artist's current values.  

```js
artistEditTemplate: function() {
  var artist = this.artist;
  var html = $("<div>");
  html.append("<input name='name' value='" + artist.name + "'>");
  html.append("<img class='artist-photo' src='" + artist.photoUrl + "'>");
  html.append("<input name='photoUrl' value='" + artist.photoUrl + "'>");
  html.append("<button class='updateArtist'>Update Artist</button>");
  html.append("<button class='deleteArtist'>Delete Artist</button>");
  return(html);
}
```

#### Updating The El

Now that we have the template, let's write our `renderEditForm` method:  

Right now, we've tackled using the template to generate HTML, and using that
HTML to update our view's `$el`.  

```js
renderEditForm: function() {
  var self = this;
  self.$el.html(self.artistEditTemplate());
},
```

But notice our submit button doesn't do anything!  

#### Adding the Button Event Listener

Let's add an event listener. When the user clicks the **Update Artist** button,
we want to run a function that updates the artist.  

```js
renderEditForm: function() {
  var self = this;
  self.$el.html(this.artistEditTemplate());
  self.$el.find(".updateArtist").on("click", function() {
    self.updateArtist();
  });
},
```

> NOTE: The use of `$el.find(some_selector)` to ensure we only add an event
listener to the button that this view is responsible for (and not any other
views, like for a different artist).

At this point, we've added the functionality to show the edit form. Next, we
need to actually take the data from the form and update the artist accordingly.  

## Updating Artist on Submission

Once the user has submitted the form, we need to:  

1. Gather the data from the form.  
2. Ask the front-end `Artist` model to update using the gathered data.  
3. Have the `Artist` model make an AJAX `patch` (similar to a `put`) request to
   our back-end.  
4. Update the view to show the artist with the updated information.  

### The `updateArtist` method

The `updateArtist` method in our view is what will orchestrate this
functionality.  

### Gathering Data from the Form

First, we need to gather the data the user entered, then, we call the `update`
method on our artist, passing in the new data. (We'll make the `update` method)
next.  

```js
updateArtist: function() {
  var self = this;
  var data = {  
    name: $('input[name=name]').val(),
    photoUrl: $('input[name=photoUrl]').val()
  };
  self.artist.update(data);
}
```

### Adding `update` and `reload` Methods to our Artist Model

Since our view has asked the artist to update, we need to write that method!  

This method takes the data passed in, and uses it to make an AJAX **patch**
request to our backend. The backend then responds with the updated artist info.  

Note that we have to specify in our AJAX call that the method is patch. This
is the appropriate verb to specify that we may only update some attributes.  

We also have to specify that we're sending JSON (the `contentType`), and we have
to pass in the data to use for the update as JSON. We do that using
`JSON.stringify()`. The data we're converting to JSON is the data that came from
the form.  

```js
update: function(artistData) {
  var self = this;

  var url = "http://localhost:3000/artists/" + this.id;
  var request = $.ajax({
    url: url,
    method: "patch",
    data: JSON.stringify(artistData),
    contentType : 'application/json'
  }).then(
    function(updatedArtistInfo) {self.reload(updatedArtistInfo);}
  );
  return request;
},
```

Note that this method only updates the backend! We also need to `reload` our
copy of the artist that in our front-end app. To do that, we call the
`reload` method (which we're about to write) after the backend has updated the
artist successfully.  

#### Reloading

To reload the artist, we take the updated artist data, and use it to update
each property on our artist model:

```js
reload: function(newData){
  for(var attrname in newData) {
    this[attrname] = newData[attrname];
  }
}
```

### Updating the `el` (show updated artist info)

Back in the view, we should update it so that **after** the update has been
made, and the artist has been reloaded, we re-render the 'show' view for the
artist (to get rid of the form, and display the updated data).

```js
updateArtist: function() {
    var self = this;
    var data = {  
      name: $('input[name=name]').val(),
      photoUrl: $('input[name=photoUrl]').val()
    };
    self.artist.update(data).then(function() { self.render(); });
  },
```

Why can we call `.then` on `artist.update()`? That's because in our update
method, we returned the jQuery promise object. In other words, updating an
artist is inherently asyn, it may take a while, so the method lets us ask "when
you're done updating, run this callback". In this case, the callback is to
render the show view.  

# We do: Bring it back for questions

# You do: Deleting Artists (30 minutes)

For starter code, checkout the `read-update` branch.

For solution code, checkout the `create-read-update-delete` branch.

Implement a feature so that the `edit` form has an additional button, which is labeled 'Delete Artist'. When the button is clicked, it should:  

1. Call the `destroy` method on the Artist model. (you'll need to write that).  
2. That method should make an AJAX delete request to delete the artist by ID.  
3. Once the response has come back (and not before!) you should fade out the
   artist view's $el. (jQuery has a fadeOut method that makes this easy!)  

# Bonuses

Try to implement any of the following features...

## Creating New Artists

At the top of the page is a link or button for "Add Artist". When the button is
clicked, a form should appear (empty). Submitting the form should:  

1. Create a new artist on the backend.  
2. Update the view to render the new artist.  

## Playing Songs

Add a button next to each song. When the button is clicked, it should:  

1. Add an `audio` element tied to the song's `previewUrl`.  
2. Stop / Remove any other auido players on the page.  

## Update URLs (pushState)

Use `history.pushState` to update the url and reflect what you're editing. You
should be able to reload the page and go right back to the edit view.  

## CRUD songs

Add full CRUD functionality for songs. Either make a new main view like for
artists, or add edit / delete buttons next to each song, and a "new song" button
for each artist.  

# Summary

The Ruby language is very forgiving, whereas the Rails framework is pretty strict. The Javascript language is pretty strict, whereas the Node framework -- and the whole process of making a Javscript app -- is very forgiving.

This topic is tough. Don't sweat it if you're having trouble keeping all these prototypes and instances and this-es straight. Object-oriented Javascript is one of those things you don't really need until you need it. There's usually not a whole lot of need for it while your apps are small. However, if you find the complexity of your app is starting to keep you from wanting to work on it, then making it object-oriented could be your saving grace.

For an example of complex and hard-to-maintain Javascript that would benefit from OOJS, take a look at [this old Javascript that Robin wrote many moons ago](ugly.js). What are some of the "code smells" and faux pas it contains? How could it be refactored? What could be made into objects?

> To Robin's credit, it's very well-indented.

# Questions

- Pick one of the following and make an argument for it:
  - Tunr should have an object-oriented front-end.
    > It separates concerns, which in turn makes code easier to read.
  - Tunr should not have an object-oriented front-end.
    > It makes a relatively simple app initially much more complex.
  - It doesn't matter whether Tunr has an object-oriented front-end.
    > There's no "right way" to build a single-page app. Neither way will make the app run any faster.
- How would you write `Artist.fetch()` in ActiveRecord? How about `Artist.prototype.fetchSongs()`?
  > `Artist.all`, and `@artist.songs`
- Pick one of the following and make an argument for it:
  - Tunr should be a single-page app.
    > It separates concerns, and makes the app more extensible: anyone can create an interface for it using the back-end API.
  - Tunr should be a multi-page app.
    > Handlebars may be easier to work with than front-end Javascript for small apps. Page refreshes don't really detract from this app's usability.
- What's the difference between `Artist.methodName = function(){}` and `Artist.prototype.methodName = function(){}`?
  > The first creates a class method, which usually does something with or to all Artists. The second creates an instance method, which usually does something with or to a particular Artist.
- Describe an app with a purpose completely different from Tunr that you could turn Tunr into with as little effort as possible.
  > Famous orators and speeches
  > Animals and mating calls
  > Famous TV and film characters and their catch phrases

# Further Reading

- [Yahoo: A Javascript Module Pattern](http://yuiblog.com/blog/2007/06/12/module-pattern/): Describes how to use OOJS to considerably tidy up your code -- and why you'd want to!
- [Eloquent Javascript, Chapter 8: OOJS](http://eloquentjavascript.net/1st_edition/chapter8.html): This book is famous. Chapter 8 walks you through the whole process of creating objects to making them interact with each other.
