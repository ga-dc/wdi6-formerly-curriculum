define(function(require) {

  // Imports:
  var Backbone = require('backbone');
  var _ = require('underscore');
  var Utils = require('../helpers/utils');

  // Implementation:

  // Manages the display of individual list items:
  var StockItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'stock-item',
    template: _.template(require('text!../tmpl/stock-item.html')),

    attributes: function() {
      return {'data-id': this.model.id};
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      var data = this.model.toJSON();
      data.price = Utils.formatCents(data.price);
      this.$el.html(this.template(data));
      return this;
    }
  });

  // Manages the display of the full items list:
  var StockWindowView = Backbone.View.extend({
    initialize: function() {
      this.render();
    },

    render: function() {
      var fragment = document.createDocumentFragment();
      
      this.collection.each(function(model) {
        var view = new StockItemView({model: model});
        view.render();
        fragment.appendChild(view.el);
      }, this);

      this.$('ul').html(fragment);
      return this;
    }
  });
  
  return StockWindowView;
});
