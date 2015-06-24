var Todo = Backbone.Model.extend({ 
  urlRoot: "/todos"
});

var TodoCollection = Backbone.Collection.extend({
  model: Todo,
  url: "/todos"
});

var TodoView = Backbone.View.extend({
  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.render();
  },

  events: {
    "change input[type='checkbox']": "toggleDone",
    "click span": "destroy"
  },

  toggleDone: function(e) {
    var checked = $(e.target).is(":checked");
    this.model.set('done', checked);
    this.model.save();
  },

  destroy: function() {
    this.model.destroy();
    this.remove();
  },

  render: function() {
    var template = $("script.template").html();
    var rendered = _.template(template, { todo: this.model });
    this.$el.html(rendered);
  }
});

var FormView = Backbone.View.extend({
  el: "form",

  events: {
    "submit": "createTodo"
  },

  createTodo: function(e) {
    e.preventDefault();
    var task = this.el.elements["task"].value;
    this.collection.create({task: task});
    this.el.reset();
  }
});

var ListView = Backbone.View.extend({
  el: "ul",

  initialize: function() {
    this.listenTo(this.collection, "add", this.addOne);
  },

  addOne: function(todo) {
    var view = new TodoView({model: todo});
    this.$el.append(view.el);
  }
});

$(document).ready(function() {
  var todos = new TodoCollection();
  var listView = new ListView({collection: todos});
  var formView = new FormView({collection: todos});
  todos.fetch();
});