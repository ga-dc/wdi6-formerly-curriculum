var MovieView = Backbone.View.extend({
  tagName: "li",

  template: _.template($("script.movie[type='text/html'").html()),

  events: {
    "click :checkbox": "toggleSeen",
    "change select": "rateMovie",
    "click button.delete": "removeFromList"
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.remove);

    this.render();
  },

  toggleSeen: function() {
    this.model.toggleSeen();
    this.model.save();
  },

  rateMovie: function(e) {
    this.model.set("rating", e.target.value);
    this.model.save();
  },

  removeFromList: function() {
    this.model.destroy();
  },

  render: function() {
    this.$el.html(this.template());
  }
});