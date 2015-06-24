var Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "search/:title": "search"
  },

  initialize: function(watchList) {
    this.watchList = watchList;
  },

  index: function() {
    this.loadView(new WatchListView({collection: this.watchList}));
  },

  search: function(title) {
    var results = new Results({title: title});
    this.loadView(new AllResultsView({collection: results, watchList: this.watchList}));
    results.load();
  },

  loadView: function(view) {
    this.main && this.main.remove();
    this.main = view;
    $("body").append(view.el);
  }
});