# User Authorization with CanCanCan

## Authorization vs. Authentication

**Authentication** verifies who the user is.
* We use Devise to set up user authentication in our Rails applications.

**Authorization**, however, verifies what a user is allowed to do.
* Depending on who that user is, what can they do in our application?

## Authorization Without CanCanCan

> **[Starter Code](https://github.com/ga-dc/cancancan_blog/tree/blog-starter)**

We'll be using a simple blog for today's example.
* It has two models: `Article` and `User`.
* We have seeded it with four users: `user1`, `user2`, `user3` and `admin`.
* As it stands, our application has zero authorization.
  * `user1` is able to update and delete any other user's posts.

**Q:** Which files do you think we should change to prevent this from happening? In other words, where should authorization happen?
* Which of these files should we start in?

At some point a decision needs to be made: if a user clicks on something they either needs to be allowed through or rejected.
* If we were to create an if-statement that took care of this, were would it go?
* Let's try implementing that with `destroy` in `ArticlesController`...

```rb
if current_user.id == @article.user_id
  @article.destroy
else
  redirect_to :permission_denied
end
```
> This is the main idea behind authorization - the controller is the gatekeeper. We won't be implementing exactly this today. Instead, we'll do it in a much more concise way using a Ruby gem.

We're going to need to do the above sort of thing repeatedly for different actions.
* For some actions, the checks are going to be a bit more complex than this example.
* Solution: move all of our authorization rules into a single place and use it to make checks throughout our application.

## Enter CanCanCan

### What Is It?
A gem that allows us to implement that sort of authorization in a cleaner, more succinct way.
* It was originally called CanCan when created by Ryan Bates (Railscasts).
* He disappeared from the public eye for a while, so the developer community took it upon themselves to main the gem. Thus, CanCanCan was born!

### Installation
1. Include CanCanCan in your `Gemfile`  
  ```rb
  gem 'cancancan', '~> 1.10'
  ```
2. Run `bundle install`  

### How Does It Work?
All the rules about what a user can do exist in one file: `ability.rb`
* Create it via the command line by running...
  ```bash
  rails g cancan:ability
  ```

### authorize!
We'll be linking controller actions to `ability.rb` using the `authorize!` helper

  ```rb
  def show
    @article = Article.find( params[:id] )

    # authorize! takes two arguments: (1) Action, (2) Object
    authorize! :read, @article

  end
  ```

`authorize!` knows to take `current_user` and check to see if it's allowed to read the article
* If the rule(s) being checked pass, then the controller action continues.
* If not, an error is thrown.

Let's test if this works.
* If it does, a user should not be allowed to read a post because we have yet to define what the `:read` rule is.
* To remedy this, let's create `:read` in `ability.rb`.

### ability.rb

**Q:** What user story should we implement for `show`?
> As a user or guest, I should be able to read a post.


```rb
class Ability
  # Our Ability class borrows methods from CanCan's Ability module.
  include CanCan::Ability

  def initialize( user )

    # two args: (1) Ability, (2) Resource
    # :read in another controller matched to this "can :read"
    can :read, Article
  end
```

Ability has an initialize method that takes a user as an argument.
* This user is always the `current_user`
> Your application must have a `current_user` method defined, whether that's via Devise or a hand-rolled solution.

We create our authorization rules inside of `initialize` using the `can` helper.
* Takes two arguments: (1) Ability, (2) Class
  * The Ability is matched to the controller action it is mentioned in. In this case, that's `:read`.
  * The Class is compared to the object passed into `authorize!`. In this case, we check to see if `@article` is of class type `Article`.

**Q:** What's the difference between `authorize!` and `can`?

### YOU DO: Authorize Users to Create Articles

> As a user, I should be able to create an Article.

```rb
# articles_controller.rb

# We don't want guests to be able to access the new Article form.
def new
  @article = Article.new
  authorize! :create, @article
end

# We definitely don't want guests to somehow have access to our controller's `create` action
def create
  @article = Article.new( article_params )
  authorize! :create, @article
end
```
```rb
# ability.rb

# Q: How can we go about checking to see if the initialize method's user argument contains a guest or an actual user?
def initialize( user )
  can :read, Article
  if user
    can :create, Article
  end
end
```

### WE DO: Update Authorization

**Q:** What should the user story look like for authentication and updating posts?
> As a user, I should be able to update my own posts.

Once again, let's start with `articles_controller.rb`...

```rb
# articles_controller.rb

# As a first line of defense, we don't want unauthorized users to be able to access the edit form.
def edit
  @article = Article.find( params[:id] )
  authorize! :update, @article
end

# On top of that, they should not be able to access the update action of our ArticlesController.
def update
  @article = Article.find( params[:id] )
  authorize! :update, @article
  if @article.update( article_params )
    redirect_to @article
  else
    render :edit
  end
end
```

Moving onto `ability.rb`...
* We need to be able to access a specific article and check its `user_id`.

```rb
# ability.rb

def initialize( user )
  can :read, Article

  if user
    can :create, Article
  end

  # We can access a particular article using the below `do` block format.
  can :update, Article do |article|
    # The last statement in this block should return true if the user created the article.
    user.id == article.user_id
  end
end
```

Let's test this...
* First, let's restore the original test data by re-seeding our database.
* Now, as `user1` we...
  * Should be able to view all articles.
  * Should be able to edit any post post authored by `user1`.
  * Should **NOT** be able to edit somebody else's post.

### YOU DO: Destroy Authorization

> As a user, I should be able to destroy my own posts.

```rb
# articles_controller.rb

def destroy
  @article = Article.find( params[:id] )
  authorize! :destroy, @article
  @article.destroy
  redirect_to articles_path
end
```

```rb
# ability.rb

# Rather can create separate rules for `update` and `destroy`, we can consolidate them into a single one.
can [:update, :destroy], Article do |article|
  user.id == article.user_id
end
```

Let's test...
* As `user1`, I should be able to destroy my own post.
* As `user1`, I should **NOT** be able to destroy `user2`'s posts.

### ability.rb Shortcuts

Instead of using the `do` block format, we can consolidate the comparison(s) into a hash that we will pass in as a third argument so `can`.

```rb
# ability.rb

# Here we are comparing the user_id of a specific article with the id of the current user.
can [:update, :destroy], Article, :user_id => user.id
```

### Setting Up Admin Authorization

So we've taken care of basic user authorization. But what if we want a user to have admin capabilities so that he/she can update or destroy any post?
> As an admin, I should be able to update and destroy every post.

We could implement something similar to what we've already done...
```rb
if user.admin
  can :update, Article
  can :destroy, Article
end
```

But CanCanCan has a shorthand we can use to grant admin users update and destroy privileges...
```rb
if user.admin
  can :manage, Article
end
```
> NOTE: We added a custom `admin` attribute to our users and set that property to either true/false for the users generated in `seeds.rb`. If you would like to learn about how to modify custom properties like this via the browser, check out [this tutorial](https://github.com/plataformatec/devise/wiki/How-To:-Allow-users-to-sign-in-using-their-username-or-email-address).

### DRYing up our ArticlesController

**Q:** What repetitive code do you see in `articles_controller.rb`?
  1. We call `authorize!` in every controller action that requires authorization.  
  2. We create some instance of an article(s) -- whether that's `@article` or `@articles` -- in all of our controller actions.  

The `load_and_authorize_resource` helper let's us kill two birds with one stone.

```rb
class ArticlesController < ApplicationController
  load_and_authorize_resource
  # auto creates @articles / @article for each restful route. make code A LOT shorter! remove boilerplate lines.
  # authorize_resource alone auto adds the authorize statement
end
```

## Updating Our Views
So we've prevented unauthorized users from updating or destroying posts that do not belong to them. But on top of that, we wouldn't like them to see the "Edit" and "Delete" links for other users' posts.

```html
<!-- show.html.erb -->

<!-- If the user is not authorized, CanCanCan will hide the contents of the below if-statement. -->
<%= if can? :edit, article %>
  <%= link_to 'Edit', edit_article_path(@article) %>
<% end %>
<% if can? :destroy, @article %>
  | <%= link_to 'Delete', @article, method: :delete, data: {confirm: 'Are you sure?'} %>
<% end %>
```

## Closing
