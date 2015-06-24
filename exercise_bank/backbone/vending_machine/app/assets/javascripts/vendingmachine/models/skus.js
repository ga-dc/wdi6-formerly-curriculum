define(function(require) {

  // Imports:
  var Backbone = require('backbone');

  // Implementation:

  // Sku Model Item
  var SkuModel = Backbone.Model.extend({
    defaults: {
      code: '',
      name: '',
      price: 0,
      quantity: 0
    },

    purchase: function() {
      this.save('quantity', this.get('quantity')-1);
      return this.toJSON();
    }
  });


  // Skus Model List
  var SkusCollection = Backbone.Collection.extend({
    model: SkuModel,
    url: '/skus'
  });


  // Configure module exports:
  SkusCollection.SkuModel = SkuModel;
  return SkusCollection;
});


