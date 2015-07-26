### Use .each to print out each key-value pair in this hash:

```rb
class = {
     room: "Peanut Butter",
     teacher: "Andy",
     squads: [ "Ada", "Bash", "C" ]
}
```

```rb
# ANSWER
class.each do | key, value |
  puts "Key: #{key}"
  puts "Value: #{value}"
end
```

### Which of these values are "falsey" in Ruby?

`false`
`nil`

### Create a Ruby class for a student, initialized with a name and age.

```rb
class student
  attr_accessor :name, :age
  def initialize( name, age )
    @name = name
    @age = age
  end
end
```

### Explain the difference between local, instance and class variables in Ruby.
* **Local variables** are only accessible within the scope in which they are declared.
* **Instance variables** are accessible anywhere within a particular instance, each instance gets it’s own ‘copy’ of the variable (i.e. each intstance can have unique values).
* **Class variables** are accessible by an entire class (i.e., across instances). Only one copy, so any changes in its value is reflected in every instance. Note: These are rarely used.

### Say we have a students table. How would I select the last_name of each student using SQL?

`SELECT last_name FROM students;`

### List the 5 HTTP request methods. How do they relate to the 4 crud actions?

```rb
# Format: HTTP request method = CRUD action

# index = read
get "/students/" do
end

# create = create
post "/students/:id" do
end

# update = update
put "/students/:id" do
end

# update = update
patch "/students/:id" do
end

# delete = destroy
delete "/students/:id" do
end
```

### Say we have a Sinatra blog with a single Post model. What would be the ideal RESTful route for editing a post?

**NOTE:** "Edit" returns a form but does not update the object. "Update" then takes the user input from the form and updates the object.

```rb
# update
put /students/:id do
  @student = Student.find( params[:id] )
  @student.update( params[:student] )
  redirect /students/"#{student.id}"
end
```

### Which of these are Active Record class methods (as opposed to instance methods)?

`.create`
`.find`
`.destroy_all`
`.all`

### Using Active Record, create a Person in Ruby that saves to our database.

```rb
Person.create( name: "Adrian", age: 28, gender: "male" )

# We're actually passing in a hash here. In Ruby, the curly brackets are optional. Let's add them...
Person.create({name: "Adrian", age: 28, gender: “male”})
```
