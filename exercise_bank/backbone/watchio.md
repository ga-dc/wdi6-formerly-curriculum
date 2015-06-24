# Watch.io

We are going to create the first part of an app to manage a Movie Watch List using Backbone.

To begin, we're going to focus on building out the back-end and just the Backbone model on the front-end. We will be tackling the views tomorrow.

A Movie has 3 attributes:
* A Title
* A Poster (From OMDB API)
* Seen? (Boolean)

Things you should be able to do from the JavaScript Console:

* Create a new movie that persists to the database (You will only be providing the `title` and `seen` attributes. The back-end should find the appropriate poster from the OMDB API and persist that to the database. Upon persistence, the front-end should have access to that poster)
* Update the movie in the database to change "seen" from false to true
* Delete the movie from the database