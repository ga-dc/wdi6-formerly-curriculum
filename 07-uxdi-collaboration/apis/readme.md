# APIs

## Learning Objectives

- Describe what an API is, and why we might use one.
- Explain the common role of JSON on the web.
- Describe the purpose and syntax of `respond_to`
- Make a Rails app that provides a JSON API.
- Use an external API (via HTTParty) to gather data and utilize it in a Rails application

## Overview

> “APIs are going to be **the driver for the digital economy** and unless they [companies] are talking about APIs already, they will be left behind.” -- James Parton of Twilio

And...

> Twitter no longer wants to be a web app. Twitter wants to be **a set of APIs that power mobile clients worldwide**, acting as one of the largest real-time event busses on the planet.

So... whatever it is, this API thing sounds kind of important.

## What is an API? (30 min)

Up to this point, we have built applications for humans.  We created views that render html, so that a user can view and interact.

I want to perform an experiment.  The results are rather predictable, but I feel it's important for us to see this again.

### Demo: Single user presses button

THis is a very basic app.  It simply logs requests.  When I press this link, that number increments.  That's it.

### Demo: Multiple users sending requests

Same server.  Now, I want all of you to press the link.  Pretty fast, huh?

> Q. Are there other ways to interact with our web servers?
---

[How do we browse?](http://www.smartinsights.com/mobile-marketing/mobile-marketing-analytics/mobile-marketing-statistics/)

It's not just **us** anymore.  [The Internet of Things](https://en.wikipedia.org/wiki/Internet_of_Things)


### Native Mobile Apps

Discuss examples.

Check out these stats;
- http://www.smartinsights.com/wp-content/uploads/2014/03/Mobile-stats-vs-desktop-users-global-550x405.png

Native Mobile Apps are mostly just pretty faces on API calls.  Behind the scenes, the mobile app may be making calls to multiple APIs to gather and update information.  

> Q. What is the role of html & css?
---

It provides a structure and style for visual presentation.

The mobile app wants a native experience.  On a Mac, we want it to look and feel like a Mac.  On Windows, it should look and feel like Windows.

> Q. Do we need the structure and style anymore?
---

No.  We don't want the structure and style anymore.  In fact, it just extra baggage.  We would ignore it.  We just want the data.  We'll use iOS tools to make it look "native".  We want a concise format for sharing data.

### JSON (Javascript Object Notation)

[Basic definition of JSON](https://simple.wikipedia.org/wiki/JSON)

> Q.  From the reading last night.  What are some benefits of JSON?
---

[JSON](http://json.org) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate.

> Q. What two data structures does JSON represent?
---

- a collection of key/value pairs (JS object, Ruby Hash).
  - `{ key: value }`
- an ordered list of values (Array)
  - `[ value0, value1, ... ]`

Even with mobile, we're still talking about humans interacting with textfields and buttons - there's just another layer in between.  

#### Demo: Multiple users using http requests (cocoa-rest-client).

Let's send requests like the mobile apps do.  A basic http request.
CocoaRestClient is a native OSX app for making requests: [Download CocoaRestClient (v 1.3.9)](https://github.com/mmattozzi/cocoa-rest-client/releases/download/1.3.9/CocoaRestClient-1.3.9.dmg).

- Type in the "url"
- Ensure the "method" is "GET"
- Press "Submit".  
Voila, the request count increases.  No waiting for that pesky refresh.

Compare `?requestCount=Human` to '?requestCount=computer'

### Machine to machine

> "It [json] is easy for humans to read and write. It is easy for machines to parse and generate."

What happens when these machines get together?  Speed happens.

#### Demo: computer places requests.

Same app.  Called from script.  

zoom zoom.

Discuss magnitude of differences:
- speed
- quantity
- ramp up
- 24/7, never gets tired, hungry

### Why just data?

Thats's all we need. All this information, from all these browsers and all these servers, has to travel through the network.  That's almost certainly the slowest part of the request cycle.  We want to minimize the bits.  There are times when we just need the data.  For those times, we want a concise format.  

## RESTful Review (10 min)

- Everything is a Resource
- Let's create the http verbs + action table
  - show
  - index
  - new -> create
  - edit -> update

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
