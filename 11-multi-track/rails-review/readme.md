# Rails Review

## A CRUD App from Scratch

    $ rails new doughnuts -d postgresql
    $ cd doughnuts
    $ rake db:create

## Migrations

    $ rails g migration create_doughnuts flavor:string img_url:string
    $ rake db:migrate

## Models

    $ touch app/models/doughnut.rb

```rb
class Doughnut < ActiveRecord::Base

end
```

## Seeds

```rb
# db/seeds.rb
Doughnut.create([
  {flavor: "glazed", img_url:"https://upload.wikimedia.org/wikipedia/commons/a/a5/Glazed-Donut.jpg"},
  {flavor: "frosted", img_url:"http://cdn1.theodysseyonline.com/files/2015/11/06/635824216505743270937342224_strawberry%20donut.jpg"},
  {flavor: "bavarian cream", img_url:"http://cdn.nexternal.com/vegane/images/BavarianCremeDonutLG.jpg"},
])
```

    $ rake db:seed
    $ rails c
    > Doughnut.all

## Routes

    $ rails s

```rb
# config/routes.rb

root 'doughnuts#index'
resources :doughnuts
```

## Controllers

    $ touch app/controllers/doughnuts_controller.rb

```rb
# app/controllers/doughnuts_controller.rb
class DoughnutsController < ApplicationController
  def index
  end
end
```

## Views

    $ mkdir app/views/doughnuts
    $ touch app/views/doughnuts/index.html.erb

```html
<!-- app/views/doughnuts/index.html.erb -->
<% @doughnuts.each do |d| %>
  <%= link_to d.flavor, doughnut_path(d) %>
<% end %>
```

```rb
# app/controllers/doughnuts_controller.rb
class DoughnutsController < ApplicationController
  def index
    @doughnuts = Doughnut.all
  end
end
```

## You do: Show

- Create `show` controller action
- Create `@doughnut` instance variable
  - use `.find` and `params[:id]`
- Create `show` view

## Create

```rb
# app/controllers/doughnuts_controller.rb
def new
  @doughnut = Doughnut.new
end
```

```html
<!-- app/views/doughnuts/new.html.erb -->
<%= form_for @doughnut do |f| %>
  <%= f.label :flavor %>
  <%= f.text_field :flavor %>
  <%= f.label :img_url %>
  <%= f.text_field :img_url %>
  <%= f.submit %>
<% end %>
```

```rb
# app/controllers/doughnuts_controller.rb
  def create
    @doughnut = Doughnut.new doughnut_params
    if @doughnut.save
      redirect_to @doughnut
    end
  end
  private
  def doughnut_params
    params.require(:doughnut).permit(:flavor, :img_url)
  end
```

## Destroy

```html
<!-- app/views/doughnuts/show.html.erb -->
<%= link_to "Delete", doughnut_path(@doughnut), method: :delete %>
```

```rb
# app/controllers/doughnuts_controller.rb
  def destroy
    @doughnut = Doughnut.find(params[:id])
    @doughnut.destroy
    redirect_to doughnuts_path
  end
```
