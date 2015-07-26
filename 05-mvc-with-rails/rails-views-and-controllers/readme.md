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

## Route/Controller/action relationship (10/15)
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
