require 'pg'
require 'active_record'
require 'pry'

ActiveRecord::Base.logger = Logger.new(STDOUT)

ActiveRecord::Base.establish_connection(
  adapter: 'postgresql',
  host: 'localhost',
  database: 'tags_db'
)

class User < ActiveRecord::Base
  has_many :posts, dependent: :destroy
end 

class Post < ActiveRecord::Base
  belongs_to :user
  has_many :taggings
  has_many :tags, through: :taggings
end

class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :posts, through: :taggings
end

class Tagging < ActiveRecord::Base
  belongs_to :tag
  belongs_to :post
end

# binding.pry

def start(user)
  puts "#{user.name}, Welcome to Taggify!"
  while true
    puts "Choose between the options:"
    puts "1- Write post"
    puts "2- Look at all posts"
    puts "3- Search posts by tags"
    puts "4- Look at my posts"
    puts "5- Quit"
    input = gets.chomp
    if input == "1"
      saved_tags = []
      puts "Start typing"
      post_body = gets.chomp
      print "Tags(separated by comma):" 
      tags = gets.chomp.split(',')
      post = Post.create(body: post_body, user_id: user.id)
      tags.each do |tag|
        saved_tags << Tag.create(body: tag)
      end 
      saved_tags.each do |tag|
        tag.taggings.create(post_id: post.id)
      end 
    elsif input == "2"
      posts = Post.all
      posts.each do |post|
        puts "#{post.body}"
      end 
    elsif input == "3"
      puts "Enter tag"
      tag = gets.chomp
      saved_tag = Tag.find_by(body: tag)
      if saved_tag 
        posts = saved_tag.posts
        posts.each do |post|
          puts "#{post.body}"
        end 
      end 
    elsif input == "4"
      posts = user.posts
      posts.each do |post|
        puts "#{post.body}"
      end
    elsif input == "5"
      break
    else
      puts "I don't know...."
    end
  end 
end


puts "Enter your email"
email = gets.chomp
user =  User.find_by(email: email)
if user
  start(user)
else 
  puts "Register first!"
  puts "Please enter your email"
  email = gets.chomp
  puts "Please choose a username"
  name = gets.chomp
  user = User.create(email: email, name: name)
  start(user)
end
