# MVC - Intro to Rails

## Learning Objectives
- Explain what Ruby on Rails is and it's architectural components (rMVC)
- Explain the lifecycle of an HTTP request in Ruby on Rails
- Explain how Convention over Configuration relates to Ruby on Rails
- Explain the structure of a rails application (folders & files)
- Create a new Ruby on Rails application
- Create a Rails App with a RESTful interface
- Follow Rails naming conventions when creating models, views and controllers

## Opening Framing
So we've learned about Sinatra, your very first web framework! It's great. It's an awesome tool to get a quick page up and running. So why would we ever want to learn Rails? So Sinatra is kind of like a shovel for web development. Rails is kind of like a nuclear powered back hoe for web development. We need to know how to work a shovel before we get the keys to the back hoe.

> It is designed to make programming web applications easier by making assumptions about what every developer needs to get started. It makes the assumption that there is the "best" way to do things, and it's designed to encourage that way - and in some cases to discourage alternatives. - Ruby on Rails guide

![rMVC](http://i.stack.imgur.com/Sf2OQ.png)

## rMVC

The design pattern that rails is built around is rMVC - router, model, view and controller.

Life Cycle of the request/response in Rails:

1. A user of our web application submits a request to our application's server. It can come in a myriad of ways. Maybe someone typing in a URL and hitting enter or maybe a user submitting a form on our application.

2. The request hits the router of the application.

3. The application than either doesn't recognize the route (error) or it does recognize it and sends it to a controller.

4. Once the request hits the controller, its then going to query the database through Active Record(the model) for the information specified in the controller.

5. Once the controller has the information from the model that it needs it sends it to the view

6. The view takes the objects from the controller and displays a view and it gets returned to the user.
