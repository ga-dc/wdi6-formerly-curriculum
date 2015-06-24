define(function(require) {

  // Imports:
  var Backbone = require('backbone');

  // Implementation: 
  var PurchasesView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.model, 'change:availablePurchases', this.render);
      this.render();
    },

    render: function() {
      var purchases = this.model.get('availablePurchases');

      html = purchases.reduce(function(memo, itemName) {
        return memo + ['<li>', itemName, '</li>'].join('');
      }, '');

      this.$('ul').html(html);
      return this;
    },

    events: {
      'click': 'onClaim'
    },

    onClaim: function(evt) {
      evt.preventDefault();
      this.model.claimPurchases();
    }
  });
  
  return PurchasesView;
});