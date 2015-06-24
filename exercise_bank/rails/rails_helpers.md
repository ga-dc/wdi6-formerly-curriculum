# Refactoring your Rails app

Use the following documentation to DRY up your Tunr app.

## Path and URL helpers

Instead of using `<a>` tags, we can use use the `link_to` helper in Rails. Read more about it here:

* http://api.rubyonrails.org/classes/ActionView/Helpers/UrlHelper.html#method-i-link_to

Also, instead of writing out all of our paths by hand, we can use path helpers to refer to our paths:

* http://guides.rubyonrails.org/routing.html#generating-paths-and-urls-from-code

You can view a list of all your routes by typing `rake routes` into your terminal.

You can learn more about rake routes and routing from this blog post that PJ wrote:

* http://instantiatedobject.blogspot.com/2013/10/understanding-and-using-rake-routes-or.html


## Form Helpers

You can use form helpers to help DRY up your forms. In particular, focus on the `form_for` helper.

* http://guides.rubyonrails.org/form_helpers.html

* http://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html


## Partials

You can use partials to DRY up your views. Learn more about how they work here:

* http://guides.rubyonrails.org/layouts_and_rendering.html#using-partials
