##WDInstagram

### Prompt
We're going to create a one model Rails CRUD App from scratch. Our model is going to be an Entry.

An Entry has the following:

* author
* photo_url
* date_taken

Your Rails app should have the following controller actions:

* index (displays all entries)
* show (displays a specific entry)
* new (displays a form to create a new entry)
* create (saves a new entry it to the database)
* edit (displays a form for editing a particular entry)
* update (takes input from the edit form and updates the entry in the db appropriately)
* destroy (deletes a specific entry from the database)

### Instructions

1. Create a new rails app called `wdinstagram_app`
   - use and examine this command: `rails new wdinstagram_app -d postgresql`
2. Create a database for your app using `rake db:create`
   - use psql to make sure your database was in fact created
   - __Note:__ You'll have to be in your rails project directory to rake db:create
3. Generate a migration file and have it create an `entries` table with the attributes listed above
4. Run `rake db:migrate` to actually create that table
5. Create your __Entry__ model
6. Create routes for your app, mapping them to the controller actions listed above
7. Actually create the entries controller with the required controller actions
8. Create the necessary views for the actions above
9. Move on to the next controller action until you are done

### Bonus

1. Add validation: name and photo_url need to be present, and the date_taken should be more recent than 10/1/2010.
2. Add a column for `caption` to your Entry, which is a text description of the shot. You'll need to generate a database migration for this and then update the rest of your app to be able to display these captions.
