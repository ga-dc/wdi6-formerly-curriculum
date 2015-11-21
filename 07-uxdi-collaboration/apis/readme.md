# APIs

## Learning Objectives

- Describe what an API is, and why we might use one.
- Explain the common role of JSON on the web.
- Describe the purpose and syntax of `respond_to`
- Make a Rails app that provides a JSON API.
- Use an external API (via HTTParty) to gather data and utilize it in a Rails application

## What is an API?

**Basically, an API is a service that provides raw data for public use.**

API stands for "Application Program Interface", and technically applies to all of software design. However, since the explosion of information technology, the term now commonly refers to web URLs that can be accessed for raw data.

APIs publish data for public use. As third-party software developers, we can access an organization's API and use their data within our own applications.

**Have a look at some stock quotes...**

* [http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL](http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL)
* [http://dev.markitondemand.com/Api/Quote/json?symbol=GOOGL](http://dev.markitondemand.com/Api/Quote/json?symbol=GOOGL)

### Why Just Data?

Sometimes thats's all we need. All this information, from all these browsers and all these servers, has to travel through the network. That's almost certainly the slowest part of the request cycle. We want to minimize the bits. There are times when we just need the data. For those times, we want a concise format.   

## What is serialized data?

All data sent via HTTP are strings. Unfortunately, what we really want to pass between web applications is *structured data*, as in: native arrays and hashes. Thus, native data structures can be *serialized* into a string representation of the data. This string can be transmitted, and then parsed back into data by another web agent. There are two major serialized data formats:

* **JSON** stands for "JavaScript Object Notation", and has become a universal standard for serializing native data structures for transmission. It is light-weight, easy to read, and quick to parse.

```json
{
  "users": [
    {"name": "Bob", "id": 23},
    {"name": "Tim", "id": 72}
  ]
}
```

* **XML** stands for "eXtensible Markup Language", and is the granddaddy of serialized data formats (itself based on HTML). XML is fat, ugly, and cumbersome to parse. However, it remains a major format due to its legacy usage across the web. You'll probably always favor using a JSON API, if available.

```
<users>
  <user id="23">
    <name><![CDATA[Bob]]></name>
  </user>
  <user id="72">
    <name><![CDATA[Tim]]></name>
  </user>
</users>
```

**Many APIs publish data in multiple formats, for example...**

* [http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL](http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL)
* [http://dev.markitondemand.com/Api/Quote/xml?symbol=AAPL](http://dev.markitondemand.com/Api/Quote/xml?symbol=AAPL)

## Where Do We Find APIs?

APIs are published everywhere. Chances are good that most major content sources you follow online publish their data in some type of serialized format. Heck, [even Marvel publishes an API](http://developer.marvel.com/documentation/getting_started). Look around for a "Developers" section on major websites, or ask the Google Answer-Bot.

**That sounds hard. Can't you just give me a freebie?**

Okay... try the [Programmable Web API Directory](http://www.programmableweb.com/apis/directory) or the [Public APIs Directory](http://www.publicapis.com/).

## What Is An API Key?

While the majority of APIs are free to use, many of them require an API "key" that identifies the developer requesting data access. This is done to regulate usage and prevent abuse. Some APIs also rate-limit developers, meaning they have caps on the free data allowed during a given time period.

**Try hitting Games Radar...**

* No key: [http://api.gamesradar.com/search/gameName/pc/civ](http://api.gamesradar.com/search/gameName/pc/civ)

* With key: [http://api.gamesradar.com/search/gameName/pc/civ?api_key=579bd0ebcda04f60b4eceffafea3f915](http://api.gamesradar.com/search/gameName/pc/civ?api_key=579bd0ebcda04f60b4eceffafea3f915)

## Good Starter APIs

There is an immense number of APIs out there from which you can pull data.

| API | Sample URL |
|-----|------------|
| **[This for That](http://itsthisforthat.com/)** | http://itsthisforthat.com/api.php?json |
| **[iTunes](https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html)** | http://itunes.apple.com/search?term=adele |
| **[Giphy](https://github.com/Giphy/GiphyAPI)** | http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC |
| **[OMDB API](http://www.omdbapi.com/)** | http://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1 |
| **[StarWars](http://swapi.co/)** | http://swapi.co/api/people/3 |
| **[Stocks](http://dev.markitondemand.com/MODApis/)** | http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL |
> Note the variety in the URLs used to access these APIs. Do any of them look similar to what you've made in class?

## A Closer Look at an API Request

Let's simulate a basic HTTP request to an API. We're going to use Postman, a Chrome plug-in for making HTTP requests: [Download Postman](https://www.getpostman.com/).

* Type in the "url"
* Ensure the "method" is "GET"
* Press "Submit".  

## RESTful Review (10 min)

Today, we're going to use Rails to create our own API from which we can pull information. How do we go about doing that? Let's demonstrate that using Tunr.  
* **[STARTER CODE](https://github.com/ga-dc/tunr_rails_json)**

You'll recall earlier when we used an HTTP request to retrieve information from a 3rd party API. That API received a GET request in the exact same way that the Rails application we have build in class thus far have received GET requests.
* All the requests that our Rails application can accept are listed when we run `rake routes` in the Terminal. We create RESTful routes and corresponding controller actions that respond to `GET` `POST` `PATCH` `PUT` and `DELETE` requests.

```bash
Prefix            Verb   URI Pattern                                   Controller#Action
root              GET    /                                             artists#index
songs             GET    /songs(.:format)                              songs#index
artist_songs      GET    /artists/:artist_id/songs(.:format)           songs#index
                  POST   /artists/:artist_id/songs(.:format)           songs#create
new_artist_song   GET    /artists/:artist_id/songs/new(.:format)       songs#new
edit_artist_song  GET    /artists/:artist_id/songs/:id/edit(.:format)  songs#edit
artist_song       GET    /artists/:artist_id/songs/:id(.:format)       songs#show
                  PATCH  /artists/:artist_id/songs/:id(.:format)       songs#update
                  PUT    /artists/:artist_id/songs/:id(.:format)       songs#update
                  DELETE /artists/:artist_id/songs/:id(.:format)       songs#destroy
artist_genres     GET    /artists/:artist_id/genres(.:format)          genres#index
                  POST   /artists/:artist_id/genres(.:format)          genres#create
new_artist_genre  GET    /artists/:artist_id/genres/new(.:format)      genres#new
edit_artist_genre GET    /artists/:artist_id/genres/:id/edit(.:format) genres#edit
artist_genre      GET    /artists/:artist_id/genres/:id(.:format)      genres#show
                  PATCH  /artists/:artist_id/genres/:id(.:format)      genres#update
                  PUT    /artists/:artist_id/genres/:id(.:format)      genres#update
                  DELETE /artists/:artist_id/genres/:id(.:format)      genres#destroy
artists           GET    /artists(.:format)                            artists#index
                  POST   /artists(.:format)                            artists#create
new_artist        GET    /artists/new(.:format)                        artists#new
edit_artist       GET    /artists/:id/edit(.:format)                   artists#edit
artist            GET    /artists/:id(.:format)                        artists#show
                  PATCH  /artists/:id(.:format)                        artists#update
                  PUT    /artists/:id(.:format)                        artists#update
                  DELETE /artists/:id(.:format)                        artists#destroy
```

There's something under the `URI Pattern` column we haven't talked about much yet: **`.:format`**
* Which `.:format` have we dealt with primarily so far? Which `.:format` do we need our application to render in order to have a functional API?

## Rails and json (30 min)

Resources can be represented by many formats.  Rails defaults to :html.  But it can easily respond with json, csv, xml, and others.

It's time to get Rails to act like an API, in addition to it's html responsibilities.  A few decisions have been made for us:
- following RESTful routes
- requests are formatted as JSON

We are already supporting RESTful routes in Rails.  We can see that in our `rake routes`.  Let's work on JSON.  

The two main JSON renderers (in use today) are [jBuilder](https://github.com/rails/jbuilder) and [Active Model Serializers](https://github.com/rails-api/active_model_serializers).  Rails uses jBuilder by default, so use that.

### I do: Tunr artists#show

Artists#show is a pretty small, well-defined step, let's start there.

If I ask for html, Rails renders html.
If I ask for JSON, Rails renders json.

I want `/artists/4.json` to return this:
``` json
{
  id: 4,
  name: "Lykke Li",
  photo_url: "http://www.chartattack.com/wp-content/uploads/2012/07/lykke-li-newmain1-photo-by-daniel-jackson.jpg",
  nationality: "Sweeden",
  created_at: "2015-08-11T02:44:24.173Z",
  updated_at: "2015-08-11T02:44:24.173Z"
}
```

Why `.json`? Check out `rake routes`:
``` ruby
Prefix  Verb  URI Pattern             Controller#Action
artist  GET   /artists/:id(.:format)  artists#show
```

See `(.:format)`?  That means our routes support passing a format at the end of the path, using dot-notation (like a file extension).


Requesting "GET" from CocoaRestCLient: `http://localhost:3000/artists/3.json`, we see a lot of something.  Not very helpful.  What is that?

HTML?  Let's look at that in a browser.
`Missing template artists/show, application/show with {:locale=>[:en], **:formats=>[:json]**`.

The important bits are:
- Missing template artists/show
- **:formats=>[:json]**

Rails is expecting a JSON view.

Adding `app/views/artists/show.json.jbuilder`

> Q. What do these suffixes mean?
---

A. Use the "jbuilder" renderer to generate "json".

jBuilder has simple, succint declaration for generating json.

`json.extract! model, array of methods`

``` ruby
# app/views/artists/show.json.jbuilder
json.extract! @artist, :id, :name, :photo_url, :nationality, :created_at, :updated_at
```

Demonstrate via browser and cocoa-rest-client.

### You do: Tunr songs#show (15 min)

It's your turn to do the same for Songs.  Songs#show should return:

`:id, :title, :artist_name`

Tip: `json.extract!` only works with methods on the passed model.

``` ruby
json.extract! @song, :id, :title, :artist_name
```

### I do: Tunr artists#index

Let's move on to artists#index.  We want a list of Artists.  JSON supports Objects and... Arrays.  How handy.

``` ruby
json.array!(@artists) do |artist|
  json.extract! artist, :id, :name
  json.url artist_url(artist, format: :json)
end
```

This loops through all the @artists, rendering a json object (with id and name) and also returns the url for said artist.

Demonstrate in browser.

### You do: Tunr songs#index (10 min)

Your turn to do the same with Songs.  We want a list of songs and the url for each Song resource.

### I do Tunr artists#create (30 min)

It's high time we created an Artist.

> Q. What do we have to change to support create?
---

- Discuss new -> create, edit->update.
  - what is the purpose of "new"
  - what is the correlation in an API?
    -  no view needed for "new", just pass in request.

> Q. Knowing that, what do we have to update to support create?
---

Just the Controller!

### respond_to

As expected, since we hane to support, or respond to, multiple formats, Rails provides a helper.

``` ruby
respond_to
```

`respond_to` provides the requested format to a block of ruby code.

We are starting with:

``` ruby
# POST /artists
def create
  @artist = Artist.new(artist_params)
  if @artist.save
    redirect_to (artist_path(@artist))
  else
    render :new
  end
end
```

We need to update the response to respond to the format.

``` ruby
# POST /artists
# POST /artists.json
def create
  @artist = Artist.new(artist_params)

  respond_to do |format|
    if @artist.save
      format.html { redirect_to @artist, notice: 'Artist was successfully created.' }
      format.json { render :show, status: :created, location: @artist }
    else
      format.html { render :new }
      format.json { render json: @artist.errors, status: :unprocessable_entity }
    end
  end
end
```

I read this as:
- If we successfully save the @artist...
  - When the requested format is "html", we redirect to the show page for the @artist.  
  - When the requested format is "json", we return the @artist as JSON, with an HTTP status of "201 Created".

- If save fails...
  - When the requested format is "html", we render the :new page - to show the human the error of their ways.
  - When the requested format is "json", we return the error as JSON and inform the requesting computer that we have an "unprocessable_entity".  Trust me, they'll understand.

> Q. Let's test it.  How do we send a POST request in the browser?
---

Usually via a form.

Today, we'll use CocoaRestClient.  It makes POSTing requests easy.

- Enter url: localhost:3000/artists
- Method: POST

Add your Artist data to "Request Body".  Sometimes, I prefer the "Raw Input".
```
{ "artist": { "name" : "Sting" }}
```
Press "Submit".

More html.  Drat.

This is an error page, rendered as html.  Sometimes you just have to wade through the html.  Scroll down until you get to the "body".
``` html
 <h1>
  ActionController::InvalidAuthenticityToken
    in ArtistsController#create
</h1>
```

Ah yes.  Rails uses an Authenticity token for security.  It will provide it for any request made within a form it renders.   CocoaRestClient is decidedly not that.  Let's temporarily adjust that setting for testing pruposes.  When we go back to using html forms, we can set it back.

``` ruby
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  # support API, see: http://stackoverflow.com/questions/9362910/rails-warning-cant-verify-csrf-token-authenticity-for-json-devise-requests
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }
end
```

Testing again, we see what we expect... success (201 Created), **BUT** see none of the passed data in the new Artist. :(

Checking the server logs, we see:
```
Can't verify CSRF token authenticity
```

Did we configure CocoaRstClient to say the ContentType was "application/json"?  Nope.  Try again.

Success!

### You do: Tunr songs#create, songs#update

Your turn.  Make sure we can create and update Songs via requests that expect JSON.

### [optional] Active Model Serializers
- brief overview/comparison

## 3rd Party APIs (15 min)

Other companies have created something similar.  Some follow the REST guidelines, some don't.  When we want ot retruve information from them we nedd to make an http request from within our application.  There are a few libraries that help with this.  We'll review [HTTParty](https://github.com/jnunemaker/httparty).

### Short demo of HTTParty

- After adding it to our Gemfile.  We can start using it right away,

``` ruby
response = HTTParty.get('https://api.stackexchange.com/2.2/questions?site=stackoverflow')
```

Checkout the response:
```
response.code
response.message
response.body
response.headers
```

Or better yet, you can make a PORO (Plain Old Ruby Object) class and use that.
```
class StackExchange
  include HTTParty
  base_uri 'api.stackexchange.com'

  def initialize(service, page)
    @options = { query: {site: service, page: page} }
  end

  def questions
    self.class.get("/2.2/questions", @options)
  end

  def users
    self.class.get("/2.2/users", @options)
  end
end
```

Using it from `rails console`:
``` ruby
stack_exchange = StackExchange.new("stackoverflow", 1)
```
``` ruby
stack_exchange.questions
stack_exchange.users
```

## Conclusion

Review Learning Objectives

## Resources:
- https://github.com/mmattozzi/cocoa-rest-client
