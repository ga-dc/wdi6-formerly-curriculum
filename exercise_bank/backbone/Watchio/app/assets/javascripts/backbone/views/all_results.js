var AllResultsView = Backbone.View.extend({
  tagName: "ul",

  className: "results",

  initialize: function(opts) {
    this.watchList = opts.watchList;

    this.listenTo(this.collection, "reset", this.addAll);
    this.listenTo(this.collection, "change:added", this.addToWatchList)
  },

  addAll: function() {
    this.collection.each(this.addOne, this);
  },

  addOne: function(movieResult) {
    var view = new SingleResultView({model: movieResult});
    this.$el.append(view.el);
  },

  addToWatchList: function(movie) {
    this.watchList.create(movie.toJSON());
  }
});