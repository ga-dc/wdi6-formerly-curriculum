# Views and Controllers

## Learning Objectives
- Describe the role of controllers and views in a Rails app
- Explain how the router directs requests to a specific controller and action
- Explain how controller actions map to specific views
- Describe the Rails convention for implicity rendering a view from an action
- Use `strong_params` to limit what attributes can be modified
- Describe the role of instance variables in sharing information between an action and its view
- Describe the difference between a `redirect` and a `render`

## Opening Framing (5/5)
So we've gone over how to port an existing Sinatra app into a rails app. We've also talked about models and migrations. The next layer we want to discuss more in depth is Views and Controllers. What's really happening when someone goes to a route that belongs to our site?

## Route/Controller/action relationship (15/20)
Let's start by typing rake routes in our current code base:

```bash
Prefix Verb   URI Pattern                 Controller#Action
   artists GET    /artists(.:format)          artists#index
artists_new GET    /artists/new(.:format)      artists#new
           POST   /artists(.:format)          artists#create
           GET    /artists/:id(.:format)      artists#show
           GET    /artists/:id/edit(.:format) artists#edit
           PUT    /artists/:id(.:format)      artists#update
           DELETE /artists/:id(.:format)      artists#destroy
     songs GET    /songs(.:format)            songs#index
 songs_new GET    /songs/new(.:format)        songs#new
           POST   /songs(.:format)            songs#create
           GET    /songs/:id(.:format)        songs#show
           GET    /songs/:id/edit(.:format)   songs#edit
           PUT    /songs/:id(.:format)        songs#update
           DELETE /songs/:id(.:format)        songs#destroy
```

Lets take the index action for example.

- The user types in a url that matches our server. The router will say, "I recognize this route! I know exactly what to do".

- The router says, "a GET request to the '/artists'? No problem, hey artists controller you need to perform the index action"

- The artists controller says, "An index action? I got one of those." Let see, it says here I need to ask the model(Active Record) for some information, hey model, i need all of the artists.

- Thanks for all the artists, Now I'm going to send all this information to the view. The view than generates a response to the client.


## Render vs Redirect (20/40)
Let's take a closer look at index action of our Artists Controller:

```ruby
def index
  @artists = Artist.all.order(:id).reverse
end
```

If we remember back to Sinatra, you'll notice that we're not explicitly telling the application which view file to render.

That's because rails has implicit rendering. Basically rails is smart enough to know if the artists controller action is called index, then it will look for the index view in the artist folder.

You can explicity change the implicit render by calling the `render` method in the action of a controller. Something like this:

```ruby
def index
  @artists = Artist.all.order(:id).reverse
  render :index
end
```

You could also redirect rather than render. Who can tell me the differences between redirecting and rendering? (ST-WG)

We would never do something like this, but if we did.

```ruby
def index
  @artists = Artist.all.order(:id).reverse
  redirect_to "https://www.google.com"
end
```

The request would hit our router, then hit the controller index action and query the database. Then it immediately submits a request to the route provided.

## Instance variables (15/55)
We use instance variables in our controller actions, so we can have programmatic access to variables inside of our views. More often than not these instance variables will contain objects from the database.

Let's take our artists controller show action and add some things.
```ruby
def show
  @artist = Artist.find(params[:id])
  @songs = @artist.songs
  @food = "pizza"
end
```

We are looking for an artist in our database by it's id. We find it and store it in an instance variable. We can now use that inside the `app/views/artists/show.html.erb`

> It should be noted that while we practice a separation of concerns we aren't just limited to querying for only artists in the artists controller. Additionally, we can store just about anything we could have normally stored in a ruby variable.

In our `app/views/artists/show.html.erb`
```html
<h1>My favorite food is <%= @food %></h1>
<h2><%= @artist.name %> <a href="/artists/<%= @artist.id %>/edit">(edit)</a></h2>
<h4><%= @artist.nationality %></h4>

<img class='artist-photo' src="<%= @artist.photo_url %>">

<h3>Songs</h3>
<ul>
  <% @songs.each do |song| %>
    <!-- build the list element for each song -->
    <li>
      <a href="/songs/<%= song.id %>">
        <%= song.title %> (<%= song.album %>)
      </a>
    </li>

  <% end %>
</ul>
```

Here, in this view, you can see the use of all three instance variables we defined in the show action of the artists controller.

## Break (10/65)

## Sanitization/Strong Params 30/95
Rails is setup such that it doesn't allow just any old parameters to be accompanied by a post request. This is why we had to do some additional configuration changes to get our Sinatra forms to work.

Since it is horrible practice to configure it the way we did, let's go back and change it back to having security.

We're going to remove `config.action_controller.permit_all_parameters = true` from our `config/application.rb`

As well as uncomment `protect_from_forgery with: :exception` in our `app/controllers/application_controller.rb`

What's ultimately going to happen when we update our forms?

Any time a userviews a form to create, update or destroy a resource, the rails app create a random `authenticity_token` and stores it in a session. When the user than submits the form, rails will look for the authenticity_token compares it to the one stored in the session, and if they match allow the request to continue.

If someone was trying to update our database in some way other than our application, it would be denied.

The first thing that I want do is add the authenticity_token in our `new` form.

Add the hidden input field that contains the auth token in `app/views/artists/new.html.erb':

```html
<form action="/artists" method="post" >
  <input type="hidden" name="authenticity_token" value="<%= form_authenticity_token %>">
  ... more form code
```

Now we should update our Artists controller a bit.

First let's create a private method that will allow us to pull information from the form.

in `app/controllers/artists_controller.rb`:
```ruby
private
def artist_params
  params.require(:artist).permit(:name, :photo_url, :nationality)
end
```

> the require method ensurezs that a specific parameter is present. Throws an error otherwise. The permit method returns a copy of the parameters object, returning only the permitted keys and values.

> note that we encapsulate the artist_params in a private method because we only want this available to this particular class and it shouldn't work outside the scope of the controller

The only thing we have left to do is update our controller actions that use params to create or update an artist.

in `app/controllers/artists_controller.rb`:

```ruby
#### before
def create
  @artist = Artist.new(params[:artist])
  if @artist.save
    redirect_to "/artists/#{@artist.id}"
  else
    redirect_to "/posts/new"
  end
end

def update
  @artist = Artist.find(params[:id])
  @artist.update(params[:artist])
  redirect_to "/artists/#{@artist.id}"
end  

#### after  
def create
  @artist = Artist.new(artist_params)
  if @artist.save
    redirect_to "/artists/#{@artist.id}"
  else
    redirect_to "/posts/new"
  end
end

def update
  @artist = Artist.find(params[:id])
  @artist.update(artist_params)
  redirect_to "/artists/#{@artist.id}"
end
```

Great, now we're protected!

## You do - (30/125)
- Incorporate strong params for the song model now.

## Open Review (25/150)
