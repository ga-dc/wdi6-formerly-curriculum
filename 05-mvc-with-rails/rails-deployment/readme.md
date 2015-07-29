# Deployment

## Learning Objectives

- Define 'deployment', and contrast different methods of deploying an application
- Describe the difference between development, test, and production environments
- Deploy a rails application using heroku
- Run migrations on heroku
- Debug errors on heroku (using logs)
- Describe the major points of a `12-factor` application as applied to deployment
- Use environment variables to keep sensitive data out of code
- List common pitfalls and their solutions when deploying to heroku
- Describe the role of the asset pipeline in rails

### References

- [Getting Started Deploying Rails on Heroku](https://devcenter.heroku.com/articles/getting-started-with-rails4)
- [The Twelve-Factor App](http://12factor.net)

## What is Deployment?

Deployment is the act of putting our app up on one or more servers connected to
the internet, such that people can use our app.

### Requirements for Deploying

There are generally a few things we need for an app to be properly deployed:

* **server** - the server(s) must be on and connected to the internet
* **services** - the server must be running the correct services (web,
  database, email, etc)
* **dependencies** - the server(s) must have the proper dependencies installed
(e.g. ruby, our gems, postgres, etc)
* **code** - we must get our code onto the server and run it
* **config** - we must configure our running app with any configuration that is
unique to that environment

### Many ways to deploy

There are lots of ways to do each of these steps. For example, we can get our
code onto a server by:

* FTP'ing the files onto the server
* Adding a git remote and using `git push` to send the files over
* Putting the files on a flash drive, attaching it to a homing pigeon, and
having someone receive the pigeon and copying the files over

### Heroku

Today, we'll be using a service called Heroku to deploy our apps, because it
makes all the above steps easy. For example, Heroku automatically:

* starts up a new server when we run `heroku create`, and installs all the necessary services
* adds a new remote to our git repo, so we can just run `git push heroku master` to copy our code over
* automatically uses `bundle install` to install our app's dependancies, and starts our app.

And if we need to change configuration information, we can set configuration
variables using `heroku config`, e.g.

## Rails 'Environments'

By default, a Rails app can be run in any of three different environments. The
three default environments are:

* development
* test
* production

Each environment is basically a different set of configurations, things that
vary depending on where / why we're running our app. For example, configuration
settings might include:

* the name of the database
* the username/password to connect to the database
* API authentication keys (e.g. to connect to twitter API)
* whether or not to reload code on each request (for debugging vs performance)
* where to save log information (error logs, etc)

### development environment

Development is the default environment, and is what we are in when we run the
app locally.

In this mode:

* Rails will connect to your development database
* Rails will display informative error messages for any error
* code is reloaded on each request (so you don't have to restart the server)
* logs are written to `log/development.log`
* your CSS / JS will not be combined into one file

### test environment

* Rails will connect to your test database
* The DB will be wiped between each test
* Rails will display informative error messages for any error
* code is reloaded on each request (so you don't have to restart the server)
* logs are written to `log/test.log`

### production environment

* Rails will connect to your production database
* Rails will NOT display full error messages (just a generic 'error' page)
* code is NOT reloaded on each request (for performance)
* logs are written to `log/production.log`
* your CSS / JS *will* be combined into one file for performance


We usually think of deploying our app to mean 'deploying into production'. By
production, we mean the 'public' version of our site. The one with the important
data that all of our users are using.

## Setting Up Heroku

We're going to use Heroku to deploy our app, because it has a free tier, and is
incredibly easy to get started with.

### Installing the Heroku Toolbelt

The Heroku toolbelt is a command line app that enables us to create new apps to
deploy, deploy code updates, and manage our server(s).

Follow the instructions on the
[Heroku Toolbelt site](https://toolbelt.heroku.com) to get it installed.

## Creating / Deploying our App

The first time we want to deploy a new app, we need to tell Heroku to create a
new server:

```bash
$ cd path/to/your/rails/app
$ heroku create <your_app_name>
```

Make sure to choose something unique but meaningful for `your_app_name`, e.g.
`wdi-dc6-adam-tunr`. The app will be hosted at `your_app_name.herokuapp.com`.

When we run this command, heroku will automatically add a new git remote, called
`heroku`. To actually deploy our code onto the new server, we simply push to
this new remote:

```bash
$ git push heroku master
```

This will push our code onto the server, and in response, Heroku will install
all the dependancies for our app (using bundler), and start it up.

### Visiting Our Site

We could open our site manually by typing the URL into the browser, but Heroku
gives us a convenient tool to do this from our app's folder in the command line.

Simply run the following command to open the site in your default browser:

```bash
$ heroku open
```

## Running Migrations on Heroku

You may have noticed that we got an error when we tried to visit any page
dependent on our database.

That's because Heroku creates a Postgres database for our app, but doesn't run
any migrations. To run our migrations on Heroku, we use the `heroku run`
command:

```bash
$ heroku run rake db:migrate
```

In general, the `heroku run` command will take the command immediately after it
and run it on your Heroku server, instead of locally.

## Debugging Production Errors

To debug errors in production, we need to look at the logs. With heroku, we can
run `heroku logs` to see the most recent log entries.

Here are some common ways to run this command:

```bash
$ heroku logs             # print the most recent entries and quit
$ heroku logs -n 2000     # print the 2000 most recent entries and quit
$ heroku logs -t          # 'tail' - print the most recent entries and continue to print new ones until we quit using ctrl-c
```

You may notice that our logs don't look complete. This is because by default,
rails is logging to `log/production.log`, but Heroku won't look at that file.

Instead, we need rails to log elsewhere, so Heroku can capture that info for us.
To do so, we need to add a gem into our app:

```ruby
group :production do
  gem 'rails_12factor'
end
```

Note we're specifying that this gem should only be loaded in the production
environment, not locally.

This gem does two things:

* configures rails to print logs to STDOUT, so Heroku can capture them
* configures rails to serve our static assets (CSS/JS/images). More on this later

### The Twelve-Factor App

You may be wondering about the name of that gem... it's based on an idea called
'The Twelve-Factor App', which is a set of 12 principles that modern apps should
follow so that they can be deployed on any provider, and can scale up easily
(i.e. can grow as the userbase grows).

We don't have time to go in-depth today, but you can find more info about this
idea on the [Twelve-Factor Site](http://12factor.net).


## Common Pitfalls

The most common pitfalls when deploying to Heroku are:

* not including the `rails_12factor` and `pg` gems
* not running `rake db:migrate`
* not 

## Rails Asset Pipeline
