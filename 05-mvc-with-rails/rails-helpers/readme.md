# Helpers

## Learning Objectives

- Describe how Rails' built-in helper methods make our code mode readable and flexible
- Use Rails' path helper methods to generate paths for links and redirects
- Generate links in views using `link_to`
- Generate images in views using `image_tag`
- Generate model forms using the `form_for` helper
- DRY up views using partials.
- Describe what a CSRF attack is
- Explain the purpose of authenticity tokens in Rails forms

### References

* **Rails Guides**
  * [path helpers](http://guides.rubyonrails.org/routing.html#path-and-url-helpers)
  * [image_tag](http://guides.rubyonrails.org/layouts_and_rendering.html#asset-tag-helpers)
  * [link_to](http://guides.rubyonrails.org/getting_started.html#adding-links)
  * [form_for](http://guides.rubyonrails.org/getting_started.html#the-first-form)


* **API Docs**
  * [image_tag](http://apidock.com/rails/ActionView/Helpers/AssetTagHelper/image_tag)
  * [link_to](http://apidock.com/rails/ActionView/Helpers/UrlHelper/link_to)
  * [form_for](http://apidock.com/rails/ActionView/Helpers/FormHelper/form_for)

## What are Helpers? (5 minutes - 00:05)

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

## Path Helpers (10 minutes - 00:15)

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

### Exercise (10 minutes - 00:25)

1. Clone our starter code for [tunr-rails-helpers](https://github.com/ga-dc/tunr-rails-helpers)
2. Replace the routes with `resources`.
3. Replace all hard-coded paths in the controllers with path helpers.

#### Bonus:

Replace all hard-coded paths in link / form tags in the views. We'll be replacing
them soon using link/form helpers.

## Link Helpers (10 minutes - 00:35)

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

### Exercise (15 minutes - 00:50)

Replace all links (<a> tags) in tunr-rails-helpers with `link_to`.

## HTML Options (10 minutes - 01:00)

Almost any helper method that generates HTML tags, can take a set of HTML
options. This is commonly used to set the `class` and/or `id` attributes, but
can be used to set any attributes.

Example:

```
<%= link_to @panda.name, @panda, class: "fancy-panda" %>
```

For more examples, see the [API Docs for Rails link_to](http://apidock.com/rails/ActionView/Helpers/UrlHelper/link_to)


## Image Helpers (5 minutes - 01:05)

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

### Exercise (5 minutes - 01:10)

Replace the <img> tag with the image_tag helper in tunr-rails-helpers.

Bonus:
Add some icon images to `app/assets/images` and use image_tag to add icons where
appropriate (e.g. replace the `(+)` link)

## Form Helpers (20 minutes - 01:30)

Rails includes two helper methods to build forms: `form_for` and `form_tag`.

Today, we'll only be looking at `form_for`, which builds forms specifically
for creating / updating our models (e.g. songs / artists etc).

The other helper, `form_tag` is for building generic forms, for example a
search form.

Here's an example of using form_for:

```
<h2>Create Panda</h2>

<%= form_for @panda do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name %>

  <%= f.label :favorite_food %>
  <%= f.text_field :favorite_food %>

  <%= f.label :age %>
  <%= f.number_field :age %>

  <%= f.label :cute %>
  <%= f.check_box :cute %>

  <%= f.submit "Make a brand new panda!"%>
<% end %>
```

Important facts about the `form_for` helper:

* It takes one argument, the object to create / update (it must be an AR object)
  * If the object is **new** (not saved to DB, `object.new_record? == true`), it will create a form to **create**
  * If the object is not new (id exists, `object.new_record? == false`), it will create an form to update (prepopulated)
* Methods to generate labels and inputs take one argument, the name of the attribute
* The submit button takes an optional argument for the text on the button
  * If you omit the argument, it will say either "Create Panda" or "Update Panda" accordingly (subbing in the name of your model)

### Exercise (20 minutes - 01:50)

Replace all forms in tunr-rails-helpers with `form_for` tags.

## Why use form_for? (15 minutes - 02:05)

The form helpers are useful for a few reasons:

### Cleaner Code

Our new form code is much more consise, easier-to-read and update, and less
prone to errors than the old, more verbose form.

### Reduced Duplication

You may have noticed that our create / update forms are now exactly the same.
This is because Rails can detect whether we're creating a new object or editing
an existing one.

Thus, we can later on use the same view in both contexts. (This approach is
called using **partials**).

### Protection from CSRF

A very common attack against web apps is something called **Cross-site Request
Forgery**. This occurs when a user visits a malcious site, and that site tricks
the user's browser into making a request to your site. This request could be a
POST request that modifies data under the target user's account.

[Video explaining how CSRF works](https://www.youtube.com/watch?v=vRBihr41JTo)

Rails prevents this by embedding a special token each time it generates a form.

Any time a POST/PUT/DELETE request comes in, Rails checks that the form data
includes a token it recently gave out to that user (they eventually expire).

If the token isn't present (or doesn't match), then the request is rejected.

We can manually include that token in our forms, but `form_for` and `form_tag`
do it for us.

## Partials (10 minutes - 02:15)

Partial templates - usually just called "partials" - are another technique to
break down a view into more manageable chunks. With a partial, you can move the
code for rendering a particular piece of a view into a separate file, and
include it in other views. This is especially useful for reducing duplication
in our views.

Partials look just like regular views (using HTML and ERB), only their file
names MUST start with an underscore.

Anywhere we want to include a partial, we "render" the partial in that part in
the view.

Let's look at an example in Tunr, specifically the forms for artists. There's
a lot of duplication in `views/artists/edit.html.erb` and
`views/artists/new.html.erb`.

Let's create a new partial, and call it `_form.html.erb`:

```bash
touch app/views/artists/_form.html.erb
```

Inside this partial, let's copy / paste the duplicated code:

```
<%= form_for @artist do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name %>

  <%= f.label :photo_url %>
  <%= f.text_field :photo_url %>

  <%= f.label :nationality %>
  <%= f.text_field :nationality %>

  <%= f.submit %>
<% end %>
```

Now, in our views for `new` and `edit`, let's replace the form code with
rendering the partial:

```
<%= render partial: "form" %>
```

Notice that the underscore is ONLY in the file name, when we refer to the
partial (when rendering it), we OMIT the underscore.

There are more complex ways to use partials, such as passing in variables to
be used by the partial, but most of the time, we don't need such functionality.

In cases where we don't need to set any options when we render the partial, we
can use the shorter syntax and omit the word `partial:`

```
<%= render "form" %>
```

## Exercise (10 minutes - 02:25)

Replace any remaining duplication of forms in Tunr using partials.

Bonus:
There are other areas of Tunr that have minor code duplication. Find them and
replace those areas with partials as well.

## Summary (5 minutes - 02:30)

Rails' helper methods are great at keeping our code readable, flexible and DRY,
so use em!
