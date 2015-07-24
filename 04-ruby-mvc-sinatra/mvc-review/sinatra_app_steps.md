# Making a Sinatra/ActiveRecord app

1. Create a database
  - `createdb tunr_db`
  - Or, in PSQL, `CREATE DATABASE tunr_db`
- Write your schema (`CREATE TABLE...`)
- Run your schema
  - `psql -d tunr_db < schema.sql`
- Make your Gemfile
- `bundle install`
- Make your `connection.rb` to connect to the database
  - `ActiveRecord::Base.establish_connection`...
- Make your `app.rb`
  - `require "active_record"`, `require "sinatra"`
- Create your models
  - `class Cars < ActiveRecord::Base`
- Seed your database (optional)
  1. Create your seed file
    - `Artist.create()`
  - Run your seed file
    - `bundle exec ruby seeds.rb`
- Create your controllers
- Create your views
- Run your app
  - `bundle exec ruby app.rb`
