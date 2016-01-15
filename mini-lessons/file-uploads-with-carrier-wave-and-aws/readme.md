# File Uploads

## Learning Objectives

- Explain what AWS S3 is and why we use it
- Identify the benefits of uploading files vs specifying a the URL for a file
- Obscure secret tokens using `figaro`
- Explain what an environment variable is

## The Easy Way to Add Media to your Application

```
$ git clone https://github.com/ga-dc/file-uploads-carrier-wave-aws
$ cd file-uploads-carrier-wave-aws
$ bundle install
$ rake db:create
$ rake db:migrate
$ rake db:seed
$ open http://localhost:3000/
```

The solution for this exercise has already been posted! - https://github.com/ga-dc/file-uploads-carrier-wave-aws/tree/solution

So far, we've been able to add media like images and songs to our application by storing the URL to
the resource as a string in our database. We will continue to only store strings in the database, but
we no longer need to rely on others hosting our media.

Today we will create an interface for users to upload their own media.

## Carrier Wave

>This Gem provides a simple and extremely flexible way to upload files from Ruby applications. It works well with Rack based web applications, such as Ruby on Rails.

add `gem "carrierwave"` to Gemfile.

```
rails g uploader Image
```

```rb
# app/models/post.rb
class Post < ActiveRecord::Base
  mount_uploader :image, ImageUploader
end
```

```rb
# config/application.rb
require 'carrierwave'
```

```html
<!-- app/views/posts/index.html.erb -->
<%= f.file_field :image %>
```

## Uploading to AWS

While carrierwave allows us to upload files to the public folder in our rails application, these files
will not persist when we deploy our applications to heroku.

A safer alternative is to use Amazon Web Service's S3 bucket.

We'll need to add two gems to the Gemfile

```rb
gem 'fog' # tells carrierwave to upload to S3 instead of local public folder
gem 'figaro' # allows us to obscure secret keys and tokens.
```

```
$ bundle install
$ figaro install # creates config/application.yml
```

We will store these secret keys in `config/application.yml`

Visit aws.amazon.com and log into the console. Click on S3 and create a new "bucket". You can name it whatever you like.

Click on your name on the top right and click "Security Credentials"

Click on "Access Keys" and then "Create New Access Key"

Copy these and paste them into `config/application.yml`

The keys in `config/application.yml` correspond to the `ENV` values in `config/initializers/s3.rb`

```rb
# config/application.yml
aws_access_key_id: ""
aws_secret_access_key: ""
aws_bucket: ""
```

Make sure the region matches your bucket's region.

```rb
# config/initializers/s3.rb
CarrierWave.configure do |config|
  config.fog_credentials = {
      :provider               => 'AWS',
      :aws_access_key_id      => ENV['aws_access_key_id'],
      :aws_secret_access_key  => ENV['aws_secret_access_key'],
      :region                 => "us-east-1"
  }
  config.fog_directory  = ENV['aws_bucket']
end
```

Finally, we need to update the uploader file to use `fog` instead of the local file storage:

```rb
# storage :file
storage :fog
```
