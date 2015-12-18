# Learning Objectives - Week 5 - MVC with Rails`

Build a scalable, maintainable, and secure web application that manipulates data.

## MVC/Intro to Rails
- Explain what Ruby on Rails is and it's architectural components (rMVC)
- Explain the lifecycle of an HTTP request in Ruby on Rails
- Explain how Convention over Configuration relates to Ruby on Rails
- List the most common folders in a rails application and describe their purpose
- Compare and contrast the structure Sinatra and Rails apps
- Create a new Ruby on Rails application
- Build a Rails App with a RESTful interface
- Follow Rails naming conventions when creating models, views and controllers
- Use error driven development in Rails to identify common errors and implement solutions for them.

## Models & Migrations

- Create a new rails application with postgres as the default
- Use `rake` to create, edit, and update, and seed the db
- Use rails generators to create migrations.
- Use rails console to inspect and manipulate models
- Use rails migrations to create tables and modify columns
- Undo a migration with `rake db:rollback`
- Create migrations that associate one model with another.
- Identify the impacts of editing existing migrations.
- Use `timestamps` to timestamp crud actions
- Use shorthand syntax to create migrations from the command line.

## Views & Controllers

- Describe the roles of controllers and views in a Rails app
- Explain how the router directs requests to a specific controller and action
- Explain how controller actions map to specific views
- Describe the Rails convention for implicitly rendering a view from an action
- Use `strong_params` to limit what attributes can be modified
- Describe the role of instance variables in sharing information between an action and its view
- Differentiate between `redirect` and  `render`

## Helpers

- Describe how Rails' built-in helper methods make our code mode readable and flexible
- Use Rails' path helper methods to generate paths for links and redirects
- Generate links in views using `link_to`
- Generate images in views using `image_tag`
- Generate model forms using the `form_for` helper
- DRY up views using partials.
- Describe what a CSRF attack is
- Explain the purpose of authenticity tokens in Rails forms

## Routing & Resources
* Review the relationship between HTTP requests and controller actions.
* Identify the role a router (`routes.rb`) plays in the Rails MVC model.
* Create routes for individual pages in Rails.
* Use resources to define routes for a RESTful controller.
* Use rake routes to display RESTful routes.
* Implement route names in Rails link helpers.
* Implement nested routes in a Rails application.
* Describe how path helpers work for nested routes.
* Implement form_for to build a form for a nested resource.

## Error Handling
- Explain the purpose of `flash` in Rails
- Compare and contrast `flash[:notice]` and `flash[:alert]`
- List three ActiveRecord methods that trigger validations
- Compare and contrast the validation helpers `confirmation`, `inclusion`, `exclusion`, `length`, `presence`, `uniqueness`, and `numericality`
- Compare and contrast the validation options `allow_nil`, `allow_blank`, and `on`
- Create a custom validation on an ActiveRecord model
- Explain the benefits of explicitly handling errors
- Produce and handle an error in Ruby using the keywords `begin`, `rescue`, and `raise`.

## Sessions & Auth

- Explain what state is in a web application
- Explain how sessions give state to a web application
- Explain how user authentication utilizes sessions
- Define and then access a session variable in a Rails application.
- Set session hash key value pairs inside of a rails application
- Implement user authentication into a web application utilizing the devise gem
- Implement useful helper methods devise provides
- Differentiate between authentication and authorization

## Deployment

- Define 'deployment', and contrast different methods of deploying an application
- Describe the difference between development, test, and production environments
- Deploy a rails application using heroku
- Run migrations on heroku
- Debug errors on heroku (using logs)
- Describe the major points of a `12-factor` application as applied to deployment
- Use environment variables to keep sensitive data out of code
- List common pitfalls and their solutions when deploying to heroku
- Describe the role of the asset pipeline in rails

## Unit Testing with RSpec
- List benefits of unit testing, both to the creation process and to the collaboration process
- Describe the difference between `context`, `describe`, and `it`
- Describe the difference between `let`, `before(:each)`, and `before(:all)`
- Plan the creation of a project by reducing it to a series of unit tests
- Contrast unit tests and functional tests
- Add specs to an existing Sinatra app
- Define Test-Driven Development and give an example of why it's useful
