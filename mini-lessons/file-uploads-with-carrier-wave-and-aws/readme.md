# File Uploads

## Learning Objectives

- Explain what AWS is and why we use it
- Identify the benefits of uploading files vs specifying a the URL for a file
- Obscure secret tokens using `figaro`

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

So far, we've been able to add media like images and songs to our application by storing the URL to
the resource as a string in our database. We will continue to only store strings in the database, but
we no longer need to rely on others hosting our media.

Today we will create an interface for users to upload their own media.

## Carrier Wave

add `gem "carrierwave"` to Gemfile.

```
rails g uploader Image
```

```rb
# app/models/image.rb
class Image < ActiveRecord::Base
  mount_uploader :image, ImageUploader
end
```

```rb
# config/application.rb
require 'carrierwave'
```
