# Rails Best Practices

## Learning Objectives

* List common gems that can speed your development workflow
* Use model-based partials to keep views simple and DRY
* Simplify controllers by delegate complex behavior to models
* Use ActiveRecord scopes to improve readability of model queries

## Gems

Demo the common gems that can speed up your workflow, using the blog example.

```ruby
group :development do
  gem 'pry-rails'           # switch rails console to use pry instead of irb
  gem 'better_errors'       # improved rails error pages
  gem 'binding_of_caller'   # adds a REPL to better_errors pages
  gem 'meta_request'        # required for the RailsPanel Chrome extension
  gem 'rack-mini-profiler'  # include information on timing for each requests
  gem 'quiet_assets'        # prevents requests for static assets busying your logs
  gem 'awesome_print'       # format output on the console to be even nicer
end
```

## Model-Based partials

In Rails, the most common pattern for using partials is to create a partial that
renders one instance of a type of AR Model object. For an example, see the
`_post` and `_comment` partials in the example app.

If you have an instance of a model object, e.g. `@post`: you can then do this:

```
<%= render partial: "post", locals: {post: @post} %>
<%= render @post >
```

Rails will use the `_post` partial to render the post.

If you have an array of AR Models, you can even render the whole array. It will
re-use the same partial for each object. For example, given `@post = Post.all`

```
<%= render @posts %>
```

is the same as:

```
<% @posts.each do |post| %>
  <%= render post %>
<% end %>
```


Rules:
1. The partial must list in the correct folder. (e.g. app/views/posts).
2. It must be named after the model type (e.g. `_post.html.erb`).
3. You may only use one variable inside the partial, and it must be the same as the partial name (e.g. `post`)
4. That variable will be set to the object being rendered.

## Simple Controllers

In general, we want to keep our controller actions as simple as possible. Often,
this means any complex code should live in a model, or some other class designed
for that purpose.

In practice, most controllers should instantiate just one or two objects, and
create one or two instance variables to be used in the view.

One exmaple might be as follows:

Taken from [this example](http://www.devinterface.com/blog/en/2010/07/rails-best-practices-3-increase-controllers-readability/)

```ruby
class PostController < ApplicationController

  def create
    @post = Post.new(params[:post])
    @post.user = current_user
    @post.expiring_date = Time.now + 7.day
    @post.save  
  end
end
```

```ruby
class Post <  ActiveRecord:Base

  def publish_new_post(params, user)
    post = Post.new(params)
    post.user = user
    post.expiring_date = Time.now + 7.day
    post.save
  end

end

class PostController < ApplicationController

  def create
    @post = Post.publish_new_post(post_params, current_user)
  end

end
```


## ActiveRecord scopes

We often need to perform the same query on an AR Model in multiple places in
our app.

When that's the case, it's best to create a [scope](http://guides.rubyonrails.org/active_record_querying.html#scopes) on
the model.

Instead of this:

```ruby
class PostsController < ApplicationController
  # ...
  def recent
    @posts = Post.where("created_at > ?", 1.week.ago).where(:published, true)
  end
  # ...
end
```

Do this:

```ruby
class PostsController < ApplicationController
  # ...
  def recent
    @posts = Post.recent.published
  end
  # ...
end


class Post < ActiveRecord::Base
  has_many :comments
  # SELECT * FROM posts WHERE created_at > "2015-05-25 10:55
  scope :recent,    -> { where("created_at > ?", 1.week.ago)}
  scope :within,    -> (date) { where("created_at > ?", date)}
  # Post.within(2.days.ago)

  scope :published, -> { where(:published, true) }

end
```

Scopes can be chained to filter / combine queries.
