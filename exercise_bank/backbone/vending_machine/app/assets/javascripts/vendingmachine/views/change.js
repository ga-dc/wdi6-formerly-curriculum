define(function(require) {

  // Imports:
  var Backbone = require('backbone');
  var Utils = require('../helpers/utils');
  
  // Implementation:
  var VendingChangeView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.model, 'change:availableChange', this.render);
      this.render();
    },

    render: function() {
      var change = this.model.get('availableChange');
      this.$('[data-ui="claim"]').text(change ? Utils.formatCents(change) : '');
      return this;
    },

    events: {
      'click [data-ui="claim"]': 'onClaim'
    },

    onClaim: function(evt) {
      evt.preventDefault();
      this.model.claimChange();
    }
  });

  return VendingChangeView;
});
