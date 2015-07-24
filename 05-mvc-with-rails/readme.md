# MVC with Rails

Build a scalable, maintainable, and secure web application that manipulates data.

## Learning Objectives

### MVC/Intro to Rails
- Explain what Ruby on Rails is and it's architectural components (rMVC)
- Explain the lifecycle of an HTTP request in Ruby on Rails
- Explain how Convention over Configuration relates to Ruby on Rails
- Explain the structure of a rails application (folders & files)
- Create a new Ruby on Rails application
- Create a Rails App with a RESTful interface
- Follow Rails naming conventions when creating models, views and controllers

### Models & Migrations

- Use `rake` to create, edit, and update, and seed the db
- Use rails generators to create migrations.
- Use rails migrations to create tables and modify columns
- Undo a migration with `rake db:rollback`
- Create migrations that associate one model with another.
- Identify the impacts of editing existing migrations.
- Use `timestamps` to timestamp crud actions
- Use shorthand syntax to create migrations from the command line.

### Views & Controllers
- Utilize controllers to query the database
- Use error driven development in Rails to identify common errors and implement solutions for them.
- Explain how the router directs route to a specific controller application
- Explain how controller actions map to specific views
- Use instance variables defined in controller actions inside corresponding views.
- Adam sug.: Use `strong_params` to limit what attributes can be modified
- Adam sug.: Something about layouts and stylesheet_link_tag / javascript_include_tag

### Helpers

- Describe how Rails' helper methods make our code mode readable and flexible
- Use Rails' path helper methods to generate paths for links and redirects
- Generate links in views using `link_to`
- Generate model forms using the `form_for` helper
- Generate non-model forms using  the `form_tag` helper
- Explain the use of an authenticity tokens in Rails forms

### Routing & Resources
- Review how to define routes.
- Identify the role a router (`routes.rb`) plays in the Rails MVC model.
- Create routes for individual pages in Rails, both RESTful and otherwise.
- Use `resources` to define routes for a RESTful controller.
- Use `rake routes` to display RESTful routes.
- Implement route names in Rails link helpers.
- Implement nested routes in a Rails application.

### Sessions & Auth

### Deployment

- Describe the major points of a `12-factor` as applied to deployment
- Use environment variables to keep sensitive data out of code
- Deploy a rails application using heroku
- List common pitfalls and their solutions when deploying to heroku
