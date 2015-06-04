var Result = Movie.extend({
  grabMovieData: function() {
    this.fetch({
      data: { i: this.get("imdb_i_d") }
    });
  },

  parse: function(response) {
    // keys coming from OMDBApi are lowerCamelCased
    // we need snake_case for Rails
    return _.chain(response)
      .map(function(val, key) {
        return [_(key).toSnakeCase(), val];
      })
      .object()
      .value();
  }
});