# How to make an Express app
## Two approaches

## Approach A (Building first; more agile)
In `psql`, in your Terminal, create a database, put a table in it, and put a column or two in the table -- `id` and `name`, say. Then make a single `app.js` file where, when you run it, it connects to the database and gets all the data in it.

Congratulations -- you know have the `C` of `CRUD`! From here, just keep adding stuff to that `app.js` file. When it gets to be more than 50 lines long, start breaking things up into separate files and `require` them.

## Approach B (Planning first)
1. Make a folder for your app. Let's say `myapp`
- Inside it, make an `myapp/app.js` or `myapp/index.js` file (Or `myapp/sasquatch.js`... the name doesn't matter. Just pick one and stick with it!) **Leave the file blank.**
- Make a `myapp/models` folder
- Make a **blank** file for each model you think you'll want. (For example, `myapp/models/artist.js`)
- Make a `myapp/controllers` folder
- Make a **blank** controller file for each model you've created. (For example, `myapp/controllers/artists.js`)
- In the controllers file, write all the routes you'll want. Don't bother putting any code inside them; just write the paths themselves.
    ```js
    router.get("/artists", function(req,res){
      // Get all artists
    });
    ```
- Make the schema for all of your models:
    ```js
    sequelize.define("artist", {
      name: Sequelize.STRING,
      recordLabel: Sequelize.STRING,
      age: Sequelize.INTEGER
    });
    ```
- Add in the logic for the controller routes:
    ```js
    router.get("/artists", function(req, res){
      Artist.findAll().then(function(artists){
        res.json(artists);
      });
    });
    ```
- Now you have your app pretty well planned-out! Next, look up how to set up your `app.js` file, and what you should require in all the various files.


