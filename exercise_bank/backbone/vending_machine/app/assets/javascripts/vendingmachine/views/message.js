define(function(require) {

  // Imports:
  var Backbone = require('backbone');
  var Utils = require('../helpers/utils');

  // Implementation:
  var MessageView = Backbone.View.extend({
    flashMessage: '',

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    flash: function(message) {
      this.flashMessage = message;

      setTimeout(_.bind(function() {
        this.flashMessage = '';
        this.render();
      }, this), 1500);
      
      this.render();
    },

    render: function() {
      var messages = [];
      var credit = this.model.get('availableCredit');
      var code = this.model.get('code');

      if (this.flashMessage) {
        messages.push(this.flashMessage);
      } else {
        if (credit) messages.push('Credit: ' + Utils.formatCents(credit));
        if (code) messages.push('Selection:  ' + code);
      }

      if (!messages.length) {
        messages.push('Insert cash');
      }
      
      this.$el.html(messages.join('<br>'));
      return this;
    }
  });

  return MessageView;
});