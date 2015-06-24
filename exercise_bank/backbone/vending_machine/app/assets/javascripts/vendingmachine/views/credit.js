define(function(require) {

  // Imports:
  var Backbone = require('backbone');
  var Utils = require('../helpers/utils');

  // Implementation:
  var CreditView = Backbone.View.extend({
    events: {
      'click [data-ui="refund"]': 'onRefund',
      'keydown [data-ui="credit"]': 'onCredit'
    },

    onRefund: function() {
      this.model.refund();
    },

    onCredit: function(evt) {
      if (evt.keyCode == 13) {
        evt.preventDefault();
        
        // Get a reference to the input field:
        var $input = this.$('input');
        var cents = Utils.parseCents($input.val());

        // Add the field's value as credit:
        this.model.addCredit(cents);
        
        // Clear the input field:
        $input.val('');
      }
    }
  });

  return CreditView;
});