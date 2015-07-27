# MVC with Rails`

Build a scalable, maintainable, and secure web application that manipulates data.

## Learning Objectives

### Unit Testing with RSpec
- Explain the purpose unit testing
- Explain what role RSpec plays in testing
- Explain the TDD/BDD Mantra
- Describe RSpec's basic syntax
- Define the role of expectations and matchers
- Explain why isolating tests is a best practice
- List common expectations and the scenarios they support
- Differentiate between testing return values and side effects
- Describe why we avoid testing internal implementation

### MVC/Intro to Rails
- Explain what Ruby on Rails is and it's architectural components (rMVC)
- Explain the lifecycle of an HTTP request in Ruby on Rails
- Explain how Convention over Configuration relates to Ruby on Rails
- Explain the structure of a rails application (folders & files)
- Compare and contrast the structure Sinatra and Rails appps
- Create a new Ruby on Rails application
- Create a Rails App with a RESTful interface
- Follow Rails naming conventions when creating models, views and controllers
- Use error driven development in Rails to identify common errors and implement solutions for them.

### Models & Migrations

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

### Views & Controllers

- Describe the role of controllers and views in a Rails app
- Explain how the router directs requests to a specific controller and action
- Explain how controller actions map to specific views
- Describe the Rails convention for implicity rendering a view from an action
- Use `strong_params` to limit what attributes can be modified
- Describe the role of instance variables in sharing information between an action and its view
- Describe the difference between a `redirect` and a `render`

### Helpers

- Describe how Rails' built-in helper methods make our code mode readable and flexible
- Use Rails' path helper methods to generate paths for links and redirects
- Generate links in views using `link_to`
- Generate images in views using `image_tag`
- Generate model forms using the `form_for` helper
- Generate non-model forms using  the `form_tag` helper
- Describe what a CSRF attack is [example video](https://www.youtube.com/watch?v=uycmHQM_h64)
- Explain the purpose of authenticity tokens in Rails forms

### Routing & Resources
- Review the relationship between HTTP requests and controller actions.
- Identify the role a router (`routes.rb`) plays in the Rails MVC model.
- Create routes for individual pages in Rails, both RESTful and otherwise.
- Use `resources` to define routes for a RESTful controller.
- Use `rake routes` to display RESTful routes.
- Implement route names in Rails link helpers.
- Implement nested routes in a Rails application.
- Describe how path helpers work for nested routes.
- Implement `form_for` to build a form for a nested resource.

### Sessions & Auth
- Contrast the use cases for cookies, sessions, and permanent storage.
- Define and then access a session variable in a Rails application.
- Create a (very) simple hashing algorithm.
- Describe the differences between hashing and encoding.
- Add sign up, sign in, and sign out functionality to a Rails application.
- Securely store and access passwords.
- Describe the functionality added by `has_secure_password`.
- Differentiate between authentication and authorization.

### Deployment

- Describe the difference between development, test, and production environments
- List and contrast different methods of deploying an application
- Describe the major points of a `12-factor` application as applied to deployment
- Use environment variables to keep sensitive data out of code
- Deploy a rails application using heroku
- Run migrations on heroku
- Debug errors on heroku (heroku logs)
- List common pitfalls and their solutions when deploying to heroku
- Describe the role of the asset pipeline in rails
