# Sinatra Views

## We do: Sinatra Views

Convert 99 bottles ex. to use views.

Let's convert the hardcoded strings in our application to take advantage of Sinatra's built-in templating engine: erb.

Create a directory called `views` and a file in that folder called `index.erb`

In your main application file, render the view with the keyword `erb`

Our entire application looks like:

```ruby
require 'sinatra'
get '/' do
  erb :index
end
```

```html
<!-- /views/index.erb -->
This is the home page.
```

## Passing Variables to Views

To share variables from the application with the view, define instance variables:


```ruby
require 'sinatra'
get '/:num_bottles' do
  @num_bottles = params[:num_bottles]
  @next = @num_bottles -= 1
  erb :index
end
```

> Variables that we want to use in the view `.erb` files need to be instantiated with `@`.

```html
<!-- /views/index.erb -->
<%= @num_bottles %> of beer on the wall.
<a href='/<%= @next %>'>Take one down.</a>
```


We can write erb tags in two ways. `<% %>` or `<%= %>`. Without the equal sign, the view (`.erb` file) will execute the code only. With an equal sign, the view will execute the code and also place a string that is the return value of the code that was executed.

To see this in action let's update our `app.rb`:

```ruby
get '/' do
  @bob = "bobert"
  erb :index
end
```

In `index.erb`
```html
<p>This is the instance variable @bob in the initial state: <%= @bob %></p>
<p>This is executing and returning using erb tags with equal sign: <%= @bob += "(using equals in erb)" %><p>
<p>This is only executing using erb tags without equal sign: <% @bob += "(not using equals in erb)" %><p>
<p>Final state of @bob : <%= @bob %>

```

> One thing to note about instance variables (`@some_variable`). If we instantiate an instance variable in one of our routes, we can only use it in that route and cooresponding view. Other routes won't be able to utilize it.

### More complex ruby with erb

If you have a collection to loop through, like an array or a hash, you use
a slightly different syntax:

Let's add the following content to `app.rb`:

```ruby
names = ["bobert", "tom", "missy", "kristy"]

get '/' do
  @names = names
  erb :index
end
```

If we wanted to have all of the names in `<p></p>` tags we could do something like this in our `index.erb`
```html
<!-- /views/index.erb -->
<% @names.each do |name| %>  <!-- note the missing `=` -->
  <p><%= name %></p>
<% end %>
```

> As we delve deeper into back end development. The neccessity to iterate through data sets like in the above code snippet becomes extremely important. Instead of names, we might loop through nfl players. And instead of `name` it might look like `player.name`. Depending on the object representing players, it might have multiple different properties like `total_yards`, our `touchdowns_this_season`

## Assets & Sinatra Layouts

Any files in the `public` folder will be served as static assets

For example, you would create a file `public/css/styles.css`

and link to it with

```html
<link rel="stylesheet" type="text/css" href="/css/styles.css">
```

Instead of copying and pasting this link to each of the views, we can use a global layout view
which will be loaded "around" every other view.

```html
<!-- views/layout.erb -->
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
  </head>
  <body>
    <%= yield %> <!-- load whatever template was called here -->
  </body>
</html>
```

## We do: Forms


Any input with a `name` attribute will show up as an element of `params`

Forms with a GET action are useful for search forms.

```html
<form method='get' action='/names'>
  <input type='search' name='student_name'>
  <input type='submit'>
</form>
```

> Keep an eye out on the URL when you submit this last form, you'll notice that the url changes to whatever the action is as well as contains all of the parameter values from the input tags.

> We can only do `get` and `post` with forms. This is not a limitation on REST, but a limitation on HTML. We will see tomorrow during the lab theres a way to kind of hack around these HTML limitations.

**Question**: What's the benefit of using GET requests with search forms?

#[Next: Sinatra REST](rest.md)

## You do: Pair Programming Bot

https://github.com/ga-dc/pair_programming_bot

## You do: Emergency Complement

https://github.com/ga-dc/emergency_compliment
