# WDI Emergency Compliment


## Mission…

Create your own version of [Emergency Compliment](http://emergencycompliment.com/), except making the compliments WDI-themed. When a user visits the site, they should be greeted with a WDI-themed compliment to cheer them up.

Create a new directory called `emergency_compliment` that holds your Sinatra app. Within this folder, create the following files:

* `server.rb`
* `views/layout.erb`
* `views/compliment.erb`


## Level 1: generic compliment

When you visit the root (`"/"`) of your app, it should display a generic greeting and a randomly chosen compliment. The background color of the app should be randomized as well.

Here are some sample compliments and colors (feel free to substitute in your own):

```ruby
compliments = [
  "Your instructors love you",
  "High five = ^5",
  "Is it Ruby Tuesday yet?",
  "It's almost beer o'clock",
  "The Force is strong with you"
]

colors = ["#FFBF00", "#0080FF","#01DF3A","#FF0080"]
```

Put your greeting & compliment each in a container element with a class of `.compliment` to take advantage of the provided styles.

## Level 2: personalized compliment

When you visit `"/name"` (ie: `"/randy"`), the greeting should personalize itself to the provided name. There should still be a random compliment and background color.

## Level 3: user submitted compliments

Allow a user to add to the list of compliments using a POST request. You can submit POST requests to the app using Postman.
