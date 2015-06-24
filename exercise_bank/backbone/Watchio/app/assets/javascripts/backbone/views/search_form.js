var SearchFormView = Backbone.View.extend({
  el: "form.search",

  events: {
    "submit": "searchMovies"
  },

  searchMovies: function(e) {
    e.preventDefault();
    var title = this.$el.find("input[name='title']").val();
    this.el.reset();
    Backbone.history.navigate("search/"+ encodeURI(title), {trigger: true});
  }
});