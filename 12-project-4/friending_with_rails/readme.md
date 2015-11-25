# Self-Referential Associations / Friending on Rails!

## Learning Objectives
- Explain how self-referential associations are used to create relationships within a single model
- Use `:class_name` to alias a model
- Create a join table to that associates instances of a single model
- Add validations to a join model


## Opening Framing
We've learned about associations and how we can relate models to one another. Sometimes we need to associate instances of a model with other instances of the same model.

### ST-WG
Think of a couple of situations where we may need to do this behavior. Conceptually, how might we execute this? Think further and think at a high level how we might be able to program this.

For the purposes of this class we'll be looking at how to execute friending functionality in a rails application. Though we are looking at the domain model for friending, the functionality we'll be coding can easily transfer to another domain.(following, messaging, etc..)

The application we're about to build will have 2 models, `user` and `friendship`. We'll generate the `user` model with devise. The `friendship` model we'll be coding to be the join table that associates instances of users.

Let's start by creating a rails application.

```bash
$ rails new friending_with_rails -d postgresql
$ cd friending_with_rails
```

We'll be using the devise gem. Go ahead and update the `Gemfile`:

```ruby
gem 'devise'
```

Then run the following commands in the terminal to generate our user model as well as some other files we'll need:

```bash
$ bundle install
$ rails g devise:install
$ rails g devise user
$ rails g model friendship
$ touch app/controllers/friendships_controller.rb
$ touch app/controllers/users_controller.rb
$ mkdir app/views/users
$ touch app/views/users/index.html.erb
$ touch app/views/users/show.html.erb
```

Let's update the migration that was created for `friendships` in `db/migrate/<some_timestamp>_create_friendships.rb`:

```ruby
class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :user_id
      t.integer :friend_id
      t.timestamps null: false
    end
  end
end
```

> Note that this model has 2 properties a `user_id` and a `friend_id`. Though they are different properties, both point to a row in our `users` table

Additionally, lets seed our database with some fake users as well in `db/seeds.rb`:

```ruby
User.create([
  {email: "andy@email.com", password: "password"},
  {email: "bob@email.com", password: "password"},
  {email: "tom@email.com", password: "password"},
  {email: "sam@email.com", password: "password"}
])
```

Let's first define our associations in our `friendship` model first. In `app/models/friendship.rb`:

```ruby
class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend, :class_name => "User"
end
```

> We've set up this friendship model to be a join table. It will belong to both a user and a friend. Even though its seeming 2 different models, notice the `:class_name => "User"`. This signifies that both are in fact going to be user id's. One is just name spaced as `friend_id`

Now let's define the associations in the `user` model. In `app/models/user.rb`:

```ruby
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :friendships
  has_many :friends, :through => :friendships
  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :inverse_friends, :through => :inverse_friendships, :source => :user
end
```

> Here we can see the normal devise stuff. But then we see the `has_many` associations that are listed here. These associations will give us access to some helpers that allow us to query for `friends/inverse_friends`. `friends` will be people that the current user has friended, and `inverse_friends` will be the users that have friended the current user.

> Another thing to note is that we aliased `friendship` here, much in the same way we aliased `user` before. Additionally in this association for `inverse_friendships`, we specify that the foreign key is `friend_id`. `:source` is used to define the associated model name for a `has_many :through`

Let's update some routes, controllers and views so we can actually put these associations to use

In `config/routes.rb`:

```ruby
Rails.application.routes.draw do
  root 'users#index'
  devise_for :users, :path => 'accounts'
  resources :users, only: [:index, :show]
  resources :friendships, only: [:create, :destroy]
end
```

> Only to note here is that we aliased our devise routes into accounts so that we can have a users resource.

We're going to set up a normal `index` and `show` actions for our `user` model. In `app/controllers/users_controller.rb`:

```ruby
class UsersController < ApplicationController
  before_action :authenticate_user!
  def index
    @users = User.all
  end

  def show
    @user = current_user
  end
end
```

> In this controller were just doing a database query for our `index` and `show` routes.

