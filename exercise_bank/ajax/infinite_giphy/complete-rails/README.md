#Infinite Giphy

###Commit 1

* When a user submits the form, use AJAX to do a search for those gifs. Check out the routes file to find out what route you should hit.

* When a user clicks the `Attach a Gif` button, add a gif from your search results to the DOM. (You can just create an image tag and append it to the body). The first time they click it, it should add the first gif. The next time they click it, it should attach the second gif, and so on.

### Commit 2
* Implement populating the page with gifs using infinite scroll so the user doesn't have to keep hitting the attach gif button.

Remember :

* [jQuery Scroll Event](http://api.jquery.com/scroll/)

Figuring out when you've reached the bottom of the page:

* [jQuery height method](http://api.jquery.com/height/) - HINT: Look at the heights for the window and document
* [jQuery scrollTop method](http://api.jquery.com/scrollTop/)
* [This image may help you](http://www.creativeverse.com/wp-content/uploads/2013/07/aw2.jpg)

### Bonus
* Make it so that when you click on any gif on the page, it gains the class `big` if it doesn't have it, or it removes the class `big` if it already has it.
* Can you do it without adding a new event listener every time you add a gif to the page? - HINT: [Delegated events might help](http://api.jquery.com/on/#direct-and-delegated-events)
