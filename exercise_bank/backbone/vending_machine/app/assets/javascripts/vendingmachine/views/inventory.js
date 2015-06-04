define(function(require) {

  // Imports:
  var Backbone = require('backbone');

  // Implementation: 
  var VendingInventoryView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.model, 'change:availablePurchases', this.render);
      this.listenTo(this.collection, 'change', this.render);
      this.render();
    },

    render: function() {
      // Render inventory HTML
      var html = this.collection.reduce(function(memo, model) {
        return memo + ['<li><span class="code">', model.get('code').toUpperCase(), '</span> <span class="product">', model.get('name'), '</span> <span class="price">', model.getPrice(), '</span> <span class="stock">', model.get('quantity'), '</span></li>'].join('');
      }, '');

      this.$('ul.stock-window').html(html);

      // Render purchases:
      var purchases = this.model.get('availablePurchases');

      html = purchases.reduce(function(memo, itemName) {
        return memo + ['<li>', itemName, '</li>'].join('');
      }, '');

      this.$('ul.purchases').html(html);
      return this;
    },

    events: {
      'click .purchases': 'onClaim'
    },

    onClaim: function() {
      this.model.claimPurchases();
    }
  });
  
  return VendingInventoryView;
});
