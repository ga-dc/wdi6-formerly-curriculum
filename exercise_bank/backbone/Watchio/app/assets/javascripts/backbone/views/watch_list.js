var WatchListView = Backbone.View.extend({
  tagName: "ul",
  className: "watch-list",

  initialize: function() {
    this.listenTo(this.collection, "reset", this.addAll);
    this.addAll();
  },

  addAll: function() {
    this.$el.html("");
    this.collection.each(this.addOne, this);
  },

  addOne: function(movie) {
    var view = new MovieView({model: movie});
    this.$el.append(view.el);
  }
});