# Devise Demo

https://github.com/plataformatec/devise

Devise does everything we just did, and more, in about 3 steps. **HOWEVER**, you have to start from a pretty blank slate. In particular, if you already have a User model, Devise is going to try to overwrite it and things will get really complicated.

```
# Gemfile

gem 'devise'
```
```
bundle install
rails generate devise:install
rails generate devise user
rake db:migrate
```

```rb
# app/controllers/application_controller.rb

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!
end
```

...and now it asks us to sign in and stuff!

Devise provides error messages, password editing, password resetting, and all kinds of stuff. However, there are small tweaks you need to make out-of-the-box. Fortunately the documentation walks you through most of it, and documentation elsewhere on the web walks you through the rest:

https://github.com/plataformatec/devise
