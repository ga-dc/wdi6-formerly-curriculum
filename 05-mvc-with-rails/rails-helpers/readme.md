# Helpers

## Learning Objectives

- Describe how Rails' built-in helper methods make our code mode readable and flexible
- Use Rails' path helper methods to generate paths for links and redirects
- Generate links in views using `link_to`
- Generate images in views using `image_tag`
- Generate model forms using the `form_for` helper
- Generate non-model forms using  the `form_tag` helper
- Describe what a CSRF attack is [example video](https://www.youtube.com/watch?v=uycmHQM_h64)
- Explain the purpose of authenticity tokens in Rails forms

## What are Helpers?

If we look at our app, there are a lot of places where we're writing a lot of
text, and where that text follows a common pattern. Think about the similarities
in structure of every link tag, and of every form. Every time we need a path
for where a link goes, or where a form submits to.

Because this is a common problem, Rails comes with helper methods to help us out
here.

Every single method we're going to look at today has one job... to generate text
so we don't have to type it out, and so that our code is more readable. (A side
benefit here is that if our routes change, we don't have to go fix all of our
links, forms, etc.)

## Path Helpers

Path helpers are methods that generate paths. These helpers can be used anywhere
you would have manually typed out a path as a string, e.g. "/artists",
"/artists/#{@artist.id}", etc.

These helpers are generated for you automatically for routes created using
`resources`, e.g. `resources :artists`.

To see the list of paths, you can run `rake routes` and look at the left-most
column. To use the path helpers, add `_path` to the end of each prefix.

Here are examples of the RESTful paths generated when you use `resources`:

```ruby
artists_path()        # "/artists"
new_artist_path()     # "/artists/new"

artist_path(some_artist)        # "/artists/22"
edit_artist_path(some_artist)   # "/artists/22/edit"
```

Note that there are only 4 RESTful path helpers, not 7 like you might expect.
That's because path helpers only generate **paths**, not routes, which must
include a **verb**. The verb (and thus the route) comes from context.

An example:

* A *link* to `artists_path()` is a GET "/artists", and is thus the index route.
* A *form* to `artists_path()` is a POST "/artists", and is thus the create route.

Another example:

* A *link* to `artist_path(some_artist)` is a GET "/artists/22", and is thus the show route.
* A *form* to `artist_path(some_artist)` is a PUT "/artists/22", and is thus the update route.

Path helpers can be used in controllers & views.

## Link Helpers

The link helper `link_to` generates link (`<a>`) tags. In general, `link_to`
takes two arguments:

1. the 'caption' (i.e. the text the user sees for the link)
2. the path for the link (i.e. the `href` attribute)

Examples:

```
<%= link_to @artist.name, artist_path(@artist) %>
<%= link_to "Edit Artist", edit_artist_path(@artist) %>
```

Note that Rails has a shortcut for the show path, instead of `artist_path(@artist)`,
you can just pass in the model object itself.

```
<%= link_to @artist.name, @artist %>
<%= link_to @artist.name, artist_path(@artist) %>
```

Note that it doesn't have to be in an instance variable, what matters is that
the second object is an instance of an ActiveRecord Model:

```
<% @pandas.each do |panda| %>
  <%= link_to panda.name, panda %>
<% end %>
```

## HTML Options

Almost any helper method that generates HTML tags, can take a set of HTML
options. This is commonly used to set the `class` and/or `id` attributes, but
can be used to set any attributes.

Example:

```
<%= link_to panda.name, @panda, class: "fancy-panda" %>
```

For more examples, see the [API Docs for Rails link_to](http://apidock.com/rails/ActionView/Helpers/UrlHelper/link_to)


## Image Helpers

The `image_tag` helper generates an `<img>` tag.

Here's a simple example:

```
<%= image_tag @artist.photo_url %>
```

generates

```
<img src="http://www.athousandguitars.com/wp-content/uploads/2013/04/yeah-yeah-yeahs.jpg" >
```

There are three general ways we can reference an images' src, depending on where
the image is:

1. "http://www.fillmurray.com/200/200" - if you pass in a full URL, rails will
link to that URL.
2. "/icons/email.png" - if you pass in a full path (starting with a "/") the
image will be linked from the public folder.
3. "plus.png" - if you pass in a simple file name, rails will look for the file
in the assets folder "app/assets/images", and link to that appropriately.

The `image_tag` helper takes all the normal HTML Options, plus ones related to
size and alt.

```
<%= image_tag @artist.photo_url, alt: "Photo of #{@artist.name}", size: "400x400" %>
```

## Form Helpers
