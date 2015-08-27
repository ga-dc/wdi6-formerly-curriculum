# Deployfest

Deployfest isn't so much a class as it is a "deployment clinic." We're here to help with whatever deployment issues you may be having and walk through common issues the class is experiencing.  

Below, however, are some suggestions for things to try out before raising your hand...

## First Steps

Following Heroku's **[Getting Started with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)** guide should take care of the deployment issues most of you will encounter. Take particular note of...
* [Define a Procfile](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile).
* [Provision a database](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database).
* If storing API keys as environment variables, [Define config vars](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-config-vars).

## Google Is Your Best Friend

More often that not, solving deployment issues requires a good deal of Googling. Don't expect to find a silver bullet -- go through the different issues other users may have encountered.  

What should you Google?
* If you aren't able to deploy, Google the error that shows up in your terminal after trying to push your app.
* If you are able to deploy but your app doesn't load/function propertly, see what shows up after running `$ heroku logs` in the Terminal.

## Help Each Other Out

If you notice somebody running into the same problem as you, try working together on debugging it!
