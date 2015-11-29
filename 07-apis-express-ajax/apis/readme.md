# APIs

## Learning Objectives

- Describe what an API is, and why we might use one.
- Explain the common role of JSON on the web.
- Describe the purpose and syntax of `respond_to`
- Make a Rails app that provides a JSON API.
- Use an external API (via HTTParty) to gather data and utilize it in a Rails application

## What is an API? (30 minutes / 0:30)

**Basically, an API is a service that provides raw data for public use.**

API stands for "Application Program Interface", and technically applies to all of software design. However, since the explosion of information technology, the term now commonly refers to web URLs that can be accessed for raw data.

APIs publish data for public use. As third-party software developers, we can access an organization's API and use their data within our own applications.

**Check out these stock quotes...**

* [http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL](http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL)
* [http://dev.markitondemand.com/Api/Quote/json?symbol=GOOGL](http://dev.markitondemand.com/Api/Quote/json?symbol=GOOGL)

## API Exploration

Form pairs and explore the API links in the below table. Record any observations that come to mind. In particular, think about what you see in the URL and the API response itself.

| API | Sample URL |
|-----|------------|
| **[This for That](http://itsthisforthat.com/)** | http://itsthisforthat.com/api.php?json |
| **[iTunes](https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html)** | http://itunes.apple.com/search?term=adele |
| **[Giphy](https://github.com/Giphy/GiphyAPI)** | http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC |
| **[OMDB API](http://www.omdbapi.com/)** | http://www.omdbapi.com/?t=Game%20of%20Thrones&Season=1 |
| **[StarWars](http://swapi.co/)** | http://swapi.co/api/people/3 |
| **[Stocks](http://dev.markitondemand.com/MODApis/)** | http://dev.markitondemand.com/Api/Quote/json?symbol=AAPL |

### Why Just Data?

Sometimes thats's all we need. All this information, from all these browsers and all these servers, has to travel through the network. That's almost certainly the slowest part of the request cycle. We want to minimize the bits. There are times when we just need the data. For those times, we want a concise format.   

## What is serialized data?

All data sent via HTTP are strings. Unfortunately, what we really want to pass between web applications is *structured data*, as in: native arrays and hashes. Thus, native data structures can be *serialized* into a string representation of the data. This string can be transmitted, and then parsed back into data by another web agent.  

There are **two** major serialized data formats:  

* **JSON** stands for "JavaScript Object Notation", and has become a universal standard for serializing native data structures for transmission. It is light-weight, easy to read, and quick to parse.

```json
{
  "users": [
    {"name": "Bob", "id": 23},
    {"name": "Tim", "id": 72}
  ]
}
```
> Remember, JSON is a serialized format. While it may look like an object, it needs to be parsed so we can interact with it as a true Javascript object.

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

**Try hitting the Giphy API...**

* No key: [http://api.giphy.com/v1/gifs/search?q=funny+cat](http://api.giphy.com/v1/gifs/search?q=funny+cat)

* With key: [http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC](http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC)

> It is very important that you not push your API keys to a public Github repo. [Figaro](https://github.com/laserlemon/figaro) is a useful gem to utilize environment variables for hiding API keys.

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

Let's make a basic HTTP request to an API. While we can technically just do this in the browser, we're going to use Postman - a Chrome plug-in for making HTTP requests - so we can look at it in more detail.  
Steps  
  1. [Download Postman](https://www.getpostman.com/).  
  2. Type in the "url" of an API call.  
  3. Ensure the "method" is "GET".  
  4. Press "Send".  

Here's an example of a successful `200 OK` API call...

![Postman screenshot success](http://i.imgur.com/2TADr4J.png)

And here's an example of an unsuccessful `403 Forbidden` API call. Why did it fail?

![Postman screenshot fail](http://i.imgur.com/r3nIhGH.png)

> We'll use Postman more when we test out our own API later in today's class.


## Rails and JSON

### Intro (10 minutes / 0:40)

Today, we're going to use Rails to create our own API from which we can pull information. We will be using a familiar codebase, and modify it so that it can serve up data.  

Let's demonstrate using Tunr.

* **[STARTER CODE](https://github.com/ga-dc/tunr_rails_json)**

Earlier we used an HTTP request to retrieve information from a 3rd party API. Under the hood, that API received a GET request in the exact same way that the Rails application we have build in class thus far have received GET requests.
* All the requests that our Rails application can receive are listed when we run `rake routes` in the Terminal. We create RESTful routes and corresponding controller actions that respond to `GET` `POST` `PATCH` `PUT` and `DELETE` requests.

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
* Resources can be represented by many formats. Rails defaults to `:html`. But it can easily respond with `:json`, `:csv`, `:xml` and others.
* Which format have we dealt with primarily so far?
* Which format do we need our application to render in order to have a functional API?

### I DO: Tunr artists#show (10 minutes / 0:50)

Let's set up Tunr so that it returns JSON. `Artists#show` is a small, well-defined step. Let's start there.

What do we want to happen?
> If I ask for html, Rails renders html.
> If I ask for JSON, Rails renders json.

In particular, we want `/artists/4.json` to return this...
```json
{
  id: 4,
  name: "Lykke Li",
  photo_url: "http://www.chartattack.com/wp-content/uploads/2012/07/lykke-li-newmain1-photo-by-daniel-jackson.jpg",
  nationality: "Sweden",
  created_at: "2015-08-11T02:44:24.173Z",
  updated_at: "2015-08-11T02:44:24.173Z"
}
```

Why `.json`? Check out `rake routes`...

``` ruby
Prefix  Verb  URI Pattern             Controller#Action
artist  GET   /artists/:id(.:format)  artists#show
```

See `(.:format)`? That means our routes support passing a format at the end of the path, using dot-notation (like a file extension).  

Requesting "GET" from Postman: `http://localhost:3000/artists/3.json`, we see a lot of something.  Not very helpful.  What is that?  

HTML? Let's test that url in our browser. What error do we see?

![Missing template](http://i.imgur.com/4cWDzVU.png)

The important bits are:
* Missing template artists/show
* `:formats=>[:json]`

Rails is expecting a JSON formatted response. Let's fix this by adding some lines to our show action in our controller.

### respond_to

Rails provides an incredibly useful helper - `respond_to` - that we can use in our controller to render data in a given format depending on the incoming HTTP request.

Our current code...
```rb
def show
  @artist = Artist.find(params[:id])
end
```

And after...
```rb
def show
+    @artist = Artist.find( params[:id] )
+
+    respond_to do |format|
+      format.html { render :show }
+      format.json { render json: @artist, include: :songs }
+    end
   end
```
> If the request format is html, render the show view (show.html.erb). If the request format is JSON, render the data stored in `@artist` as JSON.
> Note the nested JSON objects.

Let's demo this in the browser and Postman.

### WE DO: Tunr Artists#index (10 minutes / 1:00)

Let's walk through the same process for `Artists#index`. Where do we start?

```rb
def index
  @artists = Artist.all

  respond_to do |format|
    format.html { render :index }
    format.json { render json: @artists }
  end
end
```

Demonstrate in browser and Postman.
> Does JSON formatting look messy in your browser? Install [JSONview](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en), a Chrome plug-in that displays JSON in a more readable format.

### YOU DO: Tunr Songs#index and Songs#show (15 minutes / 1:15)

It's your turn to do the same for Songs. You should be working in `songs_controller.rb` for this.

**Bonus**
* Make it so that the JSON requests only return `title`, `album` and `preview_url`. No `created_at` or `updated_at`.
* Make it so that the JSON request to Songs#show also includes the artist.

## Break (10 minutes / 1:25)

### I DO: Tunr Artists#create (30 minutes / 1:55)

It's high time we created an Artist. What do we have to change to support this functionality
* What HTTP request will we be sending? What route and controller action does that correspond to?
* What is the purpose of `Artists#new`?
* What do we have to change in `Artists#create`?

Here's our current code.
* What's different about `create` vs. `index` and `show`? What do we need to account for in our `respond_to` block?

```rb
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
* **Q:** What do we want to happen after a successful save? How about an unsuccessful one?

```rb
# POST /artists
# POST /artists.json
def create
  @artist = Artist.new(artist_params)

  respond_to do |format|
    if @artist.save
      format.html { redirect_to @artist, notice: 'Artist was successfully created.' }
      format.json { render json: @artist, status: :created, location: @artist }
    else
      format.html { render :new }
      format.json { render json: @artist.errors, status: :unprocessable_entity }
    end
  end
end
```

If we successfully save the @artist...  
* When the requested format is "html", we redirect to the show page for the @artist.  
* When the requested format is "json", we return the @artist as JSON, with an HTTP status of "201 Created".

If save fails...  
* When the requested format is "html", we render the :new page to show the human the error of their ways.
* When the requested format is "json", we return the error as JSON and inform the requesting computer that we have an "unprocessable_entity". Trust me, they'll understand.

### Testing Artists#create

How do we usually test this functionality in the browser? A form!  

Today, we'll use Postman. It makes POSTing requests easy.
  1. Enter url: `localhost:3000/artists`  
  2. Method: POST  
  3. Add a `Content-Type` header set to `application/json`
  3. Add your Artist data to "Request Body".  
    ```json
    { "artist": { "name" : "Sting" }}
    ```
  4. Press "Submit".  

![Postman create error](http://imgur.com/YFJIShn.png)

The raw response from this request is an error page, rendered as html.  Sometimes you just have to wade through the html.  Scroll down until you get to the "body".
```html
 <h1>
  ActionController::InvalidAuthenticityToken
    in ArtistsController#create
</h1>
```

Additionally we can preview the html, and see a familiar rails error page.

Ah yes. Rails uses an Authenticity token for security. It will provide it for any request made within a form it renders.  Postman is decidedly not that. Let's temporarily adjust that setting for testing purposes. When we go back to using html forms, we can set it back.

In our `application_controller.rb` we must adjust the way Rails protects us by default:

```rb
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  # support API, see: http://stackoverflow.com/questions/9362910/rails-warning-cant-verify-csrf-token-authenticity-for-json-devise-requests
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }
end
```

Success should look like this...

![Create Artist 200 OK in Postman](http://i.imgur.com/7bncv7w.png)

We should now get a `200` response code signifying a successful `post` request and we can preview the html page sent back as the response (our newly created artist's show page)

## Break (10 minutes / 2:05)

### You do: Tunr songs#create, songs#update (15 minutes / 2:20)

Your turn. Make sure we can create and update Songs via requests that expect JSON.

## 3rd Party APIs (15 minutes / 2:35)

Other companies have created something similar. Some follow the REST guidelines, some don't (remember those [Starter APIs](https://github.com/ga-dc/curriculum/tree/master/07-apis-express-ajax/apis#good-starter-apis)?). When we want to retrieve information from them we need to make an http request from within our application. There are a few libraries that help with this. We'll review [HTTParty](https://github.com/jnunemaker/httparty).

### Demo: HTTParty

After adding it to our Gemfile. We can start using it right away,

We are going to be using [weather underground's api](http://www.wunderground.com/weather/api/) to utilize `httparty` to make requests and to parse JSON responses.

>Make sure to register for an account, and to generate a free api key.

``` ruby
response = HTTParty.get('http://api.wunderground.com/api/<your key here>/conditions/q/CA/San_Francisco.json')
```

Checkout the response:

``` ruby
response.code
response.message
response.body
response.headers
```

Or better yet, you can make a PORO (Plain Old Ruby Object) class and use that.
``` ruby
class Forecast
  # creates getter methods for temp_f, weather, city and state.
  attr_reader :temp_f, :weather, :city, :state

  # initialize method takes 2 arguments city and state
  def initialize(city, state)

    # create the url using the city and state arguments. Also utilizing ENV
    # variable provided by figaro. Key value should be in 'config/application.yml'

    url = "http://api.wunderground.com/api/#{ENV["wunderground_api_key"]}/conditions/q/#{state.gsub(/\s/, "_")}/#{city.gsub(/\s/, "_")}.json"

    # utilizing httparty gem to make get request to the url prescribed in the
    # line above and storing the response into the variable below.
    response = HTTParty.get(url)

    # instantiating temp_f and weather by parsing through the JSON response
    @temp_f = response["current_observation"]["temp_f"]
    @weather = response["current_observation"]["weather"]

    # storing arguments as instance varibles in the model
    @city = city
    @state = state
  end
end
```

Currently our model won’t work because we haven’t defined ENV["wunderground_api_key"]. We need to make sure we update our `config/application.yml` file with this information:

`wunderground_api_key: your_key_info_goes_here`

Assuming you have a working key, we can now hop into the `rails console` and test our model out. We can see something like this if we instantiate a new forecast and pass in washington and dc as arguments:

``` ruby
washington = Forecast.new("washington", "dc")
```

``` ruby
washington.temp_f
washington.weather
```

> If you'd like to learn more about APIs and POROs, Andy has a [great blog post](http://andrewsunglaekim.github.io/Server-side-api-calls-wrapped-in-ruby-classes/) on the subject.

You'll be doing this same sort of thing in much greater detail from the client-side during this afternoon's [AJAX lesson](https://github.com/ga-dc/curriculum/tree/master/07-apis-express-ajax/ajax)!  

## Conclusion (5 minutes / 2:40)

Review Learning Objectives

## Resources:
* [Postman](https://www.getpostman.com/)
* [Intro to APIs](https://zapier.com/learn/apis/chapter-1-introduction-to-apis/)
* [Practice with APIs](https://github.com/ga-dc/weather_teller)
