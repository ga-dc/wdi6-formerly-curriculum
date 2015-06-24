# Movie Browser

Use the [Open Movie Database API](http://www.omdbapi.com/) to build a single-page movie browser app.

**Requirements:**

 1. The "#movie-select" field is hidden by default.
 
 2. The user may search for a movie keyword; this will reveal the "#movie-select" field, and populate it with all search results. The first select option should read "Movies matching '*KEYWORD*'…".
 
 3. Whenever the "#movie-select" field changes (use a "change" event), load the new selection's data, and then populate its title and image within the "#movie-detail" region.