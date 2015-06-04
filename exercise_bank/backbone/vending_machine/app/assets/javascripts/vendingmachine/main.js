define(function(require) {

  // Import models:
  var VendingMachineModel = require('./models/machine');
  var VendingSkusCollection = require('./models/skus');
  
  // Import views:
  var StockWindowView = require('./views/stockwindow');
  var PurchasesView = require('./views/purchases');
  var MessageView = require('./views/message');
  var CreditView = require('./views/credit');
  var KeypadView = require('./views/keypad');
  var ChangeView = require('./views/change');

  // Import helpers:
  var Utils = require('./helpers/utils');
  var _ = require('underscore');
  
  // Implementation:
  function VendingApp() {
    var model = this.model = new VendingMachineModel();
    this.collection = new VendingSkusCollection();
    
    this.model.fetch();
    this.collection.fetch().then(_.bind(this.initialize, this));
  }

  VendingApp.prototype = {
    initialize: function() {
      this.inventoryView = new StockWindowView({
        el: '#stockwindow',
        collection: this.collection,
        model: this.model
      });

      this.purchasesView = new PurchasesView({
        el: '#purchases',
        model: this.model
      });

      this.messageView = new MessageView({
        el: '#message',
        model: this.model
      });

      this.creditView = new CreditView({
        el: '#credit',
        model: this.model
      });
      
      this.keypadView = new KeypadView({
        el: '#keypad',
        model: this.model
      });
      
      this.changeView = new ChangeView({
        el: '#change',
        model: this.model
      });

      this.model.on('change', _.bind(this.update, this));
    },

    update: function() {
      var code = this.model.get('code');
      if (code.length < 2) return;

      var product = this.collection.findWhere({code: code});

      if (!product) {
        // No product with the provided code:
        this.model.resetCode();
        this.messageView.flash('Invalid code.');

      } else if (!product.get('quantity')) {
        this.model.resetCode();
        this.messageView.flash('Sorry, item is out of stock.');

      } else if (product.get('price') > this.model.get('availableCredit')) {
        var diff = product.get('price') - this.model.get('availableCredit');
        this.messageView.flash('Please insert '+ Utils.formatCents(diff));

      } else {
        this.model.transaction(product.purchase());
        this.messageView.flash('Thank You!');
      }
    }
  };

  // Create application instance:
  window.app = new VendingApp();
  return window.app;
});