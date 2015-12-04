# Self Referential Associations / Friending on Rails!

## Learning Objectives
- Explain how self-referential associations are used to create relationships within a single model
- Use `:class_name` to alias a model
- Create a join table to that associates instances of a single model
- Add validations to a join model

## Opening Framing
We've learned about associations and how we can relate models to one another. Sometimes we need to associate instances of a model with other instances of the same model.

For the mini-lesson, we'll be looking at how to execute friending functionality in a rails application. Though we are looking at the domain model for friending, the functionality we'll be coding can easily transfer to another domain that requires associations between instances of the same Object.

The application we're about to build will have 2 models: `user` and `friendship`. Since you are building on Projects in progress, we'll start with a codebase that simulates that situation...

# Beyond the Starter Code

Clone the [repo](https://github.com/ga-dc/friending_in_rails) and set up the app to run locally:
```bash
$ bundle install
$ rake db:create
$ rake db:migrate
$ rake db:seed
```
Add `Friendship` model:
```bash
$ touch app/models/friendship.rb
$ touch app/controllers/friendships_controller.rb
$ rails g migration create_friendships
```

Define associations in`app/models/friendship.rb`:

```ruby
class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend, :class_name => "User"
end
```
> We've set up this friendship model to be a join table. Each friendship will belong to two users, one called `user` and one aliased as `friend`. The `:class_name => "User"` parameter indicates that under the hood, `friend` is a namespaced instance of `user`.

Update the migration at `db/migrate/<some_timestamp>_create_friendships.rb` :

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
> This is an example of namespacing in action. Note that this model has 2 properties a . Though `user_id` and a `friend_id` are different properties, both point to a row in our `users` table


Define the associations in `app/models/user.rb`:

```ruby
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :friendships
  has_many :friends, :through => :friendships
end
```

Run the new migration to map these associations into the database:

```bash
$ rake db:migrate
```

Update `config/routes.rb` to permit creation and deletion of friendships:

```ruby
Rails.application.routes.draw do
  root 'users#index'
  devise_for :users, :path => 'accounts'
  resources :users, only: [:index, :show]
  resources :friendships, only: [:create, :destroy]
end
```

Update the `index` view with links to create a friendship:

```html
<% @users.each do |user| %>
  <p>
    <%= user.email %><%= link_to "Add Friend", friendships_path(:friend_id => user), :method => :post %>
  </p>
<% end %>
```
> Here we're just listing out each user's email and adding a link to create a friendship with that user (we haven't defined this functionality... yet).

Update the `show` view to display friendships:
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
```
Build out `friendships` controller with `create` and `destroy` actions. In `app/controllers/friendships_controller.rb`:

```ruby
class FriendshipsController < ApplicationController
  def create
    @friendship = current_user.friendships.build(friend_id: params[:friend_id])
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

## Refinement #1: Reciprocity...
Great, it's working! There are any number of refinements that we can make to the "friending" functionality.

Add `inverse_friends` and `inverse_friendships` to the `User` model:
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
> Now, `friends` will be people that the current user has friended, and `inverse_friends` will be the users that have friended the current user.

> We aliased `Friendship` here, much in the same way we aliased `User` before. Because we are namespacing in this way, we need to explicitly specify that the foreign key is `friend_id`and the `:source` (the associated model name for a `has_many :through`) is `:user`.

MIGRATION

Update `app/views/users/show.html.erb` to put these associations to use:

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

## Refinement #2: Validations
Currently, the user can friend himself *and* can friend someone multiple times. Adding validations to the `Friendship` model can prevent this.

In `app/models/friendship.rb`:

```ruby
class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend, :class_name => "User"
  validates_uniqueness_of :friend, scope: :user
  validate :check_user
  def check_user
    if self.friend_id == self.user_id
      errors.add(:friend, "can't be yourself")
    end
  end
end
```

Note that even though it's not saving anything to the databases in those fringe cases, it still says "Added friend." We need to update the UI to reflect this. In `app/controllers/friendship`:

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

## Potential Next Steps/Other Applications
- More control over friending process:
  - Pending friendships
  - Accepting friendships
- Messaging
- Following
