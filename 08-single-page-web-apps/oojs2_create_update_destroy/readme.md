# OOJS on the Front End - Part Deux: Create, Update, Destroy

## Learning Objectives

- Use OOJS to structure front end code
- Build model objects that create, update, destroy data on the server
- Build view objects that render forms and interact with model objects
- Describe the role of model objects on the Front-end
- Describe the role of view objects on the Front-end


## Framing

Our goal for today is to complete our app so that we have basic CRUD
functionality for artists. This means we'll be able to Create, Edit/Update,
and Destroy artists. We won't really be adding functionality to songs, given
the time, but the same principles apply.

Overall, our app has a couple of parts that work together to create that lovely
Single Page App Experience (SPA® Experience) ;)

### The Database

Postgres stores our data in a structured manner, so that we can find/update/destroy
quickly.

### The Backend

The backend exposes our app's data and functionality to the web (via HTTP). The
backend has a few parts:

* `app.js` - Loads express and other libraries, as well as the other parts of our app
  * `models` (Sequelize) -  these serve as the interface to the database, so our express app
    can easily interact with our data
  * `controllers` - define what routes our app responds to, and how to respond...
    this is usually by either finding data and returning it as JSON, or accepting
    JSON data to edit/update our DB
  * `views` - define how our app sends back HTML (when needed). In our case, our
    app only really sends back the `layout.hbs`, which is used to send the initial
    page to the user. This page provides the skeleton of our SPA, and also tells
    the user's browser to load the appropriate front-end JS.
  * `public` - where our front-end JS lives. This is in public so it can be sent
    to the user's browser.

### The Front-End

Our front-end code runs in the browser, and interfaces with the backend (over
HTTP) to request or update data, and then render the appropriate HTML.

* `script.js` - this is the main file that waits for the page to finish loading,
  and then starts up our app. In this case, it fetches all artists, and then
  displays them.
  * `models` - these classes are responsible for representing our data in a
  structured way, and for providing an interface to sync that data with the
  server. This keeps the rest of our code (i.e. views) clean of ajax requests.
  * `views` - these classes are responsible for:
    * rendering models into HTML
    * responding to events (clicking on buttons, etc) appropriately

## Overview of Today's Front-end

### Turn & Talk (10 minutes)

Look at the following two pictures... they show a summary of the methods we're
going to have at the end of today in our views. The highlighted ones are the
ones we'll be working on in this lesson.

Take 5 minutes to talk with your partner about what you think each method is
supposed to do.

#### Artist Model Methods
![artist model methods](images/artist_model_methods.png)

#### Artist Model Methods
![artist view methods](images/artist_view_methods.png)

## Editing Artists

Our first feature, editing, will be the most intense, so don't worry, it gets
better after this!

Overall, we want our feature to work like this:

1. Click the edit button
2. The view changes such that the various bits of text become editable fields
3. We edit the text in the fields and click submit.
4. The app updates the database
5. The app re-renders the artist to look like before, but with updated information

Let's take it step by step!

### Adding the Edit Button

The edit button needs to be in our existing `artistTemplate`, since it
needs to be visible on each artist's "show" view.

Let's add the button to the template:

```js
// html.append("<button class='showSongs'>Show Songs</button>");
html.append("<button class='editArtist'>Edit Artist</button>");
// html.append("<div class='songs'></div>");
```

Now we need to update our `render` method to add the appropriate event listener
on the button:

```js
var editButton = self.$el.find(".editArtist");

editButton.on("click", function() {
  self.renderEditForm();
});
```

Note that we're saying "when I click on the edit button", call the
`renderEditForm` method, so we should probably write that next!

### Rendering the Edit Form

Just like our rendering for the "show view", we'll need a method that:

1. Uses a template to build the HTML
2. Updates the `$el` to contain the new HTML
3. Adds any event listeners as needed

#### Making the Edit Form Template

Our template for the edit form is pretty similar to the one we wrote for "show".
The main difference is that here we're using `<input>` tags for `name` and
`photoUrl`, that are pre-populated with the artist's current values.

```js
artistEditTemplate: function(artist) {
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
  self.$el.html(this.artistEditTemplate(this.artist));
},
```

But notice our submit button doesn't do anything!

#### Adding the Button Event Listener

Let's add an event listener. When the user clicks the **Update Artist** button,
we want to run a function that updates the artist:

```js
renderEditForm: function() {
  var self = this;
  self.$el.html(this.artistEditTemplate(this.artist));

  self.$el.find(".updateArtist").on("click", function() {
    self.updateArtist();
  });
},
```

Note the use of `$el.find(some_selector)` to ensure we only add an event
listener the the button that this view is responsible for (and not any other
views, like for a different artist).

At this point, we've added the funtionality to show the edit form... next we
need to actually take the data from the form and update the artist accordingly.

## Updating Artist on Submission
### The `updateArtist` method
### Adding `update` and `reload` methods to our Artist model
### Updating the `el` (show updated artist info)

## Deleting Artists
### Adding the "Delete" button (on the Edit Form)
### Responding to the Delete Action
### Adding the `destroy` method to our Artist Model
### Updating the View (Fading Out the `el`)

## Creating New Artists

## Summary
