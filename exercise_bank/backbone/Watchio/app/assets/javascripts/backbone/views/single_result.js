var SingleResultView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.model.grabMovieData();

    this.render();
  },

  tagName: "li",

  template: _.template($("script.search-result[type='text/html']").html()),

  events: {
    "click button.add": "add"
  },

  add: function() {
    this.model.set("added", true);
  },

  render: function() {
    this.$el.html(this.template());
  }
});