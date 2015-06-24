define(function(require) {

  // Imports:
  var Backbone = require('backbone');
  var LocalStorage = require('backbone-localstorage');

  // Implementation:
  var VendingMachineModel = Backbone.Model.extend({
    id: 1,
    defaults: {
      availableChange: 0,
      availableCredit: 0,
      availablePurchases: [],
      code: ''
    },

    localStorage: new LocalStorage("vendingmachine"),

    resetCode: function() {
      this.save('code', '');
    },

    addKeyCode: function(key) {
      this.save('code', this.get('code') + key);
    },

    addCredit: function(cents) {
      if (!isNaN(cents) && isFinite(cents)) {
        this.save('availableCredit', this.get('availableCredit') + cents);
      }
    },

    refund: function() {
      var credit = this.get('availableCredit');
      var change = this.get('availableChange');

      this.save({
        availableCredit: 0,
        availableChange: change + credit,
        code: ''
      });
    },

    transaction: function(purchase) {
      var credit = this.get('availableCredit');
      var change = this.get('availableChange');
      var purchases = this.get('availablePurchases').slice();

      purchases.push(purchase.name);

      this.save({
        availableCredit: 0,
        availableChange: change + credit - purchase.price,
        availablePurchases: purchases,
        code: ''
      });
    },

    claimChange: function() {
      this.save('availableChange', 0);
    },

    claimPurchases: function() {
      this.save('availablePurchases', []);
    }
  });
  
  return VendingMachineModel;
});