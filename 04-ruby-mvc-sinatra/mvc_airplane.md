# How HTTP/MVC is like a plane

## 1. The plane rolls out onto the tarmac.
An HTTP request is initiated when...
- ...the user clicks "Submit" on a form (a `POST` request) on your website
- ...the user clicks "Submit" on Postman
- ...the user enters a URL in their web browser and hits Return (a `GET` request)

## 2. The plane is loaded up with cargo and prepped to fly to another airport.
The web browser packages the information the user submitted in the form -- the **parameters** -- and gets it ready to be sent to your server.

Let's say the form looks like this:
```
<form method="post" action="/thugs">
  <input type="text" name="name" value="Jesse" />
  <input type="text" name="title" value="Straight-up gangster" />
  <button type="submit">Let 'er rip</button>
</form>
```

The request will be sent to the URL `/thugs`, which was taken from the `action` attribute of the `form`.

### 2.a The cargo is strapped to the roof of the plane.

If the `method` is `GET`, the web browser turns the parameters into a querystring, attached to the end of the request's destination URL:
```
/thugs?name=Jesse&title=Straight-up%20gangster
```

### 2.b The cargo is placed in plane's cargo hold.

If the `method` is `POST`, the web browser turns the parameters into a hash. In this case, something like:
```
{
  name: "Jesse",
  title: "Straight-up gangster"
}
```

## 3. The plane takes off!
*What actually happens:* The HTTP request is sent from the user's browser to your server.

If the `method` is `GET`, The web browser sends a request to  `/thugs?name=Jesse&title=Straight-up%20gangster`.

If the `method` is `POST`, the web browser sends a request to `/thugs`, with the parameters sent behind-the-scenes in the request's "headers", invisible to the user.

## 4. The plane arrives at the destination airport, and is routed to land at a specific runway by the Air Traffic Control tower.

*What actually happens:* The `controller.rb` file on your server receives the HTTP request and directs it to one of the "routes" specified in the controller.

If the request is `GET` it'll be sent to the `get "/thugs" do` route.

If the request is `POST` it'll be sent to the `post "/thugs" do` route.

## 5. The cargo is unloaded from the plane.
*What actually happens:* The HTTP request is parsed. The server takes the parameters from either the URL (`GET`) or the headers (`POST`) and stores it in a `params` hash.

## 6. The cargo is processed.
*What actually happens:* The server runs the code that's inside the route. Generally, this does something *to* or *with* the information contained in the `params`.

For example:

```
post "/thugs" do
  Thug.create(name: params[:name], title: [:title])
end
```
This will add a row to the `Thugs` table that has `Jesse` in the `name` column, and `Straight-up gangster` in the `title` column.

### 6.a. New cargo is retrieved from the warehouse, according to specifications

The "warehouse" is the database. The new cargo, and the things stored in the warehouse, are models.

## 7. The processed cargo is (maybe) sent to a packaging plant.
*What actually happens:* If the route indicates that a `.erb` should be used, the information that was manipulated in the `route` is sent to the `.erb`.

```
post "/thugs" do
  @thug = Thug.create(name: params[:name], title: [:title])
  erb: dossier_of_true_thugs
end
```

The information is then inserted into the `.erb`, replacing the relevant `<% %>` tag.

For example:

```
<h1>Introducing <%= thug.name %>, also known as <%= thug.title %></h1>
```

This becomes:

```
<h1>Introducing Jesse, also known as Straight-up gangster</h1>
```

If you view the source code of a page in your Sinatra app, you will see **no ERB tags** -- just HTML.

## 8. The packaged cargo is sent back to the first airport.
*What actually happens:* A server sends something back a string of information in response to every HTTP request.

When you type a URL in your browser's address bar and hit Return, your browser makes a `GET` request to another server. The string of information the server sends back is HTML/CSS/Javascript, which your browser reads and turns into a webpage.

When you make a `POST` request, the server might respond with a string that tells your web browser to redirect you to another page. It might also respond with the HTML/CSS/Javascript to make a full webpage. It might also just return a short string saying the request was successful. That's up to the developer, and depends on what they want the app to do.

In this case, the HTML of the rendered thug page is the string that will be sent back.