On to views! Let's first update the layout file in `app/viewslayouts/application.html.erb`:

```html
<body>
  <div id="container">
    <div id="menu">
      <% if current_user %>
        Welcome <%= current_user.email %>! Not you?
        <%= link_to "Log out", destroy_user_session_path, :method => :delete %> |
        <%= link_to "View Profile", user_path(current_user) %>
      <% else %>
        <%= link_to "Sign up", new_user_registration_path %> or
        <%= link_to "log in", new_user_session_path %>.
      <% end %>
    </div>
    <%- flash.each do |name, msg| -%>
      <%= content_tag :div, msg, :id => "flash_#{name}" %>
    <%- end -%>
    <%= yield %>
</body>
```

> This is just the basic layout that contains signup/login/logout info. Additionally it displays any flash messages that may exist depending on success or failure of friendships being created.

Let's update the `index` view. In `app/views/users/index.html.erb`:

```html
<% @users.each do |user| %>
  <p>
    <%= user.email %><%= link_to "Add Friend", friendships_path(:friend_id => user), :method => :post %>
  </p>
<% end %>
```

> Here we're just listing out each users email and adding a link to create a friendship with that user (we haven't defined this functionality... yet).

In `app/views/users/show.html.erb`:

```html
<p>Username: <%= @user.email %></p>


<h2>Friends</h2>
<ul>
  <% for friendship in @user.friendships %>
    <li>
      <%= friendship.friend.email %>
      (<%= link_to "remove", friendship, :method => :delete %>)
    </li>
  <% end %>
</ul>

<p><%= link_to "Find Friends", users_path %></p>

<h2>Friended by Users</h2>
<ul>
  <% for user in @user.inverse_friends %>
    <li><%= user.email %></li>
  <% end %>
</ul>
```

> For the user show page, we're listing out the current user's friends, and listing out users that have friended the current user. Additionally we add a link for users to remove their friendships from the database(again, we haven't programmed this functionality... yet).

All that's left is to update our `friendships` controller. In `app/controllers/friendships_controller.rb`:

```ruby
class FriendshipsController < ApplicationController
  def create
    @friendship = current_user.friendships.build(:friend_id => params[:friend_id])
    @friendship.save
    flash[:notice] = "Added friend."
    redirect_to root_url
  end

  def destroy
    @friendship = current_user.friendships.find(params[:id])
    @friendship.destroy
    flash[:notice] = "Removed friendship."
    redirect_to current_user
  end
end
```

> In the create action, were creating a new friendship in the database between the current user and the user with id specified in the `index` view. In the delete action, we're finding the friendship by it's id (in the `show` view) and destroying it in the database.

Great, it's working! There's just a couple of problems...One problem is the user can friend himself! We can't have that. Additionally a user can friend someone multiple times, again it wouldn't make sense for this to be the case either.

Let's first create some validations in our `friendship` model. In `app/models/friendship.rb`:

```ruby
class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend, :class_name => "User", foreign_key: "friend_id"
  validates_uniqueness_of :friend, scope: :user
  validate :check_user
  def check_user
    if self.friend_id == self.user_id
      errors.add(:friend, "can't be yourself")
    end
  end
end
```

> Note that even though its not saving anything to the databases in those fringe cases, it still says "Added friend." We need to update the ui such that should it not save, to display a message.

Now we need to notify the user should it not pass these validations. In `app/controllers/friendship`:

```ruby
def create
  @friendship = current_user.friendships.build(:friend_id => params[:friend_id])
  if @friendship.save
    flash[:notice] = "Added friend."
  else
    friend = @friendship.friend
    flash[:error] = "Issues adding #{friend.email}: #{@friendship.errors.full_messages}"
  end
  redirect_to root_url
end
```

There you have it! Full friending capabilities. One thing to note, this lesson plan doesn't cover how pending friendships and accepting friendships work. But that logic is just an extension of what we've already accomplished. Additionally this functionality, though not syntactically identical, can be transferred for many domains needing self referential associations.
