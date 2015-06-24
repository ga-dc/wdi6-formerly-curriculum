# Underscore.js: Gotta Catch 'Em All!

### Overview

Tired of writing for loops and wish you had all the awesome semantic enumerators that we had in Ruby? You can with [underscore.js!](http://underscorejs.org/)

The goal of this morning's exercise is to get an introduction to a helpful library. Underscore.js also happens to be a dependency for Backbone.js, so we wanted to give you guys an opportunity to play with it first.

Your job is to fill in each of the functions stubbed out in the `pokemon.js` file so that they work. I've written Jasmine Tests for each of them besides "printAllPokemonNamesToConsole", which you will just have to check manually. For the others, go through the underscore.js docs and write the code that makes the tests pass. 

#### Notes
* I've namespaced all of the functions to `pokemon`
* I've put the JSON of the pokemon data in the `src/data.js` file.
* You shouldn't have to use any "for" loops.

### Bonus 1

* Add an event listener to the "Gotta Catch 'Em All!" button so that when you click on it, it creates a div with the class "pokeball" for each Pokemon Type.

* When you click on the div for a particular Pokemon Type, it should display a list of all the Pokemon of that type in that div.

### Bonus 2

* Peruse the underscore.js docs for other interesting / useful functions and figure out how they work.

* When you have some free time, it's also worth checking out the [annotated source code](http://underscorejs.org/docs/underscore.html) to see how the library works under the hood.
