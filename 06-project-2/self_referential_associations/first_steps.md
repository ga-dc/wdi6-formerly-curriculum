# Behind the Starter Code

Create a new Rails app with a Postgres database:

```bash
$ rails new friending_with_rails -d postgresql
$ cd friending_with_rails
```
Update the `Gemfile` to include Devise:

```ruby
gem 'devise'
```

Create a model, controller, `index` view, and `show` view for the `User` model:

```bash
$ rails g devise:install
$ rails g devise user
$ touch app/controllers/users_controller.rb
$ mkdir app/views/users
$ touch app/views/users/index.html.erb
$ touch app/views/users/show.html.erb
```

Add seeds to `db/seeds.rb`:

```ruby
User.create([
  {email: "ross@example.com", password: "password"},
  {email: "rachel@example.com", password: "password"},
  {email: "chandler@example.com", password: "password"},
  {email: "joey@example.com", password: "password"},
  {email: "monica@example.com", password: "password"},
  {email: "phoebe@example.com", password: "password"}
])
```

Update `config/routes.rb` to include root, `users#index`, and `users#show`:

```ruby
Rails.application.routes.draw do
  root 'users#index'
  devise_for :users, :path => 'accounts'
  resources :users, only: [:index, :show]
end
```
> Note that we aliased our devise routes into 'accounts' so that we can have 'normal' resources for users.

Set up  `index` and `show` actions for our `user` model in `app/controllers/users_controller.rb`:

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

Update `app/viewslayouts/application.html.erb` to include basic sign up, log in, and log out functionality, as well as space for flash messages:

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
List users in `app/views/users/index.html.erb`:

```html
<% @users.each do |user| %>
  <p>
    <%= user.email %>
  </p>
<% end %>
```

List the current user in `app/views/users/show.html.erb`:
```html
<p>Username: <%= @user.email %></p>
```
