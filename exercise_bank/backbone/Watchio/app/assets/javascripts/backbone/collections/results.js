var Results = Backbone.Collection.extend({
  model: Result,

  url: "http://www.omdbapi.com/",

  initialize: function(opts) {
    this.title = opts.title;
  },

  load: function() {
    this.fetch({
      data: {s: this.title},
      reset: true
    });
  },

  parse: function(response) {
    return response["Search"];
  }
});